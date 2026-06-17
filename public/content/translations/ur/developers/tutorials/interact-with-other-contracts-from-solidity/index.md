---
title: "⁦Solidity⁩ سے دیگر کنٹریکٹس کے ساتھ تعامل کریں"
description: "موجودہ کنٹریکٹ سے سمارٹ کنٹریکٹ کو تعینات کرنے اور اس کے ساتھ تعامل کرنے کا طریقہ"
author: "jdourlens"
tags: ["سمارٹ کنٹریکٹس", "solidity", "remix", "تعینات کرنا", "کمپوزیبلٹی"]
skill: advanced
breadcrumb: "کنٹریکٹ کے تعاملات"
lang: ur
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

پچھلے ٹیوٹوریلز میں ہم نے بہت کچھ سیکھا کہ [اپنا پہلا سمارٹ کنٹریکٹ کیسے تعینات کریں](/developers/tutorials/deploying-your-first-smart-contract/) اور اس میں کچھ خصوصیات کیسے شامل کریں جیسے [موڈیفائرز کے ساتھ رسائی کو کنٹرول کرنا](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) یا [Solidity میں ایرر ہینڈلنگ](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)۔ اس ٹیوٹوریل میں ہم سیکھیں گے کہ موجودہ کنٹریکٹ سے سمارٹ کنٹریکٹ کو کیسے تعینات کیا جائے اور اس کے ساتھ کیسے تعامل کیا جائے۔

ہم ایک ایسا کنٹریکٹ بنائیں گے جو کسی کو بھی اس کے لیے ایک فیکٹری بنا کر اپنا `Counter` سمارٹ کنٹریکٹ رکھنے کے قابل بناتا ہے، اس کا نام `CounterFactory` ہوگا۔ سب سے پہلے یہاں ہمارے ابتدائی `Counter` سمارٹ کنٹریکٹ کا کوڈ ہے:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

نوٹ کریں کہ ہم نے فیکٹری کے پتہ اور کنٹریکٹ کے مالک کے پتہ کا ٹریک رکھنے کے لیے کنٹریکٹ کے کوڈ میں تھوڑی سی ترمیم کی ہے۔ جب آپ کسی دوسرے کنٹریکٹ سے کنٹریکٹ کوڈ کو کال کرتے ہیں، تو msg.sender ہماری کنٹریکٹ فیکٹری کے پتہ کا حوالہ دے گا۔ یہ **سمجھنے کے لیے واقعی ایک اہم نکتہ ہے** کیونکہ دیگر کنٹریکٹس کے ساتھ تعامل کرنے کے لیے کنٹریکٹ کا استعمال ایک عام رواج ہے۔ اس لیے آپ کو پیچیدہ معاملات میں اس بات کا خیال رکھنا چاہیے کہ بھیجنے والا کون ہے۔

اس کے لیے ہم نے ایک `onlyFactory` موڈیفائر بھی شامل کیا ہے جو اس بات کو یقینی بناتا ہے کہ حالت تبدیل کرنے والے فنکشن کو صرف وہی فیکٹری کال کر سکتی ہے جو اصل کالر کو پیرامیٹر کے طور پر پاس کرے گی۔

ہمارے نئے `CounterFactory` کے اندر جو دیگر تمام Counters کا انتظام کرے گا، ہم ایک میپنگ شامل کریں گے جو ایک مالک کو اس کے کاؤنٹر کنٹریکٹ کے پتہ سے منسلک کرے گی:

```solidity
mapping(address => Counter) _counters;
```

ایتھیریم میں، میپنگ JavaScript میں آبجیکٹس کے مساوی ہیں، یہ ٹائپ A کی کلید کو ٹائپ B کی ویلیو سے میپ کرنے کے قابل بناتی ہیں۔ اس صورت میں ہم ایک مالک کے پتہ کو اس کے Counter کی مثال کے ساتھ میپ کرتے ہیں۔

کسی کے لیے نیا Counter شروع کرنا کچھ اس طرح نظر آئے گا:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

ہم پہلے چیک کرتے ہیں کہ آیا اس شخص کے پاس پہلے سے ہی کاؤنٹر موجود ہے۔ اگر اس کے پاس کاؤنٹر نہیں ہے تو ہم اس کا پتہ `Counter` کنسٹرکٹر کو پاس کر کے ایک نیا کاؤنٹر شروع کرتے ہیں اور نئی بنائی گئی مثال کو میپنگ میں تفویض کرتے ہیں۔

کسی مخصوص Counter کی گنتی حاصل کرنے کے لیے یہ کچھ اس طرح نظر آئے گا:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

پہلا فنکشن چیک کرتا ہے کہ آیا دیے گئے پتہ کے لیے Counter کنٹریکٹ موجود ہے اور پھر مثال سے `getCount` طریقہ کو کال کرتا ہے۔ دوسرا فنکشن: `getMyCount` صرف msg.sender کو براہ راست `getCount` فنکشن میں پاس کرنے کا ایک مختصر طریقہ ہے۔

`increment` فنکشن بالکل یکساں ہے لیکن اصل ٹرانزیکشن بھیجنے والے کو `Counter` کنٹریکٹ میں پاس کرتا ہے:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

نوٹ کریں کہ اگر بہت زیادہ بار کال کیا جائے تو ہمارا کاؤنٹر ممکنہ طور پر اوور فلو کا شکار ہو سکتا ہے۔ اس ممکنہ صورتحال سے بچنے کے لیے آپ کو زیادہ سے زیادہ [SafeMath لائبریری](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) کا استعمال کرنا چاہیے۔

ہمارے کنٹریکٹ کو تعینات کرنے کے لیے، آپ کو `CounterFactory` اور `Counter` دونوں کا کوڈ فراہم کرنے کی ضرورت ہوگی۔ مثال کے طور پر Remix میں تعینات کرتے وقت آپ کو CounterFactory کو منتخب کرنے کی ضرورت ہوگی۔

یہاں مکمل کوڈ ہے:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

کمپائلنگ کے بعد، Remix کے تعینات کرنے والے سیکشن میں آپ اس فیکٹری کو منتخب کریں گے جسے تعینات کیا جانا ہے:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

پھر آپ اپنی کنٹریکٹ فیکٹری کے ساتھ کھیل سکتے ہیں اور تبدیل ہونے والی ویلیو کو چیک کر سکتے ہیں۔ اگر آپ سمارٹ کنٹریکٹ کو کسی مختلف پتہ سے کال کرنا چاہتے ہیں تو آپ کو Remix کے اکاؤنٹ سلیکٹ میں پتہ تبدیل کرنے کی ضرورت ہوگی۔