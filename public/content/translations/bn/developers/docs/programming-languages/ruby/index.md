---
title: "রুবি ডেভেলপারদের জন্য ইথেরিয়াম"
description: "রুবি-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে কীভাবে ইথেরিয়ামের জন্য ডেভেলপ করতে হয় তা শিখুন।"
lang: bn
incomplete: false
---

<FeaturedText>রুবি-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে কীভাবে ইথেরিয়ামের জন্য ডেভেলপ করতে হয় তা শিখুন।</FeaturedText>

ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীভূত অ্যাপ্লিকেশন (বা "ড্যাপস") তৈরি করুন যেগুলো ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলোকে কাজে লাগায়।. এই ডিএ্যাপসগুলো ট্রাস্টলেস হতে পারে, যার মানে হলো একবার এগুলো ইথেরিয়ামে ডেপ্লয় করা হয়ে গেলে, এগুলো সর্বদা প্রোগ্রাম অনুযায়ী চলবে। তারা নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করতে ডিজিটাল অ্যাসেট নিয়ন্ত্রণ করতে পারে। এগুলো বিকেন্দ্রীভূত হতে পারে, যার মানে কোন একক সত্ত্বা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করেনা এবং এগুলো সেন্সর করা প্রায় অসম্ভব।.

## স্মার্ট কন্ট্র্যাক্ট এবং Solidity ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**রুবি-এর সাথে ইথেরিয়ামকে একীভূত করার জন্য প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্টটি লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য নিবন্ধ {#beginner-articles}

- [অবশেষে ইথেরিয়াম অ্যাকাউন্ট বোঝা](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [অবশেষে MetaMask-এর সাথে Rails ব্যবহারকারীদের প্রমাণীকরণ](https://dev.to/q9/finally-authenticating-rails-users-with-metamask-3fj)
- [রুবি ব্যবহার করে কীভাবে ইথেরিয়াম নেটওয়ার্কের সাথে সংযোগ স্থাপন করবেন](https://www.quicknode.com/guides/web3-sdks/how-to-connect-to-the-ethereum-network-using-ruby)
- [রুবি-তে কীভাবে একটি নতুন ইথেরিয়াম অ্যাড্রেস তৈরি করবেন](https://www.quicknode.com/guides/web3-sdks/how-to-generate-a-new-ethereum-address-in-ruby)

## মধ্যবর্তী স্তরের নিবন্ধ {#intermediate-articles}

- [রুবি সহ ব্লকচেইন অ্যাপ](https://www.nopio.com/blog/blockchain-app-ruby/)
- [স্মার্ট কন্ট্র্যাক্ট এক্সিকিউট করতে ইথেরিয়ামের সাথে সংযুক্ত রুবি ব্যবহার করুন](https://titanwolf.org/Network/Articles/Article?AID=87285822-9b25-49d5-ba2a-7ad95fff7ef9)

## রুবি প্রজেক্ট এবং টুলস {#ruby-projects-and-tools}

### সক্রিয় {#active}

- [eth.rb](https://github.com/q9f/eth.rb) - _ইথেরিয়াম অ্যাকাউন্ট, মেসেজ এবং ট্রানজ্যাকশন পরিচালনা করার জন্য রুবি লাইব্রেরি এবং RPC-ক্লায়েন্ট_
- [keccak.rb](https://github.com/q9f/keccak.rb) - _ইথেরিয়াম দ্বারা ব্যবহৃত Keccak (SHA3) হ্যাস_
- [siwe-ruby](https://github.com/signinwithethereum/siwe-ruby) - _Sign-In with Ethereum-এর রুবি ইমপ্লিমেন্টেশন_
- [siwe-rails](https://github.com/signinwithethereum/siwe-rails) - _রেলস জেম যা SIWE লোকাল সাইন ইন রুট যোগ করে_
- [siwe-rails-examples](https://github.com/signinwithethereum/siwe-rails-examples) - _কাস্টম কন্ট্রোলারের সাথে রুবি অন রেলস ব্যবহার করে SIWE-এর উদাহরণ_
- [omniauth-siwe](https://github.com/signinwithethereum/omniauth-siwe) - _সাইন ইন উইথ ইথেরিয়াম (SIWE)-এর জন্য OmniAuth কৌশল_
- [omniauth-nft](https://github.com/valthon/omniauth-nft) - _NFT মালিকানার মাধ্যমে প্রমাণীকরণের জন্য OmniAuth কৌশল_
- [ethereum-on-rails](https://github.com/q9f/ethereum-on-rails) - _ইথেরিয়াম অন রেলস টেমপ্লেট যা রুবি অন রেলস-এর সাথে MetaMask সংযোগ করার অনুমতি দেয়_

### আর্কাইভ করা / আর রক্ষণাবেক্ষণ করা হয় না {#archived--no-longer-maintained}

- [web3-eth](https://github.com/spikewilliams/vtada-ethereum) - _রুবি সহ ইথেরিয়াম নোডের RPC মেথড কল করা_
- [ethereum_tree](https://github.com/longhoangwkm/ethereum_tree) - _BIP32 স্ট্যান্ডার্ড অনুসারে একটি হায়ারারকিকাল ডিটারমিনিস্টিক ওয়ালেট থেকে ETH অ্যাড্রেস তৈরি করার জন্য রুবি লাইব্রেরি_
- [etherlite](https://github.com/budacom/etherlite) - _রুবি অন রেলসের জন্য ইথেরিয়াম ইন্টিগ্রেশন_
- [ethereum.rb](https://github.com/EthWorks/ethereum.rb) - _ট্রানজ্যাকশন পাঠানো, কন্ট্র্যাক্ট তৈরি এবং তার সাথে ইন্টারঅ্যাক্ট করার জন্য JSON-RPC ইন্টারফেস ব্যবহার করে রুবি ইথেরিয়াম ক্লায়েন্ট এবং ইথেরিয়াম নোডের সাথে কাজ করার জন্য দরকারী টুলকিট_
- [omniauth-ethereum.rb](https://github.com/q9f/omniauth-ethereum.rb) - _OmniAuth-এর জন্য ইথেরিয়াম প্রোভাইডার কৌশল প্রয়োগ করে_

আরও সংস্থান খুঁজছেন? আমাদের [ডেভেলপারদের হোম](/developers/) দেখুন।

## রুবি কমিউনিটির অবদানকারীগণ {#ruby-community-contributors}

[ইথেরিয়াম রুবি টেলিগ্রাম গ্রুপ](https://t.me/ruby_eth) একটি দ্রুত বর্ধনশীল সম্প্রদায়ের হোস্ট এবং এটি উপরের যেকোনো প্রজেক্ট এবং সম্পর্কিত বিষয় নিয়ে আলোচনার জন্য নিবেদিত রিসোর্স।
