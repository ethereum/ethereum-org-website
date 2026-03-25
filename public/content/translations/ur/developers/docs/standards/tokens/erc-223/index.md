---
title: ERC-223 ٹوکن سٹینڈرڈ
description: ERC-223 فنجیبل ٹوکن سٹینڈرڈ کا جائزہ، یہ کیسے کام کرتا ہے، اور ERC-20 کے ساتھ اس کا موازنہ۔
lang: ur
---

## تعارف {#introduction}

### ERC-223 کیا ہے؟ {#what-is-erc223}

ERC-223 فنجیبل ٹوکنز کے لیے ایک سٹینڈرڈ ہے، جو ERC-20 سٹینڈرڈ سے ملتا جلتا ہے۔ بنیادی فرق یہ ہے کہ ERC-223 نہ صرف ٹوکن API کی وضاحت کرتا ہے بلکہ بھیجنے والے سے وصول کنندہ تک ٹوکنز منتقل کرنے کی لاجک بھی بیان کرتا ہے۔ یہ ایک ایسا کمیونیکیشن ماڈل متعارف کراتا ہے جو ٹوکن کی منتقلی کو وصول کنندہ کی طرف ہینڈل کرنے کی اجازت دیتا ہے۔

### ERC-20 سے اختلافات {#erc20-differences}

ERC-223، ERC-20 کی کچھ خامیوں کو دور کرتا ہے اور ٹوکن کنٹریکٹ اور ٹوکن وصول کرنے والے کنٹریکٹ کے درمیان تعامل کا ایک نیا طریقہ متعارف کراتا ہے۔ کچھ چیزیں ایسی ہیں جو ERC-223 کے ساتھ ممکن ہیں لیکن ERC-20 کے ساتھ نہیں:

- وصول کنندہ کی طرف ٹوکن کی منتقلی کی ہینڈلنگ: وصول کنندگان یہ پتہ لگا سکتے ہیں کہ ایک ERC-223 ٹوکن جمع کیا جا رہا ہے۔
- غلط طریقے سے بھیجے گئے ٹوکنز کو مسترد کرنا: اگر کوئی صارف ERC-223 ٹوکنز کسی ایسے کنٹریکٹ کو بھیجتا ہے جسے ٹوکن وصول نہیں کرنے چاہئیں، تو کنٹریکٹ ٹرانزیکشن کو مسترد کر سکتا ہے، جس سے ٹوکن کے نقصان کو روکا جا سکتا ہے۔
- منتقلی میں میٹا ڈیٹا: ERC-223 ٹوکنز میں میٹا ڈیٹا شامل ہو سکتا ہے، جس سے ٹوکن ٹرانزیکشنز کے ساتھ صوابدیدی معلومات منسلک کی جا سکتی ہیں۔

## پیشگی شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts)
- [سمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن سٹینڈرڈز](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## باڈی {#body}

ERC-223 ایک ٹوکن سٹینڈرڈ ہے جو سمارٹ کنٹریکٹس کے اندر ٹوکنز کے لیے ایک API نافذ کرتا ہے۔ یہ ان کنٹریکٹس کے لیے بھی ایک API کا اعلان کرتا ہے جنہیں ERC-223 ٹوکن وصول کرنے ہوتے ہیں۔ وہ کنٹریکٹس جو ERC-223 ریسیور API کو سپورٹ نہیں کرتے، وہ ERC-223 ٹوکن وصول نہیں کر سکتے، جس سے صارف کی غلطی کو روکا جا سکتا ہے۔

اگر کوئی سمارٹ کنٹریکٹ درج ذیل میتھڈز اور ایونٹس کو نافذ کرتا ہے تو اسے ERC-223 کے موافق ٹوکن کنٹریکٹ کہا جا سکتا ہے۔ ایک بار ڈیپلائے ہونے کے بعد، یہ ایتھیریم پر بنائے گئے ٹوکنز کا ریکارڈ رکھنے کا ذمہ دار ہوگا۔

کنٹریکٹ صرف ان فنکشنز تک محدود رہنے کا پابند نہیں ہے اور ایک ڈویلپر اس کنٹریکٹ میں مختلف ٹوکن سٹینڈرڈز سے کوئی بھی دوسری خصوصیت شامل کر سکتا ہے۔ مثال کے طور پر، `approve` اور `transferFrom` فنکشنز ERC-223 سٹینڈرڈ کا حصہ نہیں ہیں لیکن ضرورت پڑنے پر ان فنکشنز کو نافذ کیا جا سکتا ہے۔

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) سے:

### میتھڈز {#methods}

ERC-223 ٹوکن کو درج ذیل میتھڈز کو نافذ کرنا چاہیے:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint _value) public returns (bool success)
function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success)
```

ایک کنٹریکٹ جسے ERC-223 ٹوکن وصول کرنے ہیں، اسے درج ذیل میتھڈ کو نافذ کرنا چاہیے:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data) public
```

اگر ERC-223 ٹوکنز کسی ایسے کنٹریکٹ کو بھیجے جاتے ہیں جو `tokenReceived(..)` فنکشن کو نافذ نہیں کرتا ہے تو منتقلی ناکام ہونی چاہیے اور ٹوکنز کو بھیجنے والے کے بیلنس سے منتقل نہیں کیا جانا چاہیے۔

### ایونٹس {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes _data)
```

### مثالیں {#examples}

ERC-223 ٹوکن کا API، ERC-20 کے API سے ملتا جلتا ہے، لہذا UI ڈیولپمنٹ کے نقطہ نظر سے کوئی فرق نہیں ہے۔ یہاں واحد استثنیٰ یہ ہے کہ ERC-223 ٹوکنز میں `approve` + `transferFrom` فنکشنز نہیں ہو سکتے کیونکہ یہ اس سٹینڈرڈ کے لیے اختیاری ہیں۔

#### Solidity کی مثالیں {#solidity-example}

درج ذیل مثال واضح کرتی ہے کہ ایک بنیادی ERC-223 ٹوکن کنٹریکٹ کیسے کام کرتا ہے:

```solidity
pragma solidity ^0.8.0;

contract ERC223Token {
    string public name = "Sample Token";
    string public symbol = "SMPL";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * (10 ** uint256(decimals));

    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value, bytes data);

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    // ERC-223 transfer function
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success) {
        require(balances[msg.sender] >= _value, "Insufficient balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;

        if (isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }

        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }

    // Standard ERC-20 transfer function
    function transfer(address _to, uint _value) public returns (bool success) {
        bytes memory emptyData;
        return transfer(_to, _value, emptyData);
    }

    function isContract(address _addr) private view returns (bool) {
        uint256 length;
        assembly {
            length := extcodesize(_addr)
        }
        return (length > 0);
    }
}

interface IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes calldata _data) external;
}
```

اب ہم چاہتے ہیں کہ ایک اور کنٹریکٹ `tokenA` کے ڈپازٹس کو قبول کرے، یہ فرض کرتے ہوئے کہ tokenA ایک ERC-223 ٹوکن ہے۔ کنٹریکٹ کو صرف tokenA قبول کرنا چاہیے اور کسی بھی دوسرے ٹوکن کو مسترد کرنا چاہیے۔ جب کنٹریکٹ tokenA وصول کرتا ہے تو اسے ایک `Deposit()` ایونٹ خارج کرنا چاہیے اور اندرونی `deposits` ویری ایبل کی قدر میں اضافہ کرنا چاہیے۔

کوڈ یہ ہے:

```solidity
pragma solidity ^0.8.0;

contract RecipientContract {
    address public tokenA; // Address of the ERC-223 token contract
    uint256 public deposits;

    event Deposit(address indexed from, uint256 value);

    constructor(address _tokenA) {
        tokenA = _tokenA;
    }

    function tokenReceived(address _from, uint _value, bytes calldata _data) external {
        require(msg.sender == tokenA, "Only tokenA is accepted");
        deposits += _value;
        emit Deposit(_from, _value);
    }
}
```

## اکثر پوچھے گئے سوالات {#faq}

### اگر ہم کنٹریکٹ کو کچھ tokenB بھیجیں تو کیا ہوگا؟ {#sending-tokens}

ٹرانزیکشن ناکام ہو جائے گی، اور ٹوکنز کی منتقلی نہیں ہوگی۔ ٹوکنز بھیجنے والے کے ایڈریس پر واپس کر دیے جائیں گے۔

### ہم اس کنٹریکٹ میں ڈپازٹ کیسے کر سکتے ہیں؟ {#contract-deposits}

`RecipientContract` کا ایڈریس بتاتے ہوئے، ERC-223 ٹوکن کے `transfer(address,uint256)` یا `transfer(address,uint256,bytes)` فنکشن کو کال کریں۔

### اگر ہم اس کنٹریکٹ میں ERC-20 ٹوکن منتقل کریں تو کیا ہوگا؟ {#erc-20-transfers}

اگر کوئی ERC-20 ٹوکن `RecipientContract` کو بھیجا جاتا ہے، تو ٹوکنز منتقل ہو جائیں گے، لیکن منتقلی کو تسلیم نہیں کیا جائے گا (کوئی `Deposit()` ایونٹ فائر نہیں ہوگا، اور ڈپازٹس کی قدر تبدیل نہیں ہوگی)۔ ناپسندیدہ ERC-20 ڈپازٹس کو فلٹر یا روکا نہیں جا سکتا۔

### اگر ہم ٹوکن ڈپازٹ مکمل ہونے کے بعد کوئی فنکشن چلانا چاہیں تو کیا ہوگا؟ {#function-execution}

ایسا کرنے کے کئی طریقے ہیں۔ اس مثال میں ہم اس طریقے پر عمل کریں گے جو ERC-223 کی منتقلی کو ایتھر کی منتقلی کے بالکل مماثل بناتا ہے:

```solidity
pragma solidity ^0.8.0;

contract RecipientContract {
    address public tokenA; // Address of the ERC-223 token contract
    uint256 public deposits;

    event Deposit(address indexed from, uint256 value);
    event Foo();
    event Bar(uint256 _someNumber);

    constructor(address _tokenA) {
        tokenA = _tokenA;
    }

    function tokenReceived(address _from, uint _value, bytes calldata _data) external {
        require(msg.sender == tokenA, "Only tokenA is accepted");
        deposits += _value;
        emit Deposit(_from, _value);

        // Execute the function encoded in the _data parameter
        (bool success, ) = address(this).delegatecall(_data);
        require(success, "Function execution failed");
    }

    function foo() public {
        emit Foo();
    }

    function bar(uint256 _someNumber) public {
        emit Bar(_someNumber);
    }
}
```

جب `RecipientContract` ایک ERC-223 ٹوکن وصول کرے گا تو کنٹریکٹ ٹوکن ٹرانزیکشن کے `_data` پیرامیٹر کے طور پر انکوڈ شدہ ایک فنکشن کو چلائے گا، بالکل اسی طرح جیسے ایتھر ٹرانزیکشنز فنکشن کالز کو ٹرانزیکشن `data` کے طور پر انکوڈ کرتی ہیں۔ مزید معلومات کے لیے [ڈیٹا فیلڈ](/developers/docs/transactions/#the-data-field) پڑھیں۔

مندرجہ بالا مثال میں ایک ERC-223 ٹوکن کو `transfer(address,uin256,bytes calldata _data)` فنکشن کے ساتھ `RecipientContract` کے ایڈریس پر منتقل کیا جانا چاہیے۔ اگر ڈیٹا پیرامیٹر `0xc2985578` (ایک `foo()` فنکشن کا سگنیچر) ہوگا تو ٹوکن ڈپازٹ موصول ہونے کے بعد فنکشن foo() کو کال کیا جائے گا اور ایونٹ Foo() فائر ہوگا۔

پیرامیٹرز کو ٹوکن کی منتقلی کے `data` میں بھی انکوڈ کیا جا سکتا ہے، مثال کے طور پر ہم `_someNumber` کے لیے 12345 ویلیو کے ساتھ bar() فنکشن کو کال کر سکتے ہیں۔ اس صورت میں `data` کا `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ہونا ضروری ہے جہاں `0x0423a132`، `bar(uint256)` فنکشن کا سگنیچر ہے اور `00000000000000000000000000000000000000000000000000000000000004d2` بطور uint256، 12345 ہے۔

## حدود {#limitations}

اگرچہ ERC-223، ERC-20 سٹینڈرڈ میں پائے جانے والے کئی مسائل کو حل کرتا ہے، لیکن یہ اپنی حدود سے خالی نہیں ہے:

- اپنانا اور مطابقت: ERC-223 کو ابھی تک وسیع پیمانے پر نہیں اپنایا گیا ہے، جو موجودہ ٹولز اور پلیٹ فارمز کے ساتھ اس کی مطابقت کو محدود کر سکتا ہے۔
- بیک ورڈ مطابقت: ERC-223، ERC-20 کے ساتھ بیک ورڈ مطابقت نہیں رکھتا، جس کا مطلب ہے کہ موجودہ ERC-20 کنٹریکٹس اور ٹولز بغیر کسی ترمیم کے ERC-223 ٹوکنز کے ساتھ کام نہیں کریں گے۔
- گیس کی لاگت: ERC-223 کی منتقلی میں اضافی چیکس اور فنکشنلٹیز کے نتیجے میں ERC-20 ٹرانزیکشنز کے مقابلے میں گیس کی لاگت زیادہ ہو سکتی ہے۔

## مزید مطالعہ {#further-reading}

- [EIP-223: ERC-223 ٹوکن سٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-223)
- [ابتدائی ERC-223 تجویز](https://github.com/ethereum/eips/issues/223)