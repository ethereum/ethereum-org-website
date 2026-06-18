---
title: "إعداد ⁦web3.js⁩ لاستخدام سلسلة كتل إيثيريوم في ⁦JavaScript⁩"
description: "تعرف على كيفية إعداد وتكوين مكتبة ⁦web3.js⁩ للتفاعل مع سلسلة كتل إيثيريوم من تطبيقات ⁦JavaScript⁩."
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: "إعداد ⁦web3.js⁩"
lang: ar
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

في هذا البرنامج التعليمي، سنرى كيفية البدء باستخدام [web3.js](https://web3js.readthedocs.io/) للتفاعل مع سلسلة كتل إيثيريوم. يمكن استخدام <span dir="ltr">Web3.js</span> في كل من الواجهات الأمامية والخلفية لقراءة البيانات من سلسلة الكتل أو إجراء المعاملات وحتى نشر العقود الذكية.

الخطوة الأولى هي تضمين <span dir="ltr">web3.js</span> في مشروعك. لاستخدامها في صفحة ويب، يمكنك استيراد المكتبة مباشرة باستخدام شبكة توصيل المحتوى (CDN) مثل <span dir="ltr">JSDeliver</span>.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

إذا كنت تفضل تثبيت المكتبة لاستخدامها في الواجهة الخلفية أو مشروع واجهة أمامية يستخدم عملية بناء، فيمكنك تثبيتها باستخدام <span dir="ltr">npm</span>:

```bash
npm install web3 --save
```

ثم لاستيراد <span dir="ltr">Web3.js</span> إلى برنامج نصي في <span dir="ltr">Node.js</span> أو مشروع واجهة أمامية يستخدم <span dir="ltr">Browserify</span>، يمكنك استخدام سطر <span dir="ltr">JavaScript</span> التالي:

```js
const Web3 = require("web3")
```

الآن بعد أن قمنا بتضمين المكتبة في المشروع، نحتاج إلى تهيئتها. يجب أن يكون مشروعك قادرًا على التواصل مع سلسلة الكتل. تتواصل معظم مكتبات إيثيريوم مع [عقدة](/developers/docs/nodes-and-clients/) من خلال استدعاءات <span dir="ltr">RPC</span>. لبدء مزود <span dir="ltr">Web3</span> الخاص بنا، سنقوم بإنشاء مثيل <span dir="ltr">Web3</span> وتمرير عنوان <span dir="ltr">URL</span> الخاص بالمزود كـ مُنشئ. إذا كان لديك عقدة أو [مثيل Ganache يعمل على جهاز الكمبيوتر الخاص بك](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)، فسيبدو الأمر هكذا:

```js
const web3 = new Web3("http://localhost:8545")
```

إذا كنت ترغب في الوصول مباشرة إلى عقدة مستضافة، يمكنك العثور على خيارات في [العقد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

لاختبار أننا قمنا بتكوين مثيل <span dir="ltr">Web3</span> الخاص بنا بشكل صحيح، سنحاول استرداد أحدث رقم كتلة باستخدام الدالة `getBlockNumber`. تقبل هذه الدالة استدعاءً (callback) كمعلمة وتُرجع رقم الكتلة كعدد صحيح.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

إذا قمت بتنفيذ هذا البرنامج، فسيقوم ببساطة بطباعة أحدث رقم كتلة: قمة سلسلة الكتل. يمكنك أيضًا استخدام استدعاءات الدالة `await/async` لتجنب تداخل الاستدعاءات (callbacks) في الكود الخاص بك:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

يمكنك رؤية جميع الدوال المتاحة في مثيل <span dir="ltr">Web3</span> في [وثائق web3.js الرسمية](https://docs.web3js.org/).

معظم مكتبات <span dir="ltr">Web3</span> غير متزامنة (asynchronous) لأنه في الخلفية تقوم المكتبة بإجراء استدعاءات <span dir="ltr">JSON-RPC</span> إلى العقدة التي ترسل النتيجة مرة أخرى.

<Divider />

إذا كنت تعمل في المتصفح، فإن بعض المحافظ تقوم بحقن مثيل <span dir="ltr">Web3</span> مباشرة ويجب أن تحاول استخدامه كلما أمكن ذلك، خاصة إذا كنت تخطط للتفاعل مع عنوان إيثيريوم الخاص بالمستخدم لإجراء المعاملات.

إليك المقتطف البرمجي لاكتشاف ما إذا كانت محفظة ميتاماسك متاحة ومحاولة تمكينها إذا كانت كذلك. سيسمح لك لاحقًا بقراءة رصيد المستخدم وتمكينه من التحقق من صحة المعاملات التي ترغب في جعله يقوم بها على سلسلة كتل إيثيريوم:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // اطلب الوصول إلى الحساب إذا لزم الأمر
    await window.ethereum.enable()
    // الحسابات مكشوفة الآن
  } catch (error) {
    // رفض المستخدم الوصول إلى الحساب...
  }
}
```

توجد بدائل لـ <span dir="ltr">web3.js</span> مثل [Ethers.js](https://docs.ethers.io/) وهي شائعة الاستخدام أيضًا. في البرنامج التعليمي التالي سنرى [كيفية الاستماع بسهولة إلى الكتل الواردة الجديدة على سلسلة الكتل ومعرفة ما تحتويه](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).