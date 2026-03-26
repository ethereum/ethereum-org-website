---
title: "নতুনদের জন্য হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট"
description: "ইথিরিয়ামে একটি সাধারণ স্মার্ট কন্ট্রাক্ট লেখা এবং ডিপ্লয় করার উপর প্রাথমিক টিউটোরিয়াল।"
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "স্মার্ট কন্ট্রাক্ট", "ডিপ্লয়িং"]
skill: beginner
breadcrumb: "হ্যালো ওয়ার্ল্ড কন্ট্রাক্ট"
lang: bn
published: 2021-03-31
---

আপনি যদি ব্লকচেইন ডেভেলপমেন্টে নতুন হয়ে থাকেন এবং কোথা থেকে শুরু করবেন তা না জানেন, অথবা আপনি যদি শুধু বুঝতে চান কীভাবে স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয়, তবে এই গাইডটি আপনার জন্য। আমরা একটি ভার্চুয়াল ওয়ালেট [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), এবং [Alchemy](https://www.alchemy.com/eth) ব্যবহার করে Sepolia টেস্টনেট-এ একটি সাধারণ স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করার প্রক্রিয়া দেখাব (যদি আপনি এখনও এগুলোর অর্থ না বোঝেন তবে চিন্তা করবেন না, আমরা এটি ব্যাখ্যা করব)।

এই টিউটোরিয়ালের [part 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)-এ আমরা দেখব কীভাবে আমাদের স্মার্ট কন্ট্রাক্ট এখানে ডিপ্লয় হওয়ার পর আমরা এর সাথে ইন্টারঅ্যাক্ট করতে পারি, এবং [part 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)-এ আমরা কভার করব কীভাবে এটি Etherscan-এ পাবলিশ করতে হয়।

যদি কোনো পর্যায়ে আপনার প্রশ্ন থাকে, তবে নির্দ্বিধায় [Alchemy Discord](https://discord.gg/gWuC7zB)-এ যোগাযোগ করুন!

## ধাপ 1: ইথিরিয়াম নেটওয়ার্ক-এর সাথে কানেক্ট করুন {#step-1}

ইথিরিয়াম চেইনে রিকোয়েস্ট করার অনেক উপায় আছে। সহজ করার জন্য, আমরা Alchemy-তে একটি ফ্রি একাউন্ট ব্যবহার করব, যা একটি ব্লকচেইন ডেভেলপার প্ল্যাটফর্ম এবং API, এটি আমাদের নিজস্ব নোড রান না করেই ইথিরিয়াম চেইনের সাথে যোগাযোগ করতে দেয়। এই প্ল্যাটফর্মে মনিটরিং এবং অ্যানালিটিক্সের জন্য ডেভেলপার টুলসও রয়েছে, যা আমরা এই টিউটোরিয়ালে ব্যবহার করব যাতে বুঝতে পারি আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয়মেন্টের ভেতরে কী ঘটছে। যদি আপনার আগে থেকে কোনো Alchemy একাউন্ট না থাকে, তবে [আপনি এখানে বিনামূল্যে সাইন আপ করতে পারেন](https://dashboard.alchemy.com/signup)।

## ধাপ 2: আপনার অ্যাপ (এবং API কি) তৈরি করুন {#step-2}

একবার আপনি একটি Alchemy একাউন্ট তৈরি করলে, আপনি একটি অ্যাপ তৈরি করে একটি API কি জেনারেট করতে পারেন। এটি আমাদের Sepolia টেস্টনেট-এ রিকোয়েস্ট করার অনুমতি দেবে। আপনি যদি টেস্টনেট সম্পর্কে পরিচিত না হন, তবে [এই পেজটি](/developers/docs/networks/) দেখুন।

1.  আপনার Alchemy ড্যাশবোর্ডে ন্যাভ বারে "Select an app" নির্বাচন করে এবং "Create new app"-এ ক্লিক করে "Create new app" পেজে যান।

![Hello world create app](./hello-world-create-app.png)

2. আপনার অ্যাপের নাম দিন “Hello World”, একটি সংক্ষিপ্ত বিবরণ দিন এবং একটি ইউজ কেস বেছে নিন, যেমন, "Infra & Tooling।" এরপর, "Ethereum" সার্চ করুন এবং নেটওয়ার্ক নির্বাচন করুন।

![create app view hello world](./create-app-view-hello-world.png)

3. এগিয়ে যেতে "Next"-এ ক্লিক করুন, তারপর “Create app” এবং হয়ে গেল! আপনার অ্যাপটি ন্যাভ বারের ড্রপডাউন মেনুতে উপস্থিত হওয়া উচিত, যেখানে কপি করার জন্য একটি API কি পাওয়া যাবে।

## ধাপ 3: একটি ইথিরিয়াম একাউন্ট (এডড্রেস) তৈরি করুন {#step-3}

লেনদেন পাঠানো এবং গ্রহণ করার জন্য আমাদের একটি ইথিরিয়াম একাউন্ট প্রয়োজন। এই টিউটোরিয়ালের জন্য, আমরা MetaMask ব্যবহার করব, যা ব্রাউজারে একটি ভার্চুয়াল ওয়ালেট এবং এটি আপনার ইথিরিয়াম একাউন্ট এডড্রেস পরিচালনা করতে ব্যবহৃত হয়। [লেনদেন](/developers/docs/transactions/) সম্পর্কে আরও জানুন।

আপনি MetaMask ডাউনলোড করতে পারেন এবং [এখানে](https://metamask.io/download) বিনামূল্যে একটি ইথিরিয়াম একাউন্ট তৈরি করতে পারেন। যখন আপনি একটি একাউন্ট তৈরি করছেন, অথবা যদি আপনার আগে থেকেই একটি একাউন্ট থাকে, তবে নেটওয়ার্ক ড্রপডাউন মেনু ব্যবহার করে "Sepolia" টেস্টনেট-এ স্যুইচ করতে ভুলবেন না (যাতে আমরা আসল টাকা নিয়ে কাজ না করি)।

যদি আপনি Sepolia তালিকাভুক্ত না দেখেন, তবে মেনুতে যান, তারপর Advanced-এ যান এবং নিচে স্ক্রোল করে "Show test networks" চালু করুন। নেটওয়ার্ক নির্বাচন মেনুতে, টেস্টনেট-এর তালিকা খুঁজতে "Custom" ট্যাবটি বেছে নিন এবং "Sepolia" নির্বাচন করুন।

![metamask sepolia example](./metamask-sepolia-example.png)

## ধাপ 4: একটি ফাসেট থেকে ইথার যোগ করুন {#step-4}

টেস্টনেট-এ আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার জন্য, আমাদের কিছু ফেক ETH প্রয়োজন হবে। Sepolia ETH পেতে আপনি বিভিন্ন ফাসেট-এর তালিকা দেখতে [Sepolia নেটওয়ার্ক ডিটেইলস](/developers/docs/networks/#sepolia)-এ যেতে পারেন। যদি একটি কাজ না করে, তবে অন্যটি চেষ্টা করুন কারণ এগুলো মাঝে মাঝে খালি হয়ে যেতে পারে। নেটওয়ার্ক ট্রাফিকের কারণে আপনার ফেক ETH পেতে কিছু সময় লাগতে পারে। এর পরপরই আপনার MetaMask একাউন্ট-এ ETH দেখতে পাওয়া উচিত!

## ধাপ 5: আপনার ব্যালেন্স চেক করুন {#step-5}

আমাদের ব্যালেন্স সেখানে আছে কিনা তা ডাবল চেক করতে, চলুন [Alchemy-এর কম্পোজার টুল](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) ব্যবহার করে একটি [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) রিকোয়েস্ট করি। এটি আমাদের ওয়ালেট-এ থাকা ETH-এর পরিমাণ রিটার্ন করবে। আপনার MetaMask একাউন্ট এডড্রেস ইনপুট করার পর এবং “Send Request”-এ ক্লিক করার পর, আপনি এরকম একটি রেসপন্স দেখতে পাবেন:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **নোট:** এই ফলাফলটি wei-তে, ETH-এ নয়। Wei ইথারের সবচেয়ে ছোট একক হিসেবে ব্যবহৃত হয়। wei থেকে ETH-এ রূপান্তর হলো: 1 eth = 10<sup>18</sup> wei। সুতরাং যদি আমরা 0x2B5E3AF16B1880000 কে ডেসিমালে রূপান্তর করি তবে আমরা 5\*10¹⁸ পাই যা 5 ETH এর সমান।
>
> যাক! আমাদের ফেক মানি সব সেখানেই আছে <Emoji text=":money_mouth_face:" size={1} />।

## ধাপ 6: আমাদের প্রজেক্ট ইনিশিয়ালাইজ করুন {#step-6}

প্রথমে, আমাদের প্রজেক্টের জন্য একটি ফোল্ডার তৈরি করতে হবে। আপনার কমান্ড লাইনে যান এবং টাইপ করুন:

```
mkdir hello-world
cd hello-world
```

এখন যেহেতু আমরা আমাদের প্রজেক্ট ফোল্ডারের ভেতরে আছি, আমরা প্রজেক্টটি ইনিশিয়ালাইজ করতে `npm init` ব্যবহার করব। যদি আপনার আগে থেকে npm ইনস্টল করা না থাকে, তবে [এই নির্দেশাবলী](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) অনুসরণ করুন (আমাদের Node.js-ও প্রয়োজন হবে তাই সেটিও ডাউনলোড করুন!)।

```
npm init
```

আপনি ইনস্টলেশনের প্রশ্নগুলোর উত্তর কীভাবে দিচ্ছেন তা খুব একটা গুরুত্বপূর্ণ নয়, রেফারেন্সের জন্য আমরা কীভাবে এটি করেছি তা এখানে দেওয়া হলো:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json অনুমোদন করুন এবং আমরা প্রস্তুত!

## ধাপ 7: [Hardhat](https://hardhat.org/getting-started/#overview) ডাউনলোড করুন {#step-7}

Hardhat হলো আপনার ইথিরিয়াম সফটওয়্যার কম্পাইল, ডিপ্লয়, টেস্ট এবং ডিবাগ করার জন্য একটি ডেভেলপমেন্ট এনভায়রনমেন্ট। এটি লাইভ চেইনে ডিপ্লয় করার আগে স্থানীয়ভাবে স্মার্ট কন্ট্রাক্ট এবং ডিএ্যাপস তৈরি করার সময় ডেভেলপারদের সাহায্য করে।

আমাদের `hello-world` প্রজেক্টের ভেতরে রান করুন:

```
npm install --save-dev hardhat
```

[ইনস্টলেশন নির্দেশাবলী](https://hardhat.org/getting-started/#overview) সম্পর্কে আরও বিস্তারিত জানতে এই পেজটি দেখুন।

## ধাপ 8: Hardhat প্রজেক্ট তৈরি করুন {#step-8}

আমাদের প্রজেক্ট ফোল্ডারের ভেতরে রান করুন:

```
npx hardhat
```

এরপর আপনি একটি ওয়েলকাম মেসেজ এবং আপনি কী করতে চান তা নির্বাচন করার অপশন দেখতে পাবেন। “create an empty hardhat.config.js” নির্বাচন করুন:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

এটি আমাদের জন্য একটি `hardhat.config.js` ফাইল তৈরি করবে যেখানে আমরা আমাদের প্রজেক্টের সমস্ত সেটআপ নির্দিষ্ট করব (ধাপ 13-এ)।

## ধাপ 9: প্রজেক্ট ফোল্ডার যোগ করুন {#step-9}

আমাদের প্রজেক্টটি গুছিয়ে রাখতে আমরা দুটি নতুন ফোল্ডার তৈরি করব। আপনার কমান্ড লাইনে আপনার প্রজেক্টের রুট ডিরেক্টরিতে যান এবং টাইপ করুন:

```
mkdir contracts
mkdir scripts
```

- `contracts/` হলো যেখানে আমরা আমাদের হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট কোড ফাইল রাখব
- `scripts/` হলো যেখানে আমরা আমাদের কন্ট্রাক্ট ডিপ্লয় এবং ইন্টারঅ্যাক্ট করার জন্য স্ক্রিপ্ট রাখব

## ধাপ 10: আমাদের কন্ট্রাক্ট লিখুন {#step-10}

আপনি হয়তো নিজেকে জিজ্ঞাসা করছেন, আমরা কখন কোড লিখতে যাচ্ছি?? ঠিক আছে, আমরা এখানে, ধাপ 10-এ।

আপনার প্রিয় এডিটরে hello-world প্রজেক্টটি খুলুন (আমরা [VSCode](https://code.visualstudio.com/) পছন্দ করি)। স্মার্ট কন্ট্রাক্ট Solidity নামক একটি ভাষায় লেখা হয় যা আমরা আমাদের HelloWorld.sol স্মার্ট কন্ট্রাক্ট লিখতে ব্যবহার করব।‌

1.  “contracts” ফোল্ডারে যান এবং HelloWorld.sol নামে একটি নতুন ফাইল তৈরি করুন
2.  নিচে ইথিরিয়াম ফাউন্ডেশনের একটি নমুনা হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট দেওয়া হলো যা আমরা এই টিউটোরিয়ালের জন্য ব্যবহার করব। নিচের বিষয়বস্তু কপি করে আপনার HelloWorld.sol ফাইলে পেস্ট করুন, এবং এই কন্ট্রাক্টটি কী করে তা বুঝতে কমেন্টগুলো পড়তে ভুলবেন না:

```solidity
// সিম্যান্টিক ভার্সনিং ব্যবহার করে সলিডিটির সংস্করণ নির্দিষ্ট করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` নামের একটি কন্ট্রাক্ট সংজ্ঞায়িত করে।
// কন্ট্রাক্ট হলো ফাংশন এবং ডেটার (এর স্টেট) একটি সংগ্রহ। একবার ডিপ্লয় করা হলে, একটি কন্ট্রাক্ট ইথিরিয়াম ব্লকচেইনের একটি নির্দিষ্ট ঠিকানায় অবস্থান করে। আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` টাইপের একটি স্টেট ভেরিয়েবল `message` ঘোষণা করে।
   // স্টেট ভেরিয়েবল হলো এমন ভেরিয়েবল যার মান কন্ট্রাক্ট স্টোরেজে স্থায়ীভাবে সংরক্ষিত থাকে। `public` কিওয়ার্ডটি ভেরিয়েবলগুলোকে কন্ট্রাক্টের বাইরে থেকে অ্যাক্সেসযোগ্য করে তোলে এবং এমন একটি ফাংশন তৈরি করে যা অন্যান্য কন্ট্রাক্ট বা ক্লায়েন্টরা মানটি অ্যাক্সেস করতে কল করতে পারে।
   string public message;

   // অনেক ক্লাস-ভিত্তিক অবজেক্ট-ওরিয়েন্টেড ভাষার মতো, কনস্ট্রাক্টর হলো একটি বিশেষ ফাংশন যা শুধুমাত্র কন্ট্রাক্ট তৈরির সময় এক্সিকিউট হয়।
   // কন্ট্রাক্টের ডেটা ইনিশিয়ালাইজ করতে কনস্ট্রাক্টর ব্যবহার করা হয়। আরও জানুন:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // একটি স্ট্রিং আর্গুমেন্ট `initMessage` গ্রহণ করে এবং মানটিকে কন্ট্রাক্টের `message` স্টোরেজ ভেরিয়েবলে সেট করে)।
      message = initMessage;
   }

   // একটি পাবলিক ফাংশন যা একটি স্ট্রিং আর্গুমেন্ট গ্রহণ করে এবং `message` স্টোরেজ ভেরিয়েবল আপডেট করে।
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

এটি একটি অত্যন্ত সাধারণ স্মার্ট কন্ট্রাক্ট যা তৈরি করার সময় একটি মেসেজ স্টোর করে এবং `update` ফাংশন কল করে আপডেট করা যায়।

## ধাপ 11: আপনার প্রজেক্টের সাথে MetaMask এবং Alchemy কানেক্ট করুন {#step-11}

আমরা একটি MetaMask ওয়ালেট, Alchemy একাউন্ট তৈরি করেছি এবং আমাদের স্মার্ট কন্ট্রাক্ট লিখেছি, এখন এই তিনটিকে কানেক্ট করার সময়।

আপনার ভার্চুয়াল ওয়ালেট থেকে পাঠানো প্রতিটি লেনদেন-এর জন্য আপনার ইউনিক প্রাইভেট কি ব্যবহার করে একটি সিগনেচার প্রয়োজন। আমাদের প্রোগ্রামকে এই অনুমতি প্রদান করতে, আমরা নিরাপদে আমাদের প্রাইভেট কি (এবং Alchemy API কি) একটি এনভায়রনমেন্ট ফাইলে স্টোর করতে পারি।

> লেনদেন পাঠানো সম্পর্কে আরও জানতে, web3 ব্যবহার করে লেনদেন পাঠানোর উপর [এই টিউটোরিয়ালটি](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) দেখুন।

প্রথমে, আপনার প্রজেক্ট ডিরেক্টরিতে dotenv প্যাকেজটি ইনস্টল করুন:

```
npm install dotenv --save
```

তারপর, আমাদের প্রজেক্টের রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন এবং এতে আপনার MetaMask প্রাইভেট কি এবং HTTP Alchemy API URL যোগ করুন।

- আপনার প্রাইভেট কি এক্সপোর্ট করতে [এই নির্দেশাবলী](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) অনুসরণ করুন
- HTTP Alchemy API URL পেতে নিচে দেখুন

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL কপি করুন

আপনার `.env` ফাইলটি এরকম দেখতে হওয়া উচিত:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

এগুলোকে আমাদের কোডের সাথে কানেক্ট করতে, আমরা ধাপ 13-এ আমাদের `hardhat.config.js` ফাইলে এই ভেরিয়েবলগুলো রেফারেন্স করব।

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> কমিট করবেন না! অনুগ্রহ করে নিশ্চিত করুন যে আপনি কখনই আপনার <code>.env</code> ফাইলটি কারও সাথে শেয়ার বা প্রকাশ করবেন না, কারণ এমনটি করলে আপনি আপনার গোপনীয়তা বিপন্ন করছেন। আপনি যদি ভার্সন কন্ট্রোল ব্যবহার করেন, তবে আপনার <code>.env</code> ফাইলটি একটি <a href="https://git-scm.com/docs/gitignore">gitignore</a> ফাইলে যোগ করুন।
</AlertDescription>
</AlertContent>
</Alert>

## ধাপ 12: Ethers.js ইনস্টল করুন {#step-12-install-ethersjs}

Ethers.js হলো একটি লাইব্রেরি যা [স্ট্যান্ডার্ড JSON-RPC মেথডগুলোকে](/developers/docs/apis/json-rpc/) আরও ইউজার ফ্রেন্ডলি মেথড দিয়ে র‍্যাপ করে ইথিরিয়ামের সাথে ইন্টারঅ্যাক্ট করা এবং রিকোয়েস্ট করা সহজ করে তোলে।

Hardhat অতিরিক্ত টুলিং এবং বর্ধিত কার্যকারিতার জন্য [প্লাগইনস](https://hardhat.org/plugins/) ইন্টিগ্রেট করা খুব সহজ করে তোলে। আমরা কন্ট্রাক্ট ডিপ্লয়মেন্টের জন্য [Ethers প্লাগইন](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)-এর সুবিধা নেব ([Ethers.js](https://github.com/ethers-io/ethers.js/)-এ কিছু খুব পরিষ্কার কন্ট্রাক্ট ডিপ্লয়মেন্ট মেথড রয়েছে)।

আপনার প্রজেক্ট ডিরেক্টরিতে টাইপ করুন:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

পরবর্তী ধাপে আমাদের `hardhat.config.js`-এও ethers প্রয়োজন হবে।

## ধাপ 13: hardhat.config.js আপডেট করুন {#step-13-update-hardhatconfigjs}

আমরা এ পর্যন্ত বেশ কয়েকটি ডিপেন্ডেন্সি এবং প্লাগইন যোগ করেছি, এখন আমাদের `hardhat.config.js` আপডেট করতে হবে যাতে আমাদের প্রজেক্ট এগুলোর সব সম্পর্কে জানতে পারে।

আপনার `hardhat.config.js` আপডেট করে এরকম করুন:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## ধাপ 14: আমাদের কন্ট্রাক্ট কম্পাইল করুন {#step-14-compile-our-contracts}

এ পর্যন্ত সবকিছু ঠিকঠাক কাজ করছে কিনা তা নিশ্চিত করতে, চলুন আমাদের কন্ট্রাক্ট কম্পাইল করি। `compile` টাস্কটি হলো একটি বিল্ট-ইন hardhat টাস্ক।

কমান্ড লাইন থেকে রান করুন:

```
npx hardhat compile
```

আপনি `SPDX license identifier not provided in source file` সম্পর্কে একটি ওয়ার্নিং পেতে পারেন, তবে এটি নিয়ে চিন্তা করার দরকার নেই — আশা করি অন্য সবকিছু ঠিক আছে! যদি না হয়, আপনি সবসময় [Alchemy discord](https://discord.gg/u72VCg3)-এ মেসেজ করতে পারেন।

## ধাপ 15: আমাদের ডিপ্লয় স্ক্রিপ্ট লিখুন {#step-15-write-our-deploy-scripts}

এখন যেহেতু আমাদের কন্ট্রাক্ট লেখা হয়েছে এবং আমাদের কনফিগারেশন ফাইল প্রস্তুত, এখন আমাদের কন্ট্রাক্ট ডিপ্লয় স্ক্রিপ্ট লেখার সময়।

`scripts/` ফোল্ডারে যান এবং `deploy.js` নামে একটি নতুন ফাইল তৈরি করুন, এতে নিচের বিষয়বস্তু যোগ করুন:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat তাদের [কন্ট্রাক্টস টিউটোরিয়াল](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)-এ এই কোডের প্রতিটি লাইন কী করে তা খুব সুন্দরভাবে ব্যাখ্যা করে, আমরা এখানে তাদের ব্যাখ্যাগুলো গ্রহণ করেছি।

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js-এ একটি `ContractFactory` হলো নতুন স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার জন্য ব্যবহৃত একটি অ্যাবস্ট্রাকশন, তাই এখানে `HelloWorld` হলো আমাদের হ্যালো ওয়ার্ল্ড কন্ট্রাক্টের ইনস্ট্যান্সগুলোর জন্য একটি ফ্যাক্টরি। `hardhat-ethers` প্লাগইন ব্যবহার করার সময় `ContractFactory` এবং `Contract` ইনস্ট্যান্সগুলো ডিফল্টভাবে প্রথম সাইনারের সাথে কানেক্টেড থাকে।

```
const hello_world = await HelloWorld.deploy();
```

একটি `ContractFactory`-তে `deploy()` কল করলে ডিপ্লয়মেন্ট শুরু হবে এবং একটি `Promise` রিটার্ন করবে যা একটি `Contract`-এ রিজলভ হয়। এটি হলো সেই অবজেক্ট যার আমাদের প্রতিটি স্মার্ট কন্ট্রাক্ট ফাংশনের জন্য একটি মেথড রয়েছে।

## ধাপ 16: আমাদের কন্ট্রাক্ট ডিপ্লয় করুন {#step-16-deploy-our-contract}

আমরা অবশেষে আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে প্রস্তুত! কমান্ড লাইনে যান এবং রান করুন:

```
npx hardhat run scripts/deploy.js --network sepolia
```

এরপর আপনি এরকম কিছু দেখতে পাবেন:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

যদি আমরা [Sepolia etherscan](https://sepolia.etherscan.io/)-এ যাই এবং আমাদের কন্ট্রাক্ট এডড্রেস সার্চ করি তবে আমরা দেখতে পাব যে এটি সফলভাবে ডিপ্লয় হয়েছে। লেনদেন-টি দেখতে এরকম হবে:

![etherscan contract](./etherscan-contract.png)

`From` এডড্রেস-টি আপনার MetaMask একাউন্ট এডড্রেস-এর সাথে মিলতে হবে এবং To এডড্রেস-এ “Contract Creation” লেখা থাকবে কিন্তু যদি আমরা লেনদেন-এ ক্লিক করি তবে আমরা `To` ফিল্ডে আমাদের কন্ট্রাক্ট এডড্রেস দেখতে পাব:

![etherscan transaction](./etherscan-transaction.png)

অভিনন্দন! আপনি এইমাত্র ইথিরিয়াম চেইনে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করেছেন 🎉

ভেতরে কী ঘটছে তা বুঝতে, চলুন আমাদের [Alchemy ড্যাশবোর্ড](https://dashboard.alchemyapi.io/explorer)-এর এক্সপ্লোরার ট্যাবে যাই। যদি আপনার একাধিক Alchemy অ্যাপ থাকে তবে অ্যাপ দ্বারা ফিল্টার করতে ভুলবেন না এবং “Hello World” নির্বাচন করুন।
![hello world explorer](./hello-world-explorer.png)

এখানে আপনি বেশ কয়েকটি JSON-RPC কল দেখতে পাবেন যা Hardhat/Ethers আমাদের জন্য ভেতরে তৈরি করেছে যখন আমরা `.deploy()` ফাংশন কল করেছি। এখানে উল্লেখ করার মতো দুটি গুরুত্বপূর্ণ কল হলো [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), যা আসলে Sepolia চেইনে আমাদের কন্ট্রাক্ট লেখার রিকোয়েস্ট, এবং [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) যা হ্যাস দেওয়া থাকলে আমাদের লেনদেন সম্পর্কে তথ্য পড়ার একটি রিকোয়েস্ট (লেনদেন-এর ক্ষেত্রে একটি সাধারণ প্যাটার্ন)। লেনদেন পাঠানো সম্পর্কে আরও জানতে, [Web3 ব্যবহার করে লেনদেন পাঠানোর](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) উপর এই টিউটোরিয়ালটি দেখুন।

এই টিউটোরিয়ালের পার্ট 1-এর জন্য এটুকুই, পার্ট 2-এ আমরা আমাদের প্রাথমিক মেসেজ আপডেট করে আসলে [আমাদের স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করব](https://www.alchemy.com/docs/interacting-with-a-smart-contract), এবং পার্ট 3-এ আমরা [আমাদের স্মার্ট কন্ট্রাক্ট Etherscan-এ পাবলিশ করব](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) যাতে সবাই জানতে পারে কীভাবে এর সাথে ইন্টারঅ্যাক্ট করতে হয়।

**Alchemy সম্পর্কে আরও জানতে চান? আমাদের [ওয়েবসাইট](https://www.alchemy.com/eth) দেখুন। কোনো আপডেট মিস করতে চান না? [এখানে](https://www.alchemy.com/newsletter) আমাদের নিউজলেটারে সাবস্ক্রাইব করুন! আমাদের [Discord](https://discord.gg/u72VCg3)-এও যোগ দিতে ভুলবেন না।**