import React from "react";
import {Box, Stack} from "@mui/material";
import {Providers} from "./providers";
import {Header} from "./header";
import {DarkTheme, LightTheme} from "./theme";
import {useDarkMode} from "../../store/theme";

export interface ContentProps {
    title?: string;
    children: React.ReactNode;
}

export const Content = ({title, children}: ContentProps): JSX.Element => {
    const darkMode = useDarkMode();

    return (
        <Providers theme={darkMode ? DarkTheme : LightTheme}>
            <Stack direction="column" height="100vh">
                <Header title={title}/>
                <Box
                    margin={3}
                    flex="1"
                    minHeight={0}
                >
                    {children}
                </Box>
            </Stack>
        </Providers>
    );
};
