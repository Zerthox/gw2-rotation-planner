import React from "react";
import {useLocation} from "@reach/router";
import {Typography} from "@mui/material";
import {Link} from "../general";

export interface ButtonLabelProps {
    children: React.ReactNode;
}

export const ButtonLabel = ({children}: ButtonLabelProps): JSX.Element => (
    <Typography variant="button" lineHeight="inherit">
        {children}
    </Typography>
);

export interface MonospaceProps {
    children: React.ReactNode;
    block?: boolean;
}

export const Monospace = ({children, block = false}: MonospaceProps): JSX.Element => (
    <Typography component={block ? "div" : "span"} fontFamily="Source Code Pro, monospace">
        {children}
    </Typography>
);

export const HelpContent = (): JSX.Element => {
    const {origin, pathname} = useLocation();
    const path = origin + pathname;

    return (
        <>
            <Typography variant="body1" marginY={1}>
                This is a web app to plan and share skill rotations for <Link newTab to="https://guildwars2.com">Guild Wars 2</Link>.
            </Typography>
            <Typography variant="h6" marginTop={2}>Using the planner</Typography>
            <Typography variant="body1" marginY={1}>
                Select your desired Profession on the left.
                All skills will be listed below organized within categories.
                Drag a skill from there to a rotation section or over the <ButtonLabel>Add Section</ButtonLabel> button.
                You can find additional useful functionality in context menus, which can be brought up by right clicking a skill or rotation section.
                Holding <Monospace block>Shift</Monospace> or <Monospace>Control</Monospace> while grabbing a skill to drag it somewhere duplicates it automatically.
            </Typography>
            <Typography variant="h6" marginTop={2}>Sharing rotations</Typography>
            <Typography variant="body1" marginY={1}>
                Rotations can be shared in a variety of different ways.
                The simplest way to share is to click on the <ButtonLabel>Share</ButtonLabel> button and copy the generated share link.
                Alternatively rotations can be exported and imported in a <Link newTab to="https://developer.mozilla.org/en-US/docs/Glossary/JSON">JSON</Link> format
                via the <ButtonLabel>IMPORT / EXPORT</ButtonLabel> button.
                The JSON format can also be loaded from a <Link newTab to="https://gist.github.com/">GitHub Gist</Link> or an URL to a JSON file.
            </Typography>
            <Typography variant="h6" marginTop={2}>Link formats <Typography variant="caption">(for tech-savy people)</Typography></Typography>
            <Typography variant="body1" marginY={1}>
                The share link format consists of section names encoded to be URI friendly
                and skill IDs encoded in <Link newTab to="https://developer.mozilla.org/en-US/docs/Glossary/Base64">Base64</Link> as 24 bit unsigned integers.
                Ingame chat links also only use 24 bits for skill IDs.
            </Typography>
            <Typography variant="body1" marginY={1}>
                Loading Gists requires the Gist ID, which can be found in the URL of a Gist.
                You can specify an optional filename in order to load a specific file in a Gist consisting of multiple JSON files.
                The filename is given without the <Monospace>.json</Monospace> file extension,
                When no filename is specified, the first JSON file found will be loaded.
                <Monospace block>{path}?gist=abcdefg</Monospace>
                <Monospace block>{path}?gist=abcdefg&amp;file=myfile</Monospace>
            </Typography>
            <Typography variant="body1" marginY={1}>
                Loading a JSON file from an URL simply requires the full URL.
                <Monospace block>{path}?url=https://somepage.com/path/to/myfile.json</Monospace>
            </Typography>
        </>
    );
};
