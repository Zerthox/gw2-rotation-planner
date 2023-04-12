import {useState, useRef, useCallback, useEffect, useMemo} from "react";

export type PickEventMap<T extends EventTarget> = T extends GlobalEventHandlers ? GlobalEventHandlersEventMap : Record<string, Event>;

export type PickEventTypes<T extends EventTarget> = Extract<keyof PickEventMap<T>, string>;

export type PickEvent<T extends EventTarget, K extends PickEventTypes<T>> = PickEventMap<T>[K];

export function useEventListener<T extends EventTarget, K extends PickEventTypes<T>>(
    target: T,
    event: K,
    handler: (event: PickEvent<T, K>) => unknown
): void {
    const saved = useRef<typeof handler>();

    useEffect(() => {
        saved.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: PickEvent<T, K>) => saved.current(event);
        target.addEventListener(event, listener);
        return () => target.removeEventListener(event, listener);
    }, [event, target]);
}

export const useKeyState = (key: string | string[], target: EventTarget & GlobalEventHandlers = window): boolean => {
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
