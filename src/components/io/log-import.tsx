import React, { useEffect, useReducer, useState } from "react";
import {
    Stack,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { IconButton, IconText } from "../general";
import { Row } from "../../store/timeline";
import { useUpdatingRef } from "../../hooks/general";
import { anyTangoIcon, iconSize, specializationIcons } from "../../assets/icons";
import { fetchLog, getRotation, Log, SplitMode } from "../../util/log";

export interface LogImportProps {
    onChange(rows: Row[]): void;
}

interface LogImportState {
    log: Log;
    player: string;
    split: SplitMode;
}

export const LogImport = ({ onChange }: LogImportProps): JSX.Element => {
    const changeRef = useUpdatingRef(onChange);
    const [url, setUrl] = useState("");
    const [fetching, setFetching] = useState(false);

    const [{ log, player, split }, setState] = useReducer(
        (prev: LogImportState, action: Partial<LogImportState>) => ({ ...prev, ...action }),
        { log: null, player: "", split: SplitMode.Phases },
    );

    useEffect(() => {
        if (log) {
            console.log(log);
            changeRef.current(getRotation(log, player, split));
        }
    }, [log, player, split, changeRef]);

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {!log ? (
                <>
                    <TextField
                        variant="standard"
                        value={url}
                        placeholder="https://dps.report/abcd-12345678-123456_boss"
                        onChange={({ target }) => setUrl(target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        disabled={fetching}
                        startIcon={
                            fetching ? <CircularProgress color="inherit" size="1em" /> : null
                        }
                        onClick={async () => {
                            setFetching(true);
                            try {
                                const log = await fetchLog(url);
                                const povPresent = log.players.some(
                                    (player) => player.name === log.recordedBy,
                                );
                                const player = povPresent ? log.recordedBy : log.players[0].name;
                                setState({ log: log, player });
                            } finally {
                                setFetching(false);
                            }
                        }}
                    >
                        {fetching ? "Loading" : "Import log"}
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="overline">Log:</Typography>
                    <Typography>{log.fightName}</Typography>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <InputLabel>Player</InputLabel>
                        <Select
                            label="Player"
                            value={player}
                            defaultValue={log.recordedBy}
                            onChange={({ target }) => setState({ player: target.value })}
                        >
                            {log.players.map(({ name, profession }) => (
                                <MenuItem key={name} value={name}>
                                    <IconText
                                        icon={specializationIcons[profession] ?? anyTangoIcon}
                                        size={iconSize}
                                    >
                                        {name}
                                    </IconText>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Split</InputLabel>
                        <Select
                            label="Split"
                            value={split}
                            onChange={({ target }) => setState({ split: target.value })}
                        >
                            <MenuItem value={SplitMode.None}>None</MenuItem>
                            <MenuItem value={SplitMode.Phases}>Log Phases</MenuItem>
                            <MenuItem value={SplitMode.Swaps}>Weapon Swaps</MenuItem>
                            <MenuItem value={SplitMode.Loops}>Smart Loop</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton title="Cancel" onClick={() => setState({ log: null })}>
                        <Cancel />
                    </IconButton>
                </>
            )}
        </Stack>
    );
};
