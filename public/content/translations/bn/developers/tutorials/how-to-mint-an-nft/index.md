---
title: "কীভাবে একটি NFT মিন্ট করবেন (NFT টিউটোরিয়াল সিরিজের 2/3 অংশ)"
description: "এই টিউটোরিয়ালটি বর্ণনা করে যে কীভাবে আমাদের স্মার্ট কন্ট্রাক্ট, Hardhat এবং ethers.js ব্যবহার করে ইথেরিয়াম ব্লকচেইনে একটি NFT মিন্ট করতে হয়।"
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

"একটি NFT মিন্টিং" হলো ব্লকচেইনে আপনার ERC-721 টোকেনের একটি অনন্য ইনস্ট্যান্স প্রকাশ করার কাজ। [এই NFT টিউটোরিয়াল সিরিজের 1ম অংশ](/developers/tutorials/how-to-write-and-deploy-an-nft/)-এর আমাদের স্মার্ট কন্ট্রাক্ট ব্যবহার করে, চলুন আমাদের Web3 দক্ষতা কাজে লাগাই এবং একটি NFT মিন্ট করি। এই টিউটোরিয়ালের শেষে, আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন!

চলুন শুরু করা যাক!

## ধাপ 1: আপনার সেটআপ চেক করুন {#install-web3}

আপনি যদি আপনার NFT স্মার্ট কন্ট্রাক্ট তৈরি করার প্রথম টিউটোরিয়ালটি অনুসরণ করে থাকেন, তবে আপনার প্রয়োজনীয় সবকিছুই আপনার কাছে আছে: [Ethers plugin](https://hardhat.org/docs/plugins/hardhat-ethers) এবং [ethers.js](https://docs.ethers.org/v6/) সহ একটি Hardhat 3 প্রজেক্ট, যা [ইথেরিয়াম](/) ব্লকচেইনে রিকোয়েস্ট তৈরি করা সহজ করতে ব্যবহৃত একটি লাইব্রেরি। আমরা আমাদের মিন্টিং কোডটি একটি Hardhat স্ক্রিপ্ট হিসেবে লিখব, যাতে এটি Sepolia নেটওয়ার্ক সেটিংস এবং 1ম অংশ থেকে `API_URL` ও `PRIVATE_KEY` মানগুলো পুনরায় ব্যবহার করে — নতুন করে ইনস্টল করার মতো কিছু নেই।

## ধাপ 2: একটি `mint-nft.js` ফাইল তৈরি করুন {#create-mintnftjs}

আপনার scripts ডিরেক্টরির ভেতরে, একটি `mint-nft.js` ফাইল তৈরি করুন এবং নিচের কোডগুলো যোগ করুন:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

আমাদের ডিপ্লয় স্ক্রিপ্টের মতোই, আপনি যখন স্ক্রিপ্টটি রান করেন তখন `network.create()` আপনার `--network` দিয়ে বেছে নেওয়া নেটওয়ার্কের সাথে কানেক্ট করে এবং এর জন্য আমাদের একটি `ethers` অবজেক্ট দেয়।

## ধাপ 3: আপনার কন্ট্রাক্ট ABI সংগ্রহ করুন {#contract-abi}

আমাদের কন্ট্রাক্ট ABI (অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (এবিআই)) হলো আমাদের স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার ইন্টারফেস। আপনি [কন্ট্রাক্ট ABI](/glossary/#abi) সম্পর্কে আরও জানতে পারেন। Hardhat যখন কন্ট্রাক্টটি কম্পাইল করে তখন এটি স্বয়ংক্রিয়ভাবে আমাদের জন্য একটি ABI তৈরি করে এবং এটি `artifacts/contracts/MyNFT.sol/MyNFT.json` ফাইলে সেভ করে। ধাপ 5-এ যখন আমরা আমাদের কন্ট্রাক্ট ইনস্ট্যান্স তৈরি করি তখন Hardhat Ethers প্লাগইন আমাদের জন্য সেখান থেকে এটি পড়ে নেয়, তাই আমাদের নিজেদের এটি লোড করার প্রয়োজন নেই।

আপনি যদি ABI দেখতে চান তবে আপনি এটি আপনার কনসোলে প্রিন্ট করতে পারেন। আপনার প্রজেক্টের রুট ডিরেক্টরি থেকে, রান করুন:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## ধাপ 4: IPFS ব্যবহার করে আপনার NFT-এর জন্য মেটাডেটা কনফিগার করুন {#config-meta}

আপনার যদি 1ম অংশের টিউটোরিয়াল থেকে মনে থাকে, আমাদের `mintNFT` স্মার্ট কন্ট্রাক্ট ফাংশনটি একটি tokenURI প্যারামিটার নেয় যা NFT-এর মেটাডেটা বর্ণনা করে এমন একটি JSON ডকুমেন্টে রিজলভ হওয়া উচিত— যা মূলত NFT-কে প্রাণবন্ত করে তোলে, এটিকে নাম, বিবরণ, ছবি এবং অন্যান্য অ্যাট্রিবিউটের মতো কনফিগারযোগ্য বৈশিষ্ট্য রাখার অনুমতি দেয়।

> _ইন্টারপ্ল্যানেটারি ফাইল সিস্টেম (IPFS) হলো একটি ডিস্ট্রিবিউটেড ফাইল সিস্টেমে ডেটা স্টোর এবং শেয়ার করার জন্য একটি বিকেন্দ্রীকৃত প্রোটোকল এবং পিয়ার-টু-পিয়ার নেটওয়ার্ক।_

আমাদের NFT সত্যিই বিকেন্দ্রীকৃত তা নিশ্চিত করতে আমরা আমাদের NFT অ্যাসেট এবং মেটাডেটা স্টোর করার জন্য Pinata ব্যবহার করব, যা একটি সুবিধাজনক IPFS API এবং টুলকিট। আপনার যদি Pinata অ্যাকাউন্ট না থাকে, তবে [এখানে](https://app.pinata.cloud) একটি ফ্রি অ্যাকাউন্টের জন্য সাইন আপ করুন এবং আপনার ইমেইল ভেরিফাই করার ধাপগুলো সম্পন্ন করুন।

একবার আপনি একটি অ্যাকাউন্ট তৈরি করার পর:

- [Files page](https://app.pinata.cloud/ipfs/files)-এ যান এবং পেজের উপরের ডানদিকের কোণায় "Add" বোতামে ক্লিক করুন।

- Pinata-তে একটি ছবি আপলোড করুন — এটি আপনার NFT-এর জন্য ইমেজ অ্যাসেট হবে। আপনি আপনার ইচ্ছামতো অ্যাসেটটির নাম দিতে পারেন। নিশ্চিত করুন যে আপনি এটি পাবলিক IPFS-এ আপলোড করেছেন: [Private IPFS](https://docs.pinata.cloud/files/private-ipfs)-এর ফাইলগুলো আপনার NFT প্রদর্শনকারী ওয়ালেট এবং মার্কেটপ্লেসগুলো ফেচ করতে পারে না।

- আপলোড করার পর, আপনি Files পেজে ফাইলটিকে এর CID (কন্টেন্ট আইডেন্টিফায়ার) সহ তালিকাভুক্ত দেখতে পাবেন। CID কপি করুন। আপনি আপনার আপলোডটি এখানে দেখতে পারেন: `https://gateway.pinata.cloud/ipfs/<CID>`, অথবা Pinata সাইডবারে "Gateways"-এর অধীনে তালিকাভুক্ত ডেডিকেটেড গেটওয়ের মাধ্যমে। উদাহরণস্বরূপ, আমরা IPFS-এ যে ছবিটি ব্যবহার করেছি তা আপনি [এখানে](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) খুঁজে পেতে পারেন।

এখন, আমরা Pinata-তে আরও একটি ডকুমেন্ট আপলোড করতে চাইব। তবে তা করার আগে, আমাদের এটি তৈরি করতে হবে!

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

json-এর ডেটা পরিবর্তন করতে দ্বিধা করবেন না। আপনি attributes সেকশন থেকে কিছু সরাতে বা যোগ করতে পারেন। সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, নিশ্চিত করুন যে image ফিল্ডটি আপনার IPFS ইমেজের লোকেশনকে নির্দেশ করে, `ipfs://<image-CID>` ফর্মে — অন্যথায়, আপনার NFT-তে একটি (খুব সুন্দর!) কুকুরের ছবি অন্তর্ভুক্ত থাকবে।

JSON ফাইলটি এডিট করা শেষ হলে, এটি সেভ করুন এবং ছবি আপলোড করার জন্য আমরা যে ধাপগুলো অনুসরণ করেছিলাম সেই একই ধাপগুলো অনুসরণ করে এটি Pinata-তে আপলোড করুন। `nft-metadata.json`-এর CID-ও কপি করুন; ধাপ 9-এ আমাদের এটি প্রয়োজন হবে।

## ধাপ 5: আপনার কন্ট্রাক্টের একটি ইনস্ট্যান্স তৈরি করুন {#instance-contract}

এখন, আমাদের কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য, আমাদের কোডে এর একটি ইনস্ট্যান্স তৈরি করতে হবে। এটি করার জন্য আমাদের কন্ট্রাক্ট ঠিকানা প্রয়োজন হবে, যা আমাদের ডিপ্লয় স্ক্রিপ্ট 1ম অংশে প্রিন্ট করেছিল। আপনি কন্ট্রাক্টটি ডিপ্লয় করার জন্য যে ঠিকানাটি ব্যবহার করেছিলেন তা অনুসন্ধান করে [Etherscan](https://sepolia.etherscan.io/) বা [Blockscout](https://eth-sepolia.blockscout.com/)-এও এটি খুঁজে পেতে পারেন।

![View your contract address on Etherscan](./view-contract-etherscan.png)

উপরের উদাহরণে, আমাদের কন্ট্রাক্ট ঠিকানা হলো 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778।

এরপর আমরা Hardhat Ethers প্লাগইনের `getContractAt` মেথড ব্যবহার করে আমাদের কন্ট্রাক্ট তৈরি করব এর নাম (যা এটিকে বলে দেয় কোন ABI ব্যবহার করতে হবে) এবং এর ঠিকানা ব্যবহার করে। আপনার `mint-nft.js` ফাইলে, ঠিকানাটি আপনার নিজের ঠিকানা দিয়ে প্রতিস্থাপন করে নিচের কোডটি যোগ করুন:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## ধাপ 6: `.env` ফাইল চেক করুন {#update-env}

আমাদের পাঠানো প্রতিটি ট্রানজ্যাকশন আপনার অ্যাকাউন্টের প্রাইভেট কী দিয়ে সাইন করতে হবে। আপনি যদি টিউটোরিয়ালের 1ম অংশ সম্পন্ন করে থাকেন, তবে আমাদের `.env` ফাইলটি ইতিমধ্যেই এরকম দেখতে হওয়া উচিত:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

আপনার পাবলিক ঠিকানা যোগ করার কোনো প্রয়োজন নেই: ethers প্রাইভেট কী থেকে এটি বের করে নেয়।

## ধাপ 7: আপনার ট্রানজ্যাকশন তৈরি করুন {#create-txn}

প্রথমে, চলুন `mintNFT(tokenURI)` নামের একটি ফাংশন সংজ্ঞায়িত করি এবং নিচের কাজগুলো করে আমাদের ট্রানজ্যাকশন তৈরি করি:

1. আমরা যে অ্যাকাউন্ট থেকে ট্রানজ্যাকশন পাঠাই সেটি পান। `ethers.getSigners()` নেটওয়ার্কের জন্য কনফিগার করা অ্যাকাউন্টগুলো রিটার্ন করে, যা Sepolia-তে সেই অ্যাকাউন্ট যার প্রাইভেট কী `.env`-এ রয়েছে। যেহেতু `mintNFT` হলো `onlyOwner`, তাই এটি অবশ্যই সেই একই অ্যাকাউন্ট হতে হবে যা কন্ট্রাক্টটি ডিপ্লয় করেছিল।

1. আমাদের কন্ট্রাক্ট ইনস্ট্যান্সে `mintNFT` ফাংশনটি কল করুন, যেখানে প্রাপক হিসেবে আমাদের নিজস্ব ঠিকানা এবং মেটাডেটা URI থাকবে। এটি হলো সেই কম্পিউটেশন যা আমরা এই ট্রানজ্যাকশনে সম্পাদন করতে চাই — যা এই ক্ষেত্রে একটি NFT মিন্টিং।

আপনাকে নিজে থেকে নন্স (আপনার ঠিকানা থেকে পাঠানো ট্রানজ্যাকশনের সংখ্যা, যা রিপ্লে অ্যাটাক প্রতিরোধ করে), গ্যাস লিমিট, বা ফি বের করতে হবে না: ট্রানজ্যাকশন পাঠানোর আগে ethers সেগুলো ফেচ করে বা অনুমান করে নেয়।

আপনার `mint-nft.js` ফাইলটি এখন এরকম দেখতে হওয়া উচিত:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // ট্রানজ্যাকশনটি পাঠান। ethers আমাদের জন্য নন্স, গ্যাস লিমিট এবং ফি পূরণ করে দেয়।
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## ধাপ 8: ট্রানজ্যাকশন সাইন করুন {#sign-txn}

যেহেতু নেটওয়ার্কটি আমাদের প্রাইভেট কী দিয়ে কনফিগার করা হয়েছে, তাই ethers ট্রানজ্যাকশন পাঠানোর আগে স্বয়ংক্রিয়ভাবে এটি দিয়ে সাইন করে।

ট্রানজ্যাকশন পাঠানো হয়ে গেলে `mintNFT` কল করা রিটার্ন করে, এবং আমাদের ট্রানজ্যাকশন হ্যাশ দেয়, যা ব্যবহার করে আমরা নিশ্চিত হতে পারি যে আমাদের ট্রানজ্যাকশন মাইন করা হয়েছে এবং নেটওয়ার্ক দ্বারা ড্রপ করা হয়নি। এরপর `tx.wait()` ট্রানজ্যাকশনটি একটি ব্লকে অন্তর্ভুক্ত হওয়া পর্যন্ত অপেক্ষা করে। আমরা কিছু এরর চেকিংও যোগ করেছি যাতে আমরা জানতে পারি আমাদের ট্রানজ্যাকশন সফলভাবে সম্পন্ন হয়েছে কিনা।

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // ট্রানজ্যাকশনটি পাঠান। ethers আমাদের জন্য নন্স, গ্যাস লিমিট এবং ফি পূরণ করে দেয়।
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // ট্রানজ্যাকশনটি একটি ব্লকে অন্তর্ভুক্ত হওয়ার জন্য অপেক্ষা করুন।
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## ধাপ 9: `mintNFT` কল করুন এবং `mint-nft.js` রান করুন {#call-mintnft-fn}

আপনার Pinata-তে আপলোড করা `nft-metadata.json`-এর কথা মনে আছে? Pinata থেকে এর CID নিন এবং `mintNFT` ফাংশনে প্যারামিটার হিসেবে `ipfs://<metadata-CID>` পাস করুন। ওয়ালেট এবং মার্কেটপ্লেসগুলো তাদের পছন্দের একটি IPFS গেটওয়ের মাধ্যমে `ipfs://` URI-গুলো রিজলভ করে, তাই আপনার NFT কোনো একক গেটওয়ের ওপর নির্ভর করে না।

> একটি আলাদা উইন্ডোতে `https://gateway.pinata.cloud/ipfs/<metadata-CID>` লোড করে ডাবল চেক করুন যে আপনার কপি করা CID-টি আপনার **nft-metadata.json**-এর সাথে লিঙ্ক করা আছে কিনা। পেজটি নিচের স্ক্রিনশটের মতো দেখতে হওয়া উচিত:

![Your page should display the json metadata](./metadataJSON.png)_আপনার পেজে json মেটাডেটা প্রদর্শিত হওয়া উচিত_

সব মিলিয়ে, আপনার কোডটি এরকম দেখতে হওয়া উচিত:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // ট্রানজ্যাকশনটি পাঠান। ethers আমাদের জন্য নন্স, গ্যাস লিমিট এবং ফি পূরণ করে দেয়।
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // ট্রানজ্যাকশনটি একটি ব্লকে অন্তর্ভুক্ত হওয়ার জন্য অপেক্ষা করুন।
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

এখন, আপনার NFT মিন্ট করতে Sepolia-এর বিপরীতে স্ক্রিপ্টটি রান করুন:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

কয়েক সেকেন্ড পর, আপনি আপনার টার্মিনালে এরকম একটি রেসপন্স দেখতে পাবেন:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

আপনার ট্রানজ্যাকশনের বিস্তারিত দেখতে, [Etherscan](https://sepolia.etherscan.io/) বা [Blockscout](https://eth-sepolia.blockscout.com/)-এ এর হ্যাশ অনুসন্ধান করুন।

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscan-এ আপনার NFT ট্রানজ্যাকশন হ্যাশ দেখুন_

আর এভাবেই হয়ে গেল! আপনি এখন ইথেরিয়াম ব্লকচেইনে একটি NFT ডিপ্লয় এবং মিন্ট করেছেন <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` ব্যবহার করে আপনি আপনার মন (এবং ওয়ালেট) যতগুলো চায় ততগুলো NFT মিন্ট করতে পারবেন! শুধু নিশ্চিত করুন যে আপনি NFT-এর মেটাডেটা বর্ণনা করে এমন একটি নতুন tokenURI পাস করেছেন (অন্যথায়, আপনি শুধু ভিন্ন ভিন্ন ID সহ একগুচ্ছ অভিন্ন NFT তৈরি করবেন)।

সম্ভবত, আপনি আপনার ওয়ালেটে আপনার NFT প্রদর্শন করতে চাইবেন — তাই [৩য় অংশ: কীভাবে আপনার ওয়ালেটে আপনার NFT দেখবেন](/developers/tutorials/how-to-view-nft-in-metamask/) চেক করতে ভুলবেন না!
