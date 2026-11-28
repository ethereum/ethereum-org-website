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

## كيف يمكننا تقليل تكلفة معاملات L2 بشكل أكبر؟ {#how-can-we-further-reduce-the-cost-of-l2-transactions}

يجب أن تحتفظ [تجميعات Optimistic](/developers/docs/scaling/optimistic-rollups) بسجل لكل معاملة تاريخية حتى يتمكن أي شخص من مراجعتها والتحقق من أن الحالة الحالية صحيحة.
عند كتابة هذه المقالة، كانت أرخص طريقة لإدخال البيانات إلى شبكة إيثيريوم الرئيسية هي كتابتها كبيانات الاستدعاء.
تم اختيار هذا الحل من قبل كل من [Optimism](https://docs.optimism.io/op-stack/protocol/overview) و [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
منذ ترقية دينكون (مارس <span dir="ltr">2024</span>)، يمكن للتجميعات نشر هذه البيانات في [كتل بيانات](/roadmap/danksharding/) بدلاً من ذلك، وهي أرخص بكثير.

### تكلفة معاملات L2 {#cost-of-l2-transactions}

تتكون تكلفة معاملات L2 من مكونين:

1. معالجة L2، والتي عادة ما تكون رخيصة للغاية
2. تخزين L1، والذي يرتبط بتكاليف غاز الشبكة الرئيسية

عندما كتبت هذه المقالة في عام <span dir="ltr">2022</span>، كانت تكلفة غاز L2 على Optimism تبلغ <span dir="ltr">0.001</span> [Gwei](/developers/docs/gas/#what-is-gas).
من ناحية أخرى، كانت تكلفة غاز L1 تقارب <span dir="ltr">40 Gwei</span>.

يكلف البايت الواحد من بيانات الاستدعاء إما <span dir="ltr">4</span> غاز (إذا كان صفرًا) أو <span dir="ltr">16</span> غاز (إذا كان أي قيمة أخرى).
تعد الكتابة في التخزين واحدة من أغلى العمليات على EVM.
الحد الأقصى لتكلفة كتابة كلمة بحجم <span dir="ltr">32</span> بايت في التخزين على L2 هو <span dir="ltr">22,100</span> غاز. في ذلك الوقت، كان هذا يعادل <span dir="ltr">22.1 Gwei</span>.
لذا، إذا تمكنا من توفير بايت صفري واحد من بيانات الاستدعاء، فسنتمكن من كتابة حوالي <span dir="ltr">200</span> بايت في التخزين مع الاستمرار في تحقيق وفورات.

#### كيف تغيرت تكاليف L2 في عام 2024 {#how-l2-costs-changed-in-2024}

تغيرت صيغة [رسوم بيانات L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) الخاصة بـ OP Stack مرتين منذ كتابة هذه المقالة:

- مع [ترقية Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (مارس <span dir="ltr">2024</span>)، بدأت سلاسل OP Stack في نشر بيانات المعاملة في كتل بيانات، والتي يتم تسعيرها بواسطة رسم أساسي منفصل لكتلة البيانات (وعادة ما يكون أقل بكثير).
- مع [ترقية Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (يوليو <span dir="ltr">2024</span>)، تعتمد رسوم بيانات L1 على تقدير لحجم المعاملة بعد ضغط [FastLZ](https://github.com/ariya/FastLZ)، بحد أدنى <span dir="ltr">100</span> بايت لكل معاملة ([انظر المواصفات](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

يغير هذا التحليل في بقية هذه المقالة بثلاث طرق:

1. يتم ضغط البايتات الصفرية بشكل جيد، لذا فهي شبه مجانية.
   الأرقام <span dir="ltr">4</span> و <span dir="ltr">16</span> غاز لكل بايت أدناه هي تكلفة بيانات الاستدعاء على L1، وليست ما تدفعه مقابل بيانات المعاملة على سلسلة OP Stack اليوم.
2. أقل من الحد الأدنى البالغ <span dir="ltr">100</span> بايت، لا توفر بيانات الاستدعاء الأقصر أي شيء.
   على سبيل المثال، في أكتوبر <span dir="ltr">2026</span> على شبكة OP الرئيسية، فإن `transfer` القياسي لـ <span dir="ltr">ERC-20</span> (<span dir="ltr">68</span> بايت من بيانات الاستدعاء) والنسخة القصيرة بحجم <span dir="ltr">23</span> بايت في هذه المقالة كانا سيدفعان نفس رسوم بيانات L1 بالضبط، وهو الحد الأدنى، حوالي <span dir="ltr">1 Gwei</span> (<span dir="ltr">10<sup>-9</sup> ETH</span>).
3. نظرًا لأن مساحة كتلة البيانات رخيصة، فإن رسوم تنفيذ L2 أصبحت الآن غالبًا أكبر من رسوم بيانات L1.
   عند سعر غاز L2 يبلغ <span dir="ltr">0.001 Gwei</span>، يكلف <span dir="ltr">1,000</span> غاز <span dir="ltr">1 Gwei</span>، وهو نفس رسوم بيانات L1 بالكامل، لذا فإن غاز التنفيذ الإضافي للمرور عبر عقد وكيل يمكن أن يكلف أكثر من البايتات التي يوفرها.

لا يزال المبدأ قائمًا: عدد أقل من البايتات المضغوطة يعني رسوم بيانات L1 أقل.
تكون واجهات ABI القصيرة أكثر منطقية للمعاملات التي تحتوي على الكثير من البيانات التي لا يتم ضغطها بشكل جيد، وعلى السلاسل أو في الأوقات التي تكون فيها بيانات L1 باهظة الثمن.
لمعرفة ما ستدفعه معاملة معينة، استدعِ `getL1Fee` على [النشر المسبق لـ `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) مع المعاملة غير الموقعة.
على سبيل المثال، باستخدام `cast` الخاص بـ [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

النتيجة بوحدة Wei.

### ABI {#the-abi}

تصل الغالبية العظمى من المعاملات إلى عقد من حساب مملوك خارجياً.
تُكتب معظم العقود بلغة Solidity وتفسر حقل البيانات الخاص بها وفقًا لـ [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

ومع ذلك، تم تصميم ABI لـ L1، حيث يكلف بايت واحد من بيانات الاستدعاء تقريبًا نفس تكلفة أربع عمليات حسابية، وليس لـ L2 حيث (بأسعار عام <span dir="ltr">2022</span>) يكلف بايت واحد من بيانات الاستدعاء أكثر من ألف عملية حسابية.
تنقسم بيانات الاستدعاء على النحو التالي:

| القسم | الطول | البايتات | البايتات المهدرة | الغاز المهدر | البايتات الضرورية | الغاز الضروري |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| محدد الدالة | <span dir="ltr">4</span> | <span dir="ltr">0-3</span> | <span dir="ltr">3</span> | <span dir="ltr">48</span> | <span dir="ltr">1</span> | <span dir="ltr">16</span> |
| الأصفار | <span dir="ltr">12</span> | <span dir="ltr">4-15</span> | <span dir="ltr">12</span> | <span dir="ltr">48</span> | <span dir="ltr">0</span> | <span dir="ltr">0</span> |
| عنوان الوجهة | <span dir="ltr">20</span> | <span dir="ltr">16-35</span> | <span dir="ltr">0</span> | <span dir="ltr">0</span> | <span dir="ltr">20</span> | <span dir="ltr">320</span> |
| المبلغ | <span dir="ltr">32</span> | <span dir="ltr">36-67</span> | <span dir="ltr">17</span> | <span dir="ltr">68</span> | <span dir="ltr">15</span> | <span dir="ltr">240</span> |
| الإجمالي | <span dir="ltr">68</span> | | | <span dir="ltr">164</span> | | <span dir="ltr">576</span> |

الشرح:

- **محدد الدالة**: يحتوي العقد على أقل من <span dir="ltr">256</span> دالة، لذا يمكننا التمييز بينها باستخدام بايت واحد.
  عادةً ما تكون هذه البايتات غير صفرية وبالتالي [تكلف ستة عشر غازًا](https://eips.ethereum.org/EIPS/eip-2028).
- **الأصفار**: هذه البايتات دائمًا ما تكون صفرًا لأن العنوان المكون من عشرين بايت لا يتطلب كلمة بحجم اثنين وثلاثين بايت لاحتوائه.
  البايتات التي تحتوي على صفر تكلف أربعة غاز ([انظر الورقة الصفراء](https://ethereum.github.io/yellowpaper/paper.pdf)، الملحق G،
  ص <span dir="ltr">27</span>، قيمة `G`<sub>`txdatazero`</sub>).
- **المبلغ**: إذا افترضنا أن `decimals` في هذا العقد هو ثمانية عشر (القيمة العادية) وأن الحد الأقصى لمبلغ الرموز المميزة التي نقوم بتحويلها سيكون <span dir="ltr">10<sup>18</sup></span>، فسنحصل على حد أقصى للمبلغ يبلغ <span dir="ltr">10<sup>36</sup></span>.
  <span dir="ltr">256<sup>15</sup> &gt; 10<sup>36</sup></span>، لذا فإن خمسة عشر بايتًا كافية.

عادة ما يكون إهدار <span dir="ltr">164</span> غاز على L1 ضئيلًا. تكلف المعاملة ما لا يقل عن [<span dir="ltr">21,000</span> غاز](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)، لذا فإن زيادة بنسبة <span dir="ltr">0.8%</span> لا تهم.
ومع ذلك، على L2 في عام <span dir="ltr">2022</span>، كانت الأمور مختلفة. كانت التكلفة الإجمالية للمعاملة تقريبًا هي كتابتها على L1.
بالإضافة إلى بيانات استدعاء المعاملة، هناك <span dir="ltr">109</span> بايت من ترويسة المعاملة (عنوان الوجهة، التوقيع، إلخ).
وبالتالي فإن التكلفة الإجمالية هي `109*16+576+164=2484`، ونحن نهدر حوالي <span dir="ltr">6.6%</span> من ذلك.

## تقليل التكاليف عندما لا تتحكم في الوجهة {#reducing-costs-when-you-dont-control-the-destination}

بافتراض أنك لا تتحكم في عقد الوجهة، فلا يزال بإمكانك استخدام حل مشابه لـ [هذا الحل](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

لتشغيله، تحتاج إلى [Node.js](https://nodejs.org/) و git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

ينشر الاختبار العقود على الشبكة المحلية المدمجة في Hardhat، لذا لا تحتاج إلى أي ETH.
يستخدم المستودع إصدار Hardhat <span dir="ltr">2.9</span>، لذا في الإصدارات الحالية من Node.js يحذر من أن إصدار Node.js الخاص بك غير مدعوم، ولكن الاختبار لا يزال ينجح.

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
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

عنوان الرمز المميز الذي نعمل كوكيل له.

```solidity

    /**
     * @dev تحديد عنوان الرمز المميز
     * @param tokenAddr_ عنوان عقد ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // مُنشئ
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

سنقوم بتحميل كلمة واحدة بحجم <span dir="ltr">32</span> بايت (<span dir="ltr">256</span> بت) إلى الذاكرة وإزالة البايتات التي ليست جزءًا من الحقل الذي نريده.
لا تعمل هذه الخوارزمية مع القيم التي يزيد طولها عن <span dir="ltr">32</span> بايت، وبالطبع لا يمكننا القراءة بعد نهاية بيانات الاستدعاء.
على L1، قد يكون من الضروري تخطي هذه الاختبارات لتوفير الغاز، ولكن على L2، الغاز رخيص للغاية، مما يتيح أي فحوصات سلامة يمكننا التفكير فيها.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

كان بإمكاننا نسخ البيانات من الاستدعاء إلى `fallback()` (انظر أدناه)، ولكن من الأسهل استخدام [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)، لغة التجميع الخاصة بـ EVM.

هنا نستخدم [رمز التشغيل CALLDATALOAD](https://www.evm.codes/#35) لقراءة البايتات من `startByte` إلى `startByte+31` في المكدس.
بشكل عام، تكون صيغة رمز التشغيل في Yul هي `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

فقط البايتات `length` الأكثر أهمية هي جزء من الحقل، لذا نقوم [بالإزاحة لليمين](https://en.wikipedia.org/wiki/Logical_shift) للتخلص من القيم الأخرى.
يتميز هذا بميزة إضافية تتمثل في نقل القيمة إلى يمين الحقل، بحيث تكون القيمة نفسها بدلاً من القيمة مضروبة في <span dir="ltr">256<sup>شيء ما</sup></span>.

```solidity

        return _retVal;
    }


    fallback() external {
```

عندما لا يتطابق استدعاء لعقد Solidity مع أي من توقيعات الدوال، فإنه يستدعي [دالة `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (بافتراض وجود واحدة).
في حالة `CalldataInterpreter`، يصل _أي_ استدعاء إلى هنا لعدم وجود دوال `external` أو `public` أخرى.

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

لسوء الحظ، [بالنظر إلى مواصفات <span dir="ltr">ERC-20</span>](https://eips.ethereum.org/EIPS/eip-20)، يترك هذا دالة قياسية واحدة فقط، وهي `transfer` (لأنه يمكننا استدعاء `transferFrom`).
يحتوي الرمز المميز الاختباري الخاص بنا أيضًا على `faucet`، والذي يمكننا دعمه لأنه يمكننا تحويل الرموز المميزة مرة أخرى إلى من استدعانا.

```solidity

        // استدعاء طرق تغيير حالة الرمز المميز باستخدام
        // المعلومات من بيانات الاستدعاء

        // صنبور
        if (_func == 1) {
```

استدعاء لـ `faucet()`، والذي لا يحتوي على معلمات.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

بعد أن نستدعي `token.faucet()` نحصل على رموز مميزة. ومع ذلك، بصفتنا عقد وكيل، فإننا لا **نحتاج** إلى رموز مميزة.
الحساب المملوك خارجياً (EOA) أو العقد الذي استدعانا هو من يحتاج إليها.
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

نسمح فقط للمستدعين بتحويل الرموز المميزة التي يمتلكونها

```solidity
                address(uint160(calldataVal(1, 20))),
```

يبدأ عنوان الوجهة عند البايت رقم <span dir="ltr">1</span> (البايت رقم <span dir="ltr">0</span> هو الدالة).
كعنوان، يبلغ طوله <span dir="ltr">20</span> بايت.

```solidity
                calldataVal(21, 2)
```

بالنسبة لهذا العقد بالذات، نفترض أن الحد الأقصى لعدد الرموز المميزة التي قد يرغب أي شخص في تحويلها يتسع في بايتين (أقل من <span dir="ltr">65,536</span>).

```solidity
            );
        }
```

بشكل عام، يستغرق التحويل <span dir="ltr">23</span> بايت من بيانات الاستدعاء:

| القسم | الطول | البايتات |
| ------------------- | -----: | ----: |
| محدد الدالة | <span dir="ltr">1</span> | <span dir="ltr">0</span> |
| عنوان الوجهة | <span dir="ltr">20</span> | <span dir="ltr">1-20</span> |
| المبلغ | <span dir="ltr">2</span> | <span dir="ltr">21-22</span> |

```solidity
    }   // احتياطي

}       // عقد CalldataInterpreter
```

### test.js {#test-js}

يوضح لنا [اختبار الوحدة هذا بلغة JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) كيفية استخدام هذه الآلية (وكيفية التحقق من أنها تعمل بشكل صحيح).
سأفترض أنك تفهم [chai](https://www.chaijs.com/) و [ethers](https://docs.ethers.org/v5/) وسأشرح فقط الأجزاء التي تنطبق تحديدًا على العقد.

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

نستدعي [طريقة `sendTransaction` الخاصة بالمُوقّع](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) لأننا حددنا الوجهة بالفعل (`faucetTx.to`) ونحتاج إلى توقيع المعاملة.

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

إذا كنت تتحكم في عقد الوجهة، فيمكنك إنشاء دوال تتجاوز فحوصات `msg.sender` لأنها تثق في مفسر بيانات الاستدعاء.
[يمكنك رؤية مثال على كيفية عمل ذلك هنا، في فرع `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
لتشغيله، قم بالتبديل إلى ذلك الفرع في المستودع الذي قمت باستنساخه سابقًا وقم بتشغيل الاختبار مرة أخرى:

```sh
git checkout control-contract
npx hardhat test
```

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

يقوم كل من [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) و [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) الآن بضغط البيانات التي يكتبانها على L1، وفرض رسوم على كل معاملة بناءً على حجمها المضغوط، لتقليل تكلفة المعاملات.
ومع ذلك، بصفتنا مزودي بنية تحتية نبحث عن حلول عامة، فإن قدراتنا محدودة.
بصفتك مطور dapp، لديك معرفة خاصة بالتطبيق، مما يتيح لك تحسين بيانات الاستدعاء الخاصة بك بشكل أفضل بكثير مما يمكننا القيام به في حل عام.
نأمل أن تساعدك هذه المقالة في العثور على الحل المثالي لاحتياجاتك.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).

