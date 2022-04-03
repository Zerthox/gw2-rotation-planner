import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import {Skill} from "@discretize/gw2-ui-new";
import {SkillData} from ".";
import {Id, useDragging} from "../../store/planner";

export interface SkillItemProps {
    skill: number;
    isPlaceholder?: boolean;
}

export const SkillItem = ({skill, isPlaceholder = false}: SkillItemProps): JSX.Element => (
    <Skill
        id={skill}
        disableLink
        disableText
        disableTooltip
        style={{
            fontSize: "3em",
            lineHeight: 1,
            opacity: isPlaceholder ? 0.3 : 1
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
            <SkillItem skill={skill} isPlaceholder={id === dragging.id}/>
        </span>
    );
};
