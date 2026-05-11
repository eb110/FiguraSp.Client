import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { UserResponseDto } from "../../types/response/userResponseDto";
import type { UserRegisterRequestDto } from "../../types/request/userRegisterRequestDto";
import type { LoginSchema } from "../../tools/schemas/loginSchema";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/user' }),
    tagTypes: [],
    endpoints: (builder) => ({
        registerUser: builder.mutation<UserResponseDto, UserRegisterRequestDto>({
            query: (newUser) => {
                return {
                    url: 'register',
                    method: 'POST',
                    body: newUser
                }
            },
        }),
        //login schema as a request as it provides direct mapping to api requested object
        //and handles validation by zod feature
        loginUser: builder.mutation<UserResponseDto, LoginSchema>({
            query: (user) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: user
                }
            },
        })
    })
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;