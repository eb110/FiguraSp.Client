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
  useFetchGameRiderEventsQuery,
  useRemoveGameRiderEventsMutation,
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

  const [selectRider, setSelectRider] = useState<RiderResponse | null>(null);
  const [startingNumber, setStartingNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const { data: team, isLoading: teamLoading } = useFetchTeamQuery(
    side === "Home" ? game.teamHomeId : game.teamAwayId,
  );
  const [postRiderEvents, { isLoading: riderEventsPosting }] =
    useAddRiderEventsMutation();

  const [deleteGameRiderEvents, { isLoading: deletingEvents }] =
    useRemoveGameRiderEventsMutation();
  if (
    teamLoading ||
    !team ||
    concatenatedRiderEventsLoading ||
    !concatenatedRiderEvents
  )
    return <Box>Loading...</Box>;

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

  const handleDelete = async (gameId: string, riderId: string) => {
    try {
      await deleteGameRiderEvents({ gameId, riderId });
    } catch (error) {
      console.log(error);
    }
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
            {startingNumbers
              .filter((x) => (side === "Home" ? x > 8 : x < 9))
              .filter(
                (x) =>
                  !concatenatedRiderEvents.gameRiderEvents.some(
                    (event) => event.riderGameNumber === x,
                  ),
              )
              .map((nr) => (
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
            <ListItem key={event.riderId} sx={{ height: "30px" }}>
              <ListItemText
                sx={{ width: "60%" }}
                primary={`${event.riderGameNumber}.${event.name} ${event.surname}: ${event.result}`}
              />
              <ListItemText
                primary={`Age: ${+game.gameDate.substring(0, 4) - +event.doB.substring(0, 4)}`}
              />
              <Button
                onClick={() => handleDelete(event.gameId, event.riderId)}
                variant="contained"
                disabled={deletingEvents}
                sx={{ height: "120%" }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
