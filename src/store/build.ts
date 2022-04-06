import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {createId, Id, IdType} from "./planner";
import {isProfessionSlot, Profession, ProfessionData, SkillData, SkillSlot, WeaponType} from "../hooks/data";

export interface SkillState {
    id: Id;
    skillId: number;
}

export const createSkill = (skill: number): SkillState => ({id: createId(IdType.Skill), skillId: skill});

export const findSkill = (skills: SkillState[], id: Id): SkillState => skills.find((skill) => skill.id === id);

export const findSkillIndex = (skills: SkillState[], id: Id): number => skills.findIndex((skill) => skill.id === id);

export const buildSlice = createSlice({
    name: "build",
    initialState: {
        profession: null as Profession,
        weapons: [] as WeaponType[],
        skills: [] as SkillData[],
        skillStates: [] as SkillState[]
    },
    reducers: {
        changeProfession(state, {payload}: PayloadAction<ProfessionData>) {
            state.profession = payload.name;
            state.weapons = payload.weapons;

            state.skills = payload.skills;
            state.skillStates = state.skills.map(({id}) => createSkill(id));
        },
        takeSkillItem(state, {payload}: PayloadAction<Id>) {
            const index = state.skillStates.findIndex(({id}) => id === payload);
            const {skillId} = state.skillStates[index];
            state.skillStates.splice(index, 1, createSkill(skillId));
        }
    }
});

export const buildReducer = buildSlice.reducer;

export const {changeProfession, takeSkillItem} = buildSlice.actions;

export const useProfession = (): Profession => useSelector((state: StoreState) => state.buildReducer.profession);

export const useWeaponTypes = (): WeaponType[] => useSelector((state: StoreState) => state.buildReducer.weapons);

export const useSkillData = (): SkillData[] => useSelector((state: StoreState) => state.buildReducer.skills);

export const useSkillStates = (): SkillState[] => useSelector((state: StoreState) => state.buildReducer.skillStates);

export const useSkillsWithFilter = (predicate: (SkillData) => boolean): SkillState[] => {
    const skills = useSkillData();
    const skillStates = useSkillStates();

    return skills
        .filter(predicate)
        .map((skill) => skillStates.find(({skillId}) => skillId === skill.id));
};

export const useWeaponSkills = (): [WeaponType, SkillState[]][] => {
    const weapons = useWeaponTypes();
    const skills = useSkillData();
    const skillStates = useSkillStates();

    return weapons.map((weapon) => {
        const weaponSkills = skills
            .filter((skill) => skill.weaponType === weapon)
            .map((skill) => skillStates.find(({skillId}) => skillId === skill.id));

        return [weapon, weaponSkills];
    });
};

export const useHealSkills = (): SkillState[] => useSkillsWithFilter((skill) => skill.slot === SkillSlot.Heal);

export const useUtilitySkills = (): SkillState[] => useSkillsWithFilter((skill) => skill.slot === SkillSlot.Utility);

export const useEliteSkills = (): SkillState[] => useSkillsWithFilter((skill) => skill.slot === SkillSlot.Elite);

export const useProfessionSkills = (): SkillState[] => useSkillsWithFilter((skill) => isProfessionSlot(skill.slot));
