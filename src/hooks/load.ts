import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { overrideRows } from "../store/timeline";
import { useAllSkillSections } from "./data";
import { initializeSections } from "../store/build";
import { decodeShare } from "../util/encode";
import { fetchFromGist, fetchFromURL } from "../util/fetch";

export interface LoadParams {
    gist?: string;
    file?: string;
    url?: string;
    share?: string;
}

export const useLoadTimeline = ({ gist, file, url, share }: LoadParams): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: show loading & error in ui
        // TODO: add param for dps.report log
        try {
            if (gist) {
                fetchFromGist(gist, file).then((rows) => dispatch(overrideRows(rows)));
            } else if (url) {
                fetchFromURL(url).then((rows) => dispatch(overrideRows(rows)));
            } else if (share) {
                const rows = decodeShare(share);
                dispatch(overrideRows(rows));
            }
        } catch (err) {
            console.error(err);
        }
    }, [dispatch, gist, file, url, share]);
};

export const useInitSections = (): void => {
    const dispatch = useDispatch();
    const sectionData = useAllSkillSections();

    useEffect(() => {
        dispatch(initializeSections(sectionData));
    }, [dispatch, sectionData]);
};
