---
title: "ایلکسر (Elixir) ڈیولپرز کے لیے ایتھیریم"
description: "ایلکسر (Elixir) پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے ایتھیریم کے لیے ڈیولپمنٹ کا طریقہ سیکھیں۔"
lang: ur
incomplete: false
---

<FeaturedText>ایلکسر (Elixir) پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے ایتھیریم کے لیے ڈیولپمنٹ کا طریقہ سیکھیں۔</FeaturedText>

کرپٹو کرنسی اور بلاک چین ٹیکنالوجی کے فوائد کو استعمال کرنے والی ڈی سینٹرلائزڈ ایپلی کیشنز (یا "dapps") بنانے کے لیے ایتھیریم کا استعمال کریں۔ یہ dapps ٹرسٹ لیس (trustless) ہو سکتی ہیں، جس کا مطلب ہے کہ ایک بار جب انہیں ایتھیریم پر ڈیپلائے کر دیا جاتا ہے، تو وہ ہمیشہ پروگرام کے مطابق چلیں گی۔ وہ نئی قسم کی مالیاتی ایپلی کیشنز بنانے کے لیے ڈیجیٹل اثاثوں کو کنٹرول کر سکتی ہیں۔ وہ ڈی سینٹرلائزڈ ہو سکتی ہیں، جس کا مطلب ہے کہ کوئی ایک ادارہ یا شخص انہیں کنٹرول نہیں کرتا اور انہیں سنسر کرنا تقریباً ناممکن ہے۔

## اسمارٹ کانٹریکٹس اور Solidity زبان کے ساتھ شروعات {#getting-started-with-smart-contracts-and-solidity}

**ایلکسر (Elixir) کو ایتھیریم کے ساتھ مربوط کرنے کے لیے اپنے پہلے قدم اٹھائیں**

کیا پہلے مزید بنیادی معلومات کی ضرورت ہے؟ [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/) دیکھیں۔

- [بلاک چین کی وضاحت](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [اسمارٹ کانٹریکٹس کو سمجھنا](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اپنا پہلا اسمارٹ کانٹریکٹ لکھیں](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity کو کمپائل اور ڈیپلائے کرنے کا طریقہ سیکھیں](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ابتدائی مضامین {#beginner-articles}

- [بالآخر ایتھیریم اکاؤنٹس کو سمجھنا](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — ایلکسر کے لیے ایک فرسٹ کلاس ایتھیریم Web3 لائبریری](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## درمیانی سطح کے مضامین {#intermediate-articles}

- [ایلکسر کے ساتھ خام ایتھیریم کانٹریکٹ ٹرانزیکشنز کو سائن کرنے کا طریقہ](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [ایتھیریم اسمارٹ کانٹریکٹس اور ایلکسر](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## ایلکسر پروجیکٹس اور ٹولز {#elixir-projects-and-tools}

### فعال {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _ایلکسر میں BIP32 اور BIP44 کا نفاذ (ڈیٹرمینسٹک والٹس کے لیے ملٹی اکاؤنٹ ہائیرارکی)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _ایتھیریم بلاک چین کے لیے ایلکسر JSON-RPC کلائنٹ_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _ایلکسر کا استعمال کرتے ہوئے ایتھیریم پر اسمارٹ کانٹریکٹس کے ساتھ تعامل کے لیے ایک جامع Web3 لائبریری_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers کے لیے ایک KMS سائنر لائبریری (AWS KMS کے ساتھ ٹرانزیکشنز سائن کریں)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _ایلکسر میں ایتھیریم ABI پارسر/ڈیکوڈر/انکوڈر کا نفاذ_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _NIF سے بنے tiny-keccak Rust کریٹ کا استعمال کرتے ہوئے Keccak SHA3-256 ہیشز کا حساب لگانے کے لیے ایلکسر لائبریری_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _ایتھیریم کی RLP (Recursive Length Prefix) انکوڈنگ کا ایلکسر میں نفاذ_

### آرکائیو شدہ / اب مینٹین نہیں کیے جاتے {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _ایلکسر کے لیے ایتھیریم یوٹیلیٹیز_
- [exw3](https://github.com/hswick/exw3) - _ایلکسر کے لیے ہائی لیول ایتھیریم RPC کلائنٹ_
- [mana](https://github.com/mana-ethereum/mana) - _ایلکسر میں لکھا گیا ایتھیریم فل نوڈ کا نفاذ_

مزید وسائل تلاش کر رہے ہیں؟ ہمارا [ڈیولپرز ہوم](/developers/) دیکھیں۔

## ایلکسر کمیونٹی کے معاونین {#elixir-community-contributors}

[ایلکسر کا Slack #ethereum چینل](https://elixir-lang.slack.com/archives/C5RPZ3RJL) تیزی سے بڑھتی ہوئی کمیونٹی کا میزبان ہے اور مندرجہ بالا کسی بھی پروجیکٹ اور متعلقہ موضوعات پر بات چیت کے لیے ایک مخصوص وسیلہ ہے۔