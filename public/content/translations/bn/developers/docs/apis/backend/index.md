---
title: "ব্যাকএন্ড এপিআই লাইব্রেরি"
description: "ইথিরিয়াম ক্লায়েন্ট এপিআই-এর একটি পরিচিতি যা আপনাকে আপনার অ্যাপ্লিকেশন থেকে ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে দেয়।"
lang: bn
---

একটি সফটওয়্যার অ্যাপ্লিকেশনের [Ethereum](/) ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য (অর্থাৎ, ব্লকচেইন ডেটা পড়া এবং/অথবা নেটওয়ার্কে লেনদেন পাঠানো), এটিকে অবশ্যই একটি ইথিরিয়াম নোডের সাথে সংযুক্ত হতে হবে।

এই উদ্দেশ্যে, প্রতিটি ইথিরিয়াম ক্লায়েন্ট [JSON-RPC](/developers/docs/apis/json-rpc/) স্পেসিফিকেশন ইমপ্লিমেন্ট করে, তাই [methods](/developers/docs/apis/json-rpc/#json-rpc-methods)-এর একটি অভিন্ন সেট রয়েছে যার উপর অ্যাপ্লিকেশনগুলো নির্ভর করতে পারে।

আপনি যদি একটি ইথিরিয়াম নোডের সাথে সংযুক্ত হওয়ার জন্য একটি নির্দিষ্ট প্রোগ্রামিং ভাষা ব্যবহার করতে চান, তবে ইকোসিস্টেমের মধ্যে অনেক সুবিধাজনক লাইব্রেরি রয়েছে যা এটিকে অনেক সহজ করে তোলে। এই লাইব্রেরিগুলোর সাহায্যে, ডেভেলপাররা ইথিরিয়ামের সাথে ইন্টারঅ্যাক্ট করার জন্য JSON-RPC রিকোয়েস্ট (আড়ালে) ইনিশিয়ালাইজ করতে সহজ, এক-লাইনের মেথড লিখতে পারেন।

## পূর্বশর্ত {#prerequisites}

[Ethereum stack](/developers/docs/ethereum-stack/) এবং [Ethereum clients](/developers/docs/nodes-and-clients/) সম্পর্কে বোঝা সহায়ক হতে পারে।

## কেন একটি লাইব্রেরি ব্যবহার করবেন? {#why-use-a-library}

এই লাইব্রেরিগুলো সরাসরি একটি ইথিরিয়াম নোডের সাথে ইন্টারঅ্যাক্ট করার অনেক জটিলতা দূর করে। এগুলো ইউটিলিটি ফাংশনও প্রদান করে (যেমন, ETH-কে Gwei-তে রূপান্তর করা) যাতে একজন ডেভেলপার হিসেবে আপনি ইথিরিয়াম ক্লায়েন্টগুলোর জটিলতা নিয়ে কম সময় ব্যয় করতে পারেন এবং আপনার অ্যাপ্লিকেশনের অনন্য কার্যকারিতার উপর বেশি সময় ফোকাস করতে পারেন।

## উপলব্ধ লাইব্রেরিগুলো {#available-libraries}

### ইনফ্রাস্ট্রাকচার এবং নোড পরিষেবা {#infrastructure-and-node-services}

**Alchemy -** **_ইথিরিয়াম ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [alchemy.com](https://www.alchemy.com/)
- [Documentation](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_নোড-অ্যাজ-এ-সার্ভিস।_**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentation](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_ইথিরিয়াম মেইননেট এবং টেস্টনেটগুলোর জন্য ডিসেন্ট্রালাইজড এপিআই।_**

- [blastapi.io](https://blastapi.io/)
- [Documentation](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_আরও দক্ষ এবং দ্রুত RPC পরিষেবা প্রদান করে_**

- [blockpi.io](https://blockpi.io/)
- [Documentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ব্লক এক্সপ্লোরার এবং লেনদেন এপিআই**
- [Documentation](https://docs.etherscan.io/)

**Blockscout - ওপেন সোর্স ব্লক এক্সপ্লোরার**
- [Documentation](https://docs.blockscout.com/)

**GetBlock-** **_ওয়েব3 ডেভেলপমেন্টের জন্য ব্লকচেইন-অ্যাজ-এ-সার্ভিস_**

- [GetBlock.io](https://getblock.io/)
- [Documentation](https://docs.getblock.io/)

**Infura -** **_একটি পরিষেবা হিসেবে ইথিরিয়াম এপিআই।_**

- [infura.io](https://infura.io)
- [Documentation](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _সাশ্রয়ী EVM JSON-RPC প্রোভাইডার_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentation](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _ফুল নোড এবং ব্লক এক্সপ্লোরার।_**

- [NOWNodes.io](https://nownodes.io/)
- [Documentation](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_একটি পরিষেবা হিসেবে ব্লকচেইন ইনফ্রাস্ট্রাকচার।_**

- [quicknode.com](https://quicknode.com)
- [Documentation](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_ওপেন সোর্স সফটওয়্যার দ্বারা চালিত একটি পরিষেবা হিসেবে ইথিরিয়াম এবং ইথিরিয়াম ক্লাসিক এপিআই।_**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets এপিআই হিসেবে গতি-ভিত্তিক ইথিরিয়াম নোড।_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### ডেভেলপমেন্ট টুলস {#development-tools}

**ethers-kt -** **_EVM-ভিত্তিক ব্লকচেইনগুলোর জন্য অ্যাসিনক্রোনাস, হাই-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Examples](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ব্লকচেইনের জন্য একটি ওপেন সোর্স .NET ইন্টিগ্রেশন লাইব্রেরি।_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_পাইথনের মাধ্যমে ইথিরিয়াম ইন্টারঅ্যাকশনের জন্য বিভিন্ন লাইব্রেরি।_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_চূড়ান্ত ব্লকচেইন ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_ইথিরিয়ামের জন্য একটি Java/Android/Kotlin/Scala ইন্টিগ্রেশন লাইব্রেরি।_**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ব্লকচেইন পরিষেবা {#blockchain-services}

**BlockCypher -** **_ইথিরিয়াম ওয়েব এপিআই।_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_ইথিরিয়ামের জন্য অল-ইন-ওয়ান ওয়েব3 ডেটা ইনফ্রাস্ট্রাকচার।_**

- [chainbase.com](https://chainbase.com/)
- [Documentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_একটি পরিষেবা হিসেবে ইলাস্টিক এবং ডেডিকেটেড ইথিরিয়াম নোড।_**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainstack.com/)
- [Ethereum API reference](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_ব্লকচেইন ইনফ্রাস্ট্রাকচার এপিআই।_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentation](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_ইথিরিয়াম মেইননেট এবং টেস্টনেটগুলোর সাথে ওয়েব3 এপিআই পরিষেবা।_**

- [DataHub](https://www.figment.io/)
- [Documentation](https://docs.figment.io/)

**Moralis -** **_এন্টারপ্রাইজ-গ্রেড EVM এপিআই প্রোভাইডার।_**

- [moralis.io](https://moralis.io)
- [Documentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_ইথিরিয়াম ডেটা এবং মিন্ট এপিআই।_**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_সাধারণ মাল্টি-ক্রিপ্টো ব্লকচেইন এপিআই প্ল্যাটফর্ম।_**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentation](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_ইথিরিয়াম ব্লকচেইনে সহজ এবং নির্ভরযোগ্য এপিআই অ্যাক্সেস প্রদান করে।_**

- [Watchdata](https://watchdata.io/)
- [Documentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_ডজন খানেক চেইন জুড়ে রিয়েল-টাইম, সমৃদ্ধ ব্লকচেইন ডেটা এপিআই।_**

- [codex.io](https://www.codex.io/)
- [Documentation](https://docs.codex.io)
- [Explorer](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200+ চেইনের জন্য সমৃদ্ধ ব্লকচেইন এপিআই।_**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentation](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## আরও পড়ুন {#further-reading}

_আপনাকে সাহায্য করেছে এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন? এই পেজটি এডিট করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয়গুলো {#related-topics}

- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [জাভাস্ক্রিপ্টে ইথিরিয়াম ব্লকচেইন ব্যবহার করতে Web3js সেট আপ করুন](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– আপনার প্রজেক্টে web3.js সেট আপ করার জন্য নির্দেশিকা।_
- [জাভাস্ক্রিপ্ট থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI টোকেন ব্যবহার করে, জাভাস্ক্রিপ্ট ব্যবহার করে কীভাবে কন্ট্রাক্ট ফাংশন কল করতে হয় তা দেখুন।_