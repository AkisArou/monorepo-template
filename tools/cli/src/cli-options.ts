const frameworks = {
  react: "react",
  reactNative: "react-native"
} as const;

export type Framework = (typeof frameworks)[keyof typeof frameworks];

const languages = {
  typescript: "typescript"
} as const;

export type Language = (typeof languages)[keyof typeof languages];

export const projectTypes = {
  app: "app",
  lib: "lib",
  utility: "utility"
} as const;

export type ProjectType = (typeof projectTypes)[keyof typeof projectTypes];

// App options
export const appScopes = {
  client: "client",
  services: "services"
} as const;

export const ReactApp = {
  name: "React App",
  value: "react-app",
  type: projectTypes.app,
  scope: appScopes.client,
  framework: frameworks.react,
  language: languages.typescript
} as const;

export type App = typeof ReactApp;

// Lib options

export const TypeScriptLib = {
  name: "TypeScript lib",
  value: "ts-lib",
  type: projectTypes.lib,
  language: languages.typescript
} as const;

export const ReactLib = {
  name: "React lib",
  value: "react-lib",
  type: projectTypes.lib,
  language: languages.typescript
} as const;

export const ReactNativeLib = {
  name: "React Native lib",
  value: "react-native-lib",
  type: projectTypes.lib,
  language: languages.typescript
} as const;

export const NodeLib = {
  name: "Node lib",
  value: "node-lib",
  type: projectTypes.lib,
  language: languages.typescript
} as const;

export const DOMLib = {
  name: "DOM lib",
  value: "dom-lib",
  type: projectTypes.lib,
  language: languages.typescript
} as const;

export type Lib =
  | typeof ReactLib
  | typeof ReactNativeLib
  | typeof TypeScriptLib
  | typeof DOMLib
  | typeof NodeLib;

// Utility options
const AzureSyncServicesEnvVariables = {
  name: "Sync Services Env Variables",
  value: "sync-service-env-variables",
  type: projectTypes.utility
} as const;

export type Utility = typeof AzureSyncServicesEnvVariables;

export type CLIOption = App | Lib | Utility;

export const cliOptions = {
  createApp: {
    ReactApp
  },
  createLib: {
    TypeScriptLib,
    ReactLib,
    ReactNativeLib,
    NodeLib,
    DOMLib
  },
  utilities: {
    azure: {
      AzureSyncServicesEnvVariables
    }
  }
};

function isCLIOption(value: any): value is CLIOption {
  return value.name && value.value;
}

export function flattenCLIOptions(options: {
  [key: string]: any;
}): CLIOption[] {
  return Object.values(options)
    .map(value => {
      if (isCLIOption(value)) {
        return value;
      }

      return flattenCLIOptions(value);
    })
    .flat();
}
