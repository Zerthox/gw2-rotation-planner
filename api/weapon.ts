import {Skill, SkillSlot} from "./skill";

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
