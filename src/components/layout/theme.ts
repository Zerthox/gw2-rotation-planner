import {createTheme} from "@mui/material";
import {blueGrey, cyan} from "@mui/material/colors";

const palette = {
    primary: {
        main: cyan[800]
    },
    secondary: {
        main: blueGrey[700]
    }
};

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        ...palette
    }
});

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        ...palette
    }
});
