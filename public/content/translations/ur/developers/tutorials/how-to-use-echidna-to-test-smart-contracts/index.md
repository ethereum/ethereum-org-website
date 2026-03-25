---
title: "اسمارٹ کانٹریکٹس کو ٹیسٹ کرنے کے لیے Echidna کا استعمال کیسے کریں"
description: "اسمارٹ کانٹریکٹس کو خودکار طور پر ٹیسٹ کرنے کے لیے Echidna کا استعمال کیسے کریں"
author: "ٹریل آف بٹس"
lang: ur
tags: ["Solidity", "اسمارٹ کانٹریکٹس", "سیکیورٹی", "ٹیسٹنگ", "فزنگ"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## انسٹالیشن {#installation}

Echidna کو ڈوکر (docker) کے ذریعے یا پہلے سے مرتب شدہ (pre-compiled) بائنری کا استعمال کرتے ہوئے انسٹال کیا جا سکتا ہے۔

### ڈوکر کے ذریعے Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_آخری کمانڈ eth-security-toolbox کو ایک ڈوکر میں چلاتی ہے جسے آپ کی موجودہ ڈائرکٹری تک رسائی حاصل ہوتی ہے۔ آپ اپنے ہوسٹ سے فائلیں تبدیل کر سکتے ہیں، اور ڈوکر سے فائلوں پر ٹولز چلا سکتے ہیں_

ڈوکر کے اندر، چلائیں:

```bash
solc-select 0.5.11
cd /home/training
```

### بائنری {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## پراپرٹی پر مبنی فزنگ کا تعارف {#introduction-to-property-based-fuzzing}

Echidna ایک پراپرٹی پر مبنی فزر (fuzzer) ہے، جسے ہم نے اپنی پچھلی بلاگ پوسٹس میں بیان کیا ہے ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)، [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)، [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))۔

### فزنگ {#fuzzing}

[فزنگ (Fuzzing)](https://wikipedia.org/wiki/Fuzzing) سیکیورٹی کمیونٹی میں ایک مشہور تکنیک ہے۔ یہ پروگرام میں بگز تلاش کرنے کے لیے کم و بیش بے ترتیب (random) ان پٹس بنانے پر مشتمل ہے۔ روایتی سافٹ ویئر کے لیے فزرز (جیسے [AFL](http://lcamtuf.coredump.cx/afl/) یا [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) بگز تلاش کرنے کے لیے موثر ٹولز کے طور پر جانے جاتے ہیں۔

ان پٹس کی خالصتاً بے ترتیب تخلیق کے علاوہ، اچھے ان پٹس بنانے کے لیے بہت سی تکنیکیں اور حکمت عملیاں ہیں، جن میں شامل ہیں:

- ہر عمل درآمد (execution) سے فیڈ بیک حاصل کریں اور اس کا استعمال کرتے ہوئے تخلیق کی رہنمائی کریں۔ مثال کے طور پر، اگر ایک نیا بنایا گیا ان پٹ کسی نئے راستے کی دریافت کا باعث بنتا ہے، تو اس کے قریب نئے ان پٹس بنانا معنی خیز ہو سکتا ہے۔
- ساختی رکاوٹ (structural constraint) کا احترام کرتے ہوئے ان پٹ بنانا۔ مثال کے طور پر، اگر آپ کے ان پٹ میں چیک سم (checksum) کے ساتھ ہیڈر شامل ہے، تو فزر کو چیک سم کی توثیق کرنے والا ان پٹ بنانے دینا معنی خیز ہوگا۔
- نئے ان پٹس بنانے کے لیے معلوم ان پٹس کا استعمال: اگر آپ کو درست ان پٹ کے بڑے ڈیٹاسیٹ تک رسائی حاصل ہے، تو آپ کا فزر شروع سے تخلیق کرنے کے بجائے ان سے نئے ان پٹس بنا سکتا ہے۔ انہیں عام طور پر _سیڈز (seeds)_ کہا جاتا ہے۔

### پراپرٹی پر مبنی فزنگ {#property-based-fuzzing}

Echidna فزر کے ایک مخصوص خاندان سے تعلق رکھتا ہے: پراپرٹی پر مبنی فزنگ جو [QuickCheck](https://wikipedia.org/wiki/QuickCheck) سے بہت زیادہ متاثر ہے۔ کلاسک فزر کے برعکس جو کریشز تلاش کرنے کی کوشش کرے گا، Echidna صارف کے بیان کردہ انویرینٹس (invariants) کو توڑنے کی کوشش کرے گا۔

اسمارٹ کانٹریکٹس میں، انویرینٹس Solidity فنکشنز ہوتے ہیں، جو کسی بھی غلط یا نامانوس اسٹیٹ کی نمائندگی کر سکتے ہیں جہاں کانٹریکٹ پہنچ سکتا ہے، بشمول:

- غلط ایکسیس کنٹرول: حملہ آور کانٹریکٹ کا مالک بن گیا۔
- غلط اسٹیٹ مشین: کانٹریکٹ کے موقوف (paused) ہونے کے دوران ٹوکنز منتقل کیے جا سکتے ہیں۔
- غلط ریاضی: صارف اپنے بیلنس کو انڈرفلو (underflow) کر سکتا ہے اور لامحدود مفت ٹوکنز حاصل کر سکتا ہے۔

### Echidna کے ساتھ پراپرٹی کی ٹیسٹنگ {#testing-a-property-with-echidna}

ہم دیکھیں گے کہ Echidna کے ساتھ اسمارٹ کانٹریکٹ کو کیسے ٹیسٹ کیا جائے۔ ہدف درج ذیل اسمارٹ کانٹریکٹ [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) ہے:

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

- کسی کے پاس بھی زیادہ سے زیادہ 1000 ٹوکنز ہو سکتے ہیں
- ٹوکن منتقل نہیں کیا جا سکتا (یہ ERC-20 ٹوکن نہیں ہے)

### پراپرٹی لکھیں {#write-a-property}

Echidna پراپرٹیز Solidity فنکشنز ہیں۔ ایک پراپرٹی کو لازمی طور پر:

- کوئی آرگومنٹ نہیں ہونا چاہیے
- اگر یہ کامیاب ہو تو `true` واپس کرنا چاہیے
- اس کا نام `echidna` سے شروع ہونا چاہیے

Echidna کرے گا:

- پراپرٹی کو ٹیسٹ کرنے کے لیے خود بخود صوابدیدی (arbitrary) ٹرانزیکشنز بنائے گا۔
- کسی بھی ایسی ٹرانزیکشن کی اطلاع دے گا جس کی وجہ سے پراپرٹی `false` واپس کرے یا کوئی ایرر دے۔
- پراپرٹی کو کال کرتے وقت سائیڈ ایفیکٹ کو مسترد کر دے گا (یعنی، اگر پراپرٹی کسی اسٹیٹ ویری ایبل کو تبدیل کرتی ہے، تو اسے ٹیسٹ کے بعد مسترد کر دیا جاتا ہے)

درج ذیل پراپرٹی چیک کرتی ہے کہ کال کرنے والے کے پاس 1000 سے زیادہ ٹوکنز نہیں ہیں:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

اپنے کانٹریکٹ کو اپنی پراپرٹیز سے الگ کرنے کے لیے وراثت (inheritance) کا استعمال کریں:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) پراپرٹی کو نافذ کرتا ہے اور ٹوکن سے وراثت حاصل کرتا ہے۔

### کانٹریکٹ شروع کریں {#initiate-a-contract}

Echidna کو بغیر آرگومنٹ کے ایک [کنسٹرکٹر (constructor)](/developers/docs/smart-contracts/anatomy/#constructor-functions) کی ضرورت ہوتی ہے۔ اگر آپ کے کانٹریکٹ کو مخصوص ابتدا (initialization) کی ضرورت ہے، تو آپ کو اسے کنسٹرکٹر میں کرنے کی ضرورت ہے۔

Echidna میں کچھ مخصوص ایڈریسز ہیں:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` جو کنسٹرکٹر کو کال کرتا ہے۔
- `0x10000`، `0x20000`، اور `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` جو تصادفی طور پر دوسرے فنکشنز کو کال کرتے ہیں۔

ہمیں اپنی موجودہ مثال میں کسی خاص ابتدا کی ضرورت نہیں ہے، جس کے نتیجے میں ہمارا کنسٹرکٹر خالی ہے۔

### Echidna چلائیں {#run-echidna}

Echidna کو اس کے ساتھ لانچ کیا جاتا ہے:

```bash
echidna-test contract.sol
```

اگر contract.sol میں متعدد کانٹریکٹس ہیں، تو آپ ہدف بتا سکتے ہیں:

```bash
echidna-test contract.sol --contract MyContract
```

### خلاصہ: پراپرٹی کی ٹیسٹنگ {#summary-testing-a-property}

درج ذیل ہماری مثال پر echidna کے چلنے کا خلاصہ کرتا ہے:

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

Echidna نے پایا کہ اگر `backdoor` کو کال کیا جائے تو پراپرٹی کی خلاف ورزی ہوتی ہے۔

## فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو فلٹر کرنا {#filtering-functions-to-call-during-a-fuzzing-campaign}

ہم دیکھیں گے کہ فز کیے جانے والے فنکشنز کو کیسے فلٹر کیا جائے۔
ہدف درج ذیل اسمارٹ کانٹریکٹ ہے:

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

یہ چھوٹی سی مثال Echidna کو اسٹیٹ ویری ایبل کو تبدیل کرنے کے لیے ٹرانزیکشنز کی ایک خاص ترتیب تلاش کرنے پر مجبور کرتی ہے۔
یہ ایک فزر کے لیے مشکل ہے (یہ تجویز کیا جاتا ہے کہ [Manticore](https://github.com/trailofbits/manticore) جیسا علامتی عمل درآمد (symbolic execution) ٹول استعمال کریں)۔
ہم اس کی تصدیق کے لیے Echidna چلا سکتے ہیں:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### فنکشنز کو فلٹر کرنا {#filtering-functions}

Echidna کو اس کانٹریکٹ کو ٹیسٹ کرنے کے لیے صحیح ترتیب تلاش کرنے میں دشواری ہوتی ہے کیونکہ دو ری سیٹ فنکشنز (`reset1` اور `reset2`) تمام اسٹیٹ ویری ایبلز کو `false` پر سیٹ کر دیں گے۔
تاہم، ہم ری سیٹ فنکشن کو بلیک لسٹ کرنے یا صرف `f`، `g`،
`h` اور `i` فنکشنز کو وائٹ لسٹ کرنے کے لیے ایک خاص Echidna فیچر استعمال کر سکتے ہیں۔

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

### Echidna چلائیں {#run-echidna-1}

کنفیگریشن فائل `blacklist.yaml` کے ساتھ Echidna چلانے کے لیے:

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

Echidna پراپرٹی کو غلط ثابت کرنے کے لیے ٹرانزیکشنز کی ترتیب تقریباً فوراً تلاش کر لے گا۔

### خلاصہ: فنکشنز کو فلٹر کرنا {#summary-filtering-functions}

Echidna فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو بلیک لسٹ یا وائٹ لسٹ کر سکتا ہے، اس کا استعمال کرتے ہوئے:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna `filterBlacklist` بولین (boolean) کی قدر کے مطابق، یا تو `f1`، `f2` اور `f3` کو بلیک لسٹ کر کے یا صرف انہیں کال کر کے فزنگ مہم شروع کرتا ہے۔

## Echidna کے ساتھ Solidity کے assert کو کیسے ٹیسٹ کریں {#how-to-test-soliditys-assert-with-echidna}

اس مختصر ٹیوٹوریل میں، ہم یہ دکھانے جا رہے ہیں کہ کانٹریکٹس میں اسیرشن (assertion) چیکنگ کو ٹیسٹ کرنے کے لیے Echidna کا استعمال کیسے کریں۔ فرض کریں کہ ہمارے پاس اس طرح کا ایک کانٹریکٹ ہے:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp، counter سے کم یا اس کے برابر ہے
    return (counter - tmp);
  }
}
```

### ایک اسیرشن لکھیں {#write-an-assertion}

ہم یہ یقینی بنانا چاہتے ہیں کہ اس کا فرق واپس کرنے کے بعد `tmp` `counter` سے کم یا اس کے برابر ہے۔ ہم ایک Echidna پراپرٹی لکھ سکتے ہیں، لیکن ہمیں `tmp` کی قدر کو کہیں اسٹور کرنے کی ضرورت ہوگی۔ اس کے بجائے، ہم اس طرح کا ایک اسیرشن استعمال کر سکتے ہیں:

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

### Echidna چلائیں {#run-echidna-2}

اسیرشن کی ناکامی کی ٹیسٹنگ کو فعال کرنے کے لیے، ایک [Echidna کنفیگریشن فائل](https://github.com/crytic/echidna/wiki/Config) `config.yaml` بنائیں:

```yaml
checkAsserts: true
```

جب ہم اس کانٹریکٹ کو Echidna میں چلاتے ہیں، تو ہمیں متوقع نتائج حاصل ہوتے ہیں:

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

جیسا کہ آپ دیکھ سکتے ہیں، Echidna `inc` فنکشن میں کچھ اسیرشن کی ناکامی کی اطلاع دیتا ہے۔ فی فنکشن ایک سے زیادہ اسیرشن شامل کرنا ممکن ہے، لیکن Echidna یہ نہیں بتا سکتا کہ کون سا اسیرشن ناکام ہوا۔

### اسیرشنز کب اور کیسے استعمال کریں {#when-and-how-use-assertions}

اسیرشنز کو واضح پراپرٹیز کے متبادل کے طور پر استعمال کیا جا سکتا ہے، خاص طور پر اگر چیک کی جانے والی شرائط کا براہ راست تعلق کسی آپریشن `f` کے درست استعمال سے ہو۔ کچھ کوڈ کے بعد اسیرشنز شامل کرنے سے یہ نافذ ہو جائے گا کہ چیک اس کے عمل میں آنے کے فوراً بعد ہوگا۔:

```solidity
function f(..) public {
    // کچھ پیچیدہ کوڈ
    ...
    assert (condition);
    ...
}

```

اس کے برعکس، ایک واضح echidna پراپرٹی کا استعمال تصادفی طور پر ٹرانزیکشنز کو انجام دے گا اور یہ نافذ کرنے کا کوئی آسان طریقہ نہیں ہے کہ اسے کب چیک کیا جائے گا۔ یہ ورک اراؤنڈ (workaround) کرنا اب بھی ممکن ہے:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

تاہم، کچھ مسائل ہیں:

- اگر `f` کو `internal` یا `external` کے طور پر ڈکلیئر کیا گیا ہو تو یہ ناکام ہو جاتا ہے۔
- یہ واضح نہیں ہے کہ `f` کو کال کرنے کے لیے کون سے آرگومنٹس استعمال کیے جائیں۔
- اگر `f` ریورٹ (revert) ہوتا ہے، تو پراپرٹی ناکام ہو جائے گی۔

عام طور پر، ہم اسیرشنز کے استعمال کے طریقہ کار پر [John Regehr کی سفارش](https://blog.regehr.org/archives/1091) پر عمل کرنے کی تجویز کرتے ہیں:

- اسیرشن چیکنگ کے دوران کسی بھی سائیڈ ایفیکٹ پر مجبور نہ کریں۔ مثال کے طور پر: `assert(ChangeStateAndReturn() == 1)`
- واضح بیانات پر زور نہ دیں۔ مثال کے طور پر `assert(var >= 0)` جہاں `var` کو `uint` کے طور پر ڈکلیئر کیا گیا ہے۔

آخر میں، براہ کرم `assert` کے بجائے `require` کا **استعمال نہ کریں**، کیونکہ Echidna اس کا پتہ لگانے کے قابل نہیں ہوگا (لیکن کانٹریکٹ بہرحال ریورٹ ہو جائے گا)۔

### خلاصہ: اسیرشن چیکنگ {#summary-assertion-checking}

درج ذیل ہماری مثال پر echidna کے چلنے کا خلاصہ کرتا ہے:

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

Echidna نے پایا کہ `inc` میں اسیرشن ناکام ہو سکتا ہے اگر اس فنکشن کو بڑے آرگومنٹس کے ساتھ کئی بار کال کیا جائے۔

## Echidna کارپس کو جمع کرنا اور اس میں ترمیم کرنا {#collecting-and-modifying-an-echidna-corpus}

ہم دیکھیں گے کہ Echidna کے ساتھ ٹرانزیکشنز کا کارپس (corpus) کیسے جمع کیا جائے اور استعمال کیا جائے۔ ہدف درج ذیل اسمارٹ کانٹریکٹ [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) ہے:

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

یہ چھوٹی سی مثال Echidna کو اسٹیٹ ویری ایبل کو تبدیل کرنے کے لیے کچھ اقدار تلاش کرنے پر مجبور کرتی ہے۔ یہ ایک فزر کے لیے مشکل ہے
(یہ تجویز کیا جاتا ہے کہ [Manticore](https://github.com/trailofbits/manticore) جیسا علامتی عمل درآمد ٹول استعمال کریں)۔
ہم اس کی تصدیق کے لیے Echidna چلا سکتے ہیں:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

تاہم، ہم اب بھی اس فزنگ مہم کو چلاتے وقت کارپس جمع کرنے کے لیے Echidna کا استعمال کر سکتے ہیں۔

### کارپس جمع کرنا {#collecting-a-corpus}

کارپس جمع کرنے کو فعال کرنے کے لیے، ایک کارپس ڈائرکٹری بنائیں:

```bash
mkdir corpus-magic
```

اور ایک [Echidna کنفیگریشن فائل](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

اب ہم اپنا ٹول چلا سکتے ہیں اور جمع کیے گئے کارپس کو چیک کر سکتے ہیں:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna اب بھی صحیح جادوئی اقدار (magic values) تلاش نہیں کر سکتا، لیکن ہم اس کے جمع کردہ کارپس پر ایک نظر ڈال سکتے ہیں۔
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

### کارپس کو سیڈ کرنا {#seeding-a-corpus}

Echidna کو `magic` فنکشن سے نمٹنے کے لیے کچھ مدد کی ضرورت ہے۔ ہم اس کے لیے مناسب پیرامیٹرز استعمال کرنے کے لیے ان پٹ کو کاپی اور تبدیل کرنے جا رہے ہیں:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

ہم `magic(42,129,333,0)` کو کال کرنے کے لیے `new.txt` میں ترمیم کریں گے۔ اب، ہم Echidna کو دوبارہ چلا سکتے ہیں:

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

اس بار، اس نے پایا کہ پراپرٹی کی فوری طور پر خلاف ورزی ہوئی ہے۔

## زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کرنا {#finding-transactions-with-high-gas-consumption}

ہم دیکھیں گے کہ Echidna کے ساتھ زیادہ گیس کی کھپت والی ٹرانزیکشنز کیسے تلاش کی جائیں۔ ہدف درج ذیل اسمارٹ کانٹریکٹ ہے:

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

فی الحال، Echidna کو ٹیسٹ کرنے کے لیے ہمیشہ ایک پراپرٹی کی ضرورت ہوتی ہے: یہاں `echidna_test` ہمیشہ `true` واپس کرتا ہے۔
ہم اس کی تصدیق کے لیے Echidna چلا سکتے ہیں:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### گیس کی کھپت کی پیمائش {#measuring-gas-consumption}

Echidna کے ساتھ گیس کی کھپت کو فعال کرنے کے لیے، ایک کنفیگریشن فائل `config.yaml` بنائیں:

```yaml
estimateGas: true
```

اس مثال میں، ہم نتائج کو سمجھنے میں آسان بنانے کے لیے ٹرانزیکشن کی ترتیب کا سائز بھی کم کریں گے:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna چلائیں {#run-echidna-3}

ایک بار جب ہم کنفیگریشن فائل بنا لیتے ہیں، تو ہم Echidna کو اس طرح چلا سکتے ہیں:

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

- دکھائی گئی گیس ایک تخمینہ ہے جو [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) کے ذریعہ فراہم کیا گیا ہے۔

### گیس کم کرنے والی کالز کو فلٹر کرنا {#filtering-out-gas-reducing-calls}

اوپر **فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو فلٹر کرنے** کا ٹیوٹوریل دکھاتا ہے کہ آپ کی ٹیسٹنگ سے کچھ فنکشنز کو کیسے ہٹایا جائے۔  
گیس کا درست تخمینہ حاصل کرنے کے لیے یہ اہم ہو سکتا ہے۔
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

اگر Echidna تمام فنکشنز کو کال کر سکتا ہے، تو اسے زیادہ گیس کی لاگت والی ٹرانزیکشنز آسانی سے نہیں ملیں گی:

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

Echidna `estimateGas` کنفیگریشن آپشن کا استعمال کرتے ہوئے زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کر سکتا ہے:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

فزنگ مہم ختم ہونے کے بعد، Echidna ہر فنکشن کے لیے زیادہ سے زیادہ گیس کی کھپت کے ساتھ ایک ترتیب کی اطلاع دے گا۔