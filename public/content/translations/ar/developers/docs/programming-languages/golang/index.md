---
title: "إيثيريوم لمطوري ⁦Go⁩"
description: "تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على ⁦Go⁩"
lang: ar
incomplete: true
---

<FeaturedText>تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على <span dir="ltr">Go</span></FeaturedText>

استخدم إيثيريوم لإنشاء تطبيقات لامركزية (dapps). يمكن أن تكون هذه التطبيقات اللامركزية (dapps) جديرة بالثقة، مما يعني أنه بمجرد نشرها على إيثيريوم، فإنها ستعمل دائمًا كما تمت برمجتها. إنها لامركزية، مما يعني أنها تعمل على شبكة نظير إلى نظير ولا توجد نقطة فشل واحدة. لا يتحكم فيها كيان أو شخص واحد ويكاد يكون من المستحيل فرض رقابة عليها. يمكنها التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات.

## البدء مع العقود الذكية ولغة <span dir="ltr">Solidity</span> {#getting-started-with-smart-contracts-and-solidity}

**اتخذ خطواتك الأولى لدمج <span dir="ltr">Go</span> مع إيثيريوم**

هل تحتاج إلى مقدمة أساسية أولاً؟ تحقق من [<span dir="ltr">ethereum.org/learn</span>](/learn/) أو [<span dir="ltr">ethereum.org/developers</span>](/developers/).

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر <span dir="ltr">Solidity</span>](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [دليل تعليمي للعقود](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## مقالات وكتب للمبتدئين {#beginner-articles-and-books}

- [البدء مع جو إيثريوم (geth)](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [استخدام <span dir="ltr">Golang</span> للاتصال بإيثيريوم](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [نشر عقود إيثيريوم الذكية باستخدام <span dir="ltr">Golang</span>](https://www.youtube.com/watch?v=pytGqQmDslE)
- [دليل خطوة بخطوة لاختبار ونشر عقود إيثيريوم الذكية في <span dir="ltr">Go</span>](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [كتاب إلكتروني: تطوير إيثيريوم باستخدام <span dir="ltr">Go</span>](https://goethereumbook.org/) - _تطوير تطبيقات إيثيريوم باستخدام <span dir="ltr">Go</span>_

## مقالات ووثائق للمستوى المتوسط {#intermediate-articles-and-docs}

- [وثائق جو إيثريوم (geth)](https://geth.ethereum.org/docs) - _الوثائق الرسمية لـ <span dir="ltr">Golang</span> في إيثيريوم_
- [دليل مبرمج إريغون](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _دليل مصور يتضمن شجرة الحالة، والإثباتات المتعددة، ومعالجة المعاملات_
- [إريغون وإيثيريوم عديم الحالة](https://youtu.be/3-Mn7OckSus?t=394) - _مؤتمر مجتمع إيثيريوم لعام <span dir="ltr">2020</span> (<span dir="ltr">EthCC 3</span>)_
- [إريغون: تحسين عملاء إيثيريوم](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _مؤتمر <span dir="ltr">Devcon 4</span> لعام <span dir="ltr">2018</span>_
- [<span dir="ltr">GoDoc</span> لجو إيثريوم (geth)](https://godoc.org/github.com/ethereum/go-ethereum)
- [إنشاء تطبيق لامركزي (dapp) في <span dir="ltr">Go</span> باستخدام جو إيثريوم (geth)](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [العمل مع شبكة إيثيريوم الخاصة باستخدام <span dir="ltr">Golang</span> وجو إيثريوم (geth)](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [اختبار الوحدة لعقود <span dir="ltr">Solidity</span> على إيثيريوم باستخدام <span dir="ltr">Go</span>](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [مرجع سريع لاستخدام جو إيثريوم (geth) كمكتبة](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [الواجهة الخلفية المحاكية لجو إيثريوم (geth)](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [تطبيقات سلسلة الكتل كخدمة باستخدام إيثيريوم و<span dir="ltr">Quorum</span>](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [التخزين الموزع <span dir="ltr">IPFS</span> وسرب في تطبيقات سلسلة كتل إيثيريوم](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [عملاء الأجهزة المحمولة: المكتبات وعقد إيثيريوم الداخلية (<span dir="ltr">Inproc</span>)](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [التطبيقات اللامركزية (dapps) الأصلية: روابط <span dir="ltr">Go</span> لعقود إيثيريوم](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## مشاريع وأدوات <span dir="ltr">Go</span> {#go-projects-and-tools}

- [جو إيثريوم (geth)](https://github.com/ethereum/go-ethereum) - _التنفيذ الرسمي لبروتوكول إيثيريوم بلغة <span dir="ltr">Go</span>_
- [تحليل كود جو إيثريوم (geth)](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _مراجعة وتحليل الكود المصدري لجو إيثريوم (geth)_
- [إريغون](https://github.com/ledgerwatch/erigon) - _مشتق أسرع من جو إيثريوم (geth)، مع التركيز على عقد الأرشيف_
- [<span dir="ltr">Golem</span>](https://github.com/golemfactory/golem) - _تنشئ <span dir="ltr">Golem</span> سوقًا عالميًا لقوة الحوسبة_
- [<span dir="ltr">Quorum</span>](https://github.com/jpmorganchase/quorum) - _تنفيذ مصرح به لإيثيريوم يدعم خصوصية البيانات_
- [برايزم](https://github.com/prysmaticlabs/prysm) - _تنفيذ <span dir="ltr">Go</span> لإيثيريوم <span dir="ltr">2.0</span> '<span dir="ltr">Serenity</span>'_
- [<span dir="ltr">Eth Tweet</span>](https://github.com/yep/eth-tweet) - _تويتر لامركزي: خدمة تدوين مصغر تعمل على سلسلة كتل إيثيريوم_
- [<span dir="ltr">Plasma MVP Golang</span>](https://github.com/kyokan/plasma) — _تنفيذ <span dir="ltr">Golang</span> وتوسيع لمواصفات بلازما القابلة للتطبيق كحد أدنى_
- [مجمع تعدين إيثيريوم المفتوح](https://github.com/sammy007/open-ethereum-pool) - _مجمع تعدين إيثيريوم مفتوح المصدر_
- [محفظة <span dir="ltr">HD</span> لإيثيريوم](https://github.com/miguelmota/go-ethereum-hdwallet) - _اشتقاقات محفظة <span dir="ltr">HD</span> لإيثيريوم في <span dir="ltr">Go</span>_
- [<span dir="ltr">Multi Geth</span>](https://github.com/multi-geth/multi-geth) - _دعم للعديد من أنواع شبكات إيثيريوم_
- [عميل خفيف لجو إيثريوم (geth)](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _تنفيذ جو إيثريوم (geth) لبروتوكول إيثيريوم الفرعي الخفيف_
- [<span dir="ltr">SDK</span> لإيثيريوم بلغة <span dir="ltr">Golang</span>](https://github.com/everFinance/goether) - _تنفيذ بسيط لمحفظة إيثيريوم وأدوات مساعدة في <span dir="ltr">Golang</span>_
- [<span dir="ltr">SDK</span> لـ <span dir="ltr">Covalent</span> بلغة <span dir="ltr">Golang</span>](https://github.com/covalenthq/covalent-api-sdk-go) - _وصول فعال لبيانات سلسلة الكتل عبر <span dir="ltr">SDK</span> بلغة <span dir="ltr">Go</span> لأكثر من <span dir="ltr">200+</span> سلسلة كتل_

هل تبحث عن المزيد من الموارد؟ تحقق من [<span dir="ltr">ethereum.org/developers</span>](/developers/)

## مساهمو مجتمع <span dir="ltr">Go</span> {#go-community-contributors}

- [ديسكورد جو إيثريوم (geth)](https://discordapp.com/invite/nthXNEv)
- [<span dir="ltr">Gist</span> لجو إيثريوم (geth)](https://gitter.im/ethereum/go-ethereum)
- [<span dir="ltr">Slack</span> لـ <span dir="ltr">Gophers</span>](https://invite.slack.golangbridge.org/) - [قناة <span dir="ltr">#ethereum</span>](https://gophers.slack.com/messages/C9HP1S9V2)
- [<span dir="ltr">StackExchange</span> - إيثيريوم](https://ethereum.stackexchange.com/)
- [<span dir="ltr">Gitter</span> لـ <span dir="ltr">Multi Geth</span>](https://gitter.im/ethoxy/multi-geth)
- [<span dir="ltr">Gitter</span> لإيثيريوم](https://gitter.im/ethereum/home)
- [<span dir="ltr">Gitter</span> للعميل الخفيف لجو إيثريوم (geth)](https://gitter.im/ethereum/light-client)

## قوائم مجمعة أخرى {#other-aggregated-lists}

- [إيثيريوم الرائع (<span dir="ltr">Awesome Ethereum</span>)](https://github.com/btomashvili/awesome-ethereum)
- [كونسينسيس: قائمة نهائية لأدوات مطوري إيثيريوم](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [المصدر على <span dir="ltr">GitHub</span>](https://github.com/ConsenSys/ethereum-developer-tools-list)