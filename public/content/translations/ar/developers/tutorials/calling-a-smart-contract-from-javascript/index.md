---
title: استدعاء عقد ذكي من JavaScript
description: كيفية استدعاء دالة عقد ذكي من JavaScript باستخدام مثال لرمز Dai
author: jdourlens
tags: [ "المعاملات", "واجهة التطبيق", "JavaScript", "web3.js" ]
skill: beginner
lang: ar
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في هذا البرنامج التعليمي، سنرى كيفية استدعاء دالة [عقد ذكي](/developers/docs/smart-contracts/) من JavaScript. أولاً، قراءة حالة العقد الذكي (على سبيل المثال، رصيد حامل ERC20)، ثم سنقوم بتعديل حالة البلوكتشين عن طريق إجراء تحويل للرمز المميز. يجب أن تكون على دراية مسبقًا بـ [إعداد بيئة JS للتفاعل مع البلوكتشين](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

في هذا المثال سنتعامل مع رمز DAI، بغرض الاختبار، سنقوم بعمل انقسام للبلوكتشين باستخدام ganache-cli وسنفتح عنوانًا يحتوي بالفعل على الكثير من DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

للتفاعل مع عقد ذكي، سنحتاج إلى عنوانه وواجهة التطبيق الثنائية (ABI):

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

لهذا المشروع، قمنا بتجريد واجهة التطبيق الثنائية (ABI) الكاملة لـ ERC20 للإبقاء فقط على دالتي `balanceOf` و`transfer`، ولكن يمكنك العثور على [واجهة التطبيق الثنائية (ABI) الكاملة لـ ERC20 هنا](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

بعد ذلك، نحتاج إلى إنشاء مثيل لعقدنا الذكي:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

سنقوم أيضًا بإعداد عنوانين:

- العنوان الذي سيتلقى التحويل و
- والعنوان الذي فتحناه مسبقًا الذي سيرسلها:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

في الجزء التالي، سنستدعي دالة `balanceOf` لاسترداد الكمية الحالية من الرموز التي يحتفظ بها كلا العنوانين.

## الاستدعاء: قراءة قيمة من عقد ذكي {#call-reading-value-from-a-smart-contract}

سيستدعي المثال الأول طريقة "ثابتة" وينفذ طريقة العقد الذكي الخاصة به في آلة إيثريوم الافتراضية (EVM) دون إرسال أي معاملة. لهذا، سنقرأ رصيد ERC20 الخاص بأحد العناوين. [اقرأ مقالنا حول رموز ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

يمكنك الوصول إلى طرق العقد الذكي الذي تم إنشاء مثيل له والذي قدمت له واجهة التطبيق الثنائية (ABI) على النحو التالي: `yourContract.methods.methodname`. باستخدام دالة `call`، ستتلقى نتيجة تنفيذ الدالة.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("حدث خطأ", err)
    return
  }
  console.log("الرصيد هو: ", res)
})
```

تذكر أن DAI ERC20 له 18 منزلة عشرية، مما يعني أنك بحاجة إلى إزالة 18 صفرًا للحصول على المبلغ الصحيح. يتم إرجاع `uint256` كسلاسل نصية لأن JavaScript لا يتعامل مع القيم الرقمية الكبيرة. إذا لم تكن متأكدًا من [كيفية التعامل مع الأعداد الكبيرة في JS، فاطلع على برنامجنا التعليمي حول bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## الإرسال: إرسال معاملة إلى دالة عقد ذكي {#send-sending-a-transaction-to-a-smart-contract-function}

في المثال الثاني، سنستدعي دالة التحويل الخاصة بعقد DAI الذكي لإرسال 10 DAI إلى عنواننا الثاني. تقبل دالة التحويل معاملين: عنوان المستلم وكمية الرموز المراد تحويلها:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("حدث خطأ", err)
      return
    }
    console.log("تجزئة (هاش) المعاملة: " + res)
  })
```

يُرجع هذا الاستدعاء التجزئة (الهاش) للمعاملة التي سيتم تعدينها في البلوكتشين. في إيثريوم، يمكن التنبؤ بتجزئات (هاشات) المعاملات - وهكذا يمكننا الحصول على التجزئة (الهاش) للمعاملة قبل تنفيذها ([تعرف على كيفية حساب التجزئات هنا](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

بما أن الدالة تقوم فقط بإرسال المعاملة إلى البلوكتشين، لا يمكننا رؤية النتيجة حتى نعرف متى يتم تعدينها وتضمينها في البلوكتشين. في البرنامج التعليمي التالي، سنتعلم [كيفية انتظار تنفيذ معاملة على البلوكتشين من خلال معرفة التجزئة (الهاش) الخاصة بها](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
