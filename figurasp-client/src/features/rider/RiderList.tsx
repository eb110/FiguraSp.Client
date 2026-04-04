import type { EditGameRider } from "../../types/editGameRider";
import { Container, Typography } from "@mui/material";

type Props = {
  riders: EditGameRider[];
};

export default function RiderList({ riders }: Props) {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" color="secondary">
        Riders
      </Typography>
      <ul>
        {riders.map((rider) => (
          <li key={rider.riderResponse.id}>
            {rider.startingNumber} {rider.riderResponse.name}{" "}
            {rider.riderResponse.surname} {rider.result}
          </li>
        ))}
      </ul>
    </Container>
  );
}
