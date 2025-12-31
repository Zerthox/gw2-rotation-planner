import { EliteSpecialization, Profession } from "../../data";
import {
    CommonSkillId,
    AttunementSkill,
    LegendSkill,
    KitSkill,
    ShroudSkill,
} from "../../data/common";

// ei uses some negative custom ids for specific sills
export const SKILL_MAPPING: Record<number, number> = {
    [-2]: CommonSkillId.WeaponSwap,
    [-5]: AttunementSkill.Fire, // weaver dual attunements
    [-6]: AttunementSkill.Fire,
    [-7]: AttunementSkill.Fire,
    [-8]: AttunementSkill.Water,
    [-9]: AttunementSkill.Water,
    [-10]: AttunementSkill.Water,
    [-11]: AttunementSkill.Air,
    [-12]: AttunementSkill.Air,
    [-13]: AttunementSkill.Air,
    [-14]: AttunementSkill.Earth,
    [-15]: AttunementSkill.Earth,
    [-16]: AttunementSkill.Earth,
    41166: AttunementSkill.Water, // weaver double attunements
    42264: AttunementSkill.Air,
    43470: AttunementSkill.Fire,
    44857: AttunementSkill.Earth,
    [-17]: CommonSkillId.Dodge, // mirage cloak dodge
    42955: 40255, // smokescale smoke assault, TODO: add custom skill for single hit?
    62730: CommonSkillId.Dodge, // vindicator death drop
    62732: CommonSkillId.Dodge, // vindicator imperial impact
    62879: CommonSkillId.Dodge, // vindicator saints shield
    62890: CommonSkillId.Dodge, // vindicator tenacious ruin
    73139: 73015, // abyssal strike alt
};

export interface LoopInfo {
    weaponSwap: boolean;
    skills: Record<number, string>;
}

export const getLoopInfo = (spec: Profession | EliteSpecialization): LoopInfo => {
    switch (spec) {
        case Profession.Guardian:
        case EliteSpecialization.Dragonhunter:
        case EliteSpecialization.Firebrand:
        case EliteSpecialization.Willbender:
        case EliteSpecialization.Luminary:
            return {
                weaponSwap: true,
                skills: {
                    77073: "Radiant Forge",
                },
            };

        case Profession.Revenant:
        case EliteSpecialization.Herald:
        case EliteSpecialization.Renegade:
        case EliteSpecialization.Vindicator:
        case EliteSpecialization.Conduit:
            return {
                weaponSwap: false, // prefer legend loops
                skills: {
                    [LegendSkill.Dwarf]: "Dwarf",
                    [LegendSkill.Demon]: "Demon",
                    [LegendSkill.Centaur]: "Centaur",
                    [LegendSkill.Assassin]: "Assassin",
                    [LegendSkill.Dragon]: "Dragon",
                    [LegendSkill.Renegade]: "Renegade",
                    [LegendSkill.Alliance]: "Alliance",
                    [LegendSkill.Entity]: "Entity",
                },
            };

        case Profession.Engineer:
        case EliteSpecialization.Scrapper:
        case EliteSpecialization.Mechanist:
        case EliteSpecialization.Holosmith:
        case EliteSpecialization.Amalgam:
            return {
                weaponSwap: true,
                skills: {
                    [KitSkill.MedKit]: "Med Kit",
                    [KitSkill.GrenadeKit]: "Grenade Kit",
                    [KitSkill.BombKit]: "Bomb Kit",
                    [KitSkill.Flamethrower]: "Flamethrower",
                    [KitSkill.ElixirGun]: "Elixir Gun",
                    [KitSkill.ToolKit]: "Tool Kit",
                    [KitSkill.MortarKit]: "Mortar Kit",
                    42938: "Photon Forge",
                },
            };

        case Profession.Ranger:
        case EliteSpecialization.Druid:
        case EliteSpecialization.Soulbeast:
        case EliteSpecialization.Untamed:
        case EliteSpecialization.Galeshot:
            return {
                weaponSwap: true,
                skills: {
                    31869: "Celestial Avatar",
                    76787: "Cyclone Bow",
                },
            };

        case Profession.Thief:
        case EliteSpecialization.Daredevil:
        case EliteSpecialization.Deadeye:
        case EliteSpecialization.Specter:
        case EliteSpecialization.Antiquary:
            return {
                weaponSwap: true,
                skills: {
                    63155: "Shadow Shroud",
                },
            };

        case Profession.Necromancer:
        case EliteSpecialization.Reaper:
        case EliteSpecialization.Scourge:
        case EliteSpecialization.Harbinger:
        case EliteSpecialization.Ritualist:
            return {
                weaponSwap: true,
                skills: {
                    [ShroudSkill.DeathShroud]: "Shroud",
                    [ShroudSkill.ReapersShroud]: "Shroud",
                    [ShroudSkill.HarbingerShroud]: "Shroud",
                    [ShroudSkill.RitualistsShroud]: "Shroud",
                    10550: "Lich Form",
                },
            };

        case Profession.Elementalist:
        case EliteSpecialization.Tempest:
        case EliteSpecialization.Weaver:
        case EliteSpecialization.Catalyst:
        case EliteSpecialization.Evoker:
            return {
                weaponSwap: false, // prefer attunement loops
                skills: {
                    [AttunementSkill.Fire]: "Fire",
                    [AttunementSkill.Water]: "Water",
                    [AttunementSkill.Air]: "Air",
                    [AttunementSkill.Earth]: "Earth",
                },
            };

        default:
            return { weaponSwap: true, skills: [] };
    }
};
