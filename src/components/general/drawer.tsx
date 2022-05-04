import React, {useState, useCallback, useMemo, cloneElement} from "react";
import {Box, Stack, Drawer as MuiDrawer, DrawerProps as MuiDrawerProps, Typography, IconButton, Divider} from "@mui/material";
import {Close} from "@mui/icons-material";

export interface DrawerProps extends Omit<MuiDrawerProps, "title"> {
    title: React.ReactNode;
    children: React.ReactNode;
}

export const Drawer = ({open, onClose, title, children, PaperProps, ...props}: DrawerProps): JSX.Element => (
    <MuiDrawer
        {...props}
        open={open}
        onClose={onClose}
        PaperProps={{
            ...PaperProps,
            sx: {
                maxWidth: {
                    sm: 400,
                    md: 500,
                    lg: 600,
                    xl: 750
                },
                ...PaperProps?.sx
            }
        }}
    >
        <Stack direction="column">
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                paddingY={2}
                paddingX={3}
            >
                <Typography variant="h5">{title}</Typography>
                <Box flexGrow={1}/>
                <IconButton onClick={() => onClose({}, "escapeKeyDown")}>
                    <Close/>
                </IconButton>
            </Stack>
            <Divider/>
            <Box padding={3}>
                {children}
            </Box>
        </Stack>
    </MuiDrawer>
);

export interface DrawerWithButtonProps extends Omit<DrawerProps, "open" | "onClose"> {
    button: React.ReactElement<{onClick: React.MouseEventHandler<unknown>}>;
    startOpen?: boolean;
}

export const DrawerWithButton = ({button, startOpen = false, ...props}: DrawerWithButtonProps): JSX.Element => {
    const [open, setOpen] = useState(startOpen);
    const onClose = useCallback(() => setOpen(false), []);

    const cloned = useMemo(() => cloneElement(button, {
        onClick: button.props.onClick ? (event: React.MouseEvent<unknown>) => {
            button.props.onClick(event);
            setOpen(true);
        } : () => setOpen(true)
    }), [button]);

    return (
        <>
            {cloned}
            <Drawer open={open} onClose={onClose} {...props}/>
        </>
    );
};
