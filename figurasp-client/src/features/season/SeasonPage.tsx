import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useCreateSeasonMutation, useFetchSeasonsQuery } from "./seasonApi";
import { Link } from "react-router-dom";

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
      <List sx={{ display: "flex" }}>
        {data.map((season) => (
          <ListItem key={season.id}>
            <Typography sx={{ marginRight: 2 }} variant="h6">
              {season.year}
            </Typography>
            <Button
              component={Link}
              to={`/seasons/${season.id}/${season.year}`}
              variant="contained"
            >
              View
            </Button>
          </ListItem>
        ))}
      </List>
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
