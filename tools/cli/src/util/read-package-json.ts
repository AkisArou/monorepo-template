import fs from "node:fs";
import path from "node:path";

export function readPackageJson(workingPath: string) {
  return JSON.parse(
    fs.readFileSync(path.join(workingPath, "package.json"), "utf-8")
  );
}
