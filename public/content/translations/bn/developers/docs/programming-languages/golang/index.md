---
title: "গো(Go) ডেভেলপারদের জন্য ইথেরিয়াম"
description: "শিখুন কিভাবে গো-ভিত্তিক প্রজেক্ট ও টুল ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়"
lang: bn
incomplete: true
---

<FeaturedText>শিখুন কিভাবে গো-ভিত্তিক প্রজেক্ট ও টুল ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়</FeaturedText>

ইথেরিয়াম ব্যবহার করে ডিসেন্ট্রালাইজড এপ্লিকেশন (বা "ডিএ্যাপস") তৈরি করুন। এই ড্যাপগুলো বিশ্বাসযোগ্য হতে পারে, অর্থাৎ এগুলোকে একবার ইথেরিয়ামে প্রয়োগ করা হয়ে গেলে, এগুলো সবসময় প্রোগ্রামড হিসেবে চলতে থাকবে।. এগুলি বিকেন্দ্রীভূত, যার অর্থ এগুলি একটি পিয়ার-টু-পিয়ার নেটওয়ার্কে চলে এবং ব্যর্থতার কোনও একক বিন্দু নেই। কোনও একক সত্তা বা ব্যক্তি তাদের নিয়ন্ত্রণ করে না এবং তাদের সেন্সর করা প্রায় অসম্ভব। নতুন ধরনের এপ্লিকেশন তৈরি করার জন্য তারা ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে।

## স্মার্ট কন্ট্র্যাক্ট এবং Solidity ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

**গো-এর সাথে ইথেরিয়ামকে একীভূত করার জন্য প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্টটি লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [কন্ট্র্যাক্ট টিউটোরিয়াল](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## শিক্ষানবিশদের জন্য প্রবন্ধ এবং বই {#beginner-articles-and-books}

- [Geth দিয়ে শুরু করুন](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Ethereum-এর সাথে সংযোগ করতে Golang ব্যবহার করুন](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang ব্যবহার করে Ethereum স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করুন](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go-তে Ethereum স্মার্ট কন্ট্র্যাক্ট পরীক্ষা এবং ডিপ্লয় করার জন্য একটি ধাপে ধাপে নির্দেশিকা](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ই-বুক: Go দিয়ে Ethereum ডেভেলপমেন্ট](https://goethereumbook.org/) - _Go দিয়ে Ethereum এপ্লিকেশন ডেভেলপ করুন_

## মধ্যবর্তী স্তরের প্রবন্ধ এবং ডক্স {#intermediate-articles-and-docs}

- [Go Ethereum ডকুমেন্টেশন](https://geth.ethereum.org/docs/) - _অফিসিয়াল Ethereum Golang-এর জন্য ডকুমেন্টেশন_
- [Erigon প্রোগ্রামারদের জন্য নির্দেশিকা](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _স্টেট ট্রি, মাল্টি-প্রুফস, এবং লেনদেন প্রক্রিয়াকরণ সহ সচিত্র নির্দেশিকা_
- [Erigon এবং স্টেটলেস Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _2020 Ethereum কমিউনিটি কনফারেন্স (EthCC 3)_
- [Erigon: Ethereum ক্লায়েন্ট অপ্টিমাইজ করা](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth এর সাথে Go তে একটি ডিএ্যাপ তৈরি করা](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang এবং Geth এর সাথে Ethereum প্রাইভেট নেটওয়ার্কে কাজ করুন](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go এর সাথে Ethereum এ সলিডিটি কন্ট্র্যাক্টের ইউনিট টেস্টিং](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [লাইব্রেরি হিসেবে Geth ব্যবহারের জন্য দ্রুত রেফারেন্স](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## উন্নত ব্যবহারের প্যাটার্ন {#advanced-use-patterns}

- [GETH সিমুলেটেড ব্যাকএন্ড](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Ethereum এবং Quorum ব্যবহার করে ব্লকচেইন-অ্যাজ-এ-সার্ভিস অ্যাপস](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Ethereum ব্লকচেইন অ্যাপ্লিকেশনে ডিস্ট্রিবিউটেড স্টোরেজ IPFS এবং Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [মোবাইল ক্লায়েন্ট: লাইব্রেরি এবং ইনপ্রোক Ethereum নোড](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [নেটিভ ডিএ্যাপস: Ethereum কন্ট্র্যাক্টে Go বাইন্ডিং](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go প্রজেক্ট এবং টুলস {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Ethereum প্রোটোকলের অফিসিয়াল Go প্রয়োগ_
- [Go Ethereum কোড অ্যানালাইসিস](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum সোর্স কোডের পর্যালোচনা এবং বিশ্লেষণ_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go Ethereum-এর একটি দ্রুততর ডেরিভেটিভ, আর্কাইভ নোডগুলিতে ফোকাস সহ_
- [Golem](https://github.com/golemfactory/golem) - _Golem কম্পিউটিং পাওয়ারের জন্য একটি বিশ্বব্যাপী বাজার তৈরি করছে_
- [Quorum](https://github.com/jpmorganchase/quorum) - _ডেটা গোপনীয়তা সমর্থনকারী Ethereum-এর একটি অনুমতিপ্রাপ্ত প্রয়োগ_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Ethereum 'Serenity' 2.0 Go প্রয়োগ_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _বিকেন্দ্রীভূত টুইটার: Ethereum ব্লকচেইনে চালিত একটি মাইক্রোব্লগিং পরিষেবা_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _মিনিমাম ভায়াবল প্লাজমা স্পেসিফিকেশনের Golang প্রয়োগ এবং এক্সটেনশন_
- [ওপেন Ethereum মাইনিং পুল](https://github.com/sammy007/open-ethereum-pool) - _একটি ওপেন সোর্স Ethereum মাইনিং পুল_
- [Ethereum HD ওয়ালেট](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go-তে Ethereum HD ওয়ালেট ডেরিভেশন_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _বিভিন্ন ধরনের Ethereum নেটওয়ার্কের জন্য সমর্থন_
- [Geth লাইট ক্লায়েন্ট](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _লাইট Ethereum সাবপ্রোটোকলের Geth প্রয়োগ_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golang-এ একটি সাধারণ Ethereum ওয়ালেট প্রয়োগ এবং ইউটিলিটি_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ ব্লকচেইনের জন্য Go SDK-এর মাধ্যমে কার্যকরী ব্লকচেইন ডেটা অ্যাক্সেস_

আরও সংস্থান খুঁজছেন? [ethereum.org/developers](/developers/) দেখুন

## Go কমিউনিটির অবদানকারীরা {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum চ্যানেল](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth লাইট ক্লায়েন্ট Gitter](https://gitter.im/ethereum/light-client)

## অন্যান্য একত্রিত তালিকা {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Ethereum ডেভেলপার টুলসের একটি নির্দিষ্ট তালিকা](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub সোর্স](https://github.com/ConsenSys/ethereum-developer-tools-list)
