import React, {useState} from "react";
import {Box, Stack, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {DraggableSkill} from "./skill";
import {DragId} from "../../store/planner";
import {SkillState, useSkillSections, useSkillStates} from "../../store/build";

interface SkillSectionProps {
    name: string;
    parentId: DragId;
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
            sx={{flex: "none"}}
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
                    {visible ? skills.map(({dragId: id, skillId}, i) => (
                        <DraggableSkill
                            key={id}
                            dragId={id}
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
    dragId: DragId;
}

export const Skillbar = ({dragId}: SkillbarProps): JSX.Element => {
    const sections = useSkillSections();
    const states = useSkillStates();

    return (
        <Stack direction="column" sx={{overflowY: "auto"}}>
            {sections.map(({name, skills}, i) => skills.length > 0 ? (
                <SkillSection
                    key={name}
                    name={name}
                    parentId={dragId}
                    skills={states[i]}
                />
            ) : null)}
        </Stack>
    );
};
