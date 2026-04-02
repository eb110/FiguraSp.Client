import type { DefaultResponse } from "./defaultResponse"

export interface SeasonResponse extends DefaultResponse {
    id: string | null,
    year: string | null
}