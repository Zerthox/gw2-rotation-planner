import {Id} from "../../store/planner";

export * from "./planner";
export * from "./sidebar";
export * from "./timeline";
export * from "./skill";
export * from "./skillbar";

export enum DropType {
    Trash = "trash",
    Skillbar = "skillbar",
    Skill = "skill",
    Row = "row"
}

export interface TrashData {
    type: DropType.Trash;
}

export interface SkillbarData {
    type: DropType.Skillbar;
}

export interface SkillData {
    type: DropType.Skill;
    parentId: Id;
    index: number;
    skill: number;
    fromSkillbar: boolean;
}

export interface RowData {
    type: DropType.Row;
    parentId: Id;
    index: number;
}

export type OverData = TrashData | SkillbarData | SkillData | RowData;
