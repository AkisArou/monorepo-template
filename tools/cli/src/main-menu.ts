import figlet from "figlet";
import inquirer from "inquirer";

import { type CLIOption, cliOptions, flattenCLIOptions } from "./cli-options";

export function showWelcomeMessage() {
  console.log(figlet.textSync("Nable Solutions", { horizontalLayout: "full" }));
}

export async function getMenuSelectedOption(): Promise<CLIOption> {
  const selectedOptionKey = "selectedOption";

  const tree = [
    {
      name: "Create App",
      children: Object.values(cliOptions.createApp)
    },
    {
      name: "Create Lib",
      children: Object.values(cliOptions.createLib)
    },
    {
      name: "Misc",
      children: [
        {
          name: "Azure",
          children: Object.values(cliOptions.utilities.azure)
        }
      ]
    }
  ];

  function getLastItemsOfEachTreeChild(tree: any[]): ReadonlyArray<string> {
    return tree
      .map(item => {
        if (item.children) {
          return getLastItemsOfEachTreeChild(item.children);
        } else {
          return item.value;
        }
      })
      .flat();
  }

  const selectedOption = await inquirer.prompt([
    {
      type: "tree",
      loop: false,
      name: selectedOptionKey,
      message: "What do you want to do?",
      validate(value: string) {
        return getLastItemsOfEachTreeChild(tree).some(ch => ch === value);
      },
      tree
    }
  ]);

  const foundSelectedCLIOption = flattenCLIOptions(cliOptions).find(
    option => option.value === selectedOption[selectedOptionKey]
  );

  if (!foundSelectedCLIOption) {
    throw new Error(
      `Could not find selected CLI option: ${selectedOption[selectedOptionKey]}`
    );
  }

  return foundSelectedCLIOption;
}
