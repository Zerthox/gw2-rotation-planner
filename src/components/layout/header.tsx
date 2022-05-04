import React from "react";
import {AppBar, Box, Stack, Typography} from "@mui/material";
import {GitHub, Help, Settings} from "@mui/icons-material";
import {IconButton, DrawerWithButton, AnchorWithRef} from "../general";
import {SettingsContent} from "./settings";
import {useSiteMeta} from "../../hooks/site";

export interface HeaderProps {
    title?: string;
    children?: React.ReactNode;
    settings?: boolean;
    help?: React.ReactNode;
}

export const Header = ({title, children, settings = true, help}: HeaderProps): JSX.Element => {
    const siteMeta = useSiteMeta();

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
                    {help ? (
                        <DrawerWithButton title="Help" anchor="right" button={
                            <IconButton title="Open Help">
                                <Help/>
                            </IconButton>
                        }>
                            {help}
                        </DrawerWithButton>
                    ) : null}
                    <IconButton
                        component={AnchorWithRef}
                        title="View Source"
                        to={siteMeta.source}
                        newTab
                    >
                        <GitHub/>
                    </IconButton>
                    {settings ? (
                        <DrawerWithButton title="User Settings" anchor="right" button={
                            <IconButton title="Open Settings">
                                <Settings/>
                            </IconButton>
                        }>
                            <SettingsContent/>
                        </DrawerWithButton>
                    ) : null}
                </Stack>
            </Stack>
        </AppBar>
    );
};
