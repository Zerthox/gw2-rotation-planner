import React, {useState} from "react";
import {Box, Stack, SxProps, Accordion, AccordionSummary, AccordionDetails, StackProps, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {DraggableSkill} from "../skill";
import {DragId} from "../../util/drag";
import {SkillState, useSkillSections, useSkillStates, useSkillsView, View} from "../../store/build";
import {useInitSections} from "../../hooks/load";
import {SkillSectionType} from "../../data";

export interface SkillSectionProps {
    name: string;
    type: SkillSectionType;
    parentId: DragId;
    skills: SkillState[];
    sx?: SxProps;
}

const SkillSection = ({name, type, parentId, skills, sx}: SkillSectionProps): JSX.Element => {
    const view = useSkillsView();
    const [visible, setVisible] = useState(false);

    const isOrdered = view === View.CatalogOrdered && (type === SkillSectionType.Weapon || type === SkillSectionType.Bundle);

    return (
        <Accordion
            disableGutters
            elevation={0}
            slotProps={{
                transition: {
                    onEnter: () => setVisible(true),
                    onExited: () => setVisible(false)
                }
            }}
            sx={sx}
        >
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls={`${name} Skills Panel`}
            >
                <Typography component="span">{name} Skills</Typography>
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
                            orderSelf={isOrdered}
                        />
                    )) : null}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const SkillSectionMemo = React.memo(SkillSection);

export interface SkillbarProps extends StackProps {
    dragId: DragId;
}

export const SkillCatalog = ({dragId, ...props}: SkillbarProps): JSX.Element => {
    const sections = useSkillSections();
    const states = useSkillStates();

    useInitSections();

    return (
        <Stack direction="column" sx={{overflowY: "auto"}} {...props}>
            {sections.map(({name, type, skills}, i) => skills.length > 0 ? (
                <SkillSectionMemo
                    key={name}
                    name={name}
                    type={type}
                    parentId={dragId}
                    skills={states[i]}
                    sx={{flex: "none"}}
                />
            ) : null)}
        </Stack>
    );
};
