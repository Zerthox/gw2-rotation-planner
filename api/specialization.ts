import {fetchApi} from "./fetch";
import {ProfessionKind} from "./profession";

export async function fetchSpecialization(id: number): Promise<Specialization> {
    return await fetchApi({endpoint: `specializations/${id}`});
}

export async function fetchSpecializations(ids: number[]): Promise<Specialization[]> {
    if (ids.length === 0) {
        return [];
    } else {
        return await fetchApi({endpoint: "specializations", params: {ids}});
    }
}

export async function fetchAllSpecializationIds(): Promise<number[]> {
    return await fetchApi({endpoint: "specializations"});
}

export interface Specialization {
    id: number;
    name: string;
    profession: ProfessionKind;
    elite: boolean;
    icon: string;
    background: string;
    minor_traits: number[];
    major_traits: number[];
}

export interface Trait {
    id: number;
    name: string;
    description: string;
    icon: string;
    facts?: unknown[];
    traited_facts?: unknown[];
    skills?: TraitSkill[];
}

export interface TraitSkill {
    id: number;
    name: string;
    description: string;
    icon: string;
    facts?: unknown[];
    traited_facts?: unknown[];
}
