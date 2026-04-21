import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";
import { useChangeEventsMutation } from "./gameApi";

type Props = {
  riderEvent: EventWithRiderResponse;
};

export default function GameRiderUpdateDisplay({ riderEvent }: Props) {
  const [changeEvents, { isLoading: changingEvents }] =
    useChangeEventsMutation();

  if (changingEvents) return <Box>Loading...</Box>;

  const handleRiderChange = async (
    toto: EventWithRiderResponse,
    event: SelectChangeEvent,
  ) => {
    await changeEvents({
      oldEventId: toto.eventResponseDto.id,
      newEventId: toto.eventChanges[+event.target.value].id,
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      border={1}
      borderColor={"red"}
      width={"25%"}
    >
      <Typography alignContent={"center"} minWidth={"50%"} paddingLeft={1}>
        {riderEvent.riderResponseDto.surname} <br />{" "}
        {riderEvent.riderResponseDto.name}
      </Typography>
      <Typography
        paddingRight={2}
        minWidth={"10%"}
        textAlign={"right"}
        alignContent={"center"}
      >
        {riderEvent.eventResponseDto.eventResult}
      </Typography>
      <FormControl sx={{ width: "40%" }}>
        <InputLabel>Change</InputLabel>
        <Select
          value=""
          label="Change"
          onChange={(e) =>
            handleRiderChange(riderEvent, e as SelectChangeEvent)
          }
        >
          {riderEvent.eventChanges.map((change, index) => (
            <MenuItem key={index} value={index}>
              {riderEvent.riderChanges[index].surname} {change.eventResult}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
