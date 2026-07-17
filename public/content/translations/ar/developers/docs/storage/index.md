---
title: "التخزين اللامركزي"
description: "نظرة عامة على ماهية التخزين اللامركزي والأدوات المتاحة لدمجه في تطبيق لامركزي ⁦(dapp)⁩."
lang: ar
authors: ["باتريك كولينز"]
---

على عكس الخادم المركزي الذي تديره شركة أو مؤسسة واحدة، تتكون أنظمة التخزين اللامركزي من شبكة نظير إلى نظير من المستخدمين المشغلين الذين يحتفظون بجزء من البيانات الإجمالية، مما يخلق نظامًا مرنًا لمشاركة تخزين الملفات. يمكن أن تكون هذه الأنظمة في تطبيق قائم على سلسلة الكتل أو أي شبكة قائمة على مبدأ نظير إلى نظير.

يمكن استخدام إيثيريوم نفسها كنظام تخزين لامركزي، وهي كذلك عندما يتعلق الأمر بتخزين التعليمات البرمجية في جميع العقود الذكية. ومع ذلك، عندما يتعلق الأمر بكميات كبيرة من البيانات، فإن إيثيريوم لم تُصمم لذلك. تنمو السلسلة بشكل مطرد، ولكن في وقت كتابة هذا التقرير، يبلغ حجم سلسلة إيثيريوم حوالي <span dir="ltr">500GB - 1TB</span> ([اعتمادًا على العميل](https://etherscan.io/chartsync/chaindefault))، وتحتاج كل عقدة على الشبكة إلى أن تكون قادرة على تخزين جميع البيانات. إذا توسعت السلسلة لتشمل كميات كبيرة من البيانات (لنفترض <span dir="ltr">5TBs</span>)، فلن يكون من المجدي لجميع العقد الاستمرار في العمل. بالإضافة إلى ذلك، فإن تكلفة نشر هذا القدر من البيانات على الشبكة الرئيسية ستكون باهظة التكلفة بسبب رسوم الـ [غاز](/developers/docs/gas).

بسبب هذه القيود، نحتاج إلى سلسلة أو منهجية مختلفة لتخزين كميات كبيرة من البيانات بطريقة لامركزية.

عند النظر في خيارات التخزين اللامركزي (<span dir="ltr">dStorage</span>)، هناك بعض الأشياء التي يجب على المستخدم وضعها في الاعتبار.

- آلية الاستمرارية / هيكل الحوافز
- فرض الاحتفاظ بالبيانات
- اللامركزية
- الإجماع

## آلية الاستمرارية / هيكل الحوافز {#persistence-mechanism}

### القائمة على سلسلة الكتل {#blockchain-based}

لكي تستمر قطعة من البيانات إلى الأبد، نحتاج إلى استخدام آلية استمرارية. على سبيل المثال، في إيثيريوم، تتمثل آلية الاستمرارية في ضرورة أخذ السلسلة بأكملها في الاعتبار عند تشغيل عقدة. يتم إلحاق أجزاء جديدة من البيانات بنهاية السلسلة، وتستمر في النمو - مما يتطلب من كل عقدة نسخ جميع البيانات المضمنة.

يُعرف هذا باسم الاستمرارية **القائمة على سلسلة الكتل**.

تكمن المشكلة في الاستمرارية القائمة على سلسلة الكتل في أن السلسلة قد تصبح كبيرة جدًا بحيث لا يمكن صيانتها وتخزين جميع البيانات بشكل عملي (على سبيل المثال، تقدر [العديد من المصادر](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) أن الإنترنت يتطلب أكثر من <span dir="ltr">40 Zetabytes</span> من سعة التخزين).

يجب أن تحتوي سلسلة الكتل أيضًا على نوع من هيكل الحوافز. بالنسبة للاستمرارية القائمة على سلسلة الكتل، يتم دفع مبلغ إلى المُدَقِّق. عندما تتم إضافة البيانات إلى السلسلة، يتم الدفع للمُدَقِّقين مقابل إضافة البيانات.

المنصات ذات الاستمرارية القائمة على سلسلة الكتل:

- إيثيريوم
- [Arweave](https://www.arweave.org/)

### القائمة على العقود {#contract-based}

تعتمد الاستمرارية **القائمة على العقود** على فكرة أنه لا يمكن نسخ البيانات بواسطة كل عقدة وتخزينها إلى الأبد، وبدلاً من ذلك يجب الحفاظ عليها من خلال اتفاقيات العقود. هذه اتفاقيات تُبرم مع عقد متعددة وعدت بالاحتفاظ بقطعة من البيانات لفترة من الزمن. يجب تمويلها أو تجديدها كلما نفدت للحفاظ على استمرارية البيانات.

في معظم الحالات، بدلاً من تخزين جميع البيانات على السلسلة، يتم تخزين تجزئة لموقع البيانات على السلسلة. بهذه الطريقة، لا تحتاج السلسلة بأكملها إلى التوسع للاحتفاظ بجميع البيانات.

المنصات ذات الاستمرارية القائمة على العقود:

- [فايل كوين](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [سرب](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### اعتبارات إضافية {#additional-consideration}

IPFS هو نظام موزع لتخزين والوصول إلى الملفات ومواقع الويب والتطبيقات والبيانات. لا يحتوي على نظام حوافز مدمج، ولكن يمكن استخدامه بدلاً من ذلك مع أي من حلول الحوافز القائمة على العقود المذكورة أعلاه لاستمرارية أطول أجلاً. طريقة أخرى للحفاظ على البيانات على IPFS هي العمل مع خدمة تثبيت (pinning service)، والتي ستقوم بـ "تثبيت" بياناتك نيابة عنك. يمكنك حتى تشغيل عقدة IPFS الخاصة بك والمساهمة في الشبكة للحفاظ على بياناتك و/أو بيانات الآخرين مجانًا!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(خدمة تثبيت IPFS)_
- [web3.storage](https://web3.storage/) _(خدمة تثبيت IPFS/فايل كوين)_
- [Infura](https://infura.io/product/ipfs) _(خدمة تثبيت IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(مستكشف تثبيت IPFS)_
- [4EVERLAND](https://www.4everland.org/) _(خدمة تثبيت IPFS)_
- [Filebase](https://filebase.com) _(خدمة تثبيت IPFS)_
- [Spheron Network](https://spheron.network/) _(خدمة تثبيت IPFS/فايل كوين)_

سرب هي تقنية لامركزية لتخزين وتوزيع البيانات مع نظام حوافز للتخزين وأوراكل لأسعار إيجار التخزين.

## الاحتفاظ بالبيانات {#data-retention}

من أجل الاحتفاظ بالبيانات، يجب أن تمتلك الأنظمة نوعًا من الآليات للتأكد من الاحتفاظ بالبيانات.

### آلية التحدي {#challenge-mechanism}

واحدة من أكثر الطرق شيوعًا للتأكد من الاحتفاظ بالبيانات هي استخدام نوع من تحديات علم التشفير التي يتم إصدارها للعقد للتأكد من أنها لا تزال تمتلك البيانات. مثال بسيط على ذلك هو إثبات الوصول (proof-of-access) الخاص بـ Arweave. حيث يصدرون تحديًا للعقد لمعرفة ما إذا كانت تمتلك البيانات في كل من أحدث كتلة وكتلة عشوائية في الماضي. إذا لم تتمكن العقدة من تقديم الإجابة، تتم معاقبتها.

أنواع التخزين اللامركزي (<span dir="ltr">dStorage</span>) التي تحتوي على آلية تحدي:

- Züs
- Skynet
- Arweave
- فايل كوين
- Crust Network
- 4EVERLAND

### اللامركزية {#decentrality}

لا توجد أدوات رائعة لقياس مستوى لامركزية المنصات، ولكن بشكل عام، ستحتاج إلى استخدام أدوات لا تتطلب أي شكل من أشكال KYC لتقديم دليل على أنها ليست مركزية.

الأدوات اللامركزية بدون KYC:

- Skynet
- Arweave
- فايل كوين
- IPFS
- إيثيريوم
- Crust Network
- 4EVERLAND

### الإجماع {#consensus}

تمتلك معظم هذه الأدوات نسختها الخاصة من [آلية الإجماع](/developers/docs/consensus-mechanisms/) ولكنها تعتمد بشكل عام إما على [**إثبات العمل (PoW)**](/developers/docs/consensus-mechanisms/pow/) أو [**إثبات الحصة (PoS)**](/developers/docs/consensus-mechanisms/pos/).

القائمة على إثبات العمل:

- Skynet
- Arweave

القائمة على إثبات الحصة:

- إيثيريوم
- فايل كوين
- Züs
- Crust Network

## أدوات ذات صلة {#related-tools}

**IPFS - _نظام الملفات بين الكواكب (InterPlanetary File System) هو نظام تخزين لامركزي ومرجعية ملفات لإيثيريوم._**

- [Ipfs.io](https://ipfs.io/)
- [الوثائق](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _تخزين كائنات سحابي لامركزي آمن وخاص ومتوافق مع <span dir="ltr">S3</span> للمطورين._**

- [Storj.io](https://storj.io/)
- [الوثائق](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _تُسخّر علم التشفير لإنشاء سوق تخزين سحابي منزوع الثقة، مما يسمح للمشترين والبائعين بالتعامل مباشرة._**

- [Skynet.net](https://sia.tech/)
- [الوثائق](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**فايل كوين - _تم إنشاء فايل كوين من قبل نفس الفريق الذي يقف وراء IPFS. إنها طبقة حوافز مبنية على مُثُل IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [الوثائق](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave هي منصة تخزين لامركزي (<span dir="ltr">dStorage</span>) لتخزين البيانات._**

- [Arweave.org](https://www.arweave.org/)
- [الوثائق](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs هي منصة تخزين لامركزي (<span dir="ltr">dStorage</span>) قائمة على إثبات الحصة مع تجزئة إلى شظايا وعقد تخزين (blobbers)._**

- [zus.network](https://zus.network/)
- [الوثائق](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust هي منصة تخزين لامركزي (<span dir="ltr">dStorage</span>) مبنية فوق IPFS._**

- [Crust.network](https://crust.network)
- [الوثائق](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**سرب - _منصة تخزين موزعة وخدمة توزيع محتوى لحزمة Web3 الخاصة بإيثيريوم._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [الوثائق](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _قاعدة بيانات لامركزية من نظير إلى نظير مبنية فوق IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [الوثائق](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _مشروع سحابي لامركزي (قاعدة بيانات، تخزين ملفات، حوسبة وهوية لامركزية). مزيج فريد من تقنية نظير إلى نظير خارج السلسلة وعلى السلسلة. توافق مع IPFS وسلاسل متعددة._**

- [Aleph.im](https://aleph.cloud/)
- [الوثائق](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _تخزين قاعدة بيانات IPFS يتحكم فيه المستخدم للتطبيقات الغنية بالبيانات والجذابة._**

- [Ceramic.network](https://ceramic.network/)
- [الوثائق](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _تخزين لامركزي متوافق مع <span dir="ltr">S3</span> وخدمة تثبيت IPFS ذات تكرار جغرافي. يتم تثبيت جميع الملفات التي تم تحميلها إلى IPFS من خلال Filebase تلقائيًا على البنية التحتية لـ Filebase مع تكرار <span dir="ltr">3x</span> في جميع أنحاء العالم._**

- [Filebase.com](https://filebase.com/)
- [الوثائق](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _منصة حوسبة سحابية للويب 3.0 تدمج القدرات الأساسية للتخزين والحوسبة والشبكات، وهي متوافقة مع <span dir="ltr">S3</span> وتوفر تخزينًا متزامنًا للبيانات على شبكات التخزين اللامركزي مثل IPFS و Arweave._**

- [4everland.org](https://www.4everland.org/)
- [الوثائق](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _منصة سلسلة الكتل كخدمة (BaaS) مع عقد IPFS بنقرة زر_**

- [Kaleido](https://kaleido.io/)
- [الوثائق](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron هي منصة كخدمة (PaaS) مصممة للتطبيقات اللامركزية (dApps) التي تتطلع إلى إطلاق تطبيقاتها على بنية تحتية لامركزية بأفضل أداء. توفر الحوسبة والتخزين اللامركزي وشبكة توصيل المحتوى (CDN) واستضافة الويب بشكل افتراضي._**

- [spheron.network](https://spheron.network/)
- [الوثائق](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _مُحلل (Resolver) لصفحات الويب اللامركزية، مشابه لـ eth.limo، يدعم جميع الأنواع ولا يقتصر على ENS و IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _محرك بحث لمواقع الويب اللامركزية المدعومة بـ IPFS و ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [الوثائق](https://www.web3compass.net/statistics)

## قراءة إضافية {#further-reading}

- [ما هو التخزين اللامركزي؟](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [دحض خمس خرافات شائعة حول التخزين اللامركزي](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_

## مواضيع ذات صلة {#related-topics}

- [أطر عمل التطوير](/developers/docs/frameworks/)