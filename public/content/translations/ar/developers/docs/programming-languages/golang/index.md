---
title: "إثيريوم لمطوري قو"
description: "تعرف على كيفية تطوير إثيريوم باستخدام مشروعات وأدوات قائمة على Go"
lang: ar
incomplete: true
---

<FeaturedText>تعلّم كيفية التطوير على إيثريوم باستخدام المشاريع والأدوات القائمة على Go</FeaturedText>

استخدم Ethereum لإنشاء تطبيقات لامركزية (أو "dapps"). قد تكون هذه التطبيقات اللامركزية جديرة بالثقة، بمعنى أنه بمجرد نشرها على إثيريوم، فستعمل دائمًا كما تم برمجتها بالضبط. إنها لامركزية، وهذا يعني أنها تعمل على شبكة نظير إلى نظير ولا توجد نقطة فشل واحدة. لا يمكن لأي كيان أو شخص التحكم في هذه الوسائط، ومن المستحيل تقريبًا فرض الرقابة عليها. بإمكانهم التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات.

## بدء العمل مع العقود الذكية ولغة سوليديتي

**اخط خطواتك الأولي لدمج Go مع إثيريوم**

هل تحتاج مفاهيم أساسيه أولاً؟ تحقق من [ethereum.org/learn](/learn/) أو [ethereum.org/developers](/developers/).

- [شرح البلوكتشين](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اكتب أول عقد ذكي الخاص بك](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [تعليمات استخدام العقد](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## مقالات وكتب للمبتدئين {#beginner-articles-and-books}

- [بدء استخدام Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [استخدام Golang للاتصال بإيثريوم](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [نشر عقود إيثريوم الذكية باستخدام Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [دليل تفصيلي لاختبار ونشر عقود إيثريوم الذكية في Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [كتاب إلكتروني: تطوير إيثريوم باستخدام Go](https://goethereumbook.org/) - _تطوير تطبيقات إيثريوم باستخدام Go_

## مقالات ومستندات متوسطة المستوى {#intermediate-articles-and-docs}

- [وثائق Go Ethereum](https://geth.ethereum.org/docs/) - _الوثائق الخاصة بلغة Golang الرسمية لإيثريوم_
- [دليل مبرمج Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _دليل مصوّر يتضمن شجرة الحالة والإثباتات المتعددة ومعالجة المعاملات_
- [Erigon وإيثريوم عديم الحالة](https://youtu.be/3-Mn7OckSus?t=394) - _مؤتمر مجتمع إيثريوم 2020 (EthCC 3)_
- [Erigon: تحسين عملاء إيثريوم](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _مؤتمر Devcon 4 لعام 2018_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [إنشاء تطبيق لامركزي في Go باستخدام Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [العمل مع شبكة إيثريوم خاصة باستخدام Golang وGeth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [اختبار الوحدة لعقود Solidity على إيثريوم باستخدام Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [مرجع سريع لاستخدام Geth كمكتبة](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [الواجهة الخلفية المحاكية لـ GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [تطبيقات البلوكتشين كخدمة باستخدام إيثريوم وQuorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [التخزين الموزع لـ IPFS وSwarm في تطبيقات بلوكتشين إيثريوم](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [عملاء الهاتف المحمول: المكتبات وعقد إيثريوم داخل العملية (Inproc)](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [التطبيقات اللامركزية الأصلية: روابط Go بعقود إيثريوم](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## مشاريع وأدوات Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _تنفيذ Go الرسمي لبروتوكول إيثريوم_
- [تحليل كود Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _مراجعة وتحليل كود المصدر لـ Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _مشتق أسرع من Go Ethereum، مع التركيز على عقد الأرشيف_
- [Golem](https://github.com/golemfactory/golem) - _يقوم Golem بإنشاء سوق عالمي للقدرة الحاسوبية_
- [Quorum](https://github.com/jpmorganchase/quorum) - _تنفيذ مرخص لإيثريوم يدعم خصوصية البيانات_
- [بريسم](https://github.com/prysmaticlabs/prysm) - _تنفيذ Go لـ Ethereum 'Serenity' 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _تويتر لامركزي: خدمة تدوين مصغرة تعمل على بلوكتشين إيثريوم_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _تنفيذ وامتداد لـ Golang لمواصفات Minimum Viable Plasma_
- [مجمع تعدين إيثريوم مفتوح المصدر](https://github.com/sammy007/open-ethereum-pool) - _مجمع تعدين إيثريوم مفتوح المصدر_
- [محفظة إيثريوم الهرمية الحتمية (HD)](https://github.com/miguelmota/go-ethereum-hdwallet) - _اشتقاقات محفظة إيثريوم الهرمية الحتمية (HD) في Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _دعم لأنواع عديدة من شبكات إيثريوم_
- [عميل Geth الخفيف](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _تنفيذ Geth للبروتوكول الفرعي الخفيف لإيثريوم_
- [حزمة أدوات تطوير برامج Golang لإيثريوم](https://github.com/everFinance/goether) - _تنفيذ بسيط لمحفظة إيثريوم وأدوات مساعدة في Golang_
- [حزمة أدوات تطوير برامج Covalent Golang](https://github.com/covalenthq/covalent-api-sdk-go) - _وصول فعال لبيانات البلوكتشين عبر حزمة أدوات تطوير برامج Go لأكثر من 200 بلوكتشين_

تبحث عن المزيد من المصادر؟ تفضل بزيارة [ethereum.org/developers](/developers/)

## مساهمو مجتمع Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [قناة #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Gitter لعميل Geth الخفيف](https://gitter.im/ethereum/light-client)

## قوائم مجمعة أخرى {#other-aggregated-lists}

- [إيثريوم الرائع](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: قائمة نهائية بأدوات مطوري إيثريوم](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [المصدر على GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
