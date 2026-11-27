---
title: "سمارٹ کنٹریکٹ سیکیورٹی چیک لسٹ"
description: "محفوظ سمارٹ کنٹریکٹس لکھنے کے لیے ایک تجویز کردہ ورک فلو"
author: "Trailofbits"
tags:
  - سمارٹ کنٹریکٹس
  - سیکیورٹی
  - solidity
skill: intermediate
breadcrumb: "سیکیورٹی چیک لسٹ"
lang: ur
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## سمارٹ کنٹریکٹ ڈیولپمنٹ چیک لسٹ {#smart-contract-development-checklist}

یہاں ایک اعلیٰ سطحی عمل ہے جس کی ہم آپ کو اپنے سمارٹ کنٹریکٹس لکھتے وقت پیروی کرنے کی تجویز کرتے ہیں۔

معلوم سیکیورٹی مسائل کی جانچ کریں:

- [<span dir="ltr">Slither</span>](https://github.com/crytic/slither) کے ساتھ اپنے کنٹریکٹس کا جائزہ لیں۔ اس میں عام کمزوریوں کے لیے <span dir="ltr">100</span> سے زیادہ بلٹ ان ڈیٹیکٹرز ہیں۔ اسے نئے کوڈ کے ساتھ ہر چیک ان پر چلائیں اور یقینی بنائیں کہ اسے کلین رپورٹ ملے (یا کچھ مسائل کو خاموش کرنے کے لیے ٹرائیج موڈ استعمال کریں)۔
- <span dir="ltr">Slither</span> کو CI میں چلائیں، مثال کے طور پر GitHub پر [slither-action](https://github.com/crytic/slither-action) کے ساتھ، تاکہ پل ریکوئسٹس میں سیکیورٹی مسائل سامنے آئیں۔

اپنے کنٹریکٹ کی خصوصی خصوصیات پر غور کریں:

- کیا آپ کے کنٹریکٹس اپ گریڈ کے قابل ہیں؟ [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) کے ساتھ خامیوں کے لیے اپنے اپ گریڈ ایبلٹی کوڈ کا جائزہ لیں۔ ہم نے <span dir="ltr">17</span> ایسے طریقے دستاویزی شکل میں پیش کیے ہیں جن سے اپ گریڈز خراب ہو سکتے ہیں۔
- کیا آپ کے کنٹریکٹس ERCs کے مطابق ہونے کا دعویٰ کرتے ہیں؟ انہیں [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) کے ساتھ چیک کریں۔ یہ ٹول فوری طور پر چھ عام تصریحات سے انحراف کی نشاندہی کرتا ہے۔
- کیا آپ تھرڈ پارٹی ٹوکنز کے ساتھ انضمام کرتے ہیں؟ بیرونی کنٹریکٹس پر انحصار کرنے سے پہلے ہماری [ٹوکن انضمام چیک لسٹ](/developers/tutorials/token-integration-checklist/) کا جائزہ لیں۔

اپنے کوڈ کی اہم سیکیورٹی خصوصیات کا بصری طور پر معائنہ کریں:

- سلدر کے [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) پرنٹر کا جائزہ لیں۔ نادانستہ شیڈونگ اور <span dir="ltr">C3</span> لینیئرائزیشن کے مسائل سے بچیں۔
- <span dir="ltr">Slither</span> کے [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) پرنٹر کا جائزہ لیں۔ یہ فنکشن کی مرئیت اور رسائی کے کنٹرولز کی رپورٹ کرتا ہے۔
- <span dir="ltr">Slither</span> کے [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) پرنٹر کا جائزہ لیں۔ یہ حالت کے متغیرات پر رسائی کے کنٹرولز کی رپورٹ کرتا ہے۔

اہم سیکیورٹی خصوصیات کو دستاویزی شکل دیں اور ان کا جائزہ لینے کے لیے خودکار ٹیسٹ جنریٹرز کا استعمال کریں:

- [اپنے کوڈ کے لیے سیکیورٹی خصوصیات کو دستاویزی شکل دینا](/developers/tutorials/guide-to-smart-contract-security-tools/) سیکھیں۔ یہ شروع میں مشکل ہے، لیکن یہ ایک اچھے نتیجے کے حصول کے لیے سب سے اہم سرگرمی ہے۔ یہ اس ٹیوٹوریل میں کسی بھی جدید تکنیک کو استعمال کرنے کے لیے ایک شرط بھی ہے۔
- [<span dir="ltr">Echidna</span>](https://github.com/crytic/echidna) اور [Medusa](https://github.com/crytic/medusa) جیسے فزرز، اور [hevm](https://hevm.dev/) جیسے علامتی عمل درآمد کے ٹولز کے ساتھ استعمال کے لیے، Solidity میں سیکیورٹی خصوصیات کی وضاحت کریں۔ اپنی حالت کی مشین، رسائی کے کنٹرولز، ریاضیاتی آپریشنز، بیرونی تعاملات، اور معیارات کی مطابقت پر توجہ مرکوز کریں۔
- [<span dir="ltr">Slither</span> کے Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) کے ساتھ سیکیورٹی خصوصیات کی وضاحت کریں۔ وراثت، متغیر انحصار، رسائی کے کنٹرولز، اور دیگر ساختی مسائل پر توجہ مرکوز کریں۔
- CI میں ہر کمٹ پر اپنے پراپرٹی ٹیسٹ چلائیں (مثال کے طور پر، GitHub Actions) تاکہ آپ کی ٹیم میں ہر کوئی آسانی سے دیکھ سکے کہ وہ پاس ہو گئے ہیں۔ ناکام ٹیسٹ مرجز کو روک سکتے ہیں۔

آخر میں، ان مسائل سے آگاہ رہیں جنہیں خودکار ٹولز آسانی سے نہیں ڈھونڈ سکتے:

- رازداری کا فقدان: جب آپ کی ٹرانزیکشنز پول میں قطار میں ہوتی ہیں تو ہر کوئی انہیں دیکھ سکتا ہے
- فرنٹ رننگ ٹرانزیکشنز
- کرپٹوگرافک آپریشنز
- بیرونی غیر مرکزی مالیات (DeFi) کے اجزاء کے ساتھ خطرناک تعاملات

## مدد طلب کریں {#ask-for-help}

[ایتھیریم آفس کے اوقات](https://meetings.hubspot.com/trailofbits/office-hours) ہر منگل کی دوپہر کو ہوتے ہیں۔ یہ <span dir="ltr">1</span> گھنٹے کے، ون آن ون سیشنز آپ کے لیے سیکیورٹی کے بارے میں کوئی بھی سوال پوچھنے، ہمارے ٹولز کا استعمال کرتے ہوئے ٹربل شوٹ کرنے، اور اپنے موجودہ طریقہ کار کے بارے میں ماہرین سے رائے حاصل کرنے کا ایک موقع ہیں۔ ہم اس گائیڈ پر کام کرنے میں آپ کی مدد کریں گے۔

ہمارا Slack جوائن کریں: [Empire Hacking](https://slack.empirehacking.nyc/)۔ اگر آپ کے کوئی سوالات ہیں تو ہم #crytic اور #ethereum چینلز میں ہمیشہ دستیاب ہیں۔
