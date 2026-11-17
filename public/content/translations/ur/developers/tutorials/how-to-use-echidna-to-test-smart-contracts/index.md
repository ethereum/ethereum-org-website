---
title: "سمارٹ کنٹریکٹس کو ٹیسٹ کرنے کے لیے ایکڈنا کا استعمال کیسے کریں"
description: "سمارٹ کنٹریکٹس کو خودکار طور پر ٹیسٹ کرنے کے لیے ایکڈنا کا استعمال کیسے کریں"
author: "Trailofbits"
lang: ur
tags: ["Solidity", "سمارٹ کنٹریکٹس", "سیکیورٹی", "ٹیسٹنگ", "فزنگ"]
skill: advanced
breadcrumb: "ایکڈنا"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## انسٹالیشن {#installation}

ایکڈنا کو Docker، <span dir="ltr">Homebrew</span> یا پہلے سے مرتب شدہ بائنری کا استعمال کرتے ہوئے انسٹال کیا جا سکتا ہے۔ اس ٹیوٹوریل کی مثالوں کو <span dir="ltr">Echidna 2.3.3</span> اور <span dir="ltr">solc 0.8.37</span> کے ساتھ ٹیسٹ کیا گیا تھا۔

### Docker کے ذریعے ایکڈنا {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_آخری کمانڈ ایکڈنا امیج کو ایک Docker میں چلاتی ہے جسے آپ کی موجودہ ڈائرکٹری تک رسائی حاصل ہے۔ آپ اپنے ہوسٹ سے فائلوں کو تبدیل کر سکتے ہیں، اور Docker سے فائلوں پر ٹولز چلا سکتے ہیں۔ یہ امیج [سلدر](https://github.com/crytic/slither)، [crytic-compile](https://github.com/crytic/crytic-compile) اور [solc-select](https://github.com/crytic/solc-select) کے ساتھ بھی آتی ہے۔_

Docker کے اندر، چلائیں:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### بائنری {#binary}

اپنے پلیٹ فارم کے لیے تازہ ترین ریلیز [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) سے ڈاؤن لوڈ کریں۔ macOS یا Linux پر آپ `brew install echidna` بھی چلا سکتے ہیں، جو اس کے ساتھ سلدر اور crytic-compile کو انسٹال کرتا ہے۔

ریلیز بائنری استعمال کرتے وقت، [سلدر](https://github.com/crytic/slither) اور [solc-select](https://github.com/crytic/solc-select) کو خود انسٹال کریں (مثال کے طور پر ایک Python ورچوئل انوائرنمنٹ میں `pip3 install slither-analyzer solc-select`) اور ایک کمپائلر ورژن منتخب کریں:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

ایکڈنا سلدر کے بغیر چلتا ہے، لیکن سلدر مستقلات (constants) نکالتا ہے جیسے کہ `require` اسٹیٹمنٹس میں استعمال ہونے والے میجک نمبرز، اور ذیل میں دی گئی کئی مثالیں تیزی سے بگز تلاش کرنے کے لیے اس پر انحصار کرتی ہیں۔

## پراپرٹی پر مبنی فزنگ کا تعارف {#introduction-to-property-based-fuzzing}

ایکڈنا ایک پراپرٹی پر مبنی فزر ہے، جسے ہم نے اپنی پچھلی بلاگ پوسٹس ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/)، [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/)، [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)) میں بیان کیا ہے۔

### فزنگ {#fuzzing}

[فزنگ](https://wikipedia.org/wiki/Fuzzing) سیکیورٹی کمیونٹی میں ایک مشہور تکنیک ہے۔ یہ پروگرام میں بگز تلاش کرنے کے لیے کم و بیش بے ترتیب ان پٹس تیار کرنے پر مشتمل ہے۔ روایتی سافٹ ویئر کے لیے فزرز (جیسے [AFL](http://lcamtuf.coredump.cx/afl/) یا [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) بگز تلاش کرنے کے لیے موثر ٹولز کے طور پر جانے جاتے ہیں۔

ان پٹس کی خالصتاً بے ترتیب جنریشن کے علاوہ، اچھے ان پٹس تیار کرنے کے لیے بہت سی تکنیکیں اور حکمت عملیاں ہیں، جن میں شامل ہیں:

- ہر ایگزیکیوشن سے فیڈ بیک حاصل کریں اور اس کا استعمال کرتے ہوئے جنریشن کی رہنمائی کریں۔ مثال کے طور پر، اگر ایک نیا تیار کردہ ان پٹ کسی نئے راستے کی دریافت کا باعث بنتا ہے، تو اس کے قریب نئے ان پٹس تیار کرنا سمجھ میں آ سکتا ہے۔
- ساختی پابندی (structural constraint) کا احترام کرتے ہوئے ان پٹ تیار کرنا۔ مثال کے طور پر، اگر آپ کے ان پٹ میں چیک سم (checksum) کے ساتھ ایک ہیڈر شامل ہے، تو فزر کو چیک سم کی توثیق کرنے والا ان پٹ تیار کرنے دینا مناسب ہوگا۔
- نئے ان پٹس تیار کرنے کے لیے معلوم ان پٹس کا استعمال: اگر آپ کو درست ان پٹ کے ایک بڑے ڈیٹاسیٹ تک رسائی حاصل ہے، تو آپ کا فزر شروع سے جنریشن شروع کرنے کے بجائے ان سے نئے ان پٹس تیار کر سکتا ہے۔ انہیں عام طور پر _سیڈز (seeds)_ کہا جاتا ہے۔

### پراپرٹی پر مبنی فزنگ {#property-based-fuzzing}

ایکڈنا فزر کے ایک مخصوص خاندان سے تعلق رکھتا ہے: پراپرٹی پر مبنی فزنگ جو [QuickCheck](https://wikipedia.org/wiki/QuickCheck) سے بہت زیادہ متاثر ہے۔ کلاسک فزر کے برعکس جو کریشز تلاش کرنے کی کوشش کرے گا، ایکڈنا صارف کے متعین کردہ انویرینٹس (invariants) کو توڑنے کی کوشش کرے گا۔

سمارٹ کنٹریکٹس میں، انویرینٹس Solidity فنکشنز ہوتے ہیں، جو کسی بھی غلط یا نامانوس حالت کی نمائندگی کر سکتے ہیں جہاں کنٹریکٹ پہنچ سکتا ہے، بشمول:

- غلط ایکسیس کنٹرول: حملہ آور کنٹریکٹ کا مالک بن گیا۔
- غلط حالت کی مشین (state machine): کنٹریکٹ کے موقوف (paused) ہونے کے دوران ٹوکنز منتقل کیے جا سکتے ہیں۔
- غلط حساب کتاب: صارف اپنے بیلنس کو انڈر فلو (underflow) کر سکتا ہے اور لامحدود مفت ٹوکنز حاصل کر سکتا ہے۔

### ایکڈنا کے ساتھ پراپرٹی کی ٹیسٹنگ {#testing-a-property-with-echidna}

ہم دیکھیں گے کہ ایکڈنا کے ساتھ سمارٹ کنٹریکٹ کو کیسے ٹیسٹ کیا جائے۔ ہدف درج ذیل سمارٹ کنٹریکٹ [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) ہے:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

ہم یہ فرض کریں گے کہ اس ٹوکن میں درج ذیل خصوصیات ہونی چاہئیں:

- کسی کے پاس بھی زیادہ سے زیادہ 1000 ٹوکنز ہو سکتے ہیں
- ٹوکن منتقل نہیں کیا جا سکتا (یہ <span dir="ltr">ERC-20</span> ٹوکن نہیں ہے)

### ایک پراپرٹی لکھیں {#write-a-property}

ایکڈنا کی پراپرٹیز Solidity فنکشنز ہیں۔ ایک پراپرٹی کو لازمی طور پر:

- کوئی آرگومنٹ نہیں ہونا چاہیے
- اگر یہ کامیاب ہو تو `true` واپس کرنا چاہیے
- اس کا نام `echidna` سے شروع ہونا چاہیے

ایکڈنا کرے گا:

- پراپرٹی کو ٹیسٹ کرنے کے لیے خود بخود صوابدیدی (arbitrary) ٹرانزیکشنز تیار کرے گا۔
- کسی بھی ایسی ٹرانزیکشنز کی اطلاع دے گا جو پراپرٹی کو `false` واپس کرنے یا ایرر دینے کا سبب بنیں۔
- پراپرٹی کو کال کرتے وقت سائیڈ ایفیکٹ کو ضائع کر دے گا (یعنی، اگر پراپرٹی کسی حالت کے متغیر (state variable) کو تبدیل کرتی ہے، تو اسے ٹیسٹ کے بعد ضائع کر دیا جاتا ہے)

درج ذیل پراپرٹی چیک کرتی ہے کہ کال کرنے والے کے پاس 1000 سے زیادہ ٹوکنز نہیں ہیں:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

اپنے کنٹریکٹ کو اپنی پراپرٹیز سے الگ کرنے کے لیے وراثت (inheritance) کا استعمال کریں:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) پراپرٹی کو نافذ کرتا ہے اور ٹوکن سے وراثت حاصل کرتا ہے۔

### کنٹریکٹ شروع کریں {#initiate-a-contract}

ایکڈنا کو بغیر آرگومنٹ کے ایک [کنسٹرکٹر](/developers/docs/smart-contracts/anatomy/#constructor-functions) کی ضرورت ہوتی ہے۔ اگر آپ کے کنٹریکٹ کو کسی مخصوص ابتدا (initialization) کی ضرورت ہے، تو آپ کو اسے کنسٹرکٹر میں کرنے کی ضرورت ہے۔

ایکڈنا میں کچھ مخصوص ایڈریسز ہیں:

- `0x30000` جو کنسٹرکٹر کو کال کرتا ہے۔
- `0x10000`، `0x20000`، اور `0x30000` جو تصادفی طور پر دوسرے فنکشنز کو کال کرتے ہیں۔
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` جہاں زیر ٹیسٹ کنٹریکٹ ڈیپلائے کیا جاتا ہے۔

ہمیں اپنی موجودہ مثال میں کسی خاص ابتدا کی ضرورت نہیں ہے، جس کے نتیجے میں ہمارا کنسٹرکٹر خالی ہے۔

### ایکڈنا چلائیں {#run-echidna}

ایکڈنا کو اس کے ساتھ لانچ کیا جاتا ہے:

```sh
echidna contract.sol
```

اگر contract.sol میں متعدد کنٹریکٹس شامل ہیں، تو آپ ہدف کی وضاحت کر سکتے ہیں:

```sh
echidna contract.sol --contract MyContract
```

جب ٹرمینل میں چلایا جاتا ہے، تو ایکڈنا ایک انٹرایکٹو UI دکھاتا ہے۔ ذیل کی مثالوں کی طرح سادہ ٹیکسٹ آؤٹ پٹ حاصل کرنے کے لیے `--format text` شامل کریں۔

### خلاصہ: پراپرٹی کی ٹیسٹنگ {#summary-testing-a-property}

درج ذیل ہماری مثال پر ایکڈنا کے چلنے کا خلاصہ پیش کرتا ہے:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

ایکڈنا نے پایا کہ اگر `backdoor` کو کال کیا جائے تو پراپرٹی کی خلاف ورزی ہوتی ہے۔

## فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو فلٹر کرنا {#filtering-functions-to-call-during-a-fuzzing-campaign}

ہم دیکھیں گے کہ فز کیے جانے والے فنکشنز کو کیسے فلٹر کیا جائے۔
ہدف درج ذیل سمارٹ کنٹریکٹ ہے:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

یہ چھوٹی سی مثال ایکڈنا کو حالت کے متغیر کو تبدیل کرنے کے لیے ٹرانزیکشنز کی ایک خاص ترتیب تلاش کرنے پر مجبور کرتی ہے۔
یہ ایک فزر کے لیے مشکل ہے۔
ہم اس کی تصدیق کے لیے ایکڈنا چلا سکتے ہیں:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### فنکشنز کو فلٹر کرنا {#filtering-functions}

ایکڈنا کو اس کنٹریکٹ کو ٹیسٹ کرنے کے لیے صحیح ترتیب تلاش کرنے میں دشواری ہوتی ہے کیونکہ دو ری سیٹ فنکشنز (`reset1` اور `reset2`) تمام حالت کے متغیرات کو `false` پر سیٹ کر دیں گے۔
تاہم، ہم ری سیٹ فنکشن کو بلیک لسٹ کرنے یا صرف `f`، `g`،
`h` اور `i` فنکشنز کو وائٹ لسٹ کرنے کے لیے ایکڈنا کی ایک خاص خصوصیت استعمال کر سکتے ہیں۔

فنکشنز کو بلیک لسٹ کرنے کے لیے، ہم یہ کنفیگریشن فائل استعمال کر سکتے ہیں:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

فنکشنز کو فلٹر کرنے کا ایک اور طریقہ وائٹ لسٹ شدہ فنکشنز کی فہرست بنانا ہے۔ ایسا کرنے کے لیے، ہم یہ کنفیگریشن فائل استعمال کر سکتے ہیں:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` پہلے سے طے شدہ طور پر `true` ہے۔
- فلٹرنگ مکمل فنکشن کے نام پر کی جاتی ہے: کنٹریکٹ کا نام، ایک `.`، اور ایپلیکیشن بائنری انٹرفیس (اے بی آئی) دستخط (مثال کے طور پر `C.f(uint256)`)۔ اگر آپ کے پاس `f()` اور `f(uint256)` ہیں، تو آپ بالکل منتخب کر سکتے ہیں کہ کس کو فلٹر کرنا ہے۔ ایک سادہ نام جیسے `"reset1"` کسی چیز سے میل نہیں کھاتا۔

### ایکڈنا چلائیں {#run-echidna-1}

کنفیگریشن فائل `blacklist.yaml` کے ساتھ ایکڈنا چلانے کے لیے:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

ایکڈنا پراپرٹی کو غلط ثابت کرنے کے لیے ٹرانزیکشنز کی ترتیب تقریباً فوراً تلاش کر لے گا۔

### خلاصہ: فنکشنز کو فلٹر کرنا {#summary-filtering-functions}

ایکڈنا فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو بلیک لسٹ یا وائٹ لسٹ کر سکتا ہے، اس کا استعمال کرتے ہوئے:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

ایکڈنا `filterBlacklist` بولین (boolean) کی قدر کے مطابق، یا تو `C.f1()`، `C.f2()` اور `C.f3()` کو بلیک لسٹ کر کے یا صرف انہیں کال کر کے فزنگ مہم شروع کرتا ہے۔

## Solidity کے تصدیق کرنے کے عمل کو ایکڈنا کے ساتھ کیسے ٹیسٹ کریں {#how-to-test-soliditys-assert-with-echidna}

اس مختصر ٹیوٹوریل میں، ہم یہ دکھانے جا رہے ہیں کہ کنٹریکٹس میں تصدیق کی جانچ پڑتال (assertion checking) کے لیے ایکڈنا کا استعمال کیسے کیا جائے۔ فرض کریں کہ ہمارے پاس اس طرح کا ایک کنٹریکٹ ہے:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

<span dir="ltr">Solidity 0.8</span> کے بعد سے، ریاضیاتی اوور فلو پہلے سے طے شدہ طور پر ریورٹ ہو جاتے ہیں۔ `unchecked` بلاک ریپنگ (wrapping) کے رویے کو بحال کرتا ہے تاکہ `counter` اوور فلو ہو سکے، جو کہ وہ بگ ہے جسے ہم چاہتے ہیں کہ ایکڈنا تلاش کرے۔

### ایک تصدیق لکھیں {#write-an-assertion}

ہم یہ یقینی بنانا چاہتے ہیں کہ اس کا فرق واپس کرنے کے بعد `tmp`، `counter` سے کم یا اس کے برابر ہو۔ ہم ایکڈنا کی پراپرٹی لکھ سکتے ہیں، لیکن ہمیں `tmp` کی قدر کو کہیں اسٹور کرنے کی ضرورت ہوگی۔ اس کے بجائے، ہم اس طرح کی ایک تصدیق استعمال کر سکتے ہیں:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### ایکڈنا چلائیں {#run-echidna-2}

تصدیق کی ناکامی کی ٹیسٹنگ کو فعال کرنے کے لیے، کمانڈ لائن پر `--test-mode assertion` پاس کریں، یا ایک [ایکڈنا کنفیگریشن فائل](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` بنائیں:

```yaml
testMode: assertion
```

جب ہم اس کنٹریکٹ کو ایکڈنا میں چلاتے ہیں، تو ہمیں متوقع نتائج حاصل ہوتے ہیں:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

جیسا کہ آپ دیکھ سکتے ہیں، ایکڈنا `inc` فنکشن میں کچھ تصدیق کی ناکامی کی اطلاع دیتا ہے۔ فی فنکشن ایک سے زیادہ تصدیق شامل کرنا ممکن ہے، لیکن ایکڈنا یہ نہیں بتا سکتا کہ کون سی تصدیق ناکام ہوئی۔

### تصدیقات (assertions) کب اور کیسے استعمال کریں {#when-and-how-use-assertions}

تصدیقات کو واضح پراپرٹیز کے متبادل کے طور پر استعمال کیا جا سکتا ہے، خاص طور پر اگر چیک کی جانے والی شرائط کا براہ راست تعلق کسی آپریشن `f` کے درست استعمال سے ہو۔ کچھ کوڈ کے بعد تصدیقات شامل کرنے سے یہ نافذ ہو جائے گا کہ چیک اس کے ایگزیکیوٹ ہونے کے فوراً بعد ہوگا:

```solidity
function f(..) public {
    // کچھ پیچیدہ کوڈ
    ...
    assert (condition);
    ...
}

```

اس کے برعکس، ایک واضح ایکڈنا پراپرٹی کا استعمال تصادفی طور پر ٹرانزیکشنز کو ایگزیکیوٹ کرے گا اور یہ نافذ کرنے کا کوئی آسان طریقہ نہیں ہے کہ اسے بالکل کب چیک کیا جائے گا۔ یہ ورک اراؤنڈ (workaround) کرنا اب بھی ممکن ہے:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

تاہم، کچھ مسائل ہیں:

- یہ ناکام ہو جاتا ہے اگر `f` کو `internal` یا `external` کے طور پر ڈکلیئر کیا گیا ہو۔
- یہ واضح نہیں ہے کہ `f` کو کال کرنے کے لیے کون سے آرگومنٹس استعمال کیے جانے چاہئیں۔
- اگر `f` ریورٹ ہوتا ہے، تو پراپرٹی ناکام ہو جائے گی۔

عام طور پر، ہم تصدیقات کو استعمال کرنے کے طریقے پر [John Regehr کی سفارش](https://blog.regehr.org/archives/1091) پر عمل کرنے کی تجویز کرتے ہیں:

- تصدیق کی جانچ پڑتال کے دوران کسی بھی سائیڈ ایفیکٹ پر مجبور نہ کریں۔ مثال کے طور پر: `assert(ChangeStateAndReturn() == 1)`
- واضح بیانات کی تصدیق نہ کریں۔ مثال کے طور پر `assert(var >= 0)` جہاں `var` کو `uint` کے طور پر ڈکلیئر کیا گیا ہے۔

آخر میں، براہ کرم `assert` کے بجائے `require` **استعمال نہ کریں**، کیونکہ ایکڈنا اس کا پتہ لگانے کے قابل نہیں ہوگا (لیکن کنٹریکٹ بہرحال ریورٹ ہو جائے گا)۔

### خلاصہ: تصدیق کی جانچ پڑتال {#summary-assertion-checking}

درج ذیل ہماری مثال پر ایکڈنا کے چلنے کا خلاصہ پیش کرتا ہے:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

ایکڈنا نے پایا کہ `inc` میں تصدیق ناکام ہو سکتی ہے اگر اس فنکشن کو بڑے آرگومنٹس کے ساتھ متعدد بار کال کیا جائے۔

## ایکڈنا کارپس (corpus) کو جمع کرنا اور اس میں ترمیم کرنا {#collecting-and-modifying-an-echidna-corpus}

ہم دیکھیں گے کہ ایکڈنا کے ساتھ ٹرانزیکشنز کا کارپس کیسے جمع کیا جائے اور استعمال کیا جائے۔ ہدف درج ذیل سمارٹ کنٹریکٹ [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) ہے:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

یہ چھوٹی سی مثال ایکڈنا کو حالت کے متغیر کو تبدیل کرنے کے لیے کچھ مخصوص اقدار تلاش کرنے پر مجبور کرتی ہے۔ یہ ایک فزر کے لیے مشکل ہے۔
ہم اس کی تصدیق کے لیے ایکڈنا چلا سکتے ہیں:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

تاہم، ہم اس فزنگ مہم کو چلاتے وقت کارپس جمع کرنے کے لیے اب بھی ایکڈنا کا استعمال کر سکتے ہیں۔

### کارپس جمع کرنا {#collecting-a-corpus}

کارپس جمع کرنے کو فعال کرنے کے لیے، ایک کارپس ڈائرکٹری بنائیں:

```sh
mkdir corpus-magic
```

اور ایک [ایکڈنا کنفیگریشن فائل](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

اب ہم اپنا ٹول چلا سکتے ہیں اور جمع کیے گئے کارپس کو چیک کر سکتے ہیں:

```sh
echidna magic.sol --config config.yaml
```

ایکڈنا اب بھی درست میجک اقدار تلاش نہیں کر سکتا۔ یہ دیکھنے کے لیے کہ یہ کہاں پھنستا ہے، `corpus-magic/covered.*.txt` کوریج رپورٹ دیکھیں:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` لیبل کا مطلب ہے کہ ایکڈنا اس لائن تک پہنچ گیا لیکن ایگزیکیوشن وہاں ریورٹ ہو گئی، اور آخری `require` کے بعد کی لائنیں کبھی ایگزیکیوٹ نہیں ہوتیں۔

ایکڈنا کی جمع کردہ ٹرانزیکشنز کی ترتیب `corpus-magic/coverage/` میں JSON فائلوں کے طور پر محفوظ کی جاتی ہے۔ مثال کے طور پر، ان فائلوں میں سے ایک کی پہلی ٹرانزیکشن یہ تھی:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

واضح طور پر، یہ ان پٹ ہماری پراپرٹی میں ناکامی کو متحرک نہیں کرے گا۔ تاہم، اگلے مرحلے میں، ہم دیکھیں گے کہ اس کے لیے اس میں کیسے ترمیم کی جائے۔

### کارپس کو سیڈ (seed) کرنا {#seeding-a-corpus}

ایکڈنا کو `magic` فنکشن سے نمٹنے کے لیے کچھ مدد کی ضرورت ہے۔ ہم اس کے لیے مناسب پیرامیٹرز استعمال کرنے کے لیے ان پٹ کو کاپی اور اس میں ترمیم کرنے جا رہے ہیں (فائل کے نام بے ترتیب ہیں، لہذا اپنی `corpus-magic/coverage/` ڈائرکٹری سے ایک استعمال کریں):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

ہم `new.txt` میں ترمیم کریں گے تاکہ اس میں `magic(42,129,333,0)` کو کال کرنے والی ایک ہی ٹرانزیکشن شامل ہو۔ اب، ہم ایکڈنا کو دوبارہ چلا سکتے ہیں:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

اس بار، اس نے پایا کہ پراپرٹی کی فوری طور پر خلاف ورزی کی گئی ہے۔

## زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کرنا {#finding-transactions-with-high-gas-consumption}

ہم دیکھیں گے کہ ایکڈنا کے ساتھ زیادہ گیس کی کھپت والی ٹرانزیکشنز کیسے تلاش کی جائیں۔ ایکڈنا کے پرانے ورژنز میں اس کے لیے ایک `estimateGas` آپشن تھا؛ اسے <span dir="ltr">Echidna 2.3.0</span> میں ہٹا دیا گیا تھا۔ اس کے بجائے، ہم `gasleft()` کے ساتھ گیس کی پیمائش کرتے ہیں اور ایکڈنا کے [آپٹیمائزیشن موڈ](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) کو اسے زیادہ سے زیادہ کرنے دیتے ہیں۔ ہدف درج ذیل سمارٹ کنٹریکٹ ہے:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

یہاں `expensive` میں گیس کی بڑی کھپت ہو سکتی ہے۔

### گیس کی کھپت کی پیمائش {#measuring-gas-consumption}

آپٹیمائزیشن موڈ میں، ایکڈنا `echidna_` سے شروع ہونے والے فنکشنز تلاش کرتا ہے جو کوئی آرگومنٹ نہیں لیتے اور ایک `int256` واپس کرتے ہیں، اور ٹرانزیکشنز کی وہ ترتیب تلاش کرنے کی کوشش کرتا ہے جو واپس کی گئی قدر کو زیادہ سے زیادہ کرے۔ ہم ایک ٹیسٹ کنٹریکٹ شامل کرتے ہیں جو `f` کو کال کرتا ہے، اس کے استعمال کردہ گیس کو ریکارڈ کرتا ہے، اور زیادہ سے زیادہ کو ظاہر کرتا ہے (دونوں کنٹریکٹس کو `gas.sol` میں محفوظ کریں):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

آپٹیمائزیشن موڈ کو فعال کرنے کے لیے، ایک کنفیگریشن فائل `config.yaml` بنائیں۔ اس مثال میں، ہم نتائج کو سمجھنے میں آسان بنانے کے لیے ٹرانزیکشن کی ترتیب کے سائز کو بھی کم کریں گے:

```yaml
testMode: optimization
seqLen: 2
```

### ایکڈنا چلائیں {#run-echidna-3}

ایک بار جب ہم کنفیگریشن فائل بنا لیتے ہیں، تو ہم ایکڈنا کو اس طرح چلا سکتے ہیں:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- دکھائی گئی گیس کی پیمائش ایتھیریم ورچوئل مشین (EVM) کے نفاذ سے کی جاتی ہے جس پر ایکڈنا چلتا ہے، [hevm](https://github.com/argotorg/hevm)، اور اس میں `measureF` سے اندرونی کال کا اوور ہیڈ شامل ہے۔
- زیادہ سے زیادہ منفرد نہیں ہے: ہر مہم بے ترتیب ہوتی ہے، اور طویل مہمات (مثال کے طور پر `--test-limit 200000`) بڑی اقدار تلاش کرنے کا رجحان رکھتی ہیں۔

### گیس کم کرنے والی کالز کو فلٹر کرنا {#filtering-out-gas-reducing-calls}

اوپر **فزنگ مہم کے دوران کال کرنے کے لیے فنکشنز کو فلٹر کرنے** کا ٹیوٹوریل دکھاتا ہے کہ آپ کی ٹیسٹنگ سے کچھ فنکشنز کو کیسے ہٹایا جائے۔  
گیس کا درست تخمینہ حاصل کرنے کے لیے یہ اہم ہو سکتا ہے۔
درج ذیل مثال پر غور کریں:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check`، `check` کو کال کرتا ہے اور اس کی گیس کی لاگت واپس کرتا ہے۔ ایکڈنا کے ہر ٹیسٹ فنکشن کی طرح، اس کی حالت کی تبدیلیاں بعد میں ضائع کر دی جاتی ہیں۔

اگر ایکڈنا تمام فنکشنز کو کال کر سکتا ہے، تو اسے زیادہ گیس کی لاگت والی ٹرانزیکشنز آسانی سے نہیں ملیں گی:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

اس کی وجہ یہ ہے کہ لاگت کا انحصار `addrs` کے سائز پر ہے اور بے ترتیب کالز ارے (array) کو تقریباً خالی چھوڑ دیتی ہیں۔
تاہم، `pop` اور `clear` کو بلیک لسٹ کرنے سے ہمیں بہت بہتر نتائج ملتے ہیں:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

اس نتیجے کے لیے کال کی ترتیب کو سکیڑنے (shrinking) میں کئی منٹ لگتے ہیں، کیونکہ ہر ری پلے مہنگے `check` فنکشن کو کال کرتا ہے۔

### خلاصہ: زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کرنا {#summary-finding-transactions-with-high-gas-consumption}

ایکڈنا ایک `echidna_` فنکشن میں `gasleft()` کے ساتھ گیس کی پیمائش کر کے زیادہ گیس کی کھپت والی ٹرانزیکشنز تلاش کر سکتا ہے جو ایک `int256` واپس کرتا ہے، اور آپٹیمائزیشن موڈ میں چلتا ہے:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

ایک بار جب فزنگ مہم ختم ہو جائے گی، تو ایکڈنا پائی جانے والی زیادہ سے زیادہ قدر اور اسے پیدا کرنے والی ٹرانزیکشنز کی ترتیب کی اطلاع دے گا۔
