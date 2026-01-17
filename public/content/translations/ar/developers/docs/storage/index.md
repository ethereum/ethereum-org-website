---
title: "التخزين اللامركزي"
description: "نظرة عامة حول ما هو التخزين اللامركزي والأدوات المتاحة لدمجه في dapp."
lang: ar
---

على عكس الخادم المركزي الذي تديره شركة أو منظمة واحدة، تتكون أنظمة التخزين اللامركزية من شبكة نظير إلى نظير من مشغلي المستخدمين الذين يحتفظون بجزء من البيانات الإجمالية، مما يخلق نظامًا مرنًا لمشاركة تخزين الملفات. يمكن أن تكون هذه في تطبيق قائم على blockchain أو أي شبكة تعتمد على نظير إلى نظير.

يمكن استخدام الإيثريوم بحد ذاته كنظام تخزين لامركزي، وهو كذلك عندما يتعلق الأمر بتخزين التعليمات البرمجية في جميع العقود الذكية. ومع ذلك، عندما يتعلق الأمر بكميات كبيرة من البيانات، فهذا ليس ما تم تصميم الإيثريوم من أجله. تنمو السلسلة بشكل مطرد، ولكن في وقت كتابة هذا التقرير، يبلغ حجم سلسلة إيثريوم حوالي 500 جيجابايت - 1 تيرابايت ([حسب العميل](https://etherscan.io/chartsync/chaindefault))، ويجب أن تكون كل عقدة على الشبكة قادرة على تخزين جميع البيانات. إذا تم توسيع السلسلة إلى كميات كبيرة من البيانات (على سبيل المثال 5 تيرابايت)، فلن يكون من الممكن أن تستمر جميع العقد في العمل. بالإضافة إلى ذلك، فإن تكلفة نشر هذا القدر الكبير من البيانات على الشبكة الرئيسية ستكون باهظة للغاية بسبب رسوم [الغاز](/developers/docs/gas).

وبسبب هذه القيود، نحتاج إلى سلسلة أو منهجية مختلفة لتخزين كميات كبيرة من البيانات بطريقة لامركزية.

عند النظر في خيارات التخزين اللامركزي (dStorage)، هناك بعض الأشياء التي يجب على المستخدم وضعها في الاعتبار.

- آلية الاستمرار / هيكل الحوافز
- إنفاذ الاحتفاظ بالبيانات
- اللامركزية
- إجماع

## آلية الاستمرارية / هيكل الحوافز {#persistence-mechanism}

### قائم على البلوك تشين {#blockchain-based}

لكي تستمر قطعة من البيانات إلى الأبد، نحتاج إلى استخدام آلية الاستمرار. على سبيل المثال، على Ethereum، آلية الاستمرار هي أنه يجب أخذ السلسلة بأكملها في الاعتبار عند تشغيل عقدة. تتم إضافة قطع جديدة من البيانات إلى نهاية السلسلة، وتستمر في النمو - مما يتطلب من كل عقدة تكرار جميع البيانات المضمنة.

يُعرف هذا باسم الاستمرارية **القائمة على البلوك تشين**.

المشكلة في الاستمرارية القائمة على البلوك تشين هي أن السلسلة قد تصبح كبيرة جدًا بحيث لا يمكن صيانتها وتخزين جميع البيانات بشكل ممكن (على سبيل المثال، تقدر [العديد من المصادر](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) أن الإنترنت يتطلب أكثر من 40 زيتابايت من سعة التخزين).

يجب أن تحتوي سلسلة الكتل أيضًا على نوع من هيكل الحوافز. بالنسبة للاستمرارية المستندة إلى blockchain، يتم دفع مبلغ إلى المحقق. عندما تتم إضافة البيانات إلى السلسلة، يتم دفع الأموال للمحققين لإضافة البيانات عليها.

المنصات ذات الاستمرارية القائمة على تقنية البلوك تشين:

- إثيريوم
- [Arweave](https://www.arweave.org/)

### قائم على العقد {#contract-based}

تقوم الاستمرارية **القائمة على العقد** على مبدأ أن البيانات لا يمكن نسخها من قبل كل عقدة وتخزينها إلى الأبد، بل يجب الحفاظ عليها من خلال اتفاقيات العقود. هذه هي الاتفاقيات المبرمة مع عدة عقد والتي وعدت بتخزين قطعة من البيانات لفترة زمنية محددة.
hadhih hi alatifaqiaat almubramat mae eidat eaqd walati waeudat bitakhzin qiteat min albayanat lifatrat zamaniat muhadadatin. يجب استردادها أو تجديدها عند انتهاء صلاحيتها للحفاظ على استمرار البيانات.
yajib astirdaduha 'aw tajdiduha eind antiha' salahiatiha lilhifaz ealaa astimrar albayanati.

في معظم الحالات، بدلاً من تخزين كافة البيانات على السلسلة، يتم تخزين التجزئة الخاصة بالمكان الذي توجد فيه البيانات على السلسلة.
fi muezam alhalati, bdlaan min takhzin kafat albayanat ealaa alsilsilati, yatimu takhzin altajziat alkhasat bialmakan aladhi tujad fih albayanat ealaa alsilsilati. بهذه الطريقة، لن تحتاج السلسلة بأكملها إلى التوسع للاحتفاظ بجميع البيانات.
bihadhih altariqati, lan tahtaj alsilsilat bi'akmaliha 'iilaa altawasue liliahtifaz bijamie albayanati.

المنصات ذات الاستمرارية القائمة على العقد:
alminasaat dhat alastimrariat alqayimat ealaa aleaqdi:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### اعتبارات إضافية {#additional-consideration}

IPFS هو نظام موزع لتخزين الملفات ومواقع الويب والتطبيقات والبيانات والوصول إليها.
IPFS hu nizam muazae litakhzin almilafaat wamawaqie alwib waltatbiqat walbayanat walwusul 'iilayha. لا يحتوي هذا النظام على مخطط حوافز مدمج، ولكن يمكن استخدامه بدلاً من ذلك مع أي من حلول الحوافز القائمة على العقود المذكورة أعلاه لتحقيق استمرارية أطول أمدًا.
la yahtawi hadha alnizam ealaa mukhatat hawafiz mudmaji, walakin yumkin aistikhdamuh bdlaan min dhalik mae 'ayin min hulul alhawafiz alqayimat ealaa aleuqud almadhkurat 'aelah litahqiq aistimrariat 'atwal amdan. هناك طريقة أخرى للحفاظ على البيانات على IPFS وهي العمل مع خدمة التثبيت، والتي سوف تقوم "بتثبيت" بياناتك نيابةً عنك.
hunak tariqat 'ukhraa lilhifaz ealaa albayanat ealaa IPFS wahi aleamal mae khidmat altathbiti, walati sawf taqum "btathbiat" bayanatik nyabtan eanka. يمكنك أيضًا تشغيل عقدة IPFS الخاصة بك والمساهمة في الشبكة للحفاظ على بياناتك و/أو بيانات الآخرين مجانًا!
yumkinuk aydan tashghil euqdat IPFS alkhasat bik walmusahamat fi alshabakat lilhifaz ealaa bayanatik wa/'aw bayanat alakharin mjanan!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(خدمة تثبيت IPFS)_
- [web3.storage](https://web3.storage/) _(خدمة تثبيت IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(خدمة تثبيت IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(مستكشف تثبيت IPFS)_
- [4EVERLAND](https://www.4everland.org/)_ (خدمة تثبيت IPFS)_
- [Filebase](https://filebase.com) _(خدمة تثبيت IPFS)_
- [Spheron Network](https://spheron.network/) _(خدمة تثبيت IPFS/Filecoin)_

SWARM هي تقنية تخزين وتوزيع بيانات لامركزية مع نظام حوافز تخزين وسعر إيجار تخزين.

## الاحتفاظ بالبيانات {#data-retention}

من أجل الاحتفاظ بالبيانات، يجب أن تحتوي الأنظمة على نوع ما من الآلية للتأكد من الاحتفاظ بالبيانات.

### آلية التحدي {#challenge-mechanism}

إحدى الطرق الأكثر شيوعًا للتأكد من الاحتفاظ بالبيانات هي استخدام نوع ما من التحدي التشفيري الذي يتم إصداره للعقد للتأكد من أنها لا تزال تحتفظ بالبيانات. أحد الطرق البسيطة هو النظر إلى إثبات الوصول الخاص بـ Arweave. إنهم يصدرون تحديًا للعقد لمعرفة ما إذا كانت لديهم البيانات في كل من الكتلة الأحدث وكتلة عشوائية في الماضي. إذا لم تتمكن العقدة من التوصل إلى الإجابة، فسيتم معاقبتها.

أنواع dStorage مع آلية التحدي:

- زوس
  zws
- سكاي نت
  skay nit
- أرويف
- فايلكوين
  faylkwin
- شبكة القشرة
  shabakat alqishra
- 4إيفرلاند
  4'iifirland

### اللامركزية {#decentrality}

لا توجد أدوات رائعة لقياس مستوى اللامركزية في المنصات، ولكن بشكل عام، قد ترغب في استخدام أدوات لا تحتوي على شكل من أشكال KYC لتوفير دليل على أنها ليست مركزية.

أدوات لامركزية بدون KYC:

- سكاي نت
  skay nit
- أرويف
- فايلكوين
  faylkwin
- نظام الملفات InterPlanetary  هو تخزين لامركزي ونظام مرجعي للملفات من أجل ايثيريوم.
- إثيريوم
- شبكة القشرة
  shabakat alqishra
- 4إيفرلاند
  4'iifirland

### إجماع {#consensus}

لدى معظم هذه الأدوات نسختها الخاصة من [آلية الإجماع](/developers/docs/consensus-mechanisms/) ولكنها تستند بشكل عام إما إلى [**إثبات العمل (PoW)**](/developers/docs/consensus-mechanisms/pow/) أو [**إثبات الحصة (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Proof-of-work based:

- سكاي نت
  skay nit
- أرويف

Proof-of-stake based:

- إثيريوم
- فايلكوين
  faylkwin
- زوس
  zws
- شبكة القشرة
  shabakat alqishra

## أدوات ذات صلة {#related-tools}

**IPFS - _نظام الملفات بين الكواكب (InterPlanetary File System) هو نظام لا مركزي لتخزين الملفات والإشارة إليها مخصص لإيثريوم._**

- [Ipfs.io](https://ipfs.io/)
- [التوثيق](https://docs.ipfs.io/)
- [يجتبه](https://github.com/ipfs/ipfs)

**Storj DCS - _تخزين سحابي لامركزي للكائنات، آمن وخاص ومتوافق مع S3 للمطورين._**

- [Storj.io](https://storj.io/)
- [التوثيق](https://docs.storj.io/)
- [يجتبه](https://github.com/storj/storj)

**Sia - _تستخدم التشفير لإنشاء سوق تخزين سحابي غير موثوق، مما يسمح للمشترين والبائعين بالتعامل مباشرة._**

- [Skynet.net](https://sia.tech/)
- [التوثيق](https://docs.sia.tech/)
- [يجتبه](https://github.com/SiaFoundation/)

**Filecoin - _تم إنشاء Filecoin من قبل نفس الفريق الذي يقف وراء IPFS. إنها طبقة حوافز فوق مبادئ IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [التوثيق](https://docs.filecoin.io/)
- [يجتبه](https://github.com/filecoin-project/)

**Arweave - _Arweave هي منصة تخزين لامركزي (dStorage) لتخزين البيانات._**

- [Arweave.org](https://www.arweave.org/)
- [التوثيق](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs هي منصة تخزين لامركزي (dStorage) قائمة على إثبات الحصة مع التقسيم (sharding) والـ blobbers._**

- [zus.network](https://zus.network/)
- [التوثيق](https://docs.zus.network/zus-docs/)
- [يجتبه](https://github.com/0chain/)

**Crust Network - _Crust هي منصة تخزين لامركزي (dStorage) مبنية على IPFS._**

- [Crust.network](https://crust.network)
- [التوثيق](https://wiki.crust.network)
- [يجتبه](https://github.com/crustio)

**Swarm - _منصة تخزين موزعة وخدمة توزيع محتوى لحزمة web3 الخاصة بإيثريوم._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [التوثيق](https://docs.ethswarm.org/)
- [يجتبه](https://github.com/ethersphere/)

**OrbitDB - _قاعدة بيانات لامركزية من نظير إلى نظير (peer to peer) مبنية على IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [التوثيق](https://github.com/orbitdb/field-manual/)
- [يجتبه](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _مشروع سحابي لامركزي (قاعدة بيانات، تخزين ملفات، حوسبة، و DID). مزيج فريد من نوعه بين تكنولوجيا الند للند على السلسلة وخارجها. متوافق مع IPFS وعدة سلاسل._**

- [Aleph.im](https://aleph.cloud/)
- [التوثيق](https://docs.aleph.cloud/)
- [يجتبه](https://github.com/aleph-im/)

**Ceramic - _تخزين قاعدة بيانات IPFS يتحكم فيه المستخدم، للتطبيقات الغنية بالبيانات والجذابة._**

- [Ceramic.network](https://ceramic.network/)
- [التوثيق](https://developers.ceramic.network/)
- [يجتبه](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _تخزين لامركزي متوافق مع S3 وخدمة تثبيت IPFS متكررة جغرافيًا. يتم تثبيت جميع الملفات التي يتم تحميلها إلى IPFS عبر Filebase تلقائيًا في البنية التحتية لـ Filebase مع 3 نسخ مكررة في جميع أنحاء العالم._**

- [Filebase.com](https://filebase.com/)
- [التوثيق](https://docs.filebase.com/)
- [يجتبه](https://github.com/filebase)

**4EVERLAND - _منصة حوسبة سحابية للويب 3.0 (Web 3.0) تدمج الإمكانيات الأساسية للتخزين والحوسبة والشبكات، وهي متوافقة مع S3 وتوفر تخزينًا متزامنًا للبيانات على شبكات التخزين اللامركزية مثل IPFS وArweave._**

- [4everland.org](https://www.4everland.org/)
- [التوثيق](https://docs.4everland.org/)
- [يجتبه](https://github.com/4everland)

**Kaleido - _منصة بلوك تشين كخدمة (blockchain-as-a-service) مع عقد IPFS تعمل بنقرة زر_**

- [Kaleido](https://kaleido.io/)
- [التوثيق](https://docs.kaleido.io/kaleido-services/ipfs/)
- [يجتبه](https://github.com/kaleido-io)

**Spheron Network - _Spheron هي منصة كخدمة (PaaS) مصممة للتطبيقات اللامركزية (dApps) التي تسعى لإطلاق تطبيقاتها على بنية تحتية لامركزية بأفضل أداء. وهي توفر الحوسبة، والتخزين اللامركزي، وشبكة توصيل المحتوى (CDN)، واستضافة الويب بشكل جاهز._**

- [spheron.network](https://spheron.network/)
- [التوثيق](https://docs.spheron.network/)
- [يجتبه](https://github.com/spheronFdn)

## قراءة إضافية{#further-reading}

- [ما هو التخزين اللامركزي؟](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [دحض خمس خرافات شائعة حول التخزين اللامركزي](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_

## المواضيع ذات الصلة {#related-topics}

- [أطر التطوير](/developers/docs/frameworks/)
