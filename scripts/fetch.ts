import path from "path";
import {promises as fs, existsSync} from "fs";
import {stdout} from "process";
import {professions, fetchProfession, fetchSpecializations, fetchSkills, ProfessionKind, Skill, WeaponType} from "../api";
import {ProfessionData, SkillData} from "../src/hooks/data";

const outPath = path.join(__dirname, "../src/data");

(async () => {
    // create output dir
    if (!existsSync(outPath)) {
        await fs.mkdir(outPath);
    }

    for (const prof of professions) {
        stdout.write(`Fetching ${prof} data... `);

        const data = await fetchDataForProfession(prof);
        await saveJson(path.join(outPath, `${prof.toLowerCase()}.json`), data),

        stdout.cursorTo(0);
        stdout.write(`Fetching ${prof} data... done!\n`);
    }
})();

async function fetchDataForProfession(prof: ProfessionKind): Promise<ProfessionData> {
    const profData = await fetchProfession(prof);

    const specs = await fetchSpecializations(profData.specializations);
    const weapons = Object.keys(profData.weapons) as WeaponType[];
    const weaponSkills = Object.values(profData.weapons)
        .map((weapon) => weapon.skills.map((skill) => skill.id))
        .flat();
    const otherSkills = profData.skills.map((skill) => skill.id);

    // fetch initial skills
    const skills = await fetchSkills([...weaponSkills, ...otherSkills]);

    // fetch flip, bundle & transform skills
    const additionalSkills = skills.reduce((acc, skill) => {
        if (skill.flip_skill && !skill.next_chain) { // ignore skills chains for now
            acc.push(skill.flip_skill);
        }
        if (skill.bundle_skills) {
            acc.push(...skill.bundle_skills);
        }
        if (skill.transform_skills) {
            acc.push(...skill.transform_skills);
        }

        return acc;
    }, []);
    skills.push(...await fetchSkills(additionalSkills));

    // fetch chain skills
    skills.push(...await fetchSkillChains(skills));

    return {
        name: profData.name as ProfessionKind,
        icon: profData.icon,
        elites: specs.filter((spec) => spec.elite).map(({id, name}) => ({id, name})),
        weapons,
        skills: skills.map((skill) => toSkillData(skill))
    };
}

/** Fetches all skills in the skill chains of the initial skills. */
async function fetchSkillChains(initial: Skill[]): Promise<Skill[]> {
    const result = [] as Skill[];

    const genWorklist = (worklist: Skill[]) => {
        // some skills (e.g. jade buster cannon) have themselves as chain!
        return worklist
            .filter((skill) => skill.next_chain && skill.id !== skill.next_chain)
            .map((skill) => skill.next_chain);
    };

    let worklist = genWorklist(initial);

    while (worklist.length > 0) {
        const skills = await fetchSkills(worklist);
        result.push(...skills);
        worklist = genWorklist(skills);
    }

    return result;
}

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

async function saveJson(path: string, data: unknown) {
    await fs.writeFile(path, JSON.stringify(data, null, 4));
}
