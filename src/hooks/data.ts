import {useStaticQuery, graphql} from "gatsby";

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

export interface ProfessionData {
    name: string;
    profession: SkillData[];
    weapon: SkillData[];
    slot: SkillData[];
    bundle: SkillData[];
}

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
    Elite = "Elite"
}

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot.startsWith("Profession");

export enum Attunement {
    Fire = "Fire",
    Water = "Water",
    Air = "Air",
    Earth = "Earth"
}

export enum WeaponType {
    Axe = "Axe",
    Dagger = "Dagger",
    Mace = "Mace",
    Pistol = "Pistol",
    Sword = "Sword",
    Scepter = "Scepter",
    Focus = "Focus",
    Shield = "Shield",
    Torch = "Torch",
    Warhorn = "Warhorn",
    Greatsword = "Greatsword",
    Hammer = "Hammer",
    Longbow = "Longbow",
    Rifle = "Rifle",
    Shortbow = "Shortbow",
    Staff = "Staff",
    Speargun = "Speargun",
    Spear = "Spear",
    Trident = "Trident"
}

export interface SkillData {
    id: number;
    name: string;
}

// interface QueryData {
//     allDataJson: {
//         nodes: ProfessionData[];
//     };
// }
//
// const useData = () => useStaticQuery<QueryData>(graphql`
//     query ProfessionData {
//         allDataJson {
//             nodes {
//                 name
//                 icon
//                 elites {
//                     id
//                     name
//                 }
//                 weapons
//                 skills {
//                     id
//                     name
//                     type
//                     professions
//                     specialization
//                     weaponType
//                     slot
//                     attunement
//                     dualWield
//                     flipSkill
//                     nextChain
//                     prevChain
//                     transformSkills
//                     bundleSkills
//                     toolbeltSkill
//                 }
//             }
//         }
//     }
// `);

export const useProfessionsData = (): ProfessionData[] => [];

export const useProfessionData = (prof: Profession): ProfessionData => useProfessionsData().find((entry) => entry.name === prof);
