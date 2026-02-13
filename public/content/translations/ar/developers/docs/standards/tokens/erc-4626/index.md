---
title: "معيار الخزنة المميزة ERC-4626"
description: "معيار للخزائن الحاملة للغلة."
lang: ar
---

## مقدمة {#introduction}

ERC-4626 هو معيار لتحسين وتوحيد المعايير الفنية للخزائن الحاملة للعائد. إنه يوفر واجهة برمجة تطبيقات قياسية لخزائن العائد المميزة التي تمثل أسهم رمز ERC-20 أساسي واحد. كما يحدد ERC-4626 امتدادًا اختياريًا للخزائن المميزة التي تستخدم ERC-20، مما يوفر وظائف أساسية لإيداع وسحب الرموز وقراءة الأرصدة.

**دور ERC-4626 في الخزائن الحاملة للعائد**

تساعد أسواق الإقراض والمجمعات والرموز المميزة التي تحمل فائدة جوهرية المستخدمين في العثور على أفضل عائد على رموز الكريبتو الخاصة بهم من خلال تنفيذ استراتيجيات مختلفة. يتم تنفيذ هذه الاستراتيجيات مع اختلافات طفيفة، مما قد يؤدي إلى حدوث أخطاء أو إهدار موارد التطوير.

ستعمل ERC-4626 في خزائن تحمل العائد على تقليل جهد التكامل وفتح الوصول إلى العائد في تطبيقات مختلفة مع القليل من الجهد المتخصص من المطورين من خلال إنشاء أنماط تنفيذ أكثر اتساقًا وقوة.

يتم وصف رمز ERC-4626 بالكامل في [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**تمديد القبو غير المتزامن (ERC-7540)**

تم تحسين ERC-4626 للإيداعات الذرية والاسترداد حتى حد معين. في حالة الوصول إلى الحد الأقصى، لا يمكن تقديم ودائع أو استردادات جديدة. لا يعمل هذا القيد بشكل جيد مع أي نظام عقود ذكية به إجراءات أو تأخيرات غير متزامنة كشرط أساسي للتفاعل مع المخزن (على سبيل المثال، بروتوكولات الأصول في العالم الحقيقي، وبروتوكولات الإقراض غير المضمونة، وبروتوكولات الإقراض عبر السلاسل، ورموز التخزين السائلة، أو وحدات أمان التأمين).

يقوم ERC-7540 بتوسيع نطاق فائدة ERC-4626 Vaults لحالات الاستخدام غير المتزامنة. يتم استخدام واجهة المخزن الحالية (`deposit`/`withdraw`/`mint`/`redeem`) بشكل كامل للمطالبة بالطلبات غير المتزامنة.

تم وصف امتداد ERC-7540 بالكامل في [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**تمديد الخزنة متعددة الأصول (ERC-7575)**

إحدى حالات الاستخدام المفقودة التي لا يدعمها ERC-4626 هي الخزائن التي تحتوي على أصول متعددة أو نقاط دخول مثل رموز مزود السيولة (LP). تعتبر هذه بشكل عام غير عملية أو غير متوافقة بسبب متطلبات ERC-4626 بأن تكون في حد ذاتها ERC-20.

يضيف ERC-7575 الدعم للخزائن ذات الأصول المتعددة من خلال إخراج تنفيذ رمز ERC-20 من تنفيذ ERC-4626.

تم وصف امتداد ERC-7575 بالكامل في [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك أولاً بالقراءة عن [معايير الرموز المميزة](/developers/docs/standards/tokens/) و[ERC-20](/developers/docs/standards/tokens/erc-20/).

## وظائف وميزات ERC-4626: {#body}

### طرق {#methods}

#### الأصل {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

تعيد هذه الوظيفة عنوان الرمز الأساسي المستخدم للخزنة للمحاسبة والإيداع والسحب.

#### إجمالي الأصول {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

تقوم هذه الوظيفة بإرجاع إجمالي مبلغ الأصول الأساسية الموجودة في الخزنة.

#### التحويل إلى حصص {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

تُرجع هذه الدالة مقدار `shares` (الحصص) التي سيتم تبادلها بواسطة المخزن مقابل مقدار `assets` (الأصول) المُقدمة.

#### التحويل إلى أصول {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

تُرجع هذه الدالة مقدار `assets` (الأصول) التي سيتم تبادلها بواسطة المخزن مقابل مقدار `shares` (الحصص) المُقدمة.

#### الحد الأقصى للإيداع {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

تُرجع هذه الدالة الحد الأقصى لمقدار الأصول الأساسية التي يمكن إيداعها في استدعاء [`deposit`](#deposit) واحد، مع إصدار الحصص لـ `receiver` (المستلم).

#### معاينة الإيداع {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

تتيح هذه الوظيفة للمستخدمين محاكاة تأثيرات إيداعهم في الكتلة الحالية.

#### الإيداع {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

تقوم هذه الدالة بإيداع `assets` (أصول) من الرموز الأساسية في المخزن وتمنح ملكية `shares` (الحصص) لـ `receiver` (المستلم).

#### الحد الأقصى للإصدار {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

تُرجع هذه الدالة الحد الأقصى لعدد الحصص التي يمكن إصدارها في استدعاء [`mint`](#mint) واحد، مع إصدار الحصص لـ `receiver` (المستلم).

#### معاينة الإصدار {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

تتيح هذه الوظيفة للمستخدمين محاكاة تأثيرات النعناع الخاص بهم في الكتلة الحالية.

#### الإصدار {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

تقوم هذه الدالة بإصدار حصص مخزن بمقدار `shares` بالضبط إلى `receiver` (المستلم) عن طريق إيداع `assets` (أصول) من الرموز الأساسية.

#### الحد الأقصى للسحب {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

تُرجع هذه الدالة الحد الأقصى لمقدار الأصول الأساسية التي يمكن سحبها من رصيد `owner` (المالك) من خلال استدعاء [`withdraw`](#withdraw) واحد.

#### معاينة السحب {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

تتيح هذه الوظيفة للمستخدمين محاكاة تأثيرات سحبهم عند الكتلة الحالية.

#### السحب {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

تحرق هذه الدالة `shares` (حصص) من `owner` (المالك) وترسل رمز `assets` (أصل) بالضبط من المخزن إلى `receiver` (المستلم).

#### الحد الأقصى للاسترداد {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

تُرجع هذه الدالة الحد الأقصى لعدد الحصص التي يمكن استردادها من رصيد `owner` (المالك) من خلال استدعاء [`redeem`](#redeem).

#### معاينة الاسترداد {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

تتيح هذه الوظيفة للمستخدمين محاكاة تأثيرات استردادهم في الكتلة الحالية.

#### الاسترداد {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

تسترد هذه الدالة عددًا محددًا من `shares` (الحصص) من `owner` (المالك) وترسل `assets` (أصول) من الرمز الأساسي من المخزن إلى `receiver` (المستلم).

#### إجمالي العرض {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

إرجاع العدد الإجمالي لأسهم الخزنة غير المستردة المتداولة.

#### رصيد {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

تُرجع المبلغ الإجمالي لحصص المخزن التي يمتلكها `owner` (المالك) حاليًا.

### خريطة الواجهة {#mapOfTheInterface}

![خريطة واجهة ERC-4626](./map-of-erc-4626.png)

### الأحداث {#events}

#### حدث الإيداع

**يجب** أن يتم إصدارها عند إيداع الرموز في المخزن عبر طريقتي [`mint`](#mint) و[`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

حيث `sender` (المرسل) هو المستخدم الذي استبدل `assets` (الأصول) مقابل `shares` (الحصص)، ونقل تلك `shares` (الحصص) إلى `owner` (المالك).

#### سحب الحدث

**يجب** أن يتم إصدارها عند سحب الحصص من المخزن بواسطة المودع في طريقتي [`redeem`](#redeem) أو [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

حيث `sender` (المرسل) هو المستخدم الذي قام بتشغيل السحب واستبدل `shares` (الحصص)، المملوكة لـ `owner` (المالك)، مقابل `assets` (الأصول). `receiver` (المستلم) هو المستخدم الذي استلم `assets` (الأصول) المسحوبة.

## قراءة إضافية {#further-reading}

- [EIP-4626: معيار المخزن المرمز](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: مستودع GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
