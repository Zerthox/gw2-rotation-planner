import {useState, useRef, useCallback, useEffect, useMemo} from "react";

export const useEventListener = <K extends keyof GlobalEventHandlersEventMap>(
    event: K,
    handler: (event: GlobalEventHandlersEventMap[K]) => unknown,
    target: GlobalEventHandlers = window
): void => {
    const saved = useRef<typeof handler>();

    useEffect(() => {
        saved.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: GlobalEventHandlersEventMap[K]) => saved.current(event);
        target.addEventListener(event, listener);
        return () => target.removeEventListener(event, listener);
    });
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
