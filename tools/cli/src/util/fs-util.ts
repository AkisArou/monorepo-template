import fs from "node:fs";

export function normalizePath(path: string): string {
  return path.split("/").slice(1).join("/");
}

export function getFirstLevelDirectoryNames(path: string): readonly string[] {
  return fs
    .readdirSync(path)
    .filter(name => fs.statSync(path + "/" + name).isDirectory());
}

export function getLastLevelDirectoryNames(path: string): readonly string[] {
  const directories = fs
    .readdirSync(path)
    .filter(name => fs.statSync(path + "/" + name).isDirectory())
    .map(name => path + "/" + name);

  if (directories.length === 0) {
    return [path];
  }

  return directories
    .reduce<string[]>(
      (acc, val) => [...acc, ...getLastLevelDirectoryNames(val)],
      []
    )
    .sort();
}
