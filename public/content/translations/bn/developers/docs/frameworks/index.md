---
title: "ডিএ্যাপ ডেভেলপমেন্ট ফ্রেমওয়ার্কস"
description: "ফ্রেমওয়ার্কের সুবিধাগুলো অন্বেষণ করুন এবং উপলব্ধ বিকল্পগুলির তুলনা করুন।"
lang: bn
---

## ফ্রেমওয়ার্কের ভূমিকা {#introduction-to-frameworks}

একটি পূর্ণাঙ্গ ডিএ্যাপ তৈরি করার জন্য
বিভিন্ন ধরনের প্রযুক্তির প্রয়োজন হয়। সফ্টওয়্যার ফ্রেমওয়ার্কগুলোতে প্রয়োজনীয় অনেক
ফিচার অন্তর্ভুক্ত থাকে অথবা আপনার পছন্দের টুলগুলো বেছে নেওয়ার জন্য সহজ প্লাগইন সিস্টেম সরবরাহ করে।

ফ্রেমওয়ার্কগুলো অনেক আউট-অফ-দ্য-বক্স কার্যকারিতা সহ আসে,
যেমন:

- একটি স্থানীয় ব্লকচেইন মুহুর্তে স্পিন আপ করার ফিচারসমূহ।
- আপনার স্মার্ট কন্ট্র্যাক্ট গুলি কম্পাইল এবং পরীক্ষা করার ইউটিলিটি সমূহ।
- একই প্রজেক্ট/রিপোজিটরির মধ্যে আপনার ইউজার-ফেসিং অ্যাপ্লিকেশন তৈরি করার জন্য ক্লায়েন্ট ডেভেলপমেন্ট অ্যাড-অন।
- Ethereum নেটওয়ার্কের সাথে সংযোগ স্থাপন এবং কন্ট্র্যাক্ট ডেপ্লয় করার জন্য কনফিগারেশন,
  সেটা স্থানীয়ভাবে চলমান কোনো ইনস্ট্যান্স হোক, অথবা Ethereum-এর কোনো পাবলিক নেটওয়ার্ক।
- ডিসেন্ট্রালাইজড অ্যাপ ডিস্ট্রিবিউশন - IPFS-এর মতো স্টোরেজ
  বিকল্পগুলির সাথে ইন্টিগ্রেশন।

## পূর্বশর্ত {#prerequisites}

ফ্রেমওয়ার্কগুলিতে প্রবেশ করার আগে, আমরা আপনাকে প্রথমে আমাদের [ডিএ্যাপস](/developers/docs/dapps/) এবং [Ethereum স্ট্যাক](/developers/docs/ethereum-stack/) এর ভূমিকা পড়ে নেওয়ার পরামর্শ দিচ্ছি।

## উপলব্ধ ফ্রেমওয়ার্ক {#available-frameworks}

**Foundry** - **_Foundry হলো Ethereum অ্যাপ্লিকেশন ডেভেলপমেন্টের জন্য একটি অত্যন্ত দ্রুত, পোর্টেবল এবং মডুলার টুলকিট_**

- [Foundry ইনস্টল করুন](https://book.getfoundry.sh/)
- [Foundry বই](https://book.getfoundry.sh/)
- [টেলিগ্রামে Foundry কমিউনিটি চ্যাট](https://t.me/foundry_support)
- [অসাম Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_পেশাদারদের জন্য Ethereum ডেভেলপমেন্ট এনভায়রনমেন্ট।_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Pythonistas, ডেটা সায়েন্টিস্ট এবং সিকিউরিটি পেশাদারদের জন্য স্মার্ট কন্ট্র্যাক্ট ডেভেলপমেন্ট টুল।_**

- [ডকুমেন্টেশন](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM-এ ব্লকচেইন অ্যাপ্লিকেশন ডেভেলপ করার জন্য একটি প্ল্যাটফর্ম।_**

- [হোমপেজ](https://www.web3labs.com/web3j-sdk)
- [ডকুমেন্টেশন](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-ভিত্তিক ব্লকচেইনের জন্য অ্যাসিঙ্ক, হাই-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [উদাহরণ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_এক কমান্ডে Ethereum-চালিত অ্যাপ তৈরি করুন। বেছে নেওয়ার জন্য UI ফ্রেমওয়ার্ক এবং DeFi টেমপ্লেটের বিস্তৃত সম্ভার সহ আসে।_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [টেমপ্লেট](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + web3-এর জন্য React কম্পোনেন্ট এবং হুকস: স্মার্ট কন্ট্র্যাক্ট দ্বারা চালিত ডিসেন্ট্রালাইজড এপ্লিকেশন তৈরি শুরু করার জন্য আপনার যা কিছু প্রয়োজন।_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 ডেভেলপমেন্ট প্ল্যাটফর্ম যা ব্লকচেইন ডেভেলপারদের স্মার্ট কন্ট্র্যাক্ট তৈরি, পরীক্ষা, ডিবাগ, নিরীক্ষণ এবং পরিচালনা করতে এবং ডিএ্যাপ UX উন্নত করতে সক্ষম করে।_**

- [ওয়েবসাইট](https://tenderly.co/)
- [ডকুমেন্টেশন](https://docs.tenderly.co/)

**The Graph -** **_দক্ষভাবে ব্লকচেইন ডেটা কোয়েরি করার জন্য The Graph।_**

- [ওয়েবসাইট](https://thegraph.com/)
- [টিউটোরিয়াল](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_আমাদের শক্তিশালী SDK এবং CLI ব্যবহার করে এমন web3 অ্যাপ্লিকেশন তৈরি করুন যা আপনার স্মার্ট কন্ট্র্যাক্টগুলির সাথে ইন্টারঅ্যাক্ট করতে পারে।_**

- [ডকুমেন্টেশন](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (Ethereum এবং অন্যান্য) ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_এন্টারপ্রাইজ-গ্রেড web3 ডেভেলপমেন্ট প্ল্যাটফর্ম, যা আপনাকে সমস্ত প্রধান চেইন EVM চেইন (এবং অন্যন্য) -এ NFT অ্যাপ্লিকেশন তৈরি করতে দেয়।_**

- [ওয়েবসাইট](https://www.crossmint.com)
- [নথিপত্র](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_পাইথন-ভিত্তিক ডেভেলপমেন্ট এনভায়রনমেন্ট এবং টেস্টিং ফ্রেমওয়ার্ক।_**

- [ডকুমেন্টেশন](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie বর্তমানে আনমেইনটেইন্ড**

**OpenZeppelin SDK -** **_চূড়ান্ত স্মার্ট কন্ট্র্যাক্ট টুলকিট: আপনাকে স্মার্ট কন্ট্র্যাক্ট ডেভেলপ, কম্পাইল, আপগ্রেড, ডেপ্লয় এবং তার সাথে ইন্টারঅ্যাক্ট করতে সাহায্য করার জন্য টুলের একটি স্যুট।_**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [কমিউনিটি ফোরাম](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK-এর ডেভেলপমেন্ট শেষ হয়ে গেছে**

**Catapulta -** **_মাল্টি-চেইন স্মার্ট কন্ট্র্যাক্ট ডেপ্লয়মেন্ট টুল, ব্লক এক্সপ্লোরারে ভেরিফিকেশন অটোমেট করে, ডেপ্লয় করা স্মার্ট কন্ট্র্যাক্টের ট্র্যাক রাখে এবং ডেপ্লয়মেন্ট রিপোর্ট শেয়ার করে, Foundry এবং Hardhat প্রজেক্টের জন্য প্লাগ-এন-প্লে।_**

- [ওয়েবসাইট](https://catapulta.sh/)
- [ডকুমেন্টেশন](https://catapulta.sh/docs)
- [Github](https://github.com/catapulta-sh)

**GoldRush (Covalent দ্বারা চালিত) -** **_GoldRush ডেভেলপার, বিশ্লেষক এবং এন্টারপ্রাইজদের জন্য সবচেয়ে ব্যাপক ব্লকচেইন ডেটা API স্যুট অফার করে। আপনি একটি DeFi ড্যাশবোর্ড, একটি ওয়ালেট, একটি ট্রেডিং বট, একটি AI এজেন্ট বা একটি কমপ্লায়েন্স প্ল্যাটফর্ম তৈরি করুন না কেন, ডেটা APIগুলি আপনার প্রয়োজনীয় অনচেইন ডেটাতে দ্রুত, নির্ভুল এবং ডেভেলপার-বান্ধব অ্যাক্সেস প্রদান করে_**

- [ওয়েবসাইট](https://goldrush.dev/)
- [ডকুমেন্টেশন](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_কন্ট্র্যাক্ট টেস্টিং, ফাজিং, ডেপ্লয়মেন্ট, ভালনারেবিলিটি স্ক্যানিং এবং কোড নেভিগেশনের জন্য অল-ইন-ওয়ান পাইথন ফ্রেমওয়ার্ক।_**

- [হোমপেজ](https://getwake.io/)
- [ডকুমেন্টেশন](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS কোড এক্সটেনশন](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_ওপেন সোর্স, মডুলার এবং অ্যাগনস্টিক ফ্রেমওয়ার্ক যা ডিসেন্ট্রালাইজড এপ্লিকেশন ডেভেলপারদের জন্য তাদের অ্যাপ্লিকেশনে ডিসেন্ট্রালাইজড আইডেন্টিটি এবং ভেরিফাইয়েবল ক্রেডেনশিয়াল তৈরি করা সহজ করে তোলে।_**

- [হোমপেজ](https://veramo.io/)
- [ডকুমেন্টেশন](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM প্যাকেজ](https://www.npmjs.com/package/@veramo/core)

## আরও পড়ুন {#further-reading}

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয় {#related-topics}

- [একটি স্থানীয় ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করুন](/developers/local-environment/)
