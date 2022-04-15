import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        dark: true
    },
    reducers: {
        setDarkMode(state, {payload}: PayloadAction<boolean>) {
            state.dark = payload;
        }
    }
});

export const themeReducer = themeSlice.reducer;

export const {setDarkMode} = themeSlice.actions;

export const useDarkMode = (): boolean => useSelector(({themeReducer}: StoreState) => themeReducer.dark);
