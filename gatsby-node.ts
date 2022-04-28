import {GatsbyNode, Node} from "gatsby";
import {upperFirst, partition, sortBy} from "lodash";
import jsYaml from "js-yaml";
import {fetchSkills, SkillSlot} from "./api";
import {SkillData} from "./src/data";
import {polyfillSkills} from "./src/data/polyfill";

interface FileNode extends Node {
    sourceInstanceName: string;
    absolutePath: string;
    relativePath: string;
    extension: string;
    size: number;
    prettySize: string;
    modifiedTime: string;
    accessTime: string;
    changeTime: string;
    birthTime: string;
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
    relativeDirectory: string;
    dev: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    ino: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    atime: string;
    mtime: string;
    ctime: string;
}

type FileContent = Record<string, number[]>;

const slotOrder = [
    SkillSlot.Profession1,
    SkillSlot.Profession2,
    SkillSlot.Profession3,
    SkillSlot.Profession4,
    SkillSlot.Profession5,
    SkillSlot.Profession6,
    SkillSlot.Profession7,
    SkillSlot.Weapon1,
    SkillSlot.Weapon2,
    SkillSlot.Weapon3,
    SkillSlot.Weapon4,
    SkillSlot.Weapon5,
    SkillSlot.Heal,
    SkillSlot.Utility,
    SkillSlot.Elite
];

export const onCreateNode: GatsbyNode<FileNode>["onCreateNode"] = async ({node, actions, loadNodeContent, createNodeId, createContentDigest}) => {
    if (node.internal.mediaType === "text/yaml") {
        try {
            const content = jsYaml.load(await loadNodeContent(node)) as FileContent;
            const profession = upperFirst(node.relativeDirectory);
            const type = node.name;

            for (const [name, skillIds] of Object.entries(content)) {
                const [polyfill, fetch] = partition(skillIds, (id) => polyfillSkills.find((skill) => skill.id === id));
                const skillData: SkillData[] = [
                    ...polyfill.map((id) => polyfillSkills.find((skill) => skill.id === id)),
                    ...(await fetchSkills(fetch)).map(({id, name, slot}) => ({id, name, slot}))
                ];

                // TODO: split toolbelt skill slot into heal, utility & elite here?

                const data = {
                    name,
                    profession,
                    type,
                    skills: sortBy(skillData, (skill) => slotOrder.indexOf(skill.slot))
                };
                const dataNode = {
                    ...data,
                    id: createNodeId(`SkillData-${node.id}-${name}`),
                    children: [],
                    parent: node.id,
                    internal: {
                        contentDigest: createContentDigest(data),
                        type: "SkillData"
                    }
                };

                await actions.createNode(dataNode);
                actions.createParentChildLink({parent: node, child: dataNode});
            }
        } catch (err) {
            console.error(`"${node.absolutePath}":`, err);
        }
    }
};
