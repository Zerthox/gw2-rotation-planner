import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createId, Id, IdType} from "./planner";

export interface SkillState {
    id: Id;
    skillId: number;
}

export const createSkill = (skill: number): SkillState => ({skillId: skill, id: createId(IdType.Skill)});

export const findSkill = (skills: SkillState[], id: Id): SkillState => skills.find((skill) => skill.id === id);

export const findSkillIndex = (skills: SkillState[], id: Id): number => skills.findIndex((skill) => skill.id === id);

export const skillbarSlice = createSlice({
    name: "skillbar",
    initialState: {
        skills: [
            createSkill(12510),
            createSkill(12509),
            createSkill(12573),
            createSkill(12511),
            createSkill(12469)
        ]
    },
    reducers: {
        updateSkillbar: (state, {payload}: PayloadAction<number[]>) => {
            state.skills = payload.map((skill) => createSkill(skill));
        },
        takeSkillbarItem: (state, {payload}: PayloadAction<Id>) => {
            const index = state.skills.findIndex(({id}) => id === payload);
            const {skillId} = state.skills[index];
            state.skills.splice(index, 1, createSkill(skillId));
        }
    }
});

export const skillbarReducer = skillbarSlice.reducer;

export const {updateSkillbar, takeSkillbarItem} = skillbarSlice.actions;

export const useSkills = (): SkillState[] => useSelector((state: StoreState) => state.skillbarReducer.skills);
