import {useStaticQuery, graphql} from "gatsby";
import {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot} from "../../api";

export {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot} from "../../api";

export interface ProfessionData {
    name: Profession;
    elites: EliteData[];
    weapons: WeaponType[];
    skills: SkillData[];
}

export interface EliteData {
    id: number;
    name: string;
}

export interface SkillData {
    id: number;
    name: string;
    type?: SkillType;
    professions: Profession[];
    specialization?: number;
    weaponType?: WeaponType;
    slot?: SkillSlot;
    attunement?: string;
    dualWield?: WeaponType;
    flipSkill?: number;
    nextChain?: number;
    prevChain?: number;
    transformSkills?: number[];
    bundleSkills?: number[];
    toolbeltSkill?: number;
}

interface QueryData {
    allDataJson: {
        nodes: ProfessionData[];
    };
}

const useData = () => useStaticQuery<QueryData>(graphql`
    query ProfessionData {
        allDataJson {
            nodes {
                name
                elites {
                    id
                    name
                }
                weapons
                skills {
                    id
                    name
                    type
                    professions
                    specialization
                    weaponType
                    slot
                    attunement
                    dualWield
                    flipSkill
                    nextChain
                    prevChain
                    transformSkills
                    bundleSkills
                    toolbeltSkill
                }
            }
        }
    }
`);

export const useProfessionsData = (): ProfessionData[] => useData().allDataJson.nodes;

export const useProfessionData = (prof: Profession): ProfessionData => useProfessionsData().find(({name}) => name === prof);

export const useSkillData = (prof: Profession, id: number): SkillData => useProfessionData(prof).skills.find((skill) => skill.id === id);

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot.startsWith("Profession");
