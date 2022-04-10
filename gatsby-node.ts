import {GatsbyNode, Node} from "gatsby";
import {upperFirst} from "lodash";
import {fetchSkills} from "./api";
import {polyfillSkills} from "./src/data/polyfill";

// TODO: source nodes without gatsby-transformer-yaml to improve data format

interface ProfNode extends Node {
    name: string;
    skills: number[];
}

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({node, actions, getNode}) => {
    if (node.internal.type === "DataYaml") {
        const profNode = node as ProfNode;
        const parent = getNode(profNode.parent);

        try {
            // add profession info
            actions.createNodeField({
                node,
                name: "profession",
                value: upperFirst(parent.relativeDirectory as string)
            });

            if (profNode.name.startsWith("Tome") || profNode.name === "Shadow Shroud") {
                // polyfill tome data
                actions.createNodeField({
                    node,
                    name: "skills",
                    value: profNode.skills.map((id) => polyfillSkills.find((skill) => skill.id === id))
                });
            } else {
                // fetch skill data from api
                const skillData = await fetchSkills(profNode.skills);
                actions.createNodeField({
                    node,
                    name: "skills",
                    value: skillData.map(({id, name, slot}) => ({id, name, slot}))
                });
            }
        } catch (err) {
            console.error(`"${parent.absolutePath}":`, err);
        }
    }
};
