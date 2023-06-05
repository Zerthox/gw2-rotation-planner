import React, {useState} from "react";
import {Container, Stack, Card, TextField, InputAdornment, Typography} from "@mui/material";
import {Layout, SEO} from "../../components/layout";

const title = "Proc Calculator";

const toTicks = (time: number, tickrate: number): number => Math.ceil(time / tickrate) * tickrate;

const ProcCalculator = (): JSX.Element => {
    const [phase, setPhase] = useState(20);
    const [interval, setInterval] = useState(2);
    const [duration, setDuration] = useState(12);
    const [tickrate, setTickrate] = useState(1);

    const phaseValid = phase > 0;
    const intervalValid = interval > 0;
    const durationValid = duration >= 0;
    const tickrateValid = tickrate >= 0;
    const valid = phaseValid && intervalValid && durationValid && tickrateValid;

    const singleDuration = tickrate > 0 ? toTicks(duration, tickrate) : duration;
    let totalProcs = 0;
    let totalDuration = 0;
    if (valid) {
        for (let time = 0; time < phase; time += interval) {
            if (duration > 0) {
                const effectiveDuration = Math.min(phase - time, duration);
                const tickTime = tickrate > 0 ? toTicks(effectiveDuration, tickrate) : effectiveDuration;
                totalProcs += tickTime / singleDuration;
                totalDuration += tickTime;
            } else {
                totalProcs += 1;
            }
        }
    }

    return (
        <Layout title={title}>
            <Container sx={{marginY: 2}}>
                <Card sx={{padding: 2}}>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            type="number"
                            label="Phase Duration"
                            helperText="Time frame of combat to calculate procs for."
                            value={phase}
                            onChange={({target}) => setPhase(Number.parseFloat(target.value))}
                            error={!phaseValid}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                inputProps: {min: 0, step: 0.1}
                            }}
                        />
                        <TextField
                            type="number"
                            label="Proc Interval"
                            helperText="Interval or cooldown at which the proc happens."
                            value={interval}
                            onChange={({target}) => setInterval(Number.parseFloat(target.value))}
                            error={!intervalValid}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                inputProps: {min: 0, step: 0.1}
                            }}
                        />
                        <TextField
                            type="number"
                            label="Proc Duration"
                            helperText="Duration for a proc to take full effect. For example duration of inflicted Conditions. A duration of 0 indicates instant full effect."
                            value={duration}
                            onChange={({target}) => setDuration(Number.parseFloat(target.value))}
                            error={!durationValid}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                inputProps: {min: 0, step: 0.1}
                            }}
                        />
                        <TextField
                            type="number"
                            label="Proc Tickrate"
                            helperText="Interval between proc ticks. For example 1s for Conditions. A tickrate of 0 indicates infinitely small tickrate."
                            value={tickrate}
                            onChange={({target}) => setTickrate(Number.parseFloat(target.value))}
                            error={!tickrateValid}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">s</InputAdornment>,
                                inputProps: {min: 0, step: 0.1}
                            }}
                        />
                        {valid ? (
                            <>
                                <Typography>Single Proc Duration: {singleDuration.toFixed(3)}s</Typography>
                                <Typography>Effective Procs: {totalProcs.toFixed(3)}</Typography>
                                <Typography>Total Duration: {totalDuration.toFixed(3)}s</Typography>
                            </>
                        ) : (
                            <Typography color="error">Invalid parameters.</Typography>
                        )}
                    </Stack>
                </Card>
            </Container>
        </Layout>
    );
};

export default ProcCalculator;

export const Head = (): JSX.Element => <SEO title={title}/>;
