import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Preview, Schedule, QueryStats, Whatshot } from "@mui/icons-material";
import { AnchorWithRef } from "../general";
import { useDevMode } from "../../store/settings";

interface ToolEntry {
    title: string;
    description?: string;
    path: string;
    icon: typeof Schedule;
    dev?: boolean;
}

const tools: ToolEntry[] = [
    {
        title: "Rotation Planner",
        description: "Plan & share rotations",
        path: "/",
        icon: Schedule,
    },
    {
        title: "Condition Duration Calculator",
        path: "/tools/condi-duration",
        icon: Whatshot,
    },
    {
        title: "Proc Calculator",
        path: "/tools/procs",
        icon: QueryStats,
    },
    {
        title: "Skill Viewer",
        path: "/tools/skill-viewer",
        icon: Preview,
        dev: true,
    },
];

export const ToolsMenu = (): JSX.Element => {
    const isDev = useDevMode();

    return (
        <List>
            {tools
                .filter(({ dev = false }) => !dev || isDev)
                .map(({ title, description, path, icon: Icon }, i) => (
                    <ListItem disablePadding key={i}>
                        <ListItemButton component={AnchorWithRef} to={path}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={title} secondary={description} />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    );
};
