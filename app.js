const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
// Safe browser storage: use localStorage when available and an in-memory fallback otherwise.
const safeMemoryStorage=new Map();
function safeStorageGet(key){try{const value=window.localStorage.getItem(key);return value===null?(safeMemoryStorage.has(key)?safeMemoryStorage.get(key):null):value}catch(error){return safeMemoryStorage.has(key)?safeMemoryStorage.get(key):null}}
function safeStorageSet(key,value){const text=String(value);safeMemoryStorage.set(key,text);try{window.localStorage.setItem(key,text);return true}catch(error){return false}}
function safeStorageRemove(key){safeMemoryStorage.delete(key);try{window.localStorage.removeItem(key);return true}catch(error){return false}}
function safeStorageJSON(key,fallback){try{const raw=safeStorageGet(key);return raw===null?fallback:JSON.parse(raw)}catch(error){return fallback}}
const pages=['security','dashboard','tutor','translator','vocational','language','digital','health','business','law','agriculture','engineering','historyculture','lab','space','airobotics','lessons','library','reconstruction','socialsupport','supportfund','featureideas','innovation','opportunities','travel','publications','quiz','progress','family','admin','tools','guide','sources'];

const libraryResources=[
 {title:'وزارت معارف افغانستان',category:'school',type:'منبع رسمی',desc:'درگاه رسمی اطلاعیه‌ها، نصاب و منابع آموزشی وزارت معارف؛ موجودی فایل‌ها را در وب‌سایت بررسی کنید.',url:'https://moe.gov.af/'},
 {title:'وزارت تحصیلات عالی',category:'university',type:'منبع رسمی',desc:'اطلاعات دانشگاهی، رهنمودها و منابع مرتبط با تحصیلات عالی افغانستان.',url:'https://mohe.gov.af/'},
 {title:'UNESCO Digital Library',category:'university',type:'کتابخانهٔ علمی',desc:'منابع پژوهشی و نشرات آموزشی در موضوعات گوناگون.',url:'https://unesdoc.unesco.org/'},
 {title:'World Health Organization — Publications',category:'medical',type:'علوم طبی و صحت',desc:'رهنمودها و نشرات معتبر جهانی در زمینهٔ صحت عامه و طب.',url:'https://www.who.int/publications'},
 {title:'OpenStax',category:'university',type:'کتاب‌های درسی آزاد',desc:'کتاب‌های آموزشی رایگان و با مجوز روشن در علوم و مضامین دانشگاهی؛ زبان عمدتاً انگلیسی.',url:'https://openstax.org/subjects'},
 {title:'Khan Academy',category:'kankor',type:'آموزش و تمرین',desc:'درس‌ها و تمرین‌های ریاضی، علوم و موضوعات دیگر؛ زبان و دسترسی هر درس را بررسی کنید.',url:'https://www.khanacademy.org/'},
 {title:'Project Gutenberg',category:'language',type:'کتاب‌های ادبی',desc:'کتاب‌های دیجیتال در مالکیت عمومی؛ وضعیت حقوق نشر را مطابق کشور بررسی کنید.',url:'https://www.gutenberg.org/'},
 {title:'Internet Archive — Texts',category:'language',type:'آرشیف کتاب‌ها',desc:'مجموعهٔ گستردهٔ کتاب‌ها و اسناد دیجیتال؛ شرایط امانت و حقوق نشر متفاوت است.',url:'https://archive.org/details/texts'},
 {title:'Quran.com',category:'religion',type:'قرآن کریم',desc:'متن قرآن، ترجمه‌ها و ابزارهای مطالعه و تلاوت.',url:'https://quran.com/'},
 {title:'Encyclopaedia Iranica',category:'afghan',type:'تاریخ و فرهنگ',desc:'مقالات پژوهشی دربارهٔ تاریخ، فرهنگ و تمدن منطقه؛ برای مطالعهٔ انتقادی و مقایسهٔ منابع.',url:'https://iranicaonline.org/'},
 {title:'Library of Congress — Afghanistan',category:'afghan',type:'اسناد و پژوهش',desc:'راهنماها و منابع پژوهشی دربارهٔ افغانستان و تاریخ آن.',url:'https://www.loc.gov/'},
 {title:'PubMed',category:'medical',type:'پژوهش طبی',desc:'پایگاه جستجوی مقالات علوم طبی و زیستی؛ مقالهٔ علمی را با دقت و توجه به کیفیت شواهد بخوانید.',url:'https://pubmed.ncbi.nlm.nih.gov/'}
];
function renderLibrary(){
 const grid=$('#libraryGrid');if(!grid)return;
 const q=($('#librarySearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#libraryCategory')?.value||'all';
 const items=libraryResources.filter(x=>(cat==='all'||x.category===cat)&&(!q||(x.title+' '+x.desc+' '+x.type).toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="library-card"><span class="library-type">'+x.type+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><a href="'+x.url+'" target="_blank" rel="noopener noreferrer">بازکردن منبع ↗</a></article>').join(''):'<div class="empty-state">منبعی با این جستجو پیدا نشد؛ عبارت یا دسته‌بندی دیگری را امتحان کنید.</div>';
}
$('#librarySearch')?.addEventListener('input',renderLibrary);
$('#libraryCategory')?.addEventListener('change',renderLibrary);


const languagePhrases=[
{topic:'greetings',en:'Hello. How are you?',fa:'سلام. حال شما چطور است؟',ps:'سلام. تاسو څنګه یاست؟'},
{topic:'greetings',en:'Good morning.',fa:'صبح بخیر.',ps:'سهار مو پخیر.'},
{topic:'greetings',en:'Thank you very much.',fa:'بسیار تشکر.',ps:'ډېره مننه.'},
{topic:'greetings',en:'See you again.',fa:'دوباره می‌بینمتان.',ps:'بیا به ووینو.'},
{topic:'education',en:'I am a student.',fa:'من شاگرد هستم.',ps:'زه زده‌کوونکی یم.'},
{topic:'education',en:'I study every day.',fa:'من هر روز درس می‌خوانم.',ps:'زه هره ورځ زده کړه کوم.'},
{topic:'education',en:'Please open your book.',fa:'لطفاً کتاب خود را باز کنید.',ps:'مهرباني وکړئ خپل کتاب خلاص کړئ.'},
{topic:'education',en:'Knowledge is important.',fa:'دانش مهم است.',ps:'پوهه مهمه ده.'},
{topic:'daily',en:'Where is the school?',fa:'مکتب کجا است؟',ps:'ښوونځی چېرته دی؟'},
{topic:'daily',en:'I need some water.',fa:'من به کمی آب نیاز دارم.',ps:'زه لږو اوبو ته اړتیا لرم.'},
{topic:'daily',en:'What time is it?',fa:'ساعت چند است؟',ps:'اوس څو بجې دي؟'},
{topic:'daily',en:'I am learning a new language.',fa:'من یک زبان جدید یاد می‌گیرم.',ps:'زه نوې ژبه زده کوم.'},
{topic:'health',en:'I need a doctor.',fa:'من به داکتر نیاز دارم.',ps:'زه ډاکټر ته اړتیا لرم.'},
{topic:'health',en:'I have a headache.',fa:'سرم درد می‌کند.',ps:'سر مې درد کوي.'},
{topic:'health',en:'Please help me.',fa:'لطفاً به من کمک کنید.',ps:'مهرباني وکړئ مرسته راسره وکړئ.'}
];
const afghanLanguageProfiles=[
{key:'dari',name:'دری',family:'هندواروپایی؛ شاخهٔ ایرانی',script:'خط فارسی-عربی',note:'یکی از زبان‌های اصلی افغانستان؛ دارای گونه‌ها و لهجه‌های منطقه‌ای.'},
{key:'pashto',name:'پشتو',family:'هندواروپایی؛ شاخهٔ ایرانی',script:'خط پشتو بر پایهٔ فارسی-عربی',note:'زبان مهم افغانستان با گویش‌های گوناگون.'},
{key:'uzbeki',name:'ازبیکی',family:'ترکی؛ شاخهٔ قارلقی',script:'در افغانستان معمولاً خط فارسی-عربی؛ شیوه‌های دیگر نیز وجود دارد',note:'در میان جوامع ازبیک‌زبان افغانستان رایج است.'},
{key:'turkmeni',name:'ترکمنی',family:'ترکی؛ شاخهٔ اغوز',script:'در افغانستان خط فارسی-عربی؛ گونه‌های نوشتاری دیگر نیز شناخته شده‌اند',note:'زبان جامعهٔ ترکمن افغانستان با سنت شفاهی و ادبی.'},
{key:'balochi',name:'بلوچی',family:'هندواروپایی؛ شاخهٔ ایرانی',script:'شیوه‌های نوشتاری با خط فارسی-عربی و لاتین',note:'دارای گونه‌های گویشی متعدد؛ منابع آموزشی باید گونهٔ محلی را مشخص کنند.'},
{key:'nuristani',name:'زبان‌های نورستانی',family:'شاخهٔ نورستانی از هندواروپایی',script:'شیوهٔ نوشتار بسته به زبان و منبع متفاوت است',note:'خانواده‌ای از زبان‌هاست؛ یک زبان واحد نیست و شامل چند زبان مستقل می‌شود.'},
{key:'pashayi',name:'زبان‌های پشه‌ای',family:'هندواروپایی؛ شاخهٔ داردی',script:'نوشتار و رسم‌الخط در منابع آموزشی یکسان و فراگیر نیست',note:'مجموعه‌ای از گونه‌ها و زبان‌های نزدیک به هم با تنوع محلی.'},
{key:'english',name:'انگلیسی',family:'هندواروپایی؛ شاخهٔ ژرمنی',script:'الفبای لاتین',note:'زبان بین‌المللی برای علم، فناوری و ارتباطات.'}
];
function renderAfghanLanguageProfiles(){
 const grid=$('#afghanLanguageGrid');if(!grid)return;
 const key=$('#afghanLanguageSelect')?.value||'all';
 const items=afghanLanguageProfiles.filter(x=>key==='all'||x.key===key);
 grid.innerHTML=items.map(x=>'<article class="language-phrase-card"><span class="language-topic">معرفی زبان</span><h3>'+x.name+'</h3><p><b>خانوادهٔ زبانی:</b> '+x.family+'</p><p><b>خط/نوشتار:</b> '+x.script+'</p><p>'+x.note+'</p></article>').join('');
}
$('#afghanLanguageSelect')?.addEventListener('change',renderAfghanLanguageProfiles);
renderAfghanLanguageProfiles();

function renderLanguageCenter(){
 const grid=$('#languagePhraseGrid');if(!grid)return;
 const q=($('#languageSearch')?.value||'').trim().toLocaleLowerCase();
 const topic=$('#languageTopic')?.value||'all';
 const items=languagePhrases.filter(x=>(topic==='all'||x.topic===topic)&&(!q||[x.en,x.fa,x.ps].some(v=>v.toLocaleLowerCase().includes(q))));
 grid.innerHTML=items.length?items.map(x=>'<article class="language-phrase-card"><span class="language-topic">'+({greetings:'سلام و احوال‌پرسی',education:'آموزش و مکتب',daily:'زندگی روزمره',health:'صحت و تندرستی'}[x.topic])+'</span><h3>'+x.en+'</h3><p><b>دری:</b> '+x.fa+'</p><p><b>پښتو:</b> '+x.ps+'</p><button type="button" class="outline language-speak" data-speak="'+encodeURIComponent(x.en)+'">🔊 شنیدن انگلیسی</button></article>').join(''):'<p class="empty-state">عبارت مورد نظر پیدا نشد.</p>';
 grid.querySelectorAll('[data-speak]').forEach(btn=>btn.addEventListener('click',()=>{if(!('speechSynthesis'in window)){alert('گفتار در این مرورگر پشتیبانی نمی‌شود.');return}const utterance=new SpeechSynthesisUtterance(decodeURIComponent(btn.dataset.speak));utterance.lang='en-US';speechSynthesis.cancel();speechSynthesis.speak(utterance)}));
}
$('#languageSearch')?.addEventListener('input',renderLanguageCenter);
$('#languageTopic')?.addEventListener('change',renderLanguageCenter);


const digitalCourses=[
{cat:'computer',title:'مبانی کمپیوتر',level:'مبتدی',desc:'شناخت سخت‌افزار، نرم‌افزار، سیستم‌عامل، فایل‌ها و پوشه‌ها.',lesson:'کمپیوتر از سخت‌افزار و نرم‌افزار تشکیل می‌شود. سیستم‌عامل مانند Windows، macOS یا Linux منابع دستگاه را مدیریت می‌کند.',task:'سه نمونه سخت‌افزار و سه نمونه نرم‌افزار را نام ببرید.'},
{cat:'internet',title:'اینترنت و جستجوی هوشمند',level:'مبتدی',desc:'مرورگر، وب‌سایت، ایمیل، جستجوی مؤثر و تشخیص اطلاعات نادرست.',lesson:'مرورگر برای بازکردن وب‌سایت‌ها استفاده می‌شود. هنگام جستجو، منبع، تاریخ نشر و شواهد را بررسی کنید و روی پیوندهای مشکوک کلیک نکنید.',task:'برای یک موضوع علمی، دو منبع معتبر پیدا و تاریخ نشر آن‌ها را مقایسه کنید.'},
{cat:'ai',title:'آشنایی با هوش مصنوعی',level:'مبتدی',desc:'مفهوم AI، مدل‌های زبانی، کاربردها و محدودیت‌ها.',lesson:'هوش مصنوعی سامانه‌هایی است که وظایفی مانند تحلیل متن یا تصویر را انجام می‌دهند. پاسخ مدل ممکن است اشتباه باشد؛ اطلاعات مهم را با منبع معتبر بررسی کنید.',task:'از یک ابزار هوش مصنوعی بخواهید یک مفهوم علمی را ساده توضیح دهد و سپس پاسخ را با کتاب درسی مقایسه کنید.'},
{cat:'html',title:'HTML؛ ساختار صفحات وب',level:'مبتدی',desc:'عنوان‌ها، پاراگراف‌ها، پیوندها، تصاویر و فرم‌ها.',lesson:'HTML ساختار محتوا را مشخص می‌کند. تگ h1 عنوان اصلی و تگ p پاراگراف می‌سازد. بیشتر تگ‌ها باز و بسته می‌شوند.',task:'یک صفحه با عنوان، دو پاراگراف و یک پیوند بسازید.'},
{cat:'html',title:'CSS؛ طراحی و زیباسازی وب',level:'مبتدی',desc:'رنگ، فاصله، فونت، چیدمان و طراحی واکنش‌گرا.',lesson:'CSS ظاهر عناصر HTML را کنترل می‌کند. selector عنصر را انتخاب می‌کند و property ویژگی مورد نظر را تغییر می‌دهد؛ مثلاً p { color: blue; }.',task:'برای یک عنوان رنگ، اندازه فونت و فاصله مناسب تعیین کنید.'},
{cat:'javascript',title:'JavaScript؛ تعامل در وب',level:'مبتدی',desc:'متغیرها، شرط‌ها، توابع و رویدادهای کلیک.',lesson:'JavaScript رفتار تعاملی می‌سازد. متغیر مقدار را نگه می‌دارد، شرط تصمیم می‌گیرد و تابع مجموعه‌ای از دستورها را اجرا می‌کند.',task:'یک متغیر با نام studentName بسازید و مقدار آن را در کنسول چاپ کنید.'},
{cat:'security',title:'امنیت سایبری و حفاظت حساب‌ها',level:'مبتدی',desc:'رمز قوی، احراز هویت دومرحله‌ای، فیشینگ و حریم خصوصی.',lesson:'برای هر حساب رمز یکتا بسازید، احراز هویت دومرحله‌ای را فعال کنید، کد تأیید را به کسی ندهید و نشانی وب‌سایت را پیش از ورود بررسی کنید.',task:'تنظیمات امنیتی یکی از حساب‌های خود را بررسی و تأیید دومرحله‌ای را فعال کنید.'},
{cat:'career',title:'مهارت‌های دیجیتال برای کار',level:'مقدماتی',desc:'ایمیل حرفه‌ای، اسناد، صفحه‌گسترده و همکاری آنلاین.',lesson:'مهارت‌های پایه شامل نوشتن ایمیل روشن، تنظیم سند، کار با جدول و نگهداری منظم فایل‌ها است. پیش از ارسال، نام فایل و دسترسی اشتراک‌گذاری را بررسی کنید.',task:'یک رزومه ساده و یک ایمیل رسمی تمرینی آماده کنید.'}
];
function renderDigitalCenter(){
 const grid=$('#digitalCourseGrid');if(!grid)return;
 const q=($('#digitalSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#digitalCategory')?.value||'all';
 const items=digitalCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map((x,i)=>'<article class="digital-course-card"><span class="digital-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مشاهدهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">درسی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#digitalSearch')?.addEventListener('input',renderDigitalCenter);
$('#digitalCategory')?.addEventListener('change',renderDigitalCenter);


const healthCourses=[
{cat:'anatomy',title:'آناتومی انسان',level:'مقدماتی',desc:'آشنایی با ساختار بدن و دستگاه‌های اصلی.',lesson:'آناتومی علم مطالعهٔ ساختار بدن است. دستگاه اسکلتی از بدن حمایت می‌کند؛ دستگاه عضلانی در حرکت نقش دارد؛ و دستگاه عصبی پیام‌ها را هماهنگ می‌سازد.',task:'سه وظیفهٔ دستگاه اسکلتی را با زبان خود توضیح دهید.'},
{cat:'physiology',title:'فیزیولوژی انسان',level:'مقدماتی',desc:'شناخت کارکرد قلب، تنفس، هضم و تنظیم بدن.',lesson:'فیزیولوژی عملکرد بدن را بررسی می‌کند. قلب خون را به گردش درمی‌آورد، شش‌ها تبادل گازها را انجام می‌دهند و دستگاه گوارش مواد غذایی را جذب می‌کند.',task:'تفاوت آناتومی و فیزیولوژی را در دو جمله بنویسید.'},
{cat:'microbiology',title:'میکروبیولوژی',level:'مقدماتی',desc:'آشنایی با باکتری‌ها، ویروس‌ها، قارچ‌ها و پیشگیری از عفونت.',lesson:'میکروبیولوژی موجودات و عوامل میکروسکوپی را مطالعه می‌کند. شستن درست دست‌ها، واکسیناسیون و رعایت اصول بهداشت از راه‌های مهم پیشگیری از برخی عفونت‌ها هستند.',task:'سه راه پیشگیری از انتقال عفونت را فهرست کنید.'},
{cat:'pharmacology',title:'فارماکولوژی',level:'مقدماتی',desc:'مفاهیم عمومی دارو، اثر، عوارض و ایمنی دارویی.',lesson:'فارماکولوژی علم مطالعهٔ داروها و اثر آن‌ها بر بدن است. انتخاب دارو و مقدار مصرف به تشخیص متخصص، سن، وضعیت صحی و عوامل دیگر بستگی دارد. دارو را خودسرانه آغاز یا قطع نکنید.',task:'چرا بررسی عوارض و تداخلات دارویی اهمیت دارد؟'},
{cat:'firstaid',title:'مبانی کمک‌های اولیه',level:'مقدماتی',desc:'ایمنی محل، درخواست کمک و شناخت اصول اولیهٔ امداد.',lesson:'در هر رویداد نخست ایمنی محل را بررسی کنید، از خدمات اضطراری کمک بخواهید و بدون آموزش لازم فرد را در معرض خطر بیشتر قرار ندهید. آموزش عملی کمک‌های اولیه باید از نهاد معتبر دریافت شود.',task:'سه اقدام نخست و عمومی هنگام مشاهدهٔ یک رویداد اضطراری را نام ببرید.'},
{cat:'nursing',title:'مبانی پرستاری',level:'مقدماتی',desc:'مراقبت محترمانه، ارتباط با بیمار، حفظ حریم خصوصی و کنترل عفونت.',lesson:'پرستاری بر مراقبت ایمن و محترمانه، ارتباط روشن، حفظ محرمانگی و رعایت اصول کنترل عفونت استوار است. مهارت‌های بالینی باید زیر نظر آموزگار واجد صلاحیت تمرین شوند.',task:'چهار اصل مراقبت محترمانه از بیمار را بنویسید.'},
{cat:'publichealth',title:'مبانی صحت عامه',level:'مقدماتی',desc:'پیشگیری، واکسیناسیون، آب سالم، تغذیه و سلامت جامعه.',lesson:'صحت عامه بر پیشگیری از بیماری و بهبود سلامت جمعیت تمرکز دارد. آب آشامیدنی سالم، واکسیناسیون، تغذیهٔ مناسب و آموزش صحی از موضوعات کلیدی‌اند.',task:'دو نمونه از اقدام‌های پیشگیرانه در سطح جامعه را مثال بزنید.'},
{cat:'nutrition',title:'اصول تغذیهٔ سالم',level:'مقدماتی',desc:'گروه‌های غذایی، تنوع خوراک و عادت‌های سالم.',lesson:'تغذیهٔ متوازن بر تنوع غذایی، میوه و سبزی، حبوبات، غلات، منابع پروتئین و آب سالم تکیه دارد. نیازهای تغذیه‌ای با سن، فعالیت، وضعیت صحی و شرایط فرد تغییر می‌کند؛ رژیم درمانی باید با متخصص تغذیه یا داکتر بررسی شود.',task:'یک نمونه غذای روزانهٔ متنوع را با استفاده از غذاهای در دسترس محل خود طراحی کنید.'},
{cat:'maternal',title:'مبانی صحت مادر و طفل',level:'مقدماتی',desc:'مراقبت دوران بارداری، زایمان ایمن و رشد کودک.',lesson:'مراقبت دوران بارداری، مراجعهٔ منظم به کارکنان صحی ماهر، تغذیهٔ مناسب، زایمان با کمک فرد آموزش‌دیده و پیگیری پس از زایمان از اجزای مهم سلامت مادر و طفل‌اند. در مورد علایم خطر باید فوراً از خدمات صحی کمک خواست؛ این درس جایگزین مراقبت طبی نیست.',task:'سه دلیل اهمیت مراجعهٔ منظم دوران بارداری را بنویسید.'},
{cat:'prevention',title:'واکسیناسیون و پیشگیری از بیماری‌ها',level:'مقدماتی',desc:'نقش واکسین‌ها، بهداشت دست و رفتارهای پیشگیرانه.',lesson:'واکسین‌ها سیستم ایمنی را برای مقابله با برخی عفونت‌ها آماده می‌کنند و برنامهٔ واکسیناسیون بر اساس سن و رهنمودهای ملی تنظیم می‌شود. شستن دست‌ها، تهویهٔ مناسب، آب سالم و مراجعه به مرکز صحی از اقدامات مهم پیشگیری‌اند. جدول واکسین را از مرکز صحی معتبر دریافت کنید.',task:'چهار راه پیشگیری از بیماری‌های واگیر را نام ببرید.'},
{cat:'prevention',title:'آب آشامیدنی سالم و حفظ‌الصحه',level:'مقدماتی',desc:'پاکی آب، حفظ‌الصحهٔ محیط و جلوگیری از بیماری‌های اسهالی.',lesson:'آب آشامیدنی سالم، ذخیره‌سازی در ظرف پاک و پوشیده، دفع مصون زباله و استفاده از تشناب بهداشتی به کاهش انتقال بیماری کمک می‌کند. روش تصفیهٔ آب باید متناسب با آلودگی احتمالی و رهنمود رسمی صحی باشد.',task:'سه اقدام ساده برای حفظ پاکی آب آشامیدنی در خانه یا مکتب بنویسید.'}
];
function renderHealthCenter(){
 const grid=$('#healthCourseGrid');if(!grid)return;
 const q=($('#healthSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#healthCategory')?.value||'all';
 const items=healthCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="health-course-card"><span class="health-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">موضوعی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#healthSearch')?.addEventListener('input',renderHealthCenter);
$('#healthCategory')?.addEventListener('change',renderHealthCenter);


const businessCourses=[
{cat:'economics',title:'مبانی علم اقتصاد',level:'مبتدی',desc:'نیازها، منابع محدود، عرضه، تقاضا و قیمت.',lesson:'اقتصاد چگونگی استفاده از منابع محدود برای پاسخ به نیازها را بررسی می‌کند. عرضه مقدار کالا یا خدمتی است که فروشندگان آماده ارائه‌اند و تقاضا مقدار مورد خواست خریداران در قیمت‌های مختلف است.',task:'یک نمونه از تغییر عرضه یا تقاضا در بازار محل زندگی خود بیان کنید.'},
{cat:'accounting',title:'حسابداری و مدیریت مالی',level:'مبتدی',desc:'عواید، مصارف، دارایی، بدهی و ثبت معاملات.',lesson:'حسابداری اطلاعات مالی را ثبت و خلاصه می‌کند. سود ساده برابر عواید منهای مصارف است. دارایی منابع اقتصادی و بدهی تعهدات مالی کسب‌وکار است.',task:'برای یک دکان فرضی سه قلم عاید و سه قلم مصرف بنویسید.'},
{cat:'banking',title:'مبانی بانکداری و سواد مالی',level:'مبتدی',desc:'حساب بانکی، پس‌انداز، پرداخت و آگاهی از خطرهای مالی.',lesson:'سواد مالی یعنی توانایی فهم بودجه، پس‌انداز، هزینه و خطر. پیش از استفاده از خدمات مالی، کارمزدها، شرایط قرارداد و اعتبار نهاد ارائه‌کننده را بررسی کنید.',task:'یک بودجهٔ ماهانه با عاید، مصارف ضروری و پس‌انداز طراحی کنید.'},
{cat:'marketing',title:'بازاریابی دیجیتال',level:'مبتدی',desc:'شناخت مشتری، محتوای آنلاین و معرفی محصول.',lesson:'بازاریابی دیجیتال از کانال‌های آنلاین برای معرفی محصول و ارتباط با مشتری استفاده می‌کند. پیام روشن، شناخت مخاطب و سنجش نتایج کمپاین اهمیت دارد.',task:'برای یک محصول محلی، مشتری هدف و یک پیام تبلیغاتی کوتاه تعریف کنید.'},
{cat:'management',title:'مدیریت تجارت',level:'مبتدی',desc:'هدف‌گذاری، برنامه‌ریزی، سازمان‌دهی و ارزیابی.',lesson:'مدیریت شامل تعیین هدف، برنامه‌ریزی، تقسیم مسئولیت‌ها و بررسی نتایج است. هدف روشن و قابل اندازه‌گیری به تیم کمک می‌کند پیشرفت را ارزیابی کند.',task:'برای یک کسب‌وکار کوچک سه هدف قابل سنجش برای ماه آینده بنویسید.'},
{cat:'startup',title:'آغاز کسب‌وکار و ایجاد شرکت',level:'مقدماتی',desc:'ارزیابی ایده، شناخت مشتری و آشنایی با مراحل ثبت رسمی.',lesson:'پیش از آغاز، مشکل مشتری را شناسایی و تقاضا را بررسی کنید. ساختار حقوقی، جواز، مالیات و مقررات ثبت شرکت به کشور و نوع فعالیت وابسته است؛ معلومات را از مراجع رسمی دریافت کنید.',task:'یک ایدهٔ تجارتی و مشکلی را که برای مشتری حل می‌کند توضیح دهید.'},
{cat:'planning',title:'تهیهٔ طرح تجارتی',level:'مقدماتی',desc:'محصول، بازار، رقبا، هزینه‌ها، فروش و خطرها.',lesson:'طرح تجارتی سندی برای توضیح ایده، مشتریان، بازار، عملیات و وضعیت مالی است. برآوردها باید واقع‌بینانه باشند و فرضیات با تحقیق بازار سنجیده شوند.',task:'برای یک ایده، خلاصهٔ یک‌صفحه‌ای شامل محصول، مشتری و هزینه‌های آغاز تهیه کنید.'},
{cat:'trade',title:'صادرات و واردات افغانستان',level:'مقدماتی',desc:'آشنایی با بازار هدف، اسناد، کیفیت و زنجیرهٔ تأمین.',lesson:'صادرات فروش کالا یا خدمت به بازار خارجی و واردات خرید از خارج است. پیش از معامله باید تقاضای بازار، کیفیت و معیارهای محصول، هزینهٔ حمل‌ونقل، شرایط پرداخت، محدودیت‌های تجارتی و اسناد لازم بررسی شود. مقررات و فهرست کالاهای مجاز ممکن است تغییر کند؛ اطلاعات را از مراجع رسمی و گمرک مربوط بگیرید.',task:'برای یک محصول افغانستان، سه بازار احتمالی و عوامل بررسی پیش از صادرات را فهرست کنید.'},
{cat:'customs',title:'گمرکات و اسناد تجارتی',level:'مقدماتی',desc:'فاکتور، فهرست بسته‌بندی، اظهارنامه و طبقه‌بندی کالا.',lesson:'در تجارت فرامرزی معمولاً اسنادی مانند فاکتور تجارتی، فهرست بسته‌بندی، اسناد حمل و اظهارنامهٔ گمرکی مطرح‌اند. نوع اسناد به کالا، کشور مبدأ و مقصد و روش حمل بستگی دارد. کد تعرفه و حقوق گمرکی باید با مرجع رسمی یا متخصص ترخیص بررسی شود.',task:'تفاوت فاکتور تجارتی و فهرست بسته‌بندی را شرح دهید.'},
{cat:'investment',title:'مبانی سرمایه‌گذاری و مدیریت خطر',level:'مقدماتی',desc:'بازده، خطر، تنوع‌بخشی و بررسی پیش از سرمایه‌گذاری.',lesson:'هر سرمایه‌گذاری با احتمال سود و زیان همراه است. ارزیابی باید هدف، افق زمانی، نقدشوندگی، هزینه‌ها، اعتبار طرف معامله و سناریوهای نامطلوب را در نظر بگیرد. وعدهٔ سود تضمینی یا بسیار بلند نشانهٔ هشدار است؛ پیش از تصمیم، مشورهٔ مستقل بگیرید.',task:'برای یک ایدهٔ سرمایه‌گذاری سه خطر و راه کاهش هر خطر را بنویسید.'},
{cat:'projects',title:'مدیریت پروژه و برنامه‌ریزی',level:'مقدماتی',desc:'هدف، فعالیت‌ها، زمان‌بندی، بودجه و سنجش پیشرفت.',lesson:'پروژه کار موقتی با هدف و نتیجهٔ مشخص است. مدیریت پروژه شامل تعیین دامنه، تقسیم کار به فعالیت‌ها، زمان‌بندی، بودجه، مسئولیت‌ها، خطرها و نظارت بر پیشرفت می‌شود. تغییرات باید ثبت و اثر آن‌ها بر زمان و هزینه سنجیده شود.',task:'برای راه‌اندازی یک دکان کوچک پنج فعالیت اصلی و ترتیب اجرای آن‌ها را بنویسید.'},
{cat:'online',title:'فروش آنلاین و تجارت الکترونیکی',level:'مقدماتی',desc:'معرفی محصول، سفارش‌گیری، پرداخت و اعتماد مشتری.',lesson:'فروش آنلاین به تصاویر و توضیحات دقیق محصول، قیمت روشن، راه تماس، سیاست تحویل و رسیدگی به شکایت نیاز دارد. از نگهداری غیرضروری اطلاعات بانکی و شخصی مشتری خودداری کنید و از روش‌های پرداخت معتبر استفاده نمایید.',task:'برای یک محصول محلی متن معرفی آنلاین شامل ویژگی، قیمت، روش تحویل و راه تماس بنویسید.'}
];
function renderBusinessCenter(){
 const grid=$('#businessCourseGrid');if(!grid)return;
 const q=($('#businessSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#businessCategory')?.value||'all';
 const items=businessCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="business-course-card"><span class="business-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">درسی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#businessSearch')?.addEventListener('input',renderBusinessCenter);
$('#businessCategory')?.addEventListener('change',renderBusinessCenter);
$('#businessBreakEvenBtn')?.addEventListener('click',()=>{
 const fixed=Number($('#businessFixedCost')?.value),price=Number($('#businessUnitPrice')?.value),variable=Number($('#businessUnitCost')?.value),out=$('#businessBreakEvenResult');
 if(!out)return;
 if(!$('#businessFixedCost')?.value||!$('#businessUnitPrice')?.value||!$('#businessUnitCost')?.value||![fixed,price,variable].every(Number.isFinite)||fixed<0||price<=0||variable<0){out.textContent='لطفاً مقادیر معتبر وارد کنید؛ قیمت فروش باید بزرگ‌تر از صفر باشد.';return;}
 if(price<=variable){out.textContent='با این قیمت فروش، حاشیهٔ هر واحد مثبت نیست؛ نقطهٔ سربه‌سر محاسبه نمی‌شود.';return;}
 const units=Math.ceil(fixed/(price-variable));
 out.textContent='نقطهٔ سربه‌سر: فروش حداقل '+units.toLocaleString()+' واحد؛ درآمد فروش در این سطح حدود '+(units*price).toLocaleString()+' واحد پولی است.';
});
$('#businessCalcBtn')?.addEventListener('click',()=>{
 const revenue=Number($('#businessRevenue')?.value),costs=Number($('#businessCosts')?.value),out=$('#businessCalcResult');
 if(!out)return;
 if(!$('#businessRevenue')?.value||!$('#businessCosts')?.value||revenue<0||costs<0){out.textContent='لطفاً هر دو رقم معتبر و غیرمنفی را وارد کنید.';return}
 const result=revenue-costs;out.textContent=result>0?'سود ساده: '+result.toLocaleString():result<0?'زیان ساده: '+Math.abs(result).toLocaleString():'عواید و مصارف برابر است؛ سود یا زیان صفر است.';
});


const lawCourses=[
{cat:'citizen',title:'حقوق و مسئولیت‌های شهروندی',level:'مقدماتی',desc:'مفهوم شهروندی، مسئولیت اجتماعی و آگاهی از حقوق.',lesson:'آگاهی شهروندی شامل شناخت حقوق، مسئولیت‌ها، رعایت حقوق دیگران و آشنایی با راه‌های قانونی مراجعه به نهادهای عمومی است. جزئیات حقوق و ضمانت اجرا به قانون نافذ و شرایط هر کشور وابسته است.',task:'سه مسئولیت اجتماعی و سه حق بنیادین را با مراجعه به منبع معتبر فهرست کنید.'},
{cat:'civil',title:'مبانی حقوق مدنی',level:'مقدماتی',desc:'شخصیت حقوقی، مالکیت، تعهد و مسئولیت مدنی.',lesson:'حقوق مدنی روابط اشخاص، اموال، قراردادها و تعهدات را تنظیم می‌کند. مالکیت، تصرف و استفاده از مال مفاهیم جداگانه‌اند و اسناد و قوانین مربوط در هر قضیه باید بررسی شوند.',task:'تفاوت مالکیت و تصرف را با یک مثال ساده توضیح دهید.'},
{cat:'criminal',title:'آشنایی با حقوق جزا',level:'مقدماتی',desc:'مفهوم جرم، مسئولیت جزایی و اصول روند عادلانه.',lesson:'حقوق جزا رفتارهای ممنوع و پیامدهای قانونی آن‌ها را تعریف می‌کند. مسئولیت جزایی و روند رسیدگی تابع قانون نافذ، ادله و تصمیم مرجع صلاحیت‌دار است؛ نباید از یک مثال عمومی نتیجهٔ قضیهٔ مشخص را پیش‌بینی کرد.',task:'تفاوت ادعای ارتکاب جرم و اثبات آن در روند قانونی را شرح دهید.'},
{cat:'business',title:'حقوق تجارت و قراردادها',level:'مقدماتی',desc:'طرفین قرارداد، تعهدات، پرداخت و حل اختلاف.',lesson:'قرارداد توافقی است که می‌تواند برای طرف‌ها تعهد ایجاد کند. موضوع، مبلغ، زمان اجرا، مسئولیت‌ها و روش حل اختلاف باید روشن باشد. اعتبار و قابلیت اجرای هر شرط را قانون نافذ تعیین می‌کند.',task:'برای یک قرارداد ساده، پنج موردی را بنویسید که باید روشن باشند.'},
{cat:'family',title:'حقوق خانواده و حمایت از اطفال',level:'مقدماتی',desc:'مفاهیم عمومی خانواده، مسئولیت والدین و منافع طفل.',lesson:'مسائل خانواده ممکن است شامل نکاح، نفقه، حضانت، سرپرستی و حمایت از طفل باشد. قواعد قابل اجرا ممکن است به قانون نافذ و مرجع صلاحیت‌دار وابسته باشند؛ موضوعات حساس باید با متخصص واجد صلاحیت بررسی شوند.',task:'چند نیاز اساسی طفل را که باید در تصمیم‌های مربوط به او در نظر گرفته شود، فهرست کنید.'},
{cat:'admin',title:'اداره و اسناد رسمی',level:'مقدماتی',desc:'درخواست رسمی، ثبت مکتوب، شماره صادره و نگهداری اسناد.',lesson:'در مکاتبات اداری، عنوان مرجع، موضوع روشن، شرح کوتاه واقعات، درخواست مشخص و ضمایم مرتب اهمیت دارد. از اصل اسناد محافظت کنید و رسید ثبت یا شماره تعقیب را نگه دارید.',task:'یک درخواست فرضی اداری با موضوع، شرح کوتاه و تقاضای مشخص تنظیم کنید.'}
,
{cat:'labor',title:'حقوق کار و استخدام',level:'مقدماتی',desc:'قرارداد کاری، معاش، ساعات کار، رخصتی و مصونیت شغلی.',lesson:'رابطهٔ کاری می‌تواند با قرارداد، مقررات داخلی و قانون کار تنظیم شود. پیش از آغاز کار، وظایف، معاش و زمان پرداخت، ساعات کار، رخصتی، مدت قرارداد، شرایط ختم همکاری و روش حل اختلاف را به‌صورت روشن و مکتوب بررسی کنید. حقوق و استثناها باید از متن نافذ قانون و مرجع رسمی مربوط تأیید شوند.',task:'برای یک وظیفهٔ فرضی، شش موردی را که باید در قرارداد کاری روشن باشد فهرست کنید.'},
{cat:'children',title:'حقوق و حمایت از اطفال',level:'مقدماتی',desc:'مصونیت، آموزش، هویت، سلامت و منافع عالی طفل.',lesson:'در تصمیم‌هایی که بر طفل اثر می‌گذارد، مصونیت، سلامت، آموزش، رشد و شنیده‌شدن نظر متناسب با سن او اهمیت دارد. از خشونت، بهره‌کشی، کار زیان‌آور و افشای اطلاعات خصوصی طفل جلوگیری کنید. در وضعیت خطر یا سوءاستفاده، از نهادهای حمایتی و مراجع صلاحیت‌دار کمک بخواهید.',task:'چهار نیاز اساسی طفل را نام ببرید و توضیح دهید چگونه می‌توان از حریم خصوصی او محافظت کرد.'},
{cat:'property',title:'ملکیت، کرایه و قراردادهای ملکی',level:'مقدماتی',desc:'بررسی اسناد، حدود ملک، کرایه، مدت و تعهدات طرفین.',lesson:'در معامله یا کرایهٔ ملک، هویت و صلاحیت طرف‌ها، نشانی و مشخصات دقیق ملک، اسناد مالکیت یا اختیار قانونی، مبلغ و مدت کرایه، تضمین، مسئولیت ترمیم و شرایط ختم قرارداد باید بررسی شود. تصرف یا پرداخت کرایه به‌تنهایی لزوماً اثبات‌کنندهٔ مالکیت نیست. پیش از پرداخت یا امضا، اسناد را از مرجع رسمی مربوط بررسی کنید.',task:'یک فهرست از اسنادی تهیه کنید که پیش از کرایه یا خرید ملک باید از مرجع صلاحیت‌دار بررسی شوند.'},
{cat:'complaints',title:'شکایت و مراجعه به مراجع رسمی',level:'مقدماتی',desc:'تنظیم درخواست، ثبت شکایت، نگهداری رسید و پیگیری مکتوب.',lesson:'درخواست یا شکایت مؤثر باید موضوع روشن، تاریخ و محل واقعه، شرح بی‌طرفانه و مرتب، خواستهٔ مشخص و فهرست ضمایم داشته باشد. فقط اسناد مرتبط و قانونی را ارائه کنید؛ اصل اسناد را نزد خود نگه دارید و رسید ثبت، شمارهٔ تعقیب و کاپی مکاتبات را محفوظ سازید. مرجع و مهلت رسیدگی به نوع موضوع و مقررات جاری بستگی دارد.',task:'برای یک مشکل فرضی اداری، عنوان، شرح کوتاه واقعه، خواستهٔ مشخص و سه ضمیمهٔ احتمالی را بنویسید.'}
];
function renderLawCenter(){
 const grid=$('#lawCourseGrid');if(!grid)return;
 const q=($('#lawSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#lawCategory')?.value||'all';
 const items=lawCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="law-course-card"><span class="law-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">موضوعی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#lawSearch')?.addEventListener('input',renderLawCenter);
$('#lawCategory')?.addEventListener('change',renderLawCenter);


const agricultureCourses=[
{cat:'crops',title:'زراعت و محصولات افغانستان',level:'مقدماتی',desc:'آشنایی با گندم، برنج، جو، زعفران و محصولات مهم.',lesson:'انتخاب محصول به آب‌وهوا، ارتفاع، خاک، دسترسی به آب و بازار بستگی دارد. تناوب کشت و استفاده از تخم باکیفیت می‌تواند به حفظ حاصل‌خیزی خاک و کاهش برخی آفات کمک کند. برای انتخاب رقم و تقویم کشت، معلومات زراعتی ولایت خود را بررسی کنید.',task:'سه محصول مهم منطقهٔ خود را نام ببرید و نیازهای آب و بازار آن‌ها را مقایسه کنید.'},
{cat:'irrigation',title:'مدیریت آب و آبیاری',level:'مقدماتی',desc:'آشنایی با آبیاری مؤثر، زهکشی و حفاظت منابع آب.',lesson:'آبیاری باید با نیاز گیاه، مرحلهٔ رشد، نوع خاک و شرایط هوا هماهنگ باشد. آبیاری بیش از حد می‌تواند سبب هدررفت آب، شست‌وشوی مواد غذایی و آسیب ریشه شود. آبیاری قطره‌ای در برخی شرایط مصرف آب را کاهش می‌دهد، اما طراحی و نگهداری درست لازم دارد.',task:'روش آبیاری فعلی یک باغ یا مزرعه را مشاهده کنید و دو راه کاهش ضایعات آب بنویسید.'},
{cat:'irrigation',title:'شناخت خاک و حاصل‌خیزی',level:'مقدماتی',desc:'بافت خاک، مواد عضوی، فرسایش و آزمایش خاک.',lesson:'خاک از ذرات معدنی، مواد عضوی، آب و هوا تشکیل شده است. آزمایش خاک برای شناخت pH و مواد غذایی کمک می‌کند. افزودن کود باید بر اساس نیاز واقعی و راهنمایی زراعتی باشد؛ مصرف بی‌رویهٔ کود می‌تواند به خاک و آب آسیب بزند.',task:'سه نشانهٔ خاک سالم را نام ببرید و اهمیت آزمایش خاک را توضیح دهید.'},
{cat:'horticulture',title:'باغداری و درختان میوه',level:'مقدماتی',desc:'اصول عمومی احداث باغ، هرس، گرده‌افشانی و مراقبت.',lesson:'در احداث باغ، اقلیم، ارتفاع، نوع خاک، کیفیت آب، فاصلهٔ درختان و دسترسی به بازار مهم است. هرس باید با شناخت نوع درخت و فصل مناسب انجام شود. نهال سالم و رقم سازگار با منطقه در موفقیت باغ نقش دارد.',task:'برای یک باغ فرضی، سه عامل مهم در انتخاب محل و نوع نهال را بنویسید.'},
{cat:'livestock',title:'مالداری و تغذیهٔ حیوانات',level:'مقدماتی',desc:'نگهداری سالم، خوراک، آب پاک و مدیریت جایگاه.',lesson:'سلامت و تولید حیوانات به خوراک متوازن، آب پاک، تهویه، جایگاه خشک و مدیریت مناسب وابسته است. نیاز غذایی گاو، گوسفند، بز و مرغ متفاوت است و جیره باید با توجه به سن و هدف تولید تنظیم شود.',task:'چهار شرط مهم برای جایگاه سالم حیوانات را فهرست کنید.'},
{cat:'veterinary',title:'صحت حیوانات و پیشگیری',level:'مقدماتی',desc:'بهداشت جایگاه، واکسیناسیون با نظر دامپزشک و تشخیص علایم هشدار.',lesson:'پیشگیری شامل پاکیزگی جایگاه، آب و خوراک سالم، قرنطین حیوان تازه‌وارد و برنامهٔ واکسیناسیون متناسب با منطقه است. بی‌اشتهایی، تب، دشواری تنفس یا گسترش ناگهانی بیماری نیازمند ارزیابی دامپزشک است. دارو و مقدار مصرف را خودسرانه تعیین نکنید.',task:'سه اقدام برای جلوگیری از گسترش بیماری میان حیوانات را نام ببرید.'},
{cat:'forestry',title:'جنگلات و حفاظت محیط زیست',level:'مقدماتی',desc:'درخت‌کاری، جلوگیری از فرسایش و مدیریت پایدار منابع طبیعی.',lesson:'درختان در حفاظت خاک، تنظیم آب، فراهم‌کردن زیستگاه و کاهش اثر فرسایش نقش دارند. گونه‌های بومی و سازگار با اقلیم محل را انتخاب کنید و نهال‌ها را پس از غرس نیز مراقبت نمایید.',task:'یک راهکار محلی برای حفاظت از درختان و کاهش فرسایش خاک پیشنهاد کنید.'},
{cat:'food',title:'صنایع غذایی و پس از برداشت',level:'مقدماتی',desc:'ذخیره‌سازی، خشک‌کردن، بسته‌بندی و کاهش ضایعات محصولات.',lesson:'پس از برداشت، پاک‌سازی، خشک‌کردن مناسب، بسته‌بندی و ذخیره در محیط پاک و خشک به کاهش ضایعات کمک می‌کند. رطوبت و آفات انباری می‌توانند کیفیت غله و محصولات را کاهش دهند. اصول ایمنی غذایی باید رعایت شود.',task:'برای نگهداری یک محصول محلی، سه اقدام جهت حفظ کیفیت پیشنهاد کنید.'}
];
function renderAgricultureCenter(){
 const grid=$('#agriCourseGrid');if(!grid)return;
 const q=($('#agriSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#agriCategory')?.value||'all';
 const items=agricultureCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="agri-course-card"><span class="agri-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">درسی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#agriSearch')?.addEventListener('input',renderAgricultureCenter);
$('#agriCategory')?.addEventListener('change',renderAgricultureCenter);
$('#agriCalcBtn')?.addEventListener('click',()=>{
 const area=$('#agriArea')?.value,depth=$('#agriDepth')?.value,out=$('#agriCalcResult');
 if(!out)return;
 if(area===''||depth===''||Number(area)<0||Number(depth)<0){out.textContent='لطفاً مساحت و عمق معتبر و غیرمنفی وارد کنید.';return}
 const litres=Number(area)*Number(depth);
 out.textContent='حجم فرضی آب: '+litres.toLocaleString()+' لیتر ('+(litres/1000).toLocaleString()+' متر مکعب).';
});


const engineeringCourses=[
{cat:'civil',title:'مهندسی ساختمان و معماری',level:'مقدماتی',desc:'آشنایی با نقشه، مصالح، سازه و اصول طراحی.',lesson:'مهندسی ساختمان با طراحی و اجرای ایمن سازه‌ها سروکار دارد. انتخاب مصالح، شرایط خاک، بارهای وارد بر ساختمان و مقررات ساختمانی باید توسط متخصصان بررسی شود. نقشهٔ معماری، کاربری و چیدمان فضاها را نشان می‌دهد.',task:'تفاوت نقشهٔ معماری و نقشهٔ سازه را با یک مثال شرح دهید.'},
{cat:'electrical',title:'مهندسی برق و الکترونیک',level:'مقدماتی',desc:'ولتاژ، جریان، مقاومت، مدار و قطعات الکترونیکی.',lesson:'ولتاژ اختلاف پتانسیل، جریان حرکت بار الکتریکی و مقاومت مخالفت در برابر جریان است. قانون اهم رابطهٔ این کمیت‌ها را در شرایط مشخص بیان می‌کند: V=IR. مدارهای واقعی باید با ولتاژ ایمن و تجهیزات مناسب در محیط آموزشی تمرین شوند.',task:'اگر مقاومت ۱۰ اهم و جریان ۲ آمپر باشد، با قانون اهم ولتاژ را محاسبه کنید.'},
{cat:'computer',title:'مهندسی کمپیوتر و شبکه',level:'مقدماتی',desc:'سخت‌افزار، سیستم‌عامل، شبکه و انتقال داده.',lesson:'شبکهٔ کمپیوتر دستگاه‌ها را برای تبادل اطلاعات وصل می‌کند. روتر مسیر انتقال داده را میان شبکه‌ها مدیریت می‌کند و پروتکل‌ها قواعد ارتباط را تعیین می‌کنند. امنیت شبکه به به‌روزرسانی، رمزگذاری و مدیریت دسترسی وابسته است.',task:'تفاوت شبکهٔ محلی (LAN) و اینترنت را توضیح دهید.'},
{cat:'energy',title:'انرژی خورشیدی و تجدیدپذیر',level:'مقدماتی',desc:'پنل خورشیدی، اینورتر، باتری و بهره‌وری انرژی.',lesson:'پنل فتوولتائیک نور خورشید را به برق مستقیم تبدیل می‌کند. اینورتر برق مستقیم را به برق متناوب تبدیل می‌کند. اندازهٔ سیستم به مصرف انرژی، تابش محل، تلفات و نیاز ذخیره‌سازی بستگی دارد.',task:'سه عامل مهم در تعیین ظرفیت یک سیستم خورشیدی را نام ببرید.'},
{cat:'water',title:'مهندسی آب و محیط زیست',level:'مقدماتی',desc:'آب‌رسانی، تصفیه، فاضلاب و حفاظت محیط زیست.',lesson:'مهندسی آب با تأمین، انتقال، تصفیه و مدیریت منابع آب سروکار دارد. تصفیهٔ آب ممکن است شامل مراحل فیزیکی، شیمیایی و میکروبی باشد. کیفیت آب باید با آزمایش و معیارهای معتبر سنجیده شود.',task:'چرا پیش از انتخاب روش تصفیه باید کیفیت آب خام آزمایش شود؟'},
{cat:'mechanical',title:'مهندسی مکانیک و صنایع',level:'مقدماتی',desc:'حرکت، نیرو، ماشین‌ها، تولید و نگهداری تجهیزات.',lesson:'مکانیک حرکت و نیرو را بررسی می‌کند. مهندسی صنایع بر بهبود سیستم‌های تولید، کیفیت، زمان و استفادهٔ مؤثر از منابع تمرکز دارد. نگهداری پیشگیرانه می‌تواند احتمال خرابی ناگهانی تجهیزات را کاهش دهد.',task:'دو نمونه از نگهداری پیشگیرانه در یک کارگاه را بنویسید.'},
{cat:'gis',title:'نقشه‌برداری و سیستم اطلاعات جغرافیایی',level:'مقدماتی',desc:'مختصات، نقشه، داده‌های مکانی و تحلیل GIS.',lesson:'GIS برای جمع‌آوری، مدیریت و تحلیل داده‌های مکانی استفاده می‌شود. نقشه‌برداری موقعیت و اندازه‌گیری عوارض زمین را ثبت می‌کند. دقت مختصات، مقیاس و منبع داده در استفاده از نقشه اهمیت دارد.',task:'دو کاربرد GIS در مدیریت شهری یا زراعت را مثال بزنید.'},
{cat:'innovation',title:'تکنالوژی و نوآوری',level:'مقدماتی',desc:'حل مسئله، نمونه‌سازی، رباتیک و طراحی محصول.',lesson:'نوآوری به ایجاد یا بهبود یک محصول، خدمت یا روش گفته می‌شود. فرایند طراحی معمولاً با شناخت نیاز، تولید ایده، ساخت نمونهٔ اولیه، آزمایش و بهبود ادامه می‌یابد.',task:'یک مشکل روزمره را انتخاب و یک راه‌حل تکنالوژیک ساده برای آن پیشنهاد کنید.'}
];
function renderEngineeringCenter(){
 const grid=$('#engineeringCourseGrid');if(!grid)return;
 const q=($('#engineeringSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#engineeringCategory')?.value||'all';
 const items=engineeringCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="engineering-course-card"><span class="engineering-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">درسی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#engineeringSearch')?.addEventListener('input',renderEngineeringCenter);
$('#engineeringCategory')?.addEventListener('change',renderEngineeringCenter);
$('#solarCalcBtn')?.addEventListener('click',()=>{
 const use=$('#solarDailyUse')?.value,hours=$('#solarSunHours')?.value,loss=$('#solarLoss')?.value,out=$('#solarCalcResult');
 if(!out)return;
 if(use===''||hours===''||Number(use)<=0||Number(hours)<=0||Number(loss)<=0||Number(loss)>100){out.textContent='لطفاً مصرف و ساعات آفتاب مثبت و ضریب بازده بین ۱ تا ۱۰۰ وارد کنید.';return}
 const capacity=Number(use)/(Number(hours)*(Number(loss)/100));
 out.textContent='ظرفیت تقریبی پنل: '+capacity.toFixed(2)+' کیلووات ('+(capacity*1000).toFixed(0)+' وات). این مقدار فقط برآورد ابتدایی است.';
});


const historyCultureCourses=[
{cat:'ancient',title:'آریانا و باختر در دوران باستان',level:'مقدماتی',desc:'شناخت نام‌های تاریخی، باختر و مراکز کهن منطقه.',lesson:'باختر یکی از مناطق مهم تاریخی آسیای مرکزی و پیرامون آمودریا بود و شهر بلخ از مراکز شناخته‌شدهٔ آن به‌شمار می‌رفت. نام آریانا در برخی نوشته‌های یونانی و جغرافیایی باستان برای بخش‌هایی از این منطقه به‌کار رفته است؛ حدود و کاربرد این نام در منابع یکسان نیست.',task:'تفاوت میان نام جغرافیایی باختر و کاربرد تاریخی نام آریانا را با مراجعه به یک منبع پژوهشی توضیح دهید.'},
{cat:'ancient',title:'بلخ و تمدن‌های باستانی',level:'مقدماتی',desc:'بلخ، باختر و پیوندهای فرهنگی و تجارتی منطقه.',lesson:'بلخ در مسیرهای ارتباطی آسیای مرکزی و جنوب آسیا جایگاه مهمی داشت. یافته‌های باستان‌شناسی در محوطه‌هایی چون بلخ و آی‌خانم از ارتباطات فرهنگی و هنری منطقه با جهان هلنیستی و دیگر تمدن‌ها حکایت می‌کند.',task:'دو دلیل برای اهمیت موقعیت جغرافیایی بلخ در تاریخ منطقه بنویسید.'},
{cat:'dynasty',title:'غزنویان',level:'مقدماتی',desc:'حکومت غزنوی و نقش غزنی در تاریخ سیاسی و فرهنگی.',lesson:'غزنویان دودمانی ترک‌تبار بودند که از غزنی به قدرت رسیدند و در سده‌های دهم تا دوازدهم میلادی بر بخش‌هایی از خراسان، افغانستان امروزی و شمال هند فرمان راندند. دربار غزنوی با حمایت از برخی شاعران و دانشوران، در تاریخ فرهنگی فارسی‌زبانان نیز اهمیت دارد.',task:'دو ویژگی سیاسی یا فرهنگی دورهٔ غزنوی را از یک منبع معتبر یادداشت کنید.'},
{cat:'dynasty',title:'غوریان',level:'مقدماتی',desc:'خاستگاه غور و گسترش نفوذ سیاسی و معماری.',lesson:'غوریان از منطقهٔ غور برخاستند و در سده‌های دوازدهم و سیزدهم میلادی به قدرت منطقه‌ای مهمی تبدیل شدند. منار جام از آثار برجستهٔ معماری دورهٔ غوری است و در فهرست میراث جهانی یونسکو قرار دارد.',task:'اهمیت منار جام را از دید معماری و تاریخ منطقه شرح دهید.'},
{cat:'dynasty',title:'تیموریان هرات',level:'مقدماتی',desc:'شکوفایی هنر، معماری، کتاب‌آرایی و ادب در هرات.',lesson:'هرات در دورهٔ تیموری به یکی از مراکز مهم هنر و فرهنگ در منطقه تبدیل شد. معماری، خوشنویسی، نگارگری، کتاب‌آرایی و ادبیات فارسی در این دوره رشد چشمگیری داشتند. این شکوفایی نتیجهٔ حمایت درباری و فعالیت هنرمندان و دانشوران بود.',task:'سه نمونه از هنرها یا دستاوردهای فرهنگی هرات دورهٔ تیموری را نام ببرید.'},
{cat:'modern',title:'شکل‌گیری دولت افغانستان در دورهٔ جدید',level:'مقدماتی',desc:'تحولات سیاسی سدهٔ هجدهم و شکل‌گیری دولت درانی.',lesson:'در میانهٔ سدهٔ هجدهم، احمدشاه درانی در شکل‌گیری یک دولت منطقه‌ای نقش محوری داشت. دربارهٔ تاریخ دقیق برخی رویدادها و چگونگی تداوم ساختار دولت، پژوهشگران از منابع تاریخی گوناگون استفاده می‌کنند.',task:'یک منبع تاریخی دربارهٔ احمدشاه درانی پیدا کنید و نویسنده و تاریخ نشر آن را ثبت کنید.'},
{cat:'modern',title:'افغانستان در سده‌های نوزدهم و بیستم',level:'مقدماتی',desc:'روابط خارجی، اصلاحات، استقلال و دگرگونی‌های اجتماعی.',lesson:'تاریخ افغانستان در این دو سده با رقابت قدرت‌های منطقه‌ای و جهانی، تحولات دولت‌سازی، اصلاحات و جنبش‌های اجتماعی همراه بوده است. بررسی این دوره نیازمند توجه به دیدگاه‌های داخلی و خارجی و مقایسهٔ اسناد است.',task:'یک رویداد مهم این دوره را انتخاب و دو منبع با دیدگاه متفاوت دربارهٔ آن مقایسه کنید.'},
{cat:'people',title:'شخصیت‌های علمی و ادبی',level:'مقدماتی',desc:'دانشمندان، شاعران، نویسندگان و اندیشمندان مرتبط با منطقه.',lesson:'منطقهٔ افغانستان امروزی و حوزهٔ فرهنگی پیرامون آن با نام‌های بسیاری در علم، ادب و هنر پیوند دارد. برای معرفی منصفانهٔ هر شخصیت باید زمان زندگی، آثار، زبان و زمینهٔ تاریخی او را دقیق مشخص کرد و از نسبت‌دادن انحصاری میراث مشترک پرهیز نمود.',task:'یک دانشمند یا شاعر مرتبط با تاریخ منطقه را انتخاب و سه اثر یا دستاورد مستند او را معرفی کنید.'},
{cat:'culture',title:'زبان‌ها و تنوع فرهنگی افغانستان',level:'مقدماتی',desc:'دری، پشتو، ازبیکی، ترکمنی، نورستانی و دیگر زبان‌ها.',lesson:'افغانستان کشوری چندزبانه و دارای تنوع فرهنگی است. زبان‌ها حامل حافظهٔ تاریخی، ادبیات شفاهی، دانش بومی و هویت جوامع‌اند. احترام به گویش‌ها و زبان‌های گوناگون به حفظ میراث ناملموس کمک می‌کند.',task:'سه نمونه از میراث شفاهی یا ادبی زبان‌های مختلف افغانستان را معرفی کنید.'},
{cat:'heritage',title:'آثار تاریخی و میراث جهانی',level:'مقدماتی',desc:'بامیان، منار جام، هرات و محوطه‌های باستانی.',lesson:'آثار تاریخی افغانستان بازتاب دوره‌ها و ارتباطات فرهنگی گوناگون‌اند. حفاظت از بناها و محوطه‌ها نیازمند مستندسازی، مراقبت تخصصی، جلوگیری از قاچاق آثار و مشارکت جوامع محلی است. ثبت جهانی یک اثر به معنای اهمیت آن در میراث بشری است.',task:'یک اثر تاریخی افغانستان را انتخاب و سه تهدید احتمالی برای حفاظت از آن را بنویسید.'},
{cat:'ancient',title:'آی‌خانم و باستان‌شناسی باختر',level:'متوسط',desc:'شهر باستانی آی‌خانم و شواهد ارتباطات فرهنگی.',lesson:'آی‌خانم در شمال‌شرق افغانستان امروزی، در نزدیکی محل پیوند رودهای آمو و کوکچه قرار دارد. کاوش‌های باستان‌شناسی در این محوطه، بقایای شهری از دورهٔ هلنیستی را آشکار کرده و برای مطالعهٔ تعاملات فرهنگی در باختر اهمیت دارد. تفسیر یافته‌ها باید بر گزارش‌های علمی کاوش تکیه کند.',task:'یک یافتهٔ باستان‌شناسی آی‌خانم را انتخاب کنید و توضیح دهید چه چیزی دربارهٔ زندگی شهری نشان می‌دهد.'},
{cat:'heritage',title:'بامیان و میراث بودایی',level:'مقدماتی',desc:'محوطه‌های باستانی، هنر صخره‌ای و حفاظت میراث.',lesson:'درهٔ بامیان بخشی مهم از شبکه‌های تاریخی و مذهبی آسیای مرکزی بود. آثار باستانی آن، از جمله بقایای صومعه‌ها و نقاشی‌های غاری، از رفت‌وآمد اندیشه‌ها و هنرها در مسیرهای منطقه‌ای حکایت دارند. حفاظت از این میراث نیازمند مستندسازی و همکاری تخصصی است.',task:'دو عامل طبیعی یا انسانی را که می‌توانند به محوطه‌های باستانی آسیب برسانند، توضیح دهید.'},
{cat:'culture',title:'موسیقی، صنایع دستی و میراث ناملموس',level:'مقدماتی',desc:'سنت‌های شفاهی، موسیقی محلی و هنرهای دستی.',lesson:'میراث فرهنگی تنها به بناها محدود نیست؛ موسیقی، روایت‌های شفاهی، مهارت‌های بافندگی، خوشنویسی، خوراک و آیین‌های اجتماعی نیز بخشی از میراث ناملموس‌اند. ثبت این میراث باید با رضایت و مشارکت صاحبان سنت‌ها انجام شود.',task:'یک سنت فرهنگی محل زندگی خود را با ذکر شیوهٔ انتقال آن به نسل بعد معرفی کنید.'},
{cat:'modern',title:'قانون اساسی و تحولات سیاسی سدهٔ بیستم',level:'متوسط',desc:'نهادهای دولتی، قانون اساسی ۱۳۴۳ و تحولات بعدی.',lesson:'تاریخ سیاسی افغانستان در سدهٔ بیستم شامل دوره‌های گوناگون پادشاهی، جمهوری و دگرگونی‌های نهادی است. قانون اساسی ۱۳۴۳ خورشیدی یکی از نقاط مهم تاریخ حقوقی معاصر به‌شمار می‌رود. بررسی این تحولات باید با مراجعه به متن اسناد و پژوهش‌های تاریخی انجام شود.',task:'یک ماده از قانون اساسی ۱۳۴۳ را در منبع معتبر بیابید و زمینهٔ تاریخی آن را خلاصه کنید.'},
{cat:'kings',title:'احمدشاه درانی و بنیان‌گذاری دولت درانی',level:'مقدماتی',desc:'زندگی سیاسی احمدشاه و شکل‌گیری دولت درانی در سدهٔ هجدهم.',lesson:'احمدشاه درانی در سال ۱۷۴۷ میلادی به رهبری رسید و دولت درانی را بنیان گذاشت؛ از این رو در تاریخ‌نگاری رایج از او به‌عنوان یکی از چهره‌های بنیادگذار دولت افغانستان یاد می‌شود. قلمرو و ساختار حکومت او در دوره‌های مختلف تغییر کرد و باید زمینهٔ منطقه‌ای آن نیز بررسی شود.',task:'سه عامل تاریخی و سیاسی مؤثر در شکل‌گیری دولت درانی را از منابع معتبر یادداشت کنید.'},
{cat:'kings',title:'تیمورشاه درانی و انتقال پایتخت',level:'مقدماتی',desc:'دورهٔ فرمانروایی تیمورشاه و نقش کابل در ساختار دولت.',lesson:'تیمورشاه درانی پس از احمدشاه به فرمانروایی رسید و در دورهٔ او مرکز سیاسی دولت از قندهار به کابل انتقال یافت. این جابه‌جایی را باید در پیوند با ملاحظات سیاسی، جغرافیایی و ادارهٔ قلمرو آن زمان مطالعه کرد.',task:'دو پیامد احتمالی انتقال مرکز سیاسی به کابل را توضیح دهید.'},
{cat:'kings',title:'دوست‌محمدخان و دورهٔ بارکزایی',level:'مقدماتی',desc:'بازگشت امارت کابل و رقابت‌های منطقه‌ای سدهٔ نوزدهم.',lesson:'دوست‌محمدخان از چهره‌های اصلی دودمان بارکزایی بود و در بخش مهمی از سدهٔ نوزدهم بر کابل و بخش‌هایی از افغانستان فرمان راند. دورهٔ او با رقابت قدرت‌های بریتانیا و روسیه در منطقه و جنگ اول افغان و انگلیس پیوند دارد.',task:'چرا موقعیت جغرافیایی افغانستان در رقابت‌های سدهٔ نوزدهم اهمیت داشت؟'},
{cat:'kings',title:'امیر شیرعلی‌خان و اصلاحات دولتی',level:'مقدماتی',desc:'تلاش‌های اصلاحی، اداره و روابط خارجی در سدهٔ نوزدهم.',lesson:'شیرعلی‌خان در دو دوره بر افغانستان فرمان راند. در دورهٔ او تلاش‌هایی برای سازمان‌دهی اداره و نیروهای نظامی صورت گرفت و روابط خارجی زیر فشار رقابت امپراتوری‌ها قرار داشت. ارزیابی اصلاحات باید بر اسناد و پژوهش‌های تاریخی تکیه کند.',task:'دو چالش داخلی و خارجی حکومت شیرعلی‌خان را نام ببرید.'},
{cat:'kings',title:'امیر عبدالرحمن‌خان و تمرکز قدرت',level:'متوسط',desc:'دولت‌سازی، تمرکز اداره و پیامدهای اجتماعی و سیاسی.',lesson:'عبدالرحمن‌خان از ۱۸۸۰ تا ۱۹۰۱ میلادی فرمانروایی کرد. دورهٔ او با تمرکز قدرت مرکزی، شکل‌گیری نهادهای اداری و نظامی و نیز جنگ‌ها، جابه‌جایی‌های اجباری و رنج گستردهٔ جوامع مختلف همراه بود. مطالعهٔ این دوره باید هم سیاست‌های دولت و هم تجربهٔ گروه‌های متأثر را در نظر گیرد.',task:'یک سیاست دولت‌سازی آن دوره را بررسی و پیامدهای متفاوت آن را برای جامعه توضیح دهید.'},
{cat:'kings',title:'امان‌الله‌خان و استقلال افغانستان',level:'مقدماتی',desc:'استقلال در سیاست خارجی، اصلاحات و تحولات دورهٔ امانی.',lesson:'امان‌الله‌خان پس از جنگ سوم افغان و انگلیس در ۱۹۱۹ میلادی استقلال کامل در سیاست خارجی را به دست آورد. دورهٔ او با اصلاحات آموزشی، اداری و اجتماعی و همچنین مخالفت‌ها و بحران‌های داخلی همراه شد. ارزیابی این دوره نیازمند توجه به دستاوردها، محدودیت‌ها و دیدگاه‌های گوناگون است.',task:'دو اصلاح دورهٔ امانی و دو چالش اجرای آن‌ها را معرفی کنید.'},
{cat:'kings',title:'محمدظاهرشاه و دورهٔ پادشاهی ۱۹۳۳ تا ۱۹۷۳',level:'مقدماتی',desc:'دورهٔ طولانی پادشاهی، قانون اساسی ۱۳۴۳ و تحولات اجتماعی.',lesson:'محمدظاهرشاه از ۱۹۳۳ تا ۱۹۷۳ پادشاه افغانستان بود. در این دوره پروژه‌های عمرانی و آموزشی گسترش یافتند و قانون اساسی ۱۳۴۳ خورشیدی زمینهٔ دوره‌ای از فعالیت پارلمانی و فضای سیاسی متفاوت را فراهم کرد؛ در عین حال، چالش‌های اقتصادی و سیاسی نیز ادامه داشت.',task:'سه تحول مهم سیاسی، آموزشی یا زیربنایی این دوره را با منبع و تاریخ ثبت کنید.'},
{cat:'kings',title:'پادشاهی، جمهوریت و دگرگونی نظام سیاسی',level:'متوسط',desc:'پایان سلطنت در ۱۹۷۳ و تغییر ساختار سیاسی افغانستان.',lesson:'در ۱۹۷۳ میلادی سلطنت با کودتای محمدداوودخان پایان یافت و نظام جمهوری اعلام شد. این رویداد نقطهٔ عطفی در تاریخ سیاسی معاصر بود و پس از آن کشور دوره‌های پیاپی تغییر نظام، جنگ و مداخلهٔ خارجی را تجربه کرد. روایت‌ها و ارزیابی‌ها در منابع مختلف تفاوت دارند.',task:'یک خط زمانی از ۱۹۷۳ تا پایان سدهٔ بیستم بسازید و برای هر رویداد منبع درج کنید.'},
{cat:'geography',title:'جغرافیای طبیعی افغانستان',level:'مقدماتی',desc:'کوه‌ها، رودخانه‌ها، دشت‌ها، اقلیم و منابع طبیعی.',lesson:'افغانستان کشوری محاط به خشکه با رشته‌کوه هندوکش، دره‌ها، دشت‌ها و حوضه‌های رودخانه‌ای گوناگون است. تفاوت ارتفاع و اقلیم بر زراعت، آب، ترانسپورت و شیوهٔ زندگی جوامع اثر می‌گذارد.',task:'سه حوزهٔ مهم رودخانه‌ای افغانستان را روی نقشه پیدا کنید و اهمیت آن‌ها را بنویسید.'},
{cat:'geography',title:'ولایت‌ها و مراکز اداری افغانستان',level:'مقدماتی',desc:'شناخت ولایت‌ها، مراکز، همسایگان و ویژگی‌های منطقه‌ای.',lesson:'افغانستان دارای ۳۴ ولایت است. برای مطالعهٔ هر ولایت باید مرکز اداری، ولسوالی‌ها، راه‌های ارتباطی، منابع اقتصادی و تنوع زبانی و فرهنگی آن را با نقشه‌ها و منابع رسمی به‌روز بررسی کرد؛ تقسیمات اداری ممکن است در منابع یا دوره‌های مختلف تفاوت داشته باشد.',task:'ولایت محل زندگی خود را انتخاب کنید و مرکز، همسایگان و سه ویژگی جغرافیایی آن را ثبت کنید.'},
{cat:'literature',title:'شعر و ادبیات فارسی دری در افغانستان',level:'مقدماتی',desc:'شاعران، سبک‌ها و سنت‌های ادبی فارسی دری.',lesson:'ادبیات فارسی دری در افغانستان بخشی از حوزهٔ گستردهٔ ادبیات فارسی است. هرات، بلخ، کابل و دیگر مراکز در دوره‌های مختلف در رشد شعر، نثر، خوشنویسی و آموزش نقش داشته‌اند. بررسی ادبیات باید به متن آثار، نسخه‌ها و زمینهٔ تاریخی توجه کند.',task:'یک شاعر مرتبط با تاریخ ادبی افغانستان را انتخاب و یک اثر او را با ذکر منبع معرفی کنید.'},
{cat:'literature',title:'ادبیات پشتو و سنت‌های شفاهی',level:'مقدماتی',desc:'شعر پشتو، داستان‌گویی و میراث ادبی شفاهی.',lesson:'ادبیات پشتو دارای سنت‌های مکتوب و شفاهی پرباری است. شعر، داستان، ضرب‌المثل و روایت‌های محلی در انتقال تجربه و حافظهٔ اجتماعی نقش دارند. برای معرفی آثار، نام شاعر، گونهٔ ادبی، نسخه و زمینهٔ تاریخی باید دقیق ثبت شود.',task:'یک نمونه از ضرب‌المثل یا روایت شفاهی پشتو را با توضیح مفهوم و زمینهٔ فرهنگی آن معرفی کنید.'}
,
{cat:'geography',title:'اطلس جغرافیایی افغانستان: موقعیت و همسایگان',level:'مقدماتی',desc:'شناخت جایگاه افغانستان در آسیای مرکزی و جنوبی و کشورهای هم‌مرز.',lesson:'افغانستان کشوری محاط به خشکه در قلب آسیاست. این کشور با پاکستان، ایران، ترکمنستان، ازبیکستان، تاجیکستان و چین مرز مشترک دارد. موقعیت جغرافیایی آن در طول تاریخ بر رفت‌وآمد مردم، تجارت و ارتباطات فرهنگی اثر گذاشته است.',task:'نام شش کشور هم‌مرز افغانستان را بنویسید و موقعیت هرکدام را نسبت به افغانستان مشخص کنید.'},
{cat:'geography',title:'کوه‌های هندوکش و گذرگاه‌های تاریخی',level:'مقدماتی',desc:'نقش رشته‌کوه هندوکش در اقلیم، رفت‌وآمد و زندگی مردم.',lesson:'هندوکش یکی از رشته‌کوه‌های مهم افغانستان است و در شکل‌گیری آب‌وهوا، حوضه‌های آبریز و راه‌های ارتباطی نقش دارد. گذرگاه‌هایی چون سالنگ در پیوند مناطق شمالی و جنوبی اهمیت داشته‌اند؛ مسیرها و اهمیت آن‌ها در دوره‌های تاریخی یکسان نبوده است.',task:'توضیح دهید کوهستان چگونه می‌تواند هم مانع رفت‌وآمد و هم سرچشمهٔ آب و منابع طبیعی باشد.'},
{cat:'geography',title:'رود آمو و شمال افغانستان',level:'مقدماتی',desc:'آشنایی با رود آمو و نقش آن در جغرافیای تاریخی شمال.',lesson:'آمو دریا در بخش بزرگی از مسیر خود مرز طبیعی میان افغانستان و کشورهای آسیای مرکزی را تشکیل می‌دهد. این رود در تاریخ منطقه با نام‌های گوناگون شناخته شده و در کشاورزی، سکونتگاه‌ها و ارتباطات اقتصادی اهمیت داشته است.',task:'سه کاربرد مهم رودخانه‌ها برای جوامع انسانی را فهرست کنید.'},
{cat:'geography',title:'حوضهٔ هلمند و دریاچهٔ هامون',level:'متوسط',desc:'شناخت رود هلمند، سیستان تاریخی و اهمیت آب.',lesson:'رود هلمند از مناطق مرکزی و جنوب‌غرب افغانستان سرچشمه می‌گیرد و به سوی سیستان جریان می‌یابد. حوضهٔ هلمند و هامون در تاریخ کشاورزی و سکونت انسانی منطقه اهمیت داشته‌اند. وضعیت آب و تالاب‌ها به بارندگی، مدیریت آب و شرایط اقلیمی وابسته است.',task:'توضیح دهید چرا مدیریت مشترک و پایدار آب برای مناطق پایین‌دست و بالادست اهمیت دارد.'},
{cat:'geography',title:'کابل و مسیرهای ارتباطی شرق',level:'مقدماتی',desc:'جایگاه کابل در پیوند راه‌های تاریخی و مراکز شهری.',lesson:'کابل در یک درهٔ مهم میان کوهستان‌ها قرار دارد و در دوره‌های مختلف مرکز سیاسی، تجارتی و فرهنگی بوده است. مسیرهای شرق و جنوب‌شرق، کابل را به گذرگاه‌ها و مناطق پیرامونی پیوند داده‌اند.',task:'دو عامل جغرافیایی را نام ببرید که در رشد یک شهر نقش دارند.'},
{cat:'geography',title:'هرات، قندهار و راه‌های بازرگانی',level:'متوسط',desc:'شناخت دو شهر مهم و پیوند آن‌ها با مسیرهای منطقه‌ای.',lesson:'هرات در غرب افغانستان و قندهار در جنوب کشور از مراکز تاریخی مهم بوده‌اند. موقعیت این شهرها در مسیرهای ارتباطی میان ایران، آسیای مرکزی و شبه‌قاره، در دوره‌های گوناگون بر تجارت و فرهنگ آن‌ها اثر گذاشته است.',task:'روی نقشه مسیر تقریبی هرات تا قندهار را پیدا کنید و دربارهٔ اهمیت راه‌های میان‌شهری بنویسید.'},
{cat:'geography',title:'بلخ، بامیان و غزنی: شهرها و چشم‌اندازهای تاریخی',level:'مقدماتی',desc:'پیوند جغرافیا و میراث تاریخی در سه منطقهٔ مهم.',lesson:'بلخ در شمال، بامیان در مرکز و غزنی در جنوب‌شرق افغانستان قرار دارند. هرکدام چشم‌انداز طبیعی و میراث تاریخی ویژه‌ای دارند. شناخت موقعیت جغرافیایی این شهرها به درک بهتر تجارت، معماری، مهاجرت و تحولات تاریخی کمک می‌کند.',task:'این سه شهر را روی نقشه مشخص کنید و برای هرکدام یک ویژگی تاریخی یا جغرافیایی بنویسید.'},
{cat:'geography',title:'ولایت‌ها و تنوع طبیعی افغانستان',level:'مقدماتی',desc:'آشنایی با تفاوت‌های اقلیمی، طبیعی و اقتصادی ولایت‌ها.',lesson:'افغانستان دارای ۳۴ ولایت است. از دشت‌های خشک تا دره‌های سرسبز و کوهستان‌های بلند، تنوع طبیعی بر نوع زراعت، مالداری، معماری و شیوهٔ زندگی مردم اثر می‌گذارد. برای آمار و نام‌های اداری باید از نقشه‌ها و منابع رسمی به‌روز استفاده شود.',task:'ولایت محل زندگی خود را انتخاب کنید و سه ویژگی طبیعی یا اقتصادی آن را بنویسید.'}

];
const afghanProvinceDirectory=[
 ['Badakhshan','Fayzabad'],['Badghis','Qala-e-Naw'],['Baghlan','Pul-e-Khumri'],['Balkh','Mazar-e-Sharif'],['Bamyan','Bamyan'],['Daykundi','Nili'],['Farah','Farah'],['Faryab','Maymana'],['Ghazni','Ghazni'],['Ghor','Firozkoh'],['Helmand','Lashkar Gah'],['Herat','Herat'],['Jawzjan','Sheberghan'],['Kabul','Kabul'],['Kandahar','Kandahar'],['Kapisa','Mahmud-i-Raqi'],['Khost','Khost'],['Kunar','Asadabad'],['Kunduz','Kunduz'],['Laghman','Mehtarlam'],['Logar','Pul-e-Alam'],['Nangarhar','Jalalabad'],['Nimroz','Zaranj'],['Nuristan','Parun'],['Paktia','Gardez'],['Paktika','Sharana'],['Panjshir','Bazarak'],['Parwan','Charikar'],['Samangan','Aybak'],['Sar-e Pol','Sar-e Pol'],['Takhar','Taloqan'],['Uruzgan','Tarinkot'],['Maidan Wardak','Maidan Shahr'],['Zabul','Qalat']
];
const afghanProvinceLabels={
'Badakhshan':{fa:'بدخشان',ps:'بدخشان',capitalFa:'فیض‌آباد',capitalPs:'فیض‌آباد'},
'Badghis':{fa:'بادغیس',ps:'بادغیس',capitalFa:'قلعه‌نو',capitalPs:'قلعه نو'},
'Baghlan':{fa:'بغلان',ps:'بغلان',capitalFa:'پلخمری',capitalPs:'پلخمري'},
'Balkh':{fa:'بلخ',ps:'بلخ',capitalFa:'مزار شریف',capitalPs:'مزار شریف'},
'Bamyan':{fa:'بامیان',ps:'بامیان',capitalFa:'بامیان',capitalPs:'بامیان'},
'Daykundi':{fa:'دایکندی',ps:'دایکندي',capitalFa:'نیلی',capitalPs:'نیلي'},
'Farah':{fa:'فراه',ps:'فراه',capitalFa:'فراه',capitalPs:'فراه'},
'Faryab':{fa:'فاریاب',ps:'فاریاب',capitalFa:'میمنه',capitalPs:'میمنه'},
'Ghazni':{fa:'غزنی',ps:'غزني',capitalFa:'غزنی',capitalPs:'غزني'},
'Ghor':{fa:'غور',ps:'غور',capitalFa:'فیروزکوه',capitalPs:'فیروزکوه'},
'Helmand':{fa:'هلمند',ps:'هلمند',capitalFa:'لشکرگاه',capitalPs:'لښکرګاه'},
'Herat':{fa:'هرات',ps:'هرات',capitalFa:'هرات',capitalPs:'هرات'},
'Jawzjan':{fa:'جوزجان',ps:'جوزجان',capitalFa:'شبرغان',capitalPs:'شبرغان'},
'Kabul':{fa:'کابل',ps:'کابل',capitalFa:'کابل',capitalPs:'کابل'},
'Kandahar':{fa:'قندهار',ps:'کندهار',capitalFa:'قندهار',capitalPs:'کندهار'},
'Kapisa':{fa:'کاپیسا',ps:'کاپیسا',capitalFa:'محمود راقی',capitalPs:'محمودراقي'},
'Khost':{fa:'خوست',ps:'خوست',capitalFa:'خوست',capitalPs:'خوست'},
'Kunar':{fa:'کنر',ps:'کونړ',capitalFa:'اسعدآباد',capitalPs:'اسعدآباد'},
'Kunduz':{fa:'کندز',ps:'کندز',capitalFa:'کندز',capitalPs:'کندز'},
'Laghman':{fa:'لغمان',ps:'لغمان',capitalFa:'مهترلام',capitalPs:'مهترلام'},
'Logar':{fa:'لوگر',ps:'لوګر',capitalFa:'پل علم',capitalPs:'پل علم'},
'Nangarhar':{fa:'ننگرهار',ps:'ننګرهار',capitalFa:'جلال‌آباد',capitalPs:'جلال‌آباد'},
'Nimroz':{fa:'نیمروز',ps:'نیمروز',capitalFa:'زرنج',capitalPs:'زرنج'},
'Nuristan':{fa:'نورستان',ps:'نورستان',capitalFa:'پارون',capitalPs:'پارون'},
'Paktia':{fa:'پکتیا',ps:'پکتیا',capitalFa:'گردیز',capitalPs:'ګردېز'},
'Paktika':{fa:'پکتیکا',ps:'پکتیکا',capitalFa:'شرنه',capitalPs:'ښرنه'},
'Panjshir':{fa:'پنجشیر',ps:'پنجشېر',capitalFa:'بازارک',capitalPs:'بازارک'},
'Parwan':{fa:'پروان',ps:'پروان',capitalFa:'چاریکار',capitalPs:'چاریکار'},
'Samangan':{fa:'سمنگان',ps:'سمنګان',capitalFa:'ایبک',capitalPs:'ایبک'},
'Sar-e Pol':{fa:'سرپل',ps:'سرپل',capitalFa:'سرپل',capitalPs:'سرپل'},
'Takhar':{fa:'تخار',ps:'تخار',capitalFa:'تالقان',capitalPs:'تالقان'},
'Uruzgan':{fa:'ارزگان',ps:'اروزګان',capitalFa:'ترینکوت',capitalPs:'ترینکوټ'},
'Maidan Wardak':{fa:'میدان وردک',ps:'میدان وردګ',capitalFa:'میدان‌شهر',capitalPs:'میدانښار'},
'Zabul':{fa:'زابل',ps:'زابل',capitalFa:'قلات',capitalPs:'قلات'}
};
function afghanProvinceDisplayName(province,lang){
 const item=afghanProvinceLabels[province];
 return !item?province:lang==='en'?province:lang==='ps'?item.ps:item.fa;
}
function afghanCapitalDisplayName(province,lang,englishCapital){
 const item=afghanProvinceLabels[province];
 return !item?englishCapital:lang==='en'?englishCapital:lang==='ps'?item.capitalPs:item.capitalFa;
}

const afghanProvinceAttractions=[
 {province:'Bamyan',name:'چشم‌انداز فرهنگی و بقایای باستان‌شناختی درهٔ بامیان',type:'میراث جهانی فرهنگی',status:'ثبت‌شده در فهرست میراث جهانی یونسکو در ۲۰۰۳؛ در فهرست میراث در معرض خطر نیز قرار دارد.',description:'مجموعه‌ای از صومعه‌ها و زیارتگاه‌های بودایی، غارها و استحکامات تاریخی؛ شامل جایگاه تندیس‌های بودا که در ۲۰۰۱ تخریب شدند.',url:'https://whc.unesco.org/en/list/208/',source:'UNESCO World Heritage Centre'},
 {province:'Ghor',name:'منار و بقایای باستان‌شناختی جام',type:'میراث جهانی فرهنگی',status:'ثبت‌شده در فهرست میراث جهانی یونسکو در ۲۰۰۲؛ در فهرست میراث در معرض خطر نیز قرار دارد.',description:'منار آجری حدود ۶۵ متری در درهٔ رود هری‌رود؛ یونسکو تاریخ ساخت آن را ۱۱۹۴ میلادی ذکر می‌کند.',url:'https://whc.unesco.org/en/list/211/',source:'UNESCO World Heritage Centre'},
 {province:'Nuristan',name:'دره‌های پیچ و ویگل',type:'میراث طبیعی و تنوع زیستی — منطقهٔ کلیدی تنوع زیستی',status:'در پایگاه Key Biodiversity Areas به‌عنوان منطقهٔ تأییدشده ثبت است؛ ارزیابی درج‌شده مربوط به ۱۹۹۴ است و نباید آن را به‌معنای پارک ملی با مدیریت فعال دانست.',description:'دره‌های کوهستانی در نورستان و شاخه‌های رود کنر؛ منبع KBA ارتفاع حدود ۱۱۰۰ تا ۳۰۰۰ متر و پوشش جنگلی بلوط، مخروطیان و سرو کوهی را توصیف می‌کند. مختصات مرکزی منبع: ۳۵٫۰۰۰۰ شمالی، ۷۰٫۸۳۳۳ شرقی.',url:'https://www.keybiodiversityareas.org/en/site/factsheet/8006',source:'Key Biodiversity Areas — Pech and Waygal valleys'},
 {province:'Nuristan',name:'جنگل‌ها و میراث طبیعی نورستان',type:'میراث طبیعی — ساحهٔ حفاظت‌شده',status:'ادارهٔ ملی حفاظت محیط زیست افغانستان «نورستان» را در فهرست ساحات رسمی اعلان‌شده آورده است؛ حدود، وضعیت مدیریت و امکانات بازدید باید جداگانه تأیید شود.',description:'نورستان دارای دره‌های پرشیب و جنگل‌های کوهستانی است. این مدخل معرفی عمومی میراث طبیعی ولایت است و از ادعای وجود مسیر گردشگری یا خدمات بازدید تأییدنشده خودداری می‌کند.',url:'https://www.nepa.gov.af/showDariPage/64',source:'ادارهٔ ملی حفاظت محیط زیست افغانستان (NEPA)'},
 {province:'Nuristan',name:'گالری ملی هنر — شعبهٔ نورستان',type:'میراث فرهنگی معاصر و هنرهای تجسمی',status:'وزارت اطلاعات و فرهنگ در ۱۴ اکتوبر ۲۰۲۴ از افتتاح شعبهٔ گالری ملی در ریاست اطلاعات و فرهنگ نورستان خبر داده است.',description:'بر اساس گزارش وزارت، در آغاز کار ۲۰ اثر هنری شامل نقاشی، خطاطی و مینیاتور به نمایش گذاشته شد. این مورد یک مرکز فرهنگی معاصر است، نه محوطهٔ باستانی.',url:'https://moic.gov.af/en/branch-national-gallery-has-been-established-nuristan',source:'وزارت اطلاعات و فرهنگ افغانستان — ۱۴ اکتوبر ۲۰۲۴'},
 {province:'Kandahar',name:'زیارتگاه خرقهٔ مبارک',type:'میراث فرهنگی و مذهبی — معرفی پورتال ملی',status:'در پورتال ملی افغانستان به‌عنوان میراث فرهنگی در قندهار معرفی شده است؛ این صفحه به‌تنهایی وضعیت حفاظت یا شرایط بازدید را تأیید نمی‌کند.',description:'زیارتگاهی شناخته‌شده در قندهار که در پورتال ملی افغانستان به‌عنوان محل نگهداری خرقهٔ منسوب به پیامبر اسلام معرفی شده است. روایت انتساب، یک باور دینی و تاریخی محلی است و در این اطلس به‌عنوان ادعای مستند مستقل عرضه نمی‌شود.',url:'https://afg.gov.af/places/kirka-sharif-kandahar',source:'پورتال ملی افغانستان — معرفی خرقهٔ مبارک'},
 {province:'Kandahar',name:'چهل‌زینه (چهل‌پله)',type:'میراث تاریخی — معرفی پورتال ملی',status:'در پورتال ملی افغانستان به‌عنوان میراث فرهنگی قندهار معرفی شده است؛ جزئیات تاریخ‌گذاری و دسترسی نیازمند منبع تخصصی جداگانه است.',description:'اتاقک و پله‌های تراشیده‌شده در صخره بالای قندهار؛ پورتال ملی آن را به دورهٔ بابر نسبت می‌دهد.',url:'https://afg.gov.af/places/chihilzina-kandahar',source:'پورتال ملی افغانستان — معرفی چهل‌زینه'},
 {province:'Badakhshan',name:'پارک ملی واخان',type:'میراث طبیعی — ساحهٔ حفاظت‌شدهٔ رسمی',status:'ادارهٔ ملی حفاظت محیط زیست افغانستان پارک ملی واخان را در فهرست ساحات حفاظت‌شدهٔ رسمی آورده است. پایگاه Key Biodiversity Areas نیز آن را به‌عنوان منطقهٔ کلیدی تنوع زیستی ثبت کرده؛ این اطلاعات خدمات گردشگری یا مدیریت میدانی کنونی را تأیید نمی‌کند.',description:'منطقه‌ای کوهستانی در ولسوالی واخان ولایت بدخشان با اهمیت طبیعی و تنوع زیستی. شرایط دسترسی، امنیت و امکانات بازدید باید پیش از سفر جداگانه بررسی شود.',url:'https://www.nepa.gov.af/showDariPage/64',source:'ادارهٔ ملی حفاظت محیط زیست افغانستان (NEPA)'},
 {province:'Ghazni',name:'آثار تاریخی شهر غزنی',type:'آثار تاریخی — گزارش وزارت اطلاعات و فرهنگ',status:'گزارش وزارت اطلاعات و فرهنگ افغانستان به تاریخ ۱۱ نوامبر ۲۰۲۳ از بازسازی شش اثر تاریخی خبر می‌دهد؛ این گزارش به معنای ثبت در فهرست میراث جهانی یونسکو نیست.',description:'در گزارش رسمی، آرامگاه‌های خواجه ملکیار پرنده و تاج اولیا، برج بلابین در شهر کهنهٔ غزنی و سنگ‌فرش دو قلعه از دورهٔ غزنویان از جمله آثار نام‌برده‌شده‌اند. محل دقیق و وضعیت کنونی هر اثر نیازمند بررسی میدانی است.',url:'https://www.moic.gov.af/en/6-historical-monuments-ghazni-province-have-been-fundamentally-reconstructed',source:'وزارت اطلاعات و فرهنگ افغانستان — گزارش ۱۱ نوامبر ۲۰۲۳'},
 {province:'Kabul',name:'باغ بابر (باغ بابرشاه)',type:'میراث فرهنگی — فهرست موقت یونسکو',status:'در فهرست موقت میراث جهانی یونسکو از ۲ نوامبر ۲۰۰۹؛ ثبت نهایی در فهرست میراث جهانی نیست.',description:'باغ تاریخی در دامنهٔ کوه شیر دروازه در جنوب‌غرب شهر کابل؛ یونسکو آن را باغی پلکانی با ۱۵ تراس معرفی می‌کند که با ظهیرالدین محمد بابر پیوند دارد. مرمت آن از ۲۰۰۳ با همکاری نهادهای میراث فرهنگی انجام شد.',url:'https://whc.unesco.org/en/tentativelists/5469/',source:'UNESCO World Heritage Centre — Bagh-e Babur'},
 {province:'Herat',name:'شهر تاریخی هرات',type:'میراث فرهنگی — فهرست موقت یونسکو',status:'در فهرست موقت یونسکو از ۱۷ آگست ۲۰۰۴؛ ثبت نهایی در فهرست میراث جهانی نیست.',description:'یونسکو به ارگ اختیارالدین، مجموعهٔ مصلی و آثار معماری تیموری، مسجد جامع و بافت تاریخی شهر اشاره می‌کند. این معرفی بر پایهٔ پروندهٔ فهرست موقت است.',url:'https://whc.unesco.org/en/tentativelists/1927/',source:'UNESCO World Heritage Centre — City of Herat'},
 {province:'Balkh',name:'شهر باستانی بلخ (باختر)',type:'میراث فرهنگی — فهرست موقت یونسکو',status:'در فهرست موقت یونسکو از ۱۷ آگست ۲۰۰۴؛ ثبت نهایی در فهرست میراث جهانی نیست.',description:'محوطهٔ شهری باستانی بلخ که در پروندهٔ یونسکو به‌عنوان شهر باستانی باختر معرفی شده است؛ جزئیات و حدود محوطه باید با اسناد باستان‌شناسی سنجیده شود.',url:'https://whc.unesco.org/en/tentativelists/1928/',source:'UNESCO World Heritage Centre — City of Balkh'},

 {province:'Bamyan',name:'منظرهٔ طبیعی شاه فولادی',type:'میراث طبیعی — ساحهٔ حفاظت‌شدهٔ رسمی',status:'ادارهٔ ملی حفاظت محیط زیست افغانستان شاه فولادی را در فهرست ساحات حفاظت‌شدهٔ رسمی آورده است. حدود و وضعیت کنونی مدیریت و بازدید باید از ادارهٔ مسئول تأیید شود.',description:'منظرهٔ طبیعی کوهستانی در مرکز ولایت بامیان؛ NEPA آن را در فهرست ساحات حفاظت‌شدهٔ رسمی ذکر می‌کند.',url:'https://www.nepa.gov.af/showDariPage/64',source:'ادارهٔ ملی حفاظت محیط زیست افغانستان (NEPA)'},
 {province:'Bamyan',name:'منظرهٔ طبیعی باارزش پلاتوی بامیان',type:'میراث طبیعی — ساحهٔ حفاظت‌شدهٔ رسمی',status:'ادارهٔ ملی حفاظت محیط زیست افغانستان پلاتوی بامیان را در فهرست ساحات حفاظت‌شدهٔ رسمی آورده است؛ جزئیات حدود و مدیریت کنونی نیازمند تأیید جداگانه است.',description:'منطقهٔ طبیعی گسترده در یکاولنگ، کهمرد و سیغان ولایت بامیان، مطابق جدول موقعیت ساحات حفاظت‌شده در وب‌سایت NEPA.',url:'https://www.nepa.gov.af/showDariPage/64',source:'ادارهٔ ملی حفاظت محیط زیست افغانستان (NEPA)'},
 {province:'Kabul',name:'زیستگاه پرندگان آبی کول حشمت‌خان',type:'میراث طبیعی — زیستگاه حفاظت‌شدهٔ رسمی',status:'ادارهٔ ملی حفاظت محیط زیست افغانستان کول حشمت‌خان را در فهرست ساحات حفاظت‌شدهٔ رسمی آورده است. وضعیت کنونی دسترسی عمومی و مدیریت باید جداگانه تأیید شود.',description:'زیستگاه پرندگان آبی در کابل که NEPA موقعیت آن را در نواحی اول و هشتم شهر ذکر می‌کند؛ این معرفی به معنای مجازبودن ورود یا بازدید نیست.',url:'https://www.nepa.gov.af/showDariPage/64',source:'ادارهٔ ملی حفاظت محیط زیست افغانستان (NEPA)'}, {province:'Bamyan',name:'بند امیر',type:'میراث طبیعی — ساحهٔ حفاظت‌شدهٔ رسمی',status:'ادارهٔ ملی حفاظت محیط زیست افغانستان بند امیر را در فهرست ساحات حفاظت‌شدهٔ رسمی آورده است. بند امیر همچنین در فهرست موقت یونسکو قرار دارد؛ این به معنای ثبت نهایی در فهرست میراث جهانی نیست.',description:'مجموعهٔ دریاچه‌های طبیعی در ولسوالی یکاولنگ ولایت بامیان. این مدخل وضعیت کنونی دسترسی، امنیت، خدمات بازدید یا بازبودن مسیرها را تأیید نمی‌کند.',url:'https://www.nepa.gov.af/showDariPage/64',source:'ادارهٔ ملی حفاظت محیط زیست افغانستان (NEPA)'}
];
const afghanAttractionTranslations={
'چشم‌انداز فرهنگی و بقایای باستان‌شناختی درهٔ بامیان':{en:{name:'Cultural Landscape and Archaeological Remains of the Bamiyan Valley',type:'Cultural World Heritage',status:'Inscribed on the UNESCO World Heritage List in 2003; also on the List of World Heritage in Danger.',description:'A landscape of Buddhist monastic ensembles, sanctuaries, caves and historic fortifications, including the niches where the Buddha statues stood before their destruction in 2001.'},ps:{name:'د بامیان درې کلتوري منظره او لرغوني آثار',type:'کلتوري نړیوال میراث',status:'په ۲۰۰۳ کال کې د یونسکو نړیوال میراث په نوملړ کې ثبت شوی او د خطر له نوملړ سره هم تړاو لري.',description:'د بودايي صومعو، عبادتځایونو، سمڅو او تاریخي کلاګانو منظره؛ د بودا د هغو مجسمو ځایونه هم پکې شامل دي چې په ۲۰۰۱ کال کې ویجاړې شوې.'}},
'منار و بقایای باستان‌شناختی جام':{en:{name:'Minaret and Archaeological Remains of Jam',type:'Cultural World Heritage',status:'Inscribed on the UNESCO World Heritage List in 2002 and on the List of World Heritage in Danger.',description:'An approximately 65-metre brick minaret in the Hari Rud valley; UNESCO dates its construction to 1194.'},ps:{name:'د جام منار او لرغوني پاتې شوني',type:'کلتوري نړیوال میراث',status:'په ۲۰۰۲ کال کې د یونسکو نړیوال میراث او د خطر په نوملړ کې ثبت شوی.',description:'د هریرود په دره کې نږدې ۶۵ متره لوړ د خښتو منار؛ یونسکو یې د جوړېدو نېټه ۱۱۹۴ میلادي ښيي.'}},
'دره‌های پیچ و ویگل':{en:{name:'Pech and Waygal Valleys',type:'Natural heritage and biodiversity — Key Biodiversity Area',status:'Listed as a confirmed Key Biodiversity Area; the recorded assessment dates to 1994. This does not establish an actively managed national park.',description:'Mountain valleys in Nuristan and tributaries of the Kunar River, with oak, conifer and juniper forest cover.'},ps:{name:'د پېچ او ویګل درې',type:'طبیعي میراث او ژوندي تنوع — مهمه سیمه',status:'د ژوندي تنوع د مهمې سیمې په توګه ثبت شوې؛ ثبت شوې ارزونه یې د ۱۹۹۴ کال ده. دا په خپله د فعال ملي پارک معنا نه لري.',description:'په نورستان کې غرنۍ درې او د کونړ سیند څانګې، چې د بلوط، مخروطي ونو او اَرعر ځنګلونه لري.'}},
'جنگل‌ها و میراث طبیعی نورستان':{en:{name:'Forests and Natural Heritage of Nuristan',type:'Natural heritage — protected area listing',status:'Nuristan appears in the Afghanistan National Environmental Protection Agency list of declared protected areas; boundaries and current management require separate confirmation.',description:'A general introduction to Nuristan’s steep valleys and mountain forests; it does not claim verified visitor services or trails.'},ps:{name:'د نورستان ځنګلونه او طبیعي میراث',type:'طبیعي میراث — خوندي سیمه',status:'نورستان د افغانستان د چاپېریال ساتنې ملي ادارې په اعلان شوو خوندي سیمو کې یاد شوی؛ پولې او اوسنی مدیریت جلا تایید ته اړتیا لري.',description:'د نورستان د لوړو درو او غرنیو ځنګلونو عمومي پېژندنه؛ د سیلانیانو د تایید شوو خدمتونو یا لارو ادعا نه کوي.'}},
'گالری ملی هنر — شعبهٔ نورستان':{en:{name:'National Art Gallery — Nuristan Branch',type:'Contemporary cultural heritage and visual arts',status:'The Ministry of Information and Culture announced the branch opening on 14 October 2024.',description:'The ministry reported that 20 artworks, including painting, calligraphy and miniature art, were displayed at opening. This is a contemporary cultural venue, not an archaeological site.'},ps:{name:'د ملي هنري ګالري — د نورستان څانګه',type:'اوسنی کلتوري میراث او انځوریز هنر',status:'د اطلاعاتو او کلتور وزارت د ۲۰۲۴ کال د اکتوبر په ۱۴مه د دې څانګې د پرانیستې خبر ورکړ.',description:'وزارت د پرانیستې پر مهال د نقاشۍ، خطاطۍ او میناتور په ګډون د ۲۰ هنري اثارو د نندارې یادونه کړې. دا معاصر کلتوري مرکز دی، لرغونی ځای نه دی.'}},
'زیارتگاه خرقهٔ مبارک':{en:{name:'Khirqa Sharif Shrine',type:'Cultural and religious heritage — national portal',status:'Listed as cultural heritage in Kandahar on the national portal; this page alone does not verify conservation status or visitor access.',description:'A well-known shrine in Kandahar associated with a cloak traditionally attributed to the Prophet Muhammad. The attribution is presented as a local religious-historical tradition, not an independently established fact.'},ps:{name:'د خرقې مبارک زیارت',type:'کلتوري او مذهبي میراث — ملي پورټل',status:'په ملي پورټل کې د کندهار د کلتوري میراث په توګه یاد شوی؛ دا پاڼه د ساتنې حالت یا د لیدنې شرایط نه تاییدوي.',description:'په کندهار کې مشهور زیارت چې د حضرت محمد ﷺ سره منسوبې خرقې له روایت سره تړاو لري؛ دا د سیمه‌ییز مذهبي ـ تاریخي روایت په توګه وړاندې کېږي.'}},
'چهل‌زینه (چهل‌پله)':{en:{name:'Chihilzina (Forty Steps)',type:'Historic heritage — national portal',status:'Listed on the national portal; dating and current access need additional specialist sources.',description:'A rock-cut chamber and steps above Kandahar; the national portal associates it with the era of Babur.'},ps:{name:'څلوېښت زینې',type:'تاریخي میراث — ملي پورټل',status:'په ملي پورټل کې یاد شوی؛ د نېټې او اوسني لاسرسي لپاره نورو تخصصي سرچینو ته اړتیا ده.',description:'د کندهار پر لوړه ډبرینه غونډۍ کې تراشل شوې کوټه او زینې؛ ملي پورټل یې د بابر له دورې سره تړي.'}},
'پارک ملی واخان':{en:{name:'Wakhan National Park',type:'Natural heritage and Key Biodiversity Area',status:'Listed as a confirmed Key Biodiversity Area; the latest assessment shown is from 2017. This does not confirm current visitor services or field management.',description:'A high-mountain region in Badakhshan with global biodiversity importance.'},ps:{name:'د واخان ملي پارک',type:'طبیعي میراث او د ژوندي تنوع مهمه سیمه',status:'د ژوندي تنوع د مهمې تایید شوې سیمې په توګه ثبت شوی؛ وروستۍ ښودل شوې ارزونه یې د ۲۰۱۷ کال ده. دا د اوسنیو سیاحتي خدمتونو یا ساحوي مدیریت تایید نه دی.',description:'په بدخشان کې لوړه غرنۍ سیمه چې د ژوندي تنوع له نړیوال پلوه ارزښت لري.'}},
'آثار تاریخی شهر غزنی':{en:{name:'Historic Monuments of Ghazni City',type:'Historic monuments — Ministry report',status:'A Ministry of Information and Culture report dated 11 November 2023 describes the restoration of six monuments; this is not UNESCO World Heritage inscription.',description:'The report names the tombs of Khwaja Malyar Paranda and Taj Aulia, the Balabeyn Tower in old Ghazni, and stone paving at two Ghaznavid-era forts. Exact locations and current condition require field verification.'},ps:{name:'د غزني ښار تاریخي آبدې',type:'تاریخي آبدې — د وزارت راپور',status:'د اطلاعاتو او کلتور وزارت د ۲۰۲۳ کال د نومبر ۱۱مې راپور د شپږو تاریخي آبدو د بیارغونې یادونه کوي؛ دا د یونسکو نړیوال ثبت نه دی.',description:'په راپور کې د خواجه ملیار پرنده او تاج اولیا هدیرې، د زړې غزني د بلالبین برج او د غزنوي دورې د دوو کلاوو ډبرینې لارې یادې شوې دي. دقیق ځایونه او اوسنی حالت ساحوي تایید ته اړتیا لري.'}},
'باغ بابر (باغ بابرشاه)':{en:{name:'Bagh-e Babur (Babur’s Garden)',type:'Cultural heritage — UNESCO Tentative List',status:'On UNESCO’s Tentative List since 2 November 2009; it is not inscribed on the World Heritage List.',description:'A historic terraced garden on the slopes of Sher Darwaza in southwest Kabul, associated with Zahir-ud-Din Muhammad Babur.'},ps:{name:'د بابر بڼ',type:'کلتوري میراث — د یونسکو موقتي نوملړ',status:'د ۲۰۰۹ کال د نومبر له ۲مې د یونسکو په موقتي نوملړ کې دی؛ د نړیوال میراث په وروستي نوملړ کې نه دی ثبت شوی.',description:'د کابل په سوېل لوېدیځ کې د شیر دروازې پر لمنو تاریخي پوړیز بڼ چې له ظهیرالدین محمد بابر سره تړاو لري.'}},
'شهر تاریخی هرات':{en:{name:'Historic City of Herat',type:'Cultural heritage — UNESCO Tentative List',status:'On UNESCO’s Tentative List since 17 August 2004; not inscribed on the World Heritage List.',description:'UNESCO’s tentative file refers to the Citadel of Herat, the Timurid Musalla complex, the Friday Mosque and the historic urban fabric.'},ps:{name:'د هرات تاریخي ښار',type:'کلتوري میراث — د یونسکو موقتي نوملړ',status:'د ۲۰۰۴ کال د اګست له ۱۷مې د یونسکو په موقتي نوملړ کې دی؛ د نړیوال میراث په وروستي نوملړ کې نه دی ثبت شوی.',description:'د یونسکو په دوسیه کې د اختیارالدین کلا، د تیموري مصلی مجموعه، جامع جومات او د ښار تاریخي جوړښت یاد شوي دي.'}},
'شهر باستانی بلخ (باختر)':{en:{name:'Ancient City of Balkh (Bactra)',type:'Cultural heritage — UNESCO Tentative List',status:'On UNESCO’s Tentative List since 17 August 2004; not inscribed on the World Heritage List.',description:'The ancient urban site of Balkh, identified in UNESCO’s tentative file as the ancient city of Bactra; archaeological boundaries require further documentation.'},ps:{name:'د بلخ لرغونی ښار (باختر)',type:'کلتوري میراث — د یونسکو موقتي نوملړ',status:'د ۲۰۰۴ کال د اګست له ۱۷مې د یونسکو په موقتي نوملړ کې دی؛ د نړیوال میراث په وروستي نوملړ کې نه دی ثبت شوی.',description:'د بلخ لرغونی ښاري ځای چې د یونسکو په موقتي دوسیه کې د باختر لرغونی ښار بلل شوی؛ د لرغونپوهنې پولې لا اسنادو ته اړتیا لري.'}},
'بند امیر':{en:{name:'Band-e Amir',type:'Natural heritage — Tentative List',status:'Included in Afghanistan’s UNESCO Tentative List in 2004; this is not a World Heritage inscription.',description:'A group of natural lakes in Bamyan Province; check reliable local sources for current access and visitor conditions.'},ps:{name:'بند امیر',type:'طبیعي میراث — موقتي نوملړ',status:'په ۲۰۰۴ کال کې د افغانستان د یونسکو په موقتي نوملړ کې شامل شوی؛ دا د نړیوال میراث وروستی ثبت نه دی.',description:'د بامیان ولایت د طبیعي جهیلونو ټولګه؛ د لیدنې اوسني شرایط او لاسرسی له باوري سیمه‌ییزو سرچینو وڅېړئ.'}}
,'منظرهٔ طبیعی شاه فولادی':{en:{name:'Shah Foladi Natural Landscape',type:'Natural heritage — officially declared protected area',status:'Listed by Afghanistan’s National Environmental Protection Agency among officially declared protected areas. Current boundaries, management and visitor access require separate confirmation.',description:'A mountain natural landscape in central Bamyan Province, listed by NEPA as a protected area.'},ps:{name:'د شاه فولادي طبیعي منظره',type:'طبیعي میراث — رسمي خوندي سیمه',status:'د افغانستان د چاپېریال ساتنې ملي ادارې په رسمي اعلان شوو خوندي سیمو کې شامله ده؛ اوسني حدود، مدیریت او د لیدونکو لاسرسی جلا تایید ته اړتیا لري.',description:'د بامیان ولایت په مرکز کې غرنی طبیعي منظره چې NEPA د خوندي سیمې په توګه یاده کړې.'}},
'منظرهٔ طبیعی باارزش پلاتوی بامیان':{en:{name:'Bamyan Plateau Valuable Natural Landscape',type:'Natural heritage — officially declared protected area',status:'Listed by Afghanistan’s National Environmental Protection Agency among officially declared protected areas; current boundaries and management require separate confirmation.',description:'A broad natural landscape covering Yakawlang, Kahmard and Saighan districts of Bamyan, according to NEPA’s location table.'},ps:{name:'د بامیان د لوړې هوارې ارزښتناکه طبیعي منظره',type:'طبیعي میراث — رسمي خوندي سیمه',status:'د افغانستان د چاپېریال ساتنې ملي ادارې په رسمي اعلان شوو خوندي سیمو کې شامله ده؛ اوسني حدود او مدیریت جلا تایید ته اړتیا لري.',description:'د NEPA د موقعیت د جدول له مخې، د بامیان ولایت د یکاولنګ، کهمرد او سیغان پراخه طبیعي سیمه.'}},
'زیستگاه پرندگان آبی کول حشمت‌خان':{en:{name:'Kol-e Hashmat Khan Waterbird Habitat',type:'Natural heritage — officially declared protected habitat',status:'Listed by Afghanistan’s National Environmental Protection Agency among officially declared protected areas. Current public access and management require separate confirmation.',description:'A waterbird habitat in Kabul; NEPA lists its location in the city’s districts 1 and 8. This entry does not imply that public entry or visits are permitted.'},ps:{name:'د کول حشمت خان د اوبو مرغانو استوګنځای',type:'طبیعي میراث — رسمي خوندي استوګنځای',status:'د افغانستان د چاپېریال ساتنې ملي ادارې په رسمي اعلان شوو خوندي سیمو کې یاد شوی؛ اوسنی عامه لاسرسی او مدیریت جلا تایید ته اړتیا لري.',description:'په کابل کې د اوبو مرغانو استوګنځای؛ NEPA یې د ښار په لومړۍ او اتمه ناحیه کې موقعیت ښيي. دا د عامه ننوتلو یا لیدنې اجازه نه معنا کوي.'}},
'بند امیر':{en:{name:'Band-e Amir',type:'Natural heritage — officially declared protected area',status:'Listed by Afghanistan’s National Environmental Protection Agency among officially declared protected areas. Band-e Amir is also on UNESCO’s Tentative List, which is not a final World Heritage inscription.',description:'A group of natural lakes in Yakawlang District, Bamyan Province. This entry does not verify current access, security, visitor services or road conditions.'},ps:{name:'بند امیر',type:'طبیعي میراث — رسمي خوندي سیمه',status:'د افغانستان د چاپېریال ساتنې ملي ادارې په رسمي اعلان شوو خوندي سیمو کې شامل دی. بند امیر د یونسکو په موقتي نوملړ کې هم دی، خو دا وروستی نړیوال ثبت نه دی.',description:'د بامیان ولایت په یکاولنګ ولسوالۍ کې د طبیعي جهیلونو ټولګه؛ دا مدخل اوسنی لاسرسی، امنیت، د لیدونکو خدمتونه یا د لارو حالت نه تاییدوي.'}},
'پارک ملی واخان':{en:{name:'Wakhan National Park',type:'Natural heritage — officially declared protected area',status:'Listed by Afghanistan’s National Environmental Protection Agency among officially declared protected areas. Key Biodiversity Areas also identifies it as an important biodiversity site; neither listing confirms current visitor services or field management.',description:'A mountainous region in Wakhan District, Badakhshan Province. Access, security and visitor facilities must be checked separately before travel.'},ps:{name:'د واخان ملي پارک',type:'طبیعي میراث — رسمي خوندي سیمه',status:'د افغانستان د چاپېریال ساتنې ملي ادارې په رسمي اعلان شوو خوندي سیمو کې شامل دی. د ژوندي تنوع د مهمې سیمې په توګه هم ثبت دی؛ دا ثبتونه اوسني سیاحتي خدمتونه یا ساحوي مدیریت نه تاییدوي.',description:'د بدخشان ولایت په واخان ولسوالۍ کې غرنۍ سیمه؛ د سفر مخکې لاسرسی، امنیت او د لیدونکو اسانتیاوې جلا وڅېړئ.'}}
};
function afghanAttractionText(item,lang,field){const translation=afghanAttractionTranslations[item.name]?.[lang];return translation?.[field]||item[field];}

function normalizeAfghanProvinceName(name){
 const key=(name||'').toLocaleLowerCase().replace(/[^a-z0-9]/g,'');
 const aliases={
  bamian:'Bamyan',bamyan:'Bamyan',ghowr:'Ghor',ghor:'Ghor',
  jowzjan:'Jawzjan',jawzjan:'Jawzjan',jawjan:'Jawzjan',
  daykundi:'Daykundi',daikundi:'Daykundi',
  panjshir:'Panjshir',panjsher:'Panjshir',
  saripul:'Sar-e Pol',sarepol:'Sar-e Pol',
  maidanwardak:'Maidan Wardak',wardak:'Maidan Wardak',
  uruzgan:'Uruzgan',oruzgan:'Uruzgan',
  nimroz:'Nimroz',nimruz:'Nimroz'
 };
 const canonical=aliases[key]||afghanProvinceDirectory.find(([province])=>province.toLocaleLowerCase().replace(/[^a-z0-9]/g,'')===key)?.[0];
 return canonical||name;
}
function findAfghanProvinceOption(name){
 const canonical=normalizeAfghanProvinceName(name);
 return [...($('#afgProvinceSelect')?.options||[])].find(option=>option.value===canonical)||null;
}
const afghanProvincePhotoGallery={
 Bamyan:[
  {src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Band_Amir.jpg/960px-Band_Amir.jpg',name:{fa:'بند امیر',ps:'بند امیر',en:'Band-e Amir'},credit:'Nasim Fekrat / AfghanistanMatters',license:'CC BY 2.0',url:'https://commons.wikimedia.org/wiki/File:Band_Amir.jpg'},
  {src:'https://upload.wikimedia.org/wikipedia/commons/e/e6/Cultural_Landscape_and_Archaeological_Remains_of_the_Bamiyan_Valley-130348.jpg',name:{fa:'درهٔ بامیان',ps:'د بامیان دره',en:'Bamiyan Valley'},credit:'Roland Lin / UNESCO',license:'CC BY-SA 3.0 IGO',url:'https://commons.wikimedia.org/wiki/File:Cultural_Landscape_and_Archaeological_Remains_of_the_Bamiyan_Valley-130348.jpg'}
 ],
 Panjshir:[
  {src:'https://upload.wikimedia.org/wikipedia/commons/6/6d/A_view_of_Panjshir.jpg',name:{fa:'چشم‌انداز پنجشیر',ps:'د پنجشېر منظره',en:'Panjshir landscape'},credit:'Daniel Wilkinson / U.S. Department of State',license:'Public domain',url:'https://commons.wikimedia.org/wiki/File:A_view_of_Panjshir.jpg'}
 ],
 Badakhshan:[
  {src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Sahrad.jpg/960px-Sahrad.jpg',name:{fa:'چشم‌انداز واخان',ps:'د واخان منظره',en:'Wakhan landscape'},credit:'Benoît Vicart',license:'CC0',url:'https://commons.wikimedia.org/wiki/File:Sahrad.jpg'}
 ],
 Kandahar:[
  {src:'https://upload.wikimedia.org/wikipedia/commons/6/6a/A_view_over_the_Argandhab_valley_in_Kandahar.jpg',name:{fa:'درهٔ ارغنداب',ps:'د ارغنداب دره',en:'Arghandab Valley'},credit:'BihnX',license:'CC BY-SA 3.0',url:'https://commons.wikimedia.org/wiki/File:A_view_over_the_Argandhab_valley_in_Kandahar.jpg'}
 ],
 Balkh:[
  {src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Blue_Mosque_in_Mazar-e-Sharif.jpg/960px-Blue_Mosque_in_Mazar-e-Sharif.jpg',name:{fa:'مسجد کبود مزارشریف',ps:'د مزارشریف شین جومات',en:'Blue Mosque of Mazar-i-Sharif'},credit:'ISAF Headquarters Public Affairs Office',license:'CC BY 2.0',url:'https://commons.wikimedia.org/wiki/File:Blue_Mosque_in_Mazar-e-Sharif.jpg'}
 ],
 Herat:[
  {src:'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Herat_Citadel%2C_Afghanistan.jpg/960px-Herat_Citadel%2C_Afghanistan.jpg',name:{fa:'قلعهٔ اختیارالدین هرات',ps:'د هرات اختیارالدین کلا',en:'Herat Citadel'},credit:'Marius Arnesen',license:'CC BY-SA 2.0',url:'https://commons.wikimedia.org/wiki/File:Herat_Citadel,_Afghanistan.jpg'}
 ],
 Kabul:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Bagh-e_Babur_garden_in_Kabul_01.jpg?width=1200',name:{fa:'باغ بابر کابل',ps:'د کابل بابر بڼ',en:'Bagh-e Babur, Kabul'},credit:'Ninaras',license:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:Bagh-e_Babur_garden_in_Kabul_01.jpg'},
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Darul_Aman_Palace_in_Kabul.jpg?width=1200',name:{fa:'قصر دارالامان',ps:'د دارالامان ماڼۍ',en:'Darul Aman Palace'},credit:'Ninaras',license:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:Darul_Aman_Palace_in_Kabul.jpg'}
 ],
 Ghor:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Jam_(Afghanistan)_banner.jpg',name:{fa:'منار جام',ps:'د جام منار',en:'Minaret of Jam'},credit:'David Adamec',license:'CC0',url:'https://commons.wikimedia.org/wiki/File:Jam_(Afghanistan)_banner.jpg'}
 ],
 Ghazni:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ghazni_minar_ghazni_Afghanistan.jpg?width=1200',name:{fa:'مناره‌های تاریخی غزنی',ps:'د غزني تاریخي منارونه',en:'Historic minarets of Ghazni'},credit:'AhmadElhan',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Ghazni_minar_ghazni_Afghanistan.jpg'}
 ],
 Kunar:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Valley_in_Kunar-2012.jpg?width=1200',name:{fa:'درهٔ بَدِل در کنر',ps:'د کونړ د بډل دره',en:'Badel Valley, Kunar'},credit:'Spc. Amber Leach / U.S. Army',license:'Public domain (U.S. federal work)',url:'https://commons.wikimedia.org/wiki/File:Valley_in_Kunar-2012.jpg'}
 ],
 Nuristan:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Kashtun_da_waygale_Nuristan_-_panoramio.jpg?width=1200',name:{fa:'چشم‌انداز وادی ویگل نورستان',ps:'د نورستان د ویګل درې منظره',en:'Waygal Valley landscape, Nuristan'},credit:'Abdul Qahar Nuristan',license:'CC BY-SA 3.0',url:'https://commons.wikimedia.org/wiki/File:Kashtun_da_waygale_Nuristan_-_panoramio.jpg'}
 ],
 Badghis:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Badghis_Province,_Afghanistan_by_Planet_Labs.jpg?width=1200',name:{fa:'چشم‌انداز ماهواره‌ای ولایت بادغیس',ps:'د بادغیس ولایت سپوږمکۍ منظره',en:'Satellite view of Badghis Province'},credit:'Planet Labs, Inc.',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Badghis_Province,_Afghanistan_by_Planet_Labs.jpg'}
 ],
 Faryab:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Outside_Faryab_in_Afghanistan_01.jpg?width=1200',name:{fa:'چشم‌انداز بیرون فاریاب',ps:'د فاریاب بهرنی منظره',en:'Landscape outside Faryab'},credit:'PRT Meymaneh',license:'CC BY 2.0',url:'https://commons.wikimedia.org/wiki/File:Outside_Faryab_in_Afghanistan_01.jpg'}
 ],
 Farah:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/CitadelofAlexander2.jpg?width=1200',name:{fa:'قلعهٔ تاریخی فراه',ps:'د فراه تاریخي کلا',en:'Historic Citadel of Farah'},credit:'Matt Peterson',license:'CC0 1.0',url:'https://commons.wikimedia.org/wiki/File:CitadelofAlexander2.jpg'}
 ],
 'Sar-e-Pol':[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Balkhab_District.JPG?width=1200',name:{fa:'چشم‌انداز ولسوالی بلخاب، سرپل',ps:'د سرپل د بلخاب ولسوالۍ منظره',en:'Landscape in Balkhab District, Sar-e Pol'},credit:'Ahmad imami',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Balkhab_District.JPG'}
 ],
 Paktia:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Landscape_in_Paktia_Province.jpg?width=1200',name:{fa:'کوه‌های پوشیده از برف در ولایت پکتیا',ps:'د پکتیا ولایت واورین غرونه',en:'Snow-covered mountains in Paktia Province'},credit:'Fred W. Baker III / U.S. Department of Defense',license:'U.S. public domain',url:'https://commons.wikimedia.org/wiki/File:Landscape_in_Paktia_Province.jpg'}
 ],
 Paktika:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Paktika_zerok_village.jpg?width=1200',name:{fa:'کشتزارهای قریهٔ زیرک، پکتیکا',ps:'د پکتیکا د زېړوک کلي کروندې',en:'Fields in Zerok village, Paktika'},credit:'Akbarzadran',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Paktika_zerok_village.jpg'}
 ],
 Parwan:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Sheikh_Ali_Valley_Parwan_Province_Afghanistan.jpg?width=1600',name:{fa:'درهٔ شیخ‌علی، ولایت پروان',ps:'د پروان ولایت د شیخ علي دره',en:'Sheikh Ali Valley, Parwan Province'},credit:'JialiangGao',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Sheikh_Ali_Valley_Parwan_Province_Afghanistan.jpg'}
 ],
 Logar:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Black_Mountain_in_Logar_Province.jpg?width=1200',name:{fa:'کوه سیاه در ولایت لوگر، نزدیک مس عینک',ps:'د لوګر ولایت تور غر، د مس عینک شاوخوا',en:'Black Mountain near Mes Aynak, Logar'},credit:'S. K. Vemmer / U.S. Embassy Kabul',license:'U.S. Department of State public domain',url:'https://commons.wikimedia.org/wiki/File:Black_Mountain_in_Logar_Province.jpg'}
 ],
 Laghman:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Alingar_District_of_Laghman_Province-Afghanistan_%D8%AF_%D8%A7%D9%84%DB%8C%D9%86%DA%AB%D8%A7%D8%B1_%D9%88%D9%84%D8%B3%D9%88%D8%A7%D9%84%DB%8D-%D8%8C%D9%84%D8%BA%D9%85%D8%A7%D9%86_%D9%88%D9%84%D8%A7%DB%8C%D8%AA-%D8%A7%D9%81%D8%BA%D8%A7%D9%86%D8%B3%D8%AA%D8%A7%D9%86%DB%B3.jpg?width=1200',name:{fa:'کشتزارهای ولسوالی الینگار، لغمان',ps:'د لغمان الینګار ولسوالۍ کروندې',en:'Fields in Alingar District, Laghman'},credit:'Usman Mansoor Ansari',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Alingar_District_of_Laghman_Province-Afghanistan_%D8%AF_%D8%A7%D9%84%DB%8C%D9%86%DA%AF%D8%A7%D8%B1_%D9%88%D9%84%D8%B3%D9%88%D8%A7%D9%84%DB%8D-%D8%8C%D9%84%D8%BA%D9%85%D8%A7%D9%86_%D9%88%D9%84%D8%A7%DB%8C%D8%AA-%D8%A7%D9%81%D8%BA%D8%A7%D9%86%D8%B3%D8%AA%D8%A7%D9%86%DB%B3.jpg'}
 ],
 Kapisa:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Afghans_walk_across_a_river_valley_in_Kapisa_Province.jpg?width=1200',name:{fa:'درهٔ رودخانه در ولسوالی محمودراقی، کاپیسا',ps:'د کاپیسا محمودراقي ولسوالۍ د سیند دره',en:'River valley in Mahmood Raqi District, Kapisa'},credit:'Staff Sgt. Samuel Morse / U.S. Air Force',license:'U.S. public domain',url:'https://commons.wikimedia.org/wiki/File:Afghans_walk_across_a_river_valley_in_Kapisa_Province.jpg'}
 ],
 Jawzjan:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Tillya_Tepe_crown.jpg?width=1200',name:{fa:'تاج طلایی تلیاتپه؛ گنجینهٔ باختر',ps:'د تلیاتپې زرینه تاج؛ د باختر خزانه',en:'Golden crown of Tillya Tepe, Jowzjan'},credit:'H Sinica',license:'CC BY-SA 2.0',url:'https://commons.wikimedia.org/wiki/File:Tillya_Tepe_crown.jpg'}
 ],
 Samangan:[
  {src:'https://commons.wikimedia.org/wiki/Special:FilePath/Takht-E_rostum_samangan_province_Afghanistan.jpg?width=1200',name:{fa:'تخت رستم سمنگان',ps:'د سمنګان تخت رستم',en:'Takht-e Rostam, Samangan'},credit:'AhmadElhan',license:'CC BY-SA 4.0',url:'https://commons.wikimedia.org/wiki/File:Takht-E_rostum_samangan_province_Afghanistan.jpg'}
  ,{src:'https://commons.wikimedia.org/wiki/Special:FilePath/Samangan_Province_panorama_(cropped).jpg?width=1200',name:{fa:'چشم‌انداز پانورامای سمنگان',ps:'د سمنګان پراخه منظره',en:'Samangan Province panorama'},credit:'U.S. Army',license:'CC BY 2.0 / U.S. public domain',url:'https://commons.wikimedia.org/wiki/File:Samangan_Province_panorama_(cropped).jpg'}
 ]
};
function renderAfghanProvinceAttractions(province){
 const panel=$('#afgProvinceSites');if(!panel)return;
 const provinceKey=normalizeAfghanProvinceName(province);
 const items=afghanProvinceAttractions.filter(item=>item.province===provinceKey);
 const search=$('#afgAttractionSearch'),filter=$('#afgAttractionFilter');
 const lang=document.documentElement.lang||'fa';
 const term=(search?.value||'').trim().toLocaleLowerCase();
 const types=[...new Set(items.map(item=>item.type))];
 if(filter){
  const previous=filter.value||'all';
  filter.innerHTML='<option value="all">'+(lang==='en'?'All categories':lang==='ps'?'ټولې کټګورۍ':'همهٔ دسته‌ها')+'</option>'+types.map(type=>'<option value="'+type.replace(/"/g,'&quot;')+'">'+type+'</option>').join('');
  filter.value=types.includes(previous)?previous:'all';
 }
 const kind=filter?.value||'all';
 const filtered=items.filter(item=>(kind==='all'||item.type===kind)&&(!term||[item.name,item.type,item.description,item.status,item.source].some(value=>(value||'').toLocaleLowerCase().includes(term))));
 const title=lang==='en'?'Heritage and nature':lang==='ps'?'د دې ولایت میراث او طبیعت':'میراث و طبیعت این ولایت';
 const empty=lang==='en'?'No sourced attractions match this search.':lang==='ps'?'د دې لټون لپاره د باوري سرچینې لرونکي ځایونه ونه موندل شول.':'برای این جستجو جاذبهٔ دارای منبع معتبر پیدا نشد.';
 const photos=afghanProvincePhotoGallery[provinceKey]||[];
 const photoTitle=lang==='en'?'Photo highlights':lang==='ps'?'انځوریزې منظرې':'مناظر تصویری';
 const photoGallery=photos.length?'<div class="afg-province-photo-gallery"><h4>'+photoTitle+'</h4><div class="afg-province-photo-grid">'+photos.map(photo=>'<figure><img src="'+photo.src+'" alt="'+photo.name[lang]+'" loading="lazy" decoding="async"><figcaption><b>'+photo.name[lang]+'</b><small>'+photo.credit+' · '+photo.license+' · <a href="'+photo.url+'" target="_blank" rel="noopener noreferrer">'+(lang==='en'?'License & details':lang==='ps'?'جواز او معلومات':'جواز و جزئیات')+'</a></small></figcaption></figure>').join('')+'</div></div>':'';
 panel.innerHTML='<h3>'+title+'</h3>'+photoGallery+(filtered.length?filtered.map(item=>'<article class="afg-attraction-card"><span class="afg-attraction-type">'+afghanAttractionText(item,lang,'type')+'</span><h4>'+afghanAttractionText(item,lang,'name')+'</h4><p>'+afghanAttractionText(item,lang,'description')+'</p><p class="afg-attraction-status">'+afghanAttractionText(item,lang,'status')+'</p><a href="'+item.url+'" target="_blank" rel="noopener noreferrer">'+(lang==='en'?'Source: ':lang==='ps'?'سرچینه: ':'منبع: ')+item.source+'</a></article>').join(''):'<p>'+empty+'</p>');
}

function initAfghanProvinceExplorer(){
 const select=$('#afgProvinceSelect'),details=$('#afgProvinceDetails');
 if(!select||!details||select.dataset.ready==='true')return;
 select.dataset.ready='true';
 const search=$('#afgProvinceSearch');
 const coverage=$('#afgProvinceCoverage');
 if(coverage){
  const covered=new Set(afghanProvinceAttractions.map(item=>item.province)).size;
  const lang=document.documentElement.lang||'fa';
  coverage.textContent=lang==='en'
   ?'Sourced attraction coverage: '+covered+' of 34 provinces. Other provinces are pending source review; no listing does not mean there are no attractions.'
   :lang==='ps'
   ?'د سرچینه لرونکو جاذبو پوښښ: له ۳۴ ولایتونو څخه '+covered+' ولایتونه. د نورو ولایتونو معلومات د سرچینو ارزونې ته منتظر دي؛ د نوملړ نشتوالی د جاذبو نشتوالی نه معنا کوي.'
   :'پوشش جاذبه‌های دارای منبع: '+covered+' ولایت از ۳۴ ولایت. اطلاعات سایر ولایت‌ها در انتظار بررسی منابع است؛ نبودن مدخل به معنای نبود جاذبه نیست.';
 }
 const fillProvinceOptions=(query='')=>{
  const current=select.value,term=query.trim().toLocaleLowerCase(),lang=document.documentElement.lang||'fa';
  select.innerHTML='<option value="">'+(lang==='en'?'Select a province':lang==='ps'?'ولایت وټاکئ':'یک ولایت را انتخاب کنید')+'</option>';
  afghanProvinceDirectory.filter(([province,capital])=>{const label=afghanProvinceLabels[province]||{};return !term||[province,capital,label.fa,label.ps,label.capitalFa,label.capitalPs].some(value=>(value||'').toLocaleLowerCase().includes(term));}).forEach(([province])=>{const option=document.createElement('option');option.value=province;option.textContent=afghanProvinceDisplayName(province,lang);select.appendChild(option);});
  if(current&&[...select.options].some(option=>option.value===current))select.value=current;
 };
 fillProvinceOptions();
 search?.addEventListener('input',()=>fillProvinceOptions(search.value));
 select.addEventListener('change',()=>{
  const item=afghanProvinceDirectory.find(([province])=>province===select.value);
  renderAfghanProvinceAttractions(select.value);
  const lang=document.documentElement.lang||'fa';
  details.textContent=item?(lang==='en'?'Province: '+item[0]+' | Capital: '+item[1]+' — capital name requires official verification.':lang==='ps'?'ولایت: '+afghanProvinceDisplayName(item[0],lang)+' | مرکز: '+afghanCapitalDisplayName(item[0],lang,item[1])+' — د مرکز نوم رسمي تایید ته اړتیا لري.':'ولایت: '+afghanProvinceDisplayName(item[0],lang)+' | مرکز: '+afghanCapitalDisplayName(item[0],lang,item[1])+' — نام مرکز نیازمند تأیید رسمی است.'):(lang==='en'?'Select a province to see its information.':lang==='ps'?'د معلوماتو لپاره ولایت وټاکئ.':'پس از انتخاب ولایت، اطلاعات آن اینجا نمایش داده می‌شود.');
 });
}
initAfghanProvinceExplorer();
$('#afgAttractionSearch')?.addEventListener('input',()=>renderAfghanProvinceAttractions($('#afgProvinceSelect')?.value));
$('#afgAttractionFilter')?.addEventListener('change',()=>renderAfghanProvinceAttractions($('#afgProvinceSelect')?.value));
let afghanLeafletMap=null,afghanProvinceLayer=null;
function initAfghanInteractiveMap(){
 const host=$('#afgProvinceMap'),details=$('#afgProvinceDetails'),select=$('#afgProvinceSelect');
 const status=$('#afgProvinceMapStatus'),retry=$('#afgProvinceMapRetry');
 if(!host||host.dataset.started==='true')return;
 const lang=document.documentElement.lang||'fa';
 const messages={
  library:lang==='en'?'The map library did not load. Check your connection and try again. The province list remains available.':lang==='ps'?'د نقشې کتابتون پورته نه شو. اړیکه وګورئ او بیا هڅه وکړئ؛ د ولایتونو نوملړ فعال دی.':'کتابخانهٔ نقشه بارگذاری نشد. اتصال را بررسی کنید و دوباره تلاش کنید؛ فهرست ولایت‌ها فعال است.',
  data:lang==='en'?'Province boundaries could not be loaded. Check your connection and try again. The province list remains available.':lang==='ps'?'د ولایتونو پولې پورته نه شوې. اړیکه وګورئ او بیا هڅه وکړئ؛ د ولایتونو نوملړ فعال دی.':'مرزهای ولایت‌ها بارگذاری نشد. اتصال را بررسی کنید و دوباره تلاش کنید؛ فهرست ولایت‌ها فعال است.',
  retry:lang==='en'?'Retry map loading':lang==='ps'?'د نقشې بیا پورته کول':'تلاش دوباره برای بارگذاری نقشه'
 };
 const showError=message=>{
  if(status){status.textContent=message;status.hidden=false;}
  if(retry){retry.textContent=messages.retry;retry.hidden=false;}
 };
 if(!window.L){showError(messages.library);return;}
 host.dataset.started='true';
 if(status)status.hidden=true;
 if(retry)retry.hidden=true;
 afghanLeafletMap=L.map(host,{scrollWheelZoom:false}).setView([33.9,66.2],5);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:12}).addTo(afghanLeafletMap);
 const geoJsonUrl='https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/ArcGIS/rest/services/Admin1_Afghanistan/FeatureServer/1/query?where=1%3D1&outFields=PROV_34_NA&returnGeometry=true&outSR=4326&f=geojson';
 host.setAttribute('aria-busy','true');
 fetch(geoJsonUrl).then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.json();}).then(data=>{
  if(!data.features||!data.features.length)throw new Error('No province polygons');
  afghanProvinceLayer=L.geoJSON(data,{style:{color:'#2c9da5',weight:1.5,fillColor:'#4e9da2',fillOpacity:.18},onEachFeature:(feature,layer)=>{
   const province=feature.properties?.PROV_34_NA||'نام ثبت‌نشده';
   layer.bindTooltip(province,{sticky:true});
   layer.on('click',()=>{
    const option=findAfghanProvinceOption(province);
    if(option){
     select.value=option.value;
     select.dispatchEvent(new Event('change',{bubbles:true}));
    }else{
     details.textContent='نام ولایت در دادهٔ نقشه با فهرست برنامه تطبیق نشد: '+province+'؛ لطفاً از فهرست ولایت‌ها استفاده کنید.';
     renderAfghanProvinceAttractions('');
    }
   });
  }}).addTo(afghanLeafletMap);
  afghanLeafletMap.fitBounds(afghanProvinceLayer.getBounds(),{padding:[8,8]});
  host.dataset.loaded='true';
  if(status)status.hidden=true;
  if(retry)retry.hidden=true;
 }).catch(error=>{
  host.dataset.error='true';
  showError(messages.data);
 }).finally(()=>host.removeAttribute('aria-busy'));
 if(select&&select.dataset.mapBound!=='true'){
 select.dataset.mapBound='true';
 select.addEventListener('change',()=>{
  if(!afghanProvinceLayer||!select.value)return;
  afghanProvinceLayer.eachLayer(layer=>{
   const name=layer.feature.properties?.PROV_34_NA||'';
   const active=normalizeAfghanProvinceName(name)===select.value;
   layer.setStyle({color:active?'#d97706':'#2c9da5',weight:active?3:1.5,fillColor:active?'#f59e0b':'#4e9da2',fillOpacity:active?.42:.18});
   if(active)afghanLeafletMap.fitBounds(layer.getBounds(),{padding:[20,20],maxZoom:8});
  });
 });
 }
}
$('#afgProvinceMapReset')?.addEventListener('click',()=>{
 if(select){select.value='';select.dispatchEvent(new Event('change',{bubbles:true}));}
 if(afghanProvinceLayer&&afghanLeafletMap){
  afghanProvinceLayer.eachLayer(layer=>layer.setStyle({color:'#2c9da5',weight:1.5,fillColor:'#4e9da2',fillOpacity:.18}));
  afghanLeafletMap.fitBounds(afghanProvinceLayer.getBounds(),{padding:[8,8]});
 }
});
$('#afgProvinceMapRetry')?.addEventListener('click',()=>{
 if(afghanLeafletMap){afghanLeafletMap.remove();afghanLeafletMap=null;}
 afghanProvinceLayer=null;
 const host=$('#afgProvinceMap');
 if(host){host.dataset.started='';host.dataset.loaded='';host.dataset.error='';host.innerHTML='<p>نقشه پس از بارگذاری داده‌های جغرافیایی نمایش داده می‌شود.</p>';}
 initAfghanInteractiveMap();
});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initAfghanInteractiveMap,{once:true});else initAfghanInteractiveMap();


function renderHistoryCultureCenter(){
 const grid=$('#historycultureCourseGrid');if(!grid)return;
 const q=($('#historycultureSearch')?.value||'').trim().toLocaleLowerCase();
 const cat=$('#historycultureCategory')?.value||'all';
 const items=historyCultureCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="historyculture-course-card"><span class="historyculture-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">موضوعی پیدا نشد؛ عبارت دیگری را جستجو کنید.</p>';
}
$('#historycultureSearch')?.addEventListener('input',renderHistoryCultureCenter);
$('#historycultureCategory')?.addEventListener('change',renderHistoryCultureCenter);

function showPage(name){
 if(!pages.includes(name))return false;
 if(name!=='quiz'&&quizInProgress&&quizTimer!==null){clearInterval(quizTimer);quizTimer=null;}
 pages.forEach(pageName=>{
  const section=document.getElementById(pageName+'Page');
  if(section)section.classList.toggle('hidden',pageName!==name);
 });
 document.querySelectorAll('.nav[data-page]').forEach(button=>button.classList.toggle('active',button.dataset.page===name));
 try{if(typeof closeMobileMenu==='function')closeMobileMenu();}catch(error){console.warn('Menu close:',error);}
 const renderers={
  language:()=>renderLanguageCenter(),digital:()=>renderDigitalCenter(),health:()=>renderHealthCenter(),
  business:()=>renderBusinessCenter(),law:()=>renderLawCenter(),agriculture:()=>renderAgricultureCenter(),
  engineering:()=>renderEngineeringCenter(),historyculture:()=>renderHistoryCultureCenter(),
  lessons:()=>renderLessons(),library:()=>renderLibrary(),progress:()=>renderProgress(),travel:()=>renderTravelGuide()
 };
 try{if(renderers[name])renderers[name]();}catch(error){console.error('Afghan AI section renderer failed:',name,error);}
 if(name==='historyculture'&&afghanLeafletMap){try{setTimeout(()=>afghanLeafletMap.invalidateSize(),120);}catch(error){}}
 if(name==='quiz'){try{if(!quizInProgress)startQuiz();else if(quizTimer===null)startQuizTimer();}catch(error){console.error('Quiz start failed:',error);}}
 window.scrollTo({top:0,behavior:'smooth'});
 return true;
}
$$('[data-page]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const target=b.dataset.page;if(pages.includes(target)&&$('#'+target+'Page'))showPage(target)}));
function closeMobileMenu(){
 const sidebar=$('#sidebar'),backdrop=$('#sidebarBackdrop');
 sidebar.classList.remove('open');backdrop.classList.remove('is-visible');
 document.body.classList.remove('sidebar-menu-open');
 $('#mobileMenu').setAttribute('aria-expanded','false');
}
$('#mobileMenu').onclick=()=>{
 const sidebar=$('#sidebar'),backdrop=$('#sidebarBackdrop');
 const open=!sidebar.classList.contains('open');
 sidebar.classList.toggle('open',open);backdrop.classList.toggle('is-visible',open);
 document.body.classList.toggle('sidebar-menu-open',open);
 $('#mobileMenu').setAttribute('aria-expanded',String(open));
};
$('#closeSidebar')?.addEventListener('click',closeMobileMenu);
$('#sidebarBackdrop').onclick=closeMobileMenu;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#sidebar').classList.contains('open'))closeMobileMenu()});
$('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');safeStorageSet('afghanai-dark',document.body.classList.contains('dark')?'1':'0')};
if(safeStorageGet('afghanai-dark')==='1')document.body.classList.add('dark');
const uiStrings={
 fa:{navHome:'صفحهٔ اصلی',navTutor:'معلم هوشمند',navLessons:'درس‌ها',navQuiz:'امتحان آزمایشی',navProgress:'پیشرفت من',navFamily:'والدین و استاد',navAdmin:'مدیریت',navGuide:'راهنمای استفاده',navTranslator:'مترجم هوشمند',navTools:'ابزارهای یادگیری',navSources:'منابع و سپاسگزاری',needHelp:'کمک درسی می‌خواهی؟',helpText:'سوالت را بنویس تا با هم بررسی کنیم.',askTutor:'پرسش از معلم ←',eyebrow:'آینده با دانش ساخته می‌شود',welcomeTitle:'سلام! آمادهٔ یادگیری هستی؟ 👋',welcomeDesc:'هر روز یک قدم کوچک، یک پیشرفت بزرگ.',startLearning:'یادگیری را آغاز کن ←',statLessons:'درس‌های تکمیل‌شده',statGoal:'هدف روزانه',statQuestions:'پرسش‌های مطرح‌شده',continueLearning:'یادگیری را ادامه بده',chooseSection:'یک بخش را انتخاب کن.',allLessons:'همهٔ درس‌ها ←',featureTutor:'معلم هوشمند',featureTutorDesc:'سوال بپرس و توضیح ساده بگیر.',featureLessons:'کتابخانهٔ درسی',featureLessonsDesc:'موضوعات آموزشی را مرور کن.',featureQuiz:'امتحان آزمایشی',featureQuizDesc:'دانسته‌هایت را بررسی کن.',openSection:'باز کردن بخش ←',tipTitle:'نکتهٔ امروز',tipText:'وقتی درس دشوار است، از معلم بخواه آن را با یک مثال روزمره توضیح دهد.',alwaysReady:'همیشه آمادهٔ کمک',tutorTitle:'✦ معلم هوشمند',tutorDesc:'سوال درسی‌ات را به دری، پشتو یا انگلیسی بنویس.',ready:'آمادهٔ گفتگو',greeting:'سلام دانش‌آموز عزیز! 🌟\nامروز در کدام درس کمکت کنم؟ سوالت را بنویس تا ساده و مرحله‌به‌مرحله توضیح بدهم.',aiDisclaimer:'پاسخ‌های هوش مصنوعی ممکن است اشتباه باشند؛ مطالب مهم را با کتاب درسی و استاد بررسی کن.',organizedLearning:'یادگیری منظم',lessonsTitle:'📚 درس‌ها و مضامین',lessonsDesc:'صنف و مضمون مورد نظر خود را انتخاب کن.',gradeLabel:'صنف',searchLabel:'جستجو',curriculumNote:'محتوای رسمی کتاب‌های معارف باید از نسخه‌های معتبر وزارت معارف وارد و بررسی شود. این درس‌ها نمونهٔ آموزشی هستند.',testYourself:'خودت را بسنج',quizTitle:'☑ امتحان آزمایشی',quizDesc:'یک آزمون کوتاه نمونه را انجام بده.',stepByStep:'قدم به قدم',progressTitle:'▥ پیشرفت من',progressDesc:'آمار یادگیری در همین دستگاه ذخیره می‌شود.',quizzesDone:'آزمون‌های تکمیل‌شده',correctAnswers:'پاسخ‌های درست',recentActivity:'فعالیت اخیر',activityDesc:'خلاصهٔ فعالیت‌های ثبت‌شده در این مرورگر.',resetStats:'پاک‌کردن آمار',privacyTitle:'حریم خصوصی',privacyText:'این نسخه آمار را فقط در مرورگر دستگاه ذخیره می‌کند. برای حساب و همگام‌سازی باید سرور امن اضافه شود.',supportTeam:'همکاری برای یادگیری بهتر',familyTitle:'♧ بخش والدین و استاد',familyDesc:'ابزارهای پیشنهادی برای حمایت از یادگیری دانش‌آموز.',parentTitle:'راهنمای والدین',parentDesc:'برای کودک برنامهٔ منظم بسازید، پیشرفت را با او مرور کنید و هنگام استفاده از هوش مصنوعی همراهش باشید.',teacherTitle:'راهنمای استاد',teacherDesc:'از معلم هوشمند برای توضیح دوبارهٔ موضوع و ساخت تمرین کمکی استفاده کنید؛ نه به‌عنوان جایگزین استاد.',childSafety:'ایمنی دانش‌آموزان',childSafetyText:'در این نسخه اطلاعات حساس، شماره تماس، آدرس یا اسناد هویتی وارد نکنید. ساخت حساب کودک نیازمند بررسی حریم خصوصی و رضایت مناسب است.'},
 ps:{navHome:'کور پاڼه',navTutor:'هوښیار ښوونکی',navTranslator:'ژباړن',navTools:'د زده کړې وسایل',navSources:'سرچینې او مننه',navGuide:'د کارونې لارښود',navLessons:'درسونه',navQuiz:'ازمایښتي ازموینه',navProgress:'زما پرمختګ',navFamily:'والدین او ښوونکی',navAdmin:'مدیریت',needHelp:'د درس مرسته غواړې؟',helpText:'خپله پوښتنه ولیکه چې یوځای یې وڅېړو.',askTutor:'له ښوونکي پوښتنه ←',eyebrow:'راتلونکی په پوهه جوړېږي',welcomeTitle:'سلام! زده کړې ته چمتو یې؟ 👋',welcomeDesc:'هره ورځ یو کوچنی ګام، لوی پرمختګ.',startLearning:'زده کړه پیل کړه ←',statLessons:'بشپړ شوي درسونه',statGoal:'ورځنی هدف',statQuestions:'پوښتنې',continueLearning:'زده کړه روانه وساته',chooseSection:'یوه برخه وټاکه.',allLessons:'ټول درسونه ←',featureTutor:'هوښیار ښوونکی',featureTutorDesc:'پوښتنه وکړه او ساده تشریح ترلاسه کړه.',featureLessons:'د درسونو کتابتون',featureLessonsDesc:'ښوونیز موضوعات بیا وګوره.',featureQuiz:'ازمایښتي ازموینه',featureQuizDesc:'خپله پوهه وازمویه.',openSection:'برخه پرانیزه ←',tipTitle:'د نن ورځې لارښوونه',tipText:'که درس ستونزمن وي، له ښوونکي وغواړه چې په ورځني مثال یې تشریح کړي.',alwaysReady:'تل مرستې ته چمتو',tutorTitle:'✦ هوښیار ښوونکی',tutorDesc:'خپله پوښتنه په پښتو، دري یا انګلیسي ولیکه.',ready:'خبرو ته چمتو',greeting:'سلام ګرانه زده کوونکې/زده کوونکي! 🌟\nنن په کوم درس کې مرسته درسره وکړم؟ پوښتنه ولیکه چې په ساده ډول یې تشریح کړم.',aiDisclaimer:'د مصنوعي ځیرکتیا ځوابونه تېروتنه لرلای شي؛ مهم معلومات له کتاب او ښوونکي سره پرتله کړه.',organizedLearning:'منظمه زده کړه',lessonsTitle:'📚 درسونه او مضمونونه',lessonsDesc:'خپل ټولګی او مضمون وټاکه.',gradeLabel:'ټولګی',searchLabel:'لټون',curriculumNote:'رسمي درسي مواد باید د پوهنې وزارت له باوري نسخو څخه تایید شي. دا درسونه بېلګې دي.',testYourself:'خپله پوهه وازمویه',quizTitle:'☑ ازمایښتي ازموینه',quizDesc:'یوه لنډه نمونه ازموینه ترسره کړه.',stepByStep:'ګام په ګام',progressTitle:'▥ زما پرمختګ',progressDesc:'د زده کړې شمېرې په همدې وسیله کې ساتل کېږي.',quizzesDone:'بشپړې شوې ازموینې',correctAnswers:'سم ځوابونه',recentActivity:'وروستي فعالیتونه',activityDesc:'په دې براوزر کې د ثبت شوو فعالیتونو لنډیز.',resetStats:'شمېرې پاکې کړه',privacyTitle:'محرمیت',privacyText:'دا نسخه شمېرې یوازې په براوزر کې ساتي. د حساب او همغږۍ لپاره خوندي سرور ته اړتیا ده.',supportTeam:'د زده کړې لپاره ګډ کار',familyTitle:'♧ د والدینو او ښوونکي برخه',familyDesc:'د زده کوونکي د ملاتړ لپاره لارښوونې.',parentTitle:'د والدینو لارښود',parentDesc:'د ماشوم لپاره منظم مهالویش جوړ کړئ او د AI کارولو پر مهال ورسره اوسئ.',teacherTitle:'د ښوونکي لارښود',teacherDesc:'له هوښیار ښوونکي څخه د موضوع د بیا تشریح او تمرین جوړولو لپاره مرسته واخلئ، نه د ښوونکي د بدیل په توګه.',childSafety:'د زده کوونکو خوندیتوب',childSafetyText:'په دې نسخه کې حساس معلومات، د اړیکې شمېره، پته یا پېژندپاڼه مه داخلوئ.'},
 en:{navHome:'Home',navTutor:'AI Tutor',navTranslator:'Translator',navTools:'Learning Tools',navSources:'Sources & Acknowledgements',navLessons:'Lessons',navQuiz:'Practice Quiz',navProgress:'My Progress',navFamily:'Parents & Teachers',navAdmin:'Admin',navGuide:'User Guide',needHelp:'Need study help?',helpText:'Write your question and let’s explore it.',askTutor:'Ask the tutor ←',eyebrow:'Build the future with knowledge',welcomeTitle:'Hello! Ready to learn? 👋',welcomeDesc:'One small step every day adds up.',startLearning:'Start learning ←',statLessons:'Lessons completed',statGoal:'Daily goal',statQuestions:'Questions asked',continueLearning:'Continue learning',chooseSection:'Choose a section to get started.',allLessons:'All lessons ←',featureTutor:'AI Tutor',featureTutorDesc:'Ask a question and get a simple explanation.',featureLessons:'Lesson Library',featureLessonsDesc:'Review learning topics.',featureQuiz:'Practice Quiz',featureQuizDesc:'Check what you know.',openSection:'Open section ←',tipTitle:'Today’s tip',tipText:'When a lesson feels hard, ask for an everyday example.',alwaysReady:'Ready to help',tutorTitle:'✦ AI Tutor',tutorDesc:'Ask your school question in Dari, Pashto, or English.',ready:'Ready to chat',greeting:'Hello, learner! 🌟\nWhat subject can I help with today? Ask a question and I’ll explain it step by step.',aiDisclaimer:'AI answers can be wrong; check important information with your textbook and teacher.',organizedLearning:'Organized learning',lessonsTitle:'📚 Lessons & Subjects',lessonsDesc:'Choose a grade and subject.',gradeLabel:'Grade',searchLabel:'Search',curriculumNote:'Official curriculum content must be verified against trusted Ministry of Education materials. These are sample lessons.',testYourself:'Test yourself',quizTitle:'☑ Practice Quiz',quizDesc:'Try this short sample quiz.',stepByStep:'Step by step',progressTitle:'▥ My Progress',progressDesc:'Learning statistics are saved on this device.',quizzesDone:'Quizzes completed',correctAnswers:'Correct answers',recentActivity:'Recent activity',activityDesc:'A summary of activity recorded in this browser.',resetStats:'Clear statistics',privacyTitle:'Privacy',privacyText:'This version stores statistics only in your browser. Accounts and sync require a secure server.',supportTeam:'Working together for better learning',familyTitle:'♧ Parents & Teachers',familyDesc:'Suggested ways to support student learning.',parentTitle:'Parent guide',parentDesc:'Create a routine, review progress together, and stay involved when children use AI.',teacherTitle:'Teacher guide',teacherDesc:'Use the tutor to re-explain concepts and create practice—not as a replacement for teachers.',childSafety:'Student safety',childSafetyText:'Do not enter sensitive information, phone numbers, addresses, or identity documents in this demo.'}
};
function applyLanguage(lang){const dict=uiStrings[lang]||uiStrings.fa;document.documentElement.lang=lang==='fa'?'fa':lang;document.documentElement.dir=lang==='en'?'ltr':'rtl';$('[data-i18n]').forEach(el=>{let k=el.dataset.i18n;if(dict[k])el.textContent=dict[k]});$('#question').placeholder=lang==='en'?'Write your question here...':lang==='ps'?'خپله پوښتنه دلته ولیکئ...':'سوالت را اینجا بنویس...';$('#lessonSearch').placeholder=lang==='en'?'Subject or topic...':lang==='ps'?'د مضمون یا موضوع نوم...':'نام مضمون یا موضوع...';$('#welcomeSmall').textContent=lang==='en'?'Welcome!':lang==='ps'?'ښه راغلاست!':'خوش آمدید!';safeStorageSet('afghanai-lang',lang);const provinceSelect=$('#afgProvinceSelect');if(provinceSelect){[...provinceSelect.options].forEach(option=>{if(option.value)option.textContent=afghanProvinceDisplayName(option.value,lang)});const selected=afghanProvinceDirectory.find(([province])=>province===provinceSelect.value);if(selected){const details=$('#afgProvinceDetails');if(details)details.textContent=lang==='en'?'Province: '+selected[0]+' | Capital: '+selected[1]+' — capital name requires official verification.':lang==='ps'?'ولایت: '+afghanProvinceDisplayName(selected[0],lang)+' | مرکز: '+afghanCapitalDisplayName(selected[0],lang,selected[1])+' — د مرکز نوم رسمي تایید ته اړتیا لري.':'ولایت: '+afghanProvinceDisplayName(selected[0],lang)+' | مرکز: '+afghanCapitalDisplayName(selected[0],lang,selected[1])+' — نام مرکز نیازمند تأیید رسمی است.';}}renderAfghanProvinceAttractions(provinceSelect.value);}
$('#uiLanguage').value=safeStorageGet('afghanai-lang')||'fa';$('#uiLanguage').addEventListener('change',e=>applyLanguage(e.target.value));applyLanguage($('#uiLanguage').value);
$$('[data-set-language]').forEach(btn=>btn.addEventListener('click',()=>{const lang=btn.dataset.setLanguage;$('#uiLanguage').value=lang;applyLanguage(lang);$$('[data-home-lang]').forEach(b=>b.classList.toggle('active',b.dataset.homeLang===lang))}));

const landingText={
fa:['✦ هوش مصنوعی برای فردای بهتر','به افغان AI خوش آمدید','توانمندسازی مردم با هوش مصنوعی برای آموزش، نوآوری و توسعهٔ پایدار افغانستان.','✦ آغاز یادگیری ←','کشف کنید','ابزارهای برگزیدهٔ هوش مصنوعی','ابزارهای هوشمند برای دانش‌آموزان، متخصصان و جامعه.','همهٔ ابزارها ↗','معلم هوشمند','با راهنمای هوشمند، گام‌به‌گام بیاموزید.','آغاز یادگیری ←','کمک زبانی','به دری، پشتو یا انگلیسی بپرسید و بیاموزید.','پرسش از معلم ←','دستیار هوشمند','پاسخ، ایده و پشتیبانی درسی دریافت کنید.','پرسش از AI ←','مرکز آموزش','کتابخانهٔ دیجیتال و منابع یادگیری.','مرور درس‌ها ←','افغانستان هوشمندتر، آیندهٔ روشن‌تر','با تکنالوژی، آموزش و نوآوری در کنار هم.','مرور آموزش ←','دسترسی سریع','منابع آموزشی','منابع و مآخذ','پشتیبانی دانش‌آموز','با ما همراه باشید','برای تازه‌ها و امکانات جدید، پروژه را دنبال کنید.','افغان AI • آموزش برای همه','«تکنالوژی زمانی نیرومند است که دروازهٔ دانش را باز کند.»','راهکارهای هوشمند برای افغانستان روشن‌تر','© ۲۰۲۶ افغان AI • تمام حقوق محفوظ است.','لایسنس و مالکیت فکری','این پروژه و محتوای آن ملکیت فکری سیدمحب‌الله هاشمی است.','استفاده و توزیع تابع فایل لایسنس پروژه است.','معلومات پروژه','بخش‌ها','معلم هوشمند','آموزش','ابزارهای یادگیری','پشتیبانی'],
ps:['✦ مصنوعي ځیرکتیا د غوره سبا لپاره','افغان AI ته ښه راغلاست','د افغانستان د زده کړې، نوښت او دوامدار پرمختګ لپاره د مصنوعي ځیرکتیا له لارې د خلکو پیاوړتیا.','✦ زده کړه پیل کړئ ←','وپلټئ','غوره د AI وسیلې','د زده کوونکو، مسلکي کسانو او ټولنې لپاره هوښیارې وسیلې.','ټولې وسیلې ↗','هوښیار ښوونکی','له هوښیار لارښود سره ګام په ګام زده کړه وکړئ.','زده کړه پیل کړئ ←','ژبنۍ مرسته','په دري، پښتو یا انګلیسي پوښتنه وکړئ او زده کړه وکړئ.','له ښوونکي پوښتنه ←','هوښیار مرستیال','ځوابونه، نظرونه او درسي مرسته ترلاسه کړئ.','له AI پوښتنه ←','ښوونیز مرکز','ډیجیټلي کتابتون او د زده کړې سرچینې.','درسونه وګورئ ←','هوښیار افغانستان، روښانه راتلونکی','د ټکنالوژۍ، زده کړې او نوښت له لارې یوځای.','زده کړه وګورئ ←','چټک لاسرسی','ښوونیزې سرچینې','سرچینې او مننې','د زده کوونکو ملاتړ','له موږ سره اوسئ','د تازه خبرونو او نویو ځانګړنو لپاره پروژه تعقیب کړئ.','افغان AI • د ټولو لپاره زده کړه','«ټکنالوژي هغه وخت پیاوړې ده چې د پوهې دروازه پرانیزي.»','د روښانه افغانستان لپاره هوښیارې لارې','© ۲۰۲۶ افغان AI • ټول حقوق خوندي دي.','جواز او فکري ملکیت','دا پروژه او منځپانګه یې د سیدمحب الله هاشمي فکري ملکیت دی.','کارونه او وېش د پروژې د جواز له شرایطو سره سم دي.','د پروژې معلومات','برخې','هوښیار ښوونکی','زده کړه','د زده کړې وسیلې','ملاتړ'],
en:['✦ AI for a Better Tomorrow','Welcome to Afghan AI','Empowering people with AI for education, innovation and sustainable development in Afghanistan.','✦ Start Learning →','DISCOVER','Featured AI Tools','Smart tools for students, professionals and the community.','Explore all tools ↗','AI Teacher','Learn step by step with an AI tutor.','Start Learning →','Language Help','Ask and learn in Dari, Pashto or English.','Ask the Tutor →','Smart Assistant','Get answers, ideas and study support.','Ask AI →','Education Hub','Digital library and learning resources.','Explore Lessons →','Building a Smarter Afghanistan','Together through technology, education and innovation.','Explore Education →','Quick Access','Education Resources','Resources & Sources','Student Support','Stay Connected','Follow the project for updates and new features.','Afghan AI • Learning for everyone','“Technology is powerful when it opens the door to learning.”','Smart solutions for a brighter Afghanistan','© 2026 Afghan AI • All rights reserved.','License & Intellectual Property','This project and its contents are the intellectual property of Sayed Moheb Ullah Hashimi.','Use and distribution are subject to the project LICENSE file.','Project Information','Explore','AI Teacher','Education','Learning Tools','Support']};
function applyLandingText(lang){const t=landingText[lang]||landingText.fa;const sels=['.home-kicker','.home-hero h1','.home-lead','.home-primary','.home-section-kicker','.home-section-heading h2','.home-section-heading p','.home-view-link','.service-blue h3','.service-blue p','.service-blue .service-cta','.service-green h3','.service-green p','.service-green .service-cta','.service-purple h3','.service-purple p','.service-purple .service-cta','.service-orange h3','.service-orange p','.service-orange .service-cta','.promo-copy h2','.promo-copy p','.home-promo button','.quick-card h3','.quick-card button:nth-of-type(2)','.quick-card button:nth-of-type(3)','.quick-card button:nth-of-type(4)','.connected-card h3','.connected-card p','.social-note','.home-quote p','.home-footer>div:first-child p','.home-footer>div:first-child small','.home-footer>div:nth-child(2) b','.home-footer>div:nth-child(2) p','.home-footer>div:nth-child(2) small','.home-footer>div:nth-child(3) b','.home-footer>div:nth-child(4) b','.home-footer .footer-link:nth-of-type(1)','.home-footer .footer-link:nth-of-type(2)','.home-footer .footer-link:nth-of-type(3)','.home-footer .footer-link:nth-of-type(4)'];sels.forEach((sel,i)=>{const el=$(sel);if(el&&t[i]){if(sel==='.home-hero h1')el.textContent=t[i];else if(sel==='.home-primary')el.innerHTML=t[i]+' <span>→</span>';else if(sel==='.home-footer .footer-link:nth-of-type(1)')el.textContent=t[38];else if(sel==='.home-footer .footer-link:nth-of-type(2)')el.textContent=t[39];else if(sel==='.home-footer .footer-link:nth-of-type(3)')el.textContent=t[40];else if(sel==='.home-footer .footer-link:nth-of-type(4)')el.textContent=t[41];else el.textContent=t[i]}});const brand=$('#brandSub');if(brand)brand.textContent=lang==='en'?'Smart Solutions for a Brighter Afghanistan':lang==='ps'?'د روښانه افغانستان لپاره هوښیارې لارې':'راهکارهای هوشمند برای افغانستان روشن‌تر';$$('[data-home-lang]').forEach(b=>b.classList.toggle('active',b.dataset.homeLang===lang))}
const previousLanguageApply=applyLanguage;applyLanguage=function(lang){previousLanguageApply(lang);applyLandingText(lang)};applyLandingText($('#uiLanguage').value);


const storedState=safeStorageJSON('afghanai-state',{});
const state=storedState&&typeof storedState==='object'&&!Array.isArray(storedState)?storedState:{};
state.questions=Number.isFinite(Number(state.questions))?Number(state.questions):0;
state.lessons=Number.isFinite(Number(state.lessons))?Number(state.lessons):0;
state.quizzes=Number.isFinite(Number(state.quizzes))?Number(state.quizzes):0;
state.correct=Number.isFinite(Number(state.correct))?Number(state.correct):0;
state.activity=Array.isArray(state.activity)?state.activity:[];
state.subjectStats=state.subjectStats&&typeof state.subjectStats==='object'&&!Array.isArray(state.subjectStats)?state.subjectStats:{};
function saveState(){safeStorageSet('afghanai-state',JSON.stringify(state));updateStats()}
function recordActivity(label){state.activity.unshift({label,time:new Date().toLocaleString()});state.activity=state.activity.slice(0,15);saveState()}
function updateStats(){$('#statLessons').textContent=state.lessons;$('#statQuestions').textContent=state.questions;$('#progressQuestions').textContent=state.questions;$('#progressQuizzes').textContent=state.quizzes;$('#progressCorrect').textContent=state.correct}
function addBubble(text,who){let d=document.createElement('div');d.className='bubble '+who;d.textContent=text;$('#messages').appendChild(d);$('#messages').scrollTop=$('#messages').scrollHeight;return d}
async function askAI(q){const lang=$('#answerLanguage').value;const pending=addBubble('در حال آماده‌سازی پاسخ…','bot');try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,language:lang})});const data=await r.json();if(!r.ok)throw Error(data.error||'Service unavailable');pending.textContent=data.answer||'پاسخی دریافت نشد.';recordActivity('پاسخ معلم هوشمند دریافت شد')}catch(e){pending.textContent='سرویس هوش مصنوعی هنوز فعال نیست یا سرور در دسترس نمی‌باشد.\n\nبرای پاسخ واقعی، سرور را طبق README راه‌اندازی و کلید API را به‌صورت امن در متغیر محیطی تنظیم کنید. بقیهٔ بخش‌های آموزشی این نمونه قابل آزمایش‌اند.';recordActivity('پرسش ثبت شد؛ سرویس هوش مصنوعی متصل نیست')}}
$('#chatForm').addEventListener('submit',async e=>{e.preventDefault();let q=$('#question').value.trim();if(!q)return;$('#question').value='';addBubble(q,'user');state.questions++;saveState();recordActivity('پرسش از معلم هوشمند');await askAI(q)});
$('.quick-prompts button').forEach(b=>b.onclick=()=>{$('#question').value=b.textContent;$('#question').focus()});
const lessons=[
 {name:'ریاضی',icon:'➗',desc:'اعداد، محاسبات و حل مسئله',body:'ریاضی به ما کمک می‌کند مقدارها را بشماریم، مقایسه کنیم و مسئله‌ها را حل کنیم.',example:'مثال: اگر ۳ بسته داشته باشیم و در هر بسته ۴ قلم باشد، ۳ × ۴ = ۱۲ قلم داریم.',topic:'ضرب و تقسیم'},
 {name:'علوم طبیعی',icon:'🌱',desc:'طبیعت، بدن انسان و محیط زیست',body:'گیاهان برای رشد به آب، نور، هوا و مواد غذایی نیاز دارند.',example:'در فتوسنتز، گیاه با کمک نور خورشید از آب و کاربن‌دای‌اکساید غذا می‌سازد و اکسیجن آزاد می‌کند.',topic:'گیاهان و فتوسنتز'},
 {name:'زبان دری',icon:'✍️',desc:'خواندن، نوشتن و دستور زبان',body:'جمله از واژه‌ها ساخته می‌شود و معمولاً یک فکر کامل را بیان می‌کند.',example:'مثال: «دانش‌آموز کتاب می‌خواند.» این جمله دربارهٔ کاری است که دانش‌آموز انجام می‌دهد.',topic:'جمله‌سازی'},
 {name:'زبان پشتو',icon:'🔤',desc:'مهارت‌های زبان پشتو',body:'د ژبې زده کړه د لوستلو، لیکلو، اورېدو او خبرو کولو له لارې پیاوړې کېږي.',example:'هره ورځ څو نوې کلمې زده کړه او په خپلو جملو کې یې وکاروه.',topic:'لوستل او لیکل'},
 {name:'انگلیسی',icon:'🌐',desc:'واژگان و گرامر پایه',body:'A noun names a person, place, thing, or idea.',example:'Examples: student, Kabul, book, kindness. A simple sentence: “The student reads a book.”',topic:'Nouns and sentences'},
 {name:'تعلیمات اسلامی',icon:'☪️',desc:'مفاهیم و اخلاق اسلامی',body:'راست‌گویی، امانت‌داری، مهربانی و احترام از ارزش‌های مهم اخلاقی‌اند.',example:'در زندگی روزمره می‌توانیم با وفای به وعده و کمک به دیگران این ارزش‌ها را تمرین کنیم.',topic:'اخلاق نیک'},
 {name:'فقه حنفی',icon:'🕌',desc:'آموزش احکام عملی بر بنیاد مذهب امام ابوحنیفه رحمه‌الله',body:'فقه حنفی یکی از مذاهب معتبر فقه اسلامی است. در این بخش، موضوعات پایه مانند طهارت، وضو، غسل، نماز، روزه، زکات و معاملات به زبان ساده آموزش داده می‌شود. در هر درس باید حکم، شرایط، ارکان، واجبات و مواردی که وضو یا عبادت را باطل می‌کند، با تفکیک روشن توضیح داده شود.',example:'نمونهٔ درس: برای آموزش وضو، نخست نیت و آداب آن معرفی می‌شود؛ سپس شستن اعضای وضو و ترتیب اعمال مطابق منابع معتبر حنفی شرح داده می‌شود. جزئیات و موارد اختلافی باید با ارجاع به منبع معتبر بررسی شوند.',topic:'طهارت و عبادات؛ آموزش مقدماتی فقه حنفی'},
 {name:'فقه حنفی: طهارت و وضو',icon:'💧',desc:'مبانی پاکی، آب‌ها و آداب وضو',body:'این درس با مفهوم طهارت در فقه حنفی آغاز می‌شود و سپس پاکی بدن، لباس و محل نماز، انواع آب و آداب وضو را معرفی می‌کند. در آموزش تفصیلی باید فرض‌ها، سنت‌ها، مکروهات و موارد نقض وضو جداگانه و با استناد به منبع معتبر توضیح داده شوند.',example:'تمرین: مراحل وضو را به ترتیب در دفتر بنویسید و برای هر مرحله دلیل و حکم آن را از کتاب معتبر فقه حنفی با راهنمایی استاد بررسی کنید.',topic:'طهارت، آب و وضو'},
 {name:'فقه حنفی: غسل و تیمم',icon:'🚿',desc:'آشنایی با غسل، اسباب آن و احکام تیمم',body:'در این بخش مفهوم غسل، مواردی که غسل را واجب می‌سازد، آداب آن و جایگاه تیمم در شرایط نبود آب یا ناتوانی از استفادهٔ آن آموزش داده می‌شود. جزئیات احکام باید با توجه به شرایط و منابع معتبر حنفی تدریس شوند.',example:'پرسش تمرینی: تفاوت وضو، غسل و تیمم چیست؟ پاسخ را با تعریف هرکدام و یک مثال آموزشی بنویسید.',topic:'غسل و تیمم'},
 {name:'فقه حنفی: نماز',icon:'🕌',desc:'آموزش مقدماتی شرایط، ارکان و واجبات نماز',body:'این درس ساختار نماز را به زبان ساده معرفی می‌کند: شرایط پیش از نماز، ارکان و واجبات، سنت‌ها، جماعت، سجدهٔ سهو و مواردی که نماز را فاسد می‌سازد. در تدریس باید فرض، واجب و سنت با یکدیگر خلط نشوند و نمونه‌ها از منابع معتبر فقه حنفی گرفته شوند.',example:'تمرین: یک جدول سه‌ستونی برای شرایط نماز، ارکان نماز و واجبات نماز بسازید و موارد را با استاد بررسی کنید.',topic:'شرایط، ارکان و واجبات نماز'},
 {name:'فقه حنفی: روزه',icon:'🌙',desc:'مبانی روزه، نیت، عذرها و احکام عمومی',body:'در این بخش مفهوم روزه، نیت، زمان آغاز و پایان، عذرهای شرعی، موارد باطل‌کننده و مباحث قضا و کفاره در سطح مقدماتی معرفی می‌شود. احکام مربوط به بیماری، سفر و وضعیت‌های خاص باید با پرسش از عالم آگاه و مراجعه به منابع معتبر بررسی شوند.',example:'تمرین: تفاوت قضا و کفاره را با زبان خود توضیح دهید و برای مثال‌های عملی از استاد راهنمایی بگیرید.',topic:'احکام مقدماتی روزه'},
 {name:'فقه حنفی: زکات و صدقه',icon:'🤲',desc:'آشنایی با هدف زکات و مفاهیم نصاب و مستحقان',body:'این درس فلسفهٔ زکات، تفاوت زکات و صدقه، مفهوم نصاب، گذشت سال قمری در موارد مربوط و گروه‌های مستحق را معرفی می‌کند. محاسبهٔ زکات دارایی‌ها به نوع دارایی و شرایط فقهی وابسته است؛ بنابراین برای محاسبهٔ واقعی باید از عالم یا مرجع معتبر کمک گرفته شود.',example:'تمرین: تفاوت زکات واجب و صدقهٔ مستحب را توضیح دهید و مفهوم نصاب را از کتاب درسی فقه حنفی یادداشت کنید.',topic:'مبانی زکات و صدقه'},
 {name:'فقه حنفی: معاملات و اخلاق اسلامی',icon:'⚖️',desc:'اصول امانت، رضایت، عدالت و پرهیز از فریب در دادوستد',body:'این درس مفاهیم عمومی معاملات در فقه اسلامی را معرفی می‌کند؛ مانند رضایت طرفین، امانت‌داری، راست‌گویی، روشن بودن موضوع معامله و پرهیز از فریب و ظلم. قراردادهای واقعی و مسائل مالی پیچیده نیازمند بررسی موردی نزد عالم و متخصص حقوقی هستند.',example:'تمرین: یک نمونهٔ خریدوفروش منصفانه را توصیف کنید و مشخص سازید چگونه رضایت، صداقت و روشن بودن قیمت رعایت می‌شود.',topic:'اصول معاملات و اخلاق دادوستد'},
 {name:'حکایات بزرگان',icon:'📜',desc:'داستان‌های آموزنده از زندگی پیامبران، صحابه، دانشمندان و بزرگان تاریخ',body:'در این بخش حکایت‌های کوتاه و آموزنده برای تقویت اخلاق، خرد و دانش گردآوری می‌شود. هر حکایت باید عنوان، روایت ساده، پیام اخلاقی و منبع قابل بررسی داشته باشد. داستان‌های دینی و تاریخی باید از منابع معتبر نقل شوند و روایت‌های مشهورِ بی‌سند به‌عنوان حقیقت قطعی معرفی نشوند.',example:'حکایت نمونه: امام ابوحنیفه رحمه‌الله به دانش‌اندوزی و دقت در پرسش و پاسخ شناخته می‌شود. پیام آموزشی این بخش آن است که برای آموختن، پرسیدنِ مؤدبانه و بررسی دلیل‌ها ارزشمند است. جزئیات هر روایت باید پیش از نشر با منبع معتبر تطبیق داده شود.',topic:'اخلاق، دانش، عدالت و پندهای زندگی'},
 {name:'تاریخ پادشاهان و فرمانروایان افغانستان',icon:'👑',desc:'آشنایی با دودمان‌ها، پادشاهان و دوره‌های تاریخی افغانستان',body:'این مضمون تاریخ فرمانروایان و دودمان‌های افغانستان را به ترتیب زمانی معرفی می‌کند. بخش آغازین به میرویس هوتکی و شکل‌گیری دولت هوتکی در اوایل سدهٔ هجدهم می‌پردازد؛ سپس احمدشاه درانی و جانشینان او، از جمله تیمورشاه، زمان‌شاه، محمودشاه و شاه‌شجاع بررسی می‌شوند. در ادامه، دودمان بارکزایی و فرمانروایانی چون دوست‌محمدخان، شیرعلی‌خان، عبدالرحمن‌خان، حبیب‌الله‌خان، امان‌الله‌خان، نادرشاه و محمدظاهرشاه معرفی می‌شوند. پایان سلطنت و اعلام جمهوری در سال ۱۹۷۳ نیز به‌عنوان نقطهٔ تغییر نظام سیاسی بررسی می‌شود. برای هر فرمانروا، دورهٔ حکومت، مرکز قدرت، رویدادهای مهم و زمینهٔ تاریخی با تفکیک واقعیت مستند از روایت‌های مورد اختلاف توضیح داده می‌شود.',example:'نمونهٔ درس: احمدشاه درانی در سال ۱۷۴۷ به پادشاهی رسید و بنیاد امپراتوری درانی را گذاشت. پس از او تیمورشاه درانی در سال ۱۷۷۲ به قدرت رسید. مرکز سیاسی در دورهٔ تیمورشاه در ۱۷۷۵ از قندهار به کابل انتقال یافت. برای مطالعهٔ بیشتر: Encyclopaedia Iranica، مدخل «Afghanistan: Political History» و گزارش تاریخی Congressional Research Service.',topic:'از هوتکیان و درانیان تا پایان سلطنت در ۱۹۷۳'},
 {name:'تاریخ افغانستان: هوتکیان',icon:'🏛️',desc:'میرویس هوتک و شکل‌گیری دولت هوتکی',body:'در اوایل سدهٔ هجدهم، میرویس هوتک در قندهار به رهبری سیاسی رسید و زمینهٔ شکل‌گیری دولت هوتکی را فراهم کرد. پس از او محمود هوتکی در ۱۷۲۲ اصفهان را گرفت و اشرف هوتکی نیز مدتی فرمانروایی کرد. این دوره را باید در زمینهٔ ضعف صفویان، رقابت‌های منطقه‌ای و تحولات قندهار مطالعه کرد.',example:'پرسش پژوهشی: چه شرایط سیاسی و اجتماعی به ظهور میرویس هوتک کمک کرد؟ پاسخ را با مراجعه به منابع تاریخی معتبر در چند جمله بنویسید.',topic:'میرویس هوتک، محمود هوتکی و اشرف هوتکی'},
 {name:'تاریخ افغانستان: احمدشاه درانی و درانیان',icon:'👑',desc:'تأسیس دولت درانی و فرمانروایی جانشینان احمدشاه',body:'احمدشاه درانی در ۱۷۴۷ به پادشاهی رسید و دولت درانی را بنیاد گذاشت. پس از او تیمورشاه درانی در ۱۷۷۲ به قدرت رسید و در ۱۷۷۵ مرکز سیاسی را از قندهار به کابل انتقال داد. پس از تیمورشاه، کشمکش‌های جانشینی میان شاهزادگان درانی ادامه یافت؛ از جمله زمان‌شاه، محمودشاه و شاه‌شجاع در دوره‌های گوناگون به سلطنت رسیدند.',example:'تمرین زمانی: سال‌های ۱۷۴۷ و ۱۷۷۲ را روی خط زمان بنویسید و تفاوت دورهٔ احمدشاه و تیمورشاه را توضیح دهید.',topic:'احمدشاه، تیمورشاه، زمان‌شاه، محمودشاه و شاه‌شجاع'},
 {name:'تاریخ افغانستان: بارکزاییان و دوست‌محمدخان',icon:'📜',desc:'ظهور دودمان بارکزایی و بازگشت تمرکز سیاسی',body:'در سدهٔ نوزدهم، دودمان بارکزایی در تحولات سیاسی افغانستان نقش برجسته یافت. دوست‌محمدخان از چهره‌های مهم این دوره بود و چند بار قدرت را به دست گرفت. رقابت‌های داخلی و مداخلهٔ قدرت‌های منطقه‌ای و امپراتوری بریتانیا بر سیاست افغانستان اثر گذاشت و زمینهٔ جنگ نخست افغان و انگلیس در ۱۸۳۹ تا ۱۸۴۲ را فراهم کرد.',example:'پرسش: چرا موقعیت جغرافیایی افغانستان در رقابت قدرت‌های سدهٔ نوزدهم اهمیت داشت؟ پاسخ را با نقشه و منابع تاریخی بررسی کنید.',topic:'دوست‌محمدخان و جنگ نخست افغان و انگلیس'},
 {name:'تاریخ افغانستان: جنگ‌های افغان و انگلیس',icon:'🛡️',desc:'رویدادهای مهم سه جنگ و پیامدهای سیاسی آن‌ها',body:'افغانستان در سدهٔ نوزدهم و اوایل سدهٔ بیستم با سه جنگ افغان و انگلیس روبه‌رو شد: جنگ نخست در ۱۸۳۹–۱۸۴۲، جنگ دوم در ۱۸۷۸–۱۸۸۰ و جنگ سوم در ۱۹۱۹. این جنگ‌ها زمینه‌ها و پیامدهای متفاوت داشتند. در مطالعهٔ آن‌ها باید نقش رهبران افغان، سیاست بریتانیا، شرایط منطقه‌ای و پیامدهای استقلال خارجی افغانستان را جداگانه بررسی کرد.',example:'تمرین: سه جنگ را با سال آغاز و پایان و یک پیامد مهم هرکدام در جدول مقایسه کنید.',topic:'۱۸۳۹–۱۸۴۲، ۱۸۷۸–۱۸۸۰ و ۱۹۱۹'},
 {name:'تاریخ افغانستان: امان‌الله‌خان و استقلال',icon:'🇦🇫',desc:'اصلاحات دورهٔ امان‌الله‌خان و استقلال در ۱۹۱۹',body:'امان‌الله‌خان پس از رویدادهای ۱۹۱۹ به پادشاهی رسید و استقلال افغانستان در امور سیاست خارجی به رسمیت شناخته شد. دورهٔ او با برنامه‌های اصلاحی در آموزش، اداره و قوانین همراه بود؛ این اصلاحات با حمایت‌ها و مخالفت‌های اجتماعی و سیاسی روبه‌رو شد و در نهایت سلطنت او در ۱۹۲۹ پایان یافت. ارزیابی این دوره باید هم دستاوردها و هم چالش‌ها را در نظر بگیرد.',example:'پرسش پژوهشی: کدام اصلاحات امان‌الله‌خان در آموزش و اداره مطرح شد و چرا با واکنش‌های متفاوت روبه‌رو گردید؟',topic:'استقلال ۱۹۱۹، اصلاحات و تحولات ۱۹۲۹'},
 {name:'تاریخ افغانستان: پادشاهی محمدظاهرشاه',icon:'🏰',desc:'دورهٔ سلطنت ۱۹۳۳ تا ۱۹۷۳ و تحولات قانون اساسی',body:'محمدظاهرشاه از ۱۹۳۳ تا ۱۹۷۳ پادشاه افغانستان بود. در این دوره، کشور شاهد تحولات اداری، آموزشی و زیربنایی بود و قانون اساسی ۱۹۶۴ زمینهٔ دوره‌ای از فعالیت‌های پارلمانی و سیاسی را فراهم کرد. در ۱۷ جولای ۱۹۷۳، محمدداوودخان با کودتا سلطنت را پایان داد و جمهوری اعلام شد. دربارهٔ این دوره باید رویدادها و دیدگاه‌های گوناگون تاریخی را با منابع معتبر سنجید.',example:'تمرین: سال‌های ۱۹۳۳، ۱۹۶۴ و ۱۹۷۳ را روی خط زمان قرار دهید و اهمیت هر رویداد را در یک جمله بنویسید.',topic:'محمدظاهرشاه، قانون اساسی ۱۹۶۴ و پایان سلطنت در ۱۹۷۳'},
 {name:'راهنمای آمادگی امتحان کانکور افغانستان',icon:'🎓',desc:'برنامه‌ریزی مطالعه، روش حل سوالات و آمادگی برای کانکور',body:'این مضمون راهنمای عملی داوطلبان کانکور افغانستان است. موضوعات آن شامل شناخت ساختار و طرزالعمل رسمی کانکور، تنظیم برنامهٔ روزانه و هفتگی، اولویت‌بندی مضامین مطابق رشتهٔ مورد نظر، مرور فعال، خلاصه‌نویسی، فلش‌کارت، حل سوالات چهارگزینه‌ای، مدیریت زمان، تحلیل پاسخ‌های نادرست و آزمون‌های شبیه‌سازی‌شده است. داوطلب باید آخرین اطلاعیه‌ها، زمان‌بندی، شرایط ثبت‌نام و منابع درسی را از مراجع رسمی امتحانات کانکور افغانستان بررسی کند؛ جزئیات ممکن است هر سال تغییر کند.',example:'نمونهٔ برنامهٔ روزانه: ۴۵ دقیقه مطالعهٔ یک مبحث، ۱۰ دقیقه استراحت، ۳۰ دقیقه حل سوالات همان مبحث و ۱۵ دقیقه بررسی اشتباهات. در پایان هفته یک آزمون آزمایشی زمان‌دار برگزار کنید و موضوعات ضعیف را برای هفتهٔ بعد یادداشت نمایید. این برنامه نمونه است و باید با وقت و سطح آمادگی داوطلب تنظیم شود.',topic:'برنامه‌ریزی، روش مطالعه و آزمون‌های تمرینی کانکور'},
 {name:'تجوید قرآن کریم',icon:'📖',desc:'آشنایی مقدماتی با قواعد درست‌خوانی قرآن کریم',body:'تجوید دانشی است که به خواندن درست حروف و رعایت ویژگی‌ها و قواعد تلاوت قرآن کریم کمک می‌کند. در این بخش، آموزش از شناخت حروف و مخارج آغاز می‌شود و سپس صفات حروف، حرکات، مد، غنه، نون ساکن و تنوین، میم ساکن و نشانه‌های وقف به‌صورت مرحله‌به‌مرحله معرفی می‌گردد.',example:'تمرین آغازین: هنگام یادگیری هر حرف، به محل خروج صدا و تفاوت آن با حروف نزدیک توجه کنید. سپس نمونه‌های کوتاه را با شنیدن قرائت قاری معتبر تمرین کنید و تلفظ را نزد استاد قرآن اصلاح نمایید. این متن جایگزین آموزش شفاهی و تصحیح قرائت نزد استاد نیست.',topic:'مخارج حروف، صفات، مد و قواعد نون و میم ساکن'},
 {name:'قرآن کریم: مخارج حروف',icon:'🔤',desc:'شناخت محل ادای حروف عربی',body:'مخرج حرف محل بیرون آمدن صدای آن هنگام تلفظ است. در آموزش مقدماتی، محل‌های عمومی ادای حروف مانند فضای دهان و حلق، زبان، لب‌ها و خیشوم معرفی می‌شوند. برای تشخیص درست هر حرف، شنیدن نمونهٔ قاری ماهر و تمرین زیر نظر استاد ضروری است.',example:'تمرین: سه حرفی را که در تلفظ برایت دشوار است انتخاب کن؛ نمونهٔ درست آن‌ها را از قاری معتبر بشنو و نزد استاد تکرار کن.',topic:'مخارج عمومی و تمرین تلفظ'},
 {name:'قرآن کریم: صفات حروف',icon:'✨',desc:'آشنایی با ویژگی‌های صدایی حروف',body:'صفات حروف ویژگی‌هایی هستند که هنگام ادای حروف شنیده می‌شوند و به تمایز حروف کمک می‌کنند. در این درس به‌صورت مقدماتی با مفاهیمی مانند همس، جهر، شدت، رخاوت و استعلاء آشنا می‌شوید. تشخیص عملی این صفات باید با شنیدن و تصحیح استاد انجام شود.',example:'تمرین: هنگام شنیدن تلاوت، به تفاوت صدای حروف نزدیک توجه کن و نمونه‌ها را در دفتر یادداشت کن.',topic:'صفات اصلی و تمرین شنیداری'},
 {name:'قرآن کریم: نون ساکن و تنوین',icon:'📗',desc:'آشنایی با احکام اظهار، ادغام، اقلاب و اخفا',body:'در تجوید، نون ساکن و تنوین با توجه به حرف بعدی احکام مشخصی دارند که در آموزش مشهور شامل اظهار، ادغام، اقلاب و اخفا است. هر حکم باید همراه با مثال قرآنی صحیح و شنیدن قرائت استاد آموخته شود؛ از حدس‌زدن تلفظ بدون شنیدن نمونه پرهیز کنید.',example:'تمرین: برای هر یک از چهار حکم، یک نمونه از مصحف آموزشی معتبر پیدا کن و آن را با قرائت استاد مقایسه کن.',topic:'چهار حکم نون ساکن و تنوین'},
 {name:'قرآن کریم: میم ساکن',icon:'📘',desc:'آشنایی با اظهار شفوی، ادغام شفوی و اخفای شفوی',body:'میم ساکن با توجه به حرف پس از آن سه حکم مشهور دارد: اظهار شفوی، ادغام شفوی و اخفای شفوی. در این درس، مفهوم هر حکم و نمونه‌های آن به شکل مقدماتی معرفی می‌شود. کیفیت غنه و ادای درست باید با استاد قرآن تمرین گردد.',example:'تمرین: نمونه‌های میم ساکن را در یک صفحه از قرآن با راهنمایی استاد پیدا و دسته‌بندی کن.',topic:'سه حکم میم ساکن'},
 {name:'قرآن کریم: مد و قصر',icon:'🎵',desc:'شناخت کشش صدا در تلاوت',body:'مد به کشش صدا در حروف مد گفته می‌شود و انواع و اندازه‌های آن بر اساس قواعد تجوید و روایت قرائت آموخته می‌شود. این بخش ابتدا مد طبیعی را معرفی می‌کند و سپس تفاوت کلی آن با برخی مدهای فرعی را توضیح می‌دهد. مقدار کشش را باید مطابق قرائت و آموزش استاد تمرین کرد.',example:'تمرین: هنگام شنیدن تلاوت، جایگاه حروف مد را مشخص کن و کشش را با نمونهٔ استاد مقایسه کن.',topic:'مد طبیعی و آشنایی با مدهای فرعی'},
 {name:'قرآن کریم: وقف و ابتدا',icon:'⏸️',desc:'آشنایی با نشانه‌های وقف و آغاز درست تلاوت',body:'وقف به ایستادن هنگام تلاوت و ابتدا به آغاز دوبارهٔ خواندن گفته می‌شود. انتخاب محل مناسب وقف و ابتدا برای حفظ معنا اهمیت دارد. نشانه‌های مصحف را باید با راهنمای همان چاپ و آموزش استاد شناخت؛ توقف در جای نامناسب ممکن است معنا را ناقص یا دگرگون کند.',example:'تمرین: یک آیهٔ کوتاه را با ترجمه بخوان و با کمک استاد محل مناسب وقف و آغاز را مشخص کن.',topic:'نشانه‌های وقف و رعایت معنا'},
 {name:'قرآن کریم: حفظ سوره‌های کوتاه',icon:'🌙',desc:'برنامهٔ تدریجی حفظ و مرور سوره‌های کوتاه',body:'حفظ قرآن با هدف کوچک، تکرار منظم و مرور پیوسته آسان‌تر می‌شود. برای آغاز می‌توان یک سورهٔ کوتاه را به بخش‌های کوچک تقسیم کرد، ابتدا قرائت صحیح را از استاد آموخت، سپس آیات را تکرار و در روزهای بعد مرور کرد. اولویت با صحت قرائت است، نه سرعت حفظ.',example:'برنامهٔ نمونه: روز نخست چند آیه را با شنیدن قرائت صحیح تمرین کن؛ روز بعد همان بخش را مرور و بخش بعدی را اضافه کن. در پایان هفته، تمام سوره را نزد استاد بخوان.',topic:'حفظ تدریجی، تکرار و مرور'},
 {name:'اجتماعیات',icon:'🌍',desc:'جامعه، تاریخ و جغرافیه',body:'جغرافیه دربارهٔ مکان‌ها، محیط طبیعی و رابطهٔ انسان با محیط مطالعه می‌کند.',example:'نقشه به ما کمک می‌کند موقعیت شهرها، کوه‌ها، دریاها و راه‌ها را پیدا کنیم.',topic:'نقشه و جغرافیه'},
 {name:'دانشنامهٔ افغانستان: جغرافیهٔ طبیعی',icon:'🏔️',desc:'کوه‌ها، دشت‌ها، رودها و اقلیم افغانستان',body:'افغانستان کشوری محاط به خشکه در قلب آسیاست. رشته‌کوه هندوکش از ویژگی‌های برجستهٔ جغرافیای طبیعی آن است. رودهایی چون آمو، کابل، هلمند و هریرود در زندگی مردم، زراعت و آب‌رسانی اهمیت دارند. آب‌وهوا در مناطق مختلف، از کوهستانی تا دشت‌های گرم و خشک، تفاوت می‌کند.',example:'تمرین: روی نقشهٔ افغانستان رشته‌کوه هندوکش و چهار رود مهم را پیدا کن و دربارهٔ اهمیت آب در زراعت یک پاراگراف بنویس.',topic:'موقعیت، کوه‌ها، رودها و اقلیم'},
 {name:'دانشنامهٔ افغانستان: ولایت‌ها و شهرها',icon:'🗺️',desc:'شناخت تقسیمات اداری و مراکز مهم افغانستان',body:'افغانستان دارای ۳۴ ولایت است. هر ولایت دارای مرکز، ولسوالی‌ها و آبادی‌های گوناگون است. در این درس با مفهوم ولایت، ولسوالی، مرکز ولایت و نقش شهرها در اداره، آموزش، تجارت و خدمات آشنا می‌شوید. فهرست تقسیمات اداری ممکن است در منابع رسمی به‌روزرسانی شود؛ برای اطلاعات دقیق باید به مراجع رسمی مراجعه کرد.',example:'تمرین: نام ولایت محل زندگی خود را بنویس و سه ولایت همسایه یا نزدیک آن را روی نقشه مشخص کن.',topic:'۳۴ ولایت، مراکز و تقسیمات اداری'},
 {name:'دانشنامهٔ افغانستان: زبان‌ها و گویش‌ها',icon:'🗣️',desc:'آشنایی با تنوع زبانی و ارزش چندزبانگی',body:'افغانستان جامعه‌ای چندزبانه است. دری و پشتو زبان‌های رسمی کشور اند و زبان‌ها و گویش‌های دیگری مانند ازبکی، ترکمنی، بلوچی، پشه‌ای، نورستانی و پامیری نیز در بخش‌هایی از کشور رواج دارند. تنوع زبانی بخشی از میراث فرهنگی مردم است و احترام به گویش‌ها و زبان‌های گوناگون به همزیستی کمک می‌کند.',example:'تمرین: سه واژه را که در دو زبان یا گویش متفاوت می‌دانی یادداشت کن و تفاوت تلفظ یا کاربرد آن‌ها را توضیح بده.',topic:'زبان‌های رسمی، زبان‌های محلی و گویش‌ها'},
 {name:'دانشنامهٔ افغانستان: فرهنگ و آداب',icon:'🧵',desc:'لباس، خوراک، موسیقی، صنایع دستی و مهمان‌نوازی',body:'فرهنگ افغانستان از سنت‌ها و شیوه‌های زندگی متنوع مناطق مختلف شکل گرفته است. لباس‌های محلی، خوراک‌های منطقه‌ای، موسیقی، صنایع دستی، شعر، جشن‌ها و مهمان‌نوازی از جلوه‌های این میراث‌اند. هیچ رسم واحدی نمایندهٔ همهٔ مردم نیست؛ شناخت تفاوت‌های منطقه‌ای و احترام به آن‌ها اهمیت دارد.',example:'تمرین: یک رسم یا هنر محلی منطقهٔ خود را معرفی کن و توضیح بده چگونه از نسل‌های پیشین به امروز رسیده است.',topic:'میراث فرهنگی و تنوع منطقه‌ای'},
 {name:'دانشنامهٔ افغانستان: ادبیات و شاعران',icon:'📚',desc:'آشنایی با شعر، داستان و چهره‌های ادبی',body:'ادبیات فارسی دری و پشتو و دیگر زبان‌های افغانستان میراثی پربار از شعر، داستان، تاریخ‌نگاری و اندیشه دارد. در مطالعهٔ ادبیات باید زندگی شاعر یا نویسنده، آثار شناخته‌شده، دورهٔ تاریخی و ویژگی‌های ادبی اثر را با منابع معتبر بررسی کرد. نمونه‌هایی از چهره‌های شناخته‌شده در ادبیات فارسی منطقه شامل سنایی غزنوی و عبدالرحمان جامی‌اند؛ پیوند هر شخصیت با جغرافیای تاریخی باید دقیق توضیح داده شود.',example:'تمرین: یک شاعر یا نویسندهٔ افغانستان را انتخاب کن، یک اثر او را نام ببر و دربارهٔ موضوع اصلی اثر چند جمله بنویس.',topic:'شاعران، نویسندگان و میراث ادبی'},
 {name:'دانشنامهٔ افغانستان: میراث تاریخی و باستانی',icon:'🏺',desc:'آشنایی با آثار باستانی و شهرهای تاریخی',body:'سرزمین افغانستان در مسیر پیوند تمدن‌های آسیای مرکزی، جنوب آسیا و غرب آسیا قرار داشته است. بلخ، بامیان، هرات، غزنی و محوطه‌های باستانی دیگر نشانه‌هایی از لایه‌های گوناگون تاریخ و فرهنگ‌اند. حفاظت از آثار تاریخی، ثبت علمی و جلوگیری از قاچاق میراث فرهنگی مسئولیت همگانی است.',example:'تمرین: یکی از شهرهای تاریخی افغانستان را انتخاب کن و سه ویژگی تاریخی یا فرهنگی آن را از منابع معتبر یادداشت کن.',topic:'بلخ، بامیان، هرات، غزنی و حفاظت میراث'},
 {name:'دانشنامهٔ افغانستان: منابع طبیعی و اقتصاد',icon:'⛏️',desc:'آشنایی با آب، زمین زراعتی، معادن و تولیدات',body:'منابع طبیعی افغانستان شامل آب، زمین‌های زراعتی، چراگاه‌ها و ذخایر معدنی است. استفادهٔ پایدار از این منابع نیازمند دانش فنی، حفاظت محیط زیست، شفافیت و مدیریت مسئولانه است. وجود یک منبع طبیعی به‌تنهایی به معنای استخراج آسان یا سود اقتصادی قطعی نیست؛ ارزیابی علمی، زیربنا و رعایت معیارهای محیطی اهمیت دارد.',example:'تمرین: یک محصول زراعتی یا منبع طبیعی منطقهٔ خود را معرفی کن و دو راه برای استفادهٔ پایدار از آن بنویس.',topic:'زراعت، آب، معادن و توسعهٔ پایدار'},
 {name:'کمپیوتر',icon:'💻',desc:'مهارت‌های ابتدایی دیجیتال',body:'کمپیوتر دستگاهی است که داده‌ها را دریافت و پردازش می‌کند و نتیجه می‌دهد.',example:'برای امنیت، رمز عبور را با دیگران شریک نساز و روی پیوندهای ناشناس کلیک نکن.',topic:'مهارت دیجیتال'},
 {name:'فزیک',icon:'⚡',desc:'حرکت، انرژی و نیرو',body:'نیرو می‌تواند حرکت یک جسم را تغییر دهد یا شکل آن را عوض کند.',example:'وقتی توپ را لگد می‌زنی، نیروی پا باعث حرکت توپ می‌شود.',topic:'نیرو و حرکت'},
 {name:'کیمیا',icon:'🧪',desc:'ماده و تغییرات آن',body:'ماده جرم دارد و فضا اشغال می‌کند. ماده می‌تواند جامد، مایع یا گاز باشد.',example:'یخ جامد است، آب مایع است و بخار آب حالت گازی آب است.',topic:'حالت‌های ماده'},
 {name:'بیولوژی',icon:'🧬',desc:'موجودات زنده',body:'موجودات زنده رشد می‌کنند، به محیط پاسخ می‌دهند و به مواد و انرژی نیاز دارند.',example:'گیاهان و حیوانات هر دو زنده‌اند، اما روش به‌دست‌آوردن غذای آن‌ها متفاوت است.',topic:'ویژگی‌های حیات'},
 {name:'تاریخ',icon:'🏛️',desc:'رویدادها و تمدن‌ها',body:'تاریخ گذشتهٔ انسان‌ها و جامعه‌ها را با استفاده از منابع و شواهد بررسی می‌کند.',example:'عکس‌ها، اسناد، آثار باستانی و روایت‌های معتبر می‌توانند به پژوهش تاریخی کمک کنند.',topic:'منابع تاریخی'}
];
function renderLessons(){const term=$('#lessonSearch').value.toLowerCase();$('#lessonGrid').innerHTML='';lessons.filter(l=>(l.name+' '+l.desc+' '+l.topic).toLowerCase().includes(term)).forEach(l=>{let b=document.createElement('button');b.className='subject';b.innerHTML=`<span class="subject-icon">${l.icon}</span><span><b>${l.name}</b><small>${l.desc}</small></span>`;b.onclick=()=>openLesson(l);$('#lessonGrid').appendChild(b)})}
function openLesson(l){const d=$('#lessonDetail');d.classList.remove('hidden');d.innerHTML=`<h2>${l.icon} ${l.name} — ${l.topic}</h2><p>${l.body}</p><p><b>مثال آموزشی:</b> ${l.example}</p><div class="lesson-actions"><button id="markLesson">✓ علامت‌گذاری به‌عنوان مرورشده</button><button id="askAboutLesson">✦ از معلم دربارهٔ این درس بپرس</button></div>`;$('#markLesson').onclick=()=>{state.lessons++;saveState();recordActivity('مرور درس: '+l.name);$('#markLesson').textContent='✓ مرور ثبت شد';$('#markLesson').disabled=true};$('#askAboutLesson').onclick=()=>{showPage('tutor');$('#question').value=`برای ${$('#grade').value}، موضوع «${l.topic}» در مضمون ${l.name} را با مثال‌های ساده توضیح بده.`;$('#question').focus()};d.scrollIntoView({behavior:'smooth',block:'nearest'})}
$('#lessonSearch').addEventListener('input',renderLessons);renderLessons();

const questionBank=[
 {q:'حاصل ۷ × ۸ چند است؟',opts:['۴۸','۵۶','۶۴','۵۴'],a:1,ex:'۷ ضربدر ۸ برابر با ۵۶ است.'},
 {q:'کدام بخش گیاه بیشتر نور را جذب می‌کند؟',opts:['ریشه','گل‌برگ','برگ','دانه'],a:2,ex:'برگ‌ها نور را جذب می‌کنند و در فتوسنتز نقش اساسی دارند.'},
 {q:'آب خالص در فشار معمولی در چند درجهٔ سانتی‌گراد یخ می‌بندد؟',opts:['۰ درجه','۱۰ درجه','۵۰ درجه','۱۰۰ درجه'],a:0,ex:'آب خالص در صفر درجهٔ سانتی‌گراد یخ می‌بندد.'},
 {q:'کدام گزینه یک منبع انرژی تجدیدپذیر است؟',opts:['زغال‌سنگ','نفت','نور خورشید','گاز طبیعی'],a:2,ex:'نور خورشید منبع انرژی تجدیدپذیر است.'},
 {q:'کدام عدد اول است؟',opts:['۹','۱۵','۱۷','۲۱'],a:2,ex:'عدد ۱۷ فقط بر ۱ و خودش بخش‌پذیر است؛ بنابراین عدد اول است.'},
 {q:'اگر ۲x + ۵ = ۱۵ باشد، مقدار x چند است؟',opts:['۳','۵','۱۰','۱۵'],a:1,ex:'۵ را از دو طرف کم می‌کنیم: ۲x=۱۰؛ سپس بر ۲ تقسیم می‌کنیم و x=۵ به‌دست می‌آید.'},
 {q:'واحد اندازه‌گیری نیرو در دستگاه SI چیست؟',opts:['ژول','وات','نیوتن','پاسکال'],a:2,ex:'نیرو در دستگاه بین‌المللی یکاها با نیوتن اندازه‌گیری می‌شود.'},
 {q:'فرمول کیمیاوی آب کدام است؟',opts:['CO₂','H₂O','O₂','NaCl'],a:1,ex:'هر مولکول آب از دو اتم هایدروجن و یک اتم اکسیجن ساخته شده است.'},
 {q:'کدام اندام در بدن انسان خون را پمپ می‌کند؟',opts:['شُش‌ها','معده','قلب','گرده‌ها'],a:2,ex:'قلب با انقباض و انبساط، خون را در بدن به گردش درمی‌آورد.'},
 {q:'کدام واژه از نظر املایی درست نوشته شده است؟',opts:['مسولیت','مسئولیت','مسوولیتت','مسئولیتت'],a:1,ex:'در نوشتار معیار فارسی، «مسئولیت» صورت درست این واژه است.'},
 {q:'پایتخت افغانستان کدام شهر است؟',opts:['هرات','قندهار','کابل','مزارشریف'],a:2,ex:'کابل پایتخت افغانستان است.'},
 {q:'کدام گزینه سیارهٔ منظومهٔ شمسی است؟',opts:['ماه','مریخ','خورشید','ستارهٔ قطبی'],a:1,ex:'مریخ یکی از سیاره‌های منظومهٔ شمسی است؛ ماه قمر زمین و خورشید یک ستاره است.'},
 {q:'کدام گزینه شکل گذشتهٔ فعل انگلیسی “go” است؟',opts:['goed','gone','went','going'],a:2,ex:'گذشتهٔ سادهٔ فعل بی‌قاعدهٔ go، واژهٔ went است.'}
];
const questionSubjects=['math','biology','science','science','math','math','physics','chemistry','biology','dari','history','science','english'];

questionBank.forEach((q,i)=>{q.subject=questionSubjects[i];q.difficulty='easy';});
questionBank.push(
{q:'اگر ۳/۴ یک عدد برابر ۲۴ باشد، خود عدد چند است؟',opts:['۱۸','۲۴','۳۲','۳۶'],a:2,ex:'عدد برابر ۲۴ × ۴ ÷ ۳ = ۳۲ است.',subject:'math',difficulty:'medium'},
{q:'ریشهٔ دوم ۱۴۴ کدام است؟',opts:['۱۰','۱۱','۱۲','۱۴'],a:2,ex:'۱۲ × ۱۲ = ۱۴۴؛ پس ریشهٔ دوم اصلی ۱۲ است.',subject:'math',difficulty:'hard'},
{q:'کدام اندامک سلول بیشتر مسئول تولید انرژی ATP است؟',opts:['هسته','میتوکندری','ریبوزوم','واکوئل'],a:1,ex:'میتوکندری محل اصلی تولید ATP در تنفس هوازی سلول است.',subject:'biology',difficulty:'medium'},
{q:'در تقسیم میتوز، از یک سلول مادر معمولاً چند سلول دختر ایجاد می‌شود؟',opts:['یک','دو','سه','چهار'],a:1,ex:'در میتوز یک سلول به دو سلول دختر با مجموعهٔ کروموزومی مشابه تقسیم می‌شود.',subject:'biology',difficulty:'hard'},
{q:'کدام گاز در فرایند فتوسنتز از هوا جذب می‌شود؟',opts:['اکسیجن','نایتروجن','کاربن‌دای‌اکساید','هایدروجن'],a:2,ex:'گیاهان در فتوسنتز کاربن‌دای‌اکساید را جذب می‌کنند.',subject:'science',difficulty:'medium'},
{q:'تبدیل آب مایع به بخار از سطح مایع چه نام دارد؟',opts:['انجماد','تبخیر','میعان','تصعید'],a:1,ex:'تبخیر تبدیل مایع به گاز از سطح مایع است.',subject:'science',difficulty:'hard'},
{q:'اگر سرعت جسمی از ۵ به ۲۰ متر بر ثانیه در ۳ ثانیه برسد، شتاب متوسط چند است؟',opts:['۳','۵','۱۰','۱۵ متر بر مجذور ثانیه'],a:1,ex:'شتاب متوسط برابر تغییر سرعت تقسیم بر زمان است: (۲۰−۵)÷۳ = ۵ متر بر مجذور ثانیه.',subject:'physics',difficulty:'medium'},
{q:'اگر نیروی خالص وارد بر جسم دو برابر شود و جرم ثابت بماند، شتاب چه می‌شود؟',opts:['نصف','دو برابر','چهار برابر','بدون تغییر'],a:1,ex:'طبق قانون دوم نیوتن a=F/m؛ با جرم ثابت، دو برابر شدن نیرو شتاب را دو برابر می‌کند.',subject:'physics',difficulty:'hard'},
{q:'عدد اتمی یک عنصر نشان‌دهندهٔ تعداد کدام ذره در هسته است؟',opts:['نوترون','پروتون','الکترون‌های لایهٔ آخر','مولکول‌ها'],a:1,ex:'عدد اتمی برابر تعداد پروتون‌های هسته است.',subject:'chemistry',difficulty:'medium'},
{q:'پیوند یونی معمولاً در نتیجهٔ چه رخدادی شکل می‌گیرد؟',opts:['اشتراک برابر الکترون‌ها','انتقال الکترون و جاذبهٔ یون‌ها','اشتراک پروتون‌ها','تجزیهٔ هسته'],a:1,ex:'در پیوند یونی انتقال الکترون و جاذبهٔ الکترواستاتیکی یون‌های مخالف نقش دارد.',subject:'chemistry',difficulty:'hard'},
{q:'در جملهٔ «دانش‌آموز کتاب را خواند»، نهاد کدام است؟',opts:['کتاب','را','خواند','دانش‌آموز'],a:3,ex:'انجام‌دهندهٔ کار در این جمله «دانش‌آموز» است.',subject:'dari',difficulty:'medium'},
{q:'کدام گزینه از آرایه‌های ادبی تشبیه دارد؟',opts:['قد او مانند سرو است','باد وزید','کتاب روی میز است','باران بارید'],a:0,ex:'وجود واژهٔ «مانند» در این جمله نشانهٔ تشبیه است.',subject:'dari',difficulty:'hard'},
{q:'کدام رویداد در سال ۱۹۱۹ در تاریخ افغانستان اهمیت دارد؟',opts:['اعلام استقلال در سیاست خارجی','تأسیس دولت هوتکی','پایان سلطنت ظاهرشاه','قانون اساسی ۱۳۴۳'],a:0,ex:'سال ۱۹۱۹ با استقلال افغانستان در امور سیاست خارجی پیوند دارد.',subject:'history',difficulty:'medium'},
{q:'قانون اساسی دورهٔ محمدظاهرشاه در کدام سال تصویب شد؟',opts:['۱۹۱۹','۱۹۳۳','۱۹۶۴','۱۹۷۳'],a:2,ex:'قانون اساسی دورهٔ محمدظاهرشاه در سال ۱۹۶۴ تصویب شد.',subject:'history',difficulty:'hard'},
{q:'Choose the correct plural form of “child”.',opts:['childs','childes','children','childrens'],a:2,ex:'The irregular plural of child is children.',subject:'english',difficulty:'medium'},
{q:'Choose the correct sentence.',opts:['She go to school.','She goes to school.','She going school.','She gone to school.'],a:1,ex:'With he, she, or it in the present simple, the verb usually takes -s or -es.',subject:'english',difficulty:'hard'}
);

let questions=questionBank;
let qi=0,chosen=false,score=0,quizInProgress=false,quizMisses=[],quizTimer=null,quizSeconds=900;
function updateQuizTimer(){const el=$('#quizTimer');if(el)el.textContent=`زمان باقی‌مانده: ${String(Math.floor(quizSeconds/60)).padStart(2,'0')}:${String(quizSeconds%60).padStart(2,'0')}`}
function startQuizTimer(){clearInterval(quizTimer);updateQuizTimer();quizTimer=setInterval(()=>{quizSeconds--;updateQuizTimer();if(quizSeconds<=0)finishQuizByTimeout();},1000);}
function startQuiz(){clearInterval(quizTimer);quizTimer=null;quizInProgress=false;const subject=$('#quizSubject')?.value||'all';const level=$('#quizLevel')?.value||'all';questions=questionBank.filter(q=>(subject==='all'||q.subject===subject)&&(level==='all'||q.difficulty===level));if(!questions.length){$('#quizCount').textContent='بدون سوال';$('#quizQuestion').textContent='برای این انتخاب هنوز سوالی ثبت نشده است.';$('#quizOptions').replaceChildren();$('#quizFeedback').textContent='لطفاً مضمون یا سطح دیگری را انتخاب کنید.';$('#quizBar').style.width='0%';$('#nextQuestion').disabled=true;$('#nextQuestion').textContent='سوال بعدی';return;}qi=0;score=0;quizSeconds=900;quizMisses=[];chosen=false;quizInProgress=true;$('#nextQuestion').onclick=advanceQuiz;drawQuestion();startQuizTimer()}
function finishQuizByTimeout(){if(!quizInProgress)return;clearInterval(quizTimer);quizTimer=null;quizInProgress=false;chosen=true;quizMisses.push({question:'زمان آزمون پایان یافت',answer:'—',explanation:'پاسخ‌گویی در زمان تعیین‌شده را تمرین کنید.'});$('#quizQuestion').textContent='زمان آزمون پایان یافت';$('#quizOptions').innerHTML='';$('#quizFeedback').textContent='نتیجهٔ شما: '+score+' پاسخ درست از '+questions.length+' سوال. برای دیدن کارنامه، دکمهٔ زیر را بزنید.';$('#nextQuestion').textContent='دیدن نتیجه';$('#nextQuestion').disabled=false;$('#nextQuestion').onclick=showQuizResult}
function showQuizResult(){clearInterval(quizTimer);quizTimer=null;quizInProgress=false;state.quizzes++;saveState();recordActivity('آزمون زمان‌دار تکمیل شد؛ امتیاز '+score+' از '+questions.length);const pct=Math.round(score/questions.length*100);$('#quizQuestion').textContent='کارنامهٔ آزمون: '+score+' از '+questions.length+' ('+pct+'٪)';$('#quizOptions').innerHTML='';$('#quizFeedback').textContent=quizMisses.length?'مرور نکات:\n'+quizMisses.map((m,n)=>(n+1)+'. '+m.question+'\nپاسخ درست: '+m.answer+'\n'+m.explanation).join('\n\n'):'آفرین! همهٔ پاسخ‌ها درست بود.';$('#nextQuestion').textContent='آزمون دوباره';$('#nextQuestion').disabled=false;$('#nextQuestion').onclick=()=>startQuiz()}
function drawQuestion(){let q=questions[qi];$('#quizCount').textContent=`سوال ${qi+1} از ${questions.length}`;$('#quizBar').style.width=((qi+1)/questions.length*100)+'%';$('#quizQuestion').textContent=q.q;$('#quizOptions').innerHTML='';$('#quizFeedback').textContent='';$('#nextQuestion').disabled=true;$('#nextQuestion').textContent=qi===questions.length-1?'دیدن نتیجه':'سوال بعدی ←';q.opts.forEach((o,i)=>{let b=document.createElement('button');b.className='quiz-option';b.textContent=o;b.onclick=()=>chooseAnswer(i,b);$('#quizOptions').appendChild(b)})}
function chooseAnswer(i,btn){if(chosen)return;chosen=true;let q=questions[qi];$$('.quiz-option').forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add('correct')});const subject=q.subject||'other';state.subjectStats[subject]=state.subjectStats[subject]||{attempts:0,correct:0};state.subjectStats[subject].attempts++;if(i===q.a){score++;state.correct++;state.subjectStats[subject].correct++;$('#quizFeedback').textContent='آفرین! پاسخ درست است. 🌟'}else{btn.classList.add('wrong');quizMisses.push({question:q.q,answer:q.opts[q.a],explanation:q.ex});$('#quizFeedback').textContent='اشکال ندارد؛ پاسخ درست: '+q.opts[q.a]+'. '+q.ex}saveState();recordActivity(i===q.a?'پاسخ درست در آزمون':'پاسخ نادرست در آزمون');$('#nextQuestion').disabled=false}
function advanceQuiz(){if(!chosen)return;if(qi<questions.length-1){qi++;chosen=false;drawQuestion();return;}showQuizResult()}
$('#nextQuestion').onclick=advanceQuiz;
$('#quizSubject')?.addEventListener('change',startQuiz);
$('#quizLevel')?.addEventListener('change',startQuiz);
function renderSubjectPerformance(){const host=$('#subjectPerformance');if(!host)return;const labels={math:'ریاضی',biology:'بیولوژی',science:'علوم طبیعی',physics:'فزیک',chemistry:'کیمیا',dari:'دری',history:'تاریخ',english:'انگلیسی',other:'سایر'};const entries=Object.entries(state.subjectStats||{}).filter(([key,v])=>v.attempts>0);host.innerHTML='';if(!entries.length){host.innerHTML='<div class="empty-state">هنوز داده‌ای برای تحلیل مضمون‌ها وجود ندارد. یک آزمون انجام بده.</div>';return;}entries.sort((a,b)=>(b[1].correct/b[1].attempts)-(a[1].correct/a[1].attempts));entries.forEach(([key,v])=>{const pct=Math.round(v.correct/v.attempts*100);const row=document.createElement('div');row.className='subject-performance-row';const top=document.createElement('div');top.className='subject-performance-top';const name=document.createElement('strong');name.textContent=labels[key]||key;const score=document.createElement('span');score.textContent=pct+'٪ · '+v.correct+'/'+v.attempts;top.append(name,score);const track=document.createElement('div');track.className='subject-performance-track';const fill=document.createElement('div');fill.className='subject-performance-fill';fill.style.width=pct+'%';track.appendChild(fill);const advice=document.createElement('small');advice.textContent=pct>=80?'عملکرد خوب؛ برای تثبیت ادامه بده.':pct>=50?'نیاز به مرور و تمرین بیشتر داری.':'بهتر است این مضمون را از درس‌های پایه دوباره مرور کنی.';row.append(top,track,advice);host.appendChild(row);});}
function renderProgress(){updateStats();renderSubjectPerformance();let list=$('#activityList');list.innerHTML='';if(!state.activity.length){list.innerHTML='<div class="empty-state">هنوز فعالیتی ثبت نشده است. یک درس مرور کن یا امتحان را انجام بده.</div>';return}state.activity.slice(0,10).forEach(a=>{let el=document.createElement('div');el.className='activity-item';let label=document.createElement('span');label.textContent=a.label;let time=document.createElement('small');time.textContent=a.time;el.append(label,time);list.appendChild(el)})}
$('#resetProgress').onclick=()=>{if(confirm('آیا مطمئن هستید که تمام آمار این دستگاه پاک شود؟')){state.questions=0;state.lessons=0;state.quizzes=0;state.correct=0;state.subjectStats={};state.activity=[];saveState();renderProgress()}}

/* Translator UI interactions. Translation backend is intentionally not simulated. */
const trFrom=$('#translatorFrom'),trTo=$('#translatorTo'),trInput=$('#translatorInput'),trResult=$('#translatorResult'),trState=$('#translatorState');
function translatorCount(){const n=trInput.value.length;$('#translatorLength').textContent=n.toLocaleString()+' / ۵۰۰۰'}
trInput?.addEventListener('input',translatorCount);translatorCount();

const translatorExamples={
greeting:{fa:'سلام، حال شما چطور است؟',ps:'سلام، تاسو څنګه یاست؟',en:'Hello, how are you?'},
school:{fa:'آموزش کلید پیشرفت جامعه است.',ps:'زده کړه د ټولنې د پرمختګ کیلي ده.',en:'Education is the key to a society’s progress.'}
};
document.querySelectorAll('[data-translator-sample]').forEach(btn=>btn.addEventListener('click',()=>{const samples=translatorExamples[btn.dataset.translatorSample];if(!samples)return;trInput.value=samples[trFrom.value]||samples.fa;translatorCount();trInput.focus()}));

$('#translatorSwap')?.addEventListener('click',()=>{const a=trFrom.value;trFrom.value=trTo.value;trTo.value=a;});
$('#translatorClear')?.addEventListener('click',()=>{trInput.value='';trResult.textContent='ترجمهٔ شما در اینجا نمایش داده می‌شود.';trState.textContent='آماده';translatorCount();trInput.focus()});
$('#translatorRun')?.addEventListener('click',()=>{if(!trInput.value.trim()){trState.textContent='متن وارد نشده';trInput.focus();return}trState.textContent='سرویس وصل نیست';trResult.textContent='ترجمهٔ واقعی هنوز در دسترس نیست. برای فعال‌سازی باید API هوش مصنوعی از طریق سرور امن وصل شود. متن شما به هیچ سرویسی ارسال نشد.';});
$('#translatorCopy')?.addEventListener('click',async()=>{const text=trResult.textContent;if(!text||text==='ترجمهٔ شما در اینجا نمایش داده می‌شود.')return;try{await navigator.clipboard.writeText(text);$('#translatorState').textContent='کاپی شد'}catch(e){$('#translatorState').textContent='کاپی خودکار پشتیبانی نشد؛ متن را دستی انتخاب کنید'}});

$('#profileBtn').onclick=()=>alert('این نسخه نمایشی است. ورود امن و پروفایل شخصی در مرحلهٔ بعد توسعه می‌یابد.');
$('#checkApi').onclick=async()=>{let out=$('#apiStatus');out.textContent='در حال بررسی...';try{let r=await fetch('/api/health');let d=await r.json();out.textContent=d.ai_configured?'سرور در دسترس است؛ کلید API تنظیم شده.':'سرور در دسترس است، اما کلید API هنوز تنظیم نشده است.'}catch(e){out.textContent='سرور پیدا نشد. برای پاسخ هوش مصنوعی، برنامهٔ سرور را مطابق README اجرا کنید.'}};
// Keep the PWA service worker enabled so app-shell caching and offline fallback work.
if('serviceWorker' in navigator){
 window.addEventListener('load',()=>{
  navigator.serviceWorker.register('./sw.js',{scope:'./'})
   .then(()=>console.info('Afghan AI offline support is ready.'))
   .catch(error=>console.warn('Afghan AI service worker registration failed:',error));
 });
}
let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').classList.remove('hidden')});$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}};
updateStats();renderProgress();startQuiz();


// Kankor study planner: local-only sample schedule.
const planButton=$('#makeKankorPlan');
if(planButton)planButton.addEventListener('click',()=>{
 const goal=$('#kankorGoal').value.trim()||'رشتهٔ انتخابی';
 const days=Math.max(1,Math.min(365,Number($('#kankorDays').value)||60));
 const hours=Math.max(1,Math.min(12,Number($('#kankorHours').value)||4));
 const blocks=[['ریاضی و استدلال',0.25],['علوم (فزیک، کیمیا و بیولوژی)',0.35],['زبان و مهارت‌های عمومی',0.20],['مرور و حل سوالات',0.20]];
 const result=$('#kankorPlanResult');
 const safeGoal=goal.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const week=[
  ['شنبه','ریاضی و استدلال','حل تمرین و یادداشت نکته‌ها'],
  ['یک‌شنبه','فزیک و کیمیا','مرور فرمول‌ها و حل مسئله'],
  ['دوشنبه','بیولوژی و علوم طبیعی','مطالعهٔ مفاهیم و شکل‌ها'],
  ['سه‌شنبه','دری و زبان انگلیسی','واژگان، دستور و درک مطلب'],
  ['چهارشنبه','ریاضی و مضمون دشوارتر','تمرین هدفمند از اشتباهات'],
  ['پنج‌شنبه','مرور همهٔ مضامین','فلش‌کارت و پرسش‌های کوتاه'],
  ['جمعه','آزمون آزمایشی و استراحت','بررسی پاسخ‌ها و استراحت کافی']
 ];
 const weekly='<h3>برنامهٔ هفتگی پیشنهادی</h3><div class="kankor-week-grid">'+week.map((d,i)=>'<div class="kankor-day"><strong>'+d[0]+'</strong><b>'+d[1]+'</b><span>'+d[2]+'</span><small>'+Math.max(.5,hours-(i===6?hours*.5:0)).toFixed(1)+' ساعت برنامهٔ روزانه</small></div>').join('')+'</div>';
 result.innerHTML='<h3>برنامهٔ نمونه برای '+safeGoal+'</h3><p>'+days+' روز تا امتحان · '+hours+' ساعت مطالعه در روز</p><ul>'+blocks.map(([name,share])=>'<li>'+name+': '+(hours*share).toFixed(1)+' ساعت در روز</li>').join('')+'</ul>'+weekly+'<p>پس از هر ۴۵ تا ۵۰ دقیقه مطالعه، ۵ تا ۱۰ دقیقه استراحت کن. جمعه را برای آزمون، بررسی اشتباهات و استراحت متوازن نگه دار. سهم مضامین را مطابق رشته و نصاب رسمی خودت تنظیم کن.</p>';
 const tasks=[['task1','مطالعهٔ مضمون اصلی'],['task2','حل ۲۰ سوال تمرینی'],['task3','مرور یادداشت‌ها و نکته‌ها'],['task4','تمرین یک مضمون دشوار'],['task5','بررسی اشتباهات و برنامه‌ریزی فردا']];
 let completed={};try{completed=JSON.parse(safeStorageGet('afghanai-kankor-checklist')||'{}')||{}}catch(e){}
 const checklist='<section class="kankor-checklist"><h3>چک‌لیست پیشرفت روزانه</h3><p>کارهای انجام‌شده را علامت بزن؛ پیشرفتت در همین دستگاه ذخیره می‌شود.</p><div class="kankor-check-items">'+tasks.map(([id,label])=>'<label class="kankor-check-item"><input type="checkbox" data-kankor-task="'+id+'" '+(completed[id]?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div><div class="kankor-check-progress"><div><span>پیشرفت امروز</span><b id="kankorChecklistPercent">0٪</b></div><div class="kankor-check-track"><span id="kankorChecklistBar"></span></div></div></section>';
 result.innerHTML+=checklist;
 const paintChecklist=()=>{const done=tasks.filter(([id])=>completed[id]).length;const pct=Math.round(done/tasks.length*100);const label=result.querySelector('#kankorChecklistPercent');const bar=result.querySelector('#kankorChecklistBar');if(label)label.textContent=pct+'٪';if(bar)bar.style.width=pct+'%';};
 result.querySelectorAll('[data-kankor-task]').forEach(input=>input.addEventListener('change',()=>{completed[input.dataset.kankorTask]=input.checked;safeStorageSet('afghanai-kankor-checklist',JSON.stringify(completed));paintChecklist();}));
 paintChecklist();
 safeStorageSet('afghanai-kankor-plan',JSON.stringify({goal,days,hours}));
});
try{const savedPlan=safeStorageJSON('afghanai-kankor-plan',null);if(savedPlan&&$('#kankorGoal')){$('#kankorGoal').value=savedPlan.goal;$('#kankorDays').value=savedPlan.days;$('#kankorHours').value=savedPlan.hours}}catch(e){}
// Learning toolkit: local-only notes, flashcards, focus timer and speech.
let focusSeconds=25*60, focusInterval=null, flashcards=safeStorageJSON('afghanai-flashcards',[]), flashIndex=0, flashRevealed=false;
const clock=$('#focusClock');
function paintClock(){if(clock)clock.textContent=String(Math.floor(focusSeconds/60)).padStart(2,'0')+':'+String(focusSeconds%60).padStart(2,'0')}
function stopFocus(){if(focusInterval){clearInterval(focusInterval);focusInterval=null}}
$('#timerStart')?.addEventListener('click',()=>{if(focusInterval)return;$('#timerStatus').textContent='زمان تمرکز آغاز شد؛ موفق باشی!';focusInterval=setInterval(()=>{focusSeconds--;paintClock();if(focusSeconds<=0){stopFocus();$('#timerStatus').textContent='آفرین! زمان مطالعه تمام شد؛ کمی استراحت کن.';if('Notification'in window&&Notification.permission==='granted')new Notification('Afghan AI',{body:'زمان تمرکز تمام شد؛ استراحت کوتاه کن.'});} },1000)});
$('#timerPause')?.addEventListener('click',()=>{stopFocus();$('#timerStatus').textContent='تایمر متوقف شد.'});
$('#timerReset')?.addEventListener('click',()=>{stopFocus();focusSeconds=25*60;paintClock();$('#timerStatus').textContent='تایمر دوباره آماده است.'});paintClock();
$('#studyNotes').value=safeStorageGet('afghanai-study-notes')||'';
$('#saveNotes')?.addEventListener('click',()=>{safeStorageSet('afghanai-study-notes',$('#studyNotes').value);$('#notesStatus').textContent='یادداشت با موفقیت در همین دستگاه ذخیره شد.'});
$('#clearNotes')?.addEventListener('click',()=>{if(confirm('یادداشت‌ها پاک شوند؟')){$('#studyNotes').value='';safeStorageRemove('afghanai-study-notes');$('#notesStatus').textContent='یادداشت‌ها پاک شد.'}});
function renderFlashcard(){let el=$('#flashcardDisplay');if(!flashcards.length){el.textContent='هنوز کارتی نساخته‌ای.';$('#flashcardCount').textContent='۰ کارت ذخیره شده';return}let f=flashcards[flashIndex];el.textContent=flashRevealed?f.back:f.front;$('#flashcardCount').textContent=(flashIndex+1)+' از '+flashcards.length+' کارت';}
$('#addFlashcard')?.addEventListener('click',()=>{let front=$('#cardFront').value.trim(),back=$('#cardBack').value.trim();if(!front||!back){alert('لطفاً پرسش و پاسخ را هر دو بنویس.');return}flashcards.push({front,back});safeStorageSet('afghanai-flashcards',JSON.stringify(flashcards));flashIndex=flashcards.length-1;flashRevealed=false;$('#cardFront').value='';$('#cardBack').value='';renderFlashcard()});
$('#revealFlashcard')?.addEventListener('click',()=>{if(!flashcards.length)return;flashRevealed=!flashRevealed;renderFlashcard()});
$('#nextFlashcard')?.addEventListener('click',()=>{if(!flashcards.length)return;flashIndex=(flashIndex+1)%flashcards.length;flashRevealed=false;renderFlashcard()});renderFlashcard();
$('#speakStart')?.addEventListener('click',()=>{let text=$('#speakText').value.trim();if(!text)return;if(!('speechSynthesis'in window)){ $('#speechStatus').textContent='خواندن صوتی در این مرورگر پشتیبانی نمی‌شود.';return}speechSynthesis.cancel();let utterance=new SpeechSynthesisUtterance(text);utterance.lang=($('#uiLanguage').value==='en'?'en-US':$('#uiLanguage').value==='ps'?'ps-AF':'fa-IR');speechSynthesis.speak(utterance);$('#speechStatus').textContent='در حال خواندن متن...'});
$('#speakStop')?.addEventListener('click',()=>{if('speechSynthesis'in window)speechSynthesis.cancel();$('#speechStatus').textContent='خواندن متوقف شد.'});


// Study checklist and text lab — private, browser-local helpers.
let studyTasks=safeStorageJSON('afghanai-study-tasks',[]);
function renderStudyTasks(){
 const host=$('#studyTaskList'); if(!host)return; host.replaceChildren();
 if(!studyTasks.length){const empty=document.createElement('p');empty.className='study-task-empty';empty.textContent='هنوز کاری اضافه نشده است.';host.append(empty);return}
 studyTasks.forEach((task,index)=>{
  const row=document.createElement('label');row.className='study-task-row'+(task.done?' is-done':'');
  const check=document.createElement('input');check.type='checkbox';check.checked=!!task.done;check.setAttribute('aria-label','انجام شد: '+task.text);
  check.addEventListener('change',()=>{studyTasks[index].done=check.checked;safeStorageSet('afghanai-study-tasks',JSON.stringify(studyTasks));renderStudyTasks()});
  const title=document.createElement('span');title.textContent=task.text;
  const del=document.createElement('button');del.type='button';del.className='study-task-delete';del.textContent='×';del.setAttribute('aria-label','حذف '+task.text);
  del.addEventListener('click',()=>{studyTasks.splice(index,1);safeStorageSet('afghanai-study-tasks',JSON.stringify(studyTasks));renderStudyTasks()});
  row.append(check,title,del);host.append(row);
 });
 const done=studyTasks.filter(t=>t.done).length;const status=$('#studyTaskStatus');if(status)status.textContent=done+' از '+studyTasks.length+' کار انجام شده است.';
}
$('#studyTaskForm')?.addEventListener('submit',e=>{e.preventDefault();const field=$('#studyTaskInput'),value=field.value.trim();if(!value)return;studyTasks.push({text:value,done:false});safeStorageSet('afghanai-study-tasks',JSON.stringify(studyTasks));field.value='';renderStudyTasks();field.focus()});
$('#clearStudyTasks')?.addEventListener('click',()=>{if(!studyTasks.length)return;if(confirm('تمام کارهای فهرست پاک شوند؟')){studyTasks=[];safeStorageRemove('afghanai-study-tasks');renderStudyTasks()}});
renderStudyTasks();
const textLab=$('#textLabInput');
function updateTextLab(){if(!textLab)return;const v=textLab.value.trim();const words=v?v.split(/\\s+/u).filter(Boolean).length:0;const sentences=v?v.split(/[.!?؟。]+/u).filter(s=>s.trim()).length:0;$('#textLabWords').textContent=words.toLocaleString();$('#textLabChars').textContent=textLab.value.length.toLocaleString();$('#textLabSentences').textContent=sentences.toLocaleString()}
textLab?.addEventListener('input',updateTextLab);updateTextLab();
$('#textLabClear')?.addEventListener('click',()=>{textLab.value='';updateTextLab();$('#textLabStatus').textContent='متن پاک شد.';textLab.focus()});
$('#textLabCopy')?.addEventListener('click',async()=>{if(!textLab.value.trim()){ $('#textLabStatus').textContent='اول متن وارد کنید.';return}try{await navigator.clipboard.writeText(textLab.value);$('#textLabStatus').textContent='متن کاپی شد.'}catch(e){$('#textLabStatus').textContent='کاپی خودکار ممکن نشد؛ متن را دستی انتخاب کنید.'}});


// Offline arithmetic practice: all questions are generated and checked in the browser.
(()=>{
 const question=$('#mathQuestion'),form=$('#mathAnswerForm'),answer=$('#mathAnswer'),feedback=$('#mathFeedback'),scoreEl=$('#mathScore');
 if(!question||!form||!answer)return;
 let expected=null,score=0,answered=false;
 const digits={easy:10,medium:30,hard:100};
 function makeQuestion(){
  const max=digits[$('#mathLevel').value]||10,choice=$('#mathOperation').value;
  const ops=choice==='mix'?['add','sub','mul','div']:[choice];
  const op=ops[Math.floor(Math.random()*ops.length)];
  let a=1+Math.floor(Math.random()*max),b=1+Math.floor(Math.random()*max),symbol='+';
  if(op==='sub'){if(b>a)[a,b]=[b,a];expected=a-b;symbol='−'}
  else if(op==='mul'){expected=a*b;symbol='×'}
  else if(op==='div'){expected=a; b=1+Math.floor(Math.random()*Math.min(max,12));a=b*(1+Math.floor(Math.random()*Math.min(max,12)));expected=a/b;symbol='÷'}
  else{expected=a+b;symbol='+'}
  if(op==='add')expected=a+b;
  question.textContent=a+' '+symbol+' '+b+' = ؟';
  answer.value='';answer.focus();feedback.textContent='سؤال تازه آماده است. پاسخ خود را وارد کنید.';answered=false;
 }
 form.addEventListener('submit',e=>{
  e.preventDefault();if(answered||answer.value.trim()==='')return;
  const value=Number(answer.value);
  if(Number.isFinite(value)&&Math.abs(value-expected)<1e-9){score++;scoreEl.textContent=score.toLocaleString();feedback.textContent='آفرین! پاسخ درست است. 🌟'}
  else feedback.textContent='هنوز درست نیست. پاسخ درست: '+expected.toLocaleString()+'؛ دوباره تمرین کن.';
  answered=true;
 });
 $('#mathNewQuestion')?.addEventListener('click',makeQuestion);
 $('#mathLevel')?.addEventListener('change',makeQuestion);
 $('#mathOperation')?.addEventListener('change',makeQuestion);
 makeQuestion();
})();
 
// Trilingual vocabulary trainer with locally stored mastery states.
const vocabEntries=[
 {en:'Hello',fa:'سلام',ps:'سلام',pron:'heh-LOH'},
 {en:'Book',fa:'کتاب',ps:'کتاب',pron:'book'},
 {en:'School',fa:'مکتب',ps:'ښوونځی',pron:'skool'},
 {en:'Teacher',fa:'معلم / استاد',ps:'ښوونکی / استاد',pron:'TEE-cher'},
 {en:'Student',fa:'شاگرد',ps:'زده‌کوونکی',pron:'STOO-dent'},
 {en:'Water',fa:'آب',ps:'اوبه',pron:'WAW-ter'},
 {en:'Knowledge',fa:'دانش',ps:'پوهه',pron:'NOL-ij'},
 {en:'Family',fa:'خانواده',ps:'کورنۍ',pron:'FAM-uh-lee'},
 {en:'Friend',fa:'دوست',ps:'ملګری',pron:'frend'},
 {en:'Beautiful',fa:'زیبا',ps:'ښکلی',pron:'BYOO-tuh-ful'},
 {en:'Learn',fa:'یاد گرفتن',ps:'زده کول',pron:'lern'},
 {en:'Future',fa:'آینده',ps:'راتلونکی',pron:'FYOO-cher'}
];
let vocabStates=safeStorageJSON('afghanai-vocab-states',{}),vocabIndex=0,vocabRevealed=false,vocabVisible=[...vocabEntries.keys()];
function filterVocab(){const q=($('#vocabSearch')?.value||'').trim().toLowerCase(),f=$('#vocabFilter')?.value||'all';vocabVisible=vocabEntries.map((v,i)=>i).filter(i=>{const v=vocabEntries[i],known=vocabStates[i]==='known';return(f==='all'||(f==='known'?known:!known))&&(!q||[v.en,v.fa,v.ps].some(x=>x.toLowerCase().includes(q))) });if(!vocabVisible.includes(vocabIndex))vocabIndex=vocabVisible[0]??-1;vocabRevealed=false;renderVocab()}
function renderVocab(){const host=$('#vocabCard');if(!host)return;host.replaceChildren();if(vocabIndex<0||!vocabVisible.length){const empty=document.createElement('p');empty.textContent='واژه‌ای با این جستجو پیدا نشد.';host.append(empty);$('#vocabStatus').textContent='فیلتر را تغییر دهید یا واژهٔ دیگری جستجو کنید.';return}const v=vocabEntries[vocabIndex],pos=vocabVisible.indexOf(vocabIndex);const small=document.createElement('small');small.textContent='واژهٔ '+(pos+1)+' از '+vocabVisible.length;const title=document.createElement('h3');title.textContent=v.en;host.append(small,title);if(vocabRevealed){const fa=document.createElement('p');fa.textContent='دری: '+v.fa;const ps=document.createElement('p');ps.textContent='پښتو: '+v.ps;const pr=document.createElement('span');pr.textContent='Pronunciation: '+v.pron;host.append(fa,ps,pr)}else{const hint=document.createElement('p');hint.textContent='برای دیدن معنی، دکمهٔ «نمایش معنی» را بزنید.';host.append(hint)}const known=vocabStates[vocabIndex]==='known';$('#vocabStatus').textContent=(Object.values(vocabStates).filter(x=>x==='known').length)+' واژه یادگرفته‌شده؛ '+vocabEntries.length+' واژه در این مجموعه.'+(known?' این واژه یاد گرفته شده است.':'')}
$('#vocabSearch')?.addEventListener('input',filterVocab);$('#vocabFilter')?.addEventListener('change',filterVocab);
$('#vocabReveal')?.addEventListener('click',()=>{if(vocabIndex<0)return;vocabRevealed=!vocabRevealed;renderVocab()});
function moveVocab(delta){if(!vocabVisible.length)return;let p=vocabVisible.indexOf(vocabIndex);vocabIndex=vocabVisible[(p+delta+vocabVisible.length)%vocabVisible.length];vocabRevealed=false;renderVocab()}
$('#vocabPrev')?.addEventListener('click',()=>moveVocab(-1));$('#vocabNext')?.addEventListener('click',()=>moveVocab(1));
function setVocabState(state){if(vocabIndex<0)return;vocabStates[vocabIndex]=state;safeStorageSet('afghanai-vocab-states',JSON.stringify(vocabStates));if($('#vocabFilter').value!=='all')filterVocab();else renderVocab()}
$('#vocabKnown')?.addEventListener('click',()=>setVocabState('known'));$('#vocabReview')?.addEventListener('click',()=>setVocabState('review'));filterVocab();


const virtualLabLessons=[
{cat:'physics',title:'سرعت و حرکت',level:'مقدماتی',desc:'رابطهٔ فاصله، زمان و سرعت متوسط.',lesson:'سرعت متوسط از تقسیم فاصلهٔ طی‌شده بر زمان به‌دست می‌آید. اگر جسمی ۱۰۰ متر را در ۲۰ ثانیه طی کند، سرعت متوسط آن ۵ متر در ثانیه است.',task:'اگر دوچرخه‌سواری ۶۰ متر را در ۱۰ ثانیه طی کند، سرعت متوسط او چند متر در ثانیه است؟'},
{cat:'physics',title:'قانون اهم و مدار ساده',level:'مقدماتی',desc:'آشنایی نظری با ولتاژ، جریان و مقاومت.',lesson:'قانون اهم رابطهٔ ولتاژ، جریان و مقاومت را بیان می‌کند: ولتاژ برابر است با جریان ضرب‌در مقاومت. این درس صرفاً نظری است؛ با برق شهری آزمایش نکنید.',task:'اگر مقاومت ۴ اهم و جریان ۲ آمپر باشد، ولتاژ چند ولت است؟'},
{cat:'chemistry',title:'شناخت اسید و باز',level:'مقدماتی',desc:'مفهوم pH و تفاوت اسید، باز و محلول خنثی.',lesson:'مقیاس pH برای بیان اسیدی یا بازی بودن محلول آبی به‌کار می‌رود. در دمای معمول، pH کمتر از ۷ اسیدی، نزدیک ۷ خنثی و بیشتر از ۷ بازی است. از چشیدن یا لمس مواد ناشناخته خودداری کنید.',task:'آب خالص با pH نزدیک ۷ در کدام گروه قرار می‌گیرد؟'},
{cat:'biology',title:'فتوسنتز در گیاهان',level:'مقدماتی',desc:'چگونگی استفادهٔ گیاه از نور برای ساخت مواد غذایی.',lesson:'گیاهان سبز با کمک انرژی نور، آب و دی‌اکسید کربن مواد قندی می‌سازند و اکسیژن آزاد می‌کنند. کلروفیل در جذب نور نقش اساسی دارد.',task:'سه ماده یا عامل ضروری برای فتوسنتز را نام ببرید.'},
{cat:'math',title:'نسبت و تناسب',level:'مقدماتی',desc:'کاربرد نسبت در اندازه‌گیری و مسائل روزمره.',lesson:'نسبت مقایسهٔ دو مقدار هم‌نوع است. اگر نسبت ۲ به ۳ باشد، مجموع بخش‌ها پنج قسمت برابر خواهد بود.',task:'اگر نسبت سیب‌های سرخ به سبز ۲ به ۳ و مجموع ۲۰ باشد، چند سیب سرخ داریم؟'},
{cat:'environment',title:'چرخهٔ آب',level:'مقدماتی',desc:'تبخیر، تراکم، بارندگی و جریان آب.',lesson:'انرژی خورشید آب را تبخیر می‌کند. بخار آب سرد شده و متراکم می‌شود، ابرها شکل می‌گیرند و سپس بارندگی بخشی از آب را به زمین بازمی‌گرداند.',task:'چهار مرحلهٔ اصلی چرخهٔ آب را به ترتیب بنویسید.'}
];
function renderVirtualLab(){
 const grid=$('#labCourseGrid');if(!grid)return;
 const q=($('#labSearch')?.value||'').trim().toLocaleLowerCase(),cat=$('#labCategory')?.value||'all';
 const items=virtualLabLessons.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="historyculture-course-card"><span class="historyculture-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مشاهدهٔ آزمایش و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">آزمایشی پیدا نشد.</p>';
}
$('#labSearch')?.addEventListener('input',renderVirtualLab);
$('#labCategory')?.addEventListener('change',renderVirtualLab);
$('#labDensityBtn')?.addEventListener('click',()=>{
 const mass=Number($('#labMass')?.value),volume=Number($('#labVolume')?.value),out=$('#labDensityResult');
 if(!out)return;
 if(!Number.isFinite(mass)||!Number.isFinite(volume)||mass<0||volume<=0){out.textContent='لطفاً جرم معتبر و حجم بزرگ‌تر از صفر وارد کنید.';return;}
 out.textContent='چگالی: '+(mass/volume).toFixed(3)+' گرام بر سانتی‌متر مکعب';
});
renderVirtualLab();


const spaceLessons=[
{cat:'solar',title:'منظومهٔ شمسی',level:'مقدماتی',desc:'خورشید، سیاره‌ها و اجرام کوچک منظومه.',lesson:'منظومهٔ شمسی شامل خورشید، هشت سیاره، قمرها، سیارک‌ها و دنباله‌دارها است. گرانش خورشید بیشتر اجرام این منظومه را در مدار نگه می‌دارد.',task:'نام هشت سیاره را به ترتیب فاصله از خورشید بنویسید.'},
{cat:'solar',title:'زمین و ماه',level:'مقدماتی',desc:'حرکت مداری ماه، شب و روز و گرفت‌ها.',lesson:'ماه قمر طبیعی زمین است و نور آن بازتاب نور خورشید است. چرخش زمین سبب چرخهٔ شب و روز می‌شود؛ گرفت خورشید و ماه هنگامی رخ می‌دهد که اجرام در آرایش هندسی مناسبی قرار گیرند.',task:'تفاوت گردش ماه به دور زمین و چرخش ماه به دور محور خودش را توضیح دهید.'},
{cat:'solar',title:'مریخ و جستجوی حیات',level:'متوسط',desc:'سطح مریخ، آب گذشته و مأموریت‌های رباتیک.',lesson:'مریخ سیاره‌ای سنگی با جو نازک و نشانه‌هایی از جریان آب در گذشتهٔ دور است. مریخ‌نوردها خاک، سنگ و محیط این سیاره را بررسی می‌کنند؛ تا امروز شواهد قطعی از حیات در آن تأیید نشده است.',task:'دو دلیل علمی برای مطالعهٔ مریخ نام ببرید.'},
{cat:'stars',title:'ستارگان و چرخهٔ زندگی آن‌ها',level:'متوسط',desc:'زایش ستاره‌ها، همجوشی و پایان عمر ستارگان.',lesson:'ستارگان در ابرهای گازی و غباری شکل می‌گیرند. در بخش عمدهٔ عمر خود، انرژی را از همجوشی هسته‌ای تولید می‌کنند. سرنوشت نهایی آن‌ها به جرم اولیه‌شان بستگی دارد.',task:'چرا جرم اولیه در سرنوشت نهایی یک ستاره اهمیت دارد؟'},
{cat:'stars',title:'کهکشان راه شیری',level:'مقدماتی',desc:'ساختار کهکشان خانهٔ منظومهٔ شمسی.',lesson:'راه شیری یک کهکشان مارپیچی میله‌ای است و منظومهٔ شمسی در یکی از بازوهای آن قرار دارد. کهکشان‌ها از ستارگان، گاز، غبار و مادهٔ تاریک تشکیل شده‌اند.',task:'کهکشان را تعریف کنید و دو جزء آن را نام ببرید.'},
{cat:'physics',title:'سیاه‌چاله‌ها و گرانش',level:'پیشرفته',desc:'افق رویداد و خمیدگی فضا-زمان.',lesson:'سیاه‌چاله ناحیه‌ای از فضا-زمان است که گرانش آن چنان قوی است که پس از عبور از افق رویداد، حتی نور نیز نمی‌تواند بیرون بیاید. سیاه‌چاله‌ها مستقیماً با نور خود دیده نمی‌شوند؛ اثرشان بر مادهٔ اطراف قابل بررسی است.',task:'افق رویداد را با زبان خود توضیح دهید.'},
{cat:'technology',title:'ماهواره‌ها و کاربردهای آن‌ها',level:'مقدماتی',desc:'ارتباطات، هواشناسی، ناوبری و سنجش از دور.',lesson:'ماهواره‌ها ابزارهایی هستند که در مدار اجرام آسمانی می‌گردند. ماهواره‌های مصنوعی برای مخابرات، پیش‌بینی هوا، نقشه‌برداری، ناوبری و پژوهش علمی استفاده می‌شوند.',task:'سه کاربرد ماهواره‌ها در زندگی روزمره را بنویسید.'},
{cat:'technology',title:'تلسکوپ‌ها و رصد آسمان',level:'مقدماتی',desc:'تلسکوپ نوری، رادیویی و رصدخانه‌ها.',lesson:'تلسکوپ‌ها تابش اجرام آسمانی را گردآوری می‌کنند تا جزئیات بیشتری آشکار شود. برخی تلسکوپ‌ها نور مرئی و برخی امواج رادیویی یا طول موج‌های دیگر را بررسی می‌کنند.',task:'تفاوت اصلی تلسکوپ نوری و رادیویی چیست؟'}
];
function renderSpaceCenter(){
 const grid=$('#spaceCourseGrid');if(!grid)return;
 const q=($('#spaceSearch')?.value||'').trim().toLocaleLowerCase(),cat=$('#spaceCategory')?.value||'all';
 const items=spaceLessons.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="historyculture-course-card"><span class="historyculture-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مطالعهٔ درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">موضوعی پیدا نشد.</p>';
}
$('#spaceSearch')?.addEventListener('input',renderSpaceCenter);
$('#spaceCategory')?.addEventListener('change',renderSpaceCenter);
$('#spaceWeightBtn')?.addEventListener('click',()=>{
 const earth=Number($('#spaceEarthWeight')?.value),factor=Number($('#spacePlanet')?.value),out=$('#spaceWeightResult');
 if(!out)return;
 if(!Number.isFinite(earth)||earth<=0){out.textContent='لطفاً وزن معتبر بزرگ‌تر از صفر وارد کنید.';return;}
 out.textContent='وزن تقریبی شما: '+(earth*factor).toFixed(1)+' کیلوگرام‌نیرو (نسبت به زمین)';
});
renderSpaceCenter();


const aiRoboticsLessons=[
{cat:'basics',title:'هوش مصنوعی چیست؟',level:'مقدماتی',desc:'تعریف AI، کاربردها و محدودیت‌ها.',lesson:'هوش مصنوعی شاخه‌ای از علوم کمپیوتر است که سامانه‌هایی برای انجام کارهایی مانند تشخیص الگو، پیش‌بینی، فهم زبان و تولید محتوا می‌سازد. خروجی AI ممکن است نادرست یا جانبدارانه باشد و باید بررسی شود.',task:'سه کاربرد مفید هوش مصنوعی در آموزش یا زراعت افغانستان را بنویسید.'},
{cat:'ml',title:'یادگیری ماشین',level:'مقدماتی',desc:'یادگیری الگو از داده‌ها.',lesson:'در یادگیری ماشین، الگوریتم با نمونه‌های داده آموزش می‌بیند تا برای داده‌های تازه پیش‌بینی یا دسته‌بندی انجام دهد. کیفیت داده و ارزیابی مستقل برای جلوگیری از خطا اهمیت دارد.',task:'برای پیش‌بینی قیمت محصولات زراعتی، چه داده‌هایی می‌تواند مفید باشد؟'},
{cat:'deep',title:'شبکه‌های عصبی مصنوعی',level:'متوسط',desc:'نورون‌ها، وزن‌ها، لایه‌ها و آموزش.',lesson:'شبکهٔ عصبی مصنوعی از واحدهای محاسباتی به‌هم‌پیوسته تشکیل می‌شود. وزن‌ها شدت ارتباط‌ها را مشخص می‌کنند و در جریان آموزش با استفاده از داده و معیار خطا تنظیم می‌شوند.',task:'نقش وزن‌ها و لایه‌ها را در یک شبکهٔ عصبی توضیح دهید.'},
{cat:'robotics',title:'مبانی رباتیک',level:'مقدماتی',desc:'حسگر، محرک، کنترل‌کننده و بازخورد.',lesson:'یک ربات معمولاً از حسگرها برای دریافت اطلاعات محیط، کنترل‌کننده برای تصمیم‌گیری و محرک‌ها برای حرکت یا انجام عمل استفاده می‌کند. طراحی ایمن باید توقف اضطراری و محدودیت حرکت را در نظر بگیرد.',task:'برای یک ربات آبیاری گلخانه سه حسگر یا قطعهٔ ضروری پیشنهاد کنید.'},
{cat:'vision',title:'بینایی کمپیوتر',level:'متوسط',desc:'تحلیل تصویر و تشخیص اشیا.',lesson:'بینایی کمپیوتر به سیستم‌ها کمک می‌کند از تصویر و ویدیو اطلاعات استخراج کنند؛ مانند شناسایی اشیا یا بررسی وضعیت گیاه. کیفیت تصویر، نور و تنوع داده بر دقت اثر می‌گذارند.',task:'یک کاربرد بینایی کمپیوتر برای تشخیص بیماری برگ گیاهان شرح دهید.'},
{cat:'language',title:'پردازش زبان طبیعی',level:'متوسط',desc:'کار با متن و زبان انسانی.',lesson:'پردازش زبان طبیعی یا NLP روش‌هایی برای تحلیل و تولید زبان انسانی است؛ از جمله ترجمه، خلاصه‌سازی و دسته‌بندی متن. زبان‌های کم‌منبع به دادهٔ باکیفیت و ارزیابی بومی نیاز دارند.',task:'دو چالش ساخت ابزار زبان‌شناختی برای دری یا پشتو را نام ببرید.'},
{cat:'ethics',title:'اخلاق، حریم خصوصی و ایمنی AI',level:'مقدماتی',desc:'سوگیری، شفافیت، امنیت و حفاظت داده.',lesson:'سامانه‌های AI باید با توجه به حریم خصوصی، رضایت، امنیت، عدالت و امکان بازبینی طراحی شوند. اطلاعات حساس را بدون ضرورت و مجوز در ابزارها وارد نکنید.',task:'برای استفادهٔ مسئولانه از AI در مکتب سه قاعده پیشنهاد کنید.'},
{cat:'robotics',title:'پروژهٔ آموزشی ربات آبیاری',level:'پروژه',desc:'طرح مفهومی ربات برای صرفه‌جویی آب.',lesson:'در یک طرح آموزشی می‌توان حسگر رطوبت خاک را به کنترل‌کننده وصل کرد تا هنگام خشک‌شدن خاک، پمپ کم‌ولتاژ مناسب را فعال کند. ساخت واقعی نیازمند بررسی برق، عایق‌بندی، جریان آب و نظارت متخصص است.',task:'نمودار سادهٔ حسگر، کنترل‌کننده و پمپ را رسم و منطق روشن‌شدن پمپ را توضیح دهید.'}
];
function renderAIRoboticsCenter(){
 const grid=$('#aiRoboticsCourseGrid');if(!grid)return;
 const q=($('#aiRoboticsSearch')?.value||'').trim().toLocaleLowerCase(),cat=$('#aiRoboticsCategory')?.value||'all';
 const items=aiRoboticsLessons.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="historyculture-course-card"><span class="historyculture-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>مشاهدهٔ درس و پروژه</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">درسی پیدا نشد.</p>';
}
$('#aiRoboticsSearch')?.addEventListener('input',renderAIRoboticsCenter);
$('#aiRoboticsCategory')?.addEventListener('change',renderAIRoboticsCenter);
$('#aiNeuronRun')?.addEventListener('click',()=>{
 const x1=Number($('#aiInputOne')?.value),w1=Number($('#aiWeightOne')?.value),x2=Number($('#aiInputTwo')?.value),w2=Number($('#aiWeightTwo')?.value),t=Number($('#aiThreshold')?.value),out=$('#aiNeuronResult');
 if(!out)return;
 if(![x1,w1,x2,w2,t].every(Number.isFinite)){out.textContent='لطفاً همهٔ مقادیر را درست وارد کنید.';return;}
 const sum=x1*w1+x2*w2;out.textContent='مجموع وزن‌دار: '+sum.toFixed(2)+'؛ خروجی آستانه‌ای: '+(sum>=t?'۱ (فعال)':'۰ (غیرفعال)');
});
renderAIRoboticsCenter();


const vocationalCourses=[
{cat:'energy',title:'مبانی برق‌کاری ایمن',level:'مقدماتی',desc:'شناخت مفاهیم ولتاژ، جریان، مقاومت و ابزارهای اندازه‌گیری.',lesson:'برق‌کاری نیازمند آموزش عملی و رعایت مقررات ایمنی است. پیش از هر کار باید منبع انرژی قطع و بی‌برقی با وسیلهٔ مناسب توسط فرد آموزش‌دیده تأیید شود. هرگز برای تمرین از برق شهری استفاده نکنید. موضوعات پایه شامل ولتاژ، جریان، مقاومت، عایق و ارتینگ است.',task:'تفاوت ولتاژ و جریان را با یک مثال ساده توضیح دهید.'},
{cat:'energy',title:'نصب و نگهداری سیستم خورشیدی',level:'مقدماتی',desc:'اجزای سیستم سولر، پنل، کنترولر، باتری و اینورتر.',lesson:'یک سیستم خورشیدی مستقل معمولاً از پنل، کنترولر شارژ، باتری، اینورتر و سیم‌کشی مناسب تشکیل می‌شود. ظرفیت اجزا باید بر اساس مصرف، ساعات آفتاب، شرایط آب‌وهوا و مشخصات سازنده انتخاب شود. نصب روی بام و اتصال برق باید توسط متخصص انجام شود.',task:'وظیفهٔ پنل، باتری و اینورتر را جداگانه بنویسید.'},
{cat:'repair',title:'آشنایی با ترمیم موبایل',level:'مقدماتی',desc:'شناخت قطعات، ابزار، عیب‌یابی و مراقبت از دستگاه.',lesson:'ترمیم موبایل با بررسی منظم آغاز می‌شود: شرح مشکل، بررسی ظاهری، شارژر و کابل سالم، سپس عیب‌یابی تخصصی. پیش از بازکردن دستگاه باید آن را خاموش کرد و خطر باتری لیتیومی، تخلیهٔ الکتریسیتهٔ ساکن و آسیب به اطلاعات را در نظر گرفت.',task:'سه پرسش مهمی را که پیش از ترمیم از مشتری می‌پرسید، بنویسید.'},
{cat:'repair',title:'ترمیم و نگهداری کمپیوتر',level:'مقدماتی',desc:'سخت‌افزار، سیستم‌عامل، پاک‌کاری و پشتیبان‌گیری.',lesson:'نگهداری کمپیوتر شامل پاک‌کاری ایمن، تهویهٔ مناسب، به‌روزرسانی نرم‌افزار، پشتیبان‌گیری و بررسی سلامت حافظه است. پیش از بازکردن کیس، برق دستگاه را جدا کنید و از تماس با قطعات داخلی در حالت برق‌دار بپرهیزید.',task:'یک چک‌لیست پنج‌مرحله‌ای برای نگهداری ماهانهٔ کمپیوتر بسازید.'},
{cat:'craft',title:'خیاطی و طراحی لباس',level:'مقدماتی',desc:'اندازه‌گیری، الگو، دوخت و کنترل کیفیت.',lesson:'فرایند خیاطی با گرفتن اندازه‌های دقیق، انتخاب پارچه، تهیهٔ الگو، برش و دوخت آغاز می‌شود. اندازه‌گیری باید با حفظ حریم شخصی و رضایت مشتری انجام شود. کیفیت دوخت، پاکی کار و تحویل به‌موقع در رضایت مشتری مهم است.',task:'مراحل تهیهٔ یک پیراهن ساده را به ترتیب فهرست کنید.'},
{cat:'construction',title:'نجاری و کار با چوب',level:'مقدماتی',desc:'شناخت چوب، اندازه‌گیری، اتصال و پرداخت سطح.',lesson:'نجاری شامل انتخاب چوب مناسب، اندازه‌گیری دقیق، برش، اتصال و پرداخت است. ابزار برقی و تیغه‌ها خطر جدی دارند؛ استفاده از محافظ چشم و گوش، مهار قطعه و آموزش حضوری ضروری است. برای تمرین نظری می‌توان نقشهٔ یک چوکی ساده را طراحی کرد.',task:'برای ساخت یک چوکی ساده چه اندازه‌ها و قطعاتی باید مشخص شوند؟'},
{cat:'construction',title:'مبانی ساختمان‌سازی',level:'مقدماتی',desc:'مصالح، نقشه‌خوانی، اندازه‌گیری و کیفیت ساختمان.',lesson:'ساختمان‌سازی ایمن بر نقشهٔ تأییدشده، کیفیت مصالح، پی‌سازی درست، نظارت تخنیکی و رعایت مقررات ساختمانی متکی است. طراحی سازه و تعیین ابعاد عناصر باربر باید توسط انجنیر مسلکی انجام شود.',task:'سه نوع مصالح ساختمانی را نام ببرید و کاربرد هرکدام را بنویسید.'},
{cat:'food',title:'آشپزی و مصونیت غذایی',level:'مقدماتی',desc:'بهداشت، نگهداری مواد غذایی و آماده‌سازی غذا.',lesson:'مصونیت غذایی با شستن دست‌ها، جدا نگه‌داشتن مواد خام و پخته، پخت کافی و سرد نگه‌داشتن درست مواد فسادپذیر تقویت می‌شود. سطح‌ها و ابزار باید پاک باشند و تاریخ مصرف مواد بررسی شود.',task:'چهار اصل اساسی جلوگیری از آلودگی متقاطع در آشپزخانه را بنویسید.'},
{cat:'food',title:'بسته‌بندی و فروش محصولات خانگی',level:'مقدماتی',desc:'بسته‌بندی پاک، برچسب‌گذاری و خدمت به مشتری.',lesson:'بسته‌بندی باید متناسب با نوع محصول، پاک و محافظ باشد. برچسب روشن می‌تواند نام محصول، ترکیبات، وزن، تاریخ تولید و راه تماس تولیدکننده را نشان دهد. برای محصولات خوراکی مقررات محلی صحت و معیارهای مصونیت را رعایت کنید.',task:'برای یک محصول محلی نمونهٔ برچسب معلوماتی طراحی کنید.'}
];
function renderVocationalCenter(){
 const grid=$('#vocationalCourseGrid');if(!grid)return;
 const q=($('#vocationalSearch')?.value||'').trim().toLocaleLowerCase(),cat=$('#vocationalCategory')?.value||'all';
 const items=vocationalCourses.filter(x=>(cat==='all'||x.cat===cat)&&[x.title,x.desc,x.lesson,x.task].some(v=>v.toLocaleLowerCase().includes(q)));
 grid.innerHTML=items.length?items.map(x=>'<article class="historyculture-course-card"><span class="historyculture-level">'+x.level+'</span><h3>'+x.title+'</h3><p>'+x.desc+'</p><details><summary>درس و تمرین</summary><p>'+x.lesson+'</p><b>تمرین:</b><p>'+x.task+'</p></details></article>').join(''):'<p class="empty-state">مهارتی پیدا نشد.</p>';
}
$('#vocationalSearch')?.addEventListener('input',renderVocationalCenter);
$('#vocationalCategory')?.addEventListener('change',renderVocationalCenter);
const vocationalPlans={
solar:['آشنایی با انرژی خورشیدی و اصول ایمنی','شناخت پنل، باتری و کنترولر','محاسبهٔ سادهٔ مصرف روزانه','خواندن مشخصات تجهیزات','تمرین طراحی یک سیستم فرضی','مرور حفاظت و نگهداری','ارزیابی و طرح پروژهٔ کوچک'],
mobile:['شناخت قطعات و ابزارهای ترمیم','اصول ایمنی باتری و حفاظت ESD','گرفتن شرح مشکل و عیب‌یابی اولیه','شناخت نمایشگر، پورت و باتری','تمرین تشخیص عیب روی نمونهٔ خاموش','خدمات مشتری و حفاظت اطلاعات','مرور و ارزیابی مهارت‌ها'],
sewing:['شناخت پارچه و ابزار خیاطی','اندازه‌گیری و ثبت اندازه‌ها','رسم الگوی ساده','تمرین دوخت مستقیم روی پارچهٔ تمرینی','کنترل کیفیت و اصلاح دوخت','محاسبهٔ مصرف پارچه و هزینه','تکمیل نمونهٔ کوچک و ارزیابی'],
computer:['شناخت قطعات اصلی کمپیوتر','نگهداری و پاک‌کاری ایمن','نصب و به‌روزرسانی نرم‌افزار','پشتیبان‌گیری و امنیت اطلاعات','عیب‌یابی ابتدایی سیستم','خدمت‌رسانی و ثبت مشکل مشتری','مرور و ارزیابی عملی زیر نظر استاد'],
carpentry:['شناخت انواع چوب و ابزار دستی','اندازه‌گیری و رسم نقشه','شناخت اتصال‌های ساده','تمرین نظری برش و ایمنی ابزار','طراحی یک چوکی ساده','پرداخت سطح و کنترل کیفیت','ارزیابی نمونه با استاد'],
cooking:['بهداشت فردی و پاکی محیط','شناخت مواد غذایی و نگهداری','مهارت‌های پایهٔ آماده‌سازی','پخت و کنترل حرارت','مصونیت غذایی و جلوگیری از آلودگی','محاسبهٔ مواد و هزینهٔ یک غذا','تهیهٔ یک غذای نمونه و ارزیابی']
};
$('#vocationalPlanBtn')?.addEventListener('click',()=>{
 const key=$('#vocationalPath')?.value||'solar',out=$('#vocationalPlanResult');
 if(!out)return;
 const names={solar:'نصب سیستم خورشیدی',mobile:'ترمیم موبایل',sewing:'خیاطی',computer:'ترمیم کمپیوتر',carpentry:'نجاری',cooking:'آشپزی'};
 out.innerHTML='<h3>برنامهٔ هفت‌روزه: '+names[key]+'</h3><ol>'+vocationalPlans[key].map(x=>'<li>'+x+'</li>').join('')+'</ol><p>این برنامهٔ مقدماتی پیشنهادی است؛ مدت و سطح آموزش را با استاد و معیارهای محلی تنظیم کنید.</p>';
});
renderVocationalCenter();


/* Mobile navigation uses one delegated handler for all menu buttons. */
document.addEventListener('click',function(event){
 const button=event.target&&event.target.closest?event.target.closest('#sidebar [data-page], [data-page].home-primary, [data-page].link-button'):null;
 if(!button)return;
 const target=button.dataset.page;
 if(!pages.includes(target)||!document.getElementById(target+'Page'))return;
 event.preventDefault();
 event.stopImmediatePropagation();
 showPage(target);
},true);


/* Support fund summary: local guidance only; no payment is processed here. */
const fundPrepareButton=$('#fundPrepare');
if(fundPrepareButton)fundPrepareButton.addEventListener('click',()=>{
 const purpose=document.querySelector('input[name="fundPurpose"]:checked')?.value||'platform';
 const amountInput=$('#fundAmount');
 const amountText=(amountInput?.value||'').trim();
 const amount=amountText===''?null:Number(amountText);
 const summary=$('#fundSummary');
 const labels={platform:'توسعه و ارتقای پلتفرم Afghan AI',families:'حمایت از خانواده‌های نیازمند',both:'حمایت از هر دو بخش'};
 if(amountText!==''&&(!Number.isFinite(amount)||amount<=0||!Number.isInteger(amount))){
  summary.textContent='لطفاً مبلغ معتبر و مثبت را به افغانی وارد کنید.';
  return;
 }
 const money=amount===null?'مبلغ هنوز تعیین نشده است.':new Intl.NumberFormat('fa-AF').format(amount)+' افغانی';
 summary.textContent='مقصد کمک: '+labels[purpose]+'. مبلغ پیشنهادی: '+money+' این خلاصه فقط راهنما است؛ پرداخت یا ثبت تراکنش انجام نمی‌شود.';
});

/* Support fund pilot workflow: local-only demonstration; never represents real payments or approvals. */
(function(){
 const appForm=$('#fundApplicationForm'),conForm=$('#fundContributionForm'),list=$('#fundDemoRecords');
 if(!appForm||!conForm||!list||appForm.dataset.ready==='true')return;
 appForm.dataset.ready='true';
 const key='afghanai-fund-pilot-demo-v1';
 const read=()=>safeStorageJSON(key,{applications:[],contributions:[]});
 const write=data=>safeStorageSet(key,JSON.stringify(data));
 const node=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=String(txt);return el;};
 const render=()=>{
  const data=read();list.replaceChildren();
  if(!data.applications.length&&!data.contributions.length){list.append(node('p','', 'هنوز دادهٔ آزمایشی ثبت نشده است.'));return;}
  data.applications.forEach((item,index)=>{
   const card=node('article','fund-demo-row');card.append(node('b','','درخواست '+item.id+' — '+item.province));
   card.append(node('p','',item.category+' | وضعیت: '+item.status));
   card.append(node('p','',item.need));
   const select=node('select','');['در انتظار بررسی','نیازمند معلومات بیشتر','واجد شرایط در بررسی آزمایشی','ردشده در آزمایش','بسته‌شده'].forEach(s=>{const o=node('option','',s);o.value=s;if(s===item.status)o.selected=true;select.append(o);});
   select.setAttribute('aria-label','تغییر وضعیت آزمایشی درخواست');
   select.addEventListener('change',()=>{const d=read();d.applications[index].status=select.value;write(d);render();});
   card.append(select);list.append(card);
  });
  data.contributions.forEach((item,index)=>{
   const card=node('article','fund-demo-row');card.append(node('b','','تعهد آزمایشی '+item.id+' — '+item.purpose));
   card.append(node('p','',new Intl.NumberFormat('fa-AF').format(item.amount)+' افغانی | وضعیت: '+item.status));
   const select=node('select','');['تعهد ثبت‌شده (آزمایشی)','مدرک دریافت ارائه نشده','برای بررسی مستقل علامت‌گذاری شد','لغوشده'].forEach(s=>{const o=node('option','',s);o.value=s;if(s===item.status)o.selected=true;select.append(o);});
   select.setAttribute('aria-label','تغییر وضعیت آزمایشی تعهد');
   select.addEventListener('change',()=>{const d=read();d.contributions[index].status=select.value;write(d);render();});
   card.append(select);list.append(card);
  });
 };
 appForm.addEventListener('submit',event=>{
  event.preventDefault();if(!appForm.reportValidity())return;
  const d=read();const id='A-'+String(Date.now()).slice(-7);
  d.applications.push({id,alias:$('#fundApplicantAlias').value.trim(),province:$('#fundApplicantProvince').value,category:$('#fundApplicantCategory').value,need:$('#fundApplicantNeed').value.trim(),status:'در انتظار بررسی'});
  write(d);appForm.reset();$('#fundApplicationStatus').textContent='درخواست آزمایشی '+id+' در همین مرورگر ثبت شد؛ کمک تأیید نشده است.';render();
 });
 conForm.addEventListener('submit',event=>{
  event.preventDefault();if(!conForm.reportValidity())return;
  const amount=Number($('#fundContributionAmount').value);if(!Number.isSafeInteger(amount)||amount<=0){$('#fundContributionStatus').textContent='مبلغ معتبر و مثبت وارد کنید.';return;}
  const d=read();const id='C-'+String(Date.now()).slice(-7);
  d.contributions.push({id,purpose:$('#fundContributionPurpose').value,amount,reference:$('#fundContributionRef').value.trim(),status:'تعهد ثبت‌شده (آزمایشی)'});
  write(d);conForm.reset();$('#fundContributionStatus').textContent='تعهد آزمایشی '+id+' ثبت شد؛ این ثبت، دریافت پول یا رسید پرداخت نیست.';render();
 });
 $('#fundClearDemo')?.addEventListener('click',()=>{if(!window.confirm('تمام داده‌های آزمایشی این صندوق از همین مرورگر پاک شود؟'))return;safeStorageRemove(key);render();$('#fundApplicationStatus').textContent='داده‌های آزمایشی محلی پاک شد.';$('#fundContributionStatus').textContent='داده‌های آزمایشی محلی پاک شد.';});
 $('#fundExportDemo')?.addEventListener('click',()=>{
  const d=read(),rows=[['نوع','شناسه','ولایت/مقصد','شرح/مبلغ','وضعیت'],...d.applications.map(x=>['درخواست',x.id,x.province,x.category+' — '+x.need,x.status]),...d.contributions.map(x=>['تعهد آزمایشی',x.id,x.purpose,String(x.amount)+' AFN',x.status])];
  const csv='\\ufeff'+rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\\r\\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='afghan-ai-fund-pilot-demo.csv';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
 });


 /* Financial ledger pilot: distinct stages, local-only synthetic records. */
 const ledgerKey='afghanai-fund-ledger-demo-v1';
 const ledgerForm=$('#fundLedgerForm'),ledgerRecords=$('#ledgerRecords');
 const allowedLedgerTypes=new Set(['planned','received','allocated','disbursed','reconciled']);
 const cleanLedgerText=(value,max)=>typeof value==='string'?value.slice(0,max):'';
 const isValidLedgerDate=value=>{
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const [year,month,day]=value.split('-').map(Number);
  if(year<1900||month<1||month>12||day<1)return false;
  const date=new Date(Date.UTC(year,month-1,day));
  return date.getUTCFullYear()===year&&date.getUTCMonth()===month-1&&date.getUTCDate()===day;
 };
 // Treat browser storage as untrusted: ignore malformed or tampered demo records.
 const readLedger=()=>{
  const value=safeStorageJSON(ledgerKey,[]);if(!Array.isArray(value))return [];
  return value.filter(item=>item&&typeof item==='object'&&!Array.isArray(item)&&allowedLedgerTypes.has(item.type)&&typeof item.id==='string'&&item.id.length<=40&&Number.isSafeInteger(item.amount)&&item.amount>0&&isValidLedgerDate(item.date))
   .map(item=>({id:item.id,type:item.type,label:cleanLedgerText(item.label,100),category:cleanLedgerText(item.category,100),amount:item.amount,date:item.date,reference:cleanLedgerText(item.reference,120),note:cleanLedgerText(item.note,500),createdAt:cleanLedgerText(item.createdAt,40)}));
 };
 const moneyAFN=value=>new Intl.NumberFormat('fa-AF',{maximumFractionDigits:0}).format(Math.max(0,Number(value)||0));
 const ledgerTotals=()=>{
  const items=readLedger(),sum=type=>items.filter(x=>x.type===type).reduce((n,x)=>n+(Number.isSafeInteger(Number(x.amount))&&Number(x.amount)>0?Number(x.amount):0),0);
  return {planned:sum('planned'),received:sum('received'),allocated:sum('allocated'),disbursed:sum('disbursed'),reconciled:sum('reconciled')};
 };
 const refreshLedger=()=>{
  const t=ledgerTotals(),v={ledgerPlanned:t.planned,ledgerReceived:t.received,ledgerAllocated:t.allocated,ledgerDisbursed:t.disbursed,ledgerReconciled:t.reconciled,ledgerCash:t.received-t.disbursed,ledgerUnallocated:t.received-t.allocated,ledgerUnpaid:t.allocated-t.disbursed,ledgerPending:t.disbursed-t.reconciled};
  Object.entries(v).forEach(([id,n])=>{const el=document.getElementById(id);if(el)el.textContent=moneyAFN(n);});
  if(ledgerRecords){ledgerRecords.replaceChildren();const items=readLedger().slice().reverse();if(!items.length)ledgerRecords.append(node('p','','هنوز رویداد مالی آزمایشی ثبت نشده است.'));
   items.forEach(item=>{const row=node('article','fund-demo-row');row.append(node('b','',item.label+' — '+item.category));row.append(node('p','',moneyAFN(item.amount)+' افغانی | '+item.date+' | '+item.id));if(item.reference)row.append(node('small','', 'مرجع: '+item.reference));if(item.note)row.append(node('small','',item.note));ledgerRecords.append(row);});
  }
 };
 const ledgerLabels={planned:'بودجهٔ برنامه‌ریزی‌شده',received:'دریافت وجه (آزمایشی)',allocated:'تخصیص بودجه',disbursed:'پرداخت / مصرف وجه',reconciled:'تطبیق و تأیید سند'};
 ledgerForm?.addEventListener('submit',event=>{
  event.preventDefault();if(!ledgerForm.reportValidity())return;
  const type=$('#ledgerType').value,amount=Number($('#ledgerAmount').value),totals=ledgerTotals();
  if(!Number.isSafeInteger(amount)||amount<=0){$('#ledgerStatus').textContent='مبلغ باید عدد صحیح، مثبت و معتبر باشد.';return;}
  const limits={allocated:totals.received-totals.allocated,disbursed:totals.allocated-totals.disbursed,reconciled:totals.disbursed-totals.reconciled};
  if(Object.prototype.hasOwnProperty.call(limits,type)&&amount>limits[type]){
   const names={allocated:'وجه دریافت‌شدهٔ تخصیص‌نیافته',disbursed:'تخصیص پرداخت‌نشده',reconciled:'پرداختِ در انتظار تطبیق'};
   $('#ledgerStatus').textContent='ثبت نشد: مبلغ از '+names[type]+' ('+moneyAFN(limits[type])+' افغانی) بیشتر است. ابتدا مرحلهٔ قبلی را ثبت کنید.';return;
  }
  const items=readLedger(),id='L-'+String(Date.now()).slice(-8);
  items.push({id,type,label:ledgerLabels[type],category:$('#ledgerCategory').value,amount,date:$('#ledgerDate').value,reference:$('#ledgerReference').value.trim(),note:$('#ledgerNote').value.trim(),createdAt:new Date().toISOString()});
  if(!safeStorageSet(ledgerKey,JSON.stringify(items))){$('#ledgerStatus').textContent='ذخیره‌سازی ممکن نشد؛ فضای مرورگر را بررسی کنید.';return;}
  ledgerForm.reset();$('#ledgerDate').value=new Date().toISOString().slice(0,10);$('#ledgerStatus').textContent='رویداد آزمایشی '+id+' در همین مرورگر ثبت شد؛ سند یا تراکنش واقعی ایجاد نشده است.';refreshLedger();refreshFundDashboard();
 });
 $('#ledgerClear')?.addEventListener('click',()=>{if(!window.confirm('تمام رویدادهای دفتر مالی آزمایشی از همین مرورگر پاک شود؟'))return;safeStorageRemove(ledgerKey);$('#ledgerStatus').textContent='دفتر مالی آزمایشی محلی پاک شد.';refreshLedger();refreshFundDashboard();});
 $('#ledgerExport')?.addEventListener('click',()=>{
  const rows=[['شناسه','نوع رویداد','بخش برنامه','مبلغ AFN','تاریخ','کد مرجع','یادداشت'],...readLedger().map(x=>[x.id,x.label,x.category,x.amount,x.date,x.reference,x.note])];
  const csv='\ufeff'+rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),link=node('a');link.href=url;link.download='afghan-ai-fund-ledger-demo.csv';document.body.append(link);link.click();link.remove();URL.revokeObjectURL(url);
 });
 const ledgerDateInput=$('#ledgerDate');if(ledgerDateInput&&!ledgerDateInput.value)ledgerDateInput.value=new Date().toISOString().slice(0,10);
 refreshLedger();

 const roleSelect=$('#fundRolePreview'),roleDescription=$('#fundRoleDescription'),roleMatrix=$('#fundRoleMatrix');
 const roleData={
  director:{title:'مدیر صندوق',desc:'نظارت بر برنامه، مشاهدهٔ گزارش‌های کلان و ارجاع موضوعات برای بررسی؛ بدون اختیار انفرادی برای پرداخت یا تغییر اسناد حسابرسی.',permissions:[['مشاهدهٔ داشبورد کلان','مجاز'],['تخصیص و تصویب بودجه در چارچوب مصوبه','با تأیید جمعی'],['تغییر نتیجهٔ ارزیابی فردی','غیرمجاز'],['اجرای پرداخت','غیرمجاز'],['مشاهدهٔ اسناد حساس هویتی','غیرمجاز']]},
  reviewer:{title:'مسئول بررسی درخواست‌ها',desc:'بررسی معیارها، ثبت یادداشت و پیشنهاد وضعیت؛ تصمیم نهایی باید طبق پالیسی و با بازبینی مستقل انجام شود.',permissions:[['مشاهدهٔ درخواست‌های تخصیص‌یافته','مجاز'],['ثبت ارزیابی و پیشنهاد','مجاز'],['تصویب نهایی کمک','غیرمجاز'],['مشاهدهٔ حساب‌های بانکی','غیرمجاز'],['اجرای پرداخت','غیرمجاز']]},
  finance:{title:'مسئول مالی',desc:'ثبت اسناد مالی، تطبیق صورت‌حساب و آماده‌سازی پرداخت؛ آزادسازی پرداخت نیازمند تأیید جداگانه و ثبت شواهد است.',permissions:[['مشاهدهٔ دفتر مالی','مجاز'],['ثبت رسید و سند مالی','مجاز'],['تغییر نتیجهٔ انتخاب مستفیدشونده','غیرمجاز'],['آزادسازی انفرادی پرداخت','غیرمجاز'],['تطبیق مستقل حساب خود','غیرمجاز']]},
  auditor:{title:'حسابرس مستقل',desc:'دسترسی فقط‌خواندنی به اسناد لازم، لاگ تغییرناپذیر و نمونه‌گیری؛ بدون امکان تغییر رکورد یا اجرای پرداخت.',permissions:[['مشاهدهٔ اسناد و گزارش‌های مجاز','فقط‌خواندنی'],['بررسی لاگ و شواهد','مجاز'],['ویرایش درخواست یا دفتر مالی','غیرمجاز'],['اجرای پرداخت','غیرمجاز'],['حذف سوابق','غیرمجاز']]},
  support:{title:'مسئول پذیرش و راهنمایی',desc:'راهنمایی متقاضی، بررسی کامل‌بودن فورم و ارجاع امن؛ دسترسی به جزئیات حساس باید حداقلی باشد.',permissions:[['ثبت اولیه و شمارهٔ پیگیری','مجاز'],['مشاهدهٔ وضعیت عمومی پرونده','مجاز'],['تصمیم دربارهٔ استحقاق','غیرمجاز'],['مشاهدهٔ اسناد صحی/هویتی','غیرمجاز'],['اجرای پرداخت','غیرمجاز']]}
 };
 const renderRole=()=>{
  if(!roleSelect||!roleMatrix||!roleDescription)return;
  const role=roleData[roleSelect.value]||roleData.support;roleDescription.replaceChildren();
  const heading=document.createElement('b');heading.textContent=role.title;const para=document.createElement('p');para.textContent=role.desc;roleDescription.append(heading,para);
  roleMatrix.replaceChildren();const table=document.createElement('table');table.className='fund-role-table';
  const head=document.createElement('tr');['صلاحیت','سطح دسترسی'].forEach(t=>{const th=document.createElement('th');th.textContent=t;head.append(th);});table.append(head);
  role.permissions.forEach(pair=>{const tr=document.createElement('tr');pair.forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;if(i===1)td.dataset.access=v;tr.append(td);});table.append(tr);});
  roleMatrix.append(table);
 };
 roleSelect?.addEventListener('change',renderRole);renderRole();

 /* Complaints and appeals pilot: local-only synthetic workflow, not a real reporting channel. */
 const complaintForm=$('#fundComplaintForm'),complaintList=$('#fundComplaintRecords');
 const complaintKey='afghanai-fund-complaints-demo-v1';
 const readComplaints=()=>safeStorageJSON(complaintKey,[]);
 const writeComplaints=items=>safeStorageSet(complaintKey,JSON.stringify(items));
 const renderComplaints=()=>{
  if(!complaintList)return;const items=readComplaints();complaintList.replaceChildren();
  if(!items.length){complaintList.append(node('p','','هنوز شکایت آزمایشی ثبت نشده است.'));return;}
  items.forEach((item,index)=>{
   const card=node('article','fund-demo-row');card.append(node('b','','پروندهٔ آزمایشی '+item.id+' — '+item.type));
   card.append(node('p','',item.channel+' | ثبت: '+item.date));card.append(node('p','',item.description));
   const status=node('select','');
   ['دریافت آزمایشی','در انتظار بررسی مستقل','نیازمند معلومات غیرحساس بیشتر','ارجاع‌شده برای بازبینی','رسیدگی آزمایشی تکمیل شد','بسته‌شده در آزمایش'].forEach(value=>{const option=node('option','',value);option.value=value;if(value===item.status)option.selected=true;status.append(option);});
   status.setAttribute('aria-label','تغییر وضعیت آزمایشی شکایت');
   status.addEventListener('change',()=>{const current=readComplaints();current[index].status=status.value;current[index].updated=new Date().toISOString().slice(0,10);writeComplaints(current);renderComplaints();});
   card.append(status);card.append(node('small','', 'وضعیت: '+item.status));complaintList.append(card);
  });
 };
 complaintForm?.addEventListener('submit',event=>{
  event.preventDefault();if(!complaintForm.reportValidity())return;
  const items=readComplaints(),id='G-'+String(Date.now()).slice(-7);
  items.push({id,type:$('#fundComplaintType').value,channel:$('#fundComplaintChannel').value,description:$('#fundComplaintText').value.trim(),date:new Date().toISOString().slice(0,10),status:'دریافت آزمایشی'});
  writeComplaints(items);complaintForm.reset();$('#fundComplaintStatus').textContent='شکایت آزمایشی '+id+' فقط در همین مرورگر ثبت شد و به مرجع واقعی نرسیده است.';renderComplaints();
 });
 $('#fundComplaintExport')?.addEventListener('click',()=>{
  const rows=[['شناسه','موضوع','درخواست رسیدگی','شرح عمومی','تاریخ','وضعیت'],...readComplaints().map(x=>[x.id,x.type,x.channel,x.description,x.date,x.status])];
  const csv='\ufeff'+rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='afghan-ai-complaints-demo.csv';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
 });
 $('#fundComplaintClear')?.addEventListener('click',()=>{if(!window.confirm('تمام شکایات آزمایشی ذخیره‌شده در همین مرورگر پاک شود؟'))return;safeStorageRemove(complaintKey);renderComplaints();$('#fundComplaintStatus').textContent='داده‌های آزمایشی شکایات پاک شد.';});
 renderComplaints();

 const fundDashboardRead=key=>safeStorageJSON(key,null);
 const paintStates=(target,items)=>{
  const box=$(target);if(!box)return;box.replaceChildren();
  const counts={};items.forEach(item=>{const state=String(item.status||'نامشخص');counts[state]=(counts[state]||0)+1;});
  if(!Object.keys(counts).length){box.append(node('p','','هنوز داده‌ای ثبت نشده است.'));return;}
  Object.entries(counts).forEach(([state,count])=>{const row=node('p','fund-state-row');row.append(node('span','',state),node('b','',new Intl.NumberFormat('fa-AF').format(count)));box.append(row);});
 };
 const refreshFundDashboard=()=>{
  const pilot=fundDashboardRead('afghanai-fund-pilot-demo-v1')||{applications:[],contributions:[]};
  const complaints=fundDashboardRead(complaintKey)||[];
  const applications=Array.isArray(pilot.applications)?pilot.applications:[];
  const contributions=Array.isArray(pilot.contributions)?pilot.contributions:[];
  const safeComplaints=Array.isArray(complaints)?complaints:[];
  const pledged=contributions.reduce((sum,item)=>sum+(Number.isFinite(Number(item.amount))?Number(item.amount):0),0);
  const closed=new Set(['رسیدگی آزمایشی تکمیل شد','بسته‌شده در آزمایش']);
  const values={
   fundKpiApplications:applications.length,fundKpiPledges:contributions.length,
   fundKpiAmount:new Intl.NumberFormat('fa-AF',{maximumFractionDigits:0}).format(pledged),
   fundKpiComplaints:safeComplaints.length,
   fundKpiOpen:safeComplaints.filter(item=>!closed.has(item.status)).length
  };
  Object.entries(values).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=new Intl.NumberFormat('fa-AF').format(value);});
  paintStates('#fundKpiApplicationStates',applications);
  paintStates('#fundKpiComplaintStates',safeComplaints);
  const updated=$('#fundDashboardUpdated');if(updated)updated.textContent='آخرین تازه‌سازی: '+new Date().toLocaleString('fa-AF')+' | فقط داده‌های محلی آزمایشی';
 };
 $('#fundDashboardRefresh')?.addEventListener('click',refreshFundDashboard);
 refreshFundDashboard();
 render();
})();
 /* Mark the main app ready so the emergency navigation fallback never blocks normal renderers. */
window.__afghanAiAppReady=true;

/* Career pathway helper: transparent static guidance, not live vacancies. */
(function(){
 const form=$('#careerForm'),out=$('#careerPlan');if(!form||form.dataset.ready==='true')return;form.dataset.ready='true';
 const plans={
 technology:['آموزش مبانی کمپیوتر و سواد دیجیتال','یادگیری یک زبان برنامه‌نویسی یا مهارت مشخص مانند طراحی وب','ساخت ۲ تا ۳ پروژهٔ نمونه و ثبت آن‌ها در نمونه‌کار','تمرین مصاحبه، ارتباطات و جست‌وجوی فرصت‌های معتبر'],
 health:['تقویت علوم پایه و اصطلاحات طبی','پیگیری آموزش رسمی و معتبر متناسب با صلاحیت قانونی','تمرین اصول اخلاق، مصونیت و ارتباط با مراجعین','بررسی شرایط قانونی کار و اسناد لازم در محل فعالیت'],
 agriculture:['آموزش خاک، آب و شیوه‌های پایدار کشت','یادگیری روش‌های آبیاری مؤثر و مدیریت محصول','اجرای آزمایش کوچک و ثبت نتیجه‌ها','بررسی بازار محلی و هزینه/فایدهٔ تولید'],
 business:['آموزش حسابداری ساده و مدیریت مالی','بررسی نیاز مشتری و مطالعهٔ بازار','تهیهٔ طرح تجارتی کوچک و محاسبهٔ هزینه‌ها','آزمایش محدود ایده و اصلاح بر اساس بازخورد'],
 engineering:['تقویت ریاضی، فزیک و نقشه‌خوانی','انتخاب یک مهارت فنی و آموزش زیر نظر استاد واجد صلاحیت','ساخت نمونه‌کار و رعایت معیارهای ایمنی','تهیهٔ رزومه و بررسی مجوزهای لازم'],
 education:['تقویت زبان و مهارت تدریس','یادگیری طراحی درس و ارزیابی شاگردان','تهیهٔ نمونه‌درس و تمرین تدریس','بررسی شرایط مراکز آموزشی و ادامهٔ تحصیل']
 };
 const labels={technology:'تکنالوژی و کمپیوتر',health:'صحت و خدمات طبی',agriculture:'زراعت و محیط زیست',business:'تجارت و کارآفرینی',engineering:'انجنیری و مهارت‌های فنی',education:'آموزش و زبان‌ها'};
 form.addEventListener('submit',e=>{e.preventDefault();const field=$('#careerField').value,level=$('#careerLevel').value,goal=$('#careerGoal').value;const steps=plans[field]||plans.technology;out.innerHTML='<h3>'+labels[field]+'</h3><p><b>سطح فعلی:</b> '+level+' • <b>هدف:</b> '+goal+'</p><ol>'+steps.map(x=>'<li>'+x+'</li>').join('')+'</ol><p><b>گام نخست:</b> یک برنامهٔ هفتگی واقع‌بینانه تنظیم کنید و پیشرفت خود را ثبت نمایید.</p><p>پیش از پرداخت پول یا فرستادن اسناد شخصی برای هر فرصت، اعتبار نهاد و شرایط رسمی آن را مستقل بررسی کنید.</p>';});
})();
/* Innovation lab: local project framework only; no remote AI or submission. */
(function(){
 const form=$('#innovationForm'),plan=$('#innovationPlan'),list=$('#innovationSavedList'),status=$('#innovationStatus');
 if(!form||form.dataset.ready==='true')return;form.dataset.ready='true';
 const key='afghanai-innovation-projects-v1';
 const read=()=>{const items=safeStorageJSON(key,[]);return Array.isArray(items)?items.filter(x=>x&&typeof x==='object'&&typeof x.title==='string'&&typeof x.problem==='string'&&typeof x.solution==='string').slice(-30):[]};
 const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const render=()=>{if(!list)return;const items=read();list.innerHTML=items.length?items.slice().reverse().map(item=>'<article class="info-card" style="margin-top:10px"><b>'+esc(item.title)+'</b><p>'+esc(item.category)+' • '+esc(item.date)+'</p><p>'+esc(item.problem)+'</p></article>').join(''):'<p class="publication-hint">هنوز طرحی ذخیره نشده است.</p>';};
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const item={category:$('#innovationCategory').value,title:$('#innovationTitle').value.trim(),problem:$('#innovationProblem').value.trim(),solution:$('#innovationSolution').value.trim(),beneficiaries:$('#innovationBeneficiaries').value.trim(),resources:$('#innovationResources').value.trim(),date:new Intl.DateTimeFormat('fa-AF').format(new Date())};
  if(!item.title||!item.problem||!item.solution){if(status)status.textContent='لطفاً نام طرح، مشکل و راه‌حل را تکمیل کنید.';return;}
  const items=read();items.push(item);
  if(!safeStorageSet(key,JSON.stringify(items))){if(status)status.textContent='ذخیره‌سازی ممکن نشد؛ فضای مرورگر را بررسی کنید.';return;}
  if(plan)plan.innerHTML='<h3>'+esc(item.title)+'</h3><p><b>حوزه:</b> '+esc(item.category)+'</p><p><b>مشکل:</b> '+esc(item.problem)+'</p><p><b>راه‌حل:</b> '+esc(item.solution)+'</p><p><b>بهره‌مندان:</b> '+esc(item.beneficiaries||'در مرحلهٔ طراحی مشخص شود')+'</p><h3>مراحل پیشنهادی</h3><ol><li>بررسی میدانی مشکل و گفت‌وگو با بهره‌مندان</li><li>ساخت نمونهٔ ابتدایی و آزمایش محدود</li><li>ارزیابی هزینه، دسترسی و اثرگذاری</li><li>اصلاح طرح و گسترش تدریجی در صورت موفقیت</li></ol><h3>شاخص‌های سنجش</h3><ul><li>تعداد افراد بهره‌مند</li><li>هزینه به ازای هر بهره‌مند</li><li>میزان بهبود مشکل در دورهٔ آزمایشی</li></ul><h3>خطرهای قابل بررسی</h3><p>کمبود بودجه، دسترسی محدود، نگهداری، امنیت و حفظ حریم خصوصی؛ پیش از اجرا برای هر مورد راهکار مشخص کنید.</p><p><b>منابع مورد نیاز:</b> '+esc(item.resources||'پس از ارزیابی میدانی تعیین شود')+'</p>';
  form.reset();if(status)status.textContent='طرح در همین دستگاه ذخیره شد. این چارچوب یک پیش‌نویس است و نیاز به بررسی میدانی و مالی دارد.';render();
 });
 render();
})();
/* Feature ideas: saved locally only; no remote submission is implied. */
(function(){
 const form=$('#featureIdeaForm'),list=$('#featureIdeaList'),status=$('#featureIdeaStatus');
 if(!form||form.dataset.ready==='true')return;
 form.dataset.ready='true';
 const key='afghanai-feature-ideas-v1';
 const read=()=>safeStorageJSON(key,[]);
 const render=()=>{
  if(!list)return;
  const items=read();
  list.innerHTML=items.length?items.slice().reverse().map(item=>'<article class="info-card" style="margin-top:12px"><b>'+escapeIdeaText(item.title)+'</b><p>'+escapeIdeaText(item.category)+' • '+escapeIdeaText(item.date)+'</p><p>'+escapeIdeaText(item.details)+'</p></article>').join(''):'<p class="publication-hint">هنوز پیشنهادی ثبت نشده است.</p>';
 };
 function escapeIdeaText(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const category=$('#featureIdeaCategory')?.value||'سایر';
  const title=$('#featureIdeaTitle')?.value.trim()||'';
  const details=$('#featureIdeaDetails')?.value.trim()||'';
  if(!title||!details){if(status)status.textContent='لطفاً عنوان و شرح پیشنهاد را تکمیل کنید.';return;}
  const items=read();
  items.push({category,title,details,date:new Intl.DateTimeFormat('fa-AF').format(new Date())});
  if(!safeStorageSet(key,JSON.stringify(items))){if(status)status.textContent='ذخیره‌سازی ممکن نشد؛ فضای مرورگر را بررسی کنید.';return;}
  form.reset();
  if(status)status.textContent='پیشنهاد در همین دستگاه ذخیره شد؛ هنوز به مدیریت ارسال نشده است.';
  render();
 });
 render();
})();


/* Browser-side security diagnostics. Server protections are reported as unavailable, never inferred. */
(function(){
 const runButton=document.getElementById('securityRunScan');
 if(!runButton||runButton.dataset.ready==='true')return;
 runButton.dataset.ready='true';
 const status=document.getElementById('securityScanStatus');
 const last=document.getElementById('securityLastScan');
 const passed=document.getElementById('securityPassed');
 const attention=document.getElementById('securityAttention');
 const setResult=(key,label,ok)=>{
  const target=document.querySelector('[data-check="'+key+'"]');
  if(target){target.textContent=label;target.dataset.status=ok?'pass':'attention';}
 };
 runButton.addEventListener('click',()=>{
  let good=0,needs=0;
  const record=(key,label,ok)=>{setResult(key,label,ok);if(ok)good++;else needs++;};
  record('https',location.protocol==='https:'?'HTTPS فعال':'اتصال HTTPS نیست',location.protocol==='https:');
  const workerReady='serviceWorker'in navigator;
  record('worker',workerReady?'Service Worker پشتیبانی می‌شود':'Service Worker پشتیبانی نمی‌شود',workerReady);
  const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);
  const duplicateIds=ids.filter((id,index)=>ids.indexOf(id)!==index);
  record('ids',duplicateIds.length?'شناسهٔ تکراری: '+[...new Set(duplicateIds)].join('، '):'شناسهٔ تکراری پیدا نشد',duplicateIds.length===0);
  const brokenRoutes=[...document.querySelectorAll('[data-page]')].map(el=>el.dataset.page).filter(name=>!document.getElementById(name+'Page'));
  record('routes',brokenRoutes.length?'مسیر نامعتبر: '+[...new Set(brokenRoutes)].join('، '):'مسیرهای منو معتبر است',brokenRoutes.length===0);
  let storageOK=false;
  try{const key='afghanai-security-self-test';localStorage.setItem(key,'ok');storageOK=localStorage.getItem(key)==='ok';localStorage.removeItem(key);}catch(error){storageOK=false;}
  record('storage',storageOK?'ذخیره‌سازی آزمایشی موفق':'ذخیره‌سازی در دسترس نیست',storageOK);
  setResult('server','نیازمند تنظیمات و آزمون سمت سرور',false);
  needs++;
  if(last)last.textContent=new Intl.DateTimeFormat('fa-AF',{dateStyle:'medium',timeStyle:'short'}).format(new Date());
  if(passed)passed.textContent=String(good);
  if(attention)attention.textContent=String(needs);
  if(status)status.textContent='بررسی تکمیل شد: '+good+' موفق؛ '+needs+' مورد نیازمند توجه. بررسی مرورگر جایگزین آزمون امنیت سرور نیست.';
 });
})();


/* Afghan AI Travel Guide: curated static destination notes and planning prompts; no live safety or booking data. */
(function(){
 const destinations=[
  {name:'بند امیر',province:'بامیان',category:'nature',icon:'🏞️',summary:'مجموعه‌ای از دریاچه‌های طبیعی و چشم‌اندازهای کوهستانی در پارک ملی بند امیر.',season:'فصل و شرایط دسترسی را پیش از حرکت بررسی کنید.',note:'حفاظت از آب و محیط طبیعی و رعایت مقررات پارک مهم است.'},
  {name:'درهٔ بامیان',province:'بامیان',category:'history',icon:'🏛️',summary:'منطقه‌ای با میراث باستانی، چشم‌اندازهای تاریخی و آثار فرهنگی شناخته‌شده.',season:'بازدید از محوطه‌ها تابع مقررات و وضعیت محلی است.',note:'به آثار تاریخی دست نزنید و از مقررات میراث فرهنگی پیروی کنید.'},
  {name:'شهر کهنه و ارگ هرات',province:'هرات',category:'history',icon:'🕌',summary:'بافت تاریخی هرات و ارگ آن از نمادهای مهم معماری و تاریخ منطقه‌اند.',season:'ساعت بازدید و امکان ورود را از مرجع محلی تأیید کنید.',note:'برای عکاسی در اماکن مذهبی یا خصوصی اجازه بگیرید.'},
  {name:'مسجد جامع هرات',province:'هرات',category:'history',icon:'🕌',summary:'بنای شاخص معماری اسلامی با کاشی‌کاری و پیشینهٔ تاریخی ارزشمند.',season:'مقررات و زمان مناسب بازدید را پیشاپیش بپرسید.',note:'پوشش و رفتار محترمانه و رعایت زمان عبادت ضروری است.'},
  {name:'مزارشریف و روضهٔ مبارک',province:'بلخ',category:'history',icon:'✨',summary:'یکی از شناخته‌شده‌ترین مجموعه‌های مذهبی و معماری افغانستان.',season:'شرایط ورود و مقررات محلی ممکن است تغییر کند.',note:'به فضای مذهبی، زائران و مقررات محل احترام بگذارید.'},
  {name:'کابل و باغ بابر',province:'کابل',category:'city',icon:'🌳',summary:'پایتخت افغانستان با لایه‌های تاریخی، بازارها و باغ تاریخی بابر.',season:'وضعیت دسترسی و ساعت بازدید را محلی بررسی کنید.',note:'برای جابه‌جایی شهری از مسیرها و خدمات معتبر استفاده کنید.'},
  {name:'درهٔ پنجشیر',province:'پنجشیر',category:'nature',icon:'⛰️',summary:'دره‌ای کوهستانی با رودخانه و چشم‌اندازهای طبیعی چشمگیر.',season:'شرایط آب‌وهوا، سیلاب و وضعیت سرک را پیش از حرکت بررسی کنید.',note:'برای مسیرهای کوهستانی آمادگی، راهنمای محلی و برنامهٔ اضطراری داشته باشید.'},
  {name:'دهلیز واخان',province:'بدخشان',category:'nature',icon:'🏔️',summary:'منطقه‌ای دوردست با مناظر بلندکوهستانی و تنوع طبیعی ویژه.',season:'سفر دشوار و وابسته به فصل، مجوزها و شرایط مسیر است.',note:'بدون بررسی مجوز، وضعیت امنیتی، تجهیزات و راهنمای مجرب سفر نکنید.'},
  {name:'منار جام',province:'غور',category:'history',icon:'🗼',summary:'اثر معماری تاریخی برجسته در درهٔ رود هریرود و میراث جهانی.',season:'دسترسی دورافتاده است؛ مسیر و شرایط محلی را حتماً تأیید کنید.',note:'از آسیب‌رساندن به بنا و محیط اطراف خودداری کنید.'},
  {name:'درهٔ ارغنداب',province:'قندهار',category:'nature',icon:'🌿',summary:'چشم‌اندازهای رودخانه‌ای و باغداری در پیرامون حوزهٔ ارغنداب.',season:'شرایط مسیر و دسترسی محلی ممکن است متغیر باشد.',note:'پیش از ورود به زمین‌های خصوصی از مالک اجازه بگیرید.'}
 ];
 const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 window.renderTravelGuide=function(){
  const grid=$('#travelDestinationGrid');if(!grid)return;
  const q=($('#travelSearch')?.value||'').trim().toLocaleLowerCase();
  const province=$('#travelProvince')?.value||'all';
  const category=$('#travelCategory')?.value||'all';
  const items=destinations.filter(x=>(province==='all'||x.province===province)&&(category==='all'||x.category===category)&&[x.name,x.province,x.summary].some(v=>v.toLocaleLowerCase().includes(q)));
  grid.innerHTML=items.length?items.map(x=>'<article class="travel-destination"><span class="travel-destination-icon">'+x.icon+'</span><div class="travel-destination-meta">'+esc(x.province)+' • '+(x.category==='nature'?'طبیعت':x.category==='history'?'تاریخی و فرهنگی':'شهری')+'</div><h3>'+esc(x.name)+'</h3><p>'+esc(x.summary)+'</p><div class="travel-destination-note"><b>یادداشت سفر:</b> '+esc(x.season)+' '+esc(x.note)+'</div></article>').join(''):'<div class="empty-state">مقصدی با این مشخصات پیدا نشد؛ جستجو یا فیلتر را تغییر دهید.</div>';
 };
 const form=$('#travelPlanForm');
 if(form&&!form.dataset.ready){
  form.dataset.ready='true';
  form.addEventListener('submit',event=>{
   event.preventDefault();
   const destination=$('#travelPlanDestination').value,days=Number($('#travelPlanDays').value),style=$('#travelPlanStyle').value;
   const output=$('#travelPlanOutput');if(!output)return;
   const schedule=days===1?['پیش از حرکت: تأیید وضعیت مسیر و رفت‌وآمد','در طول روز: بازدید محدود از مقصد اصلی','پایان روز: بازگشت امن و بررسی وضعیت راه']:Array.from({length:days},(_,i)=>'روز '+(i+1)+': '+(i===0?'رسیدن، هماهنگی محل اقامت و آشنایی با محیط':i===days-1?'بازدید کوتاه، جمع‌بندی و بازگشت برنامه‌ریزی‌شده':'بازدید با زمان کافی، استراحت و بررسی شرایط روز'));
   output.innerHTML='<h3>'+esc(destination)+'</h3><p><b>مدت:</b> '+days+' روز • <b>سبک:</b> '+esc(style)+'</p><ol>'+schedule.map(esc).map(x=>'<li>'+x+'</li>').join('')+'</ol><p><b>هزینه:</b> قیمت زنده در دسترس نیست؛ ترانسپورت، اقامت، غذا، مجوزها و هزینهٔ اضطراری را پیش از سفر جداگانه استعلام کنید.</p><p><b>یادآوری:</b> این برنامه نمونه است، نه تأیید امنیت یا بازبودن مسیر. پیش از حرکت وضعیت روز را بررسی کنید.</p>';
  });
 }
 ['#travelSearch','#travelProvince','#travelCategory'].forEach(selector=>$(selector)?.addEventListener(selector==='#travelSearch'?'input':'change',window.renderTravelGuide));
 window.renderTravelGuide();
})();


/* Travel Guide localization layer: Dari, Pashto and English interface and destination summaries. */
(function(){
 const copy={
 fa:{travelTitle:'🧭 راهنمای سفر افغانستان',travelIntro:'با میراث تاریخی، طبیعت و فرهنگ ولایت‌های افغانستان آشنا شوید و برای سفر آگاهانه برنامه‌ریزی کنید.',travelSafetyTitle:'پیش از هر سفر، وضعیت را دوباره بررسی کنید',travelSafetyText:'این نسخه راهنمای معلوماتی آفلاین است؛ وضعیت امنیتی، مسیرها، ویزه، قیمت‌ها و خدمات را زنده تأیید نمی‌کند. پیش از حرکت از منابع رسمی و افراد معتبر محلی معلومات تازه بگیرید.',travelDestinationsTitle:'مقصدهای پیشنهادی',travelFilterHint:'برای یافتن مقصد، ولایت یا نوع جاذبه را انتخاب کنید.',travelSearchLabel:'جستجوی مقصد',travelProvinceLabel:'ولایت',travelCategoryLabel:'نوع جاذبه',travelPlannerTitle:'برنامه‌ریز ابتدایی سفر',travelPlannerHint:'یک برنامهٔ نمونه برای بررسی و تنظیم شخصی بسازید.',travelFormTitle:'مشخصات سفر',travelPlanDestinationLabel:'مقصد',travelPlanDaysLabel:'مدت سفر',travelPlanStyleLabel:'سبک سفر',travelPlanSubmit:'ساخت برنامهٔ نمونه',travelOutputTitle:'برنامهٔ پیشنهادی',travelDocsTitle:'اسناد و مقررات',travelTransportTitle:'حمل‌ونقل',travelStayTitle:'اقامت و خدمات',travelCultureTitle:'احترام به فرهنگ محلی',searchPlaceholder:'نام شهر، ولایت یا جاذبه...',allProvinces:'همهٔ ولایت‌ها',allCategories:'همهٔ دسته‌ها',nature:'طبیعت',history:'تاریخی و فرهنگی',city:'شهری',notFound:'مقصدی با این مشخصات پیدا نشد؛ جستجو یا فیلتر را تغییر دهید.',planPrompt:'مقصد و مدت سفر را انتخاب کنید تا یک چارچوب ابتدایی نمایش داده شود.',days:'روز',style:'سبک',duration:'مدت',livePrice:'قیمت زنده در دسترس نیست؛ هزینه‌ها را پیش از سفر جداگانه استعلام کنید.',travelWarning:'این برنامه نمونه است، نه تأیید امنیت یا بازبودن مسیر. پیش از حرکت وضعیت روز را بررسی کنید.'},
 ps:{travelTitle:'🧭 د افغانستان د سفر لارښود',travelIntro:'د افغانستان د ولایتونو له تاریخي میراث، طبیعت او کلتور سره بلد شئ او خپل سفر په پوهه پلان کړئ.',travelSafetyTitle:'له هر سفر مخکې حالت بیا وګورئ',travelSafetyText:'دا نسخه معلوماتي او آفلاین لارښود دی؛ امنیت، لارې، ویزې، بیې او خدمتونه په ژوندۍ بڼه نه تاییدوي. تر حرکت مخکې له رسمي سرچینو او باوري ځایي کسانو تازه معلومات واخلئ.',travelDestinationsTitle:'وړاندیز شوي ځایونه',travelFilterHint:'د ځای موندلو لپاره ولایت یا د جاذبې ډول وټاکئ.',travelSearchLabel:'د ځای لټون',travelProvinceLabel:'ولایت',travelCategoryLabel:'د جاذبې ډول',travelPlannerTitle:'د سفر لومړنی پلان',travelPlannerHint:'د کتنې او شخصي سمون لپاره نمونه‌ییز پلان جوړ کړئ.',travelFormTitle:'د سفر معلومات',travelPlanDestinationLabel:'موخه',travelPlanDaysLabel:'د سفر موده',travelPlanStyleLabel:'د سفر ډول',travelPlanSubmit:'نمونه‌ییز پلان جوړول',travelOutputTitle:'وړاندیز شوی پلان',travelDocsTitle:'اسناد او مقررات',travelTransportTitle:'ترانسپورټ',travelStayTitle:'استوګنځای او خدمتونه',travelCultureTitle:'ځايي کلتور ته درناوی',searchPlaceholder:'د ښار، ولایت یا ځای نوم...',allProvinces:'ټول ولایتونه',allCategories:'ټولې کټګورۍ',nature:'طبیعت',history:'تاریخي او کلتوري',city:'ښاري',notFound:'دا ډول ځای ونه موندل شو؛ لټون یا فلټر بدل کړئ.',planPrompt:'د سفر د لومړني پلان لپاره موخه او موده وټاکئ.',days:'ورځې',style:'ډول',duration:'موده',livePrice:'ژوندۍ بیې نشته؛ لګښتونه تر سفر مخکې جلا وپوښتئ.',travelWarning:'دا یوازې نمونه‌ییز پلان دی، د امنیت یا لارې د خلاصون تایید نه دی. د حرکت مخکې تازه حالت وګورئ.'},
 en:{travelTitle:'🧭 Afghanistan Travel Guide',travelIntro:'Discover Afghanistan’s heritage, landscapes and provincial cultures, and plan a more informed journey.',travelSafetyTitle:'Recheck conditions before every trip',travelSafetyText:'This is an offline information guide. It does not verify live security, road access, visas, prices or services. Check current information with official sources and trusted local contacts before departure.',travelDestinationsTitle:'Suggested destinations',travelFilterHint:'Choose a province or attraction type, or search for a destination.',travelSearchLabel:'Search destinations',travelProvinceLabel:'Province',travelCategoryLabel:'Attraction type',travelPlannerTitle:'Basic trip planner',travelPlannerHint:'Create a sample itinerary to review and customize.',travelFormTitle:'Trip details',travelPlanDestinationLabel:'Destination',travelPlanDaysLabel:'Trip duration',travelPlanStyleLabel:'Travel style',travelPlanSubmit:'Create sample itinerary',travelOutputTitle:'Suggested itinerary',travelDocsTitle:'Documents & regulations',travelTransportTitle:'Transportation',travelStayTitle:'Accommodation & services',travelCultureTitle:'Respect local culture',searchPlaceholder:'City, province or attraction...',allProvinces:'All provinces',allCategories:'All categories',nature:'Nature',history:'Historical & cultural',city:'Urban',notFound:'No destinations match. Change your search or filters.',planPrompt:'Choose a destination and duration to see a basic outline.',days:'days',style:'Style',duration:'Duration',livePrice:'Live prices are unavailable; request current quotes before travel.',travelWarning:'This is a sample itinerary, not a safety or road-access confirmation. Check current conditions before departure.'}
 };
 const destinations={
 'بند امیر':['Band-e Amir','بند امیر','د افغانستان د لومړي ملي پارک ښکلي طبیعي جهیلونه.','A series of striking natural lakes in Afghanistan’s first national park.'],
 'درهٔ بامیان':['Bamiyan Valley','د بامیانو دره','د لرغونو اثارو او کلتوري میراثونو تاریخي سیمه.','A historic valley known for archaeological and cultural heritage.'],
 'شهر کهنه و ارگ هرات':['Herat Old City & Citadel','د هرات زوړ ښار او کلا','د هرات تاریخي ښاري جوړښت او ارګ.','Herat’s historic urban fabric and citadel.'],
 'مسجد جامع هرات':['Herat Great Mosque','د هرات جامع جومات','د اسلامي معمارۍ او کاشي‌کارۍ تاریخي اثر.','A landmark of Islamic architecture and tilework.'],
 'مزارشریف و روضهٔ مبارک':['Mazar-i-Sharif & Shrine','مزارشریف او روضه مبارکه','د مزارشریف مشهور مذهبي او معماري ځای.','A well-known religious and architectural site in Mazar-i-Sharif.'],
 'کابل و باغ بابر':['Kabul & Bagh-e Babur','کابل او باغ بابر','پایتخت و باغ تاریخی بابر.','The capital city and the historic Bagh-e Babur garden.'],
 'درهٔ پنجشیر':['Panjshir Valley','د پنجشېر دره','درهٔ کوهستانی با رودخانه و چشم‌اندازهای طبیعی.','A mountain valley with river scenery and dramatic landscapes.'],
 'دهلیز واخان':['Wakhan Corridor','د واخان دهلېز','منطقهٔ دوردست کوهستانی با طبیعت ویژه.','A remote high-mountain region with distinctive landscapes.'],
 'منار جام':['Minaret of Jam','د جام منار','اثر برجستهٔ معماری تاریخی در ولایت غور.','A remarkable historic architectural monument in Ghor.'],
 'درهٔ ارغنداب':['Arghandab Valley','د ارغنداب دره','چشم‌اندازهای رودخانه‌ای و باغداری در قندهار.','River landscapes and orchards in Kandahar.']
 };
 const oldApply=applyLanguage;
 applyLanguage=function(lang){
  oldApply(lang);
  const d=copy[lang]||copy.fa;
  Object.entries(d).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=value});
  const search=document.getElementById('travelSearch');if(search)search.placeholder=d.searchPlaceholder;
  const province=document.getElementById('travelProvince');if(province&&province.options[0])province.options[0].textContent=d.allProvinces;
  const provinceNames={
   'کابل':['Kabul','کابل'],'بامیان':['Bamyan','بامیان'],'هرات':['Herat','هرات'],'بلخ':['Balkh','بلخ'],'پنجشیر':['Panjshir','پنجشېر'],'بدخشان':['Badakhshan','بدخشان'],'قندهار':['Kandahar','کندهار'],'ارزگان':['Uruzgan','اروزګان'],'بادغیس':['Badghis','بادغیس'],'بغلان':['Baghlan','بغلان'],'دایکندی':['Daykundi','دایکندي'],'فراه':['Farah','فراه'],'فاریاب':['Faryab','فاریاب'],'غزنی':['Ghazni','غزني'],'غور':['Ghor','غور'],'هلمند':['Helmand','هلمند'],'جوزجان':['Jowzjan','جوزجان'],'کاپیسا':['Kapisa','کاپیسا'],'خوست':['Khost','خوست'],'کنر':['Kunar','کونړ'],'کندز':['Kunduz','کندز'],'لغمان':['Laghman','لغمان'],'لوگر':['Logar','لوګر'],'ننگرهار':['Nangarhar','ننګرهار'],'نیمروز':['Nimruz','نیمروز'],'نورستان':['Nuristan','نورستان'],'پکتیا':['Paktia','پکتیا'],'پکتیکا':['Paktika','پکتیکا'],'پروان':['Parwan','پروان'],'سمنگان':['Samangan','سمنګان'],'سرپل':['Sar-e Pol','سرپل'],'تخار':['Takhar','تخار'],'وردک':['Maidan Wardak','میدان وردګ'],'زابل':['Zabul','زابل']
  };
  if(province)[...province.options].slice(1).forEach(option=>{const names=provinceNames[option.value];if(names)option.textContent=lang==='en'?names[0]:lang==='ps'?names[1]:option.value});
  const coverage=document.getElementById('travelCoverageNote');if(coverage)coverage.textContent=lang==='en'?'All 34 provinces are available in the filter. Destination listings will be expanded gradually using verifiable sources. A missing listing does not mean a province has no attractions.':lang==='ps'?'ټول ۳۴ ولایتونه په فلټر کې شته. د ځایونو نوملړ به په تدریجي ډول د باوري سرچینو له مخې بشپړ شي. د یوه ځای نشتوالی دا معنا نه لري چې په هغه ولایت کې د لیدو وړ ځایونه نشته.':'فهرست ولایت‌ها برای جستجو فعال است؛ فهرست جاذبه‌ها به‌تدریج با منابع قابل بررسی تکمیل می‌شود. نبودن یک مقصد در این نسخه به معنی نبود جاذبه در آن ولایت نیست.';
  const photoCaptions={
   en:[['Band-e Amir','Bamyan • turquoise lakes'],['Bamiyan Valley','Historical and cultural heritage'],['Panjshir','Valley and mountains'],['Wakhan','Badakhshan • Pamir'],['Arghandab','Kandahar • orchards and valley']],
   ps:[['بند امیر','بامیان • فیروزه‌يي جهیلونه'],['د بامیان دره','تاریخي او کلتوري میراث'],['پنجشېر','دره او غرونه'],['واخان','بدخشان • پامیر'],['ارغنداب','کندهار • باغونه او دره']]
  };
  const photoLanguage=photoCaptions[lang];
  if(photoLanguage)document.querySelectorAll('.travel-photo-strip figure').forEach((figure,index)=>{const title=figure.querySelector('figcaption strong'),subtitle=figure.querySelector('figcaption span');if(title)title.textContent=photoLanguage[index][0];if(subtitle)subtitle.textContent=photoLanguage[index][1]});
  else document.querySelectorAll('.travel-photo-strip figure').forEach((figure,index)=>{const title=figure.querySelector('figcaption strong'),subtitle=figure.querySelector('figcaption span');if(title)title.textContent=['بند امیر','درهٔ بامیان','پنجشیر','واخان','ارغنداب'][index];if(subtitle)subtitle.textContent=['بامیان • دریاچه‌های فیروزه‌ای','میراث تاریخی و فرهنگی','دره و کوهستان','بدخشان • پامیر','قندهار • باغ‌ها و دره'][index]});
  const category=document.getElementById('travelCategory');if(category){const labels={nature:d.nature,history:d.history,city:d.city};[...category.options].forEach(o=>{if(o.value==='all')o.textContent=d.allCategories;else if(labels[o.value])o.textContent=labels[o.value]})}
  const planDestination=document.getElementById('travelPlanDestination');
  const destinationLabels=[
   ['Bamyan & Band-e Amir','بامیان او بند امیر'],
   ['Herat','هرات'],
   ['Kabul','کابل'],
   ['Balkh & Mazar-i-Sharif','بلخ او مزارشریف'],
   ['Panjshir','پنجشېر'],
   ['Badakhshan & Wakhan','بدخشان او واخان'],
   ['Kandahar','کندهار']
  ];
  if(planDestination)[...planDestination.options].forEach((option,index)=>{const labels=destinationLabels[index];if(labels)option.textContent=lang==='en'?labels[0]:lang==='ps'?labels[1]:['بامیان و بند امیر','هرات','کابل','بلخ و مزارشریف','پنجشیر','بدخشان و واخان','قندهار'][index]});
  const planDays=document.getElementById('travelPlanDays');
  if(planDays)[...planDays.options].forEach(option=>{const count=Number(option.value);option.textContent=lang==='en'?count+' day'+(count===1?'':'s'):lang==='ps'?count+' ورځې':count+' روز'});
  const planStyle=document.getElementById('travelPlanStyle');
  const styles=[['Budget','اقتصادي','اقتصادي'],['Moderate','منځنۍ','متوسط'],['Family','کورنۍ','خانوادگی'],['Nature & outdoors','طبیعت‌ګرځېدنه','طبیعت‌گردی'],['Historical & cultural','تاریخي او کلتوري','تاریخی و فرهنگی']];
  if(planStyle)[...planStyle.options].forEach((option,index)=>{const labels=styles[index];if(labels)option.textContent=labels[lang==='en'?0:lang==='ps'?1:2]});
  const output=document.getElementById('travelPlanOutput');if(output&&!output.dataset.generated)output.textContent=d.planPrompt;
  if(window.renderTravelGuide)window.renderTravelGuide();
 };
 const originalRender=window.renderTravelGuide;
 window.renderTravelGuide=function(){
  originalRender();
  const lang=document.getElementById('uiLanguage')?.value||'fa',grid=document.getElementById('travelDestinationGrid');if(!grid)return;
  const d=copy[lang]||copy.fa;
  [...grid.querySelectorAll('.travel-destination')].forEach(card=>{
   const title=card.querySelector('h3');if(!title)return;const item=destinations[title.textContent];if(!item)return;
   const index=lang==='en'?0:lang==='ps'?1:-1;if(index>=0)title.textContent=item[index];
   const p=card.querySelector('p');if(p&&index>=0)p.textContent=(lang==='en'?'':lang==='ps'?'':'')+p.textContent.split(' • ')[0]+' • '+(lang==='en'?(card.textContent.includes('طبیعت')?d.nature:card.textContent.includes('شهری')?d.city:d.history):(card.textContent.includes('طبیعت')?d.nature:card.textContent.includes('شهری')?d.city:d.history));
   const summary=card.querySelectorAll('p')[1];if(summary&&index>=0)summary.textContent=item[lang==='en'?3:2];
  });
  if(grid.querySelector('.empty-state'))grid.querySelector('.empty-state').textContent=d.notFound;
 };
 const planner=document.getElementById('travelPlanForm');
 if(planner)planner.addEventListener('submit',()=>{const out=document.getElementById('travelPlanOutput');if(out)out.dataset.generated='true';});
})();
