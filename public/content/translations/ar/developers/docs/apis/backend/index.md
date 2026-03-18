---
title: "المكتبات الخلفية لواجهة برمجة التطبيقات"
description: "مقدمة إلى واجهات برمجة التطبيقات العميلة لـإيثريوم، التي تسمح لك بالتفاعل مع سلسلة الكتل من التطبيق الخاص بك."
lang: ar
---

لكي يتفاعل تطبيق برمجي مع بلوكتشين إيثريوم (أي قراءة بيانات البلوكتشين و/أو إرسال المعاملات إلى الشبكة)، يجب أن يتصل بعقدة إيثريوم.

لهذا الغرض، يقوم كل عميل لإيثريوم بتطبيق مواصفات [JSON-RPC](/developers/docs/apis/json-rpc/)، لذلك توجد مجموعة موحدة من [الطرق](/developers/docs/apis/json-rpc/#json-rpc-methods) التي يمكن للتطبيقات الاعتماد عليها.

إذا كنت تريد استخدام لغة برمجة محددة للاتصال بعقدة إيثيريوم، هناك العديد من مكتبات الراحة في النظام البيئي التي تجعل هذا أسهل بكثير. مع هذه المكتبات، بوسع المطورين كتابة طرق ذكية من سطر واحد لتهيئة طلبات JSON RPC (في الخلفية) التي تتفاعل مع إيثريوم.

## المتطلبات الأساسية {#prerequisites}

قد يكون من المفيد فهم [حزمة إيثريوم](/developers/docs/ethereum-stack/) و[عملاء إيثريوم](/developers/docs/nodes-and-clients/).

## ما نفع المكتبة؟ {#why-use-a-library}

تخفف هذه المكتبات إلى حد كبير من تعقيد التفاعل المباشر مع عقدة إيثريوم. كما أنها توفر وظائف مساعِدة (كتحويل ETH إلى Gwei) تتيح لك كمطوّر قضاء وقت أقل في التعامل مع تعقيدات عملاء إيثريوم والتركيز لوقت أطول على وظيفة تطبيقك الفريدة.

## المكتبات المتاحة {#available-libraries}

### البنية التحتية وخدمات العقد {#infrastructure-and-node-services}

**ألكيمي -** **_منصة تطوير إيثريوم._**

- [alchemy.com](https://www.alchemy.com/)
- [التوثيق](https://www.alchemy.com/docs/)
- [غيت هاب](https://github.com/alchemyplatform)
- [ديسكورد](https://discord.com/invite/alchemyplatform)

**All That Node -** **_العقدة كخدمة._**

- [All That Node.com](https://www.allthatnode.com/)
- [التوثيق](https://docs.allthatnode.com)
- [ديسكورد](https://discord.gg/GmcdVEUbJM)

**بلاست by Bware Labs -** **_واجهات برمجة التطبيقات اللامركزية لشبكة إيثريوم الرئيسية وشبكات الاختبار._**

- [blastapi.io](https://blastapi.io/)
- [التوثيق](https://docs.blastapi.io)
- [ديسكورد](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_توفير خدمات RPC أكثر كفاءة وسرعة_**

- [blockpi.io](https://blockpi.io/)
- [التوثيق](https://docs.blockpi.io/)
- [غيت هاب](https://github.com/BlockPILabs)
- [ديسكورد](https://discord.com/invite/xTvGVrGVZv)

**بوابة إيثريوم على Cloudflare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**إيثرسكان - مستكشف الكتل وواجهات برمجة التطبيقات للمعاملات**

- [التوثيق](https://docs.etherscan.io/)

**بلوك سكوت - مستكشف الكتل مفتوح المصدر**

- [التوثيق](https://docs.blockscout.com/)

**GetBlock -** **_سلسلة الكتل كخدمة لتطوير الويب 3_**

- [GetBlock.io](https://getblock.io/)
- [التوثيق](https://docs.getblock.io/)

**إنفيورا -** **_واجهة برمجة تطبيقات إيثريوم كخدمة._**

- [infura.io](https://infura.io)
- [التوثيق](https://docs.infura.io/api)
- [غيت هاب](https://github.com/INFURA)

**Node RPC - _موفر EVM JSON-RPC فعال من حيث التكلفة_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [التوثيق](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _العقد الكاملة ومستكشفو الكتل._**

- [NOWNodes.io](https://nownodes.io/)
- [التوثيق](https://nownodes.gitbook.io/documentation)

**كويك نود -** **_البنية التحتية لسلسلة الكتل كخدمة._**

- [quicknode.com](https://quicknode.com)
- [التوثيق](https://www.quicknode.com/docs/welcome)
- [ديسكورد](https://discord.gg/quicknode)

**Rivet -** **_واجهات برمجة تطبيقات إيثريوم وإيثريوم كلاسيك كخدمة مدعومة ببرمجيات مفتوحة المصدر._**

- [rivet.cloud](https://rivet.cloud)
- [التوثيق](https://rivet.cloud/docs/)
- [غيت هاب](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_عقد إيثريوم موجهة نحو السرعة كواجهة برمجة تطبيقات JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [غيت هاب](https://github.com/zmok-io)
- [التوثيق](https://docs.zmok.io/)
- [ديسكورد](https://discord.gg/fAHeh3ka6s)

### أدوات التطوير {#development-tools}

**ethers-kt -** **_مكتبة Kotlin/جافا/أندرويد غير متزامنة وعالية الأداء لسلاسل الكتل القائمة على EVM._**

- [غيت هاب](https://github.com/Kr1ptal/ethers-kt)
- [أمثلة](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ديسكورد](https://discord.gg/rx35NzQGSb)

**نيثيريوم -** **_مكتبة تكامل دوت نت مفتوحة المصدر لسلسلة الكتل._**

- [غيت هاب](https://github.com/Nethereum/Nethereum)
- [التوثيق](http://docs.nethereum.com/en/latest/)
- [ديسكورد](https://discord.com/invite/jQPrR58FxX)

**أدوات بايثون -** **_مجموعة متنوعة من المكتبات للتفاعل مع إيثريوم عبر بايثون._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py غيت هاب](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_منصة تطوير البلوكتشين المثالية._**

- [Tatum](https://tatum.io/)
- [غيت هاب](https://github.com/tatumio/)
- [التوثيق](https://docs.tatum.io/)
- [ديسكورد](https://discord.gg/EDmW3kjTC9)

**web3j -** **_مكتبة تكامل جافا/أندرويد/Kotlin/Scala مع إيثريوم._**

- [غيت هاب](https://github.com/web3j/web3j)
- [الوثائق](https://docs.web3j.io/)
- [جيتر](https://gitter.im/web3j/web3j)

### خدمات البلوكتشين {#blockchain-services}

**BlockCypher -** **_واجهات برمجة تطبيقات الويب الخاصة بإيثريوم._**

- [blockcypher.com](https://www.blockcypher.com/)
- [التوثيق](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_البنية التحتية للبيانات web3 الشاملة لإيثريوم._**

- [chainbase.com](https://chainbase.com/)
- [التوثيق](https://docs.chainbase.com/)
- [ديسكورد](https://discord.gg/Wx6qpqz4AF)

**تشين ستاك -** **_عقد إيثريوم مرنة ومخصصة كخدمة._**

- [chainstack.com](https://chainstack.com)
- [التوثيق](https://docs.chainstack.com/)
- [مرجع واجهة برمجة تطبيقات (API) إيثريوم](https://docs.chainstack.com/reference/ethereum-getting-started)

**كوين بيز Cloud Node -** **_واجهة برمجة تطبيقات البنية التحتية لسلسلة الكتل._**

- [كوين بيز Cloud Node](https://www.coinbase.com/developer-platform)
- [التوثيق](https://docs.cdp.coinbase.com/)

**DataHub بواسطة Figment -** **_خدمات API ويب3 مع شبكة إيثريوم الرئيسية وشبكات الاختبار._**

- [DataHub](https://www.figment.io/)
- [التوثيق](https://docs.figment.io/)

**موراليس -** **_موفر واجهة برمجة تطبيقات EVM على مستوى المؤسسات._**

- [moralis.io](https://moralis.io)
- [التوثيق](https://docs.moralis.io/)
- [غيت هاب](https://github.com/MoralisWeb3)
- [ديسكورد](https://moralis.io/joindiscord/)
- [المنتدى](https://forum.moralis.io/)

**NFTPort -** **_واجهات برمجة تطبيقات بيانات إيثريوم والسك._**

- [nftport.xyz](https://www.nftport.xyz/)
- [التوثيق](https://docs.nftport.xyz/)
- [غيت هاب](https://github.com/nftport/)
- [ديسكورد](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_منصة واجهات برمجة التطبيقات العامة متعددة العملات المشفرة لسلسلة الكتل._**

- [services.tokenview.io](https://services.tokenview.io/)
- [التوثيق](https://services.tokenview.io/docs?type=api)
- [غيت هاب](https://github.com/Tokenview)

**Watchdata -** **_توفير وصول بسيط وموثوق عبر واجهة برمجة التطبيقات (API) إلى بلوكتشين إيثريوم._**

- [Watchdata](https://watchdata.io/)
- [التوثيق](https://docs.watchdata.io/)
- [ديسكورد](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_واجهات برمجة تطبيقات بلوكتشين مُثرَاة لأكثر من 200 سلسلة._**

- [covalenthq.com](https://www.covalenthq.com/)
- [التوثيق](https://www.covalenthq.com/docs/api/)
- [غيت هاب](https://github.com/covalenthq)
- [ديسكورد](https://www.covalenthq.com/discord/)

## قراءة إضافية {#further-reading}

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_

## المواضيع ذات الصلة {#related-topics}

- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [أطر التطوير](/developers/docs/frameworks/)

## دروس تعليمية ذات صلة {#related-tutorials}

- [إعداد Web3js لاستخدام سلسلة كتل الإيثريوم في جافا سكريبت](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– تعليمات لإعداد web3.js في مشروعك._
- [استدعاء عقد ذكي من جافا سكريبت](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– باستخدام رمز DAI، تعرّف على كيفية استدعاء وظيفة العقود بواسطة جافا سكريبت._
