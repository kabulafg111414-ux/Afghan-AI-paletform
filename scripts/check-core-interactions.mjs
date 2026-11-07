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


const mobileMarkupChecks = [
  ["responsive viewport", /<meta[^>]*name=["']viewport["'][^>]*width=device-width/i.test(html)],
  ["mobile menu accessibility controls", /id="mobileMenu"[^>]*aria-controls="sidebar"[^>]*aria-expanded="false"/.test(html)],
  ["visible mobile drawer close button", /class="sidebar-mobile-head"[^>]*>[\\s\\S]*?id="closeSidebar"[^>]*aria-label=/.test(html)],
  ["mobile drawer backdrop", /id="sidebarBackdrop"/.test(html)]
];
for (const [label, passed] of mobileMarkupChecks) {
  if (!passed) errors.push(`Mobile markup check failed: ${label}.`);
}

const mobileBehaviorChecks = [
  ["mobile drawer breakpoint and open state", /@media\\s*\\(max-width:\\s*820px\\)[\\s\\S]*?\\.sidebar\\.open\\s*\\{[^}]*display:\\s*flex/i.test((await import("node:fs")).readFileSync("styles.css", "utf8"))],
  ["mobile drawer safe-area padding", /safe-area-inset-bottom/.test((await import("node:fs")).readFileSync("styles.css", "utf8"))],
  ["mobile drawer Escape close", /e\\.key===['"]Escape['"][^}]*closeMobileMenu\\(\\)/.test(app)],
  ["mobile drawer updates expanded state", /setAttribute\\(['"]aria-expanded['"],String\\(open\\)\\)/.test(app)],
  ["mobile drawer restores collapsed state", /setAttribute\\(['"]aria-expanded['"],['"]false['"]\\)/.test(app)],
  ["mobile drawer locks background scroll", /sidebar-menu-open/.test((await import("node:fs")).readFileSync("styles.css", "utf8"))]
];
for (const [label, passed] of mobileBehaviorChecks) {
  if (!passed) errors.push(`Mobile behavior check failed: ${label}.`);
}

if (errors.length) {
  console.error("Core interaction smoke check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Core interaction smoke check passed: ${requiredControls.length} required controls, ${requiredBindings.length} event/validation checks, and 10 mobile accessibility/responsive checks verified.`);
