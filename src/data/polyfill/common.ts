import {css} from "@emotion/css";
import {PolyfillSkill} from ".";

export enum CommonSkill {
    WeaponSwap = 1,
    Dodge = 2,
    DropBundle = 3,
    SAK = 39157,
    Mistlock = 4,
    WhiteMantlePortal = 5,
    PortalEntrance = 35155,
    PortalExit = 20851
}

const initialSize = css`background-size: initial !important;`;

export const commonSkills: PolyfillSkill[] = [
    {
        id: CommonSkill.WeaponSwap,
        name: "Weapon Swap",
        slot: null,
        iconProps: {
            name: "WeaponSwap",
            className: initialSize
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
            className: initialSize
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
            className: initialSize
        },
        wikiSearch: null,
        tooltip: "Drop your currently equipped bundle."
    },
    {
        id: CommonSkill.SAK,
        name: "Special Action Skill",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/5/56/Celestial_Dash.png"
        },
        wikiSearch: "Special Action Skill",
        tooltip: "Perform a fight-specific special action."
    },
    {
        id: CommonSkill.Mistlock,
        name: "Mistlock Singularity",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/0/06/Mistlock_Singularity.png",
            className: initialSize
        },
        wikiSearch: "Mistlock Singularity",
        tooltip: "Gain the Rigorous Certainty effect, recharge all skills on cooldown, and repair all equipped armor."
    },
    {
        id: CommonSkill.WhiteMantlePortal,
        name: "White Mantle Portal Device",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/5/56/White_Mantle_Portal_Device.png"
        },
        wikiSearch: "White Mantle Portal Device",
        tooltip: "Receive a bundle item that can create a portal between two locations."
    },
    {
        id: CommonSkill.PortalEntrance,
        name: "Portal Entrance",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png"
        },
        tooltip: "Create an entry portal."
    },
    {
        id: CommonSkill.PortalExit,
        name: "Portal Exit",
        slot: null,
        iconProps: {
            src: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png"
        },
        tooltip: "Create an exit portal."
    }
];
