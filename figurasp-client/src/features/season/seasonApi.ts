import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { SeasonResponse } from "../../types/response/seasonResponse";

export const seasonApi = createApi({
    reducerPath: 'seasonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/game' }),
    tagTypes: ['Seasons'],
    endpoints: (builder) => ({
        fetchSeasons: builder.query<SeasonResponse[], void>({
            query: () => ({ url: 'seasons' }),
            providesTags: ['Seasons']
        }),
        createSeason: builder.mutation<SeasonResponse, string>({
            query: (year) => ({
                url: `season?year=${year}`,
                method: 'POST'
            }),
            onQueryStarted: (_, { dispatch }) => {
                dispatch(seasonApi.util.invalidateTags(['Seasons']))
            }
        }),
        fetchSeason: builder.query<SeasonResponse, string>({
            query: (id) => ({ url: `season?id=${id}` })
        })
    })
})

export const { useFetchSeasonsQuery, useCreateSeasonMutation, useFetchSeasonQuery } = seasonApi;