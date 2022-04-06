import React, {useRef, useCallback} from "react";
import {Card, Stack} from "@mui/material";
import {Active, DndContext, DragOverEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {useDispatch, batch} from "react-redux";
import {Trash} from "./trash";
import {ProfessionSelect} from "./profselect";
import {Skillbar} from "./skillbar";
import {Timeline} from "./timeline";
import {SkillItem} from "./skill";
import {OverData, SkillData} from ".";
import {Id, IdType, createId, isa, useDragging, setDragging} from "../../store/planner";
import {deleteRowSkill, insertRowSkill, moveRowSkill} from "../../store/timeline";
import {useSkillStates, findSkill, takeSkillItem} from "../../store/build";

const SKILLBAR_ID = createId(IdType.Skillbar);

const TRASH_ID = createId(IdType.Trash);

export const Planner = (): JSX.Element => {
    const dispatch = useDispatch();
    const skills = useSkillStates();
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
                        // moved from skillbar to row
                        const skill = findSkill(skills, active.id);

                        // refresh skillbar items
                        dispatch(takeSkillItem(active.id));

                        // insert old skill into row
                        dispatch(insertRowSkill({
                            rowId: overData.parentId,
                            index: overData.index,
                            skill
                        }));
                    } else if (isa(IdType.Row, parent.current)) {
                        // moved between rows
                        dispatch(moveRowSkill({
                            rowId: parent.current,
                            skillId: active.id,
                            to: {row: overData.parentId, index: overData.index}
                        }));
                    }

                    parent.current = overData.parentId;
                } else if (activeData.index !== overData.index) {
                    // moved within the row
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
                // moved to trash, delete row entry if necessary
                if (isa(IdType.Row, parent.current)) {
                    dispatch(deleteRowSkill({
                        rowId: parent.current,
                        skillId: active.id
                    }));
                    return;
                }
            } else if (isa(IdType.Row, overData.parentId)) {
                // moved to row, everything is done already
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
                <Card sx={{justifySelf: "stretch", flexShrink: 0}}>
                    <Stack direction="column" alignItems="stretch" spacing={2} padding={2}>
                        <ProfessionSelect/>
                        <Trash id={TRASH_ID}/>
                        <Skillbar id={SKILLBAR_ID}/>
                    </Stack>
                </Card>
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
