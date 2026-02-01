---
title: ایک solidity اسمارٹ کنٹریکٹ سے ERC-20 ٹوکنز کی منتقلی اور منظوری
description: Solidity کا استعمال کرتے ہوئے ایک DEX اسمارٹ کنٹریکٹ بنائیں جو ERC-20 ٹوکن کی منتقلی اور منظوری کو ہینڈل کرتا ہے۔
author: "jdourlens"
tags: [ "اسمارٹ معاہدات", "tokens", "solidity", "erc-20" ]
skill: intermediate
lang: ur-in
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

پچھلے ٹیوٹوریل میں ہم نے Ethereum بلاک چین پر [Solidity میں ERC-20 ٹوکن کی ساخت](/developers/tutorials/understand-the-erc-20-token-smart-contract/) کا مطالعہ کیا تھا۔ اس مضمون میں ہم دیکھیں گے کہ ہم Solidity زبان کا استعمال کرتے ہوئے ٹوکن کے ساتھ تعامل کرنے کے لیے اسمارٹ کنٹریکٹ کا استعمال کیسے کر سکتے ہیں۔

اس اسمارٹ کنٹریکٹ کے لیے، ہم ایک حقیقی ڈمی غیر مرکزی تبادلہ بنائیں گے جہاں ایک صارف ہمارے نئے ڈیپلائے کیے گئے [ERC-20 ٹوکن](/developers/docs/standards/tokens/erc-20/) کے لیے ایتھر کی تجارت کر سکتا ہے۔

اس ٹیوٹوریل کے لیے ہم اس کوڈ کا استعمال کریں گے جسے ہم نے پچھلے ٹیوٹوریل میں ایک بنیاد کے طور پر لکھا تھا۔ ہمارا DEX اپنے کنسٹرکٹر میں کنٹریکٹ کا ایک انسٹینس بنائے گا اور درج ذیل آپریشنز انجام دے گا:

- ٹوکنز کو ایتھر میں تبدیل کرنا
- ایتھر کو ٹوکنز میں تبدیل کرنا

ہم اپنا سادہ ERC20 کوڈ بیس شامل کرکے اپنا غیر مرکزی تبادلے کا کوڈ شروع کریں گے:

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

ہمارا نیا DEX اسمارٹ کنٹریکٹ ERC-20 کو ڈیپلائے کرے گا اور فراہم کردہ تمام چیزیں حاصل کرے گا:

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

تو اب ہمارے پاس اپنا DEX ہے اور اس میں تمام ٹوکن ریزرو دستیاب ہیں۔ کنٹریکٹ میں دو فنکشنز ہیں:

- `buy`: صارف ایتھر بھیج سکتا ہے اور بدلے میں ٹوکن حاصل کر سکتا ہے
- `sell`: صارف ایتھر واپس حاصل کرنے کے لیے ٹوکن بھیجنے کا فیصلہ کر سکتا ہے

## خریدنے کا فنکشن {#the-buy-function}

آئیے خریدنے کا فنکشن کوڈ کریں۔ ہمیں پہلے یہ چیک کرنے کی ضرورت ہوگی کہ پیغام میں ایتھر کی کتنی مقدار ہے اور اس بات کی تصدیق کرنی ہوگی کہ کنٹریکٹس کے پاس کافی ٹوکنز ہیں اور یہ کہ پیغام میں کچھ ایتھر موجود ہے۔ اگر کنٹریکٹ کے پاس کافی ٹوکنز ہیں تو وہ صارف کو ٹوکنز کی تعداد بھیجے گا اور `Bought` ایونٹ کو ایمٹ کرے گا۔

نوٹ کریں کہ اگر ہم خرابی کی صورت میں require فنکشن کو کال کرتے ہیں تو بھیجا گیا ایتھر براہ راست ریورٹ ہو جائے گا اور صارف کو واپس کر دیا جائے گا۔

چیزوں کو آسان رکھنے کے لیے، ہم صرف 1 Wei کے بدلے 1 ٹوکن کا تبادلہ کرتے ہیں۔

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "کچھ ایتھر بھیجنا ضروری ہے");
    require(amountTobuy <= dexBalance, "ریزرو میں کافی ٹوکنز نہیں ہیں");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

اس صورت میں جہاں خرید کامیاب ہوتی ہے ہمیں ٹرانزیکشن میں دو ایونٹس نظر آنے چاہئیں: ٹوکن `Transfer` اور `Bought` ایونٹ۔

![ٹرانزیکشن میں دو ایونٹس: Transfer اور Bought](./transfer-and-bought-events.png)

## فروخت کا فنکشن {#the-sell-function}

فروخت کے لیے ذمہ دار فنکشن کے لیے پہلے یہ ضروری ہوگا کہ صارف نے پہلے سے approve فنکشن کو کال کرکے رقم کی منظوری دی ہو۔ ٹرانسفر کی منظوری کے لیے ضروری ہے کہ DEX کے ذریعے انسٹینشیئٹ کردہ ERC20Basic ٹوکن کو صارف کے ذریعے کال کیا جائے۔ یہ پہلے DEX کنٹریکٹ کے `token()` فنکشن کو کال کرکے اس ایڈریس کو حاصل کرکے کیا جا سکتا ہے جہاں DEX نے `token` نامی ERC20Basic کنٹریکٹ ڈیپلائے کیا تھا۔ پھر ہم اپنے سیشن میں اس کنٹریکٹ کا ایک انسٹینس بناتے ہیں اور اس کے `approve` فنکشن کو کال کرتے ہیں۔ پھر ہم DEX کے `sell` فنکشن کو کال کرنے اور اپنے ٹوکنز کو واپس ایتھر کے لیے سواپ کرنے کے قابل ہوتے ہیں۔ مثال کے طور پر، ایک انٹرایکٹو براؤنی سیشن میں یہ اس طرح نظر آتا ہے:

```python
#### انٹرایکٹو براؤنی کنسول میں Python...

# DEX کو ڈیپلائے کریں
dex = DEX.deploy({'from':account1})

# ٹوکن کے لیے ایتھر سواپ کرنے کے لیے buy فنکشن کو کال کریں
# 1e18, 1 ایتھر ہے جسے wei میں ظاہر کیا گیا ہے
dex.buy({'from': account2, 1e18})

# ERC20 ٹوکن کے لیے ڈیپلائیمنٹ ایڈریس حاصل کریں
# جو DEX کنٹریکٹ کی تخلیق کے دوران ڈیپلائے کیا گیا تھا
# dex.token() ٹوکن کے لیے ڈیپلائے کیا گیا ایڈریس واپس کرتا ہے
token = ERC20Basic.at(dex.token())

# ٹوکن کے approve فنکشن کو کال کریں
# dex ایڈریس کو خرچ کرنے والے کے طور پر منظور کریں
# اور یہ آپ کے کتنے ٹوکن خرچ کرنے کی اجازت رکھتا ہے
token.approve(dex.address, 3e18, {'from':account2})

```

پھر جب sell فنکشن کو کال کیا جاتا ہے، تو ہم چیک کریں گے کہ کالر کے ایڈریس سے کنٹریکٹ ایڈریس پر منتقلی کامیاب تھی یا نہیں اور پھر ایتھرز کو کالر کے ایڈریس پر واپس بھیج دیں گے۔

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "آپ کو کم از کم کچھ ٹوکن فروخت کرنے کی ضرورت ہے");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "ٹوکن الاؤنس چیک کریں");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

اگر سب کچھ کام کرتا ہے تو آپ کو ٹرانزیکشن میں 2 ایونٹس (`Transfer` اور `Sold`) نظر آنے چاہئیں اور آپ کا ٹوکن بیلنس اور ایتھر بیلنس اپ ڈیٹ ہونا چاہیے۔

![ٹرانزیکشن میں دو ایونٹس: Transfer اور Sold](./transfer-and-sold-events.png)

<Divider />

اس ٹیوٹوریل سے ہم نے دیکھا کہ ERC-20 ٹوکن کا بیلنس اور الاؤنس کیسے چیک کیا جائے اور انٹرفیس کا استعمال کرتے ہوئے ERC20 اسمارٹ کنٹریکٹ کے `Transfer` اور `TransferFrom` کو کیسے کال کیا جائے۔

ایک بار جب آپ کوئی ٹرانزیکشن کرتے ہیں تو ہمارے پاس ایک JavaScript ٹیوٹوریل ہے [ٹرانزیکشنز کے بارے میں تفصیلات کا انتظار کرنے اور حاصل کرنے کے لیے](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) جو آپ کے کنٹریکٹ میں کی گئی تھیں اور ایک [ٹیوٹوریل ہے جو ٹوکن ٹرانسفرز یا کسی دوسرے ایونٹس کے ذریعے پیدا ہونے والے ایونٹس کو ڈی کوڈ کرنے کے لیے ہے](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) جب تک کہ آپ کے پاس ABI ہو۔

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
        require(amountTobuy > 0, "کچھ ایتھر بھیجنا ضروری ہے");
        require(amountTobuy <= dexBalance, "ریزرو میں کافی ٹوکنز نہیں ہیں");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "آپ کو کم از کم کچھ ٹوکن فروخت کرنے کی ضرورت ہے");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "ٹوکن الاؤنس چیک کریں");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
