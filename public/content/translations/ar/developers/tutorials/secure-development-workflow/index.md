---
title: قائمة التحقق من أمان العقود الذكية
description: سير عمل مقترح لكتابة عقود ذكية آمنة
author: Trailofbits
tags:
  - العقود الذكية
  - الأمان
  - solidity
skill: intermediate
breadcrumb: قائمة التحقق من الأمان
lang: ar
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## قائمة التحقق من تطوير العقود الذكية {#smart-contract-development-checklist}

إليك عملية رفيعة المستوى نوصي باتباعها أثناء كتابة عقودك الذكية.

تحقق من المشكلات الأمنية المعروفة:

- راجع عقودك باستخدام [سليذر](https://github.com/crytic/slither). يحتوي على أكثر من 40 كاشفًا مدمجًا لنقاط الضعف الشائعة. قم بتشغيله عند كل عملية إيداع برمز جديد وتأكد من حصوله على تقرير نظيف (أو استخدم وضع الفرز لتجاهل مشكلات معينة).
- راجع عقودك باستخدام [Crytic](https://crytic.io/). فهو يتحقق من 50 مشكلة لا يتحقق منها سليذر. يمكن لـ Crytic مساعدة فريقك على البقاء على اطلاع دائم أيضًا، من خلال إظهار المشكلات الأمنية بسهولة في طلبات السحب على GitHub.

ضع في اعتبارك الميزات الخاصة لعقدك:

- هل عقودك قابلة للترقية؟ راجع كود القابلية للترقية بحثًا عن العيوب باستخدام [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) أو [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). لقد وثقنا 17 طريقة يمكن أن تفشل بها الترقيات.
- هل تدعي عقودك التوافق مع معايير <span dir="ltr">ERCs</span>؟ تحقق منها باستخدام [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). تحدد هذه الأداة على الفور الانحرافات عن ست مواصفات شائعة.
- هل تتكامل مع رموز مميزة لجهات خارجية؟ راجع [قائمة التحقق من تكامل الرموز المميزة](/developers/tutorials/token-integration-checklist/) الخاصة بنا قبل الاعتماد على عقود خارجية.

افحص بصريًا ميزات الأمان الهامة في الكود الخاص بك:

- راجع أداة طباعة [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) الخاصة بـ سليذر. تجنب التظليل غير المقصود ومشكلات التخطيط الخطي <span dir="ltr">C3</span>.
- راجع أداة طباعة [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) الخاصة بـ سليذر. فهي تبلغ عن رؤية الوظيفة وعناصر التحكم في الوصول.
- راجع أداة طباعة [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) الخاصة بـ سليذر. فهي تبلغ عن عناصر التحكم في الوصول على متغيرات الحالة.

قم بتوثيق خصائص الأمان الهامة واستخدم مولدات الاختبار الآلية لتقييمها:

- تعلم كيفية [توثيق خصائص الأمان للكود الخاص بك](/developers/tutorials/guide-to-smart-contract-security-tools/). الأمر صعب في البداية، ولكنه النشاط الأكثر أهمية لتحقيق نتيجة جيدة. وهو أيضًا شرط أساسي لاستخدام أي من التقنيات المتقدمة في هذا البرنامج التعليمي.
- حدد خصائص الأمان في Solidity، لاستخدامها مع [إيكيدنا](https://github.com/crytic/echidna) و[مانتيكور](https://manticore.readthedocs.io/en/latest/verifier.html). ركز على آلة الحالة الخاصة بك، وعناصر التحكم في الوصول، والعمليات الحسابية، والتفاعلات الخارجية، والتوافق مع المعايير.
- حدد خصائص الأمان باستخدام [واجهة برمجة تطبيقات (API) لغة Python الخاصة بـ سليذر](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). ركز على الوراثة، وتبعيات المتغيرات، وعناصر التحكم في الوصول، والمشكلات الهيكلية الأخرى.
- قم بتشغيل اختبارات الخصائص الخاصة بك عند كل عملية إيداع باستخدام [Crytic](https://crytic.io). يمكن لـ Crytic استهلاك وتقييم اختبارات خصائص الأمان بحيث يمكن للجميع في فريقك رؤية نجاحها بسهولة على GitHub. يمكن للاختبارات الفاشلة أن تمنع عمليات الإيداع.

أخيرًا، كن على دراية بالمشكلات التي لا يمكن للأدوات الآلية العثور عليها بسهولة:

- الافتقار إلى الخصوصية: يمكن لأي شخص آخر رؤية معاملاتك أثناء وجودها في قائمة الانتظار في المجمع
- معاملات الاستباق (Front running)
- عمليات التشفير
- التفاعلات المحفوفة بالمخاطر مع مكونات التمويل اللامركزي (DeFi) الخارجية

## اطلب المساعدة {#ask-for-help}

تُعقد [الساعات المكتبية لـ إيثيريوم](https://calendly.com/dan-trailofbits/office-hours) بعد ظهر كل يوم ثلاثاء. تمثل هذه الجلسات الفردية التي تبلغ مدتها ساعة واحدة فرصة لطرح أي أسئلة لديك حول الأمان، واستكشاف الأخطاء وإصلاحها باستخدام أدواتنا، والحصول على تعليقات من الخبراء حول نهجك الحالي. سنساعدك في العمل من خلال هذا الدليل.

انضم إلى Slack الخاص بنا: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). نحن متاحون دائمًا في قنوات <span dir="ltr">#crytic</span> و <span dir="ltr">#ethereum</span> إذا كان لديك أي أسئلة.