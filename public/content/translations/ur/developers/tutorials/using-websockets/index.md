---
title: "⁦WebSockets⁩ کا استعمال"
description: "کسی بھی ایتھیریم نوڈ پرووائیڈر کے ساتھ جے سن آر پی سی درخواستیں کرنے اور ایونٹس کو سبسکرائب کرنے کے لیے ⁦WebSockets⁩ استعمال کرنے کی گائیڈ۔"
author: "ایلان ہالپرن"
lang: ur
tags: ["Alchemy", "websockets", "کیوری کرنا", "JavaScript"]
skill: beginner
breadcrumb: "⁦WebSockets⁩"
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

یہ ایتھیریم بلاک چین پر درخواستیں بھیجنے کے لیے <span dir="ltr">WebSockets</span> کے استعمال کی ایک ابتدائی گائیڈ ہے۔ مثالوں میں معیاری جے سن آر پی سی طریقے استعمال کیے گئے ہیں، لہذا یہ کسی بھی ایسے نوڈ یا نوڈ پرووائیڈر کے ساتھ کام کرتے ہیں جو <span dir="ltr">WebSocket</span> اینڈ پوائنٹ پیش کرتا ہے، بشمول Alchemy۔

## <span dir="ltr">WebSockets</span> بمقابلہ <span dir="ltr">HTTP</span> {#websockets-vs-http}

<span dir="ltr">HTTP</span> کے برعکس، <span dir="ltr">WebSockets</span> کے ساتھ، جب آپ کو مخصوص معلومات درکار ہوں تو آپ کو مسلسل درخواستیں کرنے کی ضرورت نہیں ہوتی۔ <span dir="ltr">WebSockets</span> آپ کے لیے ایک نیٹ ورک کنکشن برقرار رکھتے ہیں (اگر صحیح طریقے سے کیا جائے) اور تبدیلیوں کو سنتے ہیں۔

کسی بھی نیٹ ورک کنکشن کی طرح، آپ کو یہ فرض نہیں کرنا چاہیے کہ ایک <span dir="ltr">WebSocket</span> بغیر کسی رکاوٹ کے ہمیشہ کھلا رہے گا، لیکن منقطع ہونے والے کنکشنز اور دوبارہ کنکشن کو دستی طور پر درست طریقے سے سنبھالنا مشکل ہو سکتا ہے۔ <span dir="ltr">WebSockets</span> کا ایک اور نقصان یہ ہے کہ آپ کو جواب میں <span dir="ltr">HTTP</span> اسٹیٹس کوڈز نہیں ملتے، بلکہ صرف ایرر کا پیغام ملتا ہے۔

کلائنٹ لائبریریاں آپ کے لیے اسے سنبھال سکتی ہیں۔ مثال کے طور پر، [Viem کا <span dir="ltr">WebSocket</span> ٹرانسپورٹ](https://viem.sh/docs/clients/transports/websocket) ساکٹ فیل ہونے پر دوبارہ کنیکٹ ہو جاتا ہے اور بائی ڈیفالٹ کیپ-الائیو (keep-alive) پنگز بھیجتا ہے۔

## اسے آزما کر دیکھیں {#try-it-out}

آپ کو ایک ایتھیریم نوڈ کے لیے <span dir="ltr">WebSocket URL</span> کی ضرورت ہے۔ جب آپ ایک ایپلیکیشن پروگرامنگ انٹرفیس (API) کلید بناتے ہیں تو نوڈ پرووائیڈرز آپ کو ایک فراہم کرتے ہیں، جو عام طور پر `wss://<provider-host>/<your-api-key>` کی شکل میں ہوتا ہے۔ مثال کے طور پر، ایک Alchemy ایتھیریم مین نیٹ <span dir="ltr">URL</span> کچھ اس طرح لگتا ہے `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([مفت Alchemy اکاؤنٹ کے لیے سائن اپ کریں](https://auth.alchemy.com/signup))۔ دیگر پرووائیڈرز کے لیے [بطور سروس نوڈز](/developers/docs/nodes-and-clients/nodes-as-a-service/) دیکھیں، یا [اپنے نوڈ](/developers/docs/nodes-and-clients/run-a-node/) کا <span dir="ltr">WebSocket</span> اینڈ پوائنٹ استعمال کریں۔ عوامی اینڈ پوائنٹس جیسے `wss://ethereum-rpc.publicnode.com` بھی فوری تجربات کے لیے کام کرتے ہیں، لیکن وہ ریٹ-لمیٹڈ (rate-limited) ہوتے ہیں اور ہو سکتا ہے کہ ہر سبسکرپشن کی قسم کو سپورٹ نہ کریں۔

<span dir="ltr">WebSockets</span> کو ٹیسٹ کرنے کا سب سے آسان طریقہ یہ ہے کہ <span dir="ltr">WebSocket</span> درخواستیں کرنے کے لیے ایک کمانڈ لائن ٹول انسٹال کریں جیسے کہ [<span dir="ltr">wscat</span>](https://github.com/websockets/wscat)۔ <span dir="ltr">wscat</span> کا استعمال کرتے ہوئے، آپ درج ذیل طریقے سے درخواستیں بھیج سکتے ہیں:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>` سے شروع ہونے والی لائنیں وہ ہیں جو آپ ٹائپ کرتے ہیں، اور `<` سے شروع ہونے والی لائنیں وہ ہیں جو نوڈ واپس بھیجتا ہے۔

## <span dir="ltr">WebSockets</span> کا استعمال کیسے کریں {#how-to-use-websockets}

شروع کرنے کے لیے، اپنے پرووائیڈر کا <span dir="ltr">WebSocket URL</span> استعمال کرتے ہوئے ایک <span dir="ltr">WebSocket</span> کھولیں۔ Alchemy کے ساتھ، آپ [ڈیش بورڈ](https://dashboard.alchemy.com/) میں اپنی ایپ کھول کر اور اس کی <span dir="ltr">API</span> کلید دیکھ کر اسے تلاش کر سکتے ہیں۔ نوٹ کریں کہ <span dir="ltr">WebSockets</span> کے لیے <span dir="ltr">URL</span> (`wss://`) <span dir="ltr">HTTP</span> درخواستوں کے <span dir="ltr">URL</span> (`https://`) سے مختلف ہے، حالانکہ زیادہ تر پرووائیڈرز دونوں کے لیے ایک ہی <span dir="ltr">API</span> کلید استعمال کرتے ہیں۔

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.mp4#602x280)

آپ کا پرووائیڈر جن [جے سن آر پی سی طریقوں](/developers/docs/apis/json-rpc/) کو سپورٹ کرتا ہے ان میں سے کسی کو بھی <span dir="ltr">WebSocket</span> کے ذریعے استعمال کیا جا سکتا ہے۔ ایسا کرنے کے لیے، وہی پے لوڈ استعمال کریں جو <span dir="ltr">HTTP POST</span> درخواست کی باڈی کے طور پر بھیجا جائے گا، لیکن اس کے بجائے اس پے لوڈ کو <span dir="ltr">WebSocket</span> کے ذریعے بھیجیں۔

## <span dir="ltr">Web3</span> کے ساتھ {#with-web3}

[Viem](https://viem.sh/) جیسی کلائنٹ لائبریری استعمال کرتے ہوئے <span dir="ltr">WebSockets</span> پر منتقل ہونا آسان ہے۔ `http` ٹرانسپورٹ کے بجائے اپنے <span dir="ltr">WebSocket URL</span> کے ساتھ `webSocket` ٹرانسپورٹ استعمال کریں۔ مثال کے طور پر، `npm install viem` کے بعد، اسے `index.mjs` کے طور پر محفوظ کریں اور `node index.mjs` چلائیں:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// اسی ویب ساکٹ پر نئے بلاکس کو سبسکرائب کریں
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## سبسکرپشن <span dir="ltr">API</span> {#subscription-api}

جب آپ <span dir="ltr">WebSocket</span> کے ذریعے جڑے ہوں، تو آپ دو اضافی طریقے استعمال کر سکتے ہیں: `eth_subscribe` اور `eth_unsubscribe`۔ یہ طریقے آپ کو مخصوص ایونٹس کو سننے اور فوری طور پر مطلع ہونے کی اجازت دیں گے۔

### `eth_subscribe` {#eth-subscribe}

مخصوص ایونٹس کے لیے ایک نئی سبسکرپشن بناتا ہے۔ [`eth_subscribe` کے بارے میں مزید جانیں](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub)۔

#### پیرامیٹرز {#parameters}

1. سبسکرپشن کی اقسام
2. اختیاری پیرامیٹرز

پہلا آرگومنٹ اس ایونٹ کی قسم بتاتا ہے جسے سننا ہے۔ دوسرے آرگومنٹ میں اضافی آپشنز ہوتے ہیں جو پہلے آرگومنٹ پر منحصر ہوتے ہیں۔ مختلف ڈسکرپشن کی اقسام، ان کے آپشنز، اور ان کے ایونٹ پے لوڈز ذیل میں بیان کیے گئے ہیں۔

#### ریٹرنز {#returns}

سبسکرپشن آئی ڈی: یہ آئی ڈی کسی بھی موصول ہونے والے ایونٹس کے ساتھ منسلک ہو گی، اور اسے `eth_unsubscribe` کا استعمال کرتے ہوئے سبسکرپشن منسوخ کرنے کے لیے بھی استعمال کیا جا سکتا ہے۔

#### سبسکرپشن ایونٹس {#subscription-events}

جب تک سبسکرپشن فعال ہے، آپ کو ایونٹس موصول ہوں گے جو درج ذیل فیلڈز کے ساتھ آبجیکٹس ہیں:

- `jsonrpc`: ہمیشہ <span dir="ltr">"2.0"</span>
- `method`: ہمیشہ <span dir="ltr">"eth_subscription"</span>
- `params`: درج ذیل فیلڈز کے ساتھ ایک آبجیکٹ:
  - `subscription`: سبسکرپشن آئی ڈی جو `eth_subscribe` کال کے ذریعے واپس کی گئی جس نے یہ سبسکرپشن بنائی تھی۔
  - `result`: ایک آبجیکٹ جس کا مواد سبسکرپشن کی قسم کے لحاظ سے مختلف ہوتا ہے۔

#### سبسکرپشن کی اقسام {#subscription-types}

1. `newHeads`

جب بھی چین میں کوئی نیا ہیڈر شامل کیا جاتا ہے تو ایک ایونٹ خارج کرتا ہے، بشمول چین کی تنظیم نو کے دوران۔

جب چین کی تنظیم نو ہوتی ہے، تو یہ سبسکرپشن ایک ایونٹ خارج کرے گی جس میں نئی چین کے تمام نئے ہیڈرز شامل ہوں گے۔ خاص طور پر، اس کا مطلب یہ ہے کہ آپ ایک ہی اونچائی کے ساتھ متعدد ہیڈرز خارج ہوتے دیکھ سکتے ہیں، اور جب ایسا ہوتا ہے تو بعد والے ہیڈر کو تنظیم نو کے بعد درست ہیڈر کے طور پر لیا جانا چاہیے۔

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

ایسے لاگز خارج کرتا ہے جو نئے شامل کیے گئے بلاکس کا حصہ ہیں اور مخصوص فلٹر کے معیار سے مماثل ہیں۔

جب چین کی تنظیم نو ہوتی ہے، تو پرانی چین پر موجود بلاکس کا حصہ بننے والے لاگز دوبارہ خارج کیے جائیں گے جن کی پراپرٹی `removed` کو `true` پر سیٹ کیا گیا ہوگا۔ مزید برآں، نئی چین پر موجود بلاکس کا حصہ بننے والے لاگز خارج کیے جاتے ہیں، جس کا مطلب ہے کہ تنظیم نو کی صورت میں ایک ہی ٹرانزیکشن کے لاگز کو متعدد بار دیکھنا ممکن ہے۔

پیرامیٹرز

1. درج ذیل فیلڈز کے ساتھ ایک آبجیکٹ:
   - `address` (اختیاری): یا تو ایک اسٹرنگ جو کسی پتہ کی نمائندگی کرتی ہے یا ایسی اسٹرنگز کی ایک سرنی (array)۔
     - صرف ان پتوں میں سے کسی ایک سے بنائے گئے لاگز ہی خارج کیے جائیں گے۔
   - `topics`: ٹاپک کی وضاحت کرنے والوں کی ایک سرنی۔
     - ہر ٹاپک کی وضاحت کرنے والا یا تو `null` ہے، ایک اسٹرنگ جو کسی ٹاپک کی نمائندگی کرتی ہے، یا اسٹرنگز کی ایک سرنی ہے۔
     - سرنی میں ہر وہ پوزیشن جو `null` نہیں ہے، خارج ہونے والے لاگز کو صرف ان تک محدود کرتی ہے جن کے پاس اس پوزیشن میں دیے گئے ٹاپکس میں سے کوئی ایک ہو۔

ٹاپک کی وضاحتوں کی کچھ مثالیں:

- `[]`: کسی بھی ٹاپک کی اجازت ہے۔
- `[A]`: پہلی پوزیشن میں <span dir="ltr">A</span> (اور اس کے بعد کچھ بھی)۔
- `[null, B]`: پہلی پوزیشن میں کچھ بھی اور دوسری پوزیشن میں <span dir="ltr">B</span> (اور اس کے بعد کچھ بھی)۔
- `[A, B]`: پہلی پوزیشن میں <span dir="ltr">A</span> اور دوسری پوزیشن میں <span dir="ltr">B</span> (اور اس کے بعد کچھ بھی)۔
- `[[A, B], [A, B]]`: پہلی پوزیشن میں (<span dir="ltr">A</span> یا <span dir="ltr">B</span>) اور دوسری پوزیشن میں (<span dir="ltr">A</span> یا <span dir="ltr">B</span>) (اور اس کے بعد کچھ بھی)۔

مثال:

یہ مثال ایتھیریم مین نیٹ پر [ریپڈ ایتھر (ڈبلیو ایتھ) کنٹریکٹ](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) سے `Deposit` ایونٹس کو سنتی ہے:

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

ہر اس ٹرانزیکشن کا ہیش خارج کرتا ہے جو نوڈ کی زیر التواء حالت (اس کے میم پول) میں شامل کی جاتی ہے۔

مثال:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

کچھ پرووائیڈرز اپنی سبسکرپشن کی اقسام بھی پیش کرتے ہیں۔ مثال کے طور پر، Alchemy کا [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) صرف ہیشز کے بجائے _مکمل ٹرانزیکشن آبجیکٹس_ خارج کرتا ہے، اور اختیاری `fromAddress`، `toAddress` اور `hashesOnly` فلٹرز قبول کرتا ہے۔ یہ معیاری جے سن آر پی سی <span dir="ltr">API</span> کا حصہ نہیں ہیں، لہذا یہ صرف اسی پرووائیڈر کے ساتھ کام کرتے ہیں۔

### `eth_unsubscribe` {#eth-unsubscribe}

موجودہ سبسکرپشن کو منسوخ کرتا ہے تاکہ مزید کوئی ایونٹس نہ بھیجے جائیں۔

پیرامیٹرز

1. سبسکرپشن آئی ڈی، جیسا کہ پہلے `eth_subscribe` کال سے واپس کی گئی تھی۔

ریٹرنز

`true` اگر سبسکرپشن کامیابی سے منسوخ ہو گئی، یا `false` اگر دی گئی آئی ڈی کے ساتھ کوئی سبسکرپشن موجود نہیں تھی۔

ایک سبسکرپشن صرف اسی <span dir="ltr">WebSocket</span> کنکشن پر موجود ہوتی ہے جس نے اسے بنایا تھا، لہذا `eth_unsubscribe` کو اسی کنکشن پر بھیجا جانا چاہیے۔ اسے ایک الگ <span dir="ltr">HTTP</span> درخواست کے طور پر نہیں بھیجا جا سکتا۔ کنکشن بند کرنے سے اس کی تمام سبسکرپشنز بھی منسوخ ہو جاتی ہیں۔

مثال:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

مفت میں [Alchemy کے ساتھ سائن اپ کریں](https://auth.alchemy.com)، [Alchemy کی دستاویزات](https://www.alchemy.com/docs/) دیکھیں، اور تازہ ترین خبروں کے لیے، [ٹوئٹر](https://x.com/Alchemy) پر Alchemy کو فالو کریں۔
