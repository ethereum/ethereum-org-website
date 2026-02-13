---
title: "Uniswap-v2 کنٹریکٹ کا مرحلہ وار جائزہ"
description: "Uniswap-v2 کنٹریکٹ کیسے کام کرتا ہے؟ یہ اس طرح کیوں لکھا گیا ہے؟"
author: Ori Pomerantz
tags: [ "solidity" ]
skill: intermediate
published: 2021-05-01
lang: ur-in
---

## تعارف {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) کسی بھی دو ERC-20 ٹوکنز کے درمیان ایک ایکسچینج مارکیٹ بنا سکتا ہے۔ اس مضمون میں ہم ان کنٹریکٹس کے سورس کوڈ کا جائزہ لیں گے جو اس پروٹوکول کو نافذ کرتے ہیں اور دیکھیں گے کہ انہیں اس طرح کیوں لکھا گیا ہے۔

### Uniswap کیا کرتا ہے؟ {#what-does-uniswap-do}

بنیادی طور پر، دو قسم کے صارفین ہیں: لیکویڈیٹی فراہم کرنے والے اور تاجر۔

_لیکویڈیٹی فراہم کرنے والے_ پول کو وہ دو ٹوکن فراہم کرتے ہیں جن کا تبادلہ کیا جا سکتا ہے (ہم انہیں **Token0** اور **Token1** کہیں گے)۔ اس کے بدلے میں، انہیں ایک تیسرا ٹوکن ملتا ہے جو پول کی جزوی ملکیت کی نمائندگی کرتا ہے جسے _لیکویڈیٹی ٹوکن_ کہا جاتا ہے۔

_تاجر_ پول میں ایک قسم کا ٹوکن بھیجتے ہیں اور دوسرا وصول کرتے ہیں (مثال کے طور پر، **Token0** بھیجیں اور **Token1** وصول کریں) جو لیکویڈیٹی فراہم کرنے والوں کے ذریعہ فراہم کردہ پول سے ہوتا ہے۔ ایکسچینج کی شرح پول میں موجود **Token0**s اور **Token1**s کی نسبتی تعداد سے طے ہوتی ہے۔ اس کے علاوہ، پول لیکویڈیٹی پول کے لیے انعام کے طور پر ایک چھوٹا فیصد لیتا ہے۔

جب لیکویڈیٹی فراہم کرنے والے اپنے اثاثے واپس چاہتے ہیں تو وہ پول ٹوکنز کو جلا سکتے ہیں اور اپنے انعامات کے حصے سمیت اپنے ٹوکن واپس حاصل کر سکتے ہیں۔

[مزید مکمل تفصیل کے لیے یہاں کلک کریں](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/)۔

### v2 کیوں؟ v3 کیوں نہیں؟ {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) ایک اپ گریڈ ہے جو v2 کے مقابلے میں بہت زیادہ پیچیدہ ہے۔ پہلے v2 سیکھنا اور پھر v3 پر جانا آسان ہے۔

### کور کنٹریکٹس بمقابلہ پیریفری کنٹریکٹس {#contract-types}

Uniswap v2 کو دو اجزاء میں تقسیم کیا گیا ہے، ایک کور اور ایک پیریفری۔ یہ تقسیم کور کنٹریکٹس، جو اثاثے رکھتے ہیں اور اس لیے _لازمی_ طور پر محفوظ ہونے چاہئیں، کو آسان اور آڈٹ کرنے میں سہل بناتی ہے۔ تاجروں کے لیے درکار تمام اضافی فعالیت پھر پیریفری کنٹریکٹس کے ذریعے فراہم کی جا سکتی ہے۔

## ڈیٹا اور کنٹرول کے بہاؤ {#flows}

یہ ڈیٹا اور کنٹرول کا بہاؤ ہے جو اس وقت ہوتا ہے جب آپ Uniswap کے تین اہم کام انجام دیتے ہیں:

1. مختلف ٹوکنز کے درمیان تبادلہ کریں
2. مارکیٹ میں لیکویڈیٹی شامل کریں اور جوڑے کے تبادلے والے ERC-20 لیکویڈیٹی ٹوکنز کے ساتھ انعام پائیں
3. ERC-20 لیکویڈیٹی ٹوکنز کو جلائیں اور وہ ERC-20 ٹوکن واپس حاصل کریں جن کا تبادلہ جوڑے کا تبادلہ تاجروں کو کرنے کی اجازت دیتا ہے

### تبادلہ {#swap-flow}

یہ سب سے عام بہاؤ ہے، جسے تاجر استعمال کرتے ہیں:

#### کالر {#caller}

1. پیریفری اکاؤنٹ کو تبادلہ کی جانے والی رقم میں الاؤنس فراہم کریں۔
2. پیریفری کنٹریکٹ کے بہت سے تبادلے کے فنکشنز میں سے کسی ایک کو کال کریں (یہ اس بات پر منحصر ہے کہ آیا ETH شامل ہے یا نہیں، آیا تاجر جمع کرنے کے لیے ٹوکنز کی رقم یا واپس حاصل کرنے کے لیے ٹوکنز کی رقم بتاتا ہے، وغیرہ)۔
   ہر تبادلے کا فنکشن ایک `path` قبول کرتا ہے، جو کہ گزرنے کے لیے ایکسچینجز کی ایک صف ہے۔

#### پیریفری کنٹریکٹ میں (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. راستے میں ہر ایکسچینج پر تجارت کی جانے والی رقوم کی شناخت کریں۔
4. راستے پر تکرار کرتا ہے۔ راستے میں ہر ایکسچینج کے لیے یہ ان پٹ ٹوکن بھیجتا ہے اور پھر ایکسچینج کے `swap` فنکشن کو کال کرتا ہے۔
   زیادہ تر معاملات میں ٹوکنز کے لیے منزل کا پتہ راستے میں اگلا جوڑا ایکسچینج ہوتا ہے۔ آخری ایکسچینج میں یہ تاجر کی طرف سے فراہم کردہ پتہ ہوتا ہے۔

#### کور کنٹریکٹ میں (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. تصدیق کریں کہ کور کنٹریکٹ کے ساتھ دھوکہ نہیں ہو رہا ہے اور تبادلے کے بعد کافی لیکویڈیٹی برقرار رکھ سکتا ہے۔

6. دیکھیں کہ ہمارے پاس معلوم ذخائر کے علاوہ کتنے اضافی ٹوکن ہیں۔ وہ رقم ان پٹ ٹوکنز کی تعداد ہے جو ہمیں تبادلے کے لیے موصول ہوئی۔
7. آؤٹ پٹ ٹوکنز کو منزل پر بھیجیں۔
8. ریزرو کی رقوم کو اپ ڈیٹ کرنے کے لیے `_update` کو کال کریں۔

#### واپس پیریفری کنٹریکٹ میں (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. کوئی بھی ضروری صفائی کریں (مثال کے طور پر، تاجر کو بھیجنے کے لیے ETH واپس حاصل کرنے کے لیے WETH ٹوکنز کو جلائیں)

### لیکویڈیٹی شامل کریں {#add-liquidity-flow}

#### کالر {#caller-2}

1. پیریفری اکاؤنٹ کو لیکویڈیٹی پول میں شامل کی جانے والی رقوم میں الاؤنس فراہم کریں۔
2. پیریفری کنٹریکٹ کے `addLiquidity` فنکشنز میں سے کسی ایک کو کال کریں۔

#### پیریفری کنٹریکٹ میں (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. اگر ضروری ہو تو ایک نیا جوڑا ایکسچینج بنائیں
4. اگر کوئی موجودہ جوڑا ایکسچینج ہے تو، شامل کرنے کے لیے ٹوکنز کی رقم کا حساب لگائیں۔ یہ دونوں ٹوکنز کے لیے یکساں قدر ہونی چاہیے، یعنی نئے ٹوکنز کا موجودہ ٹوکنز سے وہی تناسب۔
5. چیک کریں کہ آیا رقوم قابل قبول ہیں (کال کرنے والے ایک کم از کم رقم بتا سکتے ہیں جس سے کم وہ لیکویڈیٹی شامل نہیں کرنا چاہیں گے)
6. کور کنٹریکٹ کو کال کریں۔

#### کور کنٹریکٹ میں (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. لیکویڈیٹی ٹوکنز منٹ کریں اور انہیں کالر کو بھیجیں
8. ریزرو کی رقوم کو اپ ڈیٹ کرنے کے لیے `_update` کو کال کریں۔

### لیکویڈیٹی ہٹائیں {#remove-liquidity-flow}

#### کالر {#caller-3}

1. پیریفری اکاؤنٹ کو لیکویڈیٹی ٹوکنز کا ایک الاؤنس فراہم کریں جو بنیادی ٹوکنز کے بدلے میں جلائے جائیں گے۔
2. پیریفری کنٹریکٹ کے `removeLiquidity` فنکشنز میں سے کسی ایک کو کال کریں۔

#### پیریفری کنٹریکٹ میں (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. لیکویڈیٹی ٹوکنز کو جوڑے کے ایکسچینج میں بھیجیں

#### کور کنٹریکٹ میں (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. منزل کے پتے پر جلے ہوئے ٹوکنز کے تناسب سے بنیادی ٹوکن بھیجیں۔ مثال کے طور پر اگر پول میں 1000 A ٹوکنز، 500 B ٹوکنز، اور 90 لیکویڈیٹی ٹوکنز ہیں، اور ہمیں جلانے کے لیے 9 ٹوکنز ملتے ہیں، تو ہم 10% لیکویڈیٹی ٹوکنز جلا رہے ہیں لہذا ہم صارف کو 100 A ٹوکنز اور 50 B ٹوکنز واپس بھیجتے ہیں۔
5. لیکویڈیٹی ٹوکنز کو جلائیں
6. ریزرو کی رقوم کو اپ ڈیٹ کرنے کے لیے `_update` کو کال کریں۔

## کور کنٹریکٹس {#core-contracts}

یہ وہ محفوظ کنٹریکٹس ہیں جو لیکویڈیٹی رکھتے ہیں۔

### UniswapV2Pair.sol {#UniswapV2Pair}

[یہ کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) اصل پول کو نافذ کرتا ہے جو ٹوکنز کا تبادلہ کرتا ہے۔ یہ Uniswap کی بنیادی فعالیت ہے۔

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

یہ وہ تمام انٹرفیس ہیں جن کے بارے میں کنٹریکٹ کو جاننے کی ضرورت ہے، یا تو اس لیے کہ کنٹریکٹ انہیں نافذ کرتا ہے (`IUniswapV2Pair` اور `UniswapV2ERC20`) یا اس لیے کہ یہ ان کنٹریکٹس کو کال کرتا ہے جو انہیں نافذ کرتے ہیں۔

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

یہ کنٹریکٹ `UniswapV2ERC20` سے وراثت میں ملتا ہے، جو لیکویڈیٹی ٹوکنز کے لیے ERC-20 فنکشنز فراہم کرتا ہے۔

```solidity
    using SafeMath  for uint;
```

[SafeMath لائبریری](https://docs.openzeppelin.com/contracts/2.x/api/math) اوور فلو اور انڈر فلو سے بچنے کے لیے استعمال کی جاتی ہے۔ یہ اہم ہے کیونکہ بصورت دیگر ہم ایک ایسی صورتحال میں ختم ہو سکتے ہیں جہاں ایک قدر `-1` ہونی چاہیے، لیکن اس کے بجائے `2^256-1` ہے۔

```solidity
    using UQ112x112 for uint224;
```

پول کنٹریکٹ میں بہت سے حسابات کے لیے فریکشنز (کسور) کی ضرورت ہوتی ہے۔ تاہم، EVM کے ذریعے فریکشنز کی حمایت نہیں کی جاتی ہے۔
Uniswap نے جو حل نکالا وہ یہ ہے کہ 224 بٹ کی قدریں استعمال کی جائیں، جس میں 112 بٹس انٹیجر حصے کے لیے، اور 112 بٹس فریکشن کے لیے ہوں۔ تو `1.0` کو `2^112` کے طور پر، `1.5` کو `2^112 + 2^111` کے طور پر ظاہر کیا جاتا ہے، وغیرہ۔

اس لائبریری کے بارے میں مزید تفصیلات [دستاویز میں بعد میں](#FixedPoint) دستیاب ہیں۔

#### متغیرات {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

صفر سے تقسیم کے معاملات سے بچنے کے لیے، لیکویڈیٹی ٹوکنز کی ایک کم از کم تعداد ہے جو ہمیشہ موجود رہتی ہے (لیکن اکاؤنٹ صفر کی ملکیت میں ہوتی ہے)۔ وہ تعداد **MINIMUM_LIQUIDITY** ہے، یعنی ایک ہزار۔

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

یہ ERC-20 ٹرانسفر فنکشن کے لیے ABI سلیکٹر ہے۔ یہ دو ٹوکن اکاؤنٹس میں ERC-20 ٹوکنز کو منتقل کرنے کے لیے استعمال ہوتا ہے۔

```solidity
    address public factory;
```

یہ وہ فیکٹری کنٹریکٹ ہے جس نے یہ پول بنایا ہے۔ ہر پول دو ERC-20 ٹوکنز کے درمیان ایک ایکسچینج ہے، فیکٹری ایک مرکزی نقطہ ہے جو ان تمام پولز کو جوڑتا ہے۔

```solidity
    address public token0;
    address public token1;
```

یہ ان دو قسم کے ERC-20 ٹوکنز کے کنٹریکٹس کے پتے ہیں جن کا اس پول کے ذریعے تبادلہ کیا جا سکتا ہے۔

```solidity
    uint112 private reserve0;           // ایک اسٹوریج سلاٹ استعمال کرتا ہے، getReserves کے ذریعے قابل رسائی
    uint112 private reserve1;           // ایک اسٹوریج سلاٹ استعمال کرتا ہے، getReserves کے ذریعے قابل رسائی
```

ہر ٹوکن کی قسم کے لیے پول کے پاس موجود ذخائر۔ ہم فرض کرتے ہیں کہ دونوں ایک ہی قدر کی نمائندگی کرتے ہیں، اور اس لیے ہر token0 کی قدر reserve1/reserve0 token1's کے برابر ہے۔

```solidity
    uint32  private blockTimestampLast; // ایک اسٹوریج سلاٹ استعمال کرتا ہے، getReserves کے ذریعے قابل رسائی
```

آخری بلاک کا ٹائم اسٹیمپ جس میں ایک ایکسچینج ہوا، وقت کے ساتھ ایکسچینج کی شرحوں کو ٹریک کرنے کے لیے استعمال ہوتا ہے۔

Ethereum کنٹریکٹس کے سب سے بڑے گیس کے اخراجات میں سے ایک اسٹوریج ہے، جو کنٹریکٹ کی ایک کال سے دوسری کال تک برقرار رہتا ہے۔ ہر اسٹوریج سیل 256 بٹس لمبا ہوتا ہے۔ لہذا تین متغیرات، `reserve0`، `reserve1`، اور `blockTimestampLast`، اس طرح مختص کیے گئے ہیں کہ ایک واحد اسٹوریج قدر ان تینوں کو شامل کر سکتی ہے (112+112+32=256)۔

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

یہ متغیرات ہر ٹوکن کے لیے مجموعی لاگت رکھتے ہیں (ہر ایک دوسرے کے لحاظ سے)۔ ان کا استعمال وقت کی ایک مدت کے دوران اوسط ایکسچینج کی شرح کا حساب لگانے کے لیے کیا جا سکتا ہے۔

```solidity
    uint public kLast; // reserve0 * reserve1، تازہ ترین لیکویڈیٹی ایونٹ کے فوراً بعد
```

جس طریقے سے جوڑا ایکسچینج token0 اور token1 کے درمیان ایکسچینج کی شرح کا فیصلہ کرتا ہے وہ یہ ہے کہ تجارت کے دوران دونوں ذخائر کے ضرب کو مستقل رکھا جائے۔ یہ قدر `kLast` ہے۔ یہ اس وقت تبدیل ہوتا ہے جب کوئی لیکویڈیٹی فراہم کرنے والا ٹوکن جمع کرتا ہے یا نکالتا ہے، اور یہ 0.3% مارکیٹ فیس کی وجہ سے قدرے بڑھ جاتا ہے۔

یہاں ایک سادہ مثال ہے۔ نوٹ کریں کہ سادگی کی خاطر ٹیبل میں اعشاریہ کے بعد صرف تین ہندسے ہیں، اور ہم 0.3% ٹریڈنگ فیس کو نظر انداز کرتے ہیں لہذا اعداد و شمار درست نہیں ہیں۔

| ایونٹ                                                                 |                  reserve0 |                  reserve1 | reserve0 \* reserve1 | اوسط ایکسچینج کی شرح (token1 / token0) |
| --------------------------------------------------------------------- | ------------------------: | ------------------------: | -------------------: | --------------------------------------------------------- |
| ابتدائی سیٹ اپ                                                        | 1,000.000 | 1,000.000 |            1,000,000 |                                                           |
| تاجر A 50 token0 کا تبادلہ 47.619 token1 سے کرتا ہے۔  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                     |
| تاجر B 10 token0 کا تبادلہ 8.984 token1 سے کرتا ہے۔   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                     |
| تاجر C 40 token0 کا تبادلہ 34.305 token1 سے کرتا ہے۔  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                     |
| تاجر D 100 token1 کا تبادلہ 109.01 token0 سے کرتا ہے۔ |   990.990 | 1,009.090 |            1,000,000 | 0.917                                     |
| تاجر E 10 token0 کا تبادلہ 10.079 token1 سے کرتا ہے۔  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                     |

جیسے جیسے تاجر زیادہ token0 فراہم کرتے ہیں، طلب اور رسد کی بنیاد پر token1 کی نسبتی قدر بڑھ جاتی ہے، اور اس کے برعکس۔

#### لاک {#pair-lock}

```solidity
    uint private unlocked = 1;
```

سیکیورٹی کی کمزوریوں کی ایک کلاس ہے جو [ری-انٹرینسی کے غلط استعمال](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) پر مبنی ہے۔ Uniswap کو صوابدیدی ERC-20 ٹوکنز کو منتقل کرنے کی ضرورت ہے، جس کا مطلب ہے کہ ERC-20 کنٹریکٹس کو کال کرنا جو ان کو کال کرنے والے Uniswap مارکیٹ کا غلط استعمال کرنے کی کوشش کر سکتے ہیں۔
کنٹریکٹ کے حصے کے طور پر `unlocked` متغیر رکھنے سے، ہم فنکشنز کو چلتے وقت (اسی ٹرانزیکشن کے اندر) کال کیے جانے سے روک سکتے ہیں۔

```solidity
    modifier lock() {
```

یہ فنکشن ایک [موڈیفائر](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers) ہے، ایک ایسا فنکشن جو کسی عام فنکشن کے گرد لپٹ کر اس کے رویے کو کسی طرح سے تبدیل کرتا ہے۔

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

اگر `unlocked` ایک کے برابر ہے، تو اسے صفر پر سیٹ کریں۔ اگر یہ پہلے سے ہی صفر ہے تو کال کو واپس کر دیں، اسے ناکام بنا دیں۔

```solidity
        _;
```

ایک موڈیفائر میں `_;` اصل فنکشن کال ہے (تمام پیرامیٹرز کے ساتھ)۔ یہاں اس کا مطلب ہے کہ فنکشن کال صرف اس صورت میں ہوتی ہے جب اسے کال کیا گیا تو `unlocked` ایک تھا، اور جب یہ چل رہا ہے تو `unlocked` کی قدر صفر ہے۔

```solidity
        unlocked = 1;
    }
```

مرکزی فنکشن کے واپس آنے کے بعد، لاک کو چھوڑ دیں۔

#### متفرقات فنکشنز {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

یہ فنکشن کال کرنے والوں کو ایکسچینج کی موجودہ حالت فراہم کرتا ہے۔ نوٹ کریں کہ Solidity فنکشنز [متعدد قدریں واپس کر سکتے ہیں](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values)۔

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

یہ اندرونی فنکشن ERC20 ٹوکنز کی ایک رقم کو ایکسچینج سے کسی اور کو منتقل کرتا ہے۔ `SELECTOR` بتاتا ہے کہ ہم جس فنکشن کو کال کر رہے ہیں وہ `transfer(address,uint)` ہے (اوپر تعریف دیکھیں)۔

ٹوکن فنکشن کے لیے انٹرفیس درآمد کرنے سے بچنے کے لیے، ہم [ABI فنکشنز](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions) میں سے کسی ایک کا استعمال کرکے "دستی طور پر" کال بناتے ہیں۔

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

دو طریقے ہیں جن سے ERC-20 ٹرانسفر کال ناکامی کی اطلاع دے سکتی ہے:

1. واپس کرنا۔ اگر کسی بیرونی کنٹریکٹ کی کال واپس ہو جاتی ہے، تو بولین ریٹرن ویلیو `false` ہوتی ہے۔
2. عام طور پر ختم ہو لیکن ناکامی کی اطلاع دے۔ اس صورت میں ریٹرن ویلیو بفر کی لمبائی غیر صفر ہوتی ہے، اور جب اسے بولین ویلیو کے طور پر ڈی کوڈ کیا جاتا ہے تو یہ `false` ہوتا ہے۔

اگر ان میں سے کوئی بھی حالت ہوتی ہے، تو واپس کر دیں۔

#### ایونٹس {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

یہ دونوں ایونٹس اس وقت خارج ہوتے ہیں جب کوئی لیکویڈیٹی فراہم کرنے والا یا تو لیکویڈیٹی جمع کرتا ہے (`Mint`) یا اسے نکالتا ہے (`Burn`)۔ کسی بھی صورت میں، token0 اور token1 کی رقوم جو جمع کی جاتی ہیں یا نکالی جاتی ہیں، ایونٹ کا حصہ ہیں، ساتھ ہی اس اکاؤنٹ کی شناخت بھی جس نے ہمیں کال کیا (`sender`)۔ نکالنے کی صورت میں، ایونٹ میں وہ ہدف بھی شامل ہوتا ہے جس نے ٹوکن حاصل کیے (`to`)، جو بھیجنے والے سے مختلف ہو سکتا ہے۔

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

یہ ایونٹ اس وقت خارج ہوتا ہے جب کوئی تاجر ایک ٹوکن کا دوسرے سے تبادلہ کرتا ہے۔ دوبارہ، بھیجنے والا اور منزل ایک جیسے نہیں ہو سکتے ہیں۔
ہر ٹوکن یا تو ایکسچینج کو بھیجا جا سکتا ہے، یا اس سے وصول کیا جا سکتا ہے۔

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

آخر میں، `Sync` ہر بار ٹوکن شامل یا نکالے جانے پر خارج ہوتا ہے، وجہ سے قطع نظر، تازہ ترین ریزرو معلومات (اور اس وجہ سے ایکسچینج کی شرح) فراہم کرنے کے لیے۔

#### سیٹ اپ فنکشنز {#pair-setup}

یہ فنکشنز ایک بار کال کیے جانے کے لیے ہیں جب نیا جوڑا ایکسچینج سیٹ اپ کیا جاتا ہے۔

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

کنسٹرکٹر اس بات کو یقینی بناتا ہے کہ ہم اس فیکٹری کے پتے کا ٹریک رکھیں گے جس نے جوڑا بنایا ہے۔ یہ معلومات `initialize` کے لیے اور فیکٹری فیس کے لیے (اگر کوئی موجود ہے) درکار ہے۔

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

یہ فنکشن فیکٹری (اور صرف فیکٹری) کو ان دو ERC-20 ٹوکنز کی وضاحت کرنے کی اجازت دیتا ہے جن کا یہ جوڑا تبادلہ کرے گا۔

#### اندرونی اپ ڈیٹ فنکشنز {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

یہ فنکشن ہر بار ٹوکن جمع یا نکالے جانے پر کال کیا جاتا ہے۔

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

اگر balance0 یا balance1 (uint256) uint112(-1) (=2^112-1) سے زیادہ ہے (لہذا یہ اوور فلو ہوتا ہے اور uint112 میں تبدیل ہونے پر 0 پر واپس لپیٹ جاتا ہے) تو اوور فلو کو روکنے کے لیے \_update جاری رکھنے سے انکار کریں۔ ایک عام ٹوکن کے ساتھ جسے 10^18 یونٹس میں تقسیم کیا جا سکتا ہے، اس کا مطلب ہے کہ ہر ایکسچینج ہر ٹوکن کے تقریباً 5.1\*10^15 تک محدود ہے۔ اب تک یہ کوئی مسئلہ نہیں رہا ہے۔

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

اگر گزرا ہوا وقت صفر نہیں ہے، تو اس کا مطلب ہے کہ ہم اس بلاک پر پہلی ایکسچینج ٹرانزیکشن ہیں۔ اس صورت میں، ہمیں لاگت جمع کرنے والوں کو اپ ڈیٹ کرنے کی ضرورت ہے۔

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

ہر لاگت جمع کرنے والے کو تازہ ترین لاگت (دوسرے ٹوکن کا ریزرو/اس ٹوکن کا ریزرو) کو سیکنڈ میں گزرے ہوئے وقت سے ضرب دے کر اپ ڈیٹ کیا جاتا ہے۔ اوسط قیمت حاصل کرنے کے لیے، آپ دو وقت کے نکات پر مجموعی قیمت پڑھتے ہیں اور ان کے درمیان وقت کے فرق سے تقسیم کرتے ہیں۔ مثال کے طور پر، واقعات کی اس ترتیب کو فرض کریں:

| ایونٹ                                                                              |                  reserve0 |                  reserve1 | ٹائم اسٹیمپ | حاشیہ جاتی ایکسچینج کی شرح (reserve1 / reserve0) |                                                       price0CumulativeLast |
| ---------------------------------------------------------------------------------- | ------------------------: | ------------------------: | ----------- | ------------------------------------------------------------------: | -------------------------------------------------------------------------: |
| ابتدائی سیٹ اپ                                                                     | 1,000.000 | 1,000.000 | 5,000       |                                               1.000 |                                                                          0 |
| تاجر A 50 token0 جمع کرتا ہے اور 47.619 token1 واپس حاصل کرتا ہے۔  | 1,050.000 |   952.381 | 5,020       |                                               0.907 |                                                                         20 |
| تاجر B 10 token0 جمع کرتا ہے اور 8.984 token1 واپس حاصل کرتا ہے۔   | 1,060.000 |   943.396 | 5,030       |                                               0.890 |                       20+10\*0.907 = 29.07 |
| تاجر C 40 token0 جمع کرتا ہے اور 34.305 token1 واپس حاصل کرتا ہے۔  | 1,100.000 |   909.090 | 5,100       |                                               0.826 |    29.07+70\*0.890 = 91.37 |
| تاجر D 100 token1 جمع کرتا ہے اور 109.01 token0 واپس حاصل کرتا ہے۔ |   990.990 | 1,009.090 | 5,110       |                                               1.018 |    91.37+10\*0.826 = 99.63 |
| تاجر E 10 token0 جمع کرتا ہے اور 10.079 token1 واپس حاصل کرتا ہے۔  | 1,000.990 |   999.010 | 5,150       |                                               0.998 | 99.63+40\*1.1018 = 143.702 |

فرض کریں کہ ہم 5,030 اور 5,150 کے ٹائم اسٹیمپس کے درمیان **Token0** کی اوسط قیمت کا حساب لگانا چاہتے ہیں۔ `price0Cumulative` کی قدر میں فرق 143.702-29.07=114.632 ہے۔ یہ دو منٹ (120 سیکنڈ) کے دوران اوسط ہے۔ تو اوسط قیمت 114.632/120 = 0.955 ہے۔

اس قیمت کا حساب لگانے کی وجہ یہ ہے کہ ہمیں پرانے ریزرو سائز جاننے کی ضرورت ہے۔

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

آخر میں، عالمی متغیرات کو اپ ڈیٹ کریں اور ایک `Sync` ایونٹ خارج کریں۔

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Uniswap 2.0 میں تاجر مارکیٹ کو استعمال کرنے کے لیے 0.30% فیس ادا کرتے ہیں۔ اس فیس کا زیادہ تر حصہ (تجارت کا 0.25%) ہمیشہ لیکویڈیٹی فراہم کرنے والوں کو جاتا ہے۔ بقیہ 0.05% یا تو لیکویڈیٹی فراہم کرنے والوں کو جا سکتا ہے یا فیکٹری کی طرف سے پروٹوکول فیس کے طور پر مخصوص کردہ پتے پر جا سکتا ہے، جو Uniswap کو ان کی ترقیاتی کوششوں کے لیے ادائیگی کرتا ہے۔

حسابات (اور اس لیے گیس کی لاگت) کو کم کرنے کے لیے، یہ فیس صرف اس وقت شمار کی جاتی ہے جب پول سے لیکویڈیٹی شامل کی جاتی ہے یا ہٹا دی جاتی ہے، نہ کہ ہر ٹرانزیکشن پر۔

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

فیکٹری کی فیس کی منزل پڑھیں۔ اگر یہ صفر ہے تو کوئی پروٹوکول فیس نہیں ہے اور اس فیس کا حساب لگانے کی ضرورت نہیں ہے۔

```solidity
        uint _kLast = kLast; // گیس کی بچت
```

`kLast` اسٹیٹ متغیر اسٹوریج میں واقع ہے، لہذا کنٹریکٹ پر مختلف کالز کے درمیان اس کی ایک قدر ہوگی۔
اسٹوریج تک رسائی اس اتار چڑھاؤ والی میموری تک رسائی سے کہیں زیادہ مہنگی ہے جو کنٹریکٹ پر فنکشن کال ختم ہونے پر جاری ہوتی ہے، لہذا ہم گیس بچانے کے لیے ایک اندرونی متغیر استعمال کرتے ہیں۔

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

لیکویڈیٹی فراہم کرنے والوں کو اپنا حصہ صرف ان کے لیکویڈیٹی ٹوکنز کی قدر میں اضافے سے ملتا ہے۔ لیکن پروٹوکول فیس کے لیے نئے لیکویڈیٹی ٹوکنز کو منٹ کرنے اور `feeTo` پتے پر فراہم کرنے کی ضرورت ہوتی ہے۔

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

اگر نئی لیکویڈیٹی ہے جس پر پروٹوکول فیس جمع کرنی ہے۔ آپ اس مضمون میں بعد میں [مربع روٹ فنکشن](#Math) دیکھ سکتے ہیں۔

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

فیس کا یہ پیچیدہ حساب [وائٹ پیپر](https://app.uniswap.org/whitepaper.pdf) کے صفحہ 5 پر بیان کیا گیا ہے۔ ہم جانتے ہیں کہ جس وقت `kLast` کا حساب لگایا گیا تھا اور موجودہ وقت کے درمیان کوئی لیکویڈیٹی شامل یا ہٹائی نہیں گئی تھی (کیونکہ ہم یہ حساب ہر بار لیکویڈیٹی شامل یا ہٹائے جانے پر چلاتے ہیں، اس کے اصل میں تبدیل ہونے سے پہلے)، لہذا `reserve0 * reserve1` میں کوئی بھی تبدیلی ٹرانزیکشن فیس سے آنی چاہیے (ان کے بغیر ہم `reserve0 * reserve1` کو مستقل رکھتے)۔

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

اضافی لیکویڈیٹی ٹوکنز کو اصل میں بنانے اور انہیں `feeTo` کو تفویض کرنے کے لیے `UniswapV2ERC20._mint` فنکشن کا استعمال کریں۔

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

اگر کوئی فیس مقرر نہیں ہے تو `kLast` کو صفر پر سیٹ کریں (اگر یہ پہلے سے نہیں ہے)۔ جب یہ کنٹریکٹ لکھا گیا تھا تو ایک [گیس ریفنڈ فیچر](https://eips.ethereum.org/EIPS/eip-3298) تھا جو کنٹریکٹس کو ان کے غیر ضروری اسٹوریج کو صفر کرکے Ethereum اسٹیٹ کے مجموعی سائز کو کم کرنے کی ترغیب دیتا تھا۔
یہ کوڈ جب ممکن ہو تو وہ ریفنڈ حاصل کرتا ہے۔

#### بیرونی طور پر قابل رسائی فنکشنز {#pair-external}

نوٹ کریں کہ جب کوئی بھی ٹرانزیکشن یا کنٹریکٹ ان فنکشنز کو کال _کر سکتا_ ہے، تو وہ پیریفری کنٹریکٹ سے کال کیے جانے کے لیے ڈیزائن کیے گئے ہیں۔ اگر آپ انہیں براہ راست کال کرتے ہیں تو آپ جوڑا ایکسچینج کو دھوکہ نہیں دے پائیں گے، لیکن آپ غلطی سے قدر کھو سکتے ہیں۔

##### منٹ کرنا

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب کوئی لیکویڈیٹی فراہم کرنے والا پول میں لیکویڈیٹی شامل کرتا ہے۔ یہ انعام کے طور پر اضافی لیکویڈیٹی ٹوکنز منٹ کرتا ہے۔ اسے [ایک پیریفری کنٹریکٹ](#UniswapV2Router02) سے کال کیا جانا چاہئے جو اسے اسی ٹرانزیکشن میں لیکویڈیٹی شامل کرنے کے بعد کال کرتا ہے (تاکہ کوئی اور جائز مالک سے پہلے نئی لیکویڈیٹی کا دعوی کرنے کے لئے ٹرانزیکشن جمع نہ کر سکے)۔

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // گیس کی بچت
```

یہ Solidity فنکشن کے نتائج کو پڑھنے کا طریقہ ہے جو متعدد قدریں واپس کرتا ہے۔ ہم آخری واپس کی گئی قدریں، بلاک ٹائم اسٹیمپ، کو رد کر دیتے ہیں، کیونکہ ہمیں اس کی ضرورت نہیں ہے۔

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

موجودہ بیلنس حاصل کریں اور دیکھیں کہ ہر ٹوکن کی قسم میں کتنی رقم شامل کی گئی ہے۔

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

جمع کرنے کے لیے پروٹوکول فیس کا حساب لگائیں، اگر کوئی ہے، اور اسی کے مطابق لیکویڈیٹی ٹوکنز منٹ کریں۔ چونکہ `_mintFee` کے پیرامیٹرز پرانے ریزرو ویلیوز ہیں، فیس کا حساب صرف فیس کی وجہ سے پول کی تبدیلیوں کی بنیاد پر درست طریقے سے کیا جاتا ہے۔

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

اگر یہ پہلا ڈپازٹ ہے، تو `MINIMUM_LIQUIDITY` ٹوکنز بنائیں اور انہیں لاک کرنے کے لیے صفر پتے پر بھیجیں۔ انہیں کبھی بھی چھڑایا نہیں جا سکتا، جس کا مطلب ہے کہ پول کبھی بھی مکمل طور پر خالی نہیں ہوگا (یہ ہمیں کچھ جگہوں پر صفر سے تقسیم سے بچاتا ہے)۔ `MINIMUM_LIQUIDITY` کی قدر ایک ہزار ہے، جسے یہ دیکھتے ہوئے کہ زیادہ تر ERC-20 کو ایک ٹوکن کے 10^-18 ویں حصے کی اکائیوں میں تقسیم کیا جاتا ہے، جیسا کہ ETH کو wei میں تقسیم کیا جاتا ہے، ایک واحد ٹوکن کی قدر کا 10^-15 ہے۔ زیادہ قیمت نہیں۔

پہلے ڈپازٹ کے وقت ہم دونوں ٹوکنز کی نسبتی قدر نہیں جانتے، اس لیے ہم صرف رقوم کو ضرب دیتے ہیں اور مربع روٹ لیتے ہیں، یہ فرض کرتے ہوئے کہ ڈپازٹ ہمیں دونوں ٹوکنز میں برابر قدر فراہم کرتا ہے۔

ہم اس پر بھروسہ کر سکتے ہیں کیونکہ یہ جمع کنندہ کے مفاد میں ہے کہ وہ برابر قدر فراہم کرے، تاکہ آربٹریج سے قدر کے نقصان سے بچا جا سکے۔
فرض کریں کہ دونوں ٹوکنز کی قدر یکساں ہے، لیکن ہمارے جمع کنندہ نے **Token0** کے مقابلے میں **Token1** کی چار گنا زیادہ رقم جمع کی ہے۔ ایک تاجر اس حقیقت کا استعمال کر سکتا ہے کہ جوڑا ایکسچینج سمجھتا ہے کہ **Token0** زیادہ قیمتی ہے تاکہ اس سے قدر نکالی جا سکے۔

| ایونٹ                                                                 | reserve0 | reserve1 | reserve0 \* reserve1 | پول کی قدر (reserve0 + reserve1) |
| --------------------------------------------------------------------- | -------: | -------: | -------------------: | --------------------------------------------------: |
| ابتدائی سیٹ اپ                                                        |        8 |       32 |                  256 |                                                  40 |
| تاجر 8 **Token0** ٹوکنز جمع کرتا ہے، 16 **Token1** واپس حاصل کرتا ہے۔ |       16 |       16 |                  256 |                                                  32 |

جیسا کہ آپ دیکھ سکتے ہیں، تاجر نے اضافی 8 ٹوکنز کمائے، جو پول کی قدر میں کمی سے آتے ہیں، جس سے اس کے مالک جمع کنندہ کو نقصان ہوتا ہے۔

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);

```

ہر بعد کے ڈپازٹ کے ساتھ ہم پہلے ہی دونوں اثاثوں کے درمیان ایکسچینج کی شرح جانتے ہیں، اور ہم توقع کرتے ہیں کہ لیکویڈیٹی فراہم کرنے والے دونوں میں برابر قدر فراہم کریں گے۔ اگر وہ ایسا نہیں کرتے ہیں، تو ہم انہیں سزا کے طور پر ان کی فراہم کردہ کم قدر کی بنیاد پر لیکویڈیٹی ٹوکنز دیتے ہیں۔

چاہے یہ ابتدائی ڈپازٹ ہو یا بعد کا، ہم جو لیکویڈیٹی ٹوکن فراہم کرتے ہیں وہ `reserve0*reserve1` میں تبدیلی کے مربع روٹ کے برابر ہے اور لیکویڈیٹی ٹوکن کی قدر تبدیل نہیں ہوتی ہے (جب تک کہ ہمیں کوئی ایسا ڈپازٹ نہ ملے جس میں دونوں اقسام کی برابر قدریں نہ ہوں، اس صورت میں "جرمانہ" تقسیم ہو جاتا ہے)۔ یہاں ایک اور مثال ہے جس میں دو ٹوکن ہیں جن کی قدر ایک ہی ہے، جس میں تین اچھے ڈپازٹ اور ایک خراب ڈپازٹ ہے (صرف ایک قسم کے ٹوکن کا ڈپازٹ، لہذا یہ کوئی لیکویڈیٹی ٹوکن نہیں بناتا)۔

| ایونٹ                  |                                reserve0 |                                reserve1 | reserve0 \* reserve1 | پول کی قدر (reserve0 + reserve1) | اس ڈپازٹ کے لیے منٹ کیے گئے لیکویڈیٹی ٹوکنز | کل لیکویڈیٹی ٹوکنز |               ہر لیکویڈیٹی ٹوکن کی قدر |
| ---------------------- | --------------------------------------: | --------------------------------------: | -------------------: | --------------------------------------------------: | ------------------------------------------: | -----------------: | -------------------------------------: |
| ابتدائی سیٹ اپ         |                   8.000 |                   8.000 |                   64 |                              16.000 |                                           8 |                  8 |                  2.000 |
| ہر قسم کے چار جمع کریں |                  12.000 |                  12.000 |                  144 |                              24.000 |                                           4 |                 12 |                  2.000 |
| ہر قسم کے دو جمع کریں  |                  14.000 |                  14.000 |                  196 |                              28.000 |                                           2 |                 14 |                  2.000 |
| غیر مساوی قدر کا ڈپازٹ |                  18.000 |                  14.000 |                  252 |                              32.000 |                                           0 |                 14 | ~2.286 |
| آربٹریج کے بعد         | ~15.874 | ~15.874 |                  252 |             ~31.748 |                                           0 |                 14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

اضافی لیکویڈیٹی ٹوکنز کو اصل میں بنانے اور انہیں صحیح اکاؤنٹ میں دینے کے لیے `UniswapV2ERC20._mint` فنکشن کا استعمال کریں۔

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

اسٹیٹ متغیرات (`reserve0`، `reserve1`، اور اگر ضرورت ہو تو `kLast`) کو اپ ڈیٹ کریں اور مناسب ایونٹ خارج کریں۔

##### جلانا

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب لیکویڈیٹی نکالی جاتی ہے اور مناسب لیکویڈیٹی ٹوکنز کو جلانے کی ضرورت ہوتی ہے۔
اسے [ایک پیریفری اکاؤنٹ](#UniswapV2Router02) سے بھی کال کیا جانا چاہئے۔

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

پیریفری کنٹریکٹ نے کال سے پہلے جلانے کے لیے لیکویڈیٹی کو اس کنٹریکٹ میں منتقل کر دیا۔ اس طرح ہم جانتے ہیں کہ کتنی لیکویڈیٹی جلانی ہے، اور ہم اس بات کو یقینی بنا سکتے ہیں کہ وہ جل جائے۔

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

لیکویڈیٹی فراہم کرنے والے کو دونوں ٹوکنز کی برابر قدر ملتی ہے۔ اس طرح ہم ایکسچینج کی شرح کو تبدیل نہیں کرتے ہیں۔

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

`burn` فنکشن کا بقیہ حصہ اوپر دیے گئے `mint` فنکشن کا آئینہ دار ہے۔

##### تبادلہ

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

یہ فنکشن بھی [ایک پیریفری کنٹریکٹ](#UniswapV2Router02) سے کال کیے جانے کے لیے ہے۔

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

مقامی متغیرات کو یا تو میموری میں ذخیرہ کیا جا سکتا ہے یا، اگر وہ بہت زیادہ نہ ہوں، تو براہ راست اسٹیک پر۔
اگر ہم تعداد کو محدود کر سکتے ہیں تاکہ ہم اسٹیک کا استعمال کریں تو ہم کم گیس استعمال کرتے ہیں۔ مزید تفصیلات کے لیے [یلو پیپر، رسمی Ethereum تفصیلات](https://ethereum.github.io/yellowpaper/paper.pdf)، صفحہ 26، مساوات 298 دیکھیں۔

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

یہ منتقلی پرامید ہے، کیونکہ ہم منتقلی کرتے ہیں اس سے پہلے کہ ہم اس بات کو یقینی بنائیں کہ تمام شرائط پوری ہوں۔ یہ Ethereum میں ٹھیک ہے کیونکہ اگر کال میں بعد میں شرائط پوری نہیں ہوتی ہیں تو ہم اس سے اور اس کی پیدا کردہ کسی بھی تبدیلی سے واپس ہو جاتے ہیں۔

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

اگر درخواست کی جائے تو وصول کنندہ کو تبادلے کے بارے میں مطلع کریں۔

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

موجودہ بیلنس حاصل کریں۔ پیریفری کنٹریکٹ تبادلے کے لیے ہمیں کال کرنے سے پہلے ٹوکن بھیجتا ہے۔ اس سے کنٹریکٹ کے لیے یہ جانچنا آسان ہو جاتا ہے کہ اسے دھوکہ نہیں دیا جا رہا ہے، ایک ایسی جانچ جو _لازمی_ طور پر کور کنٹریکٹ میں ہونی چاہیے (کیونکہ ہمیں ہمارے پیریفری کنٹریکٹ کے علاوہ دیگر اداروں سے بھی کال کیا جا سکتا ہے)۔

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

یہ اس بات کو یقینی بنانے کے لیے ایک عقلی جانچ ہے کہ ہم تبادلے سے محروم نہ ہوں۔ ایسی کوئی صورتحال نہیں ہے جس میں تبادلہ `reserve0*reserve1` کو کم کرے۔ یہ وہ جگہ بھی ہے جہاں ہم اس بات کو یقینی بناتے ہیں کہ تبادلے پر 0.3% کی فیس بھیجی جا رہی ہے؛ K کی قدر کی عقلی جانچ کرنے سے پہلے، ہم دونوں بیلنس کو 1000 سے ضرب دیتے ہیں جس میں سے 3 سے ضرب دی گئی رقوم کو گھٹا دیا جاتا ہے، اس کا مطلب ہے کہ 0.3% (3/1000 = 0.003 = 0.3%) بیلنس سے کٹوتی کی جا رہی ہے اس سے پہلے کہ اس کی K قدر کو موجودہ ریزرو K قدر کے ساتھ موازنہ کیا جائے۔

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0` اور `reserve1` کو اپ ڈیٹ کریں، اور اگر ضروری ہو تو قیمت جمع کرنے والوں اور ٹائم اسٹیمپ کو اپ ڈیٹ کریں اور ایک ایونٹ خارج کریں۔

##### سنک یا سکم

یہ ممکن ہے کہ حقیقی بیلنس ان ریزرو سے مطابقت سے باہر ہو جائیں جو جوڑا ایکسچینج سمجھتا ہے کہ اس کے پاس ہیں۔
کنٹریکٹ کی رضامندی کے بغیر ٹوکن نکالنے کا کوئی طریقہ نہیں ہے، لیکن ڈپازٹ ایک مختلف معاملہ ہے۔ ایک اکاؤنٹ `mint` یا `swap` کو کال کیے بغیر ایکسچینج میں ٹوکن منتقل کر سکتا ہے۔

اس صورت میں دو حل ہیں:

- `sync`، ریزرو کو موجودہ بیلنس میں اپ ڈیٹ کریں
- `skim`، اضافی رقم نکال لیں۔ نوٹ کریں کہ کسی بھی اکاؤنٹ کو `skim` کال کرنے کی اجازت ہے کیونکہ ہم نہیں جانتے کہ ٹوکن کس نے جمع کیے ہیں۔ یہ معلومات ایک ایونٹ میں خارج ہوتی ہے، لیکن ایونٹس بلاک چین سے قابل رسائی نہیں ہیں۔

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[یہ کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) جوڑا ایکسچینج بناتا ہے۔

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

یہ اسٹیٹ متغیرات پروٹوکول فیس کو نافذ کرنے کے لیے ضروری ہیں (دیکھیں [وائٹ پیپر](https://app.uniswap.org/whitepaper.pdf)، صفحہ 5)۔
`feeTo` پتہ پروٹوکول فیس کے لیے لیکویڈیٹی ٹوکنز جمع کرتا ہے، اور `feeToSetter` وہ پتہ ہے جسے `feeTo` کو ایک مختلف پتے میں تبدیل کرنے کی اجازت ہے۔

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

یہ متغیرات جوڑوں، یعنی دو ٹوکن کی اقسام کے درمیان ایکسچینجز، کا ٹریک رکھتے ہیں۔

پہلا، `getPair`، ایک میپنگ ہے جو ایک جوڑا ایکسچینج کنٹریکٹ کی شناخت ان دو ERC-20 ٹوکنز کی بنیاد پر کرتا ہے جن کا وہ تبادلہ کرتا ہے۔ ERC-20 ٹوکنز کی شناخت ان کنٹریکٹس کے پتوں سے ہوتی ہے جو انہیں نافذ کرتے ہیں، لہذا کیز اور ویلیو سب پتے ہیں۔ اس جوڑا ایکسچینج کا پتہ حاصل کرنے کے لیے جو آپ کو `tokenA` سے `tokenB` میں تبدیل کرنے کی اجازت دیتا ہے، آپ `getPair[<tokenA address>][<tokenB address>]` (یا اس کے برعکس) استعمال کرتے ہیں۔

دوسرا متغیر، `allPairs`، ایک صف ہے جس میں اس فیکٹری کے ذریعہ بنائے گئے جوڑا ایکسچینجز کے تمام پتے شامل ہیں۔ Ethereum میں آپ میپنگ کے مواد پر تکرار نہیں کر سکتے، یا تمام کیز کی فہرست حاصل نہیں کر سکتے، لہذا یہ متغیر یہ جاننے کا واحد طریقہ ہے کہ یہ فیکٹری کن ایکسچینجز کا انتظام کرتی ہے۔

نوٹ: آپ میپنگ کی تمام کیز پر تکرار کیوں نہیں کر سکتے اس کی وجہ یہ ہے کہ کنٹریکٹ ڈیٹا اسٹوریج _مہنگا_ ہے، لہذا ہم جتنا کم اسے استعمال کریں گے اتنا ہی بہتر ہے، اور ہم اسے جتنا کم تبدیل کریں گے اتنا ہی بہتر ہے۔ آپ [ایسی میپنگز بنا سکتے ہیں جو تکرار کی حمایت کرتی ہیں](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)، لیکن انہیں کیز کی فہرست کے لیے اضافی اسٹوریج کی ضرورت ہوتی ہے۔ زیادہ تر ایپلی کیشنز میں آپ کو اس کی ضرورت نہیں ہوتی ہے۔

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

یہ ایونٹ اس وقت خارج ہوتا ہے جب ایک نیا جوڑا ایکسچینج بنایا جاتا ہے۔ اس میں ٹوکنز کے پتے، جوڑا ایکسچینج کا پتہ، اور فیکٹری کے زیر انتظام ایکسچینجز کی کل تعداد شامل ہے۔

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

کنسٹرکٹر کا واحد کام `feeToSetter` کی وضاحت کرنا ہے۔ فیکٹریاں بغیر فیس کے شروع ہوتی ہیں، اور صرف `feeSetter` ہی اسے تبدیل کر سکتا ہے۔

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

یہ فنکشن ایکسچینج جوڑوں کی تعداد واپس کرتا ہے۔

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

یہ فیکٹری کا اہم کام ہے، دو ERC-20 ٹوکنز کے درمیان ایک جوڑا ایکسچینج بنانا۔ نوٹ کریں کہ کوئی بھی اس فنکشن کو کال کر سکتا ہے۔ نیا جوڑا ایکسچینج بنانے کے لیے آپ کو Uniswap سے اجازت کی ضرورت نہیں ہے۔

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

ہم چاہتے ہیں کہ نئے ایکسچینج کا پتہ متعین ہو، تاکہ اس کا حساب پہلے سے آف چین لگایا جا سکے (یہ [/developers/docs/scaling/](/developers/docs/scaling/) کے لیے مفید ہو سکتا ہے)۔
ایسا کرنے کے لیے ہمیں ٹوکن پتوں کی ایک مستقل ترتیب کی ضرورت ہے، قطع نظر اس کے کہ ہم نے انہیں کس ترتیب میں حاصل کیا ہے، لہذا ہم انہیں یہاں ترتیب دیتے ہیں۔

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

بڑے لیکویڈیٹی پول چھوٹے پولز سے بہتر ہیں، کیونکہ ان کی قیمتیں زیادہ مستحکم ہوتی ہیں۔ ہم ٹوکن کے ہر جوڑے کے لیے ایک سے زیادہ لیکویڈیٹی پول نہیں رکھنا چاہتے ہیں۔ اگر پہلے سے ہی کوئی ایکسچینج ہے، تو اسی جوڑے کے لیے دوسرا بنانے کی ضرورت نہیں ہے۔

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

نیا کنٹریکٹ بنانے کے لیے ہمیں اس کوڈ کی ضرورت ہے جو اسے بناتا ہے (کنسٹرکٹر فنکشن اور وہ کوڈ جو اصل کنٹریکٹ کے EVM بائٹ کوڈ کو میموری میں لکھتا ہے)۔ عام طور پر Solidity میں ہم صرف `addr = new <name of contract>(<constructor parameters>)` استعمال کرتے ہیں اور کمپائلر ہمارے لیے سب کچھ سنبھال لیتا ہے، لیکن ایک متعین کنٹریکٹ ایڈریس رکھنے کے لیے ہمیں [CREATE2 opcode](https://eips.ethereum.org/EIPS/eip-1014) استعمال کرنے کی ضرورت ہے۔
جب یہ کوڈ لکھا گیا تھا تو وہ opcode ابھی تک Solidity کی طرف سے تعاون یافتہ نہیں تھا، لہذا دستی طور پر کوڈ حاصل کرنا ضروری تھا۔ یہ اب کوئی مسئلہ نہیں ہے، کیونکہ [Solidity اب CREATE2 کی حمایت کرتا ہے](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2)۔

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

جب کوئی opcode ابھی تک Solidity کی طرف سے تعاون یافتہ نہیں ہے تو ہم اسے [ان لائن اسمبلی](https://docs.soliditylang.org/en/v0.8.3/assembly.html) کا استعمال کرکے کال کر سکتے ہیں۔

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

`initialize` فنکشن کو کال کریں تاکہ نئے ایکسچینج کو بتایا جا سکے کہ وہ کن دو ٹوکنز کا تبادلہ کرتا ہے۔

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

نئی جوڑی کی معلومات کو اسٹیٹ متغیرات میں محفوظ کریں اور دنیا کو نئے جوڑا ایکسچینج کے بارے میں مطلع کرنے کے لیے ایک ایونٹ خارج کریں۔

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

یہ دونوں فنکشنز `feeSetter` کو فیس وصول کنندہ (اگر کوئی ہے) کو کنٹرول کرنے، اور `feeSetter` کو ایک نئے پتے میں تبدیل کرنے کی اجازت دیتے ہیں۔

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[یہ کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) ERC-20 لیکویڈیٹی ٹوکن کو نافذ کرتا ہے۔ یہ [OpenZeppelin ERC-20 کنٹریکٹ](/developers/tutorials/erc20-annotated-code) سے ملتا جلتا ہے، لہذا میں صرف اس حصے کی وضاحت کروں گا جو مختلف ہے، یعنی `permit` کی فعالیت۔

Ethereum پر ٹرانزیکشنز پر ether (ETH) کی لاگت آتی ہے، جو حقیقی رقم کے برابر ہے۔ اگر آپ کے پاس ERC-20 ٹوکنز ہیں لیکن ETH نہیں ہے، تو آپ ٹرانزیکشنز نہیں بھیج سکتے، لہذا آپ ان کے ساتھ کچھ نہیں کر سکتے۔ اس مسئلے سے بچنے کا ایک حل [میٹا-ٹرانزیکشنز](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions) ہے۔
ٹوکنز کا مالک ایک ٹرانزیکشن پر دستخط کرتا ہے جو کسی اور کو آف چین ٹوکن نکالنے کی اجازت دیتا ہے اور اسے انٹرنیٹ کا استعمال کرکے وصول کنندہ کو بھیجتا ہے۔ وصول کنندہ، جس کے پاس ETH ہے، پھر مالک کی طرف سے اجازت نامہ جمع کرتا ہے۔

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

یہ ہیش [ٹرانزیکشن کی قسم کے لیے شناخت کنندہ](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash) ہے۔ یہاں ہم صرف `Permit` کی حمایت کرتے ہیں ان پیرامیٹرز کے ساتھ۔

```solidity
    mapping(address => uint) public nonces;
```

وصول کنندہ کے لیے ڈیجیٹل دستخط کی جعل سازی کرنا ممکن نہیں ہے۔ تاہم، ایک ہی ٹرانزیکشن کو دو بار بھیجنا معمولی بات ہے (یہ [ری پلے حملے](https://wikipedia.org/wiki/Replay_attack) کی ایک شکل ہے)۔ اس سے بچنے کے لیے، ہم [نانس](https://wikipedia.org/wiki/Cryptographic_nonce) کا استعمال کرتے ہیں۔ اگر نئے `Permit` کا نانس آخری استعمال شدہ نانس سے ایک زیادہ نہیں ہے، تو ہم اسے غلط سمجھتے ہیں۔

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

یہ [چین شناخت کنندہ](https://chainid.network/) کو حاصل کرنے کا کوڈ ہے۔ یہ EVM اسمبلی بولی کا استعمال کرتا ہے جسے [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html) کہتے ہیں۔ نوٹ کریں کہ Yul کے موجودہ ورژن میں آپ کو `chainid()` استعمال کرنا ہوگا، نہ کہ `chainid`۔

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

EIP-712 کے لیے [ڈومین سیپریٹر](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) کا حساب لگائیں۔

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

یہ وہ فنکشن ہے جو اجازتوں کو نافذ کرتا ہے۔ یہ پیرامیٹرز کے طور پر متعلقہ فیلڈز، اور [دستخط](https://yos.io/2018/11/16/ethereum-signatures/) کے لیے تین اسکیلر ویلیوز (v، r، اور s) حاصل کرتا ہے۔

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

ڈیڈ لائن کے بعد ٹرانزیکشنز قبول نہ کریں۔

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` وہ پیغام ہے جس کی ہم توقع کرتے ہیں۔ ہم جانتے ہیں کہ نانس کیا ہونا چاہیے، لہذا ہمیں اسے پیرامیٹر کے طور پر حاصل کرنے کی ضرورت نہیں ہے۔

Ethereum دستخطی الگورتھم کو دستخط کرنے کے لیے 256 بٹس کی توقع ہے، لہذا ہم `keccak256` ہیش فنکشن کا استعمال کرتے ہیں۔

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

ڈائجسٹ اور دستخط سے ہم [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) کا استعمال کرکے دستخط کرنے والے کا پتہ حاصل کر سکتے ہیں۔

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

اگر سب کچھ ٹھیک ہے، تو اسے [ایک ERC-20 منظوری](https://eips.ethereum.org/EIPS/eip-20#approve) کے طور پر سمجھیں۔

## پیریفری کنٹریکٹس {#periphery-contracts}

پیریفری کنٹریکٹس Uniswap کے لیے API (ایپلیکیشن پروگرام انٹرفیس) ہیں۔ وہ بیرونی کالز کے لیے دستیاب ہیں، یا تو دوسرے کنٹریکٹس سے یا ڈی سینٹرلائزڈ ایپلی کیشنز سے۔ آپ کور کنٹریکٹس کو براہ راست کال کر سکتے ہیں، لیکن یہ زیادہ پیچیدہ ہے اور اگر آپ غلطی کرتے ہیں تو آپ قدر کھو سکتے ہیں۔ کور کنٹریکٹس میں صرف اس بات کو یقینی بنانے کے لیے ٹیسٹ ہوتے ہیں کہ انہیں دھوکہ نہیں دیا جا رہا ہے، نہ کہ کسی اور کے لیے عقلی جانچ۔ وہ پیریفری میں ہیں تاکہ ضرورت کے مطابق انہیں اپ ڈیٹ کیا جا سکے۔

### UniswapV2Router01.sol {#UniswapV2Router01}

[اس کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) میں مسائل ہیں، اور [اب اسے استعمال نہیں کیا جانا چاہئے](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01)۔ خوش قسمتی سے، پیریفری کنٹریکٹس اسٹیٹ لیس ہیں اور کوئی اثاثہ نہیں رکھتے، لہذا اسے فرسودہ کرنا اور لوگوں کو اس کے بجائے متبادل، `UniswapV2Router02`، استعمال کرنے کا مشورہ دینا آسان ہے۔

### UniswapV2Router02.sol {#UniswapV2Router02}

زیادہ تر معاملات میں آپ Uniswap کو [اس کنٹریکٹ](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol) کے ذریعے استعمال کریں گے۔
آپ [یہاں](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) دیکھ سکتے ہیں کہ اسے کیسے استعمال کرنا ہے۔

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

ان میں سے زیادہ تر سے ہم یا تو پہلے مل چکے ہیں، یا کافی واضح ہیں۔ واحد استثنیٰ `IWETH.sol` ہے۔ Uniswap v2 کسی بھی جوڑے کے ERC-20 ٹوکنز کے لیے ایکسچینج کی اجازت دیتا ہے، لیکن ether (ETH) خود ایک ERC-20 ٹوکن نہیں ہے۔ یہ معیار سے پہلے کا ہے اور منفرد میکانزم کے ذریعے منتقل کیا جاتا ہے۔ ان کنٹریکٹس میں ETH کے استعمال کو فعال کرنے کے لیے جو ERC-20 ٹوکنز پر لاگو ہوتے ہیں، لوگوں نے [wrapped ether (WETH)](https://weth.tkn.eth.limo/) کنٹریکٹ وضع کیا۔ آپ اس کنٹریکٹ کو ETH بھیجتے ہیں، اور یہ آپ کے لیے WETH کی مساوی رقم منٹ کرتا ہے۔ یا آپ WETH جلا سکتے ہیں، اور ETH واپس حاصل کر سکتے ہیں۔

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

راؤٹر کو یہ جاننے کی ضرورت ہے کہ کون سی فیکٹری استعمال کرنی ہے، اور ان ٹرانزیکشنز کے لیے جن میں WETH کی ضرورت ہے، کون سا WETH کنٹریکٹ استعمال کرنا ہے۔ یہ قدریں [ناقابل تغیر](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables) ہیں، یعنی انہیں صرف کنسٹرکٹر میں سیٹ کیا جا سکتا ہے۔ اس سے صارفین کو یہ اعتماد ملتا ہے کہ کوئی بھی انہیں کم ایماندار کنٹریکٹس کی طرف اشارہ کرنے کے لیے تبدیل نہیں کر سکے گا۔

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

یہ موڈیفائر اس بات کو یقینی بناتا ہے کہ وقت کی حد والی ٹرانزیکشنز ("اگر آپ کر سکتے ہیں تو وقت Y سے پہلے X کریں") ان کی وقت کی حد کے بعد نہ ہوں۔

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

کنسٹرکٹر صرف ناقابل تغیر اسٹیٹ متغیرات کو سیٹ کرتا ہے۔

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

یہ فنکشن اس وقت کال کیا جاتا ہے جب ہم WETH کنٹریکٹ سے ٹوکنز کو واپس ETH میں چھڑاتے ہیں۔ صرف وہ WETH کنٹریکٹ جسے ہم استعمال کرتے ہیں اسے ایسا کرنے کی اجازت ہے۔

#### لیکویڈیٹی شامل کریں {#add-liquidity}

یہ فنکشنز جوڑا ایکسچینج میں ٹوکن شامل کرتے ہیں، جس سے لیکویڈیٹی پول میں اضافہ ہوتا ہے۔

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

یہ فنکشن A اور B ٹوکنز کی رقم کا حساب لگانے کے لیے استعمال کیا جاتا ہے جو جوڑا ایکسچینج میں جمع کیے جانے چاہئیں۔

```solidity
        address tokenA,
        address tokenB,
```

یہ ERC-20 ٹوکن کنٹریکٹس کے پتے ہیں۔

```solidity
        uint amountADesired,
        uint amountBDesired,
```

یہ وہ رقوم ہیں جو لیکویڈیٹی فراہم کرنے والا جمع کرنا چاہتا ہے۔ وہ A اور B کی زیادہ سے زیادہ رقوم بھی ہیں جو جمع کی جانی ہیں۔

```solidity
        uint amountAMin,
        uint amountBMin
```

یہ جمع کرنے کے لیے کم از کم قابل قبول رقوم ہیں۔ اگر ٹرانزیکشن ان رقوم یا اس سے زیادہ کے ساتھ نہیں ہو سکتی، تو اس سے واپس ہو جائیں۔ اگر آپ یہ فیچر نہیں چاہتے ہیں، تو صرف صفر بتائیں۔

لیکویڈیٹی فراہم کرنے والے عام طور پر ایک کم از کم رقم بتاتے ہیں، کیونکہ وہ ٹرانزیکشن کو ایک ایسی ایکسچینج کی شرح تک محدود کرنا چاہتے ہیں جو موجودہ شرح کے قریب ہو۔ اگر ایکسچینج کی شرح بہت زیادہ اتار چڑھاؤ کرتی ہے تو اس کا مطلب ایسی خبریں ہو سکتی ہیں جو بنیادی قدروں کو تبدیل کرتی ہیں، اور وہ دستی طور پر فیصلہ کرنا چاہتے ہیں کہ کیا کرنا ہے۔

مثال کے طور پر، ایک ایسے معاملے کا تصور کریں جہاں ایکسچینج کی شرح ایک سے ایک ہے اور لیکویڈیٹی فراہم کرنے والا ان قدروں کی وضاحت کرتا ہے:

| پیرامیٹر       |  قدر |
| -------------- | ---: |
| amountADesired | 1000 |
| amountBDesired | 1000 |
| amountAMin     |  900 |
| amountBMin     |  800 |

جب تک ایکسچینج کی شرح 0.9 اور 1.25 کے درمیان رہتی ہے، ٹرانزیکشن ہوتی ہے۔ اگر ایکسچینج کی شرح اس حد سے باہر ہو جاتی ہے، تو ٹرانزیکشن منسوخ ہو جاتی ہے۔

اس احتیاط کی وجہ یہ ہے کہ ٹرانزیکشنز فوری نہیں ہوتیں، آپ انہیں جمع کرتے ہیں اور آخر کار ایک تصدیق کنندہ انہیں ایک بلاک میں شامل کرے گا (جب تک کہ آپ کی گیس کی قیمت بہت کم نہ ہو، اس صورت میں آپ کو اسے اوور رائٹ کرنے کے لیے اسی نانس اور زیادہ گیس کی قیمت کے ساتھ ایک اور ٹرانزیکشن جمع کرنی ہوگی)۔ آپ جمع کرنے اور شامل کرنے کے درمیان کے وقفے کے دوران جو کچھ ہوتا ہے اسے کنٹرول نہیں کر سکتے۔

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

فنکشن ان رقوم کو واپس کرتا ہے جو لیکویڈیٹی فراہم کرنے والے کو جمع کرنی چاہئیں تاکہ ریزرو کے درمیان موجودہ تناسب کے برابر تناسب ہو۔

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

اگر اس ٹوکن جوڑے کے لیے ابھی تک کوئی ایکسچینج نہیں ہے، تو اسے بنائیں۔

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

جوڑے میں موجودہ ریزرو حاصل کریں۔

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);

```

اگر موجودہ ریزرو خالی ہیں تو یہ ایک نیا جوڑا ایکسچینج ہے۔ جمع کی جانے والی رقوم بالکل وہی ہونی چاہئیں جو لیکویڈیٹی فراہم کرنے والا فراہم کرنا چاہتا ہے۔

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

اگر ہمیں یہ دیکھنے کی ضرورت ہے کہ رقوم کیا ہوں گی، تو ہم [اس فنکشن](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35) کا استعمال کرکے بہترین رقم حاصل کرتے ہیں۔ ہم موجودہ ریزرو کے جیسا ہی تناسب چاہتے ہیں۔

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

اگر `amountBOptimal` اس رقم سے کم ہے جو لیکویڈیٹی فراہم کرنے والا جمع کرنا چاہتا ہے تو اس کا مطلب ہے کہ ٹوکن B اس وقت اس سے زیادہ قیمتی ہے جتنا لیکویڈیٹی جمع کنندہ سوچتا ہے، لہذا کم رقم کی ضرورت ہے۔

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

اگر بہترین B رقم مطلوبہ B رقم سے زیادہ ہے تو اس کا مطلب ہے کہ B ٹوکن اس وقت اس سے کم قیمتی ہیں جتنا لیکویڈیٹی جمع کنندہ سوچتا ہے، لہذا زیادہ رقم کی ضرورت ہے۔ تاہم، مطلوبہ رقم ایک زیادہ سے زیادہ ہے، لہذا ہم ایسا نہیں کر سکتے۔ اس کے بجائے ہم B ٹوکنز کی مطلوبہ رقم کے لیے A ٹوکنز کی بہترین تعداد کا حساب لگاتے ہیں۔

سب کو ایک ساتھ رکھنے سے ہمیں یہ گراف ملتا ہے۔ فرض کریں کہ آپ ایک ہزار A ٹوکن (نیلی لکیر) اور ایک ہزار B ٹوکن (سرخ لکیر) جمع کرنے کی کوشش کر رہے ہیں۔ x محور ایکسچینج کی شرح ہے، A/B۔ اگر x=1، تو وہ قدر میں برابر ہیں اور آپ ہر ایک کا ایک ہزار جمع کرتے ہیں۔ اگر x=2، تو A کی قدر B کی قدر سے دوگنی ہے (آپ کو ہر A ٹوکن کے لیے دو B ٹوکن ملتے ہیں) لہذا آپ ایک ہزار B ٹوکن جمع کرتے ہیں، لیکن صرف 500 A ٹوکن۔ اگر x=0.5، تو صورتحال الٹ ہے، ایک ہزار A ٹوکن اور پانچ سو B ٹوکن۔

![گراف](liquidityProviderDeposit.png)

آپ لیکویڈیٹی کو براہ راست کور کنٹریکٹ میں جمع کر سکتے ہیں ([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110) کا استعمال کرتے ہوئے)، لیکن کور کنٹریکٹ صرف یہ جانچتا ہے کہ اسے خود دھوکہ نہیں دیا جا رہا ہے، لہذا اگر آپ کے ٹرانزیکشن جمع کرنے اور اس کے عمل درآمد ہونے کے وقت کے درمیان ایکسچینج کی شرح بدل جاتی ہے تو آپ کو قدر کے نقصان کا خطرہ ہوتا ہے۔ اگر آپ پیریفری کنٹریکٹ استعمال کرتے ہیں، تو یہ اس رقم کا حساب لگاتا ہے جو آپ کو جمع کرنی چاہیے اور اسے فوری طور پر جمع کرتا ہے، لہذا ایکسچینج کی شرح تبدیل نہیں ہوتی اور آپ کو کوئی نقصان نہیں ہوتا۔

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

یہ فنکشن لیکویڈیٹی جمع کرنے کے لیے ایک ٹرانزیکشن کے ذریعے کال کیا جا سکتا ہے۔ زیادہ تر پیرامیٹرز اوپر دیے گئے `_addLiquidity` کی طرح ہیں، دو استثناء کے ساتھ:

۔ `to` وہ پتہ ہے جسے لیکویڈیٹی فراہم کرنے والے کے پول کے حصے کو دکھانے کے لیے منٹ کیے گئے نئے لیکویڈیٹی ٹوکن ملتے ہیں۔
. `deadline` ٹرانزیکشن پر ایک وقت کی حد ہے

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

ہم اصل میں جمع کی جانے والی رقوم کا حساب لگاتے ہیں اور پھر لیکویڈیٹی پول کا پتہ تلاش کرتے ہیں۔ گیس بچانے کے لیے ہم یہ فیکٹری سے پوچھ کر نہیں کرتے، بلکہ لائبریری فنکشن `pairFor` (نیچے لائبریریوں میں دیکھیں) کا استعمال کرتے ہیں۔

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

صارف سے ٹوکنز کی صحیح رقوم کو جوڑا ایکسچینج میں منتقل کریں۔

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

اس کے بدلے میں `to` پتے کو پول کی جزوی ملکیت کے لیے لیکویڈیٹی ٹوکن دیں۔ کور کنٹریکٹ کا `mint` فنکشن دیکھتا ہے کہ اس کے پاس کتنے اضافی ٹوکن ہیں (اس کے مقابلے میں جو اس کے پاس آخری بار لیکویڈیٹی تبدیل ہونے پر تھے) اور اسی کے مطابق لیکویڈیٹی منٹ کرتا ہے۔

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

جب کوئی لیکویڈیٹی فراہم کرنے والا ٹوکن/ETH جوڑا ایکسچینج کو لیکویڈیٹی فراہم کرنا چاہتا ہے، تو کچھ فرق ہوتے ہیں۔ کنٹریکٹ لیکویڈیٹی فراہم کرنے والے کے لیے ETH کو لپیٹنے کا کام کرتا ہے۔ یہ بتانے کی ضرورت نہیں ہے کہ صارف کتنے ETH جمع کرنا چاہتا ہے، کیونکہ صارف انہیں صرف ٹرانزیکشن کے ساتھ بھیجتا ہے (`msg.value` میں رقم دستیاب ہے)۔

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

ETH جمع کرنے کے لیے کنٹریکٹ پہلے اسے WETH میں لپیٹتا ہے اور پھر WETH کو جوڑے میں منتقل کرتا ہے۔ نوٹ کریں کہ منتقلی ایک `assert` میں لپیٹی ہوئی ہے۔ اس کا مطلب ہے کہ اگر منتقلی ناکام ہو جاتی ہے تو یہ کنٹریکٹ کال بھی ناکام ہو جاتی ہے، اور اس لیے لپیٹنا واقعی نہیں ہوتا ہے۔

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

صارف نے ہمیں پہلے ہی ETH بھیج دیا ہے، لہذا اگر کوئی اضافی بچ جاتا ہے (کیونکہ دوسرا ٹوکن صارف کے خیال سے کم قیمتی ہے)، تو ہمیں ریفنڈ جاری کرنے کی ضرورت ہے۔

#### لیکویڈیٹی ہٹائیں {#remove-liquidity}

یہ فنکشنز لیکویڈیٹی کو ہٹا دیں گے اور لیکویڈیٹی فراہم کرنے والے کو واپس ادائیگی کریں گے۔

```solidity
    // **** REMOVE LIQUIDITY ****
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

لیکویڈیٹی ہٹانے کا سب سے آسان معاملہ۔ ہر ٹوکن کی ایک کم از کم رقم ہے جسے لیکویڈیٹی فراہم کرنے والا قبول کرنے پر راضی ہے، اور یہ ڈیڈ لائن سے پہلے ہونا چاہیے۔

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

کور کنٹریکٹ کا `burn` فنکشن صارف کو ٹوکن واپس کرنے کا کام کرتا ہے۔

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

جب کوئی فنکشن متعدد قدریں واپس کرتا ہے، لیکن ہم صرف ان میں سے کچھ میں دلچسپی رکھتے ہیں، تو یہ ہے کہ ہم صرف ان قدروں کو کیسے حاصل کرتے ہیں۔ یہ گیس کی شرائط میں قدر پڑھنے اور اسے کبھی استعمال نہ کرنے سے قدرے سستا ہے۔

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

رقوم کو اس طریقے سے ترجمہ کریں جس طرح کور کنٹریکٹ انہیں واپس کرتا ہے (پہلے کم پتے والا ٹوکن) اس طریقے سے جس طرح صارف ان کی توقع کرتا ہے (`tokenA` اور `tokenB` کے مطابق)۔

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

پہلے منتقلی کرنا اور پھر اس کی قانونی حیثیت کی تصدیق کرنا ٹھیک ہے، کیونکہ اگر ایسا نہیں ہے تو ہم تمام اسٹیٹ کی تبدیلیوں سے واپس ہو جائیں گے۔

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

ETH کے لیے لیکویڈیٹی ہٹانا تقریباً وہی ہے، سوائے اس کے کہ ہم WETH ٹوکن حاصل کرتے ہیں اور پھر انہیں ETH کے لیے چھڑاتے ہیں تاکہ لیکویڈیٹی فراہم کرنے والے کو واپس دیا جا سکے۔

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
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
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

یہ فنکشنز میٹا ٹرانزیکشنز کو ریلے کرتے ہیں تاکہ ایتھر کے بغیر صارفین کو پول سے نکالنے کی اجازت دی جا سکے، [اجازت نامے کے میکانزم](#UniswapV2ERC20) کا استعمال کرتے ہوئے۔

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
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

یہ فنکشن ان ٹوکنز کے لیے استعمال کیا جا سکتا ہے جن پر منتقلی یا اسٹوریج کی فیس ہوتی ہے۔ جب کسی ٹوکن پر ایسی فیس ہوتی ہے تو ہم `removeLiquidity` فنکشن پر بھروسہ نہیں کر سکتے کہ وہ ہمیں بتائے کہ ہم کتنے ٹوکن واپس حاصل کرتے ہیں، لہذا ہمیں پہلے نکالنا ہوگا اور پھر بیلنس حاصل کرنا ہوگا۔

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

حتمی فنکشن اسٹوریج فیس کو میٹا-ٹرانزیکشنز کے ساتھ جوڑتا ہے۔

#### تجارت {#trade}

```solidity
    // **** SWAP ****
    // پہلے جوڑے کو ابتدائی رقم پہلے ہی بھیجے جانے کی ضرورت ہے
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

یہ فنکشن اندرونی پروسیسنگ انجام دیتا ہے جو ان فنکشنز کے لیے درکار ہے جو تاجروں کے سامنے آتے ہیں۔

```solidity
        for (uint i; i < path.length - 1; i++) {
```

جیسا کہ میں یہ لکھ رہا ہوں، [388,160 ERC-20 ٹوکنز](https://eth.blockscout.com/tokens) ہیں۔ اگر ہر ٹوکن جوڑے کے لیے ایک جوڑا ایکسچینج ہوتا، تو یہ 150 ارب سے زیادہ جوڑا ایکسچینج ہوتا۔ پوری چین میں، اس وقت، [صرف 0.1% اس تعداد میں اکاؤنٹس ہیں](https://eth.blockscout.com/stats/accountsGrowth)۔ اس کے بجائے، سویپ فنکشنز ایک راستے کے تصور کی حمایت کرتے ہیں۔ ایک تاجر A کو B کے لیے، B کو C کے لیے، اور C کو D کے لیے تبدیل کر سکتا ہے، لہذا براہ راست A-D جوڑے کے تبادلے کی کوئی ضرورت نہیں ہے۔

ان بازاروں میں قیمتیں ہم آہنگ ہوتی ہیں، کیونکہ جب وہ مطابقت سے باہر ہوتے ہیں تو یہ ثالثی کا موقع پیدا کرتا ہے۔ مثال کے طور پر، تین ٹوکن، A، B، اور C کا تصور کریں۔ تین جوڑے کے تبادلے ہیں، ہر جوڑے کے لیے ایک۔

1. ابتدائی صورتحال
2. ایک تاجر 24.695 A ٹوکن فروخت کرتا ہے اور 25.305 B ٹوکن حاصل کرتا ہے۔
3. تاجر 24.695 B ٹوکن 25.305 C ٹوکنز کے لیے فروخت کرتا ہے، تقریباً 0.61 B ٹوکن بطور منافع رکھتا ہے۔
4. پھر تاجر 24.695 C ٹوکن 25.305 A ٹوکنز کے لیے فروخت کرتا ہے، تقریباً 0.61 C ٹوکن بطور منافع رکھتا ہے۔ تاجر کے پاس 0.61 اضافی A ٹوکن بھی ہیں (25.305 تاجر کے ساتھ ختم ہوتا ہے، مائنس 24.695 کی اصل سرمایہ کاری)۔

| مرحلہ | A-B ایکسچینج                                                                                | B-C ایکسچینج                                                                                | A-C ایکسچینج                                                                                |
| ----- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1     | A:1000 B:1050 A/B=1.05                      | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 2     | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 3     | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05                      |
| 4     | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

اس جوڑے کو حاصل کریں جس کو ہم فی الحال ہینڈل کر رہے ہیں، اسے ترتیب دیں (جوڑے کے ساتھ استعمال کے لیے) اور متوقع آؤٹ پٹ کی رقم حاصل کریں۔

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

متوقع آؤٹ رقوم حاصل کریں، جس طرح سے جوڑا ایکسچینج ان کی توقع کرتا ہے اس طرح ترتیب دیا گیا ہے۔

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

کیا یہ آخری ایکسچینج ہے؟ اگر ایسا ہے تو، تجارت کے لیے موصول ہونے والے ٹوکن کو منزل پر بھیج دیں۔ اگر نہیں، تو اسے اگلے جوڑے کے تبادلے پر بھیجیں۔

```solidity
            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

ٹوکن کو تبدیل کرنے کے لیے دراصل جوڑا ایکسچینج کو کال کریں۔ ہمیں تبادلے کے بارے میں بتانے کے لیے کال بیک کی ضرورت نہیں ہے، اس لیے ہم اس فیلڈ میں کوئی بائٹس نہیں بھیجتے ہیں۔

```solidity
    function swapExactTokensForTokens(
```

یہ فنکشن تاجروں کے ذریعہ ایک ٹوکن کو دوسرے کے لیے تبدیل کرنے کے لیے براہ راست استعمال کیا جاتا ہے۔

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

اس پیرامیٹر میں ERC-20 معاہدوں کے پتے ہوتے ہیں۔ جیسا کہ اوپر بیان کیا گیا ہے، یہ ایک صف ہے کیونکہ آپ کو اپنے پاس موجود اثاثہ سے مطلوبہ اثاثہ تک پہنچنے کے لیے کئی جوڑے کے تبادلے سے گزرنا پڑ سکتا ہے۔

سولیڈیٹی میں ایک فنکشن پیرامیٹر کو یا تو `memory` یا `calldata` میں محفوظ کیا جا سکتا ہے۔ اگر فنکشن معاہدے کا ایک داخلی نقطہ ہے، جسے براہ راست کسی صارف سے (ٹرانزیکشن کا استعمال کرتے ہوئے) یا کسی دوسرے معاہدے سے بلایا جاتا ہے، تو پیرامیٹر کی قیمت براہ راست کال ڈیٹا سے لی جا سکتی ہے۔ اگر فنکشن کو اندرونی طور پر بلایا جاتا ہے، جیسا کہ اوپر `_swap` ہے، تو پیرامیٹرز کو `memory` میں محفوظ کرنا ہوگا۔ بلائے گئے معاہدے کے نقطہ نظر سے `calldata` صرف پڑھنے کے لیے ہے۔

اسکیلر اقسام جیسے `uint` یا `address` کے ساتھ کمپائلر ہمارے لیے اسٹوریج کا انتخاب سنبھالتا ہے، لیکن اریوں کے ساتھ، جو لمبے اور زیادہ مہنگے ہوتے ہیں، ہم استعمال کیے جانے والے اسٹوریج کی قسم بتاتے ہیں۔

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

واپسی کی قدریں ہمیشہ میموری میں واپس آتی ہیں۔

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

ہر سویپ میں خریدی جانے والی رقم کا حساب لگائیں۔ اگر نتیجہ اس کم از کم سے کم ہے جسے تاجر قبول کرنے کو تیار ہے، تو لین دین سے باہر ہو جائیں۔

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

آخر میں، ابتدائی ERC-20 ٹوکن کو پہلے جوڑا ایکسچینج کے اکاؤنٹ میں منتقل کریں اور `_swap` کو کال کریں۔ یہ سب ایک ہی لین دین میں ہو رہا ہے، لہذا جوڑا ایکسچینج جانتا ہے کہ کوئی بھی غیر متوقع ٹوکن اس منتقلی کا حصہ ہے۔

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

پچھلا فنکشن، `swapTokensForTokens`، ایک تاجر کو ان پٹ ٹوکنز کی صحیح تعداد بتانے کی اجازت دیتا ہے جو وہ دینے کو تیار ہے اور آؤٹ پٹ ٹوکنز کی کم از کم تعداد جو وہ بدلے میں وصول کرنے کو تیار ہے۔ یہ فنکشن ریورس سویپ کرتا ہے، یہ ایک تاجر کو آؤٹ پٹ ٹوکنز کی تعداد بتانے دیتا ہے جو وہ چاہتا ہے، اور ان پٹ ٹوکنز کی زیادہ سے زیادہ تعداد جو وہ ان کے لیے ادا کرنے کو تیار ہے۔

دونوں صورتوں میں، تاجر کو پہلے اس پیریفری کنٹریکٹ کو انہیں منتقل کرنے کی اجازت دینے کے لیے ایک الاؤنس دینا ہوگا۔

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
        // اگر کوئی ہے تو ڈسٹ ایتھ واپس کریں
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

ان چاروں اقسام میں ETH اور ٹوکنز کے درمیان تجارت شامل ہے۔ فرق صرف اتنا ہے کہ ہم یا تو تاجر سے ETH وصول کرتے ہیں اور اسے WETH بنانے کے لیے استعمال کرتے ہیں، یا ہم راستے میں آخری ایکسچینج سے WETH وصول کرتے ہیں اور اسے جلاتے ہیں، جس سے تاجر کو نتیجے میں ETH واپس بھیجا جاتا ہے۔

```solidity
    // **** SWAP (ٹرانسفر ٹوکنز پر فیس کی حمایت) ****
    // پہلے جوڑے کو ابتدائی رقم پہلے ہی بھیجے جانے کی ضرورت ہے
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

یہ ان ٹوکنز کو تبدیل کرنے کا اندرونی فنکشن ہے جن میں ([اس مسئلے](https://github.com/Uniswap/uniswap-interface/issues/835)) کو حل کرنے کے لیے ٹرانسفر یا اسٹوریج فیس ہوتی ہے۔

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // بہت گہری غلطیوں سے بچنے کے لیے دائرہ کار
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

ٹرانسفر فیس کی وجہ سے ہم `getAmountsOut` فنکشن پر بھروسہ نہیں کر سکتے ہیں کہ ہمیں ہر ٹرانسفر سے کتنی رقم ملتی ہے (جس طرح ہم اصل `_swap` کو کال کرنے سے پہلے کرتے ہیں)۔ اس کے بجائے ہمیں پہلے ٹرانسفر کرنا ہوگا اور پھر دیکھنا ہوگا کہ ہمیں کتنے ٹوکن واپس ملے۔

نوٹ: نظریاتی طور پر ہم `_swap` کے بجائے صرف اس فنکشن کا استعمال کر سکتے ہیں، لیکن بعض صورتوں میں (مثال کے طور پر، اگر ٹرانسفر کو واپس کر دیا جاتا ہے کیونکہ مطلوبہ کم از کم کو پورا کرنے کے لیے آخر میں کافی نہیں ہے) تو اس پر زیادہ گیس خرچ ہوگی۔ ٹرانسفر فیس ٹوکن بہت نایاب ہیں، لہذا جب کہ ہمیں ان کو ایڈجسٹ کرنے کی ضرورت ہے، تمام تبادلوں کو یہ ماننے کی ضرورت نہیں ہے کہ وہ ان میں سے کم از کم ایک سے گزرتے ہیں۔

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

یہ وہی قسمیں ہیں جو عام ٹوکنز کے لیے استعمال ہوتی ہیں، لیکن وہ اس کے بجائے `_swapSupportingFeeOnTransferTokens` کو کال کرتی ہیں۔

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

یہ فنکشنز صرف پراکسیز ہیں جو [UniswapV2Library فنکشنز](#uniswapV2library) کو کال کرتے ہیں۔

### UniswapV2Migrator.sol {#UniswapV2Migrator}

یہ معاہدہ پرانے v1 سے v2 میں تبادلے کو منتقل کرنے کے لیے استعمال کیا گیا تھا۔ اب جب کہ وہ منتقل ہو چکے ہیں، یہ اب متعلقہ نہیں ہے۔

## لائبریریاں {#libraries}

[SafeMath لائبریری](https://docs.openzeppelin.com/contracts/2.x/api/math) اچھی طرح سے دستاویزی ہے، لہذا اسے یہاں دستاویز کرنے کی ضرورت نہیں ہے۔

### ریاضی {#Math}

اس لائبریری میں کچھ ریاضی کے فنکشنز ہیں جن کی عام طور پر سولیڈیٹی کوڈ میں ضرورت نہیں ہوتی، اس لیے وہ زبان کا حصہ نہیں ہیں۔

```solidity
pragma solidity =0.5.16;

// مختلف ریاضی کے آپریشنز کرنے کے لیے ایک لائبریری

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // بابلی طریقہ (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

x سے ایک تخمینہ کے طور پر شروع کریں جو مربع جڑ سے زیادہ ہے (یہی وجہ ہے کہ ہمیں 1-3 کو خصوصی معاملات کے طور پر علاج کرنے کی ضرورت ہے)۔

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

ایک قریبی تخمینہ حاصل کریں، پچھلے تخمینے کا اوسط اور وہ عدد جس کا مربع جڑ ہم پچھلے تخمینے سے تقسیم کرنے کی کوشش کر رہے ہیں۔ اس وقت تک دہرائیں جب تک کہ نیا تخمینہ موجودہ تخمینہ سے کم نہ ہو۔ مزید تفصیلات کے لیے، [یہاں دیکھیں](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)۔

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

ہمیں کبھی بھی صفر کے مربع جڑ کی ضرورت نہیں ہونی چاہیے۔ ایک، دو اور تین کے مربع جڑ تقریباً ایک ہیں (ہم عددی عدد استعمال کرتے ہیں، اس لیے ہم کسر کو نظر انداز کرتے ہیں)۔

```solidity
        }
    }
}
```

### فکسڈ پوائنٹ فریکشنز (UQ112x112) {#FixedPoint}

یہ لائبریری کسروں کو سنبھالتی ہے، جو عام طور پر Ethereum ریاضی کا حصہ نہیں ہیں۔ یہ نمبر _x_ کو _x\*2^112_ کے بطور انکوڈ کرکے کرتا ہے۔ یہ ہمیں بغیر کسی تبدیلی کے اصل اضافہ اور گھٹاؤ کے اوپ کوڈز استعمال کرنے دیتا ہے۔

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
    // ایک uint112 کو UQ112x112 کے بطور انکوڈ کریں
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // کبھی اوور فلو نہیں ہوتا
    }
```

کیونکہ y `uint112` ہے، یہ زیادہ سے زیادہ 2^112-1 ہو سکتا ہے۔ اس نمبر کو اب بھی `UQ112x112` کے بطور انکوڈ کیا جا سکتا ہے۔

```solidity
    // ایک UQ112x112 کو ایک uint112 سے تقسیم کریں، ایک UQ112x112 واپس کریں
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

اگر ہم دو `UQ112x112` اقدار کو تقسیم کرتے ہیں، تو نتیجہ اب 2^112 سے ضرب نہیں ہوتا ہے۔ لہذا اس کے بجائے ہم ڈینومینیٹر کے لیے ایک عددی عدد لیتے ہیں۔ ہمیں ضرب کرنے کے لیے اسی طرح کی چال استعمال کرنے کی ضرورت ہوتی، لیکن ہمیں `UQ112x112` اقدار کی ضرب کرنے کی ضرورت نہیں ہے۔

### UniswapV2Library {#uniswapV2library}

یہ لائبریری صرف پیریفری کنٹریکٹس کے ذریعہ استعمال ہوتی ہے۔

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // ترتیب شدہ ٹوکن پتے واپس کرتا ہے، جو اس ترتیب میں ترتیب دیے گئے جوڑوں سے واپسی کی قدروں کو ہینڈل کرنے کے لیے استعمال ہوتا ہے
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

دونوں ٹوکنز کو پتے کے لحاظ سے ترتیب دیں، تاکہ ہم ان کے لیے جوڑا ایکسچینج کا پتہ حاصل کر سکیں۔ یہ ضروری ہے کیونکہ بصورت دیگر ہمارے پاس دو امکانات ہوں گے، ایک پیرامیٹرز A,B کے لیے اور دوسرا پیرامیٹرز B,A کے لیے، جس کے نتیجے میں ایک کے بجائے دو تبادلے ہوں گے۔

```solidity
    // بغیر کسی بیرونی کال کے ایک جوڑے کے لیے CREATE2 ایڈریس کا حساب لگاتا ہے
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

یہ فنکشن دو ٹوکنز کے لیے جوڑا ایکسچینج کے پتے کا حساب لگاتا ہے۔ یہ معاہدہ [CREATE2 opcode](https://eips.ethereum.org/EIPS/eip-1014) کا استعمال کرتے ہوئے بنایا گیا ہے، لہذا اگر ہم اس کے استعمال کردہ پیرامیٹرز کو جانتے ہیں تو ہم اسی الگورتھم کا استعمال کرتے ہوئے پتے کا حساب لگا سکتے ہیں۔ یہ فیکٹری سے پوچھنے سے بہت سستا ہے، اور

```solidity
    // ایک جوڑے کے لیے ذخائر حاصل کرتا ہے اور ترتیب دیتا ہے
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

یہ فنکشن ان دو ٹوکنز کے ذخائر کو واپس کرتا ہے جو جوڑا ایکسچینج کے پاس ہیں۔ نوٹ کریں کہ یہ کسی بھی ترتیب میں ٹوکن وصول کر سکتا ہے، اور انہیں اندرونی استعمال کے لیے ترتیب دیتا ہے۔

```solidity
    // کسی اثاثے اور جوڑے کے ذخائر کی کچھ مقدار کو دیکھتے ہوئے، دوسرے اثاثے کی مساوی رقم واپس کرتا ہے
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

یہ فنکشن آپ کو ٹوکن B کی وہ رقم دیتا ہے جو آپ کو ٹوکن A کے بدلے میں ملے گی اگر کوئی فیس شامل نہ ہو۔ یہ حساب اس بات کو مدنظر رکھتا ہے کہ منتقلی سے شرح تبادلہ بدل جاتی ہے۔

```solidity
    // کسی اثاثے کی ان پٹ رقم اور جوڑے کے ذخائر کو دیکھتے ہوئے، دوسرے اثاثے کی زیادہ سے زیادہ آؤٹ پٹ رقم واپس کرتا ہے
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

اوپر `quote` فنکشن بہت اچھا کام کرتا ہے اگر جوڑا ایکسچینج استعمال کرنے کے لیے کوئی فیس نہ ہو۔ تاہم، اگر 0.3% ایکسچینج فیس ہے تو آپ کو اصل میں ملنے والی رقم کم ہے۔ یہ فنکشن ایکسچینج فیس کے بعد رقم کا حساب لگاتا ہے۔

```solidity
        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

سولیڈیٹی مقامی طور پر کسروں کو ہینڈل نہیں کرتی ہے، لہذا ہم صرف رقم کو 0.997 سے ضرب نہیں دے سکتے۔ اس کے بجائے، ہم نیومریٹر کو 997 سے اور ڈینومینیٹر کو 1000 سے ضرب دیتے ہیں، وہی اثر حاصل کرتے ہیں۔

```solidity
    // کسی اثاثے کی آؤٹ پٹ رقم اور جوڑے کے ذخائر کو دیکھتے ہوئے، دوسرے اثاثے کی مطلوبہ ان پٹ رقم واپس کرتا ہے
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

یہ فنکشن تقریباً وہی کام کرتا ہے، لیکن یہ آؤٹ پٹ کی رقم حاصل کرتا ہے اور ان پٹ فراہم کرتا ہے۔

```solidity

    // کسی بھی تعداد میں جوڑوں پر زنجیروں سے getAmountOut حسابات انجام دیتا ہے
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // کسی بھی تعداد میں جوڑوں پر زنجیروں سے getAmountIn حسابات انجام دیتا ہے
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

یہ دو فنکشنز اقدار کی شناخت کو ہینڈل کرتے ہیں جب کئی جوڑے کے تبادلے سے گزرنا ضروری ہوتا ہے۔

### ٹرانسفر ہیلپر {#transfer-helper}

[یہ لائبریری](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) ERC-20 اور Ethereum ٹرانسفرز کے ارد گرد کامیابی کی جانچ پڑتال کرتی ہے تاکہ ایک ریورٹ اور ایک `false` ویلیو کی واپسی کو ایک ہی طرح سے سمجھا جائے۔

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// ERC20 ٹوکنز کے ساتھ تعامل کرنے اور ETH بھیجنے کے لیے مددگار طریقے جو مستقل طور پر true/false واپس نہیں کرتے ہیں
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

ہم دو طریقوں میں سے کسی ایک میں ایک مختلف معاہدے کو کال کر سکتے ہیں:

- فنکشن کال بنانے کے لیے انٹرفیس ڈیفینیشن کا استعمال کریں
- کال بنانے کے لیے [ایپلیکیشن بائنری انٹرفیس (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) کو "دستی طور پر" استعمال کریں۔ یہ وہی ہے جو کوڈ کے مصنف نے کرنے کا فیصلہ کیا۔

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20 معیار سے پہلے بنائے گئے ٹوکن کے ساتھ پسماندہ مطابقت کی خاطر، ایک ERC-20 کال یا تو واپس آنے سے ناکام ہو سکتی ہے (جس صورت میں `success` `false` ہے) یا کامیاب ہونے اور `false` ویلیو واپس کرنے سے (جس صورت میں آؤٹ پٹ ڈیٹا ہوتا ہے، اور اگر آپ اسے بولین کے بطور ڈی کوڈ کرتے ہیں تو آپ کو `false` ملتا ہے)۔

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

یہ فنکشن [ERC-20 کی ٹرانسفر فعالیت](https://eips.ethereum.org/EIPS/eip-20#transfer) کو نافذ کرتا ہے، جو ایک اکاؤنٹ کو دوسرے اکاؤنٹ کے ذریعہ فراہم کردہ الاؤنس کو خرچ کرنے کی اجازت دیتا ہے۔

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

یہ فنکشن [ERC-20 کی transferFrom فعالیت](https://eips.ethereum.org/EIPS/eip-20#transferfrom) کو نافذ کرتا ہے، جو ایک اکاؤنٹ کو دوسرے اکاؤنٹ کے ذریعہ فراہم کردہ الاؤنس کو خرچ کرنے کی اجازت دیتا ہے۔

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

یہ فنکشن ایک اکاؤنٹ میں ایتھر منتقل کرتا ہے۔ کسی دوسرے معاہدے پر کوئی بھی کال ایتھر بھیجنے کی کوشش کر سکتی ہے۔ کیونکہ ہمیں اصل میں کسی بھی فنکشن کو کال کرنے کی ضرورت نہیں ہے، ہم کال کے ساتھ کوئی ڈیٹا نہیں بھیجتے ہیں۔

## نتیجہ {#conclusion}

یہ تقریباً 50 صفحات کا ایک طویل مضمون ہے۔ اگر آپ یہاں تک پہنچ گئے ہیں، تو مبارک ہو! امید ہے کہ اب تک آپ نے ایک حقیقی زندگی کی ایپلی کیشن (مختصر نمونہ پروگراموں کے برخلاف) لکھنے میں غور و فکر کو سمجھ لیا ہے اور اپنے استعمال کے معاملات کے لیے معاہدے لکھنے کے قابل ہیں۔

اب جاؤ اور کچھ مفید لکھو اور ہمیں حیران کرو۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
