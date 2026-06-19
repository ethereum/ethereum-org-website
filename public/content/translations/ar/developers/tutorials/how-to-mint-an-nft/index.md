---
title: "كيفية سك ⁦NFT⁩ (الجزء 2/3 من سلسلة دروس ⁦NFT⁩)"
description: "يصف هذا البرنامج التعليمي كيفية سك ⁦NFT⁩ على سلسلة كتل إيثيريوم باستخدام عقدنا الذكي و⁦Web3⁩."
author: "سومي مودجيل"
tags: ["ERC-721", "alchemy", "solidity", "العقود الذكية"]
skill: beginner
breadcrumb: "سك ⁦NFT⁩"
lang: ar
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): <span dir="ltr">$69 Million</span>
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): <span dir="ltr">$11 Million</span>
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): <span dir="ltr">$6 Million</span>

جميعهم قاموا بسك رموزهم غير القابلة للاستبدال (NFTs) باستخدام API القوية من Alchemy. في هذا البرنامج التعليمي، سنعلمك كيفية القيام بالشيء نفسه في أقل من 10 دقائق.

"عملية سك NFT" هي عملية نشر نسخة فريدة من رمز <span dir="ltr">ERC-721</span> الخاص بك على سلسلة الكتل. باستخدام عقدنا الذكي من [الجزء الأول من سلسلة دروس NFT هذه](/developers/tutorials/how-to-write-and-deploy-an-nft/)، دعنا نستعرض مهاراتنا في Web3 ونسك NFT. في نهاية هذا البرنامج التعليمي، ستتمكن من سك أي عدد تريده من رموز NFT كما يشتهي قلبك (ومحفظتك)!

دعونا نبدأ!

## الخطوة 1: تثبيت Web3 {#install-web3}

إذا اتبعت البرنامج التعليمي الأول حول إنشاء العقد الذكي لـ NFT الخاص بك، فلديك بالفعل خبرة في استخدام Ethers.js. تشبه Web3 مكتبة Ethers، حيث إنها مكتبة تُستخدم لتسهيل إنشاء الطلبات إلى سلسلة كتل [إيثيريوم](/). في هذا البرنامج التعليمي، سنستخدم [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)، وهي مكتبة Web3 محسنة توفر إعادة المحاولة التلقائية ودعمًا قويًا لـ WebSocket.

في الدليل الرئيسي لمشروعك، قم بتشغيل:

```
npm install @alch/alchemy-web3
```

## الخطوة 2: إنشاء ملف `mint-nft.js` {#create-mintnftjs}

داخل دليل البرامج النصية (scripts) الخاص بك، قم بإنشاء ملف `mint-nft.js` وأضف أسطر التعليمات البرمجية التالية:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## الخطوة 3: الحصول على واجهة التطبيق الثنائية (ABI) للعقد الخاص بك {#contract-abi}

واجهة التطبيق الثنائية (ABI) للعقد الخاص بنا هي الواجهة للتفاعل مع عقدنا الذكي. يمكنك معرفة المزيد حول واجهات التطبيق الثنائية للعقود [هنا](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). يقوم Hardhat تلقائيًا بإنشاء ABI لنا ويحفظه في ملف `MyNFT.json`. من أجل استخدام هذا، سنحتاج إلى تحليل المحتويات عن طريق إضافة أسطر التعليمات البرمجية التالية إلى ملف `mint-nft.js` الخاص بنا:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

إذا كنت ترغب في رؤية ABI، يمكنك طباعته في وحدة التحكم الخاصة بك:

```js
console.log(JSON.stringify(contract.abi))
```

لتشغيل `mint-nft.js` ورؤية ABI الخاص بك مطبوعًا على وحدة التحكم، انتقل إلى جهازك الطرفي (terminal) وقم بتشغيل:

```js
node scripts/mint-nft.js
```

## الخطوة 4: تكوين البيانات الوصفية لـ NFT الخاص بك باستخدام IPFS {#config-meta}

إذا كنت تتذكر من برنامجنا التعليمي في الجزء الأول، فإن دالة العقد الذكي `mintNFT` الخاصة بنا تأخذ معلمة tokenURI التي يجب أن تشير إلى مستند JSON يصف البيانات الوصفية لـ NFT — وهو ما يبعث الحياة حقًا في NFT، مما يسمح له بامتلاك خصائص قابلة للتكوين، مثل الاسم والوصف والصورة والسمات الأخرى.

> _نظام الملفات بين الكواكب (IPFS) هو بروتوكول لامركزي وشبكة نظير إلى نظير لتخزين ومشاركة البيانات في نظام ملفات موزع._

سنستخدم Pinata، وهي واجهة برمجة تطبيقات (API) ومجموعة أدوات IPFS ملائمة، لتخزين أصل NFT والبيانات الوصفية الخاصة بنا لضمان أن يكون NFT الخاص بنا لامركزيًا حقًا. إذا لم يكن لديك حساب Pinata، فقم بالتسجيل للحصول على حساب مجاني [هنا](https://app.pinata.cloud) وأكمل الخطوات للتحقق من بريدك الإلكتروني.

بمجرد إنشاء حساب:

- انتقل إلى صفحة "الملفات" (Files) وانقر على زر "تحميل" (Upload) الأزرق في أعلى يسار الصفحة.

- قم بتحميل صورة إلى Pinata — ستكون هذه هي صورة الأصل لـ NFT الخاص بك. لا تتردد في تسمية الأصل بأي اسم تريده.

- بعد التحميل، سترى معلومات الملف في الجدول الموجود في صفحة "الملفات". سترى أيضًا عمود CID. يمكنك نسخ CID بالنقر فوق زر النسخ بجواره. يمكنك عرض ما قمت بتحميله على: `https://gateway.pinata.cloud/ipfs/<CID>`. يمكنك العثور على الصورة التي استخدمناها على IPFS [هنا](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)، على سبيل المثال.

للمتعلمين البصريين، تم تلخيص الخطوات المذكورة أعلاه هنا:

![How to upload your image to Pinata](./instructionsPinata.gif)

الآن، سنرغب في تحميل مستند آخر إلى Pinata. ولكن قبل أن نفعل ذلك، نحتاج إلى إنشائه!

في الدليل الجذري الخاص بك، قم بإنشاء ملف جديد يسمى `nft-metadata.json` وأضف كود json التالي:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

لا تتردد في تغيير البيانات في ملف json. يمكنك إزالة أو إضافة إلى قسم السمات (attributes). والأهم من ذلك، تأكد من أن حقل الصورة (image) يشير إلى موقع صورة IPFS الخاصة بك — وإلا، سيتضمن NFT الخاص بك صورة لكلب (لطيف جدًا!).

بمجرد الانتهاء من تحرير ملف JSON، احفظه وقم بتحميله إلى Pinata، باتباع نفس الخطوات التي قمنا بها لتحميل الصورة.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## الخطوة 5: إنشاء نسخة من العقد الخاص بك {#instance-contract}

الآن، للتفاعل مع عقدنا، نحتاج إلى إنشاء نسخة منه في الكود الخاص بنا. للقيام بذلك، سنحتاج إلى عنوان العقد الخاص بنا والذي يمكننا الحصول عليه من النشر أو [Blockscout](https://eth-sepolia.blockscout.com/) من خلال البحث عن العنوان الذي استخدمته لنشر العقد.

![View your contract address on Etherscan](./view-contract-etherscan.png)

في المثال أعلاه، عنوان العقد الخاص بنا هو <span dir="ltr">0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778</span>.

بعد ذلك سنستخدم [طريقة العقد](https://docs.web3js.org/api/web3-eth-contract/class/Contract) في Web3 لإنشاء عقدنا باستخدام ABI والعنوان. في ملف `mint-nft.js` الخاص بك، أضف ما يلي:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## الخطوة 6: تحديث ملف `.env` {#update-env}

الآن، من أجل إنشاء وإرسال المعاملات إلى سلسلة إيثيريوم، سنستخدم عنوان حساب إيثيريوم العام الخاص بك للحصول على الرقم الفريد (nonce) للحساب (سنشرح ذلك أدناه).

أضف مفتاحك العام إلى ملف `.env` الخاص بك — إذا أكملت الجزء الأول من البرنامج التعليمي، فيجب أن يبدو ملف `.env` الخاص بنا الآن هكذا:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## الخطوة 7: إنشاء معاملتك {#create-txn}

أولاً، دعنا نحدد دالة تسمى `mintNFT(tokenData)` وننشئ معاملتنا عن طريق القيام بما يلي:

1. احصل على _PRIVATE_KEY_ و _PUBLIC_KEY_ من ملف `.env`.

1. بعد ذلك، سنحتاج إلى معرفة الرقم الفريد (nonce) للحساب. تُستخدم مواصفات الرقم الفريد لتتبع عدد المعاملات المرسلة من عنوانك — وهو ما نحتاجه لأغراض أمنية ولمنع [هجمات إعادة الإرسال](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). للحصول على عدد المعاملات المرسلة من عنوانك، نستخدم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. أخيرًا سنقوم بإعداد معاملتنا بالمعلومات التالية:

- `'from': PUBLIC_KEY` — أصل معاملتنا هو عنواننا العام

- `'to': contractAddress` — العقد الذي نرغب في التفاعل معه وإرسال المعاملة إليه

- `'nonce': nonce` — الرقم الفريد للحساب مع عدد المعاملات المرسلة من عنواننا

- `'gas': estimatedGas` — الغاز المقدر اللازم لإكمال المعاملة

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — العملية الحسابية التي نرغب في إجرائها في هذه المعاملة — والتي في هذه الحالة هي سك NFT

يجب أن يبدو ملف `mint-nft.js` الخاص بك هكذا الآن:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //الحصول على أحدث رقم فريد

   //المعاملة
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## الخطوة 8: توقيع المعاملة {#sign-txn}

الآن بعد أن أنشأنا معاملتنا، نحتاج إلى توقيعها من أجل إرسالها. هنا سنستخدم مفتاحنا الخاص.

سيعطينا `web3.eth.sendSignedTransaction` تجزئة المعاملة، والتي يمكننا استخدامها للتأكد من أنه تم تعدين معاملتنا ولم يتم إسقاطها بواسطة الشبكة. ستلاحظ في قسم توقيع المعاملة، أننا أضفنا بعض التحقق من الأخطاء حتى نعرف ما إذا كانت معاملتنا قد تمت بنجاح.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //الحصول على أحدث رقم فريد

  //المعاملة
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## الخطوة 9: استدعاء `mintNFT` وتشغيل عقدة `mint-nft.js` {#call-mintnft-fn}

هل تتذكر `metadata.json` الذي قمت بتحميله إلى Pinata؟ احصل على رمز التجزئة الخاص به من Pinata وقم بتمرير ما يلي كمعلمة إلى الدالة `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

إليك كيفية الحصول على رمز التجزئة:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_كيفية الحصول على رمز تجزئة البيانات الوصفية لـ NFT الخاص بك على Pinata_

> تحقق مرة أخرى من أن رمز التجزئة الذي نسخته يرتبط بـ **metadata.json** الخاص بك عن طريق تحميل `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` في نافذة منفصلة. يجب أن تبدو الصفحة مشابهة للقطة الشاشة أدناه:

![Your page should display the json metadata](./metadataJSON.png)_يجب أن تعرض صفحتك البيانات الوصفية بتنسيق json_

بشكل عام، يجب أن يبدو الكود الخاص بك هكذا:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //الحصول على أحدث رقم فريد

  //المعاملة
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

الآن، قم بتشغيل `node scripts/mint-nft.js` لنشر NFT الخاص بك. بعد بضع ثوانٍ، يجب أن ترى استجابة مثل هذه في جهازك الطرفي:

    تجزئة المعاملة الخاصة بك هي: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    تحقق من مجمع الذاكرة (Mempool) الخاص بـ Alchemy لعرض حالة معاملتك!

بعد ذلك، قم بزيارة [مجمع الذاكرة في Alchemy](https://dashboard.alchemyapi.io/mempool) لمعرفة حالة معاملتك (سواء كانت معلقة أو تم تعدينها أو تم إسقاطها بواسطة الشبكة). إذا تم إسقاط معاملتك، فمن المفيد أيضًا التحقق من [Blockscout](https://eth-sepolia.blockscout.com/) والبحث عن تجزئة المعاملة الخاصة بك.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_عرض تجزئة معاملة NFT الخاصة بك على Etherscan_

وهذا كل شيء! لقد قمت الآن بنشر وسك NFT على سلسلة كتل إيثيريوم <Emoji text=":money_mouth_face:" size={1} />

باستخدام `mint-nft.js` يمكنك سك أي عدد تريده من رموز NFT كما يشتهي قلبك (ومحفظتك)! فقط تأكد من تمرير tokenURI جديد يصف البيانات الوصفية لـ NFT (وإلا، سينتهي بك الأمر بصنع مجموعة من الرموز المتطابقة بمعرفات مختلفة).

من المفترض أنك ترغب في التباهي بـ NFT الخاص بك في محفظتك — لذا تأكد من الاطلاع على [الجزء 3: كيفية عرض NFT الخاص بك في محفظتك](/developers/tutorials/how-to-view-nft-in-metamask/)!