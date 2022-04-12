import React from "react";
import {css} from "@emotion/css";
import {Icon} from "@discretize/gw2-ui-new";
import {SkillData} from ".";

export enum CommonSkill {
    WeaponSwap = 0,
    Dodge = 1,
    DropBundle = 2
}

export interface CommonSkillData extends SkillData {
    iconProps: React.ComponentProps<typeof Icon>;
    wikiSearch: string;
}

export const commonSkills: CommonSkillData[] = [
    {
        id: CommonSkill.WeaponSwap,
        name: "Weapon Swap",
        slot: null,
        iconProps: {
            name: "WeaponSwap",
            className: css`background-size: initial !important;`
        },
        wikiSearch: "Weapon Swap"
    },
    {
        id: CommonSkill.Dodge,
        name: "Dodge",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/b/b2/Dodge.png",
            className: css`background-size: initial !important;`
        },
        wikiSearch: "Dodge"
    },
    {
        id: CommonSkill.DropBundle,
        name: "Drop Bundle",
        slot: null,
        iconProps: {
            src: "https://render.guildwars2.com/file/7342BF326738A4C5132F42CE0915D3A2184E52FB/60975.png",
            className: css`background-size: initial !important;`
        },
        wikiSearch: null
    }
];
