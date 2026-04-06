---
title: "ইথিরিয়াম গবেষণার সক্রিয় ক্ষেত্রসমূহ"
description: "উন্মুক্ত গবেষণার বিভিন্ন ক্ষেত্র অন্বেষণ করুন এবং কীভাবে যুক্ত হতে হয় তা জানুন।"
lang: bn
---

# ইথিরিয়াম গবেষণার সক্রিয় ক্ষেত্রসমূহ {#active-areas-of-ethereum-research}

ইথিরিয়ামের অন্যতম প্রধান শক্তি হলো একটি সক্রিয় গবেষণা এবং ইঞ্জিনিয়ারিং কমিউনিটি প্রতিনিয়ত এর উন্নতি সাধন করছে। বিশ্বব্যাপী অনেক উৎসাহী, দক্ষ মানুষ ইথিরিয়ামের অমীমাংসিত সমস্যাগুলোতে নিজেদের নিয়োজিত করতে চান, কিন্তু সেই সমস্যাগুলো কী তা খুঁজে বের করা সবসময় সহজ নয়। এই পেজটি ইথিরিয়ামের অত্যাধুনিক প্রযুক্তির একটি সাধারণ নির্দেশিকা হিসেবে মূল সক্রিয় গবেষণার ক্ষেত্রগুলোর রূপরেখা দেয়।

## ইথিরিয়াম গবেষণা কীভাবে কাজ করে {#how-ethereum-research-works}

ইথিরিয়াম গবেষণা উন্মুক্ত এবং স্বচ্ছ, যা [Decentralized Science (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science)-এর নীতিগুলোকে ধারণ করে। এর সংস্কৃতি হলো গবেষণার টুলস এবং ফলাফলগুলোকে যতটা সম্ভব উন্মুক্ত এবং ইন্টারেক্টিভ করা, উদাহরণস্বরূপ, এক্সিকিউটেবল নোটবুকের মাধ্যমে। ইথিরিয়াম গবেষণা দ্রুত এগিয়ে যায়, যেখানে নতুন আবিষ্কারগুলো প্রথাগত প্রকাশনার মাধ্যমে পিয়ার রিভিউর পর কমিউনিটিতে পৌঁছানোর পরিবর্তে [ethresear.ch](https://ethresear.ch/)-এর মতো ফোরামে উন্মুক্তভাবে পোস্ট এবং আলোচনা করা হয়।

## সাধারণ গবেষণার রিসোর্সসমূহ {#general-research-resources}

নির্দিষ্ট বিষয় যাই হোক না কেন, ইথিরিয়াম গবেষণার প্রচুর তথ্য [ethresear.ch](https://ethresear.ch) এবং [Eth R&D Discord channel](https://discord.gg/qGpsxSA)-এ পাওয়া যায়। এগুলো হলো প্রাথমিক স্থান যেখানে ইথিরিয়াম গবেষকরা সর্বশেষ ধারণা এবং উন্নয়নের সুযোগ নিয়ে আলোচনা করেন।

মে 2022-এ [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) কর্তৃক প্রকাশিত এই রিপোর্টটি ইথিরিয়াম রোডম্যাপ-এর একটি ভালো ওভারভিউ প্রদান করে।

## ফান্ডিংয়ের উৎসসমূহ {#sources-of-funding}

আপনি ইথিরিয়াম গবেষণায় যুক্ত হতে পারেন এবং এর জন্য পারিশ্রমিক পেতে পারেন! উদাহরণস্বরূপ, [the Ethereum Foundation](/foundation/) সম্প্রতি একটি [Academic Grants funding round](https://esp.ethereum.foundation/academic-grants) পরিচালনা করেছে। আপনি সক্রিয় এবং আসন্ন ফান্ডিংয়ের সুযোগ সম্পর্কে তথ্য [the Ethereum grants page](/community/grants/)-এ পেতে পারেন।

## প্রটোকল গবেষণা {#protocol-research}

প্রটোকল গবেষণা ইথিরিয়ামের বেস লেয়ার নিয়ে কাজ করে - এটি এমন কিছু নিয়মের সেট যা নির্ধারণ করে কীভাবে নোড সংযুক্ত হয়, যোগাযোগ করে, ইথিরিয়াম ডাটা আদান-প্রদান ও সংরক্ষণ করে এবং ব্লকচেইন-এর স্টেট সম্পর্কে কনসেন্সাস-এ পৌঁছায়। প্রটোকল গবেষণা দুটি শীর্ষ-স্তরের ক্যাটাগরিতে বিভক্ত: কনসেন্সাস এবং এক্সিকিউশন।

### কনসেন্সাস {#consensus}

কনসেন্সাস গবেষণা [ইথিরিয়ামের প্রুফ-অফ-স্টেক মেকানিজম](/developers/docs/consensus-mechanisms/pos/)-এর সাথে সম্পর্কিত। কনসেন্সাস গবেষণার কিছু উদাহরণ হলো:

- দুর্বলতা চিহ্নিত করা এবং প্যাচ করা;
- ক্রিপ্টোইকোনমিক নিরাপত্তা পরিমাপ করা;
- ক্লায়েন্ট ইমপ্লিমেন্টেশনের নিরাপত্তা বা পারফরম্যান্স বৃদ্ধি করা;
- এবং লাইট ক্লায়েন্ট তৈরি করা।

ভবিষ্যৎমুখী গবেষণার পাশাপাশি, ইথিরিয়ামের উল্লেখযোগ্য উন্নতির জন্য প্রটোকল-এর কিছু মৌলিক রিডিজাইন, যেমন সিঙ্গেল স্লট ফাইনালিটি, নিয়ে গবেষণা করা হচ্ছে। অধিকন্তু, কনসেন্সাস ক্লায়েন্ট-গুলোর মধ্যে পিয়ার-টু-পিয়ার নেটওয়ার্কিংয়ের দক্ষতা, নিরাপত্তা এবং মনিটরিংও গুরুত্বপূর্ণ গবেষণার বিষয়।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading}

- [প্রুফ-অফ-স্টেক পরিচিতি](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG পেপার](https://arxiv.org/abs/1710.09437)
- [Casper-FFG এক্সপ্লেইনার](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Gasper পেপার](https://arxiv.org/abs/2003.03052)

#### সাম্প্রতিক গবেষণা {#recent-research}

- [Ethresear.ch কনসেন্সাস](https://ethresear.ch/c/consensus/29)
- [এভেইলএবিলিটি/ফাইনালিটি ডিল্যামা](https://arxiv.org/abs/2009.04987)
- [সিঙ্গেল স্লট ফাইনালিটি](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [প্রপোজার-বিল্ডার সেপারেশন](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### এক্সিকিউশন {#execution}

এক্সিকিউশন লেয়ার লেনদেন সম্পন্ন করা, [ইথিরিয়াম ভার্চুয়াল মেশিন (EVM)](/developers/docs/evm/) চালানো এবং কনসেন্সাস লেয়ার-এ পাঠানোর জন্য এক্সিকিউশন পেলোড তৈরি করার সাথে সম্পর্কিত। গবেষণার অনেক সক্রিয় ক্ষেত্র রয়েছে, যার মধ্যে অন্তর্ভুক্ত:

- লাইট ক্লায়েন্ট সাপোর্ট তৈরি করা;
- গ্যাস লিমিট নিয়ে গবেষণা করা;
- এবং নতুন ডাটা স্ট্রাকচার (যেমন, Verkle Tries) অন্তর্ভুক্ত করা।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-1}

- [EVM পরিচিতি](/developers/docs/evm)
- [Ethresear.ch এক্সিকিউশন লেয়ার](https://ethresear.ch/c/execution-layer-research/37)

#### সাম্প্রতিক গবেষণা {#recent-research-1}

- [ডাটাবেস অপ্টিমাইজেশন](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [স্টেট এক্সপায়ারি](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [স্টেট এক্সপায়ারি-এর পথ](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Verkle এবং স্টেট এক্সপায়ারি প্রস্তাবনা](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [হিস্ট্রি ম্যানেজমেন্ট](https://eips.ethereum.org/EIPS/eip-4444)
- [Verkle Trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [ডাটা এভেইলএবিলিটি স্যাম্পলিং](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## ক্লায়েন্ট ডেভেলপমেন্ট {#client-development}

ইথিরিয়াম ক্লায়েন্ট হলো ইথিরিয়াম প্রটোকল-এর ইমপ্লিমেন্টেশন। ক্লায়েন্ট ডেভেলপমেন্ট প্রটোকল গবেষণার ফলাফলগুলোকে এই ক্লায়েন্টগুলোতে তৈরি করার মাধ্যমে বাস্তবে রূপ দেয়। ক্লায়েন্ট ডেভেলপমেন্টের মধ্যে ক্লায়েন্ট স্পেসিফিকেশন আপডেট করা এবং নির্দিষ্ট ইমপ্লিমেন্টেশন তৈরি করা অন্তর্ভুক্ত।

একটি ইথিরিয়াম নোড চালানোর জন্য দুটি সফটওয়্যার প্রয়োজন:

1. ব্লকচেইন-এর হেড ট্র্যাক করতে, গসিপ ব্লকস এবং কনসেন্সাস লজিক পরিচালনা করতে একটি কনসেন্সাস ক্লায়েন্ট
2. ইথিরিয়াম ভার্চুয়াল মেশিন সাপোর্ট করতে এবং লেনদেন ও স্মার্ট কন্ট্রাক্ট এক্সিকিউট করতে একটি এক্সিকিউশন ক্লায়েন্ট

নোড এবং ক্লায়েন্ট সম্পর্কে আরও বিস্তারিত জানতে এবং বর্তমান সকল ক্লায়েন্ট ইমপ্লিমেন্টেশনের তালিকার জন্য [নোডস এবং ক্লায়েন্টস পেজ](/developers/docs/nodes-and-clients/) দেখুন। আপনি [হিস্ট্রি পেজ](/ethereum-forks/)-এ ইথিরিয়ামের সকল আপগ্রেডের ইতিহাসও পেতে পারেন।

### এক্সিকিউশন ক্লায়েন্টস {#execution-clients}

- [এক্সিকিউশন ক্লায়েন্ট স্পেসিফিকেশন](https://github.com/ethereum/execution-specs)
- [এক্সিকিউশন API স্পেক](https://github.com/ethereum/execution-apis)

### কনসেন্সাস ক্লায়েন্টস {#consensus-clients}

- [কনসেন্সাস ক্লায়েন্ট স্পেসিফিকেশন](https://github.com/ethereum/consensus-specs)
- [বিকন API স্পেসিফিকেশন](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## স্কেলিং এবং পারফরম্যান্স {#scaling-and-performance}

ইথিরিয়াম স্কেলিং করা ইথিরিয়াম গবেষকদের জন্য একটি বড় ফোকাসের জায়গা। বর্তমান পদ্ধতিগুলোর মধ্যে রয়েছে লেনদেনগুলোকে রোলআপস-এ অফলোড করা এবং ডাটা ব্লব ব্যবহার করে সেগুলোকে যতটা সম্ভব সস্তা করা। ইথিরিয়াম স্কেলিং সম্পর্কে প্রাথমিক তথ্য আমাদের [স্কেলিং পেজ](/developers/docs/scaling)-এ পাওয়া যাবে।

### লেয়ার ২ {#layer-2}

বর্তমানে বেশ কয়েকটি লেয়ার ২ প্রটোকল রয়েছে যা লেনদেন ব্যাচ করার এবং সেগুলোকে ইথিরিয়াম লেয়ার 1-এ সুরক্ষিত করার জন্য বিভিন্ন কৌশল ব্যবহার করে ইথিরিয়ামকে স্কেল করে। এটি প্রচুর গবেষণা এবং উন্নয়নের সম্ভাবনা সহ একটি খুব দ্রুত বর্ধনশীল বিষয়।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-2}

- [লেয়ার ২ পরিচিতি](/layer-2/)
- [Polynya: রোলআপস, DA এবং মডুলার চেইন](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### সাম্প্রতিক গবেষণা {#recent-research-2}

- [সিকোয়েন্সার-এর জন্য Arbitrum-এর ফেয়ার-অর্ডারিং](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch লেয়ার ২](https://ethresear.ch/c/layer-2/32)
- [রোলআপ-কেন্দ্রিক রোডম্যাপ](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### ব্রিজ {#bridges}

লেয়ার ২-এর একটি নির্দিষ্ট ক্ষেত্র যেখানে আরও গবেষণা এবং উন্নয়ন প্রয়োজন তা হলো নিরাপদ এবং পারফরম্যান্ট ব্রিজ। এর মধ্যে বিভিন্ন লেয়ার ২-এর মধ্যকার ব্রিজ এবং লেয়ার 1 ও লেয়ার ২-এর মধ্যকার ব্রিজ অন্তর্ভুক্ত। এটি গবেষণার একটি বিশেষভাবে গুরুত্বপূর্ণ ক্ষেত্র কারণ ব্রিজগুলো সাধারণত হ্যাকারদের লক্ষ্যবস্তু হয়।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-3}

- [ব্লকচেইন ব্রিজ পরিচিতি](/bridges/)
- [ব্রিজ নিয়ে Vitalik](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [ব্লকচেইন ব্রিজ আর্টিকেল](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [ব্রিজে লক করা ভ্যালু](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### সাম্প্রতিক গবেষণা {#recent-research-3}

- [ভ্যালিডেটিং ব্রিজ](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### শার্ডিং {#sharding}

ইথিরিয়ামের ব্লকচেইন শার্ডিং করা দীর্ঘকাল ধরে ডেভেলপমেন্ট রোডম্যাপ-এর অংশ। তবে, নতুন স্কেলিং সমাধান যেমন "Danksharding" বর্তমানে কেন্দ্রবিন্দুতে রয়েছে।

সম্পূর্ণ Danksharding-এর পূর্বসূরি যা Proto-Danksharding নামে পরিচিত, তা Cancun-Deneb ("Dencun") নেটওয়ার্ক আপগ্রেডের সাথে লাইভ হয়েছে।

[Dencun আপগ্রেড সম্পর্কে আরও জানুন](/roadmap/dencun/)

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-4}

- [Proto-Danksharding নোটস](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless Danksharding ভিডিও](https://www.youtube.com/watch?v=N5p0TB77flM)
- [ইথিরিয়াম শার্ডিং রিসার্চ কমপেনডিয়াম](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### সাম্প্রতিক গবেষণা {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [শার্ডিং এবং ডাটা এভেইলএবিলিটি স্যাম্পলিং নিয়ে Vitalik](https://hackmd.io/@vbuterin/sharding_proposal)

### হার্ডওয়্যার {#hardware}

সাধারণ হার্ডওয়্যারে [নোড চালানো](/developers/docs/nodes-and-clients/run-a-node/) ইথিরিয়ামকে ডিসেন্ট্রালাইজড রাখার জন্য মৌলিক। তাই, নোড চালানোর জন্য হার্ডওয়্যারের প্রয়োজনীয়তা কমানোর বিষয়ে সক্রিয় গবেষণা একটি গুরুত্বপূর্ণ গবেষণার ক্ষেত্র।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-5}

- [ARM-এ ইথিরিয়াম](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### সাম্প্রতিক গবেষণা {#recent-research-5}

- [FPGA-তে ecdsa](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## নিরাপত্তা {#security}

নিরাপত্তা একটি বিস্তৃত বিষয় যার মধ্যে স্প্যাম/স্ক্যাম প্রতিরোধ, ওয়ালেট নিরাপত্তা, হার্ডওয়্যার নিরাপত্তা, ক্রিপ্টো-ইকোনমিক নিরাপত্তা, বাগ হান্টিং এবং অ্যাপ্লিকেশন ও ক্লায়েন্ট সফটওয়্যার টেস্টিং এবং কি-ম্যানেজমেন্ট অন্তর্ভুক্ত থাকতে পারে। এই ক্ষেত্রগুলোতে জ্ঞানে অবদান রাখা মূলধারার গ্রহণকে উদ্দীপিত করতে সাহায্য করবে।

### ক্রিপ্টোগ্রাফি এবং ZKP {#cryptography--zkp}

ইথিরিয়াম এবং এর অ্যাপ্লিকেশনগুলোতে গোপনীয়তা এবং নিরাপত্তা তৈরির জন্য জিরো-নলেজ প্রুফ (ZKP) এবং ক্রিপ্টোগ্রাফি অত্যন্ত গুরুত্বপূর্ণ। জিরো-নলেজ তুলনামূলকভাবে একটি নতুন কিন্তু দ্রুত অগ্রসরমান ক্ষেত্র যেখানে অনেক উন্মুক্ত গবেষণা এবং উন্নয়নের সুযোগ রয়েছে। কিছু সম্ভাবনার মধ্যে রয়েছে [Keccak হ্যাশিং এ্যালগরিদম](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)-এর আরও দক্ষ ইমপ্লিমেন্টেশন তৈরি করা, বর্তমানে বিদ্যমান পলিনোমিয়াল কমিটমেন্টের চেয়ে ভালো কিছু খুঁজে বের করা বা ecdsa পাবলিক কি জেনারেশন এবং সিগনেচার ভেরিফিকেশন সার্কিটের খরচ কমানো।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-6}

- [0xparc ব্লগ](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [জিরো নলেজ পডকাস্ট](https://zeroknowledge.fm/)

#### সাম্প্রতিক গবেষণা {#recent-research-6}

- [এলিপটিক কার্ভ ক্রিপ্টোগ্রাফিতে সাম্প্রতিক অগ্রগতি](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### ওয়ালেটস {#wallets}

ইথিরিয়াম ওয়ালেটগুলো ব্রাউজার এক্সটেনশন, ডেস্কটপ এবং মোবাইল অ্যাপ বা ইথিরিয়ামে স্মার্ট কন্ট্রাক্ট হতে পারে। সোশ্যাল রিকভারি ওয়ালেট নিয়ে সক্রিয় গবেষণা চলছে যা ব্যক্তিগত-ব্যবহারকারীর কি ম্যানেজমেন্টের সাথে যুক্ত কিছু ঝুঁকি কমায়। ওয়ালেট ডেভেলপমেন্টের সাথে যুক্ত হলো একাউন্ট অ্যাবস্ট্রাকশনের বিকল্প রূপ নিয়ে গবেষণা, যা উদীয়মান গবেষণার একটি গুরুত্বপূর্ণ ক্ষেত্র।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-7}

- [ওয়ালেট পরিচিতি](/wallets/)
- [ওয়ালেট নিরাপত্তা পরিচিতি](/security/)
- [Ethresear.ch নিরাপত্তা](https://ethresear.ch/tag/security)
- [EIP-2938 একাউন্ট অ্যাবস্ট্রাকশন](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 একাউন্ট অ্যাবস্ট্রাকশন](https://eips.ethereum.org/EIPS/eip-4337)

#### সাম্প্রতিক গবেষণা {#recent-research-7}

- [ভ্যালিডেশন ফোকাসড স্মার্ট কন্ট্রাক্ট ওয়ালেটস](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [একাউন্টের ভবিষ্যৎ](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH এবং AUTHCALL অপকোডস](https://eips.ethereum.org/EIPS/eip-3074)
- [একটি EOA এডড্রেস-এ কোড পাবলিশ করা](https://eips.ethereum.org/EIPS/eip-5003)

## কমিউনিটি, শিক্ষা এবং আউটরিচ {#community-education-and-outreach}

ইথিরিয়ামে নতুন ব্যবহারকারীদের অনবোর্ড করার জন্য নতুন শিক্ষামূলক রিসোর্স এবং আউটরিচের পদ্ধতি প্রয়োজন। এর মধ্যে ব্লগ পোস্ট এবং আর্টিকেল, বই, পডকাস্ট, মিম, টিচিং রিসোর্স, ইভেন্ট এবং অন্য যেকোনো কিছু অন্তর্ভুক্ত থাকতে পারে যা কমিউনিটি তৈরি করে, নতুনদের স্বাগত জানায় এবং ইথিরিয়াম সম্পর্কে মানুষকে শিক্ষিত করে।

### UX/UI {#uxui}

ইথিরিয়ামে আরও বেশি মানুষকে অনবোর্ড করতে, ইকোসিস্টেমকে অবশ্যই UX/UI উন্নত করতে হবে। এর জন্য ডিজাইনার এবং প্রোডাক্ট বিশেষজ্ঞদের ওয়ালেট এবং অ্যাপের ডিজাইন পুনরায় পরীক্ষা করতে হবে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### সাম্প্রতিক গবেষণা {#recent-research-8}

- [ওয়েব3 ডিজাইন ডিসকর্ড](https://discord.gg/FsCFPMTSm9)
- [ওয়েব3 ডিজাইন প্রিন্সিপালস](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX আলোচনা](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### অর্থনীতি {#economics}

ইথিরিয়ামে অর্থনীতি গবেষণা বিস্তৃতভাবে দুটি পদ্ধতি অনুসরণ করে: অর্থনৈতিক প্রণোদনার উপর নির্ভরশীল মেকানিজমের নিরাপত্তা যাচাই করা ("মাইক্রোইকোনমিক্স") এবং প্রটোকল, অ্যাপ্লিকেশন এবং ব্যবহারকারীদের মধ্যে ভ্যালু ফ্লো বিশ্লেষণ করা ("ম্যাক্রোইকোনমিক্স")। ইথিরিয়ামের নেটিভ অ্যাসেট (ইথার) এবং এর উপর তৈরি টোকেনগুলোর (উদাহরণস্বরূপ NFTs এবং ERC20 টোকেন) সাথে সম্পর্কিত জটিল ক্রিপ্টো-ইকোনমিক ফ্যাক্টর রয়েছে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-9}

- [রোবাস্ট ইনসেন্টিভস গ্রুপ](https://rig.ethereum.org/)
- [Devconnect-এ ETHconomics ওয়ার্কশপ](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### সাম্প্রতিক গবেষণা {#recent-research-9}

- [EIP1559-এর এম্পিরিক্যাল বিশ্লেষণ](https://arxiv.org/abs/2201.05574)
- [সার্কুলেটিং সাপ্লাই ইকুইলিব্রিয়াম](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV পরিমাপ: বন কতটা অন্ধকার?](https://arxiv.org/abs/2101.05511)

### ব্লকস্পেস এবং ফি মার্কেটস {#blockspace-fee-markets}

ব্লকস্পেস মার্কেটস এন্ড-ইউজার লেনদেনের অন্তর্ভুক্তি নিয়ন্ত্রণ করে, সরাসরি ইথিরিয়ামে (লেয়ার 1) বা ব্রিজড নেটওয়ার্কে, যেমন, রোলআপস (লেয়ার ২)। ইথিরিয়ামে, লেনদেনগুলো EIP-1559 হিসেবে ইন-প্রটোকল ডিপ্লয় করা ফি মার্কেটে সাবমিট করা হয়, যা চেইনকে স্প্যাম এবং প্রাইসিং কনজেশন থেকে রক্ষা করে। উভয় লেয়ারেই, লেনদেনগুলো এক্সটার্নালিটি তৈরি করতে পারে, যা ম্যাক্সিমাল এক্সট্রাক্টবল ভ্যালু (MEV) নামে পরিচিত, যা এই এক্সটার্নালিটিগুলো ক্যাপচার বা পরিচালনা করার জন্য নতুন মার্কেট স্ট্রাকচার তৈরি করে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-10}

- [ইথিরিয়াম ব্লকচেইন-এর জন্য ট্রানজেকশন ফি মেকানিজম ডিজাইন: EIP-1559-এর একটি অর্থনৈতিক বিশ্লেষণ (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559-এর সিমুলেশন (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [ফার্স্ট প্রিন্সিপালস থেকে রোলআপ ইকোনমিক্স](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: ডিসেন্ট্রালাইজড এক্সচেঞ্জ-এ ফ্রন্টরানিং, ট্রানজেকশন রিঅর্ডারিং এবং কনসেন্সাস ইনস্ট্যাবিলিটি](https://arxiv.org/abs/1904.05234)

#### সাম্প্রতিক গবেষণা {#recent-research-10}

- [মাল্টিডাইমেনশনাল EIP-1559 ভিডিও প্রেজেন্টেশন](https://youtu.be/QbR4MTgnCko)
- [ক্রস ডোমেইন MEV](http://arxiv.org/abs/2112.01472)
- [MEV অকশনস](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### প্রুফ-অফ-স্টেক ইনসেন্টিভস {#proof-of-stake-incentives}

ভ্যালিডেটরস অসৎ আচরণের বিরুদ্ধে জামানত হিসেবে ইথিরিয়ামের নেটিভ অ্যাসেট (ইথার) ব্যবহার করে। এর ক্রিপ্টোইকোনমিক্স নেটওয়ার্ক-এর নিরাপত্তা নির্ধারণ করে। অত্যাধুনিক ভ্যালিডেটরস স্পষ্ট আক্রমণ চালানোর জন্য ইনসেন্টিভ লেয়ারের সূক্ষ্ম বিষয়গুলোকে কাজে লাগাতে সক্ষম হতে পারে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-11}

- [ইথিরিয়াম ইকোনমিক্স মাস্টারক্লাস এবং ইকোনমিক মডেল](https://github.com/CADLabs/ethereum-economic-model)
- [PoS ইনসেন্টিভস-এর সিমুলেশন (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### সাম্প্রতিক গবেষণা {#recent-research-11}

- [প্রপোজার/বিল্ডার সেপারেশন (PBS)-এর অধীনে লেনদেনের সেন্সরশিপ রেজিস্ট্যান্স বৃদ্ধি করা](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [PoS ইথিরিয়ামে তিনটি আক্রমণ](https://arxiv.org/abs/2110.10086)

### লিকুইড স্টেকিং এবং ডেরিভেটিভস {#liquid-staking-and-derivatives}

লিকুইড স্টেকিং 32 ETH-এর কম থাকা ব্যবহারকারীদের ইথার সোয়াপ করে স্টেকিং ইল্ড পাওয়ার সুযোগ দেয়, যা স্টেক করা ইথারের প্রতিনিধিত্বকারী একটি টোকেন হিসেবে DeFi-তে ব্যবহার করা যেতে পারে। তবে, লিকুইড স্টেকিংয়ের সাথে যুক্ত ইনসেন্টিভ এবং মার্কেট ডায়নামিক্স এখনও আবিষ্কৃত হচ্ছে, সেইসাথে ইথিরিয়ামের নিরাপত্তার উপর এর প্রভাবও (যেমন, সেন্ট্রালাইজেশন ঝুঁকি)।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-12}

- [Ethresear.ch লিকুইড স্টেকিং](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: ট্রাস্টলেস ইথিরিয়াম স্টেকিংয়ের পথ](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: স্টেকিং প্রটোকল পরিচিতি](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### সাম্প্রতিক গবেষণা {#recent-research-12}

- [Lido থেকে উইথড্রয়াল পরিচালনা করা](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [উইথড্রয়াল ক্রেডেনশিয়ালস](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [লিকুইড স্টেকিং ডেরিভেটিভস-এর ঝুঁকি](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## টেস্টিং {#testing}

### ফরমাল ভেরিফিকেশন {#formal-verification}

ফরমাল ভেরিফিকেশন হলো ইথিরিয়ামের কনসেন্সাস স্পেসিফিকেশনগুলো সঠিক এবং বাগ-মুক্ত কিনা তা যাচাই করার জন্য কোড লেখা। Python-এ লেখা স্পেসিফিকেশনের একটি এক্সিকিউটেবল ভার্সন রয়েছে যার রক্ষণাবেক্ষণ এবং উন্নয়ন প্রয়োজন। আরও গবেষণা স্পেসিফিকেশনের Python ইমপ্লিমেন্টেশন উন্নত করতে এবং এমন টুলস যোগ করতে সাহায্য করতে পারে যা আরও দৃঢ়ভাবে সঠিকতা যাচাই করতে এবং সমস্যাগুলো চিহ্নিত করতে পারে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-13}

- [ফরমাল ভেরিফিকেশন পরিচিতি](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [ফরমাল ভেরিফিকেশন (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### সাম্প্রতিক গবেষণা {#recent-research-13}

- [ডিপোজিট কন্টাক্ট-এর ফরমাল ভেরিফিকেশন](https://github.com/runtimeverification/deposit-contract-verification)
- [বিকন চেইন স্পেসিফিকেশন-এর ফরমাল ভেরিফিকেশন](https://github.com/runtimeverification/deposit-contract-verification)

## ডাটা সায়েন্স এবং অ্যানালিটিক্স {#data-science-and-analytics}

আরও ডাটা অ্যানালাইসিস টুলস এবং ড্যাশবোর্ডের প্রয়োজন রয়েছে যা ইথিরিয়ামের অ্যাক্টিভিটি এবং নেটওয়ার্ক-এর স্বাস্থ্য সম্পর্কে বিস্তারিত তথ্য দেয়।

### ব্যাকগ্রাউন্ড রিডিং {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [ক্লায়েন্ট ডাইভার্সিটি ড্যাশবোর্ড](https://clientdiversity.org/)

#### সাম্প্রতিক গবেষণা {#recent-research-14}

- [রোবাস্ট ইনসেন্টিভস গ্রুপ ডাটা অ্যানালাইসিস](https://rig.ethereum.org/)

## অ্যাপস এবং টুলিং {#apps-and-tooling}

অ্যাপ্লিকেশন লেয়ার এমন প্রোগ্রামগুলোর একটি বৈচিত্র্যময় ইকোসিস্টেমকে সাপোর্ট করে যা ইথিরিয়ামের বেস লেয়ারে লেনদেন সেটেল করে। ডেভেলপমেন্ট টিমগুলো গুরুত্বপূর্ণ Web2 অ্যাপের কম্পোজেবল, পারমিশনলেস এবং সেন্সরশিপ-রেজিস্ট্যান্ট ভার্সন তৈরি করতে বা সম্পূর্ণ নতুন ওয়েব3-নেটিভ কনসেপ্ট তৈরি করতে ইথিরিয়ামকে কাজে লাগানোর নতুন উপায় প্রতিনিয়ত খুঁজে বের করছে। একই সময়ে, নতুন টুলিং তৈরি করা হচ্ছে যা ইথিরিয়ামে ডিএ্যাপস তৈরি করাকে কম জটিল করে তোলে।

### DeFi {#defi}

ডিসেন্ট্রালাইজড ফাইন্যান্স (DeFi) হলো ইথিরিয়ামের উপর তৈরি অ্যাপ্লিকেশনগুলোর অন্যতম প্রধান একটি শ্রেণি। DeFi-এর লক্ষ্য হলো কম্পোজেবল "মানি লেগোস" তৈরি করা যা ব্যবহারকারীদের স্মার্ট কন্ট্রাক্ট ব্যবহার করে ক্রিপ্টো-অ্যাসেট সংরক্ষণ, স্থানান্তর, ধার দেওয়া, ধার নেওয়া এবং বিনিয়োগ করার সুযোগ দেয়। DeFi একটি দ্রুত অগ্রসরমান ক্ষেত্র যা প্রতিনিয়ত আপডেট হচ্ছে। নিরাপদ, দক্ষ এবং অ্যাক্সেসযোগ্য প্রটোকল নিয়ে গবেষণা ক্রমাগত প্রয়োজন।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi কী?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### সাম্প্রতিক গবেষণা {#recent-research-15}

- [ডিসেন্ট্রালাইজড ফাইন্যান্স, সেন্ট্রালাইজড ওনারশিপ?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: সাব-ডলার লেনদেনের পথ](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAOs {#daos}

ইথিরিয়ামের একটি প্রভাবশালী ইউজ কেস হলো DAO ব্যবহারের মাধ্যমে ডিসেন্ট্রালাইজড উপায়ে সংগঠিত হওয়ার ক্ষমতা। ইথিরিয়ামে DAO-গুলোকে কীভাবে তৈরি এবং ব্যবহার করা যায় তা নিয়ে প্রচুর সক্রিয় গবেষণা চলছে, যাতে উন্নত ধরনের গভর্নেন্স কার্যকর করা যায়, একটি ট্রাস্ট-মিনিমাইজড কোঅর্ডিনেশন টুল হিসেবে, যা প্রথাগত কর্পোরেশন এবং সংস্থাগুলোর বাইরে মানুষের বিকল্পগুলোকে ব্যাপকভাবে প্রসারিত করে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-16}

- [DAO পরিচিতি](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### সাম্প্রতিক গবেষণা {#recent-research-16}

- [DAO ইকোসিস্টেম ম্যাপিং](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### ডেভেলপার টুলস {#developer-tools}

ইথিরিয়াম ডেভেলপারদের জন্য টুলস দ্রুত উন্নত হচ্ছে। এই সাধারণ ক্ষেত্রে করার মতো প্রচুর সক্রিয় গবেষণা এবং উন্নয়ন রয়েছে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-17}

- [প্রোগ্রামিং ভাষা অনুযায়ী টুলিং](/developers/docs/programming-languages/)
- [ডেভেলপার ফ্রেমওয়ার্কস](/developers/docs/frameworks/)
- [কনসেন্সাস ডেভেলপার টুলস তালিকা](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [টোকেন স্ট্যান্ডার্ডস](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM টুলস](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### সাম্প্রতিক গবেষণা {#recent-research-17}

- [Eth R&D Discord কনসেন্সাস টুলিং চ্যানেল](https://discordapp.com/channels/595666850260713488/746343380900118528)

### ওরাকল {#oracles}

ওরাকল পারমিশনলেস এবং ডিসেন্ট্রালাইজড উপায়ে অফচেইন ডাটা ব্লকচেইন-এ ইমপোর্ট করে। এই ডাটা অনচেইন-এ পাওয়ার ফলে ডিএ্যাপস বাস্তব-জগতের ঘটনা যেমন বাস্তব-জগতের অ্যাসেটের দামের ওঠানামা, অফচেইন অ্যাপের ইভেন্ট বা এমনকি আবহাওয়ার পরিবর্তনের প্রতি প্রতিক্রিয়াশীল হতে পারে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-18}

- [ওরাকল পরিচিতি](/developers/docs/oracles/)

#### সাম্প্রতিক গবেষণা {#recent-research-18}

- [ব্লকচেইন ওরাকল-এর জরিপ](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink হোয়াইট পেপার](https://chain.link/whitepaper)

### অ্যাপ নিরাপত্তা {#app-security}

ইথিরিয়ামে হ্যাকগুলো সাধারণত প্রটোকল-এর পরিবর্তে পৃথক অ্যাপ্লিকেশনগুলোর দুর্বলতাগুলোকে কাজে লাগায়। হ্যাকার এবং অ্যাপ ডেভেলপাররা নতুন আক্রমণ এবং প্রতিরক্ষা ব্যবস্থা তৈরি করার জন্য একটি অস্ত্র প্রতিযোগিতায় আবদ্ধ। এর মানে হলো অ্যাপগুলোকে হ্যাক থেকে নিরাপদ রাখতে সবসময় গুরুত্বপূর্ণ গবেষণা এবং উন্নয়ন প্রয়োজন।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-19}

- [Wormhole এক্সপ্লয়েট রিপোর্ট](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [ইথিরিয়াম কন্ট্রাক্ট হ্যাক পোস্ট-মর্টেমগুলোর তালিকা](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### সাম্প্রতিক গবেষণা {#recent-research-19}

- [Ethresear.ch অ্যাপ্লিকেশনস](https://ethresear.ch/c/applications/18)

### টেকনোলজি স্ট্যাক {#technology-stack}

সম্পূর্ণ ইথিরিয়াম টেক স্ট্যাক ডিসেন্ট্রালাইজড করা একটি গুরুত্বপূর্ণ গবেষণার ক্ষেত্র। বর্তমানে, ইথিরিয়ামে ডিএ্যাপস-গুলোর সাধারণত সেন্ট্রালাইজেশনের কিছু পয়েন্ট থাকে কারণ তারা সেন্ট্রালাইজড টুলিং বা ইনফ্রাস্ট্রাকচারের উপর নির্ভর করে।

#### ব্যাকগ্রাউন্ড রিডিং {#background-reading-20}

- [ইথিরিয়াম স্ট্যাক](/developers/docs/ethereum-stack/)
- [Coinbase: ওয়েব3 স্ট্যাক পরিচিতি](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [স্মার্ট কন্ট্রাক্ট পরিচিতি](/developers/docs/smart-contracts/)
- [ডিসেন্ট্রালাইজড স্টোরেজ পরিচিতি](/developers/docs/storage/)

#### সাম্প্রতিক গবেষণা {#recent-research-20}

- [স্মার্ট কন্ট্রাক্ট কম্পোজেবিলিটি](/developers/docs/smart-contracts/composability/)