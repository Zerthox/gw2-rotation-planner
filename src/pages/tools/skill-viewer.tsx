import React from "react";
import {SEO} from "../../components/layout";
import {MovedTool} from "../../components/tools";

const title = "Skill Viewer";

const SkillViewer = (): JSX.Element => {
    return <MovedTool title={title} path="skill-viewer"/>;
};

export default SkillViewer;

export const Head = (): JSX.Element => <SEO title={title}/>;
