import React, { useRef, useCallback, useState } from "react";
import { css } from "@emotion/css";
import { Active, DndContext, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { SkillIconWithRef } from "../skill";
import { DragId, DragType, isa, OverData, SkillData } from "../../util/drag";
import {
    deleteRowSkill,
    insertRowSkill,
    insertRowWithStates,
    moveRowSkill,
} from "../../store/timeline";
import { takeSkillItem, createSkillState } from "../../store/build";
import { useKeyState } from "../../hooks/general";

export interface DndProps {
    children: React.ReactNode;
}

export const Dnd = ({ children }: DndProps): JSX.Element => {
    const dispatch = useDispatch();

    const [dragging, setDragging] = useState<number>(null);
    const parent = useRef<DragId>(null);
    const fromSkillbar = useRef(false);
    const duplicated = useRef(false);
    const pressed = useKeyState(["Shift", "Control"]);

    const cancelDrag = useCallback(
        (active: Active) => {
            if (isa(DragType.Row, parent.current) && (fromSkillbar.current || duplicated.current)) {
                dispatch(
                    deleteRowSkill({
                        rowId: parent.current,
                        skillId: active.id,
                    }),
                );
            }
        },
        [dispatch],
    );

    const onDragStart = useCallback(
        ({ active }: DragStartEvent) => {
            const activeData = (active.data.current ?? {}) as SkillData;

            parent.current = null;
            fromSkillbar.current = isa(DragType.Skillbar, activeData.parentId);

            // handle row skill duplication
            duplicated.current = !fromSkillbar.current && pressed;
            if (duplicated.current) {
                dispatch(
                    insertRowSkill({
                        rowId: activeData.parentId,
                        index: activeData.index,
                        skill: createSkillState(activeData.skill),
                    }),
                );
            }

            setDragging(activeData.skill);
        },
        [dispatch, pressed],
    );

    const onDragOver = useCallback(
        ({ active, over }: DragOverEvent) => {
            // TODO: save placeholder position and only move skill on drag end?
            if (over) {
                const activeData = (active.data.current ?? {}) as SkillData;
                const overData = (over.data.current ?? {}) as OverData;

                if (isa(DragType.Row, overData.parentId)) {
                    if (parent.current !== overData.parentId) {
                        if (!parent.current && fromSkillbar.current) {
                            // moved from skillbar to row

                            // refresh skillbar items
                            dispatch(takeSkillItem(active.id));

                            // insert old skill into row
                            dispatch(
                                insertRowSkill({
                                    rowId: overData.parentId,
                                    index: overData.index,
                                    skill: {
                                        dragId: active.id,
                                        skillId: activeData.skill,
                                    },
                                }),
                            );
                        } else if (isa(DragType.Row, parent.current)) {
                            // moved between rows
                            dispatch(
                                moveRowSkill({
                                    rowId: parent.current,
                                    skillId: active.id,
                                    to: { row: overData.parentId, index: overData.index },
                                }),
                            );
                        }

                        parent.current = overData.parentId;
                    } else if (activeData.index !== overData.index) {
                        // moved within the row
                        dispatch(
                            moveRowSkill({
                                rowId: parent.current,
                                skillId: active.id,
                                to: { row: parent.current, index: overData.index },
                            }),
                        );
                    }
                }
            }
        },
        [dispatch],
    );

    const onDragEnd = useCallback(
        ({ active, over }) => {
            setDragging(null);

            if (over) {
                const activeData = (active.data.current ?? {}) as SkillData;
                const overData = (over.data.current ?? {}) as OverData;

                if (isa(DragType.Add, over.id)) {
                    // dropped over add button
                    if (isa(DragType.Row, parent.current)) {
                        // remove skill from row
                        dispatch(
                            deleteRowSkill({
                                rowId: parent.current,
                                skillId: active.id,
                            }),
                        );
                    } else {
                        // remove skill from skillbar
                        dispatch(takeSkillItem(active.id));
                    }

                    // insert new row with skill
                    dispatch(
                        insertRowWithStates({
                            row: {
                                skills: [
                                    {
                                        dragId: active.id,
                                        skillId: activeData.skill,
                                    },
                                ],
                            },
                        }),
                    );
                    return;
                } else if (isa(DragType.Row, overData.parentId)) {
                    // moved to row, everything is done already
                    return;
                }
            }

            // fall back to cancelling
            cancelDrag(active);
        },
        [dispatch, cancelDrag],
    );

    const onDragCancel = useCallback(
        ({ active }) => {
            setDragging(null);
            cancelDrag(active);
        },
        [cancelDrag],
    );

    return (
        <DndContext
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
        >
            {children}
            <DragOverlay>
                {typeof dragging === "number" ? (
                    <SkillIconWithRef
                        skill={dragging}
                        className={css`
                            cursor: grabbing;
                        `}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
