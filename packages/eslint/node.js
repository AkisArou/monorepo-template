const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use server side
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript"
  ].map(require.resolve),
  plugins: ["import"],
  parserOptions: {
    project,
    ecmaFeatures: 2022
  },
  env: {
    node: true,
    es6: true
  },
  settings: {
    "import/resolver": {
      typescript: {
        project
      }
    }
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true
      }
    }
  ],
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { includeInternal: true, includeTypes: true }
    ]
  }
};
