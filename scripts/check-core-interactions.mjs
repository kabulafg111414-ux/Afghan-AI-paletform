import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");
const errors = [];

const requiredControls = [
  "mobileMenu", "sidebarBackdrop", "themeBtn", "uiLanguage",
  "chatForm", "lessonSearch", "fundLedgerForm", "ledgerExport", "ledgerClear"
];
for (const id of requiredControls) {
  if (!html.includes(`id="${id}"`) && !html.includes(`id='${id}'`)) {
    errors.push(`Required interface control "#${id}" is missing from index.html.`);
  }
}

const requiredBindings = [
  ["mobile menu toggle", "$('#mobileMenu').onclick="],
  ["mobile menu backdrop close", "$('#sidebarBackdrop').onclick=closeMobileMenu"],
  ["theme toggle", "$('#themeBtn').onclick="],
  ["language selector", "$('#uiLanguage').addEventListener('change'"],
  ["tutor form submission", "$('#chatForm').addEventListener('submit'"],
  ["lesson search input", "$('#lessonSearch').addEventListener('input',renderLessons)"],
  ["fund ledger submission", "ledgerForm?.addEventListener('submit'"],
  ["fund ledger CSV export", "$('#ledgerExport')?.addEventListener('click'"],
  ["fund ledger clear confirmation", "$('#ledgerClear')?.addEventListener('click'"],
  ["page navigation function", "function showPage(name)"],
  ["allocation limit validation", "allocated:totals.received-totals.allocated"],
  ["disbursement limit validation", "disbursed:totals.allocated-totals.disbursed"],
  ["reconciliation limit validation", "reconciled:totals.disbursed-totals.reconciled"]
];
for (const [label, snippet] of requiredBindings) {
  if (!app.includes(snippet)) errors.push(`Expected JavaScript binding or validation for ${label} was not found.`);
}

if (errors.length) {
  console.error("Core interaction smoke check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Core interaction smoke check passed: ${requiredControls.length} required controls and ${requiredBindings.length} event/validation checks verified.`);
