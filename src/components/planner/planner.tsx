import React from "react";
import {Stack, Card, Box} from "@mui/material";
import {Timeline} from "./timeline";

export const Planner = (): JSX.Element => (
    <Stack direction="row" spacing={2} flexGrow={1}>
        <Card sx={{justifySelf: "stretch"}}>
            <Box padding={2}>
                Skills will<br/>
                appear here
            </Box>
        </Card>
        <Timeline flexGrow={1}/>
    </Stack>
);
