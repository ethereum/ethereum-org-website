---
title: "ওয়েব3 ব্যবহার করে লেনদেন পাঠানো"
description: "এটি ওয়েব3 ব্যবহার করে ইথিরিয়াম লেনদেন পাঠানোর জন্য একটি শিক্ষানবিস-বান্ধব গাইড। ইথিরিয়াম ব্লকচেইনে একটি লেনদেন পাঠানোর জন্য তিনটি প্রধান ধাপ রয়েছে: তৈরি করা, সাইন করা এবং ব্রডকাস্ট করা। আমরা এই তিনটি ধাপ নিয়েই আলোচনা করব।"
author: "এলান হ্যালপার্ন"
tags: ["লেনদেন", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "লেনদেন পাঠান"
lang: bn
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

এটি ওয়েব3 ব্যবহার করে ইথিরিয়াম লেনদেন পাঠানোর জন্য একটি শিক্ষানবিস-বান্ধব গাইড। ইথিরিয়াম ব্লকচেইনে একটি লেনদেন পাঠানোর জন্য তিনটি প্রধান ধাপ রয়েছে: তৈরি করা, সাইন করা এবং ব্রডকাস্ট করা। আমরা এই তিনটি ধাপ নিয়েই আলোচনা করব, আশা করি আপনার যেকোনো প্রশ্নের উত্তর দিতে পারব! এই টিউটোরিয়ালে, আমরা ইথিরিয়াম চেইনে আমাদের লেনদেন পাঠাতে [Alchemy](https://www.alchemy.com/) ব্যবহার করব। আপনি [এখানে একটি বিনামূল্যের Alchemy একাউন্ট তৈরি করতে পারেন](https://auth.alchemyapi.io/signup)।

**নোট:** এই গাইডটি আপনার অ্যাপের _ব্যাকএন্ডে_ আপনার লেনদেন সাইন করার জন্য। আপনি যদি ফ্রন্টএন্ডে আপনার লেনদেন সাইন করা ইন্টিগ্রেট করতে চান, তবে [ব্রাউজার প্রোভাইডারের সাথে ওয়েব3](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider) ইন্টিগ্রেট করার বিষয়টি দেখে নিন।

## বেসিক বিষয়সমূহ {#the-basics}

বেশিরভাগ ব্লকচেইন ডেভেলপারদের মতো যখন তারা প্রথম শুরু করে, আপনি হয়তো কীভাবে একটি লেনদেন পাঠাতে হয় (যা বেশ সহজ হওয়া উচিত) তা নিয়ে কিছু গবেষণা করেছেন এবং প্রচুর গাইডের সম্মুখীন হয়েছেন, যার প্রতিটি ভিন্ন ভিন্ন কথা বলছে এবং আপনাকে কিছুটা অভিভূত ও বিভ্রান্ত করে তুলেছে। আপনি যদি সেই অবস্থায় থাকেন, তবে চিন্তা করবেন না; আমরা সবাই কোনো না কোনো সময় সেখানে ছিলাম! তাই, শুরু করার আগে, আসুন কয়েকটি বিষয় পরিষ্কার করে নিই:

### 1\. Alchemy আপনার প্রাইভেট কি সংরক্ষণ করে না {#alchemy-does-not-store-your-private-keys}

- এর মানে হলো Alchemy আপনার হয়ে লেনদেন সাইন এবং পাঠাতে পারে না। এর কারণ হলো নিরাপত্তার উদ্দেশ্য। Alchemy কখনোই আপনাকে আপনার প্রাইভেট কি শেয়ার করতে বলবে না, এবং আপনার কখনোই কোনো হোস্টেড নোড (বা অন্য কারো সাথে) আপনার প্রাইভেট কি শেয়ার করা উচিত নয়।
- আপনি Alchemy-এর কোর API ব্যবহার করে ব্লকচেইন থেকে পড়তে পারেন, কিন্তু এতে লিখতে হলে Alchemy-এর মাধ্যমে পাঠানোর আগে আপনার লেনদেন সাইন করার জন্য অন্য কিছু ব্যবহার করতে হবে (এটি অন্য যেকোনো [নোড সার্ভিসের](/developers/docs/nodes-and-clients/nodes-as-a-service/) ক্ষেত্রেও একই)।

### 2\. "সাইনার" কী? {#what-is-a-signer}

- সাইনাররা আপনার প্রাইভেট কি ব্যবহার করে আপনার জন্য লেনদেন সাইন করবে। এই টিউটোরিয়ালে আমরা আমাদের লেনদেন সাইন করতে [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) ব্যবহার করব, তবে আপনি অন্য যেকোনো ওয়েব3 লাইব্রেরিও ব্যবহার করতে পারেন।
- ফ্রন্টএন্ডে, সাইনারের একটি ভালো উদাহরণ হতে পারে [MetaMask](https://metamask.io/), যা আপনার হয়ে লেনদেন সাইন করবে এবং পাঠাবে।

### 3\. কেন আমাকে আমার লেনদেন সাইন করতে হবে? {#why-do-i-need-to-sign-my-transactions}

- ইথিরিয়াম নেটওয়ার্ক-এ লেনদেন পাঠাতে ইচ্ছুক প্রত্যেক ব্যবহারকারীকে অবশ্যই লেনদেনটি সাইন করতে হবে (তাদের প্রাইভেট কি ব্যবহার করে), যাতে লেনদেনের উৎসটি যে দাবি করছে তা যাচাই করা যায়।
- এই প্রাইভেট কি সুরক্ষিত রাখা অত্যন্ত গুরুত্বপূর্ণ, কারণ এতে অ্যাক্সেস থাকলে আপনার ইথিরিয়াম একাউন্ট-এর উপর সম্পূর্ণ নিয়ন্ত্রণ পাওয়া যায়, যা আপনাকে (বা অ্যাক্সেস থাকা যে কাউকে) আপনার হয়ে লেনদেন করার অনুমতি দেয়।

### 4\. আমি কীভাবে আমার প্রাইভেট কি সুরক্ষিত রাখব? {#how-do-i-protect-my-private-key}

- আপনার প্রাইভেট কি সুরক্ষিত রাখার এবং লেনদেন পাঠানোর জন্য এটি ব্যবহার করার অনেক উপায় রয়েছে। এই টিউটোরিয়ালে আমরা একটি `.env` ফাইল ব্যবহার করব। তবে, আপনি প্রাইভেট কি সংরক্ষণ করে এমন একটি আলাদা প্রোভাইডার ব্যবহার করতে পারেন, একটি কিস্টোর ফাইল ব্যবহার করতে পারেন, বা অন্যান্য বিকল্প ব্যবহার করতে পারেন।

### 5\. `eth_sendTransaction` এবং `eth_sendRawTransaction`-এর মধ্যে পার্থক্য কী? {#difference-between-send-and-send-raw}

`eth_sendTransaction` এবং `eth_sendRawTransaction` উভয়ই ইথিরিয়াম API ফাংশন যা ইথিরিয়াম নেটওয়ার্ক-এ একটি লেনদেন ব্রডকাস্ট করে যাতে এটি ভবিষ্যতের একটি ব্লক-এ যুক্ত হয়। লেনদেন সাইন করার ক্ষেত্রে তারা কীভাবে কাজ করে তাতে তাদের পার্থক্য রয়েছে।

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) _আনসাইনড_ লেনদেন পাঠানোর জন্য ব্যবহৃত হয়, যার মানে হলো আপনি যে নোড-এ পাঠাচ্ছেন তাকে অবশ্যই আপনার প্রাইভেট কি পরিচালনা করতে হবে যাতে এটি চেইনে ব্রডকাস্ট করার আগে লেনদেনটি সাইন করতে পারে। যেহেতু Alchemy ব্যবহারকারীর প্রাইভেট কি রাখে না, তাই তারা এই পদ্ধতি সমর্থন করে না।
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) এমন লেনদেন ব্রডকাস্ট করতে ব্যবহৃত হয় যা ইতিমধ্যে সাইন করা হয়েছে। এর মানে হলো আপনাকে প্রথমে [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) ব্যবহার করতে হবে, তারপর ফলাফলটি `eth_sendRawTransaction`-এ পাস করতে হবে।

ওয়েব3 ব্যবহার করার সময়, [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) ফাংশন কল করে `eth_sendRawTransaction` অ্যাক্সেস করা হয়।

এই টিউটোরিয়ালে আমরা এটিই ব্যবহার করব।

### 6\. ওয়েব3 লাইব্রেরি কী? {#what-is-the-web3-library}

- Web3.js হলো স্ট্যান্ডার্ড JSON-RPC কলের চারপাশে একটি র‍্যাপার লাইব্রেরি যা ইথিরিয়াম ডেভেলপমেন্টে ব্যবহার করা বেশ সাধারণ।
- বিভিন্ন ভাষার জন্য অনেক ওয়েব3 লাইব্রেরি রয়েছে। এই টিউটোরিয়ালে আমরা [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) ব্যবহার করব যা জাভাস্ক্রিপ্টে লেখা। আপনি [এখানে](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) অন্যান্য বিকল্প যেমন [ethers.js](https://docs.ethers.org/v5/) দেখতে পারেন।

ঠিক আছে, এখন যেহেতু আমরা এই কয়েকটি প্রশ্নের উত্তর পেয়েছি, চলুন টিউটোরিয়ালে এগিয়ে যাই। Alchemy [discord](https://discord.gg/gWuC7zB)-এ যেকোনো সময় প্রশ্ন করতে দ্বিধা করবেন না!

### 7\. কীভাবে নিরাপদ, গ্যাস-অপ্টিমাইজড এবং প্রাইভেট লেনদেন পাঠাবেন? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy-এর Transact API-এর একটি স্যুট রয়েছে](https://docs.alchemy.com/reference/transact-api-quickstart)। আপনি এগুলো ব্যবহার করে রিইনফোর্সড লেনদেন পাঠাতে, লেনদেন হওয়ার আগে সিমুলেট করতে, প্রাইভেট লেনদেন পাঠাতে এবং গ্যাস-অপ্টিমাইজড লেনদেন পাঠাতে পারেন।
- আপনার লেনদেন মেমপুল থেকে টেনে নিয়ে চেইনে যুক্ত করা হলে সতর্ক হওয়ার জন্য আপনি [Notify API](https://docs.alchemy.com/docs/alchemy-notify) ব্যবহার করতে পারেন।

**নোট:** এই গাইডের জন্য একটি Alchemy একাউন্ট, একটি ইথিরিয়াম এডড্রেস বা MetaMask ওয়ালেট, NodeJs এবং npm ইনস্টল করা প্রয়োজন। যদি না থাকে, তবে এই ধাপগুলো অনুসরণ করুন:

1.  [একটি বিনামূল্যের Alchemy একাউন্ট তৈরি করুন](https://auth.alchemyapi.io/signup)
2.  [MetaMask একাউন্ট তৈরি করুন](https://metamask.io/) (বা একটি ইথিরিয়াম এডড্রেস পান)
3.  [NodeJs এবং NPM ইনস্টল করতে এই ধাপগুলো অনুসরণ করুন](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## আপনার লেনদেন পাঠানোর ধাপসমূহ {#steps-to-sending-your-transaction}

### 1\. Sepolia টেস্টনেট-এ একটি Alchemy অ্যাপ তৈরি করুন {#create-an-alchemy-app-on-the-sepolia-testnet}

আপনার [Alchemy Dashboard](https://dashboard.alchemyapi.io/)-এ যান এবং আপনার নেটওয়ার্ক-এর জন্য Sepolia (বা অন্য কোনো টেস্টনেট) বেছে নিয়ে একটি নতুন অ্যাপ তৈরি করুন।

### 2\. Sepolia ফাসেট থেকে ETH অনুরোধ করুন {#request-eth-from-sepolia-faucet}

ETH পেতে [Alchemy Sepolia ফাসেট](https://www.sepoliafaucet.com/)-এর নির্দেশাবলী অনুসরণ করুন। নিশ্চিত করুন যে আপনি আপনার **Sepolia** ইথিরিয়াম এডড্রেস (MetaMask থেকে) অন্তর্ভুক্ত করেছেন এবং অন্য কোনো নেটওয়ার্ক নয়। নির্দেশাবলী অনুসরণ করার পর, আপনার ওয়ালেট-এ ETH পেয়েছেন কিনা তা দুবার চেক করুন।

### 3\. একটি নতুন প্রজেক্ট ডিরেক্টরি তৈরি করুন এবং এতে `cd` করুন {#create-a-new-project-direction}

কমান্ড লাইন (ম্যাকের জন্য টার্মিনাল) থেকে একটি নতুন প্রজেক্ট ডিরেক্টরি তৈরি করুন এবং এতে নেভিগেট করুন:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Alchemy Web3 (বা যেকোনো ওয়েব3 লাইব্রেরি) ইনস্টল করুন {#install-alchemy-web3}

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) ইনস্টল করতে আপনার প্রজেক্ট ডিরেক্টরিতে নিচের কমান্ডটি রান করুন:

মনে রাখবেন, আপনি যদি ethers.js লাইব্রেরি ব্যবহার করতে চান, তবে [এখানকার নির্দেশাবলী অনুসরণ করুন](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)।

```
npm install @alch/alchemy-web3
```

### 5\. dotenv ইনস্টল করুন {#install-dotenv}

আমরা আমাদের API কি এবং প্রাইভেট কি নিরাপদে সংরক্ষণ করতে একটি `.env` ফাইল ব্যবহার করব।

```
npm install dotenv --save
```

### 6\. `.env` ফাইল তৈরি করুন {#create-the-dotenv-file}

আপনার প্রজেক্ট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন এবং নিচের বিষয়গুলো যোগ করুন ("`your-api-url`" এবং "`your-private-key`" প্রতিস্থাপন করে)

- আপনার Alchemy API URL খুঁজে পেতে, আপনার ড্যাশবোর্ডে সদ্য তৈরি করা অ্যাপের অ্যাপ ডিটেইলস পেজে যান, উপরের ডানদিকের কোণায় "View Key"-তে ক্লিক করুন এবং HTTP URL-টি নিন।
- MetaMask ব্যবহার করে আপনার প্রাইভেট কি খুঁজে পেতে, এই [গাইডটি](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) দেখুন।

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> কমিট করবেন না! দয়া করে নিশ্চিত করুন যে আপনি কখনোই আপনার <code>.env</code> ফাইলটি কারো সাথে শেয়ার বা প্রকাশ করবেন না, কারণ এমনটি করলে আপনি আপনার গোপনীয়তা বিপন্ন করছেন। আপনি যদি ভার্সন কন্ট্রোল ব্যবহার করেন, তবে আপনার <code>.env</code> ফাইলটি একটি <a href="https://git-scm.com/docs/gitignore">gitignore</a> ফাইলে যোগ করুন।
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js` ফাইল তৈরি করুন {#create-sendtx-js}

দারুণ, এখন যেহেতু আমাদের সংবেদনশীল ডেটা একটি `.env` ফাইলে সুরক্ষিত আছে, চলুন কোডিং শুরু করি। আমাদের লেনদেন পাঠানোর উদাহরণের জন্য, আমরা Sepolia ফাসেট-এ ETH ফেরত পাঠাব।

একটি `sendTx.js` ফাইল তৈরি করুন, যেখানে আমরা আমাদের উদাহরণ লেনদেন কনফিগার করব এবং পাঠাব, এবং এতে নিচের কোড লাইনগুলো যোগ করুন:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

**লাইন 6**-এর এডড্রেসটি আপনার নিজের পাবলিক এডড্রেস দিয়ে প্রতিস্থাপন করতে ভুলবেন না।

এখন, এই কোডটি রান করার আগে, চলুন এখানকার কিছু উপাদান নিয়ে কথা বলি।

- `nonce` : নন্স স্পেসিফিকেশন আপনার এডড্রেস থেকে পাঠানো লেনদেনের সংখ্যার ট্র্যাক রাখতে ব্যবহৃত হয়। নিরাপত্তার উদ্দেশ্যে এবং [রিপ্লে অ্যাটাক](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) প্রতিরোধ করতে আমাদের এটি প্রয়োজন। আপনার এডড্রেস থেকে পাঠানো লেনদেনের সংখ্যা পেতে আমরা [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) ব্যবহার করি।
- `transaction`: লেনদেন অবজেক্টের কয়েকটি দিক রয়েছে যা আমাদের নির্দিষ্ট করতে হবে
  - `to`: এটি হলো সেই এডড্রেস যেখানে আমরা ETH পাঠাতে চাই। এই ক্ষেত্রে, আমরা যে [Sepolia ফাসেট](https://sepoliafaucet.com/) থেকে প্রাথমিকভাবে অনুরোধ করেছিলাম সেখানে ETH ফেরত পাঠাচ্ছি।
  - `value`: এটি হলো সেই পরিমাণ যা আমরা পাঠাতে চাই, যা Wei-তে নির্দিষ্ট করা হয় যেখানে 10^18 Wei = 1 ETH
  - `gas`: আপনার লেনদেনের সাথে সঠিক পরিমাণ গ্যাস অন্তর্ভুক্ত করার অনেক উপায় রয়েছে। এমনকি Alchemy-এর একটি [গ্যাস প্রাইস ওয়েবহুক](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) রয়েছে যা গ্যাস প্রাইস একটি নির্দিষ্ট সীমার নিচে নেমে গেলে আপনাকে অবহিত করে। মেইননেট লেনদেনের জন্য, সঠিক পরিমাণ গ্যাস নির্ধারণ করতে [ETH Gas Station](https://ethgasstation.info/)-এর মতো একটি গ্যাস এস্টিমেটর চেক করা ভালো অভ্যাস। 21000 হলো ইথিরিয়ামে একটি অপারেশনে ব্যবহৃত ন্যূনতম গ্যাস, তাই আমাদের লেনদেনটি এক্সিকিউট হবে তা নিশ্চিত করতে আমরা এখানে 30000 দিয়েছি।
  - `nonce`: উপরের নন্স সংজ্ঞা দেখুন। নন্স শূন্য থেকে গণনা শুরু করে।
  - [OPTIONAL] data: আপনার ট্রান্সফারের সাথে অতিরিক্ত তথ্য পাঠাতে, বা একটি স্মার্ট কন্ট্রাক্ট কল করতে ব্যবহৃত হয়, ব্যালেন্স ট্রান্সফারের জন্য প্রয়োজনীয় নয়, নিচের নোটটি দেখুন।
- `signedTx`: আমাদের লেনদেন অবজেক্ট সাইন করতে আমরা আমাদের `PRIVATE_KEY`-এর সাথে `signTransaction` মেথড ব্যবহার করব।
- `sendSignedTransaction`: একবার আমাদের কাছে একটি সাইন করা লেনদেন থাকলে, আমরা `sendSignedTransaction` ব্যবহার করে এটিকে পরবর্তী একটি ব্লক-এ অন্তর্ভুক্ত করার জন্য পাঠাতে পারি।

**ডেটা সম্পর্কিত একটি নোট**
ইথিরিয়ামে প্রধানত দুই ধরনের লেনদেন পাঠানো যায়।

- ব্যালেন্স ট্রান্সফার: এক এডড্রেস থেকে অন্য এডড্রেস-এ ETH পাঠান। কোনো ডেটা ফিল্ডের প্রয়োজন নেই, তবে, আপনি যদি আপনার লেনদেনের পাশাপাশি অতিরিক্ত তথ্য পাঠাতে চান, তবে আপনি এই ফিল্ডে HEX ফরম্যাটে সেই তথ্য অন্তর্ভুক্ত করতে পারেন।
  - উদাহরণস্বরূপ, ধরুন আমরা একটি IPFS ডকুমেন্টের হ্যাস ইথিরিয়াম চেইনে লিখতে চাই যাতে এটিকে একটি ইমমিউটেবল টাইমস্ট্যাম্প দেওয়া যায়। তাহলে আমাদের ডেটা ফিল্ডটি দেখতে এমন হওয়া উচিত: `web3.utils.toHex(‘IPFS hash‘)`। এবং এখন যে কেউ চেইনে কোয়েরি করতে পারে এবং দেখতে পারে কখন সেই ডকুমেন্টটি যোগ করা হয়েছিল।
- স্মার্ট কন্ট্রাক্ট লেনদেন: চেইনে কিছু স্মার্ট কন্ট্রাক্ট কোড এক্সিকিউট করুন। এই ক্ষেত্রে, ডেটা ফিল্ডে আপনার এক্সিকিউট করতে চাওয়া স্মার্ট ফাংশন এবং যেকোনো প্যারামিটার থাকা উচিত।
  - একটি ব্যবহারিক উদাহরণের জন্য, এই [হ্যালো ওয়ার্ল্ড টিউটোরিয়াল](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)-এর ধাপ 8 দেখুন।

### 8\. `node sendTx.js` ব্যবহার করে কোডটি রান করুন {#run-the-code-using-node-sendtx-js}

আপনার টার্মিনাল বা কমান্ড লাইনে ফিরে যান এবং রান করুন:

```
node sendTx.js
```

### 9\. মেমপুলে আপনার লেনদেন দেখুন {#see-your-transaction-in-the-mempool}

আপনার Alchemy ড্যাশবোর্ডে [Mempool পেজটি](https://dashboard.alchemyapi.io/mempool) খুলুন এবং আপনার লেনদেনটি খুঁজে পেতে আপনার তৈরি করা অ্যাপ দিয়ে ফিল্টার করুন। এখানেই আমরা আমাদের লেনদেনটিকে পেন্ডিং স্টেট থেকে মাইন্ড স্টেট-এ (যদি সফল হয়) বা ব্যর্থ হলে ড্রপড স্টেট-এ রূপান্তরিত হতে দেখতে পারি। নিশ্চিত করুন যে এটি "All"-এ রাখা আছে যাতে আপনি "mined", "pending" এবং "dropped" লেনদেনগুলো ক্যাপচার করতে পারেন। আপনি `0x31b98d14007bdee637298086988a0bbd31184523` এডড্রেস-এ পাঠানো লেনদেনগুলো খুঁজেও আপনার লেনদেনটি সার্চ করতে পারেন।

একবার আপনি আপনার লেনদেনটি খুঁজে পেলে এর বিস্তারিত দেখতে, tx হ্যাস নির্বাচন করুন, যা আপনাকে এমন একটি ভিউতে নিয়ে যাবে:

![Mempool watcher screenshot](./mempool.png)

সেখান থেকে আপনি লাল বৃত্তাকার আইকনে ক্লিক করে Etherscan-এ আপনার লেনদেনটি দেখতে পারেন!

**ইয়াপ্পি! আপনি এইমাত্র Alchemy ব্যবহার করে আপনার প্রথম ইথিরিয়াম লেনদেন পাঠিয়েছেন 🎉**

_এই গাইড সম্পর্কে মতামত এবং পরামর্শের জন্য, দয়া করে Alchemy-এর [Discord](https://discord.gg/A39JVCM)-এ এলানকে মেসেজ করুন!_

_মূলত [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)-এ প্রকাশিত_