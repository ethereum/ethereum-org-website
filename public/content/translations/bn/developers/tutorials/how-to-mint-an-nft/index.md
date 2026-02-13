---
title: "কীভাবে একটি NFT মিন্ট করবেন (NFT টিউটোরিয়াল সিরিজের পার্ট 2/3)"
description: "এই টিউটোরিয়ালে আমাদের স্মার্ট কন্ট্র্যাক্ট এবং Web3 ব্যবহার করে Ethereum ব্লকচেইনে কীভাবে একটি NFT মিন্ট করতে হয় তা বর্ণনা করা হয়েছে।"
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "alchemy",
    "সলিডিটি",
    "স্মার্ট কন্ট্র্যাক্ট"
  ]
skill: beginner
lang: bn
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 মিলিয়ন
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 মিলিয়ন
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 মিলিয়ন

তারা সবাই Alchemy-এর শক্তিশালী API ব্যবহার করে তাদের NFT মিন্ট করেছে। এই টিউটোরিয়ালে, আমরা আপনাকে \<10 মিনিটের মধ্যে একই কাজটি কীভাবে করতে হয় তা শেখাব।

“একটি NFT মিন্ট করা” হল ব্লকচেইনে আপনার ERC-721 টোকেনের একটি অনন্য ইনস্ট্যান্স প্রকাশ করার কাজ। [এই NFT টিউটোরিয়াল সিরিজের পার্ট 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) থেকে আমাদের স্মার্ট কন্ট্র্যাক্ট ব্যবহার করে, আসুন আমাদের Web3 দক্ষতা দিয়ে একটি NFT মিন্ট করি। এই টিউটোরিয়াল শেষে, আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন!

চলুন শুরু করা যাক!

## ধাপ 1: Web3 ইনস্টল করুন {#install-web3}

আপনি যদি আপনার NFT স্মার্ট কন্ট্র্যাক্ট তৈরির প্রথম টিউটোরিয়ালটি অনুসরণ করে থাকেন, তাহলে আপনার ইতিমধ্যেই Ethers.js ব্যবহারের অভিজ্ঞতা আছে। Web3 হল Ethers-এর মতোই, কারণ এটি একটি লাইব্রেরি যা Ethereum ব্লকচেইনে রিকোয়েস্ট তৈরি করা সহজ করতে ব্যবহৃত হয়। এই টিউটোরিয়ালে আমরা [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) ব্যবহার করব, যা একটি উন্নত Web3 লাইব্রেরি যা অটোম্যাটিক পুনরায় চেষ্টা এবং শক্তিশালী WebSocket সাপোর্ট প্রদান করে।

আপনার প্রজেক্টের হোম ডিরেক্টরিতে রান করুন:

```
npm install @alch/alchemy-web3
```

## ধাপ 2: একটি `mint-nft.js` ফাইল তৈরি করুন {#create-mintnftjs}

আপনার স্ক্রিপ্ট ডিরেক্টরির ভিতরে, একটি `mint-nft.js` ফাইল তৈরি করুন এবং কোডের নিম্নলিখিত লাইনগুলি যোগ করুন:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## ধাপ 3: আপনার কন্ট্র্যাক্টের ABI নিন {#contract-abi}

আমাদের কন্ট্র্যাক্টের ABI (অ্যাপ্লিকেশন বাইনারি ইন্টারফেস) হল আমাদের স্মার্ট কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করার ইন্টারফেস। আপনি [এখানে](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) কন্ট্র্যাক্ট ABI সম্পর্কে আরও জানতে পারেন। Hardhat স্বয়ংক্রিয়ভাবে আমাদের জন্য একটি ABI তৈরি করে এবং `MyNFT.json` ফাইলে সেভ করে। এটি ব্যবহার করার জন্য আমাদের `mint-nft.js` ফাইলে নিম্নলিখিত কোডের লাইনগুলি যোগ করে বিষয়বস্তু পার্স করতে হবে:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

আপনি যদি ABI দেখতে চান তবে আপনি এটি আপনার কনসোলে প্রিন্ট করতে পারেন:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` রান করতে এবং আপনার ABI কনসোলে প্রিন্ট করা দেখতে, আপনার টার্মিনালে নেভিগেট করুন এবং রান করুন:

```js
node scripts/mint-nft.js
```

## ধাপ 4: IPFS ব্যবহার করে আপনার NFT-এর জন্য মেটাডেটা কনফিগার করুন {#config-meta}

আপনার যদি পার্ট 1-এ আমাদের টিউটোরিয়াল থেকে মনে থাকে, আমাদের `mintNFT` স্মার্ট কন্ট্র্যাক্ট ফাংশন একটি tokenURI প্যারামিটার নেয় যা NFT-এর মেটাডেটা বর্ণনাকারী একটি JSON ডকুমেন্টে রিসলভ হওয়া উচিত — যা সত্যিই NFT-কে জীবন্ত করে তোলে, এটিকে কনফিগারযোগ্য বৈশিষ্ট্য, যেমন নাম, বর্ণনা, ছবি এবং অন্যান্য অ্যাট্রিবিউট পেতে দেয়।

> _ইন্টারপ্ল্যানেটারি ফাইল সিস্টেম (IPFS) হল একটি ডিস্ট্রিবিউটেড ফাইল সিস্টেমে ডেটা সংরক্ষণ এবং শেয়ার করার জন্য একটি ডিসেন্ট্রালাইজড প্রোটোকল এবং পিয়ার-টু-পিয়ার নেটওয়ার্ক।_

আমরা Pinata ব্যবহার করব, একটি সুবিধাজনক IPFS API এবং টুলকিট, আমাদের NFT অ্যাসেট এবং মেটাডেটা সংরক্ষণ করার জন্য যাতে আমাদের NFT সত্যিই ডিসেন্ট্রালাইজড হয়। আপনার যদি Pinata অ্যাকাউন্ট না থাকে, তাহলে [এখানে](https://app.pinata.cloud) একটি বিনামূল্যের অ্যাকাউন্টের জন্য সাইন আপ করুন এবং আপনার ইমেল যাচাই করার পদক্ষেপগুলি সম্পূর্ণ করুন।

আপনি একটি অ্যাকাউন্ট তৈরি করার পরে:

- “Files” পেজে নেভিগেট করুন এবং পেজের উপরের বাম দিকে নীল "Upload" বোতামে ক্লিক করুন।

- Pinata-তে একটি ছবি আপলোড করুন — এটি আপনার NFT-এর জন্য ছবির অ্যাসেট হবে। আপনার ইচ্ছামত অ্যাসেটের নাম দিন

- আপলোড করার পরে, আপনি "Files" পেজের টেবিলে ফাইলের তথ্য দেখতে পাবেন। আপনি একটি CID কলামও দেখতে পাবেন। আপনি এটির পাশের কপি বোতামে ক্লিক করে CID কপি করতে পারেন। আপনি আপনার আপলোড দেখতে পারেন এখানে: `https://gateway.pinata.cloud/ipfs/<CID>`। উদাহরণস্বরূপ, আমরা IPFS-এ যে ছবিটি ব্যবহার করেছি তা [এখানে](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) পেতে পারেন।

যারা দেখে শিখতে বেশি পছন্দ করে, তাদের জন্য উপরের পদক্ষেপগুলি এখানে সংক্ষিপ্ত করা হয়েছে:

![কীভাবে Pinata-তে আপনার ছবি আপলোড করবেন](./instructionsPinata.gif)

এখন, আমরা Pinata-তে আরও একটি ডকুমেন্ট আপলোড করতে চাই। কিন্তু তা করার আগে, আমাদের এটি তৈরি করতে হবে!

আপনার রুট ডিরেক্টরিতে, `nft-metadata.json` নামে একটি নতুন ফাইল তৈরি করুন এবং নিম্নলিখিত json কোড যোগ করুন:

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
  "description": "বিশ্বের সবচেয়ে আদুরে এবং সংবেদনশীল কুকুরছানা।",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json-এর ডেটা পরিবর্তন করতে দ্বিধা করবেন না। আপনি অ্যাট্রিবিউট বিভাগ থেকে সরাতে বা যোগ করতে পারেন। সবচেয়ে গুরুত্বপূর্ণ, নিশ্চিত করুন যে ইমেজ ফিল্ডটি আপনার IPFS ছবির লোকেশনে পয়েন্ট করে — অন্যথায়, আপনার NFT-তে একটি (খুব সুন্দর!) কুকুরের ছবি থাকবে।

JSON ফাইলটি এডিট করা হয়ে গেলে, এটি সেভ করুন এবং ছবিটি আপলোড করার জন্য আমরা যে পদক্ষেপগুলি অনুসরণ করেছিলাম সেগুলি অনুসরণ করে Pinata-তে আপলোড করুন।

![কীভাবে আপনার nft-metadata.json Pinata-তে আপলোড করবেন](./uploadPinata.gif)

## ধাপ 5: আপনার কন্ট্র্যাক্টের একটি ইনস্ট্যান্স তৈরি করুন {#instance-contract}

এখন, আমাদের কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য, আমাদের কোডে এটির একটি ইনস্ট্যান্স তৈরি করতে হবে। এটি করার জন্য আমাদের কন্ট্র্যাক্ট অ্যাড্রেসের প্রয়োজন হবে যা আমরা ডিপ্লয়মেন্ট থেকে অথবা [Blockscout](https://eth-sepolia.blockscout.com/) থেকে কন্ট্র্যাক্ট ডিপ্লয় করতে ব্যবহৃত অ্যাড্রেসটি খুঁজে পেতে পারি।

![Etherscan-এ আপনার কন্ট্র্যাক্ট অ্যাড্রেস দেখুন](./view-contract-etherscan.png)

উপরের উদাহরণে, আমাদের কন্ট্র্যাক্ট অ্যাড্রেস হল 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778।

এরপরে আমরা ABI এবং অ্যাড্রেস ব্যবহার করে আমাদের কন্ট্র্যাক্ট তৈরি করতে Web3 [কন্ট্র্যাক্ট মেথড](https://docs.web3js.org/api/web3-eth-contract/class/Contract) ব্যবহার করব। আপনার `mint-nft.js` ফাইলে, নিম্নলিখিতগুলি যোগ করুন:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## ধাপ 6: `.env` ফাইলটি আপডেট করুন {#update-env}

এখন, Ethereum চেইনে ট্রানজ্যাকশন তৈরি এবং পাঠানোর জন্য, আমরা অ্যাকাউন্ট নন্স (নিচে ব্যাখ্যা করা হবে) পেতে আপনার পাবলিক Ethereum অ্যাকাউন্ট অ্যাড্রেস ব্যবহার করব।

আপনার পাবলিক কী আপনার `.env` ফাইলে যোগ করুন — আপনি যদি টিউটোরিয়ালের পার্ট 1 সম্পন্ন করে থাকেন, তাহলে আমাদের `.env` ফাইলটি এখন এইরকম দেখতে হবে:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/আপনার-এপিআই-কী"
PRIVATE_KEY = "আপনার-প্রাইভেট-অ্যাকাউন্ট-অ্যাড্রেস"
PUBLIC_KEY = "আপনার-পাবলিক-অ্যাকাউন্ট-অ্যাড্রেস"
```

## ধাপ 7: আপনার ট্রানজ্যাকশন তৈরি করুন {#create-txn}

প্রথমে, আসুন `mintNFT(tokenData)` নামে একটি ফাংশন সংজ্ঞায়িত করি এবং নিম্নলিখিতগুলি করে আমাদের ট্রানজ্যাকশন তৈরি করি:

1. `.env` ফাইল থেকে আপনার _PRIVATE_KEY_ এবং _PUBLIC_KEY_ নিন।

2. এরপরে, আমাদের অ্যাকাউন্ট নন্স বের করতে হবে। নন্স স্পেসিফিকেশনটি আপনার অ্যাড্রেস থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যা ট্র্যাক করতে ব্যবহৃত হয় — যা আমাদের নিরাপত্তার উদ্দেশ্যে এবং [রিপ্লে অ্যাটাক](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) প্রতিরোধ করার জন্য প্রয়োজন। আপনার অ্যাড্রেস থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যা পেতে, আমরা [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) ব্যবহার করি।

3. অবশেষে আমরা নিম্নলিখিত তথ্য দিয়ে আমাদের ট্রানজ্যাকশন সেট আপ করব:

- `'from': PUBLIC_KEY` — আমাদের ট্রানজ্যাকশনের উৎস হল আমাদের পাবলিক অ্যাড্রেস

- `'to': contractAddress` — যে কন্ট্র্যাক্টের সাথে আমরা ইন্টারঅ্যাক্ট করতে এবং ট্রানজ্যাকশন পাঠাতে চাই

- `'nonce': nonce` — আমাদের অ্যাড্রেস থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যা সহ অ্যাকাউন্ট নন্স

- `'gas': estimatedGas` — ট্রানজ্যাকশনটি সম্পূর্ণ করার জন্য প্রয়োজনীয় আনুমানিক গ্যাস

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — এই ট্রানজ্যাকশনে আমরা যে গণনাটি করতে চাই — যা এই ক্ষেত্রে একটি NFT মিন্ট করা

আপনার `mint-nft.js` ফাইলটি এখন এইরকম দেখতে হবে:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //সর্বশেষ নন্স পান

   //ট্রানজ্যাকশন
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## ধাপ 8: ট্রানজ্যাকশন সাইন করুন {#sign-txn}

এখন যেহেতু আমরা আমাদের ট্রানজ্যাকশন তৈরি করেছি, আমাদের এটি পাঠানোর জন্য সাইন করতে হবে। এখানে আমরা আমাদের প্রাইভেট কী ব্যবহার করব।

`web3.eth.sendSignedTransaction` আমাদের ট্রানজ্যাকশন হ্যাস দেবে, যা আমরা আমাদের ট্রানজ্যাকশনটি মাইনিং হয়েছে এবং নেটওয়ার্ক দ্বারা ড্রপ করা হয়নি তা নিশ্চিত করতে ব্যবহার করতে পারি। আপনি লক্ষ্য করবেন ট্রানজ্যাকশন সাইনিং বিভাগে, আমরা কিছু এরর চেকিং যোগ করেছি যাতে আমরা জানতে পারি আমাদের ট্রানজ্যাকশনটি সফলভাবে হয়েছে কিনা।

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //সর্বশেষ নন্স পান

  //ট্রানজ্যাকশন
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
              "আপনার ট্রানজ্যাকশনের হ্যাস হল: ",
              hash,
              "\nআপনার ট্রানজ্যাকশনের স্ট্যাটাস দেখতে Alchemy-র মেমপুল দেখুন!"
            )
          } else {
            console.log(
              "আপনার ট্রানজ্যাকশন জমা দেওয়ার সময় কিছু ভুল হয়েছে:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise ব্যর্থ হয়েছে:", err)
    })
}
```

## ধাপ 9: `mintNFT` কল করুন এবং node `mint-nft.js` রান করুন {#call-mintnft-fn}

Pinata-তে আপলোড করা `metadata.json`-এর কথা মনে আছে? Pinata থেকে এর হ্যাসকোড নিন এবং `mintNFT` ফাংশনে নিম্নলিখিতটি প্যারামিটার হিসাবে পাস করুন `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

হ্যাসকোড কীভাবে পাবেন তা এখানে দেওয়া হল:

![Pinata-তে আপনার এনএফটি মেটাডেটা হ্যাসকোড কীভাবে পাবেন](./metadataPinata.gif)_Pinata-তে আপনার এনএফটি মেটাডেটা হ্যাসকোড কীভাবে পাবেন_

> আলাদা উইন্ডোতে `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` লোড করে ডাবল-চেক করুন যে আপনার কপি করা হ্যাসকোডটি আপনার **metadata.json**-এর সাথে লিঙ্ক করে। পেজটি নিচের স্ক্রিনশটের মতো দেখতে হবে:

![আপনার পেজে json মেটাডেটা প্রদর্শন করা উচিত](./metadataJSON.png)_আপনার পেজে json মেটাডেটা প্রদর্শন করা উচিত_

সব মিলিয়ে, আপনার কোডটি এইরকম দেখতে হবে:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //সর্বশেষ নন্স পান

  //ট্রানজ্যাকশন
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
              "আপনার ট্রানজ্যাকশনের হ্যাস হল: ",
              hash,
              "\nআপনার ট্রানজ্যাকশনের স্ট্যাটাস দেখতে Alchemy-র মেমপুল দেখুন!"
            )
          } else {
            console.log(
              "আপনার ট্রানজ্যাকশন জমা দেওয়ার সময় কিছু ভুল হয়েছে:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise ব্যর্থ হয়েছে:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

এখন, আপনার NFT ডিপ্লয় করতে `node scripts/mint-nft.js` রান করুন। কয়েক সেকেন্ড পরে, আপনার টার্মিনালে এইরকম একটি প্রতিক্রিয়া দেখতে পাওয়া উচিত:

    ```
    আপনার ট্রানজ্যাকশনের হ্যাস হল: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    আপনার ট্রানজ্যাকশনের স্থিতি দেখতে Alchemy-র মেমপুল দেখুন!
    ```

এরপরে, আপনার ট্রানজ্যাকশনের স্থিতি দেখতে (এটি পেন্ডিং, মাইনিং করা বা নেটওয়ার্ক দ্বারা ড্রপ করা হয়েছে কিনা) আপনার [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) ভিজিট করুন। যদি আপনার ট্রানজ্যাকশনটি ড্রপ হয়ে যায়, তবে [Blockscout](https://eth-sepolia.blockscout.com/) চেক করা এবং আপনার ট্রানজ্যাকশন হ্যাস অনুসন্ধান করাও সহায়ক।

![Etherscan-এ আপনার NFT ট্রানজ্যাকশন হ্যাস দেখুন](./view-nft-etherscan.png)_Etherscan-এ আপনার NFT ট্রানজ্যাকশন হ্যাস দেখুন_

এবং এটাই সব! আপনি এখন Ethereum ব্লকচেইনে একটি NFT ডিপ্লয় এবং মিন্ট করেছেন <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` ব্যবহার করে আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন! শুধু NFT-এর মেটাডেটা বর্ণনাকারী একটি নতুন tokenURI পাস করতে ভুলবেন না (অন্যথায়, আপনি কেবল বিভিন্ন ID সহ একগুচ্ছ অভিন্ন NFT তৈরি করবেন)।

সম্ভবত, আপনি আপনার ওয়ালেটে আপনার NFT দেখাতে সক্ষম হতে চাইবেন — তাই [পার্ট 3: আপনার ওয়ালেটে আপনার NFT কীভাবে দেখবেন](/developers/tutorials/how-to-view-nft-in-metamask/) দেখতে ভুলবেন না!
