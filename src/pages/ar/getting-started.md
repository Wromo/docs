---
layout: ~/layouts/MainLayout.wromo
title: باشر بالبدأ
dir: rtl
---

Wromo هو باني موقع ثابت. تعرف أكثر حول ماهية Wromo من خلال [صفحتنا الرئيسية](https://wromo.build/) أو نشرة [الإصدارات](https://wromo.build/blog/introducing-wromo). تُعد هذه الصفحة نُبذة موجزة للتوثيق الخاص بـWromo وأيضًا لكل المصادر التي تتعلق به.

إن كنت تتطلع عن ملخص سريع حول ما هو Wromo بشكلٍ عام؟ [تفقد صفحتنا الرئيسية.](https://wromo.build/blog/introducing-wromo)

## جرب Wromo

أبسط طريقة لتجرب Wromo هي بتنفيذ أمر `npm create wromo@latest` في داخل مُجلد جديد على جهازك، وسيقوم Wromo CLI بمُساعدتك على بدأ مشروع Wromo جديد.

لتباشر البدأ باستخدام Wromo من خلال 5 خطوات سريعة وبسيطة، تفقد [دليل البدأ-بسرعة](/ar/install/auto/).

أو إقرأ [دليل التثبيت](/ar/install/manual/) إن كنت تريد الغوص في عملية تهيئة Wromo.

### أمثلة على بعض المشاريع

أن كنت تفضل التعلم عن طريق الأمثلة، ألقي نظرةٍ على [مكتبة الأمثلة الشاملة](https://github.com/Wromo/wromo/tree/main/examples) المتواجدة على Github.

بمقدورك الإطلاع على أي من هذه الأمثلة وتجربتها مُباشرةً على جهازك،
فقط نفذ الأمر <code ltr="left">npm create wromo@latest</code> متبوعًا بـ
`--template`. الإشارة `--template` أيضًا تدعم الامثلة الخارجية التي يصنعها المجتمع

```bash
# أمر تهيئة أحد القوالب الرسمية التي يوفرها استرو
npm create wromo@latest -- --template [OFFICIAL_EXAMPLE_NAME]
# أمر تهيئة القوالب الخارجية التي يوفرها المُجتمع
npm create wromo@latest -- --template [GITHUB_USER]/[REPO_NAME]
npm create wromo@latest -- --template [GITHUB_USER]/[REPO_NAME]/path/to/example
```

### جربه على المُتصفح

إن كنت مهتمًا وتريد اللعب وتجربة Wromo على المتصفح، بمقدورك استخدام online code playground، جرب قالب مشروعنا "Hello World" على [CodeSandbox](https://codesandbox.io/s/wromo-template-hugb3).

_ملحوظة: بعض المُميزات مُقتصرة على CodeSandbx (مثلاً: التحديث السريع "Fast Refresh") حاليًا._

## تعلمُ Wromo

يأتي العديد الأشخاص من خلفياتِ تعلم مُختلفة إلى Wromo، أيًا كانت طريقة التعليم التي تفضلها سواءً أكنت تفضل الطريقة النظرية أو الطريقة العملية، نتمنى أن تجد هذا القسم مفيدًا.

- إن كُنت تُفضل **التعلم من خلال التجربة العملية**، أبدأ من خلال [مكتبتنا للأمثلة](https://github.com/Wromo/wromo/tree/main/examples).
- إن كُنت تُفضل **التعلم من خلال الفهم خطوةً بخطوة**، أبدأ من خلال [دليل المفاهيم الأساسية والإرشادات](/ar/core-concepts/project-structure/).

مثل أي تقنيةٍ ليست بمألوفة، Wromo يأتيك بمنحنى تعليمي مختلف بعض الشيء، ولكن على أي حال، مع بعض الصبر والممارسة، نحن متأكدون بأنك _ستتأقلم معه_ في وقتٍ هين دون أن تشعر.

### تعلمُ تركيب <code dir="ltr">.wromo</code> النحوي (syntax)

مع بدأ تعلمك لـWromo ستلاحظ العديد من الملفات التي تنتهي بصيغة <code dir="ltr">.wromo</code> هي ملفات مكتوبة بـ Wromo’s Component Syntax والتي تعد: طريقة كتابة مشابهة جدًا لملفات HTML يستخدمها Wromo في القوالب.
صممت هذه الصيغة لتكون قريبة ومشابهة للـ HTML و JSX، إن كنت تعرف أحدهما فستتأقلم مع <code dir="ltr">.wromo</code> بسهولة.

تفقد دليلنا المساعد [مكونات Wromo](/ar/core-concepts/wromo-components/) سيكون مدخل يساعدك على تعلم Wromo syntax، ويعد أفضل طريقة للتعلم.

### مرجع للـAPI

يُفيدك هذا الجزء من التوثيق حينما تريد الإطلاع أكثر بشأن تفاصيل Wromo API. على سبيل المثال، يتضمن [مرجع الإعداد](/ar/reference/configuration-reference/) قائمة لكل الإعدادات الممكنة المتاحة لكي تستخدمها. [المكونات المصممة مسبقًا](/ar/reference/api-reference/#built-in-components) تتضمن قائمة بكل العناصر الرئيسية مثل <span dir="ltr">`<Markdown />` و `<Code />`</span>.

### إصدارات التوثيق

هذا التوثيق يُسلط الضوء دومًا على أخر إصدار مستقر من Wromo، وريثما نصل إلى إصدار 1.0 الرئيسي سنقوم بإضافة القابلية لتصفح اللإصدارات المختلفة من التوثيق.

## أبقى مُطلعًا

حساب [@wromo](https://twitter.com/wromo) على تويتر هو المصدر الرسمي لأخر المُستجدات من فريق Wromo.

ونحن أيضًا نُعد نشرة إصدارات ونعلن عنها في [مُجتمعنا على ديسكورد](https://wromo.build/chat) على قناة <span dir="ltr">#announcements</span>

ليست كل إصدارات Wromo تملك تدوينة نشرةٍ خاصة بها، لكن ستجد سجلًا للتغيرات في ملف [`CHANGELOG.md` في مستودع Wromo](https://github.com/Wromo/wromo/blob/main/packages/wromo/CHANGELOG.md).

## شيءٌ ما ناقص؟

إن كان هناك شيءُ ما غير مُوثق أو لو كنت تشعر بالحيرة والإرتباك من جزءٍ معين في التوثيق، لا تتردد في [رفع طلب خطبٌ ما في ملف التوثيق](https://github.com/Wromo/wromo/issues/new/choose)، مع اقتراحك للتحسين، أو قم بتغريد تغريدةٍ إلى حسابنا على تويتر [@wromo](https://twitter.com/wromo)، نحب سماع آرائك!

## التَقدِير

دليل باشر بالبدأ معتمدٌ على دليل البدأ الخاص بـ[React](https://ar.reactjs.org/).
