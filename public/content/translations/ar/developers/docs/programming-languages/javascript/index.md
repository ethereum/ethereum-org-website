---
title: "إيثيريوم لمطوري ⁦JavaScript⁩"
description: "تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على ⁦JavaScript⁩."
lang: ar
---

تعد JavaScript من بين اللغات الأكثر شيوعًا في نظام إيثيريوم البيئي. في الواقع، هناك [فريق](https://github.com/ethereumjs) مخصص لجلب أكبر قدر ممكن من إيثيريوم إلى JavaScript.

هناك فرص لكتابة JavaScript (أو شيء قريب منها) في [جميع مستويات الحزمة](/developers/docs/ethereum-stack/).

## التفاعل مع إيثيريوم {#interact-with-ethereum}

### مكتبات <span dir="ltr">API</span> لـ JavaScript {#javascript-api-libraries}

إذا كنت ترغب في كتابة JavaScript للاستعلام عن سلسلة الكتل، وإرسال المعاملات والمزيد، فإن الطريقة الأكثر ملاءمة للقيام بذلك هي استخدام [مكتبة <span dir="ltr">API</span> لـ JavaScript](/developers/docs/apis/javascript/). تتيح واجهات <span dir="ltr">API</span> هذه للمطورين التفاعل بسهولة مع [العقد في شبكة إيثيريوم](/developers/docs/nodes-and-clients/).

يمكنك استخدام هذه المكتبات للتفاعل مع العقود الذكية على إيثيريوم، لذا من الممكن بناء تطبيق لامركزي (dapp) حيث تستخدم فقط JavaScript للتفاعل مع العقود الموجودة مسبقًا.

**تحقق من**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _تتضمن تنفيذ محفظة إيثيريوم وأدوات مساعدة في JavaScript وTypeScript._
- [viem](https://viem.sh) – _واجهة TypeScript لإيثيريوم توفر أساسيات منخفضة المستوى وعديمة الحالة للتفاعل مع إيثيريوم._
- [Drift](https://ryangoree.github.io/drift/) – _مكتبة وصفية لـ TypeScript مع تخزين مؤقت مدمج، وخطافات، ونماذج اختبار وهمية لتطوير إيثيريوم بسهولة عبر مكتبات Web3._

### العقود الذكية {#smart-contracts}

إذا كنت مطور JavaScript وترغب في كتابة عقد ذكي خاص بك، فقد ترغب في التعرف على [Solidity](https://solidity.readthedocs.io). هذه هي لغة العقود الذكية الأكثر شيوعًا وهي مشابهة نحويًا لـ JavaScript، مما قد يسهل تعلمها.

المزيد حول [العقود الذكية](/developers/docs/smart-contracts/).

## فهم البروتوكول {#understand-the-protocol}

### آلة إيثيريوم الافتراضية {#the-ethereum-virtual-machine}

يوجد تنفيذ بـ JavaScript لـ [آلة إيثيريوم الافتراضية](/developers/docs/evm/). وهو يدعم أحدث قواعد التفرع. تشير قواعد التفرع إلى التغييرات التي تم إجراؤها على آلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>) نتيجة للترقيات المخطط لها.

تم تقسيمها إلى حزم JavaScript مختلفة يمكنك التحقق منها لفهم أفضل:

- الحسابات
- الكتل
- سلسلة الكتل نفسها
- المعاملات
- والمزيد...

سيساعدك هذا على فهم أشياء مثل "ما هي بنية البيانات للحساب؟".

إذا كنت تفضل قراءة التعليمات البرمجية، فقد تكون JavaScript هذه بديلاً رائعًا لقراءة وثائقنا.

**تحقق من آلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>)**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### العقد والعملاء {#nodes-and-clients}

يوجد عميل EthereumJS قيد التطوير النشط يتيح لك التعمق في كيفية عمل عملاء إيثيريوم بلغة تفهمها؛ JavaScript!

**تحقق من العميل**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## مشاريع أخرى {#other-projects}

هناك أيضًا الكثير من الأشياء الأخرى التي تحدث في عالم إيثيريوم وJavaScript، بما في ذلك:

- مكتبات لأدوات المحفظة.
- أدوات لإنشاء واستيراد وتصدير مفاتيح إيثيريوم.
- تنفيذ لـ `merkle-patricia-tree` – وهي بنية بيانات موضحة في الورقة الصفراء لإيثيريوم.

تعمق في كل ما يثير اهتمامك أكثر في [مستودع EthereumJS](https://github.com/ethereumjs)

## قراءة إضافية {#further-reading}

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_