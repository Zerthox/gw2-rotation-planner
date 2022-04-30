import React, {useMemo} from "react";
import {encode as encodeChatcode} from "gw2e-chat-codes";
import {css} from "@emotion/css";
import {Stack} from "@mui/material";
import {Skill, CustomComponent, useSkill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {SkillContextMenu} from "./context-menu";
import {Keybind} from "./keybind";
import {SkillData} from "../planner";
import {DragId, useDragging} from "../../store/drag";
import {CommonSkill, getCustomSkill} from "../../data/custom";
import {SkillSlot} from "../../data";

export interface SkillIconProps {
    skill: number;
    tooltip?: boolean;
    isPlaceholder?: boolean;
}

// FIXME: custom component does not take icon props
const iconStyles = css`font-size: 3em`;

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
                    <CustomComponent
                        type="Skill"
                        data={custom}
                        disableLink
                        disableText
                        disableTooltip={!tooltip}
                        className={iconStyles}
                    />
                    <Keybind slot={custom.slot}/>
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
