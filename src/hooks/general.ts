import {useState, useRef, useCallback, useEffect, useMemo} from "react";

export type PickEvent<K extends string> = K extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[K] : (
    K extends keyof WindowEventHandlersEventMap ? WindowEventHandlersEventMap[K] : (
        K extends keyof DocumentAndElementEventHandlersEventMap ? DocumentAndElementEventHandlersEventMap[K] : Event
    )
);

export const useEventListener = <K extends string>(
    event: K,
    handler: (event: PickEvent<K>) => unknown,
    target: GlobalEventHandlers | WindowEventHandlers | DocumentAndElementEventHandlers = window
): void => {
    const saved = useRef<typeof handler>();

    useEffect(() => {
        saved.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: PickEvent<K>) => saved.current(event);
        target.addEventListener(event, listener);
        return () => target.removeEventListener(event, listener);
    }, [event, target]);
};

export const useKeyPressed = (key: string | Array<string>, target: GlobalEventHandlers = window): boolean => {
    const [pressed, setPressed] = useState(false);
    const keys = useMemo(() => new Set(typeof key === "string" ? [key] : key), [key]);

    useEventListener("keydown", (event) => {
        if (keys.has(event.key)) {
            setPressed(true);
        }
    }, target);
    useEventListener("keyup", (event) => {
        if (keys.has((event.key))) {
            setPressed(false);
        }
    }, target);

    return pressed;
};

export const useCooldown = (cooldown: number): [boolean, () => void] => {
    const [active, setActive] = useState(false);
    const timeout = useRef<number>(null);

    const trigger = useCallback(() => {
        if (timeout.current) {
            window.clearTimeout(timeout.current);
        }
        setActive(true);
        timeout.current = window.setTimeout(() => {
            setActive(false);
            timeout.current = null;
        }, cooldown);
    }, [cooldown, setActive, timeout]);

    return [active, trigger];
};
