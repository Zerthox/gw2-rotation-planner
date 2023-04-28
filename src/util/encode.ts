import {encodeBase64, decodeBase64} from "./base64";
import {Row} from "../store/timeline";

const VERSION = "1";

const u24ToBytes = (data: number[]): Uint8Array => {
    const bytes = new Uint8Array(data.length * 3);

    for (let i = 0; i < data.length; i++) {
        bytes.set([
            data[i] & 0x000ff,
            (data[i] & 0x00ff00) >> 8,
            (data[i] & 0xff0000) >> 16
        ], i * 3);
    }

    return bytes;
};

const u24FromBytes = (bytes: Uint8Array): number[] => {
    if (bytes.length % 3 !== 0) {
        throw Error(`Illegal bytes length: ${bytes.length}`);
    }

    const result: number[] = [];
    for (let i = 0; i < bytes.length; i += 3) {
        result.push(
            bytes[i]
            + (bytes[i + 1] << 8)
            + (bytes[i + 2] << 16)
        );
    }

    return result;
};

export const encodeShare = (rows: Row[]): string => VERSION + rows.map((row) => {
    const name = encodeURIComponent(row.name);
    const skills = encodeBase64(u24ToBytes(row.skills));

    return `${name};${skills}`;
}).join(";");

export const decodeShare = (data: string): Row[] => {
    if (data[0] !== VERSION) {
        throw Error(`Unsupported version: ${data[0]}`);
    }
    data = data.slice(1);

    const result: Row[] = [];

    let offset = 0;
    while (offset < data.length) {
        const nameEnd = data.indexOf(";", offset);
        let name = data.slice(offset, nameEnd);
        try {
            name = decodeURIComponent(name);
        } catch {
            // error likely means already decoded
        }

        const index = data.indexOf(";", nameEnd + 1);
        const skillsEnd = index > 0 ? index : data.length;
        const skills = u24FromBytes(decodeBase64(data.slice(nameEnd + 1, skillsEnd)));

        result.push({name, skills});
        offset = skillsEnd + 1;
    }

    return result;
};
