import {useMemo} from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {Profession, useProfessionData, SkillData, WeaponType, SkillSlot, isWeaponSlot} from "../hooks/data";

export interface WeaponState {
    weapon1Main: WeaponType;
    weapon1Off: WeaponType;
    weapon2Main: WeaponType;
    weapon2Off: WeaponType;
}

export const buildSlice = createSlice({
    name: "build",
    initialState: {
        profession: Profession.Guardian,
        eliteSpec: 62,
        weapons: {
            weapon1Main: WeaponType.Axe,
            weapon1Off: WeaponType.Torch,
            weapon2Main: null,
            weapon2Off: null
        } as WeaponState
    },
    reducers: {
        changeSpec(state, {payload}: PayloadAction<Profession>) {
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

export const buildReducer = buildSlice.reducer;

export const {changeSpec: changeProfession, changeWeapons} = buildSlice.actions;

export const useProfession = (): Profession => useSelector((state: StoreState) => state.buildReducer.profession);

export const useEliteSpec = (): number => useSelector((state: StoreState) => state.buildReducer.eliteSpec);

export const useWeapons = (): WeaponState => useSelector((state: StoreState) => state.buildReducer.weapons);

export interface MatchSkillOptions {
    /** Slot to filter for. */
    slot: SkillSlot;

    /** Currently equipped weapon type. */
    weapon?: WeaponType;

    /** Currently equipped elite spec. */
    eliteSpec?: number;
}

export const matchSkills = (skills: SkillData[], {slot, weapon = null, eliteSpec = null}: MatchSkillOptions): SkillData[] => {
    return skills.filter((skill) => (
        skill.slot === slot
        && (!isWeaponSlot(slot) || skill.weaponType === weapon)
        && (typeof skill.specialization !== "number" || eliteSpec && skill.specialization === eliteSpec)
    ));
};

export const useWeaponSkills = (): SkillData[] => {
    const prof = useProfession();
    const eliteSpec = useEliteSpec();
    const {weapon1Main, weapon1Off} = useWeapons();
    const data = useProfessionData(prof);

    const skills = useMemo(() => [
        matchSkills(data.skills, {slot: SkillSlot.Weapon1, weapon: weapon1Main, eliteSpec})[0],
        matchSkills(data.skills, {slot: SkillSlot.Weapon2, weapon: weapon1Main, eliteSpec})[0],
        matchSkills(data.skills, {slot: SkillSlot.Weapon3, weapon: weapon1Main, eliteSpec})[0],
        matchSkills(data.skills, {slot: SkillSlot.Weapon4, weapon: weapon1Off, eliteSpec})[0],
        matchSkills(data.skills, {slot: SkillSlot.Weapon5, weapon: weapon1Off, eliteSpec})[0]
    ], [eliteSpec, weapon1Main, weapon1Off, data]);

    return skills;
};

export const useSlotSkills = (): SkillData[] => {
    const prof = useProfession();
    const eliteSpec = useEliteSpec();
    const data = useProfessionData(prof);

    return useMemo(() => {
        const heals = matchSkills(data.skills, {slot: SkillSlot.Heal, eliteSpec});
        const utilities = matchSkills(data.skills, {slot: SkillSlot.Utility, eliteSpec});
        const elites = matchSkills(data.skills, {slot: SkillSlot.Elite, eliteSpec});

        return [
            heals[0],
            utilities[0],
            utilities[1],
            utilities[2],
            elites[0]
        ];
    }, [eliteSpec, data]);
};
