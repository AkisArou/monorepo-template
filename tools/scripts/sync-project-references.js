import fs from "node:fs";
import path from "node:path";
import * as tools from "workspace-tools";
import { isInternalWorkspace } from "./util/is-internal-workspace.js";

export const jsonUtil = {
	read(path) {
		return JSON.parse(fs.readFileSync(path, "utf8"));
	},
	write(file, data) {
		return fs.writeFileSync(file, JSON.stringify(data, null, 2));
	},
};

const workspaceRoot = tools.getWorkspaceRoot(process.cwd());

if (!workspaceRoot) {
	throw new Error("No workspace root found");
}

const omittedWorkspaceNames = ["@config/tailwind-config", "@config/tsconfig"];

const workspaces = tools
	.getWorkspaces(workspaceRoot)
	.filter((w) => !omittedWorkspaceNames.includes(w.name));

// Root tsconfig
const rootTsConfigPath = path.join(workspaceRoot, "tsconfig.json");
const rootTsConfig = jsonUtil.read(rootTsConfigPath);

const rootReferences = workspaces.map((w) => ({
	path: path.relative(workspaceRoot, w.path),
}));

rootTsConfig.files = [];
rootTsConfig.include = [];
rootTsConfig.references = rootReferences;
// rootTsConfig.compilerOptions.paths = rootPaths;

jsonUtil.write(rootTsConfigPath, rootTsConfig);

// Workspaces
workspaces.forEach((w) => {
	const tsConfigPath = path.join(w.path, "tsconfig.json");
	console.log(w.name, tsConfigPath);
	const tsConfig = jsonUtil.read(tsConfigPath);

	const internalDepNames = Object.keys(w.packageJson.dependencies ?? {}).filter(
		(d) => isInternalWorkspace(d) && !omittedWorkspaceNames.includes(d),
	);

	const references = internalDepNames.map((depName) => {
		const foundWorkspace = workspaces.find((depW) => depW.name === depName);

		if (!foundWorkspace) {
			throw new Error(`Not found workspace with name ${depName}`);
		}

		return { path: path.relative(w.path, foundWorkspace.path) };
	}, []);

	if (Array.isArray(tsConfig.extends)) {
		tsConfig.extends = tsConfig.extends.filter((e) => {
			return e.startsWith("@packages") || !e.includes("tsconfig.json");
		});
	}

	tsConfig.references = references;
	tsConfig.compilerOptions ??= {};

	tsConfig.compilerOptions.outDir = "./dist";

	jsonUtil.write(tsConfigPath, tsConfig);
});

workspaces.forEach((w) => {
	if (!w.name.includes("@packages")) {
		return;
	}

	const packageJsonPath = path.join(w.path, "package.json");
	const packageJson = jsonUtil.read(packageJsonPath);

	packageJson.main = "./src/index.ts";
	packageJson.module = "./src/index.ts";
	packageJson.types = "./dist/src/index.d.ts";

	jsonUtil.write(packageJsonPath, packageJson);
});
