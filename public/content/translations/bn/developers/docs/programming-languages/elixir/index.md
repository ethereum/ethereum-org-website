---
title: "এলিক্সির (Elixir) ডেভেলপারদের জন্য ইথিরিয়াম"
description: "এলিক্সির-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন।"
lang: bn
incomplete: false
---

<FeaturedText>এলিক্সির-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন।</FeaturedText>

ক্রিপটোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগিয়ে ডিসেন্ট্রালাইজড এপ্লিকেশন (বা "ডিএ্যাপস") তৈরি করতে ইথিরিয়াম ব্যবহার করুন। এই ডিএ্যাপসগুলো ট্রাস্টলেস হতে পারে, যার মানে হলো একবার ইথিরিয়ামে ডেপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম করা অনুযায়ী চলবে। নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করতে এগুলো ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে। এগুলো ডিসেন্ট্রালাইজড হতে পারে, যার মানে হলো কোনো একক সত্তা বা ব্যক্তি এগুলোকে নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব।

## স্মার্ট কন্ট্রাক্ট এবং সলিডিটি (Solidity) ভাষার সাথে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**ইথিরিয়ামের সাথে এলিক্সিরকে ইন্টিগ্রেট করার জন্য আপনার প্রথম পদক্ষেপ নিন**

প্রথমে আরও প্রাথমিক ধারণা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে সলিডিটি কম্পাইল এবং ডেপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য আর্টিকেল {#beginner-articles}

- [অবশেষে ইথিরিয়াম একাউন্ট বোঝা](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — এলিক্সিরের জন্য একটি ফার্স্ট-ক্লাস ইথিরিয়াম ওয়েব3 (Web3) লাইব্রেরি](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## ইন্টারমিডিয়েট আর্টিকেল {#intermediate-articles}

- [কীভাবে এলিক্সির দিয়ে র (raw) ইথিরিয়াম কন্ট্রাক্ট লেনদেন সাইন করবেন](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [ইথিরিয়াম স্মার্ট কন্ট্রাক্ট এবং এলিক্সির](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## এলিক্সির প্রজেক্ট এবং টুলস {#elixir-projects-and-tools}

### সক্রিয় {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _এলিক্সিরে BIP32 এবং BIP44 ইমপ্লিমেন্টেশন (ডিটারমিনিস্টিক ওয়ালেট-এর জন্য মাল্টি-একাউন্ট হায়ারার্কি)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _ইথিরিয়াম ব্লকচেইন-এর জন্য এলিক্সির JSON-RPC ক্লায়েন্ট_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _এলিক্সির ব্যবহার করে ইথিরিয়ামে স্মার্ট কন্ট্রাক্ট-এর সাথে ইন্টারঅ্যাক্ট করার জন্য একটি বিস্তৃত ওয়েব3 (Web3) লাইব্রেরি_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers-এর জন্য একটি KMS সাইনার লাইব্রেরি (AWS KMS দিয়ে লেনদেন সাইন করুন)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _এলিক্সিরে ইথিরিয়াম ABI পার্সার/ডিকোডার/এনকোডার ইমপ্লিমেন্টেশন_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _NIF বিল্ট tiny-keccak Rust ক্রেট ব্যবহার করে Keccak SHA3-256 হ্যাস কম্পিউট করার জন্য এলিক্সির লাইব্রেরি_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _ইথিরিয়ামের RLP (Recursive Length Prefix) এনকোডিং-এর এলিক্সির ইমপ্লিমেন্টেশন_

### আর্কাইভ করা / আর রক্ষণাবেক্ষণ করা হয় না {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _এলিক্সিরের জন্য ইথিরিয়াম ইউটিলিটি_
- [exw3](https://github.com/hswick/exw3) - _এলিক্সিরের জন্য হাই লেভেল ইথিরিয়াম RPC ক্লায়েন্ট_
- [mana](https://github.com/mana-ethereum/mana) - _এলিক্সিরে লেখা ইথিরিয়াম ফুল নোড ইমপ্লিমেন্টেশন_

আরও রিসোর্স খুঁজছেন? [আমাদের ডেভেলপারদের হোমপেজ](/developers/) দেখুন।

## এলিক্সির কমিউনিটি কন্ট্রিবিউটর {#elixir-community-contributors}

[এলিক্সিরের স্ল্যাক #ethereum চ্যানেল](https://elixir-lang.slack.com/archives/C5RPZ3RJL) হলো একটি দ্রুত বর্ধনশীল কমিউনিটির হোস্ট এবং এটি উপরের যেকোনো প্রজেক্ট এবং সম্পর্কিত বিষয় নিয়ে আলোচনার জন্য একটি ডেডিকেটেড রিসোর্স।