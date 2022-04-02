import React from "react";
import {Box, Stack, StackProps, Button, IconButton, TextField, Card} from "@mui/material";
import {AddCircle, Delete, DragIndicator} from "@mui/icons-material";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {useRows, useRow, appendRow, removeRow, moveRow, updateRowName, RowId} from "../../store/timeline";

export interface RowProps {
    id: RowId;
    index: number;
}

export const Row = ({id, index}: RowProps): JSX.Element => {
    const dispatch = useDispatch();
    const row = useRow(id);

    return (
        <Draggable draggableId={id.toString()} index={index}>
            {({innerRef, draggableProps, dragHandleProps}) => (
                <span ref={innerRef} {...draggableProps}>
                    <Card>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <span {...dragHandleProps}>
                                <DragIndicator/>
                            </span>
                            <TextField
                                placeholder={`Section #${id + 1}`}
                                variant="standard"
                                value={row.name}
                                onChange={({target}) => dispatch(updateRowName({id, name: target.value}))}
                            />
                            <Box flexGrow={1}>
                                This rows skills will appear here...
                            </Box>
                            <IconButton
                                aria-label="delete"
                                onClick={() => dispatch(removeRow({id}))}
                            >
                                <Delete/>
                            </IconButton>
                        </Stack>
                    </Card>
                </span>
            )}
        </Draggable>
    );
};

export type TimelineProps = StackProps;

export const Timeline = (props: TimelineProps): JSX.Element => {
    const dispatch = useDispatch();
    const rows = useRows();

    return (
        <Stack direction="column" spacing={1} {...props}>
            <DragDropContext onDragEnd={({source, destination: dest}) => {
                if (dest && dest.index !== source.index) {
                    dispatch(moveRow({from: source.index, to: dest.index}));
                }
            }}>
                <Droppable droppableId="timeline-rows">
                    {({innerRef: ref, droppableProps, placeholder}) => (
                        <span ref={ref} {...droppableProps}>
                            <Stack direction="column" spacing={1}>
                                {rows.map(({id}, i) => (
                                    <Row key={id} id={id} index={i}/>
                                ))}
                                {placeholder}
                            </Stack>
                        </span>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                variant="contained"
                startIcon={<AddCircle/>}
                onClick={() => dispatch(appendRow({name: "", skills: []}))}
            >Add Row</Button>
        </Stack>
    );
};
