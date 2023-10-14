import { ReactApp } from "../../cli-options";
import { nxOptions } from "../../constants";
import { inquireReactAppGenerationInputs } from "../project-input";

export async function createReactApp(selectedOption: typeof ReactApp) {
  const { name, shouldDryRun, tags, directory } =
    await inquireReactAppGenerationInputs(selectedOption);
  // nx generate @nx/react:application asd --bundler=vite --compiler=swc --unitTestRunner=vitest
  // execNXGeneratorCommand({
  //   generator: "@nx/react:application",
  //   name,
  //   directory,
  //   tags,
  //   extraOptions: [
  //     nxOptions.ts.compiler,
  //     nxOptions.ts.unitTestRunner,
  //     nxOptions.react.style,
  //     nxOptions.react.routing,
  //     nxOptions.react.bundler,
  //   ],
  //   shouldDryRun
  // });
}
