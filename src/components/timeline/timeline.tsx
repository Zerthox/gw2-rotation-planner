import React, { useId } from "react";
import { Box, BoxProps, Stack, Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useDroppable } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { Row } from "./row";
import { useRows, insertRow } from "../../store/timeline";
import { LoadParams, useLoadTimeline } from "../../hooks/load";
import { DragId, DragType, DragData } from "../../util/drag";

export interface AddButtonProps {
    dragId: DragId;
}

export const AddButton = ({ dragId }: AddButtonProps): JSX.Element => {
    const dispatch = useDispatch();

    const data: DragData = { type: DragType.Add };
    const { setNodeRef, isOver } = useDroppable({ id: dragId, data });

    return (
        <span ref={setNodeRef}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<AddCircle />}
                onClick={() => dispatch(insertRow({ row: {} }))}
                sx={
                    isOver
                        ? {
                              backgroundColor: "primary.dark",
                          }
                        : null
                }
            >
                Add Section
                {isOver ? " with Skill" : null}
            </Button>
        </span>
    );
};

export interface TimelineProps extends BoxProps {
    load: LoadParams;
}

export const Timeline = ({ load, ...props }: TimelineProps): JSX.Element => {
    const rows = useRows();
    const addDragId = useId();

    useLoadTimeline(load);

    return (
        <Box maxHeight="100%" sx={{ overflowY: "auto" }} {...props}>
            <Stack direction="column" alignItems="stretch" spacing={1} padding={1.5} minWidth={600}>
                <Stack direction="column" spacing={1}>
                    {rows.map((row, i) => (
                        <Row key={row.dragId} row={row} index={i} isLast={i === rows.length - 1} />
                    ))}
                </Stack>
                <AddButton dragId={addDragId} />
            </Stack>
        </Box>
    );
};
