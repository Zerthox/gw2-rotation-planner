import React, {useMemo} from "react";
import {useLocation} from "@reach/router";
import {Box, Stack, Dialog, DialogTitle, DialogContent, Typography, TextField, IconButton} from "@mui/material";
import {Share, Close, ContentCopy} from "@mui/icons-material";
import {CooldownButton} from "../general";
import {useStatelessRows} from "../../store/timeline";
import {encodeShare} from "../../util/encode";
import {copyToClipboard} from "../../util/clipboard";

export interface ShareModalProps {
    open: boolean;
    onClose: () => void;
}

export const ShareModal = ({open, onClose}: ShareModalProps): JSX.Element => {
    const {origin, pathname} = useLocation();
    const rows = useStatelessRows();

    const url = useMemo(() => (
        `${origin}${pathname}?share=${encodeShare(rows)}`
    ), [origin, pathname, rows]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Share/>
                    <Typography variant="h5">Share</Typography>
                    <Box flexGrow={1}/>
                    <IconButton onClick={() => onClose()}>
                        <Close/>
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <TextField
                        inputRef={(ref) => ref?.select()}
                        value={url}
                        fullWidth
                    />
                    <CooldownButton
                        color="secondary"
                        startIcon={<ContentCopy/>}
                        onClick={() => copyToClipboard(url)}
                        cooldown={3000}
                        cooldownProps={{
                            children: "Copied!"
                        }}
                    >Copy</CooldownButton>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
