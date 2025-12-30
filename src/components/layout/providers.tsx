import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { APILanguageProvider } from "@discretize/gw2-ui-new";
import { Accent, defaultAccent, getTheme } from "../../theme";

export type APILanguage = React.ComponentProps<typeof APILanguageProvider>["value"];

export interface ProvidersProps {
    lang?: APILanguage;
    theme?: Accent;
    children: React.ReactNode;
}

export const Providers = ({
    lang = "en",
    theme: accent = defaultAccent,
    children,
}: ProvidersProps): JSX.Element => {
    const theme = getTheme(accent);

    return (
        <APILanguageProvider value={lang}>
            <ThemeProvider theme={theme} defaultMode="dark">
                <CssBaseline />
                {children}
            </ThemeProvider>
        </APILanguageProvider>
    );
};
