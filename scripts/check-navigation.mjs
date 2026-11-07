import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");

const registryMatch = app.match(/const pages\s*=\s*\[([^\]]*)\]/);
if (!registryMatch) throw new Error("Could not find the application page registry.");

const registered = [...registryMatch[1].matchAll(/["']([a-zA-Z0-9_-]+)["']/g)].map((match) => match[1]);
const navPages = [...html.matchAll(/class=["'][^"']*\bnav\b[^"']*["'][^>]*data-page=["']([a-zA-Z0-9_-]+)["']/g)].map((match) => match[1]);
const pageSections = new Set([...html.matchAll(/<section\b[^>]*\bid=["']([a-zA-Z0-9_-]+Page)["']/g)].map((match) => match[1].slice(0, -4)));

const errors = [];
for (const name of navPages) {
  if (!registered.includes(name)) errors.push(`Navigation item "${name}" is missing from the app.js page registry.`);
  if (!pageSections.has(name)) errors.push(`Navigation item "${name}" has no matching section with id="${name}Page".`);
}
for (const name of registered) {
  if (!pageSections.has(name)) errors.push(`Registered page "${name}" has no matching section with id="${name}Page".`);
}
const duplicates = navPages.filter((name, index) => navPages.indexOf(name) !== index);
for (const name of [...new Set(duplicates)]) errors.push(`Navigation item "${name}" appears more than once.`);

if (errors.length) {
  console.error("Navigation smoke check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Navigation smoke check passed: ${navPages.length} menu entries, ${registered.length} registered pages, all page sections matched.`);
