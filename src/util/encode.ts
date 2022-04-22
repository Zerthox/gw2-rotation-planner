import {Row} from "../store/timeline";

const toBase64 = (array: Uint32Array): string => (
    window.btoa(String.fromCharCode.apply(null, new Uint8Array(array.buffer)))
);

const fromBase64 = (base64: string): Uint32Array => {
    const data = window.atob(base64);
    const array = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i++) {
        array[i] = data.charCodeAt(i);
    }

    return new Uint32Array(array.buffer);
};

export const encodeShare = (rows: Row[]): string => rows.map((row) => {
    const name = encodeURIComponent(row.name);
    const skills = toBase64(Uint32Array.from(row.skills));

    return `${name};${skills}`;
}).join(";");

export const decodeShare = (data: string): Row[] => {
    const result: Row[] = [];

    let offset = 0;
    while (offset < data.length) {
        const nameEnd = data.indexOf(";", offset);
        const name = decodeURIComponent(data.slice(offset, nameEnd));

        const index = data.indexOf(";", nameEnd + 1);
        const skillsEnd = index > 0 ? index : data.length;
        const skills = Array.from(fromBase64(data.slice(nameEnd + 1, skillsEnd)));

        result.push({name, skills});
        offset = skillsEnd + 1;
    }

    return result;
};
