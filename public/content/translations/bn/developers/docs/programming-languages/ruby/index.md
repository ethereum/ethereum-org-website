---
title: Ruby ডেভেলপারদের জন্য ইথেরিয়াম
description: Ruby-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন।
lang: bn
incomplete: false
---

<FeaturedText>Ruby-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন।</FeaturedText>

ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগিয়ে বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করতে ইথেরিয়াম ব্যবহার করুন। এই dapp-গুলো আস্থা-নিরপেক্ষ হতে পারে, যার মানে হলো একবার ইথেরিয়ামে ডিপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম করা নিয়ম অনুযায়ী চলবে। এগুলো ডিজিটাল সম্পদ নিয়ন্ত্রণ করে নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করতে পারে। এগুলো বিকেন্দ্রীকৃত হতে পারে, যার মানে হলো কোনো একক সত্তা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব।

## স্মার্ট কন্ট্রাক্ট এবং Solidity ল্যাঙ্গুয়েজ দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**ইথেরিয়ামের সাথে Ruby ইন্টিগ্রেট করার প্রথম ধাপগুলো নিন**

প্রথমে আরও প্রাথমিক ধারণা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য আর্টিকেল {#beginner-articles}

- [অবশেষে ইথেরিয়াম অ্যাকাউন্টগুলো বোঝা](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [অবশেষে মেটামাস্ক দিয়ে Rails ব্যবহারকারীদের প্রমাণীকরণ করা](https://dev.to/q9/finally-authenticating-rails-users-with-metamask-3fj)
- [Ruby ব্যবহার করে কীভাবে ইথেরিয়াম নেটওয়ার্কের সাথে কানেক্ট করবেন](https://www.quicknode.com/guides/web3-sdks/how-to-connect-to-the-ethereum-network-using-ruby)
- [Ruby-তে কীভাবে একটি নতুন ইথেরিয়াম ঠিকানা তৈরি করবেন](https://www.quicknode.com/guides/web3-sdks/how-to-generate-a-new-ethereum-address-in-ruby)

## মধ্যম স্তরের আর্টিকেল {#intermediate-articles}

- [Ruby দিয়ে ব্লকচেইন অ্যাপ](https://www.nopio.com/blog/blockchain-app-ruby/)
- [স্মার্ট কন্ট্রাক্ট এক্সিকিউট করতে ইথেরিয়ামের সাথে কানেক্ট করা Ruby ব্যবহার করুন](https://titanwolf.org/Network/Articles/Article?AID=87285822-9b25-49d5-ba2a-7ad95fff7ef9)

## Ruby প্রজেক্ট এবং টুল {#ruby-projects-and-tools}

### সক্রিয় {#active}

- [eth.rb](https://github.com/q9f/eth.rb) - _ইথেরিয়াম অ্যাকাউন্ট, মেসেজ এবং ট্রানজ্যাকশন পরিচালনা করার জন্য Ruby লাইব্রেরি এবং RPC-ক্লায়েন্ট_
- [keccak.rb](https://github.com/q9f/keccak.rb) - _ইথেরিয়াম দ্বারা ব্যবহৃত Keccak (SHA3) হ্যাশ_
- [siwe-ruby](https://github.com/signinwithethereum/siwe-ruby) - _Sign-In with Ethereum-এর Ruby ইমপ্লিমেন্টেশন_
- [siwe-rails](https://github.com/signinwithethereum/siwe-rails) - _Rails জেম যা SIWE লোকাল সাইন-ইন রাউট যোগ করে_
- [siwe-rails-examples](https://github.com/signinwithethereum/siwe-rails-examples) - _কাস্টম কন্ট্রোলারসহ Ruby on Rails ব্যবহার করে SIWE-এর উদাহরণ_
- [omniauth-siwe](https://github.com/signinwithethereum/omniauth-siwe) - _Sign In With Ethereum (SIWE)-এর জন্য OmniAuth কৌশল_
- [omniauth-nft](https://github.com/valthon/omniauth-nft) - _NFT মালিকানার মাধ্যমে প্রমাণীকরণের জন্য OmniAuth কৌশল_
- [ethereum-on-rails](https://github.com/q9f/ethereum-on-rails) - _Ethereum on Rails টেমপ্লেট যা মেটামাস্ক-কে Ruby on Rails-এর সাথে কানেক্ট করতে দেয়_

### আর্কাইভ করা / আর রক্ষণাবেক্ষণ করা হয় না {#archived--no-longer-maintained}

- [web3-eth](https://github.com/spikewilliams/vtada-ethereum) - _Ruby দিয়ে ইথেরিয়াম নোড-এর RPC মেথড কল করা_
- [ethereum_tree](https://github.com/longhoangwkm/ethereum_tree) - _BIP32 স্ট্যান্ডার্ড অনুযায়ী একটি হায়ারার্কিক্যাল ডিটারমিনিস্টিক ওয়ালেট থেকে ETH ঠিকানা তৈরি করার জন্য Ruby লাইব্রেরি_
- [etherlite](https://github.com/budacom/etherlite) - _Ruby on Rails-এর জন্য ইথেরিয়াম ইন্টিগ্রেশন_
- [ethereum.rb](https://github.com/EthWorks/ethereum.rb) - _ট্রানজ্যাকশন পাঠানো, কন্ট্রাক্ট তৈরি করা এবং এর সাথে ইন্টারঅ্যাক্ট করার জন্য জেসন-আরপিসি ইন্টারফেস ব্যবহার করা Ruby ইথেরিয়াম ক্লায়েন্ট, সেইসাথে ইথেরিয়াম নোড-এর সাথে কাজ করার জন্য দরকারী টুলকিট_
- [omniauth-ethereum.rb](https://github.com/q9f/omniauth-ethereum.rb) - _OmniAuth-এর জন্য ইথেরিয়াম প্রোভাইডার কৌশল ইমপ্লিমেন্ট করে_

আরও রিসোর্স খুঁজছেন? [আমাদের ডেভেলপার হোম](/developers/) দেখুন।

## Ruby কমিউনিটি কন্ট্রিবিউটর {#ruby-community-contributors}

[Ethereum Ruby টেলিগ্রাম গ্রুপ](https://t.me/ruby_eth) হলো একটি দ্রুত বর্ধনশীল কমিউনিটির হোস্ট এবং এটি উপরের যেকোনো প্রজেক্ট এবং সম্পর্কিত বিষয় নিয়ে আলোচনার জন্য একটি ডেডিকেটেড রিসোর্স।