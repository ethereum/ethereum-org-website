---
title: "ব্যাকএন্ড API লাইব্রেরি"
description: "ইথেরিয়াম ক্লায়েন্ট API-এর একটি পরিচিতি যা আপনাকে আপনার অ্যাপ্লিকেশন থেকে ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে দেয়।"
lang: bn
---

একটি সফ্টওয়্যার অ্যাপ্লিকেশনকে [ইথেরিয়াম](/) ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে (অর্থাৎ, ব্লকচেইন ডেটা পড়তে এবং/অথবা নেটওয়ার্কে ট্রানজ্যাকশন পাঠাতে), এটিকে অবশ্যই একটি ইথেরিয়াম নোডের সাথে সংযুক্ত হতে হবে।

এই উদ্দেশ্যে, প্রতিটি ইথেরিয়াম ক্লায়েন্ট [জেসন-আরপিসি](/developers/docs/apis/json-rpc/) স্পেসিফিকেশন প্রয়োগ করে, তাই [মেথড](/developers/docs/apis/json-rpc/#json-rpc-methods)-এর একটি অভিন্ন সেট রয়েছে যার উপর অ্যাপ্লিকেশনগুলি নির্ভর করতে পারে।

আপনি যদি একটি ইথেরিয়াম নোডের সাথে সংযোগ করতে একটি নির্দিষ্ট প্রোগ্রামিং ভাষা ব্যবহার করতে চান, তবে ইকোসিস্টেমের মধ্যে অনেক সুবিধাজনক লাইব্রেরি রয়েছে যা এটিকে আরও সহজ করে তোলে। এই লাইব্রেরিগুলির সাহায্যে, ডেভেলপাররা ইথেরিয়ামের সাথে ইন্টারঅ্যাক্ট করে এমন জেসন-আরপিসি রিকোয়েস্ট (অভ্যন্তরীণভাবে) শুরু করার জন্য সহজ, এক-লাইনের মেথড লিখতে পারেন।

## পূর্বশর্ত {#prerequisites}

[ইথেরিয়াম স্ট্যাক](/developers/docs/ethereum-stack/) এবং [ইথেরিয়াম ক্লায়েন্ট](/developers/docs/nodes-and-clients/) সম্পর্কে বোঝা সহায়ক হতে পারে।

## কেন একটি লাইব্রেরি ব্যবহার করবেন? {#why-use-a-library}

এই লাইব্রেরিগুলি সরাসরি একটি ইথেরিয়াম নোডের সাথে ইন্টারঅ্যাক্ট করার অনেক জটিলতা দূর করে। এগুলি ইউটিলিটি ফাংশনও প্রদান করে (যেমন, ETH-কে Gwei-তে রূপান্তর করা) যাতে একজন ডেভেলপার হিসেবে আপনি ইথেরিয়াম ক্লায়েন্টগুলির জটিলতাগুলি মোকাবেলা করতে কম সময় ব্যয় করতে পারেন এবং আপনার অ্যাপ্লিকেশনের অনন্য কার্যকারিতার উপর বেশি সময় ফোকাস করতে পারেন।

## উপলব্ধ লাইব্রেরি {#available-libraries}

### পরিকাঠামো এবং নোড পরিষেবা {#infrastructure-and-node-services}

**Alchemy -** **_ইথেরিয়াম ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [alchemy.com](https://www.alchemy.com/)
- [ডকুমেন্টেশন](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [ডিসকর্ড](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_নোড-অ্যাজ-এ-সার্ভিস।_**

- [All That Node.com](https://www.allthatnode.com/)
- [ডকুমেন্টেশন](https://docs.allthatnode.com)
- [ডিসকর্ড](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_ইথেরিয়াম মেইননেট এবং টেস্টনেটগুলির জন্য ডিসেন্ট্রালাইজড API।_**

- [blastapi.io](https://blastapi.io/)
- [ডকুমেন্টেশন](https://docs.blastapi.io)
- [ডিসকর্ড](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_আরও দক্ষ এবং দ্রুত RPC পরিষেবা প্রদান করে_**

- [blockpi.io](https://blockpi.io/)
- [ডকুমেন্টেশন](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [ডিসকর্ড](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ব্লক এক্সপ্লোরার এবং ট্রানজ্যাকশন API**
- [ডকুমেন্টেশন](https://docs.etherscan.io/)

**Blockscout - ওপেন সোর্স ব্লক এক্সপ্লোরার**
- [ডকুমেন্টেশন](https://docs.blockscout.com/)

**GetBlock-** **_Web3 ডেভেলপমেন্টের জন্য ব্লকচেইন-অ্যাজ-এ-সার্ভিস_**

- [GetBlock.io](https://getblock.io/)
- [ডকুমেন্টেশন](https://docs.getblock.io/)

**Infura -** **_একটি পরিষেবা হিসাবে ইথেরিয়াম API।_**

- [infura.io](https://infura.io)
- [ডকুমেন্টেশন](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _সাশ্রয়ী EVM জেসন-আরপিসি প্রোভাইডার_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ডকুমেন্টেশন](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _ফুল নোড এবং ব্লক এক্সপ্লোরার।_**

- [NOWNodes.io](https://nownodes.io/)
- [ডকুমেন্টেশন](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_একটি পরিষেবা হিসাবে ব্লকচেইন পরিকাঠামো।_**

- [quicknode.com](https://quicknode.com)
- [ডকুমেন্টেশন](https://www.quicknode.com/docs/welcome)
- [ডিসকর্ড](https://discord.gg/quicknode)

**Rivet -** **_ওপেন সোর্স সফ্টওয়্যার দ্বারা চালিত একটি পরিষেবা হিসাবে ইথেরিয়াম এবং ইথেরিয়াম ক্লাসিক API।_**

- [rivet.cloud](https://rivet.cloud)
- [ডকুমেন্টেশন](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_জেসন-আরপিসি/WebSockets API হিসাবে গতি-ভিত্তিক ইথেরিয়াম নোড।_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ডকুমেন্টেশন](https://docs.zmok.io/)
- [ডিসকর্ড](https://discord.gg/fAHeh3ka6s)

### ডেভেলপমেন্ট টুল {#development-tools}

**ethers-kt -** **_EVM-ভিত্তিক ব্লকচেইনগুলির জন্য অ্যাসিঙ্ক, উচ্চ-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [উদাহরণ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ডিসকর্ড](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ব্লকচেইনের জন্য একটি ওপেন সোর্স .NET ইন্টিগ্রেশন লাইব্রেরি।_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ডকুমেন্টেশন](https://docs.nethereum.com/docs/getting-started/welcome/)
- [ডিসকর্ড](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Python-এর মাধ্যমে ইথেরিয়াম ইন্টারঅ্যাকশনের জন্য বিভিন্ন লাইব্রেরি।_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py চ্যাট](https://gitter.im/ethereum/web3.py)

**Tatum -** **_চূড়ান্ত ব্লকচেইন ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ডকুমেন্টেশন](https://docs.tatum.io/)
- [ডিসকর্ড](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_ইথেরিয়ামের জন্য একটি Java/Android/Kotlin/Scala ইন্টিগ্রেশন লাইব্রেরি।_**

- [GitHub](https://github.com/web3j/web3j)
- [ডকুমেন্টেশন](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ব্লকচেইন পরিষেবা {#blockchain-services}

**BlockCypher -** **_ইথেরিয়াম ওয়েব API।_**

- [blockcypher.com](https://www.blockcypher.com/)
- [ডকুমেন্টেশন](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_ইথেরিয়ামের জন্য অল-ইন-ওয়ান Web3 ডেটা পরিকাঠামো।_**

- [chainbase.com](https://chainbase.com/)
- [ডকুমেন্টেশন](https://docs.chainbase.com/)
- [ডিসকর্ড](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_একটি পরিষেবা হিসাবে ইলাস্টিক এবং ডেডিকেটেড ইথেরিয়াম নোড।_**

- [chainstack.com](https://chainstack.com)
- [ডকুমেন্টেশন](https://docs.chainstack.com/)
- [ইথেরিয়াম API রেফারেন্স](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_ব্লকচেইন পরিকাঠামো API।_**

- [কয়েনবেস ক্লাউড নোড](https://www.coinbase.com/developer-platform)
- [ডকুমেন্টেশন](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_ইথেরিয়াম মেইননেট এবং টেস্টনেটগুলির সাথে Web3 API পরিষেবা।_**

- [DataHub](https://www.figment.io/)
- [ডকুমেন্টেশন](https://docs.figment.io/)

**Moralis -** **_এন্টারপ্রাইজ-গ্রেড EVM API প্রোভাইডার।_**

- [moralis.io](https://moralis.io)
- [ডকুমেন্টেশন](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [ডিসকর্ড](https://moralis.io/joindiscord/)
- [ফোরাম](https://forum.moralis.io/)

**NFTPort -** **_ইথেরিয়াম ডেটা এবং মিন্ট API।_**

- [nftport.xyz](https://www.nftport.xyz/)
- [ডকুমেন্টেশন](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [ডিসকর্ড](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_সাধারণ মাল্টি-ক্রিপ্টো ব্লকচেইন API প্ল্যাটফর্ম।_**

- [services.tokenview.io](https://services.tokenview.io/)
- [ডকুমেন্টেশন](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_ইথেরিয়াম ব্লকচেইনে সহজ এবং নির্ভরযোগ্য API অ্যাক্সেস প্রদান করে।_**

- [Watchdata](https://watchdata.io/)
- [ডকুমেন্টেশন](https://docs.watchdata.io/)
- [ডিসকর্ড](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_কয়েক ডজন চেইন জুড়ে রিয়েল-টাইম, সমৃদ্ধ ব্লকচেইন ডেটা API।_**

- [codex.io](https://www.codex.io/)
- [ডকুমেন্টেশন](https://docs.codex.io)
- [এক্সপ্লোরার](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [ডিসকর্ড](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200+ চেইনের জন্য সমৃদ্ধ ব্লকচেইন API।_**

- [covalenthq.com](https://www.covalenthq.com/)
- [ডকুমেন্টেশন](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [ডিসকর্ড](https://www.covalenthq.com/discord/)


## আরও পড়ুন {#further-reading}

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পেজটি এডিট করুন এবং এটি যোগ করুন!_

## সম্পর্কিত টপিক {#related-topics}

- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [JavaScript-এ ইথেরিয়াম ব্লকচেইন ব্যবহার করতে Web3.js সেট আপ করুন](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– আপনার প্রজেক্টে Web3.js সেট আপ করার নির্দেশিকা।_
- [JavaScript থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI টোকেন ব্যবহার করে, দেখুন কীভাবে JavaScript ব্যবহার করে কন্ট্রাক্ট ফাংশন কল করতে হয়।_