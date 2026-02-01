---
title: "اسمارٹ کنٹریکٹ بگز کو تلاش کرنے کے لیے Slither کا استعمال کیسے کریں"
description: "اسمارٹ کنٹریکٹس میں بگز کو خود بخود تلاش کرنے کے لیے Slither کا استعمال کیسے کریں"
author: Trailofbits
lang: ur-in
tags: [ "solidity", "اسمارٹ معاہدات", "سیکورٹی", "testing" ]
skill: advanced
published: 2020-06-09
source: "محفوظ کنٹریکٹس بنانا"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither کا استعمال کیسے کریں {#how-to-use-slither}

اس ٹیوٹوریل کا مقصد یہ دکھانا ہے کہ اسمارٹ کنٹریکٹس میں بگز کو خود بخود تلاش کرنے کے لیے Slither کا استعمال کیسے کیا جائے۔

- [انسٹالیشن](#installation)
- [کمانڈ لائن کا استعمال](#command-line)
- [اسٹیٹک تجزیہ کا تعارف](#static-analysis): اسٹیٹک تجزیہ کا مختصر تعارف
- [API](#api-basics): پائتھن API کی تفصیل

## انسٹالیشن {#installation}

Slither کے لیے Python >= 3.6 درکار ہے۔ اسے pip کے ذریعے یا docker کا استعمال کرکے انسٹال کیا جاسکتا ہے۔

pip کے ذریعے Slither:

```bash
pip3 install --user slither-analyzer
```

docker کے ذریعے Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_آخری کمانڈ eth-security-toolbox کو ایک docker میں چلاتا ہے جس کی آپ کی موجودہ ڈائریکٹری تک رسائی ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور docker سے فائلوں پر ٹولز چلا سکتے ہیں_

docker کے اندر، چلائیں:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### ایک اسکرپٹ چلانا {#running-a-script}

python 3 کے ساتھ ایک python اسکرپٹ چلانے کے لیے:

```bash
python3 script.py
```

### کمانڈ لائن {#command-line}

**کمانڈ لائن بمقابلہ صارف کے ذریعے متعین کردہ اسکرپٹس۔** Slither پہلے سے متعین ڈیٹیکٹرز کے ایک سیٹ کے ساتھ آتا ہے جو بہت سے عام بگز کو تلاش کرتے ہیں۔ کمانڈ لائن سے Slither کو کال کرنے پر تمام ڈیٹیکٹرز چل جائیں گے، اسٹیٹک تجزیہ کے تفصیلی علم کی ضرورت نہیں:

```bash
slither project_paths
```

ڈیٹیکٹرز کے علاوہ، Slither میں اس کے [پرنٹرز](https://github.com/crytic/slither#printers) اور [ٹولز](https://github.com/crytic/slither#tools) کے ذریعے کوڈ ریویو کی صلاحیتیں ہیں۔

پرائیویٹ ڈیٹیکٹرز اور GitHub انٹیگریشن تک رسائی حاصل کرنے کے لیے [crytic.io](https://github.com/crytic) کا استعمال کریں۔

## اسٹیٹک تجزیہ {#static-analysis}

Slither اسٹیٹک تجزیہ فریم ورک کی صلاحیتوں اور ڈیزائن کو بلاگ پوسٹس ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) اور ایک [تعلیمی مقالے](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) میں بیان کیا گیا ہے۔

اسٹیٹک تجزیہ مختلف اقسام میں موجود ہے۔ آپ کو شاید اس بات کا احساس ہوگا کہ [clang](https://clang-analyzer.llvm.org/) اور [gcc](https://lwn.net/Articles/806099/) جیسے کمپائلرز ان تحقیقی تکنیکوں پر انحصار کرتے ہیں، لیکن یہ ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) اور [Frama-C](https://frama-c.com/) اور [Polyspace](https://www.mathworks.com/products/polyspace.html) جیسے رسمی طریقوں پر مبنی ٹولز) کی بھی بنیاد ہے۔

ہم یہاں اسٹیٹک تجزیہ کی تکنیکوں اور محققین کا جامع طور پر جائزہ نہیں لیں گے۔ اس کے بجائے، ہم اس بات پر توجہ مرکوز کریں گے کہ Slither کے کام کرنے کے طریقے کو سمجھنے کے لیے کیا ضروری ہے تاکہ آپ بگز کو تلاش کرنے اور کوڈ کو سمجھنے کے لیے اس کا زیادہ مؤثر طریقے سے استعمال کر سکیں۔

- [کوڈ کی نمائندگی](#code-representation)
- [کوڈ کا تجزیہ](#analysis)
- [درمیانی نمائندگی](#intermediate-representation)

### کوڈ کی نمائندگی {#code-representation}

ڈائنامک تجزیہ کے برعکس، جو ایک ہی ایگزیکیوشن پاتھ کے بارے میں استدلال کرتا ہے، اسٹیٹک تجزیہ ایک ہی وقت میں تمام پاتھس کے بارے میں استدلال کرتا ہے۔ ایسا کرنے کے لیے، یہ ایک مختلف کوڈ کی نمائندگی پر انحصار کرتا ہے۔ دو سب سے عام ہیں ایبسٹریکٹ سنٹیکس ٹری (AST) اور کنٹرول فلو گراف (CFG)۔

### ایبسٹریکٹ سنٹیکس ٹریز (AST) {#abstract-syntax-trees-ast}

AST کا استعمال ہر بار کیا جاتا ہے جب کمپائلر کوڈ کو پارس کرتا ہے۔ یہ شاید سب سے بنیادی ڈھانچہ ہے جس پر اسٹیٹک تجزیہ کیا جا سکتا ہے۔

مختصراً، ایک AST ایک سٹرکچرڈ ٹری ہے جہاں، عام طور پر، ہر لیف میں ایک ویری ایبل یا ایک کانسٹنٹ ہوتا ہے اور انٹرنل نوڈز آپرینڈز یا کنٹرول فلو آپریشنز ہوتے ہیں۔ درج ذیل کوڈ پر غور کریں:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

متعلقہ AST کو اس میں دکھایا گیا ہے:

![AST](./ast.png)

Slither, solc کے ذریعے ایکسپورٹ کردہ AST کا استعمال کرتا ہے۔

بنانے میں آسان ہونے کے باوجود، AST ایک نیسٹڈ سٹرکچر ہے۔ بعض اوقات، اس کا تجزیہ کرنا سب سے سیدھا نہیں ہوتا ہے۔ مثال کے طور پر، ایکسپریشن `a + b <= a` کے ذریعے استعمال ہونے والے آپریشنز کی شناخت کے لیے، آپ کو پہلے `<=` اور پھر `+` کا تجزیہ کرنا ہوگا۔ ایک عام طریقہ نام نہاد وزیٹر پیٹرن کا استعمال کرنا ہے، جو ٹری کے ذریعے ریکرسیولی نیویگیٹ کرتا ہے۔ Slither میں [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) میں ایک عام وزیٹر موجود ہے۔

درج ذیل کوڈ `ExpressionVisitor` کا استعمال کرتا ہے یہ پتہ لگانے کے لیے کہ آیا ایکسپریشن میں کوئی ایڈیشن ہے:

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

دوسری سب سے عام کوڈ کی نمائندگی کنٹرول فلو گراف (CFG) ہے۔ جیسا کہ اس کے نام سے ظاہر ہے، یہ ایک گراف پر مبنی نمائندگی ہے جو تمام ایگزیکیوشن پاتھس کو ظاہر کرتی ہے۔ ہر نوڈ میں ایک یا ایک سے زیادہ ہدایات ہوتی ہیں۔ گراف میں ایجز کنٹرول فلو آپریشنز (if/then/else, loop, وغیرہ) کی نمائندگی کرتے ہیں۔ ہماری پچھلی مثال کا CFG یہ ہے:

![CFG](./cfg.png)

CFG وہ نمائندگی ہے جس کے اوپر زیادہ تر تجزیے بنائے جاتے ہیں۔

بہت سی دوسری کوڈ کی نمائندگیاں موجود ہیں۔ ہر نمائندگی کے اپنے فائدے اور نقصانات ہیں اس تجزیہ کے مطابق جو آپ کرنا چاہتے ہیں۔

### تجزیہ {#analysis}

سب سے آسان قسم کے تجزیے جو آپ Slither کے ساتھ کر سکتے ہیں وہ سنٹیکٹک تجزیے ہیں۔

### سنٹیکس کا تجزیہ {#syntax-analysis}

Slither پیٹرن میچنگ جیسے طریقے کا استعمال کرتے ہوئے تضادات اور خامیوں کو تلاش کرنے کے لیے کوڈ کے مختلف اجزاء اور ان کی نمائندگی کے ذریعے نیویگیٹ کر سکتا ہے۔

مثال کے طور پر درج ذیل ڈیٹیکٹرز سنٹیکس سے متعلقہ مسائل کو تلاش کرتے ہیں:

- [اسٹیٹ ویری ایبل شیڈونگ](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): تمام اسٹیٹ ویری ایبلز پر ایٹریٹ کرتا ہے اور چیک کرتا ہے کہ آیا کوئی موروثی کنٹریکٹ سے کسی ویری ایبل کو شیڈو کرتا ہے ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [غلط ERC20 انٹرفیس](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): غلط ERC20 فنکشن سگنیچرز کو تلاش کرتا ہے ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### سیمنٹک تجزیہ {#semantic-analysis}

سنٹیکس تجزیہ کے برعکس، ایک سیمنٹک تجزیہ زیادہ گہرائی میں جائے گا اور کوڈ کے "معنی" کا تجزیہ کرے گا۔ اس فیملی میں کچھ وسیع اقسام کے تجزیے شامل ہیں۔ یہ زیادہ طاقتور اور مفید نتائج کی طرف لے جاتے ہیں، لیکن لکھنے میں بھی زیادہ پیچیدہ ہیں۔

سیمنٹک تجزیے سب سے جدید کمزوریوں کا پتہ لگانے کے لیے استعمال کیے جاتے ہیں۔

#### ڈیٹا کا انحصاری تجزیہ {#fixed-point-computation}

ایک ویری ایبل `variable_a` کو `variable_b` پر ڈیٹا-ڈیپینڈینٹ کہا جاتا ہے اگر کوئی ایسا پاتھ ہے جس کے لیے `variable_a` کی قدر `variable_b` سے متاثر ہوتی ہے۔

درج ذیل کوڈ میں، `variable_a`، `variable_b` پر منحصر ہے:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither بلٹ ان [ڈیٹا ڈیپینڈینسی](https://github.com/crytic/slither/wiki/data-dependency) کی صلاحیتوں کے ساتھ آتا ہے، اس کی درمیانی نمائندگی کی بدولت (جس پر بعد کے سیکشن میں بحث کی گئی ہے)۔

ڈیٹا ڈیپینڈینسی کے استعمال کی ایک مثال [خطرناک سخت مساوات ڈیٹیکٹر](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) میں مل سکتی ہے۔ یہاں Slither ایک خطرناک قدر کے ساتھ سخت مساوات کے موازنہ کو تلاش کرے گا ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))، اور صارف کو مطلع کرے گا کہ اسے کسی حملہ آور کو کنٹریکٹ میں پھنسانے سے روکنے کے لیے `==` کے بجائے `>=` یا `<=` کا استعمال کرنا چاہیے۔ دیگر چیزوں کے علاوہ، ڈیٹیکٹر `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) پر کال کی واپسی کی قدر کو خطرناک سمجھے گا، اور اس کے استعمال کو ٹریک کرنے کے لیے ڈیٹا ڈیپینڈینسی انجن کا استعمال کرے گا۔

#### فکسڈ پوائنٹ کمپیوٹیشن {#fixed-point-computation}

اگر آپ کا تجزیہ CFG کے ذریعے نیویگیٹ کرتا ہے اور ایجز کی پیروی کرتا ہے، تو آپ کو پہلے سے دیکھے گئے نوڈس نظر آنے کا امکان ہے۔ مثال کے طور پر، اگر ایک لوپ کو نیچے دکھایا گیا ہے:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

آپ کے تجزیہ کو یہ جاننے کی ضرورت ہوگی کہ کب رکنا ہے۔ یہاں دو اہم حکمت عملیاں ہیں: (1) ہر نوڈ پر ایک محدود تعداد میں ایٹریٹ کریں، (2) ایک نام نہاد _فکس پوائنٹ_ کا حساب لگائیں۔ ایک فکس پوائنٹ کا بنیادی طور پر مطلب ہے کہ اس نوڈ کا تجزیہ کوئی بامعنی معلومات فراہم نہیں کرتا ہے۔

فکس پوائنٹ کے استعمال کی ایک مثال ری اینٹرینسی ڈیٹیکٹرز میں مل سکتی ہے: Slither نوڈس کو ایکسپلور کرتا ہے، اور ایکسٹرنل کالز، اسٹوریج میں لکھنے اور پڑھنے کی تلاش کرتا ہے۔ ایک بار جب یہ فکس پوائنٹ ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)) تک پہنچ جاتا ہے، تو یہ ایکسپلوریشن کو روک دیتا ہے، اور نتائج کا تجزیہ کرتا ہے یہ دیکھنے کے لیے کہ آیا ری اینٹرینسی موجود ہے، مختلف ری اینٹرینسی پیٹرنز ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) کے ذریعے۔

موثر فکسڈ پوائنٹ کمپیوٹیشن کا استعمال کرتے ہوئے تجزیے لکھنے کے لیے اس بات کی اچھی سمجھ کی ضرورت ہوتی ہے کہ تجزیہ اپنی معلومات کو کیسے پھیلاتا ہے۔

### درمیانی نمائندگی {#intermediate-representation}

ایک درمیانی نمائندگی (IR) ایک ایسی زبان ہے جو اصل زبان کے مقابلے میں اسٹیٹک تجزیہ کے لیے زیادہ موزوں ہو۔ Slither, Solidity کو اپنے IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR) میں ترجمہ کرتا ہے۔

اگر آپ صرف بنیادی چیکس لکھنا چاہتے ہیں تو SlithIR کو سمجھنا ضروری نہیں ہے۔ تاہم، اگر آپ جدید سیمنٹک تجزیے لکھنے کا ارادہ رکھتے ہیں تو یہ کام آئے گا۔ [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) اور [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) پرنٹرز آپ کو یہ سمجھنے میں مدد کریں گے کہ کوڈ کا ترجمہ کیسے ہوتا ہے۔

## API کی بنیادی باتیں {#api-basics}

Slither میں ایک API ہے جو آپ کو کنٹریکٹ اور اس کے فنکشنز کی بنیادی خصوصیات کو ایکسپلور کرنے دیتا ہے۔

کوڈبیس کو لوڈ کرنے کے لیے:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### کنٹریکٹس اور فنکشنز کو ایکسپلور کرنا {#exploring-contracts-and-functions}

ایک `Slither` آبجیکٹ میں ہوتا ہے:

- `contracts (list(Contract)`: کنٹریکٹس کی فہرست
- `contracts_derived (list(Contract)`: ان کنٹریکٹس کی فہرست جو کسی دوسرے کنٹریکٹ سے موروثی نہیں ہیں (کنٹریکٹس کا سب سیٹ)
- `get_contract_from_name (str)`: اس کے نام سے ایک کنٹریکٹ واپس کریں

ایک `Contract` آبجیکٹ میں ہوتا ہے:

- `name (str)`: کنٹریکٹ کا نام
- `functions (list(Function))`: فنکشنز کی فہرست
- `modifiers (list(Modifier))`: فنکشنز کی فہرست
- `all_functions_called (list(Function/Modifier))`: کنٹریکٹ کے ذریعے پہنچنے کے قابل تمام اندرونی فنکشنز کی فہرست
- `inheritance (list(Contract))`: موروثی کنٹریکٹس کی فہرست
- `get_function_from_signature (str)`: اس کے سگنیچر سے ایک فنکشن واپس کریں
- `get_modifier_from_signature (str)`: اس کے سگنیچر سے ایک موڈیفائر واپس کریں
- `get_state_variable_from_name (str)`: اس کے نام سے ایک اسٹیٹ ویری ایبل واپس کریں

ایک `Function` یا `Modifier` آبجیکٹ میں ہوتا ہے:

- `name (str)`: فنکشن کا نام
- `contract (contract)`: وہ کنٹریکٹ جہاں فنکشن کا اعلان کیا گیا ہے
- `nodes (list(Node))`: فنکشن/موڈیفائر کے CFG کو بنانے والے نوڈس کی فہرست
- `entry_point (Node)`: CFG کا انٹری پوائنٹ
- `variables_read (list(Variable))`: پڑھے گئے ویری ایبلز کی فہرست
- `variables_written (list(Variable))`: لکھے گئے ویری ایبلز کی فہرست
- `state_variables_read (list(StateVariable))`: پڑھے گئے اسٹیٹ ویری ایبلز کی فہرست (ویری ایبلز`ریڈ کا سب سیٹ)
- `state_variables_written (list(StateVariable))`: لکھے گئے اسٹیٹ ویری ایبلز کی فہرست (ویری ایبلز`رٹن کا سب سیٹ)
