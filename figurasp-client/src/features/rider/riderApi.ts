import { createApi } from "@reduxjs/toolkit/query/react";
import type { RiderResponse } from "../../types/response/riderResponse";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const riderApi = createApi({
    reducerPath: 'riderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/rider' }),
    tagTypes: ['SeasonRiders'],
    endpoints: (builder) => ({
        fetchSeasonRiders: builder.query<RiderResponse[], string>({
            query: (year) => ({ url: `seasonRiders?year=${year}` }),
            providesTags: ['SeasonRiders']
        })
    })
});

export const { useFetchSeasonRidersQuery } = riderApi;