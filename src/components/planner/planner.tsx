import React, {useRef, useCallback} from "react";
import {Stack} from "@mui/material";
import {Active, DndContext, DragOverEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {useDispatch, batch} from "react-redux";
import {Sidebar} from "./sidebar";
import {Timeline} from "./timeline";
import {SkillItem} from "./skill";
import {OverData, SkillData} from ".";
import {Id, IdType, isa, useDragging, setDragging} from "../../store/planner";
import {deleteRowSkill, insertRowSkill, moveRowSkill} from "../../store/timeline";
import {useSkills, takeSkillbarItem, findSkill} from "../../store/skillbar";

export const Planner = (): JSX.Element => {
    const dispatch = useDispatch();
    const skills = useSkills();
    const dragging = useDragging();
    const parent = useRef<Id>(null);
    const fromSkillbar = useRef(false);

    const cancelDrag = useCallback((active: Active) => {
        if (fromSkillbar.current && isa(IdType.Row, parent.current)) {
            dispatch(deleteRowSkill({
                rowId: parent.current,
                skillId: active.id
            }));
        }
    }, [dispatch, fromSkillbar]);

    const onDragStart = useCallback(({active}: DragStartEvent) => {
        const activeData = (active.data.current ?? {}) as SkillData;

        parent.current = null;
        fromSkillbar.current = isa(IdType.Skillbar, activeData.parentId);
        dispatch(setDragging({id: active.id, skill: activeData.skill}));
    }, [dispatch]);

    const onDragOver = useCallback(({active, over}: DragOverEvent) => {
        if (over) {
            const activeData = (active.data.current ?? {}) as SkillData;
            const overData = (over.data.current ?? {}) as OverData;

            if (isa(IdType.Row, overData.parentId)) {
                if (parent.current !== overData.parentId) {
                    if (!parent.current && fromSkillbar.current) {
                        // move skill from skillbar to row
                        batch(() => {
                            const skill = findSkill(skills, active.id);
                            dispatch(takeSkillbarItem(active.id));
                            dispatch(insertRowSkill({rowId: overData.parentId, index: overData.index, skill}));
                        });
                    } else if (isa(IdType.Row, parent.current)) {
                        // move skill between rows
                        dispatch(moveRowSkill({
                            rowId: parent.current,
                            skillId: active.id,
                            to: {row: overData.parentId, index: overData.index}
                        }));
                    }

                    parent.current = overData.parentId;
                } else if (activeData.index !== overData.index) {
                    // move skill within the row
                    dispatch(moveRowSkill({
                        rowId: parent.current,
                        skillId: active.id,
                        to: {row: parent.current, index: overData.index}
                    }));
                }
            }
        }
    }, [dispatch, skills]);

    const onDragEnd = useCallback(({active, over}) => {
        dispatch(setDragging(null));

        if (over) {
            const overData = (over.data.current ?? {}) as OverData;

            if (isa(IdType.Trash, over.id)) {
                // delete row entry if necessary
                if (isa(IdType.Row, parent.current)) {
                    dispatch(deleteRowSkill({
                        rowId: parent.current,
                        skillId: active.id
                    }));
                    return;
                }
            } else if (isa(IdType.Row, overData.parentId)) {
                // everything is done already
                return;
            }
        }

        // fallback to cancelling
        cancelDrag(active);
    }, [dispatch, cancelDrag]);

    const onDragCancel = useCallback(({active}) => {
        batch(() => {
            dispatch(setDragging(null));
            cancelDrag(active);
        });
    }, [dispatch, cancelDrag]);

    return (
        <DndContext
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
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
