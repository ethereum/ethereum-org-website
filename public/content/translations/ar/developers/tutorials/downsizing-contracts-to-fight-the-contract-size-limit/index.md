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

في [22 نوفمبر 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)، قدم التفرع الكلي Spurious Dragon [<span dir="ltr">EIP-170</span>](https://eips.ethereum.org/EIPS/eip-170) والذي أضاف حدًا لحجم العقد الذكي يبلغ <span dir="ltr">24.576 kb</span>. بالنسبة لك كمطور Solidity، يعني هذا أنه عندما تضيف المزيد والمزيد من الوظائف إلى عقدك، ستصل في مرحلة ما إلى الحد الأقصى وعند النشر سترى الخطأ:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

تم تقديم هذا الحد لمنع هجمات حجب الخدمة (DOS). أي استدعاء لعقد يكون رخيصًا نسبيًا من حيث الغاز. ومع ذلك، فإن تأثير استدعاء العقد على عقد إيثيريوم يزداد بشكل غير متناسب اعتمادًا على حجم رمز العقد المستدعى (قراءة الرمز من القرص، والمعالجة المسبقة للرمز، وإضافة البيانات إلى إثبات ميركل). كلما واجهت موقفًا يتطلب فيه المهاجم موارد قليلة للتسبب في الكثير من العمل للآخرين، فإنك تحصل على احتمالية لهجمات DOS.

في الأصل، كان هذا يمثل مشكلة أقل لأن أحد الحدود الطبيعية لحجم العقد هو حد الغاز للكتلة. من الواضح أنه يجب نشر العقد ضمن معاملة تحتوي على كل رمز البايت الخاص بالعقد. إذا قمت بتضمين تلك المعاملة الواحدة فقط في كتلة، فيمكنك استهلاك كل هذا الغاز، لكنه ليس لانهائيًا. منذ [ترقية لندن](/ethereum-forks/#london)، أصبح حد الغاز للكتلة قادرًا على التغير بين <span dir="ltr">15M</span> و <span dir="ltr">30M</span> وحدة اعتمادًا على طلب الشبكة.

في ما يلي سنلقي نظرة على بعض الطرق مرتبة حسب تأثيرها المحتمل. فكر في الأمر من منظور فقدان الوزن. أفضل استراتيجية لشخص ما للوصول إلى وزنه المستهدف (في حالتنا <span dir="ltr">24kb</span>) هي التركيز على الطرق ذات التأثير الكبير أولاً. في معظم الحالات، مجرد إصلاح نظامك الغذائي سيوصلك إلى هناك، ولكن في بعض الأحيان تحتاج إلى أكثر من ذلك بقليل. ثم قد تضيف بعض التمارين (تأثير متوسط) أو حتى المكملات الغذائية (تأثير صغير).

## تأثير كبير {#big-impact}

### فصل العقود الخاصة بك {#separate-your-contracts}

يجب أن يكون هذا دائمًا هو نهجك الأول. كيف يمكنك فصل العقد إلى عدة عقود أصغر؟ يجبرك هذا بشكل عام على التوصل إلى بنية جيدة لعقودك. تُفضل العقود الأصغر دائمًا من منظور قابلية قراءة الرمز. لتقسيم العقود، اسأل نفسك:

- ما هي الدوال التي تنتمي لبعضها البعض؟ قد تكون كل مجموعة من الدوال أفضل في عقد خاص بها.
- ما هي الدوال التي لا تتطلب قراءة حالة العقد أو تتطلب فقط مجموعة فرعية محددة من الحالة؟
- هل يمكنك فصل التخزين عن الوظائف؟

### المكتبات {#libraries}

إحدى الطرق البسيطة لنقل رمز الوظائف بعيدًا عن التخزين هي استخدام [مكتبة](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). لا تقم بتعريف دوال المكتبة على أنها `internal` لأنها ستتم [إضافتها إلى العقد](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) مباشرة أثناء الترجمة (compilation). ولكن إذا استخدمت دوال `public`، فستكون هذه الدوال في الواقع في عقد مكتبة منفصل. ضع في اعتبارك استخدام [`using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) لجعل استخدام المكتبات أكثر ملاءمة.

### الوكلاء (Proxies) {#proxies}

استراتيجية أكثر تقدمًا ستكون نظام الوكيل (proxy). تستخدم المكتبات `DELEGATECALL` في الخلفية والذي ينفذ ببساطة دالة عقد آخر مع حالة العقد المستدعي. تحقق من [منشور المدونة هذا](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) لمعرفة المزيد عن أنظمة الوكلاء. إنها تمنحك المزيد من الوظائف، على سبيل المثال، تتيح إمكانية الترقية، ولكنها تضيف أيضًا الكثير من التعقيد. لن أضيفها فقط لتقليل أحجام العقود ما لم تكن خيارك الوحيد لأي سبب من الأسباب.

## تأثير متوسط {#medium-impact}

### إزالة الدوال {#remove-functions}

يجب أن يكون هذا واضحًا. تزيد الدوال من حجم العقد بشكل كبير.

- **`External`**: في كثير من الأحيان نضيف الكثير من دوال `view` لأسباب تتعلق بالراحة. هذا جيد تمامًا حتى تصل إلى حد الحجم. حينها قد ترغب في التفكير جديًا في إزالة جميع الدوال باستثناء الأساسية منها تمامًا.
- **`Internal`**: يمكنك أيضًا إزالة دوال `internal`/`private` وتضمين الرمز مباشرة (inline) طالما يتم استدعاء الدالة مرة واحدة فقط.

### تجنب المتغيرات الإضافية {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

تغيير بسيط كهذا يحدث فرقًا بمقدار **<span dir="ltr">0.28kb</span>**. من المحتمل أن تجد العديد من المواقف المشابهة في عقودك ويمكن أن تتراكم هذه المواقف لتصل إلى كميات كبيرة.

### تقصير رسالة الخطأ {#shorten-error-message}

رسائل التراجع (revert) الطويلة، وخاصة رسائل التراجع المختلفة العديدة، يمكن أن تضخم العقد. بدلاً من ذلك، استخدم رموز خطأ قصيرة وقم بفك تشفيرها في عقدك. يمكن أن تصبح الرسالة الطويلة أقصر بكثير:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### استخدام الأخطاء المخصصة بدلاً من رسائل الخطأ {#use-custom-errors-instead-of-error-messages}

تم تقديم الأخطاء المخصصة في [<span dir="ltr">Solidity 0.8.4</span>](https://blog.soliditylang.org/2021/04/21/custom-errors/). إنها طريقة رائعة لتقليل حجم عقودك، لأنها مشفرة بـ ABI كمحددات (selectors) (تمامًا مثل الدوال).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### ضع في اعتبارك قيمة تشغيل منخفضة في المُحسّن (optimizer) {#consider-a-low-run-value-in-the-optimizer}

يمكنك أيضًا تغيير إعدادات المُحسّن (optimizer). القيمة الافتراضية 200 تعني أنه يحاول تحسين رمز البايت كما لو تم استدعاء الدالة 200 مرة. إذا قمت بتغييرها إلى 1، فأنت تخبر المُحسّن أساسًا بالتحسين لحالة تشغيل كل دالة مرة واحدة فقط. الدالة المحسنة للتشغيل مرة واحدة فقط تعني أنها محسنة لعملية النشر نفسها. كن على علم بأن **هذا يزيد من [تكاليف الغاز](/developers/docs/gas/) لتشغيل الدوال**، لذلك قد لا ترغب في القيام بذلك.

## تأثير صغير {#small-impact}

### تجنب تمرير الهياكل (structs) إلى الدوال {#avoid-passing-structs-to-functions}

إذا كنت تستخدم [<span dir="ltr">ABIEncoderV2</span>](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)، فقد يساعدك عدم تمرير الهياكل (structs) إلى دالة. بدلاً من تمرير المعلمة كهيكل، قم بتمرير المعلمات المطلوبة مباشرة. في هذا المثال وفرنا **<span dir="ltr">0.1kb</span>** أخرى.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### الإعلان عن الرؤية (visibility) الصحيحة للدوال والمتغيرات {#declare-correct-visibility-for-functions-and-variables}

- الدوال أو المتغيرات التي يتم استدعاؤها فقط من الخارج؟ قم بتعريفها كـ `external` بدلاً من `public`.
- الدوال أو المتغيرات التي يتم استدعاؤها فقط من داخل العقد؟ قم بتعريفها كـ `private` أو `internal` بدلاً من `public`.

### إزالة المُعدِّلات (modifiers) {#remove-modifiers}

المُعدِّلات (modifiers)، خاصة عند استخدامها بكثافة، يمكن أن يكون لها تأثير كبير على حجم العقد. ضع في اعتبارك إزالتها واستخدام الدوال بدلاً منها.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

يجب أن تساعدك هذه النصائح على تقليل حجم العقد بشكل كبير. مرة أخرى، لا يسعني التأكيد بما فيه الكفاية، ركز دائمًا على تقسيم العقود إن أمكن للحصول على أكبر تأثير.