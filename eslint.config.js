import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import nextConfig from "eslint-config-next"

export default [
  {
    ignores: [".next/"],
  },
  {
    files: [
      "components/**/*.{js,ts,jsx,tsx,mdx}",
      "app/*.{js,ts,jsx,tsx,mdx}",
    ],
    rules: {
      indent: ['error', 2]
    },
    settings: {
      react: {
        version: "detect"
      }
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {languageOptions: { globals: globals.node }},
];