import React from "react";
import {Stack, Card, CardProps, Chip, Divider} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Droppable} from "react-beautiful-dnd";
import {Skill} from "./skill";
import {useSkills} from "../../store/skillbar";

export const SKILLBAR_ID = "skillbar";

export const TRASH_ID = "trash";

export type SkillBarProps = CardProps;

export const SkillBar = (props: SkillBarProps): JSX.Element => {
    const skills = useSkills();

    return (
        <Card {...props}>
            <Stack direction="column" spacing={1} padding={2}>
                <Droppable droppableId={TRASH_ID}>
                    {({innerRef, droppableProps}, {isDraggingOver}) => (
                        <span ref={innerRef} {...droppableProps}>
                            <Chip
                                variant="outlined"
                                label="Delete"
                                icon={<Delete/>}
                                sx={{opacity: isDraggingOver ? 1 : 0.5}}
                            />
                        </span>
                    )}
                </Droppable>
                <Divider/>
                <Droppable droppableId={SKILLBAR_ID} isDropDisabled={true}>
                    {({innerRef, droppableProps}) => (
                        <span ref={innerRef} {...droppableProps}>
                            <Stack direction="column" spacing={0.5}>
                                {skills.map(({id, skillId: skill}, i) => (
                                    <Skill
                                        key={id}
                                        id={id}
                                        skill={skill}
                                        index={i}
                                        placeholder
                                    />
                                ))}
                            </Stack>
                        </span>
                    )}
                </Droppable>
            </Stack>
        </Card>
    );
};
