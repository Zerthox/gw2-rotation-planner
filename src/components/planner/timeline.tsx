import React from "react";
import {Box, BoxProps, Stack, Button} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {Row} from "./row";
import {useRows, appendRow} from "../../store/timeline";

export type TimelineProps = BoxProps;

export const Timeline = (props: TimelineProps): JSX.Element => {
    const dispatch = useDispatch();
    const rows = useRows();

    return (
        <Box maxHeight="100%" sx={{overflowY: "auto"}} {...props}>
            <Stack direction="column" spacing={1} padding={1.5}>
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
        </Box>
    );
};
