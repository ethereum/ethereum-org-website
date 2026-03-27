---
title: "গো (Go) ডেভেলপারদের জন্য ইথিরিয়াম"
description: "গো-ভিত্তিক (Go-based) প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন"
lang: bn
incomplete: true
---

<FeaturedText>গো-ভিত্তিক (Go-based) প্রজেক্ট এবং টুলিং ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন</FeaturedText>

ডিসেন্ট্রালাইজড এপ্লিকেশন (বা "ডিএ্যাপস") তৈরি করতে ইথিরিয়াম ব্যবহার করুন। এই ডিএ্যাপসগুলো বিশ্বস্ত হতে পারে, যার মানে হলো একবার ইথিরিয়ামে ডেপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম অনুযায়ী চলবে। এগুলো ডিসেন্ট্রালাইজড, যার মানে হলো এগুলো একটি পিয়ার-টু-পিয়ার নেটওয়ার্কে চলে এবং এগুলোর কোনো একক ব্যর্থতার বিন্দু (single point of failure) নেই। কোনো একক সত্তা বা ব্যক্তি এগুলোকে নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব। নতুন ধরনের অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে।

## স্মার্ট কন্ট্রাক্ট এবং Solidity ভাষার সাথে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**ইথিরিয়ামের সাথে Go ইন্টিগ্রেট করার জন্য আপনার প্রথম পদক্ষেপ নিন**

প্রথমে আরও প্রাথমিক ধারণা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লেখা](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডেপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [কন্ট্রাক্ট টিউটোরিয়াল](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## নতুনদের জন্য আর্টিকেল এবং বই {#beginner-articles-and-books}

- [Geth এর সাথে শুরু করা](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [ইথিরিয়ামের সাথে কানেক্ট করতে Golang ব্যবহার করুন](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang ব্যবহার করে ইথিরিয়াম স্মার্ট কন্ট্রাক্ট ডেপ্লয় করুন](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go-তে ইথিরিয়াম স্মার্ট কন্ট্রাক্ট টেস্টিং এবং ডেপ্লয় করার ধাপে ধাপে গাইড](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ই-বুক: Go এর সাথে ইথিরিয়াম ডেভেলপমেন্ট](https://goethereumbook.org/) - _Go দিয়ে ইথিরিয়াম অ্যাপ্লিকেশন ডেভেলপ করুন_

## ইন্টারমিডিয়েট আর্টিকেল এবং ডক্স {#intermediate-articles-and-docs}

- [Go Ethereum ডকুমেন্টেশন](https://geth.ethereum.org/docs) - _অফিসিয়াল ইথিরিয়াম Golang এর ডকুমেন্টেশন_
- [Erigon প্রোগ্রামার গাইড](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _স্টেট ট্রি, মাল্টি-প্রুফ এবং লেনদেন প্রসেসিং সহ সচিত্র গাইড_
- [Erigon এবং স্টেটলেস ইথিরিয়াম](https://youtu.be/3-Mn7OckSus?t=394) - _2020 ইথিরিয়াম কমিউনিটি কনফারেন্স (EthCC 3)_
- [Erigon: ইথিরিয়াম ক্লায়েন্ট অপ্টিমাইজ করা](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth এর সাথে Go-তে একটি ডিএ্যাপ তৈরি করা](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang এবং Geth এর সাথে ইথিরিয়াম প্রাইভেট নেটওয়ার্কে কাজ করা](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go এর সাথে ইথিরিয়ামে Solidity কন্ট্রাক্ট ইউনিট টেস্টিং](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [লাইব্রেরি হিসেবে Geth ব্যবহার করার জন্য কুইক রেফারেন্স](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## অ্যাডভান্সড ব্যবহারের ধরন {#advanced-use-patterns}

- [GETH সিমুলেটেড ব্যাকএন্ড](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [ইথিরিয়াম এবং Quorum ব্যবহার করে ব্লকচেইন-অ্যাজ-এ-সার্ভিস অ্যাপস](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [ইথিরিয়াম ব্লকচেইন অ্যাপ্লিকেশনে ডিস্ট্রিবিউটেড স্টোরেজ IPFS এবং Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [মোবাইল ক্লায়েন্ট: লাইব্রেরি এবং ইনপ্রক ইথিরিয়াম নোড](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [নেটিভ ডিএ্যাপস: ইথিরিয়াম কন্ট্রাক্টের সাথে Go বাইন্ডিং](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go প্রজেক্ট এবং টুলস {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _ইথিরিয়াম প্রটোকলের অফিসিয়াল Go ইমপ্লিমেন্টেশন_
- [Go Ethereum কোড অ্যানালাইসিস](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum সোর্স কোডের রিভিউ এবং অ্যানালাইসিস_
- [Erigon](https://github.com/ledgerwatch/erigon) - _আর্কাইভ নোডের উপর ফোকাস সহ Go Ethereum এর দ্রুততর ডেরিভেটিভ_
- [Golem](https://github.com/golemfactory/golem) - _Golem কম্পিউটিং পাওয়ারের জন্য একটি গ্লোবাল মার্কেট তৈরি করছে_
- [Quorum](https://github.com/jpmorganchase/quorum) - _ডেটা প্রাইভেসি সমর্থনকারী ইথিরিয়ামের একটি পারমিশনড ইমপ্লিমেন্টেশন_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _ইথিরিয়াম 'Serenity' 2.0 Go ইমপ্লিমেন্টেশন_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _ডিসেন্ট্রালাইজড টুইটার: ইথিরিয়াম ব্লকচেইনে চলা একটি মাইক্রোব্লগিং সার্ভিস_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _মিনিমাম ভায়াবল প্লাজমা স্পেসিফিকেশনের Golang ইমপ্লিমেন্টেশন এবং এক্সটেনশন_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _একটি ওপেন সোর্স ইথিরিয়াম মাইনিং পুল_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go-তে ইথিরিয়াম HD ওয়ালেট ডেরিভেশন_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _ইথিরিয়াম নেটওয়ার্কের অনেক প্রজাতির জন্য সাপোর্ট_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _লাইট ইথিরিয়াম সাবপ্রটোকলের Geth ইমপ্লিমেন্টেশন_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golang-এ একটি সাধারণ ইথিরিয়াম ওয়ালেট ইমপ্লিমেন্টেশন এবং ইউটিলিটি_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ ব্লকচেইনের জন্য Go SDK এর মাধ্যমে দক্ষ ব্লকচেইন ডেটা অ্যাক্সেস_

আরও রিসোর্স খুঁজছেন? [ethereum.org/developers](/developers/) দেখুন

## Go কমিউনিটি কন্ট্রিবিউটর {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum চ্যানেল](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## অন্যান্য অ্যাগ্রিগেটেড তালিকা {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: ইথিরিয়াম ডেভেলপার টুলসের একটি চূড়ান্ত তালিকা](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub সোর্স](https://github.com/ConsenSys/ethereum-developer-tools-list)