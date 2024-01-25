export const TICK = 40;

export const toTicks = (time: number): number => Math.ceil(time / TICK) * TICK;

export const effectiveDuration = (base: number, duration: number): number => toTicks(base * (1 + duration / 100));

export const roundDurationStat = (duration: number): number => Math.ceil(duration * 100) / 100;

export const nextDurationStep = (base: number, effectiveDuration: number): number => (effectiveDuration / base - 1 + Number.EPSILON) * 100;

export const minimizeDuration = (base: number, duration: number): number => {
    const prevDuration = effectiveDuration(base, duration) - TICK;
    const minimized = nextDurationStep(base, prevDuration);
    return Math.max(0, roundDurationStat(minimized));
};

export const nextHigherDuration = (base: number, duration: number): number => {
    const next = nextDurationStep(base, effectiveDuration(base, duration));
    return next <= 100 ? roundDurationStat(next) : null;
};
