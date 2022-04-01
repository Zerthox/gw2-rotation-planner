import React from "react";
import {useDispatch} from "react-redux";
import {AppBar, Box, Switch, Typography, Stack} from "@mui/material";
import {DarkMode} from "@mui/icons-material";
import {setDarkMode, useDarkMode} from "../../store/theme";

export interface HeaderProps {
    title?: string;
}

export const Header = ({title}: HeaderProps): JSX.Element => {
    const dispatch = useDispatch();
    const darkMode = useDarkMode();

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
                >
                    <DarkMode/>
                    <Switch
                        checked={darkMode}
                        onChange={({target}) => dispatch(setDarkMode(target.checked))}
                    />
                </Stack>
            </Stack>
        </AppBar>
    );
};
