---
title: "ڈیٹا کی ساختیں اور انکوڈنگ"
description: "بنیادی Ethereum ڈیٹا کی ساختوں کا ایک جائزہ۔"
lang: ur-in
sidebarDepth: 2
---

Ethereum بڑی مقدار میں ڈیٹا بناتا، ذخیرہ کرتا اور منتقل کرتا ہے۔ اس ڈیٹا کو معیاری اور میموری کے موافق طریقوں سے فارمیٹ کیا جانا چاہیے تاکہ کسی کو بھی نسبتاً معمولی کنزیومر گریڈ ہارڈویئر پر [ایک نوڈ چلانے](/run-a-node/) کی اجازت دی جا سکے۔ اس کو حاصل کرنے کے لیے، Ethereum اسٹیک پر کئی مخصوص ڈیٹا کی ساختیں استعمال کی جاتی ہیں۔

## شرائط {#prerequisites}

آپ کو Ethereum کی بنیادی باتوں اور [کلائنٹ سافٹ ویئر](/developers/docs/nodes-and-clients/) کو سمجھنا چاہیے۔ نیٹ ورکنگ لیئر اور [Ethereum وائٹ پیپر](/whitepaper/) سے واقفیت کی سفارش کی جاتی ہے۔

## ڈیٹا کی ساختیں {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Patricia Merkle Tries ایسی ساختیں ہیں جو کلیدی-ویلیو کے جوڑوں کو ایک ڈیٹرمنسٹک اور کرپٹوگرافک طور پر مستند trie میں انکوڈ کرتی ہیں۔ یہ Ethereum کی ایگزیکیوشن لیئر میں بڑے پیمانے پر استعمال ہوتے ہیں۔

[Patricia Merkle Tries کے بارے میں مزید](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) ایک سیریلائزیشن طریقہ ہے جو Ethereum کی ایگزیکیوشن لیئر میں بڑے پیمانے پر استعمال ہوتا ہے۔

[RLP کے بارے میں مزید](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) Ethereum کی کنسینسس لیئر پر ایک غالب سیریلائزیشن فارمیٹ ہے کیونکہ یہ merklelization کے ساتھ مطابقت رکھتا ہے۔

[SSZ کے بارے میں مزید](/developers/docs/data-structures-and-encoding/ssz)
