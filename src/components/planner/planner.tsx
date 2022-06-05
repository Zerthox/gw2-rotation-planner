import React from "react";
import {Stack, Card} from "@mui/material";
import {Dnd} from "./dnd";
import {Trash} from "./trash";
import {ProfessionSelect} from "./prof-select";
import {ViewSelect} from "./view-select";
import {SkillCatalog} from "./skills";
import {Timeline} from "./timeline";
import {DragType, createDragId} from "../../util/drag";
import {LoadParams} from "../../hooks/load";

const CATALOG_ID = createDragId(DragType.Skillbar);

const TRASH_ID = createDragId(DragType.Trash);

const ADD_ID = createDragId(DragType.Add);

export const Sidebar = (): JSX.Element => {
    return (
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
};

export interface PlannerProps {
    load?: LoadParams;
}

export const Planner = ({load}: PlannerProps): JSX.Element => (
    <Dnd>
        <Stack direction="row" maxHeight="100%">
            <Card sx={{
                justifySelf: "stretch",
                flex: "none",
                margin: 1.5,
                marginRight: 0
            }}>
                <Sidebar/>
            </Card>
            <Timeline load={load} addDragId={ADD_ID} flex="1" maxHeight="100%"/>
        </Stack>
    </Dnd>
);
