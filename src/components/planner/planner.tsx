import React, {useRef} from "react";
import {Stack} from "@mui/material";
import {Active, DndContext, DragOverlay} from "@dnd-kit/core";
import {useDispatch, batch} from "react-redux";
import {Sidebar, SKILLBAR_ID} from "./sidebar";
import {Timeline} from "./timeline";
import {SkillItem} from "./skill";
import {DropType, OverData, SkillData} from ".";
import {Id, useDragging, setDragging} from "../../store/planner";
import {deleteRowSkill, insertRowSkill, moveRowSkill} from "../../store/timeline";
import {useSkills, takeSkillbarItem, findSkill} from "../../store/skillbar";

export const Planner = (): JSX.Element => {
    const dispatch = useDispatch();
    const skills = useSkills();
    const dragging = useDragging();
    const parent = useRef<Id>(null);

    const cancelDrag = (active: Active) => {
        if (dragging.fromSkillbar && parent.current?.startsWith("row")) {
            dispatch(deleteRowSkill({
                rowId: parent.current,
                skillId: active.id
            }));
        }
    };

    return (
        <DndContext
            onDragStart={({active}) => {
                const activeData = (active.data.current ?? {}) as SkillData;

                parent.current = null;
                dispatch(setDragging({id: active.id, skill: activeData.skill, fromSkillbar: activeData.fromSkillbar}));
            }}
            onDragOver={({active, over}) => {
                if (over) {
                    const activeData = (active.data.current ?? {}) as SkillData;
                    const overData = (over.data.current ?? {}) as OverData;

                    if (overData.type === DropType.Row || overData.type === DropType.Skill) {
                        if (parent.current !== overData.parentId) {
                            if (parent.current) {
                                if (parent.current === SKILLBAR_ID) {
                                    // move skill from skillbar to row
                                    batch(() => {
                                        const skill = findSkill(skills, active.id);
                                        dispatch(takeSkillbarItem(active.id));
                                        dispatch(insertRowSkill({rowId: overData.parentId, index: overData.index, skill}));
                                    });
                                } else {
                                    // move skill between rows
                                    dispatch(moveRowSkill({
                                        rowId: parent.current,
                                        skillId: active.id,
                                        to: {row: overData.parentId, index: overData.index}
                                    }));
                                }
                            }

                            parent.current = overData.parentId;
                        } else if (parent.current?.startsWith("row") && activeData.index !== overData.index) {
                            // move skill in the row
                            dispatch(moveRowSkill({
                                rowId: parent.current,
                                skillId: active.id,
                                to: {row: parent.current, index: overData.index}
                            }));
                        }
                    }
                }
            }}
            onDragEnd={({active, over}) => {
                dispatch(setDragging(null));

                if (over) {
                    const overData = (over.data.current ?? {}) as OverData;

                    if (overData.type === DropType.Trash) {
                        if (parent.current !== SKILLBAR_ID) {
                            dispatch(deleteRowSkill({
                                rowId: parent.current,
                                skillId: active.id
                            }));
                        }
                    } else if (overData.type === DropType.Row || overData.type === DropType.Skill) {
                        dispatch(moveRowSkill({
                            rowId: parent.current,
                            skillId: active.id,
                            to: {row: overData.parentId, index: overData.index}
                        }));
                    } else {
                        cancelDrag(active);
                    }
                } else {
                    cancelDrag(active);
                }
            }}
            onDragCancel={({active}) => {
                dispatch(setDragging(null));
                cancelDrag(active);
            }}
        >
            <Stack direction="row" spacing={2} flexGrow={1}>
                <Sidebar sx={{justifySelf: "stretch", flexShrink: 0}}/>
                <Timeline flexGrow={1}/>
            </Stack>
            <DragOverlay>
                {typeof dragging.skill === "number" ? (
                    <SkillItem skill={dragging.skill}/>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
