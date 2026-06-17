---
title: "⁦ERC-777⁩ ٹوکن سٹینڈرڈ"
description: "⁦ERC-777⁩ کے بارے میں جانیں، جو ہکس کے ساتھ ایک بہتر قابل تبادلہ ٹوکن سٹینڈرڈ ہے، اگرچہ سیکیورٹی کے لیے ⁦ERC-20⁩ کی سفارش کی جاتی ہے۔"
lang: ur
---

## انتباہ {#warning}

**<span dir="ltr">ERC-777</span> کو صحیح طریقے سے نافذ کرنا مشکل ہے، کیونکہ اس میں [مختلف قسم کے حملوں کا خطرہ](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620) ہوتا ہے۔ اس کے بجائے [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) استعمال کرنے کی سفارش کی جاتی ہے۔** یہ صفحہ ایک تاریخی آرکائیو کے طور پر باقی ہے۔

## تعارف؟ {#introduction}

<span dir="ltr">ERC-777</span> ایک قابل تبادلہ ٹوکن سٹینڈرڈ ہے جو موجودہ [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) سٹینڈرڈ کو بہتر بناتا ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) کے بارے میں پڑھیں۔

## <span dir="ltr">ERC-777</span>، <span dir="ltr">ERC-20</span> پر کیا بہتری تجویز کرتا ہے؟ {#-erc-777-vs-erc-20}

<span dir="ltr">ERC-777</span>، <span dir="ltr">ERC-20</span> کے مقابلے میں درج ذیل بہتری فراہم کرتا ہے۔

### ہکس {#hooks}

ہکس ایک فنکشن ہیں جو سمارٹ کنٹریکٹ کے کوڈ میں بیان کیے گئے ہیں۔ جب کنٹریکٹ کے ذریعے ٹوکن بھیجے یا وصول کیے جاتے ہیں تو ہکس کو کال کیا جاتا ہے۔ یہ سمارٹ کنٹریکٹ کو آنے والے یا جانے والے ٹوکنز پر ردعمل ظاہر کرنے کی اجازت دیتا ہے۔

ہکس کو [<span dir="ltr">ERC-1820</span>](https://eips.ethereum.org/EIPS/eip-1820) سٹینڈرڈ کا استعمال کرتے ہوئے رجسٹر اور دریافت کیا جاتا ہے۔

#### ہکس کیوں شاندار ہیں؟ {#why-are-hooks-great}

1. ہکس ایک ہی ٹرانزیکشن میں کنٹریکٹ کو ٹوکن بھیجنے اور کنٹریکٹ کو مطلع کرنے کی اجازت دیتے ہیں، برخلاف [<span dir="ltr">ERC-20</span>](https://eips.ethereum.org/EIPS/eip-20) کے، جسے یہ حاصل کرنے کے لیے ڈبل کال (`approve`/`transferFrom`) کی ضرورت ہوتی ہے۔
2. وہ کنٹریکٹ جنہوں نے ہکس رجسٹر نہیں کیے ہیں وہ <span dir="ltr">ERC-777</span> کے ساتھ مطابقت نہیں رکھتے۔ جب وصول کرنے والے کنٹریکٹ نے ہک رجسٹر نہیں کیا ہوتا تو بھیجنے والا کنٹریکٹ ٹرانزیکشن کو منسوخ کر دے گا۔ یہ غیر <span dir="ltr">ERC-777</span> سمارٹ کنٹریکٹ میں حادثاتی منتقلی کو روکتا ہے۔
3. ہکس ٹرانزیکشنز کو مسترد کر سکتے ہیں۔

### اعشاریے {#decimals}

یہ سٹینڈرڈ <span dir="ltr">ERC-20</span> میں پیدا ہونے والی `decimals` کے حوالے سے الجھن کو بھی حل کرتا ہے۔ یہ وضاحت ڈیولپر کے تجربے کو بہتر بناتی ہے۔

### <span dir="ltr">ERC-20</span> کے ساتھ بیک ورڈ مطابقت {#backwards-compatibility-with-erc-20}

<span dir="ltr">ERC-777</span> کنٹریکٹ کے ساتھ اس طرح تعامل کیا جا سکتا ہے جیسے وہ <span dir="ltr">ERC-20</span> کنٹریکٹ ہوں۔

## مزید مطالعہ {#further-reading}

[<span dir="ltr">EIP-777</span>: ٹوکن سٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-777)