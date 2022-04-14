import React, {useState} from "react";
import {Stack, StackProps, Button, Tooltip} from "@mui/material";
import {ImportExport, Share} from "@mui/icons-material";
import {ExportModal} from "./export";
import {useDarkMode} from "../../store/theme";

export type IOButtonsProps = StackProps;

export const IOButtons = (props: IOButtonsProps): JSX.Element => {
    const darkMode = useDarkMode();
    const [visible, setVisible] = useState(false);

    const buttonColor = darkMode ? "primary" : "inherit";

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            {...props}
        >
            <Button
                variant="outlined"
                color={buttonColor}
                startIcon={<ImportExport/>}
                onClick={() => setVisible(true)}
            >Import / Export</Button>
            <Tooltip
                disableInteractive
                title="Work in progress..."
            >
                <span>
                    <Button
                        variant="outlined"
                        color={buttonColor}
                        startIcon={<Share/>}
                        disabled
                    >Share</Button>
                </span>
            </Tooltip>
            <ExportModal
                open={visible}
                onClose={() => setVisible(false)}
            ></ExportModal>
        </Stack>
    );
};
