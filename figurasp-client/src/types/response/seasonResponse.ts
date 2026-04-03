import type { DefaultResponse } from "../response/defaultResponse"

export interface SeasonResponse extends DefaultResponse {
    id: string | null,
    year: string | null
}