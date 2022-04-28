import {ProfessionKind} from "./profession";
import {WeaponType} from "./weapon";
import {fetchApi} from "./fetch";

export async function fetchSkill(id: number): Promise<Skill> {
    return await fetchApi({endpoint: `skills/${id}`});
}

const SKILL_LIMIT = 200;

export async function fetchSkills(ids: number[]): Promise<Skill[]> {
    if (ids.length === 0) {
        return [];
    } else {
        const result: Skill[] = [];

        while (ids.length > SKILL_LIMIT) {
            result.push(...await fetchApi<Skill[]>({
                endpoint: "skills",
                params: {ids: ids.slice(0, 200).join(",")}
            }));
            ids = ids.slice(200);
        }
        result.push(...await fetchApi<Skill[]>({
            endpoint: "skills",
            params: {ids: ids.join(",")}
        }));

        return result;
    }
}

export async function fetchAllSkillIds(): Promise<number[]> {
    return await fetchApi({endpoint: "skills"});
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
    specialization?: number;
    slot?: SkillSlot;
    facts?: unknown[];
    traited_facts?: unknown[];
    categories?: string[];
    attunement?: Attunement;
    cost?: number;
    dual_wield?: WeaponType;
    flip_skill?: number;
    initiative?: number;
    next_chain?: number;
    prev_chain?: number;
    transform_skills?: number[];
    bundle_skills?: number[];
    toolbelt_skill?: number;
    flags?: unknown[];
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
    Pet = "Pet",
    Toolbelt = "Toolbelt"
}

export enum Attunement {
    Fire = "Fire",
    Water = "Water",
    Air = "Air",
    Earth = "Earth"
}
