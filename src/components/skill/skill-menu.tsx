import React from "react";
import {
    OpenInNew,
    DataObject,
    DataArray,
    Fingerprint,
    PlusOne,
    Delete,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ContextMenu, ContextMenuProps } from "../general";
import { useDevMode } from "../../store/settings";
import { copyToClipboard } from "../../util/clipboard";
import { CommonSkillId, getSearchValue, isRealSkill } from "../../data/common";
import { deleteRowSkill, insertRowSkill } from "../../store/timeline";
import { createSkillState } from "../../store/build";
import { DragId } from "../../util/drag";

const wikiUrl = "https://wiki.guildwars2.com";
const apiUrl = "https://api.guildwars2.com";

export interface SkillContextMenuProps extends ContextMenuProps {
    skill: number;
    index: number;
    dragId: DragId;
    parentId: DragId;
    canDuplicate?: boolean;
    canDelete?: boolean;
}

export const SkillContextMenu = ({
    skill,
    index,
    dragId,
    parentId,
    canDuplicate,
    canDelete,
    ...props
}: SkillContextMenuProps): JSX.Element => {
    const dispatch = useDispatch();
    const isDev = useDevMode();

    const isCommon = skill in CommonSkillId;
    const isReal = isRealSkill(skill);
    const searchValue = getSearchValue(skill);

    return (
        <ContextMenu
            {...props}
            items={[
                canDuplicate
                    ? {
                          key: "duplicate",
                          text: "Duplicate Skill",
                          icon: <PlusOne />,
                          action: () =>
                              dispatch(
                                  insertRowSkill({
                                      rowId: parentId,
                                      index: index + 1,
                                      skill: createSkillState(skill),
                                  }),
                              ),
                      }
                    : null,
                searchValue
                    ? {
                          key: "wiki",
                          text: "Open Wiki",
                          icon: <OpenInNew />,
                          itemProps: {
                              // TODO: mimic chat code link used by the game
                              href: `${wikiUrl}?title=Special:Search&search=${encodeURIComponent(searchValue)}&go=Go`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                          },
                      }
                    : null,
                ...(isDev
                    ? [
                          !isCommon
                              ? {
                                    key: "api",
                                    text: "Open API",
                                    icon: <DataObject />,
                                    itemProps: {
                                        href: `${apiUrl}/v2/skills?ids=${skill}&lang=en`,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                    },
                                }
                              : null,
                          isReal
                              ? {
                                    key: "id",
                                    text: "Copy Skill ID",
                                    icon: <Fingerprint />,
                                    action: () => copyToClipboard(skill.toString()),
                                }
                              : null,
                      ]
                    : []),
                isReal && typeof searchValue === "string"
                    ? {
                          key: "chatcode",
                          text: "Copy Chatcode",
                          icon: <DataArray />,
                          action: () => copyToClipboard(searchValue),
                      }
                    : null,
                canDelete
                    ? {
                          key: "delete",
                          action: () =>
                              dispatch(
                                  deleteRowSkill({
                                      rowId: parentId,
                                      skillId: dragId,
                                  }),
                              ),
                          text: "Delete Skill",
                          icon: <Delete />,
                          color: "error.main",
                      }
                    : null,
            ]}
        />
    );
};
