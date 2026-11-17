---
title: "كيفية استخدام إيكيدنا لاختبار العقود الذكية"
description: "كيفية استخدام إيكيدنا لاختبار العقود الذكية تلقائيًا"
author: "تريل أوف بيتس"
lang: ar
tags: ["Solidity", "العقود الذكية", "الأمان", "الاختبار", "الاختبار العشوائي"]
skill: advanced
breadcrumb: "إيكيدنا"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## التثبيت {#installation}

يمكن تثبيت إيكيدنا من خلال Docker أو Homebrew أو باستخدام الملف الثنائي المترجم مسبقًا. تم اختبار الأمثلة في هذا البرنامج التعليمي باستخدام إيكيدنا <span dir="ltr">2.3.3</span> و solc <span dir="ltr">0.8.37</span>.

### إيكيدنا من خلال Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_يقوم الأمر الأخير بتشغيل صورة إيكيدنا في Docker لديه حق الوصول إلى دليلك الحالي. يمكنك تغيير الملفات من مضيفك، وتشغيل الأدوات على الملفات من Docker. تأتي الصورة أيضًا مزودة بـ [سليذر](https://github.com/crytic/slither) و [crytic-compile](https://github.com/crytic/crytic-compile) و [solc-select](https://github.com/crytic/solc-select)._

داخل Docker، قم بتشغيل:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### الملف الثنائي {#binary}

قم بتنزيل أحدث إصدار لمنصتك من [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). على macOS أو Linux، يمكنك أيضًا تشغيل `brew install echidna`، والذي يقوم بتثبيت سليذر و crytic-compile معه.

عند استخدام الملف الثنائي للإصدار، قم بتثبيت [سليذر](https://github.com/crytic/slither) و [solc-select](https://github.com/crytic/solc-select) بنفسك (على سبيل المثال `pip3 install slither-analyzer solc-select` في بيئة Python افتراضية) وحدد إصدار المترجم:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

يعمل إيكيدنا بدون سليذر، لكن سليذر يستخرج الثوابت مثل الأرقام السحرية المستخدمة في عبارات `require`، وتعتمد العديد من الأمثلة أدناه عليه للعثور على الأخطاء بسرعة.

## مقدمة إلى الاختبار العشوائي القائم على الخصائص {#introduction-to-property-based-fuzzing}

إيكيدنا هو أداة اختبار عشوائي قائمة على الخصائص، وقد وصفناه في منشورات مدونتنا السابقة ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)، [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)، [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### الاختبار العشوائي (Fuzzing) {#fuzzing}

يُعد [الاختبار العشوائي](https://wikipedia.org/wiki/Fuzzing) تقنية معروفة في مجتمع الأمان. وتتكون من توليد مدخلات عشوائية إلى حد ما للعثور على أخطاء في البرنامج. تُعرف أدوات الاختبار العشوائي للبرامج التقليدية (مثل [AFL](http://lcamtuf.coredump.cx/afl/) أو [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) بأنها أدوات فعالة للعثور على الأخطاء.

بالإضافة إلى التوليد العشوائي البحت للمدخلات، هناك العديد من التقنيات والاستراتيجيات لتوليد مدخلات جيدة، بما في ذلك:

- الحصول على ملاحظات من كل عملية تنفيذ وتوجيه التوليد باستخدامها. على سبيل المثال، إذا أدى إدخال تم إنشاؤه حديثًا إلى اكتشاف مسار جديد، فقد يكون من المنطقي إنشاء مدخلات جديدة قريبة منه.
- توليد الإدخال مع احترام قيد هيكلي. على سبيل المثال، إذا كان الإدخال الخاص بك يحتوي على رأس مع مجموع اختباري (checksum)، فسيكون من المنطقي السماح لأداة الاختبار العشوائي بإنشاء إدخال يتحقق من صحة المجموع الاختباري.
- استخدام مدخلات معروفة لتوليد مدخلات جديدة: إذا كان لديك وصول إلى مجموعة بيانات كبيرة من المدخلات الصالحة، فيمكن لأداة الاختبار العشوائي الخاصة بك إنشاء مدخلات جديدة منها، بدلاً من البدء من الصفر في توليدها. وتسمى هذه عادةً _البذور (seeds)_.

### الاختبار العشوائي القائم على الخصائص {#property-based-fuzzing}

ينتمي إيكيدنا إلى عائلة محددة من أدوات الاختبار العشوائي: الاختبار العشوائي القائم على الخصائص المستوحى بشكل كبير من [QuickCheck](https://wikipedia.org/wiki/QuickCheck). على عكس أدوات الاختبار العشوائي الكلاسيكية التي ستحاول العثور على الأعطال، سيحاول إيكيدنا كسر الثوابت (invariants) المحددة من قبل المستخدم.

في العقود الذكية، الثوابت هي دوال Solidity، والتي يمكن أن تمثل أي حالة غير صحيحة أو غير صالحة يمكن أن يصل إليها العقد، بما في ذلك:

- التحكم غير الصحيح في الوصول: أصبح المهاجم مالك العقد.
- آلة حالة غير صحيحة: يمكن نقل الرموز المميزة أثناء إيقاف العقد مؤقتًا.
- حساب غير صحيح: يمكن للمستخدم التسبب في تجاوز السعة السفلي (underflow) لرصيده والحصول على رموز مميزة مجانية غير محدودة.

### اختبار خاصية باستخدام إيكيدنا {#testing-a-property-with-echidna}

سنرى كيفية اختبار عقد ذكي باستخدام إيكيدنا. الهدف هو العقد الذكي التالي [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

سنفترض أن هذا الرمز المميز يجب أن يحتوي على الخصائص التالية:

- يمكن لأي شخص أن يمتلك بحد أقصى <span dir="ltr">1000</span> رمز مميز
- لا يمكن نقل الرمز المميز (إنه ليس رمز <span dir="ltr">ERC-20</span> مميز)

### كتابة خاصية {#write-a-property}

خصائص إيكيدنا هي دوال Solidity. يجب أن تكون الخاصية:

- لا تحتوي على أي وسيطة (argument)
- تُرجع `true` إذا كانت ناجحة
- يبدأ اسمها بـ `echidna`

سيقوم إيكيدنا بما يلي:

- توليد معاملات عشوائية تلقائيًا لاختبار الخاصية.
- الإبلاغ عن أي معاملات تؤدي إلى إرجاع الخاصية لـ `false` أو طرح خطأ.
- تجاهل الآثار الجانبية عند استدعاء خاصية (أي، إذا قامت الخاصية بتغيير متغير حالة، فسيتم تجاهله بعد الاختبار)

تتحقق الخاصية التالية من أن المتصل ليس لديه أكثر من <span dir="ltr">1000</span> رمز مميز:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

استخدم الوراثة لفصل عقدك عن خصائصك:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

يقوم [`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) بتنفيذ الخاصية ويرث من الرمز المميز.

### تهيئة عقد {#initiate-a-contract}

يحتاج إيكيدنا إلى [مُنشئ](/developers/docs/smart-contracts/anatomy/#constructor-functions) بدون وسيطة. إذا كان عقدك يحتاج إلى تهيئة محددة، فأنت بحاجة إلى القيام بذلك في المُنشئ.

هناك بعض العناوين المحددة في إيكيدنا:

- `0x30000` والذي يستدعي المُنشئ.
- `0x10000` و `0x20000` و `0x30000` والتي تستدعي الدوال الأخرى بشكل عشوائي.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` حيث يتم نشر العقد قيد الاختبار.

لا نحتاج إلى أي تهيئة معينة في مثالنا الحالي، ونتيجة لذلك فإن المُنشئ الخاص بنا فارغ.

### تشغيل إيكيدنا {#run-echidna}

يتم تشغيل إيكيدنا باستخدام:

```sh
echidna contract.sol
```

إذا كان contract.sol يحتوي على عقود متعددة، فيمكنك تحديد الهدف:

```sh
echidna contract.sol --contract MyContract
```

عند تشغيله في وحدة طرفية، يعرض إيكيدنا واجهة مستخدم تفاعلية. أضف `--format text` للحصول على مخرجات نصية عادية مثل الأمثلة أدناه.

### ملخص: اختبار خاصية {#summary-testing-a-property}

يلخص ما يلي تشغيل إيكيدنا على مثالنا:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

وجد إيكيدنا أنه يتم انتهاك الخاصية إذا تم استدعاء `backdoor`.

## تصفية الدوال التي سيتم استدعاؤها أثناء حملة اختبار عشوائي {#filtering-functions-to-call-during-a-fuzzing-campaign}

سنرى كيفية تصفية الدوال التي سيتم اختبارها عشوائيًا.
الهدف هو العقد الذكي التالي:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

يجبر هذا المثال الصغير إيكيدنا على العثور على تسلسل معين من المعاملات لتغيير متغير حالة.
هذا أمر صعب بالنسبة لأداة الاختبار العشوائي.
يمكننا تشغيل إيكيدنا للتحقق من ذلك:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### تصفية الدوال {#filtering-functions}

يواجه إيكيدنا مشكلة في العثور على التسلسل الصحيح لاختبار هذا العقد لأن دالتي إعادة التعيين (`reset1` و `reset2`) ستعينان جميع متغيرات الحالة إلى `false`.
ومع ذلك، يمكننا استخدام ميزة خاصة في إيكيدنا إما لإدراج دالة إعادة التعيين في القائمة السوداء أو لإدراج دوال `f` و `g` و `h` و `i` فقط في القائمة البيضاء.

لإدراج الدوال في القائمة السوداء، يمكننا استخدام ملف التكوين هذا:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

نهج آخر لتصفية الدوال هو سرد الدوال المدرجة في القائمة البيضاء. للقيام بذلك، يمكننا استخدام ملف التكوين هذا:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` هي `true` افتراضيًا.
- يتم إجراء التصفية على اسم الدالة الكامل: اسم العقد، و `.`، وتوقيع واجهة التطبيق الثنائية (ABI) (على سبيل المثال `C.f(uint256)`). إذا كان لديك `f()` و `f(uint256)`، فيمكنك اختيار أيهما تريد تصفيته بالضبط. الاسم المجرد مثل `"reset1"` لا يطابق أي شيء.

### تشغيل إيكيدنا {#run-echidna-1}

لتشغيل إيكيدنا باستخدام ملف تكوين `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

سيجد إيكيدنا تسلسل المعاملات لتزييف الخاصية على الفور تقريبًا.

### ملخص: تصفية الدوال {#summary-filtering-functions}

يمكن لإيكيدنا إما إدراج الدوال في القائمة السوداء أو القائمة البيضاء لاستدعائها أثناء حملة اختبار عشوائي باستخدام:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

يبدأ إيكيدنا حملة اختبار عشوائي إما بإدراج `C.f1()` و `C.f2()` و `C.f3()` في القائمة السوداء أو استدعاء هذه الدوال فقط، وفقًا لقيمة المتغير المنطقي `filterBlacklist`.

## كيفية اختبار تأكيد Solidity باستخدام إيكيدنا {#how-to-test-soliditys-assert-with-echidna}

في هذا البرنامج التعليمي القصير، سنوضح كيفية استخدام إيكيدنا لاختبار التحقق من التأكيد في العقود. لنفترض أن لدينا عقدًا مثل هذا:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

منذ الإصدار <span dir="ltr">0.8</span> من Solidity، تتراجع تجاوزات السعة الحسابية افتراضيًا. تستعيد كتلة `unchecked` سلوك الالتفاف (wrapping) بحيث يمكن لـ `counter` تجاوز السعة، وهو الخطأ الذي نريد من إيكيدنا العثور عليه.

### كتابة تأكيد {#write-an-assertion}

نريد التأكد من أن `tmp` أقل من أو يساوي `counter` بعد إرجاع الفرق بينهما. يمكننا كتابة خاصية إيكيدنا، لكننا سنحتاج إلى تخزين قيمة `tmp` في مكان ما. بدلاً من ذلك، يمكننا استخدام تأكيد مثل هذا:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### تشغيل إيكيدنا {#run-echidna-2}

لتمكين اختبار فشل التأكيد، قم بتمرير `--test-mode assertion` في سطر الأوامر، أو قم بإنشاء [ملف تكوين إيكيدنا](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

عندما نقوم بتشغيل هذا العقد في إيكيدنا، نحصل على النتائج المتوقعة:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

كما ترى، يبلغ إيكيدنا عن بعض فشل التأكيد في دالة `inc`. من الممكن إضافة أكثر من تأكيد واحد لكل دالة، لكن إيكيدنا لا يمكنه تحديد التأكيد الذي فشل.

### متى وكيف تستخدم التأكيدات {#when-and-how-use-assertions}

يمكن استخدام التأكيدات كبدائل للخصائص الصريحة، خاصة إذا كانت الشروط المراد التحقق منها مرتبطة بشكل مباشر بالاستخدام الصحيح لعملية ما `f`. ستفرض إضافة التأكيدات بعد بعض التعليمات البرمجية حدوث التحقق فور تنفيذها:

```solidity
function f(..) public {
    // بعض التعليمات البرمجية المعقدة
    ...
    assert (condition);
    ...
}

```

على العكس من ذلك، سيؤدي استخدام خاصية إيكيدنا صريحة إلى تنفيذ المعاملات بشكل عشوائي ولا توجد طريقة سهلة لفرض وقت التحقق منها بالضبط. لا يزال من الممكن القيام بهذا الحل البديل:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

ومع ذلك، هناك بعض المشكلات:

- يفشل إذا تم الإعلان عن `f` كـ `internal` أو `external`.
- من غير الواضح ما هي الوسائط التي يجب استخدامها لاستدعاء `f`.
- إذا تراجعت `f`، فستفشل الخاصية.

بشكل عام، نوصي باتباع [توصية John Regehr](https://blog.regehr.org/archives/1091) حول كيفية استخدام التأكيدات:

- لا تفرض أي أثر جانبي أثناء التحقق من التأكيد. على سبيل المثال: `assert(ChangeStateAndReturn() == 1)`
- لا تؤكد العبارات الواضحة. على سبيل المثال `assert(var >= 0)` حيث يتم الإعلان عن `var` كـ `uint`.

أخيرًا، يرجى **عدم استخدام** `require` بدلاً من `assert`، لأن إيكيدنا لن يتمكن من اكتشافه (لكن العقد سيتراجع على أي حال).

### ملخص: التحقق من التأكيد {#summary-assertion-checking}

يلخص ما يلي تشغيل إيكيدنا على مثالنا:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

وجد إيكيدنا أن التأكيد في `inc` يمكن أن يفشل إذا تم استدعاء هذه الدالة عدة مرات باستخدام وسائط كبيرة.

## جمع وتعديل مجموعة بيانات (corpus) إيكيدنا {#collecting-and-modifying-an-echidna-corpus}

سنرى كيفية جمع واستخدام مجموعة بيانات من المعاملات مع إيكيدنا. الهدف هو العقد الذكي التالي [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

يجبر هذا المثال الصغير إيكيدنا على العثور على قيم معينة لتغيير متغير حالة. هذا أمر صعب بالنسبة لأداة الاختبار العشوائي.
يمكننا تشغيل إيكيدنا للتحقق من ذلك:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

ومع ذلك، لا يزال بإمكاننا استخدام إيكيدنا لجمع مجموعة بيانات عند تشغيل حملة الاختبار العشوائي هذه.

### جمع مجموعة بيانات {#collecting-a-corpus}

لتمكين جمع مجموعة البيانات، قم بإنشاء دليل لمجموعة البيانات:

```sh
mkdir corpus-magic
```

و [ملف تكوين إيكيدنا](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

الآن يمكننا تشغيل أداتنا والتحقق من مجموعة البيانات التي تم جمعها:

```sh
echidna magic.sol --config config.yaml
```

لا يزال إيكيدنا غير قادر على العثور على القيم السحرية الصحيحة. لمعرفة أين يعلق، انظر إلى تقرير التغطية `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

تعني علامة `r` أن إيكيدنا وصل إلى السطر ولكن التنفيذ تراجع هناك، والأسطر التي تلي آخر `require` لا يتم تنفيذها أبدًا.

يتم تخزين تسلسلات المعاملات التي جمعها إيكيدنا كملفات JSON في `corpus-magic/coverage/`. على سبيل المثال، كانت المعاملة الأولى لأحد هذه الملفات هي:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

من الواضح أن هذا الإدخال لن يؤدي إلى الفشل في خاصيتنا. ومع ذلك، في الخطوة التالية، سنرى كيفية تعديله للقيام بذلك.

### بذر مجموعة بيانات {#seeding-a-corpus}

يحتاج إيكيدنا إلى بعض المساعدة من أجل التعامل مع دالة `magic`. سنقوم بنسخ وتعديل الإدخال لاستخدام معلمات مناسبة له (أسماء الملفات عشوائية، لذا استخدم واحدًا من دليل `corpus-magic/coverage/` الخاص بك):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

سنقوم بتعديل `new.txt` بحيث يحتوي على معاملة واحدة تستدعي `magic(42,129,333,0)`. الآن، يمكننا إعادة تشغيل إيكيدنا:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

هذه المرة، وجد أنه يتم انتهاك الخاصية على الفور.

## العثور على المعاملات ذات الاستهلاك العالي للغاز {#finding-transactions-with-high-gas-consumption}

سنرى كيفية العثور على المعاملات ذات الاستهلاك العالي للغاز باستخدام إيكيدنا. كانت الإصدارات الأقدم من إيكيدنا تحتوي على خيار `estimateGas` لهذا الغرض؛ تمت إزالته في إيكيدنا <span dir="ltr">2.3.0</span>. بدلاً من ذلك، نقيس الغاز باستخدام `gasleft()` وندع [وضع التحسين](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) في إيكيدنا يزيده إلى أقصى حد. الهدف هو العقد الذكي التالي:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

هنا يمكن أن يكون لـ `expensive` استهلاك كبير للغاز.

### قياس استهلاك الغاز {#measuring-gas-consumption}

في وضع التحسين، يبحث إيكيدنا عن الدوال التي تبدأ بـ `echidna_` والتي لا تأخذ أي وسيطة وتُرجع `int256`، ويحاول العثور على تسلسل المعاملات الذي يزيد القيمة المرجعة إلى أقصى حد. نضيف عقد اختبار يستدعي `f`، ويسجل الغاز الذي استخدمه، ويعرض الحد الأقصى (احفظ كلا العقدين في `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

لتمكين وضع التحسين، قم بإنشاء ملف تكوين `config.yaml`. في هذا المثال، سنقوم أيضًا بتقليل حجم تسلسل المعاملات لجعل النتائج أسهل في الفهم:

```yaml
testMode: optimization
seqLen: 2
```

### تشغيل إيكيدنا {#run-echidna-3}

بمجرد إنشاء ملف التكوين، يمكننا تشغيل إيكيدنا على النحو التالي:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- يتم قياس الغاز الموضح بواسطة تنفيذ آلة إيثريوم الافتراضية (EVM) الذي يعمل عليه إيكيدنا، [hevm](https://github.com/argotorg/hevm)، ويتضمن النفقات الإضافية للاستدعاء الداخلي من `measureF`.
- الحد الأقصى ليس فريدًا: كل حملة عشوائية، وتميل الحملات الأطول (على سبيل المثال `--test-limit 200000`) إلى العثور على قيم أكبر.

### تصفية الاستدعاءات التي تقلل الغاز {#filtering-out-gas-reducing-calls}

يوضح البرنامج التعليمي حول **تصفية الدوال التي سيتم استدعاؤها أثناء حملة اختبار عشوائي** أعلاه كيفية إزالة بعض الدوال من اختبارك.  
يمكن أن يكون هذا بالغ الأهمية للحصول على تقدير دقيق للغاز.
تأمل المثال التالي:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

يستدعي `echidna_opt_gas_check` `check` ويُرجع تكلفة الغاز الخاصة به. مثل كل دالة اختبار في إيكيدنا، يتم تجاهل تغييرات الحالة الخاصة بها بعد ذلك.

إذا كان بإمكان إيكيدنا استدعاء جميع الدوال، فلن يجد بسهولة معاملات ذات تكلفة غاز عالية:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

ذلك لأن التكلفة تعتمد على حجم `addrs` وتميل الاستدعاءات العشوائية إلى ترك المصفوفة فارغة تقريبًا.
ومع ذلك، فإن إدراج `pop` و `clear` في القائمة السوداء يعطينا نتائج أفضل بكثير:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

يستغرق تقليص تسلسل الاستدعاء لهذه النتيجة عدة دقائق، لأن كل إعادة تشغيل تستدعي دالة `check` المكلفة.

### ملخص: العثور على المعاملات ذات الاستهلاك العالي للغاز {#summary-finding-transactions-with-high-gas-consumption}

يمكن لإيكيدنا العثور على المعاملات ذات الاستهلاك العالي للغاز عن طريق قياس الغاز باستخدام `gasleft()` في دالة `echidna_` تُرجع `int256`، والتشغيل في وضع التحسين:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

سيبلغ إيكيدنا عن الحد الأقصى للقيمة التي تم العثور عليها وتسلسل المعاملات الذي أنتجها، بمجرد انتهاء حملة الاختبار العشوائي.
