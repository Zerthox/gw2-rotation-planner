import React, {useRef, useCallback, useMemo, useState} from "react";
import {Card, Divider, Stack} from "@mui/material";
import {Active, DndContext, DragOverEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core";
import {useDispatch, batch} from "react-redux";
import {Skillbar} from "./skillbar";
import {Trash} from "./trash";
import {Timeline} from "./timeline";
import {SkillItem} from "./skill";
import {OverData, SkillData} from ".";
import {Id, IdType, createId, isa, useDragging, setDragging, createSkill, findSkill} from "../../store/planner";
import {deleteRowSkill, insertRowSkill, moveRowSkill} from "../../store/timeline";
import {useSlotSkills, useWeaponSkills} from "../../store/build";

const SKILLBAR_ID = createId(IdType.Skillbar);

const TRASH_ID = createId(IdType.Trash);

export const Planner = (): JSX.Element => {
    const dispatch = useDispatch();
    const weaponSkillData = useWeaponSkills();
    const slotSkillData = useSlotSkills();
    const dragging = useDragging();
    const parent = useRef<Id>(null);
    const fromSkillbar = useRef(false);

    // flag used to force an update on skillbar ids
    // TODO: is there a cleaner way of doing this? redux store may need access to gatsby data
    const [refresh, setRefresh] = useState(false);

    // FIXME: react does not make a guarantee to always return the memoized value as long as deps have not changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const weaponSkills = useMemo(() => weaponSkillData.map(({id}) => createSkill(id)), [weaponSkillData, refresh]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const slotSkills = useMemo(() => slotSkillData.map(({id}) => createSkill(id)), [slotSkillData, refresh]);

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
                        const skill = findSkill([...weaponSkills, ...slotSkills], active.id);

                        // refresh skillbar ids
                        setRefresh(!refresh);

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
    }, [dispatch, weaponSkills, slotSkills, refresh]);

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
                    <Stack direction="column" spacing={1} padding={2}>
                        <Trash id={TRASH_ID}/>
                        <Divider orientation="vertical"/>
                        <Skillbar
                            id={SKILLBAR_ID}
                            weaponSkills={weaponSkills}
                            slotSkills={slotSkills}
                        />
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
