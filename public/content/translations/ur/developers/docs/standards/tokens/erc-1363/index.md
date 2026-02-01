---
title: ERC-1363 قابل ادائیگی ٹوکن اسٹینڈرڈ
description: ERC-1363، ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس ہے جو ٹرانسفرز کے بعد وصول کنندہ کنٹریکٹ پر، یا منظوریوں کے بعد خرچ کرنے والے کنٹریکٹ پر، ایک ہی ٹرانزیکشن کے اندر، کسٹم لاجک کو عمل میں لانے کی حمایت کرتا ہے۔
lang: ur-in
---

## تعارف {#introduction}

### ERC-1363 کیا ہے؟ {#what-is-erc1363}

ERC-1363، ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس ہے جو ٹرانسفرز کے بعد وصول کنندہ کنٹریکٹ پر، یا منظوریوں کے بعد خرچ کرنے والے کنٹریکٹ پر، ایک ہی ٹرانزیکشن کے اندر، کسٹم لاجک کو عمل میں لانے کی حمایت کرتا ہے۔

### ERC-20 سے فرق {#erc20-differences}

`transfer`، `transferFrom` اور `approve` جیسے معیاری ERC-20 آپریشنز، ایک الگ ٹرانزیکشن کے بغیر وصول کنندہ یا خرچ کرنے والے کنٹریکٹ پر کوڈ کے نفاذ کی اجازت نہیں دیتے۔
یہ UI کی ڈیولپمنٹ میں پیچیدگی اور اسے اپنانے میں رکاوٹ پیدا کرتا ہے کیونکہ صارفین کو پہلے ٹرانزیکشن کے نافذ ہونے کا انتظار کرنا پڑتا ہے اور پھر دوسرا جمع کرنا پڑتا ہے۔
انہیں دو بار GAS بھی ادا کرنا پڑتا ہے۔

ERC-1363 قابل تبادلہ ٹوکنز کو زیادہ آسانی سے کارروائیاں انجام دینے اور کسی بھی آف چین لسنسر کے استعمال کے بغیر کام کرنے کے قابل بناتا ہے۔
یہ ایک ہی ٹرانزیکشن میں، ٹرانسفر یا منظوری کے بعد، وصول کنندہ یا خرچ کرنے والے کنٹریکٹ پر کال بیک کرنے کی اجازت دیتا ہے۔

## شرائط {#prerequisites}

اس صفحہ کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے اس کے بارے میں پڑھیں:

- [ٹوکن معیارات](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## باڈی {#body}

ERC-1363، `transfer`، `transferFrom` یا `approve` کے بعد اسمارٹ کنٹریکٹس کے ساتھ تعامل کرنے کے لیے ERC-20 ٹوکنز کے لیے ایک معیاری API متعارف کراتا ہے۔

یہ معیار ٹوکنز کو منتقل کرنے کے لیے بنیادی فعالیت فراہم کرتا ہے، ساتھ ہی ٹوکنز کو منظور کرنے کی اجازت دیتا ہے تاکہ انہیں کسی دوسرے آن چین تیسرے فریق کے ذریعے خرچ کیا جا سکے، اور پھر وصول کنندہ یا خرچ کرنے والے کنٹریکٹ پر کال بیک کیا جا سکے۔

اسمارٹ کنٹریکٹس کے بہت سے مجوزہ استعمالات ہیں جو ERC-20 کال بیکس کو قبول کر سکتے ہیں۔

مثالیں یہ ہو سکتی ہیں:

- **کراؤڈ سیلز**: بھیجے گئے ٹوکنز فوری انعام کی تقسیم کو متحرک کرتے ہیں۔
- **سروسز**: ادائیگی ایک مرحلے میں سروس تک رسائی کو فعال کرتی ہے۔
- **انوائسز**: ٹوکنز خود بخود انوائسز کو سیٹل کرتے ہیں۔
- **سبسکرپشنز**: سالانہ شرح کی منظوری پہلے مہینے کی ادائیگی کے اندر سبسکرپشن کو فعال کرتی ہے۔

انہی وجوہات کی بنا پر اسے اصل میں **"قابل ادائیگی ٹوکن"** کا نام دیا گیا تھا۔

کال بیک کا رویہ اس کی افادیت کو مزید وسعت دیتا ہے، جس سے ہموار تعاملات ممکن ہوتے ہیں جیسے:

- **اسٹیکنگ**: منتقل کیے گئے ٹوکنز اسٹیکنگ کنٹریکٹ میں خودکار لاکنگ کو متحرک کرتے ہیں۔
- **ووٹنگ**: موصول ہونے والے ٹوکنز گورننس سسٹم میں ووٹ رجسٹر کرتے ہیں۔
- **سواپنگ**: ٹوکن کی منظوریاں ایک ہی مرحلے میں سواپ لاجک کو فعال کرتی ہیں۔

ERC-1363 ٹوکنز ان تمام صورتوں میں مخصوص یوٹیلیٹیز کے لیے استعمال کیے جا سکتے ہیں جن میں ٹرانسفر یا منظوری موصول ہونے کے بعد کال بیک کو نافذ کرنے کی ضرورت ہوتی ہے۔
ERC-1363 وصول کنندہ کی ٹوکنز کو ہینڈل کرنے کی صلاحیت کی تصدیق کر کے اسمارٹ کنٹریکٹس میں ٹوکن کے نقصان یا ٹوکن لاکنگ سے بچنے کے لیے بھی مفید ہے۔

دیگر ERC-20 ایکسٹینشن تجاویز کے برعکس، ERC-1363، ERC-20 کے `transfer` اور `transferFrom` طریقوں کو اوور رائڈ نہیں کرتا ہے اور ERC-20 کے ساتھ پسماندہ مطابقت کو برقرار رکھتے ہوئے نافذ کیے جانے والے انٹرفیس IDs کی وضاحت کرتا ہے۔

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) سے:

### طریقے {#methods}

ERC-1363 معیار کو نافذ کرنے والے اسمارٹ کنٹریکٹس کو `ERC1363` انٹرفیس کے تمام فنکشنز کے ساتھ ساتھ `ERC20` اور `ERC165` انٹرفیسز کو بھی **لازمی** طور پر نافذ کرنا چاہیے۔

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس جو `transfer` یا `transferFrom` کے بعد وصول کنندہ کنٹریکٹ پر کوڈ کو نافذ کرنے، یا `approve` کے بعد خرچ کرنے والے کنٹریکٹ پر کوڈ کو نافذ کرنے کی حمایت کرتا ہے، ایک ہی ٹرانزیکشن میں۔
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * نوٹ: اس انٹرفیس کے لیے ERC-165 شناخت کنندہ 0xb0202a11 ہے۔
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev کالر کے اکاؤنٹ سے `to` میں `value` کی مقدار میں ٹوکنز منتقل کرتا ہے اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین ویلیو جو یہ بتاتی ہے کہ آپریشن کامیاب رہا جب تک کہ کوئی خرابی نہ ہو۔
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev کالر کے اکاؤنٹ سے `to` میں `value` کی مقدار میں ٹوکنز منتقل کرتا ہے اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `to` کو کال میں بھیجا جاتا ہے۔
   * @return ایک بولین ویلیو جو یہ بتاتی ہے کہ آپریشن کامیاب رہا جب تک کہ کوئی خرابی نہ ہو۔
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev الاؤنس میکانزم کا استعمال کرتے ہوئے `from` سے `to` میں `value` کی مقدار میں ٹوکنز منتقل کرتا ہے اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز بھیجنے ہیں۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین ویلیو جو یہ بتاتی ہے کہ آپریشن کامیاب رہا جب تک کہ کوئی خرابی نہ ہو۔
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev الاؤنس میکانزم کا استعمال کرتے ہوئے `from` سے `to` میں `value` کی مقدار میں ٹوکنز منتقل کرتا ہے اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز بھیجنے ہیں۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `to` کو کال میں بھیجا جاتا ہے۔
   * @return ایک بولین ویلیو جو یہ بتاتی ہے کہ آپریشن کامیاب رہا جب تک کہ کوئی خرابی نہ ہو۔
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev کالر کے ٹوکنز پر `spender` کے الاؤنس کے طور پر `value` کی مقدار میں ٹوکنز سیٹ کرتا ہے اور پھر `spender` پر `ERC1363Spender::onApprovalReceived` کو کال کرتا ہے۔
   * @param spender وہ ایڈریس جو فنڈز خرچ کرے گا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین ویلیو جو یہ بتاتی ہے کہ آپریشن کامیاب رہا جب تک کہ کوئی خرابی نہ ہو۔
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev کالر کے ٹوکنز پر `spender` کے الاؤنس کے طور پر `value` کی مقدار میں ٹوکنز سیٹ کرتا ہے اور پھر `spender` پر `ERC1363Spender::onApprovalReceived` کو کال کرتا ہے۔
   * @param spender وہ ایڈریس جو فنڈز خرچ کرے گا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `spender` کو کال میں بھیجا جاتا ہے۔
   * @return ایک بولین ویلیو جو یہ بتاتی ہے کہ آپریشن کامیاب رہا جب تک کہ کوئی خرابی نہ ہو۔
   */
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

ایک اسمارٹ کنٹریکٹ جو `transferAndCall` یا `transferFromAndCall` کے ذریعے ERC-1363 ٹوکنز کو قبول کرنا چاہتا ہے اسے **لازمی** طور پر `ERC1363Receiver` انٹرفیس کو نافذ کرنا چاہیے:

```solidity
/**
 * @title ERC1363Receiver
 * @dev کسی بھی کنٹریکٹ کے لیے انٹرفیس جو ERC-1363 ٹوکن کنٹریکٹس سے `transferAndCall` یا `transferFromAndCall` کو سپورٹ کرنا چاہتا ہے۔
 */
interface ERC1363Receiver {
  /**
   * @dev جب بھی ERC-1363 ٹوکنز اس کنٹریکٹ میں `operator` کے ذریعے `from` سے `ERC1363::transferAndCall` یا `ERC1363::transferFromAndCall` کے ذریعے منتقل کیے جاتے ہیں، تو یہ فنکشن کال کیا جاتا ہے۔
   *
   * نوٹ: ٹرانسفر کو قبول کرنے کے لیے، اسے لازمی طور پر
   * `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))`
   * (یعنی 0x88a7ca5c، یا اس کا اپنا فنکشن سلیکٹر) واپس کرنا چاہیے۔
   *
   * @param operator وہ ایڈریس جس نے `transferAndCall` یا `transferFromAndCall` فنکشن کو کال کیا۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز منتقل کیے گئے ہیں۔
   * @param value منتقل کیے گئے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا۔
   * @return `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))` اگر ٹرانسفر کی اجازت ہو جب تک کہ کوئی خرابی نہ ہو۔
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

ایک اسمارٹ کنٹریکٹ جو `approveAndCall` کے ذریعے ERC-1363 ٹوکنز کو قبول کرنا چاہتا ہے اسے **لازمی** طور پر `ERC1363Spender` انٹرفیس کو نافذ کرنا چاہیے:

```solidity
/**
 * @title ERC1363Spender
 * @dev کسی بھی کنٹریکٹ کے لیے انٹرفیس جو ERC-1363 ٹوکن کنٹریکٹس سے `approveAndCall` کو سپورٹ کرنا چاہتا ہے۔
 */
interface ERC1363Spender {
  /**
   * @dev جب بھی کوئی ERC-1363 ٹوکنز کا `owner` اس کنٹریکٹ کو `ERC1363::approveAndCall` کے ذریعے اپنے ٹوکنز خرچ کرنے کی منظوری دیتا ہے، تو یہ فنکشن کال کیا جاتا ہے۔
   *
   * نوٹ: منظوری کو قبول کرنے کے لیے، اسے لازمی طور پر
   * `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))`
   * (یعنی 0x7b04a2d0، یا اس کا اپنا فنکشن سلیکٹر) واپس کرنا چاہیے۔
   *
   * @param owner وہ ایڈریس جس نے `approveAndCall` فنکشن کو کال کیا اور پہلے ٹوکنز کا مالک تھا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا۔
   * @return `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))` اگر منظوری کی اجازت ہو جب تک کہ کوئی خرابی نہ ہو۔
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## مزید پڑھیں {#further-reading}

- [ERC-1363: قابل ادائیگی ٹوکن اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub Repo](https://github.com/vittominacori/erc1363-payable-token)
