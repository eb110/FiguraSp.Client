import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { UserResponseDto } from "../../types/response/userResponseDto";
import type { UserRegisterRequestDto } from "../../types/request/userRegisterRequestDto";
import type { UserLoginRequestDto } from "../../types/request/userLoginRequestDto";

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
        loginUser: builder.mutation<UserResponseDto, UserLoginRequestDto>({
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