import type { DefaultResponse } from "../response/defaultResponse"

export interface GameResponse extends DefaultResponse {
    id: string,
    teamHomeId: string,
    teamAwayId: string,
    seasonId: string,
    levelId: string,
    inserted: boolean
}