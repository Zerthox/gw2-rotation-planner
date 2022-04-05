import React, {useCallback} from "react";
import {Divider, Stack} from "@mui/material";
import {DraggableSkill} from "./skill";
import {Id, SkillState} from "../../store/planner";

export interface SkillbarProps {
    id: Id;
    weaponSkills: SkillState[];
    slotSkills: SkillState[];
}

export const Skillbar = ({id, weaponSkills, slotSkills}: SkillbarProps): JSX.Element => {
    const mapSkills = useCallback((skills: SkillState[]) => skills.map((skill, i) => (
        <DraggableSkill
            key={skill.id}
            id={skill.id}
            parentId={id}
            index={i}
            skill={skill.skillId}
        />
    )), [id]);

    return (
        <Stack direction="column" alignItems="center" spacing={0.5}>
            {mapSkills(weaponSkills)}
            <Divider/>
            {mapSkills(slotSkills)}
        </Stack>
    );
};
