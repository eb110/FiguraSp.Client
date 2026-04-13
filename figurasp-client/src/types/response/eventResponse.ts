import type { DefaultResponse } from "./defaultResponse";

export interface EventResponse extends DefaultResponse {
    id: string,
    gameId: string,
    riderId: string,
    riderGameNumber: number,
    riderHeatNumber: number,
    riderRowNumber: number,
    eventResult: string,
    homeAway: string
}
