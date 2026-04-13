import type { DefaultResponse } from "./defaultResponse"

export interface TeamResponse extends DefaultResponse {
    id: string,
    name: string,
    city: string,
    country: string
}