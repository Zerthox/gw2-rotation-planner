import {useMemo} from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {Profession, useProfessionData, matchSkills, SkillData, WeaponType, SkillSlot} from "../hooks/data";

export interface WeaponState {
    weapon1Main: WeaponType;
    weapon1Off: WeaponType;
    weapon2Main: WeaponType;
    weapon2Off: WeaponType;
}

export const skillbarSlice = createSlice({
    name: "skillbar",
    initialState: {
        profession: Profession.Ranger,
        weapons: {
            weapon1Main: null,
            weapon1Off: null,
            weapon2Main: null,
            weapon2Off: null
        } as WeaponState
    },
    reducers: {
        changeProfession(state, {payload}: PayloadAction<Profession>) {
            state.profession = payload;
            state.weapons = {
                weapon1Main: null,
                weapon1Off: null,
                weapon2Main: null,
                weapon2Off: null
            };
        },
        changeWeapons(state, {payload}: PayloadAction<Partial<WeaponState>>) {
            state.weapons = {...state.weapons, ...payload};
        }
    }
});

export const skillbarReducer = skillbarSlice.reducer;

export const {changeProfession, changeWeapons} = skillbarSlice.actions;

export const useProfession = (): Profession => useSelector((state: StoreState) => state.skillbarReducer.profession);

export const useWeapons = (): WeaponState => useSelector((state: StoreState) => state.skillbarReducer.weapons);

export const useWeaponSkills = (): SkillData[] => {
    const prof = useProfession();
    const {weapon1Main, weapon1Off} = useWeapons();
    const data = useProfessionData(prof);

    const skills = useMemo(() => [
        matchSkills(data.skills, SkillSlot.Weapon1, weapon1Main)[0],
        matchSkills(data.skills, SkillSlot.Weapon2, weapon1Main)[0],
        matchSkills(data.skills, SkillSlot.Weapon3, weapon1Main)[0],
        matchSkills(data.skills, SkillSlot.Weapon4, weapon1Off)[0],
        matchSkills(data.skills, SkillSlot.Weapon5, weapon1Off)[0]
    ], [weapon1Main, weapon1Off, data]);

    return skills;
};

export const useSlotSkills = (): SkillData[] => {
    const prof = useProfession();
    const data = useProfessionData(prof);

    return useMemo(() => {
        const heals = matchSkills(data.skills, SkillSlot.Heal);
        const utilities = matchSkills(data.skills, SkillSlot.Utility);
        const elites = matchSkills(data.skills, SkillSlot.Elite);

        return [
            heals[0],
            utilities[0],
            utilities[1],
            utilities[2],
            elites[0]
        ];
    }, [data]);
};
