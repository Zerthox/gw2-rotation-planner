import React from "react";
import {OpenInNew, DataObject, DataArray, Fingerprint, PlusOne, Delete} from "@mui/icons-material";
import {ContextMenu, ContextMenuProps} from "../general";
import {copyToClipboard} from "../../util/clipboard";

const wikiUrl = "https://wiki.guildwars2.com";
const apiUrl = "https://api.guildwars2.com";

export interface SkillContextMenuProps extends ContextMenuProps {
    skill: number;
    isCommon: boolean;
    searchValue?: string;
    onDuplicate?: () => void;
    onDelete?: () => void;
}

export const SkillContextMenu = ({skill, isCommon, searchValue, onDuplicate, onDelete, ...props}: SkillContextMenuProps): JSX.Element => (
    <ContextMenu {...props} items={[
        onDuplicate ? {
            key: "duplicate",
            text: "Duplicate Skill",
            icon: <PlusOne/>,
            action: () => onDuplicate()
        } : null,
        searchValue ? {
            key: "wiki",
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
                key: "api",
                text: "Open API",
                icon: <DataObject/>,
                itemProps: {
                    href: `${apiUrl}/v2/skills?ids=${skill}&lang=en`,
                    target: "_blank",
                    rel: "noopener noreferrer"
                }
            },
            {
                key: "id",
                text: "Copy Skill ID",
                icon: <Fingerprint/>,
                action: () => copyToClipboard(skill.toString())
            },
            typeof searchValue === "string" ? {
                key: "chatcode",
                text: "Copy Chatcode",
                icon: <DataArray/>,
                action: () => copyToClipboard(searchValue)
            } : null
        ] : [],
        onDelete ? {
            key: "delete",
            action: () => onDelete(),
            text: "Delete Skill",
            icon: <Delete/>,
            color: "error.main"
        } : null
    ]}/>
);
