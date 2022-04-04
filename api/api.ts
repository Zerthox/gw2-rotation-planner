/* eslint-disable @typescript-eslint/no-explicit-any */

import fetch from "node-fetch";
import {Profession, ProfessionKind, Skill} from "./types";

const API_URL = "https://api.guildwars2.com";

export interface FetchOptions {
    version?: string;
    endpoint: string;
    lang?: string;
    params?: Record<string, any>;
}

export async function fetchApi<T>({version = "v2", endpoint, lang = "en", params = {}}: FetchOptions): Promise<T> {
    const paramString = Object.entries(params).map(([name, value]) => `${name}=${value}`).join("&");
    const url = `${API_URL}/${version}/${endpoint}?lang=${lang}&${paramString}`;

    const result = await fetch(url);
    return result.json();
}

export async function fetchProfession(prof: ProfessionKind): Promise<Profession> {
    return await fetchApi({endpoint: `professions/${prof}`});
}

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
                params: {ids: ids.slice(0, 200)}
            }));
            ids = ids.slice(200);
        }
        result.push(...await fetchApi<Skill[]>({
            endpoint: "skills",
            params: {ids}
        }));

        return result;
    }
}

export async function fetchAllSkills(): Promise<number[]> {
    return await fetchApi({endpoint: "skills"});
}
