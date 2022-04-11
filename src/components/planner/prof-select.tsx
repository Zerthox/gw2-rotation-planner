import React, {useCallback, useEffect} from "react";
import {Box, Stack, Select, MenuItem, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCurrentProfession, changeProfession} from "../../store/build";
import {Profession, professionIcons, professionIconSize} from "../../data";
import {useAllSkillSections} from "../../hooks/data";

export const ProfessionSelect = (): JSX.Element => {
    const dispatch = useDispatch();
    const sections = useAllSkillSections();
    const prof = useCurrentProfession();

    const onChange = useCallback((profession: Profession) => {
        const profSections = sections.filter((section) => section.profession === profession);
        dispatch(changeProfession({profession, sections: profSections}));
    }, [dispatch, sections]);

    useEffect(() => {
        if (!prof) {
            onChange(Profession.Elementalist);
        }
    }, [prof, onChange]);

    return (
        <Select
            value={prof ?? ""}
            onChange={({target}) => onChange(target.value as Profession)}
            sx={{flex: "none"}}
        >
            {Object.entries(professionIcons).map(([name, icon]) => (
                <MenuItem key={name} value={name}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Box
                            component="img"
                            src={icon}
                            height={professionIconSize}
                            width={professionIconSize}
                        />
                        <Typography>
                            {name}
                        </Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Select>
    );
};
