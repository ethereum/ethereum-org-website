---
title: "اسمارٹ کانٹریکٹس کی ساخت"
description: "اسمارٹ کانٹریکٹ کی ساخت کا تفصیلی جائزہ – فنکشنز، ڈیٹا، اور ویری ایبلز۔"
lang: ur
---

اسمارٹ کانٹریکٹ ایک پروگرام ہے جو ایتھیریم پر ایک ایڈریس پر چلتا ہے۔ یہ ڈیٹا اور فنکشنز پر مشتمل ہوتے ہیں جو ٹرانزیکشن موصول ہونے پر عمل میں آ سکتے ہیں۔ یہاں اسمارٹ کانٹریکٹ کے اجزاء کا ایک جائزہ دیا گیا ہے۔

## بنیادی شرائط {#prerequisites}

یقینی بنائیں کہ آپ نے پہلے [اسمارٹ کانٹریکٹس](/developers/docs/smart-contracts/) کے بارے میں پڑھ لیا ہے۔ یہ دستاویز فرض کرتی ہے کہ آپ پہلے ہی JavaScript یا Python جیسی پروگرامنگ زبانوں سے واقف ہیں۔

## ڈیٹا {#data}

کسی بھی کانٹریکٹ کے ڈیٹا کو ایک مقام تفویض کیا جانا چاہیے: یا تو `storage` یا `memory`۔ اسمارٹ کانٹریکٹ میں اسٹوریج کو تبدیل کرنا مہنگا ہوتا ہے، اس لیے آپ کو غور کرنا چاہیے کہ آپ کا ڈیٹا کہاں رہنا چاہیے۔

### اسٹوریج {#storage}

مستقل ڈیٹا کو اسٹوریج کہا جاتا ہے اور اسے اسٹیٹ ویری ایبلز کے ذریعے ظاہر کیا جاتا ہے۔ یہ قدریں بلاک چین پر مستقل طور پر محفوظ ہو جاتی ہیں۔ آپ کو اس کی قسم (type) کا اعلان کرنے کی ضرورت ہوتی ہے تاکہ کانٹریکٹ مرتب (compile) ہوتے وقت یہ حساب رکھ سکے کہ اسے بلاک چین پر کتنی اسٹوریج درکار ہے۔

```solidity
// Solidity کی مثال
contract SimpleStorage {
    uint storedData; // اسٹیٹ ویری ایبل
    // ...
}
```

```python
# Vyper کی مثال
storedData: int128
```

اگر آپ نے پہلے ہی آبجیکٹ اورینٹڈ زبانوں میں پروگرامنگ کی ہے، تو آپ ممکنہ طور پر زیادہ تر اقسام سے واقف ہوں گے۔ تاہم، اگر آپ [Ethereum](/) ڈیولپمنٹ میں نئے ہیں تو `address` آپ کے لیے نیا ہونا چاہیے۔

ایک `address` ٹائپ ایتھیریم ایڈریس کو محفوظ کر سکتی ہے جو 20 بائٹس یا 160 بٹس کے برابر ہوتا ہے۔ یہ ہیکسا ڈیسیمل (hexadecimal) شکل میں واپس آتا ہے جس کے شروع میں 0x ہوتا ہے۔

دیگر اقسام میں شامل ہیں:

- boolean
- integer
- fixed point numbers
- fixed-size byte arrays
- dynamically sized byte arrays
- rational and integer literals
- string literals
- hexadecimal literals
- enums

مزید وضاحت کے لیے، دستاویزات دیکھیں:

- [Vyper کی اقسام دیکھیں](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity کی اقسام دیکھیں](https://docs.soliditylang.org/en/latest/types.html#value-types)

### میموری {#memory}

وہ قدریں جو صرف کانٹریکٹ فنکشن کے چلنے کی مدت تک محفوظ رہتی ہیں، میموری ویری ایبلز کہلاتی ہیں۔ چونکہ یہ بلاک چین پر مستقل طور پر محفوظ نہیں ہوتیں، اس لیے ان کا استعمال بہت سستا ہوتا ہے۔

EVM ڈیٹا کو کیسے محفوظ کرتا ہے (اسٹوریج، میموری، اور اسٹیک) اس بارے میں مزید جاننے کے لیے [Solidity کی دستاویزات](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) دیکھیں۔

### انوائرنمنٹ ویری ایبلز {#environment-variables}

آپ کے کانٹریکٹ میں بیان کردہ ویری ایبلز کے علاوہ، کچھ خاص گلوبل ویری ایبلز بھی ہوتے ہیں۔ یہ بنیادی طور پر بلاک چین یا موجودہ ٹرانزیکشن کے بارے میں معلومات فراہم کرنے کے لیے استعمال ہوتے ہیں۔

مثالیں:

| **پراپرٹی**       | **اسٹیٹ ویری ایبل** | **تفصیل**                           |
| ----------------- | ------------------- | ------------------------------------ |
| `block.timestamp` | uint256             | موجودہ بلاک کا ایپوک ٹائم اسٹیمپ     |
| `msg.sender`      | address             | پیغام بھیجنے والا (موجودہ کال)       |

## فنکشنز {#functions}

آسان ترین الفاظ میں، فنکشنز آنے والی ٹرانزیکشنز کے جواب میں معلومات حاصل کر سکتے ہیں یا معلومات سیٹ کر سکتے ہیں۔

فنکشن کالز کی دو اقسام ہیں:

- `internal` – یہ EVM کال نہیں بناتے
  - انٹرنل فنکشنز اور اسٹیٹ ویری ایبلز تک صرف اندرونی طور پر رسائی حاصل کی جا سکتی ہے (یعنی موجودہ کانٹریکٹ یا اس سے اخذ کردہ کانٹریکٹس کے اندر سے)
- `external` – یہ EVM کال بناتے ہیں
  - ایکسٹرنل فنکشنز کانٹریکٹ انٹرفیس کا حصہ ہوتے ہیں، جس کا مطلب ہے کہ انہیں دوسرے کانٹریکٹس سے اور ٹرانزیکشنز کے ذریعے کال کیا جا سکتا ہے۔ ایک ایکسٹرنل فنکشن `f` کو اندرونی طور پر کال نہیں کیا جا سکتا (یعنی `f()` کام نہیں کرتا، لیکن `this.f()` کام کرتا ہے)۔

یہ `public` یا `private` بھی ہو سکتے ہیں

- `public` فنکشنز کو کانٹریکٹ کے اندر سے اندرونی طور پر یا پیغامات کے ذریعے بیرونی طور پر کال کیا جا سکتا ہے
- `private` فنکشنز صرف اسی کانٹریکٹ کے لیے نظر آتے ہیں جس میں ان کی تعریف کی گئی ہو اور اخذ کردہ (derived) کانٹریکٹس میں نہیں

فنکشنز اور اسٹیٹ ویری ایبلز دونوں کو پبلک یا پرائیویٹ بنایا جا سکتا ہے

یہاں کانٹریکٹ پر اسٹیٹ ویری ایبل کو اپ ڈیٹ کرنے کے لیے ایک فنکشن دیا گیا ہے:

```solidity
// Solidity کی مثال
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` ٹائپ کا پیرامیٹر `value` فنکشن میں پاس کیا جاتا ہے: `update_name`
- اسے `public` قرار دیا گیا ہے، جس کا مطلب ہے کہ کوئی بھی اس تک رسائی حاصل کر سکتا ہے
- اسے `view` قرار نہیں دیا گیا، اس لیے یہ کانٹریکٹ کی اسٹیٹ کو تبدیل کر سکتا ہے

### ویو فنکشنز (View functions) {#view-functions}

یہ فنکشنز کانٹریکٹ کے ڈیٹا کی اسٹیٹ کو تبدیل نہ کرنے کا وعدہ کرتے ہیں۔ عام مثالیں "getter" فنکشنز ہیں – مثال کے طور پر آپ اسے صارف کا بیلنس حاصل کرنے کے لیے استعمال کر سکتے ہیں۔

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

اسٹیٹ کو تبدیل کرنا کیا سمجھا جاتا ہے:

1. اسٹیٹ ویری ایبلز میں لکھنا۔
2. [ایونٹس کا اخراج (Emitting events)](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)۔
3. [دوسرے کانٹریکٹس بنانا](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)۔
4. `selfdestruct` کا استعمال۔
5. کالز کے ذریعے ایتھر (ether) بھیجنا۔
6. کسی ایسے فنکشن کو کال کرنا جس پر `view` یا `pure` کا نشان نہ ہو۔
7. لو-لیول (low-level) کالز کا استعمال۔
8. ان لائن اسمبلی (inline assembly) کا استعمال جس میں مخصوص اوپ کوڈز (opcodes) شامل ہوں۔

### کنسٹرکٹر فنکشنز (Constructor functions) {#constructor-functions}

`constructor` فنکشنز صرف ایک بار چلتے ہیں جب کانٹریکٹ پہلی بار ڈیپلائے (deploy) ہوتا ہے۔ بہت سی کلاس پر مبنی پروگرامنگ زبانوں میں `constructor` کی طرح، یہ فنکشنز اکثر اسٹیٹ ویری ایبلز کو ان کی مخصوص قدروں کے ساتھ شروع (initialize) کرتے ہیں۔

```solidity
// Solidity کی مثال
// کانٹریکٹ کا ڈیٹا انیشلائز کرتا ہے، `owner` کو سیٹ کرتا ہے
// کانٹریکٹ بنانے والے کے ایڈریس پر۔
constructor() public {
    // تمام سمارٹ کانٹریکٹس اپنے فنکشنز کو متحرک کرنے کے لیے بیرونی ٹرانزیکشنز پر انحصار کرتے ہیں۔
    // `msg` ایک گلوبل ویری ایبل ہے جس میں دی گئی ٹرانزیکشن کا متعلقہ ڈیٹا شامل ہوتا ہے،
    // جیسے بھیجنے والے کا ایڈریس اور ٹرانزیکشن میں شامل ETH کی ویلیو۔
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

### بلٹ ان فنکشنز (Built-in functions) {#built-in-functions}

آپ کے کانٹریکٹ میں بیان کردہ ویری ایبلز اور فنکشنز کے علاوہ، کچھ خاص بلٹ ان فنکشنز بھی ہوتے ہیں۔ سب سے واضح مثال یہ ہے:

- `address.send()` – Solidity
- `send(address)` – Vyper

یہ کانٹریکٹس کو دوسرے اکاؤنٹس میں ETH بھیجنے کی اجازت دیتے ہیں۔

## فنکشنز لکھنا {#writing-functions}

آپ کے فنکشن کو درج ذیل کی ضرورت ہوتی ہے:

- پیرامیٹر ویری ایبل اور ٹائپ (اگر یہ پیرامیٹرز قبول کرتا ہے)
- internal/external کا اعلان
- pure/view/payable کا اعلان
- ریٹرنز ٹائپ (اگر یہ کوئی قدر واپس کرتا ہے)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // اسٹیٹ ویری ایبل

    // جب کانٹریکٹ ڈیپلائے ہوتا ہے تو اسے کال کیا جاتا ہے اور یہ ویلیو کو انیشلائز کرتا ہے
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get فنکشن
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set فنکشن
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

ایک مکمل کانٹریکٹ کچھ اس طرح کا نظر آ سکتا ہے۔ یہاں `constructor` فنکشن `dapp_name` ویری ایبل کے لیے ابتدائی قدر فراہم کرتا ہے۔

## ایونٹس اور لاگز {#events-and-logs}

ایونٹس آپ کے اسمارٹ کانٹریکٹ کو آپ کے فرنٹ اینڈ یا دیگر سبسکرائب کرنے والی ایپلیکیشنز کے ساتھ بات چیت کرنے کے قابل بناتے ہیں۔ ایک بار جب ٹرانزیکشن کی توثیق ہو جاتی ہے اور اسے بلاک میں شامل کر دیا جاتا ہے، تو اسمارٹ کانٹریکٹس ایونٹس خارج کر سکتے ہیں اور معلومات لاگ کر سکتے ہیں، جنہیں پھر فرنٹ اینڈ پروسیس اور استعمال کر سکتا ہے۔

## تشریح شدہ مثالیں {#annotated-examples}

یہ Solidity میں لکھی گئی کچھ مثالیں ہیں۔ اگر آپ کوڈ کے ساتھ تجربہ کرنا چاہتے ہیں، تو آپ [Remix](http://remix.ethereum.org) میں ان کے ساتھ تعامل کر سکتے ہیں۔

### Hello world {#hello-world}

```solidity
// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن متعین کرتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` نامی کانٹریکٹ کی وضاحت کرتا ہے۔
// کانٹریکٹ فنکشنز اور ڈیٹا (اس کی اسٹیٹ) کا مجموعہ ہوتا ہے۔
// ایک بار ڈیپلائے ہونے کے بعد، کانٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص ایڈریس پر موجود ہوتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` ٹائپ کا ایک اسٹیٹ ویری ایبل `message` ڈکلیئر کرتا ہے۔
    // اسٹیٹ ویری ایبلز وہ ویری ایبلز ہوتے ہیں جن کی ویلیوز کانٹریکٹ کی اسٹوریج میں مستقل طور پر محفوظ ہوتی ہیں۔
    // `public` کی ورڈ ویری ایبلز کو کانٹریکٹ کے باہر سے قابل رسائی بناتا ہے
    // اور ایک ایسا فنکشن بناتا ہے جسے دوسرے کانٹریکٹس یا کلائنٹس ویلیو تک رسائی کے لیے کال کر سکتے ہیں۔
    string public message;

    // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، کنسٹرکٹر ایک
    // خاص فنکشن ہوتا ہے جو صرف کانٹریکٹ بننے پر ہی ایگزیکیوٹ ہوتا ہے۔
    // کنسٹرکٹرز کانٹریکٹ کے ڈیٹا کو انیشلائز کرنے کے لیے استعمال ہوتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // ایک سٹرنگ آرگیومنٹ `initMessage` قبول کرتا ہے اور ویلیو کو
        // کانٹریکٹ کے `message` اسٹوریج ویری ایبل میں سیٹ کرتا ہے)۔
        message = initMessage;
    }

    // ایک پبلک فنکشن جو سٹرنگ آرگیومنٹ قبول کرتا ہے
    // اور `message` اسٹوریج ویری ایبل کو اپ ڈیٹ کرتا ہے۔
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // ایک `address` ای میل ایڈریس کے مترادف ہے - یہ ایتھیریم پر اکاؤنٹ کی شناخت کے لیے استعمال ہوتا ہے۔
    // ایڈریسز کسی سمارٹ کانٹریکٹ یا بیرونی (صارف) اکاؤنٹس کی نمائندگی کر سکتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // ایک `mapping` بنیادی طور پر ایک ہیش ٹیبل ڈیٹا سٹرکچر ہے۔
    // یہ `mapping` ایک ان سائنڈ انٹیجر (ٹوکن بیلنس) کو ایک ایڈریس (ٹوکن ہولڈر) کے ساتھ تفویض کرتی ہے۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // ایونٹس بلاک چین پر سرگرمیوں کی لاگنگ کی اجازت دیتے ہیں۔
    // ایتھیریم کلائنٹس کانٹریکٹ کی اسٹیٹ میں تبدیلیوں پر ردعمل ظاہر کرنے کے لیے ایونٹس کو سن سکتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // کانٹریکٹ کا ڈیٹا انیشلائز کرتا ہے، `owner` کو سیٹ کرتا ہے
    // کانٹریکٹ بنانے والے کے ایڈریس پر۔
    constructor() public {
        // تمام سمارٹ کانٹریکٹس اپنے فنکشنز کو متحرک کرنے کے لیے بیرونی ٹرانزیکشنز پر انحصار کرتے ہیں۔
        // `msg` ایک گلوبل ویری ایبل ہے جس میں دی گئی ٹرانزیکشن کا متعلقہ ڈیٹا شامل ہوتا ہے،
        // جیسے بھیجنے والے کا ایڈریس اور ٹرانزیکشن میں شامل ETH کی ویلیو۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // نئے ٹوکنز کی ایک مقدار بناتا ہے اور انہیں ایک ایڈریس پر بھیجتا ہے۔
    function mint(address receiver, uint amount) public {
        // `require` ایک کنٹرول سٹرکچر ہے جو کچھ شرائط کو نافذ کرنے کے لیے استعمال ہوتا ہے۔
        // اگر `require` اسٹیٹمنٹ `false` ہو جائے، تو ایک ایکسیپشن ٹرگر ہوتی ہے،
        // جو موجودہ کال کے دوران اسٹیٹ میں کی گئی تمام تبدیلیوں کو ریورٹ (واپس) کر دیتی ہے۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // صرف کانٹریکٹ کا مالک ہی اس فنکشن کو کال کر سکتا ہے
        require(msg.sender == owner, "You are not the owner.");

        // ٹوکنز کی زیادہ سے زیادہ مقدار کو نافذ کرتا ہے
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` کے بیلنس میں `amount` کا اضافہ کرتا ہے
        balances[receiver] += amount;
    }

    // کسی بھی کالر سے موجودہ ٹوکنز کی ایک مقدار کسی ایڈریس پر بھیجتا ہے۔
    function transfer(address receiver, uint amount) public {
        // بھیجنے والے کے پاس بھیجنے کے لیے کافی ٹوکنز ہونے چاہئیں
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // دونوں ایڈریسز کے ٹوکن بیلنس کو ایڈجسٹ کرتا ہے
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // پہلے سے بیان کردہ ایونٹ کو ایمٹ (emit) کرتا ہے
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unique digital asset {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// دوسری فائلوں سے سمبلز کو موجودہ کانٹریکٹ میں امپورٹ کرتا ہے۔
// اس صورت میں، OpenZeppelin سے ہیلپر کانٹریکٹس کا ایک سلسلہ۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` کی ورڈ بیرونی کانٹریکٹس سے فنکشنز اور کی ورڈز کو وراثت (inherit) میں لینے کے لیے استعمال ہوتا ہے۔
// اس صورت میں، `CryptoPizza` کو `IERC721` اور `ERC165` کانٹریکٹس سے وراثت ملتی ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // ریاضی کے آپریشنز کو محفوظ طریقے سے انجام دینے کے لیے OpenZeppelin کی SafeMath لائبریری کا استعمال کرتا ہے۔
    // مزید جانیں: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity میں کانسٹنٹ اسٹیٹ ویری ایبلز دوسری زبانوں کی طرح ہی ہوتے ہیں
    // لیکن آپ کو ایک ایسے ایکسپریشن سے تفویض کرنا ہوگا جو کمپائل ٹائم پر کانسٹنٹ ہو۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct ٹائپس آپ کو اپنی ٹائپ خود بیان کرنے کی اجازت دیتی ہیں
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza اسٹرکٹس کی ایک خالی ایرے (array) بناتا ہے
    Pizza[] public pizzas;

    // پیزا ID سے اس کے مالک کے ایڈریس تک میپنگ
    mapping(uint256 => address) public pizzaToOwner;

    // مالک کے ایڈریس سے ملکیتی ٹوکنز کی تعداد تک میپنگ
    mapping(address => uint256) public ownerPizzaCount;

    // ٹوکن ID سے منظور شدہ ایڈریس تک میپنگ
    mapping(uint256 => address) pizzaApprovals;

    // آپ میپنگز کو نیسٹ (nest) کر سکتے ہیں، یہ مثال مالک کو آپریٹر کی منظوریوں سے میپ کرتی ہے
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // سٹرنگ (نام) اور DNA سے ایک رینڈم پیزا بنانے کے لیے انٹرنل فنکشن
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` کی ورڈ کا مطلب ہے کہ یہ فنکشن صرف نظر آتا ہے
        // اس کانٹریکٹ اور ان کانٹریکٹس کے اندر جو اس کانٹریکٹ سے اخذ (derive) کیے گئے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` ایک فنکشن موڈیفائر ہے جو چیک کرتا ہے کہ آیا پیزا پہلے سے موجود ہے
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // پیزا کو پیزا کی ایرے میں شامل کرتا ہے اور id حاصل کرتا ہے
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // چیک کرتا ہے کہ پیزا کا مالک وہی ہے جو موجودہ صارف ہے
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // نوٹ کریں کہ address(0) زیرو ایڈریس ہے،
        // جو ظاہر کرتا ہے کہ pizza[id] ابھی تک کسی خاص صارف کو الاٹ نہیں کیا گیا ہے۔

        assert(pizzaToOwner[id] == address(0));

        // پیزا کو مالک سے میپ کرتا ہے
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // سٹرنگ (نام) سے ایک رینڈم پیزا بناتا ہے
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // سٹرنگ (نام) اور مالک (بنانے والے) کے ایڈریس سے رینڈم DNA تیار کرتا ہے
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` کے طور پر مارک کیے گئے فنکشنز اسٹیٹ کو نہ پڑھنے اور نہ ہی تبدیل کرنے کا وعدہ کرتے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // سٹرنگ (نام) + ایڈریس (مالک) سے رینڈم uint تیار کرتا ہے
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // مالک کے پائے گئے پیزا کی ایرے واپس کرتا ہے
    function getPizzasByOwner(address _owner)
        public
        // `view` کے طور پر مارک کیے گئے فنکشنز اسٹیٹ کو تبدیل نہ کرنے کا وعدہ کرتے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory` اسٹوریج لوکیشن کا استعمال کرتا ہے تاکہ ویلیوز کو صرف
        // اس فنکشن کال کے لائف سائیکل کے لیے اسٹور کیا جا سکے۔
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

    // پیزا اور ملکیت کو دوسرے ایڈریس پر منتقل کرتا ہے
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // امپورٹ کیے گئے IERC721 کانٹریکٹ میں بیان کردہ ایونٹ کو ایمٹ کرتا ہے
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /* *
     * دیے گئے ٹوکن ID کی ملکیت کو محفوظ طریقے سے دوسرے ایڈریس پر منتقل کرتا ہے
     * اگر ٹارگٹ ایڈریس ایک کانٹریکٹ ہے، تو اسے `onERC721Received` کو لاگو کرنا چاہیے،
     * جسے محفوظ منتقلی پر کال کیا جاتا ہے، اور میجک ویلیو واپس کرنی چاہیے
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * بصورت دیگر، منتقلی ریورٹ ہو جاتی ہے۔ */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /* *
     * دیے گئے ٹوکن ID کی ملکیت کو محفوظ طریقے سے دوسرے ایڈریس پر منتقل کرتا ہے
     * اگر ٹارگٹ ایڈریس ایک کانٹریکٹ ہے، تو اسے `onERC721Received` کو لاگو کرنا چاہیے،
     * جسے محفوظ منتقلی پر کال کیا جاتا ہے، اور میجک ویلیو واپس کرنی چاہیے
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * بصورت دیگر، منتقلی ریورٹ ہو جاتی ہے۔ */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /* *
     * ٹارگٹ ایڈریس پر `onERC721Received` کو کال کرنے کے لیے انٹرنل فنکشن
     * اگر ٹارگٹ ایڈریس کانٹریکٹ نہیں ہے تو کال ایگزیکیوٹ نہیں ہوتی */
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

    // پیزا کو برن (burn) کرتا ہے - ٹوکن کو مکمل طور پر تباہ کر دیتا ہے
    // `external` فنکشن موڈیفائر کا مطلب ہے کہ یہ فنکشن
    // کانٹریکٹ انٹرفیس کا حصہ ہے اور دوسرے کانٹریکٹس اسے کال کر سکتے ہیں
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

    // id کے ذریعے پائے گئے پیزا کا مالک واپس کرتا ہے
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

    /* *
     * دیے گئے ٹوکن ID کی موجودہ منظوری کو کلیئر کرنے کے لیے پرائیویٹ فنکشن
     * اگر دیا گیا ایڈریس واقعی ٹوکن کا مالک نہیں ہے تو ریورٹ کر دیتا ہے */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /* * کسی دیے گئے آپریٹر کی منظوری کو سیٹ یا ان سیٹ کرتا ہے
     * ایک آپریٹر کو بھیجنے والے کی جانب سے اس کے تمام ٹوکنز منتقل کرنے کی اجازت ہوتی ہے */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // بتاتا ہے کہ آیا کسی آپریٹر کو دیے گئے مالک کی طرف سے منظور کیا گیا ہے
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
        // solium چیک کو غیر فعال کریں کیونکہ
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

    // واپس کرتا ہے کہ آیا ٹارگٹ ایڈریس ایک کانٹریکٹ ہے
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // فی الحال یہ چیک کرنے کا کوئی بہتر طریقہ نہیں ہے کہ آیا کسی ایڈریس میں کوئی کانٹریکٹ موجود ہے
        // سوائے اس کے کہ اس ایڈریس پر کوڈ کا سائز چیک کیا جائے۔
        // دیکھیں https://ethereum.stackexchange.com/a/14016/36603
        // اس بارے میں مزید تفصیلات کے لیے کہ یہ کیسے کام کرتا ہے۔
        // TODO Serenity ریلیز سے پہلے اسے دوبارہ چیک کریں، کیونکہ تب تمام ایڈریسز
        // کانٹریکٹس ہوں گے۔
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## مزید مطالعہ {#further-reading}

اسمارٹ کانٹریکٹس کے مزید مکمل جائزے کے لیے Solidity اور Vyper کی دستاویزات دیکھیں:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## متعلقہ موضوعات {#related-topics}

- [اسمارٹ کانٹریکٹس](/developers/docs/smart-contracts/)
- [ایتھیریم ورچوئل مشین (EVM)](/developers/docs/evm/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [کانٹریکٹ کے سائز کی حد سے نمٹنے کے لیے کانٹریکٹس کو چھوٹا کرنا](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– آپ کے اسمارٹ کانٹریکٹ کا سائز کم کرنے کے لیے کچھ عملی تجاویز۔_
- [ایونٹس کے ساتھ اسمارٹ کانٹریکٹس سے ڈیٹا لاگ کرنا](/developers/tutorials/logging-events-smart-contracts/) _– اسمارٹ کانٹریکٹ ایونٹس کا تعارف اور آپ انہیں ڈیٹا لاگ کرنے کے لیے کیسے استعمال کر سکتے ہیں۔_
- [Solidity سے دوسرے کانٹریکٹس کے ساتھ تعامل کریں](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– موجودہ کانٹریکٹ سے اسمارٹ کانٹریکٹ کو کیسے ڈیپلائے کریں اور اس کے ساتھ تعامل کریں۔_