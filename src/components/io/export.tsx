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
    TextField,
    FormGroup,
    FormControlLabel,
    Switch,
    Tooltip
} from "@mui/material";
import {ImportExport, Close, Save, ContentCopy} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {CooldownButton, Link} from "../general";
import {useStatelessRows, overrideRows, Row} from "../../store/timeline";
import {validate} from "../../util/validate";
import {copyToClipboard} from "../../util/clipboard";
import {fetchLog, getRotation} from "../../util/log";

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
    onClose: () => void;
}

export const ExportModalContent = ({onClose}: ExportModalContentProps): JSX.Element => {
    const dispatch = useDispatch();
    const initialRows = useStatelessRows();
    const initialJson = useMemo(() => toJson(initialRows), [initialRows]);

    const [{json, rows}, setContent] = useState(() => ({json: initialJson, rows: initialRows}));
    const [url, setUrl] = useState("");
    const [phases, setPhases] = useState(true);
    const [fetching, setFetching] = useState(false);

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
        <>
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
                <Typography variant="body1">
                    Import a rotation from a log uploaded to <Link newTab to="https://dps.report">dps.report</Link> or edit it in the JSON format below.
                </Typography>
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" alignItems="center">
                        <TextField
                            variant="standard"
                            value={url}
                            placeholder="https://dps.report/abcd-12345678-123456_boss"
                            onChange={({target}) => setUrl(target.value)}
                            sx={{flexGrow: 1}}
                        />
                        <Tooltip title="Use phases from log as sections">
                            <FormGroup>
                                <FormControlLabel
                                    label="Phases"
                                    control={<Switch/>}
                                    checked={phases}
                                    onChange={(_, checked) => setPhases(checked)}
                                />
                            </FormGroup>
                        </Tooltip>
                        <Button
                            variant="contained"
                            disabled={fetching}
                            onClick={async () => {
                                setFetching(true);
                                const log = await fetchLog(url);
                                // TODO: allow to select player
                                updateJson(toJson(getRotation(log, log.recordedBy, phases)));
                                setFetching(false);
                            }}
                        >Import log</Button>
                    </Stack>
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
                        dispatch(overrideRows(rows));
                        onClose();
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

export const ExportModal = ({open, onClose}: ExportModalProps): JSX.Element => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        keepMounted={false}
    >
        <ExportModalContent onClose={onClose}/>
    </Dialog>
);
