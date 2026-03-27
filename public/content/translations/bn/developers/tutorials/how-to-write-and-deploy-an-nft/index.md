---
title: "কীভাবে একটি NFT লিখতে এবং ডিপ্লয় করতে হয় (NFT টিউটোরিয়াল সিরিজের পর্ব 1/3)"
description: "এই টিউটোরিয়ালটি NFT-এর উপর একটি সিরিজের পর্ব 1, যা আপনাকে ধাপে ধাপে দেখাবে কীভাবে ইথিরিয়াম এবং ইন্টার প্ল্যানেটারি ফাইল সিস্টেম (IPFS) ব্যবহার করে একটি নন-ফান্জেবল টোকেন (ERC-721 টোকেন) স্মার্ট কন্ট্রাক্ট লিখতে এবং ডিপ্লয় করতে হয়।"
author: "সুমি মুদগিল"
tags: ["ERC-721", "Alchemy", "Solidity", "স্মার্ট কন্ট্রাক্ট"]
skill: beginner
breadcrumb: "NFT লিখুন এবং ডিপ্লয় করুন"
lang: bn
published: 2021-04-22
---

NFT-গুলো ব্লকচেইনকে জনসমক্ষে নিয়ে আসার সাথে সাথে, ইথিরিয়াম ব্লকচেইনে আপনার নিজস্ব NFT কন্ট্রাক্ট (ERC-721 টোকেন) প্রকাশ করে এই উন্মাদনাটি নিজে বোঝার জন্য এটি একটি চমৎকার সুযোগ!

Alchemy NFT স্পেসের সবচেয়ে বড় নামগুলোকে শক্তি জোগাতে পেরে অত্যন্ত গর্বিত, যার মধ্যে রয়েছে Makersplace (সম্প্রতি Christie’s-এ $69 মিলিয়নে ডিজিটাল আর্টওয়ার্ক বিক্রির রেকর্ড গড়েছে), Dapper Labs (NBA Top Shot এবং Crypto Kitties-এর নির্মাতা), OpenSea (বিশ্বের বৃহত্তম NFT মার্কেটপ্লেস), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable এবং আরও অনেক কিছু।

এই টিউটোরিয়ালে, আমরা [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) এবং [Alchemy](https://alchemy.com/signup/eth) ব্যবহার করে Sepolia টেস্টনেট-এ একটি ERC-721 স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করার প্রক্রিয়া দেখব (যদি আপনি এখনও এগুলোর অর্থ বুঝতে না পারেন তবে চিন্তা করবেন না — আমরা এটি ব্যাখ্যা করব!)।

এই টিউটোরিয়ালের পর্ব 2-এ আমরা দেখব কীভাবে আমরা একটি NFT মিন্ট করতে আমাদের স্মার্ট কন্ট্রাক্ট ব্যবহার করতে পারি এবং পর্ব 3-এ আমরা ব্যাখ্যা করব কীভাবে MetaMask-এ আপনার NFT দেখতে হয়।

এবং অবশ্যই, যদি কোনো পর্যায়ে আপনার প্রশ্ন থাকে, তবে [Alchemy Discord](https://discord.gg/gWuC7zB)-এ যোগাযোগ করতে বা [Alchemy's NFT API docs](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) ভিজিট করতে দ্বিধা করবেন না!

## ধাপ 1: ইথিরিয়াম নেটওয়ার্ক-এর সাথে সংযুক্ত হোন {#connect-to-ethereum}

ইথিরিয়াম ব্লকচেইন-এ রিকোয়েস্ট করার অনেক উপায় রয়েছে, তবে বিষয়গুলো সহজ করার জন্য, আমরা [Alchemy](https://alchemy.com/signup/eth)-তে একটি বিনামূল্যের একাউন্ট ব্যবহার করব, যা একটি ব্লকচেইন ডেভেলপার প্ল্যাটফর্ম এবং API যা আমাদের নিজস্ব নোড না চালিয়েই ইথিরিয়াম চেইনের সাথে যোগাযোগ করতে দেয়।

এই টিউটোরিয়ালে, আমরা আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয়মেন্টের নেপথ্যে কী ঘটছে তা বোঝার জন্য মনিটরিং এবং অ্যানালিটিক্সের জন্য Alchemy-এর ডেভেলপার টুলগুলোরও সুবিধা নেব। যদি আপনার আগে থেকেই কোনো Alchemy একাউন্ট না থাকে, তবে আপনি বিনামূল্যে [এখানে](https://alchemy.com/signup/eth) সাইন আপ করতে পারেন।

## ধাপ 2: আপনার অ্যাপ (এবং API কি) তৈরি করুন {#make-api-key}

একবার আপনি একটি Alchemy একাউন্ট তৈরি করলে, আপনি একটি অ্যাপ তৈরি করে একটি API কি জেনারেট করতে পারেন। এটি আমাদের Sepolia টেস্টনেট-এ রিকোয়েস্ট করার অনুমতি দেবে। আপনি যদি টেস্টনেট সম্পর্কে আরও জানতে আগ্রহী হন তবে [এই গাইডটি](https://docs.alchemyapi.io/guides/choosing-a-network) দেখুন।

1. ন্যাভ বারে "Apps"-এর উপর হোভার করে এবং "Create App"-এ ক্লিক করে আপনার Alchemy ড্যাশবোর্ডের "Create App" পেজে যান

![আপনার অ্যাপ তৈরি করুন](./create-your-app.png)

2. আপনার অ্যাপের নাম দিন (আমরা "My First NFT!" বেছে নিয়েছি), একটি সংক্ষিপ্ত বিবরণ দিন, চেইনের জন্য "Ethereum" নির্বাচন করুন এবং আপনার নেটওয়ার্ক-এর জন্য "Sepolia" বেছে নিন। মার্জ হওয়ার পর থেকে অন্যান্য টেস্টনেট-গুলো বাতিল করা হয়েছে।

![আপনার অ্যাপ কনফিগার এবং প্রকাশ করুন](./alchemy-explorer-sepolia.png)

3. "Create app"-এ ক্লিক করুন এবং কাজ শেষ! আপনার অ্যাপটি নিচের টেবিলে দেখা উচিত।

## ধাপ 3: একটি ইথিরিয়াম একাউন্ট (এডড্রেস) তৈরি করুন {#create-eth-address}

লেনদেন পাঠাতে এবং গ্রহণ করতে আমাদের একটি ইথিরিয়াম একাউন্ট প্রয়োজন। এই টিউটোরিয়ালের জন্য, আমরা MetaMask ব্যবহার করব, যা ব্রাউজারে একটি ভার্চুয়াল ওয়ালেট যা আপনার ইথিরিয়াম একাউন্ট এডড্রেস পরিচালনা করতে ব্যবহৃত হয়। আপনি যদি ইথিরিয়াম-এ লেনদেন কীভাবে কাজ করে সে সম্পর্কে আরও বুঝতে চান, তবে ইথিরিয়াম ফাউন্ডেশনের [এই পেজটি](/developers/docs/transactions/) দেখুন।

আপনি বিনামূল্যে [এখানে](https://metamask.io/download) একটি MetaMask একাউন্ট ডাউনলোড এবং তৈরি করতে পারেন। যখন আপনি একটি একাউন্ট তৈরি করছেন, বা যদি আপনার আগে থেকেই একটি একাউন্ট থাকে, তবে উপরের ডানদিকে "Sepolia Test Network"-এ স্যুইচ করতে ভুলবেন না (যাতে আমরা আসল টাকা নিয়ে কাজ না করি)।

![আপনার নেটওয়ার্ক হিসেবে Sepolia সেট করুন](./metamask-goerli.png)

## ধাপ 4: একটি ফাসেট থেকে ইথার যোগ করুন {#step-4-add-ether-from-a-faucet}

টেস্টনেট-এ আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার জন্য, আমাদের কিছু নকল ETH প্রয়োজন হবে। ETH পেতে আপনি Alchemy দ্বারা হোস্ট করা [Sepolia Faucet](https://sepoliafaucet.com/)-এ যেতে পারেন, লগ ইন করুন এবং আপনার একাউন্ট এডড্রেস লিখুন, "Send Me ETH"-এ ক্লিক করুন। এর পরপরই আপনার MetaMask একাউন্ট-এ ETH দেখতে পাওয়া উচিত!

## ধাপ 5: আপনার ব্যালেন্স চেক করুন {#check-balance}

আমাদের ব্যালেন্স সেখানে আছে কিনা তা দুবার চেক করতে, চলুন [Alchemy’s composer tool](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ব্যবহার করে একটি [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) রিকোয়েস্ট করি। এটি আমাদের ওয়ালেট-এ থাকা ETH-এর পরিমাণ রিটার্ন করবে। আপনার MetaMask একাউন্ট এডড্রেস ইনপুট করার পর এবং "Send Request"-এ ক্লিক করার পর, আপনার এইরকম একটি রেসপন্স দেখা উচিত:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **নোট** এই ফলাফলটি wei-তে, ETH-এ নয়। Wei ইথারের ক্ষুদ্রতম একক হিসেবে ব্যবহৃত হয়। wei থেকে ETH-এ রূপান্তর হলো 1 eth = 10<sup>18</sup> wei। তাই যদি আমরা 0xde0b6b3a7640000 কে ডেসিমালে রূপান্তর করি তবে আমরা 1\*10<sup>18</sup> wei পাই, যা 1 ETH এর সমান।

যাক! আমাদের সব নকল টাকা সেখানে আছে।

## ধাপ 6: আমাদের প্রজেক্ট ইনিশিয়ালাইজ করুন {#initialize-project}

প্রথমে, আমাদের প্রজেক্টের জন্য একটি ফোল্ডার তৈরি করতে হবে। আপনার কমান্ড লাইনে যান এবং টাইপ করুন:

    mkdir my-nft
    cd my-nft

এখন যেহেতু আমরা আমাদের প্রজেক্ট ফোল্ডারের ভিতরে আছি, আমরা প্রজেক্টটি ইনিশিয়ালাইজ করতে npm init ব্যবহার করব। যদি আপনার আগে থেকেই npm ইনস্টল করা না থাকে, তবে [এই নির্দেশাবলী](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) অনুসরণ করুন (আমাদের [Node.js](https://nodejs.org/en/download/)-ও প্রয়োজন হবে, তাই সেটিও ডাউনলোড করুন!)।

    npm init

আপনি ইনস্টলেশনের প্রশ্নগুলোর উত্তর কীভাবে দেন তা খুব একটা গুরুত্বপূর্ণ নয়; রেফারেন্সের জন্য আমরা কীভাবে এটি করেছি তা এখানে দেওয়া হলো:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

package.json অনুমোদন করুন, এবং আমরা প্রস্তুত!

## ধাপ 7: [Hardhat](https://hardhat.org/getting-started/#overview) ইনস্টল করুন {#install-hardhat}

Hardhat হলো আপনার ইথিরিয়াম সফটওয়্যার কম্পাইল, ডিপ্লয়, টেস্ট এবং ডিবাগ করার জন্য একটি ডেভেলপমেন্ট এনভায়রনমেন্ট। এটি লাইভ চেইনে ডিপ্লয় করার আগে স্থানীয়ভাবে স্মার্ট কন্ট্রাক্ট এবং ডিএ্যাপস তৈরি করার সময় ডেভেলপারদের সাহায্য করে।

আমাদের my-nft প্রজেক্টের ভিতরে রান করুন:

    npm install --save-dev hardhat

[ইনস্টলেশন নির্দেশাবলী](https://hardhat.org/getting-started/#overview) সম্পর্কে আরও বিস্তারিত জানতে এই পেজটি দেখুন।

## ধাপ 8: Hardhat প্রজেক্ট তৈরি করুন {#create-hardhat-project}

আমাদের প্রজেক্ট ফোল্ডারের ভিতরে রান করুন:

    npx hardhat

এরপর আপনার একটি ওয়েলকাম মেসেজ এবং আপনি কী করতে চান তা নির্বাচন করার অপশন দেখা উচিত। "create an empty hardhat.config.js" নির্বাচন করুন:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

এটি আমাদের জন্য একটি hardhat.config.js ফাইল তৈরি করবে যেখানে আমরা আমাদের প্রজেক্টের জন্য সমস্ত সেট আপ নির্দিষ্ট করব (ধাপ 13-এ)।

## ধাপ 9: প্রজেক্ট ফোল্ডার যোগ করুন {#add-project-folders}

আমাদের প্রজেক্টটি গুছিয়ে রাখতে, আমরা দুটি নতুন ফোল্ডার তৈরি করব। আপনার কমান্ড লাইনে আপনার প্রজেক্টের রুট ডিরেক্টরিতে যান এবং টাইপ করুন:

    mkdir contracts
    mkdir scripts

- contracts/ হলো যেখানে আমরা আমাদের NFT স্মার্ট কন্ট্রাক্ট কোড রাখব

- scripts/ হলো যেখানে আমরা আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় এবং ইন্টারঅ্যাক্ট করার জন্য স্ক্রিপ্ট রাখব

## ধাপ 10: আমাদের কন্ট্রাক্ট লিখুন {#write-contract}

এখন যেহেতু আমাদের এনভায়রনমেন্ট সেট আপ করা হয়েছে, আরও আকর্ষণীয় বিষয়ের দিকে যাওয়া যাক: _আমাদের স্মার্ট কন্ট্রাক্ট কোড লেখা!_

আপনার পছন্দের এডিটরে my-nft প্রজেক্টটি খুলুন (আমাদের পছন্দ [VSCode](https://code.visualstudio.com/))। স্মার্ট কন্ট্রাক্ট-গুলো Solidity নামক একটি ভাষায় লেখা হয় যা আমরা আমাদের MyNFT.sol স্মার্ট কন্ট্রাক্ট লিখতে ব্যবহার করব।‌

1. `contracts` ফোল্ডারে যান এবং MyNFT.sol নামে একটি নতুন ফাইল তৈরি করুন

2. নিচে আমাদের NFT স্মার্ট কন্ট্রাক্ট কোড দেওয়া হলো, যা আমরা [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) লাইব্রেরির ERC-721 ইমপ্লিমেন্টেশনের উপর ভিত্তি করে তৈরি করেছি। নিচের বিষয়বস্তু কপি করে আপনার MyNFT.sol ফাইলে পেস্ট করুন।

   ```solidity
   // [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)-এর উপর ভিত্তি করে তৈরি কন্ট্রাক্ট
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. যেহেতু আমরা OpenZeppelin কন্ট্রাক্ট লাইব্রেরি থেকে ক্লাস ইনহেরিট করছি, তাই আমাদের ফোল্ডারে লাইব্রেরিটি ইনস্টল করতে আপনার কমান্ড লাইনে `npm install @openzeppelin/contracts^4.0.0` রান করুন।

তাহলে, এই কোডটি আসলে কী _করে_? চলুন এটি লাইন-বাই-লাইন বিশ্লেষণ করি।

আমাদের স্মার্ট কন্ট্রাক্ট-এর শীর্ষে, আমরা তিনটি [OpenZeppelin](https://openzeppelin.com/) স্মার্ট কন্ট্রাক্ট ক্লাস ইমপোর্ট করি:

- @openzeppelin/contracts/token/ERC721/ERC721.sol-এ ERC-721 স্ট্যান্ডার্ডের ইমপ্লিমেন্টেশন রয়েছে, যা আমাদের NFT স্মার্ট কন্ট্রাক্ট ইনহেরিট করবে। (একটি বৈধ NFT হতে হলে, আপনার স্মার্ট কন্ট্রাক্ট-কে অবশ্যই ERC-721 স্ট্যান্ডার্ডের সমস্ত মেথড ইমপ্লিমেন্ট করতে হবে।) ইনহেরিট করা ERC-721 ফাংশনগুলো সম্পর্কে আরও জানতে, [এখানে](https://eips.ethereum.org/EIPS/eip-721) ইন্টারফেস ডেফিনিশন দেখুন।

- @openzeppelin/contracts/utils/Counters.sol এমন কাউন্টার প্রদান করে যা শুধুমাত্র এক করে বাড়ানো বা কমানো যায়। আমাদের স্মার্ট কন্ট্রাক্ট মিন্ট করা মোট NFT-এর সংখ্যার ট্র্যাক রাখতে এবং আমাদের নতুন NFT-তে ইউনিক ID সেট করতে একটি কাউন্টার ব্যবহার করে। (স্মার্ট কন্ট্রাক্ট ব্যবহার করে মিন্ট করা প্রতিটি NFT-কে অবশ্যই একটি ইউনিক ID দিতে হবে—এখানে আমাদের ইউনিক ID শুধুমাত্র বিদ্যমান মোট NFT-এর সংখ্যা দ্বারা নির্ধারিত হয়। উদাহরণস্বরূপ, আমাদের স্মার্ট কন্ট্রাক্ট দিয়ে আমরা যে প্রথম NFT মিন্ট করি তার ID হলো "1," আমাদের দ্বিতীয় NFT-এর ID হলো "2," ইত্যাদি।)

- @openzeppelin/contracts/access/Ownable.sol আমাদের স্মার্ট কন্ট্রাক্ট-এ [অ্যাক্সেস কন্ট্রোল](https://docs.openzeppelin.com/contracts/3.x/access-control) সেট আপ করে, যাতে শুধুমাত্র স্মার্ট কন্ট্রাক্ট-এর মালিক (আপনি) NFT মিন্ট করতে পারেন। (নোট করুন, অ্যাক্সেস কন্ট্রোল অন্তর্ভুক্ত করা সম্পূর্ণ আপনার পছন্দ। আপনি যদি চান যে যেকেউ আপনার স্মার্ট কন্ট্রাক্ট ব্যবহার করে একটি NFT মিন্ট করতে পারুক, তবে 10 নম্বর লাইনে Ownable এবং 17 নম্বর লাইনে onlyOwner শব্দটি মুছে ফেলুন।)

আমাদের ইমপোর্ট স্টেটমেন্টের পরে, আমাদের কাস্টম NFT স্মার্ট কন্ট্রাক্ট রয়েছে, যা আশ্চর্যজনকভাবে ছোট — এতে শুধুমাত্র একটি কাউন্টার, একটি কনস্ট্রাক্টর এবং একটি ফাংশন রয়েছে! এটি আমাদের ইনহেরিট করা OpenZeppelin কন্ট্রাক্টগুলোর কারণে সম্ভব হয়েছে, যা একটি NFT তৈরি করার জন্য আমাদের প্রয়োজনীয় বেশিরভাগ মেথড ইমপ্লিমেন্ট করে, যেমন `ownerOf` যা NFT-এর মালিককে রিটার্ন করে এবং `transferFrom`, যা একটি একাউন্ট থেকে অন্য একাউন্ট-এ NFT-এর মালিকানা স্থানান্তর করে।

আমাদের ERC-721 কনস্ট্রাক্টরে, আপনি লক্ষ্য করবেন যে আমরা 2টি স্ট্রিং পাস করি, "MyNFT" এবং "NFT।" প্রথম ভেরিয়েবলটি হলো স্মার্ট কন্ট্রাক্ট-এর নাম এবং দ্বিতীয়টি হলো এর প্রতীক। আপনি আপনার ইচ্ছামতো এই ভেরিয়েবলগুলোর নাম দিতে পারেন!

সবশেষে, আমাদের `mintNFT(address recipient, string memory tokenURI)` ফাংশন রয়েছে যা আমাদের একটি NFT মিন্ট করতে দেয়! আপনি লক্ষ্য করবেন যে এই ফাংশনটি দুটি ভেরিয়েবল নেয়:

- `address recipient` সেই এডড্রেস নির্দিষ্ট করে যা আপনার নতুন মিন্ট করা NFT গ্রহণ করবে

- `string memory tokenURI` হলো একটি স্ট্রিং যা একটি JSON ডকুমেন্টে রিজলভ হওয়া উচিত যা NFT-এর মেটাডেটা বর্ণনা করে। একটি NFT-এর মেটাডেটাই মূলত এটিকে জীবন্ত করে তোলে, এটিকে কনফিগারযোগ্য বৈশিষ্ট্য যেমন নাম, বিবরণ, ছবি এবং অন্যান্য অ্যাট্রিবিউট রাখার অনুমতি দেয়। এই টিউটোরিয়ালের পর্ব 2-এ, আমরা বর্ণনা করব কীভাবে এই মেটাডেটা কনফিগার করতে হয়।

`mintNFT` ইনহেরিট করা ERC-721 লাইব্রেরি থেকে কিছু মেথড কল করে এবং শেষ পর্যন্ত একটি সংখ্যা রিটার্ন করে যা নতুন মিন্ট করা NFT-এর ID উপস্থাপন করে।

## ধাপ 11: আপনার প্রজেক্টে MetaMask এবং Alchemy সংযুক্ত করুন {#connect-metamask-and-alchemy}

এখন যেহেতু আমরা একটি MetaMask ওয়ালেট, Alchemy একাউন্ট তৈরি করেছি এবং আমাদের স্মার্ট কন্ট্রাক্ট লিখেছি, এখন এই তিনটিকে সংযুক্ত করার সময়।

আপনার ভার্চুয়াল ওয়ালেট থেকে পাঠানো প্রতিটি লেনদেন-এর জন্য আপনার ইউনিক প্রাইভেট কি ব্যবহার করে একটি সিগনেচার প্রয়োজন। আমাদের প্রোগ্রামকে এই অনুমতি প্রদান করতে, আমরা নিরাপদে আমাদের প্রাইভেট কি (এবং Alchemy API কি) একটি এনভায়রনমেন্ট ফাইলে সংরক্ষণ করতে পারি।

লেনদেন পাঠানো সম্পর্কে আরও জানতে, web3 ব্যবহার করে লেনদেন পাঠানোর উপর [এই টিউটোরিয়ালটি](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) দেখুন।

প্রথমে, আপনার প্রজেক্ট ডিরেক্টরিতে dotenv প্যাকেজটি ইনস্টল করুন:

    npm install dotenv --save

তারপর, আমাদের প্রজেক্টের রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন এবং এতে আপনার MetaMask প্রাইভেট কি এবং HTTP Alchemy API URL যোগ করুন।

- MetaMask থেকে আপনার প্রাইভেট কি এক্সপোর্ট করতে [এই নির্দেশাবলী](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) অনুসরণ করুন

- HTTP Alchemy API URL পেতে নিচে দেখুন এবং এটি আপনার ক্লিপবোর্ডে কপি করুন

![আপনার Alchemy API URL কপি করুন](./copy-alchemy-api-url.gif)

আপনার `.env` এখন এইরকম দেখতে হওয়া উচিত:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

এগুলোকে আমাদের কোডের সাথে যুক্ত করতে, আমরা ধাপ 13-এ আমাদের hardhat.config.js ফাইলে এই ভেরিয়েবলগুলোর রেফারেন্স দেব।

<EnvWarningBanner />

## ধাপ 12: Ethers.js ইনস্টল করুন {#install-ethers}

Ethers.js হলো এমন একটি লাইব্রেরি যা [স্ট্যান্ডার্ড JSON-RPC মেথডগুলোকে](/developers/docs/apis/json-rpc/) আরও ব্যবহারকারী-বান্ধব মেথড দিয়ে র‍্যাপ করে ইথিরিয়াম-এর সাথে ইন্টারঅ্যাক্ট করা এবং রিকোয়েস্ট করা সহজ করে তোলে।

Hardhat অতিরিক্ত টুলিং এবং বর্ধিত কার্যকারিতার জন্য [প্লাগইন](https://hardhat.org/plugins/) ইন্টিগ্রেট করা খুব সহজ করে তোলে। আমরা কন্ট্রাক্ট ডিপ্লয়মেন্টের জন্য [Ethers প্লাগইন](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)-এর সুবিধা নেব ([Ethers.js](https://github.com/ethers-io/ethers.js/)-এ কিছু খুব পরিষ্কার কন্ট্রাক্ট ডিপ্লয়মেন্ট মেথড রয়েছে)।

আপনার প্রজেক্ট ডিরেক্টরিতে টাইপ করুন:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

পরবর্তী ধাপে আমাদের hardhat.config.js-এও ethers-এর প্রয়োজন হবে।

## ধাপ 13: hardhat.config.js আপডেট করুন {#update-hardhat-config}

আমরা এপর্যন্ত বেশ কয়েকটি ডিপেন্ডেন্সি এবং প্লাগইন যোগ করেছি, এখন আমাদের hardhat.config.js আপডেট করতে হবে যাতে আমাদের প্রজেক্ট সেগুলোর সব সম্পর্কে জানতে পারে।

আপনার hardhat.config.js আপডেট করে এইরকম করুন:

```js
    /* *
    * @type import('hardhat/config').HardhatUserConfig */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## ধাপ 14: আমাদের কন্ট্রাক্ট কম্পাইল করুন {#compile-contract}

এপর্যন্ত সবকিছু ঠিকঠাক কাজ করছে কিনা তা নিশ্চিত করতে, চলুন আমাদের কন্ট্রাক্ট কম্পাইল করি। কম্পাইল টাস্কটি বিল্ট-ইন hardhat টাস্কগুলোর মধ্যে একটি।

কমান্ড লাইন থেকে রান করুন:

    npx hardhat compile

আপনি সোর্স ফাইলে SPDX লাইসেন্স আইডেন্টিফায়ার প্রদান না করা সম্পর্কে একটি সতর্কতা পেতে পারেন, তবে এটি নিয়ে চিন্তা করার দরকার নেই — আশা করি অন্য সবকিছু ঠিক আছে! যদি না হয়, তবে আপনি সবসময় [Alchemy discord](https://discord.gg/u72VCg3)-এ মেসেজ করতে পারেন।

## ধাপ 15: আমাদের ডিপ্লয় স্ক্রিপ্ট লিখুন {#write-deploy}

এখন যেহেতু আমাদের কন্ট্রাক্ট লেখা হয়েছে এবং আমাদের কনফিগারেশন ফাইল প্রস্তুত, এখন আমাদের কন্ট্রাক্ট ডিপ্লয় স্ক্রিপ্ট লেখার সময়।

`scripts/` ফোল্ডারে যান এবং `deploy.js` নামে একটি নতুন ফাইল তৈরি করুন, এতে নিচের বিষয়বস্তু যোগ করুন:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // ডিপ্লয়মেন্ট শুরু করুন, যা এমন একটি প্রমিস রিটার্ন করে যা একটি কন্ট্রাক্ট অবজেক্টে রিজলভ হয়
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat তাদের [কন্ট্রাক্ট টিউটোরিয়ালে](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) এই কোডের প্রতিটি লাইন কী করে তা খুব ভালোভাবে ব্যাখ্যা করে, আমরা এখানে তাদের ব্যাখ্যাগুলো গ্রহণ করেছি।

    const MyNFT = await ethers.getContractFactory("MyNFT");

ethers.js-এ একটি ContractFactory হলো নতুন স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে ব্যবহৃত একটি অ্যাবস্ট্রাকশন, তাই এখানে MyNFT হলো আমাদের NFT কন্ট্রাক্ট-এর ইনস্ট্যান্সগুলোর জন্য একটি ফ্যাক্টরি। hardhat-ethers প্লাগইন ব্যবহার করার সময় ContractFactory এবং Contract ইনস্ট্যান্সগুলো ডিফল্টভাবে প্রথম সাইনারের সাথে সংযুক্ত থাকে।

    const myNFT = await MyNFT.deploy();

একটি ContractFactory-তে deploy() কল করলে ডিপ্লয়মেন্ট শুরু হবে এবং একটি Promise রিটার্ন করবে যা একটি Contract-এ রিজলভ হয়। এটি এমন একটি অবজেক্ট যার আমাদের প্রতিটি স্মার্ট কন্ট্রাক্ট ফাংশনের জন্য একটি মেথড রয়েছে।

## ধাপ 16: আমাদের কন্ট্রাক্ট ডিপ্লয় করুন {#deploy-contract}

আমরা অবশেষে আমাদের স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে প্রস্তুত! আপনার প্রজেক্ট ডিরেক্টরির রুটে ফিরে যান এবং কমান্ড লাইনে রান করুন:

    npx hardhat --network sepolia run scripts/deploy.js

এরপর আপনার এইরকম কিছু দেখা উচিত:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

যদি আমরা [Sepolia etherscan](https://sepolia.etherscan.io/)-এ যাই এবং আমাদের কন্ট্রাক্ট এডড্রেস সার্চ করি তবে আমাদের দেখতে পাওয়া উচিত যে এটি সফলভাবে ডিপ্লয় হয়েছে। যদি আপনি এটি সাথে সাথে দেখতে না পান, তবে অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন কারণ এতে কিছুটা সময় লাগতে পারে। লেনদেন-টি এইরকম দেখতে হবে:

![Etherscan-এ আপনার লেনদেন এডড্রেস দেখুন](./etherscan-sepoila-contract-creation.png)

From এডড্রেস-টি আপনার MetaMask একাউন্ট এডড্রেস-এর সাথে মিলতে হবে এবং To এডড্রেস-এ "Contract Creation" লেখা থাকবে। যদি আমরা লেনদেন-এ ক্লিক করি, তবে আমরা To ফিল্ডে আমাদের কন্ট্রাক্ট এডড্রেস দেখতে পাব:

![Etherscan-এ আপনার কন্ট্রাক্ট এডড্রেস দেখুন](./etherscan-sepolia-tx-details.png)

ইয়েস! আপনি এইমাত্র ইথিরিয়াম (টেস্টনেট) চেইনে আপনার NFT স্মার্ট কন্ট্রাক্ট ডিপ্লয় করেছেন!

নেপথ্যে কী ঘটছে তা বুঝতে, চলুন আমাদের [Alchemy dashboard](https://dashboard.alchemyapi.io/explorer)-এর Explorer ট্যাবে যাই। যদি আপনার একাধিক Alchemy অ্যাপ থাকে তবে অ্যাপ অনুযায়ী ফিল্টার করতে ভুলবেন না এবং "MyNFT" নির্বাচন করুন।

![Alchemy-এর Explorer ড্যাশবোর্ডের মাধ্যমে নেপথ্যে করা কলগুলো দেখুন](./alchemy-explorer-goerli.png)

এখানে আপনি বেশ কয়েকটি JSON-RPC কল দেখতে পাবেন যা Hardhat/Ethers আমাদের জন্য নেপথ্যে করেছিল যখন আমরা .deploy() ফাংশনটি কল করেছিলাম। এখানে উল্লেখ করার মতো দুটি গুরুত্বপূর্ণ কল হলো [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), যা মূলত Sepolia চেইনে আমাদের স্মার্ট কন্ট্রাক্ট লেখার রিকোয়েস্ট এবং [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) যা হ্যাস দেওয়া থাকলে আমাদের লেনদেন সম্পর্কে তথ্য পড়ার একটি রিকোয়েস্ট (লেনদেন পাঠানোর সময় একটি সাধারণ প্যাটার্ন)। লেনদেন পাঠানো সম্পর্কে আরও জানতে, [Web3 ব্যবহার করে লেনদেন পাঠানোর](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) উপর এই টিউটোরিয়ালটি দেখুন।

এই টিউটোরিয়ালের পর্ব 1-এর জন্য এটুকুই। [পর্ব 2-এ, আমরা একটি NFT মিন্ট করার মাধ্যমে আমাদের স্মার্ট কন্ট্রাক্ট-এর সাথে ইন্টারঅ্যাক্ট করব](/developers/tutorials/how-to-mint-an-nft/), এবং [পর্ব 3-এ আমরা আপনাকে দেখাব কীভাবে আপনার ইথিরিয়াম ওয়ালেট-এ আপনার NFT দেখতে হয়](/developers/tutorials/how-to-view-nft-in-metamask/)!