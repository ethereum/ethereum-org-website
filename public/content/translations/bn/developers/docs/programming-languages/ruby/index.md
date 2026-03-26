---
title: "রুবি ডেভেলপারদের জন্য ইথিরিয়াম"
description: "রুবি-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন।"
lang: bn
incomplete: false
---

<FeaturedText>রুবি-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন।</FeaturedText>

ক্রিপটোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো ব্যবহার করে এমন ডিসেন্ট্রালাইজড এপ্লিকেশন (বা "ডিএ্যাপস") তৈরি করতে ইথিরিয়াম ব্যবহার করুন। এই ডিএ্যাপসগুলো ট্রাস্টলেস হতে পারে, যার মানে হলো একবার ইথিরিয়ামে ডিপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম অনুযায়ী চলবে। এগুলো নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করতে ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে। এগুলো ডিসেন্ট্রালাইজড হতে পারে, যার মানে হলো কোনো একক সত্তা বা ব্যক্তি এগুলোকে নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব।

## স্মার্ট কন্ট্রাক্ট এবং Solidity ভাষার সাথে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**ইথিরিয়ামের সাথে রুবিকে ইন্টিগ্রেট করার জন্য আপনার প্রথম পদক্ষেপ নিন**

প্রথমে আরও প্রাথমিক নির্দেশিকা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য আর্টিকেল {#beginner-articles}

- [অবশেষে ইথিরিয়াম একাউন্ট বোঝা](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [অবশেষে MetaMask-এর মাধ্যমে Rails ব্যবহারকারীদের প্রমাণীকরণ করা](https://dev.to/q9/finally-authenticating-rails-users-with-metamask-3fj)
- [রুবির মাধ্যমে কীভাবে ইথিরিয়াম নেটওয়ার্ক-এর সাথে কানেক্ট করবেন](https://www.quicknode.com/guides/web3-sdks/how-to-connect-to-the-ethereum-network-using-ruby)
- [রুবির মাধ্যমে কীভাবে একটি নতুন ইথিরিয়াম এডড্রেস তৈরি করবেন](https://www.quicknode.com/guides/web3-sdks/how-to-generate-a-new-ethereum-address-in-ruby)

## মধ্যবর্তী আর্টিকেল {#intermediate-articles}

- [রুবির সাথে ব্লকচেইন অ্যাপ](https://www.nopio.com/blog/blockchain-app-ruby/)
- [স্মার্ট কন্ট্রাক্ট এক্সিকিউট করতে ইথিরিয়ামের সাথে কানেক্টেড রুবি ব্যবহার করুন](https://titanwolf.org/Network/Articles/Article?AID=87285822-9b25-49d5-ba2a-7ad95fff7ef9)

## রুবি প্রজেক্ট এবং টুলস {#ruby-projects-and-tools}

### সক্রিয় {#active}

- [eth.rb](https://github.com/q9f/eth.rb) - _ইথিরিয়াম একাউন্ট, মেসেজ এবং লেনদেন পরিচালনা করার জন্য রুবি লাইব্রেরি এবং RPC-ক্লায়েন্ট_
- [keccak.rb](https://github.com/q9f/keccak.rb) - _ইথিরিয়াম দ্বারা ব্যবহৃত Keccak (SHA3) হ্যাস_
- [siwe-ruby](https://github.com/signinwithethereum/siwe-ruby) - _ইথিরিয়ামের সাথে সাইন-ইন এর রুবি ইমপ্লিমেন্টেশন_
- [siwe-rails](https://github.com/signinwithethereum/siwe-rails) - _Rails জেম যা SIWE লোকাল সাইন ইন রুট যোগ করে_
- [siwe-rails-examples](https://github.com/signinwithethereum/siwe-rails-examples) - _কাস্টম কন্ট্রোলারের সাথে Ruby on Rails ব্যবহার করে SIWE উদাহরণ_
- [omniauth-siwe](https://github.com/signinwithethereum/omniauth-siwe) - _ইথিরিয়ামের সাথে সাইন ইন (SIWE) এর জন্য OmniAuth কৌশল_
- [omniauth-nft](https://github.com/valthon/omniauth-nft) - _NFT মালিকানার মাধ্যমে প্রমাণীকরণের জন্য OmniAuth কৌশল_
- [ethereum-on-rails](https://github.com/q9f/ethereum-on-rails) - _Ethereum on Rails টেমপ্লেট যা MetaMask-কে Ruby on Rails-এর সাথে কানেক্ট করার অনুমতি দেয়_

### আর্কাইভ করা / আর রক্ষণাবেক্ষণ করা হয় না {#archived--no-longer-maintained}

- [web3-eth](https://github.com/spikewilliams/vtada-ethereum) - _রুবির মাধ্যমে ইথিরিয়াম নোড-এর RPC মেথড কল করা_
- [ethereum_tree](https://github.com/longhoangwkm/ethereum_tree) - _BIP32 স্ট্যান্ডার্ড অনুযায়ী একটি হায়ারার্কিক্যাল ডিটারমিনিস্টিক ওয়ালেট থেকে ETH এডড্রেস তৈরি করার রুবি লাইব্রেরি_
- [etherlite](https://github.com/budacom/etherlite) - _Ruby on Rails-এর জন্য ইথিরিয়াম ইন্টিগ্রেশন_
- [ethereum.rb](https://github.com/EthWorks/ethereum.rb) - _লেনদেন পাঠানো, কন্ট্রাক্ট তৈরি এবং ইন্টারঅ্যাক্ট করার জন্য JSON-RPC ইন্টারফেস ব্যবহার করে রুবি ইথিরিয়াম ক্লায়েন্ট, সেইসাথে ইথিরিয়াম নোড-এর সাথে কাজ করার জন্য দরকারী টুলকিট_
- [omniauth-ethereum.rb](https://github.com/q9f/omniauth-ethereum.rb) - _OmniAuth-এর জন্য ইথিরিয়াম প্রোভাইডার কৌশল ইমপ্লিমেন্ট করে_

আরও রিসোর্স খুঁজছেন? [আমাদের ডেভেলপারদের হোম](/developers/) দেখুন।

## রুবি কমিউনিটির অবদানকারীগণ {#ruby-community-contributors}

[ইথিরিয়াম রুবি টেলিগ্রাম গ্রুপ](https://t.me/ruby_eth) হলো একটি দ্রুত বর্ধনশীল কমিউনিটির হোস্ট এবং এটি উপরের যেকোনো প্রজেক্ট এবং সম্পর্কিত বিষয় নিয়ে আলোচনার জন্য একটি ডেডিকেটেড রিসোর্স।