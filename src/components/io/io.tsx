import React, { useState } from "react";
import { Stack, StackProps, Button } from "@mui/material";
import { ImportExport, Share } from "@mui/icons-material";
import { ExportModal } from "./import-export";
import { ShareModal } from "./share";
import { useTheme } from "../../store/settings";
import { isDark } from "../../themes";

export type IOButtonsProps = StackProps;

export const IOButtons = (props: IOButtonsProps): JSX.Element => {
    const theme = useTheme();
    const [exportShown, setExportShown] = useState(false);
    const [shareShown, setShareShown] = useState(false);

    const buttonColor = isDark(theme) ? "primary" : "inherit";

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
