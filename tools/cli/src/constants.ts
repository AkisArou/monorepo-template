import path from "node:path";

// Paths
export const workspaceRoot = path.join(__dirname, "../../..");
export const templatesPath = path.join(__dirname, "..", "templates");
export const appsRoot = path.join(workspaceRoot, "apps");
export const clientAppsRoot = path.join(appsRoot, "client");
export const servicesAppsRoot = path.join(appsRoot, "services");
export const packagesRoot = path.join(workspaceRoot, "packages");
export const clientLibsRoot = path.join(packagesRoot, "client");
export const servicesLibsRoot = path.join(packagesRoot, "services");
export const sharedLibsRoot = path.join(packagesRoot, "shared");
export const serviceEnvironmentsPath = path.join(
  workspaceRoot,
  "infra/kubernetes/helm/ms-base/env/"
);
export const helmMsBaseRoot = path.join(
  workspaceRoot,
  "infra/kubernetes/helm/ms-base"
);
export const pipelineTemplatesServicesRoot = path.join(
  workspaceRoot,
  "infra/pipelines/apps/services/templates"
);

export const pipelineCDServicesRoot = path.join(
  workspaceRoot,
  "infra/pipelines/apps/services/cd"
);

// NX options
export const nxOptions = {
  general: {
    noInteractive: "--no-interactive"
  },
  ts: {
    compiler: "--compiler=swc",
    noBuildable: "--no-buildable",
    unitTestRunner: "--unitTestRunner=vitest",
    importPath: (name: string) => `--importPath=@nable-solutions/${name}`
  },
  react: {
    routing: "--routing",
    style: "--style=css",
    bundler: "--bundler=vite"
  },
  spring: {
    language: "--language=kotlin",
    packageNameType: "--packageNameType=short",
    configFormat: "--configFormat=.yml",
    groupId: "--groupId=com.nablesolutions",
    projectVersion: "--projectVersion=0.0.1-SNAPSHOT"
  }
};
