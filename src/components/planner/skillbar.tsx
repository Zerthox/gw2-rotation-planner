import React from "react";
import {Stack} from "@mui/material";
import {DraggableSkill} from "./skill";
import {Id} from "../../store/planner";
import {useSkills} from "../../store/skillbar";

export interface SkillbarProps {
    id: Id;
}

export const Skillbar = ({id}: SkillbarProps): JSX.Element => {
    const skills = useSkills();

    return (
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
    );
};
