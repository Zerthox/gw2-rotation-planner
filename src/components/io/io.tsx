import React, {useState} from "react";
import {Stack, StackProps, Button} from "@mui/material";
import {ImportExport, Share} from "@mui/icons-material";
import {ExportModal} from "./export";
import {ShareModal} from "./share";
import {useDarkMode} from "../../store/theme";

export type IOButtonsProps = StackProps;

export const IOButtons = (props: IOButtonsProps): JSX.Element => {
    const darkMode = useDarkMode();
    const [exportShown, setExportShown] = useState(false);
    const [shareShown, setShareShown] = useState(false);

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
                onClick={() => setExportShown(true)}
            >Import / Export</Button>
            <Button
                variant="outlined"
                color={buttonColor}
                startIcon={<Share/>}
                onClick={() => setShareShown(true)}
            >Share</Button>
            <ExportModal
                open={exportShown}
                onClose={() => setExportShown(false)}
            />
            <ShareModal
                open={shareShown}
                onClose={() => setShareShown(false)}
            />
        </Stack>
    );
};
