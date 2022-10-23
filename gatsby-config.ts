import path from "path";
import {GatsbyConfig} from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        title: "GW2 Rotation Planner",
        description: "Plan out rotations for Guild Wars 2",
        author: "Zerthox",
        source: "https://github.com/zerthox/gw2-rotation-planner"
    },
    pathPrefix: "/gw2-rotation-planner",
    plugins: [
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
        },
        {
            resolve: "gatsby-plugin-google-gtag",
            options: {
                trackingIds: ["G-L65RG8ZXVJ"],
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0
                },
                pluginConfig: {
                    respectDNT: true
                }
            }
        }
    ]
};

export default config;
