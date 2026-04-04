import type { DefaultResponse } from "../response/defaultResponse"

export interface SeasonResponse extends DefaultResponse {
    id: string,
    year: string
}