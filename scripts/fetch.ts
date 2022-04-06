import path from "path";
import {promises as fs, existsSync} from "fs";
import {stdout} from "process";
import {professions, fetchProfession, fetchSpecializations, fetchSkills, ProfessionKind, Skill, WeaponType} from "../api";
import {ProfessionData, SkillData} from "../src/hooks/data";

const outPath = path.join(__dirname, "../src/data");

(async () => {
    if (!existsSync(outPath)) {
        await fs.mkdir(outPath);
    }

    for (const prof of professions) {
        stdout.write(`Fetching ${prof} data... `);
        const profData = await fetchProfession(prof);

        const specs = await fetchSpecializations(profData.specializations);
        const weapons = Object.keys(profData.weapons) as WeaponType[];
        const weaponSkills = Object.values(profData.weapons)
            .map((weapon) => weapon.skills.map((skill) => skill.id))
            .flat();
        const otherSkills = profData.skills.map((skill) => skill.id);

        const skills = await fetchSkills([...weaponSkills, ...otherSkills]);

        await saveJson(path.join(outPath, `${prof.toLowerCase()}.json`), {
            name: profData.name as ProfessionKind,
            elites: specs.filter((spec) => spec.elite).map(({id, name}) => ({id, name})),
            weapons,
            skills: skills.map((skill) => toSkillData(skill))
        });

        stdout.cursorTo(0);
        stdout.write(`Fetching ${prof} data... done!\n`);
    }
})();

function toSkillData({
    id,
    name,
    type,
    professions,
    specialization,
    weapon_type: weaponType,
    slot,
    attunement,
    dual_wield: dualWield,
    flip_skill: flipSkill,
    next_chain: nextChain,
    prev_chain: prevChain,
    transform_skills: transformSkills,
    bundle_skills: bundleSkills,
    toolbelt_skill: toolbeltSkill
}: Skill): SkillData {
    return {
        id,
        name,
        professions,
        specialization,
        type,
        weaponType: weaponType === "None" ? undefined : weaponType,
        slot,
        attunement,
        dualWield,
        flipSkill,
        nextChain,
        prevChain,
        transformSkills,
        bundleSkills,
        toolbeltSkill
    };
}

async function saveJson(path: string, data: ProfessionData) {
    await fs.writeFile(path, JSON.stringify(data, null, 4));
}
