---
title: "اسمارٹ کانٹریکٹس میں بگز تلاش کرنے کے لیے Manticore کا استعمال کیسے کریں"
description: "اسمارٹ کانٹریکٹس میں خودکار طور پر بگز تلاش کرنے کے لیے Manticore کا استعمال کیسے کریں"
author: Trailofbits
lang: ur
tags:
  ["Solidity", "اسمارٹ کانٹریکٹس", "سیکیورٹی", "ٹیسٹنگ", "رسمی تصدیق"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

اس ٹیوٹوریل کا مقصد یہ دکھانا ہے کہ اسمارٹ کانٹریکٹس میں خودکار طور پر بگز تلاش کرنے کے لیے Manticore کا استعمال کیسے کیا جائے۔

## انسٹالیشن {#installation}

Manticore کے لیے <span dir="ltr">= python 3.6</span> درکار ہے۔ اسے pip کے ذریعے یا docker کا استعمال کرتے ہوئے انسٹال کیا جا سکتا ہے۔

### docker کے ذریعے Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_آخری کمانڈ eth-security-toolbox کو ایک docker میں چلاتی ہے جسے آپ کی موجودہ ڈائرکٹری تک رسائی حاصل ہوتی ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور docker سے فائلوں پر ٹولز چلا سکتے ہیں_

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

### اسکرپٹ چلانا {#running-a-script}

python 3 کے ساتھ python اسکرپٹ چلانے کے لیے:

```bash
python3 script.py
```

## ڈائنامک سمبولک ایگزیکیوشن کا تعارف {#introduction-to-dynamic-symbolic-execution}

### ڈائنامک سمبولک ایگزیکیوشن مختصر الفاظ میں {#dynamic-symbolic-execution-in-a-nutshell}

ڈائنامک سمبولک ایگزیکیوشن (DSE) ایک پروگرام تجزیہ کی تکنیک ہے جو اعلی درجے کی معنوی آگاہی کے ساتھ اسٹیٹ اسپیس (state space) کو دریافت کرتی ہے۔ یہ تکنیک "پروگرام پاتھس" کی دریافت پر مبنی ہے، جنہیں ریاضیاتی فارمولوں کے طور پر پیش کیا جاتا ہے جنہیں `path predicates` کہا جاتا ہے۔ تصوراتی طور پر، یہ تکنیک دو مراحل میں path predicates پر کام کرتی ہے:

1. انہیں پروگرام کے ان پٹ پر پابندیوں (constraints) کا استعمال کرتے ہوئے بنایا جاتا ہے۔
2. انہیں پروگرام کے ان پٹس بنانے کے لیے استعمال کیا جاتا ہے جو متعلقہ پاتھس کو ایگزیکیوٹ کرنے کا سبب بنیں گے۔

یہ طریقہ کار اس لحاظ سے کوئی غلط مثبت (false positives) پیدا نہیں کرتا کہ شناخت شدہ تمام پروگرام اسٹیٹس کو ٹھوس ایگزیکیوشن کے دوران متحرک کیا جا سکتا ہے۔ مثال کے طور پر، اگر تجزیہ میں کوئی انٹیجر اوور فلو (integer overflow) ملتا ہے، تو اس کے دوبارہ پیدا ہونے کی ضمانت ہوتی ہے۔

### Path Predicate کی مثال {#path-predicate-example}

DSE کیسے کام کرتا ہے اس کی بصیرت حاصل کرنے کے لیے، درج ذیل مثال پر غور کریں:

```solidity
function f(uint a){

  if (a == 65) {
      // A bug is present
  }

}
```

چونکہ `f()` میں دو پاتھس شامل ہیں، ایک DSE دو مختلف path predicates بنائے گا:

- پاتھ 1: `a == 65`
- پاتھ 2: `Not (a == 65)`

ہر path predicate ایک ریاضیاتی فارمولہ ہے جو ایک نام نہاد [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories) کو دیا جا سکتا ہے، جو مساوات کو حل کرنے کی کوشش کرے گا۔ `Path 1` کے لیے، سولور کہے گا کہ پاتھ کو `a = 65` کے ساتھ دریافت کیا جا سکتا ہے۔ `Path 2` کے لیے، سولور `a` کو 65 کے علاوہ کوئی بھی ویلیو دے سکتا ہے، مثال کے طور پر `a = 0`۔

### خصوصیات کی تصدیق {#verifying-properties}

Manticore ہر پاتھ کی تمام ایگزیکیوشن پر مکمل کنٹرول کی اجازت دیتا ہے۔ نتیجے کے طور پر، یہ آپ کو تقریباً کسی بھی چیز میں من مانی پابندیاں (constraints) شامل کرنے کی اجازت دیتا ہے۔ یہ کنٹرول کانٹریکٹ پر خصوصیات بنانے کی اجازت دیتا ہے۔

درج ذیل مثال پر غور کریں:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

یہاں فنکشن میں دریافت کرنے کے لیے صرف ایک پاتھ ہے:

- پاتھ 1: `c = a + b`

Manticore کا استعمال کرتے ہوئے، آپ اوور فلو کی جانچ کر سکتے ہیں، اور path predicate میں پابندیاں شامل کر سکتے ہیں:

- `c = a + b AND (c < a OR c < b)`

اگر `a` اور `b` کی ایسی ویلیو تلاش کرنا ممکن ہے جس کے لیے مندرجہ بالا path predicate قابل عمل ہو، تو اس کا مطلب ہے کہ آپ کو ایک اوور فلو مل گیا ہے۔ مثال کے طور پر سولور ان پٹ `a = 10 , b = MAXUINT256` بنا سکتا ہے۔

اگر آپ ایک درست شدہ ورژن پر غور کریں:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

اوور فلو چیک کے ساتھ متعلقہ فارمولہ یہ ہوگا:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

یہ فارمولہ حل نہیں کیا جا سکتا؛ دوسرے الفاظ میں یہ ایک **ثبوت** ہے کہ `safe_add` میں، `c` ہمیشہ بڑھے گا۔

اس طرح DSE ایک طاقتور ٹول ہے، جو آپ کے کوڈ پر من مانی پابندیوں کی تصدیق کر سکتا ہے۔

## Manticore کے تحت چلانا {#running-under-manticore}

ہم دیکھیں گے کہ Manticore API کے ساتھ اسمارٹ کانٹریکٹ کو کیسے دریافت کیا جائے۔ ہدف درج ذیل اسمارٹ کانٹریکٹ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) ہے:

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

### اسٹینڈ اکیلے (standalone) ایکسپلوریشن چلائیں {#run-a-standalone-exploration}

آپ درج ذیل کمانڈ کے ذریعے Manticore کو براہ راست اسمارٹ کانٹریکٹ پر چلا سکتے ہیں (`project` ایک Solidity فائل، یا پروجیکٹ ڈائرکٹری ہو سکتی ہے):

```bash
$ manticore project
```

آپ کو اس طرح کے ٹیسٹ کیسز کا آؤٹ پٹ ملے گا (ترتیب تبدیل ہو سکتی ہے):

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

اضافی معلومات کے بغیر، Manticore کانٹریکٹ کو نئی سمبولک ٹرانزیکشنز کے ساتھ اس وقت تک دریافت کرے گا جب تک کہ وہ کانٹریکٹ پر نئے پاتھس دریافت نہ کر لے۔ Manticore ناکام ہونے والی ٹرانزیکشن کے بعد نئی ٹرانزیکشنز نہیں چلاتا (مثلاً: revert کے بعد)۔

Manticore معلومات کو `mcore_*` ڈائرکٹری میں آؤٹ پٹ کرے گا۔ دیگر چیزوں کے علاوہ، آپ کو اس ڈائرکٹری میں یہ ملے گا:

- `global.summary`: کوریج اور کمپائلر وارننگز
- `test_XXXXX.summary`: کوریج، آخری ہدایت، فی ٹیسٹ کیس اکاؤنٹ بیلنس
- `test_XXXXX.tx`: فی ٹیسٹ کیس ٹرانزیکشنز کی تفصیلی فہرست

یہاں Manticore کو 7 ٹیسٹ کیسز ملتے ہیں، جو اس سے مطابقت رکھتے ہیں (فائل کے نام کی ترتیب تبدیل ہو سکتی ہے):

|                      |   ٹرانزیکشن 0   |   ٹرانزیکشن 1   | ٹرانزیکشن 2     | نتیجہ |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | کانٹریکٹ کی تخلیق |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | کانٹریکٹ کی تخلیق | fallback فنکشن |                   | REVERT |
| **test_00000002.tx** | کانٹریکٹ کی تخلیق |                   |                   | RETURN |
| **test_00000003.tx** | کانٹریکٹ کی تخلیق |       f(65)       |                   | REVERT |
| **test_00000004.tx** | کانٹریکٹ کی تخلیق |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | کانٹریکٹ کی تخلیق |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | کانٹریکٹ کی تخلیق |      f(!=65)      | fallback فنکشن | REVERT |

_ایکسپلوریشن سمری f(!=65) ظاہر کرتی ہے کہ f کو 65 کے علاوہ کسی بھی ویلیو کے ساتھ کال کیا گیا ہے۔_

جیسا کہ آپ دیکھ سکتے ہیں، Manticore ہر کامیاب یا واپس کی گئی (reverted) ٹرانزیکشن کے لیے ایک منفرد ٹیسٹ کیس بناتا ہے۔

اگر آپ تیز کوڈ ایکسپلوریشن چاہتے ہیں تو `--quick-mode` فلیگ استعمال کریں (یہ بگ ڈیٹیکٹرز، گیس کیلکولیشن وغیرہ کو غیر فعال کر دیتا ہے)

### API کے ذریعے اسمارٹ کانٹریکٹ کو مینیپولیٹ کریں {#manipulate-a-smart-contract-through-the-api}

یہ سیکشن تفصیلات بیان کرتا ہے کہ Manticore Python API کے ذریعے اسمارٹ کانٹریکٹ کو کیسے مینیپولیٹ کیا جائے۔ آپ python ایکسٹینشن `*.py` کے ساتھ نئی فائل بنا سکتے ہیں اور اس فائل میں API کمانڈز (جن کی بنیادی باتیں ذیل میں بیان کی جائیں گی) شامل کر کے ضروری کوڈ لکھ سکتے ہیں اور پھر اسے `$ python3 *.py` کمانڈ کے ساتھ چلا سکتے ہیں۔ اس کے علاوہ آپ ذیل کی کمانڈز کو براہ راست python کنسول میں بھی چلا سکتے ہیں، کنسول چلانے کے لیے `$ python3` کمانڈ استعمال کریں۔

### اکاؤنٹس بنانا {#creating-accounts}

سب سے پہلا کام جو آپ کو کرنا چاہیے وہ درج ذیل کمانڈز کے ساتھ ایک نئی بلاک چین شروع کرنا ہے:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

ایک نان-کانٹریکٹ اکاؤنٹ [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) کا استعمال کرتے ہوئے بنایا جاتا ہے:

```python
user_account = m.create_account(balance=1000)
```

ایک Solidity کانٹریکٹ کو [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) کا استعمال کرتے ہوئے ڈیپلائے کیا جا سکتا ہے:

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

#### خلاصہ {#summary}

- آپ [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) اور [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) کے ساتھ صارف اور کانٹریکٹ اکاؤنٹس بنا سکتے ہیں۔

### ٹرانزیکشنز کو ایگزیکیوٹ کرنا {#executing-transactions}

Manticore دو قسم کی ٹرانزیکشنز کو سپورٹ کرتا ہے:

- Raw ٹرانزیکشن: تمام فنکشنز دریافت کیے جاتے ہیں
- Named ٹرانزیکشن: صرف ایک فنکشن دریافت کیا جاتا ہے

#### Raw ٹرانزیکشن {#raw-transaction}

ایک raw ٹرانزیکشن [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) کا استعمال کرتے ہوئے ایگزیکیوٹ کی جاتی ہے:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

کالر، ایڈریس، ڈیٹا، یا ٹرانزیکشن کی ویلیو ٹھوس (concrete) یا علامتی (symbolic) ہو سکتی ہے:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ایک علامتی ویلیو بناتا ہے۔
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ایک علامتی بائٹ ایرے (byte array) بناتا ہے۔

مثال کے طور پر:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

اگر ڈیٹا علامتی ہے، تو Manticore ٹرانزیکشن ایگزیکیوشن کے دوران کانٹریکٹ کے تمام فنکشنز کو دریافت کرے گا۔ فنکشن کا انتخاب کیسے کام کرتا ہے یہ سمجھنے کے لیے [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) آرٹیکل میں Fallback فنکشن کی وضاحت دیکھنا مددگار ثابت ہوگا۔

#### Named ٹرانزیکشن {#named-transaction}

فنکشنز کو ان کے نام کے ذریعے ایگزیکیوٹ کیا جا سکتا ہے۔
`f(uint var)` کو ایک علامتی ویلیو کے ساتھ، user_account سے، اور 0 ether کے ساتھ ایگزیکیوٹ کرنے کے لیے، استعمال کریں:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

اگر ٹرانزیکشن کی `value` متعین نہیں کی گئی ہے، تو یہ بائی ڈیفالٹ 0 ہوتی ہے۔

#### خلاصہ {#summary-1}

- ٹرانزیکشن کے آرگومنٹس ٹھوس یا علامتی ہو سکتے ہیں
- ایک raw ٹرانزیکشن تمام فنکشنز کو دریافت کرے گی
- فنکشن کو ان کے نام سے کال کیا جا سکتا ہے

### ورک اسپیس {#workspace}

`m.workspace` وہ ڈائرکٹری ہے جو تیار کردہ تمام فائلوں کے لیے آؤٹ پٹ ڈائرکٹری کے طور پر استعمال ہوتی ہے:

```python
print("Results are in {}".format(m.workspace))
```

### ایکسپلوریشن کو ختم کریں {#terminate-the-exploration}

ایکسپلوریشن کو روکنے کے لیے [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) استعمال کریں۔ ایک بار جب یہ طریقہ کال ہو جائے تو مزید کوئی ٹرانزیکشن نہیں بھیجی جانی چاہیے اور Manticore دریافت کیے گئے ہر پاتھ کے لیے ٹیسٹ کیسز بناتا ہے۔

### خلاصہ: Manticore کے تحت چلانا {#summary-running-under-manticore}

پچھلے تمام مراحل کو ایک ساتھ ملانے سے، ہمیں حاصل ہوتا ہے:

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
m.finalize() # stop the exploration
```

اوپر دیا گیا تمام کوڈ آپ [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) میں تلاش کر سکتے ہیں

## تھروئنگ پاتھس (throwing paths) حاصل کرنا {#getting-throwing-paths}

اب ہم `f()` میں ایکسیپشن (exception) پیدا کرنے والے پاتھس کے لیے مخصوص ان پٹس بنائیں گے۔ ہدف اب بھی درج ذیل اسمارٹ کانٹریکٹ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) ہے:

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

ایگزیکیوٹ ہونے والے ہر پاتھ کی اپنی بلاک چین کی اسٹیٹ (state) ہوتی ہے۔ ایک اسٹیٹ یا تو تیار (ready) ہوتی ہے یا اسے ختم (killed) کر دیا جاتا ہے، جس کا مطلب ہے کہ یہ THROW یا REVERT ہدایت تک پہنچ جاتی ہے:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): ان اسٹیٹس کی فہرست جو تیار ہیں (انہوں نے REVERT/INVALID کو ایگزیکیوٹ نہیں کیا)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): ان اسٹیٹس کی فہرست جو ختم ہو چکی ہیں
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): تمام اسٹیٹس

```python
for state in m.all_states:
    # do something with state
```

آپ اسٹیٹ کی معلومات تک رسائی حاصل کر سکتے ہیں۔ مثال کے طور پر:

- `state.platform.get_balance(account.address)`: اکاؤنٹ کا بیلنس
- `state.platform.transactions`: ٹرانزیکشنز کی فہرست
- `state.platform.transactions[-1].return_data`: آخری ٹرانزیکشن کے ذریعے واپس کیا گیا ڈیٹا

آخری ٹرانزیکشن کے ذریعے واپس کیا گیا ڈیٹا ایک ایرے (array) ہے، جسے ABI.deserialize کے ساتھ ایک ویلیو میں تبدیل کیا جا سکتا ہے، مثال کے طور پر:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### ٹیسٹ کیس کیسے بنائیں {#how-to-generate-testcase}

ٹیسٹ کیس بنانے کے لیے [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) استعمال کریں:

```python
m.generate_testcase(state, 'BugFound')
```

### خلاصہ {#summary-2}

- آپ m.all_states کے ساتھ اسٹیٹ پر ایٹریٹ (iterate) کر سکتے ہیں
- `state.platform.get_balance(account.address)` اکاؤنٹ کا بیلنس واپس کرتا ہے
- `state.platform.transactions` ٹرانزیکشنز کی فہرست واپس کرتا ہے
- `transaction.return_data` واپس کیا گیا ڈیٹا ہے
- `m.generate_testcase(state, name)` اسٹیٹ کے لیے ان پٹس بناتا ہے

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

اوپر دیا گیا تمام کوڈ آپ [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) میں تلاش کر سکتے ہیں

_نوٹ کریں کہ ہم ایک بہت آسان اسکرپٹ بنا سکتے تھے، کیونکہ terminated_state کے ذریعے واپس کی گئی تمام اسٹیٹس کے نتیجے میں REVERT یا INVALID ہوتا ہے: اس مثال کا مقصد صرف یہ ظاہر کرنا تھا کہ API کو کیسے مینیپولیٹ کیا جائے۔_

## پابندیاں (constraints) شامل کرنا {#adding-constraints}

ہم دیکھیں گے کہ ایکسپلوریشن کو کیسے محدود کیا جائے۔ ہم یہ فرض کریں گے کہ `f()` کی دستاویزات میں کہا گیا ہے کہ فنکشن کو کبھی بھی `a == 65` کے ساتھ کال نہیں کیا جاتا، لہذا `a == 65` کے ساتھ کوئی بھی بگ حقیقی بگ نہیں ہے۔ ہدف اب بھی درج ذیل اسمارٹ کانٹریکٹ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) ہے:

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

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) ماڈیول پابندیوں کی مینیپولیشن میں سہولت فراہم کرتا ہے، دیگر چیزوں کے علاوہ یہ فراہم کرتا ہے:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

ماڈیول امپورٹ کرنے کے لیے درج ذیل کا استعمال کریں:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` کا استعمال ایک ایرے کو ایک ویلیو کے ساتھ جوڑنے (concatenate) کے لیے کیا جاتا ہے۔ مثال کے طور پر، کسی ٹرانزیکشن کے return_data کو ایک ویلیو میں تبدیل کرنے کی ضرورت ہوتی ہے تاکہ اسے کسی دوسری ویلیو کے خلاف چیک کیا جا سکے:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### پابندیاں (Constraints) {#state-constraint}

آپ پابندیوں کو عالمی سطح پر (globally) یا کسی مخصوص اسٹیٹ کے لیے استعمال کر سکتے ہیں۔

#### عالمی پابندی (Global constraint) {#state-constraint}

عالمی پابندی شامل کرنے کے لیے `m.constrain(constraint)` استعمال کریں۔
مثال کے طور پر، آپ کسی کانٹریکٹ کو ایک علامتی ایڈریس سے کال کر سکتے ہیں، اور اس ایڈریس کو مخصوص ویلیوز تک محدود کر سکتے ہیں:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### اسٹیٹ کی پابندی (State constraint) {#state-constraint}

کسی مخصوص اسٹیٹ میں پابندی شامل کرنے کے لیے [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) استعمال کریں۔
اسے ایکسپلوریشن کے بعد اسٹیٹ کو محدود کرنے کے لیے استعمال کیا جا سکتا ہے تاکہ اس پر کچھ خصوصیات کی جانچ کی جا سکے۔

### پابندی کی جانچ کرنا {#checking-constraint}

یہ جاننے کے لیے کہ آیا کوئی پابندی اب بھی قابل عمل ہے `solver.check(state.constraints)` استعمال کریں۔
مثال کے طور پر، درج ذیل symbolic_value کو 65 سے مختلف ہونے تک محدود کرے گا اور چیک کرے گا کہ آیا اسٹیٹ اب بھی قابل عمل ہے:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### خلاصہ: پابندیاں شامل کرنا {#summary-adding-constraints}

پچھلے کوڈ میں پابندی شامل کرنے سے، ہمیں حاصل ہوتا ہے:

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

اوپر دیا گیا تمام کوڈ آپ [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) میں تلاش کر سکتے ہیں