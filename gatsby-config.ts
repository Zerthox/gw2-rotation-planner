import path from "path";
import {GatsbyConfig, Node} from "gatsby";

interface YamlTypeNameArgs {
    node: Node;
    object: unknown;
    isArray: boolean;
}

const config: GatsbyConfig = {
    siteMetadata: {
        title: "GW2 Rotation Planner",
        description: "Plan out rotations for Guild Wars 2",
        author: "Zerthox",
        source: "https://github.com/zerthox/gw2-rotation-planner"
    },
    pathPrefix: "/gw2-rotation-planner",
    plugins: [
        "gatsby-transformer-json",
        {
            resolve: "gatsby-transformer-yaml",
            options: {
                typeName: ({node}: YamlTypeNameArgs) => node.relativeDirectory
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: path.resolve("./src/data")
            }
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-offline",
        {
            resolve: "gatsby-plugin-typescript",
            options: {
                isTSX: true,
                allExtensions: true
            }
        },
        "gatsby-plugin-typescript-checker",
        {
            resolve: "gatsby-plugin-eslint",
            options: {
                stages: ["develop"],
                extensions: ["js", "jsx", "ts", "tsx"],
                exclude: ["node_modules", ".cache", "public"],
                emitWarning: true,
                failOnError: false
            }
        }
    ]
};

export default config;
