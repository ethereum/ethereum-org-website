---
title: "WebSockets ব্যবহার করা"
description: "যেকোনো ইথেরিয়াম নোড প্রোভাইডারের সাথে জেসন-আরপিসি রিকোয়েস্ট করতে এবং ইভেন্টগুলোতে সাবস্ক্রাইব করতে WebSockets ব্যবহারের গাইড।"
author: "এলান হ্যালপার্ন"
lang: bn
tags: ["Alchemy", "websockets", "কোয়েরি করা", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

এটি ইথেরিয়াম ব্লকচেইনে রিকোয়েস্ট করার জন্য WebSockets ব্যবহারের একটি প্রাথমিক গাইড। উদাহরণগুলোতে স্ট্যান্ডার্ড জেসন-আরপিসি মেথড ব্যবহার করা হয়েছে, তাই এগুলো Alchemy সহ যেকোনো নোড বা নোড প্রোভাইডারের সাথে কাজ করে যা একটি WebSocket এন্ডপয়েন্ট অফার করে।

## WebSockets বনাম HTTP {#websockets-vs-http}

HTTP-এর বিপরীতে, WebSockets-এর মাধ্যমে নির্দিষ্ট তথ্যের প্রয়োজন হলে আপনাকে বারবার রিকোয়েস্ট করতে হয় না। WebSockets আপনার জন্য একটি নেটওয়ার্ক কানেকশন বজায় রাখে (যদি সঠিকভাবে করা হয়) এবং পরিবর্তনের জন্য অপেক্ষা করে।

যেকোনো নেটওয়ার্ক কানেকশনের মতো, আপনার ধরে নেওয়া উচিত নয় যে একটি WebSocket কোনো বাধা ছাড়াই চিরকাল খোলা থাকবে, তবে ড্রপ হওয়া কানেকশন এবং ম্যানুয়ালি পুনরায় কানেক্ট করা সঠিকভাবে পরিচালনা করা চ্যালেঞ্জিং হতে পারে। WebSockets-এর আরেকটি অসুবিধা হলো আপনি রেসপন্সে HTTP স্ট্যাটাস কোড পান না, কেবল এরর বার্তা পান।

ক্লায়েন্ট লাইব্রেরিগুলো আপনার জন্য এটি পরিচালনা করতে পারে। উদাহরণস্বরূপ, [viem-এর WebSocket ট্রান্সপোর্ট](https://viem.sh/docs/clients/transports/websocket) সকেট ফেইলিউরে পুনরায় কানেক্ট করে এবং ডিফল্টভাবে কিপ-অ্যালাইভ (keep-alive) পিং পাঠায়।

## ট্রাই করে দেখুন {#try-it-out}

আপনার একটি ইথেরিয়াম নোডের জন্য একটি WebSocket URL প্রয়োজন। আপনি যখন একটি অ্যাপ্লিকেশন প্রোগ্রামিং ইন্টারফেস (এপিআই) কী তৈরি করেন তখন নোড প্রোভাইডাররা আপনাকে একটি দেয়, সাধারণত `wss://<provider-host>/<your-api-key>` ফর্মে। উদাহরণস্বরূপ, একটি Alchemy ইথেরিয়াম মেইননেট URL দেখতে `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` এর মতো হয় ([একটি বিনামূল্যের Alchemy অ্যাকাউন্টের জন্য সাইন আপ করুন](https://auth.alchemy.com/signup))। অন্যান্য প্রোভাইডারদের জন্য [সার্ভিস হিসেবে নোড](/developers/docs/nodes-and-clients/nodes-as-a-service/) দেখুন, অথবা [আপনার নিজের নোডের](/developers/docs/nodes-and-clients/run-a-node/) WebSocket এন্ডপয়েন্ট ব্যবহার করুন। `wss://ethereum-rpc.publicnode.com` এর মতো পাবলিক এন্ডপয়েন্টগুলোও দ্রুত পরীক্ষার জন্য কাজ করে, তবে এগুলো রেট-লিমিটেড এবং প্রতিটি সাবস্ক্রিপশনের ধরন সমর্থন নাও করতে পারে।

WebSockets পরীক্ষা করার সবচেয়ে সহজ উপায় হলো WebSocket রিকোয়েস্ট করার জন্য একটি কমান্ড লাইন টুল ইনস্টল করা, যেমন [wscat](https://github.com/websockets/wscat)। wscat ব্যবহার করে, আপনি নিচের মতো রিকোয়েস্ট পাঠাতে পারেন:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>` দিয়ে শুরু হওয়া লাইনগুলো হলো যা আপনি টাইপ করেন এবং `<` দিয়ে শুরু হওয়া লাইনগুলো হলো যা নোড ফেরত পাঠায়।

## WebSockets কীভাবে ব্যবহার করবেন {#how-to-use-websockets}

শুরু করতে, আপনার প্রোভাইডারের WebSocket URL ব্যবহার করে একটি WebSocket খুলুন। Alchemy-এর সাথে, আপনি [ড্যাশবোর্ডে](https://dashboard.alchemy.com/) আপনার অ্যাপ খুলে এবং এর অ্যাপ্লিকেশন প্রোগ্রামিং ইন্টারফেস (এপিআই) কী দেখে এটি খুঁজে পেতে পারেন। মনে রাখবেন যে WebSockets-এর URL (`wss://`) HTTP রিকোয়েস্টের URL (`https://`) থেকে আলাদা, যদিও বেশিরভাগ প্রোভাইডার উভয়ের জন্য একই এপিআই কী ব্যবহার করে।

![আপনার Alchemy ড্যাশবোর্ডে আপনার WebSocket URL কোথায় পাবেন](./use-websockets.mp4#602x280)

আপনার প্রোভাইডার সমর্থন করে এমন যেকোনো [জেসন-আরপিসি মেথড](/developers/docs/apis/json-rpc/) WebSocket-এর মাধ্যমে ব্যবহার করা যেতে পারে। এটি করতে, একটি HTTP POST রিকোয়েস্টের বডি হিসেবে যে পেলোড পাঠানো হতো সেই একই পেলোড ব্যবহার করুন, তবে এর পরিবর্তে সেই পেলোডটি WebSocket-এর মাধ্যমে পাঠান।

## Web3 এর সাথে {#with-web3}

[viem](https://viem.sh/)-এর মতো একটি ক্লায়েন্ট লাইব্রেরি ব্যবহার করার সময় WebSockets-এ ট্রানজিশন করা সহজ। `http` ট্রান্সপোর্টের পরিবর্তে আপনার WebSocket URL-এর সাথে `webSocket` ট্রান্সপোর্ট ব্যবহার করুন। উদাহরণস্বরূপ, `npm install viem`-এর পরে, এটিকে `index.mjs` হিসেবে সেভ করুন এবং `node index.mjs` রান করুন:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// একই ওয়েবসকেটের মাধ্যমে নতুন ব্লকগুলোতে সাবস্ক্রাইব করুন
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## সাবস্ক্রিপশন API {#subscription-api}

একটি WebSocket-এর মাধ্যমে সংযুক্ত থাকার সময়, আপনি দুটি অতিরিক্ত মেথড ব্যবহার করতে পারেন: `eth_subscribe` এবং `eth_unsubscribe`। এই মেথডগুলো আপনাকে নির্দিষ্ট ইভেন্টগুলোর জন্য অপেক্ষা করতে এবং তাৎক্ষণিকভাবে নোটিফিকেশন পেতে সাহায্য করবে।

### `eth_subscribe` {#eth-subscribe}

নির্দিষ্ট ইভেন্টগুলোর জন্য একটি নতুন সাবস্ক্রিপশন তৈরি করে। [`eth_subscribe` সম্পর্কে আরও জানুন](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub)।

#### প্যারামিটার {#parameters}

1. সাবস্ক্রিপশনের ধরন
2. ঐচ্ছিক প্যারামিটার

প্রথম আর্গুমেন্টটি নির্দিষ্ট করে যে কোন ধরনের ইভেন্টের জন্য অপেক্ষা করতে হবে। দ্বিতীয় আর্গুমেন্টে অতিরিক্ত অপশন থাকে যা প্রথম আর্গুমেন্টের ওপর নির্ভর করে। বিভিন্ন সাবস্ক্রিপশনের ধরন, তাদের অপশন এবং তাদের ইভেন্ট পেলোডগুলো নিচে বর্ণনা করা হলো।

#### রিটার্নস (Returns) {#returns}

সাবস্ক্রিপশন ID: এই ID-টি প্রাপ্ত যেকোনো ইভেন্টের সাথে যুক্ত থাকবে এবং `eth_unsubscribe` ব্যবহার করে সাবস্ক্রিপশন বাতিল করতেও ব্যবহার করা যেতে পারে।

#### সাবস্ক্রিপশন ইভেন্ট {#subscription-events}

সাবস্ক্রিপশন সক্রিয় থাকাকালীন, আপনি ইভেন্ট পাবেন যা নিচের ফিল্ডগুলোসহ অবজেক্ট হিসেবে থাকে:

- `jsonrpc`: সর্বদা "2.0"
- `method`: সর্বদা "eth_subscription"
- `params`: নিচের ফিল্ডগুলোসহ একটি অবজেক্ট:
  - `subscription`: `eth_subscribe` কলের মাধ্যমে রিটার্ন করা সাবস্ক্রিপশন ID যা এই সাবস্ক্রিপশনটি তৈরি করেছে।
  - `result`: একটি অবজেক্ট যার বিষয়বস্তু সাবস্ক্রিপশনের ধরনের ওপর নির্ভর করে পরিবর্তিত হয়।

#### সাবস্ক্রিপশনের ধরন {#subscription-types}

1. `newHeads`

চেইন রিঅর্গ চলাকালীন সময়সহ, চেইনে নতুন হেডার যোগ হওয়ার যেকোনো সময় একটি ইভেন্ট এমিট করে।

যখন একটি চেইন রিঅর্গ ঘটে, তখন এই সাবস্ক্রিপশনটি নতুন চেইনের জন্য সমস্ত নতুন হেডার ধারণকারী একটি ইভেন্ট এমিট করবে। বিশেষ করে, এর মানে হলো আপনি একই উচ্চতার সাথে একাধিক হেডার এমিট হতে দেখতে পারেন, এবং যখন এটি ঘটে তখন রিঅর্গ-এর পরে পরবর্তী হেডারটিকে সঠিক হিসেবে নেওয়া উচিত।

উদাহরণ:

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

নির্দিষ্ট ফিল্টার মানদণ্ডের সাথে মিলে যাওয়া নতুন যোগ করা ব্লকগুলোর অংশ এমন লগগুলো এমিট করে।

যখন একটি চেইন রিঅর্গ ঘটে, তখন পুরানো চেইনের ব্লকগুলোর অংশ এমন লগগুলো `removed` প্রপার্টি `true` সেট করে আবার এমিট করা হবে। উপরন্তু, নতুন চেইনের ব্লকগুলোর অংশ এমন লগগুলো এমিট করা হয়, যার মানে হলো রিঅর্গ-এর ক্ষেত্রে একই ট্রানজ্যাকশন-এর জন্য একাধিকবার লগ দেখা সম্ভব।

প্যারামিটার

1. নিচের ফিল্ডগুলোসহ একটি অবজেক্ট:
   - `address` (ঐচ্ছিক): একটি ঠিকানা উপস্থাপনকারী স্ট্রিং অথবা এই ধরনের স্ট্রিংগুলোর একটি অ্যারে।
     - শুধুমাত্র এই ঠিকানাগুলোর একটি থেকে তৈরি করা লগগুলো এমিট করা হবে।
   - `topics`: টপিক স্পেসিফায়ারগুলোর একটি অ্যারে।
     - প্রতিটি টপিক স্পেসিফায়ার হয় `null`, একটি টপিক উপস্থাপনকারী স্ট্রিং, অথবা স্ট্রিংগুলোর একটি অ্যারে।
     - অ্যারের প্রতিটি পজিশন যা `null` নয়, এমিট করা লগগুলোকে শুধুমাত্র তাদের মধ্যে সীমাবদ্ধ করে যাদের সেই পজিশনে প্রদত্ত টপিকগুলোর একটি রয়েছে।

টপিক স্পেসিফিকেশনের কিছু উদাহরণ:

- `[]`: যেকোনো টপিক অনুমোদিত।
- `[A]`: প্রথম পজিশনে A (এবং এর পরে যেকোনো কিছু)।
- `[null, B]`: প্রথম পজিশনে যেকোনো কিছু এবং দ্বিতীয় পজিশনে B (এবং এর পরে যেকোনো কিছু)।
- `[A, B]`: প্রথম পজিশনে A এবং দ্বিতীয় পজিশনে B (এবং এর পরে যেকোনো কিছু)।
- `[[A, B], [A, B]]`: প্রথম পজিশনে (A বা B) এবং দ্বিতীয় পজিশনে (A বা B) (এবং এর পরে যেকোনো কিছু)।

উদাহরণ:

এই উদাহরণটি ইথেরিয়াম মেইননেট-এ [WETH কন্ট্রাক্ট](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) থেকে `Deposit` ইভেন্টগুলোর জন্য অপেক্ষা করে:

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

নোডের পেন্ডিং স্টেট (এর মেমপুল)-এ যোগ করা প্রতিটি ট্রানজ্যাকশন-এর হ্যাশ এমিট করে।

উদাহরণ:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

কিছু প্রোভাইডার তাদের নিজস্ব সাবস্ক্রিপশনের ধরনও অফার করে। উদাহরণস্বরূপ, Alchemy-এর [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) শুধুমাত্র হ্যাশ-এর পরিবর্তে _সম্পূর্ণ ট্রানজ্যাকশন অবজেক্ট_ এমিট করে এবং ঐচ্ছিক `fromAddress`, `toAddress` এবং `hashesOnly` ফিল্টার গ্রহণ করে। এগুলো স্ট্যান্ডার্ড জেসন-আরপিসি অ্যাপ্লিকেশন প্রোগ্রামিং ইন্টারফেস (এপিআই)-এর অংশ নয়, তাই এগুলো শুধুমাত্র সেই প্রোভাইডারের সাথেই কাজ করে।

### `eth_unsubscribe` {#eth-unsubscribe}

একটি বিদ্যমান সাবস্ক্রিপশন বাতিল করে যাতে আর কোনো ইভেন্ট পাঠানো না হয়।

প্যারামিটার

1. সাবস্ক্রিপশন ID, যা আগে একটি `eth_subscribe` কল থেকে রিটার্ন করা হয়েছিল।

রিটার্নস (Returns)

`true` যদি একটি সাবস্ক্রিপশন সফলভাবে বাতিল করা হয়, অথবা `false` যদি প্রদত্ত ID-এর সাথে কোনো সাবস্ক্রিপশন না থাকে।

একটি সাবস্ক্রিপশন শুধুমাত্র সেই WebSocket কানেকশনে বিদ্যমান থাকে যা এটি তৈরি করেছে, তাই `eth_unsubscribe` অবশ্যই সেই একই কানেকশনের মাধ্যমে পাঠাতে হবে। এটি একটি পৃথক HTTP রিকোয়েস্ট হিসেবে পাঠানো যাবে না। কানেকশন বন্ধ করলেও এর সমস্ত সাবস্ক্রিপশন বাতিল হয়ে যায়।

উদাহরণ:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

বিনামূল্যে [Alchemy-এর সাথে সাইন আপ করুন](https://auth.alchemy.com), [Alchemy-এর ডকুমেন্টেশন](https://www.alchemy.com/docs/) দেখুন এবং সর্বশেষ খবরের জন্য [টুইটার](https://x.com/Alchemy)-এ Alchemy-কে ফলো করুন।
