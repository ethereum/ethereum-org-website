---
title: "معيار القبو المرمز ⁦ERC-4626⁩"
description: "معيار للأقبية المدرة للعوائد."
lang: ar
---

## مقدمة {#introduction}

<span dir="ltr">ERC-4626</span> هو معيار لتحسين وتوحيد المعلمات الفنية للأقبية المدرة للعوائد. يوفر واجهة برمجة تطبيقات (<span dir="ltr">API</span>) قياسية للأقبية المرمزة المدرة للعوائد والتي تمثل حصصًا لرمز مميز أساسي واحد من نوع <span dir="ltr">ERC-20</span>. يحدد <span dir="ltr">ERC-4626</span> أيضًا امتدادًا اختياريًا للأقبية المرمزة التي تستخدم <span dir="ltr">ERC-20</span>، مما يوفر وظائف أساسية لإيداع وسحب الرموز المميزة وقراءة الأرصدة.

**دور <span dir="ltr">ERC-4626</span> في الأقبية المدرة للعوائد**

تساعد أسواق الإقراض، والمجمعات، والرموز المميزة التي تدر فائدة بطبيعتها المستخدمين في العثور على أفضل عائد على رموز الكريبتو المميزة الخاصة بهم من خلال تنفيذ استراتيجيات مختلفة. يتم تنفيذ هذه الاستراتيجيات باختلافات طفيفة، مما قد يكون عرضة للخطأ أو يهدر موارد التطوير.

سيؤدي استخدام <span dir="ltr">ERC-4626</span> في الأقبية المدرة للعوائد إلى تقليل جهد التكامل وإتاحة الوصول إلى العوائد في تطبيقات مختلفة بجهد متخصص قليل من المطورين من خلال إنشاء أنماط تنفيذ أكثر اتساقًا وقوة.

تم وصف الرمز المميز <span dir="ltr">ERC-4626</span> بالكامل في [<span dir="ltr">EIP-4626</span>](https://eips.ethereum.org/EIPS/eip-4626).

**امتداد القبو غير المتزامن (<span dir="ltr">ERC-7540</span>)**

تم تحسين <span dir="ltr">ERC-4626</span> لعمليات الإيداع والاسترداد الذرية حتى حد معين. إذا تم الوصول إلى الحد، لا يمكن تقديم أي عمليات إيداع أو استرداد جديدة. لا يعمل هذا القيد بشكل جيد مع أي نظام عقد ذكي يحتوي على إجراءات غير متزامنة أو تأخيرات كشرط أساسي للتفاعل مع القبو (على سبيل المثال، بروتوكولات أصول العالم الحقيقي، أو بروتوكولات الإقراض غير المضمونة بالكامل، أو بروتوكولات الإقراض عبر السلاسل، أو رموز التخزين السائل (<span dir="ltr">LST</span>)، أو وحدات أمان التأمين).

يوسع <span dir="ltr">ERC-7540</span> من فائدة أقبية <span dir="ltr">ERC-4626</span> لحالات الاستخدام غير المتزامنة. يتم استخدام واجهة القبو الحالية (`deposit`/`withdraw`/`mint`/`redeem`) بالكامل للمطالبة بالطلبات غير المتزامنة.

تم وصف امتداد <span dir="ltr">ERC-7540</span> بالكامل في [<span dir="ltr">ERC-7540</span>](https://eips.ethereum.org/EIPS/eip-7540).

**امتداد القبو متعدد الأصول (<span dir="ltr">ERC-7575</span>)**

إحدى حالات الاستخدام المفقودة التي لا يدعمها <span dir="ltr">ERC-4626</span> هي الأقبية التي تحتوي على أصول أو نقاط دخول متعددة مثل الرموز المميزة لمزود السيولة (<span dir="ltr">LP</span>). هذه الأقبية بشكل عام غير عملية أو غير متوافقة بسبب متطلبات <span dir="ltr">ERC-4626</span> بأن يكون هو نفسه <span dir="ltr">ERC-20</span>.

يضيف <span dir="ltr">ERC-7575</span> دعمًا للأقبية ذات الأصول المتعددة عن طريق فصل تنفيذ الرمز المميز <span dir="ltr">ERC-20</span> عن تنفيذ <span dir="ltr">ERC-4626</span>.

تم وصف امتداد <span dir="ltr">ERC-7575</span> بالكامل في [<span dir="ltr">ERC-7575</span>](https://eips.ethereum.org/EIPS/eip-7575).

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصي بقراءة [معايير الرموز المميزة](/developers/docs/standards/tokens/) و[<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) أولاً.

## وظائف وميزات <span dir="ltr">ERC-4626</span>: {#body}

### الطرق {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

تُرجع هذه الدالة عنوان الرمز المميز الأساسي المستخدم للقبو لأغراض المحاسبة، والإيداع، والسحب.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

تُرجع هذه الدالة إجمالي مبلغ الأصول الأساسية التي يحتفظ بها القبو.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

تُرجع هذه الدالة مقدار `shares` الذي سيتم استبداله بواسطة القبو مقابل مقدار `assets` المقدم.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

تُرجع هذه الدالة مقدار `assets` الذي سيتم استبداله بواسطة القبو مقابل مقدار `shares` المقدم.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

تُرجع هذه الدالة الحد الأقصى لمقدار الأصول الأساسية التي يمكن إيداعها في استدعاء [`deposit`](#deposit) واحد، مع الحصص التي تم سكها لـ `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

تتيح هذه الدالة للمستخدمين محاكاة تأثيرات إيداعهم في الكتلة الحالية.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

تقوم هذه الدالة بإيداع `assets` من الرموز المميزة الأساسية في القبو وتمنح ملكية `shares` إلى `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

تُرجع هذه الدالة الحد الأقصى لمقدار الحصص التي يمكن سكها في استدعاء [`mint`](#mint) واحد، مع الحصص التي تم سكها لـ `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

تتيح هذه الدالة للمستخدمين محاكاة تأثيرات عملية السك الخاصة بهم في الكتلة الحالية.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

تقوم هذه الدالة بسك `shares` بالضبط من حصص القبو إلى `receiver` عن طريق إيداع `assets` من الرموز المميزة الأساسية.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

تُرجع هذه الدالة الحد الأقصى لمقدار الأصول الأساسية التي يمكن سحبها من رصيد `owner` باستدعاء [`withdraw`](#withdraw) واحد.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

تتيح هذه الدالة للمستخدمين محاكاة تأثيرات عملية السحب الخاصة بهم في الكتلة الحالية.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

تقوم هذه الدالة بحرق `shares` من `owner` وإرسال `assets` بالضبط من الرموز المميزة من القبو إلى `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

تُرجع هذه الدالة الحد الأقصى لمقدار الحصص التي يمكن استردادها من رصيد `owner` من خلال استدعاء [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

تتيح هذه الدالة للمستخدمين محاكاة تأثيرات عملية الاسترداد الخاصة بهم في الكتلة الحالية.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

تقوم هذه الدالة باسترداد عدد محدد من `shares` من `owner` وترسل `assets` من الرمز المميز الأساسي من القبو إلى `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

تُرجع إجمالي عدد حصص القبو غير المستردة المتداولة.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

تُرجع إجمالي مقدار حصص القبو التي يمتلكها `owner` حاليًا.

### خريطة الواجهة {#mapoftheinterface}

![Map of the <span dir="ltr">ERC-4626</span> interface](./map-of-erc-4626.png)

### الأحداث {#events}

#### حدث الإيداع {#deposit-event}

**يجب** إصداره عند إيداع الرموز المميزة في القبو عبر طريقتي [`mint`](#mint) و[`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

حيث `sender` هو المستخدم الذي استبدل `assets` بـ `shares`، ونقل تلك `shares` إلى `owner`.

#### حدث السحب {#withdraw-event}

**يجب** إصداره عند سحب الحصص من القبو بواسطة مودع في طريقتي [`redeem`](#redeem) أو [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

حيث `sender` هو المستخدم الذي بدأ عملية السحب واستبدل `shares`، المملوكة لـ `owner`، بـ `assets`. و`receiver` هو المستخدم الذي تلقى `assets` المسحوبة.

## قراءة إضافية {#further-reading}

- [<span dir="ltr">EIP-4626</span>: معيار القبو المرمز](https://eips.ethereum.org/EIPS/eip-4626)
- [<span dir="ltr">ERC-4626</span>: مستودع <span dir="ltr">GitHub</span>](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)