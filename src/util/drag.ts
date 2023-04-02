import {nanoid} from "nanoid/non-secure";
import {UniqueIdentifier} from "@dnd-kit/core";

export type DragId = UniqueIdentifier;

export const enum DragType {
    Row = "row",
    Skill = "skill",
    Skillbar = "skillbar",
    Add = "add"
}

export const createDragId = (type: DragType): DragId => `${type}-${nanoid()}`;

export const isa = (type: DragType, id: DragId): boolean => id?.toString().startsWith(type);

export interface SkillData {
    parentId: DragId;
    index: number;
    skill: number;
}

export interface OverData {
    parentId?: DragId;
    index?: number;
}
