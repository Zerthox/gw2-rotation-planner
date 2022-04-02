import React from "react";
import {Box, Stack, StackProps, Grid, Button, TextField, Card, Typography} from "@mui/material";
import {ArrowUpward, ArrowDownward, AddCircle, Delete} from "@mui/icons-material";
import {Droppable} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {IconButton} from "../general";
import {Skill} from "./skill";
import {Id} from "../../store/planner";
import {useRows, useRow, appendRow, deleteRow, moveRow, updateRowName} from "../../store/timeline";

export interface RowProps {
    id: Id;
    index: number;
}

export const Row = ({id, index}: RowProps): JSX.Element => {
    const dispatch = useDispatch();
    const row = useRow(id);

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
                    <Droppable droppableId={id} direction="horizontal">
                        {({innerRef, droppableProps, placeholder}) => (
                            <span ref={innerRef} {...droppableProps}>
                                {row.skills.length > 0 ? (
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        flexWrap="wrap"
                                        spacing={1}
                                    >
                                        {row.skills.map(({id, skillId: skill}, i) => (
                                            <Grid item key={id} xs={1}>
                                                <Skill
                                                    id={id}
                                                    skill={skill}
                                                    index={i}
                                                />
                                            </Grid>
                                        ))}
                                        {placeholder}
                                    </Grid>
                                ) : (
                                    <Typography sx={{opacity: 0.5}}>
                                        Drop skills here
                                    </Typography>
                                )}
                            </span>
                        )}
                    </Droppable>
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

export type TimelineProps = StackProps;

export const Timeline = (props: TimelineProps): JSX.Element => {
    const dispatch = useDispatch();
    const rows = useRows();

    return (
        <Stack direction="column" spacing={1} {...props}>
            <Stack direction="column" spacing={1}>
                {rows.map(({id}, i) => (
                    <Row key={id} id={id} index={i}/>
                ))}
            </Stack>
            <Button
                variant="contained"
                startIcon={<AddCircle/>}
                onClick={() => dispatch(appendRow({name: "", skills: []}))}
            >Add Row</Button>
        </Stack>
    );
};
