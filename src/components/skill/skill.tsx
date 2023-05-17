import React from "react";
import clsx from "clsx";
import {css} from "@emotion/css";
import {Box, Stack, StackProps, SxProps} from "@mui/material";
import {Skill, CustomComponent, useSkill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {shallowEqual} from "react-redux";
import {SkillContextMenu, SkillContextMenuProps} from "./skill-menu";
import {Keybind} from "./keybind";
import {useAutoSize} from "../../store/settings";
import {DragId, SkillData} from "../../util/drag";
import {getCommonSkill} from "../../data/common";
import {SkillSlot, isAuto} from "../../data";

export interface SkillIconProps extends StackProps {
    skill: number;
    tooltip?: boolean;
    orderSelf?: boolean;
}

// TODO: row with ele attunements
const slotColumn = {
    [SkillSlot.Weapon1]: 1,
    [SkillSlot.Downed1]: 1,
    [SkillSlot.Weapon2]: 2,
    [SkillSlot.Downed2]: 2,
    [SkillSlot.Weapon3]: 3,
    [SkillSlot.Downed3]: 3,
    [SkillSlot.Weapon4]: 4,
    [SkillSlot.Downed4]: 4,
    [SkillSlot.Weapon5]: 5
};

const SkillIcon = ({skill, tooltip = false, orderSelf = false, sx, ...props}: SkillIconProps, ref: React.Ref<HTMLElement>): JSX.Element => {
    const autoSize = useAutoSize();
    const {data} = useSkill(skill);
    const common = getCommonSkill(skill);
    const slot = data?.slot as SkillSlot ?? common?.slot;

    return (
        <Stack
            ref={ref as React.Ref<HTMLDivElement>}
            direction="column"
            alignItems="center"
            justifyContent="center"
            {...props}
            sx={{
                position: "relative",
                gridColumn: orderSelf ? slotColumn[slot] : null,
                height: "1em",
                fontSize: "3em",
                ...sx
            }}
        >
            <Box height="1em" fontSize={isAuto(slot) ? `${autoSize / 100}em` : null}>
                {common ? (
                    <CustomComponent
                        type="Skill"
                        data={common}
                        disableLink
                        disableText
                        disableTooltip={!tooltip}
                        iconProps={common.iconProps}
                    />
                ) : (
                    <Skill
                        id={skill}
                        disableLink
                        disableText
                        disableTooltip={!tooltip}
                    />
                )}
            </Box>
            <Keybind slot={slot as SkillSlot}/>
        </Stack>
    );
};

export const SkillIconWithRef = React.forwardRef(SkillIcon);

interface SkillContentProps {
    iconProps: SkillIconProps & React.RefAttributes<HTMLElement>;
    contextMenuProps: Omit<SkillContextMenuProps, "children">;
}

const SkillContent = ({iconProps, contextMenuProps}: SkillContentProps): JSX.Element => (
    <SkillContextMenu {...contextMenuProps}>
        <SkillIconWithRef {...iconProps}/>
    </SkillContextMenu>
);

const SkillContentMemo = React.memo(
    SkillContent,
    (prev, next) => shallowEqual(prev.iconProps, next.iconProps) && shallowEqual(prev.contextMenuProps, next.contextMenuProps)
);

export interface DraggableSkillProps {
    skill: number;
    index: number;
    dragId: DragId;
    parentId: DragId;
    orderSelf?: boolean;
    canDuplicate?: boolean;
    canDelete?: boolean;
    sx?: SxProps;
}

const dragCursor = css`cursor: grab`;

const placeholderStyles = css`opacity: .3`;

export const DraggableSkill = ({skill, index, parentId, dragId, orderSelf, canDuplicate, canDelete, sx}: DraggableSkillProps): JSX.Element => {
    const {attributes, listeners, setNodeRef, isDragging} = useSortable({
        id: dragId,
        data: {
            parentId,
            index,
            skill
        } as SkillData
    });

    return <SkillContentMemo
        iconProps={{
            ref: setNodeRef,
            ...attributes,
            ...listeners,
            skill,
            tooltip: !isDragging,
            orderSelf,
            className: clsx(dragCursor, {[placeholderStyles]: isDragging}),
            sx
        }}
        contextMenuProps={{
            skill,
            index,
            dragId,
            parentId,
            canDuplicate,
            canDelete
        }}
    />;
};
