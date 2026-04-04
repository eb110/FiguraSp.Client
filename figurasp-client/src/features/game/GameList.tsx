import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import type { GameLevelResponse } from "../../types/response/gameLevelResponse";
import type { TeamResponse } from "../../types/response/teamResponse";
import { useFetchSeasonGamesQuery } from "./gameApi";
import type { GameResponse } from "../../types/response/gameResponse";
import { Link } from "react-router-dom";

type Props = {
  seasonId: string;
  teams: TeamResponse[];
  levels: GameLevelResponse[];
};

export default function GameList({ seasonId, teams, levels }: Props) {
  const { data: games, isLoading: gamesLodaing } =
    useFetchSeasonGamesQuery(seasonId);

  if (gamesLodaing || !games) return <div>Loading...</div>;

  const handleGameDetails = (game: GameResponse) => {
    const teamHome = teams.filter((x) => x.id === game.teamHomeId)[0];
    const teamAway = teams.filter((x) => x.id === game.teamAwayId)[0];
    const level = levels.filter((x) => x.id === game.levelId)[0];
    return `${teamHome.city} - ${teamAway.city} : ${level.gameLevel}`;
  };

  return (
    <List>
      {games.map((game) => (
        <Box key={game.id} display="flex" maxHeight="20px" m={1}>
          <ListItem>
            <ListItemText primary={handleGameDetails(game)} />
          </ListItem>
          <Button
            component={Link}
            to={`/games/${game.id}/${game.gameDate}`}
            variant="contained"
          >
            Edit
          </Button>
        </Box>
      ))}
    </List>
  );
}
