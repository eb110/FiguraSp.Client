import type { Rider } from "../../types/rider";
import { Container, Typography } from "@mui/material";

type Props = {
  riders: Rider[];
};

export default function RiderList({ riders }: Props) {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" color="secondary">
        Riders
      </Typography>
      <ul>
        {riders.map((rider) => (
          <li key={rider.id}>{rider.surname}</li>
        ))}
      </ul>
    </Container>
  );
}
