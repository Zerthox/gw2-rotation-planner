import {Skill} from "../../api";

export interface CustomSkill extends Omit<Skill, "chat_link"> {
    wiki?: string;
}

export enum CommonSkill {
    WeaponSwap = 1,
    Dodge = 2,
    DropBundle = 3,
    SAK = 39157, // hypernova launch id
    Mistlock = 4,
    WhiteMantlePortal = 5,
    PortalEntrance = 35155, // wmpd entrance id
    PortalExit = 20851 // wmpd exit id
}

export const getCustomSkill = (id: number): CustomSkill => customSkills.find((skill) => skill.id === id);

export const getAllCustomSkills = (): CustomSkill[] => customSkills;

// FIXME: some custom icons need a way to adjust the background size

const customSkills: CustomSkill[] = [
    {
        id: CommonSkill.WeaponSwap,
        name: "Weapon Swap",
        professions: [],
        description: "Switch between your weapon sets.",
        icon: "https://wiki.guildwars2.com/images/c/ce/Weapon_Swap_Button.png",
        wiki: "Weapon Swap",
        slot: null
    },
    {
        id: CommonSkill.Dodge,
        name: "Dodge",
        professions: [],
        description: "Evade attacks by quickly moving out of the way. While dodging, you're temporarily invulnerable.",
        icon: "https://wiki.guildwars2.com/images/archive/b/b2/20150601155307%21Dodge.png",
        wiki: "Dodge",
        slot: null
    },
    {
        id: CommonSkill.DropBundle,
        name: "Drop Bundle",
        professions: [],
        description: "Drop your currently equipped bundle.",
        icon: "https://render.guildwars2.com/file/7342BF326738A4C5132F42CE0915D3A2184E52FB/60975.png",
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
        wiki: "Mistlock Singularity",
        slot: null
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
        slot: null
    },
    {
        id: CommonSkill.PortalExit,
        name: "Portal Exit",
        professions: [],
        description: "Create an exit portal.",
        icon: "https://wiki.guildwars2.com/images/4/43/Watchwork_Portal_Device.png",
        slot: null
    }
];
