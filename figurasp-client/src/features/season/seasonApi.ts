import { createApi } from "@reduxjs/toolkit/query/react";
import type { SeasonResponse } from "../../types/response/seasonResponse";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const seasonApi = createApi({
    reducerPath: 'seasonApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Seasons'],
    endpoints: (builder) => ({
        fetchSeasons: builder.query<SeasonResponse[], void>({
            query: () => ({ url: 'game/seasons' }),
            providesTags: ['Seasons']
        }),
        createSeason: builder.mutation<SeasonResponse, string>({
            query: (year) => ({
                url: `game/season?year=${year}`,
                method: 'POST'
            }),
            onQueryStarted: (_, { dispatch }) => {
                dispatch(seasonApi.util.invalidateTags(['Seasons']))
            }
        }),
        fetchSeason: builder.query<SeasonResponse, string>({
            query: (id) => ({ url: `game/season?id=${id}` })
        })
    })
})

export const { useFetchSeasonsQuery, useCreateSeasonMutation, useFetchSeasonQuery } = seasonApi;