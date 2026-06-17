---
title: ⁦كيفية استخدام سليذر للعثور على أخطاء العقود الذكية⁩
description: ⁦كيفية استخدام سليذر للعثور تلقائيًا على الأخطاء في العقود الذكية⁩
author: تريل أوف بيتس
lang: ar
tags:
  - Solidity
  - العقود الذكية
  - الأمان
  - الاختبار
skill: advanced
breadcrumb: ⁦سليذر⁩
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## كيفية استخدام سليذر {#how-to-use-slither}

الهدف من هذا البرنامج التعليمي هو إظهار كيفية استخدام سليذر للعثور تلقائيًا على الأخطاء في العقود الذكية.

- [التثبيت](#installation)
- [استخدام سطر الأوامر](#command-line)
- [مقدمة في التحليل الثابت](#static-analysis): مقدمة موجزة عن التحليل الثابت
- [API](#api-basics): وصف API الخاص بلغة Python

## التثبيت {#installation}

يتطلب سليذر إصدار <span dir="ltr">Python >= 3.6</span>. يمكن تثبيته من خلال <span dir="ltr">pip</span> أو باستخدام Docker.

تثبيت سليذر من خلال <span dir="ltr">pip</span>:

```bash
pip3 install --user slither-analyzer
```

تثبيت سليذر من خلال Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_يقوم الأمر الأخير بتشغيل <span dir="ltr">eth-security-toolbox</span> في Docker لديه حق الوصول إلى دليلك الحالي. يمكنك تغيير الملفات من مضيفك، وتشغيل الأدوات على الملفات من Docker_

داخل Docker، قم بتشغيل:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### تشغيل برنامج نصي {#running-a-script}

لتشغيل برنامج نصي بلغة Python باستخدام <span dir="ltr">Python 3</span>:

```bash
python3 script.py
```

### سطر الأوامر {#command-line}

**سطر الأوامر مقابل البرامج النصية المعرفة من قبل المستخدم.** يأتي سليذر مع مجموعة من أجهزة الكشف المحددة مسبقًا التي تعثر على العديد من الأخطاء الشائعة. سيؤدي استدعاء سليذر من سطر الأوامر إلى تشغيل جميع أجهزة الكشف، ولا حاجة إلى معرفة تفصيلية بالتحليل الثابت:

```bash
slither project_paths
```

بالإضافة إلى أجهزة الكشف، يتمتع سليذر بقدرات مراجعة التعليمات البرمجية من خلال [الطابعات (printers)](https://github.com/crytic/slither#printers) و[الأدوات](https://github.com/crytic/slither#tools) الخاصة به.

استخدم [crytic.io](https://github.com/crytic) للوصول إلى أجهزة الكشف الخاصة والتكامل مع GitHub.

## التحليل الثابت {#static-analysis}

تم وصف قدرات وتصميم إطار عمل التحليل الثابت لسليذر في منشورات المدونة ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)، [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) و[ورقة أكاديمية](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

يوجد التحليل الثابت بأشكال مختلفة. من المحتمل أنك تدرك أن المترجمات مثل [clang](https://clang-analyzer.llvm.org/) و[gcc](https://lwn.net/Articles/806099/) تعتمد على تقنيات البحث هذه، ولكنه يدعم أيضًا أدوات مثل ([Infer](https://fbinfer.com/)، و[CodeClimate](https://codeclimate.com/)، و[FindBugs](https://findbugs.sourceforge.net/)) والأدوات القائمة على الأساليب الرسمية مثل [Frama-C](https://frama-c.com/) و[Polyspace](https://www.mathworks.com/products/polyspace.html).

لن نقوم بمراجعة شاملة لتقنيات التحليل الثابت والباحثين هنا. بدلاً من ذلك، سنركز على ما هو مطلوب لفهم كيفية عمل سليذر حتى تتمكن من استخدامه بشكل أكثر فعالية للعثور على الأخطاء وفهم التعليمات البرمجية.

- [تمثيل التعليمات البرمجية](#code-representation)
- [تحليل التعليمات البرمجية](#analysis)
- [التمثيل الوسيط](#intermediate-representation)

### تمثيل التعليمات البرمجية {#code-representation}

على عكس التحليل الديناميكي، الذي يحلل مسار تنفيذ واحد، يحلل التحليل الثابت جميع المسارات في وقت واحد. للقيام بذلك، فإنه يعتمد على تمثيل مختلف للتعليمات البرمجية. أكثر تمثيلين شيوعًا هما شجرة بناء الجملة المجردة (AST) ورسم تدفق التحكم (CFG).

### شجرة بناء الجملة المجردة (AST) {#abstract-syntax-trees-ast}

يتم استخدام AST في كل مرة يقوم فيها المترجم بتحليل التعليمات البرمجية. ربما يكون الهيكل الأساسي الذي يمكن إجراء التحليل الثابت عليه.

باختصار، AST عبارة عن شجرة منظمة حيث تحتوي كل ورقة عادةً على متغير أو ثابت، وتكون العقد الداخلية عبارة عن معاملات أو عمليات تدفق التحكم. ضع في اعتبارك التعليمات البرمجية التالية:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

يظهر AST المقابل في:

![AST](./ast.png)

يستخدم سليذر AST المُصدَّر بواسطة <span dir="ltr">solc</span>.

على الرغم من سهولة بنائه، إلا أن AST عبارة عن هيكل متداخل. في بعض الأحيان، لا يكون هذا هو الأسهل للتحليل. على سبيل المثال، لتحديد العمليات التي يستخدمها التعبير `a + b <= a`، يجب عليك أولاً تحليل `<=` ثم `+`. النهج الشائع هو استخدام ما يسمى بنمط الزائر (visitor pattern)، والذي يتنقل عبر الشجرة بشكل متكرر. يحتوي سليذر على زائر عام في [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

تستخدم التعليمات البرمجية التالية `ExpressionVisitor` لاكتشاف ما إذا كان التعبير يحتوي على عملية جمع:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # التعبير هو التعبير المراد اختباره
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### رسم تدفق التحكم (CFG) {#control-flow-graph-cfg}

ثاني أكثر تمثيل للتعليمات البرمجية شيوعًا هو رسم تدفق التحكم (CFG). كما يوحي اسمه، فهو تمثيل قائم على الرسم البياني يعرض جميع مسارات التنفيذ. تحتوي كل عقدة على تعليمة واحدة أو عدة تعليمات. تمثل الحواف في الرسم البياني عمليات تدفق التحكم (if/then/else، loop، إلخ). إن CFG للمثال السابق هو:

![CFG](./cfg.png)

إن CFG هو التمثيل الذي تُبنى عليه معظم التحليلات.

توجد العديد من تمثيلات التعليمات البرمجية الأخرى. لكل تمثيل مزايا وعيوب وفقًا للتحليل الذي تريد إجراؤه.

### التحليل {#analysis}

أبسط أنواع التحليلات التي يمكنك إجراؤها باستخدام سليذر هي التحليلات النحوية.

### التحليل النحوي {#syntax-analysis}

يمكن لسليذر التنقل عبر المكونات المختلفة للتعليمات البرمجية وتمثيلها للعثور على التناقضات والعيوب باستخدام نهج يشبه مطابقة الأنماط.

على سبيل المثال، تبحث أجهزة الكشف التالية عن المشكلات المتعلقة ببناء الجملة:

- [تظليل متغير الحالة (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): يكرر عبر جميع متغيرات الحالة ويتحقق مما إذا كان أي منها يظلل متغيرًا من عقد موروث ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [واجهة ERC-20 غير صحيحة](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): يبحث عن تواقيع دوال ERC-20 غير الصحيحة ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### التحليل الدلالي {#semantic-analysis}

على عكس التحليل النحوي، سيتعمق التحليل الدلالي ويحلل "معنى" التعليمات البرمجية. تتضمن هذه العائلة بعض الأنواع الواسعة من التحليلات. إنها تؤدي إلى نتائج أكثر قوة وفائدة، ولكنها أيضًا أكثر تعقيدًا في الكتابة.

تُستخدم التحليلات الدلالية لاكتشافات الثغرات الأمنية الأكثر تقدمًا.

#### تحليل تبعية البيانات {#fixed-point-computation}

يُقال إن المتغير `variable_a` يعتمد على بيانات `variable_b` إذا كان هناك مسار تتأثر فيه قيمة `variable_a` بـ `variable_b`.

في التعليمات البرمجية التالية، يعتمد `variable_a` على `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

يأتي سليذر مزودًا بقدرات [تبعية البيانات](https://github.com/crytic/slither/wiki/data-dependency) المدمجة، بفضل تمثيله الوسيط (تمت مناقشته في قسم لاحق).

يمكن العثور على مثال لاستخدام تبعية البيانات في [كاشف المساواة الصارمة الخطيرة](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). هنا سيبحث سليذر عن مقارنة المساواة الصارمة بقيمة خطيرة ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))، وسيبلغ المستخدم أنه يجب عليه استخدام `>=` أو `<=` بدلاً من `==`، لمنع المهاجم من الإيقاع بالعقد. من بين أمور أخرى، سيعتبر الكاشف القيمة المرجعة لاستدعاء `balanceOf(address)` خطيرة ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))، وسيستخدم محرك تبعية البيانات لتتبع استخدامها.

#### حساب النقطة الثابتة {#fixed-point-computation-2}

إذا كان تحليلك يتنقل عبر CFG ويتبع الحواف، فمن المحتمل أن ترى عقدًا تمت زيارتها بالفعل. على سبيل المثال، إذا تم تقديم حلقة كما هو موضح أدناه:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

سيحتاج تحليلك إلى معرفة متى يتوقف. هناك استراتيجيتان رئيسيتان هنا: (1) التكرار على كل عقدة لعدد محدود من المرات، (2) حساب ما يسمى _النقطة الثابتة (fixpoint)_. تعني النقطة الثابتة أساسًا أن تحليل هذه العقدة لا يوفر أي معلومات مفيدة.

يمكن العثور على مثال لاستخدام النقطة الثابتة في أجهزة كشف إعادة الدخول: يستكشف سليذر العقد، ويبحث عن الاستدعاءات الخارجية، والكتابة والقراءة في التخزين. بمجرد وصوله إلى نقطة ثابتة ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))، فإنه يوقف الاستكشاف، ويحلل النتائج لمعرفة ما إذا كانت إعادة الدخول موجودة، من خلال أنماط إعادة الدخول المختلفة ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)، [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)، [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

تتطلب كتابة التحليلات باستخدام حساب النقطة الثابتة الفعال فهمًا جيدًا لكيفية نشر التحليل لمعلوماته.

### التمثيل الوسيط {#intermediate-representation}

التمثيل الوسيط (IR) هو لغة يُقصد بها أن تكون أكثر قابلية للتحليل الثابت من اللغة الأصلية. يترجم سليذر لغة Solidity إلى IR الخاص به: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

فهم SlithIR ليس ضروريًا إذا كنت تريد فقط كتابة فحوصات أساسية. ومع ذلك، سيكون مفيدًا إذا كنت تخطط لكتابة تحليلات دلالية متقدمة. ستساعدك طابعات [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) و[SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) على فهم كيفية ترجمة التعليمات البرمجية.

## أساسيات API {#api-basics}

يحتوي سليذر على API يتيح لك استكشاف السمات الأساسية للعقد ودواله.

لتحميل قاعدة تعليمات برمجية:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### استكشاف العقود والدوال {#exploring-contracts-and-functions}

يحتوي كائن `Slither` على:

- `contracts (list(Contract)`: قائمة العقود
- `contracts_derived (list(Contract)`: قائمة العقود التي لم يتم توريثها بواسطة عقد آخر (مجموعة فرعية من العقود)
- `get_contract_from_name (str)`: إرجاع عقد من اسمه

يحتوي كائن `Contract` على:

- `name (str)`: اسم العقد
- `functions (list(Function))`: قائمة الدوال
- `modifiers (list(Modifier))`: قائمة الدوال
- `all_functions_called (list(Function/Modifier))`: قائمة بجميع الدوال الداخلية التي يمكن للعقد الوصول إليها
- `inheritance (list(Contract))`: قائمة العقود الموروثة
- `get_function_from_signature (str)`: إرجاع دالة من توقيعها
- `get_modifier_from_signature (str)`: إرجاع مُعدِّل (Modifier) من توقيعه
- `get_state_variable_from_name (str)`: إرجاع متغير حالة (StateVariable) من اسمه

يحتوي كائن `Function` أو `Modifier` على:

- `name (str)`: اسم الدالة
- `contract (contract)`: العقد الذي تم الإعلان عن الدالة فيه
- `nodes (list(Node))`: قائمة العقد التي يتكون منها CFG للدالة/المُعدِّل
- `entry_point (Node)`: نقطة الدخول إلى CFG
- `variables_read (list(Variable))`: قائمة المتغيرات المقروءة
- `variables_written (list(Variable))`: قائمة المتغيرات المكتوبة
- `state_variables_read (list(StateVariable))`: قائمة متغيرات الحالة المقروءة (مجموعة فرعية من المتغيرات المقروءة)
- `state_variables_written (list(StateVariable))`: قائمة متغيرات الحالة المكتوبة (مجموعة فرعية من المتغيرات المكتوبة)