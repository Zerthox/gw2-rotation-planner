import React, {useCallback, useEffect} from "react";
import {Select, MenuItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {useProfession, changeProfession} from "../../store/build";
import {useProfessionsData, Profession} from "../../hooks/data";

export const ProfessionSelect = (): JSX.Element => {
    const dispatch = useDispatch();
    const data = useProfessionsData();
    const prof = useProfession();

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
            value={prof}
            onChange={({target}) => onChange(target.value as Profession)}
        >
            {data.map(({name}) => (
                <MenuItem key={name} value={name}>
                    {name}
                </MenuItem>
            ))}
        </Select>
    );
};
