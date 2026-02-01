---
title: Rust ڈیولپرز کے لیے Ethereum
description: rust پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے Ethereum کے لیے ڈیولپ کرنے کا طریقہ سیکھیں
lang: ur-in
incomplete: true
---

<FeaturedText>Rust پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے Ethereum کے لیے ڈیولپ کرنے کا طریقہ سیکھیں</FeaturedText>

غیر مرکزی ایپلی کیشنز (یا "dapps") بنانے کے لیے Ethereum کا استعمال کریں جو کرپٹو کرنسی اور بلاک چین ٹیکنالوجی کے فوائد کا استعمال کرتی ہیں۔ یہ dapps قابل اعتماد ہو سکتی ہیں، یعنی ایک بار جب انہیں Ethereum پر ڈیپلائے کر دیا جاتا ہے، تو وہ ہمیشہ پروگرام کے مطابق چلیں گی۔ وہ نئی قسم کی مالیاتی ایپلی کیشنز بنانے کے لیے ڈیجیٹل اثاثوں کو کنٹرول کر سکتی ہیں۔ وہ غیر مرکزی ہو سکتی ہیں، یعنی کوئی واحد ادارہ یا شخص انہیں کنٹرول نہیں کرتا ہے اور انہیں سنسر کرنا تقریباً ناممکن ہے۔

## اسمارٹ کنٹریکٹس اور Solidity زبان کے ساتھ شروعات کرنا {#getting-started-with-smart-contracts-and-solidity}

**Rust کو Ethereum کے ساتھ مربوط کرنے کے لیے اپنے پہلے قدم اٹھائیں**

پہلے مزید بنیادی پرائمر کی ضرورت ہے؟ [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/) دیکھیں۔

- [بلاک چین کی وضاحت](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [اسمارٹ کنٹریکٹس کو سمجھنا](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اپنا پہلا اسمارٹ کنٹریکٹ لکھیں](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity کو کمپائل اور ڈیپلائے کرنے کا طریقہ سیکھیں](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ابتدائی مضامین {#beginner-articles}

- [Rust Ethereum کلائنٹ](https://openethereum.github.io/) \* **نوٹ کریں کہ OpenEthereum [کو فرسودہ قرار دے دیا گیا ہے](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) اور اب اس کی دیکھ بھال نہیں کی جا رہی ہے۔** اسے احتیاط کے ساتھ استعمال کریں اور ترجیحاً کسی دوسرے کلائنٹ کے نفاذ پر سوئچ کریں۔
- [Rust کا استعمال کرتے ہوئے Ethereum پر ٹرانزیکشن بھیجنا](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Kovan کے لیے rust Wasm میں کنٹریکٹس لکھنے کے طریقے پر ایک مرحلہ وار ٹیوٹوریل](https://github.com/paritytech/pwasm-tutorial)

## درمیانی سطح کے مضامین {#intermediate-articles}

## استعمال کے جدید پیٹرن {#advanced-use-patterns}

- [Ethereum جیسے نیٹ ورک کے ساتھ تعامل کرنے کے لیے pwasm_ethereum externs لائبریری](https://github.com/openethereum/pwasm-ethereum)

- [JavaScript اور Rust کا استعمال کرتے ہوئے ایک غیر مرکزی چیٹ بنائیں](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.js اور Rust کا استعمال کرتے ہوئے ایک غیر مرکزی ٹوڈو ایپ بنائیں](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Rust میں ایک بلاک چین بنائیں](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Rust پروجیکٹس اور ٹولز {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Ethereum جیسے نیٹ ورک کے ساتھ تعامل کرنے کے لیے externs کا مجموعہ_
- [Lighthouse](https://github.com/sigp/lighthouse) - _تیز رفتار Ethereum کنسینسس لیئر کلائنٹ_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly کے ایک ڈیٹرمنسٹک سب سیٹ کا استعمال کرتے ہوئے Ethereum اسمارٹ کنٹریکٹ ایگزیکیوشن لیئر کا مجوزہ ری ڈیزائن_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API حوالہ_
- [Solaris](https://github.com/paritytech/sol-rs) - _مقامی Parity کلائنٹ EVM کا استعمال کرتے ہوئے Solidity اسمارٹ کنٹریکٹس یونٹ ٹیسٹ ہارنس۔_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Rust Ethereum ورچوئل مشین کا نفاذ_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Rust میں Wavelet اسمارٹ کنٹریکٹ_
- [Foundry](https://github.com/foundry-rs/foundry) - _Ethereum ایپلیکیشن ڈیولپمنٹ کے لیے ٹول کٹ_
- [Alloy](https://alloy.rs) - _Ethereum اور دیگر EVM پر مبنی چینز کے ساتھ تعامل کے لیے اعلی کارکردگی والی، اچھی طرح سے آزمائی گئی اور دستاویزی لائبریریاں۔_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Ethereum لائبریری اور والیٹ کا نفاذ_
- [SewUp](https://github.com/second-state/SewUp) - _ایک لائبریری جو آپ کو Rust کے ساتھ اپنا Ethereum ویب اسمبلی کنٹریکٹ بنانے میں مدد کرتی ہے اور بالکل ایک عام بیک اینڈ میں ڈیولپ کرنے کی طرح ہے_
- [Substreams](https://github.com/streamingfast/substreams) - _متوازی بلاک چین ڈیٹا انڈیکسنگ ٹیکنالوجی_
- [Reth](https://github.com/paradigmxyz/reth) Reth (Rust Ethereum کا مخفف) ایک نیا Ethereum فل نوڈ نفاذ ہے
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Ethereum ایکو سسٹم میں Rust میں لکھے گئے پروجیکٹس کا ایک منتخب کردہ مجموعہ_

مزید وسائل کی تلاش ہے؟ [ethereum.org/developers.](/developers/) دیکھیں

## Rust کمیونٹی کے شراکت دار {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
