---
title: "استخدام مقابس الويب"
description: "دليل في استخدام مقابس الويب و الكيمياء لعمل طلبات JSON-RPC و الاشتراك في الأحداث."
author: "إيلان هالبيرن"
lang: ar
tags: [ "alchemy", "مقابس الويب", "استفسار", "جافا سكريبت" ]
skill: beginner
source: "مستندات الكيمياء"
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

This is an entry level guide to using WebSockets and Alchemy to make requests to the Ethereum blockchain.

## WebSockets مقابل HTTP {#websockets-vs-http}

Unlike HTTP, with WebSockets, you don't need to continuously make requests when you want specific information. WebSockets maintain a network connection for you (if done right) and listen for changes.

As with any network connection, you should not assume that a WebSocket will remain open forever without interruption, but correctly handling dropped connections and reconnection by hand can be challenging to get right. Another downside of WebSockets is that you do not get HTTP status codes in the response, but only the error message.

يضيف [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) تلقائيًا معالجة حالات فشل WebSocket وإعادة المحاولة دون الحاجة إلى أي تكوين.

## جربها {#try-it-out}

أسهل طريقة لاختبار WebSockets هي تثبيت أداة سطر أوامر لإنشاء طلبات WebSocket مثل [wscat](https://github.com/websockets/wscat). Using wscat, you can send requests as follows:

_ملاحظة: إذا كان لديك حساب Alchemy، يمكنك استبدال `demo` بمفتاح API الخاص بك. [سجل للحصول على حساب Alchemy مجاني هنا!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## كيفية استخدام WebSockets {#how-to-use-websockets}

To begin, open a WebSocket using the WebSocket URL for your app. يمكنك العثور على عنوان URL لـ WebSocket الخاص بتطبيقك عن طريق فتح صفحة التطبيق في [لوحة التحكم الخاصة بك](https://dashboard.alchemy.com/) والنقر على "عرض المفتاح". Note that your app's URL for WebSockets is different from its URL for HTTP requests, but both can be found by clicking "View Key".

![أين تجد عنوان URL الخاص بـ WebSocket في لوحة التحكم الخاصة بـ Alchemy](./use-websockets.gif)

يمكن استخدام أي من واجهات برمجة التطبيقات المدرجة في [مرجع واجهة برمجة تطبيقات Alchemy](https://www.alchemy.com/docs/reference/api-overview) عبر WebSocket. To do so, use the same payload that would be sent as the body of a HTTP POST request, but instead send that payload through the WebSocket.

## باستخدام Web3 {#with-web3}

Transitioning to WebSockets while using a client library like Web3 is simple. Simply pass the WebSocket URL instead of the HTTP one when instantiating your Web3 client. على سبيل المثال:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## واجهة برمجة تطبيقات الاشتراك {#subscription-api}

عند الاتصال عبر WebSocket، يمكنك استخدام طريقتين إضافيتين: `eth_subscribe` و`eth_unsubscribe`. These methods will allow you to listen for particular events and be notified immediately.

### `eth_subscribe` {#eth-subscribe}

Creates a new subscription for specified events. [تعرف على المزيد حول `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### المعلمات {#parameters}

1. Subscription types
2. Optional params

The first argument specifies the type of event for which to listen. The second argument contains additional options which depend on the first argument. The different description types, their options, and their event payloads are described below.

#### المرجعات {#returns}

معرّف الاشتراك: سيتم إرفاق هذا المعرّف بأي أحداث مستلمة، ويمكن استخدامه أيضًا لإلغاء الاشتراك باستخدام `eth_unsubscribe`.

#### أحداث الاشتراك {#subscription-events}

While the subscription is active, you will receive events which are objects with the following fields:

- `jsonrpc`: "2.0" دائمًا
- `method`: "eth_subscription" دائمًا
- `params`: كائن يحتوي على الحقول التالية:
  - `subscription`: معرّف الاشتراك الذي تم إرجاعه بواسطة استدعاء `eth_subscribe` الذي أنشأ هذا الاشتراك.
  - `result`: كائن يختلف محتواه حسب نوع الاشتراك.

#### أنواع الاشتراكات {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Returns the transaction information for all transactions that are added to the pending state. يشترك هذا النوع من الاشتراك في المعاملات المعلقة، على غرار استدعاء Web3 القياسي `web3.eth.subscribe("pendingTransactions")`، لكنه يختلف في أنه يصدر _معلومات المعاملة الكاملة_ بدلاً من مجرد هاشات المعاملات.

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

Emits an event any time a new header is added to the chain, including during a chain reorganization.

When a chain reorganization occurs, this subscription will emit an event containing all new headers for the new chain. In particular, this means that you may see multiple headers emitted with the same height, and when this happens the later header should be taken as the correct one after a reorganization.

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

Emits logs which are part of newly added blocks that match specified filter criteria.

عند حدوث إعادة تنظيم للسلسلة، سيتم إصدار السجلات التي تعد جزءًا من الكتل على السلسلة القديمة مرة أخرى مع تعيين خاصية `removed` إلى `true`. Further, logs which are part of the blocks on the new chain are emitted, meaning that it is possible to see logs for the same transaction multiple times in the case of a reorganization.

Parameters

1. An object with the following fields:
   - `address` (اختياري): إما سلسلة تمثل عنوانًا أو مصفوفة من هذه السلاسل.
     - Only logs created from one of these addresses will be emitted.
   - `topics`: مصفوفة من محددات الموضوع.
     - كل محدد موضوع هو إما `null`، أو سلسلة تمثل موضوعًا، أو مصفوفة من السلاسل.
     - كل موضع في المصفوفة غير `null` يقيد السجلات الصادرة لتقتصر فقط على تلك التي لديها أحد الموضوعات المحددة في ذلك الموضع.

Some examples of topic specifications:

- `[]`: يُسمح بأي مواضيع.
- `[A]`: A في الموضع الأول (وأي شيء بعده).
- `[null, B]`: أي شيء في الموضع الأول و B في الموضع الثاني (وأي شيء بعده).
- `[A, B]`: A في الموضع الأول و B في الموضع الثاني (وأي شيء بعده).
- `[[A, B], [A, B]]`: (A أو B) في الموضع الأول و(A أو B) في الموضع الثاني (وأي شيء بعده).

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

Cancels an existing subscription so that no further events are sent.

Parameters

1. معرّف الاشتراك، كما تم إرجاعه مسبقًا من استدعاء `eth_subscribe`.

Returns

`true` إذا تم إلغاء الاشتراك بنجاح، أو `false` إذا لم يكن هناك اشتراك بالمعرّف المحدد.

مثال:

**طلب**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**نتيجة**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[سجل في Alchemy](https://auth.alchemy.com) مجانًا، واطلع على [وثائقنا](https://www.alchemy.com/docs/)، وللحصول على آخر الأخبار، تابعنا على [Twitter](https://x.com/AlchemyPlatform).
