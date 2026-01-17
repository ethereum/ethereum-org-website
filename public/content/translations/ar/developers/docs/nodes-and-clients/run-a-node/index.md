---
title: قم بتدوير عقدة الإيثيريوم الخاصة بك
description: مقدمة عامة لتشغيل المثيل الخاص بك لعميل Ethereum.
lang: ar
sidebarDepth: 2
---

يوفر لك تشغيل العقدة الخاصة بك فوائد متنوعة، ويفتح إمكانيات جديدة، ويساعد في دعم النظام البيئي. سترشدك هذه الصفحة خلال إنشاء العقدة الخاصة بك والمشاركة في التحقق من صحة معاملات الإيثيريوم.

لاحظ أنه بعد [الدمج](/roadmap/merge)، يلزم وجود عميلين لتشغيل عقدة إيثريوم؛ عميل **طبقة التنفيذ (EL)** وعميل **طبقة الإجماع (CL)**. ستوضح هذه الصفحة كيفية تثبيت هذين العميلين وتكوينهما وتوصيلهما لتشغيل عقدة Ethereum.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم ما هي عقدة Ethereum ولماذا قد ترغب في تشغيل العميل. هذا مشروح في [العُقد والعملاء](/developers/docs/nodes-and-clients/).

إذا كنت جديدًا في موضوع تشغيل عقدة، أو تبحث عن مسار أقل تقنية، فنوصيك أولاً بمراجعة مقدمتنا سهلة الاستخدام حول [تشغيل عقدة إيثريوم](/run-a-node).

## اختيار نهج {#choosing-approach}

الخطوة الأولى في تدوير عقدتك هي اختيار النهج الذي يناسبك. استنادًا إلى المتطلبات والإمكانيات المتنوعة، يجب عليك تحديد تنفيذ العميل (لكل من عملاء التنفيذ والإجماع)، والبيئة (الأجهزة، والنظام)، ومعلمات إعدادات العميل.

سترشدك هذه الصفحة خلال هذه القرارات وتساعدك في العثور على الطريقة الأنسب لتشغيل مثيل Ethereum الخاص بك.

للاختيار من بين تطبيقات العملاء، راجع كل [عملاء التنفيذ](/developers/docs/nodes-and-clients/#execution-clients) الجاهزين للشبكة الرئيسية، و[عملاء الإجماع](/developers/docs/nodes-and-clients/#consensus-clients)، وتعرف على [تنوع العملاء](/developers/docs/nodes-and-clients/client-diversity).

قرر ما إذا كنت تريد تشغيل البرنامج على [أجهزتك الخاصة أو في السحابة](#local-vs-cloud)، مع مراعاة [متطلبات](#requirements) العملاء.

بعد إعداد البيئة، قم بتثبيت العملاء المختارين إما باستخدام [واجهة سهلة الاستخدام للمبتدئين](#automatized-setup) أو [يدويًا](#manual-setup) باستخدام محطة طرفية ذات خيارات متقدمة.

عندما تكون العقدة قيد التشغيل والمزامنة، تكون جاهزًا [لاستخدامها](#using-the-node)، ولكن تأكد من مراقبة [صيانتها](#operating-the-node).

![إعداد العميل](./diagram.png)

### البيئة والأجهزة {#environment-and-hardware}

#### محلي أم سحابي {#local-vs-cloud}

يمكن لعملاء Ethereum العمل على أجهزة الكمبيوتر المخصصة للمستهلكين ولا يحتاجون إلى أي أجهزة خاصة، مثل آلات التعدين على سبيل المثال. لذلك، لديك خيارات متنوعة لنشر العقدة بناءً على احتياجاتك.
للتبسيط، دعونا نفكر في تشغيل عقدة على كل من جهاز فعلي محلي وخادم سحابي:

- سحاب
  - يقدم الموفرون وقت تشغيل عالي للخادم وعناوين IP عامة ثابتة
  - يمكن أن يكون الحصول على خادم مخصص أو افتراضي أكثر راحة من إنشاء خادم خاص بك
  - المقايضة هي الثقة في طرف ثالث - مزود الخادم
  - نظرًا لحجم التخزين المطلوب للعقدة الكاملة، قد يرتفع سعر الخادم المستأجر
- الأجهزة الخاصة
  - نهج أكثر ثقة وسيادة
  - استثمار لمرة واحدة
  - خيار شراء الأجهزة التي تم تكوينها مسبقًا
  - يتعين عليك إعداد الجهاز والشبكة فعليًا وصيانتهما واستكشاف أخطاء الجهاز والشبكة وإصلاحها

يتمتع كلا الخيارين بمزايا مختلفة تم تلخيصها أعلاه. إذا كنت تبحث عن حل سحابي، فبالإضافة إلى العديد من موفري الحوسبة السحابية التقليديين، هناك أيضًا خدمات تركز على نشر العقد. تحقق من [العُقد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service/) لمزيد من الخيارات حول العُقد المستضافة.

#### الأجهزة {#hardware}

ومع ذلك، لا ينبغي للشبكة اللامركزية المقاومة للرقابة أن تعتمد على موفري الخدمات السحابية. وبدلاً من ذلك، يعد تشغيل عقدتك على أجهزتك المحلية أكثر صحة للنظام البيئي. تظهر [التقديرات](https://www.ethernodes.org/networkType/cl/Hosting) أن حصة كبيرة من العُقد تعمل على السحابة، والتي يمكن أن تصبح نقطة فشل واحدة.

يمكن لعملاء Ethereum العمل على جهاز الكمبيوتر الخاص بك، أو الكمبيوتر المحمول، أو الخادم، أو حتى جهاز كمبيوتر واحد. في حين أنه من الممكن تشغيل العملاء على جهاز الكمبيوتر الشخصي الخاص بك، فإن وجود جهاز مخصص للعقدة الخاصة بك فقط يمكن أن يؤدي إلى تحسين أدائه وأمانه بشكل كبير مع تقليل التأثير على جهاز الكمبيوتر الأساسي الخاص بك.

يمكن أن يكون استخدام أجهزتك الخاصة أمرًا سهلاً للغاية. هناك العديد من الخيارات البسيطة بالإضافة إلى الإعدادات المتقدمة لمزيد من الأشخاص التقنيين. هناك العديد من الخيارات الصغيرة بالإضافة إلى التكيف المتقدم للأشخاص التقنيين.

#### المتطلبات {#requirements}

تختلف متطلبات الأجهزة حسب العميل ولكنها بشكل عام ليست عالية نظرًا لأن العقدة تحتاج فقط إلى البقاء متزامنة. لا تخلط بينه وبين التعدين، الذي يتطلب المزيد من القوة الحاسوبية. لا تخلط بينه وبين التجريم، الذي يتطلب المزيد من القوة البدنية.

قبل تثبيت أي عميل، يرجى التأكد من أن جهاز الكمبيوتر الخاص بك لديه موارد كافية لتشغيله. يمكنك العثور على الحد الأدنى والمتطلبات الموصى بها أدناه.

إن عنق الزجاجة لجهازك هو في الغالب مساحة القرص. تعد مزامنة blockchain الخاصة بـ Ethereum عملية مكثفة للغاية للإدخال / الإخراج وتتطلب مساحة كبيرة. من الأفضل أن يكون لديك **محرك أقراص ذو حالة صلبة (SSD)** بمئات الجيجا بايت من المساحة الخالية المتبقية حتى بعد المزامنة.

يعتمد حجم قاعدة البيانات وسرعة المزامنة الأولية على العميل المختار وتكوينه و[استراتيجية المزامنة](/developers/docs/nodes-and-clients/#sync-modes).

تأكد أيضًا من أن اتصالك بالإنترنت غير محدود بـ[سقف للنطاق الترددي](https://wikipedia.org/wiki/Data_cap). يوصى باستخدام اتصال غير محدود نظرًا لأن المزامنة الأولية والبيانات التي يتم بثها إلى الشبكة قد تتجاوز الحد المسموح به.

##### نظام التشغيل

يدعم جميع العملاء أنظمة التشغيل الرئيسية - Linux وMacOS وWindows. هذا يعني أنه يمكنك تشغيل العقد على أجهزة سطح المكتب أو أجهزة الخادم العادية باستخدام نظام التشغيل (OS) الذي يناسبك بشكل أفضل. تأكد من تحديث نظام التشغيل لديك لتجنب المشكلات المحتملة والثغرات الأمنية.

##### الحد الأدنى من المتطلبات

- وحدة المعالجة المركزية مع 2+ النوى
- 8 جيجا رام
- 2 تيرابايت اس اس دي
- عرض النطاق الترددي 10+ ميجابت/ثانية

##### المواصفات الموصى بها

- وحدة معالجة مركزية سريعة تحتوي على أكثر من 4 أنوية
- 16 جيجابايت رام
- SSD سريع بسعة 2 تيرابايت
- عرض النطاق الترددي 25+ ميجابت/ثانية

سيؤثر وضع المزامنة والعميل الذي تختاره على متطلبات المساحة، ولكننا قمنا بتقدير مساحة القرص التي ستحتاجها لكل عميل أدناه.

| عميل     | حجم القرص (مزامنة مبكرة) | حجم القرص (أرشيف كامل) |
| -------- | ------------------------------------------- | ----------------------------------------- |
| يبوس     | 800 جيجابايت+                               | 12 تيرابايت+                              |
| أيزيغون  | لا يوجد                                     | 2.5 تيرابايت+             |
| جيث      | 500 جيجابايت+                               | 12 تيرابايت+                              |
| نورماندي | 500 جيجابايت+                               | 12 تيرابايت+                              |
| ريث      | لا يوجد                                     | 2.2 تيرابايت+             |

- ملاحظة: لا توفر Erigon وReth المزامنة السريعة، ولكن التقليم الكامل ممكن (حوالي 2 تيرابايت لـ Erigon، ~1.2 تيرابايت لـ Reth)

بالنسبة لعملاء الإجماع، تعتمد متطلبات المساحة أيضًا على تطبيق العميل والميزات المُمكَّنة (على سبيل المثال، slasher للمدققين) ولكن بشكل عام، يتم حساب 200 جيجابايت إضافية مطلوبة لبيانات المنارة. مع وجود عدد كبير من أدوات التحقق من الصحة، ينمو حمل النطاق الترددي أيضًا. يمكنك العثور على [تفاصيل حول متطلبات عميل الإجماع في هذا التحليل](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### حلول التوصيل والتشغيل {#plug-and-play}

الخيار الأسهل لتشغيل عقدة باستخدام أجهزتك الخاصة هو استخدام صناديق التوصيل والتشغيل. توفر الأجهزة التي تم تكوينها مسبقًا من الموردين التجربة الأكثر وضوحًا: الطلب والاتصال والتشغيل. يتم تكوين كل شيء مسبقًا ويتم تشغيله تلقائيًا باستخدام دليل سهل الاستخدام ولوحة معلومات لمراقبة البرنامج والتحكم فيه.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### إيثريوم على حاسوب أحادي اللوحة {#ethereum-on-a-single-board-computer}

إحدى الطرق السهلة والرخيصة لتشغيل عقدة إيثريوم هي استخدام حاسوب واحد، حتى مع بنية ARM مثل Raspberry Pi. يوفر [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) صورًا سهلة التشغيل للعديد من عملاء التنفيذ والإجماع لـ Raspberry Pi ولوحات ARM الأخرى.

تعتبر الأجهزة الصغيرة وبأسعار معقولة وفعالة مثل هذه مثالية لتشغيل عقدة في المنزل ولكن ضع في اعتبارك أدائها المحدود.

## تشغيل العقدة {#spinning-up-node}

يمكن إجراء الإعداد الفعلي للعميل إما باستخدام المشغلات الآلية أو يدويًا، وإعداد برنامج العميل مباشرةً.

بالنسبة للمستخدمين الأقل تقدمًا، فإن الأسلوب الموصى به هو استخدام المشغل، وهو برنامج يرشدك خلال عملية التثبيت ويقوم بأتمتة عملية إعداد العميل. ومع ذلك، إذا كانت لديك بعض الخبرة في استخدام الجهاز الطرفي، فيجب أن تكون خطوات الإعداد اليدوي سهلة المتابعة.

### إعداد موجه {#automatized-setup}

تهدف المشاريع المتعددة سهلة الاستخدام إلى تحسين تجربة إعداد العميل. توفر هذه المشغلات التثبيت والتكوين التلقائي للعميل، حتى أن بعضها يقدم واجهة رسومية للإعداد الموجه ومراقبة العملاء.

فيما يلي بعض المشاريع التي يمكن أن تساعدك في تثبيت العملاء والتحكم بهم ببضع نقرات فقط:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - لا يأتي DappNode فقط مع جهاز من بائع. يمكن استخدام البرنامج ومشغل العقدة الفعلي ومركز التحكم مع العديد من الميزات على أجهزة عشوائية.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - أسرع وأسهل طريقة لإعداد عقدة كاملة. أداة إعداد مكونة من سطر واحد وواجهة مستخدم لإدارة العقد. مجانا مفتوح المصدر. السلع العامة لعملة الإيثريوم من قبل المشاركين المنفردين. دعم ARM64 و AMD64.
- [eth-docker](https://eth-docker.net/) - إعداد آلي باستخدام Docker يركز على تجميد العملات السهل والآمن، ويتطلب معرفة أساسية بالمحطة الطرفية و Docker، ويوصى به للمستخدمين الأكثر تقدمًا.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - مشغل لتثبيت العملاء على خادم بعيد عبر اتصال SSH مع دليل إعداد واجهة المستخدم الرسومية، ومركز تحكم، والعديد من الميزات الأخرى.
- [NiceNode](https://www.nicenode.xyz/) - مشغل ذو تجربة مستخدم مباشرة لتشغيل عقدة على جهاز الكمبيوتر الخاص بك. ما عليك سوى اختيار العملاء وبدء التعامل معهم ببضع نقرات. لا تزال في التنمية.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - أداة إعداد عقدة تقوم تلقائيًا بإنشاء تكوين Docker باستخدام معالج واجهة سطر الأوامر (CLI). كتبه Go بواسطة Nethermind.

### الإعداد اليدوي للعملاء {#manual-setup}

الخيار الآخر هو تنزيل برنامج العميل والتحقق منه وتكوينه يدويًا. حتى لو كان بعض العملاء يقدمون واجهة رسومية، فإن الإعداد اليدوي لا يزال يتطلب مهارات أساسية مع الجهاز ولكنه يوفر المزيد من التنوع.

كما هو موضح من قبل، سيتطلب إعداد عقدة Ethereum الخاصة بك تشغيل زوج من عملاء الإجماع والتنفيذ. قد يشتمل بعض العملاء على عميل خفيف من النوع الآخر ويقوم بالمزامنة دون الحاجة إلى أي برامج أخرى. ومع ذلك، يتطلب التحقق الكامل من الثقة عدم وجود كلا التطبيقين.

#### الحصول على برنامج العميل {#getting-the-client}

أولاً، تحتاج إلى الحصول على برنامج [عميل التنفيذ](/developers/docs/nodes-and-clients/#execution-clients) وبرنامج [عميل الإجماع](/developers/docs/nodes-and-clients/#consensus-clients) المفضلين لديك.

يمكنك ببساطة تنزيل تطبيق قابل للتنفيذ أو حزمة تثبيت تناسب نظام التشغيل والهندسة المعمارية لديك. تحقق دائمًا من التوقيعات والمجاميع الاختبارية للحزم التي تم تنزيلها. يقدم بعض العملاء أيضًا مستودعات أو صور Docker لتسهيل التثبيت والتحديثات. جميع العملاء مفتوحي المصدر، لذا يمكنك أيضًا بنائهم من المصدر. هذه طريقة أكثر تقدمًا، ولكن في بعض الحالات، قد تكون مطلوبة.

تتوفر تعليمات تثبيت كل عميل في الوثائق المرتبطة بقوائم العملاء أعلاه.

فيما يلي صفحات الإصدار الخاصة بالعملاء حيث يمكنك العثور على الثنائيات المعدة مسبقًا أو تعليمات التثبيت:

##### عملاء تنفيذ

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

تجدر الإشارة أيضًا إلى أن تنوع العملاء يمثل [مشكلة في طبقة التنفيذ](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). من المستحسن أن يفكر القراء في تشغيل عميل تنفيذ أقلية.

##### عملاء الإجماع

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source) (لا يوفر ملفًا ثنائيًا مسبق الصنع، فقط صورة Docker أو يتم بناؤه من المصدر)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [بريسم](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[تنوع العملاء](/developers/docs/nodes-and-clients/client-diversity/) أمر بالغ الأهمية لعُقد الإجماع التي تشغل المدققين. إذا كانت غالبية أدوات التحقق من الصحة تقوم بتشغيل تطبيق عميل واحد، فإن أمان الشبكة يكون في خطر. ولذلك فمن المستحسن النظر في اختيار عميل الأقلية.

[اطلع على أحدث استخدام لعملاء الشبكة](https://clientdiversity.org/) وتعرف على المزيد حول [تنوع العملاء](/developers/docs/nodes-and-clients/client-diversity).

##### التحقق من البرنامج

عند تنزيل البرنامج من الإنترنت، يوصى بالتحقق من سلامته. هذه الخطوة اختيارية ولكن خاصة مع قطعة البنية التحتية المهمة مثل عميل Ethereum، من المهم أن تكون على دراية بنواقل الهجوم المحتملة وتجنبها. إذا قمت بتنزيل ملف ثنائي تم إنشاؤه مسبقًا، فأنت بحاجة إلى الوثوق به والمخاطرة بأن يقوم المهاجم باستبدال الملف القابل للتنفيذ بملف ضار.

يقوم المطورون بتوقيع الثنائيات التي تم إصدارها باستخدام مفاتيح PGP الخاصة بهم حتى تتمكن من التحقق بشكل مشفر من أنك تقوم بتشغيل البرنامج الذي قاموا بإنشائه بالضبط. تحتاج فقط إلى الحصول على المفاتيح العامة التي يستخدمها المطورون، والتي يمكن العثور عليها في صفحات إصدار العميل أو في الوثائق. بعد تنزيل إصدار العميل وتوقيعه، يمكنك استخدام تطبيق PGP، على سبيل المثال، [GnuPG](https://gnupg.org/download/index.html) للتحقق منها بسهولة. اطلع على برنامج تعليمي حول التحقق من البرامج مفتوحة المصدر باستخدام `gpg` على [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) أو [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

شكل آخر من أشكال التحقق هو التأكد من أن التجزئة، وهي بصمة تشفير فريدة من نوعها، للبرنامج الذي قمت بتنزيله تتطابق مع تلك التي يقدمها المطورون. وهذا أسهل من استخدام PGP، وبعض العملاء يقدمون هذا الخيار فقط. ما عليك سوى تشغيل وظيفة التجزئة على البرنامج الذي تم تنزيله ومقارنتها بتلك الموجودة في صفحة الإصدار. على سبيل المثال:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### إعداد العميل {#client-setup}

بعد تثبيت برنامج العميل أو تنزيله أو تجميعه، تكون جاهزًا لتشغيله. هذا يعني فقط أنه يجب تنفيذه بالتكوين المناسب. يقدم العملاء خيارات تكوين غنية يمكنها تمكين ميزات متنوعة.

لنبدأ بالخيارات التي يمكن أن تؤثر بشكل كبير على أداء العميل واستخدام البيانات. تمثل [أوضاع المزامنة](/developers/docs/nodes-and-clients/#sync-modes) طرقًا مختلفة لتنزيل بيانات البلوكتشين والتحقق من صحتها. قبل بدء العقدة، يجب عليك تحديد الشبكة ووضع المزامنة الذي تريد استخدامه. أهم الأشياء التي يجب مراعاتها هي مساحة القرص ووقت المزامنة الذي سيحتاجه العميل. انتبه إلى مستندات العميل لتحديد وضع المزامنة الافتراضي. إذا لم يناسبك ذلك، فاختر خيارًا آخر بناءً على مستوى الأمان والبيانات المتاحة والتكلفة. وبصرف النظر عن خوارزمية المزامنة، يمكنك أيضًا ضبط تقليم أنواع مختلفة من البيانات القديمة. يمكّن التقليم من حذف البيانات القديمة، أي إزالة عُقد شجرة الحالة التي لا يمكن الوصول إليها من الكتل الحديثة.

خيارات التكوين الأساسية الأخرى هي، على سبيل المثال، اختيار شبكة - الشبكة الرئيسية أو شبكات الاختبار، وتمكين نقطة نهاية HTTP لـ RPC أو WebSockets، وما إلى ذلك. يمكنك العثور على جميع الميزات والخيارات في وثائق العميل. يمكن تعيين تكوينات العميل المختلفة عن طريق تنفيذ العميل باستخدام العلامات المقابلة مباشرةً في سطر الأوامر أو ملف التكوين. يختلف كل عميل قليلاً؛ يرجى الرجوع دائمًا إلى الوثائق الرسمية أو صفحة المساعدة للحصول على تفاصيل حول خيارات التكوين.

لأغراض الاختبار، قد تفضل تشغيل عميل على إحدى شبكات testnet. [اطلع على نظرة عامة على الشبكات المدعومة](/developers/docs/nodes-and-clients/#execution-clients).

يمكن العثور على أمثلة لتشغيل عملاء التنفيذ بالتكوين الأساسي في القسم التالي.

#### بدء تشغيل عميل التنفيذ {#starting-the-execution-client}

قبل بدء تشغيل برنامج عميل Ethereum، قم بإجراء فحص أخير للتأكد من أن البيئة الخاصة بك جاهزة. على سبيل المثال، تأكد من:

- توجد مساحة كافية على القرص مع الأخذ في الاعتبار وضع الشبكة والمزامنة المختار.
- لا يتم إيقاف الذاكرة ووحدة المعالجة المركزية بواسطة البرامج الأخرى.
- يتم تحديث نظام التشغيل إلى الإصدار الأحدث.
- النظام لديه الوقت والتاريخ الصحيحين.
- يقبل جهاز التوجيه وجدار الحماية لديك الاتصالات على منافذ الاستماع. افتراضيًا، يستخدم عملاء Ethereum منفذ مستمع (TCP) ومنفذ اكتشاف (UDP)، وكلاهما على 30303 افتراضيًا.

قم بتشغيل عميلك على شبكة الاختبار أولاً للمساعدة في التأكد من أن كل شيء يعمل بشكل صحيح.

يجب عليك الإعلان عن أي إعدادات عميل ليست افتراضية في البداية. يمكنك استخدام العلامات أو ملف التكوين للإعلان عن التكوين المفضل لديك. تختلف مجموعة الميزات وبناء جملة التكوين لكل عميل. تحقق من وثائق العميل الخاص بك للحصول على التفاصيل.

يتواصل عملاء التنفيذ والإجماع عبر نقطة نهاية مصادق عليها ومحددة في [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). من أجل الاتصال بعميل الإجماع، يجب على عميل التنفيذ إنشاء [`jwtsecret`](https://jwt.io/) في مسار معروف. لأسباب تتعلق بالأمان والاستقرار، يجب أن يعمل العملاء على نفس الجهاز، ويجب أن يعرف كلا العميلين هذا المسار لأنه يُستخدم لمصادقة اتصال RPC المحلي بينهما. يجب على عميل التنفيذ أيضًا تحديد منفذ استماع لواجهات برمجة التطبيقات المصادق عليها.

يتم إنشاء هذا الرمز المميز تلقائيًا بواسطة برنامج العميل، ولكن في بعض الحالات، قد تحتاج إلى القيام بذلك بنفسك. يمكنك إنشاؤه باستخدام [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### تشغيل عميل التنفيذ {#running-an-execution-client}

سيرشدك هذا القسم خلال بدء عملاء التنفيذ. إنه فقط بمثابة مثال للتكوين الأساسي، والذي سيبدأ العميل بهذه الإعدادات:

- يحدد الشبكة المراد الاتصال بها، Mainnet في الأمثلة لدينا
  - يمكنك بدلاً من ذلك اختيار [إحدى شبكات الاختبار](/developers/docs/networks/) للاختبار الأولي لإعدادك
- يحدد دليل البيانات، حيث سيتم تخزين كافة البيانات بما في ذلك blockchain
  - تأكد من استبدال المسار بمسار حقيقي، على سبيل المثال، يشير إلى محرك الأقراص الخارجي الخاص بك
- تمكين واجهات التواصل مع العميل
  - بما في ذلك JSON-RPC وEngine API للتواصل مع العميل المتوافق
- يحدد المسار إلى `jwtsecret` لواجهة برمجة التطبيقات المصادق عليها
  - تأكد من استبدال مسار المثال بمسار حقيقي يمكن للعملاء الوصول إليه، على سبيل المثال، `/tmp/jwtsecret`

يرجى الأخذ في الاعتبار أن هذا مجرد مثال أساسي، وسيتم ضبط جميع الإعدادات الأخرى على الوضع الافتراضي. انتبه إلى وثائق كل عميل للتعرف على القيم والإعدادات والميزات الافتراضية. ولا تنسى تسجيل كل عميل على القيم والإعدادات والميزات الافتراضية.

> لاحظ أن الشرطات المائلة العكسية `\` في الأمثلة هي لأغراض التنسيق فقط؛ يمكن تعريف علامات التكوين في سطر واحد.

##### Running Besu

يبدأ هذا المثال Besu على الشبكة الرئيسية، ويخزن بيانات البلوكتشين بالتنسيق الافتراضي في `/data/ethereum`، ويمكّن JSON-RPC و Engine RPC لتوصيل عميل الإجماع. تتم مصادقة Engine API باستخدام الرمز `jwtsecret` ولا يُسمح إلا بالمكالمات من `localhost`.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

يأتي Besu أيضًا مزودًا بخيار التشغيل الذي سيطرح سلسلة من الأسئلة وينشئ ملف التكوين. قم بتشغيل المشغل التفاعلي باستخدام:

```sh
besu --Xlauncher
```

يحتوي [توثيق Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) على خيارات إضافية وتفاصيل تكوين.

##### تشغيل ايريجون

يبدأ هذا المثال Erigon على الشبكة الرئيسية، ويخزن بيانات البلوكتشين في `/data/ethereum`، ويمكّن JSON-RPC، ويحدد مساحات الأسماء المسموح بها، ويمكّن المصادقة لتوصيل عميل الإجماع المحدد بواسطة مسار `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

يقوم Erigon افتراضيًا بإجراء مزامنة كاملة مع محرك أقراص ثابتة سعة 8 جيجابايت مما سيؤدي إلى تخزين أكثر من 2 تيرابايت من بيانات الأرشيف. تأكد من أن `datadir` يشير إلى قرص به مساحة خالية كافية أو انظر إلى علامة `--prune` التي يمكنها تقليم أنواع مختلفة من البيانات. تحقق من `--help` الخاص بـ Erigon لمعرفة المزيد.

##### تشغيل جيث

يبدأ هذا المثال Geth على الشبكة الرئيسية، ويخزن بيانات البلوكتشين في `/data/ethereum`، ويمكّن JSON-RPC ويحدد مساحات الأسماء المسموح بها. كما أنه يمكّن المصادقة لتوصيل عميل الإجماع الذي يتطلب مسارًا إلى `jwtsecret` وأيضًا خيارًا يحدد الاتصالات المسموح بها، في مثالنا فقط من `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

[تحقق من المستندات لجميع خيارات التكوين](https://geth.ethereum.org/docs/fundamentals/command-line-options) وتعرف على المزيد حول [تشغيل Geth مع عميل إجماع](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### تشغيل نيذرمايند

يقدم Nethermind [خيارات تثبيت](https://docs.nethermind.io/get-started/installing-nethermind) متنوعة. تأتي الحزمة مع العديد من الثنائيات، بما في ذلك Launcher مع إعداد موجه، والذي سيساعدك على إنشاء التكوين بشكل تفاعلي. وبدلاً من ذلك، يمكنك العثور على Runner وهو الملف القابل للتنفيذ بحد ذاته ويمكنك فقط تشغيله باستخدام إشارات التكوين. يتم تمكين JSON-RPC بشكل افتراضي.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

تقدم مستندات Nethermind [دليلاً كاملاً](https://docs.nethermind.io/get-started/running-node/) حول تشغيل Nethermind مع عميل إجماع.

سيبدأ عميل التنفيذ وظائفه الأساسية، ونقاط النهاية المختارة، ويبدأ في البحث عن أقرانه بعد اكتشاف الأقران بنجاح، يبدأ العميل في المزامنة. سينتظر عميل التنفيذ اتصالاً من عميل الإجماع. ستكون بيانات blockchain الحالية متاحة بمجرد مزامنة العميل بنجاح مع الحالة الحالية.

##### تشغيل ريث

يبدأ هذا المثال Eth على Mainnet، باستخدام موقع البيانات الافتراضي. يمكّن مصادقة JSON-RPC و Engine RPC لتوصيل عميل الإجماع المحدد بواسطة مسار `jwtsecret`، مع السماح فقط بالمكالمات من `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

اطلع على [تكوين Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) لمعرفة المزيد حول دلائل البيانات الافتراضية. يحتوي [توثيق Reth](https://reth.rs/run/mainnet.html) على خيارات إضافية وتفاصيل تكوين.

#### بدء تشغيل عميل الإجماع {#starting-the-consensus-client}

يجب أن يبدأ عميل الإجماع بتكوين المنفذ الصحيح لتأسيس اتصال RPC محلي بعميل التنفيذ. يجب تشغيل عملاء الإجماع باستخدام منفذ عميل التنفيذ المكشوف كوسيطة تكوين.

يحتاج عميل الإجماع أيضًا إلى مسار `jwt-secret` الخاص بعميل التنفيذ من أجل مصادقة اتصال RPC بينهما. كما هو الحال في أمثلة التنفيذ المذكورة أعلاه، يمتلك كل عميل إجماع علامة تكوين تأخذ مسار ملف الرمز المميز jwt كوسيطة. يجب أن يكون هذا متسقًا مع مسار `jwtsecret` المقدم لعميل التنفيذ.

يجب أن يكون هذا متسقًا مع المسار السري لـ jwt مقدمة لعميل التنفيذ. هذا هو المكان الذي تتراكم فيه مكافآت الأثير للمدقق الخاص بك. كل عميل إجماع لديه خيار، على سبيل المثال، `--suggested-fee-recipient=0xabcd1`، يأخذ عنوان إيثريوم كوسيطة.

عند بدء تشغيل عقدة منارة على شبكة اختبار، يمكنك توفير وقت مزامنة كبير باستخدام نقطة نهاية عامة لـ [مزامنة نقطة التحقق](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### تشغيل عميل إجماع {#running-a-consensus-client}

##### تشغيل المنارة

قبل تشغيل Lighthouse، تعرف على المزيد حول كيفية تثبيته وتكوينه في [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### تشغيل لودستار

قم بتثبيت برنامج Lodestar عن طريق تجميعه أو تنزيل صورة Docker. تعرف على المزيد في [المستندات](https://chainsafe.github.io/lodestar/) و[دليل الإعداد](https://hackmd.io/@philknows/rk5cDvKmK) الأكثر شمولاً.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### تشغيل نيمبوس

يأتي Nimbus مع عملاء الإجماع والتنفيذ. يمكن تشغيله على أجهزة مختلفة حتى مع قوة حاسوبية متواضعة للغاية.
بعد [تثبيت التبعيات و Nimbus نفسه](https://nimbus.guide/quick-start.html)، يمكنك تشغيل عميل الإجماع الخاص به:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### تشغيل بريزم

يأتي Prysm مع برنامج نصي يسمح بالتثبيت التلقائي السهل. يمكن العثور على التفاصيل في [مستندات بريسم](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### تشغيل تيكو

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

عندما يتصل عميل الإجماع بعميل التنفيذ لقراءة عقد الإيداع وتحديد المدققين، فإنه يتصل أيضًا بأقران Beacon Node الآخرين ويبدأ في مزامنة فتحات الإجماع من البداية. بمجرد وصول عقدة المنارة إلى العصر الحالي، تصبح واجهة برمجة تطبيقات المنارة قابلة للاستخدام من قبل المدققين لديك. تعرف على المزيد حول [واجهات برمجة تطبيقات عقدة المنارة](https://eth2docs.vercel.app/).

### إضافة المدققين {#adding-validators}

A consensus client serves as a Beacon Node for validators to connect. Each consensus client has its own validator software described in detail in its respective documentation.

يتيح لك تشغيل المدقق الخاص بك [تجميد العملات الفردي](/staking/solo/)، وهي الطريقة الأكثر تأثيرًا وغير القائمة على الثقة لدعم شبكة إيثريوم. However, this requires a deposit of 32 ETH. لتشغيل مدقق على عقدتك الخاصة بمبلغ أصغر، قد يثير اهتمامك مجمع لامركزي مع مشغلي عُقد لا يحتاجون إلى إذن، مثل [Rocket Pool](https://rocketpool.net/node-operators).

أسهل طريقة للبدء في تجميد العملات وإنشاء مفتاح المدقق هي استخدام [منصة تشغيل تجميد عملات شبكة اختبار Hoodi](https://hoodi.launchpad.ethereum.org/)، والتي تتيح لك اختبار إعدادك عن طريق [تشغيل العُقد على Hoodi](https://notes.ethereum.org/@launchpad/hoodi). عندما تكون جاهزًا للشبكة الرئيسية، يمكنك تكرار هذه الخطوات باستخدام [منصة تشغيل تجميد العملات على الشبكة الرئيسية](https://launchpad.ethereum.org/).

اطلع على [صفحة تجميد العملات](/staking) للحصول على نظرة عامة حول خيارات تجميد العملات.

### استخدام العقدة {#using-the-node}

يقدم عملاء التنفيذ [نقاط نهاية لواجهة برمجة تطبيقات RPC](/developers/docs/apis/json-rpc/) التي يمكنك استخدامها لإرسال المعاملات أو التفاعل مع العقود الذكية أو نشرها على شبكة إيثريوم بطرق مختلفة:

- استدعاؤها يدويًا باستخدام بروتوكول مناسب (على سبيل المثال، باستخدام `curl`)
- إرفاق وحدة تحكم متوفرة (على سبيل المثال، `geth attach`)
- تنفيذها في التطبيقات باستخدام مكتبات web3، على سبيل المثال، [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview)، [ethers](https://github.com/ethers-io/ethers.js/)

Different clients have different implementations of the RPC endpoints. But there is a standard JSON-RPC which you can use with every client. للحصول على نظرة عامة [اقرأ مستندات JSON-RPC](/developers/docs/apis/json-rpc/). Applications that need information from the Ethereum network can use this RPC. على سبيل المثال، تتيح لك محفظة MetaMask الشهيرة [الاتصال بنقطة نهاية RPC الخاصة بك](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) والتي تتمتع بفوائد قوية للخصوصية والأمان.

يكشف جميع عملاء الإجماع عن [واجهة برمجة تطبيقات المنارة](https://ethereum.github.io/beacon-APIs) التي يمكن استخدامها للتحقق من حالة عميل الإجماع أو تنزيل الكتل وبيانات الإجماع عن طريق إرسال الطلبات باستخدام أدوات مثل [Curl](https://curl.se). More information on this can be found in the documentation for each consensus client.

#### الوصول إلى RPC {#reaching-rpc}

المنفذ الافتراضي لـ JSON-RPC لعميل التنفيذ هو `8545` ولكن يمكنك تعديل منافذ نقاط النهاية المحلية في التكوين. By default, the RPC interface is only reachable on the localhost of your computer. لجعله قابلاً للوصول عن بُعد، قد ترغب في عرضه للعامة عن طريق تغيير العنوان إلى `0.0.0.0`. This will make it reachable over local network and public IP addresses. In most cases you'll also need to set up port forwarding on your router.

Approach exposing ports to the internet with caution as this will let anyone on the internet control your node. Malicious actors could access your node to bring down your system or steal your funds if you're using your client as a wallet.

A way around this is to prevent potentially harmful RPC methods from being modifiable. على سبيل المثال، مع Geth، يمكنك الإعلان عن طرق قابلة للتعديل باستخدام علامة: `--http.api web3,eth,txpool`.

Access to the RPC interface can be extended through the development of edge layer APIs or web server applications, like Nginx, and connecting them to your client's local address and port. يمكن أن يتيح الاستفادة من طبقة وسيطة أيضًا للمطورين القدرة على إعداد شهادة لاتصالات `https` الآمنة بواجهة RPC.

Setting up a web server, a proxy, or external facing Rest API is not the only way to provide access to the RPC endpoint of your node. هناك طريقة أخرى للحفاظ على الخصوصية لإعداد نقطة نهاية يمكن الوصول إليها بشكل عام وهي استضافة العقدة على خدمة onion الخاصة بك على [Tor](https://www.torproject.org/). This will let you reach the RPC outside your local network without a static public IP address or opened ports. However, using this configuration may only allow the RPC endpoint to be accessible via the Tor network which is not supported by all the applications and might result in connection issues.

للقيام بذلك، عليك إنشاء [خدمة onion](https://community.torproject.org/onion-services/) الخاصة بك. اطلع على [التوثيق](https://community.torproject.org/onion-services/setup/) حول إعداد خدمة onion لاستضافة خدمتك الخاصة. You can point it to a web server with proxy to the RPC port or just directly to the RPC.

Lastly, and one of the most popular ways to provide access to internal networks is through a VPN connection. Depending on your use case and the quantity of users needing access to your node, a secure VPN connection might be an option. [OpenVPN](https://openvpn.net/) هي شبكة VPN SSL كاملة الميزات تطبق امتداد شبكة آمن لطبقة OSI 2 أو 3 باستخدام بروتوكول SSL/TLS القياسي في الصناعة، وتدعم طرق مصادقة عملاء مرنة تعتمد على الشهادات والبطاقات الذكية و/أو بيانات اعتماد اسم المستخدم/كلمة المرور، وتسمح بسياسات التحكم في الوصول الخاصة بالمستخدم أو المجموعة باستخدام قواعد جدار الحماية المطبقة على واجهة VPN الافتراضية.

### تشغيل العقدة {#operating-the-node}

You should regularly monitor your node to make sure it's running properly. You may need to do occasional maintenance.

#### إبقاء العقدة متصلة بالإنترنت {#keeping-node-online}

Your node doesn't have to be online all the time, but you should keep it online as much as possible to keep it in sync with the network. You can shut it down to restart it, but keep in mind that:

- Shutting down can take a few minutes if the recent state is still being written on disk.
- Forced shut downs can damage the database requiring you to resync the entire node.
- Your client will go out of sync with the network and will need to resync when you restart it. While the node can begin syncing from were it was last shutdown, the process can take time depending on how long it has been offline.

_لا ينطبق هذا على عُقد مدقق طبقة الإجماع._ سيؤثر إيقاف تشغيل عقدتك على جميع الخدمات التي تعتمد عليها. إذا كنت تشغل عقدة لأغراض _تجميد العملات_ فيجب أن تحاول تقليل وقت التوقف عن العمل قدر الإمكان.

#### إنشاء خدمات العميل {#creating-client-services}

Consider creating a service to run your clients automatically on startup. على سبيل المثال، على خوادم Linux، من الممارسات الجيدة إنشاء خدمة، على سبيل المثال، باستخدام `systemd`، تقوم بتنفيذ العميل بالتكوين المناسب، تحت مستخدم بصلاحيات محدودة ويتم إعادة تشغيلها تلقائيًا.

#### تحديث العملاء {#updating-clients}

تحتاج إلى إبقاء برنامج العميل الخاص بك محدثًا بأحدث تصحيحات الأمان والميزات و[مقترحات تحسين الإيثريوم (EIPs)](/eips/). خاصة قبل [الانقسامات الكلية](/ethereum-forks/)، تأكد من أنك تشغل إصدارات العميل الصحيحة.

> قبل تحديثات الشبكة الهامة، تنشر EF منشورًا على [مدونتها](https://blog.ethereum.org). يمكنك [الاشتراك في هذه الإعلانات](https://blog.ethereum.org/category/protocol#subscribe) لتلقي إشعار على بريدك عندما تحتاج عقدتك إلى تحديث.

Updating clients is very simple. Each client has specific instructions in their documentation, but the process is generally just to download the latest version and restart the client with the new executable. The client should pick up where it left off, but with the updates applied.

لكل تطبيق من العملاء نسخه من سلسلة قابلة للقراءة من البشر مستخدمة في بروتوكول النظير ولكن يمكن الوصول إليها أيضا من خط الأوامر. يتيح سلسلة الإصدار هذه للمستخدمين التحقق من أنهم يقومون بتشغيل الإصدار الصحيح ويسمح لمستكشفي الكتل وغيرها من الأدوات التحليلية المعنيه بتقدير توزيع عملاء معينين على الشبكة. الرجاء الرجوع إلى وثائق العميل الفردي للحصول على مزيد من المعلومات عن سلاسل الإصدار.

#### تشغيل خدمات إضافية {#running-additional-services}

تشغيل العقدة الخاصة بك يتيح لك استخدام الخدمات التي تتطلب الوصول المباشر إلى عميل إيثيريوم RPC. هذه هي الخدمات المبنية فوق إيثريوم مثل [حلول الطبقة الثانية](/developers/docs/scaling/#layer-2-scaling)، والواجهة الخلفية للمحافظ، ومستكشفات الكتل، وأدوات المطورين، وغيرها من البنية التحتية لإيثريوم.

#### مراقبة العقدة {#monitoring-the-node}

لمراقبة عقدتك بشكل صحيح، خذ بعين الاعتبار جمع القياسات. يوفر العملاء نقاط نهاية قياسية حتى تتمكن من الحصول على بيانات شاملة عن عقدتك. استخدم أدوات مثل [InfluxDB](https://www.influxdata.com/get-influxdb/) أو [Prometheus](https://prometheus.io/) لإنشاء قواعد بيانات يمكنك تحويلها إلى تصورات ومخططات في برامج مثل [Grafana](https://grafana.com/). هناك العديد من الإعدادات لاستخدام هذا البرنامج ولوحات تحكم مختلفة لـ Grafana من أجل تصور عقداتك والشبكة ككل. على سبيل المثال، تحقق من [البرنامج التعليمي حول مراقبة Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

كجزء من مراقبتك، تأكد من إبقاء العين على أداء الآله. أثناء المزامنة الأولية لعقدتك، قد يكون برنامج العميل ثقيلاً جداً على وحدة المعالجة المركزية وذاكرة الوصول العشوائي. بالإضافة إلى Grafana، يمكنك استخدام الأدوات التي يقدمها نظام التشغيل الخاص بك مثل `htop` أو `uptime` للقيام بذلك.

## قراءة إضافية{#further-reading}

- [أدلة تجميد عملات إيثريوم](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat، يتم تحديثها كثيرًا_
- [دليل | كيفية إعداد مدقق لتجميد عملات إيثريوم على الشبكة الرئيسية](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew، يتم تحديثه كثيرًا_
- [أدلة ETHStaker حول تشغيل المدققين على شبكات الاختبار](https://github.com/remyroy/ethstaker#guides) – _ETHStaker، يتم تحديثها بانتظام_
- [نموذج تطبيق AWS Blockchain Node Runner لعُقد إيثريوم](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS، يتم تحديثه كثيرًا_
- [الأسئلة الشائعة حول الدمج لمشغلي العُقد](https://notes.ethereum.org/@launchpad/node-faq-merge) - _يوليو 2022_
- [تحليل متطلبات الأجهزة لتكون عقدة إيثريوم كاملة ومُصادَق عليها](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau، 24 سبتمبر 2018_
- [تشغيل عقد إيثريوم كاملة: دليل لأصحاب الدوافع الضعيفة](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– جاستن لورو، 7 نوفمبر 2019_
- [تشغيل عقدة Hyperledger Besu على شبكة إيثريوم الرئيسية: الفوائد والمتطلبات والإعداد](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi، 7 مايو 2020_
- [نشر عميل Nethermind Ethereum مع حزمة المراقبة](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth، 8 يوليو 2020_

## المواضيع ذات الصلة {#related-topics}

- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [الكتل](/developers/docs/blocks/)
- [الشبكات](/developers/docs/networks/)
