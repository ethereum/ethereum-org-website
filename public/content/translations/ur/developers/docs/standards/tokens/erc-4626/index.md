---
title: "⁦ERC-4626⁩ ٹوکنائزڈ تجوری کا معیار"
description: منافع بخش تجوریوں کے لیے ایک معیار۔
lang: ur
---

## تعارف {#introduction}

<span dir="ltr">ERC-4626</span> منافع بخش تجوریوں کے تکنیکی پیرامیٹرز کو بہتر اور متحد کرنے کا ایک معیار ہے۔ یہ ٹوکنائزڈ منافع بخش تجوریوں کے لیے ایک معیاری <span dir="ltr">API</span> فراہم کرتا ہے جو ایک واحد بنیادی <span dir="ltr">ERC-20</span> ٹوکن کے حصص کی نمائندگی کرتی ہیں۔ <span dir="ltr">ERC-4626</span> <span dir="ltr">ERC-20</span> کا استعمال کرتے ہوئے ٹوکنائزڈ تجوریوں کے لیے ایک اختیاری توسیع کا خاکہ بھی پیش کرتا ہے، جو ٹوکن جمع کرنے، انخلا کرنے اور بیلنس پڑھنے کے لیے بنیادی فعالیت پیش کرتا ہے۔

**منافع بخش تجوریوں میں <span dir="ltr">ERC-4626</span> کا کردار**

قرض دینے کی مارکیٹیں، ایگریگیٹرز، اور اندرونی طور پر سود والے ٹوکن مختلف حکمت عملیوں پر عمل کر کے صارفین کو ان کے کرپٹو ٹوکنز پر بہترین منافع تلاش کرنے میں مدد کرتے ہیں۔ یہ حکمت عملیاں معمولی تبدیلی کے ساتھ کی جاتی ہیں، جو غلطیوں کا شکار ہو سکتی ہیں یا ترقیاتی وسائل کو ضائع کر سکتی ہیں۔

منافع بخش تجوریوں میں <span dir="ltr">ERC-4626</span> انضمام کی کوشش کو کم کرے گا اور زیادہ مستقل اور مضبوط نفاذ کے نمونے بنا کر ڈیولپرز کی جانب سے کم خصوصی کوشش کے ساتھ مختلف ایپلی کیشنز میں منافع تک رسائی کو کھولے گا۔

<span dir="ltr">ERC-4626</span> ٹوکن کو [<span dir="ltr">EIP-4626</span>](https://eips.ethereum.org/EIPS/eip-4626) میں مکمل طور پر بیان کیا گیا ہے۔

**غیر مطابقت پذیر تجوری کی توسیع (<span dir="ltr">ERC-7540</span>)**

<span dir="ltr">ERC-4626</span> کو ایک حد تک ایٹمی ڈپازٹس اور چھٹکارے (redemptions) کے لیے بہتر بنایا گیا ہے۔ اگر حد پوری ہو جائے تو کوئی نیا ڈپازٹ یا چھٹکارا جمع نہیں کیا جا سکتا۔ یہ حد کسی بھی سمارٹ کنٹریکٹ سسٹم کے لیے اچھی طرح کام نہیں کرتی جس میں غیر مطابقت پذیر (asynchronous) کارروائیاں یا تاخیر تجوری کے ساتھ انٹرفیس کرنے کے لیے شرط کے طور پر شامل ہوں (جیسے، حقیقی دنیا کے اثاثہ پروٹوکولز، کم ضمانت والے قرض دینے کے پروٹوکولز، کراس چین قرض دینے کے پروٹوکولز، سیال اسٹیکنگ ٹوکنز (lsts)، یا انشورنس سیفٹی ماڈیولز)۔

<span dir="ltr">ERC-7540</span> غیر مطابقت پذیر استعمال کے معاملات کے لیے <span dir="ltr">ERC-4626</span> تجوریوں کی افادیت کو بڑھاتا ہے۔ موجودہ تجوری انٹرفیس (`deposit`/`withdraw`/`mint`/`redeem`) کو غیر مطابقت پذیر درخواستوں کا دعویٰ کرنے کے لیے مکمل طور پر استعمال کیا جاتا ہے۔

<span dir="ltr">ERC-7540</span> توسیع کو [<span dir="ltr">ERC-7540</span>](https://eips.ethereum.org/EIPS/eip-7540) میں مکمل طور پر بیان کیا گیا ہے۔

**کثیر اثاثہ تجوری کی توسیع (<span dir="ltr">ERC-7575</span>)**

ایک غائب استعمال کا معاملہ جو <span dir="ltr">ERC-4626</span> کے ذریعے تعاون یافتہ نہیں ہے وہ تجوریاں ہیں جن میں متعدد اثاثے یا انٹری پوائنٹس ہوتے ہیں جیسے لیکویڈیٹی فراہم کنندہ (LP) ٹوکنز۔ یہ عام طور پر <span dir="ltr">ERC-4626</span> کی خود ایک <span dir="ltr">ERC-20</span> ہونے کی ضرورت کی وجہ سے بوجھل یا غیر تعمیل شدہ ہوتے ہیں۔

<span dir="ltr">ERC-7575</span> <span dir="ltr">ERC-4626</span> کے نفاذ سے <span dir="ltr">ERC-20</span> ٹوکن کے نفاذ کو بیرونی بنا کر متعدد اثاثوں والی تجوریوں کے لیے تعاون کا اضافہ کرتا ہے۔

<span dir="ltr">ERC-7575</span> توسیع کو [<span dir="ltr">ERC-7575</span>](https://eips.ethereum.org/EIPS/eip-7575) میں مکمل طور پر بیان کیا گیا ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [ٹوکن کے معیارات](/developers/docs/standards/tokens/) اور [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) کے بارے میں پڑھیں۔

## <span dir="ltr">ERC-4626</span> کے فنکشنز اور خصوصیات: {#body}

### طریقے (Methods) {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

یہ فنکشن اکاؤنٹنگ، جمع کرنے، اور انخلا کے لیے تجوری کے لیے استعمال ہونے والے بنیادی ٹوکن کا پتہ لوٹاتا ہے۔

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

یہ فنکشن تجوری کے پاس موجود بنیادی اثاثوں کی کل رقم لوٹاتا ہے۔

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن `shares` کی وہ مقدار لوٹاتا ہے جس کا تبادلہ تجوری کے ذریعے فراہم کردہ `assets` کی مقدار کے لیے کیا جائے گا۔

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن `assets` کی وہ مقدار لوٹاتا ہے جس کا تبادلہ تجوری کے ذریعے فراہم کردہ `shares` کی مقدار کے لیے کیا جائے گا۔

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

یہ فنکشن بنیادی اثاثوں کی زیادہ سے زیادہ مقدار لوٹاتا ہے جو ایک ہی [`deposit`](#deposit) کال میں جمع کی جا سکتی ہے، جس میں `receiver` کے لیے حصص ڈھالے گئے ہوں۔

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے ڈپازٹ کے اثرات کی نقل (simulate) کرنے کی اجازت دیتا ہے۔

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

یہ فنکشن بنیادی ٹوکنز کے `assets` کو تجوری میں جمع کرتا ہے اور `receiver` کو `shares` کی ملکیت دیتا ہے۔

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

یہ فنکشن حصص کی زیادہ سے زیادہ مقدار لوٹاتا ہے جو ایک ہی [`mint`](#mint) کال میں ڈھالے جا سکتے ہیں، جس میں `receiver` کے لیے حصص ڈھالے گئے ہوں۔

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے ڈھالنے (mint) کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

یہ فنکشن بنیادی ٹوکنز کے `assets` جمع کر کے `receiver` کے لیے بالکل `shares` تجوری کے حصص ڈھالتا ہے۔

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

یہ فنکشن بنیادی اثاثوں کی زیادہ سے زیادہ مقدار لوٹاتا ہے جن کا ایک ہی [`withdraw`](#withdraw) کال کے ساتھ `owner` بیلنس سے انخلا کیا جا سکتا ہے۔

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے انخلا کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

یہ فنکشن `owner` سے `shares` کو جلاتا ہے اور تجوری سے بالکل `assets` ٹوکن `receiver` کو بھیجتا ہے۔

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

یہ فنکشن حصص کی زیادہ سے زیادہ مقدار لوٹاتا ہے جنہیں [`redeem`](#redeem) کال کے ذریعے `owner` بیلنس سے چھڑایا (redeem) جا سکتا ہے۔

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

یہ فنکشن صارفین کو موجودہ بلاک پر اپنے چھٹکارے (redemption) کے اثرات کی نقل کرنے کی اجازت دیتا ہے۔

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

یہ فنکشن `owner` سے `shares` کی ایک مخصوص تعداد کو چھڑاتا ہے اور تجوری سے بنیادی ٹوکن کے `assets` کو `receiver` کو بھیجتا ہے۔

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

گردش میں موجود تجوری کے غیر چھڑائے گئے حصص کی کل تعداد لوٹاتا ہے۔

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

تجوری کے حصص کی کل مقدار لوٹاتا ہے جو اس وقت `owner` کے پاس ہے۔

### انٹرفیس کا نقشہ {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### ایونٹس {#events}

#### ڈپازٹ ایونٹ {#deposit-event}

جب ٹوکنز کو [`mint`](#mint) اور [`deposit`](#deposit) طریقوں کے ذریعے تجوری میں جمع کیا جائے تو اسے **لازمی** خارج (emit) کیا جانا چاہیے۔

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

جہاں `sender` وہ صارف ہے جس نے `shares` کے لیے `assets` کا تبادلہ کیا، اور ان `shares` کو `owner` میں منتقل کیا۔

#### انخلا کا ایونٹ {#withdraw-event}

جب کسی جمع کنندہ کی جانب سے [`redeem`](#redeem) یا [`withdraw`](#withdraw) طریقوں میں تجوری سے حصص کا انخلا کیا جائے تو اسے **لازمی** خارج کیا جانا چاہیے۔

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

جہاں `sender` وہ صارف ہے جس نے انخلا کو متحرک کیا اور `owner` کی ملکیت والے `shares` کا `assets` کے لیے تبادلہ کیا۔ `receiver` وہ صارف ہے جس نے انخلا کیے گئے `assets` وصول کیے۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-4626</span>: ٹوکنائزڈ تجوری کا معیار](https://eips.ethereum.org/EIPS/eip-4626)
- [<span dir="ltr">ERC-4626</span>: <span dir="ltr">GitHub</span> ریپو](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)