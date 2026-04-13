import type { DefaultResponse } from "./defaultResponse"

export interface CountryResponse extends DefaultResponse {
    id: string,
    name: string,
    flagPictureUrl: string
}