---
title: ব্যাকএন্ড API লাইব্রেরি
description: Ethereum ক্লায়েন্ট API-এর একটি পরিচিতি যা আপনাকে আপনার অ্যাপ্লিকেশন থেকে ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে দেয়।
lang: bn
---

Ethereum ব্লকচেইনের সাথে একটি সফ্টওয়্যার অ্যাপ্লিকেশনের ইন্টারঅ্যাক্ট করার জন্য (অর্থাৎ, ব্লকচেইন ডেটা পড়া এবং/অথবা নেটওয়ার্কে লেনদেন পাঠানো), এটিকে অবশ্যই একটি Ethereum নোডের সাথে সংযোগ স্থাপন করতে হবে।

এই উদ্দেশ্যে, প্রতিটি Ethereum ক্লায়েন্ট [JSON-RPC](/developers/docs/apis/json-rpc/) স্পেসিফিকেশন প্রয়োগ করে, তাই [পদ্ধতিগুলির](/developers/docs/apis/json-rpc/#json-rpc-methods) একটি অভিন্ন সেট রয়েছে যার উপর অ্যাপ্লিকেশনগুলি নির্ভর করতে পারে।

আপনি যদি একটি Ethereum নোডের সাথে সংযোগ করার জন্য একটি নির্দিষ্ট প্রোগ্রামিং ভাষা ব্যবহার করতে চান, তবে ইকোসিস্টেমের মধ্যে অনেক সুবিধাজনক লাইব্রেরি রয়েছে যা এটিকে আরও সহজ করে তোলে। এই লাইব্রেরিগুলির সাহায্যে, ডেভেলপাররা Ethereum-এর সাথে ইন্টারঅ্যাক্ট করে এমন JSON-RPC অনুরোধগুলি (হুডের নীচে) শুরু করার জন্য স্বজ্ঞাত, এক-লাইনের পদ্ধতি লিখতে পারে।

## পূর্বশর্ত {#prerequisites}

[Ethereum স্ট্যাক](/developers/docs/ethereum-stack/) এবং [Ethereum ক্লায়েন্ট](/developers/docs/nodes-and-clients/) বোঝা সহায়ক হতে পারে।

## একটি লাইব্রেরি কেন ব্যবহার করবেন? {#why-use-a-library}

এই লাইব্রেরিগুলি সরাসরি একটি Ethereum নোডের সাথে ইন্টারঅ্যাক্ট করার জটিলতাকে অনেকটাই সহজ করে দেয়। তারা ইউটিলিটি ফাংশনও (যেমন, ETH-কে Gwei-তে রূপান্তর করা) সরবরাহ করে যাতে একজন ডেভেলপার হিসেবে আপনি Ethereum ক্লায়েন্টের জটিলতা নিয়ে কাজ করার জন্য কম সময় ব্যয় করতে পারেন এবং আপনার অ্যাপ্লিকেশনের অনন্য কার্যকারিতার উপর বেশি সময় মনোনিবেশ করতে পারেন।

## উপলব্ধ লাইব্রেরি {#available-libraries}

### অবকাঠামো এবং নোড পরিষেবা {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [alchemy.com](https://www.alchemy.com/)
- [নথিপত্র](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_নোড-এজ-এ-সার্ভিস।_**

- [All That Node.com](https://www.allthatnode.com/)
- [নথিপত্র](https://docs.allthatnode.com)
- [ডিসকর্ড](https://discord.gg/GmcdVEUbJM)

**Bware Labs দ্বারা Blast -** **_Ethereum মেইননেট এবং টেস্টনেটের জন্য বিকেন্দ্রীভূত API।_**

- [blastapi.io](https://blastapi.io/)
- [নথিপত্র](https://docs.blastapi.io)
- [ডিসকর্ড](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_আরও কার্যকর এবং দ্রুত RPC পরিষেবা প্রদান করুন_**

- [blockpi.io](https://blockpi.io/)
- [নথিপত্র](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [ডিসকর্ড](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum গেটওয়ে।**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ব্লক এক্সপ্লোরার এবং লেনদেন API**

- [নথিপত্র](https://docs.etherscan.io/)

**Blockscout - ওপেন সোর্স ব্লক এক্সপ্লোরার**

- [নথিপত্র](https://docs.blockscout.com/)

**GetBlock-** **_Web3 ডেভেলপমেন্টের জন্য ব্লকচেইন-এজ-এ-সার্ভিস_**

- [GetBlock.io](https://getblock.io/)
- [নথিপত্র](https://docs.getblock.io/)

**Infura -** **_একটি পরিষেবা হিসাবে Ethereum API।_**

- [infura.io](https://infura.io)
- [নথিপত্র](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _সাশ্রয়ী EVM JSON-RPC প্রদানকারী_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [নথিপত্র](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _সম্পূর্ণ নোড এবং ব্লক এক্সপ্লোরার।_**

- [NOWNodes.io](https://nownodes.io/)
- [নথিপত্র](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_একটি পরিষেবা হিসাবে ব্লকচেইন পরিকাঠামো।_**

- [quicknode.com](https://quicknode.com)
- [নথিপত্র](https://www.quicknode.com/docs/welcome)
- [ডিসকর্ড](https://discord.gg/quicknode)

**Rivet -** **_ওপেন সোর্স সফ্টওয়্যার দ্বারা চালিত একটি পরিষেবা হিসাবে Ethereum এবং Ethereum Classic API।_**

- [rivet.cloud](https://rivet.cloud)
- [নথিপত্র](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API হিসাবে গতি-ভিত্তিক Ethereum নোড।_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [নথিপত্র](https://docs.zmok.io/)
- [ডিসকর্ড](https://discord.gg/fAHeh3ka6s)

### ডেভেলপমেন্ট টুলস {#development-tools}

**ethers-kt -** **_EVM-ভিত্তিক ব্লকচেইনের জন্য অ্যাসিঙ্ক, হাই-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [উদাহরণ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ব্লকচেইনের জন্য একটি ওপেন সোর্স .NET ইন্টিগ্রেশন লাইব্রেরি।_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [নথিপত্র](http://docs.nethereum.com/en/latest/)
- [ডিসকর্ড](https://discord.com/invite/jQPrR58FxX)

**Python টুলিং -** **_Python-এর মাধ্যমে Ethereum ইন্টারঅ্যাকশনের জন্য বিভিন্ন লাইব্রেরি।_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py চ্যাট](https://gitter.im/ethereum/web3.py)

**Tatum -** **_চূড়ান্ত ব্লকচেইন ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [নথিপত্র](https://docs.tatum.io/)
- [ডিসকর্ড](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Ethereum-এর জন্য একটি Java/Android/Kotlin/Scala ইন্টিগ্রেশন লাইব্রেরি।_**

- [GitHub](https://github.com/web3j/web3j)
- [নথিপত্র](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ব্লকচেইন পরিষেবা {#blockchain-services}

**BlockCypher -** **_Ethereum ওয়েব API।_**

- [blockcypher.com](https://www.blockcypher.com/)
- [নথিপত্র](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Ethereum-এর জন্য অল-ইন-ওয়ান web3 ডেটা পরিকাঠামো।_**

- [chainbase.com](https://chainbase.com/)
- [নথিপত্র](https://docs.chainbase.com/)
- [ডিসকর্ড](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_একটি পরিষেবা হিসাবে ইলাস্টিক এবং ডেডিকেটেড Ethereum নোড।_**

- [chainstack.com](https://chainstack.com)
- [নথিপত্র](https://docs.chainstack.com/)
- [Ethereum API রেফারেন্স](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase ক্লাউড নোড -** **_ব্লকচেইন ইনফ্রাস্ট্রাকচার API।_**

- [Coinbase ক্লাউড নোড](https://www.coinbase.com/developer-platform)
- [নথিপত্র](https://docs.cdp.coinbase.com/)

**Figment দ্বারা DataHub -** **_Ethereum মেইননেট এবং টেস্টনেট সহ Web3 API পরিষেবা।_**

- [DataHub](https://www.figment.io/)
- [নথিপত্র](https://docs.figment.io/)

**Moralis -** **_এন্টারপ্রাইজ-গ্রেড EVM API প্রদানকারী।_**

- [moralis.io](https://moralis.io)
- [নথিপত্র](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [ডিসকর্ড](https://moralis.io/joindiscord/)
- [ফোরাম](https://forum.moralis.io/)

**NFTPort -** **_Ethereum ডেটা এবং মিন্ট API।_**

- [nftport.xyz](https://www.nftport.xyz/)
- [নথিপত্র](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [ডিসকর্ড](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_সাধারণ মাল্টি-ক্রিপ্টো ব্লকচেইন APIs প্ল্যাটফর্ম।_**

- [services.tokenview.io](https://services.tokenview.io/)
- [নথিপত্র](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Ethereum ব্লকচেইনে সহজ এবং নির্ভরযোগ্য API অ্যাক্সেস সরবরাহ করুন।_**

- [Watchdata](https://watchdata.io/)
- [নথিপত্র](https://docs.watchdata.io/)
- [ডিসকর্ড](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200+ চেইনের জন্য সমৃদ্ধ ব্লকচেইন API।_**

- [covalenthq.com](https://www.covalenthq.com/)
- [নথিপত্র](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## আরও পড়ুন {#further-reading}

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয় {#related-topics}

- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [জাভাস্ক্রিপ্টে Ethereum ব্লকচেইন ব্যবহার করতে Web3js সেট আপ করুন](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– আপনার প্রোজেক্টে web3.js সেট আপ করার জন্য নির্দেশাবলী।_
- [জাভাস্ক্রিপ্ট থেকে একটি স্মার্ট কন্ট্র্যাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI টোকেন ব্যবহার করে দেখুন, জাভাস্ক্রিপ্ট ব্যবহার করে কীভাবে কন্ট্র্যাক্ট ফাংশন কল করতে হয়।_
