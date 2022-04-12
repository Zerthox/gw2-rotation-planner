import React, {useCallback, useState} from "react";
import {Menu, MenuItem, MenuItemProps} from "@mui/material";

export interface ContextMenuProps {
    children: React.ReactNode;
    items?: MenuItemProps<"a">[];
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

    return (
        <span onContextMenu={onContextMenu}>
            {children}
            <Menu
                open={contextMenu !== null}
                onClose={() => setContextMenu(null)}
                anchorReference="anchorPosition"
                anchorPosition={contextMenu}
            >
                {items.map(({onClick, ...props}, i) => (
                    <MenuItem
                        key={i}
                        component="a"
                        onClick={onClick ? (event) => {
                            setContextMenu(null);
                            onClick(event);
                        } : () => setContextMenu(null)}
                        {...props}
                    />
                ))}
            </Menu>
        </span>
    );
};
