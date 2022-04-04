import {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot} from "../../api";

export {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot} from "../../api";

export interface ProfessionData {
    name: string;
    elites: string[];
    weapons: WeaponType[];
    skills: SkillData[];
}

export interface SkillData {
    id: number;
    name: string;
    type?: SkillType;
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

export const useProfessionData = (prof: Profession): ProfessionData => null;
