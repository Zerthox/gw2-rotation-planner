import React from "react";
import {Box, Stack, TextField, Card, Typography} from "@mui/material";
import {ArrowUpward, ArrowDownward, Delete} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useDispatch} from "react-redux";
import {IconButton} from "../general";
import {DraggableSkill} from "../skill";
import {OverData} from ".";
import {DragId} from "../../store/drag";
import {useRow, deleteRow, moveRow, updateRowName, insertRowSkill} from "../../store/timeline";
import {createSkillState} from "../../store/build";

export interface RowProps {
    dragId: DragId;
    index: number;
}

export const Row = ({dragId, index}: RowProps): JSX.Element => {
    const dispatch = useDispatch();
    const row = useRow(dragId);
    const items = row.skills.map(({dragId}) => dragId);
    const {setNodeRef} = useDroppable({
        id: dragId,
        data: {parentId: dragId, index: items.length} as OverData
    });

    return (
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
                <Stack direction="column" alignItems="center">
                    <IconButton
                        title="Move Up"
                        onClick={() => dispatch(moveRow({from: index, to: index - 1}))}
                    >
                        <ArrowUpward/>
                    </IconButton>
                    <IconButton
                        title="Move Down"
                        onClick={() => dispatch(moveRow({from: index, to: index + 1}))}
                    >
                        <ArrowDownward/>
                    </IconButton>
                </Stack>
                <IconButton
                    title="Delete"
                    onClick={() => dispatch(deleteRow({rowId: dragId}))}
                >
                    <Delete/>
                </IconButton>
            </Stack>
        </Card>
    );
};
