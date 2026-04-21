import { Box, Button, Typography } from "@mui/material";
import {
  useCalculateBonusesMutation,
  useFetchGameEventsWithRidersQuery,
  useResetEventsToDefaultMutation,
} from "./gameApi";
import GameRiderUpdateDisplay from "./GameRiderUpdateDisplay";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";
import "./gameRiderUpdateDisplay.css";

type Props = {
  gameId: string;
};

export default function GameHeats({ gameId }: Props) {
  const { data: eventsWithRider, isLoading: eventsWithRidersLoading } =
    useFetchGameEventsWithRidersQuery(gameId ?? "");

  const [calculateBonuses, { isLoading: calculatingBonuses }] =
    useCalculateBonusesMutation();

  const [resetEventsToDefault, { isLoading: resettingEvents }] =
    useResetEventsToDefaultMutation();

  if (
    eventsWithRidersLoading ||
    !eventsWithRider ||
    calculatingBonuses ||
    resettingEvents
  )
    return <Box>Loading...</Box>;

  const chunkArray = (
    arr: EventWithRiderResponse[],
  ): EventWithRiderResponse[][] => {
    const res = [] as EventWithRiderResponse[][];
    for (let i = 0; i < arr.length; i += 4) {
      const chunk = arr.slice(i, i + 4);
      res.push(chunk);
    }
    return res;
  };

  const calculateScore = (x: number) => {
    const eleToCount = eventsWithRider
      .slice(0, x * 4)
      .filter((x) => "123".includes(x.eventResponseDto.eventResult[0]));
    const home = eleToCount
      .filter((x) => x.eventResponseDto.homeAway === "Home")
      .reduce((sum, x) => (sum += +x.eventResponseDto.eventResult[0]), 0);
    const away = eleToCount
      .filter((x) => x.eventResponseDto.homeAway === "Away")
      .reduce((sum, x) => (sum += +x.eventResponseDto.eventResult[0]), 0);

    return `${home}:${away}`;
  };

  const bonusesCalculation = () => {
    calculateBonuses(gameId);
  };

  const eventsReset = () => {
    resetEventsToDefault(gameId);
  };

  return (
    <Box>
      {chunkArray(
        eventsWithRider.filter((x) => x.eventResponseDto.riderHeatNumber < 99),
      ).map((heat, index) => (
        <Box display={"flex"}>
          {heat.map((riderEvent) => (
            <GameRiderUpdateDisplay riderEvent={riderEvent} />
          ))}
          <Typography
            minWidth={"5%"}
            alignContent={"center"}
            textAlign={"center"}
            border={1}
            paddingLeft={0.5}
            paddingRight={0.5}
          >
            Heat: {index + 1} <br /> {calculateScore(index + 1)}
          </Typography>
        </Box>
      ))}
      <Box textAlign={"center"} m={1}>
        <Button sx={{ m: 1 }} onClick={bonusesCalculation} variant="contained">
          Bonuses
        </Button>
        <Button onClick={eventsReset} variant="contained">
          Reset
        </Button>
      </Box>
    </Box>
  );
}
