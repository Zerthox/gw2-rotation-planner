import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { settingsReducer } from "./settings";
import { buildReducer } from "./build";
import { timelineReducer } from "./timeline";

const reducer = {
    settingsReducer: persistReducer({ key: "settings", storage }, settingsReducer),
    buildReducer: persistReducer(
        { key: "build", whitelist: ["profession", "view"], storage },
        buildReducer,
    ),
    timelineReducer,
};

export const Store = configureStore({
    reducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: {
                // redux persist uses non-serializable payloads
                ignoredActions: ["persist/PERSIST"],
            },
        }),
});

export const Persistor = persistStore(Store);

export type StoreState = ReturnType<typeof Store.getState>;

export type StoreDispatch = typeof Store.dispatch;
