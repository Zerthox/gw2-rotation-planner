import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createDragId, DragId, DragType} from "./planner";
import {Profession} from "../data";
import {SkillSection} from "../hooks/data";

export interface SkillState {
    dragId: DragId;
    skillId: number;
}

export const createSkillState = (skill: number): SkillState => ({dragId: createDragId(DragType.Skill), skillId: skill});

export const findSkillState = (states: Record<string, SkillState[]>, dragId: DragId): SkillState => {
    for (const skills of Object.values(states)) {
        const found = skills.find((skill) => skill.dragId === dragId);
        if (found) {
            return found;
        }
    }
    return null;
};

export interface ProfessionChangePayload {
    profession: Profession;
    sections: SkillSection[];
}

export const buildSlice = createSlice({
    name: "build",
    initialState: {
        profession: null as Profession,
        sections: [] as SkillSection[],
        skillStates: {} as Record<string, SkillState[]>
    },
    reducers: {
        changeProfession(state, {payload: {profession, sections}}: PayloadAction<ProfessionChangePayload>) {
            state.profession = profession;
            state.sections = sections;
            state.skillStates = Object.fromEntries(sections
                .filter((section) => section.profession === profession)
                .map((section) => [
                    section.name,
                    section.skills.map((skill) => createSkillState(skill.id))
                ])
            );
        },
        takeSkillItem(state, {payload}: PayloadAction<DragId>) {
            for (const section of Object.values(state.skillStates)) {
                const index = section.findIndex((skill) => skill.dragId === payload);
                const {skillId} = section[index];
                section.splice(index, 1, createSkillState(skillId));
            }
        }
    }
});

export const buildReducer = buildSlice.reducer;

export const {changeProfession, takeSkillItem} = buildSlice.actions;

export const useCurrentProfession = (): Profession => useSelector((state: StoreState) => state.buildReducer.profession);

export const useSkillSections = (): SkillSection[] => useSelector((state: StoreState) => state.buildReducer.sections);

export const useSkillStates = (): Record<string, SkillState[]> => useSelector((state: StoreState) => state.buildReducer.skillStates);
