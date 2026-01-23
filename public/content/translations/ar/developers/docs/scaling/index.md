---
title: "التوسع"
description: "مقدمة لخيارات التوسع المختلفة التي يتم تطويرها حاليًا بواسطة مجتمع Ethereum."
lang: ar
sidebarDepth: 3
---

## نظرة عامة على التوسع {#scaling-overview}

مع تزايد عدد الأشخاص الذين يستخدمون Ethereum، وصلت blockchain إلى حدود معينة من القدرة. وقد أدى هذا إلى ارتفاع تكلفة استخدام الشبكة، مما أدى إلى خلق الحاجة إلى "حلول قابلة للتوسع". هناك حلول متعددة يتم البحث عنها واختبارها وتنفيذها والتي تتخذ طرقًا مختلفة لتحقيق أهداف مماثلة.

الهدف الرئيسي من قابلية التوسع هو زيادة سرعة المعاملات (إنهاء أسرع) وإنتاجية المعاملات (عدد أكبر من المعاملات في الثانية) دون التضحية باللامركزية أو الأمان. على بلوكتشين إيثريوم الطبقة الأولى، يؤدي الطلب المرتفع إلى معاملات أبطأ وأسعار [غاز](/developers/docs/gas/) غير قابلة للتطبيق. إن زيادة سعة الشبكة من حيث السرعة والإنتاجية أمر أساسي للتبني الشامل والهادف لإيثريوم.

ورغم أهمية السرعة والإنتاجية، فمن الضروري أن تظل حلول التوسع التي تمكن هذه الأهداف لامركزية وآمنة. يعد الحفاظ على حاجز الدخول منخفضًا بالنسبة لمشغلي العقد أمرًا بالغ الأهمية في منع التقدم نحو قوة الحوسبة المركزية وغير الآمنة.

من الناحية المفاهيمية، نقوم أولاً بتصنيف التوسع على أنه إما توسع على السلسلة أو توسع خارج السلسلة.

## المتطلبات الأساسية {#prerequisites}

يجب أن يكون لديك فهم جيد لجميع المواضيع الأساسية. يعد تنفيذ حلول التوسع أمرًا متقدمًا نظرًا لأن التكنولوجيا لم تخضع لاختبارات ميدانية كافية، وتستمر في البحث والتطوير.

## التوسع على السلسلة {#onchain-scaling}

يتطلب التوسع على السلسلة إجراء تغييرات على بروتوكول إيثريوم (أي الطبقة الأولى من [الشبكة الرئيسية Mainnet](/glossary/#mainnet)). لفترة طويلة، كان من المتوقع أن يؤدي تجزئة blockchain إلى توسيع نطاق Ethereum. كان هذا سيتضمن تقسيم blockchain إلى أجزاء منفصلة (شظايا) ليتم التحقق منها بواسطة مجموعات فرعية من المحققين. ومع ذلك، فقد أصبح التوسع من خلال عمليات التجميع في الطبقة 2 هو تقنية التوسع الأساسية. ويتم دعم ذلك من خلال إضافة شكل جديد أرخص من البيانات المرفقة بكتل Ethereum والتي تم تصميمها خصيصًا لجعل التجميعات رخيصة للمستخدمين.

### مشاركة{#sharding}

التجزئة هي عملية تقسيم قاعدة البيانات. ستكون مجموعات فرعية من المحققين مسؤولة عن الشظايا الفردية بدلاً من متابعة كل Ethereum. كانت التجزئة على [خارطة طريق](/roadmap/) إيثريوم لفترة طويلة، وكان من المفترض في وقت من الأوقات أن يتم إطلاقها قبل الدمج إلى إثبات الحصة. ومع ذلك، فإن التطور السريع [لرول أب الطبقة الثانية](#layer-2-scaling) واختراع [Danksharding](/roadmap/danksharding) (إضافة نقاط بيانات (blobs) الرول أب إلى كتل إيثريوم التي يمكن التحقق منها بكفاءة عالية من قبل المدققين) قد دفع مجتمع إيثريوم إلى تفضيل التوسع الذي يركز على الرول أب بدلاً من التوسع عن طريق التجزئة. سيساعد هذا أيضًا في الحفاظ على منطق إجماع Ethereum بشكل أبسط.

## التوسع خارج السلسلة {#offchain-scaling}

يتم تنفيذ حلول Offchain بشكل منفصل عن الشبكة الرئيسية للطبقة 1 - ولا تتطلب أي تغييرات على بروتوكول Ethereum الحالي. بعض الحلول، المعروفة باسم حلول "الطبقة الثانية"، تستمد أمانها مباشرة من إجماع إيثريوم في الطبقة الأولى، مثل [الرول أب التفاؤلي](/developers/docs/scaling/optimistic-rollups/)، أو [رول أب المعرفة الصفرية](/developers/docs/scaling/zk-rollups/) أو [قنوات الحالة](/developers/docs/scaling/state-channels/). تتضمن الحلول الأخرى إنشاء سلاسل جديدة بأشكال مختلفة تستمد أمانها بشكل منفصل عن الشبكة الرئيسية، مثل [السلاسل الجانبية](#sidechains)، أو [validiums](#validium)، أو [سلاسل البلازما](#plasma). تتواصل هذه الحلول مع الشبكة الرئيسية ولكنها تستمد أمانها بشكل مختلف لتحقيق مجموعة متنوعة من الأهداف.

### توسع الطبقة الثانية {#layer-2-scaling}

تستمد هذه الفئة من حلول offchain أمانها من الشبكة الرئيسية Ethereum.

Layer 2 is a collective term for solutions designed to help scale your application by handling transactions off the Ethereum Mainnet (layer 1) while taking advantage of the robust decentralized security model of Mainnet. Transaction speed suffers when the network is busy, making the user experience poor for certain types of dapps. And as the network gets busier, gas prices increase as transaction senders aim to outbid each other. This can make using Ethereum very expensive.

Most layer 2 solutions are centered around a server or cluster of servers, each of which may be referred to as a node, validator, operator, sequencer, block producer, or similar term. Depending on the implementation, these layer 2 nodes may be run by the individuals, businesses or entities that use them, or by a 3rd party operator, or by a large group of individuals (similar to Mainnet). Generally speaking, transactions are submitted to these layer 2 nodes instead of being submitted directly to layer 1 (Mainnet). بالنسبة لبعض الحلول، تقوم طبقة 2 بعد ذلك بتجميعها في مجموعات قبل تثبيتها في الطبقة 1، وبعد ذلك يتم تأمينها بواسطة الطبقة 1 ولا يمكن تغييرها. The details of how this is done vary significantly between different layer 2 technologies and implementations.

A specific layer 2 instance may be open and shared by many applications, or may be deployed by one project and dedicated to supporting only their application.

#### لماذا هناك حاجة للطبقة 2؟ {#why-is-layer-2-needed}

- إن زيادة عدد المعاملات في الثانية الواحدة تعمل على تحسين تجربة المستخدم بشكل كبير، وتقلل من ازدحام الشبكة على الشبكة الرئيسية Ethereum.
- يتم تجميع المعاملات في معاملة واحدة على الشبكة الرئيسية Ethereum، مما يقلل من رسوم الغاز للمستخدمين ويجعل Ethereum أكثر شمولاً وسهولة في الوصول إليها للأشخاص في كل مكان.
- لا ينبغي لأي تحديثات تتعلق بإمكانية التوسع أن تكون على حساب اللامركزية أو الأمان - حيث يتم بناء الطبقة 2 فوق Ethereum.
- توجد شبكات من الطبقة 2 مخصصة للتطبيقات والتي توفر مجموعة خاصة بها من الكفاءات عند العمل مع الأصول على نطاق واسع.

[المزيد عن الطبقة الثانية](/layer-2/).

#### الرول أب {#rollups}

Rollups perform transaction execution outside layer 1 and then the data is posted to layer 1 where consensus is reached. As transaction data is included in layer 1 blocks, this allows rollups to be secured by native Ethereum security.

There are two types of rollups with different security models:

- **الرول أب التفاؤلي**: يفترض أن المعاملات صالحة بشكل افتراضي ويجري الحساب فقط، عبر [**إثبات الاحتيال**](/glossary/#fraud-proof)، في حالة وجود تحدٍ. [المزيد عن الرول أب التفاؤلي](/developers/docs/scaling/optimistic-rollups/).
- **رول أب المعرفة الصفرية**: يجري الحساب خارج السلسلة ويقدم [**إثبات الصلاحية**](/glossary/#validity-proof) إلى السلسلة. [المزيد عن رول أب المعرفة الصفرية](/developers/docs/scaling/zk-rollups/).

#### قنوات الدولة {#channels}

تستخدم القنوات الحكومية عقودًا متعددة التوقيع لتمكين المشاركين من إجراء المعاملات بسرعة وحرية خارج السلسلة، ثم تسوية النهاية مع الشبكة الرئيسية. This minimizes network congestion, fees, and delays. The two types of channels are currently state channels and payment channels.

تعرّف على المزيد حول [قنوات الحالة](/developers/docs/scaling/state-channels/).

### السلاسل الجانبية {#sidechains}

السلسلة الجانبية هي بلوكتشين مستقلة متوافقة مع آلة إيثريوم الافتراضية (EVM) تعمل بالتوازي مع الشبكة الرئيسية. وهي متوافقة مع إيثريوم عبر جسور ثنائية الاتجاه وتعمل بموجب قواعد الإجماع ومعلمات الكتلة التي تختارها.

تعرّف على المزيد حول [السلاسل الجانبية](/developers/docs/scaling/sidechains/).

### البلازما {#plasma}

سلسلة البلازما هي بلوكتشين منفصلة ترتكز على سلسلة إيثريوم الرئيسية، وتستخدم إثباتات الاحتيال (مثل [الرول أب التفاؤلي](/developers/docs/scaling/optimistic-rollups/)) للتحكيم في النزاعات.

تعرّف على المزيد حول [البلازما](/developers/docs/scaling/plasma/).

### فاليديوم {#validium}

A Validium chain uses validity proofs like zero-knowledge rollups but data is not stored on the main layer 1 Ethereum chain. This can lead to 10k transactions per second per Validium chain and multiple chains can be run in parallel.

تعرّف على المزيد حول [فاليديوم](/developers/docs/scaling/validium/).

## لماذا نحتاج إلى العديد من حلول التوسع؟ {#why-do-we-need-these}

- يمكن أن تساعد الحلول المتعددة في تقليل الازدحام العام في أي جزء من الشبكة ومنع نقاط الفشل الفردية أيضًا.
- الكل أكبر من مجموع أجزائه. يمكن أن توجد حلول مختلفة تعمل بتناغم، مما يسمح بتأثير كبير على سرعة المعاملات والإنتاجية في المستقبل.
- لا تتطلب جميع الحلول استخدام خوارزمية إجماع Ethereum بشكل مباشر، ويمكن أن توفر البدائل فوائد قد يكون من الصعب الحصول عليها بخلاف ذلك.

## أتريد المزيد من المعلومات المرئية؟ {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_لاحظ أن الشرح في الفيديو يستخدم مصطلح "الطبقة 2" للإشارة إلى جميع حلول التوسع خارج السلسلة، بينما نميز "الطبقة 2" كحل خارج السلسلة يستمد أمانه من خلال إجماع الشبكة الرئيسية للطبقة 1._

<YouTube id="7pWxCklcNsU" />

## قراءة إضافية{#further-reading}

- [خارطة طريق إيثريوم المتمحورة حول الرول أب](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _فيتاليك بوتيرين_
- [تحليلات محدّثة حول حلول توسع الطبقة الثانية لإيثريوم](https://www.l2beat.com/)
- [تقييم حلول توسع الطبقة الثانية لإيثريوم: إطار عمل للمقارنة](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [دليل غير مكتمل للرول أب](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [رول أب المعرفة الصفرية (ZK-Rollups) المدعوم من إيثريوم: الأفضل في العالم](https://hackmd.io/@canti/rkUT0BD8K)
- [الرول أب التفاؤلي مقابل رول أب المعرفة الصفرية](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [لماذا تُعد عمليات الرول أب + أجزاء البيانات الحل المستدام الوحيد لقابلية التوسع العالية](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [ما نوع الطبقات الثالثة (Layer 3s) المنطقية؟](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [توفر البيانات أو: كيف تعلم تكديس المعاملات التوقف عن القلق وحب إيثريوم](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [الدليل العملي لرول أب إيثريوم](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_
