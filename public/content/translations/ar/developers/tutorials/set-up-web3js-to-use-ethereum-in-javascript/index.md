---
title: "إعداد web3.js لاستخدام بلوكتشين إيثريوم في JavaScript"
description: "تعرف على كيفية إعداد وتهيئة مكتبة web3.js للتفاعل مع بلوكتشين إيثريوم من تطبيقات JavaScript."
author: "jdourlens"
tags: [ "web3.js", "جافا سكريبت" ]
skill: beginner
lang: ar
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في هذا البرنامج التعليمي، سنرى كيفية البدء في استخدام [web3.js](https://web3js.readthedocs.io/) للتفاعل مع بلوكتشين إيثريوم. يمكن استخدام Web3.js في كل من الواجهات الأمامية والخلفية لقراءة البيانات من البلوكتشين أو إجراء المعاملات وحتى نشر العقود الذكية.

الخطوة الأولى هي تضمين web3.js في مشروعك. لاستخدامه في صفحة ويب، يمكنك استيراد المكتبة مباشرةً باستخدام شبكة توصيل المحتوى (CDN) مثل JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

إذا كنت تفضل تثبيت المكتبة لاستخدامها في الواجهة الخلفية أو مشروع الواجهة الأمامية الذي يستخدم بنية، فيمكنك تثبيتها باستخدام npm:

```bash
npm install web3 --save
```

بعد ذلك، لاستيراد Web3.js إلى نص برمجي لـ Node.js أو مشروع واجهة أمامية لـ Browserify، يمكنك استخدام سطر JavaScript التالي:

```js
const Web3 = require("web3")
```

الآن بعد أن قمنا بتضمين المكتبة في المشروع، نحتاج إلى تهيئتها. يجب أن يكون مشروعك قادرًا على الاتصال بالبلوكتشين. تتواصل معظم مكتبات إيثريوم مع [عقدة](/developers/docs/nodes-and-clients/) من خلال استدعاءات RPC. لبدء موفر Web3 الخاص بنا، سنقوم بإنشاء نسخة من Web3 مع تمرير عنوان URL الخاص بالموفر كمنشئ. إذا كانت لديك عقدة أو [مثيل ganache يعمل على جهاز الكمبيوتر الخاص بك](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)، فسيبدو الأمر كما يلي:

```js
const web3 = new Web3("http://localhost:8545")
```

إذا كنت ترغب في الوصول مباشرة إلى عقدة مستضافة، فيمكنك العثور على خيارات في [العُقَد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

لاختبار أننا قمنا بتهيئة مثيل Web3 الخاص بنا بشكل صحيح، سنحاول استرداد رقم أحدث كتلة باستخدام دالة `getBlockNumber`. تقبل هذه الدالة رد اتصال كمعلمة وتُرجع رقم الكتلة كرقم صحيح.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

إذا قمت بتنفيذ هذا البرنامج، فسيطبع ببساطة رقم أحدث كتلة: أعلى البلوكتشين. يمكنك أيضًا استخدام استدعاءات دالة `await/async` لتجنب تداخل ردود الاتصال في الكود الخاص بك:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

يمكنك رؤية جميع الدوال المتاحة في مثيل Web3 في [توثيق web3.js الرسمي](https://docs.web3js.org/).

معظم مكتبات Web3 غير متزامنة لأنه في الخلفية، تجري المكتبة استدعاءات JSON-RPC إلى العقدة التي تعيد النتيجة.

<Divider />

إذا كنت تعمل في المتصفح، فإن بعض المحافظ تقوم بإدخال مثيل Web3 مباشرةً ويجب أن تحاول استخدامه كلما أمكن ذلك خاصةً إذا كنت تخطط للتفاعل مع عنوان إيثريوم الخاص بالمستخدم لإجراء المعاملات.

إليك المقتطف للكشف عما إذا كانت محفظة MetaMask متاحة ومحاولة تمكينها إذا كانت كذلك. سيسمح لك لاحقًا بقراءة رصيد المستخدم وتمكينهم من التحقق من صحة المعاملات التي تود أن يقوموا بها على بلوكتشين إيثريوم:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // طلب الوصول إلى الحساب إذا لزم الأمر
    await window.ethereum.enable()
    // الحسابات مكشوفة الآن
  } catch (error) {
    // رفض المستخدم الوصول إلى الحساب...
  }
}
```

توجد بدائل لـ web3.js مثل [Ethers.js](https://docs.ethers.io/) وهي شائعة الاستخدام أيضًا. في البرنامج التعليمي التالي، سنرى [كيفية الاستماع بسهولة إلى الكتل الواردة الجديدة على البلوكتشين ومعرفة ما تحتويه](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
