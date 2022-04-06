import React, {useCallback} from "react";
import {Stack, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {DraggableSkill} from "./skill";
import {Id} from "../../store/planner";
import {useAllWeaponSkills, SkillState} from "../../store/build";

export interface SkillbarProps {
    id: Id;
}

export const Skillbar = ({id}: SkillbarProps): JSX.Element => {
    const weaponSkills = useAllWeaponSkills();

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
        <Stack direction="column">
            {weaponSkills.map(([weapon, skills]) => (
                <Accordion key={weapon} disableGutters elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls={`${weapon} Skills Panel`}
                    >
                        {weapon} Skills
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="column" alignItems="center" spacing={0.5}>
                            {mapSkills(skills)}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    );
};
