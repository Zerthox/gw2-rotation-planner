import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {nanoid} from "nanoid/non-secure";
import {StoreState} from ".";

export type Id = string;

export enum IdType {
    Row = "row",
    Skill = "skill",
    Skillbar = "skillbar",
    Trash = "trash"
}

export const createId = (type: IdType): Id => `${type}-${nanoid()}`;

export const isa = (type: IdType, id: Id): boolean => id?.startsWith(type);

export interface SkillState {
    id: Id;
    skillId: number;
}

export const createSkill = (skill: number): SkillState => ({skillId: skill, id: createId(IdType.Skill)});

export const findSkill = (skills: SkillState[], id: Id): SkillState => skills.find((skill) => skill.id === id);

export const findSkillIndex = (skills: SkillState[], id: Id): number => skills.findIndex((skill) => skill.id === id);

export interface Dragging {
    id: Id;
    skill: number;
}

export const plannerSlice = createSlice({
    name: "planner",
    initialState: {
        dragging: {
            id: null,
            skill: null
        }
    },
    reducers: {
        setDragging(state, {payload}: PayloadAction<Dragging>) {
            state.dragging = payload ?? {id: null, skill: null};
        }
    }
});

export const plannerReducer = plannerSlice.reducer;

export const {setDragging} = plannerSlice.actions;

export const useDragging = (): Dragging => useSelector((state: StoreState) => state.plannerReducer.dragging);
