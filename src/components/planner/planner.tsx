import React, {useRef, useCallback} from "react";
import {Stack, Card} from "@mui/material";
import {Active, DndContext, DragOverEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {useDispatch, batch} from "react-redux";
import {Trash} from "./trash";
import {ProfessionSelect} from "./prof-select";
import {Skillbar} from "./skillbar";
import {Timeline} from "./timeline";
import {SkillIcon} from "../skill";
import {OverData, SkillData} from ".";
import {DragId, DragType, createDragId, isa, useDragging, setDragging} from "../../store/drag";
import {deleteRowSkill, insertRowSkill, insertRowWithStates, moveRowSkill} from "../../store/timeline";
import {useSkillStates, takeSkillItem, createSkillState} from "../../store/build";
import {useKeyPressed} from "../../hooks/general";
import {LoadParams} from "../../hooks/load";

const SKILLBAR_ID = createDragId(DragType.Skillbar);

const TRASH_ID = createDragId(DragType.Trash);

const ADD_ID = createDragId(DragType.Add);

export interface PlannerProps {
    load?: LoadParams;
}

export const Planner = ({load}: PlannerProps): JSX.Element => {
    const dispatch = useDispatch();

    const skills = useSkillStates();
    const dragging = useDragging();

    const parent = useRef<DragId>(null);
    const fromSkillbar = useRef(false);
    const duplicated = useRef(false);
    const pressed = useKeyPressed(["Shift", "Control"]);

    const cancelDrag = useCallback((active: Active) => {
        if (isa(DragType.Row, parent.current) && (fromSkillbar.current || duplicated.current)) {
            dispatch(deleteRowSkill({
                rowId: parent.current,
                skillId: active.id
            }));
        }
    }, [dispatch]);

    const onDragStart = useCallback(({active}: DragStartEvent) => {
        const activeData = (active.data.current ?? {}) as SkillData;

        parent.current = null;
        fromSkillbar.current = isa(DragType.Skillbar, activeData.parentId);

        // handle row skill duplication
        duplicated.current = !fromSkillbar.current && pressed;
        if (duplicated.current) {
            dispatch(insertRowSkill({
                rowId: activeData.parentId,
                index: activeData.index,
                skill: createSkillState(activeData.skill)
            }));
        }

        dispatch(setDragging({dragId: active.id, skill: activeData.skill}));
    }, [dispatch, pressed]);

    const onDragOver = useCallback(({active, over}: DragOverEvent) => {
        if (over) {
            const activeData = (active.data.current ?? {}) as SkillData;
            const overData = (over.data.current ?? {}) as OverData;

            if (isa(DragType.Row, overData.parentId)) {
                if (parent.current !== overData.parentId) {
                    if (!parent.current && fromSkillbar.current) {
                        // moved from skillbar to row
                        const skill = skills.flat().find((skill) => skill.dragId === active.id);

                        batch(() => {
                            // refresh skillbar items
                            dispatch(takeSkillItem(active.id));

                            // insert old skill into row
                            dispatch(insertRowSkill({
                                rowId: overData.parentId,
                                index: overData.index,
                                skill
                            }));
                        });
                    } else if (isa(DragType.Row, parent.current)) {
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
            const activeData = (active.data.current ?? {}) as SkillData;
            const overData = (over.data.current ?? {}) as OverData;

            if (isa(DragType.Trash, over.id)) {
                // moved to trash
                if (isa(DragType.Row, parent.current)) {
                    // delete row entry
                    dispatch(deleteRowSkill({
                        rowId: parent.current,
                        skillId: active.id
                    }));
                    return;
                }
            } else if (isa(DragType.Add, over.id)) {
                // dropped over add button
                batch(() => {
                    if (isa(DragType.Row, parent.current)) {
                        // remove skill from row
                        dispatch(deleteRowSkill({
                            rowId: parent.current,
                            skillId: active.id
                        }));
                    } else {
                        // remove skill from skillbar
                        dispatch(takeSkillItem(active.id));
                    }

                    // insert new row with skill
                    dispatch(insertRowWithStates({row: {
                        skills: [{
                            dragId: active.id,
                            skillId: activeData.skill
                        }]
                    }}));
                });
                return;
            } else if (isa(DragType.Row, overData.parentId)) {
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
            <Stack direction="row" maxHeight="100%">
                <Card sx={{
                    justifySelf: "stretch",
                    flex: "none",
                    margin: 1.5,
                    marginRight: 0
                }}>
                    <Stack
                        direction="column"
                        alignItems="stretch"
                        spacing={2}
                        padding={2}
                        height="100%"
                    >
                        <ProfessionSelect sx={{flex: "none"}}/>
                        <Trash dragId={TRASH_ID} sx={{flex: "none"}}/>
                        <Skillbar dragId={SKILLBAR_ID}/>
                    </Stack>
                </Card>
                <Timeline load={load} addDragId={ADD_ID} flex="1" maxHeight="100%"/>
            </Stack>
            <DragOverlay>
                {typeof dragging.skill === "number" ? (
                    <SkillIcon skill={dragging.skill}/>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
