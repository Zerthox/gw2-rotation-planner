import {createSlice, createSelector, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createSkillState, SkillState} from "./build";
import {createDragId, DragId, DragType} from "../util/drag";

export interface Row {
    name: string;
    skills: number[];
}

export interface RowState {
    name?: string;
    skills: SkillState[];
    dragId: DragId;
}

export type RowWithoutId = Omit<RowState, "dragId">;

export interface Location {
    row: DragId;
    index: number;
}

export const createRow = (row: RowWithoutId): RowState => ({...row, dragId: createDragId(DragType.Row)});

export const addRowSkillStates = ({name, skills}: Row): RowWithoutId => ({
    name,
    skills: skills.map((skill) => createSkillState(skill))
});

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
        overrideRows(state, {payload}: PayloadAction<Row[]>) {
            state.rows = payload.map((row) => createRow(addRowSkillStates(row)));
        },

        insertRow(state, {payload}: PayloadAction<{index?: number; row: Partial<Row>}>) {
            const {index, row} = payload;
            timelineSlice.caseReducers.insertRowWithStates(
                state,
                timelineSlice.actions.insertRowWithStates({
                    index,
                    row: addRowSkillStates({name: "", skills: [], ...row})
                })
            );
        },

        insertRowWithStates(state, {payload}: PayloadAction<{index?: number; row: Partial<RowWithoutId>}>) {
            const {index, row} = payload;
            const newRow = createRow({name: "", skills: [], ...row});
            state.rows.splice(index ?? state.rows.length, 0, newRow);
        },

        deleteRow(state, {payload}: RowAction) {
            const {rowId} = payload;
            const index = findRowIndex(state.rows, rowId);
            state.rows.splice(index, 1);
        },

        moveRow(state, {payload}: PayloadAction<{from: number; to: number}>) {
            const {from, to} = payload;
            const [row] = state.rows.splice(from, 1);
            state.rows.splice(to, 0, row);
        },

        updateRowName(state, {payload}: RowAction<{name: string}>) {
            const {rowId: rowId, name} = payload;
            const row = findRow(state.rows, rowId);
            row.name = name;
        },

        insertRowSkill(state, {payload}: RowAction<{index: number; skill: SkillState}>) {
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

        moveRowSkill(state, {payload}: RowAction<{skillId: DragId; to: Location}>) {
            const {rowId, skillId, to} = payload;
            const source = findRow(state.rows, rowId);
            const dest = findRow(state.rows, to.row);

            const index = source.skills.findIndex((skill) => skill.dragId === skillId);
            const [skill] = source.skills.splice(index, 1);
            dest.skills.splice(to.index, 0, skill);
        },

        clearRowSkills(state, {payload}: RowAction) {
            const {rowId} = payload;
            const row = findRow(state.rows, rowId);
            row.skills = [];
        }
    }
});

export const timelineReducer = timelineSlice.reducer;

export const {overrideRows, insertRow, insertRowWithStates, deleteRow, moveRow, updateRowName, insertRowSkill, deleteRowSkill, moveRowSkill, clearRowSkills} = timelineSlice.actions;

export const selectRows = ({timelineReducer}: StoreState): RowState[] => timelineReducer.rows;
export const useRows = (): RowState[] => useSelector(selectRows);

export const selectStatelessRows = createSelector(selectRows, (rows) => rows.map(({name, skills}) => ({
    name,
    skills: skills.map(({skillId}) => skillId)
})));
export const useStatelessRows = (): Row[] => useSelector(selectStatelessRows);

export const selectRowCount = (store: StoreState): number => selectRows(store).length;
export const useRowCount = (): number => useSelector(selectRowCount);
