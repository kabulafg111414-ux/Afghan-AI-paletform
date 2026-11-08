import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "sw.js",
  "manifest.json",
  "icon.svg",
  "social-support-center.html",
];
const errors = [];

for (const file of requiredFiles) {
  const source = join(root, file);
  if (!existsSync(source) || !statSync(source).isFile() || statSync(source).size === 0) {
    errors.push(`Required deployment file is missing or empty: ${file}`);
  }
}

if (errors.length) {
  console.error("Static deployment build failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of requiredFiles) {
  cpSync(join(root, file), join(output, file));
}

const assetsSource = join(root, "assets");
if (existsSync(assetsSource)) {
  cpSync(assetsSource, join(output, "assets"), { recursive: true });
}

const manifest = JSON.parse(readFileSync(join(output, "manifest.json"), "utf8"));
for (const icon of manifest.icons ?? []) {
  const iconPath = join(output, icon.src.replace(/^\.\//, ""));
  if (!existsSync(iconPath)) errors.push(`Manifest icon is missing from deployment bundle: ${icon.src}`);
}

for (const forbidden of ["backend", "docs", ".github", "scripts", "server.py", "render.yaml", "README.md", "LICENSE"]) {
  if (existsSync(join(output, forbidden))) {
    errors.push(`Non-public project content was copied into the deployment bundle: ${forbidden}`);
  }
}

if (errors.length) {
  console.error("Static deployment bundle validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static deployment bundle ready: ${requiredFiles.length} core files and public assets only.`);
