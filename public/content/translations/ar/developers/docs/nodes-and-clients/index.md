---
title: " العقد والعملاء"
description: نظرة عامة على عقد Ethereum وبرامج العميل، بالإضافة إلى كيفية إعداد العقدة ولماذا يجب عليك القيام بذلك.
lang: ar
sidebarDepth: 2
---

الإيثريوم عبارة عن شبكة موزعة من أجهزة الكمبيوتر (المعروفة باسم العقد) تقوم بتشغيل برامج يمكنها التحقق من الكتل وبيانات المعاملات. يجب تشغيل البرنامج على جهاز الكمبيوتر الخاص بك لتحويله إلى عقدة Ethereum. هناك قطعتان منفصلتان من البرامج (المعروفتان باسم "العملاء") مطلوبتان لتشكيل عقدة.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم مفهوم شبكة نظير إلى نظير و[أساسيات EVM](/developers/docs/evm/) قبل التعمق أكثر وتشغيل المثيل الخاص بك من عميل إيثريوم. ألقِ نظرة على [مقدمة عن إيثريوم](/developers/docs/intro-to-ethereum/).

إذا كنت جديدًا في موضوع العُقد، فنحن نوصي أولاً بالاطلاع على مقدمتنا سهلة الاستخدام حول [تشغيل عقدة إيثريوم](/run-a-node).

## ما هي العقد والعملاء؟ {#what-are-nodes-and-clients}

A "node" is any instance of Ethereum client software that is connected to other computers also running Ethereum software, forming a network. A client is an implementation of Ethereum that verifies data against the protocol rules and keeps the network secure. يتعين على العقدة تشغيل عميلين: عميل الإجماع وعميل التنفيذ.

- يستمع عميل التنفيذ (المعروف أيضًا باسم محرك التنفيذ أو عميل EL أو عميل Eth1 سابقًا) إلى المعاملات الجديدة التي يتم بثها في الشبكة، وينفذها في EVM، ويحمل أحدث حالة وقاعدة بيانات لجميع بيانات Ethereum الحالية.
- The consensus client (also known as the Beacon Node, CL client or formerly the Eth2 client) implements the proof-of-stake consensus algorithm, which enables the network to achieve agreement based on validated data from the execution client. هناك أيضًا برنامج ثالث يُعرف باسم "المحقق" والذي يمكن إضافته إلى عميل الإجماع، مما يسمح للعقدة بالمشاركة في تأمين الشبكة.

يتعاون هؤلاء العملاء معًا لتتبع رأس سلسلة Ethereum والسماح للمستخدمين بالتفاعل مع شبكة Ethereum. يُطلق على التصميم المعياري الذي يحتوي على قطع متعددة من البرامج التي تعمل معًا اسم [التعقيد المُغلف](https://vitalik.eth.limo/general/2022/02/28/complexity.html). لقد سهّل هذا النهج تنفيذ [الدمج (The Merge)](/roadmap/merge) بسلاسة، ويجعل برامج العميل أسهل في الصيانة والتطوير، ويتيح إعادة استخدام العملاء الفرديين، على سبيل المثال، في [النظام البيئي للطبقة الثانية](/layer-2/).

![عملاء التنفيذ والإجماع المقترنون](./eth1eth2client.png)
رسم تخطيطي مبسط لعميل تنفيذ وإجماع مقترن.

### تنوع العملاء {#client-diversity}

يوجد كل من [عملاء التنفيذ](/developers/docs/nodes-and-clients/#execution-clients) و[عملاء الإجماع](/developers/docs/nodes-and-clients/#consensus-clients) في مجموعة متنوعة من لغات البرمجة التي طورتها فرق مختلفة.

Multiple client implementations can make the network stronger by reducing its dependency on a single codebase. The ideal goal is to achieve diversity without any client dominating the network, thereby eliminating a potential single point of failure.
The variety of languages also invites a broader developer community and allows them to create integrations in their preferred language.

تعرف على المزيد حول [تنوع العملاء](/developers/docs/nodes-and-clients/client-diversity/).

What these implementations have in common is they all follow a single specification. Specifications dictate how the Ethereum network and blockchain functions. Every technical detail is defined and specifications can be found as:

- في الأصل، [ورقة إيثريوم الصفراء](https://ethereum.github.io/yellowpaper/paper.pdf)
- [مواصفات التنفيذ](https://github.com/ethereum/execution-specs/)
- [مواصفات الإجماع](https://github.com/ethereum/consensus-specs)
- [مقترحات تحسين إيثريوم (EIPs)](https://eips.ethereum.org/) مطبقة في مختلف [ترقيات الشبكة](/ethereum-forks/)

### تتبع العُقد في الشبكة {#network-overview}

Multiple trackers offer a real-time overview of nodes in the Ethereum network. Note that due to the nature of decentralized networks, these crawlers can only provide a limited view of the network and might report different results.

- [خريطة العقد](https://etherscan.io/nodetracker) بواسطة Etherscan
- [Ethernodes](https://ethernodes.org/) بواسطة Bitfly
- [Nodewatch](https://www.nodewatch.io/) بواسطة Chainsafe، يزحف إلى عُقد الإجماع
- [Monitoreth](https://monitoreth.io/) - بواسطة MigaLabs، أداة مراقبة شبكة موزعة
- [تقارير أسبوعية عن صحة الشبكة](https://probelab.io) - بواسطة ProbeLab، باستخدام [زاحف Nebula](https://github.com/dennis-tra/nebula) وأدوات أخرى

## أنواع العُقد {#node-types}

إذا كنت ترغب في [تشغيل عقدتك الخاصة](/developers/docs/nodes-and-clients/run-a-node/)، فيجب أن تفهم أن هناك أنواعًا مختلفة من العقد التي تستهلك البيانات بشكل مختلف. In fact, clients can run three different types of nodes: light, full and archive. There are also options of different sync strategies which enable faster synchronization time. Synchronization refers to how quickly it can get the most up-to-date information on Ethereum's state.

### عقدة كاملة {#full-node}

تقوم العقد الكاملة بالتحقق من صحة blockchain كتلة تلو الأخرى، بما في ذلك تنزيل بيانات جسم الكتلة والحالة لكل كتلة والتحقق منها. هناك فئات مختلفة من العقد الكاملة - بعضها يبدأ من كتلة التكوين ويتحقق من كل كتلة على حدة في تاريخ blockchain بأكمله. يبدأ الآخرون عملية التحقق الخاصة بهم عند كتلة أحدث يثقون في صلاحيتها (على سبيل المثال، 'مزامنة snap' الخاصة بـ Geth). بغض النظر عن مكان بدء التحقق، تحتفظ العقد الكاملة فقط بنسخة محلية من البيانات الحديثة نسبيًا (عادةً أحدث 128 كتلة)، مما يسمح بحذف البيانات الأقدم لتوفير مساحة القرص. يمكن تجديد البيانات القديمة عند الحاجة إليها.

- يخزن بيانات blockchain الكاملة (على الرغم من أن هذا يتم تقليمه بشكل دوري حتى لا تخزن العقدة الكاملة جميع بيانات الحالة حتى التكوين)
- يشارك في التحقق من صحة الكتلة، ويتحقق من جميع الكتل والحالات.
- يمكن استرداد جميع الحالات من التخزين المحلي أو إعادة إنشائها من "اللقطات" بواسطة عقدة كاملة.
- يخدم الشبكة ويوفر البيانات عند الطلب.

### عقدة الأرشيف {#archive-node}

عقد الأرشيف هي عقد كاملة تتحقق من كل كتلة من التكوين ولا تحذف أبدًا أيًا من البيانات التي تم تنزيلها.

- يقوم بتخزين كل شيء موجود في العقدة الكاملة ويقوم ببناء أرشيف للحالات التاريخية. من الضروري أن تقوم بذلك إذا كنت تريد الاستعلام عن شيء مثل رصيد الحساب في الكتلة رقم 4,000,000، أو ببساطة اختبار مجموعة المعاملات الخاصة بك بشكل موثوق دون التحقق من صحتها باستخدام التتبع.
- تمثل هذه البيانات وحدات تيرابايت، مما يجعل عقد الأرشيف أقل جاذبية للمستخدمين العاديين ولكن يمكن أن تكون مفيدة للخدمات مثل مستكشفات الكتل وبائعي المحافظ وتحليلات السلسلة.

Syncing clients in any mode other than archive will result in pruned blockchain data. This means, there is no archive of all historical states but the full node is able to build them on demand.

تعرف على المزيد حول [عقد الأرشيف](/developers/docs/nodes-and-clients/archive-nodes).

### عقدة خفيفة {#light-node}

بدلاً من تنزيل كل كتلة، تقوم العقد الخفيفة بتنزيل رؤوس الكتل فقط. تحتوي هذه العناوين على معلومات موجزة حول محتويات الكتل. يتم طلب أي معلومات أخرى تتطلبها عقدة الضوء من عقدة كاملة. يمكن بعد ذلك لعقدة الضوء التحقق بشكل مستقل من البيانات التي تتلقاها مقابل جذور الحالة في رؤوس الكتلة. تتيح العقد الخفيفة للمستخدمين المشاركة في شبكة Ethereum دون الحاجة إلى أجهزة قوية أو نطاق ترددي عالي مطلوب لتشغيل العقد الكاملة. في نهاية المطاف، قد يتم تشغيل العقد الخفيفة على الهواتف المحمولة أو الأجهزة المضمنة. لا تشارك العقد الخفيفة في الإجماع (أي أنها لا يمكن أن تكون مدققين)، ولكن يمكنها الوصول إلى بلوكتشين إيثريوم بنفس الوظائف وضمانات الأمان التي تتمتع بها العقدة الكاملة.

Light clients are an area of active development for Ethereum and we expect to see new light clients for the consensus layer and execution layer soon.
هناك أيضًا مسارات محتملة لتوفير بيانات العميل الخفيف عبر [شبكة النميمة](https://www.ethportal.net/). This is advantageous because the gossip network could support a network of light nodes without requiring full nodes to serve requests.

Ethereum does not support a large population of light nodes yet, but light node support is an area expected to develop rapidly in the near future. بشكل خاص، يركز العملاء مثل [Nimbus](https://nimbus.team/) و[Helios](https://github.com/a16z/helios) و[LodeStar](https://lodestar.chainsafe.io/) حاليًا بشكل كبير على العقد الخفيفة.

## لماذا يجب علي تشغيل عقدة Ethereum؟ {#why-should-i-run-an-ethereum-node}

Running a node allows you to directly, trustlessly and privately use Ethereum while supporting the network by keeping it more robust and decentralized.

### فوائد لك {#benefits-to-you}

Running your own node enables you to use Ethereum in a private, self-sufficient and trustless manner. You don't need to trust the network because you can verify the data yourself with your client. "Don't trust, verify" is a popular blockchain mantra.

- تقوم العقدة الخاصة بك بالتحقق من جميع المعاملات والكتل وفقًا لقواعد الإجماع بنفسها. وهذا يعني أنه لا يتعين عليك الاعتماد على أي عقد أخرى في الشبكة أو الثقة بها بشكل كامل.
- يمكنك استخدام محفظة Ethereum مع العقدة الخاصة بك. يمكنك استخدام التطبيقات اللامركزية بشكل أكثر أمانًا وخصوصية لأنك لن تضطر إلى تسريب عناوينك وأرصدتك إلى الوسطاء. يمكن التحقق من كل شيء مع العميل الخاص بك. تقدم [MetaMask](https://metamask.io) و [Frame](https://frame.sh/) و[العديد من المحافظ الأخرى](/wallets/find-wallet/) إمكانية استيراد RPC، مما يسمح لها باستخدام عقدتك.
- يمكنك تشغيل واستضافة خدمات أخرى تعتمد على البيانات من Ethereum. على سبيل المثال، قد يكون هذا محقق Beacon Chain، أو برنامجًا مثل الطبقة 2، أو البنية الأساسية، أو مستكشفات الكتل، أو معالجات الدفع، وما إلى ذلك.
- يمكنك توفير [نقاط نهاية RPC](/developers/docs/apis/json-rpc/) المخصصة الخاصة بك. يمكنك أيضًا تقديم نقاط النهاية هذه علنًا للمجتمع لمساعدتهم على تجنب مقدمي الخدمات المركزيين الكبار.
- يمكنك الاتصال بعقدتك باستخدام **الاتصالات بين العمليات (IPC)** أو إعادة كتابة العقدة لتحميل برنامجك كمكون إضافي. وهذا يمنح زمن انتقال منخفضًا، مما يساعد كثيرًا، على سبيل المثال، عند معالجة الكثير من البيانات باستخدام مكتبات web3 أو عندما تحتاج إلى استبدال معاملاتك بأسرع ما يمكن (أي، الاستباق).
- يمكنك المراهنة بشكل مباشر على ETH لتأمين الشبكة وكسب المكافآت. راجع [التخزين الفردي](/staking/solo/) للبدء.

![كيفية الوصول إلى إيثريوم عبر تطبيقك وعقدك](./nodes.png)

### فوائد الشبكة {#network-benefits}

A diverse set of nodes is important for Ethereum’s health, security and operational resiliency.

- تطبق العقد الكاملة قواعد الإجماع حتى لا يتم خداعها لقبول الكتل التي لا تتبعها. يؤدي هذا إلى توفير أمان إضافي في الشبكة لأنه إذا كانت جميع العقد عبارة عن عقد خفيفة، والتي لا تقوم بالتحقق الكامل، فقد يقوم المحققون بمهاجمة الشبكة.
- في حالة وقوع هجوم يتغلب على دفاعات التشفير الاقتصادي لآلية [إثبات الحصة](/developers/docs/consensus-mechanisms/pos/#what-is-pos)، يمكن إجراء استرداد اجتماعي بواسطة العقد الكاملة التي تختار اتباع السلسلة النزيهة.
- إن زيادة عدد العقد في الشبكة يؤدي إلى إنشاء شبكة أكثر تنوعًا وقوة، وهو الهدف النهائي المتمثل في اللامركزية، والذي يتيح نظامًا مقاومًا للرقابة وموثوقًا به.
- توفر العقد الكاملة إمكانية الوصول إلى بيانات blockchain للعملاء خفيفي الوزن الذين يعتمدون عليها. لا تخزن العقد الخفيفة سلسلة الكتل بأكملها، بل تتحقق من البيانات عبر [جذور الحالة في ترويسات الكتل](/developers/docs/blocks/#block-anatomy). توفر العقد الكاملة إمكانية الوصول إلى بيانات blockchain للعملاء خفيفي الوزن الذين يعتمدون عليها.

إذا قمت بتشغيل عقدة كاملة، فإن شبكة Ethereum بأكملها تستفيد منها، حتى لو لم تقم بتشغيل محقق.

## تشغيل عقدتك الخاصة {#running-your-own-node}

Interested in running your own Ethereum client؟

للحصول على مقدمة سهلة للمبتدئين، تفضل بزيارة صفحتنا [تشغيل عقدة](/run-a-node) لمعرفة المزيد.

إذا كنت مستخدمًا تقنيًا أكثر، فتعمق في مزيد من التفاصيل والخيارات حول كيفية [تشغيل عقدتك الخاصة](/developers/docs/nodes-and-clients/run-a-node/).

## البدائل {#alternatives}

Setting up your own node can cost you time and resources but you don’t always need to run your own instance. في هذه الحالة، يمكنك استخدام موفر واجهة برمجة التطبيقات التابع لجهة خارجية. للحصول على نظرة عامة حول استخدام هذه الخدمات، تحقق من [العُقد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service/).

إذا قام شخص ما بتشغيل عقدة Ethereum باستخدام واجهة برمجة تطبيقات عامة في مجتمعك، فيمكنك توجيه محافظك إلى عقدة مجتمعية عبر RPC مخصص والحصول على المزيد من الخصوصية مقارنةً ببعض الجهات الخارجية الموثوقة العشوائية.

On the other hand, if you run a client, you can share it with your friends who might need it.

## عملاء التنفيذ {#execution-clients}

The Ethereum community maintains multiple open-source execution clients (previously known as 'Eth1 clients', or just 'Ethereum clients'), developed by different teams using different programming languages. وهذا يجعل الشبكة أقوى وأكثر [تنوعًا](/developers/docs/nodes-and-clients/client-diversity/). The ideal goal is to achieve diversity without any client dominating to reduce any single points of failure.

This table summarizes the different clients. جميعها تجتاز [اختبارات العميل](https://github.com/ethereum/tests) ويتم صيانتها بنشاط لتبقى محدثة بترقيات الشبكة.

| عميل                                                                                          | اللغة                        | أنظمة التشغيل            | الشبكات                         | استراتيجيات المزامنة                                                         | تشذيب النظام      |
| --------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------ | ------------------------------- | ---------------------------------------------------------------------------- | ----------------- |
| [Geth](https://geth.ethereum.org/)                                                            | Go                           | لينكس، ويندوز، ماك أو إس | الشبكة الرئيسية، سيبوليا، Hoodi | [Snap](#snap-sync)، [كامل](#full-sync)                                       | الأرشيف، مُقَلَّم |
| [Nethermind](https://www.nethermind.io/)                                                      | سي شارب، .نت | لينكس، ويندوز، ماك أو إس | الشبكة الرئيسية، سيبوليا، Hoodi | [Snap](#snap-sync) (بدون تقديم)، سريع، [كامل](#full-sync) | الأرشيف، مُقَلَّم |
| [Besu](https://besu.hyperledger.org/en/stable/)                                               | Java                         | لينكس، ويندوز، ماك أو إس | الشبكة الرئيسية، سيبوليا، Hoodi | [Snap](#snap-sync)، [سريع](#fast-sync)، [كامل](#full-sync)                   | الأرشيف، مُقَلَّم |
| [Erigon](https://github.com/ledgerwatch/erigon)                                               | Go                           | لينكس، ويندوز، ماك أو إس | الشبكة الرئيسية، سيبوليا، Hoodi | [كامل](#full-sync)                                                           | الأرشيف، مُقَلَّم |
| [Reth](https://reth.rs/)                                                                      | Rust                         | لينكس، ويندوز، ماك أو إس | الشبكة الرئيسية، سيبوليا، Hoodi | [كامل](#full-sync)                                                           | الأرشيف، مُقَلَّم |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(تجريبي)_ | تايب سكريبت                  | لينكس، ويندوز، ماك أو إس | سيبوليا، Hoodi                  | [كامل](#full-sync)                                                           | مشذب              |

لمعرفة المزيد عن الشبكات المدعومة، اقرأ عن [شبكات إيثريوم](/developers/docs/networks/).

Each client has unique use cases and advantages, so you should choose one based on your own preferences. Diversity allows implementations to be focused on different features and user audiences. You may want to choose a client based on features, support, programming language, or licences.

### Besu {#besu}

Hyperledger Besu is an enterprise-grade Ethereum client for public and permissioned networks. It runs all of the Ethereum Mainnet features, from tracing to GraphQL, has extensive monitoring and is supported by ConsenSys, both in open community channels and through commercial SLAs for enterprises. It is written in Java and is Apache 2.0 licensed.

[توثيق](https://besu.hyperledger.org/en/stable/) Besu الشامل سيرشدك خلال جميع التفاصيل حول ميزاته وإعداداته.

### Erigon {#erigon}

Erigon, formerly known as Turbo‐Geth, started as a fork of Go Ethereum oriented toward speed and disk‐space efficiency. Erigon is a completely re-architected implementation of Ethereum, currently written in Go but with implementations in other languages under development. Erigon's goal is to provide a faster, more modular, and more optimized implementation of Ethereum. It can perform a full archive node sync using around 2TB of disk space, in under 3 days.

### Go Ethereum {#geth}

Go Ethereum (Geth for short) is one of the original implementations of the Ethereum protocol. Currently, it is the most widespread client with the biggest user base and variety of tooling for users and developers. It is written in Go, fully open source and licensed under the GNU LGPL v3.

تعرف على المزيد حول Geth في [توثيقه](https://geth.ethereum.org/docs/).

### Nethermind {#nethermind}

Nethermind is an Ethereum implementation created with the C# .NET tech stack, licensed with LGPL-3.0, running on all major platforms including ARM. It offers great performance with:

- آلة افتراضية مُحسّنة
- وصول الدولة
- الشبكات والميزات الغنية مثل لوحات معلومات Prometheus/Grafana، ودعم تسجيل المؤسسة seq، وتتبع JSON-RPC، وإضافات التحليلات.

لدى Nethermind أيضًا [توثيق مفصل](https://docs.nethermind.io)، ودعم قوي للمطورين، ومجتمع عبر الإنترنت ودعم متاح على مدار الساعة طوال أيام الأسبوع للمستخدمين المتميزين.

### Reth {#reth}

Reth (اختصار لـ Rust Ethereum) هو تنفيذ عقدة Ethereum كاملة يركز على كونه سهل الاستخدام، ومتعدد الوحدات، وسريعًا وفعالًا. تم بناء Reth في الأصل وتطويره بواسطة Paradigm، وهو مرخص بموجب تراخيص Apache وMIT.

Reth جاهز للإنتاج ومناسب للاستخدام في البيئات المهمة مثل التخزين أو الخدمات عالية التشغيل. يؤدي أداءً جيدًا في حالات الاستخدام التي تتطلب أداءً عاليًا بهوامش كبيرة مثل RPC وMEV والفهرسة والمحاكاة وأنشطة P2P.

تعرف على المزيد من خلال الاطلاع على [كتاب Reth](https://reth.rs/)، أو [مستودع Reth على GitHub](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### قيد التطوير {#execution-in-development}

لا تزال هذه العملاء في مراحل مبكرة من التطوير ولا يوصى باستخدامها في الإنتاج بعد.

#### EthereumJS {#ethereumjs}

تم كتابة EthereumJS Execution Client (EthereumJS) بلغة TypeScript ويتكون من عدد من الحزم، بما في ذلك أساسيات Ethereum الأساسية التي تمثلها فئات Block وTransaction وMerkle-Patricia Trie ومكونات العميل الأساسية بما في ذلك تنفيذ Ethereum Virtual Machine (EVM)، وفئة blockchain، ومكدس الشبكات DevP2P.

تعرف على المزيد حوله من خلال قراءة [توثيقه](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)

## عملاء الإجماع {#consensus-clients}

هناك العديد من عملاء الإجماع (المعروفين سابقًا باسم عملاء 'Eth2') لدعم [ترقيات الإجماع](/roadmap/beacon-chain/). هم مسؤولون عن كل المنطق المتعلق بالإجماع بما في ذلك خوارزمية اختيار الانقسام، ومعالجة المصادقات وإدارة مكافآت وعقوبات [إثبات الحصة](/developers/docs/consensus-mechanisms/pos).

| عميل                                                          | اللغة       | أنظمة التشغيل            | الشبكات                                                |
| ------------------------------------------------------------- | ----------- | ------------------------ | ------------------------------------------------------ |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust        | لينكس، ويندوز، ماك أو إس | سلسلة المنارة، Hoodi، Pyrmont، سيبوليا، وغيرها         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | تايب سكريبت | لينكس، ويندوز، ماك أو إس | سلسلة المنارة، Hoodi، سيبوليا، وغيرها                  |
| [Nimbus](https://nimbus.team/)                                | نيم         | لينكس، ويندوز، ماك أو إس | سلسلة المنارة، Hoodi، سيبوليا، وغيرها                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go          | لينكس، ويندوز، ماك أو إس | سلسلة المنارة، Gnosis، Hoodi، Pyrmont، سيبوليا، وغيرها |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java        | لينكس، ويندوز، ماك أو إس | سلسلة المنارة، Gnosis، Hoodi، سيبوليا، وغيرها          |
| [Grandine](https://docs.grandine.io/)                         | Rust        | لينكس، ويندوز، ماك أو إس | سلسلة المنارة، Hoodi، سيبوليا، وغيرها                  |

### Lighthouse {#lighthouse}

Lighthouse is a consensus client implementation written in Rust under the Apache-2.0 license. It is maintained by Sigma Prime and has been stable and production-ready since Beacon Chain genesis. It is relied upon by various enterprises, staking pools and individuals. It aims to be secure, performant and interoperable in a wide range of environments, from desktop PCs to sophisticated automated deployments.

يمكن العثور على التوثيق في [كتاب Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar is a production-ready consensus client implementation written in Typescript under the LGPL-3.0 license. It is maintained by ChainSafe Systems and is the newest of the consensus clients for solo-stakers, developers and researchers. Lodestar consists of a beacon node and validator client powered by JavaScript implementations of Ethereum protocols. Lodestar aims to improve Ethereum usability with light clients, expand accessibility to a larger group of developers and further contribute to ecosystem diversity.

يمكن العثور على مزيد من المعلومات على [موقع Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus is a consensus client implementation written in Nim under the Apache-2.0 license. It is a production-ready client in use by solo-stakers and staking pools. Nimbus is designed for resource efficiency, making it easy to run on resource-restricted devices and enterprise infrastructure with equal ease, without compromising stability or reward performance. A lighter resource footprint means the client has a greater margin of safety when the network is under stress.

تعرف على المزيد في [وثائق Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm is a full-featured, open source consensus client written in Go under the GPL-3.0 license. It features an optional webapp UI and prioritizes user experience, documentation, and configurability for both stake-at-home and institutional users.

تفضل بزيارة [وثائق Prysm](https://prysm.offchainlabs.com/docs/) لمعرفة المزيد.

### Teku {#teku}

Teku is one of the original Beacon Chain genesis clients. Alongside the usual goals (security, robustness, stability, usability, performance), Teku specifically aims to comply fully with all the various consensus client standards.

Teku offers very flexible deployment options. The beacon node and validator client can be run together as a single process, which is extremely convenient for solo stakers, or nodes can be run separately for sophisticated staking operations. بالإضافة إلى ذلك، فإن Teku قابل للتشغيل البيني بشكل كامل مع [Web3Signer](https://github.com/ConsenSys/web3signer/) لأمان مفتاح التوقيع والحماية من القطع.

Teku is written in Java and is Apache 2.0 licensed. It is developed by the Protocols team at ConsenSys that is also responsible for Besu and Web3Signer. تعرف على المزيد في [وثائق Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine هو تنفيذ عميل إجماعي، مكتوب بلغة Rust بموجب ترخيص GPL-3.0. يتم صيانته بواسطة فريق Grandine Core وهو سريع وعالي الأداء وخفيف الوزن. إنه يناسب مجموعة واسعة من المشاركين من المشاركين الفرديين الذين يعملون على أجهزة ذات موارد منخفضة مثل Raspberry Pi إلى المشاركين المؤسسيين الكبار الذين يديرون عشرات الآلاف من المحققين.

يمكن العثور على التوثيق في [كتاب Grandine](https://docs.grandine.io/)

## أوضاع المزامنة {#sync-modes}

To follow and verify current data in the network, the Ethereum client needs to sync with the latest network state. This is done by downloading data from peers, cryptographically verifying their integrity, and building a local blockchain database.

Synchronization modes represent different approaches to this process with various trade-offs. Clients also vary in their implementation of sync algorithms. Always refer to the official documentation of your chosen client for specifics on implementation.

### أوضاع مزامنة طبقة التنفيذ {#execution-layer-sync-modes}

يمكن تشغيل طبقة التنفيذ في أوضاع مختلفة لتناسب حالات الاستخدام المختلفة، من إعادة تنفيذ حالة العالم الخاصة بسلسلة الكتل إلى المزامنة فقط مع طرف السلسلة من نقطة تفتيش موثوقة.

#### مزامنة كاملة {#full-sync}

تقوم المزامنة الكاملة بتنزيل جميع الكتل (بما في ذلك الرؤوس وأجسام الكتل) وتجديد حالة blockchain بشكل تدريجي عن طريق تنفيذ كل كتلة من التكوين.

- Minimizes trust and offers the highest security by verifying every transaction.
- With an increasing number of transactions, it can take days to weeks to process all transactions.

تقوم [عقد الأرشيف](#archive-node) بإجراء مزامنة كاملة لإنشاء (والاحتفاظ) بسجل كامل لتغييرات الحالة التي أجرتها كل معاملة في كل كتلة.

#### مزامنة سريعة {#fast-sync}

مثل المزامنة الكاملة، تقوم المزامنة السريعة بتنزيل كافة الكتل (بما في ذلك الرؤوس والمعاملات والإيصالات). ومع ذلك، بدلاً من إعادة معالجة المعاملات التاريخية، تعتمد المزامنة السريعة على الإيصالات حتى تصل إلى رأس حديث، عندما تتحول إلى استيراد ومعالجة الكتل لتوفير عقدة كاملة.

- استراتيجية المزامنة السريعة.
- يقلل من الطلب على المعالجة لصالح استخدام النطاق الترددي.

#### مزامنة Snap {#snap-sync}

تتحقق عمليات المزامنة السريعة أيضًا من السلسلة كتلة تلو الأخرى. ومع ذلك، بدلاً من البدء في كتلة التكوين، تبدأ عملية المزامنة السريعة عند نقطة تفتيش "موثوقة" أحدث معروفة بأنها جزء من blockchain الحقيقي. تقوم العقدة بحفظ نقاط التفتيش الدورية أثناء حذف البيانات الأقدم من عمر معين. يتم استخدام هذه اللقطات لتجديد بيانات الحالة حسب الحاجة، بدلاً من تخزينها إلى الأبد.

- أسرع استراتيجية للمزامنة، وهي الافتراضية حاليًا في شبكة Ethereum الرئيسية.
- Saves a lot of disk usage and network bandwidth without sacrificing security.

[المزيد عن مزامنة Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### مزامنة خفيفة {#light-sync}

Light client mode downloads all block headers, block data, and verifies some randomly. Only syncs tip of the chain from the trusted checkpoint.

- Gets only the latest state while relying on trust in developers and consensus mechanism.
- Client ready to use with current network state in a few minutes.

**ملاحظة** لا تعمل المزامنة الخفيفة بعد مع إيثريوم إثبات الحصة - يجب شحن إصدارات جديدة من المزامنة الخفيفة قريبًا!

[المزيد عن العملاء الخفيفين](/developers/docs/nodes-and-clients/light-clients/)

### أوضاع مزامنة طبقة الإجماع {#consensus-layer-sync-modes}

#### مزامنة تفاؤلية {#optimistic-sync}

Optimistic sync is a post-merge synchronization strategy designed to be opt-in and backwards compatible, allowing execution nodes to sync via established methods. يمكن لمحرك التنفيذ استيراد كتل المنارة _بتفاؤل_ دون التحقق منها بالكامل، والعثور على أحدث رأس، ثم بدء مزامنة السلسلة بالطرق المذكورة أعلاه. Then, after the execution client has caught up, it will inform the consensus client of the validity of the transactions in the Beacon Chain.

[المزيد عن المزامنة التفاؤلية](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### مزامنة نقطة التفتيش {#checkpoint-sync}

تعمل مزامنة نقطة التفتيش، المعروفة أيضًا باسم مزامنة الذاتية الضعيفة، على إنشاء تجربة مستخدم متفوقة لمزامنة عقدة Beacon. يعتمد هذا على افتراضات [الذاتية الضعيفة](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) والتي تتيح مزامنة سلسلة المنارة من نقطة تفتيش ذاتية ضعيفة حديثة بدلاً من نقطة الأصل. تجعل عمليات مزامنة نقاط التفتيش وقت المزامنة الأولي أسرع بشكل كبير مع افتراضات ثقة مماثلة للمزامنة من [نقطة الأصل](/glossary/#genesis-block).

In practice, this means your node connects to a remote service to download recent finalized states and continues verifying data from that point. إن الطرف الثالث الذي يقدم البيانات هو الطرف الموثوق به ويجب اختياره بعناية.

المزيد عن [مزامنة نقطة التفتيش](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## قراءة إضافية{#further-reading}

- [إيثريوم 101 - الجزء 2 - فهم العقد](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes، 13 فبراير 2019_
- [تشغيل عقد إيثريوم كاملة: دليل لأصحاب الدوافع الضعيفة](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– جاستن لورو، 7 نوفمبر 2019_

## المواضيع ذات الصلة {#related-topics}

- [الكتل](/developers/docs/blocks/)
- [الشبكات](/developers/docs/networks/)

## دروس تعليمية ذات صلة {#related-tutorials}

- [حوّل جهاز Raspberry Pi 4 الخاص بك إلى عقدة مدقق بمجرد وميض بطاقة MicroSD - دليل التثبيت](/developers/tutorials/run-node-raspberry-pi/) _– قم بوميض جهاز Raspberry Pi 4 الخاص بك، وقم بتوصيل كابل إيثرنت، وتوصيل قرص SSD وتشغيل الجهاز لتحويل Raspberry Pi 4 إلى عقدة إيثريوم كاملة تشغل طبقة التنفيذ (الشبكة الرئيسية) و/أو طبقة الإجماع (سلسلة المنارة / المدقق)._
