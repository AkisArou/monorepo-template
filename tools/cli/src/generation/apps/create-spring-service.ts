// import * as fs from "fs";
// import * as path from "path";

// import { SpringApp } from "../../cli-options";
// import {
//   helmMsBaseRoot,
//   pipelineCDServicesRoot,
//   pipelineTemplatesServicesRoot,
//   serviceEnvironmentsPath,
//   servicesAppsRoot,
//   workspaceRoot
// } from "../../constants";
// import {
//   inquireBooleanInput,
//   inquireListInput,
//   inquireSimpleInput
// } from "../../util/inquire";
// import { progressStateLogger } from "../../util/progress-state-logger";
// import { normalizeStr, toPascalCase } from "../../util/str-util";
// import { inquireSpringServiceGenerationInputs } from "../project-input";
// import { mergeTags } from "../tags";

// const serviceTypes = ["LoadBalancer", "ClusterIP", "Custom"] as const;

// export async function createSpringService(selectedOption: typeof SpringApp) {
//   //CREATE apps/services/assistant-prm.ts/ms-test-one/src/test/kotlin/com/nablesolutions/mstestone/ServicesAssistantPrmMsTestOneApplicationTests.kt
//   const {
//     // ms-test-one
//     name,
//     shouldDryRun,
//     tags: defaultTags,
//     // services/assistant-prm.ts
//     directory,
//     // assistant-prm.ts
//     projectFolder
//   } = await inquireSpringServiceGenerationInputs(selectedOption);

//   const environment = await inquireEnvironment();
//   const servicePort = await inquireServicePort();
//   const projectTags = await inquireProjectTags();
//   const serviceType = await inquireServiceType();

//   const tags = mergeTags(
//     projectTags,
//     defaultTags,
//     `environment:${environment.replace("env-", "")}`
//   );

//   //Example: nx generate @jnxplus/nx-boot-maven:application appname --groupId=com.nablesolutions --language=kotlin --directory=dir --packageNameType=short
//   // execNXGeneratorCommand({
//   //   generator: "@jnxplus/nx-boot-maven:application",
//   //   name,
//   //   directory,
//   //   tags,
//   //   extraOptions: [
//   //     nxOptions.spring.language,
//   //     nxOptions.spring.packageNameType,
//   //     nxOptions.spring.configFormat,
//   //     nxOptions.spring.groupId,
//   //     nxOptions.spring.projectVersion,
//   //     nxOptions.general.noInteractive
//   //   ],
//   //   shouldDryRun
//   // });

//   await editMavenProject({
//     serviceName: name,
//     servicePort,
//     projectFolder,
//     directory
//   });

//   await makeInfrastructure({
//     serviceName: name,
//     servicePort,
//     serviceType,
//     projectFolder,
//     environment
//   });
// }

// async function inquireEnvironment() {
//   const availableEnvironments = fs
//     .readdirSync(serviceEnvironmentsPath)
//     ?.filter(env => env.startsWith("env-") && env.endsWith(".yml"))
//     ?.map(env => env.replace(".yml", ""));

//   if (!availableEnvironments || availableEnvironments.length === 0) {
//     console.error(
//       "No environments found. Please create a new environment first."
//     );
//     process.exit(1);
//   }

//   return inquireListInput(
//     "What environment do you want to create the service for?",
//     availableEnvironments
//   );
// }

// async function inquireServicePort() {
//   function validatePort(input: string) {
//     const isPortValid = (port: string) => {
//       const portRegex = /^[0-9]+$/;
//       const portMaxLength = 5;
//       return !!port && port.length <= portMaxLength && portRegex.test(port);
//     };

//     return isPortValid(input) ? true : "Please enter a valid port";
//   }

//   return inquireSimpleInput(
//     "What is the port of the service? (e.g. 8080)",
//     validatePort
//   );
// }

// async function inquireProjectTags() {
//   const shouldAddTags = await inquireBooleanInput("add tags to the project?");

//   if (!shouldAddTags) {
//     return "";
//   }

//   return inquireSimpleInput("What are the tags? (comma separated)");
// }

// async function inquireServiceType() {
//   const serviceType = await inquireListInput(
//     "What type of service do you want to create?",
//     serviceTypes
//   );

//   if (serviceType === "Custom") {
//     return inquireSimpleInput("What is the custom service type?");
//   }

//   return serviceType;
// }

// function inquireKubernetesQAConnection() {
//   return inquireSimpleInput(
//     "What is the name of the Kubernetes QA connection?"
//   );
// }

// function inquireKubernetesQACluster() {
//   return inquireSimpleInput("What is the name of the Kubernetes QA cluster?");
// }

// function inquireKubernetesProdConnection() {
//   return inquireSimpleInput(
//     "What is the name of the Kubernetes Prod connection?"
//   );
// }

// function inquireKubernetesProdCluster() {
//   return inquireSimpleInput("What is the name of the Kubernetes Prod cluster?");
// }

// function inquireEnvironmentResourceGroup() {
//   return inquireSimpleInput(
//     "What is the name of the environment resource group?"
//   );
// }

// function editMavenProject({
//   serviceName,
//   servicePort,
//   projectFolder,
//   directory
// }: {
//   serviceName: string;
//   servicePort: string;
//   projectFolder: string;
//   directory: string;
// }) {
//   progressStateLogger.start("Editing maven project...");

//   const normalizedServiceName = normalizeStr(serviceName);

//   const serviceFolder = path.join(servicesAppsRoot, projectFolder, serviceName);
//   const mainFolder = path.join(serviceFolder, "src", "main");
//   const packageFolder = path.join(
//     mainFolder,
//     "kotlin",
//     "com",
//     "nablesolutions",
//     normalizedServiceName
//   );
//   const resourcesFolder = path.join(mainFolder, "resources");

//   progressStateLogger.start("Modifying main class and file...");

//   (function modifyMainClassAndFile() {
//     const pascalCasePackageName = toPascalCase(serviceName);
//     const pascalCaseWrongMainClassName = `${toPascalCase(
//       directory
//     )}${pascalCasePackageName}Application`;
//     const pascalCaseMainClassName = `${pascalCasePackageName}Application`;

//     // read wrong main class name file
//     const wrongMainClassFile = path.join(
//       packageFolder,
//       `${pascalCaseWrongMainClassName}.kt`
//     );
//     const rightPascalCaseMainClassName = path.join(
//       packageFolder,
//       `${pascalCaseMainClassName}.kt`
//     );

//     const wrongMainClassFileContent = fs.readFileSync(wrongMainClassFile, {
//       encoding: "utf-8"
//     });

//     const newMainClassFileContent = wrongMainClassFileContent
//       .replace(
//         new RegExp(pascalCaseWrongMainClassName, "g"),
//         pascalCaseMainClassName
//       )
//       .replace('(scanBasePackages = arrayOf("com.nablesolutions"))', "");

//     fs.writeFileSync(wrongMainClassFile, newMainClassFileContent);
//     fs.renameSync(wrongMainClassFile, rightPascalCaseMainClassName);
//   })();

//   progressStateLogger.success("Main class and file modified");

//   progressStateLogger.start("Modifying pom.xml...");

//   (function modifyPomFile() {
//     const pomFile = path.join(serviceFolder, "pom.xml");
//     const pomFileContent = fs.readFileSync(pomFile, "utf8");

//     const relativePathToWorkspaceRoot = path.relative(
//       path.dirname(pomFile),
//       workspaceRoot
//     );

//     const pomFileContentFixed = pomFileContent
//       .replace(/<\/relativePath>/, "/pom.xml</relativePath>")
//       .replace(
//         /<groupId>.*<\/groupId>/g,
//         (
//           (i = 0) =>
//           (match: string) =>
//             ++i === 2 ? "" : match
//         )()
//       )
//       .replace(
//         /<artifactId>.*<\/artifactId>/g,
//         (
//           (i = 0) =>
//           (match: string) =>
//             ++i === 2 ? `<artifactId>${serviceName}</artifactId>` : match
//         )()
//       )
//       .replace(/<name>.*<\/name>/, `<name>${serviceName}</name>`)
//       .replace(
//         `  </build>

// </project>`,
//         `
//     <directory>${relativePathToWorkspaceRoot}/targets/\${project.artifactId}</directory>
//   </build>
// </project>
//       `
//       );

//     fs.writeFileSync(pomFile, pomFileContentFixed, "utf8");
//   })();

//   progressStateLogger.success("pom.xml modified");

//   progressStateLogger.start("Modifying application.yml...");

//   (function addToApplicationYamlFile() {
//     const applicationYamlPath = path.join(resourcesFolder, "application.yml");
//     const applicationYamlContent = `server:
//   port: ${servicePort}
// spring:
//   application:
//     name: ${serviceName}
// `;
//     fs.writeFileSync(applicationYamlPath, applicationYamlContent, "utf8");
//   })();

//   progressStateLogger.success("application.yml modified");
// }

// async function makeInfrastructure({
//   serviceName,
//   servicePort,
//   serviceType,
//   projectFolder,
//   environment
// }: {
//   serviceName: string;
//   projectFolder: string;
//   servicePort: string;
//   serviceType: string;
//   environment: string;
// }) {
//   progressStateLogger.start("Creating Helm values file...");

//   (function createHelmValuesFile() {
//     const helmValuesTemplatePath = path.join(
//       helmMsBaseRoot,
//       "values-template.yml"
//     );
//     const helmValuesTemplateContent = fs.readFileSync(
//       helmValuesTemplatePath,
//       "utf8"
//     );
//     const helmValuesContent = helmValuesTemplateContent
//       .replace(/#serviceName#/g, serviceName.split("-")[1]!)
//       .replace(/#projectName#/g, projectFolder)
//       .replace(/#serviceType#/g, serviceType)
//       .replace(/#servicePort#/g, servicePort);

//     fs.writeFileSync(
//       path.join(helmMsBaseRoot, `values-${serviceName}.yml`),
//       helmValuesContent,
//       "utf8"
//     );
//   })();

//   progressStateLogger.success("Helm values file created");

//   const kubernetesQAConnection = await inquireKubernetesQAConnection();
//   const kubernetesQACluster = await inquireKubernetesQACluster();
//   const kubernetesProdConnection = await inquireKubernetesProdConnection();
//   const kubernetesProdCluster = await inquireKubernetesProdCluster();
//   const environmentResourceGroup = await inquireEnvironmentResourceGroup();

//   progressStateLogger.start("Creating deployment pipeline...");
//   (function createDeploymentPipeline() {
//     const springCdTemplatePath = path.join(
//       pipelineTemplatesServicesRoot,
//       "service-deployment.yml"
//     );
//     const springCdTemplateContent = fs.readFileSync(
//       springCdTemplatePath,
//       "utf8"
//     );

//     const springCdContent = springCdTemplateContent
//       .replace(/#projectName#/g, projectFolder)
//       .replace(/#environment#/g, environment)
//       .replace(/#kubeQACluster#/g, kubernetesQACluster)
//       .replace(/#kubeQAConnection#/g, kubernetesQAConnection)
//       .replace(/#kubeProdCluster#/g, kubernetesProdCluster)
//       .replace(/#kubeProdConnection#/g, kubernetesProdConnection)
//       .replace(/#environmentResourceGroup#/g, environmentResourceGroup);

//     fs.writeFileSync(
//       path.join(pipelineCDServicesRoot, `${serviceName}-cd.yml`),
//       springCdContent,
//       "utf8"
//     );
//   })();

//   progressStateLogger.success("Deployment pipeline created");
// }
