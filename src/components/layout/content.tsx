import React from "react";
import {Box, Stack} from "@mui/material";
import {Providers} from "./providers";
import {Header} from "./header";
import {themes} from "../../themes";
import {useTheme} from "../../store/settings";

export interface ContentProps {
    title?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
}

export const Content = ({title, children, header}: ContentProps): JSX.Element => {
    const theme = useTheme();

    return (
        <Providers theme={themes[theme]}>
            <Stack direction="column" height="100vh">
                <Header title={title}>
                    {header}
                </Header>
                <Box flex="1" minHeight={0}>
                    {children}
                </Box>
            </Stack>
        </Providers>
    );
};
