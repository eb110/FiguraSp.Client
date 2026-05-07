import { http, HttpResponse, delay } from "msw";
import { SeasonResponse } from "../../src/types/response/seasonResponse";
import { TeamResponse } from "../../src/types/response/teamResponse";

const seasons = [
    { id: '1', year: '2025', success: true, errors: [] },
    { id: '2', year: "2026", success: true, errors: [] },
] as SeasonResponse[];

const gameResponse = [{
    id: '1',
    teamHomeId: '1',
    teamAwayId: '2',
    seasonId: '1',
    levelId: '1',
    stageId: '1',
    inserted: false,
    gameDate: '2025-05-01',
    homeScore: 50,
    awayScore: 40,
    success: true,
    errors: []
}];

const gameLevels = [
    {
        id: '1',
        gameLevel: 'DMP1',
        success: true,
        errors: []
    },
    {
        id: '2',
        gameLevel: 'DMP2',
        success: true,
        errors: []
    },
    {
        id: '3',
        gameLevel: 'DMP3',
        success: true,
        errors: []
    }
]

const gameStages = [
    {
        id: '1',
        gameStage: 'Runda I',
        success: true,
        errors: []
    },
    {
        id: '2',
        gameStage: 'Runda II',
        success: true,
        errors: []
    },
    {
        id: '3',
        gameStage: 'Runda III',
        success: true,
        errors: []
    }
]

const season =
    { id: '3', year: '1949', success: true, errors: [] } as SeasonResponse

const teams = [
    { id: '1', name: "Team A", city: 'opole', country: 'zsrr', success: true, errors: [] },
    { id: '2', name: "Team B", city: 'warsaw', country: 'poland', success: true, errors: [] },
] as TeamResponse[];

let counter = 0;

export const handlers = [
    http.get("http://localhost:5000/api/team/teams", async () => {
        await delay(150);
        return HttpResponse.json(teams);
    }),
    http.get("http://localhost:5000/api/game/levels", async () => {
        await delay(150);
        return HttpResponse.json(gameLevels);
    }),
    http.get("http://localhost:5000/api/game/stages", async () => {
        await delay(150);
        return HttpResponse.json(gameStages);
    }),
    http.get("http://localhost:5000/api/game/seasons", async () => {
        if (counter++ !== 0) {
            seasons.push(season);
        }
        await delay(150);
        return HttpResponse.json(seasons);
    }),
    http.get(`http://localhost:5000/api/game/seasonGames`, async ({ request }) => {
        console.log(request.method, request.url)
        //    const url = new URL(request.url)
        await delay(150);
        return HttpResponse.json(gameResponse);
    }),
    http.post(`http://localhost:5000/api/game/season`, async ({ request }) => {
        console.log(request.method, request.url)
        //    const url = new URL(request.url)
        await delay(150);
        return HttpResponse.json(season);
    }),
];