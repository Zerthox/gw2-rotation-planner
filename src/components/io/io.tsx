import React, { useState } from "react";
import { Stack, StackProps, Button, useColorScheme } from "@mui/material";
import { ImportExport, Share } from "@mui/icons-material";
import { ExportModal } from "./import-export";
import { ShareModal } from "./share";

export type IOButtonsProps = StackProps;

export const IOButtons = (props: IOButtonsProps): JSX.Element => {
    const { mode } = useColorScheme();
    const [exportShown, setExportShown] = useState(false);
    const [shareShown, setShareShown] = useState(false);

    const buttonColor = mode === "dark" ? "primary" : "inherit";

    return (
        <Stack direction="row" alignItems="center" spacing={1} {...props}>
            <Button
                variant="outlined"
                color={buttonColor}
                startIcon={<ImportExport />}
                onClick={() => setExportShown(true)}
            >
                Import / Export
            </Button>
            <Button
                variant="outlined"
                color={buttonColor}
                startIcon={<Share />}
                onClick={() => setShareShown(true)}
            >
                Share
            </Button>
            <ExportModal open={exportShown} onClose={() => setExportShown(false)} />
            <ShareModal open={shareShown} onClose={() => setShareShown(false)} />
        </Stack>
    );
};
