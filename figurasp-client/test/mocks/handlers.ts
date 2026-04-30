import { http, HttpResponse } from 'msw';

const gameId = '30AF5E34-D849-4977-3E4D-08DEA1140D0C'

export const handlers = [
    http.get(`http://localhost:5000/api/game/id=${gameId}`, () => {
        return HttpResponse.json({
            id: gameId,
            firstName: "John",
            lastName: "Maverick",
        });
    }),
];
