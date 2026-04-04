import {
  Grid,
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material";
import { useFetchTeamsQuery } from "../team/teamApi";
import { useState } from "react";
import {
  useAddGamesByTeamsIdMutation,
  useFetchGameLevelsQuery,
  useFetchSeasonGamesQuery,
} from "../game/gameApi";
import type { GamesByTeamsIdRequest } from "../../types/request/gamesByTeamIdRequest";
import { useParams } from "react-router-dom";
import GameList from "../game/GameList";

export default function SeasonDetails() {
  const { id: seasonId, year: seasonYear } = useParams();
  const { data: teams, isLoading: teamsLoading } = useFetchTeamsQuery();
  const [addGamesByTeamsId, { isLoading: addingGames }] =
    useAddGamesByTeamsIdMutation();
  const { data: levels, isLoading: levelsLoading } = useFetchGameLevelsQuery();
  const { data: games, isLoading: gamesLodaing } = useFetchSeasonGamesQuery(
    seasonId ?? "",
  );
  const [teamsToPair, setTeamsToPair] = useState<string[]>([]);
  const [level, setLevel] = useState("");

  if (
    teamsLoading ||
    !teams ||
    levelsLoading ||
    !levels ||
    gamesLodaing ||
    !games
  )
    return <div>Loading...</div>;

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setTeamsToPair((prev) => prev.filter((x) => x !== event.target.value));
    } else {
      setTeamsToPair((prev) => [...prev, event.target.value]);
    }
  };

  const handleLevelSelection = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const addGames = async () => {
    const levelId = levels.filter((x) => x.gameLevel === level)[0].id;
    const body = {
      teamIds: teamsToPair,
      seasonId: seasonId,
      gameLevelId: levelId,
      gameDate: `${seasonYear}-01-01`,
    } as GamesByTeamsIdRequest;
    setLevel("");
    await addGamesByTeamsId(body);
    setTeamsToPair([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GameList seasonId={seasonId ?? ""} teams={teams} levels={levels} />

      <Grid
        container
        marginLeft={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {teams.map((team) => (
          <Grid size={2} display="flex" key={team.id}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  value={team.id}
                  checked={teamsToPair.includes(team.id)}
                />
              }
              label={team.city}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 2, minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Level</InputLabel>
          <Select value={level} label="Level" onChange={handleLevelSelection}>
            {levels.map((level) => (
              <MenuItem key={level.id} value={level.gameLevel!}>
                {level.gameLevel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        onClick={addGames}
        disabled={level.length === 0 || teamsToPair.length < 2 || addingGames}
      >
        Create Games
      </Button>
    </Box>
  );
}
