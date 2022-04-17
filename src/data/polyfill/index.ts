import React from "react";
import {Icon} from "@discretize/gw2-ui-new";
import {SkillData} from "..";
import {commonSkills} from "./common";
import {tomeOfJustice, tomeOfResolve, tomeOfCourage} from "./tomes";
import {shadowShroud} from "./shadow-shroud";

export interface PolyfillSkill extends SkillData {
    iconProps: React.ComponentProps<typeof Icon>;
    wikiSearch?: string;
    tooltip?: React.ReactNode;
}

export * from "./common";
export * from "./tomes";
export * from "./shadow-shroud";

export const polyfillSkills: PolyfillSkill[] = [
    ...commonSkills,
    ...tomeOfJustice,
    ...tomeOfResolve,
    ...tomeOfCourage,
    ...shadowShroud
];
