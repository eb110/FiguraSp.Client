import { createApi } from "@reduxjs/toolkit/query/react";
import type { GameLevelResponse } from "../../types/response/gameLevelResponse";
import type { GameStageResponse } from "../../types/response/gameStageResponse";
import type { DefaultResponse } from "../../types/response/defaultResponse";
import type { GamesByTeamsIdRequest } from "../../types/request/gamesByTeamIdRequest";
import type { GameResponse } from "../../types/response/gameResponse";
import type { RiderEventsRequest } from "../../types/request/newGameEventRequest";
import type { EventResponse } from "../../types/response/eventResponse";
import type { GameRiderEvents } from "../../types/response/gameRiderEvents";
import type { EventWithRiderResponse } from "../../types/response/eventsWithRidersResponse";
import type { GamesEditRequestDto } from "../../types/request/gameEditRequestDto";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['SeasonGames', 'RidersEventsBased', 'RiderEvents', 'EventsWithRider'],
    endpoints: (builder) => ({
        fetchGameLevels: builder.query<GameLevelResponse[], void>({
            query: () => ({ url: 'game/levels' })
        }),
        fetchGameStages: builder.query<GameStageResponse[], void>({
            query: () => ({ url: 'game/stages' })
        }),
        fetchSeasonGames: builder.query<GameResponse[], string>({
            query: (seasonId) => ({ url: `game/seasonGames?seasonId=${seasonId}` }),
            providesTags: ['SeasonGames']
        }),
        fetchGameEventsWithRiders: builder.query<EventWithRiderResponse[], string>({
            query: (gameId) => ({ url: `game/gameEventsWithRider?gameId=${gameId}` }),
            providesTags: ['EventsWithRider']
        }),
        //list of riders buit upon their events
        fetchGameEvents: builder.query<EventResponse[], { gameId: string, homeAway: string }>({
            query: ({ gameId, homeAway }) => ({ url: `game/gameEvents?gameId=${gameId}&homeAway=${homeAway}` }),
            providesTags: ['RidersEventsBased']
        }),
        //list of game event riders with concatenated result
        fetchGameRiderEvents: builder.query<GameRiderEvents, { gameId: string, homeAway: string }>({
            query: ({ gameId, homeAway }) => ({ url: `game/gameRiderEvents?gameId=${gameId}&homeAway=${homeAway}` }),
            providesTags: ['RiderEvents']
        }),
        changeEvents: builder.mutation<DefaultResponse, { oldEventId: string, newEventId: string }>({
            query: ({ oldEventId, newEventId }) => {
                return { url: `game/changeEvents?oldEventId=${oldEventId}&newEventId=${newEventId}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        calculateBonuses: builder.mutation<DefaultResponse, string>({
            query: (gameId) => {
                return { url: `game/calculateBonuses?gameId=${gameId}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        resetEventsToDefault: builder.mutation<DefaultResponse, string>({
            query: (gameId) => {
                return { url: `game/resetEventsToDefault?gameId=${gameId}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        saveGame: builder.mutation<DefaultResponse, string>({
            query: (id) => {
                return { url: `game/saveGame?id=${id}`, method: 'POST' }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['SeasonGames']))
            }
        }),
        removeGameRiderEvents: builder.mutation<void, { gameId: string, riderId: string }>({
            query: ({ gameId, riderId }) => {
                return {
                    url: `game/removeGameRiderEvents?gameId=${gameId}&riderId=${riderId}`,
                    method: 'DELETE',
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['RidersEventsBased', 'RiderEvents', 'EventsWithRider']))
            }
        }),
        fetchGame: builder.query<GameResponse, string>({
            query: (id) => ({ url: `game/?id=${id}` }),
            providesTags: ['SeasonGames']
        }),
        addGamesByTeamsId: builder.mutation<DefaultResponse, GamesByTeamsIdRequest>({
            query: (gamesRequest) => {
                return {
                    url: `game/games`,
                    method: 'POST',
                    body: gamesRequest
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['SeasonGames']))
            }
        }),
        editGame: builder.mutation<DefaultResponse, GamesEditRequestDto>({
            query: (gameEditRequest) => {
                return {
                    url: `game/editGame`,
                    method: 'POST',
                    body: gameEditRequest
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(gameApi.util.invalidateTags(['SeasonGames']))
            }
        }),
        addRiderEvents: builder.mutation<number, RiderEventsRequest>({
            query: (riderEventsRequest) => {
                return {
                    url: 'game/riderEvents',
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

export const { useFetchGameEventsQuery, useChangeEventsMutation, useFetchGameEventsWithRidersQuery, useFetchGameStagesQuery,
    useRemoveGameRiderEventsMutation, useFetchGameRiderEventsQuery, useFetchGameLevelsQuery, useAddGamesByTeamsIdMutation,
    useFetchSeasonGamesQuery, useFetchGameQuery, useAddRiderEventsMutation, useCalculateBonusesMutation,
    useResetEventsToDefaultMutation, useEditGameMutation, useSaveGameMutation } = gameApi;