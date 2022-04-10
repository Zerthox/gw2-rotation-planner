import {GatsbyNode, Node} from "gatsby";
import {upperFirst} from "lodash";
import {fetchSkills} from "./api";
import {tomePolyfill} from "./src/data";

interface ProfNode extends Node {
    name: string;
    skills: number[];
}

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({node, actions, getNode}) => {
    if (node.internal.type === "DataYaml") {
        const profNode = node as ProfNode;

        // add profession info
        const parent = getNode(profNode.parent);
        actions.createNodeField({
            node,
            name: "profession",
            value: upperFirst(parent.relativeDirectory as string)
        });

        if (profNode.name.startsWith("Tome")) {
            // polyfill tome skill data
            actions.createNodeField({
                node,
                name: "skills",
                value: profNode.skills.map((id) => tomePolyfill.find((skill) => skill.id === id))
            });
        } else {
            // fetch skill data from api
            try {
                const skillData = await fetchSkills(profNode.skills);

                actions.createNodeField({
                    node,
                    name: "skills",
                    value: skillData.map(({id, name, slot}) => ({id, name, slot}))
                });
            } catch (err) {
                console.error("Failed to fetch skill data:", err);
            }
        }
    }
};
