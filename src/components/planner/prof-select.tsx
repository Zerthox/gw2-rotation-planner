import React, {useCallback} from "react";
import {Select, SelectChangeEvent, SxProps, MenuItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCurrentProfession, changeProfession} from "../../store/build";
import {IconText} from "../general/icon-text";
import {Profession} from "../../data";
import {iconSize, professionIcons} from "../../assets/icons";

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
                    <IconText icon={icon} size={iconSize}>{name}</IconText>
                </MenuItem>
            ))}
        </Select>
    );
};
