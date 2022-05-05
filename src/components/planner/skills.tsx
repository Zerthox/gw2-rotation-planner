import React, {useState} from "react";
import {Box, Stack, SxProps, Accordion, AccordionSummary, AccordionDetails, StackProps} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {DraggableSkill} from "../skill";
import {DragId} from "../../util/drag";
import {SkillState, useSkillSections, useSkillStates} from "../../store/build";
import {useInitSections} from "../../hooks/load";

export interface SkillSectionProps {
    name: string;
    parentId: DragId;
    skills: SkillState[];
    sx?: SxProps;
}

export const SkillSection = ({name, parentId, skills, sx}: SkillSectionProps): JSX.Element => {
    const [visible, setVisible] = useState(false);

    return (
        <Accordion
            disableGutters
            elevation={0}
            TransitionProps={{
                onEnter: () => setVisible(true),
                onExited: () => setVisible(false)
            }}
            sx={sx}
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
                    gridAutoFlow: "row dense",
                    gap: 0.5
                }}>
                    {visible ? skills.map(({dragId, skillId}, i) => (
                        <DraggableSkill
                            key={dragId}
                            dragId={dragId}
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

export interface SkillbarProps extends StackProps {
    dragId: DragId;
}

export const SkillCatalog = ({dragId, ...props}: SkillbarProps): JSX.Element => {
    const sections = useSkillSections();
    const states = useSkillStates();

    useInitSections();

    return (
        <Stack direction="column" sx={{overflowY: "auto"}} {...props}>
            {sections.map(({name, skills}, i) => skills.length > 0 ? (
                <SkillSection
                    key={name}
                    name={name}
                    parentId={dragId}
                    skills={states[i]}
                    sx={{flex: "none"}}
                />
            ) : null)}
        </Stack>
    );
};
