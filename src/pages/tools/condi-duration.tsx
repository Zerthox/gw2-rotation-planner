import React from "react";
import {SEO} from "../../components/layout";
import {MovedTool} from "../../components/tools";

const title = "Condi Duration Calculator";

const CondiDurationCalculator = (): JSX.Element => {
    return <MovedTool title={title} path="condi-duration"/>;
};

export default CondiDurationCalculator;

export const Head = (): JSX.Element => <SEO title={title} />;
