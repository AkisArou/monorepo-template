import * as tools from "workspace-tools";
import path from "node:path";
import fs from "node:fs";
// import * as PackageJsonType from "package-json-type";

/**
 * Define custom types used in the code
type ChildName = string;
type ChildPath = string;
type PackageJSONChildren = Record<ChildName, ChildPath>;
 */

/**
 * Represents the parent package.json with custom children property.
 * @typedef {Object} ParentPackageJSON
 * @property {PackageJsonType.IPackageJson} - The parent package.json data.
 * @property {PackageJSONChildren} children - Children package.json file paths.
 */

/**
 * Represents a child package.json with specific properties.
 * @typedef {Object} ChildPackageJSON
 * @property {Object} dependencies - Dependencies of the child package.json.
 * @property {Object} devDependencies - Dev dependencies of the child package.json.
 */

/**
 * Represents a workspace package.json.
 * @typedef {Object} WorkspacePackageJSON
 * @property {string[]} keywords - Keywords associated with the workspace.
 * @property {Object} dependencies - Dependencies of the workspace package.json.
 * @property {Object} devDependencies - Dev dependencies of the workspace package.json.
 */

// Get the list of workspaces in the current project.
const workspaces = tools.getPnpmWorkspaces(process.cwd());

// Get the root of the workspace, if it exists.
const workspaceRoot = tools.getWorkspaceRoot(process.cwd());

if (workspaceRoot) {
  // Construct the path to the parent package.json file.
  const parentPackageJSONPath = path.join(workspaceRoot, "package.json");

  // Read and parse the parent package.json file.
  /** @type {ParentPackageJSON} */
  const parentPackageJSON = JSON.parse(
    fs.readFileSync(parentPackageJSONPath, "utf-8")
  );

  // Extract children package.json data.
  const childrenPackageJSONs = Object.entries(parentPackageJSON.children).map(
    ([name, path]) => {
      return {
        name,
        path,
        packageJson: JSON.parse(fs.readFileSync(path, "utf8")),
      };
    }
  );

  // Iterate through each workspace.
  workspaces.forEach((workspace) => {
    const packageJson = JSON.parse(
      fs.readFileSync(workspace.packageJson.packageJsonPath, "utf8")
    );
    // Extract properties from the workspace's package.json.
    const { keywords, dependencies, devDependencies } = packageJson;

    if (!keywords) {
      return;
    }

    let newDependencies = dependencies ?? {};
    let newDevDependencies = devDependencies ?? {};

    // Iterate through keywords and update dependencies.
    keywords.forEach((keyword) => {
      const foundChild = childrenPackageJSONs.find((f) => f.name === keyword);

      if (!foundChild) {
        return;
      }

      newDependencies = {
        ...newDependencies,
        ...foundChild.packageJson.dependencies,
      };

      newDevDependencies = {
        ...newDevDependencies,
        ...foundChild.packageJson.devDependencies,
      };
    });

    if (
      newDependencies === dependencies &&
      newDevDependencies === devDependencies
    ) {
      return;
    }

    // Create a new workspace package.json with updated dependencies.
    const newWorkspacePackageJSON = {
      ...packageJson,
      dependencies: newDependencies,
      devDependencies: newDevDependencies,
    };

    // Write the updated package.json back to its original file.
    fs.writeFileSync(
      workspace.packageJson.packageJsonPath,
      JSON.stringify(newWorkspacePackageJSON, null, 2)
    );
  });
}
