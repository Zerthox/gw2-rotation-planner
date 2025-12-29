import React, { useState, useMemo, cloneElement } from "react";
import {
    Menu,
    MenuItem,
    MenuItemProps,
    ListItemText,
    ListItemIcon,
    Typography,
} from "@mui/material";
import { SystemCssProperties } from "@mui/system";

export interface ContextMenuItem {
    key?: React.Key;
    text: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    close?: boolean;
    color?: SystemCssProperties["color"];
    action?: () => void;
    itemProps?: MenuItemProps<"a">;
}

export interface ContextMenuProps {
    title?: React.ReactNode;
    children: React.ReactElement<{ onContextMenu: (event: React.MouseEvent<unknown>) => void }>;
    items?: ContextMenuItem[];
}

export const ContextMenu = ({ title, children, items = [] }: ContextMenuProps): JSX.Element => {
    const [contextMenu, setContextMenu] = useState<{ top: number; left: number }>(null);

    const filteredItems = items.filter((props) => props);
    const cloned = useMemo(
        () =>
            cloneElement(children, {
                onContextMenu: (event: React.MouseEvent) => {
                    event.preventDefault();
                    if (filteredItems.length > 0) {
                        event.stopPropagation();
                        setContextMenu(
                            contextMenu === null
                                ? { top: event.clientY, left: event.clientX }
                                : null,
                        );
                    }
                },
            }),
        [children, contextMenu, setContextMenu, filteredItems.length],
    );

    return (
        <>
            {cloned}
            <Menu
                open={contextMenu !== null}
                onClose={() => setContextMenu(null)}
                anchorReference="anchorPosition"
                anchorPosition={contextMenu}
                transitionDuration={100}
            >
                {title ? (
                    <MenuItem
                        disabled
                        sx={{
                            paddingX: 2,
                            paddingY: 0,
                        }}
                    >
                        <Typography variant="overline">{title}</Typography>
                    </MenuItem>
                ) : null}
                {filteredItems.map(
                    (
                        { key, text, icon, disabled, close = true, color, action, itemProps = {} },
                        i,
                    ) => (
                        <MenuItem
                            {...itemProps}
                            key={key ?? i}
                            component="a"
                            disabled={disabled}
                            onClick={() => {
                                if (action) {
                                    action();
                                }
                                if (close) {
                                    setContextMenu(null);
                                }
                            }}
                        >
                            {itemProps.children ?? (
                                <>
                                    {icon ? (
                                        <ListItemIcon sx={{ color }}>{icon}</ListItemIcon>
                                    ) : null}
                                    <ListItemText sx={{ color }}>{text}</ListItemText>
                                </>
                            )}
                        </MenuItem>
                    ),
                )}
            </Menu>
        </>
    );
};
