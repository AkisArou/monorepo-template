import inquirer from "inquirer";
import path from "node:path";

import type { App, Lib } from "../cli-options";
import { getFirstLevelDirectoryNames, normalizePath } from "../util/fs-util";
import { inquireListInput, inquireSimpleInput } from "../util/inquire";

async function inquireFuzzyPathDirectory(
  rootPath: string,
  type: "app" | "lib"
): Promise<string> {
  const resultKey = "path";
  const result: { path: string } = await inquirer.prompt([
    {
      type: "fuzzypath",
      name: resultKey,
      // TODO for now it is optimized for ts-react-web apps/libs
      // TODO pass it as parameter when it is time to
      excludeFilter: (nodePath: string) =>
        nodePath.includes("package.json") ||
        nodePath.includes("node_modules") ||
        nodePath.includes("src") ||
        nodePath.includes("kotlin") ||
        nodePath.includes("java") ||
        nodePath.includes("android"),
      rootPath,
      message: `Select a target directory for your ${type}:`,
      suggestOnly: false
    }
  ]);

  const path: string = result[resultKey];

  return normalizePath(path);
}

export async function inquireReactAppGenerationInputs(selectedOption: App) {
  const directory = await inquireFuzzyPathDirectory(
    `apps/${selectedOption.scope}`,
    "app"
  );

  return {
    name: await inquireName("app"),
    directory
  };
}

export async function inquireLibGenerationInputs(selectedOption: Lib) {
  const scopes = getFirstLevelDirectoryNames("packages");

  const selectedScope = await inquireListInput(
    "Select a scope for your lib:",
    scopes
  );

  const directory = await inquireFuzzyPathDirectory(
    `packages/${selectedScope}`,
    "lib"
  );

  return {
    name: await inquireName("lib"),
    directory: path.join("packages", directory)
  };
}

export async function inquireReactLibGenerationInputs(selectedOption: Lib) {
  const libGenerationInputs = await inquireLibGenerationInputs(selectedOption);

  return {
    ...libGenerationInputs
  };
}

async function inquireName(type: "app" | "lib"): Promise<string> {
  return inquireSimpleInput(`What is the name of the ${type}?`);
}
