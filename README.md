# موقع قاعة الحفلات لينا — بئر توتة

موقع ثابت (HTML + CSS + JavaScript) بدون أي خطوة بناء.

## البنية
```
index.html        الصفحة الرئيسية
css/style.css     التنسيق
js/app.js         اللغة (عربي/فرنسي) والحسابات والحجز والدفع
images/           الصور (salle.jpg للواجهة والخلفية، f1..f7 للمعرض)
```

## ما يُعدَّل وأين (في js/app.js)
- `WA_NUMBER`: رقم واتساب القاعة.
- `PAY`: بيانات حساب بريدي موب (الاسم، CCP، RIP، العربون).
- `FIREBASE_CONFIG`: إعدادات Firebase لحفظ الحسابات على الإنترنت. إذا تُركت فارغة تبقى الحسابات في متصفح الزائر.
- الأسعار: في `index.html` ابحث عن `000 000`.

## النشر على Cloudflare Pages من GitHub
1. ارفع كل محتويات هذا المجلد إلى مستودع GitHub (الملفات في جذر المستودع).
2. في Cloudflare: Workers & Pages ← Create application ← Pages ← Connect to Git، واختر المستودع.
3. Build command: `exit 0`، وBuild output directory: `/` (جذر المستودع).
4. بعد كل تعديل يُرفع إلى GitHub يُنشر الموقع تلقائيًا.
