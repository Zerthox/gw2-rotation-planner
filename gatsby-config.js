module.exports = {
    siteMetadata: {
        title: "GW2 Rotation Planner",
        description: "Plan out rotations for Guild Wars 2",
        author: "Zerthox"
    },
    pathPrefix: "/gw2-rotation-planner",
    plugins: [
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
