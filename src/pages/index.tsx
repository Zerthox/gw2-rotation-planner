import React from "react";
import {Chip} from "@mui/material";
import {Layout} from "../components/layout";
import {Planner} from "../components/planner";
import {IOButtons} from "../components/io";

const Index = (): JSX.Element => (
    <Layout header={
        <>
            <Chip color="warning" label="BETA"/>
            <IOButtons/>
        </>
    }>
        <Planner/>
    </Layout>
);

export default Index;
