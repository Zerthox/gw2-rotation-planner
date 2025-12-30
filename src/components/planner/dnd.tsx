import React, { useCallback, useState } from "react";
import {
    DndContext,
    DragCancelEvent,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { SkillIconWithRef } from "../skill";
import { DragType, DragData, SkillData } from "../../util/drag";
import {
    deleteRowSkill,
    insertRowSkill,
    insertRowWithStates,
    moveRowSkill,
} from "../../store/timeline";
import { takeSkillItem, createSkillState } from "../../store/build";
import { useKeyState } from "../../hooks/general";

interface Dragged {
    skill: number;
    duplicate: boolean;
}

export interface DndProps {
    children: React.ReactNode;
}

export const Dnd = ({ children }: DndProps): JSX.Element => {
    const dispatch = useDispatch();

    const [dragged, setDragged] = useState<Dragged>(null);
    const pressed = useKeyState(["Shift", "Control"]);

    const reset = useCallback(() => setDragged(null), [setDragged]);

    const onDragStart = useCallback(
        ({ active }: DragStartEvent) => {
            const activeData = (active.data.current ?? {}) as SkillData;
            setDragged({
                skill: activeData.skill,
                duplicate: activeData.parentType !== DragType.Skillbar && pressed,
            });
        },
        [pressed],
    );

    const onDragEnd = useCallback(
        ({ active, over }: DragEndEvent) => {
            if (over) {
                const activeData = (active.data.current ?? {}) as SkillData;
                const overData = (over.data.current ?? {}) as DragData;

                // handle duplications
                if (activeData.parentType === DragType.Skillbar) {
                    dispatch(takeSkillItem(active.id));
                } else if (dragged?.duplicate) {
                    dispatch(
                        insertRowSkill({
                            rowId: activeData.parentId,
                            index: activeData.index,
                            skill: createSkillState(activeData.skill),
                        }),
                    );
                }

                switch (overData.parentType ?? overData.type) {
                    case DragType.Add: {
                        // remove from old row if needed & insert with new row
                        if (activeData.parentType === DragType.Row) {
                            dispatch(
                                deleteRowSkill({
                                    rowId: activeData.parentId,
                                    skillId: active.id,
                                }),
                            );
                        }

                        // insert with new row

                        dispatch(
                            insertRowWithStates({
                                row: { skills: [{ dragId: active.id, skillId: activeData.skill }] },
                            }),
                        );
                        break;
                    }
                    case DragType.Row: {
                        if (activeData.parentType === DragType.Skillbar) {
                            // moved from skillbar
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
                        } else {
                            // moved between rows or within same row
                            dispatch(
                                moveRowSkill({
                                    rowId: activeData.parentId,
                                    skillId: active.id,
                                    to: { row: overData.parentId, index: overData.index },
                                }),
                            );
                        }
                        break;
                    }
                }
            }

            reset();
        },
        [dispatch, reset, dragged?.duplicate],
    );

    const onDragCancel = useCallback(
        (_: DragCancelEvent) => {
            reset();
        },
        [reset],
    );

    return (
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragCancel={onDragCancel}>
            {children}
            <DragOverlay>
                {dragged ? (
                    <SkillIconWithRef skill={dragged.skill} sx={{ cursor: "grabbing" }} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
