import type { DefaultResponse } from "./defaultResponse"

export interface SeasonResponse extends DefaultResponse {
    id: string,
    year: string
}