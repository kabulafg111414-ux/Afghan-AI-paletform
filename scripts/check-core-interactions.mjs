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
  ["tutor form submission", "tutorForm.addEventListener('submit'"],
  ["tutor duplicate submission guard", "if(tutorRequestActive)return"],
  ["tutor submit button disabled while waiting", "submitButton.disabled=true"],
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
if (!html.includes('role="log" aria-live="polite" aria-relevant="additions text"')) {
  errors.push("Tutor chat must expose a polite accessible live log.");
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

const provinceMapChecks = [
 ["interactive province map container", html.includes('id="afgProvinceMap"')],
 ["Leaflet stylesheet and script are loaded before app code", html.includes("leaflet@1.9.4/dist/leaflet.css") && html.indexOf("leaflet@1.9.4/dist/leaflet.js") < html.indexOf("./app.js?")],
 ["province map initializes and displays OpenStreetMap attribution", app.includes("function initAfghanInteractiveMap()") && app.includes("© OpenStreetMap contributors")],
 ["province map loads GeoJSON boundaries from a declared source", app.includes("Admin1_Afghanistan/FeatureServer/1/query") && app.includes("returnGeometry=true&outSR=4326&f=geojson")],
 ["map failure keeps province directory available", app.includes("province list remains available") && app.includes("فهرست ولایت‌ها فعال است")],
 ["province map is resized when its page opens", app.includes("afghanLeafletMap.invalidateSize()")],
 ["province map exposes a retry control after external data failure", html.includes('id="afgProvinceMapRetry"') && html.includes('id="afgProvinceMapStatus"') && app.includes("afgProvinceMapRetry") && app.includes("showError(messages.data)") && app.includes("afghanLeafletMap.remove()")],
 ["map province names normalize spelling variants", app.includes("function normalizeAfghanProvinceName(name)") && app.includes("jowzjan:'Jawzjan'") && app.includes("bamian:'Bamyan'") && app.includes("saripul:'Sar-e Pol'")],
 ["map clicks select the matching province directory option", app.includes("function findAfghanProvinceOption(name)") && app.includes("const option=findAfghanProvinceOption(province)") && app.includes("normalizeAfghanProvinceName(name)===select.value")],
 ["province map has a reset-to-all control", html.includes('id="afgProvinceMapReset"') && app.includes("afgProvinceMapReset") && app.includes("afghanProvinceLayer.getBounds()")],
 ["province photo gallery is limited to documented provinces and credited", app.includes("const afghanProvincePhotoGallery=") && app.includes("Benoît Vicart") && app.includes("Roland Lin / UNESCO") && app.includes("Daniel Wilkinson / U.S. Department of State") && app.includes("BihnX") && app.includes("ISAF Headquarters Public Affairs Office") && app.includes("Marius Arnesen") && app.includes("Ninaras") && app.includes("David Adamec") && app.includes("AhmadElhan") && app.includes("Ghazni:[") && app.includes("Spc. Amber Leach / U.S. Army") && app.includes("Kunar:[") && app.includes("Abdul Qahar Nuristan") && app.includes("Nuristan:[") && app.includes("Planet Labs, Inc.") && app.includes("Badghis:[") && app.includes("PRT Meymaneh") && app.includes("Faryab:[") && app.includes("Matt Peterson") && app.includes("Farah:[") && app.includes("Paktia:[") && app.includes("Fred W. Baker III / U.S. Department of Defense") && app.includes("Landscape_in_Paktia_Province.jpg") && app.includes("Paktika:[") && app.includes("Akbarzadran") && app.includes("Paktika_zerok_village.jpg") && app.includes("CC BY-SA 4.0") && app.includes("Uruzgan:[") && app.includes("Farhadlali") && app.includes("Gizab.jpg") && app.includes("CC BY-SA 3.0") && app.includes("Daykundi:[") && app.includes("عزت الله حیدری") && app.includes("Sokhtag.jpg") && app.includes("Helmand:[") && app.includes("Olly Lambert") && app.includes("Helmand_Valley.jpg") && app.includes("Nangarhar:[") && app.includes("Todd Huffman") && app.includes("Takhar:[") && app.includes("Khawajah_Bahawuddin") && app.includes("Sgt. Kimberly Lamb / U.S. Army") && app.includes("Kunduz:[") && app.includes("Kunduz_River_valley.jpg") && app.includes("Dirk Haas / Afghanistan Matters") && app.includes("Baghlan:[") && app.includes("Baghlan%2C_Afghanistan_-_panoramio.jpg") && app.includes("seair21") && app.includes("CC BY 3.0") && app.includes("Landscape_between_Jalalabad_and_Dari_Noor_3.jpg") && app.includes("CC BY 2.0") && app.includes("Logar:[") && app.includes("S. K. Vemmer / U.S. Embassy Kabul") && app.includes("Black_Mountain_in_Logar_Province.jpg") && app.includes("U.S. Department of State public domain") && app.includes("Laghman:[") && app.includes("Usman Mansoor Ansari") && app.includes("Alingar_District_of_Laghman_Province") && app.includes("CC BY-SA 4.0") && app.includes("Kapisa:[") && app.includes("Staff Sgt. Samuel Morse / U.S. Air Force") && app.includes("Afghans_walk_across_a_river_valley_in_Kapisa_Province.jpg") && app.includes("U.S. public domain") && app.includes("Jawzjan:[") && app.includes("H Sinica") && app.includes("Tillya_Tepe_crown.jpg") && app.includes("CC BY-SA 2.0") && app.includes("AhmadElhan") && app.includes("Samangan:[") && app.includes("Ahmad imami") && app.includes("Samangan_Province_panorama") && app.includes("U.S. Army") && app.includes("CC BY 2.0 / U.S. public domain") && app.includes("'Sar-e-Pol':[") && app.includes("Balkhab_District.JPG") && app.includes("CC BY-SA 4.0") && app.includes("Zabul:[") && app.includes("Almond_trees_in_Zabul_Province_of_Afghanistan.jpg") && app.includes("Staff Sgt. Brian Ferguson / U.S. Air Force") && app.includes("U.S. Government work, public domain") && app.includes("Khost:[") && app.includes("View_of_Khost,_Afghanistan.jpg") && app.includes("Laura Goodgame / U.S. Air Force") && app.includes("Nimroz:[") && app.includes("Nimroz_fort.jpg") && app.includes("AhmadElhan") && app.includes("CC BY-SA 4.0") && app.includes("دارالامان") && app.includes("Balkh:[") && app.includes("Herat:[") && app.includes("Kabul:[") && app.includes("Ghor:[") && app.includes("CC BY 4.0") && app.includes("CC0") && app.includes("CC BY-SA 3.0 IGO") && app.includes("Wardak:[") && app.includes("Carl Montgomery") && app.includes("Settlement_in_Wardak_Province.jpg") && app.includes("CC BY 2.0") && app.includes("Parwan:[") && app.includes("JialiangGao") && app.includes("Sheikh_Ali_Valley_Parwan_Province_Afghanistan.jpg") && app.includes("CC BY-SA 4.0")],
 ["province photo gallery uses lazy-loaded responsive images with source links", app.includes('loading="lazy"') && app.includes('width="960" height="640"') && app.includes("photo.url") && css.includes(".afg-province-photo-grid") && css.includes("aspect-ratio:3/2") && css.includes("@media(max-width:420px)") && css.includes("object-fit:cover")],
 ["sourced attraction coverage indicator exists", html.includes('id="afgProvinceCoverage"') && app.includes("new Set(afghanProvinceAttractions.map(item=>item.province)).size") && app.includes("نبودن مدخل به معنای نبود جاذبه نیست")],
 ["official NEPA protected landscapes are included", ["منظرهٔ طبیعی شاه فولادی","منظرهٔ طبیعی باارزش پلاتوی بامیان","زیستگاه پرندگان آبی کول حشمت‌خان"].every(name=>app.includes("name:'"+name+"'") && app.includes("'"+name+"':{en:")) && app.includes("https://www.nepa.gov.af/showDariPage/64")]
];
for (const [label, passed] of provinceMapChecks) { if (!passed) errors.push(`Province map check failed: ${label}.`); }

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
 ["HD Afghanistan landscape gallery uses verified image files", html.includes("thumb/e/ee/Band_Amir.jpg/1920px-Band_Amir.jpg") && html.includes("Cultural_Landscape_and_Archaeological_Remains_of_the_Bamiyan_Valley-130348.jpg") && html.includes("A_view_of_Panjshir.jpg") && html.includes("thumb/d/d7/Sahrad.jpg/1920px-Sahrad.jpg") && html.includes("A_view_over_the_Argandhab_valley_in_Kandahar.jpg")],
 ["photo credits and license links are displayed", html.includes("travel-photo-credits") && html.includes("Roland Lin / UNESCO") && html.includes("Benoît Vicart") && html.includes("CC BY-SA 3.0 IGO") && html.includes("CC0") && html.includes("Daniel Wilkinson")],
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
  ["duplicate HTML ID diagnostic", "duplicates.length"],
  ["navigation route diagnostic", "missing.length"],
  ["browser storage diagnostic", "afghanai-security-self-test"],
  ["server security limitation notice", "فایروال سرور"]
]) {
  if (!(app + html).includes(snippet)) errors.push(`Security diagnostic check failed: ${label}.`);
}

if (errors.length) {
  console.error("Core interaction smoke check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Core interaction smoke check passed: ${requiredControls.length} required controls, ${requiredBindings.length} event/validation checks, and 17 mobile accessibility/responsive checks verified.`);
