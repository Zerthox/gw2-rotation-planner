import React from "react";
import {PageProps} from "gatsby";
import {Chip} from "@mui/material";
import {Warning} from "@mui/icons-material";
import {Layout} from "../components/layout";
import {Planner} from "../components/planner";
import {IOButtons} from "../components/io";
import {HelpContent} from "../components/planner/help";

const Index = ({location}: PageProps): JSX.Element => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    return (
        <Layout
            header={
                <>
                    <Chip
                        color="warning"
                        label="Work in progress"
                        icon={<Warning/>}
                    />
                    <IOButtons/>
                </>
            }
            help={<HelpContent/>}
        >
            <Planner load={params}/>
        </Layout>
    );
};

export default Index;
