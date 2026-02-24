---
title: "ERC-4626 ٹوکنائزڈ والٹ اسٹینڈرڈ"
description: "ییلڈ بیرنگ والٹس کے لیے ایک اسٹینڈرڈ۔"
lang: ur-in
---

## تعارف {#introduction}

ERC-4626 ییلڈ بیرنگ والٹس کے تکنیکی پیرامیٹرز کو بہتر بنانے اور متحد کرنے کا ایک اسٹینڈرڈ ہے۔ یہ ٹوکنائزڈ ییلڈ بیرنگ والٹس کے لیے ایک معیاری API فراہم کرتا ہے جو ایک واحد بنیادی ERC-20 ٹوکن کے حصص کی نمائندگی کرتے ہیں۔ ERC-4626 ERC-20 کا استعمال کرتے ہوئے ٹوکنائزڈ والٹس کے لیے ایک اختیاری ایکسٹینشن کا بھی خاکہ پیش کرتا ہے، جو ٹوکن جمع کرنے، نکالنے اور بیلنس پڑھنے کے لیے بنیادی فعالیت پیش کرتا ہے۔

**ییلڈ بیرنگ والٹس میں ERC-4626 کا کردار**

لینڈنگ مارکیٹس، ایگریگیٹرز، اور بنیادی طور پر سود والے ٹوکنز صارفین کو مختلف حکمت عملیوں پر عمل کرکے اپنے کرپٹو ٹوکنز پر بہترین ییلڈ تلاش کرنے میں مدد کرتے ہیں۔ یہ حکمت عملیاں معمولی تغیر کے ساتھ کی جاتی ہیں، جو غلطی کا شکار ہوسکتی ہیں یا ترقیاتی وسائل کو ضائع کرسکتی ہیں۔

ییلڈ بیرنگ والٹس میں ERC-4626 انضمام کی کوششوں کو کم کرے گا اور ڈیولپرز کی جانب سے بہت کم خصوصی کوششوں کے ساتھ مختلف ایپلیکیشنز میں ییلڈ تک رسائی کو غیر مقفل کرے گا، جس سے زیادہ مستقل اور مضبوط نفاذ کے نمونے تیار ہوں گے۔

ERC-4626 ٹوکن کی مکمل وضاحت [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) میں کی گئی ہے۔

**غیر مطابقت پذیر والٹ ایکسٹینشن (ERC-7540)**

ERC-4626 ایک حد تک ایٹمک ڈپازٹس اور ریڈیمپشنز کے لیے موزوں ہے۔ اگر حد تک پہنچ جاتی ہے، تو کوئی نیا ڈپازٹ یا ریڈیمپشن جمع نہیں کیا جا سکتا۔ یہ پابندی کسی بھی ایسے سمارٹ کنٹریکٹ سسٹم کے لیے اچھی طرح سے کام نہیں کرتی جس میں والٹ کے ساتھ انٹرفیس کرنے کے لیے غیر مطابقت پذیر کارروائیاں یا تاخیر ایک شرط ہو (مثال کے طور پر، حقیقی دنیا کے اثاثہ جات کے پروٹوکول، انڈر کولیٹرلائزڈ لینڈنگ پروٹوکول، کراس چین لینڈنگ پروٹوکول، لیکویڈ اسٹیکنگ ٹوکن، یا انشورنس سیفٹی ماڈیولز)۔

ERC-7540 غیر مطابقت پذیر استعمال کے معاملات کے لیے ERC-4626 والٹس کی افادیت کو بڑھاتا ہے۔ موجودہ والٹ انٹرفیس (`deposit`/`withdraw`/`mint`/`redeem`) کو غیر مطابقت پذیر درخواستوں کا دعوی کرنے کے لیے مکمل طور پر استعمال کیا جاتا ہے۔

ERC-7540 ایکسٹینشن کی مکمل وضاحت [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) میں کی گئی ہے۔

**ملٹی اثاثہ والٹ ایکسٹینشن (ERC-7575)**

ایک گمشدہ استعمال کا معاملہ جو ERC-4626 کے ذریعے سپورٹ نہیں کیا جاتا ہے وہ والٹس ہیں جن میں متعدد اثاثے یا انٹری پوائنٹس ہیں جیسے لیکویڈیٹی پرووائیڈر (LP) ٹوکنز۔ یہ عام طور پر بوجھل یا غیر تعمیلی ہوتے ہیں کیونکہ ERC-4626 کو خود ERC-20 ہونے کی ضرورت ہوتی ہے۔

ERC-7575 ERC-4626 کے نفاذ سے ERC-20 ٹوکن کے نفاذ کو بیرونی بنا کر متعدد اثاثوں والے والٹس کے لیے سپورٹ شامل کرتا ہے۔

ERC-7575 ایکسٹینشن کی مکمل وضاحت [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) میں کی گئی ہے۔

## شرائط {#prerequisites}

اس صفحہ کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [ٹوکن اسٹینڈرڈز](/developers/docs/standards/tokens/) اور [ERC-20](/developers/docs/standards/tokens/erc-20/) کے بارے میں پڑھیں۔

## ERC-4626 کے فنکشنز اور خصوصیات: {#body}

### طریقے {#methods}

#### اثاثہ {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

یہ فنکشن والٹ کے لیے اکاؤنٹنگ، ڈپازٹ کرنے اور نکالنے کے لیے استعمال ہونے والے بنیادی ٹوکن کا ایڈریس واپس کرتا ہے۔

#### کل اثاثے {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

یہ فنکشن والٹ کے زیر قبضہ بنیادی اثاثوں کی کل رقم واپس کرتا ہے۔

#### حصص میں تبدیل کریں {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن `حصص` کی وہ رقم واپس کرتا ہے جو فراہم کردہ `اثاثوں` کی رقم کے بدلے والٹ کے ذریعے تبدیل کی جائے گی۔

#### اثاثوں میں تبدیل کریں {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن `اثاثوں` کی وہ رقم واپس کرتا ہے جو فراہم کردہ `حصص` کی رقم کے بدلے والٹ کے ذریعے تبدیل کی جائے گی۔

#### زیادہ سے زیادہ ڈپازٹ {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

یہ فنکشن بنیادی اثاثوں کی زیادہ سے زیادہ رقم واپس کرتا ہے جو ایک ہی [`deposit`](#deposit) کال میں جمع کی جا سکتی ہے، `وصول کنندہ` کے لیے بنائے گئے حصص کے ساتھ۔

#### ڈپازٹ کا پیش منظر {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے ڈپازٹ کے اثرات کی تقلید کرنے کی اجازت دیتا ہے۔

#### ڈپازٹ {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

یہ فنکشن بنیادی ٹوکنز کے `اثاثوں` کو والٹ میں جمع کرتا ہے اور `وصول کنندہ` کو `حصص` کی ملکیت دیتا ہے۔

#### زیادہ سے زیادہ منٹ {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

یہ فنکشن حصص کی زیادہ سے زیادہ رقم واپس کرتا ہے جو ایک ہی [`mint`](#mint) کال میں بنائے جا سکتے ہیں، `وصول کنندہ` کے لیے بنائے گئے حصص کے ساتھ۔

#### منٹ کا پیش منظر {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے منٹ کے اثرات کی تقلید کرنے کی اجازت دیتا ہے۔

#### منٹ {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

یہ فنکشن بنیادی ٹوکنز کے `اثاثوں` کو جمع کرکے `وصول کنندہ` کو بالکل `حصص` والٹ شیئرز منٹ کرتا ہے۔

#### زیادہ سے زیادہ نکالنا {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

یہ فنکشن بنیادی اثاثوں کی زیادہ سے زیادہ رقم واپس کرتا ہے جو ایک ہی [`withdraw`](#withdraw) کال کے ساتھ `مالک` کے بیلنس سے نکالی جا سکتی ہے۔

#### نکالنے کا پیش منظر {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے نکالنے کے اثرات کی تقلید کرنے کی اجازت دیتا ہے۔

#### نکالنا {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

یہ فنکشن `مالک` سے `حصص` کو جلاتا ہے اور والٹ سے بالکل `اثاثہ` ٹوکن `وصول کنندہ` کو بھیجتا ہے۔

#### زیادہ سے زیادہ چھڑانا {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

یہ فنکشن حصص کی زیادہ سے زیادہ رقم واپس کرتا ہے جو ایک [`redeem`](#redeem) کال کے ذریعے `مالک` کے بیلنس سے چھڑایا جا سکتا ہے۔

#### چھڑانے کا پیش منظر {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے چھڑانے کے اثرات کی تقلید کرنے کی اجازت دیتا ہے۔

#### چھڑانا {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

یہ فنکشن `مالک` سے `حصص` کی ایک مخصوص تعداد کو چھڑاتا ہے اور والٹ سے بنیادی ٹوکن کے `اثاثے` `وصول کنندہ` کو بھیجتا ہے۔

#### کل سپلائی {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

گردش میں موجود غیر چھڑائے گئے والٹ حصص کی کل تعداد واپس کرتا ہے۔

#### بیلنس {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

والٹ حصص کی کل رقم واپس کرتا ہے جو `مالک` کے پاس فی الحال ہے۔

### انٹرفیس کا نقشہ {#mapOfTheInterface}

![ERC-4626 انٹرفیس کا نقشہ](./map-of-erc-4626.png)

### ایونٹس {#events}

#### ڈپازٹ ایونٹ

**لازمی** طور پر خارج کیا جانا چاہیے جب ٹوکنز [`mint`](#mint) اور [`deposit`](#deposit) طریقوں کے ذریعے والٹ میں جمع کیے جاتے ہیں۔

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

جہاں `sender` وہ صارف ہے جس نے `حصص` کے بدلے `اثاثوں` کا تبادلہ کیا، اور ان `حصص` کو `مالک` کو منتقل کیا۔

#### نکالنے کا ایونٹ

**لازمی** طور پر خارج کیا جانا چاہیے جب [`redeem`](#redeem) یا [`withdraw`](#withdraw) طریقوں میں ایک جمع کنندہ کے ذریعہ والٹ سے حصص نکالے جاتے ہیں۔

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

جہاں `sender` وہ صارف ہے جس نے نکالنے کو متحرک کیا اور `مالک` کی ملکیت والے `حصص` کو `اثاثوں` کے بدلے تبدیل کیا۔ `receiver` وہ صارف ہے جس نے نکالے گئے `اثاثے` وصول کیے۔

## مزید پڑھیں {#further-reading}

- [EIP-4626: ٹوکنائزڈ والٹ اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
