---
title: "ایونٹس کے ساتھ سمارٹ کنٹریکٹس سے ڈیٹا لاگ کرنا"
description: "سمارٹ کنٹریکٹ ایونٹس کا تعارف اور آپ انہیں ڈیٹا لاگ کرنے کے لیے کیسے استعمال کر سکتے ہیں"
author: "jdourlens"
tags: ["سمارٹ کنٹریکٹس", "Remix", "Solidity", "ایونٹس"]
skill: intermediate
breadcrumb: "ایونٹ لاگنگ"
lang: ur
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

<span dir="ltr">Solidity</span> میں، [ایونٹس](/developers/docs/smart-contracts/anatomy/#events-and-logs) بھیجے گئے سگنلز ہیں جنہیں سمارٹ کنٹریکٹس فائر کر سکتے ہیں۔ غیر مرکزی ایپلی کیشنز (dapps)، یا ایتھیریم جے سن آر پی سی <span dir="ltr">API</span> سے منسلک کوئی بھی چیز، ان ایونٹس کو سن سکتی ہے اور اس کے مطابق عمل کر سکتی ہے۔ ایک ایونٹ کو انڈیکس بھی کیا جا سکتا ہے تاکہ ایونٹ کی ہسٹری کو بعد میں تلاش کیا جا سکے۔

## ایونٹس {#events}

اس مضمون کو لکھنے کے وقت ایتھیریم بلاک چین پر سب سے عام ایونٹ <span dir="ltr">Transfer</span> ایونٹ ہے جو <span dir="ltr">ERC20</span> ٹوکنز کے ذریعے اس وقت خارج ہوتا ہے جب کوئی ٹوکنز کی منتقلی کرتا ہے۔

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

ایونٹ کے دستخط کو کنٹریکٹ کوڈ کے اندر ڈکلیئر کیا جاتا ہے اور اسے <span dir="ltr">emit</span> کی ورڈ کے ساتھ خارج کیا جا سکتا ہے۔ مثال کے طور پر، <span dir="ltr">transfer</span> ایونٹ لاگ کرتا ہے کہ منتقلی کس نے بھیجی (<span dir="ltr">_from_</span>)، کس کو بھیجی (<span dir="ltr">_to_</span>) اور کتنے ٹوکنز منتقل کیے گئے (<span dir="ltr">_value_</span>)۔

اگر ہم اپنے <span dir="ltr">Counter</span> سمارٹ کنٹریکٹ پر واپس جائیں اور فیصلہ کریں کہ جب بھی ویلیو تبدیل ہو تو اسے لاگ کیا جائے۔ چونکہ اس کنٹریکٹ کو تعینات کرنے کا مقصد نہیں ہے بلکہ اسے ایکسٹینڈ کر کے دوسرا کنٹریکٹ بنانے کے لیے ایک بنیاد کے طور پر کام کرنا ہے: اسے ایک ایبسٹریکٹ کنٹریکٹ (abstract contract) کہا جاتا ہے۔ ہماری کاؤنٹر کی مثال کے معاملے میں، یہ کچھ اس طرح نظر آئے گا:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // کاؤنٹس کی تعداد کو محفوظ رکھنے کے لیے unsigned int ٹائپ کا پرائیویٹ ویری ایبل
    uint256 private count = 0;

    // وہ فنکشن جو ہمارے کاؤنٹر میں اضافہ کرتا ہے
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // کاؤنٹ کی ویلیو حاصل کرنے کے لیے گیٹر
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

نوٹ کریں کہ:

- **لائن <span dir="ltr">5</span>**: ہم اپنا ایونٹ ڈکلیئر کرتے ہیں اور یہ بتاتے ہیں کہ اس میں کیا شامل ہے، پرانی ویلیو اور نئی ویلیو۔

- **لائن <span dir="ltr">13</span>**: جب ہم اپنے <span dir="ltr">count</span> ویری ایبل میں اضافہ کرتے ہیں، تو ہم ایونٹ کو خارج (<span dir="ltr">emit</span>) کرتے ہیں۔

اگر اب ہم کنٹریکٹ کو تعینات کرتے ہیں اور <span dir="ltr">increment</span> فنکشن کو کال کرتے ہیں، تو ہم دیکھیں گے کہ اگر آپ <span dir="ltr">logs</span> نامی ایک سرنی (array) کے اندر نئی ٹرانزیکشن پر کلک کرتے ہیں تو <span dir="ltr">Remix</span> اسے خود بخود ظاہر کر دے گا۔

![Remix screenshot](./remix-screenshot.png)

لاگز آپ کے سمارٹ کنٹریکٹس کی ڈیبگنگ کے لیے واقعی مفید ہیں لیکن یہ اس وقت بھی اہم ہوتے ہیں جب آپ مختلف لوگوں کے زیر استعمال ایپلی کیشنز بناتے ہیں اور یہ تجزیات (analytics) کو آسان بناتے ہیں تاکہ ٹریک کیا جا سکے اور سمجھا جا سکے کہ آپ کا سمارٹ کنٹریکٹ کیسے استعمال ہو رہا ہے۔ ٹرانزیکشنز کے ذریعے تیار کردہ لاگز مقبول بلاک ایکسپلوررز میں دکھائے جاتے ہیں اور آپ مثال کے طور پر انہیں مخصوص ایونٹس کو سننے اور ان کے وقوع پذیر ہونے پر کارروائی کرنے کے لیے آف چین سکرپٹس بنانے کے لیے بھی استعمال کر سکتے ہیں۔