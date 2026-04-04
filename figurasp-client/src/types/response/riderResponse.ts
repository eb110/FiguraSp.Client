import type { DefaultResponse } from "../response/defaultResponse"

export interface RiderResponse extends DefaultResponse {
    id: string,
    name: string,
    surname: string,
    nationality: string,
    doB: string,
    pictureUrl: string
}