---
title: রাস্ট ডেভেলপারদের জন্য ইথেরিয়াম
description: শিখুন কীভাবে রাস্ট-ভিত্তিক প্রজেক্ট ও টুল ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়
lang: bn
sidebar: true
---

# রাস্ট ডেভেলপারদের জন্য ইথেরিয়াম {#ethereum-for-rust-devs}

<div class="featured">শিখুন কীভাবে রাস্ট-ভিত্তিক প্রজেক্ট ও টুল ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়</div><br/>

ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীভূত অ্যাপ্লিকেশন (বা "ড্যাপস") তৈরি করুন যেগুলো ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলোকে কাজে লাগায়। এই ড্যাপগুলো বিশ্বাসযোগ্য হতে পারে, অর্থাৎ এগুলোকে একবার ইথেরিয়ামে প্রয়োগ করা হয়ে গেলে, এগুলো সবসময় প্রোগ্রামড হিসেবে চলতে থাকবে। নতুন ধরণের আর্থিক অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদকে নিয়ন্ত্রণ করতে পারে। এগুলো বিকেন্দ্রীভূত হতে পারে, যার মানে কোনো একক সত্ত্বা বা ব্যক্তি এগুলোকে নিয়ন্ত্রণ করে না এবং এগুলোকে সেন্সর করা প্রায় অসম্ভব।

## স্মার্ট কন্ট্র্যাক্টস এবং সলিডিটি ল্যাঙ্গুয়েজ দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**রাস্ট-এর সাথে ইথেরিয়ামকে একীভূত করার জন্য প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান ? [ethereum.org/learn](/bn/learn/) বা [ethereum.org/developers](/bn/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্টস সম্বন্ধে বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [নিজের প্রথম স্মার্ট কন্ট্র্যাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [শিখুন কীভাবে সলিডিটি কম্পাইল ও ডেপ্লয় করতে হয়](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## শিক্ষানবিসদের জন্য প্রবন্ধ {#beginner-articles}

- [একটি ইথেরিয়াম ক্লায়েন্ট বেছে নেওয়া](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [রাস্ট ইথেরিয়াম ক্লায়েন্ট](https://wiki.parity.io/Setup)
- [রাস্ট ব্যবহার করে ইথেরিয়ামে লেনদেন পাঠানো](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [প্যারিটি ইথেরিয়াম ক্লায়েন্টের সাথে স্মার্ট কন্ট্র্যাক্টের একটি ভূমিকা](https://wiki.parity.io/Smart-Contracts)
- [আপনার ওয়েসিস SDK ডেভ এনভায়রনমেন্ট সেট আপ করা](https://docs.oasis.dev/oasis-sdk/guide/getting-started)
- [কোভান-এর জন্য রাস্ট Wasm-এ কীভাবে কন্ট্র্যাক্ট লিখতে হয় তার একটি ধাপে ধাপে নির্দেশিকা](https://github.com/paritytech/pwasm-tutorial)

## মধ্যবর্তী পর্যায়ের প্রবন্ধ {#intermediate-articles}

- [রাস্ট-ওয়েব3 ডকুমেন্টেশন](https://tomusdrw.github.io/rust-web3/web3/index.html)
- [রাস্ট-ওয়েব3 কাজের উদাহরণ](https://github.com/tomusdrw/rust-web3/blob/master/examples)

## উন্নত ইউজ প্যাটার্ন {#advanced-use-patterns}

- [pwasm_ethereum externs লাইব্রেরি ইথেরিয়াম-সদৃশ নেটওয়ার্কের সঙ্গে ইন্টারেক্ট করবে](https://github.com/openethereum/pwasm-ethereum)
- [জাভাস্ক্রিপ্ট ও রাস্ট ব্যবহার করে একটি বিকেন্দ্রীভূত চ্যাট তৈরি করা](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js & রাস্ট ব্যবহার করে একটি বিকেন্দ্রীভূত Todo অ্যাপ তৈরি করা ](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)
- [এনিগমা দিয়ে শুরু করা- রাস্ট প্রোগ্রামিং ল্যাঙ্গুয়েজে](https://blog.enigma.co/getting-started-with-discovery-the-rust-programming-language-4d1e0b06de15)
- [গোপন কন্ট্র্যাক্টের একটি ভূমিকা](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [ওয়েসিস-এ সলিডিটি কন্ট্র্যাক্ট ডেপ্লয় করা (কম্পাউন্ড)](https://docs.oasis.dev/tutorials/deploy-solidity.html#deploy-using-truffle)

## রাস্ট প্রোজেক্ট ও টুল {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _ইথেরিয়াম-সদৃশ নেটওয়ার্কের সঙ্গে ইন্টারেক্ট করার জন্য এক্সটার্নগুলির সংগ্রহ_
- [ইথেরিয়াম ওয়েবঅ্যাসেমব্লি](https://ewasm.readthedocs.io/en/mkdocs/)
- [oasis_std](https://docs.rs/oasis-std/0.2.7/oasis_std/) - _OASIS API রেফারেন্স_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _ইথেরিয়াম-এর সাথে সম্পর্কিত কোডবেসগুলির সঙ্গে কাজ করার জন্য ইউটিলিটি ফাংশন_
- [সোলারিস](https://github.com/paritytech/sol-rs)
- [SputnikVM](https://github.com/sorpaas/rust-evm) - _রাস্ট ইথেরিয়াম ভার্চুয়াল মেশিন বাস্তবায়ন_
- [প্যারিটি](https://github.com/paritytech/parity-ethereum) - _ইথারিয়াম রাস্ট ক্লায়েন্ট_
- [rust-web3](https://github.com/tomusdrw/rust-web3) - _Web3.js লাইব্রেরির রাস্ট সম্পাদন_
- [ওয়েভলেট](https://wavelet.perlin.net/docs/smart-contracts) - _রাস্ট-এ ওয়েভলেট স্মার্ট কন্ট্র্যাক্ট_

আরও সংস্থান খুঁজছেন? [ethereum.org/developers](/bn/developers/) দেখুন।

## রাস্ট কমিউনিটিতে অবদান প্রদানকারী {#rust-community-contributors}

- [ইথেরিয়াম ওয়েবঅ্যাসেমব্লি](https://gitter.im/ewasm/Lobby)
- [ওয়েসিস গিটার](https://gitter.im/Oasis-official/Lobby)
- [প্যারিটি গিটার](https://gitter.im/paritytech/parity)
- [এনিগমা](https://discord.gg/SJK32GY)
