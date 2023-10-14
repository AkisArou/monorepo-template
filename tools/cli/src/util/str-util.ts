export function toPascalCase(str: string): string {
  const delimiter = "@@@";
  return str
    .replace(/\W/g, delimiter)
    .split(delimiter)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function normalizeStr(str: string): string {
  return str.replace(/\W/g, "").toLowerCase();
}
