---
title: مقدمة إلى مقترحات تحسين إيثيريوم (⁦EIPs⁩)
metaTitle: مقترحات تحسين إيثيريوم (⁦EIPs⁩)
description: المعلومات الأساسية التي تحتاجها لفهم مقترحات تحسين إيثيريوم (⁦EIPs⁩)
lang: ar
---

## ما هي مقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>)؟ {#what-are-eips}

[مقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>)](https://eips.ethereum.org/) هي معايير تحدد الميزات أو العمليات الجديدة المحتملة لشبكة إيثيريوم. تحتوي <span dir="ltr">EIPs</span> على المواصفات الفنية للتغييرات المقترحة وتعمل كـ "مصدر الحقيقة" للمجتمع. تتم مناقشة وتطوير ترقيات الشبكة ومعايير التطبيقات الخاصة بـ [إيثيريوم](/) من خلال عملية <span dir="ltr">EIP</span>.

يتمتع أي شخص داخل مجتمع إيثيريوم بالقدرة على إنشاء <span dir="ltr">EIP</span>. تم تضمين إرشادات كتابة <span dir="ltr">EIPs</span> في [<span dir="ltr">EIP-1</span>](https://eips.ethereum.org/EIPS/eip-1). يجب أن يقدم <span dir="ltr">EIP</span> بشكل أساسي مواصفات فنية موجزة مع قدر بسيط من الدوافع. مؤلف <span dir="ltr">EIP</span> مسؤول عن الوصول إلى إجماع داخل المجتمع وتوثيق الآراء البديلة. نظرًا للحاجز الفني العالي لتقديم <span dir="ltr">EIP</span> جيد الصياغة، تاريخيًا، يكون معظم مؤلفي <span dir="ltr">EIPs</span> عادةً من مطوري التطبيقات أو البروتوكول.

## لماذا تعتبر <span dir="ltr">EIPs</span> مهمة؟ {#why-do-eips-matter}

تلعب <span dir="ltr">EIPs</span> دورًا مركزيًا في كيفية حدوث التغييرات وتوثيقها على إيثيريوم. إنها الطريقة التي يتبعها الأشخاص لاقتراح التغييرات ومناقشتها واعتمادها. هناك [أنواع مختلفة من <span dir="ltr">EIPs</span>](https://eips.ethereum.org/EIPS/eip-1#eip-types)، بما في ذلك <span dir="ltr">EIPs</span> الأساسية لتغييرات البروتوكول منخفضة المستوى التي تؤثر على الإجماع وتتطلب ترقية للشبكة مثل [<span dir="ltr">EIP-1559</span>](https://eips.ethereum.org/EIPS/eip-1559)، وطلبات التعليقات الخاصة بإيثيريوم (<span dir="ltr">ERCs</span>) لمعايير التطبيقات مثل [<span dir="ltr">EIP-20</span>](https://eips.ethereum.org/EIPS/eip-20) و[<span dir="ltr">EIP-721</span>](https://eips.ethereum.org/EIPS/eip-721).

تتكون كل ترقية للشبكة من مجموعة من <span dir="ltr">EIPs</span> التي يجب تنفيذها بواسطة كل [عميل إيثيريوم](/learn/#clients-and-nodes) على الشبكة. هذا يعني أنه للبقاء في إجماع مع العملاء الآخرين على شبكة إيثيريوم الرئيسية، يحتاج مطورو العملاء إلى التأكد من أنهم قد نفذوا جميع <span dir="ltr">EIPs</span> المطلوبة.

إلى جانب توفير مواصفات فنية للتغييرات، تعد <span dir="ltr">EIPs</span> الوحدة التي تتمحور حولها الحوكمة في إيثيريوم: لأي شخص الحرية في اقتراح واحد، ثم سيناقش مختلف أصحاب المصلحة في المجتمع لتحديد ما إذا كان ينبغي اعتماده كمعيار أو تضمينه في ترقية الشبكة. نظرًا لأن <span dir="ltr">EIPs</span> غير الأساسية لا يجب أن تعتمدها جميع التطبيقات (على سبيل المثال، من الممكن إنشاء رمز قابل للاستبدال لا ينفذ <span dir="ltr">EIP-20</span>)، ولكن يجب اعتماد <span dir="ltr">EIPs</span> الأساسية على نطاق واسع (لأنه يجب على جميع العقد الترقية للبقاء جزءًا من نفس الشبكة)، فإن <span dir="ltr">EIPs</span> الأساسية تتطلب إجماعًا أوسع داخل المجتمع مقارنة بـ <span dir="ltr">EIPs</span> غير الأساسية.

## تاريخ <span dir="ltr">EIPs</span> {#history-of-eips}

تم إنشاء [مستودع <span dir="ltr">GitHub</span> الخاص بمقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>)](https://github.com/ethereum/EIPs) في أكتوبر <span dir="ltr">2015</span>. تستند عملية <span dir="ltr">EIP</span> إلى عملية [مقترحات تحسين بيتكوين (<span dir="ltr">BIPs</span>)](https://github.com/bitcoin/bips)، والتي تستند بدورها إلى عملية [مقترحات تحسين <span dir="ltr">Python</span> (<span dir="ltr">PEPs</span>)](https://www.python.org/dev/peps/).

يُكلف محررو <span dir="ltr">EIP</span> بعملية مراجعة <span dir="ltr">EIPs</span> للتأكد من سلامتها الفنية، ومشكلات التنسيق، وتصحيح الإملاء والقواعد النحوية وأسلوب الكود. كان مارتن بيكزي، وفيتاليك بوتيرين، وغافين وود، وعدد قليل من الآخرين هم المحررين الأصليين لـ <span dir="ltr">EIP</span> من عام <span dir="ltr">2015</span> إلى أواخر عام <span dir="ltr">2016</span>.

محررو <span dir="ltr">EIP</span> الحاليون هم

- أليكس بيريغساسي (<span dir="ltr">@axic</span>)
- غافين جون (<span dir="ltr">@Pandapip1</span>)
- غريغ كولفين (<span dir="ltr">@gcolvin</span>)
- مات غارنيت (<span dir="ltr">@lightclient</span>)
- سام ويلسون (<span dir="ltr">@SamWilsn</span>)

محررو <span dir="ltr">EIP</span> الفخريون هم

- كيسي ديتريو (<span dir="ltr">@cdetrio</span>)
- هدسون جيمسون (<span dir="ltr">@Souptacular</span>)
- مارتن بيكزي (<span dir="ltr">@wanderer</span>)
- ميكا زولتو (<span dir="ltr">@MicahZoltu</span>)
- نيك جونسون (<span dir="ltr">@arachnid</span>)
- نيك سيفرز (<span dir="ltr">@nicksavers</span>)
- فيتاليك بوتيرين (<span dir="ltr">@vbuterin</span>)

إذا كنت ترغب في أن تصبح محررًا لـ <span dir="ltr">EIP</span>، يرجى التحقق من [<span dir="ltr">EIP-5069</span>](https://eips.ethereum.org/EIPS/eip-5069).

يقرر محررو <span dir="ltr">EIP</span> متى يكون المقترح جاهزًا ليصبح <span dir="ltr">EIP</span>، ويساعدون مؤلفي <span dir="ltr">EIP</span> على المضي قدمًا بمقترحاتهم. تساعد [Ethereum Cat Herders](https://www.ethereumcatherders.com/) في تنظيم الاجتماعات بين محرري <span dir="ltr">EIP</span> والمجتمع (انظر [<span dir="ltr">EIPIP</span>](https://github.com/ethereum-cat-herders/EIPIP)).

تم وصف عملية التوحيد القياسي الكاملة إلى جانب مخطط توضيحي في [<span dir="ltr">EIP-1</span>](https://eips.ethereum.org/EIPS/eip-1)

## معرفة المزيد {#learn-more}

إذا كنت مهتمًا بقراءة المزيد حول <span dir="ltr">EIPs</span>، فتحقق من [موقع <span dir="ltr">EIPs</span> الإلكتروني](https://eips.ethereum.org/) و[<span dir="ltr">EIP-1</span>](https://eips.ethereum.org/EIPS/eip-1). إليك بعض الروابط المفيدة:

- [قائمة بكل مقترح من مقترحات تحسين إيثيريوم](https://eips.ethereum.org/all)
- [وصف لجميع أنواع <span dir="ltr">EIP</span>](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [وصف لجميع حالات <span dir="ltr">EIP</span>](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### مشاريع التثقيف المجتمعي {#community-projects}

- [<span dir="ltr">PEEPanEIP</span>](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *<span dir="ltr">PEEPanEIP</span> هي سلسلة مقاطع فيديو تعليمية تناقش مقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>) والميزات الرئيسية للترقيات القادمة.*
- [<span dir="ltr">EIPs.wtf</span>](https://www.eips.wtf/) — *يوفر <span dir="ltr">EIPs.wtf</span> معلومات إضافية حول مقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>)، بما في ذلك حالتها، وتفاصيل تنفيذها، وطلبات السحب ذات الصلة، وملاحظات المجتمع.* 
- [<span dir="ltr">EIP.Fun</span>](https://eipfun.substack.com/) — *يوفر <span dir="ltr">EIP.Fun</span> أحدث الأخبار حول مقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>)، وتحديثات حول اجتماعات <span dir="ltr">EIP</span>، والمزيد.*
- [<span dir="ltr">EIPs Insight</span>](https://eipsinsight.com/) — *يعد <span dir="ltr">EIPs Insight</span> تمثيلًا لحالة عملية مقترحات تحسين إيثيريوم (<span dir="ltr">EIPs</span>) والإحصائيات وفقًا للمعلومات التي تم جمعها من مصادر مختلفة.*

## المشاركة {#participate}

يمكن لأي شخص إنشاء <span dir="ltr">EIP</span>. قبل تقديم مقترح، يجب على المرء قراءة [<span dir="ltr">EIP-1</span>](https://eips.ethereum.org/EIPS/eip-1) الذي يوضح عملية <span dir="ltr">EIP</span> وكيفية كتابة <span dir="ltr">EIP</span>، وطلب الملاحظات على [Ethereum Magicians](https://ethereum-magicians.org/)، حيث تتم مناقشة المقترحات أولاً مع المجتمع قبل تقديم مسودة.

## المراجع {#references}

<cite class="citation">

محتوى الصفحة مقدم جزئيًا من [حوكمة تطوير بروتوكول إيثيريوم وتنسيق ترقية الشبكة](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) بواسطة هدسون جيمسون

</cite>