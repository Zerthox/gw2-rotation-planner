import {useMemo} from "react";
import {useStaticQuery, graphql} from "gatsby";
import {sortBy} from "lodash";
import {Profession, SkillData, SkillSlot} from "../data";

export interface SkillSection {
    name: string;
    profession: Profession;
    skills: SkillData[];
}

interface DataNode {
    name: string;
    fields: {
        profession: Profession;
        skills: SkillData[];
    }
}

interface QueryData {
    allDataYaml: {
        nodes: DataNode[];
    }
}

const useData = () => useStaticQuery<QueryData>(graphql`
    query ProfessionData {
        allDataYaml {
            nodes {
                name
                fields {
                    profession
                    skills {
                        id
                        name
                        slot
                    }
                }
            }
        }
    }
`);

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
    SkillSlot.Elite
];

export const useAllSkillSections = (): SkillSection[] => {
    const data = useData();
    return useMemo(() => data.allDataYaml.nodes
        .map((({name, fields: {profession, skills}}) => {
            return {
                name,
                profession,
                skills: sortBy(skills, (skill) => slotOrder.indexOf(skill.slot))
            };
        })),
    [data]);
};

export const useSkillSectionsForProfession = (prof: Profession): SkillSection[] => {
    const sections = useAllSkillSections();
    return useMemo(() => sections.filter((entry) => entry.profession === prof), [sections, prof]);
};

export const useAllSkills = (): SkillData[] => {
    const sections = useAllSkillSections();
    return useMemo(() => sections.reduce((acc, section) => {
        acc.push(...section.skills);
        return acc;
    }, []), [sections]);
};
