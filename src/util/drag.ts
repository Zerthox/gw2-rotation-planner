import {nanoid} from "nanoid/non-secure";

export type DragId = string;

export enum DragType {
    Row = "row",
    Skill = "skill",
    Skillbar = "skillbar",
    Trash = "trash",
    Add = "add"
}

export const createDragId = (type: DragType): DragId => `${type}-${nanoid()}`;

export const isa = (type: DragType, id: DragId): boolean => id?.startsWith(type);

export interface SkillData {
    parentId: DragId;
    index: number;
    skill: number;
}

export interface OverData {
    parentId?: DragId;
    index?: number;
}
