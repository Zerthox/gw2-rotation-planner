import {sortedIndexBy} from "lodash";
import {CommonSkillId, SpecialActionSkill, AttunementSkill} from "../data/common";
import {Row} from "../store/timeline";

export interface Log {
    arcVersion: string;
    eliteInsightsVersion: string;
    fightName: string;
    fightIcon: string;
    success: boolean;
    isCM?: boolean;
    wvw: boolean;
    recordedBy: string;
    skillMap: Record<string, Skill>;
    players: Player[];
    phases: Phase[];
}

export interface Skill {
    name: string;
    icon: string;
    autoAttack: boolean;
    isGearProc: boolean;
    isInstantCast: boolean;
    isNotAccurate: boolean;
    isSwap: boolean;
    isTraitProc: boolean;
    canCrit: boolean;
    conversionBasedHealing: boolean;
    hybridHealing: boolean;
}

export interface SkillInternal {
    name: string;
    icon: string;
    aa: boolean;
    gearProc: boolean;
    isInstantCast: boolean;
    notAccurate: boolean;
    isSwap: boolean;
    traitProc: boolean;
    healingMode: number;
}

export interface Player {
    name: string;
    account: string;
    profession: string;
    group: number;
    hasCommanderTag: boolean;
    guildID: string;
    isFake: boolean;
    rotation?: {
        id: number;
        skills: RotationCast[];
    }[];
    details?: PlayerDetails;
}

export interface RotationCast {
    castTime: number;
    duration: number;
    timeGained: number;
    quickness: number;
}

export interface PlayerDetails {
    boonGraph: unknown[];
    deathRecap: unknown[];
    dmgDistributions: unknown[];
    dmgDistributionsTaken: unknown[];
    dmgDistributionsTargets: unknown[];
    food: unknown[];
    minions: unknown[];
    rotation: DetailsRotationCast[][];
}

/** A cast with time, skill id, duration, animation status, acceleration in that order. */
export type DetailsRotationCast = [number, number, number, AnimationStatus, number];

export const enum AnimationStatus {
    Unknown,
    Reduced,
    Interrupted,
    Full,
    Instant
}

export interface Phase {
    name: string;
    start: number;
    end: number;
    targets: number[];
    subPhases?: number[];
    breakbarPhase: boolean;
}

export const fetchLog = async (link: string): Promise<Log> => {
    const url = new URL(link);
    let jsonUrl: string;
    if (url.hostname === "dps.report") {
        jsonUrl = `https://dps.report/getJson?permalink=${link}`;
    } else if (url.hostname === "gw2wingman.nevermindcreations.de" && url.pathname.startsWith("/log/")) {
        const log = url.pathname.split("/")[2];
        jsonUrl = `https://gw2wingman.nevermindcreations.de/api/getJson/${log}`;
    } else {
        throw Error(`Unable to fetch log "${link}": unknown URL format`);
    }

    const res = await fetch(jsonUrl);
    if (res.status === 200) {
        const json = await res.json();
        if (!json.error) {
            return json;
        } else {
            throw Error(`Unable to retrieve log "${link}": Server responded with error "${json.error}"`);
        }
    } else {
        throw Error(`Unable to fetch log "${link}": Server responded with ${res.status} ${res.statusText}`);
    }
};

export interface Cast {
    skill: number;
    time: number;
}

// ei uses some negative custom ids for specific sills
const SKILL_MAPPING = {
    [-2]: CommonSkillId.WeaponSwap,
    [-5]: AttunementSkill.Fire, // weaver dual attunements
    [-6]: AttunementSkill.Fire,
    [-7]: AttunementSkill.Fire,
    [-8]: AttunementSkill.Water,
    [-9]: AttunementSkill.Water,
    [-10]: AttunementSkill.Water,
    [-11]: AttunementSkill.Air,
    [-12]: AttunementSkill.Air,
    [-13]: AttunementSkill.Air,
    [-14]: AttunementSkill.Earth,
    [-15]: AttunementSkill.Earth,
    [-16]: AttunementSkill.Earth,
    41166: AttunementSkill.Water, // weaver double attunements
    42264: AttunementSkill.Air,
    43470: AttunementSkill.Fire,
    44857: AttunementSkill.Earth,
    [-17]: CommonSkillId.Dodge, // mirage cloak dodge
    42955: 40255, // smokescale smoke assault, TODO: add custom skill for single hit?
    62730: CommonSkillId.Dodge, // vindicator death drop
    62732: CommonSkillId.Dodge, // vindicator imperial impact
    62879: CommonSkillId.Dodge, // vindicator saints shield
    62890: CommonSkillId.Dodge // vindicator tenacious ruin
};

const insertCast = (casts: Cast[], {skill, time}: Cast) => {
    const cast = {
        skill: SKILL_MAPPING[skill] ?? (skill in SpecialActionSkill ? CommonSkillId.SpecialAction : skill),
        time
    };

    // negative ids are invalid
    if (cast.skill >= 0) {
        const index = sortedIndexBy(casts, cast, (entry) => entry.time);

        // filter out duplicates from overlapping phases
        const other = casts[index];
        if (other?.time !== time || other.skill !== skill) {
            casts.splice(index, 0, cast);
        }
    }
};

export const getCasts = (log: Log, playerName: string): Cast[] => {
    const player = log.players.find((player) => player.name === playerName);
    const result = [] as Cast[];

    // handle both json format and internal html format
    if (player.rotation) {
        for (const {id, skills} of player.rotation) {
            const skill = log.skillMap[`s${id}`];
            if (!skill.isGearProc && !skill.isTraitProc) {
                for (const {timeGained, castTime} of skills) {
                    if (timeGained >= 0) {
                        insertCast(result, {skill: id, time: castTime});
                    }
                }
            }
        }
    } else if (player.details?.rotation) {
        for (let i = 0; i < log.phases.length; i++) {
            const phase = log.phases[i];
            if (keepPhase(phase)) {
                const casts = player.details.rotation[i];
                for (const [time, id, _, status] of casts) {
                    const skill = log.skillMap[`s${id}`] as unknown as SkillInternal;
                    if (!skill.gearProc && !skill.traitProc && status != AnimationStatus.Interrupted) {
                        insertCast(result, {skill: id, time: phase.start + time});
                    }
                }
            }
        }
    } else {
        throw Error(`Log for ${log.fightName} contains no supported rotation information`);
    }

    return result;
};

const PHASE_BLACKLIST = ["First Number"];

export const keepPhase = (phase: Phase): boolean => !phase.breakbarPhase && !phase.subPhases && !PHASE_BLACKLIST.includes(phase.name);

const findTimeIndex = (casts: Cast[], time: number): number => sortedIndexBy(casts, {time} as Cast, (cast) => cast.time);

export const getRotation = (log: Log, player: string, importPhases: boolean): Row[] => {
    const casts = getCasts(log, player);
    const phases = log.phases.filter(keepPhase);

    if (!importPhases || phases.length === 0) {
        return [{
            name: "",
            skills: casts.map((cast) => cast.skill)
        }];
    } else {
        return phases.map((phase) => {
            // TODO: include casts ending in phase
            const start = findTimeIndex(casts, phase.start);
            const end = findTimeIndex(casts, phase.end);
            return {
                name: phase.name,
                skills: casts.slice(start, end).map((cast) => cast.skill)
            };
        });
    }
};
