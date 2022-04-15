import React, {useCallback} from "react";
import {Box, Stack, Select, SelectChangeEvent, SxProps, MenuItem, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCurrentProfession, changeProfession} from "../../store/build";
import {Profession} from "../../data";
import {professionIcons, professionIconSize} from "../../assets/prof-icons";

export interface ProfessionSelectProps {
    sx?: SxProps;
}

export const ProfessionSelect = ({sx}: ProfessionSelectProps): JSX.Element => {
    const dispatch = useDispatch();
    const prof = useCurrentProfession();

    const onChange = useCallback(({target}: SelectChangeEvent<string>) => {
        dispatch(changeProfession(target.value as Profession));
    }, [dispatch]);

    return (
        <Select value={prof ?? ""} onChange={onChange} sx={sx}>
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
