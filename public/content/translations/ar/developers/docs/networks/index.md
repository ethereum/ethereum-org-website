---
title: "الشبكات"
description: "نظرة عامة على شبكات إيثريوم ومكان الحصول على إيثر (ETH) شبكة الاختبار لاختبار تطبيقك."
lang: ar
---

شبكات [إيثريوم](/) هي مجموعات من أجهزة الكمبيوتر المتصلة التي تتواصل باستخدام بروتوكول إيثريوم. لا توجد سوى الشبكة الرئيسية (Mainnet) واحدة لإيثريوم، ولكن يمكن إنشاء شبكات مستقلة تتوافق مع نفس قواعد البروتوكول لأغراض الاختبار والتطوير. هناك العديد من "الشبكات" المستقلة التي تتوافق مع البروتوكول دون التفاعل مع بعضها البعض. يمكنك حتى بدء واحدة محليًا على جهاز الكمبيوتر الخاص بك لاختبار العقود الذكية وتطبيقات ويب 3.

سيعمل حساب إيثريوم الخاص بك عبر الشبكات المختلفة، ولكن رصيد حسابك وسجل المعاملات لن ينتقل من شبكة إيثريوم الرئيسية. لأغراض الاختبار، من المفيد معرفة الشبكات المتاحة وكيفية الحصول على ETH شبكة الاختبار للتجربة. بشكل عام، ولاعتبارات أمنية، لا يُنصح بإعادة استخدام حسابات الشبكة الرئيسية على شبكات الاختبار أو العكس.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم [أساسيات إيثريوم](/developers/docs/intro-to-ethereum/) قبل القراءة عن الشبكات المختلفة، حيث ستمنحك شبكات الاختبار نسخة رخيصة وآمنة من إيثريوم للتجربة.

## الشبكات العامة {#public-networks}

الشبكات العامة يمكن لأي شخص في العالم لديه اتصال بالإنترنت الوصول إليها. يمكن لأي شخص قراءة أو إنشاء المعاملات على البلوك تشين العام والتحقق من صحة المعاملات التي يتم تنفيذها. يقرر الإجماع بين الأقران إدراج المعاملات وحالة الشبكة.

### شبكة إيثريوم الرئيسية (Mainnet) {#ethereum-mainnet}

الشبكة الرئيسية هي البلوك تشين العام الأساسي لإنتاج إيثريوم، حيث تحدث المعاملات ذات القيمة الفعلية على دفتر الحسابات الموزع.

عندما يناقش الأشخاص ومنصات التداول أسعار ETH، فإنهم يتحدثون عن ETH على الشبكة الرئيسية.

### شبكات اختبار إيثريوم {#ethereum-testnets}

بالإضافة إلى الشبكة الرئيسية، هناك شبكات اختبار عامة. هذه هي الشبكات التي يستخدمها مطورو البروتوكول أو مطورو العقود الذكية لاختبار كل من ترقيات البروتوكول وكذلك العقود الذكية المحتملة في بيئة شبيهة بالإنتاج قبل النشر على الشبكة الرئيسية. فكر في هذا كتمثيل لخوادم الإنتاج مقابل خوادم التجهيز (staging).

يجب عليك اختبار أي كود عقد تكتبه على شبكة الاختبار قبل نشره على الشبكة الرئيسية. من بين التطبيقات اللامركزية التي تتكامل مع العقود الذكية الحالية، تمتلك معظم المشاريع نسخًا منشورة على شبكات الاختبار.

بدأت معظم شبكات الاختبار باستخدام آلية الإجماع القائمة على إثبات السلطة (proof-of-authority) المصرح بها. هذا يعني أنه يتم اختيار عدد صغير من العقد للتحقق من صحة المعاملات وإنشاء كتل جديدة – مع تحصيص هويتهم في هذه العملية. بدلاً من ذلك، تتميز بعض شبكات الاختبار بآلية الإجماع المفتوحة إثبات الحصة حيث يمكن للجميع اختبار تشغيل مُدقِّق، تمامًا مثل شبكة إيثريوم الرئيسية.

من المفترض ألا يكون لـ ETH على شبكات الاختبار أي قيمة حقيقية؛ ومع ذلك، تم إنشاء أسواق لأنواع معينة من ETH شبكة الاختبار التي أصبحت نادرة أو يصعب الحصول عليها. نظرًا لأنك تحتاج إلى ETH للتفاعل فعليًا مع إيثريوم (حتى على شبكات الاختبار)، يحصل معظم الأشخاص على ETH شبكة الاختبار مجانًا من الصنابير. معظم الصنابير عبارة عن تطبيقات ويب حيث يمكنك إدخال عنوان تطلب إرسال ETH إليه.

#### أي شبكة اختبار يجب أن أستخدم؟

شبكتا الاختبار العامتان اللتان يقوم مطورو العملاء بصيانتهما حاليًا هما Sepolia و Hoodi. شبكة Sepolia هي شبكة لمطوري العقود والتطبيقات لاختبار تطبيقاتهم. تتيح شبكة Hoodi لمطوري البروتوكول اختبار ترقيات الشبكة، وتتيح للمساهمين اختبار تشغيل المدقّقين.

#### Sepolia {#sepolia}

**Sepolia هي شبكة الاختبار الافتراضية الموصى بها لتطوير التطبيقات**. تستخدم شبكة Sepolia مجموعة مدقّقين مصرح بها يتحكم فيها فرق العملاء والاختبار.

##### الموارد

- [الموقع الإلكتروني](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### الصنابير

- [صنبور Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia)
- [صنبور Chain Platform Sepolia](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [صنبور Chainstack Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [صنبور Ethereum Ecosystem](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [صنبور ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [صنبور Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [صنبور Infura Sepolia](https://www.infura.io/faucet)
- [صنبور PoW](https://sepolia-faucet.pk910.de/)
- [صنبور QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi هي شبكة اختبار لاختبار التحقق والتحصيص. شبكة Hoodi مفتوحة للمستخدمين الذين يرغبون في تشغيل مُدقِّق شبكة الاختبار. لذلك يجب على المساهمين الذين يرغبون في اختبار ترقيات البروتوكول قبل نشرها على الشبكة الرئيسية استخدام Hoodi.

- مجموعة مدقّقين مفتوحة، يمكن للمساهمين اختبار ترقيات الشبكة
- حالة كبيرة، مفيدة لاختبار تفاعلات العقود الذكية المعقدة
- تستغرق وقتًا أطول للمزامنة وتتطلب مساحة تخزين أكبر لتشغيل عقدة

##### الموارد

- [الموقع الإلكتروني](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [المستكشف](https://explorer.hoodi.ethpandaops.io/)
- [مزامنة نقطة التحقق (Checkpoint Sync)](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### الصنابير

- [صنبور Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [صنبور Hoodi](https://hoodi.ethpandaops.io/)
- [صنبور PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery هي نوع فريد من شبكات الاختبار التي يتم إعادة تعيينها بالكامل كل شهر. تعود حالة التنفيذ والإجماع إلى التكوين (genesis) كل 28 يومًا، مما يعني أن أي شيء يحدث على شبكة الاختبار يكون مؤقتًا. هذا يجعلها مثالية للاختبار قصير المدى، والتمهيد السريع للعقدة، وتطبيقات من نوع 'hello world' التي لا تحتاج إلى الدوام.

- حالة جديدة دائمًا، اختبار قصير المدى للمدقّقين والتطبيقات
- تتضمن فقط مجموعة أساسية من العقود
- مجموعة مدقّقين مفتوحة وسهولة الوصول إلى مبالغ كبيرة من الأموال
- أقل متطلبات للعقدة وأسرع مزامنة، أقل من 5 جيجابايت في المتوسط

##### الموارد

- [الموقع الإلكتروني](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [دردشة المجتمع](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [مستكشف Beacon](https://beaconlight.ephemery.dev/)
- [مزامنة نقطة التحقق (Checkpoint Sync)](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### الصنابير

- [صنبور Bordel](https://faucet.bordel.wtf/)
- [صنبور Pk910 PoW](https://ephemery-faucet.pk910.de/)

#### Holesky (مهملة) {#holesky}

تم إهمال شبكة الاختبار Holesky اعتبارًا من سبتمبر 2025. يجب على مشغلي التحصيص ومقدمي البنية التحتية استخدام Hoodi لاختبار المُدقِّق بدلاً من ذلك.

- [إعلان إغلاق شبكة الاختبار Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _مدونة مؤسسة إيثريوم، 1 سبتمبر 2025_
- [تحديثات شبكة الاختبار Holesky و Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _مدونة مؤسسة إيثريوم، 18 مارس 2025_

### شبكات اختبار الطبقة الثانية {#layer-2-testnets}

[الطبقة الثانية (L2)](/layer-2/) هو مصطلح جماعي لوصف مجموعة محددة من حلول قابلية التوسّع لإيثريوم. الطبقة الثانية هي بلوك تشين منفصل يوسع إيثريوم ويرث الضمانات الأمنية لإيثريوم. عادة ما تكون شبكات اختبار الطبقة الثانية مرتبطة ارتباطًا وثيقًا بشبكات اختبار إيثريوم العامة.

#### Arbitrum Sepolia {#arbitrum-sepolia}

شبكة اختبار لـ [Arbitrum](https://arbitrum.io/).

##### الموارد

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### الصنابير

- [صنبور Alchemy Arbitrum Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [صنبور Chainlink Arbitrum Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [صنبور ethfaucet.com Arbitrum Sepolia](https://ethfaucet.com/networks/arbitrum)
- [صنبور QuickNode Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

شبكة اختبار لـ [Optimism](https://www.optimism.io/).

##### الموارد

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### الصنابير

- [صنبور Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [صنبور Chainlink](https://faucets.chain.link/optimism-sepolia)
- [صنبور ethfaucet.com Optimism Sepolia](https://ethfaucet.com/networks/optimism)
- [صنبور شبكة الاختبار](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

شبكة اختبار لـ [Starknet](https://www.starknet.io).

##### الموارد

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### الصنابير

- [صنبور Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [صنبور Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [صنبور Starknet](https://starknet-faucet.vercel.app/)

## الشبكات الخاصة {#private-networks}

تعتبر شبكة إيثريوم شبكة خاصة إذا لم تكن عقدها متصلة بشبكة عامة (أي الشبكة الرئيسية أو شبكة اختبار). في هذا السياق، تعني كلمة "خاصة" فقط أنها محجوزة أو معزولة، وليس محمية أو آمنة.

### شبكات التطوير {#development-networks}

لتطوير تطبيق إيثريوم، ستحتاج إلى تشغيله على شبكة خاصة لمعرفة كيف يعمل قبل نشره. على غرار كيفية إنشاء خادم محلي على جهاز الكمبيوتر الخاص بك لتطوير الويب، يمكنك إنشاء نسخة بلوك تشين محلية لاختبار تطبيق لامركزي (dapp) الخاص بك. يتيح ذلك تكرارًا أسرع بكثير من شبكة الاختبار العامة.

هناك مشاريع وأدوات مخصصة للمساعدة في ذلك. تعرف على المزيد حول [شبكات التطوير](/developers/docs/development-networks/).

### شبكات التحالف (Consortium) {#consortium-networks}

يتم التحكم في عملية الإجماع بواسطة مجموعة محددة مسبقًا من العقد الموثوقة. على سبيل المثال، شبكة خاصة من المؤسسات الأكاديمية المعروفة التي تدير كل منها عقدة واحدة، ويتم التحقق من صحة الكتل بواسطة حد أدنى من الموقعين داخل الشبكة.

إذا كانت شبكة إيثريوم العامة تشبه الإنترنت العام، فإن شبكة التحالف تشبه شبكة الإنترانت الخاصة.

## <Emoji text="🚉" /> لماذا تُسمى شبكات اختبار إيثريوم بأسماء محطات المترو؟ {#why-naming}

تُسمى العديد من شبكات اختبار إيثريوم بأسماء محطات مترو أو قطارات في العالم الحقيقي. بدأ تقليد التسمية هذا مبكرًا ويعكس المدن العالمية التي عاش أو عمل فيها المساهمون. إنه رمزي، ولا يُنسى، وعملي. تمامًا كما أن شبكات الاختبار معزولة عن شبكة إيثريوم الرئيسية، تعمل خطوط المترو بشكل منفصل عن حركة المرور السطحية.

### <Emoji text="🚧" /> شبكات الاختبار الشائعة والقديمة {#common-and-legacy-testnets}

- **Sepolia** - حي مرتبط بالمترو في أثينا، اليونان. يُستخدم حاليًا لاختبار العقود الذكية والتطبيقات اللامركزية.
- **Hoodi** - سُميت على اسم محطة مترو Hoodi في بنغالورو، الهند. تُستخدم لاختبار المُدقِّق وترقيات البروتوكول.
- **Goerli** _(مهملة)_ - سُميت على اسم Görlitzer Bahnhof في برلين، ألمانيا.
- **Rinkeby** _(مهملة)_ - سُميت على اسم ضاحية في ستوكهولم بها محطة مترو.
- **Ropsten** _(مهملة)_ - تشير إلى منطقة ومحطة عبّارات/مترو سابقة في ستوكهولم.
- **Kovan** _(مهملة)_ - سُميت على اسم محطة مترو أنفاق سنغافورة (MRT).
- **Morden** _(مهملة)_ - سُميت على اسم محطة مترو أنفاق لندن. أول شبكة اختبار عامة لإيثريوم.

### <Emoji text="🧪" /> شبكات اختبار متخصصة أخرى {#other-testnets}

تم إنشاء بعض شبكات الاختبار لاختبارات قصيرة المدى أو خاصة بترقيات معينة وليست بالضرورة مستوحاة من المترو:

- **Holesky** _(مهملة)_ - سُميت على اسم محطة Holešovice في براغ. استُخدمت لاختبار المُدقِّق؛ تم إهمالها في عام 2025.
- **Kiln**، **Zhejiang**، **Shandong**، **Prater**، **Pyrmont**، **Olympic** _(جميعها مهملة)_ و **Ephemery** - صُممت خصيصًا لمحاكاة الترقيات مثل الدمج (The Merge)، أو Shanghai، أو تجارب المُدقِّق. بعض الأسماء إقليمية أو موضوعية بدلاً من أن تكون مبنية على المترو.

يساعد استخدام أسماء محطات المترو المطورين على التعرف بسرعة على شبكات الاختبار وتذكرها دون الحاجة إلى الاعتماد على معرفات السلسلة (chain IDs) الرقمية. كما أنه يعكس ثقافة إيثريوم: عملية، وعالمية، ومتمحورة حول الإنسان.

## أدوات ذات صلة {#related-tools}

- [Chainlist](https://chainlist.org/) _قائمة بشبكات آلة إيثريوم الافتراضية (EVM) لربط المحافظ ومقدمي الخدمات بمعرف السلسلة (Chain ID) ومعرف الشبكة (Network ID) المناسبين_
- [سلاسل مبنية على EVM](https://github.com/ethereum-lists/chains) _مستودع GitHub للبيانات الوصفية للسلسلة التي تشغل Chainlist_

## قراءة إضافية {#further-reading}

- [مقترح: دورة حياة يمكن التنبؤ بها لشبكة اختبار إيثريوم](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [تطور شبكات اختبار إيثريوم](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)