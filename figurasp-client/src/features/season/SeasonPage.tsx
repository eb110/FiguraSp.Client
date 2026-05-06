import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useCreateSeasonMutation, useFetchSeasonsQuery } from "./seasonApi";
import { Link } from "react-router-dom";
import { useState } from "react";

const seasonYears = [...Array(78).keys()].map((x) => "" + (x + 1948));

export default function SeasonPage() {
  const { data, isLoading } = useFetchSeasonsQuery();
  const [seasonYearToAdd, setSeasonYearToAdd] = useState<string>("1948");
  const [createSeason, { isLoading: seasonCreating }] =
    useCreateSeasonMutation();

  const handleSeasonYears = (event: SelectChangeEvent) => {
    setSeasonYearToAdd(event.target.value as string);
  };

  const addNewSeason = () => {
    console.log("adding season", seasonYearToAdd);
    createSeason(seasonYearToAdd);
  };

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column" }}>
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
      <Box display="flex" justifyContent="center">
        <FormControl sx={{ width: "150px" }}>
          <InputLabel>Nr</InputLabel>
          <Select
            value={seasonYearToAdd}
            label="Year"
            onChange={handleSeasonYears}
          >
            {seasonYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          //  onClick={() => createSeason(seasonYearToAdd)}
          onClick={addNewSeason}
          sx={{ width: "150px" }}
          variant="contained"
          disabled={seasonCreating}
        >
          Add Season
        </Button>
      </Box>
    </Box>
  );
}
