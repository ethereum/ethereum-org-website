---
title: "اسمارٹ کنٹریکٹ سیکورٹی چیک لسٹ"
description: "محفوظ اسمارٹ کنٹریکٹس لکھنے کے لیے ایک تجویز کردہ ورک فلو"
author: "Trailofbits"
tags: [ "اسمارٹ معاہدات", "سیکورٹی", "solidity" ]
skill: intermediate
lang: ur-in
published: 2020-09-07
source: "محفوظ کنٹریکٹس بنانا"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## اسمارٹ کنٹریکٹ ڈیولپمنٹ چیک لسٹ {#smart-contract-development-checklist}

یہاں ایک اعلیٰ سطحی عمل ہے جس پر عمل کرنے کی ہم تجویز کرتے ہیں جب آپ اپنے اسمارٹ کنٹریکٹس لکھتے ہیں۔

معلوم سیکورٹی مسائل کے لیے چیک کریں:

- [Slither](https://github.com/crytic/slither) کے ساتھ اپنے کنٹریکٹس کا جائزہ لیں۔ اس میں عام کمزوریوں کے لیے 40 سے زیادہ بلٹ ان ڈیٹیکٹرز ہیں۔ اسے نئے کوڈ کے ساتھ ہر چیک ان پر چلائیں اور یقینی بنائیں کہ اسے ایک کلین رپورٹ ملے (یا بعض مسائل کو خاموش کرنے کے لیے ٹرائج موڈ استعمال کریں)۔
- [Crytic](https://crytic.io/) کے ساتھ اپنے کنٹریکٹس کا جائزہ لیں۔ یہ 50 ایسے مسائل کی جانچ کرتا ہے جو Slither نہیں کرتا۔ Crytic، GitHub پر Pull Requests میں سیکورٹی مسائل کو آسانی سے سامنے لا کر آپ کی ٹیم کو ایک دوسرے کے کام سے باخبر رہنے میں بھی مدد کر سکتا ہے۔

اپنے کنٹریکٹ کے خصوصی فیچرز پر غور کریں:

- کیا آپ کے کنٹریکٹس اپ گریڈ کے قابل ہیں؟ [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) یا [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) کے ساتھ خامیوں کے لیے اپنے اپ گریڈیبلٹی کوڈ کا جائزہ لیں۔ ہم نے 17 ایسے طریقوں کو دستاویز کیا ہے جن سے اپ گریڈز غلط ہو سکتے ہیں۔
- کیا آپ کے کنٹریکٹس ERCs کے مطابق ہونے کا دعویٰ کرتے ہیں؟ انھیں [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) سے چیک کریں۔ یہ ٹول چھ عام اسپیکس سے انحراف کو فوری طور پر شناخت کرتا ہے۔
- کیا آپ تھرڈ پارٹی ٹوکنز کے ساتھ انٹیگریٹ کرتے ہیں؟ بیرونی کنٹریکٹس پر انحصار کرنے سے پہلے ہمارے [ٹوکن انٹیگریشن چیک لسٹ](/developers/tutorials/token-integration-checklist/) کا جائزہ لیں۔

اپنے کوڈ کے اہم سیکورٹی فیچرز کا بصری طور پر معائنہ کریں:

- Slither کے [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) پرنٹر کا جائزہ لیں۔ نادانستہ شیڈونگ اور C3 لینیئرائزیشن کے مسائل سے بچیں۔
- Slither کے [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) پرنٹر کا جائزہ لیں۔ یہ فنکشن کی ویزیبلٹی اور رسائی کے کنٹرولز کو رپورٹ کرتا ہے۔
- Slither کے [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) پرنٹر کا جائزہ لیں۔ یہ اسٹیٹ ویری ایبلز پر رسائی کے کنٹرولز کو رپورٹ کرتا ہے۔

اہم سیکورٹی پراپرٹیز کو دستاویز کریں اور ان کا جائزہ لینے کے لیے آٹومیٹڈ ٹیسٹ جنریٹرز کا استعمال کریں:

- [اپنے کوڈ کے لیے سیکورٹی پراپرٹیز کو دستاویز کرنا](/developers/tutorials/guide-to-smart-contract-security-tools/) سیکھیں۔ پہلے تو یہ مشکل ہے، لیکن یہ ایک اچھا نتیجہ حاصل کرنے کے لیے سب سے اہم سرگرمی ہے۔ یہ اس ٹیوٹوریل میں کسی بھی جدید تکنیک کو استعمال کرنے کے لیے ایک پیشگی شرط بھی ہے۔
- Solidity میں سیکورٹی پراپرٹیز کی وضاحت کریں، [Echidna](https://github.com/crytic/echidna) اور [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) کے ساتھ استعمال کے لیے۔ اپنی اسٹیٹ مشین، رسائی کے کنٹرولز، حسابی کارروائیوں، بیرونی تعاملات، اور معیارات کی مطابقت پر توجہ دیں۔
- [Slither's Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) کے ساتھ سیکورٹی پراپرٹیز کی وضاحت کریں۔ انہیریٹنس، ویری ایبل ڈیپنڈنسیس، رسائی کے کنٹرولز، اور دیگر ساختی مسائل پر توجہ دیں۔
- [Crytic](https://crytic.io) کے ساتھ ہر کمٹ پر اپنے پراپرٹی ٹیسٹ چلائیں۔ Crytic سیکورٹی پراپرٹی ٹیسٹ کو استعمال اور ان کا جائزہ لے سکتا ہے تاکہ آپ کی ٹیم میں ہر کوئی آسانی سے دیکھ سکے کہ وہ GitHub پر پاس ہو گئے ہیں۔ ناکام ٹیسٹ کمٹس کو بلاک کر سکتے ہیں۔

آخر میں، ان مسائل سے آگاہ رہیں جنہیں آٹومیٹڈ ٹولز آسانی سے نہیں ڈھونڈ سکتے:

- پرائیویسی کی کمی: جب آپ کے ٹرانزیکشنز پول میں قطار میں ہوتے ہیں تو ہر کوئی انہیں دیکھ سکتا ہے
- فرنٹ رننگ ٹرانزیکشنز
- کرپٹوگرافک آپریشنز
- بیرونی DeFi کمپونینٹس کے ساتھ پرخطر تعاملات

## مدد طلب کریں {#ask-for-help}

[Ethereum آفس آورز](https://calendly.com/dan-trailofbits/office-hours) ہر منگل کی سہ پہر کو ہوتے ہیں۔ یہ 1 گھنٹے کے، 1-آن-1 سیشنز سیکورٹی کے بارے میں آپ کے کسی بھی سوال کو پوچھنے، ہمارے ٹولز کا استعمال کرتے ہوئے ٹربل شوٹ کرنے، اور ماہرین سے اپنے موجودہ نقطہ نظر کے بارے میں فیڈبیک حاصل کرنے کا ایک موقع ہیں۔ ہم اس گائیڈ پر کام کرنے میں آپ کی مدد کریں گے۔

ہمارے Slack میں شامل ہوں: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)۔ اگر آپ کے کوئی سوالات ہیں تو ہم #crytic اور #ethereum چینلز میں ہمیشہ دستیاب ہیں۔
