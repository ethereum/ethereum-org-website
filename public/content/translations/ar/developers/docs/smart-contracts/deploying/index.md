---
title: "نشر العقود الذكية"
description: "تعرف على كيفية نشر العقود الذكية على شبكات إيثيريوم، بما في ذلك المتطلبات الأساسية والأدوات وخطوات النشر."
lang: ar
---

تحتاج إلى نشر عقدك الذكي ليكون متاحًا لمستخدمي شبكة إيثيريوم.

لنشر عقد ذكي، ما عليك سوى إرسال معاملة إيثيريوم تحتوي على الكود المُصرّف للعقد الذكي دون تحديد أي مستلم.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم [شبكات إيثيريوم](/developers/docs/networks/)، و[المعاملات](/developers/docs/transactions/)، و[تشريح العقود الذكية](/developers/docs/smart-contracts/anatomy/) قبل نشر العقود الذكية.

يكلف نشر العقد أيضًا إيثر (<span dir="ltr">ETH</span>) نظرًا لأنه يتم تخزينه على سلسلة الكتل، لذا يجب أن تكون على دراية بـ [الغاز والرسوم](/developers/docs/gas/) على إيثيريوم.

أخيرًا، ستحتاج إلى تصريف عقدك قبل نشره، لذا تأكد من قراءة المزيد حول [تصريف العقود الذكية](/developers/docs/smart-contracts/compiling/).

## كيفية نشر عقد ذكي {#how-to-deploy-a-smart-contract}

### ما ستحتاج إليه {#what-youll-need}

- رمز البايت الخاص بعقدك – يتم إنشاؤه من خلال [التصريف](/developers/docs/smart-contracts/compiling/)
- <span dir="ltr">ETH</span> للغاز – ستقوم بتعيين حد الغاز الخاص بك مثل المعاملات الأخرى، لذا كن على دراية بأن نشر العقد يحتاج إلى غاز أكثر بكثير من مجرد تحويل <span dir="ltr">ETH</span> بسيط
- برنامج نصي للنشر أو مكون إضافي
- الوصول إلى [عقدة إيثيريوم](/developers/docs/nodes-and-clients/)، إما عن طريق تشغيل عقدتك الخاصة، أو الاتصال بعقدة عامة، أو عبر مفتاح <span dir="ltr">API</span> باستخدام [خدمة العقد](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### خطوات نشر عقد ذكي {#steps-to-deploy}

تعتمد الخطوات المحددة المتضمنة على إطار عمل التطوير المعني. على سبيل المثال، يمكنك التحقق من [وثائق Hardhat حول نشر عقودك](https://hardhat.org/docs/tutorial/deploying) أو [وثائق Foundry حول نشر والتحقق من عقد ذكي](https://book.getfoundry.sh/forge/deploying). بمجرد النشر، سيكون لعقدك عنوان إيثيريوم مثل [الحسابات](/developers/docs/accounts/) الأخرى ويمكن التحقق منه باستخدام [أدوات التحقق من كود المصدر](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## أدوات ذات صلة {#related-tools}

**Remix - _تسمح بيئة التطوير المتكاملة Remix بتطوير ونشر وإدارة العقود الذكية لسلاسل الكتل المشابهة لإيثيريوم_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _منصة تطوير Web3 توفر تصحيح الأخطاء، وقابلية الملاحظة، ولبنات بناء البنية التحتية لتطوير واختبار ومراقبة وتشغيل العقود الذكية_**

- [<span dir="ltr">tenderly.co</span>](https://tenderly.co/)
- [الوثائق](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [ديسكورد](https://discord.gg/eCWjuvt)

**Hardhat - _بيئة تطوير لتصريف ونشر واختبار وتصحيح أخطاء برمجيات إيثيريوم الخاصة بك_**

- [<span dir="ltr">hardhat.org</span>](https://hardhat.org/getting-started/)
- [وثائق حول نشر عقودك](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [ديسكورد](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _انشر أي عقد بسهولة على أي سلسلة متوافقة مع آلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>)، باستخدام أمر واحد_**

- [الوثائق](https://portal.thirdweb.com/deploy/)

**Crossmint - _منصة تطوير Web3 على مستوى المؤسسات لنشر العقود الذكية، وتمكين مدفوعات بطاقات الائتمان والمدفوعات عبر السلاسل، واستخدام واجهات برمجة التطبيقات (<span dir="ltr">APIs</span>) لإنشاء وتوزيع وبيع وتخزين وتعديل الرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>)._**

- [<span dir="ltr">crossmint.com</span>](https://www.crossmint.com)
- [الوثائق](https://docs.crossmint.com)
- [ديسكورد](https://discord.com/invite/crossmint)
- [المدونة](https://blog.crossmint.com)

## برامج تعليمية ذات صلة {#related-tutorials}

- [نشر عقدك الذكي الأول](/developers/tutorials/deploying-your-first-smart-contract/) _– مقدمة لنشر عقدك الذكي الأول على شبكة اختبار إيثيريوم._
- [مرحبًا بالعالم | برنامج تعليمي للعقود الذكية](/developers/tutorials/hello-world-smart-contract/) _– برنامج تعليمي سهل المتابعة لإنشاء ونشر عقد ذكي أساسي على إيثيريوم._
- [التفاعل مع العقود الأخرى من Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– كيفية نشر عقد ذكي من عقد موجود والتفاعل معه._
- [كيفية تقليص حجم عقدك](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- كيفية تقليل حجم عقدك لإبقائه تحت الحد المسموح به وتوفير الغاز_

## قراءة إضافية {#further-reading}

- [<span dir="ltr">https://docs.openzeppelin.com/learn/deploying-and-interacting</span>](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _أوبن زبلن_
- [نشر عقودك باستخدام Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_

## مواضيع ذات صلة {#related-topics}

- [أطر عمل التطوير](/developers/docs/frameworks/)
- [تشغيل عقدة إيثيريوم](/developers/docs/nodes-and-clients/run-a-node/)
- [العقد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service)