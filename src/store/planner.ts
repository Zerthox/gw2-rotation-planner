import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {nanoid} from "nanoid/non-secure";
import {StoreState} from ".";

export type Id = string;

export const createId = (type: string): Id => `${type}-${nanoid()}`;

export interface Dragging {
    id: Id;
    skill: number;
    fromSkillbar: boolean;
}

export const plannerSlice = createSlice({
    name: "planner",
    initialState: {
        dragging: {
            id: null,
            skill: null,
            fromSkillbar: false
        }
    },
    reducers: {
        setDragging(state, {payload}: PayloadAction<Dragging>) {
            state.dragging = payload ?? {id: null, skill: null, fromSkillbar: false};
        }
    }
});

export const plannerReducer = plannerSlice.reducer;

export const {setDragging} = plannerSlice.actions;

export const useDragging = (): Dragging => useSelector((state: StoreState) => state.plannerReducer.dragging);
