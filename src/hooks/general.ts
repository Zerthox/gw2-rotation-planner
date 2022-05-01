import {useState, useRef, useCallback, useEffect} from "react";

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

export const useKeyPress = (key: string, target: GlobalEventHandlers = window): boolean => {
    const [pressed, setPressed] = useState(false);

    useEventListener("keydown", (event) => {
        if (event.key === key) {
            setPressed(true);
        }
    }, target);
    useEventListener("keyup", (event) => {
        if (event.key === key) {
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
