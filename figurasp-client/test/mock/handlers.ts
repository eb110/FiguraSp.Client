import { http, HttpResponse, delay } from "msw";
import { SeasonResponse } from "../../src/types/response/seasonResponse";
import { TeamResponse } from "../../src/types/response/teamResponse";

const seasons = [
    { id: '1', year: '2025', success: true, errors: [] },
    { id: '2', year: "2026", success: true, errors: [] },
] as SeasonResponse[];

const teams = [
    { id: '1', name: "Team A", city: 'opole', country: 'zsrr', success: true, errors: [] },
    { id: '2', name: "Team B", city: 'warsaw', country: 'poland', success: true, errors: [] },
] as TeamResponse[];

export const handlers = [
    http.get("http://localhost:5000/api/team/teams", async () => {
        await delay(150);
        return HttpResponse.json(teams);
    }),
    http.get("http://localhost:5000/api/game/seasons", async () => {
        await delay(150);
        return HttpResponse.json(seasons);
    }),
];