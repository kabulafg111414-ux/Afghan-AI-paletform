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
  ["reconciliation limit validation", "reconciled:totals.disbursed-totals.reconciled"],
  ["ledger rejects malformed local records", "allowedLedgerTypes.has(item.type)"],
  ["ledger validates positive safe-integer amounts", "Number.isSafeInteger(item.amount)&&item.amount>0"],
  ["ledger bounds user-controlled stored text", "cleanLedgerText(item.note,500)"],
  ["ledger validates real calendar dates", "isValidLedgerDate(item.date)"],
  ["ledger rejects impossible calendar dates", "date.getUTCDate()===day"]
];
for (const [label, snippet] of requiredBindings) {
  if (!app.includes(snippet)) errors.push(`Expected JavaScript binding or validation for ${label} was not found.`);
}


const css = readFileSync("styles.css", "utf8");
const mobileChecks = [
  ["responsive viewport", /<meta[^>]*name=["']viewport["'][^>]*width=device-width/i.test(html)],
  ["mobile menu accessibility controls", html.includes('id="mobileMenu" aria-label="باز کردن فهرست بخش‌ها" aria-controls="sidebar" aria-expanded="false"')],
  ["visible mobile drawer close button", html.includes('id="closeSidebar" aria-label="بستن فهرست"')],
  ["mobile drawer backdrop", html.includes('id="sidebarBackdrop"')],
  ["mobile drawer breakpoint", css.includes("@media(max-width:820px)")],
  ["mobile drawer open state", css.includes(".sidebar.open{display:flex!important}")],
  ["mobile drawer safe-area padding", css.includes("safe-area-inset-bottom")],
  ["mobile drawer Escape close", app.includes("e.key==='Escape'&&$('#sidebar').classList.contains('open'))closeMobileMenu()")],
  ["mobile drawer updates expanded state", app.includes("setAttribute('aria-expanded',String(open))")],
  ["mobile drawer restores collapsed state", app.includes("setAttribute('aria-expanded','false')")],
  ["mobile drawer locks background scroll", css.includes("sidebar-menu-open")],
  ["mobile horizontal overflow containment", css.includes("html,body{max-width:100%;overflow-x:clip}")],
  ["responsive media and canvas sizing", css.includes("img,video,canvas,iframe{max-width:100%}")],
  ["mobile main content width constraints", css.includes(".layout,.main,.page{min-width:0;max-width:100%;width:100%}")],
  ["mobile grid single-column fallback", css.includes("grid-template-columns:minmax(0,1fr)")],
  ["mobile narrow-screen header protection", css.includes("@media(max-width:390px)") && css.includes(".lang-select{max-width:82px}")],
  ["mobile long text wrapping", css.includes("overflow-wrap:anywhere")]
];
for (const [label, passed] of mobileChecks) {
  if (!passed) errors.push(`Mobile accessibility/responsive check failed: ${label}.`);
}


const securityControls = [
  "securityRunScan", "securityLastScan", "securityPassed",
  "securityAttention", "securityScanStatus"
];
for (const id of securityControls) {
  if (!html.includes(`id="${id}"`)) errors.push(`Security diagnostics control "#${id}" is missing from index.html.`);
}
for (const [label, snippet] of [
  ["security scan click handler", "runButton.addEventListener('click'"],
  ["HTTPS diagnostic", "record('https'"],
  ["service worker diagnostic", "record('worker'"],
  ["duplicate HTML ID diagnostic", "duplicateIds.length"],
  ["navigation route diagnostic", "brokenRoutes.length"],
  ["browser storage diagnostic", "afghanai-security-self-test"],
  ["server security limitation notice", "نیازمند تنظیمات و آزمون سمت سرور"]
]) {
  if (!app.includes(snippet)) errors.push(`Security diagnostic check failed: ${label}.`);
}

if (errors.length) {
  console.error("Core interaction smoke check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Core interaction smoke check passed: ${requiredControls.length} required controls, ${requiredBindings.length} event/validation checks, and 17 mobile accessibility/responsive checks verified.`);
