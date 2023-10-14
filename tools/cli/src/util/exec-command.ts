import { execSync } from "node:child_process";

export function execCommand(command: string) {
  execSync(command, { stdio: "inherit" });
}
