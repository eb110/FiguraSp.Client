import type { DefaultResponse } from "../response/defaultResponse"

export interface CountryResponse extends DefaultResponse {
    id: string,
    name: string,
    flagPictureUrl: string
}