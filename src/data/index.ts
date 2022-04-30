import {ProfessionKind as Profession, SkillSlot} from "../../api";

export {ProfessionKind as Profession, SkillSlot, SkillType, WeaponType} from "../../api";

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot.startsWith("Profession");

export interface SkillSection {
    name: string;
    profession: Profession;
    type: SkillSectionType;
    skills: number[];
}

export enum SkillSectionType {
    Profession = "profession",
    Weapon = "weapon",
    Slot = "slot",
    Bundle = "bundle"
}
