import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createId, Id} from "./planner";

export interface SkillState {
    id: Id;
    skillId: number;
}

export const createSkill = (skill: number): SkillState => ({skillId: skill, id: createId("skill")});

export const skillbarSlice = createSlice({
    name: "skillbar",
    initialState: {
        skills: [
            createSkill(0),
            createSkill(1),
            createSkill(2)
        ]
    },
    reducers: {
        updateSkills: (state, {payload}: PayloadAction<number[]>) => {
            state.skills = payload.map((skill) => createSkill(skill));
        }
    }
});

export const skillbarReducer = skillbarSlice.reducer;

export const {updateSkills} = skillbarSlice.actions;

export const useSkills = (): SkillState[] => useSelector((state: StoreState) => state.skillbarReducer.skills);
