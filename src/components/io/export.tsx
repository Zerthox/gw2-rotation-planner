import React, {useState, useMemo} from "react";
import {Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, TextField} from "@mui/material";
import {ImportExport, Close, Save} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {createSkillState} from "../../store/build";
import {useRows, overrideRows} from "../../store/timeline";
import {validate, RowSchema} from "./validate";

// custom json formatting
const toJson = (rows: RowSchema[]): string => {
    const json = rows.map(({name, skills}) => {
        let result = "";
        result += "\n  {";
        result += `\n    "name": ${JSON.stringify(name)},`;
        result += `\n    "skills": [${skills.join(", ")}]`;
        result += "\n  }";
        return result;
    }).join(",");
    return `[${json}\n]`;
};

export interface ExportModalProps {
    open: boolean;
    onClose: () => void;
}

export const ExportModal = ({open, onClose}: ExportModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const storeRows = useRows();

    const initialRows = useMemo<RowSchema[]>(() => storeRows.map(({name, skills}) => ({
        name,
        skills: skills.map((skill) => skill.skillId)
    })), [storeRows]);
    const initialJson = useMemo(() => toJson(initialRows), [initialRows]);

    const [{json, rows}, setContent] = useState(() => ({json: initialJson, rows: initialRows}));

    // TODO: validation logic as hook?
    const updateJson = (json: string) => {
        try {
            const data = JSON.parse(json);
            if (validate(data)) {
                setContent({json, rows: data});
            } else {
                setContent({json, rows: null});
            }
        } catch {
            setContent({json, rows: null});
        }
    };
    const isError = rows === null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            TransitionProps={{
                onEnter: () => setContent({json: initialJson, rows: initialRows})
            }}
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
                        style: {
                            whiteSpace: "nowrap",
                            fontFamily: "monospace"
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={() => {
                    onClose();
                    updateJson(toJson(initialRows));
                }}>Cancel</Button>
                <Button color="secondary" onClick={() => updateJson(toJson(initialRows))}>Reset</Button>
                <Button
                    color="success"
                    variant="contained"
                    startIcon={<Save/>}
                    disabled={isError}
                    onClick={() => {
                        const newRows = rows.map(({name, skills}) => ({
                            name,
                            skills: skills.map((id) => createSkillState(id))
                        }));
                        dispatch(overrideRows(newRows));
                        onClose();
                    }}
                >Save</Button>
            </DialogActions>
        </Dialog>
    );
};
