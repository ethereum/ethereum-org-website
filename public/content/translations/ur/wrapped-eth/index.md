---
title: "ریپڈ ایتھر (ڈبلیو ایتھ)"
metaTitle: "ریپڈ ایتھر (ڈبلیو ایتھ) کیا ہے"
description: "ریپڈ ایتھر (ڈبلیو ایتھ) کا تعارف—ایتھر (⁦ETH⁩) کے لیے ایک ⁦ERC20⁩ سے مطابقت رکھنے والا ریپر۔"
lang: ur
---

<Alert variant="update">
<Emoji text="🎁" />
<div>کسی بھی چین پر <span dir="ltr">ETH</span> کو ریپ یا ان ریپ کرنے کے لیے اپنا والیٹ [<span dir="ltr">WrapETH.com</span>](https://www.wrapeth.com/) پر منسلک کریں</div>
</Alert>

ایتھر (<span dir="ltr">ETH</span>) ایتھیریم کی بنیادی کرنسی ہے۔ یہ کئی مقاصد کے لیے استعمال ہوتی ہے جیسے اسٹیکنگ، بطور کرنسی، اور کمپیوٹیشن کے لیے گیس فیس کی ادائیگی۔ **<span dir="ltr">WETH</span> دراصل <span dir="ltr">ETH</span> کی ایک اپ گریڈ شدہ شکل ہے جس میں کچھ اضافی خصوصیات شامل ہیں جو بہت سی ایپلی کیشنز اور [<span dir="ltr">ERC-20</span> ٹوکنز](/glossary/#erc-20) کے لیے درکار ہوتی ہیں**، جو ایتھیریم پر ڈیجیٹل اثاثوں کی دیگر اقسام ہیں۔ ان ٹوکنز کے ساتھ کام کرنے کے لیے، <span dir="ltr">ETH</span> کو انہی اصولوں کی پیروی کرنی چاہیے جو وہ کرتے ہیں، جسے <span dir="ltr">ERC-20</span> معیار کہا جاتا ہے۔

اس خلا کو پر کرنے کے لیے، ریپڈ ایتھر (ڈبلیو ایتھ) بنایا گیا تھا۔ **ریپڈ ایتھر ایک سمارٹ کنٹریکٹ ہے جو آپ کو کنٹریکٹ میں کسی بھی مقدار میں <span dir="ltr">ETH</span> جمع کرنے اور اتنی ہی مقدار میں منٹ شدہ <span dir="ltr">WETH</span> حاصل کرنے کی سہولت دیتا ہے** جو <span dir="ltr">ERC-20</span> ٹوکن معیار کے مطابق ہوتا ہے۔ <span dir="ltr">WETH</span> دراصل <span dir="ltr">ETH</span> کی ایک نمائندگی ہے جو آپ کو اس کے ساتھ ایک <span dir="ltr">ERC-20</span> ٹوکن کے طور پر تعامل کرنے کی اجازت دیتی ہے، نہ کہ مقامی اثاثہ <span dir="ltr">ETH</span> کے طور پر۔ آپ کو گیس فیس ادا کرنے کے لیے اب بھی مقامی <span dir="ltr">ETH</span> کی ضرورت ہوگی، لہذا جمع کرتے وقت کچھ بچا کر رکھنا یقینی بنائیں۔ 

آپ <span dir="ltr">WETH</span> سمارٹ کنٹریکٹ کا استعمال کر کے <span dir="ltr">WETH</span> کو <span dir="ltr">ETH</span> کے لیے ان ریپ کر سکتے ہیں۔ آپ <span dir="ltr">WETH</span> سمارٹ کنٹریکٹ کے ساتھ کسی بھی مقدار میں <span dir="ltr">WETH</span> کو ریڈیم کر سکتے ہیں، اور آپ کو اتنی ہی مقدار میں <span dir="ltr">ETH</span> موصول ہوگا۔ جمع کیا گیا <span dir="ltr">WETH</span> پھر برن کر دیا جاتا ہے اور <span dir="ltr">WETH</span> کی گردش کرنے والی سپلائی سے نکال دیا جاتا ہے۔

**گردش کرنے والی <span dir="ltr">ETH</span> سپلائی کا تقریباً <span dir="ltr">~3%</span> حصہ <span dir="ltr">WETH</span> ٹوکن کنٹریکٹ میں مقفل ہے** جو اسے سب سے زیادہ استعمال ہونے والے [سمارٹ کنٹریکٹس](/glossary/#smart-contract) میں سے ایک بناتا ہے۔ <span dir="ltr">WETH</span> خاص طور پر ان صارفین کے لیے اہم ہے جو غیر مرکزی مالیات (<span dir="ltr">DeFi</span>) میں ایپلی کیشنز کے ساتھ تعامل کرتے ہیں۔

## ہمیں <span dir="ltr">ETH</span> کو <span dir="ltr">ERC-20</span> کے طور پر ریپ کرنے کی ضرورت کیوں ہے؟ {#why-do-we-need-to-wrap-eth}

[<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) قابل منتقلی ٹوکنز کے لیے ایک معیاری انٹرفیس کی وضاحت کرتا ہے، تاکہ کوئی بھی ایسے ٹوکن بنا سکے جو ایتھیریم کے ایکو سسٹم میں اس معیار کو استعمال کرنے والی ایپلی کیشنز اور ٹوکنز کے ساتھ بغیر کسی رکاوٹ کے تعامل کریں۔ چونکہ **<span dir="ltr">ETH</span> کی تخلیق <span dir="ltr">ERC-20</span> معیار سے پہلے ہوئی تھی**، اس لیے <span dir="ltr">ETH</span> اس تصریح کے مطابق نہیں ہے۔ اس کا مطلب ہے کہ **آپ آسانی سے** <span dir="ltr">ETH</span> کا تبادلہ دیگر <span dir="ltr">ERC-20</span> ٹوکنز سے نہیں کر سکتے یا **<span dir="ltr">ERC-20</span> معیار استعمال کرنے والی ایپس میں <span dir="ltr">ETH</span> کا استعمال نہیں کر سکتے**۔ <span dir="ltr">ETH</span> کو ریپ کرنے سے آپ کو درج ذیل کام کرنے کا موقع ملتا ہے:

- **<span dir="ltr">ETH</span> کا <span dir="ltr">ERC-20</span> ٹوکنز سے تبادلہ**: آپ <span dir="ltr">ETH</span> کا براہ راست دیگر <span dir="ltr">ERC-20</span> ٹوکنز سے تبادلہ نہیں کر سکتے۔ <span dir="ltr">WETH</span> ایتھر کی ایک نمائندگی ہے جو <span dir="ltr">ERC-20</span> قابل تبادلہ ٹوکن معیار کی تعمیل کرتی ہے اور اس کا تبادلہ دیگر <span dir="ltr">ERC-20</span> ٹوکنز کے ساتھ کیا جا سکتا ہے۔ 

- **غیر مرکزی ایپلی کیشنز (<span dir="ltr">dapps</span>) میں <span dir="ltr">ETH</span> کا استعمال**: چونکہ <span dir="ltr">ETH</span>، <span dir="ltr">ERC-20</span> سے مطابقت نہیں رکھتا، اس لیے ڈیولپرز کو <span dir="ltr">dapps</span> میں الگ الگ انٹرفیس (ایک <span dir="ltr">ETH</span> کے لیے اور دوسرا <span dir="ltr">ERC-20</span> ٹوکنز کے لیے) بنانے کی ضرورت ہوگی۔ <span dir="ltr">ETH</span> کو ریپ کرنا اس رکاوٹ کو دور کرتا ہے اور ڈیولپرز کو ایک ہی <span dir="ltr">dapp</span> کے اندر <span dir="ltr">ETH</span> اور دیگر ٹوکنز کو ہینڈل کرنے کے قابل بناتا ہے۔ بہت سی غیر مرکزی مالیات کی ایپلی کیشنز اس معیار کو استعمال کرتی ہیں، اور ان ٹوکنز کے تبادلے کے لیے مارکیٹس بناتی ہیں۔

## ریپڈ ایتھر (ڈبلیو ایتھ) بمقابلہ ایتھر (<span dir="ltr">ETH</span>): کیا فرق ہے؟ {#weth-vs-eth-differences}


|            | **ایتھر (<span dir="ltr">ETH</span>)**                                                                                                                                                                                                                 | **ریپڈ ایتھر (<span dir="ltr">WETH</span>)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| سپلائی     | <span dir="ltr">ETH</span> کی [سپلائی](/eth/supply/) کا انتظام [ایتھیریم](/) پروٹوکول کے ذریعے کیا جاتا ہے۔ <span dir="ltr">ETH</span> کا [اجراء](/roadmap/merge/issuance) ایتھیریم کے توثیق کاروں کے ذریعے ٹرانزیکشنز پر کارروائی اور بلاکس بناتے وقت سنبھالا جاتا ہے۔                           | <span dir="ltr">WETH</span> ایک <span dir="ltr">ERC-20</span> ٹوکن ہے جس کی سپلائی کا انتظام ایک سمارٹ کنٹریکٹ کے ذریعے کیا جاتا ہے۔ صارفین سے <span dir="ltr">ETH</span> ڈپازٹس موصول ہونے کے بعد کنٹریکٹ کے ذریعے <span dir="ltr">WETH</span> کے نئے یونٹس جاری کیے جاتے ہیں، یا جب کوئی صارف <span dir="ltr">ETH</span> کے لیے <span dir="ltr">WETH</span> کو ریڈیم کرنا چاہتا ہے تو <span dir="ltr">WETH</span> کے یونٹس برن کر دیے جاتے ہیں۔                                                                                                                                        |
| ملکیت  | ملکیت کا انتظام ایتھیریم پروٹوکول کے ذریعے آپ کے اکاؤنٹ کے بیلنس کے ذریعے کیا جاتا ہے۔  | <span dir="ltr">WETH</span> کی ملکیت کا انتظام <span dir="ltr">WETH</span> ٹوکن سمارٹ کنٹریکٹ کے ذریعے کیا جاتا ہے، جسے ایتھیریم پروٹوکول کے ذریعے محفوظ کیا جاتا ہے۔                                                                                                                                         |
| گیس        | ایتھر (<span dir="ltr">ETH</span>) ایتھیریم نیٹ ورک پر کمپیوٹیشن کے لیے ادائیگی کی منظور شدہ اکائی ہے۔ گیس فیس <span dir="ltr">Gwei</span> (ایتھر کی ایک اکائی) میں ظاہر کی جاتی ہے۔                                                                                    | <span dir="ltr">WETH</span> ٹوکنز کے ساتھ گیس کی ادائیگی مقامی طور پر تعاون یافتہ نہیں ہے۔                                                                                                                                                                                              |

## اکثر پوچھے گئے سوالات {#faq}
 
<ExpandableCard title="کیا آپ ETH کو ریپ/ان ریپ کرنے کے لیے ادائیگی کرتے ہیں؟" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

آپ <span dir="ltr">WETH</span> کنٹریکٹ کا استعمال کرتے ہوئے <span dir="ltr">ETH</span> کو ریپ یا ان ریپ کرنے کے لیے گیس فیس ادا کرتے ہیں۔

</ExpandableCard>

<ExpandableCard title="کیا ڈبلیو ایتھ محفوظ ہے؟" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

<span dir="ltr">WETH</span> کو عام طور پر محفوظ سمجھا جاتا ہے کیونکہ یہ ایک سادہ، آزمودہ سمارٹ کنٹریکٹ پر مبنی ہے۔ <span dir="ltr">WETH</span> کنٹریکٹ کی رسمی تصدیق بھی کی گئی ہے، جو ایتھیریم پر سمارٹ کنٹریکٹس کے لیے اعلیٰ ترین حفاظتی معیار ہے۔

</ExpandableCard>

<ExpandableCard title="مجھے مختلف ڈبلیو ایتھ ٹوکنز کیوں نظر آ رہے ہیں؟" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

اس صفحے پر بیان کردہ [<span dir="ltr">WETH</span> کے مستند نفاذ](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) کے علاوہ، عملی استعمال میں دیگر اقسام بھی موجود ہیں۔ یہ ایپ ڈیولپرز کے ذریعے بنائے گئے کسٹم ٹوکنز یا دیگر بلاک چینز پر جاری کردہ ورژنز ہو سکتے ہیں، اور ان کا برتاؤ مختلف ہو سکتا ہے یا ان کی حفاظتی خصوصیات مختلف ہو سکتی ہیں۔ **یہ جاننے کے لیے کہ آپ کس <span dir="ltr">WETH</span> نفاذ کے ساتھ تعامل کر رہے ہیں، ہمیشہ ٹوکن کی معلومات کو دو بار چیک کریں۔**

</ExpandableCard>

<ExpandableCard title="دیگر نیٹ ورکس پر ڈبلیو ایتھ کنٹریکٹس کیا ہیں؟" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [ایتھیریم مین نیٹ](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [آربٹرم](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [آپٹیمزم](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">WETH</span> کیا ہے؟](https://weth.tkn.eth.limo/)
- [<span dir="ltr">Blockscout</span> پر <span dir="ltr">WETH</span> ٹوکن کی معلومات](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [<span dir="ltr">WETH</span> کی رسمی تصدیق](https://zellic.io/blog/formal-verification-weth)