---
title: "ইথিরিয়াম ডেভেলপমেন্ট শুরু করা"
description: "এটি ইথিরিয়াম ডেভেলপমেন্ট শুরু করার জন্য নতুনদের একটি গাইড। আমরা আপনাকে একটি API এন্ডপয়েন্ট তৈরি করা থেকে শুরু করে, কমান্ড লাইন রিকোয়েস্ট করা এবং আপনার প্রথম ওয়েব3 স্ক্রিপ্ট লেখা পর্যন্ত নিয়ে যাব! কোনো ব্লকচেইন ডেভেলপমেন্ট অভিজ্ঞতার প্রয়োজন নেই!"
author: "এলান হ্যালপার্ন"
tags: ["JavaScript", "ethers.js", "nodes", "querying", "Alchemy"]
skill: beginner
breadcrumb: "শুরু করা"
lang: bn
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

এটি ইথিরিয়াম ডেভেলপমেন্ট শুরু করার জন্য নতুনদের একটি গাইড। এই টিউটোরিয়ালের জন্য আমরা [Alchemy](https://alchemyapi.io/) ব্যবহার করব, যা শীর্ষস্থানীয় ব্লকচেইন ডেভেলপার প্ল্যাটফর্ম এবং Maker, 0x, MyEtherWallet, Dharma এবং Kyber সহ শীর্ষ ব্লকচেইন অ্যাপগুলোর 70% এর লক্ষ লক্ষ ব্যবহারকারীকে শক্তি যোগায়। Alchemy আমাদের ইথিরিয়াম চেইনে একটি API এন্ডপয়েন্টে অ্যাক্সেস দেবে যাতে আমরা লেনদেন পড়তে এবং লিখতে পারি।

আমরা আপনাকে Alchemy-তে সাইন আপ করা থেকে শুরু করে আপনার প্রথম ওয়েব3 স্ক্রিপ্ট লেখা পর্যন্ত নিয়ে যাব! কোনো ব্লকচেইন ডেভেলপমেন্ট অভিজ্ঞতার প্রয়োজন নেই!

## 1. একটি বিনামূল্যের Alchemy অ্যাকাউন্টের জন্য সাইন আপ করুন {#sign-up-for-a-free-alchemy-account}

Alchemy-তে একটি অ্যাকাউন্ট তৈরি করা সহজ, [এখানে বিনামূল্যে সাইন আপ করুন](https://auth.alchemy.com/)।

## 2. একটি Alchemy অ্যাপ তৈরি করুন {#create-an-alchemy-app}

ইথিরিয়াম চেইনের সাথে যোগাযোগ করতে এবং Alchemy-এর প্রোডাক্টগুলো ব্যবহার করতে, আপনার রিকোয়েস্টগুলো প্রমাণীকরণের জন্য একটি API কী প্রয়োজন।

আপনি [ড্যাশবোর্ড থেকে API কী তৈরি করতে পারেন](https://dashboard.alchemy.com/)। একটি নতুন কী তৈরি করতে, নিচে দেখানো হিসেবে "Create App"-এ যান:

_তাদের ড্যাশবোর্ড দেখানোর সুযোগ দেওয়ার জন্য_ [_ShapeShift_](https://shapeshift.com/) _কে বিশেষ ধন্যবাদ!_

![Alchemy dashboard](./alchemy-dashboard.png)

আপনার নতুন কী পেতে "Create App"-এর অধীনে বিস্তারিত তথ্য পূরণ করুন। আপনি এখানে আপনার আগে তৈরি করা অ্যাপ এবং আপনার টিমের তৈরি করা অ্যাপগুলোও দেখতে পারেন। যেকোনো অ্যাপের জন্য "View Key"-তে ক্লিক করে বিদ্যমান কীগুলো টেনে আনুন।

![Create app with Alchemy screenshot](./create-app.png)

আপনি "Apps"-এর ওপর হোভার করে এবং একটি নির্বাচন করেও বিদ্যমান API কীগুলো টেনে আনতে পারেন। আপনি এখানে "View Key" করতে পারেন, পাশাপাশি নির্দিষ্ট ডোমেইনগুলো হোয়াইটলিস্ট করতে, বিভিন্ন ডেভেলপার টুল দেখতে এবং অ্যানালিটিক্স দেখতে "Edit App" করতে পারেন।

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. কমান্ড লাইন থেকে একটি রিকোয়েস্ট করুন {#make-a-request-from-the-command-line}

JSON-RPC এবং curl ব্যবহার করে Alchemy-এর মাধ্যমে ইথিরিয়াম ব্লকচেইন এর সাথে ইন্টারঅ্যাক্ট করুন।

ম্যানুয়াল রিকোয়েস্টের জন্য, আমরা `POST` রিকোয়েস্টের মাধ্যমে `JSON-RPC`-এর সাথে ইন্টারঅ্যাক্ট করার পরামর্শ দিই। সহজভাবে `Content-Type: application/json` হেডার এবং আপনার কোয়েরিটি `POST` বডি হিসেবে নিচের ফিল্ডগুলোর সাথে পাস করুন:

- `jsonrpc`: JSON-RPC সংস্করণ—বর্তমানে, শুধুমাত্র `2.0` সমর্থিত।
- `method`: ETH API মেথড। [API রেফারেন্স দেখুন।](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: মেথডে পাস করার জন্য প্যারামিটারগুলোর একটি তালিকা।
- `id`: আপনার রিকোয়েস্টের আইডি। এটি রেসপন্স দ্বারা ফেরত দেওয়া হবে যাতে আপনি ট্র্যাক রাখতে পারেন কোন রেসপন্সটি কোন রিকোয়েস্টের।

বর্তমান গ্যাস প্রাইস পুনরুদ্ধার করতে আপনি কমান্ড লাইন থেকে রান করতে পারেন এমন একটি উদাহরণ নিচে দেওয়া হলো:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**নোট:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) কে আপনার নিজের API কী `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` দিয়ে প্রতিস্থাপন করুন।_

**ফলাফল:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. আপনার ওয়েব3 ক্লায়েন্ট সেট আপ করুন {#set-up-your-web3-client}

**যদি আপনার একটি বিদ্যমান ক্লায়েন্ট থাকে,** তবে আপনার বর্তমান নোড প্রোভাইডার URL-টি আপনার API কী সহ একটি Alchemy URL-এ পরিবর্তন করুন: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_নোট:_** নিচের স্ক্রিপ্টগুলো একটি **নোড কনটেক্সটে** রান করতে হবে বা **একটি ফাইলে সেভ করতে হবে**, কমান্ড লাইন থেকে রান করা যাবে না। যদি আপনার আগে থেকে Node বা npm ইনস্টল করা না থাকে, তবে ম্যাকের জন্য এই দ্রুত [সেট-আপ গাইডটি](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) দেখে নিন।

Alchemy-এর সাথে ইন্টিগ্রেট করার জন্য প্রচুর [ওয়েব3 লাইব্রেরি](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) রয়েছে, তবে, আমরা [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) ব্যবহার করার পরামর্শ দিই, যা web3.js-এর একটি ড্রপ-ইন রিপ্লেসমেন্ট এবং Alchemy-এর সাথে নির্বিঘ্নে কাজ করার জন্য তৈরি ও কনফিগার করা হয়েছে। এটি স্বয়ংক্রিয় রিট্রাই এবং শক্তিশালী WebSocket সাপোর্টের মতো একাধিক সুবিধা প্রদান করে।

AlchemyWeb3.js ইনস্টল করতে, **আপনার প্রজেক্ট ডিরেক্টরিতে যান** এবং রান করুন:

**Yarn এর সাথে:**

```
yarn add @alch/alchemy-web3
```

**NPM এর সাথে:**

```
npm install @alch/alchemy-web3
```

Alchemy-এর নোড ইনফ্রাস্ট্রাকচারের সাথে ইন্টারঅ্যাক্ট করতে, NodeJS-এ রান করুন বা এটি একটি JavaScript ফাইলে যোগ করুন:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. আপনার প্রথম ওয়েব3 স্ক্রিপ্ট লিখুন! {#write-your-first-web3-script}

এখন একটু ওয়েব3 প্রোগ্রামিংয়ের বাস্তব অভিজ্ঞতা পেতে আমরা একটি সাধারণ স্ক্রিপ্ট লিখব যা ইথিরিয়াম মেইননেট থেকে সর্বশেষ ব্লক নম্বর প্রিন্ট করবে।

**1. যদি আপনি ইতিমধ্যে না করে থাকেন, তবে আপনার টার্মিনালে একটি নতুন প্রজেক্ট ডিরেক্টরি তৈরি করুন এবং এতে cd করুন:**

```
mkdir web3-example
cd web3-example
```

**2. যদি আপনি ইতিমধ্যে না করে থাকেন, তবে আপনার প্রজেক্টে Alchemy web3 (বা যেকোনো web3) ডিপেন্ডেন্সি ইনস্টল করুন:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` নামের একটি ফাইল তৈরি করুন এবং নিচের বিষয়বস্তুগুলো যোগ করুন:**

> আপনার শেষ পর্যন্ত `demo` কে আপনার Alchemy HTTP API কী দিয়ে প্রতিস্থাপন করা উচিত।

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async বিষয়গুলোর সাথে অপরিচিত? এই [Medium পোস্টটি](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) দেখে নিন।

**4. node ব্যবহার করে এটি আপনার টার্মিনালে রান করুন**

```
node index.js
```

**5. আপনি এখন আপনার কনসোলে সর্বশেষ ব্লক নম্বরের আউটপুট দেখতে পাবেন!**

```
The latest block number is 11043912
```

**দারুণ! অভিনন্দন! আপনি এইমাত্র Alchemy ব্যবহার করে আপনার প্রথম ওয়েব3 স্ক্রিপ্ট লিখেছেন 🎉**

এরপর কী করবেন বুঝতে পারছেন না? আপনার প্রথম স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার চেষ্টা করুন এবং আমাদের [হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট গাইডে](https://www.alchemy.com/docs/hello-world-smart-contract) কিছু সলিডিটি প্রোগ্রামিংয়ের বাস্তব অভিজ্ঞতা নিন, অথবা [ড্যাশবোর্ড ডেমো অ্যাপ](https://docs.alchemyapi.io/tutorials/demo-app) দিয়ে আপনার ড্যাশবোর্ড জ্ঞান পরীক্ষা করুন!

_[Alchemy-তে বিনামূল্যে সাইন আপ করুন](https://auth.alchemy.com/), আমাদের [ডকুমেন্টেশন](https://www.alchemy.com/docs/) দেখুন, এবং সর্বশেষ খবরের জন্য, [Twitter](https://twitter.com/AlchemyPlatform)-এ আমাদের অনুসরণ করুন_।