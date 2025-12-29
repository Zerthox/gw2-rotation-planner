import { GatsbyNode, Node } from "gatsby";
import { upperFirst } from "lodash";
import jsYaml from "js-yaml";

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

export const onCreateNode: GatsbyNode<FileNode>["onCreateNode"] = async ({
    node,
    actions,
    loadNodeContent,
    createNodeId,
    createContentDigest,
}) => {
    if (node.internal.mediaType === "text/yaml") {
        try {
            const content = jsYaml.load(await loadNodeContent(node)) as FileContent;
            const profession = upperFirst(node.relativeDirectory);
            const type = node.name;

            for (const [name, skills] of Object.entries(content)) {
                const data = {
                    name,
                    profession,
                    type,
                    skills,
                };

                const dataNode = {
                    ...data,
                    id: createNodeId(`SkillData-${node.id}-${name}`),
                    children: [],
                    parent: node.id,
                    internal: {
                        contentDigest: createContentDigest(data),
                        type: "SkillData",
                    },
                };

                await actions.createNode(dataNode);
                actions.createParentChildLink({ parent: node, child: dataNode });
            }
        } catch (err) {
            console.error(`"${node.absolutePath}":`, err);
        }
    }
};
