import React from "react";
import {Box, Stack} from "@mui/material";
import {Providers} from "./providers";
import {Header} from "./header";
import {themes} from "../../themes";
import {useTheme} from "../../store/settings";

export interface LoadedProps {
    title?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
    settings?: boolean;
    help?: React.ReactNode;
}

export const Loaded = ({title, children, header, settings, help}: LoadedProps): JSX.Element => {
    const theme = useTheme();

    return (
        <Providers theme={themes[theme]}>
            <Stack direction="column" height="100vh">
                <Header title={title} settings={settings} help={help}>
                    {header}
                </Header>
                <Box flex="1" minHeight={0}>
                    {children}
                </Box>
            </Stack>
        </Providers>
    );
};
