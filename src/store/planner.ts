import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {nanoid} from "nanoid/non-secure";
import {StoreState} from ".";

export type DragId = string;

export enum DragType {
    Row = "row",
    Skill = "skill",
    Skillbar = "skillbar",
    Trash = "trash"
}

export const createDragId = (type: DragType): DragId => `${type}-${nanoid()}`;

export const isa = (type: DragType, id: DragId): boolean => id?.startsWith(type);

export interface Dragging {
    dragId: DragId;
    skill: number;
}

export const plannerSlice = createSlice({
    name: "planner",
    initialState: {
        dragging: {
            dragId: null,
            skill: null
        } as Dragging
    },
    reducers: {
        setDragging(state, {payload}: PayloadAction<Dragging>) {
            state.dragging = payload ?? {dragId: null, skill: null};
        }
    }
});

export const plannerReducer = plannerSlice.reducer;

export const {setDragging} = plannerSlice.actions;

export const useDragging = (): Dragging => useSelector((state: StoreState) => state.plannerReducer.dragging);
