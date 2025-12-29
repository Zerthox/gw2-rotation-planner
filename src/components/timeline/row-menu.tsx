import React from "react";
import { ArrowUpward, ArrowDownward, Delete, PlusOne, Clear, Message } from "@mui/icons-material";
import { ContextMenu, ContextMenuProps } from "../general";
import { RowActions } from "./row";

export type RowContextMenuProps = RowActions & ContextMenuProps;

export const RowContextMenu = ({
    isFirst,
    isLast,
    isEmpty,
    onDuplicate,
    onMove,
    onCopy,
    onClear,
    onDelete,
    ...props
}: RowContextMenuProps): JSX.Element => (
    <ContextMenu
        {...props}
        items={[
            {
                key: "duplicate",
                text: "Duplicate Section",
                icon: <PlusOne />,
                action: () => onDuplicate(),
            },
            {
                key: "up",
                text: "Move Up",
                icon: <ArrowUpward />,
                disabled: isFirst,
                action: () => onMove(true),
            },
            {
                key: "down",
                text: "Move Down",
                icon: <ArrowDownward />,
                disabled: isLast,
                action: () => onMove(false),
            },
            {
                key: "copy",
                text: "Copy Chat Message",
                icon: <Message />,
                disabled: isEmpty,
                action: () => onCopy(),
            },
            {
                key: "clear",
                text: "Clear Section",
                icon: <Clear />,
                disabled: isEmpty,
                action: () => onClear(),
            },
            {
                key: "delete",
                text: "Delete Section",
                icon: <Delete />,
                color: "error.main",
                action: () => onDelete(),
            },
        ]}
    />
);
