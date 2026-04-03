import type { DefaultResponse } from "../response/defaultResponse"

export interface TeamResponse extends DefaultResponse {
    id: string,
    name: string,
    city: string,
    country: string
}