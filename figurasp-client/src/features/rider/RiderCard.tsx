import type { Rider } from "../../types/rider";
import { CardMedia, Card, CardContent } from "@mui/material";

type Props = {
  rider: Rider;
};

export default function RiderCard({ rider }: Props) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 240, backgroundSize: "cover" }}
        image={rider.pictureUrl}
        title={`${rider.name} ${rider.surname}`}
      />
      <CardContent></CardContent>
    </Card>
  );
}
