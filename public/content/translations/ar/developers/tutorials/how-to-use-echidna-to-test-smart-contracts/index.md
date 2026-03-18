---
title: "كيفية استخدام إيكيدنا لاختبار العقود الذكية"
description: "كيفية استخدام إيكيدنا لاختبار العقود الذكية تلقائيًا"
author: "Trailofbits"
lang: ar
tags:
  [
    "Solidity",
    "العقود الذكيه ",
    "الأمن",
    "الاختبار",
    "التشويش"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## التثبيت {#installation}

يمكن تثبيت إيكيدنا من خلال docker أو باستخدام الملف الثنائي المترجم مسبقًا.

### إيكيدنا من خلال docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_الأمر الأخير يشغل eth-security-toolbox في حاوية docker لديها صلاحية الوصول إلى دليلك الحالي. يمكنك تغيير الملفات من مضيفك، وتشغيل الأدوات على الملفات من حاوية docker_

داخل docker، قم بتشغيل:

```bash
solc-select 0.5.11
cd /home/training
```

### ثنائي {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## مقدمة عن التشويش القائم على الخصائص {#introduction-to-property-based-fuzzing}

إيكيدنا هي أداة تشويش قائمة على الخصائص، كما وصفنا في منشورات مدونتنا السابقة ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)، [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)، [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### التشويش {#fuzzing}

[التشويش](https://wikipedia.org/wiki/Fuzzing) هو أسلوب معروف في مجتمع الأمن. وهو يتألف من توليد مدخلات عشوائية إلى حد ما للعثور على الأخطاء في البرنامج. تُعرف أدوات التشويش للبرامج التقليدية (مثل [AFL](http://lcamtuf.coredump.cx/afl/) أو [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) بأنها أدوات فعالة للعثور على الأخطاء.

إلى جانب التوليد العشوائي البحت للمدخلات، هناك العديد من التقنيات والاستراتيجيات لتوليد مدخلات جيدة، بما في ذلك:

- الحصول على ملاحظات من كل تنفيذ وتوجيه عملية التوليد باستخدامها. على سبيل المثال، إذا أدى إدخال تم إنشاؤه حديثًا إلى اكتشاف مسار جديد، فمن المنطقي إنشاء مدخلات جديدة قريبة منه.
- توليد المدخلات مع احترام القيود الهيكلية. على سبيل المثال، إذا كان إدخالك يحتوي على رأس به مجموع اختباري، فسيكون من المنطقي السماح لأداة التشويش بإنشاء مدخلات للتحقق من صحة المجموع الاختباري.
- استخدام المدخلات المعروفة لإنشاء مدخلات جديدة: إذا كان لديك حق الوصول إلى مجموعة بيانات كبيرة من المدخلات الصالحة، فيمكن لأداة التشويش الخاصة بك إنشاء مدخلات جديدة منها، بدلاً من بدء إنشائها من الصفر. تسمى هذه عادة _seeds_.

### التشويش القائم على الخصائص {#property-based-fuzzing}

تنتمي إيكيدنا إلى عائلة معينة من أدوات التشويش: التشويش القائم على الخصائص المستوحى بشكل كبير من [QuickCheck](https://wikipedia.org/wiki/QuickCheck). على عكس أداة التشويش الكلاسيكية التي ستحاول العثور على أعطال، ستحاول إيكيدنا كسر الثوابت المحددة من قبل المستخدم.

في العقود الذكية، الثوابت هي وظائف سوليديتي، والتي يمكن أن تمثل أي حالة غير صحيحة أو غير صالحة يمكن أن يصل إليها العقد، بما في ذلك:

- تحكم غير صحيح في الوصول: أصبح المهاجم مالك العقد.
- آلة حالة غير صحيحة: يمكن نقل الرموز أثناء إيقاف العقد مؤقتًا.
- عملية حسابية غير صحيحة: يمكن للمستخدم أن يتسبب في تدفق سفلي لرصيده ويحصل على رموز مجانية غير محدودة.

### اختبار خاصية باستخدام إيكيدنا {#testing-a-property-with-echidna}

سنرى كيفية اختبار عقد ذكي باستخدام إيكيدنا. الهدف هو العقد الذكي التالي [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

سنفترض أن هذا الرمز يجب أن يتمتع بالخصائص التالية:

- يمكن لأي شخص امتلاك 1000 رمز كحد أقصى
- لا يمكن نقل الرمز (إنه ليس رمز ERC20)

### كتابة خاصية {#write-a-property}

خصائص إيكيدنا هي وظائف سوليديتي. يجب أن تستوفي الخاصية ما يلي:

- ألا تحتوي على وسيطة
- إرجاع `true` إذا كانت ناجحة
- أن يبدأ اسمها بـ `echidna`

ستقوم إيكيدنا بما يلي:

- توليد معاملات عشوائية تلقائيًا لاختبار الخاصية.
- الإبلاغ عن أي معاملات تؤدي إلى إرجاع الخاصية `false` أو إطلاق خطأ.
- تجاهل التأثير الجانبي عند استدعاء خاصية (أي، إذا غيرت الخاصية متغير حالة، يتم تجاهله بعد الاختبار)

تتحقق الخاصية التالية من أن المتصل لا يملك أكثر من 1000 رمز:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

استخدم الوراثة لفصل عقدك عن خصائصك:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) ينفذ الخاصية ويرث من الرمز.

### تهيئة عقد {#initiate-a-contract}

تحتاج إيكيدنا إلى [دالة بناء](/developers/docs/smart-contracts/anatomy/#constructor-functions) بدون وسيطة. إذا كان عقدك بحاجة إلى تهيئة معينة، فأنت بحاجة إلى القيام بذلك في دالة البناء.

هناك بعض العناوين المحددة في إيكيدنا:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` الذي يستدعي دالة البناء.
- `0x10000` و `0x20000` و `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` التي تستدعي الوظائف الأخرى بشكل عشوائي.

لا نحتاج إلى أي تهيئة خاصة في مثالنا الحالي، ونتيجة لذلك فإن دالة البناء الخاصة بنا فارغة.

### تشغيل إيكيدنا {#run-echidna}

يتم تشغيل إيكيدنا باستخدام:

```bash
echidna-test contract.sol
```

إذا كان contract.sol يحتوي على عقود متعددة، يمكنك تحديد الهدف:

```bash
echidna-test contract.sol --contract MyContract
```

### ملخص: اختبار خاصية {#summary-testing-a-property}

يلخص ما يلي تشغيل echidna على مثالنا:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: فشلت!💥
  تسلسل الاستدعاء، التقليص (1205/5000):
    airdrop()
    backdoor()

...
```

وجدت إيكيدنا أن الخاصية تُنتهك إذا تم استدعاء `backdoor`.

## تصفية الوظائف التي سيتم استدعاؤها أثناء حملة التشويش {#filtering-functions-to-call-during-a-fuzzing-campaign}

سنرى كيفية تصفية الوظائف التي سيتم تشويشها.
الهدف هو العقد الذكي التالي:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

يجبر هذا المثال الصغير إيكيدنا على العثور على تسلسل معين من المعاملات لتغيير متغير الحالة.
هذا صعب على أداة التشويش (يوصى باستخدام أداة تنفيذ رمزي مثل [مانتيكور](https://github.com/trailofbits/manticore)).
يمكننا تشغيل إيكيدنا للتحقق من هذا:

```bash
echidna-test multi.sol
...
echidna_state4: نجحت! 🎉
Seed: -3684648582249875403
```

### تصفية الوظائف {#filtering-functions}

تواجه إيكيدنا صعوبة في العثور على التسلسل الصحيح لاختبار هذا العقد لأن وظيفتي إعادة الضبط (`reset1` و `reset2`) ستعينان جميع متغيرات الحالة على `false`.
ومع ذلك، يمكننا استخدام ميزة إيكيدنا خاصة إما لوضع وظيفة إعادة الضبط في القائمة السوداء أو لوضع وظائف `f` و `g` و
`h` و `i` فقط في القائمة البيضاء.

لوضع الوظائف في القائمة السوداء، يمكننا استخدام ملف التكوين هذا:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

هناك طريقة أخرى لتصفية الوظائف وهي سرد الوظائف المدرجة في القائمة البيضاء. للقيام بذلك، يمكننا استخدام ملف التكوين هذا:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` هي `true` بشكل افتراضي.
- سيتم إجراء التصفية بالاسم فقط (بدون معلمات). إذا كان لديك `f()` و `f(uint256)`، فإن المرشح `"f"` سيطابق كلتا الوظيفتين.

### تشغيل إيكيدنا {#run-echidna-1}

لتشغيل إيكيدنا باستخدام ملف تكوين `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: فشلت!💥
  تسلسل الاستدعاء:
    f(12)
    g(8)
    h(42)
    i()
```

ستجد إيكيدنا تسلسل المعاملات لتكذيب الخاصية على الفور تقريبًا.

### ملخص: تصفية الوظائف {#summary-filtering-functions}

يمكن لـ إيكيدنا إما وضع وظائف في القائمة السوداء أو في القائمة البيضاء لاستدعائها أثناء حملة التشويش باستخدام:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

تبدأ إيكيدنا حملة تشويش إما بوضع `f1` و `f2` و `f3` في القائمة السوداء أو باستدعاء هذه الوظائف فقط، وفقًا لقيمة `filterBlacklist` المنطقية.

## كيفية اختبار تأكيد سوليديتي باستخدام إيكيدنا {#how-to-test-soliditys-assert-with-echidna}

في هذا البرنامج التعليمي القصير، سنوضح كيفية استخدام إيكيدنا لاختبار فحص التأكيد في العقود. لنفترض أن لدينا عقدًا مثل هذا:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp أصغر من أو يساوي counter
    return (counter - tmp);
  }
}
```

### كتابة تأكيد {#write-an-assertion}

نريد التأكد من أن `tmp` أقل من أو يساوي `counter` بعد إرجاع الفرق بينهما. يمكننا كتابة خاصية
إيكيدنا، لكننا سنحتاج إلى تخزين قيمة `tmp` في مكان ما. بدلاً من ذلك، يمكننا استخدام تأكيد مثل هذا:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### تشغيل إيكيدنا {#run-echidna-2}

لتمكين اختبار فشل التأكيد، قم بإنشاء [ملف تكوين إيكيدنا](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

عندما نقوم بتشغيل هذا العقد في إيكيدنا، نحصل على النتائج المتوقعة:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: فشل!💥
  تسلسل الاستدعاء، التقليص (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

كما ترى، تبلغ إيكيدنا عن بعض حالات فشل التأكيد في وظيفة `inc`. إضافة أكثر من تأكيد واحد لكل وظيفة أمر ممكن، لكن إيكيدنا لا تستطيع تحديد أي تأكيد فشل.

### متى وكيف تستخدم التأكيدات {#when-and-how-use-assertions}

يمكن استخدام التأكيدات كبدائل للخصائص الصريحة، خاصة إذا كانت الشروط المراد التحقق منها مرتبطة مباشرة بالاستخدام الصحيح لبعض العمليات `f`. ستؤدي إضافة التأكيدات بعد بعض التعليمات البرمجية إلى فرض حدوث الفحص فور تنفيذه:

```solidity
function f(..) public {
    // بعض التعليمات البرمجية المعقدة
    ...
    assert (condition);
    ...
}

```

على العكس من ذلك، سيؤدي استخدام خاصية echidna صريحة إلى تنفيذ معاملات عشوائية ولا توجد طريقة سهلة لفرض وقت التحقق منها بالضبط. لا يزال من الممكن القيام بهذا الحل البديل:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

ومع ذلك، هناك بعض المشاكل:

- يفشل إذا تم الإعلان عن `f` على أنها `internal` أو `external`.
- من غير الواضح ما هي الوسيطات التي يجب استخدامها لاستدعاء `f`.
- إذا تم عكس `f`، فستفشل الخاصية.

بشكل عام، نوصي باتباع [توصية جون ريجير](https://blog.regehr.org/archives/1091) حول كيفية استخدام التأكيدات:

- لا تفرض أي تأثير جانبي أثناء فحص التأكيد. على سبيل المثال: `assert(ChangeStateAndReturn() == 1)`
- لا تؤكد العبارات الواضحة. على سبيل المثال `assert(var >= 0)` حيث يتم الإعلان عن `var` كـ `uint`.

أخيرًا، يرجى **عدم استخدام** `require` بدلاً من `assert`، لأن إيكيدنا لن تتمكن من اكتشافه (لكن العقد سيعود على أي حال).

### ملخص: فحص التأكيد {#summary-assertion-checking}

يلخص ما يلي تشغيل echidna على مثالنا:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: فشل!💥
  تسلسل الاستدعاء، التقليص (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

وجدت إيكيدنا أن التأكيد في `inc` يمكن أن يفشل إذا تم استدعاء هذه الوظيفة عدة مرات بوسيطات كبيرة.

## جمع وتعديل مجموعة بيانات إيكيدنا {#collecting-and-modifying-an-echidna-corpus}

سنرى كيفية جمع واستخدام مجموعة بيانات من المعاملات مع إيكيدنا. الهدف هو العقد الذكي التالي [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

يجبر هذا المثال الصغير إيكيدنا على العثور على قيم معينة لتغيير متغير الحالة. هذا صعب على أداة التشويش
(يوصى باستخدام أداة تنفيذ رمزي مثل [مانتيكور](https://github.com/trailofbits/manticore)).
يمكننا تشغيل إيكيدنا للتحقق من هذا:

```bash
echidna-test magic.sol
...

echidna_magic_values: نجحت! 🎉

Seed: 2221503356319272685
```

ومع ذلك، لا يزال بإمكاننا استخدام إيكيدنا لجمع مجموعة بيانات عند تشغيل حملة التشويش هذه.

### جمع مجموعة بيانات {#collecting-a-corpus}

لتمكين جمع مجموعة البيانات، قم بإنشاء دليل مجموعة البيانات:

```bash
mkdir corpus-magic
```

وملف تكوين إيكيدنا [إيكيدنا configuration file](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

الآن يمكننا تشغيل أداتنا والتحقق من مجموعة البيانات التي تم جمعها:

```bash
echidna-test magic.sol --config config.yaml
```

لا تزال إيكيدنا غير قادرة على العثور على القيم السحرية الصحيحة، ولكن يمكننا إلقاء نظرة على مجموعة البيانات التي جمعتها.
على سبيل المثال، كان أحد هذه الملفات:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

من الواضح أن هذا الإدخال لن يؤدي إلى فشل خاصيتنا. ومع ذلك، في الخطوة التالية، سنرى كيفية تعديله لذلك.

### تلقيم مجموعة بيانات {#seeding-a-corpus}

تحتاج إيكيدنا إلى بعض المساعدة للتعامل مع وظيفة `magic`. سنقوم بنسخ وتعديل المدخلات لاستخدام معلمات مناسبة
لها:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

سنقوم بتعديل `new.txt` لاستدعاء `magic(42,129,333,0)`. الآن، يمكننا إعادة تشغيل إيكيدنا:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: فشلت!💥
  تسلسل الاستدعاء:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

هذه المرة، وجدت أن الخاصية قد انتهكت على الفور.

## العثور على المعاملات ذات الاستهلاك العالي للغاز {#finding-transactions-with-high-gas-consumption}

سنرى كيفية العثور على المعاملات ذات الاستهلاك العالي للغاز باستخدام إيكيدنا. الهدف هو العقد الذكي التالي:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

هنا يمكن أن يكون لـ `expensive` استهلاك كبير للغاز.

حاليًا، تحتاج إيكيدنا دائمًا إلى خاصية لاختبارها: هنا `echidna_test` تُرجع دائمًا `true`.
يمكننا تشغيل إيكيدنا للتحقق من هذا:

```
echidna-test gas.sol
...
echidna_test: نجحت! 🎉

Seed: 2320549945714142710
```

### قياس استهلاك الغاز {#measuring-gas-consumption}

لتمكين استهلاك الغاز مع إيكيدنا، قم بإنشاء ملف تكوين `config.yaml`:

```yaml
estimateGas: true
```

في هذا المثال، سنقوم أيضًا بتقليل حجم تسلسل المعاملات لجعل النتائج أسهل في الفهم:

```yaml
seqLen: 2
estimateGas: true
```

### تشغيل إيكيدنا {#run-echidna-3}

بمجرد إنشاء ملف التكوين، يمكننا تشغيل إيكيدنا على هذا النحو:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: نجحت! 🎉

f استخدمت حدًا أقصى من الغاز يبلغ 1333608
  تسلسل الاستدعاء:
    f(42,123,249) سعر الغاز: 0x10d5733f0a تأخير زمني: 0x495e5 تأخير الكتلة: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- الغاز الموضح هو تقدير مقدم من [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### تصفية استدعاءات خفض الغاز {#filtering-out-gas-reducing-calls}

يوضح البرنامج التعليمي حول **تصفية الوظائف التي سيتم استدعاؤها أثناء حملة التشويش** أعلاه كيفية إزالة بعض الوظائف من اختبارك.  
قد يكون هذا أمرًا بالغ الأهمية للحصول على تقدير دقيق للغاز.
خذ المثال التالي:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

إذا تمكنت إيكيدنا من استدعاء جميع الوظائف، فلن تجد بسهولة المعاملات ذات تكلفة الغاز المرتفعة:

```
echidna-test pushpop.sol --config config.yaml
...
pop استخدمت حدًا أقصى من الغاز يبلغ 10746
...
check استخدمت حدًا أقصى من الغاز يبلغ 23730
...
clear استخدمت حدًا أقصى من الغاز يبلغ 35916
...
push استخدمت حدًا أقصى من الغاز يبلغ 40839
```

ذلك لأن التكلفة تعتمد على حجم `addrs` وتميل الاستدعاءات العشوائية إلى ترك المصفوفة فارغة تقريبًا.
ومع ذلك، فإن وضع `pop` و `clear` في القائمة السوداء يعطينا نتائج أفضل بكثير:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push استخدمت حدًا أقصى من الغاز يبلغ 40839
...
check استخدمت حدًا أقصى من الغاز يبلغ 1484472
```

### ملخص: العثور على المعاملات ذات الاستهلاك العالي للغاز {#summary-finding-transactions-with-high-gas-consumption}

يمكن لـ إيكيدنا العثور على معاملات ذات استهلاك عالٍ للغاز باستخدام خيار التكوين `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ستبلغ إيكيدنا عن تسلسل بأقصى استهلاك للغاز لكل وظيفة، بمجرد انتهاء حملة التشويش.
