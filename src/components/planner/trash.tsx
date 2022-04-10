import React from "react";
import {Chip} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {DragId} from "../../store/planner";
import {OverData} from ".";

export interface TrashProps {
    dragId: DragId;
}

export const Trash = ({dragId}: TrashProps): JSX.Element => {
    const {setNodeRef, isOver} = useDroppable({
        id: dragId,
        data: {} as OverData
    });

    return (
        <Chip
            ref={setNodeRef}
            variant="outlined"
            label="Delete"
            icon={<Delete/>}
            sx={{opacity: isOver ? 1 : 0.5}}
        />
    );
};
