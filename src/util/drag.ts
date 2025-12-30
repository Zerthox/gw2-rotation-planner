import { nanoid } from "nanoid";
import { UniqueIdentifier } from "@dnd-kit/core";

export type DragId = UniqueIdentifier;

export const enum DragType {
    Row = "row",
    Skill = "skill",
    Skillbar = "skillbar",
    Add = "add",
}

export const createDragId = (): DragId => nanoid();

export interface DragData {
    type: DragType;
    parentType?: DragType;
    parentId?: DragId;
    index?: number;
}

export interface SkillData extends DragData {
    parentId: DragId;
    parentType: DragType;
    index: number;
    skill: number;
}
