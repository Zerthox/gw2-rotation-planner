import React from "react";
import clsx from "clsx";
import {css} from "@emotion/css";
import {Stack} from "@mui/material";
import {Skill, CustomComponent, useSkill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {SkillContextMenu} from "./context-menu";
import {Keybind} from "./keybind";
import {DragId, SkillData} from "../../util/drag";
import {CommonSkill, getCustomSkill, getSearchValue} from "../../data/custom";
import {SkillSlot} from "../../data";

const dragCursor = css`cursor: grab;`;

const iconStyles = css`font-size: 3em;`;

export interface SkillWithKeybindProps {
    skill: number;
    tooltip?: boolean;
}

export const SkillWithKeybind = ({skill, tooltip = false}: SkillWithKeybindProps): JSX.Element => {
    const {data} = useSkill(skill);

    return (
        <>
            <Skill
                id={skill}
                disableLink
                disableText
                disableTooltip={!tooltip}
                iconProps={{
                    className: iconStyles
                }}
            />
            <Keybind slot={data ? data.slot as SkillSlot : null}/>
        </>
    );
};

// TODO: remove this when custom component prop types are fixed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Custom = CustomComponent as React.ComponentType<any>;

export interface SkillIconProps {
    skill: number;
    tooltip?: boolean;
    className?: string;
}

export const SkillIcon = ({skill, tooltip = false, className}: SkillIconProps): JSX.Element => {
    const custom = getCustomSkill(skill);

    return (
        <Stack
            direction="column"
            alignItems="center"
            className={className}
        >
            {custom ? (
                <>
                    <Custom
                        type="Skill"
                        data={custom}
                        disableLink
                        disableText
                        disableTooltip={!tooltip}
                        iconProps={{
                            ...custom.iconProps,
                            className: clsx(iconStyles, custom.iconProps?.className)
                        }}
                    />
                    <Keybind slot={custom.slot as SkillSlot}/>
                </>
            ) : (
                <SkillWithKeybind
                    skill={skill}
                    tooltip={tooltip}
                />
            )}
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

const placeholderStyles = css`opacity: .3`;

export const DraggableSkill = ({parentId, dragId, index, skill, onDuplicate, onDelete}: DraggableSkillProps): JSX.Element => {
    const {attributes, listeners, setNodeRef, isDragging} = useSortable({
        id: dragId,
        data: {
            parentId,
            index,
            skill
        } as SkillData
    });

    const searchValue = getSearchValue(skill);

    return (
        <SkillContextMenu
            skill={skill}
            isCommon={skill in CommonSkill}
            searchValue={searchValue}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
        >
            <span
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={dragCursor}
            >
                <SkillIcon
                    skill={skill}
                    tooltip={!isDragging}
                    className={isDragging ? placeholderStyles : null}
                />
            </span>
        </SkillContextMenu>
    );
};
