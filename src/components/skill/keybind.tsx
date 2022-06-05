import React from "react";
import {Box} from "@mui/material";
import {SkillSlot} from "../../data";
import {useKeybind} from "../../store/settings";

export interface KeybindProps {
    slot?: SkillSlot;
}

export const Keybind = ({slot}: KeybindProps): JSX.Element => {
    const keybind = useKeybind(slot);

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            marginTop: "-1em",
            marginBottom: "-0.5em",
            height: "2em",
            padding: [1, 1],
            background: "rgba(0, 0, 0, .7)",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "0.7em",
            fontWeight: "bold",
            zIndex: 1
        }}>{keybind ?? "..."}</Box>
    );
};
