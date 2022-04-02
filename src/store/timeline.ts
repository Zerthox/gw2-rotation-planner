import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createId, Id} from "./planner";
import {createSkill, SkillState} from "./skillbar";

export interface Row {
    name?: string;
    skills: SkillState[];
}

export interface RowState extends Row {
    id: Id;
}

export interface Location {
    row: Id;
    index: number;
}

export const findRow = (rows: RowState[], id: Id): RowState => rows.find((row) => row.id === id);

export const findRowIndex = (rows: RowState[], id: Id): number => rows.findIndex((row) => row.id === id);

export const createRow = (row: Row): RowState => ({...row, id: createId("row")});

// eslint-disable-next-line @typescript-eslint/ban-types
export type RowAction<Data = {}> = PayloadAction<{rowId: Id} & Data>;

export const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        rows: [
            createRow({name: "", skills: []})
        ]
    },
    reducers: {
        appendRow: (state, {payload}: PayloadAction<Row>) => {
            const row = createRow(payload);
            state.rows.push(row);
        },

        deleteRow: (state, {payload}: RowAction) => {
            const {rowId} = payload;
            const index = findRowIndex(state.rows, rowId);
            state.rows.splice(index, 1);
        },

        moveRow: (state, {payload}: PayloadAction<{from: number, to: number}>) => {
            const {from, to} = payload;
            const [row] = state.rows.splice(from, 1);
            state.rows.splice(to, 0, row);
        },

        updateRowName: (state, {payload}: RowAction<{name: string}>) => {
            const {rowId, name} = payload;
            const row = findRow(state.rows, rowId);
            row.name = name;
        },

        insertSkill: (state, {payload}: RowAction<{index: number, skillId: number}>) => {
            const {rowId, index, skillId} = payload;
            const row = findRow(state.rows, rowId);
            row.skills.splice(index, 0, createSkill(skillId));
        },

        deleteSkill: (state, {payload}: RowAction<{index: number}>) => {
            const {rowId, index} = payload;
            const row = findRow(state.rows, rowId);
            row.skills.splice(index, 1);
        },

        moveSkill: (state, {payload}: PayloadAction<{from: Location, to: Location}>) => {
            const {from, to} = payload;
            const source = findRow(state.rows, from.row);
            const dest = findRow(state.rows, to.row);

            const [skill] = source.skills.splice(from.index, 1);
            dest.skills.splice(to.index, 0, skill);
        }
    }
});

export const timelineReducer = timelineSlice.reducer;

export const {appendRow, deleteRow, moveRow, updateRowName, insertSkill, deleteSkill, moveSkill} = timelineSlice.actions;

export const useRows = (): RowState[] => useSelector((state: StoreState) => state.timelineReducer.rows);

export const useRow = (id: Id): RowState => useRows().find((row) => row.id === id);
