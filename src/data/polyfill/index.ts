import {SkillData} from "..";
import {tomeOfJustice, tomeOfResolve, tomeOfCourage} from "./tomes";
import {shadowShroud} from "./shadow-shroud";

export * from "./tomes";
export * from "./shadow-shroud";

export const polyfillSkills: SkillData[] = [
    ...tomeOfJustice,
    ...tomeOfResolve,
    ...tomeOfCourage,
    ...shadowShroud
];
