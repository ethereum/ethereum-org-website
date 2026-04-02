---
title: "নতুনদের জন্য হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট - ফুলস্ট্যাক"
description: "ইথেরিয়ামে একটি সাধারণ স্মার্ট কন্ট্রাক্ট লেখা এবং ডিপ্লয় করার উপর প্রাথমিক টিউটোরিয়াল।"
author: "nstrike2"
breadcrumb: "হ্যালো ওয়ার্ল্ড ফুলস্ট্যাক"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "স্মার্ট কন্ট্রাক্ট",
    "ডিপ্লয়িং",
    "ব্লক এক্সপ্লোরার",
    "ফ্রন্টএন্ড",
    "লেনদেন",
    "ফ্রেমওয়ার্ক",
  ]
skill: beginner
lang: bn
published: 2021-10-25
---

আপনি যদি ব্লকচেইন ডেভেলপমেন্টে নতুন হয়ে থাকেন এবং কোথা থেকে শুরু করবেন বা কীভাবে স্মার্ট কন্ট্রাক্ট ডিপ্লয় এবং এর সাথে ইন্টারঅ্যাক্ট করবেন তা না জানেন, তবে এই গাইডটি আপনার জন্য। আমরা [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), এবং [Alchemy](https://alchemy.com/eth) ব্যবহার করে Goerli টেস্ট নেটওয়ার্কে একটি সাধারণ স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করার প্রক্রিয়া ধাপে ধাপে দেখব।

এই টিউটোরিয়ালটি সম্পূর্ণ করতে আপনার একটি Alchemy একাউন্ট প্রয়োজন হবে। [একটি বিনামূল্যের একাউন্টের জন্য সাইন আপ করুন](https://www.alchemy.com/)।

যেকোনো পর্যায়ে আপনার যদি কোনো প্রশ্ন থাকে, তবে নির্দ্বিধায় [Alchemy Discord](https://discord.gg/gWuC7zB)-এ যোগাযোগ করুন!

## পর্ব 1 - Hardhat ব্যবহার করে আপনার স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করুন {#part-1}

### ইথিরিয়াম নেটওয়ার্ক-এর সাথে কানেক্ট করুন {#connect-to-the-ethereum-network}

ইথিরিয়াম চেইনে রিকোয়েস্ট করার অনেক উপায় আছে। সহজে করার জন্য, আমরা Alchemy-তে একটি ফ্রি একাউন্ট ব্যবহার করব, যা একটি ব্লকচেইন ডেভেলপার প্ল্যাটফর্ম এবং API, এটি আমাদের নিজেদের কোনো নোড না চালিয়েই ইথিরিয়াম চেইনের সাথে যোগাযোগ করতে দেয়। Alchemy-তে মনিটরিং এবং অ্যানালিটিক্সের জন্য ডেভেলপার টুলসও রয়েছে; আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয়মেন্টের ভেতরে কী ঘটছে তা বোঝার জন্য আমরা এই টিউটোরিয়ালে সেগুলোর সুবিধা নেব।

### আপনার অ্যাপ এবং API কি তৈরি করুন {#create-your-app-and-api-key}

একবার আপনি একটি Alchemy একাউন্ট তৈরি করলে, আপনি একটি অ্যাপ তৈরি করে একটি API কি জেনারেট করতে পারেন। এটি আপনাকে Goerli টেস্টনেট-এ রিকোয়েস্ট করার অনুমতি দেবে। আপনি যদি টেস্টনেট-এর সাথে পরিচিত না হন তবে আপনি [নেটওয়ার্ক বেছে নেওয়ার বিষয়ে Alchemy-এর গাইড পড়তে পারেন](https://www.alchemy.com/docs/choosing-a-web3-network)।

Alchemy ড্যাশবোর্ডে, নেভিগেশন বারে **Apps** ড্রপডাউনটি খুঁজুন এবং **Create App**-এ ক্লিক করুন।

![Hello world create app](./hello-world-create-app.png)

আপনার অ্যাপটির নাম দিন '_Hello World_' এবং একটি ছোট বিবরণ লিখুন। আপনার এনভায়রনমেন্ট হিসেবে **Staging** এবং আপনার নেটওয়ার্ক হিসেবে **Goerli** নির্বাচন করুন।

![create app view hello world](./create-app-view-hello-world.png)

_নোট: অবশ্যই **Goerli** নির্বাচন করবেন, অন্যথায় এই টিউটোরিয়ালটি কাজ করবে না।_

**Create app**-এ ক্লিক করুন। আপনার অ্যাপটি নিচের টেবিলে দেখা যাবে।

### একটি ইথিরিয়াম একাউন্ট তৈরি করুন {#create-an-ethereum-account}

লেনদেন পাঠানো এবং গ্রহণ করার জন্য আপনার একটি ইথিরিয়াম একাউন্ট প্রয়োজন। আমরা MetaMask ব্যবহার করব, যা ব্রাউজারের একটি ভার্চুয়াল ওয়ালেট এবং এটি ব্যবহারকারীদের তাদের ইথিরিয়াম একাউন্ট এডড্রেস পরিচালনা করতে দেয়।

আপনি বিনামূল্যে [এখানে](https://metamask.io/download) একটি MetaMask একাউন্ট ডাউনলোড এবং তৈরি করতে পারেন। যখন আপনি একটি একাউন্ট তৈরি করছেন, বা আপনার যদি আগে থেকেই একটি একাউন্ট থাকে, তবে নিশ্চিত করুন যে আপনি উপরের ডানদিকে "Goerli Test Network"-এ সুইচ করেছেন (যাতে আমরা আসল টাকা নিয়ে কাজ না করি)।

### ধাপ 4: একটি ফাসেট থেকে ইথার যোগ করুন {#step-4-add-ether-from-a-faucet}

টেস্ট নেটওয়ার্ক-এ আপনার স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে, আপনার কিছু ফেক ETH প্রয়োজন হবে। Goerli নেটওয়ার্ক-এ ETH পেতে, একটি Goerli ফাসেট-এ যান এবং আপনার Goerli একাউন্ট এডড্রেস লিখুন। মনে রাখবেন যে Goerli ফাসেটগুলো সম্প্রতি কিছুটা অবিশ্বস্ত হতে পারে - চেষ্টা করার মতো বিকল্পগুলোর একটি তালিকার জন্য [টেস্ট নেটওয়ার্ক পেজ](/developers/docs/networks/#goerli) দেখুন:

_নোট: নেটওয়ার্ক কনজেশনের কারণে, এতে কিছুটা সময় লাগতে পারে।_
``

### ধাপ 5: আপনার ব্যালেন্স চেক করুন {#step-5-check-your-balance}

আপনার ওয়ালেট-এ ETH আছে কিনা তা ডাবল-চেক করতে, চলুন [Alchemy-এর কম্পোজার টুল](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ব্যবহার করে একটি [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) রিকোয়েস্ট করি। এটি আমাদের ওয়ালেট-এ থাকা ETH-এর পরিমাণ রিটার্ন করবে। আরও জানতে [কম্পোজার টুল কীভাবে ব্যবহার করতে হয় সে সম্পর্কে Alchemy-এর ছোট টিউটোরিয়ালটি](https://youtu.be/r6sjRxBZJuU) দেখুন।

আপনার MetaMask একাউন্ট এডড্রেস ইনপুট দিন এবং **Send Request**-এ ক্লিক করুন। আপনি নিচের কোড স্নিপেটের মতো একটি রেসপন্স দেখতে পাবেন।

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _নোট: এই ফলাফলটি wei-তে, ETH-এ নয়। Wei ইথারের সবচেয়ে ছোট একক হিসেবে ব্যবহৃত হয়।_

যাক! আমাদের ফেক টাকা সব সেখানেই আছে।

### ধাপ 6: আমাদের প্রজেক্ট ইনিশিয়ালাইজ করুন {#step-6-initialize-our-project}

প্রথমে, আমাদের প্রজেক্টের জন্য একটি ফোল্ডার তৈরি করতে হবে। আপনার কমান্ড লাইনে যান এবং নিচের কমান্ডগুলো ইনপুট দিন।

```
mkdir hello-world
cd hello-world
```

এখন যেহেতু আমরা আমাদের প্রজেক্ট ফোল্ডারের ভেতরে আছি, আমরা প্রজেক্টটি ইনিশিয়ালাইজ করতে `npm init` ব্যবহার করব।

> আপনার যদি এখনও npm ইনস্টল করা না থাকে, তবে [Node.js এবং npm ইনস্টল করার জন্য এই নির্দেশিকাগুলো](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) অনুসরণ করুন।

এই টিউটোরিয়ালের উদ্দেশ্যে, আপনি ইনিশিয়ালাইজেশনের প্রশ্নগুলোর উত্তর কীভাবে দিচ্ছেন তা কোনো ব্যাপার না। রেফারেন্সের জন্য আমরা এটি কীভাবে করেছি তা এখানে দেওয়া হলো:

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

### ধাপ 7: Hardhat ডাউনলোড করুন {#step-7-download-hardhat}

Hardhat হলো আপনার ইথিরিয়াম সফটওয়্যার কম্পাইল, ডিপ্লয়, টেস্ট এবং ডিবাগ করার জন্য একটি ডেভেলপমেন্ট এনভায়রনমেন্ট। এটি লাইভ চেইনে ডিপ্লয় করার আগে লোকালি স্মার্ট কন্ট্রাক্ট এবং ডিএ্যাপস তৈরি করার সময় ডেভেলপারদের সাহায্য করে।

আমাদের `hello-world` প্রজেক্টের ভেতরে রান করুন:

```
npm install --save-dev hardhat
```

[ইনস্টলেশন নির্দেশিকা](https://hardhat.org/getting-started/#overview) সম্পর্কে আরও বিস্তারিত জানতে এই পেজটি দেখুন।

### ধাপ 8: Hardhat প্রজেক্ট তৈরি করুন {#step-8-create-hardhat-project}

আমাদের `hello-world` প্রজেক্ট ফোল্ডারের ভেতরে, রান করুন:

```
npx hardhat
```

এরপর আপনি একটি ওয়েলকাম মেসেজ এবং আপনি কী করতে চান তা নির্বাচন করার অপশন দেখতে পাবেন। "create an empty hardhat.config.js" নির্বাচন করুন:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

এটি প্রজেক্টে একটি `hardhat.config.js` ফাইল জেনারেট করবে। আমাদের প্রজেক্টের সেটআপ নির্দিষ্ট করার জন্য আমরা টিউটোরিয়ালের পরে এটি ব্যবহার করব।

### ধাপ 9: প্রজেক্ট ফোল্ডার যোগ করুন {#step-9-add-project-folders}

প্রজেক্টটি গুছিয়ে রাখতে, চলুন দুটি নতুন ফোল্ডার তৈরি করি। কমান্ড লাইনে, আপনার `hello-world` প্রজেক্টের রুট ডিরেক্টরিতে যান এবং টাইপ করুন:

```
mkdir contracts
mkdir scripts
```

- `contracts/` হলো সেই জায়গা যেখানে আমরা আমাদের হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট কোড ফাইল রাখব
- `scripts/` হলো সেই জায়গা যেখানে আমরা আমাদের কন্ট্রাক্ট ডিপ্লয় এবং ইন্টারঅ্যাক্ট করার জন্য স্ক্রিপ্টগুলো রাখব

### ধাপ 10: আমাদের কন্ট্রাক্ট লিখুন {#step-10-write-our-contract}

আপনি হয়তো নিজেকে জিজ্ঞাসা করছেন, আমরা কখন কোড লিখতে যাচ্ছি? এখনই সময়!

আপনার পছন্দের এডিটরে hello-world প্রজেক্টটি খুলুন। স্মার্ট কন্ট্রাক্ট সাধারণত Solidity-তে লেখা হয়, যা আমরা আমাদের স্মার্ট কন্ট্রাক্ট লিখতে ব্যবহার করব।‌

1. `contracts` ফোল্ডারে যান এবং `HelloWorld.sol` নামে একটি নতুন ফাইল তৈরি করুন
2. নিচে একটি নমুনা হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট দেওয়া হলো যা আমরা এই টিউটোরিয়ালের জন্য ব্যবহার করব। নিচের বিষয়বস্তুগুলো `HelloWorld.sol` ফাইলে কপি করুন।

_নোট: এই কন্ট্রাক্টটি কী করে তা বোঝার জন্য অবশ্যই কমেন্টগুলো পড়বেন।_

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

এটি একটি বেসিক স্মার্ট কন্ট্রাক্ট যা তৈরি করার সময় একটি মেসেজ স্টোর করে। `update` ফাংশন কল করে এটি আপডেট করা যেতে পারে।

### ধাপ 11: আপনার প্রজেক্টের সাথে MetaMask এবং Alchemy কানেক্ট করুন {#step-11-connect-metamask-alchemy-to-your-project}

আমরা একটি MetaMask ওয়ালেট, Alchemy একাউন্ট তৈরি করেছি এবং আমাদের স্মার্ট কন্ট্রাক্ট লিখেছি, এখন এই তিনটিকে কানেক্ট করার সময়।

আপনার ওয়ালেট থেকে পাঠানো প্রতিটি লেনদেন-এর জন্য আপনার ইউনিক প্রাইভেট কি ব্যবহার করে একটি সিগনেচার প্রয়োজন। আমাদের প্রোগ্রামকে এই অনুমতি দেওয়ার জন্য, আমরা নিরাপদে আমাদের প্রাইভেট কি একটি এনভায়রনমেন্ট ফাইলে স্টোর করতে পারি। আমরা এখানে Alchemy-এর জন্য একটি API কি-ও স্টোর করব।

> লেনদেন পাঠানো সম্পর্কে আরও জানতে, web3 ব্যবহার করে লেনদেন পাঠানোর উপর [এই টিউটোরিয়ালটি](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) দেখুন।

প্রথমে, আপনার প্রজেক্ট ডিরেক্টরিতে dotenv প্যাকেজটি ইনস্টল করুন:

```
npm install dotenv --save
```

তারপর, প্রজেক্টের রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন। এতে আপনার MetaMask প্রাইভেট কি এবং HTTP Alchemy API URL যোগ করুন।

আপনার এনভায়রনমেন্ট ফাইলের নাম অবশ্যই `.env` হতে হবে, অন্যথায় এটি এনভায়রনমেন্ট ফাইল হিসেবে চেনা যাবে না।

এর নাম `process.env` বা `.env-custom` বা অন্য কিছু দেবেন না।

- আপনার প্রাইভেট কি এক্সপোর্ট করতে [এই নির্দেশিকাগুলো](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) অনুসরণ করুন
- HTTP Alchemy API URL পেতে নিচে দেখুন

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

আপনার `.env` ফাইলটি দেখতে এরকম হওয়া উচিত:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

এগুলোকে আমাদের কোডের সাথে কানেক্ট করতে, আমরা 13 নম্বর ধাপে আমাদের `hardhat.config.js` ফাইলে এই ভেরিয়েবলগুলোর রেফারেন্স দেব।

### ধাপ 12: Ethers.js ইনস্টল করুন {#step-12-install-ethersjs}

Ethers.js হলো একটি লাইব্রেরি যা [স্ট্যান্ডার্ড JSON-RPC মেথডগুলোকে](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) আরও ইউজার ফ্রেন্ডলি মেথড দিয়ে র‍্যাপ করে ইথিরিয়ামের সাথে ইন্টারঅ্যাক্ট করা এবং রিকোয়েস্ট করা সহজ করে তোলে।

Hardhat আমাদের অতিরিক্ত টুলিং এবং বর্ধিত কার্যকারিতার জন্য [প্লাগইন](https://hardhat.org/plugins/) ইন্টিগ্রেট করার অনুমতি দেয়। আমরা কন্ট্রাক্ট ডিপ্লয়মেন্টের জন্য [Ethers প্লাগইন](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)-এর সুবিধা নেব।

আপনার প্রজেক্ট ডিরেক্টরিতে টাইপ করুন:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### ধাপ 13: hardhat.config.js আপডেট করুন {#step-13-update-hardhat-configjs}

আমরা এ পর্যন্ত বেশ কয়েকটি ডিপেন্ডেন্সি এবং প্লাগইন যোগ করেছি, এখন আমাদের `hardhat.config.js` আপডেট করতে হবে যাতে আমাদের প্রজেক্ট সেগুলোর সব সম্পর্কে জানতে পারে।

আপনার `hardhat.config.js` আপডেট করে এরকম করুন:

```javascript
/* *
 * @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### ধাপ 14: আমাদের কন্ট্রাক্ট কম্পাইল করুন {#step-14-compile-our-contract}

এ পর্যন্ত সবকিছু ঠিকঠাক কাজ করছে কিনা তা নিশ্চিত করতে, চলুন আমাদের কন্ট্রাক্ট কম্পাইল করি। `compile` টাস্কটি হলো বিল্ট-ইন hardhat টাস্কগুলোর মধ্যে একটি।

কমান্ড লাইন থেকে রান করুন:

```bash
npx hardhat compile
```

আপনি `SPDX license identifier not provided in source file` সম্পর্কে একটি ওয়ার্নিং পেতে পারেন, তবে এটি নিয়ে চিন্তা করার কোনো কারণ নেই — আশা করি অন্য সবকিছু ঠিক আছে! যদি তা না হয়, তবে আপনি সবসময় [Alchemy ডিসকর্ড](https://discord.gg/u72VCg3)-এ মেসেজ করতে পারেন।

### ধাপ 15: আমাদের ডিপ্লয় স্ক্রিপ্ট লিখুন {#step-15-write-our-deploy-script}

এখন যেহেতু আমাদের কন্ট্রাক্ট লেখা হয়ে গেছে এবং আমাদের কনফিগারেশন ফাইল প্রস্তুত, তাই এখন আমাদের কন্ট্রাক্ট ডিপ্লয় স্ক্রিপ্ট লেখার সময়।

`scripts/` ফোল্ডারে যান এবং `deploy.js` নামে একটি নতুন ফাইল তৈরি করুন, এতে নিচের বিষয়বস্তুগুলো যোগ করুন:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // ডিপ্লয়মেন্ট শুরু করুন, একটি প্রমিস রিটার্ন করে যা একটি কন্ট্রাক্ট অবজেক্টে রিজলভ হয়
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat তাদের [কন্ট্রাক্টস টিউটোরিয়ালে](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) এই কোডের প্রতিটি লাইন কী করে তা খুব সুন্দরভাবে ব্যাখ্যা করেছে, আমরা এখানে তাদের ব্যাখ্যাগুলো গ্রহণ করেছি।

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js-এ একটি `ContractFactory` হলো নতুন স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার জন্য ব্যবহৃত একটি অ্যাবস্ট্রাকশন, তাই এখানে `HelloWorld` হলো আমাদের হ্যালো ওয়ার্ল্ড কন্ট্রাক্টের ইনস্ট্যান্সগুলোর জন্য একটি [ফ্যাক্টরি](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>)। `hardhat-ethers` প্লাগইন ব্যবহার করার সময় `ContractFactory` এবং `Contract`, ইনস্ট্যান্সগুলো ডিফল্টভাবে প্রথম সাইনার (মালিক)-এর সাথে কানেক্টেড থাকে।

```javascript
const hello_world = await HelloWorld.deploy()
```

একটি `ContractFactory`-তে `deploy()` কল করলে ডিপ্লয়মেন্ট শুরু হবে, এবং একটি `Promise` রিটার্ন করবে যা একটি `Contract` অবজেক্টে রিজলভ হয়। এটি এমন একটি অবজেক্ট যার মধ্যে আমাদের স্মার্ট কন্ট্রাক্টের প্রতিটি ফাংশনের জন্য একটি মেথড রয়েছে।

### ধাপ 16: আমাদের কন্ট্রাক্ট ডিপ্লয় করুন {#step-16-deploy-our-contract}

আমরা অবশেষে আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে প্রস্তুত! কমান্ড লাইনে যান এবং রান করুন:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

এরপর আপনি এরকম কিছু দেখতে পাবেন:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**অনুগ্রহ করে এই এডড্রেসটি সেভ করুন**। আমরা টিউটোরিয়ালের পরে এটি ব্যবহার করব।

আমরা যদি [Goerli etherscan](https://goerli.etherscan.io)-এ যাই এবং আমাদের কন্ট্রাক্ট এডড্রেস সার্চ করি তবে আমরা দেখতে পাব যে এটি সফলভাবে ডিপ্লয় হয়েছে। লেনদেন-টি দেখতে এরকম হবে:

![](./etherscan-contract.png)

The `From` এডড্রেসটি আপনার MetaMask একাউন্ট এডড্রেস-এর সাথে মিলতে হবে এবং `To` এডড্রেসটি **Contract Creation** বলবে। আমরা যদি লেনদেন-এ ক্লিক করি তবে আমরা `To` ফিল্ডে আমাদের কন্ট্রাক্ট এডড্রেস দেখতে পাব।

![](./etherscan-transaction.png)

অভিনন্দন! আপনি এইমাত্র একটি ইথিরিয়াম টেস্টনেট-এ একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করেছেন।

ভেতরে কী ঘটছে তা বোঝার জন্য, চলুন আমাদের [Alchemy ড্যাশবোর্ডের](https://dashboard.alchemy.com/explorer) এক্সপ্লোরার ট্যাবে যাই। আপনার যদি একাধিক Alchemy অ্যাপ থাকে তবে নিশ্চিত করুন যে আপনি অ্যাপ অনুযায়ী ফিল্টার করেছেন এবং **Hello World** নির্বাচন করেছেন।

![](./hello-world-explorer.png)

এখানে আপনি বেশ কয়েকটি JSON-RPC মেথড দেখতে পাবেন যা Hardhat/Ethers আমাদের জন্য ভেতরে তৈরি করেছে যখন আমরা `.deploy()` ফাংশনটি কল করেছিলাম। এখানকার দুটি গুরুত্বপূর্ণ মেথড হলো [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), যা Goerli চেইনে আমাদের কন্ট্রাক্ট লেখার রিকোয়েস্ট, এবং [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), যা হ্যাস দেওয়া থাকলে আমাদের লেনদেন সম্পর্কে তথ্য পড়ার রিকোয়েস্ট। লেনদেন পাঠানো সম্পর্কে আরও জানতে, [Web3 ব্যবহার করে লেনদেন পাঠানোর উপর আমাদের টিউটোরিয়ালটি](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) দেখুন।

## পর্ব 2: আপনার স্মার্ট কন্ট্রাক্ট এর সাথে ইন্টারঅ্যাক্ট করুন {#part-2-interact-with-your-smart-contract}

যেহেতু আমরা সফলভাবে Goerli নেটওয়ার্ক-এ একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করেছি, চলুন এখন শিখে নিই কীভাবে এর সাথে ইন্টারঅ্যাক্ট করতে হয়।

### একটি interact.js ফাইল তৈরি করুন {#create-a-interactjs-file}

এটি সেই ফাইল যেখানে আমরা আমাদের ইন্টারঅ্যাকশন স্ক্রিপ্ট লিখব। আমরা Ethers.js লাইব্রেরি ব্যবহার করব যা আপনি আগে পর্ব 1-এ ইনস্টল করেছিলেন।

`scripts/` ফোল্ডারের ভেতরে, `interact.js` নামের একটি নতুন ফাইল তৈরি করুন এবং নিচের কোডটি যোগ করুন:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### আপনার .env ফাইল আপডেট করুন {#update-your-env-file}

আমরা নতুন এনভায়রনমেন্ট ভেরিয়েবল ব্যবহার করব, তাই আমাদের সেগুলোকে `.env` ফাইলে সংজ্ঞায়িত করতে হবে যা [আমরা আগে তৈরি করেছিলাম](#step-11-connect-metamask-&-alchemy-to-your-project)।

আমাদের Alchemy `API_KEY` এবং `CONTRACT_ADDRESS` এর জন্য একটি সংজ্ঞা যোগ করতে হবে যেখানে আপনার স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা হয়েছিল।

আপনার `.env` ফাইলটি দেখতে অনেকটা এরকম হওয়া উচিত:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### আপনার কন্ট্রাক্ট ABI সংগ্রহ করুন {#grab-your-contract-ABI}

আমাদের কন্ট্রাক্ট [ABI (Application Binary Interface)](/glossary/#abi) হলো আমাদের স্মার্ট কন্ট্রাক্ট এর সাথে ইন্টারঅ্যাক্ট করার ইন্টারফেস। Hardhat স্বয়ংক্রিয়ভাবে একটি ABI তৈরি করে এবং এটি `HelloWorld.json`-এ সেভ করে। ABI ব্যবহার করার জন্য, আমাদের `interact.js` ফাইলে নিচের কোডের লাইনগুলো যোগ করে এর কন্টেন্ট পার্স করতে হবে:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

আপনি যদি ABI দেখতে চান তবে আপনি এটি আপনার কনসোলে প্রিন্ট করতে পারেন:

```javascript
console.log(JSON.stringify(contract.abi))
```

আপনার ABI কনসোলে প্রিন্ট হওয়া দেখতে, আপনার টার্মিনালে যান এবং রান করুন:

```bash
npx hardhat run scripts/interact.js
```

### আপনার কন্ট্রাক্টের একটি ইনস্ট্যান্স তৈরি করুন {#create-an-instance-of-your-contract}

আমাদের কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করতে, আমাদের কোডে একটি কন্ট্রাক্ট ইনস্ট্যান্স তৈরি করতে হবে। Ethers.js এর সাথে এটি করতে, আমাদের তিনটি কনসেপ্ট নিয়ে কাজ করতে হবে:

1. Provider - একটি নোড প্রোভাইডার যা আপনাকে ব্লকচেইন-এ রিড এবং রাইট অ্যাক্সেস দেয়
2. Signer - একটি ইথিরিয়াম একাউন্ট উপস্থাপন করে যা লেনদেন সাইন করতে পারে
3. Contract - একটি Ethers.js অবজেক্ট যা অনচেইন-এ ডিপ্লয় করা একটি নির্দিষ্ট কন্ট্রাক্টকে উপস্থাপন করে

আমরা কন্ট্রাক্টের ইনস্ট্যান্স তৈরি করতে আগের ধাপ থেকে কন্ট্রাক্ট ABI ব্যবহার করব:

```javascript
// interact.js

// প্রোভাইডার
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// সাইনার
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// কন্ট্রাক্ট
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Providers, Signers এবং Contracts সম্পর্কে আরও জানুন [ethers.js ডকুমেন্টেশন](https://docs.ethers.io/v5/)-এ।

### init মেসেজটি পড়ুন {#read-the-init-message}

মনে আছে যখন আমরা `initMessage = "Hello world!"` দিয়ে আমাদের কন্ট্রাক্ট ডিপ্লয় করেছিলাম? আমরা এখন আমাদের স্মার্ট কন্ট্রাক্ট-এ সংরক্ষিত সেই মেসেজটি পড়ব এবং কনসোলে প্রিন্ট করব।

জাভাস্ক্রিপ্টে, নেটওয়ার্ক-এর সাথে ইন্টারঅ্যাক্ট করার সময় অ্যাসিনক্রোনাস ফাংশন ব্যবহার করা হয়। অ্যাসিনক্রোনাস ফাংশন সম্পর্কে আরও জানতে, [এই মিডিয়াম আর্টিকেলটি পড়ুন](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)।

আমাদের স্মার্ট কন্ট্রাক্ট-এ `message` ফাংশন কল করতে এবং init মেসেজটি পড়তে নিচের কোডটি ব্যবহার করুন:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

টার্মিনালে `npx hardhat run scripts/interact.js` ব্যবহার করে ফাইলটি রান করার পর আমাদের এই রেসপন্সটি দেখা উচিত:

```
The message is: Hello world!
```

অভিনন্দন! আপনি এইমাত্র ইথিরিয়াম ব্লকচেইন থেকে সফলভাবে স্মার্ট কন্ট্রাক্ট ডাটা পড়েছেন, দারুণ কাজ!

### মেসেজটি আপডেট করুন {#update-the-message}

শুধুমাত্র মেসেজটি পড়ার পরিবর্তে, আমরা `update` ফাংশন ব্যবহার করে আমাদের স্মার্ট কন্ট্রাক্ট-এ সেভ করা মেসেজটিও আপডেট করতে পারি! বেশ দারুণ, তাই না?

মেসেজটি আপডেট করতে, আমরা সরাসরি আমাদের ইনস্ট্যানশিয়েটেড Contract অবজেক্টে `update` ফাংশন কল করতে পারি:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

লক্ষ্য করুন যে 11 নম্বর লাইনে, আমরা রিটার্ন করা লেনদেন অবজেক্টে `.wait()` কল করেছি। এটি নিশ্চিত করে যে ফাংশন থেকে বের হওয়ার আগে আমাদের স্ক্রিপ্টটি ব্লকচেইন-এ লেনদেন মাইন হওয়ার জন্য অপেক্ষা করবে। যদি `.wait()` কলটি অন্তর্ভুক্ত না থাকে, তবে স্ক্রিপ্টটি কন্ট্রাক্টে আপডেট করা `message` ভ্যালু দেখতে নাও পারে।

### নতুন মেসেজটি পড়ুন {#read-the-new-message}

আপডেট করা `message` ভ্যালু পড়তে আপনার [আগের ধাপটি](#read-the-init-message) পুনরাবৃত্তি করতে পারা উচিত। একটু সময় নিন এবং দেখুন আপনি সেই নতুন ভ্যালুটি প্রিন্ট করার জন্য প্রয়োজনীয় পরিবর্তনগুলো করতে পারেন কিনা!

আপনার যদি কোনো হিন্ট বা সূত্রের প্রয়োজন হয়, তবে এই পর্যায়ে আপনার `interact.js` ফাইলটি দেখতে যেমন হওয়া উচিত তা নিচে দেওয়া হলো:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// প্রোভাইডার - অ্যালকেমি
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// সাইনার - আপনি
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// কন্ট্রাক্ট ইন্সট্যান্স
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

এখন শুধু স্ক্রিপ্টটি রান করুন এবং আপনি আপনার টার্মিনালে পুরনো মেসেজ, আপডেটিং স্ট্যাটাস এবং নতুন মেসেজ প্রিন্ট হওয়া দেখতে পাবেন!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

সেই স্ক্রিপ্টটি রান করার সময়, আপনি লক্ষ্য করতে পারেন যে নতুন মেসেজ লোড হওয়ার আগে `Updating the message...` ধাপটি লোড হতে কিছুটা সময় নেয়। এটি মাইনিং প্রক্রিয়ার কারণে হয়; আপনি যদি লেনদেন মাইন হওয়ার সময় সেগুলো ট্র্যাক করতে আগ্রহী হন, তবে একটি লেনদেন এর স্ট্যাটাস দেখতে [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) ভিজিট করুন। যদি লেনদেন ড্রপ হয়ে যায়, তবে [Goerli Etherscan](https://goerli.etherscan.io) চেক করা এবং আপনার লেনদেন হ্যাস সার্চ করাও সহায়ক হতে পারে।

## পার্ট 3: Etherscan-এ আপনার স্মার্ট কন্ট্রাক্ট পাবলিশ করুন {#part-3-publish-your-smart-contract-to-etherscan}

আপনার স্মার্ট কন্ট্রাক্টকে বাস্তবে রূপ দিতে আপনি অনেক পরিশ্রম করেছেন; এখন এটি বিশ্বের সাথে শেয়ার করার সময় এসেছে!

Etherscan-এ আপনার স্মার্ট কন্ট্রাক্ট ভেরিফাই করার মাধ্যমে, যে কেউ আপনার সোর্স কোড দেখতে পারবে এবং আপনার স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করতে পারবে। চলুন শুরু করা যাক!

### ধাপ 1: আপনার Etherscan একাউন্টে একটি API Key তৈরি করুন {#step-1-generate-an-api-key-on-your-etherscan-account}

আপনি যে স্মার্ট কন্ট্রাক্টটি পাবলিশ করার চেষ্টা করছেন তার মালিক যে আপনিই, তা ভেরিফাই করার জন্য একটি Etherscan API Key প্রয়োজন।

আপনার যদি আগে থেকে কোনো Etherscan একাউন্ট না থাকে, তাহলে [একটি একাউন্টের জন্য সাইন আপ করুন](https://etherscan.io/register)।

লগ ইন করার পর, নেভিগেশন বারে আপনার ইউজারনেম খুঁজুন, এর উপর হোভার করুন এবং **My profile** বোতামটি নির্বাচন করুন।

আপনার প্রোফাইল পেজে, আপনি একটি সাইড নেভিগেশন বার দেখতে পাবেন। সাইড নেভিগেশন বার থেকে, **API Keys** নির্বাচন করুন। এরপর, একটি নতুন API key তৈরি করতে "Add" বোতাম টিপুন, আপনার অ্যাপের নাম দিন **hello-world** এবং **Create New API Key** বোতাম টিপুন।

আপনার নতুন API key-টি API key টেবিলে দেখা যাবে। API key-টি আপনার ক্লিপবোর্ডে কপি করুন।

এরপর, আমাদের `.env` ফাইলে Etherscan API key যোগ করতে হবে।

এটি যোগ করার পর, আপনার `.env` ফাইলটি দেখতে এরকম হবে:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat-এর মাধ্যমে ডিপ্লয় করা স্মার্ট কন্ট্রাক্ট {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan ইনস্টল করুন {#install-hardhat-etherscan}

Hardhat ব্যবহার করে Etherscan-এ আপনার কন্ট্রাক্ট পাবলিশ করা বেশ সহজ। শুরু করার জন্য আপনাকে প্রথমে `hardhat-etherscan` প্লাগইনটি ইনস্টল করতে হবে। `hardhat-etherscan` স্বয়ংক্রিয়ভাবে Etherscan-এ স্মার্ট কন্ট্রাক্টের সোর্স কোড এবং ABI ভেরিফাই করবে। এটি যোগ করতে, `hello-world` ডিরেক্টরিতে রান করুন:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

ইনস্টল হয়ে গেলে, আপনার `hardhat.config.js`-এর একদম উপরে নিচের স্টেটমেন্টটি অন্তর্ভুক্ত করুন এবং Etherscan কনফিগ অপশনগুলো যোগ করুন:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // ইথারস্ক্যানের জন্য আপনার এপিআই (API) কী
    // https://etherscan.io/ থেকে একটি সংগ্রহ করুন
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan-এ আপনার স্মার্ট কন্ট্রাক্ট ভেরিফাই করুন {#verify-your-smart-contract-on-etherscan}

নিশ্চিত করুন যে সমস্ত ফাইল সেভ করা হয়েছে এবং সমস্ত `.env` ভেরিয়েবল সঠিকভাবে কনফিগার করা হয়েছে।

কন্ট্রাক্ট এডড্রেস এবং এটি যে নেটওয়ার্ক-এ ডিপ্লয় করা হয়েছে তা পাস করে `verify` টাস্কটি রান করুন:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

নিশ্চিত করুন যে `DEPLOYED_CONTRACT_ADDRESS` হলো Goerli টেস্টনেট-এ আপনার ডিপ্লয় করা স্মার্ট কন্ট্রাক্টের এডড্রেস। এছাড়া, চূড়ান্ত আর্গুমেন্ট (`'Hello World!'`) অবশ্যই [পার্ট 1-এর ডিপ্লয়মেন্ট ধাপে](#write-our-deploy-script) ব্যবহৃত স্ট্রিং ভ্যালুর সমান হতে হবে।

সবকিছু ঠিকঠাক থাকলে, আপনি আপনার টার্মিনালে নিচের মেসেজটি দেখতে পাবেন:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https: // goerli.etherscan.io/address/<contract-address>#contracts
```

অভিনন্দন! আপনার স্মার্ট কন্ট্রাক্ট কোড এখন Etherscan-এ আছে!

### Etherscan-এ আপনার স্মার্ট কন্ট্রাক্টটি দেখে নিন! {#check-out-your-smart-contract-on-etherscan}

আপনার টার্মিনালে দেওয়া লিঙ্কে গেলে, আপনি Etherscan-এ পাবলিশ হওয়া আপনার স্মার্ট কন্ট্রাক্ট কোড এবং ABI দেখতে পাবেন!

**ওয়াহু - আপনি পেরেছেন চ্যাম্প! এখন যে কেউ আপনার স্মার্ট কন্ট্রাক্টে কল বা রাইট করতে পারবে! আপনি পরবর্তীতে কী তৈরি করবেন তা দেখার জন্য আমরা অধীর আগ্রহে অপেক্ষা করছি!**

## পর্ব 4 - ফ্রন্টএন্ডের সাথে আপনার স্মার্ট কন্ট্রাক্ট ইন্টিগ্রেট করা {#part-4-integrating-your-smart-contract-with-the-frontend}

এই টিউটোরিয়ালের শেষে, আপনি জানতে পারবেন কীভাবে:

- আপনার ডিএ্যাপ এর সাথে একটি MetaMask ওয়ালেট কানেক্ট করতে হয়
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API ব্যবহার করে আপনার স্মার্ট কন্ট্রাক্ট থেকে ডেটা রিড করতে হয়
- MetaMask ব্যবহার করে ইথিরিয়াম লেনদেন সাইন করতে হয়

এই ডিএ্যাপ এর জন্য, আমরা আমাদের ফ্রন্টএন্ড ফ্রেমওয়ার্ক হিসেবে [React](https://react.dev/) ব্যবহার করব; তবে, এটি মনে রাখা গুরুত্বপূর্ণ যে আমরা এর মৌলিক বিষয়গুলো ব্যাখ্যা করতে খুব বেশি সময় ব্যয় করব না, কারণ আমরা মূলত আমাদের প্রজেক্টে Web3 কার্যকারিতা আনার দিকেই বেশি মনোযোগ দেব।

পূর্বশর্ত হিসেবে, আপনার React সম্পর্কে প্রাথমিক স্তরের ধারণা থাকা উচিত। যদি না থাকে, তবে আমরা অফিসিয়াল [Intro to React tutorial](https://react.dev/learn) সম্পন্ন করার পরামর্শ দিচ্ছি।

### স্টার্টার ফাইলগুলো ক্লোন করুন {#clone-the-starter-files}

প্রথমে, এই প্রজেক্টের স্টার্টার ফাইলগুলো পেতে [hello-world-part-four GitHub repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial)-তে যান এবং এই রিপোজিটরিটি আপনার লোকাল মেশিনে ক্লোন করুন।

ক্লোন করা রিপোজিটরিটি লোকালি খুলুন। লক্ষ্য করুন যে এতে দুটি ফোল্ডার রয়েছে: `starter-files` এবং `completed`।

- `starter-files`- **আমরা এই ডিরেক্টরিতে কাজ করব**, আমরা UI-কে আপনার ইথিরিয়াম ওয়ালেট এবং [Part 3](#part-3)-এ Etherscan-এ পাবলিশ করা স্মার্ট কন্ট্রাক্ট এর সাথে কানেক্ট করব।
- `completed`-এ সম্পূর্ণ টিউটোরিয়ালটি রয়েছে এবং আপনি যদি কোথাও আটকে যান তবে এটি শুধুমাত্র রেফারেন্স হিসেবে ব্যবহার করা উচিত।

এরপর, আপনার প্রিয় কোড এডিটরে `starter-files` এর কপিটি খুলুন এবং তারপর `src` ফোল্ডারে নেভিগেট করুন।

আমরা যে কোডগুলো লিখব তার সবই `src` ফোল্ডারের অধীনে থাকবে। আমাদের প্রজেক্টে Web3 কার্যকারিতা দিতে আমরা `HelloWorld.js` কম্পোনেন্ট এবং `util/interact.js` জাভাস্ক্রিপ্ট ফাইলগুলো এডিট করব।

### স্টার্টার ফাইলগুলো চেক করুন {#check-out-the-starter-files}

কোডিং শুরু করার আগে, চলুন দেখে নিই স্টার্টার ফাইলগুলোতে আমাদের কী কী দেওয়া হয়েছে।

#### আপনার react প্রজেক্ট চালু করুন {#get-your-react-project-running}

চলুন আমাদের ব্রাউজারে React প্রজেক্টটি রান করার মাধ্যমে শুরু করি। React এর সৌন্দর্য হলো, একবার আমাদের প্রজেক্ট ব্রাউজারে রান করলে, আমরা যে পরিবর্তনগুলো সেভ করব তা ব্রাউজারে লাইভ আপডেট হবে।

প্রজেক্টটি রান করতে, `starter-files` ফোল্ডারের রুট ডিরেক্টরিতে নেভিগেট করুন এবং প্রজেক্টের ডিপেন্ডেন্সিগুলো ইনস্টল করতে আপনার টার্মিনালে `npm install` রান করুন:

```bash
cd starter-files
npm install
```

সেগুলো ইনস্টল করা শেষ হলে, আপনার টার্মিনালে `npm start` রান করুন:

```bash
npm start
```

এটি করলে আপনার ব্রাউজারে [http://localhost:3000/](http://localhost:3000/) খুলবে, যেখানে আপনি আমাদের প্রজেক্টের ফ্রন্টএন্ড দেখতে পাবেন। এতে একটি ফিল্ড (আপনার স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজ আপডেট করার জায়গা), একটি "Connect Wallet" বোতাম এবং একটি "Update" বোতাম থাকা উচিত।

আপনি যদি কোনো বোতামে ক্লিক করার চেষ্টা করেন, তবে আপনি লক্ষ্য করবেন যে সেগুলো কাজ করছে না—কারণ আমাদের এখনও সেগুলোর কার্যকারিতা প্রোগ্রাম করতে হবে।

#### `HelloWorld.js` কম্পোনেন্ট {#the-helloworld-js-component}

চলুন আমাদের এডিটরের `src` ফোল্ডারে ফিরে যাই এবং `HelloWorld.js` ফাইলটি খুলি। এই ফাইলের সবকিছু বোঝা আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ, কারণ এটিই প্রাথমিক React কম্পোনেন্ট যার ওপর আমরা কাজ করব।

এই ফাইলের শীর্ষে, আপনি লক্ষ্য করবেন যে আমাদের প্রজেক্টটি রান করার জন্য প্রয়োজনীয় বেশ কয়েকটি ইমপোর্ট স্টেটমেন্ট রয়েছে, যার মধ্যে রয়েছে React লাইব্রেরি, useEffect এবং useState হুক, `./util/interact.js` থেকে কিছু আইটেম (আমরা শীঘ্রই সেগুলোর বিস্তারিত বর্ণনা করব!), এবং Alchemy লোগো।

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

এরপর, আমাদের স্টেট ভেরিয়েবলগুলো রয়েছে যা আমরা নির্দিষ্ট ইভেন্টের পরে আপডেট করব।

```javascript
// HelloWorld.js

// স্টেট ভেরিয়েবল
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

এখানে প্রতিটি ভেরিয়েবল যা উপস্থাপন করে তা দেওয়া হলো:

- `walletAddress` - একটি স্ট্রিং যা ব্যবহারকারীর ওয়ালেট এডড্রেস সংরক্ষণ করে
- `status`- একটি স্ট্রিং যা একটি সহায়ক মেসেজ সংরক্ষণ করে যা ব্যবহারকারীকে ডিএ্যাপ এর সাথে কীভাবে ইন্টারঅ্যাক্ট করতে হয় সে সম্পর্কে গাইড করে
- `message` - একটি স্ট্রিং যা স্মার্ট কন্ট্রাক্ট এ বর্তমান মেসেজটি সংরক্ষণ করে
- `newMessage` - একটি স্ট্রিং যা নতুন মেসেজটি সংরক্ষণ করে যা স্মার্ট কন্ট্রাক্ট এ লেখা হবে

স্টেট ভেরিয়েবলগুলোর পরে, আপনি পাঁচটি ইমপ্লিমেন্ট না করা ফাংশন দেখতে পাবেন: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, এবং `onUpdatePressed`। আমরা নিচে ব্যাখ্যা করব এগুলো কী কাজ করে:

```javascript
// HelloWorld.js

// শুধুমাত্র একবার কল করা হয়
useEffect(async () => {
  // TODO: ইমপ্লিমেন্ট করুন
}, [])

function addSmartContractListener() {
  // TODO: ইমপ্লিমেন্ট করুন
}

function addWalletListener() {
  // TODO: ইমপ্লিমেন্ট করুন
}

const connectWalletPressed = async () => {
  // TODO: ইমপ্লিমেন্ট করুন
}

const onUpdatePressed = async () => {
  // TODO: ইমপ্লিমেন্ট করুন
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- এটি একটি React হুক যা আপনার কম্পোনেন্ট রেন্ডার হওয়ার পরে কল করা হয়। যেহেতু এতে একটি খালি অ্যারে `[]` প্রপ পাস করা হয়েছে (লাইন 4 দেখুন), এটি শুধুমাত্র কম্পোনেন্টের _প্রথম_ রেন্ডারে কল করা হবে। এখানে আমরা আমাদের স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত বর্তমান মেসেজটি লোড করব, আমাদের স্মার্ট কন্ট্রাক্ট এবং ওয়ালেট লিসেনারদের কল করব এবং কোনো ওয়ালেট আগে থেকেই কানেক্ট করা আছে কিনা তা প্রতিফলিত করতে আমাদের UI আপডেট করব।
- `addSmartContractListener`- এই ফাংশনটি একটি লিসেনার সেট আপ করে যা আমাদের HelloWorld কন্ট্রাক্টের `UpdatedMessages` ইভেন্টের জন্য নজর রাখবে এবং আমাদের স্মার্ট কন্ট্রাক্ট এ মেসেজ পরিবর্তন হলে আমাদের UI আপডেট করবে।
- `addWalletListener`- এই ফাংশনটি একটি লিসেনার সেট আপ করে যা ব্যবহারকারীর MetaMask ওয়ালেট স্টেট এ পরিবর্তনগুলো শনাক্ত করে, যেমন যখন ব্যবহারকারী তাদের ওয়ালেট ডিসকানেক্ট করে বা এডড্রেস পরিবর্তন করে।
- `connectWalletPressed`- ব্যবহারকারীর MetaMask ওয়ালেট কে আমাদের ডিএ্যাপ এর সাথে কানেক্ট করতে এই ফাংশনটি কল করা হবে।
- `onUpdatePressed` - যখন ব্যবহারকারী স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজটি আপডেট করতে চাইবেন তখন এই ফাংশনটি কল করা হবে।

এই ফাইলের শেষের দিকে, আমাদের কম্পোনেন্টের UI রয়েছে।

```javascript
// HelloWorld.js

// আমাদের কম্পোনেন্টের ইউআই (UI)
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

আপনি যদি এই কোডটি মনোযোগ সহকারে স্ক্যান করেন, তবে আপনি লক্ষ্য করবেন যে আমরা আমাদের UI-তে আমাদের বিভিন্ন স্টেট ভেরিয়েবলগুলো কোথায় ব্যবহার করি:

- 6-12 লাইনে, যদি ব্যবহারকারীর ওয়ালেট কানেক্ট করা থাকে (অর্থাৎ, `walletAddress.length > 0`), আমরা "walletButton" আইডি সহ বোতামে ব্যবহারকারীর `walletAddress` এর একটি সংক্ষিপ্ত সংস্করণ প্রদর্শন করি; অন্যথায় এটি কেবল "Connect Wallet" বলে।
- 17 লাইনে, আমরা স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত বর্তমান মেসেজটি প্রদর্শন করি, যা `message` স্ট্রিংয়ে ক্যাপচার করা হয়েছে।
- 23-26 লাইনে, টেক্সট ফিল্ডে ইনপুট পরিবর্তন হলে আমাদের `newMessage` স্টেট ভেরিয়েবল আপডেট করতে আমরা একটি [controlled component](https://legacy.reactjs.org/docs/forms.html#controlled-components) ব্যবহার করি।

আমাদের স্টেট ভেরিয়েবলগুলো ছাড়াও, আপনি দেখতে পাবেন যে `publishButton` এবং `walletButton` আইডি সহ বোতামগুলোতে ক্লিক করা হলে যথাক্রমে `connectWalletPressed` এবং `onUpdatePressed` ফাংশনগুলো কল করা হয়।

অবশেষে, চলুন দেখি এই `HelloWorld.js` কম্পোনেন্টটি কোথায় যোগ করা হয়েছে।

আপনি যদি `App.js` ফাইলে যান, যা React-এর প্রধান কম্পোনেন্ট এবং অন্যান্য সমস্ত কম্পোনেন্টের জন্য একটি কন্টেইনার হিসেবে কাজ করে, আপনি দেখতে পাবেন যে আমাদের `HelloWorld.js` কম্পোনেন্টটি 7 নম্বর লাইনে ইনজেক্ট করা হয়েছে।

সবশেষে, চলুন আপনার জন্য দেওয়া আরও একটি ফাইল, `interact.js` ফাইলটি চেক করি।

#### `interact.js` ফাইল {#the-interact-js-file}

যেহেতু আমরা [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) প্যারাডাইম অনুসরণ করতে চাই, তাই আমরা একটি আলাদা ফাইল চাইব যাতে আমাদের ডিএ্যাপ এর লজিক, ডেটা এবং নিয়মগুলো পরিচালনা করার জন্য আমাদের সমস্ত ফাংশন থাকে এবং তারপর সেই ফাংশনগুলোকে আমাদের ফ্রন্টএন্ডে (আমাদের `HelloWorld.js` কম্পোনেন্ট) এক্সপোর্ট করতে সক্ষম হই।

👆🏽এটিই আমাদের `interact.js` ফাইলের আসল উদ্দেশ্য!

আপনার `src` ডিরেক্টরির `util` ফোল্ডারে নেভিগেট করুন, এবং আপনি লক্ষ্য করবেন যে আমরা `interact.js` নামের একটি ফাইল অন্তর্ভুক্ত করেছি যাতে আমাদের সমস্ত স্মার্ট কন্ট্রাক্ট ইন্টারঅ্যাকশন এবং ওয়ালেট ফাংশন এবং ভেরিয়েবলগুলো থাকবে।

```javascript
// interact.js

// export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

আপনি ফাইলের শীর্ষে লক্ষ্য করবেন যে আমরা `helloWorldContract` অবজেক্টটি কমেন্ট আউট করেছি। এই টিউটোরিয়ালের পরে, আমরা এই অবজেক্টটি আনকমেন্ট করব এবং এই ভেরিয়েবলে আমাদের স্মার্ট কন্ট্রাক্ট ইনস্ট্যানশিয়েট করব, যা আমরা পরে আমাদের `HelloWorld.js` কম্পোনেন্টে এক্সপোর্ট করব।

আমাদের `helloWorldContract` অবজেক্টের পরে চারটি ইমপ্লিমেন্ট না করা ফাংশন নিচের কাজগুলো করে:

- `loadCurrentMessage` - এই ফাংশনটি স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত বর্তমান মেসেজ লোড করার লজিক পরিচালনা করে। এটি [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) ব্যবহার করে Hello World স্মার্ট কন্ট্রাক্ট এ একটি _read_ কল করবে।
- `connectWallet` - এই ফাংশনটি ব্যবহারকারীর MetaMask-কে আমাদের ডিএ্যাপ এর সাথে কানেক্ট করবে।
- `getCurrentWalletConnected` - এই ফাংশনটি পেজ লোড হওয়ার সময় কোনো ইথিরিয়াম একাউন্ট আগে থেকেই আমাদের ডিএ্যাপ এর সাথে কানেক্ট করা আছে কিনা তা চেক করবে এবং সেই অনুযায়ী আমাদের UI আপডেট করবে।
- `updateMessage` - এই ফাংশনটি স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজটি আপডেট করবে। এটি Hello World স্মার্ট কন্ট্রাক্ট এ একটি _write_ কল করবে, তাই মেসেজটি আপডেট করার জন্য ব্যবহারকারীর MetaMask ওয়ালেট কে একটি ইথিরিয়াম লেনদেন সাইন করতে হবে।

এখন যেহেতু আমরা বুঝতে পেরেছি আমরা কী নিয়ে কাজ করছি, চলুন বের করি কীভাবে আমাদের স্মার্ট কন্ট্রাক্ট থেকে রিড করতে হয়!

### ধাপ 3: আপনার স্মার্ট কন্ট্রাক্ট থেকে রিড করুন {#step-3-read-from-your-smart-contract}

আপনার স্মার্ট কন্ট্রাক্ট থেকে রিড করতে, আপনাকে সফলভাবে সেট আপ করতে হবে:

- ইথিরিয়াম চেইনের সাথে একটি API কানেকশন
- আপনার স্মার্ট কন্ট্রাক্ট এর একটি লোড করা ইনস্ট্যান্স
- আপনার স্মার্ট কন্ট্রাক্ট ফাংশনে কল করার জন্য একটি ফাংশন
- স্মার্ট কন্ট্রাক্ট থেকে আপনি যে ডেটা রিড করছেন তা পরিবর্তন হলে আপডেটের জন্য নজর রাখার একটি লিসেনার

এটি শুনতে অনেকগুলো ধাপ মনে হতে পারে, তবে চিন্তা করবেন না! আমরা আপনাকে ধাপে ধাপে দেখাব কীভাবে এগুলোর প্রতিটি করতে হয়! :)

#### ইথিরিয়াম চেইনের সাথে একটি API কানেকশন স্থাপন করুন {#establish-an-api-connection-to-the-ethereum-chain}

তাহলে মনে আছে কীভাবে এই টিউটোরিয়ালের পার্ট 2-এ, আমরা আমাদের [Alchemy Web3 key to read from our smart contract](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) ব্যবহার করেছিলাম? চেইন থেকে রিড করার জন্য আপনার ডিএ্যাপ এও একটি Alchemy Web3 কি প্রয়োজন হবে।

যদি আপনার কাছে এটি আগে থেকে না থাকে, তবে প্রথমে আপনার `starter-files` এর রুট ডিরেক্টরিতে নেভিগেট করে এবং আপনার টার্মিনালে নিচের কমান্ডটি রান করে [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ইনস্টল করুন:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) হলো [Web3.js](https://docs.web3js.org/) এর চারপাশে একটি র‍্যাপার, যা উন্নত API মেথড এবং অন্যান্য গুরুত্বপূর্ণ সুবিধা প্রদান করে যাতে একজন web3 ডেভেলপার হিসেবে আপনার জীবন সহজ হয়। এটি এমনভাবে ডিজাইন করা হয়েছে যাতে ন্যূনতম কনফিগারেশনের প্রয়োজন হয়, ফলে আপনি এখনই আপনার অ্যাপে এটি ব্যবহার করা শুরু করতে পারেন!

তারপর, আপনার প্রজেক্ট ডিরেক্টরিতে [dotenv](https://www.npmjs.com/package/dotenv) প্যাকেজটি ইনস্টল করুন, যাতে আমাদের API কি ফেচ করার পরে এটি সংরক্ষণ করার জন্য একটি নিরাপদ জায়গা থাকে।

```text
npm install dotenv --save
```

আমাদের ডিএ্যাপ এর জন্য, **আমরা আমাদের HTTP API কি এর পরিবর্তে আমাদের Websockets API কি ব্যবহার করব**, কারণ এটি আমাদের একটি লিসেনার সেট আপ করতে দেবে যা স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজ পরিবর্তন হলে তা শনাক্ত করে।

আপনার API কি পাওয়ার পর, আপনার রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন এবং এতে আপনার Alchemy Websockets url যোগ করুন। এরপর, আপনার `.env` ফাইলটি দেখতে এরকম হওয়া উচিত:

```javascript
REACT_APP_ALCHEMY_KEY = wss: // eth-goerli.ws.alchemyapi.io/v2/<key>
```

এখন, আমরা আমাদের ডিএ্যাপ এ আমাদের Alchemy Web3 এন্ডপয়েন্ট সেট আপ করতে প্রস্তুত! চলুন আমাদের `interact.js`-এ ফিরে যাই, যা আমাদের `util` ফোল্ডারের ভেতরে নেস্টেড করা আছে এবং ফাইলের শীর্ষে নিচের কোডটি যোগ করি:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

// export const helloWorldContract;
```

উপরে, আমরা প্রথমে আমাদের `.env` ফাইল থেকে Alchemy কি ইমপোর্ট করেছি এবং তারপর আমাদের Alchemy Web3 এন্ডপয়েন্ট স্থাপন করতে `createAlchemyWeb3`-তে আমাদের `alchemyKey` পাস করেছি।

এই এন্ডপয়েন্ট প্রস্তুত হওয়ার সাথে সাথে, আমাদের স্মার্ট কন্ট্রাক্ট লোড করার সময় এসেছে!

#### আপনার Hello World স্মার্ট কন্ট্রাক্ট লোড করা {#loading-your-hello-world-smart-contract}

আপনার Hello World স্মার্ট কন্ট্রাক্ট লোড করতে, আপনার এর কন্ট্রাক্ট এডড্রেস এবং ABI প্রয়োজন হবে, যার উভয়ই Etherscan-এ পাওয়া যাবে যদি আপনি [Part 3 of this tutorial.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) সম্পন্ন করে থাকেন।

#### Etherscan থেকে কীভাবে আপনার কন্ট্রাক্ট ABI পাবেন {#how-to-get-your-contract-abi-from-etherscan}

আপনি যদি এই টিউটোরিয়ালের পার্ট 3 এড়িয়ে গিয়ে থাকেন, তবে আপনি [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) এডড্রেস সহ HelloWorld কন্ট্রাক্ট ব্যবহার করতে পারেন। এর ABI [এখানে](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) পাওয়া যাবে।

একটি কন্ট্রাক্ট কোন ফাংশনটি ইনভোক করবে তা নির্দিষ্ট করার পাশাপাশি ফাংশনটি আপনার প্রত্যাশিত ফরম্যাটে ডেটা রিটার্ন করবে তা নিশ্চিত করার জন্য একটি কন্ট্রাক্ট ABI প্রয়োজনীয়। একবার আমরা আমাদের কন্ট্রাক্ট ABI কপি করার পর, চলুন এটিকে আপনার `src` ডিরেক্টরিতে `contract-abi.json` নামের একটি JSON ফাইল হিসেবে সেভ করি।

আপনার contract-abi.json আপনার src ফোল্ডারে সংরক্ষণ করা উচিত।

আমাদের কন্ট্রাক্ট এডড্রেস, ABI এবং Alchemy Web3 এন্ডপয়েন্ট দিয়ে সজ্জিত হয়ে, আমরা আমাদের স্মার্ট কন্ট্রাক্ট এর একটি ইনস্ট্যান্স লোড করতে [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ব্যবহার করতে পারি। `interact.js` ফাইলে আপনার কন্ট্রাক্ট ABI ইমপোর্ট করুন এবং আপনার কন্ট্রাক্ট এডড্রেস যোগ করুন।

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

আমরা এখন অবশেষে আমাদের `helloWorldContract` ভেরিয়েবলটি আনকমেন্ট করতে পারি এবং আমাদের AlchemyWeb3 এন্ডপয়েন্ট ব্যবহার করে স্মার্ট কন্ট্রাক্ট লোড করতে পারি:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

সংক্ষেপে বলতে গেলে, আপনার `interact.js` এর প্রথম 12 লাইন এখন এরকম হওয়া উচিত:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

এখন যেহেতু আমাদের কন্ট্রাক্ট লোড করা হয়েছে, আমরা আমাদের `loadCurrentMessage` ফাংশন ইমপ্লিমেন্ট করতে পারি!

#### আপনার `interact.js` ফাইলে `loadCurrentMessage` ইমপ্লিমেন্ট করা {#implementing-loadCurrentMessage-in-your-interact-js-file}

এই ফাংশনটি খুবই সহজ। আমরা আমাদের কন্ট্রাক্ট থেকে রিড করার জন্য একটি সাধারণ async web3 কল করতে যাচ্ছি। আমাদের ফাংশনটি স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজটি রিটার্ন করবে:

আপনার `interact.js` ফাইলে `loadCurrentMessage` নিচের মতো আপডেট করুন:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

যেহেতু আমরা আমাদের UI-তে এই স্মার্ট কন্ট্রাক্ট প্রদর্শন করতে চাই, তাই চলুন আমাদের `HelloWorld.js` কম্পোনেন্টে `useEffect` ফাংশনটি নিচের মতো আপডেট করি:

```javascript
// HelloWorld.js

// শুধুমাত্র একবার কল করা হয়
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

লক্ষ্য করুন, আমরা চাই আমাদের `loadCurrentMessage` শুধুমাত্র কম্পোনেন্টের প্রথম রেন্ডারের সময় একবার কল করা হোক। স্মার্ট কন্ট্রাক্ট এ মেসেজ পরিবর্তন হওয়ার পরে স্বয়ংক্রিয়ভাবে UI আপডেট করতে আমরা শীঘ্রই `addSmartContractListener` ইমপ্লিমেন্ট করব।

আমাদের লিসেনারে প্রবেশ করার আগে, চলুন দেখে নিই এ পর্যন্ত আমাদের কী আছে! আপনার `HelloWorld.js` এবং `interact.js` ফাইলগুলো সেভ করুন এবং তারপর [http://localhost:3000/](http://localhost:3000/)-এ যান

আপনি লক্ষ্য করবেন যে বর্তমান মেসেজটি আর "No connection to the network" বলছে না। এর পরিবর্তে এটি স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজটি প্রতিফলিত করে। দারুণ!

#### আপনার UI এখন স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজটি প্রতিফলিত করা উচিত {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

এখন সেই লিসেনারের কথা বলতে গেলে...

#### `addSmartContractListener` ইমপ্লিমেন্ট করুন {#implement-addsmartcontractlistener}

আপনি যদি [Part 1 of this tutorial series](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)-এ আমাদের লেখা `HelloWorld.sol` ফাইলটির কথা মনে করেন, তবে আপনার মনে পড়বে যে `UpdatedMessages` নামের একটি স্মার্ট কন্ট্রাক্ট ইভেন্ট রয়েছে যা আমাদের স্মার্ট কন্ট্রাক্ট এর `update` ফাংশন ইনভোক হওয়ার পরে এমিট হয় (লাইন 9 এবং 27 দেখুন):

```javascript
// HelloWorld.sol

// সিম্যান্টিক ভার্সনিং ব্যবহার করে সলিডিটির ভার্সন নির্দিষ্ট করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` নামের একটি কন্ট্রাক্ট ডিফাইন করে।
// একটি কন্ট্রাক্ট হলো ফাংশন এবং ডেটার (এর স্টেট) একটি সংগ্রহ। একবার ডিপ্লয় করা হলে, একটি কন্ট্রাক্ট ইথেরিয়াম ব্লকচেইনের একটি নির্দিষ্ট ঠিকানায় অবস্থান করে। আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // আপডেট ফাংশন কল করা হলে এমিট হয়
   // স্মার্ট কন্ট্রাক্ট ইভেন্ট হলো আপনার কন্ট্রাক্টের জন্য ব্লকচেইনে কিছু ঘটার বিষয়ে আপনার অ্যাপের ফ্রন্ট-এন্ডের সাথে যোগাযোগ করার একটি উপায়, যা নির্দিষ্ট ইভেন্টগুলোর জন্য 'লিসেন' করতে পারে এবং সেগুলো ঘটলে ব্যবস্থা নিতে পারে।
   event UpdatedMessages(string oldStr, string newStr);

   // `string` টাইপের একটি স্টেট ভেরিয়েবল `message` ডিক্লেয়ার করে।
   // স্টেট ভেরিয়েবল হলো এমন ভেরিয়েবল যার মান স্থায়ীভাবে কন্ট্রাক্ট স্টোরেজে সংরক্ষিত থাকে। `public` কিওয়ার্ড ভেরিয়েবলগুলোকে কন্ট্রাক্টের বাইরে থেকে অ্যাক্সেসযোগ্য করে তোলে এবং এমন একটি ফাংশন তৈরি করে যা অন্যান্য কন্ট্রাক্ট বা ক্লায়েন্টরা মান অ্যাক্সেস করতে কল করতে পারে।
   string public message;

   // অনেক ক্লাস-ভিত্তিক অবজেক্ট-ওরিয়েন্টেড ভাষার মতো, কনস্ট্রাক্টর হলো একটি বিশেষ ফাংশন যা শুধুমাত্র কন্ট্রাক্ট তৈরির সময় এক্সিকিউট হয়।
   // কনস্ট্রাক্টরগুলো কন্ট্রাক্টের ডেটা ইনিশিয়ালাইজ করতে ব্যবহৃত হয়। আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // একটি স্ট্রিং আর্গুমেন্ট `initMessage` গ্রহণ করে এবং কন্ট্রাক্টের `message` স্টোরেজ ভেরিয়েবলে মান সেট করে)।
      message = initMessage;
   }

   // একটি পাবলিক ফাংশন যা একটি স্ট্রিং আর্গুমেন্ট গ্রহণ করে এবং `message` স্টোরেজ ভেরিয়েবল আপডেট করে।
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

স্মার্ট কন্ট্রাক্ট ইভেন্টগুলো হলো আপনার কন্ট্রাক্টের জন্য ব্লকচেইন এ কিছু ঘটেছে (অর্থাৎ, একটি _ইভেন্ট_ ছিল) তা আপনার ফ্রন্ট-এন্ড অ্যাপ্লিকেশনে জানানোর একটি উপায়, যা নির্দিষ্ট ইভেন্টগুলোর জন্য 'লিসেনিং' করতে পারে এবং সেগুলো ঘটলে ব্যবস্থা নিতে পারে।

`addSmartContractListener` ফাংশনটি বিশেষভাবে আমাদের Hello World স্মার্ট কন্ট্রাক্ট এর `UpdatedMessages` ইভেন্টের জন্য লিসেন করবে এবং নতুন মেসেজটি প্রদর্শন করতে আমাদের UI আপডেট করবে।

`addSmartContractListener` নিচের মতো মডিফাই করুন:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

লিসেনার যখন কোনো ইভেন্ট শনাক্ত করে তখন কী ঘটে তা চলুন ভেঙে দেখি:

- ইভেন্টটি এমিট হওয়ার সময় যদি কোনো ত্রুটি ঘটে, তবে এটি আমাদের `status` স্টেট ভেরিয়েবলের মাধ্যমে UI-তে প্রতিফলিত হবে।
- অন্যথায়, আমরা রিটার্ন করা `data` অবজেক্টটি ব্যবহার করব। `data.returnValues` হলো শূন্যতে ইনডেক্স করা একটি অ্যারে যেখানে অ্যারের প্রথম উপাদানটি আগের মেসেজটি সংরক্ষণ করে এবং দ্বিতীয় উপাদানটি আপডেট করা মেসেজটি সংরক্ষণ করে। সব মিলিয়ে, একটি সফল ইভেন্টে আমরা আমাদের `message` স্ট্রিংটিকে আপডেট করা মেসেজে সেট করব, `newMessage` স্ট্রিংটি ক্লিয়ার করব এবং আমাদের স্মার্ট কন্ট্রাক্ট এ একটি নতুন মেসেজ পাবলিশ করা হয়েছে তা প্রতিফলিত করতে আমাদের `status` স্টেট ভেরিয়েবল আপডেট করব।

অবশেষে, চলুন আমাদের `useEffect` ফাংশনে আমাদের লিসেনারকে কল করি যাতে এটি `HelloWorld.js` কম্পোনেন্টের প্রথম রেন্ডারে ইনিশিয়ালাইজ হয়। সব মিলিয়ে, আপনার `useEffect` ফাংশনটি এরকম হওয়া উচিত:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

এখন যেহেতু আমরা আমাদের স্মার্ট কন্ট্রাক্ট থেকে রিড করতে সক্ষম, তাই এতে কীভাবে রাইট করতে হয় তা বের করা দারুণ হবে! তবে, আমাদের ডিএ্যাপ এ রাইট করতে, আমাদের প্রথমে এর সাথে একটি ইথিরিয়াম ওয়ালেট কানেক্ট থাকতে হবে।

সুতরাং, এরপর আমরা আমাদের ইথিরিয়াম ওয়ালেট (MetaMask) সেট আপ করা এবং তারপর এটিকে আমাদের ডিএ্যাপ এর সাথে কানেক্ট করার বিষয়টি সামলাব!

### ধাপ 4: আপনার ইথিরিয়াম ওয়ালেট সেট আপ করুন {#step-4-set-up-your-ethereum-wallet}

ইথিরিয়াম চেইনে কিছু রাইট করতে, ব্যবহারকারীদের অবশ্যই তাদের ভার্চুয়াল ওয়ালেট এর প্রাইভেট কি ব্যবহার করে লেনদেন সাইন করতে হবে। এই টিউটোরিয়ালের জন্য, আমরা [MetaMask](https://metamask.io/) ব্যবহার করব, যা ব্রাউজারে একটি ভার্চুয়াল ওয়ালেট যা আপনার ইথিরিয়াম একাউন্ট এডড্রেস পরিচালনা করতে ব্যবহৃত হয়, কারণ এটি শেষ-ব্যবহারকারীর জন্য এই লেনদেন সাইন করা অত্যন্ত সহজ করে তোলে।

ইথিরিয়াম এ লেনদেন কীভাবে কাজ করে সে সম্পর্কে আপনি যদি আরও বুঝতে চান, তবে ইথিরিয়াম ফাউন্ডেশনের [এই পেজটি](/developers/docs/transactions/) চেক করুন।

#### MetaMask ডাউনলোড করুন {#download-metamask}

আপনি বিনামূল্যে [এখানে](https://metamask.io/download) একটি MetaMask একাউন্ট ডাউনলোড এবং তৈরি করতে পারেন। যখন আপনি একটি একাউন্ট তৈরি করছেন, বা যদি আপনার আগে থেকেই একটি একাউন্ট থাকে, তবে উপরের ডানদিকে "Goerli Test Network"-এ স্যুইচ করতে ভুলবেন না (যাতে আমরা আসল টাকা নিয়ে কাজ না করি)।

#### একটি ফাসেট থেকে ইথার যোগ করুন {#add-ether-from-a-faucet}

ইথিরিয়াম ব্লকচেইন এ একটি লেনদেন সাইন করতে, আমাদের কিছু ফেক Eth প্রয়োজন হবে। Eth পেতে আপনি [FaucETH](https://fauceth.komputing.org)-এ যেতে পারেন এবং আপনার Goerli একাউন্ট এডড্রেস লিখতে পারেন, "Request funds"-এ ক্লিক করুন, তারপর ড্রপডাউনে "Ethereum Testnet Goerli" নির্বাচন করুন এবং অবশেষে আবার "Request funds" বোতামে ক্লিক করুন। এর পরপরই আপনার MetaMask একাউন্টে Eth দেখতে পাওয়া উচিত!

#### আপনার ব্যালেন্স চেক করুন {#check-your-balance}

আমাদের ব্যালেন্স সেখানে আছে কিনা তা ডাবল চেক করতে, চলুন [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ব্যবহার করে একটি [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) রিকোয়েস্ট করি। এটি আমাদের ওয়ালেট এ Eth এর পরিমাণ রিটার্ন করবে। আপনার MetaMask একাউন্ট এডড্রেস ইনপুট করার পর এবং "Send Request"-এ ক্লিক করার পর, আপনার এরকম একটি রেসপন্স দেখা উচিত:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**নোট:** এই ফলাফলটি wei-তে, eth-এ নয়। Wei ইথারের ক্ষুদ্রতম একক হিসেবে ব্যবহৃত হয়। wei থেকে eth-এ রূপান্তর হলো: 1 eth = 10¹⁸ wei। তাই যদি আমরা 0xde0b6b3a7640000-কে ডেসিমালে রূপান্তর করি তবে আমরা 1\*10¹⁸ পাই যা 1 eth এর সমান।

যাক! আমাদের ফেক টাকা সব সেখানেই আছে! 🤑

### ধাপ 5: আপনার UI-এর সাথে MetaMask কানেক্ট করুন {#step-5-connect-metamask-to-your-UI}

এখন যেহেতু আমাদের MetaMask ওয়ালেট সেট আপ করা হয়েছে, চলুন আমাদের ডিএ্যাপ এর সাথে এটি কানেক্ট করি!

#### `connectWallet` ফাংশন {#the-connectWallet-function}

আমাদের `interact.js` ফাইলে, চলুন `connectWallet` ফাংশনটি ইমপ্লিমেন্ট করি, যা আমরা পরে আমাদের `HelloWorld.js` কম্পোনেন্টে কল করতে পারি।

চলুন `connectWallet` নিচের মতো মডিফাই করি:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

তাহলে কোডের এই বিশাল ব্লকটি আসলে কী করে?

প্রথমত, এটি চেক করে যে আপনার ব্রাউজারে `window.ethereum` এনাবল করা আছে কিনা।

`window.ethereum` হলো MetaMask এবং অন্যান্য ওয়ালেট প্রোভাইডারদের দ্বারা ইনজেক্ট করা একটি গ্লোবাল API যা ওয়েবসাইটগুলোকে ব্যবহারকারীদের ইথিরিয়াম একাউন্ট রিকোয়েস্ট করার অনুমতি দেয়। যদি অনুমোদিত হয়, তবে এটি ব্যবহারকারী যে ব্লকচেইন গুলোর সাথে কানেক্টেড আছে তা থেকে ডেটা রিড করতে পারে এবং ব্যবহারকারীকে মেসেজ এবং লেনদেন সাইন করার পরামর্শ দিতে পারে। আরও তথ্যের জন্য [MetaMask docs](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) চেক করুন!

যদি `window.ethereum` উপস্থিত _না থাকে_, তবে এর মানে হলো MetaMask ইনস্টল করা নেই। এর ফলে একটি JSON অবজেক্ট রিটার্ন করা হয়, যেখানে রিটার্ন করা `address` হলো একটি খালি স্ট্রিং এবং `status` JSX অবজেক্টটি রিলে করে যে ব্যবহারকারীকে অবশ্যই MetaMask ইনস্টল করতে হবে।

এখন যদি `window.ethereum` উপস্থিত _থাকে_, তবে তখনই বিষয়গুলো আকর্ষণীয় হয়ে ওঠে।

একটি try/catch লুপ ব্যবহার করে, আমরা [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) কল করে MetaMask-এর সাথে কানেক্ট করার চেষ্টা করব। এই ফাংশনটি কল করলে ব্রাউজারে MetaMask খুলবে, যার মাধ্যমে ব্যবহারকারীকে তাদের ওয়ালেট আপনার ডিএ্যাপ এর সাথে কানেক্ট করার জন্য প্রম্পট করা হবে।

- যদি ব্যবহারকারী কানেক্ট করা বেছে নেন, `method: "eth_requestAccounts"` একটি অ্যারে রিটার্ন করবে যাতে ডিএ্যাপ এর সাথে কানেক্ট করা ব্যবহারকারীর সমস্ত একাউন্ট এডড্রেস থাকে। সব মিলিয়ে, আমাদের `connectWallet` ফাংশনটি একটি JSON অবজেক্ট রিটার্ন করবে যাতে এই অ্যারের _প্রথম_ `address` (লাইন 9 দেখুন) এবং একটি `status` মেসেজ থাকে যা ব্যবহারকারীকে স্মার্ট কন্ট্রাক্ট এ একটি মেসেজ লিখতে প্রম্পট করে।
- যদি ব্যবহারকারী কানেকশনটি প্রত্যাখ্যান করেন, তবে JSON অবজেক্টটিতে রিটার্ন করা `address` এর জন্য একটি খালি স্ট্রিং এবং একটি `status` মেসেজ থাকবে যা প্রতিফলিত করে যে ব্যবহারকারী কানেকশনটি প্রত্যাখ্যান করেছেন।

এখন যেহেতু আমরা এই `connectWallet` ফাংশনটি লিখেছি, পরবর্তী ধাপ হলো এটিকে আমাদের `HelloWorld.js` কম্পোনেন্টে কল করা।

#### আপনার `HelloWorld.js` UI কম্পোনেন্টে `connectWallet` ফাংশন যোগ করুন {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js`-এ `connectWalletPressed` ফাংশনে নেভিগেট করুন এবং এটিকে নিচের মতো আপডেট করুন:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

লক্ষ্য করেছেন কীভাবে আমাদের বেশিরভাগ কার্যকারিতা `interact.js` ফাইল থেকে আমাদের `HelloWorld.js` কম্পোনেন্ট থেকে অ্যাবস্ট্রাক্ট করা হয়েছে? এটি করা হয়েছে যাতে আমরা M-V-C প্যারাডাইম মেনে চলি!

`connectWalletPressed`-এ, আমরা কেবল আমাদের ইমপোর্ট করা `connectWallet` ফাংশনে একটি await কল করি এবং এর রেসপন্স ব্যবহার করে, আমরা তাদের স্টেট হুকগুলোর মাধ্যমে আমাদের `status` এবং `walletAddress` ভেরিয়েবলগুলো আপডেট করি।

এখন, চলুন উভয় ফাইল (`HelloWorld.js` এবং `interact.js`) সেভ করি এবং এ পর্যন্ত আমাদের UI টেস্ট করি।

[http://localhost:3000/](http://localhost:3000/) পেজে আপনার ব্রাউজার খুলুন এবং পেজের উপরের ডানদিকে "Connect Wallet" বোতাম টিপুন।

আপনার যদি MetaMask ইনস্টল করা থাকে, তবে আপনাকে আপনার ডিএ্যাপ এর সাথে আপনার ওয়ালেট কানেক্ট করার জন্য প্রম্পট করা উচিত। কানেক্ট করার আমন্ত্রণ গ্রহণ করুন।

আপনার দেখা উচিত যে ওয়ালেট বোতামটি এখন প্রতিফলিত করে যে আপনার এডড্রেস কানেক্টেড! দারুণ 🔥

এরপর, পেজটি রিফ্রেশ করার চেষ্টা করুন... এটি অদ্ভুত। আমাদের ওয়ালেট বোতামটি আমাদের MetaMask কানেক্ট করতে প্রম্পট করছে, যদিও এটি আগে থেকেই কানেক্টেড...

তবে, ভয় পাবেন না! আমরা সহজেই `getCurrentWalletConnected` ইমপ্লিমেন্ট করে এর সমাধান করতে পারি, যা চেক করবে যে কোনো এডড্রেস আগে থেকেই আমাদের ডিএ্যাপ এর সাথে কানেক্টেড কিনা এবং সেই অনুযায়ী আমাদের UI আপডেট করবে!

#### `getCurrentWalletConnected` ফাংশন {#the-getcurrentwalletconnected-function}

`interact.js` ফাইলে আপনার `getCurrentWalletConnected` ফাংশনটি নিচের মতো আপডেট করুন:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

এই কোডটি আগের ধাপে আমাদের লেখা `connectWallet` ফাংশনের _খুবই_ কাছাকাছি।

প্রধান পার্থক্য হলো `eth_requestAccounts` মেথড কল করার পরিবর্তে, যা ব্যবহারকারীর ওয়ালেট কানেক্ট করার জন্য MetaMask খোলে, এখানে আমরা `eth_accounts` মেথড কল করি, যা কেবল বর্তমানে আমাদের ডিএ্যাপ এর সাথে কানেক্টেড MetaMask এডড্রেস গুলো ধারণকারী একটি অ্যারে রিটার্ন করে।

এই ফাংশনটি কাজ করতে দেখতে, চলুন এটিকে আমাদের `HelloWorld.js` কম্পোনেন্টের `useEffect` ফাংশনে কল করি:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

লক্ষ্য করুন, আমরা আমাদের `walletAddress` এবং `status` স্টেট ভেরিয়েবলগুলো আপডেট করতে `getCurrentWalletConnected`-এ আমাদের কলের রেসপন্স ব্যবহার করি।

এখন যেহেতু আপনি এই কোডটি যোগ করেছেন, চলুন আমাদের ব্রাউজার উইন্ডো রিফ্রেশ করার চেষ্টা করি।

চমৎকার! বোতামটির বলা উচিত যে আপনি কানেক্টেড, এবং আপনার কানেক্টেড ওয়ালেট এর এডড্রেস এর একটি প্রিভিউ দেখানো উচিত - এমনকি আপনি রিফ্রেশ করার পরেও!

#### `addWalletListener` ইমপ্লিমেন্ট করুন {#implement-addwalletlistener}

আমাদের ডিএ্যাপ ওয়ালেট সেটআপের চূড়ান্ত ধাপ হলো ওয়ালেট লিসেনার ইমপ্লিমেন্ট করা যাতে আমাদের ওয়ালেট এর স্টেট পরিবর্তন হলে আমাদের UI আপডেট হয়, যেমন যখন ব্যবহারকারী ডিসকানেক্ট করে বা একাউন্ট পরিবর্তন করে।

আপনার `HelloWorld.js` ফাইলে, আপনার `addWalletListener` ফাংশনটি নিচের মতো মডিফাই করুন:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

আমি বাজি ধরে বলতে পারি এই পর্যায়ে এখানে কী ঘটছে তা বুঝতে আপনার আমাদের সাহায্যেরও প্রয়োজন নেই, তবে পুঙ্খানুপুঙ্খতার উদ্দেশ্যে, চলুন এটি দ্রুত ভেঙে দেখি:

- প্রথমে, আমাদের ফাংশন চেক করে যে `window.ethereum` এনাবল করা আছে কিনা (অর্থাৎ, MetaMask ইনস্টল করা আছে কিনা)।
  - যদি না থাকে, তবে আমরা কেবল আমাদের `status` স্টেট ভেরিয়েবলটিকে একটি JSX স্ট্রিংয়ে সেট করি যা ব্যবহারকারীকে MetaMask ইনস্টল করতে প্রম্পট করে।
  - যদি এটি এনাবল করা থাকে, তবে আমরা 3 নম্বর লাইনে `window.ethereum.on("accountsChanged")` লিসেনার সেট আপ করি যা MetaMask ওয়ালেট এ স্টেট পরিবর্তনের জন্য লিসেন করে, যার মধ্যে রয়েছে যখন ব্যবহারকারী ডিএ্যাপ এ একটি অতিরিক্ত একাউন্ট কানেক্ট করে, একাউন্ট পরিবর্তন করে বা একটি একাউন্ট ডিসকানেক্ট করে। যদি অন্তত একটি একাউন্ট কানেক্টেড থাকে, তবে `walletAddress` স্টেট ভেরিয়েবলটি লিসেনার দ্বারা রিটার্ন করা `accounts` অ্যারের প্রথম একাউন্ট হিসেবে আপডেট করা হয়। অন্যথায়, `walletAddress` একটি খালি স্ট্রিং হিসেবে সেট করা হয়।

সবশেষে, আমাদের অবশ্যই এটিকে আমাদের `useEffect` ফাংশনে কল করতে হবে:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

এবং এটাই! আমরা সফলভাবে আমাদের সমস্ত ওয়ালেট কার্যকারিতা প্রোগ্রামিং সম্পন্ন করেছি! এখন আমাদের শেষ কাজ: আমাদের স্মার্ট কন্ট্রাক্ট এ সংরক্ষিত মেসেজটি আপডেট করা!

### ধাপ 6: `updateMessage` ফাংশন ইমপ্লিমেন্ট করুন {#step-6-implement-the-updateMessage-function}

ঠিক আছে বন্ধুরা, আমরা শেষ পর্যায়ে পৌঁছে গেছি! আপনার `interact.js` ফাইলের `updateMessage`-এ, আমরা নিচের কাজগুলো করতে যাচ্ছি:

1. নিশ্চিত করুন যে আমরা আমাদের স্মার্ট কন্ট্রাক্ট এ যে মেসেজটি পাবলিশ করতে চাই তা বৈধ
2. MetaMask ব্যবহার করে আমাদের লেনদেন সাইন করুন
3. আমাদের `HelloWorld.js` ফ্রন্টএন্ড কম্পোনেন্ট থেকে এই ফাংশনটি কল করুন

এতে খুব বেশি সময় লাগবে না; চলুন এই ডিএ্যাপ টি শেষ করি!

#### ইনপুট এরর হ্যান্ডলিং {#input-error-handling}

স্বাভাবিকভাবেই, ফাংশনের শুরুতে কোনো ধরনের ইনপুট এরর হ্যান্ডলিং থাকাটা যৌক্তিক।

আমরা চাইব আমাদের ফাংশনটি তাড়াতাড়ি রিটার্ন করুক যদি কোনো MetaMask এক্সটেনশন ইনস্টল করা না থাকে, কোনো ওয়ালেট কানেক্টেড না থাকে (অর্থাৎ, পাস করা `address` একটি খালি স্ট্রিং), বা `message` একটি খালি স্ট্রিং হয়। চলুন `updateMessage`-এ নিচের এরর হ্যান্ডলিং যোগ করি:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

এখন যেহেতু এতে সঠিক ইনপুট এরর হ্যান্ডলিং রয়েছে, তাই MetaMask-এর মাধ্যমে লেনদেন সাইন করার সময় এসেছে!

#### আমাদের লেনদেন সাইন করা {#signing-our-transaction}

আপনি যদি আগে থেকেই প্রথাগত web3 ইথিরিয়াম লেনদেন এর সাথে স্বাচ্ছন্দ্যবোধ করেন, তবে আমরা পরবর্তীতে যে কোডটি লিখব তা খুব পরিচিত হবে। আপনার ইনপুট এরর হ্যান্ডলিং কোডের নিচে, `updateMessage`-এ নিচের কোডটি যোগ করুন:

```javascript
// interact.js

// ট্রানজ্যাকশন প্যারামিটার সেট আপ করুন
const transactionParameters = {
  to: contractAddress, // কন্ট্রাক্ট পাবলিকেশন ছাড়া অন্যান্য সময় প্রয়োজনীয়।
  from: address, // অবশ্যই ব্যবহারকারীর সক্রিয় ঠিকানার সাথে মিলতে হবে।
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// ট্রানজ্যাকশন সাইন করুন
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

চলুন ভেঙে দেখি কী ঘটছে। প্রথমে, আমরা আমাদের লেনদেন প্যারামিটারগুলো সেট আপ করি, যেখানে:

- `to` প্রাপকের এডড্রেস (আমাদের স্মার্ট কন্ট্রাক্ট) নির্দিষ্ট করে
- `from` লেনদেন এর সাইনার নির্দিষ্ট করে, `address` ভেরিয়েবল যা আমরা আমাদের ফাংশনে পাস করেছি
- `data` আমাদের Hello World স্মার্ট কন্ট্রাক্ট এর `update` মেথডে কল ধারণ করে, যা ইনপুট হিসেবে আমাদের `message` স্ট্রিং ভেরিয়েবল গ্রহণ করে

তারপর, আমরা একটি await কল করি, `window.ethereum.request`, যেখানে আমরা MetaMask-কে লেনদেন সাইন করতে বলি। লক্ষ্য করুন, 11 এবং 12 লাইনে, আমরা আমাদের eth মেথড, `eth_sendTransaction` নির্দিষ্ট করছি এবং আমাদের `transactionParameters` পাস করছি।

এই পর্যায়ে, ব্রাউজারে MetaMask খুলবে এবং ব্যবহারকারীকে লেনদেন সাইন বা প্রত্যাখ্যান করতে প্রম্পট করবে।

- যদি লেনদেন সফল হয়, তবে ফাংশনটি একটি JSON অবজেক্ট রিটার্ন করবে যেখানে `status` JSX স্ট্রিং ব্যবহারকারীকে তাদের লেনদেন সম্পর্কে আরও তথ্যের জন্য Etherscan চেক করতে প্রম্পট করে।
- যদি লেনদেন ব্যর্থ হয়, তবে ফাংশনটি একটি JSON অবজেক্ট রিটার্ন করবে যেখানে `status` স্ট্রিং এরর মেসেজ রিলে করে।

সব মিলিয়ে, আমাদের `updateMessage` ফাংশনটি এরকম হওয়া উচিত:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // ইনপুট এরর হ্যান্ডলিং
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  // ট্রানজ্যাকশন প্যারামিটার সেট আপ করুন
  const transactionParameters = {
    to: contractAddress, // কন্ট্রাক্ট পাবলিকেশন ছাড়া অন্যান্য সময় প্রয়োজনীয়।
    from: address, // অবশ্যই ব্যবহারকারীর সক্রিয় ঠিকানার সাথে মিলতে হবে।
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // ট্রানজ্যাকশন সাইন করুন
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

সবশেষে, আমাদের `updateMessage` ফাংশনটিকে আমাদের `HelloWorld.js` কম্পোনেন্টের সাথে কানেক্ট করতে হবে।

#### `HelloWorld.js` ফ্রন্টএন্ডের সাথে `updateMessage` কানেক্ট করুন {#connect-updatemessage-to-the-helloworld-js-frontend}

আমাদের `onUpdatePressed` ফাংশনটির ইমপোর্ট করা `updateMessage` ফাংশনে একটি await কল করা উচিত এবং আমাদের লেনদেন সফল হয়েছে নাকি ব্যর্থ হয়েছে তা প্রতিফলিত করতে `status` স্টেট ভেরিয়েবল মডিফাই করা উচিত:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

এটি অত্যন্ত পরিচ্ছন্ন এবং সহজ। এবং জানেন কি... আপনার ডিএ্যাপ সম্পূর্ণ!!!

এগিয়ে যান এবং **Update** বোতামটি টেস্ট করুন!

### আপনার নিজস্ব কাস্টম ডিএ্যাপ তৈরি করুন {#make-your-own-custom-dapp}

দারুণ, আপনি টিউটোরিয়ালের শেষে পৌঁছে গেছেন! সংক্ষেপে বলতে গেলে, আপনি শিখেছেন কীভাবে:

- আপনার ডিএ্যাপ প্রজেক্টের সাথে একটি MetaMask ওয়ালেট কানেক্ট করতে হয়
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API ব্যবহার করে আপনার স্মার্ট কন্ট্রাক্ট থেকে ডেটা রিড করতে হয়
- MetaMask ব্যবহার করে ইথিরিয়াম লেনদেন সাইন করতে হয়

এখন আপনি আপনার নিজস্ব কাস্টম ডিএ্যাপ প্রজেক্ট তৈরি করতে এই টিউটোরিয়াল থেকে অর্জিত দক্ষতা প্রয়োগ করতে পুরোপুরি প্রস্তুত! বরাবরের মতো, আপনার যদি কোনো প্রশ্ন থাকে, তবে [Alchemy Discord](https://discord.gg/gWuC7zB)-এ সাহায্যের জন্য আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না। 🧙‍♂️

একবার আপনি এই টিউটোরিয়ালটি সম্পন্ন করার পর, আপনার অভিজ্ঞতা কেমন ছিল তা আমাদের জানান বা আপনার যদি কোনো মতামত থাকে তবে টুইটারে [@alchemyplatform](https://twitter.com/AlchemyPlatform)-এ আমাদের ট্যাগ করে জানান!