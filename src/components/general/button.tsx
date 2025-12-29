import React, { forwardRef } from "react";
import {
    Tooltip,
    Button,
    ButtonProps,
    IconButton as MuiIconButton,
    IconButtonProps as MuiIconButtonProps,
    ToggleButton,
    ToggleButtonProps,
    TooltipProps,
} from "@mui/material";
import { useCooldown } from "../../hooks/general";

export type IconButtonProps<D extends React.ElementType> = MuiIconButtonProps<D> & {
    title: string;
    tooltip?: boolean;
    tooltipProps?: Omit<TooltipProps, "children">;
};

export const IconButton = <D extends React.ElementType>({
    title,
    tooltip = true,
    tooltipProps,
    ...props
}: IconButtonProps<D>): JSX.Element =>
    tooltip && !props.disabled ? (
        <Tooltip placement="top" disableInteractive title={title} {...tooltipProps}>
            <MuiIconButton aria-label={title} {...props} />
        </Tooltip>
    ) : (
        <MuiIconButton aria-label={title} {...props} />
    );

export interface CooldownButtonProps extends ButtonProps {
    cooldown: number;
    cooldownProps: ButtonProps;
}

export const CooldownButton = ({
    cooldown,
    cooldownProps,
    onClick,
    ...props
}: CooldownButtonProps): JSX.Element => {
    const [active, trigger] = useCooldown(cooldown);

    return (
        <Button
            {...props}
            {...(active ? cooldownProps : {})}
            onClick={(event) => {
                onClick(event);
                trigger();
            }}
        />
    );
};

export interface TooltipToggleButtonProps extends ToggleButtonProps {
    tooltipProps: Omit<TooltipProps, "children">;
}

const TooltipToggleButton = (
    { tooltipProps, ...props }: TooltipToggleButtonProps,
    ref: React.Ref<HTMLButtonElement>,
): JSX.Element => (
    <Tooltip {...tooltipProps}>
        <ToggleButton ref={ref} {...props} />
    </Tooltip>
);

export const TooltipToggleButtonWithRef = forwardRef(TooltipToggleButton);
