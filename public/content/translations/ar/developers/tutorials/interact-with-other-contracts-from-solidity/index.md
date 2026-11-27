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
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في البرامج التعليمية السابقة، تعلمنا الكثير حول [كيفية نشر عقدك الذكي الأول](/developers/tutorials/deploying-your-first-smart-contract/) وإضافة بعض الميزات إليه مثل [التحكم في الوصول باستخدام المُعدِّلات](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) أو [معالجة الأخطاء في Solidity](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions). في هذا البرنامج التعليمي، سنتعلم كيفية نشر عقد ذكي من عقد موجود والتفاعل معه.

سنقوم بإنشاء عقد يمكّن أي شخص من امتلاك عقد `Counter` الذكي الخاص به عن طريق إنشاء مصنع له، وسيكون اسمه `CounterFactory`. أولاً، إليك كود عقد `Counter` الذكي الأولي الخاص بنا:

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

لاحظ أننا قمنا بتعديل كود العقد قليلاً لتتبع عنوان المصنع وعنوان مالك العقد. عندما تستدعي كود عقد من عقد آخر، سيشير <span dir="ltr">msg.sender</span> إلى عنوان مصنع العقود الخاص بنا. هذه **نقطة مهمة حقًا يجب فهمها** لأن استخدام عقد للتفاعل مع عقود أخرى هو ممارسة شائعة. لذلك يجب عليك الانتباه إلى من هو المرسل في الحالات المعقدة.

لهذا أضفنا أيضًا مُعدِّل `onlyFactory` الذي يتأكد من أن الدالة التي تغير الحالة لا يمكن استدعاؤها إلا بواسطة المصنع الذي سيمرر المتصل الأصلي كمعلمة.

داخل `CounterFactory` الجديد الخاص بنا والذي سيدير جميع العدادات الأخرى، سنضيف تعيينًا يربط المالك بعنوان عقد العداد الخاص به:

```solidity
mapping(address => Counter) _counters;
```

في Solidity، تشبه [التعيينات](https://docs.soliditylang.org/en/latest/types.html#mapping-types) الكائنات في JavaScript: فهي تربط مفتاحًا من النوع <span dir="ltr">A</span> بقيمة من النوع <span dir="ltr">B</span>. في هذه الحالة، نربط عنوان المالك بمثيل العداد الخاص به.

سيبدو إنشاء مثيل جديد لعداد لشخص ما هكذا:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

نتحقق أولاً مما إذا كان الشخص يمتلك عدادًا بالفعل. يُرجع التعيين القيمة الافتراضية للمفاتيح التي لم يتم تعيينها مطلقًا، والتي تكون بالنسبة لنوع العقد هي العنوان الصفري، لذلك نقارن عنوان العقد المخزن مع `address(0)`. إذا لم يكن يمتلك عدادًا، فإننا ننشئ عدادًا جديدًا عن طريق تمرير عنوانه إلى مُنشئ `Counter` ونقوم بتعيين المثيل المنشأ حديثًا إلى التعيين.

للحصول على عدد عداد معين، سيبدو الأمر هكذا:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

تتحقق الدالة الأولى مما إذا كان عقد العداد موجودًا لعنوان معين ثم تستدعي طريقة `getCount` من المثيل. الدالة الثانية: `getMyCount` هي مجرد اختصار لتمرير <span dir="ltr">msg.sender</span> مباشرة إلى دالة `getCount`.

دالة `increment` مشابهة تمامًا ولكنها تمرر مرسل المعاملة الأصلي إلى عقد `Counter`:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

منذ الإصدار <span dir="ltr">0.8</span> من Solidity، يتم [التحقق من العمليات الحسابية افتراضيًا](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): إذا حدث تجاوز لسعة `_count`، فإن `_count++` سيتسبب في تراجع المعاملة بدلاً من الالتفاف بصمت، لذلك ليست هناك حاجة إلى مكتبة إضافية مثل <span dir="ltr">SafeMath</span>.

لنشر عقدنا، ستحتاج إلى توفير كود كل من `CounterFactory` و`Counter`. عند النشر على سبيل المثال في Remix، ستحتاج إلى تحديد <span dir="ltr">CounterFactory</span>.

إليك الكود الكامل:

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

بعد التصريف، في قسم النشر في Remix، ستحدد المصنع الذي سيتم نشره:

![تحديد المصنع الذي سيتم نشره في Remix](./counterfactory-deploy.png)

بعد ذلك يمكنك تجربة مصنع العقود الخاص بك والتحقق من تغير القيمة. إذا كنت ترغب في استدعاء العقد الذكي من عنوان مختلف، فستحتاج إلى تغيير العنوان في قائمة تحديد الحساب (<span dir="ltr">Account</span>) في Remix.
