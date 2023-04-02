import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {StoreState} from ".";
import {SkillSlot} from "../data";
import {Theme} from "../themes";

export type Keybinds<T> = Record<SkillSlot, T>;

export const enum KeyDisplay {
    None = "none",
    Bound = "bound",
    All = "all"
}

// TODO: weapon swap, dodge, interact, stow keybinds
export const defaultKeybinds = {
    [SkillSlot.Profession1]: "F1",
    [SkillSlot.Profession2]: "F2",
    [SkillSlot.Profession3]: "F3",
    [SkillSlot.Profession4]: "F4",
    [SkillSlot.Profession5]: "F5",
    [SkillSlot.Profession6]: "F6",
    [SkillSlot.Profession7]: "F7",
    [SkillSlot.Toolbelt]: "F1-5",
    [SkillSlot.Weapon1]: "1",
    [SkillSlot.Weapon2]: "2",
    [SkillSlot.Weapon3]: "3",
    [SkillSlot.Weapon4]: "4",
    [SkillSlot.Weapon5]: "5",
    [SkillSlot.Heal]: "6",
    [SkillSlot.Utility]: "7-9",
    [SkillSlot.Elite]: "0"
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        theme: Theme.Dark,
        keyDisplay: KeyDisplay.All,
        keybinds: defaultKeybinds,
        dev: false
    },
    reducers: {
        setTheme(state, {payload}: PayloadAction<Theme>) {
            state.theme = payload;
        },
        setKeyDisplay(state, {payload}: PayloadAction<KeyDisplay>) {
            state.keyDisplay = payload;
        },
        setKeybinds(state, {payload}: PayloadAction<Partial<Keybinds<string>>>) {
            state.keybinds = {...state.keybinds, ...payload};
        },
        setDevMode(state, {payload}: PayloadAction<boolean>) {
            state.dev = payload;
        }
    }
});

export const settingsReducer = settingsSlice.reducer;

export const {setTheme, setKeyDisplay, setKeybinds, setDevMode} = settingsSlice.actions;

export const selectTheme = ({settingsReducer}: StoreState): Theme => settingsReducer.theme;
export const useTheme = (): Theme => useSelector(selectTheme);

export const selectKeyDisplay = ({settingsReducer}: StoreState): KeyDisplay => settingsReducer.keyDisplay;
export const useKeyDisplay = (): KeyDisplay => useSelector(selectKeyDisplay);

export const selectKeybinds = ({settingsReducer}: StoreState): Keybinds<string> => {
    const {keybinds} = settingsReducer;
    return {
        ...keybinds,
        [SkillSlot.Pet]: keybinds[SkillSlot.Profession2],
        [SkillSlot.Downed1]: keybinds[SkillSlot.Weapon1],
        [SkillSlot.Downed2]: keybinds[SkillSlot.Weapon2],
        [SkillSlot.Downed3]: keybinds[SkillSlot.Weapon3],
        [SkillSlot.Downed4]: keybinds[SkillSlot.Weapon4]
    };
};
export const useKeybinds = (): Keybinds<string> => useSelector(selectKeybinds);

export const useKeybind = (slot: SkillSlot): string => useKeybinds()[slot];

export const selectDevMode = ({settingsReducer}: StoreState): boolean => settingsReducer.dev;
export const useDevMode = (): boolean => useSelector(selectDevMode);
