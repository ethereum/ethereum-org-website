---
title: "استخدام ⁦WebSockets⁩"
description: "دليل لاستخدام ⁦WebSockets⁩ لإجراء طلبات ⁦JSON-RPC⁩ والاشتراك في الأحداث، مع أي مزود عقدة إيثيريوم."
author: "إيلان هالبرن"
lang: ar
tags: ["Alchemy", "websockets", "الاستعلام", "JavaScript"]
skill: beginner
breadcrumb: "⁦WebSockets⁩"
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

هذا دليل تمهيدي لاستخدام <span dir="ltr">WebSockets</span> لإجراء طلبات إلى سلسلة كتل إيثيريوم. تستخدم الأمثلة طرق <span dir="ltr">JSON-RPC</span> القياسية، لذا فهي تعمل مع أي عقدة أو مزود عقدة يوفر نقطة نهاية <span dir="ltr">WebSocket</span>، بما في ذلك Alchemy.

## <span dir="ltr">WebSockets</span> مقابل <span dir="ltr">HTTP</span> {#websockets-vs-http}

على عكس <span dir="ltr">HTTP</span>، مع <span dir="ltr">WebSockets</span>، لا تحتاج إلى إجراء طلبات باستمرار عندما تريد معلومات محددة. تحافظ <span dir="ltr">WebSockets</span> على اتصال شبكة لك (إذا تم إجراؤه بشكل صحيح) وتستمع إلى التغييرات.

كما هو الحال مع أي اتصال شبكة، يجب ألا تفترض أن <span dir="ltr">WebSocket</span> سيظل مفتوحًا إلى الأبد دون انقطاع، ولكن التعامل الصحيح مع الاتصالات المقطوعة وإعادة الاتصال يدويًا قد يكون من الصعب إجراؤه بشكل صحيح. الجانب السلبي الآخر لـ <span dir="ltr">WebSockets</span> هو أنك لا تحصل على رموز حالة <span dir="ltr">HTTP</span> في الاستجابة، بل تحصل فقط على رسالة الخطأ.

يمكن لمكتبات العميل التعامل مع هذا نيابة عنك. على سبيل المثال، يقوم [نقل <span dir="ltr">WebSocket</span> الخاص بـ Viem](https://viem.sh/docs/clients/transports/websocket) بإعادة الاتصال عند فشل المقبس ويرسل إشارات البقاء على قيد الحياة افتراضيًا.

## جربها {#try-it-out}

تحتاج إلى عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSocket</span> لعقدة إيثيريوم. يمنحك مزودو العقدة واحدًا عند إنشاء مفتاح واجهة برمجة التطبيقات (API)، عادةً في شكل `wss://<provider-host>/<your-api-key>`. على سبيل المثال، يبدو عنوان <span dir="ltr">URL</span> لشبكة إيثيريوم الرئيسية من Alchemy مثل `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([قم بالتسجيل للحصول على حساب Alchemy مجاني](https://auth.alchemy.com/signup)). راجع [العقد كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service/) لمزودين آخرين، أو استخدم نقطة نهاية <span dir="ltr">WebSocket</span> الخاصة بـ [عقدتك الخاصة](/developers/docs/nodes-and-clients/run-a-node/). تعمل نقاط النهاية العامة مثل `wss://ethereum-rpc.publicnode.com` أيضًا للتجارب السريعة، ولكنها محدودة المعدل وقد لا تدعم كل نوع اشتراك.

أسهل طريقة لاختبار <span dir="ltr">WebSockets</span> هي تثبيت أداة سطر أوامر لإجراء طلبات <span dir="ltr">WebSocket</span> مثل [wscat](https://github.com/websockets/wscat). باستخدام wscat، يمكنك إرسال الطلبات على النحو التالي:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

الأسطر التي تبدأ بـ `>` هي ما تكتبه، والأسطر التي تبدأ بـ `<` هي ما ترسله العقدة مرة أخرى.

## كيفية استخدام <span dir="ltr">WebSockets</span> {#how-to-use-websockets}

للبدء، افتح <span dir="ltr">WebSocket</span> باستخدام عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSocket</span> الخاص بمزودك. مع Alchemy، يمكنك العثور عليه عن طريق فتح تطبيقك في [لوحة المعلومات](https://dashboard.alchemy.com/) وعرض مفتاح واجهة برمجة التطبيقات (API) الخاص به. لاحظ أن عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSockets</span> (`wss://`) يختلف عن عنوان <span dir="ltr">URL</span> لطلبات <span dir="ltr">HTTP</span> (`https://`)، على الرغم من أن معظم المزودين يستخدمون نفس مفتاح واجهة برمجة التطبيقات (API) لكليهما.

![أين تجد عنوان URL لـ WebSocket في لوحة معلومات Alchemy الخاصة بك](./use-websockets.mp4#602x280)

يمكن استخدام أي من [طرق <span dir="ltr">JSON-RPC</span>](/developers/docs/apis/json-rpc/) التي يدعمها مزودك عبر <span dir="ltr">WebSocket</span>. للقيام بذلك، استخدم نفس الحمولة التي سيتم إرسالها كجسم لطلب <span dir="ltr">HTTP POST</span>، ولكن بدلاً من ذلك أرسل تلك الحمولة من خلال <span dir="ltr">WebSocket</span>.

## مع Web3 {#with-web3}

الانتقال إلى <span dir="ltr">WebSockets</span> أثناء استخدام مكتبة عميل مثل [Viem](https://viem.sh/) أمر بسيط. استخدم نقل `webSocket` مع عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSocket</span> الخاص بك بدلاً من نقل `http`. على سبيل المثال، بعد `npm install viem`، احفظ هذا كـ `index.mjs` وقم بتشغيل `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// الاشتراك في كتل جديدة عبر نفس WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## <span dir="ltr">API</span> الاشتراك {#subscription-api}

عند الاتصال من خلال <span dir="ltr">WebSocket</span>، يمكنك استخدام طريقتين إضافيتين: `eth_subscribe` و`eth_unsubscribe`. ستسمح لك هذه الطرق بالاستماع إلى أحداث معينة وإعلامك على الفور.

### `eth_subscribe` {#eth-subscribe}

ينشئ اشتراكًا جديدًا لأحداث محددة. [تعرف على المزيد حول `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### المعلمات {#parameters}

1. أنواع الاشتراك
2. معلمات اختيارية

تحدد الوسيطة الأولى نوع الحدث الذي يجب الاستماع إليه. تحتوي الوسيطة الثانية على خيارات إضافية تعتمد على الوسيطة الأولى. يتم وصف أنواع الوصف المختلفة وخياراتها وحمولات أحداثها أدناه.

#### المخرجات {#returns}

معرف الاشتراك: سيتم إرفاق هذا المعرف بأي أحداث مستلمة، ويمكن استخدامه أيضًا لإلغاء الاشتراك باستخدام `eth_unsubscribe`.

#### أحداث الاشتراك {#subscription-events}

أثناء تنشيط الاشتراك، ستتلقى أحداثًا عبارة عن كائنات تحتوي على الحقول التالية:

- `jsonrpc`: دائمًا <span dir="ltr">"2.0"</span>
- `method`: دائمًا <span dir="ltr">"eth_subscription"</span>
- `params`: كائن يحتوي على الحقول التالية:
  - `subscription`: معرف الاشتراك الذي تم إرجاعه بواسطة استدعاء `eth_subscribe` الذي أنشأ هذا الاشتراك.
  - `result`: كائن تختلف محتوياته بناءً على نوع الاشتراك.

#### أنواع الاشتراك {#subscription-types}

1. `newHeads`

يصدر حدثًا في أي وقت تتم فيه إضافة ترويسة جديدة إلى السلسلة، بما في ذلك أثناء إعادة تنظيم السلسلة.

عند حدوث إعادة تنظيم للسلسلة، سيصدر هذا الاشتراك حدثًا يحتوي على جميع الترويسات الجديدة للسلسلة الجديدة. على وجه الخصوص، هذا يعني أنك قد ترى ترويسات متعددة صادرة بنفس الارتفاع، وعندما يحدث هذا، يجب اعتبار الترويسة اللاحقة هي الترويسة الصحيحة بعد إعادة التنظيم.

مثال:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

يصدر السجلات التي تعد جزءًا من الكتل المضافة حديثًا والتي تتطابق مع معايير التصفية المحددة.

عند حدوث إعادة تنظيم للسلسلة، سيتم إصدار السجلات التي تعد جزءًا من الكتل الموجودة على السلسلة القديمة مرة أخرى مع تعيين الخاصية `removed` إلى `true`. علاوة على ذلك، يتم إصدار السجلات التي تعد جزءًا من الكتل الموجودة على السلسلة الجديدة، مما يعني أنه من الممكن رؤية سجلات لنفس المعاملة عدة مرات في حالة إعادة التنظيم.

المعلمات

1. كائن يحتوي على الحقول التالية:
   - `address` (اختياري): إما سلسلة نصية تمثل عنوانًا أو مصفوفة من هذه السلاسل النصية.
     - سيتم إصدار السجلات التي تم إنشاؤها من أحد هذه العناوين فقط.
   - `topics`: مصفوفة من محددات المواضيع.
     - كل محدد موضوع هو إما `null`، أو سلسلة نصية تمثل موضوعًا، أو مصفوفة من السلاسل النصية.
     - كل موضع في المصفوفة ليس `null` يقيد السجلات الصادرة بتلك التي تحتوي على أحد المواضيع المحددة في ذلك الموضع فقط.

بعض الأمثلة على مواصفات المواضيع:

- `[]`: يُسمح بأي مواضيع.
- `[A]`: A في الموضع الأول (وأي شيء بعده).
- `[null, B]`: أي شيء في الموضع الأول و B في الموضع الثاني (وأي شيء بعده).
- `[A, B]`: A في الموضع الأول و B في الموضع الثاني (وأي شيء بعده).
- `[[A, B], [A, B]]`: (A أو B) في الموضع الأول و (A أو B) في الموضع الثاني (وأي شيء بعده).

مثال:

يستمع هذا المثال إلى أحداث `Deposit` من [عقد إيثر مغلف (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) على شبكة إيثيريوم الرئيسية:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

يصدر تجزئة كل معاملة تتم إضافتها إلى الحالة المعلقة للعقدة (مجمع الذاكرة الخاص بها).

مثال:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

يقدم بعض المزودين أيضًا أنواع اشتراك خاصة بهم. على سبيل المثال، يصدر [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) الخاص بـ Alchemy _كائنات معاملة كاملة_ بدلاً من مجرد تجزئات، ويقبل عوامل تصفية `fromAddress` و`toAddress` و`hashesOnly` الاختيارية. هذه ليست جزءًا من واجهة برمجة التطبيقات (API) القياسية لـ <span dir="ltr">JSON-RPC</span>، لذا فهي تعمل فقط مع ذلك المزود.

### `eth_unsubscribe` {#eth-unsubscribe}

يلغي اشتراكًا حاليًا بحيث لا يتم إرسال أي أحداث أخرى.

المعلمات

1. معرف الاشتراك، كما تم إرجاعه مسبقًا من استدعاء `eth_subscribe`.

المخرجات

`true` إذا تم إلغاء الاشتراك بنجاح، أو `false` إذا لم يكن هناك اشتراك بالمعرف المحدد.

يوجد الاشتراك فقط على اتصال <span dir="ltr">WebSocket</span> الذي أنشأه، لذا يجب إرسال `eth_unsubscribe` عبر نفس الاتصال. لا يمكن إرساله كطلب <span dir="ltr">HTTP</span> منفصل. يؤدي إغلاق الاتصال أيضًا إلى إلغاء جميع اشتراكاته.

مثال:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[سجل مع Alchemy](https://auth.alchemy.com) مجانًا، وتحقق من [وثائق Alchemy](https://www.alchemy.com/docs/)، وللحصول على أحدث الأخبار، تابع Alchemy على [تويتر](https://x.com/Alchemy).
