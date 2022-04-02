import {nanoid} from "nanoid/non-secure";

export type Id = string;

export const createId = (type: string): Id => `${type}-${nanoid()}`;
