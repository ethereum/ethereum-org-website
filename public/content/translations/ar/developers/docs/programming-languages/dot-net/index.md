---
title: "إيثيريوم لمطوري ⁦.NET⁩"
description: "تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على ⁦.NET⁩"
lang: ar
incomplete: true
---

<FeaturedText>تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على <span dir="ltr">.NET</span></FeaturedText>

استخدم إيثيريوم لإنشاء تطبيقات لامركزية (dapps) تستفيد من مزايا العملات المشفرة وتكنولوجيا سلسلة الكتل. يمكن أن تكون هذه التطبيقات اللامركزية (dapps) جديرة بالثقة، مما يعني أنه بمجرد نشرها على إيثيريوم، فإنها ستعمل دائمًا كما تمت برمجتها. يمكنها التحكم في الأصول الرقمية من أجل إنشاء أنواع جديدة من التطبيقات المالية. يمكن أن تكون لامركزية، مما يعني أنه لا يوجد كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل فرض رقابة عليها.

قم ببناء تطبيقات لامركزية (dapps) على إيثيريوم وتفاعل مع العقود الذكية باستخدام الأدوات واللغات من حزمة تكنولوجيا مايكروسوفت - التي تدعم <span dir="ltr">C#</span> و<span dir="ltr">Visual Basic .NET</span> و<span dir="ltr">F#</span>، على أدوات مثل VSCode و<span dir="ltr">Visual Studio</span>، عبر <span dir="ltr">.NET Framework/.NET Core/.NET Standard</span>. انشر سلسلة كتل إيثيريوم على <span dir="ltr">Azure</span> باستخدام <span dir="ltr">Microsoft Azure Blockchain</span> في دقائق. اجلب حب <span dir="ltr">.NET</span> إلى إيثيريوم!

## البدء مع العقود الذكية ولغة Solidity {#getting-started-with-smart-contracts-and-the-solidity-language}

**اتخذ خطواتك الأولى لدمج <span dir="ltr">.NET</span> مع إيثيريوم**

هل تحتاج إلى مقدمة أساسية أولاً؟ تحقق من [ethereum.org/learn](/learn/) أو [ethereum.org/developers](/developers/).

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مراجع وروابط للمبتدئين {#beginner-references-and-links}

**مقدمة عن مكتبة Nethereum وVSCode Solidity**

- [Nethereum، البدء](https://docs.nethereum.com/docs/getting-started/welcome/)
- [تثبيت VSCode Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [سير عمل مطور <span dir="ltr">.NET</span> لإنشاء واستدعاء العقود الذكية على إيثيريوم](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [تكامل العقود الذكية مع Nethereum](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [ربط <span dir="ltr">.NET</span> والعقود الذكية على سلسلة كتل إيثيريوم باستخدام Nethereum](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933)، متاح أيضًا باللغة [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)
- [Nethereum - مكتبة تكامل <span dir="ltr">.NET</span> مفتوحة المصدر لسلسلة الكتل](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [كتابة معاملات إيثيريوم إلى قاعدة بيانات SQL باستخدام Nethereum](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [شاهد كيفية نشر العقود الذكية على إيثيريوم بسهولة باستخدام <span dir="ltr">C#</span> و<span dir="ltr">VisualStudio</span>](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**هل تريد تخطي الإعداد في الوقت الحالي، والانتقال مباشرة إلى الأمثلة؟**

- [بيئة اللعب (Playground)](https://playground.nethereum.com/) - تفاعل مع إيثيريوم وتعلم كيفية استخدام Nethereum من خلال المتصفح.
  - [الاستعلام عن رصيد الحساب](https://docs.nethereum.com/docs/core-foundation/guide-query-balance)
  - [الاستعلام عن رصيد العقد الذكي ERC-20](https://docs.nethereum.com/docs/smart-contracts/erc20)
  - [تحويل إيثر إلى حساب](https://docs.nethereum.com/docs/core-foundation/guide-send-eth)
  - ... والمزيد!

## مقالات للمستوى المتوسط {#intermediate-articles}

- [البدء مع Nethereum والمشروع الأول](https://docs.nethereum.com/docs/getting-started/first-project)
- [نشر سلاسل الاختبار التطويرية الخاصة بك](https://github.com/Nethereum/Testchains)
- [إضافة توليد الأكواد (Codegen) في VSCode لـ Solidity](https://docs.nethereum.com/docs/aspire-templates/guide-codegen)
- [<span dir="ltr">Unity</span> وإيثيريوم: لماذا وكيف](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [إنشاء <span dir="ltr">ASP.NET Core Web API</span> للتطبيقات اللامركزية (dapps) على إيثيريوم](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [استخدام Nethereum Web3 لتنفيذ نظام تتبع سلسلة التوريد](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [معالجة سلسلة الكتل باستخدام Nethereum](https://docs.nethereum.com/docs/data-and-indexing/guide-blockchain-processing)
- [البث عبر <span dir="ltr">Websocket</span> باستخدام Nethereum](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido وNethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum وNethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## أنماط الاستخدام المتقدمة {#advanced-use-patterns}

- [قبو مفاتيح <span dir="ltr">Azure</span> وNethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [<span dir="ltr">Nethereum.DappHybrid</span>](https://github.com/Nethereum/Nethereum.DappHybrid)

## مشاريع <span dir="ltr">.NET</span> والأدوات وأشياء أخرى ممتعة {#dot-net-projects-tools-and-other-fun-stuff}

- [بيئة لعب Nethereum](https://playground.nethereum.com/) - _تجميع وإنشاء وتشغيل مقتطفات أكواد Nethereum في المتصفح_
- [توليد أكواد Nethereum باستخدام <span dir="ltr">Blazor</span>](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _توليد أكواد Nethereum مع واجهة مستخدم في <span dir="ltr">Blazor</span>_
- [<span dir="ltr">Nethereum Blazor</span>](https://github.com/Nethereum/NethereumBlazor) - _مستكشف سلسلة كتل خفيف ومحفظة بسيطة بتطبيق صفحة واحدة (SPA) باستخدام <span dir="ltr">.NET Wasm</span>_
- [نيذرميند](https://github.com/NethermindEth/nethermind) - _عميل إيثيريوم مبني على <span dir="ltr">.NET Core</span> لأنظمة Linux وWindows و<span dir="ltr">MacOS</span>_
- [<span dir="ltr">eth-utils</span>](https://github.com/ethereum/eth-utils/) - _دوال مساعدة للعمل مع قواعد الأكواد المتعلقة بإيثيريوم_
- [<span dir="ltr">TestChains</span>](https://github.com/Nethereum/TestChains) - _سلاسل تطوير <span dir="ltr">.NET</span> معدة مسبقًا لاستجابة سريعة (إثبات السلطة)_

هل تبحث عن المزيد من الموارد؟ تحقق من [ethereum.org/developers](/developers/).

## مساهمو مجتمع <span dir="ltr">.NET</span> {#dot-net-community-contributors}

في Nethereum، نتواجد غالبًا على Gitter حيث نرحب بالجميع لطرح/الإجابة على الأسئلة، أو الحصول على المساعدة، أو مجرد الاسترخاء. لا تتردد في تقديم طلب سحب (PR) أو فتح مشكلة (issue) على [مستودع Nethereum على GitHub](https://github.com/Nethereum)، أو مجرد تصفح العديد من المشاريع الجانبية/الأمثلة التي لدينا. يمكنك أيضًا العثور علينا على [ديسكورد](https://discord.gg/jQPrR58FxX)!

إذا كنت جديدًا على نيذرميند وتحتاج إلى مساعدة للبدء، انضم إلى [ديسكورد](https://discord.gg/PaCMRFdvWT) الخاص بنا. مطورونا مستعدون للإجابة على أسئلتك. لا تتردد في فتح طلب سحب (PR) أو طرح أي مشكلات على [مستودع نيذرميند على GitHub](https://github.com/NethermindEth/nethermind).

## قوائم مجمعة أخرى {#other-aggregated-lists}

[موقع Nethereum الرسمي](https://nethereum.com/)  
[موقع نيذرميند الرسمي](https://nethermind.io/)