import React from "react";
import {Box} from "@mui/material";
import {SkillSlot} from "../../data";

const keybinds = {
    [SkillSlot.Profession1]: "F1",
    [SkillSlot.Profession2]: "F2",
    [SkillSlot.Profession3]: "F3",
    [SkillSlot.Profession4]: "F4",
    [SkillSlot.Profession5]: "F5",
    [SkillSlot.Profession6]: "F6",
    [SkillSlot.Profession7]: "F7",
    [SkillSlot.Pet]: "F2",
    [SkillSlot.Weapon1]: "1",
    [SkillSlot.Weapon2]: "2",
    [SkillSlot.Weapon3]: "3",
    [SkillSlot.Weapon4]: "4",
    [SkillSlot.Weapon5]: "5",
    [SkillSlot.Downed1]: "1",
    [SkillSlot.Downed2]: "2",
    [SkillSlot.Downed3]: "3",
    [SkillSlot.Downed4]: "4",
    [SkillSlot.Heal]: "6",
    [SkillSlot.Utility]: "7-9",
    [SkillSlot.Elite]: "0"
};

export interface KeybindProps {
    slot?: SkillSlot;
}

export const Keybind = ({slot}: KeybindProps): JSX.Element => {
    const keybind = keybinds[slot];

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            marginTop: "-1em",
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
