import React from "react";
import {Stack, StackProps, Button} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {Row} from "./row";
import {useRows, appendRow} from "../../store/timeline";

export type TimelineProps = StackProps;

export const Timeline = (props: TimelineProps): JSX.Element => {
    const dispatch = useDispatch();
    const rows = useRows();

    return (
        <Stack direction="column" spacing={1} {...props}>
            <Stack direction="column" spacing={1}>
                {rows.map(({dragId: id}, i) => (
                    <Row key={id} dragId={id} index={i}/>
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
