---
title: "⁦Solidity⁩ سمارٹ کنٹریکٹ سے ⁦ERC-20⁩ ٹوکنز کی منتقلی اور منظوری"
description: "ایک ⁦DEX⁩ سمارٹ کنٹریکٹ بنائیں جو ⁦Solidity⁩ کا استعمال کرتے ہوئے ⁦ERC-20⁩ ٹوکن کی منتقلی اور منظوریوں کو سنبھالتا ہو۔"
author: jdourlens
tags:
  - سمارٹ کنٹریکٹس
  - ٹوکنز
  - solidity
  - erc-20
skill: intermediate
breadcrumb: "⁦ERC-20⁩ کی منتقلی"
lang: ur
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

پچھلے ٹیوٹوریل میں ہم نے ایتھیریم بلاک چین پر [<span dir="ltr">Solidity</span> میں <span dir="ltr">ERC-20</span> ٹوکن کی ساخت](/developers/tutorials/understand-the-erc-20-token-smart-contract/) کا مطالعہ کیا تھا۔ اس مضمون میں ہم دیکھیں گے کہ ہم <span dir="ltr">Solidity</span> زبان کا استعمال کرتے ہوئے کسی ٹوکن کے ساتھ تعامل کرنے کے لیے سمارٹ کنٹریکٹ کا استعمال کیسے کر سکتے ہیں۔

اس سمارٹ کنٹریکٹ کے لیے، ہم ایک حقیقی ڈمی لامركزی ایکسچینج (<span dir="ltr">DEX</span>) بنائیں گے جہاں صارف ہمارے نئے تعینات کردہ [<span dir="ltr">ERC-20</span> ٹوکن](/developers/docs/standards/tokens/erc-20/) کے بدلے ایتھر کا تبادلہ کر سکتا ہے۔

اس ٹیوٹوریل کے لیے ہم اس کوڈ کو بنیاد کے طور پر استعمال کریں گے جو ہم نے پچھلے ٹیوٹوریل میں لکھا تھا۔ ہمارا <span dir="ltr">DEX</span> اپنے کنسٹرکٹر میں کنٹریکٹ کی ایک مثال (instance) بنائے گا اور درج ذیل کام انجام دے گا:

- ٹوکنز کا ایتھر سے تبادلہ
- ایتھر کا ٹوکنز سے تبادلہ

ہم اپنا سادہ <span dir="ltr">ERC20</span> کوڈ بیس شامل کر کے اپنے لامركزی ایکسچینج کوڈ کا آغاز کریں گے:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

ہمارا نیا <span dir="ltr">DEX</span> سمارٹ کنٹریکٹ <span dir="ltr">ERC-20</span> کو تعینات کرے گا اور فراہم کردہ تمام سپلائی حاصل کرے گا:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

تو اب ہمارے پاس اپنا <span dir="ltr">DEX</span> ہے اور اس میں تمام ٹوکن ریزرو دستیاب ہیں۔ کنٹریکٹ کے دو فنکشنز ہیں:

- `buy`: صارف ایتھر بھیج سکتا ہے اور بدلے میں ٹوکن حاصل کر سکتا ہے
- `sell`: صارف ایتھر واپس حاصل کرنے کے لیے ٹوکن بھیجنے کا فیصلہ کر سکتا ہے

## <span dir="ltr">buy</span> فنکشن {#the-buy-function}

آئیے <span dir="ltr">buy</span> فنکشن کو کوڈ کریں۔ ہمیں سب سے پہلے پیغام میں موجود ایتھر کی مقدار کو چیک کرنے کی ضرورت ہوگی اور اس بات کی تصدیق کرنی ہوگی کہ کنٹریکٹ کے پاس کافی ٹوکنز ہیں اور پیغام میں کچھ ایتھر موجود ہے۔ اگر کنٹریکٹ کے پاس کافی ٹوکنز ہیں تو یہ صارف کو ٹوکنز کی تعداد بھیجے گا اور `Bought` ایونٹ خارج (emit) کرے گا۔

نوٹ کریں کہ اگر ہم کسی خرابی کی صورت میں تقاضا (require) فنکشن کو کال کرتے ہیں تو بھیجا گیا ایتھر براہ راست واپس (revert) ہو جائے گا اور صارف کو واپس دے دیا جائے گا۔

چیزوں کو سادہ رکھنے کے لیے، ہم صرف <span dir="ltr">1</span> ٹوکن کا <span dir="ltr">1 Wei</span> سے تبادلہ کرتے ہیں۔

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

اس صورت میں جہاں خریداری کامیاب ہو جاتی ہے، ہمیں ٹرانزیکشن میں دو ایونٹس دیکھنے چاہئیں: ٹوکن `Transfer` اور `Bought` ایونٹ۔

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## <span dir="ltr">sell</span> فنکشن {#the-sell-function}

فروخت (sell) کے لیے ذمہ دار فنکشن سب سے پہلے صارف سے تقاضا کرے گا کہ وہ پہلے سے منظور کرنا (approve) فنکشن کو کال کر کے رقم منظور کرے۔ منتقلی کی منظوری کے لیے ضروری ہے کہ <span dir="ltr">DEX</span> کے ذریعے بنائے گئے <span dir="ltr">ERC20Basic</span> ٹوکن کو صارف کال کرے۔ یہ سب سے پہلے <span dir="ltr">DEX</span> کنٹریکٹ کے `token()` فنکشن کو کال کر کے حاصل کیا جا سکتا ہے تاکہ وہ پتہ بازیافت کیا جا سکے جہاں <span dir="ltr">DEX</span> نے `token` نامی <span dir="ltr">ERC20Basic</span> کنٹریکٹ تعینات کیا تھا۔ پھر ہم اپنے سیشن میں اس کنٹریکٹ کی ایک مثال (instance) بناتے ہیں اور اس کے `approve` فنکشن کو کال کرتے ہیں۔ پھر ہم <span dir="ltr">DEX</span> کے `sell` فنکشن کو کال کرنے اور اپنے ٹوکنز کو واپس ایتھر سے تبادلہ کرنے کے قابل ہو جاتے ہیں۔ مثال کے طور پر، ایک انٹرایکٹو <span dir="ltr">Brownie</span> سیشن میں یہ اس طرح لگتا ہے:

```python
#### انٹرایکٹو Brownie کنسول میں Python...

# DEX کو تعینات کریں
dex = DEX.deploy({'from':account1})

# ایتھر کا ٹوکن سے تبادلہ کرنے کے لیے buy فنکشن کو کال کریں
# 1e18، Wei میں ظاہر کیا گیا 1 ایتھر ہے
dex.buy({'from': account2, 1e18})

# ERC-20 ٹوکن کے لیے تعیناتی کا پتہ حاصل کریں
# جو DEX کنٹریکٹ بنانے کے دوران تعینات کیا گیا تھا
# dex.token() ٹوکن کے لیے تعینات شدہ پتہ واپس کرتا ہے
token = ERC20Basic.at(dex.token())

# ٹوکن کے منظور کرنے کے فنکشن کو کال کریں
# dex کے پتہ کو خرچ کرنے والے کے طور پر منظور کریں
# اور اسے آپ کے کتنے ٹوکن خرچ کرنے کی اجازت ہے
token.approve(dex.address, 3e18, {'from':account2})

```

پھر جب <span dir="ltr">sell</span> فنکشن کو کال کیا جاتا ہے، تو ہم چیک کریں گے کہ آیا کالر کے پتہ سے کنٹریکٹ کے پتہ پر منتقلی کامیاب رہی اور پھر ایتھرز کو واپس کالر کے پتہ پر بھیج دیں گے۔

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

اگر سب کچھ کام کرتا ہے تو آپ کو ٹرانزیکشن میں <span dir="ltr">2</span> ایونٹس (ایک `Transfer` اور `Sold`) دیکھنے چاہئیں اور آپ کا ٹوکن بیلنس اور ایتھر بیلنس اپ ڈیٹ ہو جائے گا۔

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

اس ٹیوٹوریل سے ہم نے دیکھا کہ <span dir="ltr">ERC-20</span> ٹوکن کا بیلنس اور الاؤنس کیسے چیک کیا جائے اور انٹرفیس کا استعمال کرتے ہوئے <span dir="ltr">ERC20</span> سمارٹ کنٹریکٹ کے `Transfer` اور `TransferFrom` کو کیسے کال کیا جائے۔

ایک بار جب آپ ٹرانزیکشن کر لیتے ہیں تو ہمارے پاس ایک <span dir="ltr">JavaScript</span> ٹیوٹوریل ہے تاکہ آپ کے کنٹریکٹ پر کی گئی [ٹرانزیکشنز کا انتظار کریں اور ان کے بارے میں تفصیلات حاصل کریں](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) اور ایک [ٹیوٹوریل ہے تاکہ ٹوکن کی منتقلی یا کسی دوسرے ایونٹس کے ذریعے پیدا ہونے والے ایونٹس کو ڈی کوڈ کیا جا سکے](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) جب تک کہ آپ کے پاس <span dir="ltr">ABI</span> موجود ہو۔

ٹیوٹوریل کے لیے مکمل کوڈ یہ ہے:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```