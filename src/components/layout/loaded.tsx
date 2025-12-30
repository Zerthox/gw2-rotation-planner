import React from "react";
import { Box, Stack } from "@mui/material";
import { Providers } from "./providers";
import { Header, HeaderProps } from "./header";
import { useAccent } from "../../store/settings";

export interface LoadedProps extends HeaderProps {
    header?: React.ReactNode;
}

export const Loaded = ({ children, header, ...props }: LoadedProps): JSX.Element => {
    const theme = useAccent();
    console.log(theme);
    return (
        <Providers theme={theme}>
            <Stack direction="column" height="100vh" minWidth={800}>
                <Header {...props}>{header}</Header>
                <Box flex="1" minHeight={0}>
                    {children}
                </Box>
            </Stack>
        </Providers>
    );
};
