---
title: "কীভাবে একটি NFT মিন্ট করবেন (NFT টিউটোরিয়াল সিরিজের 2/3 অংশ)"
description: "এই টিউটোরিয়ালে আমাদের স্মার্ট কন্ট্রাক্ট এবং Web3 ব্যবহার করে ইথেরিয়াম ব্লকচেইনে একটি NFT মিন্ট করার পদ্ধতি বর্ণনা করা হয়েছে।"
author: "সুমি মুদগিল"
tags:
  - ERC-721
  - alchemy
  - solidity
  - স্মার্ট কন্ট্রাক্ট
skill: beginner
breadcrumb: "একটি NFT মিন্ট করুন"
lang: bn
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 মিলিয়ন
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 মিলিয়ন
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 মিলিয়ন

তারা সবাই Alchemy-এর শক্তিশালী API ব্যবহার করে তাদের NFT মিন্ট করেছেন। এই টিউটোরিয়ালে, আমরা আপনাকে শেখাব কীভাবে 10 মিনিটেরও কম সময়ে একই কাজ করা যায়।

“একটি NFT মিন্ট করা” হলো ব্লকচেইনে আপনার ERC-721 টোকেনের একটি অনন্য ইনস্ট্যান্স প্রকাশ করার কাজ। [এই NFT টিউটোরিয়াল সিরিজের 1ম অংশ](/developers/tutorials/how-to-write-and-deploy-an-nft/) থেকে আমাদের স্মার্ট কন্ট্রাক্ট ব্যবহার করে, চলুন আমাদের Web3 দক্ষতা কাজে লাগাই এবং একটি NFT মিন্ট করি। এই টিউটোরিয়ালের শেষে, আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন!

চলুন শুরু করা যাক!

## ধাপ 1: Web3 ইনস্টল করুন {#install-web3}

আপনি যদি আপনার NFT স্মার্ট কন্ট্রাক্ট তৈরি করার প্রথম টিউটোরিয়ালটি অনুসরণ করে থাকেন, তবে আপনার ইতিমধ্যেই Ethers.js ব্যবহারের অভিজ্ঞতা রয়েছে। Web3 অনেকটা Ethers-এর মতোই, কারণ এটি এমন একটি লাইব্রেরি যা [ইথেরিয়াম](/) ব্লকচেইনে রিকোয়েস্ট তৈরি করা সহজ করতে ব্যবহৃত হয়। এই টিউটোরিয়ালে আমরা [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ব্যবহার করব, যা একটি উন্নত Web3 লাইব্রেরি এবং এটি স্বয়ংক্রিয় রিট্রাই ও শক্তিশালী WebSocket সাপোর্ট প্রদান করে।

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

## ধাপ 3: আপনার কন্ট্রাক্ট ABI সংগ্রহ করুন

আমাদের কন্ট্রাক্ট ABI (Application Binary Interface) হলো আমাদের স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার ইন্টারফেস। আপনি [কন্ট্রাক্ট ABI](/glossary/#abi) সম্পর্কে আরও জানতে পারেন। Hardhat স্বয়ংক্রিয়ভাবে আমাদের জন্য একটি ABI জেনারেট করে এবং এটি `MyNFT.json` ফাইলে সেভ করে। এটি ব্যবহার করার জন্য আমাদের `mint-nft.js` ফাইলে নিচের কোডগুলো যোগ করে এর কন্টেন্ট পার্স করতে হবে:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

আপনি যদি ABI দেখতে চান, তবে এটি আপনার কনসোলে প্রিন্ট করতে পারেন:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` রান করতে এবং আপনার কনসোলে প্রিন্ট করা ABI দেখতে আপনার টার্মিনালে যান এবং রান করুন:

```js
node scripts/mint-nft.js
```
## ধাপ 4: IPFS ব্যবহার করে আপনার NFT-এর মেটাডেটা কনফিগার করুন {#config-meta}

আপনার যদি 1ম অংশের টিউটোরিয়াল থেকে মনে থাকে, আমাদের `mintNFT` স্মার্ট কন্ট্রাক্ট ফাংশনটি একটি tokenURI প্যারামিটার গ্রহণ করে যা একটি JSON ডকুমেন্টে রিজলভ হওয়া উচিত, যেখানে NFT-এর মেটাডেটা বর্ণনা করা থাকে— যা মূলত NFT-কে জীবন্ত করে তোলে এবং এর কনফিগারযোগ্য বৈশিষ্ট্য যেমন নাম, বিবরণ, ছবি এবং অন্যান্য অ্যাট্রিবিউট থাকতে দেয়।

> _Interplanetary File System (IPFS) হলো একটি ডিস্ট্রিবিউটেড ফাইল সিস্টেমে ডেটা স্টোর এবং শেয়ার করার জন্য একটি বিকেন্দ্রীকৃত প্রোটোকল এবং পিয়ার-টু-পিয়ার নেটওয়ার্ক।_

আমাদের NFT সত্যিই বিকেন্দ্রীকৃত তা নিশ্চিত করতে আমরা আমাদের NFT অ্যাসেট এবং মেটাডেটা স্টোর করার জন্য Pinata ব্যবহার করব, যা একটি সুবিধাজনক IPFS API এবং টুলকিট। আপনার যদি Pinata অ্যাকাউন্ট না থাকে, তবে [এখানে](https://app.pinata.cloud) একটি ফ্রি অ্যাকাউন্টের জন্য সাইন আপ করুন এবং আপনার ইমেইল ভেরিফাই করার ধাপগুলো সম্পন্ন করুন।

অ্যাকাউন্ট তৈরি করার পর:

- "Files" পেজে যান এবং পেজের উপরের বাম দিকে থাকা নীল "Upload" বাটনে ক্লিক করুন।

- Pinata-তে একটি ছবি আপলোড করুন — এটি হবে আপনার NFT-এর ইমেজ অ্যাসেট। আপনি চাইলে অ্যাসেটটির যেকোনো নাম দিতে পারেন।

- আপলোড করার পর, আপনি "Files" পেজের টেবিলে ফাইলের তথ্য দেখতে পাবেন। আপনি একটি CID কলামও দেখতে পাবেন। এর পাশের কপি বাটনে ক্লিক করে আপনি CID কপি করতে পারেন। আপনি আপনার আপলোড করা ফাইলটি এখানে দেখতে পারেন: `https://gateway.pinata.cloud/ipfs/<CID>`। উদাহরণস্বরূপ, আমরা IPFS-এ যে ছবিটি ব্যবহার করেছি তা আপনি [এখানে](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) দেখতে পারেন।

যারা ভিজ্যুয়ালি শিখতে বেশি পছন্দ করেন, তাদের জন্য উপরের ধাপগুলো এখানে সংক্ষেপে দেওয়া হলো:

![How to upload your image to Pinata](./instructionsPinata.gif)

এখন, আমরা Pinata-তে আরও একটি ডকুমেন্ট আপলোড করতে চাইব। কিন্তু তা করার আগে, আমাদের এটি তৈরি করতে হবে!

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

json-এর ডেটা পরিবর্তন করতে দ্বিধা করবেন না। আপনি attributes সেকশন থেকে কিছু বাদ দিতে বা যোগ করতে পারেন। সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, নিশ্চিত করুন যে image ফিল্ডটি আপনার IPFS ইমেজের লোকেশন নির্দেশ করছে — অন্যথায়, আপনার NFT-তে একটি (খুবই কিউট!) কুকুরের ছবি অন্তর্ভুক্ত হবে।

JSON ফাইলটি এডিট করা শেষ হলে, এটি সেভ করুন এবং ছবি আপলোড করার জন্য আমরা যে ধাপগুলো অনুসরণ করেছিলাম ঠিক সেই একই ধাপগুলো অনুসরণ করে এটি Pinata-তে আপলোড করুন।

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## ধাপ 5: আপনার কন্ট্রাক্টের একটি ইনস্ট্যান্স তৈরি করুন {#instance-contract}

এখন, আমাদের কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য, আমাদের কোডে এর একটি ইনস্ট্যান্স তৈরি করতে হবে। এটি করার জন্য আমাদের কন্ট্রাক্ট ঠিকানা প্রয়োজন হবে যা আমরা ডিপ্লয়মেন্ট থেকে বা কন্ট্রাক্টটি ডিপ্লয় করার জন্য আপনি যে ঠিকানাটি ব্যবহার করেছিলেন তা [Blockscout](https://eth-sepolia.blockscout.com/)-এ খুঁজে বের করে পেতে পারি।

![View your contract address on Etherscan](./view-contract-etherscan.png)

উপরের উদাহরণে, আমাদের কন্ট্রাক্ট ঠিকানা হলো 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778।

এরপর আমরা ABI এবং ঠিকানা ব্যবহার করে আমাদের কন্ট্রাক্ট তৈরি করতে Web3 [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ব্যবহার করব। আপনার `mint-nft.js` ফাইলে, নিচের কোডটি যোগ করুন:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## ধাপ 6: `.env` ফাইলটি আপডেট করুন {#update-env}

এখন, ইথেরিয়াম চেইনে ট্রানজ্যাকশন তৈরি এবং পাঠানোর জন্য, আমরা অ্যাকাউন্ট নন্স (নিচে ব্যাখ্যা করা হবে) পেতে আপনার পাবলিক ইথেরিয়াম অ্যাকাউন্ট ঠিকানা ব্যবহার করব।

আপনার `.env` ফাইলে আপনার পাবলিক কী যোগ করুন — আপনি যদি টিউটোরিয়ালের 1ম অংশ সম্পন্ন করে থাকেন, তবে আমাদের `.env` ফাইলটি এখন এরকম দেখাবে:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## ধাপ 7: আপনার ট্রানজ্যাকশন তৈরি করুন

প্রথমে, চলুন `mintNFT(tokenData)` নামের একটি ফাংশন ডিফাইন করি এবং নিচের কাজগুলো করে আমাদের ট্রানজ্যাকশন তৈরি করি:

1. `.env` ফাইল থেকে আপনার _PRIVATE_KEY_ এবং _PUBLIC_KEY_ সংগ্রহ করুন।

1. এরপর, আমাদের অ্যাকাউন্ট নন্স বের করতে হবে। আপনার ঠিকানা থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যা ট্র্যাক করতে নন্স স্পেসিফিকেশন ব্যবহার করা হয় — যা আমাদের নিরাপত্তার উদ্দেশ্যে এবং রিপ্লে অ্যাটাক প্রতিরোধ করতে প্রয়োজন। আপনার ঠিকানা থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যা পেতে, আমরা [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) ব্যবহার করি।

1. সবশেষে আমরা নিচের তথ্যগুলো দিয়ে আমাদের ট্রানজ্যাকশন সেট আপ করব:

- `'from': PUBLIC_KEY` — আমাদের ট্রানজ্যাকশনের অরিজিন হলো আমাদের পাবলিক ঠিকানা

- `'to': contractAddress` — যে কন্ট্রাক্টের সাথে আমরা ইন্টারঅ্যাক্ট করতে এবং ট্রানজ্যাকশন পাঠাতে চাই

- `'nonce': nonce` — আমাদের ঠিকানা থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যাসহ অ্যাকাউন্ট নন্স

- `'gas': estimatedGas` — ট্রানজ্যাকশন সম্পন্ন করতে প্রয়োজনীয় আনুমানিক গ্যাস

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — এই ট্রানজ্যাকশনে আমরা যে কম্পিউটেশনটি করতে চাই — যা এই ক্ষেত্রে একটি NFT মিন্ট করা

আপনার `mint-nft.js` ফাইলটি এখন এরকম দেখতে হওয়া উচিত:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //সর্বশেষ নন্স নিন

   //ট্রানজ্যাকশনটি
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```
## ধাপ 8: ট্রানজ্যাকশনে স্বাক্ষর করুন {#sign-txn}

যেহেতু আমরা আমাদের ট্রানজ্যাকশন তৈরি করেছি, এটি পাঠানোর জন্য আমাদের এতে স্বাক্ষর করতে হবে। এখানেই আমরা আমাদের প্রাইভেট কী ব্যবহার করব।

`web3.eth.sendSignedTransaction` আমাদের ট্রানজ্যাকশন হ্যাশ দেবে, যা ব্যবহার করে আমরা নিশ্চিত হতে পারি যে আমাদের ট্রানজ্যাকশনটি মাইন করা হয়েছে এবং নেটওয়ার্ক দ্বারা ড্রপ হয়নি। আপনি লক্ষ্য করবেন যে ট্রানজ্যাকশন স্বাক্ষরকরণ সেকশনে, আমরা কিছু এরর চেকিং যোগ করেছি যাতে আমরা জানতে পারি আমাদের ট্রানজ্যাকশন সফলভাবে সম্পন্ন হয়েছে কিনা।

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //সর্বশেষ নন্স নিন

  //ট্রানজ্যাকশনটি
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

আপনার কি মনে আছে যে `metadata.json` আপনি Pinata-তে আপলোড করেছিলেন? Pinata থেকে এর হ্যাশকোড সংগ্রহ করুন এবং নিচের অংশটিকে `mintNFT` ফাংশনে প্যারামিটার হিসেবে পাস করুন `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

কীভাবে হ্যাশকোড পাবেন তা নিচে দেওয়া হলো:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Pinata-তে কীভাবে আপনার nft মেটাডেটা হ্যাশকোড পাবেন_

> একটি আলাদা উইন্ডোতে `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` লোড করে ডাবল চেক করুন যে আপনার কপি করা হ্যাশকোডটি আপনার **metadata.json**-এর সাথে লিঙ্ক করা আছে কিনা। পেজটি নিচের স্ক্রিনশটের মতো দেখতে হওয়া উচিত:

![Your page should display the json metadata](./metadataJSON.png)_আপনার পেজে json মেটাডেটা প্রদর্শিত হওয়া উচিত_

সব মিলিয়ে, আপনার কোডটি দেখতে অনেকটা এরকম হওয়া উচিত:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //সর্বশেষ নন্স নিন

  //ট্রানজ্যাকশনটি
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

এখন, আপনার NFT ডিপ্লয় করতে `node scripts/mint-nft.js` রান করুন। কয়েক সেকেন্ড পর, আপনি আপনার টার্মিনালে এরকম একটি রেসপন্স দেখতে পাবেন:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

এরপর, আপনার ট্রানজ্যাকশনের স্ট্যাটাস (এটি পেন্ডিং আছে, মাইন করা হয়েছে, নাকি নেটওয়ার্ক দ্বারা ড্রপ হয়েছে) দেখতে আপনার [Alchemy মেমপুল](https://dashboard.alchemy.com/mempool) ভিজিট করুন। যদি আপনার ট্রানজ্যাকশন ড্রপ হয়ে যায়, তবে [Blockscout](https://eth-sepolia.blockscout.com/) চেক করা এবং আপনার ট্রানজ্যাকশন হ্যাশ সার্চ করাও সহায়ক হতে পারে।

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscan-এ আপনার NFT ট্রানজ্যাকশন হ্যাশ দেখুন_

আর এভাবেই হয়ে গেল! আপনি এখন ইথেরিয়াম ব্লকচেইনে একটি NFT ডিপ্লয় এবং মিন্ট করেছেন <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` ব্যবহার করে আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন! শুধু নিশ্চিত করুন যে আপনি NFT-এর মেটাডেটা বর্ণনা করে এমন একটি নতুন tokenURI পাস করছেন (অন্যথায়, আপনি শুধু ভিন্ন ভিন্ন ID-সহ একগুচ্ছ একই রকম NFT তৈরি করবেন)।

সম্ভবত, আপনি আপনার ওয়ালেটে আপনার NFT প্রদর্শন করতে চাইবেন — তাই অবশ্যই [৩য় অংশ: কীভাবে আপনার ওয়ালেটে আপনার NFT দেখবেন](/developers/tutorials/how-to-view-nft-in-metamask/) চেক করে দেখুন!
