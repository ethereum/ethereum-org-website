---
title: "سمارٹ کنٹریکٹس کی ساخت"
description: "ایک سمارٹ کنٹریکٹ کی ساخت کا تفصیلی جائزہ – فنکشنز، ڈیٹا، اور متغیرات۔"
lang: ur
---

ایک سمارٹ کنٹریکٹ ایک پروگرام ہے جو ایتھیریم پر ایک پتہ پر چلتا ہے۔ یہ ڈیٹا اور فنکشنز پر مشتمل ہوتے ہیں جو ٹرانزیکشن موصول ہونے پر عمل میں آ سکتے ہیں۔ یہاں ایک جائزہ ہے کہ سمارٹ کنٹریکٹ کن چیزوں سے مل کر بنتا ہے۔

## پیشگی شرائط {#prerequisites}

یقینی بنائیں کہ آپ نے پہلے [سمارٹ کنٹریکٹس](/developers/docs/smart-contracts/) کے بارے میں پڑھ لیا ہے۔ یہ دستاویز فرض کرتی ہے کہ آپ پہلے ہی <span dir="ltr">JavaScript</span> یا <span dir="ltr">Python</span> جیسی پروگرامنگ زبانوں سے واقف ہیں۔

## ڈیٹا {#data}

کسی بھی کنٹریکٹ کے ڈیٹا کو ایک مقام تفویض کیا جانا چاہیے: یا تو `storage` یا `memory` پر۔ سمارٹ کنٹریکٹ میں سٹوریج کو تبدیل کرنا مہنگا ہوتا ہے اس لیے آپ کو غور کرنے کی ضرورت ہے کہ آپ کا ڈیٹا کہاں رہنا چاہیے۔

### سٹوریج {#storage}

مستقل ڈیٹا کو سٹوریج کہا جاتا ہے اور اسے حالت کے متغیرات (حالت کا متغیرs) سے ظاہر کیا جاتا ہے۔ یہ اقدار بلاک چین پر مستقل طور پر محفوظ ہو جاتی ہیں۔ آپ کو اس کی قسم (type) کا اعلان کرنے کی ضرورت ہے تاکہ کنٹریکٹ مرتب (compile) ہوتے وقت یہ حساب رکھ سکے کہ اسے بلاک چین پر کتنی سٹوریج کی ضرورت ہے۔

```solidity
// Solidity کی مثال
contract SimpleStorage {
    uint storedData; // حالت کا متغیر
    // ...
}
```

```python
# Vyper کی مثال
storedData: int128
```

اگر آپ نے پہلے ہی آبجیکٹ اورینٹڈ زبانوں میں پروگرامنگ کی ہے، تو آپ ممکنہ طور پر زیادہ تر اقسام (types) سے واقف ہوں گے۔ تاہم، اگر آپ [ایتھیریم](/) ڈیولپمنٹ میں نئے ہیں تو `address` آپ کے لیے نیا ہونا چاہیے۔

ایک `address` قسم ایک ایتھیریم پتہ رکھ سکتی ہے جو <span dir="ltr">20 bytes</span> یا <span dir="ltr">160 bits</span> کے برابر ہوتا ہے۔ یہ ہیکسا ڈیسیمل (hexadecimal) شکل میں واپس آتا ہے جس کے شروع میں <span dir="ltr">0x</span> ہوتا ہے۔

دیگر اقسام میں شامل ہیں:

- بولین (boolean)
- انٹیجر (integer)
- فکسڈ پوائنٹ نمبرز (fixed point numbers)
- فکسڈ سائز بائٹ ایریز (fixed-size byte arrays)
- ڈائنیمکلی سائزڈ بائٹ ایریز (dynamically sized byte arrays)
- ریشنل اور انٹیجر لٹرلز (rational and integer literals)
- سٹرنگ لٹرلز (string literals)
- ہیکسا ڈیسیمل لٹرلز (hexadecimal literals)
- اینمز (enums)

مزید وضاحت کے لیے، دستاویزات پر ایک نظر ڈالیں:

- [Vyper کی اقسام دیکھیں](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity کی اقسام دیکھیں](https://docs.soliditylang.org/en/latest/types.html#value-types)

### میموری {#memory}

وہ اقدار جو صرف کنٹریکٹ فنکشن کے عمل درآمد کی مدت کے لیے محفوظ کی جاتی ہیں، میموری متغیرات (memory variables) کہلاتی ہیں۔ چونکہ یہ بلاک چین پر مستقل طور پر محفوظ نہیں ہوتیں، اس لیے ان کا استعمال بہت سستا ہوتا ہے۔

اس بارے میں مزید جانیں کہ EVM ڈیٹا کیسے محفوظ کرتا ہے (سٹوریج، میموری، اور سٹیک) [Solidity کی دستاویزات](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) میں۔

### ماحولیاتی متغیرات (Environment variables) {#environment-variables}

آپ کے کنٹریکٹ پر بیان کردہ متغیرات کے علاوہ، کچھ خاص عالمی متغیرات (global variables) بھی ہوتے ہیں۔ یہ بنیادی طور پر بلاک چین یا موجودہ ٹرانزیکشن کے بارے میں معلومات فراہم کرنے کے لیے استعمال ہوتے ہیں۔

مثالیں:

| **خصوصیت (Prop)** | **حالت کا متغیر (State variable)** | **تفصیل** |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | <span dir="ltr">uint256</span> | موجودہ بلاک کے دور (epoch) کا ٹائم سٹیمپ |
| `msg.sender` | پتہ | پیغام بھیجنے والا (موجودہ کال) |

## فنکشنز {#functions}

انتہائی سادہ الفاظ میں، فنکشنز آنے والی ٹرانزیکشنز کے جواب میں معلومات حاصل کر سکتے ہیں یا معلومات سیٹ کر سکتے ہیں۔

فنکشن کالز کی دو اقسام ہیں:

- `internal` – یہ EVM کال نہیں بناتے
  - اندرونی فنکشنز اور حالت کے متغیرات تک صرف اندرونی طور پر رسائی حاصل کی جا سکتی ہے (یعنی موجودہ کنٹریکٹ یا اس سے اخذ کردہ کنٹریکٹس کے اندر سے)
- `external` – یہ EVM کال بناتے ہیں
  - بیرونی فنکشنز کنٹریکٹ انٹرفیس کا حصہ ہوتے ہیں، جس کا مطلب ہے کہ انہیں دوسرے کنٹریکٹس سے اور ٹرانزیکشنز کے ذریعے کال کیا جا سکتا ہے۔ ایک بیرونی فنکشن `f` کو اندرونی طور پر کال نہیں کیا جا سکتا (یعنی `f()` کام نہیں کرتا، لیکن `this.f()` کام کرتا ہے)۔

یہ `public` یا `private` بھی ہو سکتے ہیں

- `public` فنکشنز کو کنٹریکٹ کے اندر سے اندرونی طور پر یا پیغامات کے ذریعے بیرونی طور پر کال کیا جا سکتا ہے
- `private` فنکشنز صرف اسی کنٹریکٹ کے لیے نظر آتے ہیں جس میں ان کی تعریف کی گئی ہو اور اخذ کردہ کنٹریکٹس میں نہیں

فنکشنز اور حالت کے متغیرات دونوں کو پبلک یا پرائیویٹ بنایا جا سکتا ہے

یہاں ایک کنٹریکٹ پر حالت کے متغیر کو اپ ڈیٹ کرنے کے لیے ایک فنکشن ہے:

```solidity
// Solidity کی مثال
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` قسم کا پیرامیٹر `value` فنکشن میں پاس کیا جاتا ہے: `update_name`
- اسے `public` قرار دیا گیا ہے، جس کا مطلب ہے کہ کوئی بھی اس تک رسائی حاصل کر سکتا ہے
- اسے `view` قرار نہیں دیا گیا ہے، اس لیے یہ کنٹریکٹ کی حالت کو تبدیل کر سکتا ہے

### ویو فنکشنز (View functions) {#view-functions}

یہ فنکشنز کنٹریکٹ کے ڈیٹا کی حالت کو تبدیل نہ کرنے کا وعدہ کرتے ہیں۔ عام مثالیں "گیٹر" (getter) فنکشنز ہیں – مثال کے طور پر آپ اسے صارف کا بیلنس حاصل کرنے کے لیے استعمال کر سکتے ہیں۔

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

حالت کو تبدیل کرنا کیا سمجھا جاتا ہے:

1. حالت کے متغیرات میں لکھنا۔
2. [ایونٹس کا اخراج](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)۔
3. [دوسرے کنٹریکٹس بنانا](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)۔
4. `selfdestruct` کا استعمال۔
5. کالز کے ذریعے ایتھر بھیجنا۔
6. کسی بھی ایسے فنکشن کو کال کرنا جس پر `view` یا `pure` کا نشان نہ ہو۔
7. لو لیول (low-level) کالز کا استعمال۔
8. ان لائن اسمبلی (inline assembly) کا استعمال جس میں مخصوص اوپ کوڈز (opcodes) شامل ہوں۔

### کنسٹرکٹر فنکشنز {#constructor-functions}

`constructor` فنکشنز صرف ایک بار عمل میں آتے ہیں جب کنٹریکٹ پہلی بار تعینات کیا جاتا ہے۔ بہت سی کلاس پر مبنی پروگرامنگ زبانوں میں `constructor` کی طرح، یہ فنکشنز اکثر حالت کے متغیرات کو ان کی مخصوص اقدار کے ساتھ شروع (initialize) کرتے ہیں۔

```solidity
// Solidity کی مثال
// کنٹریکٹ کے ڈیٹا کو شروع کرتا ہے، `owner` کو سیٹ کرتے ہوئے
// کنٹریکٹ بنانے والے کے پتہ پر۔
constructor() public {
    // تمام سمارٹ کنٹریکٹ اپنے فنکشنز کو متحرک کرنے کے لیے بیرونی ٹرانزیکشنز پر انحصار کرتے ہیں۔
    // `msg` ایک گلوبل متغیر ہے جس میں دی گئی ٹرانزیکشن کا متعلقہ ڈیٹا شامل ہوتا ہے،
    // جیسے بھیجنے والے کا پتہ اور ٹرانزیکشن میں شامل ETH کی مالیت۔
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

آپ کے کنٹریکٹ پر بیان کردہ متغیرات اور فنکشنز کے علاوہ، کچھ خاص بلٹ ان فنکشنز بھی ہوتے ہیں۔ سب سے واضح مثال یہ ہے:

- `address.send()` – Solidity
- `send(address)` – Vyper

یہ کنٹریکٹس کو دوسرے اکاؤنٹس میں ETH بھیجنے کی اجازت دیتے ہیں۔

## فنکشنز لکھنا {#writing-functions}

آپ کے فنکشن کو ضرورت ہوتی ہے:

- پیرامیٹر متغیر اور قسم (اگر یہ پیرامیٹرز قبول کرتا ہے)
- اندرونی/بیرونی (internal/external) کا اعلان
- پیور/ویو/پے ایبل (pure/view/payable) کا اعلان
- واپسی کی قسم (اگر یہ کوئی قدر واپس کرتا ہے)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // جب کنٹریکٹ تعینات کیا جاتا ہے تو اسے کال کیا جاتا ہے اور یہ ویلیو کو شروع کرتا ہے
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

ایک مکمل کنٹریکٹ کچھ اس طرح نظر آ سکتا ہے۔ یہاں `constructor` فنکشن `dapp_name` متغیر کے لیے ایک ابتدائی قدر فراہم کرتا ہے۔

## ایونٹس اور لاگز {#events-and-logs}

ایونٹس آپ کے سمارٹ کنٹریکٹ کو آپ کے فرنٹ اینڈ یا دیگر سبسکرائب کرنے والی ایپلیکیشنز کے ساتھ بات چیت کرنے کے قابل بناتے ہیں۔ ایک بار جب ٹرانزیکشن کی توثیق ہو جاتی ہے اور اسے بلاک میں شامل کر دیا جاتا ہے، تو سمارٹ کنٹریکٹس ایونٹس خارج کر سکتے ہیں اور معلومات لاگ کر سکتے ہیں، جسے فرنٹ اینڈ پھر پروسیس اور استعمال کر سکتا ہے۔

## تشریح شدہ مثالیں {#annotated-examples}

یہ Solidity میں لکھی گئی کچھ مثالیں ہیں۔ اگر آپ کوڈ کے ساتھ تجربہ کرنا چاہتے ہیں، تو آپ [Remix](https://remix.ethereum.org) میں ان کے ساتھ تعامل کر سکتے ہیں۔

### ہیلو ورلڈ (Hello world) {#hello-world}

```solidity
// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن بتاتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` نامی کنٹریکٹ کی وضاحت کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی حالت) کا مجموعہ ہوتا ہے۔
// ایک بار تعینات ہونے کے بعد، کنٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص پتہ پر رہتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` ٹائپ کے حالت کے متغیر `message` کا اعلان کرتا ہے۔
    // حالت کے متغیرات وہ متغیرات ہیں جن کی ویلیوز مستقل طور پر کنٹریکٹ کی سٹوریج میں محفوظ ہوتی ہیں۔
    // کی ورڈ `public` متغیرات کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے
    // اور ایک فنکشن بناتا ہے جسے دوسرے کنٹریکٹ یا کلائنٹس ویلیو تک رسائی کے لیے کال کر سکتے ہیں۔
    string public message;

    // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، ایک کنسٹرکٹر
    // ایک خاص فنکشن ہے جو صرف کنٹریکٹ بننے پر ہی چلتا ہے۔
    // کنسٹرکٹرز کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے استعمال ہوتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // ایک سٹرنگ آرگومنٹ `initMessage` قبول کرتا ہے اور ویلیو کو سیٹ کرتا ہے
        // کنٹریکٹ کے `message` سٹوریج متغیر میں)۔
        message = initMessage;
    }

    // ایک پبلک فنکشن جو سٹرنگ آرگومنٹ قبول کرتا ہے
    // اور `message` سٹوریج متغیر کو اپ ڈیٹ کرتا ہے۔
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### ٹوکن {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // ایک `address` (پتہ) ای میل ایڈریس کے مترادف ہے - یہ ایتھیریم پر اکاؤنٹ کی شناخت کے لیے استعمال ہوتا ہے۔
    // پتے کسی سمارٹ کنٹریکٹ یا بیرونی (صارف) اکاؤنٹس کی نمائندگی کر سکتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // ایک `mapping` بنیادی طور پر ایک ہیش ٹیبل ڈیٹا سٹرکچر ہے۔
    // یہ `mapping` ایک ان سائنڈ انٹیجر (ٹوکن بیلنس) کو ایک پتہ (ٹوکن ہولڈر) کے ساتھ تفویض کرتی ہے۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // ایونٹس بلاک چین پر سرگرمی کی لاگنگ کی اجازت دیتے ہیں۔
    // ایتھیریم کلائنٹس کنٹریکٹ کی حالت کی تبدیلیوں پر ردعمل ظاہر کرنے کے لیے ایونٹس کو سن سکتے ہیں۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // کنٹریکٹ کے ڈیٹا کو شروع کرتا ہے، `owner` کو سیٹ کرتے ہوئے
    // کنٹریکٹ بنانے والے کے پتہ پر۔
    constructor() public {
        // تمام سمارٹ کنٹریکٹ اپنے فنکشنز کو متحرک کرنے کے لیے بیرونی ٹرانزیکشنز پر انحصار کرتے ہیں۔
        // `msg` ایک گلوبل متغیر ہے جس میں دی گئی ٹرانزیکشن کا متعلقہ ڈیٹا شامل ہوتا ہے،
        // جیسے بھیجنے والے کا پتہ اور ٹرانزیکشن میں شامل ETH کی مالیت۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // نئے ٹوکنز کی ایک مقدار بناتا ہے اور انہیں ایک پتہ پر بھیجتا ہے۔
    function mint(address receiver, uint amount) public {
        // `require` ایک کنٹرول سٹرکچر ہے جو کچھ شرائط کو نافذ کرنے کے لیے استعمال ہوتا ہے۔
        // اگر `require` سٹیٹمنٹ `false` ہو جائے، تو ایک ایکسیپشن متحرک ہو جاتی ہے،
        // جو موجودہ کال کے دوران حالت میں کی گئی تمام تبدیلیوں کو واپس (revert) کر دیتی ہے۔
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // صرف کنٹریکٹ کا مالک ہی اس فنکشن کو کال کر سکتا ہے
        require(msg.sender == owner, "You are not the owner.");

        // ٹوکنز کی زیادہ سے زیادہ مقدار کو نافذ کرتا ہے
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` کے بیلنس میں `amount` کا اضافہ کرتا ہے
        balances[receiver] += amount;
    }

    // کسی بھی کالر سے موجودہ ٹوکنز کی ایک مقدار کسی پتہ پر بھیجتا ہے۔
    function transfer(address receiver, uint amount) public {
        // بھیجنے والے کے پاس بھیجنے کے لیے کافی ٹوکنز ہونے چاہئیں
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // دونوں پتوں کے ٹوکن بیلنس کو ایڈجسٹ کرتا ہے
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // پہلے سے بیان کردہ ایونٹ کو خارج (emit) کرتا ہے
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### منفرد ڈیجیٹل اثاثہ {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// دوسری فائلوں سے سمبلز کو موجودہ کنٹریکٹ میں امپورٹ کرتا ہے۔
// اس صورت میں، OpenZeppelin سے ہیلپر کنٹریکٹس کا ایک سلسلہ۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// کی ورڈ `is` بیرونی کنٹریکٹس سے فنکشنز اور کی ورڈز کو وراثت (inherit) میں لینے کے لیے استعمال ہوتا ہے۔
// اس صورت میں، `CryptoPizza` کو `IERC721` اور `ERC165` کنٹریکٹس سے وراثت ملتی ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // ریاضی کے آپریشنز کو محفوظ طریقے سے انجام دینے کے لیے OpenZeppelin کی SafeMath لائبریری کا استعمال کرتا ہے۔
    // مزید جانیں: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity میں مستقل (constant) حالت کے متغیرات دوسری زبانوں کی طرح ہوتے ہیں
    // لیکن آپ کو ایک ایسے ایکسپریشن سے تفویض کرنا ہوگا جو کمپائل ٹائم پر مستقل ہو۔
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct ٹائپس آپ کو اپنی ٹائپ کی وضاحت کرنے دیتی ہیں
    // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza سٹرکٹس کی ایک خالی ایرے بناتا ہے
    Pizza[] public pizzas;

    // پیزا ID سے اس کے مالک کے پتہ تک میپنگ
    mapping(uint256 => address) public pizzaToOwner;

    // مالک کے پتہ سے ملکیتی ٹوکنز کی تعداد تک میپنگ
    mapping(address => uint256) public ownerPizzaCount;

    // ٹوکن ID سے منظور شدہ پتہ تک میپنگ
    mapping(uint256 => address) pizzaApprovals;

    // آپ میپنگز کو نیسٹ (nest) کر سکتے ہیں، یہ مثال مالک کو آپریٹر کی منظوریوں سے میپ کرتی ہے
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // سٹرنگ (نام) اور DNA سے ایک بے ترتیب (random) پیزا بنانے کے لیے اندرونی فنکشن
    function _createPizza(string memory _name, uint256 _dna)
        // کی ورڈ `internal` کا مطلب ہے کہ یہ فنکشن صرف نظر آتا ہے
        // اس کنٹریکٹ اور ان کنٹریکٹس کے اندر جو اس کنٹریکٹ سے اخذ (derive) کیے گئے ہیں
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

        // نوٹ کریں کہ address(0) زیرو پتہ ہے،
        // جو ظاہر کرتا ہے کہ pizza[id] ابھی تک کسی خاص صارف کو الاٹ نہیں کیا گیا ہے۔

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

    // سٹرنگ (نام) اور مالک (بنانے والے) کے پتہ سے بے ترتیب DNA تیار کرتا ہے
    function generateRandomDna(string memory _str, address _owner)
        public
        // وہ فنکشنز جنہیں `pure` کے طور پر نشان زد کیا گیا ہے، حالت کو نہ پڑھنے اور نہ ہی اس میں ترمیم کرنے کا وعدہ کرتے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // سٹرنگ (نام) + پتہ (مالک) سے بے ترتیب uint تیار کرتا ہے
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // مالک کے ذریعہ پائے جانے والے پیزا کی ایرے واپس کرتا ہے
    function getPizzasByOwner(address _owner)
        public
        // وہ فنکشنز جنہیں `view` کے طور پر نشان زد کیا گیا ہے، حالت میں ترمیم نہ کرنے کا وعدہ کرتے ہیں
        // مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory` سٹوریج لوکیشن کا استعمال کرتا ہے تاکہ ویلیوز کو صرف
        // اس فنکشن کال کے لائف سائیکل کے لیے محفوظ کیا جا سکے۔
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

    // پیزا اور ملکیت کو دوسرے پتہ پر منتقل کرتا ہے
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // امپورٹ کیے گئے IERC721 کنٹریکٹ میں بیان کردہ ایونٹ کو خارج کرتا ہے
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * دیے گئے ٹوکن ID کی ملکیت کو محفوظ طریقے سے دوسرے پتہ پر منتقل کرتا ہے
     * اگر ہدف کا پتہ ایک کنٹریکٹ ہے، تو اسے `onERC721Received` کو لاگو کرنا چاہیے،
     * جسے محفوظ منتقلی پر کال کیا جاتا ہے، اور جادوئی ویلیو (magic value) واپس کرنی چاہیے
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * بصورت دیگر، منتقلی واپس (revert) کر دی جاتی ہے۔
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * دیے گئے ٹوکن ID کی ملکیت کو محفوظ طریقے سے دوسرے پتہ پر منتقل کرتا ہے
     * اگر ہدف کا پتہ ایک کنٹریکٹ ہے، تو اسے `onERC721Received` کو لاگو کرنا چاہیے،
     * جسے محفوظ منتقلی پر کال کیا جاتا ہے، اور جادوئی ویلیو (magic value) واپس کرنی چاہیے
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * بصورت دیگر، منتقلی واپس (revert) کر دی جاتی ہے۔
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
     * ہدف کے پتہ پر `onERC721Received` کو شروع (invoke) کرنے کے لیے اندرونی فنکشن
     * اگر ہدف کا پتہ کنٹریکٹ نہیں ہے تو کال پر عمل نہیں کیا جاتا
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

    // پیزا کو جلاتا (burn) ہے - ٹوکن کو مکمل طور پر تباہ کر دیتا ہے
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

    // پتہ کے لحاظ سے پیزا کی گنتی واپس کرتا ہے
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id کے ذریعہ پائے جانے والے پیزا کا مالک واپس کرتا ہے
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // پیزا کی ملکیت منتقل کرنے کے لیے دوسرے پتہ کو منظور کرتا ہے
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // مخصوص پیزا کے لیے منظور شدہ پتہ واپس کرتا ہے
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * دیے گئے ٹوکن ID کی موجودہ منظوری کو صاف کرنے کے لیے پرائیویٹ فنکشن
     * اگر دیا گیا پتہ واقعی ٹوکن کا مالک نہیں ہے تو واپس (revert) کر دیتا ہے
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
     * ایک آپریٹر کو بھیجنے والے کی جانب سے اس کے تمام ٹوکنز منتقل کرنے کی اجازت ہوتی ہے
     */
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

    // چیک کرتا ہے کہ آیا پتہ مالک ہے یا پیزا منتقل کرنے کے لیے منظور شدہ ہے
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

    // واپس کرتا ہے کہ آیا ہدف کا پتہ ایک کنٹریکٹ ہے
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // فی الحال یہ چیک کرنے کا کوئی بہتر طریقہ نہیں ہے کہ آیا کسی پتہ میں کوئی کنٹریکٹ ہے
        // سوائے اس کے کہ اس پتہ پر کوڈ کا سائز چیک کیا جائے۔
        // دیکھیں https://ethereum.stackexchange.com/a/14016/36603
        // اس بارے میں مزید تفصیلات کے لیے کہ یہ کیسے کام کرتا ہے۔
        // TODO Serenity ریلیز سے پہلے اسے دوبارہ چیک کریں، کیونکہ تب تمام پتے
        // کنٹریکٹس ہوں گے۔
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## مزید مطالعہ {#further-reading}

سمارٹ کنٹریکٹس کے مزید مکمل جائزے کے لیے Solidity اور Vyper کی دستاویزات دیکھیں:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## متعلقہ موضوعات {#related-topics}

- [سمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ایتھیریم ورچوئل مشین (Ethereum Virtual Machine)](/developers/docs/evm/)

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [کنٹریکٹ کے سائز کی حد سے نمٹنے کے لیے کنٹریکٹس کو چھوٹا کرنا](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– آپ کے سمارٹ کنٹریکٹ کا سائز کم کرنے کے لیے کچھ عملی تجاویز۔_
- [ایونٹس کے ساتھ سمارٹ کنٹریکٹس سے ڈیٹا لاگ کرنا](/developers/tutorials/logging-events-smart-contracts/) _– سمارٹ کنٹریکٹ ایونٹس کا تعارف اور آپ انہیں ڈیٹا لاگ کرنے کے لیے کیسے استعمال کر سکتے ہیں۔_
- [Solidity سے دوسرے کنٹریکٹس کے ساتھ تعامل کریں](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– موجودہ کنٹریکٹ سے سمارٹ کنٹریکٹ کو کیسے تعینات کریں اور اس کے ساتھ تعامل کریں۔_