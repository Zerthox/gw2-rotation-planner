import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";

export type RowId = string;

export type Skill = number;

export interface Row {
    name?: string;
    skills: Skill[];
}

export interface RowState extends Row {
    id: RowId;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type RowAction<Data = {}> = PayloadAction<{id: RowId} & Data>;

export const findRowIndex = (rows: RowState[], id: RowId): number => rows.findIndex((row) => row.id === id);

export const getNextRowId = (rows: RowState[]): RowId => {
    const max = rows.reduce((max, row) => Math.max(max, parseInt(row.id)), -1);
    const next = max + 1;
    return next.toString();
};

export const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        rows: [
            {id: "0", name: "", skills: []}
        ] as RowState[]
    },
    reducers: {
        appendRow: (state, {payload: row}: PayloadAction<Row>) => {
            const id = getNextRowId(state.rows);
            state.rows.push({...row, id});
        },
        removeRow: (state, {payload}: RowAction) => {
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

export const useRow = (id: RowId): RowState => useRows().find((row) => row.id === id);
