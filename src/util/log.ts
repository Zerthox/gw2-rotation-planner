import {sortedIndexBy} from "lodash";
import {CommonSkillId, SpecialActionSkill} from "../data/common";
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
    players: Player[];
    phases: Phase[];
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

const SKILL_MAPPING = {
    [-2]: CommonSkillId.WeaponSwap,
    42955: 40255 // smokescale smoke assault
    // TODO: add custom skill for single hit?
};

const insertCast = (casts: Cast[], {skill, time}: Cast) => {
    const cast = {skill: SKILL_MAPPING[skill] ?? (skill in SpecialActionSkill ? CommonSkillId.SpecialAction : skill), time};
    const index = sortedIndexBy(casts, cast, (entry) => entry.time);

    // filter out duplicates from overlapping phases
    const other = casts[index];
    if (other?.time !== time || other.skill !== skill) {
        casts.splice(index, 0, cast);
    }
};

export const getCasts = (log: Log, playerName: string): Cast[] => {
    const player = log.players.find((player) => player.name === playerName);
    const result = [] as Cast[];

    // we need to handle dps.report & wingman json differently
    if (player.rotation) {
        for (const {id, skills} of player.rotation) {
            for (const {timeGained, castTime} of skills) {
                if (timeGained >= 0) {
                    insertCast(result, {skill: id, time: castTime});
                }
            }
        }
    } else if (player.details?.rotation) {
        for (let i = 0; i < log.phases.length; i++) {
            const phase = log.phases[i];
            if (keepPhase(phase)) {
                const casts = player.details.rotation[i];
                for (const [time, id, _, status] of casts) {
                    if (status != AnimationStatus.Interrupted) {
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
            const start = findTimeIndex(casts, phase.start);
            const end = findTimeIndex(casts, phase.end);
            return {
                name: phase.name,
                skills: casts.slice(start, end).map((cast) => cast.skill)
            };
        });
    }
};
