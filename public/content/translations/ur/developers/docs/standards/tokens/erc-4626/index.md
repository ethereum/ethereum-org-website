---
title: "ERC-4626 ٹوکنائزڈ والٹ اسٹینڈرڈ"
description: "ییلڈ بیئرنگ والٹس کے لیے ایک اسٹینڈرڈ۔"
lang: ur
---

## تعارف {#introduction}

ERC-4626 ییلڈ بیئرنگ والٹس کے تکنیکی پیرامیٹرز کو بہتر بنانے اور یکجا کرنے کا ایک اسٹینڈرڈ ہے۔ یہ ٹوکنائزڈ ییلڈ بیئرنگ والٹس کے لیے ایک معیاری API فراہم کرتا ہے جو ایک واحد بنیادی ERC-20 ٹوکن کے شیئرز کی نمائندگی کرتے ہیں۔ ERC-4626 ٹوکنائزڈ والٹس کے لیے ایک اختیاری ایکسٹینشن کا خاکہ بھی پیش کرتا ہے جو ERC-20 کا استعمال کرتے ہیں، جو ٹوکنز جمع کرنے، نکالنے اور بیلنس پڑھنے کے لیے بنیادی فعالیت پیش کرتا ہے۔

**ییلڈ بیئرنگ والٹس میں ERC-4626 کا کردار**

لینڈنگ مارکیٹس، ایگریگیٹرز، اور اندرونی طور پر سود والے ٹوکنز مختلف حکمت عملیوں پر عمل کر کے صارفین کو ان کے کرپٹو ٹوکنز پر بہترین ییلڈ تلاش کرنے میں مدد کرتے ہیں۔ یہ حکمت عملیاں معمولی تغیر کے ساتھ کی جاتی ہیں، جو غلطی کا شکار ہو سکتی ہیں یا ڈیولپمنٹ کے وسائل کو ضائع کر سکتی ہیں۔

ییلڈ بیئرنگ والٹس میں ERC-4626 زیادہ مستقل اور مضبوط نفاذ کے پیٹرنز بنا کر انضمام کی کوشش کو کم کرے گا اور ڈیولپرز کی جانب سے کم خصوصی کوشش کے ساتھ مختلف ایپلی کیشنز میں ییلڈ تک رسائی کو کھولے گا۔

ERC-4626 ٹوکن کو [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) میں مکمل طور پر بیان کیا گیا ہے۔

**ایسنکرونس والٹ ایکسٹینشن (ERC-7540)**

ERC-4626 کو ایک حد تک ایٹامک ڈپازٹس اور ریڈیمپشنز کے لیے بہتر بنایا گیا ہے۔ اگر حد پوری ہو جائے تو کوئی نیا ڈپازٹ یا ریڈیمپشن جمع نہیں کرایا جا سکتا۔ یہ حد کسی بھی اسمارٹ کانٹریکٹ سسٹم کے لیے اچھی طرح کام نہیں کرتی جس میں والٹ کے ساتھ انٹرفیس کرنے کے لیے ایسنکرونس ایکشنز یا تاخیر شرط ہو (جیسے، حقیقی دنیا کے اثاثہ پروٹوکولز، انڈرکولیٹرلائزڈ لینڈنگ پروٹوکولز، کراس چین لینڈنگ پروٹوکولز، لیکویڈ اسٹیکنگ ٹوکنز، یا انشورنس سیفٹی ماڈیولز)۔

ERC-7540 ایسنکرونس استعمال کے کیسز کے لیے ERC-4626 والٹس کی افادیت کو بڑھاتا ہے۔ موجودہ والٹ انٹرفیس (`deposit`/`withdraw`/`mint`/`redeem`) کو ایسنکرونس درخواستوں کا دعویٰ کرنے کے لیے مکمل طور پر استعمال کیا جاتا ہے۔

ERC-7540 ایکسٹینشن کو [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) میں مکمل طور پر بیان کیا گیا ہے۔

**ملٹی-ایسیٹ والٹ ایکسٹینشن (ERC-7575)**

ایک غائب استعمال کا کیس جو ERC-4626 کے ذریعے تعاون یافتہ نہیں ہے وہ والٹس ہیں جن میں متعدد اثاثے یا انٹری پوائنٹس ہوتے ہیں جیسے لیکویڈیٹی پرووائیڈر (LP) ٹوکنز۔ یہ عام طور پر ERC-4626 کی خود ایک ERC-20 ہونے کی ضرورت کی وجہ سے بوجھل یا غیر تعمیل شدہ ہوتے ہیں۔

ERC-7575 ERC-4626 کے نفاذ سے ERC-20 ٹوکن کے نفاذ کو بیرونی بنا کر متعدد اثاثوں والے والٹس کے لیے تعاون کا اضافہ کرتا ہے۔

ERC-7575 ایکسٹینشن کو [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) میں مکمل طور پر بیان کیا گیا ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [ٹوکن اسٹینڈرڈز](/developers/docs/standards/tokens/) اور [ERC-20](/developers/docs/standards/tokens/erc-20/) کے بارے میں پڑھیں۔

## ERC-4626 فنکشنز اور خصوصیات: {#body}

### طریقے (Methods) {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

یہ فنکشن اکاؤنٹنگ، جمع کرنے، نکالنے کے لیے والٹ کے لیے استعمال ہونے والے بنیادی ٹوکن کا ایڈریس واپس کرتا ہے۔

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

یہ فنکشن والٹ کے پاس موجود بنیادی اثاثوں کی کل رقم واپس کرتا ہے۔

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن `shares` کی وہ مقدار واپس کرتا ہے جس کا تبادلہ والٹ فراہم کردہ `assets` کی مقدار کے لیے کرے گا۔

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن `assets` کی وہ مقدار واپس کرتا ہے جس کا تبادلہ والٹ فراہم کردہ `shares` کی مقدار کے لیے کرے گا۔

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

یہ فنکشن بنیادی اثاثوں کی زیادہ سے زیادہ مقدار واپس کرتا ہے جو ایک ہی [`deposit`](#deposit) کال میں جمع کی جا سکتی ہے، جس میں `receiver` کے لیے شیئرز منٹ کیے جاتے ہیں۔

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے ڈپازٹ کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

یہ فنکشن بنیادی ٹوکنز کے `assets` کو والٹ میں جمع کرتا ہے اور `receiver` کو `shares` کی ملکیت دیتا ہے۔

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

یہ فنکشن شیئرز کی زیادہ سے زیادہ مقدار واپس کرتا ہے جو ایک ہی [`mint`](#mint) کال میں منٹ کی جا سکتی ہے، جس میں `receiver` کے لیے شیئرز منٹ کیے جاتے ہیں۔

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے منٹ کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

یہ فنکشن بنیادی ٹوکنز کے `assets` جمع کر کے `receiver` کو بالکل `shares` والٹ شیئرز منٹ کرتا ہے۔

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

یہ فنکشن بنیادی اثاثوں کی زیادہ سے زیادہ مقدار واپس کرتا ہے جو ایک ہی [`withdraw`](#withdraw) کال کے ساتھ `owner` کے بیلنس سے نکالی جا سکتی ہے۔

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے انخلا کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

یہ فنکشن `owner` سے `shares` کو برن کرتا ہے اور والٹ سے `receiver` کو بالکل `assets` ٹوکن بھیجتا ہے۔

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

یہ فنکشن شیئرز کی زیادہ سے زیادہ مقدار واپس کرتا ہے جو ایک [`redeem`](#redeem) کال کے ذریعے `owner` کے بیلنس سے ریڈیم کی جا سکتی ہے۔

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے ریڈیمپشن کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

یہ فنکشن `owner` سے ایک مخصوص تعداد میں `shares` کو ریڈیم کرتا ہے اور والٹ سے `receiver` کو بنیادی ٹوکن کے `assets` بھیجتا ہے۔

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

گردش میں موجود غیر ریڈیم شدہ والٹ شیئرز کی کل تعداد واپس کرتا ہے۔

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

والٹ شیئرز کی کل مقدار واپس کرتا ہے جو اس وقت `owner` کے پاس ہے۔

### انٹرفیس کا نقشہ {#mapOfTheInterface}

![ERC-4626 انٹرفیس کا نقشہ](./map-of-erc-4626.png)

### ایونٹس {#events}

#### Deposit ایونٹ

جب ٹوکنز کو [`mint`](#mint) اور [`deposit`](#deposit) طریقوں کے ذریعے والٹ میں جمع کیا جاتا ہے تو اسے **لازمی** طور پر ایمٹ (emit) کیا جانا چاہیے۔

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

جہاں `sender` وہ صارف ہے جس نے `shares` کے لیے `assets` کا تبادلہ کیا، اور ان `shares` کو `owner` کو منتقل کیا۔

#### Withdraw ایونٹ

جب کسی جمع کنندہ کی طرف سے [`redeem`](#redeem) یا [`withdraw`](#withdraw) طریقوں میں والٹ سے شیئرز نکالے جاتے ہیں تو اسے **لازمی** طور پر ایمٹ کیا جانا چاہیے۔

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

جہاں `sender` وہ صارف ہے جس نے انخلا کو متحرک کیا اور `owner` کی ملکیت والے `shares` کا `assets` کے لیے تبادلہ کیا۔ `receiver` وہ صارف ہے جس نے نکالے گئے `assets` وصول کیے۔

## مزید مطالعہ {#further-reading}

- [EIP-4626: ٹوکنائزڈ والٹ اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub ریپو](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)