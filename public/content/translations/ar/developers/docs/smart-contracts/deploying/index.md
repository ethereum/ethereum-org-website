---
title: "توزيع العقود الذكيه"
description: "تعرف على كيفية نشر العقود الذكية على شبكات Ethereum، بما في ذلك المتطلبات الأساسية والأدوات وخطوات النشر"
lang: ar
---

تحتاج إلى نشر عقدك الذكي ليكون متاحًا لمستخدمي شبكة إيثريوم.

لنشر عقد ذكي، ما عليك سوى إرسال معاملة إيثريوم تحتوي على الكود المجمع للعقد الذكي دون تحديد أي مستلم.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم [شبكات إيثريوم](/developers/docs/networks/)، [والمعاملات](/developers/docs/transactions/) [وبنية العقود الذكية](/developers/docs/smart-contracts/anatomy/) قبل نشر العقود الذكية.

يكلف نشر العقد أيضًا الإيثر (ETH) حيث يتم تخزينه على البلوكتشين، لذا يجب أن تكون على دراية [بالغاز والرسوم](/developers/docs/gas/) على إيثريوم.

أخيرًا، ستحتاج إلى تجميع عقدك قبل نشره، لذا تأكد من أنك قرأت عن [تجميع العقود الذكية](/developers/docs/smart-contracts/compiling/).

## كيفية نشر عقد ذكي {#how-to-deploy-a-smart-contract}

### ما ستحتاج إليه {#what-youll-need}

- بايت كود عقدك - يتم إنشاؤه من خلال [التجميع](/developers/docs/smart-contracts/compiling/)
- ETH للغاز – ستحدد حد الغاز الخاص بك مثل المعاملات الأخرى، لذا كن على دراية بأن نشر العقد يحتاج إلى كمية أكبر بكثير من الغاز مقارنة بنقل ETH البسيط
- برنامج نصي للنشر أو البرنامج المساعد
- الوصول إلى [عقدة إيثريوم](/developers/docs/nodes-and-clients/)، إما عن طريق تشغيل عقدتك الخاصة، أو الاتصال بعقدة عامة، أو عبر مفتاح واجهة برمجة تطبيقات (API) باستخدام [خدمة العقدة](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### خطوات نشر عقد ذكي {#steps-to-deploy}

ستعتمد الخطوات المحددة المتضمنة على إطار التطوير المعني. على سبيل المثال، يمكنك الاطلاع على [توثيق Hardhat حول نشر عقودك](https://hardhat.org/docs/tutorial/deploying) أو [توثيق Foundry حول نشر عقد ذكي والتحقق منه](https://book.getfoundry.sh/forge/deploying). بمجرد نشره، سيكون لعقدك عنوان إيثريوم مثل [الحسابات](/developers/docs/accounts/) الأخرى ويمكن التحقق منه باستخدام [أدوات التحقق من الكود المصدري](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## أدوات ذات صلة {#related-tools}

**Remix - _يسمح Remix IDE بتطوير ونشر وإدارة العقود الذكية لبلوكتشينات شبيهة بالإيثريوم._**

- [Remix](https://remix.ethereum.org)

**Tenderly - _منصة تطوير Web3 التي توفر تصحيح الأخطاء، والقابلية للمراقبة، وكتل بناء البنية التحتية لتطوير العقود الذكية واختبارها ومراقبتها وتشغيلها._**

- [tenderly.co](https://tenderly.co/)
- [التوثيق](https://docs.tenderly.co/)
- [يجتبه](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _بيئة تطوير لتجميع برامج الإيثريوم الخاصة بك ونشرها واختبارها وتصحيحها._**

- [hardhat.org](https://hardhat.org/getting-started/)
- [توثيق حول نشر عقودك](https://hardhat.org/docs/tutorial/deploying)
- [يجتبه](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _انشر أي عقد بسهولة إلى أي سلسلة متوافقة مع آلة الإيثريوم الافتراضية (EVM)، باستخدام أمر واحد._**

- [التوثيق](https://portal.thirdweb.com/deploy/)

**Crossmint - _منصة تطوير web3 على مستوى المؤسسات لنشر العقود الذكية، وتمكين الدفع ببطاقات الائتمان والمدفوعات عبر السلاسل، واستخدام واجهات برمجة التطبيقات (APIs) لإنشاء وتوزيع وبيع وتخزين وتعديل الرموز غير القابلة للاستبدال (NFTs)._**

- [crossmint.com](https://www.crossmint.com)
- [التوثيق](https://docs.crossmint.com)
- [ديسكورد](https://discord.com/invite/crossmint)
- [المدونة](https://blog.crossmint.com)

## دروس تعليمية ذات صلة {#related-tutorials}

- [نشر عقدك الذكي الأول](/developers/tutorials/deploying-your-first-smart-contract/) _– مقدمة لنشر عقدك الذكي الأول على شبكة اختبار إيثريوم._
- [Hello World | برنامج تعليمي للعقد الذكي](/developers/tutorials/hello-world-smart-contract/) _– برنامج تعليمي سهل المتابعة لإنشاء ونشر عقد ذكي أساسي على إيثريوم._
- [التفاعل مع العقود الأخرى من سوليديتي](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- كيفية نشر عقد ذكي من عقد موجود والتفاعل معه._
- [كيفية تقليص حجم عقدك](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- كيفية تقليل حجم عقدك لإبقائه ضمن الحد المسموح به وتوفير الغاز_

## قراءة إضافية{#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [نشر عقودك باستخدام Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_

## المواضيع ذات الصلة {#related-topics}

- [أطر التطوير](/developers/docs/frameworks/)
- [تشغيل عقدة إيثريوم](/developers/docs/nodes-and-clients/run-a-node/)
- [العُقد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service)
