---
title: "ERC-1363 پے ایبل ٹوکن اسٹینڈرڈ"
description: "ERC-1363، ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس ہے جو ٹرانسفرز کے بعد وصول کنندہ (recipient) کنٹریکٹ پر، یا منظوریوں (approvals) کے بعد خرچ کنندہ (spender) کنٹریکٹ پر، ایک ہی ٹرانزیکشن کے اندر کسٹم لاجک کو چلانے کی سہولت فراہم کرتا ہے۔"
lang: ur
---

## تعارف {#introduction}

### ERC-1363 کیا ہے؟ {#what-is-erc1363}

ERC-1363، ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس ہے جو ٹرانسفرز کے بعد وصول کنندہ (recipient) کنٹریکٹ پر، یا منظوریوں (approvals) کے بعد خرچ کنندہ (spender) کنٹریکٹ پر، ایک ہی ٹرانزیکشن کے اندر کسٹم لاجک کو چلانے کی سہولت فراہم کرتا ہے۔

### ERC-20 سے اختلافات {#erc20-differences}

معیاری ERC-20 آپریشنز جیسے کہ `transfer`، `transferFrom` اور `approve`، کسی الگ ٹرانزیکشن کے بغیر وصول کنندہ یا خرچ کنندہ کنٹریکٹ پر کوڈ کے اجراء (execution) کی اجازت نہیں دیتے۔
یہ UI ڈیولپمنٹ میں پیچیدگی اور اپنانے میں رکاوٹ پیدا کرتا ہے کیونکہ صارفین کو پہلی ٹرانزیکشن کے مکمل ہونے کا انتظار کرنا پڑتا ہے اور پھر دوسری ٹرانزیکشن جمع کرانی پڑتی ہے۔
انہیں دو بار GAS بھی ادا کرنی پڑتی ہے۔

ERC-1363 فنجیبل ٹوکنز کو زیادہ آسانی سے ایکشنز انجام دینے اور کسی بھی آف چین لسنر (off-chain listener) کے استعمال کے بغیر کام کرنے کے قابل بناتا ہے۔
یہ ایک ہی ٹرانزیکشن میں، ٹرانسفر یا منظوری کے بعد، وصول کنندہ یا خرچ کنندہ کنٹریکٹ پر کال بیک (callback) کرنے کی اجازت دیتا ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے ان کے بارے میں پڑھیں:

- [ٹوکن اسٹینڈرڈز](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## باڈی {#body}

ERC-1363، ERC-20 ٹوکنز کے لیے ایک معیاری API متعارف کراتا ہے تاکہ `transfer`، `transferFrom` یا `approve` کے بعد اسمارٹ کنٹریکٹس کے ساتھ تعامل (interact) کیا جا سکے۔

یہ اسٹینڈرڈ ٹوکنز کو ٹرانسفر کرنے کی بنیادی فعالیت فراہم کرتا ہے، اور ساتھ ہی ٹوکنز کو منظور کرنے کی اجازت دیتا ہے تاکہ انہیں کسی دوسری آن چین تھرڈ پارٹی کے ذریعے خرچ کیا جا سکے، اور پھر وصول کنندہ یا خرچ کنندہ کنٹریکٹ پر کال بیک کیا جا سکے۔

اسمارٹ کنٹریکٹس کے بہت سے مجوزہ استعمالات ہیں جو ERC-1363 کال بیکس کو قبول کر سکتے ہیں۔

مثالیں یہ ہو سکتی ہیں:

- **کراؤڈ سیلز (Crowdsales)**: بھیجے گئے ٹوکنز فوری انعام کی تقسیم کو متحرک کرتے ہیں۔
- **سروسز (Services)**: ادائیگی ایک ہی قدم میں سروس تک رسائی کو فعال کرتی ہے۔
- **انوائسز (Invoices)**: ٹوکنز خود بخود انوائسز کو سیٹل کرتے ہیں۔
- **سبسکرپشنز (Subscriptions)**: سالانہ ریٹ کی منظوری پہلے مہینے کی ادائیگی کے اندر سبسکرپشن کو فعال کر دیتی ہے۔

ان وجوہات کی بناء پر اسے اصل میں **"پے ایبل ٹوکن (Payable Token)"** کا نام دیا گیا تھا۔

کال بیک کا رویہ اس کی افادیت کو مزید بڑھاتا ہے، جس سے ہموار تعاملات ممکن ہوتے ہیں جیسے:

- **اسٹیکنگ (Staking)**: ٹرانسفر کیے گئے ٹوکنز اسٹیکنگ کنٹریکٹ میں خودکار لاکنگ کو متحرک کرتے ہیں۔
- **ووٹنگ (Voting)**: موصول ہونے والے ٹوکنز گورننس سسٹم میں ووٹ رجسٹر کرتے ہیں۔
- **سواپنگ (Swapping)**: ٹوکن کی منظوریاں ایک ہی قدم میں سواپ لاجک کو فعال کرتی ہیں۔

ERC-1363 ٹوکنز کو ان تمام صورتوں میں مخصوص افادیت کے لیے استعمال کیا جا سکتا ہے جن میں ٹرانسفر یا منظوری ملنے کے بعد کال بیک کے اجراء کی ضرورت ہوتی ہے۔
ERC-1363 وصول کنندہ کی ٹوکنز کو ہینڈل کرنے کی صلاحیت کی تصدیق کر کے اسمارٹ کنٹریکٹس میں ٹوکن کے نقصان یا ٹوکن کے لاک ہونے سے بچنے کے لیے بھی مفید ہے۔

دیگر ERC-20 ایکسٹینشن تجاویز کے برعکس، ERC-1363، ERC-20 کے `transfer` اور `transferFrom` میتھڈز کو اوور رائیڈ (override) نہیں کرتا اور ERC-20 کے ساتھ بیک ورڈ کمپیٹیبلٹی (backward compatibility) کو برقرار رکھتے ہوئے لاگو کیے جانے والے انٹرفیس IDs کی وضاحت کرتا ہے۔

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) سے:

### میتھڈز {#methods}

ERC-1363 اسٹینڈرڈ کو لاگو کرنے والے اسمارٹ کنٹریکٹس کے لیے **لازمی** ہے کہ وہ `ERC1363` انٹرفیس کے ساتھ ساتھ `ERC20` اور `ERC165` انٹرفیسز کے تمام فنکشنز کو لاگو کریں۔

```solidity
pragma solidity ^0.8.0;

/* *
 * @title ERC1363
 * @dev ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس جو ایک ہی ٹرانزیکشن میں `transfer` یا `transferFrom` کے بعد وصول کنندہ (recipient) کنٹریکٹ پر، یا `approve` کے بعد خرچ کرنے والے (spender) کنٹریکٹ پر کوڈ چلانے (executing) کو سپورٹ کرتا ہے۔ */
interface ERC1363 is ERC20, ERC165 {
  /* * NOTE: اس انٹرفیس کے لیے ERC-165 شناخت کنندہ (identifier) 0xb0202a11 ہے۔
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)')) */

  /* *
   * @dev کالر کے اکاؤنٹ سے ٹوکنز کی ایک `value` مقدار `to` پر منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب رہا، سوائے ایرر (throwing) کی صورت میں۔ */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /* *
   * @dev کالر کے اکاؤنٹ سے ٹوکنز کی ایک `value` مقدار `to` پر منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `to` کی کال میں بھیجا جاتا ہے۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب رہا، سوائے ایرر (throwing) کی صورت میں۔ */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev الاؤنس میکانزم (allowance mechanism) کا استعمال کرتے ہوئے `from` سے `to` تک ٹوکنز کی ایک `value` مقدار منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز بھیجنے ہیں۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب رہا، سوائے ایرر (throwing) کی صورت میں۔ */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /* *
   * @dev الاؤنس میکانزم (allowance mechanism) کا استعمال کرتے ہوئے `from` سے `to` تک ٹوکنز کی ایک `value` مقدار منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز بھیجنے ہیں۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `to` کی کال میں بھیجا جاتا ہے۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب رہا، سوائے ایرر (throwing) کی صورت میں۔ */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev کالر کے ٹوکنز پر `spender` کے الاؤنس کے طور پر ٹوکنز کی ایک `value` مقدار سیٹ کرتا ہے
   * اور پھر `spender` پر `ERC1363Spender::onApprovalReceived` کو کال کرتا ہے۔
   * @param spender وہ ایڈریس جو فنڈز خرچ کرے گا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب رہا، سوائے ایرر (throwing) کی صورت میں۔ */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /* *
   * @dev کالر کے ٹوکنز پر `spender` کے الاؤنس کے طور پر ٹوکنز کی ایک `value` مقدار سیٹ کرتا ہے
   * اور پھر `spender` پر `ERC1363Spender::onApprovalReceived` کو کال کرتا ہے۔
   * @param spender وہ ایڈریس جو فنڈز خرچ کرے گا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `spender` کی کال میں بھیجا جاتا ہے۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب رہا، سوائے ایرر (throwing) کی صورت میں۔ */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

ایک اسمارٹ کنٹریکٹ جو `transferAndCall` یا `transferFromAndCall` کے ذریعے ERC-1363 ٹوکنز قبول کرنا چاہتا ہے، اس کے لیے **لازمی** ہے کہ وہ `ERC1363Receiver` انٹرفیس کو لاگو کرے:

```solidity
/* *
 * @title ERC1363Receiver
 * @dev کسی بھی ایسے کنٹریکٹ کے لیے انٹرفیس جو ERC-1363 ٹوکن کنٹریکٹس سے `transferAndCall` یا `transferFromAndCall` کو سپورٹ کرنا چاہتا ہے۔ */
interface ERC1363Receiver {
  /* *
   * @dev جب بھی ERC-1363 ٹوکنز اس کنٹریکٹ میں `ERC1363::transferAndCall` یا `ERC1363::transferFromAndCall` کے ذریعے
   * `operator` کی طرف سے `from` سے منتقل کیے جاتے ہیں، تو یہ فنکشن کال ہوتا ہے۔
   *
   * NOTE: ٹرانسفر کو قبول کرنے کے لیے، اسے لازمی طور پر
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (یعنی 0x88a7ca5c، یا اس کا اپنا فنکشن سلیکٹر) ریٹرن کرنا چاہیے۔
   *
   * @param operator وہ ایڈریس جس نے `transferAndCall` یا `transferFromAndCall` فنکشن کو کال کیا۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز منتقل کیے گئے ہیں۔
   * @param value منتقل کیے گئے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا۔
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` اگر ٹرانسفر کی اجازت ہو، سوائے ایرر (throwing) کی صورت میں۔ */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

ایک اسمارٹ کنٹریکٹ جو `approveAndCall` کے ذریعے ERC-1363 ٹوکنز قبول کرنا چاہتا ہے، اس کے لیے **لازمی** ہے کہ وہ `ERC1363Spender` انٹرفیس کو لاگو کرے:

```solidity
/* *
 * @title ERC1363Spender
 * @dev کسی بھی ایسے کنٹریکٹ کے لیے انٹرفیس جو ERC-1363 ٹوکن کنٹریکٹس سے `approveAndCall` کو سپورٹ کرنا چاہتا ہے۔ */
interface ERC1363Spender {
  /* *
   * @dev جب بھی کوئی ERC-1363 ٹوکنز کا `owner` اس کنٹریکٹ کو `ERC1363::approveAndCall` کے ذریعے
   * اپنے ٹوکنز خرچ کرنے کی منظوری (approve) دیتا ہے، تو یہ فنکشن کال ہوتا ہے۔
   *
   * NOTE: منظوری کو قبول کرنے کے لیے، اسے لازمی طور پر
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (یعنی 0x7b04a2d0، یا اس کا اپنا فنکشن سلیکٹر) ریٹرن کرنا چاہیے۔
   *
   * @param owner وہ ایڈریس جس نے `approveAndCall` فنکشن کو کال کیا اور پہلے ٹوکنز کا مالک تھا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا۔
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` اگر منظوری کی اجازت ہو، سوائے ایرر (throwing) کی صورت میں。 */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## مزید مطالعہ {#further-reading}

- [ERC-1363: پے ایبل ٹوکن اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub ریپو](https://github.com/vittominacori/erc1363-payable-token)