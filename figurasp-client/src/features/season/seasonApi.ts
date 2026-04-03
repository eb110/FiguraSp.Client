import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { SeasonResponse } from "../../types/response/seasonResponse";

export const seasonApi = createApi({
    reducerPath: 'seasonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/game' }),
    endpoints: (builder) => ({
        fetchSeasons: builder.query<SeasonResponse[], void>({
            query: () => ({ url: 'seasons' })
        }),
        createSeason: builder.mutation<SeasonResponse, { year: string }>({
            query: ({ year }) => ({
                url: `season?year=${year}`,
                method: 'POST'
            })
        })
    })
})

export const { useFetchSeasonsQuery, useCreateSeasonMutation } = seasonApi;