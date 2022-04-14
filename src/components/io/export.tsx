import React, {useState, useMemo} from "react";
import {css} from "@emotion/css";
import {Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, TextField} from "@mui/material";
import {ImportExport, Close} from "@mui/icons-material";
import {useRows} from "../../store/timeline";
import {validate, RowData} from "./validate";

export interface ExportModalProps {
    open: boolean;
    onClose: () => void;
}

export const ExportModal = ({open, onClose}: ExportModalProps): JSX.Element => {
    const storeRows = useRows();
    const initialRows = useMemo<RowData[]>(() => (
        storeRows.map(({name, skills}) => ({name, skills: skills.map((skill) => skill.skillId)}))
    ), [storeRows]);

    // custom json formatting
    const initialJson = useMemo(() => {
        const json = initialRows.map(({name, skills}) => {
            let result = "";
            result += "\n  {";
            result += `\n    "name": ${JSON.stringify(name)},`;
            result += `\n    "skills": [${skills.join(", ")}]`;
            result += "\n  }";
            return result;
        }).join(",");
        return `[${json}\n]`;
    }, [initialRows]);

    const [rows, setRows] = useState(initialRows);
    const [json, setJson] = useState(initialJson);

    // TODO: validation logic as hook?
    const updateJson = (json: string) => {
        setJson(json);
        try {
            const data = JSON.parse(json);
            if (validate(data)) {
                setRows(data);
            } else {
                setRows(null);
            }
        } catch {
            setRows(null);
        }
    };
    const isError = rows === null;

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
                    error={isError}
                    helperText={isError ? "Invalid JSON" : " "}
                    onChange={({target}) => updateJson(target.value)}
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
                <Button color="secondary" onClick={() => updateJson(initialJson)}>Reset</Button>
                <Button
                    color="success"
                    variant="contained"
                    disabled={isError}
                    onClick={() => {
                        // TODO: save changes
                        onClose();
                    }}
                >Save</Button>
            </DialogActions>
        </Dialog>
    );
};
