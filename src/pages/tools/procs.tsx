import React from "react";
import {SEO} from "../../components/layout";
import {MovedTool} from "../../components/tools";

const title = "Proc Calculator";

const ProcCalculator = (): JSX.Element => {
    return <MovedTool title={title} path="procs"/>;
};

export default ProcCalculator;

export const Head = (): JSX.Element => <SEO title={title}/>;
