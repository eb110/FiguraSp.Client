import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { CountryResponse } from "../../types/response/countryResponse";
import type { FirstNameResponse } from "../../types/response/firstNameResponse";

export const networkApi = createApi({
    reducerPath: 'networkApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/network' }),
    endpoints: (builder) => ({
        fetchCountries: builder.query<CountryResponse[], void>({
            query: () => ({ url: 'countries' })
        }),
        fetchFirstNames: builder.query<FirstNameResponse[], void>({
            query: () => ({ url: 'firstNames' })
        })
    })
})

export const { useFetchCountriesQuery, useFetchFirstNamesQuery } = networkApi;