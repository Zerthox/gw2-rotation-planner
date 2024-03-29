import React from "react";
import {Box} from "@mui/material";
import {SkillSlot} from "../../data";
import {KeyDisplay, useKeybind, useKeyDisplay} from "../../store/settings";

export interface KeybindProps {
    slot?: SkillSlot;
}

export const Keybind = ({slot}: KeybindProps): JSX.Element => {
    const keybind = useKeybind(slot);
    const keyDisplay = useKeyDisplay();

    const show = keyDisplay === KeyDisplay.All || keyDisplay === KeyDisplay.Bound && keybind;

    return show ? (
        <Box sx={{
            position: "absolute",
            bottom: "-0.5em",
            height: "1.75em",
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            padding: "0.75em",
            background: "rgba(0, 0, 0, .7)",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "0.23em",
            fontWeight: "bold",
            pointerEvents: "none",
            zIndex: 1
        }}>{keybind || "..."}</Box>
    ) : null;
};
