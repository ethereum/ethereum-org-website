---
title: "سمارٹ کنٹریکٹس کو ٹیسٹ کرنے کے لیے ایکڈنا کا استعمال کیسے کریں"
description: "سمارٹ کنٹریکٹس کو خودکار طور پر ٹیسٹ کرنے کے لیے ایکڈنا کا استعمال کیسے کریں"
author: Trailofbits
lang: ur
tags:
  - Solidity
  - سمارٹ کنٹریکٹس
  - سیکیورٹی
  - ٹیسٹنگ
  - فزنگ
skill: advanced
breadcrumb: "ایکڈنا"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## انسٹالیشن {#installation}

ایکڈنا کو <span dir="ltr">Docker</span> کے ذریعے یا پہلے سے مرتب شدہ (pre-compiled) بائنری کا استعمال کرتے ہوئے انسٹال کیا جا سکتا ہے۔

### <span dir="ltr">Docker</span> کے ذریعے ایکڈنا {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_آخری کمانڈ <span dir="ltr">eth-security-toolbox</span> کو ایک <span dir="ltr">Docker</span> میں چلاتی ہے جسے آپ کی موجودہ ڈائریکٹری تک رسائی حاصل ہوتی ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور <span dir="ltr">Docker</span> سے فائلوں پر ٹولز چلا سکتے ہیں_

<span dir="ltr">Docker</span> کے اندر، چلائیں:

```bash
solc-select 0.5.11
cd /home/training
```

### بائنری {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## پراپرٹی پر مبنی فزنگ کا تعارف {#introduction-to-property-based-fuzzing}

ایکڈنا ایک پراپرٹی پر مبنی فزر ہے، جسے ہم نے اپنی پچھلی بلاگ پوسٹس ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)، [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)، [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) میں بیان کیا ہے۔

### فزنگ {#fuzzing}

[فزنگ](https://wikipedia.org/wiki/Fuzzing) سیکیورٹی کمیونٹی میں ایک مشہور تکنیک ہے۔ یہ پروگرام میں بگز تلاش کرنے کے لیے کم و بیش بے ترتیب (random) ان پٹس تیار کرنے پر مشتمل ہے۔ روایتی سافٹ ویئر کے لیے فزرز (جیسے [<span dir="ltr">AFL</span>](http://lcamtuf.coredump.cx/afl/) یا [<span dir="ltr">LibFuzzer</span>](https://llvm.org/docs/LibFuzzer.html)) بگز تلاش کرنے کے لیے موثر ٹولز کے طور پر جانے جاتے ہیں۔

ان پٹس کی خالصتاً بے ترتیب تخلیق کے علاوہ، اچھے ان پٹس تیار کرنے کے لیے بہت سی تکنیکیں اور حکمت عملیاں ہیں، جن میں شامل ہیں:

- ہر عمل درآمد (execution) سے فیڈ بیک حاصل کریں اور اس کا استعمال کرتے ہوئے تخلیق کی رہنمائی کریں۔ مثال کے طور پر، اگر نیا تیار کردہ ان پٹ کسی نئے راستے کی دریافت کا باعث بنتا ہے، تو اس کے قریب نئے ان پٹس تیار کرنا سمجھ میں آ سکتا ہے۔
- ساختی رکاوٹ (structural constraint) کا احترام کرتے ہوئے ان پٹ تیار کرنا۔ مثال کے طور پر، اگر آپ کے ان پٹ میں چیک سم (checksum) کے ساتھ ہیڈر شامل ہے، تو فزر کو چیک سم کی توثیق کرنے والا ان پٹ تیار کرنے دینا مناسب ہوگا۔
- نئے ان پٹس تیار کرنے کے لیے معلوم ان پٹس کا استعمال: اگر آپ کو درست ان پٹ کے بڑے ڈیٹاسیٹ تک رسائی حاصل ہے، تو آپ کا فزر شروع سے تخلیق کرنے کے بجائے ان سے نئے ان پٹس تیار کر سکتا ہے۔ انہیں عام طور پر _seeds_ کہا جاتا ہے۔

### پراپرٹی پر مبنی فزنگ {#property-based-fuzzing}

ایکڈنا فزر کے ایک مخصوص خاندان سے تعلق رکھتا ہے: پراپرٹی پر مبنی فزنگ جو [<span dir="ltr">QuickCheck</span>](https://wikipedia.org/wiki/QuickCheck) سے بہت زیادہ متاثر ہے۔ کلاسک فزر کے برعکس جو کریشز تلاش کرنے کی کوشش کرے گا، ایکڈنا صارف کے متعین کردہ انویرینٹس (invariants) کو توڑنے کی کوشش کرے گا۔

سمارٹ کنٹریکٹس میں، انویرینٹس <span dir="ltr">Solidity</span> فنکشنز ہوتے ہیں، جو کسی بھی غلط یا نامانوس حالت کی نمائندگی کر سکتے ہیں جہاں کنٹریکٹ پہنچ سکتا ہے، بشمول:

- غلط ایکسیس کنٹرول: حملہ آور کنٹریکٹ کا مالک بن گیا۔
- غلط حالت کی مشین (state machine): کنٹریکٹ کے موقوف (paused) ہونے کے دوران ٹوکنز منتقل کیے جا سکتے ہیں۔
- غلط ریاضی: صارف اپنے بیلنس کو انڈرفلو (underflow) کر سکتا ہے اور لامحدود مفت ٹوکنز حاصل کر سکتا ہے۔

### ایکڈنا کے ساتھ پراپرٹی کی ٹیسٹنگ {#testing-a-property-with-echidna}

ہم دیکھیں گے کہ ایکڈنا کے ساتھ سمارٹ کنٹریکٹ کو کیسے ٹیسٹ کیا جائے۔ ہدف درج ذیل سمارٹ کنٹریکٹ [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) ہے:

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

ہم یہ فرض کریں گے کہ اس ٹوکن میں درج ذیل خصوصیات ہونی چاہئیں:

- کسی کے پاس بھی زیادہ سے زیادہ <span dir="ltr">1000</span> ٹوکنز ہو سکتے ہیں
- ٹوکن منتقل نہیں کیا جا سکتا (یہ <span dir="ltr">ERC-20</span> ٹوکن نہیں ہے)

### پراپرٹی لکھیں {#write-a-property}

ایکڈنا کی پراپرٹیز <span dir="ltr">Solidity</span> فنکشنز ہیں۔ ایک پراپرٹی کو لازمی طور پر:

- کوئی آرگومنٹ نہیں ہونا چاہیے
- اگر یہ کامیاب ہو تو `true` واپس کرنا چاہیے
- اس کا نام `echidna` سے شروع ہونا چاہیے

ایکڈنا کرے گا:

- پراپرٹی کو ٹیسٹ کرنے کے لیے خود بخود صوابدیدی (arbitrary) ٹرانزیکشنز تیار کرے گا۔
- کسی بھی ایسی ٹرانزیکشنز کی اطلاع دے گا جو پراپرٹی کو `false` واپس کرنے یا ایرر (error) دینے کا سبب بنتی ہیں۔
- پراپرٹی کو کال کرتے وقت سائیڈ ایفیکٹ کو مسترد کر دے گا (یعنی، اگر پراپرٹی کسی حالت کے متغیر (state variable) کو تبدیل کرتی ہے، تو اسے ٹیسٹ کے بعد مسترد کر دیا جاتا ہے)

درج ذیل پراپرٹی چیک کرتی ہے کہ کال کرنے والے کے پاس <span dir="ltr">1000</span> سے زیادہ ٹوکنز نہیں ہیں:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

اپنے کنٹریکٹ کو اپنی پراپرٹیز سے الگ کرنے کے لیے وراثت (inheritance) کا استعمال کریں:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) پراپرٹی کو نافذ کرتا ہے اور ٹوکن سے وراثت حاصل کرتا ہے۔

### کنٹریکٹ شروع کریں {#initiate-a-contract}

ایکڈنا کو بغیر آرگومنٹ کے ایک [کنسٹرکٹر](/developers/docs/smart-contracts/anatomy/#constructor-functions) کی ضرورت ہوتی ہے۔ اگر آپ کے کنٹریکٹ کو مخصوص ابتدا (initialization) کی ضرورت ہے، تو آپ کو اسے کنسٹرکٹر میں کرنے کی ضرورت ہے۔

ایکڈنا میں کچھ مخصوص ایڈریسز ہیں:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` جو کنسٹرکٹر کو کال کرتا ہے۔
- `0x10000`، `0x20000`، اور `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` جو تصادفی طور پر دوسرے فنکشنز کو کال کرتے ہیں۔

ہمیں اپنی موجودہ مثال میں کسی خاص ابتدا کی ضرورت نہیں ہے، جس کے نتیجے میں ہمارا کنسٹرکٹر خالی ہے۔

### ایکڈنا چلائیں {#run-echidna}

ایکڈنا کو اس کے ساتھ لانچ کیا جاتا ہے:

```bash
echidna-test contract.sol
```

اگر <span dir="ltr">contract.sol</span> میں متعدد کنٹریکٹس شامل ہیں، تو آپ ہدف کی وضاحت کر سکتے ہیں:

```bash
echidna-test contract.sol --contract MyContract
```

### خلاصہ: پراپرٹی کی ٹیسٹنگ {#summary-testing-a-property}

درج ذیل ہماری مثال پر ایکڈنا کے چلنے کا خلاصہ کرتا ہے:

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

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

ایکڈنا نے پایا کہ اگر `backdoor` کو کال کیا جائے تو پراپرٹی کی خلاف ورزی ہوتی ہے۔

## فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو فلٹر کرنا {#filtering-functions-to-call-during-a-fuzzing-campaign}

ہم دیکھیں گے کہ فز کیے جانے والے فنکشنز کو کیسے فلٹر کیا جائے۔
ہدف درج ذیل سمارٹ کنٹریکٹ ہے:

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

یہ چھوٹی سی مثال ایکڈنا کو حالت کے متغیر کو تبدیل کرنے کے لیے ٹرانزیکشنز کی ایک خاص ترتیب تلاش کرنے پر مجبور کرتی ہے۔
یہ فزر کے لیے مشکل ہے (یہ تجویز کیا جاتا ہے کہ [مینٹیکور](https://github.com/trailofbits/manticore) جیسا علامتی عمل درآمد (symbolic execution) ٹول استعمال کیا جائے)۔
ہم اس کی تصدیق کے لیے ایکڈنا چلا سکتے ہیں:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### فنکشنز کو فلٹر کرنا {#filtering-functions}

ایکڈنا کو اس کنٹریکٹ کو ٹیسٹ کرنے کے لیے صحیح ترتیب تلاش کرنے میں دشواری ہوتی ہے کیونکہ دو ری سیٹ فنکشنز (`reset1` اور `reset2`) تمام حالت کے متغیرات کو `false` پر سیٹ کر دیں گے۔
تاہم، ہم ری سیٹ فنکشن کو بلیک لسٹ کرنے یا صرف `f`، `g`،
`h` اور `i` فنکشنز کو وائٹ لسٹ کرنے کے لیے ایکڈنا کی ایک خاص خصوصیت استعمال کر سکتے ہیں۔

فنکشنز کو بلیک لسٹ کرنے کے لیے، ہم یہ کنفیگریشن فائل استعمال کر سکتے ہیں:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

فنکشنز کو فلٹر کرنے کا دوسرا طریقہ وائٹ لسٹ کیے گئے فنکشنز کی فہرست بنانا ہے۔ ایسا کرنے کے لیے، ہم یہ کنفیگریشن فائل استعمال کر سکتے ہیں:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` پہلے سے طے شدہ طور پر `true` ہے۔
- فلٹرنگ صرف نام سے کی جائے گی (پیرامیٹرز کے بغیر)۔ اگر آپ کے پاس `f()` اور `f(uint256)` ہیں، تو فلٹر `"f"` دونوں فنکشنز سے مماثل ہوگا۔

### ایکڈنا چلائیں {#run-echidna-1}

کنفیگریشن فائل `blacklist.yaml` کے ساتھ ایکڈنا چلانے کے لیے:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

ایکڈنا پراپرٹی کو غلط ثابت کرنے کے لیے ٹرانزیکشنز کی ترتیب تقریباً فوراً تلاش کر لے گا۔

### خلاصہ: فنکشنز کو فلٹر کرنا {#summary-filtering-functions}

ایکڈنا فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو بلیک لسٹ یا وائٹ لسٹ کر سکتا ہے، اس کا استعمال کرتے ہوئے:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ایکڈنا `filterBlacklist` بولین (boolean) کی قدر کے مطابق، یا تو `f1`، `f2` اور `f3` کو بلیک لسٹ کر کے یا صرف انہیں کال کر کے فزنگ مہم شروع کرتا ہے۔

## ایکڈنا کے ساتھ <span dir="ltr">Solidity</span> کے تصدیق کرنے (assert) کو کیسے ٹیسٹ کریں {#how-to-test-soliditys-assert-with-echidna}

اس مختصر ٹیوٹوریل میں، ہم یہ دکھانے جا رہے ہیں کہ کنٹریکٹس میں تصدیق کرنے (assertion) کی جانچ کو ٹیسٹ کرنے کے لیے ایکڈنا کا استعمال کیسے کیا جائے۔ فرض کریں کہ ہمارے پاس اس طرح کا ایک کنٹریکٹ ہے:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### ایک تصدیق (assertion) لکھیں {#write-an-assertion}

ہم یہ یقینی بنانا چاہتے ہیں کہ اس کا فرق واپس کرنے کے بعد `tmp`، `counter` سے کم یا اس کے برابر ہو۔ ہم ایکڈنا پراپرٹی لکھ سکتے ہیں، لیکن ہمیں `tmp` کی قدر کو کہیں محفوظ کرنے کی ضرورت ہوگی۔ اس کے بجائے، ہم اس طرح کی تصدیق استعمال کر سکتے ہیں:

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

### ایکڈنا چلائیں {#run-echidna-2}

تصدیق کی ناکامی کی ٹیسٹنگ کو فعال کرنے کے لیے، ایک [ایکڈنا کنفیگریشن فائل](https://github.com/crytic/echidna/wiki/Config) `config.yaml` بنائیں:

```yaml
checkAsserts: true
```

جب ہم اس کنٹریکٹ کو ایکڈنا میں چلاتے ہیں، تو ہمیں متوقع نتائج حاصل ہوتے ہیں:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

جیسا کہ آپ دیکھ سکتے ہیں، ایکڈنا `inc` فنکشن میں کچھ تصدیق کی ناکامی کی اطلاع دیتا ہے۔ فی فنکشن ایک سے زیادہ تصدیق شامل کرنا ممکن ہے، لیکن ایکڈنا یہ نہیں بتا سکتا کہ کون سی تصدیق ناکام ہوئی۔

### تصدیقات (assertions) کب اور کیسے استعمال کریں {#when-and-how-use-assertions}

تصدیقات کو واضح پراپرٹیز کے متبادل کے طور پر استعمال کیا جا سکتا ہے، خاص طور پر اگر چیک کی جانے والی شرائط کا براہ راست تعلق کسی آپریشن `f` کے درست استعمال سے ہو۔ کچھ کوڈ کے بعد تصدیقات شامل کرنے سے یہ یقینی ہو جائے گا کہ اس پر عمل درآمد کے فوراً بعد چیک کیا جائے گا:

```solidity
function f(..) public {
    // کچھ پیچیدہ کوڈ
    ...
    assert (condition);
    ...
}

```

اس کے برعکس، ایک واضح ایکڈنا پراپرٹی کا استعمال تصادفی طور پر ٹرانزیکشنز پر عمل درآمد کرے گا اور یہ یقینی بنانے کا کوئی آسان طریقہ نہیں ہے کہ اسے بالکل کب چیک کیا جائے گا۔ یہ ورک اراؤنڈ (workaround) کرنا اب بھی ممکن ہے:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

تاہم، کچھ مسائل ہیں:

- یہ ناکام ہو جاتا ہے اگر `f` کو `internal` یا `external` کے طور پر ڈکلیئر کیا گیا ہو۔
- یہ واضح نہیں ہے کہ `f` کو کال کرنے کے لیے کون سے آرگومنٹس استعمال کیے جائیں۔
- اگر `f` ریورٹ ہوتا ہے، تو پراپرٹی ناکام ہو جائے گی۔

عام طور پر، ہم تصدیقات کے استعمال کے طریقہ کار پر [<span dir="ltr">John Regehr</span> کی سفارش](https://blog.regehr.org/archives/1091) پر عمل کرنے کی تجویز کرتے ہیں:

- تصدیق کی جانچ کے دوران کسی سائیڈ ایفیکٹ پر مجبور نہ کریں۔ مثال کے طور پر: `assert(ChangeStateAndReturn() == 1)`
- واضح بیانات کی تصدیق نہ کریں۔ مثال کے طور پر `assert(var >= 0)` جہاں `var` کو `uint` کے طور پر ڈکلیئر کیا گیا ہے۔

آخر میں، براہ کرم `assert` کے بجائے `require` **استعمال نہ کریں**، کیونکہ ایکڈنا اس کا پتہ لگانے کے قابل نہیں ہوگا (لیکن کنٹریکٹ بہرحال ریورٹ ہو جائے گا)۔

### خلاصہ: تصدیق کی جانچ {#summary-assertion-checking}

درج ذیل ہماری مثال پر ایکڈنا کے چلنے کا خلاصہ کرتا ہے:

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
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

ایکڈنا نے پایا کہ `inc` میں تصدیق ناکام ہو سکتی ہے اگر اس فنکشن کو بڑے آرگومنٹس کے ساتھ متعدد بار کال کیا جائے۔

## ایکڈنا کارپس (corpus) کو جمع کرنا اور اس میں ترمیم کرنا {#collecting-and-modifying-an-echidna-corpus}

ہم دیکھیں گے کہ ایکڈنا کے ساتھ ٹرانزیکشنز کا کارپس کیسے جمع کیا جائے اور استعمال کیا جائے۔ ہدف درج ذیل سمارٹ کنٹریکٹ [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) ہے:

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

یہ چھوٹی سی مثال ایکڈنا کو حالت کے متغیر کو تبدیل کرنے کے لیے کچھ اقدار تلاش کرنے پر مجبور کرتی ہے۔ یہ فزر کے لیے مشکل ہے
(یہ تجویز کیا جاتا ہے کہ [مینٹیکور](https://github.com/trailofbits/manticore) جیسا علامتی عمل درآمد ٹول استعمال کیا جائے)۔
ہم اس کی تصدیق کے لیے ایکڈنا چلا سکتے ہیں:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

تاہم، ہم اس فزنگ مہم کو چلاتے وقت کارپس جمع کرنے کے لیے اب بھی ایکڈنا کا استعمال کر سکتے ہیں۔

### کارپس جمع کرنا {#collecting-a-corpus}

کارپس جمع کرنے کو فعال کرنے کے لیے، ایک کارپس ڈائریکٹری بنائیں:

```bash
mkdir corpus-magic
```

اور ایک [ایکڈنا کنفیگریشن فائل](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

اب ہم اپنا ٹول چلا سکتے ہیں اور جمع کیے گئے کارپس کو چیک کر سکتے ہیں:

```bash
echidna-test magic.sol --config config.yaml
```

ایکڈنا اب بھی درست جادوئی اقدار (magic values) تلاش نہیں کر سکتا، لیکن ہم اس کے جمع کردہ کارپس پر ایک نظر ڈال سکتے ہیں۔
مثال کے طور پر، ان فائلوں میں سے ایک تھی:

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

واضح طور پر، یہ ان پٹ ہماری پراپرٹی میں ناکامی کو متحرک نہیں کرے گا۔ تاہم، اگلے مرحلے میں، ہم دیکھیں گے کہ اس کے لیے اس میں کیسے ترمیم کی جائے۔

### کارپس کو سیڈ (seed) کرنا {#seeding-a-corpus}

ایکڈنا کو `magic` فنکشن سے نمٹنے کے لیے کچھ مدد کی ضرورت ہے۔ ہم اس کے لیے مناسب پیرامیٹرز استعمال کرنے کے لیے ان پٹ کو کاپی اور اس میں ترمیم کرنے جا رہے ہیں:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

ہم `magic(42,129,333,0)` کو کال کرنے کے لیے `new.txt` میں ترمیم کریں گے۔ اب، ہم ایکڈنا کو دوبارہ چلا سکتے ہیں:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

اس بار، اس نے پایا کہ پراپرٹی کی فوراً خلاف ورزی ہوتی ہے۔

## زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کرنا {#finding-transactions-with-high-gas-consumption}

ہم دیکھیں گے کہ ایکڈنا کے ساتھ زیادہ گیس کی کھپت والی ٹرانزیکشنز کیسے تلاش کی جائیں۔ ہدف درج ذیل سمارٹ کنٹریکٹ ہے:

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

یہاں `expensive` میں گیس کی بڑی کھپت ہو سکتی ہے۔

فی الحال، ایکڈنا کو ٹیسٹ کرنے کے لیے ہمیشہ ایک پراپرٹی کی ضرورت ہوتی ہے: یہاں `echidna_test` ہمیشہ `true` واپس کرتا ہے۔
ہم اس کی تصدیق کے لیے ایکڈنا چلا سکتے ہیں:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### گیس کی کھپت کی پیمائش {#measuring-gas-consumption}

ایکڈنا کے ساتھ گیس کی کھپت کو فعال کرنے کے لیے، ایک کنفیگریشن فائل `config.yaml` بنائیں:

```yaml
estimateGas: true
```

اس مثال میں، ہم نتائج کو سمجھنے میں آسان بنانے کے لیے ٹرانزیکشن کی ترتیب کا سائز بھی کم کریں گے:

```yaml
seqLen: 2
estimateGas: true
```

### ایکڈنا چلائیں {#run-echidna-3}

ایک بار جب ہم کنفیگریشن فائل بنا لیتے ہیں، تو ہم ایکڈنا کو اس طرح چلا سکتے ہیں:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- دکھائی گئی گیس ایک تخمینہ ہے جو [<span dir="ltr">HEVM</span>](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) کے ذریعہ فراہم کیا گیا ہے۔

### گیس کم کرنے والی کالز کو فلٹر کرنا {#filtering-out-gas-reducing-calls}

اوپر **فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو فلٹر کرنے** کا ٹیوٹوریل دکھاتا ہے کہ آپ کی ٹیسٹنگ سے کچھ فنکشنز کو کیسے ہٹایا جائے۔  
یہ گیس کا درست تخمینہ حاصل کرنے کے لیے اہم ہو سکتا ہے۔
درج ذیل مثال پر غور کریں:

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

اگر ایکڈنا تمام فنکشنز کو کال کر سکتا ہے، تو اسے زیادہ گیس کی لاگت والی ٹرانزیکشنز آسانی سے نہیں ملیں گی:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

اس کی وجہ یہ ہے کہ لاگت کا انحصار `addrs` کے سائز پر ہوتا ہے اور بے ترتیب کالز ارے (array) کو تقریباً خالی چھوڑ دیتی ہیں۔
تاہم، `pop` اور `clear` کو بلیک لسٹ کرنے سے ہمیں بہت بہتر نتائج ملتے ہیں:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### خلاصہ: زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کرنا {#summary-finding-transactions-with-high-gas-consumption}

ایکڈنا `estimateGas` کنفیگریشن آپشن کا استعمال کرتے ہوئے زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کر سکتا ہے:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ایک بار فزنگ مہم ختم ہونے کے بعد، ایکڈنا ہر فنکشن کے لیے زیادہ سے زیادہ گیس کی کھپت کے ساتھ ایک ترتیب کی اطلاع دے گا۔