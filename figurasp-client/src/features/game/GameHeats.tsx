import { Box, Button, Typography } from "@mui/material";
import {
  useCalculateBonusesMutation,
  useFetchGameEventsWithRidersQuery,
  useResetEventsToDefaultMutation,
  useSaveGameMutation,
} from "./gameApi";
import GameRiderUpdateDisplay from "./GameRiderUpdateDisplay";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";
import "./gameRiderUpdateDisplay.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  gameId: string;
};

export default function GameHeats({ gameId }: Props) {
  const navigate = useNavigate();

  const { data: eventsWithRider, isLoading: eventsWithRidersLoading } =
    useFetchGameEventsWithRidersQuery(gameId ?? "");

  const [calculateBonuses, { isLoading: calculatingBonuses }] =
    useCalculateBonusesMutation();

  const [resetEventsToDefault, { isLoading: resettingEvents }] =
    useResetEventsToDefaultMutation();

  const [gameSave, { isLoading: savingGame }] = useSaveGameMutation();

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

  const [heats, setHeats] = useState<EventWithRiderResponse[][]>([]);

  useEffect(() => {
    if (eventsWithRider) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeats(
        chunkArray(
          eventsWithRider.filter(
            (x) => x.eventResponseDto.riderHeatNumber < 99,
          ),
        ),
      );
    }
  }, [eventsWithRider]);

  if (
    eventsWithRidersLoading ||
    !eventsWithRider ||
    calculatingBonuses ||
    resettingEvents ||
    savingGame
  )
    return <Box>Loading...</Box>;

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

  const bonusesCalculation = async () => {
    await calculateBonuses(gameId);
  };

  const eventsReset = async () => {
    await resetEventsToDefault(gameId);
  };

  const saveGame = async () => {
    const result = await gameSave(gameId);
    if (result.data?.success) navigate(`/seasons`);
  };

  const validateHeats = (): boolean => {
    if (heats.length !== 13) return false;
    if (heats.every(validateHeat)) return true;
    return false;
  };

  const validateHeat = (heat: EventWithRiderResponse[]): boolean => {
    return heat.every((x) => x.eventResponseDto.eventResult !== "-");
  };

  return (
    <Box>
      {heats.map((heat, index) => (
        <Box
          display={"flex"}
          border={validateHeat(heat) ? 1 : 2}
          m={1}
          key={index}
          borderColor={validateHeat(heat) ? "black" : "red"}
        >
          {heat.map((riderEvent, cindex) => (
            <GameRiderUpdateDisplay riderEvent={riderEvent} key={cindex} />
          ))}
          <Typography
            minWidth={"5%"}
            alignContent={"center"}
            textAlign={"center"}
            paddingLeft={0.5}
            paddingRight={0.5}
          >
            Heat: {index + 1} <br /> {calculateScore(index + 1)}
          </Typography>
        </Box>
      ))}
      <Box textAlign={"center"} m={1}>
        <Button
          sx={{ m: 1 }}
          onClick={bonusesCalculation}
          variant="contained"
          disabled={!validateHeats()}
        >
          Bonuses
        </Button>
        <Button onClick={eventsReset} variant="contained">
          Reset
        </Button>
        <Button
          sx={{ m: 1 }}
          onClick={saveGame}
          variant="contained"
          disabled={!validateHeats()}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
