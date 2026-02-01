---
title: ERC-20 ٹوکن اسمارٹ کنٹریکٹ کو سمجھیں
description: ایک مکمل Solidity اسمارٹ کنٹریکٹ مثال اور وضاحت کے ساتھ ERC-20 ٹوکن اسٹینڈرڈ کو نافذ کرنے کا طریقہ سیکھیں۔
author: "jdourlens"
tags: [ "اسمارٹ معاہدات", "tokens", "solidity", "erc-20" ]
skill: beginner
lang: ur-in
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum پر سب سے اہم [اسمارٹ کنٹریکٹ اسٹینڈرڈز](/developers/docs/standards/) میں سے ایک [ERC-20](/developers/docs/standards/tokens/erc-20/) کے نام سے جانا جاتا ہے، جو فنجیبل ٹوکن کے نفاذ کے لیے Ethereum بلاک چین پر تمام اسمارٹ کنٹریکٹس کے لیے استعمال ہونے والے تکنیکی اسٹینڈرڈ کے طور پر ابھرا ہے۔

ERC-20 قواعد کی ایک عام فہرست کی وضاحت کرتا ہے جس کی تمام فنجیبل Ethereum ٹوکنز کو پیروی کرنی چاہیے۔ نتیجتاً، یہ ٹوکن اسٹینڈرڈ ہر قسم کے ڈیولپرز کو اس بات کی درست پیش گوئی کرنے کا اختیار دیتا ہے کہ نئے ٹوکن بڑے Ethereum سسٹم میں کیسے کام کریں گے۔ اس سے ڈیولپرز کے کام آسان ہو جاتے ہیں، کیونکہ وہ یہ جانتے ہوئے اپنے کام کو آگے بڑھا سکتے ہیں کہ ہر بار جب کوئی نیا ٹوکن جاری ہوتا ہے تو ہر نئے پروجیکٹ کو دوبارہ کرنے کی ضرورت نہیں ہوگی، جب تک کہ ٹوکن قواعد کی پیروی کرتا ہے۔

یہاں، ایک انٹرفیس کے طور پر پیش کیے گئے، وہ فنکشنز ہیں جنہیں ERC-20 کو نافذ کرنا ضروری ہے۔ اگر آپ کو یقین نہیں ہے کہ انٹرفیس کیا ہے: تو [Solidity میں OOP پروگرامنگ](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) کے بارے میں ہمارا مضمون دیکھیں۔

```solidity
pragma solidity ^0.6.0;

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
```

یہاں ہر فنکشن کی سطر بہ سطر وضاحت دی گئی ہے کہ وہ کس لیے ہے۔ اس کے بعد ہم ERC-20 ٹوکن کا ایک سادہ نفاذ پیش کریں گے۔

## گیٹرز {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

موجود ٹوکنز کی مقدار واپس کرتا ہے۔ یہ فنکشن ایک گیٹر ہے اور کنٹریکٹ کی اسٹیٹ میں ترمیم نہیں کرتا ہے۔ ذہن میں رکھیں کہ Solidity میں کوئی فلوٹ نہیں ہیں۔ اس لیے زیادہ تر ٹوکن 18 ڈیسیملز اپناتے ہیں اور کل سپلائی اور دیگر نتائج اس طرح واپس کریں گے: 1 ٹوکن کے لیے 1000000000000000000۔ ہر ٹوکن میں 18 ڈیسیملز نہیں ہوتے ہیں اور یہ ایک ایسی چیز ہے جس پر آپ کو ٹوکنز کے ساتھ معاملہ کرتے وقت واقعی دھیان دینے کی ضرورت ہے۔

```solidity
function balanceOf(address account) external view returns (uint256);
```

ایک ایڈریس (`account`) کی ملکیت والے ٹوکنز کی مقدار واپس کرتا ہے۔ یہ فنکشن ایک گیٹر ہے اور کنٹریکٹ کی اسٹیٹ میں ترمیم نہیں کرتا ہے۔

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 اسٹینڈرڈ ایک ایڈریس کو اجازت دیتا ہے کہ وہ کسی دوسرے ایڈریس کو الاؤنس دے تاکہ وہ اس سے ٹوکن حاصل کر سکے۔ یہ گیٹر ٹوکنز کی باقی تعداد واپس کرتا ہے جو `spender` کو `owner` کی جانب سے خرچ کرنے کی اجازت ہوگی۔ یہ فنکشن ایک گیٹر ہے اور کنٹریکٹ کی اسٹیٹ میں ترمیم نہیں کرتا ہے اور اسے بطور ڈیفالٹ 0 واپس کرنا چاہیے۔

## فنکشنز {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

ٹوکنز کی `amount` کو فنکشن کالر ایڈریس (`msg.sender`) سے وصول کنندہ کے ایڈریس پر منتقل کرتا ہے۔ یہ فنکشن `Transfer` ایونٹ جاری کرتا ہے جس کی تعریف بعد میں کی گئی ہے۔ اگر ٹرانسفر ممکن تھا تو یہ صحیح (true) واپس کرتا ہے۔

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`allowance` کی وہ رقم سیٹ کرتا ہے جسے `spender` کو فنکشن کالر (`msg.sender`) کے بیلنس سے ٹرانسفر کرنے کی اجازت ہے۔ یہ فنکشن Approval ایونٹ جاری کرتا ہے۔ فنکشن یہ واپس کرتا ہے کہ آیا الاؤنس کامیابی سے سیٹ کیا گیا تھا۔

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

الاؤنس میکانزم کا استعمال کرتے ہوئے ٹوکنز کی `amount` کو `sender` سے `recipient` میں منتقل کرتا ہے۔ پھر کالر کے الاؤنس سے `amount` کاٹ لی جاتی ہے۔ یہ فنکشن `Transfer` ایونٹ جاری کرتا ہے۔

## ایونٹس {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

یہ ایونٹ اس وقت جاری ہوتا ہے جب ٹوکنز کی رقم (value) `from` ایڈریس سے `to` ایڈریس پر بھیجی جاتی ہے۔

نئے ٹوکنز کی منٹنگ کے معاملے میں، ٹرانسفر عام طور پر 0x00..0000 ایڈریس `from` ہوتا ہے، جبکہ ٹوکنز کو برن کرنے کے معاملے میں ٹرانسفر 0x00..0000 `to` ہوتا ہے۔

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

یہ ایونٹ اس وقت جاری ہوتا ہے جب ٹوکنز کی رقم (`value`) کو `owner` کی طرف سے `spender` کے استعمال کے لیے منظور کیا جاتا ہے۔

## ERC-20 ٹوکنز کا ایک بنیادی نفاذ {#a-basic-implementation-of-erc-20-tokens}

یہاں سب سے سادہ کوڈ ہے جس پر آپ اپنا ERC-20 ٹوکن بنا سکتے ہیں:

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

ERC-20 ٹوکن اسٹینڈرڈ کا ایک اور بہترین نفاذ [OpenZeppelin ERC-20 امپلیمنٹیشن](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) ہے۔
