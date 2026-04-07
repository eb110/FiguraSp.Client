import type { DefaultResponse } from "../response/defaultResponse"

export interface GameLevelResponse extends DefaultResponse {
    id: string | null,
    gameLevel: string | null
}