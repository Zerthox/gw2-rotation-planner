import React, {useCallback, useEffect} from "react";
import {Box, Stack, Select, MenuItem, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCurrentProfession, changeProfession} from "../../store/build";
import {useProfessionsData, Profession} from "../../hooks/data";

// TODO: colorize icon (and maybe name)

export const ProfessionSelect = (): JSX.Element => {
    const dispatch = useDispatch();
    const data = useProfessionsData();
    const prof = useCurrentProfession();

    const onChange = useCallback((prof: Profession) => {
        const profData = data.find(({name}) => name === prof);
        dispatch(changeProfession(profData));
    }, [dispatch, data]);

    useEffect(() => {
        if (!prof) {
            onChange(Profession.Elementalist);
        }
    }, [prof, onChange]);

    return (
        <Select
            value={prof ?? ""}
            onChange={({target}) => onChange(target.value as Profession)}
        >
            {data.map(({name, icon}) => (
                <MenuItem key={name} value={name}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Box
                            component="img"
                            src={icon}
                            sx={{
                                height: 24,
                                width: 24
                            }}
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
