---
title: "إثيريوم لمطوري رست"
description: "تعرف على كيفية التطوير لإثيريوم باستخدام مشروعات وأدوات قائمة على rust"
lang: ar
incomplete: true
---

<FeaturedText>تعلم كيفية التطوير على إيثريوم باستخدام المشاريع والأدوات القائمة على Rust</FeaturedText>

استخدم إثيريوم لإنشاء تطبيقات لامركزية (أو "dapp") تستخدم فوائد العملات المشفرة وتكنولوجيا سلسلة الكتل. قد تكون هذه التطبيقات اللامركزية جديرة بالثقة، بمعنى أنه بمجرد نشرها على إثيريوم، فستعمل دائمًا كما تم برمجتها بالضبط. ويمكن لتلك التطبيقات اللامركزية التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. كما أنها قد تكون لامركزية، بمعنى عدم وجود كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل مراقبتها.

## بدء العمل مع العقود الذكية ولغة سوليديتي

**اخط خطواتك الأولي لدمج لغة Rust مع إثيريوم**

هل تحتاج مفاهيم أساسيه أولاً؟ تحقق من [ethereum.org/learn](/learn/) أو [ethereum.org/developers](/developers/).

- [شرح البلوكتشين](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اكتب أول عقد ذكي الخاص بك](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مقالات للمبتدئين{#beginner-articles}

- [عميل إيثريوم Rust](https://openethereum.github.io/) \* **لاحظ أنه تم إيقاف OpenEthereum [ولم يعد يتم صيانته](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd).** استخدمه بحذر ويفضل التبديل إلى تنفيذ عميل آخر.
- [إرسال معاملة إلى إيثريوم باستخدام Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [برنامج تعليمي خطوة بخطوة حول كيفية كتابة العقود في rust Wasm لـ Kovan](https://github.com/paritytech/pwasm-tutorial)

## المقالات الوسيطة {#intermediate-articles}

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [مكتبة pwasm_ethereum externs للتفاعل مع شبكة شبيهة بالإيثريوم](https://github.com/openethereum/pwasm-ethereum)

- [أنشئ دردشة لامركزية باستخدام JavaScript وRust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [أنشئ تطبيق مهام لامركزيًا باستخدام Vue.js وRust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [إنشاء بلوكتشين في Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## مشاريع وأدوات Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _مجموعة من العناصر الخارجية للتفاعل مع شبكة شبيهة بالإيثريوم_
- [Lighthouse](https://github.com/sigp/lighthouse) - _عميل سريع لطبقة إجماع إيثريوم_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _إعادة تصميم مقترحة لطبقة تنفيذ العقود الذكية في إيثريوم باستخدام مجموعة فرعية حتمية من WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _مرجع واجهة برمجة تطبيقات OASIS_
- [Solaris](https://github.com/paritytech/sol-rs) - _أداة اختبار وحدة العقود الذكية المكتوبة بلغة Solidity باستخدام عميل Parity الأصلي EVM._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _تنفيذ آلة إيثريوم الافتراضية بلغة Rust_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _عقد Wavelet ذكي في Rust_
- [Foundry](https://github.com/foundry-rs/foundry) - _مجموعة أدوات لتطوير تطبيقات إيثريوم_
- [Alloy](https://alloy.rs) - _مكتبات عالية الأداء، ومُختبرة جيدًا وموثقة للتفاعل مع إيثريوم والسلاسل الأخرى القائمة على EVM._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _مكتبة إيثريوم وتنفيذ المحفظة_
- [SewUp](https://github.com/second-state/SewUp) - _مكتبة لمساعدتك في بناء عقد WebAssembly لإيثريوم باستخدام Rust تمامًا مثل التطوير في الواجهات الخلفية الشائعة_
- [Substreams](https://github.com/streamingfast/substreams) - _تقنية فهرسة بيانات البلوكتشين المتوازية_
- [Reth](https://github.com/paradigmxyz/reth) Reth (اختصار لـ Rust Ethereum) هو تنفيذ جديد لعقدة إيثريوم كاملة
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _مجموعة منسقة من المشاريع في النظام البيئي لإيثريوم مكتوبة بلغة Rust_

تبحث عن المزيد من المصادر؟ راجع [ethereum.org/developers.](/developers/)

## مساهمو مجتمع Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
