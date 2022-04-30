import React, {useMemo} from "react";
import clsx from "clsx";
import {css} from "@emotion/css";
import {Stack} from "@mui/material";
import {Skill, CustomComponent, useSkill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {encode as encodeChatcode} from "gw2e-chat-codes";
import {SkillContextMenu} from "./context-menu";
import {Keybind} from "./keybind";
import {SkillData} from "../planner";
import {DragId, useDragging} from "../../store/drag";
import {CommonSkill, getCustomSkill} from "../../data/custom";
import {SkillSlot} from "../../data";

// TODO: remove this when custom component prop types are fixed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Custom = CustomComponent as React.ComponentType<any>;

export interface SkillIconProps {
    skill: number;
    tooltip?: boolean;
    isPlaceholder?: boolean;
}

const iconStyles = css`font-size: 3em;`;

export const SkillIcon = ({skill, tooltip = false, isPlaceholder = false}: SkillIconProps): JSX.Element => {
    const {data} = useSkill(skill);
    const custom = getCustomSkill(skill);

    return (
        <Stack
            direction="column"
            alignItems="center"
            sx={{opacity: isPlaceholder ? 0.3 : 1}}
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
        getCustomSkill(skill)?.wiki ?? encodeChatcode("skill", skill)
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
