---
title: "⁦ERC-20⁩ ٹوکن سمارٹ کنٹریکٹ کو سمجھیں"
description: "ایک مکمل ⁦Solidity⁩ سمارٹ کنٹریکٹ کی مثال اور وضاحت کے ساتھ ⁦ERC-20⁩ ٹوکن کے معیار کو نافذ کرنے کا طریقہ سیکھیں۔"
author: "jdourlens"
tags: ["سمارٹ کنٹریکٹس", "ٹوکنز", "Solidity", "erc-20"]
skill: beginner
breadcrumb: "⁦ERC-20⁩ ٹوکن کی بنیادی باتیں"
lang: ur
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

ایتھیریم پر سب سے اہم [سمارٹ کنٹریکٹ کے معیارات](/developers/docs/standards/) میں سے ایک کو [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) کے نام سے جانا جاتا ہے، جو قابل تبادلہ ٹوکن کے نفاذ کے لیے ایتھیریم بلاک چین پر تمام سمارٹ کنٹریکٹس کے لیے استعمال ہونے والے تکنیکی معیار کے طور پر ابھرا ہے۔

<span dir="ltr">ERC-20</span> ان اصولوں کی ایک مشترکہ فہرست کی وضاحت کرتا ہے جن پر تمام قابل تبادلہ ایتھیریم ٹوکنز کو عمل کرنا چاہیے۔ نتیجتاً، یہ ٹوکن معیار ہر قسم کے ڈیولپرز کو بااختیار بناتا ہے کہ وہ درست طریقے سے پیش گوئی کر سکیں کہ نئے ٹوکنز بڑے ایتھیریم سسٹم کے اندر کیسے کام کریں گے۔ اس سے ڈیولپرز کے کام آسان ہو جاتے ہیں، کیونکہ وہ اپنا کام یہ جان کر جاری رکھ سکتے ہیں کہ جب تک ٹوکن اصولوں کی پیروی کرتا ہے، ہر نئے پروجیکٹ کو ہر بار نیا ٹوکن جاری ہونے پر دوبارہ کرنے کی ضرورت نہیں ہوگی۔

یہاں ایک انٹرفیس کے طور پر پیش کیے گئے وہ فنکشنز ہیں جنہیں <span dir="ltr">ERC-20</span> کو نافذ کرنا چاہیے۔ اگر آپ کو یقین نہیں ہے کہ انٹرفیس کیا ہے: تو [<span dir="ltr">Solidity</span> میں <span dir="ltr">OOP</span> پروگرامنگ](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) کے بارے میں ہمارا مضمون دیکھیں۔

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

یہاں لائن بہ لائن وضاحت دی گئی ہے کہ ہر فنکشن کس لیے ہے۔ اس کے بعد ہم <span dir="ltr">ERC-20</span> ٹوکن کا ایک سادہ نفاذ پیش کریں گے۔

## گیٹرز (Getters) {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

موجود ٹوکنز کی مقدار واپس کرتا ہے۔ یہ فنکشن ایک گیٹر (getter) ہے اور کنٹریکٹ کی حالت کو تبدیل نہیں کرتا ہے۔ ذہن میں رکھیں کہ <span dir="ltr">Solidity</span> میں کوئی فلوٹس (floats) نہیں ہیں۔ اس لیے زیادہ تر ٹوکنز <span dir="ltr">18</span> اعشاریہ (decimals) اپناتے ہیں اور کل سپلائی اور دیگر نتائج کو <span dir="ltr">1</span> ٹوکن کے لیے <span dir="ltr">1000000000000000000</span> کے طور پر واپس کریں گے۔ ہر ٹوکن میں <span dir="ltr">18</span> اعشاریہ نہیں ہوتے اور ٹوکنز کے ساتھ کام کرتے وقت آپ کو واقعی اس بات کا خیال رکھنے کی ضرورت ہے۔

```solidity
function balanceOf(address account) external view returns (uint256);
```

کسی پتہ (`account`) کی ملکیت والے ٹوکنز کی مقدار واپس کرتا ہے۔ یہ فنکشن ایک گیٹر ہے اور کنٹریکٹ کی حالت کو تبدیل نہیں کرتا ہے۔

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

<span dir="ltr">ERC-20</span> معیار ایک پتہ کو دوسرے پتہ کو الاؤنس دینے کی اجازت دیتا ہے تاکہ وہ اس سے ٹوکنز بازیافت کر سکے۔ یہ گیٹر باقی ماندہ ٹوکنز کی تعداد واپس کرتا ہے جو `spender` کو `owner` کی جانب سے خرچ کرنے کی اجازت ہوگی۔ یہ فنکشن ایک گیٹر ہے اور کنٹریکٹ کی حالت کو تبدیل نہیں کرتا ہے اور اسے پہلے سے طے شدہ (by default) طور پر <span dir="ltr">0</span> واپس کرنا چاہیے۔

## فنکشنز {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

ٹوکنز کی `amount` کو فنکشن کالر کے پتہ (`msg.sender`) سے وصول کنندہ کے پتہ پر منتقل کرتا ہے۔ یہ فنکشن بعد میں بیان کردہ `Transfer` ایونٹ کو خارج (emit) کرتا ہے۔ اگر منتقلی ممکن تھی تو یہ <span dir="ltr">true</span> واپس کرتا ہے۔

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`allowance` کی وہ مقدار سیٹ کریں جو `spender` کو فنکشن کالر (`msg.sender`) کے بیلنس سے منتقل کرنے کی اجازت ہے۔ یہ فنکشن <span dir="ltr">Approval</span> ایونٹ کو خارج کرتا ہے۔ فنکشن یہ واپس کرتا ہے کہ آیا الاؤنس کامیابی کے ساتھ سیٹ کیا گیا تھا۔

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

الاؤنس کے طریقہ کار کا استعمال کرتے ہوئے ٹوکنز کی `amount` کو `sender` سے `recipient` میں منتقل کرتا ہے۔ پھر کالر کے الاؤنس سے مقدار کاٹ لی جاتی ہے۔ یہ فنکشن `Transfer` ایونٹ کو خارج کرتا ہے۔

## ایونٹس {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

یہ ایونٹ اس وقت خارج ہوتا ہے جب ٹوکنز کی مقدار (ویلیو) `from` پتہ سے `to` پتہ پر بھیجی جاتی ہے۔

نئے ٹوکنز کی ڈھلائی کے معاملے میں، منتقلی عام طور پر `from` <span dir="ltr">0x00..0000</span> پتہ سے ہوتی ہے جبکہ ٹوکنز کو جلانے کے معاملے میں منتقلی `to` <span dir="ltr">0x00..0000</span> پر ہوتی ہے۔

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

یہ ایونٹ اس وقت خارج ہوتا ہے جب ٹوکنز کی مقدار (`value`) کو `owner` کی طرف سے `spender` کے استعمال کے لیے منظور کیا جاتا ہے۔

## <span dir="ltr">ERC-20</span> ٹوکنز کا ایک بنیادی نفاذ {#a-basic-implementation-of-erc-20-tokens}

یہاں وہ سب سے آسان کوڈ ہے جس پر آپ اپنے <span dir="ltr">ERC-20</span> ٹوکن کی بنیاد رکھ سکتے ہیں:

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

<span dir="ltr">ERC-20</span> ٹوکن معیار کا ایک اور بہترین نفاذ [اوپن زیپلن <span dir="ltr">ERC-20</span> کا نفاذ](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) ہے۔