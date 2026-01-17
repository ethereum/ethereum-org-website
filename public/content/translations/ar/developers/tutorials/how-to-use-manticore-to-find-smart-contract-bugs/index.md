---
title: "كيفية استخدام Manticore لإيجاد الأخطاء في العقود الذكية"
description: "كيفية استخدام Manticore لإيجاد الأخطاء في العقود الذكية بشكل تلقائي"
author: "طريق البتات"
lang: ar
tags:
  [
    "الصلابة",
    "العقود الذكيه ",
    "الأمن",
    "الاختبار",
    "التحقق الرسمي"
  ]
skill: advanced
published: 2020-01-13
source: "عقود البناء الآمنة"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

الهدف من هذا الدرس التعليمي هو توضيح كيفية استخدام Manticore للعثور تلقائيًا على الأخطاء في العقود الذكية.

## التثبيت {#installation}

يتطلب Manticore إصدار python 3.6 >=. يمكن تثبيته من خلال pip أو باستخدام docker.

### Manticore من خلال docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_الأمر الأخير يشغل eth-security-toolbox في حاوية docker لديها صلاحية الوصول إلى دليلك الحالي. يمكنك تغيير الملفات من مضيفك، وتشغيل الأدوات على الملفات من حاوية docker_

داخل حاوية docker، قم بتشغيل:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore من خلال pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

يُنصح باستخدام solc 0.5.11.

### تشغيل نص برمجي {#running-a-script}

لتشغيل نص python برمجي باستخدام python 3:

```bash
python3 script.py
```

## مقدمة في التنفيذ الرمزي الديناميكي {#introduction-to-dynamic-symbolic-execution}

### التنفيذ الرمزي الديناميكي باختصار {#dynamic-symbolic-execution-in-a-nutshell}

التنفيذ الرمزي الديناميكي (DSE) هو أسلوب لتحليل البرامج يستكشف فضاء الحالة بدرجة عالية من الوعي الدلالي. تعتمد هذه التقنية على اكتشاف "مسارات البرنامج"، والتي يتم تمثيلها كصيغ رياضية تسمى `path predicates`. من الناحية المفاهيمية، تعمل هذه التقنية على مسندات المسار (path predicates) في خطوتين:

1. يتم إنشاؤها باستخدام قيود على مدخلات البرنامج.
2. يتم استخدامها لتوليد مدخلات للبرنامج من شأنها أن تتسبب في تنفيذ المسارات المرتبطة بها.

لا ينتج عن هذا النهج أي نتائج إيجابية خاطئة بمعنى أنه يمكن تشغيل جميع حالات البرنامج المحددة أثناء التنفيذ الفعلي. على سبيل المثال، إذا وجد التحليل تجاوزًا للسعة في عدد صحيح (integer overflow)، فمن المضمون أن يكون قابلاً للتكرار.

### مثال على مسند المسار (Path Predicate) {#path-predicate-example}

للحصول على فكرة عن كيفية عمل التنفيذ الرمزي الديناميكي (DSE)، خذ المثال التالي:

```solidity
function f(uint a){

  if (a == 65) {
      // يوجد خطأ
  }

}
```

بما أن `f()` تحتوي على مسارين، فإن التنفيذ الرمزي الديناميكي (DSE) سيقوم ببناء مسندين مختلفين للمسار:

- المسار 1: `a == 65`
- المسار 2: `Not (a == 65)`

كل مسند مسار هو صيغة رياضية يمكن إعطاؤها لما يسمى [محلل SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories)، الذي سيحاول حل المعادلة. بالنسبة لـ `المسار 1`، سيقول المحلل أنه يمكن استكشاف المسار باستخدام `a = 65`. بالنسبة لـ `المسار 2`، يمكن للمحلل أن يعطي `a` أي قيمة بخلاف 65، على سبيل المثال `a = 0`.

### التحقق من الخصائص {#verifying-properties}

يسمح Manticore بالتحكم الكامل في كل عمليات تنفيذ كل مسار. نتيجة لذلك، يسمح لك بإضافة قيود عشوائية على أي شيء تقريبًا. يسمح هذا التحكم بإنشاء خصائص على العقد.

خذ المثال التالي:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // لا توجد حماية من تجاوز السعة
  return c;
}
```

هنا لا يوجد سوى مسار واحد لاستكشافه في الدالة:

- المسار 1: `c = a + b`

باستخدام Manticore، يمكنك التحقق من تجاوز السعة، وإضافة قيود إلى مسند المسار:

- `c = a + b AND (c < a OR c < b)`

إذا كان من الممكن إيجاد تقييم لـ `a` و `b` يكون فيه مسند المسار أعلاه ممكنًا، فهذا يعني أنك قد وجدت تجاوزًا للسعة. على سبيل المثال، يمكن للمحلل إنشاء المدخل `a = 10 , b = MAXUINT256`.

إذا أخذت في الاعتبار نسخة مصححة:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

الصيغة المرتبطة مع التحقق من تجاوز السعة ستكون:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

لا يمكن حل هذه الصيغة؛ بعبارة أخرى، هذا **دليل** على أنه في `safe_add`، ستزداد قيمة `c` دائمًا.

وبالتالي، يعد التنفيذ الرمزي الديناميكي (DSE) أداة قوية، يمكنها التحقق من القيود العشوائية على النص البرمجي الخاص بك.

## التشغيل تحت Manticore {#running-under-manticore}

سنرى كيف نستكشف عقدًا ذكيًا باستخدام واجهة برمجة تطبيقات Manticore. الهدف هو العقد الذكي التالي [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### تشغيل استكشاف مستقل {#run-a-standalone-exploration}

يمكنك تشغيل Manticore مباشرة على العقد الذكي بالأمر التالي (`project` يمكن أن يكون ملف Solidity، أو دليل مشروع):

```bash
$ manticore project
```

ستحصل على مخرجات لحالات اختبار مثل هذه (قد يتغير الترتيب):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

بدون معلومات إضافية، سيستكشف Manticore العقد بمعاملات رمزية جديدة حتى يتوقف عن استكشاف مسارات جديدة في العقد. لا يقوم Manticore بتشغيل معاملات جديدة بعد معاملة فاشلة (على سبيل المثال: بعد revert).

سيقوم Manticore بإخراج المعلومات في دليل `mcore_*`. من بين أمور أخرى، ستجد في هذا الدليل:

- `global.summary`: التغطية وتحذيرات المترجم
- `test_XXXXX.summary`: التغطية، آخر تعليمة، أرصدة الحسابات لكل حالة اختبار
- `test_XXXXX.tx`: قائمة مفصلة بالمعاملات لكل حالة اختبار

هنا يجد Manticore 7 حالات اختبار، والتي تتوافق مع (قد يتغير ترتيب أسماء الملفات):

|                                                           |  المعاملة 0 |         المعاملة 1         | المعاملة 2                 | النتيجة |
| :-------------------------------------------------------: | :---------: | :------------------------: | -------------------------- | :-----: |
| **test_00000000.tx** | إنشاء العقد | f(!=65) | f(!=65) |   STOP  |
| **test_00000001.tx** | إنشاء العقد |      الدالة الاحتياطية     |                            |  REVERT |
| **test_00000002.tx** | إنشاء العقد |                            |                            |  RETURN |
| **test_00000003.tx** | إنشاء العقد |  f(65)  |                            |  REVERT |
| **test_00000004.tx** | إنشاء العقد | f(!=65) |                            |   STOP  |
| **test_00000005.tx** | إنشاء العقد | f(!=65) | f(65)   |  REVERT |
| **test_00000006.tx** | إنشاء العقد | f(!=65) | الدالة الاحتياطية          |  REVERT |

_ملخص الاستكشاف: f(!=65) تشير إلى استدعاء الدالة f بأي قيمة مختلفة عن 65._

كما تلاحظ، يقوم Manticore بإنشاء حالة اختبار فريدة لكل معاملة ناجحة أو تم التراجع عنها (reverted).

استخدم علامة `--quick-mode` إذا كنت تريد استكشافًا سريعًا للنص البرمجي (فهي تعطل كاشفات الأخطاء، وحساب الغاز، ...)

### التعامل مع عقد ذكي من خلال واجهة برمجة التطبيقات (API) {#manipulate-a-smart-contract-through-the-api}

يصف هذا القسم تفاصيل كيفية التعامل مع عقد ذكي من خلال واجهة برمجة تطبيقات Manticore Python. يمكنك إنشاء ملف جديد بامتداد python `*.py` وكتابة النص البرمجي اللازم عن طريق إضافة أوامر واجهة برمجة التطبيقات (API) (سيتم وصف أساسياتها أدناه) في هذا الملف ثم تشغيله بالأمر `$ python3 *.py`. يمكنك أيضًا تنفيذ الأوامر أدناه مباشرة في وحدة تحكم python، لتشغيل وحدة التحكم استخدم الأمر `$ python3`.

### إنشاء الحسابات {#creating-accounts}

أول شيء يجب عليك فعله هو بدء بلوكتشين جديدة بالأوامر التالية:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

يتم إنشاء حساب غير مرتبط بعقد باستخدام [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

يمكن نشر عقد Solidity باستخدام [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# بدء العقد
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### ملخص {#summary}

- يمكنك إنشاء حسابات المستخدمين وحسابات العقود باستخدام [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) و [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### تنفيذ المعاملات {#executing-transactions}

يدعم Manticore نوعين من المعاملات:

- المعاملة الأولية (Raw transaction): يتم استكشاف جميع الدوال
- المعاملة المسماة (Named transaction): يتم استكشاف دالة واحدة فقط

#### المعاملة الأولية {#raw-transaction}

يتم تنفيذ معاملة أولية باستخدام [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

يمكن أن يكون المتصل (caller) أو العنوان (address) أو البيانات (data) أو قيمة المعاملة إما ملموسة أو رمزية:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ينشئ قيمة رمزية.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ينشئ مصفوفة بايت رمزية.

على سبيل المثال:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

إذا كانت البيانات رمزية، فسيستكشف Manticore جميع دوال العقد أثناء تنفيذ المعاملة. سيكون من المفيد الاطلاع على شرح الدالة الاحتياطية (Fallback Function) في مقال [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) لفهم كيفية عمل اختيار الدالة.

#### المعاملة المسماة {#named-transaction}

يمكن تنفيذ الدوال من خلال أسمائها.
لتنفيذ `f(uint var)` بقيمة رمزية، من user_account، وبقيمة 0 إيثر، استخدم:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

إذا لم يتم تحديد `قيمة` المعاملة، فإنها تساوي 0 بشكل افتراضي.

#### ملخص {#summary-1}

- يمكن أن تكون وسائط (arguments) المعاملة ملموسة أو رمزية
- المعاملة الأولية ستستكشف جميع الدوال
- يمكن استدعاء الدالة باسمها

### مساحة العمل {#workspace}

`m.workspace` هو الدليل المستخدم كدليل إخراج لجميع الملفات التي تم إنشاؤها:

```python
print("النتائج موجودة في {}".format(m.workspace))
```

### إنهاء الاستكشاف {#terminate-the-exploration}

لإيقاف الاستكشاف، استخدم [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). لا ينبغي إرسال أي معاملات أخرى بمجرد استدعاء هذه الطريقة، ويقوم Manticore بإنشاء حالات اختبار لكل مسار تم استكشافه.

### ملخص: التشغيل تحت Manticore {#summary-running-under-manticore}

بجمع كل الخطوات السابقة معًا، نحصل على:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("النتائج موجودة في {}".format(m.workspace))
m.finalize() # إيقاف الاستكشاف
```

يمكنك العثور على كل النص البرمجي أعلاه في [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## الحصول على مسارات الطرح (throwing paths) {#getting-throwing-paths}

سنقوم الآن بإنشاء مدخلات محددة للمسارات التي تثير استثناءً (exception) في `f()`. لا يزال الهدف هو العقد الذكي التالي [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### استخدام معلومات الحالة {#using-state-information}

كل مسار يتم تنفيذه له حالته الخاصة من البلوكتشين. تكون الحالة إما جاهزة (ready) أو مقتولة (killed)، مما يعني أنها تصل إلى تعليمة THROW أو REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): قائمة الحالات الجاهزة (التي لم تنفذ REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): قائمة الحالات المقتولة
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): جميع الحالات

```python
for state in m.all_states:
    # افعل شيئًا بالحالة
```

يمكنك الوصول إلى معلومات الحالة. على سبيل المثال:

- `state.platform.get_balance(account.address)`: رصيد الحساب
- `state.platform.transactions`: قائمة المعاملات
- `state.platform.transactions[-1].return_data`: البيانات التي تم إرجاعها بواسطة آخر معاملة

البيانات التي تم إرجاعها بواسطة آخر معاملة هي مصفوفة يمكن تحويلها إلى قيمة باستخدام ABI.deserialize، على سبيل المثال:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### كيفية إنشاء حالة اختبار {#how-to-generate-testcase}

استخدم [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) لإنشاء حالة اختبار:

```python
m.generate_testcase(state, 'BugFound')
```

### ملخص {#summary-2}

- يمكنك التكرار على الحالة باستخدام m.all_states
- `state.platform.get_balance(account.address)` تُرجع رصيد الحساب
- `state.platform.transactions` تُرجع قائمة المعاملات
- `transaction.return_data` هي البيانات المُرجعة
- `m.generate_testcase(state, name)` تنشئ مدخلات للحالة

### ملخص: الحصول على مسار الطرح (Throwing Path) {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## تحقق مما إذا كان التنفيذ ينتهي بـ REVERT أو INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('تم العثور على طرح (Throw) {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

يمكنك العثور على كل النص البرمجي أعلاه في [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_ملاحظة: كان بإمكاننا إنشاء نص برمجي أبسط بكثير، حيث أن جميع الحالات التي يتم إرجاعها بواسطة terminated_state تحتوي على REVERT أو INVALID في نتيجتها: هذا المثال كان يهدف فقط إلى توضيح كيفية التعامل مع واجهة برمجة التطبيقات (API)._

## إضافة قيود {#adding-constraints}

سنرى كيف يمكن تقييد الاستكشاف. سنفترض أن توثيق `f()` ينص على أن الدالة لا يتم استدعاؤها أبدًا بـ `a == 65`، لذا فإن أي خطأ مع `a == 65` ليس خطأ حقيقيًا. لا يزال الهدف هو العقد الذكي التالي [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### العوامل (Operators) {#operators}

يسهل وحدة [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) التعامل مع القيود، ومن بين ما توفره:

- Operators.AND،
- Operators.OR،
- Operators.UGT (أكبر من غير المؤشر)،
- Operators.UGE (أكبر من أو يساوي غير المؤشر)،
- Operators.ULT (أقل من غير المؤشر)،
- Operators.ULE (أقل من أو يساوي غير المؤشر).

لاستيراد الوحدة، استخدم ما يلي:

```python
from manticore.core.smtlib import Operators
```

يُستخدم `Operators.CONCAT` لربط مصفوفة بقيمة. على سبيل المثال، يجب تغيير return_data لمعاملة ما إلى قيمة ليتم فحصها مقابل قيمة أخرى:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### القيود {#state-constraint}

يمكنك استخدام القيود بشكل عام أو لحالة معينة.

#### قيد عام {#state-constraint}

استخدم `m.constrain(constraint)` لإضافة قيد عام.
على سبيل المثال، يمكنك استدعاء عقد من عنوان رمزي، وتقييد هذا العنوان ليكون قيمًا محددة:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### قيد الحالة {#state-constraint}

استخدم [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) لإضافة قيد إلى حالة معينة.
يمكن استخدامه لتقييد الحالة بعد استكشافها للتحقق من خاصية معينة عليها.

### التحقق من القيد {#checking-constraint}

استخدم `solver.check(state.constraints)` لمعرفة ما إذا كان القيد لا يزال ممكنًا.
على سبيل المثال، سيقيد ما يلي symbolic_value لتكون مختلفة عن 65 والتحقق مما إذا كانت الحالة لا تزال ممكنة:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # الحالة ممكنة
```

### ملخص: إضافة القيود {#summary-adding-constraints}

بإضافة قيد إلى النص البرمجي السابق، نحصل على:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## تحقق مما إذا كان التنفيذ ينتهي بـ REVERT أو INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # نحن لا نأخذ في الاعتبار المسار الذي يكون فيه a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'تم العثور على خطأ، النتائج في {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'لم يتم العثور على أخطاء')
```

يمكنك العثور على كل النص البرمجي أعلاه في [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
