import React, {useState, useRef} from "react";
import {Tooltip, Button, ButtonProps, IconButton as MuiIconButton, TooltipProps, IconButtonProps as MuiIconButtonProps} from "@mui/material";

export interface IconButtonProps extends MuiIconButtonProps {
    title: string;
    href?: string;
    tooltip?: boolean;
    tooltipProps?: TooltipProps;
}

export const IconButton = ({title, tooltip = true, tooltipProps, ...props}: IconButtonProps): JSX.Element => tooltip ? (
    <Tooltip
        placement="top"
        disableInteractive
        title={title}
        {...tooltipProps}
    >
        <MuiIconButton aria-label={title} {...props}/>
    </Tooltip>
) : <MuiIconButton aria-label={title} {...props}/>;

export interface CooldownButtonProps extends ButtonProps {
    cooldown: number;
    cooldownProps: ButtonProps;
}

export const CooldownButton = ({cooldown, cooldownProps, onClick, ...props}: CooldownButtonProps): JSX.Element => {
    const [triggered, setTriggered] = useState(false);
    const timeout = useRef<number>(null);

    return (
        <Button
            {...props}
            {...triggered ? cooldownProps : {}}
            onClick={(event) => {
                onClick(event);
                if (timeout.current) {
                    window.clearTimeout(timeout.current);
                }
                setTriggered(true);
                timeout.current = window.setTimeout(() => {
                    setTriggered(false);
                    timeout.current = null;
                }, cooldown);
            }}
        />
    );
};
