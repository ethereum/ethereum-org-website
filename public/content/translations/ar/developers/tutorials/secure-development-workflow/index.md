---
title: قائمة التحقق من أمان العقود الذكية
description: سير عمل مقترح لكتابة عقود ذكية آمنة
author: "Trailofbits"
tags: ["العقود الذكية", "الأمان", "Solidity"]
skill: intermediate
lang: ar
published: 2020-09-07
source: بناء عقود آمنة
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## قائمة التحقق من تطوير العقود الذكية {#smart-contract-development-checklist}

إليك عملية رفيعة المستوى نوصي باتباعها أثناء كتابة عقودك الذكية.

تحقق من المشكلات الأمنية المعروفة:

- راجع عقودك باستخدام [Slither](https://github.com/crytic/slither). يحتوي على أكثر من 40 كاشفًا مدمجًا لنقاط الضعف الشائعة. قم بتشغيله عند كل عملية إيداع (check-in) برمز جديد وتأكد من حصوله على تقرير نظيف (أو استخدم وضع الفرز لتجاهل مشكلات معينة).
- راجع عقودك باستخدام [Crytic](https://crytic.io/). يتحقق من 50 مشكلة لا يكتشفها Slither. يمكن لـ Crytic مساعدة فريقك على البقاء على اطلاع دائم أيضًا، من خلال إبراز المشكلات الأمنية بسهولة في طلبات السحب (Pull Requests) على GitHub.

ضع في اعتبارك الميزات الخاصة لعقدك:

- هل عقودك قابلة للترقية؟ راجع كود القابلية للترقية بحثًا عن العيوب باستخدام [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) أو [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). لقد وثقنا 17 طريقة يمكن أن تنحرف بها الترقيات عن مسارها.
- هل تدعي عقودك التوافق مع معايير ERC؟ تحقق منها باستخدام [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). تحدد هذه الأداة على الفور الانحرافات عن ست مواصفات شائعة.
- هل تتكامل مع رموز تابعة لجهات خارجية؟ راجع [قائمة التحقق من تكامل الرموز](/developers/tutorials/token-integration-checklist/) الخاصة بنا قبل الاعتماد على عقود خارجية.

افحص الميزات الأمنية الحرجة في الكود الخاص بك بصريًا:

- راجع طابعة [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) الخاصة بـ Slither. تجنب التظليل غير المقصود (shadowing) ومشكلات التخطيط الخطي C3.
- راجع طابعة [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) الخاصة بـ Slither. تُبلغ عن رؤية الوظائف (function visibility) وعناصر التحكم في الوصول.
- راجع طابعة [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) الخاصة بـ Slither. تُبلغ عن عناصر التحكم في الوصول على متغيرات حالة (state variables).

وثّق الخصائص الأمنية الحرجة واستخدم مولدات الاختبار الآلية لتقييمها:

- تعلم كيفية [توثيق الخصائص الأمنية للكود الخاص بك](/developers/tutorials/guide-to-smart-contract-security-tools/). الأمر صعب في البداية، ولكنه النشاط الوحيد الأكثر أهمية لتحقيق نتيجة جيدة. وهو أيضًا شرط أساسي لاستخدام أي من التقنيات المتقدمة في هذا البرنامج التعليمي.
- حدد الخصائص الأمنية في Solidity، لاستخدامها مع [Echidna](https://github.com/crytic/echidna) و [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). ركز على آلة حالة (state machine) الخاصة بك، وعناصر التحكم في الوصول، والعمليات الحسابية، والتفاعلات الخارجية، والتوافق مع المعايير.
- حدد الخصائص الأمنية باستخدام [واجهة برمجة تطبيقات Python الخاصة بـ Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). ركز على الوراثة، وتبعيات المتغيرات، وعناصر التحكم في الوصول، والمشكلات الهيكلية الأخرى.
- قم بتشغيل اختبارات الخصائص الخاصة بك عند كل عملية إيداع (commit) باستخدام [Crytic](https://crytic.io). يمكن لـ Crytic استهلاك وتقييم اختبارات الخصائص الأمنية بحيث يمكن للجميع في فريقك رؤية نجاحها بسهولة على GitHub. يمكن للاختبارات الفاشلة أن تمنع عمليات الإيداع.

أخيرًا، كن على دراية بالمشكلات التي لا يمكن للأدوات الآلية العثور عليها بسهولة:

- الافتقار إلى الخصوصية: يمكن لأي شخص آخر رؤية المعاملات الخاصة بك أثناء وجودها في قائمة الانتظار في المجمع
- المعاملات الاستباقية (Front running)
- عمليات التشفير
- التفاعلات المحفوفة بالمخاطر مع مكونات التمويل اللامركزي (DeFi) الخارجية

## اطلب المساعدة {#ask-for-help}

تُعقد [ساعات العمل الخاصة بإيثريوم](https://calendly.com/dan-trailofbits/office-hours) بعد ظهر كل يوم ثلاثاء. هذه الجلسات الفردية التي تبلغ مدتها ساعة واحدة هي فرصة لطرح أي أسئلة لديك حول الأمان، واستكشاف الأخطاء وإصلاحها باستخدام أدواتنا، والحصول على تعليقات من الخبراء حول نهجك الحالي. سنساعدك في العمل من خلال هذا الدليل.

انضم إلى Slack الخاص بنا: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). نحن متاحون دائمًا في قنوات #crytic و #ethereum إذا كان لديك أي أسئلة.