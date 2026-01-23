---
title: "ERC-20 مع حواجز أمان"
description: "كيفية مساعدة الناس على تجنب الأخطاء الساذجة"
author: Ori Pomerantz
lang: ar
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## مقدمة {#مقدمة}

من أروع الأشياء في إيثريوم أنه لا توجد سلطة مركزية يمكنها تعديل معاملاتك أو التراجع عنها. من أكبر المشاكل في إيثريوم أنه لا توجد سلطة مركزية لديها القدرة على التراجع عن أخطاء المستخدم أو المعاملات غير المشروعة. في هذه المقالة، ستتعلم بعض الأخطاء الشائعة التي يرتكبها المستخدمون مع رموز [ERC-20](/developers/docs/standards/tokens/erc-20/)، بالإضافة إلى كيفية إنشاء عقود ERC-20 تساعد المستخدمين على تجنب تلك الأخطاء، أو التي تمنح سلطة مركزية بعض الصلاحيات (على سبيل المثال، لتجميد الحسابات).

لاحظ أنه بينما سنستخدم [عقد رمز OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)، فإن هذه المقالة لا تشرحه بتفصيل كبير. يمكنك العثور على هذه المعلومات [هنا](/developers/tutorials/erc20-annotated-code).

إذا كنت تريد رؤية الكود المصدري الكامل:

1. افتح [Remix IDE](https://remix.ethereum.org/).
2. انقر على أيقونة استنساخ github (![clone github icon](icon-clone.png)).
3. استنسخ مستودع github `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. افتح **contracts > erc20-safety-rails.sol**.

## إنشاء عقد ERC-20 {#creating-an-erc-20-contract}

قبل أن نتمكن من إضافة وظيفة حواجز الأمان، نحتاج إلى عقد ERC-20. في هذه المقالة، سنستخدم [معالج عقود OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). افتحه في متصفح آخر واتبع هذه التعليمات:

1. حدد **ERC20**.

2. أدخل هذه الإعدادات:

   | Parameter        | Value                                                                            |
   | ---------------- | -------------------------------------------------------------------------------- |
   | الاسم            | SafetyRailsToken                                                                 |
   | الرمز            | SAFE                                                                             |
   | Premint          | لا نريد أن يكون لدينا أكثر من مجمع سيولة واحد لكل زوج من الرموز. |
   | الميزات          | لا شيء                                                                           |
   | التحكم في الوصول | Ownable                                                                          |
   | قابلية الترقية   | لا شيء                                                                           |

3. مرر لأعلى وانقر على **افتح في Remix** (لـ Remix) أو **تنزيل** لاستخدام بيئة مختلفة. سأفترض أنك تستخدم Remix، إذا كنت تستخدم شيئًا آخر، فقم فقط بإجراء التغييرات المناسبة.

4. لدينا الآن عقد ERC-20 يعمل بشكل كامل. يمكنك توسيع `.deps` > `npm` لرؤية الكود المستورد.

5. قم بتجميع العقد ونشره والتفاعل معه لترى أنه يعمل كعقد ERC-20. إذا كنت بحاجة إلى تعلم كيفية استخدام Remix، [استخدم تعليمات الاستخدام هذه](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## الأخطاء الشائعة {#common-mistakes}

### الأخطاء {#the-mistakes}

يرسل المستخدمون أحيانًا الرموز إلى عنوان خاطئ. على الرغم من أننا لا نستطيع قراءة أفكارهم لمعرفة ما كانوا ينوون فعله، إلا أن هناك نوعين من الأخطاء يحدثان كثيرًا ويسهل اكتشافهما:

1. إرسال الرموز إلى عنوان العقد نفسه. على سبيل المثال، تمكن [رمز OP الخاص بـ Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) من تجميع [أكثر من 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) رمز OP في أقل من شهرين. يمثل هذا قدرًا كبيرًا من الثروة التي يُفترض أن الناس قد فقدوها.

2. إرسال الرموز إلى عنوان فارغ، وهو عنوان لا يتوافق مع [حساب ذي ملكية خارجية](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) أو [عقد ذكي](/developers/docs/smart-contracts). على الرغم من أنه ليس لدي إحصائيات حول مدى تكرار حدوث ذلك، إلا أن [حادثة واحدة كان من الممكن أن تكلف 20,000,000 رمز](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### منع التحويلات {#preventing-transfers}

يتضمن عقد OpenZeppelin ERC-20 [خطافًا، `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)، يتم استدعاؤه قبل تحويل الرمز. بشكل افتراضي، لا يقوم هذا الخطاف بأي شيء، ولكن يمكننا ربط وظائفنا الخاصة به، مثل عمليات التحقق التي تعود إلى الحالة السابقة إذا كانت هناك مشكلة.

لاستخدام الخطاف، أضف هذه الدالة بعد الدالة البانية:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

قد تكون بعض أجزاء هذه الدالة جديدة إذا لم تكن على دراية كافية بـ سوليديتي:

```solidity
        internal virtual
```

تعني الكلمة المفتاحية `virtual` أنه مثلما ورثنا الوظيفة من `ERC20` وتجاوزنا هذه الدالة، يمكن للعقود الأخرى أن ترث منا وتتجاوز هذه الدالة.

```solidity
        override(ERC20)
```

علينا أن نحدد صراحةً أننا [نتجاوز](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) تعريف رمز ERC20 للدالة `_beforeTokenTransfer`. بشكل عام، تعتبر التعريفات الصريحة أفضل بكثير من التعريفات الضمنية من وجهة نظر أمنية - لا يمكنك أن تنسى أنك فعلت شيئًا إذا كان أمامك مباشرة. وهذا هو أيضًا السبب في أننا بحاجة إلى تحديد `_beforeTokenTransfer` لأي فئة فائقة نتجاوزها.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

يستدعي هذا السطر دالة `_beforeTokenTransfer` للعقد أو العقود التي ورثنا منها والتي تحتوي عليها. في هذه الحالة، هذا هو `ERC20` فقط، حيث لا يحتوي `Ownable` على هذا الخطاف. على الرغم من أن `ERC20._beforeTokenTransfer` لا تفعل أي شيء حاليًا، إلا أننا نستدعيها في حالة إضافة وظائف في المستقبل (ثم نقرر إعادة نشر العقد، لأن العقود لا تتغير بعد النشر).

### ترميز المتطلبات {#coding-the-requirements}

نريد إضافة هذه المتطلبات إلى الدالة:

- لا يمكن أن يساوي عنوان `to` `address(this)`، وهو عنوان عقد ERC-20 نفسه.
- لا يمكن أن يكون عنوان `to` فارغًا، يجب أن يكون إما:
  - حساب مملوك خارجيًا (EOA). لا يمكننا التحقق مما إذا كان العنوان حسابًا مملوكًا خارجيًا (EOA) مباشرةً، ولكن يمكننا التحقق من رصيد ETH للعنوان. دائمًا ما يكون لدى الحسابات المملوكة خارجيًا (EOAs) رصيد، حتى لو لم تعد تُستخدم - فمن الصعب تصفيتها حتى آخر wei.
  - عقد ذكي. اختبار ما إذا كان العنوان عقدًا ذكيًا هو أمر أصعب قليلاً. هناك رمز تشغيلي يتحقق من طول الكود الخارجي، يسمى [`EXTCODESIZE`](https://www.evm.codes/#3b)، لكنه غير متاح مباشرة في Solidity. علينا استخدام [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)، وهي لغة تجميع EVM، لذلك. هناك قيم أخرى يمكننا استخدامها من Solidity ([`<address>.code` و `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types))، لكنها تكلف أكثر.

دعنا نمر على الكود الجديد سطرًا بسطر:

```solidity
        require(to != address(this), "لا يمكن إرسال الرموز إلى عنوان العقد");
```

هذا هو المتطلب الأول، تحقق من أن `to` و `address(this)` ليسا نفس الشيء.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

هذه هي الطريقة التي نتحقق بها مما إذا كان العنوان عقدًا. لا يمكننا تلقي المخرجات مباشرة من Yul، لذلك بدلاً من ذلك نحدد متغيرًا للاحتفاظ بالنتيجة (`isToContract` في هذه الحالة). الطريقة التي تعمل بها Yul هي أن كل رمز تشغيلي يعتبر دالة. لذلك أولاً نستدعي [`EXTCODESIZE`](https://www.evm.codes/#3b) للحصول على حجم العقد، ثم نستخدم [`GT`](https://www.evm.codes/#11) للتحقق من أنه ليس صفرًا (نحن نتعامل مع أعداد صحيحة غير سالبة، لذلك بالطبع لا يمكن أن يكون سالبًا). ثم نكتب النتيجة إلى `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "لا يمكن إرسال الرموز إلى عنوان فارغ");
```

وأخيرًا، لدينا التحقق الفعلي من العناوين الفارغة.

## الوصول الإداري {#admin-access}

في بعض الأحيان يكون من المفيد وجود مسؤول يمكنه التراجع عن الأخطاء. للحد من احتمالية إساءة الاستخدام، يمكن أن يكون هذا المسؤول [متعدد التوقيعات](https://blog.logrocket.com/security-choices-multi-signature-wallets/) بحيث يتعين على عدة أشخاص الموافقة على إجراء ما. في هذه المقالة، سيكون لدينا ميزتان إداريتان:

1. تجميد وإلغاء تجميد الحسابات. يمكن أن يكون هذا مفيدًا، على سبيل المثال، عندما قد يكون الحساب مخترقًا.
2. تنظيف الأصول.

   في بعض الأحيان، يرسل المحتالون رموزًا احتيالية إلى عقد الرمز الحقيقي لاكتساب الشرعية. على سبيل المثال، [انظر هنا](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). عقد ERC-20 الشرعي هو [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). الاحتيال الذي يتظاهر بأنه هو [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   من الممكن أيضًا أن يرسل الأشخاص رموز ERC-20 شرعية إلى عقدنا عن طريق الخطأ، وهو سبب آخر للرغبة في وجود طريقة لإخراجها.

يوفر OpenZeppelin آليتين لتمكين الوصول الإداري:

- عقود [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) لها مالك واحد. الدوال التي تحتوي على [معدِّل](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` لا يمكن استدعاؤها إلا من قبل ذلك المالك. يمكن للمالكين نقل الملكية إلى شخص آخر أو التنازل عنها تمامًا. عادة ما تكون حقوق جميع الحسابات الأخرى متطابقة.
- عقود [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) لديها [التحكم في الوصول المستند إلى الأدوار (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

من أجل البساطة، في هذه المقالة نستخدم `Ownable`.

### تجميد وإلغاء تجميد العقود {#freezing-and-thawing-contracts}

تجميد وإلغاء تجميد العقود يتطلب عدة تغييرات:

- [ربط](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) من العناوين إلى [القيم المنطقية](https://en.wikipedia.org/wiki/Boolean_data_type) لتتبع العناوين المجمدة. جميع القيم مبدئيًا صفر، والتي تفسر للقيم المنطقية على أنها خطأ (false). هذا ما نريده لأنه بشكل افتراضي، الحسابات ليست مجمدة.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [الأحداث](https://www.tutorialspoint.com/solidity/solidity_events.htm) لإبلاغ أي شخص مهتم عند تجميد حساب أو إلغاء تجميده. من الناحية الفنية، الأحداث ليست مطلوبة لهذه الإجراءات، لكنها تساعد الكود خارج السلسلة على أن يكون قادرًا على الاستماع إلى هذه الأحداث ومعرفة ما يحدث. يعتبر من حسن السلوك أن يقوم العقد الذكي بإصدارها عندما يحدث شيء قد يكون ذا صلة بشخص آخر.

  الأحداث مفهرسة، لذلك سيكون من الممكن البحث عن كل المرات التي تم فيها تجميد حساب أو إلغاء تجميده.

  ```solidity
    // عندما يتم تجميد الحسابات أو إلغاء تجميدها
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- دوال لتجميد وإلغاء تجميد الحسابات. هاتان الدالتان متطابقتان تقريبًا، لذلك سنتناول فقط دالة التجميد.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  يمكن استدعاء الدوال المميزة بـ [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) من عقود ذكية أخرى أو مباشرة عن طريق معاملة.

  ```solidity
    {
        require(!frozenAccounts[addr], "الحساب مجمد بالفعل");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  إذا كان الحساب مجمدًا بالفعل، يتم التراجع. وإلا، قم بتجميده و`إصدار` حدث.

- غيّر `_beforeTokenTransfer` لمنع نقل الأموال من حساب مجمد. لاحظ أنه لا يزال من الممكن تحويل الأموال إلى الحساب المجمد.

  ```solidity
       require(!frozenAccounts[from], "الحساب مجمد");
  ```

### تنظيف الأصول {#asset-cleanup}

لتحرير رموز ERC-20 التي يحتفظ بها هذا العقد، نحتاج إلى استدعاء دالة في عقد الرمز الذي تنتمي إليه، إما [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) أو [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). لا جدوى من إهدار الغاز في هذه الحالة على المخصصات، يمكننا التحويل مباشرة.

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

هذه هي الصيغة لإنشاء كائن لعقد عندما نتلقى العنوان. يمكننا القيام بذلك لأن لدينا تعريف لرموز ERC20 كجزء من الكود المصدري (انظر السطر 4)، وهذا الملف يتضمن [تعريف IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)، وهي واجهة لعقد OpenZeppelin ERC-20.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

هذه دالة تنظيف، لذلك من المفترض أننا لا نريد ترك أي رموز. بدلاً من الحصول على الرصيد من المستخدم يدويًا، يمكننا أتمتة العملية.

## الخلاصة {#conclusion}

هذا ليس حلاً مثاليًا - لا يوجد حل مثالي لمشكلة "ارتكب المستخدم خطأ". ومع ذلك، فإن استخدام هذه الأنواع من عمليات التحقق يمكن أن يمنع على الأقل بعض الأخطاء. القدرة على تجميد الحسابات، على الرغم من خطورتها، يمكن استخدامها للحد من أضرار بعض الاختراقات عن طريق منع المخترق من الوصول إلى الأموال المسروقة.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
