import React from "react";
import {css} from "@emotion/css";
import {Icon} from "@discretize/gw2-ui-new";
import {encode as encodeChatcode} from "gw2e-chat-codes";
import {Skill} from ".";

export type IconProps = React.ComponentProps<typeof Icon>;

export interface CommonSkill extends Omit<Skill, "chat_link"> {
    wiki?: string;
    iconProps?: IconProps;
    realId?: boolean;
}

export const getAllCommonSkills = (): CommonSkill[] => commonSkills;

export const getCommonSkill = (id: number): CommonSkill => getAllCommonSkills().find((skill) => skill.id === id);

export const isRealSkill = (id: number): boolean => !(id in CommonSkillId) || getCommonSkill(id).realId;

export const getSearchValue = (id: number): string => getCommonSkill(id)?.wiki ?? (encodeChatcode("skill", id) || null);

// TODO: add other relevant special action skills
export enum SpecialActionSkill {
    SapperBomb = 31488,
    CelestialDash = 37924,
    ConjuredSlash = 52325,
    ConjuredProtection = 13980, // id in logs
    ConjuredShield = 52780,
    NovaLaunch = 39843,
    HypernovaLaunch = 39157
}

export enum CommonSkillId {
    WeaponSwap = 1,
    DropBundle = 3,
    Stow = 23285, // weapon stow cast id
    Dodge = 23275, // arcdps custom id
    Resurrect = 1066, // arcdps custom id
    SpecialAction = SpecialActionSkill.HypernovaLaunch,
    Mistlock = 33652, // rigorous certainty id
    WhiteMantlePortal = 20852, // buff applied by wmpd entrance
    PortalEntrance = 35155, // wmpd entrance id
    PortalExit = 20851 // wmpd exit id
}

const initialSize = css`background-size: initial !important`;

const containSize = css`background-size: contain !important`;

const commonSkills: CommonSkill[] = [
    {
        id: CommonSkillId.WeaponSwap,
        name: "Weapon Swap",
        description: "Switch between your weapon sets.",
        icon: "https://wiki.guildwars2.com/images/c/ce/Weapon_Swap_Button.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Weapon Swap",
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
        id: CommonSkillId.DropBundle,
        name: "Drop Bundle",
        description: "Drop your currently equipped bundle.",
        icon: "https://render.guildwars2.com/file/7342BF326738A4C5132F42CE0915D3A2184E52FB/60975.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Bundle"
    },
    {
        id: CommonSkillId.Stow,
        realId: true,
        name: "Weapon Stow",
        description: "Stow away your weapon and cancel the current action.",
        icon: "https://wiki.guildwars2.com/images/f/f2/Stow_Pet.png",
        iconProps: {
            className: initialSize
        }
    },
    {
        id: CommonSkillId.Dodge,
        name: "Dodge",
        description: "Evade attacks by quickly moving out of the way. While dodging, you are temporarily invulnerable.",
        icon: "https://wiki.guildwars2.com/images/archive/b/b2/20150601155307%21Dodge.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Dodge"
    },
    {
        id: CommonSkillId.Resurrect,
        name: "Resurrect",
        description: "Resurrect your target from the downed or defeated state.",
        icon: "https://wiki.guildwars2.com/images/3/3d/Downed_ally.png",
        iconProps: {
            className: containSize
        },
        wiki: "Revival"
    },
    {
        id: CommonSkillId.SpecialAction,
        name: "Special Action Skill",
        description: "Perform a fight-specific special action.",
        icon: "https://wiki.guildwars2.com/images/5/56/Celestial_Dash.png",
        wiki: "Special Action Skill"
    },
    {
        id: CommonSkillId.Mistlock,
        name: "Mistlock Singularity",
        description: "Gain the Rigorous Certainty effect, recharge all skills on cooldown, and repair all equipped armor.",
        icon: "https://wiki.guildwars2.com/images/0/06/Mistlock_Singularity.png",
        iconProps: {
            className: initialSize
        },
        wiki: "Mistlock Singularity",
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
        id: CommonSkillId.WhiteMantlePortal,
        name: "White Mantle Portal Device",
        description: "Receive a bundle item that can create a portal between two locations.",
        icon: "https://wiki.guildwars2.com/images/5/56/White_Mantle_Portal_Device.png",
        wiki: "White Mantle Portal Device"
    },
    {
        id: CommonSkillId.PortalEntrance,
        realId: true,
        name: "Portal Entrance",
        description: "Create an entry portal.",
        icon: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png",
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
        id: CommonSkillId.PortalExit,
        realId: true,
        name: "Portal Exit",
        description: "Create an exit portal.",
        icon: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png",
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
