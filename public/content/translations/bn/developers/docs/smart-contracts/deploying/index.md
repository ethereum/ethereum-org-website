---
title: "স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা"
description: "ইথিরিয়াম নেটওয়ার্কে স্মার্ট কন্ট্রাক্ট কীভাবে ডিপ্লয় করতে হয়, এর পূর্বশর্ত, টুলস এবং ডিপ্লয়মেন্টের ধাপগুলো সম্পর্কে জানুন।"
lang: bn
---

ইথিরিয়াম নেটওয়ার্কের ব্যবহারকারীদের জন্য আপনার স্মার্ট কন্ট্রাক্টটি সহজলভ্য করতে আপনাকে এটি ডিপ্লয় করতে হবে।

একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার জন্য, আপনাকে কেবল কোনো প্রাপক নির্দিষ্ট না করেই স্মার্ট কন্ট্রাক্টের কম্পাইল করা কোড সম্বলিত একটি ইথিরিয়াম লেনদেন পাঠাতে হবে।

## পূর্বশর্ত {#prerequisites}

স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার আগে আপনার [ইথিরিয়াম নেটওয়ার্ক](/developers/docs/networks/), [লেনদেন](/developers/docs/transactions/) এবং [স্মার্ট কন্ট্রাক্টের গঠন](/developers/docs/smart-contracts/anatomy/) সম্পর্কে বোঝা উচিত।

একটি কন্ট্রাক্ট ডিপ্লয় করতে ইথার (ETH) খরচ হয় কারণ এগুলো ব্লকচেইনে সংরক্ষিত থাকে, তাই আপনার ইথিরিয়ামের [গ্যাস এবং ফি](/developers/docs/gas/) সম্পর্কে ধারণা থাকা উচিত।

সবশেষে, ডিপ্লয় করার আগে আপনাকে আপনার কন্ট্রাক্টটি কম্পাইল করতে হবে, তাই নিশ্চিত করুন যে আপনি [স্মার্ট কন্ট্রাক্ট কম্পাইল করা](/developers/docs/smart-contracts/compiling/) সম্পর্কে পড়েছেন।

## কীভাবে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করবেন {#how-to-deploy-a-smart-contract}

### আপনার যা যা প্রয়োজন হবে {#what-youll-need}

- আপনার কন্ট্রাক্টের বাইটকোড – এটি [কম্পাইলেশন](/developers/docs/smart-contracts/compiling/)-এর মাধ্যমে তৈরি হয়
- গ্যাসের জন্য ETH – আপনি অন্যান্য লেনদেনের মতোই আপনার গ্যাস লিমিট সেট করবেন, তাই মনে রাখবেন যে কন্ট্রাক্ট ডিপ্লয়মেন্টের জন্য একটি সাধারণ ETH ট্রান্সফারের চেয়ে অনেক বেশি গ্যাস প্রয়োজন হয়
- একটি ডিপ্লয়মেন্ট স্ক্রিপ্ট বা প্লাগইন
- একটি [ইথিরিয়াম নোড](/developers/docs/nodes-and-clients/)-এ অ্যাক্সেস, যা আপনি নিজের নোড চালিয়ে, কোনো পাবলিক নোডের সাথে সংযুক্ত হয়ে, অথবা [নোড সার্ভিস](/developers/docs/nodes-and-clients/nodes-as-a-service/) ব্যবহার করে API কি-এর মাধ্যমে পেতে পারেন

### স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার ধাপসমূহ {#steps-to-deploy}

এর নির্দিষ্ট ধাপগুলো নির্ভর করবে আপনি কোন ডেভেলপমেন্ট ফ্রেমওয়ার্ক ব্যবহার করছেন তার ওপর। উদাহরণস্বরূপ, আপনি [কন্ট্রাক্ট ডিপ্লয় করার বিষয়ে Hardhat-এর ডকুমেন্টেশন](https://hardhat.org/docs/tutorial/deploying) অথবা [স্মার্ট কন্ট্রাক্ট ডিপ্লয় এবং ভেরিফাই করার বিষয়ে Foundry-এর ডকুমেন্টেশন](https://book.getfoundry.sh/forge/deploying) দেখতে পারেন। একবার ডিপ্লয় হয়ে গেলে, অন্যান্য [একাউন্ট](/developers/docs/accounts/)-এর মতো আপনার কন্ট্রাক্টটিরও একটি ইথিরিয়াম এডড্রেস থাকবে এবং এটি [সোর্স কোড ভেরিফিকেশন টুলস](/developers/docs/smart-contracts/verifying/#source-code-verification-tools) ব্যবহার করে ভেরিফাই করা যাবে।

## সম্পর্কিত টুলস {#related-tools}

**Remix - _Remix IDE ইথিরিয়ামের মতো ব্লকচেইনগুলোর জন্য স্মার্ট কন্ট্রাক্ট ডেভেলপ, ডিপ্লয় এবং পরিচালনা করার সুবিধা দেয়_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _ওয়েব3 ডেভেলপমেন্ট প্ল্যাটফর্ম যা স্মার্ট কন্ট্রাক্ট ডেভেলপ, টেস্টিং, মনিটরিং এবং পরিচালনার জন্য ডিবাগিং, অবজারভেবিলিটি এবং ইনফ্রাস্ট্রাকচার বিল্ডিং ব্লক প্রদান করে_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _আপনার ইথিরিয়াম সফটওয়্যার কম্পাইল, ডিপ্লয়, টেস্ট এবং ডিবাগ করার জন্য একটি ডেভেলপমেন্ট এনভায়রনমেন্ট_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [আপনার কন্ট্রাক্ট ডিপ্লয় করার বিষয়ে ডক্স](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _একটি মাত্র কমান্ড ব্যবহার করে যেকোনো EVM সামঞ্জস্যপূর্ণ চেইনে সহজেই যেকোনো কন্ট্রাক্ট ডিপ্লয় করুন_**

- [ডকুমেন্টেশন](https://portal.thirdweb.com/deploy/)

**Crossmint - _স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে, ক্রেডিট-কার্ড এবং ক্রস চেইন পেমেন্ট সক্ষম করতে এবং NFT তৈরি, বিতরণ, বিক্রি, সংরক্ষণ এবং সম্পাদনা করার জন্য API ব্যবহার করতে এন্টারপ্রাইজ-গ্রেড ওয়েব3 ডেভেলপমেন্ট প্ল্যাটফর্ম।_**

- [crossmint.com](https://www.crossmint.com)
- [ডকুমেন্টেশন](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [ব্লগ](https://blog.crossmint.com)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা](/developers/tutorials/deploying-your-first-smart-contract/) _– একটি ইথিরিয়াম টেস্টনেট-এ আপনার প্রথম স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার পরিচিতি।_
- [হ্যালো ওয়ার্ল্ড | স্মার্ট কন্ট্রাক্ট টিউটোরিয়াল](/developers/tutorials/hello-world-smart-contract/) _– ইথিরিয়ামে একটি বেসিক স্মার্ট কন্ট্রাক্ট তৈরি এবং ডিপ্লয় করার জন্য একটি সহজ টিউটোরিয়াল।_
- [সলিডিটি থেকে অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– কীভাবে একটি বিদ্যমান কন্ট্রাক্ট থেকে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয়।_
- [কীভাবে আপনার কন্ট্রাক্টের আকার ছোট করবেন](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- কীভাবে আপনার কন্ট্রাক্টের আকার কমিয়ে সীমার মধ্যে রাখবেন এবং গ্যাস বাঁচাবেন_

## আরও পড়ুন {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat দিয়ে আপনার কন্ট্রাক্ট ডিপ্লয় করা](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_আপনাকে সাহায্য করেছে এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন? এই পেজটি এডিট করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয়গুলো {#related-topics}

- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)
- [একটি ইথিরিয়াম নোড রান করুন](/developers/docs/nodes-and-clients/run-a-node/)
- [নোডস-অ্যাজ-এ-সার্ভিস](/developers/docs/nodes-and-clients/nodes-as-a-service)