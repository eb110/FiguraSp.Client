import { Box } from "@mui/material";
import type { GameLevelResponse } from "../../types/response/gameLevelResponse";
import type { TeamResponse } from "../../types/response/teamResponse";
import { useFetchGameStagesQuery, useFetchSeasonGamesQuery } from "./gameApi";
import GameEditDetails from "./GameEditDetails";

type Props = {
  seasonId: string;
  teams: TeamResponse[];
  levels: GameLevelResponse[];
};

export default function GameList({ seasonId, teams, levels }: Props) {
  const { data: games, isLoading: gamesLodaing } =
    useFetchSeasonGamesQuery(seasonId);

  const { data: stages, isLoading: stagesLoading } = useFetchGameStagesQuery();

  if (gamesLodaing || !games || stagesLoading || !stages)
    return <div>Loading...</div>;

  return (
    <Box width={"100%"}>
      {games.map((game) => (
        <GameEditDetails
          key={game.id}
          game={game}
          teams={teams}
          levels={levels}
          stages={stages}
        />
      ))}
    </Box>
  );
}
