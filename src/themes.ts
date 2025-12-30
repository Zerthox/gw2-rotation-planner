import { createTheme } from "@mui/material";
import { cyan, blueGrey } from "@mui/material/colors";

export const enum Theme {
    Dark = "dark",
    Light = "light",
}

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: cyan[800],
        },
        secondary: {
            main: blueGrey[100],
        },
    },
    cssVariables: true,
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: cyan[800],
        },
        secondary: {
            main: blueGrey[800],
        },
    },
    cssVariables: true,
});

export const themes = {
    [Theme.Dark]: darkTheme,
    [Theme.Light]: lightTheme,
};

export const isDark = (theme: Theme): boolean =>
    ({
        [Theme.Dark]: true,
        [Theme.Light]: false,
    })[theme];
