import React from "react";
import { ThemeProvider, CssBaseline, Theme } from "@mui/material";
import { APILanguageProvider } from "@discretize/gw2-ui-new";

export type APILanguage = React.ComponentProps<typeof APILanguageProvider>["value"];

export interface ProvidersProps {
    lang?: APILanguage;
    theme: Theme;
    children: React.ReactNode;
}

export const Providers = ({ lang = "en", theme, children }: ProvidersProps): JSX.Element => (
    <APILanguageProvider value={lang}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </APILanguageProvider>
);
