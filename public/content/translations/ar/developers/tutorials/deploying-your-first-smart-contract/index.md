---
title: "نشر أول عقد ذكي لك"
description: "مقدمة حول نشر أول عقد ذكي لك على شبكة اختبار إيثيريوم"
author: "jdourlens"
tags: ["العقود الذكية", "Remix", "Solidity", "النشر"]
skill: beginner
breadcrumb: "نشر أول عقد"
lang: ar
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

أعتقد أنك متحمس مثلنا لـ [نشر](/developers/docs/smart-contracts/deploying/) والتفاعل مع أول [عقد ذكي](/developers/docs/smart-contracts/) لك على سلسلة كتل إيثيريوم.

لا تقلق، بما أنه أول عقد ذكي لنا، سنقوم بنشره على [شبكة اختبار محلية](/developers/docs/networks/) حتى لا يكلفك نشره أي شيء ويمكنك اللعب به قدر ما تشاء.

## كتابة عقدنا {#writing-our-contract}

الخطوة الأولى هي [زيارة Remix](https://remix.ethereum.org/) وإنشاء ملف جديد. في الجزء العلوي الأيسر من واجهة Remix، أضف ملفًا جديدًا وأدخل اسم الملف الذي تريده.

![Adding a new file in the Remix interface](./remix.png)

في الملف الجديد، سنقوم بلصق الكود التالي.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // متغير عام من نوع unsigned int لحفظ عدد التعدادات
    uint256 public count = 0;

    // دالة تقوم بزيادة العداد الخاص بنا
    function increment() public {
        count += 1;
    }

    // دالة جلب غير ضرورية للحصول على قيمة العد
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

إذا كنت معتادًا على البرمجة، يمكنك بسهولة تخمين ما يفعله هذا البرنامج. إليك شرح سطرًا بسطر:

- السطر 4: نحدد عقدًا باسم `Counter`.
- السطر 7: يخزن عقدنا عددًا صحيحًا بدون إشارة (unsigned integer) واحدًا باسم `count` يبدأ من 0.
- السطر 10: ستقوم الدالة الأولى بتعديل حالة العقد و `increment()` متغيرنا `count`.
- السطر 15: الدالة الثانية هي مجرد دالة جلب (getter) لتتمكن من قراءة قيمة المتغير `count` خارج العقد الذكي. لاحظ أنه نظرًا لأننا حددنا المتغير `count` الخاص بنا كـ public، فهذا ليس ضروريًا ولكنه معروض كمثال.

هذا كل شيء بالنسبة لأول عقد ذكي بسيط لنا. كما قد تعلم، يبدو وكأنه فئة (class) من لغات البرمجة كائنية التوجه (OOP) مثل Java أو <span dir="ltr">C++</span>. حان الوقت الآن للعب بعقدنا.

## نشر عقدنا {#deploying-our-contract}

بما أننا كتبنا أول عقد ذكي لنا، سنقوم الآن بنشره على سلسلة الكتل لنتمكن من اللعب به.

[نشر العقد الذكي على سلسلة الكتل](/developers/docs/smart-contracts/deploying/) هو في الواقع مجرد إرسال معاملة تحتوي على كود العقد الذكي المترجم (compiled) دون تحديد أي مستلمين.

سنقوم أولاً بـ [ترجمة العقد](/developers/docs/smart-contracts/compiling/) عن طريق النقر على أيقونة الترجمة (compile) على الجانب الأيسر:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

ثم انقر على زر الترجمة (compile):

![The compile button in the Remix solidity compiler](./remix-compile.png)

يمكنك اختيار تحديد خيار "Auto compile" (الترجمة التلقائية) بحيث يتم دائمًا ترجمة العقد عند حفظ المحتوى في محرر النصوص.

ثم انتقل إلى شاشة "deploy and run transactions" (نشر وتشغيل المعاملات):

![The deploy icon in the Remix toolbar](./remix-deploy.png)

بمجرد وصولك إلى شاشة "deploy and run transactions"، تحقق مرة أخرى من ظهور اسم عقدك وانقر على Deploy (نشر). كما ترى في أعلى الصفحة، البيئة الحالية هي "JavaScript VM" مما يعني أننا سنقوم بنشر والتفاعل مع عقدنا الذكي على سلسلة كتل اختبارية محلية لنتمكن من الاختبار بشكل أسرع وبدون أي رسوم.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

بمجرد النقر على زر "Deploy"، سترى عقدك يظهر في الأسفل. انقر على السهم الموجود على اليسار لتوسيعه حتى نرى محتوى عقدنا. هذا هو متغيرنا `counter`، ودالتنا `increment()`، ودالة الجلب `getCounter()`.

إذا نقرت على زر `count` أو `getCount`، فسيقوم فعليًا باسترداد محتوى المتغير `count` الخاص بالعقد وعرضه. نظرًا لأننا لم نستدعِ الدالة `increment` بعد، يجب أن يعرض 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

دعونا الآن نستدعي الدالة `increment` بالنقر على الزر. سترى سجلات (logs) المعاملات التي تم إجراؤها تظهر في أسفل النافذة. ستلاحظ أن السجلات تختلف عندما تضغط على الزر لاسترداد البيانات بدلاً من زر `increment`. وذلك لأن قراءة البيانات على سلسلة الكتل لا تحتاج إلى أي معاملات (كتابة) أو رسوم. لأن تعديل حالة سلسلة الكتل فقط هو ما يتطلب إجراء معاملة:

![A log of transactions](./transaction-log.png)

بعد الضغط على زر الزيادة (increment) الذي سيُنشئ معاملة لاستدعاء دالتنا `increment()`، إذا نقرنا مرة أخرى على أزرار count أو getCount، فسنقرأ الحالة المحدثة حديثًا لعقدنا الذكي حيث يكون المتغير count أكبر من 0.

![Newly updated state of the smart contract](./updated-state.png)

في البرنامج التعليمي التالي، سنغطي [كيفية إضافة أحداث إلى عقودك الذكية](/developers/tutorials/logging-events-smart-contracts/). يعد تسجيل الأحداث طريقة ملائمة لتصحيح أخطاء عقدك الذكي وفهم ما يحدث أثناء استدعاء دالة.