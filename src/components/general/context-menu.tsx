import React, {useCallback, useState} from "react";
import {Menu, MenuItem, MenuItemProps, ListItemText, ListItemIcon} from "@mui/material";
import {SystemCssProperties} from "@mui/system";

export interface ContextMenuItem {
    text: string;
    icon?: React.ReactNode;
    action?: () => void;
    color?: SystemCssProperties["color"];
    itemProps?: MenuItemProps<"a">;
}

export interface ContextMenuProps {
    children: React.ReactNode;
    items?: ContextMenuItem[];
}

export const ContextMenu = ({children, items = []}: ContextMenuProps): JSX.Element => {
    const [contextMenu, setContextMenu] = useState<{top: number; left: number}>(null);

    const onContextMenu = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        setContextMenu(contextMenu === null
            ? {top: event.clientY, left: event.clientX}
            : null
        );
    }, [contextMenu, setContextMenu]);

    const filteredItems = items.filter((props) => props);

    return (
        <span onContextMenu={filteredItems.length > 0 ? onContextMenu : (event) => event.preventDefault()}>
            {children}
            <Menu
                open={contextMenu !== null}
                onClose={() => setContextMenu(null)}
                anchorReference="anchorPosition"
                anchorPosition={contextMenu}
                transitionDuration={100}
            >
                {filteredItems
                    .map(({text, icon, color, action, itemProps = {}}, i) => (
                        <MenuItem
                            key={i}
                            component="a"
                            {...itemProps}
                            onClick={action ? () => {
                                setContextMenu(null);
                                action();
                            } : () => setContextMenu(null)}
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
