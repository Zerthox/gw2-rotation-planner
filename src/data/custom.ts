import React from "react";
import {css} from "@emotion/css";
import {Icon} from "@discretize/gw2-ui-new";
import {Skill} from ".";

export interface CustomSkill extends Omit<Skill, "chat_link"> {
    wiki?: string;
    iconProps?: React.ComponentProps<typeof Icon>;
}

export const getCustomSkill = (id: number): CustomSkill => customSkills.find((skill) => skill.id === id);

export const getAllCustomSkills = (): CustomSkill[] => customSkills;

export enum CommonSkill {
    WeaponSwap = 1,
    Dodge = 2,
    DropBundle = 3,
    SAK = 39157, // hypernova launch id
    Mistlock = 33652, // rigorous certainty id
    WhiteMantlePortal = 5,
    PortalEntrance = 35155, // wmpd entrance id
    PortalExit = 20851 // wmpd exit id
}

const initialSize = css`background-size: initial !important;`;

const customSkills: CustomSkill[] = [
    {
        id: CommonSkill.WeaponSwap,
        name: "Weapon Swap",
        professions: [],
        description: "Switch between your weapon sets.",
        icon: "https://wiki.guildwars2.com/images/c/ce/Weapon_Swap_Button.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Weapon Swap",
        slot: null,
        facts: [
            {
                text: "Recharge",
                type: "Recharge",
                icon: "https://render.guildwars2.com/file/D767B963D120F077C3B163A05DC05A7317D7DB70/156651.png",
                value: 10
            }
        ]
    },
    {
        id: CommonSkill.Dodge,
        name: "Dodge",
        professions: [],
        description: "Evade attacks by quickly moving out of the way. While dodging, you're temporarily invulnerable.",
        icon: "https://wiki.guildwars2.com/images/archive/b/b2/20150601155307%21Dodge.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Dodge",
        slot: null
    },
    {
        id: CommonSkill.DropBundle,
        name: "Drop Bundle",
        professions: [],
        description: "Drop your currently equipped bundle.",
        icon: "https://render.guildwars2.com/file/7342BF326738A4C5132F42CE0915D3A2184E52FB/60975.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Bundle",
        slot: null
    },
    {
        id: CommonSkill.SAK,
        name: "Special Action Skill",
        professions: [],
        description: "Perform a fight-specific special action.",
        icon: "https://wiki.guildwars2.com/images/5/56/Celestial_Dash.png",
        wiki: "Special Action Skill",
        slot: null
    },
    {
        id: CommonSkill.Mistlock,
        name: "Mistlock Singularity",
        professions: [],
        description: "Gain the Rigorous Certainty effect, recharge all skills on cooldown, and repair all equipped armor.",
        icon: "https://wiki.guildwars2.com/images/0/06/Mistlock_Singularity.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Mistlock Singularity",
        slot: null,
        facts: [
            {
                text: "Apply Buff/Condition",
                type: "Buff",
                icon: "https://wiki.guildwars2.com/images/6/60/Desert_Carapace.png",
                status: "Rigorous Certainty",
                description: "+5 Agony Resistance. The next time you would be downed, instead heal 25% of your total health.",
                duration: 0,
                apply_count: 1
            }
        ]
    },
    {
        id: CommonSkill.WhiteMantlePortal,
        name: "White Mantle Portal Device",
        professions: [],
        description: "Receive a bundle item that can create a portal between two locations.",
        icon: "https://wiki.guildwars2.com/images/5/56/White_Mantle_Portal_Device.png",
        wiki: "White Mantle Portal Device",
        slot: null
    },
    {
        id: CommonSkill.PortalEntrance,
        name: "Portal Entrance",
        professions: [],
        description: "Create an entry portal.",
        icon: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png",
        slot: null,
        facts: [
            {
                text: "Recharge",
                type: "Recharge",
                icon: "https://render.guildwars2.com/file/D767B963D120F077C3B163A05DC05A7317D7DB70/156651.png",
                value: 1800
            },
            {
                text: "Duration",
                type: "Time",
                icon: "https://render.guildwars2.com/file/7B2193ACCF77E56C13E608191B082D68AA0FAA71/156659.png",
                duration: 60
            }
        ]
    },
    {
        id: CommonSkill.PortalExit,
        name: "Portal Exit",
        professions: [],
        description: "Create an exit portal.",
        icon: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png",
        slot: null,
        facts: [
            {
                text: "Duration",
                type: "Time",
                icon: "https://render.guildwars2.com/file/7B2193ACCF77E56C13E608191B082D68AA0FAA71/156659.png",
                duration: 10
            }
        ]
    }
];
