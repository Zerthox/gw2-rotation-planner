import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {SEO} from "./seo";
import {Loading} from "./loading";
import {Content} from "./content";
import {Store, Persistor} from "../../store";
import {useSiteMeta} from "../../hooks/site";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/source-code-pro";
import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "./global.css";

export interface LayoutProps {
    title?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
}

export const Layout = ({title, children, header}: LayoutProps): JSX.Element => {
    const siteMeta = useSiteMeta();
    const pageTitle = title ?? siteMeta.title;

    return (
        <ReduxProvider store={Store}>
            <SEO
                title={pageTitle}
                description={siteMeta.description}
                author={siteMeta.author}
            />
            <PersistGate persistor={Persistor} loading={<Loading/>}>
                <Content title={pageTitle} header={header}>{children}</Content>
            </PersistGate>
        </ReduxProvider>
    );
};
