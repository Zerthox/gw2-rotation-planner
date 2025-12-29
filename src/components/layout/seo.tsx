import React from "react";
import { useSiteMeta } from "../../hooks/site";

export type MetaProp = JSX.IntrinsicElements["meta"];

export interface SEOProps {
    title?: string;
    description?: string;
    author?: string;
    meta?: MetaProp[];
    children?: React.ReactNode;
}

export const SEO = ({ title, description, author, meta = [], children }: SEOProps): JSX.Element => {
    const siteMeta = useSiteMeta();
    title ??= siteMeta.title;

    return (
        <>
            <title>{title}</title>
            {[
                { name: "description", content: description },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
                { property: "og:type", content: "website" },
                { name: "twitter:card", content: "summary" },
                { name: "twitter:creator", content: author },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: description },
                ...meta,
            ].map((props, i) => (
                <meta key={i} {...props} />
            ))}
            {children}
        </>
    );
};
