import { fromUint8Array, toUint8Array } from "js-base64";

export const encodeBase64 = (bytes: Uint8Array): string => fromUint8Array(bytes, true);

export const decodeBase64 = (base64: string): Uint8Array => toUint8Array(base64);
