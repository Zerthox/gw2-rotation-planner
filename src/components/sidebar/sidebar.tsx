import React, { useId } from "react";
import { Stack } from "@mui/material";
import { ProfessionSelect } from "../sidebar/prof-select";
import { SkillCatalog, ViewSelect } from "../sidebar";

export const Sidebar = (): JSX.Element => {
    const dragId = useId();

    return (
        <Stack direction="column" alignItems="stretch" spacing={2} padding={2} height="100%">
            <Stack direction="row" alignItems="center" spacing={1} flex="none">
                <ProfessionSelect sx={{ flexGrow: 1 }} />
                <ViewSelect />
            </Stack>
            <SkillCatalog dragId={dragId} />
        </Stack>
    );
};
