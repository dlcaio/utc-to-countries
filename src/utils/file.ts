import fs from "fs";

export function writeMapToFile(path: string, map: object): void {
  fs.writeFileSync(path, JSON.stringify(map, null, 2));
}

export function readMapFromFile(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
