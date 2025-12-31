import { Row } from "../../store/timeline";
import { Log } from "./types";
import { findTimeIndex, getCasts, keepPhase } from "./casts";
import { CommonSkillId } from "../../data/common";
import { getLoopInfo } from "./skills";
import { getPlayer } from "./player";
import { EliteSpecialization, Profession } from "../../data";

export const enum SplitMode {
    None = "none",
    Phases = "phases",
    Swaps = "swaps",
    Loops = "loops",
}

const EPSILON = 40;

export const getRotation = (log: Log, playerName: string, mode: SplitMode): Row[] => {
    const player = getPlayer(log, playerName);
    const casts = getCasts(log, player);

    const single = [
        {
            name: "",
            skills: casts.map((cast) => cast.skill),
        },
    ];

    switch (mode) {
        case SplitMode.None: {
            return single;
        }

        case SplitMode.Phases: {
            const phases = log.phases.filter(keepPhase);
            if (phases.length === 0) {
                return single;
            }

            let prevEnd = 0;
            return phases.map((phase, i) => {
                const isFirst = i === 0;
                const firstCast = findTimeIndex(casts, phase.start, true);
                const start = isFirst ? firstCast : Math.max(prevEnd, firstCast);

                const end = findTimeIndex(casts, phase.end, false);
                prevEnd = end;

                return {
                    name: phase.name,
                    skills: casts.slice(start, end).map((cast) => cast.skill),
                };
            });
        }

        case SplitMode.Swaps: {
            const swaps = casts.filter((cast) => cast.skill === CommonSkillId.WeaponSwap);
            if (swaps.length === 0) {
                return single;
            }

            const rows = [];

            let count = 1;
            let start = 0;
            let name = "Opener";
            for (const swap of swaps) {
                const end = findTimeIndex(casts, swap.time, false);
                rows.push({
                    name,
                    skills: casts.slice(start, end).map((cast) => cast.skill),
                });

                name = `Weapon Loop ${count++}`;
                start = end;
            }
            rows.push({
                name,
                skills: casts.slice(start).map((cast) => cast.skill),
            });

            return rows;
        }

        case SplitMode.Loops: {
            const info = getLoopInfo(player.profession as Profession | EliteSpecialization);
            const splits = casts.filter((cast) => cast.skill in info.skills);
            if (info.weaponSwap) {
                const swaps = casts.filter(
                    (cast) =>
                        cast.skill === CommonSkillId.WeaponSwap
                        && !splits.some((other) => Math.abs(other.time - cast.time) < EPSILON),
                );
                splits.push(...swaps);
                splits.sort((a, b) => a.time - b.time);
            }

            if (splits.length === 0) {
                return single;
            }

            const rows = [];

            const nameCount = new Map<string, number>();
            let start = 0;
            let name = "Opener";
            for (const split of splits) {
                const end = findTimeIndex(casts, split.time, false);
                rows.push({
                    name,
                    skills: casts.slice(start, end).map((cast) => cast.skill),
                });

                const nextName = info.skills[split.skill] ?? "Weapon";
                const count = nameCount.get(nextName) ?? 1;
                nameCount.set(nextName, count + 1);
                name = `${nextName} Loop ${count}`;
                start = end;
            }
            rows.push({
                name,
                skills: casts.slice(start).map((cast) => cast.skill),
            });

            return rows;
        }
    }
};
