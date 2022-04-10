import React from "react";
import {Box, Stack, TextField, Card, Typography} from "@mui/material";
import {ArrowUpward, ArrowDownward, Delete} from "@mui/icons-material";
import {useDroppable} from "@dnd-kit/core";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useDispatch} from "react-redux";
import {IconButton} from "../general";
import {DraggableSkill} from "./skill";
import {OverData} from ".";
import {DragId} from "../../store/planner";
import {useRow, deleteRow, moveRow, updateRowName} from "../../store/timeline";

export interface RowProps {
    dragId: DragId;
    index: number;
}

export const Row = ({dragId: id, index}: RowProps): JSX.Element => {
    const dispatch = useDispatch();
    const row = useRow(id);
    const items = row.skills.map(({dragId: id}) => id);
    const {setNodeRef} = useDroppable({
        id,
        data: {parentId: id, index: items.length} as OverData
    });

    return (
        <Card>
            <Stack direction="row" alignItems="center" spacing={1} padding={2}>
                <TextField
                    placeholder={`Section #${index + 1}`}
                    variant="standard"
                    value={row.name}
                    onChange={({target}) => dispatch(updateRowName({rowId: id, name: target.value}))}
                    sx={{flexShrink: 0}}
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
                                    {row.skills.map(({dragId: id, skillId}, i) => (
                                        <DraggableSkill key={id} dragId={id} parentId={row.dragId} index={i} skill={skillId}/>
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
                    onClick={() => dispatch(deleteRow({rowId: id}))}
                >
                    <Delete/>
                </IconButton>
            </Stack>
        </Card>
    );
};
