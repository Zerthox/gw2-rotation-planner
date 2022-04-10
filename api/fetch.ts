import fetch from "node-fetch";

const API_URL = "https://api.guildwars2.com";

export interface FetchOptions {
    version?: string;
    endpoint: string;
    lang?: string;
    params?: Record<string, string>;
}

export async function fetchApi<T>({version = "v2", endpoint, lang = "en", params = {}}: FetchOptions): Promise<T> {
    const paramString = Object.entries(params).map(([name, value]) => `${name}=${value}`).join("&");
    const url = `${API_URL}/${version}/${endpoint}?lang=${lang}&${paramString}`;

    const response = await fetch(url);
    const json = await response.json();
    if (Object.keys(json).length === 1 && json.text) {
        throw new Error(json.text);
    } else {
        return json;
    }
}
