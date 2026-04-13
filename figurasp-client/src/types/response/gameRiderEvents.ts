import type { RiderResponse } from "./riderResponse";

export interface GameRiderEvents extends RiderResponse {
    gameRiderEvents: GameRiderEvent[]
}

export interface GameRiderEvent {
    riderId: string,
    gameId: string,
    riderGameNumber: number,
    homeAway: string,
    name: string,
    surname: string,
    doB: string,
    result: string,
    heats: string,
    rows: string,
    heatsCount: number,
    points: number,
}