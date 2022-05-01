import {DragId} from "../../store/drag";

export * from "./planner";
export * from "./prof-select";
export * from "./row";
export * from "./skillbar";
export * from "./timeline";
export * from "./trash";

export interface SkillData {
    parentId: DragId;
    index: number;
    skill: number;
}

export interface OverData {
    parentId?: DragId;
    index?: number;
}
