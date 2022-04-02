import React from "react";
import {Stack} from "@mui/material";
import {useDroppable} from "@dnd-kit/core";
import {DraggableSkill} from "./skill";
import {DropType, SkillbarData} from ".";
import {Id} from "../../store/planner";
import {useSkills} from "../../store/skillbar";

export interface SkillbarProps {
    id: Id;
}

export const Skillbar = ({id}: SkillbarProps): JSX.Element => {
    const skills = useSkills();
    const {setNodeRef} = useDroppable({
        id,
        data: {type: DropType.Skillbar} as SkillbarData
    });

    return (
        <span ref={setNodeRef}>
            <Stack direction="column" alignItems="center" spacing={0.5}>
                {skills.map((skill, i) => (
                    <DraggableSkill
                        key={skill.id}
                        id={skill.id}
                        parentId={id}
                        index={i}
                        skill={skill.skillId}
                        fromSkillbar
                    />
                ))}
            </Stack>
        </span>
    );
};
