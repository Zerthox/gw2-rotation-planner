import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";

export type Skill = number;

export interface RowState {
    name?: string;
    skills: Skill[];
}

export type RowAction<Data> = PayloadAction<{row: number} & Data>;

export const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        rows: [] as RowState[]
    },
    reducers: {
        addRow: (state, {payload}: PayloadAction<RowState>) => {
            state.rows.push(payload);
        },
        removeRow: (state, {payload}: PayloadAction<number>) => {
            state.rows.splice(payload, 1);
        },
        updateRowName: (state, {payload}: RowAction<{name: string}>) => {
            const {row, name} = payload;
            state.rows[row].name = name;
        },
        updateRowSkills: (state, {payload}: RowAction<{skills: Skill[]}>) => {
            const {row, skills} = payload;
            state.rows[row].skills = skills;
        }
    }
});

export const timelineReducer = timelineSlice.reducer;

export const {addRow, removeRow, updateRowName, updateRowSkills} = timelineSlice.actions;

export const useRows = (): RowState[] => useSelector((state: StoreState) => state.timelineReducer.rows);

export const useRow = (index: number): RowState => useRows()[index];
