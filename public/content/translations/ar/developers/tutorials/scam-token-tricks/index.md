---
title: "بعض الحيل التي تستخدمها الرموز المميزة الاحتيالية وكيفية اكتشافها"
description: "في هذا البرنامج التعليمي، نقوم بتشريح رمز مميز احتيالي لمعرفة بعض الحيل التي يلعبها المحتالون، وكيفية تنفيذهم لها، وكيف يمكننا اكتشافها."
author: أوري بوميرانتس
tags: ["احتيال", "Solidity", "ERC-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: "حيل الرموز المميزة الاحتيالية"
published: 2023-09-15
lang: ar
---

في هذا البرنامج التعليمي، نقوم بتشريح [رمز مميز احتيالي](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) لمعرفة بعض الحيل التي يلعبها المحتالون وكيفية تنفيذهم لها. بنهاية البرنامج التعليمي، سيكون لديك نظرة أكثر شمولاً لعقود الرموز المميزة <span dir="ltr">ERC-20</span>، وقدراتها، ولماذا يعد التشكيك ضروريًا. ثم ننظر إلى الأحداث التي يصدرها هذا الرمز المميز الاحتيالي ونرى كيف يمكننا التعرف تلقائيًا على أنه غير شرعي.

## الرموز المميزة الاحتيالية - ما هي، ولماذا يقوم الناس بإنشائها، وكيفية تجنبها {#scam-tokens}

أحد الاستخدامات الأكثر شيوعًا لشبكة إيثيريوم هو قيام مجموعة بإنشاء رمز مميز قابل للتداول، وبمعنى آخر عملتهم الخاصة. ومع ذلك، في أي مكان توجد فيه حالات استخدام شرعية تجلب قيمة، يوجد أيضًا مجرمون يحاولون سرقة تلك القيمة لأنفسهم.

يمكنك قراءة المزيد حول هذا الموضوع [في مكان آخر على موقع ethereum.org](/guides/how-to-id-scam-tokens/) من منظور المستخدم. يركز هذا البرنامج التعليمي على تشريح رمز مميز احتيالي لمعرفة كيف يتم ذلك وكيف يمكن اكتشافه.

### كيف أعرف أن <span dir="ltr">wARB</span> هو احتيال؟ {#warb-scam}

الرمز المميز الذي نقوم بتشريحه هو [<span dir="ltr">wARB</span>](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)، والذي يتظاهر بأنه مكافئ لـ [الرمز المميز <span dir="ltr">ARB</span>](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) الشرعي.

أسهل طريقة لمعرفة الرمز المميز الشرعي هي النظر إلى المنظمة المصدرة، [أربيتروم](https://arbitrum.foundation/). العناوين الشرعية محددة [في وثائقهم](https://docs.arbitrum.foundation/deployment-addresses#token).

### لماذا الكود المصدري متاح؟ {#why-source}

عادةً ما نتوقع من الأشخاص الذين يحاولون الاحتيال على الآخرين أن يكونوا متكتمين، وبالفعل العديد من الرموز المميزة الاحتيالية لا يتوفر الكود الخاص بها (على سبيل المثال، [هذا الرمز](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) و[هذا الرمز](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

ومع ذلك، عادةً ما تنشر الرموز المميزة الشرعية الكود المصدري الخاص بها، لذلك للظهور بمظهر شرعي، يقوم مؤلفو الرموز المميزة الاحتيالية أحيانًا بنفس الشيء. [<span dir="ltr">wARB</span>](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) هو أحد تلك الرموز المميزة التي يتوفر لها كود مصدري، مما يسهل فهمه.

بينما يمكن لناشري العقود اختيار ما إذا كانوا سينشرون الكود المصدري أم لا، إلا أنهم _لا يمكنهم_ نشر كود مصدري خاطئ. يقوم مستكشف الكتل بتجميع الكود المصدري المقدم بشكل مستقل، وإذا لم يحصل على نفس رمز البايت بالضبط، فإنه يرفض هذا الكود المصدري. [يمكنك قراءة المزيد حول هذا الموضوع على موقع Etherscan](https://etherscan.io/verifyContract).

## مقارنة بالرموز المميزة <span dir="ltr">ERC-20</span> الشرعية {#compare-legit-erc20}

سنقوم بمقارنة هذا الرمز المميز بالرموز المميزة <span dir="ltr">ERC-20</span> الشرعية. إذا لم تكن على دراية بكيفية كتابة الرموز المميزة <span dir="ltr">ERC-20</span> الشرعية عادةً، [راجع هذا البرنامج التعليمي](/developers/tutorials/erc20-annotated-code/).

### الثوابت للعناوين ذات الامتيازات {#constants-for-privileged-addresses}

تحتاج العقود أحيانًا إلى عناوين ذات امتيازات. تسمح العقود المصممة للاستخدام طويل الأمد لبعض العناوين ذات الامتيازات بتغيير تلك العناوين، على سبيل المثال لتمكين استخدام عقد متعدد التوقيعات جديد. هناك عدة طرق للقيام بذلك.

يستخدم [عقد الرمز المميز `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) نمط [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). يتم الاحتفاظ بالعنوان ذي الامتيازات في التخزين، في حقل يسمى `_owner` (انظر الملف الثالث، `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

لا يحتوي [عقد الرمز المميز `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) على عنوان ذي امتيازات بشكل مباشر. ومع ذلك، فإنه لا يحتاج إلى واحد. إنه يقع خلف [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) في [العنوان `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). يحتوي هذا العقد على عنوان ذي امتيازات (انظر الملف الرابع، `ERC1967Upgrade.sol`) يمكن استخدامه للترقيات.

```solidity
    /**
     * @dev يخزن عنواناً جديداً في خانة مسؤول EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

في المقابل، يحتوي العقد `wARB` على `contract_owner` مبرمج بشكل ثابت.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[مالك العقد هذا](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) ليس عقدًا يمكن التحكم فيه بواسطة حسابات مختلفة في أوقات مختلفة، بل هو [حساب مملوك خارجيًا](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). هذا يعني أنه ربما تم تصميمه للاستخدام قصير الأمد من قبل فرد، بدلاً من كونه حلاً طويل الأمد للتحكم في رمز <span dir="ltr">ERC-20</span> سيظل ذا قيمة.

وبالفعل، إذا نظرنا في Etherscan، نرى أن المحتال استخدم هذا العقد لمدة <span dir="ltr">12</span> ساعة فقط ([المعاملة الأولى](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) إلى [المعاملة الأخيرة](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) خلال <span dir="ltr">19</span> مايو <span dir="ltr">2023</span>.

### الدالة `_transfer` المزيفة {#the-fake-transfer-function}

من المعتاد أن تتم التحويلات الفعلية باستخدام [دالة `_transfer` داخلية](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

في `wARB` تبدو هذه الدالة شرعية تقريبًا:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

الجزء المشبوه هو:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

إذا أرسل مالك العقد رموزًا مميزة، فلماذا يُظهر الحدث `Transfer` أنها تأتي من `deployer`؟

ومع ذلك، هناك مشكلة أكثر أهمية. من يستدعي هذه الدالة `_transfer`؟ لا يمكن استدعاؤها من الخارج، فهي محددة كـ `internal`. والكود الذي لدينا لا يتضمن أي استدعاءات لـ `_transfer`. من الواضح أنها موجودة هنا كطعم.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

عندما ننظر إلى الدوال التي يتم استدعاؤها لتحويل الرموز المميزة، `transfer` و`transferFrom`، نرى أنها تستدعي دالة مختلفة تمامًا، وهي `_f_`.

### الدالة `_f_` الحقيقية {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

هناك علامتان تحذيريتان محتملتان في هذه الدالة.

- استخدام [مُعدِّل الدالة](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. ومع ذلك، عندما ننظر في الكود المصدري نرى أن `_mod_` غير ضار في الواقع.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- نفس المشكلة التي رأيناها في `_transfer`، وهي عندما يرسل `contract_owner` رموزًا مميزة، يبدو أنها تأتي من `deployer`.

### دالة الأحداث المزيفة `dropNewTokens` {#the-fake-events-function-dropnewtokens}

الآن نأتي إلى شيء يبدو وكأنه عملية احتيال فعلية. قمت بتعديل الدالة قليلاً لتسهيل القراءة، لكنها متكافئة وظيفيًا.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

تحتوي هذه الدالة على المُعدِّل `auth()`، مما يعني أنه لا يمكن استدعاؤها إلا من قبل مالك العقد.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

هذا التقييد منطقي تمامًا، لأننا لا نريد أن تقوم حسابات عشوائية بتوزيع الرموز المميزة. ومع ذلك، فإن بقية الدالة مشبوهة.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

إن وجود دالة للتحويل من حساب مجمع إلى مصفوفة من المستلمين ومصفوفة من المبالغ أمر منطقي تمامًا. هناك العديد من حالات الاستخدام التي سترغب فيها في توزيع الرموز المميزة من مصدر واحد إلى وجهات متعددة، مثل كشوف المرتبات، والتوزيعات المجانية (airdrops)، وما إلى ذلك. من الأرخص (من حيث الغاز) القيام بذلك في معاملة واحدة بدلاً من إصدار معاملات متعددة، أو حتى استدعاء <span dir="ltr">ERC-20</span> عدة مرات من عقد مختلف كجزء من نفس المعاملة.

ومع ذلك، فإن `dropNewTokens` لا تفعل ذلك. إنها تصدر [أحداث `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1)، لكنها لا تقوم فعليًا بتحويل أي رموز مميزة. لا يوجد سبب شرعي لإرباك التطبيقات خارج السلسلة بإخبارها عن تحويل لم يحدث في الواقع.

### دالة الحرق `Approve` {#the-burning-approve-function}

من المفترض أن تحتوي عقود <span dir="ltr">ERC-20</span> على [دالة `approve`](/developers/tutorials/erc20-annotated-code/#approve) للسماحيات، وبالفعل يحتوي الرمز المميز الاحتيالي الخاص بنا على مثل هذه الدالة، وهي صحيحة أيضًا. ومع ذلك، نظرًا لأن لغة Solidity مشتقة من لغة C، فإن حالة الأحرف مهمة. "Approve" و "approve" هما سلسلتان مختلفتان.

أيضًا، الوظيفة لا تتعلق بـ `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

يتم استدعاء هذه الدالة باستخدام مصفوفة من العناوين لحاملي الرمز المميز.

```solidity
    public approver() {
```

يضمن المُعدِّل `approver()` السماح لـ `contract_owner` فقط باستدعاء هذه الدالة (انظر أدناه).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

لكل عنوان حامل، تنقل الدالة رصيد الحامل بالكامل إلى العنوان `0x00...01`، مما يؤدي فعليًا إلى حرقه (تقوم دالة `burn` الفعلية في المعيار أيضًا بتغيير إجمالي العرض، وتحويل الرموز المميزة إلى `0x00...00`). هذا يعني أن `contract_owner` يمكنه إزالة أصول أي مستخدم. لا يبدو هذا كميزة قد ترغب فيها في رمز الحوكمة.

### مشكلات جودة الكود {#code-quality-issues}

مشكلات جودة الكود هذه لا _تثبت_ أن هذا الكود هو عملية احتيال، لكنها تجعله يبدو مشبوهًا. الشركات المنظمة مثل أربيتروم لا تصدر عادةً كودًا بهذا السوء.

#### الدالة `mount` {#the-mount-function}

على الرغم من أنه غير محدد في [المعيار](https://eips.ethereum.org/EIPS/eip-20)، بشكل عام تسمى الدالة التي تنشئ رموزًا مميزة جديدة [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

إذا نظرنا في المُنشئ `wARB`، نرى أنه تمت إعادة تسمية دالة السك إلى `mount` لسبب ما، ويتم استدعاؤها خمس مرات بخُمس العرض الأولي، بدلاً من مرة واحدة للمبلغ بالكامل من أجل الكفاءة.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

الدالة `mount` نفسها مشبوهة أيضًا.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

بالنظر إلى `require`، نرى أنه يُسمح لمالك العقد فقط بالسك. هذا أمر شرعي. لكن رسالة الخطأ يجب أن تكون _يُسمح للمالك فقط بالسك_ أو شيء من هذا القبيل. بدلاً من ذلك، فهي الرسالة غير ذات الصلة _ERC20: mint to the zero address_. الاختبار الصحيح للسك إلى العنوان الصفري هو `require(account != address(0), "<error message>")`، والذي لا يكلف العقد نفسه عناء التحقق منه أبدًا.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

هناك حقيقتان مشبوهتان أخريان، تتعلقان مباشرة بعملية السك:

- يوجد المعلمة `account`، والتي يُفترض أنها الحساب الذي يجب أن يتلقى المبلغ المسكوك. لكن الرصيد الذي يزداد هو في الواقع رصيد `contract_owner`.

- بينما الرصيد الذي زاد يخص `contract_owner`، فإن الحدث الصادر يُظهر تحويلاً إلى `account`.

### لماذا كل من `auth` و`approver`؟ ولماذا `mod` التي لا تفعل شيئًا؟ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

يحتوي هذا العقد على ثلاثة مُعدِّلات: `_mod_`، و`auth`، و`approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

يأخذ `_mod_` ثلاث معلمات ولا يفعل أي شيء بها. لماذا هو موجود؟

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` و`approver` أكثر منطقية، لأنهما يتحققان من أن العقد تم استدعاؤه بواسطة `contract_owner`. نتوقع أن تقتصر بعض الإجراءات ذات الامتيازات، مثل السك، على هذا الحساب. ومع ذلك، ما الفائدة من وجود دالتين منفصلتين تفعلان _نفس الشيء بالضبط_؟

## ما الذي يمكننا اكتشافه تلقائيًا؟ {#what-can-we-detect-automatically}

يمكننا أن نرى أن `wARB` هو رمز مميز احتيالي من خلال النظر إلى Etherscan. ومع ذلك، هذا حل مركزي. من الناحية النظرية، يمكن تخريب Etherscan أو اختراقه. من الأفضل أن تكون قادرًا على معرفة ما إذا كان الرمز المميز شرعيًا أم لا بشكل مستقل.

هناك بعض الحيل التي يمكننا استخدامها لتحديد أن الرمز المميز <span dir="ltr">ERC-20</span> مشبوه (إما أنه احتيال أو مكتوب بشكل سيء للغاية)، من خلال النظر إلى الأحداث التي يصدرها.

## أحداث `Approval` المشبوهة {#suspicious-approval-events}

يجب أن تحدث [أحداث `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) فقط بطلب مباشر (على عكس [أحداث `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) التي يمكن أن تحدث نتيجة لسماحية). [راجع وثائق Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) للحصول على شرح مفصل لهذه المشكلة ولماذا يجب أن تكون الطلبات مباشرة، بدلاً من أن تتم بوساطة عقد.

هذا يعني أن أحداث `Approval` التي توافق على الإنفاق من [حساب مملوك خارجيًا](/developers/docs/accounts/#types-of-account) يجب أن تأتي من معاملات تنشأ في ذلك الحساب، وتكون وجهتها هي عقد <span dir="ltr">ERC-20</span>. أي نوع آخر من الموافقة من حساب مملوك خارجيًا يعتبر مشبوهًا.

إليك [برنامج يحدد هذا النوع من الأحداث](https://github.com/qbzzt/20230915-scam-token-detection)، باستخدام [Viem](https://viem.sh/) و[TypeScript](https://www.typescriptlang.org/docs/)، وهي نسخة من JavaScript تتميز بأمان الكتابة. لتشغيله:

1. انسخ `.env.example` إلى `.env`.
2. قم بتحرير `.env` لتوفير عنوان URL لعقدة شبكة إيثيريوم الرئيسية.
3. قم بتشغيل `pnpm install` لتثبيت الحزم اللازمة.
4. قم بتشغيل `pnpm susApproval` للبحث عن الموافقات المشبوهة.

إليك شرح سطرًا بسطر:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

استيراد تعريفات الأنواع، والدوال، وتعريف السلسلة من `viem`.

```typescript
import { config } from "dotenv"
config()
```

اقرأ `.env` للحصول على عنوان URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

قم بإنشاء عميل Viem. نحتاج فقط إلى القراءة من سلسلة الكتل، لذلك لا يحتاج هذا العميل إلى مفتاح خاص.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

عنوان عقد <span dir="ltr">ERC-20</span> المشبوه، والكتل التي سنبحث فيها عن الأحداث. عادةً ما يحد موفرو العقد من قدرتنا على قراءة الأحداث لأن النطاق الترددي يمكن أن يصبح مكلفًا. لحسن الحظ، لم يكن `wARB` قيد الاستخدام لمدة ثمانية عشر ساعة، لذلك يمكننا البحث عن جميع الأحداث (كان هناك <span dir="ltr">13</span> حدثًا فقط في المجموع).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

هذه هي الطريقة لطلب معلومات الحدث من Viem. عندما نزوده بتوقيع الحدث الدقيق، بما في ذلك أسماء الحقول، فإنه يقوم بتحليل الحدث لنا.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

الخوارزمية الخاصة بنا قابلة للتطبيق فقط على الحسابات المملوكة خارجيًا. إذا كان هناك أي رمز بايت يتم إرجاعه بواسطة `client.getBytecode`، فهذا يعني أن هذا عقد ويجب علينا تخطيه ببساطة.

إذا لم تكن قد استخدمت TypeScript من قبل، فقد يبدو تعريف الدالة غريبًا بعض الشيء. نحن لا نخبرها فقط أن المعلمة الأولى (والوحيدة) تسمى `addr`، ولكن أيضًا أنها من النوع `Address`. وبالمثل، يخبر الجزء `: boolean` TypeScript أن القيمة المرجعة للدالة هي قيمة منطقية (boolean).

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

تحصل هذه الدالة على إيصال المعاملة من حدث. نحتاج إلى الإيصال للتأكد من أننا نعرف ما كانت وجهة المعاملة.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

هذه هي الدالة الأكثر أهمية، وهي التي تقرر فعليًا ما إذا كان الحدث مشبوهًا أم لا. يخبر نوع الإرجاع، `(Event | null)`، TypeScript أن هذه الدالة يمكن أن ترجع إما `Event` أو `null`. نرجع `null` إذا لم يكن الحدث مشبوهًا.

```typescript
const owner = ev.args._owner
```

يحتوي Viem على أسماء الحقول، لذلك قام بتحليل الحدث لنا. `_owner` هو مالك الرموز المميزة التي سيتم إنفاقها.

```typescript
// الموافقات بواسطة العقود ليست مشبوهة
if (await isContract(owner)) return null
```

إذا كان المالك عقدًا، فافترض أن هذه الموافقة ليست مشبوهة. للتحقق مما إذا كانت موافقة العقد مشبوهة أم لا، سنحتاج إلى تتبع التنفيذ الكامل للمعاملة لمعرفة ما إذا كانت قد وصلت إلى عقد المالك، وما إذا كان هذا العقد قد استدعى عقد <span dir="ltr">ERC-20</span> مباشرة. هذا يستهلك موارد أكثر بكثير مما نود القيام به.

```typescript
const txn = await getEventTxn(ev)
```

إذا كانت الموافقة تأتي من حساب مملوك خارجيًا، فاحصل على المعاملة التي تسببت فيها.

```typescript
// تكون الموافقة مشبوهة إذا جاءت من مالك EOA ليس هو `from` الخاص بالمعاملة
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

لا يمكننا فقط التحقق من تطابق السلاسل النصية لأن العناوين سداسية عشرية، لذا فهي تحتوي على أحرف. في بعض الأحيان، على سبيل المثال في `txn.from`، تكون تلك الأحرف كلها صغيرة. في حالات أخرى، مثل `ev.args._owner`، يكون العنوان [بأحرف مختلطة لتحديد الأخطاء](https://eips.ethereum.org/EIPS/eip-55).

ولكن إذا لم تكن المعاملة من المالك، وكان هذا المالك مملوكًا خارجيًا، فلدينا معاملة مشبوهة.

```typescript
// وتكون مشبوهة أيضاً إذا لم تكن وجهة المعاملة هي عقد ERC-20 الذي نقوم
// بالتحقيق فيه
if (txn.to.toLowerCase() != testedAddress) return ev
```

وبالمثل، إذا لم يكن عنوان `to` الخاص بالمعاملة، وهو أول عقد تم استدعاؤه، هو عقد <span dir="ltr">ERC-20</span> قيد التحقيق، فهو مشبوه.

```typescript
    // إذا لم يكن هناك سبب للاشتباه، أرجع null.
    return null
}
```

إذا لم يكن أي من الشرطين صحيحًا، فإن الحدث `Approval` ليس مشبوهًا.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

تُرجع [الدالة `async`](https://www.w3schools.com/js/js_async.asp) كائن `Promise`. باستخدام بناء الجملة الشائع، `await x()`، ننتظر حتى يتم الوفاء بـ `Promise` قبل أن نواصل المعالجة. هذا بسيط في البرمجة والمتابعة، ولكنه غير فعال أيضًا. بينما ننتظر الوفاء بـ `Promise` لحدث معين، يمكننا بالفعل البدء في العمل على الحدث التالي.

هنا نستخدم [`map`](https://www.w3schools.com/jsref/jsref_map.asp) لإنشاء مصفوفة من كائنات `Promise`. ثم نستخدم [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) لانتظار حل جميع هذه الوعود (promises). ثم نقوم بـ [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) تلك النتائج لإزالة الأحداث غير المشبوهة.

### أحداث `Transfer` المشبوهة {#suspicious-transfer-events}

طريقة أخرى محتملة لتحديد الرموز المميزة الاحتيالية هي معرفة ما إذا كان لديها أي تحويلات مشبوهة. على سبيل المثال، التحويلات من حسابات لا تمتلك هذا العدد الكبير من الرموز المميزة. يمكنك رؤية [كيفية تنفيذ هذا الاختبار](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)، لكن `wARB` لا يعاني من هذه المشكلة.

## الخاتمة {#conclusion}

يعاني الاكتشاف التلقائي لعمليات الاحتيال في <span dir="ltr">ERC-20</span> من [السلبيات الخاطئة](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)، لأن عملية الاحتيال يمكن أن تستخدم عقد رمز مميز <span dir="ltr">ERC-20</span> طبيعي تمامًا ولكنه لا يمثل أي شيء حقيقي. لذلك يجب عليك دائمًا محاولة _الحصول على عنوان الرمز المميز من مصدر موثوق_.

يمكن أن يساعد الاكتشاف التلقائي في حالات معينة، مثل أجزاء التمويل اللامركزي (DeFi)، حيث يوجد العديد من الرموز المميزة ويجب التعامل معها تلقائيًا. ولكن كما هو الحال دائمًا [ليحذر المشتري](https://www.investopedia.com/terms/c/caveatemptor.asp)، قم بإجراء بحثك الخاص، وشجع المستخدمين على القيام بالمثل.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).