---
title: "مكتبات ⁦API⁩ للواجهة الخلفية"
description: "مقدمة عن واجهات برمجة تطبيقات (⁦API⁩) عميل إيثيريوم التي تتيح لك التفاعل مع سلسلة الكتل من تطبيقك."
lang: ar
---

لكي يتفاعل تطبيق برمجي مع سلسلة الكتل الخاصة بـ [إيثيريوم](/) (أي قراءة بيانات سلسلة الكتل و/أو إرسال معاملات إلى الشبكة)، يجب أن يتصل بـ عقدة إيثيريوم.

لهذا الغرض، ينفذ كل عميل إيثيريوم مواصفات [<span dir="ltr">JSON-RPC</span>](/developers/docs/apis/json-rpc/)، لذلك هناك مجموعة موحدة من [الطرق](/developers/docs/apis/json-rpc/#json-rpc-methods) التي يمكن للتطبيقات الاعتماد عليها.

إذا كنت ترغب في استخدام لغة برمجة معينة للاتصال بـ عقدة إيثيريوم، فهناك العديد من المكتبات المريحة داخل النظام البيئي التي تجعل هذا الأمر أسهل بكثير. باستخدام هذه المكتبات، يمكن للمطورين كتابة طرق بديهية من سطر واحد لتهيئة طلبات <span dir="ltr">JSON-RPC</span> (داخليًا) التي تتفاعل مع إيثيريوم.

## المتطلبات الأساسية {#prerequisites}

قد يكون من المفيد فهم [حزمة إيثيريوم](/developers/docs/ethereum-stack/) و[عملاء إيثيريوم](/developers/docs/nodes-and-clients/).

## لماذا تستخدم مكتبة؟ {#why-use-a-library}

تعمل هذه المكتبات على تجريد الكثير من تعقيدات التفاعل المباشر مع عقدة إيثيريوم. كما أنها توفر وظائف مساعدة (على سبيل المثال، تحويل <span dir="ltr">ETH</span> إلى <span dir="ltr">Gwei</span>) بحيث يمكنك كمطور قضاء وقت أقل في التعامل مع تعقيدات عملاء إيثيريوم ووقت أطول في التركيز على الوظائف الفريدة لتطبيقك.

## المكتبات المتاحة {#available-libraries}

### البنية التحتية وخدمات العقد {#infrastructure-and-node-services}

**<span dir="ltr">Alchemy</span> -** **_منصة تطوير إيثيريوم._**

- [<span dir="ltr">alchemy.com</span>](https://www.alchemy.com/)
- [التوثيق](https://www.alchemy.com/docs/)
- [<span dir="ltr">GitHub</span>](https://github.com/alchemyplatform)
- [ديسكورد](https://discord.com/invite/alchemyplatform)
  
**<span dir="ltr">All That Node</span> -** **_العقدة كخدمة._**

- [<span dir="ltr">All That Node.com</span>](https://www.allthatnode.com/)
- [التوثيق](https://docs.allthatnode.com)
- [ديسكورد](https://discord.gg/GmcdVEUbJM)

**<span dir="ltr">Blast</span> بواسطة <span dir="ltr">Bware Labs</span> -** **_واجهات برمجة تطبيقات (API) لامركزية لشبكة إيثيريوم الرئيسية وشبكات الاختبار._**

- [<span dir="ltr">blastapi.io</span>](https://blastapi.io/)
- [التوثيق](https://docs.blastapi.io)
- [ديسكورد](https://discord.gg/SaRqmRUjjQ)

**<span dir="ltr">BlockPi</span> -** **_توفير خدمات RPC أكثر كفاءة وسرعة_**

- [<span dir="ltr">blockpi.io</span>](https://blockpi.io/)
- [التوثيق](https://docs.blockpi.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/BlockPILabs)
- [ديسكورد](https://discord.com/invite/xTvGVrGVZv)

**بوابة إيثيريوم من <span dir="ltr">Cloudflare</span>.**

- [<span dir="ltr">cloudflare-eth.com</span>](https://www.cloudflare.com/application-services/products/web3/)

**<span dir="ltr">Etherscan</span> - مستكشف الكتل وواجهات برمجة تطبيقات (API) المعاملات**
- [التوثيق](https://docs.etherscan.io/)

**<span dir="ltr">Blockscout</span> - مستكشف الكتل مفتوح المصدر**
- [التوثيق](https://docs.blockscout.com/)

**<span dir="ltr">GetBlock</span>-** **_سلسلة الكتل كخدمة لتطوير <span dir="ltr">Web3</span>_**

- [<span dir="ltr">GetBlock.io</span>](https://getblock.io/)
- [التوثيق](https://docs.getblock.io/)

**<span dir="ltr">Infura</span> -** **_واجهة برمجة تطبيقات (API) إيثيريوم كخدمة._**

- [<span dir="ltr">infura.io</span>](https://infura.io)
- [التوثيق](https://docs.infura.io/api)
- [<span dir="ltr">GitHub</span>](https://github.com/INFURA)

**<span dir="ltr">Node RPC</span> - _مزود <span dir="ltr">JSON-RPC</span> لآلة إيثيريوم الافتراضية (EVM) فعال من حيث التكلفة_**

- [<span dir="ltr">noderpc.xyz</span>](https://www.noderpc.xyz/)
- [التوثيق](https://docs.noderpc.xyz/node-rpc)

**<span dir="ltr">NOWNodes</span> - _عقد كاملة ومستكشفات الكتل._**

- [<span dir="ltr">NOWNodes.io</span>](https://nownodes.io/)
- [التوثيق](https://nownodes.gitbook.io/documentation)

**<span dir="ltr">QuickNode</span> -** **_البنية التحتية لسلسلة الكتل كخدمة._**

- [<span dir="ltr">quicknode.com</span>](https://quicknode.com)
- [التوثيق](https://www.quicknode.com/docs/welcome)
- [ديسكورد](https://discord.gg/quicknode)

**<span dir="ltr">Rivet</span> -** **_واجهات برمجة تطبيقات (API) إيثيريوم وإيثريوم كلاسيك كخدمة مدعومة ببرمجيات مفتوحة المصدر._**

- [<span dir="ltr">rivet.cloud</span>](https://rivet.cloud)
- [التوثيق](https://rivet.cloud/docs/)
- [<span dir="ltr">GitHub</span>](https://github.com/openrelayxyz/ethercattle-deployment)

**<span dir="ltr">Zmok</span> -** **_عقد إيثيريوم موجهة نحو السرعة كواجهة برمجة تطبيقات (API) لـ <span dir="ltr">JSON-RPC</span>/<span dir="ltr">WebSockets</span>._**

- [<span dir="ltr">zmok.io</span>](https://zmok.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/zmok-io)
- [التوثيق](https://docs.zmok.io/)
- [ديسكورد](https://discord.gg/fAHeh3ka6s)

### أدوات التطوير {#development-tools}

**<span dir="ltr">ethers-kt</span> -** **_مكتبة <span dir="ltr">Kotlin</span>/<span dir="ltr">Java</span>/<span dir="ltr">Android</span> غير متزامنة وعالية الأداء لسلاسل الكتل القائمة على آلة إيثيريوم الافتراضية (EVM)._**

- [<span dir="ltr">GitHub</span>](https://github.com/Kr1ptal/ethers-kt)
- [أمثلة](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ديسكورد](https://discord.gg/rx35NzQGSb)

**<span dir="ltr">Nethereum</span> -** **_مكتبة تكامل <span dir="ltr">.NET</span> مفتوحة المصدر لسلسلة الكتل._**

- [<span dir="ltr">GitHub</span>](https://github.com/Nethereum/Nethereum)
- [التوثيق](https://docs.nethereum.com/docs/getting-started/welcome/)
- [ديسكورد](https://discord.com/invite/jQPrR58FxX)

**أدوات <span dir="ltr">Python</span> -** **_مجموعة متنوعة من المكتبات للتفاعل مع إيثيريوم عبر <span dir="ltr">Python</span>._**

- [<span dir="ltr">py.ethereum.org</span>](https://snakecharmers.ethereum.org/)
- [<span dir="ltr">GitHub</span> لـ <span dir="ltr">Web3.py</span>](https://github.com/ethereum/web3.py)
- [دردشة <span dir="ltr">Web3.py</span>](https://gitter.im/ethereum/web3.py)

**<span dir="ltr">Tatum</span> -** **_منصة تطوير سلسلة الكتل المثالية._**

- [<span dir="ltr">Tatum</span>](https://tatum.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/tatumio/)
- [التوثيق](https://docs.tatum.io/)
- [ديسكورد](https://discord.gg/EDmW3kjTC9)

**<span dir="ltr">Web3j</span> -** **_مكتبة تكامل <span dir="ltr">Java</span>/<span dir="ltr">Android</span>/<span dir="ltr">Kotlin</span>/<span dir="ltr">Scala</span> لإيثيريوم._**

- [<span dir="ltr">GitHub</span>](https://github.com/web3j/web3j)
- [المستندات](https://docs.web3j.io/)
- [<span dir="ltr">Gitter</span>](https://gitter.im/web3j/web3j)

### خدمات سلسلة الكتل {#blockchain-services}

**<span dir="ltr">BlockCypher</span> -** **_واجهات برمجة تطبيقات (API) الويب لإيثيريوم._**

- [<span dir="ltr">blockcypher.com</span>](https://www.blockcypher.com/)
- [التوثيق](https://www.blockcypher.com/dev/ethereum/)

**<span dir="ltr">Chainbase</span> -** **_بنية تحتية شاملة لبيانات <span dir="ltr">Web3</span> لإيثيريوم._**

- [<span dir="ltr">chainbase.com</span>](https://chainbase.com/)
- [التوثيق](https://docs.chainbase.com/)
- [ديسكورد](https://discord.gg/Wx6qpqz4AF)

**<span dir="ltr">Chainstack</span> -** **_عقد إيثيريوم مرنة ومخصصة كخدمة._**

- [<span dir="ltr">chainstack.com</span>](https://chainstack.com)
- [التوثيق](https://docs.chainstack.com/)
- [مرجع واجهة برمجة تطبيقات (API) إيثيريوم](https://docs.chainstack.com/reference/ethereum-getting-started)

**عقدة كوين بيس السحابية -** **_واجهة برمجة تطبيقات (API) البنية التحتية لسلسلة الكتل._**

- [عقدة كوين بيس السحابية](https://www.coinbase.com/developer-platform)
- [التوثيق](https://docs.cdp.coinbase.com/)

**<span dir="ltr">DataHub</span> بواسطة <span dir="ltr">Figment</span> -** **_خدمات واجهة برمجة تطبيقات (API) لـ <span dir="ltr">Web3</span> مع شبكة إيثيريوم الرئيسية وشبكات الاختبار._**

- [<span dir="ltr">DataHub</span>](https://www.figment.io/)
- [التوثيق](https://docs.figment.io/)

**<span dir="ltr">Moralis</span> -** **_مزود واجهة برمجة تطبيقات (API) لآلة إيثيريوم الافتراضية (EVM) على مستوى المؤسسات._**

- [<span dir="ltr">moralis.io</span>](https://moralis.io)
- [التوثيق](https://docs.moralis.io/)
- [<span dir="ltr">GitHub</span>](https://github.com/MoralisWeb3)
- [ديسكورد](https://moralis.io/joindiscord/)
- [المنتدى](https://forum.moralis.io/)

**<span dir="ltr">NFTPort</span> -** **_واجهات برمجة تطبيقات (API) لبيانات إيثيريوم والسك._**

- [<span dir="ltr">nftport.xyz</span>](https://www.nftport.xyz/)
- [التوثيق](https://docs.nftport.xyz/)
- [<span dir="ltr">GitHub</span>](https://github.com/nftport/)
- [ديسكورد](https://discord.com/invite/K8nNrEgqhE)

**<span dir="ltr">Tokenview</span> -** **_منصة واجهات برمجة تطبيقات (API) لسلسلة الكتل متعددة الكريبتو العامة._**

- [<span dir="ltr">services.tokenview.io</span>](https://services.tokenview.io/)
- [التوثيق](https://services.tokenview.io/docs?type=api)
- [<span dir="ltr">GitHub</span>](https://github.com/Tokenview)

**<span dir="ltr">Watchdata</span> -** **_توفير وصول بسيط وموثوق لواجهة برمجة تطبيقات (API) إلى سلسلة كتل إيثيريوم._**

- [<span dir="ltr">Watchdata</span>](https://watchdata.io/)
- [التوثيق](https://docs.watchdata.io/)
- [ديسكورد](https://discord.com/invite/TZRJbZ6bdn)

**<span dir="ltr">Codex</span> -** **_واجهة برمجة تطبيقات (API) لبيانات سلسلة الكتل المثرية في الوقت الفعلي عبر عشرات السلاسل._**

- [<span dir="ltr">codex.io</span>](https://www.codex.io/)
- [التوثيق](https://docs.codex.io)
- [المستكشف](https://docs.codex.io/explore)
- [<span dir="ltr">GitHub</span>](https://github.com/Codex-Data)
- [ديسكورد](https://discord.com/invite/mFpUhT3vAq)

**<span dir="ltr">Covalent</span> -** **_واجهات برمجة تطبيقات (API) مثرية لسلسلة الكتل لأكثر من <span dir="ltr">200</span> سلسلة._**

- [<span dir="ltr">covalenthq.com</span>](https://www.covalenthq.com/)
- [التوثيق](https://www.covalenthq.com/docs/api/)
- [<span dir="ltr">GitHub</span>](https://github.com/covalenthq)
- [ديسكورد](https://www.covalenthq.com/discord/)


## قراءة إضافية {#further-reading}

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_

## مواضيع ذات صلة {#related-topics}

- [العقد والعملاء](/developers/docs/nodes-and-clients/)
- [أطر التطوير](/developers/docs/frameworks/)

## برامج تعليمية ذات صلة {#related-tutorials}

- [إعداد <span dir="ltr">Web3.js</span> لاستخدام سلسلة كتل إيثيريوم في <span dir="ltr">JavaScript</span>](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– إرشادات لإعداد <span dir="ltr">Web3.js</span> في مشروعك._
- [استدعاء عقد ذكي من <span dir="ltr">JavaScript</span>](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– باستخدام الرمز المميز <span dir="ltr">DAI</span>، تعرف على كيفية استدعاء وظيفة العقود باستخدام <span dir="ltr">JavaScript</span>._