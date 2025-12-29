import React from "react";
import { Stack } from "@mui/material";
import { ArrowUpward, ArrowDownward, Delete, Clear } from "@mui/icons-material";
import { IconButton } from "../general";
import { RowActions } from "./row";

export type RowButtonsProps = Omit<RowActions, "onDuplicate" | "onCopy">;

export const RowButtons = ({
    isFirst,
    isLast,
    isEmpty,
    onMove,
    onClear,
    onDelete,
}: RowButtonsProps): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton title="Clear Section" disabled={isEmpty} onClick={() => onClear()}>
            <Clear />
        </IconButton>
        <Stack direction="column" alignItems="center">
            <IconButton title="Move Up" disabled={isFirst} onClick={() => onMove(true)}>
                <ArrowUpward />
            </IconButton>
            <IconButton title="Move Down" disabled={isLast} onClick={() => onMove(false)}>
                <ArrowDownward />
            </IconButton>
        </Stack>
        <IconButton title="Delete Section" onClick={() => onDelete()}>
            <Delete />
        </IconButton>
    </Stack>
);
