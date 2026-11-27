---
title: "قائمة التحقق من أمان العقود الذكية"
description: "سير عمل مقترح لكتابة عقود ذكية آمنة"
author: Trailofbits
tags:
  - العقود الذكية
  - الأمان
  - solidity
skill: intermediate
breadcrumb: "قائمة التحقق من الأمان"
lang: ar
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## قائمة التحقق من تطوير العقود الذكية {#smart-contract-development-checklist}

إليك عملية عالية المستوى نوصي باتباعها أثناء كتابة عقودك الذكية.

تحقق من المشكلات الأمنية المعروفة:

- راجع عقودك باستخدام [<span dir="ltr">Slither</span>](https://github.com/crytic/slither). يحتوي على أكثر من 100 كاشف مدمج للثغرات الشائعة. قم بتشغيله عند كل عملية إيداع لرمز جديد وتأكد من حصوله على تقرير نظيف (أو استخدم وضع الفرز لتجاهل مشكلات معينة).
- قم بتشغيل <span dir="ltr">Slither</span> في التكامل المستمر (CI)، على سبيل المثال باستخدام [slither-action](https://github.com/crytic/slither-action) على GitHub، بحيث تظهر المشكلات الأمنية في طلبات السحب.

ضع في اعتبارك الميزات الخاصة لعقدك:

- هل عقودك قابلة للترقية؟ راجع كود الترقية الخاص بك بحثًا عن العيوب باستخدام [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks). لقد وثقنا 17 طريقة يمكن أن تفشل بها الترقيات.
- هل تدعي عقودك التوافق مع معايير ERC؟ تحقق منها باستخدام [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). تحدد هذه الأداة على الفور الانحرافات عن ست مواصفات شائعة.
- هل تتكامل مع رموز مميزة لجهات خارجية؟ راجع [قائمة التحقق من تكامل الرموز المميزة](/developers/tutorials/token-integration-checklist/) الخاصة بنا قبل الاعتماد على عقود خارجية.

افحص بصريًا ميزات الأمان الهامة في الكود الخاص بك:

- راجع أداة طباعة [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) الخاصة بـ <span dir="ltr">Slither</span>. تجنب مشكلات التظليل غير المقصود ومشكلات التخطيط الخطي <span dir="ltr">C3</span>.
- راجع أداة طباعة [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) الخاصة بـ <span dir="ltr">Slither</span>. فهي تبلغ عن رؤية الدوال وعناصر التحكم في الوصول.
- راجع أداة طباعة [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) الخاصة بـ سليذر. فهي تبلغ عن عناصر التحكم في الوصول على متغيرات الحالة.

قم بتوثيق خصائص الأمان الهامة واستخدم مولدات الاختبار الآلية لتقييمها:

- تعلم كيفية [توثيق خصائص الأمان للكود الخاص بك](/developers/tutorials/guide-to-smart-contract-security-tools/). قد يكون الأمر صعبًا في البداية، ولكنه النشاط الأكثر أهمية لتحقيق نتيجة جيدة. كما أنه شرط أساسي لاستخدام أي من التقنيات المتقدمة في هذا البرنامج التعليمي.
- حدد خصائص الأمان في Solidity، لاستخدامها مع أدوات الاختبار العشوائي (fuzzers) مثل [<span dir="ltr">Echidna</span>](https://github.com/crytic/echidna) و [Medusa](https://github.com/crytic/medusa)، ومع أدوات التنفيذ الرمزي مثل [hevm](https://hevm.dev/). ركز على آلة الحالة الخاصة بك، وعناصر التحكم في الوصول، والعمليات الحسابية، والتفاعلات الخارجية، والتوافق مع المعايير.
- حدد خصائص الأمان باستخدام [واجهة برمجة التطبيقات (API) الخاصة بـ Python لـ <span dir="ltr">Slither</span>](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). ركز على الوراثة، وتبعيات المتغيرات، وعناصر التحكم في الوصول، والمشكلات الهيكلية الأخرى.
- قم بتشغيل اختبارات الخصائص الخاصة بك عند كل عملية إيداع في التكامل المستمر (CI) (على سبيل المثال، GitHub Actions) حتى يتمكن الجميع في فريقك من رؤية نجاحها بسهولة. يمكن للاختبارات الفاشلة أن تمنع عمليات الدمج.

أخيرًا، كن على دراية بالمشكلات التي لا يمكن للأدوات الآلية العثور عليها بسهولة:

- الافتقار إلى الخصوصية: يمكن لأي شخص آخر رؤية معاملاتك أثناء وجودها في قائمة الانتظار في المجمع
- استباق المعاملات (Front running)
- العمليات التشفيرية
- التفاعلات المحفوفة بالمخاطر مع مكونات التمويل اللامركزي (DeFi) الخارجية

## اطلب المساعدة {#ask-for-help}

تُعقد [الساعات المكتبية لـ إيثيريوم](https://meetings.hubspot.com/trailofbits/office-hours) بعد ظهر كل يوم ثلاثاء. تمثل هذه الجلسات الفردية التي تبلغ مدتها ساعة واحدة فرصة لطرح أي أسئلة لديك حول الأمان، واستكشاف الأخطاء وإصلاحها باستخدام أدواتنا، والحصول على تعليقات من الخبراء حول نهجك الحالي. سنساعدك في العمل من خلال هذا الدليل.

انضم إلى Slack الخاص بنا: [Empire Hacking](https://slack.empirehacking.nyc/). نحن متاحون دائمًا في قنوات <span dir="ltr">#crytic</span> و <span dir="ltr">#ethereum</span> إذا كان لديك أي أسئلة.
