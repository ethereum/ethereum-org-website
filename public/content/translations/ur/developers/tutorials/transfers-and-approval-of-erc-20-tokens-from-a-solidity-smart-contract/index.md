---
title: "ایک Solidity اسمارٹ کانٹریکٹ سے ERC-20 ٹوکنز کی منتقلی اور منظوری"
description: "ایک DEX اسمارٹ کانٹریکٹ بنائیں جو Solidity کا استعمال کرتے ہوئے ERC-20 ٹوکن کی منتقلی اور منظوری کو ہینڈل کرے۔"
author: "jdourlens"
tags: ["اسمارٹ کانٹریکٹس", "ٹوکنز", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "ERC-20 کی منتقلی"
lang: ur
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

پچھلے ٹیوٹوریل میں ہم نے Ethereum بلاک چین پر [Solidity میں ERC-20 ٹوکن کی ساخت](/developers/tutorials/understand-the-erc-20-token-smart-contract/) کا مطالعہ کیا تھا۔ اس مضمون میں ہم دیکھیں گے کہ ہم Solidity زبان کا استعمال کرتے ہوئے کسی ٹوکن کے ساتھ تعامل کرنے کے لیے اسمارٹ کانٹریکٹ کا استعمال کیسے کر سکتے ہیں۔

اس اسمارٹ کانٹریکٹ کے لیے، ہم ایک حقیقی ڈمی ڈی سینٹرلائزڈ ایکسچینج (DEX) بنائیں گے جہاں ایک صارف ہمارے نئے ڈیپلائے کیے گئے [ERC-20 ٹوکن](/developers/docs/standards/tokens/erc-20/) کے بدلے ether کی تجارت کر سکتا ہے۔

اس ٹیوٹوریل کے لیے ہم اس کوڈ کو بطور بنیاد استعمال کریں گے جو ہم نے پچھلے ٹیوٹوریل میں لکھا تھا۔ ہمارا DEX اپنے کنسٹرکٹر میں کانٹریکٹ کی ایک مثال (instance) بنائے گا اور درج ذیل کام انجام دے گا:

- ٹوکنز کو ether میں تبدیل کرنا
- ether کو ٹوکنز میں تبدیل کرنا

ہم اپنے سادہ ERC20 کوڈ بیس کو شامل کر کے اپنے ڈی سینٹرلائزڈ ایکسچینج کوڈ کا آغاز کریں گے:

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

ہمارا نیا DEX اسمارٹ کانٹریکٹ ERC-20 کو ڈیپلائے کرے گا اور فراہم کردہ تمام ٹوکنز حاصل کرے گا:

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

تو اب ہمارے پاس اپنا DEX ہے اور اس کے پاس تمام ٹوکن ریزرو دستیاب ہیں۔ کانٹریکٹ کے دو فنکشنز ہیں:

- `buy`: صارف ether بھیج سکتا ہے اور بدلے میں ٹوکن حاصل کر سکتا ہے
- `sell`: صارف ether واپس حاصل کرنے کے لیے ٹوکن بھیجنے کا فیصلہ کر سکتا ہے

## buy فنکشن {#the-buy-function}

آئیے buy فنکشن کا کوڈ لکھتے ہیں۔ ہمیں سب سے پہلے پیغام میں موجود ether کی مقدار کو چیک کرنے کی ضرورت ہوگی اور اس بات کی تصدیق کرنی ہوگی کہ کانٹریکٹ کے پاس کافی ٹوکنز ہیں اور پیغام میں کچھ ether موجود ہے۔ اگر کانٹریکٹ کے پاس کافی ٹوکنز ہیں تو یہ صارف کو ٹوکنز کی تعداد بھیجے گا اور `Bought` ایونٹ کو خارج (emit) کرے گا۔

نوٹ کریں کہ اگر ہم کسی خرابی کی صورت میں require فنکشن کو کال کرتے ہیں تو بھیجا گیا ether براہ راست واپس (revert) ہو جائے گا اور صارف کو لوٹا دیا جائے گا۔

چیزوں کو سادہ رکھنے کے لیے، ہم صرف 1 ٹوکن کا تبادلہ 1 Wei کے ساتھ کرتے ہیں۔

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

![ٹرانزیکشن میں دو ایونٹس: Transfer اور Bought](./transfer-and-bought-events.png)

## sell فنکشن {#the-sell-function}

فروخت (sell) کے لیے ذمہ دار فنکشن سب سے پہلے صارف سے یہ تقاضا کرے گا کہ وہ پہلے سے approve فنکشن کو کال کر کے رقم کی منظوری دے۔ منتقلی کی منظوری کے لیے ضروری ہے کہ DEX کے ذریعے بنائے گئے ERC20Basic ٹوکن کو صارف کال کرے۔ یہ سب سے پہلے DEX کانٹریکٹ کے `token()` فنکشن کو کال کر کے حاصل کیا جا سکتا ہے تاکہ وہ ایڈریس بازیافت کیا جا سکے جہاں DEX نے `token` نامی ERC20Basic کانٹریکٹ کو ڈیپلائے کیا تھا۔ پھر ہم اپنے سیشن میں اس کانٹریکٹ کی ایک مثال (instance) بناتے ہیں اور اس کے `approve` فنکشن کو کال کرتے ہیں۔ اس کے بعد ہم DEX کے `sell` فنکشن کو کال کرنے اور اپنے ٹوکنز کو واپس ether کے لیے تبدیل (swap) کرنے کے قابل ہو جاتے ہیں۔ مثال کے طور پر، ایک انٹرایکٹو brownie سیشن میں یہ کچھ اس طرح لگتا ہے:

```python
# ### انٹرایکٹو براؤنی کنسول میں پائتھون...

# DEX کو ڈیپلائے کریں
dex = DEX.deploy({'from':account1})

# ایتھر کو ٹوکن سے تبدیل کرنے کے لیے buy فنکشن کو کال کریں
# 1e18 کا مطلب 1 ایتھر ہے جسے wei میں ظاہر کیا گیا ہے
dex.buy({'from': account2, 1e18})

# ERC20 ٹوکن کا ڈیپلائمنٹ ایڈریس حاصل کریں
# جو DEX کنٹریکٹ بنانے کے دوران ڈیپلائے کیا گیا تھا
# dex.token() ٹوکن کا ڈیپلائے شدہ ایڈریس واپس کرتا ہے
token = ERC20Basic.at(dex.token())

# ٹوکن کے approve فنکشن کو کال کریں
# dex ایڈریس کو خرچ کرنے والے (spender) کے طور پر منظور کریں
# اور اسے آپ کے کتنے ٹوکن خرچ کرنے کی اجازت ہے
token.approve(dex.address, 3e18, {'from':account2})

```

پھر جب sell فنکشن کو کال کیا جائے گا، تو ہم چیک کریں گے کہ آیا کالر کے ایڈریس سے کانٹریکٹ کے ایڈریس پر منتقلی کامیاب رہی اور پھر Ethers کو واپس کالر کے ایڈریس پر بھیج دیں گے۔

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

اگر سب کچھ ٹھیک کام کرتا ہے تو آپ کو ٹرانزیکشن میں 2 ایونٹس (ایک `Transfer` اور `Sold`) نظر آنے چاہئیں اور آپ کا ٹوکن بیلنس اور ether بیلنس اپ ڈیٹ ہو جانا چاہیے۔

![ٹرانزیکشن میں دو ایونٹس: Transfer اور Sold](./transfer-and-sold-events.png)

<Divider />

اس ٹیوٹوریل سے ہم نے دیکھا کہ ERC-20 ٹوکن کا بیلنس اور الاؤنس کیسے چیک کیا جاتا ہے اور انٹرفیس کا استعمال کرتے ہوئے ERC20 اسمارٹ کانٹریکٹ کے `Transfer` اور `TransferFrom` کو کیسے کال کیا جاتا ہے۔

ایک بار جب آپ ٹرانزیکشن کر لیتے ہیں تو ہمارے پاس ایک JavaScript ٹیوٹوریل ہے تاکہ آپ کے کانٹریکٹ پر کی گئی [ٹرانزیکشنز کا انتظار کیا جا سکے اور ان کے بارے میں تفصیلات حاصل کی جا سکیں](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) اور ایک [ٹیوٹوریل ہے تاکہ ٹوکن کی منتقلی یا کسی دوسرے ایونٹس کے ذریعے پیدا ہونے والے ایونٹس کو ڈی کوڈ کیا جا سکے](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) بشرطیکہ آپ کے پاس ABI موجود ہو۔

ٹیوٹوریل کا مکمل کوڈ یہ ہے:

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