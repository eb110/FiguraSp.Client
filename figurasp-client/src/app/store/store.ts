import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { teamApi } from "../../features/team/teamApi";
import { seasonApi } from "../../features/season/seasonApi";

export const store = configureStore({
    reducer: {
        [teamApi.reducerPath]: teamApi.reducer,
        [seasonApi.reducerPath]: seasonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(teamApi.middleware).concat(seasonApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()