import {useMemo} from "react";
import {useStaticQuery, graphql} from "gatsby";
import {Profession, SkillData} from "../data";

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

export const useAllSkillSections = (): SkillSection[] => {
    const data = useData();
    return useMemo(() => data.allDataYaml.nodes
        .map((({name, fields: {profession, skills}}) => ({name, profession, skills}))),
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
