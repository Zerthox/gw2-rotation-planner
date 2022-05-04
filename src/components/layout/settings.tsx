import React from "react";
import {Box, BoxProps, Typography, TextField, ToggleButtonGroup, ToggleButton, SxProps, Button} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {setTheme, setKeybinds, useTheme, useKeybinds, defaultKeybinds} from "../../store/settings";
import {SkillSlot} from "../../data";
import {Theme} from "../../themes";

export interface SettingsGroupProps extends BoxProps {
    title: string;
}

export const SettingsGroup = ({title, children, ...props}: SettingsGroupProps): JSX.Element => (
    <Box {...props}>
        <Typography variant="subtitle1">{title}</Typography>
        <Box marginY={1}>
            {children}
        </Box>
    </Box>
);

const groups = [
    {
        [SkillSlot.Profession1]: "Profession Skill 1",
        [SkillSlot.Profession2]: "Profession Skill 2",
        [SkillSlot.Profession3]: "Profession Skill 3",
        [SkillSlot.Profession4]: "Profession Skill 4",
        [SkillSlot.Profession5]: "Profession Skill 5",
        [SkillSlot.Profession6]: "Profession Skill 6",
        [SkillSlot.Profession7]: "Profession Skill 7",
        [SkillSlot.Toolbelt]: "Toolbelt Skill"
    },
    {
        [SkillSlot.Weapon1]: "Weapon Skill 1",
        [SkillSlot.Weapon2]: "Weapon Skill 2",
        [SkillSlot.Weapon3]: "Weapon Skill 3",
        [SkillSlot.Weapon4]: "Weapon Skill 4",
        [SkillSlot.Weapon5]: "Weapon Skill 5"
    },
    {
        [SkillSlot.Heal]: "Heal Skill",
        [SkillSlot.Utility]: "Utility Skill",
        [SkillSlot.Elite]: "Elite Skill"
    }
];

const iconProps: SxProps = {
    marginRight: 1
};

export const SettingsContent = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const keybinds = useKeybinds();

    return (
        <>
            <SettingsGroup title="Theme" marginBottom={3}>
                <ToggleButtonGroup
                    exclusive
                    value={theme}
                    onChange={(_, value) => dispatch(setTheme(value))}
                >
                    <ToggleButton value={Theme.Dark}>
                        <DarkMode sx={iconProps}/>
                        Dark
                    </ToggleButton>
                    <ToggleButton value={Theme.Light}>
                        <LightMode sx={iconProps}/>
                        Light
                    </ToggleButton>
                </ToggleButtonGroup>
            </SettingsGroup>
            <SettingsGroup title="Keybinds">
                {groups.map((group, i) => (
                    <Box
                        key={i}
                        display="grid"
                        gridTemplateColumns="repeat(3, 1fr)"
                        gap={1}
                        marginY={2}
                    >
                        {Object.entries(group).map(([slot, label]) => (
                            <TextField
                                key={slot}
                                variant="standard"
                                label={label}
                                placeholder="Key name"
                                value={keybinds[slot]}
                                onChange={({target}) => dispatch(setKeybinds({[slot]: target.value}))}
                                sx={{
                                    margin: 0.5,
                                    flexGrow: 1
                                }}
                            />
                        ))}
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    onClick={() => dispatch(setKeybinds(defaultKeybinds))}
                >Reset Keybinds</Button>
            </SettingsGroup>
        </>
    );
};
