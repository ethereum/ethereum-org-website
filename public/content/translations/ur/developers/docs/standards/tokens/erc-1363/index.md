---
title: "⁦ERC-1363⁩ قابل ادائیگی ٹوکن کا معیار"
description: "⁦ERC-1363⁩ ⁦ERC-20⁩ ٹوکنز کے لیے ایک توسیعی انٹرفیس ہے جو منتقلی کے بعد وصول کنندہ کنٹریکٹ پر، یا منظوری کے بعد خرچ کنندہ کنٹریکٹ پر، ایک ہی ٹرانزیکشن کے اندر کسٹم لاجک کو چلانے کی سہولت فراہم کرتا ہے۔"
lang: ur
---

## تعارف {#introduction}

### <span dir="ltr">ERC-1363</span> کیا ہے؟ {#what-is-erc1363}

<span dir="ltr">ERC-1363</span> <span dir="ltr">ERC-20</span> ٹوکنز کے لیے ایک توسیعی انٹرفیس ہے جو منتقلی کے بعد وصول کنندہ کنٹریکٹ پر، یا منظوری کے بعد خرچ کنندہ کنٹریکٹ پر، ایک ہی ٹرانزیکشن کے اندر کسٹم لاجک کو چلانے کی سہولت فراہم کرتا ہے۔

### <span dir="ltr">ERC-20</span> سے اختلافات {#erc20-differences}

معیاری <span dir="ltr">ERC-20</span> آپریشنز جیسے `transfer`، `transferFrom` اور `approve`، ایک الگ ٹرانزیکشن کے بغیر وصول کنندہ یا خرچ کنندہ کنٹریکٹ پر کوڈ چلانے کی اجازت نہیں دیتے۔
یہ <span dir="ltr">UI</span> ڈیولپمنٹ میں پیچیدگی اور اپنانے میں رکاوٹ پیدا کرتا ہے کیونکہ صارفین کو پہلی ٹرانزیکشن کے مکمل ہونے کا انتظار کرنا پڑتا ہے اور پھر دوسری جمع کرانی پڑتی ہے۔
انہیں دو بار گیس (<span dir="ltr">GAS</span>) بھی ادا کرنی پڑتی ہے۔

<span dir="ltr">ERC-1363</span> فنجیبل ٹوکنز کو زیادہ آسانی سے افعال انجام دینے اور کسی بھی آف چین لسنر کے استعمال کے بغیر کام کرنے کے قابل بناتا ہے۔
یہ ایک ہی ٹرانزیکشن میں، منتقلی یا منظوری کے بعد، وصول کنندہ یا خرچ کنندہ کنٹریکٹ پر کال بیک کرنے کی اجازت دیتا ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے ان کے بارے میں پڑھیں:

- [ٹوکن کے معیارات](/developers/docs/standards/tokens/)
- [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)

## متن {#body}

<span dir="ltr">ERC-1363</span> <span dir="ltr">ERC-20</span> ٹوکنز کے لیے ایک معیاری <span dir="ltr">API</span> متعارف کراتا ہے تاکہ `transfer`، `transferFrom` یا `approve` کے بعد سمارٹ کنٹریکٹس کے ساتھ تعامل کیا جا سکے۔

یہ معیار ٹوکنز کی منتقلی کے لیے بنیادی فعالیت فراہم کرتا ہے، اور ساتھ ہی ٹوکنز کو منظور کرنے کی اجازت دیتا ہے تاکہ انہیں کسی اور آن چین فریق ثالث کے ذریعے خرچ کیا جا سکے، اور پھر وصول کنندہ یا خرچ کنندہ کنٹریکٹ پر کال بیک کیا جا سکے۔

سمارٹ کنٹریکٹس کے بہت سے مجوزہ استعمالات ہیں جو <span dir="ltr">ERC-20</span> کال بیکس کو قبول کر سکتے ہیں۔

مثالیں یہ ہو سکتی ہیں:

- **کراؤڈ سیلز**: بھیجے گئے ٹوکنز فوری انعام کی تقسیم کو متحرک کرتے ہیں۔
- **خدمات**: ادائیگی ایک ہی قدم میں سروس تک رسائی کو فعال کرتی ہے۔
- **انوائسز**: ٹوکنز خود بخود انوائسز کو طے کرتے ہیں۔
- **سبسکرپشنز**: سالانہ شرح کی منظوری پہلے مہینے کی ادائیگی کے اندر سبسکرپشن کو فعال کرتی ہے۔

ان وجوہات کی بنا پر اسے اصل میں **<span dir="ltr">"Payable Token"</span>** کا نام دیا گیا تھا۔

کال بیک کا رویہ اس کی افادیت کو مزید بڑھاتا ہے، جس سے ہموار تعاملات ممکن ہوتے ہیں جیسے:

- **اسٹیکنگ**: منتقل کیے گئے ٹوکنز ایک اسٹیکنگ کنٹریکٹ میں خودکار لاکنگ کو متحرک کرتے ہیں۔
- **ووٹنگ**: موصول ہونے والے ٹوکنز گورننس سسٹم میں ووٹ درج کرتے ہیں۔
- **تبادلہ**: ٹوکن کی منظوری ایک ہی قدم میں تبادلہ کی لاجک کو فعال کرتی ہے۔

<span dir="ltr">ERC-1363</span> ٹوکنز کو ان تمام صورتوں میں مخصوص افادیت کے لیے استعمال کیا جا سکتا ہے جن میں منتقلی یا منظوری موصول ہونے کے بعد کال بیک کو چلانے کا تقاضا ہوتا ہے۔
<span dir="ltr">ERC-1363</span> وصول کنندہ کی ٹوکنز کو سنبھالنے کی صلاحیت کی تصدیق کر کے سمارٹ کنٹریکٹس میں ٹوکن کے نقصان یا ٹوکن کے لاک ہونے سے بچنے کے لیے بھی مفید ہے۔

دیگر <span dir="ltr">ERC-20</span> توسیعی تجاویز کے برعکس، <span dir="ltr">ERC-1363</span> <span dir="ltr">ERC-20</span> کے `transfer` اور `transferFrom` طریقوں کو اوور رائیڈ نہیں کرتا اور <span dir="ltr">ERC-20</span> کے ساتھ بیک ورڈ مطابقت کو برقرار رکھتے ہوئے لاگو کیے جانے والے انٹرفیس <span dir="ltr">IDs</span> کی وضاحت کرتا ہے۔

[<span dir="ltr">EIP-1363</span>](https://eips.ethereum.org/EIPS/eip-1363) سے:

### طریقے {#methods}

<span dir="ltr">ERC-1363</span> معیار کو لاگو کرنے والے سمارٹ کنٹریکٹس کو `ERC1363` انٹرفیس کے ساتھ ساتھ `ERC20` اور `ERC165` انٹرفیسز کے تمام فنکشنز کو **لازمی** لاگو کرنا چاہیے۔

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس جو ایک ہی ٹرانزیکشن میں `transfer` یا `transferFrom` کے بعد وصول کنندہ کنٹریکٹ پر، یا `approve` کے بعد خرچ کرنے والے (spender) کنٹریکٹ پر کوڈ چلانے کی سہولت فراہم کرتا ہے۔
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * نوٹ: اس انٹرفیس کے لیے ERC-165 شناخت کنندہ (identifier) 0xb0202a11 ہے۔
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev کالر کے اکاؤنٹ سے ٹوکنز کی ایک `value` مقدار `to` میں منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب ہو گیا ہے، سوائے ایرر (throwing) کی صورت کے۔
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev کالر کے اکاؤنٹ سے ٹوکنز کی ایک `value` مقدار `to` میں منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `to` کی کال میں بھیجا جاتا ہے۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب ہو گیا ہے، سوائے ایرر (throwing) کی صورت کے۔
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev الاؤنس (allowance) میکانزم کا استعمال کرتے ہوئے `from` سے `to` میں ٹوکنز کی ایک `value` مقدار منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز بھیجنے ہیں۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب ہو گیا ہے، سوائے ایرر (throwing) کی صورت کے۔
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev الاؤنس (allowance) میکانزم کا استعمال کرتے ہوئے `from` سے `to` میں ٹوکنز کی ایک `value` مقدار منتقل کرتا ہے
   * اور پھر `to` پر `ERC1363Receiver::onTransferReceived` کو کال کرتا ہے۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز بھیجنے ہیں۔
   * @param to وہ ایڈریس جس پر ٹوکنز منتقل کیے جا رہے ہیں۔
   * @param value منتقل کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `to` کی کال میں بھیجا جاتا ہے۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب ہو گیا ہے، سوائے ایرر (throwing) کی صورت کے۔
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev کالر کے ٹوکنز پر `spender` کے الاؤنس کے طور پر ٹوکنز کی ایک `value` مقدار سیٹ کرتا ہے
   * اور پھر `spender` پر `ERC1363Spender::onApprovalReceived` کو کال کرتا ہے۔
   * @param spender وہ ایڈریس جو فنڈز خرچ کرے گا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب ہو گیا ہے، سوائے ایرر (throwing) کی صورت کے۔
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev کالر کے ٹوکنز پر `spender` کے الاؤنس کے طور پر ٹوکنز کی ایک `value` مقدار سیٹ کرتا ہے
   * اور پھر `spender` پر `ERC1363Spender::onApprovalReceived` کو کال کرتا ہے۔
   * @param spender وہ ایڈریس جو فنڈز خرچ کرے گا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `spender` کی کال میں بھیجا جاتا ہے۔
   * @return ایک بولین (boolean) ویلیو جو یہ ظاہر کرتی ہے کہ آپریشن کامیاب ہو گیا ہے، سوائے ایرر (throwing) کی صورت کے۔
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

ایک سمارٹ کنٹریکٹ جو `transferAndCall` یا `transferFromAndCall` کے ذریعے <span dir="ltr">ERC-1363</span> ٹوکنز قبول کرنا چاہتا ہے، اسے `ERC1363Receiver` انٹرفیس کو **لازمی** لاگو کرنا چاہیے:

```solidity
/**
 * @title ERC1363Receiver
 * @dev کسی بھی ایسے کنٹریکٹ کے لیے انٹرفیس جو ERC-1363 ٹوکن کنٹریکٹس سے `transferAndCall` یا `transferFromAndCall` کو سپورٹ کرنا چاہتا ہے۔
 */
interface ERC1363Receiver {
  /**
   * @dev جب بھی `operator` کے ذریعے `from` سے اس کنٹریکٹ میں `ERC1363::transferAndCall` یا `ERC1363::transferFromAndCall` کے ذریعے ERC-1363 ٹوکنز منتقل کیے جاتے ہیں، تو یہ فنکشن کال ہوتا ہے۔
   *
   * نوٹ: منتقلی کو قبول کرنے کے لیے، اسے لازمی طور پر واپس (return) کرنا چاہیے
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (یعنی 0x88a7ca5c، یا اس کا اپنا فنکشن سلیکٹر)۔
   *
   * @param operator وہ ایڈریس جس نے `transferAndCall` یا `transferFromAndCall` فنکشن کو کال کیا۔
   * @param from وہ ایڈریس جہاں سے ٹوکنز منتقل کیے گئے ہیں۔
   * @param value منتقل کیے گئے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا۔
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` اگر منتقلی کی اجازت ہو، سوائے ایرر (throwing) کی صورت کے۔
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

ایک سمارٹ کنٹریکٹ جو `approveAndCall` کے ذریعے <span dir="ltr">ERC-1363</span> ٹوکنز قبول کرنا چاہتا ہے، اسے `ERC1363Spender` انٹرفیس کو **لازمی** لاگو کرنا چاہیے:

```solidity
/**
 * @title ERC1363Spender
 * @dev کسی بھی ایسے کنٹریکٹ کے لیے انٹرفیس جو ERC-1363 ٹوکن کنٹریکٹس سے `approveAndCall` کو سپورٹ کرنا چاہتا ہے۔
 */
interface ERC1363Spender {
  /**
   * @dev جب بھی کوئی ERC-1363 ٹوکنز کا `owner` اس کنٹریکٹ کو `ERC1363::approveAndCall` کے ذریعے اپنے ٹوکنز خرچ کرنے کی منظوری (approve) دیتا ہے، تو یہ فنکشن کال ہوتا ہے۔
   *
   * نوٹ: منظوری کو قبول کرنے کے لیے، اسے لازمی طور پر واپس (return) کرنا چاہیے
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (یعنی 0x7b04a2d0، یا اس کا اپنا فنکشن سلیکٹر)۔
   *
   * @param owner وہ ایڈریس جس نے `approveAndCall` فنکشن کو کال کیا اور جو پہلے ٹوکنز کا مالک تھا۔
   * @param value خرچ کیے جانے والے ٹوکنز کی مقدار۔
   * @param data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا۔
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` اگر منظوری کی اجازت ہو، سوائے ایرر (throwing) کی صورت کے。
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">ERC-1363: Payable Token Standard</span>](https://eips.ethereum.org/EIPS/eip-1363)
- [<span dir="ltr">ERC-1363: GitHub Repo</span>](https://github.com/vittominacori/erc1363-payable-token)