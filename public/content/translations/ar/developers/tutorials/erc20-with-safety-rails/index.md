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

من أعظم الأشياء في إيثيريوم هو عدم وجود سلطة مركزية يمكنها تعديل أو التراجع عن معاملاتك. ومن أكبر المشكلات في إيثيريوم هو عدم وجود سلطة مركزية تتمتع بصلاحية التراجع عن أخطاء المستخدمين أو المعاملات غير المشروعة. في هذه المقالة، ستتعرف على بعض الأخطاء الشائعة التي يرتكبها المستخدمون مع الرموز المميزة من نوع [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، بالإضافة إلى كيفية إنشاء عقود <span dir="ltr">ERC-20</span> تساعد المستخدمين على تجنب تلك الأخطاء، أو تمنح سلطة مركزية بعض الصلاحيات (على سبيل المثال، تجميد الحسابات).

لاحظ أنه على الرغم من أننا سنستخدم [عقد الرمز المميز <span dir="ltr">ERC-20</span> من أوبن زبلن](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)، إلا أن هذه المقالة لا تشرحه بتفصيل كبير. يمكنك العثور على هذه المعلومات [هنا](/developers/tutorials/erc20-annotated-code).

إذا كنت ترغب في رؤية الكود المصدري الكامل:

1. افتح [بيئة التطوير المتكاملة Remix](https://remix.ethereum.org/).
2. انقر على أيقونة استنساخ GitHub (![clone github icon](icon-clone.png)).
3. استنسخ مستودع GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. افتح **contracts > erc20-safety-rails.sol**.

## إنشاء عقد <span dir="ltr">ERC-20</span> {#creating-an-erc-20-contract}

قبل أن نتمكن من إضافة وظيفة حواجز الأمان، نحتاج إلى عقد <span dir="ltr">ERC-20</span>. في هذه المقالة، سنستخدم [معالج عقود أوبن زبلن](https://docs.openzeppelin.com/contracts/5.x/wizard). افتحه في متصفح آخر واتبع هذه التعليمات:

1. حدد **ERC20**.
2. أدخل هذه الإعدادات:

   | المعلمة | القيمة |
   | -------------- | ---------------- |
   | الاسم | SafetyRailsToken |
   | الرمز | SAFE |
   | السك المسبق | 1000 |
   | الميزات | لا شيء |
   | التحكم في الوصول | Ownable |
   | قابلية الترقية | لا شيء |

3. قم بالتمرير لأعلى وانقر على **Open in Remix** (لـ Remix) أو **Download** لاستخدام بيئة مختلفة. سأفترض أنك تستخدم Remix، وإذا كنت تستخدم شيئًا آخر، فما عليك سوى إجراء التغييرات المناسبة.
4. لدينا الآن عقد <span dir="ltr">ERC-20</span> يعمل بكامل طاقته. يمكنك توسيع `.deps` > `npm` لرؤية الكود المستورد.
5. قم بتجميع ونشر وتجربة العقد للتأكد من أنه يعمل كعقد <span dir="ltr">ERC-20</span>. إذا كنت بحاجة إلى تعلم كيفية استخدام Remix، [استخدم هذا البرنامج التعليمي](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## الأخطاء الشائعة {#common-mistakes}

### الأخطاء {#the-mistakes}

يرسل المستخدمون أحيانًا الرموز المميزة إلى العنوان الخطأ. على الرغم من أننا لا نستطيع قراءة أفكارهم لمعرفة ما كانوا يقصدون القيام به، إلا أن هناك نوعين من الأخطاء التي تحدث كثيرًا ويسهل اكتشافها:

1. إرسال الرموز المميزة إلى عنوان العقد نفسه. على سبيل المثال، تمكن [الرمز المميز OP الخاص بـ أوبتيميزم](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) من تجميع [أكثر من <span dir="ltr">120,000</span>](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) رمز OP في أقل من شهرين. يمثل هذا قدرًا كبيرًا من الثروة التي يُفترض أن الناس فقدوها للتو.

2. إرسال الرموز المميزة إلى عنوان فارغ، وهو عنوان لا يتوافق مع [حساب مملوك خارجيًا (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) أو [عقد ذكي](/developers/docs/smart-contracts). على الرغم من أنه ليس لدي إحصائيات حول عدد مرات حدوث ذلك، إلا أن [حادثة واحدة كان من الممكن أن تكلف <span dir="ltr">20,000,000</span> رمز مميز](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### منع التحويلات {#preventing-transfers}

يتضمن عقد <span dir="ltr">ERC-20</span> من أوبن زبلن [خطافًا (hook)، `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)، يتم استدعاؤه قبل تحويل الرمز المميز. افتراضيًا، لا يفعل هذا الخطاف أي شيء، ولكن يمكننا تعليق وظائفنا الخاصة عليه، مثل عمليات التحقق التي تتراجع إذا كانت هناك مشكلة.

لاستخدام الخطاف، أضف هذه الدالة بعد المُنشئ:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

قد تكون بعض أجزاء هذه الدالة جديدة إذا لم تكن على دراية جيدة بـ Solidity:

```solidity
        internal virtual
```

تعني الكلمة الرئيسية `virtual` أنه تمامًا كما ورثنا الوظائف من `ERC20` وتجاوزنا هذه الدالة، يمكن للعقود الأخرى أن ترث منا وتتجاوز هذه الدالة.

```solidity
        override(ERC20)
```

يجب أن نحدد صراحةً أننا [نتجاوز](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) تعريف الرمز المميز ERC20 لـ `_beforeTokenTransfer`. بشكل عام، التعريفات الصريحة أفضل بكثير، من الناحية الأمنية، من التعريفات الضمنية - لا يمكنك أن تنسى أنك فعلت شيئًا إذا كان أمامك مباشرة. وهذا هو السبب أيضًا في أننا بحاجة إلى تحديد `_beforeTokenTransfer` الخاص بالفئة الفائقة (superclass) الذي نتجاوزه.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

يستدعي هذا السطر الدالة `_beforeTokenTransfer` للعقد أو العقود التي ورثنا منها والتي تحتوي عليها. في هذه الحالة، هذا هو `ERC20` فقط، ولا يحتوي `Ownable` على هذا الخطاف. على الرغم من أن `ERC20._beforeTokenTransfer` لا يفعل أي شيء حاليًا، إلا أننا نستدعيه في حالة إضافة وظائف في المستقبل (ونقرر بعد ذلك إعادة نشر العقد، لأن العقود لا تتغير بعد النشر).

### برمجة المتطلبات {#coding-the-requirements}

نريد إضافة هذه المتطلبات إلى الدالة:

- لا يمكن أن يساوي العنوان `to` العنوان `address(this)`، وهو عنوان عقد <span dir="ltr">ERC-20</span> نفسه.
- لا يمكن أن يكون العنوان `to` فارغًا، يجب أن يكون إما:
  - حساب مملوك خارجيًا (EOA). لا يمكننا التحقق مما إذا كان العنوان هو EOA بشكل مباشر، ولكن يمكننا التحقق من رصيد ETH للعنوان. تمتلك حسابات EOA دائمًا رصيدًا تقريبًا، حتى لو لم تعد مستخدمة - فمن الصعب تصفيتها حتى آخر Wei.
  - عقد ذكي. يعد اختبار ما إذا كان العنوان عقدًا ذكيًا أصعب قليلاً. يوجد رمز التشغيل الذي يتحقق من طول الكود الخارجي، ويسمى [`EXTCODESIZE`](https://www.evm.codes/#3b)، ولكنه غير متوفر مباشرة في Solidity. علينا استخدام [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)، وهي لغة التجميع الخاصة بآلة إيثيريوم الافتراضية (EVM)، للقيام بذلك. هناك قيم أخرى يمكننا استخدامها من Solidity ([`<address>.code` و `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types))، لكنها تكلف أكثر.

دعنا نراجع الكود الجديد سطرًا بسطر:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

هذا هو المطلب الأول، تحقق من أن `to` و `this(address)` ليسا نفس الشيء.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

هذه هي الطريقة التي نتحقق بها مما إذا كان العنوان عقدًا. لا يمكننا تلقي المخرجات مباشرة من Yul، لذلك نحدد بدلاً من ذلك متغيرًا للاحتفاظ بالنتيجة (`isToContract` في هذه الحالة). الطريقة التي تعمل بها Yul هي أن كل رمز التشغيل يعتبر دالة. لذلك نستدعي أولاً [`EXTCODESIZE`](https://www.evm.codes/#3b) للحصول على حجم العقد، ثم نستخدم [`GT`](https://www.evm.codes/#11) للتحقق من أنه ليس صفرًا (نحن نتعامل مع أعداد صحيحة غير سالبة، لذلك بالطبع لا يمكن أن تكون سالبة). ثم نكتب النتيجة في `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

وأخيرًا، لدينا الفحص الفعلي للعناوين الفارغة.

## الوصول الإداري {#admin-access}

في بعض الأحيان يكون من المفيد وجود مسؤول يمكنه التراجع عن الأخطاء. لتقليل احتمالية إساءة الاستخدام، يمكن أن يكون هذا المسؤول [متعدد التوقيعات](https://blog.logrocket.com/security-choices-multi-signature-wallets/) بحيث يتعين على عدة أشخاص الموافقة على إجراء ما. في هذه المقالة سيكون لدينا ميزتان إداريتان:

1. تجميد وإلغاء تجميد الحسابات. يمكن أن يكون هذا مفيدًا، على سبيل المثال، عندما يكون الحساب مخترقًا.
2. تنظيف الأصول.

   في بعض الأحيان يرسل المحتالون رموزًا مميزة احتيالية إلى عقد الرمز المميز الحقيقي لاكتساب الشرعية. على سبيل المثال، [انظر هنا](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). عقد <span dir="ltr">ERC-20</span> الشرعي هو [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). عملية الاحتيال التي تتظاهر بأنها هي [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   من الممكن أيضًا أن يرسل الأشخاص رموز <span dir="ltr">ERC-20</span> شرعية إلى عقدنا عن طريق الخطأ، وهو سبب آخر للرغبة في إيجاد طريقة لإخراجها.

توفر أوبن زبلن آليتين لتمكين الوصول الإداري:

- عقود [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) لها مالك واحد. الدوال التي تحتوي على [المُعدِّل (modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` لا يمكن استدعاؤها إلا من قبل هذا المالك. يمكن للمالكين نقل الملكية إلى شخص آخر أو التخلي عنها تمامًا. حقوق جميع الحسابات الأخرى متطابقة عادةً.
- عقود [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) لديها [تحكم في الوصول قائم على الأدوار (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

من أجل البساطة، نستخدم في هذه المقالة `Ownable`.

### تجميد وإلغاء تجميد العقود {#freezing-and-thawing-contracts}

يتطلب تجميد وإلغاء تجميد العقود عدة تغييرات:

- [تخطيط (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) من العناوين إلى [القيم المنطقية (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) لتتبع العناوين المجمدة. جميع القيم تكون صفرًا في البداية، والتي تُفسر للقيم المنطقية على أنها خطأ (false). هذا ما نريده لأنه افتراضيًا لا يتم تجميد الحسابات.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [أحداث](https://www.tutorialspoint.com/solidity/solidity_events.htm) لإبلاغ أي شخص مهتم عند تجميد حساب أو إلغاء تجميده. من الناحية الفنية، الأحداث ليست مطلوبة لهذه الإجراءات، ولكنها تساعد الكود خارج السلسلة على التمكن من الاستماع إلى هذه الأحداث ومعرفة ما يحدث. يعتبر من الممارسات الجيدة للعقد الذكي أن يصدرها عندما يحدث شيء قد يكون ذا صلة بشخص آخر.

  تتم فهرسة الأحداث بحيث يكون من الممكن البحث عن جميع الأوقات التي تم فيها تجميد حساب أو إلغاء تجميده.

  ```solidity
    // عندما يتم تجميد الحسابات أو إلغاء تجميدها
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- دوال لتجميد وإلغاء تجميد الحسابات. هاتان الدالتان متطابقتان تقريبًا، لذلك سنراجع دالة التجميد فقط.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  يمكن استدعاء الدوال المميزة بـ [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) من عقود ذكية أخرى أو مباشرة عن طريق معاملة.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  إذا كان الحساب مجمدًا بالفعل، تراجع. بخلاف ذلك، قم بتجميده و `emit` حدثًا.

- قم بتغيير `_beforeTokenTransfer` لمنع نقل الأموال من حساب مجمد. لاحظ أنه لا يزال من الممكن تحويل الأموال إلى الحساب المجمد.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### تنظيف الأصول {#asset-cleanup}

لتحرير الرموز المميزة من نوع <span dir="ltr">ERC-20</span> التي يحتفظ بها هذا العقد، نحتاج إلى استدعاء دالة في عقد الرمز المميز الذي تنتمي إليه، إما [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) أو [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). لا جدوى من إهدار غاز في هذه الحالة على المخصصات (allowances)، قد نقوم بالتحويل مباشرة.

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

هذه هي الصيغة لإنشاء كائن لعقد عندما نتلقى العنوان. يمكننا القيام بذلك لأن لدينا تعريف الرموز المميزة ERC20 كجزء من الكود المصدري (انظر السطر 4)، ويتضمن هذا الملف [تعريف IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)، وهي الواجهة لعقد <span dir="ltr">ERC-20</span> من أوبن زبلن.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

هذه دالة تنظيف، لذلك من المفترض أننا لا نريد ترك أي رموز مميزة. بدلاً من الحصول على الرصيد من المستخدم يدويًا، قد نقوم أيضًا بأتمتة العملية.

## الخاتمة {#conclusion}

هذا ليس حلاً مثاليًا - لا يوجد حل مثالي لمشكلة "المستخدم ارتكب خطأ". ومع ذلك، فإن استخدام هذه الأنواع من عمليات التحقق يمكن أن يمنع على الأقل بعض الأخطاء. يمكن استخدام القدرة على تجميد الحسابات، على الرغم من خطورتها، للحد من أضرار بعض الاختراقات عن طريق حرمان المخترق من الأموال المسروقة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).