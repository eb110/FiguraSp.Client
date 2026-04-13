import type { DefaultResponse } from "./defaultResponse"

export interface GameResponse extends DefaultResponse {
    id: string,
    teamHomeId: string,
    teamAwayId: string,
    seasonId: string,
    levelId: string,
    inserted: boolean,
    gameDate: string
}