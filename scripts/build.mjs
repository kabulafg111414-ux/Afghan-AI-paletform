import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "dist");
const files = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "sw.js",
  "icon.svg",
  "social-support-center.html",
];
const directories = ["assets"];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of files) {
  cpSync(resolve(root, file), resolve(output, file));
}
for (const directory of directories) {
  cpSync(resolve(root, directory), resolve(output, directory), { recursive: true });
}
console.log("Afghan AI production assets prepared in dist/.");
