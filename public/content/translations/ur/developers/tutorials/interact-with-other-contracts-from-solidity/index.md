---
title: Solidity سے دوسرے معاہدوں کے ساتھ تعامل کریں
description: ایک موجودہ معاہدے سے ایک اسمارٹ معاہدہ کیسے تعینات کریں اور اس کے ساتھ تعامل کریں
author: "jdourlens"
tags:
  [
    "اسمارٹ معاہدات",
    "solidity",
    "remix",
    "تعینات کرنا",
    "مرکبیت"
  ]
skill: advanced
lang: ur-in
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

پچھلے ٹیوٹوریلز میں ہم نے بہت کچھ سیکھا [اپنا پہلا اسمارٹ معاہدہ کیسے تعینات کریں](/developers/tutorials/deploying-your-first-smart-contract/) اور اس میں کچھ خصوصیات شامل کرنا جیسے [موڈیفائرز کے ساتھ رسائی کو کنٹرول کرنا](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) یا [Solidity میں غلطی سے نمٹنا](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)۔ اس ٹیوٹوریل میں ہم سیکھیں گے کہ ایک موجودہ معاہدے سے ایک اسمارٹ معاہدہ کیسے تعینات کیا جائے اور اس کے ساتھ تعامل کیا جائے۔

ہم ایک ایسا معاہدہ بنائیں گے جو کسی کو بھی اپنا `Counter` اسمارٹ معاہدہ رکھنے کے قابل بنائے گا اس کے لیے ایک فیکٹری بنا کر، اس کا نام `CounterFactory` ہوگا۔ سب سے پہلے یہاں ہمارے ابتدائی `Counter` اسمارٹ معاہدے کا کوڈ ہے:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "آپ معاہدے کے مالک نہیں ہیں");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "آپ کو فیکٹری استعمال کرنے کی ضرورت ہے");
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

نوٹ کریں کہ ہم نے فیکٹری کے ایڈریس اور معاہدے کے مالک کے ایڈریس کا ٹریک رکھنے کے لیے معاہدے کے کوڈ میں تھوڑی ترمیم کی ہے۔ جب آپ کسی دوسرے معاہدے سے کسی معاہدے کا کوڈ کال کرتے ہیں، تو msg.sender ہمارے معاہدے کی فیکٹری کے ایڈریس کا حوالہ دے گا۔ یہ سمجھنے کے لیے **ایک بہت اہم نکتہ ہے** کیونکہ دوسرے معاہدوں کے ساتھ تعامل کرنے کے لیے ایک معاہدے کا استعمال ایک عام رواج ہے۔ اس لیے آپ کو پیچیدہ معاملات میں اس بات کا خیال رکھنا چاہیے کہ بھیجنے والا کون ہے۔

اس کے لیے ہم نے ایک `onlyFactory` موڈیفائر بھی شامل کیا ہے جو اس بات کو یقینی بناتا ہے کہ اسٹیٹ کو تبدیل کرنے والے فنکشن کو صرف فیکٹری کے ذریعے ہی کال کیا جا سکتا ہے جو اصل کالر کو ایک پیرامیٹر کے طور پر پاس کرے گا۔

ہمارے نئے `CounterFactory` کے اندر جو دیگر تمام کاؤنٹروں کا نظم کرے گا، ہم ایک میپنگ شامل کریں گے جو ایک مالک کو اس کے کاؤنٹر معاہدے کے ایڈریس کے ساتھ منسلک کرے گا:

```solidity
mapping(address => Counter) _counters;
```

Ethereum میں، میپنگ جاوا اسکرپٹ میں آبجیکٹس کے مساوی ہیں، وہ قسم A کی کلید کو قسم B کی قدر سے میپ کرنے کے قابل بناتے ہیں۔ اس صورت میں ہم ایک مالک کے ایڈریس کو اس کے کاؤنٹر کے انسٹنس کے ساتھ میپ کرتے ہیں۔

کسی کے لیے ایک نیا کاؤنٹر شروع کرنا اس طرح نظر آئے گا:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

ہم پہلے چیک کرتے ہیں کہ آیا وہ شخص پہلے سے ہی ایک کاؤنٹر کا مالک ہے۔ اگر وہ کاؤنٹر کا مالک نہیں ہے تو ہم اس کا ایڈریس `Counter` کنسٹرکٹر کو پاس کر کے ایک نیا کاؤنٹر شروع کرتے ہیں اور نئے بنائے گئے انسٹنس کو میپنگ کو تفویض کرتے ہیں۔

ایک مخصوص کاؤنٹر کی گنتی حاصل کرنے کے لیے یہ اس طرح نظر آئے گا:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

پہلا فنکشن یہ چیک کرتا ہے کہ آیا دیے گئے ایڈریس کے لیے کاؤنٹر معاہدہ موجود ہے اور پھر انسٹنس سے `getCount` میتھڈ کو کال کرتا ہے۔ دوسرا فنکشن: `getMyCount` صرف msg.sender کو براہ راست `getCount` فنکشن میں پاس کرنے کا ایک مختصر طریقہ ہے۔

`increment` فنکشن کافی ملتا جلتا ہے لیکن اصل ٹرانزیکشن بھیجنے والے کو `Counter` معاہدے میں پاس کرتا ہے:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

نوٹ کریں کہ اگر بہت زیادہ بار کال کیا گیا، تو ہمارا کاؤنٹر ممکنہ طور پر اوور فلو کا شکار ہو سکتا ہے۔ اس ممکنہ صورتحال سے بچانے کے لیے آپ کو جتنا ممکن ہو [SafeMath لائبریری](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) کا استعمال کرنا چاہیے۔

ہمارے معاہدے کو تعینات کرنے کے لیے، آپ کو `CounterFactory` اور `Counter` دونوں کا کوڈ فراہم کرنا ہوگا۔ مثال کے طور پر Remix میں تعینات کرتے وقت آپ کو CounterFactory کو منتخب کرنے کی ضرورت ہوگی۔

مکمل کوڈ یہاں ہے:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "آپ معاہدے کے مالک نہیں ہیں");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "آپ کو فیکٹری استعمال کرنے کی ضرورت ہے");
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

کمپائل کرنے کے بعد، Remix ڈیپلائے سیکشن میں آپ تعینات کی جانے والی فیکٹری کو منتخب کریں گے:

![Remix میں تعینات کی جانے والی فیکٹری کا انتخاب](./counterfactory-deploy.png)

پھر آپ اپنی معاہدہ فیکٹری کے ساتھ کھیل سکتے ہیں اور بدلتی ہوئی قدر کو چیک کر سکتے ہیں۔ اگر آپ اسمارٹ معاہدے کو کسی مختلف ایڈریس سے کال کرنا چاہتے ہیں تو آپ کو Remix کے اکاؤنٹ سلیکٹ میں ایڈریس تبدیل کرنے کی ضرورت ہوگی۔
