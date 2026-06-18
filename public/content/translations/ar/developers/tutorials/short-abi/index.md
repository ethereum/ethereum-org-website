---
title: "واجهات ⁦ABIs⁩ القصيرة لتحسين بيانات الاستدعاء"
description: "تحسين العقود الذكية لتجميعات ⁦Optimistic⁩"
author: "أوري بوميرانتس"
lang: ar
tags:
  - طبقة 2 (L2)
skill: intermediate
breadcrumb: "واجهات ⁦ABIs⁩ القصيرة"
published: 2022-04-01
---

## مقدمة {#introduction}

في هذه المقالة، ستتعرف على [تجميعات ⁦Optimistic⁩](/developers/docs/scaling/optimistic-rollups)، وتكلفة المعاملات عليها، وكيف يتطلب منا هيكل التكلفة المختلف هذا تحسين أشياء مختلفة عما هو موجود على شبكة إيثيريوم الرئيسية.
ستتعلم أيضًا كيفية تنفيذ هذا التحسين.

### إفصاح كامل {#full-disclosure}

أنا موظف بدوام كامل في [أوبتيميزم](https://www.optimism.io/)، لذا فإن الأمثلة في هذه المقالة ستعمل على أوبتيميزم.
ومع ذلك، فإن التقنية المشروحة هنا يجب أن تعمل بنفس الكفاءة مع التجميعات الأخرى.

### المصطلحات {#terminology}

عند مناقشة التجميعات، يُستخدم مصطلح 'طبقة 1 (L1)' للإشارة إلى الشبكة الرئيسية، وهي شبكة إيثيريوم الإنتاجية.
يُستخدم مصطلح 'طبقة 2 (L2)' للإشارة إلى التجميع أو أي نظام آخر يعتمد على طبقة 1 (L1) في الأمان ولكنه يقوم بمعظم معالجته خارج السلسلة.

## كيف يمكننا تقليل تكلفة معاملات طبقة 2 (L2) بشكل أكبر؟ {#how-can-we-further-reduce-the-cost-of-l2-transactions}

يجب أن تحتفظ [تجميعات ⁦Optimistic⁩](/developers/docs/scaling/optimistic-rollups) بسجل لكل معاملة تاريخية حتى يتمكن أي شخص من مراجعتها والتحقق من أن الحالة الحالية صحيحة.
أرخص طريقة لإدخال البيانات إلى شبكة إيثيريوم الرئيسية هي كتابتها كبيانات الاستدعاء.
تم اختيار هذا الحل من قبل كل من [أوبتيميزم](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) و[أربيتروم](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### تكلفة معاملات طبقة 2 (L2) {#cost-of-l2-transactions}

تتكون تكلفة معاملات طبقة 2 (L2) من مكونين:

1. معالجة طبقة 2 (L2)، والتي عادة ما تكون رخيصة للغاية
2. تخزين طبقة 1 (L1)، والذي يرتبط بتكاليف غاز الشبكة الرئيسية

أثناء كتابتي لهذا، تبلغ تكلفة غاز طبقة 2 (L2) على أوبتيميزم <span dir="ltr">0.001</span> [Gwei](/developers/docs/gas/#pre-london).
من ناحية أخرى، تبلغ تكلفة غاز طبقة 1 (L1) حوالي <span dir="ltr">40 gwei</span>.
[يمكنك رؤية الأسعار الحالية هنا](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

تبلغ تكلفة البايت الواحد من بيانات الاستدعاء إما <span dir="ltr">4</span> غاز (إذا كان صفرًا) أو <span dir="ltr">16</span> غاز (إذا كان أي قيمة أخرى).
تعد الكتابة في التخزين واحدة من أغلى العمليات على جهاز إيثيريوم الظاهري (EVM).
الحد الأقصى لتكلفة كتابة كلمة بحجم <span dir="ltr">32-byte</span> في التخزين على طبقة 2 (L2) هو <span dir="ltr">22,100</span> غاز. حاليًا، هذا يعادل <span dir="ltr">22.1 gwei</span>.
لذا، إذا تمكنا من توفير بايت صفري واحد من بيانات الاستدعاء، فسنتمكن من كتابة حوالي <span dir="ltr">200</span> بايت في التخزين مع الاستمرار في تحقيق مكاسب.

### واجهة برمجة التطبيقات (ABI) {#the-abi}

تصل الغالبية العظمى من المعاملات إلى عقد من حساب مملوك خارجيًا.
تُكتب معظم العقود بلغة Solidity وتفسر حقل بياناتها وفقًا لـ [واجهة التطبيق الثنائية (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

ومع ذلك، تم تصميم واجهة ⁦ABI⁩ لطبقة 1 (L1)، حيث تكلف بايت واحد من بيانات الاستدعاء تقريبًا نفس تكلفة أربع عمليات حسابية، وليس لطبقة 2 (L2) حيث تكلف بايت واحد من بيانات الاستدعاء أكثر من ألف عملية حسابية.
تُقسم بيانات الاستدعاء على النحو التالي:

| القسم | الطول | البايتات | البايتات المهدرة | الغاز المهدر | البايتات الضرورية | الغاز الضروري |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| محدد الدالة |      4 |   0-3 |            3 |         48 |               1 |            16 |
| الأصفار |     12 |  4-15 |           12 |         48 |               0 |             0 |
| عنوان الوجهة |     20 | 16-35 |            0 |          0 |              20 |           320 |
| المبلغ |     32 | 36-67 |           17 |         64 |              15 |           240 |
| الإجمالي |     68 |       |              |        160 |                 |           576 |

الشرح:

- **محدد الدالة**: يحتوي العقد على أقل من <span dir="ltr">256</span> دالة، لذا يمكننا التمييز بينها باستخدام بايت واحد.
  عادةً ما تكون هذه البايتات غير صفرية وبالتالي [تكلف ستة عشر غازًا](https://eips.ethereum.org/EIPS/eip-2028).
- **الأصفار**: هذه البايتات دائمًا ما تكون صفرًا لأن العنوان المكون من عشرين بايت لا يتطلب كلمة مكونة من اثنين وثلاثين بايت لاحتوائه.
  البايتات التي تحتوي على صفر تكلف أربعة غاز ([انظر الورقة الصفراء](https://ethereum.github.io/yellowpaper/paper.pdf)، الملحق G، ص 27، قيمة `G`<sub>`txdatazero`</sub>).
- **المبلغ**: إذا افترضنا أن `decimals` في هذا العقد هو ثمانية عشر (القيمة العادية) وأن الحد الأقصى لعدد الرموز المميزة التي نقوم بتحويلها سيكون <span dir="ltr">10<sup>18</sup></span>، فسنحصل على حد أقصى قدره <span dir="ltr">10<sup>36</sup></span>.
  <span dir="ltr">256<sup>15</sup> &gt; 10<sup>36</sup></span>، لذا فإن خمسة عشر بايتًا كافية.

عادةً ما يكون إهدار <span dir="ltr">160</span> غاز على طبقة 1 (L1) ضئيلًا. تكلف المعاملة ما لا يقل عن [<span dir="ltr">21,000</span> غاز](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)، لذا فإن زيادة بنسبة <span dir="ltr">0.8%</span> لا تهم.
ومع ذلك، تختلف الأمور على طبقة 2 (L2). حيث أن التكلفة الإجمالية للمعاملة تقريبًا تكمن في كتابتها على طبقة 1 (L1).
بالإضافة إلى بيانات الاستدعاء الخاصة بالمعاملة، هناك <span dir="ltr">109</span> بايت من ترويسة المعاملة (عنوان الوجهة، التوقيع، إلخ).
وبالتالي فإن التكلفة الإجمالية هي `109*16+576+160=2480`، ونحن نهدر حوالي <span dir="ltr">6.5%</span> من ذلك.

## تقليل التكاليف عندما لا تتحكم في الوجهة {#reducing-costs-when-you-dont-control-the-destination}

بافتراض أنك لا تتحكم في عقد الوجهة، لا يزال بإمكانك استخدام حل مشابه لـ [هذا الحل](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
دعونا نراجع الملفات ذات الصلة.

### Token.sol {#token-sol}

[هذا هو عقد الوجهة](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
إنه عقد <span dir="ltr">ERC-20</span> قياسي، مع ميزة إضافية واحدة.
تتيح دالة `faucet` هذه لأي مستخدم الحصول على بعض الرموز المميزة لاستخدامها.
من شأن ذلك أن يجعل عقد <span dir="ltr">ERC-20</span> الإنتاجي عديم الفائدة، ولكنه يسهل الأمور عندما يكون عقد <span dir="ltr">ERC-20</span> موجودًا فقط لتسهيل الاختبار.

```solidity
    /**
     * @dev يمنح المستدعي 1000 رمز مميز للعب بها
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[هذا هو العقد الذي يُفترض أن تستدعيه المعاملات ببيانات استدعاء أقصر](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
دعونا نراجعه سطرًا بسطر.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

نحتاج إلى دالة الرمز المميز لمعرفة كيفية استدعائها.

```solidity
عقد CalldataInterpreter {

    OrisUselessToken public immutable token;
```

عنوان الرمز المميز الذي نعمل كوكيل له.

```solidity

    /**
     * @dev تحديد عنوان الرمز المميز
     * @param tokenAddr_ عنوان عقد ERC-20
     */
    مُنشئ(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

عنوان الرمز المميز هو المعلمة الوحيدة التي نحتاج إلى تحديدها.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

قراءة قيمة من بيانات الاستدعاء.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

سنقوم بتحميل كلمة واحدة بحجم <span dir="ltr">32-byte</span> (<span dir="ltr">256-bit</span>) إلى الذاكرة وإزالة البايتات التي ليست جزءًا من الحقل الذي نريده.
لا تعمل هذه الخوارزمية مع القيم التي يزيد طولها عن <span dir="ltr">32</span> بايت، وبالطبع لا يمكننا القراءة بعد نهاية بيانات الاستدعاء.
على طبقة 1 (L1)، قد يكون من الضروري تخطي هذه الاختبارات لتوفير الغاز، ولكن على طبقة 2 (L2) يكون الغاز رخيصًا للغاية، مما يتيح لنا إجراء أي فحوصات سلامة يمكننا التفكير فيها.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

كان بإمكاننا نسخ البيانات من الاستدعاء إلى `fallback()` (انظر أدناه)، ولكن من الأسهل استخدام [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)، وهي لغة التجميع الخاصة بجهاز إيثيريوم الظاهري (EVM).

هنا نستخدم [رمز التشغيل CALLDATALOAD](https://www.evm.codes/#35) لقراءة البايتات من `startByte` إلى `startByte+31` في المكدس.
بشكل عام، تكون صيغة رمز التشغيل في Yul هي `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

فقط البايتات `length` الأكثر أهمية هي جزء من الحقل، لذا نقوم بـ [الإزاحة لليمين](https://en.wikipedia.org/wiki/Logical_shift) للتخلص من القيم الأخرى.
يتميز هذا بميزة إضافية تتمثل في نقل القيمة إلى يمين الحقل، بحيث تصبح القيمة نفسها بدلاً من القيمة مضروبة في 256<sup>شيء ما</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

عندما لا يتطابق استدعاء لعقد Solidity مع أي من تواقيع الدوال، فإنه يستدعي [دالة `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (بافتراض وجود واحدة).
في حالة `CalldataInterpreter`، يصل _أي_ استدعاء إلى هنا لأنه لا توجد دوال `external` أو `public` أخرى.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

قراءة البايت الأول من بيانات الاستدعاء، والذي يخبرنا بالدالة.
هناك سببان لعدم توفر دالة هنا:

1. الدوال التي تكون `pure` أو `view` لا تغير الحالة ولا تكلف غازًا (عند استدعائها خارج السلسلة).
   ليس من المنطقي محاولة تقليل تكلفة الغاز الخاصة بها.
2. الدوال التي تعتمد على [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   ستكون قيمة `msg.sender` هي عنوان `CalldataInterpreter`، وليس المستدعي.

لسوء الحظ، [بالنظر إلى مواصفات <span dir="ltr">ERC-20</span>](https://eips.ethereum.org/EIPS/eip-20)، يترك هذا دالة واحدة فقط، وهي `transfer`.
هذا يترك لنا دالتين فقط: `transfer` (لأنه يمكننا استدعاء `transferFrom`) و `faucet` (لأنه يمكننا تحويل الرموز المميزة مرة أخرى إلى من استدعانا).

```solidity

        // استدعاء دوال تغيير حالة الرمز المميز باستخدام
        // المعلومات من بيانات الاستدعاء

        // faucet
        if (_func == 1) {
```

استدعاء لـ `faucet()`، والذي لا يحتوي على معلمات.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

بعد استدعاء `token.faucet()` نحصل على رموز مميزة. ومع ذلك، بصفتنا عقد وكيل، فإننا لا **نحتاج** إلى رموز مميزة.
الحساب المملوك خارجيًا (EOA) أو العقد الذي استدعانا هو من يحتاج إليها.
لذا نقوم بتحويل جميع رموزنا المميزة إلى من استدعانا.

```solidity
        // تحويل (بافتراض أن لدينا سماحية لذلك)
        if (_func == 2) {
```

يتطلب تحويل الرموز المميزة معلمتين: عنوان الوجهة والمبلغ.

```solidity
            token.transferFrom(
                msg.sender,
```

نحن نسمح للمستدعين فقط بتحويل الرموز المميزة التي يمتلكونها

```solidity
                address(uint160(calldataVal(1, 20))),
```

يبدأ عنوان الوجهة عند البايت رقم <span dir="ltr">1</span> (البايت رقم <span dir="ltr">0</span> هو الدالة).
كعنوان، يبلغ طوله <span dir="ltr">20</span> بايت.

```solidity
                calldataVal(21, 2)
```

بالنسبة لهذا العقد تحديدًا، نفترض أن الحد الأقصى لعدد الرموز المميزة التي قد يرغب أي شخص في تحويلها يتسع في بايتين (أقل من <span dir="ltr">65536</span>).

```solidity
            );
        }
```

بشكل عام، يستغرق التحويل <span dir="ltr">35</span> بايت من بيانات الاستدعاء:

| القسم | الطول | البايتات |
| ------------------- | -----: | ----: |
| محدد الدالة |      1 |     0 |
| عنوان الوجهة |     32 |  1-32 |
| المبلغ |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

يوضح لنا [اختبار الوحدة هذا بلغة JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) كيفية استخدام هذه الآلية (وكيفية التحقق من أنها تعمل بشكل صحيح).
سأفترض أنك تفهم [chai](https://www.chaijs.com/) و [ethers](https://docs.ethers.io/v5/) وسأشرح فقط الأجزاء التي تنطبق تحديدًا على العقد.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

نبدأ بنشر كلا العقدين.

```javascript
    // الحصول على رموز مميزة للعب بها
    const faucetTx = {
```

لا يمكننا استخدام الدوال عالية المستوى التي نستخدمها عادةً (مثل `token.faucet()`) لإنشاء المعاملات، لأننا لا نتبع واجهة ⁦ABI⁩.
بدلاً من ذلك، يتعين علينا بناء المعاملة بأنفسنا ثم إرسالها.

```javascript
      to: cdi.address,
      data: "0x01"
```

هناك معلمتان نحتاج إلى توفيرهما للمعاملة:

1. `to`، عنوان الوجهة.
   هذا هو عقد مفسر بيانات الاستدعاء.
2. `data`، بيانات الاستدعاء المراد إرسالها.
   في حالة استدعاء الصنبور، تكون البيانات عبارة عن بايت واحد، `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

نستدعي [طريقة `sendTransaction` الخاصة بالمُوقّع](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) لأننا حددنا الوجهة بالفعل (`faucetTx.to`) ونحتاج إلى توقيع المعاملة.

```javascript
// التحقق من أن faucet يوفر الرموز المميزة بشكل صحيح
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

هنا نتحقق من الرصيد.
ليست هناك حاجة لتوفير الغاز في دوال `view`، لذا نقوم بتشغيلها بشكل طبيعي.

```javascript
// إعطاء CDI سماحية (لا يمكن توكيل الموافقات)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

منح مفسر بيانات الاستدعاء سماحية ليتمكن من إجراء التحويلات.

```javascript
// تحويل الرموز المميزة
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

إنشاء معاملة تحويل. البايت الأول هو "<span dir="ltr">0x02</span>"، يليه عنوان الوجهة، وأخيرًا المبلغ (<span dir="ltr">0x0100</span>، وهو <span dir="ltr">256</span> بالنظام العشري).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // التحقق من أن لدينا 256 رمزاً مميزاً أقل
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // وأن وجهتنا قد حصلت عليها
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## تقليل التكلفة عندما تتحكم في عقد الوجهة {#reducing-the-cost-when-you-do-control-the-destination-contract}

إذا كنت تتحكم في عقد الوجهة، يمكنك إنشاء دوال تتجاوز فحوصات `msg.sender` لأنها تثق في مفسر بيانات الاستدعاء.
[يمكنك رؤية مثال على كيفية عمل ذلك هنا، في فرع `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

إذا كان العقد يستجيب فقط للمعاملات الخارجية، فيمكننا الاكتفاء بوجود عقد واحد فقط.
ومع ذلك، فإن ذلك من شأنه أن يكسر [قابلية التركيب](/developers/docs/smart-contracts/composability/).
من الأفضل بكثير أن يكون لديك عقد يستجيب لاستدعاءات <span dir="ltr">ERC-20</span> العادية، وعقد آخر يستجيب للمعاملات ذات بيانات الاستدعاء القصيرة.

### Token.sol {#token-sol-2}

في هذا المثال يمكننا تعديل `Token.sol`.
يتيح لنا هذا الحصول على عدد من الدوال التي لا يجوز إلا للوكيل استدعاؤها.
إليك الأجزاء الجديدة:

```solidity
    // العنوان الوحيد المسموح له بتحديد عنوان CalldataInterpreter
    address owner;

    // عنوان CalldataInterpreter
    address proxy = address(0);
```

يحتاج عقد <span dir="ltr">ERC-20</span> إلى معرفة هوية الوكيل المعتمد.
ومع ذلك، لا يمكننا تعيين هذا المتغير في المُنشئ، لأننا لا نعرف القيمة بعد.
يتم إنشاء مثيل لهذا العقد أولاً لأن الوكيل يتوقع عنوان الرمز المميز في المُنشئ الخاص به.

```solidity
    /**
     * @dev يستدعي مُنشئ ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

يتم تخزين عنوان المنشئ (المسمى `owner`) هنا لأن هذا هو العنوان الوحيد المسموح له بتعيين الوكيل.

```solidity
    /**
     * @dev تعيين العنوان للوكيل (CalldataInterpreter).
     * يمكن استدعاؤه مرة واحدة فقط من قبل المالك
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

يتمتع الوكيل بوصول متميز، لأنه يمكنه تجاوز الفحوصات الأمنية.
للتأكد من أنه يمكننا الوثوق بالوكيل، نسمح فقط لـ `owner` باستدعاء هذه الدالة، ولمرة واحدة فقط.
بمجرد أن يكون لـ `proxy` قيمة حقيقية (ليست صفرًا)، لا يمكن تغيير هذه القيمة، لذلك حتى لو قرر المالك أن يصبح مارقًا، أو تم الكشف عن العبارة التذكيرية الخاصة به، فإننا لا نزال في أمان.

```solidity
    /**
     * @dev بعض الدوال يمكن استدعاؤها فقط من قبل الوكيل.
     */
    modifier onlyProxy {
```

هذه [دالة `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)، وهي تعدل طريقة عمل الدوال الأخرى.

```solidity
      require(msg.sender == proxy);
```

أولاً، تحقق من أننا تلقينا استدعاءً من الوكيل وليس من أي شخص آخر.
إذا لم يكن الأمر كذلك، `revert`.

```solidity
      _;
    }
```

إذا كان الأمر كذلك، فقم بتشغيل الدالة التي نقوم بتعديلها.

```solidity
   /* الدوال التي تسمح للوكيل بالعمل كوكيل فعلي للحسابات */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

هذه ثلاث عمليات تتطلب عادةً أن تأتي الرسالة مباشرة من الكيان الذي يقوم بتحويل الرموز المميزة أو الموافقة على سماحية.
هنا لدينا نسخة وكيل من هذه العمليات والتي:

1. تم تعديلها بواسطة `onlyProxy()` بحيث لا يُسمح لأي شخص آخر بالتحكم فيها.
2. تحصل على العنوان الذي سيكون عادةً `msg.sender` كمعلمة إضافية.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

مفسر بيانات الاستدعاء مطابق تقريبًا للمفسر المذكور أعلاه، باستثناء أن الدوال الموكلة تتلقى معلمة `msg.sender` وليست هناك حاجة لسماحية لـ `transfer`.

```solidity
        // تحويل (لا حاجة إلى سماحية)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

هناك بعض التغييرات بين كود الاختبار السابق وهذا الكود.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

نحتاج إلى إخبار عقد <span dir="ltr">ERC-20</span> بالوكيل الذي يجب الوثوق به

```js
console.log("CalldataInterpreter addr:", cdi.address)

// نحتاج إلى موقعين للتحقق من السماحيات
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

للتحقق من `approve()` و `transferFrom()` نحتاج إلى مُوقّع ثانٍ.
نسميه `poorSigner` لأنه لا يحصل على أي من رموزنا المميزة (يحتاج إلى امتلاك ETH بالطبع).

```js
// تحويل الرموز المميزة
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

نظرًا لأن عقد <span dir="ltr">ERC-20</span> يثق في الوكيل (`cdi`)، فإننا لا نحتاج إلى سماحية لترحيل التحويلات.

```js
// الموافقة و transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// التحقق من أن مجموعة approve / transferFrom قد تمت بشكل صحيح
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

اختبار الدالتين الجديدتين.
لاحظ أن `transferFromTx` يتطلب معلمتي عنوان: مانح السماحية والمستلم.

## الخاتمة {#conclusion}

يبحث كل من [أوبتيميزم](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) و[أربيتروم](https://developer.offchainlabs.com/docs/special_features) عن طرق لتقليل حجم بيانات الاستدعاء المكتوبة على طبقة 1 (L1) وبالتالي تكلفة المعاملات.
ومع ذلك، بصفتنا مزودي بنية تحتية نبحث عن حلول عامة، فإن قدراتنا محدودة.
بصفتك مطور تطبيق لامركزي (dapp)، لديك معرفة خاصة بالتطبيق، مما يتيح لك تحسين بيانات الاستدعاء الخاصة بك بشكل أفضل بكثير مما يمكننا القيام به في حل عام.
نأمل أن تساعدك هذه المقالة في العثور على الحل المثالي لاحتياجاتك.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).