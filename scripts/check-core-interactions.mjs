import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const app = readFileSync("app.js", "utf8");
const errors = [];

const reconstructionDocuments = [
  ["afghanistan-reconstruction-investment-proposal-2026-2031.md", "docs/afghanistan-reconstruction-investment-proposal-2026-2031.md"],
  ["master-implementation-roadmap-30-chapters-2026-2031.md", "docs/master-implementation-roadmap-30-chapters-2026-2031.md"],
  ["indicative-investment-portfolio-budget-2026-2031.md", "docs/indicative-investment-portfolio-budget-2026-2031.md"],
  ["project-level-economic-appraisal-model-2026-2031.md", "docs/project-level-economic-appraisal-model-2026-2031.md"],
  ["transparency-accountability-anti-corruption-framework-2026-2031.md", "docs/transparency-accountability-anti-corruption-framework-2026-2031.md"],
  ["international-partnership-investment-engagement-framework-2026-2031.md", "docs/international-partnership-investment-engagement-framework-2026-2031.md"],
  ["national-development-indicators-dashboard-framework-2026-2031.md", "docs/national-development-indicators-dashboard-framework-2026-2031.md"],
  ["national-reconstruction-project-atlas-framework-34-provinces-2026-2031.md", "docs/national-reconstruction-project-atlas-framework-34-provinces-2026-2031.md"],
  ["national-support-and-development-fund-framework-2026-2031.md", "docs/national-support-and-development-fund-framework-2026-2031.md"],
  ["fund-budget-allocation-and-audit-workflow-2026-2031.md", "docs/fund-budget-allocation-and-audit-workflow-2026-2031.md"],
];
for (const [file, path] of reconstructionDocuments) {
  if (!html.includes(file) || !existsSync(path)) {
    errors.push(`Reconstruction document link or file is missing: ${file}`);
  }
}

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


const brandIdentityChecks = [
  ["Afghan AI identity heading present", html.includes("دربارهٔ Afghan AI")],
  ["external AI4Afghanistan name removed", !/AI4Afghanistan|AI for Afghanistan|e\\.V\\./i.test(html)]
];
for (const [label, passed] of brandIdentityChecks) {
  if (!passed) errors.push(`Brand identity check failed: ${label}.`);
}

const opportunityChecks = [
 ["career opportunities navigation", html.includes('data-page="opportunities"')],
 ["career opportunities page", html.includes('id="opportunitiesPage"')],
 ["career pathway form", html.includes('id="careerForm"')],
 ["no job guarantee disclosure", html.includes("هیچ شغلی را تضمین نمی‌نماید")],
 ["career pathway renderer", app.includes("const plans=")],
 ["career scam safety advice", app.includes("اعتبار نهاد و شرایط رسمی")]
];
for (const [label, passed] of opportunityChecks) { if (!passed) errors.push(`Career center check failed: ${label}.`); }

const innovationChecks = [
 ["innovation navigation item", html.includes('data-page="innovation"')],
 ["innovation page section", html.includes('id="innovationPage"')],
 ["innovation project form", html.includes('id="innovationForm"')],
 ["innovation local storage disclosure", html.includes("طرح‌ها فقط در دستگاه شما ذخیره می‌شوند")],
 ["innovation page registered in router", app.includes("'innovation','opportunities'")],
 ["innovation local-only project storage", app.includes("afghanai-innovation-projects-v1")],
 ["innovation project milestones", app.includes("بررسی میدانی مشکل")]
];
for (const [label, passed] of innovationChecks) { if (!passed) errors.push(`Innovation lab check failed: ${label}.`); }

const travelGuideChecks = [
 ["travel navigation item", html.includes('data-page="travel"')],
 ["travel guide page section", html.includes('id="travelPage"')],
 ["travel destination search", html.includes('id="travelSearch"')],
 ["travel province and category filters", html.includes('id="travelProvince"') && html.includes('id="travelCategory"')],
 ["travel trip planner form", html.includes('id="travelPlanForm"')],
 ["travel destination data and renderer", app.includes("window.renderTravelGuide=function()") && app.includes("بند امیر")],
 ["travel plan generator", app.includes("travelPlanOutput")],
 ["travel safety and freshness disclosure", html.includes("وضعیت امنیتی، بازبودن مسیرها")],
 ["travel planner does not claim live prices", app.includes("قیمت زنده در دسترس نیست")],
 ["travel route registered in router", app.includes("'opportunities','travel','publications'")],
 ["travel responsive styling", css.includes(".travel-destination-grid") && css.includes("@media(max-width:650px){.travel-filters{grid-template-columns:1fr}") ],
 ["travel guide Dari Pashto English translations", app.includes("Afghanistan Travel Guide") && app.includes("د افغانستان د سفر لارښود") && app.includes("Travel Guide localization layer")],
 ["HD Afghanistan landscape gallery has five attributed photos", html.includes('<figure class="travel-photo-feature"') && (html.match(/<figure>/g)||[]).length>=4 && html.includes("Band-e-Amir,_Afghanistan.jpg") && html.includes("Bamyan_Valley_in_2012.jpg") && html.includes("A_view_of_Panjshir.jpg") && html.includes("2_chevaux_wakhan_Sahrad-e-Broghil.jpg") && html.includes("A_view_over_the_Argandhab_valley_in_Kandahar.jpg")],
 ["photo credits and licenses are displayed", html.includes("travel-photo-credits") && html.includes("CC BY-SA 3.0") && html.includes("CC0")],
 ["landscape gallery responsive premium styling", css.includes(".travel-photo-strip") && css.includes("object-fit:cover") && css.includes("@media(max-width:760px)")],
 ["photo gallery captions localized", app.includes("photoCaptions") && app.includes("فیروزه‌يي جهیلونه") && app.includes("turquoise lakes")],
 ["trip planner destinations localized", app.includes("Bamyan & Band-e Amir") && app.includes("Balkh & Mazar-i-Sharif") && app.includes("Badakhshan & Wakhan")],
 ["trip planner duration localized", app.includes("count+' day'") && app.includes("count+' ورځې")],
 ["trip planner travel styles localized", app.includes("Nature & outdoors") && app.includes("تاریخی و فرهنگی")],
 ["travel destinations translated by language", app.includes("Band-e Amir") && app.includes("Minaret of Jam") && app.includes("item[lang==='en'?3:2]") ],
 ["all 34 provinces available in Travel Guide filter", ["کابل","بامیان","هرات","بلخ","پنجشیر","بدخشان","قندهار","ارزگان","بادغیس","بغلان","دایکندی","فراه","فاریاب","غزنی","غور","هلمند","جوزجان","کاپیسا","خوست","کنر","کندز","لغمان","لوگر","ننگرهار","نیمروز","نورستان","پکتیا","پکتیکا","پروان","سمنگان","سرپل","تخار","وردک","زابل"].every(p=>html.includes("<option>"+p+"</option>"))],
 ["province filter localized in three languages", app.includes("provinceNames") && app.includes("Maidan Wardak") && app.includes("میدان وردګ")],
 ["destination coverage limitation disclosed", html.includes("travelCoverageNote") && app.includes("Destination listings will be expanded gradually")]
];
for (const [label, passed] of travelGuideChecks) { if (!passed) errors.push(`Travel guide check failed: ${label}.`); }

const donationSafetyChecks = [
  ["donations disabled pending legal/account verification", html.includes("دریافت کمک مالی فعلاً غیرفعال است")],
  ["personal payment number not published", !html.includes("0787111414")],
  ["payment QR not published", !html.includes("api.qrserver.com/v1/create-qr-code")],
  ["payment-number copy control removed", !html.includes('id="fundCopyNumber"')]
];
for (const [label, passed] of donationSafetyChecks) {
  if (!passed) errors.push(`Donation safety check failed: ${label}.`);
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
