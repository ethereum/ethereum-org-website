---
title: اختبار عقد ذكي بسيط باستخدام مكتبة Waffle
description: دليل تعليمي للمبتدئين
author: Ewa Kowalska
tags: [ "العقود الذكيه ", "الصلابة", "Waffle", "الاختبار" ]
skill: beginner
lang: ar
published: 2021-02-26
---

## في هذا الدليل التعليمي ستتعلم كيفية {#in-this-tutorial-youll-learn-how-to}

- اختبار التغييرات في رصيد المحفظة
- اختبار إصدار الأحداث بوسائط محددة
- التأكيد على أنه تم عكس المعاملة

## الافتراضات {#assumptions}

- يمكنك إنشاء مشروع JavaScript أو TypeScript جديد
- لديك بعض الخبرة الأساسية في الاختبارات في JavaScript
- لقد استخدمت بعض مديري الحزم مثل yarn أو npm
- لديك معرفة أساسية جدًا بالعقود الذكية وSolidity

## البدء {#getting-started}

يوضح الدليل التعليمي إعداد الاختبار وتشغيله باستخدام yarn، ولكن لا توجد مشكلة إذا كنت تفضل npm - سأقدم مراجع مناسبة إلى [وثائق](https://ethereum-waffle.readthedocs.io/en/latest/index.html) Waffle الرسمية.

## تثبيت التبعيات {#install-dependencies}

[أضف](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) تبعيات ethereum-waffle وtypescript إلى تبعيات المطور لمشروعك.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## مثال على عقد ذكي {#example-smart-contract}

خلال الدليل التعليمي، سنعمل على مثال بسيط لعقد ذكي - EtherSplitter. لا يفعل الكثير بخلاف السماح لأي شخص بإرسال بعض الـ wei وتقسيمها بالتساوي بين مستلمين محددين مسبقًا.
تتطلب دالة التقسيم أن يكون عدد wei زوجيًا، وإلا فسيتم عكسها. لكلا المستلمين، يقوم بإجراء تحويل wei متبوعًا بإصدار حدث التحويل.

ضع مقتطف النص البرمجي EtherSplitter في `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## تجميع العقد {#compile-the-contract}

[لتجميع](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) العقد، أضف الإدخال التالي إلى ملف package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

بعد ذلك، قم بإنشاء ملف تكوين Waffle في الدليل الجذر للمشروع - `waffle.json` - ثم الصق التكوين التالي هناك:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

شغِّل `yarn build`. ونتيجة لذلك، سيظهر دليل `build` مع عقد EtherSplitter المجمّع بتنسيق JSON.

## إعداد الاختبار {#test-setup}

يتطلب الاختبار باستخدام Waffle استخدام متطابقات Chai وMocha، لذا تحتاج إلى [إضافتها](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) إلى مشروعك. حدّث ملف package.json الخاص بك وأضف إدخال `test` في جزء البرامج النصية:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

إذا كنت تريد [تنفيذ](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) اختباراتك، فما عليك سوى تشغيل `yarn test`.

## اختبار{#testing}

الآن قم بإنشاء دليل `test` وإنشاء الملف الجديد `test\EtherSplitter.test.ts`.
انسخ المقتطف أدناه والصقه في ملف الاختبار الخاص بنا.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // أضف الاختبارات هنا
})
```

بضع كلمات قبل أن نبدأ.
يأتي `MockProvider` مع إصدار وهمي من البلوكتشين. كما أنه يوفر محافظًا وهمية ستخدمنا في اختبار عقد EtherSplitter. يمكننا الحصول على ما يصل إلى عشر محافظ عن طريق استدعاء دالة `getWallets()` على الموفر. في هذا المثال، نحصل على ثلاث محافظ - للمرسل واثنين من المستلمين.

بعد ذلك، نعلن عن متغير يسمى 'splitter' - وهو عقد EtherSplitter الوهمي الخاص بنا. يتم إنشاؤه قبل كل تنفيذ لاختبار واحد بواسطة دالة `deployContract`. تحاكي هذه الدالة نشر عقد من المحفظة التي تم تمريرها كمعامل أول (محفظة المرسل في حالتنا). المعامل الثاني هو واجهة التطبيق الثنائية (ABI) والرمز الثانوي للعقد المختبَر - نمرر هناك ملف json الخاص بعقد EtherSplitter المجمّع من دليل `build`. المعامل الثالث هو مصفوفة تحتوي على وسائط مُنشئ العقد، والتي في حالتنا هي عنوانا المستلمين.

## changeBalances {#changebalances}

أولاً، سنتحقق مما إذا كانت دالة التقسيم تغير بالفعل أرصدة محافظ المستلمين. إذا قسمنا 50 wei من حساب المرسل، فإننا نتوقع أن تزيد أرصدة كلا المستلمين بمقدار 25 wei. سنستخدم متطابق `changeBalances` الخاص بـ Waffle:

```ts
it("تغيير أرصدة الحسابات", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

كمعامل أول للمتطابق، نمرر مصفوفة من محافظ المستلمين، وكثانٍ - مصفوفة من الزيادات المتوقعة في الحسابات المقابلة.
إذا أردنا التحقق من رصيد محفظة واحدة محددة، فيمكننا أيضًا استخدام متطابق `changeBalance`، الذي لا يتطلب تمرير مصفوفات، كما في المثال أدناه:

```ts
it("تغيير رصيد الحساب", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

لاحظ أنه في كلتا حالتي `changeBalance` و `changeBalances` نمرر دالة التقسيم كرد نداء لأن المتطابق يحتاج إلى الوصول إلى حالة الأرصدة قبل وبعد الاستدعاء.

بعد ذلك، سنختبر ما إذا كان حدث التحويل قد تم إصداره بعد كل عملية تحويل لـ wei. سنتحول إلى متطابق آخر من Waffle:

## Emit {#emit}

```ts
it("إصدار حدث عند التحويل إلى المستلم الأول", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("إصدار حدث عند التحويل إلى المستلم الثاني", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

يسمح لنا متطابق `emit` بالتحقق مما إذا كان العقد قد أصدر حدثًا عند استدعاء دالة. كمعاملات لمتطابق `emit`، فإننا نقدم العقد الوهمي الذي نتوقع أن يصدر الحدث، بالإضافة إلى اسم ذلك الحدث. في حالتنا، العقد الوهمي هو `splitter` واسم الحدث هو `Transfer`. يمكننا أيضًا التحقق من القيم الدقيقة للوسائط التي تم إصدار الحدث بها - نمرر أكبر عدد ممكن من الوسائط إلى متطابق `withArgs`، كما يتوقع إعلان الحدث الخاص بنا. في حالة عقد EtherSplitter، نمرر عناوين المرسل والمستلم مع كمية wei المنقولة.

## revertedWith {#revertedwith}

كمثال أخير، سنتحقق مما إذا كانت المعاملة قد عُكست في حالة وجود عدد غير زوجي من wei. سنستخدم متطابق `revertedWith`:

```ts
it("يتم عكس المعاملة عندما تكون كمية wei غير زوجية", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

الاختبار، إذا نجح، سيؤكد لنا أن المعاملة قد عُكست بالفعل. ومع ذلك، يجب أن يكون هناك أيضًا تطابق تام بين الرسائل التي مررناها في عبارة `require` والرسالة التي نتوقعها في `revertedWith`. إذا عدنا إلى النص البرمجي لعقد EtherSplitter، في عبارة `require` لمقدار wei، فإننا نقدم الرسالة: 'Uneven wei amount not allowed'. هذا يطابق الرسالة التي نتوقعها في اختبارنا. إذا لم يكونا متساويين، فسيفشل الاختبار.

## تهانينا! {#congratulations}

لقد خطوت خطوتك الأولى الكبيرة نحو اختبار العقود الذكية باستخدام Waffle!
