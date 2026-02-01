---
title: Elixir ڈویلپرز کے لیے Ethereum
description: جانیں کہ Elixir پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے Ethereum کے لیے کیسے ڈیولپ کریں۔
lang: ur-in
incomplete: false
---

<FeaturedText>جانیں کہ Elixir پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے Ethereum کے لیے کیسے ڈیولپ کریں۔</FeaturedText>

غیر مرکزی ایپلی کیشنز (یا "dapps") بنانے کے لیے Ethereum کا استعمال کریں جو کرپٹو کرنسی اور بلاک چین ٹیکنالوجی کے فوائد کا استعمال کرتی ہیں۔ یہ dapps ٹرسٹ لیس ہو سکتے ہیں، جس کا مطلب ہے کہ ایک بار جب انہیں Ethereum پر ڈیپلائے کر دیا جاتا ہے، تو وہ ہمیشہ پروگرام کے مطابق ہی چلیں گے۔ وہ نئی قسم کی مالیاتی ایپلی کیشنز بنانے کے لیے ڈیجیٹل اثاثوں کو کنٹرول کر سکتے ہیں۔ وہ غیر مرکزی ہو سکتی ہیں، یعنی کوئی واحد ادارہ یا شخص انہیں کنٹرول نہیں کرتا ہے اور انہیں سنسر کرنا تقریباً ناممکن ہے۔

## اسمارٹ کنٹریکٹس اور Solidity زبان کے ساتھ شروعات کرنا {#getting-started-with-smart-contracts-and-solidity}

**Elixir کو Ethereum کے ساتھ انٹیگریٹ کرنے کے لیے اپنے پہلے قدم اٹھائیں**

پہلے مزید بنیادی پرائمر کی ضرورت ہے؟ [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/) دیکھیں۔

- [بلاک چین کی وضاحت](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [اسمارٹ کنٹریکٹس کو سمجھنا](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اپنا پہلا اسمارٹ کنٹریکٹ لکھیں](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity کو کمپائل اور ڈیپلائے کرنے کا طریقہ سیکھیں](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ابتدائی مضامین {#beginner-articles}

- [بالآخر Ethereum اکاؤنٹس کو سمجھنا](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — Elixir کے لیے ایک فرسٹ کلاس Ethereum Web3 لائبریری](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## درمیانی سطح کے مضامین {#intermediate-articles}

- [Elixir کے ساتھ خام Ethereum کنٹریکٹ ٹرانزیکشنز پر کیسے دستخط کریں](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [Ethereum اسمارٹ کنٹریکٹس اور Elixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## Elixir پروجیکٹس اور ٹولز {#elixir-projects-and-tools}

### فعال {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _Elixir میں BIP32 اور BIP44 کا نفاذ (ڈیٹرمینسٹک والیٹس کے لیے ملٹی اکاؤنٹ ہائرارکی)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _Ethereum بلاک چین کے لیے Elixir JSON-RPC کلائنٹ_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _Elixir کا استعمال کرتے ہوئے Ethereum پر اسمارٹ کنٹریکٹس کے ساتھ تعامل کے لیے ایک جامع Web3 لائبریری_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers کے لیے ایک KMS سائنر لائبریری (AWS KMS کے ساتھ ٹرانزیکشنز پر دستخط کریں)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _Elixir میں Ethereum ABI پارسر/ڈیکوڈر/اینکوڈر کا نفاذ_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _ایک NIF بلٹ ٹائنی-کیکک رسٹ کریٹ کا استعمال کرتے ہوئے Keccak SHA3-256 ہیشز کا حساب لگانے کے لیے Elixir لائبریری_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _Ethereum کی RLP (ریکرسیو لینتھ پریفکس) انکوڈنگ کا Elixir نفاذ_

### آرکائیو شدہ / اب برقرار نہیں رکھا گیا {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _Elixir کے لیے Ethereum یوٹیلیٹیز_
- [exw3](https://github.com/hswick/exw3) - _Elixir کے لیے اعلی سطح کا Ethereum RPC کلائنٹ_
- [mana](https://github.com/mana-ethereum/mana) - _Elixir میں لکھا گیا Ethereum فل نوڈ کا نفاذ_

مزید وسائل کی تلاش ہے؟ [ہمارے ڈویلپرز کا ہوم](/developers/) دیکھیں۔

## Elixir کمیونٹی کے تعاون کنندگان {#elixir-community-contributors}

[Elixir کا سلیک #ethereum چینل](https://elixir-lang.slack.com/archives/C5RPZ3RJL) تیزی سے بڑھتی ہوئی کمیونٹی کی میزبانی کرتا ہے اور مذکورہ بالا کسی بھی پروجیکٹ اور متعلقہ موضوعات پر بات چیت کے لیے ایک وقف شدہ وسیلہ ہے۔
