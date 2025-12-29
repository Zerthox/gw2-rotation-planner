import { useState, useRef, useCallback, useEffect, useMemo } from "react";

/**
 * Turn the value into an automatically updating ref object.
 *
 * This is used for values where the last value has to be accessed, but changing the value should not cause updates.
 * For example values accessed in `useEffect` hooks where the effect should not run every time the value needs to be updated.
 *
 * Hook lints may complain about a missing dependency.
 * It is fine to simply add the ref as a dependency as the ref object is guaranteed to stay the same
 * and will not cause any updates.
 */
export const useUpdatingRef = <T>(value: T): React.MutableRefObject<T> => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
};

export type PickEventMap<T extends EventTarget> = T extends GlobalEventHandlers
    ? GlobalEventHandlersEventMap
    : Record<string, Event>;

export type PickEventTypes<T extends EventTarget> = Extract<keyof PickEventMap<T>, string>;

export type PickEvent<T extends EventTarget, K extends PickEventTypes<T>> = PickEventMap<T>[K];

/** Attach an event listener to the target. */
export const useEventListener = <T extends EventTarget, K extends PickEventTypes<T>>(
    target: T,
    event: K,
    handler: (event: PickEvent<T, K>) => unknown,
): void => {
    const ref = useUpdatingRef(handler);

    useEffect(() => {
        const listener = (event: PickEvent<T, K>) => ref.current(event);
        target.addEventListener(event, listener);
        return () => target.removeEventListener(event, listener);
    }, [event, target, ref]);
};

/** Use the current state of a single or set of keys. */
export const useKeyState = (
    key: string | string[],
    target: EventTarget & GlobalEventHandlers = window,
): boolean => {
    const [pressed, setPressed] = useState(false);
    const keys = useMemo(() => new Set(typeof key === "string" ? [key] : key), [key]);

    useEventListener(target, "keydown", (event) => {
        if (keys.has(event.key)) {
            setPressed(true);
        }
    });
    useEventListener(target, "keyup", (event) => {
        if (keys.has(event.key)) {
            setPressed(false);
        }
    });

    return pressed;
};

export const useCooldown = (cooldown: number): [boolean, () => void] => {
    const [active, setActive] = useState(false);
    const timeout = useRef<number>(null);

    const trigger = useCallback(() => {
        if (typeof timeout.current === "number") {
            window.clearTimeout(timeout.current);
        }
        setActive(true);
        timeout.current = window.setTimeout(() => {
            setActive(false);
            timeout.current = null;
        }, cooldown);
    }, [cooldown, setActive]);

    return [active, trigger];
};
