---
title: "جولة في عقد الجسر القياسي لشبكة أوبتيميزم"
description: "كيف يعمل الجسر القياسي لشبكة أوبتيميزم؟ ولماذا يعمل بهذه الطريقة؟"
author: "أوري بوميرانتس"
tags: ["Solidity", "جسر", "طبقة 2"]
skill: intermediate
breadcrumb: "جسر أوبتيميزم"
published: 2022-03-30
lang: ar
---

[أوبتيميزم](https://www.optimism.io/) هي [رول أب متفائل](/developers/docs/scaling/optimistic-rollups/).
يمكن للتجميعات المتفائلة معالجة المعاملات بسعر أقل بكثير من شبكة إيثيريوم الرئيسية (المعروفة أيضًا باسم طبقة 1 (L1)) لأن المعاملات تتم معالجتها بواسطة عدد قليل من العقد، بدلاً من كل عقدة على الشبكة.
في الوقت نفسه، تتم كتابة جميع البيانات على طبقة 1 (L1) بحيث يمكن إثبات كل شيء وإعادة بنائه مع جميع ضمانات النزاهة والتوافر الخاصة بالشبكة الرئيسية.

لاستخدام أصول طبقة 1 (L1) على أوبتيميزم (أو أي طبقة 2 (L2) أخرى)، يجب [نقل الأصول عبر جسر](/bridges/#prerequisites).
إحدى الطرق لتحقيق ذلك هي أن يقوم المستخدمون بقفل الأصول (<span dir="ltr">ETH</span> و[رموز <span dir="ltr">ERC-20</span> المميزة](/developers/docs/standards/tokens/erc-20/) هي الأكثر شيوعًا) على طبقة 1 (L1)، وتلقي أصول معادلة لاستخدامها على طبقة 2 (L2).
في النهاية، قد يرغب من ينتهي به الأمر بامتلاكها في إعادتها عبر الجسر إلى طبقة 1 (L1).
عند القيام بذلك، يتم حرق الأصول على طبقة 2 (L2) ثم يتم تحريرها مرة أخرى للمستخدم على طبقة 1 (L1).

هذه هي الطريقة التي يعمل بها [الجسر القياسي لشبكة أوبتيميزم](https://docs.optimism.io/app-developers/bridging/standard-bridge).
في هذه المقالة، نراجع الكود المصدري لذلك الجسر لنرى كيف يعمل وندرسه كمثال على كود Solidity مكتوب بشكل جيد.

## تدفقات التحكم {#control-flows}

يحتوي الجسر على تدفقين رئيسيين:

- الإيداع (من طبقة 1 (L1) إلى طبقة 2 (L2))
- السحب (من طبقة 2 (L2) إلى طبقة 1 (L1))

### تدفق الإيداع {#deposit-flow}

#### طبقة 1 (L1) {#deposit-flow-layer-1}

1. في حالة إيداع <span dir="ltr">ERC-20</span>، يمنح المودع الجسر سماحية لإنفاق المبلغ المودع
2. يستدعي المودع جسر طبقة 1 (L1) (`depositERC20`، أو `depositERC20To`، أو `depositETH`، أو `depositETHTo`)
3. يستحوذ جسر طبقة 1 (L1) على الأصل المنقول عبر الجسر
   - <span dir="ltr">ETH</span>: يتم تحويل الأصل بواسطة المودع كجزء من الاستدعاء
   - <span dir="ltr">ERC-20</span>: يتم تحويل الأصل بواسطة الجسر إلى نفسه باستخدام السماحية المقدمة من المودع
4. يستخدم جسر طبقة 1 (L1) آلية الرسائل عبر النطاقات لاستدعاء `finalizeDeposit` على جسر طبقة 2 (L2)

#### طبقة 2 (L2) {#deposit-flow-layer-2}

5. يتحقق جسر طبقة 2 (L2) من أن الاستدعاء إلى `finalizeDeposit` شرعي:
   - جاء من عقد الرسائل عبر النطاقات
   - كان في الأصل من الجسر على طبقة 1 (L1)
6. يتحقق جسر طبقة 2 (L2) مما إذا كان عقد الرمز المميز <span dir="ltr">ERC-20</span> على طبقة 2 (L2) هو العقد الصحيح:
   - يُبلغ عقد طبقة 2 (L2) أن نظيره في طبقة 1 (L1) هو نفسه الذي جاءت منه الرموز المميزة على طبقة 1 (L1)
   - يُبلغ عقد طبقة 2 (L2) أنه يدعم الواجهة الصحيحة ([باستخدام <span dir="ltr">ERC-165</span>](https://eips.ethereum.org/EIPS/eip-165)).
7. إذا كان عقد طبقة 2 (L2) هو العقد الصحيح، فاستدعه لسك العدد المناسب من الرموز المميزة إلى العنوان المناسب. إذا لم يكن كذلك، فابدأ عملية سحب للسماح للمستخدم بالمطالبة بالرموز المميزة على طبقة 1 (L1).

### تدفق السحب {#withdrawal-flow}

#### طبقة 2 (L2) {#withdrawal-flow-layer-2}

1. يستدعي الساحب جسر طبقة 2 (L2) (`withdraw` أو `withdrawTo`)
2. يحرق جسر طبقة 2 (L2) العدد المناسب من الرموز المميزة التي تنتمي إلى `msg.sender`
3. يستخدم جسر طبقة 2 (L2) آلية الرسائل عبر النطاقات لاستدعاء `finalizeETHWithdrawal` أو `finalizeERC20Withdrawal` على جسر طبقة 1 (L1)

#### طبقة 1 (L1) {#withdrawal-flow-layer-1}

4. يتحقق جسر طبقة 1 (L1) من أن الاستدعاء إلى `finalizeETHWithdrawal` أو `finalizeERC20Withdrawal` شرعي:
   - جاء من آلية الرسائل عبر النطاقات
   - كان في الأصل من الجسر على طبقة 2 (L2)
5. يحول جسر طبقة 1 (L1) الأصل المناسب (<span dir="ltr">ETH</span> أو <span dir="ltr">ERC-20</span>) إلى العنوان المناسب

## كود طبقة 1 (L1) {#layer-1-code}

هذا هو الكود الذي يعمل على طبقة 1 (L1)، شبكة إيثيريوم الرئيسية.

### IL1ERC20Bridge {#il1erc20bridge}

[تم تعريف هذه الواجهة هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
تتضمن دوال وتعريفات مطلوبة لنقل رموز <span dir="ltr">ERC-20</span> المميزة عبر الجسر.

```solidity
// SPDX-License-Identifier: MIT
```

[يتم إصدار معظم كود أوبتيميزم بموجب ترخيص <span dir="ltr">MIT</span>](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

وقت كتابة هذا المقال، أحدث إصدار من Solidity هو <span dir="ltr">0.8.12</span>.
حتى يتم إصدار الإصدار <span dir="ltr">0.9.0</span>، لا نعرف ما إذا كان هذا الكود متوافقًا معه أم لا.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * أحداث *
     **********/

    event ERC20DepositInitiated(
```

في مصطلحات جسر أوبتيميزم، يعني _الإيداع_ التحويل من طبقة 1 (L1) إلى طبقة 2 (L2)، ويعني _السحب_ التحويل من طبقة 2 (L2) إلى طبقة 1 (L1).

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

في معظم الحالات، لا يكون عنوان <span dir="ltr">ERC-20</span> على طبقة 1 (L1) هو نفس عنوان <span dir="ltr">ERC-20</span> المعادل على طبقة 2 (L2).
[يمكنك رؤية قائمة عناوين الرموز المميزة هنا](https://static.optimism.io/optimism.tokenlist.json).
العنوان الذي يحتوي على `chainId` 1 موجود على طبقة 1 (L1) (الشبكة الرئيسية) والعنوان الذي يحتوي على `chainId` 10 موجود على طبقة 2 (L2) (أوبتيميزم).
القيمتان الأخريان لـ `chainId` هما لشبكة اختبار Kovan (42) وشبكة اختبار Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

من الممكن إضافة ملاحظات إلى التحويلات، وفي هذه الحالة تتم إضافتها إلى الأحداث التي تبلغ عنها.

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

يتعامل عقد الجسر نفسه مع التحويلات في كلا الاتجاهين.
في حالة جسر طبقة 1 (L1)، يعني هذا بدء الإيداعات وإتمام عمليات السحب.

```solidity

    /********************
     * دوال عامة *
     ********************/

    /**
     * @dev الحصول على عنوان عقد جسر طبقة 2 (L2) المقابل.
     * @return عنوان عقد جسر طبقة 2 (L2) المقابل.
     */
    function l2TokenBridge() external returns (address);
```

هذه الدالة ليست ضرورية حقًا، لأنها على طبقة 2 (L2) عبارة عن عقد منشور مسبقًا، لذا فهي دائمًا على العنوان `0x4200000000000000000000000000000000000010`.
إنها هنا من أجل التماثل مع جسر طبقة 2 (L2)، لأن عنوان جسر طبقة 1 (L1) _ليس_ من السهل معرفته.

```solidity
    /**
     * @dev إيداع مبلغ من ERC-20 في رصيد المتصل على طبقة 2 (L2).
     * @param _l1Token عنوان ERC-20 على طبقة 1 (L1) الذي نقوم بإيداعه
     * @param _l2Token عنوان ERC-20 على طبقة 2 (L2) المقابل لـ طبقة 1 (L1)
     * @param _amount مبلغ ERC-20 المراد إيداعه
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على طبقة 2 (L2).
     * @param _data بيانات اختيارية لإرسالها إلى طبقة 2 (L2). يتم توفير هذه البيانات
     *        فقط لراحة العقود الخارجية. بصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات حول محتواها.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

المعلمة `_l2Gas` هي كمية غاز طبقة 2 (L2) المسموح للمعاملة بإنفاقها.
[حتى حد (مرتفع) معين، يكون هذا مجانيًا](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)، لذلك ما لم يقم عقد <span dir="ltr">ERC-20</span> بشيء غريب حقًا عند السك، فلا ينبغي أن يمثل ذلك مشكلة.
تتولى هذه الدالة السيناريو الشائع، حيث ينقل المستخدم الأصول عبر الجسر إلى نفس العنوان على سلسلة كتل مختلفة.

```solidity
    /**
     * @dev إيداع مبلغ من ERC-20 في رصيد المستلم على طبقة 2 (L2).
     * @param _l1Token عنوان ERC-20 على طبقة 1 (L1) الذي نقوم بإيداعه
     * @param _l2Token عنوان ERC-20 على طبقة 2 (L2) المقابل لـ طبقة 1 (L1)
     * @param _to عنوان طبقة 2 (L2) لإضافة السحب إليه.
     * @param _amount مبلغ ERC-20 المراد إيداعه.
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على طبقة 2 (L2).
     * @param _data بيانات اختيارية لإرسالها إلى طبقة 2 (L2). يتم توفير هذه البيانات
     *        فقط لراحة العقود الخارجية. بصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات حول محتواها.
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

هذه الدالة متطابقة تقريبًا مع `depositERC20`، لكنها تتيح لك إرسال <span dir="ltr">ERC-20</span> إلى عنوان مختلف.

```solidity
    /*************************
     * دوال عبر السلاسل *
     *************************/

    /**
     * @dev إكمال سحب من طبقة 2 (L2) إلى طبقة 1 (L1)، وإضافة الأموال إلى رصيد المستلم من
     * الرمز المميز ERC-20 على طبقة 1 (L1).
     * سيفشل هذا الاستدعاء إذا لم يتم الانتهاء من السحب المهيأ من طبقة 2 (L2).
     *
     * @param _l1Token عنوان الرمز المميز على طبقة 1 (L1) لإنهاء السحب (finalizeWithdrawal) له.
     * @param _l2Token عنوان الرمز المميز على طبقة 2 (L2) حيث تم بدء السحب.
     * @param _from عنوان طبقة 2 (L2) الذي بدأ التحويل.
     * @param _to عنوان طبقة 1 (L1) لإضافة السحب إليه.
     * @param _amount مبلغ ERC-20 المراد إيداعه.
     * @param _data البيانات المقدمة من المرسل على طبقة 2 (L2). يتم توفير هذه البيانات
     *   فقط لراحة العقود الخارجية. بصرف النظر عن فرض حد أقصى
     *   للطول، لا تقدم هذه العقود أي ضمانات حول محتواها.
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

عمليات السحب (والرسائل الأخرى من طبقة 2 (L2) إلى طبقة 1 (L1)) في أوبتيميزم هي عملية من خطوتين:

1. معاملة بدء على طبقة 2 (L2).
2. معاملة إتمام أو مطالبة على طبقة 1 (L1).
   يجب أن تحدث هذه المعاملة بعد انتهاء [فترة تحدي الخطأ](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) لمعاملة طبقة 2 (L2).

### IL1StandardBridge {#il1standardbridge}

[تم تعريف هذه الواجهة هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
يحتوي هذا الملف على تعريفات الأحداث والدوال الخاصة بـ <span dir="ltr">ETH</span>.
هذه التعريفات مشابهة جدًا لتلك المحددة في `IL1ERC20Bridge` أعلاه لـ <span dir="ltr">ERC-20</span>.

تنقسم واجهة الجسر بين ملفين لأن بعض رموز <span dir="ltr">ERC-20</span> المميزة تتطلب معالجة مخصصة ولا يمكن التعامل معها بواسطة الجسر القياسي.
بهذه الطريقة، يمكن للجسر المخصص الذي يتعامل مع مثل هذا الرمز المميز تنفيذ `IL1ERC20Bridge` ولا يضطر أيضًا إلى نقل <span dir="ltr">ETH</span> عبر الجسر.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * أحداث *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

هذا الحدث متطابق تقريبًا مع إصدار <span dir="ltr">ERC-20</span> (`ERC20DepositInitiated`)، باستثناء عدم وجود عناوين الرموز المميزة لطبقة 1 (L1) وطبقة 2 (L2).
الشيء نفسه ينطبق على الأحداث والدوال الأخرى.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * دوال عامة *
     ********************/

    /**
     * @dev إيداع مبلغ من ETH في رصيد المتصل على طبقة 2 (L2).
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev إيداع مبلغ من ETH في رصيد المستلم على طبقة 2 (L2).
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
     * دوال عبر السلاسل *
     *************************/

    /**
     * @dev إكمال سحب من طبقة 2 (L2) إلى طبقة 1 (L1)، وإضافة الأموال إلى رصيد المستلم من
     * الرمز المميز ETH على طبقة 1 (L1). نظرًا لأن xDomainMessenger فقط يمكنه استدعاء هذه الدالة، فلن يتم استدعاؤها أبدًا
     * قبل الانتهاء من السحب.
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

يتم توريث [هذا العقد](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) بواسطة كلا الجسرين ([طبقة 1 (L1)](#the-l1-bridge-contract) و[طبقة 2 (L2)](#l2-bridge-code)) لإرسال رسائل إلى الطبقة الأخرى.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* استيرادات الواجهة */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

تخبر [هذه الواجهة](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) العقد بكيفية إرسال رسائل إلى الطبقة الأخرى، باستخدام مرسل الرسائل عبر النطاقات.
مرسل الرسائل عبر النطاقات هذا هو نظام آخر بالكامل، ويستحق مقالًا خاصًا به، والذي آمل أن أكتبه في المستقبل.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev عقد مساعد للعقود التي تقوم باتصالات عبر النطاقات
 *
 * المترجم المستخدم: محدد بواسطة العقد الوارث
 */
contract CrossDomainEnabled {
    /*************
     * متغيرات *
     *************/

    // عقد المراسل المستخدم لإرسال واستقبال الرسائل من النطاق الآخر.
    address public messenger;

    /***************
     * مُنشئ *
     ***************/

    /**
     * @param _messenger عنوان CrossDomainMessenger على الطبقة الحالية.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

المعلمة الوحيدة التي يحتاج العقد إلى معرفتها، هي عنوان مرسل الرسائل عبر النطاقات على هذه الطبقة.
يتم تعيين هذه المعلمة مرة واحدة، في المُنشئ، ولا تتغير أبدًا.

```solidity

    /**********************
     * معدلات الدوال *
     **********************/

    /**
     * يفرض أن الدالة المعدلة لا يمكن استدعاؤها إلا بواسطة حساب محدد عبر النطاقات.
     * @param _sourceDomainAccount الحساب الوحيد على النطاق الأصلي
     *  المصرح له باستدعاء هذه الدالة.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

يمكن الوصول إلى المراسلة عبر النطاقات بواسطة أي عقد على سلسلة الكتل حيث يتم تشغيله (إما شبكة إيثيريوم الرئيسية أو أوبتيميزم).
لكننا نحتاج إلى أن يثق الجسر على كل جانب _فقط_ في رسائل معينة إذا كانت قادمة من الجسر على الجانب الآخر.

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

الطريقة التي يوفر بها مرسل الرسائل عبر النطاقات العنوان الذي أرسل رسالة مع الطبقة الأخرى هي [الدالة `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
طالما تم استدعاؤها في المعاملة التي بدأتها الرسالة، فيمكنها توفير هذه المعلومات.

نحتاج إلى التأكد من أن الرسالة التي تلقيناها جاءت من الجسر الآخر.

```solidity

        _;
    }

    /**********************
     * دوال داخلية *
     **********************/

    /**
     * يحصل على المراسل، عادة من التخزين. يتم كشف هذه الدالة في حال احتاج عقد فرعي
     * إلى التجاوز.
     * @return عنوان عقد المراسل عبر النطاقات الذي يجب استخدامه.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

تُرجع هذه الدالة مرسل الرسائل عبر النطاقات.
نستخدم دالة بدلاً من المتغير `messenger` للسماح للعقود التي ترث من هذا العقد باستخدام خوارزمية لتحديد مرسل الرسائل عبر النطاقات الذي يجب استخدامه.

```solidity

    /**
     * يرسل رسالة إلى حساب على نطاق آخر
     * @param _crossDomainTarget المستلم المقصود على النطاق الوجهة
     * @param _message البيانات المراد إرسالها إلى الهدف (عادةً بيانات الاستدعاء لدالة تحتوي على
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit حد الغاز (gasLimit) لاستلام الرسالة على النطاق الوجهة.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

أخيرًا، الدالة التي ترسل رسالة إلى الطبقة الأخرى.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[سليذر](https://github.com/crytic/slither) هو محلل ثابت تقوم أوبتيميزم بتشغيله على كل عقد للبحث عن نقاط الضعف والمشاكل المحتملة الأخرى.
في هذه الحالة، يؤدي السطر التالي إلى إطلاق نقطتي ضعف:

1. [أحداث إعادة الدخول](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [إعادة الدخول الحميدة](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

في هذه الحالة، لسنا قلقين بشأن إعادة الدخول، فنحن نعلم أن `getCrossDomainMessenger()` تُرجع عنوانًا جديرًا بالثقة، حتى لو لم يكن لدى سليذر طريقة لمعرفة ذلك.

### عقد جسر طبقة 1 (L1) {#the-l1-bridge-contract}

[الكود المصدري لهذا العقد موجود هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

يمكن أن تكون الواجهات جزءًا من عقود أخرى، لذا يجب أن تدعم مجموعة واسعة من إصدارات Solidity.
لكن الجسر نفسه هو عقدنا، ويمكننا أن نكون صارمين بشأن إصدار Solidity الذي يستخدمه.

```solidity
/* استيرادات الواجهة */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

تم شرح [IL1ERC20Bridge](#il1erc20bridge) و[IL1StandardBridge](#il1standardbridge) أعلاه.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

تتيح لنا [هذه الواجهة](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) إنشاء رسائل للتحكم في الجسر القياسي على طبقة 2 (L2).

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

تتيح لنا [هذه الواجهة](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) التحكم في عقود <span dir="ltr">ERC-20</span>.
[يمكنك قراءة المزيد عنها هنا](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* استيرادات المكتبة */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[كما هو موضح أعلاه](#crossdomainenabled)، يُستخدم هذا العقد للمراسلة بين الطبقات.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

يحتوي [`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) على عناوين عقود طبقة 2 (L2) التي لها نفس العنوان دائمًا. يتضمن هذا الجسر القياسي على طبقة 2 (L2).

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[أدوات العناوين المساعدة من أوبن زبلن](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). تُستخدم للتمييز بين عناوين العقود وتلك التي تنتمي إلى حسابات مملوكة خارجيًا (EOA).

لاحظ أن هذا ليس حلاً مثاليًا، لأنه لا توجد طريقة للتمييز بين الاستدعاءات المباشرة والاستدعاءات التي يتم إجراؤها من مُنشئ العقد، ولكن على الأقل يتيح لنا هذا تحديد ومنع بعض أخطاء المستخدم الشائعة.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

يدعم [معيار <span dir="ltr">ERC-20</span>](https://eips.ethereum.org/EIPS/eip-20) طريقتين للعقد للإبلاغ عن الفشل:

1. التراجع
2. إرجاع `false`

التعامل مع كلتا الحالتين سيجعل الكود الخاص بنا أكثر تعقيدًا، لذا بدلاً من ذلك نستخدم [`SafeERC20` من أوبن زبلن](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)، والذي يضمن [أن تؤدي جميع حالات الفشل إلى تراجع](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev جسر ETH و ERC-20 على طبقة 1 (L1) هو عقد يخزن أموال طبقة 1 (L1) المودعة والرموز المميزة
 * القياسية المستخدمة على طبقة 2 (L2). يقوم بمزامنة جسر طبقة 2 (L2) المقابل، وإبلاغه بالإيداعات
 * والاستماع إليه لمعرفة عمليات السحب المنتهية حديثًا.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

هذا السطر هو كيفية تحديد استخدام الغلاف `SafeERC20` في كل مرة نستخدم فيها الواجهة `IERC20`.

```solidity

    /********************************
     * مراجع العقود الخارجية *
     ********************************/

    address public l2TokenBridge;
```

عنوان [L2StandardBridge](#l2-bridge-code).

```solidity

    // يربط الرمز المميز على طبقة 1 (L1) بالرمز المميز على طبقة 2 (L2) برصيد الرمز المميز المودع على طبقة 1 (L1)
    mapping(address => mapping(address => uint256)) public deposits;
```

[التعيين](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) المزدوج مثل هذا هو الطريقة التي تحدد بها [مصفوفة متفرقة ثنائية الأبعاد](https://en.wikipedia.org/wiki/Sparse_matrix).
يتم تحديد القيم في بنية البيانات هذه كـ `deposit[L1 token addr][L2 token addr]`.
القيمة الافتراضية هي صفر.
تتم كتابة الخلايا التي تم تعيينها إلى قيمة مختلفة فقط في التخزين.

```solidity

    /***************
     * مُنشئ *
     ***************/

    // يعيش هذا العقد خلف وكيل (proxy)، لذلك ستبقى معلمات المُنشئ غير مستخدمة.
    constructor() CrossDomainEnabled(address(0)) {}
```

نريد أن نكون قادرين على ترقية هذا العقد دون الحاجة إلى نسخ جميع المتغيرات في التخزين.
للقيام بذلك، نستخدم [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)، وهو عقد يستخدم [`delegatecall`](https://solidity-by-example.org/delegatecall/) لنقل الاستدعاءات إلى عقد منفصل يتم تخزين عنوانه بواسطة عقد وكيل (عند الترقية، تخبر الوكيل بتغيير هذا العنوان).
عند استخدام `delegatecall`، يظل التخزين هو تخزين العقد _المستدعي_، لذلك لا تتأثر قيم جميع متغيرات حالة العقد.

أحد تأثيرات هذا النمط هو أن تخزين العقد الذي يتم _استدعاؤه_ بواسطة `delegatecall` لا يتم استخدامه، وبالتالي فإن قيم المُنشئ التي تم تمريرها إليه لا تهم.
هذا هو السبب في أنه يمكننا توفير قيمة غير منطقية لمُنشئ `CrossDomainEnabled`.
وهو أيضًا السبب في أن التهيئة أدناه منفصلة عن المُنشئ.

```solidity
    /******************
     * تهيئة *
     ******************/

    /**
     * @param _l1messenger عنوان مراسل طبقة 1 (L1) المستخدم للاتصالات عبر السلاسل.
     * @param _l2TokenBridge عنوان الجسر القياسي على طبقة 2 (L2).
     */
    // slither-disable-next-line external-function
```

يحدد [اختبار سليذر](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) هذا الدوال التي لا يتم استدعاؤها من كود العقد وبالتالي يمكن الإعلان عنها كـ `external` بدلاً من `public`.
يمكن أن تكون تكلفة الغاز لدوال `external` أقل، لأنه يمكن تزويدها بمعلمات في بيانات الاستدعاء.
يجب أن تكون الدوال المعلن عنها كـ `public` قابلة للوصول من داخل العقد.
لا يمكن للعقود تعديل بيانات الاستدعاء الخاصة بها، لذا يجب أن تكون المعلمات في الذاكرة.
عند استدعاء مثل هذه الدالة خارجيًا، من الضروري نسخ بيانات الاستدعاء إلى الذاكرة، مما يكلف غازًا.
في هذه الحالة، يتم استدعاء الدالة مرة واحدة فقط، لذا فإن عدم الكفاءة لا يهمنا.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

يجب استدعاء الدالة `initialize` مرة واحدة فقط.
إذا تغير عنوان إما مرسل الرسائل عبر النطاقات لطبقة 1 (L1) أو جسر الرموز المميزة لطبقة 2 (L2)، فإننا ننشئ وكيلًا جديدًا وجسرًا جديدًا يستدعيه.
من غير المرجح أن يحدث هذا إلا عند ترقية النظام بأكمله، وهو حدث نادر جدًا.

لاحظ أن هذه الدالة لا تحتوي على أي آلية تقيد _من_ يمكنه استدعاؤها.
هذا يعني أنه من الناحية النظرية يمكن للمهاجم الانتظار حتى ننشر الوكيل والإصدار الأول من الجسر ثم يقوم بـ [الاستباق](https://solidity-by-example.org/hacks/front-running/) للوصول إلى الدالة `initialize` قبل المستخدم الشرعي. ولكن هناك طريقتان لمنع ذلك:

1. إذا لم يتم نشر العقود مباشرة بواسطة حساب مملوك خارجيًا (EOA) ولكن [في معاملة تجعل عقدًا آخر ينشئها](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)، فيمكن أن تكون العملية بأكملها ذرية، وتنتهي قبل تنفيذ أي معاملة أخرى.
2. إذا فشل الاستدعاء الشرعي لـ `initialize`، فمن الممكن دائمًا تجاهل الوكيل والجسر المنشأين حديثًا وإنشاء وكيل وجسر جديدين.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

هاتان هما المعلمتان اللتان يحتاج الجسر إلى معرفتهما.

```solidity

    /**************
     * إيداع *
     **************/

    /** @dev مُعدِّل يشترط أن يكون المرسل حسابًا مملوكًا خارجيًا (EOA). يمكن تجاوز هذا التحقق بواسطة عقد
     *  ضار عبر كود التهيئة (initcode)، لكنه يعالج خطأ المستخدم الذي نريد تجنبه.
     */
    modifier onlyEOA() {
        // يستخدم لإيقاف الإيداعات من العقود (لتجنب فقدان الرموز المميزة عن طريق الخطأ)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

هذا هو السبب في أننا احتجنا إلى أدوات `Address` المساعدة من أوبن زبلن.

```solidity
    /**
     * @dev يمكن استدعاء هذه الدالة بدون بيانات
     * لإيداع مبلغ من ETH في رصيد المتصل على طبقة 2 (L2).
     * نظرًا لأن دالة الاستلام (receive) لا تأخذ بيانات، يتم إرسال مبلغ
     * افتراضي محافظ إلى طبقة 2 (L2).
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

هذه الدالة موجودة لأغراض الاختبار.
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

هاتان الدالتان عبارة عن أغلفة حول `_initiateETHDeposit`، وهي الدالة التي تتعامل مع إيداع <span dir="ltr">ETH</span> الفعلي.

```solidity
    /**
     * @dev ينفذ منطق الإيداعات عن طريق تخزين ETH وإبلاغ بوابة ETH على طبقة 2 (L2) بـ
     * الإيداع.
     * @param _from الحساب الذي سيتم سحب الإيداع منه على طبقة 1 (L1).
     * @param _to الحساب الذي سيتم إعطاء الإيداع له على طبقة 2 (L2).
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على طبقة 2 (L2).
     * @param _data بيانات اختيارية لإرسالها إلى طبقة 2 (L2). يتم توفير هذه البيانات
     *        فقط لراحة العقود الخارجية. بصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات حول محتواها.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // بناء بيانات الاستدعاء لاستدعاء finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

الطريقة التي تعمل بها الرسائل عبر النطاقات هي أنه يتم استدعاء عقد الوجهة مع الرسالة كبيانات الاستدعاء الخاصة به.
تفسر عقود Solidity دائمًا بيانات الاستدعاء الخاصة بها وفقًا لـ [مواصفات <span dir="ltr">ABI</span>](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
تنشئ دالة Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) بيانات الاستدعاء تلك.

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

الرسالة هنا هي استدعاء [الدالة `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) بهذه المعلمات:

| المعلمة | القيمة | المعنى |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | قيمة خاصة لتمثيل <span dir="ltr">ETH</span> (والذي ليس رمز <span dir="ltr">ERC-20</span> مميز) على طبقة 1 (L1) |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | عقد طبقة 2 (L2) الذي يدير <span dir="ltr">ETH</span> على أوبتيميزم، `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (هذا العقد للاستخدام الداخلي في أوبتيميزم فقط) |
| \_from | \_from | العنوان على طبقة 1 (L1) الذي يرسل <span dir="ltr">ETH</span> |
| \_to | \_to | العنوان على طبقة 2 (L2) الذي يتلقى <span dir="ltr">ETH</span> |
| amount | msg.value | كمية <span dir="ltr">Wei</span> المرسلة (والتي تم إرسالها بالفعل إلى الجسر) |
| \_data | \_data | بيانات إضافية لإرفاقها بالإيداع |

```solidity
        // إرسال بيانات الاستدعاء إلى طبقة 2 (L2)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

إرسال الرسالة من خلال مرسل الرسائل عبر النطاقات.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

إصدار حدث لإبلاغ أي تطبيق لامركزي (dapp) يستمع إلى هذا التحويل.

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

هاتان الدالتان عبارة عن أغلفة حول `_initiateERC20Deposit`، وهي الدالة التي تتعامل مع إيداع <span dir="ltr">ERC-20</span> الفعلي.

```solidity
    /**
     * @dev ينفذ منطق الإيداعات عن طريق إبلاغ عقد الرمز المميز المودع على طبقة 2 (L2)
     * بالإيداع واستدعاء معالج لقفل أموال طبقة 1 (L1). (مثل transferFrom)
     *
     * @param _l1Token عنوان ERC-20 على طبقة 1 (L1) الذي نقوم بإيداعه
     * @param _l2Token عنوان ERC-20 على طبقة 2 (L2) المقابل لـ طبقة 1 (L1)
     * @param _from الحساب الذي سيتم سحب الإيداع منه على طبقة 1 (L1)
     * @param _to الحساب الذي سيتم إعطاء الإيداع له على طبقة 2 (L2)
     * @param _amount مبلغ ERC-20 المراد إيداعه.
     * @param _l2Gas حد الغاز المطلوب لإكمال الإيداع على طبقة 2 (L2).
     * @param _data بيانات اختيارية لإرسالها إلى طبقة 2 (L2). يتم توفير هذه البيانات
     *        فقط لراحة العقود الخارجية. بصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات حول محتواها.
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

هذه الدالة مشابهة لـ `_initiateETHDeposit` أعلاه، مع بعض الاختلافات المهمة.
الاختلاف الأول هو أن هذه الدالة تتلقى عناوين الرموز المميزة والمبلغ المراد تحويله كمعلمات.
في حالة <span dir="ltr">ETH</span>، يتضمن الاستدعاء إلى الجسر بالفعل تحويل الأصل إلى حساب الجسر (`msg.value`).

```solidity
        // عند بدء إيداع على طبقة 1 (L1)، يقوم جسر طبقة 1 (L1) بتحويل الأموال إلى نفسه من أجل
        // عمليات السحب المستقبلية. يتحقق safeTransferFrom أيضًا مما إذا كان العقد يحتوي على كود، لذلك سيفشل هذا إذا كان
        // _from حسابًا مملوكًا خارجيًا (EOA) أو العنوان صفر (address(0)).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

تتبع تحويلات الرموز المميزة <span dir="ltr">ERC-20</span> عملية مختلفة عن <span dir="ltr">ETH</span>:

1. يمنح المستخدم (`_from`) سماحية للجسر لتحويل الرموز المميزة المناسبة.
2. يستدعي المستخدم الجسر بعنوان عقد الرمز المميز، والمبلغ، وما إلى ذلك.
3. يحول الجسر الرموز المميزة (إلى نفسه) كجزء من عملية الإيداع.

قد تحدث الخطوة الأولى في معاملة منفصلة عن الخطوتين الأخيرتين.
ومع ذلك، فإن الاستباق لا يمثل مشكلة لأن الدالتين اللتين تستدعيان `_initiateERC20Deposit` (`depositERC20` و`depositERC20To`) تستدعيان هذه الدالة فقط مع `msg.sender` كمعلمة `_from`.

```solidity
        // بناء بيانات الاستدعاء لـ _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // إرسال بيانات الاستدعاء إلى طبقة 2 (L2)
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

إضافة المبلغ المودع من الرموز المميزة إلى بنية بيانات `deposits`.
يمكن أن يكون هناك عناوين متعددة على طبقة 2 (L2) تتوافق مع نفس الرمز المميز <span dir="ltr">ERC-20</span> على طبقة 1 (L1)، لذلك لا يكفي استخدام رصيد الجسر من الرمز المميز <span dir="ltr">ERC-20</span> على طبقة 1 (L1) لتتبع الإيداعات.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * دوال عبر السلاسل *
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

يرسل جسر طبقة 2 (L2) رسالة إلى مرسل الرسائل عبر النطاقات لطبقة 2 (L2) مما يتسبب في قيام مرسل الرسائل عبر النطاقات لطبقة 1 (L1) باستدعاء هذه الدالة (بمجرد إرسال [المعاملة التي تتمم الرسالة](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) على طبقة 1 (L1)، بالطبع).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

تأكد من أن هذه رسالة _شرعية_، قادمة من مرسل الرسائل عبر النطاقات وتنشأ من جسر الرموز المميزة لطبقة 2 (L2).
تُستخدم هذه الدالة لسحب <span dir="ltr">ETH</span> من الجسر، لذا يتعين علينا التأكد من استدعائها فقط بواسطة المستدعي المصرح له.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

طريقة تحويل <span dir="ltr">ETH</span> هي استدعاء المستلم مع كمية <span dir="ltr">Wei</span> في `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

إصدار حدث حول عملية السحب.

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

هذه الدالة مشابهة لـ `finalizeETHWithdrawal` أعلاه، مع التغييرات اللازمة لرموز <span dir="ltr">ERC-20</span> المميزة.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

تحديث بنية بيانات `deposits`.

```solidity

        // عند الانتهاء من سحب على طبقة 1 (L1)، يقوم جسر طبقة 1 (L1) بتحويل الأموال إلى الساحب
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * مؤقت - ترحيل ETH *
     *****************************/

    /**
     * @dev يضيف رصيد ETH إلى الحساب. يُقصد بهذا السماح بترحيل ETH
     * من بوابة قديمة إلى بوابة جديدة.
     * ملاحظة: يُترك هذا لترقية واحدة فقط حتى نتمكن من استلام ETH المُرحل من
     * العقد القديم
     */
    function donateETH() external payable {}
}
```

كان هناك تنفيذ سابق للجسر.
عندما انتقلنا من ذلك التنفيذ إلى هذا التنفيذ، كان علينا نقل جميع الأصول.
يمكن ببساطة نقل رموز <span dir="ltr">ERC-20</span> المميزة.
ومع ذلك، لتحويل <span dir="ltr">ETH</span> إلى عقد، فإنك تحتاج إلى موافقة ذلك العقد، وهو ما يوفره لنا `donateETH`.

## رموز <span dir="ltr">ERC-20</span> المميزة على طبقة 2 (L2) {#erc-20-tokens-on-l2}

لكي يتناسب رمز <span dir="ltr">ERC-20</span> المميز مع الجسر القياسي، يجب أن يسمح للجسر القياسي، والجسر القياسي _فقط_، بسك الرمز المميز.
هذا ضروري لأن الجسور تحتاج إلى التأكد من أن عدد الرموز المميزة المتداولة على أوبتيميزم يساوي عدد الرموز المميزة المقفلة داخل عقد جسر طبقة 1 (L1).
إذا كان هناك عدد كبير جدًا من الرموز المميزة على طبقة 2 (L2)، فلن يتمكن بعض المستخدمين من إعادة أصولهم عبر الجسر إلى طبقة 1 (L1).
بدلاً من جسر موثوق به، سنقوم بشكل أساسي بإعادة إنشاء [الخدمات المصرفية الاحتياطية الجزئية](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
إذا كان هناك عدد كبير جدًا من الرموز المميزة على طبقة 1 (L1)، فستبقى بعض هذه الرموز المميزة مقفلة داخل عقد الجسر إلى الأبد لأنه لا توجد طريقة لتحريرها دون حرق رموز طبقة 2 (L2) المميزة.

### IL2StandardERC20 {#il2standarderc20}

يجب أن يوفر كل رمز <span dir="ltr">ERC-20</span> مميز على طبقة 2 (L2) يستخدم الجسر القياسي [هذه الواجهة](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)، والتي تحتوي على الدوال والأحداث التي يحتاجها الجسر القياسي.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

لا تتضمن [واجهة <span dir="ltr">ERC-20</span> القياسية](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) الدالتين `mint` و`burn`.
هذه الطرق غير مطلوبة بواسطة [معيار <span dir="ltr">ERC-20</span>](https://eips.ethereum.org/EIPS/eip-20)، والذي يترك آليات إنشاء وتدمير الرموز المميزة غير محددة.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

تُستخدم [واجهة <span dir="ltr">ERC-165</span>](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) لتحديد الدوال التي يوفرها العقد.
[يمكنك قراءة المعيار هنا](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

توفر هذه الدالة عنوان الرمز المميز لطبقة 1 (L1) الذي يتم نقله عبر الجسر إلى هذا العقد.
لاحظ أنه ليس لدينا دالة مماثلة في الاتجاه المعاكس.
نحتاج إلى أن نكون قادرين على نقل أي رمز مميز لطبقة 1 (L1) عبر الجسر، بغض النظر عما إذا كان دعم طبقة 2 (L2) مخططًا له عند تنفيذه أم لا.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

دوال وأحداث لسك (إنشاء) وحرق (تدمير) الرموز المميزة.
يجب أن يكون الجسر هو الكيان الوحيد الذي يمكنه تشغيل هذه الدوال لضمان صحة عدد الرموز المميزة (يساوي عدد الرموز المميزة المقفلة على طبقة 1 (L1)).

### L2StandardERC20 {#l2standarderc20}

[هذا هو تنفيذنا لواجهة `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
ما لم تكن بحاجة إلى نوع من المنطق المخصص، يجب عليك استخدام هذا التنفيذ.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[عقد <span dir="ltr">ERC-20</span> من أوبن زبلن](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
لا تؤمن أوبتيميزم بإعادة اختراع العجلة، خاصة عندما تكون العجلة مدققة جيدًا وتحتاج إلى أن تكون جديرة بالثقة بما يكفي للاحتفاظ بالأصول.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

هاتان هما معلمتا التكوين الإضافيتان اللتان نطلبهما ولا يطلبهما <span dir="ltr">ERC-20</span> عادةً.

```solidity

    /**
     * @param _l2Bridge عنوان الجسر القياسي على طبقة 2 (L2).
     * @param _l1Token عنوان الرمز المميز المقابل على طبقة 1 (L1).
     * @param _name اسم ERC-20.
     * @param _symbol رمز ERC-20.
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

أولاً استدعِ المُنشئ للعقد الذي نرث منه (`ERC20(_name, _symbol)`) ثم قم بتعيين متغيراتنا الخاصة.

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

هذه هي الطريقة التي يعمل بها [<span dir="ltr">ERC-165</span>](https://eips.ethereum.org/EIPS/eip-165).
كل واجهة عبارة عن عدد من الدوال المدعومة، ويتم تحديدها على أنها [أو الحصرية (XOR)](https://en.wikipedia.org/wiki/Exclusive_or) لـ [محددات دوال <span dir="ltr">ABI</span>](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) لتلك الدوال.

يستخدم جسر طبقة 2 (L2) <span dir="ltr">ERC-165</span> كفحص سلامة للتأكد من أن عقد <span dir="ltr">ERC-20</span> الذي يرسل إليه الأصول هو `IL2StandardERC20`.

**ملاحظة:** لا يوجد ما يمنع العقد المارق من تقديم إجابات خاطئة لـ `supportsInterface`، لذا فهذه آلية فحص سلامة، و_ليست_ آلية أمان.

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

يُسمح فقط لجسر طبقة 2 (L2) بسك وحرق الأصول.

تم تعريف `_mint` و`_burn` فعليًا في [عقد <span dir="ltr">ERC-20</span> من أوبن زبلن](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
هذا العقد لا يعرضها خارجيًا فحسب، لأن شروط سك وحرق الرموز المميزة متنوعة مثل عدد طرق استخدام <span dir="ltr">ERC-20</span>.

## كود جسر طبقة 2 (L2) {#l2-bridge-code}

هذا هو الكود الذي يشغل الجسر على أوبتيميزم.
[المصدر لهذا العقد موجود هنا](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* استيرادات الواجهة */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

واجهة [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) مشابهة جدًا لـ [ما يعادلها في طبقة 1 (L1)](#il1erc20bridge) التي رأيناها أعلاه.
هناك اختلافان مهمان:

1. على طبقة 1 (L1) تبدأ الإيداعات وتتمم عمليات السحب.
   هنا تبدأ عمليات السحب وتتمم الإيداعات.
2. على طبقة 1 (L1) من الضروري التمييز بين <span dir="ltr">ETH</span> ورموز <span dir="ltr">ERC-20</span> المميزة.
   على طبقة 2 (L2) يمكننا استخدام نفس الدوال لكليهما لأنه داخليًا يتم التعامل مع أرصدة <span dir="ltr">ETH</span> على أوبتيميزم كرمز <span dir="ltr">ERC-20</span> مميز بالعنوان [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* استيرادات المكتبة */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* استيرادات العقد */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev الجسر القياسي على طبقة 2 (L2) هو عقد يعمل مع الجسر القياسي على طبقة 1 (L1) لـ
 * تمكين انتقالات ETH و ERC-20 بين طبقة 1 (L1) و طبقة 2 (L2).
 * يعمل هذا العقد كأداة سك للرموز المميزة الجديدة عندما يسمع عن إيداعات في الجسر القياسي
 * على طبقة 1 (L1).
 * يعمل هذا العقد أيضًا كأداة حرق للرموز المميزة المخصصة لعمليات السحب، لإبلاغ جسر
 * طبقة 1 (L1) بتحرير أموال طبقة 1 (L1).
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * مراجع العقود الخارجية *
     ********************************/

    address public l1TokenBridge;
```

تتبع عنوان جسر طبقة 1 (L1).
لاحظ أنه على عكس ما يعادله في طبقة 1 (L1)، فإننا هنا _نحتاج_ إلى هذا المتغير.
عنوان جسر طبقة 1 (L1) غير معروف مسبقًا.

```solidity

    /***************
     * مُنشئ *
     ***************/

    /**
     * @param _l2CrossDomainMessenger المراسل عبر النطاقات المستخدم بواسطة هذا العقد.
     * @param _l1TokenBridge عنوان جسر طبقة 1 (L1) المنشور على السلسلة الرئيسية.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * سحب *
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

هاتان الدالتان تبدآن عمليات السحب.
لاحظ أنه ليست هناك حاجة لتحديد عنوان الرمز المميز لطبقة 1 (L1).
من المتوقع أن تخبرنا رموز طبقة 2 (L2) المميزة بعنوان ما يعادلها في طبقة 1 (L1).

```solidity

    /**
     * @dev ينفذ منطق عمليات السحب عن طريق حرق الرمز المميز وإبلاغ
     *      بوابة الرمز المميز على طبقة 1 (L1) بـ سحب.
     * @param _l2Token عنوان الرمز المميز على طبقة 2 (L2) حيث تم بدء السحب.
     * @param _from الحساب الذي سيتم سحب السحب منه على طبقة 2 (L2).
     * @param _to الحساب الذي سيتم إعطاء السحب له على طبقة 1 (L1).
     * @param _amount مبلغ الرمز المميز المراد سحبه.
     * @param _l1Gas غير مستخدم، ولكنه مضمن لاعتبارات التوافق المستقبلي المحتملة.
     * @param _data بيانات اختيارية لإرسالها إلى طبقة 1 (L1). يتم توفير هذه البيانات
     *        فقط لراحة العقود الخارجية. بصرف النظر عن فرض حد أقصى
     *        للطول، لا تقدم هذه العقود أي ضمانات حول محتواها.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // عند بدء سحب، نقوم بـ حرق أموال الساحب لمنع
        // الاستخدام اللاحق على طبقة 2 (L2)
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

لاحظ أننا _لا_ نعتمد على المعلمة `_from` ولكن على `msg.sender` وهو أمر يصعب تزييفه كثيرًا (مستحيل، على حد علمي).

```solidity

        // بناء بيانات الاستدعاء لـ l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

على طبقة 1 (L1) من الضروري التمييز بين <span dir="ltr">ETH</span> و<span dir="ltr">ERC-20</span>.

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

        // إرسال رسالة إلى جسر طبقة 1 (L1)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * دالة عبر السلاسل: إيداع *
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

يتم استدعاء هذه الدالة بواسطة `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

تأكد من أن مصدر الرسالة شرعي.
هذا مهم لأن هذه الدالة تستدعي `_mint` ويمكن استخدامها لإعطاء رموز مميزة غير مغطاة بالرموز المميزة التي يمتلكها الجسر على طبقة 1 (L1).

```solidity
        // التحقق من أن الرمز المميز المستهدف متوافق و
        // التحقق من أن الرمز المميز المودع على طبقة 1 (L1) يطابق تمثيل الرمز المميز المودع على طبقة 2 (L2) هنا
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

فحوصات السلامة:

1. الواجهة الصحيحة مدعومة
2. يتطابق عنوان طبقة 1 (L1) لعقد <span dir="ltr">ERC-20</span> على طبقة 2 (L2) مع مصدر طبقة 1 (L1) للرموز المميزة

```solidity
        ) {
            // عند الانتهاء من إيداع، نقوم بإضافة نفس المبلغ إلى الحساب على طبقة 2 (L2) من
            // الرموز المميزة.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

إذا نجحت فحوصات السلامة، فقم بإتمام الإيداع:

1. سك الرموز المميزة
2. إصدار الحدث المناسب

```solidity
        } else {
            // إما أن الرمز المميز على طبقة 2 (L2) الذي يتم الإيداع فيه يختلف حول العنوان الصحيح
            // للرمز المميز الخاص به على طبقة 1 (L1)، أو لا يدعم الواجهة الصحيحة.
            // يجب أن يحدث هذا فقط إذا كان هناك رمز مميز ضار على طبقة 2 (L2)، أو إذا قام مستخدم بطريقة ما
            // بتحديد عنوان الرمز المميز الخاطئ على طبقة 2 (L2) للإيداع فيه.
            // في كلتا الحالتين، نوقف العملية هنا ونقوم ببناء سحب
            // رسالة حتى يتمكن المستخدمون من إخراج أموالهم في بعض الحالات.
            // لا توجد طريقة لمنع عقود الرموز المميزة الضارة تمامًا، ولكن هذا يحد من
            // خطأ المستخدم ويخفف من بعض أشكال سلوك العقد الضار.
```

إذا ارتكب المستخدم خطأً يمكن اكتشافه باستخدام عنوان الرمز المميز الخاطئ لطبقة 2 (L2)، فإننا نريد إلغاء الإيداع وإرجاع الرموز المميزة على طبقة 1 (L1).
الطريقة الوحيدة التي يمكننا من خلالها القيام بذلك من طبقة 2 (L2) هي إرسال رسالة سيتعين عليها انتظار فترة تحدي الخطأ، ولكن هذا أفضل بكثير للمستخدم من فقدان الرموز المميزة بشكل دائم.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // تم تبديل _to و _from هنا لإرجاع الإيداع إلى المرسل
                _from,
                _amount,
                _data
            );

            // إرسال رسالة إلى جسر طبقة 1 (L1)
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## الخاتمة {#conclusion}

الجسر القياسي هو الآلية الأكثر مرونة لتحويلات الأصول.
ومع ذلك، نظرًا لأنه عام جدًا، فإنه ليس دائمًا الآلية الأسهل في الاستخدام.
خاصة بالنسبة لعمليات السحب، يفضل معظم المستخدمين استخدام [جسور تابعة لجهات خارجية](https://optimism.io/apps#bridge) لا تنتظر فترة التحدي ولا تتطلب إثبات ميركل لإتمام عملية السحب.

تعمل هذه الجسور عادةً من خلال امتلاك أصول على طبقة 1 (L1)، والتي توفرها على الفور مقابل رسوم رمزية (غالبًا ما تكون أقل من تكلفة الغاز لعملية سحب عبر الجسر القياسي).
عندما يتوقع الجسر (أو الأشخاص الذين يديرونه) نقصًا في أصول طبقة 1 (L1)، فإنه يحول أصولاً كافية من طبقة 2 (L2). نظرًا لأن هذه عمليات سحب كبيرة جدًا، يتم إطفاء تكلفة السحب على مبلغ كبير وتكون نسبة مئوية أصغر بكثير.

نأمل أن يكون هذا المقال قد ساعدك على فهم المزيد حول كيفية عمل طبقة 2 (L2)، وكيفية كتابة كود Solidity واضح وآمن.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).