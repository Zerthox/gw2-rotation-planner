import Ajv from "ajv/dist/jtd";

export const ajv = new Ajv();

export interface RowData {
    name: string;
    skills: number[];
}

export const rowSchema = {
    elements: {
        properties: {
            name: {type: "string"},
            skills: {
                elements: {type: "uint32"}
            }
        }
    }
};

export const validate = ajv.compile<RowData[]>(rowSchema);
