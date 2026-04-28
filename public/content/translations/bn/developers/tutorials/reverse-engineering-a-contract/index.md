---
title: "একটি কন্ট্রাক্ট রিভার্স ইঞ্জিনিয়ারিং করা"
description: "সোর্স কোড না থাকলে কীভাবে একটি কন্ট্রাক্ট বুঝতে হয়"
author: "ওরি পোমেরান্টজ"
lang: bn
tags: ["evm", "opcodes"]
skill: advanced
breadcrumb: "রিভার্স ইঞ্জিনিয়ারিং"
published: 2021-12-30
---
## ভূমিকা {#introduction}

_ব্লকচেইনে কোনো গোপনীয়তা নেই_, যা কিছু ঘটে তা সামঞ্জস্যপূর্ণ, যাচাইযোগ্য এবং সর্বজনীনভাবে উপলব্ধ। আদর্শভাবে, [কন্ট্রাক্টগুলোর সোর্স কোড Etherscan-এ প্রকাশিত এবং যাচাই করা উচিত](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)। তবে, [সবসময় এমনটা হয় না](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)। এই আর্টিকেলে আপনি শিখবেন কীভাবে সোর্স কোড ছাড়া একটি কন্ট্রাক্ট, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) দেখে কন্ট্রাক্টগুলো রিভার্স ইঞ্জিনিয়ারিং করতে হয়।

রিভার্স কম্পাইলার রয়েছে, কিন্তু সেগুলো সবসময় [ব্যবহারযোগ্য ফলাফল](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f) তৈরি করে না। এই আর্টিকেলে আপনি শিখবেন কীভাবে ম্যানুয়ালি রিভার্স ইঞ্জিনিয়ারিং করতে হয় এবং [অপকোডগুলো](https://github.com/wolflo/evm-opcodes) থেকে একটি কন্ট্রাক্ট বুঝতে হয়, পাশাপাশি একটি ডিকম্পাইলারের ফলাফল কীভাবে ব্যাখ্যা করতে হয়।

এই আর্টিকেলটি বোঝার জন্য আপনার ইভিএম (EVM)-এর বেসিক বিষয়গুলো জানা উচিত এবং ইভিএম অ্যাসেম্বলারের সাথে অন্তত কিছুটা পরিচিত হওয়া উচিত। [আপনি এই বিষয়গুলো সম্পর্কে এখানে পড়তে পারেন](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)।

## এক্সিকিউটেবল কোড প্রস্তুত করুন {#prepare-the-executable-code}

আপনি কন্ট্রাক্টের জন্য Etherscan-এ গিয়ে, **Contract** ট্যাবে ক্লিক করে এবং তারপর **Switch to Opcodes View**-এ ক্লিক করে অপকোডগুলো (opcodes) পেতে পারেন। আপনি এমন একটি ভিউ পাবেন যেখানে প্রতি লাইনে একটি করে অপকোড থাকবে।

![Etherscan থেকে অপকোড ভিউ](opcode-view.png)

যাইহোক, জাম্পগুলো (jumps) বোঝার জন্য আপনাকে জানতে হবে কোডের কোথায় প্রতিটি অপকোড অবস্থিত। এটি করার একটি উপায় হলো একটি Google Spreadsheet খোলা এবং কলাম C-তে অপকোডগুলো পেস্ট করা। [আপনি এই আগে থেকে প্রস্তুত করা স্প্রেডশিটের একটি কপি তৈরি করে নিচের ধাপগুলো এড়িয়ে যেতে পারেন](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)।

পরবর্তী ধাপ হলো কোডের সঠিক অবস্থানগুলো বের করা যাতে আমরা জাম্পগুলো বুঝতে পারি। আমরা কলাম B-তে অপকোডের আকার এবং কলাম A-তে অবস্থান (হেক্সাডেসিম্যালে) রাখব। `B1` সেলে এই ফাংশনটি টাইপ করুন এবং তারপর কোডের শেষ পর্যন্ত কলাম B-এর বাকি অংশের জন্য এটি কপি এবং পেস্ট করুন। এটি করার পর আপনি কলাম B লুকিয়ে রাখতে পারেন।

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

প্রথমে এই ফাংশনটি অপকোডের জন্য এক বাইট যোগ করে এবং তারপর `PUSH` খোঁজে। পুশ (Push) অপকোডগুলো বিশেষ কারণ পুশ করা ভ্যালুর জন্য এগুলোতে অতিরিক্ত বাইট থাকতে হয়। যদি অপকোডটি একটি `PUSH` হয়, তবে আমরা বাইটের সংখ্যা বের করি এবং তা যোগ করি।

`A1`-এ প্রথম অফসেট, শূন্য (0) রাখুন। তারপর, `A2`-তে এই ফাংশনটি রাখুন এবং আবার কলাম A-এর বাকি অংশের জন্য এটি কপি এবং পেস্ট করুন:

```
=dec2hex(hex2dec(A1)+B1)
```

আমাদের এই ফাংশনটি প্রয়োজন যাতে এটি আমাদের হেক্সাডেসিম্যাল ভ্যালু দেয়, কারণ জাম্পের (`JUMP` এবং `JUMPI`) আগে পুশ করা ভ্যালুগুলো আমাদের হেক্সাডেসিম্যালে দেওয়া হয়।

## এন্ট্রি পয়েন্ট (0x00) {#the-entry-point-0x00}

কন্ট্রাক্টগুলো সবসময় প্রথম বাইট থেকে এক্সিকিউট করা হয়। এটি কোডের প্রাথমিক অংশ:

| অফসেট | অপকোড | স্ট্যাক (অপকোডের পরে) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Empty                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Empty                    |

এই কোডটি দুটি কাজ করে:

1. মেমরি লোকেশন 0x40-0x5F-এ 32 বাইট ভ্যালু হিসেবে 0x80 লেখে (0x80 স্টোর করা হয় 0x5F-এ, এবং 0x40-0x5E এর সবগুলো শূন্য)।
2. কলডাটার সাইজ রিড করে। সাধারণত একটি ইথিরিয়াম কন্ট্রাক্টের কল ডাটা [এবিআই (অ্যাপ্লিকেশন বাইনারি ইন্টারফেস)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html) অনুসরণ করে, যার জন্য ফাংশন সিলেক্টরের জন্য ন্যূনতম চার বাইট প্রয়োজন হয়। কল ডাটার সাইজ চারের কম হলে, 0x5E-তে জাম্প করে।

![এই অংশের ফ্লোচার্ট](flowchart-entry.png)

### 0x5E-তে হ্যান্ডলার (নন-এবিআই কল ডাটার জন্য) {#the-handler-at-0x5e-for-non-abi-call-data}

| অফসেট | অপকোড |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

এই স্নিপেটটি একটি `JUMPDEST` দিয়ে শুরু হয়। ইভিএম (ইথিরিয়াম ভার্চুয়াল মেশিন) প্রোগ্রামগুলো একটি এক্সেপশন থ্রো করে যদি আপনি এমন কোনো অপকোডে জাম্প করেন যা `JUMPDEST` নয়। এরপর এটি CALLDATASIZE দেখে, এবং যদি এটি "true" হয় (অর্থাৎ, শূন্য না হয়) তবে 0x7C-তে জাম্প করে। আমরা নিচে সে বিষয়ে আলোচনা করব।

| অফসেট | অপকোড | স্ট্যাক (অপকোডের পরে) |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | কলের মাধ্যমে প্রদান করা [ওয়েই (Wei)](/glossary/#wei)। সলিডিটিতে একে `msg.value` বলা হয় |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

সুতরাং যখন কোনো কল ডাটা থাকে না, তখন আমরা Storage[6]-এর ভ্যালু রিড করি। আমরা এখনও জানি না এই ভ্যালুটি কী, তবে আমরা এমন লেনদেন খুঁজতে পারি যা কন্ট্রাক্টটি কোনো কল ডাটা ছাড়াই গ্রহণ করেছে। যেসব লেনদেন কোনো কল ডাটা ছাড়াই (এবং তাই কোনো মেথড ছাড়াই) শুধুমাত্র ETH ট্রান্সফার করে, ইথারস্ক্যানে সেগুলোর মেথড হিসেবে `Transfer` থাকে। প্রকৃতপক্ষে, [কন্ট্রাক্টটি যে প্রথম লেনদেনটি গ্রহণ করেছিল](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) তা হলো একটি ট্রান্সফার।

আমরা যদি সেই লেনদেনটি দেখি এবং **Click to see More**-এ ক্লিক করি, তবে দেখতে পাব যে কল ডাটা, যাকে ইনপুট ডাটা বলা হয়, তা আসলেই ফাঁকা (`0x`)। আরও খেয়াল করুন যে ভ্যালুটি হলো 1.559 ETH, যা পরবর্তীতে প্রাসঙ্গিক হবে।

![কল ডাটা ফাঁকা](calldata-empty.png)

এরপর, **State** ট্যাবে ক্লিক করুন এবং আমরা যে কন্ট্রাক্টটি রিভার্স ইঞ্জিনিয়ারিং করছি (0x2510...) তা এক্সপ্যান্ড করুন। আপনি দেখতে পাবেন যে লেনদেন চলাকালীন `Storage[6]` পরিবর্তিত হয়েছে, এবং আপনি যদি Hex থেকে **Number**-এ পরিবর্তন করেন, তবে দেখতে পাবেন এটি 1,559,000,000,000,000,000 হয়েছে, যা ওয়েই-তে ট্রান্সফার করা ভ্যালু (আমি স্পষ্টতার জন্য কমা যোগ করেছি), যা পরবর্তী কন্ট্রাক্ট ভ্যালুর সাথে মিলে যায়।

![Storage[6]-এ পরিবর্তন](storage6.png)

আমরা যদি [একই সময়ের অন্যান্য `Transfer` লেনদেন](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)-এর কারণে হওয়া স্টেট পরিবর্তনগুলো দেখি, তবে দেখতে পাব যে `Storage[6]` কিছু সময়ের জন্য কন্ট্রাক্টের ভ্যালু ট্র্যাক করেছে। আপাতত আমরা একে `Value*` বলব। অ্যাস্টেরিস্ক (`*`) আমাদের মনে করিয়ে দেয় যে আমরা এখনও _জানি না_ এই ভ্যারিয়েবলটি কী কাজ করে, তবে এটি শুধুমাত্র কন্ট্রাক্টের ভ্যালু ট্র্যাক করার জন্য হতে পারে না কারণ স্টোরেজ ব্যবহার করার কোনো প্রয়োজন নেই, যা অত্যন্ত ব্যয়বহুল, যখন আপনি `ADDRESS BALANCE` ব্যবহার করে আপনার একাউন্ট ব্যালেন্স পেতে পারেন। প্রথম অপকোডটি কন্ট্রাক্টের নিজস্ব এডড্রেস পুশ করে। দ্বিতীয়টি স্ট্যাকের উপরের এডড্রেসটি রিড করে এবং সেটিকে সেই এডড্রেসের ব্যালেন্স দিয়ে রিপ্লেস করে।

| অফসেট | অপকোড | স্ট্যাক |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

আমরা জাম্প ডেস্টিনেশনে এই কোডটি ট্রেস করা চালিয়ে যাব।

| অফসেট | অপকোড | স্ট্যাক |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` হলো বিটওয়াইজ, তাই এটি কল ভ্যালুর প্রতিটি বিটের মান উল্টে দেয়।

| অফসেট | অপকোড | স্ট্যাক |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

যদি `Value*` 2^256-CALLVALUE-1 এর চেয়ে ছোট বা সমান হয় তবে আমরা জাম্প করি। এটি ওভারফ্লো প্রতিরোধ করার লজিক বলে মনে হচ্ছে। এবং সত্যিই, আমরা দেখতে পাই যে কয়েকটি অর্থহীন অপারেশনের পরে (উদাহরণস্বরূপ, মেমরিতে লেখা যা মুছে ফেলা হতে চলেছে) 0x01DE অফসেটে ওভারফ্লো শনাক্ত হলে কন্ট্রাক্টটি রিভার্ট করে, যা একটি স্বাভাবিক আচরণ।

লক্ষণীয় যে, এই ধরনের ওভারফ্লো হওয়ার সম্ভাবনা অত্যন্ত কম, কারণ এর জন্য কল ভ্যালু এবং `Value*` এর যোগফল 2^256 ওয়েই-এর কাছাকাছি হতে হবে, যা প্রায় 10^59 ETH। [লেখার সময়, মোট ETH সাপ্লাই দুইশ মিলিয়নেরও কম](https://etherscan.io/stat/supply)।

| অফসেট | অপকোড | স্ট্যাক |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

যদি আমরা এখানে পৌঁছাই, তবে `Value* + CALLVALUE` নিন এবং 0x75 অফসেটে জাম্প করুন।

| অফসেট | অপকোড | স্ট্যাক |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

যদি আমরা এখানে পৌঁছাই (যার জন্য কল ডাটা ফাঁকা হওয়া প্রয়োজন) তবে আমরা `Value*`-এর সাথে কল ভ্যালু যোগ করি। এটি `Transfer` লেনদেনগুলো যা করে বলে আমরা উল্লেখ করেছি, তার সাথে সামঞ্জস্যপূর্ণ।

| অফসেট | অপকোড |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

অবশেষে, স্ট্যাক ক্লিয়ার করুন (যা প্রয়োজনীয় নয়) এবং লেনদেনের সফল সমাপ্তির সংকেত দিন।

সব মিলিয়ে, এখানে প্রাথমিক কোডের জন্য একটি ফ্লোচার্ট দেওয়া হলো।

![এন্ট্রি পয়েন্ট ফ্লোচার্ট](flowchart-entry.png)

## 0x7C তে হ্যান্ডলার {#the-handler-at-0x7c}

আমি ইচ্ছাকৃতভাবেই এই হ্যান্ডলারটি কী করে তা শিরোনামে রাখিনি। এর উদ্দেশ্য আপনাকে এই নির্দিষ্ট কন্ট্রাক্টটি কীভাবে কাজ করে তা শেখানো নয়, বরং কীভাবে কন্ট্রাক্ট রিভার্স ইঞ্জিনিয়ারিং করতে হয় তা শেখানো। আমি যেভাবে কোড অনুসরণ করে এটি কী করে তা শিখেছি, আপনিও সেভাবেই শিখবেন।

আমরা বেশ কয়েকটি জায়গা থেকে এখানে আসি:

- যদি 1, 2, বা 3 বাইটের কল ডেটা থাকে (অফসেট 0x63 থেকে)
- যদি মেথড সিগনেচার অজানা থাকে (অফসেট 0x42 এবং 0x5D থেকে)

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

এটি আরেকটি স্টোরেজ সেল, যা আমি কোনো লেনদেনে খুঁজে পাইনি তাই এর অর্থ কী তা জানা কঠিন। নিচের কোডটি এটিকে আরও পরিষ্কার করবে।

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

এই অপকোডগুলো Storage[3] থেকে পড়া মানটিকে 160 বিটে ট্রাঙ্কেট (truncate) করে, যা একটি ইথেরিয়াম এডড্রেস এর দৈর্ঘ্য।

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

এই জাম্পটি অপ্রয়োজনীয়, কারণ আমরা পরবর্তী অপকোডে যাচ্ছি। এই কোডটি যতটা গ্যাস-সাশ্রয়ী হতে পারত, ততটা নয়।

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

কোডের একেবারে শুরুতে আমরা Mem[0x40] কে 0x80 তে সেট করি। যদি আমরা পরে 0x40 খুঁজি, আমরা দেখতে পাই যে আমরা এটি পরিবর্তন করিনি - তাই আমরা ধরে নিতে পারি এটি 0x80।

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

0x80 থেকে শুরু করে সমস্ত কল ডেটা মেমোরিতে কপি করুন।

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

এখন বিষয়গুলো অনেক বেশি পরিষ্কার। এই কন্ট্রাক্টটি একটি [প্রক্সি](https://blog.openzeppelin.com/proxy-patterns/) হিসেবে কাজ করতে পারে, যা আসল কাজটি করার জন্য Storage[3] এর এডড্রেস কল করে। `DELEGATE_CALL` একটি আলাদা কন্ট্রাক্ট কল করে, কিন্তু একই স্টোরেজে থাকে। এর মানে হলো ডেলিগেটেড কন্ট্রাক্ট, যার জন্য আমরা একটি প্রক্সি, একই স্টোরেজ স্পেস অ্যাক্সেস করে। কলের জন্য প্যারামিটারগুলো হলো:

- _গ্যাস_: অবশিষ্ট সমস্ত গ্যাস
- _কল করা এডড্রেস_: Storage[3]-as-address
- _কল ডেটা_: 0x80 থেকে শুরু হওয়া CALLDATASIZE বাইট, যেখানে আমরা আসল কল ডেটা রেখেছিলাম
- _রিটার্ন ডেটা_: কোনোটিই নয় (0x00 - 0x00) আমরা অন্য উপায়ে রিটার্ন ডেটা পাব (নিচে দেখুন)

| Offset | Opcode         | Stack                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

এখানে আমরা 0x80 থেকে শুরু হওয়া মেমোরি বাফারে সমস্ত রিটার্ন ডেটা কপি করি।

| Offset | Opcode       | Stack                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

সুতরাং কলের পরে আমরা রিটার্ন ডেটা 0x80 - 0x80+RETURNDATASIZE বাফারে কপি করি, এবং যদি কলটি সফল হয় তবে আমরা ঠিক সেই বাফারটি দিয়ে `RETURN` করি।

### DELEGATECALL ব্যর্থ হয়েছে {#delegatecall-failed}

যদি আমরা এখানে 0xC0 তে আসি, এর মানে হলো আমরা যে কন্ট্রাক্টটি কল করেছিলাম তা রিভার্ট (revert) হয়েছে। যেহেতু আমরা সেই কন্ট্রাক্টের জন্য শুধুমাত্র একটি প্রক্সি, তাই আমরা একই ডেটা রিটার্ন করতে চাই এবং রিভার্টও করতে চাই।

| Offset | Opcode   | Stack                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

তাই আমরা আগে `RETURN` এর জন্য যে বাফারটি ব্যবহার করেছিলাম, সেই একই বাফার দিয়ে `REVERT` করি: 0x80 - 0x80+RETURNDATASIZE

![প্রক্সিতে কলের ফ্লোচার্ট](flowchart-proxy.png)

## ABI কল {#abi-calls}

যদি কল ডাটার সাইজ চার বাইট বা তার বেশি হয়, তবে এটি একটি বৈধ ABI কল হতে পারে।

| অফসেট | অপকোড       | স্ট্যাক                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((কল ডাটার প্রথম শব্দ (256 বিট))))      |
|     10 | PUSH1 0xe0   | 0xE0 (((কল ডাটার প্রথম শব্দ (256 বিট)))) |
|     12 | SHR          | (((কল ডাটার প্রথম 32 বিট (4 বাইট))))    |

ইথারস্ক্যান (Etherscan) আমাদের বলে যে `1C` একটি অজানা অপকোড, কারণ [ইথারস্ক্যান এই ফিচারটি লেখার পর এটি যোগ করা হয়েছিল](https://eips.ethereum.org/EIPS/eip-145) এবং তারা এটি আপডেট করেনি। একটি [আপডেটেড অপকোড টেবিল](https://github.com/wolflo/evm-opcodes) আমাদের দেখায় যে এটি শিফট রাইট (shift right)।

| অফসেট | অপকোড           | স্ট্যাক                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((কল ডাটার প্রথম 32 বিট (4 বাইট)))) (((কল ডাটার প্রথম 32 বিট (4 বাইট))))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((কল ডাটার প্রথম 32 বিট (4 বাইট)))) (((কল ডাটার প্রথম 32 বিট (4 বাইট)))) |
|     19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((কল ডাটার প্রথম 32 বিট (4 বাইট))))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((কল ডাটার প্রথম 32 বিট (4 বাইট))))            |
|     1D | JUMPI            | (((কল ডাটার প্রথম 32 বিট (4 বাইট))))                                                           |

মেথড সিগনেচার ম্যাচিং টেস্টগুলোকে এভাবে দুই ভাগে ভাগ করার ফলে গড়ে অর্ধেক টেস্ট বেঁচে যায়। এর ঠিক পরের কোড এবং 0x43-এর কোড একই প্যাটার্ন অনুসরণ করে: কল ডাটার প্রথম 32 বিটে `DUP1`, `PUSH4 (((মেথড সিগনেচার>`, সমতা চেক করার জন্য `EQ` রান করা, এবং তারপর মেথড সিগনেচার মিলে গেলে `JUMPI` করা। নিচে মেথড সিগনেচার, তাদের এডড্রেস এবং যদি জানা থাকে তবে [সংশ্লিষ্ট মেথড ডেফিনিশন](https://www.4byte.directory/) দেওয়া হলো:

| মেথড                                                                                 | মেথড সিগনেচার | জাম্প করার অফসেট |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

যদি কোনো মিল না পাওয়া যায়, তবে কোডটি [0x7C-তে থাকা প্রক্সি হ্যান্ডলারে](#the-handler-at-0x7c) জাম্প করে, এই আশায় যে আমরা যে কন্ট্রাক্টের প্রক্সি হিসেবে কাজ করছি তার সাথে কোনো মিল পাওয়া যাবে।

![ABI কল ফ্লোচার্ট](flowchart-abi.png)

## splitter() {#splitter}

| অফসেট | অপকোড       | স্ট্যাক                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

এই ফাংশনটি প্রথমেই চেক করে যে কলটি কোনো ETH পাঠায়নি। এই ফাংশনটি [`payable`](https://solidity-by-example.org/payable/) নয়। যদি কেউ আমাদের ETH পাঠিয়ে থাকে তবে তা অবশ্যই একটি ভুল এবং আমরা `REVERT` করতে চাই যাতে সেই ETH এমন কোথাও আটকে না যায় যেখান থেকে তারা এটি আর ফেরত পেতে পারবে না।

| অফসেট | অপকোড                                            | স্ট্যাক                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] অর্থাৎ যে কন্ট্রাক্টের জন্য আমরা একটি প্রক্সি)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] অর্থাৎ যে কন্ট্রাক্টের জন্য আমরা একটি প্রক্সি)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] অর্থাৎ যে কন্ট্রাক্টের জন্য আমরা একটি প্রক্সি)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] অর্থাৎ যে কন্ট্রাক্টের জন্য আমরা একটি প্রক্সি))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] অর্থাৎ যে কন্ট্রাক্টের জন্য আমরা একটি প্রক্সি))) |
|    12D | SWAP2                                             | (((Storage[3] অর্থাৎ যে কন্ট্রাক্টের জন্য আমরা একটি প্রক্সি))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

এবং 0x80 এখন প্রক্সি এডড্রেস ধারণ করে

| অফসেট | অপকোড       | স্ট্যাক     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 কোড {#the-e4-code}

এই প্রথম আমরা এই লাইনগুলো দেখছি, তবে এগুলো অন্যান্য মেথডের সাথে শেয়ার করা হয়েছে (নিচে দেখুন)। তাই আমরা স্ট্যাকের ভ্যালুটিকে X বলব, এবং শুধু মনে রাখব যে `splitter()`-এ এই X-এর ভ্যালু হলো 0xA0।

| অফসেট | অপকোড     | স্ট্যাক       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

সুতরাং এই কোডটি স্ট্যাকে (X) একটি মেমরি পয়েন্টার গ্রহণ করে এবং কন্ট্রাক্টটিকে 0x80 - X বাফার সহ `RETURN` করতে নির্দেশ দেয়।

`splitter()`-এর ক্ষেত্রে, এটি সেই এডড্রেস রিটার্ন করে যার জন্য আমরা একটি প্রক্সি। `RETURN` 0x80-0x9F-এ বাফারটি রিটার্ন করে, যেখানে আমরা এই ডাটা লিখেছিলাম (উপরে অফসেট 0x130)।

## currentWindow() {#currentwindow}

0x158-0x163 অফসেটের কোডটি হুবহু 0x103-0x10E অফসেটে `splitter()`-এ আমরা যা দেখেছি তার মতোই (শুধুমাত্র `JUMPI` গন্তব্য ছাড়া), তাই আমরা জানি যে `currentWindow()`-ও `payable` নয়।

| অফসেট | অপকোড       | স্ট্যাক                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA কোড {#the-da-code}

এই কোডটি অন্যান্য মেথডের সাথেও শেয়ার করা হয়েছে। তাই আমরা স্ট্যাকের মানটিকে Y বলব, এবং শুধু মনে রাখব যে `currentWindow()`-এ এই Y-এর মান হলো Storage[1]।

| অফসেট | অপকোড     | স্ট্যাক            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Y কে 0x80-0x9F এ লিখুন।

| অফসেট | অপকোড     | স্ট্যাক          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

এবং বাকি অংশটি ইতিমধ্যেই [উপরে](#the-e4-code) ব্যাখ্যা করা হয়েছে। তাই 0xDA-তে জাম্প করলে স্ট্যাকের শীর্ষ (Y) 0x80-0x9F-এ লেখা হয় এবং সেই মানটি রিটার্ন করে। `currentWindow()`-এর ক্ষেত্রে, এটি Storage[1] রিটার্ন করে।

## merkleRoot() {#merkleroot}

অফসেট 0xED-0xF8 এর কোডটি `splitter()` এর 0x103-0x10E তে আমরা যা দেখেছি তার হুবহু অনুরূপ (`JUMPI` গন্তব্য ছাড়া), তাই আমরা জানি যে `merkleRoot()` ও `payable` নয়।

| অফসেট | অপকোড       | স্ট্যাক                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

জাম্পের পরে কী ঘটে [তা আমরা আগেই বের করেছি](#the-da-code)। সুতরাং `merkleRoot()` Storage[0] রিটার্ন করে।

## 0x81e580d3 {#0x81e580d3}

0x138-0x143 অফসেটের কোডটি হুবহু 0x103-0x10E-এ `splitter()`-এ আমরা যা দেখেছি তার মতোই (শুধুমাত্র `JUMPI` গন্তব্য ছাড়া), তাই আমরা জানি যে এই ফাংশনটিও `payable` নয়।

| অফসেট | অপকোড       | স্ট্যাক                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

মনে হচ্ছে এই ফাংশনটি কল ডাটার অন্তত 32 বাইট (এক ওয়ার্ড) নেয়।

| অফসেট | অপকোড | স্ট্যাক                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

যদি এটি কল ডাটা না পায় তবে কোনো রিটার্ন ডাটা ছাড়াই লেনদেনটি রিভার্ট হয়ে যায়।

চলুন দেখি যদি ফাংশনটি তার প্রয়োজনীয় কল ডাটা পায় তবে কী ঘটে।

| অফসেট | অপকোড       | স্ট্যাক                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` হলো মেথড সিগনেচারের _পরের_ কল ডাটার প্রথম ওয়ার্ড

| অফসেট | অপকোড       | স্ট্যাক                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

যদি প্রথম ওয়ার্ডটি Storage[4]-এর চেয়ে কম না হয়, তবে ফাংশনটি ব্যর্থ হয়। এটি কোনো রিটার্ন ভ্যালু ছাড়াই রিভার্ট করে:

| অফসেট | অপকোড     | স্ট্যাক         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

যদি calldataload(4) Storage[4]-এর চেয়ে কম হয়, তবে আমরা এই কোডটি পাই:

| অফসেট | অপকোড     | স্ট্যাক                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

এবং মেমরি লোকেশন 0x00-0x1F-এ এখন 0x04 ডাটা রয়েছে (0x00-0x1E সবগুলো শূন্য, 0x1F হলো চার)

| অফসেট | অপকোড     | স্ট্যাক                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

সুতরাং স্টোরেজে একটি লুকআপ টেবিল রয়েছে, যা 0x000...0004-এর SHA3 থেকে শুরু হয় এবং প্রতিটি বৈধ কল ডাটা ভ্যালুর (Storage[4]-এর নিচের ভ্যালু) জন্য একটি এন্ট্রি রয়েছে।

| অফসেট | অপকোড | স্ট্যাক                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

আমরা ইতিমধ্যেই জানি [0xDA অফসেটের কোডটি](#the-da-code) কী করে, এটি কলারকে স্ট্যাকের শীর্ষ ভ্যালুটি রিটার্ন করে। তাই এই ফাংশনটি লুকআপ টেবিল থেকে কলারকে ভ্যালুটি রিটার্ন করে।

## 0x1f135823 {#0x1f135823}

0xC4-0xCF অফসেটের কোডটি `splitter()`-এর 0x103-0x10E-এ আমরা যা দেখেছি তার হুবহু অনুরূপ (`JUMPI` গন্তব্য ছাড়া), তাই আমরা জানি যে এই ফাংশনটিও `payable` নয়।

| অফসেট | অপকোড | স্ট্যাক |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

আমরা ইতিমধ্যেই জানি [0xDA অফসেটের কোডটি](#the-da-code) কী করে, এটি কলারকে স্ট্যাকের শীর্ষ মানটি ফেরত দেয়। সুতরাং এই ফাংশনটি `Value*` ফেরত দেয়।

### মেথড সারাংশ {#method-summary}

আপনি কি মনে করেন যে এই পর্যায়ে আপনি কন্ট্রাক্টটি বুঝতে পেরেছেন? আমি পারিনি। এখনও পর্যন্ত আমাদের কাছে এই মেথডগুলো আছে:

| মেথড | অর্থ |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer | কলের মাধ্যমে প্রদান করা মান গ্রহণ করে এবং সেই পরিমাণ অনুযায়ী `Value*` বৃদ্ধি করে |
| [splitter()](#splitter) | Storage[3], প্রক্সি এডড্রেস ফেরত দেয় |
| [currentWindow()](#currentwindow) | Storage[1] ফেরত দেয় |
| [merkleRoot()](#merkeroot) | Storage[0] ফেরত দেয় |
| [0x81e580d3](#0x81e580d3) | একটি লুকআপ টেবিল থেকে মান ফেরত দেয়, যদি প্যারামিটারটি Storage[4]-এর চেয়ে কম হয় |
| [0x1f135823](#0x1f135823) | Storage[6], অর্থাৎ Value\* ফেরত দেয় |

কিন্তু আমরা জানি যে অন্য যেকোনো কার্যকারিতা Storage[3]-এ থাকা কন্ট্রাক্ট দ্বারা প্রদান করা হয়। হয়তো আমরা যদি জানতাম যে সেই কন্ট্রাক্টটি কী, তবে এটি আমাদের একটি সূত্র দিতে পারত। সৌভাগ্যবশত, এটি হলো ব্লকচেইন এবং সবকিছুই জানা যায়, অন্তত তাত্ত্বিকভাবে। আমরা এমন কোনো মেথড দেখিনি যা Storage[3] সেট করে, তাই এটি অবশ্যই কনস্ট্রাক্টর দ্বারা সেট করা হয়েছে।

## কনস্ট্রাক্টর {#the-constructor}

যখন আমরা [একটি কন্ট্রাক্ট দেখি](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) তখন আমরা সেই লেনদেনটিও দেখতে পারি যা এটি তৈরি করেছে।

![ক্রিয়েট লেনদেনে ক্লিক করুন](create-tx.png)

যদি আমরা সেই লেনদেনে ক্লিক করি এবং তারপর **স্টেট** ট্যাবে যাই, তাহলে আমরা প্যারামিটারগুলোর প্রাথমিক মান দেখতে পাব। বিশেষ করে, আমরা দেখতে পারি যে Storage[3]-এ [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) রয়েছে। সেই কন্ট্রাক্টে অবশ্যই অনুপস্থিত কার্যকারিতা রয়েছে। আমরা যে কন্ট্রাক্টটি তদন্ত করছি তার জন্য ব্যবহৃত একই টুলগুলো ব্যবহার করে আমরা এটি বুঝতে পারি।

## প্রক্সি কন্ট্রাক্ট {#the-proxy-contract}

উপরে মূল কন্ট্রাক্টের জন্য আমরা যে একই কৌশলগুলো ব্যবহার করেছি, তা ব্যবহার করে আমরা দেখতে পারি যে কন্ট্রাক্টটি রিভার্ট করে যদি:

- কলের সাথে কোনো ETH যুক্ত থাকে (0x05-0x0F)
- কল ডাটার সাইজ 4-এর কম হয় (0x10-0x19 এবং 0xBE-0xC2)

এবং এটি যে মেথডগুলো সাপোর্ট করে সেগুলো হলো:

| মেথড                                                                                                            | মেথড সিগনেচার                | অফসেট টু জাম্প ইনটু |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97) | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

আমরা নিচের 4টি মেথড উপেক্ষা করতে পারি কারণ আমরা কখনোই সেগুলোতে পৌঁছাব না। তাদের সিগনেচারগুলো এমন যে আমাদের মূল কন্ট্রাক্ট নিজেই সেগুলোর যত্ন নেয় (আপনি উপরের বিস্তারিত দেখতে সিগনেচারগুলোতে ক্লিক করতে পারেন), তাই সেগুলো অবশ্যই [ওভাররাইড করা মেথড](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf) হতে হবে।

বাকি মেথডগুলোর মধ্যে একটি হলো `claim(<params>)`, এবং আরেকটি হলো `isClaimed(<params>)`, তাই এটিকে একটি এয়ারড্রপ কন্ট্রাক্ট বলে মনে হচ্ছে। বাকিগুলো অপকোড বাই অপকোড চেক করার পরিবর্তে, আমরা [ডিকম্পাইলার চেষ্টা করতে পারি](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), যা এই কন্ট্রাক্ট থেকে 3টি ফাংশনের জন্য ব্যবহারযোগ্য ফলাফল তৈরি করে। অন্যগুলোর রিভার্স ইঞ্জিনিয়ারিং পাঠকের জন্য অনুশীলন হিসেবে রেখে দেওয়া হলো।

### scaleAmountByPercentage {#scaleamountbypercentage}

এই ফাংশনের জন্য ডিকম্পাইলার আমাদের যা দেয় তা হলো:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

প্রথম `require` টেস্ট করে যে কল ডাটায়, ফাংশন সিগনেচারের 4 বাইট ছাড়াও, অন্তত 64 বাইট আছে, যা দুটি প্যারামিটারের জন্য যথেষ্ট। যদি না থাকে তবে স্পষ্টতই কিছু ভুল আছে।

`if` স্টেটমেন্টটি চেক করে বলে মনে হয় যে `_param1` শূন্য নয়, এবং `_param1 * _param2` নেগেটিভ নয়। এটি সম্ভবত র‍্যাপ অ্যারাউন্ডের (wrap around) ঘটনাগুলো প্রতিরোধ করার জন্য।

অবশেষে, ফাংশনটি একটি স্কেলড ভ্যালু রিটার্ন করে।

### claim {#claim}

ডিকম্পাইলার যে কোড তৈরি করে তা জটিল, এবং এর সবটুকু আমাদের জন্য প্রাসঙ্গিক নয়। আমি এর কিছু অংশ বাদ দিয়ে সেই লাইনগুলোতে ফোকাস করতে যাচ্ছি যেগুলো আমার মতে দরকারী তথ্য প্রদান করে

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

আমরা এখানে দুটি গুরুত্বপূর্ণ বিষয় দেখতে পাচ্ছি:

- `_param2`, যদিও এটি একটি `uint256` হিসেবে ডিক্লেয়ার করা হয়েছে, এটি আসলে একটি এডড্রেস
- `_param1` হলো ক্লেইম করা উইন্ডো, যা `currentWindow` বা তার আগের হতে হবে।

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

সুতরাং এখন আমরা জানি যে Storage[5] হলো উইন্ডো এবং এডড্রেসগুলোর একটি অ্যারে, এবং এডড্রেসটি সেই উইন্ডোর জন্য রিওয়ার্ড ক্লেইম করেছে কিনা।

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

আমরা জানি যে `unknown2eb4a7ab` আসলে `merkleRoot()` ফাংশন, তাই এই কোডটি দেখে মনে হচ্ছে এটি একটি [মার্কেল প্রুফ](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) ভেরিফাই করছে। এর মানে হলো `_param4` একটি মার্কেল প্রুফ।

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

এভাবেই একটি কন্ট্রাক্ট তার নিজস্ব ETH অন্য একটি এডড্রেসে (কন্ট্রাক্ট বা এক্সটার্নালি ওনড একাউন্ট) ট্রান্সফার করে। এটি ট্রান্সফার করার পরিমাণের সমান ভ্যালু দিয়ে এটিকে কল করে। তাই এটিকে ETH-এর একটি এয়ারড্রপ বলে মনে হচ্ছে।

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

নিচের দুটি লাইন আমাদের বলে যে Storage[2] ও একটি কন্ট্রাক্ট যাকে আমরা কল করি। যদি আমরা [কনস্ট্রাক্টর লেনদেনটি দেখি](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) তবে আমরা দেখতে পাই যে এই কন্ট্রাক্টটি হলো [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), একটি র‍্যাপড ইথার (Wrapped Ether) কন্ট্রাক্ট [যার সোর্স কোড Etherscan-এ আপলোড করা হয়েছে](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)।

তাই মনে হচ্ছে কন্ট্রাক্টগুলো `_param2`-তে ETH পাঠানোর চেষ্টা করে। যদি এটি করতে পারে, তবে দারুণ। যদি না পারে, তবে এটি [WETH](https://weth.tkn.eth.limo/) পাঠানোর চেষ্টা করে। যদি `_param2` একটি এক্সটার্নালি ওনড একাউন্ট (EOA) হয় তবে এটি সবসময় ETH গ্রহণ করতে পারে, কিন্তু কন্ট্রাক্টগুলো ETH গ্রহণ করতে অস্বীকার করতে পারে। তবে, WETH হলো ERC-20 এবং কন্ট্রাক্টগুলো এটি গ্রহণ করতে অস্বীকার করতে পারে না।

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

ফাংশনের শেষে আমরা দেখতে পাই যে একটি লগ এন্ট্রি তৈরি হচ্ছে। [তৈরি হওয়া লগ এন্ট্রিগুলো দেখুন](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) এবং `0xdbd5...` দিয়ে শুরু হওয়া টপিকটি ফিল্টার করুন। যদি আমরা [এমন একটি এন্ট্রি তৈরি করা লেনদেনগুলোর একটিতে ক্লিক করি](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) তবে আমরা দেখতে পাই যে এটি সত্যিই একটি ক্লেইমের মতো দেখাচ্ছে - একাউন্টটি আমরা যে কন্ট্রাক্টটি রিভার্স ইঞ্জিনিয়ারিং করছি তাতে একটি মেসেজ পাঠিয়েছে, এবং বিনিময়ে ETH পেয়েছে।

![একটি ক্লেইম লেনদেন](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

এই ফাংশনটি উপরের [`claim`](#claim)-এর মতোই। এটিও একটি মার্কেল প্রুফ চেক করে, প্রথমটিতে ETH ট্রান্সফার করার চেষ্টা করে এবং একই ধরনের লগ এন্ট্রি তৈরি করে।

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

প্রধান পার্থক্য হলো প্রথম প্যারামিটার, অর্থাৎ উইথড্র করার উইন্ডোটি এখানে নেই। এর পরিবর্তে, ক্লেইম করা যেতে পারে এমন সমস্ত উইন্ডোর উপর একটি লুপ রয়েছে।

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

তাই এটিকে একটি `claim` ভ্যারিয়েন্ট বলে মনে হচ্ছে যা সমস্ত উইন্ডো ক্লেইম করে।

## উপসংহার {#conclusion}

এতক্ষণে আপনার জানা উচিত কীভাবে অপকোড বা (যখন এটি কাজ করে) ডিকম্পাইলার ব্যবহার করে এমন কন্ট্রাক্টগুলো বুঝতে হয় যাদের সোর্স কোড পাওয়া যায় না। এই নিবন্ধের দৈর্ঘ্য থেকে যেমনটি স্পষ্ট, একটি কন্ট্রাক্ট রিভার্স ইঞ্জিনিয়ারিং করা সহজ কাজ নয়, তবে এমন একটি সিস্টেমে যেখানে নিরাপত্তা অপরিহার্য, সেখানে কন্ট্রাক্টগুলো প্রতিশ্রুতি অনুযায়ী কাজ করছে কিনা তা যাচাই করতে পারা একটি গুরুত্বপূর্ণ দক্ষতা।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।