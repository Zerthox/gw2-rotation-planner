import {useMemo} from "react";
import {useStaticQuery, graphql} from "gatsby";
import {Profession, SkillData} from "../data";

export interface SkillSection {
    name: string;
    profession: Profession;
    type: string;
    skills: SkillData[];
}

interface QueryData {
    allSkillData: {
        nodes: SkillSection[];
    }
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

export const useAllSkillSections = (): SkillSection[] => useData().allSkillData.nodes;

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
