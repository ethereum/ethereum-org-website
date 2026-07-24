---
title: "⁦ERC-7540⁩ غیر ہم آہنگ ٹوکنائزڈ تجوری کا معیار"
description: "⁦ERC-4626⁩ کی ایک توسیع جو ٹوکنائزڈ تجوریوں کے لیے غیر ہم آہنگ ڈپازٹ اور واپسی کے بہاؤ کا اضافہ کرتی ہے۔"
lang: ur
---

## تعارف {#introduction}

<span dir="ltr">ERC-7540</span> غیر ہم آہنگ ڈپازٹ اور واپسی کے بہاؤ کے لیے تعاون شامل کر کے [<span dir="ltr">ERC-4626</span> ٹوکنائزڈ تجوری کے معیار](/developers/docs/standards/tokens/erc-4626/) کو بڑھاتا ہے۔ یہ ایک درخواست-پھر-دعویٰ کا نمونہ متعارف کراتا ہے: صارفین پہلے ایک درخواست جمع کراتے ہیں (اپنے اثاثوں یا حصص کو مقفل کرتے ہوئے)، پھر تجوری کے اس پر کارروائی کرنے کے بعد نتیجے کا دعویٰ کرتے ہیں۔

اس کی ضرورت اس وقت ہوتی ہے جب کوئی تجوری ایک ہی ٹرانزیکشن میں فوری طور پر تصفیہ نہیں کر سکتی، مثال کے طور پر:

- حقیقی دنیا کے اثاثے (RWA) پروٹوکولز جیسے ٹوکنائزڈ ٹریژریز، نجی کریڈٹ، اور <span dir="ltr">T+1</span> یا <span dir="ltr">T+2</span> تصفیہ کے چکروں والے دیگر اثاثے
- کم ضمانت والا قرض دینا جہاں کریڈٹ کا تخمینہ آف چین ہوتا ہے
- کراس چین تجوری کی حکمت عملی جہاں برجنگ تاخیر کا باعث بنتی ہے
- ان بانڈنگ ادوار کے ساتھ سیال اسٹیکنگ ٹوکن (lst)

تجوریاں صرف ڈپازٹس، صرف واپسیوں، یا دونوں پر غیر ہم آہنگ ہونے کا انتخاب کر سکتی ہیں۔ یہ لچک تجوری کے ڈیولپرز کو صرف وہیں غیر ہم آہنگ بہاؤ شامل کرنے دیتی ہے جہاں بنیادی حکمت عملی کو اس کی ضرورت ہوتی ہے، جبکہ دوسری طرف کو ہم آہنگ رکھتی ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [ٹوکن کے معیارات](/developers/docs/standards/tokens/)، [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، اور [<span dir="ltr">ERC-4626</span>](/developers/docs/standards/tokens/erc-4626/) کے بارے میں پڑھیں۔

## <span dir="ltr">ERC-4626</span> بمقابلہ <span dir="ltr">ERC-7540</span> {#comparison}

<span dir="ltr">ERC-4626</span> میں، ایک ڈپازٹ ایٹمی طور پر تصفیہ پاتا ہے: سرمایہ کار اثاثے بھیجتا ہے اور ایک ہی ٹرانزیکشن میں حصص واپس وصول کرتا ہے۔

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

<span dir="ltr">ERC-7540</span> اسے دو مراحل میں تقسیم کرتا ہے۔ سرمایہ کار پہلے اثاثوں کو مقفل کرنے کے لیے `requestDeposit()` کو کال کرتا ہے، پھر تجوری کے مینیجر کی جانب سے درخواست پر کارروائی کا انتظار کرتا ہے۔ ایک بار مکمل ہونے کے بعد، سرمایہ کار اپنے حصص کا دعویٰ کرنے کے لیے `deposit()` کو کال کرتا ہے۔ شرح مبادلہ کا تعین تکمیل کے وقت کیا جاتا ہے، درخواست کے وقت نہیں۔

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

واپسی کا بہاؤ بھی اسی طرح کام کرتا ہے: `requestRedeem()` حصص کو مقفل کرتا ہے، اور ایک بار مکمل ہونے کے بعد سرمایہ کار اثاثوں کا دعویٰ کرنے کے لیے `redeem()` کو کال کرتا ہے۔

## <span dir="ltr">ERC-7540</span> فنکشنز اور خصوصیات {#body}

<span dir="ltr">ERC-7540</span> مکمل <span dir="ltr">ERC-4626</span> انٹرفیس وراثت میں حاصل کرتا ہے لیکن `deposit`/`mint`/`withdraw`/`redeem` کو دعویٰ کے فنکشنز کے طور پر دوبارہ استعمال کرتا ہے۔ نئے `requestDeposit` اور `requestRedeem` فنکشنز ابتدائی درخواست کے مرحلے کو سنبھالتے ہیں۔

ہر درخواست تین حالتوں سے گزرتی ہے: زیر التواء (جمع کرائی گئی، کارروائی کے انتظار میں)، قابل دعویٰ (مکمل اور قیمت مقرر)، اور دعویٰ شدہ (سرمایہ کار نے اپنے حصص یا اثاثے جمع کر لیے ہیں)۔

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### ڈپازٹ کی درخواست کا بہاؤ {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` سے `assets` کو تجوری میں منتقل کرتا ہے اور ڈپازٹ کی درخواست جمع کراتا ہے۔ `controller` پتہ درخواست کا کنٹرول حاصل کرتا ہے۔ درخواست کے بیچ کی شناخت کرنے والا ایک `requestId` واپس کرتا ہے۔

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

دیے گئے `controller` اور `requestId` کے لیے زیر التواء (ابھی تک قابل دعویٰ نہیں) ڈپازٹ کی درخواست میں `assets` کی رقم واپس کرتا ہے۔

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

دیے گئے `controller` اور `requestId` کے لیے قابل دعویٰ (مکمل لیکن ابھی تک دعویٰ نہیں کیا گیا) ڈپازٹ کی درخواست میں `assets` کی رقم واپس کرتا ہے۔

#### ڈپازٹس کا دعویٰ کرنا {#claiming-deposits}

ایک بار جب ڈپازٹ کی درخواست قابل دعویٰ ہو جاتی ہے، تو صارف اپنے حصص کا دعویٰ کرنے کے لیے معیاری <span dir="ltr">ERC-4626</span> [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) یا [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) فنکشن کو کال کرتا ہے۔ <span dir="ltr">ERC-7540</span> میں، یہ فنکشنز اب اثاثوں کی منتقلی نہیں کرتے (یہ درخواست کے وقت پہلے ہی ہو چکا ہے)۔ وہ صرف وصول کنندہ کے لیے حصص ڈھالتے ہیں۔

### واپسی کی درخواست کا بہاؤ {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` سے `shares` کو مقفل کرتا ہے اور واپسی کی درخواست جمع کراتا ہے۔ `controller` پتہ درخواست کا کنٹرول حاصل کرتا ہے۔

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

دیے گئے `controller` اور `requestId` کے لیے زیر التواء واپسی کی درخواست میں `shares` کی رقم واپس کرتا ہے۔

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

دیے گئے `controller` اور `requestId` کے لیے قابل دعویٰ واپسی کی درخواست میں `shares` کی رقم واپس کرتا ہے۔

#### واپسیوں کا دعویٰ کرنا {#claiming-redemptions}

ایک بار جب واپسی کی درخواست قابل دعویٰ ہو جاتی ہے، تو صارف اپنے اثاثوں کا دعویٰ کرنے کے لیے معیاری <span dir="ltr">ERC-4626</span> [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) یا [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) فنکشن کو کال کرتا ہے۔

### آپریٹر کا انتظام {#operator-management}

<span dir="ltr">ERC-7540</span> میں ایک آپریٹر پیٹرن شامل ہے ([<span dir="ltr">ERC-6909</span>](https://eips.ethereum.org/EIPS/eip-6909) سے) جو فریق ثالث کو صارف کی جانب سے درخواستوں کا انتظام کرنے کی اجازت دیتا ہے۔

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

ڈپازٹ/واپسی کی درخواستوں اور دعووں کے لیے `msg.sender` کی جانب سے کام کرنے کے لیے `operator` کو منظور یا منسوخ کرتا ہے۔

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

واپس کرتا ہے کہ آیا `operator` کو `controller` کی جانب سے کام کرنے کی منظوری دی گئی ہے۔

### درخواست کی آئی ڈیز {#request-ids}

درخواست کی آئی ڈیز درخواستوں کے مختلف بیچوں کے درمیان فرق کرتی ہیں۔ ایک ہی `requestId` کا اشتراک کرنے والی تمام درخواستیں قابل تبادلہ (fungible) ہیں: وہ ایک ساتھ حالتوں کے درمیان منتقل ہوتی ہیں اور ایک ہی شرح مبادلہ حاصل کرتی ہیں۔

جب کوئی تجوری تمام درخواستوں کے لیے `requestId = 0` واپس کرتی ہے، تو صرف `controller` پتہ درخواست کی حالت میں فرق کرتا ہے۔ ایک ہی کنٹرولر کی متعدد درخواستوں کو جمع کیا جاتا ہے۔

### ایونٹس {#events}

#### DepositRequest ایونٹ {#depositrequest-event}

جب [`requestDeposit`](#requestdeposit) کے ذریعے ڈپازٹ کی درخواست جمع کرائی جائے تو اسے لازمی طور پر خارج (emit) کیا جانا چاہیے۔

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest ایونٹ {#redeemrequest-event}

جب [`requestRedeem`](#requestredeem) کے ذریعے واپسی کی درخواست جمع کرائی جائے تو اسے لازمی طور پر خارج کیا جانا چاہیے۔

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet ایونٹ {#operatorset-event}

جب [`setOperator`](#setoperator) کے ذریعے کسی آپریٹر کو منظور یا منسوخ کیا جائے تو اسے لازمی طور پر خارج کیا جانا چاہیے۔

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### پیش نظارہ کے فنکشنز {#preview-functions}

پیش نظارہ کے فنکشنز کو صرف ان بہاؤ کے لیے ریورٹ ہونا چاہیے جو غیر ہم آہنگ ہیں، کیونکہ شرح مبادلہ اس وقت تک معلوم نہیں ہوتی جب تک کہ درخواست مکمل نہ ہو جائے۔ ایک غیر ہم آہنگ-ڈپازٹ تجوری میں، `previewDeposit` اور `previewMint` کو لازمی طور پر ریورٹ ہونا چاہیے، جبکہ `previewRedeem` اور `previewWithdraw` اسی طرح کام کرتے رہتے ہیں جیسے <span dir="ltr">ERC-4626</span> میں (اور غیر ہم آہنگ-واپسی تجوری کے لیے اس کے برعکس)۔ یہ <span dir="ltr">ERC-4626</span> سے ایک اہم رویے کا فرق ہے۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-7540</span>: غیر ہم آہنگ <span dir="ltr">ERC-4626</span> ٹوکنائزڈ تجوریاں](https://eips.ethereum.org/EIPS/eip-7540)
- [<span dir="ltr">EIP-4626</span>: ٹوکنائزڈ تجوری کا معیار](https://eips.ethereum.org/EIPS/eip-4626)
- [اوپن زیپلن <span dir="ltr">ERC-7540</span> کا نفاذ](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)