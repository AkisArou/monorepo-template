import { execSync } from "child_process";

import { TypeScriptLib } from "../../cli-options";
import { inquireLibGenerationInputs } from "../project-input";

export async function createTSLib(selectedOption: typeof TypeScriptLib) {
  const { name: workspaceName, directory } = await inquireLibGenerationInputs(
    selectedOption
  );

  console.log({ workspaceName, directory });

  // const importPath =
  //   selectedScope === libScopes.client || selectedScope === libScopes.packages
  //     ? `@packages/${directory
  //         .replace("client/", "")
  //         .replaceAll("/", "-")}-${workspaceName}`
  //     : `@packages/${workspaceName}`;
  //
  // execSync(
  //   `nx generate @nx/js:library ${workspaceName} --unitTestRunner=vitest --directory=${directory} --no-buildable --compiler=swc --importPath=${importPath} --no-includeBabelRc --tags=${tags} --testEnvironment=node ${
  //     shouldDryRun ? "--dry-run" : ""
  //   }`,
  //   { stdio: "inherit" }
  // );
}
