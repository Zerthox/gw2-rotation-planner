import React from "react";
import { AppBar, Box, Stack, Typography } from "@mui/material";
import { Construction, GitHub, Help, Settings } from "@mui/icons-material";
import { IconButton, DrawerWithButton, AnchorWithRef } from "../general";
import { ToolsMenu } from "../tools";
import { SettingsContent } from "../settings";
import { useSiteMeta } from "../../hooks/site";
import { gw2Logo } from "../../assets/icons";

export interface HeaderProps {
    title?: string;
    children?: React.ReactNode;
    settings?: boolean;
    help?: React.ReactNode;
}

const iconSize = "1.5em";

export const Header = ({ title, children, settings = true, help }: HeaderProps): JSX.Element => {
    const siteMeta = useSiteMeta();

    return (
        <AppBar position="static">
            <Stack direction="row" alignItems="center" spacing={2} padding={2}>
                <Typography variant="h4">
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                            component="img"
                            src={gw2Logo}
                            alt="GW2"
                            sx={{
                                height: iconSize,
                                width: iconSize,
                                background: "currentcolor",
                                borderRadius: "50%",
                            }}
                        />
                        <span>{title}</span>
                    </Stack>
                </Typography>
                {children}
                <Box flexGrow={1} />
                <Stack direction="row" alignItems="center" spacing={2}>
                    {help ? (
                        <DrawerWithButton
                            title="Help"
                            anchor="right"
                            button={
                                <IconButton title="Open Help">
                                    <Help />
                                </IconButton>
                            }
                        >
                            {help}
                        </DrawerWithButton>
                    ) : null}
                    <DrawerWithButton
                        title="Tools"
                        anchor="right"
                        button={
                            <IconButton title="Tools">
                                <Construction />
                            </IconButton>
                        }
                    >
                        <ToolsMenu />
                    </DrawerWithButton>
                    <IconButton
                        component={AnchorWithRef}
                        title="View Source"
                        to={siteMeta.source}
                        newTab
                    >
                        <GitHub />
                    </IconButton>
                    {settings ? (
                        <DrawerWithButton
                            title="User Settings"
                            anchor="right"
                            button={
                                <IconButton title="Open Settings">
                                    <Settings />
                                </IconButton>
                            }
                        >
                            <SettingsContent />
                        </DrawerWithButton>
                    ) : null}
                </Stack>
            </Stack>
        </AppBar>
    );
};
