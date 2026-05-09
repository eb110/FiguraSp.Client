import type { DefaultResponse } from "./defaultResponse"

export interface GameResponse extends DefaultResponse {
    id: string,
    teamHomeId: string,
    teamAwayId: string,
    seasonId: string,
    levelId: string,
    stageId: string | null,
    inserted: boolean,
    gameDate: string,
    homeScore: number,
    awayScore: number
}