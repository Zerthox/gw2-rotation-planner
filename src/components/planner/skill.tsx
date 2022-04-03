import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {Skill} from "@discretize/gw2-ui-new";
import {css} from "@emotion/css";
import {SkillData} from ".";
import {Id, useDragging} from "../../store/planner";

export interface SkillItemProps {
    skill: number;
    tooltip?: boolean;
    isPlaceholder?: boolean;
}

const iconStyles = (isPlaceholder: boolean) => css`
    font-size: 3em;
    opacity: ${isPlaceholder ? 0.3 : 1}
`;

export const SkillItem = ({skill, tooltip = false, isPlaceholder = false}: SkillItemProps): JSX.Element => (
    <Skill
        id={skill}
        disableLink
        disableText
        disableTooltip={!tooltip}
        iconProps={{
            className: iconStyles(isPlaceholder)
        }}
    />
);

export interface DraggableSkillProps {
    id: Id;
    parentId: Id;
    index: number;
    skill: number;
}

export const DraggableSkill = ({parentId, id, index, skill}: DraggableSkillProps): JSX.Element => {
    const {attributes, listeners, setNodeRef} = useSortable({
        id,
        data: {
            parentId,
            index,
            skill
        } as SkillData
    });
    const dragging = useDragging();

    return (
        <span
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <SkillItem skill={skill} tooltip={!dragging.id} isPlaceholder={id === dragging.id}/>
        </span>
    );
};
