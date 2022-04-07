import {useStaticQuery, graphql} from "gatsby";
import {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot, Attunement} from "../../api";

export {ProfessionKind as Profession, WeaponType, SkillType, SkillSlot, Attunement} from "../../api";

export interface ProfessionData {
    name: Profession;
    icon: string;
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
    attunement?: Attunement;
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

// TODO: do we want to fetch data from api at runtime instead?
const useData = () => useStaticQuery<QueryData>(graphql`
    query ProfessionData {
        allDataJson {
            nodes {
                name
                icon
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

export const useAllSkillsData = (): SkillData[] => useProfessionsData().reduce((acc, entry) => [...acc, ...entry.skills], []);

export const isWeaponSlot = (slot: SkillSlot): boolean => slot.startsWith("Weapon");

export const isProfessionSlot = (slot: SkillSlot): boolean => slot.startsWith("Profession");
