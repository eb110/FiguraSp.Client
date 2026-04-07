import { createApi } from "@reduxjs/toolkit/query/react";
import type { RiderResponse } from "../../types/response/riderResponse";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RiderRequest } from "../../types/request/newRiderRequest";

export const riderApi = createApi({
    reducerPath: 'riderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/rider' }),
    tagTypes: ['SeasonRiders'],
    endpoints: (builder) => ({
        fetchSeasonRiders: builder.query<RiderResponse[], string>({
            query: (year) => ({ url: `seasonRiders?year=${year}` }),
            providesTags: ['SeasonRiders']
        }),
        addRider: builder.mutation<RiderResponse, RiderRequest>({
            query: (newRider) => {
                return {
                    url: '',
                    method: 'POST',
                    body: newRider
                }
            },
            onQueryStarted: (_, { dispatch }) => {
                dispatch(riderApi.util.invalidateTags(['SeasonRiders']))
            }
        })
    })
});

export const { useFetchSeasonRidersQuery, useAddRiderMutation } = riderApi;