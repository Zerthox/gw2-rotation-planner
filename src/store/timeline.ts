import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";

export type Skill = number;

export interface Row {
    name?: string;
    skills: Skill[];
}

export interface RowState extends Row {
    id: number;
}

export type RowAction<Data> = PayloadAction<{id: number} & Data>;

const findRowIndex = (rows: RowState[], id: number) => rows.findIndex((row) => row.id === id);

const getNextRowId = (rows: RowState[]) => rows.reduce((max, row) => Math.max(max, row.id), -1) + 1;

export const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        rows: [
            {id: 0, name: "", skills: []}
        ] as RowState[]
    },
    reducers: {
        appendRow: (state, {payload: row}: PayloadAction<Row>) => {
            const id = getNextRowId(state.rows);
            state.rows.push({...row, id});
        },
        removeRow: (state, {payload}: PayloadAction<{id: number}>) => {
            const {id} = payload;
            const index = findRowIndex(state.rows, id);
            state.rows.splice(index, 1);
        },
        moveRow: (state, {payload}: PayloadAction<{from: number, to: number}>) => {
            const {from, to} = payload;
            const [row] = state.rows.splice(from, 1);
            state.rows.splice(to, 0, row);
        },
        updateRowName: (state, {payload}: RowAction<{name: string}>) => {
            const {id, name} = payload;
            const index = findRowIndex(state.rows, id);
            state.rows[index].name = name;
        },
        updateRowSkills: (state, {payload}: RowAction<{skills: Skill[]}>) => {
            const {id, skills} = payload;
            const index = findRowIndex(state.rows, id);
            state.rows[index].skills = skills;
        }
    }
});

export const timelineReducer = timelineSlice.reducer;

export const {appendRow, removeRow, moveRow, updateRowName, updateRowSkills} = timelineSlice.actions;

export const useRows = (): RowState[] => useSelector((state: StoreState) => state.timelineReducer.rows);

export const useRow = (id: number): RowState => useRows().find((row) => row.id === id);
