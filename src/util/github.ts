import * as octokit from "@octokit/request";
import {Row} from "../store/timeline";
import {validate} from "../util/validate";

export const loadFromGist = async (gist: string, file: string = null): Promise<Row[]> => {
    const res = await octokit.request("GET /gists/{gist_id}", {gist_id: gist});
    const {files} = res.data;
    const {content, truncated} = (
        file ? files[`${file}.json`]
            : Object.values(files).find((file) => file.filename.endsWith(".json"))
    ) ?? {};

    if (!content) {
        throw new Error("Could not find file in gist");
    }
    if (truncated) {
        throw new Error("Truncated files in gist are not supported yet");
    }

    const data = JSON.parse(content);
    if (validate(data)) {
        return data;
    } else {
        throw new Error("Invalid row JSON");
    }
};
