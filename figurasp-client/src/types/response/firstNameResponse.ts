import type { DefaultResponse } from "./defaultResponse"

export interface FirstNameResponse extends DefaultResponse {
    id: string,
    name: string,
}