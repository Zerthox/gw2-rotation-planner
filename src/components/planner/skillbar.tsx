import React, {useState} from "react";
import {Box, Stack, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {DraggableSkill} from "./skill";
import {Id} from "../../store/planner";
import {useWeaponSkills, SkillState, useHealSkills, useUtilitySkills, useEliteSkills, useProfessionSkills} from "../../store/build";

interface SkillSectionProps {
    name: string;
    parentId: Id;
    skills: SkillState[];
}

// TODO: display auto attack in first column?
const SkillSection = ({name, parentId, skills}: SkillSectionProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <Accordion
            disableGutters
            elevation={0}
            TransitionProps={{
                onEnter: () => setVisible(true),
                onExited: () => setVisible(false)
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls={`${name} Skills Panel`}
            >
                {name} Skills
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 3em)",
                    gap: 0.5
                }}>
                    {visible ? skills.map(({id, skillId}, i) => (
                        <DraggableSkill
                            key={id}
                            id={id}
                            parentId={parentId}
                            index={i}
                            skill={skillId}
                        />
                    )) : null}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export interface SkillbarProps {
    id: Id;
}

export const Skillbar = ({id}: SkillbarProps): JSX.Element => {
    const profSkills = useProfessionSkills();
    const weaponSkills = useWeaponSkills();
    const healSkills = useHealSkills();
    const utilSkills = useUtilitySkills();
    const eliteSkills = useEliteSkills();

    return (
        <Stack direction="column">
            <SkillSection
                key="prof"
                name="Profession"
                parentId={id}
                skills={profSkills}
            />
            {weaponSkills.map(([weapon, skills]) => (
                <SkillSection
                    key={weapon}
                    name={weapon}
                    parentId={id}
                    skills={skills}
                />
            ))}
            <SkillSection
                key="heal"
                name="Heal"
                parentId={id}
                skills={healSkills}
            />
            <SkillSection
                key="util"
                name="Utility"
                parentId={id}
                skills={utilSkills}
            />
            <SkillSection
                key="elite"
                name="Elite"
                parentId={id}
                skills={eliteSkills}
            />
        </Stack>
    );
};
