import type { DefaultResponse } from "./defaultResponse"

export interface TeamResponse extends DefaultResponse {
    id: string | null,
    name: string | null,
    city: string | null,
    country: string | null
}