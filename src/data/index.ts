import {useSkill} from "@discretize/gw2-ui-new";

export enum Profession {
    Guardian = "Guardian",
    Warrior = "Warrior",
    Engineer = "Engineer",
    Ranger = "Ranger",
    Thief = "Thief",
    Elementalist = "Elementalist",
    Mesmer = "Mesmer",
    Necromancer = "Necromancer",
    Revenant = "Revenant"
}

export enum EliteSpecialization {
    Dragonhunter = "Dragonhunter",
    Firebrand = "Firebrand",
    Willbender = "Willbender",
    Berserker = "Berserker",
    Spellbreaker = "Spellbreaker",
    Bladesworn = "Bladesworn",
    Scrapper = "Scrapper",
    Holosmith = "Holosmith",
    Mechanist = "Mechanist",
    Druid = "Druid",
    Soulbeast = "Soulbeast",
    Untamed = "Untamed",
    Daredevil = "Daredevil",
    Deadeye = "Deadeye",
    Specter = "Specter",
    Tempest = "Tempest",
    Weaver = "Weaver",
    Catalyst = "Catalyst",
    Chronomancer = "Chronomancer",
    Mirage = "Mirage",
    Virtuoso = "Virtuoso",
    Reaper = "Reaper",
    Scourge = "Scourge",
    Harbinger = "Harbinger",
    Herald = "Herald",
    Renegade = "Renegade",
    Vindicator = "Vindicator"
}

export type Skill = ReturnType<typeof useSkill>["data"];

export enum SkillType {
    Weapon = "Weapon",
    Profession = "Profession",
    Heal = "Heal",
    Utility = "Utility",
    Elite = "Elite",
    Bundle = "Bundle"
}

export enum SkillSlot {
    Weapon1 = "Weapon_1",
    Weapon2 = "Weapon_2",
    Weapon3 = "Weapon_3",
    Weapon4 = "Weapon_4",
    Weapon5 = "Weapon_5",
    Profession1 = "Profession_1",
    Profession2 = "Profession_2",
    Profession3 = "Profession_3",
    Profession4 = "Profession_4",
    Profession5 = "Profession_5",
    Profession6 = "Profession_6",
    Profession7 = "Profession_7",
    Heal = "Heal",
    Utility = "Utility",
    Elite = "Elite",
    Downed1 = "Downed_1",
    Downed2 = "Downed_2",
    Downed3 = "Downed_3",
    Downed4 = "Downed_4",
    Pet = "Pet",
    Toolbelt = "Toolbelt"
}

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isDownedSlot = (slot: SkillSlot): boolean => slot.startsWith("Downed");

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
