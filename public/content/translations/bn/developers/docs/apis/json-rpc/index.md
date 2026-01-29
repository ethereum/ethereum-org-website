---
title: JSON-RPC API
description: Ethereum ক্লায়েন্টের জন্য একটি স্টেটলেস, লাইট-ওয়েট রিমোট প্রসিডিউর কল (RPC) প্রোটোকল।
lang: bn
---

Ethereum ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি সফ্টওয়্যার অ্যাপ্লিকেশনের জন্য - হয় ব্লকচেইন ডেটা পড়ে বা নেটওয়ার্কে লেনদেন পাঠানোর মাধ্যমে - এটি অবশ্যই একটি Ethereum নোডের সাথে সংযুক্ত থাকতে হবে।

এই উদ্দেশ্যে, প্রতিটি [Ethereum ক্লায়েন্ট](/developers/docs/nodes-and-clients/#execution-clients) একটি [JSON-RPC স্পেসিফিকেশন](https://github.com/ethereum/execution-apis) প্রয়োগ করে, তাই পদ্ধতিগুলির একটি ইউনিফর্ম সেট রয়েছে যার উপর অ্যাপ্লিকেশনগুলি নির্দিষ্ট নোড বা ক্লায়েন্ট বাস্তবায়ন নির্বিশেষে নির্ভর করতে পারে।

[JSON-RPC](https://www.jsonrpc.org/specification) একটি স্টেটলেস, লাইট-ওয়েট রিমোট প্রসিডিউর কল (RPC) প্রোটোকল। এটি বেশ কিছু ডেটা স্ট্রাকচার এবং তাদের প্রক্রিয়াকরণের নিয়মাবলী নির্ধারণ করে। এটি ট্রান্সপোর্ট অ্যাগনস্টিক কারণ এই ধারণাগুলি একই প্রক্রিয়ার মধ্যে, সকেটের উপর, HTTP-র উপর বা বিভিন্ন মেসেজ পাসিং পরিবেশে ব্যবহার করা যেতে পারে। এটি ডেটা ফরম্যাট হিসেবে JSON (RFC 4627) ব্যবহার করে।

## ক্লায়েন্ট ইমপ্লিমেন্টেশন {#client-implementations}

JSON-RPC স্পেসিফিকেশন প্রয়োগ করার সময় Ethereum ক্লায়েন্টরা প্রত্যেকে বিভিন্ন প্রোগ্রামিং ভাষা ব্যবহার করতে পারে। নির্দিষ্ট প্রোগ্রামিং ভাষা সম্পর্কিত আরও বিশদ বিবরণের জন্য পৃথক [ক্লায়েন্ট ডকুমেন্টেশন](/developers/docs/nodes-and-clients/#execution-clients) দেখুন। সর্বশেষ API সহায়তা তথ্যের জন্য আমরা প্রতিটি ক্লায়েন্টের ডকুমেন্টেশন পরীক্ষা করার পরামর্শ দিই।

## সুবিধাজনক লাইব্রেরি {#convenience-libraries}

যদিও আপনি JSON-RPC API-এর মাধ্যমে সরাসরি Ethereum ক্লায়েন্টদের সাথে ইন্টারঅ্যাক্ট করা বেছে নিতে পারেন, তবে dapp ডেভেলপারদের জন্য প্রায়শই সহজ বিকল্প রয়েছে। JSON-RPC API-এর উপরে র‍্যাপার সরবরাহ করার জন্য অনেক [জাভাস্ক্রিপ্ট](/developers/docs/apis/javascript/#available-libraries) এবং [ব্যাকএন্ড API](/developers/docs/apis/backend/#available-libraries) লাইব্রেরি বিদ্যমান। এই লাইব্রেরিগুলির সাহায্যে, ডেভেলপাররা Ethereum-এর সাথে ইন্টারঅ্যাক্ট করে এমন JSON-RPC অনুরোধগুলি (হুডের নীচে) শুরু করার জন্য তাদের পছন্দের প্রোগ্রামিং ভাষায় স্বজ্ঞাত, এক-লাইনের পদ্ধতি লিখতে পারে।

## কনসেন্সাস ক্লায়েন্ট APIs {#consensus-clients}

এই পৃষ্ঠাটি মূলত Ethereum এক্সিকিউশন ক্লায়েন্টদের দ্বারা ব্যবহৃত JSON-RPC API নিয়ে কাজ করে। যাইহোক, কনসেন্সাস ক্লায়েন্টদের একটি RPC APIও রয়েছে যা ব্যবহারকারীদের নোড সম্পর্কে তথ্য জিজ্ঞাসা করতে, বিকন ব্লক, বিকন স্টেট এবং অন্যান্য কনসেন্সাস-সম্পর্কিত তথ্য সরাসরি একটি নোড থেকে অনুরোধ করতে দেয়। এই APIটি [বিকন API ওয়েবপেজে](https://ethereum.github.io/beacon-APIs/#/) নথিভুক্ত করা আছে।

একটি অভ্যন্তরীণ API একটি নোডের মধ্যে ইন্টার-ক্লায়েন্ট যোগাযোগের জন্যও ব্যবহৃত হয় - অর্থাৎ, এটি কনসেন্সাস ক্লায়েন্ট এবং এক্সিকিউশন ক্লায়েন্টকে ডেটা সোয়াপ করতে সক্ষম করে। এটিকে 'ইঞ্জিন API' বলা হয় এবং স্পেসগুলি [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)-এ উপলব্ধ।

## এক্সিকিউশন ক্লায়েন্ট স্পেক {#spec}

[GitHub-এ সম্পূর্ণ JSON-RPC API স্পেক পড়ুন](https://github.com/ethereum/execution-apis)। এই API টি [এক্সিকিউশন API ওয়েবপেজ](https://ethereum.github.io/execution-apis/)-এ নথিভুক্ত এবং সমস্ত উপলব্ধ পদ্ধতি চেষ্টা করার জন্য একটি ইন্সপেক্টর অন্তর্ভুক্ত করে।

## কনভেনশন {#conventions}

### হেক্স ভ্যালু এনকোডিং {#hex-encoding}

দুটি মূল ডেটা টাইপ JSON-এর মাধ্যমে পাস করা হয়: আনফরম্যাটেড বাইট অ্যারে এবং পরিমাণ। উভয়ই একটি হেক্স এনকোডিংয়ের সাথে পাস করা হয় তবে ফর্ম্যাটিংয়ের জন্য বিভিন্ন প্রয়োজনীয়তা সহ।

#### পরিমাণ {#quantities-encoding}

পরিমাণ (পূর্ণসংখ্যা, সংখ্যা) এনকোড করার সময়: হেক্স হিসাবে এনকোড করুন, "0x" এর সাথে প্রিফিক্স করুন, সবচেয়ে কমপ্যাক্ট উপস্থাপনা (সামান্য ব্যতিক্রম: শূন্যকে "0x0" হিসাবে উপস্থাপন করা উচিত)।

এখানে কয়েকটি উদাহরণ দেওয়া হল:

- 0x41 (দশমিকে 65)
- 0x400 (দশমিকে 1024)
- ভুল: 0x (সর্বদা কমপক্ষে একটি সংখ্যা থাকা উচিত - শূন্য হল "0x0")
- ভুল: 0x0400 (লিডিং জিরোর অনুমতি নেই)
- ভুল: ff (0x প্রিফিক্সড হতে হবে)

### আনফরম্যাটেড ডেটা {#unformatted-data-encoding}

আনফরম্যাটেড ডেটা (বাইট অ্যারে, অ্যাকাউন্ট অ্যাড্রেস, হ্যাস, বাইটকোড অ্যারে) এনকোড করার সময়: হেক্স হিসাবে এনকোড করুন, "0x" দিয়ে প্রিফিক্স করুন, প্রতি বাইটে দুটি হেক্স ডিজিট।

এখানে কয়েকটি উদাহরণ দেওয়া হল:

- 0x41 (সাইজ 1, "A")
- 0x004200 (সাইজ 3, "0B0")
- 0x (সাইজ 0, "")
- ভুল: 0xf0f0f (অবশ্যই জোড় সংখ্যক অঙ্ক হতে হবে)
- ভুল: 004200 (0x প্রিফিক্স করা আবশ্যক)

### ব্লক প্যারামিটার {#block-parameter}

নিম্নলিখিত পদ্ধতিগুলিতে একটি ব্লক প্যারামিটার রয়েছে:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Ethereum-এর অবস্থা জিজ্ঞাসা করার জন্য অনুরোধ করা হলে, প্রদত্ত ব্লক প্যারামিটারটি ব্লকের উচ্চতা নির্ধারণ করে।

ব্লক প্যারামিটারের জন্য নিম্নলিখিত বিকল্পগুলি সম্ভব:

- `HEX স্ট্রিং` - একটি পূর্ণসংখ্যার ব্লক নম্বর
- সবচেয়ে প্রথম/জেনেসিস ব্লকের জন্য `স্ট্রিং "আর্লিয়েস্ট"`
- `স্ট্রিং "লেটেস্ট"` - সর্বশেষ প্রস্তাবিত ব্লকের জন্য
- `স্ট্রিং "সেফ"` - সর্বশেষ নিরাপদ হেড ব্লকের জন্য
- `স্ট্রিং "ফাইনালইজড"` - সর্বশেষ চূড়ান্ত ব্লকের জন্য
- `স্ট্রিং "পেন্ডিং"` - পেন্ডিং স্টেট/লেনদেনের জন্য

## উদাহরণ

এই পৃষ্ঠায় আমরা কমান্ড লাইন টুল, [curl](https://curl.se) ব্যবহার করে পৃথক JSON_RPC API এন্ডপয়েন্টগুলি কীভাবে ব্যবহার করতে হয় তার উদাহরণ প্রদান করি। এই পৃথক এন্ডপয়েন্টের উদাহরণগুলি নীচে [কার্ল উদাহরণ](#curl-examples) বিভাগে পাওয়া যাবে। পৃষ্ঠার আরও নীচে, আমরা একটি Geth নোড, JSON_RPC API এবং কার্ল ব্যবহার করে একটি স্মার্ট কন্ট্র্যাক্ট কম্পাইল এবং ডিপ্লয় করার জন্য একটি [এন্ড-টু-এন্ড উদাহরণ](#usage-example) প্রদান করি।

## কার্ল উদাহরণ {#curl-examples}

একটি Ethereum নোডে [কার্ল](https://curl.se) অনুরোধ করে JSON_RPC API ব্যবহার করার উদাহরণ নিচে দেওয়া হল। প্রতিটি উদাহরণে নির্দিষ্ট এন্ডপয়েন্টের বর্ণনা, তার প্যারামিটার, রিটার্ন টাইপ এবং এটি কীভাবে ব্যবহার করা উচিত তার একটি কার্যকরী উদাহরণ অন্তর্ভুক্ত রয়েছে।

কার্ল অনুরোধগুলি কন্টেন্টের প্রকার সম্পর্কিত একটি ত্রুটি মেসেজ ফেরত দিতে পারে। এর কারণ হল `--data` বিকল্পটি কন্টেন্টের প্রকার `application/x-www-form-urlencoded`-এ সেট করে। যদি আপনার নোড এই বিষয়ে অভিযোগ করে, তাহলে কলের শুরুতে `-H "Content-Type: application/json"` স্থাপন করে ম্যানুয়ালি হেডার সেট করুন। উদাহরণগুলিতে URL/IP এবং পোর্টের সংমিশ্রণও অন্তর্ভুক্ত নয় যা কার্ল (curl)-কে দেওয়া শেষ আর্গুমেন্ট হতে হবে (যেমন, `127.0.0.1:8545`)। এই অতিরিক্ত ডেটা সহ একটি সম্পূর্ণ কার্ল অনুরোধ নিম্নলিখিত ফর্মটি নেয়:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## গসিপ, স্টেট, হিস্ট্রি {#gossip-state-history}

মুষ্টিমেয় কিছু মূল JSON-RPC পদ্ধতির জন্য Ethereum নেটওয়ার্ক থেকে ডেটা প্রয়োজন, এবং সুন্দরভাবে তিনটি প্রধান বিভাগে পড়ে: _গসিপ, স্টেট এবং হিস্ট্রি_। প্রতিটি পদ্ধতিতে যাওয়ার জন্য এই বিভাগগুলির লিঙ্কগুলি ব্যবহার করুন, বা পদ্ধতিগুলির সম্পূর্ণ তালিকা অন্বেষণ করতে বিষয়বস্তুর সারণী ব্যবহার করুন।

### গসিপ পদ্ধতি {#gossip-methods}

> এই পদ্ধতিগুলি চেইনের হেড ট্র্যাক করে। এইভাবে লেনদেনগুলি নেটওয়ার্কের চারপাশে তাদের পথ তৈরি করে, ব্লকগুলিতে তাদের পথ খুঁজে পায় এবং ক্লায়েন্টরা কীভাবে নতুন ব্লক সম্পর্কে জানতে পারে।

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### স্টেট পদ্ধতি {#state_methods}

> যে পদ্ধতিগুলি সঞ্চিত সমস্ত ডেটার বর্তমান অবস্থা রিপোর্ট করে। "স্টেট" একটি বড় শেয়ার করা RAM-এর মতো, এবং এতে অ্যাকাউন্টের ব্যালেন্স, চুক্তির ডেটা এবং গ্যাস অনুমান অন্তর্ভুক্ত রয়েছে।

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### হিস্ট্রি পদ্ধতি {#history_methods}

> জেনেসিসে ফিরে প্রতিটি ব্লকের ঐতিহাসিক রেকর্ড নিয়ে আসে। এটি একটি বড় অ্যাপেন্ড-অনলি ফাইলের মতো, এবং এতে সমস্ত ব্লক হেডার, ব্লক বডি, আঙ্কেল ব্লক এবং লেনদেনের রসিদ অন্তর্ভুক্ত রয়েছে।

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API প্লেগ্রাউন্ড

API পদ্ধতিগুলি আবিষ্কার করতে এবং চেষ্টা করার জন্য আপনি [প্লেগ্রাউন্ড টুল](https://ethereum-json-rpc.com) ব্যবহার করতে পারেন। এটি আপনাকে আরও দেখায় যে কোন পদ্ধতি এবং নেটওয়ার্কগুলি বিভিন্ন নোড প্রদানকারী দ্বারা সমর্থিত।

## JSON-RPC API পদ্ধতি {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

বর্তমান ক্লায়েন্ট সংস্করণটি প্রদান করে।

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`স্ট্রিং` - বর্তমান ক্লায়েন্ট সংস্করণ

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

প্রদত্ত ডেটার Keccak-256 (স্ট্যান্ডার্ডাইজড SHA3-256 _নয়_) রিটার্ন করে।

**প্যারামিটার**

1. `DATA` - একটি SHA3 হ্যাসে রূপান্তর করার জন্য ডেটা

```js
params: ["0x68656c6c6f20776f726c64"]
```

**রিটার্ন**

`DATA` - প্রদত্ত স্ট্রিংটির SHA3 ফলাফল।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

বর্তমান নেটওয়ার্ক আইডি রিটার্ন করে।

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`স্ট্রিং` - বর্তমান নেটওয়ার্ক আইডি।

বর্তমান নেটওয়ার্ক আইডি-র সম্পূর্ণ তালিকা [chainlist.org](https://chainlist.org)-এ উপলব্ধ। কিছু সাধারণ হল:

- `1`: Ethereum মেইননেট
- `11155111`: Sepolia টেস্টনেট
- `560048` : Hoodi টেস্টনেট

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

ক্লায়েন্ট যদি সক্রিয়ভাবে নেটওয়ার্ক সংযোগের জন্য শুনছে তাহলে `সত্য` রিটার্ন করে।

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`বুলিয়ান` - শোনার সময় `সত্য`, অন্যথায় `মিথ্যা`।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

বর্তমানে ক্লায়েন্টের সাথে সংযুক্ত পিয়ারদের সংখ্যা রিটার্ন করে।

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`কোয়ান্টিটি` - সংযুক্ত পিয়ারদের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

বর্তমান Ethereum প্রোটোকল সংস্করণ রিটার্ন করে। মনে রাখবেন এই পদ্ধতিটি [Geth-এ উপলব্ধ নয়](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)৷

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`স্ট্রিং` - বর্তমান Ethereum প্রোটোকল সংস্করণ

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

সিঙ্ক স্ট্যাটাস সম্পর্কে ডেটা সহ একটি অবজেক্ট বা `মিথ্যা` রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

সঠিক রিটার্ন ডেটা ক্লায়েন্ট প্রয়োগের মধ্যে ভিন্ন হয়। নোড সিঙ্ক না করার সময় সমস্ত ক্লায়েন্ট `মিথ্যা` রিটার্ন করে, এবং সমস্ত ক্লায়েন্ট নিম্নলিখিত ক্ষেত্রগুলি রিটার্ন করে।

`অবজেক্ট|বুলিয়ান`, সিঙ্ক স্ট্যাটাস ডেটা সহ একটি অবজেক্ট বা `মিথ্যা`, যখন সিঙ্ক হচ্ছে না:

- `স্টার্টিংব্লক`: `কোয়ান্টিটি` - যে ব্লকে ইম্পোর্ট শুরু হয়েছিল (শুধুমাত্র রিসেট করা হবে, সিঙ্ক তার হেডে পৌঁছানোর পরে)
- `কারেন্টব্লক`: `কোয়ান্টিটি` - বর্তমান ব্লক, eth_blockNumber-এর মতোই
- `হাইয়েস্টব্লক`: `কোয়ান্টিটি` - আনুমানিক সর্বোচ্চ ব্লক

যাইহোক, পৃথক ক্লায়েন্টরা অতিরিক্ত ডেটাও সরবরাহ করতে পারে। উদাহরণস্বরূপ Geth নিম্নলিখিতটি রিটার্ন করে:

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

যেখানে Besu রিটার্ন করে:

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

আরো বিস্তারিত জানার জন্য আপনার নির্দিষ্ট ক্লায়েন্টের জন্য ডকুমেন্টেশন পড়ুন।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

ক্লায়েন্ট কয়েনবেস অ্যাড্রেস রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

> **নোট:** এই পদ্ধতিটি **v1.14.0** থেকে অবচিত হয়েছে এবং আর সমর্থিত নয়। এই পদ্ধতিটি ব্যবহার করার চেষ্টা করলে একটি "মেথড নট সাপোর্টেড" ত্রুটি দেখা দেবে।

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`DATA`, 20 বাইট - বর্তমান কয়েনবেস অ্যাড্রেস।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

রিপ্লে-সুরক্ষিত লেনদেন স্বাক্ষর করার জন্য ব্যবহৃত চেইন আইডি রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`chainId`, বর্তমান চেইন আইডি-র পূর্ণসংখ্যাকে প্রতিনিধিত্বকারী স্ট্রিং হিসাবে হেক্সাডেসিমেল মান।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

ক্লায়েন্ট সক্রিয়ভাবে নতুন ব্লক মাইনিং করলে `সত্য` রিটার্ন করে। এটি শুধুমাত্র প্রুফ-অফ-ওয়ার্ক নেটওয়ার্কের জন্য `সত্য` রিটার্ন করতে পারে এবং [দ্য মার্জ](/roadmap/merge/) থেকে কিছু ক্লায়েন্টে উপলব্ধ নাও হতে পারে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`বুলিয়ান` - ক্লায়েন্ট মাইনিং করলে `সত্য` রিটার্ন করে, অন্যথায় `মিথ্যা`।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

নোডটি প্রতি সেকেন্ডে কতগুলি হ্যাস মাইনিং করছে তার সংখ্যা রিটার্ন করে। এটি শুধুমাত্র প্রুফ-অফ-ওয়ার্ক নেটওয়ার্কের জন্য `সত্য` রিটার্ন করতে পারে এবং [দ্য মার্জ](/roadmap/merge/) থেকে কিছু ক্লায়েন্টে উপলব্ধ নাও হতে পারে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`কোয়ান্টিটি` - প্রতি সেকেন্ডে হ্যাসের সংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

wei-তে প্রতি গ্যাসের বর্তমান মূল্যের একটি অনুমান প্রদান করে। উদাহরণস্বরূপ, Besu ক্লায়েন্ট শেষ 100টি ব্লক পরীক্ষা করে এবং ডিফল্টভাবে মধ্যম গ্যাস ইউনিট মূল্য রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`কোয়ান্টিটি` - wei-তে বর্তমান গ্যাস মূল্যের পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

ক্লায়েন্টের মালিকানাধীন অ্যাড্রেসগুলির একটি তালিকা রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`DATA-এর অ্যারে`, 20 বাইট - ক্লায়েন্টের মালিকানাধীন অ্যাড্রেস।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

সবচেয়ে সাম্প্রতিক ব্লকের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

কোনটি না

**রিটার্ন**

`কোয়ান্টিটি` - ক্লায়েন্ট যে বর্তমান ব্লক নম্বরে আছে তার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

একটি নির্দিষ্ট অ্যাড্রেসে অ্যাকাউন্টের ব্যালেন্স প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - ব্যালেন্স পরীক্ষা করার জন্য অ্যাড্রেস।
2. `কোয়ান্টিটি|ট্যাগ` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা `"লেটেস্ট"`, `"আর্লিয়েস্ট"`, `"পেন্ডিং"`, `"সেফ"`, বা `"ফাইনালইজড"` স্ট্রিং, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**রিটার্ন**

`কোয়ান্টিটি` - wei-তে বর্তমান ব্যালেন্সের পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

একটি প্রদত্ত অ্যাড্রেসের একটি স্টোরেজ অবস্থান থেকে মান প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - স্টোরেজের অ্যাড্রেস।
2. `কোয়ান্টিটি` - স্টোরেজের অবস্থানের পূর্ণসংখ্যা।
3. `কোয়ান্টিটি|ট্যাগ` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা `"লেটেস্ট"`, `"আর্লিয়েস্ট"`, `"পেন্ডিং"`, `"সেফ"`, `"ফাইনালইজড"` স্ট্রিং, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

**রিটার্ন**

`DATA` - এই স্টোরেজ অবস্থানে মান।

**উদাহরণ**
সঠিক অবস্থান গণনা করা পুনরুদ্ধার করার জন্য স্টোরেজের উপর নির্ভর করে। অ্যাড্রেস `0x391694e7e0b0cce554cb130d723a9d27458f9298` দ্বারা `0x295a70b2de5e3953354a6a8344e616ed314d7251`-এ ডিপ্লয় করা নিম্নলিখিত চুক্তিটি বিবেচনা করুন।

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

pos0-এর মান পুনরুদ্ধার করা সহজ:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

মানচিত্রের একটি উপাদান পুনরুদ্ধার করা আরও কঠিন। মানচিত্রে একটি উপাদানের অবস্থান গণনা করা হয়:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

এর মানে হল pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]-এ স্টোরেজ পুনরুদ্ধার করতে আমাদের এর সাথে অবস্থান গণনা করতে হবে:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

web3 লাইব্রেরির সাথে আসা geth কনসোলটি গণনা করার জন্য ব্যবহার করা যেতে পারে:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

এখন স্টোরেজ আনতে:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

একটি অ্যাড্রেস থেকে _প্রেরিত_ লেনদেনের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - অ্যাড্রেস।
2. `কোয়ান্টিটি|ট্যাগ` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা `"লেটেস্ট"`, `"আর্লিয়েস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // সর্বশেষ ব্লকের অবস্থা
]
```

**রিটার্ন**

`QUANTITY` - এই অ্যাড্রেস থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

প্রদত্ত ব্লক হ্যাসের সাথে মিলে যাওয়া একটি ব্লক থেকে একটি ব্লকের লেনদেনের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাস

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**রিটার্ন**

`কোয়ান্টিটি` - এই ব্লকের লেনদেনের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

প্রদত্ত ব্লক নম্বর মিলে যাওয়া একটি ব্লকের লেনদেনের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `কোয়ান্টিটি|ট্যাগ` - একটি ব্লক নম্বরের পূর্ণসংখ্যা, বা `"আর্লিয়েস্ট"`, `"লেটেস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, যেমন [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এ।

```js
params: [
  "0x13738ca", // 20396234
]
```

**রিটার্ন**

`কোয়ান্টিটি` - এই ব্লকের লেনদেনের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

প্রদত্ত ব্লক হ্যাসের সাথে মিলে যাওয়া একটি ব্লক থেকে আঙ্কেল সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাস

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**রিটার্ন**

`কোয়ান্টিটি` - এই ব্লকের আঙ্কেলদের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

প্রদত্ত ব্লক নম্বর মিলে যাওয়া একটি ব্লক থেকে আঙ্কেলদের সংখ্যা প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `কোয়ান্টিটি|ট্যাগ` - একটি ব্লক নম্বরের পূর্ণসংখ্যা, বা `"লেটেস্ট"`, `"আর্লিয়েস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, যেমন [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) -এ

```js
params: [
  "0xe8", // 232
]
```

**রিটার্ন**

`কোয়ান্টিটি` - এই ব্লকের আঙ্কেলদের সংখ্যার পূর্ণসংখ্যা।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

একটি প্রদত্ত অ্যাড্রেসে কোড রিটার্ন করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 20 বাইট - অ্যাড্রেস
2. `কোয়ান্টিটি|ট্যাগ` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা `"লেটেস্ট"`, `"আর্লিয়েস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**রিটার্ন**

`DATA` - প্রদত্ত অ্যাড্রেস থেকে কোড।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

সাইন পদ্ধতি একটি Ethereum নির্দিষ্ট স্বাক্ষর গণনা করে: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`।

মেসেজের সাথে একটি উপসর্গ যুক্ত করার মাধ্যমে গণনা করা স্বাক্ষরটিকে একটি Ethereum নির্দিষ্ট স্বাক্ষর হিসাবে স্বীকৃত করে। এটি অপব্যবহার রোধ করে যেখানে একটি ক্ষতিকর ডিএ্যাপ অবাধ ডেটা (যেমন, ট্রানজ্যাকশন) সাইন করতে পারে এবং শিকারকে ছদ্মবেশ ধারণ করার জন্য স্বাক্ষর ব্যবহার করতে পারে।

দ্রষ্টব্য: স্বাক্ষর করার জন্য অ্যাড্রেস আনলক করা আবশ্যক।

**প্যারামিটার**

1. `DATA`, 20 বাইট - অ্যাড্রেস
2. `DATA`, N বাইট - স্বাক্ষর করার জন্য মেসেজ

**রিটার্ন**

`DATA`: স্বাক্ষর

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

একটি লেনদেন স্বাক্ষর করে যা পরবর্তী সময়ে [eth_sendRawTransaction](#eth_sendrawtransaction) ব্যবহার করে নেটওয়ার্কে জমা দেওয়া যেতে পারে।

**প্যারামিটার**

1. `অবজেক্ট` - লেনদেনের অবজেক্ট

- `টাইপ`:
- `from`: `DATA`, 20 বাইট - যে অ্যাড্রেস থেকে লেনদেন পাঠানো হয়েছে।
- `to`: `DATA`, 20 বাইট - (নতুন চুক্তি তৈরি করার সময় ঐচ্ছিক) যে অ্যাড্রেসে লেনদেনটি নির্দেশিত হয়েছে।
- `গ্যাস`: `কোয়ান্টিটি` - (ঐচ্ছিক, ডিফল্ট: 90000) লেনদেন সম্পাদনের জন্য প্রদত্ত গ্যাসের পূর্ণসংখ্যা। এটি অব্যবহৃত গ্যাস ফেরত দেবে।
- `gasPrice`: `কোয়ান্টিটি` - (ঐচ্ছিক, ডিফল্ট: নির্ধারণ করা হবে) প্রতি প্রদত্ত গ্যাসের জন্য ব্যবহৃত gasPrice-এর পূর্ণসংখ্যা, Wei-তে।
- `value`: `কোয়ান্টিটি` - (ঐচ্ছিক) এই লেনদেনের সাথে প্রেরিত মূল্যের পূর্ণসংখ্যা, Wei-তে।
- `data`: `DATA` - একটি চুক্তির সংকলিত কোড অথবা আহূত পদ্ধতি স্বাক্ষরের হ্যাস এবং এনকোড করা প্যারামিটার।
- `nonce`: `কোয়ান্টিটি` - (ঐচ্ছিক) একটি ননসের পূর্ণসংখ্যা। এটি আপনাকে একই নন্স ব্যবহারকারী আপনার নিজের পেন্ডিং লেনদেনগুলি ওভাররাইট করার অনুমতি দেয়।

**রিটার্ন**

`DATA`, নির্দিষ্ট অ্যাকাউন্ট দ্বারা স্বাক্ষরিত RLP-এনকোডেড লেনদেন অবজেক্ট।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

নতুন মেসেজ কল লেনদেন বা একটি চুক্তি তৈরি করে, যদি ডেটা ক্ষেত্রে কোড থাকে এবং `from`-এ নির্দিষ্ট অ্যাকাউন্ট ব্যবহার করে এটি স্বাক্ষর করে।

**প্যারামিটার**

1. `অবজেক্ট` - লেনদেনের অবজেক্ট

- `from`: `DATA`, 20 বাইট - যে অ্যাড্রেস থেকে লেনদেন পাঠানো হয়েছে।
- `to`: `DATA`, 20 বাইট - (নতুন চুক্তি তৈরি করার সময় ঐচ্ছিক) যে অ্যাড্রেসে লেনদেনটি নির্দেশিত হয়েছে।
- `গ্যাস`: `কোয়ান্টিটি` - (ঐচ্ছিক, ডিফল্ট: 90000) লেনদেন সম্পাদনের জন্য প্রদত্ত গ্যাসের পূর্ণসংখ্যা। এটি অব্যবহৃত গ্যাস ফেরত দেবে।
- `gasPrice`: `কোয়ান্টিটি` - (ঐচ্ছিক, ডিফল্ট: নির্ধারণ করা হবে) প্রতি প্রদত্ত গ্যাসের জন্য ব্যবহৃত gasPrice-এর পূর্ণসংখ্যা।
- `value`: `কোয়ান্টিটি` - (ঐচ্ছিক) এই লেনদেনের সাথে প্রেরিত মূল্যের পূর্ণসংখ্যা।
- `input`: `DATA` - একটি চুক্তির সংকলিত কোড অথবা আহূত পদ্ধতি স্বাক্ষরের হ্যাস এবং এনকোড করা প্যারামিটার।
- `nonce`: `কোয়ান্টিটি` - (ঐচ্ছিক) একটি ননসের পূর্ণসংখ্যা। এটি আপনাকে একই নন্স ব্যবহারকারী আপনার নিজের পেন্ডিং লেনদেনগুলি ওভাররাইট করার অনুমতি দেয়।

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

`DATA`, 32 বাইট - লেনদেনের হ্যাস, অথবা শূন্য হ্যাস যদি লেনদেন এখনও উপলব্ধ না হয়।

আপনি যখন একটি চুক্তি তৈরি করেন, তখন একটি ব্লকে লেনদেন প্রস্তাবিত হওয়ার পরে, চুক্তির অ্যাড্রেস পেতে [eth_getTransactionReceipt](#eth_gettransactionreceipt) ব্যবহার করুন।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

স্বাক্ষরিত লেনদেনের জন্য নতুন মেসেজ কল লেনদেন বা একটি চুক্তি তৈরি করে।

**প্যারামিটার**

1. `DATA`, স্বাক্ষরিত লেনদেন ডেটা।

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**রিটার্ন**

`DATA`, 32 বাইট - লেনদেনের হ্যাস, অথবা শূন্য হ্যাস যদি লেনদেন এখনও উপলব্ধ না হয়।

আপনি যখন একটি চুক্তি তৈরি করেন, তখন একটি ব্লকে লেনদেন প্রস্তাবিত হওয়ার পরে, চুক্তির অ্যাড্রেস পেতে [eth_getTransactionReceipt](#eth_gettransactionreceipt) ব্যবহার করুন।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

ব্লকচেইনে একটি লেনদেন তৈরি না করেই অবিলম্বে একটি নতুন মেসেজ কল কার্যকর করে। প্রায়শই শুধুমাত্র পঠনযোগ্য স্মার্ট কন্ট্র্যাক্ট ফাংশনগুলি কার্যকর করার জন্য ব্যবহৃত হয়, উদাহরণস্বরূপ একটি ERC-20 চুক্তির জন্য `balanceOf`।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `অবজেক্ট` - লেনদেন কল অবজেক্ট

- `from`: `DATA`, 20 বাইট - (ঐচ্ছিক) যে অ্যাড্রেস থেকে লেনদেন পাঠানো হয়েছে।
- `to`: `DATA`, 20 বাইট - যে অ্যাড্রেসে লেনদেনটি নির্দেশিত হয়েছে।
- `গ্যাস`: `কোয়ান্টিটি` - (ঐচ্ছিক) লেনদেন সম্পাদনের জন্য প্রদত্ত গ্যাসের পূর্ণসংখ্যা। eth_call শূন্য গ্যাস খরচ করে, কিন্তু কিছু এক্সিকিউশনের জন্য এই প্যারামিটারের প্রয়োজন হতে পারে।
- `gasPrice`: `কোয়ান্টিটি` - (ঐচ্ছিক) প্রতিটি প্রদত্ত গ্যাসের জন্য ব্যবহৃত gasPrice-এর পূর্ণসংখ্যা
- `value`: `কোয়ান্টিটি` - (ঐচ্ছিক) এই লেনদেনের সাথে প্রেরিত মূল্যের পূর্ণসংখ্যা
- `input`: `DATA` - (ঐচ্ছিক) পদ্ধতি স্বাক্ষরের হ্যাস এবং এনকোড করা প্যারামিটার। বিস্তারিত জানার জন্য সলিডিটি ডকুমেন্টেশনে [Ethereum চুক্তি ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) দেখুন।

2. `কোয়ান্টিটি|ট্যাগ` - পূর্ণসংখ্যা ব্লক নম্বর, অথবা `"লেটেস্ট"`, `"আর্লিয়েস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter) দেখুন

**রিটার্ন**

`DATA` - সম্পাদিত চুক্তির রিটার্ন ভ্যালু।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

লেনদেনটি সম্পূর্ণ করার জন্য কতটা গ্যাস প্রয়োজন তার একটি অনুমান তৈরি করে এবং ফেরত দেয়। লেনদেনটি ব্লকচেইনে যুক্ত হবে না। মনে রাখবেন যে অনুমানটি লেনদেনের দ্বারা প্রকৃতপক্ষে ব্যবহৃত গ্যাসের পরিমাণের চেয়ে উল্লেখযোগ্যভাবে বেশি হতে পারে, যার মধ্যে EVM মেকানিক্স এবং নোডের কর্মক্ষমতা সহ বিভিন্ন কারণে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

[eth_call](#eth_call) প্যারামিটারগুলি দেখুন, তবে সমস্ত বৈশিষ্ট্য ঐচ্ছিক। যদি কোনো গ্যাস সীমা নির্দিষ্ট করা না থাকে, তাহলে geth পেন্ডিং ব্লক থেকে ব্লক গ্যাস সীমাটিকে একটি ঊর্ধ্ব সীমা হিসেবে ব্যবহার করে। ফলস্বরূপ, যখন গ্যাসের পরিমাণ পেন্ডিং ব্লক গ্যাস লিমিটের চেয়ে বেশি হয়, তখন ফেরত আসা অনুমানটি কল/ট্রানজ্যাকশন এক্সিকিউট করার জন্য যথেষ্ট নাও হতে পারে।

**রিটার্ন**

`কোয়ান্টিটি` - ব্যবহৃত গ্যাসের পরিমাণ।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

হ্যাসের মাধ্যমে একটি ব্লক সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাস।
2. `বুলিয়ান` - যদি `সত্য` হয় তবে এটি সম্পূর্ণ লেনদেন অবজেক্টগুলি প্রদান করে, যদি `মিথ্যা` হয় তবে শুধুমাত্র লেনদেনের হ্যাসগুলি প্রদান করে।

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**রিটার্ন**

`অবজেক্ট` - একটি ব্লক অবজেক্ট, অথবা যখন কোনো ব্লক পাওয়া যায়নি তখন `null`:

- `number`: `কোয়ান্টিটি` - ব্লক নম্বর। যখন এর পেন্ডিং ব্লক থাকে তখন `null`।
- `hash`: `DATA`, 32 বাইট - ব্লকের হ্যাস। যখন এর পেন্ডিং ব্লক থাকে তখন `null`।
- `parentHash`: `DATA`, 32 বাইট - প্যারেন্ট ব্লকের হ্যাস।
- `nonce`: `DATA`, 8 বাইট - জেনারেট করা প্রুফ-অফ-ওয়ার্কের হ্যাস। যখন এর পেন্ডিং ব্লক থাকে তখন `null`, প্রুফ-অফ-স্টেক ব্লকের জন্য `0x0` (দ্য মার্জ থেকে)
- `sha3Uncles`: `DATA`, 32 বাইট - ব্লকের আঙ্কেল ডেটার SHA3।
- `logsBloom`: `DATA`, 256 বাইট - ব্লকের লগগুলির জন্য ব্লুম ফিল্টার। যখন এর পেন্ডিং ব্লক থাকে তখন `null`।
- `transactionsRoot`: `DATA`, 32 বাইট - ব্লকের লেনদেন ট্রাইয়ের রুট।
- `stateRoot`: `DATA`, 32 বাইট - ব্লকের চূড়ান্ত স্টেট ট্রাইয়ের রুট।
- `receiptsRoot`: `DATA`, 32 বাইট - ব্লকের রসিদ ট্রাইয়ের রুট।
- `miner`: `DATA`, 20 বাইট - সেই সুবিধাভোগীর অ্যাড্রেস যাকে ব্লকের পুরস্কার দেওয়া হয়েছিল।
- `difficulty`: `কোয়ান্টিটি` - এই ব্লকের জন্য অসুবিধার পূর্ণসংখ্যা।
- `totalDifficulty`: `কোয়ান্টিটি` - এই ব্লক পর্যন্ত চেইনের মোট অসুবিধার পূর্ণসংখ্যা।
- `extraData`: `DATA` - এই ব্লকের "অতিরিক্ত ডেটা" ক্ষেত্র।
- `size`: `কোয়ান্টিটি` - বাইটে এই ব্লকের আকারের পূর্ণসংখ্যা।
- `gasLimit`: `কোয়ান্টিটি` - এই ব্লকে অনুমোদিত সর্বাধিক গ্যাস।
- `gasUsed`: `কোয়ান্টিটি` - এই ব্লকের সমস্ত লেনদেন দ্বারা ব্যবহৃত মোট গ্যাস।
- `timestamp`: `কোয়ান্টিটি` - ব্লকটি কখন একত্রিত হয়েছিল তার ইউনিক্স টাইমস্ট্যাম্প।
- `transactions`: `অ্যারে` - লেনদেন অবজেক্টের অ্যারে, অথবা 32 বাইট লেনদেন হ্যাস, যা শেষ প্রদত্ত প্যারামিটারের উপর নির্ভর করে।
- `uncles`: `অ্যারে` - আঙ্কেল হ্যাসের অ্যারে।

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

### eth_getBlockByNumber {#eth_getblockbynumber}

ব্লক নম্বর দ্বারা একটি ব্লক সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `কোয়ান্টিটি|ট্যাগ` - একটি ব্লক নম্বরের পূর্ণসংখ্যা, বা `"আর্লিয়েস্ট"`, `"লেটেস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, যেমন [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এ।
2. `বুলিয়ান` - যদি `সত্য` হয় তবে এটি সম্পূর্ণ লেনদেন অবজেক্টগুলি প্রদান করে, যদি `মিথ্যা` হয় তবে শুধুমাত্র লেনদেনের হ্যাসগুলি প্রদান করে।

```js
params: [
  "0x1b4", // 436
  true,
]
```

**রিটার্ন**
[eth_getBlockByHash](#eth_getblockbyhash) দেখুন

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

ফলাফল দেখুন [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

লেনদেনের হ্যাসের অনুরোধে একটি লেনদেন সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি লেনদেনের হ্যাস

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**রিটার্ন**

`অবজেক্ট` - একটি লেনদেন অবজেক্ট, অথবা যখন কোনো লেনদেন পাওয়া যায়নি তখন `null`:

- `blockHash`: `DATA`, 32 বাইট - এই লেনদেনটি যে ব্লকে ছিল তার হ্যাস। `null` যখন এটি পেন্ডিং থাকে।
- `blockNumber`: `কোয়ান্টিটি` - ব্লক নম্বর যেখানে এই লেনদেনটি ছিল। `null` যখন এটি পেন্ডিং থাকে।
- `from`: `DATA`, 20 বাইট - প্রেরকের অ্যাড্রেস।
- `গ্যাস`: `কোয়ান্টিটি` - প্রেরকের দ্বারা সরবরাহ করা গ্যাস।
- `gasPrice`: `কোয়ান্টিটি` - প্রেরকের দ্বারা সরবরাহ করা গ্যাস মূল্য Wei-তে।
- `hash`: `DATA`, 32 বাইট - লেনদেনের হ্যাস।
- `input`: `DATA` - লেনদেনের সাথে প্রেরিত ডেটা।
- `nonce`: `কোয়ান্টিটি` - প্রেরকের দ্বারা এর আগে করা লেনদেনের সংখ্যা।
- `to`: `DATA`, 20 বাইট - প্রাপকের অ্যাড্রেস। `null` যখন এটি একটি চুক্তি তৈরির লেনদেন হয়।
- `transactionIndex`: `কোয়ান্টিটি` - ব্লকের লেনদেন সূচকের অবস্থানের পূর্ণসংখ্যা। `null` যখন এটি পেন্ডিং থাকে।
- `value`: `কোয়ান্টিটি` - Wei-তে স্থানান্তরিত মান।
- `v`: `কোয়ান্টিটি` - ECDSA রিকভারি আইডি
- `r`: `কোয়ান্টিটি` - ECDSA স্বাক্ষর r
- `s`: `কোয়ান্টিটি` - ECDSA স্বাক্ষর s

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

ব্লক হ্যাস এবং লেনদেন সূচক অবস্থান দ্বারা একটি লেনদেন সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাস।
2. `কোয়ান্টিটি` - লেনদেন সূচকের অবস্থানের পূর্ণসংখ্যা।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**রিটার্ন**
[eth_getTransactionByHash](#eth_gettransactionbyhash) দেখুন

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ফলাফল দেখুন [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

ব্লক নম্বর এবং লেনদেন সূচক অবস্থান দ্বারা একটি লেনদেন সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `কোয়ান্টিটি|ট্যাগ` - একটি ব্লক নম্বর, বা `"আর্লিয়েস্ট"`, `"লেটেস্ট"`, `"পেন্ডিং"`, `"সেফ"` বা `"ফাইনালইজড"` স্ট্রিং, যেমন [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এ।
2. `কোয়ান্টিটি` - লেনদেন সূচক অবস্থান।

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**রিটার্ন**
[eth_getTransactionByHash](#eth_gettransactionbyhash) দেখুন

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

ফলাফল দেখুন [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

লেনদেনের হ্যাসের মাধ্যমে একটি লেনদেনের রসিদ প্রদান করে।

**দ্রষ্টব্য** পেন্ডিং লেনদেনের জন্য রসিদ উপলব্ধ নয়।

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি লেনদেনের হ্যাস

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**রিটার্ন**
`অবজেক্ট` - একটি লেনদেন রসিদ অবজেক্ট, অথবা যখন কোনো রসিদ পাওয়া যায়নি তখন `null`:

- `transactionHash `: `DATA`, 32 বাইট - লেনদেনের হ্যাস।
- `transactionIndex`: `কোয়ান্টিটি` - ব্লকের লেনদেন সূচকের অবস্থানের পূর্ণসংখ্যা।
- `blockHash`: `DATA`, 32 বাইট - এই লেনদেনটি যে ব্লকে ছিল তার হ্যাস।
- `blockNumber`: `কোয়ান্টিটি` - ব্লক নম্বর যেখানে এই লেনদেনটি ছিল।
- `from`: `DATA`, 20 বাইট - প্রেরকের অ্যাড্রেস।
- `to`: `DATA`, 20 বাইট - প্রাপকের অ্যাড্রেস। null যখন এটি একটি চুক্তি তৈরির লেনদেন হয়।
- `cumulativeGasUsed` : `কোয়ান্টিটি ` - ব্লকের মধ্যে এই লেনদেনটি কার্যকর করার সময় ব্যবহৃত মোট গ্যাসের পরিমাণ।
- `effectiveGasPrice` : `কোয়ান্টিটি` - প্রতি ইউনিট গ্যাসের জন্য প্রদত্ত বেস ফি এবং টিপের যোগফল।
- `gasUsed `: `কোয়ান্টিটি ` - শুধুমাত্র এই নির্দিষ্ট লেনদেন দ্বারা ব্যবহৃত গ্যাসের পরিমাণ।
- `contractAddress `: `DATA`, 20 বাইট - তৈরি করা চুক্তির অ্যাড্রেস, যদি লেনদেনটি একটি চুক্তি তৈরি করে থাকে, অন্যথায় `null`।
- `logs`: `অ্যারে` - লগ অবজেক্টের অ্যারে, যা এই লেনদেনটি তৈরি করেছে।
- `logsBloom`: `DATA`, 256 বাইট - হালকা ক্লায়েন্টদের জন্য সম্পর্কিত লগগুলি দ্রুত পুনরুদ্ধার করার জন্য ব্লুম ফিল্টার।
- `type`: `কোয়ান্টিটি` - লেনদেনের প্রকারের পূর্ণসংখ্যা, লেগ্যাসি লেনদেনের জন্য `0x0`, অ্যাক্সেস তালিকা প্রকারের জন্য `0x1`, ডাইনামিক ফি-র জন্য `0x2`।

এটি _যেকোনো একটি_ রিটার্ন করে:

- `root`: `DATA` 32 বাইটের পোস্ট-ট্রানজ্যাকশন স্টেট রুট (বাইজেন্টিয়াম-পূর্ব)
- `status`: `কোয়ান্টিটি` হয় `1` (সাফল্য) বা `0` (ব্যর্থতা)

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

হ্যাস এবং আঙ্কেল ইনডেক্স পজিশন দ্বারা একটি ব্লকের আঙ্কেল সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `DATA`, 32 বাইট - একটি ব্লকের হ্যাস।
2. `কোয়ান্টিটি` - আঙ্কেলের সূচক অবস্থান।

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**রিটার্ন**
[eth_getBlockByHash](#eth_getblockbyhash) দেখুন

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

ফলাফল দেখুন [eth_getBlockByHash](#eth_getblockbyhash)

**দ্রষ্টব্য**: একটি আঙ্কেলের মধ্যে পৃথক লেনদেন থাকে না।

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

নম্বর এবং আঙ্কেল ইনডেক্স পজিশন দ্বারা একটি ব্লকের আঙ্কেল সম্পর্কে তথ্য প্রদান করে।

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  প্লেগ্রাউন্ডে এন্ডপয়েন্ট চেষ্টা করুন
</ButtonLink>

**প্যারামিটার**

1. `কোয়ান্টিটি|ট্যাগ` - একটি ব্লক নম্বর, বা `"আর্লিয়েস্ট"`, `"লেটেস্ট"`, `"পেন্ডিং"`, `"সেফ"`, `"ফাইনালইজড"` স্ট্রিং, যেমন [ব্লক প্যারামিটার](/developers/docs/apis/json-rpc/#block-parameter)-এ।
2. `কোয়ান্টিটি` - আঙ্কেলের সূচক অবস্থান।

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**রিটার্ন**
[eth_getBlockByHash](#eth_getblockbyhash) দেখুন

**দ্রষ্টব্য**: একটি আঙ্কেলের মধ্যে পৃথক লেনদেন থাকে না।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

ফলাফল দেখুন [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

ফিল্টার বিকল্পের উপর ভিত্তি করে একটি ফিল্টার অবজেক্ট তৈরি করে, যা স্টেট পরিবর্তন হলে (লগ) অবহিত করে।
স্টেট পরিবর্তিত হয়েছে কিনা তা পরীক্ষা করতে, [eth_getFilterChanges](#eth_getfilterchanges) কল করুন।

**বিষয় ফিল্টার নির্দিষ্ট করার উপর একটি নোট:**
বিষয়গুলি ক্রম-নির্ভর। [A, B] বিষয় সহ একটি লগের সাথে একটি লেনদেন নিম্নলিখিত বিষয় ফিল্টার দ্বারা মেলানো হবে:

- `[]` "যেকোনো কিছু"
- `[A]` "প্রথম অবস্থানে A (এবং পরে যেকোনো কিছু)"
- `[null, B]` "প্রথম অবস্থানে যেকোনো কিছু এবং দ্বিতীয় অবস্থানে B (এবং পরে যেকোনো কিছু)"
- `[A, B]` "প্রথম অবস্থানে A এবং দ্বিতীয় অবস্থানে B (এবং পরে যেকোনো কিছু)"
- `[[A, B], [A, B]]` "প্রথম অবস্থানে (A অথবা B) এবং দ্বিতীয় অবস্থানে (A অথবা B) (এবং পরে যেকোনো কিছু)"
- **প্যারামিটার**

1. `অবজেক্ট` - ফিল্টার বিকল্পগুলি:

- `fromBlock`: `কোয়ান্টিটি|ট্যাগ` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) পূর্ণসংখ্যার ব্লক নম্বর, অথবা শেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্ত ব্লকের জন্য `"finalized"`, অথবা এখনও ব্লকে না থাকা লেনদেনের জন্য `"pending"`, `"earliest"`।
- `toBlock`: `কোয়ান্টিটি|ট্যাগ` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) পূর্ণসংখ্যার ব্লক নম্বর, অথবা শেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্ত ব্লকের জন্য `"finalized"`, অথবা এখনও ব্লকে না থাকা লেনদেনের জন্য `"pending"`, `"earliest"`।
- `address`: `DATA|অ্যারে`, 20 বাইট - (ঐচ্ছিক) চুক্তির অ্যাড্রেস বা অ্যাড্রেসের একটি তালিকা যেখান থেকে লগ উৎপন্ন হওয়া উচিত।
- `topics`: `DATA-এর অ্যারে`, - (ঐচ্ছিক) 32 বাইট `DATA` বিষয়গুলির অ্যারে। বিষয়গুলি ক্রম-নির্ভর। প্রতিটি বিষয় "অথবা" বিকল্পগুলির সাথে DATA-এর একটি অ্যারেও হতে পারে।

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

**রিটার্ন**
`কোয়ান্টিটি` - একটি ফিল্টার আইডি।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

নোডে একটি ফিল্টার তৈরি করে, যা নতুন ব্লক এলে অবহিত করে।
স্টেট পরিবর্তিত হয়েছে কিনা তা পরীক্ষা করতে, [eth_getFilterChanges](#eth_getfilterchanges) কল করুন।

**প্যারামিটার**
কোনোটিই নয়

**রিটার্ন**
`কোয়ান্টিটি` - একটি ফিল্টার আইডি।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

নোডে একটি ফিল্টার তৈরি করে, যা নতুন পেন্ডিং লেনদেন এলে অবহিত করে।
স্টেট পরিবর্তিত হয়েছে কিনা তা পরীক্ষা করতে, [eth_getFilterChanges](#eth_getfilterchanges) কল করুন।

**প্যারামিটার**
কোনোটিই নয়

**রিটার্ন**
`কোয়ান্টিটি` - একটি ফিল্টার আইডি।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

প্রদত্ত আইডি সহ একটি ফিল্টার আনইনস্টল করে। যখন আর দেখার প্রয়োজন নেই তখন সর্বদা কল করা উচিত।
অতিরিক্তভাবে, ফিল্টারগুলি যখন একটি নির্দিষ্ট সময়ের জন্য [eth_getFilterChanges](#eth_getfilterchanges) দিয়ে অনুরোধ করা হয় না তখন টাইমআউট হয়ে যায়।

**প্যারামিটার**

1. `কোয়ান্টিটি` - ফিল্টার আইডি।

```js
params: [
  "0xb", // 11
]
```

**রিটার্ন**
`বুলিয়ান` - যদি ফিল্টারটি সফলভাবে আনইনস্টল করা হয় তবে `সত্য`, অন্যথায় `মিথ্যা`।

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

একটি ফিল্টারের জন্য পোলিং পদ্ধতি, যা শেষ পোলের পর থেকে ঘটে যাওয়া লগগুলির একটি অ্যারে প্রদান করে।

**প্যারামিটার**

1. `কোয়ান্টিটি` - ফিল্টার আইডি।

```js
params: [
  "0x16", // 22
]
```

**রিটার্ন**
`অ্যারে` - লগ অবজেক্টের অ্যারে, অথবা যদি শেষ পোল থেকে কিছু পরিবর্তন না হয় তবে একটি খালি অ্যারে।

- `eth_newBlockFilter` দিয়ে তৈরি ফিল্টারগুলির জন্য রিটার্ন হল ব্লক হ্যাস (`DATA`, 32 বাইট), যেমন, `["0x3454645634534..."]`।

- `eth_newPendingTransactionFilter` দিয়ে তৈরি ফিল্টারগুলির জন্য রিটার্ন হল ট্রানজ্যাকশন হ্যাস (`DATA`, 32 বাইট), যেমন, `["0x6345343454645..."]`।

- `eth_newFilter` দিয়ে তৈরি করা ফিল্টারের জন্য লগগুলি নিম্নলিখিত প্যারামিটার সহ অবজেক্ট:
  - `removed`: `ট্যাগ` - চেইন পুনর্গঠনের কারণে লগটি সরানো হলে `সত্য`। `মিথ্যা` যদি এটি একটি বৈধ লগ হয়।
  - `logIndex`: `কোয়ান্টিটি` - ব্লকের লগ সূচকের অবস্থানের পূর্ণসংখ্যা। `null` যখন এটি পেন্ডিং লগ থাকে।
  - `transactionIndex`: `কোয়ান্টিটি` - লগটি যেখান থেকে তৈরি করা হয়েছে সেই লেনদেন সূচকের অবস্থানের পূর্ণসংখ্যা। `null` যখন এটি পেন্ডিং লগ থাকে।
  - `transactionHash`: `DATA`, 32 বাইট - এই লগটি যেখান থেকে তৈরি করা হয়েছে সেই লেনদেনের হ্যাস। `null` যখন এটি পেন্ডিং লগ থাকে।
  - `blockHash`: `DATA`, 32 বাইট - এই লগটি যে ব্লকে ছিল তার হ্যাস। `null` যখন এটি পেন্ডিং থাকে। `null` যখন এটি পেন্ডিং লগ থাকে।
  - `blockNumber`: `কোয়ান্টিটি` - এই লগটি যে ব্লকে ছিল তার ব্লক নম্বর। `null` যখন এটি পেন্ডিং থাকে। `null` যখন এটি পেন্ডিং লগ থাকে।
  - `address`: `DATA`, 20 বাইট - যে অ্যাড্রেস থেকে এই লগটি উৎপন্ন হয়েছে।
  - `data`: `DATA` - পরিবর্তনশীল-দৈর্ঘ্যের নন-ইনডেক্সড লগ ডেটা। ( _solidity_-তে: শূন্য বা তার বেশি 32 বাইটের নন-ইনডেক্সড লগ আর্গুমেন্ট।)
  - `topics`: `DATA-এর অ্যারে` - সূচিত লগ আর্গুমেন্টের 0 থেকে 4টি 32 বাইট `DATA`-এর অ্যারে। ( _solidity_-তে: প্রথম টপিকটি হল ইভেন্টের স্বাক্ষরের _হ্যাস_ (যেমন, `Deposit(address,bytes32,uint256)`), যদি না আপনি `anonymous` স্পেসিফায়ার দিয়ে ইভেন্টটি ঘোষণা করেন।)

- **উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
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

### eth_getFilterLogs {#eth_getfilterlogs}

প্রদত্ত আইডি সহ ফিল্টারের সাথে মিলে যাওয়া সমস্ত লগের একটি অ্যারে প্রদান করে।

**প্যারামিটার**

1. `কোয়ান্টিটি` - ফিল্টার আইডি।

```js
params: [
  "0x16", // 22
]
```

**রিটার্ন**
[eth_getFilterChanges](#eth_getfilterchanges) দেখুন

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

ফলাফল দেখুন [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

একটি প্রদত্ত ফিল্টার অবজেক্টের সাথে মিলে যাওয়া সমস্ত লগের একটি অ্যারে প্রদান করে।

**প্যারামিটার**

1. `অবজেক্ট` - ফিল্টার বিকল্পগুলি:

- `fromBlock`: `কোয়ান্টিটি|ট্যাগ` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) পূর্ণসংখ্যার ব্লক নম্বর, অথবা শেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্ত ব্লকের জন্য `"finalized"`, অথবা এখনও ব্লকে না থাকা লেনদেনের জন্য `"pending"`, `"earliest"`।
- `toBlock`: `কোয়ান্টিটি|ট্যাগ` - (ঐচ্ছিক, ডিফল্ট: `"latest"`) পূর্ণসংখ্যার ব্লক নম্বর, অথবা শেষ প্রস্তাবিত ব্লকের জন্য `"latest"`, সর্বশেষ নিরাপদ ব্লকের জন্য `"safe"`, সর্বশেষ চূড়ান্ত ব্লকের জন্য `"finalized"`, অথবা এখনও ব্লকে না থাকা লেনদেনের জন্য `"pending"`, `"earliest"`।
- `address`: `DATA|অ্যারে`, 20 বাইট - (ঐচ্ছিক) চুক্তির অ্যাড্রেস বা অ্যাড্রেসের একটি তালিকা যেখান থেকে লগ উৎপন্ন হওয়া উচিত।
- `topics`: `DATA-এর অ্যারে`, - (ঐচ্ছিক) 32 বাইট `DATA` বিষয়গুলির অ্যারে। বিষয়গুলি ক্রম-নির্ভর। প্রতিটি বিষয় "অথবা" বিকল্পগুলির সাথে DATA-এর একটি অ্যারেও হতে পারে।
- `blockHash`: `DATA`, 32 বাইট - (ঐচ্ছিক, **ভবিষ্যৎ**) EIP-234 যোগ করার সাথে, `blockHash` একটি নতুন ফিল্টার বিকল্প হবে যা 32-বাইট হ্যাস `blockHash`-এর সাথে একক ব্লকে প্রত্যাবর্তিত লগগুলিকে সীমাবদ্ধ করে। `blockHash` ব্যবহার করা `fromBlock` = `toBlock` = হ্যাস `blockHash`-এর সাথে ব্লক নম্বরের সমান। যদি ফিল্টার মানদণ্ডে `blockHash` উপস্থিত থাকে, তবে `fromBlock` বা `toBlock` কোনোটিরই অনুমতি নেই।

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
[eth_getFilterChanges](#eth_getfilterchanges) দেখুন

**উদাহরণ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

ফলাফল দেখুন [eth_getFilterChanges](#eth_getfilterchanges)

## ব্যবহারের উদাহরণ {#usage-example}

### JSON_RPC ব্যবহার করে একটি চুক্তি ডিপ্লয় করা {#deploying-contract}

এই বিভাগে শুধুমাত্র RPC ইন্টারফেস ব্যবহার করে কীভাবে একটি চুক্তি ডিপ্লয় করতে হয় তার একটি প্রদর্শন অন্তর্ভুক্ত রয়েছে। চুক্তি ডিপ্লয় করার জন্য বিকল্প পথ রয়েছে যেখানে এই জটিলতাটি বিমূর্ত করা হয়—উদাহরণস্বরূপ, RPC ইন্টারফেসের উপরে নির্মিত লাইব্রেরি ব্যবহার করে যেমন [web3.js](https://web3js.readthedocs.io/) এবং [web3.py](https://github.com/ethereum/web3.py)। এই বিমূর্ততাগুলি সাধারণত বোঝা সহজ এবং কম ত্রুটি-প্রবণ, তবে হুডের নীচে কী ঘটছে তা বোঝা এখনও সহায়ক।

নিম্নলিখিতটি `Multiply7` নামক একটি সহজবোধ্য স্মার্ট কন্ট্র্যাক্ট যা একটি Ethereum নোডে JSON-RPC ইন্টারফেস ব্যবহার করে ডিপ্লয় করা হবে। এই টিউটোরিয়ালটি ধরে নেয় যে পাঠক ইতিমধ্যে একটি Geth নোড চালাচ্ছেন। নোড এবং ক্লায়েন্ট সম্পর্কে আরও তথ্য [এখানে](/developers/docs/nodes-and-clients/run-a-node) পাওয়া যায়। অ-Geth ক্লায়েন্টদের জন্য HTTP JSON-RPC কীভাবে শুরু করতে হয় তা দেখতে অনুগ্রহ করে পৃথক [ক্লায়েন্ট](/developers/docs/nodes-and-clients/) ডকুমেন্টেশন পড়ুন। বেশিরভাগ ক্লায়েন্ট ডিফল্টভাবে `localhost:8545`-এ পরিবেশন করে।

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

প্রথমত, নিশ্চিত করতে হবে যে HTTP RPC ইন্টারফেস সক্ষম আছে। এর মানে আমরা স্টার্টআপে Geth-কে `--http` ফ্ল্যাগ দিয়ে সরবরাহ করি। এই উদাহরণে আমরা একটি ব্যক্তিগত উন্নয়ন চেইনে Geth নোড ব্যবহার করি। এই পদ্ধতি ব্যবহার করে আমাদের আসল নেটওয়ার্কে ইথারের প্রয়োজন নেই।

```bash
geth --http --dev console 2>>geth.log
```

এটি `http://localhost:8545`-এ HTTP RPC ইন্টারফেস শুরু করবে।

আমরা [curl](https://curl.se) ব্যবহার করে কয়েনবেস অ্যাড্রেস (অ্যাকাউন্টগুলির অ্যারে থেকে প্রথম অ্যাড্রেস প্রাপ্ত করে) এবং ব্যালেন্স পুনরুদ্ধার করে ইন্টারফেসটি চলছে কিনা তা যাচাই করতে পারি। দয়া করে মনে রাখবেন যে এই উদাহরণগুলির ডেটা আপনার স্থানীয় নোডে ভিন্ন হবে। আপনি যদি এই কমান্ডগুলি চেষ্টা করতে চান, তাহলে প্রথমটির থেকে প্রাপ্ত ফলাফল দিয়ে দ্বিতীয় কার্ল অনুরোধের অনুরোধ প্যারামিটারগুলি প্রতিস্থাপন করুন।

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

যেহেতু সংখ্যাগুলি হেক্স এনকোডেড, তাই ব্যালেন্সটি একটি হেক্স স্ট্রিং হিসাবে wei-তে ফেরত দেওয়া হয়। আমরা যদি সংখ্যা হিসাবে ইথারে ব্যালেন্স পেতে চাই তবে আমরা Geth কনসোল থেকে web3 ব্যবহার করতে পারি।

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

এখন যেহেতু আমাদের ব্যক্তিগত উন্নয়ন চেইনে কিছু ইথার আছে, আমরা চুক্তিটি ডিপ্লয় করতে পারি। প্রথম ধাপ হল Multiply7 চুক্তিটিকে বাইট কোডে কম্পাইল করা যা EVM-এ পাঠানো যেতে পারে। সলিডিটি কম্পাইলার solc ইনস্টল করতে, [সলিডিটি ডকুমেন্টেশন](https://docs.soliditylang.org/en/latest/installing-solidity.html) অনুসরণ করুন। (আপনি আমাদের উদাহরণের জন্য ব্যবহৃত কম্পাইলারের সংস্করণের সাথে মেলাতে একটি পুরানো `solc` রিলিজ ব্যবহার করতে চাইতে পারেন।)

পরবর্তী পদক্ষেপ হল Multiply7 কন্ট্র্যাক্টকে বাইট কোডে কম্পাইল করা যা EVM-এ পাঠানো যেতে পারে।

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

এখন যেহেতু আমাদের কম্পাইল করা কোড আছে, আমাদের নির্ধারণ করতে হবে এটি ডিপ্লয় করতে কত গ্যাস খরচ হবে। RPC ইন্টারফেসের একটি `eth_estimateGas` পদ্ধতি রয়েছে যা আমাদের একটি অনুমান দেবে।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

এবং অবশেষে চুক্তিটি ডিপ্লয় করুন।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

লেনদেনটি নোড দ্বারা গৃহীত হয় এবং একটি লেনদেন হ্যাস ফেরত দেওয়া হয়। এই হ্যাসটি ট্রানজ্যাকশন ট্র্যাক করতে ব্যবহার করা যেতে পারে। পরবর্তী পদক্ষেপ হল আমাদের কন্ট্র্যাক্টটি কোন অ্যাড্রেসে ডিপ্লয় করা হয়েছে তা নির্ধারণ করা। প্রতিটি এক্সিকিউটেড ট্রানজ্যাকশন একটি রিসিপ্ট তৈরি করবে। এই রিসিপ্টে ট্রানজ্যাকশন সম্পর্কে বিভিন্ন তথ্য থাকে, যেমন ট্রানজ্যাকশনটি কোন ব্লকে অন্তর্ভুক্ত ছিল এবং EVM দ্বারা কতটা গ্যাস ব্যবহার করা হয়েছিল। যদি একটি ট্রানজ্যাকশন
একটি কন্ট্র্যাক্ট তৈরি করে তবে এতে কন্ট্র্যাক্ট অ্যাড্রেসও থাকবে। আমরা `eth_getTransactionReceipt` RPC পদ্ধতি ব্যবহার করে রিসিপ্টটি পুনরুদ্ধার করতে পারি।

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

আমাদের কন্ট্র্যাক্টটি `0x4d03d617d700cf81935d7f797f4e2ae719648262`-এ তৈরি করা হয়েছিল। একটি রিসিপ্টের পরিবর্তে একটি নাল (null) ফলাফল মানে ট্রানজ্যাকশনটি এখনও একটি ব্লকে অন্তর্ভুক্ত করা হয়নি। এক মুহূর্ত অপেক্ষা করুন এবং আপনার কনসেন্সাস ক্লায়েন্ট চলছে কিনা তা পরীক্ষা করুন এবং আবার চেষ্টা করুন।

#### স্মার্ট কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করা {#interacting-with-smart-contract}

এই উদাহরণে আমরা কন্ট্র্যাক্টের `multiply` পদ্ধতিতে `eth_sendTransaction` ব্যবহার করে একটি ট্রানজ্যাকশন পাঠাব।

`eth_sendTransaction`-এর জন্য বেশ কিছু আর্গুমেন্টের প্রয়োজন, বিশেষ করে `from`, `to` এবং `data`। `From` হল আমাদের অ্যাকাউন্টের পাবলিক অ্যাড্রেস, এবং `to` হল কন্ট্র্যাক্ট অ্যাড্রেস। `data` আর্গুমেন্টে একটি পেলোড থাকে যা নির্ধারণ করে কোন পদ্ধতিকে কোন আর্গুমেন্টের সাথে কল করতে হবে। এখানেই [ABI (অ্যাপ্লিকেশন বাইনারি ইন্টারফেস)](https://docs.soliditylang.org/en/latest/abi-spec.html) কাজে আসে। ABI হল একটি JSON ফাইল যা সংজ্ঞায়িত করে কিভাবে EVM-এর জন্য ডেটা সংজ্ঞায়িত এবং এনকোড করতে হয়।

পেলোডের বাইটগুলি নির্ধারণ করে যে কন্ট্র্যাক্টের কোন পদ্ধতিকে কল করা হয়েছে। এটি ফাংশনের নাম এবং তার আর্গুমেন্টের প্রকারের উপর Keccak হ্যাসের প্রথম 4 বাইট, যা হেক্স এনকোডেড। multiply ফাংশন একটি uint গ্রহণ করে যা uint256-এর একটি উপনাম। এর ফলে আমরা পাই:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

পরবর্তী পদক্ষেপ হল আর্গুমেন্টগুলিকে এনকোড করা। এখানে শুধুমাত্র একটি uint256 আছে, ধরা যাক, মান 6। ABI-এর একটি বিভাগ রয়েছে যা নির্দিষ্ট করে কিভাবে uint256 টাইপ এনকোড করতে হয়।

`int<M>: enc(X)` হল X-এর বিগ-এন্ডিয়ান টু'স কমপ্লিমেন্ট এনকোডিং, যা নেগেটিভ X-এর জন্য 0xff দিয়ে এবং পজিটিভ X-এর জন্য শূন্য বাইট দিয়ে উচ্চ-ক্রম (বাম) দিকে প্যাড করা হয়, যাতে দৈর্ঘ্য 32 বাইটের গুণিতক হয়।

এটি `0000000000000000000000000000000000000000000000000000000000000006`-এ এনকোড করে।

ফাংশন নির্বাচক এবং এনকোড করা আর্গুমেন্ট একত্রিত করলে আমাদের ডেটা হবে `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`।

এটি এখন নোডে পাঠানো যেতে পারে:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

যেহেতু একটি ট্রানজ্যাকশন পাঠানো হয়েছে, তাই একটি ট্রানজ্যাকশন হ্যাস ফেরত দেওয়া হয়েছে। রিসিপ্ট পুনরুদ্ধার করলে পাওয়া যায়:

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

রিসিপ্টটিতে একটি লগ রয়েছে। এই লগটি ট্রানজ্যাকশন এক্সিকিউশনের সময় EVM দ্বারা তৈরি করা হয়েছিল এবং রিসিপ্টে অন্তর্ভুক্ত করা হয়েছিল। `multiply` ফাংশনটি দেখায় যে ইনপুটের 7 গুণ দিয়ে `Print` ইভেন্টটি উত্থাপিত হয়েছিল। যেহেতু `Print` ইভেন্টের আর্গুমেন্টটি একটি uint256 ছিল, তাই আমরা এটিকে ABI নিয়ম অনুসারে ডিকোড করতে পারি যা আমাদের প্রত্যাশিত ডেসিমেল 42 দেবে। ডেটা ছাড়াও এটি লক্ষণীয় যে কোন ইভেন্টটি লগ তৈরি করেছে তা নির্ধারণ করতে টপিক ব্যবহার করা যেতে পারে:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

এটি ছিল সবচেয়ে সাধারণ কিছু কাজের একটি সংক্ষিপ্ত পরিচিতি, যা JSON-RPC-এর সরাসরি ব্যবহার প্রদর্শন করে।

## সম্পর্কিত বিষয় {#related-topics}

- [JSON-RPC স্পেসিফিকেশন](http://www.jsonrpc.org/specification)
- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [ব্যাকএন্ড API](/developers/docs/apis/backend/)
- [এক্সিকিউশন ক্লায়েন্ট](/developers/docs/nodes-and-clients/#execution-clients)
