import React, {forwardRef} from "react";
import clsx from "clsx";
import {css} from "@emotion/css";
import {Stack, StackProps, SxProps} from "@mui/material";
import {Skill, CustomComponent, useSkill} from "@discretize/gw2-ui-new";
import {useSortable} from "@dnd-kit/sortable";
import {SkillContextMenu} from "./context-menu";
import {Keybind} from "./keybind";
import {useShowKeys} from "../../store/settings";
import {DragId, SkillData} from "../../util/drag";
import {CommonSkillId, getCommonSkill, getSearchValue} from "../../data/common";
import {SkillSlot} from "../../data";

const dragCursor = css`cursor: grab`;

const iconStyles = css`font-size: 3em`;

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

const SkillIcon = ({skill, tooltip = false, orderSelf = false, ...props}: SkillIconProps, ref: React.Ref<HTMLElement>): JSX.Element => {
    const {data} = useSkill(skill);
    const showKeys = useShowKeys();
    const common = getCommonSkill(skill);
    const slot = data?.slot ?? common?.slot;

    return (
        <Stack ref={ref} direction="column" alignItems="center" {...props} sx={{
            gridColumn: orderSelf ? slotColumn[slot] : null,
            ...props.sx
        }}>
            {common ? (
                <CustomComponent
                    type="Skill"
                    data={common}
                    disableLink
                    disableText
                    disableTooltip={!tooltip}
                    iconProps={{
                        ...common.iconProps,
                        className: clsx(iconStyles, common.iconProps?.className)
                    }}
                />
            ) : (
                <Skill
                    id={skill}
                    disableLink
                    disableText
                    disableTooltip={!tooltip}
                    iconProps={{
                        className: iconStyles
                    }}
                />
            )}
            {showKeys ? <Keybind slot={slot as SkillSlot}/> : null}
        </Stack>
    );
};

export const SkillIconWithRef = forwardRef(SkillIcon);

export interface DraggableSkillProps {
    dragId: DragId;
    parentId: DragId;
    index: number;
    skill: number;
    orderSelf?: boolean;
    onDuplicate?: () => void;
    onDelete?: () => void;
    sx?: SxProps;
}

const placeholderStyles = css`opacity: .3`;

export const DraggableSkill = ({parentId, dragId, index, skill, orderSelf, onDuplicate, onDelete, sx}: DraggableSkillProps): JSX.Element => {
    const {attributes, listeners, setNodeRef, isDragging} = useSortable({
        id: dragId,
        data: {
            parentId,
            index,
            skill
        } as SkillData
    });

    const searchValue = getSearchValue(skill);

    return (
        <SkillContextMenu
            skill={skill}
            isCommon={skill in CommonSkillId}
            searchValue={searchValue}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
        >
            <SkillIconWithRef
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                skill={skill}
                tooltip={!isDragging}
                orderSelf={orderSelf}
                className={clsx(dragCursor, {[placeholderStyles]: isDragging})}
                sx={sx}
            />
        </SkillContextMenu>
    );
};
