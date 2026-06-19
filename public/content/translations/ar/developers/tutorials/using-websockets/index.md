---
title: استخدام ⁦WebSockets⁩
description: دليل لاستخدام ⁦WebSockets⁩ و⁦Alchemy⁩ لإجراء طلبات ⁦JSON-RPC⁩ والاشتراك في الأحداث.
author: "إيلان هالبرن"
lang: ar
tags: ["alchemy", "websockets", "الاستعلام", "javascript"]
skill: beginner
breadcrumb: ⁦WebSockets⁩
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

هذا دليل للمبتدئين حول استخدام <span dir="ltr">WebSockets</span> و<span dir="ltr">Alchemy</span> لإجراء طلبات إلى سلسلة الكتل لإيثيريوم.

## <span dir="ltr">WebSockets</span> مقابل <span dir="ltr">HTTP</span> {#websockets-vs-http}

على عكس <span dir="ltr">HTTP</span>، مع <span dir="ltr">WebSockets</span>، لا تحتاج إلى إجراء طلبات باستمرار عندما تريد معلومات محددة. تحافظ <span dir="ltr">WebSockets</span> على اتصال شبكة لك (إذا تم إجراؤه بشكل صحيح) وتستمع إلى التغييرات.

كما هو الحال مع أي اتصال شبكة، يجب ألا تفترض أن <span dir="ltr">WebSocket</span> سيظل مفتوحًا إلى الأبد دون انقطاع، ولكن التعامل الصحيح مع الاتصالات المقطوعة وإعادة الاتصال يدويًا قد يكون من الصعب إجراؤه بشكل صحيح. جانب سلبي آخر لـ <span dir="ltr">WebSockets</span> هو أنك لا تحصل على رموز حالة <span dir="ltr">HTTP</span> في الاستجابة، بل تحصل فقط على رسالة الخطأ.

يضيف [<span dir="ltr">Alchemy Web3</span>](https://docs.alchemy.com/reference/api-overview) تلقائيًا معالجة لفشل <span dir="ltr">WebSocket</span> وإعادة المحاولة دون الحاجة إلى أي تكوين.

## جربها {#try-it-out}

أسهل طريقة لاختبار <span dir="ltr">WebSockets</span> هي تثبيت أداة سطر أوامر لإجراء طلبات <span dir="ltr">WebSocket</span> مثل [<span dir="ltr">wscat</span>](https://github.com/websockets/wscat). باستخدام <span dir="ltr">wscat</span>، يمكنك إرسال الطلبات على النحو التالي:

_ملاحظة: إذا كان لديك حساب <span dir="ltr">Alchemy</span>، يمكنك استبدال `demo` بمفتاح <span dir="ltr">API</span> الخاص بك. [سجل للحصول على حساب <span dir="ltr">Alchemy</span> مجاني هنا!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## كيفية استخدام <span dir="ltr">WebSockets</span> {#how-to-use-websockets}

للبدء، افتح <span dir="ltr">WebSocket</span> باستخدام عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSocket</span> الخاص بتطبيقك. يمكنك العثور على عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSocket</span> الخاص بتطبيقك عن طريق فتح صفحة التطبيق في [لوحة التحكم الخاصة بك](https://dashboard.alchemy.com/) والنقر على "عرض المفتاح" (<span dir="ltr">View Key</span>). لاحظ أن عنوان <span dir="ltr">URL</span> لتطبيقك لـ <span dir="ltr">WebSockets</span> يختلف عن عنوان <span dir="ltr">URL</span> الخاص به لطلبات <span dir="ltr">HTTP</span>، ولكن يمكن العثور على كليهما بالنقر على "عرض المفتاح".

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

يمكن استخدام أي من واجهات برمجة التطبيقات (<span dir="ltr">APIs</span>) المدرجة في [مرجع <span dir="ltr">API</span> لـ <span dir="ltr">Alchemy</span>](https://www.alchemy.com/docs/reference/api-overview) عبر <span dir="ltr">WebSocket</span>. للقيام بذلك، استخدم نفس الحمولة التي سيتم إرسالها كجسم لطلب <span dir="ltr">HTTP POST</span>، ولكن بدلاً من ذلك أرسل تلك الحمولة من خلال <span dir="ltr">WebSocket</span>.

## مع <span dir="ltr">Web3</span> {#with-web3}

الانتقال إلى <span dir="ltr">WebSockets</span> أثناء استخدام مكتبة عميل مثل <span dir="ltr">Web3</span> أمر بسيط. ما عليك سوى تمرير عنوان <span dir="ltr">URL</span> لـ <span dir="ltr">WebSocket</span> بدلاً من عنوان <span dir="ltr">HTTP</span> عند إنشاء مثيل لعميل <span dir="ltr">Web3</span> الخاص بك. على سبيل المثال:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## <span dir="ltr">API</span> الاشتراك {#subscription-api}

عند الاتصال من خلال <span dir="ltr">WebSocket</span>، يمكنك استخدام طريقتين إضافيتين: `eth_subscribe` و`eth_unsubscribe`. ستسمح لك هذه الطرق بالاستماع إلى أحداث معينة وإعلامك على الفور.

### `eth_subscribe` {#eth-subscribe}

ينشئ اشتراكًا جديدًا لأحداث محددة. [تعرف على المزيد حول `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

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

1. `alchemy_newFullPendingTransactions`

يُرجع معلومات المعاملة لجميع المعاملات التي تمت إضافتها إلى حالة الانتظار. يشترك نوع الاشتراك هذا في المعاملات المعلقة، على غرار استدعاء <span dir="ltr">Web3</span> القياسي `web3.eth.subscribe("pendingTransactions")`، ولكنه يختلف في أنه يصدر _معلومات المعاملة الكاملة_ بدلاً من مجرد تجزئات المعاملة.

مثال:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

يصدر حدثًا في أي وقت تتم فيه إضافة ترويسة جديدة إلى السلسلة، بما في ذلك أثناء إعادة التنظيم للسلسلة.

عند حدوث إعادة التنظيم للسلسلة، سيصدر هذا الاشتراك حدثًا يحتوي على جميع الترويسات الجديدة للسلسلة الجديدة. على وجه الخصوص، هذا يعني أنك قد ترى ترويسات متعددة صادرة بنفس الارتفاع، وعندما يحدث هذا، يجب اعتبار الترويسة اللاحقة هي الترويسة الصحيحة بعد إعادة التنظيم.

مثال:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

يصدر السجلات التي تعد جزءًا من الكتل المضافة حديثًا والتي تتطابق مع معايير التصفية المحددة.

عند حدوث إعادة التنظيم للسلسلة، سيتم إصدار السجلات التي تعد جزءًا من الكتل الموجودة على السلسلة القديمة مرة أخرى مع تعيين الخاصية `removed` إلى `true`. علاوة على ذلك، يتم إصدار السجلات التي تعد جزءًا من الكتل الموجودة على السلسلة الجديدة، مما يعني أنه من الممكن رؤية سجلات لنفس المعاملة عدة مرات في حالة إعادة التنظيم.

المعلمات

1. كائن يحتوي على الحقول التالية:
   - `address` (اختياري): إما سلسلة نصية تمثل عنوانًا أو مصفوفة من هذه السلاسل النصية.
     - سيتم إصدار السجلات التي تم إنشاؤها من أحد هذه العناوين فقط.
   - `topics`: مصفوفة من محددات المواضيع.
     - كل محدد موضوع هو إما `null`، أو سلسلة نصية تمثل موضوعًا، أو مصفوفة من السلاسل النصية.
     - كل موضع في المصفوفة ليس `null` يقيد السجلات الصادرة بتلك التي تحتوي على أحد المواضيع المحددة في ذلك الموضع فقط.

بعض الأمثلة على مواصفات المواضيع:

- `[]`: يُسمح بأي مواضيع.
- `[A]`: <span dir="ltr">A</span> في الموضع الأول (وأي شيء بعده).
- `[null, B]`: أي شيء في الموضع الأول و<span dir="ltr">B</span> في الموضع الثاني (وأي شيء بعده).
- `[A, B]`: <span dir="ltr">A</span> في الموضع الأول و<span dir="ltr">B</span> في الموضع الثاني (وأي شيء بعده).
- `[[A, B], [A, B]]`: (<span dir="ltr">A</span> أو <span dir="ltr">B</span>) في الموضع الأول و(<span dir="ltr">A</span> أو <span dir="ltr">B</span>) في الموضع الثاني (وأي شيء بعده).

مثال:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

يلغي اشتراكًا حاليًا بحيث لا يتم إرسال أي أحداث أخرى.

المعلمات

1. معرف الاشتراك، كما تم إرجاعه مسبقًا من استدعاء `eth_subscribe`.

المخرجات

`true` إذا تم إلغاء الاشتراك بنجاح، أو `false` إذا لم يكن هناك اشتراك بالمعرف المحدد.

مثال:

**الطلب**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**النتيجة**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[سجل مع <span dir="ltr">Alchemy</span>](https://auth.alchemy.com) مجانًا، واطلع على [وثائقنا](https://www.alchemy.com/docs/)، وللحصول على أحدث الأخبار، تابعنا على [تويتر](https://x.com/AlchemyPlatform).