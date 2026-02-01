---
title: ERC-223 ٹوکن کا معیار
description: ERC-223 فنجیبل ٹوکن کے معیار کا ایک جائزہ، یہ کیسے کام کرتا ہے، اور ERC-20 سے اس کا موازنہ۔
lang: ur-in
---

## تعارف {#introduction}

### ERC-223 کیا ہے؟ {#what-is-erc223}

ERC-223 فنجیبل ٹوکنز کا ایک معیار ہے، جو ERC-20 معیار کی طرح ہے۔ کلیدی فرق یہ ہے کہ ERC-223 نہ صرف ٹوکن API کی وضاحت کرتا ہے بلکہ بھیجنے والے سے وصول کنندہ تک ٹوکن منتقل کرنے کی منطق کی بھی وضاحت کرتا ہے۔ یہ ایک کمیونیکیشن ماڈل پیش کرتا ہے جو وصول کنندہ کی طرف سے ٹوکن کی منتقلی کو سنبھالنے کی اجازت دیتا ہے۔

### ERC-20 سے فرق {#erc20-differences}

ERC-223, ERC-20 کی کچھ حدود کو دور کرتا ہے اور ٹوکن کنٹریکٹ اور ایک ایسے کنٹریکٹ کے درمیان تعامل کا ایک نیا طریقہ متعارف کراتا ہے جو ٹوکن وصول کر سکتا ہے۔ کچھ چیزیں ہیں جو ERC-223 کے ساتھ ممکن ہیں لیکن ERC-20 کے ساتھ نہیں:

- وصول کنندہ کی طرف سے ٹوکن کی منتقلی کو سنبھالنا: وصول کنندگان یہ پتہ لگا سکتے ہیں کہ ایک ERC-223 ٹوکن جمع کیا جا رہا ہے۔
- غلط طریقے سے بھیجے گئے ٹوکنز کو مسترد کرنا: اگر کوئی صارف ERC-223 ٹوکنز کو ایک ایسے کنٹریکٹ میں بھیجتا ہے جسے ٹوکنز وصول نہیں کرنے چاہئیں، تو کنٹریکٹ ٹرانزیکشن کو مسترد کر سکتا ہے، جس سے ٹوکن کا نقصان رک جاتا ہے۔
- منتقلی میں میٹا ڈیٹا: ERC-223 ٹوکنز میں میٹا ڈیٹا شامل ہو سکتا ہے، جس سے ٹوکن ٹرانزیکشنز کے ساتھ من مانی معلومات منسلک کی جا سکتی ہیں۔

## شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts)
- [اسمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن معیارات](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## باڈی {#body}

ERC-223 ایک ٹوکن معیار ہے جو سمارٹ کنٹریکٹس کے اندر ٹوکنز کے لیے ایک API نافذ کرتا ہے۔ یہ ان کنٹریکٹس کے لیے بھی ایک API کا اعلان کرتا ہے جنہیں ERC-223 ٹوکنز وصول کرنے ہوتے ہیں۔ وہ کنٹریکٹس جو ERC-223 رسیور API کو سپورٹ نہیں کرتے ہیں، وہ ERC-223 ٹوکنز وصول نہیں کر سکتے، جس سے صارف کی غلطی کو روکا جا سکتا ہے۔

اگر کوئی سمارٹ کنٹریکٹ مندرجہ ذیل طریقوں اور ایونٹس کو نافذ کرتا ہے تو اسے ERC-223 ہم آہنگ ٹوکن کنٹریکٹ کہا جا سکتا ہے۔ ایک بار تعینات ہونے کے بعد،
یہ Ethereum پر بنائے گئے ٹوکنز کا ٹریک رکھنے کا ذمہ دار ہوگا۔

کنٹریکٹ صرف ان فنکشنز کو رکھنے کا پابند نہیں ہے اور ایک ڈویلپر مختلف ٹوکن معیارات سے کوئی دوسری خصوصیت اس کنٹریکٹ میں شامل کر سکتا ہے۔ مثال کے طور پر، `approve` اور `transferFrom` فنکشنز ERC-223 معیار کا حصہ نہیں ہیں لیکن ضرورت پڑنے پر ان فنکشنز کو نافذ کیا جا سکتا ہے۔

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) سے:

### طریقے {#methods}

ERC-223 ٹوکن کو مندرجہ ذیل طریقوں کو نافذ کرنا ہوگا:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ایک کنٹریکٹ جسے ERC-223 ٹوکنز وصول کرنے ہیں، اسے مندرجہ ذیل طریقہ کو نافذ کرنا ہوگا:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

اگر ERC-223 ٹوکنز کو ایک ایسے کنٹریکٹ میں بھیجا جاتا ہے جو `tokenReceived(..)` فنکشن کو نافذ نہیں کرتا ہے، تو منتقلی ناکام ہونی چاہئے اور ٹوکنز کو بھیجنے والے کے بیلنس سے منتقل نہیں کیا جانا چاہئے۔

### ایونٹس {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### مثالیں {#examples}

ERC-223 ٹوکن کا API، ERC-20 کے API کی طرح ہے، لہذا UI ڈویلپمنٹ کے نقطہ نظر سے کوئی فرق نہیں ہے۔ یہاں واحد استثناء یہ ہے کہ ERC-223 ٹوکنز میں `approve` + `transferFrom` فنکشنز نہیں ہو سکتے ہیں کیونکہ یہ اس معیار کے لیے اختیاری ہیں۔

#### Solidity کی مثالیں {#solidity-example}

مندرجہ ذیل مثال واضح کرتی ہے کہ ایک بنیادی ERC-223 ٹوکن کنٹریکٹ کیسے کام کرتا ہے:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

اب ہم چاہتے ہیں کہ ایک اور کنٹریکٹ `tokenA` کے ڈپازٹس کو قبول کرے، یہ فرض کرتے ہوئے کہ tokenA ایک ERC-223 ٹوکن ہے۔ کنٹریکٹ کو صرف tokenA کو قبول کرنا چاہئے اور کسی بھی دوسرے ٹوکن کو مسترد کرنا چاہئے۔ جب کنٹریکٹ کو tokenA موصول ہوتا ہے تو اسے ایک `Deposit()` ایونٹ جاری کرنا چاہئے اور اندرونی `deposits` متغیر کی قدر میں اضافہ کرنا چاہئے۔

یہاں کوڈ ہے:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // واحد ٹوکن جسے ہم قبول کرنا چاہتے ہیں۔
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // یہ سمجھنا ضروری ہے کہ اس فنکشن کے اندر
        // msg.sender موصول ہونے والے ٹوکن کا پتہ ہے،
        // msg.value ہمیشہ 0 ہوتا ہے کیونکہ ٹوکن کنٹریکٹ زیادہ تر معاملات میں ایتھر کا مالک نہیں ہوتا یا بھیجتا نہیں ہے،
        // _from ٹوکن کی منتقلی کا بھیجنے والا ہے،
        // _value جمع کیے گئے ٹوکنز کی رقم ہے۔
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## اکثر پوچھے جانے والے سوالات {#faq}

### اگر ہم کچھ tokenB کنٹریکٹ کو بھیجیں تو کیا ہوگا؟ {#sending-tokens}

ٹرانزیکشن ناکام ہو جائے گی، اور ٹوکنز کی منتقلی نہیں ہوگی۔ ٹوکنز بھیجنے والے کے پتے پر واپس کر دیے جائیں گے۔

### ہم اس کنٹریکٹ میں ڈپازٹ کیسے کر سکتے ہیں؟ {#contract-deposits}

ERC-223 ٹوکن کے `transfer(address,uint256)` یا `transfer(address,uint256,bytes)` فنکشن کو `RecipientContract` کا پتہ بتا کر کال کریں۔

### اگر ہم اس کنٹریکٹ میں ERC-20 ٹوکن منتقل کریں تو کیا ہوگا؟ {#erc-20-transfers}

اگر ایک ERC-20 ٹوکن `RecipientContract` کو بھیجا جاتا ہے، تو ٹوکنز منتقل ہو جائیں گے، لیکن منتقلی کو تسلیم نہیں کیا جائے گا (کوئی `Deposit()` ایونٹ فائر نہیں ہوگا، اور ڈپازٹس کی قدر تبدیل نہیں ہوگی)۔ ناپسندیدہ ERC-20 ڈپازٹس کو فلٹر یا روکا نہیں جا سکتا۔

### اگر ہم ٹوکن ڈپازٹ مکمل ہونے کے بعد کوئی فنکشن عمل میں لانا چاہتے ہیں تو کیا ہوگا؟ {#function-execution}

ایسا کرنے کے کئی طریقے ہیں۔ اس مثال میں ہم اس طریقے پر عمل کریں گے جو ERC-223 کی منتقلی کو ایتھر کی منتقلی کے مترادف بناتا ہے:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // واحد ٹوکن جسے ہم قبول کرنا چاہتے ہیں۔
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // آنے والی ٹرانزیکشن کو ہینڈل کریں اور بعد میں ایک فنکشن کال کریں۔
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

جب `RecipientContract` کو ایک ERC-223 ٹوکن موصول ہوگا تو کنٹریکٹ ٹوکن ٹرانزیکشن کے `_data` پیرامیٹر کے طور پر انکوڈ کردہ ایک فنکشن کو عمل میں لائے گا، بالکل اسی طرح جیسے ایتھر ٹرانزیکشنز فنکشن کالز کو ٹرانزیکشن `data` کے طور پر انکوڈ کرتی ہیں۔ مزید معلومات کے لیے [ڈیٹا فیلڈ](/developers/docs/transactions/#the-data-field) پڑھیں۔

اوپر دی گئی مثال میں، ایک ERC-223 ٹوکن کو `transfer(address,uin256,bytes calldata _data)` فنکشن کے ساتھ `RecipientContract` کے پتے پر منتقل کیا جانا چاہئے۔ اگر ڈیٹا پیرامیٹر `0xc2985578` (`foo()` فنکشن کا دستخط) ہوگا، تو ٹوکن ڈپازٹ موصول ہونے کے بعد foo() فنکشن کو طلب کیا جائے گا اور Foo() ایونٹ فائر ہو جائے گا۔

پیرامیٹرز کو ٹوکن کی منتقلی کے `data` میں بھی انکوڈ کیا جا سکتا ہے، مثال کے طور پر ہم `_someNumber` کے لیے 12345 کی قدر کے ساتھ bar() فنکشن کو کال کر سکتے ہیں۔ اس صورت میں `data` کو `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ہونا چاہئے جہاں `0x0423a132` `bar(uint256)` فنکشن کا دستخط ہے اور `00000000000000000000000000000000000000000000000000000000000004d2` بطور uint256 کے 12345 ہے۔

## حدود {#limitations}

اگرچہ ERC-223, ERC-20 معیار میں پائے جانے والے کئی مسائل کو حل کرتا ہے، یہ اپنی حدود سے خالی نہیں ہے:

- اختیار اور مطابقت: ERC-223 کو ابھی تک وسیع پیمانے پر اپنایا نہیں گیا ہے، جو موجودہ ٹولز اور پلیٹ فارمز کے ساتھ اس کی مطابقت کو محدود کر سکتا ہے۔
- پسماندہ مطابقت: ERC-223, ERC-20 کے ساتھ پسماندہ مطابقت نہیں رکھتا، جس کا مطلب ہے کہ موجودہ ERC-20 کنٹریکٹس اور ٹولز بغیر کسی ترمیم کے ERC-223 ٹوکنز کے ساتھ کام نہیں کریں گے۔
- گیس کی لاگت: ERC-223 کی منتقلی میں اضافی جانچ اور افعال ERC-20 ٹرانزیکشنز کے مقابلے میں گیس کی زیادہ لاگت کا باعث بن سکتے ہیں۔

## مزید پڑھیں {#further-reading}

- [EIP-223: ERC-223 ٹوکن کا معیار](https://eips.ethereum.org/EIPS/eip-223)
- [ابتدائی ERC-223 تجویز](https://github.com/ethereum/eips/issues/223)
