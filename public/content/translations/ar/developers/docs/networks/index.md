---
title: "الشبكات"
description: "نظرة عامة على شبكات إيثريوم وأين يمكن الحصول على ether (ETH) تجريبي لاختبار تطبيقك."
lang: ar
---

شبكات إيثريوم هي مجموعات من أجهزة الكمبيوتر المتصلة التي تتواصل باستخدام بروتوكول إيثريوم. لا يوجد سوى شبكة إيثريوم رئيسية واحدة، ولكن يمكن إنشاء شبكات مستقلة تتوافق مع نفس قواعد البروتوكول لأغراض الاختبار والتطوير. هناك العديد من ”الشبكات“ المستقلة التي تتوافق مع البروتوكول دون التفاعل مع بعضها البعض. يمكنك حتى بدء تشغيل واحد محليًا على جهاز الكمبيوتر الخاص بك لاختبار العقود الذكية وتطبيقات ويب3.

سيعمل حساب إيثريوم الخاص بك عبر الشبكات المختلفة، ولكن رصيد حسابك وسجل معاملاتك لن يتم نقلهما من شبكة إيثريوم الرئيسية. لأغراض الاختبار، من المفيد معرفة الشبكات المتاحة وكيفية الحصول على ETH من شبكة الاختبار للتجربة. بشكل عام، ولأسباب أمنية، لا يُنصح بإعادة استخدام حسابات الشبكة الرئيسية على شبكات التجريب أو العكس.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم [أساسيات إيثريوم](/developers/docs/intro-to-ethereum/) قبل القراءة عن الشبكات المختلفة، حيث ستمنحك شبكات الاختبار إصدارًا رخيصًا وآمنًا من Ethereum لتجربته.

## الشبكات العامة {#public-networks}

الشبكات العامة متاحة لأي شخص في العالم لديه اتصال بالإنترنت. يمكن لأي شخص قراءة أو إنشاء معاملات على سلسلة الكتل العامة والتحقق من صحة المعاملات التي يتم تنفيذها. يقرر الإجماع بين الأقران إدراج المعاملات وحالة الشبكة.

### شبكة Ethereum الرئيسية {#ethereum-mainnet}

الشبكة الرئيسية هي البلوك تشين العامة الأساسية لإنتاج إيثريوم، حيث تتم المعاملات ذات القيمة الفعلية على دفتر الحسابات الموزع.

عندما يتحدث الناس والبورصات عن أسعار ETH، فإنهم يتحدثون عن ETH الشبكة الرئيسية.

### شبكات اختبار Ethereum {#ethereum-testnets}

بالإضافة إلى الشبكة الرئيسية، هناك شبكات اختبار عامة. هذه شبكات يستخدمها مطورو البروتوكولات أو مطورو العقود الذكية لاختبار كل من ترقيات البروتوكولات والعقود الذكية المحتملة في بيئة شبيهة بالبيئة الفعلية قبل نشرها على الشبكة الرئيسية. فكِّر في هذا كأنه مشابه للخوادم الإنتاجية مقابل خوادم الاختبار.

يجب عليك اختبار أي كود عقد تكتبه على شبكة الاختبار قبل نشره على الشبكة الرئيسية. من بين التطبيقات اللامركزية التي تتكامل مع العقود الذكية الحالية، تم نشر نسخ من معظم المشاريع على شبكات الاختبار.

بدأت معظم شبكات الاختبار باستخدام آلية توافق الآراء المصرح بها لإثبات السلطة. وهذا يعني أنه يتم اختيار عدد صغير من العقد للتحقق من صحة المعاملات وإنشاء كتل جديدة – مع المراهنة على هويتهم في هذه العملية. بدلاً من ذلك، تتميز بعض شبكات الاختبار بآلية إجماع مفتوحة لإثبات الحصة حيث يمكن للجميع اختبار تشغيل أداة التحقق، تمامًا مثل شبكة إيثريوم الرئيسية.

من المفترض أن ETH على شبكات الاختبار ليس لها قيمة حقيقية؛ ومع ذلك، فقد تم إنشاء أسواق لأنواع معينة من ETH على شبكات الاختبار التي أصبحت نادرة أو يصعب الحصول عليها. نظرًا لأنك تحتاج إلى ETH للتفاعل فعليًا مع Ethereum (حتى على شبكات الاختبار)، يحصل معظم الأشخاص على ETH لشبكات الاختبار مجانًا من الصنابير. معظم الصنابير هي تطبيقات ويب حيث يمكنك إدخال عنوان تريد إرسال ETH إليه.

#### أي شبكة اختبارية يجب أن أستخدم؟

الشبكتان التجريبيتان العامتان اللتان يقوم مطورو العملاء بصيانتها حاليًا هما Sepolia و Hoodi. Sepolia هي شبكة لمطوري العقود والتطبيقات لاختبار تطبيقاتهم. تتيح شبكة Hoodi لمطوري البروتوكولات اختبار ترقيات الشبكة، وتتيح للمشاركين اختبار تشغيل برنامج المدقق.

#### Sepolia {#sepolia}

**Sepolia هي شبكة الاختبار الافتراضية الموصى بها لتطوير التطبيقات**. تستخدم شبكة Sepolia مجموعة من برامج المدققين المصرح لهم والتي تتحكم بها فرق العميل والاختبار.

##### الموارد

- [الموقع الإلكتروني](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### صنابير

- [صنبور Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [صنبور Chain Platform Sepolia](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [صنبور Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [صنبور النظام البيئي لـ Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [صنبور ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [صنبور Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [صنبور Infura Sepolia](https://www.infura.io/faucet)
- [صنبور PoW](https://sepolia-faucet.pk910.de/)
- [صنبور QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi هي شبكة اختبار للتحقق من الصحة والمشاركة. شبكة Hoodi مفتوحة للمستخدمين الراغبين في تشغيل برنامج المدقق في الشبكة التجريبية. لذلك، يجب على المشاركين الذين يرغبون في اختبار تحديثات البروتوكول قبل نشرها على الشبكة الرئيسية استخدام Hoodi.

- مجموعة المدققين المفتوحة، يمكن للمشاركين اختبار ترقيات الشبكة
- حالة كبيرة، مفيدة لاختبار تفاعلات العقود الذكية المعقدة
- تستغرق وقتًا أطول للمزامنة وتتطلب مساحة تخزين أكبر لتشغيل عقدة

##### الموارد

- [الموقع الإلكتروني](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [المستكشف](https://explorer.hoodi.ethpandaops.io/)
- [مزامنة نقطة التحقق](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### صنابير

- [صنبور Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [صنبور Hoodi](https://hoodi.ethpandaops.io/)
- [صنبور PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

الزوال هو نوع فريد من شبكات الاختبار التي يتم إعادة ضبطها بالكامل كل شهر. تعود حالة التنفيذ والتوافق إلى البداية كل 28 يومًا، مما يعني أن أي شيء يحدث على شبكة الاختبار هو أمر مؤقت. وهذا يجعله مثالياً للاختبارات قصيرة المدى، وتشغيل العقد السريع، وتطبيقات من نوع ”hello world“ التي لا تحتاج إلى ديمومة.

- حالة جديدة دائمًا، اختبار قصير المدى للمصادقين والتطبيقات
- تشمل فقط مجموعة العقود الأساسية
- مجموعة أدوات التحقق المفتوحة وسهولة الوصول إلى مبالغ كبيرة من الأموال
- أصغر متطلبات للعقدة وأسرع مزامنة، أقل من &lt;5 جيجابايت في المتوسط

##### الموارد

- [الموقع الإلكتروني](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [دردشة المجتمع](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [مستكشف Beacon](https://beaconlight.ephemery.dev/)
- [مزامنة نقطة التحقق](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### صنابير

- [صنبور Bordel](https://faucet.bordel.wtf/)
- [صنبور Pk910 PoW](https://ephemery-faucet.pk910.de/)

#### Holesky (مهمل) {#holesky}

شبكة الاختبار Holesky مُهملة اعتبارًا من سبتمبر 2025. يجب على مشغلي المراهنة ومزودي البنية التحتية استخدام Hoodi لاختبار المصادقة بدلاً من ذلك.

- [إعلان إيقاف شبكة الاختبار Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _مدونة EF، 1 سبتمبر 2025_
- [تحديثات شبكتي الاختبار Holesky وHoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _مدونة EF، 18 مارس 2025_

### شبكات اختبار الطبقة 2 {#layer-2-testnets}

[الطبقة الثانية (L2)](/layer-2/) هي مصطلح جماعي لوصف مجموعة محددة من حلول توسيع نطاق Ethereum. A layer 2 is a separate blockchain that extends Ethereum and inherits the security guarantees of Ethereum. Layer 2 testnets are usually tightly coupled to public Ethereum testnets.

#### Arbitrum Sepolia {#arbitrum-sepolia}

شبكة اختبار لـ [Arbitrum](https://arbitrum.io/)

##### الموارد

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### صنابير

- [صنبور Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [صنبور Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [صنبور ethfaucet.com Arbitrum Sepolia](https://ethfaucet.com/networks/arbitrum)
- [صنبور QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

شبكة اختبار لـ [Optimism](https://www.optimism.io/)

##### الموارد

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### صنابير

- [صنبور Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [صنبور Chainlink](https://faucets.chain.link/optimism-sepolia)
- [صنبور ethfaucet.com Optimism Sepolia](https://ethfaucet.com/networks/optimism)
- [صنبور شبكة الاختبار](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

شبكة اختبار لـ [Starknet](https://www.starknet.io)

##### الموارد

- [Starkscan](https://sepolia.starkscan.co/)

##### صنابير

- [صنبور Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [صنبور Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [صنبور Starknet](https://starknet-faucet.vercel.app/)

## الشبكات الخاصة {#private-networks}

تكون شبكة Ethereum شبكة خاصة إذا لم تكن عقدها متصلة بشبكة عامة (أي، الشبكة الرئيسية أو شبكة اختبار). In this context, private only means reserved or isolated, rather than protected or secure.

### شبكات التطوير {#development-networks}

To develop an Ethereum application, you'll want to run it on a private network to see how it works before deploying it. Similar to how you create a local server on your computer for web development, you can create a local blockchain instance to test your dapp. This allows for much faster iteration than a public testnet.

There are projects and tools dedicated to assist with this. تعرّف على المزيد حول [شبكات التطوير](/developers/docs/development-networks/)

### شبكات الاتحاد {#consortium-networks}

The consensus process is controlled by a pre-defined set of nodes that are trusted. For example, a private network of known academic institutions that each govern a single node, and blocks are validated by a threshold of signatories within the network.

If a public Ethereum network is like the public internet, a consortium network is like a private intranet.

## <Emoji text="🚉" /> لماذا تتم تسمية شبكات اختبار Ethereum على اسم محطات المترو؟ {#why-naming}

تمت تسمية العديد من شبكات اختبار Ethereum على اسم محطات مترو أو قطار حقيقية. بدأ تقليد التسمية هذا مبكرًا ويعكس المدن العالمية التي عاش فيها المساهمون أو عملوا فيها. إنه أمر رمزي وعملي ويسهل تذكره. تمامًا كما أن شبكات الاختبار معزولة عن شبكة Ethereum الرئيسية، تعمل خطوط المترو بشكل منفصل عن حركة المرور السطحية.

### <Emoji text="🚧" /> شبكات الاختبار الشائعة والقديمة {#common-and-legacy-testnets}

- **Sepolia** - حي متصل بالمترو في أثينا، اليونان. تستخدم حاليًا لاختبار العقود الذكية والتطبيقات اللامركزية (dApps).
- **Hoodi** - تمت تسميته على اسم محطة مترو Hoodi في بنغالورو، الهند. تستخدم لاختبار برنامج المدقق وترقية البروتوكول.
- **Goerli** _(مهمل)_ - تمت تسميته على اسم محطة Görlitzer Bahnhof في برلين، ألمانيا.
- **Rinkeby** _(مهمل)_ - تمت تسميته على اسم إحدى ضواحي ستوكهولم التي بها محطة مترو.
- **Ropsten** _(مهمل)_ - يشير إلى منطقة ومحطة عبّارات/مترو سابقة في ستوكهولم.
- **Kovan** _(مهمل)_ - تمت تسميته على اسم إحدى محطات مترو الأنفاق السريع (MRT) في سنغافورة.
- **Morden** _(مهمل)_ - تمت تسميته على اسم إحدى محطات مترو أنفاق لندن. أول شبكة اختبار عامة لـ Ethereum.

### <Emoji text="🧪" /> شبكات اختبار متخصصة أخرى {#other-testnets}

تم إنشاء بعض شبكات الاختبار للاختبار قصير المدى أو الخاص بالترقية وهي ليست بالضرورة ذات طابع متعلق بالمترو:

- **Holesky** _(مهمل)_ - تمت تسميته على اسم محطة Holešovice في براغ. تستخدم لاختبار برنامج المدقق؛ أُهملت في عام 2025.
- **Kiln**، و**Zhejiang**، و**Shandong**، و**Prater**، و**Pyrmont**، و**Olympic** _(جميعها مهملة)_ و**Ephemery** - تم تصميمها خصيصًا لمحاكاة الترقية مثل The Merge وShanghai أو تجارب برنامج المدقق. بعض الأسماء إقليمية أو موضوعية وليست قائمة على المترو.

يساعد استخدام أسماء محطات المترو المطورين على تحديد شبكات الاختبار وتذكرها بسرعة دون الحاجة إلى الاعتماد على معرفات السلسلة الرقمية. كما أنه يعكس ثقافة Ethereum: عملية وعالمية ومتمحورة حول الإنسان.

## أدوات ذات صلة {#related-tools}

- [Chainlist](https://chainlist.org/) _قائمة بشبكات EVM لربط المحافظ والمزودين بمعرف السلسلة (Chain ID) ومعرف الشبكة (Network ID) المناسبين_
- [سلاسل مبنية على EVM](https://github.com/ethereum-lists/chains) _مستودع GitHub للبيانات الوصفية للسلسلة التي تشغل Chainlist_

## قراءة إضافية {#further-reading}

- [اقتراح: دورة حياة يمكن التنبؤ بها لشبكة اختبار Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [تطور شبكات اختبار Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
