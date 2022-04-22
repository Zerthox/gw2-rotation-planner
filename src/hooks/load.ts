import {useEffect} from "react";
import * as octokit from "@octokit/request";
import {useDispatch} from "react-redux";
import {overrideRows} from "../store/timeline";
import {useAllSkillSections} from "./data";
import {initializeSections} from "../store/build";
import {validate} from "../util/validate";
import {decodeShare} from "../util/encode";

export interface LoadParams {
    share?: string;
    gist?: string;
    file?: string;
}

export const useLoadTimeline = ({gist, file, share}: LoadParams): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (gist) {
            // TODO: show loading & error in ui
            octokit.request("GET /gists/{gist_id}", {gist_id: gist}).then((res) => {
                if (res.status === 200) {
                    const {files} = res.data;
                    const {content, truncated} = (
                        file ? files[`${file}.json`]
                            : Object.values(files).find((file) => file.filename.endsWith(".json"))
                    ) ?? {};

                    if (!content) {
                        console.error("Could not find file in gist");
                        return;
                    }
                    if (truncated) {
                        console.error("Truncated files in gist are not supported yet");
                        return;
                    }

                    const data = JSON.parse(content);
                    if (validate(data)) {
                        dispatch(overrideRows(data));
                    } else {
                        console.error("Invalid row JSON");
                    }
                } else {
                    console.error("Failed to fetch gist", gist, res);
                }
            });
        } else if (share) {
            const rows = decodeShare(share);
            dispatch(overrideRows(rows));
        }
    }, [dispatch, gist, file, share]);
};

export const useInitSections = (): void => {
    const dispatch = useDispatch();
    const sectionData = useAllSkillSections();

    useEffect(() => {
        dispatch(initializeSections(sectionData));
    }, [dispatch, sectionData]);
};
