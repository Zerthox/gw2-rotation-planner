/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Profession {
    id: string;
    name: string;
    icon: string;
    icon_big: string;
    specializations: number[];
    weapons: Record<WeaponType, Weapon>;
    skills: ProfessionSkill[];
    training: any[];
    flags: ProfessionFlag[];
}

export enum ProfessionKind {
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

export const professions = [
    ProfessionKind.Guardian,
    ProfessionKind.Warrior,
    ProfessionKind.Engineer,
    ProfessionKind.Ranger,
    ProfessionKind.Thief,
    ProfessionKind.Elementalist,
    ProfessionKind.Mesmer,
    ProfessionKind.Necromancer,
    ProfessionKind.Revenant
];

export enum ProfessionFlag {
    NoRacialSkills = "NoRacialSkills",
    NoWeaponSwap = "NoWeaponSwap"
}

export interface ProfessionSkill {
    id: number;
    type: SkillType;
    slot: SkillSlot;
}

export interface Skill {
    id: number;
    name: string;
    description?: string;
    icon: string;
    chat_link: string;
    type?: SkillType;
    weapon_type?: WeaponType | "None";
    professions: ProfessionKind[];
    slot?: SkillSlot;
    facts?: any[];
    traited_facts?: any[];
    categories?: string[];
    attunement?: string;
    cost?: number;
    dual_wield?: WeaponType;
    flip_skill?: number;
    initiative?: number;
    next_chain?: number;
    prev_chain?: number;
    transform_skills?: number[];
    bundle_skills?: number[];
    toolbelt_skill?: number;
    flags?: any[];
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
    Elite = "Elite",
    Downed1 = "Downed_1",
    Downed2 = "Downed_2",
    Downed3 = "Downed_3",
    Downed4 = "Downed_4",
    Pet = "Pet"
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

export interface Weapon {
    flags: WeaponSlot[];
    specialization: number;
    skills: Skill[];
}

export enum WeaponSlot {
    Mainhand = "Mainhand",
    Offhand = "Offhand",
    Twohand = "TwoHand",
    Aquatic = "Aquatic"
}

export interface WeaponSkill {
    id: number;
    slot: SkillSlot;
    offhand?: string;
    attunement?: string;
    source?: string;
}
