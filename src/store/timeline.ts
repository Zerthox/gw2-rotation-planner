import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createDragId, DragId, DragType} from "./planner";
import {SkillState} from "./build";

export interface Row {
    name?: string;
    skills: SkillState[];
}

export interface RowState extends Row {
    dragId: DragId;
}

export interface Location {
    row: DragId;
    index: number;
}

export const createRow = (row: Row): RowState => ({...row, dragId: createDragId(DragType.Row)});

export const findRow = (rows: RowState[], id: DragId): RowState => rows.find((row) => row.dragId === id);

export const findRowIndex = (rows: RowState[], id: DragId): number => rows.findIndex((row) => row.dragId === id);

// eslint-disable-next-line @typescript-eslint/ban-types
export type RowAction<Data = {}> = PayloadAction<{rowId: DragId} & Data>;

export const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        rows: [
            createRow({name: "", skills: []})
        ]
    },
    reducers: {
        appendRow(state, {payload}: PayloadAction<Row>) {
            const row = createRow(payload);
            state.rows.push(row);
        },

        deleteRow(state, {payload}: RowAction) {
            const {rowId: rowId} = payload;
            const index = findRowIndex(state.rows, rowId);
            state.rows.splice(index, 1);
        },

        moveRow(state, {payload}: PayloadAction<{from: number, to: number}>) {
            const {from, to} = payload;
            const [row] = state.rows.splice(from, 1);
            state.rows.splice(to, 0, row);
        },

        updateRowName(state, {payload}: RowAction<{name: string}>) {
            const {rowId: rowId, name} = payload;
            const row = findRow(state.rows, rowId);
            row.name = name;
        },

        insertRowSkill(state, {payload}: RowAction<{index: number, skill: SkillState}>) {
            const {rowId: rowId, index, skill} = payload;
            const row = findRow(state.rows, rowId);
            row.skills.splice(index, 0, skill);
        },

        deleteRowSkill(state, {payload}: RowAction<{skillId: DragId}>) {
            const {rowId, skillId} = payload;
            const row = findRow(state.rows, rowId);
            const index = row.skills.findIndex((skill) => skill.dragId === skillId);
            row.skills.splice(index, 1);
        },

        moveRowSkill(state, {payload}: RowAction<{skillId: DragId, to: Location}>) {
            const {rowId, skillId, to} = payload;
            const source = findRow(state.rows, rowId);
            const dest = findRow(state.rows, to.row);

            const index = source.skills.findIndex((skill) => skill.dragId === skillId);
            const [skill] = source.skills.splice(index, 1);
            dest.skills.splice(to.index, 0, skill);
        }
    }
});

export const timelineReducer = timelineSlice.reducer;

export const {appendRow, deleteRow, moveRow, updateRowName, insertRowSkill, deleteRowSkill, moveRowSkill} = timelineSlice.actions;

export const useRows = (): RowState[] => useSelector((state: StoreState) => state.timelineReducer.rows);

export const useRow = (id: DragId): RowState => useSelector((state: StoreState) => state.timelineReducer.rows.find((row) => row.dragId === id));
