import { createTheme, Theme } from "@mui/material";
import { cyan, red, blue, green, yellow, orange, pink } from "@mui/material/colors";

export const enum Accent {
    Default = "default",
    GuildWars2 = "gw2",
    HeartOfThorns = "hot",
    PathOfFire = "pof",
    EndOfDragons = "eod",
    SecretsOfTheObscure = "soto",
    JanthirWilds = "jw",
    VisionsOfEternity = "voe",
}

type ExpansionAccent = Exclude<Accent, Accent.Default>;

const currentAccent: ExpansionAccent = Accent.VisionsOfEternity;

const withDefault = <T>(data: Record<ExpansionAccent, T>): Record<Accent, T> => ({
    [Accent.Default]: data[currentAccent],
    ...data,
});

export const accentNames: Record<Accent, string> = {
    [Accent.Default]: "Default",
    [Accent.GuildWars2]: "Guild Wars 2",
    [Accent.HeartOfThorns]: "Heart of Thorns",
    [Accent.PathOfFire]: "Path of Fire",
    [Accent.EndOfDragons]: "End of Dragons",
    [Accent.SecretsOfTheObscure]: "Secrets of the Obscure",
    [Accent.JanthirWilds]: "Janthir Wilds",
    [Accent.VisionsOfEternity]: "Visions of Eternity",
};

export const accentColors: Record<Accent, string> = withDefault({
    [Accent.GuildWars2]: red[800],
    [Accent.HeartOfThorns]: green[800],
    [Accent.PathOfFire]: pink[800],
    [Accent.EndOfDragons]: cyan[800],
    [Accent.SecretsOfTheObscure]: yellow[700],
    [Accent.JanthirWilds]: blue[800],
    [Accent.VisionsOfEternity]: orange[800],
});

export const accentLogos: Record<Accent, string> = withDefault({
    [Accent.GuildWars2]: "https://wiki.guildwars2.com/images/d/db/Guild_Wars_2_logo.svg",
    [Accent.HeartOfThorns]:
        "https://wiki.guildwars2.com/images/5/52/HoT_Texture_Centered_Trans.png",
    [Accent.PathOfFire]:
        "https://wiki.guildwars2.com/images/0/0e/GW2-PoF_Texture_Centered_Trans.png",
    [Accent.EndOfDragons]: "https://wiki.guildwars2.com/images/c/cc/EoD_Texture_Trans.png",
    [Accent.SecretsOfTheObscure]:
        "https://wiki.guildwars2.com/images/4/44/Secrets_of_the_Obscure_logo.png",
    [Accent.JanthirWilds]: "https://wiki.guildwars2.com/images/6/60/Janthir_Wilds_logo.png",
    [Accent.VisionsOfEternity]:
        "https://wiki.guildwars2.com/images/c/cd/Visions_of_Eternity_logo.png",
});

export const getTheme = (accent: Accent): Theme => {
    return createTheme({
        colorSchemes: {
            dark: {
                palette: {
                    primary: { main: accentColors[accent] },
                },
            },
            light: {
                palette: {
                    primary: { main: accentColors[accent] },
                },
            },
        },
        cssVariables: {
            colorSchemeSelector: "class",
        },
    });
};
