import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import type { DefaultResponse } from "../../types/response/defaultResponse";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api'
})

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    //start loading
    const result = await customBaseQuery(args, api, extraOptions);

    //stop loading
    if (result.error) {
        const { status, data } = result.error;
        const apiError = data as DefaultResponse;
        toast.error(`Error ${status}: ${apiError.errors || "Unknown error"}`);
    }

    return result;
}