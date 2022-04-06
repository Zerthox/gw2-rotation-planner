import {Id} from "../../store/planner";

export * from "./planner";
export * from "./profselect";
export * from "./trash";
export * from "./skill";
export * from "./skillbar";
export * from "./timeline";
export * from "./row";

export interface SkillData {
    parentId: Id;
    index: number;
    skill: number;
}

export interface OverData {
    parentId?: Id;
    index?: number;
}
