---
title: "জাভা ডেভেলপারদের জন্য ইথেরিয়াম"
description: "শিখুন কীভাবে জাভা-ভিত্তিক প্রজেক্ট ও টুল ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়"
lang: bn
incomplete: true
---

<FeaturedText>জাভা-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে Ethereum-এর জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন</FeaturedText>

ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীভূত অ্যাপ্লিকেশন (বা "ড্যাপস") তৈরি করুন যেগুলো ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলোকে কাজে লাগায়।. এই ড্যাপগুলো বিশ্বাসযোগ্য হতে পারে, অর্থাৎ এগুলোকে একবার ইথেরিয়ামে প্রয়োগ করা হয়ে গেলে, এগুলো সবসময় প্রোগ্রামড হিসেবে চলতে থাকবে।. নতুন ধরণের আর্থিক অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদকে নিয়ন্ত্রণ করতে পারে।. এগুলো বিকেন্দ্রীভূত হতে পারে, যার মানে কোন একক সত্ত্বা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করেনা এবং এগুলো সেন্সর করা প্রায় অসম্ভব।.

## স্মার্ট কন্ট্র্যাক্ট এবং Solidity ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**জাভার সাথে ইথেরিয়ামকে একীভূত করার জন্য প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান? [ethereum.org/learn](/learn/) অথবা [ethereum.org/developers.](/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্টটি লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## ইথেরিয়াম ক্লায়েন্টদের সাথে কাজ করা {#working-with-ethereum-clients}

দুটি নেতৃস্থানীয় Java Ethereum ক্লায়েন্ট, [Web3J](https://github.com/web3j/web3j) এবং Hyperledger Besu কীভাবে ব্যবহার করতে হয় তা শিখুন

- [Java, Eclipse, এবং Web3J-এর সাথে একটি Ethereum ক্লায়েন্টের সাথে সংযোগ স্থাপন করা](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Java এবং Web3j দিয়ে একটি Ethereum অ্যাকাউন্ট পরিচালনা করা](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [আপনার স্মার্ট কন্ট্র্যাক্ট থেকে একটি Java র‍্যাপার তৈরি করুন](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [একটি Ethereum স্মার্ট কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করা](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Ethereum স্মার্ট কন্ট্র্যাক্ট ইভেন্টগুলির জন্য শোনা](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linux-এর সাথে Java Ethereum ক্লায়েন্ট Besu (Pantheon) ব্যবহার করা](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java ইন্টিগ্রেশন টেস্টে একটি Hyperledger Besu (Pantheon) নোড চালানো](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j চিট শিট](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

[ethers-kt](https://github.com/Kr1ptal/ethers-kt) কীভাবে ব্যবহার করতে হয় তা শিখুন, এটি EVM-ভিত্তিক ব্লকচেইনগুলির সাথে ইন্টারঅ্যাক্ট করার জন্য একটি অ্যাসিঙ্ক, উচ্চ-পারফরম্যান্সের Kotlin লাইব্রেরি। JVM এবং Android প্ল্যাটফর্মকে লক্ষ্য করা হয়েছে।

- [ERC20 টোকেন ট্রান্সফার](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [ইভেন্ট লিসেনিং সহ UniswapV2 সোয়াপ](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC20 ব্যালেন্স ট্র্যাকার](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## মধ্যবর্তী স্তরের নিবন্ধ {#intermediate-articles}

- [IPFS সহ একটি Java অ্যাপ্লিকেশনে সংগ্রহস্থল পরিচালনা করা](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j সহ Java-তে ERC20 টোকেন পরিচালনা করা](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j ট্রানজ্যাকশন ম্যানেজার](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## উন্নত ব্যবহারের প্যাটার্ন {#advanced-use-patterns}

- [একটি Java স্মার্ট কন্ট্র্যাক্ট ডেটা ক্যাশে তৈরি করতে Eventeum ব্যবহার করা](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java প্রজেক্ট এবং টুলস {#java-projects-and-tools}

- [Web3J (Ethereum ক্লায়েন্টদের সাথে ইন্টারঅ্যাক্ট করার জন্য লাইব্রেরি)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-ভিত্তিক ব্লকচেইনের জন্য অ্যাসিঙ্ক, উচ্চ-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (ইভেন্ট লিসেনার)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS ডেভ টুলস)](https://github.com/ConsenSys/mahuta)

আরও সংস্থান খুঁজছেন? [ethereum.org/developers.](/developers/) দেখুন।

## Java কমিউনিটির অবদানকারীরা {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
