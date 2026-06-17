---
title: "التفاعل مع العقود الأخرى من ⁦Solidity⁩"
description: "كيفية نشر عقد ذكي من عقد موجود والتفاعل معه"
author: jdourlens
tags:
  - العقود الذكية
  - solidity
  - remix
  - النشر
  - قابلية التركيب
skill: advanced
breadcrumb: "تفاعلات العقد"
lang: ar
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في البرامج التعليمية السابقة، تعلمنا الكثير حول [كيفية نشر أول عقد ذكي لك](/developers/tutorials/deploying-your-first-smart-contract/) وإضافة بعض الميزات إليه مثل [التحكم في الوصول باستخدام المُعدِّلات](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) أو [معالجة الأخطاء في ⁦Solidity⁩](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). في هذا البرنامج التعليمي، سنتعلم كيفية نشر عقد ذكي من عقد موجود والتفاعل معه.

سنقوم بإنشاء عقد يمكّن أي شخص من امتلاك عقد ذكي `Counter` خاص به عن طريق إنشاء مصنع له، وسيكون اسمه `CounterFactory`. أولاً، إليك كود العقد الذكي `Counter` الأولي الخاص بنا:

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

لاحظ أننا قمنا بتعديل كود العقد قليلاً لتتبع عنوان المصنع وعنوان مالك العقد. عندما تستدعي كود عقد من عقد آخر، سيشير <span dir="ltr">msg.sender</span> إلى عنوان مصنع العقود الخاص بنا. هذه **نقطة مهمة حقًا يجب فهمها** لأن استخدام عقد للتفاعل مع عقود أخرى هو ممارسة شائعة. لذلك يجب عليك الانتباه إلى من هو المرسل في الحالات المعقدة.

لهذا أضفنا أيضًا مُعدِّل `onlyFactory` للتأكد من أن دالة تغيير الحالة لا يمكن استدعاؤها إلا بواسطة المصنع الذي سيمرر المتصل الأصلي كمعلمة.

داخل `CounterFactory` الجديد الخاص بنا والذي سيدير جميع العدادات الأخرى، سنضيف تعيينًا (mapping) يربط المالك بعنوان عقد العداد الخاص به:

```solidity
mapping(address => Counter) _counters;
```

في إيثيريوم، التعيينات (mappings) تعادل الكائنات (objects) في JavaScript، فهي تتيح تعيين مفتاح من النوع <span dir="ltr">A</span> إلى قيمة من النوع <span dir="ltr">B</span>. في هذه الحالة، نقوم بتعيين عنوان المالك مع نسخة العداد الخاصة به.

سيبدو إنشاء نسخة جديدة من العداد لشخص ما هكذا:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

نتحقق أولاً مما إذا كان الشخص يمتلك عدادًا بالفعل. إذا لم يكن يمتلك عدادًا، نقوم بإنشاء عداد جديد عن طريق تمرير عنوانه إلى مُنشئ `Counter` وتعيين النسخة المنشأة حديثًا إلى التعيين (mapping).

للحصول على عدد عداد معين، سيبدو الأمر هكذا:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

تتحقق الدالة الأولى مما إذا كان عقد العداد موجودًا لعنوان معين ثم تستدعي طريقة `getCount` من النسخة. الدالة الثانية: `getMyCount` هي مجرد اختصار لتمرير <span dir="ltr">msg.sender</span> مباشرة إلى دالة `getCount`.

دالة `increment` مشابهة تمامًا ولكنها تمرر مرسل المعاملة الأصلي إلى عقد `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

لاحظ أنه إذا تم استدعاؤه مرات عديدة، فقد يقع العداد الخاص بنا ضحية تجاوز السعة. يجب عليك استخدام مكتبة [SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) قدر الإمكان للحماية من هذه الحالة المحتملة.

لنشر العقد الخاص بنا، ستحتاج إلى توفير كود كل من `CounterFactory` و `Counter`. عند النشر على سبيل المثال في Remix، ستحتاج إلى تحديد <span dir="ltr">CounterFactory</span>.

إليك الكود الكامل:

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

بعد التصريف، في قسم النشر في Remix، ستحدد المصنع الذي سيتم نشره:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

ثم يمكنك تجربة مصنع العقود الخاص بك والتحقق من تغير القيمة. إذا كنت ترغب في استدعاء العقد الذكي من عنوان مختلف، فستحتاج إلى تغيير العنوان في قائمة تحديد الحساب (Account) في Remix.