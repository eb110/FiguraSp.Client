import type { DefaultResponse } from "./defaultResponse"

export interface GameLevelResponse extends DefaultResponse {
    id: string | null,
    gameLevel: string | null
}