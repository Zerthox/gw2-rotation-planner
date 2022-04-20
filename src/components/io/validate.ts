import Ajv from "ajv/dist/jtd";
import {Row} from "../../store/timeline";

export const ajv = new Ajv();

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

export const validate = ajv.compile<Row[]>(rowSchema);
