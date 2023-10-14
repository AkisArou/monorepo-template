import * as fs from "fs";
import { serviceEnvironmentsPath } from "../../constants";
import { inquireListInput } from "../../util/inquire";
import { execSync } from "child_process";

export async function syncServiceEnvVar() {
  //   const selectedEnv = await inquireEnvironment();
  //   const env = selectedEnv.replace("env-", "");
  //
  //   const result = execSync(
  //     'az pipelines variable-group list --organization https://dev.azure.com/AssistantSolutions --project "nable-solutions"'
  //   );
  //
  //   const variableGroups = JSON.parse(result.toString());
  //
  //   const variableGroupIds = variableGroups
  //     .filter(group => group.name.includes(env))
  //     .map(group => group.id);
  //
  //   const variableGroupNames = variableGroups
  //     .filter(group => group.name.includes(env))
  //     .map(group => group.name);
  //
  //   const variableGroupVariables = variableGroupIds.map(id => {
  //     const result = execSync(
  //       `az pipelines variable-group variable show --group-id ${id} --organization https://dev.azure.com/AssistantSolutions --project "nable-solutions"`
  //     );
  //     return JSON.parse(result.toString());
  //   });
  // }
  //
  // async function inquireEnvironment() {
  //   const availableEnvironments = fs
  //     .readdirSync(serviceEnvironmentsPath)
  //     ?.filter(env => env.startsWith("env-") && env.endsWith(".yml"))
  //     ?.map(env => env.replace(".yml", ""));
  //
  //   if (!availableEnvironments || availableEnvironments.length === 0) {
  //     console.error(
  //       "No environments found. Please create a new environment first."
  //     );
  //     process.exit(1);
  //   }
  //
  //   return inquireListInput(
  //     "What environment do you want to sync the env variables for?",
  //     availableEnvironments
  //   );
}
