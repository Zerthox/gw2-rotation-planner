import React, {useState} from "react";
import {Stack, StackProps, Button, Tooltip} from "@mui/material";
import {ImportExport, Share} from "@mui/icons-material";
import {ExportModal} from "./export";

export type IOButtonsProps = StackProps;

export const IOButtons = (props: IOButtonsProps): JSX.Element => {
    const [visible, setVisible] = useState(false);

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            {...props}
        >
            <Button
                variant="outlined"
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
