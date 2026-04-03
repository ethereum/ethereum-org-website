---
title: "اسمارٹ کانٹریکٹ سیکیورٹی چیک لسٹ"
description: "محفوظ اسمارٹ کانٹریکٹس لکھنے کے لیے تجویز کردہ ورک فلو"
author: "ٹریل آف بٹس"
tags: ["اسمارٹ کانٹریکٹس", "سیکیورٹی", "Solidity"]
skill: intermediate
breadcrumb: "سیکیورٹی چیک لسٹ"
lang: ur
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## اسمارٹ کانٹریکٹ ڈیولپمنٹ چیک لسٹ {#smart-contract-development-checklist}

یہاں ایک اعلیٰ سطحی عمل ہے جس کی ہم آپ کو اپنے اسمارٹ کانٹریکٹس لکھتے وقت پیروی کرنے کی تجویز دیتے ہیں۔

معلوم سیکیورٹی مسائل کی جانچ کریں:

- [Slither](https://github.com/crytic/slither) کے ساتھ اپنے کانٹریکٹس کا جائزہ لیں۔ اس میں عام کمزوریوں کے لیے 40 سے زیادہ بلٹ ان ڈیٹیکٹرز ہیں۔ اسے نئے کوڈ کے ساتھ ہر چیک ان پر چلائیں اور یقینی بنائیں کہ اسے کلین رپورٹ ملے (یا کچھ مسائل کو خاموش کرنے کے لیے ٹرائیج موڈ کا استعمال کریں)۔
- [Crytic](https://crytic.io/) کے ساتھ اپنے کانٹریکٹس کا جائزہ لیں۔ یہ 50 ایسے مسائل کی جانچ کرتا ہے جو Slither نہیں کرتا۔ Crytic GitHub پر پل ریکوئسٹس (Pull Requests) میں سیکیورٹی مسائل کو آسانی سے سامنے لا کر آپ کی ٹیم کو ایک دوسرے سے باخبر رہنے میں بھی مدد کر سکتا ہے۔

اپنے کانٹریکٹ کی خصوصی خصوصیات پر غور کریں:

- کیا آپ کے کانٹریکٹس اپ گریڈ کے قابل ہیں؟ [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) یا [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) کے ساتھ خامیوں کے لیے اپنے اپ گریڈ ایبلٹی کوڈ کا جائزہ لیں۔ ہم نے 17 ایسے طریقے دستاویزی شکل میں مرتب کیے ہیں جن سے اپ گریڈز خراب ہو سکتے ہیں۔
- کیا آپ کے کانٹریکٹس ERCs کے مطابق ہونے کا دعویٰ کرتے ہیں؟ انہیں [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) کے ساتھ چیک کریں۔ یہ ٹول فوری طور پر چھ عام تصریحات (specs) سے انحراف کی نشاندہی کرتا ہے۔
- کیا آپ تھرڈ پارٹی ٹوکنز کے ساتھ انضمام کرتے ہیں؟ بیرونی کانٹریکٹس پر انحصار کرنے سے پہلے ہماری [ٹوکن انضمام چیک لسٹ](/developers/tutorials/token-integration-checklist/) کا جائزہ لیں۔

اپنے کوڈ کی اہم سیکیورٹی خصوصیات کا بصری طور پر معائنہ کریں:

- Slither کے [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) پرنٹر کا جائزہ لیں۔ نادانستہ شیڈوونگ (shadowing) اور C3 لینیئرائزیشن (linearization) کے مسائل سے بچیں۔
- Slither کے [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) پرنٹر کا جائزہ لیں۔ یہ فنکشن کی وزیبلٹی اور ایکسیس کنٹرولز کی رپورٹ دیتا ہے۔
- Slither کے [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) پرنٹر کا جائزہ لیں۔ یہ اسٹیٹ (state) ویری ایبلز پر ایکسیس کنٹرولز کی رپورٹ دیتا ہے۔

اہم سیکیورٹی خصوصیات کو دستاویزی شکل دیں اور ان کا جائزہ لینے کے لیے خودکار ٹیسٹ جنریٹرز کا استعمال کریں:

- [اپنے کوڈ کے لیے سیکیورٹی خصوصیات کو دستاویزی شکل دینا](/developers/tutorials/guide-to-smart-contract-security-tools/) سیکھیں۔ یہ شروع میں مشکل ہوتا ہے، لیکن یہ ایک اچھے نتیجے کے حصول کے لیے واحد سب سے اہم سرگرمی ہے۔ یہ اس ٹیوٹوریل میں موجود کسی بھی جدید تکنیک کو استعمال کرنے کے لیے ایک لازمی شرط بھی ہے۔
- [Echidna](https://github.com/crytic/echidna) اور [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) کے ساتھ استعمال کے لیے، Solidity میں سیکیورٹی خصوصیات کی وضاحت کریں۔ اپنی اسٹیٹ مشین، ایکسیس کنٹرولز، ریاضیاتی آپریشنز، بیرونی تعاملات، اور معیارات کی مطابقت پر توجہ مرکوز کریں۔
- [Slither کی Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) کے ساتھ سیکیورٹی خصوصیات کی وضاحت کریں۔ وراثت (inheritance)، ویری ایبل انحصار، ایکسیس کنٹرولز، اور دیگر ساختی مسائل پر توجہ مرکوز کریں۔
- [Crytic](https://crytic.io) کے ساتھ ہر کمٹ (commit) پر اپنے پراپرٹی ٹیسٹ چلائیں۔ Crytic سیکیورٹی پراپرٹی ٹیسٹس کو استعمال اور جانچ سکتا ہے تاکہ آپ کی ٹیم کا ہر فرد آسانی سے دیکھ سکے کہ وہ GitHub پر پاس ہو گئے ہیں۔ فیل ہونے والے ٹیسٹ کمٹس کو روک سکتے ہیں۔

آخر میں، ان مسائل کا خیال رکھیں جنہیں خودکار ٹولز آسانی سے نہیں ڈھونڈ سکتے:

- پرائیویسی کی کمی: جب آپ کی ٹرانزیکشنز پول میں قطار میں ہوتی ہیں تو ہر کوئی انہیں دیکھ سکتا ہے
- فرنٹ رننگ (Front running) ٹرانزیکشنز
- کرپٹوگرافک آپریشنز
- بیرونی DeFi اجزاء کے ساتھ پرخطر تعاملات

## مدد طلب کریں {#ask-for-help}

[Ethereum office hours](https://calendly.com/dan-trailofbits/office-hours) ہر منگل کی سہ پہر کو ہوتے ہیں۔ یہ 1 گھنٹے کے، 1-on-1 سیشنز آپ کے لیے سیکیورٹی کے بارے میں کوئی بھی سوال پوچھنے، ہمارے ٹولز کا استعمال کرتے ہوئے ٹربل شوٹ کرنے، اور اپنے موجودہ طریقہ کار کے بارے میں ماہرین سے رائے حاصل کرنے کا ایک موقع ہیں۔ ہم اس گائیڈ پر کام کرنے میں آپ کی مدد کریں گے۔

ہمارے Slack میں شامل ہوں: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)۔ اگر آپ کا کوئی سوال ہے تو ہم #crytic اور #ethereum چینلز میں ہمیشہ دستیاب ہیں۔