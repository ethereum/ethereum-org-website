---
title: "تسجيل البيانات من العقود الذكية باستخدام الأحداث"
description: "مقدمة عن أحداث العقود الذكية وكيفية استخدامها لتسجيل البيانات"
author: "jdourlens"
tags:
  - العقود الذكية
  - remix
  - solidity
  - الأحداث
skill: intermediate
breadcrumb: "تسجيل الأحداث"
lang: ar
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في Solidity، [الأحداث](/developers/docs/smart-contracts/anatomy/#events-and-logs) هي إشارات مُرسلة يمكن للعقود الذكية إطلاقها. يمكن للتطبيقات اللامركزية (dapps)، أو أي شيء متصل بـ <span dir="ltr">JSON-RPC API</span> الخاص بإيثيريوم، الاستماع إلى هذه الأحداث والتصرف بناءً عليها. يمكن أيضًا فهرسة الحدث بحيث يمكن البحث في سجل الأحداث لاحقًا.

## الأحداث {#events}

أحد أكثر الأحداث شيوعًا على سلسلة الكتل لإيثيريوم هو حدث `Transfer` الذي يتم إطلاقه بواسطة رموز <span dir="ltr">ERC-20</span> عندما يقوم شخص ما بتحويل الرموز.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

يتم الإعلان عن توقيع الحدث داخل كود العقد ويمكن إطلاقه باستخدام الكلمة المفتاحية <span dir="ltr">emit</span>. على سبيل المثال، يسجل حدث التحويل من أرسل التحويل (_<span dir="ltr">from</span>_)، وإلى من (_<span dir="ltr">to</span>_)، ومقدار الرموز التي تم تحويلها (_<span dir="ltr">value</span>_).

دعونا نعود إلى العقد الذكي `Counter` من [نشر عقدك الذكي الأول](/developers/tutorials/deploying-your-first-smart-contract/) ونسجل كل مرة تتغير فيها القيمة. سيبدو الأمر هكذا:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // متغير عام من نوع عدد صحيح بدون إشارة لحفظ عدد التعدادات
    uint256 public count = 0;

    // دالة تقوم بزيادة العداد الخاص بنا
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // دالة جلب غير ضرورية للحصول على قيمة العد
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

لاحظ أن:

- **السطر 6**: نعلن عن حدثنا وما يحتويه، القيمة القديمة والقيمة الجديدة.

- **السطر 14**: عندما نقوم بزيادة متغير العداد الخاص بنا، نطلق الحدث.

إذا قمنا الآن بنشر العقد واستدعاء دالة الزيادة، فسنرى أن Remix سيعرضه تلقائيًا إذا نقرت على المعاملة الجديدة داخل مصفوفة تسمى <span dir="ltr">logs</span>.

![لقطة شاشة لـ Remix](./remix-screenshot.png)

تعتبر السجلات مفيدة حقًا لتصحيح أخطاء عقودك الذكية ولكنها مهمة أيضًا إذا كنت تبني تطبيقات يستخدمها أشخاص مختلفون وتجعل من السهل إجراء تحليلات لتتبع وفهم كيفية استخدام عقدك الذكي. يتم عرض السجلات الناتجة عن المعاملات في مستكشفات الكتل الشائعة ويمكنك أيضًا على سبيل المثال استخدامها لإنشاء نصوص برمجية خارج السلسلة للاستماع إلى أحداث معينة واتخاذ إجراء عند حدوثها.
