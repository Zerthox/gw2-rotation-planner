import {configureStore} from "@reduxjs/toolkit";
import {themeReducer} from "./theme";
import {plannerReducer} from "./planner";
import {skillbarReducer} from "./skillbar";
import {timelineReducer} from "./timeline";

export const Store = configureStore({
    reducer: {
        themeReducer,
        plannerReducer,
        skillbarReducer,
        timelineReducer
    }
});

export type StoreState = ReturnType<typeof Store.getState>;

export type StoreDispatch = typeof Store.dispatch;
