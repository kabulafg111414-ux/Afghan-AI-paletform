# راهنمای راه‌اندازی و عیب‌یابی Afghan AI در Render

این راهنما برای نسخهٔ دارای Backend پروژهٔ Afghan AI است. مراحل از آیفون نیز قابل انجام است.

## آدرس سرویس موجود
سرویس Render که قبلاً برای پروژه ساخته شده است:
- وب‌سایت: https://afghan-ai-paletform.onrender.com
- بررسی سلامت: https://afghan-ai-paletform.onrender.com/api/health

**اگر همین سرویس در حساب Render شما موجود است، سرویس یا Blueprint تازه نسازید.** ساخت Blueprint دوم ممکن است یک سرویس تکراری ایجاد کند. فقط سرویس موجود را از Dashboard باز کنید.

## تنظیمات مورد نیاز
در Render Dashboard، سرویس `afghan-ai-paletform` یا سرویس متصل به این مخزن را باز کنید و در بخش Environment این متغیرها را بررسی نمایید:

- `OPENAI_API_KEY`: کلید محرمانهٔ معتبر ارائه‌دهندهٔ OpenAI؛ فقط در بخش Secret خود Render.
- `OPENAI_MODEL`: مقدار پیش‌فرض `gpt-4.1-mini`.

کلید API را در GitHub، فایل‌های JavaScript، چت یا تصویر صفحه قرار ندهید. اگر کلید قبلاً افشا شده، آن را باطل و کلید تازه بسازید.

## تنظیمات ساخت و اجرا
فایل `render.yaml` در ریشهٔ مخزن باید تنظیمات زیر را داشته باشد:

- Build: `pip install -r requirements.txt`
- Start: `gunicorn server:app --bind 0.0.0.0:$PORT --workers 2 --timeout 60`
- Health Check: `/api/health`

وابستگی‌های لازم در `requirements.txt` شامل Flask، OpenAI SDK، Gunicorn و Flask-Limiter است.

## Deploy و آزمایش
1. در Dashboard سرویس موجود، آخرین Deploy را بازبینی کنید.
2. اگر کد جدید در GitHub ثبت شده، از بخش Manual Deploy گزینهٔ Deploy latest commit را انتخاب کنید.
3. پس از پایان Deploy، آدرس سلامت را باز کنید: https://afghan-ai-paletform.onrender.com/api/health
4. پاسخ مورد انتظار شبیه این است: `{"ai_configured":true,"ok":true}`.
5. اگر `ok` برابر `true` ولی `ai_configured` برابر `false` بود، متغیر `OPENAI_API_KEY` در Render تنظیم نشده یا خالی است.
6. اگر هر دو درست بود، معلم هوشمند را در همان دامنهٔ Render با یک پرسش غیرحساس آزمایش کنید.

**مهم:** پاسخ موفق `/api/health` فقط فعال‌بودن برنامه و وجود متغیر کلید را نشان می‌دهد؛ اعتبار کلید، اعتبار حساب، موجودی/پرداخت، دسترسی مدل یا موفقیت درخواست واقعی AI را تضمین نمی‌کند. برای خطاهای درخواست، Logs سرویس Render را بررسی کنید.

## مسیرهای Backend
- معلم هوشمند: `POST /api/chat` با JSON شامل `message` و `language` (یکی از `fa`، `ps`، `en`).
- مترجم: `POST /api/translate` با JSON شامل `text`، `source_language` و `target_language`.

صفحهٔ وب و Backend باید از همان دامنهٔ Render باز شوند. GitHub Pages فقط فایل‌های ایستا را میزبانی می‌کند و مسیرهای Flask مانند `/api/chat` را اجرا نمی‌کند؛ بنابراین آزمایش معلم هوشمند از دامنهٔ Pages به‌تنهایی کار نخواهد کرد.

## نکات امنیتی و عملیاتی
- برای آزمایش از اطلاعات واقعی یا حساس شاگردان استفاده نکنید.
- محدودیت درخواست در نسخهٔ فعلی از حافظهٔ محلی استفاده می‌کند؛ برای چند Worker یا استفادهٔ تولیدی، ذخیره‌سازی مشترک مانند Redis لازم است.
- پیش از استفادهٔ عمومی، احراز هویت، نظارت، سیاست حریم خصوصی و محافظت ویژه از اطلاعات کودکان را تکمیل کنید.
- هزینهٔ میزبانی Render و هزینهٔ مصرف API جداگانه‌اند. طرح میزبانی و شرایط فعلی آن را در حساب Render بررسی کنید.

## عیب‌یابی سریع
- **سایت باز نمی‌شود:** Deploy Logs و Start Command را بررسی کنید.
- **خطای 503 و پیام AI service is not configured:** متغیر `OPENAI_API_KEY` را در Environment تنظیم و سرویس را Restart/Deploy کنید.
- **خطای 502 یا AI request failed:** Logs سرور را بررسی کنید؛ کلید، دسترسی حساب و نام مدل باید معتبر باشند.
- **معلم در GitHub Pages جواب نمی‌دهد:** آدرس را با دامنهٔ Render عوض کنید.
- **صفحهٔ سلامت باز می‌شود اما پاسخ AI نمی‌آید:** سلامت سرور به‌تنهایی آزمایش مدل نیست؛ یک پرسش آزمایشی بفرستید و هم‌زمان Logs را بررسی کنید.
