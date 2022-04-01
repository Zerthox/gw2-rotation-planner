import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import {ThemeProvider, CssBaseline} from "@mui/material";
import {APILanguageProvider} from "@discretize/gw2-ui-new";
import {SEO} from "./seo";
import {Content} from "./content";
import {Store} from "../../store";
import {useSiteMeta} from "../../hooks";
import {DarkTheme, LightTheme} from "./theme";
import {useDarkMode} from "../../store/theme";

const LANG = "en";

export interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers = ({children}: ProvidersProps): JSX.Element => {
    const darkMode = useDarkMode();

    return (
        <APILanguageProvider value={LANG}>
            <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
                {children}
            </ThemeProvider>
        </APILanguageProvider>
    );
};

export interface LayoutProps {
    title?: string;
    children: React.ReactNode;
}

export const Layout = ({title, children}: LayoutProps): JSX.Element => {
    const siteMeta = useSiteMeta();
    const pageTitle = title ?? siteMeta.title;

    return (
        <ReduxProvider store={Store}>
            <SEO
                title={pageTitle}
                description={siteMeta.description}
                author={siteMeta.author}
            />
            <Providers>
                <CssBaseline/>
                <Content title={pageTitle}>{children}</Content>
            </Providers>
        </ReduxProvider>
    );
};
