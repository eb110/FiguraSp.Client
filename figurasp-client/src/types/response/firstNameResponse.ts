import type { DefaultResponse } from "../response/defaultResponse"

export interface FirstNameResponse extends DefaultResponse {
    id: string,
    name: string,
}