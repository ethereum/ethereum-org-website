---
title: "واجهات تطبيقات ثنائية قصيرة لتحسين بيانات الاستدعاء"
description: "تحسين العقود الذكية من أجل الرول أب التفاؤلي"
author: Ori Pomerantz
lang: ar
tags: [ "الطبقة الثانية" ]
skill: intermediate
published: 2022-04-01
---

## مقدمة {#introduction}

في هذا المقال، ستتعرف على [الرول أب التفاؤلي](/developers/docs/scaling/optimistic-rollups)، وتكلفة المعاملات عليها، وكيف يتطلب هيكل التكلفة المختلف هذا تحسين أشياء مختلفة عن تلك الموجودة على شبكة إيثريوم الرئيسية.
ستتعلم أيضًا كيفية تنفيذ هذا التحسين.

### إفصاح كامل {#full-disclosure}

أنا موظف بدوام كامل في [Optimism](https://www.optimism.io/)، لذا فإن الأمثلة في هذا المقال سيتم تشغيلها على Optimism.
ومع ذلك، يجب أن تعمل التقنية الموضحة هنا بشكل جيد مع حلول الرول أب الأخرى.

### المصطلحات {#terminology}

عند مناقشة حلول الرول أب، يتم استخدام مصطلح 'الطبقة الأولى' (L1) للإشارة إلى الشبكة الرئيسية، شبكة إيثريوم الإنتاجية.
يُستخدم مصطلح 'الطبقة الثانية' (L2) للإشارة إلى الرول أب أو أي نظام آخر يعتمد على الطبقة الأولى L1 في الأمان ولكنه يقوم بمعظم معالجته خارج السلسلة.

## كيف يمكننا تقليل تكلفة معاملات الطبقة الثانية L2 بشكل أكبر؟ {#how-can-we-further-reduce-the-cost-of-L2-transactions}

يجب على [الرول أب التفاؤلي](/developers/docs/scaling/optimistic-rollups) الاحتفاظ بسجل لكل معاملة تاريخية حتى يتمكن أي شخص من مراجعتها والتحقق من صحة الحالة الحالية.
أرخص طريقة لإدخال البيانات إلى شبكة إيثريوم الرئيسية هي كتابتها كبيانات استدعاء.
تم اختيار هذا الحل من قبل كل من [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) و[Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### تكلفة معاملات الطبقة الثانية L2 {#cost-of-l2-transactions}

تتكون تكلفة معاملات الطبقة الثانية L2 من مكونين:

1. معالجة الطبقة الثانية L2، والتي عادة ما تكون رخيصة للغاية
2. تخزين الطبقة الأولى L1، وهو مرتبط بتكاليف غاز الشبكة الرئيسية

في وقت كتابة هذا التقرير، تبلغ تكلفة غاز الطبقة الثانية L2 على Optimism 0.001 [Gwei](/developers/docs/gas/#pre-london).
من ناحية أخرى، تبلغ تكلفة غاز الطبقة الأولى L1 حوالي 40 غوي.
[يمكنك رؤية الأسعار الحالية هنا](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

يكلف بايت بيانات الاستدعاء إما 4 غاز (إذا كان صفرًا) أو 16 غاز (إذا كان أي قيمة أخرى).
تعتبر الكتابة إلى التخزين إحدى أغلى العمليات على آلة إيثريوم الافتراضية (EVM).
الحد الأقصى لتكلفة كتابة كلمة بحجم 32 بايت إلى التخزين على الطبقة الثانية L2 هو 22100 غاز. حاليًا، هذا يعادل 22.1 غوي.
لذلك إذا تمكنا من توفير بايت صفري واحد من بيانات الاستدعاء، فسنكون قادرين على كتابة حوالي 200 بايت في التخزين وسنظل متقدمين.

### واجهة التطبيق الثنائية (ABI) {#the-abi}

تتم الغالبية العظمى من المعاملات من خلال حساب مملوك خارجيًا.
تتم كتابة معظم العقود بلغة Solidity وتفسر حقل بياناتها وفقًا لـ [واجهة التطبيق الثنائية (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

ومع ذلك، تم تصميم واجهة التطبيق الثنائية (ABI) للطبقة الأولى L1، حيث يكلف بايت من بيانات الاستدعاء نفس تكلفة أربع عمليات حسابية تقريبًا، وليس للطبقة الثانية L2 حيث يكلف بايت من بيانات الاستدعاء أكثر من ألف عملية حسابية.
يتم تقسيم بيانات الاستدعاء على النحو التالي:

| القسم        | الطول |  بايت | بايتات مهدرة | غاز مهدر | بايتات ضرورية | غاز ضروري |
| ------------ | ----: | ----: | -----------: | -------: | ------------: | --------: |
| محدد الوظيفة |     4 |   0-3 |            3 |       48 |             ١ |        16 |
| الأصفار      |    12 |  4-15 |           12 |       48 |             0 |         0 |
| عنوان الوجهة |    20 | 16-35 |            0 |        0 |            20 |       320 |
| المبلغ       |    32 | 36-67 |           17 |       64 |            15 |       240 |
| الإجمالي     |    68 |       |              |      160 |               |       576 |

توضيح:

- **محدد الوظيفة**: يحتوي العقد على أقل من 256 وظيفة، لذا يمكننا تمييزها ببايت واحد.
  عادة ما تكون هذه البايتات غير صفرية وبالتالي [تكلف ستة عشر غازًا](https://eips.ethereum.org/EIPS/eip-2028).
- **الأصفار**: هذه البايتات هي دائمًا صفر لأن عنوانًا من عشرين بايت لا يتطلب كلمة من اثنين وثلاثين بايت للاحتفاظ به.
  البايتات التي تحمل القيمة صفر تكلف أربعة غاز ([انظر الورقة الصفراء](https://ethereum.github.io/yellowpaper/paper.pdf)، الملحق G،
  ص. 27، القيمة لـ `G`<sub>`txdatazero`</sub>).
- **المبلغ**: إذا افترضنا أن `decimals` في هذا العقد هي ثمانية عشر (القيمة العادية) وأن الحد الأقصى لكمية الرموز التي سنقوم بتحويلها هو 10<sup>18</sup>، فسنحصل على مبلغ أقصى قدره 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>، لذا فإن خمسة عشر بايتًا كافية.

عادة ما يكون إهدار 160 غازًا على الطبقة الأولى L1 ضئيلًا. تكلف المعاملة ما لا يقل عن [21,000 غاز](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)، لذا فإن 0.8% إضافية لا تهم.
لكن، في الطبقة الثانية L2، تختلف الأمور. تتمثل تكلفة المعاملة بأكملها تقريبًا في كتابتها على الطبقة الأولى L1.
بالإضافة إلى بيانات استدعاء المعاملة، هناك 109 بايت من رأس المعاملة (عنوان الوجهة، التوقيع، إلخ).
لذلك، فإن التكلفة الإجمالية هي `109*16+576+160=2480`، ونحن نهدر حوالي 6.5٪ من ذلك.

## تقليل التكاليف عندما لا تتحكم في الوجهة {#reducing-costs-when-you-dont-control-the-destination}

بافتراض أنك لا تملك السيطرة على عقد الوجهة، لا يزال بإمكانك استخدام حل مشابه لـ [هذا الحل](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
دعنا نراجع الملفات ذات الصلة.

### Token.sol {#token-sol}

[هذا هو عقد الوجهة](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
إنه عقد ERC-20 قياسي، مع ميزة إضافية واحدة.
تتيح وظيفة `faucet` هذه لأي مستخدم الحصول على بعض الرموز لاستخدامها.
قد يجعل هذا عقد ERC-20 الإنتاجي عديم الفائدة، ولكنه يسهل الحياة عندما يوجد عقد ERC-20 فقط لتسهيل الاختبار.

```solidity
    /**
     * @dev يمنح المتصل 1000 رمز للتعامل بها
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[هذا هو العقد الذي من المفترض أن تستدعيه المعاملات باستخدام بيانات استدعاء أقصر](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
دعنا نراجعه سطراً بسطر.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

نحتاج إلى وظيفة الرمز لمعرفة كيفية استدعائها.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

عنوان الرمز الذي نعمل كوكيل له.

```solidity
    /**
     * @dev تحديد عنوان الرمز
     * @param tokenAddr_ عنوان عقد ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

عنوان الرمز هو المعلمة الوحيدة التي نحتاج إلى تحديدها.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

اقرأ قيمة من بيانات الاستدعاء.

```solidity
        require(length < 0x21,
            "حد طول calldataVal هو 32 بايت");

        require(length + startByte <= msg.data.length,
            "تحاول calldataVal القراءة بعد حجم بيانات الاستدعاء");
```

سنقوم بتحميل كلمة واحدة بحجم 32 بايت (256 بت) إلى الذاكرة وإزالة البايتات التي ليست جزءًا من الحقل الذي نريده.
لا تعمل هذه الخوارزمية مع القيم التي يزيد طولها عن 32 بايت، وبالطبع لا يمكننا القراءة بعد نهاية بيانات الاستدعاء.
قد يكون من الضروري على الطبقة الأولى L1 تخطي هذه الاختبارات لتوفير الغاز، ولكن على الطبقة الثانية L2 يكون الغاز رخيصًا للغاية، مما يتيح أي فحوصات سلامة يمكننا التفكير فيها.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

كان بإمكاننا نسخ البيانات من الاستدعاء إلى `fallback()` (انظر أدناه)، ولكن من الأسهل استخدام [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)، لغة التجميع الخاصة بآلة إيثريوم الافتراضية (EVM).

هنا نستخدم [رمز التشغيل CALLDATALOAD](https://www.evm.codes/#35) لقراءة البايتات من `startByte` إلى `startByte+31` في المكدس.
بشكل عام، صيغة رمز التشغيل في Yul هي `<اسم رمز التشغيل>(<قيمة المكدس الأولى، إن وجدت>، <قيمة المكدس الثانية، إن وجدت>...)`.

```solidity
        _retVal = _retVal >> (256-length*8);
```

فقط البايتات `length` الأكثر أهمية هي جزء من الحقل، لذلك نقوم بـ[الإزاحة إلى اليمين](https://en.wikipedia.org/wiki/Logical_shift) للتخلص من القيم الأخرى.
هذا له ميزة إضافية تتمثل في نقل القيمة إلى يمين الحقل، لذلك هي القيمة نفسها بدلاً من القيمة مضروبة في 256<sup>شيء ما</sup>.

```solidity
        return _retVal;
    }


    fallback() external {
```

عندما لا يتطابق استدعاء عقد Solidity مع أي من توقيعات الوظائف، فإنه يستدعي [وظيفة `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (بافتراض وجود واحدة).
في حالة `CalldataInterpreter`، يصل _أي_ استدعاء إلى هنا لأنه لا توجد وظائف `external` أو `public` أخرى.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

اقرأ البايت الأول من بيانات الاستدعاء، والذي يخبرنا بالوظيفة.
هناك سببان لعدم توفر وظيفة هنا:

1. الوظائف التي تكون `pure` أو `view` لا تغير الحالة ولا تكلف غازًا (عند استدعائها خارج السلسلة).
   لا معنى لمحاولة تقليل تكلفة الغاز.
2. الوظائف التي تعتمد على [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   ستكون قيمة `msg.sender` هي عنوان `CalldataInterpreter`، وليس المتصل.

للأسف، [بالنظر إلى مواصفات ERC-20](https://eips.ethereum.org/EIPS/eip-20)، هذا يترك وظيفة واحدة فقط، وهي `transfer`.
هذا يترك لنا وظيفتين فقط: `transfer` (لأننا يمكن أن نستدعي `transferFrom`) و`faucet` (لأننا يمكننا تحويل الرموز مرة أخرى إلى من اتصل بنا).

```solidity
        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

استدعاء `faucet()`، والتي لا تحتوي على معاملات.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

بعد استدعاء `token.faucet()` نحصل على الرموز. ومع ذلك، كعقد وكيل، نحن لا **نحتاج** إلى رموز.
الحساب الخارجي (EOA) أو العقد الذي استدعانا هو الذي يحتاجها.
لذا نقوم بتحويل جميع رموزنا إلى من استدعانا.

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

يتطلب تحويل الرموز معلمتين: عنوان الوجهة والمبلغ.

```solidity
            token.transferFrom(
                msg.sender,
```

نحن نسمح فقط للمتصلين بتحويل الرموز التي يمتلكونها

```solidity
                address(uint160(calldataVal(1, 20))),
```

يبدأ عنوان الوجهة عند البايت رقم 1 (البايت رقم 0 هو الوظيفة).
كعنوان، يبلغ طوله 20 بايت.

```solidity
                calldataVal(21, 2)
```

بالنسبة لهذا العقد المحدد، نفترض أن الحد الأقصى لعدد الرموز التي قد يرغب أي شخص في تحويلها يتناسب مع اثنين بايت (أقل من 65536).

```solidity
            );
        }
```

بشكل عام، يستغرق التحويل 35 بايت من بيانات الاستدعاء:

| القسم        | الطول |  بايت |
| ------------ | ----: | ----: |
| محدد الوظيفة |     ١ |     0 |
| عنوان الوجهة |    32 |  1-32 |
| المبلغ       |     2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[يوضح لنا اختبار الوحدة هذا بلغة JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) كيفية استخدام هذه الآلية (وكيفية التحقق من أنها تعمل بشكل صحيح).
سأفترض أنك تفهم [chai](https://www.chaijs.com/) و[ethers](https://docs.ethers.io/v5/) وسأشرح فقط الأجزاء التي تنطبق بشكل خاص على العقد.

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
    // Get tokens to play with
    const faucetTx = {
```

لا يمكننا استخدام الوظائف عالية المستوى التي نستخدمها عادةً (مثل `token.faucet()`) لإنشاء معاملات، لأننا لا نتبع واجهة التطبيق الثنائية (ABI).
بدلاً من ذلك، يتعين علينا بناء المعاملة بأنفسنا ثم إرسالها.

```javascript
      to: cdi.address,
      data: "0x01"
```

هناك معلمتان نحتاج إلى توفيرهما للمعاملة:

1. `to`، عنوان الوجهة.
   هذا هو عقد مترجم بيانات الاستدعاء.
2. `data`، بيانات الاستدعاء المراد إرسالها.
   في حالة استدعاء السبيل (faucet)، تكون البيانات بايت واحد، `0x01`.

```javascript
    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

نستدعي [طريقة `sendTransaction` الخاصة بالموقع](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) لأننا حددنا بالفعل الوجهة (`faucetTx.to`) ونحتاج إلى توقيع المعاملة.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

هنا نتحقق من الرصيد.
ليست هناك حاجة لتوفير الغاز في وظائف `view`، لذلك نقوم بتشغيلها بشكل طبيعي.

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

امنح مترجم بيانات الاستدعاء بدلًا ليكون قادرًا على إجراء التحويلات.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

إنشاء معاملة تحويل. البايت الأول هو "0x02"، يليه عنوان الوجهة، وأخيرًا المبلغ (0x0100، وهو 256 بالنظام العشري).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## تقليل التكلفة عندما تتحكم في عقد الوجهة {#reducing-the-cost-when-you-do-control-the-destination-contract}

إذا كان لديك سيطرة على عقد الوجهة، يمكنك إنشاء وظائف تتجاوز فحوصات `msg.sender` لأنها تثق في مترجم بيانات الاستدعاء.
[يمكنك رؤية مثال على كيفية عمل ذلك هنا، في فرع `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

إذا كان العقد يستجيب فقط للمعاملات الخارجية، فيمكننا الاكتفاء بوجود عقد واحد فقط.
ومع ذلك، فإن ذلك من شأنه أن يكسر [قابلية التركيب](/developers/docs/smart-contracts/composability/).
من الأفضل بكثير أن يكون لديك عقد يستجيب لاستدعاءات ERC-20 العادية، وعقد آخر يستجيب للمعاملات ذات بيانات الاستدعاء القصيرة.

### Token.sol {#token-sol-2}

في هذا المثال يمكننا تعديل `Token.sol`.
يتيح لنا هذا الحصول على عدد من الوظائف التي لا يجوز استدعاؤها إلا من قبل الوكيل.
فيما يلي الأجزاء الجديدة:

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

يحتاج عقد ERC-20 إلى معرفة هوية الوكيل المعتمد.
ومع ذلك، لا يمكننا تعيين هذا المتغير في المُنشئ، لأننا لا نعرف القيمة بعد.
يتم إنشاء هذا العقد أولاً لأن الوكيل يتوقع عنوان الرمز في مُنشئه.

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

يتم تخزين عنوان المنشئ (يسمى `owner`) هنا لأنه العنوان الوحيد المسموح له بتعيين الوكيل.

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

يتمتع الوكيل بوصول مميز، لأنه يمكنه تجاوز فحوصات الأمان.
للتأكد من أننا نستطيع الوثوق بالوكيل، فإننا نسمح فقط للمالك `owner` باستدعاء هذه الوظيفة، ومرة واحدة فقط.
بمجرد أن يكون للوكيل `proxy` قيمة حقيقية (ليست صفرًا)، لا يمكن تغيير هذه القيمة، لذلك حتى إذا قرر المالك أن يصبح مارقًا، أو تم الكشف عن العبارة الأولية الخاصة به، فإننا ما زلنا آمنين.

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

هذه وظيفة [`modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)، وهي تعدل طريقة عمل الوظائف الأخرى.

```solidity
      require(msg.sender == proxy);
```

أولاً، تحقق من أننا تلقينا اتصالاً من الوكيل وليس من أي شخص آخر.
إذا لم يكن كذلك، `revert`.

```solidity
      _;
    }
```

إذا كان الأمر كذلك، قم بتشغيل الوظيفة التي نعدلها.

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

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

هذه ثلاث عمليات تتطلب عادةً أن تأتي الرسالة مباشرةً من الكيان الذي يقوم بتحويل الرموز أو الموافقة على البدل.
هنا لدينا إصدار وكيل لهذه العمليات والذي:

1. يتم تعديله بواسطة `onlyProxy()` حتى لا يُسمح لأي شخص آخر بالتحكم فيه.
2. يحصل على العنوان الذي سيكون عادةً `msg.sender` كمعلمة إضافية.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

يكاد يكون مترجم بيانات الاستدعاء مطابقًا للمترجم أعلاه، باستثناء أن الوظائف الوكيلة تتلقى معلمة `msg.sender` وليست هناك حاجة إلى بدل لـ `transfer`.

```solidity
        // transfer (no need for allowance)
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

نحن بحاجة إلى إخبار عقد ERC-20 بالوكيل الذي يجب الوثوق به

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

للتحقق من `approve()` و`transferFrom()` نحتاج إلى موقع ثانٍ.
نطلق عليه اسم `poorSigner` لأنه لا يحصل على أي من رموزنا (يحتاج إلى أن يكون لديه ETH، بالطبع).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

نظرًا لأن عقد ERC-20 يثق في الوكيل (`cdi`)، فإننا لا نحتاج إلى بدل لترحيل التحويلات.

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

اختبر الوظيفتين الجديدتين.
لاحظ أن `transferFromTx` يتطلب معلمتين للعنوان: مانح البدل والمستلم.

## الخلاصة {#conclusion}

يبحث كل من [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) و[Arbitrum](https://developer.offchainlabs.com/docs/special_features) عن طرق لتقليل حجم بيانات الاستدعاء المكتوبة على L1 وبالتالي تكلفة المعاملات.
ومع ذلك، كمقدمي خدمات البنية التحتية الذين يبحثون عن حلول عامة، فإن قدراتنا محدودة.
كمطور للتطبيقات اللامركزية، لديك معرفة خاصة بالتطبيق، مما يتيح لك تحسين بيانات الاستدعاء بشكل أفضل بكثير مما يمكننا القيام به في حل عام.
نأمل أن يساعدك هذا المقال في العثور على الحل الأمثل لاحتياجاتك.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).

