---
title: "استدعاء عقد ذكي من ⁦JavaScript⁩"
description: "كيفية استدعاء دالة عقد ذكي من ⁦JavaScript⁩ باستخدام مثال الرمز المميز ⁦Dai⁩"
author: jdourlens
tags:
  - المعاملات
  - الواجهة الأمامية
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: "استدعاء العقود من ⁦JS⁩"
lang: ar
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في هذا البرنامج التعليمي، سنرى كيفية استدعاء دالة [عقد ذكي](/developers/docs/smart-contracts/) من <span dir="ltr">JavaScript</span>. أولاً قراءة حالة العقد الذكي (على سبيل المثال، رصيد حامل <span dir="ltr">ERC-20</span>)، ثم سنقوم بتعديل حالة سلسلة الكتل عن طريق إجراء تحويل رمز مميز. يجب أن تكون على دراية مسبقاً بـ [إعداد بيئة <span dir="ltr">JS</span> للتفاعل مع سلسلة الكتل](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

في هذا المثال، سنتعامل مع الرمز المميز <span dir="ltr">DAI</span>، ولأغراض الاختبار سنقوم بعمل تفرع لسلسلة الكتل باستخدام <span dir="ltr">ganache-cli</span> وإلغاء قفل عنوان يحتوي بالفعل على الكثير من <span dir="ltr">DAI</span>:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

للتفاعل مع عقد ذكي، سنحتاج إلى عنوانه و <span dir="ltr">ABI</span> الخاص به:

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

في هذا المشروع، قمنا بتجريد <span dir="ltr">ABI</span> الكامل لـ <span dir="ltr">ERC-20</span> للاحتفاظ فقط بدالتي `balanceOf` و `transfer` ولكن يمكنك العثور على [<span dir="ltr">ABI</span> الكامل لـ <span dir="ltr">ERC-20</span> هنا](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

نحتاج بعد ذلك إلى إنشاء نسخة من العقد الذكي الخاص بنا:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

سنقوم أيضاً بإعداد عنوانين:

- العنوان الذي سيتلقى التحويل و
- العنوان الذي قمنا بإلغاء قفله بالفعل والذي سيقوم بإرساله:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

في الجزء التالي، سنستدعي الدالة `balanceOf` لاسترداد الكمية الحالية من الرموز المميزة التي يمتلكها كلا العنوانين.

## استدعاء: قراءة قيمة من عقد ذكي {#call-reading-value-from-a-smart-contract}

سيستدعي المثال الأول طريقة "ثابتة" وينفذ طريقة العقد الذكي الخاصة بها في <span dir="ltr">EVM</span> دون إرسال أي معاملة. لهذا سنقرأ رصيد <span dir="ltr">ERC-20</span> لعنوان ما. [اقرأ مقالنا حول الرموز المميزة <span dir="ltr">ERC-20</span>](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

يمكنك الوصول إلى طرق العقد الذكي المستنسخ التي قدمت <span dir="ltr">ABI</span> الخاص بها على النحو التالي: `yourContract.methods.methodname`. باستخدام الدالة `call` ستتلقى نتيجة تنفيذ الدالة.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

تذكر أن <span dir="ltr">DAI ERC-20</span> يحتوي على 18 منزلة عشرية مما يعني أنك بحاجة إلى إزالة 18 صفراً للحصول على الكمية الصحيحة. يتم إرجاع <span dir="ltr">uint256</span> كسلاسل نصية لأن <span dir="ltr">JavaScript</span> لا تتعامل مع القيم الرقمية الكبيرة. إذا لم تكن متأكداً من [كيفية التعامل مع الأرقام الكبيرة في <span dir="ltr">JS</span>، فتحقق من برنامجنا التعليمي حول <span dir="ltr">bignumber.js</span>](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## إرسال: إرسال معاملة إلى دالة عقد ذكي {#send-sending-a-transaction-to-a-smart-contract-function}

في المثال الثاني، سنستدعي دالة التحويل للعقد الذكي لـ <span dir="ltr">DAI</span> لإرسال <span dir="ltr">10 DAI</span> إلى عنواننا الثاني. تقبل دالة التحويل معاملين: عنوان المستلم وكمية الرمز المميز المراد تحويلها:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

تُرجع دالة الاستدعاء تجزئة المعاملة التي سيتم تعدينها في سلسلة الكتل. على إيثيريوم، يمكن التنبؤ بتجزئات المعاملات - هكذا يمكننا الحصول على تجزئة المعاملة قبل تنفيذها ([تعرف على كيفية حساب التجزئات هنا](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

نظراً لأن الدالة ترسل المعاملة فقط إلى سلسلة الكتل، لا يمكننا رؤية النتيجة حتى نعرف متى يتم تعدينها وتضمينها في سلسلة الكتل. في البرنامج التعليمي التالي، سنتعلم [كيفية انتظار تنفيذ معاملة على سلسلة الكتل من خلال معرفة التجزئة الخاصة بها](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).