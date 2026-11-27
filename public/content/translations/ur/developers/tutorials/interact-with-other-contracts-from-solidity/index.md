---
title: "⁦Solidity⁩ سے دیگر کنٹریکٹس کے ساتھ تعامل کریں"
description: "موجودہ کنٹریکٹ سے سمارٹ کنٹریکٹ کو تعینات کرنے اور اس کے ساتھ تعامل کرنے کا طریقہ"
author: "jdourlens"
tags: ["سمارٹ کنٹریکٹس", "Solidity", "Remix", "تعینات کرنا", "کمپوزیبلٹی"]
skill: advanced
breadcrumb: "کنٹریکٹ کے تعاملات"
lang: ur
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

پچھلے ٹیوٹوریلز میں ہم نے بہت کچھ سیکھا کہ [اپنا پہلا سمارٹ کنٹریکٹ کیسے تعینات کریں](/developers/tutorials/deploying-your-first-smart-contract/) اور اس میں کچھ خصوصیات کیسے شامل کریں جیسے [موڈیفائرز کے ساتھ رسائی کو کنٹرول کرنا](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) یا [Solidity میں ایرر ہینڈلنگ](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions)۔ اس ٹیوٹوریل میں ہم سیکھیں گے کہ موجودہ کنٹریکٹ سے سمارٹ کنٹریکٹ کو کیسے تعینات کیا جائے اور اس کے ساتھ کیسے تعامل کیا جائے۔

ہم ایک ایسا کنٹریکٹ بنائیں گے جو کسی کو بھی اس کے لیے ایک فیکٹری بنا کر اپنا `Counter` سمارٹ کنٹریکٹ رکھنے کے قابل بناتا ہے، اس کا نام `CounterFactory` ہوگا۔ سب سے پہلے یہاں ہمارے ابتدائی `Counter` سمارٹ کنٹریکٹ کا کوڈ ہے:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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

نوٹ کریں کہ ہم نے فیکٹری کے پتہ اور کنٹریکٹ کے مالک کے پتہ کا ٹریک رکھنے کے لیے کنٹریکٹ کوڈ میں تھوڑی سی ترمیم کی ہے۔ جب آپ کسی دوسرے کنٹریکٹ سے کنٹریکٹ کوڈ کو کال کرتے ہیں، تو msg.sender ہماری کنٹریکٹ فیکٹری کے پتہ کا حوالہ دے گا۔ یہ **سمجھنے کے لیے واقعی ایک اہم نکتہ ہے** کیونکہ دوسرے کنٹریکٹس کے ساتھ تعامل کرنے کے لیے کنٹریکٹ کا استعمال ایک عام رواج ہے۔ اس لیے آپ کو پیچیدہ معاملات میں اس بات کا خیال رکھنا چاہیے کہ بھیجنے والا کون ہے۔

اس کے لیے ہم نے ایک `onlyFactory` موڈیفائر بھی شامل کیا ہے جو اس بات کو یقینی بناتا ہے کہ حالت تبدیل کرنے والے فنکشن کو صرف فیکٹری کے ذریعے کال کیا جا سکتا ہے جو اصل کالر کو پیرامیٹر کے طور پر پاس کرے گی۔

ہمارے نئے `CounterFactory` کے اندر جو دیگر تمام Counters کا انتظام کرے گا، ہم ایک میپنگ شامل کریں گے جو ایک مالک کو اس کے کاؤنٹر کنٹریکٹ کے پتہ سے منسلک کرے گی:

```solidity
mapping(address => Counter) _counters;
```

Solidity میں، [میپنگز](https://docs.soliditylang.org/en/latest/types.html#mapping-types) JavaScript میں آبجیکٹس کی طرح ہوتی ہیں: وہ ٹائپ A کی کلید کو ٹائپ B کی ویلیو سے میپ کرتی ہیں۔ اس صورت میں ہم ایک مالک کے پتہ کو اس کے Counter کے انسٹینس کے ساتھ میپ کرتے ہیں۔

کسی کے لیے نیا Counter انسٹینشیئٹ کرنا کچھ اس طرح نظر آئے گا:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

ہم سب سے پہلے چیک کرتے ہیں کہ آیا اس شخص کے پاس پہلے سے ہی ایک کاؤنٹر ہے۔ ایک میپنگ ان کلیدوں کے لیے ڈیفالٹ ویلیو لوٹاتی ہے جو کبھی سیٹ نہیں کی گئی تھیں، جو کنٹریکٹ ٹائپ کے لیے صفر ایڈریس ہے، لہذا ہم ذخیرہ شدہ کنٹریکٹ کے پتہ کا `address(0)` سے موازنہ کرتے ہیں۔ اگر اس کے پاس کاؤنٹر نہیں ہے تو ہم اس کا پتہ `Counter` کنسٹرکٹر کو پاس کر کے ایک نیا کاؤنٹر انسٹینشیئٹ کرتے ہیں اور نئے بنائے گئے انسٹینس کو میپنگ میں تفویض کرتے ہیں۔

کسی مخصوص Counter کی گنتی حاصل کرنے کے لیے یہ کچھ اس طرح نظر آئے گا:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

پہلا فنکشن چیک کرتا ہے کہ آیا دیے گئے پتہ کے لیے Counter کنٹریکٹ موجود ہے اور پھر انسٹینس سے `getCount` میتھڈ کو کال کرتا ہے۔ دوسرا فنکشن: `getMyCount` صرف msg.sender کو براہ راست `getCount` فنکشن میں پاس کرنے کا ایک شارٹ کٹ ہے۔

`increment` فنکشن بالکل یکساں ہے لیکن اصل ٹرانزیکشن بھیجنے والے کو `Counter` کنٹریکٹ میں پاس کرتا ہے:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

<span dir="ltr">Solidity 0.8</span> کے بعد سے، ریاضی کو [بذریعہ ڈیفالٹ چیک کیا جاتا ہے](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): اگر `_count` کبھی اوور فلو ہو جاتا ہے، تو `_count++` خاموشی سے ریپ اراؤنڈ کرنے کے بجائے ٹرانزیکشن کو ریورٹ کر دے گا، اس لیے SafeMath جیسی کسی اضافی لائبریری کی ضرورت نہیں ہے۔

ہمارے کنٹریکٹ کو تعینات کرنے کے لیے، آپ کو `CounterFactory` اور `Counter` دونوں کا کوڈ فراہم کرنا ہوگا۔ مثال کے طور پر Remix میں تعینات کرتے وقت آپ کو CounterFactory کو منتخب کرنے کی ضرورت ہوگی۔

یہاں مکمل کوڈ ہے:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

کمپائلنگ کے بعد، Remix کے تعینات کرنے کے سیکشن میں آپ تعینات کی جانے والی فیکٹری کو منتخب کریں گے:

![Remix میں تعینات کی جانے والی فیکٹری کا انتخاب کرنا](./counterfactory-deploy.png)

پھر آپ اپنی کنٹریکٹ فیکٹری کے ساتھ کھیل سکتے ہیں اور تبدیل ہونے والی ویلیو کو چیک کر سکتے ہیں۔ اگر آپ سمارٹ کنٹریکٹ کو کسی مختلف پتہ سے کال کرنا چاہتے ہیں تو آپ کو Remix کے Account سلیکٹ میں پتہ تبدیل کرنے کی ضرورت ہوگی۔
