import React from "react";
import {Stack} from "@mui/material";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {SkillBar, SKILLBAR_ID, TRASH_ID} from "./skillbar";
import {Timeline} from "./timeline";
import {deleteSkill, insertSkill, moveSkill} from "../../store/timeline";
import {useSkills} from "../../store/skillbar";

export const Planner = (): JSX.Element => {
    const dispatch = useDispatch();
    const skills = useSkills();

    return (
        <DragDropContext onDragEnd={({source, destination: dest}) => {
            console.log(source, dest);

            if (!dest) return;

            if (dest.droppableId === TRASH_ID) {
                if (source.droppableId === SKILLBAR_ID) return;

                dispatch(deleteSkill({
                    rowId: source.droppableId,
                    index: source.index
                }));
            } else if (source.droppableId === SKILLBAR_ID) {
                const {skillId} = skills[source.index];
                dispatch(insertSkill({
                    rowId: dest.droppableId,
                    index: dest.index,
                    skillId
                }));
            } else {
                dispatch(moveSkill({
                    from: {row: source.droppableId, index: source.index},
                    to: {row: dest.droppableId, index: dest.index}
                }));
            }
        }}>
            <Stack direction="row" spacing={2} flexGrow={1}>
                <SkillBar sx={{justifySelf: "stretch"}}/>
                <Timeline flexGrow={1}/>
            </Stack>
        </DragDropContext>
    );
};
