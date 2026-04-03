import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { GameLevelResponse } from "../../types/gameLevelResponse";
import type { DefaultResponse } from "../../types/defaultResponse";
import type { GamesByTeamsIdRequest } from "../../types/request/gamesByTeamIdRequest";

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/game' }),
    endpoints: (builder) => ({
        fetchGameLevels: builder.query<GameLevelResponse[], void>({
            query: () => ({ url: 'levels' })
        }),
        addGamesByTeamsId: builder.mutation<DefaultResponse, GamesByTeamsIdRequest>({
            query: (gamesRequest) => {
                return {
                    url: 'games',
                    method: 'POST',
                    body: gamesRequest
                }
            }
        })
    })
})

export const { useFetchGameLevelsQuery, useAddGamesByTeamsIdMutation } = gameApi;