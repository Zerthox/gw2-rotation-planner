import React, {useMemo} from "react";
import clsx from "clsx";
import {encode as encodeChatcode} from "gw2e-chat-codes";
import {css} from "@emotion/css";
import {Stack, ListItemIcon, ListItemText} from "@mui/material";
import {OpenInNew, DataObject, Fingerprint, PlusOne, Delete} from "@mui/icons-material";
import {DetailsHeader, Skill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {ContextMenu} from "../general";
import {IconWithTooltip} from "./icon";
import {Keybind} from "./keybind";
import {SkillData} from "../planner";
import {DragId, useDragging} from "../../store/drag";
import {useAllSkills} from "../../hooks/data";
import {CommonSkill, commonSkills} from "../../data";

const wikiUrl = "https://wiki.guildwars2.com";
const apiUrl = "https://api.guildwars2.com";

export interface SkillIconProps {
    skill: number;
    tooltip?: boolean;
    isPlaceholder?: boolean;
}

const iconStyles = css`font-size: 3em`;

export const SkillIcon = ({skill, tooltip = false, isPlaceholder = false}: SkillIconProps): JSX.Element => {
    const allSkills = useAllSkills();
    const skillData = useMemo(() => allSkills.find((entry) => entry.id === skill), [skill, allSkills]);
    const commonSkill = useMemo(() => commonSkills.find((entry) => entry.id === skill), [skill]);

    const {className, ...iconProps} = commonSkill?.iconProps ?? {};

    return (
        <Stack
            direction="column"
            alignItems="center"
            sx={{opacity: isPlaceholder ? 0.3 : 1}}
        >
            {commonSkill ? (
                <IconWithTooltip
                    className={clsx(iconStyles, className)}
                    tooltip={<DetailsHeader>{commonSkill.name}</DetailsHeader>}
                    disableTooltip={!tooltip}
                    {...iconProps}
                />
            ) : (
                <Skill
                    id={skill}
                    disableLink
                    disableText
                    disableTooltip={!tooltip}
                    iconProps={{
                        className: iconStyles
                    }}
                />
            )}
            <Keybind slot={skillData?.slot}/>
        </Stack>
    );
};

export interface DraggableSkillProps {
    dragId: DragId;
    parentId: DragId;
    index: number;
    skill: number;
    onDuplicate?: () => void;
    onDelete?: () => void;
}

export const DraggableSkill = ({parentId, dragId, index, skill, onDuplicate, onDelete}: DraggableSkillProps): JSX.Element => {
    const {attributes, listeners, setNodeRef} = useSortable({
        id: dragId,
        data: {
            parentId,
            index,
            skill
        } as SkillData
    });
    const dragging = useDragging();

    const isCommon = skill in CommonSkill;
    const searchValue = useMemo(() => (
        isCommon
            ? commonSkills.find((entry) => entry.id === skill).wikiSearch
            : encodeChatcode("skill", skill)
    ), [skill, isCommon]);

    return (
        <ContextMenu items={[
            onDuplicate ? {
                onClick: () => onDuplicate(),
                children: (
                    <>
                        <ListItemIcon><PlusOne/></ListItemIcon>
                        <ListItemText>Duplicate</ListItemText>
                    </>
                )
            } : null,
            searchValue ? {
                // TODO: mimic chat code link used by the game
                href: `${wikiUrl}?title=Special:Search&search=${encodeURIComponent(searchValue)}&go=Go`,
                target: "_blank",
                rel: "noopener noreferrer",
                children: (
                    <>
                        <ListItemIcon><OpenInNew/></ListItemIcon>
                        <ListItemText>Open Wiki</ListItemText>
                    </>
                )
            } : null,
            ...!isCommon ? [
                {
                    href: `${apiUrl}/v2/skills?ids=${skill}&lang=en`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: (
                        <>
                            <ListItemIcon><DataObject/></ListItemIcon>
                            <ListItemText>Open API</ListItemText>
                        </>
                    )
                },
                {
                    onClick: () => navigator.clipboard.writeText(skill.toString()),
                    children: (
                        <>
                            <ListItemIcon><Fingerprint/></ListItemIcon>
                            <ListItemText>Copy Skill ID</ListItemText>
                        </>
                    )
                }
            ] : [],
            onDelete ? {
                onClick: () => onDelete(),
                children: (
                    <>
                        <ListItemIcon sx={{color: "error.main"}}>
                            <Delete/>
                        </ListItemIcon>
                        <ListItemText sx={{color: "error.main"}}>
                            Delete
                        </ListItemText>
                    </>
                )
            } : null
        ]}>
            <span
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            >
                <SkillIcon
                    skill={skill}
                    tooltip={dragging.dragId === null}
                    isPlaceholder={dragId === dragging.dragId}
                />
            </span>
        </ContextMenu>
    );
};
