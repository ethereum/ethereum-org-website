---
title: سمارٹ کنٹریکٹ سیکیورٹی چیک لسٹ
description: محفوظ سمارٹ کنٹریکٹس لکھنے کے لیے ایک تجویز کردہ ورک فلو
author: "Trailofbits"
tags:
  - سمارٹ کنٹریکٹس
  - سیکیورٹی
  - solidity
skill: intermediate
breadcrumb: سیکیورٹی چیک لسٹ
lang: ur
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## سمارٹ کنٹریکٹ ڈیولپمنٹ چیک لسٹ {#smart-contract-development-checklist}

یہاں ایک اعلیٰ سطحی عمل ہے جس کی ہم آپ کو اپنے سمارٹ کنٹریکٹس لکھتے وقت پیروی کرنے کی تجویز دیتے ہیں۔

معلوم سیکیورٹی مسائل کی جانچ کریں:

- [سلدر](https://github.com/crytic/slither) کے ساتھ اپنے کنٹریکٹس کا جائزہ لیں۔ اس میں عام کمزوریوں کے لیے <span dir="ltr">40</span> سے زیادہ بلٹ ان ڈیٹیکٹرز ہیں۔ نئے کوڈ کے ساتھ ہر چیک ان پر اسے چلائیں اور یقینی بنائیں کہ اسے کلین رپورٹ ملے (یا کچھ مسائل کو خاموش کرنے کے لیے ٹرائیج موڈ استعمال کریں)۔
- [Crytic](https://crytic.io/) کے ساتھ اپنے کنٹریکٹس کا جائزہ لیں۔ یہ <span dir="ltr">50</span> ایسے مسائل کی جانچ کرتا ہے جو سلدر نہیں کرتا۔ Crytic آپ کی ٹیم کو ایک دوسرے سے باخبر رہنے میں بھی مدد کر سکتا ہے، GitHub پر پل ریکوئسٹس (Pull Requests) میں سیکیورٹی مسائل کو آسانی سے سامنے لا کر۔

اپنے کنٹریکٹ کی خاص خصوصیات پر غور کریں:

- کیا آپ کے کنٹریکٹس اپ گریڈ کے قابل ہیں؟ [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) یا [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) کے ساتھ خامیوں کے لیے اپنے اپ گریڈ ایبلٹی کوڈ کا جائزہ لیں۔ ہم نے <span dir="ltr">17</span> ایسے طریقے دستاویزی شکل میں بیان کیے ہیں جن سے اپ گریڈز خراب ہو سکتے ہیں۔
- کیا آپ کے کنٹریکٹس ERCs کے مطابق ہونے کا دعویٰ کرتے ہیں؟ انہیں [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) کے ساتھ چیک کریں۔ یہ ٹول فوری طور پر چھ عام تصریحات (specs) سے انحراف کی نشاندہی کرتا ہے۔
- کیا آپ تھرڈ پارٹی ٹوکنز کے ساتھ انضمام کرتے ہیں؟ بیرونی کنٹریکٹس پر انحصار کرنے سے پہلے ہماری [ٹوکن انضمام کی چیک لسٹ](/developers/tutorials/token-integration-checklist/) کا جائزہ لیں۔

اپنے کوڈ کی اہم سیکیورٹی خصوصیات کا بصری طور پر معائنہ کریں:

- سلدر کے [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) پرنٹر کا جائزہ لیں۔ نادانستہ شیڈونگ اور <span dir="ltr">C3</span> لینیئرائزیشن کے مسائل سے بچیں۔
- سلدر کے [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) پرنٹر کا جائزہ لیں۔ یہ فنکشن کی مرئیت (visibility) اور رسائی کے کنٹرولز کی رپورٹ کرتا ہے۔
- سلدر کے [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) پرنٹر کا جائزہ لیں۔ یہ حالت کے متغیرات (state variables) پر رسائی کے کنٹرولز کی رپورٹ کرتا ہے۔

اہم سیکیورٹی خصوصیات کو دستاویزی شکل دیں اور ان کا جائزہ لینے کے لیے خودکار ٹیسٹ جنریٹرز کا استعمال کریں:

- [اپنے کوڈ کے لیے سیکیورٹی خصوصیات کو دستاویزی شکل دینا](/developers/tutorials/guide-to-smart-contract-security-tools/) سیکھیں۔ یہ شروع میں مشکل ہوتا ہے، لیکن یہ ایک اچھے نتیجے کے حصول کے لیے سب سے اہم سرگرمی ہے۔ یہ اس ٹیوٹوریل میں موجود کسی بھی جدید تکنیک کو استعمال کرنے کے لیے ایک لازمی شرط بھی ہے۔
- [ایکڈنا](https://github.com/crytic/echidna) اور [مینٹیکور](https://manticore.readthedocs.io/en/latest/verifier.html) کے ساتھ استعمال کے لیے، Solidity میں سیکیورٹی خصوصیات کی وضاحت کریں۔ اپنی حالت کی مشین (state machine)، رسائی کے کنٹرولز، حسابی کارروائیوں، بیرونی تعاملات، اور معیارات کی مطابقت پر توجہ مرکوز کریں۔
- [سلدر کے Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) کے ساتھ سیکیورٹی خصوصیات کی وضاحت کریں۔ وراثت (inheritance)، متغیر انحصار، رسائی کے کنٹرولز، اور دیگر ساختی مسائل پر توجہ مرکوز کریں۔
- [Crytic](https://crytic.io) کے ساتھ ہر کمٹ پر اپنے پراپرٹی ٹیسٹ چلائیں۔ Crytic سیکیورٹی پراپرٹی ٹیسٹس کو استعمال اور جانچ سکتا ہے تاکہ آپ کی ٹیم کا ہر فرد آسانی سے دیکھ سکے کہ وہ GitHub پر پاس ہو رہے ہیں۔ ناکام ہونے والے ٹیسٹ کمٹس کو روک سکتے ہیں۔

آخر میں، ان مسائل کا خیال رکھیں جنہیں خودکار ٹولز آسانی سے نہیں ڈھونڈ سکتے:

- رازداری کی کمی: جب آپ کی ٹرانزیکشنز پول میں قطار میں ہوتی ہیں تو ہر کوئی انہیں دیکھ سکتا ہے
- فرنٹ رننگ ٹرانزیکشنز
- کرپٹوگرافک آپریشنز
- بیرونی غیر مرکزی مالیات (DeFi) اجزاء کے ساتھ پرخطر تعاملات

## مدد طلب کریں {#ask-for-help}

[ایتھیریم آفس کے اوقات](https://calendly.com/dan-trailofbits/office-hours) ہر منگل کی دوپہر کو ہوتے ہیں۔ یہ <span dir="ltr">1</span> گھنٹے کے، ون آن ون سیشنز آپ کے لیے سیکیورٹی کے بارے میں کوئی بھی سوال پوچھنے، ہمارے ٹولز کا استعمال کرتے ہوئے ٹربل شوٹ کرنے، اور اپنے موجودہ طریقہ کار کے بارے میں ماہرین سے رائے حاصل کرنے کا ایک موقع ہیں۔ ہم اس گائیڈ پر کام کرنے میں آپ کی مدد کریں گے۔

ہمارا Slack جوائن کریں: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)۔ اگر آپ کے کوئی سوالات ہیں تو ہم #crytic اور #ethereum چینلز میں ہمیشہ دستیاب ہیں۔