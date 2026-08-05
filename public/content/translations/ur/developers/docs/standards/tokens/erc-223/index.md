---
title: "⁦ERC-223⁩ ٹوکن سٹینڈرڈ"
description: "⁦ERC-223⁩ فنجیبل ٹوکن سٹینڈرڈ کا جائزہ، یہ کیسے کام کرتا ہے، اور ⁦ERC-20⁩ سے اس کا موازنہ۔"
lang: ur
---

## تعارف {#introduction}

### <span dir="ltr">ERC-223</span> کیا ہے؟ {#what-is-erc223}

<span dir="ltr">ERC-223</span> فنجیبل ٹوکنز کے لیے ایک سٹینڈرڈ ہے، جو <span dir="ltr">ERC-20</span> سٹینڈرڈ سے ملتا جلتا ہے۔ بنیادی فرق یہ ہے کہ <span dir="ltr">ERC-223</span> نہ صرف ٹوکن <span dir="ltr">API</span> کی وضاحت کرتا ہے بلکہ بھیجنے والے سے وصول کنندہ تک ٹوکنز کی منتقلی کی منطق (logic) بھی بیان کرتا ہے۔ یہ ایک ایسا کمیونیکیشن ماڈل متعارف کراتا ہے جو ٹوکن کی منتقلی کو وصول کنندہ کی طرف سے ہینڈل کرنے کی اجازت دیتا ہے۔

### <span dir="ltr">ERC-20</span> سے اختلافات {#erc20-differences}

<span dir="ltr">ERC-223</span>، <span dir="ltr">ERC-20</span> کی کچھ خامیوں کو دور کرتا ہے اور ٹوکن کنٹریکٹ اور ٹوکن وصول کرنے والے کنٹریکٹ کے درمیان تعامل (interaction) کا ایک نیا طریقہ متعارف کراتا ہے۔ کچھ چیزیں ایسی ہیں جو <span dir="ltr">ERC-223</span> کے ساتھ ممکن ہیں لیکن <span dir="ltr">ERC-20</span> کے ساتھ نہیں:

- وصول کنندہ کی طرف سے ٹوکن کی منتقلی کی ہینڈلنگ: وصول کنندگان یہ پتہ لگا سکتے ہیں کہ ایک <span dir="ltr">ERC-223</span> ٹوکن جمع کیا جا رہا ہے۔
- غلط طریقے سے بھیجے گئے ٹوکنز کو مسترد کرنا: اگر کوئی صارف <span dir="ltr">ERC-223</span> ٹوکنز کسی ایسے کنٹریکٹ کو بھیجتا ہے جسے ٹوکن وصول نہیں کرنے چاہئیں، تو کنٹریکٹ ٹرانزیکشن کو مسترد کر سکتا ہے، جس سے ٹوکن کے نقصان کو روکا جا سکتا ہے۔
- منتقلی میں میٹا ڈیٹا: <span dir="ltr">ERC-223</span> ٹوکنز میں میٹا ڈیٹا شامل ہو سکتا ہے، جس سے ٹوکن ٹرانزیکشنز کے ساتھ صوابدیدی (arbitrary) معلومات منسلک کی جا سکتی ہیں۔

## پیشگی شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts)
- [سمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن سٹینڈرڈز](/developers/docs/standards/tokens/)
- [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)

## متن {#body}

<span dir="ltr">ERC-223</span> ایک ٹوکن سٹینڈرڈ ہے جو سمارٹ کنٹریکٹس کے اندر ٹوکنز کے لیے ایک <span dir="ltr">API</span> نافذ کرتا ہے۔ یہ ان کنٹریکٹس کے لیے بھی ایک <span dir="ltr">API</span> کا اعلان کرتا ہے جنہیں <span dir="ltr">ERC-223</span> ٹوکن وصول کرنے ہوتے ہیں۔ وہ کنٹریکٹس جو <span dir="ltr">ERC-223</span> ریسیور <span dir="ltr">API</span> کو سپورٹ نہیں کرتے، وہ <span dir="ltr">ERC-223</span> ٹوکن وصول نہیں کر سکتے، جس سے صارف کی غلطی کو روکا جا سکتا ہے۔

اگر کوئی سمارٹ کنٹریکٹ درج ذیل طریقوں (methods) اور ایونٹس کو نافذ کرتا ہے تو اسے <span dir="ltr">ERC-223</span> سے مطابقت رکھنے والا ٹوکن کنٹریکٹ کہا جا سکتا ہے۔ ایک بار تعینات (deploy) ہونے کے بعد، یہ ایتھیریم پر بنائے گئے ٹوکنز کا ریکارڈ رکھنے کا ذمہ دار ہوگا۔

کنٹریکٹ صرف ان فنکشنز تک محدود رہنے کا پابند نہیں ہے اور ایک ڈویلپر اس کنٹریکٹ میں مختلف ٹوکن سٹینڈرڈز سے کوئی بھی دوسری خصوصیت شامل کر سکتا ہے۔ مثال کے طور پر، `approve` اور `transferFrom` فنکشنز <span dir="ltr">ERC-223</span> سٹینڈرڈ کا حصہ نہیں ہیں لیکن ضرورت پڑنے پر ان فنکشنز کو نافذ کیا جا سکتا ہے۔

[<span dir="ltr">EIP-223</span>](https://eips.ethereum.org/EIPS/eip-223) سے:

### طریقے (Methods) {#methods}

<span dir="ltr">ERC-223</span> ٹوکن کو درج ذیل طریقوں کو نافذ کرنا چاہیے:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ایک کنٹریکٹ جسے <span dir="ltr">ERC-223</span> ٹوکن وصول کرنے ہیں، اسے درج ذیل طریقہ نافذ کرنا چاہیے:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

اگر <span dir="ltr">ERC-223</span> ٹوکنز کسی ایسے کنٹریکٹ کو بھیجے جاتے ہیں جو `tokenReceived(..)` فنکشن کو نافذ نہیں کرتا ہے تو منتقلی ناکام ہونی چاہیے اور ٹوکنز کو بھیجنے والے کے بیلنس سے منتقل نہیں کیا جانا چاہیے۔

### ایونٹس {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### مثالیں {#examples}

<span dir="ltr">ERC-223</span> ٹوکن کی <span dir="ltr">API</span>، <span dir="ltr">ERC-20</span> کی طرح ہی ہے، لہذا <span dir="ltr">UI</span> ڈیولپمنٹ کے نقطہ نظر سے کوئی فرق نہیں ہے۔ یہاں واحد استثنا یہ ہے کہ <span dir="ltr">ERC-223</span> ٹوکنز میں `approve` + `transferFrom` فنکشنز نہیں ہو سکتے کیونکہ یہ اس سٹینڈرڈ کے لیے اختیاری ہیں۔

#### <span dir="ltr">Solidity</span> کی مثالیں {#solidity-example}

درج ذیل مثال واضح کرتی ہے کہ ایک بنیادی <span dir="ltr">ERC-223</span> ٹوکن کنٹریکٹ کیسے کام کرتا ہے:

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

اب ہم چاہتے ہیں کہ ایک اور کنٹریکٹ `tokenA` کے ڈپازٹس کو قبول کرے، یہ فرض کرتے ہوئے کہ <span dir="ltr">tokenA</span> ایک <span dir="ltr">ERC-223</span> ٹوکن ہے۔ کنٹریکٹ کو صرف <span dir="ltr">tokenA</span> قبول کرنا چاہیے اور کسی بھی دوسرے ٹوکن کو مسترد کرنا چاہیے۔ جب کنٹریکٹ <span dir="ltr">tokenA</span> وصول کرتا ہے تو اسے ایک `Deposit()` ایونٹ خارج (emit) کرنا چاہیے اور اندرونی `deposits` متغیر (variable) کی قدر میں اضافہ کرنا چاہیے۔

یہاں کوڈ ہے:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // واحد ٹوکن جسے ہم قبول کرنا چاہتے ہیں۔
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // یہ سمجھنا ضروری ہے کہ اس فنکشن کے اندر
        // msg.sender اس ٹوکن کا پتہ ہے جو موصول ہو رہا ہے،
        // msg.value ہمیشہ 0 ہوتا ہے کیونکہ زیادہ تر معاملات میں ٹوکن کنٹریکٹ ایتھر کا مالک نہیں ہوتا یا اسے نہیں بھیجتا،
        // _from ٹوکن کی منتقلی کا بھیجنے والا ہے،
        // _value ٹوکنز کی وہ مقدار ہے جو جمع کی گئی تھی۔
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## اکثر پوچھے گئے سوالات {#faq}

### اگر ہم کنٹریکٹ کو کچھ <span dir="ltr">tokenB</span> بھیجیں تو کیا ہوگا؟ {#sending-tokens}

ٹرانزیکشن ناکام ہو جائے گی، اور ٹوکنز کی منتقلی نہیں ہوگی۔ ٹوکنز بھیجنے والے کے پتہ پر واپس کر دیے جائیں گے۔

### ہم اس کنٹریکٹ میں ڈپازٹ کیسے کر سکتے ہیں؟ {#contract-deposits}

<span dir="ltr">ERC-223</span> ٹوکن کے `transfer(address,uint256)` یا `transfer(address,uint256,bytes)` فنکشن کو کال کریں، اور `RecipientContract` کا پتہ بتائیں۔

### اگر ہم اس کنٹریکٹ میں <span dir="ltr">ERC-20</span> ٹوکن منتقل کریں تو کیا ہوگا؟ {#erc-20-transfers}

اگر کوئی <span dir="ltr">ERC-20</span> ٹوکن `RecipientContract` کو بھیجا جاتا ہے، تو ٹوکنز منتقل ہو جائیں گے، لیکن منتقلی کو تسلیم نہیں کیا جائے گا (کوئی `Deposit()` ایونٹ فائر نہیں ہوگا، اور ڈپازٹس کی قدر تبدیل نہیں ہوگی)۔ ناپسندیدہ <span dir="ltr">ERC-20</span> ڈپازٹس کو فلٹر یا روکا نہیں جا سکتا۔

### اگر ہم ٹوکن ڈپازٹ مکمل ہونے کے بعد کوئی فنکشن چلانا چاہیں تو کیا ہوگا؟ {#function-execution}

ایسا کرنے کے کئی طریقے ہیں۔ اس مثال میں ہم اس طریقے پر عمل کریں گے جو <span dir="ltr">ERC-223</span> کی منتقلی کو ایتھر کی منتقلی کے بالکل مماثل بناتا ہے:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // واحد ٹوکن جسے ہم قبول کرنا چاہتے ہیں۔
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // آنے والی ٹرانزیکشن کو ہینڈل کریں اور اس کے بعد فنکشن کال کریں۔
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

جب `RecipientContract` ایک <span dir="ltr">ERC-223</span> ٹوکن وصول کرے گا تو کنٹریکٹ ٹوکن ٹرانزیکشن کے `_data` پیرامیٹر کے طور پر انکوڈ شدہ فنکشن کو چلائے گا، بالکل اسی طرح جیسے ایتھر ٹرانزیکشنز فنکشن کالز کو ٹرانزیکشن `data` کے طور پر انکوڈ کرتی ہیں۔ مزید معلومات کے لیے [ڈیٹا فیلڈ](/developers/docs/transactions/#the-data-field) پڑھیں۔

مندرجہ بالا مثال میں ایک <span dir="ltr">ERC-223</span> ٹوکن کو `transfer(address,uin256,bytes calldata _data)` فنکشن کے ساتھ `RecipientContract` کے پتہ پر منتقل کیا جانا چاہیے۔ اگر ڈیٹا پیرامیٹر `0xc2985578` (ایک `foo()` فنکشن کا دستخط) ہوگا تو ٹوکن ڈپازٹ وصول ہونے کے بعد فنکشن <span dir="ltr">foo()</span> کو کال کیا جائے گا اور ایونٹ <span dir="ltr">Foo()</span> فائر ہوگا۔

پیرامیٹرز کو ٹوکن کی منتقلی کے `data` میں بھی انکوڈ کیا جا سکتا ہے، مثال کے طور پر ہم `_someNumber` کے لیے <span dir="ltr">12345</span> کی قدر کے ساتھ <span dir="ltr">bar()</span> فنکشن کو کال کر سکتے ہیں۔ اس صورت میں `data` کو `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ہونا چاہیے جہاں `0x0423a132`، `bar(uint256)` فنکشن کا دستخط ہے اور `00000000000000000000000000000000000000000000000000000000000004d2`، <span dir="ltr">uint256</span> کے طور پر <span dir="ltr">12345</span> ہے۔

## حدود {#limitations}

اگرچہ <span dir="ltr">ERC-223</span>، <span dir="ltr">ERC-20</span> سٹینڈرڈ میں پائے جانے والے کئی مسائل کو حل کرتا ہے، لیکن یہ اپنی حدود سے خالی نہیں ہے:

- اپنانا اور مطابقت: <span dir="ltr">ERC-223</span> کو ابھی تک وسیع پیمانے پر نہیں اپنایا گیا ہے، جو موجودہ ٹولز اور پلیٹ فارمز کے ساتھ اس کی مطابقت کو محدود کر سکتا ہے۔
- بیک ورڈ مطابقت: <span dir="ltr">ERC-223</span>، <span dir="ltr">ERC-20</span> کے ساتھ بیک ورڈ مطابقت نہیں رکھتا، جس کا مطلب ہے کہ موجودہ <span dir="ltr">ERC-20</span> کنٹریکٹس اور ٹولز بغیر کسی ترمیم کے <span dir="ltr">ERC-223</span> ٹوکنز کے ساتھ کام نہیں کریں گے۔
- گیس کی لاگت: <span dir="ltr">ERC-223</span> کی منتقلی میں اضافی چیکس اور فنکشنلٹیز کے نتیجے میں <span dir="ltr">ERC-20</span> ٹرانزیکشنز کے مقابلے میں گیس کی لاگت زیادہ ہو سکتی ہے۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-223</span>: <span dir="ltr">ERC-223</span> ٹوکن سٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-223)
- [ابتدائی <span dir="ltr">ERC-223</span> تجویز](https://github.com/ethereum/eips/issues/223)