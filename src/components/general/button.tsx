import React from "react";
import {Tooltip, IconButton as MuiIconButton, TooltipProps, IconButtonProps as MuiIconButtonProps} from "@mui/material";

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
