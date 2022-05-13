import React, {forwardRef} from "react";
import {Link as GatsbyLink} from "gatsby";
import {Link as MuiLink, LinkProps as MuiLinkProps} from "@mui/material";

export interface AnchorProps extends Omit<React.ComponentProps<"a">, "href" | "rel"> {
    to: string;
    newTab?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Anchor = ({to, newTab = false, ...props}: AnchorProps, ref: React.Ref<any>): JSX.Element => (
    /^[/.#]/.test(to) ? (
        <GatsbyLink ref={ref} to={to} {...props}/>
    ) : (
        <a
            ref={ref}
            href={to}
            rel="noopener noreferrer"
            target={newTab ? "_blank" : null}
            {...props}
        />
    )
);

export const AnchorWithRef = forwardRef(Anchor);

export type LinkProps = AnchorProps & Omit<MuiLinkProps, "href">;

export const Link = (props: LinkProps): JSX.Element => (
    <MuiLink
        component={AnchorWithRef}
        underline="hover"
        {...props}
    />
);
