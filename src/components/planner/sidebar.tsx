import React from "react";
import {Stack, Card, CardProps, Chip, Divider} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {Skillbar} from "./skillbar";
import {OverData} from ".";
import {IdType, createId} from "../../store/planner";

export const SKILLBAR_ID = createId(IdType.Skillbar);

export const TRASH_ID = createId(IdType.Trash);

export interface TrashProps {
    id: string;
}

export const Trash = ({id}: TrashProps): JSX.Element => {
    const {setNodeRef, isOver} = useDroppable({
        id,
        data: {} as OverData
    });

    return (
        <span ref={setNodeRef}>
            <Chip
                variant="outlined"
                label="Delete"
                icon={<Delete/>}
                sx={{opacity: isOver ? 1 : 0.5}}
            />
        </span>
    );
};

export type SidebarProps = CardProps;

export const Sidebar = (props: SidebarProps): JSX.Element => (
    <Card {...props}>
        <Stack direction="column" spacing={1} padding={2}>
            <Trash id={TRASH_ID}/>
            <Divider/>
            <Skillbar id={SKILLBAR_ID}/>
        </Stack>
    </Card>
);
