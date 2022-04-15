import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createDragId, DragId, DragType} from "./drag";
import {Profession, SkillSection} from "../data";

export interface SkillState {
    dragId: DragId;
    skillId: number;
}

export const createSkillState = (skill: number): SkillState => ({dragId: createDragId(DragType.Skill), skillId: skill});

const filterSections = (sections: SkillSection[], prof: Profession) => sections.filter((section) => !section.profession || section.profession === prof);

export const buildSlice = createSlice({
    name: "build",
    initialState: {
        profession: Profession.Guardian,
        sections: [] as SkillSection[],
        skillStates: [] as SkillState[][]
    },
    reducers: {
        initializeSections(state, {payload}: PayloadAction<SkillSection[]>) {
            state.sections = payload;
            buildSlice.caseReducers.refreshSkillStates(state);
        },
        refreshSkillStates(state) {
            state.skillStates = filterSections(state.sections, state.profession)
                .map((section) => section.skills.map((skill) => createSkillState(skill.id)));
        },
        changeProfession(state, {payload}: PayloadAction<Profession>) {
            state.profession = payload;
            buildSlice.caseReducers.refreshSkillStates(state);
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

export const {initializeSections, changeProfession, takeSkillItem} = buildSlice.actions;

export const useCurrentProfession = (): Profession => useSelector(({buildReducer}: StoreState) => buildReducer.profession);

export const useSkillSections = (): SkillSection[] => useSelector(({buildReducer}: StoreState) => filterSections(buildReducer.sections, buildReducer.profession));

export const useSkillStates = (): SkillState[][] => useSelector(({buildReducer}: StoreState) => buildReducer.skillStates);
