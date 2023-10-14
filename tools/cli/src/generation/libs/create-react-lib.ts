import { execSync } from "child_process";

import { ReactLib } from "../../cli-options";
import { inquireReactLibGenerationInputs } from "../project-input";

export async function createReactLib(selectedOption: typeof ReactLib) {
  const { name: workspaceName, directory } =
    await inquireReactLibGenerationInputs(selectedOption);

  const importPath = `@packages/${directory
    .replace("packages/", "")
    .replaceAll("/", "-")}-${workspaceName}`;

  console.log({ importPath, directory });

  execSync(
    `pnpm moon generate react-lib ./${directory} -- --name '${importPath}' --private`,
    { stdio: "inherit" }
  );

  //
  // execSync(
  //   `nx generate @nx/react:library ${workspaceName} --unitTestRunner=vitest --style=none --directory=${directory} --compiler=swc --importPath=${importPath} --tags=${tags} ${
  //     shouldDryRun ? "--dry-run" : ""
  //   }`,
  //   { stdio: "inherit" }
  // );
}
