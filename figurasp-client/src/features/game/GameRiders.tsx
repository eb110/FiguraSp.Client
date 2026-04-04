import {
  Autocomplete,
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
import type { GameResponse } from "../../types/response/gameResponse";
import type { RiderResponse } from "../../types/response/riderResponse";
import { useState, type SyntheticEvent } from "react";
import { useFetchTeamQuery } from "../team/teamApi";
import RiderList from "../rider/RiderList";
import type { EditGameRider } from "../../types/editGameRider";

type Props = {
  side: string;
  riders: RiderResponse[];
  game: GameResponse;
};

const startingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function GameRiders({ side, riders, game }: Props) {
  const [selectRider, setSelectRider] = useState<RiderResponse | null>(null);
  const [gameRiders, setGameRiders] = useState<EditGameRider[]>([]);
  const [startingNumber, setStartingNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const { data: team, isLoading: teamLoading } = useFetchTeamQuery(
    side === "Home" ? game.teamHomeId : game.teamAwayId,
  );
  if (teamLoading || !team) return <div>Loading...</div>;

  const addRiderToGameList = () => {
    if (
      selectRider &&
      !gameRiders.some((x) => x.riderResponse.id === selectRider.id)
    )
      setGameRiders((prev) => [
        ...prev,
        {
          riderResponse: selectRider,
          startingNumber: startingNumber,
          result: result,
        } as EditGameRider,
      ]);
  };

  const handleStartingNumber = (event: SelectChangeEvent) => {
    setStartingNumber(event.target.value as string);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResultChange = (event: any) => {
    if (event) setResult(event.target.value);
  };

  return (
    <Box width="50%" border={1} borderColor="black" m={1}>
      <Typography textAlign="center" m={1}>
        {side}: {team.name} {team.city}
      </Typography>
      <Box>
        <RiderList riders={gameRiders} />
        <Box display="flex" flexDirection="row">
          <FormControl sx={{ width: "15%" }}>
            <InputLabel>Nr</InputLabel>
            <Select
              value={startingNumber}
              label="Nr"
              onChange={handleStartingNumber}
            >
              {startingNumbers.map((nr) => (
                <MenuItem key={nr} value={nr}>
                  {nr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            onChange={(
              event: SyntheticEvent<Element, Event>,
              newValue: string | null,
            ) => {
              setSelectRider(
                riders.filter((x) => `${x.surname} ${x.name}` === newValue)[0],
              );
            }}
            options={riders.map((x) => `${x.surname} ${x.name}`)}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label="Riders" />}
          />
          <TextField
            type="text"
            sx={{ maxWidth: "25%" }}
            label="Result"
            variant="outlined"
            value={result}
            onChange={handleResultChange}
          />
          <Button onClick={addRiderToGameList} variant="contained">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
