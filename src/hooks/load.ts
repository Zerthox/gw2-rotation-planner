import {useEffect} from "react";
import * as octokit from "@octokit/request";
import {useDispatch} from "react-redux";
import {overrideRows} from "../store/timeline";
import {validate} from "../components/io";
import {useAllSkillSections} from "./data";
import {initializeSections} from "../store/build";

export interface LoadParams {
    gist?: string;
    file?: string;
}

export const useLoadTimeline = ({gist, file}: LoadParams): void => {
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
        }
    }, [dispatch, gist, file]);
};

export const useInitSections = (): void => {
    const dispatch = useDispatch();
    const sectionData = useAllSkillSections();

    useEffect(() => {
        dispatch(initializeSections(sectionData));
    }, [dispatch, sectionData]);
};
