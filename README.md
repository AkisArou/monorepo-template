# Modern TypeScript & Npm Workspaces Monorepo Example

This is more like an example, reference, or starting point for a monorepo, constructed after much research with a goal of being a modern setup, with great DX (TypeScript speed is the greatest goal). It is not well-written for now. (I mean this README file). The folder structure is kept simple, but there is an example found below for more advanced use cases.

## Features

- **ESM Only**: "type": "module" in all workspaces.

- **Modern Shared tsconfig for Each App/Lib Type** (React, React-Native, Node, Vanilla TS, DOM).

- **Biome**: TypeScript-eslint seems slow and uses TypeScript compiler behind the scenes. Biome may not be as feature complete but it is a sane option.

- **TS Project References**:
  Official way of declaring dependencies across ts projects/libs.
  Useful for refactoring, and other lsp functionalities such as Go To Definition/Find references.
  Useful for monorepo-wide error feedback in editor, not only for open files.
  Can be configured in vscode via a [task](https://code.visualstudio.com/docs/editor/tasks).
  Check .vscode/tasks.json (re-evaluate if it is not working properly, I use neovim and [tsc.nvim](https://github.com/dmmulroy/tsc.nvim).
  See npm scripts below for project reference auto-sync when a npm workspace is declared as a dependency.
  With "disableSourceOfProjectReferenceRedirect": false in tsconfig.base.json (which is the default), there is no need to build the ts projects to get instant editor
  feedback when cloning the repo.
  One caveat is for example, when having a tRPC router type ("slow type") exposed to a front-end lib, intellisense becomes slow.
  If you set "disableSourceOfProjectReferenceRedirect": true, you have to constantly watch and build the ts projects,
  and the editor feedback is slow after a file change, but afterwards, intellisense becomes super fast when accessing a property of the tRPC router type.
  One way is to exclude the library that contains the tRPC router type from project references, with "disableSourceOfProjectReferenceRedirect" kept as false at tsconfig.base.json,
  set "types" in package.json to point to the generated index.d.ts, watch-build the lib, and you should have a decent setup, with instant feedback from "fast" types when changed,
  by using the ts source files and behind the scenes d.ts file generation for all libs except tRPC including workspace.
  Watch-build should build only declaration files. Check at the section bellow to see why

- **Npm Workspaces**: npm is used instead of other corepack package managers. I found pnpm to be slow when installing a local npm workspace.

- **Single Version Policy for Dependencies**: Node module versions in parent package.json in "overrides" field for single place dependency management.

- **Debugging**: VSCode debug setup for node & browser. Expo not tested.

### npm scripts

- **Sync Project References**: Found at `./tools/scripts/sync-project-references.js`. There are other more robust utils found in npm, like `@monorepo-utils/workspaces-to-typescript-project-references`. I just wanted a bespoke self-maintained simple solution.

- **Workspace Specific Scripts**: In root `package.json` for each app so they can "encapsulate" details in its own `package.json` (e.g. referencing .env files etc.), so parent package.json stays clean.

Add any other script in npm lifecycle scripts for automation.

### General Recommendations

**Folder Structure**

```
apps/
  MY-APP-1/
  MY-APP-2/
packages/
  MY-APP-1/
    airlines/
        domain/
        data-access/
        ...
        ui-web/
        ui-mobile/
        ui-logic/ (platform agnostic hooks etc.)
    helicopters/
        domain/
        data-access/
        ...
        ui-web/
        ui-mobile/
        ui-logic/ (platform agnostic hooks etc.)
    shared/
        ... (env variables, configs, etc)
  MY-APP-2/
    ...
```

You can also check [nx](https://nx.dev/concepts/more-concepts/grouping-libraries) documentation

**Node version manager**:
[asdf](https://asdf-vm.com/)

**Prisma-orm**

if prisma is used, generate a client for each app like this:

```prisma
//schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = env("PRISMA_OUTPUT")
}
```

```
//.env app specific file somewhere
PRISMA_OUTPUT="../../node_modules/@prisma/client/MY-APP-1"
```

**Tailwind**

If you have a structure like this:

```
/apps/MY-APP-1
/packages/MY-APP-1/ui-lib-one
/packages/MY-APP-1/ui-lib-two
```

you can setup tailwind like this in vscode (this is lua-nvim though, check tailwind docs):
Make a tailwind config file specific for an app in packages like shown below.
Export the config file and extend the tailwind config in the app specific tailwind config in app directory.
Then declare to tailwind config the following:

VSCode:

```json
"tailwindCSS.experimental.configFile": {
    "packages/MY-APP-1/config/tailwind/tailwind.config.ts": "apps/MY-APP-1/**",
     "apps/MY-APP-1/tailwind.config.ts": "packages/MY-APP-1/**"
  },
```

Neovim:

```lua
  experimental = {
    configFile = {
      ["packages/MY-APP-1/config/tailwind/tailwind.config.ts"] = "apps/MY-APP-1/**",
      ["apps/MY-APP-1/tailwind.config.ts"] = "packages/MY-APP-1/**",
    },
    # BONUS: this is for twrc library for react native
    classRegex = {
      "tw`([^`]_)",
{ "tw.style\\(([^)]_)\\)", "'([^']\*)'" },
},
},
```

This way you have intellisense in both the app folder and all packages of this specific app.
Tailwind v4 may change this though.

**VSCode settings for typescript (monorepo related)**

```json
{
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "project-relative",
  // If you want import suggestions for all dependencies in each npm workspace. May affect your computers performance though
  "typescript.preferences.includePackageJsonAutoImports": "on"
}
```

For neovim check the docs for your ts language server (tsserver, vtsls etc..)

**Use [neovim](https://neovim.io/) :)**

You can find my [nvim config and dotfiles here](https://github.com/AkisArou/dotfiles)
