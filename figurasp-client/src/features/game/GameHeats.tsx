import { Box, Typography } from "@mui/material";
import { useFetchGameEventsWithRidersQuery } from "./gameApi";
import GameRiderUpdateDisplay from "./GameRiderUpdateDisplay";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";
import "./gameRiderUpdateDisplay.css";

type Props = {
  gameId: string;
};

export default function GameHeats({ gameId }: Props) {
  const { data: eventsWithRider, isLoading: eventsWithRidersLoading } =
    useFetchGameEventsWithRidersQuery(gameId ?? "");

  if (eventsWithRidersLoading || !eventsWithRider) return <Box>Loading...</Box>;

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
      .filter((x) => "123".includes(x.eventResponseDto.eventResult));
    const home = eleToCount
      .filter((x) => x.eventResponseDto.homeAway === "Home")
      .reduce((sum, x) => (sum += +x.eventResponseDto.eventResult), 0);
    const away = eleToCount
      .filter((x) => x.eventResponseDto.homeAway === "Away")
      .reduce((sum, x) => (sum += +x.eventResponseDto.eventResult), 0);

    return `${home}:${away}`;
  };

  return (
    <Box>
      {chunkArray(
        eventsWithRider.filter((x) => x.eventResponseDto.riderHeatNumber != 99),
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
            {calculateScore(index + 1)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
