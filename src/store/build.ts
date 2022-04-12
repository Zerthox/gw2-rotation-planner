import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createDragId, DragId, DragType} from "./drag";
import {Profession, SkillSection, commonSkills} from "../data";

export interface SkillState {
    dragId: DragId;
    skillId: number;
}

export const createSkillState = (skill: number): SkillState => ({dragId: createDragId(DragType.Skill), skillId: skill});

export interface ProfessionChangePayload {
    profession: Profession;
    sections: SkillSection[];
}

export const buildSlice = createSlice({
    name: "build",
    initialState: {
        profession: null as Profession,
        sections: [] as SkillSection[],
        skillStates: [] as SkillState[][]
    },
    reducers: {
        changeProfession(state, {payload: {profession, sections}}: PayloadAction<ProfessionChangePayload>) {
            state.profession = profession;
            state.sections = [{
                name: "Common",
                profession: null,
                type: null,
                skills: commonSkills
            }, ...sections];

            state.skillStates = state.sections.map((section) => (
                section.skills.map((skill) => createSkillState(skill.id))
            ));
        },
        takeSkillItem(state, {payload}: PayloadAction<DragId>) {
            for (const section of state.skillStates) {
                const index = section.findIndex((skill) => skill.dragId === payload);
                if (index > -1) {
                    const {skillId} = section[index];
                    section.splice(index, 1, createSkillState(skillId));
                    break;
                }
            }
        }
    }
});

export const buildReducer = buildSlice.reducer;

export const {changeProfession, takeSkillItem} = buildSlice.actions;

export const useCurrentProfession = (): Profession => useSelector((state: StoreState) => state.buildReducer.profession);

export const useSkillSections = (): SkillSection[] => useSelector((state: StoreState) => state.buildReducer.sections);

export const useSkillStates = (): SkillState[][] => useSelector((state: StoreState) => state.buildReducer.skillStates);
