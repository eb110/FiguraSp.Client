import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
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
import {
  useAddRiderEventsMutation,
  useFetchGameEventsQuery,
  useFetchGameRiderEventsQuery,
} from "./gameApi";
import type { RiderEventsRequest } from "../../types/request/newGameEventRequest";

type Props = {
  side: string;
  riders: RiderResponse[];
  game: GameResponse;
};

const startingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function GameRiders({ side, riders, game }: Props) {
  const {
    data: concatenatedRiderEvents,
    isLoading: concatenatedRiderEventsLoading,
  } = useFetchGameRiderEventsQuery({
    gameId: game.id,
    homeAway: side,
  });
  const { data: events, isLoading: eventsLoading } = useFetchGameEventsQuery({
    gameId: game.id,
    homeAway: side,
  });
  const [selectRider, setSelectRider] = useState<RiderResponse | null>(null);
  const [startingNumber, setStartingNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const { data: team, isLoading: teamLoading } = useFetchTeamQuery(
    side === "Home" ? game.teamHomeId : game.teamAwayId,
  );
  const [postRiderEvents, { isLoading: riderEventsPosting }] =
    useAddRiderEventsMutation();
  if (
    teamLoading ||
    !team ||
    eventsLoading ||
    !events ||
    concatenatedRiderEventsLoading ||
    !concatenatedRiderEvents
  )
    return <div>Loading...</div>;

  const addRiderEvents = async () => {
    if (selectRider) {
      const riderEvents: RiderEventsRequest = {
        gameId: game.id,
        riderId: selectRider.id,
        gameRiderNr: +startingNumber,
        gameRiderResult: result,
        homeAway: side,
      };
      await postRiderEvents(riderEvents);
      setResult("");
      setStartingNumber("");
      setSelectRider(null);
    }
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
      <Box display="flex" flexDirection="row" m={1}>
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
            _: SyntheticEvent<Element, Event>,
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
        <Button
          //onClick={addRiderToGameList}
          onClick={addRiderEvents}
          variant="contained"
          disabled={
            riderEventsPosting ||
            selectRider === null ||
            startingNumber === "" ||
            result === ""
          }
        >
          Add
        </Button>
      </Box>
      <Typography textAlign="center" m={1}>
        {side}: {team.name} {team.city}
      </Typography>
      <Box>
        <List>
          {concatenatedRiderEvents.gameRiderEvents.map((event) => (
            <ListItem key={event.riderId}>
              <ListItemText
                primary={`${event.riderGameNumber}.${event.name} ${event.surname}: ${event.result}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
