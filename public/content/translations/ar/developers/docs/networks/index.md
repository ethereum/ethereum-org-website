---
title: "الشبكات"
description: "نظرة عامة على شبكات إيثيريوم ومكان الحصول على إيثر (⁦ETH⁩) لشبكة الاختبار لاختبار تطبيقك."
lang: ar
---

شبكات [إيثيريوم](/) هي مجموعات من أجهزة الكمبيوتر المتصلة التي تتواصل باستخدام بروتوكول إيثيريوم. توجد شبكة إيثيريوم رئيسية واحدة فقط، ولكن يمكن إنشاء شبكات مستقلة تتوافق مع نفس قواعد البروتوكول لأغراض الاختبار والتطوير. هناك العديد من "الشبكات" المستقلة التي تتوافق مع البروتوكول دون التفاعل مع بعضها البعض. يمكنك حتى بدء واحدة محليًا على جهاز الكمبيوتر الخاص بك لاختبار عقودك الذكية وتطبيقات <span dir="ltr">Web3</span>.

سيعمل حساب إيثيريوم الخاص بك عبر الشبكات المختلفة، ولكن رصيد حسابك وسجل المعاملات لن ينتقل من شبكة إيثيريوم الرئيسية. لأغراض الاختبار، من المفيد معرفة الشبكات المتاحة وكيفية الحصول على <span dir="ltr">ETH</span> لشبكة الاختبار للتجربة. بشكل عام، ولاعتبارات أمنية، لا يُنصح بإعادة استخدام حسابات الشبكة الرئيسية على شبكات الاختبار أو العكس.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم [أساسيات إيثيريوم](/developers/docs/intro-to-ethereum/) قبل القراءة عن الشبكات المختلفة، حيث ستمنحك شبكات الاختبار نسخة رخيصة وآمنة من إيثيريوم للتجربة.

## الشبكات العامة {#public-networks}

يمكن لأي شخص في العالم لديه اتصال بالإنترنت الوصول إلى الشبكات العامة. يمكن لأي شخص قراءة أو إنشاء معاملات على سلسلة الكتل العامة والتحقق من صحة المعاملات التي يتم تنفيذها. يقرر الإجماع بين الأقران إدراج المعاملات وحالة الشبكة.

### شبكة إيثيريوم الرئيسية {#ethereum-mainnet}

الشبكة الرئيسية هي سلسلة الكتل الإنتاجية العامة الأساسية لإيثيريوم، حيث تحدث المعاملات ذات القيمة الفعلية على دفتر الأستاذ الموزع.

عندما يناقش الأشخاص والبورصات أسعار <span dir="ltr">ETH</span>، فإنهم يتحدثون عن <span dir="ltr">ETH</span> على الشبكة الرئيسية.

### شبكات اختبار إيثيريوم {#ethereum-testnets}

بالإضافة إلى الشبكة الرئيسية، هناك شبكات اختبار عامة. هذه هي الشبكات التي يستخدمها مطورو البروتوكول أو مطورو العقود الذكية لاختبار كل من ترقيات البروتوكول بالإضافة إلى العقود الذكية المحتملة في بيئة تشبه الإنتاج قبل النشر على الشبكة الرئيسية. فكر في هذا على أنه نظير لخوادم الإنتاج مقابل خوادم التجهيز.

يجب عليك اختبار أي كود عقد تكتبه على شبكة اختبار قبل نشره على الشبكة الرئيسية. من بين التطبيقات اللامركزية (<span dir="ltr">dapps</span>) التي تتكامل مع العقود الذكية الحالية، تمتلك معظم المشاريع نسخًا منشورة على شبكات الاختبار.

بدأت معظم شبكات الاختبار باستخدام آلية إجماع إثبات السلطة المصرح بها. هذا يعني أنه يتم اختيار عدد صغير من العقد للتحقق من صحة المعاملات وإنشاء كتل جديدة - مع تخزين هويتهم في هذه العملية. بدلاً من ذلك، تتميز بعض شبكات الاختبار بآلية إجماع إثبات الحصة (<span dir="ltr">PoS</span>) المفتوحة حيث يمكن للجميع اختبار تشغيل مُدَقِّق، تمامًا مثل شبكة إيثيريوم الرئيسية.

من المفترض ألا يكون لـ <span dir="ltr">ETH</span> على شبكات الاختبار أي قيمة حقيقية؛ ومع ذلك، تم إنشاء أسواق لأنواع معينة من <span dir="ltr">ETH</span> لشبكة الاختبار التي أصبحت نادرة أو يصعب الحصول عليها. نظرًا لأنك تحتاج إلى <span dir="ltr">ETH</span> للتفاعل فعليًا مع إيثيريوم (حتى على شبكات الاختبار)، يحصل معظم الأشخاص على <span dir="ltr">ETH</span> لشبكة الاختبار مجانًا من الصنابير. معظم الصنابير عبارة عن تطبيقات ويب حيث يمكنك إدخال عنوان تطلب إرسال <span dir="ltr">ETH</span> إليه.

#### أي شبكة اختبار يجب أن أستخدم؟ {#which-testnet-should-i-use}

شبكتا الاختبار العامتان اللتان يحتفظ بهما مطورو العملاء حاليًا هما Sepolia و Hoodi. Sepolia هي شبكة لمطوري العقود والتطبيقات لاختبار تطبيقاتهم. تتيح شبكة Hoodi لمطوري البروتوكول اختبار ترقيات الشبكة، وتتيح للمخزنين اختبار تشغيل المُدَقِّقين.

#### Sepolia {#sepolia}

**Sepolia هي شبكة الاختبار الافتراضية الموصى بها لتطوير التطبيقات**. تستخدم شبكة Sepolia مجموعة مُدَقِّقين مصرح بها تتحكم فيها فرق العملاء والاختبار.

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
- [صنبور نظام إيثيريوم البيئي](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [صنبور ethfaucet.com Sepolia](https://ethfaucet.com/networks/ethereum)
- [صنبور Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [صنبور Infura Sepolia](https://www.infura.io/faucet)
- [صنبور PoW](https://sepolia-faucet.pk910.de/)
- [صنبور QuickNode Sepolia](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi هي شبكة اختبار لاختبار التحقق والتخزين. شبكة Hoodi مفتوحة للمستخدمين الذين يرغبون في تشغيل مُدَقِّق شبكة اختبار. لذلك يجب على المخزنين الذين يرغبون في اختبار ترقيات البروتوكول قبل نشرها على الشبكة الرئيسية استخدام Hoodi.

- مجموعة مُدَقِّقين مفتوحة، يمكن للمخزنين اختبار ترقيات الشبكة
- حالة كبيرة، مفيدة لاختبار تفاعلات العقود الذكية المعقدة
- تستغرق وقتًا أطول في المزامنة وتتطلب مساحة تخزين أكبر لتشغيل عقدة

##### الموارد

- [الموقع الإلكتروني](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [المستكشف](https://explorer.hoodi.ethpandaops.io/)
- [مزامنة نقطة فحص](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### الصنابير

- [صنبور Chain Platform Hoodi](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [صنبور Hoodi](https://hoodi.ethpandaops.io/)
- [صنبور PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery هي نوع فريد من شبكات الاختبار التي تتم إعادة تعيينها بالكامل كل شهر. تعود حالة التنفيذ والإجماع إلى التكوين (<span dir="ltr">genesis</span>) كل <span dir="ltr">28</span> يومًا، مما يعني أن أي شيء يحدث على شبكة الاختبار يكون مؤقتًا. هذا يجعلها مثالية للاختبار قصير المدى، والتمهيد السريع للعقدة، وتطبيقات من نوع '<span dir="ltr">hello world</span>' التي لا تحتاج إلى الدوام.

- حالة جديدة دائمًا، اختبار قصير المدى للمُدَقِّقين والتطبيقات
- تتضمن فقط مجموعة أساسية من العقود
- مجموعة مُدَقِّقين مفتوحة وسهولة الوصول إلى مبالغ كبيرة من الأموال
- أقل متطلبات للعقدة وأسرع مزامنة، <span dir="ltr">&lt;5GB</span> في المتوسط

##### الموارد

- [الموقع الإلكتروني](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [دردشة المجتمع](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [مستكشف Beacon](https://beaconlight.ephemery.dev/)
- [مزامنة نقطة فحص](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### الصنابير {#faucets}

- [صنبور Bordel](https://faucet.bordel.wtf/)
- [صنبور Pk910 PoW](https://ephemery-faucet.pk910.de/)

#### هوليسكي (مهملة) {#holesky}

تم إهمال شبكة اختبار هوليسكي اعتبارًا من سبتمبر <span dir="ltr">2025</span>. يجب على مشغلي التخزين وموفري البنية التحتية استخدام Hoodi لاختبار المُدَقِّق بدلاً من ذلك.

- [إعلان إغلاق شبكة اختبار هوليسكي](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _مدونة مؤسسة إيثيريوم (EF)، <span dir="ltr">1-September-2025</span>_
- [تحديثات شبكة اختبار هوليسكي و Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _<span dir="ltr">EF Blog</span>, <span dir="ltr">18-March-2025</span>_

### شبكات اختبار الطبقة 2 {#layer-2-testnets}

[طبقة 2 (L2)](/layer-2/) هو مصطلح جماعي لوصف مجموعة محددة من حلول توسيع إيثيريوم. الطبقة 2 هي سلسلة كتل منفصلة توسع إيثيريوم وترث الضمانات الأمنية لإيثيريوم. عادةً ما تكون شبكات اختبار الطبقة 2 مرتبطة ارتباطًا وثيقًا بشبكات اختبار إيثيريوم العامة.

#### أربيتروم Sepolia {#arbitrum-sepolia}

شبكة اختبار لـ [أربيتروم](https://arbitrum.io/).

##### الموارد

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### الصنابير

- [صنبور Alchemy أربيتروم Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [صنبور تشين لينك أربيتروم Sepolia](https://faucets.chain.link/arbitrum-sepolia)
- [صنبور ethfaucet.com أربيتروم Sepolia](https://ethfaucet.com/networks/arbitrum)
- [صنبور QuickNode أربيتروم Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

#### أوبتيميزم Sepolia {#optimistic-sepolia}

شبكة اختبار لـ [أوبتيميزم](https://www.optimism.io/).

##### الموارد

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### الصنابير

- [صنبور Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [صنبور تشين لينك](https://faucets.chain.link/optimism-sepolia)
- [صنبور ethfaucet.com أوبتيميزم Sepolia](https://ethfaucet.com/networks/optimism)
- [صنبور شبكة الاختبار](https://docs.optimism.io/builders/tools/build/faucets)

#### ستارك نت Sepolia {#starknet-sepolia}

شبكة اختبار لـ [ستارك نت](https://www.starknet.io).

##### الموارد

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### الصنابير

- [صنبور Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [صنبور Blast ستارك نت Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [صنبور ستارك نت](https://starknet-faucet.vercel.app/)

## الشبكات الخاصة {#private-networks}

تعتبر شبكة إيثيريوم شبكة خاصة إذا لم تكن عقدها متصلة بشبكة عامة (أي الشبكة الرئيسية أو شبكة اختبار). في هذا السياق، تعني كلمة "خاصة" فقط أنها محجوزة أو معزولة، وليس محمية أو آمنة.

### شبكات التطوير {#development-networks}

لتطوير تطبيق إيثيريوم، ستحتاج إلى تشغيله على شبكة خاصة لمعرفة كيف يعمل قبل نشره. على غرار كيفية إنشاء خادم محلي على جهاز الكمبيوتر الخاص بك لتطوير الويب، يمكنك إنشاء مثيل سلسلة كتل محلي لاختبار تطبيقك اللامركزي (<span dir="ltr">dapp</span>). يسمح هذا بتكرار أسرع بكثير من شبكة الاختبار العامة.

هناك مشاريع وأدوات مخصصة للمساعدة في ذلك. تعرف على المزيد حول [شبكات التطوير](/developers/docs/development-networks/).

### شبكات التحالف (Consortium) {#consortium-networks}

يتم التحكم في عملية الإجماع بواسطة مجموعة محددة مسبقًا من العقد الموثوقة. على سبيل المثال، شبكة خاصة من المؤسسات الأكاديمية المعروفة التي تدير كل منها عقدة واحدة، ويتم التحقق من صحة الكتل بواسطة حد أدنى من الموقعين داخل الشبكة.

إذا كانت شبكة إيثيريوم العامة تشبه الإنترنت العام، فإن شبكة التحالف تشبه شبكة الإنترانت الخاصة.

## <Emoji text="🚉" /> لماذا تمت تسمية شبكات اختبار إيثيريوم بأسماء محطات المترو؟ {#why-naming}

تمت تسمية العديد من شبكات اختبار إيثيريوم بأسماء محطات مترو أو قطار في العالم الحقيقي. بدأ تقليد التسمية هذا مبكرًا ويعكس المدن العالمية التي عاش أو عمل فيها المساهمون. إنه رمزي، ولا يُنسى، وعملي. تمامًا كما أن شبكات الاختبار معزولة عن شبكة إيثيريوم الرئيسية، تعمل خطوط المترو بشكل منفصل عن حركة المرور السطحية.

### <Emoji text="🚧" /> شبكات الاختبار الشائعة الاستخدام والقديمة {#common-and-legacy-testnets}

- **Sepolia** - حي مرتبط بالمترو في أثينا، اليونان. تُستخدم حاليًا لاختبار العقود الذكية والتطبيقات اللامركزية (<span dir="ltr">dApps</span>).
- **Hoodi** - سُميت على اسم محطة مترو Hoodi في بنغالورو، الهند. تُستخدم لاختبار المُدَقِّق وترقيات البروتوكول.
- **غويرلي** _(مهملة)_ - سُميت على اسم محطة Görlitzer Bahnhof في برلين، ألمانيا.
- **Rinkeby** _(مهملة)_ - سُميت على اسم ضاحية في ستوكهولم بها محطة مترو.
- **روبستن** _(مهملة)_ - تشير إلى منطقة ومحطة عبّارات/مترو سابقة في ستوكهولم.
- **Kovan** _(مهملة)_ - سُميت على اسم محطة مترو أنفاق في سنغافورة.
- **Morden** _(مهملة)_ - سُميت على اسم محطة مترو أنفاق في لندن. أول شبكة اختبار عامة لإيثيريوم.

### <Emoji text="🧪" /> شبكات اختبار متخصصة أخرى {#other-testnets}

تم إنشاء بعض شبكات الاختبار لاختبارات قصيرة المدى أو خاصة بترقيات معينة وليست بالضرورة مستوحاة من المترو:

- **هوليسكي** _(مهملة)_ - سُميت على اسم محطة Holešovice في براغ. استُخدمت لاختبار المُدَقِّق؛ وتم إهمالها في عام <span dir="ltr">2025</span>.
- **Kiln**، و **Zhejiang**، و **Shandong**، و **Prater**، و **Pyrmont**، و **Olympic** _(جميعها مهملة)_ و **Ephemery** - صُممت خصيصًا لمحاكاة الترقيات مثل الدمج، أو شانغهاي، أو تجارب المُدَقِّقين. بعض الأسماء إقليمية أو موضوعية بدلاً من أن تكون مبنية على المترو.

يساعد استخدام أسماء محطات المترو المطورين على التعرف بسرعة على شبكات الاختبار وتذكرها دون الحاجة إلى الاعتماد على معرفات السلسلة (<span dir="ltr">Chain IDs</span>) الرقمية. كما أنه يعكس ثقافة إيثيريوم: عملية، وعالمية، ومتمحورة حول الإنسان.

## أدوات ذات صلة {#related-tools}

- [Chainlist](https://chainlist.org/) _قائمة بشبكات <span dir="ltr">EVM</span> لربط المحافظ ومقدمي الخدمات بمعرف السلسلة (<span dir="ltr">Chain ID</span>) ومعرف الشبكة (<span dir="ltr">Network ID</span>) المناسبين_
- [السلاسل القائمة على EVM](https://github.com/ethereum-lists/chains) _مستودع GitHub للبيانات الوصفية للسلسلة التي تشغل Chainlist_

## قراءة إضافية {#further-reading}

- [مقترح: دورة حياة يمكن التنبؤ بها لشبكة اختبار إيثيريوم](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [تطور شبكات اختبار إيثيريوم](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)