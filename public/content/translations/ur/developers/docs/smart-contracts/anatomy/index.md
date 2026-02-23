---
title: "اسمارٹ کنٹریکٹس کا تجزیہ"
description: "اسمارٹ کنٹریکٹ کے تجزیہ میں ایک گہری نظر - فنکشنز، ڈیٹا، اور متغیرات۔"
lang: ur-in
---

اسمارٹ کنٹریکٹ ایک پروگرام ہے جو Ethereum پر ایک ایڈریس پر چلتا ہے۔ یہ ڈیٹا اور فنکشنز سے بنے ہوتے ہیں جو ٹرانزیکشن ملنے پر عمل میں آسکتے ہیں۔ اسمارٹ کنٹریکٹ کن چیزوں سے مل کر بنتا ہے اس کا ایک جائزہ یہاں پیش ہے۔

## شرائط {#prerequisites}

پہلے یہ یقینی بنائیں کہ آپ نے [اسمارٹ کنٹریکٹس](/developers/docs/smart-contracts/) کے بارے میں پڑھا ہے۔ یہ دستاویز یہ مان کر چلتی ہے کہ آپ پہلے ہی JavaScript یا Python جیسی پروگرامنگ زبانوں سے واقف ہیں۔

## ڈیٹا {#data}

کسی بھی کنٹریکٹ ڈیٹا کو ایک مقام پر تفویض کیا جانا چاہیے: یا تو `storage` میں یا `memory` میں۔ اسمارٹ کنٹریکٹ میں اسٹوریج میں ترمیم کرنا مہنگا ہے لہذا آپ کو یہ غور کرنے کی ضرورت ہے کہ آپ کا ڈیٹا کہاں رہنا چاہیے۔

### اسٹوریج {#storage}

مستقل ڈیٹا کو اسٹوریج کہا جاتا ہے اور اسے اسٹیٹ متغیرات سے ظاہر کیا جاتا ہے۔ یہ قدریں بلاک چین پر مستقل طور پر محفوظ ہو جاتی ہیں۔ آپ کو ٹائپ کا اعلان کرنے کی ضرورت ہے تاکہ کنٹریکٹ یہ ٹریک رکھ سکے کہ اسے کمپائل کرتے وقت بلاک چین پر کتنے اسٹوریج کی ضرورت ہے۔

```solidity
// Solidity کی مثال
contract SimpleStorage {
    uint storedData; // اسٹیٹ متغیر
    // ...
}
```

```python
# Vyper کی مثال
storedData: int128
```

اگر آپ پہلے ہی آبجیکٹ اورینٹڈ زبانوں میں پروگرامنگ کر چکے ہیں، تو آپ شاید زیادہ تر ٹائپس سے واقف ہوں گے۔ تاہم، اگر آپ Ethereum ڈیولپمنٹ میں نئے ہیں تو `address` آپ کے لیے نیا ہونا چاہیے۔

ایک `address` ٹائپ ایک Ethereum ایڈریس رکھ سکتا ہے جو 20 بائٹس یا 160 بٹس کے برابر ہے۔ یہ ایک سرکردہ 0x کے ساتھ ہیکسا ڈیسیمل نوٹیشن میں واپس آتا ہے۔

دیگر ٹائپس میں شامل ہیں:

- بولین
- انٹیجر
- فکسڈ پوائنٹ نمبرز
- فکسڈ سائز بائٹ ایریز
- متحرک سائز کے بائٹ ایریز
- ریشنل اور انٹیجر لٹرلز
- سٹرنگ لٹرلز
- ہیکسا ڈیسیمل لٹرلز
- اینمز

مزید وضاحت کے لیے، دستاویزات پر ایک نظر ڈالیں:

- [Vyper ٹائپس دیکھیں](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity ٹائپس دیکھیں](https://docs.soliditylang.org/en/latest/types.html#value-types)

### میموری {#memory}

وہ قدریں جو صرف کنٹریکٹ فنکشن کے عمل کی مدت کے لیے محفوظ کی جاتی ہیں، میموری متغیرات کہلاتی ہیں۔ چونکہ یہ بلاک چین پر مستقل طور پر محفوظ نہیں ہوتے ہیں، اس لیے ان کا استعمال بہت سستا ہوتا ہے۔

[Solidity دستاویزات](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) میں EVM ڈیٹا (اسٹوریج، میموری، اور اسٹیک) کو کیسے اسٹور کرتا ہے اس کے بارے میں مزید جانیں۔

### انوائرمنٹ متغیرات {#environment-variables}

آپ کے کنٹریکٹ پر آپ کے ذریعے بیان کردہ متغیرات کے علاوہ، کچھ خاص عالمی متغیرات بھی ہوتے ہیں۔ وہ بنیادی طور پر بلاک چین یا موجودہ ٹرانزیکشن کے بارے میں معلومات فراہم کرنے کے لیے استعمال ہوتے ہیں۔

مثالیں:

| **پراپ**          | **اسٹیٹ متغیر** | **تفصیل**                                         |
| ----------------- | --------------- | ------------------------------------------------- |
| `block.timestamp` | uint256         | موجودہ بلاک ایپوک ٹائم اسٹیمپ                     |
| `msg.sender`      | ایڈریس          | پیغام بھیجنے والا (موجودہ کال) |

## فنکشنز {#functions}

آسان ترین الفاظ میں، فنکشنز آنے والے ٹرانزیکشنز کے جواب میں معلومات حاصل کر سکتے ہیں یا معلومات سیٹ کر سکتے ہیں۔

فنکشن کالز کی دو اقسام ہیں:

- `internal` – یہ EVM کال نہیں بناتے
  - اندرونی فنکشنز اور اسٹیٹ متغیرات تک صرف اندرونی طور پر رسائی حاصل کی جا سکتی ہے (یعنی موجودہ کنٹریکٹ کے اندر سے یا اس سے ماخوذ کنٹریکٹس سے)
- `external` – یہ EVM کال بناتے ہیں
  - ایکسٹرنل فنکشنز کنٹریکٹ انٹرفیس کا حصہ ہیں، جس کا مطلب ہے کہ انہیں دوسرے کنٹریکٹس سے اور ٹرانزیکشنز کے ذریعے کال کیا جا سکتا ہے۔ ایک بیرونی فنکشن `f` کو اندرونی طور پر کال نہیں کیا جا سکتا (یعنی، `f()` کام نہیں کرتا، لیکن `this.f()` کام کرتا ہے)۔

وہ `public` یا `private` بھی ہو سکتے ہیں

- `public` فنکشنز کو کنٹریکٹ کے اندر سے اندرونی طور پر یا پیغامات کے ذریعے بیرونی طور پر کال کیا جا سکتا ہے۔
- `private` فنکشنز صرف اس کنٹریکٹ کے لیے نظر آتے ہیں جس میں ان کی تعریف کی گئی ہے اور ماخوذ کنٹریکٹس میں نہیں۔

فنکشنز اور اسٹیٹ متغیرات دونوں کو پبلک یا پرائیویٹ بنایا جا سکتا ہے۔

یہاں ایک کنٹریکٹ پر اسٹیٹ متغیر کو اپ ڈیٹ کرنے کے لیے ایک فنکشن ہے:

```solidity
// Solidity کی مثال
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` ٹائپ کا پیرامیٹر `value` فنکشن میں پاس کیا جاتا ہے: `update_name`
- اسے `public` قرار دیا گیا ہے، یعنی کوئی بھی اس تک رسائی حاصل کر سکتا ہے
- اسے `view` قرار نہیں دیا گیا ہے، اس لیے یہ کنٹریکٹ اسٹیٹ میں ترمیم کر سکتا ہے

### ویو فنکشنز {#view-functions}

یہ فنکشنز کنٹریکٹ کے ڈیٹا کی اسٹیٹ میں ترمیم نہ کرنے کا وعدہ کرتے ہیں۔ عام مثالیں "گیٹر" فنکشنز ہیں – آپ اسے مثال کے طور پر صارف کا بیلنس حاصل کرنے کے لیے استعمال کر سکتے ہیں۔

```solidity
// Solidity کی مثال
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

اسٹیٹ میں ترمیم کرنا کیا سمجھا جاتا ہے:

1. اسٹیٹ متغیرات میں لکھنا۔
2. [ایونٹس کا اخراج](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)۔
3. [دوسرے کنٹریکٹس بنانا](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)۔
4. `selfdestruct` کا استعمال۔
5. کالز کے ذریعے ایتھر بھیجنا۔
6. کسی بھی ایسے فنکشن کو کال کرنا جس پر `view` یا `pure` کا نشان نہ ہو۔
7. نچلی سطح کی کالز کا استعمال۔
8. ان لائن اسمبلی کا استعمال جس میں کچھ آپ کوڈز ہوں۔

### کنسٹرکٹر فنکشنز {#constructor-functions}

`constructor` فنکشنز صرف ایک بار عمل میں آتے ہیں جب کنٹریکٹ پہلی بار تعینات ہوتا ہے۔ بہت سی کلاس پر مبنی پروگرامنگ زبانوں میں `constructor` کی طرح، یہ فنکشنز اکثر اسٹیٹ متغیرات کو ان کی مخصوص قدروں پر شروع کرتے ہیں۔

```solidity
// Solidity کی مثال
// کنٹریکٹ کے ڈیٹا کو شروع کرتا ہے، `owner` کو
// کنٹریکٹ بنانے والے کے ایڈریس پر سیٹ کرتا ہے۔
constructor() public {
    // تمام اسمارٹ کنٹریکٹس اپنے فنکشنز کو ٹرگر کرنے کے لیے بیرونی ٹرانزیکشنز پر انحصار کرتے ہیں۔
    // `msg` ایک عالمی متغیر ہے جس میں دیے گئے ٹرانزیکشن پر متعلقہ ڈیٹا شامل ہے،
    // جیسے بھیجنے والے کا ایڈریس اور ٹرانزیکشن میں شامل ETH کی قدر۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper کی مثال

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### بلٹ ان فنکشنز {#built-in-functions}

آپ کے کنٹریکٹ پر آپ کے ذریعے بیان کردہ متغیرات اور فنکشنز کے علاوہ، کچھ خاص بلٹ ان فنکشنز بھی ہیں۔ سب سے واضح مثال ہے:

- `address.send()` – Solidity
- `send(address)` – Vyper

یہ کنٹریکٹس کو دوسرے اکاؤنٹس میں ETH بھیجنے کی اجازت دیتے ہیں۔

## فنکشنز لکھنا {#writing-functions}

آپ کے فنکشن کو ضرورت ہے:

- پیرامیٹر متغیر اور ٹائپ (اگر یہ پیرامیٹرز قبول کرتا ہے)
- اندرونی/بیرونی کا اعلان
- pure/view/payable کا اعلان
- ریٹرنز ٹائپ (اگر یہ قدر واپس کرتا ہے)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // اسٹیٹ متغیر

    // جب کنٹریکٹ تعینات ہوتا ہے تو کال کیا جاتا ہے اور قدر کو شروع کرتا ہے
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // فنکشن حاصل کریں
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // فنکشن سیٹ کریں
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

ایک مکمل کنٹریکٹ کچھ اس طرح نظر آ سکتا ہے۔ یہاں `constructor` فنکشن `dapp_name` متغیر کے لیے ایک ابتدائی قدر فراہم کرتا ہے۔

## ایونٹس اور لاگز {#events-and-logs}

ایونٹس آپ کے اسمارٹ کنٹریکٹ کو آپ کے فرنٹ اینڈ یا دیگر سبسکرائب کرنے والی ایپلی کیشنز کے ساتھ بات چیت کرنے کے قابل بناتے ہیں۔ ایک بار جب ٹرانزیکشن کی توثیق ہو جاتی ہے اور اسے بلاک میں شامل کر دیا جاتا ہے، تو اسمارٹ کنٹریکٹس ایونٹس خارج کر سکتے ہیں اور معلومات لاگ کر سکتے ہیں، جسے فرنٹ اینڈ پھر پراسیس اور استعمال کر سکتا ہے۔

## تشریح شدہ مثالیں {#annotated-examples}

یہ Solidity میں لکھی گئی کچھ مثالیں ہیں۔ اگر آپ کوڈ کے ساتھ کھیلنا چاہتے ہیں، تو آپ [Remix](http://remix.ethereum.org) میں ان کے ساتھ بات چیت کر سکتے ہیں۔

### ہیلو ورلڈ {#hello-world}

```solidity
// سیمنٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن بیان کرتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` نامی ایک کنٹریکٹ کی تعریف کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی اسٹیٹ) کا مجموعہ ہوتا ہے۔
// ایک بار تعینات ہونے کے بعد، ایک کنٹریکٹ Ethereum بلاک چین پر ایک مخصوص ایڈریس پر رہتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` ٹائپ کا ایک اسٹیٹ متغیر `message` کا اعلان کرتا ہے۔
    // اسٹیٹ متغیرات وہ متغیرات ہیں جن کی قدریں مستقل طور پر کنٹریکٹ اسٹوریج میں محفوظ کی جاتی ہیں۔
    // کلیدی لفظ `public` متغیرات کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے
    // اور ایک ایسا فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس قدر تک رسائی کے لیے کال کر سکتے ہیں۔
    string public message;

    // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، ایک کنسٹرکٹر
    // ایک خاص فنکشن ہے جو صرف کنٹریکٹ کی تخلیق پر عمل میں آتا ہے۔
    // کنسٹرکٹرز کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے استعمال ہوتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // ایک سٹرنگ آرگومنٹ `initMessage` کو قبول کرتا ہے اور قدر کو
        // کنٹریکٹ کے `message` اسٹوریج متغیر میں سیٹ کرتا ہے)۔
        message = initMessage;
    }

    // ایک پبلک فنکشن جو ایک سٹرنگ آرگومنٹ قبول کرتا ہے
    // اور `message` اسٹوریج متغیر کو اپ ڈیٹ کرتا ہے۔
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### ٹوکن {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // ایک `address` ای میل ایڈریس کے مترادف ہے - یہ Ethereum پر ایک اکاؤنٹ کی شناخت کے لیے استعمال ہوتا ہے۔
    // ایڈریس ایک اسمارٹ کنٹریکٹ یا بیرونی (صارف) اکاؤنٹس کی نمائندگی کر سکتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // ایک `mapping` بنیادی طور پر ایک ہیش ٹیبل ڈیٹا اسٹرکچر ہے۔
    // یہ `mapping` ایک غیر دستخط شدہ انٹیجر (ٹوکن بیلنس) کو ایک ایڈریس (ٹوکن ہولڈر) کو تفویض کرتا ہے۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // ایونٹس بلاک چین پر سرگرمی کی لاگنگ کی اجازت دیتے ہیں۔
    // Ethereum کلائنٹس کنٹریکٹ اسٹیٹ کی تبدیلیوں پر ردعمل ظاہر کرنے کے لیے ایونٹس سن سکتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // کنٹریکٹ کے ڈیٹا کو شروع کرتا ہے، `owner` کو
    // کنٹریکٹ بنانے والے کے ایڈریس پر سیٹ کرتا ہے۔
    constructor() public {
        // تمام اسمارٹ کنٹریکٹس اپنے فنکشنز کو ٹرگر کرنے کے لیے بیرونی ٹرانزیکشنز پر انحصار کرتے ہیں۔
        // `msg` ایک عالمی متغیر ہے جس میں دیے گئے ٹرانزیکشن پر متعلقہ ڈیٹا شامل ہے،
        // جیسے بھیجنے والے کا ایڈریس اور ٹرانزیکشن میں شامل ETH کی قدر۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // نئے ٹوکنز کی ایک مقدار بناتا ہے اور انہیں ایک ایڈریس پر بھیجتا ہے۔
    function mint(address receiver, uint amount) public {
        // `require` ایک کنٹرول اسٹرکچر ہے جو کچھ شرائط کو نافذ کرنے کے لیے استعمال ہوتا ہے۔
        // اگر ایک `require` بیان `false` کا اندازہ لگاتا ہے، تو ایک استثنا ٹرگر ہوتا ہے،
        // جو موجودہ کال کے دوران اسٹیٹ میں کی گئی تمام تبدیلیوں کو واپس کر دیتا ہے۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // صرف کنٹریکٹ کا مالک ہی اس فنکشن کو کال کر سکتا ہے
        require(msg.sender == owner, "You are not the owner.");

        // ٹوکنز کی زیادہ سے زیادہ مقدار نافذ کرتا ہے
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` کے بیلنس کو `amount` سے بڑھاتا ہے
        balances[receiver] += amount;
    }

    // کسی بھی کال کرنے والے سے ایک ایڈریس پر موجودہ ٹوکنز کی ایک مقدار بھیجتا ہے۔
    function transfer(address receiver, uint amount) public {
        // بھیجنے والے کے پاس بھیجنے کے لیے کافی ٹوکنز ہونے چاہئیں
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // دو ایڈریس کے ٹوکن بیلنس کو ایڈجسٹ کرتا ہے
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // پہلے بیان کردہ ایونٹ کو خارج کرتا ہے
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### منفرد ڈیجیٹل اثاثہ {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// دیگر فائلوں سے علامتوں کو موجودہ کنٹریکٹ میں درآمد کرتا ہے۔
// اس معاملے میں، OpenZeppelin سے مددگار کنٹریکٹس کا ایک سلسلہ۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` کلیدی لفظ بیرونی کنٹریکٹس سے فنکشنز اور کلیدی الفاظ کو وراثت میں لینے کے لیے استعمال ہوتا ہے۔
// اس معاملے میں، `CryptoPizza` `IERC721` اور `ERC165` کنٹریکٹس سے وراثت میں لیتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // حسابی کارروائیوں کو محفوظ طریقے سے انجام دینے کے لیے OpenZeppelin کی SafeMath لائبریری کا استعمال کرتا ہے۔
    // مزید جانیں: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity میں مستقل اسٹیٹ متغیرات دیگر زبانوں کی طرح ہیں
    // لیکن آپ کو ایک ایسے اظہار سے تفویض کرنا چاہیے جو کمپائل وقت پر مستقل ہو۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct ٹائپس آپ کو اپنی قسم کی تعریف کرنے دیتے ہیں
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza structs کا ایک خالی سرنی بناتا ہے
    Pizza[] public pizzas;

    // پیزا آئی ڈی سے اس کے مالک کے ایڈریس تک میپنگ
    mapping(uint256 => address) public pizzaToOwner;

    // مالک کے ایڈریس سے ملکیت والے ٹوکن کی تعداد تک میپنگ
    mapping(address => uint256) public ownerPizzaCount;

    // ٹوکن آئی ڈی سے منظور شدہ ایڈریس تک میپنگ
    mapping(uint256 => address) pizzaApprovals;

    // آپ میپنگس کو نیسٹ کر سکتے ہیں، یہ مثال مالک کو آپریٹر کی منظوریوں سے میپ کرتی ہے
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // سٹرنگ (نام) اور DNA سے ایک بے ترتیب پیزا بنانے کے لیے اندرونی فنکشن
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` کلیدی لفظ کا مطلب ہے کہ یہ فنکشن صرف
        // اس کنٹریکٹ اور اس کنٹریکٹ سے ماخوذ کنٹریکٹس کے اندر نظر آتا ہے
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` ایک فنکشن موڈیفائر ہے جو یہ چیک کرتا ہے کہ آیا پیزا پہلے سے موجود ہے
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // پیزا کو پیزا کی سرنی میں شامل کرتا ہے اور آئی ڈی حاصل کرتا ہے
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // چیک کرتا ہے کہ پیزا کا مالک موجودہ صارف کے جیسا ہی ہے
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // نوٹ کریں کہ ایڈریس(0) صفر ایڈریس ہے،
        // جو اس بات کی نشاندہی کرتا ہے کہ pizza[id] ابھی تک کسی خاص صارف کو مختص نہیں کیا گیا ہے۔

        assert(pizzaToOwner[id] == address(0));

        // پیزا کو مالک سے میپ کرتا ہے
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // سٹرنگ (نام) سے ایک بے ترتیب پیزا بناتا ہے
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // سٹرنگ (نام) اور مالک (بنانے والے) کے ایڈریس سے بے ترتیب DNA بناتا ہے
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` کے طور پر نشان زد فنکشنز اسٹیٹ سے پڑھنے یا اس میں ترمیم نہ کرنے کا وعدہ کرتے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // سٹرنگ (نام) + ایڈریس (مالک) سے بے ترتیب uint بناتا ہے
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // مالک کے ذریعہ پائے گئے پیزا کی سرنی واپس کرتا ہے
    function getPizzasByOwner(address _owner)
        public
        // `view` کے طور پر نشان زد فنکشنز اسٹیٹ میں ترمیم نہ کرنے کا وعدہ کرتے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // صرف اس فنکشن کال کے لائف سائیکل کے لیے قدروں کو اسٹور کرنے کے لیے `memory` اسٹوریج مقام کا استعمال کرتا ہے۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // پیزا اور ملکیت دوسرے ایڈریس پر منتقل کرتا ہے
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // درآمد شدہ IERC721 کنٹریکٹ میں بیان کردہ ایونٹ کو خارج کرتا ہے
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * دیے گئے ٹوکن آئی ڈی کی ملکیت کو محفوظ طریقے سے دوسرے ایڈریس پر منتقل کرتا ہے
     * اگر ہدف ایڈریس ایک کنٹریکٹ ہے، تو اسے `onERC721Received` کو نافذ کرنا ہوگا،
     * جسے ایک محفوظ منتقلی پر کال کیا جاتا ہے، اور جادوئی قدر واپس کرنا ہوگا
     * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`؛
     * بصورت دیگر، منتقلی واپس کر دی جاتی ہے۔
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * دیے گئے ٹوکن آئی ڈی کی ملکیت کو محفوظ طریقے سے دوسرے ایڈریس پر منتقل کرتا ہے
     * اگر ہدف ایڈریس ایک کنٹریکٹ ہے، تو اسے `onERC721Received` کو نافذ کرنا ہوگا،
     * جسے ایک محفوظ منتقلی پر کال کیا جاتا ہے، اور جادوئی قدر واپس کرنا ہوگا
     * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`؛
     * بصورت دیگر، منتقلی واپس کر دی جاتی ہے۔
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * ہدف ایڈریس پر `onERC721Received` کو کال کرنے کے لیے اندرونی فنکشن
     * کال اس وقت عمل میں نہیں آتی جب ہدف ایڈریس ایک کنٹریکٹ نہ ہو
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // ایک پیزا کو جلاتا ہے - ٹوکن کو مکمل طور پر تباہ کرتا ہے
    // `external` فنکشن موڈیفائر کا مطلب ہے کہ یہ فنکشن
    // کنٹریکٹ انٹرفیس کا حصہ ہے اور دوسرے کنٹریکٹس اسے کال کر سکتے ہیں
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // ایڈریس کے لحاظ سے پیزا کی تعداد واپس کرتا ہے
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // آئی ڈی کے ذریعہ پائے گئے پیزا کا مالک واپس کرتا ہے
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // پیزا کی ملکیت منتقل کرنے کے لیے دوسرے ایڈریس کو منظور کرتا ہے
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // مخصوص پیزا کے لیے منظور شدہ ایڈریس واپس کرتا ہے
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * دیے گئے ٹوکن آئی ڈی کی موجودہ منظوری کو صاف کرنے کے لیے نجی فنکشن
     * اگر دیا گیا ایڈریس واقعی ٹوکن کا مالک نہیں ہے تو واپس کرتا ہے
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * دیے گئے آپریٹر کی منظوری کو سیٹ یا ان سیٹ کرتا ہے
     * ایک آپریٹر کو ان کی طرف سے بھیجنے والے کے تمام ٹوکنز منتقل کرنے کی اجازت ہے
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // بتاتا ہے کہ آیا کوئی آپریٹر دیے گئے مالک کے ذریعہ منظور شدہ ہے
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // پیزا کی ملکیت لیتا ہے - صرف منظور شدہ صارفین کے لیے
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // چیک کرتا ہے کہ آیا پیزا موجود ہے
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // چیک کرتا ہے کہ آیا ایڈریس مالک ہے یا پیزا منتقل کرنے کے لیے منظور شدہ ہے
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // چیک کریں کہ آیا پیزا منفرد ہے اور ابھی تک موجود نہیں ہے
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // واپس کرتا ہے کہ آیا ہدف ایڈریس ایک کنٹریکٹ ہے
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // فی الحال کسی ایڈریس میں کنٹریکٹ ہے یا نہیں یہ چیک کرنے کا اس سے بہتر کوئی طریقہ نہیں ہے
        // کہ اس ایڈریس پر کوڈ کا سائز چیک کیا جائے۔
        // یہ کیسے کام کرتا ہے اس کے بارے میں مزید تفصیلات کے لیے https://ethereum.stackexchange.com/a/14016/36603
        // دیکھیں۔
        // TODO Serenity ریلیز سے پہلے اسے دوبارہ چیک کریں، کیونکہ تمام ایڈریس
        // تب کنٹریکٹ ہوں گے۔
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## مزید پڑھیں {#further-reading}

اسمارٹ کنٹریکٹس کے مزید مکمل جائزہ کے لیے Solidity اور Vyper کی دستاویزات دیکھیں۔

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## متعلقہ موضوعات {#related-topics}

- [اسمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [Ethereum ورچوئل مشین](/developers/docs/evm/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [کنٹریکٹ سائز کی حد سے لڑنے کے لیے کنٹریکٹس کو چھوٹا کرنا](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– اپنے اسمارٹ کنٹریکٹ کا سائز کم کرنے کے لیے کچھ عملی نکات۔_
- [ایونٹس کے ساتھ اسمارٹ کنٹریکٹس سے ڈیٹا لاگ کرنا](/developers/tutorials/logging-events-smart-contracts/) _– اسمارٹ کنٹریکٹ ایونٹس کا ایک تعارف اور آپ انہیں ڈیٹا لاگ کرنے کے لیے کیسے استعمال کر سکتے ہیں۔_
- [Solidity سے دوسرے کنٹریکٹس کے ساتھ تعامل کریں](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– موجودہ کنٹریکٹ سے اسمارٹ کنٹریکٹ کو کیسے تعینات کریں اور اس کے ساتھ تعامل کریں۔_
