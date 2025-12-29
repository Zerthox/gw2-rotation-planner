import path from "node:path";
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
    eslint.configs.recommended,
    tseslint.configs.recommended,
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    {
        plugins: { tseslint },
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        settings: {
            react: { version: "detect" },
        },
        rules: {
            "no-multiple-empty-lines": ["warn", { max: 1 }],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/explicit-module-boundary-types": "warn",
        },
    },
    includeIgnoreFile(path.join(import.meta.dirname, ".gitignore")),
]);
