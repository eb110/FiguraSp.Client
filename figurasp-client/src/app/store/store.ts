import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { teamApi } from "../../features/team/teamApi";
import { seasonApi } from "../../features/season/seasonApi";
import { gameApi } from "../../features/game/gameApi";
import { riderApi } from "../../features/rider/riderApi";
import { networkApi } from "../../features/network/networkApi";
import { userApi } from "../../features/account/userApi";

export const store = configureStore({
    reducer: {
        [teamApi.reducerPath]: teamApi.reducer,
        [seasonApi.reducerPath]: seasonApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,
        [riderApi.reducerPath]: riderApi.reducer,
        [networkApi.reducerPath]: networkApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(teamApi.middleware)
            .concat(seasonApi.middleware)
            .concat(gameApi.middleware)
            .concat(riderApi.middleware)
            .concat(networkApi.middleware)
            .concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()