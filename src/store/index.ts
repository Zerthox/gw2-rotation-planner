import {configureStore} from "@reduxjs/toolkit";
import {themeReducer} from "./theme";
import {timelineReducer} from "./timeline";

export const Store = configureStore({
    reducer: {
        themeReducer,
        timelineReducer
    }
});

export type StoreState = ReturnType<typeof Store.getState>;

export type StoreDispatch = typeof Store.dispatch;
