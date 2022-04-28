import {useMemo} from "react";
import {sortBy} from "lodash";
import {useStaticQuery, graphql} from "gatsby";
import {SkillSection, SkillData, SkillSectionType} from "../data";
import {getPolyfillSkill, commonSkills, PolyfillSkill} from "../data/polyfill";

interface QueryData {
    allSkillData: {
        nodes: SkillSection[];
    };
}

const useData = () => useStaticQuery<QueryData>(graphql`
    query SkillData {
        allSkillData {
            nodes {
                name
                profession
                type
                skills {
                    id
                    name
                    slot
                }
            }
        }
    }
`);

const sectionOrder = [
    SkillSectionType.Profession,
    SkillSectionType.Weapon,
    SkillSectionType.Bundle,
    SkillSectionType.Slot
];

export const useAllSkillSections = (): SkillSection[] => {
    const data = useData().allSkillData.nodes;
    return useMemo(() => [
        {
            name: "Common",
            profession: null,
            type: null,
            skills: commonSkills
        },
        ...sortBy(data, (section) => sectionOrder.indexOf(section.type))
    ], [data]);
};

export const useAllSkills = (): SkillData[] => {
    const sections = useAllSkillSections();
    return useMemo(() => sections.reduce((acc, section) => {
        acc.push(...section.skills);
        return acc;
    }, []), [sections]);
};

export const useSkill = (id: number): SkillData => {
    const all = useAllSkills();
    return all.find((skill) => skill.id === id);
};

export const usePolyfillSkill = (id: number): PolyfillSkill => useMemo(() => getPolyfillSkill(id), [id]);
