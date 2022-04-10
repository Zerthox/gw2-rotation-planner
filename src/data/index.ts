import {ProfessionKind as Profession, SkillSlot} from "../../api";

export {ProfessionKind as Profession, SkillSlot, SkillType, WeaponType} from "../../api";
export * from "./tomes";

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot.startsWith("Profession");

export interface SkillData {
    id: number;
    name: string;
    slot: SkillSlot;
}

export const professionIcons: Record<Profession, string> = {
    [Profession.Elementalist]: "https://wiki.guildwars2.com/images/4/4e/Elementalist_icon_small.png",
    [Profession.Engineer]: "https://wiki.guildwars2.com/images/0/07/Engineer_icon_small.png",
    [Profession.Guardian]: "https://wiki.guildwars2.com/images/c/c7/Guardian_icon_small.png",
    [Profession.Mesmer]: "https://wiki.guildwars2.com/images/7/79/Mesmer_icon_small.png",
    [Profession.Necromancer]: "https://wiki.guildwars2.com/images/1/10/Necromancer_icon_small.png",
    [Profession.Ranger]: "https://wiki.guildwars2.com/images/1/1e/Ranger_icon_small.png",
    [Profession.Revenant]: "https://wiki.guildwars2.com/images/4/4c/Revenant_icon_small.png",
    [Profession.Thief]: "https://wiki.guildwars2.com/images/a/a0/Thief_icon_small.png",
    [Profession.Warrior]: "https://wiki.guildwars2.com/images/4/45/Warrior_icon_small.png"
};

export const professionIconSize = 20;
