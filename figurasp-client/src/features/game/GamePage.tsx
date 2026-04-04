import { useParams } from "react-router-dom";
import { useFetchGameQuery } from "./gameApi";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { useFetchSeasonRidersQuery } from "../rider/riderApi";

export default function GamePage() {
  const { id: gameId, year: gameDate } = useParams();
  const { data: game, isLoading: gameLoading } = useFetchGameQuery(
    gameId ?? "",
  );
  const { data: riders, isLoading: ridersLoadoing } = useFetchSeasonRidersQuery(
    gameDate ?? "",
  );
  const [value, setValue] = useState<string | null>(null);
  if (gameLoading || !game || ridersLoadoing || !riders)
    return <div>Loading...</div>;

  return (
    <Box>
      <Box display="flex" flexDirection="row">
        <Box width="50%" border={1} borderColor="black" m={1}>
          <Typography textAlign="center" m={1}>
            Home {game.gameDate}
          </Typography>
          <Box>
            <Typography m={1}>Riders</Typography>
            <Autocomplete
              disablePortal
              onChange={(
                event: SyntheticEvent<Element, Event>,
                newValue: string | null,
              ) => {
                setValue(newValue);
                console.log(value);
              }}
              options={riders.map((r) => r.surname)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Riders" />}
            />
          </Box>
        </Box>
        <Box width="50%" border={1} borderColor="black" m={1}>
          <Typography textAlign="center" m={1}>
            Away {game.gameDate}
          </Typography>
          <Box>
            <Typography m={1}>Riders</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
