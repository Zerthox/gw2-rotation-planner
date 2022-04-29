import React, {useMemo, useState} from "react";
import {Container, Stack, Card, TextField, Typography} from "@mui/material";
import {css} from "@emotion/css";
import {CustomComponent} from "@discretize/gw2-ui-new";
import {Layout} from "../../components/layout";

const initialJson = `{
  "name": "Custom Skill",
  "professions": [],
  "description": "Does nothing.",
  "icon": "https://wiki.guildwars2.com/images/5/5f/Monster_Skill.png",
  "categories": [],
  "facts": [
    {
      "text": "Recharge",
      "type": "Recharge",
      "icon": "https://render.guildwars2.com/file/D767B963D120F077C3B163A05DC05A7317D7DB70/156651.png",
      "value": 10
    }
  ]
}`;

const SkillViewer = (): JSX.Element => {
    const [json, setJson] = useState(initialJson);
    const data = useMemo(() => {
        try {
            return JSON.parse(json);
        } catch {
            return null;
        }
    }, [json]);

    const isValid = data && data.name && data.icon && data.professions;

    return (
        <Layout title="Skill Viewer">
            <Container sx={{marginY: 2}}>
                <Card sx={{padding: 2}}>
                    <Stack direction="column">
                        <Stack direction="row" alignItems="center" spacing={1} padding={2}>
                            <Typography>Preview:</Typography>
                            {isValid ? (
                                <CustomComponent
                                    type="Skill"
                                    data={data}
                                    disableText
                                    className={css`font-size: 3em`}
                                />
                            ) : (
                                <Typography color="error">Invalid JSON.</Typography>
                            )}
                        </Stack>
                        <TextField
                            value={json}
                            error={!isValid}
                            onChange={({target}) => setJson(target.value)}
                            multiline
                            fullWidth
                            rows={24}
                            inputProps={{
                                style: {
                                    whiteSpace: "nowrap",
                                    fontFamily: "Source Code Pro, monospace"
                                }
                            }}
                        />
                    </Stack>
                </Card>
            </Container>
        </Layout>
    );
};

export default SkillViewer;
