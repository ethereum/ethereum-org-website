---
title: "إرسال المعاملات باستخدام ⁦Web3⁩"
description: "هذا دليل مبسط للمبتدئين حول إرسال معاملات إيثيريوم باستخدام ⁦Web3⁩. هناك ثلاث خطوات رئيسية لإرسال معاملة إلى سلسلة كتل إيثيريوم: الإنشاء، والتوقيع، والبث. سنستعرض هذه الخطوات الثلاث."
author: "إيلان هالبرن"
tags: ["المعاملات", "web3.js", "alchemy"]
skill: beginner
breadcrumb: "إرسال المعاملات"
lang: ar
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

هذا دليل مبسط للمبتدئين حول إرسال معاملات إيثيريوم باستخدام <span dir="ltr">Web3</span>. هناك ثلاث خطوات رئيسية لإرسال معاملة إلى سلسلة كتل إيثيريوم: الإنشاء، والتوقيع، والبث. سنستعرض هذه الخطوات الثلاث، ونأمل أن نجيب على أي أسئلة قد تكون لديك! في هذا البرنامج التعليمي، سنستخدم [Alchemy](https://www.alchemy.com/) لإرسال معاملاتنا إلى سلسلة إيثيريوم. يمكنك [إنشاء حساب Alchemy مجاني هنا](https://auth.alchemyapi.io/signup).

**ملاحظة:** هذا الدليل مخصص لتوقيع معاملاتك في _الواجهة الخلفية_ (backend) لتطبيقك. إذا كنت ترغب في دمج توقيع معاملاتك في الواجهة الأمامية (frontend)، فتحقق من دمج [<span dir="ltr">Web3</span> مع مزود متصفح](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## الأساسيات {#the-basics}

مثل معظم مطوري سلسلة الكتل عند بدايتهم، ربما تكون قد أجريت بعض الأبحاث حول كيفية إرسال معاملة (وهو أمر يفترض أن يكون بسيطًا جدًا) وواجهت عددًا كبيرًا من الأدلة، كل منها يقول أشياء مختلفة ويتركك مرتبكًا ومشتتًا بعض الشيء. إذا كنت في هذا الموقف، فلا تقلق؛ لقد كنا جميعًا هناك في مرحلة ما! لذا، قبل أن نبدأ، دعونا نوضح بعض الأمور:

### 1\. لا تقوم Alchemy بتخزين مفاتيحك الخاصة {#alchemy-does-not-store-your-private-keys}

- هذا يعني أن Alchemy لا يمكنها توقيع وإرسال المعاملات نيابة عنك. السبب في ذلك هو لأغراض أمنية. لن تطلب منك Alchemy أبدًا مشاركة مفتاحك الخاص، ويجب ألا تشارك مفتاحك الخاص أبدًا مع عقدة مستضافة (أو مع أي شخص آخر في هذا الصدد).
- يمكنك القراءة من سلسلة الكتل باستخدام <span dir="ltr">API</span> الأساسية لـ Alchemy، ولكن للكتابة عليها ستحتاج إلى استخدام شيء آخر لتوقيع معاملاتك قبل إرسالها عبر Alchemy (وهذا ينطبق على أي [خدمة عقدة](/developers/docs/nodes-and-clients/nodes-as-a-service/) أخرى).

### 2\. ما هو "المُوقِّع" (signer)؟ {#what-is-a-signer}

- يقوم المُوقِّعون بتوقيع المعاملات نيابة عنك باستخدام مفتاحك الخاص. في هذا البرنامج التعليمي، سنستخدم [<span dir="ltr">Alchemy web3</span>](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) لتوقيع معاملتنا، ولكن يمكنك أيضًا استخدام أي مكتبة <span dir="ltr">Web3</span> أخرى.
- في الواجهة الأمامية، من الأمثلة الجيدة على المُوقِّع هو [ميتاماسك](https://metamask.io/)، والذي سيقوم بتوقيع وإرسال المعاملات نيابة عنك.

### 3\. لماذا أحتاج إلى توقيع معاملاتي؟ {#why-do-i-need-to-sign-my-transactions}

- يجب على كل مستخدم يرغب في إرسال معاملة على شبكة إيثيريوم توقيع المعاملة (باستخدام مفتاحه الخاص)، من أجل التحقق من أن مصدر المعاملة هو بالفعل الشخص الذي يدعيه.
- من المهم جدًا حماية هذا المفتاح الخاص، حيث أن الوصول إليه يمنح تحكمًا كاملاً في حساب إيثيريوم الخاص بك، مما يسمح لك (أو لأي شخص لديه حق الوصول) بإجراء معاملات نيابة عنك.

### 4\. كيف أحمي مفتاحي الخاص؟ {#how-do-i-protect-my-private-key}

- هناك العديد من الطرق لحماية مفتاحك الخاص واستخدامه لإرسال المعاملات. في هذا البرنامج التعليمي، سنستخدم ملف `.env`. ومع ذلك، يمكنك أيضًا استخدام مزود منفصل يخزن المفاتيح الخاصة، أو استخدام ملف مخزن المفاتيح، أو خيارات أخرى.

### 5\. ما الفرق بين `eth_sendTransaction` و `eth_sendRawTransaction`؟ {#difference-between-send-and-send-raw}

`eth_sendTransaction` و `eth_sendRawTransaction` هما دالتان في <span dir="ltr">API</span> إيثيريوم تقومان ببث معاملة إلى شبكة إيثيريوم بحيث تتم إضافتها إلى كتلة مستقبلية. يختلفان في كيفية تعاملهما مع توقيع المعاملات.

- تُستخدم [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) لإرسال المعاملات _غير الموقعة_، مما يعني أن العقدة التي ترسل إليها يجب أن تدير مفتاحك الخاص حتى تتمكن من توقيع المعاملة قبل بثها إلى السلسلة. نظرًا لأن Alchemy لا تحتفظ بالمفاتيح الخاصة للمستخدمين، فإنها لا تدعم هذه الطريقة.
- تُستخدم [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) لبث المعاملات التي تم توقيعها بالفعل. هذا يعني أنه يجب عليك أولاً استخدام [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)، ثم تمرير النتيجة إلى `eth_sendRawTransaction`.

عند استخدام <span dir="ltr">Web3</span>، يتم الوصول إلى `eth_sendRawTransaction` عن طريق استدعاء الدالة [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

هذا ما سنستخدمه في هذا البرنامج التعليمي.

### 6\. ما هي مكتبة Web3؟ {#what-is-the-web3-library}

- <span dir="ltr">Web3.js</span> هي مكتبة تغليف (wrapper) حول استدعاءات <span dir="ltr">JSON-RPC</span> القياسية والتي يشيع استخدامها في تطوير إيثيريوم.
- هناك العديد من مكتبات <span dir="ltr">Web3</span> للغات مختلفة. في هذا البرنامج التعليمي، سنستخدم [<span dir="ltr">Alchemy Web3</span>](https://docs.alchemy.com/reference/api-overview) المكتوبة بلغة <span dir="ltr">JavaScript</span>. يمكنك التحقق من الخيارات الأخرى [هنا](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) مثل [<span dir="ltr">Ethers.js</span>](https://docs.ethers.org/v5/).

حسنًا، الآن بعد أن أجبنا على بعض هذه الأسئلة، دعنا ننتقل إلى البرنامج التعليمي. لا تتردد في طرح الأسئلة في أي وقت في [ديسكورد](https://discord.gg/gWuC7zB) الخاص بـ Alchemy!

### 7\. كيف ترسل معاملات آمنة، ومُحسّنة الغاز، وخاصة؟ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [تمتلك Alchemy مجموعة من واجهات برمجة تطبيقات المعاملات (Transact APIs)](https://docs.alchemy.com/reference/transact-api-quickstart). يمكنك استخدامها لإرسال معاملات معززة، ومحاكاة المعاملات قبل حدوثها، وإرسال معاملات خاصة، وإرسال معاملات مُحسّنة الغاز.
- يمكنك أيضًا استخدام [<span dir="ltr">Notify API</span>](https://docs.alchemy.com/docs/alchemy-notify) لتلقي تنبيهات عندما يتم سحب معاملتك من مجمع الذاكرة وإضافتها إلى السلسلة.

**ملاحظة:** يتطلب هذا الدليل حساب Alchemy، وعنوان إيثيريوم أو محفظة ميتاماسك، وتثبيت <span dir="ltr">NodeJs</span> و <span dir="ltr">npm</span>. إذا لم يكن الأمر كذلك، فاتبع هذه الخطوات:

1.  [إنشاء حساب Alchemy مجاني](https://auth.alchemyapi.io/signup)
2.  [إنشاء حساب ميتاماسك](https://metamask.io/) (أو الحصول على عنوان إيثيريوم)
3.  [اتبع هذه الخطوات لتثبيت NodeJs و NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## خطوات إرسال معاملتك {#steps-to-sending-your-transaction}

### 1\. إنشاء تطبيق Alchemy على شبكة اختبار Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

انتقل إلى [لوحة تحكم Alchemy](https://dashboard.alchemyapi.io/) الخاصة بك وأنشئ تطبيقًا جديدًا، مع اختيار Sepolia (أو أي شبكة اختبار أخرى) كشبكتك.

### 2\. طلب ETH من صنبور Sepolia {#request-eth-from-sepolia-faucet}

اتبع التعليمات الموجودة على [صنبور Sepolia من Alchemy](https://www.sepoliafaucet.com/) لتلقي <span dir="ltr">ETH</span>. تأكد من تضمين عنوان إيثيريوم الخاص بك على **Sepolia** (من ميتاماسك) وليس شبكة أخرى. بعد اتباع التعليمات، تحقق مرة أخرى من أنك تلقيت <span dir="ltr">ETH</span> في محفظتك.

### 3\. إنشاء دليل مشروع جديد والانتقال إليه باستخدام `cd` {#create-a-new-project-direction}

أنشئ دليل مشروع جديد من سطر الأوامر (الطرفية لأجهزة Mac) وانتقل إليه:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. تثبيت Alchemy Web3 (أو أي مكتبة Web3) {#install-alchemy-web3}

قم بتشغيل الأمر التالي في دليل مشروعك لتثبيت [<span dir="ltr">Alchemy Web3</span>](https://docs.alchemy.com/reference/api-overview):

ملاحظة، إذا كنت ترغب في استخدام مكتبة <span dir="ltr">Ethers.js</span>، [فاتبع التعليمات هنا](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. تثبيت dotenv {#install-dotenv}

سنستخدم ملف `.env` لتخزين مفتاح <span dir="ltr">API</span> والمفتاح الخاص بنا بأمان.

```
npm install dotenv --save
```

### 6\. إنشاء ملف `.env` {#create-the-dotenv-file}

أنشئ ملف `.env` في دليل مشروعك وأضف ما يلي (مع استبدال "`your-api-url`" و "`your-private-key`")

- للعثور على عنوان URL الخاص بـ <span dir="ltr">API</span> لـ Alchemy، انتقل إلى صفحة تفاصيل التطبيق الذي أنشأته للتو في لوحة التحكم الخاصة بك، وانقر على "View Key" في الزاوية العلوية اليمنى، وانسخ عنوان <span dir="ltr">HTTP URL</span>.
- للعثور على مفتاحك الخاص باستخدام ميتاماسك، تحقق من هذا [الدليل](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
لا تقم بإيداع (commit) ملف <code>.env</code>! يرجى التأكد من عدم مشاركة أو كشف ملف <code>.env</code> الخاص بك لأي شخص، حيث أنك تعرض أسرارك للخطر بفعل ذلك. إذا كنت تستخدم نظام التحكم في الإصدارات (version control)، فأضف ملف <code>.env</code> إلى ملف <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. إنشاء ملف `sendTx.js` {#create-sendtx-js}

رائع، الآن بعد أن قمنا بحماية بياناتنا الحساسة في ملف `.env`، لنبدأ في كتابة التعليمات البرمجية. في مثال إرسال المعاملة الخاص بنا، سنقوم بإرسال <span dir="ltr">ETH</span> مرة أخرى إلى صنبور Sepolia.

أنشئ ملف `sendTx.js`، وهو المكان الذي سنقوم فيه بتكوين وإرسال معاملة المثال الخاصة بنا، وأضف إليه أسطر التعليمات البرمجية التالية:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: استبدل هذا العنوان بعنوانك العام

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // يبدأ الرقم الفريد (nonce) العد من 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // عنوان الصنبور لإرجاع eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // حقل بيانات اختياري لإرسال رسالة أو تنفيذ عقد ذكي
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 تجزئة معاملتك هي: ", hash, "\n تحقق من مجمع الذاكرة الخاص بـ Alchemy لعرض حالة معاملتك!");
    } else {
      console.log("❗حدث خطأ ما أثناء إرسال معاملتك:", error)
    }
   });
}

main();
```

تأكد من استبدال العنوان في **السطر 6** بعنوانك العام.

الآن، قبل أن ننتقل إلى تشغيل هذه التعليمات البرمجية، دعنا نتحدث عن بعض المكونات هنا.

- `nonce` : تُستخدم مواصفة الرقم الفريد (nonce) لتتبع عدد المعاملات المرسلة من عنوانك. نحتاج إلى هذا لأغراض أمنية ولمنع [هجمات إعادة الإرسال (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). للحصول على عدد المعاملات المرسلة من عنوانك، نستخدم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: يحتوي كائن المعاملة على بعض الجوانب التي نحتاج إلى تحديدها
  - `to`: هذا هو العنوان الذي نريد إرسال <span dir="ltr">ETH</span> إليه. في هذه الحالة، نرسل <span dir="ltr">ETH</span> مرة أخرى إلى [صنبور Sepolia](https://sepoliafaucet.com/) الذي طلبنا منه في البداية.
  - `value`: هذا هو المبلغ الذي نرغب في إرساله، محددًا بوحدة <span dir="ltr">Wei</span> حيث <span dir="ltr">10^18 Wei = 1 ETH</span>
  - `gas`: هناك العديد من الطرق لتحديد الكمية المناسبة من الغاز لتضمينها مع معاملتك. تمتلك Alchemy حتى [خطاف ويب (webhook) لسعر الغاز](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) لإعلامك عندما ينخفض سعر الغاز ضمن حد معين. بالنسبة لمعاملات الشبكة الرئيسية، من الممارسات الجيدة التحقق من مقدر الغاز مثل [<span dir="ltr">ETH Gas Station</span>](https://ethgasstation.info/) لتحديد الكمية المناسبة من الغاز لتضمينها. <span dir="ltr">21,000</span> هو الحد الأدنى لكمية الغاز التي ستستخدمها أي عملية على إيثيريوم، لذا لضمان تنفيذ معاملتنا نضع <span dir="ltr">30,000</span> هنا.
  - `nonce`: راجع تعريف الرقم الفريد (nonce) أعلاه. يبدأ الرقم الفريد العد من الصفر.
  - [اختياري] البيانات (data): تُستخدم لإرسال معلومات إضافية مع تحويلك، أو استدعاء عقد ذكي، وهي غير مطلوبة لتحويلات الرصيد، تحقق من الملاحظة أدناه.
- `signedTx`: لتوقيع كائن المعاملة الخاص بنا، سنستخدم طريقة `signTransaction` مع `PRIVATE_KEY` الخاص بنا.
- `sendSignedTransaction`: بمجرد أن يكون لدينا معاملة موقعة، يمكننا إرسالها ليتم تضمينها في كتلة لاحقة باستخدام `sendSignedTransaction`.

**ملاحظة حول البيانات (data)**
هناك نوعان رئيسيان من المعاملات التي يمكن إرسالها في إيثيريوم.

- تحويل الرصيد: إرسال <span dir="ltr">ETH</span> من عنوان إلى آخر. لا يلزم وجود حقل بيانات، ومع ذلك، إذا كنت ترغب في إرسال معلومات إضافية إلى جانب معاملتك، فيمكنك تضمين هذه المعلومات بتنسيق <span dir="ltr">HEX</span> في هذا الحقل.
  - على سبيل المثال، لنفترض أننا أردنا كتابة تجزئة مستند <span dir="ltr">IPFS</span> على سلسلة إيثيريوم من أجل إعطائه طابعًا زمنيًا غير قابل للتغيير. يجب أن يبدو حقل البيانات الخاص بنا كالتالي: `web3.utils.toHex(‘IPFS hash‘)`. والآن يمكن لأي شخص الاستعلام عن السلسلة ومعرفة متى تمت إضافة هذا المستند.
- معاملة العقد الذكي: تنفيذ بعض التعليمات البرمجية لعقد ذكي على السلسلة. في هذه الحالة، يجب أن يحتوي حقل البيانات على الدالة الذكية التي ترغب في تنفيذها، إلى جانب أي معلمات (parameters).
  - للحصول على مثال عملي، تحقق من الخطوة 8 في [البرنامج التعليمي Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. تشغيل التعليمات البرمجية باستخدام `node sendTx.js` {#run-the-code-using-node-sendtx-js}

ارجع إلى الطرفية أو سطر الأوامر وقم بتشغيل:

```
node sendTx.js
```

### 9\. رؤية معاملتك في مجمع الذاكرة {#see-your-transaction-in-the-mempool}

افتح [صفحة مجمع الذاكرة](https://dashboard.alchemyapi.io/mempool) في لوحة تحكم Alchemy الخاصة بك وقم بالتصفية حسب التطبيق الذي أنشأته للعثور على معاملتك. هذا هو المكان الذي يمكننا فيه مشاهدة انتقال معاملتنا من حالة معلقة (pending) إلى حالة مُعدّنة (mined) (إذا نجحت) أو حالة مسقطة (dropped) إذا لم تنجح. تأكد من إبقائها على "الكل" (All) حتى تتمكن من التقاط المعاملات "المُعدّنة" و"المعلقة" و"المسقطة". يمكنك أيضًا البحث عن معاملتك من خلال البحث عن المعاملات المرسلة إلى العنوان `0x31b98d14007bdee637298086988a0bbd31184523` .

لعرض تفاصيل معاملتك بمجرد العثور عليها، حدد تجزئة المعاملة (tx hash)، والتي يجب أن تنقلك إلى عرض يبدو كالتالي:

![Mempool watcher screenshot](./mempool.png)

من هناك يمكنك عرض معاملتك على Etherscan بالنقر على الأيقونة المحاطة بدائرة حمراء!

**مرحى! لقد قمت للتو بإرسال أول معاملة إيثيريوم لك باستخدام Alchemy 🎉**

_للملاحظات والاقتراحات حول هذا الدليل، يرجى مراسلة إيلان على [ديسكورد](https://discord.gg/A39JVCM) الخاص بـ Alchemy!_

_نُشر في الأصل على [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_