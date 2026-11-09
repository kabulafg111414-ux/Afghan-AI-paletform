import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");

function extractObject(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Could not find ${marker}.`);
  const open = source.indexOf("{", markerIndex);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = open; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, i);
    }
  }
  throw new Error(`Unclosed object for ${marker}.`);
}

function keysFromObjectBody(body) {
  return [...body.matchAll(/(?:^|,)\s*([A-Za-z_$][\w$]*)\s*:/g)].map((match) => match[1]);
}

const uiBody = extractObject(app, "const uiStrings=");
const languageKeys = {};
for (const language of ["fa", "ps", "en"]) {
  const body = extractObject(uiBody, `${language}:`);
  languageKeys[language] = new Set(keysFromObjectBody(body));
}

const allKeys = new Set(Object.values(languageKeys).flatMap((keys) => [...keys]));
const htmlKeys = new Set([...html.matchAll(/data-i18n=["']([^"']+)["']/g)].map((match) => match[1]));
const errors = [];

for (const key of htmlKeys) {
  for (const language of ["fa", "ps", "en"]) {
    if (!languageKeys[language].has(key)) errors.push(`Missing ${language} translation for data-i18n key "${key}".`);
  }
}
for (const language of ["fa", "ps", "en"]) {
  for (const key of allKeys) {
    if (!languageKeys[language].has(key)) errors.push(`Translation key "${key}" is missing from ${language}.`);
  }
}

const navBody = extractObject(app, "const navPageLabels=");
const navLanguageKeys = {};
for (const language of ["fa", "ps", "en"]) {
  const body = extractObject(navBody, `${language}:`);
  navLanguageKeys[language] = new Set(keysFromObjectBody(body));
}
const navButtons = [...html.matchAll(/<button\b[^>]*class=["'][^"']*\bnav\b[^"']*["'][^>]*>/g)].map(([tag]) => tag);
const navPages = navButtons.map((tag) => tag.match(/\bdata-page=["']([^"']+)["']/)?.[1]).filter(Boolean);
if (!navPages.length) errors.push("No sidebar navigation pages were found to verify.");
for (const page of navPages) {
  for (const language of ["fa", "ps", "en"]) {
    if (!navLanguageKeys[language].has(page)) errors.push(`Missing ${language} navigation translation for page "${page}".`);
  }
}
if (!app.includes("navPageLabels[lang]?.[button.dataset.page]")) errors.push("Sidebar navigation translation application is missing.");

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
for (const id of [...new Set(duplicateIds)]) errors.push(`HTML id "${id}" is duplicated.`);

for (const language of ["fa", "ps", "en"]) {
  if (!html.includes(`<option value="${language}"`)) errors.push(`Language selector is missing option "${language}".`);
}
if (!app.includes("function applyLanguage(lang)")) errors.push("Language application function is missing.");
if (!app.includes("document.documentElement.dir=lang==='en'?'ltr':'rtl'")) errors.push("Language direction handling is missing.");

if (errors.length) {
  console.error("Localization smoke check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Localization smoke check passed: ${htmlKeys.size} HTML translation keys, ${allKeys.size} dictionary keys, ${navPages.length} sidebar navigation labels in fa/ps/en, and ${ids.length} unique HTML ids.`);
