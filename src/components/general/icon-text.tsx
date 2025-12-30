import React from "react";
import { Box, BoxProps, Stack, Typography, TypographyProps } from "@mui/material";

export interface IconTextProps {
    icon: string;
    size: BoxProps["height"];
    children: React.ReactNode;
    spacing?: number;
    iconProps?: BoxProps;
    textProps?: TypographyProps;
}

export const IconText = ({
    icon,
    size,
    children,
    spacing = 0.5,
    iconProps,
    textProps,
}: IconTextProps): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing={spacing}>
        <Box component="img" src={icon} height={size} width={size} {...iconProps} />
        <Typography {...textProps}>{children}</Typography>
    </Stack>
);
