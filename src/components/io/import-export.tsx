import React, {useState, useMemo} from "react";
import {
    Box,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    IconButton,
    TextField
} from "@mui/material";
import {ImportExport, Close, Save, ContentCopy} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {Confirm, CooldownButton, Link} from "../general";
import {LogImport} from "./log-import";
import {useStatelessRows, overrideRows, Row} from "../../store/timeline";
import {validate} from "../../util/validate";
import {copyToClipboard} from "../../util/clipboard";

// custom json formatting
const toJson = (rows: Row[]): string => {
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

export interface ExportModalContentProps {
    onClose(confirmed: boolean): void;
    onChange?(modified: boolean): void;
}

export const ExportModalContent = ({onClose, onChange}: ExportModalContentProps): JSX.Element => {
    const dispatch = useDispatch();
    const initialRows = useStatelessRows();
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
        } finally {
            onChange?.(true);
        }
    };
    const isError = rows === null;

    return (
        <>
            <DialogTitle>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <ImportExport/>
                    <Typography variant="h5">Import / Export</Typography>
                    <Box flexGrow={1}/>
                    <IconButton onClick={() => onClose(false)}>
                        <Close/>
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" marginBottom={1}>
                    Import a rotation from a log uploaded to <Link newTab to="https://dps.report">dps.report</Link> or <Link newTab to="https://gw2wingman.nevermindcreations.de">Wingman</Link>, or edit it in the JSON format below.
                </Typography>
                <Stack direction="column" spacing={1}>
                    <LogImport onChange={(rows) => updateJson(toJson(rows))}/>
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
                                fontFamily: "Source Code Pro, monospace"
                            }
                        }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{paddingX: 1.5}}>
                <CooldownButton
                    color="secondary"
                    startIcon={<ContentCopy/>}
                    onClick={() => copyToClipboard(json)}
                    sx={{marginRight: "auto"}}
                    cooldown={3000}
                    cooldownProps={{
                        children: "Copied!"
                    }}
                >Copy</CooldownButton>
                <Button color="error" onClick={() => {
                    onClose(true);
                    updateJson(toJson(initialRows));
                }}>Cancel</Button>
                <Button color="secondary" onClick={() => {
                    updateJson(toJson(initialRows));
                    onChange(false);
                }}>Reset</Button>
                <Button
                    color="success"
                    variant="contained"
                    startIcon={<Save/>}
                    disabled={isError}
                    onClick={() => {
                        dispatch(overrideRows(rows));
                        onClose(true);
                    }}
                >Save</Button>
            </DialogActions>
        </>
    );
};

export interface ExportModalProps {
    open: boolean;
    onClose: () => void;
}

export const ExportModal = ({open, onClose}: ExportModalProps): JSX.Element => {
    const [modified, setModified] = useState(false);
    const [warn, setWarn] = useState(false);

    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    if (modified) {
                        setWarn(true);
                    } else {
                        onClose();
                    }
                }}
                maxWidth="md"
                fullWidth
                keepMounted={false}
            >
                <ExportModalContent
                    onClose={(confirmed) => {
                        if (!confirmed && modified) {
                            setWarn(true);
                        } else {
                            onClose();
                        }
                    }}
                    onChange={setModified}
                />
            </Dialog>
            <Confirm
                title="Unsaved rotation changes"
                open={warn}
                onConfirm={() => {
                    setWarn(false);
                    onClose();
                }}
                onCancel={() => setWarn(false)}
            >Do you wish to discard your changes?</Confirm>
        </>
    );
};
