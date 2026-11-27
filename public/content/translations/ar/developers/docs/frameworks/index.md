---
title: "أطر عمل تطوير التطبيقات اللامركزية ⁦(dapps)⁩"
description: "قارن بين أطر عمل تطوير إيثيريوم مثل ⁦Foundry⁩ و⁦Hardhat⁩. تعرف على ما يوفره لك إطار العمل لتجميع واختبار ونشر العقود الذكية."
lang: ar
---

## مقدمة عن أطر العمل {#introduction-to-frameworks}

يتطلب بناء تطبيق لامركزي (dapp) متكامل أجزاءً مختلفة من التكنولوجيا. تتضمن أطر عمل البرامج العديد من الميزات المطلوبة أو توفر أنظمة إضافات سهلة لاختيار الأدوات التي ترغب بها.

تأتي أطر العمل مع الكثير من الوظائف الجاهزة للاستخدام، مثل:

- ميزات لإنشاء نسخة محلية من سلسلة الكتل.
- أدوات مساعدة لتجميع واختبار عقودك الذكية.
- إضافات تطوير العميل لبناء تطبيقك المواجه للمستخدم داخل نفس المشروع/المستودع.
- إعدادات للاتصال بشبكات إيثيريوم ونشر العقود، سواء على نسخة تعمل محليًا، أو إحدى شبكات إيثيريوم العامة.
- توزيع التطبيقات اللامركزية - تكاملات مع خيارات التخزين مثل <span dir="ltr">IPFS</span>.

## المتطلبات الأساسية {#prerequisites}

قبل التعمق في أطر العمل، نوصيك بقراءة مقدمتنا عن [التطبيقات اللامركزية (dapps)](/developers/docs/dapps/) و[حزمة إيثيريوم](/developers/docs/ethereum-stack/) أولاً.

## أطر العمل المتاحة {#available-frameworks}

**Foundry** - **_Foundry عبارة عن مجموعة أدوات سريعة للغاية ومحمولة ومعيارية لتطوير تطبيقات إيثيريوم_**

- [تثبيت Foundry](https://book.getfoundry.sh/)
- [كتاب Foundry](https://book.getfoundry.sh/)
- [دردشة مجتمع Foundry على تيليغرام](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_بيئة تطوير إيثيريوم للمحترفين._**

- [<span dir="ltr">hardhat.org</span>](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_أداة تطوير العقود الذكية لمبرمجي Python وعلماء البيانات ومحترفي الأمان._**

- [الوثائق](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_منصة لتطوير تطبيقات سلسلة الكتل على <span dir="ltr">JVM</span>._**

- [الصفحة الرئيسية](https://www.web3labs.com/web3j-sdk)
- [الوثائق](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_مكتبة <span dir="ltr">Kotlin/Java/Android</span> غير متزامنة وعالية الأداء لسلاسل الكتل القائمة على آلة إيثريوم الافتراضية (EVM)._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [أمثلة](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ديسكورد](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_أنشئ تطبيقات مدعومة بإيثيريوم بأمر واحد. يأتي مع مجموعة واسعة من أطر عمل واجهة المستخدم وقوالب التمويل اللامركزي (DeFi) للاختيار من بينها._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [قوالب](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-ETH 2 -** **_<span dir="ltr">Next.js</span> وWagmi وViem وRainbowKit مع اختيارك من Hardhat أو Foundry: إعادة تحميل العقد السريع، وخطافات React المخصصة، ومحفظة مؤقتة وصنبور محلي، ووحدات امتداد لتطوير التطبيقات اللامركزية (dapps) المتكاملة._**

- [الموقع الإلكتروني](https://scaffoldeth.io/)
- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_منصة تطوير Web3 تمكن مطوري سلسلة الكتل من بناء واختبار وتصحيح ومراقبة وتشغيل العقود الذكية وتحسين تجربة المستخدم للتطبيقات اللامركزية (dapps)._**

- [الموقع الإلكتروني](https://tenderly.co/)
- [الوثائق](https://docs.tenderly.co/)

**The Graph -** **_The Graph للاستعلام عن بيانات سلسلة الكتل بكفاءة._**

- [الموقع الإلكتروني](https://thegraph.com/)
- [الوثائق](https://thegraph.com/docs/en/)

**Alchemy -** **_منصة تطوير إيثيريوم._**

- [<span dir="ltr">alchemy.com</span>](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [ديسكورد](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_منصة تطوير إيثيريوم._**

- [<span dir="ltr">Nodereal.io</span>](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [ديسكورد](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_قم ببناء تطبيقات Web3 يمكنها التفاعل مع عقودك الذكية باستخدام حزم تطوير البرمجيات (SDKs) وواجهة سطر الأوامر (CLI) القوية لدينا._**

- [الوثائق](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_منصة تطوير Web3 (إيثيريوم وغيرها)._**

- [<span dir="ltr">chainstack.com</span>](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [ديسكورد](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_منصة تطوير Web3 على مستوى المؤسسات، تتيح لك بناء تطبيقات الرموز غير القابلة للاستبدال (NFTs) على جميع السلاسل الرئيسية وسلاسل آلة إيثريوم الافتراضية (EVM) (وغيرها)._**

- [الموقع الإلكتروني](https://www.crossmint.com)
- [الوثائق](https://docs.crossmint.com)
- [ديسكورد](https://discord.com/invite/crossmint)

**Brownie -** **_بيئة تطوير وإطار عمل اختبار قائم على Python._**

- [الوثائق](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie غير مدعوم حاليًا**

**أوبن زبلن SDK -** **_مجموعة أدوات العقود الذكية المثالية: مجموعة من الأدوات لمساعدتك في تطوير وتجميع وترقية ونشر والتفاعل مع العقود الذكية._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [منتدى المجتمع](https://forum.openzeppelin.com/c/support/17)
- **انتهى تطوير أوبن زبلن SDK**

**Catapulta -** **_أداة نشر العقود الذكية متعددة السلاسل، تعمل على أتمتة عمليات التحقق في مستكشفات الكتل، وتتبع العقود الذكية المنشورة ومشاركة تقارير النشر، وتعمل بمبدأ التوصيل والتشغيل لمشاريع Foundry وHardhat._**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (بدعم من Covalent) -** **_تقدم GoldRush مجموعة واجهة برمجة التطبيقات (API) لبيانات سلسلة الكتل الأكثر شمولاً للمطورين والمحللين والمؤسسات. سواء كنت تبني لوحة معلومات للتمويل اللامركزي (DeFi)، أو محفظة، أو روبوت تداول، أو وكيل ذكاء اصطناعي، أو منصة امتثال، فإن واجهات برمجة تطبيقات البيانات توفر وصولاً سريعًا ودقيقًا وسهل الاستخدام للمطورين إلى البيانات الأساسية على السلسلة التي تحتاجها_**

- [الموقع الإلكتروني](https://goldrush.dev/)
- [الوثائق](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [ديسكورد](https://www.covalenthq.com/discord/)

**Wake -** **_إطار عمل Python شامل لاختبار العقود، والاختبار العشوائي (fuzzing)، والنشر، وفحص الثغرات الأمنية، والتنقل في الكود._**

- [الصفحة الرئيسية](https://getwake.io/)
- [الوثائق](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [إضافة <span dir="ltr">VS Code</span>](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_إطار عمل مفتوح المصدر ومعياري ومستقل يسهل على مطوري التطبيقات اللامركزية بناء هويات لامركزية وبيانات اعتماد قابلة للتحقق في تطبيقاتهم._**

- [الصفحة الرئيسية](https://veramo.io/)
- [الوثائق](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [ديسكورد](https://discord.com/invite/FRRBdjemHV)
- [حزمة <span dir="ltr">NPM</span>](https://www.npmjs.com/package/@veramo/core)

**Moccasin -** **_إطار عمل سريع لتطوير واختبار العقود الذكية بلغة Python لـ Vyper، مبني على Titanoboa._**

- [الوثائق](https://cyfrin.github.io/moccasin/)
- [GitHub](https://github.com/Cyfrin/moccasin)

## قراءة إضافية {#further-reading}

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_

## مواضيع ذات صلة {#related-topics}

- [إعداد بيئة تطوير محلية](/developers/local-environment/)

## برامج تعليمية: أطر عمل التطوير على إيثيريوم {#tutorials}

- [عقد ذكي "Hello World" للمبتدئين](/developers/tutorials/hello-world-smart-contract/) _– قم ببناء ونشر عقد ذكي "Hello World" باستخدام Hardhat._
