import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {themeReducer} from "./theme";
import {plannerReducer} from "./planner";
import {buildReducer} from "./build";
import {timelineReducer} from "./timeline";

export const Store = configureStore({
    reducer: {
        themeReducer: persistReducer({key: "theme", storage}, themeReducer),
        plannerReducer,
        buildReducer,
        timelineReducer
    }
});

export const Persistor = persistStore(Store);

export type StoreState = ReturnType<typeof Store.getState>;

export type StoreDispatch = typeof Store.dispatch;
