---
title: "Dapp ডেভেলপমেন্ট ফ্রেমওয়ার্ক"
description: "ফ্রেমওয়ার্কের সুবিধাগুলো অন্বেষণ করুন এবং উপলব্ধ বিকল্পগুলোর তুলনা করুন।"
lang: bn
---

## ফ্রেমওয়ার্ক পরিচিতি {#introduction-to-frameworks}

একটি পূর্ণাঙ্গ বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করতে বিভিন্ন প্রযুক্তির প্রয়োজন হয়। সফ্টওয়্যার ফ্রেমওয়ার্কগুলোতে প্রয়োজনীয় অনেক বৈশিষ্ট্য অন্তর্ভুক্ত থাকে বা আপনার পছন্দসই টুলগুলো বেছে নেওয়ার জন্য সহজ প্লাগইন সিস্টেম প্রদান করে।

ফ্রেমওয়ার্কগুলো ডিফল্টভাবেই অনেক কার্যকারিতা নিয়ে আসে, যেমন:

- একটি লোকাল ব্লকচেইন ইনস্ট্যান্স চালু করার বৈশিষ্ট্য।
- আপনার স্মার্ট কন্ট্রাক্ট কম্পাইল এবং টেস্ট করার ইউটিলিটি।
- একই প্রজেক্ট/রিপোজিটরির মধ্যে আপনার ব্যবহারকারী-মুখী অ্যাপ্লিকেশন তৈরি করার জন্য ক্লায়েন্ট ডেভেলপমেন্ট অ্যাড-অন।
- ইথেরিয়াম নেটওয়ার্কের সাথে সংযোগ স্থাপন এবং কন্ট্রাক্ট ডিপ্লয় করার কনফিগারেশন, তা স্থানীয়ভাবে চলমান কোনো ইনস্ট্যান্স হোক বা ইথেরিয়ামের কোনো পাবলিক নেটওয়ার্ক।
- বিকেন্দ্রীকৃত অ্যাপ ডিস্ট্রিবিউশন - IPFS-এর মতো স্টোরেজ বিকল্পগুলোর সাথে ইন্টিগ্রেশন।

## পূর্বশর্ত {#prerequisites}

ফ্রেমওয়ার্ক নিয়ে বিস্তারিত জানার আগে, আমরা আপনাকে প্রথমে [dapp](/developers/docs/dapps/) এবং [ইথেরিয়াম স্ট্যাক](/developers/docs/ethereum-stack/)-এর পরিচিতি পড়ার পরামর্শ দিচ্ছি।

## উপলব্ধ ফ্রেমওয়ার্কসমূহ {#available-frameworks}

**Foundry** - **_Foundry হলো ইথেরিয়াম অ্যাপ্লিকেশন ডেভেলপমেন্টের জন্য একটি অত্যন্ত দ্রুত, পোর্টেবল এবং মডুলার টুলকিট_**

- [Foundry ইনস্টল করুন](https://book.getfoundry.sh/)
- [Foundry বই](https://book.getfoundry.sh/)
- [টেলিগ্রাম-এ Foundry কমিউনিটি চ্যাট](https://t.me/foundry_support)
- [অসাধারণ Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_পেশাদারদের জন্য ইথেরিয়াম ডেভেলপমেন্ট এনভায়রনমেন্ট।_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Python ব্যবহারকারী, ডেটা সায়েন্টিস্ট এবং সিকিউরিটি প্রফেশনালদের জন্য স্মার্ট কন্ট্রাক্ট ডেভেলপমেন্ট টুল।_**

- [ডকুমেন্টেশন](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM-এ ব্লকচেইন অ্যাপ্লিকেশন ডেভেলপ করার একটি প্ল্যাটফর্ম।_**

- [হোমপেজ](https://www.web3labs.com/web3j-sdk)
- [ডকুমেন্টেশন](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-ভিত্তিক ব্লকচেইনগুলোর জন্য অ্যাসিনক্রোনাস, হাই-পারফরম্যান্স Kotlin/Java/Android লাইব্রেরি।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [উদাহরণ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ডিসকর্ড](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_এক কমান্ডে ইথেরিয়াম-চালিত অ্যাপ তৈরি করুন। এটি বেছে নেওয়ার জন্য বিভিন্ন UI ফ্রেমওয়ার্ক এবং বিকেন্দ্রীভূত অর্থব্যবস্থা (DeFi) টেমপ্লেটের একটি বিস্তৃত অফার নিয়ে আসে।_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [টেমপ্লেট](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-ETH -** **_Web3-এর জন্য Ethers.js + Hardhat + React কম্পোনেন্ট এবং হুক: স্মার্ট কন্ট্রাক্ট দ্বারা চালিত বিকেন্দ্রীকৃত অ্যাপ্লিকেশন তৈরি শুরু করার জন্য আপনার প্রয়োজনীয় সবকিছু।_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 ডেভেলপমেন্ট প্ল্যাটফর্ম যা ব্লকচেইন ডেভেলপারদের স্মার্ট কন্ট্রাক্ট তৈরি, টেস্ট, ডিবাগ, মনিটর এবং পরিচালনা করতে এবং dapp-এর UX উন্নত করতে সক্ষম করে।_**

- [ওয়েবসাইট](https://tenderly.co/)
- [ডকুমেন্টেশন](https://docs.tenderly.co/)

**The Graph -** **_ব্লকচেইন ডেটা দক্ষতার সাথে কোয়েরি করার জন্য The Graph।_**

- [ওয়েবসাইট](https://thegraph.com/)
- [টিউটোরিয়াল](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_ইথেরিয়াম ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [ডিসকর্ড](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_ইথেরিয়াম ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [ডিসকর্ড](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_আমাদের শক্তিশালী SDK এবং CLI ব্যবহার করে Web3 অ্যাপ্লিকেশন তৈরি করুন যা আপনার স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করতে পারে।_**

- [ডকুমেন্টেশন](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (ইথেরিয়াম এবং অন্যান্য) ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [ডিসকর্ড](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_এন্টারপ্রাইজ-গ্রেড Web3 ডেভেলপমেন্ট প্ল্যাটফর্ম, যা আপনাকে সমস্ত প্রধান চেইন, EVM চেইন (এবং অন্যান্য)-এ NFT অ্যাপ্লিকেশন তৈরি করতে দেয়।_**

- [ওয়েবসাইট](https://www.crossmint.com)
- [ডকুমেন্টেশন](https://docs.crossmint.com)
- [ডিসকর্ড](https://discord.com/invite/crossmint)

**Brownie -** **_Python-ভিত্তিক ডেভেলপমেন্ট এনভায়রনমেন্ট এবং টেস্টিং ফ্রেমওয়ার্ক।_**

- [ডকুমেন্টেশন](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie বর্তমানে রক্ষণাবেক্ষণ করা হচ্ছে না**

**ওপেনজেপেলিন SDK -** **_চূড়ান্ত স্মার্ট কন্ট্রাক্ট টুলকিট: স্মার্ট কন্ট্রাক্ট ডেভেলপ, কম্পাইল, আপগ্রেড, ডিপ্লয় করা এবং এর সাথে ইন্টারঅ্যাক্ট করতে সাহায্য করার জন্য টুলের একটি স্যুট।_**

- [ওপেনজেপেলিন Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [কমিউনিটি ফোরাম](https://forum.openzeppelin.com/c/support/17)
- **ওপেনজেপেলিন SDK-এর ডেভেলপমেন্ট শেষ হয়েছে**

**Catapulta -** **_মাল্টি-চেইন স্মার্ট কন্ট্রাক্ট ডিপ্লয়মেন্ট টুল, ব্লক এক্সপ্লোরারগুলোতে ভেরিফিকেশন স্বয়ংক্রিয় করে, ডিপ্লয় করা স্মার্ট কন্ট্রাক্টগুলোর ট্র্যাক রাখে এবং ডিপ্লয়মেন্ট রিপোর্ট শেয়ার করে, Foundry এবং Hardhat প্রজেক্টগুলোর জন্য প্লাগ-অ্যান্ড-প্লে।_**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (Covalent দ্বারা চালিত) -** **_GoldRush ডেভেলপার, বিশ্লেষক এবং এন্টারপ্রাইজগুলোর জন্য সবচেয়ে ব্যাপক ব্লকচেইন ডেটা API স্যুট অফার করে। আপনি একটি বিকেন্দ্রীভূত অর্থব্যবস্থা (DeFi) ড্যাশবোর্ড, একটি ওয়ালেট, একটি ট্রেডিং বট, একটি এআই এজেন্ট বা একটি কমপ্লায়েন্স প্ল্যাটফর্ম তৈরি করুন না কেন, ডেটা API-গুলো আপনার প্রয়োজনীয় অপরিহার্য অনচেইন ডেটাতে দ্রুত, নির্ভুল এবং ডেভেলপার-বান্ধব অ্যাক্সেস প্রদান করে_**

- [ওয়েবসাইট](https://goldrush.dev/)
- [ডকুমেন্টেশন](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [ডিসকর্ড](https://www.covalenthq.com/discord/)

**Wake -** **_কন্ট্রাক্ট টেস্টিং, ফাজিং, ডিপ্লয়মেন্ট, ভালনারেবিলিটি স্ক্যানিং এবং কোড নেভিগেশনের জন্য অল-ইন-ওয়ান Python ফ্রেমওয়ার্ক।_**

- [হোমপেজ](https://getwake.io/)
- [ডকুমেন্টেশন](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code এক্সটেনশন](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_ওপেন সোর্স, মডুলার এবং অ্যাগনোস্টিক ফ্রেমওয়ার্ক যা বিকেন্দ্রীকৃত অ্যাপ্লিকেশন ডেভেলপারদের জন্য তাদের অ্যাপ্লিকেশনে বিকেন্দ্রীকৃত পরিচয় এবং যাচাইযোগ্য শংসাপত্র তৈরি করা সহজ করে তোলে।_**

- [হোমপেজ](https://veramo.io/)
- [ডকুমেন্টেশন](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [ডিসকর্ড](https://discord.com/invite/FRRBdjemHV)
- [NPM প্যাকেজ](https://www.npmjs.com/package/@veramo/core)

## আরও পড়ুন {#further-reading}

_আপনাকে সাহায্য করেছে এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## সম্পর্কিত টপিকগুলো {#related-topics}

- [একটি লোকাল ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করুন](/developers/local-environment/)

## টিউটোরিয়াল: ইথেরিয়ামে ডেভেলপমেন্ট ফ্রেমওয়ার্ক {#tutorials}

- [নতুনদের জন্য হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট – ফুলস্ট্যাক](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhat ব্যবহার করে একটি হ্যালো ওয়ার্ল্ড স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করুন, তারপর এটিকে একটি ফ্রন্টএন্ডের সাথে সংযুক্ত করুন।_