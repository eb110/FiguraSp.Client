import { useParams } from "react-router-dom";
import {
  useChangeEventsMutation,
  useFetchGameEventsWithRidersQuery,
  useFetchGameQuery,
} from "./gameApi";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import {
  useAddRiderMutation,
  useFetchSeasonRidersQuery,
} from "../rider/riderApi";
import GameRiders from "./GameRiders";
import { useState, type SyntheticEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  useFetchCountriesQuery,
  useFetchFirstNamesQuery,
} from "../network/networkApi";
import type { RiderRequest } from "../../types/request/newRiderRequest";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";

export default function GamePage() {
  const { id: gameId, year: gameDate } = useParams();
  const { data: game, isLoading: gameLoading } = useFetchGameQuery(
    gameId ?? "",
  );
  const { data: eventWithRider, isLoading: eventWithRidersLoading } =
    useFetchGameEventsWithRidersQuery(gameId ?? "");
  const { data: riders, isLoading: ridersLoadoing } = useFetchSeasonRidersQuery(
    gameDate ?? "",
  );
  const { data: firstNames, isLoading: firstNamesLoading } =
    useFetchFirstNamesQuery();
  const { data: countries, isLoading: countriesLoading } =
    useFetchCountriesQuery();
  const [addNewRider, { isLoading: addingNewRider }] = useAddRiderMutation();
  const [changeEvents, { isLoading: changingEvents }] =
    useChangeEventsMutation();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [dob, setDob] = useState<Dayjs | null>(dayjs("2022-04-17"));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSurnameChange = (event: any) => {
    if (event) setSurname(event.target.value);
    console.log();
  };

  const addRider = async () => {
    const newRider: RiderRequest = {
      name: name,
      surname: surname,
      nationality: nationality,
      doB: dob!.toISOString().substring(0, 10),
      pictureUrl: "",
    };
    await addNewRider(newRider);
  };

  const handleRiderChange = async (
    toto: EventWithRiderResponse,
    event: SelectChangeEvent,
  ) => {
    await changeEvents({
      oldEventId: toto.eventResponseDto.id,
      newEventId: toto.eventChanges[+event.target.value].id,
    });
  };

  if (
    gameLoading ||
    !game ||
    ridersLoadoing ||
    !riders ||
    firstNamesLoading ||
    !firstNames ||
    countriesLoading ||
    !countries ||
    eventWithRidersLoading ||
    !eventWithRider ||
    changingEvents
  )
    return <div>Loading...</div>;

  return (
    <Box>
      <Box display="flex" flexDirection="row">
        <GameRiders side="Home" riders={riders} game={game} />
        <GameRiders side="Away" riders={riders} game={game} />
      </Box>
      <Grid
        container
        border={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {eventWithRider
          .filter((x) => x.eventResponseDto.riderHeatNumber !== 99)
          .map((riderEvent) => (
            <Grid size={3} display="flex" key={riderEvent.eventResponseDto.id}>
              <Box
                display="flex"
                flexDirection="row"
                border={1}
                borderColor={"red"}
                minWidth={"100%"}
              >
                <Typography
                  textAlign={"center"}
                  minWidth={"40%"}
                  variant="h6"
                  paddingRight={2}
                >
                  {riderEvent.riderResponseDto.surname}
                </Typography>
                <Typography minWidth={"15%"} variant="h6">
                  {riderEvent.eventResponseDto.eventResult}
                </Typography>
                <FormControl sx={{ width: "45%" }}>
                  <InputLabel>Change</InputLabel>
                  <Select
                    value={surname}
                    label="Change"
                    onChange={(e) =>
                      handleRiderChange(riderEvent, e as SelectChangeEvent)
                    }
                  >
                    {riderEvent.eventChanges.map((change, index) => (
                      <MenuItem key={index} value={index}>
                        {riderEvent.riderChanges[index].surname}{" "}
                        {change.eventResult}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          ))}
      </Grid>
      <Box display="flex" flexDirection="row" marginTop={2}>
        <Autocomplete
          onChange={(
            _: SyntheticEvent<Element, Event>,
            newValue: string | null,
          ) => {
            setName(newValue ?? "");
          }}
          options={firstNames.map((x) => `${x.name}`)}
          sx={{ width: "25%" }}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
        <TextField
          sx={{ flexGrow: 1 }}
          type="text"
          label="Surname"
          variant="outlined"
          value={surname}
          onChange={handleSurnameChange}
        />
        <Autocomplete
          onChange={(
            _: SyntheticEvent<Element, Event>,
            newValue: string | null,
          ) => {
            setNationality(newValue ?? "");
          }}
          options={countries.map((x) => `${x.name}`)}
          sx={{ width: "25%" }}
          renderInput={(params) => (
            <TextField {...params} label="Nationality" />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ paddingTop: 0, margin: 0 }}
          >
            <DatePicker value={dob} onChange={(newValue) => setDob(newValue)} />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Button
        variant="contained"
        disabled={
          name.length < 1 ||
          !countries.some((x) => x.name === nationality) ||
          addingNewRider ||
          riders.some((x) => x.surname === surname && x.name === name)
        }
        sx={{
          width: "50%",
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: 1,
        }}
        onClick={addRider}
      >
        Add Rider
      </Button>
    </Box>
  );
}
