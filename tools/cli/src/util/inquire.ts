import inquirer from "inquirer";

type SimpleInputValidator = (input: string) => boolean | string;

const simpleInputValidation: SimpleInputValidator = input => {
  return input.length > 0 ? true : "Please enter a valid input";
};

export async function inquireSimpleInput(
  message: string,
  validate: SimpleInputValidator = simpleInputValidation,
  defaultValue?: string
): Promise<string> {
  const resultKey = "result";
  const result: any = await inquirer.prompt([
    {
      type: "input",
      name: resultKey,
      message,
      default: defaultValue,
      validate
    }
  ]);

  return result[resultKey].trim();
}

export async function inquireBooleanInput(
  message: string,
  defaultValue = false
): Promise<boolean> {
  const resultKey = "result";
  const result: any = await inquirer.prompt([
    {
      type: "confirm",
      name: resultKey,
      message: `${message} (Default ${defaultValue ? "Y" : "n"})`,
      default: defaultValue
    }
  ]);

  return result[resultKey];
}

export async function inquireListInput<T>(
  message: string,
  choices: T[] | ReadonlyArray<T>,
  defaultValue?: T
): Promise<T> {
  const resultKey = "result";
  const result: any = await inquirer.prompt([
    {
      type: "list",
      name: resultKey,
      message,
      choices,
      default: defaultValue
    }
  ]);

  return result[resultKey];
}
