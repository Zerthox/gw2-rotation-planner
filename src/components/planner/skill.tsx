import React, {useMemo} from "react";
import {Box, Stack} from "@mui/material";
import {Skill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {css} from "@emotion/css";
import {SkillData} from ".";
import {DragId, useDragging} from "../../store/drag";
import {SkillSlot} from "../../data";
import {useAllSkills} from "../../hooks/data";

const keybinds = {
    [SkillSlot.Profession1]: "F1",
    [SkillSlot.Profession2]: "F2",
    [SkillSlot.Profession3]: "F3",
    [SkillSlot.Profession4]: "F4",
    [SkillSlot.Profession5]: "F5",
    [SkillSlot.Profession6]: "F6",
    [SkillSlot.Profession7]: "F7",
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

interface KeybindProps {
    children: React.ReactNode;
}

const Keybind = ({children}: KeybindProps) => (
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
    }}>{children}</Box>
);

export interface SkillItemProps {
    skill: number;
    tooltip?: boolean;
    isPlaceholder?: boolean;
}

export const SkillItem = ({skill, tooltip = false, isPlaceholder = false}: SkillItemProps): JSX.Element => {
    const allSkills = useAllSkills();
    const skillData = useMemo(() => allSkills.find((entry) => entry.id === skill), [skill, allSkills]);

    const keybind = keybinds[skillData?.slot];

    return (
        <Stack
            direction="column"
            alignItems="center"
            sx={{opacity: isPlaceholder ? 0.3 : 1}}
        >
            <Skill
                id={skill}
                disableLink
                disableText
                disableTooltip={!tooltip}
                iconProps={{
                    className: css`font-size: 3em`
                }}
            />
            {keybind ? (
                <Keybind>{keybind}</Keybind>
            ) : null}
        </Stack>
    );
};

export interface DraggableSkillProps {
    dragId: DragId;
    parentId: DragId;
    index: number;
    skill: number;
}

export const DraggableSkill = ({parentId, dragId, index, skill}: DraggableSkillProps): JSX.Element => {
    const {attributes, listeners, setNodeRef} = useSortable({
        id: dragId,
        data: {
            parentId,
            index,
            skill
        } as SkillData
    });
    const dragging = useDragging();

    return (
        <span
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <SkillItem skill={skill} tooltip={!dragging.dragId} isPlaceholder={dragId === dragging.dragId}/>
        </span>
    );
};
