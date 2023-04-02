import React from "react";
import {Stack} from "@mui/material";
import {ProfessionSelect} from "../sidebar/prof-select";
import {SkillCatalog, ViewSelect} from "../sidebar";
import {DragType, createDragId} from "../../util/drag";

const CATALOG_ID = createDragId(DragType.Skillbar);

export const Sidebar = (): JSX.Element => (
    <Stack
        direction="column"
        alignItems="stretch"
        spacing={2}
        padding={2}
        height="100%"
    >
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            flex="none"
        >
            <ProfessionSelect sx={{flexGrow: 1}}/>
            <ViewSelect/>
        </Stack>
        <SkillCatalog dragId={CATALOG_ID}/>
    </Stack>
);
