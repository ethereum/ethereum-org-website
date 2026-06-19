---
title: اپنا پہلا سمارٹ کنٹریکٹ تعینات کرنا
description: ایتھیریم ٹیسٹ نیٹ ورک پر اپنا پہلا سمارٹ کنٹریکٹ تعینات کرنے کا تعارف
author: "jdourlens"
tags:
  - سمارٹ کنٹریکٹس
  - remix
  - solidity
  - تعینات کرنا
skill: beginner
breadcrumb: پہلا کنٹریکٹ تعینات کریں
lang: ur
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

میرا خیال ہے کہ آپ بھی ہماری طرح ایتھیریم بلاک چین پر اپنا پہلا [سمارٹ کنٹریکٹ](/developers/docs/smart-contracts/) [تعینات کرنے](/developers/docs/smart-contracts/deploying/) اور اس کے ساتھ تعامل کرنے کے لیے پرجوش ہوں گے۔

فکر نہ کریں، چونکہ یہ ہمارا پہلا سمارٹ کنٹریکٹ ہے، اس لیے ہم اسے ایک [مقامی ٹیسٹ نیٹ ورک](/developers/docs/networks/) پر تعینات کریں گے تاکہ آپ کو اسے تعینات کرنے پر کوئی قیمت ادا نہ کرنی پڑے اور آپ جتنا چاہیں اس کے ساتھ کھیل سکیں۔

## اپنا کنٹریکٹ لکھنا {#writing-our-contract}

پہلا قدم [Remix پر جانا](https://remix.ethereum.org/) اور ایک نئی فائل بنانا ہے۔ Remix انٹرفیس کے اوپری بائیں حصے پر ایک نئی فائل شامل کریں اور اپنی پسند کا فائل کا نام درج کریں۔

![Adding a new file in the Remix interface](./remix.png)

نئی فائل میں، ہم درج ذیل کوڈ پیسٹ کریں گے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // کاؤنٹس کی تعداد کو محفوظ رکھنے کے لیے unsigned int ٹائپ کا پبلک ویری ایبل
    uint256 public count = 0;

    // وہ فنکشن جو ہمارے کاؤنٹر میں اضافہ کرتا ہے
    function increment() public {
        count += 1;
    }

    // کاؤنٹ کی ویلیو حاصل کرنے کے لیے غیر ضروری گیٹر
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

اگر آپ پروگرامنگ کے عادی ہیں تو آپ آسانی سے اندازہ لگا سکتے ہیں کہ یہ پروگرام کیا کرتا ہے۔ یہاں لائن بہ لائن وضاحت دی گئی ہے:

- لائن <span dir="ltr">4</span>: ہم `Counter` کے نام سے ایک کنٹریکٹ کی وضاحت کرتے ہیں۔
- لائن <span dir="ltr">7</span>: ہمارا کنٹریکٹ `count` نامی ایک ان سائنڈ انٹیجر (unsigned integer) کو اسٹور کرتا ہے جو <span dir="ltr">0</span> سے شروع ہوتا ہے۔
- لائن <span dir="ltr">10</span>: پہلا فنکشن کنٹریکٹ کی حالت کو تبدیل کرے گا اور ہمارے ویری ایبل `count` کو `increment()` کرے گا۔
- لائن <span dir="ltr">15</span>: دوسرا فنکشن صرف ایک گیٹر (getter) ہے تاکہ سمارٹ کنٹریکٹ کے باہر `count` ویری ایبل کی قدر کو پڑھا جا سکے۔ نوٹ کریں کہ، چونکہ ہم نے اپنے `count` ویری ایبل کو پبلک کے طور پر بیان کیا ہے، اس لیے یہ ضروری نہیں ہے لیکن اسے ایک مثال کے طور پر دکھایا گیا ہے۔

ہمارے پہلے سادہ سمارٹ کنٹریکٹ کے لیے بس اتنا ہی ہے۔ جیسا کہ آپ جانتے ہوں گے، یہ Java یا <span dir="ltr">C++</span> جیسی <span dir="ltr">OOP (Object-Oriented Programming)</span> زبانوں کی ایک کلاس کی طرح لگتا ہے۔ اب وقت آگیا ہے کہ ہم اپنے کنٹریکٹ کے ساتھ کھیلیں۔

## اپنا کنٹریکٹ تعینات کرنا {#deploying-our-contract}

چونکہ ہم نے اپنا بالکل پہلا سمارٹ کنٹریکٹ لکھ لیا ہے، اب ہم اسے بلاک چین پر تعینات کریں گے تاکہ اس کے ساتھ کھیل سکیں۔

[سمارٹ کنٹریکٹ کو بلاک چین پر تعینات کرنا](/developers/docs/smart-contracts/deploying/) دراصل کسی وصول کنندہ کی وضاحت کیے بغیر مرتب شدہ (compiled) سمارٹ کنٹریکٹ کے کوڈ پر مشتمل ایک ٹرانزیکشن بھیجنا ہے۔

ہم سب سے پہلے بائیں جانب موجود کمپائل آئیکن پر کلک کر کے [کنٹریکٹ کو کمپائل](/developers/docs/smart-contracts/compiling/) کریں گے:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

پھر کمپائل بٹن پر کلک کریں:

![The compile button in the Remix solidity compiler](./remix-compile.png)

آپ “Auto compile” آپشن کو منتخب کرنے کا انتخاب کر سکتے ہیں تاکہ جب بھی آپ ٹیکسٹ ایڈیٹر پر مواد محفوظ کریں تو کنٹریکٹ ہمیشہ کمپائل ہو جائے۔

پھر "deploy and run transactions" اسکرین پر جائیں:

![The deploy icon in the Remix toolbar](./remix-deploy.png)

ایک بار جب آپ "deploy and run transactions" اسکرین پر آ جائیں، تو دوبارہ چیک کریں کہ آپ کے کنٹریکٹ کا نام ظاہر ہو رہا ہے اور Deploy پر کلک کریں۔ جیسا کہ آپ صفحے کے اوپری حصے میں دیکھ سکتے ہیں، موجودہ ماحول “JavaScript VM” ہے جس کا مطلب ہے کہ ہم اپنے سمارٹ کنٹریکٹ کو ایک مقامی ٹیسٹ بلاک چین پر تعینات کریں گے اور اس کے ساتھ تعامل کریں گے تاکہ تیزی سے اور بغیر کسی فیس کے ٹیسٹ کر سکیں۔

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

ایک بار جب آپ “Deploy” بٹن پر کلک کر لیں گے، تو آپ کو اپنا کنٹریکٹ نیچے ظاہر ہوتا ہوا نظر آئے گا۔ اسے پھیلانے کے لیے بائیں جانب موجود تیر پر کلک کریں تاکہ ہم اپنے کنٹریکٹ کا مواد دیکھ سکیں۔ یہ ہمارا ویری ایبل `counter`، ہمارا `increment()` فنکشن اور گیٹر `getCounter()` ہے۔

اگر آپ `count` یا `getCount` بٹن پر کلک کرتے ہیں، تو یہ دراصل کنٹریکٹ کے `count` ویری ایبل کا مواد بازیافت کرے گا اور اسے ظاہر کرے گا۔ چونکہ ہم نے ابھی تک `increment` فنکشن کو کال نہیں کیا ہے، اس لیے اسے <span dir="ltr">0</span> دکھانا چاہیے۔

![The function button in the Remix solidity compiler](./remix-function-button.png)

آئیے اب بٹن پر کلک کر کے `increment` فنکشن کو کال کریں۔ آپ کو ونڈو کے نچلے حصے میں ہونے والی ٹرانزیکشنز کے لاگز ظاہر ہوتے ہوئے نظر آئیں گے۔ آپ دیکھیں گے کہ جب آپ `increment` بٹن کے بجائے ڈیٹا بازیافت کرنے کے لیے بٹن دباتے ہیں تو لاگز مختلف ہوتے ہیں۔ اس کی وجہ یہ ہے کہ بلاک چین پر ڈیٹا پڑھنے کے لیے کسی ٹرانزیکشن (لکھنے) یا فیس کی ضرورت نہیں ہوتی۔ کیونکہ صرف بلاک چین کی حالت کو تبدیل کرنے کے لیے ٹرانزیکشن کرنے کی ضرورت ہوتی ہے:

![A log of transactions](./transaction-log.png)

انکریمنٹ (increment) بٹن دبانے کے بعد جو ہمارے `increment()` فنکشن کو کال کرنے کے لیے ایک ٹرانزیکشن تیار کرے گا، اگر ہم واپس count یا getCount بٹنز پر کلک کریں گے تو ہم اپنے سمارٹ کنٹریکٹ کی نئی اپ ڈیٹ شدہ حالت کو پڑھیں گے جس میں count ویری ایبل <span dir="ltr">0</span> سے بڑا ہوگا۔

![Newly updated state of the smart contract](./updated-state.png)

اگلے ٹیوٹوریل میں، ہم اس بات کا احاطہ کریں گے کہ [آپ اپنے سمارٹ کنٹریکٹس میں ایونٹس کیسے شامل کر سکتے ہیں](/developers/tutorials/logging-events-smart-contracts/)۔ ایونٹس کو لاگ کرنا آپ کے سمارٹ کنٹریکٹ کو ڈیبگ کرنے اور یہ سمجھنے کا ایک آسان طریقہ ہے کہ فنکشن کو کال کرتے وقت کیا ہو رہا ہے۔