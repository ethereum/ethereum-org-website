---
title: "رسٹ (Rust) ڈیولپرز کے لیے ایتھیریم"
description: "رسٹ (Rust) پر مبنی پروجیکٹس اور ٹولز کا استعمال کرتے ہوئے ایتھیریم کے لیے ڈیولپمنٹ کا طریقہ سیکھیں"
lang: ur
incomplete: true
---

<FeaturedText>رسٹ (Rust) پر مبنی پروجیکٹس اور ٹولز کا استعمال کرتے ہوئے ایتھیریم کے لیے ڈیولپمنٹ کا طریقہ سیکھیں</FeaturedText>

ایتھیریم کا استعمال کرتے ہوئے ڈی سینٹرلائزڈ ایپلی کیشنز (یا "dapps") بنائیں جو کرپٹو کرنسی اور بلاک چین ٹیکنالوجی کے فوائد کو استعمال کرتی ہیں۔ یہ dapps قابل اعتماد ہو سکتی ہیں، جس کا مطلب ہے کہ ایک بار جب انہیں ایتھیریم پر ڈیپلائے کر دیا جائے، تو وہ ہمیشہ پروگرام کے مطابق چلیں گی۔ وہ نئی قسم کی مالیاتی ایپلی کیشنز بنانے کے لیے ڈیجیٹل اثاثوں کو کنٹرول کر سکتی ہیں۔ وہ ڈی سینٹرلائزڈ ہو سکتی ہیں، جس کا مطلب ہے کہ کوئی ایک ادارہ یا شخص انہیں کنٹرول نہیں کرتا اور انہیں سنسر کرنا تقریباً ناممکن ہے۔

## اسمارٹ کانٹریکٹس اور Solidity زبان کے ساتھ شروعات {#getting-started-with-smart-contracts-and-solidity}

**رسٹ (Rust) کو ایتھیریم کے ساتھ مربوط کرنے کے لیے اپنے پہلے قدم اٹھائیں**

کیا پہلے مزید بنیادی معلومات درکار ہیں؟ [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/) دیکھیں۔

- [بلاک چین کی وضاحت](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [اسمارٹ کانٹریکٹس کو سمجھنا](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اپنا پہلا اسمارٹ کانٹریکٹ لکھیں](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity کو کمپائل اور ڈیپلائے کرنے کا طریقہ سیکھیں](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ابتدائی مضامین {#beginner-articles}

- [رسٹ ایتھیریم کلائنٹ](https://openethereum.github.io/) \* **نوٹ کریں کہ OpenEthereum [متروک ہو چکا ہے](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) اور اب اسے برقرار نہیں رکھا جا رہا ہے۔** اسے احتیاط کے ساتھ استعمال کریں اور ترجیحی طور پر کسی دوسرے کلائنٹ پر منتقل ہو جائیں۔
- [رسٹ کا استعمال کرتے ہوئے ایتھیریم پر ٹرانزیکشن بھیجنا](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan کے لیے رسٹ Wasm میں کانٹریکٹس لکھنے کے طریقے پر مرحلہ وار ٹیوٹوریل](https://github.com/paritytech/pwasm-tutorial)

## درمیانی سطح کے مضامین {#intermediate-articles}

## ایڈوانسڈ استعمال کے پیٹرنز {#advanced-use-patterns}

- [ایتھیریم جیسے نیٹ ورک کے ساتھ تعامل کے لیے pwasm_ethereum externs لائبریری](https://github.com/openethereum/pwasm-ethereum)
- [JavaScript اور رسٹ کا استعمال کرتے ہوئے ایک ڈی سینٹرلائزڈ چیٹ بنائیں](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js اور رسٹ کا استعمال کرتے ہوئے ایک ڈی سینٹرلائزڈ ٹوڈو (Todo) ایپ بنائیں](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [رسٹ میں بلاک چین بنائیں](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## رسٹ پروجیکٹس اور ٹولز {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _ایتھیریم جیسے نیٹ ورک کے ساتھ تعامل کے لیے externs کا مجموعہ_
- [Lighthouse](https://github.com/sigp/lighthouse) - _تیز رفتار ایتھیریم کنسینسس لیئر کلائنٹ_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly کے ایک متعین ذیلی سیٹ کا استعمال کرتے ہوئے ایتھیریم اسمارٹ کانٹریکٹ ایگزیکیوشن لیئر کا مجوزہ ری ڈیزائن_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API کا حوالہ_
- [Solaris](https://github.com/paritytech/sol-rs) - _نیٹو Parity کلائنٹ EVM کا استعمال کرتے ہوئے Solidity اسمارٹ کانٹریکٹس یونٹ ٹیسٹ ہارنیس۔_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _رسٹ ایتھیریم ورچوئل مشین کا نفاذ_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _رسٹ میں Wavelet اسمارٹ کانٹریکٹ_
- [Foundry](https://github.com/foundry-rs/foundry) - _ایتھیریم ایپلی کیشن ڈیولپمنٹ کے لیے ٹول کٹ_
- [Alloy](https://alloy.rs) - _ایتھیریم اور دیگر EVM پر مبنی چینز کے ساتھ تعامل کے لیے اعلیٰ کارکردگی والی، اچھی طرح سے ٹیسٹ شدہ اور دستاویزی لائبریریاں۔_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _ایتھیریم لائبریری اور والیٹ کا نفاذ_
- [SewUp](https://github.com/second-state/SewUp) - _ایک لائبریری جو آپ کو رسٹ کے ساتھ اپنا ایتھیریم webassembly کانٹریکٹ بنانے میں مدد کرتی ہے، بالکل ایک عام بیک اینڈ میں ڈیولپ کرنے کی طرح_
- [Substreams](https://github.com/streamingfast/substreams) - _متوازی بلاک چین ڈیٹا انڈیکسنگ ٹیکنالوجی_
- [Reth](https://github.com/paradigmxyz/reth) Reth (رسٹ ایتھیریم کا مخفف) ایک نیا ایتھیریم فل-نوڈ نفاذ ہے
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _رسٹ میں لکھے گئے ایتھیریم ایکو سسٹم میں پروجیکٹس کا ایک منتخب مجموعہ_

مزید وسائل تلاش کر رہے ہیں؟ [ethereum.org/developers.](/developers/) دیکھیں۔

## رسٹ کمیونٹی کے معاونین {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)