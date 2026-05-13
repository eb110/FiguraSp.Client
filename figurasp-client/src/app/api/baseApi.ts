import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import type { DefaultResponse } from "../../types/response/defaultResponse";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api'
})

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    //start loading
    let result = await customBaseQuery(args, api, extraOptions);
    console.log('result: ', result)
    //authorization token refresh
    if (result.error && result.error.status === 401) {
        console.log('refresh of the token needed')
        // try to get a new token
        const refreshResult = await customBaseQuery('/user/refreshToken', api, extraOptions)
        console.log('refreshedTokenContent: ', refreshResult)
        if (refreshResult.data) {
            // retry the initial query
            result = await customBaseQuery(args, api, extraOptions)
        } else {
            console.log('token refresh error - expired or unvalid')
            //   api.dispatch(loggedOut())
        }
    }

    //stop loading
    if (result.error) {
        const { status, data } = result.error;
        const apiError = data as DefaultResponse;
        toast.error(`Error ${status}: ${apiError.errors || "Unknown error"}`);
    }

    return result;
}