---
title: "إيثيريوم لمطوري ⁦Java⁩"
description: "تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على ⁦Java⁩"
lang: ar
incomplete: true
---

<FeaturedText>تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على <span dir="ltr">Java</span></FeaturedText>

استخدم إيثيريوم لإنشاء تطبيقات لامركزية (dapps) تستفيد من مزايا العملات المشفرة وتكنولوجيا سلسلة الكتل. يمكن أن تكون هذه التطبيقات اللامركزية (dapps) جديرة بالثقة، مما يعني أنه بمجرد نشرها على إيثيريوم، فإنها ستعمل دائمًا كما تمت برمجتها. يمكنها التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. يمكن أن تكون لامركزية، مما يعني أنه لا يوجد كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل فرض رقابة عليها.

## البدء مع العقود الذكية ولغة <span dir="ltr">Solidity</span> {#getting-started-with-smart-contracts-and-solidity}

**اتخذ خطواتك الأولى لدمج <span dir="ltr">Java</span> مع إيثيريوم**

هل تحتاج إلى مقدمة أساسية أولاً؟ تحقق من [<span dir="ltr">ethereum.org/learn</span>](/learn/) أو [<span dir="ltr">ethereum.org/developers</span>.](/developers/)

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر <span dir="ltr">Solidity</span>](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## العمل مع عملاء إيثيريوم {#working-with-ethereum-clients}

تعلم كيفية استخدام [<span dir="ltr">Web3j</span>](https://github.com/web3j/web3j) و<span dir="ltr">Hyperledger</span> بيسو، وهما من أبرز عملاء إيثيريوم المعتمدين على <span dir="ltr">Java</span>

- [الاتصال بعميل إيثيريوم باستخدام <span dir="ltr">Java</span> و<span dir="ltr">Eclipse</span> و<span dir="ltr">Web3j</span>](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [إدارة حساب إيثيريوم باستخدام <span dir="ltr">Java</span> و<span dir="ltr">Web3j</span>](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [إنشاء غلاف <span dir="ltr">Java</span> من عقدك الذكي](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [التفاعل مع عقد ذكي على إيثيريوم](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [الاستماع إلى أحداث العقد الذكي على إيثيريوم](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [استخدام بيسو (<span dir="ltr">Pantheon</span>)، عميل إيثيريوم المعتمد على <span dir="ltr">Java</span> مع <span dir="ltr">Linux</span>](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [تشغيل عقدة <span dir="ltr">Hyperledger</span> بيسو (<span dir="ltr">Pantheon</span>) في اختبارات تكامل <span dir="ltr">Java</span>](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [ورقة مرجعية لـ <span dir="ltr">Web3j</span>](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

تعلم كيفية استخدام [<span dir="ltr">ethers-kt</span>](https://github.com/Kr1ptal/ethers-kt)، وهي مكتبة <span dir="ltr">Kotlin</span> غير متزامنة وعالية الأداء للتفاعل مع سلاسل الكتل المعتمدة على جهاز إيثيريوم الظاهري (<span dir="ltr">EVM</span>). تستهدف منصات <span dir="ltr">JVM</span> و<span dir="ltr">Android</span>.
- [تحويل رموز <span dir="ltr">ERC-20</span>](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [مبادلة <span dir="ltr">UniswapV2</span> مع الاستماع للأحداث](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [متتبع رصيد <span dir="ltr">ETH</span> / <span dir="ltr">ERC-20</span>](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## مقالات متوسطة {#intermediate-articles}

- [إدارة التخزين في تطبيق <span dir="ltr">Java</span> باستخدام <span dir="ltr">IPFS</span>](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [إدارة رموز <span dir="ltr">ERC-20</span> في <span dir="ltr">Java</span> باستخدام <span dir="ltr">Web3j</span>](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [مديرو معاملات <span dir="ltr">Web3j</span>](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [استخدام <span dir="ltr">Eventeum</span> لبناء ذاكرة تخزين مؤقت لبيانات العقد الذكي في <span dir="ltr">Java</span>](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## مشاريع وأدوات <span dir="ltr">Java</span> {#java-projects-and-tools}

- [<span dir="ltr">Web3j</span> (مكتبة للتفاعل مع عملاء إيثيريوم)](https://github.com/web3j/web3j)
- [<span dir="ltr">ethers-kt</span> (مكتبة <span dir="ltr">Kotlin</span>/<span dir="ltr">Java</span>/<span dir="ltr">Android</span> غير متزامنة وعالية الأداء لسلاسل الكتل المعتمدة على <span dir="ltr">EVM</span>.)](https://github.com/Kr1ptal/ethers-kt)
- [<span dir="ltr">Eventeum</span> (مستمع للأحداث)](https://github.com/ConsenSys/eventeum)
- [<span dir="ltr">Mahuta</span> (أدوات تطوير <span dir="ltr">IPFS</span>)](https://github.com/ConsenSys/mahuta)

هل تبحث عن المزيد من الموارد؟ تحقق من [<span dir="ltr">ethereum.org/developers</span>.](/developers/)

## مساهمو مجتمع <span dir="ltr">Java</span> {#java-community-contributors}

- [<span dir="ltr">IO Builders</span>](https://io.builders)
- [<span dir="ltr">Kauri</span>](https://kauri.io)