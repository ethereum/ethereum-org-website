---
title: "Tellor کو اپنے اوریکل کے طور پر کیسے سیٹ اپ کریں"
description: "Tellor اوریکل کو اپنے پروٹوکول میں ضم کرنے کے ساتھ شروع کرنے کے لئے ایک گائیڈ"
author: "Tellor"
lang: ur-in
tags: [ "solidity", "اسمارٹ معاہدات", "اوریکلز" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

پاپ کوئز: آپ کا پروٹوکول تقریباً ختم ہو چکا ہے، لیکن اسے آف چین ڈیٹا تک رسائی حاصل کرنے کے لیے ایک اوریکل کی ضرورت ہے... آپ کیا کرتے ہیں؟

## (نرم) شرائط {#soft-prerequisites}

اس پوسٹ کا مقصد اوریکل فیڈ تک رسائی کو ہر ممکن حد تک آسان اور سیدھا بنانا ہے۔ یہ کہنے کے بعد، ہم اوریکل پہلو پر توجہ مرکوز کرنے کے لئے آپ کی کوڈنگ کی مہارت کی سطح کے بارے میں مندرجہ ذیل فرض کر رہے ہیں۔

مفروضے:

- آپ ٹرمینل نیویگیٹ کر سکتے ہیں
- آپ نے npm انسٹال کیا ہے
- آپ جانتے ہیں کہ انحصار کو منظم کرنے کے لئے npm کا استعمال کیسے کریں

Tellor ایک لائیو اور اوپن سورس اوریکل ہے جو نفاذ کے لیے تیار ہے۔ یہ ابتدائی رہنما یہاں اس آسانی کو ظاہر کرنے کے لیے ہے جس کے ساتھ کوئی بھی Tellor کے ساتھ شروع کر سکتا ہے، جو آپ کے پروجیکٹ کو مکمل طور پر غیر مرکزی اور سنسر شپ سے مزاحم اوریکل فراہم کرتا ہے۔

## جائزہ {#overview}

Tellor ایک اوریکل سسٹم ہے جہاں پارٹیاں آف چین ڈیٹا پوائنٹ (مثال کے طور پر، BTC/USD) کی قیمت کی درخواست کر سکتی ہیں اور رپورٹرز اس قیمت کو آن چین ڈیٹا بینک میں شامل کرنے کے لیے مقابلہ کرتے ہیں، جو تمام Ethereum اسمارٹ کنٹریکٹس کے ذریعے قابل رسائی ہے۔ اس ڈیٹا بینک کے ان پٹس کو اسٹیک شدہ رپورٹرز کے نیٹ ورک کے ذریعے محفوظ کیا جاتا ہے۔ Tellor کرپٹو-اقتصادی ترغیبی میکانزم کا استعمال کرتا ہے، رپورٹرز کے ذریعے ایماندارانہ ڈیٹا جمع کرانے پر انعام دیتا ہے اور Tellor کے ٹوکن، Tributes (TRB) کے اجراء اور ایک تنازعہ کے میکانزم کے ذریعے برے اداکاروں کو سزا دیتا ہے۔

اس ٹیوٹوریل میں ہم اس پر بات کریں گے:

- ابتدائی ٹول کٹ ترتیب دینا جس کی آپ کو شروع کرنے اور چلانے کی ضرورت ہوگی۔
- ایک سادہ مثال کے ذریعے چلیں۔
- ان نیٹ ورکس کے ٹیسٹ نیٹ پتے درج کریں جن پر آپ فی الحال Tellor کی جانچ کر سکتے ہیں۔

## UsingTellor کا استعمال {#usingtellor}

سب سے پہلی چیز جو آپ کرنا چاہیں گے وہ ہے Tellor کو اپنے اوریکل کے طور پر استعمال کرنے کے لیے ضروری بنیادی ٹولز کو انسٹال کرنا۔ Tellor یوزر کنٹریکٹس کو انسٹال کرنے کے لیے [اس پیکیج](https://github.com/tellor-io/usingtellor) کا استعمال کریں:

`npm install usingtellor`

ایک بار انسٹال ہونے کے بعد یہ آپ کے کنٹریکٹس کو 'UsingTellor' کنٹریکٹ سے فنکشنز وراثت میں حاصل کرنے کی اجازت دے گا۔

بہت خوب! اب جب کہ آپ کے پاس ٹولز تیار ہیں، آئیے ایک سادہ سی مشق سے گزرتے ہیں جہاں ہم بٹ کوائن کی قیمت حاصل کرتے ہیں:

### BTC/USD مثال {#btcusd-example}

UsingTellor کنٹریکٹ کو وراثت میں حاصل کریں، Tellor ایڈریس کو کنسٹرکٹر آرگیومنٹ کے طور پر پاس کرتے ہوئے:

یہاں ایک مثال ہے:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //اس کنٹریکٹ کو اب UsingTellor کے تمام فنکشنز تک رسائی حاصل ہے

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

کنٹریکٹ ایڈریسز کی مکمل فہرست کے لیے [یہاں](https://docs.tellor.io/tellor/the-basics/contracts-reference) رجوع کریں۔

استعمال میں آسانی کے لیے، UsingTellor ریپو آسان انضمام کے لیے [Tellor Playground](https://github.com/tellor-io/TellorPlayground) کنٹریکٹ کے ایک ورژن کے ساتھ آتا ہے۔ مددگار فنکشنز کی فہرست کے لیے [یہاں](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) دیکھیں۔

Tellor اوریکل کے زیادہ مضبوط نفاذ کے لیے، دستیاب فنکشنز کی مکمل فہرست [یہاں](https://github.com/tellor-io/usingtellor/blob/master/README.md) دیکھیں۔
