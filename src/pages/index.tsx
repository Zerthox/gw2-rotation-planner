import React from "react";
import {PageProps} from "gatsby";
import {Chip} from "@mui/material";
import {Layout} from "../components/layout";
import {Planner} from "../components/planner";
import {IOButtons} from "../components/io";

const Index = ({location}: PageProps): JSX.Element => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    return (
        <Layout header={
            <>
                <Chip color="warning" label="BETA"/>
                <IOButtons/>
            </>
        }>
            <Planner load={params}/>
        </Layout>
    );
};

export default Index;
