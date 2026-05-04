---
title: "كيفية تعدين إن إف تي (الجزء 2/3 من سلسلة دروس إن إف تي التعليمية)"
description: "يصف هذا البرنامج التعليمي كيفية تعدين إن إف تي على بلوكتشين إيثريوم باستخدام عقدنا الذكي و ويب3."
author: "سومي مودجيل"
tags:
  [
    "ERC-721",
    "Alchemy",
    "Solidity",
    "العقود الذكيه "
  ]
skill: beginner
lang: ar
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 مليون دولار\n[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 مليون دولار\n[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 ملايين دولار

جميعهم قاموا بتعدين رموز إن إف تي الخاصة بهم باستخدام واجهة برمجة التطبيقات (API) القوية من ألكيمي. في هذا البرنامج التعليمي، سنعلمك كيف تفعل الشيء نفسه في أقل من 10 دقائق.

إن "تعدين إن إف تي" هو إجراء نشر نسخة فريدة من رمز ERC-721 الخاص بك على البلوكتشين. باستخدام عقدنا الذكي من [الجزء 1 من سلسلة دروس إن إف تي التعليمية هذه](/developers/tutorials/how-to-write-and-deploy-an-nft/)، دعونا نستعرض مهاراتنا في ويب3 ونعدّن إن إف تي. في نهاية هذا البرنامج التعليمي، ستتمكن من تعدين ما تشاء من رموز إن إف تي كما يحلو لقلبك (ومحفظتك)!

لنبدأ!

## الخطوة 1: تثبيت ويب3 {#install-web3}

إذا كنت قد اتبعت البرنامج التعليمي الأول حول إنشاء عقد إن إف تي الذكي الخاص بك، فلديك بالفعل خبرة في استخدام إيثرز.جي إس. تشبه ويب3 مكتبة Ethers، حيث إنها مكتبة تُستخدم لتسهيل إنشاء الطلبات إلى بلوكتشين إيثريوم. في هذا البرنامج التعليمي، سوف نستخدم [ألكيمي ويب3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)، وهي مكتبة ويب3 مُحسَّنة توفر محاولات إعادة تلقائية ودعمًا قويًا لـ WebSocket.

في الدليل الرئيسي لمشروعك، قم بتشغيل:

```
npm install @alch/alchemy-web3
```

## الخطوة 2: إنشاء ملف `mint-nft.js` {#create-mintnftjs}

داخل دليل `scripts` الخاص بك، قم بإنشاء ملف `mint-nft.js` وأضف أسطر التعليمات البرمجية التالية:

```js
require("dotenv").config()\nconst API_URL = process.env.API_URL\nconst { createAlchemyWeb3 } = require("@alch/alchemy-web3")\nconst web3 = createAlchemyWeb3(API_URL)
```

## الخطوة 3: الحصول على واجهة ABI الخاصة بالعقد {#contract-abi}

واجهة التطبيق الثنائية (ABI) لعقدنا هي الواجهة للتفاعل مع عقدنا الذكي. يمكنك معرفة المزيد عن واجهات ABI للعقود [هنا](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). يقوم هارد هات تلقائيًا بإنشاء واجهة ABI لنا وحفظها في ملف `MyNFT.json`. لاستخدام هذا، سنحتاج إلى تحليل المحتويات عن طريق إضافة أسطر التعليمات البرمجية التالية إلى ملف `mint-nft.js` الخاص بنا:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

إذا كنت تريد رؤية واجهة ABI، فيمكنك طباعتها على وحدة التحكم الخاصة بك:

```js
console.log(JSON.stringify(contract.abi))
```

لتشغيل `mint-nft.js` ورؤية واجهة ABI الخاصة بك مطبوعة على وحدة التحكم، انتقل إلى الطرفية الخاصة بك وقم بتشغيل:

```js
node scripts/mint-nft.js
```

## الخطوة 4: تكوين البيانات الوصفية لرمز إن إف تي الخاص بك باستخدام آي بي إف إس {#config-meta}

إذا كنت تتذكر من برنامجنا التعليمي في الجزء الأول، فإن وظيفة العقد الذكي `mintNFT` الخاصة بنا تأخذ معلمة tokenURI التي يجب أن تؤدي إلى مستند JSON يصف البيانات الوصفية لـ إن إف تي - وهو ما يبث الحياة في إن إف تي، مما يسمح لها بامتلاك خصائص قابلة للتكوين، مثل الاسم والوصف والصورة والسمات الأخرى.

> _نظام الملفات بين الكواكب (آي بي إف إس) هو بروتوكول لامركزي وشبكة نظير إلى نظير لتخزين البيانات ومشاركتها في نظام ملفات موزع._

سنستخدم بينياتا، وهي واجهة برمجة تطبيقات ومجموعة أدوات آي بي إف إس ملائمة، لتخزين أصول إن إف تي والبيانات الوصفية الخاصة بنا لضمان أن إن إف تي الخاص بنا لامركزي حقًا. إذا لم يكن لديك حساب بينياتا، فقم بالتسجيل للحصول على حساب مجاني [هنا](https://app.pinata.cloud) وأكمل خطوات التحقق من بريدك الإلكتروني.

بمجرد إنشاء حساب:

- انتقل إلى صفحة "الملفات" وانقر على زر "تحميل" الأزرق في الجزء العلوي الأيسر من الصفحة.

- قم بتحميل صورة إلى بينياتا - سيكون هذا هو أصل الصورة لرمز إن إف تي الخاص بك. لا تتردد في تسمية الأصل بما تشاء

- بعد التحميل، سترى معلومات الملف في الجدول في صفحة "الملفات". سترى أيضًا عمود CID. يمكنك نسخ CID بالنقر فوق زر النسخ المجاور له. يمكنك عرض ما قمت بتحميله على: `https://gateway.pinata.cloud/ipfs/<CID>`. على سبيل المثال، يمكنك العثور على الصورة التي استخدمناها على آي بي إف إس [هنا](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

للمتعلمين الأكثر اعتمادًا على البصر، تم تلخيص الخطوات المذكورة أعلاه هنا:

![كيفية تحميل صورتك إلى بينياتا](./instructionsPinata.gif)

الآن، سنرغب في تحميل مستند آخر إلى بينياتا. ولكن قبل أن نفعل ذلك، نحن بحاجة إلى إنشائه!

في الدليل الجذر الخاص بك، أنشئ ملفًا جديدًا باسم `nft-metadata.json` وأضف كود json التالي:

```json
{\n  "attributes": [\n    {\n      "trait_type": "السلالة",\n      "value": "مالتيبو"\n    },\n    {\n      "trait_type": "لون العين",\n      "value": "موكا"\n    }\n  ],\n  "description": "ألطف جرو وأكثره حساسية في العالم.",\n  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",\n  "name": "رمسيس"\n}
```

لا تتردد في تغيير البيانات في ملف json. يمكنك الإزالة من قسم السمات أو الإضافة إليه. الأهم من ذلك، تأكد من أن حقل الصورة يشير إلى موقع صورة آي بي إف إس الخاصة بك — وإلا، فإن إن إف تي الخاص بك سيتضمن صورة (لطيف جدًا!) كلب.

بمجرد الانتهاء من تحرير ملف JSON، احفظه وقم بتحميله إلى بينياتا، باتباع نفس الخطوات التي قمنا بها لتحميل الصورة.

![كيفية تحميل ملف nft-metadata.json إلى بينياتا](./uploadPinata.gif)

## الخطوة 5: إنشاء نسخة من عقدك {#instance-contract}

الآن، للتفاعل مع عقدنا، نحتاج إلى إنشاء نسخة منه في التعليمات البرمجية الخاصة بنا. للقيام بذلك، سنحتاج إلى عنوان عقدنا الذي يمكننا الحصول عليه من النشر أو [بلوك سكوت](https://eth-sepolia.blockscout.com/) من خلال البحث عن العنوان الذي استخدمته لنشر العقد.

![عرض عنوان عقدك على إيثرسكان](./view-contract-etherscan.png)

في المثال أعلاه، عنوان عقدنا هو 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

بعد ذلك، سنستخدم [طريقة العقد](https://docs.web3js.org/api/web3-eth-contract/class/Contract) في ويب3 لإنشاء عقدنا باستخدام واجهة ABI والعنوان. في ملف `mint-nft.js` الخاص بك، أضف ما يلي:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"\n\nconst nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## الخطوة 6: تحديث ملف `.env` {#update-env}

الآن، من أجل إنشاء وإرسال المعاملات إلى سلسلة إيثريوم، سنستخدم عنوان حساب إيثريوم العام الخاص بك للحصول على رقم nonce الخاص بالحساب (سيتم شرحه أدناه).

أضف مفتاحك العام إلى ملف `.env` الخاص بك — إذا كنت قد أكملت الجزء الأول من البرنامج التعليمي، فيجب أن يبدو ملف `.env` الخاص بنا الآن على هذا النحو:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"\nPRIVATE_KEY = "your-private-account-address"\nPUBLIC_KEY = "your-public-account-address"
```

## الخطوة 7: إنشاء معاملتك {#create-txn}

أولاً، دعنا نعرّف دالة باسم `mintNFT(tokenData)` وننشئ معاملتنا عن طريق القيام بما يلي:

1. احصل على _PRIVATE_KEY_ و _PUBLIC_KEY_ من ملف `.env`.

2. بعد ذلك، سنحتاج إلى تحديد رقم nonce الخاص بالحساب. تُستخدم مواصفات nonce لتتبع عدد المعاملات المرسلة من عنوانك - وهو ما نحتاجه لأغراض أمنية ولمنع [هجمات إعادة الإرسال](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). للحصول على عدد المعاملات المرسلة من عنوانك، نستخدم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. أخيرًا، سنقوم بإعداد معاملتنا بالمعلومات التالية:

- `'from': PUBLIC_KEY` — أصل معاملتنا هو عنواننا العام

- `'to': contractAddress` — العقد الذي نرغب في التفاعل معه وإرسال المعاملة إليه

- `'nonce': nonce` — رقم nonce الخاص بالحساب مع عدد المعاملات المرسلة من عنواننا

- `'gas': estimatedGas` — الغاز المقدر اللازم لإتمام المعاملة

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — العملية الحسابية التي نرغب في إجرائها في هذه المعاملة — وهي في هذه الحالة تعدين إن إف تي

يجب أن يبدو ملف `mint-nft.js` الخاص بك على هذا النحو الآن:

```js
   require('dotenv').config();\n   const API_URL = process.env.API_URL;\n   const PUBLIC_KEY = process.env.PUBLIC_KEY;\n   const PRIVATE_KEY = process.env.PRIVATE_KEY;\n\n   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");\n   const web3 = createAlchemyWeb3(API_URL);\n\n   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");\n   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";\n   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);\n\n   async function mintNFT(tokenURI) {\n     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //الحصول على أحدث nonce\n\n   //المعاملة\n     const tx = {\n       'from': PUBLIC_KEY,\n       'to': contractAddress,\n       'nonce': nonce,\n       'gas': 500000,\n       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()\n     };\n   }​
```

## الخطوة 8: توقيع المعاملة {#sign-txn}

الآن بعد أن أنشأنا معاملتنا، نحتاج إلى توقيعها لإرسالها. هنا سنستخدم مفتاحنا الخاص.

سيعطينا `web3.eth.sendSignedTransaction` تجزئة (هاش) المعاملة، والتي يمكننا استخدامها للتأكد من أن معاملتنا قد تم تعدينها ولم يتم إسقاطها من قبل الشبكة. ستلاحظ في قسم توقيع المعاملة، أننا أضفنا بعض عمليات التحقق من الأخطاء حتى نعرف ما إذا كانت معاملتنا قد تمت بنجاح.

```js
require("dotenv").config()\nconst API_URL = process.env.API_URL\nconst PUBLIC_KEY = process.env.PUBLIC_KEY\nconst PRIVATE_KEY = process.env.PRIVATE_KEY\n\nconst { createAlchemyWeb3 } = require("@alch/alchemy-web3")\nconst web3 = createAlchemyWeb3(API_URL)\n\nconst contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")\nconst contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"\nconst nftContract = new web3.eth.Contract(contract.abi, contractAddress)\n\nasync function mintNFT(tokenURI) {\n  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //الحصول على أحدث nonce\n\n  //المعاملة\n  const tx = {\n    from: PUBLIC_KEY,\n    to: contractAddress,\n    nonce: nonce,\n    gas: 500000,\n    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),\n  }\n\n  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)\n  signPromise\n    .then((signedTx) => {\n      web3.eth.sendSignedTransaction(\n        signedTx.rawTransaction,\n        function (err, hash) {\n          if (!err) {\n            console.log(\n              "تجزئة (هاش) معاملتك هو: ",\n              hash,\n              "\nتحقق من Mempool الخاص بـ Alchemy لعرض حالة معاملتك!"\n            )\n          } else {\n            console.log(\n              "حدث خطأ ما عند إرسال معاملتك:",\n              err\n            )\n          }\n        }\n      )\n    })\n    .catch((err) => {\n      console.log(" فشل الوعد:", err)\n    })\n}
```

## الخطوة 9: استدعاء `mintNFT` وتشغيل node `mint-nft.js` {#call-mintnft-fn}

هل تتذكر ملف `metadata.json` الذي قمت بتحميله إلى بينياتا؟ احصل على رمز التجزئة الخاص به من بينياتا ومرر ما يلي كمعلمة للدالة `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

إليك كيفية الحصول على رمز التجزئة:

![كيفية الحصول على رمز التجزئة للبيانات الوصفية لـ إن إف تي على بينياتا](./metadataPinata.gif)_كيفية الحصول على رمز التجزئة للبيانات الوصفية لـ إن إف تي على Pinata_

> تأكد مرة أخرى من أن رمز التجزئة الذي نسخته يرتبط بملف **metadata.json** الخاص بك عن طريق تحميل `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` في نافذة منفصلة. يجب أن تبدو الصفحة مشابهة للقطة الشاشة أدناه:

![يجب أن تعرض صفحتك البيانات الوصفية لـ json](./metadataJSON.png)_يجب أن تعرض صفحتك البيانات الوصفية لـ json_

بشكل عام، يجب أن تبدو التعليمات البرمجية الخاصة بك على هذا النحو:

```js
require("dotenv").config()\nconst API_URL = process.env.API_URL\nconst PUBLIC_KEY = process.env.PUBLIC_KEY\nconst PRIVATE_KEY = process.env.PRIVATE_KEY\n\nconst { createAlchemyWeb3 } = require("@alch/alchemy-web3")\nconst web3 = createAlchemyWeb3(API_URL)\n\nconst contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")\nconst contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"\nconst nftContract = new web3.eth.Contract(contract.abi, contractAddress)\n\nasync function mintNFT(tokenURI) {\n  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //الحصول على أحدث nonce\n\n  //المعاملة\n  const tx = {\n    from: PUBLIC_KEY,\n    to: contractAddress,\n    nonce: nonce,\n    gas: 500000,\n    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),\n  }\n\n  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)\n  signPromise\n    .then((signedTx) => {\n      web3.eth.sendSignedTransaction(\n        signedTx.rawTransaction,\n        function (err, hash) {\n          if (!err) {\n            console.log(\n              "تجزئة (هاش) معاملتك هو: ",\n              hash,\n              "\nتحقق من Mempool الخاص بـ Alchemy لعرض حالة معاملتك!"\n            )\n          } else {\n            console.log(\n              "حدث خطأ ما عند إرسال معاملتك:",\n              err\n            )\n          }\n        }\n      )\n    })\n    .catch((err) => {\n      console.log("فشل الوعد:", err)\n    })\n}\n\nmintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

الآن، قم بتشغيل `node scripts/mint-nft.js` لنشر إن إف تي الخاص بك. بعد بضع ثوانٍ، يجب أن ترى استجابة كهذه في الطرفية:

    ```
    تجزئة (هاش) معاملتك هو: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8\n\nتحقق من Mempool الخاص بـ ألكيمي لعرض حالة معاملتك!
    ```

بعد ذلك، قم بزيارة [ألكيمي mempool](https://dashboard.alchemyapi.io/mempool) الخاص بك لمعرفة حالة معاملتك (سواء كانت معلقة أو تم تعدينها أو تم إسقاطها بواسطة الشبكة). إذا تم إسقاط معاملتك، فمن المفيد أيضًا التحقق من [بلوك سكوت](https://eth-sepolia.blockscout.com/) والبحث عن تجزئة (هاش) معاملتك.

![عرض تجزئة (هاش) معاملة إن إف تي على إيثرسكان](./view-nft-etherscan.png)_عرض تجزئة (هاش) معاملة إن إف تي على Etherscan_

وهذا كل شيء! لقد قمت الآن بالنشر والتعدين باستخدام إن إف تي على بلوكتشين إيثريوم <Emoji text=":money_mouth_face:" size={1} />

باستخدام `mint-nft.js` يمكنك تعدين أي عدد من رموز إن إف تي كما يحلو لقلبك (ومحفظتك)! فقط تأكد من تمرير tokenURI جديد يصف البيانات الوصفية لـ إن إف تي (وإلا، سينتهي بك الأمر بإنشاء مجموعة من النسخ المتطابقة بمعرفات مختلفة).

من المفترض أنك ترغب في أن تكون قادرًا على عرض إن إف تي الخاص بك في محفظتك - لذا تأكد من مراجعة [الجزء 3: كيفية عرض إن إف تي الخاص بك في محفظتك](/developers/tutorials/how-to-view-nft-in-metamask/)!
