import React from "react";
import {OpenInNew, DataObject, DataArray, Fingerprint, PlusOne, Delete} from "@mui/icons-material";
import {ContextMenu} from "../general";
import {copyToClipboard} from "../../util/clipboard";

const wikiUrl = "https://wiki.guildwars2.com";
const apiUrl = "https://api.guildwars2.com";

export interface SkillContextMenuProps {
    skill: number;
    isCommon: boolean;
    searchValue?: string;
    onDuplicate?: () => void;
    onDelete?: () => void;
    children: React.ReactNode;
}

export const SkillContextMenu = ({skill, isCommon, searchValue, children, onDuplicate, onDelete}: SkillContextMenuProps): JSX.Element => (
    <ContextMenu items={[
        onDuplicate ? {
            text: "Duplicate Skill",
            icon: <PlusOne/>,
            action: () => onDuplicate()
        } : null,
        searchValue ? {
            text: "Open Wiki",
            icon: <OpenInNew/>,
            itemProps: {
                // TODO: mimic chat code link used by the game
                href: `${wikiUrl}?title=Special:Search&search=${encodeURIComponent(searchValue)}&go=Go`,
                target: "_blank",
                rel: "noopener noreferrer"
            }
        } : null,
        ...!isCommon ? [
            {
                text: "Open API",
                icon: <DataObject/>,
                itemProps: {
                    href: `${apiUrl}/v2/skills?ids=${skill}&lang=en`,
                    target: "_blank",
                    rel: "noopener noreferrer"
                }
            },
            {
                text: "Copy Skill ID",
                icon: <Fingerprint/>,
                action: () => copyToClipboard(skill.toString())
            },
            typeof searchValue === "string" ? {
                text: "Copy Chatcode",
                icon: <DataArray/>,
                action: () => copyToClipboard(searchValue)
            } : null
        ] : [],
        onDelete ? {
            action: () => onDelete(),
            text: "Delete Skill",
            icon: <Delete/>,
            color: "error.main"
        } : null
    ]}>
        {children}
    </ContextMenu>
);
