---
title: "⁦ERC-20⁩ مع حواجز الأمان"
description: "كيفية مساعدة الأشخاص على تجنب الأخطاء السخيفة"
author: "أوري بوميرانتس"
lang: ar
tags: ["erc-20"]
skill: beginner
breadcrumb: "أمان ⁦ERC-20⁩"
published: 2022-08-15
---

## المقدمة {#introduction}

من أعظم الأشياء في إيثيريوم هو عدم وجود سلطة مركزية يمكنها تعديل معاملاتك أو التراجع عنها. ومن أكبر المشكلات في إيثيريوم هو عدم وجود سلطة مركزية تمتلك القدرة على التراجع عن أخطاء المستخدمين أو المعاملات غير المشروعة. في هذه المقالة، ستتعرف على بعض الأخطاء الشائعة التي يرتكبها المستخدمون مع الرموز المميزة [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، بالإضافة إلى كيفية إنشاء عقود <span dir="ltr">ERC-20</span> تساعد المستخدمين على تجنب تلك الأخطاء، أو تمنح سلطة مركزية بعض الصلاحيات (على سبيل المثال، تجميد الحسابات).

لاحظ أنه على الرغم من أننا سنستخدم [عقد الرمز المميز <span dir="ltr">ERC-20</span> من OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)، إلا أن هذه المقالة لا تشرحه بتفصيل كبير. يمكنك العثور على هذه المعلومات [هنا](/developers/tutorials/erc20-annotated-code).

إذا كنت ترغب في رؤية الكود المصدري الكامل:

1. افتح [Remix IDE](https://remix.ethereum.org/).
2. انقر على أيقونة استنساخ GitHub (![clone github icon](icon-clone.png)).
3. استنسخ مستودع GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. افتح **contracts > erc20-safety-rails.sol**.

لاحظ أن المستودع كُتب لإصدار OpenZeppelin Contracts <span dir="ltr">4.7.2</span>، حيث تُسمى الدالة التي تتجاوزها هذه المقالة `_beforeTokenTransfer`. تستخدم هذه المقالة الإصدار الحالي OpenZeppelin Contracts <span dir="ltr">5.x</span>، حيث تتجاوز `_update` بدلاً من ذلك، لذا يختلف الكود في هذه المقالة قليلاً عن الكود الموجود في المستودع.

## إنشاء عقد <span dir="ltr">ERC-20</span> {#creating-an-erc-20-contract}

قبل أن نتمكن من إضافة وظيفة حواجز الأمان، نحتاج إلى عقد <span dir="ltr">ERC-20</span>. في هذه المقالة، سنستخدم [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). افتحه في متصفح آخر واتبع هذه التعليمات:

1. حدد **ERC20**.
2. أدخل هذه الإعدادات:

   | المعلمة | القيمة |
   | -------------- | ------------------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None (قم بإلغاء تحديد **Permit**) |
   | Access Control | Ownable |
   | Upgradability | None |

3. قم بالتمرير لأعلى وانقر على **Open in Remix** (لـ Remix) أو **Download** لاستخدام بيئة مختلفة. سأفترض أنك تستخدم Remix، وإذا كنت تستخدم شيئًا آخر، فما عليك سوى إجراء التغييرات المناسبة.
4. لدينا الآن عقد <span dir="ltr">ERC-20</span> يعمل بكامل طاقته. يمكنك توسيع `.deps` > `npm` لرؤية الكود المستورد.
5. قم بتجميع العقد ونشره وتجربته للتأكد من أنه يعمل كعقد <span dir="ltr">ERC-20</span>. إذا كنت بحاجة إلى تعلم كيفية استخدام Remix، [استخدم هذا البرنامج التعليمي](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## الأخطاء الشائعة {#common-mistakes}

### الأخطاء {#the-mistakes}

يرسل المستخدمون أحيانًا الرموز المميزة إلى العنوان الخطأ. على الرغم من أننا لا نستطيع قراءة أفكارهم لمعرفة ما كانوا يقصدون القيام به، إلا أن هناك نوعين من الأخطاء التي تحدث كثيرًا ويسهل اكتشافها:

1. إرسال الرموز المميزة إلى عنوان العقد نفسه. على سبيل المثال، تمكن [الرمز المميز OP الخاص بـ أوبتيميزم](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) من تجميع [أكثر من <span dir="ltr">120,000</span>](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) رمز OP في أقل من شهرين. يمثل هذا قدرًا كبيرًا من الثروة التي يُفترض أن الناس فقدوها للتو.

2. إرسال الرموز المميزة إلى عنوان فارغ، وهو عنوان لا يتوافق مع [حساب مملوك خارجيًا (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) أو [عقد ذكي](/developers/docs/smart-contracts). على الرغم من أنه ليس لدي إحصائيات حول عدد مرات حدوث ذلك، إلا أن [حادثة واحدة كان من الممكن أن تكلف <span dir="ltr">20,000,000</span> رمز مميز](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### منع التحويلات {#preventing-transfers}

في عقد <span dir="ltr">ERC-20</span> من OpenZeppelin، يمر كل تغيير في الأرصدة، سواء كان تحويلاً أو سكاً أو حرقاً، عبر [دالة داخلية، `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). يمكننا تجاوزها لربط وظيفتنا الخاصة بها، مثل عمليات التحقق التي تتراجع إذا كانت هناك مشكلة.

للقيام بذلك، أضف هذه الدالة بعد المُنشئ:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

قد تكون بعض أجزاء هذه الدالة جديدة إذا لم تكن على دراية جيدة بـ Solidity:

```solidity
        internal virtual
```

تعني الكلمة المفتاحية `virtual` أنه تمامًا كما ورثنا الوظائف من `ERC20` وتجاوزنا هذه الدالة، يمكن للعقود الأخرى أن ترث منا وتتجاوز هذه الدالة.

```solidity
        override(ERC20)
```

يجب أن نحدد صراحةً أننا [نتجاوز](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) تعريف الرمز المميز ERC20 لـ `_update`. بشكل عام، التعريفات الصريحة أفضل بكثير من الناحية الأمنية من التعريفات الضمنية - لا يمكنك أن تنسى أنك فعلت شيئًا إذا كان أمامك مباشرة. وهذا هو السبب أيضًا في أننا بحاجة إلى تحديد `_update` الخاص بالفئة العليا (superclass) التي نتجاوزها.

```solidity
        super._update(from, to, value);
```

يستدعي هذا السطر الدالة `_update` للعقد أو العقود التي ورثنا منها والتي تحتوي عليها. في هذه الحالة، هذا هو `ERC20` فقط، ولا يحتوي `Ownable` على هذه الدالة. على عكس الخطاف (hook) الفارغ، فإن `ERC20._update` هو ما ينقل الرموز المميزة فعليًا، لذا من الضروري استدعاؤه. تسبق عمليات التحقق الخاصة بنا هذا الاستدعاء، بحيث يمكنها التراجع قبل أي تغييرات في الرصيد.

### برمجة المتطلبات {#coding-the-requirements}

نريد إضافة هذه المتطلبات إلى الدالة. نظرًا لأن `_update` يُستدعى أيضًا عند حرق الرموز المميزة، مع تعيين `to` إلى `address(0)`، فإننا نتحقق من `to` فقط عندما لا يكون `address(0)`:

- لا يمكن أن يساوي العنوان `to` قيمة `address(this)`، وهو عنوان عقد <span dir="ltr">ERC-20</span> نفسه.
- لا يمكن أن يكون العنوان `to` فارغًا، يجب أن يكون إما:
  - حساب مملوك خارجياً (EOA). لا يمكننا التحقق مما إذا كان العنوان هو حساب مملوك خارجياً (EOA) بشكل مباشر، ولكن يمكننا التحقق من رصيد ETH الخاص بالعنوان. تمتلك الحسابات المملوكة خارجياً (EOA) رصيدًا دائمًا تقريبًا، حتى لو لم تعد مستخدمة - فمن الصعب تصفيرها حتى آخر Wei.
  - عقد ذكي. يعد اختبار ما إذا كان العنوان عقدًا ذكيًا أصعب قليلاً. يوجد رمز التشغيل الذي يتحقق من طول الكود الخارجي، ويسمى [`EXTCODESIZE`](https://www.evm.codes/#3b). في Solidity، يمكنك الحصول عليه باستخدام [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types)، والذي يحوله المترجم إلى `EXTCODESIZE`. هنا نستخدم [Yul](https://docs.soliditylang.org/en/latest/yul.html)، وهي لغة تجميع EVM، لإظهار كيفية استدعاء رمز التشغيل مباشرة. لاحظ أنه منذ [<span dir="ltr">EIP-7702</span>](https://eips.ethereum.org/EIPS/eip-7702)، يمكن أن يحتوي الحساب المملوك خارجياً (EOA) أيضًا على كود (تفويض إلى عقد)، لذا فإن هذا التحقق يحدد الحسابات التي تحتوي على كود، وليس العقود بشكل صارم. بالنسبة لغرضنا، وهو رفض العناوين الفارغة، فهذا جيد.

إليك الدالة الكاملة:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // الحرق يرسل الرموز المميزة إلى العنوان(0)، لا تقم بعمل كتلة له
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

دعنا نراجع الكود الجديد سطرًا بسطر:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

هذا هو المطلب الأول، التحقق من أن `to` و `this(address)` ليسا نفس الشيء.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

هذه هي الطريقة التي نتحقق بها مما إذا كان العنوان عقدًا. لا يمكننا تلقي المخرجات مباشرة من Yul، لذا بدلاً من ذلك نحدد متغيرًا للاحتفاظ بالنتيجة (`isToContract` في هذه الحالة). الطريقة التي يعمل بها Yul هي أن كل رمز التشغيل يُعتبر دالة. لذا نستدعي أولاً [`EXTCODESIZE`](https://www.evm.codes/#3b) للحصول على حجم العقد، ثم نستخدم [`GT`](https://www.evm.codes/#11) للتحقق من أنه ليس صفرًا (نحن نتعامل مع أعداد صحيحة غير سالبة، لذا بالطبع لا يمكن أن تكون سالبة). ثم نكتب النتيجة في `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

وأخيرًا، لدينا التحقق الفعلي من العناوين الفارغة.

## الوصول الإداري {#admin-access}

في بعض الأحيان يكون من المفيد وجود مسؤول يمكنه التراجع عن الأخطاء. لتقليل احتمالية إساءة الاستخدام، يمكن أن يكون هذا المسؤول [متعدد التوقيعات](https://blog.logrocket.com/security-choices-multi-signature-wallets/) بحيث يتعين على عدة أشخاص الموافقة على إجراء ما. في هذه المقالة سيكون لدينا ميزتان إداريتان:

1. تجميد وإلغاء تجميد الحسابات. يمكن أن يكون هذا مفيدًا، على سبيل المثال، عندما يكون الحساب مخترقًا.
2. تنظيف الأصول.

   في بعض الأحيان يرسل المحتالون رموزًا مميزة احتيالية إلى عقد الرمز المميز الحقيقي لاكتساب الشرعية. على سبيل المثال، [انظر هنا](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). عقد <span dir="ltr">ERC-20</span> الشرعي هو [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). عملية الاحتيال التي تتظاهر بأنها هي [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   من الممكن أيضًا أن يرسل الأشخاص رموز <span dir="ltr">ERC-20</span> شرعية إلى عقدنا عن طريق الخطأ، وهو سبب آخر للرغبة في إيجاد طريقة لإخراجها.

توفر أوبن زبلن آليتين لتمكين الوصول الإداري:

- عقود [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) لها مالك واحد. الدوال التي تحتوي على [المُعدِّل (modifier)](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) `onlyOwner` لا يمكن استدعاؤها إلا من قبل هذا المالك. يمكن للمالكين نقل الملكية إلى شخص آخر أو التخلي عنها تمامًا. حقوق جميع الحسابات الأخرى متطابقة عادةً.
- عقود [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) لديها [تحكم في الوصول قائم على الأدوار (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

من أجل البساطة، نستخدم في هذه المقالة `Ownable`.

### تجميد وإلغاء تجميد العقود {#freezing-and-thawing-contracts}

يتطلب تجميد العقود وإلغاء تجميدها عدة تغييرات:

- [تخطيط (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) من العناوين إلى [القيم المنطقية (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) لتتبع العناوين المجمدة. تكون جميع القيم في البداية صفرًا، والتي تُفسر بالنسبة للقيم المنطقية على أنها خطأ (false). هذا ما نريده لأن الحسابات لا تكون مجمدة افتراضيًا.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [أحداث](https://docs.soliditylang.org/en/latest/contracts.html#events) لإبلاغ أي شخص مهتم عند تجميد حساب أو إلغاء تجميده. من الناحية الفنية، الأحداث ليست مطلوبة لهذه الإجراءات، ولكنها تساعد الكود خارج السلسلة على التمكن من الاستماع إلى هذه الأحداث ومعرفة ما يحدث. يُعتبر من الممارسات الجيدة للعقد الذكي أن يصدرها عندما يحدث شيء قد يكون ذا صلة بشخص آخر.

  تتم فهرسة الأحداث بحيث يكون من الممكن البحث عن جميع الأوقات التي تم فيها تجميد حساب أو إلغاء تجميده.

  ```solidity
    // عندما يتم تجميد الحسابات أو إلغاء تجميدها
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- دوال لتجميد الحسابات وإلغاء تجميدها. هاتان الدالتان متطابقتان تقريبًا، لذا سنراجع دالة التجميد فقط.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  يمكن استدعاء الدوال المميزة بـ [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) من عقود ذكية أخرى أو مباشرة بواسطة معاملة.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // تجميد الحساب
  ```

  إذا كان الحساب مجمدًا بالفعل، تراجع. بخلاف ذلك، قم بتجميده و `emit` حدث.

- قم بتغيير `_update` لمنع نقل الأموال من حساب مجمد. لاحظ أنه لا يزال من الممكن تحويل الأموال إلى الحساب المجمد. ضع هذا السطر في بداية الدالة، خارج كتلة `if`، بحيث يمنع أيضًا حرق الرموز المميزة من حساب مجمد.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### تنظيف الأصول {#asset-cleanup}

لتحرير الرموز المميزة <span dir="ltr">ERC-20</span> التي يحتفظ بها هذا العقد، نحتاج إلى استدعاء دالة في عقد الرمز المميز الذي تنتمي إليه، إما [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) أو [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). لا جدوى من إهدار الغاز في هذه الحالة على المخصصات (allowances)، بل من الأفضل أن نقوم بالتحويل مباشرة.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

هذه هي الصيغة لإنشاء كائن لعقد عندما نتلقى العنوان. لاستخدامه، نحتاج إلى [تعريف IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)، وهي الواجهة لعقد <span dir="ltr">ERC-20</span> من OpenZeppelin. يجلب سطر `import {ERC20} from ...` الخاص بـ Wizard فقط `ERC20`، لذا أضف هذا السطر بجوار الواردات (imports) الأخرى في أعلى الملف:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

هذه دالة تنظيف، لذا من المفترض أننا لا نريد ترك أي رموز مميزة. بدلاً من الحصول على الرصيد من المستخدم يدويًا، من الأفضل أن نقوم بأتمتة العملية.

## الخاتمة {#conclusion}

هذا ليس حلاً مثاليًا - لا يوجد حل مثالي لمشكلة "المستخدم ارتكب خطأ". ومع ذلك، فإن استخدام هذه الأنواع من عمليات التحقق يمكن أن يمنع على الأقل بعض الأخطاء. يمكن استخدام القدرة على تجميد الحسابات، على الرغم من خطورتها، للحد من أضرار بعض الاختراقات عن طريق حرمان المخترق من الأموال المسروقة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).
