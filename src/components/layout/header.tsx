import React, {useState} from "react";
import {AppBar, Box, Stack, Typography} from "@mui/material";
import {GitHub, Settings} from "@mui/icons-material";
import {IconButton} from "../general";
import {SettingsDrawer} from "./settings";
import {useSiteMeta} from "../../hooks/site";

export interface HeaderProps {
    title?: string;
    children?: React.ReactNode;
}

export const Header = ({title, children}: HeaderProps): JSX.Element => {
    const siteMeta = useSiteMeta();

    const [open, setOpen] = useState(false);

    return (
        <AppBar position="static">
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                padding={2}
            >
                {title ? (
                    <Typography variant="h4">{title}</Typography>
                ) : null}
                {children}
                <Box flexGrow={1}/>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                        title="View Source"
                        href={siteMeta.source}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHub/>
                    </IconButton>
                    <IconButton title="Open Settings" onClick={() => setOpen(true)}>
                        <Settings/>
                    </IconButton>
                </Stack>
            </Stack>
            <SettingsDrawer
                open={open}
                onClose={() => setOpen(false)}
            />
        </AppBar>
    );
};
