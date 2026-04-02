import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TeamResponse } from "../../types/teamResponse";

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/team' }),
    endpoints: (builder) => ({
        fetchTeams: builder.query<TeamResponse[], void>({
            query: () => ({ url: 'teams' })
        })
    })
})

export const { useFetchTeamsQuery } = teamApi;