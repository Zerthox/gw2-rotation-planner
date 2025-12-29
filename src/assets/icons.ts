import { Profession, EliteSpecialization } from "../data";

export const gw2Logo = "https://wiki.guildwars2.com/images/c/cd/Visions_of_Eternity_logo.png";

export const iconSize = 20;

export const professionIcons: Record<Profession, string> = {
    [Profession.Elementalist]:
        "https://wiki.guildwars2.com/images/4/4e/Elementalist_icon_small.png",
    [Profession.Engineer]: "https://wiki.guildwars2.com/images/0/07/Engineer_icon_small.png",
    [Profession.Guardian]: "https://wiki.guildwars2.com/images/c/c7/Guardian_icon_small.png",
    [Profession.Mesmer]: "https://wiki.guildwars2.com/images/7/79/Mesmer_icon_small.png",
    [Profession.Necromancer]: "https://wiki.guildwars2.com/images/1/10/Necromancer_icon_small.png",
    [Profession.Ranger]: "https://wiki.guildwars2.com/images/1/1e/Ranger_icon_small.png",
    [Profession.Revenant]: "https://wiki.guildwars2.com/images/4/4c/Revenant_icon_small.png",
    [Profession.Thief]: "https://wiki.guildwars2.com/images/a/a0/Thief_icon_small.png",
    [Profession.Warrior]: "https://wiki.guildwars2.com/images/4/45/Warrior_icon_small.png",
};

export const specializationIcons: Record<Profession | EliteSpecialization | "NPC", string> = {
    ...professionIcons,
    [EliteSpecialization.Dragonhunter]:
        "https://wiki.guildwars2.com/images/5/5d/Dragonhunter_icon_small.png",
    [EliteSpecialization.Firebrand]:
        "https://wiki.guildwars2.com/images/0/0e/Firebrand_icon_small.png",
    [EliteSpecialization.Willbender]:
        "https://wiki.guildwars2.com/images/6/64/Willbender_icon_small.png",
    [EliteSpecialization.Luminary]:
        "https://wiki.guildwars2.com/images/7/7b/Luminary_icon_small.png",
    [EliteSpecialization.Berserker]:
        "https://wiki.guildwars2.com/images/a/a8/Berserker_icon_small.png",
    [EliteSpecialization.Spellbreaker]:
        "https://wiki.guildwars2.com/images/0/08/Spellbreaker_icon_small.png",
    [EliteSpecialization.Bladesworn]:
        "https://wiki.guildwars2.com/images/c/cf/Bladesworn_icon_small.png",
    [EliteSpecialization.Paragon]: "https://wiki.guildwars2.com/images/1/13/Paragon_icon_small.png",
    [EliteSpecialization.Scrapper]:
        "https://wiki.guildwars2.com/images/7/7d/Scrapper_icon_small.png",
    [EliteSpecialization.Holosmith]:
        "https://wiki.guildwars2.com/images/a/aa/Holosmith_icon_small.png",
    [EliteSpecialization.Mechanist]:
        "https://wiki.guildwars2.com/images/6/6d/Mechanist_icon_small.png",
    [EliteSpecialization.Amalgam]: "https://wiki.guildwars2.com/images/d/d0/Amalgam_icon_small.png",
    [EliteSpecialization.Druid]: "https://wiki.guildwars2.com/images/9/9b/Druid_icon_small.png",
    [EliteSpecialization.Soulbeast]:
        "https://wiki.guildwars2.com/images/6/6a/Soulbeast_icon_small.png",
    [EliteSpecialization.Untamed]: "https://wiki.guildwars2.com/images/2/2d/Untamed_icon_small.png",
    [EliteSpecialization.Galeshot]:
        "https://wiki.guildwars2.com/images/a/a7/Galeshot_icon_small.png",
    [EliteSpecialization.Daredevil]:
        "https://wiki.guildwars2.com/images/f/f3/Daredevil_icon_small.png",
    [EliteSpecialization.Deadeye]: "https://wiki.guildwars2.com/images/7/70/Deadeye_icon_small.png",
    [EliteSpecialization.Specter]: "https://wiki.guildwars2.com/images/6/61/Specter_icon_small.png",
    [EliteSpecialization.Antiquary]:
        "https://wiki.guildwars2.com/images/d/d1/Antiquary_icon_small.png",
    [EliteSpecialization.Tempest]: "https://wiki.guildwars2.com/images/5/58/Tempest_icon_small.png",
    [EliteSpecialization.Weaver]: "https://wiki.guildwars2.com/images/c/c3/Weaver_icon_small.png",
    [EliteSpecialization.Catalyst]:
        "https://wiki.guildwars2.com/images/c/c5/Catalyst_icon_small.png",
    [EliteSpecialization.Evoker]: "https://wiki.guildwars2.com/images/e/e3/Evoker_icon_small.png",
    [EliteSpecialization.Chronomancer]:
        "https://wiki.guildwars2.com/images/e/e0/Chronomancer_icon_small.png",
    [EliteSpecialization.Mirage]: "https://wiki.guildwars2.com/images/c/c8/Mirage_icon_small.png",
    [EliteSpecialization.Virtuoso]:
        "https://wiki.guildwars2.com/images/7/77/Virtuoso_icon_small.png",
    [EliteSpecialization.Troubadour]:
        "https://wiki.guildwars2.com/images/f/f4/Troubadour_icon_small.png",
    [EliteSpecialization.Reaper]: "https://wiki.guildwars2.com/images/9/93/Reaper_icon_small.png",
    [EliteSpecialization.Scourge]: "https://wiki.guildwars2.com/images/e/e8/Scourge_icon_small.png",
    [EliteSpecialization.Harbinger]:
        "https://wiki.guildwars2.com/images/1/1d/Harbinger_icon_small.png",
    [EliteSpecialization.Ritualist]:
        "https://wiki.guildwars2.com/images/f/f9/Ritualist_icon_small.png",
    [EliteSpecialization.Herald]: "https://wiki.guildwars2.com/images/3/39/Herald_icon_small.png",
    [EliteSpecialization.Renegade]:
        "https://wiki.guildwars2.com/images/b/be/Renegade_icon_small.png",
    [EliteSpecialization.Vindicator]:
        "https://wiki.guildwars2.com/images/6/6d/Vindicator_icon_small.png",
    [EliteSpecialization.Conduit]: "https://wiki.guildwars2.com/images/a/a1/Conduit_icon_small.png",
    NPC: "https://wiki.guildwars2.com/images/f/fd/Event_flag_%28tango_icon%29.png",
};

export const anyTangoIcon = "https://wiki.guildwars2.com/images/8/86/Any_tango_icon_20px.png";
