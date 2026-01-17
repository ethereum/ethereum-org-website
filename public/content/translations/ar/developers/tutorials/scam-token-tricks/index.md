---
title: "بعض الحيل التي تستخدمها الرموز الاحتيالية وكيفية اكتشافها"
description: "في هذا البرنامج التعليمي، نحلل رمزًا احتياليًا لنرى بعض الحيل التي يمارسها المحتالون، وكيف ينفذونها، وكيف يمكننا اكتشافها."
author: Ori Pomerantz
tags:
  [
    "احتيال",
    "solidity",
    "erc-20",
    "جافا سكريبت",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: ar
---

في هذا البرنامج التعليمي، نحلل [رمزًا احتياليًا](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) لنرى بعض الحيل التي يمارسها المحتالون وكيف ينفذونها. بنهاية هذا البرنامج التعليمي، ستكون لديك رؤية أكثر شمولاً لعقود رموز ERC-20، وقدراتها، وسبب ضرورة التشكك. ثم نلقي نظرة على الأحداث الصادرة عن هذا الرمز الاحتيالي ونرى كيف يمكننا تحديد أنه ليس شرعيًا تلقائيًا.

## الرموز الاحتيالية - ما هي، ولماذا ينشئها الناس، وكيفية تجنبها {#scam-tokens}

أحد الاستخدامات الشائعة ليثريان هو أن تقوم مجموعة بإنشاء رمز قابل للتداول، بمعنى آخر العملة الخاصة بهم. ومع ذلك، في أي مكان توجد فيه حالات استخدام مشروعة تحقق قيمة، هناك أيضًا مجرمون يحاولون سرقة تلك القيمة لأنفسهم.

يمكنك قراءة المزيد عن هذا الموضوع [في مكان آخر على ethereum.org](/guides/how-to-id-scam-tokens/) من منظور المستخدم. يركز هذا البرنامج التعليمي على تحليل رمز احتيالي لمعرفة كيفية عمله وكيف يمكن اكتشافه.

### كيف أعرف أن wARB هو عملية احتيال؟ {#warb-scam}

الرمز الذي نحلله هو [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)، والذي يتظاهر بأنه مكافئ لـ[رمز ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) الشرعي.

أسهل طريقة لمعرفة الرمز الشرعي هي النظر إلى المنظمة الأصلية، [Arbitrum](https://arbitrum.foundation/). العناوين الشرعية محددة [في وثائقهم](https://docs.arbitrum.foundation/deployment-addresses#token).

### لماذا الكود المصدري متاح؟ {#why-source}

عادةً نتوقع من الأشخاص الذين يحاولون الاحتيال على الآخرين أن يكونوا سريين، وبالفعل فإن العديد من الرموز الاحتيالية لا يتوفر الكود المصدري الخاص بها (على سبيل المثال، [هذا](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) و[هذا](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

ومع ذلك، عادةً ما تنشر الرموز الشرعية الكود المصدري الخاص بها، لذلك ليبدو الأمر شرعيًا، يفعل مؤلفو الرموز الاحتيالية الشيء نفسه في بعض الأحيان. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) هو أحد تلك الرموز التي يتوفر لها كود مصدري، مما يسهل فهمه.

بينما يمكن لناشري العقود اختيار نشر الكود المصدري أم لا، فإنهم _لا يستطيعون_ نشر الكود المصدري الخاطئ. يقوم مستكشف الكتل بتجميع الكود المصدري المقدم بشكل مستقل، وإذا لم يحصل على نفس الكود الثانوي (bytecode)، فإنه يرفض هذا الكود المصدري. [يمكنك قراءة المزيد عن هذا على موقع Etherscan](https://etherscan.io/verifyContract).

## مقارنة برموز ERC-20 الشرعية {#compare-legit-erc20}

سنقوم بمقارنة هذا الرمز برموز ERC-20 الشرعية. إذا لم تكن على دراية بكيفية كتابة رموز ERC-20 الشرعية عادةً، [راجع هذا البرنامج التعليمي](/developers/tutorials/erc20-annotated-code/).

### الثوابت للعناوين ذات الامتيازات {#constants-for-privileged-addresses}

تحتاج العقود أحيانًا إلى عناوين ذات امتيازات. تسمح العقود المصممة للاستخدام طويل الأمد لبعض العناوين ذات الامتيازات بتغيير تلك العناوين، على سبيل المثال لتمكين استخدام عقد جديد متعدد التوقيع (multisig). هناك عدة طرق للقيام بذلك.

يستخدم [عقد رمز `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) نمط [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). يتم الاحتفاظ بالعنوان ذي الامتيازات في التخزين، في حقل يسمى `_owner` (انظر الملف الثالث، `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[عقد رمز `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) لا يحتوي على عنوان ذي امتيازات بشكل مباشر. ومع ذلك، فهو لا يحتاج إلى واحد. إنه يقع خلف [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) في [العنوان `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). يحتوي هذا العقد على عنوان ذي امتيازات (انظر الملف الرابع، `ERC1967Upgrade.sol`) يمكن استخدامه للترقيات.

```solidity
    /**
     * @dev يخزن عنوانًا جديدًا في خانة مسؤول EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

في المقابل، يحتوي عقد `wARB` على `contract_owner` مكتوب بشكل ثابت في الكود.

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

[مالك هذا العقد](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) ليس عقدًا يمكن التحكم فيه بواسطة حسابات مختلفة في أوقات مختلفة، ولكنه [حساب ذو ملكية خارجية](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). هذا يعني أنه من المحتمل أن يكون مصممًا للاستخدام قصير الأجل من قبل فرد، بدلاً من كونه حلاً طويل الأجل للتحكم في رمز ERC-20 الذي سيظل ذا قيمة.

وبالفعل، إذا نظرنا إلى Etherscan، نرى أن المحتال استخدم هذا العقد لمدة 12 ساعة فقط ([أول معاملة](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) إلى [آخر معاملة](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) خلال 19 مايو 2023.

### دالة `_transfer` المزيفة {#the-fake-transfer-function}

من المعتاد أن تتم التحويلات الفعلية باستخدام [دالة `_transfer` داخلية](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

في `wARB`، تبدو هذه الدالة شرعية تقريبًا:

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

إذا أرسل مالك العقد رموزًا، فلماذا يُظهر حدث `Transfer` أنها تأتي من `deployer`؟

ومع ذلك، هناك مشكلة أكثر أهمية. من الذي يستدعي دالة `_transfer` هذه؟ لا يمكن استدعاؤها من الخارج، فهي محددة على أنها `internal`. والكود الذي لدينا لا يتضمن أي استدعاءات لـ `_transfer`. من الواضح أنها هنا كطعم.

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

عندما ننظر إلى الدوال التي يتم استدعاؤها لتحويل الرموز، `transfer` و `transferFrom`، نرى أنها تستدعي دالة مختلفة تمامًا، `_f_`.

### دالة `_f_` الحقيقية {#the-real-f-function}

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

- استخدام [مُعدِّل الدالة](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. ولكن، عندما نطلع على الكود المصدري نجد أن `_mod_` غير ضار في الواقع.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- نفس المشكلة التي رأيناها في `_transfer`، وهي عندما يرسل `contract_owner` الرموز، تظهر وكأنها قادمة من `deployer`.

### دالة الأحداث المزيفة `dropNewTokens` {#the-fake-events-function-dropNewTokens}

الآن نأتي إلى شيء يبدو وكأنه عملية احتيال فعلية. لقد قمت بتعديل الدالة قليلاً لتسهيل القراءة، لكنها مكافئة وظيفيًا.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

تحتوي هذه الدالة على مُعدِّل `auth()`، مما يعني أنه لا يمكن استدعاؤها إلا من قبل مالك العقد.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

هذا القيد منطقي تمامًا، لأننا لا نريد أن تقوم حسابات عشوائية بتوزيع الرموز. ومع ذلك، فإن بقية الدالة مثيرة للشك.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

إن وجود دالة للتحويل من حساب مجمع إلى مصفوفة من المستلمين لمصفوفة من المبالغ أمر منطقي تمامًا. هناك العديد من حالات الاستخدام التي سترغب فيها في توزيع الرموز من مصدر واحد إلى وجهات متعددة، مثل كشوف المرتبات، والإسقاطات الجوية (airdrops)، وما إلى ذلك. من الأرخص (من حيث الغاز) القيام بذلك في معاملة واحدة بدلاً من إصدار معاملات متعددة، أو حتى استدعاء ERC-20 عدة مرات من عقد مختلف كجزء من نفس المعاملة.

ومع ذلك، لا تقوم دالة `dropNewTokens` بذلك. إنها تُصدر [أحداث `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1)، لكنها لا تقوم فعليًا بتحويل أي رموز. لا يوجد سبب شرعي لإرباك التطبيقات خارج السلسلة بإخبارها عن عملية تحويل لم تحدث بالفعل.

### دالة `Approve` الحارقة {#the-burning-approve-function}

من المفترض أن تحتوي عقود ERC-20 على [دالة `approve`](/developers/tutorials/erc20-annotated-code/#approve) للبدلات، وبالفعل يحتوي رمزنا الاحتيالي على مثل هذه الدالة، وهي صحيحة حتى. ومع ذلك، نظرًا لأن لغة Solidity مشتقة من لغة C، فهي حساسة لحالة الأحرف. السلسلتان النصيتان "Approve" و"approve" مختلفتان.

أيضًا، الوظيفة لا علاقة لها بـ `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

يتم استدعاء هذه الدالة مع مصفوفة من العناوين لحاملي الرمز.

```solidity
    public approver() {
```

يضمن مُعدِّل `approver()` أن `contract_owner` فقط هو المسموح له باستدعاء هذه الدالة (انظر أدناه).

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

لكل عنوان حامل، تقوم الدالة بنقل رصيد الحامل بالكامل إلى العنوان `0x00...01`، مما يؤدي إلى حرقه فعليًا (دالة `burn` الفعلية في المعيار تغير أيضًا إجمالي العرض، وتنقل الرموز إلى `0x00...00`). هذا يعني أن `contract_owner` يمكنه إزالة أصول أي مستخدم. لا تبدو هذه ميزة قد ترغب بها في رمز حوكمة.

### مشكلات جودة الكود {#code-quality-issues}

مشكلات جودة الكود هذه لا _تثبت_ أن هذا الكود عملية احتيال، لكنها تجعله يبدو مشبوهًا. الشركات المنظمة مثل Arbitrum لا تصدر عادةً كودًا بهذا السوء.

#### دالة `mount` {#the-mount-function}

على الرغم من أنها غير محددة في [المعيار](https://eips.ethereum.org/EIPS/eip-20)، بشكل عام تسمى الدالة التي تنشئ رموزًا جديدة [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

إذا نظرنا إلى مُنشئ `wARB`، نرى أن دالة mint قد تم تغيير اسمها إلى `mount` لسبب ما، ويتم استدعاؤها خمس مرات بخُمس العرض الأولي، بدلاً من مرة واحدة للمبلغ بأكمله من أجل الكفاءة.

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

دالة `mount` نفسها مثيرة للشك أيضًا.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

بالنظر إلى `require`، نرى أن مالك العقد فقط هو المسموح له بالسك (mint). هذا أمر شرعي. لكن رسالة الخطأ يجب أن تكون _only owner is allowed to mint_ أو شيء من هذا القبيل. بدلاً من ذلك، هي الرسالة غير ذات الصلة _ERC20: mint to the zero address_. الاختبار الصحيح للسك إلى العنوان الصفري هو `require(account != address(0), "<error message>")`، والذي لا يكلف العقد نفسه عناء التحقق منه أبدًا.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

هناك حقيقتان أخريان مشبوهتان، تتصلان مباشرة بالسك:

- هناك مُعامل `account`، والذي يُفترض أنه الحساب الذي يجب أن يستقبل المبلغ المسكوك. لكن الرصيد الذي يزداد هو في الواقع رصيد `contract_owner`.

- بينما الرصيد المتزايد يخص `contract_owner`، فإن الحدث الصادر يظهر تحويلاً إلى `account`.

### لماذا `auth` و `approver` معًا؟ لماذا `mod` الذي لا يفعل شيئًا؟ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

يحتوي هذا العقد على ثلاثة مُعدِّلات: `_mod_`، و `auth`، و `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

يأخذ `_mod_` ثلاثة مُعاملات ولا يفعل بها شيئًا. لماذا هو موجود؟

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

`auth` و `approver` أكثر منطقية، لأنهما يتحققان من أن العقد قد تم استدعاؤه بواسطة `contract_owner`. نتوقع أن تكون بعض الإجراءات ذات الامتيازات، مثل السك، مقتصرة على ذلك الحساب. ولكن، ما الفائدة من وجود دالتين منفصلتين تفعلان _نفس الشيء بالضبط_؟

## ما الذي يمكننا اكتشافه تلقائيًا؟ {#what-can-we-detect-automatically}

يمكننا أن نرى أن `wARB` هو رمز احتيالي من خلال النظر إلى Etherscan. ومع ذلك، هذا حل مركزي. نظريًا، يمكن تخريب Etherscan أو اختراقه. من الأفضل أن تكون قادرًا على تحديد ما إذا كان الرمز شرعيًا أم لا بشكل مستقل.

هناك بعض الحيل التي يمكننا استخدامها لتحديد أن رمز ERC-20 مشبوه (إما عملية احتيال أو مكتوب بشكل سيئ للغاية)، من خلال النظر إلى الأحداث التي يصدرها.

## أحداث `Approval` المشبوهة {#suspicious-approval-events}

يجب أن تحدث [`أحداث Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) فقط بطلب مباشر (على عكس [`أحداث Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) التي يمكن أن تحدث نتيجة لبدل). [انظر وثائق Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) للحصول على شرح مفصل لهذه المشكلة ولماذا يجب أن تكون الطلبات مباشرة، بدلاً من أن يتوسط فيها عقد.

هذا يعني أن أحداث `Approval` التي توافق على الإنفاق من [حساب مملوك خارجيًا](/developers/docs/accounts/#types-of-account) يجب أن تأتي من معاملات تنشأ في ذلك الحساب، ويكون وجهتها عقد ERC-20. أي نوع آخر من الموافقة من حساب مملوك خارجيًا هو أمر مشبوه.

إليك [برنامج يحدد هذا النوع من الأحداث](https://github.com/qbzzt/20230915-scam-token-detection)، باستخدام [viem](https://viem.sh/) و [TypeScript](https://www.typescriptlang.org/docs/)، وهو متغير من JavaScript مع أمان الأنواع. لتشغيله:

1. انسخ `.env.example` إلى `.env`.
2. حرر `.env` لتوفير عنوان URL لعقدة شبكة إيثريوم الرئيسية.
3. شغل `pnpm install` لتثبيت الحزم اللازمة.
4. شغل `pnpm susApproval` للبحث عن الموافقات المشبوهة.

فيما يلي شرح سطراً بسطر:

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

استيراد تعريفات الأنواع والدوال وتعريف السلسلة من `viem`.

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

إنشاء عميل Viem. نحتاج فقط إلى القراءة من البلوك تشين، لذلك لا يحتاج هذا العميل إلى مفتاح خاص.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

عنوان عقد ERC-20 المشبوه، والكتل التي سنبحث فيها عن الأحداث. عادةً ما يحد مزودو العقد من قدرتنا على قراءة الأحداث لأن النطاق الترددي يمكن أن يصبح مكلفًا. لحسن الحظ، لم يكن `wARB` قيد الاستخدام لمدة ثماني عشرة ساعة، لذلك يمكننا البحث عن جميع الأحداث (كان هناك 13 حدثًا فقط في المجموع).

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

هذه هي طريقة طلب معلومات الأحداث من Viem. عندما نزوده بتوقيع الحدث الدقيق، بما في ذلك أسماء الحقول، فإنه يحلل الحدث لنا.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

خوارزميتنا قابلة للتطبيق فقط على الحسابات المملوكة خارجيًا. إذا كان هناك أي bytecode يتم إرجاعه بواسطة `client.getBytecode`، فهذا يعني أن هذا عقد ويجب علينا تخطيه.

إذا لم تكن قد استخدمت TypeScript من قبل، فقد يبدو تعريف الدالة غريبًا بعض الشيء. نحن لا نخبره فقط أن المعامل الأول (والوحيد) يسمى `addr`، ولكن أيضًا أنه من النوع `Address`. وبالمثل، يخبر الجزء `: boolean` لغة TypeScript أن القيمة المرجعة للدالة هي قيمة منطقية (boolean).

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

تحصل هذه الدالة على إيصال المعاملة من حدث ما. نحن بحاجة إلى الإيصال للتأكد من أننا نعرف ما هي وجهة المعاملة.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

هذه هي أهم دالة، وهي التي تقرر بالفعل ما إذا كان الحدث مشبوهًا أم لا. نوع الإرجاع، `(Event | null)`، يخبر TypeScript أن هذه الدالة يمكن أن تعيد إما `Event` أو `null`. نعيد `null` إذا لم يكن الحدث مشبوهًا.

```typescript
const owner = ev.args._owner
```

يحتوي Viem على أسماء الحقول، لذلك قام بتحليل الحدث لنا. `_owner` هو مالك الرموز التي سيتم إنفاقها.

```typescript
// الموافقات من قبل العقود ليست مشبوهة
if (await isContract(owner)) return null
```

إذا كان المالك عقدًا، فافترض أن هذه الموافقة ليست مشبوهة. للتحقق مما إذا كانت موافقة العقد مشبوهة أم لا، سنحتاج إلى تتبع التنفيذ الكامل للمعاملة لمعرفة ما إذا كانت قد وصلت إلى عقد المالك، وما إذا كان هذا العقد قد استدعى عقد ERC-20 مباشرةً. هذا أكثر تكلفة من حيث الموارد مما نود القيام به.

```typescript
const txn = await getEventTxn(ev)
```

إذا جاءت الموافقة من حساب مملوك خارجيًا، فاحصل على المعاملة التي تسببت فيها.

```typescript
// تكون الموافقة مشبوهة إذا جاءت من مالك حساب مملوك خارجيًا (EOA) ليس هو `from` الخاص بالمعاملة
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

لا يمكننا فقط التحقق من مساواة السلاسل النصية لأن العناوين هي ست عشرية، لذا فهي تحتوي على أحرف. في بعض الأحيان، على سبيل المثال في `txn.from`، تكون هذه الأحرف كلها صغيرة. في حالات أخرى، مثل `ev.args._owner`، يكون العنوان في [حالة مختلطة لتحديد الأخطاء](https://eips.ethereum.org/EIPS/eip-55).

ولكن إذا لم تكن المعاملة من المالك، وكان هذا المالك مملوكًا خارجيًا، فعندئذ تكون لدينا معاملة مشبوهة.

```typescript
// يكون الأمر مشبوهًا أيضًا إذا لم تكن وجهة المعاملة هي عقد ERC-20 الذي نحن بصدد
// التحقيق فيه
if (txn.to.toLowerCase() != testedAddress) return ev
```

وبالمثل، إذا لم يكن عنوان `to` الخاص بالمعاملة، وهو أول عقد يتم استدعاؤه، هو عقد ERC-20 قيد التحقيق، فهذا أمر مشبوه.

```typescript
    // إذا لم يكن هناك سبب للشك، فأعد القيمة null.
    return null
}
```

إذا لم يكن أي من الشرطين صحيحًا، فإن حدث `Approval` ليس مشبوهًا.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

تُعيد [دالة `async`](https://www.w3schools.com/js/js_async.asp) كائن `Promise`. باستخدام الصيغة الشائعة، `await x()`، ننتظر حتى يتم استيفاء ذلك `Promise` قبل أن نواصل المعالجة. هذا بسيط في البرمجة والمتابعة، ولكنه غير فعال أيضًا. بينما ننتظر استيفاء `Promise` لحدث معين، يمكننا بالفعل البدء في العمل على الحدث التالي.

هنا نستخدم [`map`](https://www.w3schools.com/jsref/jsref_map.asp) لإنشاء مصفوفة من كائنات `Promise`. ثم نستخدم [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) لانتظار حل جميع تلك الوعود. ثم نقوم بـ[`تصفية`](https://www.w3schools.com/jsref/jsref_filter.asp) تلك النتائج لإزالة الأحداث غير المشبوهة.

### أحداث `Transfer` المشبوهة {#suspicious-transfer-events}

طريقة أخرى ممكنة لتحديد الرموز الاحتيالية هي معرفة ما إذا كانت لديهم أي تحويلات مشبوهة. على سبيل المثال، تحويلات من حسابات لا تحتوي على هذا العدد الكبير من الرموز. يمكنك رؤية [كيفية تنفيذ هذا الاختبار](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)، لكن `wARB` لا يعاني من هذه المشكلة.

## الخلاصة {#conclusion}

يعاني الكشف الآلي عن عمليات احتيال ERC-20 من [السلبيات الكاذبة](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)، لأن عملية الاحتيال يمكن أن تستخدم عقد رمز ERC-20 عاديًا تمامًا لا يمثل أي شيء حقيقي. لذلك يجب عليك دائمًا محاولة _الحصول على عنوان الرمز من مصدر موثوق_.

يمكن أن يساعد الكشف الآلي في حالات معينة، مثل أجزاء التمويل اللامركزي (DeFi)، حيث يوجد العديد من الرموز ويجب التعامل معها تلقائيًا. ولكن كما هو الحال دائمًا [على المشتري أن يحذر](https://www.investopedia.com/terms/c/caveatemptor.asp)، قم ببحثك الخاص، وشجع المستخدمين على فعل الشيء نفسه.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
