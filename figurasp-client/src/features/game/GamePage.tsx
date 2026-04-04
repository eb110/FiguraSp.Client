import { useParams } from "react-router-dom";
import { useFetchGameQuery } from "./gameApi";
import { Box } from "@mui/material";
import { useFetchSeasonRidersQuery } from "../rider/riderApi";
import GameRiders from "./GameRiders";

export default function GamePage() {
  const { id: gameId, year: gameDate } = useParams();
  const { data: game, isLoading: gameLoading } = useFetchGameQuery(
    gameId ?? "",
  );
  const { data: riders, isLoading: ridersLoadoing } = useFetchSeasonRidersQuery(
    gameDate ?? "",
  );

  if (gameLoading || !game || ridersLoadoing || !riders)
    return <div>Loading...</div>;

  return (
    <Box>
      <Box display="flex" flexDirection="row">
        <GameRiders side="Home" riders={riders} game={game} />
        <GameRiders side="Away" riders={riders} game={game} />
      </Box>
    </Box>
  );
}
