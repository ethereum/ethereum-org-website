---
title: "কীভাবে একটি NFT মিন্ট করবেন (NFT টিউটোরিয়াল সিরিজের ২/৩ অংশ)"
description: "এই টিউটোরিয়ালে বর্ণনা করা হয়েছে কীভাবে আমাদের স্মার্ট কন্ট্রাক্ট এবং Web3 ব্যবহার করে ইথিরিয়াম ব্লকচেইনে একটি NFT মিন্ট করতে হয়।"
author: "সুমি মুদগিল"
tags: ["ERC-721", "Alchemy", "Solidity", "স্মার্ট কন্ট্রাক্ট"]
skill: beginner
breadcrumb: "একটি NFT মিন্ট করুন"
lang: bn
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 মিলিয়ন
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 মিলিয়ন
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 মিলিয়ন

তারা সবাই Alchemy-এর শক্তিশালী API ব্যবহার করে তাদের NFT মিন্ট করেছেন। এই টিউটোরিয়ালে, আমরা আপনাকে শেখাব কীভাবে ১০ মিনিটেরও কম সময়ে একই কাজ করতে হয়।

"NFT মিন্ট করা" হলো ব্লকচেইনে আপনার ERC-721 টোকেনের একটি অনন্য ইনস্ট্যান্স প্রকাশ করার প্রক্রিয়া। [এই NFT টিউটোরিয়াল সিরিজের ১ম অংশ](/developers/tutorials/how-to-write-and-deploy-an-nft/)-এর আমাদের স্মার্ট কন্ট্রাক্ট ব্যবহার করে, চলুন আমাদের Web3 দক্ষতা কাজে লাগাই এবং একটি NFT মিন্ট করি। এই টিউটোরিয়ালের শেষে, আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন!

চলুন শুরু করা যাক!

## ধাপ 1: Web3 ইনস্টল করুন {#install-web3}

আপনি যদি আপনার NFT স্মার্ট কন্ট্রাক্ট তৈরি করার প্রথম টিউটোরিয়ালটি অনুসরণ করে থাকেন, তবে Ethers.js ব্যবহার করার অভিজ্ঞতা আপনার ইতিমধ্যেই আছে। Web3 অনেকটা Ethers-এর মতোই, কারণ এটি এমন একটি লাইব্রেরি যা [Ethereum](/) ব্লকচেইনে রিকোয়েস্ট তৈরি করা সহজ করতে ব্যবহৃত হয়। এই টিউটোরিয়ালে আমরা [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) ব্যবহার করব, যা একটি উন্নত Web3 লাইব্রেরি এবং এটি স্বয়ংক্রিয় রিট্রাই ও শক্তিশালী WebSocket সাপোর্ট প্রদান করে।

আপনার প্রজেক্টের হোম ডিরেক্টরিতে রান করুন:

```
npm install @alch/alchemy-web3
```

## ধাপ 2: একটি `mint-nft.js` ফাইল তৈরি করুন {#create-mintnftjs}

আপনার scripts ডিরেক্টরির ভেতরে, একটি `mint-nft.js` ফাইল তৈরি করুন এবং নিচের কোডগুলো যোগ করুন:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## ধাপ 3: আপনার কন্ট্রাক্ট ABI সংগ্রহ করুন {#contract-abi}

আমাদের কন্ট্রাক্ট ABI (Application Binary Interface) হলো আমাদের স্মার্ট কন্ট্রাক্ট-এর সাথে ইন্টারঅ্যাক্ট করার ইন্টারফেস। আপনি কন্ট্রাক্ট ABI সম্পর্কে আরও জানতে পারেন [এখানে](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)। Hardhat স্বয়ংক্রিয়ভাবে আমাদের জন্য একটি ABI তৈরি করে এবং এটি `MyNFT.json` ফাইলে সেভ করে। এটি ব্যবহার করার জন্য আমাদের `mint-nft.js` ফাইলে নিচের কোডগুলো যোগ করে এর কন্টেন্ট পার্স করতে হবে:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

আপনি যদি ABI দেখতে চান তবে এটি আপনার কনসোলে প্রিন্ট করতে পারেন:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` রান করতে এবং কনসোলে আপনার ABI প্রিন্ট হওয়া দেখতে আপনার টার্মিনালে যান এবং রান করুন:

```js
node scripts/mint-nft.js
```

## ধাপ 4: IPFS ব্যবহার করে আপনার NFT-এর মেটাডাটা কনফিগার করুন {#config-meta}

১ম অংশের টিউটোরিয়াল থেকে যদি আপনার মনে থাকে, আমাদের `mintNFT` স্মার্ট কন্ট্রাক্ট ফাংশনটি একটি tokenURI প্যারামিটার নেয় যা একটি JSON ডকুমেন্টে রিজলভ হওয়া উচিত, যেখানে NFT-এর মেটাডাটা বর্ণনা করা থাকে— যা মূলত NFT-কে জীবন্ত করে তোলে এবং এর কনফিগারযোগ্য প্রপার্টি যেমন নাম, বর্ণনা, ছবি এবং অন্যান্য অ্যাট্রিবিউট থাকতে দেয়।

> _Interplanetary File System (IPFS) হলো একটি ডিসেন্ট্রালাইজড প্রটোকল এবং পিয়ার-টু-পিয়ার নেটওয়ার্ক যা একটি ডিস্ট্রিবিউটেড ফাইল সিস্টেমে ডাটা স্টোর এবং শেয়ার করার জন্য ব্যবহৃত হয়।_

আমাদের NFT অ্যাসেট এবং মেটাডাটা স্টোর করতে আমরা Pinata ব্যবহার করব, যা একটি সুবিধাজনক IPFS API এবং টুলকিট, যাতে আমাদের NFT সত্যিই ডিসেন্ট্রালাইজড হয় তা নিশ্চিত করা যায়। আপনার যদি Pinata একাউন্ট না থাকে, তবে [এখানে](https://app.pinata.cloud) একটি ফ্রি একাউন্টের জন্য সাইন আপ করুন এবং আপনার ইমেইল ভেরিফাই করার ধাপগুলো সম্পন্ন করুন।

একাউন্ট তৈরি করার পর:

- "Files" পেজে যান এবং পেজের উপরের বাম দিকে থাকা নীল "Upload" বাটনে ক্লিক করুন।

- Pinata-তে একটি ছবি আপলোড করুন — এটি হবে আপনার NFT-এর ইমেজ অ্যাসেট। আপনি চাইলে অ্যাসেটটির যেকোনো নাম দিতে পারেন।

- আপলোড করার পর, আপনি "Files" পেজের টেবিলে ফাইলের তথ্য দেখতে পাবেন। আপনি একটি CID কলামও দেখতে পাবেন। এর পাশের কপি বাটনে ক্লিক করে আপনি CID কপি করতে পারেন। আপনি আপনার আপলোড করা ফাইলটি দেখতে পারেন এখানে: `https://gateway.pinata.cloud/ipfs/<CID>`। উদাহরণস্বরূপ, আমরা IPFS-এ যে ছবিটি ব্যবহার করেছি তা আপনি [এখানে](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) দেখতে পারেন।

যারা ভিজ্যুয়ালি শিখতে বেশি পছন্দ করেন, তাদের জন্য উপরের ধাপগুলো এখানে সংক্ষেপে দেওয়া হলো:

![কীভাবে Pinata-তে আপনার ছবি আপলোড করবেন](./instructionsPinata.gif)

এখন, আমরা Pinata-তে আরও একটি ডকুমেন্ট আপলোড করতে চাই। কিন্তু তা করার আগে, আমাদের এটি তৈরি করতে হবে!

আপনার রুট ডিরেক্টরিতে, `nft-metadata.json` নামে একটি নতুন ফাইল তৈরি করুন এবং নিচের json কোডটি যোগ করুন:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json-এর ডাটা পরিবর্তন করতে দ্বিধা করবেন না। আপনি attributes সেকশন থেকে কিছু বাদ দিতে বা যোগ করতে পারেন। সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, নিশ্চিত করুন যে image ফিল্ডটি আপনার IPFS ইমেজের লোকেশন নির্দেশ করছে — অন্যথায়, আপনার NFT-তে একটি (খুবই কিউট!) কুকুরের ছবি থাকবে।

JSON ফাইলটি এডিট করা শেষ হলে, এটি সেভ করুন এবং ছবি আপলোড করার জন্য আমরা যে ধাপগুলো অনুসরণ করেছিলাম, সেই একই ধাপ অনুসরণ করে এটি Pinata-তে আপলোড করুন।

![কীভাবে Pinata-তে আপনার nft-metadata.json আপলোড করবেন](./uploadPinata.gif)

## ধাপ 5: আপনার কন্ট্রাক্টের একটি ইনস্ট্যান্স তৈরি করুন {#instance-contract}

এখন, আমাদের কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য, আমাদের কোডে এর একটি ইনস্ট্যান্স তৈরি করতে হবে। এটি করার জন্য আমাদের কন্ট্রাক্ট এডড্রেস প্রয়োজন হবে যা আমরা ডিপ্লয়মেন্ট থেকে বা কন্ট্রাক্ট ডিপ্লয় করতে আপনি যে এডড্রেস ব্যবহার করেছিলেন তা [Blockscout](https://eth-sepolia.blockscout.com/)-এ খুঁজে বের করে পেতে পারি।

![Etherscan-এ আপনার কন্ট্রাক্ট এডড্রেস দেখুন](./view-contract-etherscan.png)

উপরের উদাহরণে, আমাদের কন্ট্রাক্ট এডড্রেস হলো 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778।

এরপর আমরা ABI এবং এডড্রেস ব্যবহার করে আমাদের কন্ট্রাক্ট তৈরি করতে Web3 [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ব্যবহার করব। আপনার `mint-nft.js` ফাইলে, নিচের কোডটি যোগ করুন:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## ধাপ 6: `.env` ফাইল আপডেট করুন {#update-env}

এখন, ইথিরিয়াম চেইনে লেনদেন তৈরি এবং পাঠানোর জন্য, আমরা একাউন্ট নন্স (নিচে ব্যাখ্যা করা হবে) পেতে আপনার পাবলিক ইথিরিয়াম একাউন্ট এডড্রেস ব্যবহার করব।

আপনার `.env` ফাইলে আপনার পাবলিক কি যোগ করুন — আপনি যদি টিউটোরিয়ালের ১ম অংশ সম্পন্ন করে থাকেন, তবে আমাদের `.env` ফাইলটি এখন এরকম দেখাবে:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## ধাপ 7: আপনার লেনদেন তৈরি করুন {#create-txn}

প্রথমে, চলুন `mintNFT(tokenData)` নামের একটি ফাংশন ডিফাইন করি এবং নিচের কাজগুলো করে আমাদের লেনদেন তৈরি করি:

1. `.env` ফাইল থেকে আপনার _PRIVATE_KEY_ এবং _PUBLIC_KEY_ সংগ্রহ করুন।

1. এরপর, আমাদের একাউন্ট নন্স বের করতে হবে। নন্স স্পেসিফিকেশনটি আপনার এডড্রেস থেকে পাঠানো লেনদেন-এর সংখ্যা ট্র্যাক করতে ব্যবহৃত হয় — যা আমাদের নিরাপত্তার উদ্দেশ্যে এবং [রিপ্লে অ্যাটাক](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) প্রতিরোধ করতে প্রয়োজন। আপনার এডড্রেস থেকে পাঠানো লেনদেন-এর সংখ্যা পেতে, আমরা [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) ব্যবহার করি।

1. সবশেষে আমরা নিচের তথ্যগুলো দিয়ে আমাদের লেনদেন সেট আপ করব:

- `'from': PUBLIC_KEY` — আমাদের লেনদেন-এর উৎস হলো আমাদের পাবলিক এডড্রেস

- `'to': contractAddress` — যে কন্ট্রাক্টের সাথে আমরা ইন্টারঅ্যাক্ট করতে এবং লেনদেন পাঠাতে চাই

- `'nonce': nonce` — আমাদের এডড্রেস থেকে পাঠানো লেনদেন-এর সংখ্যাসহ একাউন্ট নন্স

- `'gas': estimatedGas` — লেনদেন সম্পন্ন করতে প্রয়োজনীয় আনুমানিক গ্যাস

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — এই লেনদেন-এ আমরা যে কম্পিউটেশনটি করতে চাই — যা এই ক্ষেত্রে একটি NFT মিন্ট করা

আপনার `mint-nft.js` ফাইলটি এখন এরকম দেখাবে:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // সর্বশেষ নন্স পান

   // লেনদেনটি
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## ধাপ 8: লেনদেন সাইন করুন {#sign-txn}

যেহেতু আমরা আমাদের লেনদেন তৈরি করেছি, এটি পাঠানোর জন্য আমাদের এটি সাইন করতে হবে। এখানেই আমরা আমাদের প্রাইভেট কি ব্যবহার করব।

`web3.eth.sendSignedTransaction` আমাদের লেনদেন হ্যাস দেবে, যা ব্যবহার করে আমরা নিশ্চিত হতে পারি যে আমাদের লেনদেন মাইন করা হয়েছে এবং নেটওয়ার্ক দ্বারা ড্রপ হয়নি। আপনি লক্ষ্য করবেন যে লেনদেন সাইনিং সেকশনে, আমরা কিছু এরর চেকিং যোগ করেছি যাতে আমরা জানতে পারি আমাদের লেনদেন সফলভাবে সম্পন্ন হয়েছে কিনা।

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // সর্বশেষ নন্স পান

  // লেনদেনটি
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## ধাপ 9: `mintNFT` কল করুন এবং node `mint-nft.js` রান করুন {#call-mintnft-fn}

Pinata-তে আপলোড করা `metadata.json`-এর কথা মনে আছে? Pinata থেকে এর হ্যাশকোড সংগ্রহ করুন এবং `mintNFT` ফাংশনে প্যারামিটার হিসেবে নিচেরটি পাস করুন `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

হ্যাশকোড কীভাবে পাবেন তা নিচে দেওয়া হলো:

![কীভাবে Pinata-তে আপনার nft মেটাডাটা হ্যাশকোড পাবেন](./metadataPinata.gif)_কীভাবে Pinata-তে আপনার nft মেটাডাটা হ্যাশকোড পাবেন_

> একটি আলাদা উইন্ডোতে `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` লোড করে ডাবল চেক করুন যে আপনার কপি করা হ্যাশকোডটি আপনার **metadata.json**-এর সাথে লিংক করা আছে কিনা। পেজটি নিচের স্ক্রিনশটের মতো দেখতে হওয়া উচিত:

![আপনার পেজে json মেটাডাটা প্রদর্শিত হওয়া উচিত](./metadataJSON.png)_আপনার পেজে json মেটাডাটা প্রদর্শিত হওয়া উচিত_

সব মিলিয়ে, আপনার কোডটি দেখতে অনেকটা এরকম হওয়া উচিত:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // সর্বশেষ নন্স পান

  // লেনদেনটি
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

এখন, আপনার NFT ডিপ্লয় করতে `node scripts/mint-nft.js` রান করুন। কয়েক সেকেন্ড পর, আপনি আপনার টার্মিনালে এরকম একটি রেসপন্স দেখতে পাবেন:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

এরপর, আপনার লেনদেন-এর স্ট্যাটাস (এটি পেন্ডিং, মাইন করা হয়েছে, নাকি নেটওয়ার্ক দ্বারা ড্রপ হয়েছে) দেখতে আপনার [Alchemy mempool](https://dashboard.alchemyapi.io/mempool)-এ ভিজিট করুন। যদি আপনার লেনদেন ড্রপ হয়ে যায়, তবে [Blockscout](https://eth-sepolia.blockscout.com/) চেক করা এবং আপনার লেনদেন হ্যাস সার্চ করাও সহায়ক হতে পারে।

![Etherscan-এ আপনার NFT লেনদেন হ্যাস দেখুন](./view-nft-etherscan.png)_Etherscan-এ আপনার NFT লেনদেন হ্যাস দেখুন_

আর এভাবেই হয়ে গেল! আপনি এখন ইথিরিয়াম ব্লকচেইনে একটি NFT ডিপ্লয় এবং মিন্ট করেছেন <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` ব্যবহার করে আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন! শুধু নিশ্চিত করুন যে আপনি NFT-এর মেটাডাটা বর্ণনা করে এমন একটি নতুন tokenURI পাস করছেন (অন্যথায়, আপনি শুধু ভিন্ন ভিন্ন ID-সহ একগুচ্ছ অভিন্ন NFT তৈরি করবেন)।

সম্ভবত, আপনি আপনার ওয়ালেট-এ আপনার NFT প্রদর্শন করতে চাইবেন — তাই [৩য় অংশ: কীভাবে আপনার ওয়ালেট-এ আপনার NFT দেখবেন](/developers/tutorials/how-to-view-nft-in-metamask/) চেক করতে ভুলবেন না!