---
title: "এলিক্সির ডেভেলপারদের জন্য ইথেরিয়াম"
description: "এলিক্সির-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে কীভাবে ইথেরিয়ামের জন্য ডেভেলপ করা যায় তা জানুন।"
lang: bn
incomplete: false
---

<FeaturedText>এলিক্সির-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে কীভাবে ইথেরিয়ামের জন্য ডেভেলপ করা যায় তা জানুন।</FeaturedText>

ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীভূত অ্যাপ্লিকেশন (বা "ড্যাপস") তৈরি করুন যেগুলো ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলোকে কাজে লাগায়।. এই ডিএ্যাপসগুলো ট্রাস্টলেস হতে পারে, যার মানে হলো একবার এগুলো ইথেরিয়ামে ডেপ্লয় করা হয়ে গেলে, এগুলো সর্বদা প্রোগ্রাম অনুযায়ী চলবে। তারা নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করতে ডিজিটাল অ্যাসেট নিয়ন্ত্রণ করতে পারে। এগুলো বিকেন্দ্রীভূত হতে পারে, যার মানে কোন একক সত্ত্বা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করেনা এবং এগুলো সেন্সর করা প্রায় অসম্ভব।.

## স্মার্ট কন্ট্র্যাক্ট এবং Solidity ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**এলিক্সিরের সাথে ইথেরিয়ামকে একীভূত করার জন্য আপনার প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান ? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্টটি লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য নিবন্ধ {#beginner-articles}

- [অবশেষে ইথেরিয়াম অ্যাকাউন্ট বোঝা](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — এলিক্সিরের জন্য একটি প্রথম-শ্রেণীর ইথেরিয়াম Web3 লাইব্রেরি](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## মধ্যবর্তী স্তরের নিবন্ধ {#intermediate-articles}

- [এলিক্সির দিয়ে কীভাবে র ইথেরিয়াম কন্ট্র্যাক্ট ট্রানজ্যাকশনে সাইন করতে হয়](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [ইথেরিয়াম স্মার্ট কন্ট্র্যাক্ট এবং এলিক্সির](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## এলিক্সির প্রজেক্ট এবং টুলস {#elixir-projects-and-tools}

### সক্রিয় {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _এলিক্সিরে BIP32 এবং BIP44 ইমপ্লিমেন্টেশন (ডিটারমিনিস্টিক ওয়ালেটের জন্য মাল্টি-অ্যাকাউন্ট হায়ারার্কি)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _ইথেরিয়াম ব্লকচেইনের জন্য এলিক্সির JSON-RPC ক্লায়েন্ট_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _এলিক্সির ব্যবহার করে ইথেরিয়ামের স্মার্ট কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি বিস্তৃত Web3 লাইব্রেরি_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers-এর জন্য একটি KMS সাইনার লাইব্রেরি (AWS KMS দিয়ে ট্রানজ্যাকশন সাইন করুন)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _এলিক্সিরে ইথেরিয়াম ABI পার্সার/ডিকোডার/এনকোডার ইমপ্লিমেন্টেশন_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _একটি NIF বিল্ট tiny-keccak রাস্ট ক্রেট ব্যবহার করে Keccak SHA3-256 হ্যাস গণনা করার জন্য এলিক্সির লাইব্রেরি_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _ইথেরিয়ামের RLP (রিকرسیভ লেংথ প্রিফিক্স) এনকোডিংয়ের এলিক্সির ইমপ্লিমেন্টেশন_

### আর্কাইভ করা / আর রক্ষণাবেক্ষণ করা হয় না {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _এলিক্সিরের জন্য ইথেরিয়াম ইউটিলিটি_
- [exw3](https://github.com/hswick/exw3) - _এলিক্সিরের জন্য উচ্চ স্তরের ইথেরিয়াম RPC ক্লায়েন্ট_
- [mana](https://github.com/mana-ethereum/mana) - _এলিক্সিরে লেখা ইথেরিয়াম ফুল নোড ইমপ্লিমেন্টেশন_

আরও সংস্থান খুঁজছেন? আমাদের [ডেভেলপারদের হোম](/developers/) দেখুন।

## এলিক্সির কমিউনিটি কন্ট্রিবিউটর {#elixir-community-contributors}

[এলিক্সিরের স্ল্যাক #ethereum চ্যানেলটি](https://elixir-lang.slack.com/archives/C5RPZ3RJL) একটি দ্রুত বর্ধনশীল কমিউনিটির হোস্ট এবং এটি উপরের যেকোনো প্রজেক্ট এবং সম্পর্কিত বিষয়ে আলোচনার জন্য একটি ডেডিকেটেড রিসোর্স।
