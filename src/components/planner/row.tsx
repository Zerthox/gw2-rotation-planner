import React, {useMemo} from "react";
import {Box, Stack, TextField, Card, Typography} from "@mui/material";
import {ArrowUpward, ArrowDownward, Delete, PlusOne, Clear} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useDispatch} from "react-redux";
import {IconButton, ContextMenu} from "../general";
import {DraggableSkill} from "../skill";
import {OverData} from ".";
import {DragId} from "../../store/drag";
import {useRow, useRowCount, deleteRow, moveRow, updateRowName, insertRowSkill, deleteRowSkill, insertRow, clearRowSkills} from "../../store/timeline";
import {createSkillState} from "../../store/build";

export interface RowActions {
    isFirst: boolean;
    isLast: boolean;
    isEmpty: boolean;
    onDuplicate: () => void;
    onClear: () => void;
    onMove: (up: boolean) => void;
    onDelete: () => void;
}

export interface RowContextMenuProps extends Partial<RowActions> {
    children: React.ReactNode;
}

export const RowContextMenu = ({children, isFirst, isLast, isEmpty, onDuplicate, onClear, onDelete, onMove}: RowContextMenuProps): JSX.Element => (
    <ContextMenu items={[
        onDuplicate ? {
            text: "Duplicate Section",
            icon: <PlusOne/>,
            action: () => onDuplicate()
        } : null,
        ...onMove ? [
            {
                text: "Move Up",
                icon: <ArrowUpward/>,
                disabled: isFirst,
                action: () => onMove(true)
            },
            {
                text: "Move Down",
                icon: <ArrowDownward/>,
                disabled: isLast,
                action: () => onMove(false)
            }
        ] : [],
        onClear ? {
            text: "Clear Section",
            icon: <Clear/>,
            disabled: isEmpty,
            action: () => onClear()
        } : null,
        onDelete ? {
            text: "Delete Section",
            icon: <Delete/>,
            color: "error.main",
            action: () => onDelete()
        } : null
    ]}>{children}</ContextMenu>
);

export type RowButtonsProps = RowActions;

export const RowButtons = ({isFirst, isLast, isEmpty, onClear, onMove, onDelete}: RowButtonsProps): JSX.Element => (
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

export interface RowProps {
    dragId: DragId;
    index: number;
}

export const Row = ({dragId, index}: RowProps): JSX.Element => {
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
            row: {name: row.name, skills: row.skills.map((skill) => skill.skillId)}}
        )),
        onClear: () => dispatch(clearRowSkills({rowId: dragId})),
        onMove: (up) => dispatch(moveRow({from: index, to: up ? index + 1 : index - 1})),
        onDelete: () => dispatch(deleteRow({rowId: dragId}))
    }), [dispatch, dragId, index, row.name, row.skills, rowCount]);

    return (
        <RowContextMenu {...actions}>
            <Card>
                <Stack direction="row" alignItems="center" spacing={1} paddingX={2} paddingY={1}>
                    <TextField
                        placeholder={`Section #${index + 1}`}
                        variant="standard"
                        value={row.name}
                        onChange={({target}) => dispatch(updateRowName({rowId: dragId, name: target.value}))}
                        sx={{flex: "none"}}
                    />
                    <Box flexGrow={1}>
                        <span ref={setNodeRef}>
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
                        </span>
                    </Box>
                    <RowButtons {...actions}/>
                </Stack>
            </Card>
        </RowContextMenu>
    );
};
