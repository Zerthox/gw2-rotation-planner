import React, {useState} from "react";
import {Container, Stack, Card, TextField, FormHelperText, InputAdornment, Typography} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {Layout, SEO} from "../../components/layout";
import {IconButton} from "../../components/general";
import {effectiveDuration, minimizeDuration, nextHigherDuration} from "../../util/condi-duration";

const title = "Condi Duration Calculator";

const formatMs = (ms: number) => `${new Intl.NumberFormat("fr").format(ms)}ms`;

const ConditionCalculator = (): JSX.Element => {
    const [duration, setDuration] = useState(0);
    const durationValid = duration >= 0 && duration <= 100;

    const [base, setBase] = useState(1000);
    const baseValid = base > 0;

    const valid = durationValid && baseValid;

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <TextField
                type="number"
                label="Duration"
                value={duration}
                error={!durationValid}
                onChange={({target}) => setDuration(Number.parseFloat(target.value))}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    inputProps: {min: 0, max: 100, step: 0.1}
                }}
                sx={{width: 120}}
            />
            <TextField
                type="number"
                label="Base"
                value={base / 1000}
                error={!baseValid}
                onChange={({target}) => setBase(Number.parseFloat(target.value) * 1000)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">s</InputAdornment>,
                    inputProps: {min: 0, step: 1}
                }}
                sx={{width: 120}}
            />
            {valid ? (
                <>
                    <Stack direction="column" spacing={0.5}>
                        <Typography>Effective duration: {formatMs(effectiveDuration(base, duration))}</Typography>
                        <Typography>Minimized Condition Duration: {minimizeDuration(base, duration).toFixed(2)}%</Typography>
                        <Typography>Next higher Condition Duration: {nextHigherDuration(base, duration)?.toFixed(2) ?? "-"}%</Typography>
                    </Stack>
                </>
            ) : (
                <Typography color="error">Invalid parameters.</Typography>
            )}
        </Stack>
    );
};

const CondiDurationCalculator = (): JSX.Element => {
    const [rows, setRows] = useState(1);

    return (
        <Layout title={title}>
            <Container sx={{marginY: 2}}>
                <Card sx={{padding: 2}}>
                    <Stack direction="column" spacing={2}>
                        <FormHelperText>Insert Condition Duration attribute from Hero Panel and base durations of all applied Conditions.</FormHelperText>
                        {Array(rows).fill(0).map((_, i) => <ConditionCalculator key={i}/>)}
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" title="Add Row" onClick={() => setRows(rows + 1)}><Add/></IconButton>
                            <IconButton size="small" title="Remove Row" onClick={() => setRows(Math.max(1, rows - 1))}><Remove/></IconButton>
                        </Stack>
                    </Stack>
                </Card>
            </Container>
        </Layout>
    );
};

export default CondiDurationCalculator;

export const Head = (): JSX.Element => <SEO title={title}/>;
