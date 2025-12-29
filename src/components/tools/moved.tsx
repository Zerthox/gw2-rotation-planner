import React from "react";
import { Container, Card, Typography } from "@mui/material";
import { Layout } from "../../components/layout";
import { Link } from "../../components/general";

const site = "https://zerthox.github.io/";
const basePath = "gw2-tools/tools/";

export interface MovedToolProps {
    title: string;
    path: string;
}

export const MovedTool = ({ title, path }: MovedToolProps): JSX.Element => {
    return (
        <Layout title={title}>
            <Container sx={{ marginY: 2 }}>
                <Card sx={{ padding: 2 }}>
                    <Typography>
                        The {title} tool has moved to{" "}
                        <Link to={site + basePath + path}>{basePath + path}</Link>.
                    </Typography>
                </Card>
            </Container>
        </Layout>
    );
};
