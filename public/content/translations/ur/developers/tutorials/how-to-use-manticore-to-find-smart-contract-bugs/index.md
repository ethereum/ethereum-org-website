---
title: "اسمارٹ کنٹریکٹس میں بگز تلاش کرنے کے لیے Manticore کا استعمال کیسے کریں"
description: "اسمارٹ کنٹریکٹس میں خود بخود بگز تلاش کرنے کے لیے Manticore کا استعمال کیسے کریں"
author: Trailofbits
lang: ur-in
tags:
  [
    "solidity",
    "اسمارٹ معاہدات",
    "سیکورٹی",
    "testing",
    "رسمی تصدیق"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

اس ٹیوٹوریل کا مقصد یہ دکھانا ہے کہ اسمارٹ کنٹریکٹس میں خود بخود بگز تلاش کرنے کے لیے Manticore کا استعمال کیسے کیا جائے۔

## انسٹالیشن {#installation}

Manticore کے لیے >= python 3.6 درکار ہے۔ اسے pip کے ذریعے یا docker کا استعمال کرکے انسٹال کیا جاسکتا ہے۔

### docker کے ذریعے Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_آخری کمانڈ eth-security-toolbox کو ایک docker میں چلاتا ہے جس کی آپ کی موجودہ ڈائریکٹری تک رسائی ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور docker سے فائلوں پر ٹولز چلا سکتے ہیں_

docker کے اندر، چلائیں:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip کے ذریعے Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 تجویز کیا جاتا ہے۔

### ایک اسکرپٹ چلانا {#running-a-script}

python 3 کے ساتھ ایک python اسکرپٹ چلانے کے لیے:

```bash
python3 script.py
```

## ڈائنامک سمبولک ایگزیکیوشن کا تعارف {#introduction-to-dynamic-symbolic-execution}

### مختصر طور پر ڈائنامک سمبولک ایگزیکیوشن {#dynamic-symbolic-execution-in-a-nutshell}

ڈائنامک سمبولک ایگزیکیوشن (DSE) پروگرام کے تجزیے کی ایک تکنیک ہے جو اعلیٰ درجے کی سیمانٹک بیداری کے ساتھ اسٹیٹ اسپیس کو تلاش کرتی ہے۔ یہ تکنیک "پروگرام پاتھس" کی دریافت پر مبنی ہے، جسے `path predicates` کہلانے والے ریاضیاتی فارمولوں کے طور پر پیش کیا جاتا ہے۔ تصوراتی طور پر، یہ تکنیک دو مراحل میں پاتھ پریڈیکیٹس پر کام کرتی ہے:

1. یہ پروگرام کے ان پٹ پر پابندیوں کا استعمال کرتے ہوئے تعمیر کیے جاتے ہیں۔
2. یہ ایسے پروگرام ان پٹس پیدا کرنے کے لیے استعمال ہوتے ہیں جو متعلقہ پاتھس کو ایگزیکیوٹ کرنے کا سبب بنیں گے۔

یہ نقطہ نظر اس لحاظ سے کوئی غلط مثبت پیدا نہیں کرتا ہے کہ تمام شناخت شدہ پروگرام اسٹیٹس کو ٹھوس ایگزیکیوشن کے دوران ٹرگر کیا جا سکتا ہے۔ مثال کے طور پر، اگر تجزیہ میں کوئی انٹیجر اوور فلو ملتا ہے، تو اس کے دوبارہ پیدا کیے جانے کی ضمانت ہے۔

### پاتھ پریڈیکیٹ کی مثال {#path-predicate-example}

DSE کیسے کام کرتا ہے اس کی بصیرت حاصل کرنے کے لیے، درج ذیل مثال پر غور کریں:

```solidity
function f(uint a){

  if (a == 65) {
      // ایک بگ موجود ہے
  }

}
```

چونکہ `f()` میں دو پاتھس ہیں، اس لیے ایک DSE دو مختلف پاتھ پریڈیکیٹس بنائے گا:

- پاتھ 1: `a == 65`
- پاتھ 2: `Not (a == 65)`

ہر پاتھ پریڈیکیٹ ایک ریاضیاتی فارمولا ہے جسے [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories) نامی ایک نام نہاد کو دیا جا سکتا ہے، جو مساوات کو حل کرنے کی کوشش کرے گا۔ `پاتھ 1` کے لیے، سولور کہے گا کہ پاتھ کو `a = 65` کے ساتھ تلاش کیا جا سکتا ہے۔ `پاتھ 2` کے لیے، سولور `a` کو 65 کے علاوہ کوئی بھی قدر دے سکتا ہے، مثال کے طور پر `a = 0`۔

### خصوصیات کی تصدیق کرنا {#verifying-properties}

Manticore ہر پاتھ کے تمام ایگزیکیوشن پر مکمل کنٹرول کی اجازت دیتا ہے۔ نتیجے کے طور پر، یہ آپ کو تقریباً کسی بھی چیز پر من مانی پابندیاں شامل کرنے کی اجازت دیتا ہے۔ یہ کنٹرول کنٹریکٹ پر خصوصیات بنانے کی اجازت دیتا ہے۔

درج ذیل مثال پر غور کریں:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // کوئی اوور فلو تحفظ نہیں
  return c;
}
```

یہاں فنکشن میں تلاش کرنے کے لیے صرف ایک پاتھ ہے:

- پاتھ 1: `c = a + b`

Manticore کا استعمال کرتے ہوئے، آپ اوور فلو کی جانچ کر سکتے ہیں، اور پاتھ پریڈیکیٹ میں پابندیاں شامل کر سکتے ہیں:

- `c = a + b AND (c < a OR c < b)`

اگر `a` اور `b` کی ایسی ویلیویشن تلاش کرنا ممکن ہے جس کے لیے مذکورہ بالا پاتھ پریڈیکیٹ قابل عمل ہے، تو اس کا مطلب ہے کہ آپ کو ایک اوور فلو مل گیا ہے۔ مثال کے طور پر سولور ان پٹ `a = 10 , b = MAXUINT256` پیدا کر سکتا ہے۔

اگر آپ ایک فکسڈ ورژن پر غور کریں:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

اوور فلو چیک کے ساتھ متعلقہ فارمولا ہوگا:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

اس فارمولے کو حل نہیں کیا جا سکتا؛ دوسرے لفظوں میں یہ ایک **ثبوت** ہے کہ `safe_add` میں، `c` ہمیشہ بڑھے گا۔

DSE اس طرح ایک طاقتور ٹول ہے، جو آپ کے کوڈ پر من مانی پابندیوں کی تصدیق کر سکتا ہے۔

## Manticore کے تحت چلانا {#running-under-manticore}

ہم دیکھیں گے کہ Manticore API کے ساتھ ایک اسمارٹ کنٹریکٹ کو کیسے تلاش کیا جائے۔ ہدف درج ذیل اسمارٹ کنٹریکٹ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) ہے:

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

### ایک اسٹینڈ الون ایکسپلوریشن چلائیں {#run-a-standalone-exploration}

آپ درج ذیل کمانڈ کے ذریعے Manticore کو براہ راست اسمارٹ کنٹریکٹ پر چلا سکتے ہیں (`پروجیکٹ` ایک Solidity فائل، یا ایک پروجیکٹ ڈائریکٹری ہو سکتا ہے):

```bash
$ manticore project
```

آپ کو اس طرح کے ٹیسٹ کیسز کا آؤٹ پٹ ملے گا (ترتیب بدل سکتی ہے):

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

اضافی معلومات کے بغیر، Manticore نئے سمبولک
ٹرانزیکشنز کے ساتھ کنٹریکٹ کو اس وقت تک تلاش کرے گا جب تک کہ وہ کنٹریکٹ پر نئے پاتھس کو تلاش نہ کر لے۔ Manticore ایک ناکام ٹرانزیکشن کے بعد (مثال کے طور پر: ایک revert کے بعد) نئے ٹرانزیکشنز نہیں چلاتا ہے۔

Manticore معلومات کو ایک `mcore_*` ڈائریکٹری میں آؤٹ پٹ کرے گا۔ دیگر چیزوں کے علاوہ، آپ کو اس ڈائریکٹری میں ملے گا:

- `global.summary`: کوریج اور کمپائلر وارننگز
- `test_XXXXX.summary`: کوریج، آخری ہدایت، فی ٹیسٹ کیس اکاؤنٹ بیلنس
- `test_XXXXX.tx`: فی ٹیسٹ کیس ٹرانزیکشنز کی تفصیلی فہرست

یہاں Manticore کو 7 ٹیسٹ کیسز ملے ہیں، جو اس کے مطابق ہیں (فائل نام کی ترتیب بدل سکتی ہے):

|                                                           |    ٹرانزیکشن 0   |         ٹرانزیکشن 1        | ٹرانزیکشن 2                |  نتیجہ |
| :-------------------------------------------------------: | :--------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | کنٹریکٹ کی تخلیق | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | کنٹریکٹ کی تخلیق |        فال بیک فنکشن       |                            | REVERT |
| **test_00000002.tx** | کنٹریکٹ کی تخلیق |                            |                            | RETURN |
| **test_00000003.tx** | کنٹریکٹ کی تخلیق |  f(65)  |                            | REVERT |
| **test_00000004.tx** | کنٹریکٹ کی تخلیق | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | کنٹریکٹ کی تخلیق | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | کنٹریکٹ کی تخلیق | f(!=65) | فال بیک فنکشن              | REVERT |

_ایکسپلوریشن کا خلاصہ f(!=65) ظاہر کرتا ہے کہ f کو 65 سے مختلف کسی بھی قدر کے ساتھ کال کیا گیا ہے۔_

جیسا کہ آپ دیکھ سکتے ہیں، Manticore ہر کامیاب یا واپس کیے گئے ٹرانزیکشن کے لیے ایک منفرد ٹیسٹ کیس تیار کرتا ہے۔

اگر آپ تیز کوڈ ایکسپلوریشن چاہتے ہیں تو `--quick-mode` فلیگ کا استعمال کریں (یہ بگ ڈیٹیکٹرز، گیس کمپیوٹیشن، ... کو غیر فعال کر دیتا ہے)

### API کے ذریعے ایک اسمارٹ کنٹریکٹ میں ہیرا پھیری کرنا {#manipulate-a-smart-contract-through-the-api}

یہ سیکشن Manticore Python API کے ذریعے ایک اسمارٹ کنٹریکٹ میں ہیرا پھیری کرنے کے طریقے کی تفصیلات بیان کرتا ہے۔ آپ python ایکسٹینشن `*.py` کے ساتھ نئی فائل بنا سکتے ہیں اور اس فائل میں API کمانڈز (جن کی بنیادی باتیں ذیل میں بیان کی جائیں گی) کو شامل کرکے ضروری کوڈ لکھ سکتے ہیں اور پھر اسے `$ python3 *.py` کمانڈ کے ساتھ چلا سکتے ہیں۔ آپ ذیل میں دی گئی کمانڈز کو براہ راست python کنسول میں بھی ایگزیکیوٹ کر سکتے ہیں، کنسول چلانے کے لیے `$ python3` کمانڈ کا استعمال کریں۔

### اکاؤنٹس بنانا {#creating-accounts}

سب سے پہلے آپ کو درج ذیل کمانڈز کے ساتھ ایک نئی بلاک چین شروع کرنی چاہیے:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

ایک غیر کنٹریکٹ اکاؤنٹ [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) کا استعمال کرتے ہوئے بنایا جاتا ہے:

```python
user_account = m.create_account(balance=1000)
```

ایک Solidity کنٹریکٹ [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) کا استعمال کرتے ہوئے تعینات کیا جا سکتا ہے:

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
# کنٹریکٹ شروع کریں
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### خلاصہ {#summary}

- آپ [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) اور [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) کے ساتھ صارف اور کنٹریکٹ اکاؤنٹس بنا سکتے ہیں۔

### ٹرانزیکشنز کو ایگزیکیوٹ کرنا {#executing-transactions}

Manticore دو قسم کے ٹرانزیکشن کو سپورٹ کرتا ہے:

- را ٹرانزیکشن: تمام فنکشنز کو تلاش کیا جاتا ہے
- نامزد ٹرانزیکشن: صرف ایک فنکشن کو تلاش کیا جاتا ہے

#### را ٹرانزیکشن {#raw-transaction}

ایک را ٹرانزیکشن [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) کا استعمال کرتے ہوئے ایگزیکیوٹ کیا جاتا ہے:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

ٹرانزیکشن کا کالر، ایڈریس، ڈیٹا، یا ویلیو یا تو ٹھوس یا سمبولک ہو سکتا ہے:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ایک سمبولک ویلیو بناتا ہے۔
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ایک سمبولک بائٹ ایرے بناتا ہے۔

مثال کے طور پر:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

اگر ڈیٹا سمبولک ہے، تو Manticore ٹرانزیکشن ایگزیکیوشن کے دوران کنٹریکٹ کے تمام فنکشنز کو تلاش کرے گا۔ فنکشن کا انتخاب کیسے کام کرتا ہے، یہ سمجھنے کے لیے [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) مضمون میں فال بیک فنکشن کی وضاحت دیکھنا مددگار ہوگا۔

#### نامزد ٹرانزیکشن {#named-transaction}

فنکشنز کو ان کے نام کے ذریعے ایگزیکیوٹ کیا جا سکتا ہے۔
`f(uint var)` کو ایک سمبولک ویلیو کے ساتھ، user_account سے، اور 0 ایتھر کے ساتھ ایگزیکیوٹ کرنے کے لیے، استعمال کریں:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

اگر ٹرانزیکشن کی `value` کی وضاحت نہیں کی گئی ہے، تو یہ بطور ڈیفالٹ 0 ہے۔

#### خلاصہ {#summary-1}

- ایک ٹرانزیکشن کے آرگومنٹس ٹھوس یا سمبولک ہو سکتے ہیں
- ایک را ٹرانزیکشن تمام فنکشنز کو تلاش کرے گا
- فنکشن کو ان کے نام سے کال کیا جا سکتا ہے

### ورک اسپیس {#workspace}

`m.workspace` وہ ڈائریکٹری ہے جو تمام تیار کردہ فائلوں کے لیے آؤٹ پٹ ڈائریکٹری کے طور پر استعمال ہوتی ہے:

```python
print("نتائج {} میں ہیں".format(m.workspace))
```

### ایکسپلوریشن کو ختم کریں {#terminate-the-exploration}

ایکسپلوریشن کو روکنے کے لیے [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) کا استعمال کریں۔ ایک بار یہ طریقہ کال ہو جانے کے بعد مزید کوئی ٹرانزیکشن نہیں بھیجا جانا چاہیے اور Manticore ہر تلاش کیے گئے پاتھ کے لیے ٹیسٹ کیسز تیار کرتا ہے۔

### خلاصہ: Manticore کے تحت چلانا {#summary-running-under-manticore}

پچھلے تمام مراحل کو ایک ساتھ رکھنے پر، ہم حاصل کرتے ہیں:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("نتائج {} میں ہیں".format(m.workspace))
m.finalize() # ایکسپلوریشن کو روکیں
```

اوپر دیا گیا تمام کوڈ آپ [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) میں تلاش کر سکتے ہیں

## تھروئنگ پاتھس حاصل کرنا {#getting-throwing-paths}

اب ہم `f()` میں استثناء پیدا کرنے والے پاتھس کے لیے مخصوص ان پٹس تیار کریں گے۔ ہدف اب بھی درج ذیل اسمارٹ کنٹریکٹ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) ہے:

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

### اسٹیٹ کی معلومات کا استعمال {#using-state-information}

ہر ایگزیکیوٹ ہونے والے پاتھ کی بلاک چین کی اپنی اسٹیٹ ہوتی ہے۔ ایک اسٹیٹ یا تو تیار ہوتی ہے یا اسے ختم کر دیا جاتا ہے، جس کا مطلب ہے کہ یہ ایک THROW یا REVERT ہدایت تک پہنچ جاتی ہے:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): تیار اسٹیٹس کی فہرست (انہوں نے REVERT/INVALID ایگزیکیوٹ نہیں کیا)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): ختم شدہ اسٹیٹس کی فہرست
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): تمام اسٹیٹس

```python
for state in m.all_states:
    # اسٹیٹ کے ساتھ کچھ کریں
```

آپ اسٹیٹ کی معلومات تک رسائی حاصل کر سکتے ہیں۔ مثال کے طور پر:

- `state.platform.get_balance(account.address)`: اکاؤنٹ کا بیلنس
- `state.platform.transactions`: ٹرانزیکشنز کی فہرست
- `state.platform.transactions[-1].return_data`: آخری ٹرانزیکشن کے ذریعے واپس کیا گیا ڈیٹا

آخری ٹرانزیکشن کے ذریعے واپس کیا گیا ڈیٹا ایک ایرے ہے، جسے ABI.deserialize کے ساتھ ایک ویلیو میں تبدیل کیا جا سکتا ہے، مثال کے طور پر:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### ٹیسٹ کیس کیسے تیار کریں {#how-to-generate-testcase}

ٹیسٹ کیس تیار کرنے کے لیے [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) کا استعمال کریں:

```python
m.generate_testcase(state, 'BugFound')
```

### خلاصہ {#summary-2}

- آپ m.all_states کے ساتھ اسٹیٹ پر اعادہ کر سکتے ہیں
- `state.platform.get_balance(account.address)` اکاؤنٹ کا بیلنس واپس کرتا ہے
- `state.platform.transactions` ٹرانزیکشنز کی فہرست واپس کرتا ہے
- `transaction.return_data` واپس کیا گیا ڈیٹا ہے
- `m.generate_testcase(state, name)` اسٹیٹ کے لیے ان پٹس تیار کرتا ہے

### خلاصہ: تھروئنگ پاتھ حاصل کرنا {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## چیک کریں کہ کیا کوئی ایگزیکیوشن REVERT یا INVALID کے ساتھ ختم ہوتا ہے

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('تھرو ملا {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

اوپر دیا گیا تمام کوڈ آپ [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) میں تلاش کر سکتے ہیں

_نوٹ کریں کہ ہم ایک بہت آسان اسکرپٹ تیار کر سکتے تھے، کیونکہ terminated_state کے ذریعے واپس کی گئی تمام اسٹیٹس کے نتیجے میں REVERT یا INVALID ہوتا ہے: اس مثال کا مقصد صرف یہ دکھانا تھا کہ API میں ہیرا پھیری کیسے کی جائے۔_

## پابندیاں شامل کرنا {#adding-constraints}

ہم دیکھیں گے کہ ایکسپلوریشن کو کیسے محدود کیا جائے۔ ہم یہ فرض کریں گے کہ `f()` کی
دستاویزات میں کہا گیا ہے کہ فنکشن کو کبھی بھی `a == 65` کے ساتھ کال نہیں کیا جاتا، لہذا `a == 65` والا کوئی بھی بگ حقیقی بگ نہیں ہے۔ ہدف اب بھی درج ذیل اسمارٹ کنٹریکٹ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) ہے:

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

### آپریٹرز {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) ماڈیول پابندیوں کی ہیرا پھیری میں سہولت فراہم کرتا ہے، دیگر چیزوں کے علاوہ یہ فراہم کرتا ہے:

- Operators.AND,
- Operators.OR,
- Operators.UGT (غیر دستخط شدہ سے بڑا),
- Operators.UGE (غیر دستخط شدہ سے بڑا یا برابر)،
- Operators.ULT (غیر دستخط شدہ سے کم)،
- Operators.ULE (غیر دستخط شدہ سے کم یا برابر)۔

ماڈیول کو امپورٹ کرنے کے لیے درج ذیل کا استعمال کریں:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` ایک ایرے کو ایک ویلیو سے جوڑنے کے لیے استعمال کیا جاتا ہے۔ مثال کے طور پر، ایک ٹرانزیکشن کے return_data کو ایک ویلیو میں تبدیل کرنے کی ضرورت ہے تاکہ اسے دوسری ویلیو کے خلاف چیک کیا جا سکے:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### پابندیاں {#state-constraint}

آپ پابندیوں کا استعمال عالمی سطح پر یا کسی مخصوص اسٹیٹ کے لیے کر سکتے ہیں۔

#### عالمی پابندی {#state-constraint}

عالمی پابندی شامل کرنے کے لیے `m.constrain(constraint)` کا استعمال کریں۔
مثال کے طور پر، آپ ایک سمبولک ایڈریس سے ایک کنٹریکٹ کو کال کر سکتے ہیں، اور اس ایڈریس کو مخصوص ویلیوز تک محدود کر سکتے ہیں:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### اسٹیٹ کی پابندی {#state-constraint}

کسی مخصوص اسٹیٹ میں پابندی شامل کرنے کے لیے [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) کا استعمال کریں۔
اس کا استعمال اسٹیٹ کو اس کی ایکسپلوریشن کے بعد محدود کرنے کے لیے کیا جا سکتا ہے تاکہ اس پر کچھ خصوصیت کی جانچ کی جا سکے۔

### پابندی کی جانچ کرنا {#checking-constraint}

یہ جاننے کے لیے کہ کیا کوئی پابندی اب بھی قابل عمل ہے، `solver.check(state.constraints)` کا استعمال کریں۔
مثال کے طور پر، درج ذیل `symbolic_value` کو 65 سے مختلف ہونے پر مجبور کرے گا اور یہ جانچے گا کہ کیا اسٹیٹ اب بھی قابل عمل ہے:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # اسٹیٹ قابل عمل ہے
```

### خلاصہ: پابندیاں شامل کرنا {#summary-adding-constraints}

پچھلے کوڈ میں پابندی شامل کرنے پر، ہم حاصل کرتے ہیں:

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

## چیک کریں کہ کیا کوئی ایگزیکیوشن REVERT یا INVALID کے ساتھ ختم ہوتا ہے

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # ہم اس پاتھ پر غور نہیں کرتے جہاں a == 65 ہے
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'بگ ملا، نتائج {m.workspace} میں ہیں')
            no_bug_found = False

if no_bug_found:
    print(f'کوئی بگ نہیں ملا')
```

اوپر دیا گیا تمام کوڈ آپ [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) میں تلاش کر سکتے ہیں
