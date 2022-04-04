import React from "react";
import {useDispatch} from "react-redux";
import {AppBar, Box, Stack, Switch, FormControlLabel, Typography, Tooltip} from "@mui/material";
import {DarkMode, GitHub} from "@mui/icons-material";
import {IconButton} from "../general";
import {setDarkMode, useDarkMode} from "../../store/theme";
import {useSiteMeta} from "../../hooks";

export interface HeaderProps {
    title?: string;
}

export const Header = ({title}: HeaderProps): JSX.Element => {
    const dispatch = useDispatch();
    const darkMode = useDarkMode();
    const siteMeta = useSiteMeta();

    return (
        <AppBar position="static">
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                padding={2}
            >
                <Box flexGrow={1}>
                    {title ? (
                        <Typography variant="h4">{title}</Typography>
                    ) : null}
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Tooltip placement="bottom" disableInteractive title="Toggle Theme">
                        <FormControlLabel
                            checked={darkMode}
                            label={
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <DarkMode/>
                                </Box>
                            }
                            labelPlacement="start"
                            control={
                                <Switch onChange={({target}) => dispatch(setDarkMode(target.checked))}/>
                            }
                        />
                    </Tooltip>
                    <IconButton title="View Source" href={siteMeta.source}>
                        <GitHub/>
                    </IconButton>
                </Stack>
            </Stack>
        </AppBar>
    );
};
