import React from "react";
import {PageProps} from "gatsby";
import {Box, Stack, Chip} from "@mui/material";
import {Warning} from "@mui/icons-material";
import {Layout, SEO} from "../components/layout";
import {Planner} from "../components/planner";
import {IOButtons} from "../components/io";
import {HelpContent} from "../components/planner";
import {gw2Logo} from "../assets/icons";

const iconSize = "1.5em";

const Index = ({location}: PageProps): JSX.Element => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    return (
        <Layout
            titleDisplay={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        component="img"
                        src={gw2Logo}
                        alt="GW2"
                        sx={{
                            height: iconSize,
                            width: iconSize,
                            background: "currentcolor",
                            borderRadius: "50%"
                        }}
                    />
                    <span>Rotation Planner</span>
                </Stack>
            }
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

export const Head = (): JSX.Element => <SEO/>;
