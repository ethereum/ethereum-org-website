---
title: "تفاعل مع العقود الأخرى من سوليديتي"
description: "كيفية نشر عقد ذكي من عقد موجود والتفاعل معه"
author: "jdourlens"
tags:
  [
    "العقود الذكيه ",
    "الصلابة",
    "remix",
    "نشر",
    "قابلية التركيب"
  ]
skill: advanced
lang: ar
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في الدروس التعليمية السابقة، تعلمنا الكثير [كيفية نشر أول عقد ذكي لك](/developers/tutorials/deploying-your-first-smart-contract/) وإضافة بعض الميزات إليه مثل [التحكم في الوصول باستخدام المعدِّلات](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) أو [معالجة الأخطاء في سوليديتي](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). في هذا الدرس التعليمي، سنتعلم كيفية نشر عقد ذكي من عقد موجود والتفاعل معه.

سننشئ عقدًا يمكّن أي شخص من الحصول على عقد `Counter` الذكي الخاص به عن طريق إنشاء مصنع له، وسيكون اسمه `CounterFactory`. أولاً، إليك النص البرمجي لعقد `Counter` الذكي المبدئي الخاص بنا:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "أنت لست مالك العقد");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "تحتاج إلى استخدام المصنع");
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

لاحظ أننا عدّلنا النص البرمجي للعقد قليلاً لتتبع عنوان المصنع وعنوان مالك العقد. عند استدعاء نص برمجي لعقد من عقد آخر، سيشير `msg.sender` إلى عنوان مصنع العقد الخاص بنا. هذه **نقطة مهمة جدًا يجب فهمها** حيث إن استخدام عقد للتفاعل مع عقود أخرى ممارسة شائعة. لذلك يجب عليك الانتباه إلى من هو المرسل في الحالات المعقدة.

لهذا أضفنا أيضًا معدِّل `onlyFactory` الذي يضمن أن دالة تغيير الحالة لا يمكن استدعاؤها إلا من قبل المصنع الذي سيمرر المتصل الأصلي كمعامل.

داخل `CounterFactory` الجديد الخاص بنا الذي سيدير جميع عدادات `Counters` الأخرى، سنضيف تعيينًا سيربط المالك بعنوان عقد العداد الخاص به:

```solidity
mapping(address => Counter) _counters;
```

في إيثريوم، التعيينات (mappings) تعادل الكائنات (objects) في جافاسكريبت، فهي تتيح تعيين مفتاح من النوع A إلى قيمة من النوع B. في هذه الحالة، نقوم بتعيين عنوان المالك مع نسخة من `Counter` الخاص به.

إنشاء نسخة جديدة من `Counter` لشخص ما سيبدو هكذا:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

نتحقق أولاً مما إذا كان الشخص يمتلك بالفعل عدادًا. إذا لم يكن يمتلك عدادًا، نقوم بإنشاء عداد جديد عن طريق تمرير عنوانه إلى مُنشئ `Counter` وتعيين النسخة المنشأة حديثًا إلى التعيين.

للحصول على عدد عداد `Counter` معين، سيبدو الأمر هكذا:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

تتحقق الدالة الأولى مما إذا كان عقد `Counter` موجودًا لعنوان معين ثم تستدعي طريقة `getCount` من النسخة. الدالة الثانية: `getMyCount` هي مجرد نهاية قصيرة لتمرير `msg.sender` مباشرة إلى دالة `getCount`.

دالة `increment` مماثلة تمامًا لكنها تمرر مرسل المعاملة الأصلي إلى عقد `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

لاحظ أنه إذا تم استدعاؤه مرات عديدة، فقد يكون العداد الخاص بنا ضحية لفيضان (overflow). يجب عليك استخدام [مكتبة SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) قدر الإمكان للحماية من هذه الحالة المحتملة.

لنشر عقدنا، ستحتاج إلى توفير كل من النص البرمجي لـ `CounterFactory` و `Counter`. عند النشر على سبيل المثال في Remix، ستحتاج إلى تحديد `CounterFactory`.

إليك النص البرمجي الكامل:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "أنت لست مالك العقد");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "تحتاج إلى استخدام المصنع");
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

بعد التجميع، في قسم النشر في Remix ستحدد المصنع الذي سيتم نشره:

![تحديد المصنع الذي سيتم نشره في Remix](./counterfactory-deploy.png)

بعد ذلك يمكنك اللعب بمصنع العقد الخاص بك والتحقق من تغير القيمة. إذا كنت ترغب في استدعاء العقد الذكي من عنوان مختلف، فستحتاج إلى تغيير العنوان في تحديد الحساب في Remix.
