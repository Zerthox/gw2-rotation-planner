import React from "react";
import { Stack, Card } from "@mui/material";
import { Dnd } from "./dnd";
import { Sidebar } from "../sidebar";
import { Timeline } from "../timeline";
import { DragType, createDragId } from "../../util/drag";
import { LoadParams } from "../../hooks/load";

export interface PlannerProps {
    load?: LoadParams;
}

const ADD_ID = createDragId(DragType.Add);

export const Planner = ({ load }: PlannerProps): JSX.Element => (
    <Dnd>
        <Stack direction="row" maxHeight="100%">
            <Card
                sx={{
                    justifySelf: "stretch",
                    flex: "none",
                    margin: 1.5,
                    marginRight: 0,
                }}
            >
                <Sidebar />
            </Card>
            <Timeline load={load} addDragId={ADD_ID} flex="1" maxHeight="100%" />
        </Stack>
    </Dnd>
);
