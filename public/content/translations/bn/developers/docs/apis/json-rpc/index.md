---
title: "জেসন-আরপিসি API"
description: "ইথেরিয়াম ক্লায়েন্টদের জন্য একটি স্টেটলেস, লাইট-ওয়েট রিমোট প্রসিডিউর কল (RPC) প্রোটোকল।"
lang: bn
---

একটি সফটওয়্যার অ্যাপ্লিকেশনকে [ইথেরিয়াম](/) ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে হলে - তা ব্লকচেইন ডেটা পড়ার মাধ্যমেই হোক বা নেটওয়ার্কে ট্রানজ্যাকশন পাঠানোর মাধ্যমেই হোক - এটিকে অবশ্যই একটি ইথেরিয়াম নোডের সাথে সংযুক্ত হতে হবে।

এই উদ্দেশ্যে, প্রতিটি [ইথেরিয়াম ক্লায়েন্ট](/developers/docs/nodes-and-clients/#execution-clients) একটি [জেসন-আরপিসি স্পেসিফিকেশন](https://github.com/ethereum/execution-apis) প্রয়োগ করে, যাতে মেথডগুলোর একটি অভিন্ন সেট থাকে যার উপর অ্যাপ্লিকেশনগুলো নির্ভর করতে পারে, নির্দিষ্ট নোড বা ক্লায়েন্ট ইমপ্লিমেন্টেশন যাই হোক না কেন।

[জেসন-আরপিসি](https://www.jsonrpc.org/specification) হলো একটি স্টেটলেস, লাইট-ওয়েট রিমোট প্রসিডিউর কল (RPC) প্রোটোকল। এটি বেশ কয়েকটি ডেটা স্ট্রাকচার এবং সেগুলোর প্রসেসিং সম্পর্কিত নিয়মগুলো সংজ্ঞায়িত করে। এটি ট্রান্সপোর্ট অ্যাগনস্টিক, অর্থাৎ এর কনসেপ্টগুলো একই প্রসেসের মধ্যে, সকেটের মাধ্যমে, HTTP-এর মাধ্যমে, বা বিভিন্ন মেসেজ পাসিং এনভায়রনমেন্টে ব্যবহার করা যেতে পারে। এটি ডেটা ফরম্যাট হিসেবে JSON (RFC 4627) ব্যবহার করে।

## ক্লায়েন্ট ইমপ্লিমেন্টেশন {#client-implementations}

জেসন-আরপিসি স্পেসিফিকেশন বাস্তবায়ন করার সময় ইথেরিয়াম ক্লায়েন্টগুলো প্রত্যেকে বিভিন্ন প্রোগ্রামিং ভাষা ব্যবহার করতে পারে। নির্দিষ্ট প্রোগ্রামিং ভাষা সম্পর্কিত আরও বিস্তারিত তথ্যের জন্য স্বতন্ত্র [ক্লায়েন্ট ডকুমেন্টেশন](/developers/docs/nodes-and-clients/#execution-clients) দেখুন। সর্বশেষ API সাপোর্ট তথ্যের জন্য আমরা প্রতিটি ক্লায়েন্টের ডকুমেন্টেশন চেক করার পরামর্শ দিই।

## সুবিধাজনক লাইব্রেরি {#convenience-libraries}

যদিও আপনি জেসন-আরপিসি API-এর মাধ্যমে সরাসরি ইথেরিয়াম ক্লায়েন্টগুলোর সাথে ইন্টারঅ্যাক্ট করা বেছে নিতে পারেন, তবে বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) ডেভেলপারদের জন্য প্রায়শই আরও সহজ বিকল্প থাকে। জেসন-আরপিসি API-এর উপরে র‍্যাপার প্রদান করার জন্য অনেক [JavaScript](/developers/docs/apis/javascript/#available-libraries) এবং [ব্যাকএন্ড API](/developers/docs/apis/backend/#available-libraries) লাইব্রেরি রয়েছে। এই লাইব্রেরিগুলোর সাহায্যে, ডেভেলপাররা ইথেরিয়ামের সাথে ইন্টারঅ্যাক্ট করার জন্য জেসন-আরপিসি রিকোয়েস্ট ইনিশিয়ালাইজ করতে (অভ্যন্তরীণভাবে) তাদের পছন্দের প্রোগ্রামিং ভাষায় সহজবোধ্য, এক-লাইনের মেথড লিখতে পারেন।

## কনসেনসাস ক্লায়েন্ট API-সমূহ {#consensus-clients}

এই পৃষ্ঠাটি প্রধানত ইথেরিয়াম এক্সিকিউশন ক্লায়েন্ট দ্বারা ব্যবহৃত জেসন-আরপিসি API নিয়ে আলোচনা করে। তবে, কনসেনসাস ক্লায়েন্টগুলোরও একটি RPC API রয়েছে যা ব্যবহারকারীদের সরাসরি একটি নোড থেকে নোড সম্পর্কে তথ্য অনুসন্ধান করতে, বীকন ব্লক (Beacon blocks), বীকন স্টেট (Beacon state) এবং অন্যান্য কনসেনসাস-সম্পর্কিত তথ্যের জন্য অনুরোধ করতে দেয়। এই API-টি [বীকন API ওয়েবপৃষ্ঠায়](https://ethereum.github.io/beacon-APIs/#/) নথিভুক্ত করা হয়েছে।

একটি নোডের মধ্যে আন্তঃ-ক্লায়েন্ট যোগাযোগের জন্য একটি অভ্যন্তরীণ API-ও ব্যবহৃত হয় - অর্থাৎ, এটি কনসেনসাস ক্লায়েন্ট এবং এক্সিকিউশন ক্লায়েন্টকে ডেটা সোয়াপ করতে সক্ষম করে। একে 'ইঞ্জিন API' (Engine API) বলা হয় এবং এর স্পেসিফিকেশনগুলো [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)-এ পাওয়া যাবে।

## এক্সিকিউশন ক্লায়েন্ট স্পেসিফিকেশন {#spec}

[GitHub-এ সম্পূর্ণ জেসন-আরপিসি API স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-apis)। এই API-টি [এক্সিকিউশন API ওয়েবপেজে](https://ethereum.github.io/execution-apis/) নথিভুক্ত করা হয়েছে এবং এতে উপলব্ধ সমস্ত মেথড পরীক্ষা করে দেখার জন্য একটি ইন্সপেক্টর অন্তর্ভুক্ত রয়েছে।

## কনভেনশন {#conventions}

### হেক্স ভ্যালু এনকোডিং {#hex-encoding}

JSON-এর মাধ্যমে দুটি মূল ডেটা টাইপ পাস করা হয়: আনফরম্যাটেড বাইট অ্যারে এবং পরিমাণ (quantities)। উভয়ই হেক্স এনকোডিংয়ের মাধ্যমে পাস করা হয় তবে এদের ফরম্যাটিংয়ের প্রয়োজনীয়তা ভিন্ন।

#### পরিমাণ (Quantities) {#quantities-encoding}

পরিমাণ (পূর্ণসংখ্যা, সংখ্যা) এনকোড করার সময়: হেক্স হিসেবে এনকোড করুন, শুরুতে "0x" যুক্ত করুন, যা সবচেয়ে কমপ্যাক্ট রূপ (সামান্য ব্যতিক্রম: শূন্যকে "0x0" হিসেবে উপস্থাপন করা উচিত)।

এখানে কিছু উদাহরণ দেওয়া হলো:

- 0x41 (ডেসিমালে 65)
- 0x400 (ডেসিমালে 1024)
- ভুল: 0x (সর্বদা অন্তত একটি সংখ্যা থাকতে হবে - শূন্য হলো "0x0")
- ভুল: 0x0400 (শুরুতে শূন্য থাকা যাবে না)
- ভুল: ff (শুরুতে অবশ্যই 0x থাকতে হবে)

### আনফরম্যাটেড ডেটা {#unformatted-data-encoding}

আনফরম্যাটেড ডেটা (বাইট অ্যারে, অ্যাকাউন্ট ঠিকানা, হ্যাশ, বাইটকোড অ্যারে) এনকোড করার সময়: হেক্স হিসেবে এনকোড করুন, শুরুতে "0x" যুক্ত করুন, প্রতি বাইটের জন্য দুটি হেক্স ডিজিট ব্যবহার করুন।

এখানে কিছু উদাহরণ দেওয়া হলো:

- 0x41 (আকার 1, "A")
- 0x004200 (আকার 3, "0B0")
- 0x (আকার 0, "")
- ভুল: 0xf0f0f (অবশ্যই জোড় সংখ্যক ডিজিট হতে হবে)
- ভুল: 004200 (শুরুতে অবশ্যই 0x থাকতে হবে)

### ব্লক প্যারামিটার {#block-parameter}

নিচের মেথডগুলোতে একটি ব্লক প্যারামিটার রয়েছে:

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

যখন ইথেরিয়াম-এর স্টেট কোয়েরি করার জন্য রিকোয়েস্ট করা হয়, তখন প্রদত্ত ব্লক প্যারামিটারটি ব্লকের উচ্চতা নির্ধারণ করে।

ব্লক প্যারামিটারের জন্য নিচের বিকল্পগুলো ব্যবহার করা যেতে পারে:

- `HEX String` - একটি পূর্ণসংখ্যা ব্লক নম্বর
- `String "earliest"` - সবচেয়ে পুরনো/জেনেসিস ব্লকের জন্য
- `String "latest"` - সর্বশেষ প্রস্তাবিত ব্লকের জন্য
- `String "safe"` - সর্বশেষ নিরাপদ হেড ব্লকের জন্য
- `String "finalized"` - সর্বশেষ চূড়ান্তকৃত ব্লকের জন্য
- `String "pending"` - পেন্ডিং স্টেট/ট্রানজ্যাকশনগুলোর জন্য

## উদাহরণ {#examples}

এই পৃষ্ঠায় আমরা কমান্ড লাইন টুল [curl](https://curl.se) ব্যবহার করে কীভাবে পৃথক জেসন-আরপিসি API এন্ডপয়েন্টগুলো ব্যবহার করতে হয় তার উদাহরণ প্রদান করেছি। এই পৃথক এন্ডপয়েন্টের উদাহরণগুলো নিচের [Curl উদাহরণ](#curl-examples) বিভাগে পাওয়া যাবে। পৃষ্ঠার আরও নিচের দিকে, আমরা একটি Geth নোড, জেসন-আরপিসি API এবং curl ব্যবহার করে একটি স্মার্ট কন্ট্রাক্ট কম্পাইল এবং ডিপ্লয় করার জন্য একটি [এন্ড-টু-এন্ড উদাহরণ](#usage-example) প্রদান করেছি।

## Curl-এর উদাহরণ {#curl-examples}

একটি ইথেরিয়াম নোডে [curl](https://curl.se) রিকোয়েস্ট করার মাধ্যমে জেসন-আরপিসি API ব্যবহারের উদাহরণ নিচে দেওয়া হলো। প্রতিটি উদাহরণে নির্দিষ্ট এন্ডপয়েন্টের বিবরণ, এর প্যারামিটার, রিটার্ন টাইপ এবং এটি কীভাবে ব্যবহার করতে হবে তার একটি কার্যকরী উদাহরণ অন্তর্ভুক্ত রয়েছে।

curl রিকোয়েস্টগুলো কন্টেন্ট টাইপ সম্পর্কিত একটি ত্রুটি বার্তা রিটার্ন করতে পারে। এর কারণ হলো `--data` অপশনটি কন্টেন্ট টাইপকে `application/x-www-form-urlencoded` হিসেবে সেট করে। যদি আপনার নোড এই বিষয়ে অভিযোগ করে, তবে কলের শুরুতে `-H "Content-Type: application/json"` বসিয়ে ম্যানুয়ালি হেডার সেট করুন। উদাহরণগুলোতে URL/IP এবং পোর্টের সমন্বয়ও অন্তর্ভুক্ত নেই, যা curl-এ দেওয়া শেষ আর্গুমেন্ট হতে হবে (যেমন, `127.0.0.1:8545`)। এই অতিরিক্ত ডেটাসহ একটি সম্পূর্ণ curl রিকোয়েস্ট নিচের রূপটি ধারণ করে:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## গসিপ, স্টেট, ইতিহাস {#gossip-state-history}

কয়েকটি মূল জেসন-আরপিসি মেথডের ইথেরিয়াম নেটওয়ার্ক থেকে ডেটার প্রয়োজন হয় এবং এগুলোকে সুন্দরভাবে তিনটি প্রধান বিভাগে ভাগ করা যায়: _গসিপ, স্টেট এবং ইতিহাস_। প্রতিটি মেথডে যেতে এই বিভাগগুলোর লিঙ্ক ব্যবহার করুন, অথবা মেথডগুলোর সম্পূর্ণ তালিকা দেখতে সূচিপত্র ব্যবহার করুন।

### গসিপ মেথড {#gossip-methods}

> এই মেথডগুলো চেইনের হেড ট্র্যাক করে। এভাবেই ট্রানজ্যাকশনগুলো নেটওয়ার্কের চারপাশে ঘোরে, ব্লকে তাদের জায়গা করে নেয় এবং ক্লায়েন্টরা নতুন ব্লক সম্পর্কে জানতে পারে।

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### স্টেট মেথড {#state-methods}

> যে মেথডগুলো সংরক্ষিত সমস্ত ডেটার বর্তমান স্টেট রিপোর্ট করে। "স্টেট" হলো একটি বড় শেয়ার করা RAM-এর মতো, এবং এর মধ্যে অ্যাকাউন্ট ব্যালেন্স, কন্ট্রাক্ট ডেটা এবং গ্যাস অনুমান অন্তর্ভুক্ত থাকে।

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### ইতিহাস মেথড {#history-methods}

> জেনেসিস পর্যন্ত প্রতিটি ব্লকের ঐতিহাসিক রেকর্ড নিয়ে আসে। এটি একটি বড় অ্যাপেন্ড-অনলি (append-only) ফাইলের মতো, এবং এর মধ্যে সমস্ত ব্লক হেডার, ব্লক বডি, আঙ্কেল ব্লক এবং ট্রানজ্যাকশন রসিদ অন্তর্ভুক্ত থাকে।

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## জেসন-আরপিসি API প্লেগ্রাউন্ড {#json-rpc-api-playground}

API মেথডগুলো আবিষ্কার করতে এবং পরীক্ষা করে দেখতে আপনি [প্লেগ্রাউন্ড টুলটি](https://ethereum-json-rpc.com) ব্যবহার করতে পারেন। বিভিন্ন নোড প্রোভাইডার দ্বারা কোন মেথড এবং নেটওয়ার্কগুলো সমর্থিত, সেটিও এটি আপনাকে দেখায়।

## জেসন-আরপিসি API মেথড {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

বর্তমান ক্লায়েন্ট সংস্করণ প্রদান করে।

**প্যারামিটার**

নেই

**রিটার্ন**

`String` - বর্তমান ক্লায়েন্ট সংস্করণ

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// ফলাফল
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

প্রদত্ত ডেটার কেক্যাক-256 (স্ট্যান্ডার্ডাইজড SHA3-256 _নয়_) প্রদান করে।

**প্যারামিটার**

1. `DATA` - SHA3 হ্যাশে রূপান্তর করার জন্য ডেটা

```js
params: ["0x68656c6c6f20776f726c64"]
```

**রিটার্ন**

`DATA` - প্রদত্ত স্ট্রিংয়ের SHA3 ফলাফল।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// ফলাফল
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

বর্তমান নেটওয়ার্ক আইডি প্রদান করে।

**প্যারামিটার**

কোনোটিই নয়

**রিটার্ন**

`String` - বর্তমান নেটওয়ার্ক আইডি।

বর্তমান নেটওয়ার্ক আইডিগুলোর সম্পূর্ণ তালিকা [chainlist.org](https://chainlist.org)-এ পাওয়া যাবে। এর মধ্যে কিছু সাধারণ আইডি হলো:

- `1`: ইথেরিয়াম মেইননেট
- `11155111`: Sepolia টেস্টনেট
- `560048` : Hoodi টেস্টনেট

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// ফলাফল
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

ক্লায়েন্ট সক্রিয়ভাবে নেটওয়ার্ক সংযোগের জন্য লিসেন করলে `true` রিটার্ন করে।

**প্যারামিটার**

নেই

**রিটার্ন**

`Boolean` - লিসেন করার সময় `true`, অন্যথায় `false`।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// ফলাফল
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

ক্লায়েন্টের সাথে বর্তমানে সংযুক্ত পিয়ারের সংখ্যা প্রদান করে।

**প্যারামিটার**

নেই

**রিটার্ন**

`QUANTITY` - সংযুক্ত পিয়ারের সংখ্যার পূর্ণসংখ্যা (integer)।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// ফলাফল
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

বর্তমান ইথেরিয়াম প্রোটোকল সংস্করণ রিটার্ন করে। লক্ষণীয় যে, এই পদ্ধতিটি [Geth-এ উপলব্ধ নয়](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)।

**প্যারামিটার**

নেই

**রিটার্ন**

`String` - বর্তমান ইথেরিয়াম প্রোটোকল সংস্করণ

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// ফলাফল
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

সিঙ্কিং স্ট্যাটাস সম্পর্কে ডেটা সহ একটি অবজেক্ট বা `false` রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করে দেখুন
</ButtonLink>

**প্যারামিটার**

নেই

**রিটার্ন**

সঠিক রিটার্ন ডেটা ক্লায়েন্ট ইমপ্লিমেন্টেশনের ওপর ভিত্তি করে ভিন্ন হয়। নোড সিঙ্কিং না হলে সমস্ত ক্লায়েন্ট `False` রিটার্ন করে এবং সমস্ত ক্লায়েন্ট নিচের ফিল্ডগুলো রিটার্ন করে।

`Object|Boolean`, সিঙ্কিং স্ট্যাটাস ডেটা সহ একটি অবজেক্ট অথবা সিঙ্কিং না হলে `FALSE`:

- `startingBlock`: `QUANTITY` - যে ব্লক থেকে ইমপোর্ট শুরু হয়েছে (সিঙ্কিং এর হেডে পৌঁছানোর পরেই কেবল এটি রিসেট হবে)
- `currentBlock`: `QUANTITY` - বর্তমান ব্লক, eth_blockNumber এর মতোই
- `highestBlock`: `QUANTITY` - আনুমানিক সর্বোচ্চ ব্লক

তবে, আলাদা আলাদা ক্লায়েন্ট অতিরিক্ত ডেটাও প্রদান করতে পারে। উদাহরণস্বরূপ Geth নিচের ডেটা রিটার্ন করে:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

অন্যদিকে বেসু রিটার্ন করে:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

আরও বিস্তারিত তথ্যের জন্য আপনার নির্দিষ্ট ক্লায়েন্টের ডকুমেন্টেশন দেখুন।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// অথবা যখন সিঙ্কিং হচ্ছে না
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

ক্লায়েন্ট কয়েনবেস ঠিকানা রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি পরীক্ষা করুন
</ButtonLink>

> **নোট:** এই পদ্ধতিটি **v1.14.0** থেকে বাতিল করা হয়েছে এবং এটি আর সমর্থিত নয়। এই পদ্ধতিটি ব্যবহার করার চেষ্টা করলে একটি "Method not supported" ত্রুটি দেখা দেবে।

**প্যারামিটার**

কোনোটিই নয়

**রিটার্ন**

`DATA`, 20 বাইট - বর্তমান কয়েনবেস ঠিকানা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// ফলাফল
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

রিপ্লে-সুরক্ষিত ট্রানজ্যাকশনে স্বাক্ষর করার জন্য ব্যবহৃত চেইন ID রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

নেই

**রিটার্ন**

`chainId`, স্ট্রিং হিসেবে একটি হেক্সাডেসিমাল মান যা বর্তমান চেইন ID-এর পূর্ণসংখ্যাকে উপস্থাপন করে।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// ফলাফল
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

ক্লায়েন্ট সক্রিয়ভাবে নতুন ব্লক মাইনিং করলে `true` রিটার্ন করে। এটি শুধুমাত্র প্রুফ-অফ-ওয়ার্ক (PoW) নেটওয়ার্কের জন্য `true` রিটার্ন করতে পারে এবং [দ্য মার্জ](/roadmap/merge/)-এর পর থেকে কিছু ক্লায়েন্টে উপলব্ধ নাও থাকতে পারে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনোটি নেই

**রিটার্ন**

`Boolean` - ক্লায়েন্ট মাইনিং করলে `true` রিটার্ন করে, অন্যথায় `false`।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

নোডটি প্রতি সেকেন্ডে কতগুলো হ্যাশ দিয়ে মাইনিং করছে তা রিটার্ন করে। এটি শুধুমাত্র প্রুফ-অফ-ওয়ার্ক নেটওয়ার্কের জন্য `true` রিটার্ন করতে পারে এবং [দ্য মার্জ](/roadmap/merge/)-এর পর থেকে কিছু ক্লায়েন্টে উপলব্ধ নাও থাকতে পারে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

নেই

**রিটার্ন**

`QUANTITY` - প্রতি সেকেন্ডে হ্যাশের সংখ্যা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// ফলাফল
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Wei-তে প্রতি গ্যাসের বর্তমান মূল্যের একটি আনুমানিক হিসাব প্রদান করে। উদাহরণস্বরূপ, বেসু ক্লায়েন্ট ডিফল্টভাবে শেষ 100টি ব্লক পরীক্ষা করে এবং মধ্যমা গ্যাস ইউনিট মূল্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

নেই

**রিটার্ন**

`QUANTITY` - Wei-তে বর্তমান গ্যাস প্রাইসের পূর্ণসংখ্যা (integer)।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// ফলাফল
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

ক্লায়েন্টের মালিকানাধীন ঠিকানার একটি তালিকা রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

নেই

**রিটার্ন**

`Array of DATA`, 20 বাইট - ক্লায়েন্টের মালিকানাধীন ঠিকানা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

সবচেয়ে সাম্প্রতিক ব্লকের নম্বর প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

নেই

**রিটার্ন**

`QUANTITY` - ক্লায়েন্ট বর্তমানে যে ব্লক নম্বরে আছে তার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// ফলাফল
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

একটি নির্দিষ্ট ঠিকানায় থাকা অ্যাকাউন্টের ব্যালেন্স ফেরত দেয়।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করে দেখুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - ব্যালেন্স চেক করার ঠিকানা।
2. `QUANTITY|TAG` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা স্ট্রিং `"latest"`, `"earliest"`, `"pending"`, `"safe"`, বা `"finalized"`, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**রিটার্ন**

`QUANTITY` - Wei-তে বর্তমান ব্যালেন্সের পূর্ণসংখ্যা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

একটি নির্দিষ্ট ঠিকানার স্টোরেজ অবস্থান থেকে মান প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - স্টোরেজের ঠিকানা।
2. `QUANTITY` - স্টোরেজের অবস্থানের পূর্ণসংখ্যা (integer)।
3. `QUANTITY|TAG` - পূর্ণসংখ্যার ব্লক নম্বর, অথবা স্ট্রিং `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

**রিটার্ন**

`DATA` - এই স্টোরেজ অবস্থানের মান।

**উদাহরণ**
সঠিক অবস্থান গণনা করা নির্ভর করে কোন স্টোরেজটি পুনরুদ্ধার করা হবে তার উপর। `0x391694e7e0b0cce554cb130d723a9d27458f9298` ঠিকানা দ্বারা `0x295a70b2de5e3953354a6a8344e616ed314d7251`-এ ডিপ্লয় করা নিচের কন্ট্রাক্টটি বিবেচনা করুন।

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

pos0-এর মান পুনরুদ্ধার করা বেশ সহজ:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

ম্যাপের কোনো উপাদান পুনরুদ্ধার করা তুলনামূলক কঠিন। ম্যাপে কোনো উপাদানের অবস্থান নিচের উপায়ে গণনা করা হয়:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

এর মানে হলো pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]-এর স্টোরেজ পুনরুদ্ধার করতে আমাদের নিচের উপায়ে অবস্থান গণনা করতে হবে:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Web3 লাইব্রেরির সাথে আসা Geth কনসোল ব্যবহার করে এই গণনাটি করা যেতে পারে:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

এখন স্টোরেজটি পেতে:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

একটি ঠিকানা থেকে _পাঠানো_ ট্রানজ্যাকশনের সংখ্যা রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - ঠিকানা।
2. `QUANTITY|TAG` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা স্ট্রিং `"latest"`, `"earliest"`, `"pending"`, `"safe"` বা `"finalized"`, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // সর্বশেষ ব্লকের স্টেট
]
```

**রিটার্ন**

`QUANTITY` - এই ঠিকানা থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

প্রদত্ত ব্লক হ্যাশের সাথে মিলে যাওয়া একটি ব্লকের ট্রানজ্যাকশনের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাশ

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**রিটার্ন**

`QUANTITY` - এই ব্লকে থাকা ট্রানজ্যাকশনের সংখ্যার পূর্ণসংখ্যা (integer)।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

প্রদত্ত ব্লক নম্বরের সাথে মিলে যাওয়া একটি ব্লকের ট্রানজ্যাকশনের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি ব্যবহার করে দেখুন
</ButtonLink>

**প্যারামিটার**

1. `QUANTITY|TAG` - একটি ব্লক নম্বরের পূর্ণসংখ্যা (integer), অথবা [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এর মতো `"earliest"`, `"latest"`, `"pending"`, `"safe"` বা `"finalized"` স্ট্রিং।

```js
params: [
  "0x13738ca", // 20396234
]
```

**রিটার্ন**

`QUANTITY` - এই ব্লকের ট্রানজ্যাকশন সংখ্যার পূর্ণসংখ্যা (integer)।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

প্রদত্ত ব্লক হ্যাশের সাথে মিলে যাওয়া একটি ব্লক থেকে ব্লকের আঙ্কেলের সংখ্যা রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাশ

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**রিটার্ন**

`QUANTITY` - এই ব্লকে আঙ্কেলের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

প্রদত্ত ব্লক নম্বরের সাথে মিলে যাওয়া একটি ব্লকের আঙ্কেলের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `QUANTITY|TAG` - একটি ব্লক নম্বরের পূর্ণসংখ্যা (integer), অথবা স্ট্রিং `"latest"`, `"earliest"`, `"pending"`, `"safe"` বা `"finalized"`, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: [
  "0xe8", // 232
]
```

**রিটার্ন**

`QUANTITY` - এই ব্লকের আঙ্কেলের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

একটি নির্দিষ্ট ঠিকানায় থাকা কোড রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - ঠিকানা
2. `QUANTITY|TAG` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা স্ট্রিং `"latest"`, `"earliest"`, `"pending"`, `"safe"` বা `"finalized"`, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**রিটার্ন**

`DATA` - প্রদত্ত ঠিকানা থেকে কোড।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

sign মেথডটি `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))` এর মাধ্যমে একটি ইথেরিয়াম-নির্দিষ্ট স্বাক্ষর গণনা করে।

বার্তার সাথে একটি প্রিফিক্স যোগ করার ফলে গণনা করা স্বাক্ষরটি একটি ইথেরিয়াম-নির্দিষ্ট স্বাক্ষর হিসেবে চেনা যায়। এটি এমন অপব্যবহার রোধ করে যেখানে একটি ক্ষতিকারক বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) যেকোনো ডেটায় (যেমন, ট্রানজ্যাকশন) স্বাক্ষর করতে পারে এবং ভুক্তভোগীর ছদ্মবেশ ধারণ করতে স্বাক্ষরটি ব্যবহার করতে পারে।

দ্রষ্টব্য: স্বাক্ষর করার জন্য ব্যবহৃত ঠিকানাটি অবশ্যই আনলক করা থাকতে হবে।

**প্যারামিটার**

1. `DATA`, 20 Bytes - ঠিকানা
2. `DATA`, N Bytes - স্বাক্ষর করার জন্য বার্তা

**রিটার্ন**

`DATA`: স্বাক্ষর

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

একটি ট্রানজ্যাকশন স্বাক্ষর করে যা পরবর্তীতে [eth_sendRawTransaction](#eth-sendrawtransaction) ব্যবহার করে নেটওয়ার্কে জমা দেওয়া যেতে পারে।

**প্যারামিটার**

1. `Object` - ট্রানজ্যাকশন অবজেক্ট

- `type`:
- `from`: `DATA`, 20 বাইট - যে ঠিকানা থেকে ট্রানজ্যাকশনটি পাঠানো হয়েছে।
- `to`: `DATA`, 20 বাইট - (নতুন কন্ট্রাক্ট তৈরির সময় ঐচ্ছিক) যে ঠিকানায় ট্রানজ্যাকশনটি নির্দেশিত হয়েছে।
- `gas`: `QUANTITY` - (ঐচ্ছিক, ডিফল্ট: 90000) ট্রানজ্যাকশন এক্সিকিউশনের জন্য প্রদত্ত গ্যাসের পূর্ণসংখ্যা (Integer)। এটি অব্যবহৃত গ্যাস ফেরত দেবে।
- `gasPrice`: `QUANTITY` - (ঐচ্ছিক, ডিফল্ট: পরে নির্ধারণ করা হবে) প্রতিটি প্রদত্ত গ্যাসের জন্য ব্যবহৃত gasPrice-এর পূর্ণসংখ্যা, Wei-তে।
- `value`: `QUANTITY` - (ঐচ্ছিক) এই ট্রানজ্যাকশনের সাথে পাঠানো ভ্যালুর পূর্ণসংখ্যা, Wei-তে।
- `data`: `DATA` - একটি কন্ট্রাক্টের কম্পাইল করা কোড অথবা ইনভোক করা মেথড স্বাক্ষর এবং এনকোড করা প্যারামিটারগুলোর হ্যাশ।
- `nonce`: `QUANTITY` - (ঐচ্ছিক) একটি নন্সের পূর্ণসংখ্যা। এটি আপনাকে একই নন্স ব্যবহার করা আপনার নিজস্ব পেন্ডিং ট্রানজ্যাকশনগুলোকে ওভাররাইট করার অনুমতি দেয়।

**রিটার্ন**

`DATA`, নির্দিষ্ট অ্যাকাউন্ট দ্বারা স্বাক্ষরিত RLP-এনকোড করা ট্রানজ্যাকশন অবজেক্ট।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// ফলাফল
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

নতুন মেসেজ কল ট্রানজ্যাকশন বা একটি কন্ট্রাক্ট তৈরি করে, যদি ডেটা ফিল্ডে কোড থাকে, এবং `from`-এ নির্দিষ্ট করা অ্যাকাউন্ট ব্যবহার করে এটিতে স্বাক্ষর করে।

**প্যারামিটার**

1. `Object` - ট্রানজ্যাকশন অবজেক্ট

- `from`: `DATA`, 20 বাইট - যে ঠিকানা থেকে ট্রানজ্যাকশনটি পাঠানো হয়েছে।
- `to`: `DATA`, 20 বাইট - (নতুন কন্ট্রাক্ট তৈরির সময় ঐচ্ছিক) যে ঠিকানায় ট্রানজ্যাকশনটি নির্দেশিত হয়েছে।
- `gas`: `QUANTITY` - (ঐচ্ছিক, ডিফল্ট: 90000) ট্রানজ্যাকশন এক্সিকিউশনের জন্য প্রদান করা গ্যাসের পূর্ণসংখ্যা। এটি অব্যবহৃত গ্যাস ফেরত দেবে।
- `gasPrice`: `QUANTITY` - (ঐচ্ছিক, ডিফল্ট: নির্ধারণ-সাপেক্ষ) প্রতিটি পেইড গ্যাসের জন্য ব্যবহৃত গ্যাস প্রাইসের পূর্ণসংখ্যা।
- `value`: `QUANTITY` - (ঐচ্ছিক) এই ট্রানজ্যাকশনের সাথে পাঠানো ভ্যালুর পূর্ণসংখ্যা।
- `input`: `DATA` - একটি কন্ট্রাক্টের কম্পাইল করা কোড অথবা ইনভোক করা মেথড স্বাক্ষর এবং এনকোড করা প্যারামিটারের হ্যাশ।
- `nonce`: `QUANTITY` - (ঐচ্ছিক) একটি নন্সের পূর্ণসংখ্যা। এটি আপনাকে একই নন্স ব্যবহার করা আপনার নিজস্ব পেন্ডিং ট্রানজ্যাকশনগুলোকে ওভাররাইট করার অনুমতি দেয়।

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**রিটার্ন**

`DATA`, 32 বাইট - ট্রানজ্যাকশন হ্যাশ, অথবা ট্রানজ্যাকশনটি এখনও উপলব্ধ না হলে জিরো হ্যাশ।

আপনি যখন একটি কন্ট্রাক্ট তৈরি করেন, তখন ট্রানজ্যাকশনটি একটি ব্লকে প্রস্তাবিত হওয়ার পরে কন্ট্রাক্টের ঠিকানা পেতে [eth_getTransactionReceipt](#eth-gettransactionreceipt) ব্যবহার করুন।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

স্বাক্ষরিত ট্রানজ্যাকশনের জন্য নতুন মেসেজ কল ট্রানজ্যাকশন বা একটি কন্ট্রাক্ট তৈরি করে।

**প্যারামিটার**

1. `DATA`, স্বাক্ষরিত ট্রানজ্যাকশন ডেটা।

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**রিটার্ন**

`DATA`, 32 বাইট - ট্রানজ্যাকশন হ্যাশ, অথবা ট্রানজ্যাকশনটি এখনও উপলব্ধ না হলে জিরো হ্যাশ।

আপনি যখন একটি কন্ট্রাক্ট তৈরি করেন, তখন ট্রানজ্যাকশনটি একটি ব্লকে প্রস্তাবিত হওয়ার পরে কন্ট্রাক্টের ঠিকানা পেতে [eth_getTransactionReceipt](#eth-gettransactionreceipt) ব্যবহার করুন।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

ব্লকচেইনে কোনো ট্রানজ্যাকশন তৈরি না করেই তাৎক্ষণিকভাবে একটি নতুন মেসেজ কল এক্সিকিউট করে। প্রায়শই রিড-অনলি স্মার্ট কন্ট্রাক্ট ফাংশন এক্সিকিউট করার জন্য ব্যবহৃত হয়, উদাহরণস্বরূপ একটি ERC-20 কন্ট্রাক্টের জন্য `balanceOf`।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `Object` - ট্রানজ্যাকশন কল অবজেক্ট

- `from`: `DATA`, 20 বাইট - (ঐচ্ছিক) যে ঠিকানা থেকে ট্রানজ্যাকশন পাঠানো হয়।
- `to`: `DATA`, 20 বাইট - যে ঠিকানায় ট্রানজ্যাকশন নির্দেশিত হয়।
- `gas`: `QUANTITY` - (ঐচ্ছিক) ট্রানজ্যাকশন এক্সিকিউশনের জন্য প্রদত্ত গ্যাসের পূর্ণসংখ্যা (Integer)। eth_call শূন্য গ্যাস ব্যবহার করে, তবে কিছু এক্সিকিউশনের জন্য এই প্যারামিটারটির প্রয়োজন হতে পারে।
- `gasPrice`: `QUANTITY` - (ঐচ্ছিক) প্রতিটি প্রদত্ত গ্যাসের জন্য ব্যবহৃত gasPrice-এর পূর্ণসংখ্যা
- `value`: `QUANTITY` - (ঐচ্ছিক) এই ট্রানজ্যাকশনের সাথে পাঠানো ভ্যালুর পূর্ণসংখ্যা
- `input`: `DATA` - (ঐচ্ছিক) মেথড স্বাক্ষর এবং এনকোড করা প্যারামিটারের হ্যাশ। বিস্তারিত জানতে [Solidity ডকুমেন্টেশনে ইথেরিয়াম কন্ট্রাক্ট ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) দেখুন।

2. `QUANTITY|TAG` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা স্ট্রিং `"latest"`, `"earliest"`, `"pending"`, `"safe"` বা `"finalized"`, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

**রিটার্ন**

`DATA` - এক্সিকিউট করা কন্ট্রাক্টের রিটার্ন ভ্যালু।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

ট্রানজ্যাকশনটি সম্পন্ন করার জন্য কতটুকু গ্যাস প্রয়োজন তার একটি অনুমান তৈরি করে এবং রিটার্ন করে। ট্রানজ্যাকশনটি ব্লকচেইনে যুক্ত করা হবে না। মনে রাখবেন যে EVM মেকানিক্স এবং নোডের পারফরম্যান্স সহ বিভিন্ন কারণে, ট্রানজ্যাকশনে প্রকৃতপক্ষে ব্যবহৃত গ্যাসের পরিমাণের চেয়ে এই অনুমানটি উল্লেখযোগ্যভাবে বেশি হতে পারে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

[eth_call](#eth-call)-এর প্যারামিটারগুলো দেখুন, তবে এর সমস্ত প্রপার্টি ঐচ্ছিক। যদি কোনো গ্যাস লিমিট নির্দিষ্ট করা না থাকে, তবে Geth পেন্ডিং ব্লক থেকে ব্লক গ্যাস লিমিটকে আপার বাউন্ড (সর্বোচ্চ সীমা) হিসেবে ব্যবহার করে। এর ফলে, যখন গ্যাসের পরিমাণ পেন্ডিং ব্লক গ্যাস লিমিটের চেয়ে বেশি হয়, তখন রিটার্ন করা অনুমানটি কল/ট্রানজ্যাকশন এক্সিকিউট করার জন্য যথেষ্ট নাও হতে পারে।

**রিটার্ন**

`QUANTITY` - ব্যবহৃত গ্যাসের পরিমাণ।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

হ্যাশ দ্বারা একটি ব্লক সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাশ।
2. `Boolean` - যদি `true` হয় তবে এটি সম্পূর্ণ ট্রানজ্যাকশন অবজেক্ট প্রদান করে, যদি `false` হয় তবে শুধুমাত্র ট্রানজ্যাকশনের হ্যাশ প্রদান করে।

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**রিটার্ন**

`Object` - একটি ব্লক অবজেক্ট, অথবা কোনো ব্লক পাওয়া না গেলে `null`:

- `number`: `QUANTITY` - ব্লক নম্বর। এটি পেন্ডিং ব্লক হলে `null` হয়।
- `hash`: `DATA`, 32 বাইট - ব্লকের হ্যাশ। এটি পেন্ডিং ব্লক হলে `null` হয়।
- `parentHash`: `DATA`, 32 বাইট - প্যারেন্ট ব্লকের হ্যাশ।
- `nonce`: `DATA`, 8 বাইট - জেনারেট করা প্রুফ-অফ-ওয়ার্ক (PoW)-এর হ্যাশ। এটি পেন্ডিং ব্লক হলে `null` হয়, প্রুফ-অফ-স্টেক (PoS) ব্লকের জন্য (দ্য মার্জ-এর পর থেকে) `0x0` হয়।
- `sha3Uncles`: `DATA`, 32 বাইট - ব্লকের আঙ্কেল ডেটার SHA3।
- `logsBloom`: `DATA`, 256 বাইট - ব্লকের লগ-এর জন্য ব্লুম ফিল্টার। এটি পেন্ডিং ব্লক হলে `null` হয়।
- `transactionsRoot`: `DATA`, 32 বাইট - ব্লকের ট্রানজ্যাকশন ট্রাই-এর রুট।
- `stateRoot`: `DATA`, 32 বাইট - ব্লকের চূড়ান্ত স্টেট ট্রাই-এর রুট।
- `receiptsRoot`: `DATA`, 32 বাইট - ব্লকের রসিদ ট্রাই-এর রুট।
- `miner`: `DATA`, 20 বাইট - সুবিধাভোগীর ঠিকানা যাকে ব্লক পুরস্কার দেওয়া হয়েছিল।
- `difficulty`: `QUANTITY` - এই ব্লকের কাঠিন্য-এর পূর্ণসংখ্যা।
- `totalDifficulty`: `QUANTITY` - এই ব্লক পর্যন্ত চেইন-এর মোট কাঠিন্য-এর পূর্ণসংখ্যা।
- `extraData`: `DATA` - এই ব্লকের "extra data" ফিল্ড।
- `size`: `QUANTITY` - বাইটে এই ব্লকের আকারের পূর্ণসংখ্যা।
- `gasLimit`: `QUANTITY` - এই ব্লকে অনুমোদিত সর্বোচ্চ গ্যাস।
- `gasUsed`: `QUANTITY` - এই ব্লকের সমস্ত ট্রানজ্যাকশন দ্বারা ব্যবহৃত মোট গ্যাস।
- `timestamp`: `QUANTITY` - ব্লকটি কখন সংকলিত হয়েছিল তার ইউনিক্স টাইমস্ট্যাম্প।
- `transactions`: `Array` - ট্রানজ্যাকশন অবজেক্টের অ্যারে, অথবা সর্বশেষ প্রদত্ত প্যারামিটারের উপর নির্ভর করে 32 বাইট ট্রানজ্যাকশন হ্যাশ।
- `uncles`: `Array` - আঙ্কেল হ্যাশের অ্যারে।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// ফলাফল
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth-getblockbynumber}

ব্লক নম্বর অনুযায়ী একটি ব্লক সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি পরীক্ষা করুন
</ButtonLink>

**প্যারামিটার**

1. `QUANTITY|TAG` - একটি ব্লক নম্বরের পূর্ণসংখ্যা, অথবা স্ট্রিং `"earliest"`, `"latest"`, `"pending"`, `"safe"` বা `"finalized"`, যেমনটি [ব্লক প্যারামিটারে](/developers/docs/apis/json-rpc/#block-parameter) রয়েছে।
2. `Boolean` - যদি `true` হয় তবে এটি সম্পূর্ণ ট্রানজ্যাকশন অবজেক্টগুলো প্রদান করে, যদি `false` হয় তবে শুধুমাত্র ট্রানজ্যাকশনগুলোর হ্যাশ প্রদান করে।

```js
params: [
  "0x1b4", // 436
  true,
]
```

**রিটার্ন**
[eth_getBlockByHash](#eth-getblockbyhash) দেখুন

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

ফলাফল দেখতে [eth_getBlockByHash](#eth-getblockbyhash) দেখুন

### eth_getTransactionByHash {#eth-gettransactionbyhash}

ট্রানজ্যাকশন হ্যাশ দ্বারা অনুরোধ করা একটি ট্রানজ্যাকশন সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 Bytes - একটি ট্রানজ্যাকশনের হ্যাশ

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**রিটার্নস**

`Object` - একটি ট্রানজ্যাকশন অবজেক্ট, অথবা কোনো ট্রানজ্যাকশন পাওয়া না গেলে `null`:

- `blockHash`: `DATA`, 32 Bytes - এই ট্রানজ্যাকশনটি যে ব্লকে ছিল তার হ্যাশ। এটি পেন্ডিং থাকলে `null` হয়।
- `blockNumber`: `QUANTITY` - এই ট্রানজ্যাকশনটি যে ব্লকে ছিল তার নম্বর। এটি পেন্ডিং থাকলে `null` হয়।
- `from`: `DATA`, 20 Bytes - প্রেরকের ঠিকানা।
- `gas`: `QUANTITY` - প্রেরকের দ্বারা প্রদত্ত গ্যাস।
- `gasPrice`: `QUANTITY` - প্রেরকের দ্বারা Wei-তে প্রদত্ত গ্যাস প্রাইস।
- `hash`: `DATA`, 32 Bytes - ট্রানজ্যাকশনের হ্যাশ।
- `input`: `DATA` - ট্রানজ্যাকশনের সাথে পাঠানো ডেটা।
- `nonce`: `QUANTITY` - এর আগে প্রেরকের দ্বারা করা ট্রানজ্যাকশনের সংখ্যা।
- `to`: `DATA`, 20 Bytes - প্রাপকের ঠিকানা। এটি একটি কন্ট্রাক্ট তৈরির লেনদেন হলে `null` হয়।
- `transactionIndex`: `QUANTITY` - ব্লকে ট্রানজ্যাকশনের সূচক অবস্থানের পূর্ণসংখ্যা (integer)। এটি পেন্ডিং থাকলে `null` হয়।
- `value`: `QUANTITY` - Wei-তে স্থানান্তরিত মান (value)।
- `v`: `QUANTITY` - ECDSA রিকভারি আইডি
- `r`: `QUANTITY` - ECDSA স্বাক্ষর r
- `s`: `QUANTITY` - ECDSA স্বাক্ষর s

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// ফলাফল
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

ব্লক হ্যাশ এবং ট্রানজ্যাকশন সূচকের অবস্থান অনুযায়ী একটি ট্রানজ্যাকশন সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি ব্যবহার করে দেখুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাশ।
2. `QUANTITY` - ট্রানজ্যাকশন সূচকের অবস্থানের পূর্ণসংখ্যা।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**রিটার্ন**
[eth_getTransactionByHash](#eth-gettransactionbyhash) দেখুন

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ফলাফলের জন্য [eth_getTransactionByHash](#eth-gettransactionbyhash) দেখুন

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

ব্লক নম্বর এবং ট্রানজ্যাকশন সূচক অবস্থান অনুযায়ী একটি ট্রানজ্যাকশন সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `QUANTITY|TAG` - একটি ব্লক নম্বর, অথবা [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এর মতো `"earliest"`, `"latest"`, `"pending"`, `"safe"` বা `"finalized"` স্ট্রিং।
2. `QUANTITY` - ট্রানজ্যাকশন সূচক অবস্থান।

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**রিটার্ন**
[eth_getTransactionByHash](#eth-gettransactionbyhash) দেখুন

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

ফলাফলের জন্য [eth_getTransactionByHash](#eth-gettransactionbyhash) দেখুন

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

ট্রানজ্যাকশন হ্যাশ অনুযায়ী একটি ট্রানজ্যাকশনের রসিদ প্রদান করে।

**দ্রষ্টব্য** অপেক্ষমাণ ট্রানজ্যাকশনের জন্য রসিদ উপলব্ধ থাকে না।

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ট্রানজ্যাকশনের হ্যাশ

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**রিটার্ন**
`Object` - একটি ট্রানজ্যাকশন রসিদ অবজেক্ট, অথবা কোনো রসিদ পাওয়া না গেলে `null`:

- `transactionHash `: `DATA`, 32 বাইট - ট্রানজ্যাকশনের হ্যাশ।
- `transactionIndex`: `QUANTITY` - ব্লকে ট্রানজ্যাকশনের সূচক অবস্থানের পূর্ণসংখ্যা (integer)।
- `blockHash`: `DATA`, 32 বাইট - এই ট্রানজ্যাকশনটি যে ব্লকে ছিল তার হ্যাশ।
- `blockNumber`: `QUANTITY` - এই ট্রানজ্যাকশনটি যে ব্লকে ছিল তার নম্বর।
- `from`: `DATA`, 20 বাইট - প্রেরকের ঠিকানা।
- `to`: `DATA`, 20 বাইট - প্রাপকের ঠিকানা। এটি একটি কন্ট্রাক্ট তৈরির লেনদেন হলে null হয়।
- `cumulativeGasUsed` : `QUANTITY ` - ব্লকে এই ট্রানজ্যাকশনটি এক্সিকিউট করার সময় ব্যবহৃত মোট গ্যাসের পরিমাণ।
- `effectiveGasPrice` : `QUANTITY` - প্রতি ইউনিট গ্যাসের জন্য প্রদত্ত ভিত্তি ফি এবং টিপ-এর যোগফল।
- `gasUsed `: `QUANTITY ` - শুধুমাত্র এই নির্দিষ্ট ট্রানজ্যাকশন দ্বারা ব্যবহৃত গ্যাসের পরিমাণ।
- `contractAddress `: `DATA`, 20 বাইট - ট্রানজ্যাকশনটি কন্ট্রাক্ট তৈরির লেনদেন হলে তৈরি করা কন্ট্রাক্ট ঠিকানা, অন্যথায় `null`।
- `logs`: `Array` - এই ট্রানজ্যাকশন দ্বারা তৈরি করা লগ অবজেক্টের অ্যারে।
- `logsBloom`: `DATA`, 256 বাইট - লাইট ক্লায়েন্টদের দ্রুত সম্পর্কিত লগগুলো পুনরুদ্ধার করার জন্য ব্লুম ফিল্টার (Bloom filter)।
- `type`: `QUANTITY` - ট্রানজ্যাকশন ধরনের পূর্ণসংখ্যা (integer), লেগাসি ট্রানজ্যাকশনের জন্য `0x0`, অ্যাক্সেস লিস্ট ধরনের জন্য `0x1`, ডায়নামিক ফি-এর জন্য `0x2`।

এটি নিচের _যেকোনো একটিও_ প্রদান করে:

- `root` : `DATA` ট্রানজ্যাকশন-পরবর্তী স্টেট রুটের 32 বাইট (বাইজান্টিয়াম-এর পূর্বে)
- `status`: `QUANTITY` হয় `1` (সফল) অথবা `0` (ব্যর্থ)

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// ফলাফল
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // যদি এটি তৈরি করা হয় তবে ঠিকানার স্ট্রিং
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs ইত্যাদি দ্বারা প্রত্যাবর্তিত লগ
    }],
    "logsBloom": "0x00...0", // 256 বাইট ব্লুম ফিল্টার
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

হ্যাশ এবং আঙ্কেল সূচকের অবস্থান দ্বারা একটি ব্লকের আঙ্কেল সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাশ।
2. `QUANTITY` - আঙ্কেলের সূচকের অবস্থান।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**রিটার্ন**
[eth_getBlockByHash](#eth-getblockbyhash) দেখুন

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ফলাফলের জন্য [eth_getBlockByHash](#eth-getblockbyhash) দেখুন

**দ্রষ্টব্য**: একটি আঙ্কেলের মধ্যে পৃথক ট্রানজ্যাকশন থাকে না।

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

নম্বর এবং আঙ্কেল সূচক অবস্থান অনুযায়ী একটি ব্লকের আঙ্কেল সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্টটি চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `QUANTITY|TAG` - একটি ব্লক নম্বর, অথবা [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এর মতো `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"` স্ট্রিং।
2. `QUANTITY` - আঙ্কেলের সূচক অবস্থান।

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**রিটার্নস**
[eth_getBlockByHash](#eth-getblockbyhash) দেখুন

**নোট**: একটি আঙ্কেলের মধ্যে আলাদা কোনো ট্রানজ্যাকশন থাকে না।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

ফলাফলের জন্য [eth_getBlockByHash](#eth-getblockbyhash) দেখুন

### eth_newFilter {#eth-newfilter}

ফিল্টার অপশনের উপর ভিত্তি করে একটি ফিল্টার অবজেক্ট তৈরি করে, যা স্টেট পরিবর্তন (লগ) হলে নোটিফাই করে।
স্টেট পরিবর্তন হয়েছে কিনা তা চেক করতে, [eth_getFilterChanges](#eth-getfilterchanges) কল করুন।

**টপিক ফিল্টার নির্দিষ্ট করার বিষয়ে একটি নোট:**
টপিকগুলো ক্রমানুসারে নির্ভরশীল। [A, B] টপিকসহ একটি লগ থাকা ট্রানজ্যাকশন নিচের টপিক ফিল্টারগুলোর সাথে মিলে যাবে:

- `[]` "যেকোনো কিছু"
- `[A]` "প্রথম অবস্থানে A (এবং এরপর যেকোনো কিছু)"
- `[null, B]` "প্রথম অবস্থানে যেকোনো কিছু এবং দ্বিতীয় অবস্থানে B (এবং এরপর যেকোনো কিছু)"
- `[A, B]` "প্রথম অবস্থানে A এবং দ্বিতীয় অবস্থানে B (এবং এরপর যেকোনো কিছু)"
- `[[A, B], [A, B]]` "প্রথম অবস্থানে (A অথবা B) এবং দ্বিতীয় অবস্থানে (A অথবা B) (এবং এরপর যেকোনো কিছু)"
- **প্যারামিটার**

1. `Object` - ফিল্টার অপশনগুলো:

- `fromBlock`: `QUANTITY|TAG` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) ইন্টিজার ব্লক নম্বর, অথবা সর্বশেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্তকৃত ব্লকের জন্য `"finalized"`, অথবা এখনও কোনো ব্লকে অন্তর্ভুক্ত হয়নি এমন ট্রানজ্যাকশনের জন্য `"pending"`, `"earliest"`।
- `toBlock`: `QUANTITY|TAG` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) ইন্টিজার ব্লক নম্বর, অথবা সর্বশেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্তকৃত ব্লকের জন্য `"finalized"`, অথবা এখনও কোনো ব্লকে অন্তর্ভুক্ত হয়নি এমন ট্রানজ্যাকশনের জন্য `"pending"`, `"earliest"`।
- `address`: `DATA|Array`, 20 বাইট - (ঐচ্ছিক) কন্ট্রাক্ট ঠিকানা বা ঠিকানাগুলোর একটি তালিকা যেখান থেকে লগগুলো উৎপন্ন হওয়া উচিত।
- `topics`: `Array of DATA`, - (ঐচ্ছিক) 32 বাইট `DATA` টপিকের অ্যারে। টপিকগুলো ক্রমানুসারে নির্ভরশীল। প্রতিটি টপিক "or" অপশনসহ DATA-এর একটি অ্যারেও হতে পারে।

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**রিটার্নস**
`QUANTITY` - একটি ফিল্টার আইডি।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

নতুন ব্লক আসার বিষয়ে জানানোর জন্য নোডে একটি ফিল্টার তৈরি করে।
স্টেট পরিবর্তিত হয়েছে কিনা তা পরীক্ষা করতে, [eth_getFilterChanges](#eth-getfilterchanges) কল করুন।

**প্যারামিটার**
নেই

**রিটার্ন**
`QUANTITY` - একটি ফিল্টার আইডি।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// ফলাফল
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

নতুন পেন্ডিং ট্রানজ্যাকশন আসার বিষয়ে নোটিফাই করতে নোডে একটি ফিল্টার তৈরি করে।
স্টেট পরিবর্তন হয়েছে কিনা তা চেক করতে, [eth_getFilterChanges](#eth-getfilterchanges) কল করুন।

**প্যারামিটার**
নেই

**রিটার্ন**
`QUANTITY` - একটি ফিল্টার আইডি।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// ফলাফল
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

প্রদত্ত আইডি সহ একটি ফিল্টার আনইনস্টল করে। যখন আর নজর রাখার (watch) প্রয়োজন নেই, তখন এটি সর্বদা কল করা উচিত।
এছাড়াও, যখন একটি নির্দিষ্ট সময় ধরে [eth_getFilterChanges](#eth-getfilterchanges)-এর মাধ্যমে ফিল্টারগুলোর জন্য অনুরোধ করা হয় না, তখন সেগুলোর সময়সীমা শেষ (timeout) হয়ে যায়।

**প্যারামিটার**

1. `QUANTITY` - ফিল্টার আইডি।

```js
params: [
  "0xb", // 11
]
```

**রিটার্ন**
`Boolean` - ফিল্টারটি সফলভাবে আনইনস্টল করা হলে `true`, অন্যথায় `false`।

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// ফলাফল
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

একটি ফিল্টারের জন্য পোলিং পদ্ধতি, যা শেষ পোলের পর থেকে ঘটা লগগুলোর একটি অ্যারে প্রদান করে।

**প্যারামিটার**

1. `QUANTITY` - ফিল্টার আইডি।

```js
params: [
  "0x16", // 22
]
```

**রিটার্ন**
`Array` - লগ অবজেক্টের অ্যারে, অথবা শেষ পোলের পর থেকে কোনো পরিবর্তন না হলে একটি ফাঁকা অ্যারে।

- `eth_newBlockFilter` দিয়ে তৈরি ফিল্টারগুলোর জন্য রিটার্ন হলো ব্লক হ্যাশ (`DATA`, 32 Bytes), যেমন, `["0x3454645634534..."]`।
- `eth_newPendingTransactionFilter ` দিয়ে তৈরি ফিল্টারগুলোর জন্য রিটার্ন হলো ট্রানজ্যাকশন হ্যাশ (`DATA`, 32 Bytes), যেমন, `["0x6345343454645..."]`।
- `eth_newFilter` দিয়ে তৈরি ফিল্টারগুলোর জন্য লগগুলো হলো নিচের প্যারামিটারযুক্ত অবজেক্ট:
  - `removed`: `TAG` - চেইন রি-অর্গ এর কারণে লগটি মুছে ফেলা হলে `true` হয়। এটি একটি বৈধ লগ হলে `false` হয়।
  - `logIndex`: `QUANTITY` - ব্লকে লগ সূচক অবস্থানের পূর্ণসংখ্যা। এটি পেন্ডিং লগ হলে `null` হয়।
  - `transactionIndex`: `QUANTITY` - যে ট্রানজ্যাকশন সূচক অবস্থান থেকে লগটি তৈরি করা হয়েছিল তার পূর্ণসংখ্যা। এটি পেন্ডিং লগ হলে `null` হয়।
  - `transactionHash`: `DATA`, 32 Bytes - যে ট্রানজ্যাকশন থেকে এই লগটি তৈরি করা হয়েছিল তার হ্যাশ। এটি পেন্ডিং লগ হলে `null` হয়।
  - `blockHash`: `DATA`, 32 Bytes - এই লগটি যে ব্লকে ছিল তার হ্যাশ। এটি পেন্ডিং থাকলে `null` হয়। এটি পেন্ডিং লগ হলে `null` হয়।
  - `blockNumber`: `QUANTITY` - এই লগটি যে ব্লকে ছিল তার ব্লক নম্বর। এটি পেন্ডিং থাকলে `null` হয়। এটি পেন্ডিং লগ হলে `null` হয়।
  - `address`: `DATA`, 20 Bytes - যে ঠিকানা থেকে এই লগটির উৎপত্তি হয়েছে।
  - `data`: `DATA` - পরিবর্তনশীল-দৈর্ঘ্যের নন-ইনডেক্সড লগ ডেটা। (_solidity_-তে: শূন্য বা ততোধিক 32 Bytes নন-ইনডেক্সড লগ আর্গুমেন্ট।)
  - `topics`: `Array of DATA` - ইনডেক্সড লগ আর্গুমেন্টের 0 থেকে 4টি 32 Bytes `DATA` এর অ্যারে। (_solidity_-তে: প্রথম টপিকটি হলো ইভেন্টের স্বাক্ষরের _হ্যাশ_ (যেমন, `Deposit(address,bytes32,uint256)`), যদি না আপনি `anonymous` স্পেসিফায়ার দিয়ে ইভেন্টটি ঘোষণা করে থাকেন।)

- **উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// ফলাফল
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth-getfilterlogs}

প্রদত্ত আইডির ফিল্টারের সাথে মিলে যাওয়া সব লগের একটি অ্যারে রিটার্ন করে।

**প্যারামিটার**

1. `QUANTITY` - ফিল্টার আইডি।

```js
params: [
  "0x16", // 22
]
```

**রিটার্ন**
[eth_getFilterChanges](#eth-getfilterchanges) দেখুন

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

ফলাফলের জন্য [eth_getFilterChanges](#eth-getfilterchanges) দেখুন

### eth_getLogs {#eth-getlogs}

একটি প্রদত্ত ফিল্টার অবজেক্টের সাথে মিলে যাওয়া সমস্ত লগের একটি অ্যারে প্রদান করে।

**প্যারামিটার**

1. `Object` - ফিল্টার অপশন:

- `fromBlock`: `QUANTITY|TAG` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) পূর্ণসংখ্যা ব্লক নম্বর, অথবা সর্বশেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্তকৃত ব্লকের জন্য `"finalized"`, অথবা এখনও কোনো ব্লকে অন্তর্ভুক্ত হয়নি এমন ট্রানজ্যাকশনের জন্য `"pending"`, `"earliest"`।
- `toBlock`: `QUANTITY|TAG` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) পূর্ণসংখ্যা ব্লক নম্বর, অথবা সর্বশেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্তকৃত ব্লকের জন্য `"finalized"`, অথবা এখনও কোনো ব্লকে অন্তর্ভুক্ত হয়নি এমন ট্রানজ্যাকশনের জন্য `"pending"`, `"earliest"`।
- `address`: `DATA|Array`, 20 Bytes - (ঐচ্ছিক) কন্ট্রাক্ট ঠিকানা বা ঠিকানাগুলোর একটি তালিকা যেখান থেকে লগগুলো তৈরি হওয়া উচিত।
- `topics`: `Array of DATA`, - (ঐচ্ছিক) 32 Bytes `DATA` টপিকের অ্যারে। টপিকগুলো ক্রমানুসারে নির্ভরশীল। প্রতিটি টপিক "or" অপশনসহ DATA-এর একটি অ্যারেও হতে পারে।
- `blockHash`: `DATA`, 32 Bytes - (ঐচ্ছিক, **ভবিষ্যৎ**) EIP-234 যুক্ত হওয়ার সাথে সাথে, `blockHash` একটি নতুন ফিল্টার অপশন হবে যা প্রদানকৃত লগগুলোকে 32-byte হ্যাশ `blockHash` সহ একটি একক ব্লকে সীমাবদ্ধ করে। `blockHash` ব্যবহার করা `fromBlock` = `toBlock` = হ্যাশ `blockHash` সহ ব্লক নম্বরের সমতুল্য। যদি ফিল্টার মানদণ্ডে `blockHash` উপস্থিত থাকে, তবে `fromBlock` বা `toBlock` কোনোটিরই অনুমতি নেই।

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**রিটার্ন**
[eth_getFilterChanges](#eth-getfilterchanges) দেখুন

**উদাহরণ**

```js
// অনুরোধ
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

ফলাফলের জন্য [eth_getFilterChanges](#eth-getfilterchanges) দেখুন

## ব্যবহারের উদাহরণ {#usage-example}

### জেসন-আরপিসি ব্যবহার করে একটি কন্ট্রাক্ট ডিপ্লয় করা {#deploying-contract}

এই বিভাগে শুধুমাত্র RPC ইন্টারফেস ব্যবহার করে কীভাবে একটি কন্ট্রাক্ট ডিপ্লয় করতে হয় তার একটি প্রদর্শন অন্তর্ভুক্ত রয়েছে। কন্ট্রাক্ট ডিপ্লয় করার বিকল্প উপায় রয়েছে যেখানে এই জটিলতাগুলো আড়াল করা থাকে—উদাহরণস্বরূপ, RPC ইন্টারফেসের উপর তৈরি লাইব্রেরি ব্যবহার করে যেমন [web3.js](https://web3js.readthedocs.io/) এবং [web3.py](https://github.com/ethereum/web3.py)। এই অ্যাবস্ট্রাকশনগুলো সাধারণত বোঝা সহজ এবং এতে ভুলের সম্ভাবনা কম থাকে, তবে এর ভেতরে কীভাবে কাজ হচ্ছে (under the hood) তা বোঝা এখনও সহায়ক।

নিচে `Multiply7` নামের একটি সাধারণ স্মার্ট কন্ট্রাক্ট দেওয়া হলো যা জেসন-আরপিসি ইন্টারফেস ব্যবহার করে একটি ইথেরিয়াম নোডে ডিপ্লয় করা হবে। এই টিউটোরিয়ালটি ধরে নিচ্ছে যে পাঠক ইতিমধ্যে একটি Geth নোড চালাচ্ছেন। নোড এবং ক্লায়েন্ট সম্পর্কে আরও তথ্য [এখানে](/developers/docs/nodes-and-clients/run-a-node) পাওয়া যাবে। নন-Geth ক্লায়েন্টগুলোর জন্য কীভাবে HTTP জেসন-আরপিসি চালু করতে হয় তা দেখতে অনুগ্রহ করে নির্দিষ্ট [ক্লায়েন্ট](/developers/docs/nodes-and-clients/) ডকুমেন্টেশন দেখুন। বেশিরভাগ ক্লায়েন্ট ডিফল্টভাবে `localhost:8545`-এ সার্ভ করে।

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

প্রথমেই নিশ্চিত করতে হবে যে HTTP RPC ইন্টারফেসটি চালু আছে। এর মানে হলো আমরা স্টার্টআপের সময় Geth-কে `--http` ফ্ল্যাগ প্রদান করি। এই উদাহরণে আমরা একটি প্রাইভেট ডেভেলপমেন্ট চেইনে Geth নোড ব্যবহার করি। এই পদ্ধতি ব্যবহার করলে আসল নেটওয়ার্কে আমাদের ইথারের প্রয়োজন নেই।

```bash
geth --http --dev console 2>>geth.log
```

এটি `http://localhost:8545`-এ HTTP RPC ইন্টারফেস চালু করবে।

আমরা [curl](https://curl.se) ব্যবহার করে কয়েনবেস ঠিকানা (অ্যাকাউন্টের অ্যারে থেকে প্রথম ঠিকানাটি পেয়ে) এবং ব্যালেন্স পুনরুদ্ধার করে ইন্টারফেসটি চলছে কিনা তা যাচাই করতে পারি। অনুগ্রহ করে মনে রাখবেন যে এই উদাহরণগুলোর ডেটা আপনার লোকাল নোডে ভিন্ন হবে। আপনি যদি এই কমান্ডগুলো চেষ্টা করতে চান, তবে দ্বিতীয় curl রিকোয়েস্টের রিকোয়েস্ট প্যারামিটারগুলো প্রথমটি থেকে প্রাপ্ত ফলাফল দিয়ে প্রতিস্থাপন করুন।

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

যেহেতু সংখ্যাগুলো হেক্স এনকোড করা, তাই ব্যালেন্সটি Wei-তে একটি হেক্স স্ট্রিং হিসেবে ফেরত দেওয়া হয়। আমরা যদি ব্যালেন্সটি ইথারে একটি সংখ্যা হিসেবে পেতে চাই তবে আমরা Geth কনসোল থেকে web3 ব্যবহার করতে পারি।

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

যেহেতু এখন আমাদের প্রাইভেট ডেভেলপমেন্ট চেইনে কিছু ইথার আছে, আমরা কন্ট্রাক্টটি ডিপ্লয় করতে পারি। প্রথম ধাপ হলো Multiply7 কন্ট্রাক্টটিকে বাইটকোডে কম্পাইল করা যা EVM-এ পাঠানো যেতে পারে। Solidity কম্পাইলার solc ইনস্টল করতে, [Solidity ডকুমেন্টেশন](https://docs.soliditylang.org/en/latest/installing-solidity.html) অনুসরণ করুন। (আপনি হয়তো [আমাদের উদাহরণের জন্য ব্যবহৃত কম্পাইলারের সংস্করণের](https://github.com/ethereum/solidity/releases/tag/v0.4.20) সাথে মেলাতে একটি পুরোনো `solc` রিলিজ ব্যবহার করতে চাইতে পারেন।)

পরবর্তী ধাপ হলো Multiply7 কন্ট্রাক্টটিকে বাইটকোডে কম্পাইল করা যা EVM-এ পাঠানো যেতে পারে।

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

যেহেতু এখন আমাদের কাছে কম্পাইল করা কোড আছে, আমাদের নির্ধারণ করতে হবে এটি ডিপ্লয় করতে কত গ্যাস খরচ হবে। RPC ইন্টারফেসে একটি `eth_estimateGas` মেথড রয়েছে যা আমাদের একটি অনুমান দেবে।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

এবং সবশেষে কন্ট্রাক্টটি ডিপ্লয় করুন।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

ট্রানজ্যাকশনটি নোড দ্বারা গৃহীত হয় এবং একটি ট্রানজ্যাকশন হ্যাশ ফেরত দেওয়া হয়। এই হ্যাশটি ট্রানজ্যাকশন ট্র্যাক করতে ব্যবহার করা যেতে পারে। পরবর্তী ধাপ হলো আমাদের কন্ট্রাক্টটি যে ঠিকানায় ডিপ্লয় করা হয়েছে তা নির্ধারণ করা। প্রতিটি সম্পাদিত ট্রানজ্যাকশন একটি রসিদ তৈরি করবে। এই রসিদে ট্রানজ্যাকশন সম্পর্কে বিভিন্ন তথ্য থাকে যেমন ট্রানজ্যাকশনটি কোন ব্লকে অন্তর্ভুক্ত ছিল এবং EVM দ্বারা কত গ্যাস ব্যবহার করা হয়েছিল। যদি কোনো ট্রানজ্যাকশন একটি কন্ট্রাক্ট তৈরি করে তবে এতে কন্ট্রাক্টের ঠিকানাও থাকবে। আমরা `eth_getTransactionReceipt` RPC মেথড দিয়ে রসিদটি পুনরুদ্ধার করতে পারি।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

আমাদের কন্ট্রাক্টটি `0x4d03d617d700cf81935d7f797f4e2ae719648262`-এ তৈরি করা হয়েছিল। রসিদের পরিবর্তে একটি নাল (null) ফলাফল মানে হলো ট্রানজ্যাকশনটি এখনও কোনো ব্লকে অন্তর্ভুক্ত হয়নি। কিছুক্ষণ অপেক্ষা করুন এবং আপনার কনসেনসাস ক্লায়েন্ট চলছে কিনা তা পরীক্ষা করে আবার চেষ্টা করুন।

#### স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা {#interacting-with-smart-contract}

এই উদাহরণে আমরা কন্ট্রাক্টের `multiply` মেথডে `eth_sendTransaction` ব্যবহার করে একটি ট্রানজ্যাকশন পাঠাব।

`eth_sendTransaction`-এর জন্য বেশ কয়েকটি আর্গুমেন্ট প্রয়োজন, বিশেষ করে `from`, `to` এবং `data`। `From` হলো আমাদের অ্যাকাউন্টের পাবলিক ঠিকানা, এবং `to` হলো কন্ট্রাক্টের ঠিকানা। `data` আর্গুমেন্টে একটি পেলোড থাকে যা নির্ধারণ করে কোন মেথডটি কল করতে হবে এবং কোন আর্গুমেন্টগুলোর সাথে। এখানেই [ABI (অ্যাপ্লিকেশন বাইনারি ইন্টারফেস)](https://docs.soliditylang.org/en/latest/abi-spec.html) কাজে আসে। ABI হলো একটি JSON ফাইল যা EVM-এর জন্য ডেটা কীভাবে সংজ্ঞায়িত এবং এনকোড করতে হয় তা নির্ধারণ করে।

পেলোডের বাইটগুলো নির্ধারণ করে কন্ট্রাক্টের কোন মেথডটি কল করা হয়েছে। এটি ফাংশনের নাম এবং এর আর্গুমেন্টের ধরনগুলোর ওপর কেক্যাক (Keccak) হ্যাশ থেকে প্রথম 4 বাইট, যা হেক্স এনকোড করা। মাল্টিপ্লাই (multiply) ফাংশনটি একটি uint গ্রহণ করে যা uint256-এর একটি উপনাম (alias)। এর ফলে আমরা পাই:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

পরবর্তী ধাপ হলো আর্গুমেন্টগুলো এনকোড করা। এখানে শুধুমাত্র একটি uint256 আছে, ধরা যাক, মানটি হলো 6। ABI-তে একটি বিভাগ রয়েছে যা নির্দিষ্ট করে কীভাবে uint256 ধরনগুলো এনকোড করতে হয়।

`int<M>: enc(X)` হলো X-এর বিগ-এন্ডিয়ান টুজ কমপ্লিমেন্ট (two’s complement) এনকোডিং, যা নেতিবাচক X-এর জন্য উচ্চ-ক্রম (বাম) দিকে 0xff দিয়ে এবং ইতিবাচক X-এর জন্য শূন্য > বাইট দিয়ে প্যাড করা হয় যাতে দৈর্ঘ্যটি 32 বাইটের গুণিতক হয়।

এটি `0000000000000000000000000000000000000000000000000000000000000006`-এ এনকোড হয়।

ফাংশন সিলেক্টর এবং এনকোড করা আর্গুমেন্ট একত্রিত করলে আমাদের ডেটা হবে `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`।

এটি এখন নোডে পাঠানো যেতে পারে:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

যেহেতু একটি ট্রানজ্যাকশন পাঠানো হয়েছিল, তাই একটি ট্রানজ্যাকশন হ্যাশ ফেরত দেওয়া হয়েছে। রসিদটি পুনরুদ্ধার করলে পাওয়া যায়:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

রসিদটিতে একটি লগ রয়েছে। এই লগটি ট্রানজ্যাকশন সম্পাদনের সময় EVM দ্বারা তৈরি করা হয়েছিল এবং রসিদে অন্তর্ভুক্ত করা হয়েছিল। `multiply` ফাংশনটি দেখায় যে ইনপুটের 7 গুণের সাথে `Print` ইভেন্টটি রেইজ (raise) করা হয়েছিল। যেহেতু `Print` ইভেন্টের আর্গুমেন্টটি একটি uint256 ছিল, তাই আমরা এটিকে ABI নিয়ম অনুযায়ী ডিকোড করতে পারি যা আমাদের প্রত্যাশিত ডেসিমাল 42 দেবে। ডেটা ছাড়াও এটি লক্ষণীয় যে টপিকগুলো ব্যবহার করে নির্ধারণ করা যেতে পারে কোন ইভেন্টটি লগ তৈরি করেছে:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

এটি ছিল সবচেয়ে সাধারণ কিছু কাজের একটি সংক্ষিপ্ত পরিচিতি, যা জেসন-আরপিসি-এর সরাসরি ব্যবহার প্রদর্শন করে।

## সম্পর্কিত বিষয়বস্তু {#related-topics}

- [জেসন-আরপিসি স্পেসিফিকেশন](https://www.jsonrpc.org/specification)
- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [ব্যাকএন্ড API](/developers/docs/apis/backend/)
- [এক্সিকিউশন ক্লায়েন্ট](/developers/docs/nodes-and-clients/#execution-clients)
