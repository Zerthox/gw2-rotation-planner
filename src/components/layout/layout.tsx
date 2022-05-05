import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {SEO} from "./seo";
import {Loading} from "./loading";
import {Loaded, LoadedProps} from "./loaded";
import {Store, Persistor} from "../../store";
import {useSiteMeta} from "../../hooks/site";

import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "../../assets/fonts";
import "./global.css";

export type LayoutProps = LoadedProps;

export const Layout = ({title, ...props}: LayoutProps): JSX.Element => {
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
                <Loaded title={pageTitle} {...props}/>
            </PersistGate>
        </ReduxProvider>
    );
};
