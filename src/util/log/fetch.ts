import { Log } from "./types";

export const fetchLog = async (link: string): Promise<Log> => {
    const url = new URL(link);
    let jsonUrl: string;
    if (url.hostname === "dps.report") {
        jsonUrl = `https://dps.report/getJson?permalink=${link}`;
    } else if (
        url.hostname === "gw2wingman.nevermindcreations.de"
        && url.pathname.startsWith("/log/")
    ) {
        const log = url.pathname.split("/")[2];
        jsonUrl = `https://gw2wingman.nevermindcreations.de/api/getJson/${log}`;
    } else {
        throw Error(`Unable to fetch log "${link}": unknown URL format`);
    }

    const res = await fetch(jsonUrl);
    if (res.status === 200) {
        const json = await res.json();
        if (!json.error) {
            return json;
        } else {
            throw Error(
                `Unable to retrieve log "${link}": Server responded with error "${json.error}"`,
            );
        }
    } else {
        throw Error(
            `Unable to fetch log "${link}": Server responded with ${res.status} ${res.statusText}`,
        );
    }
};
