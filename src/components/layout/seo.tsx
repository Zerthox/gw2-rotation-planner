import React from "react";
import {Helmet} from "react-helmet";

export type MetaProp = JSX.IntrinsicElements["meta"];

export interface SEOProps {
    title: string;
    description: string;
    author: string;
    lang?: string;
    meta?: MetaProp[];
}

export const SEO = ({title, description, author, lang = "en", meta = []}: SEOProps): JSX.Element => (
    <Helmet
        htmlAttributes={{lang}}
        title={title}
        meta={[
            {name: "description", content: description},
            {property: "og:title", content: title},
            {property: "og:description", content: description},
            {property: "og:type", content: "website"},
            {name: "twitter:card", content: "summary"},
            {name: "twitter:creator", content: author},
            {name: "twitter:title", content: title},
            {name: "twitter:description", content: description},
            ...meta
        ]}
    />
);
