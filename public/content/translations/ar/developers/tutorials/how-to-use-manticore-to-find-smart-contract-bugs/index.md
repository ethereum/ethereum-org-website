---
title: كيفية استخدام مانتيكور للعثور على الأخطاء في العقود الذكية
description: كيفية استخدام مانتيكور للعثور تلقائيًا على الأخطاء في العقود الذكية
author: تريل أوف بيتس
lang: ar
tags:
  ["Solidity", "العقود الذكية", "الأمان", "الاختبار", "التحقق الرسمي"]
skill: advanced
breadcrumb: مانتيكور
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

الهدف من هذا البرنامج التعليمي هو إظهار كيفية استخدام مانتيكور للعثور تلقائيًا على الأخطاء في العقود الذكية.

## التثبيت {#installation}

يتطلب مانتيكور إصدار <span dir="ltr">>= Python 3.6</span>. يمكن تثبيته من خلال <span dir="ltr">pip</span> أو باستخدام Docker.

### مانتيكور من خلال Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_يقوم الأمر الأخير بتشغيل <span dir="ltr">eth-security-toolbox</span> في Docker لديه حق الوصول إلى دليلك الحالي. يمكنك تغيير الملفات من مضيفك، وتشغيل الأدوات على الملفات من Docker_

داخل Docker، قم بتشغيل:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### مانتيكور من خلال <span dir="ltr">pip</span> {#manticore-through-pip}

```bash
pip3 install --user manticore
```

يوصى باستخدام <span dir="ltr">solc 0.5.11</span>.

### تشغيل برنامج نصي {#running-a-script}

لتشغيل برنامج نصي بلغة Python باستخدام <span dir="ltr">Python 3</span>:

```bash
python3 script.py
```

## مقدمة إلى التنفيذ الرمزي الديناميكي {#introduction-to-dynamic-symbolic-execution}

### التنفيذ الرمزي الديناميكي باختصار {#dynamic-symbolic-execution-in-a-nutshell}

التنفيذ الرمزي الديناميكي (DSE) هو تقنية لتحليل البرامج تستكشف مساحة حالة بدرجة عالية من الوعي الدلالي. تعتمد هذه التقنية على اكتشاف "مسارات البرنامج"، ممثلة كصيغ رياضية تسمى `path predicates`. من الناحية المفاهيمية، تعمل هذه التقنية على مسندات المسار في خطوتين:

1. يتم بناؤها باستخدام قيود على مدخلات البرنامج.
2. يتم استخدامها لإنشاء مدخلات البرنامج التي ستؤدي إلى تنفيذ المسارات المرتبطة.

لا ينتج عن هذا النهج أي نتائج إيجابية كاذبة بمعنى أنه يمكن تشغيل جميع حالات البرنامج المحددة أثناء التنفيذ الملموس. على سبيل المثال، إذا وجد التحليل تجاوز السعة لعدد صحيح، فمن المضمون أن يكون قابلاً لإعادة الإنتاج.

### مثال على مسند المسار {#path-predicate-example}

للحصول على نظرة ثاقبة حول كيفية عمل التنفيذ الرمزي الديناميكي (DSE)، ضع في اعتبارك المثال التالي:

```solidity
function f(uint a){

  if (a == 65) {
      // يوجد خطأ
  }

}
```

نظرًا لأن `f()` يحتوي على مسارين، سيقوم التنفيذ الرمزي الديناميكي (DSE) ببناء مسندي مسار مختلفين:

- المسار 1: `a == 65`
- المسار 2: `Not (a == 65)`

كل مسند مسار هو صيغة رياضية يمكن إعطاؤها لما يسمى [مُحِلّ SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories)، والذي سيحاول حل المعادلة. بالنسبة لـ `Path 1`، سيقول المُحِلّ أنه يمكن استكشاف المسار باستخدام `a = 65`. بالنسبة لـ `Path 2`، يمكن للمُحِلّ إعطاء `a` أي قيمة بخلاف 65، على سبيل المثال `a = 0`.

### التحقق من الخصائص {#verifying-properties}

يتيح مانتيكور تحكمًا كاملاً في جميع عمليات تنفيذ كل مسار. ونتيجة لذلك، فإنه يسمح لك بإضافة قيود عشوائية إلى أي شيء تقريبًا. يسمح هذا التحكم بإنشاء خصائص على العقد.

ضع في اعتبارك المثال التالي:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // لا توجد حماية من تجاوز السعة
  return c;
}
```

هنا يوجد مسار واحد فقط لاستكشافه في الدالة:

- المسار 1: `c = a + b`

باستخدام مانتيكور، يمكنك التحقق من تجاوز السعة، وإضافة قيود إلى مسند المسار:

- `c = a + b AND (c < a OR c < b)`

إذا كان من الممكن العثور على تقييم لـ `a` و `b` يكون فيه مسند المسار أعلاه ممكنًا، فهذا يعني أنك وجدت تجاوز السعة. على سبيل المثال، يمكن للمُحِلّ إنشاء الإدخال `a = 10 , b = MAXUINT256`.

إذا كنت تفكر في إصدار ثابت:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ستكون الصيغة المرتبطة بالتحقق من تجاوز السعة هي:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

لا يمكن حل هذه الصيغة؛ بعبارة أخرى، هذا **دليل** على أنه في `safe_add`، سيزداد `c` دائمًا.

وبالتالي، فإن التنفيذ الرمزي الديناميكي (DSE) هو أداة قوية يمكنها التحقق من القيود العشوائية على الكود الخاص بك.

## التشغيل تحت مانتيكور {#running-under-manticore}

سنرى كيفية استكشاف عقد ذكي باستخدام API الخاص بمانتيكور. الهدف هو العقد الذكي التالي [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

يمكنك تشغيل مانتيكور مباشرة على العقد الذكي بواسطة الأمر التالي (يمكن أن يكون `project` ملف Solidity، أو دليل مشروع):

```bash
$ manticore project
```

ستحصل على مخرجات حالات الاختبار مثل هذه (قد يتغير الترتيب):

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

بدون معلومات إضافية، سيستكشف مانتيكور العقد بمعاملات رمزية جديدة حتى لا يستكشف مسارات جديدة على العقد. لا يقوم مانتيكور بتشغيل معاملات جديدة بعد فشل إحداها (على سبيل المثال: بعد تراجع).

سيقوم مانتيكور بإخراج المعلومات في دليل `mcore_*`. من بين أمور أخرى، ستجد في هذا الدليل:

- `global.summary`: التغطية وتحذيرات المترجم
- `test_XXXXX.summary`: التغطية، التعليمات الأخيرة، أرصدة الحساب لكل حالة اختبار
- `test_XXXXX.tx`: قائمة مفصلة بالمعاملات لكل حالة اختبار

هنا يجد مانتيكور 7 حالات اختبار، والتي تتوافق مع (قد يتغير ترتيب اسم الملف):

|                      |   المعاملة 0   |   المعاملة 1   | المعاملة 2     | النتيجة |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | إنشاء عقد |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | إنشاء عقد | دالة احتياطية |                   | REVERT |
| **test_00000002.tx** | إنشاء عقد |                   |                   | RETURN |
| **test_00000003.tx** | إنشاء عقد |       f(65)       |                   | REVERT |
| **test_00000004.tx** | إنشاء عقد |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | إنشاء عقد |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | إنشاء عقد |      f(!=65)      | دالة احتياطية | REVERT |

_ملخص الاستكشاف <span dir="ltr">f(!=65)</span> يشير إلى استدعاء f بأي قيمة تختلف عن 65._

كما تلاحظ، يقوم مانتيكور بإنشاء حالة اختبار فريدة لكل معاملة ناجحة أو متراجعة.

استخدم علامة `--quick-mode` إذا كنت تريد استكشافًا سريعًا للكود (فهي تعطل مكتشفات الأخطاء، وحساب الغاز، ...)

### التعامل مع عقد ذكي من خلال API {#manipulate-a-smart-contract-through-the-api}

يصف هذا القسم تفاصيل كيفية التعامل مع عقد ذكي من خلال API الخاص بمانتيكور في Python. يمكنك إنشاء ملف جديد بامتداد Python `*.py` وكتابة الكود اللازم عن طريق إضافة أوامر API (والتي سيتم وصف أساسياتها أدناه) في هذا الملف ثم تشغيله باستخدام الأمر `$ python3 *.py`. كما يمكنك تنفيذ الأوامر أدناه مباشرة في وحدة تحكم Python، لتشغيل وحدة التحكم استخدم الأمر `$ python3`.

### إنشاء الحسابات {#creating-accounts}

أول شيء يجب عليك فعله هو بدء سلسلة كتل جديدة باستخدام الأوامر التالية:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

يتم إنشاء حساب غير عقد باستخدام [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### ملخص {#summary}

- يمكنك إنشاء حسابات مستخدمين وحسابات عقود باستخدام [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) و [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### تنفيذ المعاملات {#executing-transactions}

يدعم مانتيكور نوعين من المعاملات:

- معاملة خام: يتم استكشاف جميع الدوال
- معاملة مسماة: يتم استكشاف دالة واحدة فقط

#### معاملة خام {#raw-transaction}

يتم تنفيذ معاملة خام باستخدام [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

يمكن أن يكون المتصل، أو العنوان، أو البيانات، أو قيمة المعاملة إما ملموسة أو رمزية:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ينشئ قيمة رمزية.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ينشئ مصفوفة بايتات رمزية.

على سبيل المثال:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

إذا كانت البيانات رمزية، فسيستكشف مانتيكور جميع دوال العقد أثناء تنفيذ المعاملة. سيكون من المفيد رؤية شرح الدالة الاحتياطية في مقال [تطبيق عملي على Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) لفهم كيفية عمل اختيار الدالة.

#### معاملة مسماة {#named-transaction}

يمكن تنفيذ الدوال من خلال أسمائها.
لتنفيذ `f(uint var)` بقيمة رمزية، من حساب المستخدم، وبـ <span dir="ltr">0 إيثر</span>، استخدم:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

إذا لم يتم تحديد `value` للمعاملة، فسيكون 0 افتراضيًا.

#### ملخص {#summary-1}

- يمكن أن تكون وسيطات المعاملة ملموسة أو رمزية
- ستستكشف المعاملة الخام جميع الدوال
- يمكن استدعاء الدالة باسمها

### مساحة العمل {#workspace}

`m.workspace` هو الدليل المستخدم كدليل إخراج لجميع الملفات التي تم إنشاؤها:

```python
print("Results are in {}".format(m.workspace))
```

### إنهاء الاستكشاف {#terminate-the-exploration}

لإيقاف الاستكشاف استخدم [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). لا ينبغي إرسال أي معاملات أخرى بمجرد استدعاء هذه الطريقة ويقوم مانتيكور بإنشاء حالات اختبار لكل مسار تم استكشافه.

### ملخص: التشغيل تحت مانتيكور {#summary-running-under-manticore}

بوضع جميع الخطوات السابقة معًا، نحصل على:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # إيقاف الاستكشاف
```

يمكنك العثور على جميع الأكواد أعلاه في [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## الحصول على مسارات الاستثناءات {#getting-throwing-paths}

سنقوم الآن بإنشاء مدخلات محددة للمسارات التي تثير استثناءً في `f()`. الهدف لا يزال العقد الذكي التالي [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

كل مسار يتم تنفيذه له حالته الخاصة في سلسلة الكتل. تكون الحالة إما جاهزة أو مقتولة، مما يعني أنها تصل إلى تعليمة <span dir="ltr">THROW</span> أو <span dir="ltr">REVERT</span>:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): قائمة الحالات الجاهزة (لم تقم بتنفيذ <span dir="ltr">REVERT/INVALID</span>)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): قائمة الحالات المقتولة
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): جميع الحالات

```python
for state in m.all_states:
    # القيام بشيء ما بالحالة
```

يمكنك الوصول إلى معلومات الحالة. على سبيل المثال:

- `state.platform.get_balance(account.address)`: رصيد الحساب
- `state.platform.transactions`: قائمة المعاملات
- `state.platform.transactions[-1].return_data`: البيانات التي أرجعتها المعاملة الأخيرة

البيانات التي أرجعتها المعاملة الأخيرة هي مصفوفة، والتي يمكن تحويلها إلى قيمة باستخدام <span dir="ltr">ABI.deserialize</span>، على سبيل المثال:

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

- يمكنك التكرار عبر الحالة باستخدام <span dir="ltr">m.all_states</span>
- `state.platform.get_balance(account.address)` يُرجع رصيد الحساب
- `state.platform.transactions` يُرجع قائمة المعاملات
- `transaction.return_data` هي البيانات المرجعة
- `m.generate_testcase(state, name)` يُنشئ مدخلات للحالة

### ملخص: الحصول على مسار الاستثناء {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## تحقق مما إذا كان التنفيذ ينتهي بتراجع أو غير صالح
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

يمكنك العثور على جميع الأكواد أعلاه في [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_ملاحظة: كان بإمكاننا إنشاء برنامج نصي أبسط بكثير، حيث أن جميع الحالات التي تم إرجاعها بواسطة <span dir="ltr">terminated_state</span> تحتوي على <span dir="ltr">REVERT</span> أو <span dir="ltr">INVALID</span> في نتيجتها: كان هذا المثال يهدف فقط إلى توضيح كيفية التعامل مع API._

## إضافة القيود {#adding-constraints}

سنرى كيفية تقييد الاستكشاف. سنفترض أن وثائق `f()` تنص على أن الدالة لا يتم استدعاؤها أبدًا باستخدام `a == 65`، لذا فإن أي خطأ مع `a == 65` ليس خطأً حقيقيًا. الهدف لا يزال العقد الذكي التالي [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

تسهل وحدة [العوامل](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) التعامل مع القيود، ومن بين أمور أخرى توفر:

- <span dir="ltr">Operators.AND</span>،
- <span dir="ltr">Operators.OR</span>،
- <span dir="ltr">Operators.UGT</span> (أكبر من بدون إشارة)،
- <span dir="ltr">Operators.UGE</span> (أكبر من أو يساوي بدون إشارة)،
- <span dir="ltr">Operators.ULT</span> (أقل من بدون إشارة)،
- <span dir="ltr">Operators.ULE</span> (أقل من أو يساوي بدون إشارة).

لاستيراد الوحدة استخدم ما يلي:

```python
from manticore.core.smtlib import Operators
```

يُستخدم `Operators.CONCAT` لربط مصفوفة بقيمة. على سبيل المثال، يجب تغيير <span dir="ltr">return_data</span> لمعاملة إلى قيمة ليتم التحقق منها مقابل قيمة أخرى:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### القيود {#state-constraint}

يمكنك استخدام القيود بشكل عام أو لحالة معينة.

#### قيد عام {#state-constraint-2}

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

#### قيد الحالة {#state-constraint-3}

استخدم [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) لإضافة قيد إلى حالة معينة.
يمكن استخدامه لتقييد الحالة بعد استكشافها للتحقق من بعض الخصائص عليها.

### التحقق من القيد {#checking-constraint}

استخدم `solver.check(state.constraints)` لمعرفة ما إذا كان القيد لا يزال ممكنًا.
على سبيل المثال، سيقيد ما يلي <span dir="ltr">symbolic_value</span> ليكون مختلفًا عن 65 ويتحقق مما إذا كانت الحالة لا تزال ممكنة:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # الحالة ممكنة
```

### ملخص: إضافة القيود {#summary-adding-constraints}

بإضافة قيد إلى الكود السابق، نحصل على:

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

## تحقق مما إذا كان التنفيذ ينتهي بتراجع أو غير صالح
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # لا نأخذ في الاعتبار المسار حيث a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

يمكنك العثور على جميع الأكواد أعلاه في [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)