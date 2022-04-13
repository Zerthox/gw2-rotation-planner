import React, {useState, useMemo} from "react";
import {css} from "@emotion/css";
import {Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, TextField} from "@mui/material";
import {ImportExport, Close} from "@mui/icons-material";
import {useRows} from "../../store/timeline";

export interface ExportModalProps {
    open: boolean;
    onClose: () => void;
}

export const ExportModal = ({open, onClose}: ExportModalProps): JSX.Element => {
    const rows = useRows();

    // custom json formatting
    const plannerJson = useMemo(() => {
        const json = rows.map(({name, skills}) => {
            let result = "";
            result += "\n  {";
            result += `\n    "name": ${name},`;
            result += `\n    "skills": [${skills.map((skill) => skill.skillId).join(", ")}]`;
            result += "\n  }";
            return result;
        }).join(",");
        return `[${json}\n]`;
    }, [rows]);

    const [json, setJson] = useState(plannerJson);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <ImportExport/>
                    <Typography variant="h5">Import / Export</Typography>
                    <Box flexGrow={1}/>
                    <IconButton onClick={() => onClose()}>
                        <Close/>
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    value={json}
                    onChange={({target}) => setJson(target.value)}
                    multiline
                    fullWidth
                    rows={24}
                    inputProps={{
                        className: css`white-space: nowrap;`
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={() => onClose()}>Cancel</Button>
                <Button color="secondary" onClick={() => setJson(plannerJson)}>Reset</Button>
                <Button color="success" variant="contained" onClick={() => {
                    // TODO: save changes
                    onClose();
                }}><b></b>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
