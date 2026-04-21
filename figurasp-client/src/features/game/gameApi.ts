import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { GameLevelResponse } from "../../types/response/gameLevelResponse";
import type { DefaultResponse } from "../../types/response/defaultResponse";
import type { GamesByTeamsIdRequest } from "../../types/request/gamesByTeamIdRequest";
import type { GameResponse } from "../../types/response/gameResponse";
import type { RiderEventsRequest } from "../../types/request/newGameEventRequest";
import type { EventResponse } from "../../types/response/eventResponse";
import type { GameRiderEvents } from "../../types/response/gameRiderEvents";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/game' }),
    tagTypes: ['SeasonGames', 'RidersEventsBased', 'RiderEvents', 'EventsWithRider'],
    endpoints: (builder) => ({
        fetchGameLevels: builder.query<GameLevelResponse[], void>({
            query: () => ({ url: 'levels' })
        }),
        fetchSeasonGames: builder.query<GameResponse[], string>({
            query: (seasonId) => ({ url: `seasonGames?seasonId=${seasonId}` }),
            providesTags: ['SeasonGames']
        }),
        fetchGameEventsWithRiders: builder.query<EventWithRiderResponse[], string>({
            query: (gameId) => ({ url: `gameEventsWithRider?gameId=${gameId}` }),
            providesTags: ['EventsWithRider']
        }),
        //list of riders buit upon their events
        fetchGameEvents: builder.query<EventResponse[], { gameId: string, homeAway: string }>({
            query: ({ gameId, homeAway }) => ({ url: `gameEvents?gameId=${gameId}&homeAway=${homeAway}` }),
            providesTags: ['RidersEventsBased']
        }),
        //list of game event riders with concatenated result
        fetchGameRiderEvents: builder.query<GameRiderEvents, { gameId: string, homeAway: string }>({
            query: ({ gameId, homeAway }) => ({ url: `gameRiderEvents?gameId=${gameId}&homeAway=${homeAway}` }),
            providesTags: ['RiderEvents']
        }),
        changeEvents: builder.mutation<DefaultResponse, { oldEventId: string, newEventId: string }>({
            query: ({ oldEventId, newEventId }) => {
                return { url: `changeEvents?oldEventId=${oldEventId}&newEventId=${newEventId}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        calculateBonuses: builder.mutation<DefaultResponse, string>({
            query: (gameId) => {
                return { url: `calculateBonuses?gameId=${gameId}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        resetEventsToDefault: builder.mutation<DefaultResponse, string>({
            query: (gameId) => {
                return { url: `resetEventsToDefault?gameId=${gameId}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        removeGameRiderEvents: builder.mutation<void, { gameId: string, riderId: string }>({
            query: ({ gameId, riderId }) => {
                return {
                    url: `removeGameRiderEvents?gameId=${gameId}&riderId=${riderId}`,
                    method: 'DELETE',
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
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
        }),
        addRiderEvents: builder.mutation<number, RiderEventsRequest>({
            query: (riderEventsRequest) => {
                return {
                    url: 'riderEvents',
                    method: 'POST',
                    body: riderEventsRequest
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
    })
})

export const { useFetchGameEventsQuery, useChangeEventsMutation, useFetchGameEventsWithRidersQuery,
    useRemoveGameRiderEventsMutation, useFetchGameRiderEventsQuery, useFetchGameLevelsQuery, useAddGamesByTeamsIdMutation,
    useFetchSeasonGamesQuery, useFetchGameQuery, useAddRiderEventsMutation, useCalculateBonusesMutation, useResetEventsToDefaultMutation } = gameApi;