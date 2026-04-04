import type { RiderResponse } from "./response/riderResponse";

export interface EditGameRider {
    riderResponse: RiderResponse,
    startingNumber: string,
    result: string
}