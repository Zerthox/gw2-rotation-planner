import React from "react";
import {Box, BoxProps, Stack, Typography} from "@mui/material";

export interface IconTextProps {
    icon: string;
    size: BoxProps["height"];
    children: React.ReactNode;
    iconProps?: BoxProps;
}

export const IconText = ({icon, size, children}: IconTextProps): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <Box
            component="img"
            src={icon}
            height={size}
            width={size}
        />
        <Typography>{children}</Typography>
    </Stack>
);
