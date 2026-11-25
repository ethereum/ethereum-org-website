---
title: "إرسال المعاملات باستخدام ⁦viem⁩"
description: "هذا دليل صديق للمبتدئين لإرسال معاملات إيثيريوم باستخدام مكتبة ⁦viem⁩. هناك ثلاث خطوات رئيسية من أجل إرسال معاملة إلى سلسلة كتل إيثيريوم: الإنشاء، والتوقيع، والبث. سنمر على الثلاثة."
author: "إيلان هالبرن"
tags: ["المعاملات", "viem", "Alchemy"]
skill: beginner
breadcrumb: "إرسال المعاملات"
lang: ar
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

هذا دليل صديق للمبتدئين لإرسال معاملات إيثيريوم باستخدام مكتبة [viem](https://viem.sh/). هناك ثلاث خطوات رئيسية من أجل إرسال معاملة إلى سلسلة كتل إيثيريوم: الإنشاء، والتوقيع، والبث. سنمر على الثلاثة، ونأمل أن نجيب على أي أسئلة قد تكون لديك! في هذا البرنامج التعليمي، سنستخدم [Alchemy](https://www.alchemy.com/) لإرسال معاملاتنا إلى سلسلة إيثيريوم. يمكنك [إنشاء حساب Alchemy مجاني هنا](https://auth.alchemy.com/signup).

**ملاحظة:** هذا الدليل مخصص لتوقيع معاملاتك في _الواجهة الخلفية_ لتطبيقك. إذا كنت ترغب في دمج توقيع معاملاتك في الواجهة الأمامية، فراجع [واجهة برمجة تطبيقات مزود ميتاماسك](https://docs.metamask.io/wallet/reference/provider-api/).

## الأساسيات {#the-basics}

مثل معظم مطوري سلسلة الكتل عند بدايتهم، ربما تكون قد أجريت بعض الأبحاث حول كيفية إرسال معاملة (وهو أمر يفترض أن يكون بسيطًا جدًا) وواجهت عددًا كبيرًا من الأدلة، كل منها يقول أشياء مختلفة ويتركك مرتبكًا ومشتتًا بعض الشيء. إذا كنت في هذا الموقف، فلا تقلق؛ لقد كنا جميعًا هناك في مرحلة ما! لذا، قبل أن نبدأ، دعونا نوضح بعض الأمور:

### 1\. لا تقوم Alchemy بتخزين مفاتيحك الخاصة {#alchemy-does-not-store-your-private-keys}

- هذا يعني أن Alchemy لا يمكنها توقيع وإرسال المعاملات نيابة عنك. السبب في ذلك هو لأغراض أمنية. لن تطلب منك Alchemy أبدًا مشاركة مفتاحك الخاص، ويجب ألا تشارك مفتاحك الخاص أبدًا مع عقدة مستضافة (أو مع أي شخص آخر في هذا الصدد).
- يمكنك القراءة من سلسلة الكتل باستخدام <span dir="ltr">API</span> الأساسية لـ Alchemy، ولكن للكتابة عليها ستحتاج إلى استخدام شيء آخر لتوقيع معاملاتك قبل إرسالها عبر Alchemy (وهذا ينطبق على أي [خدمة عقدة](/developers/docs/nodes-and-clients/nodes-as-a-service/) أخرى).

### <span dir="ltr">2\.</span> ما هو "المُوقِّع"؟ {#what-is-a-signer}

- سيقوم المُوقِّعون بتوقيع المعاملات نيابة عنك باستخدام مفتاحك الخاص. في هذا البرنامج التعليمي، سنستخدم [viem](https://viem.sh/) لتوقيع معاملتنا، ولكن يمكنك أيضًا استخدام أي مكتبة Web3 أخرى.
- في الواجهة الأمامية، من الأمثلة الجيدة على المُوقِّع [ميتاماسك](https://metamask.io/)، والذي سيقوم بتوقيع وإرسال المعاملات نيابة عنك.

### 3\. لماذا أحتاج إلى توقيع معاملاتي؟ {#why-do-i-need-to-sign-my-transactions}

- يجب على كل مستخدم يرغب في إرسال معاملة على شبكة إيثيريوم توقيع المعاملة (باستخدام مفتاحه الخاص)، من أجل التحقق من أن مصدر المعاملة هو بالفعل الشخص الذي يدعيه.
- من المهم جدًا حماية هذا المفتاح الخاص، حيث أن الوصول إليه يمنح تحكمًا كاملاً في حساب إيثيريوم الخاص بك، مما يسمح لك (أو لأي شخص لديه حق الوصول) بإجراء معاملات نيابة عنك.

### 4\. كيف أحمي مفتاحي الخاص؟ {#how-do-i-protect-my-private-key}

- هناك العديد من الطرق لحماية مفتاحك الخاص واستخدامه لإرسال المعاملات. في هذا البرنامج التعليمي، سنستخدم ملف `.env`. ومع ذلك، يمكنك أيضًا استخدام مزود منفصل يخزن المفاتيح الخاصة، أو استخدام ملف مخزن المفاتيح، أو خيارات أخرى.

### <span dir="ltr">5\.</span> ما الفرق بين `eth_sendTransaction` و `eth_sendRawTransaction`؟ {#difference-between-send-and-send-raw}

`eth_sendTransaction` و `eth_sendRawTransaction` هما دالتان في واجهة برمجة تطبيقات (API) إيثيريوم تقومان ببث معاملة إلى شبكة إيثيريوم بحيث تتم إضافتها إلى كتلة مستقبلية. يختلفان في كيفية تعاملهما مع توقيع المعاملات.

- تُستخدم [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) لإرسال معاملات _غير موقعة_، مما يعني أن العقدة التي ترسل إليها يجب أن تدير مفتاحك الخاص حتى تتمكن من توقيع المعاملة قبل بثها إلى السلسلة. نظرًا لأن Alchemy لا تحتفظ بالمفاتيح الخاصة للمستخدمين، فإنها لا تدعم هذه الطريقة.
- تُستخدم [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) لبث المعاملات التي تم توقيعها بالفعل. هذا يعني أنه يجب عليك أولاً توقيع المعاملة باستخدام مفتاحك الخاص (في viem، باستخدام [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) مع [حساب محلي](https://viem.sh/docs/accounts/local/privateKeyToAccount))، ثم تمرير النتيجة إلى `eth_sendRawTransaction`.

عند استخدام viem، يتم الوصول إلى `eth_sendRawTransaction` عن طريق استدعاء الدالة [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

هذا ما سنستخدمه في هذا البرنامج التعليمي.

### <span dir="ltr">6\.</span> ما هي مكتبة Web3؟ {#what-is-the-web3-library}

- مكتبة Web3 هي غلاف حول [استدعاءات JSON-RPC](/developers/docs/apis/json-rpc/) القياسية والتي يشيع استخدامها في تطوير إيثيريوم.
- هناك العديد من مكتبات Web3 للغات مختلفة. في هذا البرنامج التعليمي، سنستخدم [viem](https://viem.sh/)، المكتوبة بلغة TypeScript وتعمل في أي مشروع JavaScript. يمكنك التحقق من الخيارات الأخرى [هنا](/developers/docs/apis/javascript/) مثل [Ethers.js](https://docs.ethers.org/v6/).

حسنًا، الآن بعد أن أجبنا على بعض هذه الأسئلة، دعنا ننتقل إلى البرنامج التعليمي. لا تتردد في طرح الأسئلة في أي وقت في [ديسكورد](https://discord.gg/gWuC7zB) الخاص بـ Alchemy!

### 7\. كيف ترسل معاملات آمنة، ومُحسَّنة الغاز، وخاصة؟ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [تمتلك Alchemy مجموعة من الموارد الخاصة بالمعاملات](https://www.alchemy.com/docs/sending-transactions). يمكنك استخدامها لإرسال المعاملات، ومحاكاة المعاملات قبل حدوثها، وإرسال معاملات خاصة، وإرسال معاملات مُحسَّنة الغاز.
- يمكنك أيضًا استخدام [خطافات الويب (webhooks) الخاصة بـ Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) لتلقي تنبيهات عندما يتم سحب معاملتك من مجمع الذاكرة وإضافتها إلى السلسلة.

**ملاحظة:** يتطلب هذا الدليل حساب Alchemy، وعنوان إيثيريوم أو محفظة ميتاماسك، وتثبيت <span dir="ltr">Node.js</span> و <span dir="ltr">npm</span>. إذا لم يكن لديك ذلك، فاتبع هذه الخطوات:

1.  [إنشاء حساب Alchemy مجاني](https://auth.alchemy.com/signup)
2.  [إنشاء حساب ميتاماسك](https://metamask.io/) (أو الحصول على عنوان إيثيريوم)
3.  [تثبيت <span dir="ltr">Node.js</span> و <span dir="ltr">npm</span>](https://nodejs.org/en/download/)
## خطوات إرسال معاملتك {#steps-to-sending-your-transaction}

### 1\. إنشاء تطبيق Alchemy على شبكة اختبار Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

انتقل إلى [لوحة تحكم Alchemy](https://dashboard.alchemy.com/) الخاصة بك وأنشئ تطبيقًا جديدًا، مع اختيار Sepolia (أو أي شبكة اختبار أخرى) كشبكتك.

### <span dir="ltr">2\.</span> طلب ETH من صنبور Sepolia {#request-eth-from-sepolia-faucet}

اتبع التعليمات الموجودة على [صنبور Sepolia من Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) لتلقي ETH، أو استخدم أحد [صنابير Sepolia](/developers/docs/networks/#sepolia) الأخرى. توزع الصنابير مبالغ صغيرة (يعطي صنبور Alchemy <span dir="ltr">0.1 ETH</span> يوميًا)، وهو ما يكفي لهذا البرنامج التعليمي. تأكد من تضمين عنوان إيثيريوم الخاص بك على **Sepolia** (من ميتاماسك) وليس شبكة أخرى. بعد اتباع التعليمات، تحقق مرة أخرى من أنك تلقيت ETH في محفظتك.

### 3\. إنشاء دليل مشروع جديد والانتقال إليه باستخدام `cd` {#create-a-new-project-direction}

أنشئ دليل مشروع جديد من سطر الأوامر (الطرفية لأجهزة Mac) وانتقل إليه:

```sh
mkdir sendtx-example
cd sendtx-example
```

### <span dir="ltr">4\.</span> تثبيت viem (أو أي مكتبة Web3) {#install-alchemy-web3}

قم بتشغيل الأمر التالي في دليل مشروعك لتثبيت [viem](https://viem.sh/):

ملاحظة، إذا كنت ترغب في استخدام مكتبة Ethers.js، [فاتبع التعليمات هنا](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. تثبيت dotenv {#install-dotenv}

سنستخدم ملف `.env` لتخزين مفتاح <span dir="ltr">API</span> والمفتاح الخاص بنا بأمان.

```sh
npm install dotenv
```

### <span dir="ltr">6\.</span> إنشاء ملف `.env` {#create-the-dotenv-file}

أنشئ ملف `.env` في دليل مشروعك وأضف ما يلي (مع استبدال "`your-api-url`" و "`your-private-key`")

- للعثور على عنوان URL لواجهة برمجة تطبيقات Alchemy الخاصة بك، انتقل إلى صفحة تفاصيل التطبيق للتطبيق الذي أنشأته للتو في لوحة التحكم الخاصة بك، وانقر على "View Key" في الزاوية العلوية اليمنى، وانسخ عنوان URL لـ HTTP.
- للعثور على مفتاحك الخاص باستخدام ميتاماسك، راجع هذا [الدليل](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). استخدم حسابًا يحتوي فقط على ETH لشبكة اختبار.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
لا تقم بإيداع (commit) ملف <code>.env</code>! يرجى التأكد من عدم مشاركة أو كشف ملف <code>.env</code> الخاص بك لأي شخص، حيث أنك تعرض أسرارك للخطر بفعل ذلك. إذا كنت تستخدم نظام التحكم في الإصدارات، فأضف ملف <code>.env</code> الخاص بك إلى ملف <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### <span dir="ltr">7\.</span> إنشاء ملف `sendTx.js` {#create-sendtx-js}

رائع، الآن بعد أن قمنا بحماية بياناتنا الحساسة في ملف `.env`، دعنا نبدأ في كتابة التعليمات البرمجية. في مثال إرسال المعاملة الخاص بنا، سنرسل <span dir="ltr">0.001 ETH</span> إلى عنوان آخر تتحكم فيه، مثل حساب ثانٍ في ميتاماسك.

أنشئ ملف `sendTx.js`، وهو المكان الذي سنقوم فيه بتكوين وإرسال معاملة المثال الخاصة بنا، وأضف إليه أسطر التعليمات البرمجية التالية:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // يبدأ الرقم الفريد العد من 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: استبدله بالعنوان الذي تريد إرسال ETH إليه
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // حقل بيانات اختياري لإرسال رسالة أو تنفيذ عقد ذكي
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

تأكد من استبدال `0xYourSecondAddress` بالعنوان الذي تريد إرسال ETH إليه. يستخرج البرنامج النصي عنوانك الخاص (المرسل) من `PRIVATE_KEY`، لذلك لا تحتاج إلى إدخاله.

الآن، قبل أن ننتقل إلى تشغيل هذه التعليمات البرمجية، دعنا نتحدث عن بعض المكونات هنا.

- `account`: حساب محلي تم إنشاؤه من مفتاحك الخاص باستخدام [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). يتم التوقيع على جهازك، ولا يتم إرسال المفتاح الخاص أبدًا إلى Alchemy.
- `publicClient` و `walletClient`: عملاء viem الذين يرسلون طلبات JSON-RPC إلى عنوان URL الخاص بـ Alchemy. يقرأ العميل العام من السلسلة، ويقوم عميل المحفظة بإعداد وتوقيع المعاملات لحسابك.
- `nonce`: تُستخدم مواصفات الرقم الفريد لتتبع عدد المعاملات المرسلة من عنوانك. نحتاج إلى هذا لأغراض أمنية ولمنع هجمات إعادة التشغيل. للحصول على عدد المعاملات المرسلة من عنوانك، نستخدم [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). ستقوم viem أيضًا بملء هذا نيابة عنك، لكننا نجلبه صراحةً هنا لإظهار من أين يأتي.
- `transaction`: يحتوي كائن المعاملة على بعض الجوانب التي نحتاج إلى تحديدها. تقوم [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) بملء الباقي لنا، بما في ذلك `chainId` وحقول رسوم [<span dir="ltr">EIP-1559</span>](/developers/docs/gas/) `maxFeePerGas` و `maxPriorityFeePerGas`، بناءً على ظروف الشبكة الحالية
  - `to`: هذا هو العنوان الذي نريد إرسال ETH إليه.
  - `value`: هذا هو المبلغ الذي نرغب في إرساله، محددًا بوحدة Wei حيث <span dir="ltr">10^18 Wei = 1 ETH</span>. تقوم [`parseEther`](https://viem.sh/docs/utilities/parseEther) بتحويل مبلغ ETH إلى Wei نيابة عنا. يحتاج حسابك إلى أكثر من هذا بقليل، لأنه يدفع أيضًا مقابل الغاز
  - `gas`: هناك العديد من الطرق لتحديد الكمية المناسبة من الغاز لتضمينها في معاملتك. تدعم Alchemy [خطافات الويب (webhooks)](https://www.alchemy.com/docs/reference/webhooks-overview) التي يمكنها إعلامك بالنشاط على السلسلة. بالنسبة لمعاملات الشبكة الرئيسية، من الممارسات الجيدة التحقق من ظروف الغاز الحالية لتحديد الكمية المناسبة من الغاز لتضمينها. يستخدم تحويل ETH العادي إلى عنوان عادي دائمًا 21000 غاز بالضبط، وهو الحد الأدنى لأي معاملة، لذلك نضع 21000 هنا. إذا تركت `gas` فارغًا، فستقوم viem بتقديره نيابة عنك.
  - `nonce`: راجع تعريف الرقم الفريد أعلاه. يبدأ الرقم الفريد في العد من الصفر.
  - [اختياري] data: تُستخدم لإرسال معلومات إضافية مع تحويلك، أو استدعاء عقد ذكي، وهي غير مطلوبة لتحويلات الرصيد، راجع الملاحظة أدناه.
- `signedTx`: لتوقيع كائن المعاملة الخاص بنا، سنستخدم طريقة `signTransaction`، والتي تقوم بتوقيعه محليًا باستخدام الحساب الذي تم إنشاؤه من `PRIVATE_KEY` الخاص بنا
- `sendRawTransaction`: بمجرد أن يكون لدينا معاملة موقعة، يمكننا إرسالها ليتم تضمينها في كتلة لاحقة باستخدام `sendRawTransaction`، والتي تستدعي `eth_sendRawTransaction`
- `waitForTransactionReceipt`: تنتظر حتى يتم تضمين المعاملة في كتلة وتعيد إيصالها

**ملاحظة حول البيانات (data)**
هناك نوعان رئيسيان من المعاملات التي يمكن إرسالها في إيثيريوم.

- تحويل الرصيد: إرسال ETH من عنوان إلى آخر. لا يلزم وجود حقل بيانات، ومع ذلك، إذا كنت ترغب في إرسال معلومات إضافية إلى جانب معاملتك، فيمكنك تضمين هذه المعلومات بتنسيق HEX في هذا الحقل.
  - على سبيل المثال، لنفترض أننا أردنا كتابة تجزئة مستند IPFS إلى سلسلة إيثيريوم من أجل إعطائه طابعًا زمنيًا غير قابل للتغيير. يجب أن يبدو حقل البيانات الخاص بنا حينئذٍ مثل `data: toHex("IPFS hash")`، باستخدام [`toHex`](https://viem.sh/docs/utilities/toHex) الخاصة بـ viem. والآن يمكن لأي شخص الاستعلام عن السلسلة ومعرفة متى تمت إضافة هذا المستند.
- معاملة العقد الذكي: تنفيذ بعض التعليمات البرمجية للعقد الذكي على السلسلة. في هذه الحالة، يجب أن يحتوي حقل البيانات على الدالة الذكية التي ترغب في تنفيذها، إلى جانب أي معلمات.
  - للحصول على مثال عملي، راجع [البرنامج التعليمي للعقد الذكي Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. تشغيل التعليمات البرمجية باستخدام `node sendTx.js` {#run-the-code-using-node-sendtx-js}

ارجع إلى الطرفية أو سطر الأوامر وقم بتشغيل:

```sh
node sendTx.js
```

### <span dir="ltr">9\.</span> رؤية معاملتك على مستكشف الكتل {#see-your-transaction-in-the-mempool}

يطبع البرنامج النصي تجزئة المعاملة بمجرد أن تقبل العقدة المعاملة، ثم ينتظر حتى يتم تضمينها في كتلة (عادةً في غضون ثوانٍ قليلة) ويطبع النتيجة. لرؤية التفاصيل، الصق التجزئة في مستكشف كتل Sepolia مثل [Sepolia Etherscan](https://sepolia.etherscan.io/) أو [Blockscout](https://eth-sepolia.blockscout.com/). هناك يمكنك مشاهدة المعاملة تنتقل من معلقة إلى مضمنة، ورؤية المبلغ والرسوم والكتلة التي هبطت فيها.

إذا رأيت خطأ `insufficient funds` بدلاً من ذلك، فهذا يعني أن حسابك لا يحتوي على ما يكفي من Sepolia ETH لتغطية القيمة بالإضافة إلى الغاز. ارجع إلى الخطوة 2 واطلب المزيد من صنبور.

**مرحى! لقد أرسلت للتو أول معاملة إيثيريوم لك باستخدام Alchemy 🎉**

_للحصول على ملاحظات واقتراحات حول هذا الدليل، يرجى مراسلة Elan على [ديسكورد](https://discord.gg/gWuC7zB) الخاص بـ Alchemy!_

_نُشر في الأصل بواسطة Alchemy._
