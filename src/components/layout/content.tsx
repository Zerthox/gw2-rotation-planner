import React from "react";
import {Box} from "@mui/material";
import {Header} from "./header";

export interface ContentProps {
    title?: string;
    children: React.ReactNode;
}

export const Content = ({title, children}: ContentProps): JSX.Element => (
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
);
