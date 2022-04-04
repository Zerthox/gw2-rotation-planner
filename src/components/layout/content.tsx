import React from "react";
import {Box} from "@mui/material";
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
            <Box
                height="100vh"
                display="flex"
                flexDirection="column"
            >
                <Header title={title}/>
                <Box
                    margin={3}
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                >
                    {children}
                </Box>
            </Box>
        </Providers>
    );
};
