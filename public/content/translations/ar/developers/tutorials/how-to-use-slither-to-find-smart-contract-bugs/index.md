---
title: كيفية استخدام Slither للعثور على الأخطاء في العقود الذكية
description: كيفية استخدام Slither للعثور تلقائيًا على الأخطاء في العقود الذكية
author: طريق البتات
lang: ar
tags: [ "الصلابة", "العقود الذكيه ", "الأمن", "الاختبار" ]
skill: advanced
published: 2020-06-09
source: عقود البناء الآمنة
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## كيفية استخدام Slither {#how-to-use-slither}

الهدف من هذا الدرس التعليمي هو توضيح كيفية استخدام Slither للعثور تلقائيًا على الأخطاء في العقود الذكية.

- [التثبيت](#installation)
- [استخدام سطر الأوامر](#command-line)
- [مقدمة في التحليل الثابت](#static-analysis): مقدمة موجزة في التحليل الثابت
- [واجهة برمجة التطبيقات](#api-basics): وصف واجهة برمجة تطبيقات Python

## التثبيت {#installation}

يتطلب Slither إصدار Python >= 3.6. يمكن تثبيته من خلال pip أو باستخدام docker.

Slither من خلال pip:

```bash
pip3 install --user slither-analyzer
```

Slither من خلال docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_الأمر الأخير يشغل eth-security-toolbox في حاوية docker لديها صلاحية الوصول إلى دليلك الحالي. يمكنك تغيير الملفات من مضيفك، وتشغيل الأدوات على الملفات من حاوية docker_

داخل حاوية docker، قم بتشغيل:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### تشغيل نص برمجي {#running-a-script}

لتشغيل نص python برمجي باستخدام python 3:

```bash
python3 script.py
```

### سطر الأوامر {#command-line}

**سطر الأوامر مقابل البرامج النصية المعرفة من قبل المستخدم.** يأتي Slither مع مجموعة من أجهزة الكشف المحددة مسبقًا والتي تعثر على العديد من الأخطاء الشائعة. سيؤدي استدعاء Slither من سطر الأوامر إلى تشغيل جميع أجهزة الكشف، دون الحاجة إلى معرفة تفصيلية بالتحليل الثابت:

```bash
slither project_paths
```

بالإضافة إلى أجهزة الكشف، يمتلك Slither إمكانيات مراجعة النص البرمجي من خلال [الطابعات](https://github.com/crytic/slither#printers) و[الأدوات](https://github.com/crytic/slither#tools) الخاصة به.

استخدم [crytic.io](https://github.com/crytic) للوصول إلى أجهزة الكشف الخاصة وتكامل GitHub.

## التحليل الثابت {#static-analysis}

تم وصف إمكانيات وتصميم إطار عمل التحليل الثابت Slither في منشورات المدونة ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)، [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) و[ورقة أكاديمية](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

يوجد التحليل الثابت في أنواع مختلفة. من المرجح أنك تدرك أن المترجمات مثل [clang](https://clang-analyzer.llvm.org/) و[gcc](https://lwn.net/Articles/806099/) تعتمد على تقنيات البحث هذه، ولكنها تدعم أيضًا ([Infer](https://fbinfer.com/)، [CodeClimate](https://codeclimate.com/)، [FindBugs](http://findbugs.sourceforge.net/) والأدوات القائمة على الأساليب الرسمية مثل [Frama-C](https://frama-c.com/) و[Polyspace](https://www.mathworks.com/products/polyspace.html).

لن نقوم بمراجعة شاملة لتقنيات التحليل الثابت والباحثين هنا. بدلاً من ذلك، سنركز على ما هو مطلوب لفهم كيفية عمل Slither حتى تتمكن من استخدامه بشكل أكثر فاعلية للعثور على الأخطاء وفهم النص البرمجي.

- [تمثيل النص البرمجي](#code-representation)
- [تحليل النص البرمجي](#analysis)
- [التمثيل الوسيط](#intermediate-representation)

### تمثيل النص البرمجي {#code-representation}

على النقيض من التحليل الديناميكي، الذي يستنتج مسار تنفيذ واحد، يستنتج التحليل الثابت جميع المسارات في وقت واحد. للقيام بذلك، فإنه يعتمد على تمثيل مختلف للنص البرمجي. الأكثر شيوعًا هما شجرة بناء الجملة المجردة (AST) ورسم بياني لتدفق التحكم (CFG).

### أشجار بناء الجملة المجردة (AST) {#abstract-syntax-trees-ast}

تُستخدم أشجار بناء الجملة المجردة (AST) في كل مرة يقوم فيها المحول البرمجي بتحليل النص البرمجي. ربما تكون البنية الأساسية التي يمكن على أساسها إجراء التحليل الثابت.

باختصار، شجرة بناء الجملة المجردة (AST) هي شجرة منظمة حيث تحتوي كل ورقة عادةً على متغير أو ثابت، والعقد الداخلية هي معاملات أو عمليات تدفق تحكم. خذ بعين الاعتبار النص البرمجي التالي:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

يتم عرض شجرة بناء الجملة المجردة (AST) المقابلة في:

![AST](./ast.png)

يستخدم Slither شجرة بناء الجملة المجردة (AST) التي يتم تصديرها بواسطة solc.

على الرغم من بساطة بنائها، فإن شجرة بناء الجملة المجردة (AST) هي بنية متداخلة. في بعض الأحيان، لا يكون هذا هو التحليل الأكثر وضوحًا. على سبيل المثال، لتحديد العمليات المستخدمة في التعبير `a + b <= a`، يجب عليك أولاً تحليل `<=` ثم `+`. النهج الشائع هو استخدام ما يسمى بنمط الزائر (visitor pattern)، والذي يتنقل عبر الشجرة بشكل متكرر. يحتوي Slither على زائر عام في [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

يستخدم النص البرمجي التالي `ExpressionVisitor` للكشف عما إذا كان التعبير يحتوي على إضافة:

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
print(f'التعبير {expression} لديه إضافة: {visitor.result()}')
```

### الرسم البياني لتدفق التحكم (CFG) {#control-flow-graph-cfg}

التمثيل الثاني الأكثر شيوعًا للنص البرمجي هو الرسم البياني لتدفق التحكم (CFG). كما يوحي اسمه، فهو تمثيل قائم على الرسم البياني يكشف جميع مسارات التنفيذ. تحتوي كل عقدة على تعليمة واحدة أو عدة تعليمات. تمثل الحواف في الرسم البياني عمليات تدفق التحكم (if/then/else، والحلقة، وما إلى ذلك). الرسم البياني لتدفق التحكم (CFG) لمثالنا السابق هو:

![CFG](./cfg.png)

الرسم البياني لتدفق التحكم (CFG) هو التمثيل الذي تُبنى عليه معظم التحليلات.

توجد العديد من تمثيلات النص البرمجي الأخرى. لكل تمثيل مزايا وعيوب وفقًا للتحليل الذي تريد إجراءه.

### التحليل {#analysis}

أبسط أنواع التحليلات التي يمكنك إجراؤها باستخدام Slither هي التحليلات النحوية.

### تحليل بناء الجملة {#syntax-analysis}

يمكن لـ Slither التنقل عبر المكونات المختلفة للنص البرمجي وتمثيلها للعثور على التناقضات والعيوب باستخدام نهج يشبه مطابقة الأنماط.

على سبيل المثال، تبحث أجهزة الكشف التالية عن المشكلات المتعلقة ببناء الجملة:

- [إخفاء متغير الحالة](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): يتكرر على جميع متغيرات الحالة ويتحقق مما إذا كان أي منها يخفي متغيرًا من عقد موروث ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [واجهة ERC20 غير الصحيحة](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): ابحث عن تواقيع دالة ERC20 غير الصحيحة ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### التحليل الدلالي {#semantic-analysis}

على النقيض من تحليل بناء الجملة، فإن التحليل الدلالي سوف يتعمق ويحلل "معنى" النص البرمجي. تشمل هذه العائلة بعض الأنواع الواسعة من التحليلات. إنها تؤدي إلى نتائج أكثر قوة وفائدة، ولكنها أيضًا أكثر تعقيدًا في الكتابة.

تُستخدم التحليلات الدلالية في الكشف عن الثغرات الأمنية الأكثر تقدمًا.

#### تحليل تبعية البيانات {#fixed-point-computation}

يقال إن المتغير `variable_a` يعتمد على بيانات `variable_b` إذا كان هناك مسار تتأثر فيه قيمة `variable_a` بـ `variable_b`.

في النص البرمجي التالي، يعتمد `variable_a` على `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

يأتي Slither مزودًا بإمكانيات [تبعية البيانات](https://github.com/crytic/slither/wiki/data-dependency) المضمنة، وذلك بفضل التمثيل الوسيط الخاص به (والذي تمت مناقشته في قسم لاحق).

يمكن العثور على مثال لاستخدام تبعية البيانات في [كاشف المساواة الصارمة الخطير](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). هنا سيبحث Slither عن مقارنة المساواة الصارمة بقيمة خطيرة ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))، وسيبلغ المستخدم أنه يجب عليه استخدام `>=` أو `<=` بدلاً من `==`، لمنع المهاجم من محاصرة العقد. من بين أمور أخرى، سيعتبر الكاشف القيمة المرجعة لاستدعاء `balanceOf(address)` خطيرة ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))، وسيستخدم محرك تبعية البيانات لتتبع استخدامه.

#### حساب النقطة الثابتة {#fixed-point-computation}

إذا كان تحليلك يتنقل عبر الرسم البياني لتدفق التحكم (CFG) ويتبع الحواف، فمن المحتمل أن ترى العقد التي تمت زيارتها بالفعل. على سبيل المثال، إذا تم تقديم حلقة كما هو موضح أدناه:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

سيحتاج تحليلك إلى معرفة متى يتوقف. هناك استراتيجيتان رئيسيتان هنا: (1) التكرار على كل عقدة عددًا محدودًا من المرات، (2) حساب ما يسمى بـ _نقطة ثابتة_ (fixpoint). النقطة الثابتة (fixpoint) تعني بشكل أساسي أن تحليل هذه العقدة لا يوفر أي معلومات ذات معنى.

يمكن العثور على مثال لاستخدام النقطة الثابتة في كاشفات إعادة الدخول: يستكشف Slither العقد، ويبحث عن الاستدعاءات الخارجية والكتابة والقراءة إلى التخزين. بمجرد وصولها إلى نقطة ثابتة ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))، فإنها توقف الاستكشاف، وتحلل النتائج لمعرفة ما إذا كان هناك إعادة دخول، من خلال أنماط إعادة دخول مختلفة ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)، [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)، [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

تتطلب كتابة التحليلات باستخدام حساب النقطة الثابتة الفعال فهمًا جيدًا لكيفية نشر التحليل لمعلوماته.

### التمثيل الوسيط {#intermediate-representation}

التمثيل الوسيط (IR) هو لغة يُقصد بها أن تكون أكثر قابلية للتحليل الثابت من اللغة الأصلية. يترجم Slither سوليديتي إلى التمثيل الوسيط الخاص به: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

فهم SlithIR ليس ضروريًا إذا كنت تريد فقط كتابة فحوصات أساسية. ومع ذلك، سيكون مفيداً إذا كنت تخطط لكتابة تحليلات دلالية متقدمة. ستساعدك طابعات [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) و[SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) على فهم كيفية ترجمة النص البرمجي.

## أساسيات واجهة برمجة التطبيقات {#api-basics}

يحتوي Slither على واجهة برمجة تطبيقات تتيح لك استكشاف السمات الأساسية للعقد ووظائفه.

لتحميل قاعدة بيانات برمجية:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### استكشاف العقود والوظائف {#exploring-contracts-and-functions}

يحتوي كائن `Slither` على:

- `contracts (list(Contract)`: قائمة العقود
- `contracts_derived (list(Contract)`: قائمة العقود التي لم يتم توريثها من عقد آخر (مجموعة فرعية من العقود)
- `get_contract_from_name (str)`: إرجاع عقد من اسمه

يحتوي كائن `Contract` على:

- `name (str)`: اسم العقد
- `functions (list(Function))`: قائمة الوظائف
- `modifiers (list(Modifier))`: قائمة المُعدِّلات
- `all_functions_called (list(Function/Modifier))`: قائمة بجميع الوظائف الداخلية التي يمكن الوصول إليها بواسطة العقد
- `inheritance (list(Contract))`: قائمة العقود الموروثة
- `get_function_from_signature (str)`: إرجاع وظيفة من توقيعها
- `get_modifier_from_signature (str)`: إرجاع مُعدِّل من توقيعه
- `get_state_variable_from_name (str)`: إرجاع متغير حالة من اسمه

يحتوي كائن `Function` أو `Modifier` على:

- `name (str)`: اسم الوظيفة
- `contract (contract)`: العقد الذي تم الإعلان عن الوظيفة فيه
- `nodes (list(Node))`: قائمة العقد التي يتكون منها الرسم البياني لتدفق التحكم للوظيفة/المُعدِّل
- `entry_point (Node)`: نقطة الدخول للرسم البياني لتدفق التحكم
- `variables_read (list(Variable))`: قائمة المتغيرات المقروءة
- `variables_written (list(Variable))`: قائمة المتغيرات المكتوبة
- `state_variables_read (list(StateVariable))`: قائمة متغيرات الحالة المقروءة (مجموعة فرعية من variables\`read)
- `state_variables_written (list(StateVariable))`: قائمة متغيرات الحالة المكتوبة (مجموعة فرعية من variables\`written)
