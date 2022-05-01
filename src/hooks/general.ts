import {useState, useRef, useCallback, useEffect, useMemo} from "react";

export type PickEventType<T extends AnyEventTarget> = T extends GlobalEventHandlers ? keyof GlobalEventHandlersEventMap : (
    T extends WindowEventHandlers ? keyof WindowEventHandlersEventMap : (
        T extends DocumentAndElementEventHandlers ? keyof DocumentAndElementEventHandlersEventMap : string
    )
);

export type PickEvent<K extends string> = K extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[K] : (
    K extends keyof WindowEventHandlersEventMap ? WindowEventHandlersEventMap[K] : (
        K extends keyof DocumentAndElementEventHandlersEventMap ? DocumentAndElementEventHandlersEventMap[K] : Event
    )
);

export type AnyEventTarget = GlobalEventHandlers | WindowEventHandlers | DocumentAndElementEventHandlers | EventTarget;

export const useEventListener = <T extends AnyEventTarget, K extends PickEventType<T>>(
    target: T,
    event: K,
    handler: (event: PickEvent<K>) => unknown,
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

    useEventListener(target, "keydown", (event) => {
        if (keys.has(event.key)) {
            setPressed(true);
        }
    });
    useEventListener(target, "keyup", (event) => {
        if (keys.has((event.key))) {
            setPressed(false);
        }
    });

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
