import { Box, Button } from "@mui/material";
import { useCreateSeasonMutation, useFetchSeasonsQuery } from "./seasonApi";

export default function SeasonPage() {
  const { data, isLoading } = useFetchSeasonsQuery();
  const [createSeason, { isLoading: seasonCreating }] =
    useCreateSeasonMutation();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ul>
        {data.map((season) => (
          <li key={season.id}>{season.year}</li>
        ))}
      </ul>
      <Button
        onClick={() => createSeason({ year: "1961" })}
        sx={{ maxWidth: "30%" }}
        variant="contained"
        disabled={seasonCreating}
      >
        Add Season
      </Button>
    </Box>
  );
}
