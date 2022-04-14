import {createTheme} from "@mui/material";
import {cyan, blueGrey} from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: cyan[800]
        },
        secondary: {
            main: blueGrey[100]
        }
    }
});

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: cyan[800]
        },
        secondary: {
            main: blueGrey[800]
        }
    }
});
