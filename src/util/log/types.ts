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
    isUnconditionalProc: boolean;
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
    Instant,
}

export interface Phase {
    name: string;
    start: number;
    end: number;
    targets: number[];
    subPhases?: number[];
    breakbarPhase: boolean;
}
