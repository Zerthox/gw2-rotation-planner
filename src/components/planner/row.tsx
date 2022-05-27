import React, {useMemo} from "react";
import {Box, Stack, TextField, Card, CardProps, Typography} from "@mui/material";
import {ArrowUpward, ArrowDownward, Delete, PlusOne, Clear, Message} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useDispatch} from "react-redux";
import {IconButton, ContextMenu, ContextMenuProps} from "../general";
import {DraggableSkill} from "../skill";
import {DragId, OverData} from "../../util/drag";
import {useRow, useRowCount, deleteRow, moveRow, updateRowName, insertRowSkill, deleteRowSkill, insertRow, clearRowSkills} from "../../store/timeline";
import {createSkillState} from "../../store/build";
import {getSearchValue} from "../../data/custom";
import {copyToClipboard} from "../../util/clipboard";

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

export type RowContextMenuProps = RowActions & ContextMenuProps;

export const RowContextMenu = ({isFirst, isLast, isEmpty, onDuplicate, onMove, onCopy, onClear, onDelete, ...props}: RowContextMenuProps): JSX.Element => (
    <ContextMenu {...props} items={[
        {
            key: "duplicate",
            text: "Duplicate Section",
            icon: <PlusOne/>,
            action: () => onDuplicate()
        },
        {
            key: "up",
            text: "Move Up",
            icon: <ArrowUpward/>,
            disabled: isFirst,
            action: () => onMove(true)
        },
        {
            key: "down",
            text: "Move Down",
            icon: <ArrowDownward/>,
            disabled: isLast,
            action: () => onMove(false)
        },
        {
            key: "copy",
            text: "Copy Chat Message",
            icon: <Message/>,
            disabled: isEmpty,
            action: () => onCopy()
        },
        {
            key: "clear",
            text: "Clear Section",
            icon: <Clear/>,
            disabled: isEmpty,
            action: () => onClear()
        },
        {
            key: "delete",
            text: "Delete Section",
            icon: <Delete/>,
            color: "error.main",
            action: () => onDelete()
        }
    ]}/>
);

export type RowButtonsProps = Omit<RowActions, "onDuplicate" | "onCopy">;

export const RowButtons = ({isFirst, isLast, isEmpty, onMove, onClear, onDelete}: RowButtonsProps): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton
            title="Clear Section"
            disabled={isEmpty}
            onClick={() => onClear()}
        >
            <Clear/>
        </IconButton>
        <Stack direction="column" alignItems="center">
            <IconButton
                title="Move Up"
                disabled={isFirst}
                onClick={() => onMove(true)}
            >
                <ArrowUpward/>
            </IconButton>
            <IconButton
                title="Move Down"
                disabled={isLast}
                onClick={() => onMove(false)}
            >
                <ArrowDownward/>
            </IconButton>
        </Stack>
        <IconButton
            title="Delete Section"
            onClick={() => onDelete()}
        >
            <Delete/>
        </IconButton>
    </Stack>
);

export interface RowProps extends CardProps {
    dragId: DragId;
    index: number;
}

export const Row = ({dragId, index, ...props}: RowProps): JSX.Element => {
    const dispatch = useDispatch();
    const row = useRow(dragId);
    const rowCount = useRowCount();

    const items = row.skills.map(({dragId}) => dragId);
    const {setNodeRef} = useDroppable({
        id: dragId,
        data: {parentId: dragId, index: items.length} as OverData
    });

    const actions = useMemo<RowActions>(() => ({
        isFirst: index === 0,
        isLast: index === rowCount -1,
        isEmpty: row.skills.length === 0,
        onDuplicate: () => dispatch(insertRow({
            index: index + 1,
            row: {name: row.name, skills: row.skills.map(({skillId}) => skillId)}}
        )),
        onMove: (up) => dispatch(moveRow({
            from: index,
            to: up ? index - 1 : index + 1
        })),
        onCopy: () => copyToClipboard(
            (row.name ? row.name + ": " : "")
            + row.skills.map(({skillId}) => getSearchValue(skillId)).join(" ")
        ),
        onClear: () => dispatch(clearRowSkills({rowId: dragId})),
        onDelete: () => dispatch(deleteRow({rowId: dragId}))
    }), [dispatch, dragId, index, row.name, row.skills, rowCount]);

    return (
        <RowContextMenu {...actions}>
            <Card {...props}>
                <Stack direction="row" alignItems="center" spacing={1} paddingX={2} paddingY={1}>
                    <TextField
                        placeholder={`Section #${index + 1}`}
                        variant="standard"
                        value={row.name}
                        onChange={({target}) => dispatch(updateRowName({rowId: dragId, name: target.value}))}
                        sx={{flex: "none"}}
                    />
                    <Box flexGrow={1} ref={setNodeRef}>
                        <SortableContext
                            items={items}
                            strategy={rectSortingStrategy}
                        >
                            {row.skills.length > 0 ? (
                                <Box sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, 3em)",
                                    gridTemplateRows: "repeat(auto-fill, 3em)",
                                    gap: 0.5
                                }}>
                                    {row.skills.map(({dragId, skillId}, i) => (
                                        <DraggableSkill
                                            key={dragId}
                                            dragId={dragId}
                                            parentId={row.dragId}
                                            index={i}
                                            skill={skillId}
                                            onDuplicate={() => dispatch(insertRowSkill({
                                                rowId: row.dragId,
                                                index: i + 1,
                                                skill: createSkillState(skillId)
                                            }))}
                                            onDelete={() => dispatch(deleteRowSkill({
                                                rowId: row.dragId,
                                                skillId: dragId
                                            }))}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <Typography sx={{opacity: 0.5}}>
                                    Drop skills here
                                </Typography>
                            )}
                        </SortableContext>
                    </Box>
                    <RowButtons {...actions}/>
                </Stack>
            </Card>
        </RowContextMenu>
    );
};
