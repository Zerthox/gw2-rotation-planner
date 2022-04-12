import {DragId} from "../../store/drag";

export * from "./planner";
export * from "./prof-select";
export * from "./trash";
export * from "./skillbar";
export * from "./timeline";
export * from "./row";

export interface SkillData {
    parentId: DragId;
    index: number;
    skill: number;
}

export interface OverData {
    parentId?: DragId;
    index?: number;
}
