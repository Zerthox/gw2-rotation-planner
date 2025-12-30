import React from "react";
import { Stack, CircularProgress, Typography } from "@mui/material";
import { Providers } from "./providers";

export const Loading = (): JSX.Element => (
    <Providers>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            minHeight="100vh"
        >
            <CircularProgress />
            <Typography variant="h5">Loading...</Typography>
        </Stack>
    </Providers>
);
