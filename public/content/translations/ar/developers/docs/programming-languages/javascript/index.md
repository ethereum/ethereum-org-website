---
title: "إثيريوم لمطوري جافا سكربت"
description: "تعرف على كيفية التطوير لصالح إثيريوم باستخدام مشروعات وأدوات قائمة على JavaScript."
lang: ar
---

تعد JavaScript من بين اللغات الأكثر شعبية في نظام Ethereum البيئي. في الواقع، هناك [فريق](https://github.com/ethereumjs) مخصص لجلب أكبر قدر ممكن من إيثريوم إلى JavaScript.

هناك فرص لكتابة JavaScript (أو شيء قريب منه) على [جميع مستويات الحزمة البرمجية](/developers/docs/ethereum-stack/).

## التفاعل مع إيثريوم {#interact-with-ethereum}

### مكتبات واجهة برمجة تطبيقات JavaScript {#javascript-api-libraries}

إذا كنت ترغب في كتابة JavaScript للاستعلام عن سلسلة الكتل (blockchain) وإرسال المعاملات والمزيد، فإن الطريقة الأكثر ملاءمة للقيام بذلك هي استخدام [مكتبة واجهة برمجة تطبيقات JavaScript](/developers/docs/apis/javascript/). تتيح واجهات برمجة التطبيقات هذه للمطورين التفاعل بسهولة مع [العُقَد الموجودة في شبكة إيثريوم](/developers/docs/nodes-and-clients/).

بإمكانك استخدام هذه المكتبات للتفاعل مع العقود الذكية على Ethereum، وبالتالي يصبح من الممكن إنشاء تطبيق لامركزي حيث تستخدم JavaScript فقط للتفاعل مع العقود الموجودة مسبقًا.

**اطّلع على**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _يشمل تنفيذ محفظة إيثريوم والأدوات المساعدة في JavaScript و TypeScript._
- [viem](https://viem.sh) – _واجهة TypeScript لإيثريوم توفر مكونات أساسية عديمة الحالة منخفضة المستوى للتفاعل مع إيثريوم._
- [Drift](https://ryangoree.github.io/drift/) – _مكتبة تعريفية لـ TypeScript مع تخزين مؤقت مدمج، وخطاطيف (hooks)، ومحاكيات اختبار لتطوير إيثريوم بسهولة عبر مكتبات web3._

### العقود الذكية {#smart-contracts}

إذا كنت مطور JavaScript وترغب في كتابة عقدك الذكي الخاص، فقد ترغب في التعرف على [Solidity](https://solidity.readthedocs.io). هذه هي لغة العقود الذكية الأكثر شيوعًا وهي مشابهة لـ JavaScript من حيث البنية النحوية، مما قد يجعل تعلمها أسهل

المزيد عن [العقود الذكية](/developers/docs/smart-contracts/).

## فهم البروتوكول {#understand-the-protocol}

### آلة إيثريوم الافتراضية {#the-ethereum-virtual-machine}

يوجد تنفيذ JavaScript لـ[آلة إيثريوم الافتراضية](/developers/docs/evm/). إنه يدعم أحدث قواعد الشوكة. تشير قواعد الشوكة إلى التغييرات التي تم إجراؤها على EVM نتيجة للترقيات المخطط لها.

يتم تقسيمه إلى حزم JavaScript مختلفة يمكنك التحقق منها لفهم أفضل:

- الحسابات
- الكتل
- blockchain نفسها
- المعاملات
- وغير ذلك...

سيساعدك هذا على فهم أشياء مثل "ما هو هيكل البيانات الخاص بالحساب؟".

إذا كنت تفضل قراءة التعليمات البرمجية، فقد يكون هذا JavaScript بديلاً رائعًا لقراءة مستنداتنا.

**اطّلع على آلة إيثريوم الافتراضية (EVM)**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### العُقَد والعملاء {#nodes-and-clients}

يعد عميل Ethereumjs قيد التطوير النشط الذي يسمح لك بالبحث في كيفية عمل عملاء Ethereum باللغة التي تفهمها؛ JavaScript!

**اطّلع على العميل**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## مشاريع أخرى {#other-projects}

There are also plenty of other things going on in the land of Ethereum JavaScript, including:

- مكتبات أدوات المحفظة.
- أدوات لإنشاء مفاتيح Ethereum واستيرادها وتصديرها.
- تنفيذ لـ `merkle-patricia-tree` – وهي بنية بيانات موضحة في الورقة الصفراء لإيثريوم.

تعمق في كل ما يثير اهتمامك في [مستودع EthereumJS](https://github.com/ethereumjs)

## قراءة إضافية{#further-reading}

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_
