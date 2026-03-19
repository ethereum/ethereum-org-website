---
title: "مجالات البحث النشطة في إيثريوم"
description: "استكشف المجالات المختلفة للبحث المفتوح وتعرف على كيفية المشاركة."
lang: ar
---

# مجالات البحث النشطة في إيثريوم {#active-areas-of-ethereum-research}

تتمثل إحدى نقاط القوة الأساسية في إيثريوم في وجود مجتمع بحث وهندسة نشط يعمل على تحسينها باستمرار. يرغب العديد من الأشخاص المتحمسين والمهرة في جميع أنحاء العالم في تكريس أنفسهم للقضايا المعلقة في إيثريوم، ولكن ليس من السهل دائمًا معرفة ماهية هذه القضايا. توضح هذه الصفحة مجالات البحث النشطة الرئيسية كدليل تقريبي لأحدث التطورات في إيثريوم.

## كيف تعمل أبحاث إيثريوم {#how-ethereum-research-works}

تتميز أبحاث إيثريوم بكونها مفتوحة وشفافة، وتجسد مبادئ [العلم اللامركزي (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). تتمثل الثقافة في جعل أدوات ومخرجات البحث مفتوحة وتفاعلية قدر الإمكان، على سبيل المثال، من خلال دفاتر الملاحظات القابلة للتنفيذ. تتحرك أبحاث إيثريوم بسرعة، حيث يتم نشر النتائج الجديدة ومناقشتها علنًا في منتديات مثل [ethresear.ch](https://ethresear.ch/) بدلاً من الوصول إلى المجتمع من خلال المنشورات التقليدية بعد جولات من مراجعة الأقران.

## موارد البحث العامة {#general-research-resources}

بغض النظر عن الموضوع المحدد، هناك ثروة من المعلومات حول أبحاث إيثريوم يمكن العثور عليها في [ethresear.ch](https://ethresear.ch) وقناة [Eth R&D Discord](https://discord.gg/qGpsxSA). هذه هي الأماكن الأساسية التي يناقش فيها باحثو إيثريوم أحدث الأفكار وفرص التطوير.

يقدم هذا التقرير المنشور في مايو 2022 بواسطة [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) نظرة عامة جيدة على خريطة الطريق الخاصة بإيثريوم.

## مصادر التمويل {#sources-of-funding}

يمكنك المشاركة في أبحاث إيثريوم والحصول على أجر مقابل ذلك! على سبيل المثال، أدارت [مؤسسة إيثريوم](/foundation/) مؤخرًا [جولة تمويل المنح الأكاديمية](https://esp.ethereum.foundation/academic-grants). يمكنك العثور على معلومات حول فرص التمويل النشطة والقادمة على [صفحة منح إيثريوم](/community/grants/).

## أبحاث البروتوكول {#protocol-research}

تهتم أبحاث البروتوكول بالطبقة الأساسية لإيثريوم - وهي مجموعة القواعد التي تحدد كيفية اتصال العقد وتواصلها وتبادلها وتخزينها لبيانات إيثريوم والوصول إلى إجماع حول حالة البلوك تشين. تنقسم أبحاث البروتوكول إلى فئتين رئيسيتين: الإجماع والتنفيذ.

### الإجماع {#consensus}

تهتم أبحاث الإجماع بـ [آلية إثبات الحصة في إيثريوم](/developers/docs/consensus-mechanisms/pos/). بعض الأمثلة على موضوعات أبحاث الإجماع هي:

- تحديد الثغرات الأمنية وتصحيحها؛
- القياس الكمي للأمن الاقتصادي التشفيري؛
- زيادة أمان أو أداء تطبيقات العميل؛
- وتطوير العملاء الخفيفين.

بالإضافة إلى الأبحاث الاستشرافية، يتم البحث في بعض عمليات إعادة التصميم الأساسية للبروتوكول، مثل النهائية في خانة واحدة (single slot finality)، للسماح بإجراء تحسينات كبيرة على إيثريوم. علاوة على ذلك، تعد كفاءة وسلامة ومراقبة شبكات الند للند بين عملاء الإجماع من موضوعات البحث المهمة أيضًا.

#### قراءات أساسية {#background-reading}

- [مقدمة عن إثبات الحصة](/developers/docs/consensus-mechanisms/pos/)
- [ورقة Casper-FFG](https://arxiv.org/abs/1710.09437)
- [شرح Casper-FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [ورقة Gasper](https://arxiv.org/abs/2003.03052)

#### أبحاث حديثة {#recent-research}

- [إجماع Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [معضلة التوفر/النهائية](https://arxiv.org/abs/2009.04987)
- [النهائية في خانة واحدة](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [فصل المقترح عن الباني](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### التنفيذ {#execution}

تهتم طبقة التنفيذ بتنفيذ المعاملات، وتشغيل [آلة إيثريوم الافتراضية (EVM)](/developers/docs/evm/) وإنشاء حمولات التنفيذ لتمريرها إلى طبقة الإجماع. هناك العديد من مجالات البحث النشطة، بما في ذلك:

- بناء دعم للعملاء الخفيفين؛
- البحث في حد الغاز؛
- ودمج هياكل بيانات جديدة (مثل Verkle Tries).

#### قراءات أساسية {#background-reading-1}

- [مقدمة عن آلة إيثريوم الافتراضية (EVM)](/developers/docs/evm)
- [طبقة التنفيذ على Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### أبحاث حديثة {#recent-research-1}

- [تحسينات قاعدة البيانات](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [انتهاء صلاحية الحالة](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [مسارات انتهاء صلاحية الحالة](https://hackmd.io/@vbuterin/state_expiry_paths)
- [مقترح Verkle وانتهاء صلاحية الحالة](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [إدارة السجل](https://eips.ethereum.org/EIPS/eip-4444)
- [أشجار Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [أخذ عينات توفر البيانات](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## تطوير العميل {#client-development}

عملاء إيثريوم هم تطبيقات لبروتوكول إيثريوم. يحول تطوير العميل نتائج أبحاث البروتوكول إلى واقع من خلال دمجها في هؤلاء العملاء. يتضمن تطوير العميل تحديث مواصفات العميل بالإضافة إلى بناء تطبيقات محددة.

تتطلب عقدة إيثريوم تشغيل برنامجين:

1. عميل الإجماع لتتبع رأس البلوك تشين، ونشر الكتل، والتعامل مع منطق الإجماع
2. عميل التنفيذ لدعم آلة إيثريوم الافتراضية وتنفيذ المعاملات والعقود الذكية

راجع [صفحة العقد والعملاء](/developers/docs/nodes-and-clients/) لمزيد من التفاصيل حول العقد والعملاء وللحصول على قائمة بجميع تطبيقات العملاء الحالية. يمكنك أيضًا العثور على سجل لجميع ترقيات إيثريوم على [صفحة السجل](/ethereum-forks/).

### عملاء التنفيذ {#execution-clients}

- [مواصفات عميل التنفيذ](https://github.com/ethereum/execution-specs)
- [مواصفات واجهة برمجة تطبيقات (API) التنفيذ](https://github.com/ethereum/execution-apis)

### عملاء الإجماع {#consensus-clients}

- [مواصفات عميل الإجماع](https://github.com/ethereum/consensus-specs)
- [مواصفات واجهة برمجة تطبيقات (API) المنارة](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## قابلية التوسّع والأداء {#scaling-and-performance}

تعد قابلية التوسّع في إيثريوم مجال تركيز كبير لباحثي إيثريوم. تشمل الأساليب الحالية تفريغ المعاملات على الرول أب وجعلها رخيصة قدر الإمكان باستخدام كتل البيانات (data blobs). تتوفر معلومات تمهيدية حول قابلية التوسّع في إيثريوم على [صفحة قابلية التوسّع](/developers/docs/scaling) الخاصة بنا.

### الطبقة الثانية {#layer-2}

يوجد الآن العديد من بروتوكولات الطبقة الثانية التي تعمل على توسيع نطاق إيثريوم باستخدام تقنيات مختلفة لتجميع المعاملات وتأمينها على الطبقة الأولى من إيثريوم. هذا موضوع سريع النمو للغاية مع الكثير من إمكانات البحث والتطوير.

#### قراءات أساسية {#background-reading-2}

- [مقدمة عن الطبقة الثانية](/layer-2/)
- [Polynya: الرول أب، وتوفر البيانات (DA)، والسلاسل المعيارية](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### أبحاث حديثة {#recent-research-2}

- [الترتيب العادل للمنسقين في Arbitrum](https://eprint.iacr.org/2021/1465)
- [الطبقة الثانية على Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [خريطة الطريق المتمحورة حول الرول أب](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### الجسور {#bridges}

أحد المجالات المحددة في الطبقة الثانية التي تتطلب المزيد من البحث والتطوير هو الجسور الآمنة وعالية الأداء. يشمل ذلك الجسور بين مختلف شبكات الطبقة الثانية والجسور بين الطبقة الأولى والطبقة الثانية. يعد هذا مجال بحث مهمًا بشكل خاص لأن الجسور غالبًا ما تكون مستهدفة من قبل المتسللين.

#### قراءات أساسية {#background-reading-3}

- [مقدمة عن جسور البلوك تشين](/bridges/)
- [رأي فيتاليك حول الجسور](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [مقال عن جسور البلوك تشين](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [القيمة المقفلة في الجسور](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### أبحاث حديثة {#recent-research-3}

- [التحقق من الجسور](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### التجزئة {#sharding}

لطالما كانت التجزئة في البلوك تشين الخاص بإيثريوم جزءًا من خريطة الطريق للتطوير. ومع ذلك، فإن حلول قابلية التوسّع الجديدة مثل "Danksharding" تحتل حاليًا مركز الصدارة.

تم إطلاق المرحلة التمهيدية لـ Danksharding الكاملة والمعروفة باسم Proto-Danksharding مع ترقية شبكة Cancun-Deneb ("Dencun").

[المزيد حول ترقية Dencun](/roadmap/dencun/)

#### قراءات أساسية {#background-reading-4}

- [ملاحظات حول Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [فيديو Bankless عن Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [خلاصة أبحاث التجزئة في إيثريوم](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### أبحاث حديثة {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [فيتاليك حول التجزئة وأخذ عينات توفر البيانات](https://hackmd.io/@vbuterin/sharding_proposal)

### الأجهزة {#hardware}

يعد [تشغيل العقد](/developers/docs/nodes-and-clients/run-a-node/) على أجهزة متواضعة أمرًا أساسيًا للحفاظ على إيثريوم لامركزي. لذلك، يعد البحث النشط في تقليل متطلبات الأجهزة لتشغيل العقد مجالًا مهمًا للبحث.

#### قراءات أساسية {#background-reading-5}

- [إيثريوم على ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### أبحاث حديثة {#recent-research-5}

- [ecdsa على FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## الأمان {#security}

الأمان هو موضوع واسع قد يشمل منع البريد العشوائي/الاحتيال، وأمان المحفظة، وأمان الأجهزة، والأمن الاقتصادي التشفيري، واكتشاف الأخطاء واختبار التطبيقات وبرامج العميل وإدارة المفاتيح. ستساعد المساهمة في المعرفة في هذه المجالات على تحفيز التبني السائد.

### علم التشفير وإثباتات المعرفة الصفرية (ZKP) {#cryptography--zkp}

تعد إثباتات المعرفة الصفرية (ZKP) وعلم التشفير أمرًا بالغ الأهمية لبناء الخصوصية والأمان في إيثريوم وتطبيقاته. تعد المعرفة الصفرية مجالًا حديثًا نسبيًا ولكنه سريع الحركة مع العديد من فرص البحث والتطوير المفتوحة. تشمل بعض الاحتمالات تطوير تطبيقات أكثر كفاءة لـ [خوارزمية التجزئة Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)، أو إيجاد التزامات متعددة الحدود (polynomial commitments) أفضل مما هو موجود حاليًا، أو تقليل تكلفة إنشاء المفتاح العام ecdsa ودوائر التحقق من التوقيع.

#### قراءات أساسية {#background-reading-6}

- [مدونة 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [بودكاست المعرفة الصفرية](https://zeroknowledge.fm/)

#### أبحاث حديثة {#recent-research-6}

- [التقدم الأخير في علم التشفير بالمنحنيات الإهليلجية](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [المعرفة الصفرية (ZK) على Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### المحافظ {#wallets}

يمكن أن تكون محافظ إيثريوم عبارة عن إضافات للمتصفح، أو تطبيقات سطح المكتب والهاتف المحمول، أو عقود ذكية على إيثريوم. هناك بحث نشط في محافظ الاسترداد الاجتماعي التي تقلل من بعض المخاطر المرتبطة بإدارة مفاتيح المستخدم الفردي. يرتبط بتطوير المحافظ البحث في أشكال بديلة لتجريد الحساب (account abstraction)، وهو مجال مهم من مجالات البحث الناشئة.

#### قراءات أساسية {#background-reading-7}

- [مقدمة عن المحافظ](/wallets/)
- [مقدمة عن أمان المحفظة](/security/)
- [الأمان على Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938 تجريد الحساب](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 تجريد الحساب](https://eips.ethereum.org/EIPS/eip-4337)

#### أبحاث حديثة {#recent-research-7}

- [محافظ العقود الذكية التي تركز على التحقق](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [مستقبل الحسابات](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 أكواد تشغيل AUTH و AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [نشر الكود في عنوان حساب مملوك خارجيًا (EOA)](https://eips.ethereum.org/EIPS/eip-5003)

## المجتمع والتعليم والتوعية {#community-education-and-outreach}

يتطلب إعداد مستخدمين جدد على إيثريوم موارد تعليمية وأساليب توعية جديدة. قد يشمل ذلك منشورات المدونات والمقالات، والكتب، والبودكاست، والميمز، وموارد التدريس، والأحداث، وأي شيء آخر يبني المجتمعات، ويرحب بالمبتدئين، ويثقف الناس حول إيثريوم.

### تجربة المستخدم/واجهة المستخدم (UX/UI) {#uxui}

لجذب المزيد من الأشخاص إلى إيثريوم، يجب على النظام البيئي تحسين تجربة المستخدم/واجهة المستخدم (UX/UI). سيتطلب ذلك من المصممين وخبراء المنتجات إعادة فحص تصميم المحافظ والتطبيقات.

#### قراءات أساسية {#background-reading-8}

- [تجربة المستخدم/واجهة المستخدم على Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### أبحاث حديثة {#recent-research-8}

- [ديسكورد تصميم ويب 3](https://discord.gg/FsCFPMTSm9)
- [مبادئ تصميم ويب 3](https://www.web3designprinciples.com/)
- [مناقشة تجربة المستخدم في Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### الاقتصاد {#economics}

تتبع الأبحاث الاقتصادية في إيثريوم نهجين بشكل عام: التحقق من أمان الآليات التي تعتمد على الحوافز الاقتصادية ("الاقتصاد الجزئي") وتحليل تدفقات القيمة بين البروتوكولات والتطبيقات والمستخدمين ("الاقتصاد الكلي"). هناك عوامل اقتصادية تشفيرية معقدة تتعلق بالأصل الأصلي لإيثريوم (الإيثر) والرموز المبنية فوقه (على سبيل المثال الرموز غير القابلة للاستبدال (NFTs) ورموز ERC-20).

#### قراءات أساسية {#background-reading-9}

- [مجموعة الحوافز القوية (Robust Incentives Group)](https://rig.ethereum.org/)
- [ورشة عمل ETHconomics في Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### أبحاث حديثة {#recent-research-9}

- [التحليل التجريبي لـ EIP-1559](https://arxiv.org/abs/2201.05574)
- [توازن العرض المتداول](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [القياس الكمي لأقصى قيمة قابلة للاستخراج (MEV): ما مدى ظلام الغابة؟](https://arxiv.org/abs/2101.05511)

### مساحة الكتلة وأسواق الرسوم {#blockspace-fee-markets}

تحكم أسواق مساحة الكتلة إدراج معاملات المستخدم النهائي، إما مباشرة على إيثريوم (الطبقة الأولى) أو على الشبكات الموصولة بجسور، مثل الرول أب (الطبقة الثانية). على إيثريوم، يتم إرسال المعاملات إلى سوق الرسوم المنشور في البروتوكول كـ EIP-1559، مما يحمي السلسلة من البريد العشوائي وتسعير الازدحام. في كلتا الطبقتين، قد تنتج المعاملات عوامل خارجية، تُعرف باسم أقصى قيمة قابلة للاستخراج (MEV)، والتي تحفز هياكل سوق جديدة لالتقاط أو إدارة هذه العوامل الخارجية.

#### قراءات أساسية {#background-reading-10}

- [تصميم آلية رسوم المعاملة لبلوك تشين إيثريوم: تحليل اقتصادي لـ EIP-1559 (تيم روفجاردن، <span dir="ltr">2020</span>)](https://timroughgarden.org/papers/eip1559.pdf)
- [محاكاة EIP-1559 (مجموعة الحوافز القوية)](https://ethereum.github.io/abm1559)
- [اقتصاديات الرول أب من المبادئ الأولى](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: التشغيل الأمامي، وإعادة ترتيب المعاملات، وعدم استقرار الإجماع في البورصات اللامركزية](https://arxiv.org/abs/1904.05234)

#### أبحاث حديثة {#recent-research-10}

- [عرض فيديو EIP-1559 متعدد الأبعاد](https://youtu.be/QbR4MTgnCko)
- [أقصى قيمة قابلة للاستخراج (MEV) عبر النطاقات](http://arxiv.org/abs/2112.01472)
- [مزادات MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### حوافز إثبات الحصة {#proof-of-stake-incentives}

يستخدم المدقّقون الأصل الأصلي لإيثريوم (الإيثر) كضمان ضد السلوك غير النزيه. تحدد اقتصاديات التشفير لهذا أمان الشبكة. قد يتمكن المدقّقون المتمرسون من استغلال الفروق الدقيقة في طبقة الحوافز لشن هجمات صريحة.

#### قراءات أساسية {#background-reading-11}

- [دورة متقدمة في اقتصاديات إيثريوم والنموذج الاقتصادي](https://github.com/CADLabs/ethereum-economic-model)
- [محاكاة حوافز إثبات الحصة (PoS) (مجموعة الحوافز القوية)](https://ethereum.github.io/beaconrunner/)

#### أبحاث حديثة {#recent-research-11}

- [زيادة مقاومة الرقابة على المعاملات في ظل فصل المقترح/الباني (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [ثلاث هجمات على إثبات الحصة (PoS) في إيثريوم](https://arxiv.org/abs/2110.10086)

### التحصيص السائل والمشتقات {#liquid-staking-and-derivatives}

يسمح التحصيص السائل للمستخدمين الذين يمتلكون أقل من <span dir="ltr">32</span> ETH بالحصول على عوائد التحصيص عن طريق مبادلة الإيثر برمز يمثل الإيثر المحصص والذي يمكن استخدامه في التمويل اللامركزي (DeFi). ومع ذلك، لا تزال الحوافز وديناميكيات السوق المرتبطة بالتحصيص السائل قيد الاكتشاف، بالإضافة إلى تأثيرها على أمان إيثريوم (على سبيل المثال، مخاطر المركزية).

#### قراءات أساسية {#background-reading-12}

- [التحصيص السائل على Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: الطريق إلى التحصيص غير الموثوق به في إيثريوم](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: مقدمة عن بروتوكول التحصيص](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### أبحاث حديثة {#recent-research-12}

- [التعامل مع عمليات السحب من Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [بيانات اعتماد السحب](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [مخاطر مشتقات التحصيص السائل](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## الاختبار {#testing}

### التحقق الرسمي {#formal-verification}

التحقق الرسمي هو كتابة كود للتحقق من أن مواصفات الإجماع في إيثريوم صحيحة وخالية من الأخطاء. توجد نسخة قابلة للتنفيذ من المواصفات مكتوبة بلغة Python تتطلب الصيانة والتطوير. يمكن أن تساعد الأبحاث الإضافية في تحسين تطبيق Python للمواصفات وإضافة أدوات يمكنها التحقق من الصحة بشكل أكثر قوة وتحديد المشكلات.

#### قراءات أساسية {#background-reading-13}

- [مقدمة عن التحقق الرسمي](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [التحقق الرسمي (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### أبحاث حديثة {#recent-research-13}

- [التحقق الرسمي من عقد الإيداع](https://github.com/runtimeverification/deposit-contract-verification)
- [التحقق الرسمي من مواصفات سلسلة المنارة](https://github.com/runtimeverification/deposit-contract-verification)

## علوم البيانات والتحليلات {#data-science-and-analytics}

هناك حاجة إلى المزيد من أدوات تحليل البيانات ولوحات المعلومات التي توفر معلومات مفصلة حول النشاط على إيثريوم وصحة الشبكة.

### قراءات أساسية {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [لوحة معلومات تنوع العملاء](https://clientdiversity.org/)

#### أبحاث حديثة {#recent-research-14}

- [تحليل بيانات مجموعة الحوافز القوية](https://rig.ethereum.org/)

## التطبيقات والأدوات {#apps-and-tooling}

تدعم طبقة التطبيق نظامًا بيئيًا متنوعًا من البرامج التي تسوي المعاملات على الطبقة الأساسية لإيثريوم. تجد فرق التطوير باستمرار طرقًا جديدة للاستفادة من إيثريوم لإنشاء إصدارات قابلة للتركيب ومفتوحة بدون إذن ومقاومة للرقابة من تطبيقات Web2 المهمة أو إنشاء مفاهيم جديدة تمامًا أصلية في ويب 3. في الوقت نفسه، يتم تطوير أدوات جديدة تجعل بناء التطبيقات اللامركزية على إيثريوم أقل تعقيدًا.

### التمويل اللامركزي (DeFi) {#defi}

يعد التمويل اللامركزي (DeFi) أحد الفئات الأساسية للتطبيقات المبنية على إيثريوم. يهدف التمويل اللامركزي إلى إنشاء "مكعبات ليغو مالية" قابلة للتركيب تسمح للمستخدمين بتخزين الأصول المشفرة وتحويلها وإقراضها واقتراضها واستثمارها باستخدام العقود الذكية. التمويل اللامركزي هو مجال سريع الحركة يتم تحديثه باستمرار. هناك حاجة مستمرة للبحث في البروتوكولات الآمنة والفعالة والتي يسهل الوصول إليها.

#### قراءات أساسية {#background-reading-15}

- [التمويل اللامركزي (DeFi)](/defi/)
- [Coinbase: ما هو التمويل اللامركزي (DeFi)؟](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### أبحاث حديثة {#recent-research-15}

- [تمويل لامركزي، ملكية مركزية؟](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: الطريق إلى معاملات بأقل من دولار](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### المنظمات اللامركزية المستقلة (DAOs) {#daos}

تتمثل إحدى حالات الاستخدام المؤثرة لإيثريوم في القدرة على التنظيم بطريقة لامركزية من خلال استخدام المنظمات اللامركزية المستقلة (DAOs). هناك الكثير من الأبحاث النشطة حول كيفية تطوير واستخدام المنظمات اللامركزية المستقلة على إيثريوم لتنفيذ أشكال محسنة من الحوكمة، كأداة تنسيق تقلل من الحاجة إلى الثقة، مما يوسع خيارات الأشخاص بشكل كبير إلى ما هو أبعد من الشركات والمنظمات التقليدية.

#### قراءات أساسية {#background-reading-16}

- [مقدمة عن المنظمات اللامركزية المستقلة (DAOs)](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### أبحاث حديثة {#recent-research-16}

- [رسم خريطة للنظام البيئي للمنظمات اللامركزية المستقلة (DAO)](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### أدوات المطورين {#developer-tools}

تتحسن أدوات مطوري إيثريوم بسرعة. هناك الكثير من البحث والتطوير النشط الذي يجب القيام به في هذا المجال العام.

#### قراءات أساسية {#background-reading-17}

- [الأدوات حسب لغة البرمجة](/developers/docs/programming-languages/)
- [أطر عمل المطورين](/developers/docs/frameworks/)
- [قائمة أدوات مطوري الإجماع](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [معايير الرموز](/developers/docs/standards/tokens/)
- [CryptoDevHub: أدوات آلة إيثريوم الافتراضية (EVM)](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### أبحاث حديثة {#recent-research-17}

- [قناة أدوات الإجماع على ديسكورد Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### خدمات أوراكل {#oracles}

تستورد خدمات أوراكل البيانات خارج السلسلة إلى البلوك تشين بطريقة لامركزية ومفتوحة بدون إذن. يتيح الحصول على هذه البيانات على السلسلة للتطبيقات اللامركزية أن تكون تفاعلية مع ظواهر العالم الحقيقي مثل تقلبات الأسعار في أصول العالم الحقيقي، أو الأحداث في التطبيقات خارج السلسلة، أو حتى التغيرات في الطقس.

#### قراءات أساسية {#background-reading-18}

- [مقدمة عن خدمات أوراكل](/developers/docs/oracles/)

#### أبحاث حديثة {#recent-research-18}

- [استطلاع حول خدمات أوراكل في البلوك تشين](https://arxiv.org/pdf/2004.07140.pdf)
- [الورقة البيضاء لـ Chainlink](https://chain.link/whitepaper)

### أمان التطبيق {#app-security}

تستغل الاختراقات على إيثريوم بشكل عام الثغرات الأمنية في التطبيقات الفردية بدلاً من البروتوكول نفسه. يخوض المتسللون ومطورو التطبيقات سباق تسلح لتطوير هجمات ودفاعات جديدة. هذا يعني أن هناك دائمًا بحثًا وتطويرًا مهمًا مطلوبًا للحفاظ على أمان التطبيقات من الاختراقات.

#### قراءات أساسية {#background-reading-19}

- [تقرير استغلال Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [قائمة تحليلات ما بعد اختراق عقود إيثريوم](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [أخبار Rekt](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### أبحاث حديثة {#recent-research-19}

- [تطبيقات Ethresear.ch](https://ethresear.ch/c/applications/18)

### حزمة التكنولوجيا {#technology-stack}

تعد لامركزية حزمة تكنولوجيا إيثريوم بأكملها مجال بحث مهم. في الوقت الحالي، عادةً ما تحتوي التطبيقات اللامركزية على إيثريوم على بعض نقاط المركزية لأنها تعتمد على أدوات أو بنية تحتية مركزية.

#### قراءات أساسية {#background-reading-20}

- [حزمة إيثريوم](/developers/docs/ethereum-stack/)
- [Coinbase: مقدمة عن حزمة ويب 3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [مقدمة عن العقود الذكية](/developers/docs/smart-contracts/)
- [مقدمة عن التخزين اللامركزي](/developers/docs/storage/)

#### أبحاث حديثة {#recent-research-20}

- [قابلية تركيب العقود الذكية](/developers/docs/smart-contracts/composability/)