import type { EventResponse } from "./eventResponse";
import type { RiderResponse } from "./riderResponse";

export interface EventWithRiderResponse {
    riderResponseDto: RiderResponse
    eventResponseDto: EventResponse
}
