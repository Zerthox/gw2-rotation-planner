import React from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

export interface ConfirmProps {
    open: boolean;
    title: React.ReactNode;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onCancel?(): void;
    onConfirm?(): void;
}

export const Confirm = ({open, title, children, cancelText, confirmText, onCancel, onConfirm}: ConfirmProps): JSX.Element => (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
            <Button color="error" onClick={onCancel}>{cancelText ?? "Cancel"}</Button>
            <Button color="primary" variant="contained" onClick={onConfirm}>{confirmText ?? "Confirm"}</Button>
        </DialogActions>
    </Dialog>
);
