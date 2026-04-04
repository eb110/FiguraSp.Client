import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { GameLevelResponse } from "../../types/response/gameLevelResponse";
import type { DefaultResponse } from "../../types/response/defaultResponse";
import type { GamesByTeamsIdRequest } from "../../types/request/gamesByTeamIdRequest";
import type { GameResponse } from "../../types/response/gameResponse";

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/game' }),
    tagTypes: ['SeasonGames'],
    endpoints: (builder) => ({
        fetchGameLevels: builder.query<GameLevelResponse[], void>({
            query: () => ({ url: 'levels' })
        }),
        fetchSeasonGames: builder.query<GameResponse[], string>({
            query: (seasonId) => ({ url: `seasonGames?seasonId=${seasonId}` }),
            providesTags: ['SeasonGames']
        }),
        fetchGame: builder.query<GameResponse, string>({
            query: (id) => ({ url: `?id=${id}` }),
            providesTags: ['SeasonGames']
        }),
        addGamesByTeamsId: builder.mutation<DefaultResponse, GamesByTeamsIdRequest>({
            query: (gamesRequest) => {
                return {
                    url: 'games',
                    method: 'POST',
                    body: gamesRequest
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['SeasonGames']))
            }
        })
    })
})

export const { useFetchGameLevelsQuery, useAddGamesByTeamsIdMutation, useFetchSeasonGamesQuery, useFetchGameQuery } = gameApi;