---
title: রাস্ট ডেভেলপারদের জন্য ইথেরিয়াম
description: শিখুন কীভাবে রাস্ট-ভিত্তিক প্রজেক্ট ও টুল ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়
lang: bn
incomplete: true
---

<FeaturedText>রাস্ট-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন</FeaturedText>

ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীভূত অ্যাপ্লিকেশন (বা "ড্যাপস") তৈরি করুন যেগুলো ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলোকে কাজে লাগায়।. এই ড্যাপগুলো বিশ্বাসযোগ্য হতে পারে, অর্থাৎ এগুলোকে একবার ইথেরিয়ামে প্রয়োগ করা হয়ে গেলে, এগুলো সবসময় প্রোগ্রামড হিসেবে চলতে থাকবে।. নতুন ধরণের আর্থিক অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদকে নিয়ন্ত্রণ করতে পারে।. এগুলো বিকেন্দ্রীভূত হতে পারে, যার মানে কোন একক সত্ত্বা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করেনা এবং এগুলো সেন্সর করা প্রায় অসম্ভব।.

## স্মার্ট কন্ট্র্যাক্ট এবং Solidity ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**রাস্ট-এর সাথে ইথেরিয়ামকে একীভূত করার জন্য প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান ? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্টটি লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য নিবন্ধ {#beginner-articles}

- [The Rust Ethereum Client](https://openethereum.github.io/) \* **দ্রষ্টব্য যে OpenEthereum [ডেপ্রিকেটেড হয়ে গেছে](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) এবং এটি আর রক্ষণাবেক্ষণ করা হচ্ছে না।** এটি সতর্কতার সাথে ব্যবহার করুন এবং অন্য কোনো ক্লায়েন্ট ইমপ্লিমেন্টেশনে স্যুইচ করা শ্রেয়।
- [রাস্ট ব্যবহার করে ইথেরিয়ামে লেনদেন পাঠানো](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [কোভান-এর জন্য রাস্ট Wasm-এ কীভাবে কন্ট্র্যাক্ট লিখতে হয় তার একটি ধাপে ধাপে নির্দেশিকা](https://github.com/paritytech/pwasm-tutorial)

## মধ্যবর্তী স্তরের নিবন্ধ {#intermediate-articles}

## উন্নত ব্যবহারের প্যাটার্ন {#advanced-use-patterns}

- [ইথেরিয়ামের মতো নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করার জন্য pwasm_ethereum externs লাইব্রেরি](https://github.com/openethereum/pwasm-ethereum)

- [জাভাস্ক্রিপ্ট এবং রাস্ট ব্যবহার করে একটি ডিসেন্ট্রালাইজড চ্যাট তৈরি করুন](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Vue.js এবং রাস্ট ব্যবহার করে একটি ডিসেন্ট্রালাইজড টুডু অ্যাপ তৈরি করুন](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [রাস্ট-এ একটি ব্লকচেইন তৈরি করুন](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## রাস্ট প্রজেক্ট এবং টুলস {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _ইথেরিয়ামের মতো নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করার জন্য externs-এর সংগ্রহ_
- [Lighthouse](https://github.com/sigp/lighthouse) - _দ্রুত ইথেরিয়াম কনসেন্সাস লেয়ার ক্লায়েন্ট_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _WebAssembly-এর একটি ডিটারমিনিস্টিক সাবসেট ব্যবহার করে ইথেরিয়াম স্মার্ট কন্ট্র্যাক্ট এক্সিকিউশন লেয়ারের প্রস্তাবিত পুনঃনকশা_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _OASIS API রেফারেন্স_
- [Solaris](https://github.com/paritytech/sol-rs) - _নেটিভ প্যারিটি ক্লায়েন্ট EVM ব্যবহার করে সলিডিটি স্মার্ট কন্ট্র্যাক্টের ইউনিট টেস্ট হারনেস।_
- [SputnikVM](https://github.com/rust-blockchain/evm) - _রাস্ট ইথেরিয়াম ভার্চুয়াল মেশিন ইমপ্লিমেন্টেশন_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _রাস্ট-এ ওয়েভলেট স্মার্ট কন্ট্র্যাক্ট_
- [Foundry](https://github.com/foundry-rs/foundry) - _ইথেরিয়াম অ্যাপ্লিকেশন ডেভেলপমেন্টের জন্য টুলকিট_
- [Alloy](https://alloy.rs) - _ইথেরিয়াম এবং অন্যান্য EVM-ভিত্তিক চেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য উচ্চ-পারফরম্যান্স, সু-পরীক্ষিত ও ডকুমেন্টেড লাইব্রেরি।_
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _ইথেরিয়াম লাইব্রেরি এবং ওয়ালেট ইমপ্লিমেন্টেশন_
- [SewUp](https://github.com/second-state/SewUp) - _একটি লাইব্রেরি যা আপনাকে রাস্টের সাহায্যে আপনার ইথেরিয়াম ওয়েব অ্যাসেম্বলি চুক্তি তৈরি করতে সাহায্য করে এবং এটি একটি সাধারণ ব্যাকএন্ডে ডেভেলপ করার মতোই_
- [Substreams](https://github.com/streamingfast/substreams) - _সমান্তরাল ব্লকচেইন ডেটা ইন্ডেক্সিং প্রযুক্তি_
- [Reth](https://github.com/paradigmxyz/reth) Reth (রাস্ট ইথেরিয়ামের সংক্ষিপ্ত রূপ) একটি নতুন ইথেরিয়াম ফুল-নোড ইমপ্লিমেন্টেশন
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _ইথেরিয়াম ইকোসিস্টেমে রাস্ট-এ লেখা প্রজেক্টগুলির একটি কিউরেটেড সংগ্রহ_

আরও সংস্থান খুঁজছেন? [ethereum.org/developers.](/developers/) দেখুন।

## রাস্ট কমিউনিটি অবদানকারী {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
