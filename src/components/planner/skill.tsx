import React from "react";
import {Box, Card, CardProps} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import {Id} from "../../store/planner";

export interface SkillDisplayProps extends CardProps {
    skill: number;
    isPlaceholder?: boolean;
}

export const SkillDisplay = ({skill, isPlaceholder = false, ...props}: SkillDisplayProps): JSX.Element => (
    <Card
        elevation={3}
        sx={{
            opacity: isPlaceholder ? 0.5 : 1,
            transform: isPlaceholder ? "none !important" : null
        }}
        {...props}
    >
        <Box padding={1}>
            Skill #{skill}
        </Box>
    </Card>
);

export interface SkillProps {
    id: Id;
    index: number;
    skill: number;
    placeholder?: boolean;
}

export const Skill = ({id, index, skill, placeholder = false}: SkillProps): JSX.Element => (
    <Draggable draggableId={id} index={index}>
        {({innerRef, draggableProps, dragHandleProps}, {isDragging}) => (
            <span>
                <span
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    style={{
                        ...draggableProps.style,
                        transform: isDragging ? draggableProps.style?.transform : "translate(0, 0)"
                    }}
                >
                    <SkillDisplay skill={skill}/>
                </span>
                {placeholder && isDragging ? (
                    <SkillDisplay skill={skill} isPlaceholder/>
                ) : null}
            </span>
        )}
    </Draggable>
);
