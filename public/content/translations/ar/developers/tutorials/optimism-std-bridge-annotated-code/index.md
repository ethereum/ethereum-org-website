---
title: "شرح تفصيلي لعقد جسر Optimism القياسي"
description: "كيف يعمل الجسر القياسي لـ Optimism؟ لماذا يعمل بهذه الطريقة؟"
author: Ori Pomerantz
tags: [ "الصلابة", "جسر", "الطبقة الثانية" ]
skill: intermediate
published: 2022-03-30
lang: ar
---

[Optimism](https://www.optimism.io/) هو [رول أب تفاؤلي](/developers/docs/scaling/optimistic-rollups/).
يمكن لعمليات الرول أب التفاؤلية معالجة المعاملات بسعر أقل بكثير من شبكة إيثريوم الرئيسية (المعروفة أيضًا باسم الطبقة 1 أو L1) لأن المعاملات تتم معالجتها فقط بواسطة عدد قليل من العُقد، بدلاً من كل عقدة على الشبكة.
في الوقت نفسه، تُكتب جميع البيانات على L1 حتى يمكن إثبات كل شيء وإعادة بنائه مع جميع ضمانات السلامة والتوافر الخاصة بالشبكة الرئيسية.

لاستخدام أصول L1 على Optimism (أو أي L2 آخر)، يجب [نقل الأصول عبر جسر](/bridges/#prerequisites).
إحدى طرق تحقيق ذلك هي أن يقوم المستخدمون بقفل الأصول (عملات ETH و[رموز ERC-20](/developers/docs/standards/tokens/erc-20/) هي الأكثر شيوعًا) على L1، والحصول على أصول معادلة لاستخدامها على L2.
في النهاية، قد يرغب من ينتهي به المطاف بهذه الأصول في إعادتها عبر الجسر إلى L1.
عند القيام بذلك، يتم حرق الأصول على L2 ثم إعادتها إلى المستخدم على L1.

هذه هي الطريقة التي يعمل بها [جسر Optimism القياسي](https://docs.optimism.io/app-developers/bridging/standard-bridge).
في هذه المقالة، نستعرض الكود المصدري لهذا الجسر لنرى كيف يعمل وندرسه كمثال لكود Solidity مكتوب جيدًا.

## تدفقات التحكم {#control-flows}

للجسر تدفقان رئيسيان:

- الإيداع (من L1 إلى L2)
- السحب (من L2 إلى L1)

### تدفق الإيداع {#deposit-flow}

#### الطبقة 1 {#deposit-flow-layer-1}

1. في حالة إيداع رمز ERC-20، يمنح المودِع الجسر إذنًا لإنفاق المبلغ الذي يتم إيداعه
2. يستدعي المودِع جسر L1 (`depositERC20` أو `depositERC20To` أو `depositETH` أو `depositETHTo`)
3. يستحوذ جسر L1 على الأصل المنقول عبر الجسر
   - ETH: يتم تحويل الأصل من قِبل المودِع كجزء من الاستدعاء
   - ERC-20: يتم تحويل الأصل بواسطة الجسر إلى نفسه باستخدام الإذن المقدم من المودِع
4. يستخدم جسر L1 آلية الرسائل عبر النطاقات لاستدعاء `finalizeDeposit` على جسر L2

#### الطبقة 2 {#deposit-flow-layer-2}

5. يتحقق جسر L2 من أن استدعاء `finalizeDeposit` شرعي:
   - أنه أتى من عقد الرسائل عبر النطاقات
   - كان في الأصل من الجسر على L1
6. يتحقق جسر L2 مما إذا كان عقد رمز ERC-20 على L2 هو الصحيح:
   - يُبلغ عقد L2 أن نظيره على L1 هو نفسه الذي أتت منه الرموز على L1
   - يُبلغ عقد L2 أنه يدعم الواجهة الصحيحة ([باستخدام ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. إذا كان عقد L2 هو الصحيح، يتم استدعاؤه لسك العدد المناسب من الرموز إلى العنوان المناسب. إذا لم يكن كذلك، تبدأ عملية سحب للسماح للمستخدم بالمطالبة بالرموز على L1.

### تدفق السحب {#withdrawal-flow}

#### الطبقة 2 {#withdrawal-flow-layer-2}

1. يستدعي الساحب جسر L2 (`withdraw` أو `withdrawTo`)
2. يحرق جسر L2 العدد المناسب من الرموز التابعة لـ `msg.sender`
3. يستخدم جسر L2 آلية الرسائل عبر النطاقات لاستدعاء `finalizeETHWithdrawal` أو `finalizeERC20Withdrawal` على جسر L1

#### الطبقة 1 {#withdrawal-flow-layer-1}

4. يتحقق جسر L1 من أن استدعاء `finalizeETHWithdrawal` أو `finalizeERC20Withdrawal` شرعي:
   - أنه أتى من آلية الرسائل عبر النطاقات
   - كان في الأصل من الجسر على L2
5. ينقل جسر L1 الأصل المناسب (ETH أو ERC-20) إلى العنوان المناسب

## كود الطبقة 1 {#layer-1-code}

هذا هو الكود الذي يعمل على L1، شبكة إيثريوم الرئيسية.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[هذه الواجهة معرّفة هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
تتضمن وظائف وتعاريف مطلوبة لنقل رموز ERC-20 عبر الجسر.

```solidity
// SPDX-License-Identifier: MIT
```

[يتم إصدار معظم كود Optimism بموجب رخصة MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

في وقت كتابة هذا التقرير، أحدث إصدار من Solidity هو 0.8.12.
حتى يتم إصدار الإصدار 0.9.0، لا نعرف ما إذا كان هذا الكود متوافقًا معه أم لا.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * الأحداث *
     **********/

    event ERC20DepositInitiated(
```

في مصطلحات جسر Optimism، يعني _الإيداع_ النقل من L1 إلى L2، ويعني _السحب_ النقل من L2 إلى L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

في معظم الحالات، لا يكون عنوان ERC-20 على L1 هو نفسه عنوان ERC-20 المكافئ على L2.
[يمكنك رؤية قائمة عناوين الرموز هنا](https://static.optimism.io/optimism.tokenlist.json).
العنوان ذو `chainId` 1 موجود على L1 (الشبكة الرئيسية) والعنوان ذو `chainId` 10 موجود على L2 (Optimism).
قيمتا `chainId` الأخريان هما لشبكة اختبار Kovan (42) وشبكة اختبار Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

من الممكن إضافة ملاحظات إلى التحويلات، وفي هذه الحالة تضاف إلى الأحداث التي تبلغ عنها.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

نفس عقد الجسر يعالج التحويلات في كلا الاتجاهين.
في حالة جسر L1، يعني هذا بدء الإيداعات وإنهاء عمليات السحب.

```solidity

    /********************
     * الوظائف العامة *
     ********************/

    /**
     * @dev احصل على عنوان عقد جسر L2 المقابل.
     * @return عنوان عقد جسر L2 المقابل.
     */
    function l2TokenBridge() external returns (address);
```

هذه الوظيفة ليست ضرورية حقًا، لأنه على L2 هو عقد منشور مسبقًا، لذلك يكون دائمًا على العنوان `0x4200000000000000000000000000000000000010`.
إنها هنا للتناظر مع جسر L2، لأن عنوان جسر L1 _ليس_ من السهل معرفته.

```solidity
    /**
     * @dev إيداع مبلغ من ERC20 في رصيد المتصل على L2.
     * @param _l1Token عنوان ERC20 للطبقة 1 الذي نودعه
     * @param _l2Token عنوان ERC20 للطبقة 2 المقابل للطبقة 1
     * @param _amount مبلغ ERC20 المراد إيداعه
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على L2.
     * @param _data بيانات اختيارية لإعادة توجيهها إلى L2. يتم توفير هذه البيانات
     *        فقط لتسهيل العقود الخارجية. وبصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات بشأن محتواها.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

المعلمة `_l2Gas` هي كمية غاز L2 المسموح للمعاملة بإنفاقها.
[حتى حد معين (مرتفع)، يكون هذا مجانيًا](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)، لذلك ما لم يفعل عقد ERC-20 شيئًا غريبًا حقًا عند السك، فلا ينبغي أن تكون هناك مشكلة.
تتولى هذه الوظيفة السيناريو الشائع، حيث ينقل مستخدم الأصول عبر جسر إلى نفس العنوان على بلوكشين مختلف.

```solidity
    /**
     * @dev إيداع مبلغ من ERC20 في رصيد المستلم على L2.
     * @param _l1Token عنوان ERC20 للطبقة 1 الذي نودعه
     * @param _l2Token عنوان ERC20 للطبقة 2 المقابل للطبقة 1
     * @param _to عنوان L2 لإيداع السحب فيه.
     * @param _amount مبلغ ERC20 المراد إيداعه.
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على L2.
     * @param _data بيانات اختيارية لإعادة توجيهها إلى L2. يتم توفير هذه البيانات
     *        فقط لتسهيل العقود الخارجية. وبصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات بشأن محتواها.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

هذه الوظيفة مطابقة تقريبًا لـ `depositERC20`، لكنها تتيح لك إرسال ERC-20 إلى عنوان مختلف.

```solidity
    /*************************
     * وظائف عبر السلسلة *
     *************************/

    /**
     * @dev إكمال السحب من L2 إلى L1، وإيداع الأموال في رصيد المستلم من
     * رمز ERC20 على L1.
     * سيفشل هذا الاستدعاء إذا لم يتم إنهاء السحب المبدئي من L2.
     *
     * @param _l1Token عنوان رمز L1 لإنهاء السحب له.
     * @param _l2Token عنوان رمز L2 حيث بدأ السحب.
     * @param _from عنوان L2 الذي بدأ التحويل.
     * @param _to عنوان L1 لإيداع السحب فيه.
     * @param _amount مبلغ ERC20 المراد إيداعه.
     * @param _data البيانات التي قدمها المرسل على L2. يتم توفير هذه البيانات
     *   فقط لتسهيل العقود الخارجية. وبصرف النظر عن فرض حد أقصى
     *   للطول، لا تقدم هذه العقود أي ضمانات بشأن محتواها.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

عمليات السحب (والرسائل الأخرى من L2 إلى L1) في Optimism هي عملية من خطوتين:

1. معاملة بدء على L2.
2. معاملة إنهاء أو مطالبة على L1.
   يجب أن تتم هذه المعاملة بعد انتهاء [فترة الطعن في الخطأ](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) لمعاملة L2.

### IL1StandardBridge {#il1standardbridge}

[هذه الواجهة معرّفة هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
يحتوي هذا الملف على تعريفات الأحداث والوظائف لـ ETH.
هذه التعريفات مشابهة جدًا لتلك المعرفة في `IL1ERC20Bridge` أعلاه لـ ERC-20.

تنقسم واجهة الجسر بين ملفين لأن بعض رموز ERC-20 تتطلب معالجة مخصصة ولا يمكن معالجتها بواسطة الجسر القياسي.
بهذه الطريقة يمكن للجسر المخصص الذي يعالج مثل هذا الرمز أن يطبق `IL1ERC20Bridge` ولا يضطر أيضًا إلى نقل ETH عبر الجسر.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * الأحداث *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

هذا الحدث مطابق تقريبًا لإصدار ERC-20 (`ERC20DepositInitiated`)، باستثناء عدم وجود عناوين رموز L1 و L2.
وينطبق الشيء نفسه على الأحداث والوظائف الأخرى.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * الوظائف العامة *
     ********************/

    /**
     * @dev إيداع مبلغ من ETH في رصيد المتصل على L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev إيداع مبلغ من ETH في رصيد المستلم على L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * وظائف عبر السلسلة *
     *************************/

    /**
     * @dev إكمال السحب من L2 إلى L1، وإيداع الأموال في رصيد المستلم لرمز ETH على L1.
     *  نظرًا لأن xDomainMessenger فقط هو الذي يمكنه استدعاء هذه الوظيفة، فلن يتم استدعاؤها أبدًا
     * قبل إنهاء السحب.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[هذا العقد](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) موروث من قبل كلا الجسرين ([L1](#the-l1-bridge-contract) و [L2](#the-l2-bridge-contract)) لإرسال رسائل إلى الطبقة الأخرى.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

تخبر [هذه الواجهة](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) العقد كيفية إرسال رسائل إلى الطبقة الأخرى، باستخدام مرسل الرسائل عبر النطاقات.
مرسل الرسائل عبر النطاقات هذا هو نظام آخر تمامًا، ويستحق مقالًا خاصًا به، وآمل أن أكتبه في المستقبل.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev عقد مساعد للعقود التي تقوم باتصالات عبر النطاقات
 *
 * المترجم المستخدم: يحدده العقد الوارث
 */
contract CrossDomainEnabled {
    /*************
     * المتغيرات *
     *************/

    // عقد المرسال المستخدم لإرسال واستقبال الرسائل من النطاق الآخر.
    address public messenger;

    /***************
     * المُنشئ *
     ***************/

    /**
     * @param _messenger عنوان مرسل الرسائل عبر النطاقات على الطبقة الحالية.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

المعلمة الوحيدة التي يحتاج العقد إلى معرفتها، هي عنوان مرسل الرسائل عبر النطاقات على هذه الطبقة.
يتم تعيين هذه المعلمة مرة واحدة، في المُنشئ، ولا تتغير أبدًا.

```solidity

    /**********************
     * مُعدِّلات الوظائف *
     **********************/

    /**
     * يفرض أن تكون الوظيفة المعدلة قابلة للاستدعاء فقط من خلال حساب معين عبر النطاقات.
     * @param _sourceDomainAccount الحساب الوحيد في النطاق الأصلي
     *  المصادق عليه لاستدعاء هذه الوظيفة.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

يمكن الوصول إلى المراسلة عبر النطاقات من قبل أي عقد على البلوكشين حيث يتم تشغيلها (إما شبكة إيثريوم الرئيسية أو Optimism).
لكننا نحتاج إلى أن يثق الجسر على كل جانب _فقط_ برسائل معينة إذا كانت تأتي من الجسر على الجانب الآخر.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

يمكن الوثوق فقط بالرسائل الواردة من مرسل الرسائل عبر النطاقات المناسب (`messenger`، كما ترى أدناه).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

الطريقة التي يوفر بها مرسل الرسائل عبر النطاقات العنوان الذي أرسل رسالة بالطبقة الأخرى هي [وظيفة `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
طالما يتم استدعاؤها في المعاملة التي بدأتها الرسالة، يمكنها توفير هذه المعلومات.

نحتاج إلى التأكد من أن الرسالة التي تلقيناها جاءت من الجسر الآخر.

```solidity

        _;
    }

    /**********************
     * الوظائف الداخلية *
     **********************/

    /**
     * يحصل على المرسال، عادة من التخزين. يتم كشف هذه الوظيفة في حالة احتياج عقد فرعي
     * لتجاوزها.
     * @return عنوان عقد مرسل الرسائل عبر النطاقات الذي يجب استخدامه.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

تعيد هذه الوظيفة مرسل الرسائل عبر النطاقات.
نستخدم وظيفة بدلاً من المتغير `messenger` للسماح للعقود التي ترث من هذا العقد باستخدام خوارزمية لتحديد أي مرسل رسائل عبر النطاقات يجب استخدامه.

```solidity

    /**
     * يرسل رسالة إلى حساب في نطاق آخر
     * @param _crossDomainTarget المستلم المقصود في نطاق الوجهة
     * @param _message البيانات المراد إرسالها إلى الهدف (عادةً ما تكون calldata لوظيفة مع
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit حد الغاز لاستلام الرسالة في نطاق الهدف.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

أخيرًا، الوظيفة التي ترسل رسالة إلى الطبقة الأخرى.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) هو محلل ثابت يقوم Optimism بتشغيله على كل عقد للبحث عن الثغرات والمشاكل المحتملة الأخرى.
في هذه الحالة، يثير السطر التالي ثغرتين أمنيتين:

1. [ثغرات إعادة الدخول (Reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [إعادة الدخول الحميدة (Benign reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

في هذه الحالة، لا نقلق بشأن إعادة الدخول، فنحن نعلم أن `getCrossDomainMessenger()` يعيد عنوانًا جديرًا بالثقة، حتى لو لم يكن لدى Slither طريقة لمعرفة ذلك.

### عقد جسر L1 {#the-l1-bridge-contract}

[الكود المصدري لهذا العقد موجود هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

يمكن أن تكون الواجهات جزءًا من عقود أخرى، لذا يجب أن تدعم مجموعة واسعة من إصدارات Solidity.
لكن الجسر نفسه هو عقدنا، ويمكننا أن نكون صارمين بشأن إصدار Solidity الذي يستخدمه.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

تم شرح [IL1ERC20Bridge](#IL1ERC20Bridge) و [IL1StandardBridge](#IL1StandardBridge) أعلاه.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

تتيح لنا [هذه الواجهة](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) إنشاء رسائل للتحكم في الجسر القياسي على L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

تتيح لنا [هذه الواجهة](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) التحكم في عقود ERC-20.
[يمكنك قراءة المزيد عنها هنا](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[كما هو موضح أعلاه](#crossdomainenabled)، يتم استخدام هذا العقد للمراسلة بين الطبقات.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

يحتوي [`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) على عناوين عقود L2 التي لها دائمًا نفس العنوان. وهذا يشمل الجسر القياسي على L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[أدوات العنوان من OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). يُستخدم للتمييز بين عناوين العقود وتلك التي تنتمي إلى حسابات مملوكة خارجيًا (EOA).

لاحظ أن هذا ليس حلاً مثاليًا، لأنه لا توجد طريقة للتمييز بين الاستدعاءات المباشرة والاستدعاءات التي تتم من مُنشئ العقد، ولكن على الأقل يتيح لنا هذا تحديد ومنع بعض أخطاء المستخدم الشائعة.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

يدعم [معيار ERC-20](https://eips.ethereum.org/EIPS/eip-20) طريقتين للإبلاغ عن فشل العقد:

1. Revert (التراجع)
2. إرجاع `false` (خطأ)

إن التعامل مع كلتا الحالتين سيجعل الكود الخاص بنا أكثر تعقيدًا، لذلك بدلاً من ذلك نستخدم [`SafeERC20` من OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)، والذي يضمن [أن تؤدي جميع حالات الفشل إلى تراجع](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev جسر ETH و ERC20 للطبقة 1 هو عقد يخزن أموال L1 المودعة والرموز القياسية
 *  المستخدمة على L2. يقوم بمزامنة جسر L2 المقابل، وإعلامه بالإيداعات
 * والاستماع إليه لمعرفة عمليات السحب التي تم إنهاؤها حديثًا.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

هذا هو السطر الذي نحدد به استخدام غلاف `SafeERC20` في كل مرة نستخدم فيها واجهة `IERC20`.

```solidity

    /********************************
     * مراجع العقود الخارجية *
     ********************************/

    address public l2TokenBridge;
```

عنوان [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // يربط رمز L1 برمز L2 برصيد رمز L1 المودع
    mapping(address => mapping(address => uint256)) public deposits;
```

[تخطيط](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) مزدوج مثل هذا هو الطريقة التي تُعرّف بها [مصفوفة متناثرة ثنائية الأبعاد](https://en.wikipedia.org/wiki/Sparse_matrix).
يتم تحديد القيم في بنية البيانات هذه على أنها `deposit[عنوان رمز L1][عنوان رمز L2]`.
القيمة الافتراضية هي صفر.
يتم كتابة الخلايا التي تم تعيينها إلى قيمة مختلفة فقط في التخزين.

```solidity

    /***************
     * المُنشئ *
     ***************/

    // يعيش هذا العقد خلف وكيل، لذا لن تُستخدم معلمات المُنشئ.
    constructor() CrossDomainEnabled(address(0)) {}
```

لكي نكون قادرين على ترقية هذا العقد دون الحاجة إلى نسخ جميع المتغيرات في التخزين.
للقيام بذلك نستخدم [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)، وهو عقد يستخدم [`delegatecall`](https://solidity-by-example.org/delegatecall/) لنقل الاستدعاءات إلى عقد منفصل يتم تخزين عنوانه بواسطة عقد الوكيل (عند الترقية تخبر الوكيل بتغيير هذا العنوان).
عند استخدام `delegatecall`، يظل التخزين هو تخزين العقد _المستدعي_، لذا تظل قيم جميع متغيرات حالة العقد غير متأثرة.

أحد تأثيرات هذا النمط هو أن تخزين العقد الذي هو _المستدعى_ لـ `delegatecall` لا يُستخدم وبالتالي فإن قيم المُنشئ التي يتم تمريرها إليه لا تهم.
هذا هو السبب في أنه يمكننا تقديم قيمة غير منطقية لمُنشئ `CrossDomainEnabled`.
وهذا هو أيضًا سبب فصل التهيئة أدناه عن المُنشئ.

```solidity
    /******************
     * التهيئة *
     ******************/

    /**
     * @param _l1messenger عنوان مرسال L1 المستخدم في الاتصالات عبر السلسلة.
     * @param _l2TokenBridge عنوان جسر L2 القياسي.
     */
    // slither-disable-next-line external-function
```

يحدد [اختبار Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) الوظائف التي لا يتم استدعاؤها من كود العقد وبالتالي يمكن إعلانها `external` بدلاً من `public`.
يمكن أن تكون تكلفة الغاز للوظائف `external` أقل، لأنه يمكن تزويدها بالمعلمات في calldata.
يجب أن تكون الوظائف المعلنة `public` قابلة للوصول من داخل العقد.
لا يمكن للعقود تعديل calldata الخاصة بها، لذا يجب أن تكون المعلمات في الذاكرة.
عندما يتم استدعاء مثل هذه الوظيفة خارجيًا، من الضروري نسخ calldata إلى الذاكرة، مما يكلف الغاز.
في هذه الحالة، يتم استدعاء الوظيفة مرة واحدة فقط، لذا فإن عدم الكفاءة لا يهمنا.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

يجب استدعاء وظيفة `initialize` مرة واحدة فقط.
إذا تغير عنوان مرسل الرسائل عبر النطاقات L1 أو جسر رموز L2، فإننا ننشئ وكيلًا جديدًا وجسرًا جديدًا يستدعيه.
من غير المرجح أن يحدث هذا إلا عند ترقية النظام بأكمله، وهو حدث نادر جدًا.

لاحظ أن هذه الوظيفة لا تحتوي على أي آلية تقيد _من_ يمكنه استدعاؤها.
هذا يعني أنه من الناحية النظرية يمكن للمهاجم الانتظار حتى ننشر الوكيل والإصدار الأول من الجسر ثم [يقوم بتشغيل أمامي](https://solidity-by-example.org/hacks/front-running/) للوصول إلى وظيفة `initialize` قبل المستخدم الشرعي. ولكن هناك طريقتان لمنع هذا:

1. إذا لم يتم نشر العقود مباشرة من قبل EOA ولكن [في معاملة بها عقد آخر يقوم بإنشائها](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) يمكن أن تكون العملية بأكملها ذرية، وتنتهي قبل تنفيذ أي معاملة أخرى.
2. إذا فشل الاستدعاء الشرعي لـ `initialize`، فمن الممكن دائمًا تجاهل الوكيل والجسر المنشأين حديثًا وإنشاء وكيل وجسر جديدين.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

هذه هي المعلمتان اللتان يحتاج الجسر إلى معرفتهما.

```solidity

    /**************
     * الإيداع *
     **************/

    /** @dev مُعدِّل يفرض أن يكون المرسل حسابًا مملوكًا خارجيًا (EOA). يمكن تجاوز هذا التحقق
     *  من قبل عقد خبيث عبر initcode، ولكنه يعالج خطأ المستخدم الذي نريد تجنبه.
     */
    modifier onlyEOA() {
        // يُستخدم لإيقاف الإيداعات من العقود (لتجنب فقدان الرموز عن طريق الخطأ)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

هذا هو السبب في أننا بحاجة إلى أدوات `Address` من OpenZeppelin.

```solidity
    /**
     * @dev يمكن استدعاء هذه الوظيفة بدون بيانات
     * لإيداع مبلغ من ETH في رصيد المتصل على L2.
     * بما أن وظيفة الاستلام لا تأخذ بيانات، يتم إعادة توجيه
     * مبلغ افتراضي محافظ إلى L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

هذه الوظيفة موجودة لأغراض الاختبار.
لاحظ أنها لا تظهر في تعريفات الواجهة - فهي ليست للاستخدام العادي.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

هاتان الوظيفتان هما أغلفة حول `_initiateETHDeposit`، الوظيفة التي تتعامل مع إيداع ETH الفعلي.

```solidity
    /**
     * @dev ينفذ منطق الإيداعات عن طريق تخزين ETH وإبلاغ بوابة ETH L2
     * بالإيداع.
     * @param _from الحساب الذي سيتم سحب الإيداع منه على L1.
     * @param _to الحساب الذي سيتم منح الإيداع له على L2.
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على L2.
     * @param _data بيانات اختيارية لإعادة توجيهها إلى L2. يتم توفير هذه البيانات
     *        فقط لتسهيل العقود الخارجية. وبصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات بشأن محتواها.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // إنشاء calldata لاستدعاء finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

طريقة عمل الرسائل عبر النطاقات هي أنه يتم استدعاء عقد الوجهة مع الرسالة كـ calldata الخاصة به.
تقوم عقود Solidity دائمًا بتفسير calldata الخاصة بها وفقًا
[لمواصفات ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
تقوم وظيفة Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) بإنشاء تلك calldata.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

الرسالة هنا هي استدعاء [وظيفة `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) بهذه المعلمات:

| Parameter                       | Value                                                                                    | المعنى                                                                                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_l1Token | address(0)                                                            | قيمة خاصة لتمثيل ETH (والذي ليس رمز ERC-20) على L1                                                                            |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | عقد L2 الذي يدير ETH على Optimism، `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (هذا العقد للاستخدام الداخلي لـ Optimism فقط) |
| \_from    | \_from                                                             | العنوان على L1 الذي يرسل ETH                                                                                                                     |
| \_to      | \_to                                                               | العنوان على L2 الذي يستقبل ETH                                                                                                                   |
| المبلغ                          | msg.value                                                                | كمية الـ wei المرسلة (والتي تم إرسالها بالفعل إلى الجسر)                                                                      |
| \_data    | \_data                                                             | بيانات إضافية لإرفاقها بالإيداع                                                                                                                  |

```solidity
        // إرسال calldata إلى L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

إرسال الرسالة من خلال مرسل الرسائل عبر النطاقات.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

إصدار حدث لإبلاغ أي تطبيق لامركزي يستمع بهذا التحويل.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

هاتان الوظيفتان هما أغلفة حول `_initiateERC20Deposit`، الوظيفة التي تتعامل مع إيداع ERC-20 الفعلي.

```solidity
    /**
     * @dev ينفذ منطق الإيداعات عن طريق إبلاغ عقد رمز الإيداع L2
     * بالإيداع واستدعاء معالج لقفل أموال L1. (على سبيل المثال، transferFrom)
     *
     * @param _l1Token عنوان ERC20 للطبقة 1 الذي نودعه
     * @param _l2Token عنوان ERC20 للطبقة 2 المقابل للطبقة 1
     * @param _from الحساب الذي سيتم سحب الإيداع منه على L1
     * @param _to الحساب الذي سيتم منح الإيداع له على L2
     * @param _amount مبلغ ERC20 المراد إيداعه.
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على L2.
     * @param _data بيانات اختيارية لإعادة توجيهها إلى L2. يتم توفير هذه البيانات
     *        فقط لتسهيل العقود الخارجية. وبصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات بشأن محتواها.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

هذه الوظيفة مشابهة لـ `_initiateETHDeposit` أعلاه، مع بعض الاختلافات المهمة.
الاختلاف الأول هو أن هذه الوظيفة تتلقى عناوين الرموز والمبلغ المطلوب تحويله كمعلمات.
في حالة ETH، يتضمن الاستدعاء إلى الجسر بالفعل نقل الأصل إلى حساب الجسر (`msg.value`).

```solidity
        // عند بدء إيداع على L1، ينقل جسر L1 الأموال إلى نفسه لعمليات
        // السحب المستقبلية. يتحقق safeTransferFrom أيضًا مما إذا كان العقد يحتوي على كود، لذلك سيفشل هذا
        // إذا كان _from حسابًا مملوكًا خارجيًا (EOA) أو address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

تتبع عمليات نقل رموز ERC-20 عملية مختلفة عن ETH:

1. يمنح المستخدم (`_from`) إذنًا للجسر لنقل الرموز المناسبة.
2. يستدعي المستخدم الجسر مع عنوان عقد الرمز، والمبلغ، إلخ.
3. ينقل الجسر الرموز (إلى نفسه) كجزء من عملية الإيداع.

قد تحدث الخطوة الأولى في معاملة منفصلة عن الخطوتين الأخيرتين.
ومع ذلك، فإن التشغيل الأمامي ليس مشكلة لأن الوظيفتين اللتين تستدعيان `_initiateERC20Deposit` (`depositERC20` و `depositERC20To`) تستدعيان هذه الوظيفة فقط مع `msg.sender` كمعلمة `_from`.

```solidity
        // إنشاء calldata لـ _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // إرسال calldata إلى L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

أضف المبلغ المودع من الرموز إلى بنية بيانات `deposits`.
قد تكون هناك عناوين متعددة على L2 تتوافق مع نفس رمز L1 ERC-20، لذلك لا يكفي استخدام رصيد الجسر من رمز L1 ERC-20 لتتبع الإيداعات.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * وظائف عبر السلسلة *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

يرسل جسر L2 رسالة إلى مرسل الرسائل عبر النطاقات L2 مما يتسبب في استدعاء مرسل الرسائل عبر النطاقات L1 لهذه الوظيفة (بمجرد إرسال [المعاملة التي تنهي الرسالة](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) على L1، بالطبع).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

تأكد من أن هذه رسالة _شرعية_، قادمة من مرسل الرسائل عبر النطاقات ومنشؤها جسر رموز L2.
تُستخدم هذه الوظيفة لسحب ETH من الجسر، لذا يجب علينا التأكد من أنها لا تُستدعى إلا من قِبل المتصل المصرّح له.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

طريقة تحويل ETH هي استدعاء المستلم بكمية wei في `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

إصدار حدث حول السحب.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

هذه الوظيفة مشابهة لـ `finalizeETHWithdrawal` أعلاه، مع التغييرات اللازمة لرموز ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

تحديث بنية بيانات `deposits`.

```solidity

        // عند إنهاء السحب على L1، ينقل جسر L1 الأموال إلى الساحب
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * مؤقت - ترحيل ETH *
     *****************************/

    /**
     * @dev يضيف رصيد ETH إلى الحساب. يهدف هذا إلى السماح بترحيل ETH
     * من بوابة قديمة إلى بوابة جديدة.
     * ملاحظة: يتم ترك هذا لترقية واحدة فقط حتى نتمكن من تلقي ETH المرحّل من
     * العقد القديم
     */
    function donateETH() external payable {}
}
```

كان هناك تطبيق سابق للجسر.
عندما انتقلنا من التطبيق إلى هذا التطبيق، كان علينا نقل جميع الأصول.
يمكن نقل رموز ERC-20 بسهولة.
ومع ذلك، لنقل ETH إلى عقد ما، تحتاج إلى موافقة هذا العقد، وهو ما توفره لنا `donateETH`.

## رموز ERC-20 على L2 {#erc-20-tokens-on-l2}

لكي يتناسب رمز ERC-20 مع الجسر القياسي، يجب أن يسمح للجسر القياسي، و _فقط_ الجسر القياسي، بسك الرمز.
هذا ضروري لأن الجسور تحتاج إلى التأكد من أن عدد الرموز المتداولة على Optimism يساوي عدد الرموز المقفلة داخل عقد جسر L1.
إذا كان هناك عدد كبير جدًا من الرموز على L2، فلن يتمكن بعض المستخدمين من إعادة أصولهم إلى L1 عبر الجسر.
بدلاً من جسر موثوق به، سنعيد إنشاء [الخدمات المصرفية الاحتياطية الجزئية](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) بشكل أساسي.
إذا كان هناك عدد كبير جدًا من الرموز على L1، فستبقى بعض هذه الرموز مقفلة داخل عقد الجسر إلى الأبد لأنه لا توجد طريقة لإطلاقها دون حرق رموز L2.

### IL2StandardERC20 {#il2standarderc20}

يجب على كل رمز ERC-20 على L2 يستخدم الجسر القياسي توفير [هذه الواجهة](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)، التي تحتوي على الوظائف والأحداث التي يحتاجها الجسر القياسي.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

لا تتضمن [واجهة ERC-20 القياسية](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) وظائف `mint` و `burn`.
هذه الطرق غير مطلوبة من قبل [معيار ERC-20](https://eips.ethereum.org/EIPS/eip-20)، والذي يترك آليات إنشاء وتدمير الرموز غير محددة.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

تُستخدم [واجهة ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) لتحديد الوظائف التي يوفرها العقد.
[يمكنك قراءة المعيار هنا](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

توفر هذه الوظيفة عنوان رمز L1 الذي يتم نقله عبر الجسر إلى هذا العقد.
لاحظ أنه ليس لدينا وظيفة مماثلة في الاتجاه المعاكس.
نحتاج إلى أن نكون قادرين على نقل أي رمز L1 عبر الجسر، بغض النظر عما إذا كان دعم L2 مخططًا له عند تنفيذه أم لا.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

وظائف وأحداث لسك (إنشاء) وحرق (تدمير) الرموز.
يجب أن يكون الجسر هو الكيان الوحيد الذي يمكنه تشغيل هذه الوظائف لضمان صحة عدد الرموز (يساوي عدد الرموز المقفلة على L1).

### L2StandardERC20 {#L2StandardERC20}

[هذا هو تنفيذنا لواجهة `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
ما لم تكن بحاجة إلى نوع من المنطق المخصص، يجب عليك استخدام هذا.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[عقد ERC-20 من OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
لا تؤمن Optimism بإعادة اختراع العجلة، خاصة عندما تكون العجلة مدققة جيدًا وتحتاج إلى أن تكون جديرة بالثقة بما يكفي لحمل الأصول.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

هاتان هما المعلمتان الإضافيتان للتكوين اللتان نطلبهما ولا يطلبهما ERC-20 عادةً.

```solidity

    /**
     * @param _l2Bridge عنوان جسر L2 القياسي.
     * @param _l1Token عنوان رمز L1 المقابل.
     * @param _name اسم ERC20.
     * @param _symbol رمز ERC20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

أولاً، استدعِ مُنشئ العقد الذي نرث منه (`ERC20(_name, _symbol)`) ثم عيّن متغيراتنا الخاصة.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

هذه هي طريقة عمل [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
كل واجهة هي عدد من الوظائف المدعومة، ويتم تحديدها على أنها [XOR](https://en.wikipedia.org/wiki/Exclusive_or) لـ [مُحدِّدات وظائف ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) لتلك الوظائف.

يستخدم جسر L2 ERC-165 كفحص سلامة للتأكد من أن عقد ERC-20 الذي يرسل إليه الأصول هو `IL2StandardERC20`.

**ملاحظة:** لا يوجد ما يمنع عقدًا خبيثًا من تقديم إجابات خاطئة لـ `supportsInterface`، لذا فهذه آلية فحص سلامة، _وليست_ آلية أمان.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

يُسمح فقط لجسر L2 بسك وحرق الأصول.

`_mint` و `_burn` مُعرَّفتان فعليًا في [عقد ERC-20 من OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
هذا العقد لا يكشفهما خارجيًا، لأن شروط سك وحرق الرموز متنوعة مثل عدد طرق استخدام ERC-20.

## كود جسر L2 {#l2-bridge-code}

هذا هو الكود الذي يشغل الجسر على Optimism.
[مصدر هذا العقد موجود هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

واجهة [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) مشابهة جدًا [لمكافئ L1](#IL1ERC20Bridge) الذي رأيناه أعلاه.
هناك اختلافان كبيران:

1. على L1، تبدأ الإيداعات وتنهي عمليات السحب.
   هنا تبدأ عمليات السحب وتنهي الإيداعات.
2. على L1، من الضروري التمييز بين ETH ورموز ERC-20.
   على L2، يمكننا استخدام نفس الوظائف لكليهما لأنه داخليًا تتم معالجة أرصدة ETH على Optimism كرمز ERC-20 بالعنوان [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev جسر L2 القياسي هو عقد يعمل مع جسر L1 القياسي
 * لتمكين انتقالات ETH و ERC20 بين L1 و L2.
 * يعمل هذا العقد كأداة لسك رموز جديدة عندما يسمع عن إيداعات في جسر L1 القياسي.
 * يعمل هذا العقد أيضًا كأداة لحرق الرموز المخصصة للسحب، ويبلغ جسر L1
 * لإطلاق أموال L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * مراجع العقود الخارجية *
     ********************************/

    address public l1TokenBridge;
```

تتبع عنوان جسر L1.
لاحظ أنه على عكس مكافئ L1، فإننا _نحتاج_ هنا إلى هذا المتغير.
عنوان جسر L1 غير معروف مسبقًا.

```solidity

    /***************
     * المُنشئ *
     ***************/

    /**
     * @param _l2CrossDomainMessenger مرسال الرسائل عبر النطاقات المستخدم من قبل هذا العقد.
     * @param _l1TokenBridge عنوان جسر L1 المنشور على السلسلة الرئيسية.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * السحب *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

هاتان الوظيفتان تبدآن عمليات السحب.
لاحظ أنه لا توجد حاجة لتحديد عنوان رمز L1.
من المتوقع أن تخبرنا رموز L2 بعنوان مكافئ L1.

```solidity

    /**
     * @dev ينفذ منطق عمليات السحب عن طريق حرق الرمز وإبلاغ
     *      بوابة رمز L1 بالسحب.
     * @param _l2Token عنوان رمز L2 حيث بدأ السحب.
     * @param _from الحساب لسحب السحب منه على L2.
     * @param _to الحساب لمنح السحب له على L1.
     * @param _amount كمية الرمز المراد سحبها.
     * @param _l1Gas غير مستخدم، ولكنه مدرج لاعتبارات التوافق المستقبلي المحتملة.
     * @param _data بيانات اختيارية لإعادة توجيهها إلى L1. يتم توفير هذه البيانات
     *        فقط لتسهيل العقود الخارجية. وبصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات بشأن محتواها.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // عند بدء السحب، نحرق أموال الساحب لمنع الاستخدام اللاحق لـ L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

لاحظ أننا _لا_ نعتمد على معلمة `_from` بل على `msg.sender` وهو أصعب بكثير في التزييف (مستحيل، على حد علمي).

```solidity

        // إنشاء calldata لـ l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

على L1، من الضروري التمييز بين ETH و ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // إرسال رسالة إلى جسر L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * وظيفة عبر السلسلة: الإيداع *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

يتم استدعاء هذه الوظيفة بواسطة `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

تأكد من أن مصدر الرسالة شرعي.
هذا مهم لأن هذه الوظيفة تستدعي `_mint` ويمكن استخدامها لإعطاء رموز غير مغطاة بالرموز التي يمتلكها الجسر على L1.

```solidity
        // تحقق من أن الرمز الهدف متوافق و
        // تحقق من أن الرمز المودع على L1 يطابق تمثيل الرمز المودع على L2 هنا
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

فحوصات السلامة:

1. الواجهة الصحيحة مدعومة
2. عنوان L1 لعقد L2 ERC-20 يطابق مصدر L1 للرموز

```solidity
        ) {
            // عند إنهاء الإيداع، نقوم بإيداع نفس المبلغ من
            // الرموز في حساب L2.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

إذا نجحت فحوصات السلامة، قم بإنهاء الإيداع:

1. سك الرموز
2. إصدار الحدث المناسب

```solidity
        } else {
            // إما أن رمز L2 الذي يتم الإيداع فيه لا يتفق مع العنوان الصحيح
            // لرمز L1 الخاص به، أو أنه لا يدعم الواجهة الصحيحة.
            // يجب أن يحدث هذا فقط إذا كان هناك رمز L2 خبيث، أو إذا حدد المستخدم بطريقة ما
            // عنوان رمز L2 خاطئًا للإيداع فيه.
            // في كلتا الحالتين، نوقف العملية هنا وننشئ رسالة سحب
            // حتى يتمكن المستخدمون من إخراج أموالهم في بعض الحالات.
            // لا توجد طريقة لمنع عقود الرموز الخبيثة تمامًا، ولكن هذا يحد
            // من خطأ المستخدم ويخفف من بعض أشكال سلوك العقود الخبيثة.
```

إذا ارتكب المستخدم خطأ يمكن اكتشافه باستخدام عنوان رمز L2 الخاطئ، فنحن نريد إلغاء الإيداع وإعادة الرموز على L1.
الطريقة الوحيدة التي يمكننا من خلالها القيام بذلك من L2 هي إرسال رسالة سيتعين عليها الانتظار فترة الطعن في الخطأ، ولكن هذا أفضل بكثير للمستخدم من فقدان الرموز بشكل دائم.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // تم تبديل _to و _from هنا لإعادة الإيداع إلى المرسل
                _from,
                _amount,
                _data
            );

            // إرسال رسالة إلى جسر L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## الخلاصة {#conclusion}

الجسر القياسي هو الآلية الأكثر مرونة لعمليات نقل الأصول.
ومع ذلك، نظرًا لأنه عام جدًا، فإنه ليس دائمًا أسهل آلية للاستخدام.
خاصة بالنسبة لعمليات السحب، يفضل معظم المستخدمين استخدام [جسور الطرف الثالث](https://optimism.io/apps#bridge) التي لا تنتظر فترة التحدي ولا تتطلب إثبات ميركل لإنهاء السحب.

تعمل هذه الجسور عادةً من خلال امتلاك أصول على L1، والتي توفرها على الفور مقابل رسوم رمزية (غالبًا ما تكون أقل من تكلفة الغاز للسحب عبر الجسر القياسي).
عندما يتوقع الجسر (أو الأشخاص الذين يديرونه) نقصًا في أصول L1، فإنه ينقل أصولًا كافية من L2. بما أن هذه عمليات سحب كبيرة جدًا، يتم إطفاء تكلفة السحب على مبلغ كبير وتكون نسبة مئوية أصغر بكثير.

نأمل أن تكون هذه المقالة قد ساعدتك على فهم المزيد حول كيفية عمل الطبقة 2، وكيفية كتابة كود Solidity واضح وآمن.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
