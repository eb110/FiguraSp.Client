import type { DefaultResponse } from "./defaultResponse"

export interface GameStageResponse extends DefaultResponse {
    id: string | null,
    gameStage: string | null
}