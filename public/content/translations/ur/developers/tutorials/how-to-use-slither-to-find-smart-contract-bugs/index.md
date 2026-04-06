---
title: "اسمارٹ کانٹریکٹ کے بگز تلاش کرنے کے لیے Slither کا استعمال کیسے کریں"
description: "اسمارٹ کانٹریکٹس میں خودکار طریقے سے بگز تلاش کرنے کے لیے Slither کا استعمال کیسے کریں"
author: Trailofbits
lang: ur
tags: ["Solidity", "اسمارٹ کانٹریکٹس", "سیکیورٹی", "ٹیسٹنگ"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither کا استعمال کیسے کریں {#how-to-use-slither}

اس ٹیوٹوریل کا مقصد یہ دکھانا ہے کہ اسمارٹ کانٹریکٹس میں خودکار طریقے سے بگز تلاش کرنے کے لیے Slither کا استعمال کیسے کیا جائے۔

- [انسٹالیشن](#installation)
- [کمانڈ لائن کا استعمال](#command-line)
- [سٹیٹک اینالیسس کا تعارف](#static-analysis): سٹیٹک اینالیسس کا مختصر تعارف
- [API](#api-basics): Python API کی تفصیل

## انسٹالیشن {#installation}

Slither کے لیے <span dir="ltr">Python >= 3.6</span> درکار ہے۔ اسے pip کے ذریعے یا docker کا استعمال کرتے ہوئے انسٹال کیا جا سکتا ہے۔

pip کے ذریعے Slither:

```bash
pip3 install --user slither-analyzer
```

docker کے ذریعے Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/share trailofbits/eth-security-toolbox
```

_آخری کمانڈ ایک docker میں eth-security-toolbox چلاتی ہے جسے آپ کی موجودہ ڈائرکٹری تک رسائی حاصل ہوتی ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور docker سے فائلوں پر ٹولز چلا سکتے ہیں_

docker کے اندر، چلائیں:

```bash
cd /share
```

### اسکرپٹ چلانا {#running-a-script}

python 3 کے ساتھ python اسکرپٹ چلانے کے لیے:

```bash
python3 script.py
```

### کمانڈ لائن {#command-line}

**کمانڈ لائن بمقابلہ صارف کے متعین کردہ اسکرپٹس۔** Slither پہلے سے طے شدہ ڈیٹیکٹرز کے ایک سیٹ کے ساتھ آتا ہے جو بہت سے عام بگز تلاش کرتے ہیں۔ کمانڈ لائن سے Slither کو کال کرنے سے تمام ڈیٹیکٹرز چلیں گے، اس کے لیے سٹیٹک اینالیسس کے تفصیلی علم کی ضرورت نہیں ہے:

```bash
slither project_paths
```

ڈیٹیکٹرز کے علاوہ، Slither میں اپنے [printers](https://github.com/crytic/slither#printers) اور [tools](https://github.com/crytic/slither#tools) کے ذریعے کوڈ کا جائزہ لینے کی صلاحیتیں موجود ہیں۔

نجی ڈیٹیکٹرز اور GitHub انضمام تک رسائی حاصل کرنے کے لیے [crytic.io](https://github.com/crytic) کا استعمال کریں۔

## سٹیٹک اینالیسس {#static-analysis}

Slither سٹیٹک اینالیسس فریم ورک کی صلاحیتوں اور ڈیزائن کو بلاگ پوسٹس ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) اور ایک [اکیڈمک پیپر](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) میں بیان کیا گیا ہے۔

سٹیٹک اینالیسس مختلف اقسام میں موجود ہے۔ آپ کو غالباً اندازہ ہوگا کہ [clang](https://clang-analyzer.llvm.org/) اور [gcc](https://lwn.net/Articles/806099/) جیسے کمپائلرز ان تحقیقی تکنیکوں پر انحصار کرتے ہیں، لیکن یہ ([Infer](https://fbinfer.com/)، [CodeClimate](https://codeclimate.com/)، [FindBugs](http://findbugs.sourceforge.net/) اور رسمی طریقوں پر مبنی ٹولز جیسے [Frama-C](https://frama-c.com/) اور [Polyspace](https://www.mathworks.com/products/polyspace.html) کی بھی بنیاد ہے۔

ہم یہاں سٹیٹک اینالیسس کی تکنیکوں اور محققین کا تفصیلی جائزہ نہیں لیں گے۔ اس کے بجائے، ہم اس بات پر توجہ مرکوز کریں گے کہ Slither کے کام کرنے کے طریقے کو سمجھنے کے لیے کیا ضروری ہے تاکہ آپ اسے بگز تلاش کرنے اور کوڈ کو سمجھنے کے لیے زیادہ مؤثر طریقے سے استعمال کر سکیں۔

- [کوڈ کی نمائندگی](#code-representation)
- [کوڈ کا تجزیہ](#analysis)
- [درمیانی نمائندگی (Intermediate representation)](#intermediate-representation)

### کوڈ کی نمائندگی {#code-representation}

ڈائنامک اینالیسس کے برعکس، جو ایک ہی ایگزیکیوشن پاتھ کے بارے میں استدلال کرتا ہے، سٹیٹک اینالیسس ایک ہی وقت میں تمام پاتھس کے بارے میں استدلال کرتا ہے۔ ایسا کرنے کے لیے، یہ ایک مختلف کوڈ کی نمائندگی پر انحصار کرتا ہے۔ دو سب سے عام نمائندگیاں ایبسٹریکٹ سنٹیکس ٹری (AST) اور کنٹرول فلو گراف (CFG) ہیں۔

### ایبسٹریکٹ سنٹیکس ٹریز (AST) {#abstract-syntax-trees-ast}

جب بھی کمپائلر کوڈ کو پارس کرتا ہے تو AST کا استعمال کیا جاتا ہے۔ یہ شاید وہ سب سے بنیادی ڈھانچہ ہے جس پر سٹیٹک اینالیسس کیا جا سکتا ہے۔

مختصراً، ایک AST ایک ساختی درخت (structured tree) ہے جہاں، عام طور پر، ہر پتے (leaf) میں ایک متغیر (variable) یا مستقل (constant) ہوتا ہے اور اندرونی نوڈز آپرینڈز یا کنٹرول فلو آپریشنز ہوتے ہیں۔ درج ذیل کوڈ پر غور کریں:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

متعلقہ AST اس میں دکھایا گیا ہے:

![AST](./ast.png)

Slither solc کے ذریعے ایکسپورٹ کردہ AST کا استعمال کرتا ہے۔

اگرچہ اسے بنانا آسان ہے، لیکن AST ایک نیسٹڈ (nested) ڈھانچہ ہے۔ بعض اوقات، اس کا تجزیہ کرنا سب سے سیدھا کام نہیں ہوتا۔ مثال کے طور پر، ایکسپریشن `a + b <= a` کے ذریعے استعمال ہونے والے آپریشنز کی شناخت کرنے کے لیے، آپ کو پہلے `<=` اور پھر `+` کا تجزیہ کرنا ہوگا۔ ایک عام طریقہ نام نہاد وزیٹر پیٹرن (visitor pattern) کا استعمال کرنا ہے، جو درخت کے ذریعے بار بار (recursively) نیویگیٹ کرتا ہے۔ Slither میں [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) میں ایک عام وزیٹر شامل ہے۔

درج ذیل کوڈ یہ پتہ لگانے کے لیے `ExpressionVisitor` کا استعمال کرتا ہے کہ آیا ایکسپریشن میں اضافہ (addition) شامل ہے:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # ایکسپریشن وہ ایکسپریشن ہے جس کی جانچ کی جانی ہے
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### کنٹرول فلو گراف (CFG) {#control-flow-graph-cfg}

کوڈ کی دوسری سب سے عام نمائندگی کنٹرول فلو گراف (CFG) ہے۔ جیسا کہ اس کے نام سے ظاہر ہے، یہ گراف پر مبنی نمائندگی ہے جو تمام ایگزیکیوشن پاتھس کو ظاہر کرتی ہے۔ ہر نوڈ میں ایک یا ایک سے زیادہ ہدایات ہوتی ہیں۔ گراف میں کنارے (Edges) کنٹرول فلو آپریشنز (if/then/else، لوپ، وغیرہ) کی نمائندگی کرتے ہیں۔ ہماری پچھلی مثال کا CFG یہ ہے:

![CFG](./cfg.png)

CFG وہ نمائندگی ہے جس کی بنیاد پر زیادہ تر تجزیے بنائے جاتے ہیں۔

کوڈ کی اور بھی بہت سی نمائندگیاں موجود ہیں۔ آپ جو تجزیہ کرنا چاہتے ہیں اس کے لحاظ سے ہر نمائندگی کے فوائد اور نقصانات ہوتے ہیں۔

### تجزیہ {#analysis}

Slither کے ساتھ آپ جو سب سے آسان قسم کے تجزیے کر سکتے ہیں وہ سنٹیکٹک (syntactic) تجزیے ہیں۔

### سنٹیکس کا تجزیہ {#syntax-analysis}

Slither پیٹرن میچنگ جیسی اپروچ کا استعمال کرتے ہوئے تضادات اور خامیوں کو تلاش کرنے کے لیے کوڈ کے مختلف اجزاء اور ان کی نمائندگی کے ذریعے نیویگیٹ کر سکتا ہے۔

مثال کے طور پر درج ذیل ڈیٹیکٹرز سنٹیکس سے متعلق مسائل تلاش کرتے ہیں:

- [اسٹیٹ ویری ایبل شیڈونگ (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): تمام اسٹیٹ ویری ایبلز پر اعادہ (iterate) کرتا ہے اور چیک کرتا ہے کہ آیا کوئی وراثت میں ملے کانٹریکٹ سے کسی ویری ایبل کو شیڈو کرتا ہے ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [غلط ERC20 انٹرفیس](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): غلط ERC20 فنکشن سگنیچرز تلاش کرتا ہے ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### سیمینٹک تجزیہ {#semantic-analysis}

سنٹیکس کے تجزیے کے برعکس، ایک سیمینٹک تجزیہ زیادہ گہرائی میں جائے گا اور کوڈ کے "معنی" کا تجزیہ کرے گا۔ اس فیملی میں تجزیوں کی کچھ وسیع اقسام شامل ہیں۔ یہ زیادہ طاقتور اور مفید نتائج کا باعث بنتے ہیں، لیکن انہیں لکھنا بھی زیادہ پیچیدہ ہوتا ہے۔

سیمینٹک تجزیے سب سے جدید کمزوریوں (vulnerabilities) کا پتہ لگانے کے لیے استعمال ہوتے ہیں۔

#### ڈیٹا ڈیپینڈنسی کا تجزیہ {#fixed-point-computation}

ایک ویری ایبل `variable_a` کو `variable_b` پر ڈیٹا پر منحصر (data-dependent) کہا جاتا ہے اگر کوئی ایسا پاتھ موجود ہو جس کے لیے `variable_a` کی قدر `variable_b` سے متاثر ہوتی ہو۔

درج ذیل کوڈ میں، `variable_a` کا انحصار `variable_b` پر ہے:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither اپنی درمیانی نمائندگی (جس پر بعد کے سیکشن میں بحث کی گئی ہے) کی بدولت بلٹ ان [ڈیٹا ڈیپینڈنسی](https://github.com/crytic/slither/wiki/data-dependency) کی صلاحیتوں کے ساتھ آتا ہے۔

ڈیٹا ڈیپینڈنسی کے استعمال کی ایک مثال [خطرناک سخت برابری کے ڈیٹیکٹر (dangerous strict equality detector)](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) میں مل سکتی ہے۔ یہاں Slither کسی خطرناک قدر کے ساتھ سخت برابری کے موازنے کو تلاش کرے گا ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))، اور صارف کو مطلع کرے گا کہ اسے حملہ آور کو کانٹریکٹ میں پھنسانے سے روکنے کے لیے `==` کے بجائے `>=` یا `<=` کا استعمال کرنا چاہیے۔ دیگر چیزوں کے علاوہ، ڈیٹیکٹر `balanceOf(address)` پر کال کی ریٹرن ویلیو کو خطرناک سمجھے گا ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))، اور اس کے استعمال کو ٹریک کرنے کے لیے ڈیٹا ڈیپینڈنسی انجن کا استعمال کرے گا۔

#### فکسڈ پوائنٹ کیلکولیشن {#fixed-point-computation}

اگر آپ کا تجزیہ CFG کے ذریعے نیویگیٹ کرتا ہے اور کناروں (edges) کی پیروی کرتا ہے، تو آپ کو پہلے سے دیکھے گئے نوڈز نظر آنے کا امکان ہے۔ مثال کے طور پر، اگر کوئی لوپ نیچے دکھائے گئے طریقے سے پیش کیا گیا ہے:

```solidity
for(uint i; i < range; ++i){
    variable_a += 1
}
```

آپ کے تجزیے کو یہ جاننے کی ضرورت ہوگی کہ کب رکنا ہے۔ یہاں دو اہم حکمت عملیاں ہیں: (1) ہر نوڈ پر ایک محدود تعداد میں اعادہ (iterate) کریں، (2) ایک نام نہاد _فکس پوائنٹ (fixpoint)_ کا حساب لگائیں۔ فکس پوائنٹ کا بنیادی مطلب یہ ہے کہ اس نوڈ کا تجزیہ کرنے سے کوئی بامعنی معلومات فراہم نہیں ہوتی ہیں۔

استعمال شدہ فکس پوائنٹ کی ایک مثال ری اینٹرنسی (reentrancy) ڈیٹیکٹرز میں مل سکتی ہے: Slither نوڈز کو دریافت کرتا ہے، اور ایکسٹرنل کالز، اسٹوریج میں لکھنے اور پڑھنے کو تلاش کرتا ہے۔ ایک بار جب یہ فکس پوائنٹ پر پہنچ جاتا ہے ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))، تو یہ دریافت کو روک دیتا ہے، اور مختلف ری اینٹرنسی پیٹرنز ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)، [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)، [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) کے ذریعے یہ دیکھنے کے لیے نتائج کا تجزیہ کرتا ہے کہ آیا ری اینٹرنسی موجود ہے۔

موثر فکسڈ پوائنٹ کیلکولیشن کا استعمال کرتے ہوئے تجزیے لکھنے کے لیے اس بات کی اچھی سمجھ کی ضرورت ہوتی ہے کہ تجزیہ اپنی معلومات کو کیسے پھیلاتا ہے۔

### درمیانی نمائندگی (Intermediate representation) {#intermediate-representation}

ایک درمیانی نمائندگی (IR) ایک ایسی زبان ہے جس کا مقصد اصل زبان کی نسبت سٹیٹک اینالیسس کے لیے زیادہ موزوں ہونا ہے۔ Slither Solidity کا اپنی IR میں ترجمہ کرتا ہے: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)۔

اگر آپ صرف بنیادی چیکس لکھنا چاہتے ہیں تو SlithIR کو سمجھنا ضروری نہیں ہے۔ تاہم، اگر آپ جدید سیمینٹک تجزیے لکھنے کا ارادہ رکھتے ہیں تو یہ کارآمد ثابت ہوگا۔ [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) اور [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) پرنٹرز آپ کو یہ سمجھنے میں مدد کریں گے کہ کوڈ کا ترجمہ کیسے کیا جاتا ہے۔

## API کی بنیادی باتیں {#api-basics}

Slither میں ایک API ہے جو آپ کو کانٹریکٹ اور اس کے فنکشنز کی بنیادی خصوصیات کو دریافت کرنے کی سہولت دیتی ہے۔

کوڈ بیس لوڈ کرنے کے لیے:

```python
from slither.slither import Slither
slither = Slither('/path/to/project')

```

### کانٹریکٹس اور فنکشنز کی دریافت {#exploring-contracts-and-functions}

ایک `Slither` آبجیکٹ میں درج ذیل شامل ہیں:

- `contracts (list(Contract)`: کانٹریکٹس کی فہرست
- `contracts_derived (list(Contract)`: ان کانٹریکٹس کی فہرست جو کسی دوسرے کانٹریکٹ سے وراثت میں نہیں ملے ہیں (کانٹریکٹس کا ذیلی سیٹ)
- `get_contract_from_name (str)`: اس کے نام سے ایک کانٹریکٹ واپس کرتا ہے

ایک `Contract` آبجیکٹ میں درج ذیل شامل ہیں:

- `name (str)`: کانٹریکٹ کا نام
- `functions (list(Function))`: فنکشنز کی فہرست
- `modifiers (list(Modifier))`: فنکشنز کی فہرست
- `all_functions_called (list(Function/Modifier))`: کانٹریکٹ کے ذریعے قابل رسائی تمام اندرونی فنکشنز کی فہرست
- `inheritance (list(Contract))`: وراثت میں ملے کانٹریکٹس کی فہرست
- `get_function_from_signature (str)`: اس کے سگنیچر سے ایک فنکشن واپس کرتا ہے
- `get_modifier_from_signature (str)`: اس کے سگنیچر سے ایک موڈیفائر واپس کرتا ہے
- `get_state_variable_from_name (str)`: اس کے نام سے ایک StateVariable واپس کرتا ہے

ایک `Function` یا `Modifier` آبجیکٹ میں درج ذیل شامل ہیں:

- `name (str)`: فنکشن کا نام
- `contract (contract)`: وہ کانٹریکٹ جہاں فنکشن ڈکلیئر کیا گیا ہے
- `nodes (list(Node))`: فنکشن/موڈیفائر کے CFG پر مشتمل نوڈز کی فہرست
- `entry_point (Node)`: CFG کا انٹری پوائنٹ
- `variables_read (list(Variable))`: پڑھے گئے ویری ایبلز کی فہرست
- `variables_written (list(Variable))`: لکھے گئے ویری ایبلز کی فہرست
- `state_variables_read (list(StateVariable))`: پڑھے گئے اسٹیٹ ویری ایبلز کی فہرست (variables`read کا ذیلی سیٹ)
- `state_variables_written (list(StateVariable))`: لکھے گئے اسٹیٹ ویری ایبلز کی فہرست (variables`written کا ذیلی سیٹ)