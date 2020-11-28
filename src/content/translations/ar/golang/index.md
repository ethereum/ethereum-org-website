---
title: إثيريوم لمطوري Go
description: تعرف على كيفية تطوير إثيريوم باستخدام مشروعات وأدوات قائمة على Go
lang: ar
sidebar: true
---

# إثيريوم لمطوري Go {#ethereum-for-go-devs}

<div class="featured">تعرف على كيفية تطوير إثيريوم باستخدام مشروعات وأدوات قائمة على Go</div><br/>

استخدم إثيريوم لإنشاء تطبيقات لامركزية (أو "dapp") تستخدم فوائد العملات المشفرة وتكنولوجيا سلسلة الكتل. قد تكون هذه التطبيقات اللامركزية جديرة بالثقة، بمعنى أنه بمجرد نشرها على إثيريوم، فستعمل دائمًا بdescriptionها مبرمجة. ويمكنها التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. كما أنها قد تكون لامركزية، بمعنى عدم وجود كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل مراقبتها.

<img src="https://i.imgur.com/MFg8Nop.png" width="100%" />

## البدء في استخدام العقود الذكية ولغة Solidity {#getting-started-with-smart-contracts-and-solidity}

**اخط خطواتك الأولي لدمج Go مع إثيريوم**

بحاجة إلى المزيد من التعليمات الأساسية أولاُ؟ راجع [ethereum.org/learn](/ar/learn/) أو [ethereum.org/developers](/ar/developers/).

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعرف على كيفية تأليف ونشر Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [درس العقد](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## مقالات وكتب المبتدئ {#beginner-articles-and-books}

- [اختيار عميل إيثريوم](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [ابدأ مع Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [استخدام Golang للتوصيل بإيثريوم](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [نشر عقود إيثريوم الذكية باستخدام Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [دليل خطوة بخطوة لاختبار ونشر عقود إيثريوم الذكية في Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: تطوير إيثريوم باستخدام Go](https://goethereumbook.org/) - _تطوير تطبيقات إيثريوم باستخدام Go_

## مقالات ومستندات وسيطة {#intermediate-articles-and-docs}

- [مستندات إيثريوم على Go](https://geth.ethereum.org/docs/) - _مستندات Golang الخاصة بإيثريوم الرسمي_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [إنشاء تطبيق لامركزي في Go باستخدام Geth](https://kauri.io/article/60a36c1b17d645939f63415218dc24f9/creating-a-dapp-in-go-with-geth)
- [العمل باستخدام شبكة إيثريوم الخاصة مع Golang وGeth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [عقود Solidity لاختبار الوحدة على إيثريوم باستخدام Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)

## أنماط الاستخدام المتقدم {#advanced-use-patterns}

- [خلفية GETH المحاكاة](https://kauri.io/article/6285c9692883411aa041b6b970405a17/v1/the-geth-simulated-backend)
- [تطبيقات سلسلة الكتل كخدمة باستخدام إيثريوم وكوارم](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [IPFS التخزين الموزع وسوارم في تطبيقات سلسلة كتل إيثريوم](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [العملاء المتحركين: المكتبات ونقاط اتصال إيثريوم في Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [التطبيقات اللامركزية الأصلية: ارتباطات Go بعقود إيثريوم](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## مشروعات وأدوات Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _تنفيذ Go الرسمي لبروتوكول إيثريوم_
- [تحليل كود إيثريوم على Go](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _مراجعة وتحليل كود مصدر إيثريوم على Go_
- [Golem](https://github.com/golemfactory/golem) - _Golem يعمل على إنشاء سوق عالمي للقدرة الحاسوبية_
- [Quorum](https://github.com/jpmorganchase/quorum) - _التنفيذ المرخص لخصوصية بيانات دعم إيثريوم_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _تنفيذ 'Serenity' 2.0 Go على إيثريوم_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _تويتر لامركزي: خدمة تدوين مصغرة تعمل على سلسلة كتل إيثريوم_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _تنفيذ Golang وامتداد الحد الأدنى لمواصفات Viable Plasma_
- [وحدة تعدين إيثريوم المفتوحة](https://github.com/sammy007/open-ethereum-pool) - _وحدة تعدين إيثريوم مفتوحة المصدر_
- [محفظة HD على إيثريوم](https://github.com/miguelmota/go-ethereum-hdwallet) - _اشتقاقات محفظة HD على إيثريوم في Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _دعم العديد من أنواع شبكات إيثريوم_
- [عميل Geth الخفيف](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Light تنفيذ البروتوكولات الفرعية الخفيفة على إيثريوم والخاصة بـGeth_

تبحث عن المزيد من الموارد؟ راجع [ethereum.org/developers.](/ar/developers/)

## مساهمي مجتمع Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://https:/gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - إيثريوم](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## قوائم مجمّعة أخرى {#other-aggregated-lists}

- [إيثريوم رائع](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: قائمة نهائية لأدوات مطور إيثريوم](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [مصدر GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
