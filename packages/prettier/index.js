const { fileURLToPath } = require( "node:url");

/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */
module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
  ],
  // tailwindConfig: fileURLToPath(
  //   new URL("../../tooling/tailwind/index.ts", import.meta.url),
  // ),
  importOrder: ["^@packages/(.*)$", "^[./]"],
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  jsxSingleQuote: false,
  printWidth: 80,
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderTypeScriptVersion: "4.4.0",
};

