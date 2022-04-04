import {fetchApi} from "./fetch";
import {SkillSlot, SkillType} from "./skill";
import {Weapon, WeaponType} from "./weapon";

export async function fetchProfession(prof: ProfessionKind): Promise<Profession> {
    return await fetchApi({endpoint: `professions/${prof}`});
}

export interface Profession {
    id: string;
    name: string;
    icon: string;
    icon_big: string;
    specializations: number[];
    weapons: Record<WeaponType, Weapon>;
    skills: ProfessionSkill[];
    training: unknown[];
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
