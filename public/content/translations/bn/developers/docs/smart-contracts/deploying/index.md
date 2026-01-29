---
title: স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করা
description: পূর্বশর্ত, টুলস এবং ডিপ্লয়মেন্টের ধাপসহ কীভাবে ইথেরিয়াম নেটওয়ার্কে স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করতে হয় তা শিখুন।
lang: bn
---

একটি ইথেরিয়াম নেটওয়ার্কের ব্যবহারকারীদের কাছে উপলব্ধ করার জন্য আপনাকে আপনার স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করতে হবে।

একটি স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করতে, আপনাকে শুধুমাত্র কোনো প্রাপক নির্দিষ্ট না করে স্মার্ট কন্ট্র্যাক্টের কম্পাইল করা কোডসহ একটি ইথেরিয়াম লেনদেন পাঠাতে হবে।

## পূর্বশর্ত {#prerequisites}

স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করার আগে আপনার [ইথেরিয়াম নেটওয়ার্ক](/developers/docs/networks/), [লেনদেন](/developers/docs/transactions/) এবং [স্মার্ট কন্ট্র্যাক্টের অ্যানাটমি](/developers/docs/smart-contracts/anatomy/) বোঝা উচিত।

একটি কন্ট্র্যাক্ট ডিপ্লয় করতেও ইথার (ETH) খরচ হয় যেহেতু সেগুলি ব্লকচেইনে সংরক্ষিত থাকে, তাই আপনার ইথেরিয়ামের [গ্যাস এবং ফি](/developers/docs/gas/) এর সাথে পরিচিত হওয়া উচিত।

অবশেষে, এটি ডিপ্লয় করার আগে আপনাকে আপনার কন্ট্র্যাক্ট কম্পাইল করতে হবে, তাই নিশ্চিত করুন যে আপনি [স্মার্ট কন্ট্র্যাক্ট কম্পাইল করা](/developers/docs/smart-contracts/compiling/) সম্পর্কে পড়েছেন।

## কীভাবে একটি স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করবেন {#how-to-deploy-a-smart-contract}

### আপনার যা প্রয়োজন হবে {#what-youll-need}

- আপনার কন্ট্র্যাক্টের বাইটকোড – এটি [কম্পাইলেশন](/developers/docs/smart-contracts/compiling/) এর মাধ্যমে তৈরি হয়
- গ্যাসের জন্য ETH – আপনি অন্যান্য লেনদেনের মতো আপনার গ্যাস লিমিট সেট করবেন তাই সচেতন থাকুন যে একটি সাধারণ ETH ট্রান্সফারের চেয়ে কন্ট্র্যাক্ট ডিপ্লয়মেন্টের জন্য অনেক বেশি গ্যাস প্রয়োজন।
- একটি ডিপ্লয়মেন্ট স্ক্রিপ্ট বা প্লাগইন
- একটি [ইথেরিয়াম নোড](/developers/docs/nodes-and-clients/) এ অ্যাক্সেস, হয় আপনার নিজের নোড চালিয়ে, একটি পাবলিক নোডের সাথে সংযোগ করে, অথবা একটি [নোড সার্ভিস](/developers/docs/nodes-and-clients/nodes-as-a-service/) ব্যবহার করে একটি API কী এর মাধ্যমে।

### একটি স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করার পদক্ষেপ {#steps-to-deploy}

সংশ্লিষ্ট পদক্ষেপগুলি সংশ্লিষ্ট ডেভেলপমেন্ট ফ্রেমওয়ার্কের উপর নির্ভর করবে। উদাহরণস্বরূপ, আপনি [আপনার কন্ট্র্যাক্ট ডিপ্লয় করার উপর Hardhat-এর ডকুমেন্টেশন](https://hardhat.org/docs/tutorial/deploying) অথবা [একটি স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় এবং ভেরিফাই করার উপর Foundry-এর ডকুমেন্টেশন](https://book.getfoundry.sh/forge/deploying) দেখতে পারেন। একবার ডিপ্লয় করা হলে, আপনার কন্ট্র্যাক্টের অন্যান্য [অ্যাকাউন্ট](/developers/docs/accounts/) এর মতো একটি ইথেরিয়াম অ্যাড্রেস থাকবে এবং [সোর্স কোড ভেরিফিকেশন টুলস](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) ব্যবহার করে এটি ভেরিফাই করা যেতে পারে।

## সম্পর্কিত টুলস {#related-tools}

**Remix - _Remix IDE ইথেরিয়ামের মতো ব্লকচেইনগুলির জন্য স্মার্ট কন্ট্র্যাক্ট ডেভেলপ, ডিপ্লয় এবং পরিচালনা করার অনুমতি দেয়_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 ডেভেলপমেন্ট প্ল্যাটফর্ম যা স্মার্ট কন্ট্র্যাক্ট ডেভেলপ, পরীক্ষা, পর্যবেক্ষণ এবং পরিচালনা করার জন্য ডিবাগিং, অবজার্ভেবিলিটি এবং অবকাঠামো তৈরির ব্লক সরবরাহ করে_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _আপনার ইথেরিয়াম সফটওয়্যার কম্পাইল, ডিপ্লয়, পরীক্ষা এবং ডিবাগ করার জন্য একটি ডেভেলপমেন্ট এনভায়রনমেন্ট_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [আপনার কন্ট্র্যাক্ট ডিপ্লয় করার ডকুমেন্টেশন](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _একটিমাত্র কমান্ড ব্যবহার করে সহজেই যেকোনো EVM সামঞ্জস্যপূর্ণ চেইনে যেকোনো কন্ট্র্যাক্ট ডিপ্লয় করুন_**

- [নথিপত্র](https://portal.thirdweb.com/deploy/)

**Crossmint - _স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করতে, ক্রেডিট-কার্ড এবং ক্রস চেইন পেমেন্ট সক্ষম করতে এবং NFT তৈরি, বিতরণ, বিক্রি, সংরক্ষণ এবং সম্পাদনা করতে API ব্যবহার করার জন্য এন্টারপ্রাইজ-গ্রেড web3 ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [crossmint.com](https://www.crossmint.com)
- [নথিপত্র](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করা](/developers/tutorials/deploying-your-first-smart-contract/) _– একটি ইথেরিয়াম টেস্ট নেটওয়ার্কে আপনার প্রথম স্মার্ট কন্ট্র্যাক্ট ডিপ্লয় করার একটি পরিচিতি।_
- [হ্যালো ওয়ার্ল্ড | স্মার্ট কন্ট্র্যাক্ট টিউটোরিয়াল](/developers/tutorials/hello-world-smart-contract/) _– ইথেরিয়ামে একটি বেসিক স্মার্ট কন্ট্র্যাক্ট তৈরি এবং ডিপ্লয় করার জন্য একটি সহজবোধ্য টিউটোরিয়াল।_
- [Solidity থেকে অন্যান্য কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করুন](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– কীভাবে একটি বিদ্যমান কন্ট্রাক্ট থেকে একটি স্মার্ট কন্ট্র্যাক্ট ডেপ্লয় করবেন এবং এটির সাথে ইন্টারঅ্যাক্ট করবেন।_
- [কীভাবে আপনার কন্ট্র্যাক্টের আকার কমাবেন](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- কীভাবে আপনার কন্ট্র্যাক্টের আকার কমিয়ে সীমার নিচে রাখবেন এবং গ্যাসে সাশ্রয় করবেন_

## আরও পড়ুন {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat দিয়ে আপনার কন্ট্র্যাক্ট ডিপ্লয় করা](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয় {#related-topics}

- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)
- [একটি ইথেরিয়াম নোড চালান](/developers/docs/nodes-and-clients/run-a-node/)
- [নোড-অ্যাস-এ-সার্ভিস](/developers/docs/nodes-and-clients/nodes-as-a-service)
