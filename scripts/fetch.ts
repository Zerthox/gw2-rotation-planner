import path from "path";
import {promises as fs, existsSync} from "fs";
import {stdout} from "process";
import {sortBy, uniqBy} from "lodash";
import {professions, fetchProfession, fetchSpecializations, fetchSkills, ProfessionKind, Skill, WeaponType, SkillSlot} from "../api";
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

const slotOrder = [
    SkillSlot.Profession1,
    SkillSlot.Profession2,
    SkillSlot.Profession3,
    SkillSlot.Profession4,
    SkillSlot.Profession5,
    SkillSlot.Profession6,
    SkillSlot.Profession7,
    SkillSlot.Weapon1,
    SkillSlot.Weapon2,
    SkillSlot.Weapon3,
    SkillSlot.Weapon4,
    SkillSlot.Weapon5,
    SkillSlot.Heal,
    SkillSlot.Utility,
    SkillSlot.Elite,
    SkillSlot.Downed1,
    SkillSlot.Downed2,
    SkillSlot.Downed3,
    SkillSlot.Downed4,
    SkillSlot.Pet
];

// TODO: api is difficult to use because of multiple versions of skills (catalyst f5) and missing skills (fb tome skills)
// TODO: manual adjustment is required anyway, maybe just do skill data manually
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

    // fetch additional skills
    await addAdditionalSkillsTo(skills);

    // sort skills
    const sortedSkills = sortBy(skills,
        (skill) => slotOrder.indexOf(skill.slot),
        (skill) => skill.specialization ?? -1,
    );

    // remove duplicates
    const uniqueSkills = uniqBy(sortedSkills, (skill) => skill.id);

    return {
        name: profData.name as ProfessionKind,
        icon: profData.icon,
        elites: specs.filter((spec) => spec.elite).map(({id, name}) => ({id, name})),
        weapons,
        skills: uniqueSkills.map((skill) => toSkillData(skill))
    };
}

/** Fetches & inserts all flip, bundle, transform or chain skills of the initial skills. */
async function addAdditionalSkillsTo(skills: Skill[]): Promise<void> {
    // skill id to parent id mapping
    const parents = {} as Record<number, number>;

    // helper to insert skills after parent skills
    const insertAfterParents = (...newSkills: Skill[]) => {
        for (const skill of newSkills) {
            const parentIndex = skills.findIndex((entry) => entry.id === parents[skill.id]);
            skills.splice(parentIndex + 1, 0, skill);
        }
    };

    // fetch flip, bundle & transform skills
    const additionalSkills = skills.reduce((acc, skill) => {
        // find ids
        const ids = [] as number[];
        if (skill.flip_skill && !skill.next_chain) { // ignore skills chains for now
            ids.push(skill.flip_skill);
        }
        if (skill.bundle_skills) {
            ids.push(...skill.bundle_skills);
        }
        if (skill.transform_skills) {
            ids.push(...skill.transform_skills);
        }

        // save parent
        for (const id of ids) {
            parents[id] = skill.id;
        }

        // add to accumulator
        acc.push(...ids);
        return acc;
    }, [] as number[]);

    // insert skills
    insertAfterParents(...await fetchSkills(additionalSkills));

    // worklist for chain skills
    const genWorklist = (worklist: Skill[]) => {
        // some skills (e.g. jade buster cannon) have themselves as chain!
        return worklist
            .filter((skill) => skill.next_chain && skill.id !== skill.next_chain)
            .map((skill) => {
                parents[skill.next_chain] = skill.id;
                return skill.next_chain;
            });
    };
    let worklist = genWorklist(skills);

    while (worklist.length > 0) {
        const newSkills = await fetchSkills(worklist);
        insertAfterParents(...newSkills);
        worklist = genWorklist(newSkills);
    }
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
