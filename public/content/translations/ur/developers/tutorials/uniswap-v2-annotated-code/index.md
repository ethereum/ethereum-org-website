---
title: "⁦Uniswap-v2⁩ کنٹریکٹ کا تفصیلی جائزہ"
description: "⁦Uniswap-v2⁩ کنٹریکٹ کیسے کام کرتا ہے؟ اسے اس طرح کیوں لکھا گیا ہے؟"
author: "اوری پومرانٹز"
tags:
  - solidity
  - dapps
skill: intermediate
breadcrumb: "⁦Uniswap v2⁩ کا تفصیلی جائزہ"
published: 2021-05-01
lang: ur
---
## تعارف {#introduction}

[یونی سویپ <span dir="ltr">v2</span>](https://app.uniswap.org/whitepaper.pdf) کسی بھی دو <span dir="ltr">ERC-20</span> ٹوکنز کے درمیان تبادلے کی مارکیٹ بنا سکتا ہے۔ اس مضمون میں ہم ان کنٹریکٹس کے سورس کوڈ کا جائزہ لیں گے جو اس پروٹوکول کو نافذ کرتے ہیں اور دیکھیں گے کہ انہیں اس طرح کیوں لکھا گیا ہے۔

### یونی سویپ کیا کرتا ہے؟ {#what-does-uniswap-do}

بنیادی طور پر، صارفین کی دو اقسام ہیں: لیکویڈیٹی فراہم کنندگان اور ٹریڈرز۔

_لیکویڈیٹی فراہم کنندگان_ پول کو دو ٹوکنز فراہم کرتے ہیں جن کا تبادلہ کیا جا سکتا ہے (ہم انہیں **<span dir="ltr">Token0</span>** اور **<span dir="ltr">Token1</span>** کہیں گے)۔ اس کے بدلے میں، انہیں ایک تیسرا ٹوکن ملتا ہے جو پول کی جزوی ملکیت کی نمائندگی کرتا ہے جسے _سیالیت کا ٹوکن_ کہا جاتا ہے۔

_ٹریڈرز_ پول میں ایک قسم کا ٹوکن بھیجتے ہیں اور لیکویڈیٹی فراہم کنندگان کے فراہم کردہ پول سے دوسرا ٹوکن وصول کرتے ہیں (مثال کے طور پر، **<span dir="ltr">Token0</span>** بھیجیں اور **<span dir="ltr">Token1</span>** وصول کریں)۔ شرح مبادلہ کا تعین پول میں موجود **<span dir="ltr">Token0</span>** اور **<span dir="ltr">Token1</span>** کی متعلقہ تعداد سے ہوتا ہے۔ اس کے علاوہ، پول سیالیت کے پول کے لیے انعام کے طور پر ایک چھوٹا سا فیصد لیتا ہے۔

جب لیکویڈیٹی فراہم کنندگان اپنے اثاثے واپس لینا چاہتے ہیں تو وہ پول ٹوکنز کو جلا سکتے ہیں اور انعامات میں اپنے حصے سمیت اپنے ٹوکنز واپس حاصل کر سکتے ہیں۔

[مزید تفصیلی وضاحت کے لیے یہاں کلک کریں](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)۔

### <span dir="ltr">v2</span> کیوں؟ <span dir="ltr">v3</span> کیوں نہیں؟ {#why-v2}

[یونی سویپ <span dir="ltr">v3</span>](https://app.uniswap.org/whitepaper-v3.pdf) ایک اپ گریڈ ہے جو <span dir="ltr">v2</span> کی نسبت بہت زیادہ پیچیدہ ہے۔ پہلے <span dir="ltr">v2</span> سیکھنا اور پھر <span dir="ltr">v3</span> کی طرف جانا زیادہ آسان ہے۔

### کور کنٹریکٹس بمقابلہ پیریفری کنٹریکٹس {#contract-types}

یونی سویپ <span dir="ltr">v2</span> کو دو حصوں میں تقسیم کیا گیا ہے، ایک کور (core) اور ایک پیریفری (periphery)۔ یہ تقسیم کور کنٹریکٹس کو، جو اثاثے رکھتے ہیں اور اس لیے ان کا محفوظ ہونا _لازمی_ ہے، زیادہ سادہ اور آڈٹ کرنے میں آسان بناتی ہے۔ ٹریڈرز کو درکار تمام اضافی فعالیت پھر پیریفری کنٹریکٹس کے ذریعے فراہم کی جا سکتی ہے۔

## ڈیٹا اور کنٹرول کے بہاؤ {#flows}

یہ ڈیٹا اور کنٹرول کا وہ بہاؤ ہے جو اس وقت ہوتا ہے جب آپ یونی سویپ کے تین اہم کام انجام دیتے ہیں:

1. مختلف ٹوکنز کے درمیان تبادلہ
2. مارکیٹ میں سیالیت شامل کریں اور جوڑے کے تبادلے والے <span dir="ltr">ERC-20</span> سیالیت کے ٹوکنز سے انعام حاصل کریں
3. <span dir="ltr">ERC-20</span> سیالیت کے ٹوکنز کو جلائیں اور وہ <span dir="ltr">ERC-20</span> ٹوکنز واپس حاصل کریں جنہیں جوڑے کا تبادلہ ٹریڈرز کو تبدیل کرنے کی اجازت دیتا ہے

### تبادلہ {#swap-flow}

یہ سب سے عام بہاؤ ہے، جسے ٹریڈرز استعمال کرتے ہیں:

#### کالر {#caller}

1. پیریفیری (periphery) اکاؤنٹ کو اس رقم میں الاؤنس فراہم کریں جس کا تبادلہ کیا جانا ہے۔
2. پیریفیری کنٹریکٹ کے بہت سے تبادلے کے فنکشنز میں سے کسی ایک کو کال کریں (کون سا فنکشن کال کرنا ہے اس کا انحصار اس بات پر ہے کہ آیا <span dir="ltr">ETH</span> شامل ہے یا نہیں، آیا ٹریڈر جمع کرانے والے ٹوکنز کی مقدار بتاتا ہے یا واپس ملنے والے ٹوکنز کی مقدار، وغیرہ)۔
   ہر تبادلے کا فنکشن ایک `path` قبول کرتا ہے، جو ان تبادلوں کی ایک ارے (array) ہے جن سے گزرنا ہوتا ہے۔

#### پیریفیری کنٹریکٹ میں (<span dir="ltr">UniswapV2Router02.sol</span>) {#in-the-periphery-contract-uniswapv2router02-sol}

3. ان رقوم کی نشاندہی کریں جن کی راستے میں ہر تبادلے پر ٹریڈنگ کرنے کی ضرورت ہے۔
4. راستے پر اعادہ (iterate) کرتا ہے۔ راستے میں ہر تبادلے کے لیے یہ ان پٹ ٹوکن بھیجتا ہے اور پھر تبادلے کے `swap` فنکشن کو کال کرتا ہے۔
   زیادہ تر معاملات میں ٹوکنز کے لیے منزل کا پتہ راستے میں اگلا جوڑا تبادلہ ہوتا ہے۔ آخری تبادلے میں یہ ٹریڈر کی طرف سے فراہم کردہ پتہ ہوتا ہے۔

#### کور کنٹریکٹ میں (<span dir="ltr">UniswapV2Pair.sol</span>) {#in-the-core-contract-uniswapv2pairsol-2}

5. تصدیق کریں کہ کور کنٹریکٹ کو دھوکہ نہیں دیا جا رہا ہے اور تبادلے کے بعد کافی سیالیت برقرار رکھ سکتا ہے۔
6. دیکھیں کہ معلوم ذخائر کے علاوہ ہمارے پاس کتنے اضافی ٹوکنز ہیں۔ یہ رقم ان پٹ ٹوکنز کی وہ تعداد ہے جو ہمیں تبادلے کے لیے موصول ہوئی ہے۔
7. آؤٹ پٹ ٹوکنز کو منزل پر بھیجیں۔
8. ریزرو رقوم کو اپ ڈیٹ کرنے کے لیے `_update` کو کال کریں

#### واپس پیریفیری کنٹریکٹ میں (<span dir="ltr">UniswapV2Router02.sol</span>) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. کوئی بھی ضروری کلین اپ انجام دیں (مثال کے طور پر، ٹریڈر کو بھیجنے کے لیے <span dir="ltr">ETH</span> واپس حاصل کرنے کی خاطر <span dir="ltr">WETH</span> ٹوکنز کو جلائیں)

### سیالیت شامل کریں {#add-liquidity-flow}

#### کالر {#caller-2}

1. پیریفیری اکاؤنٹ کو ان رقوم میں الاؤنس فراہم کریں جنہیں سیالیت کے پول میں شامل کیا جانا ہے۔
2. پیریفیری کنٹریکٹ کے `addLiquidity` فنکشنز میں سے کسی ایک کو کال کریں۔

#### پیریفیری کنٹریکٹ میں (<span dir="ltr">UniswapV2Router02.sol</span>) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. اگر ضروری ہو تو ایک نیا جوڑا تبادلہ بنائیں
4. اگر پہلے سے کوئی جوڑا تبادلہ موجود ہے، تو شامل کیے جانے والے ٹوکنز کی مقدار کا حساب لگائیں۔ یہ دونوں ٹوکنز کے لیے یکساں قدر ہونی چاہیے، لہذا نئے ٹوکنز کا موجودہ ٹوکنز سے وہی تناسب ہونا چاہیے۔
5. چیک کریں کہ آیا رقوم قابل قبول ہیں (کالرز ایک کم از کم رقم بتا سکتے ہیں جس سے کم پر وہ سیالیت شامل نہیں کرنا چاہیں گے)
6. کور کنٹریکٹ کو کال کریں۔

#### کور کنٹریکٹ میں (<span dir="ltr">UniswapV2Pair.sol</span>) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. سیالیت کے ٹوکنز ڈھالیں اور انہیں کالر کو بھیجیں
8. ریزرو رقوم کو اپ ڈیٹ کرنے کے لیے `_update` کو کال کریں

### سیالیت ہٹائیں {#remove-liquidity-flow}

#### کالر {#caller-3}

1. پیریفیری اکاؤنٹ کو بنیادی ٹوکنز کے بدلے جلائے جانے والے سیالیت کے ٹوکنز کا الاؤنس فراہم کریں۔
2. پیریفیری کنٹریکٹ کے `removeLiquidity` فنکشنز میں سے کسی ایک کو کال کریں۔

#### پیریفیری کنٹریکٹ میں (<span dir="ltr">UniswapV2Router02.sol</span>) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. سیالیت کے ٹوکنز کو جوڑے کے تبادلے میں بھیجیں

#### کور کنٹریکٹ میں (<span dir="ltr">UniswapV2Pair.sol</span>) {#in-the-core-contract-uniswapv2pairsol-3}

4. منزل کے پتے پر جلائے گئے ٹوکنز کے تناسب سے بنیادی ٹوکنز بھیجیں۔ مثال کے طور پر اگر پول میں <span dir="ltr">1000 A</span> ٹوکنز، <span dir="ltr">500 B</span> ٹوکنز، اور <span dir="ltr">90</span> سیالیت کے ٹوکنز ہیں، اور ہمیں جلانے کے لیے <span dir="ltr">9</span> ٹوکنز موصول ہوتے ہیں، تو ہم <span dir="ltr">10%</span> سیالیت کے ٹوکنز جلا رہے ہیں اس لیے ہم صارف کو <span dir="ltr">100 A</span> ٹوکنز اور <span dir="ltr">50 B</span> ٹوکنز واپس بھیجتے ہیں۔
5. سیالیت کے ٹوکنز کو جلائیں
6. ریزرو رقوم کو اپ ڈیٹ کرنے کے لیے `_update` کو کال کریں

```yaml
title: یونی سویپ V2 کے بنیادی کنٹریکٹس
description: یونی سویپ V2 کے اسمارٹ کنٹریکٹس کی گہرائی سے وضاحت
breadcrumb: یونی سویپ V2 کے بنیادی کنٹریکٹس
lang: ur
tags:
  - اسمارٹ کنٹریکٹس
  - یونی سویپ
  - Solidity
author: اوری پومیرانٹز
sidebar: true
```

## بنیادی کنٹریکٹس {#core-contracts}

یہ وہ محفوظ کنٹریکٹس ہیں جو سیالیت کو برقرار رکھتے ہیں۔

### UniswapV2Pair.sol {#uniswapv2pair}

[یہ کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) اس اصل پول کو نافذ کرتا ہے جو ٹوکنز کا تبادلہ کرتا ہے۔ یہ یونی سویپ کی بنیادی فعالیت ہے۔

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

یہ وہ تمام انٹرفیسز ہیں جن کے بارے میں کنٹریکٹ کو جاننے کی ضرورت ہوتی ہے، یا تو اس لیے کہ کنٹریکٹ انہیں نافذ کرتا ہے (`IUniswapV2Pair` اور `UniswapV2ERC20`) یا اس لیے کہ یہ ان کنٹریکٹس کو کال کرتا ہے جو انہیں نافذ کرتے ہیں۔

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

یہ کنٹریکٹ `UniswapV2ERC20` سے وراثت میں ملتا ہے، جو سیالیت کے ٹوکنز کے لیے <span dir="ltr">ERC-20</span> فنکشنز فراہم کرتا ہے۔

```solidity
    using SafeMath  for uint;
```

[SafeMath لائبریری](https://docs.openzeppelin.com/contracts/2.x/api/math) کا استعمال اوور فلوز اور انڈر فلوز سے بچنے کے لیے کیا جاتا ہے۔ یہ اہم ہے کیونکہ بصورت دیگر ہم ایسی صورتحال کا شکار ہو سکتے ہیں جہاں ایک قدر کو `-1` ہونا چاہیے، لیکن اس کے بجائے وہ `2^256-1` ہوتی ہے۔

```solidity
    using UQ112x112 for uint224;
```

پول کنٹریکٹ میں بہت سی کیلکولیشنز کے لیے کسر (fractions) کی ضرورت ہوتی ہے۔ تاہم، EVM کسر کو سپورٹ نہیں کرتا۔
یونی سویپ نے جو حل نکالا وہ <span dir="ltr">224 bit</span> ویلیوز کا استعمال ہے، جس میں <span dir="ltr">112 bits</span> انٹیجر (integer) حصے کے لیے اور <span dir="ltr">112 bits</span> کسر کے لیے ہیں۔ لہذا `1.0` کو `2^112` کے طور پر ظاہر کیا جاتا ہے، `1.5` کو `2^112 + 2^111` کے طور پر ظاہر کیا جاتا ہے، وغیرہ۔

اس لائبریری کے بارے میں مزید تفصیلات [دستاویز میں آگے](#fixedpoint) دستیاب ہیں۔

#### متغیرات (Variables) {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

صفر سے تقسیم کے معاملات سے بچنے کے لیے، سیالیت کے ٹوکنز کی ایک کم از کم تعداد ہمیشہ موجود رہتی ہے (لیکن ان کی ملکیت اکاؤنٹ صفر کے پاس ہوتی ہے)۔ وہ تعداد **MINIMUM_LIQUIDITY** ہے، یعنی ایک ہزار۔

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

یہ <span dir="ltr">ERC-20</span> منتقلی فنکشن کے لیے ABI سلیکٹر ہے۔ اس کا استعمال دو ٹوکن اکاؤنٹس میں <span dir="ltr">ERC-20</span> ٹوکنز کی منتقلی کے لیے کیا جاتا ہے۔

```solidity
    address public factory;
```

یہ وہ فیکٹری کنٹریکٹ ہے جس نے یہ پول بنایا ہے۔ ہر پول دو <span dir="ltr">ERC-20</span> ٹوکنز کے درمیان ایک تبادلہ ہے، فیکٹری ایک مرکزی نقطہ ہے جو ان تمام پولز کو جوڑتا ہے۔

```solidity
    address public token0;
    address public token1;
```

یہاں ان دو اقسام کے <span dir="ltr">ERC-20</span> ٹوکنز کے کنٹریکٹس کے پتے ہیں جن کا اس پول کے ذریعے تبادلہ کیا جا سکتا ہے۔

```solidity
    uint112 private reserve0;           // سنگل سٹوریج سلاٹ استعمال کرتا ہے، getReserves کے ذریعے قابل رسائی ہے
    uint112 private reserve1;           // سنگل سٹوریج سلاٹ استعمال کرتا ہے، getReserves کے ذریعے قابل رسائی ہے
```

ہر ٹوکن کی قسم کے لیے پول کے پاس موجود ذخائر (reserves)۔ ہم فرض کرتے ہیں کہ دونوں ایک ہی قدر کی نمائندگی کرتے ہیں، اور اس لیے ہر token0 کی قیمت reserve1/reserve0 token1 کے برابر ہے۔

```solidity
    uint32  private blockTimestampLast; // سنگل سٹوریج سلاٹ استعمال کرتا ہے، getReserves کے ذریعے قابل رسائی ہے
```

آخری بلاک کا ٹائم اسٹیمپ جس میں تبادلہ ہوا تھا، اس کا استعمال وقت کے ساتھ شرح تبادلہ کو ٹریک کرنے کے لیے کیا جاتا ہے۔

ایتھیریم کنٹریکٹس کے سب سے بڑے گیس اخراجات میں سے ایک اسٹوریج ہے، جو کنٹریکٹ کی ایک کال سے اگلی کال تک برقرار رہتا ہے۔ ہر اسٹوریج سیل <span dir="ltr">256 bits</span> طویل ہوتا ہے۔ لہذا تین متغیرات، `reserve0`، `reserve1`، اور `blockTimestampLast`، کو اس طرح مختص کیا گیا ہے کہ ایک واحد اسٹوریج ویلیو ان تینوں کو شامل کر سکے (<span dir="ltr">112+112+32=256</span>)۔

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

یہ متغیرات ہر ٹوکن کے لیے مجموعی لاگت (ہر ایک دوسرے کے لحاظ سے) کو محفوظ رکھتے ہیں۔ ان کا استعمال ایک مخصوص مدت کے دوران اوسط شرح تبادلہ کا حساب لگانے کے لیے کیا جا سکتا ہے۔

```solidity
    uint public kLast; // reserve0 * reserve1، حالیہ ترین سیالیت کے ایونٹ کے فوراً بعد کے مطابق
```

پیئر ایکسچینج (pair exchange) جس طرح token0 اور token1 کے درمیان شرح تبادلہ کا فیصلہ کرتا ہے وہ یہ ہے کہ ٹریڈز کے دوران دونوں ذخائر کے حاصل ضرب کو مستقل رکھا جائے۔ `kLast` یہ قدر ہے۔ یہ اس وقت تبدیل ہوتی ہے جب کوئی لیکویڈیٹی فراہم کنندہ ٹوکنز جمع کرواتا ہے یا نکالتا ہے، اور یہ <span dir="ltr">0.3%</span> مارکیٹ فیس کی وجہ سے قدرے بڑھ جاتی ہے۔

یہاں ایک سادہ مثال ہے۔ نوٹ کریں کہ سادگی کی خاطر ٹیبل میں اعشاریہ کے بعد صرف تین ہندسے ہیں، اور ہم <span dir="ltr">0.3%</span> ٹریڈنگ فیس کو نظر انداز کرتے ہیں اس لیے اعداد و شمار بالکل درست نہیں ہیں۔

| ایونٹ | reserve0 | reserve1 | reserve0 \* reserve1 | اوسط شرح تبادلہ (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| ابتدائی سیٹ اپ | <span dir="ltr">1,000.000</span> | <span dir="ltr">1,000.000</span> | <span dir="ltr">1,000,000</span> | |
| ٹریڈر A <span dir="ltr">47.619</span> token1 کے لیے <span dir="ltr">50</span> token0 کا تبادلہ کرتا ہے | <span dir="ltr">1,050.000</span> | <span dir="ltr">952.381</span> | <span dir="ltr">1,000,000</span> | <span dir="ltr">0.952</span> |
| ٹریڈر B <span dir="ltr">8.984</span> token1 کے لیے <span dir="ltr">10</span> token0 کا تبادلہ کرتا ہے | <span dir="ltr">1,060.000</span> | <span dir="ltr">943.396</span> | <span dir="ltr">1,000,000</span> | <span dir="ltr">0.898</span> |
| ٹریڈر C <span dir="ltr">34.305</span> token1 کے لیے <span dir="ltr">40</span> token0 کا تبادلہ کرتا ہے | <span dir="ltr">1,100.000</span> | <span dir="ltr">909.090</span> | <span dir="ltr">1,000,000</span> | <span dir="ltr">0.858</span> |
| ٹریڈر D <span dir="ltr">109.01</span> token0 کے لیے <span dir="ltr">100</span> token1 کا تبادلہ کرتا ہے | <span dir="ltr">990.990</span> | <span dir="ltr">1,009.090</span> | <span dir="ltr">1,000,000</span> | <span dir="ltr">0.917</span> |
| ٹریڈر E <span dir="ltr">10.079</span> token1 کے لیے <span dir="ltr">10</span> token0 کا تبادلہ کرتا ہے | <span dir="ltr">1,000.990</span> | <span dir="ltr">999.010</span> | <span dir="ltr">1,000,000</span> | <span dir="ltr">1.008</span> |

جیسے جیسے ٹریڈرز token0 زیادہ فراہم کرتے ہیں، طلب اور رسد کی بنیاد پر token1 کی نسبتی قدر بڑھ جاتی ہے، اور اس کے برعکس۔

#### لاک (Lock) {#pair-lock}

```solidity
    uint private unlocked = 1;
```

سیکیورٹی کمزوریوں کی ایک قسم ہے جو [مکرر داخلہ کے غلط استعمال](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) پر مبنی ہے۔ یونی سویپ کو صوابدیدی <span dir="ltr">ERC-20</span> ٹوکنز منتقل کرنے کی ضرورت ہوتی ہے، جس کا مطلب ہے کہ ایسے <span dir="ltr">ERC-20</span> کنٹریکٹس کو کال کرنا جو انہیں کال کرنے والی یونی سویپ مارکیٹ کا غلط استعمال کرنے کی کوشش کر سکتے ہیں۔
کنٹریکٹ کے حصے کے طور پر ایک `unlocked` متغیر رکھ کر، ہم فنکشنز کو اس وقت کال ہونے سے روک سکتے ہیں جب وہ چل رہے ہوں (ایک ہی ٹرانزیکشن کے اندر)۔

```solidity
    modifier lock() {
```

یہ فنکشن ایک [موڈیفائر (modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers) ہے، ایک ایسا فنکشن جو کسی عام فنکشن کے گرد لپٹ کر اس کے رویے کو کسی طرح تبدیل کرتا ہے۔

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

اگر `unlocked` ایک کے برابر ہے، تو اسے صفر پر سیٹ کریں۔ اگر یہ پہلے سے ہی صفر ہے تو کال کو ریورٹ کریں، اسے ناکام بنائیں۔

```solidity
        _;
```

ایک موڈیفائر میں `_;` اصل فنکشن کال ہے (تمام پیرامیٹرز کے ساتھ)۔ یہاں اس کا مطلب یہ ہے کہ فنکشن کال صرف اسی صورت میں ہوتی ہے جب کال کیے جانے پر `unlocked` ایک تھا، اور جب یہ چل رہا ہوتا ہے تو `unlocked` کی قدر صفر ہوتی ہے۔

```solidity
        unlocked = 1;
    }
```

مرکزی فنکشن کے واپس آنے کے بعد، لاک کو ہٹا دیں۔

#### متفرق فنکشنز {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

یہ فنکشن کال کرنے والوں کو ایکسچینج کی موجودہ حالت فراہم کرتا ہے۔ غور کریں کہ Solidity فنکشنز [متعدد قدریں واپس کر سکتے ہیں](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)۔

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

یہ اندرونی فنکشن ایکسچینج سے کسی اور کو ERC20 ٹوکنز کی ایک مقدار منتقل کرتا ہے۔ `SELECTOR` یہ بتاتا ہے کہ ہم جس فنکشن کو کال کر رہے ہیں وہ `transfer(address,uint)` ہے (اوپر تعریف دیکھیں)۔

ٹوکن فنکشن کے لیے انٹرفیس امپورٹ کرنے سے بچنے کے لیے، ہم [ABI فنکشنز](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions) میں سے کسی ایک کا استعمال کرتے ہوئے "دستی طور پر" کال بناتے ہیں۔

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

دو طریقے ہیں جن سے <span dir="ltr">ERC-20</span> منتقلی کال ناکامی کی اطلاع دے سکتی ہے:

1. ریورٹ۔ اگر کسی بیرونی کنٹریکٹ کی کال ریورٹ ہوتی ہے، تو بولین (boolean) ریٹرن ویلیو `false` ہوتی ہے۔
2. عام طور پر ختم ہو لیکن ناکامی کی اطلاع دے۔ اس صورت میں ریٹرن ویلیو بفر کی لمبائی غیر صفر ہوتی ہے، اور جب اسے بولین ویلیو کے طور پر ڈی کوڈ کیا جاتا ہے تو یہ `false` ہوتی ہے۔

اگر ان میں سے کوئی بھی شرط پوری ہوتی ہے، تو ریورٹ کریں۔

#### ایونٹس {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

یہ دو ایونٹس اس وقت خارج ہوتے ہیں جب کوئی لیکویڈیٹی فراہم کنندہ یا تو سیالیت جمع کرواتا ہے (`Mint`) یا اسے نکالتا ہے (`Burn`)۔ دونوں صورتوں میں، جمع کیے گئے یا نکالے گئے token0 اور token1 کی مقداریں ایونٹ کا حصہ ہوتی ہیں، نیز اس اکاؤنٹ کی شناخت بھی جس نے ہمیں کال کیا (`sender`)۔ انخلا کی صورت میں، ایونٹ میں وہ ہدف بھی شامل ہوتا ہے جس نے ٹوکنز وصول کیے (`to`)، جو بھیجنے والے سے مختلف ہو سکتا ہے۔

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

یہ ایونٹ اس وقت خارج ہوتا ہے جب کوئی ٹریڈر ایک ٹوکن کا دوسرے سے تبادلہ کرتا ہے۔ ایک بار پھر، بھیجنے والا اور منزل ایک جیسی نہیں ہو سکتی۔
ہر ٹوکن یا تو ایکسچینج کو بھیجا جا سکتا ہے، یا اس سے وصول کیا جا سکتا ہے۔

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

آخر میں، `Sync` ہر بار اس وقت خارج ہوتا ہے جب ٹوکنز شامل کیے جاتے ہیں یا نکالے جاتے ہیں، قطع نظر اس کی وجہ کے، تاکہ تازہ ترین ریزرو معلومات (اور اس وجہ سے شرح تبادلہ) فراہم کی جا سکے۔

#### سیٹ اپ فنکشنز {#pair-setup}

یہ فنکشنز اس وقت ایک بار کال کیے جانے چاہئیں جب نیا پیئر ایکسچینج سیٹ اپ کیا جائے۔

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

کنسٹرکٹر اس بات کو یقینی بناتا ہے کہ ہم اس فیکٹری کے پتے کا ٹریک رکھیں گے جس نے جوڑا بنایا ہے۔ یہ معلومات `initialize` اور فیکٹری فیس (اگر کوئی موجود ہو) کے لیے درکار ہے۔

```solidity
    // ڈیپلائمنٹ کے وقت فیکٹری کی طرف سے ایک بار کال کیا جاتا ہے
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // مناسب جانچ
        token0 = _token0;
        token1 = _token1;
    }
```

یہ فنکشن فیکٹری کو (اور صرف فیکٹری کو) ان دو <span dir="ltr">ERC-20</span> ٹوکنز کی وضاحت کرنے کی اجازت دیتا ہے جن کا یہ جوڑا تبادلہ کرے گا۔

#### اندرونی اپ ڈیٹ فنکشنز {#pair-update-internal}

##### \_update {#pair-external}

```solidity
    // ریزرو کو اپ ڈیٹ کریں اور، فی بلاک پہلی کال پر، پرائس ایکومولیٹرز کو
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

یہ فنکشن ہر بار اس وقت کال کیا جاتا ہے جب ٹوکنز جمع کیے جاتے ہیں یا نکالے جاتے ہیں۔

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

اگر balance0 یا balance1 (uint256) میں سے کوئی بھی uint112(-1) (=2^112-1) سے زیادہ ہے (لہذا جب اسے uint112 میں تبدیل کیا جاتا ہے تو یہ اوور فلو ہو کر واپس 0 پر آ جاتا ہے) تو اوور فلوز کو روکنے کے لیے \_update کو جاری رکھنے سے انکار کر دیں۔ ایک عام ٹوکن کے ساتھ جسے 10^18 اکائیوں میں تقسیم کیا جا سکتا ہے، اس کا مطلب ہے کہ ہر تبادلہ ہر ٹوکن کے تقریباً <span dir="ltr">5.1\*10^15</span> تک محدود ہے۔ اب تک یہ کوئی مسئلہ نہیں رہا ہے۔

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // اوور فلو مطلوب ہے
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

اگر گزرا ہوا وقت صفر نہیں ہے، تو اس کا مطلب ہے کہ ہم اس بلاک پر پہلی ایکسچینج ٹرانزیکشن ہیں۔ اس صورت میں، ہمیں لاگت جمع کرنے والوں (cost accumulators) کو اپ ڈیٹ کرنے کی ضرورت ہے۔

```solidity
            // * کبھی اوور فلو نہیں ہوتا، اور + اوور فلو مطلوب ہے
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

ہر لاگت جمع کرنے والے کو تازہ ترین لاگت (دوسرے ٹوکن کا ریزرو/اس ٹوکن کا ریزرو) کو سیکنڈز میں گزرے ہوئے وقت سے ضرب دے کر اپ ڈیٹ کیا جاتا ہے۔ اوسط قیمت حاصل کرنے کے لیے، آپ وقت کے دو مقامات پر مجموعی قیمت پڑھتے ہیں اور ان کے درمیان وقت کے فرق سے تقسیم کرتے ہیں۔ مثال کے طور پر، ایونٹس کی اس ترتیب کو فرض کریں:

| ایونٹ | reserve0 | reserve1 | ٹائم اسٹیمپ | معمولی شرح تبادلہ (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| ابتدائی سیٹ اپ | <span dir="ltr">1,000.000</span> | <span dir="ltr">1,000.000</span> | <span dir="ltr">5,000</span> | <span dir="ltr">1.000</span> | <span dir="ltr">0</span> |
| ٹریڈر A <span dir="ltr">50</span> token0 جمع کرواتا ہے اور <span dir="ltr">47.619</span> token1 واپس حاصل کرتا ہے | <span dir="ltr">1,050.000</span> | <span dir="ltr">952.381</span> | <span dir="ltr">5,020</span> | <span dir="ltr">0.907</span> | <span dir="ltr">20</span> |
| ٹریڈر B <span dir="ltr">10</span> token0 جمع کرواتا ہے اور <span dir="ltr">8.984</span> token1 واپس حاصل کرتا ہے | <span dir="ltr">1,060.000</span> | <span dir="ltr">943.396</span> | <span dir="ltr">5,030</span> | <span dir="ltr">0.890</span> | <span dir="ltr">20+10\*0.907 = 29.07</span> |
| ٹریڈر C <span dir="ltr">40</span> token0 جمع کرواتا ہے اور <span dir="ltr">34.305</span> token1 واپس حاصل کرتا ہے | <span dir="ltr">1,100.000</span> | <span dir="ltr">909.090</span> | <span dir="ltr">5,100</span> | <span dir="ltr">0.826</span> | <span dir="ltr">29.07+70\*0.890 = 91.37</span> |
| ٹریڈر D <span dir="ltr">100</span> token1 جمع کرواتا ہے اور <span dir="ltr">109.01</span> token0 واپس حاصل کرتا ہے | <span dir="ltr">990.990</span> | <span dir="ltr">1,009.090</span> | <span dir="ltr">5,110</span> | <span dir="ltr">1.018</span> | <span dir="ltr">91.37+10\*0.826 = 99.63</span> |
| ٹریڈر E <span dir="ltr">10</span> token0 جمع کرواتا ہے اور <span dir="ltr">10.079</span> token1 واپس حاصل کرتا ہے | <span dir="ltr">1,000.990</span> | <span dir="ltr">999.010</span> | <span dir="ltr">5,150</span> | <span dir="ltr">0.998</span> | <span dir="ltr">99.63+40\*1.1018 = 143.702</span> |

فرض کریں کہ ہم ٹائم اسٹیمپس <span dir="ltr">5,030</span> اور <span dir="ltr">5,150</span> کے درمیان **Token0** کی اوسط قیمت کا حساب لگانا چاہتے ہیں۔ `price0Cumulative` کی قدر میں فرق <span dir="ltr">143.702-29.07=114.632</span> ہے۔ یہ دو منٹ (<span dir="ltr">120</span> سیکنڈ) کی اوسط ہے۔ لہذا اوسط قیمت <span dir="ltr">114.632/120 = 0.955</span> ہے۔

قیمت کا یہ حساب وہ وجہ ہے جس کے لیے ہمیں پرانے ریزرو سائز جاننے کی ضرورت ہوتی ہے۔

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

آخر میں، عالمی متغیرات (global variables) کو اپ ڈیٹ کریں اور ایک `Sync` ایونٹ خارج کریں۔

##### \_mintFee {#uniswapv2factory}

```solidity
    // اگر فیس آن ہے، تو sqrt(k) میں اضافے کے 1/6 کے برابر سیالیت ڈھالیں
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

یونی سویپ 2.0 میں ٹریڈرز مارکیٹ استعمال کرنے کے لیے <span dir="ltr">0.30%</span> فیس ادا کرتے ہیں۔ اس فیس کا زیادہ تر حصہ (ٹریڈ کا <span dir="ltr">0.25%</span>) ہمیشہ لیکویڈیٹی فراہم کنندگان کو جاتا ہے۔ بقیہ <span dir="ltr">0.05%</span> یا تو لیکویڈیٹی فراہم کنندگان کو جا سکتا ہے یا فیکٹری کی طرف سے پروٹوکول فیس کے طور پر بتائے گئے پتے پر، جو یونی سویپ کو ان کی ترقیاتی کوششوں کے لیے ادائیگی کرتا ہے۔

حساب کتاب (اور اس وجہ سے گیس کی لاگت) کو کم کرنے کے لیے، یہ فیس ہر ٹرانزیکشن کے بجائے صرف اس وقت شمار کی جاتی ہے جب پول میں سیالیت شامل کی جاتی ہے یا نکالی جاتی ہے۔

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

فیکٹری کی فیس کی منزل پڑھیں۔ اگر یہ صفر ہے تو کوئی پروٹوکول فیس نہیں ہے اور اس فیس کا حساب لگانے کی ضرورت نہیں ہے۔

```solidity
        uint _kLast = kLast; // گیس کی بچت
```

`kLast` حالت کا متغیر اسٹوریج میں واقع ہے، لہذا کنٹریکٹ کی مختلف کالز کے درمیان اس کی ایک قدر ہوگی۔
اسٹوریج تک رسائی اس غیر مستحکم میموری تک رسائی سے کہیں زیادہ مہنگی ہے جو کنٹریکٹ کی فنکشن کال ختم ہونے پر جاری کی جاتی ہے، لہذا ہم گیس بچانے کے لیے ایک اندرونی متغیر کا استعمال کرتے ہیں۔

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

لیکویڈیٹی فراہم کنندگان کو ان کا حصہ محض ان کے سیالیت کے ٹوکنز کی قدر میں اضافے سے ملتا ہے۔ لیکن پروٹوکول فیس کے لیے نئے سیالیت کے ٹوکنز کو ڈھالنے اور `feeTo` پتے پر فراہم کرنے کی ضرورت ہوتی ہے۔

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

اگر کوئی نئی سیالیت ہے جس پر پروٹوکول فیس وصول کی جانی ہے۔ آپ اسکوائر روٹ فنکشن کو [اس مضمون میں آگے](#math) دیکھ سکتے ہیں۔

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

فیسوں کے اس پیچیدہ حساب کتاب کی وضاحت [وائٹ پیپر](https://app.uniswap.org/whitepaper.pdf) کے صفحہ 5 پر کی گئی ہے۔ ہم جانتے ہیں کہ جس وقت `kLast` کا حساب لگایا گیا تھا اور موجودہ وقت کے درمیان کوئی سیالیت شامل یا نکالی نہیں گئی تھی (کیونکہ ہم یہ حساب ہر بار سیالیت شامل کرنے یا نکالنے پر چلاتے ہیں، اس سے پہلے کہ یہ حقیقت میں تبدیل ہو)، لہذا `reserve0 * reserve1` میں کوئی بھی تبدیلی ٹرانزیکشن فیس سے آنی چاہیے (ان کے بغیر ہم `reserve0 * reserve1` کو مستقل رکھیں گے)۔

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

اضافی سیالیت کے ٹوکنز کو حقیقت میں بنانے اور انہیں `feeTo` کو تفویض کرنے کے لیے `UniswapV2ERC20._mint` فنکشن کا استعمال کریں۔

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

اگر کوئی فیس مقرر نہیں ہے تو `kLast` کو صفر پر سیٹ کریں (اگر یہ پہلے سے ایسا نہیں ہے)۔ جب یہ کنٹریکٹ لکھا گیا تھا تو ایک [گیس ریفنڈ فیچر](https://eips.ethereum.org/EIPS/eip-3298) تھا جو کنٹریکٹس کی حوصلہ افزائی کرتا تھا کہ وہ اس اسٹوریج کو صفر کر کے ایتھیریم حالت کے مجموعی سائز کو کم کریں جس کی انہیں ضرورت نہیں تھی۔
یہ کوڈ جب ممکن ہو وہ ریفنڈ حاصل کرتا ہے۔

#### بیرونی طور پر قابل رسائی فنکشنز {#uniswapv2erc20}

نوٹ کریں کہ اگرچہ کوئی بھی ٹرانزیکشن یا کنٹریکٹ ان فنکشنز کو کال _کر سکتا ہے_، لیکن انہیں پیریفری (periphery) کنٹریکٹ سے کال کرنے کے لیے ڈیزائن کیا گیا ہے۔ اگر آپ انہیں براہ راست کال کرتے ہیں تو آپ پیئر ایکسچینج کو دھوکہ نہیں دے سکیں گے، لیکن آپ کسی غلطی کے ذریعے قدر کھو سکتے ہیں۔

##### mint {#periphery-contracts}

```solidity
    // اس لو-لیول فنکشن کو ایسے کنٹریکٹ سے کال کیا جانا چاہیے جو اہم حفاظتی جانچ پڑتال کرتا ہو
    function mint(address to) external lock returns (uint liquidity) {
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب کوئی لیکویڈیٹی فراہم کنندہ پول میں سیالیت شامل کرتا ہے۔ یہ انعام کے طور پر اضافی سیالیت کے ٹوکنز ڈھالتا ہے۔ اسے [ایک پیریفری کنٹریکٹ](#uniswapv2router02) سے کال کیا جانا چاہیے جو اسے اسی ٹرانزیکشن میں سیالیت شامل کرنے کے بعد کال کرتا ہے (تاکہ کوئی اور جائز مالک سے پہلے نئی سیالیت کا دعویٰ کرنے والی ٹرانزیکشن جمع نہ کر سکے)۔

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // گیس کی بچت
```

یہ ایک Solidity فنکشن کے نتائج پڑھنے کا طریقہ ہے جو متعدد قدریں واپس کرتا ہے۔ ہم آخری واپس کی گئی قدروں، بلاک ٹائم اسٹیمپ، کو مسترد کر دیتے ہیں، کیونکہ ہمیں اس کی ضرورت نہیں ہے۔

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

موجودہ بیلنس حاصل کریں اور دیکھیں کہ ہر ٹوکن کی قسم میں کتنا اضافہ کیا گیا تھا۔

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

وصول کی جانے والی پروٹوکول فیس کا حساب لگائیں، اگر کوئی ہو، اور اس کے مطابق سیالیت کے ٹوکنز ڈھالیں۔ چونکہ `_mintFee` کے پیرامیٹرز پرانی ریزرو قدریں ہیں، اس لیے فیس کا حساب صرف فیس کی وجہ سے پول کی تبدیلیوں کی بنیاد پر درست طریقے سے لگایا جاتا ہے۔

```solidity
        uint _totalSupply = totalSupply; // گیس کی بچت، اسے یہاں بیان کیا جانا چاہیے کیونکہ totalSupply _mintFee میں اپ ڈیٹ ہو سکتی ہے
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // پہلے MINIMUM_LIQUIDITY ٹوکنز کو مستقل طور پر لاک کریں
```

اگر یہ پہلی جمع (deposit) ہے، تو `MINIMUM_LIQUIDITY` ٹوکنز بنائیں اور انہیں لاک کرنے کے لیے پتہ صفر پر بھیجیں۔ انہیں کبھی بھی ریڈیم (redeem) نہیں کیا جا سکتا، جس کا مطلب ہے کہ پول کبھی بھی مکمل طور پر خالی نہیں ہوگا (یہ ہمیں کچھ جگہوں پر صفر سے تقسیم ہونے سے بچاتا ہے)۔ `MINIMUM_LIQUIDITY` کی قدر ایک ہزار ہے، جو اس بات پر غور کرتے ہوئے کہ زیادہ تر <span dir="ltr">ERC-20</span> کو ٹوکن کے 10^-18ویں حصے کی اکائیوں میں تقسیم کیا جاتا ہے، جیسا کہ ETH کو Wei میں تقسیم کیا جاتا ہے، ایک واحد ٹوکن کی قدر کے لحاظ سے 10^-15 ہے۔ یہ کوئی زیادہ قیمت نہیں ہے۔

پہلی جمع کے وقت ہم دونوں ٹوکنز کی نسبتی قدر نہیں جانتے، اس لیے ہم صرف مقداروں کو ضرب دیتے ہیں اور اسکوائر روٹ لیتے ہیں، یہ فرض کرتے ہوئے کہ جمع ہمیں دونوں ٹوکنز میں مساوی قدر فراہم کرتی ہے۔

ہم اس پر بھروسہ کر سکتے ہیں کیونکہ یہ جمع کنندہ کے مفاد میں ہے کہ وہ مساوی قدر فراہم کرے، تاکہ آربٹریج (arbitrage) کی وجہ سے قدر کھونے سے بچ سکے۔
فرض کریں کہ دونوں ٹوکنز کی قدر ایک جیسی ہے، لیکن ہمارے جمع کنندہ نے **Token0** کے مقابلے میں **Token1** چار گنا زیادہ جمع کروائے۔ ایک ٹریڈر اس حقیقت کا استعمال کر سکتا ہے کہ پیئر ایکسچینج سمجھتا ہے کہ **Token0** زیادہ قیمتی ہے تاکہ اس سے قدر نکالی جا سکے۔

| ایونٹ | reserve0 | reserve1 | reserve0 \* reserve1 | پول کی قدر (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| ابتدائی سیٹ اپ | <span dir="ltr">8</span> | <span dir="ltr">32</span> | <span dir="ltr">256</span> | <span dir="ltr">40</span> |
| ٹریڈر <span dir="ltr">8</span> **Token0** ٹوکنز جمع کرواتا ہے، <span dir="ltr">16</span> **Token1** واپس حاصل کرتا ہے | <span dir="ltr">16</span> | <span dir="ltr">16</span> | <span dir="ltr">256</span> | <span dir="ltr">32</span> |

جیسا کہ آپ دیکھ سکتے ہیں، ٹریڈر نے اضافی <span dir="ltr">8</span> ٹوکنز کمائے، جو پول کی قدر میں کمی سے آتے ہیں، جس سے اس کے مالک جمع کنندہ کو نقصان پہنچتا ہے۔

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

ہر بعد کی جمع کے ساتھ ہم پہلے ہی دونوں اثاثوں کے درمیان شرح تبادلہ جانتے ہیں، اور ہم توقع کرتے ہیں کہ لیکویڈیٹی فراہم کنندگان دونوں میں مساوی قدر فراہم کریں گے۔ اگر وہ ایسا نہیں کرتے ہیں، تو ہم انہیں سزا کے طور پر ان کی فراہم کردہ کم قدر کی بنیاد پر سیالیت کے ٹوکنز دیتے ہیں۔

چاہے یہ ابتدائی جمع ہو یا بعد کی، ہم جتنے سیالیت کے ٹوکنز فراہم کرتے ہیں وہ `reserve0*reserve1` میں تبدیلی کے اسکوائر روٹ کے برابر ہوتے ہیں اور سیالیت کے ٹوکن کی قدر تبدیل نہیں ہوتی (جب تک کہ ہمیں ایسی جمع نہ ملے جس میں دونوں اقسام کی مساوی قدریں نہ ہوں، جس صورت میں "جرمانہ" تقسیم ہو جاتا ہے)۔ یہاں دو ٹوکنز کی ایک اور مثال ہے جن کی قدر ایک جیسی ہے، جس میں تین اچھی جمع اور ایک خراب (صرف ایک ٹوکن کی قسم کی جمع، اس لیے یہ کوئی سیالیت کے ٹوکنز پیدا نہیں کرتی) ہے۔

| ایونٹ | reserve0 | reserve1 | reserve0 \* reserve1 | پول کی قدر (reserve0 + reserve1) | اس جمع کے لیے ڈھالے گئے سیالیت کے ٹوکنز | کل سیالیت کے ٹوکنز | ہر سیالیت کے ٹوکن کی قدر |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| ابتدائی سیٹ اپ | <span dir="ltr">8.000</span> | <span dir="ltr">8.000</span> | <span dir="ltr">64</span> | <span dir="ltr">16.000</span> | <span dir="ltr">8</span> | <span dir="ltr">8</span> | <span dir="ltr">2.000</span> |
| ہر قسم کے چار جمع کریں | <span dir="ltr">12.000</span> | <span dir="ltr">12.000</span> | <span dir="ltr">144</span> | <span dir="ltr">24.000</span> | <span dir="ltr">4</span> | <span dir="ltr">12</span> | <span dir="ltr">2.000</span> |
| ہر قسم کے دو جمع کریں | <span dir="ltr">14.000</span> | <span dir="ltr">14.000</span> | <span dir="ltr">196</span> | <span dir="ltr">28.000</span> | <span dir="ltr">2</span> | <span dir="ltr">14</span> | <span dir="ltr">2.000</span> |
| غیر مساوی قدر کی جمع | <span dir="ltr">18.000</span> | <span dir="ltr">14.000</span> | <span dir="ltr">252</span> | <span dir="ltr">32.000</span> | <span dir="ltr">0</span> | <span dir="ltr">14</span> | <span dir="ltr">\~2.286</span> |
| آربٹریج کے بعد | <span dir="ltr">\~15.874</span> | <span dir="ltr">\~15.874</span> | <span dir="ltr">252</span> | <span dir="ltr">\~31.748</span> | <span dir="ltr">0</span> | <span dir="ltr">14</span> | <span dir="ltr">\~2.267</span> |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

اضافی سیالیت کے ٹوکنز کو حقیقت میں بنانے اور انہیں درست اکاؤنٹ میں دینے کے لیے `UniswapV2ERC20._mint` فنکشن کا استعمال کریں۔

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 اور reserve1 اپ ٹو ڈیٹ ہیں
        emit Mint(msg.sender, amount0, amount1);
    }
```

حالت کے متغیرات (`reserve0`، `reserve1`، اور اگر ضرورت ہو تو `kLast`) کو اپ ڈیٹ کریں اور مناسب ایونٹ خارج کریں۔

##### burn {#uniswapv2router01}

```solidity
    // اس لو-لیول فنکشن کو ایسے کنٹریکٹ سے کال کیا جانا چاہیے جو اہم حفاظتی جانچ پڑتال کرتا ہو
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب سیالیت نکالی جاتی ہے اور مناسب سیالیت کے ٹوکنز کو جلانے کی ضرورت ہوتی ہے۔
اسے بھی [ایک پیریفری اکاؤنٹ سے](#uniswapv2router02) کال کیا جانا چاہیے۔

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // گیس کی بچت
        address _token0 = token0;                                // گیس کی بچت
        address _token1 = token1;                                // گیس کی بچت
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

پیریفری کنٹریکٹ نے کال سے پہلے جلائی جانے والی سیالیت کو اس کنٹریکٹ میں منتقل کر دیا تھا۔ اس طرح ہم جانتے ہیں کہ کتنی سیالیت جلانی ہے، اور ہم اس بات کو یقینی بنا سکتے ہیں کہ یہ جل جائے۔

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // گیس کی بچت، اسے یہاں بیان کیا جانا چاہیے کیونکہ totalSupply _mintFee میں اپ ڈیٹ ہو سکتی ہے
        amount0 = liquidity.mul(balance0) / _totalSupply; // بیلنس کا استعمال متناسب تقسیم کو یقینی بناتا ہے
        amount1 = liquidity.mul(balance1) / _totalSupply; // بیلنس کا استعمال متناسب تقسیم کو یقینی بناتا ہے
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

لیکویڈیٹی فراہم کنندہ کو دونوں ٹوکنز کی مساوی قدر ملتی ہے۔ اس طرح ہم شرح تبادلہ کو تبدیل نہیں کرتے ہیں۔

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 اور reserve1 اپ ٹو ڈیٹ ہیں
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

بقیہ `burn` فنکشن اوپر دیے گئے `mint` فنکشن کا عکس ہے۔

##### swap {#uniswapv2router02}

```solidity
    // اس لو-لیول فنکشن کو ایسے کنٹریکٹ سے کال کیا جانا چاہیے جو اہم حفاظتی جانچ پڑتال کرتا ہو
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

یہ فنکشن بھی [ایک پیریفری کنٹریکٹ](#uniswapv2router02) سے کال کیا جانا چاہیے۔

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // گیس کی بچت
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // _token{0,1} کے لیے اسکوپ، stack too deep ایررز سے بچاتا ہے
```

مقامی متغیرات (Local variables) کو یا تو میموری میں محفوظ کیا جا سکتا ہے یا، اگر وہ بہت زیادہ نہیں ہیں، تو براہ راست اسٹیک (stack) پر۔
اگر ہم تعداد کو محدود کر سکیں تاکہ ہم اسٹیک کا استعمال کریں تو ہم کم گیس استعمال کرتے ہیں۔ مزید تفصیلات کے لیے [یلو پیپر، رسمی ایتھیریم تصریحات](https://ethereum.github.io/yellowpaper/paper.pdf)، صفحہ 26، مساوات 298 دیکھیں۔

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // پرامید طور پر ٹوکنز کی منتقلی کریں
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // پرامید طور پر ٹوکنز کی منتقلی کریں
```

یہ منتقلی پرامید (optimistic) ہے، کیونکہ ہم اس بات کا یقین ہونے سے پہلے منتقل کرتے ہیں کہ تمام شرائط پوری ہو گئی ہیں۔ ایتھیریم میں یہ ٹھیک ہے کیونکہ اگر کال میں بعد میں شرائط پوری نہیں ہوتی ہیں تو ہم اسے اور اس کی پیدا کردہ کسی بھی تبدیلی کو ریورٹ کر دیتے ہیں۔

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

اگر درخواست کی جائے تو وصول کنندہ کو تبادلے کے بارے میں مطلع کریں۔

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

موجودہ بیلنس حاصل کریں۔ پیریفری کنٹریکٹ تبادلے کے لیے ہمیں کال کرنے سے پہلے ہمیں ٹوکنز بھیجتا ہے۔ اس سے کنٹریکٹ کے لیے یہ چیک کرنا آسان ہو جاتا ہے کہ اسے دھوکہ نہیں دیا جا رہا ہے، ایک ایسا چیک جو بنیادی کنٹریکٹ میں ہونا _ضروری_ ہے (کیونکہ ہمیں ہمارے پیریفری کنٹریکٹ کے علاوہ دیگر اداروں کے ذریعے بھی کال کیا جا سکتا ہے)۔

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // reserve{0,1}Adjusted کے لیے اسکوپ، stack too deep ایررز سے بچاتا ہے
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

یہ اس بات کو یقینی بنانے کے لیے ایک سینیٹی چیک (sanity check) ہے کہ ہم تبادلے سے نقصان نہ اٹھائیں۔ ایسا کوئی بھی حالات نہیں ہیں جن میں تبادلے سے `reserve0*reserve1` کم ہونا چاہیے۔ یہ وہ جگہ بھی ہے جہاں ہم اس بات کو یقینی بناتے ہیں کہ تبادلے پر <span dir="ltr">0.3%</span> کی فیس بھیجی جا رہی ہے؛ K کی قدر کی سینیٹی چیکنگ سے پہلے، ہم دونوں بیلنسز کو <span dir="ltr">1000</span> سے ضرب دیتے ہیں جس میں سے مقداروں کو <span dir="ltr">3</span> سے ضرب دے کر منہا کیا جاتا ہے، اس کا مطلب ہے کہ اس کی K قدر کا موجودہ ذخائر کی K قدر سے موازنہ کرنے سے پہلے بیلنس سے <span dir="ltr">0.3%</span> (<span dir="ltr">3/1000 = 0.003 = 0.3%</span>) کاٹا جا رہا ہے۔

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0` اور `reserve1` کو اپ ڈیٹ کریں، اور اگر ضروری ہو تو قیمت جمع کرنے والوں اور ٹائم اسٹیمپ کو اپ ڈیٹ کریں اور ایک ایونٹ خارج کریں۔

##### Sync یا Skim {#add-liquidity}

یہ ممکن ہے کہ حقیقی بیلنس ان ذخائر کے ساتھ ہم آہنگی سے باہر ہو جائیں جو پیئر ایکسچینج سمجھتا ہے کہ اس کے پاس ہیں۔
کنٹریکٹ کی رضامندی کے بغیر ٹوکنز نکالنے کا کوئی طریقہ نہیں ہے، لیکن جمع کروانا ایک الگ معاملہ ہے۔ ایک اکاؤنٹ `mint` یا `swap` کو کال کیے بغیر ایکسچینج میں ٹوکنز منتقل کر سکتا ہے۔

اس صورت میں دو حل ہیں:

- `sync`، ذخائر کو موجودہ بیلنس میں اپ ڈیٹ کریں
- `skim`، اضافی رقم نکال لیں۔ نوٹ کریں کہ کسی بھی اکاؤنٹ کو `skim` کال کرنے کی اجازت ہے کیونکہ ہم نہیں جانتے کہ ٹوکنز کس نے جمع کروائے ہیں۔ یہ معلومات ایک ایونٹ میں خارج ہوتی ہے، لیکن ایونٹس بلاک چین سے قابل رسائی نہیں ہیں۔

```solidity
    // بیلنس کو ریزرو کے مطابق کرنے پر مجبور کریں
    function skim(address to) external lock {
        address _token0 = token0; // گیس کی بچت
        address _token1 = token1; // گیس کی بچت
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // ریزرو کو بیلنس کے مطابق کرنے پر مجبور کریں
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#remove-liquidity}

[یہ کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) پیئر ایکسچینجز بناتا ہے۔

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

یہ حالت کے متغیرات پروٹوکول فیس کو نافذ کرنے کے لیے ضروری ہیں ([وائٹ پیپر](https://app.uniswap.org/whitepaper.pdf)، صفحہ 5 دیکھیں)۔
`feeTo` پتہ پروٹوکول فیس کے لیے سیالیت کے ٹوکنز جمع کرتا ہے، اور `feeToSetter` وہ پتہ ہے جسے `feeTo` کو کسی مختلف پتے پر تبدیل کرنے کی اجازت ہے۔

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

یہ متغیرات جوڑوں، یعنی دو ٹوکن اقسام کے درمیان تبادلوں کا ٹریک رکھتے ہیں۔

پہلا، `getPair`، ایک میپنگ (mapping) ہے جو ایک پیئر ایکسچینج کنٹریکٹ کی شناخت ان دو <span dir="ltr">ERC-20</span> ٹوکنز کی بنیاد پر کرتا ہے جن کا یہ تبادلہ کرتا ہے۔ <span dir="ltr">ERC-20</span> ٹوکنز کی شناخت ان کنٹریکٹس کے پتوں سے ہوتی ہے جو انہیں نافذ کرتے ہیں، لہذا کیز (keys) اور ویلیو (value) سبھی پتے ہیں۔ اس پیئر ایکسچینج کا پتہ حاصل کرنے کے لیے جو آپ کو `tokenA` سے `tokenB` میں تبدیل کرنے دیتا ہے، آپ `getPair[<tokenA address>][<tokenB address>]` استعمال کرتے ہیں (یا اس کے برعکس)۔

دوسرا متغیر، `allPairs`، ایک سرنی (array) ہے جس میں اس فیکٹری کے ذریعے بنائے گئے پیئر ایکسچینجز کے تمام پتے شامل ہیں۔ ایتھیریم میں آپ میپنگ کے مواد پر اعادہ (iterate) نہیں کر سکتے، یا تمام کیز کی فہرست حاصل نہیں کر سکتے، لہذا یہ متغیر یہ جاننے کا واحد طریقہ ہے کہ یہ فیکٹری کن ایکسچینجز کا انتظام کرتی ہے۔

نوٹ: آپ میپنگ کی تمام کیز پر اعادہ کیوں نہیں کر سکتے اس کی وجہ یہ ہے کہ کنٹریکٹ ڈیٹا اسٹوریج _مہنگا_ ہے، لہذا ہم اس کا جتنا کم استعمال کریں اتنا ہی بہتر ہے، اور ہم اسے جتنی کم بار تبدیل کریں اتنا ہی بہتر ہے۔ آپ [ایسی میپنگز بنا سکتے ہیں جو اعادہ کو سپورٹ کرتی ہیں](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)، لیکن انہیں کیز کی فہرست کے لیے اضافی اسٹوریج کی ضرورت ہوتی ہے۔ زیادہ تر ایپلی کیشنز میں آپ کو اس کی ضرورت نہیں ہوتی ہے۔

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

یہ ایونٹ اس وقت خارج ہوتا ہے جب ایک نیا پیئر ایکسچینج بنایا جاتا ہے۔ اس میں ٹوکنز کے پتے، پیئر ایکسچینج کا پتہ، اور فیکٹری کے زیر انتظام ایکسچینجز کی کل تعداد شامل ہوتی ہے۔

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

کنسٹرکٹر صرف ایک کام کرتا ہے اور وہ ہے `feeToSetter` کی وضاحت کرنا۔ فیکٹریاں بغیر کسی فیس کے شروع ہوتی ہیں، اور صرف `feeSetter` ہی اسے تبدیل کر سکتا ہے۔

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

یہ فنکشن ایکسچینج جوڑوں کی تعداد واپس کرتا ہے۔

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

یہ فیکٹری کا بنیادی فنکشن ہے، دو <span dir="ltr">ERC-20</span> ٹوکنز کے درمیان ایک پیئر ایکسچینج بنانا۔ نوٹ کریں کہ کوئی بھی اس فنکشن کو کال کر سکتا ہے۔ نیا پیئر ایکسچینج بنانے کے لیے آپ کو یونی سویپ سے اجازت کی ضرورت نہیں ہے۔

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

ہم چاہتے ہیں کہ نئے ایکسچینج کا پتہ متعین (deterministic) ہو، تاکہ اس کا حساب پہلے سے آف چین لگایا جا سکے (یہ [لیئر ۲ (l2) ٹرانزیکشنز](/developers/docs/scaling/) کے لیے مفید ہو سکتا ہے)۔
ایسا کرنے کے لیے ہمیں ٹوکن کے پتوں کی ایک مستقل ترتیب کی ضرورت ہے، قطع نظر اس ترتیب کے جس میں ہم نے انہیں وصول کیا ہے، لہذا ہم انہیں یہاں ترتیب دیتے ہیں۔

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // سنگل چیک کافی ہے
```

بڑے سیالیت کے پول چھوٹے پولز سے بہتر ہوتے ہیں، کیونکہ ان کی قیمتیں زیادہ مستحکم ہوتی ہیں۔ ہم ٹوکنز کے فی جوڑے کے لیے ایک سے زیادہ سیالیت کا پول نہیں رکھنا چاہتے۔ اگر پہلے سے ہی کوئی ایکسچینج موجود ہے، تو اسی جوڑے کے لیے دوسرا بنانے کی ضرورت نہیں ہے۔

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

ایک نیا کنٹریکٹ بنانے کے لیے ہمیں اس کوڈ کی ضرورت ہوتی ہے جو اسے بناتا ہے (کنسٹرکٹر فنکشن اور وہ کوڈ جو اصل کنٹریکٹ کے EVM بائٹ کوڈ کو میموری میں لکھتا ہے)۔ عام طور پر Solidity میں ہم صرف `addr = new <name of contract>(<constructor parameters>)` استعمال کرتے ہیں اور کمپائلر ہمارے لیے ہر چیز کا خیال رکھتا ہے، لیکن ایک متعین کنٹریکٹ کا پتہ حاصل کرنے کے لیے ہمیں [CREATE2 آپ کوڈ](https://eips.ethereum.org/EIPS/eip-1014) استعمال کرنے کی ضرورت ہے۔
جب یہ کوڈ لکھا گیا تھا تو اس آپ کوڈ کو ابھی تک Solidity کی طرف سے سپورٹ نہیں کیا گیا تھا، اس لیے دستی طور پر کوڈ حاصل کرنا ضروری تھا۔ اب یہ کوئی مسئلہ نہیں ہے، کیونکہ [Solidity اب CREATE2 کو سپورٹ کرتا ہے](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)۔

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

جب کسی آپ کوڈ کو ابھی تک Solidity کی طرف سے سپورٹ نہیں کیا جاتا ہے تو ہم اسے [ان لائن اسمبلی (inline assembly)](https://docs.soliditylang.org/en/v0.8.3/assembly.html) کا استعمال کرتے ہوئے کال کر سکتے ہیں۔

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

نئے ایکسچینج کو یہ بتانے کے لیے کہ وہ کن دو ٹوکنز کا تبادلہ کرتا ہے، `initialize` فنکشن کو کال کریں۔

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // میپنگ کو الٹی سمت میں پاپولیٹ کریں
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

نئے جوڑے کی معلومات کو حالت کے متغیرات میں محفوظ کریں اور دنیا کو نئے پیئر ایکسچینج کے بارے میں مطلع کرنے کے لیے ایک ایونٹ خارج کریں۔

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

یہ دو فنکشنز `feeSetter` کو فیس وصول کنندہ (اگر کوئی ہو) کو کنٹرول کرنے، اور `feeSetter` کو ایک نئے پتے پر تبدیل کرنے کی اجازت دیتے ہیں۔

### UniswapV2ERC20.sol {#trade}

[یہ کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) <span dir="ltr">ERC-20</span> سیالیت کے ٹوکن کو نافذ کرتا ہے۔ یہ [اوپن زیپلن <span dir="ltr">ERC-20</span> کنٹریکٹ](/developers/tutorials/erc20-annotated-code) سے ملتا جلتا ہے، اس لیے میں صرف اس حصے کی وضاحت کروں گا جو مختلف ہے، یعنی `permit` فعالیت۔

ایتھیریم پر ٹرانزیکشنز پر ایتھر (ETH) لاگت آتی ہے، جو حقیقی رقم کے برابر ہے۔ اگر آپ کے پاس <span dir="ltr">ERC-20</span> ٹوکنز ہیں لیکن ETH نہیں ہے، تو آپ ٹرانزیکشنز نہیں بھیج سکتے، اس لیے آپ ان کے ساتھ کچھ نہیں کر سکتے۔ اس مسئلے سے بچنے کا ایک حل [میٹا ٹرانزیکشنز (meta-transactions)](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions) ہے۔
ٹوکنز کا مالک ایک ٹرانزیکشن پر دستخط کرتا ہے جو کسی اور کو آف چین ٹوکنز نکالنے کی اجازت دیتا ہے اور اسے انٹرنیٹ کا استعمال کرتے ہوئے وصول کنندہ کو بھیجتا ہے۔ وصول کنندہ، جس کے پاس ETH ہوتا ہے، پھر مالک کی جانب سے اجازت نامہ (permit) جمع کرواتا ہے۔

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

یہ ہیش [ٹرانزیکشن کی قسم کے لیے شناخت کنندہ](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash) ہے۔ ہم یہاں صرف ان پیرامیٹرز کے ساتھ `Permit` کو سپورٹ کرتے ہیں۔

```solidity
    mapping(address => uint) public nonces;
```

وصول کنندہ کے لیے ڈیجیٹل دستخط کو جعلی بنانا ممکن نہیں ہے۔ تاہم، ایک ہی ٹرانزیکشن کو دو بار بھیجنا بہت آسان ہے (یہ [ری پلے اٹیک (replay attack)](https://wikipedia.org/wiki/Replay_attack) کی ایک شکل ہے)۔ اس سے بچنے کے لیے، ہم ایک [نانس](https://wikipedia.org/wiki/Cryptographic_nonce) استعمال کرتے ہیں۔ اگر کسی نئے `Permit` کا نانس آخری استعمال شدہ سے ایک زیادہ نہیں ہے، تو ہم فرض کرتے ہیں کہ یہ غلط ہے۔

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

یہ [چین شناخت کنندہ](https://chainid.network/) کو بازیافت کرنے کا کوڈ ہے۔ یہ ایک EVM اسمبلی بولی (dialect) استعمال کرتا ہے جسے [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) کہا جاتا ہے۔ نوٹ کریں کہ Yul کے موجودہ ورژن میں آپ کو `chainid()` استعمال کرنا ہوگا، نہ کہ `chainid`۔

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

<span dir="ltr">EIP-712</span> کے لیے [ڈومین الگ کرنے والے (domain separator)](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) کا حساب لگائیں۔

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

یہ وہ فنکشن ہے جو اجازتوں کو نافذ کرتا ہے۔ یہ متعلقہ فیلڈز، اور [دستخط](https://yos.io/2018/11/16/ethereum-signatures/) کے لیے تین اسکیلر (scalar) قدروں (v، r، اور s) کو پیرامیٹرز کے طور پر وصول کرتا ہے۔

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

آخری تاریخ (deadline) کے بعد ٹرانزیکشنز قبول نہ کریں۔

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` وہ پیغام ہے جس کے ملنے کی ہم توقع کرتے ہیں۔ ہم جانتے ہیں کہ نانس کیا ہونا چاہیے، اس لیے ہمیں اسے پیرامیٹر کے طور پر حاصل کرنے کی ضرورت نہیں ہے۔

ایتھیریم دستخطی الگورتھم دستخط کرنے کے لیے <span dir="ltr">256 bits</span> حاصل کرنے کی توقع کرتا ہے، اس لیے ہم `keccak256` ہیش فنکشن استعمال کرتے ہیں۔

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

ڈائجسٹ (digest) اور دستخط سے ہم [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) کا استعمال کرتے ہوئے وہ پتہ حاصل کر سکتے ہیں جس نے اس پر دستخط کیے تھے۔

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

اگر سب کچھ ٹھیک ہے، تو اسے [ایک <span dir="ltr">ERC-20</span> منظور کرنا](https://eips.ethereum.org/EIPS/eip-20#approve) سمجھیں۔
```

## پیریفیری کنٹریکٹس

پیریفیری کنٹریکٹس یونی سویپ کے لیے <span dir="ltr">API</span> (ایپلیکیشن پروگرامنگ انٹرفیس) ہیں۔ وہ بیرونی کالز کے لیے دستیاب ہیں، چاہے وہ دیگر کنٹریکٹس سے ہوں یا لامركزی ایپلیکیشنز سے۔ آپ براہ راست کور کنٹریکٹس کو کال کر سکتے ہیں، لیکن یہ زیادہ پیچیدہ ہے اور اگر آپ غلطی کرتے ہیں تو آپ کی قدر ضائع ہو سکتی ہے۔ کور کنٹریکٹس میں صرف یہ یقینی بنانے کے لیے ٹیسٹ شامل ہوتے ہیں کہ ان کے ساتھ دھوکہ نہ ہو، کسی اور کے لیے درستگی کی جانچ (sanity checks) نہیں۔ وہ پیریفیری میں ہوتے ہیں تاکہ ضرورت کے مطابق انہیں اپ ڈیٹ کیا جا سکے۔

### UniswapV2Router01.sol

[اس کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) میں مسائل ہیں، اور اسے [مزید استعمال نہیں کیا جانا چاہیے](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)۔ خوش قسمتی سے، پیریفیری کنٹریکٹس سٹیٹ لیس (stateless) ہیں اور ان میں کوئی اثاثے نہیں ہوتے، اس لیے اسے متروک قرار دینا اور لوگوں کو اس کے متبادل، `UniswapV2Router02`، کے استعمال کا مشورہ دینا آسان ہے۔

### UniswapV2Router02.sol

زیادہ تر صورتوں میں آپ یونی سویپ کو [اس کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol) کے ذریعے استعمال کریں گے۔
آپ دیکھ سکتے ہیں کہ اسے [یہاں](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) کیسے استعمال کیا جائے۔

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

ان میں سے زیادہ تر کا ہم نے پہلے سامنا کیا ہے، یا وہ کافی واضح ہیں۔ واحد استثنا `IWETH.sol` ہے۔ یونی سویپ <span dir="ltr">v2</span> کسی بھی <span dir="ltr">ERC-20</span> ٹوکنز کے جوڑے کے تبادلے کی اجازت دیتا ہے، لیکن ایتھر (<span dir="ltr">ETH</span>) بذات خود ایک <span dir="ltr">ERC-20</span> ٹوکن نہیں ہے۔ یہ اس معیار سے پہلے کا ہے اور اسے منفرد طریقہ کار کے ذریعے منتقل کیا جاتا ہے۔ <span dir="ltr">ERC-20</span> ٹوکنز پر لاگو ہونے والے کنٹریکٹس میں <span dir="ltr">ETH</span> کے استعمال کو فعال کرنے کے لیے لوگوں نے [ریپڈ ایتھر (ڈبلیو ایتھ)](https://weth.tkn.eth.limo/) کنٹریکٹ متعارف کرایا۔ آپ اس کنٹریکٹ کو <span dir="ltr">ETH</span> بھیجتے ہیں، اور یہ آپ کو مساوی مقدار میں ریپڈ ایتھر (ڈبلیو ایتھ) ڈھال کر دیتا ہے۔ یا آپ ریپڈ ایتھر (ڈبلیو ایتھ) کو جلا سکتے ہیں، اور واپس <span dir="ltr">ETH</span> حاصل کر سکتے ہیں۔

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

راؤٹر کو یہ جاننے کی ضرورت ہوتی ہے کہ کون سی فیکٹری استعمال کرنی ہے، اور ان ٹرانزیکشنز کے لیے جن میں ریپڈ ایتھر (ڈبلیو ایتھ) کی ضرورت ہوتی ہے، کون سا ریپڈ ایتھر (ڈبلیو ایتھ) کنٹریکٹ استعمال کرنا ہے۔ یہ اقدار [ناقابلِ تبدیلی](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables) ہیں، جس کا مطلب ہے کہ انہیں صرف کنسٹرکٹر میں سیٹ کیا جا سکتا ہے۔ اس سے صارفین کو یہ اعتماد ملتا ہے کہ کوئی بھی انہیں کم ایماندار کنٹریکٹس کی طرف اشارہ کرنے کے لیے تبدیل نہیں کر سکے گا۔

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

یہ موڈیفائر اس بات کو یقینی بناتا ہے کہ وقت کی پابندی والی ٹرانزیکشنز ("اگر ہو سکے تو وقت Y سے پہلے X کریں") ان کی مقررہ مدت کے بعد نہ ہوں۔

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

کنسٹرکٹر صرف ناقابلِ تبدیلی حالت کے متغیرات (state variables) کو سیٹ کرتا ہے۔

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // صرف WETH کنٹریکٹ سے فال بیک کے ذریعے ETH قبول کریں
    }
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب ہم ریپڈ ایتھر (ڈبلیو ایتھ) کنٹریکٹ سے ٹوکنز کو واپس <span dir="ltr">ETH</span> میں ریڈیم کرتے ہیں۔ صرف وہی ریپڈ ایتھر (ڈبلیو ایتھ) کنٹریکٹ جو ہم استعمال کرتے ہیں، ایسا کرنے کا مجاز ہے۔

#### سیالیت شامل کریں

یہ فنکشنز پیئر ایکسچینج میں ٹوکنز شامل کرتے ہیں، جس سے سیالیت کا پول بڑھتا ہے۔

```solidity

    // **** سیالیت شامل کریں ****
    function _addLiquidity(
```

یہ فنکشن A اور B ٹوکنز کی اس مقدار کا حساب لگانے کے لیے استعمال ہوتا ہے جو پیئر ایکسچینج میں جمع کی جانی چاہیے۔

```solidity
        address tokenA,
        address tokenB,
```

یہ <span dir="ltr">ERC-20</span> ٹوکن کنٹریکٹس کے پتے ہیں۔

```solidity
        uint amountADesired,
        uint amountBDesired,
```

یہ وہ رقوم ہیں جو لیکویڈیٹی فراہم کنندہ جمع کرنا چاہتا ہے۔ یہ جمع کیے جانے والے A اور B کی زیادہ سے زیادہ مقداریں بھی ہیں۔

```solidity
        uint amountAMin,
        uint amountBMin
```

یہ جمع کرنے کے لیے کم از کم قابل قبول مقداریں ہیں۔ اگر ٹرانزیکشن ان مقداروں یا اس سے زیادہ کے ساتھ نہیں ہو سکتی، تو اسے ریورٹ کر دیں۔ اگر آپ یہ فیچر نہیں چاہتے ہیں، تو بس صفر درج کریں۔

لیکویڈیٹی فراہم کنندہ عام طور پر کم از کم مقدار بتاتے ہیں، کیونکہ وہ ٹرانزیکشن کو موجودہ شرح تبادلہ کے قریب محدود کرنا چاہتے ہیں۔ اگر شرح تبادلہ میں بہت زیادہ اتار چڑھاؤ آتا ہے تو اس کا مطلب ایسی خبریں ہو سکتی ہیں جو بنیادی اقدار کو تبدیل کر دیں، اور وہ دستی طور پر فیصلہ کرنا چاہتے ہیں کہ کیا کرنا ہے۔

مثال کے طور پر، ایک ایسی صورتحال کا تصور کریں جہاں شرح تبادلہ ایک کے بدلے ایک ہو اور لیکویڈیٹی فراہم کنندہ یہ اقدار بتاتا ہے:

| پیرامیٹر | قدر |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

جب تک شرح تبادلہ <span dir="ltr">0.9</span> اور <span dir="ltr">1.25</span> کے درمیان رہتی ہے، ٹرانزیکشن مکمل ہو جاتی ہے۔ اگر شرح تبادلہ اس حد سے باہر ہو جاتی ہے، تو ٹرانزیکشن منسوخ ہو جاتی ہے۔

اس احتیاط کی وجہ یہ ہے کہ ٹرانزیکشنز فوری نہیں ہوتیں، آپ انہیں جمع کراتے ہیں اور بالآخر ایک توثیق کار انہیں ایک بلاک میں شامل کرے گا (جب تک کہ آپ کی گیس کی قیمت بہت کم نہ ہو، اس صورت میں آپ کو اسے اوور رائٹ کرنے کے لیے اسی نانس اور زیادہ گیس کی قیمت کے ساتھ ایک اور ٹرانزیکشن جمع کرانی ہوگی)۔ آپ جمع کرانے اور شامل ہونے کے درمیانی وقفے کے دوران ہونے والے واقعات کو کنٹرول نہیں کر سکتے۔

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

یہ فنکشن وہ مقداریں واپس کرتا ہے جو لیکویڈیٹی فراہم کنندہ کو جمع کرانی چاہئیں تاکہ ذخائر کے درمیان موجودہ تناسب کے برابر تناسب برقرار رہے۔

```solidity
        // اگر جوڑا ابھی تک موجود نہیں ہے تو اسے بنائیں
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

اگر اس ٹوکن جوڑے کے لیے ابھی تک کوئی ایکسچینج نہیں ہے، تو اسے بنائیں۔

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

جوڑے میں موجودہ ذخائر حاصل کریں۔

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

اگر موجودہ ذخائر خالی ہیں تو یہ ایک نیا پیئر ایکسچینج ہے۔ جمع کی جانے والی مقداریں بالکل وہی ہونی چاہئیں جو لیکویڈیٹی فراہم کنندہ فراہم کرنا چاہتا ہے۔

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

اگر ہمیں یہ دیکھنے کی ضرورت ہے کہ مقداریں کیا ہوں گی، تو ہم [اس فنکشن](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35) کا استعمال کرتے ہوئے بہترین مقدار حاصل کرتے ہیں۔ ہم موجودہ ذخائر کے برابر تناسب چاہتے ہیں۔

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

اگر `amountBOptimal` اس مقدار سے کم ہے جو لیکویڈیٹی فراہم کنندہ جمع کرنا چاہتا ہے تو اس کا مطلب ہے کہ ٹوکن B فی الحال اس سے زیادہ قیمتی ہے جتنا لیکویڈیٹی جمع کرنے والا سوچتا ہے، اس لیے کم مقدار درکار ہے۔

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

اگر بہترین B مقدار مطلوبہ B مقدار سے زیادہ ہے تو اس کا مطلب ہے کہ B ٹوکنز فی الحال اس سے کم قیمتی ہیں جتنا لیکویڈیٹی جمع کرنے والا سوچتا ہے، اس لیے زیادہ مقدار درکار ہے۔ تاہم، مطلوبہ مقدار زیادہ سے زیادہ حد ہے، اس لیے ہم ایسا نہیں کر سکتے۔ اس کے بجائے ہم B ٹوکنز کی مطلوبہ مقدار کے لیے A ٹوکنز کی بہترین تعداد کا حساب لگاتے ہیں۔

ان سب کو ملا کر ہمیں یہ گراف ملتا ہے۔ فرض کریں کہ آپ ایک ہزار A ٹوکنز (نیلی لکیر) اور ایک ہزار B ٹوکنز (سرخ لکیر) جمع کرنے کی کوشش کر رہے ہیں۔ x محور شرح تبادلہ، <span dir="ltr">A/B</span> ہے۔ اگر <span dir="ltr">x=1</span> ہے، تو وہ قدر میں برابر ہیں اور آپ ہر ایک کے ایک ہزار جمع کرتے ہیں۔ اگر <span dir="ltr">x=2</span> ہے، تو A کی قدر B سے دوگنی ہے (آپ کو ہر A ٹوکن کے بدلے دو B ٹوکن ملتے ہیں) اس لیے آپ ایک ہزار B ٹوکن جمع کرتے ہیں، لیکن صرف <span dir="ltr">500</span> A ٹوکن۔ اگر <span dir="ltr">x=0.5</span> ہے، تو صورتحال الٹ جاتی ہے، ایک ہزار A ٹوکنز اور پانچ سو B ٹوکنز۔

![Graph](liquidityProviderDeposit.png)

آپ براہ راست کور کنٹریکٹ میں سیالیت جمع کر سکتے ہیں ([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110) کا استعمال کرتے ہوئے)، لیکن کور کنٹریکٹ صرف یہ جانچتا ہے کہ اس کے ساتھ دھوکہ تو نہیں ہو رہا، اس لیے اگر آپ کی ٹرانزیکشن جمع کرانے اور اس کے عمل میں آنے کے درمیانی وقت میں شرح تبادلہ تبدیل ہو جاتی ہے تو آپ کو قدر کھونے کا خطرہ ہوتا ہے۔ اگر آپ پیریفیری کنٹریکٹ استعمال کرتے ہیں، تو یہ اس مقدار کا حساب لگاتا ہے جو آپ کو جمع کرانی چاہیے اور اسے فوری طور پر جمع کر دیتا ہے، اس لیے شرح تبادلہ تبدیل نہیں ہوتی اور آپ کا کچھ ضائع نہیں ہوتا۔

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

سیالیت جمع کرنے کے لیے اس فنکشن کو ٹرانزیکشن کے ذریعے کال کیا جا سکتا ہے۔ زیادہ تر پیرامیٹرز اوپر دیے گئے `_addLiquidity` کی طرح ہی ہیں، سوائے دو استثنیات کے:

. `to` وہ پتہ ہے جسے پول میں لیکویڈیٹی فراہم کنندہ کا حصہ ظاہر کرنے کے لیے نئے سیالیت کے ٹوکنز ڈھال کر ملتے ہیں
. `deadline` ٹرانزیکشن پر وقت کی حد ہے

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

ہم اصل میں جمع کی جانے والی مقداروں کا حساب لگاتے ہیں اور پھر سیالیت کا پول کا پتہ تلاش کرتے ہیں۔ گیس بچانے کے لیے ہم فیکٹری سے پوچھ کر ایسا نہیں کرتے، بلکہ لائبریری فنکشن `pairFor` کا استعمال کرتے ہیں (نیچے لائبریریوں میں دیکھیں)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

صارف سے ٹوکنز کی درست مقدار پیئر ایکسچینج میں منتقل کریں۔

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

اس کے بدلے میں `to` پتے کو پول کی جزوی ملکیت کے لیے سیالیت کے ٹوکنز دیں۔ کور کنٹریکٹ کا `mint` فنکشن دیکھتا ہے کہ اس کے پاس کتنے اضافی ٹوکنز ہیں (اس کے مقابلے میں جو پچھلی بار سیالیت تبدیل ہونے پر اس کے پاس تھے) اور اسی کے مطابق سیالیت ڈھالتا ہے۔

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

جب کوئی لیکویڈیٹی فراہم کنندہ ٹوکن/<span dir="ltr">ETH</span> پیئر ایکسچینج کو سیالیت فراہم کرنا چاہتا ہے، تو کچھ اختلافات ہوتے ہیں۔ کنٹریکٹ لیکویڈیٹی فراہم کنندہ کے لیے <span dir="ltr">ETH</span> کو ریپ کرنے کا کام سنبھالتا ہے۔ یہ بتانے کی ضرورت نہیں ہے کہ صارف کتنے <span dir="ltr">ETH</span> جمع کرنا چاہتا ہے، کیونکہ صارف انہیں صرف ٹرانزیکشن کے ساتھ بھیجتا ہے (یہ مقدار `msg.value` میں دستیاب ہوتی ہے)۔

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

<span dir="ltr">ETH</span> جمع کرنے کے لیے کنٹریکٹ پہلے اسے ریپڈ ایتھر (ڈبلیو ایتھ) میں ریپ کرتا ہے اور پھر ریپڈ ایتھر (ڈبلیو ایتھ) کو جوڑے میں منتقل کرتا ہے۔ غور کریں کہ منتقلی کو `assert` میں ریپ کیا گیا ہے۔ اس کا مطلب یہ ہے کہ اگر منتقلی ناکام ہو جاتی ہے تو یہ کنٹریکٹ کال بھی ناکام ہو جاتی ہے، اور اس لیے ریپنگ حقیقت میں نہیں ہوتی۔

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // ڈسٹ eth ریفنڈ کریں، اگر کوئی ہو
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

صارف ہمیں پہلے ہی <span dir="ltr">ETH</span> بھیج چکا ہے، اس لیے اگر کوئی اضافی رقم بچ جاتی ہے (کیونکہ دوسرا ٹوکن صارف کی سوچ سے کم قیمتی ہے)، تو ہمیں ریفنڈ جاری کرنے کی ضرورت ہے۔

#### سیالیت ہٹائیں

یہ فنکشنز سیالیت کو ہٹا دیں گے اور لیکویڈیٹی فراہم کنندہ کو ادائیگی کریں گے۔

```solidity
    // **** سیالیت ہٹائیں ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

سیالیت ہٹانے کا سب سے آسان کیس۔ ہر ٹوکن کی ایک کم از کم مقدار ہوتی ہے جسے لیکویڈیٹی فراہم کنندہ قبول کرنے پر راضی ہوتا ہے، اور یہ ڈیڈ لائن سے پہلے ہونا چاہیے۔

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // جوڑے کو سیالیت بھیجیں
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

کور کنٹریکٹ کا `burn` فنکشن صارف کو ٹوکنز واپس کرنے کا کام سنبھالتا ہے۔

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

جب کوئی فنکشن متعدد اقدار واپس کرتا ہے، لیکن ہمیں ان میں سے صرف کچھ میں دلچسپی ہوتی ہے، تو ہم اس طرح صرف وہی اقدار حاصل کرتے ہیں۔ گیس کے لحاظ سے یہ کسی قدر کو پڑھنے اور اسے کبھی استعمال نہ کرنے سے کچھ سستا ہے۔

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

مقداروں کو اس طریقے سے تبدیل کریں جس طرح کور کنٹریکٹ انہیں واپس کرتا ہے (نچلے پتے والا ٹوکن پہلے) اس طریقے میں جس کی صارف توقع کرتا ہے (`tokenA` اور `tokenB` کے مطابق)۔

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

پہلے منتقلی کرنا اور پھر اس کے جائز ہونے کی تصدیق کرنا ٹھیک ہے، کیونکہ اگر ایسا نہیں ہے تو ہم تمام حالت کی تبدیلیوں کو ریورٹ کر دیں گے۔

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

<span dir="ltr">ETH</span> کے لیے سیالیت ہٹانا تقریباً یکساں ہے، سوائے اس کے کہ ہم ریپڈ ایتھر (ڈبلیو ایتھ) ٹوکنز وصول کرتے ہیں اور پھر انہیں <span dir="ltr">ETH</span> کے لیے ریڈیم کرتے ہیں تاکہ لیکویڈیٹی فراہم کنندہ کو واپس دے سکیں۔

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes<span dir="ltr">32 s</span>
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes<span dir="ltr">32 s</span>
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

یہ فنکشنز میٹا ٹرانزیکشنز کو ریلے کرتے ہیں تاکہ ایتھر کے بغیر صارفین کو [پرمٹ میکانزم](#uniswapv2erc20) کا استعمال کرتے ہوئے پول سے انخلا کی اجازت مل سکے۔

```solidity

    // **** سیالیت ہٹائیں (fee-on-transfer ٹوکنز کو سپورٹ کرتے ہوئے) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

یہ فنکشن ان ٹوکنز کے لیے استعمال کیا جا سکتا ہے جن کی منتقلی یا سٹوریج کی فیس ہوتی ہے۔ جب کسی ٹوکن کی ایسی فیس ہوتی ہے تو ہم یہ بتانے کے لیے `removeLiquidity` فنکشن پر انحصار نہیں کر سکتے کہ ہمیں کتنا ٹوکن واپس ملتا ہے، اس لیے ہمیں پہلے انخلا کرنا ہوگا اور پھر بیلنس حاصل کرنا ہوگا۔

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes<span dir="ltr">32 s</span>
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

آخری فنکشن سٹوریج فیس کو میٹا ٹرانزیکشنز کے ساتھ ملاتا ہے۔

#### ٹریڈ

```solidity
    // **** تبادلہ ****
    // اس کے لیے ضروری ہے کہ ابتدائی رقم پہلے ہی پہلے جوڑے کو بھیجی جا چکی ہو
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

یہ فنکشن وہ اندرونی پروسیسنگ انجام دیتا ہے جو ان فنکشنز کے لیے درکار ہوتی ہے جو ٹریڈرز کے لیے ظاہر کیے جاتے ہیں۔

```solidity
        for (uint i; i < path.length - 1; i++) {
```

جب میں یہ لکھ رہا ہوں تو [<span dir="ltr">388,160</span> <span dir="ltr">ERC-20</span> ٹوکنز](https://eth.blockscout.com/tokens) موجود ہیں۔ اگر ہر ٹوکن جوڑے کے لیے ایک پیئر ایکسچینج ہوتا، تو یہ <span dir="ltr">150</span> بلین سے زیادہ پیئر ایکسچینجز ہوتے۔ اس وقت پوری چین میں [اکاؤنٹس کی تعداد اس کا صرف <span dir="ltr">0.1%</span> ہے](https://eth.blockscout.com/stats/accountsGrowth)۔ اس کے بجائے، تبادلہ فنکشنز ایک راستے (path) کے تصور کی حمایت کرتے ہیں۔ ایک ٹریڈر A کا B سے، B کا C سے، اور C کا D سے تبادلہ کر سکتا ہے، اس لیے براہ راست A-D پیئر ایکسچینج کی کوئی ضرورت نہیں ہے۔

ان مارکیٹوں میں قیمتیں ہم آہنگ (synchronized) ہوتی ہیں، کیونکہ جب وہ ہم آہنگ نہیں ہوتیں تو یہ آربٹریج (arbitrage) کا موقع پیدا کرتی ہیں۔ مثال کے طور پر، تین ٹوکنز A، B، اور C کا تصور کریں۔ تین پیئر ایکسچینجز ہیں، ہر جوڑے کے لیے ایک۔

1. ابتدائی صورتحال
2. ایک ٹریڈر <span dir="ltr">24.695</span> A ٹوکنز فروخت کرتا ہے اور <span dir="ltr">25.305</span> B ٹوکنز حاصل کرتا ہے۔
3. ٹریڈر <span dir="ltr">25.305</span> C ٹوکنز کے لیے <span dir="ltr">24.695</span> B ٹوکنز فروخت کرتا ہے، اور تقریباً <span dir="ltr">0.61</span> B ٹوکنز منافع کے طور پر رکھتا ہے۔
4. پھر ٹریڈر <span dir="ltr">25.305</span> A ٹوکنز کے لیے <span dir="ltr">24.695</span> C ٹوکنز فروخت کرتا ہے، اور تقریباً <span dir="ltr">0.61</span> C ٹوکنز منافع کے طور پر رکھتا ہے۔ ٹریڈر کے پاس <span dir="ltr">0.61</span> اضافی A ٹوکنز بھی ہوتے ہیں (وہ <span dir="ltr">25.305</span> جو ٹریڈر کے پاس آخر میں بچتے ہیں، مائنس <span dir="ltr">24.695</span> کی اصل سرمایہ کاری)۔

| مرحلہ | A-B ایکسچینج | B-C ایکسچینج | A-C ایکسچینج |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1 | <span dir="ltr">A:1000 B:1050 A/B=1.05</span> | <span dir="ltr">B:1000 C:1050 B/C=1.05</span> | <span dir="ltr">A:1050 C:1000 C/A=1.05</span> |
| 2 | <span dir="ltr">A:1024.695 B:1024.695 A/B=1</span> | <span dir="ltr">B:1000 C:1050 B/C=1.05</span> | <span dir="ltr">A:1050 C:1000 C/A=1.05</span> |
| 3 | <span dir="ltr">A:1024.695 B:1024.695 A/B=1</span> | <span dir="ltr">B:1024.695 C:1024.695 B/C=1</span> | <span dir="ltr">A:1050 C:1000 C/A=1.05</span> |
| 4 | <span dir="ltr">A:1024.695 B:1024.695 A/B=1</span> | <span dir="ltr">B:1024.695 C:1024.695 B/C=1</span> | <span dir="ltr">A:1024.695 C:1024.695 C/A=1</span> |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

وہ جوڑا حاصل کریں جسے ہم فی الحال ہینڈل کر رہے ہیں، اسے ترتیب دیں (جوڑے کے ساتھ استعمال کے لیے) اور متوقع آؤٹ پٹ مقدار حاصل کریں۔

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

متوقع آؤٹ پٹ مقداریں حاصل کریں، اس طرح ترتیب دی گئی ہیں جس طرح پیئر ایکسچینج ان کی توقع کرتا ہے۔

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

کیا یہ آخری ایکسچینج ہے؟ اگر ایسا ہے تو، ٹریڈ کے لیے موصول ہونے والے ٹوکنز کو منزل پر بھیجیں۔ اگر نہیں، تو اسے اگلے پیئر ایکسچینج میں بھیجیں۔

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

ٹوکنز کا تبادلہ کرنے کے لیے اصل میں پیئر ایکسچینج کو کال کریں۔ ہمیں ایکسچینج کے بارے میں بتانے کے لیے کال بیک کی ضرورت نہیں ہے، اس لیے ہم اس فیلڈ میں کوئی بائٹس نہیں بھیجتے۔

```solidity
    function swapExactTokensForTokens(
```

یہ فنکشن ٹریڈرز کے ذریعے براہ راست ایک ٹوکن کا دوسرے سے تبادلہ کرنے کے لیے استعمال ہوتا ہے۔

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

اس پیرامیٹر میں <span dir="ltr">ERC-20</span> کنٹریکٹس کے پتے شامل ہیں۔ جیسا کہ اوپر وضاحت کی گئی ہے، یہ ایک سرنی (array) ہے کیونکہ آپ کو اپنے موجودہ اثاثے سے مطلوبہ اثاثے تک پہنچنے کے لیے کئی پیئر ایکسچینجز سے گزرنا پڑ سکتا ہے۔

<span dir="ltr">Solidity</span> میں ایک فنکشن پیرامیٹر کو یا تو `memory` میں یا `calldata` میں محفوظ کیا جا سکتا ہے۔ اگر فنکشن کنٹریکٹ کا انٹری پوائنٹ ہے، جسے براہ راست صارف (ٹرانزیکشن کا استعمال کرتے ہوئے) یا کسی مختلف کنٹریکٹ سے کال کیا جاتا ہے، تو پیرامیٹر کی قدر براہ راست کال ڈیٹا سے لی جا سکتی ہے۔ اگر فنکشن کو اندرونی طور پر کال کیا جاتا ہے، جیسا کہ اوپر `_swap`، تو پیرامیٹرز کو `memory` میں محفوظ کرنا ہوگا۔ کال کیے گئے کنٹریکٹ کے نقطہ نظر سے `calldata` صرف پڑھنے کے لیے (read only) ہے۔

سکیلر اقسام جیسے `uint` یا `address` کے ساتھ کمپائلر ہمارے لیے سٹوریج کے انتخاب کو سنبھالتا ہے، لیکن سرنیوں (arrays) کے ساتھ، جو لمبی اور زیادہ مہنگی ہوتی ہیں، ہم استعمال ہونے والی سٹوریج کی قسم بتاتے ہیں۔

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

واپسی کی اقدار (Return values) ہمیشہ میموری میں واپس کی جاتی ہیں۔

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

ہر تبادلے میں خریدی جانے والی مقدار کا حساب لگائیں۔ اگر نتیجہ اس کم از کم مقدار سے کم ہے جسے ٹریڈر قبول کرنے کے لیے تیار ہے، تو ٹرانزیکشن کو ریورٹ کر دیں۔

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

آخر میں، ابتدائی <span dir="ltr">ERC-20</span> ٹوکن کو پہلے پیئر ایکسچینج کے اکاؤنٹ میں منتقل کریں اور `_swap` کو کال کریں۔ یہ سب ایک ہی ٹرانزیکشن میں ہو رہا ہے، اس لیے پیئر ایکسچینج جانتا ہے کہ کوئی بھی غیر متوقع ٹوکنز اس منتقلی کا حصہ ہیں۔

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

پچھلا فنکشن، `swapTokensForTokens`، ٹریڈر کو ان پٹ ٹوکنز کی صحیح تعداد بتانے کی اجازت دیتا ہے جو وہ دینے کے لیے تیار ہے اور آؤٹ پٹ ٹوکنز کی کم از کم تعداد جو وہ بدلے میں وصول کرنے کے لیے تیار ہے۔ یہ فنکشن الٹا تبادلہ کرتا ہے، یہ ٹریڈر کو آؤٹ پٹ ٹوکنز کی وہ تعداد بتانے دیتا ہے جو وہ چاہتا ہے، اور ان پٹ ٹوکنز کی زیادہ سے زیادہ تعداد جو وہ ان کے لیے ادا کرنے کو تیار ہے۔

دونوں صورتوں میں، ٹریڈر کو پہلے اس پیریفیری کنٹریکٹ کو ایک الاؤنس دینا ہوگا تاکہ اسے منتقل کرنے کی اجازت مل سکے۔

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // ڈسٹ eth ریفنڈ کریں، اگر کوئی ہو
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

ان چاروں اقسام میں <span dir="ltr">ETH</span> اور ٹوکنز کے درمیان ٹریڈنگ شامل ہے۔ واحد فرق یہ ہے کہ ہم یا تو ٹریڈر سے <span dir="ltr">ETH</span> وصول کرتے ہیں اور اسے ریپڈ ایتھر (ڈبلیو ایتھ) ڈھالنے کے لیے استعمال کرتے ہیں، یا ہم راستے کے آخری ایکسچینج سے ریپڈ ایتھر (ڈبلیو ایتھ) وصول کرتے ہیں اور اسے جلا دیتے ہیں، اور ٹریڈر کو نتیجے میں ملنے والا <span dir="ltr">ETH</span> واپس بھیج دیتے ہیں۔

```solidity
    // **** تبادلہ (fee-on-transfer ٹوکنز کو سپورٹ کرتے ہوئے) ****
    // اس کے لیے ضروری ہے کہ ابتدائی رقم پہلے ہی پہلے جوڑے کو بھیجی جا چکی ہو
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

یہ ان ٹوکنز کا تبادلہ کرنے کا اندرونی فنکشن ہے جن کی منتقلی یا سٹوریج کی فیس ہوتی ہے تاکہ ([اس مسئلے](https://github.com/Uniswap/uniswap-interface/issues/835)) کو حل کیا جا سکے۔

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // stack too deep ایررز سے بچنے کے لیے اسکوپ
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

منتقلی کی فیس کی وجہ سے ہم یہ بتانے کے لیے `getAmountsOut` فنکشن پر انحصار نہیں کر سکتے کہ ہمیں ہر منتقلی سے کتنا ملتا ہے (جس طرح ہم اصل `_swap` کو کال کرنے سے پہلے کرتے ہیں)۔ اس کے بجائے ہمیں پہلے منتقل کرنا ہوگا اور پھر دیکھنا ہوگا کہ ہمیں کتنے ٹوکنز واپس ملے۔

نوٹ: نظریاتی طور پر ہم `_swap` کے بجائے صرف اس فنکشن کو استعمال کر سکتے ہیں، لیکن بعض صورتوں میں (مثال کے طور پر، اگر منتقلی بالآخر ریورٹ ہو جاتی ہے کیونکہ مطلوبہ کم از کم حد کو پورا کرنے کے لیے آخر میں کافی نہیں ہے) تو اس پر زیادہ گیس خرچ ہوگی۔ ٹرانسفر فیس والے ٹوکنز کافی نایاب ہیں، اس لیے اگرچہ ہمیں انہیں ایڈجسٹ کرنے کی ضرورت ہے لیکن تمام تبادلوں کے لیے یہ فرض کرنے کی ضرورت نہیں ہے کہ وہ ان میں سے کم از کم ایک سے گزرتے ہیں۔

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

یہ وہی اقسام ہیں جو عام ٹوکنز کے لیے استعمال ہوتی ہیں، لیکن وہ اس کے بجائے `_swapSupportingFeeOnTransferTokens` کو کال کرتی ہیں۔

```solidity
    // **** لائبریری فنکشنز ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

یہ فنکشنز صرف پراکسیز ہیں جو [UniswapV2Library فنکشنز](#uniswapv2library) کو کال کرتے ہیں۔

### UniswapV2Migrator.sol

یہ کنٹریکٹ پرانے <span dir="ltr">v1</span> سے <span dir="ltr">v2</span> میں ایکسچینجز کو منتقل کرنے کے لیے استعمال کیا گیا تھا۔ اب چونکہ وہ منتقل ہو چکے ہیں، اس لیے یہ مزید متعلقہ نہیں رہا۔

## لائبریریاں

[SafeMath لائبریری](https://docs.openzeppelin.com/contracts/2.x/api/math) کی دستاویزات بہت اچھی طرح سے موجود ہیں، اس لیے اسے یہاں دستاویزی شکل دینے کی ضرورت نہیں ہے۔

### Math

اس لائبریری میں کچھ ریاضی کے فنکشنز شامل ہیں جن کی عام طور پر Solidity کوڈ میں ضرورت نہیں ہوتی، اس لیے وہ زبان کا حصہ نہیں ہیں۔

```solidity
pragma solidity =0.5.16;

// ریاضی کے مختلف آپریشنز انجام دینے کے لیے ایک لائبریری

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // بابل کا طریقہ (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

<span dir="ltr">x</span> کے ساتھ ایک تخمینے کے طور پر شروع کریں جو مربع جزر (square root) سے زیادہ ہو (یہی وجہ ہے کہ ہمیں <span dir="ltr">1-3</span> کو خاص صورتوں کے طور پر دیکھنے کی ضرورت ہے)۔

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

ایک قریب ترین تخمینہ حاصل کریں، جو پچھلے تخمینے اور اس عدد کا اوسط ہو جس کا مربع جزر ہم تلاش کرنے کی کوشش کر رہے ہیں، جسے پچھلے تخمینے سے تقسیم کیا گیا ہو۔ اسے تب تک دہرائیں جب تک کہ نیا تخمینہ موجودہ تخمینے سے کم نہ ہو۔ مزید تفصیلات کے لیے، [یہاں دیکھیں](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)۔

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

ہمیں کبھی بھی صفر کے مربع جزر کی ضرورت نہیں ہونی چاہیے۔ ایک، دو، اور تین کے مربع جزر تقریباً ایک ہوتے ہیں (ہم انٹیجرز کا استعمال کرتے ہیں، اس لیے ہم کسر (fraction) کو نظر انداز کر دیتے ہیں)۔

```solidity
        }
    }
}
```

### فکسڈ پوائنٹ فریکشنز (<span dir="ltr">UQ112x112</span>)

یہ لائبریری کسروں (fractions) کو ہینڈل کرتی ہے، جو عام طور پر ایتھیریم کے حساب کتاب کا حصہ نہیں ہوتیں۔ یہ عدد _x_ کو <span dir="ltr">_x\*2^112_</span> کے طور پر انکوڈ کر کے ایسا کرتی ہے۔ اس سے ہم اصل اضافے (addition) اور تفریق (subtraction) کے آپ کوڈز کو بغیر کسی تبدیلی کے استعمال کر سکتے ہیں۔

```solidity
pragma solidity =0.5.16;

// بائنری فکسڈ پوائنٹ نمبرز کو ہینڈل کرنے کے لیے ایک لائبریری (https://wikipedia.org/wiki/Q_(number_format))

// رینج: [0, 2**112 - 1]
// ریزولوشن: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` ایک کے لیے انکوڈنگ ہے۔

```solidity
    // uint112 کو UQ112x112 کے طور پر انکوڈ کریں
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // کبھی اوور فلو نہیں ہوتا
    }
```

چونکہ y `uint112` ہے، اس لیے یہ زیادہ سے زیادہ <span dir="ltr">2^112-1</span> ہو سکتا ہے۔ اس عدد کو اب بھی `UQ112x112` کے طور پر انکوڈ کیا جا سکتا ہے۔

```solidity
    // UQ112x112 کو uint112 سے تقسیم کریں، جو UQ112x112 واپس کرتا ہے
    function uqdiv(uint<span dir="ltr">224 x</span>, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

اگر ہم دو `UQ112x112` ویلیوز کو تقسیم کرتے ہیں، تو نتیجہ مزید <span dir="ltr">2^112</span> سے ضرب نہیں کھاتا۔ اس لیے اس کے بجائے ہم ڈینومینیٹر (denominator) کے لیے ایک انٹیجر لیتے ہیں۔ ہمیں ضرب کرنے کے لیے بھی اسی طرح کی ترکیب استعمال کرنے کی ضرورت پڑتی، لیکن ہمیں `UQ112x112` ویلیوز کی ضرب کرنے کی ضرورت نہیں ہے۔

### UniswapV2Library

یہ لائبریری صرف پیریفری (periphery) کنٹریکٹس کے ذریعے استعمال ہوتی ہے

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // ترتیب شدہ ٹوکن کے پتے واپس کرتا ہے، اس ترتیب میں ترتیب دیے گئے جوڑوں سے واپسی کی قدروں کو ہینڈل کرنے کے لیے استعمال ہوتا ہے
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

دونوں ٹوکنز کو پتے کے لحاظ سے ترتیب دیں، تاکہ ہم ان کے لیے پیئر ایکسچینج (pair exchange) کا پتہ حاصل کر سکیں۔ یہ ضروری ہے کیونکہ بصورت دیگر ہمارے پاس دو امکانات ہوں گے، ایک پیرامیٹرز <span dir="ltr">A,B</span> کے لیے اور دوسرا پیرامیٹرز <span dir="ltr">B,A</span> کے لیے، جس کی وجہ سے ایک کے بجائے دو ایکسچینجز بن جائیں گے۔

```solidity
    // کسی بھی بیرونی کال کے بغیر جوڑے کے لیے CREATE2 پتہ کا حساب لگاتا ہے
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init کوڈ ہیش
            ))));
    }
```

یہ فنکشن دونوں ٹوکنز کے لیے پیئر ایکسچینج کے پتے کا حساب لگاتا ہے۔ یہ کنٹریکٹ [<span dir="ltr">CREATE2</span> آپ کوڈ](https://eips.ethereum.org/EIPS/eip-1014) کا استعمال کرتے ہوئے بنایا گیا ہے، اس لیے اگر ہم اس کے استعمال کردہ پیرامیٹرز کو جانتے ہوں تو ہم اسی الگورتھم کا استعمال کرتے ہوئے پتے کا حساب لگا سکتے ہیں۔ یہ فیکٹری سے پوچھنے کی نسبت بہت سستا ہے، اور

```solidity
    // جوڑے کے لیے ریزرو لاتا ہے اور ترتیب دیتا ہے
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

یہ فنکشن ان دو ٹوکنز کے ریزرو (reserves) واپس کرتا ہے جو پیئر ایکسچینج کے پاس ہوتے ہیں۔ یاد رکھیں کہ یہ ٹوکنز کو کسی بھی ترتیب میں وصول کر سکتا ہے، اور انہیں اندرونی استعمال کے لیے ترتیب دیتا ہے۔

```solidity
    // کسی اثاثے کی کچھ مقدار اور جوڑے کے ریزرو دیے جانے پر، دوسرے اثاثے کی مساوی مقدار واپس کرتا ہے
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

یہ فنکشن آپ کو ٹوکن B کی وہ مقدار بتاتا ہے جو آپ کو ٹوکن A کے بدلے میں ملے گی اگر اس میں کوئی فیس شامل نہ ہو۔ یہ حساب اس بات کو مدنظر رکھتا ہے کہ منتقلی سے شرح تبادلہ (exchange rate) تبدیل ہو جاتی ہے۔

```solidity
    // کسی اثاثے کی ان پٹ مقدار اور جوڑے کے ریزرو دیے جانے پر، دوسرے اثاثے کی زیادہ سے زیادہ آؤٹ پٹ مقدار واپس کرتا ہے
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

اوپر دیا گیا `quote` فنکشن بہت اچھا کام کرتا ہے اگر پیئر ایکسچینج استعمال کرنے کی کوئی فیس نہ ہو۔ تاہم، اگر <span dir="ltr">0.3%</span> ایکسچینج فیس ہو تو آپ کو ملنے والی اصل مقدار کم ہوتی ہے۔ یہ فنکشن ایکسچینج فیس کے بعد کی مقدار کا حساب لگاتا ہے۔

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity کسروں کو مقامی طور پر ہینڈل نہیں کرتی، اس لیے ہم مقدار کو صرف <span dir="ltr">0.997</span> سے ضرب نہیں دے سکتے۔ اس کے بجائے، ہم نیومریٹر (numerator) کو <span dir="ltr">997</span> سے اور ڈینومینیٹر (denominator) کو <span dir="ltr">1000</span> سے ضرب دیتے ہیں، جس سے وہی نتیجہ حاصل ہوتا ہے۔

```solidity
    // کسی اثاثے کی آؤٹ پٹ مقدار اور جوڑے کے ریزرو دیے جانے پر، دوسرے اثاثے کی مطلوبہ ان پٹ مقدار واپس کرتا ہے
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

یہ فنکشن تقریباً وہی کام کرتا ہے، لیکن یہ آؤٹ پٹ کی مقدار حاصل کرتا ہے اور ان پٹ فراہم کرتا ہے۔

```solidity

    // کسی بھی تعداد میں جوڑوں پر زنجیر بند getAmountOut کیلکولیشنز انجام دیتا ہے
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // کسی بھی تعداد میں جوڑوں پر زنجیر بند getAmountIn کیلکولیشنز انجام دیتا ہے
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

یہ دونوں فنکشنز ان ویلیوز کی شناخت کو ہینڈل کرتے ہیں جب کئی پیئر ایکسچینجز سے گزرنا ضروری ہو۔

### ٹرانسفر ہیلپر (Transfer Helper)

[یہ لائبریری](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) ERC-20 اور ایتھیریم کی منتقلیوں کے گرد کامیابی کی جانچ کا اضافہ کرتی ہے تاکہ ایک ریورٹ اور `false` ویلیو کی واپسی کو ایک ہی طرح سے ٹریٹ کیا جا سکے۔

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// <span dir="ltr">ERC-20</span> ٹوکنز کے ساتھ تعامل کرنے اور ETH بھیجنے کے لیے ہیلپر میتھڈز جو مستقل طور پر true/false واپس نہیں کرتے ہیں
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

ہم کسی دوسرے کنٹریکٹ کو دو میں سے ایک طریقے سے کال کر سکتے ہیں:

- فنکشن کال بنانے کے لیے انٹرفیس کی تعریف کا استعمال کریں
- کال بنانے کے لیے [ایپلیکیشن بائنری انٹرفیس (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) کا "دستی" طور پر استعمال کریں۔ کوڈ کے مصنف نے یہی کرنے کا فیصلہ کیا ہے۔

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20 معیار سے پہلے بنائے گئے ٹوکنز کے ساتھ بیک ورڈ کمپیٹیبلٹی (backwards compatibility) کی خاطر، ایک ERC-20 کال یا تو ریورٹ ہو کر ناکام ہو سکتی ہے (جس صورت میں `success` `false` ہوتا ہے) یا کامیاب ہو کر `false` ویلیو واپس کر سکتی ہے (جس صورت میں آؤٹ پٹ ڈیٹا ہوتا ہے، اور اگر آپ اسے بولین (boolean) کے طور پر ڈی کوڈ کرتے ہیں تو آپ کو `false` ملتا ہے)۔

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

یہ فنکشن [ERC-20 کی منتقلی کی فعالیت](https://eips.ethereum.org/EIPS/eip-20#transfer) کو نافذ کرتا ہے، جو ایک اکاؤنٹ کو کسی دوسرے اکاؤنٹ کی طرف سے فراہم کردہ الاؤنس خرچ کرنے کی اجازت دیتا ہے۔

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

یہ فنکشن [ERC-20 کی transferFrom فعالیت](https://eips.ethereum.org/EIPS/eip-20#transferfrom) کو نافذ کرتا ہے، جو ایک اکاؤنٹ کو کسی دوسرے اکاؤنٹ کی طرف سے فراہم کردہ الاؤنس خرچ کرنے کی اجازت دیتا ہے۔

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

یہ فنکشن کسی اکاؤنٹ میں ایتھر منتقل کرتا ہے۔ کسی دوسرے کنٹریکٹ کو کی جانے والی کوئی بھی کال ایتھر بھیجنے کی کوشش کر سکتی ہے۔ چونکہ ہمیں دراصل کسی فنکشن کو کال کرنے کی ضرورت نہیں ہے، اس لیے ہم کال کے ساتھ کوئی ڈیٹا نہیں بھیجتے۔

## نتیجہ

یہ تقریباً <span dir="ltr">50</span> صفحات پر مشتمل ایک طویل مضمون ہے۔ اگر آپ یہاں تک پہنچ گئے ہیں، تو آپ کو مبارک ہو! امید ہے کہ اب تک آپ حقیقی زندگی کی ایپلی کیشن (مختصر نمونہ پروگراموں کے برعکس) لکھنے کے پہلوؤں کو سمجھ چکے ہوں گے اور اپنے استعمال کے معاملات کے لیے کنٹریکٹس لکھنے کے بہتر قابل ہو گئے ہوں گے۔

اب جائیں اور کچھ مفید لکھیں اور ہمیں حیران کر دیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔