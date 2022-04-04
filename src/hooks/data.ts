import {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot} from "../../api";

export {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot} from "../../api";

export interface ProfessionData {
    name: string;
    elites: EliteData[];
    weapons: WeaponType[];
    skills: SkillData[];
}

export interface EliteData {
    id: number;
    name: string;
}

export interface SkillData {
    id: number;
    name: string;
    type?: SkillType;
    professions: Profession[];
    specialization?: number;
    weaponType?: WeaponType;
    slot?: SkillSlot;
    attunement?: string;
    dualWield?: WeaponType;
    flipSkill?: number;
    nextChain?: number;
    prevChain?: number;
    transformSkills?: number[];
    bundleSkills?: number[];
    toolbeltSkill?: number;
}

export const useProfessionData = (_prof: Profession): ProfessionData => null;

export const useSkillData = (prof: Profession, id: number): SkillData => useProfessionData(prof).skills.find((skill) => skill.id === id);
