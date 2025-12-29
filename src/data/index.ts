import { useSkill } from "@discretize/gw2-ui-new";

export const enum Profession {
    Guardian = "Guardian",
    Warrior = "Warrior",
    Engineer = "Engineer",
    Ranger = "Ranger",
    Thief = "Thief",
    Elementalist = "Elementalist",
    Mesmer = "Mesmer",
    Necromancer = "Necromancer",
    Revenant = "Revenant",
}

export const enum EliteSpecialization {
    Dragonhunter = "Dragonhunter",
    Firebrand = "Firebrand",
    Willbender = "Willbender",
    Luminary = "Luminary",
    Berserker = "Berserker",
    Spellbreaker = "Spellbreaker",
    Bladesworn = "Bladesworn",
    Paragon = "Paragon",
    Scrapper = "Scrapper",
    Holosmith = "Holosmith",
    Mechanist = "Mechanist",
    Amalgam = "Amalgam",
    Druid = "Druid",
    Soulbeast = "Soulbeast",
    Untamed = "Untamed",
    Galeshot = "Galeshot",
    Daredevil = "Daredevil",
    Deadeye = "Deadeye",
    Specter = "Specter",
    Antiquary = "Antiquary",
    Tempest = "Tempest",
    Weaver = "Weaver",
    Catalyst = "Catalyst",
    Evoker = "Evoker",
    Chronomancer = "Chronomancer",
    Mirage = "Mirage",
    Virtuoso = "Virtuoso",
    Troubadour = "Troubadour",
    Reaper = "Reaper",
    Scourge = "Scourge",
    Harbinger = "Harbinger",
    Ritualist = "Ritualist",
    Herald = "Herald",
    Renegade = "Renegade",
    Vindicator = "Vindicator",
    Conduit = "Conduit",
}

export type Skill = ReturnType<typeof useSkill>["data"];

export const enum SkillType {
    Weapon = "Weapon",
    Profession = "Profession",
    Heal = "Heal",
    Utility = "Utility",
    Elite = "Elite",
    Bundle = "Bundle",
}

export const enum SkillSlot {
    Weapon1 = "Weapon_1",
    Weapon1NoAuto = "Weapon_1_NoAuto",
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
    Toolbelt = "Toolbelt",
    WeaponSwap = "Swap",
    Dodge = "Dodge",
    Interact = "Interact",
    Stow = "Stow",
    SpecialAction = "SAK",
}

export const isAuto = (slot: SkillSlot): boolean => slot === "Weapon_1" || slot === "Downed_1";

export const isWeaponSlot = (slot: SkillSlot): boolean => slot?.startsWith("Weapon_");

export const isDownedSlot = (slot: SkillSlot): boolean => slot?.startsWith("Downed_");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot?.startsWith("Profession_");

export interface SkillSection {
    name: string;
    profession: Profession;
    type: SkillSectionType;
    skills: number[];
}

export const enum SkillSectionType {
    Profession = "profession",
    Weapon = "weapon",
    Slot = "slot",
    Bundle = "bundle",
}
