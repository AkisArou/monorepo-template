import { assertNever } from "assert-never";
import inquirer from "inquirer";
//@ts-ignore
import treeprompt from "inquirer-tree-prompt";
import fuzzypath from "inquirer-fuzzy-path";

import type { CLIOption } from "./cli-options";
import { createReactApp } from "./generation/apps/create-react-app";
import { createReactLib } from "./generation/libs/create-react-lib";
import { createReactNativeLib } from "./generation/libs/create-react-native-lib";
import { createTSLib } from "./generation/libs/create-ts-lib";
import { getMenuSelectedOption, showWelcomeMessage } from "./main-menu";
import { syncServiceEnvVar } from "./misc/azure/sync-service-env-var";

inquirer.registerPrompt("fuzzypath", fuzzypath);
inquirer.registerPrompt("tree", treeprompt);

(async function cli() {
  showWelcomeMessage();

  const selectedOption = await getMenuSelectedOption();

  await (async function executeSelection<S extends CLIOption>(
    selectedOption: S
  ) {
    switch (selectedOption.value) {
      case "react-app":
        await createReactApp(selectedOption);
        break;
      case "react-lib":
        await createReactLib(selectedOption);
        break;
      case "react-native-lib":
        await createReactNativeLib(selectedOption);
        break;
      case "ts-lib":
        await createTSLib(selectedOption);
        break;
      case "node-lib":
        break;
      case "dom-lib":
        break;
      case "sync-service-env-variables":
        await syncServiceEnvVar();
        break;
      default:
        assertNever(selectedOption);
      // TODO assert never because we removed spring lib
    }
  })(selectedOption);
})();
