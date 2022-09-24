import React, {useState} from "react";
import {Stack, Button, TextField, FormGroup, FormControlLabel, Checkbox, Tooltip, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {Cancel} from "@mui/icons-material";
import {IconButton, IconText} from "../general";
import {Row} from "../../store/timeline";
import {anyTangoIcon, iconSize, specializationIcons} from "../../assets/icons";
import {fetchLog, getRotation, Log} from "../../util/log";

export interface LogImportProps {
    onChange(rows: Row[]): void;
}

export const LogImport = ({onChange}: LogImportProps): JSX.Element => {
    const [url, setUrl] = useState("");
    const [phases, setPhases] = useState(true);
    const [fetching, setFetching] = useState(false);

    const [log, setLog] = useState<Log>(null);
    const [player, setPlayer] = useState<string>("");

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {!log ? (
                <>
                    <TextField
                        variant="standard"
                        value={url}
                        placeholder="https://dps.report/abcd-12345678-123456_boss"
                        onChange={({target}) => setUrl(target.value)}
                        sx={{flexGrow: 1}}
                    />
                    <Button
                        variant="contained"
                        disabled={fetching}
                        onClick={async () => {
                            setFetching(true);
                            try {
                                const log = await fetchLog(url);
                                setLog(log);
                                setPlayer(log.recordedBy);
                            } finally {
                                setFetching(false);
                            }
                        }}
                    >Import log</Button>
                </>
            ) : (
                <>
                    <Typography variant="overline">Log:</Typography>
                    <Typography>{log.fightName}</Typography>
                    <FormControl sx={{flexGrow: 1}}>
                        <InputLabel>Player</InputLabel>
                        <Select
                            label="Player"
                            value={player}
                            defaultValue={log.recordedBy}
                            onChange={({target}) => setPlayer(target.value)}
                        >
                            {log.players.map(({name, profession}) => (
                                <MenuItem key={name} value={name}>
                                    <IconText
                                        icon={specializationIcons[profession] ?? anyTangoIcon}
                                        size={iconSize}
                                    >{name}</IconText>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Tooltip title="Use phases from log as sections">
                        <FormGroup>
                            <FormControlLabel
                                label="Phases"
                                control={<Checkbox/>}
                                checked={phases}
                                disabled={!log}
                                onChange={(_, checked) => setPhases(checked)}
                            />
                        </FormGroup>
                    </Tooltip>
                    <Button
                        variant="contained"
                        disabled={!log}
                        onClick={() => onChange(getRotation(log, player, phases))}
                    >Load rotation</Button>
                    <IconButton title="Cancel" onClick={() => {
                        setLog(null);
                    }}><Cancel/></IconButton>
                </>
            )}
        </Stack>
    );
};
