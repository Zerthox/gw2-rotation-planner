import React from "react";
import {Chip} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {OverData} from ".";

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
