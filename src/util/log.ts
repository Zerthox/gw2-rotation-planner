import {sortedIndexBy} from "lodash";
import {CommonSkillId, SpecialActionSkill} from "../data/common";
import {Row} from "../store/timeline";

export interface Log {
    arcVersion: string;
    eliteInsightsVersion: string;
    fightName: string;
    fightIcon: string;
    isCM: boolean;
    duration: string;
    success: boolean;
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
    rotation: {
        id: number;
        skills: RotationCast[];
    }[];
}

export interface RotationCast {
    castTime: number;
    duration: number;
    timeGained: number;
    quickness: number;
}

export interface Phase {
    name: string;
    start: number;
    end: number;
    targets: number[];
    subPhases?: number[];
    breakbarPhase: boolean;
}

export const fetchLog = async (url: string): Promise<Log> => {
    const res = await fetch(`https://dps.report/getJson?permalink=${url}`);
    if (res.status === 200) {
        return await res.json();
    } else {
        throw Error(`Unable to fetch log "${url}": Server responded with ${res.status} ${res.statusText}`);
    }
};

export interface Cast {
    skill: number;
    time: number;
}

const SKILL_MAPPING = {
    [-2]: CommonSkillId.WeaponSwap
};

export const getCasts = (log: Log, playerName: string): Cast[] => {
    const player = log.players.find((player) => player.name === playerName);
    const result = [] as Cast[];

    for (const {id, skills} of player.rotation) {
        for (const {timeGained, castTime} of skills) {
            if (timeGained >= 0) {
                const cast = {skill: SKILL_MAPPING[id] ?? (id in SpecialActionSkill ? CommonSkillId.SpecialAction : id), time: castTime};
                const index = sortedIndexBy(result, cast, (entry) => entry.time);
                result.splice(index, 0, cast);
            }
        }
    }

    return result;
};

const PHASE_BLACKLIST = ["First Number"];

export const getFilteredPhases = (log: Log): Phase[] => log.phases.filter((phase) => !phase.breakbarPhase && !phase.subPhases && !PHASE_BLACKLIST.includes(phase.name));

const findTimeIndex = (casts: Cast[], time: number): number => sortedIndexBy(casts, {time} as Cast, (cast) => cast.time);

export const getRotation = (log: Log, player: string, importPhases: boolean): Row[] => {
    const casts = getCasts(log, player);
    const phases = getFilteredPhases(log);

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
