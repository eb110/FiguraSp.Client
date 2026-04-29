import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { GameResponse } from "../../types/response/gameResponse";
import type { TeamResponse } from "../../types/response/teamResponse";
import type { GameLevelResponse } from "../../types/response/gameLevelResponse";
import type { GameStageResponse } from "../../types/response/gameStageResponse";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEditGameMutation } from "./gameApi";
import type { GamesEditRequestDto } from "../../types/request/gameEditRequestDto";

type Props = {
  game: GameResponse;
  teams: TeamResponse[];
  levels: GameLevelResponse[];
  stages: GameStageResponse[];
};

export default function GameEditDetails({
  game,
  teams,
  levels,
  stages,
}: Props) {
  const [stage, setStage] = useState("");
  const [dob, setDob] = useState<Dayjs | null>(dayjs(game.gameDate));
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);

  const [editGame, { isLoading: gameEditing }] = useEditGameMutation();

  const handleGameDetails = (game: GameResponse) => {
    const teamHome = teams.filter((x) => x.id === game.teamHomeId)[0];
    const teamAway = teams.filter((x) => x.id === game.teamAwayId)[0];
    const level = levels.filter((x) => x.id === game.levelId)[0];
    if (game.stageId) {
      return `${teamHome.city} - ${teamAway.city} [${game.homeScore}:${game.awayScore}] ${stages.filter((x) => x.id === game.stageId)[0].gameStage} ${level.gameLevel} ${game.gameDate}`;
    }
    return `${teamHome.city} - ${teamAway.city} : ${level.gameLevel}`;
  };

  const handleStageSelection = (event: SelectChangeEvent) => {
    setStage(event.target.value as string);
  };

  const handleConfirm = async () => {
    const updatedGame: GamesEditRequestDto = {
      id: game.id,
      stageId: stages.filter((x) => x.gameStage === stage)[0].id!,
      gameDate: dob!.toISOString().substring(0, 10),
      homeScore,
      awayScore,
    };
    await editGame(updatedGame);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScoreChange = (event: any, side: string) => {
    if (event && side === "home") setHomeScore(event.target.value);
    if (event && side === "away") setAwayScore(event.target.value);
  };

  if (gameEditing) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box key={game.id} display="flex" flexDirection="row" gap={1} m={1}>
      {game.stageId && (
        <Button
          component={Link}
          to={game.inserted ? `/seasons` : `/games/${game.id}/${game.gameDate}`}
          variant="contained"
        >
          {game.inserted ? "View" : "Edit"}
        </Button>
      )}
      {!game.stageId && (
        <>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!stage || homeScore < 12 || awayScore < 12}
          >
            Confirm
          </Button>
          <TextField
            sx={{ width: "7%" }}
            type="number"
            label="Home"
            variant="outlined"
            value={homeScore}
            onChange={(event) => handleScoreChange(event, "home")}
          />
          <TextField
            sx={{ width: "7%" }}
            type="number"
            label="Away"
            variant="outlined"
            value={awayScore}
            onChange={(event) => handleScoreChange(event, "away")}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ paddingTop: 0, margin: 0 }}
            >
              <DatePicker
                value={dob}
                onChange={(newValue) => setDob(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControl sx={{ width: "10%" }}>
            <InputLabel>Stage</InputLabel>
            <Select value={stage} label="Stage" onChange={handleStageSelection}>
              {stages.map((stage) => (
                <MenuItem key={stage.id} value={stage.gameStage!}>
                  {stage.gameStage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      <Typography alignContent={"center"}>{handleGameDetails(game)}</Typography>
    </Box>
  );
}
