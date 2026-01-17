---
title: "إثيريوم لمطوري جافا"
description: "تعرف على كيفية التطوير لصالح إثيريوم باستخدام مشروعات وأدوات قائمة على Java"
lang: ar
incomplete: true
---

<FeaturedText>تعلّم كيفية التطوير على إيثريوم باستخدام المشاريع والأدوات المستندة إلى Java</FeaturedText>

استخدم إثيريوم لإنشاء تطبيقات لامركزية (أو "dapp") تستخدم فوائد العملات المشفرة وتكنولوجيا سلسلة الكتل. قد تكون هذه التطبيقات اللامركزية جديرة بالثقة، بمعنى أنه بمجرد نشرها على إثيريوم، فستعمل دائمًا كما تم برمجتها بالضبط. ويمكن لتلك التطبيقات اللامركزية التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. كما أنها قد تكون لامركزية، بمعنى عدم وجود كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل مراقبتها.

## بدء العمل مع العقود الذكية ولغة سوليديتي

**اخط خطواتك الأولي لدمج Java مع إثيريوم**

هل تحتاج مفاهيم أساسيه أولاً؟ تحقق من [ethereum.org/learn](/learn/) أو [ethereum.org/developers.](/developers/)

- [شرح البلوكتشين](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اكتب أول عقد ذكي الخاص بك](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## العمل مع عملاء إيثريوم {#working-with-ethereum-clients}

تعلّم كيفية استخدام [Web3J](https://github.com/web3j/web3j) وHyperledger Besu، وهما اثنان من عملاء إيثريوم الرائدين المستندين إلى Java

- [الاتصال بعميل إيثريوم باستخدام Java وEclipse وWeb3J](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [إدارة حساب إيثريوم باستخدام Java وWeb3j](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [إنشاء غلاف Java من عقدك الذكي](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [التفاعل مع عقد إيثريوم ذكي](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [الاستماع إلى أحداث عقود إيثريوم الذكية](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [استخدام Besu (Pantheon)، عميل إيثريوم بلغة Java مع Linux](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [تشغيل عقدة Hyperledger Besu (Pantheon) في اختبارات تكامل Java](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [ورقة غش Web3j](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

تعلّم كيفية استخدام [ethers-kt](https://github.com/Kr1ptal/ethers-kt)، وهي مكتبة Kotlin غير متزامنة وعالية الأداء للتفاعل مع سلاسل الكتل المستندة إلى EVM. استهداف منصات JVM وAndroid.

- [نقل رموز ERC20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [مبادلة UniswapV2 مع الاستماع للأحداث](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [متعقب رصيد ETH / ERC20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## المقالات الوسيطة {#intermediate-articles}

- [إدارة التخزين في تطبيق Java باستخدام IPFS](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [إدارة رموز ERC20 في Java باستخدام Web3j](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [مديرو معاملات Web3j](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [استخدام Eventeum لإنشاء ذاكرة تخزين مؤقت لبيانات العقد الذكي بلغة Java](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## مشاريع وأدوات Java {#java-projects-and-tools}

- [Web3J (مكتبة للتفاعل مع عملاء إيثريوم)](https://github.com/web3j/web3j)
- [ethers-kt (مكتبة Kotlin/Java/Android عالية الأداء وغير متزامنة لسلاسل الكتل المستندة إلى EVM.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (مستمع الأحداث)](https://github.com/ConsenSys/eventeum)
- [Mahuta (أدوات مطوري IPFS)](https://github.com/ConsenSys/mahuta)

تبحث عن المزيد من المصادر؟ راجع [ethereum.org/developers.](/developers/)

## مساهمو مجتمع Java {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
