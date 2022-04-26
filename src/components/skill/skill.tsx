import React, {useMemo} from "react";
import clsx from "clsx";
import {encode as encodeChatcode} from "gw2e-chat-codes";
import {css} from "@emotion/css";
import {Stack} from "@mui/material";
import {DetailsHeader, Skill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {SkillContextMenu} from "./context-menu";
import {IconWithTooltip} from "./icon";
import {Keybind} from "./keybind";
import {SkillData} from "../planner";
import {DragId, useDragging} from "../../store/drag";
import {useAllSkills} from "../../hooks/data";
import {CommonSkill, polyfillSkills} from "../../data/polyfill";

export interface SkillIconProps {
    skill: number;
    tooltip?: boolean;
    isPlaceholder?: boolean;
}

const iconStyles = css`font-size: 3em`;

export const SkillIcon = ({skill, tooltip = false, isPlaceholder = false}: SkillIconProps): JSX.Element => {
    const allSkills = useAllSkills();
    const skillData = useMemo(() => allSkills.find((entry) => entry.id === skill), [skill, allSkills]);
    const polyfillSkill = useMemo(() => polyfillSkills.find((entry) => entry.id === skill), [skill]);

    const {className, ...iconProps} = polyfillSkill?.iconProps ?? {};

    return (
        <Stack
            direction="column"
            alignItems="center"
            sx={{opacity: isPlaceholder ? 0.3 : 1}}
        >
            {polyfillSkill ? (
                <IconWithTooltip
                    className={clsx(iconStyles, className)}
                    tooltip={
                        <>
                            <DetailsHeader>{polyfillSkill.name}</DetailsHeader>
                            {polyfillSkill.tooltip ?? (
                                <span>This skill is unavailable in the public GW2 API.</span>
                            )}
                        </>
                    }
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

    const searchValue = useMemo(() => (
        polyfillSkills.find((entry) => entry.id === skill)?.wikiSearch ?? encodeChatcode("skill", skill)
    ), [skill]);

    return (
        <SkillContextMenu
            skill={skill}
            isCommon={skill in CommonSkill}
            searchValue={searchValue || null}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
        >
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
        </SkillContextMenu>
    );
};
