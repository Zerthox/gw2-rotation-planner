import { sortedIndexBy } from "lodash";
import { CommonSkillId, SpecialActionSkill } from "../../data/common";
import { AnimationStatus, Log, Phase, Player, SkillInternal } from "./types";
import { SKILL_MAPPING } from "./skills";

export interface Cast {
    skill: number;
    time: number;
    duration: number;
}

export const insertCast = (casts: Cast[], { skill, time, duration }: Cast) => {
    const cast = {
        skill:
            SKILL_MAPPING[skill]
            ?? (skill in SpecialActionSkill ? CommonSkillId.SpecialAction : skill),
        time,
        duration,
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

const PHASE_BLACKLIST = ["First Number"];

export const keepPhase = (phase: Phase): boolean =>
    !phase.breakbarPhase && !phase.subPhases && !PHASE_BLACKLIST.includes(phase.name);

export const getCasts = (log: Log, player: Player): Cast[] => {
    const result = [] as Cast[];

    // handle both json format and internal html format
    if (player.rotation) {
        for (const { id, skills } of player.rotation) {
            const skill = log.skillMap[`s${id}`];
            if (!skill.isGearProc && !skill.isTraitProc && !skill.isUnconditionalProc) {
                for (const { timeGained, castTime, duration } of skills) {
                    if (typeof timeGained !== "number" || timeGained >= 0) {
                        insertCast(result, { skill: id, time: castTime, duration });
                    }
                }
            }
        }
    } else if (player.details?.rotation) {
        for (let i = 0; i < log.phases.length; i++) {
            const phase = log.phases[i];
            if (keepPhase(phase)) {
                const casts = player.details.rotation[i];
                for (const [time, id, duration, status] of casts) {
                    const skill = log.skillMap[`s${id}`] as unknown as SkillInternal;
                    if (
                        !skill.gearProc
                        && !skill.traitProc
                        && status != AnimationStatus.Interrupted
                    ) {
                        insertCast(result, { skill: id, time: phase.start + time, duration });
                    }
                }
            }
        }
    } else {
        throw Error(`Log for ${log.fightName} contains no supported rotation information`);
    }

    return result;
};

export const findTimeIndex = (casts: Cast[], time: number, castEnd: boolean): number =>
    sortedIndexBy(
        casts,
        { time, duration: 0 } as Cast,
        (cast) => cast.time + (castEnd ? cast.duration : 0),
    );
