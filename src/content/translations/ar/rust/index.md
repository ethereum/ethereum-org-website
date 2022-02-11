---
title: إثيريوم لمطوري Rust
description: تعرف على كيفية التطوير لصالح إثيريوم باستخدام مشروعات وأدوات قائمة على rust
lang: ar
sidebar: true
---

# إثيريوم لمطوري Rust {#ethereum-for-rust-devs}

<div class="featured">تعرف على كيفية التطوير لصالح إثيريوم باستخدام مشروعات وأدوات قائمة على Rust</div><br/>

استخدم إثيريوم لإنشاء تطبيقات لامركزية (أو "dapp") تستخدم فوائد العملات المشفرة وتكنولوجيا سلسلة الكتل. قد تكون هذه التطبيقات اللامركزية جديرة بالثقة، بمعنى أنه بمجرد نشرها على إثيريوم، فستعمل دائمًا بdescriptionها مبرمجة. ويمكنها التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. كما أنها قد تكون لامركزية، بمعنى عدم وجود كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل مراقبتها.

## البدء في استخدام العقود الذكية ولغة Solidity {#getting-started-with-smart-contracts-and-solidity}

**اخط خطواتك الأولي لدمج Rust مع إثيريوم**

بحاجة إلى المزيد من التعليمات الأساسية أولاُ؟ راجع [ethereum.org/learn](/ar/learn/) أو [ethereum.org/developers](/ar/developers/).

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعرف على كيفية تأليف ونشر Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مقالات للمبتدئين {#beginner-articles}

- [اختيار عميل إيثريوم](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [عميل إيثريوم على Rust](https://wiki.parity.io/Setup)
- [إرسال معاملة إلى إثيريوم باستخدام Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [مقدمة إلى العقود الذكية باستخدام عميل بارتي إيثريوم](https://wiki.parity.io/Smart-Contracts)
- [إعداد بيئة Oasis SDK dev الخاصة بك](https://docs.oasis.dev/oasis-sdk/guide/getting-started)
- [درس خطوة بخطوة عن كيفية كتابة العقود في قعسف ًشسة لـKovan](https://github.com/paritytech/pwasm-tutorial)

## مقالات وسيطة {#intermediate-articles}

- [توثيق Rust-Web3](https://tomusdrw.github.io/rust-web3/web3/index.html)
- [أمثلة عمل Rust-Web3](https://github.com/tomusdrw/rust-web3/blob/master/examples)

## أنماط الاستخدام المتقدم {#advanced-use-patterns}

- [مكتبة pwasm_ethereum الخارجية للتفاعل مع شبكة تشبه إثيريوم](https://github.com/openethereum/pwasm-ethereum)
- [إنشاء دردشة لامركزية باستخدام JavaScript وRust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [إنشاء تطبيق Todo لامركزي باستخدام Vue.js & Rust ](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)
- [البدء بـEnigma - في لغة برمجة Rust](https://blog.enigma.co/getting-started-with-discovery-the-rust-programming-language-4d1e0b06de15)
- [مقدمة إلى العقود السرية](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [نشر عقود Solidity على Oasis (مركبة)](https://docs.oasis.dev/tutorials/deploy-solidity.html#deploy-using-truffle)

## مشروعات وأدوات Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _مجموعة من الخراجيين للتفاعل مع شبكة تشبه إثيريوم._
- [مجموعىة الويب الخاصة بإثيريوم](https://ewasm.readthedocs.io/en/mkdocs/)
- [oasis_std](https://docs.rs/oasis-std/0.2.7/oasis_std/) - _مرجع OASIS API_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _الوظائف ذات المنفعة للعمل باستخدام قواعد الأكواد ذات الصلة بإيثريوم_
- [Solaris](https://github.com/paritytech/sol-rs)
- [SputnikVM](https://github.com/sorpaas/rust-evm) - _تنفيذ جهاز إثيريوم الافتراضي على Rust_
- [Parity](https://github.com/paritytech/parity-ethereum) - _عميل Rust على إثيريوم_
- [rust-web3](https://github.com/tomusdrw/rust-web3) - _تنفيذ Rust لمكتبة Web3.js_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _عقد Wavelet الذكي في Rust_

تبحث عن المزيد من الموارد؟ راجع [ethereum.org/developers.](/ar/developers/)

## مساهمي مجتمع Rust {#rust-community-contributors}

- [مجموعة الويب الخاصة بإثيريوم](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
