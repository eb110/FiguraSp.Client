import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { teamApi } from "../../features/team/teamApi";
import { seasonApi } from "../../features/season/seasonApi";
import { gameApi } from "../../features/game/gameApi";

export const store = configureStore({
    reducer: {
        [teamApi.reducerPath]: teamApi.reducer,
        [seasonApi.reducerPath]: seasonApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(teamApi.middleware).concat(seasonApi.middleware).concat(gameApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()