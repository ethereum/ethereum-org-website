---
title: "রাস্ট ডেভেলপারদের জন্য ইথিরিয়াম"
description: "রাস্ট-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন"
lang: bn
incomplete: true
---

<FeaturedText>রাস্ট-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন</FeaturedText>

ক্রিপটোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগিয়ে ডিসেন্ট্রালাইজড এপ্লিকেশন (বা "ডিএ্যাপস") তৈরি করতে ইথিরিয়াম ব্যবহার করুন। এই ডিএ্যাপসগুলো বিশ্বস্ত হতে পারে, যার মানে হলো একবার ইথিরিয়ামে ডেপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম অনুযায়ী চলবে। নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে। এগুলো ডিসেন্ট্রালাইজড হতে পারে, যার মানে হলো কোনো একক সত্তা বা ব্যক্তি এগুলোকে নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব।

## স্মার্ট কন্ট্রাক্ট এবং সলিডিটি (Solidity) ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**ইথিরিয়ামের সাথে রাস্ট (Rust) ইন্টিগ্রেট করার প্রথম পদক্ষেপ নিন**

প্রথমে আরও প্রাথমিক ধারণা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে সলিডিটি (Solidity) কম্পাইল এবং ডেপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য আর্টিকেল {#beginner-articles}

- [দ্য রাস্ট ইথিরিয়াম ক্লায়েন্ট](https://openethereum.github.io/) \* **মনে রাখবেন যে OpenEthereum [বাতিল করা হয়েছে](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) এবং এটি আর রক্ষণাবেক্ষণ করা হচ্ছে না।** এটি সতর্কতার সাথে ব্যবহার করুন এবং অন্য কোনো ক্লায়েন্ট ইমপ্লিমেন্টেশনে চলে যাওয়া ভালো।
- [রাস্ট ব্যবহার করে ইথিরিয়ামে লেনদেন পাঠানো](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [কোভানের (Kovan) জন্য রাস্ট Wasm-এ কীভাবে কন্ট্রাক্ট লিখতে হয় তার ধাপে ধাপে টিউটোরিয়াল](https://github.com/paritytech/pwasm-tutorial)

## মধ্যম স্তরের আর্টিকেল {#intermediate-articles}

## উন্নত ব্যবহারের প্যাটার্ন {#advanced-use-patterns}

- [ইথিরিয়ামের মতো নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করার জন্য pwasm_ethereum এক্সটার্নস লাইব্রেরি](https://github.com/openethereum/pwasm-ethereum)
- [জাভাস্ক্রিপ্ট এবং রাস্ট ব্যবহার করে একটি ডিসেন্ট্রালাইজড চ্যাট তৈরি করুন](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js এবং রাস্ট ব্যবহার করে একটি ডিসেন্ট্রালাইজড টুডু (Todo) অ্যাপ তৈরি করুন](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [রাস্টে একটি ব্লকচেইন তৈরি করুন](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## রাস্ট প্রজেক্ট এবং টুলস {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _ইথিরিয়ামের মতো নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করার জন্য এক্সটার্নসের সংগ্রহ_
- [Lighthouse](https://github.com/sigp/lighthouse) - _দ্রুত ইথিরিয়াম কনসেন্সাস লেয়ার ক্লায়েন্ট_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly-এর একটি ডিটারমিনিস্টিক সাবসেট ব্যবহার করে ইথিরিয়াম স্মার্ট কন্ট্রাক্ট এক্সিকিউশন লেয়ার-এর প্রস্তাবিত রিডিজাইন_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API রেফারেন্স_
- [Solaris](https://github.com/paritytech/sol-rs) - _নেটিভ প্যারিটি ক্লায়েন্ট EVM ব্যবহার করে সলিডিটি স্মার্ট কন্ট্রাক্ট ইউনিট টেস্ট হারনেস।_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _রাস্ট ইথিরিয়াম ভার্চুয়াল মেশিন ইমপ্লিমেন্টেশন_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _রাস্টে ওয়েভলেট (Wavelet) স্মার্ট কন্ট্রাক্ট_
- [Foundry](https://github.com/foundry-rs/foundry) - _ইথিরিয়াম অ্যাপ্লিকেশন ডেভেলপমেন্টের জন্য টুলকিট_
- [Alloy](https://alloy.rs) - _ইথিরিয়াম এবং অন্যান্য EVM-ভিত্তিক চেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য উচ্চ-পারফরম্যান্স, সু-পরীক্ষিত এবং ডকুমেন্টেড লাইব্রেরি।_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _ইথিরিয়াম লাইব্রেরি এবং ওয়ালেট ইমপ্লিমেন্টেশন_
- [SewUp](https://github.com/second-state/SewUp) - _রাস্টের সাহায্যে আপনার ইথিরিয়াম ওয়েবঅ্যাসেম্বলি কন্ট্রাক্ট তৈরি করতে এবং সাধারণ ব্যাকএন্ডের মতো ডেভেলপ করতে সাহায্য করার জন্য একটি লাইব্রেরি_
- [Substreams](https://github.com/streamingfast/substreams) - _প্যারালালাইজড ব্লকচেইন ডেটা ইনডেক্সিং প্রযুক্তি_
- [Reth](https://github.com/paradigmxyz/reth) Reth (রাস্ট ইথিরিয়ামের সংক্ষিপ্ত রূপ) হলো একটি নতুন ইথিরিয়াম ফুল-নোড ইমপ্লিমেন্টেশন
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _রাস্টে লেখা ইথিরিয়াম ইকোসিস্টেমের প্রজেক্টগুলোর একটি কিউরেটেড সংগ্রহ_

আরও রিসোর্স খুঁজছেন? [ethereum.org/developers.](/developers/) দেখুন।

## রাস্ট কমিউনিটি কন্ট্রিবিউটর {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)