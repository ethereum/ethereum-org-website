---
title: "تقليص حجم العقود لمواجهة حد حجم العقد"
description: "ما الذي يمكنك فعله لمنع العقود الذكية الخاصة بك من أن تصبح كبيرة جدًا؟"
author: "ماركوس واس"
lang: ar
tags: ["Solidity", "العقود الذكية", "التخزين"]
skill: intermediate
breadcrumb: "تقليص حجم العقود"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## لماذا يوجد حد؟ {#why-is-there-a-limit}

في <span dir="ltr">[November 22, 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)</span>، قدم التفرع الصلب <span dir="ltr">Spurious Dragon</span> <span dir="ltr">[EIP-170](https://eips.ethereum.org/EIPS/eip-170)</span> الذي أضاف حدًا لحجم العقد الذكي يبلغ <span dir="ltr">24,576 bytes</span> (<span dir="ltr">24 KiB</span>). بالنسبة لك كمطور <span dir="ltr">Solidity</span>، يعني هذا أنه عندما تضيف المزيد والمزيد من الوظائف إلى عقدك، ستصل في مرحلة ما إلى الحد وسيحذرك المترجم (compiler):

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

يوجد تحذير مشابه لرمز النشر (initcode)، والذي حده <span dir="ltr">[EIP-3860](https://eips.ethereum.org/EIPS/eip-3860)</span> إلى <span dir="ltr">49,152 bytes</span> في ترقية شانغهاي.

هذا الحد ليس دائمًا. يرفعه <span dir="ltr">[EIP-7954](https://eips.ethereum.org/EIPS/eip-7954)</span> إلى <span dir="ltr">65,536 bytes</span> (<span dir="ltr">64 KiB</span>)، وحد رمز النشر إلى <span dir="ltr">131,072 bytes</span>، ومن المقرر إدراجه في [ترقية غلامستردام](/roadmap/glamsterdam/). حتى يتم تفعيل تلك الترقية على الشبكة التي تنشر عليها، فإن <span dir="ltr">24,576 bytes</span> هو الحد هناك، وحتى بعد ذلك تظل العقود الأصغر أرخص في النشر وأسهل في التدقيق.

تم تقديم هذا الحد لمنع هجمات الحرمان من الخدمة (<span dir="ltr">DOS</span>). أي استدعاء لعقد يعتبر رخيصًا نسبيًا من حيث الغاز. ومع ذلك، فإن تأثير استدعاء العقد على عُقد إيثيريوم يزداد بشكل غير متناسب اعتمادًا على حجم رمز العقد المستدعى (قراءة الرمز من القرص، المعالجة المسبقة للرمز، إضافة البيانات إلى إثبات ميركل). كلما واجهت موقفًا يتطلب فيه المهاجم موارد قليلة للتسبب في الكثير من العمل للآخرين، فإنك تحصل على إمكانية حدوث هجمات <span dir="ltr">DOS</span>.

في الأصل، كان هذا يمثل مشكلة أقل لأن أحد الحدود الطبيعية لحجم العقد هو حد غاز الكتلة. من الواضح أنه يجب نشر العقد ضمن معاملة تحتوي على كل رمز البايت الخاص بالعقد. إذا قمت بتضمين تلك المعاملة الواحدة فقط في كتلة، فيمكنك استهلاك كل هذا الغاز، لكنه ليس لا نهائيًا. اليوم، يبلغ حد غاز الكتلة عشرات الملايين من الغاز وقد تم رفعه عدة مرات بواسطة المدققين، لذا بمفرده سيسمح بعقود كبيرة جدًا. منذ [ترقية فوساكا](/roadmap/fusaka/)، تم أيضًا وضع حد أقصى لمعاملة واحدة عند <span dir="ltr">16,777,216 gas</span> (<span dir="ltr">[EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)</span>)، ولكن هذا لا يزال أعلى بكثير مما يكلفه نشر عقد بحجم <span dir="ltr">24 KiB</span>، ولهذا السبب هناك حاجة إلى حد صريح للحجم.

فيما يلي سنلقي نظرة على بعض الطرق مرتبة حسب تأثيرها المحتمل. فكر في الأمر من منظور فقدان الوزن. أفضل استراتيجية لشخص ما للوصول إلى وزنه المستهدف (في حالتنا <span dir="ltr">24kb</span>) هي التركيز على الطرق ذات التأثير الكبير أولاً. في معظم الحالات، مجرد إصلاح نظامك الغذائي سيوصلك إلى هناك، ولكن في بعض الأحيان تحتاج إلى أكثر من ذلك بقليل. ثم قد تضيف بعض التمارين (تأثير متوسط) أو حتى المكملات الغذائية (تأثير صغير).

## تأثير كبير {#big-impact}

### فصل العقود الخاصة بك {#separate-your-contracts}

يجب أن يكون هذا دائمًا هو نهجك الأول. كيف يمكنك فصل العقد إلى عدة عقود أصغر؟ يجبرك هذا بشكل عام على التوصل إلى بنية جيدة لعقودك. تُفضل العقود الأصغر دائمًا من منظور قابلية قراءة الرمز. لتقسيم العقود، اسأل نفسك:

- ما هي الدوال التي تنتمي لبعضها البعض؟ قد تكون كل مجموعة من الدوال أفضل في عقد خاص بها.
- ما هي الدوال التي لا تتطلب قراءة حالة العقد أو تتطلب فقط مجموعة فرعية محددة من الحالة؟
- هل يمكنك فصل التخزين عن الوظائف؟

### المكتبات {#libraries}

إحدى الطرق البسيطة لنقل رمز الوظائف بعيدًا عن التخزين هي استخدام [مكتبة](https://docs.soliditylang.org/en/latest/contracts.html#libraries). لا تقم بتعريف دوال المكتبة على أنها `internal` لأنها ستتم [إضافتها إلى العقد](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) مباشرة أثناء الترجمة (compilation). ولكن إذا استخدمت دوال `public`، فستكون هذه الدوال في الواقع في عقد مكتبة منفصل. ضع في اعتبارك استخدام [`using for`](https://docs.soliditylang.org/en/latest/contracts.html#using-for) لجعل استخدام المكتبات أكثر ملاءمة.

### الوكلاء (Proxies) {#proxies}

ستكون الاستراتيجية الأكثر تقدمًا هي نظام الوكيل (proxy). تستخدم المكتبات `DELEGATECALL` في الخلفية والذي ينفذ ببساطة دالة عقد آخر مع حالة العقد المستدعي. تحقق من [ترقية العقود الذكية](/developers/docs/smart-contracts/upgrading/) لمعرفة المزيد عن أنظمة الوكلاء. إنها تمنحك المزيد من الوظائف، على سبيل المثال، تتيح إمكانية الترقية، ولكنها تضيف أيضًا الكثير من التعقيد. لن أضيفها فقط لتقليل أحجام العقود ما لم تكن خيارك الوحيد لأي سبب من الأسباب.

## تأثير متوسط {#medium-impact}

### إزالة الدوال {#remove-functions}

يجب أن يكون هذا واضحًا. تزيد الدوال من حجم العقد بشكل كبير.

- **`External`**: في كثير من الأحيان نضيف الكثير من دوال `view` لأسباب تتعلق بالراحة. هذا جيد تمامًا حتى تصل إلى حد الحجم. حينها قد ترغب في التفكير جديًا في إزالة جميع الدوال باستثناء الأساسية منها تمامًا.
- **`Internal`**: يمكنك أيضًا إزالة دوال `internal`/`private` وتضمين الرمز مباشرة (inline) طالما يتم استدعاء الدالة مرة واحدة فقط.

### تجنب المتغيرات الإضافية {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

أحدث تغيير بسيط كهذا فرقًا بمقدار **<span dir="ltr">0.28kb</span>** عند كتابة هذا المقال. تعتمد المدخرات الدقيقة على إصدار المترجم (compiler) وإعداداته (مع <span dir="ltr">Solidity 0.8.37</span> يبلغ حوالي <span dir="ltr">0.1kb</span> بدون المُحسِّن (optimizer) وأقل بكثير معه)، لذا قم بالقياس دائمًا. من المحتمل أن تجد العديد من المواقف المشابهة في عقودك ويمكن أن تتراكم هذه المواقف لتصل إلى مقادير كبيرة.

### تقصير رسالة الخطأ {#shorten-error-message}

رسائل التراجع (revert) الطويلة، وخاصة رسائل التراجع المختلفة العديدة، يمكن أن تضخم العقد. بدلاً من ذلك، استخدم رموز خطأ قصيرة وقم بفك تشفيرها في عقدك. يمكن أن تصبح الرسالة الطويلة أقصر بكثير:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### استخدام الأخطاء المخصصة بدلاً من رسائل الخطأ {#use-custom-errors-instead-of-error-messages}

تم تقديم الأخطاء المخصصة في <span dir="ltr">[Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)</span>. إنها طريقة رائعة لتقليل حجم عقودك، لأنها مشفرة بـ <span dir="ltr">ABI</span> كمحددات (selectors) (تمامًا مثل الدوال).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### ضع في اعتبارك قيمة تشغيل منخفضة في المُحسِّن (optimizer) {#consider-a-low-run-value-in-the-optimizer}

يمكنك أيضًا تغيير إعدادات المُحسِّن. القيمة الافتراضية <span dir="ltr">200</span> تعني أنه يحاول تحسين رمز البايت كما لو تم استدعاء دالة <span dir="ltr">200</span> مرة. إذا قمت بتغييرها إلى <span dir="ltr">1</span>، فأنت تخبر المُحسِّن أساسًا بالتحسين لحالة تشغيل كل دالة مرة واحدة فقط. الدالة المحسنة للتشغيل مرة واحدة فقط تعني أنها محسنة للنشر نفسه. كن على علم بأن **هذا يزيد من [تكاليف الغاز](/developers/docs/gas/) لتشغيل الدوال**، لذلك قد لا ترغب في القيام بذلك. إذا قمت بالترجمة مع تمكين `viaIR`، فتحقق من الحجم معه وبدونه، حيث يمكن لمولد الرمز القائم على <span dir="ltr">IR</span> إنتاج أحجام رمز البايت مختلفة بشكل ملحوظ. راجع [خيارات المُحسِّن](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) للحصول على التفاصيل.

## تأثير صغير {#small-impact}

### تجنب تمرير الهياكل (structs) إلى الدوال {#avoid-passing-structs-to-functions}

إذا كنت تستخدم <span dir="ltr">[ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma)</span> (الافتراضي منذ <span dir="ltr">Solidity 0.8.0</span>)، فقد يساعدك عدم تمرير الهياكل إلى دالة. بدلاً من تمرير المعلمة كهيكل، قم بتمرير المعلمات المطلوبة مباشرة. في هذا المثال وفرنا **<span dir="ltr">0.1kb</span>** أخرى.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### الإعلان عن الرؤية (visibility) الصحيحة للدوال والمتغيرات {#declare-correct-visibility-for-functions-and-variables}

- الدوال أو المتغيرات التي يتم استدعاؤها فقط من الخارج؟ قم بتعريفها كـ `external` بدلاً من `public`.
- الدوال أو المتغيرات التي يتم استدعاؤها فقط من داخل العقد؟ قم بتعريفها كـ `private` أو `internal` بدلاً من `public`.

### إزالة المُعدِّلات (modifiers) {#remove-modifiers}

يمكن أن يكون للمُعدِّلات، خاصة عند استخدامها بكثافة، تأثير كبير على حجم العقد. ضع في اعتبارك إزالتها واستخدام الدوال بدلاً من ذلك.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

يجب أن تساعدك هذه النصائح على تقليل حجم العقد بشكل كبير. مرة أخرى، لا يمكنني التأكيد بما فيه الكفاية، ركز دائمًا على تقسيم العقود إن أمكن للحصول على أكبر تأثير.
