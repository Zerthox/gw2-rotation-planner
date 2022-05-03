import React, {useCallback, useState} from "react";
import {Menu, MenuItem, MenuItemProps, ListItemText, ListItemIcon, Typography} from "@mui/material";
import {SystemCssProperties} from "@mui/system";

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

export interface ContextMenuProps extends Omit<React.ComponentProps<"span">, "title"> {
    title?: React.ReactNode;
    children: React.ReactNode;
    items?: ContextMenuItem[];
}

export const ContextMenu = ({title, children, items = [], ...props}: ContextMenuProps): JSX.Element => {
    const [contextMenu, setContextMenu] = useState<{top: number; left: number}>(null);

    const onContextMenu = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu(contextMenu === null
            ? {top: event.clientY, left: event.clientX}
            : null
        );
    }, [contextMenu, setContextMenu]);

    const filteredItems = items.filter((props) => props);

    return (
        <span {...props} onContextMenu={filteredItems.length > 0 ? onContextMenu : (event) => event.preventDefault()}>
            {children}
            <Menu
                open={contextMenu !== null}
                onClose={() => setContextMenu(null)}
                anchorReference="anchorPosition"
                anchorPosition={contextMenu}
                transitionDuration={100}
            >
                {title ? (
                    <MenuItem disabled sx={{
                        paddingX: 2,
                        paddingY: 0
                    }}>
                        <Typography variant="overline">{title}</Typography>
                    </MenuItem>
                ) : null}
                {filteredItems
                    .map(({key, text, icon, disabled, close = true, color, action, itemProps = {}}, i) => (
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
                                    {icon ? <ListItemIcon sx={{color}}>{icon}</ListItemIcon> : null}
                                    <ListItemText sx={{color}}>{text}</ListItemText>
                                </>
                            )}
                        </MenuItem>
                    ))
                }
            </Menu>
        </span>
    );
};
