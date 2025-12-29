import React, { useMemo } from "react";
import { Box, Stack, TextField, Card, CardProps, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { DraggableSkill } from "../skill";
import { RowButtons } from "./row-buttons";
import { RowContextMenu } from "./row-menu";
import { OverData } from "../../util/drag";
import {
    deleteRow,
    moveRow,
    updateRowName,
    insertRow,
    clearRowSkills,
    RowState,
} from "../../store/timeline";
import { getSearchValue } from "../../data/common";
import { copyToClipboard } from "../../util/clipboard";

export interface RowActions {
    isFirst: boolean;
    isLast: boolean;
    isEmpty: boolean;
    onDuplicate: () => void;
    onMove: (up: boolean) => void;
    onCopy: () => void;
    onClear: () => void;
    onDelete: () => void;
}

export interface RowProps extends CardProps {
    row: RowState;
    index: number;
    isLast: boolean;
}

const RowContent = (
    { row, index, isLast, ...props }: RowProps,
    ref: React.Ref<HTMLDivElement>,
): JSX.Element => {
    const dispatch = useDispatch();

    const items = row.skills.map(({ dragId }) => dragId);
    const actions = useMemo<RowActions>(
        () => ({
            isFirst: index === 0,
            isLast,
            isEmpty: row.skills.length === 0,
            onDuplicate: () =>
                dispatch(
                    insertRow({
                        index: index + 1,
                        row: { name: row.name, skills: row.skills.map(({ skillId }) => skillId) },
                    }),
                ),
            onMove: (up) =>
                dispatch(
                    moveRow({
                        from: index,
                        to: up ? index - 1 : index + 1,
                    }),
                ),
            onCopy: () =>
                copyToClipboard(
                    (row.name ? row.name + ": " : "")
                        + row.skills.map(({ skillId }) => getSearchValue(skillId)).join(" "),
                ),
            onClear: () => dispatch(clearRowSkills({ rowId: row.dragId })),
            onDelete: () => dispatch(deleteRow({ rowId: row.dragId })),
        }),
        [dispatch, index, row.dragId, row.name, row.skills, isLast],
    );

    return (
        <RowContextMenu {...actions}>
            <Card {...props}>
                <Stack direction="row" alignItems="center" spacing={1} paddingX={2} paddingY={1}>
                    <TextField
                        placeholder={`Section #${index + 1}`}
                        variant="standard"
                        value={row.name}
                        onChange={({ target }) =>
                            dispatch(updateRowName({ rowId: row.dragId, name: target.value }))
                        }
                        sx={{ flex: "none" }}
                    />
                    <Box flexGrow={1} ref={ref}>
                        <SortableContext items={items} strategy={rectSortingStrategy}>
                            {row.skills.length > 0 ? (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, 3em)",
                                        gridTemplateRows: "repeat(auto-fill, 3em)",
                                        gap: 0.5,
                                    }}
                                >
                                    {row.skills.map(({ dragId, skillId }, i) => (
                                        <DraggableSkill
                                            key={dragId}
                                            dragId={dragId}
                                            parentId={row.dragId}
                                            index={i}
                                            skill={skillId}
                                            canDuplicate
                                            canDelete
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <Typography sx={{ opacity: 0.5 }}>Drop skills here</Typography>
                            )}
                        </SortableContext>
                    </Box>
                    <RowButtons {...actions} />
                </Stack>
            </Card>
        </RowContextMenu>
    );
};

const WrappedRowContent = React.memo(React.forwardRef(RowContent));

export const Row = ({ row, ...props }: RowProps): JSX.Element => {
    const { setNodeRef } = useDroppable({
        id: row.dragId,
        data: { parentId: row.dragId, index: row.skills.length } as OverData,
    });

    return <WrappedRowContent row={row} ref={setNodeRef} {...props} />;
};
