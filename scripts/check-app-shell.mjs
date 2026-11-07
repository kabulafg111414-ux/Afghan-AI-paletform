import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const sw = readFileSync("sw.js", "utf8");
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const errors = [];

const shellMatch = sw.match(/const APP_SHELL\s*=\s*\[([\s\S]*?)\]/);
if (!shellMatch) throw new Error("Could not find the service-worker APP_SHELL list.");

const shell = [...shellMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]);
for (const path of shell) {
  const normalized = path.replace(/^\.\//, "");
  if (normalized && !existsSync(normalized)) errors.push(`Service-worker app-shell file "${path}" does not exist.`);
}

const htmlRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((value) => !/^(?:[a-z]+:|#|data:|\/\/)/i.test(value));
for (const ref of htmlRefs) {
  const path = ref.split(/[?#]/, 1)[0];
  if (!path || path.endsWith("/")) continue;
  const normalized = path.replace(/^\.\//, "");
  if (!existsSync(normalized)) errors.push(`Local HTML reference "${ref}" does not resolve to a repository file.`);
  if (!shell.includes(path) && !shell.includes(`./${normalized}`)) {
    errors.push(`Local HTML asset "${path}" is not listed in the service-worker app shell.`);
  }
}

for (const icon of manifest.icons ?? []) {
  const path = icon.src.replace(/^\.\//, "");
  if (!existsSync(path)) errors.push(`Manifest icon "${icon.src}" does not exist.`);
  if (!shell.includes(icon.src)) errors.push(`Manifest icon "${icon.src}" is not precached by the service worker.`);
}

if (errors.length) {
  console.error("App-shell integrity check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`App-shell integrity check passed: ${shell.length} cached assets, ${htmlRefs.length} local HTML references, manifest icon verified.`);
