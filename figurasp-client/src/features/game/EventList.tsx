import type { EventResponse } from "../../types/response/eventResponse";
import type { RiderResponse } from "../../types/response/riderResponse";

type Props = {
  events: EventResponse[];
  riders: RiderResponse[];
};

export default function EventList({ events, riders }: Props) {
  return <div>EventList</div>;
}
