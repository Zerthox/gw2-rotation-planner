import React from "react";
import {Stack} from "@mui/material";
import {Trash} from "./trash";
import {ProfessionSelect} from "../sidebar/prof-select";
import {SkillCatalog, ViewSelect} from "../sidebar";
import {DragType, createDragId} from "../../util/drag";

const CATALOG_ID = createDragId(DragType.Skillbar);

const TRASH_ID = createDragId(DragType.Trash);

export const Sidebar = (): JSX.Element => (
    <Stack
        direction="column"
        alignItems="stretch"
        spacing={2}
        padding={2}
        height="100%"
    >
        <ProfessionSelect sx={{flex: "none"}}/>
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            flex="none"
        >
            <ViewSelect/>
            <Trash dragId={TRASH_ID} sx={{flexGrow: 1}}/>
        </Stack>
        <SkillCatalog dragId={CATALOG_ID}/>
    </Stack>
);
