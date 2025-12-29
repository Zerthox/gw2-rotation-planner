import React from "react";
import { ToggleButtonGroup, SxProps } from "@mui/material";
import { ViewComfy, ViewColumn } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { TooltipToggleButtonWithRef } from "../general";
import { useSkillsView, changeView, View } from "../../store/build";

export interface ViewSelectProps {
    sx?: SxProps;
}

export const ViewSelect = ({ sx }: ViewSelectProps): JSX.Element => {
    const dispatch = useDispatch();
    const view = useSkillsView();

    return (
        <ToggleButtonGroup
            exclusive
            value={view}
            onChange={(_, value) => dispatch(changeView(value))}
            sx={sx}
        >
            <TooltipToggleButtonWithRef
                size="small"
                value={View.CatalogList}
                tooltipProps={{
                    title: "List View",
                    disableInteractive: true,
                }}
            >
                <ViewComfy />
            </TooltipToggleButtonWithRef>
            <TooltipToggleButtonWithRef
                size="small"
                value={View.CatalogOrdered}
                tooltipProps={{
                    title: "Ordered View",
                    disableInteractive: true,
                }}
            >
                <ViewColumn />
            </TooltipToggleButtonWithRef>
        </ToggleButtonGroup>
    );
};
