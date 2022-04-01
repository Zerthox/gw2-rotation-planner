import React from "react";
import {Box, Stack, StackProps, Button, IconButton, TextField, Card} from "@mui/material";
import {AddCircle, Delete} from "@mui/icons-material";
import {useRows, useRow, addRow, removeRow, updateRowName} from "../../store/timeline";
import {useDispatch} from "react-redux";

export interface RowProps {
    id: number;
}

export const Row = ({id}: RowProps): JSX.Element => {
    const dispatch = useDispatch();
    const row = useRow(id);

    return (
        <Card>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                padding={1}
            >
                <TextField
                    placeholder={`Section #${id + 1}`}
                    variant="standard"
                    value={row.name}
                    onChange={({target}) => dispatch(updateRowName({row: id, name: target.value}))}
                />
                <Box flexGrow={1}>
                    This rows skills will appear here...
                </Box>
                <IconButton
                    aria-label="delete"
                    onClick={() => dispatch(removeRow(id))}
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
            <Stack direction="column" spacing={1} padding={1}>
                {rows.map((_, i) => (
                    <Row key={i} id={i}/>
                ))}
            </Stack>
            <Button
                variant="contained"
                startIcon={<AddCircle/>}
                onClick={() => dispatch(addRow({name: "", skills: []}))}
            >Add Row</Button>
        </Stack>
    );
};
