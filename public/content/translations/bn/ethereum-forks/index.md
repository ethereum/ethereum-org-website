---
title: সমস্ত ইথেরিয়াম ফর্কের টাইমলাইন (২০১৪ থেকে বর্তমান)
description: ইথেরিয়াম ব্লকচেইনের ইতিহাস যেখানে প্রধান মাইলফলক, রিলিজ এবং ফর্ক অন্তর্ভুক্ত।
lang: bn
sidebarDepth: 1
---

# সমস্ত ইথেরিয়াম ফর্কের টাইমলাইন (২০১৪ থেকে বর্তমান) {#the-history-of-ethereum}

ইথেরিয়াম ব্লকচেইনের সমস্ত প্রধান মাইলফলক, ফর্ক এবং আপডেটের একটি টাইমলাইন।

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

ফর্কগুলি হল যখন নেটওয়ার্কে বড় প্রযুক্তিগত আপগ্রেড বা পরিবর্তন করার প্রয়োজন হয় – এগুলি সাধারণত [ইথেরিয়াম ইমপ্রুভমেন্ট প্রপোজাল (EIPs)](/eips/) থেকে উদ্ভূত হয় এবং প্রোটোকলের "নিয়ম" পরিবর্তন করে।

প্রথাগত, কেন্দ্রীয়ভাবে-নিয়ন্ত্রিত সফ্টওয়্যারে যখন আপগ্রেডের প্রয়োজন হয়, তখন কোম্পানি শেষ ব্যবহারকারীর জন্য একটি নতুন সংস্করণ প্রকাশ করে। ব্লকচেইন ভিন্নভাবে কাজ করে কারণ এর কোনো কেন্দ্রীয় মালিকানা নেই। [ইথেরিয়াম ক্লায়েন্টদের](/developers/docs/nodes-and-clients/) নতুন ফর্কের নিয়মগুলি বাস্তবায়ন করতে তাদের সফ্টওয়্যার আপডেট করতে হবে। এছাড়াও ব্লক প্রস্তুতকারকদের (প্রুফ-অফ-ওয়ার্ক জগতে মাইনার, প্রুফ-অফ-স্টেক জগতে ভ্যালিডেটর) এবং নোডগুলিকে নতুন নিয়মের বিরুদ্ধে ব্লক তৈরি করতে হবে এবং ভ্যালিডেট করতে হবে। [কনসেন্সাস পদ্ধতি সম্পর্কে আরও](/developers/docs/consensus-mechanisms/)

এই নিয়ম পরিবর্তনগুলি নেটওয়ার্কে একটি অস্থায়ী বিভাজন তৈরি করতে পারে। নতুন ব্লক নতুন নিয়ম বা পুরানো নিয়ম অনুযায়ী তৈরি করা যেতে পারে। ফর্কগুলি সাধারণত সময়ের আগেই সম্মত হয় যাতে ক্লায়েন্টরা একযোগে পরিবর্তনগুলি গ্রহণ করে এবং আপগ্রেড সহ ফর্কটি মূল চেইন হয়ে যায়। তবে, বিরল ক্ষেত্রে, ফর্কের বিষয়ে মতানৈক্যের কারণে নেটওয়ার্ক স্থায়ীভাবে বিভক্ত হতে পারে - বিশেষত <a href="#dao-fork">DAO ফর্ক</a> দিয়ে ইথেরিয়াম ক্লাসিকের সৃষ্টি।

</ExpandableCard>

<ExpandableCard title="Why do some upgrades have multiple names?" contentPreview="Upgrades names follow a pattern">

ইথেরিয়ামের অন্তর্নিহিত সফ্টওয়্যারটি দুটি অর্ধেকের সমন্বয়ে গঠিত, যা [এক্সিকিউশন লেয়ার](/glossary/#execution-layer) এবং [কনসেন্সাস লেয়ার](/glossary/#consensus-layer) নামে পরিচিত।

**এক্সিকিউশন আপগ্রেড নামকরণ**

২০২১ সাল থেকে, **এক্সিকিউশন লেয়ার**-এর আপগ্রেডগুলির নাম কালানুক্রমিক ক্রমে [পূর্ববর্তী Devcon অবস্থানগুলির](https://devcon.org/en/past-events/) শহরের নাম অনুসারে রাখা হয়েছে:

| আপগ্রেডের নাম | Devcon বছর | Devcon নম্বর | আপগ্রেডের তারিখ |
| ------------- | ---------- | ------------ | --------------- |
| বার্লিন       | ২০১৪       | 0            | এপ্রিল ১৫, ২০২১ |
| লন্ডন         | ২০১৫       | I            | আগস্ট ৫, ২০২১   |
| সাংহাই        | ২০১৬       | II           | এপ্রিল ১২, ২০২৩ |
| কানকুন        | ২০১৭       | III          | মার্চ ১৩, ২০২৪  |
| **প্রাগ**     | ২০১৮       | IV           | TBD - পরবর্তী   |
| _ওসাকা_       | ২০১৯       | V            | TBD             |
| _বোগোটা_      | 2022       | VI           | TBD             |
| _ব্যাংকক_     | ২০২৪       | VII          | TBD             |

**কনসেন্সাস আপগ্রেড নামকরণ**

[বিকন চেইন](/glossary/#beacon-chain) চালু হওয়ার পর থেকে, **কনসেন্সাস লেয়ার**-এর আপগ্রেডগুলির নাম বর্ণানুক্রমিকভাবে অগ্রসর হওয়া অক্ষর দিয়ে শুরু হওয়া মহাজাগতিক তারাগুলির নামে নামকরণ করা হয়েছে:

| আপগ্রেডের নাম                                                 | আপগ্রেডের তারিখ    |
| ------------------------------------------------------------- | ------------------ |
| বিকন চেইন জেনেসিস                                             | ডিসেম্বর ১, ২০২০   |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | অক্টোবর ২৭, ২০২১   |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | সেপ্টেম্বর ৬, ২০২২ |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | এপ্রিল ১২, ২০২৩    |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | মার্চ ১৩, ২০২৪     |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | TBD - পরবর্তী      |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | TBD                |

**সম্মিলিত নামকরণ**

এক্সিকিউশন এবং কনসেন্সাস আপগ্রেডগুলি প্রাথমিকভাবে বিভিন্ন সময়ে রোল আউট করা হয়েছিল, কিন্তু ২০২২ সালে [দ্য মার্জ](/roadmap/merge/)-এর পরে এগুলি একযোগে স্থাপন করা হয়েছে। এর ফলে, একটি একক সংযুক্ত শব্দ ব্যবহার করে এই আপগ্রেডগুলির রেফারেন্স সহজ করার জন্য কথ্য শব্দ আবির্ভূত হয়েছে। এটি _সাংহাই-ক্যাপেলা_ আপগ্রেডের মাধ্যমে শুরু হয়েছিল, যা সাধারণত "**শ্যাপেলা**" হিসাবে উল্লেখ করা হয় এবং এটি _কানকুন-ডেনেব_ (**ডেনকুন**), এবং _প্রাগ-ইলেক্ট্রা_ (**পেকট্রা**) আপগ্রেডগুলির সাথে অব্যাহত রয়েছে।

| এক্সিকিউশন আপগ্রেড | কনসেন্সাস আপগ্রেড | সংক্ষিপ্ত নাম |
| ------------------ | ----------------- | ------------- |
| সাংহাই             | Capella           | "শ্যাপেলা"    |
| কানকুন             | Deneb             | "ডেনকুন"      |
| প্রাগ              | ইলেক্ট্রা         | "পেকট্রা"     |
| ওসাকা              | Fulu              | "ফুসাকা"      |

</ExpandableCard>

কিছু বিশেষ গুরুত্বপূর্ণ অতীতের আপগ্রেড সম্পর্কে তথ্যে সরাসরি যান: [দ্য বিকন চেইন](/roadmap/beacon-chain/); [দ্য মার্জ](/roadmap/merge/); এবং [EIP-1559](#london)

ভবিষ্যৎ প্রোটোকল আপগ্রেড খুঁজছেন? [ইথেরিয়াম রোডম্যাপে আসন্ন আপগ্রেড সম্পর্কে জানুন](/roadmap/)।

<Divider />

## ২০২৫ {#2025}

### ফুলু-ওসাকা ("ফুসাকা") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[ফুসাকা সম্পর্কে আরও জানুন](/roadmap/fusaka/)

### প্রাগ-ইলেক্ট্রা ("পেকট্রা") {#pectra}

<NetworkUpgradeSummary name="pectra" />

প্রাগ-ইলেক্ট্রা ("পেকট্রা") আপগ্রেডে ইথেরিয়াম প্রোটোকলে বেশ কিছু উন্নতি অন্তর্ভুক্ত ছিল যার লক্ষ্য ছিল সমস্ত ব্যবহারকারী, লেয়ার ২ নেটওয়ার্ক, স্ট্যাকার এবং নোড অপারেটরদের জন্য অভিজ্ঞতা বাড়ানো।

স্টেকিং একটি আপগ্রেড পেয়েছে যেখানে ভ্যালিডেটর অ্যাকাউন্টের চক্রবৃদ্ধি এবং এক্সিকিউশন উইথড্রয়াল অ্যাড্রেস ব্যবহার করে স্টেক করা তহবিলের উপর উন্নত নিয়ন্ত্রণ আনা হয়েছে। EIP-7251 একটি একক ভ্যালিডেটরের জন্য সর্বোচ্চ কার্যকর ব্যালেন্স ২০৪৮-এ বাড়িয়েছে, যা স্ট্যাকারদের জন্য মূলধন দক্ষতা উন্নত করেছে। EIP-7002 একটি এক্সিকিউশন অ্যাকাউন্টকে নিরাপদে ভ্যালিডেটর অ্যাকশন ট্রিগার করতে সক্ষম করেছে, যার মধ্যে রয়েছে এক্সিট করা বা তহবিলের অংশ উইথড্র করা, ETH স্ট্যাকারদের জন্য অভিজ্ঞতা উন্নত করা, এবং নোড অপারেটরদের জন্য জবাবদিহিতা জোরদার করতে সাহায্য করা।

আপগ্রেডের অন্যান্য অংশগুলি সাধারণ ব্যবহারকারীদের জন্য অভিজ্ঞতা উন্নত করার উপর দৃষ্টি নিবদ্ধ করে। EIP-7702 একটি সাধারণ নন-স্মার্ট-কন্ট্র্যাক্ট অ্যাকাউন্টের ([EOA](/glossary/#eoa)) জন্য একটি স্মার্ট কন্ট্র্যাক্টের মতো কোড কার্যকর করার ক্ষমতা নিয়ে এসেছে। এটি প্রথাগত ইথেরিয়াম অ্যাকাউন্টগুলির জন্য সীমাহীন নতুন কার্যকারিতা আনলক করেছে, যেমন লেনদেন ব্যাচিং, গ্যাস স্পনসরশিপ, বিকল্প প্রমাণীকরণ, প্রোগ্রামেবল ব্যয় নিয়ন্ত্রণ, অ্যাকাউন্ট পুনরুদ্ধার প্রক্রিয়া এবং আরও অনেক কিছু।

<ExpandableCard title="Pectra EIPs" contentPreview="Official improvements included in this upgrade.">

উন্নত ব্যবহারকারীর অভিজ্ঞতা:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOA অ্যাকাউন্ট কোড সেট করুন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ব্লব থ্রুপুট বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>কলডেটা খরচ বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL কনফিগ ফাইলে ব্লব শিডিউল যোগ করুন</em></li>
</ul>

উন্নত স্টেকিং অভিজ্ঞতা:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> বাড়ান</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>এক্সিকিউশন লেয়ার ট্রিগারযোগ্য এক্সিট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>সাধারণ উদ্দেশ্যে এক্সিকিউশন লেয়ারের অনুরোধ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>চেইনে ভ্যালিডেটর ডিপোজিট সরবরাহ করুন</em></li>
</ul>

প্রোটোকল দক্ষতা এবং নিরাপত্তা উন্নতি:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 কার্ভ অপারেশনের জন্য প্রিকম্পাইল</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>স্টেটে ঐতিহাসিক ব্লক হ্যাশ সংরক্ষণ করুন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>অ্যাটেস্টেশনের বাইরে কমিটি ইনডেক্স সরান</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Pectra কীভাবে স্টেকিং অভিজ্ঞতা বাড়াবে](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [ইলেক্ট্রা আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [প্রাগ-ইলেক্ট্রা ("পেকট্রা") FAQ](/roadmap/pectra/)

<Divider />

## ২০২৪ {#2024}

### কানকুন-ডেনেব ("ডেনকুন") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### কানকুন সারাংশ {#cancun-summary}

কানকুন আপগ্রেডে ইথেরিয়ামের _এক্সিকিউশন_-এর জন্য একগুচ্ছ উন্নতি রয়েছে যা ডেনেব কনসেন্সাস আপগ্রেডের সাথে সামঞ্জস্য রেখে স্কেলেবিলিটি উন্নত করার লক্ষ্যে।

বিশেষত এর মধ্যে EIP-4844 অন্তর্ভুক্ত, যা **প্রোটো-ড্যাঙ্কশার্ডিং** নামে পরিচিত, যা লেয়ার ২ রোলআপগুলির জন্য ডেটা স্টোরেজের খরচ উল্লেখযোগ্যভাবে হ্রাস করে। এটি ডেটা "ব্লব" প্রবর্তনের মাধ্যমে অর্জন করা হয় যা রোলআপগুলিকে স্বল্প সময়ের জন্য মেইননেটে ডেটা পোস্ট করতে সক্ষম করে। এর ফলে লেয়ার ২ রোলআপ ব্যবহারকারীদের জন্য লেনদেন ফি উল্লেখযোগ্যভাবে কমে যায়।

<ExpandableCard title="Cancun EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>ক্ষণস্থায়ী স্টোরেজ অপকোড</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM-এ বিকন ব্লক রুট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>শার্ড ব্লব লেনদেন (প্রোটো-ড্যাঙ্কশার্ডিং)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - মেমরি কপি করার নির্দেশ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> শুধুমাত্র একই লেনদেনে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> অপকোড</em></li>
</ul>

</ExpandableCard>

- [লেয়ার ২ রোলআপ](/layer-2/)
- [প্রোটো-ড্যাঙ্কশার্ডিং](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [কানকুন আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### ডেনেব সারাংশ {#deneb-summary}

ডেনেব আপগ্রেডে ইথেরিয়ামের _কনসেন্সাস_-এর জন্য একগুচ্ছ উন্নতি রয়েছে যা স্কেলেবিলিটি উন্নত করার লক্ষ্যে। এই আপগ্রেডটি কানকুন এক্সিকিউশন আপগ্রেডের সাথে সামঞ্জস্য রেখে প্রোটো-ড্যাঙ্কশার্ডিং (EIP-4844) সক্ষম করার জন্য এবং বিকন চেইনের অন্যান্য উন্নতির জন্য এসেছে।

পূর্ব-উৎপাদিত স্বাক্ষরিত "স্বেচ্ছায় এক্সিট মেসেজ" আর মেয়াদোত্তীর্ণ হয় না, ফলে ব্যবহারকারীরা তৃতীয় পক্ষের নোড অপারেটরের সাথে তাদের তহবিল স্টেকিং করার উপর আরও বেশি নিয়ন্ত্রণ পায়। এই স্বাক্ষরিত এক্সিট মেসেজের মাধ্যমে, স্ট্যাকাররা নোড অপারেশন অর্পণ করতে পারে এবং যে কোনও সময় নিরাপদে এক্সিট করার এবং তাদের তহবিল উইথড্র করার ক্ষমতা বজায় রাখতে পারে, কারও কাছ থেকে অনুমতি নেওয়ার প্রয়োজন ছাড়াই।

EIP-7514 প্রতি ইপকে আট (৮) ভ্যালিডেটর নেটওয়ার্কে যোগদানের "চার্ন" হারকে সীমাবদ্ধ করে ETH-এর ইস্যুয়েন্সে কঠোরতা নিয়ে আসে। যেহেতু ETH ইস্যুয়েন্স মোট স্টেক করা ETH-এর সমানুপাতিক, তাই যোগ দেওয়া ভ্যালিডেটরের সংখ্যা সীমিত করা নতুন ইস্যু করা ETH-এর _বৃদ্ধির হার_ সীমাবদ্ধ করে, এবং একই সাথে নোড অপারেটরদের জন্য হার্ডওয়্যারের প্রয়োজনীয়তা হ্রাস করে, যা বিকেন্দ্রীকরণে সাহায্য করে।

<ExpandableCard title="Deneb EIPs" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM-এ বিকন ব্লক রুট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>শার্ড ব্লব লেনদেন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>চিরস্থায়ীভাবে বৈধ স্বাক্ষরিত স্বেচ্ছায় এক্সিট</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>সর্বোচ্চ অ্যাটেস্টেশন অন্তর্ভুক্তি স্লট বাড়ান</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>সর্বোচ্চ ইপক চার্ন সীমা যোগ করুন</em></li>
</ul>

</ExpandableCard>

- [ডেনেব আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [কানকুন-ডেনেব ("ডেনকুন") FAQ](/roadmap/dencun/)

<Divider />

## ২০২৩ {#2023}

### সাংহাই-ক্যাপেলা ("শ্যাপেলা") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### সাংহাই সারাংশ {#shanghai-summary}

সাংহাই আপগ্রেডটি এক্সিকিউশন লেয়ারে স্টেকিং উইথড্রয়াল নিয়ে এসেছে। ক্যাপেলা আপগ্রেডের সাথে সামঞ্জস্য রেখে, এটি ব্লকগুলিকে উইথড্রয়াল অপারেশন গ্রহণ করতে সক্ষম করেছে, যা স্ট্যাকারদের তাদের ETH বিকন চেইন থেকে এক্সিকিউশন লেয়ারে উইথড্র করার অনুমতি দেয়।

<ExpandableCard title="Shanghai EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code> অ্যাড্রেস ওয়ার্ম শুরু করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>নতুন <code>PUSH0</code> নির্দেশ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>initcode সীমাবদ্ধ করুন এবং পরিমাপ করুন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>অপারেশন হিসাবে বিকন চেইন পুশ উইথড্রয়াল</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code> বাতিল করুন</em></li>
</ul>

</ExpandableCard>

- [সাংহাই আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### ক্যাপেলা সারাংশ {#capella-summary}

ক্যাপেলা আপগ্রেডটি কনসেন্সাস লেয়ারের (বিকন চেইন) তৃতীয় বড় আপগ্রেড ছিল এবং এটি স্টেকিং উইথড্রয়াল সক্ষম করেছে। ক্যাপেলা এক্সিকিউশন লেয়ার আপগ্রেড, সাংহাই-এর সাথে একযোগে ঘটেছে এবং স্টেকিং উইথড্রয়ালের কার্যকারিতা সক্ষম করেছে।

এই কনসেন্সাস লেয়ার আপগ্রেডটি স্ট্যাকারদের জন্য উইথড্রয়ালের সুবিধা নিয়ে এসেছে, যারা তাদের প্রাথমিক ডিপোজিটের সাথে উইথড্রয়ালের শংসাপত্র প্রদান করেননি, তাদের জন্য এটি করার ক্ষমতা দিয়েছে, যার ফলে উইথড্রয়াল সক্ষম হয়েছে।

এই আপগ্রেডটি স্বয়ংক্রিয় অ্যাকাউন্ট সুইপিং কার্যকারিতাও প্রদান করেছে, যা ক্রমাগতভাবে ভ্যালিডেটর অ্যাকাউন্টগুলিকে যেকোনো উপলব্ধ পুরস্কার প্রদান বা সম্পূর্ণ উইথড্রয়ালের জন্য প্রক্রিয়া করে।

- [স্টেকিং উইথড্রয়াল সম্পর্কে আরও জানুন](/staking/withdrawals/)।
- [ক্যাপেলা আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## ২০২২ {#2022}

### প্যারিস (দ্য মার্জ) {#paris}

<NetworkUpgradeSummary name="paris" />

#### সারাংশ {#paris-summary}

প্যারিস আপগ্রেডটি ট্রিগার করা হয়েছিল যখন প্রুফ-অফ-ওয়ার্ক ব্লকচেইন [টার্মিনাল টোটাল ডিফিকাল্টি](/glossary/#terminal-total-difficulty) 58750000000000000000000 অতিক্রম করে। এটি ১৫ই সেপ্টেম্বর ২০২২-এ ১৫৫৩৭৩৯৩ নং ব্লকে ঘটে, যা পরবর্তী ব্লকে প্যারিস আপগ্রেড ট্রিগার করে। প্যারিস ছিল [দ্য মার্জ](/roadmap/merge/) ট্রানজিশন - এর প্রধান বৈশিষ্ট্য ছিল [প্রুফ-অফ-ওয়ার্ক](/developers/docs/consensus-mechanisms/pow) মাইনিং অ্যালগরিদম এবং সংশ্লিষ্ট কনসেন্সাস লজিক বন্ধ করে দিয়ে তার পরিবর্তে [প্রুফ-অফ-স্টেক](/developers/docs/consensus-mechanisms/pos) চালু করা। প্যারিস নিজেই [এক্সিকিউশন ক্লায়েন্ট](/developers/docs/nodes-and-clients/#execution-clients) (কনসেন্সাস লেয়ারে বেলাট্রিক্সের সমতুল্য) এর একটি আপগ্রেড ছিল যা তাদের সংযুক্ত [কনসেন্সাস ক্লায়েন্ট](/developers/docs/nodes-and-clients/#consensus-clients) থেকে নির্দেশনা নিতে সক্ষম করে। এর জন্য নতুন একগুচ্ছ অভ্যন্তরীণ API পদ্ধতি সক্রিয় করার প্রয়োজন হয়েছিল, যা সম্মিলিতভাবে [ইঞ্জিন API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) নামে পরিচিত। [হোমস্টেড](#homestead)-এর পর ইথেরিয়াম ইতিহাসে এটি সম্ভবত সবচেয়ে উল্লেখযোগ্য আপগ্রেড ছিল!

- [প্যারিস আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>কনসেন্সাসকে প্রুফ-অফ-স্টেকের জন্য আপগ্রেড করুন</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTY অপকোডকে PREVRANDAO দিয়ে প্রতিস্থাপন করুন</em></li>
</ul>

</ExpandableCard>

---

### বেলাট্রিক্স {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### সারাংশ {#bellatrix-summary}

বেলাট্রিক্স আপগ্রেডটি [বিকন চেইন](/roadmap/beacon-chain)-এর জন্য দ্বিতীয় নির্ধারিত আপগ্রেড ছিল, যা চেইনটিকে [দ্য মার্জ](/roadmap/merge/)-এর জন্য প্রস্তুত করে। এটি নিষ্ক্রিয়তা এবং স্ল্যাশযোগ্য অপরাধের জন্য ভ্যালিডেটর পেনাল্টিগুলিকে তাদের পূর্ণ মূল্যে নিয়ে আসে। বেলাট্রিক্স-এ ফর্ক পছন্দের নিয়মগুলির জন্য একটি আপডেটও রয়েছে যা চেইনটিকে দ্য মার্জ এবং শেষ প্রুফ-অফ-ওয়ার্ক ব্লক থেকে প্রথম প্রুফ-অফ-স্টেক ব্লকে রূপান্তরের জন্য প্রস্তুত করে। এর মধ্যে কনসেন্সাস ক্লায়েন্টদের [টার্মিনাল টোটাল ডিফিকাল্টি](/glossary/#terminal-total-difficulty) 58750000000000000000000 সম্পর্কে সচেতন করা অন্তর্ভুক্ত।

- [বেলাট্রিক্স আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### গ্রে গ্লেসিয়ার {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### সারাংশ {#gray-glacier-summary}

গ্রে গ্লেসিয়ার নেটওয়ার্ক আপগ্রেড [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) তিন মাস পিছিয়ে দিয়েছে। এটি এই আপগ্রেডে প্রবর্তিত একমাত্র পরিবর্তন, এবং এটি প্রকৃতির দিক থেকে [অ্যারো গ্লেসিয়ার](#arrow-glacier) এবং [ম্যুর গ্লেসিয়ার](#muir-glacier) আপগ্রেডের অনুরূপ। অনুরূপ পরিবর্তন [বাইজেন্টাইন](#byzantium), [কনস্টান্টিনোপল](#constantinople) এবং [লন্ডন](#london) নেটওয়ার্ক আপগ্রেডে করা হয়েছে।

- [EF ব্লগ - গ্রে গ্লেসিয়ার আপগ্রেড ঘোষণা](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>সেপ্টেম্বর ২০২২ পর্যন্ত ডিফিকাল্টি বম্ব বিলম্বিত করে</em></li>
</ul>

</ExpandableCard>

<Divider />

## ২০২১ {#2021}

### অ্যারো গ্লেসিয়ার {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### সারাংশ {#arrow-glacier-summary}

অ্যারো গ্লেসিয়ার নেটওয়ার্ক আপগ্রেড [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) কয়েক মাস পিছিয়ে দিয়েছে। এটি এই আপগ্রেডে প্রবর্তিত একমাত্র পরিবর্তন, এবং এটি প্রকৃতির দিক থেকে [ম্যুর গ্লেসিয়ার](#muir-glacier) আপগ্রেডের অনুরূপ। অনুরূপ পরিবর্তন [বাইজেন্টাইন](#byzantium), [কনস্টান্টিনোপল](#constantinople) এবং [লন্ডন](#london) নেটওয়ার্ক আপগ্রেডে করা হয়েছে।

- [EF ব্লগ - অ্যারো গ্লেসিয়ার আপগ্রেড ঘোষণা](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [ইথেরিয়াম ক্যাট হার্ডার্স - ইথেরিয়াম অ্যারো গ্লেসিয়ার আপগ্রেড](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>জুন ২০২২ পর্যন্ত ডিফিকাল্টি বম্ব বিলম্বিত করে</em></li>
</ul>

</ExpandableCard>

---

### আল্টেয়ার {#altair}

<NetworkUpgradeSummary name="altair" />

#### সারাংশ {#altair-summary}

আল্টেয়ার আপগ্রেডটি [বিকন চেইন](/roadmap/beacon-chain)-এর জন্য প্রথম নির্ধারিত আপগ্রেড ছিল। এটি "সিঙ্ক কমিটি"-এর জন্য সমর্থন যোগ করেছে—লাইট ক্লায়েন্টদের সক্ষম করে, এবং ভ্যালিডেটরদের নিষ্ক্রিয়তা ও স্ল্যাশিং পেনাল্টি বাড়িয়েছে, কারণ দ্য মার্জ-এর দিকে উন্নয়ন অগ্রসর হয়েছে।

- [আল্টেয়ার আপগ্রেড স্পেসিফিকেশন পড়ুন](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />মজার তথ্য! {#altair-fun-fact}

আল্টেয়ার ছিল প্রথম প্রধান নেটওয়ার্ক আপগ্রেড যার একটি নির্দিষ্ট রোলআউট সময় ছিল। এর আগের প্রতিটি আপগ্রেড প্রুফ-অফ-ওয়ার্ক চেইনে একটি ঘোষিত ব্লক নম্বরের উপর ভিত্তি করে ছিল, যেখানে ব্লকের সময় পরিবর্তিত হয়। বিকন চেইনে প্রুফ-অফ-ওয়ার্ক সমাধান করার প্রয়োজন হয় না, এবং এর পরিবর্তে একটি সময়-ভিত্তিক ইপক সিস্টেমের উপর কাজ করে যা ৩২টি বারো-সেকেন্ডের "স্লট" নিয়ে গঠিত যেখানে ভ্যালিডেটররা ব্লক প্রস্তাব করতে পারে। এই কারণেই আমরা ঠিক জানতাম কখন আমরা ইপক 74,240-এ পৌঁছাব এবং আল্টেয়ার লাইভ হবে!

- [ব্লক টাইম](/developers/docs/blocks/#block-time)

---

### লন্ডন {#london}

<NetworkUpgradeSummary name="london" />

#### সারাংশ {#london-summary}

লন্ডন আপগ্রেডটি [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) প্রবর্তন করেছে, যা লেনদেন ফি বাজারকে সংস্কার করেছে, সাথে গ্যাস রিফান্ড কীভাবে পরিচালনা করা হয় এবং [আইস এজ](/glossary/#ice-age) সময়সূচীতে পরিবর্তন এনেছে।

#### লন্ডন আপগ্রেড / EIP-1559 কী ছিল? {#eip-1559}

লন্ডন আপগ্রেডের আগে, ইথেরিয়ামের নির্দিষ্ট আকারের ব্লক ছিল। উচ্চ নেটওয়ার্ক চাহিদার সময়ে, এই ব্লকগুলি পূর্ণ ক্ষমতায় কাজ করত। ফলস্বরূপ, ব্যবহারকারীদের প্রায়শই একটি ব্লকে অন্তর্ভুক্ত হওয়ার জন্য চাহিদা কমার জন্য অপেক্ষা করতে হত, যা একটি খারাপ ব্যবহারকারীর অভিজ্ঞতার দিকে নিয়ে যায়। লন্ডন আপগ্রেড ইথেরিয়ামে পরিবর্তনশীল-আকারের ব্লক চালু করেছে।

আগস্ট ২০২১-এর [লন্ডন আপগ্রেড](/ethereum-forks/#london) দিয়ে ইথেরিয়াম নেটওয়ার্কে লেনদেন ফি গণনা করার পদ্ধতি পরিবর্তিত হয়েছে। লন্ডন আপগ্রেডের আগে, `base` এবং `priority` ফি আলাদা না করে ফি গণনা করা হত, নিম্নরূপ:

ধরা যাক, অ্যালিসকে ববকে ১ ETH দিতে হবে। লেনদেনে, গ্যাস সীমা হল ২১,০০০ ইউনিট এবং গ্যাসের দাম হল ২০০ gwei।

মোট ফি হত: `গ্যাস ইউনিট (সীমা) * প্রতি ইউনিটের গ্যাসের দাম` অর্থাৎ `21,000 * 200 = 4,200,000 gwei` বা 0.0042 ETH

লন্ডন আপগ্রেডে [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) এর বাস্তবায়ন লেনদেন ফি প্রক্রিয়াটিকে আরও জটিল করে তুলেছে, কিন্তু গ্যাসের ফি আরও অনুমানযোগ্য করে তুলেছে, যার ফলে একটি আরও কার্যকর লেনদেন ফি বাজার তৈরি হয়েছে। ব্যবহারকারীরা লেনদেনটি সম্পাদনের জন্য কত টাকা দিতে ইচ্ছুক তার সাথে সঙ্গতিপূর্ণ একটি `maxFeePerGas` সহ লেনদেন জমা দিতে পারে, এটা জেনে যে তারা গ্যাসের জন্য বাজার মূল্যের (`baseFeePerGas`) চেয়ে বেশি অর্থ প্রদান করবে না এবং তাদের টিপ বিয়োগ করে যেকোনো অতিরিক্ত অর্থ ফেরত পাবে।

[EIP-1559 ব্যাখ্যা করা হয়েছে](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [আপনি কি একজন ডিএ্যাপস ডেভেলপার? আপনার লাইব্রেরি এবং টুলিং আপগ্রেড করতে ভুলবেন না।](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [ইথেরিয়াম ক্যাট হার্ডারের ব্যাখ্যা পড়ুন](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>লেনদেন ফি বাজারের উন্নতি করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>একটি ব্লক থেকে <code>BASEFEE</code> ফেরত দেয়</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM অপারেশনের জন্য গ্যাস রিফান্ড কমায়</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code> দিয়ে শুরু হওয়া চুক্তি স্থাপন প্রতিরোধ করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>ডিসেম্বর ২০২১ পর্যন্ত আইস এজ বিলম্বিত করে</em></li>
</ul>

</ExpandableCard>

---

### বার্লিন {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### সারাংশ {#berlin-summary}

বার্লিন আপগ্রেড নির্দিষ্ট EVM অ্যাকশনের জন্য গ্যাস খরচ অপ্টিমাইজ করেছে এবং একাধিক লেনদেনের প্রকারের জন্য সমর্থন বাড়িয়েছে।

- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [ইথেরিয়াম ক্যাট হার্ডারের ব্যাখ্যা পড়ুন](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExp গ্যাস খরচ কমায়</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>একাধিক লেনদেনের ধরনের জন্য সহজ সমর্থন সক্ষম করে</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>স্টেট অ্যাক্সেস অপকোডের জন্য গ্যাস খরচ বৃদ্ধি</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>ঐচ্ছিক অ্যাক্সেস তালিকা যোগ করে</em></li>
</ul>

</ExpandableCard>

<Divider />

## ২০২০ {#2020}

### বিকন চেইন জেনেসিস {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### সারাংশ {#beacon-chain-genesis-summary}

[বিকন চেইন](/roadmap/beacon-chain/) নিরাপদে চালু করার জন্য ৩২টি স্টেক করা ETH-এর ১৬৩৮৪টি ডিপোজিটের প্রয়োজন ছিল। এটি ২৭শে নভেম্বর ঘটেছিল, এবং বিকন চেইন ১লা ডিসেম্বর, ২০২০-এ ব্লক তৈরি করা শুরু করেছিল।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  বিকন চেইন
</DocLink>

---

### স্টেকিং ডিপোজিট চুক্তি স্থাপন করা হয়েছে {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### সারাংশ {#deposit-contract-summary}

স্টেকিং ডিপোজিট চুক্তিটি ইথেরিয়াম ইকোসিস্টেমে [স্টেকিং](/glossary/#staking) চালু করেছে। যদিও এটি একটি [মেইননেট](/glossary/#mainnet) চুক্তি, এটি [বিকন চেইন](/roadmap/beacon-chain/) চালু করার সময়রেখার উপর সরাসরি প্রভাব ফেলেছিল, যা একটি গুরুত্বপূর্ণ [ইথেরিয়াম আপগ্রেড](/roadmap/)।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  স্টেকিং
</DocLink>

---

### ম্যুর গ্লেসিয়ার {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### সারাংশ {#muir-glacier-summary}

ম্যুর গ্লেসিয়ার ফর্ক [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb)-এ একটি বিলম্ব এনেছে। [প্রুফ-অফ-ওয়ার্ক](/developers/docs/consensus-mechanisms/pow/) কনসেন্সাস পদ্ধতির ব্লক ডিফিকাল্টি বৃদ্ধি লেনদেন পাঠানো এবং ডিএ্যাপস ব্যবহার করার জন্য অপেক্ষার সময় বাড়িয়ে ইথেরিয়ামের ব্যবহারযোগ্যতা হ্রাস করার হুমকি দিয়েছে।

- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [ইথেরিয়াম ক্যাট হার্ডারের ব্যাখ্যা পড়ুন](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>আরও ৪,০০০,০০০ ব্লক বা ~৬১১ দিনের জন্য ডিফিকাল্টি বম্ব বিলম্বিত করে।</em></li>
</ul>

</ExpandableCard>

<Divider />

## ২০১৯ {#2019}

### ইস্তাম্বুল {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### সারাংশ {#istanbul-summary}

ইস্তাম্বুল ফর্ক:

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)-এ নির্দিষ্ট কিছু কাজের [গ্যাস](/glossary/#gas) খরচ অপ্টিমাইজ করা হয়েছে।
- ডিনায়াল-অফ-সার্ভিস আক্রমণের সহনশীলতা উন্নত করা হয়েছে।
- SNARKs এবং STARKs-এর উপর ভিত্তি করে [লেয়ার ২ স্কেলিং](/developers/docs/scaling/#layer-2-scaling) সমাধানগুলিকে আরও কর্মক্ষম করে তুলেছে।
- ইথেরিয়াম এবং Zcash-কে আন্তঃক্রিয়া করতে সক্ষম করেছে।
- চুক্তিগুলিকে আরও সৃজনশীল ফাংশন প্রবর্তন করার অনুমতি দিয়েছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>ইথেরিয়ামকে Zcash-এর মতো গোপনীয়তা-সংরক্ষণকারী মুদ্রার সাথে কাজ করার অনুমতি দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>[গ্যাস](/glossary/#gas) খরচ উন্নত করার জন্য সস্তা ক্রিপ্টোগ্রাফি।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [অপকোড](/developers/docs/ethereum-stack/#ethereum-virtual-machine) যোগ করে ইথেরিয়ামকে রিপ্লে আক্রমণের বিরুদ্ধে রক্ষা করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>ব্যবহারের উপর ভিত্তি করে অপকোড গ্যাস মূল্য অপ্টিমাইজ করা।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>ব্লকে আরও ডেটা അനുവദ করতে CallData-এর খরচ কমায় – [লেয়ার ২ স্কেলিং](/developers/docs/scaling/#layer-2-scaling)-এর জন্য ভালো।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>অন্যান্য অপকোড গ্যাস মূল্যের পরিবর্তন।</em></li>
</ul>

</ExpandableCard>

---

### কনস্টান্টিনোপল {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### সারাংশ {#constantinople-summary}

কনস্টান্টিনোপল ফর্ক:

- ব্লক [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining/) পুরস্কার ৩ থেকে ২ ETH-এ হ্রাস করা হয়েছে।
- নিশ্চিত করা হয়েছে যে [প্রুফ-অফ-স্টেক বাস্তবায়িত হওয়ার আগে](#beacon-chain-genesis) ব্লকচেইন হিমায়িত হবে না।
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)-এ নির্দিষ্ট কিছু কাজের [গ্যাস](/glossary/#gas) খরচ অপ্টিমাইজ করা হয়েছে।
- এখনও তৈরি হয়নি এমন অ্যাড্রেসগুলির সাথে ইন্টারঅ্যাক্ট করার ক্ষমতা যোগ করা হয়েছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>কিছু অনচেইন কর্মের খরচ অপ্টিমাইজ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>আপনাকে এখনও তৈরি হয়নি এমন অ্যাড্রেসগুলির সাথে ইন্টারঅ্যাক্ট করতে দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>অন্য চুক্তির কোডের হ্যাশ পুনরুদ্ধার করতে <code>EXTCODEHASH</code> নির্দেশ প্রবর্তন করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>প্রুফ-অফ-স্টেকের আগে ব্লকচেইন হিমায়িত না হয় তা নিশ্চিত করে এবং ব্লক পুরস্কার ৩ থেকে ২ ETH-এ হ্রাস করে।</em></li>
</ul>

</ExpandableCard>

<Divider />

## ২০১৭ {#2017}

### বাইজেন্টাইন {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### সারাংশ {#byzantium-summary}

বাইজেন্টাইন ফর্ক:

- ব্লক [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining/) পুরস্কার ৫ থেকে ৩ ETH-এ হ্রাস করা হয়েছে।
- [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) এক বছর বিলম্বিত করা হয়েছে।
- অন্যান্য চুক্তিতে নন-স্টেট-চেঞ্জিং কল করার ক্ষমতা যোগ করা হয়েছে।
- [লেয়ার ২ স্কেলিং](/developers/docs/scaling/#layer-2-scaling)-এর জন্য কিছু ক্রিপ্টোগ্রাফি পদ্ধতি যোগ করা হয়েছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code> অপকোড যোগ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>সফলতা বা ব্যর্থতা নির্দেশ করতে লেনদেনের রসিদে স্ট্যাটাস ফিল্ড যোগ করা হয়েছে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)-এর জন্য এলিপটিক কার্ভ এবং স্কেলার গুণন যোগ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)-এর জন্য এলিপটিক কার্ভ এবং স্কেলার গুণন যোগ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA স্বাক্ষর যাচাইকরণ সক্ষম করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>পরিবর্তনশীল দৈর্ঘ্যের রিটার্ন মানগুলির জন্য সমর্থন যোগ করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em><code>STATICCALL</code> অপকোড যোগ করে, যা অন্যান্য চুক্তিতে নন-স্টেট-চেঞ্জিং কল করার অনুমতি দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>ডিফিকাল্টি সমন্বয় সূত্র পরিবর্তন করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) ১ বছর বিলম্বিত করে এবং ব্লক পুরস্কার ৫ থেকে ৩ ETH-এ হ্রাস করে।</em></li>
</ul>

</ExpandableCard>

<Divider />

## ২০১৬ {#2016}

### স্পুরিয়াস ড্রাগন {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### সারাংশ {#spurious-dragon-summary}

স্পুরিয়াস ড্রাগন ফর্কটি নেটওয়ার্কে ডিনায়াল অফ সার্ভিস (DoS) আক্রমণের (সেপ্টেম্বর/অক্টোবর ২০১৬) দ্বিতীয় প্রতিক্রিয়া ছিল, যার মধ্যে রয়েছে:

- নেটওয়ার্কে ভবিষ্যতের আক্রমণ প্রতিরোধ করার জন্য অপকোড মূল্য নির্ধারণ করা।
- ব্লকচেইন স্টেটের “ডিব্লোট” সক্ষম করা।
- রিপ্লে অ্যাটাক সুরক্ষা যোগ করা।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>একটি ইথেরিয়াম চেইন থেকে লেনদেনকে অন্য চেইনে পুনঃসম্প্রচার করা থেকে বাধা দেয়, উদাহরণস্বরূপ একটি টেস্টনেট লেনদেনকে প্রধান ইথেরিয়াম চেইনে রিপ্লে করা।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code> অপকোডের দাম সমন্বয় করে – কম্পিউটেশনালি ব্যয়বহুল চুক্তি অপারেশনের মাধ্যমে নেটওয়ার্ককে ধীর করা আরও কঠিন করে তোলে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS আক্রমণের মাধ্যমে যোগ করা খালি অ্যাকাউন্টগুলি অপসারণের অনুমতি দেয়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ব্লকচেইনে একটি চুক্তির সর্বোচ্চ কোড আকার পরিবর্তন করে – ২৪৫৭৬ বাইটে।</em></li>
</ul>

</ExpandableCard>

---

### ট্যাঞ্জেরিন হুইসেল {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### সারাংশ {#tangerine-whistle-summary}

ট্যাঞ্জেরিন হুইসেল ফর্কটি নেটওয়ার্কে ডিনায়াল অফ সার্ভিস (DoS) আক্রমণের (সেপ্টেম্বর/অক্টোবর ২০১৬) প্রথম প্রতিক্রিয়া ছিল, যার মধ্যে রয়েছে:

- কম মূল্যের অপারেশন কোড সম্পর্কিত জরুরি নেটওয়ার্ক স্বাস্থ্য সমস্যা সমাধান করা।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>স্প্যাম আক্রমণে ব্যবহার করা যেতে পারে এমন অপকোডগুলির গ্যাস খরচ বাড়ায়।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>ইথেরিয়াম প্রোটোকলের পূর্ববর্তী সংস্করণগুলির ত্রুটির কারণে খুব কম খরচে স্টেটে রাখা বিপুল সংখ্যক খালি অ্যাকাউন্ট অপসারণ করে স্টেটের আকার হ্রাস করে।</em></li>
</ul>

</ExpandableCard>

---

### DAO ফর্ক {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### সারাংশ {#dao-fork-summary}

DAO ফর্কটি [২০১৬ সালের DAO আক্রমণ](https://www.coindesk.com/learn/understanding-the-dao-attack/)-এর প্রতিক্রিয়া হিসাবে হয়েছিল যেখানে একটি অনিরাপদ [DAO](/glossary/#dao) চুক্তি থেকে একটি হ্যাকের মাধ্যমে ৩.৬ মিলিয়নেরও বেশি ETH সরানো হয়েছিল। ফর্কটি ত্রুটিপূর্ণ চুক্তি থেকে তহবিলগুলিকে একটি [নতুন চুক্তিতে](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) সরিয়ে দিয়েছে যার একটি মাত্র ফাংশন ছিল: উইথড্র। যাঁরা তহবিল হারিয়েছেন তাঁরা তাঁদের ওয়ালেটের প্রতি ১০০ DAO টোকেনের জন্য ১ ETH উইথড্র করতে পারতেন।

এই পদক্ষেপটি ইথেরিয়াম কমিউনিটি দ্বারা ভোট দেওয়া হয়েছিল। যেকোনো ETH হোল্ডার [একটি ভোটিং প্ল্যাটফর্মে](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) একটি লেনদেনের মাধ্যমে ভোট দিতে পারতেন। ফোর্ক করার সিদ্ধান্তটি 85% ভোটে পৌঁছেছে।

কিছু মাইনার ফর্ক করতে অস্বীকার করেছিল কারণ DAO ঘটনাটি প্রোটোকলের ত্রুটি ছিল না। তারা পরবর্তীতে [Ethereum Classic](https://ethereumclassic.org/) গঠন করে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### হোমস্টেড {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### সারাংশ {#homestead-summary}

হোমস্টেড ফর্ক যা ভবিষ্যতের দিকে তাকিয়ে ছিল। এটিতে বেশ কিছু প্রোটোকল পরিবর্তন এবং একটি নেটওয়ার্কিং পরিবর্তন অন্তর্ভুক্ত ছিল যা ইথেরিয়ামকে আরও নেটওয়ার্ক আপগ্রেড করার ক্ষমতা দিয়েছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>চুক্তি তৈরির প্রক্রিয়ায় সম্পাদনা করে।</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>নতুন অপকোড যোগ করে: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p ফরোয়ার্ড সামঞ্জস্যতার প্রয়োজনীয়তা প্রবর্তন করে</em></li>
</ul>

</ExpandableCard>

<Divider />

## ২০১৫ {#2015}

### ফ্রন্টিয়ার থোয়িং {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### সারাংশ {#frontier-thawing-summary}

ফ্রন্টিয়ার থোয়িং ফর্কটি প্রতি [ব্লকে](/glossary/#block) ৫,০০০ [গ্যাস](/glossary/#gas) সীমা তুলে দিয়েছে এবং ডিফল্ট গ্যাস মূল্য ৫১ [gwei](/glossary/#gwei) সেট করেছে। এটি লেনদেনের অনুমতি দিয়েছে – লেনদেনের জন্য ২১,০০০ গ্যাস প্রয়োজন। [প্রুফ-অফ-স্টেক](/glossary/#pos)-এ ভবিষ্যতের হার্ড-ফর্ক নিশ্চিত করার জন্য [ডিফিকাল্টি বম্ব](/glossary/#difficulty-bomb) চালু করা হয়েছিল।

- [ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [ইথেরিয়াম প্রোটোকল আপডেট ১ পড়ুন](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### ফ্রন্টিয়ার {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### সারাংশ {#frontier-summary}

ফ্রন্টিয়ার ইথেরিয়াম প্রকল্পের একটি লাইভ, কিন্তু বেয়ারবোন বাস্তবায়ন ছিল। এটি সফল অলিম্পিক টেস্টিং পর্ব অনুসরণ করেছে। এটি প্রযুক্তিগত ব্যবহারকারীদের জন্য, বিশেষ করে ডেভেলপারদের জন্য ಉದ್ದೇಶিত ছিল। [ব্লক](/glossary/#block)-এর [গ্যাস](/glossary/#gas) সীমা ছিল ৫,০০০। এই ‘থোয়িং’ সময়কাল মাইনারদের তাদের কার্যক্রম শুরু করতে এবং প্রাথমিক গ্রহণকারীদের ‘তাড়াহুড়ো’ না করে তাদের ক্লায়েন্ট ইনস্টল করতে সক্ষম করেছে।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## ২০১৪ {#2014}

### ইথার বিক্রয় {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

ইথার আনুষ্ঠানিকভাবে ৪২ দিনের জন্য বিক্রির জন্য উপলব্ধ হয়েছিল। আপনি BTC দিয়ে এটি কিনতে পারতেন।

[ইথেরিয়াম ফাউন্ডেশনের ঘোষণা পড়ুন](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### ইয়েলোপেপার প্রকাশিত হয়েছে {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

ইয়েলো পেপার, ড. গ্যাভিন উডের লেখা, ইথেরিয়াম প্রোটোকলের একটি প্রযুক্তিগত সংজ্ঞা।

[ইয়েলো পেপার দেখুন](https://github.com/ethereum/yellowpaper)

<Divider />

## ২০১৩ {#2013}

### হোয়াইটপেপার প্রকাশিত হয়েছে {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

প্রারম্ভিক পেপার, ২০১৩ সালে ইথেরিয়ামের প্রতিষ্ঠাতা ভিটালিক বুটেরিন দ্বারা প্রকাশিত, যা ২০১৫ সালে প্রকল্পের লঞ্চের আগে।

<DocLink href="/whitepaper/">
  হোয়াইটপেপার
</DocLink>
