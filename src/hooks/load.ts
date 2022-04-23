import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {overrideRows} from "../store/timeline";
import {useAllSkillSections} from "./data";
import {initializeSections} from "../store/build";
import {decodeShare} from "../util/encode";
import {loadFromGist} from "../util/github";

export interface LoadParams {
    share?: string;
    gist?: string;
    file?: string;
}

export const useLoadTimeline = ({gist, file, share}: LoadParams): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: show loading & error in ui
        try {
            if (gist) {
                loadFromGist(gist, file).then((rows) => dispatch(overrideRows(rows)));
            } else if (share) {
                const rows = decodeShare(share);
                dispatch(overrideRows(rows));
            }
        } catch (err) {
            console.error(err);
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
