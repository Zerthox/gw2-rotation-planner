import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {Profession, SkillSection} from "../data";
import {createDragId, DragId, DragType} from "../util/drag";

export interface SkillState {
    dragId: DragId;
    skillId: number;
}

export const createSkillState = (skill: number): SkillState => ({dragId: createDragId(DragType.Skill), skillId: skill});

export enum View {
    CatalogList = "catalog-list",
    CatalogOrdered = "catalog-ordered"
}

const filterSections = (sections: SkillSection[], prof: Profession) => sections.filter((section) => !section.profession || section.profession === prof);

export const buildSlice = createSlice({
    name: "build",
    initialState: {
        profession: Profession.Guardian,
        view: View.CatalogList,
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
                .map((section) => section.skills.map((skill) => createSkillState(skill)));
        },
        changeProfession(state, {payload}: PayloadAction<Profession>) {
            state.profession = payload;
            buildSlice.caseReducers.refreshSkillStates(state);
        },
        changeView(state, {payload}: PayloadAction<View>) {
            state.view = payload;
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

export const {initializeSections, refreshSkillStates, changeProfession, changeView, takeSkillItem} = buildSlice.actions;

export const useCurrentProfession = (): Profession => useSelector(({buildReducer}: StoreState) => buildReducer.profession);

export const useSkillsView = (): View => useSelector(({buildReducer}: StoreState) => buildReducer.view);

export const useSkillSections = (): SkillSection[] => useSelector(({buildReducer}: StoreState) => filterSections(buildReducer.sections, buildReducer.profession));

export const useSkillStates = (): SkillState[][] => useSelector(({buildReducer}: StoreState) => buildReducer.skillStates);
