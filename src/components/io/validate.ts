import Ajv from "ajv/dist/jtd";

export const ajv = new Ajv();

export interface RowSchema {
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

export const validate = ajv.compile<RowSchema[]>(rowSchema);
