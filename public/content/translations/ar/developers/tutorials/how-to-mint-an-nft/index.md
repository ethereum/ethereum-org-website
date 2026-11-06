---
title: "كيفية سك ⁦NFT⁩ (الجزء 2/3 من سلسلة دروس ⁦NFT⁩)"
description: "يصف هذا البرنامج التعليمي كيفية سك رمز غير قابل للاستبدال ⁦(NFT)⁩ على سلسلة كتل إيثيريوم باستخدام عقدنا الذكي، و⁦Hardhat⁩، و⁦Ethers.js⁩."
author: "سومي مودجيل"
tags: ["ERC-721", "Alchemy", "Solidity", "العقود الذكية"]
skill: beginner
breadcrumb: "سك ⁦NFT⁩"
lang: ar
published: 2021-04-22
---

"سك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)" هو عملية نشر نسخة فريدة من الرمز المميز <span dir="ltr">ERC-721</span> الخاص بك على سلسلة الكتل. باستخدام عقدنا الذكي من [الجزء 1 من سلسلة دروس الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>)](/developers/tutorials/how-to-write-and-deploy-an-nft/)، دعنا نستعرض مهاراتنا في <span dir="ltr">Web3</span> ونسك رمزًا غير قابل للاستبدال (<span dir="ltr">NFT</span>). في نهاية هذا البرنامج التعليمي، ستتمكن من سك أي عدد تريده من الرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>) كما يشتهي قلبك (ومحفظتك)!

دعنا نبدأ!

## الخطوة 1: التحقق من إعداداتك {#install-web3}

إذا اتبعت البرنامج التعليمي الأول حول إنشاء العقد الذكي للرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك، فلديك بالفعل كل ما تحتاجه: مشروع <span dir="ltr">Hardhat 3</span> مع [مكون <span dir="ltr">Ethers</span> الإضافي](https://hardhat.org/docs/plugins/hardhat-ethers) و[<span dir="ltr">Ethers.js</span>](https://docs.ethers.org/v6/)، وهي مكتبة تُستخدم لجعل إنشاء الطلبات إلى سلسلة كتل [إيثيريوم](/) أسهل. سنكتب كود السك الخاص بنا كبرنامج نصي في <span dir="ltr">Hardhat</span>، بحيث يعيد استخدام إعدادات شبكة <span dir="ltr">Sepolia</span> وقيم `API_URL` و`PRIVATE_KEY` من الجزء 1 — لا يوجد شيء جديد لتثبيته.

## الخطوة 2: إنشاء ملف `mint-nft.js` {#create-mintnftjs}

داخل دليل البرامج النصية (`scripts`) الخاص بك، قم بإنشاء ملف `mint-nft.js` وأضف أسطر الكود التالية:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

كما هو الحال في البرنامج النصي للنشر الخاص بنا، يتصل `network.create()` بالشبكة التي تختارها باستخدام `--network` عند تشغيل البرنامج النصي، ويعطينا كائن `ethers` لها.

## الخطوة 3: الحصول على واجهة التطبيق الثنائية (ABI) للعقد الخاص بك {#contract-abi}

واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) للعقد الخاص بنا هي الواجهة للتفاعل مع عقدنا الذكي. يمكنك معرفة المزيد حول [واجهات التطبيق الثنائية (<span dir="ltr">ABIs</span>) للعقود](/glossary/#abi). يقوم <span dir="ltr">Hardhat</span> تلقائيًا بإنشاء واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) لنا عندما يقوم بتجميع العقد ويحفظها في ملف `artifacts/contracts/MyNFT.sol/MyNFT.json`. يقرأها مكون <span dir="ltr">Ethers</span> الإضافي في <span dir="ltr">Hardhat</span> من هناك من أجلنا عندما ننشئ مثيل العقد الخاص بنا في الخطوة 5، لذلك لا نحتاج إلى تحميلها بأنفسنا.

إذا كنت ترغب في رؤية واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>)، يمكنك طباعتها في وحدة التحكم الخاصة بك. من الدليل الجذر لمشروعك، قم بتشغيل:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## الخطوة 4: تكوين البيانات الوصفية للرمز غير القابل للاستبدال (NFT) الخاص بك باستخدام IPFS {#config-meta}

إذا كنت تتذكر من برنامجنا التعليمي في الجزء 1، فإن دالة العقد الذكي `mintNFT` الخاصة بنا تأخذ معلمة `tokenURI` التي يجب أن تشير إلى مستند <span dir="ltr">JSON</span> يصف البيانات الوصفية للرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) — وهو ما يبعث الحياة حقًا في الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>)، مما يسمح له بامتلاك خصائص قابلة للتكوين، مثل الاسم والوصف والصورة والسمات الأخرى.

> _نظام الملفات بين الكواكب (<span dir="ltr">IPFS</span>) هو بروتوكول لامركزي وشبكة نظير إلى نظير لتخزين ومشاركة البيانات في نظام ملفات موزع._

سنستخدم <span dir="ltr">Pinata</span>، وهي واجهة برمجة تطبيقات (<span dir="ltr">API</span>) ومجموعة أدوات <span dir="ltr">IPFS</span> ملائمة، لتخزين أصل الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) والبيانات الوصفية الخاصة بنا لضمان أن الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بنا لامركزي حقًا. إذا لم يكن لديك حساب <span dir="ltr">Pinata</span>، فقم بالتسجيل للحصول على حساب مجاني [هنا](https://app.pinata.cloud) وأكمل الخطوات للتحقق من بريدك الإلكتروني.

بمجرد إنشاء حساب:

- انتقل إلى [صفحة الملفات](https://app.pinata.cloud/ipfs/files) وانقر على زر "Add" (إضافة) في الزاوية العلوية اليمنى من الصفحة.

- قم بتحميل صورة إلى <span dir="ltr">Pinata</span> — ستكون هذه هي أصل الصورة للرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك. لا تتردد في تسمية الأصل بأي اسم تريده. تأكد من تحميله إلى <span dir="ltr">IPFS</span> العام: لا يمكن جلب الملفات الموجودة على [<span dir="ltr">IPFS</span> الخاص](https://docs.pinata.cloud/files/private-ipfs) بواسطة المحافظ والأسواق التي تعرض الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك.

- بعد التحميل، سترى الملف مدرجًا في صفحة الملفات مع معرف المحتوى (<span dir="ltr">CID</span>) الخاص به. انسخ معرف المحتوى (<span dir="ltr">CID</span>). يمكنك عرض ما قمت بتحميله على: `https://gateway.pinata.cloud/ipfs/<CID>`، أو من خلال البوابة المخصصة المدرجة ضمن "Gateways" (البوابات) في الشريط الجانبي لـ <span dir="ltr">Pinata</span>. يمكنك العثور على الصورة التي استخدمناها على <span dir="ltr">IPFS</span> [هنا](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)، على سبيل المثال.

الآن، سنرغب في تحميل مستند آخر إلى <span dir="ltr">Pinata</span>. ولكن قبل أن نفعل ذلك، نحتاج إلى إنشائه!

في الدليل الجذر الخاص بك، قم بإنشاء ملف جديد يسمى `nft-metadata.json` وأضف كود <span dir="ltr">JSON</span> التالي:

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

لا تتردد في تغيير البيانات في ملف <span dir="ltr">JSON</span>. يمكنك الإزالة أو الإضافة إلى قسم السمات (attributes). والأهم من ذلك، تأكد من أن حقل الصورة يشير إلى موقع صورة <span dir="ltr">IPFS</span> الخاصة بك، بالتنسيق `ipfs://<image-CID>` — وإلا، سيتضمن الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك صورة لكلب (لطيف جدًا!).

بمجرد الانتهاء من تحرير ملف <span dir="ltr">JSON</span>، احفظه وقم بتحميله إلى <span dir="ltr">Pinata</span>، باتباع نفس الخطوات التي قمنا بها لتحميل الصورة. انسخ معرف المحتوى (<span dir="ltr">CID</span>) لملف `nft-metadata.json` أيضًا؛ سنحتاجه في الخطوة 9.

## الخطوة 5: إنشاء مثيل للعقد الخاص بك {#instance-contract}

الآن، للتفاعل مع عقدنا، نحتاج إلى إنشاء مثيل له في الكود الخاص بنا. للقيام بذلك، سنحتاج إلى عنوان العقد الخاص بنا، والذي طبعه البرنامج النصي للنشر الخاص بنا في الجزء 1. يمكنك أيضًا العثور عليه على [<span dir="ltr">Etherscan</span>](https://sepolia.etherscan.io/) أو [<span dir="ltr">Blockscout</span>](https://eth-sepolia.blockscout.com/) من خلال البحث عن العنوان الذي استخدمته لنشر العقد.

![عرض عنوان العقد الخاص بك على Etherscan](./view-contract-etherscan.png)

في المثال أعلاه، عنوان العقد الخاص بنا هو <span dir="ltr">0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778</span>.

بعد ذلك، سنستخدم طريقة `getContractAt` الخاصة بمكون <span dir="ltr">Ethers</span> الإضافي في <span dir="ltr">Hardhat</span> لإنشاء عقدنا باستخدام اسمه (والذي يخبره بواجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) التي يجب استخدامها) وعنوانه. في ملف `mint-nft.js` الخاص بك، أضف ما يلي، مع استبدال العنوان بعنوانك الخاص:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## الخطوة 6: التحقق من ملف `.env` {#update-env}

يجب توقيع كل معاملة نرسلها باستخدام المفتاح الخاص لحسابك. إذا أكملت الجزء 1 من البرنامج التعليمي، فيجب أن يبدو ملف `.env` الخاص بنا بالفعل هكذا:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

ليست هناك حاجة لإضافة عنوانك العام: يستنتجه `ethers` من المفتاح الخاص.

## الخطوة 7: إنشاء معاملتك {#create-txn}

أولاً، دعنا نحدد دالة تسمى `mintNFT(tokenURI)` وننشئ معاملتنا عن طريق القيام بما يلي:

1. الحصول على الحساب الذي نرسل المعاملة منه. تُرجع `ethers.getSigners()` الحسابات المكونة للشبكة، والتي تكون على <span dir="ltr">Sepolia</span> هي الحساب الذي يوجد مفتاحه الخاص في `.env`. نظرًا لأن `mintNFT` هي `onlyOwner`، يجب أن يكون هذا هو نفس الحساب الذي نشر العقد.

1. استدعاء دالة `mintNFT` على مثيل العقد الخاص بنا، مع عنواننا الخاص كمتلقي ومعرف الموارد المنتظم (<span dir="ltr">URI</span>) للبيانات الوصفية. هذا هو الحساب الذي نرغب في إجرائه في هذه المعاملة — والذي يتمثل في هذه الحالة في سك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>).

لا تحتاج إلى حساب الرقم الفريد (عدد المعاملات المرسلة من عنوانك، والذي يمنع هجمات إعادة التشغيل)، أو حد الغاز، أو الرسوم بنفسك: يقوم `ethers` بجلبها أو تقديرها قبل إرسال المعاملة.

يجب أن يبدو ملف `mint-nft.js` الخاص بك هكذا الآن:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // أرسل المعاملة. تقوم ethers بملء الـ nonce وحد الغاز والرسوم نيابة عنا.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## الخطوة 8: توقيع المعاملة {#sign-txn}

نظرًا لأن الشبكة مكونة بمفتاحنا الخاص، يقوم `ethers` بتوقيع المعاملة به تلقائيًا قبل إرسالها.

يعود استدعاء `mintNFT` بمجرد إرسال المعاملة، ويعطينا تجزئة المعاملة، والتي يمكننا استخدامها للتأكد من أنه تم تعدين معاملتنا ولم يتم إسقاطها بواسطة الشبكة. ثم ينتظر `tx.wait()` حتى يتم تضمين المعاملة في كتلة. لقد أضفنا أيضًا بعض التحقق من الأخطاء حتى نعرف ما إذا كانت معاملتنا قد تمت بنجاح.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // أرسل المعاملة. تقوم ethers بملء الـ nonce وحد الغاز والرسوم نيابة عنا.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // انتظر حتى يتم تضمين المعاملة في كتلة
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## الخطوة 9: استدعاء `mintNFT` وتشغيل `mint-nft.js` {#call-mintnft-fn}

هل تتذكر ملف `nft-metadata.json` الذي قمت بتحميله إلى <span dir="ltr">Pinata</span>؟ احصل على معرف المحتوى (<span dir="ltr">CID</span>) الخاص به من <span dir="ltr">Pinata</span> وقم بتمرير `ipfs://<metadata-CID>` كمعلمة للدالة `mintNFT`. تقوم المحافظ والأسواق بتحليل معرفات الموارد المنتظمة (<span dir="ltr">URIs</span>) التي تبدأ بـ `ipfs://` من خلال بوابة <span dir="ltr">IPFS</span> من اختيارهم، لذلك لا يعتمد الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك على أي بوابة واحدة.

> تحقق مرة أخرى من أن معرف المحتوى (<span dir="ltr">CID</span>) الذي نسخته يرتبط بملف **nft-metadata.json** الخاص بك عن طريق تحميل `https://gateway.pinata.cloud/ipfs/<metadata-CID>` في نافذة منفصلة. يجب أن تبدو الصفحة مشابهة للقطة الشاشة أدناه:

![يجب أن تعرض صفحتك البيانات الوصفية بتنسيق json](./metadataJSON.png)_يجب أن تعرض صفحتك البيانات الوصفية بتنسيق <span dir="ltr">json</span>_

إجمالاً، يجب أن يبدو الكود الخاص بك هكذا تقريبًا:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // أرسل المعاملة. تقوم ethers بملء الـ nonce وحد الغاز والرسوم نيابة عنا.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // انتظر حتى يتم تضمين المعاملة في كتلة
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

الآن، قم بتشغيل البرنامج النصي على <span dir="ltr">Sepolia</span> لسك الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

بعد بضع ثوانٍ، يجب أن ترى استجابة مثل هذه في جهازك الطرفي:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

لرؤية تفاصيل معاملتك، ابحث عن التجزئة الخاصة بها على [<span dir="ltr">Etherscan</span>](https://sepolia.etherscan.io/) أو [<span dir="ltr">Blockscout</span>](https://eth-sepolia.blockscout.com/).

![عرض تجزئة معاملة الرمز غير القابل للاستبدال (NFT) الخاص بك على Etherscan](./view-nft-etherscan.png)_عرض تجزئة معاملة الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك على <span dir="ltr">Etherscan</span>_

وهذا كل شيء! لقد قمت الآن بنشر وسك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>) على سلسلة كتل إيثيريوم <Emoji text=":money_mouth_face:" size={1} />

باستخدام `mint-nft.js`، يمكنك سك أي عدد تريده من الرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>) كما يشتهي قلبك (ومحفظتك)! فقط تأكد من تمرير `tokenURI` جديد يصف البيانات الوصفية للرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) (وإلا، سينتهي بك الأمر بصنع مجموعة من الرموز المتطابقة بمعرفات مختلفة).

من المفترض أنك ترغب في التباهي بالرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك في محفظتك — لذا تأكد من مراجعة [الجزء 3: كيفية عرض الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك في محفظتك](/developers/tutorials/how-to-view-nft-in-metamask/)!
