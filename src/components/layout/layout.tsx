import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {SEO} from "./seo";
import {Loading} from "./loading";
import {Content} from "./content";
import {Store, Persistor} from "../../store";
import {useSiteMeta} from "../../hooks";

import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "./global.css";

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
            <PersistGate persistor={Persistor} loading={<Loading/>}>
                <Content title={pageTitle}>{children}</Content>
            </PersistGate>
        </ReduxProvider>
    );
};
