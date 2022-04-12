import {ProfessionKind as Profession, SkillSlot} from "../../api";

export {ProfessionKind as Profession, SkillSlot, SkillType, WeaponType} from "../../api";
export * from "./common";

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot.startsWith("Profession");

export interface SkillData {
    id: number;
    name: string;
    slot: SkillSlot;
}

export interface SkillSection {
    name: string;
    profession: Profession;
    type: SkillSectionType;
    skills: SkillData[];
}

export enum SkillSectionType {
    Profession = "profession",
    Weapon = "weapon",
    Slot = "slot",
    Bundle = "bundle"
}
