---
title: "سمارٹ کنٹریکٹ کے بگز تلاش کرنے کے لیے سلدر کا استعمال کیسے کریں"
description: "سمارٹ کنٹریکٹس میں خودکار طریقے سے بگز تلاش کرنے کے لیے سلدر کا استعمال کیسے کریں"
author: "ٹریل آف بٹس"
lang: ur
tags: ["Solidity", "سمارٹ کنٹریکٹس", "سیکیورٹی", "ٹیسٹنگ"]
skill: advanced
breadcrumb: "سلدر"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## سلدر کا استعمال کیسے کریں {#how-to-use-slither}

اس ٹیوٹوریل کا مقصد یہ دکھانا ہے کہ سمارٹ کنٹریکٹس میں خودکار طریقے سے بگز تلاش کرنے کے لیے سلدر کا استعمال کیسے کیا جائے۔

- [انسٹالیشن](#installation)
- [کمانڈ لائن کا استعمال](#command-line)
- [سٹیٹک تجزیہ کا تعارف](#static-analysis): سٹیٹک تجزیہ کا مختصر تعارف
- [<span dir="ltr">API</span>](#api-basics): <span dir="ltr">Python API</span> کی تفصیل

## انسٹالیشن {#installation}

سلدر کے لیے <span dir="ltr">Python >= 3.6</span> درکار ہے۔ اسے <span dir="ltr">pip</span> کے ذریعے یا <span dir="ltr">Docker</span> کا استعمال کرتے ہوئے انسٹال کیا جا سکتا ہے۔

<span dir="ltr">pip</span> کے ذریعے سلدر:

```bash
pip3 install --user slither-analyzer
```

<span dir="ltr">Docker</span> کے ذریعے سلدر:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_آخری کمانڈ <span dir="ltr">eth-security-toolbox</span> کو ایک <span dir="ltr">Docker</span> میں چلاتی ہے جسے آپ کی موجودہ ڈائریکٹری تک رسائی حاصل ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور <span dir="ltr">Docker</span> سے فائلوں پر ٹولز چلا سکتے ہیں_

<span dir="ltr">Docker</span> کے اندر، چلائیں:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### سکرپٹ چلانا {#running-a-script}

<span dir="ltr">Python 3</span> کے ساتھ <span dir="ltr">Python</span> سکرپٹ چلانے کے لیے:

```bash
python3 script.py
```

### کمانڈ لائن {#command-line}

**کمانڈ لائن بمقابلہ صارف کے متعین کردہ سکرپٹس۔** سلدر پہلے سے طے شدہ ڈیٹیکٹرز کے ایک سیٹ کے ساتھ آتا ہے جو بہت سے عام بگز تلاش کرتے ہیں۔ کمانڈ لائن سے سلدر کو کال کرنے سے تمام ڈیٹیکٹرز چلیں گے، سٹیٹک تجزیہ کے تفصیلی علم کی ضرورت نہیں ہے:

```bash
slither project_paths
```

ڈیٹیکٹرز کے علاوہ، سلدر میں اپنے [پرنٹرز](https://github.com/crytic/slither#printers) اور [ٹولز](https://github.com/crytic/slither#tools) کے ذریعے کوڈ کا جائزہ لینے کی صلاحیتیں موجود ہیں۔

نجی ڈیٹیکٹرز اور <span dir="ltr">GitHub</span> انضمام تک رسائی حاصل کرنے کے لیے [<span dir="ltr">crytic.io</span>](https://github.com/crytic) کا استعمال کریں۔

## سٹیٹک تجزیہ {#static-analysis}

سلدر سٹیٹک تجزیہ فریم ورک کی صلاحیتوں اور ڈیزائن کو بلاگ پوسٹس ([<span dir="ltr">1</span>](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)، [<span dir="ltr">2</span>](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) اور ایک [اکیڈمک پیپر](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) میں بیان کیا گیا ہے۔

سٹیٹک تجزیہ مختلف اقسام میں موجود ہے۔ آپ کو غالباً احساس ہوگا کہ [<span dir="ltr">clang</span>](https://clang-analyzer.llvm.org/) اور [<span dir="ltr">gcc</span>](https://lwn.net/Articles/806099/) جیسے کمپائلرز ان تحقیقی تکنیکوں پر انحصار کرتے ہیں، لیکن یہ ([<span dir="ltr">Infer</span>](https://fbinfer.com/)، [<span dir="ltr">CodeClimate</span>](https://codeclimate.com/)، [<span dir="ltr">FindBugs</span>](https://findbugs.sourceforge.net/) اور رسمی طریقوں پر مبنی ٹولز جیسے [<span dir="ltr">Frama-C</span>](https://frama-c.com/) اور [<span dir="ltr">Polyspace</span>](https://www.mathworks.com/products/polyspace.html) کی بھی بنیاد ہے۔

ہم یہاں سٹیٹک تجزیہ کی تکنیکوں اور محققین کا جامع جائزہ نہیں لیں گے۔ اس کے بجائے، ہم اس بات پر توجہ مرکوز کریں گے کہ سلدر کے کام کرنے کے طریقے کو سمجھنے کے لیے کیا ضروری ہے تاکہ آپ اسے بگز تلاش کرنے اور کوڈ کو سمجھنے کے لیے زیادہ مؤثر طریقے سے استعمال کر سکیں۔

- [کوڈ کی نمائندگی](#code-representation)
- [کوڈ کا تجزیہ](#analysis)
- [درمیانی نمائندگی](#intermediate-representation)

### کوڈ کی نمائندگی {#code-representation}

متحرک تجزیہ (dynamic analysis) کے برعکس، جو ایک ہی ایگزیکیوشن پاتھ کے بارے میں استدلال کرتا ہے، سٹیٹک تجزیہ ایک ہی وقت میں تمام پاتھس کے بارے میں استدلال کرتا ہے۔ ایسا کرنے کے لیے، یہ ایک مختلف کوڈ کی نمائندگی پر انحصار کرتا ہے۔ دو سب سے عام نمائندگیاں ایبسٹریکٹ سنٹیکس ٹری (<span dir="ltr">AST</span>) اور کنٹرول فلو گراف (<span dir="ltr">CFG</span>) ہیں۔

### ایبسٹریکٹ سنٹیکس ٹریز (<span dir="ltr">AST</span>) {#abstract-syntax-trees-ast}

جب بھی کمپائلر کوڈ کو پارس کرتا ہے تو <span dir="ltr">AST</span> کا استعمال کیا جاتا ہے۔ یہ شاید سب سے بنیادی ڈھانچہ ہے جس پر سٹیٹک تجزیہ کیا جا سکتا ہے۔

مختصراً، ایک <span dir="ltr">AST</span> ایک سٹرکچرڈ ٹری ہے جہاں، عام طور پر، ہر لیف (leaf) میں ایک متغیر (variable) یا مستقل (constant) ہوتا ہے اور اندرونی نوڈز آپرینڈز (operands) یا کنٹرول فلو آپریشنز ہوتے ہیں۔ درج ذیل کوڈ پر غور کریں:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

متعلقہ <span dir="ltr">AST</span> اس میں دکھایا گیا ہے:

![AST](./ast.png)

سلدر <span dir="ltr">solc</span> کے ذریعے ایکسپورٹ کردہ <span dir="ltr">AST</span> کا استعمال کرتا ہے۔

اگرچہ اسے بنانا آسان ہے، لیکن <span dir="ltr">AST</span> ایک نیسٹڈ (nested) ڈھانچہ ہے۔ بعض اوقات، اس کا تجزیہ کرنا سب سے سیدھا کام نہیں ہوتا۔ مثال کے طور پر، ایکسپریشن `a + b <= a` کے ذریعے استعمال ہونے والے آپریشنز کی شناخت کرنے کے لیے، آپ کو پہلے `<=` اور پھر `+` کا تجزیہ کرنا ہوگا۔ ایک عام طریقہ نام نہاد وزیٹر پیٹرن (visitor pattern) کا استعمال کرنا ہے، جو ٹری کے ذریعے بار بار (recursively) نیویگیٹ کرتا ہے۔ سلدر میں [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) میں ایک عام وزیٹر شامل ہے۔

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

visitor = HasAddition(expression) # expression وہ ایکسپریشن ہے جسے ٹیسٹ کیا جانا ہے
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### کنٹرول فلو گراف (<span dir="ltr">CFG</span>) {#control-flow-graph-cfg}

دوسری سب سے عام کوڈ کی نمائندگی کنٹرول فلو گراف (<span dir="ltr">CFG</span>) ہے۔ جیسا کہ اس کے نام سے ظاہر ہوتا ہے، یہ ایک گراف پر مبنی نمائندگی ہے جو تمام ایگزیکیوشن پاتھس کو ظاہر کرتی ہے۔ ہر نوڈ میں ایک یا ایک سے زیادہ ہدایات ہوتی ہیں۔ گراف میں کنارے (edges) کنٹرول فلو آپریشنز (<span dir="ltr">if/then/else</span>، لوپ، وغیرہ) کی نمائندگی کرتے ہیں۔ ہماری پچھلی مثال کا <span dir="ltr">CFG</span> یہ ہے:

![CFG](./cfg.png)

<span dir="ltr">CFG</span> وہ نمائندگی ہے جس کی بنیاد پر زیادہ تر تجزیے بنائے جاتے ہیں۔

کوڈ کی بہت سی دوسری نمائندگیاں موجود ہیں۔ آپ جو تجزیہ کرنا چاہتے ہیں اس کے مطابق ہر نمائندگی کے فوائد اور نقصانات ہیں۔

### تجزیہ {#analysis}

سلدر کے ساتھ آپ جو سب سے آسان قسم کے تجزیے کر سکتے ہیں وہ سنٹیکٹک (syntactic) تجزیے ہیں۔

### سنٹیکس تجزیہ {#syntax-analysis}

سلدر پیٹرن میچنگ جیسی اپروچ کا استعمال کرتے ہوئے تضادات اور خامیوں کو تلاش کرنے کے لیے کوڈ کے مختلف اجزاء اور ان کی نمائندگی کے ذریعے نیویگیٹ کر سکتا ہے۔

مثال کے طور پر درج ذیل ڈیٹیکٹرز سنٹیکس سے متعلق مسائل تلاش کرتے ہیں:

- [سٹیٹ ویری ایبل شیڈونگ](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): تمام حالت (state) کے متغیرات پر اعادہ (iterate) کرتا ہے اور چیک کرتا ہے کہ آیا کوئی وراثت میں ملے کنٹریکٹ سے کسی متغیر کو شیڈو کرتا ہے ([<span dir="ltr">state.py#L51-L62</span>](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [غلط <span dir="ltr">ERC-20</span> انٹرفیس](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): غلط <span dir="ltr">ERC-20</span> فنکشن کے دستخط تلاش کریں ([<span dir="ltr">incorrect_erc20_interface.py#L34-L55</span>](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### سیمینٹک تجزیہ {#semantic-analysis}

سنٹیکس تجزیہ کے برعکس، ایک سیمینٹک (semantic) تجزیہ گہرائی میں جائے گا اور کوڈ کے "معنی" کا تجزیہ کرے گا۔ اس فیملی میں تجزیوں کی کچھ وسیع اقسام شامل ہیں۔ وہ زیادہ طاقتور اور مفید نتائج کا باعث بنتے ہیں، لیکن انہیں لکھنا بھی زیادہ پیچیدہ ہے۔

سیمینٹک تجزیے سب سے جدید کمزوریوں (vulnerabilities) کا پتہ لگانے کے لیے استعمال ہوتے ہیں۔

#### ڈیٹا انحصار کا تجزیہ {#fixed-point-computation}

ایک متغیر `variable_a` کو `variable_b` پر ڈیٹا پر منحصر کہا جاتا ہے اگر کوئی ایسا پاتھ ہو جس کے لیے `variable_a` کی قدر `variable_b` سے متاثر ہوتی ہو۔

درج ذیل کوڈ میں، `variable_a` کا انحصار `variable_b` پر ہے:

```solidity
// ...
variable_a = variable_b + 1;
```

سلدر بلٹ ان [ڈیٹا انحصار](https://github.com/crytic/slither/wiki/data-dependency) کی صلاحیتوں کے ساتھ آتا ہے، جس کی وجہ اس کی درمیانی نمائندگی ہے (جس پر بعد کے سیکشن میں بحث کی گئی ہے)۔

ڈیٹا انحصار کے استعمال کی ایک مثال [خطرناک سخت برابری (strict equality) ڈیٹیکٹر](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) میں مل سکتی ہے۔ یہاں سلدر ایک خطرناک قدر ([<span dir="ltr">incorrect_strict_equality.py#L86-L87</span>](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) کے ساتھ سخت برابری کے موازنہ کو تلاش کرے گا، اور صارف کو مطلع کرے گا کہ اسے حملہ آور کو کنٹریکٹ میں پھنسانے سے روکنے کے لیے `==` کے بجائے `>=` یا `<=` کا استعمال کرنا چاہیے۔ دیگر کے علاوہ، ڈیٹیکٹر `balanceOf(address)` پر کال کی واپسی کی قدر کو خطرناک سمجھے گا ([<span dir="ltr">incorrect_strict_equality.py#L63-L64</span>](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))، اور اس کے استعمال کو ٹریک کرنے کے لیے ڈیٹا انحصار انجن کا استعمال کرے گا۔

#### فکسڈ پوائنٹ کمپیوٹیشن {#fixed-point-computation-2}

اگر آپ کا تجزیہ <span dir="ltr">CFG</span> کے ذریعے نیویگیٹ کرتا ہے اور کناروں (edges) کی پیروی کرتا ہے، تو آپ کو پہلے سے دیکھے گئے نوڈز نظر آنے کا امکان ہے۔ مثال کے طور پر، اگر ایک لوپ کو ذیل میں دکھایا گیا ہے:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

آپ کے تجزیے کو یہ جاننے کی ضرورت ہوگی کہ کب رکنا ہے۔ یہاں دو اہم حکمت عملیاں ہیں: (<span dir="ltr">1</span>) ہر نوڈ پر ایک محدود تعداد میں اعادہ (iterate) کریں، (<span dir="ltr">2</span>) ایک نام نہاد _فکس پوائنٹ (fixpoint)_ کا حساب لگائیں۔ فکس پوائنٹ کا بنیادی مطلب یہ ہے کہ اس نوڈ کا تجزیہ کرنے سے کوئی بامعنی معلومات فراہم نہیں ہوتی ہیں۔

استعمال ہونے والے فکس پوائنٹ کی ایک مثال مکرر داخلہ (reentrancy) ڈیٹیکٹرز میں مل سکتی ہے: سلدر نوڈز کو دریافت کرتا ہے، اور بیرونی کالز، سٹوریج میں لکھنے اور پڑھنے کو تلاش کرتا ہے۔ ایک بار جب یہ فکس پوائنٹ ([<span dir="ltr">reentrancy.py#L125-L131</span>](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)) پر پہنچ جاتا ہے، تو یہ دریافت کو روک دیتا ہے، اور مختلف مکرر داخلہ پیٹرنز ([<span dir="ltr">reentrancy_benign.py</span>](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)، [<span dir="ltr">reentrancy_read_before_write.py</span>](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)، [<span dir="ltr">reentrancy_eth.py</span>](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) کے ذریعے یہ دیکھنے کے لیے نتائج کا تجزیہ کرتا ہے کہ آیا مکرر داخلہ موجود ہے۔

موثر فکسڈ پوائنٹ کمپیوٹیشن کا استعمال کرتے ہوئے تجزیے لکھنے کے لیے اس بات کی اچھی سمجھ کی ضرورت ہوتی ہے کہ تجزیہ اپنی معلومات کو کیسے پھیلاتا ہے۔

### درمیانی نمائندگی {#intermediate-representation}

ایک درمیانی نمائندگی (<span dir="ltr">IR</span>) ایک ایسی زبان ہے جس کا مقصد اصل زبان کی نسبت سٹیٹک تجزیہ کے لیے زیادہ موزوں ہونا ہے۔ سلدر <span dir="ltr">Solidity</span> کا اپنی <span dir="ltr">IR</span> میں ترجمہ کرتا ہے: [<span dir="ltr">SlithIR</span>](https://github.com/crytic/slither/wiki/SlithIR)۔

اگر آپ صرف بنیادی چیکس لکھنا چاہتے ہیں تو <span dir="ltr">SlithIR</span> کو سمجھنا ضروری نہیں ہے۔ تاہم، اگر آپ جدید سیمینٹک تجزیے لکھنے کا ارادہ رکھتے ہیں تو یہ کارآمد ثابت ہوگا۔ [<span dir="ltr">SlithIR</span>](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) اور [<span dir="ltr">SSA</span>](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) پرنٹرز آپ کو یہ سمجھنے میں مدد کریں گے کہ کوڈ کا ترجمہ کیسے کیا جاتا ہے۔

## <span dir="ltr">API</span> کی بنیادی باتیں {#api-basics}

سلدر میں ایک <span dir="ltr">API</span> ہے جو آپ کو کنٹریکٹ اور اس کے فنکشنز کی بنیادی خصوصیات کو دریافت کرنے دیتی ہے۔

کوڈ بیس لوڈ کرنے کے لیے:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### کنٹریکٹس اور فنکشنز کی دریافت {#exploring-contracts-and-functions}

ایک `Slither` آبجیکٹ میں یہ ہوتا ہے:

- `contracts (list(Contract)`: کنٹریکٹس کی فہرست
- `contracts_derived (list(Contract)`: ان کنٹریکٹس کی فہرست جو کسی دوسرے کنٹریکٹ کو وراثت میں نہیں ملے ہیں (کنٹریکٹس کا ذیلی سیٹ)
- `get_contract_from_name (str)`: اس کے نام سے ایک کنٹریکٹ واپس کریں

ایک `Contract` آبجیکٹ میں یہ ہوتا ہے:

- `name (str)`: کنٹریکٹ کا نام
- `functions (list(Function))`: فنکشنز کی فہرست
- `modifiers (list(Modifier))`: فنکشنز کی فہرست
- `all_functions_called (list(Function/Modifier))`: کنٹریکٹ کے ذریعے قابل رسائی تمام اندرونی فنکشنز کی فہرست
- `inheritance (list(Contract))`: وراثت میں ملے کنٹریکٹس کی فہرست
- `get_function_from_signature (str)`: اس کے دستخط سے ایک فنکشن واپس کریں
- `get_modifier_from_signature (str)`: اس کے دستخط سے ایک موڈیفائر (Modifier) واپس کریں
- `get_state_variable_from_name (str)`: اس کے نام سے ایک سٹیٹ ویری ایبل (StateVariable) واپس کریں

ایک `Function` یا `Modifier` آبجیکٹ میں یہ ہوتا ہے:

- `name (str)`: فنکشن کا نام
- `contract (contract)`: وہ کنٹریکٹ جہاں فنکشن ڈکلیئر کیا گیا ہے
- `nodes (list(Node))`: فنکشن/موڈیفائر کے <span dir="ltr">CFG</span> پر مشتمل نوڈز کی فہرست
- `entry_point (Node)`: <span dir="ltr">CFG</span> کا انٹری پوائنٹ
- `variables_read (list(Variable))`: پڑھے گئے متغیرات کی فہرست
- `variables_written (list(Variable))`: لکھے گئے متغیرات کی فہرست
- `state_variables_read (list(StateVariable))`: پڑھے گئے حالت (state) کے متغیرات کی فہرست (متغیرات کا ذیلی سیٹ جو پڑھے گئے ہیں)
- `state_variables_written (list(StateVariable))`: لکھے گئے حالت (state) کے متغیرات کی فہرست (متغیرات کا ذیلی سیٹ جو لکھے گئے ہیں)