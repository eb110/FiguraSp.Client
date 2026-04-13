import type { DefaultResponse } from "./defaultResponse"

export interface RiderResponse extends DefaultResponse {
    id: string,
    name: string,
    surname: string,
    nationality: string,
    doB: string,
    pictureUrl: string
}