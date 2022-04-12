import React, {forwardRef} from "react";
import {Icon, Tooltip} from "@discretize/gw2-ui-new";

type IconProps = React.ComponentProps<typeof Icon>;
type TooltipProps = React.ComponentProps<typeof Tooltip>;

const IconWrapper = (props: IconProps, ref: React.ForwardedRef<HTMLSpanElement>) => (
    <span ref={ref}>
        <Icon {...props}/>
    </span>
);

const ForwardedIcon = forwardRef(IconWrapper);

export interface IconWithTooltipProps extends IconProps {
    tooltip: React.ReactNode;
    disableTooltip?: boolean;
    tooltipProps?: TooltipProps;
}

export const IconWithTooltip = (
    {tooltip, disableTooltip = false, tooltipProps, ...props}: IconWithTooltipProps
): JSX.Element => (
    <Tooltip
        disabled={disableTooltip}
        content={
            <div>
                {tooltip}
            </div>
        }
        {...tooltipProps}
    >
        <ForwardedIcon
            {...props}
        />
    </Tooltip>
);
