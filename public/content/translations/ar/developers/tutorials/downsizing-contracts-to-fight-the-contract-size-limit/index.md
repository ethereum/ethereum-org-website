---
title: "تقليص حجم العقود لمواجهة الحد الأقصى لحجم العقد"
description: ما الذي يمكنك فعله لمنع عقودك الذكية من أن تصبح كبيرة جدًا؟
author: Markus Waas
lang: ar
tags: [ "الصلابة", "العقود الذكيه ", "التخزين" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## لماذا يوجد حد؟ {#why-is-there-a-limit}

في [22 نوفمبر 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)، قدم انقسام الشبكة الصلب Spurious Dragon [EIP-170](https://eips.ethereum.org/EIPS/eip-170) الذي أضاف حدًا لحجم العقد الذكي يبلغ 24.576 كيلوبايت. بالنسبة لك بصفتك مبرمج Solidity، فهذا يعني أنه عند إضافة المزيد والمزيد من الوظائف إلى عقدك، ستصل في مرحلة ما إلى الحد الأقصى وعند النشر سترى الخطأ:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

تم تقديم هذا الحد لمنع هجمات الحرمان من الخدمة (DOS). أي استدعاء لعقد ما يكون رخيصًا نسبيًا من حيث الغاز. ومع ذلك، فإن تأثير استدعاء العقد لعقد إيثريوم يزداد بشكل غير متناسب اعتمادًا على حجم النص البرمجي للعقد المُستدعى (قراءة النص البرمجي من القرص، والمعالجة المسبقة للنص البرمجي، وإضافة البيانات إلى إثبات Merkle). عندما تواجه مثل هذا الموقف حيث يحتاج المهاجم إلى موارد قليلة للتسبب في الكثير من العمل للآخرين، فإنك تحصل على احتمال لهجمات الحرمان من الخدمة (DOS).

في الأصل، كانت هذه مشكلة أقل لأن أحد حدود حجم العقد الطبيعي هو حد غاز الكتلة. من الواضح أنه يجب نشر العقد ضمن معاملة تحتوي على كل الكود الثنائي للعقد. إذا قمت بتضمين تلك المعاملة الواحدة فقط في كتلة، فيمكنك استهلاك كل هذا الغاز، لكنه ليس لانهائي. منذ [ترقية لندن](/ethereum-forks/#london)، أصبح حد غاز الكتلة قادرًا على التفاوت بين 15 و30 مليون وحدة اعتمادًا على طلب الشبكة.

فيما يلي، سنلقي نظرة على بعض الطرق مرتبة حسب تأثيرها المحتمل. فكر في الأمر من منظور فقدان الوزن. أفضل استراتيجية لشخص ما للوصول إلى الوزن المستهدف (في حالتنا 24 كيلوبايت) هي التركيز على الطرق ذات التأثير الكبير أولاً. في معظم الحالات، مجرد تعديل نظامك الغذائي سيوصلك إلى هناك، ولكن في بعض الأحيان تحتاج إلى المزيد. ثم قد تضيف بعض التمارين (تأثير متوسط) أو حتى المكملات الغذائية (تأثير صغير).

## تأثير كبير {#big-impact}

### افصل عقودك {#separate-your-contracts}

يجب أن يكون هذا دائمًا نهجك الأول. كيف يمكنك فصل العقد إلى عدة عقود أصغر؟ بشكل عام، يجبرك هذا على التوصل إلى بنية جيدة لعقودك. العقود الأصغر مفضلة دائمًا من منظور قابلية قراءة النص البرمجي. لفصل العقود، اسأل نفسك:

- ما هي الوظائف التي تنتمي معًا؟ قد تكون كل مجموعة من الوظائف أفضل في عقدها الخاص.
- ما هي الوظائف التي لا تتطلب قراءة حالة العقد أو مجرد مجموعة فرعية محددة من الحالة؟
- هل يمكنك فصل التخزين والوظائف؟

### المكتبات {#libraries}

إحدى الطرق البسيطة لنقل النص البرمجي للوظائف بعيدًا عن التخزين هي استخدام [مكتبة](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). لا تعلن عن وظائف المكتبة على أنها داخلية (internal) حيث سيتم [إضافتها إلى العقد](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) مباشرة أثناء التجميع. ولكن إذا كنت تستخدم وظائف عامة (public)، فستكون في الواقع في عقد مكتبة منفصل. فكر في [استخدام for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) لجعل استخدام المكتبات أكثر ملاءمة.

### البروكسيات {#proxies}

قد تكون الاستراتيجية الأكثر تقدمًا هي نظام البروكسي. تستخدم المكتبات `DELEGATECALL` في الخلفية والتي تنفذ ببساطة وظيفة عقد آخر مع حالة العقد المستدعي. اطلع على [هذه المدونة](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) لمعرفة المزيد عن أنظمة البروكسي. إنها تمنحك المزيد من الوظائف، على سبيل المثال، تتيح إمكانية الترقية، لكنها تضيف أيضًا الكثير من التعقيد. لا أود إضافتها فقط لتقليل أحجام العقود ما لم يكن هذا هو خيارك الوحيد لأي سبب كان.

## تأثير متوسط {#medium-impact}

### إزالة الوظائف {#remove-functions}

يجب أن يكون هذا واضحًا. تزيد الوظائف من حجم العقد قليلاً.

- **خارجية (External)**: في كثير من الأحيان، نضيف الكثير من وظائف العرض (view functions) لأسباب تتعلق بالراحة. هذا جيد تمامًا حتى تصل إلى الحد الأقصى للحجم. ثم قد ترغب في التفكير حقًا في إزالة جميع الوظائف باستثناء الوظائف الأساسية تمامًا.
- **داخلية (Internal)**: يمكنك أيضًا إزالة الوظائف الداخلية/الخاصة (internal/private) وببساطة تضمين النص البرمجي طالما يتم استدعاء الوظيفة مرة واحدة فقط.

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

تغيير بسيط كهذا يحدث فرقًا قدره **0.28 كيلوبايت**. من المحتمل أن تجد العديد من المواقف المماثلة في عقودك، ويمكن أن تتراكم هذه لتصل إلى كميات كبيرة.

### تقصير رسالة الخطأ {#shorten-error-message}

يمكن لرسائل الإلغاء (revert) الطويلة، وخاصة العديد من رسائل الإلغاء المختلفة، أن تضخم العقد. بدلاً من ذلك، استخدم رموز خطأ قصيرة وقم بفك تشفيرها في عقدك. يمكن أن تصبح الرسالة الطويلة أقصر بكثير:

```solidity
require(msg.sender == owner, "يمكن لمالك هذا العقد فقط استدعاء هذه الوظيفة");
```

```solidity
require(msg.sender == owner, "OW1");
```

### استخدام أخطاء مخصصة بدلاً من رسائل الخطأ

تم تقديم الأخطاء المخصصة في [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). إنها طريقة رائعة لتقليل حجم عقودك، لأنها مرمزة بترميز ABI كـ selectors (تمامًا مثل الوظائف).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### ضع في اعتبارك قيمة تشغيل منخفضة في المحسِّن {#consider-a-low-run-value-in-the-optimizer}

يمكنك أيضًا تغيير إعدادات المحسِّن. القيمة الافتراضية 200 تعني أنه يحاول تحسين الكود الثنائي كما لو تم استدعاء وظيفة 200 مرة. إذا قمت بتغييرها إلى 1، فأنت تخبر المحسِّن بشكل أساسي بالتحسين لحالة تشغيل كل وظيفة مرة واحدة فقط. الوظيفة المحسَّنة للتشغيل مرة واحدة فقط تعني أنها محسَّنة للنشر نفسه. كن على علم بأن **هذا يزيد من [تكاليف الغاز](/developers/docs/gas/) لتشغيل الوظائف**، لذلك قد لا ترغب في القيام بذلك.

## تأثير صغير {#small-impact}

### تجنب تمرير الهياكل (structs) إلى الوظائف {#avoid-passing-structs-to-functions}

إذا كنت تستخدم [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)، فقد يساعد عدم تمرير الهياكل (structs) إلى وظيفة ما. بدلاً من تمرير المعلمة كهيكل (struct)، قم بتمرير المعلمات المطلوبة مباشرة. في هذا المثال، وفرنا **0.1 كيلوبايت** أخرى.

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

### إعلان الرؤية الصحيحة للوظائف والمتغيرات {#declare-correct-visibility-for-functions-and-variables}

- وظائف أو متغيرات يتم استدعاؤها فقط من الخارج؟ أعلن عنها كـ `external` بدلاً من `public`.
- وظائف أو متغيرات يتم استدعاؤها فقط من داخل العقد؟ أعلن عنها كـ `private` أو `internal` بدلاً من `public`.

### إزالة المُعدِّلات (modifiers) {#remove-modifiers}

يمكن أن يكون للمُعدِّلات (Modifiers)، خاصة عند استخدامها بشكل مكثف، تأثير كبير على حجم العقد. فكر في إزالتها واستخدام الوظائف بدلاً من ذلك.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

يجب أن تساعدك هذه النصائح في تقليل حجم العقد بشكل كبير. مرة أخرى، لا يمكنني التأكيد بما فيه الكفاية، ركز دائمًا على تقسيم العقود إن أمكن لتحقيق أكبر تأثير.
