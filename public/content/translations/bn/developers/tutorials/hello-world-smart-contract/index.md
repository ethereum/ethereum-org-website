---
title: "নতুনদের জন্য হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট"
description: "ইথেরিয়ামে একটি সাধারণ স্মার্ট কন্ট্রাক্ট লেখা এবং ডিপ্লয় করার প্রাথমিক টিউটোরিয়াল।"
author: "এলানএইচ"
tags: ["Solidity", "Hardhat", "Alchemy", "স্মার্ট কন্ট্রাক্ট", "ডিপ্লয় করা"]
skill: beginner
breadcrumb: "হ্যালো ওয়ার্ল্ড কন্ট্রাক্ট"
lang: bn
published: 2021-03-31
---

আপনি যদি ব্লকচেইন ডেভেলপমেন্টে নতুন হয়ে থাকেন এবং কোথা থেকে শুরু করবেন তা না জানেন, অথবা আপনি যদি শুধু বুঝতে চান কীভাবে স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয়, তবে এই গাইডটি আপনার জন্য। আমরা একটি ভার্চুয়াল ওয়ালেট [মেটামাস্ক](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), এবং [Alchemy](https://www.alchemy.com/eth) ব্যবহার করে Sepolia টেস্ট নেটওয়ার্কে একটি সাধারণ স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করার প্রক্রিয়াটি ধাপে ধাপে দেখব (যদি আপনি এখনও এগুলোর অর্থ না বোঝেন তবে চিন্তা করবেন না, আমরা এটি ব্যাখ্যা করব)।

এই টিউটোরিয়ালের [পার্ট 2](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract)-এ আমরা দেখব কীভাবে আমাদের স্মার্ট কন্ট্রাক্ট এখানে ডিপ্লয় হওয়ার পর আমরা এর সাথে ইন্টারঅ্যাক্ট করতে পারি, এবং [পার্ট 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan)-এ আমরা এটি Etherscan-এ কীভাবে প্রকাশ করতে হয় তা কভার করব।

যেকোনো পর্যায়ে আপনার যদি কোনো প্রশ্ন থাকে, তবে নির্দ্বিধায় [Alchemy ডিসকর্ড](https://discord.gg/gWuC7zB)-এ যোগাযোগ করুন!

## ধাপ 1: ইথেরিয়াম নেটওয়ার্কের সাথে কানেক্ট করুন {#step-1}

ইথেরিয়াম চেইনে রিকোয়েস্ট করার অনেক উপায় আছে। সহজে বোঝার জন্য, আমরা Alchemy-তে একটি বিনামূল্যের অ্যাকাউন্ট ব্যবহার করব, যা একটি ব্লকচেইন ডেভেলপার প্ল্যাটফর্ম এবং API, এটি আমাদের নিজস্ব নোড না চালিয়েই ইথেরিয়াম চেইনের সাথে যোগাযোগ করতে দেয়। প্ল্যাটফর্মটিতে মনিটরিং এবং অ্যানালিটিক্সের জন্য ডেভেলপার টুলও রয়েছে, যা আমরা এই টিউটোরিয়ালে ব্যবহার করে বুঝব যে আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয়মেন্টের ভেতরে আসলে কী ঘটছে। আপনার যদি আগে থেকেই কোনো Alchemy অ্যাকাউন্ট না থাকে, তবে [আপনি এখানে বিনামূল্যে সাইন আপ করতে পারেন](https://dashboard.alchemy.com/signup)।

## ধাপ 2: আপনার অ্যাপ (এবং API কী) তৈরি করুন {#step-2}

একবার আপনি একটি Alchemy অ্যাকাউন্ট তৈরি করলে, আপনি একটি অ্যাপ তৈরি করে একটি API কী জেনারেট করতে পারেন। এটি আমাদের Sepolia টেস্ট নেটওয়ার্কে রিকোয়েস্ট করার অনুমতি দেবে। আপনি যদি টেস্টনেট সম্পর্কে পরিচিত না হন, তবে [এই পেজটি](/developers/docs/networks/) দেখুন।

1.  ন্যাভ বারে "Select an app" নির্বাচন করে এবং "Create new app"-এ ক্লিক করে আপনার Alchemy ড্যাশবোর্ডের "Create new app" পেজে যান

![Hello world create app](./hello-world-create-app.png)

2. আপনার অ্যাপের নাম দিন “Hello World”, একটি সংক্ষিপ্ত বিবরণ দিন এবং একটি ইউজ কেস বেছে নিন, যেমন, "Infra & Tooling"। এরপর, "Ethereum" সার্চ করুন এবং নেটওয়ার্ক নির্বাচন করুন।

![create app view hello world](./create-app-view-hello-world.png)

3. এগিয়ে যেতে "Next"-এ ক্লিক করুন, তারপর “Create app” এবং কাজ শেষ! আপনার অ্যাপটি ন্যাভ বারের ড্রপডাউন মেনুতে দেখা যাবে, যেখান থেকে একটি API কী কপি করা যাবে।

## ধাপ 3: একটি ইথেরিয়াম অ্যাকাউন্ট (ঠিকানা) তৈরি করুন {#step-3}

ট্রানজ্যাকশন পাঠানো এবং গ্রহণ করার জন্য আমাদের একটি ইথেরিয়াম অ্যাকাউন্ট প্রয়োজন। এই টিউটোরিয়ালের জন্য, আমরা মেটামাস্ক ব্যবহার করব, যা ব্রাউজারে থাকা একটি ভার্চুয়াল ওয়ালেট এবং এটি আপনার ইথেরিয়াম অ্যাকাউন্ট ঠিকানা পরিচালনা করতে ব্যবহৃত হয়। [ট্রানজ্যাকশন](/developers/docs/transactions/) সম্পর্কে আরও জানুন।

আপনি মেটামাস্ক ডাউনলোড করতে পারেন এবং বিনামূল্যে একটি ইথেরিয়াম অ্যাকাউন্ট তৈরি করতে পারেন [এখানে](https://metamask.io/download)। যখন আপনি একটি অ্যাকাউন্ট তৈরি করছেন, অথবা আপনার যদি আগে থেকেই একটি অ্যাকাউন্ট থাকে, তবে নেটওয়ার্ক ড্রপডাউন মেনু ব্যবহার করে "Sepolia" টেস্ট নেটওয়ার্কে স্যুইচ করতে ভুলবেন না (যাতে আমরা আসল টাকা নিয়ে কাজ না করি)।

যদি আপনি Sepolia তালিকাভুক্ত না দেখেন, তবে মেনুতে যান, তারপর Advanced-এ যান এবং নিচে স্ক্রোল করে "Show test networks" চালু করুন। নেটওয়ার্ক নির্বাচন মেনুতে, টেস্টনেটগুলোর একটি তালিকা খুঁজতে "Custom" ট্যাবটি বেছে নিন এবং "Sepolia" নির্বাচন করুন।

![metamask sepolia example](./metamask-sepolia-example.png)

## ধাপ 4: একটি ফসেট থেকে ইথার যোগ করুন {#step-4}

টেস্ট নেটওয়ার্কে আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার জন্য, আমাদের কিছু নকল ETH প্রয়োজন হবে। Sepolia ETH পেতে আপনি বিভিন্ন ফসেটের তালিকা দেখতে [Sepolia নেটওয়ার্কের বিবরণ](/developers/docs/networks/#sepolia)-এ যেতে পারেন। যদি একটি কাজ না করে, তবে অন্যটি চেষ্টা করুন কারণ এগুলো মাঝে মাঝে খালি হয়ে যেতে পারে। নেটওয়ার্ক ট্রাফিকের কারণে আপনার নকল ETH পেতে কিছুটা সময় লাগতে পারে। এর কিছুক্ষণ পরেই আপনার মেটামাস্ক অ্যাকাউন্টে ETH দেখতে পাবেন!

## ধাপ 5: আপনার ব্যালেন্স চেক করুন {#step-5}

আমাদের ব্যালেন্স সেখানে আছে কিনা তা নিশ্চিত করতে, চলুন [Alchemy-এর কম্পোজার টুল](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) ব্যবহার করে একটি [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) রিকোয়েস্ট করি। এটি আমাদের ওয়ালেটে থাকা ETH-এর পরিমাণ রিটার্ন করবে। আপনার মেটামাস্ক অ্যাকাউন্ট ঠিকানা ইনপুট করার পর এবং “Send Request”-এ ক্লিক করার পর, আপনি এইরকম একটি রেসপন্স দেখতে পাবেন:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **নোট:** এই ফলাফলটি Wei-তে, ETH-এ নয়। Wei ইথারের সবচেয়ে ছোট একক হিসেবে ব্যবহৃত হয়। Wei থেকে ETH-এ রূপান্তর হলো: 1 eth = 10<sup>18</sup> wei। তাই যদি আমরা 0x2B5E3AF16B1880000 কে ডেসিমালে রূপান্তর করি তবে আমরা 5\*10¹⁸ পাই যা 5 ETH এর সমান।
>
> যাক! আমাদের সব নকল টাকা সেখানেই আছে <Emoji text=":money_mouth_face:" size={1} />।

## ধাপ 6: আমাদের প্রজেক্ট ইনিশিয়ালাইজ করুন {#step-6}

প্রথমে, আমাদের প্রজেক্টের জন্য একটি ফোল্ডার তৈরি করতে হবে। আপনার কমান্ড লাইনে যান এবং টাইপ করুন:

```
mkdir hello-world
cd hello-world
```

এখন যেহেতু আমরা আমাদের প্রজেক্ট ফোল্ডারের ভেতরে আছি, তাই প্রজেক্টটি ইনিশিয়ালাইজ করতে আমরা `npm init` ব্যবহার করব। যদি আপনার আগে থেকেই npm ইনস্টল করা না থাকে, তবে [Node.js ইনস্টলেশন নির্দেশিকা](https://nodejs.org/en/download/) অনুসরণ করুন (এই টিউটোরিয়ালের জন্য আমাদের Node.js এবং npm প্রয়োজন হবে)।

```
npm init
```

আপনি ইনস্টলেশনের প্রশ্নগুলোর উত্তর কীভাবে দিচ্ছেন তা খুব একটা গুরুত্বপূর্ণ নয়, রেফারেন্সের জন্য আমরা এটি কীভাবে করেছি তা নিচে দেওয়া হলো:

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
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json অনুমোদন করুন এবং আমরা কাজ শুরু করতে প্রস্তুত!
## ধাপ 7: [Hardhat](https://hardhat.org/getting-started/#overview) ডাউনলোড করুন {#step-7}

Hardhat হলো আপনার ইথেরিয়াম সফটওয়্যার কম্পাইল, ডিপ্লয়, টেস্ট এবং ডিবাগ করার জন্য একটি ডেভেলপমেন্ট এনভায়রনমেন্ট। এটি লাইভ চেইনে ডিপ্লয় করার আগে স্থানীয়ভাবে স্মার্ট কন্ট্রাক্ট এবং বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করার সময় ডেভেলপারদের সাহায্য করে।

আমাদের `hello-world` প্রজেক্টের ভেতরে রান করুন:

```
npm install --save-dev hardhat
```

[ইনস্টলেশন নির্দেশিকা](https://hardhat.org/getting-started/#overview) সম্পর্কে আরও বিস্তারিত জানতে এই পেজটি দেখুন।

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

আমাদের প্রজেক্টটি গুছিয়ে রাখতে আমরা দুটি নতুন ফোল্ডার তৈরি করব। আপনার কমান্ড লাইনে প্রজেক্টের রুট ডিরেক্টরিতে যান এবং টাইপ করুন:

```
mkdir contracts
mkdir scripts
```

- `contracts/` হলো সেই জায়গা যেখানে আমরা আমাদের হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট কোড ফাইলটি রাখব
- `scripts/` হলো সেই জায়গা যেখানে আমরা আমাদের কন্ট্রাক্ট ডিপ্লয় এবং এর সাথে ইন্টারঅ্যাক্ট করার স্ক্রিপ্টগুলো রাখব

## ধাপ 10: আমাদের কন্ট্রাক্ট লিখুন {#step-10}

আপনি হয়তো নিজেকে জিজ্ঞাসা করছেন, আমরা কখন কোড লিখতে যাচ্ছি?? ঠিক আছে, আমরা ধাপ 10-এ চলে এসেছি।

আপনার পছন্দের এডিটরে (আমাদের পছন্দ [VSCode](https://code.visualstudio.com/)) hello-world প্রজেক্টটি খুলুন। স্মার্ট কন্ট্রাক্টগুলো Solidity নামক একটি ভাষায় লেখা হয় যা আমরা আমাদের HelloWorld.sol স্মার্ট কন্ট্রাক্ট লিখতে ব্যবহার করব।‌

1.  “contracts” ফোল্ডারে যান এবং HelloWorld.sol নামে একটি নতুন ফাইল তৈরি করুন
2.  নিচে ইথেরিয়াম ফাউন্ডেশন থেকে একটি নমুনা হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট দেওয়া হলো যা আমরা এই টিউটোরিয়ালের জন্য ব্যবহার করব। নিচের বিষয়বস্তুগুলো কপি করে আপনার HelloWorld.sol ফাইলে পেস্ট করুন এবং এই কন্ট্রাক্টটি কী করে তা বুঝতে কমেন্টগুলো পড়তে ভুলবেন না:

```solidity
// সিমান্টিক ভার্সনিং ব্যবহার করে Solidity-এর ভার্সন নির্দিষ্ট করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` নামের একটি কন্ট্রাক্ট সংজ্ঞায়িত করে।
// একটি কন্ট্রাক্ট হলো ফাংশন এবং ডেটার (এর স্টেট) একটি সংগ্রহ। একবার ডিপ্লয় করা হলে, একটি কন্ট্রাক্ট ইথেরিয়াম ব্লকচেইন-এর একটি নির্দিষ্ট ঠিকানায় অবস্থান করে। আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` টাইপের একটি স্টেট ভেরিয়েবল `message` ঘোষণা করে।
   // স্টেট ভেরিয়েবল হলো সেই ভেরিয়েবল যার মান স্থায়ীভাবে কন্ট্রাক্ট স্টোরেজে সংরক্ষিত থাকে। `public` কিওয়ার্ডটি ভেরিয়েবলগুলোকে একটি কন্ট্রাক্ট-এর বাইরে থেকে অ্যাক্সেসযোগ্য করে তোলে এবং এমন একটি ফাংশন তৈরি করে যা অন্যান্য কন্ট্রাক্ট বা ক্লায়েন্টরা মানটি অ্যাক্সেস করতে কল করতে পারে।
   string public message;

   // অনেক ক্লাস-ভিত্তিক অবজেক্ট-ওরিয়েন্টেড ভাষার মতো, কনস্ট্রাক্টর হলো একটি বিশেষ ফাংশন যা শুধুমাত্র কন্ট্রাক্ট তৈরির সময় এক্সিকিউট হয়।
   // কনস্ট্রাক্টরগুলো কন্ট্রাক্ট-এর ডেটা ইনিশিয়ালাইজ করতে ব্যবহৃত হয়। আরও জানুন:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // একটি স্ট্রিং আর্গুমেন্ট `initMessage` গ্রহণ করে এবং মানটিকে কন্ট্রাক্ট-এর `message` স্টোরেজ ভেরিয়েবলে সেট করে)।
      message = initMessage;
   }

   // একটি পাবলিক ফাংশন যা একটি স্ট্রিং আর্গুমেন্ট গ্রহণ করে এবং `message` স্টোরেজ ভেরিয়েবলটি আপডেট করে।
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

এটি একটি অত্যন্ত সাধারণ স্মার্ট কন্ট্রাক্ট যা তৈরি করার সময় একটি বার্তা সংরক্ষণ করে এবং `update` ফাংশন কল করে আপডেট করা যায়।

## ধাপ 11: আপনার প্রজেক্টের সাথে মেটামাস্ক এবং Alchemy কানেক্ট করুন {#step-11}

আমরা একটি মেটামাস্ক ওয়ালেট, Alchemy অ্যাকাউন্ট তৈরি করেছি এবং আমাদের স্মার্ট কন্ট্রাক্ট লিখেছি, এখন এই তিনটিকে কানেক্ট করার সময়।

আপনার ভার্চুয়াল ওয়ালেট থেকে পাঠানো প্রতিটি ট্রানজ্যাকশনের জন্য আপনার ইউনিক প্রাইভেট কী ব্যবহার করে একটি স্বাক্ষর প্রয়োজন। আমাদের প্রোগ্রামকে এই অনুমতি দেওয়ার জন্য, আমরা নিরাপদে আমাদের প্রাইভেট কী (এবং Alchemy API কী) একটি এনভায়রনমেন্ট ফাইলে সংরক্ষণ করতে পারি।

> ট্রানজ্যাকশন পাঠানো সম্পর্কে আরও জানতে, Web3 ব্যবহার করে ট্রানজ্যাকশন পাঠানোর ওপর [এই টিউটোরিয়ালটি](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) দেখুন।

প্রথমে, আপনার প্রজেক্ট ডিরেক্টরিতে dotenv প্যাকেজটি ইনস্টল করুন:

```
npm install dotenv --save
```

তারপর, আমাদের প্রজেক্টের রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন এবং এতে আপনার মেটামাস্ক প্রাইভেট কী এবং HTTP Alchemy API URL যোগ করুন।

- আপনার প্রাইভেট কী এক্সপোর্ট করতে [এই নির্দেশিকাগুলো](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) অনুসরণ করুন
- HTTP Alchemy API URL পেতে নিচে দেখুন

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL কপি করুন

আপনার `.env` দেখতে এইরকম হওয়া উচিত:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

এগুলোকে আমাদের কোডের সাথে কানেক্ট করতে, আমরা ধাপ 13-এ আমাদের `hardhat.config.js` ফাইলে এই ভেরিয়েবলগুলোর রেফারেন্স দেব।

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> কমিট করবেন না! অনুগ্রহ করে নিশ্চিত করুন যে আপনি কখনই আপনার <code>.env</code> ফাইলটি কারও সাথে শেয়ার বা প্রকাশ করবেন না, কারণ এমনটি করলে আপনি আপনার গোপনীয়তা ঝুঁকিতে ফেলছেন। আপনি যদি ভার্সন কন্ট্রোল ব্যবহার করেন, তবে আপনার <code>.env</code> ফাইলটি একটি <a href="https://git-scm.com/docs/gitignore">gitignore</a> ফাইলে যোগ করুন।
</AlertDescription>
</AlertContent>
</Alert>

## ধাপ 12: Ethers.js ইনস্টল করুন {#step-12-install-ethersjs}

Ethers.js হলো একটি লাইব্রেরি যা [স্ট্যান্ডার্ড জেসন-আরপিসি মেথডগুলোকে](/developers/docs/apis/json-rpc/) আরও ইউজার ফ্রেন্ডলি মেথড দিয়ে র‍্যাপ করে ইথেরিয়ামের সাথে ইন্টারঅ্যাক্ট করা এবং রিকোয়েস্ট করা সহজ করে তোলে।

অতিরিক্ত টুলিং এবং বর্ধিত কার্যকারিতার জন্য [প্লাগইন](https://hardhat.org/plugins/) ইন্টিগ্রেট করা Hardhat অত্যন্ত সহজ করে তোলে। আমরা কন্ট্রাক্ট ডিপ্লয়মেন্টের জন্য [Ethers প্লাগইন](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)-এর সুবিধা নেব ([Ethers.js](https://github.com/ethers-io/ethers.js/)-এ কিছু খুব সুন্দর কন্ট্রাক্ট ডিপ্লয়মেন্ট মেথড রয়েছে)।

আপনার প্রজেক্ট ডিরেক্টরিতে টাইপ করুন:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

পরবর্তী ধাপে আমাদের `hardhat.config.js`-এও ethers রিকোয়ার করতে হবে।

## ধাপ 13: hardhat.config.js আপডেট করুন {#step-13-update-hardhatconfigjs}

আমরা এ পর্যন্ত বেশ কয়েকটি ডিপেন্ডেন্সি এবং প্লাগইন যোগ করেছি, এখন আমাদের `hardhat.config.js` আপডেট করতে হবে যাতে আমাদের প্রজেক্ট এগুলোর সব সম্পর্কে জানতে পারে।

আপনার `hardhat.config.js` আপডেট করে এইরকম করুন:

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

এ পর্যন্ত সবকিছু ঠিকঠাক কাজ করছে কিনা তা নিশ্চিত করতে, চলুন আমাদের কন্ট্রাক্ট কম্পাইল করি। `compile` টাস্কটি হলো বিল্ট-ইন Hardhat টাস্কগুলোর মধ্যে একটি।

কমান্ড লাইন থেকে রান করুন:

```
npx hardhat compile
```

আপনি হয়তো `SPDX license identifier not provided in source file` সম্পর্কে একটি সতর্কতা পেতে পারেন, তবে এটি নিয়ে চিন্তা করার কোনো কারণ নেই — আশা করি বাকি সবকিছু ঠিক আছে! যদি না থাকে, তবে আপনি সবসময় [Alchemy ডিসকর্ড](https://discord.gg/u72VCg3)-এ মেসেজ করতে পারেন।

## ধাপ 15: আমাদের ডিপ্লয় স্ক্রিপ্ট লিখুন {#step-15-write-our-deploy-scripts}

এখন যেহেতু আমাদের কন্ট্রাক্ট লেখা হয়ে গেছে এবং আমাদের কনফিগারেশন ফাইল প্রস্তুত, তাই এখন আমাদের কন্ট্রাক্ট ডিপ্লয় স্ক্রিপ্ট লেখার সময়।

`scripts/` ফোল্ডারে যান এবং `deploy.js` নামে একটি নতুন ফাইল তৈরি করুন, এতে নিচের বিষয়বস্তুগুলো যোগ করুন:

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

Hardhat তাদের [কন্ট্রাক্ট টিউটোরিয়ালে](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) কোডের এই প্রতিটি লাইন কী করে তা খুব সুন্দরভাবে ব্যাখ্যা করেছে, আমরা এখানে তাদের ব্যাখ্যাগুলোই গ্রহণ করেছি।

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js-এ একটি `ContractFactory` হলো একটি অ্যাবস্ট্রাকশন যা নতুন স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে ব্যবহৃত হয়, তাই এখানে `HelloWorld` হলো আমাদের হ্যালো ওয়ার্ল্ড কন্ট্রাক্টের ইনস্ট্যান্সগুলোর জন্য একটি ফ্যাক্টরি। `hardhat-ethers` প্লাগইন ব্যবহার করার সময় `ContractFactory` এবং `Contract` ইনস্ট্যান্সগুলো ডিফল্টভাবে প্রথম স্বাক্ষরকারীর সাথে কানেক্টেড থাকে।

```
const hello_world = await HelloWorld.deploy();
```

একটি `ContractFactory`-এ `deploy()` কল করলে ডিপ্লয়মেন্ট শুরু হবে এবং একটি `Promise` রিটার্ন করবে যা একটি `Contract`-এ রিজলভ হয়। এটি হলো সেই অবজেক্ট যার মধ্যে আমাদের স্মার্ট কন্ট্রাক্টের প্রতিটি ফাংশনের জন্য একটি মেথড রয়েছে।

## ধাপ 16: আমাদের কন্ট্রাক্ট ডিপ্লয় করুন {#step-16-deploy-our-contract}

আমরা অবশেষে আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে প্রস্তুত! কমান্ড লাইনে যান এবং রান করুন:

```
npx hardhat run scripts/deploy.js --network sepolia
```

এরপর আপনি এইরকম কিছু দেখতে পাবেন:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

যদি আমরা [Sepolia Etherscan](https://sepolia.etherscan.io/)-এ যাই এবং আমাদের কন্ট্রাক্ট ঠিকানা সার্চ করি তবে আমরা দেখতে পাব যে এটি সফলভাবে ডিপ্লয় হয়েছে। ট্রানজ্যাকশনটি দেখতে এইরকম হবে:

![etherscan contract](./etherscan-contract.png)

`From` ঠিকানাটি আপনার মেটামাস্ক অ্যাকাউন্ট ঠিকানার সাথে মিলে যাওয়া উচিত এবং To ঠিকানায় “Contract Creation” লেখা থাকবে, তবে আমরা যদি ট্রানজ্যাকশনে ক্লিক করি তবে আমরা `To` ফিল্ডে আমাদের কন্ট্রাক্ট ঠিকানা দেখতে পাব:

![etherscan transaction](./etherscan-transaction.png)

অভিনন্দন! আপনি এইমাত্র ইথেরিয়াম চেইনে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করেছেন 🎉

ভেতরে আসলে কী ঘটছে তা বুঝতে, চলুন আমাদের [Alchemy ড্যাশবোর্ডের](https://dashboard.alchemy.com/explorer) এক্সপ্লোরার ট্যাবে যাই। আপনার যদি একাধিক Alchemy অ্যাপ থাকে তবে অ্যাপ অনুযায়ী ফিল্টার করতে ভুলবেন না এবং “Hello World” নির্বাচন করুন।
![hello world explorer](./hello-world-explorer.png)

এখানে আপনি বেশ কয়েকটি জেসন-আরপিসি কল দেখতে পাবেন যা Hardhat/Ethers আমাদের জন্য ভেতরে ভেতরে তৈরি করেছে যখন আমরা `.deploy()` ফাংশনটি কল করেছিলাম। এখানে উল্লেখ করার মতো দুটি গুরুত্বপূর্ণ কল হলো [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), যা মূলত Sepolia চেইনে আমাদের কন্ট্রাক্ট লেখার রিকোয়েস্ট, এবং [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash) যা হ্যাশ দেওয়া থাকলে আমাদের ট্রানজ্যাকশন সম্পর্কে তথ্য পড়ার একটি রিকোয়েস্ট (ট্রানজ্যাকশনের ক্ষেত্রে একটি সাধারণ প্যাটার্ন)। ট্রানজ্যাকশন পাঠানো সম্পর্কে আরও জানতে, [Web3 ব্যবহার করে ট্রানজ্যাকশন পাঠানোর](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) ওপর এই টিউটোরিয়ালটি দেখুন।

এই টিউটোরিয়ালের পার্ট 1-এর জন্য এটুকুই, পার্ট 2-এ আমরা আমাদের প্রাথমিক বার্তা আপডেট করে আমাদের [স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করব](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract), এবং পার্ট 3-এ আমরা [Etherscan-এ আমাদের স্মার্ট কন্ট্রাক্ট প্রকাশ করব](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) যাতে সবাই জানতে পারে কীভাবে এর সাথে ইন্টারঅ্যাক্ট করতে হয়।

**Alchemy সম্পর্কে আরও জানতে চান? আমাদের [ওয়েবসাইট](https://www.alchemy.com/eth) দেখুন। কোনো আপডেট মিস করতে চান না? [এখানে](https://www.alchemy.com/newsletter) আমাদের নিউজলেটারে সাবস্ক্রাইব করুন! আমাদের [ডিসকর্ড](https://discord.gg/u72VCg3)-এও যোগ দিতে ভুলবেন না।**।
