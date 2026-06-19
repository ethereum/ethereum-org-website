---
title: Java ডেভেলপারদের জন্য ইথেরিয়াম
description: Java-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন
lang: bn
incomplete: true
---

<FeaturedText>Java-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন</FeaturedText>

ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগিয়ে বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করতে ইথেরিয়াম ব্যবহার করুন। এই ড্যাপগুলো (dapps) নির্ভরযোগ্য হতে পারে, যার মানে হলো একবার ইথেরিয়ামে ডিপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম করা নিয়ম অনুযায়ী চলবে। নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করতে এগুলো ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে। এগুলো বিকেন্দ্রীকৃত হতে পারে, যার মানে হলো কোনো একক সত্তা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব।

## স্মার্ট কন্ট্রাক্ট এবং Solidity ল্যাঙ্গুয়েজ দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**ইথেরিয়ামের সাথে Java ইন্টিগ্রেট করার প্রথম পদক্ষেপ নিন**

প্রথমে আরও প্রাথমিক নির্দেশিকা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers.](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ইথেরিয়াম ক্লায়েন্ট নিয়ে কাজ করা {#working-with-ethereum-clients}

দুটি শীর্ষস্থানীয় Java ইথেরিয়াম ক্লায়েন্ট, [Web3j](https://github.com/web3j/web3j) এবং Hyperledger বেসু কীভাবে ব্যবহার করতে হয় তা শিখুন

- [Java, Eclipse এবং Web3j এর মাধ্যমে একটি ইথেরিয়াম ক্লায়েন্টের সাথে কানেক্ট করা](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Java এবং Web3j এর মাধ্যমে একটি ইথেরিয়াম অ্যাকাউন্ট পরিচালনা করা](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [আপনার স্মার্ট কন্ট্রাক্ট থেকে একটি Java র‍্যাপার (Wrapper) তৈরি করা](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [একটি ইথেরিয়াম স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [ইথেরিয়াম স্মার্ট কন্ট্রাক্ট ইভেন্ট শোনা (Listening)](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linux এর সাথে Java ইথেরিয়াম ক্লায়েন্ট বেসু (Pantheon) ব্যবহার করা](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java ইন্টিগ্রেশন টেস্টে একটি Hyperledger বেসু (Pantheon) নোড চালানো](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j চিট শিট](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

EVM-ভিত্তিক ব্লকচেইনগুলোর সাথে ইন্টারঅ্যাক্ট করার জন্য একটি অ্যাসিঙ্ক (async), হাই-পারফরম্যান্স Kotlin লাইব্রেরি [ethers-kt](https://github.com/Kr1ptal/ethers-kt) কীভাবে ব্যবহার করতে হয় তা শিখুন। এটি JVM এবং Android প্ল্যাটফর্মগুলোকে টার্গেট করে।
- [ERC-20 টোকেন হস্তান্তর](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [ইভেন্ট লিসেনিংয়ের সাথে UniswapV2 সোয়াপ](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC-20 ব্যালেন্স ট্র্যাকার](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## ইন্টারমিডিয়েট আর্টিকেল {#intermediate-articles}

- [IPFS এর মাধ্যমে একটি Java অ্যাপ্লিকেশনে স্টোরেজ পরিচালনা করা](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j এর মাধ্যমে Java-তে ERC-20 টোকেন পরিচালনা করা](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j ট্রানজ্যাকশন ম্যানেজার](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## অ্যাডভান্সড ব্যবহারের ধরন {#advanced-use-patterns}

- [একটি Java স্মার্ট কন্ট্রাক্ট ডেটা ক্যাশ তৈরি করতে Eventeum ব্যবহার করা](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java প্রজেক্ট এবং টুল {#java-projects-and-tools}

- [Web3j (ইথেরিয়াম ক্লায়েন্টগুলোর সাথে ইন্টারঅ্যাক্ট করার লাইব্রেরি)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-ভিত্তিক ব্লকচেইনগুলোর জন্য অ্যাসিঙ্ক, হাই-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (ইভেন্ট লিসেনার)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS ডেভ টুল)](https://github.com/ConsenSys/mahuta)

আরও রিসোর্স খুঁজছেন? [ethereum.org/developers.](/developers/) দেখুন।

## Java কমিউনিটি কন্ট্রিবিউটর {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)