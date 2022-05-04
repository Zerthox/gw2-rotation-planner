import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {SEO} from "./seo";
import {Loading} from "./loading";
import {Loaded} from "./loaded";
import {Store, Persistor} from "../../store";
import {useSiteMeta} from "../../hooks/site";

import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "../../assets/fonts";
import "./global.css";

export interface LayoutProps {
    title?: string;
    children: React.ReactNode;
    header?: React.ReactNode;
    settings?: boolean;
    help?: React.ReactNode;
}

export const Layout = ({title, children, header, settings, help}: LayoutProps): JSX.Element => {
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
                <Loaded title={pageTitle} header={header} settings={settings} help={help}>{children}</Loaded>
            </PersistGate>
        </ReduxProvider>
    );
};
