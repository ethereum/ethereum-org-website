---
title: "⁦Using WebSockets⁩"
description: "⁦WebSockets⁩ اور ⁦Alchemy⁩ کا استعمال کرتے ہوئے ⁦JSON-RPC⁩ درخواستیں کرنے اور ایونٹس کو سبسکرائب کرنے کے لیے گائیڈ۔"
author: ایلان ہیلپرن
lang: ur
tags: ["alchemy", "websockets", "کوئری کرنا", "javascript"]
skill: beginner
breadcrumb: "⁦WebSockets⁩"
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

یہ <span dir="ltr">WebSockets</span> اور <span dir="ltr">Alchemy</span> کا استعمال کرتے ہوئے ایتھیریم بلاک چین پر درخواستیں بھیجنے کے لیے ایک ابتدائی سطح کی گائیڈ ہے۔

## <span dir="ltr">WebSockets</span> بمقابلہ <span dir="ltr">HTTP</span> {#websockets-vs-http}

<span dir="ltr">HTTP</span> کے برعکس، <span dir="ltr">WebSockets</span> کے ساتھ، جب آپ کو مخصوص معلومات درکار ہوں تو آپ کو مسلسل درخواستیں کرنے کی ضرورت نہیں ہوتی۔ <span dir="ltr">WebSockets</span> آپ کے لیے ایک نیٹ ورک کنکشن برقرار رکھتے ہیں (اگر صحیح طریقے سے کیا جائے) اور تبدیلیوں کو سنتے ہیں۔

کسی بھی نیٹ ورک کنکشن کی طرح، آپ کو یہ فرض نہیں کرنا چاہیے کہ ایک <span dir="ltr">WebSocket</span> بغیر کسی رکاوٹ کے ہمیشہ کھلا رہے گا، لیکن منقطع ہونے والے کنکشنز اور دوبارہ کنکشن کو دستی طور پر درست طریقے سے سنبھالنا مشکل ہو سکتا ہے۔ <span dir="ltr">WebSockets</span> کا ایک اور نقصان یہ ہے کہ آپ کو جواب میں <span dir="ltr">HTTP</span> اسٹیٹس کوڈز نہیں ملتے، بلکہ صرف ایرر کا پیغام ملتا ہے۔

​[<span dir="ltr">Alchemy Web3</span>](https://docs.alchemy.com/reference/api-overview) خود بخود <span dir="ltr">WebSocket</span> کی ناکامیوں اور دوبارہ کوششوں کو سنبھالنے کی صلاحیت شامل کرتا ہے جس کے لیے کسی کنفیگریشن کی ضرورت نہیں ہوتی۔

## اسے آزما کر دیکھیں {#try-it-out}

<span dir="ltr">WebSockets</span> کو ٹیسٹ کرنے کا سب سے آسان طریقہ یہ ہے کہ <span dir="ltr">WebSocket</span> درخواستیں کرنے کے لیے ایک کمانڈ لائن ٹول انسٹال کریں جیسے کہ [<span dir="ltr">wscat</span>](https://github.com/websockets/wscat)۔ <span dir="ltr">wscat</span> کا استعمال کرتے ہوئے، آپ درج ذیل طریقے سے درخواستیں بھیج سکتے ہیں:

_نوٹ: اگر آپ کے پاس <span dir="ltr">Alchemy</span> اکاؤنٹ ہے تو آپ `demo` کو اپنی <span dir="ltr">API</span> کلید سے بدل سکتے ہیں۔ [یہاں مفت <span dir="ltr">Alchemy</span> اکاؤنٹ کے لیے سائن اپ کریں!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## <span dir="ltr">WebSockets</span> کا استعمال کیسے کریں {#how-to-use-websockets}

شروع کرنے کے لیے، اپنی ایپ کے <span dir="ltr">WebSocket URL</span> کا استعمال کرتے ہوئے ایک <span dir="ltr">WebSocket</span> کھولیں۔ آپ [اپنے ڈیش بورڈ](https://dashboard.alchemy.com/) میں ایپ کا صفحہ کھول کر اور <span dir="ltr">"View Key"</span> پر کلک کر کے اپنی ایپ کا <span dir="ltr">WebSocket URL</span> تلاش کر سکتے ہیں۔ نوٹ کریں کہ <span dir="ltr">WebSockets</span> کے لیے آپ کی ایپ کا <span dir="ltr">URL</span> <span dir="ltr">HTTP</span> درخواستوں کے <span dir="ltr">URL</span> سے مختلف ہے، لیکن دونوں <span dir="ltr">"View Key"</span> پر کلک کر کے تلاش کیے جا سکتے ہیں۔

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

[<span dir="ltr">Alchemy API Reference</span>](https://www.alchemy.com/docs/reference/api-overview) میں درج کسی بھی <span dir="ltr">API</span> کو <span dir="ltr">WebSocket</span> کے ذریعے استعمال کیا جا سکتا ہے۔ ایسا کرنے کے لیے، وہی پے لوڈ استعمال کریں جو <span dir="ltr">HTTP POST</span> درخواست کی باڈی کے طور پر بھیجا جائے گا، لیکن اس کے بجائے اس پے لوڈ کو <span dir="ltr">WebSocket</span> کے ذریعے بھیجیں۔

## <span dir="ltr">Web3</span> کے ساتھ {#with-web3}

<span dir="ltr">Web3</span> جیسی کلائنٹ لائبریری کا استعمال کرتے ہوئے <span dir="ltr">WebSockets</span> پر منتقل ہونا آسان ہے۔ اپنے <span dir="ltr">Web3</span> کلائنٹ کو شروع کرتے وقت <span dir="ltr">HTTP</span> کے بجائے صرف <span dir="ltr">WebSocket URL</span> پاس کریں۔ مثال کے طور پر:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## سبسکرپشن <span dir="ltr">API</span> {#subscription-api}

جب <span dir="ltr">WebSocket</span> کے ذریعے منسلک ہوں، تو آپ دو اضافی طریقے استعمال کر سکتے ہیں: `eth_subscribe` اور `eth_unsubscribe`۔ یہ طریقے آپ کو مخصوص ایونٹس کو سننے اور فوری طور پر مطلع ہونے کی اجازت دیں گے۔

### `eth_subscribe` {#eth-subscribe}

مخصوص ایونٹس کے لیے ایک نئی سبسکرپشن بناتا ہے۔ [`eth_subscribe` کے بارے میں مزید جانیں](https://docs.alchemy.com/reference/eth-subscribe)۔

#### پیرامیٹرز {#parameters}

1. سبسکرپشن کی اقسام
2. اختیاری پیرامیٹرز

پہلا آرگومنٹ اس ایونٹ کی قسم کی وضاحت کرتا ہے جسے سننا ہے۔ دوسرے آرگومنٹ میں اضافی آپشنز ہوتے ہیں جو پہلے آرگومنٹ پر منحصر ہوتے ہیں۔ مختلف تفصیل کی اقسام، ان کے آپشنز، اور ان کے ایونٹ پے لوڈز ذیل میں بیان کیے گئے ہیں۔

#### ریٹرنز {#returns}

سبسکرپشن <span dir="ltr">ID</span>: یہ <span dir="ltr">ID</span> کسی بھی موصول ہونے والے ایونٹس کے ساتھ منسلک ہو گی، اور اسے `eth_unsubscribe` کا استعمال کرتے ہوئے سبسکرپشن منسوخ کرنے کے لیے بھی استعمال کیا جا سکتا ہے۔

#### سبسکرپشن ایونٹس {#subscription-events}

جب تک سبسکرپشن فعال ہے، آپ کو ایونٹس موصول ہوں گے جو درج ذیل فیلڈز کے ساتھ آبجیکٹس ہیں:

- `jsonrpc`: ہمیشہ <span dir="ltr">"2.0"</span>
- `method`: ہمیشہ <span dir="ltr">"eth_subscription"</span>
- `params`: درج ذیل فیلڈز کے ساتھ ایک آبجیکٹ:
  - `subscription`: `eth_subscribe` کال کے ذریعے واپس کی گئی سبسکرپشن <span dir="ltr">ID</span> جس نے یہ سبسکرپشن بنائی تھی۔
  - `result`: ایک آبجیکٹ جس کا مواد سبسکرپشن کی قسم کے لحاظ سے مختلف ہوتا ہے۔

#### سبسکرپشن کی اقسام {#subscription-types}

1. `alchemy_newFullPendingTransactions`

ان تمام ٹرانزیکشنز کے لیے ٹرانزیکشن کی معلومات واپس کرتا ہے جو زیر التواء حالت میں شامل کی جاتی ہیں۔ یہ سبسکرپشن کی قسم زیر التواء ٹرانزیکشنز کو سبسکرائب کرتی ہے، جو معیاری <span dir="ltr">Web3</span> کال `web3.eth.subscribe("pendingTransactions")` کی طرح ہے، لیکن اس میں مختلف ہے کہ یہ صرف ٹرانزیکشن ہیشز کے بجائے _مکمل ٹرانزیکشن کی معلومات_ خارج کرتی ہے۔

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

جب بھی چین میں نیا ہیڈر شامل کیا جاتا ہے تو ایک ایونٹ خارج کرتا ہے، بشمول چین کی تنظیمِ نو کے دوران۔

جب چین کی تنظیمِ نو ہوتی ہے، تو یہ سبسکرپشن ایک ایونٹ خارج کرے گی جس میں نئی چین کے تمام نئے ہیڈرز شامل ہوں گے۔ خاص طور پر، اس کا مطلب یہ ہے کہ آپ ایک ہی اونچائی کے ساتھ متعدد ہیڈرز کو خارج ہوتے دیکھ سکتے ہیں، اور جب ایسا ہوتا ہے تو بعد والے ہیڈر کو تنظیمِ نو کے بعد درست سمجھا جانا چاہیے۔

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

ایسے لاگز خارج کرتا ہے جو نئے شامل کیے گئے بلاکس کا حصہ ہیں جو مخصوص فلٹر کے معیار سے مماثل ہیں۔

جب چین کی تنظیمِ نو ہوتی ہے، تو پرانی چین پر بلاکس کا حصہ بننے والے لاگز کو دوبارہ خارج کیا جائے گا جس میں پراپرٹی `removed` کو `true` پر سیٹ کیا جائے گا۔ مزید برآں، نئی چین پر بلاکس کا حصہ بننے والے لاگز خارج کیے جاتے ہیں، جس کا مطلب ہے کہ تنظیمِ نو کی صورت میں ایک ہی ٹرانزیکشن کے لیے متعدد بار لاگز دیکھنا ممکن ہے۔

پیرامیٹرز

1. درج ذیل فیلڈز کے ساتھ ایک آبجیکٹ:
   - `address` (اختیاری): یا تو ایک پتہ کی نمائندگی کرنے والی سٹرنگ یا ایسی سٹرنگز کی ایک ارے (array)۔
     - صرف ان پتوں میں سے کسی ایک سے بنائے گئے لاگز خارج کیے جائیں گے۔
   - `topics`: ٹاپک کی وضاحت کرنے والوں کی ایک ارے۔
     - ہر ٹاپک کی وضاحت کرنے والا یا تو `null` ہے، ایک ٹاپک کی نمائندگی کرنے والی سٹرنگ ہے، یا سٹرنگز کی ایک ارے ہے۔
     - ارے میں ہر وہ پوزیشن جو `null` نہیں ہے، خارج ہونے والے لاگز کو صرف ان تک محدود کرتی ہے جن کے پاس اس پوزیشن میں دیے گئے ٹاپکس میں سے کوئی ایک ہو۔

ٹاپک کی وضاحتوں کی کچھ مثالیں:

- `[]`: کسی بھی ٹاپک کی اجازت ہے۔
- `[A]`: پہلی پوزیشن میں <span dir="ltr">A</span> (اور اس کے بعد کچھ بھی)۔
- `[null, B]`: پہلی پوزیشن میں کچھ بھی اور دوسری پوزیشن میں <span dir="ltr">B</span> (اور اس کے بعد کچھ بھی)۔
- `[A, B]`: پہلی پوزیشن میں <span dir="ltr">A</span> اور دوسری پوزیشن میں <span dir="ltr">B</span> (اور اس کے بعد کچھ بھی)۔
- `[[A, B], [A, B]]`: پہلی پوزیشن میں (<span dir="ltr">A</span> یا <span dir="ltr">B</span>) اور دوسری پوزیشن میں (<span dir="ltr">A</span> یا <span dir="ltr">B</span>) (اور اس کے بعد کچھ بھی)۔

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

موجودہ سبسکرپشن کو منسوخ کرتا ہے تاکہ مزید کوئی ایونٹس نہ بھیجے جائیں۔

پیرامیٹرز

1. سبسکرپشن <span dir="ltr">ID</span>، جیسا کہ پہلے `eth_subscribe` کال سے واپس کی گئی تھی۔

ریٹرنز

اگر سبسکرپشن کامیابی سے منسوخ ہو گئی تو `true`، یا اگر دی گئی <span dir="ltr">ID</span> کے ساتھ کوئی سبسکرپشن موجود نہیں تھی تو `false`۔

مثال:

**درخواست**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**نتیجہ**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

مفت میں [<span dir="ltr">Alchemy</span> کے ساتھ سائن اپ کریں](https://auth.alchemy.com)، [ہماری دستاویزات](https://www.alchemy.com/docs/) دیکھیں، اور تازہ ترین خبروں کے لیے، ہمیں [ٹوئٹر](https://x.com/AlchemyPlatform) پر فالو کریں۔