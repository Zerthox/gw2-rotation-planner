import React from "react";
import {Chip, SxProps} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {DragId, OverData} from "../../util/drag";

export interface TrashProps {
    dragId: DragId;
    sx?: SxProps;
}

export const Trash = ({dragId, sx}: TrashProps): JSX.Element => {
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
            sx={{
                opacity: isOver ? 1 : 0.5,
                ...sx
            }}
        />
    );
};
