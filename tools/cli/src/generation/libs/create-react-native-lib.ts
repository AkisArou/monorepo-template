import { execSync } from "child_process";
import * as fs from "fs";

import { ReactNativeLib } from "../../cli-options";
import { inquireReactLibGenerationInputs } from "../project-input";

export async function createReactNativeLib(
  selectedOption: typeof ReactNativeLib
) {
  const {
    name: workspaceName,
    project,
    directory
  } = await inquireReactLibGenerationInputs(selectedOption);

  // const importPath =
  //   selectedScope === libScopes.client || selectedScope === libScopes.packages
  //     ? `@packages/${directory
  //         .replace("client/", "")
  //         .replaceAll("/", "-")}-${workspaceName}`
  //     : `@packages/${workspaceName}`;
  //
  // execSync(
  //   // npx nx generate @nx/expo:library --name=components --directory=assistant-volunteer/activity/ui/mobile --importPath=@packages/assistant-volunteer-activity-ui-mobile-components --unitTestRunner=none --no-interactive --dry-run
  //   `npx nx generate @nx/expo:library --name=${workspaceName} --directory=${directory} --importPath=${importPath} --no-interactive --tags=${tags} ${
  //     shouldDryRun ? "--dry-run" : ""
  //   }`,
  //   { stdio: "inherit" }
  // );
  //
  // const targetFolder = `../../../../../packages/${directory}/src/lib`;
  //
  // if (!fs.existsSync(targetFolder)) {
  //   fs.mkdirSync(targetFolder);
  //   console.log("lib folder created");
  // } else {
  //   console.log("lib folder creation skipped, it exists");
  // }
}
