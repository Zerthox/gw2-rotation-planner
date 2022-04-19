import {css} from "@emotion/css";
import {PolyfillSkill} from ".";

export enum CommonSkill {
    WeaponSwap = 1,
    Dodge = 2,
    DropBundle = 3
}

export const commonSkills: PolyfillSkill[] = [
    {
        id: CommonSkill.WeaponSwap,
        name: "Weapon Swap",
        slot: null,
        iconProps: {
            name: "WeaponSwap",
            className: css`background-size: initial !important;`
        },
        wikiSearch: "Weapon Swap",
        tooltip: "Switch between your weapon sets."
    },
    {
        id: CommonSkill.Dodge,
        name: "Dodge",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/b/b2/Dodge.png",
            className: css`background-size: initial !important;`
        },
        wikiSearch: "Dodge",
        tooltip: "Evade attacks by quickly moving out of the way. While dodging, you're temporarily invulnerable."
    },
    {
        id: CommonSkill.DropBundle,
        name: "Drop Bundle",
        slot: null,
        iconProps: {
            src: "https://render.guildwars2.com/file/7342BF326738A4C5132F42CE0915D3A2184E52FB/60975.png",
            className: css`background-size: initial !important;`
        },
        wikiSearch: null,
        tooltip: "Drop your currently equipped bundle."
    }
];
