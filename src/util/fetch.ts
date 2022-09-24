import * as octokit from "@octokit/request";
import {Row} from "../store/timeline";
import {validOrError} from "./validate";

export const fetchFromGist = async (gist: string, file: string = null): Promise<Row[]> => {
    const res = await octokit.request("GET /gists/{gist_id}", {gist_id: gist});
    const {files} = res.data;
    const {content, truncated} = (
        file ? files[`${file}.json`]
            : Object.values(files).find((file) => file.filename.endsWith(".json"))
    ) ?? {};

    if (!content) {
        throw Error("Could not find file in gist");
    }
    if (truncated) {
        throw Error("Truncated files in gist are not supported yet");
    }

    const data = JSON.parse(content);
    return validOrError(data);
};

export const fetchFromURL = async (url: string): Promise<Row[]> => {
    const res = await fetch(url);
    if (res.status === 200) {
        const data = await res.json();
        return validOrError(data);
    } else {
        throw Error(`Unable to fetch "${url}": Server responded with ${res.status} ${res.statusText}`);
    }
};
