---
title: "إيثيريوم لمطوري ⁦Rust⁩"
description: "تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على ⁦Rust⁩"
lang: ar
incomplete: true
---

<FeaturedText>تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على <span dir="ltr">Rust</span></FeaturedText>

استخدم إيثيريوم لإنشاء تطبيقات لامركزية (<span dir="ltr">dapps</span>) تستفيد من مزايا العملات المشفرة وتكنولوجيا سلسلة الكتل. يمكن أن تكون هذه التطبيقات اللامركزية (<span dir="ltr">dapps</span>) جديرة بالثقة، مما يعني أنه بمجرد نشرها على إيثيريوم، فإنها ستعمل دائمًا كما تمت برمجتها. يمكنها التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. يمكن أن تكون لامركزية، مما يعني أنه لا يوجد كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل فرض رقابة عليها.

## البدء مع العقود الذكية ولغة <span dir="ltr">Solidity</span> {#getting-started-with-smart-contracts-and-solidity}

**اتخذ خطواتك الأولى لدمج <span dir="ltr">Rust</span> مع إيثيريوم**

هل تحتاج إلى مقدمة أساسية أولاً؟ تحقق من [<span dir="ltr">ethereum.org/learn</span>](/learn/) أو [<span dir="ltr">ethereum.org/developers</span>](/developers/).

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر <span dir="ltr">Solidity</span>](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مقالات للمبتدئين {#beginner-articles}

- [عميل إيثيريوم بلغة <span dir="ltr">Rust</span>](https://openethereum.github.io/) \* **لاحظ أن <span dir="ltr">OpenEthereum</span> [قد تم إيقافه](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ولم يعد يتم صيانته.** استخدمه بحذر ويُفضل التبديل إلى تنفيذ عميل آخر.
- [إرسال معاملة إلى إيثيريوم باستخدام <span dir="ltr">Rust</span>](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [برنامج تعليمي خطوة بخطوة حول كيفية كتابة العقود بلغة <span dir="ltr">Rust Wasm</span> لشبكة <span dir="ltr">Kovan</span>](https://github.com/paritytech/pwasm-tutorial)

## مقالات للمستوى المتوسط {#intermediate-articles}

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [مكتبة <span dir="ltr">pwasm_ethereum externs</span> للتفاعل مع شبكة تشبه إيثيريوم](https://github.com/openethereum/pwasm-ethereum)
- [بناء دردشة لامركزية باستخدام <span dir="ltr">JavaScript</span> و<span dir="ltr">Rust</span>](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [بناء تطبيق مهام لامركزي باستخدام <span dir="ltr">Vue.js</span> و<span dir="ltr">Rust</span>](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [بناء سلسلة كتل بلغة <span dir="ltr">Rust</span>](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## مشاريع وأدوات <span dir="ltr">Rust</span> {#rust-projects-and-tools}

- [<span dir="ltr">pwasm-ethereum</span>](https://github.com/paritytech/pwasm-ethereum) - _مجموعة من <span dir="ltr">externs</span> للتفاعل مع شبكة تشبه إيثيريوم_
- [لايتهاوس](https://github.com/sigp/lighthouse) - _عميل طبقة الإجماع السريع لإيثيريوم_
- [<span dir="ltr">Ethereum WebAssembly</span>](https://ewasm.readthedocs.io/en/mkdocs/) - _إعادة تصميم مقترحة لطبقة التنفيذ للعقود الذكية في إيثيريوم باستخدام مجموعة فرعية حتمية من <span dir="ltr">WebAssembly</span>_
- [<span dir="ltr">oasis_std</span>](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _مرجع <span dir="ltr">OASIS API</span>_
- [<span dir="ltr">Solaris</span>](https://github.com/paritytech/sol-rs) - _أداة اختبار الوحدة للعقود الذكية بلغة <span dir="ltr">Solidity</span> باستخدام <span dir="ltr">EVM</span> الأصلي لعميل <span dir="ltr">Parity</span>._
- [<span dir="ltr">SputnikVM</span>](https://github.com/rust-blockchain/evm) - _تنفيذ آلة إيثيريوم الافتراضية بلغة <span dir="ltr">Rust</span>_
- [<span dir="ltr">Wavelet</span>](https://github.com/perlin-network/smart-contract-rs) - _عقد ذكي لـ <span dir="ltr">Wavelet</span> بلغة <span dir="ltr">Rust</span>_
- [<span dir="ltr">Foundry</span>](https://github.com/foundry-rs/foundry) - _مجموعة أدوات لتطوير تطبيقات إيثيريوم_
- [<span dir="ltr">Alloy</span>](https://alloy.rs) - _مكتبات عالية الأداء ومختبرة وموثقة جيدًا للتفاعل مع إيثيريوم والسلاسل الأخرى المعتمدة على <span dir="ltr">EVM</span>._
- [<span dir="ltr">Ethers_rs</span>](https://github.com/gakonst/ethers-rs) - _مكتبة إيثيريوم وتنفيذ محفظة_
- [<span dir="ltr">SewUp</span>](https://github.com/second-state/SewUp) - _مكتبة لمساعدتك في بناء عقد <span dir="ltr">webassembly</span> الخاص بك على إيثيريوم باستخدام <span dir="ltr">Rust</span> تمامًا مثل التطوير في الواجهة الخلفية الشائعة_
- [<span dir="ltr">Substreams</span>](https://github.com/streamingfast/substreams) - _تقنية فهرسة بيانات سلسلة الكتل المتوازية_
- [ريث](https://github.com/paradigmxyz/reth) ريث (اختصار لـ <span dir="ltr">Rust Ethereum</span>) هو تنفيذ جديد لعقدة كاملة في إيثيريوم
- [<span dir="ltr">Awesome Ethereum Rust</span>](https://github.com/Vid201/awesome-ethereum-rust) - _مجموعة منسقة من المشاريع في نظام إيثيريوم البيئي المكتوبة بلغة <span dir="ltr">Rust</span>_
- [<span dir="ltr">Stylus</span>](https://github.com/OffchainLabs/stylus) - _حزمة تطوير البرمجيات (<span dir="ltr">SDK</span>) بلغة <span dir="ltr">Rust</span> لبناء العقود الذكية على <span dir="ltr">Arbitrum</span>_

هل تبحث عن المزيد من الموارد؟ تحقق من [<span dir="ltr">ethereum.org/developers</span>.](/developers/)

## مساهمو مجتمع <span dir="ltr">Rust</span> {#rust-community-contributors}

- [<span dir="ltr">Ethereum WebAssembly</span>](https://gitter.im/ewasm/Lobby)
- [<span dir="ltr">Oasis Gitter</span>](https://gitter.im/Oasis-official/Lobby)
- [<span dir="ltr">Parity Gitter</span>](https://gitter.im/paritytech/parity)
- [<span dir="ltr">Enigma</span>](https://discord.gg/SJK32GY)
