---
title: সকল ইথেরিয়াম ফর্কের টাইমলাইন (2014 থেকে বর্তমান)
description: প্রধান মাইলফলক, রিলিজ এবং ফর্ক সহ ইথেরিয়াম ব্লকচেইনের একটি ইতিহাস।
lang: bn
sidebarDepth: 1
authors: ["নিক্সো"]
---

[ইথেরিয়াম](/) ব্লকচেইনের সমস্ত প্রধান মাইলফলক, ফর্ক এবং আপডেটের একটি টাইমলাইন।

<ExpandableCard title="ফর্ক কী?" contentPreview="ইথেরিয়াম প্রোটোকলের নিয়মের পরিবর্তন, যার মধ্যে প্রায়শই পরিকল্পিত প্রযুক্তিগত আপগ্রেড অন্তর্ভুক্ত থাকে।">

ফর্ক হলো যখন নেটওয়ার্কে বড় ধরনের প্রযুক্তিগত আপগ্রেড বা পরিবর্তনের প্রয়োজন হয় – এগুলো সাধারণত [ইথেরিয়াম ইমপ্রুভমেন্ট প্রপোজাল (EIPs)](/eips/) থেকে উদ্ভূত হয় এবং প্রোটোকলের "নিয়ম" পরিবর্তন করে।

ঐতিহ্যবাহী, কেন্দ্রীয়ভাবে নিয়ন্ত্রিত সফ্টওয়্যারে যখন আপগ্রেডের প্রয়োজন হয়, তখন কোম্পানিটি শেষ-ব্যবহারকারীর জন্য কেবল একটি নতুন সংস্করণ প্রকাশ করে। ব্লকচেইন ভিন্নভাবে কাজ করে কারণ এর কোনো কেন্দ্রীয় মালিকানা নেই। নতুন ফর্ক নিয়মগুলো বাস্তবায়ন করতে [ইথেরিয়াম ক্লায়েন্টদের](/developers/docs/nodes-and-clients/) অবশ্যই তাদের সফ্টওয়্যার আপডেট করতে হবে। এছাড়া ব্লক নির্মাতাদের (প্রুফ-অফ-ওয়ার্ক জগতে মাইনার, প্রুফ-অফ-স্টেক জগতে ভ্যালিডেটর) এবং নোডগুলোকে অবশ্যই নতুন নিয়মের বিপরীতে ব্লক তৈরি এবং যাচাই করতে হবে। [কনসেনসাস মেকানিজম সম্পর্কে আরও জানুন](/developers/docs/consensus-mechanisms/)

এই নিয়ম পরিবর্তনগুলো নেটওয়ার্কে একটি অস্থায়ী বিভাজন তৈরি করতে পারে। নতুন বা পুরানো নিয়ম অনুযায়ী নতুন ব্লক তৈরি হতে পারে। ফর্কগুলো সাধারণত আগে থেকেই সম্মত হয় যাতে ক্লায়েন্টরা একযোগে পরিবর্তনগুলো গ্রহণ করে এবং আপগ্রেডসহ ফর্কটি মূল চেইন হয়ে ওঠে। তবে, বিরল ক্ষেত্রে, ফর্ক নিয়ে মতবিরোধের কারণে নেটওয়ার্ক স্থায়ীভাবে বিভক্ত হতে পারে – যার সবচেয়ে উল্লেখযোগ্য উদাহরণ হলো <a href="#dao-fork">DAO ফর্ক</a>-এর মাধ্যমে ইথেরিয়াম ক্লাসিক তৈরি হওয়া।

</ExpandableCard>

<ExpandableCard title="কেন কিছু আপগ্রেডের একাধিক নাম থাকে?" contentPreview="আপগ্রেডের নামগুলো একটি প্যাটার্ন অনুসরণ করে">

ইথেরিয়ামের অন্তর্নিহিত সফ্টওয়্যারটি দুটি অংশে বিভক্ত, যা [এক্সিকিউশন লেয়ার](/glossary/#execution-layer) এবং [কনসেনসাস লেয়ার](/glossary/#consensus-layer) নামে পরিচিত।

**এক্সিকিউশন আপগ্রেডের নামকরণ**

2021 সাল থেকে, **এক্সিকিউশন লেয়ার**-এর আপগ্রেডগুলোর নামকরণ কালানুক্রমিকভাবে [পূর্ববর্তী Devcon এবং Devconnect অবস্থানগুলোর](https://devcon.org/en/past-events/) শহরের নাম অনুসারে করা হয়েছে:

| আপগ্রেডের নাম | Devcon(nect) বছর | Devcon নম্বর | আপগ্রেডের তারিখ |
| -------------- | ----------------- | ------------- | ------------ |
| বার্লিন         | 2014              | 0             | 15 এপ্রিল, 2021 |
| লন্ডন         | 2015              | I             | 5 আগস্ট, 2021  |
| সাংহাই       | 2016              | II            | 12 এপ্রিল, 2023 |
| কানকুন         | 2017              | III           | 13 মার্চ, 2024 |
| প্রাগ         | 2018              | IV            | 7 মে, 2025  |
| ওসাকা          | 2019              | V             | 3 ডিসেম্বর, 2025  |
| **আমস্টারডাম**  | 2022              | Devconnect    | TBD - পরবর্তী   |
| _বোগোটা_       | 2022              | VI            | TBD          |
| _ইস্তাম্বুল_     | 2023              | Devconnect    | TBD          |
| _ব্যাংকক_      | 2024              | VII           | TBD          |
| _বুয়েনস আইরেস_ | 2025              | Devconnect    | TBD          |
| _মুম্বাই_       | 2026              | VIII          | TBD          |

**কনসেনসাস আপগ্রেডের নামকরণ**

[বিকন চেইন](/glossary/#beacon-chain) চালু হওয়ার পর থেকে, **কনসেনসাস লেয়ার**-এর আপগ্রেডগুলোর নামকরণ বর্ণানুক্রমিকভাবে শুরু হওয়া মহাকাশীয় নক্ষত্রগুলোর নাম অনুসারে করা হয়েছে:

| আপগ্রেডের নাম                                              | আপগ্রেডের তারিখ |
| --------------------------------------------------------- | ------------ |
| বিকন চেইন জেনেসিস                                      | 1 ডিসেম্বর, 2020  |
| [আলটেয়ার](https://en.wikipedia.org/wiki/Altair)            | 27 অক্টোবর, 2021 |
| [বেলাট্রিক্স](https://en.wikipedia.org/wiki/Bellatrix)      | 6 সেপ্টেম্বর, 2022  |
| [ক্যাপেলা](https://en.wikipedia.org/wiki/Capella)          | 12 এপ্রিল, 2023 |
| [ডেনেব](https://en.wikipedia.org/wiki/Deneb)              | 13 মার্চ, 2024 |
| [ইলেক্ট্রা](<https://en.wikipedia.org/wiki/Electra_(star)) | 7 মে, 2025  |
| [ফুলু](<https://en.wikipedia.org/wiki/Fulu_(star))       | 3 ডিসেম্বর, 2025  |
| [**গ্লোয়াস**](https://en.wikipedia.org/wiki/WASP-13)        | TBD - পরবর্তী   |
| [_হেজে_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | TBD          |

**সম্মিলিত নামকরণ**

এক্সিকিউশন এবং কনসেনসাস আপগ্রেডগুলো প্রাথমিকভাবে ভিন্ন ভিন্ন সময়ে চালু করা হয়েছিল, কিন্তু 2022 সালে [দ্য মার্জ](/roadmap/merge/)-এর পর থেকে এগুলো একই সাথে স্থাপন করা হয়েছে। ফলস্বরূপ, একটি একক সংযুক্ত শব্দ ব্যবহার করে এই আপগ্রেডগুলোর উল্লেখ সহজ করার জন্য কথ্য পরিভাষাগুলোর উদ্ভব হয়েছে। এটি _সাংহাই-ক্যাপেলা_ আপগ্রেডের মাধ্যমে শুরু হয়েছিল, যা সাধারণত "**শ্যাপেলা**" নামে পরিচিত, এবং পরবর্তী আপগ্রেডগুলোর সাথে এটি অব্যাহত রয়েছে।

| এক্সিকিউশন আপগ্রেড | কনসেনসাস আপগ্রেড | সংক্ষিপ্ত নাম    |
| ----------------- | ----------------- | ------------- |
| সাংহাই          | ক্যাপেলা           | "শ্যাপেলা"    |
| কানকুন            | ডেনেব             | "Dencun"      |
| প্রাগ            | ইলেক্ট্রা           | "পেকট্রা"      |
| ওসাকা             | ফুলু              | "ফুসাকা"      |
| আমস্টারডাম         | গ্লোয়াস             | "গ্ল্যামস্টারডাম" |
| বোগোটা            | হেজে              | "হেগোটা"      |

</ExpandableCard>

অতীতের কিছু বিশেষভাবে গুরুত্বপূর্ণ আপগ্রেড সম্পর্কে তথ্যে সরাসরি যান: [বিকন চেইন](/roadmap/beacon-chain/); [দ্য মার্জ](/roadmap/merge/); এবং [EIP-1559](#london)

ভবিষ্যতের প্রোটোকল আপগ্রেড খুঁজছেন? [ইথেরিয়াম রোডম্যাপে আসন্ন আপগ্রেডগুলো সম্পর্কে জানুন](/roadmap/)।

<Divider />

## 2025 {#2025}

### ফুলু-ওসাকা ("ফুসাকা") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[ফুসাকা সম্পর্কে আরও জানুন](/roadmap/fusaka/)

### প্রাগ-ইলেক্ট্রা ("পেকট্রা") {#pectra}

<NetworkUpgradeSummary name="pectra" />

প্রাগ-ইলেক্ট্রা ("পেকট্রা") আপগ্রেডে ইথেরিয়াম প্রোটোকলের বেশ কিছু উন্নতি অন্তর্ভুক্ত করা হয়েছে, যার লক্ষ্য হলো সকল ব্যবহারকারী, লেয়ার ২ (l2) নেটওয়ার্ক, স্টেকার এবং নোড অপারেটরদের অভিজ্ঞতা উন্নত করা।

কম্পাউন্ডিং ভ্যালিডেটর অ্যাকাউন্ট এবং এক্সিকিউশন উত্তোলন ঠিকানা ব্যবহার করে স্টেক করা ফান্ডের ওপর উন্নত নিয়ন্ত্রণের মাধ্যমে স্টেকিং-এ একটি আপগ্রেড এসেছে। EIP-7251 একটি একক ভ্যালিডেটরের জন্য সর্বোচ্চ কার্যকর ব্যালেন্স 2048-এ উন্নীত করেছে, যা স্টেকারদের জন্য মূলধনের দক্ষতা উন্নত করে। EIP-7002 একটি এক্সিকিউশন অ্যাকাউন্টকে নিরাপদে ভ্যালিডেটর অ্যাকশন ট্রিগার করতে সক্ষম করেছে, যার মধ্যে রয়েছে প্রস্থান করা, বা ফান্ডের কিছু অংশ উত্তোলন করা। এটি ETH স্টেকারদের অভিজ্ঞতা উন্নত করে এবং একই সাথে নোড অপারেটরদের জবাবদিহিতা জোরদার করতে সাহায্য করে।

আপগ্রেডের অন্যান্য অংশগুলো সাধারণ ব্যবহারকারীদের অভিজ্ঞতা উন্নত করার ওপর দৃষ্টি নিবদ্ধ করেছে। EIP-7702 একটি সাধারণ নন-স্মার্ট-কন্ট্রাক্ট অ্যাকাউন্টের ([EOA](/glossary/#eoa)) জন্য স্মার্ট কন্ট্রাক্টের মতো কোড এক্সিকিউট করার ক্ষমতা নিয়ে এসেছে। এটি প্রথাগত ইথেরিয়াম অ্যাকাউন্টগুলোর জন্য সীমাহীন নতুন কার্যকারিতা উন্মুক্ত করেছে, যেমন ট্রানজ্যাকশন ব্যাচিং, গ্যাস স্পনসরশিপ, বিকল্প প্রমাণীকরণ, প্রোগ্রামযোগ্য ব্যয় নিয়ন্ত্রণ, অ্যাকাউন্ট পুনরুদ্ধার প্রক্রিয়া এবং আরও অনেক কিছু।

<ExpandableCard title="পেকট্রা EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

উন্নত ব্যবহারকারীর অভিজ্ঞতা:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA অ্যাকাউন্ট কোড সেট করা</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ব্লব থ্রুপুট বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>কল ডেটা খরচ বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL কনফিগ ফাইলে ব্লব শিডিউল যোগ করা</em></li>
</ul>

উন্নত স্টেকিং অভিজ্ঞতা:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>এক্সিকিউশন লেয়ার ট্রিগারযোগ্য প্রস্থান</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>সাধারণ উদ্দেশ্যে এক্সিকিউশন লেয়ার রিকোয়েস্ট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>অনচেইনে ভ্যালিডেটর ডিপোজিট সরবরাহ করা</em></li>
</ul>

প্রোটোকল দক্ষতা এবং নিরাপত্তা উন্নতি:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 কার্ভ অপারেশনের জন্য প্রিকম্পাইল</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>স্টেটে ঐতিহাসিক ব্লক হ্যাশ সংরক্ষণ করা</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>সত্যায়নের বাইরে কমিটি সূচক সরানো</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [পেকট্রা কীভাবে স্টেকিং অভিজ্ঞতা উন্নত করবে](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [ইলেক্ট্রা আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [প্রাগ-ইলেক্ট্রা ("পেকট্রা") সাধারণ জিজ্ঞাসা (FAQ)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### কানকুন-ডেনেব ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### কানকুন সারাংশ {#cancun-summary}

কানকুন আপগ্রেডে ইথেরিয়ামের _এক্সিকিউশনের_ বেশ কিছু উন্নতি অন্তর্ভুক্ত রয়েছে যার লক্ষ্য হলো ডেনেব ঐক্যমত আপগ্রেডের সাথে সামঞ্জস্য রেখে স্কেলেবিলিটি উন্নত করা।

উল্লেখযোগ্যভাবে এর মধ্যে রয়েছে EIP-4844, যা **প্রোটো-ড্যাঙ্কশার্ডিং** নামে পরিচিত, এটি লেয়ার ২ (l2) রোলআপের জন্য ডেটা স্টোরেজের খরচ উল্লেখযোগ্যভাবে কমিয়ে দেয়। এটি ডেটা "ব্লব" প্রবর্তনের মাধ্যমে অর্জিত হয় যা রোলআপগুলোকে অল্প সময়ের জন্য মেইননেটে ডেটা পোস্ট করতে সক্ষম করে। এর ফলে লেয়ার ২ (l2) রোলআপের ব্যবহারকারীদের জন্য লেনদেন ফি উল্লেখযোগ্যভাবে কমে যায়।

<ExpandableCard title="কানকুন EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>ট্রানজিয়েন্ট স্টোরেজ অপকোড</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM-এ বিকন ব্লক রুট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>শার্ড ব্লব ট্রানজ্যাকশন (প্রোটো-ড্যাঙ্কশার্ডিং)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - মেমরি কপি করার নির্দেশিকা</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> শুধুমাত্র একই ট্রানজ্যাকশনে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> অপকোড</em></li>
</ul>

</ExpandableCard>

- [লেয়ার ২ (l2) রোলআপ](/layer-2/)
- [প্রোটো-ড্যাঙ্কশার্ডিং](/roadmap/scaling/#proto-danksharding)
- [ড্যাঙ্কশার্ডিং](/roadmap/danksharding/)
- [কানকুন আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### ডেনেব সারাংশ {#deneb-summary}

ডেনেব আপগ্রেডে ইথেরিয়ামের _ঐক্যমতের_ বেশ কিছু উন্নতি অন্তর্ভুক্ত রয়েছে যার লক্ষ্য হলো স্কেলেবিলিটি উন্নত করা। এই আপগ্রেডটি প্রোটো-ড্যাঙ্কশার্ডিং (EIP-4844) সক্ষম করার জন্য কানকুন এক্সিকিউশন আপগ্রেডের পাশাপাশি বিকন চেইনের অন্যান্য উন্নতির সাথে সামঞ্জস্য রেখে আসে।

আগে থেকে তৈরি করা স্বাক্ষরিত "স্বেচ্ছায় প্রস্থান বার্তা" আর মেয়াদোত্তীর্ণ হয় না, ফলে থার্ড-পার্টি নোড অপারেটরের সাথে তাদের ফান্ড স্টেক করা ব্যবহারকারীদের আরও বেশি নিয়ন্ত্রণ প্রদান করে। এই স্বাক্ষরিত প্রস্থান বার্তার মাধ্যমে, স্টেকাররা নোড পরিচালনার দায়িত্ব প্রতিনিধি হিসেবে দিতে পারে এবং একই সাথে কারও অনুমতি না নিয়েই যেকোনো সময় নিরাপদে প্রস্থান করার এবং তাদের ফান্ড উত্তোলন করার ক্ষমতা বজায় রাখতে পারে।

EIP-7514 ভ্যালিডেটরদের নেটওয়ার্কে যোগদানের "চার্ন" রেট প্রতি ইপকে আট (8)-এ সীমাবদ্ধ করে ETH-এর ইস্যুয়েন্স কঠোর করে। যেহেতু ETH ইস্যুয়েন্স মোট স্টেক করা ETH-এর সমানুপাতিক, তাই যোগদানকারী ভ্যালিডেটরদের সংখ্যা সীমিত করা নতুন ইস্যু করা ETH-এর _বৃদ্ধির হারকে_ সীমাবদ্ধ করে, পাশাপাশি নোড অপারেটরদের জন্য হার্ডওয়্যারের প্রয়োজনীয়তা হ্রাস করে, যা বিকেন্দ্রীকরণে সহায়তা করে।

<ExpandableCard title="ডেনেব EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM-এ বিকন ব্লক রুট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>শার্ড ব্লব ট্রানজ্যাকশন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>চিরস্থায়ীভাবে বৈধ স্বাক্ষরিত স্বেচ্ছায় প্রস্থান</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>সর্বোচ্চ সত্যায়ন অন্তর্ভুক্তির স্লট বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>সর্বোচ্চ ইপক চার্ন লিমিট যোগ করা</em></li>
</ul>

</ExpandableCard>

- [ডেনেব আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [কানকুন-ডেনেব ("Dencun") সাধারণ জিজ্ঞাসা (FAQ)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### সাংহাই-ক্যাপেলা ("শ্যাপেলা") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### সাংহাই সারসংক্ষেপ {#shanghai-summary}

সাংহাই আপগ্রেড এক্সিকিউশন লেয়ারে স্টেকিং উত্তোলন নিয়ে এসেছে। ক্যাপেলা আপগ্রেডের সাথে একত্রে, এটি ব্লকগুলোকে উত্তোলন অপারেশন গ্রহণ করতে সক্ষম করেছে, যা স্টেকারদের বিকন চেইন থেকে এক্সিকিউশন লেয়ারে তাদের ETH উত্তোলন করার অনুমতি দেয়।

<ExpandableCard title="সাংহাই EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> ঠিকানাকে ওয়ার্ম (warm) হিসেবে শুরু করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>নতুন <code>PUSH0</code> নির্দেশিকা</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>ইনিটকোড (initcode) সীমাবদ্ধ এবং পরিমাপ করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>অপারেশন হিসেবে বিকন চেইন পুশ উত্তোলন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> বাতিল করে</em></li>
</ul>

</ExpandableCard>

- [সাংহাই আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### ক্যাপেলা সারসংক্ষেপ {#capella-summary}

ক্যাপেলা আপগ্রেডটি ছিল কনসেনসাস লেয়ারের (বিকন চেইন) তৃতীয় প্রধান আপগ্রেড এবং এটি স্টেকিং উত্তোলন সক্ষম করেছিল। ক্যাপেলা এক্সিকিউশন লেয়ার আপগ্রেড, সাংহাই-এর সাথে একযোগে ঘটেছিল এবং স্টেকিং উত্তোলন কার্যকারিতা সক্ষম করেছিল।

এই কনসেনসাস লেয়ার আপগ্রেডটি সেইসব স্টেকারদের জন্য সক্ষমতা নিয়ে এসেছে যারা তাদের প্রাথমিক ডিপোজিটের সাথে প্রত্যাহারের প্রমাণপত্র প্রদান করেননি, যার ফলে উত্তোলন সক্ষম হয়।

এই আপগ্রেডটি স্বয়ংক্রিয় অ্যাকাউন্ট সুইপিং কার্যকারিতাও প্রদান করেছে, যা যেকোনো উপলব্ধ পুরস্কারের অর্থপ্রদান বা সম্পূর্ণ উত্তোলনের জন্য ভ্যালিডেটর অ্যাকাউন্টগুলোকে ক্রমাগত প্রক্রিয়া করে।

- [স্টেকিং উত্তোলন সম্পর্কে আরও জানুন](/staking/withdrawals/)।
- [ক্যাপেলা আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### প্যারিস (দ্য মার্জ) {#paris}

<NetworkUpgradeSummary name="paris" />

#### সারাংশ {#paris-summary}

প্যারিস আপগ্রেডটি ট্রিগার হয়েছিল যখন প্রুফ-অফ-ওয়ার্ক (PoW) ব্লকচেইন 58750000000000000000000-এর একটি [টার্মিনাল মোট কাঠিন্য](/glossary/#terminal-total-difficulty) অতিক্রম করে। এটি 15 সেপ্টেম্বর 2022-এ 15537393 নম্বর ব্লকে ঘটেছিল, যা পরবর্তী ব্লকে প্যারিস আপগ্রেডকে ট্রিগার করে। প্যারিস ছিল [দ্য মার্জ](/roadmap/merge/) ট্রানজিশন - এর প্রধান বৈশিষ্ট্য ছিল [প্রুফ-অফ-ওয়ার্ক](/developers/docs/consensus-mechanisms/pow) মাইনিং অ্যালগরিদম এবং এর সাথে যুক্ত ঐক্যমতের লজিক বন্ধ করা এবং এর পরিবর্তে [প্রুফ-অ-স্টেক (PoS)](/developers/docs/consensus-mechanisms/pos) চালু করা। প্যারিস নিজেই ছিল [এক্সিকিউশন ক্লায়েন্টগুলোর](/developers/docs/nodes-and-clients/#execution-clients) একটি আপগ্রেড (যা কনসেনসাস লেয়ারে বেলাট্রিক্সের সমতুল্য), যা তাদেরকে তাদের সংযুক্ত [কনসেনসাস ক্লায়েন্টগুলোর](/developers/docs/nodes-and-clients/#consensus-clients) কাছ থেকে নির্দেশ নিতে সক্ষম করেছিল। এর জন্য অভ্যন্তরীণ API পদ্ধতির একটি নতুন সেট সক্রিয় করার প্রয়োজন ছিল, যা সম্মিলিতভাবে [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) নামে পরিচিত। এটি নিঃসন্দেহে [হোমস্টেড](#homestead)-এর পর ইথেরিয়াম ইতিহাসে সবচেয়ে উল্লেখযোগ্য আপগ্রেড ছিল!

- [প্যারিস আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="প্যারিস EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>ঐক্যমতকে প্রুফ-অফ-স্টেকে আপগ্রেড করা</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY অপকোডকে PREVRANDAO দিয়ে প্রতিস্থাপন করা</em></li>
</ul>

</ExpandableCard>

---

### বেলাট্রিক্স {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### সারাংশ {#bellatrix-summary}

বেলাট্রিক্স আপগ্রেডটি ছিল [বিকন চেইন](/roadmap/beacon-chain)-এর জন্য দ্বিতীয় নির্ধারিত আপগ্রেড, যা চেইনটিকে [দ্য মার্জ](/roadmap/merge/)-এর জন্য প্রস্তুত করেছিল। এটি নিষ্ক্রিয়তা এবং স্ল্যাশযোগ্য অপরাধের জন্য ভ্যালিডেটরদের জরিমানাকে তাদের সম্পূর্ণ মূল্যে নিয়ে আসে। বেলাট্রিক্সে ফর্ক নির্বাচনের নিয়মগুলোর একটি আপডেটও অন্তর্ভুক্ত রয়েছে, যা চেইনটিকে দ্য মার্জ এবং শেষ প্রুফ-অফ-ওয়ার্ক ব্লক থেকে প্রথম প্রুফ-অফ-স্টেক ব্লকে রূপান্তরের জন্য প্রস্তুত করে। এর মধ্যে কনসেনসাস ক্লায়েন্টগুলোকে 58750000000000000000000-এর [টার্মিনাল মোট কাঠিন্য](/glossary/#terminal-total-difficulty) সম্পর্কে অবগত করা অন্তর্ভুক্ত রয়েছে।

- [বেলাট্রিক্স আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### গ্রে গ্লেসিয়ার {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### সারাংশ {#gray-glacier-summary}

গ্রে গ্লেসিয়ার নেটওয়ার্ক আপগ্রেডটি [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb)-কে তিন মাস পিছিয়ে দিয়েছে। এই আপগ্রেডে এটিই একমাত্র পরিবর্তন আনা হয়েছে, এবং এটি প্রকৃতির দিক থেকে [অ্যারো গ্লেসিয়ার](#arrow-glacier) এবং [মুইর গ্লেসিয়ার](#muir-glacier) আপগ্রেডের মতোই। [বাইজান্টিয়াম](#byzantium), [কনস্ট্যান্টিনোপল](#constantinople) এবং [লন্ডন](#london) নেটওয়ার্ক আপগ্রেডেও একই ধরনের পরিবর্তন করা হয়েছে।

- [EF ব্লগ - গ্রে গ্লেসিয়ার আপগ্রেডের ঘোষণা](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="গ্রে গ্লেসিয়ার EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>ডিফিকাল্টি বম্বকে 2022 সালের সেপ্টেম্বর পর্যন্ত বিলম্বিত করে</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### অ্যারো গ্লেসিয়ার {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### সারাংশ {#arrow-glacier-summary}

অ্যারো গ্লেসিয়ার নেটওয়ার্ক আপগ্রেড [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb)-কে কয়েক মাস পিছিয়ে দিয়েছে। এই আপগ্রেডে এটিই একমাত্র পরিবর্তন, এবং এটি প্রকৃতির দিক থেকে [মুইর গ্লেসিয়ার](#muir-glacier) আপগ্রেডের মতোই। [বাইজান্টিয়াম](#byzantium), [কনস্ট্যান্টিনোপল](#constantinople) এবং [লন্ডন](#london) নেটওয়ার্ক আপগ্রেডগুলোতেও একই ধরনের পরিবর্তন করা হয়েছিল।

- [ইএফ (EF) ব্লগ - অ্যারো গ্লেসিয়ার আপগ্রেড ঘোষণা](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - ইথেরিয়াম অ্যারো গ্লেসিয়ার আপগ্রেড](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="অ্যারো গ্লেসিয়ার EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>2022 সালের জুন মাস পর্যন্ত ডিফিকাল্টি বম্ব পিছিয়ে দেয়</em></li>
</ul>

</ExpandableCard>

---

### আলটেয়ার {#altair}

<NetworkUpgradeSummary name="altair" />

#### সারাংশ {#altair-summary}

আলটেয়ার আপগ্রেডটি ছিল [বিকন চেইন](/roadmap/beacon-chain)-এর জন্য প্রথম নির্ধারিত আপগ্রেড। এটি "সিঙ্ক কমিটি"-এর জন্য সমর্থন যোগ করেছে—যা লাইট ক্লায়েন্টদের সক্ষম করে, এবং দ্য মার্জ-এর দিকে উন্নয়ন অগ্রসর হওয়ার সাথে সাথে ভ্যালিডেটরদের নিষ্ক্রিয়তা এবং স্ল্যাশিং জরিমানাও বৃদ্ধি করেছে।

- [আলটেয়ার আপগ্রেডের স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> মজার তথ্য! {#altair-fun-fact}

আলটেয়ার ছিল প্রথম বড় নেটওয়ার্ক আপগ্রেড যার একটি নির্দিষ্ট রোলআউট সময় ছিল। এর আগের প্রতিটি আপগ্রেড প্রুফ-অফ-ওয়ার্ক (PoW) চেইনে একটি ঘোষিত ব্লক নম্বরের উপর ভিত্তি করে হয়েছিল, যেখানে ব্লক টাইম পরিবর্তিত হয়। বিকন চেইনে প্রুফ-অফ-ওয়ার্ক (PoW) সমাধানের প্রয়োজন হয় না, বরং এটি একটি সময়-ভিত্তিক ইপক সিস্টেমে কাজ করে যা 32টি বারো-সেকেন্ডের "স্লট" নিয়ে গঠিত, যেখানে ভ্যালিডেটররা ব্লক প্রস্তাব করতে পারে। এই কারণেই আমরা ঠিক জানতাম কখন আমরা 74,240 ইপক-এ পৌঁছাব এবং আলটেয়ার লাইভ হবে!

- [ব্লক টাইম](/developers/docs/blocks/#block-time)

---

### লন্ডন {#london}

<NetworkUpgradeSummary name="london" />

#### সারাংশ {#london-summary}

লন্ডন আপগ্রেড [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) চালু করেছে, যা লেনদেন ফি মার্কেটকে সংস্কার করেছে, এর পাশাপাশি গ্যাস রিফান্ড কীভাবে পরিচালনা করা হয় এবং [আইস এজ](/glossary/#ice-age) সময়সূচীতেও পরিবর্তন এনেছে।

#### লন্ডন আপগ্রেড / EIP-1559 কী ছিল? {#eip-1559}

লন্ডন আপগ্রেডের আগে, ইথেরিয়ামে নির্দিষ্ট আকারের ব্লক ছিল। নেটওয়ার্কের চাহিদা বেশি থাকার সময়ে, এই ব্লকগুলো পূর্ণ ক্ষমতায় কাজ করত। ফলস্বরূপ, ব্যবহারকারীদের প্রায়শই একটি ব্লকে অন্তর্ভুক্ত হওয়ার জন্য চাহিদা কমার অপেক্ষা করতে হতো, যা ব্যবহারকারীর অভিজ্ঞতাকে খারাপ করত। লন্ডন আপগ্রেড ইথেরিয়ামে পরিবর্তনশীল আকারের ব্লক চালু করেছে।

2021 সালের আগস্টের [লন্ডন আপগ্রেড](/ethereum-forks/#london)-এর মাধ্যমে ইথেরিয়াম নেটওয়ার্কে লেনদেন ফি গণনার পদ্ধতি পরিবর্তিত হয়েছে। লন্ডন আপগ্রেডের আগে, `base` এবং `priority` ফি আলাদা না করেই ফি গণনা করা হতো, যা ছিল নিম্নরূপ:

ধরা যাক অ্যালিসকে ববকে 1 ETH দিতে হবে। এই ট্রানজ্যাকশনে, গ্যাস লিমিট হলো 21,000 ইউনিট এবং গ্যাস প্রাইস হলো 200 Gwei।

মোট ফি হতো: `Gas units (limit) * Gas price per unit` অর্থাৎ `21,000 * 200 = 4,200,000 gwei` বা 0.0042 ETH

লন্ডন আপগ্রেডে [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)-এর বাস্তবায়ন লেনদেন ফি মেকানিজমকে আরও জটিল করে তুলেছে, কিন্তু গ্যাস ফি-কে আরও অনুমানযোগ্য করেছে, যার ফলে একটি আরও দক্ষ লেনদেন ফি মার্কেট তৈরি হয়েছে। ব্যবহারকারীরা ট্রানজ্যাকশনটি সম্পন্ন করার জন্য তারা কত টাকা দিতে ইচ্ছুক তার উপর ভিত্তি করে একটি `maxFeePerGas` দিয়ে ট্রানজ্যাকশন জমা দিতে পারেন, এই জেনে যে তারা গ্যাসের বাজার মূল্যের (`baseFeePerGas`) চেয়ে বেশি অর্থ প্রদান করবেন না এবং তাদের টিপ বাদে অতিরিক্ত যেকোনো অর্থ ফেরত পাবেন।

এই ভিডিওটি EIP-1559 এবং এর সুবিধাগুলো ব্যাখ্যা করে: [EIP-1559 ব্যাখ্যা](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [আপনি কি একজন বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) ডেভেলপার? আপনার লাইব্রেরি এবং টুলিং আপগ্রেড করতে ভুলবেন না।](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Ethereum Cat Herders-এর ব্যাখ্যাটি পড়ুন](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="লন্ডন EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>লেনদেন ফি মার্কেট উন্নত করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>একটি ব্লক থেকে <code>BASEFEE</code> ফেরত দেয়</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM অপারেশনের জন্য গ্যাস রিফান্ড কমায়</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> দিয়ে শুরু হওয়া কন্ট্রাক্ট ডিপ্লয় করা প্রতিরোধ করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>2021 সালের ডিসেম্বর পর্যন্ত আইস এজ পিছিয়ে দেয়</em></li>
</ul>

</ExpandableCard>

---

### বার্লিন {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### সারাংশ {#berlin-summary}

বার্লিন আপগ্রেড নির্দিষ্ট EVM অ্যাকশনের জন্য গ্যাস খরচ অপ্টিমাইজ করেছে এবং একাধিক ট্রানজ্যাকশন প্রকারের জন্য সমর্থন বাড়িয়েছে।

- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Ethereum Cat Herders-এর ব্যাখ্যাটি পড়ুন](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="বার্লিন EIPs" contentPreview="এই আপগ্রেডে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>MODEXP গ্যাস খরচ কমায়</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>একাধিক ট্রানজ্যাকশন প্রকারের জন্য সহজ সমর্থন সক্ষম করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>স্টেট অ্যাক্সেস অপকোডগুলোর জন্য গ্যাস খরচ বৃদ্ধি করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>ঐচ্ছিক অ্যাক্সেস তালিকা যোগ করে</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### বিকন চেইন জেনেসিস {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### সারাংশ {#beacon-chain-genesis-summary}

[বিকন চেইন](/roadmap/beacon-chain/) নিরাপদে চালু করার জন্য 32 স্টেক করা ETH-এর 16384টি ডিপোজিটের প্রয়োজন ছিল। এটি 27 নভেম্বরে ঘটেছিল এবং বিকন চেইন 1 ডিসেম্বর, 2020-এ ব্লক তৈরি করা শুরু করে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  বিকন চেইন
</DocLink>

---

### স্টেকিং ডিপোজিট কন্ট্রাক্ট ডিপ্লয় করা হয়েছে {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### সারাংশ {#deposit-contract-summary}

স্টেকিং ডিপোজিট কন্ট্রাক্ট ইথেরিয়াম ইকোসিস্টেমে [স্টেকিং](/glossary/#staking) চালু করেছে। যদিও এটি একটি [মেইননেট](/glossary/#mainnet) কন্ট্রাক্ট, তবুও এটি একটি গুরুত্বপূর্ণ [ইথেরিয়াম আপগ্রেড](/roadmap/), [বিকন চেইন](/roadmap/beacon-chain/) লঞ্চ করার সময়সীমার উপর সরাসরি প্রভাব ফেলেছিল।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  স্টেকিং
</DocLink>

---

### মুইর গ্লেসিয়ার {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### সারাংশ {#muir-glacier-summary}

মুইর গ্লেসিয়ার ফর্ক [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb)-এ একটি বিলম্ব নিয়ে আসে। [প্রুফ-অফ-ওয়ার্ক (PoW)](/developers/docs/consensus-mechanisms/pow/) কনসেনসাস মেকানিজমের ব্লক কাঠিন্য বৃদ্ধি পাওয়ার কারণে ট্রানজ্যাকশন পাঠানো এবং বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) ব্যবহারের অপেক্ষার সময় বেড়ে গিয়ে ইথেরিয়ামের ব্যবহারযোগ্যতা হ্রাস পাওয়ার ঝুঁকি তৈরি হয়েছিল।

- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Ethereum Cat Herders-এর ব্যাখ্যামূলক নিবন্ধটি পড়ুন](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="মুইর গ্লেসিয়ার EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>ডিফিকাল্টি বম্বকে আরও 4,000,000 ব্লক বা ~611 দিনের জন্য বিলম্বিত করে।</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### ইস্তাম্বুল {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### সারাংশ {#istanbul-summary}

ইস্তাম্বুল ফর্ক:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)-এ নির্দিষ্ট কিছু কাজের [গ্যাস](/glossary/#gas) খরচ অপ্টিমাইজ করেছে।
- ডিনায়াল-অফ-সার্ভিস (denial-of-service) আক্রমণের বিরুদ্ধে প্রতিরোধ ক্ষমতা উন্নত করেছে।
- SNARKs এবং STARKs-এর উপর ভিত্তি করে তৈরি [লেয়ার 2 স্কেলিং](/developers/docs/scaling/#layer-2-scaling) সলিউশনগুলোকে আরও বেশি কার্যকর করেছে।
- ইথেরিয়াম এবং Zcash-কে একে অপরের সাথে কাজ করার (interoperate) সক্ষমতা দিয়েছে।
- কন্ট্রাক্টগুলোকে আরও সৃজনশীল ফাংশন চালু করার অনুমতি দিয়েছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="ইস্তাম্বুল EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>ইথেরিয়ামকে Zcash-এর মতো গোপনীয়তা-রক্ষাকারী (privacy-preserving) কারেন্সির সাথে কাজ করার অনুমতি দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[গ্যাস](/glossary/#gas) খরচ উন্নত করতে সস্তা ক্রিপ্টোগ্রাফি।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [অপকোড](/developers/docs/ethereum-stack/#ethereum-virtual-machine) যোগ করার মাধ্যমে ইথেরিয়ামকে রিপ্লে অ্যাটাক (replay attacks) থেকে রক্ষা করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>ব্যবহারের উপর ভিত্তি করে অপকোড গ্যাস প্রাইস অপ্টিমাইজ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>ব্লকে আরও বেশি ডেটা রাখার অনুমতি দিতে কল ডেটার খরচ কমায় – যা [লেয়ার 2 স্কেলিং](/developers/docs/scaling/#layer-2-scaling)-এর জন্য ভালো।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>অন্যান্য অপকোড গ্যাস প্রাইস পরিবর্তন।</em></li>
</ul>

</ExpandableCard>

---

### কনস্ট্যান্টিনোপল {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### সারাংশ {#constantinople-summary}

কনস্ট্যান্টিনোপল ফর্ক:

- ব্লক [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining/) পুরস্কার 3 থেকে কমিয়ে 2 ETH করেছে।
- [প্রুফ-অফ-স্টেক (PoS) বাস্তবায়িত হওয়ার](#beacon-chain-genesis) আগে ব্লকচেইন যাতে ফ্রিজ না হয়ে যায় তা নিশ্চিত করেছে।
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)-এ নির্দিষ্ট কিছু কাজের [গ্যাস](/glossary/#gas) খরচ অপ্টিমাইজ করেছে।
- এখনও তৈরি হয়নি এমন ঠিকানাগুলোর সাথে ইন্টারঅ্যাক্ট করার ক্ষমতা যোগ করেছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="কনস্ট্যান্টিনোপল EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>নির্দিষ্ট কিছু অনচেইন কাজের খরচ অপ্টিমাইজ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>আপনাকে এমন ঠিকানাগুলোর সাথে ইন্টারঅ্যাক্ট করার অনুমতি দেয় যা এখনও তৈরি হয়নি।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>অন্য একটি কন্ট্রাক্টের কোডের হ্যাশ পুনরুদ্ধার করতে <code>EXTCODEHASH</code> নির্দেশিকা (instruction) চালু করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>প্রুফ-অফ-স্টেক (PoS)-এর আগে ব্লকচেইন যাতে ফ্রিজ না হয়ে যায় তা নিশ্চিত করে এবং ব্লক পুরস্কার 3 থেকে কমিয়ে 2 ETH করে।</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### বাইজান্টিয়াম {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### সারাংশ {#byzantium-summary}

বাইজেন্টিয়াম ফর্ক:

- ব্লক [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining/) পুরস্কার 5 থেকে কমিয়ে 3 ETH করা হয়েছে।
- [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) এক বছরের জন্য পিছিয়ে দেওয়া হয়েছে।
- অন্যান্য কন্ট্রাক্টে নন-স্টেট-চেঞ্জিং কল করার ক্ষমতা যুক্ত করা হয়েছে।
- [লেয়ার ২ স্কেলিংয়ের](/developers/docs/scaling/#layer-2-scaling) সুবিধার্থে কিছু নির্দিষ্ট ক্রিপ্টোগ্রাফি পদ্ধতি যুক্ত করা হয়েছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="বাইজান্টিয়াম EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> অপকোড যুক্ত করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>সাফল্য বা ব্যর্থতা নির্দেশ করতে ট্রানজ্যাকশন রসিদে স্ট্যাটাস ফিল্ড যুক্ত করা হয়েছে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)-এর সুবিধার্থে উপবৃত্তাকার বক্ররেখা এবং স্কেলার গুণন যুক্ত করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)-এর সুবিধার্থে উপবৃত্তাকার বক্ররেখা এবং স্কেলার গুণন যুক্ত করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA স্বাক্ষর যাচাইকরণ সক্ষম করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>পরিবর্তনশীল দৈর্ঘ্যের রিটার্ন ভ্যালুর জন্য সমর্থন যুক্ত করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em><code>STATICCALL</code> অপকোড যুক্ত করে, যা অন্যান্য কন্ট্রাক্টে নন-স্টেট-চেঞ্জিং কল করার অনুমতি দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>কাঠিন্য সমন্বয় সূত্র পরিবর্তন করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) 1 বছরের জন্য পিছিয়ে দেয় এবং ব্লক পুরস্কার 5 থেকে কমিয়ে 3 ETH করে।</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### স্পুরিয়াস ড্রাগন {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### সারাংশ {#spurious-dragon-summary}

স্পুরিয়াস ড্রাগন ফর্ক ছিল নেটওয়ার্কে (সেপ্টেম্বর/অক্টোবর 2016) ডিনায়াল অফ সার্ভিস (DoS) আক্রমণের দ্বিতীয় প্রতিক্রিয়া, যার মধ্যে অন্তর্ভুক্ত ছিল:

- নেটওয়ার্কে ভবিষ্যতের আক্রমণ প্রতিরোধ করতে অপকোড প্রাইসিং টিউন করা।
- ব্লকচেইন স্টেটের "ডিব্লোট" (debloat) সক্ষম করা।
- রিপ্লে আক্রমণ সুরক্ষা যোগ করা।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="স্পুরিয়াস ড্রাগন EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>একটি ইথেরিয়াম চেইন থেকে ট্রানজ্যাকশনগুলোকে বিকল্প চেইনে পুনরায় সম্প্রচার করা থেকে বাধা দেয়, উদাহরণস্বরূপ একটি টেস্টনেট ট্রানজ্যাকশন মূল ইথেরিয়াম চেইনে রিপ্লে করা।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> অপকোডের দাম সমন্বয় করে – কম্পিউটেশনালি ব্যয়বহুল কন্ট্রাক্ট অপারেশনের মাধ্যমে নেটওয়ার্কের গতি ধীর করা আরও কঠিন করে তোলে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS আক্রমণের মাধ্যমে যুক্ত হওয়া খালি অ্যাকাউন্টগুলো সরানোর অনুমতি দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ব্লকচেইনে একটি কন্ট্রাক্টের সর্বোচ্চ কোড সাইজ পরিবর্তন করে 24576 বাইট করে।</em></li>
</ul>

</ExpandableCard>

---

### ট্যানজারিন হুইসেল {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### সারাংশ {#tangerine-whistle-summary}

ট্যানজারিন হুইসেল ফর্ক ছিল নেটওয়ার্কে (সেপ্টেম্বর/অক্টোবর 2016) ডিনায়াল অফ সার্ভিস (DoS) আক্রমণের প্রথম প্রতিক্রিয়া, যার মধ্যে অন্তর্ভুক্ত ছিল:

- আন্ডারপ্রাইসড অপারেশন কোড সম্পর্কিত জরুরি নেটওয়ার্ক স্বাস্থ্য সমস্যাগুলোর সমাধান করা।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="ট্যানজারিন হুইসেল EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>স্প্যাম আক্রমণে ব্যবহার করা যেতে পারে এমন অপকোডগুলোর গ্যাস খরচ বাড়ায়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>ইথেরিয়াম প্রোটোকলের পূর্ববর্তী সংস্করণগুলোর ত্রুটির কারণে খুব কম খরচে স্টেটে রাখা বিপুল সংখ্যক খালি অ্যাকাউন্ট সরিয়ে স্টেট সাইজ হ্রাস করে।</em></li>
</ul>

</ExpandableCard>

---

### DAO ফর্ক {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### সারাংশ {#dao-fork-summary}

DAO ফর্কটি ছিল [2016 সালের DAO আক্রমণ](https://www.coindesk.com/learn/understanding-the-dao-attack/)-এর প্রতিক্রিয়া, যেখানে একটি হ্যাকের মাধ্যমে একটি অনিরাপদ [DAO](/glossary/#dao) কন্ট্রাক্ট থেকে 3.6 মিলিয়নেরও বেশি ETH চুরি হয়ে গিয়েছিল। এই ফর্কটি ত্রুটিপূর্ণ কন্ট্রাক্ট থেকে তহবিলগুলোকে একটি [নতুন কন্ট্রাক্টে](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) স্থানান্তরিত করেছিল, যার একটিমাত্র ফাংশন ছিল: উত্তোলন (withdraw)। যারা তহবিল হারিয়েছিলেন তারা তাদের ওয়ালেটে থাকা প্রতি 100টি DAO টোকেনের জন্য 1 ETH উত্তোলন করতে পারতেন।

এই পদক্ষেপের বিষয়ে ইথেরিয়াম কমিউনিটি ভোট দিয়েছিল। যেকোনো ETH হোল্ডার [একটি ভোটিং প্ল্যাটফর্মে](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) ট্রানজ্যাকশনের মাধ্যমে ভোট দিতে পারতেন। ফর্ক করার সিদ্ধান্তটি 85%-এরও বেশি ভোট পেয়েছিল।

কিছু মাইনার ফর্ক করতে অস্বীকৃতি জানিয়েছিলেন কারণ DAO ঘটনাটি প্রোটোকলের কোনো ত্রুটি ছিল না। তারা পরবর্তীতে [ইথেরিয়াম ক্লাসিক](https://ethereumclassic.org/) গঠন করেন।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### হোমস্টেড {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### সারাংশ {#homestead-summary}

হোমস্টেড ফর্কটি ভবিষ্যতের দিকে দৃষ্টি নিবদ্ধ করেছিল। এতে বেশ কয়েকটি প্রোটোকল পরিবর্তন এবং একটি নেটওয়ার্কিং পরিবর্তন অন্তর্ভুক্ত ছিল যা ইথেরিয়ামকে আরও নেটওয়ার্ক আপগ্রেড করার ক্ষমতা দিয়েছিল।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="হোমস্টেড EIPs" contentPreview="এই ফর্কে অন্তর্ভুক্ত অফিসিয়াল উন্নতিসমূহ।">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>কন্ট্রাক্ট তৈরির প্রক্রিয়ায় সম্পাদনা করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>নতুন অপকোড যোগ করে: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p ফরোয়ার্ড সামঞ্জস্যতার প্রয়োজনীয়তা প্রবর্তন করে</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### ফ্রন্টিয়ার থয়িং {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### সারসংক্ষেপ {#frontier-thawing-summary}

ফ্রন্টিয়ার থয়িং ফর্ক প্রতি [ব্লক](/glossary/#block)-এ 5,000 [গ্যাস](/glossary/#gas) লিমিট তুলে নিয়েছিল এবং ডিফল্ট গ্যাস প্রাইস 51 [Gwei](/glossary/#gwei)-তে নির্ধারণ করেছিল। এটি ট্রানজ্যাকশনের অনুমতি দেয় – ট্রানজ্যাকশনের জন্য 21,000 গ্যাস প্রয়োজন। ভবিষ্যতে [প্রুফ-অফ-স্টেক (PoS)](/glossary/#pos)-এ হার্ড-ফর্ক নিশ্চিত করার জন্য [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) চালু করা হয়েছিল।

- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [ইথেরিয়াম প্রোটোকল আপডেট 1 পড়ুন](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### ফ্রন্টিয়ার {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### সারসংক্ষেপ {#frontier-summary}

ফ্রন্টিয়ার ছিল ইথেরিয়াম প্রজেক্টের একটি লাইভ, কিন্তু প্রাথমিক বাস্তবায়ন। এটি সফল অলিম্পিক টেস্টিং পর্বের পরে এসেছিল। এটি প্রযুক্তিগত ব্যবহারকারীদের, বিশেষ করে ডেভেলপারদের জন্য তৈরি করা হয়েছিল। [ব্লক](/glossary/#block)-এর [গ্যাস](/glossary/#gas) লিমিট ছিল 5,000। এই 'থয়িং' পর্বটি মাইনারদের তাদের কাজ শুরু করতে এবং প্রারম্ভিক গ্রহণকারীদের কোনো 'তাড়াহুড়ো' ছাড়াই তাদের ক্লায়েন্ট ইনস্টল করতে সক্ষম করেছিল।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### ইথার বিক্রি {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

ইথার আনুষ্ঠানিকভাবে 42 দিনের জন্য বিক্রির জন্য উন্মুক্ত করা হয়েছিল। আপনি এটি BTC দিয়ে কিনতে পারতেন।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণাটি পড়ুন](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### ইয়েলো পেপার প্রকাশিত {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

ড. গ্যাভিন উড রচিত ইয়েলো পেপার হলো ইথেরিয়াম প্রোটোকলের একটি প্রযুক্তিগত সংজ্ঞা।

[ইয়েলো পেপার দেখুন](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### শ্বেতপত্র প্রকাশিত {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

2015 সালে প্রজেক্টটি চালু হওয়ার আগে, ইথেরিয়ামের প্রতিষ্ঠাতা ভিটালিক বুটেরিন কর্তৃক 2013 সালে প্রকাশিত সূচনামূলক গবেষণাপত্র।

<DocLink href="/whitepaper/">
  শ্বেতপত্র
</DocLink>