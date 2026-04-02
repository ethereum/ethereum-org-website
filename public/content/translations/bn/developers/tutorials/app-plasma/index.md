---
title: "গোপনীয়তা বজায় রাখে এমন একটি অ্যাপ-নির্দিষ্ট প্লাজমা লিখুন"
description: "এই টিউটোরিয়ালে, আমরা ডিপোজিটের জন্য একটি আধা-গোপন ব্যাংক তৈরি করব। ব্যাংকটি একটি সেন্ট্রালাইজড উপাদান; এটি প্রতিটি ব্যবহারকারীর ব্যালেন্স জানে। তবে, এই তথ্য অনচেইন সংরক্ষণ করা হয় না। এর পরিবর্তে, ব্যাংক স্টেট-এর একটি হ্যাস পোস্ট করে। প্রতিবার লেনদেন হওয়ার সময়, ব্যাংক নতুন হ্যাস পোস্ট করে, সাথে একটি জিরো-নলেজ প্রমাণ দেয় যে এর কাছে একটি স্বাক্ষরিত লেনদেন রয়েছে যা হ্যাস স্টেট-কে নতুনটিতে পরিবর্তন করে। এই টিউটোরিয়ালটি পড়ার পর, আপনি কেবল জিরো-নলেজ প্রমাণ কীভাবে ব্যবহার করতে হয় তা-ই নয়, বরং কেন আপনি সেগুলো ব্যবহার করবেন এবং কীভাবে নিরাপদে তা করবেন তাও বুঝতে পারবেন।"
author: "ওরি পোমেরান্টজ"
tags: ["জিরো-নলেজ", "সার্ভার", "অফচেইন", "গোপনীয়তা"]
skill: advanced
breadcrumb: "অ্যাপ-নির্দিষ্ট প্লাজমা"
lang: bn
published: 2025-10-15
---

## Introduction {#introduction}

[রোলআপস](/developers/docs/scaling/zk-rollups/)-এর বিপরীতে, [প্লাজমা](/developers/docs/scaling/plasma) ইন্টিগ্রিটির জন্য ইথিরিয়াম মেইননেট ব্যবহার করে, কিন্তু এভেইলএবিলিটির জন্য নয়। এই আর্টিকেলে, আমরা এমন একটি অ্যাপ্লিকেশন লিখব যা প্লাজমার মতো আচরণ করে, যেখানে ইথিরিয়াম ইন্টিগ্রিটির (কোনো অননুমোদিত পরিবর্তন নয়) নিশ্চয়তা দেয় কিন্তু এভেইলএবিলিটির নয় (একটি সেন্ট্রালাইজড উপাদান ডাউন হয়ে পুরো সিস্টেমকে নিষ্ক্রিয় করতে পারে)।

আমরা এখানে যে অ্যাপ্লিকেশনটি লিখছি তা হলো একটি গোপনীয়তা-সংরক্ষণকারী ব্যাংক। বিভিন্ন এডড্রেস-এর ব্যালেন্সসহ একাউন্ট রয়েছে এবং তারা অন্যান্য একাউন্ট-এ অর্থ (ETH) পাঠাতে পারে। ব্যাংক স্টেট (একাউন্ট এবং তাদের ব্যালেন্স) এবং লেনদেন-এর হ্যাস পোস্ট করে, কিন্তু প্রকৃত ব্যালেন্স অফচেইন রাখে যেখানে সেগুলো গোপন থাকতে পারে।

## Design {#design}

এটি কোনো প্রোডাকশন-রেডি সিস্টেম নয়, বরং একটি শেখার টুল। তাই, এটি বেশ কয়েকটি সহজ অনুমানের ওপর ভিত্তি করে লেখা হয়েছে।

- নির্দিষ্ট একাউন্ট পুল। এখানে একটি নির্দিষ্ট সংখ্যক একাউন্ট রয়েছে এবং প্রতিটি একাউন্ট একটি পূর্বনির্ধারিত এডড্রেস-এর অন্তর্গত। এটি সিস্টেমটিকে অনেক সহজ করে তোলে কারণ জিরো-নলেজ প্রমাণে পরিবর্তনশীল আকারের ডেটা স্ট্রাকচার পরিচালনা করা কঠিন। একটি প্রোডাকশন-রেডি সিস্টেমের জন্য, আমরা স্টেট হ্যাস হিসেবে [Merkle root](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) ব্যবহার করতে পারি এবং প্রয়োজনীয় ব্যালেন্সের জন্য Merkle প্রমাণ প্রদান করতে পারি।

- মেমরি স্টোরেজ। একটি প্রোডাকশন সিস্টেমে, রিস্টার্টের ক্ষেত্রে সংরক্ষণের জন্য আমাদের সমস্ত একাউন্ট ব্যালেন্স ডিস্কে লিখতে হবে। এখানে, তথ্য হারিয়ে গেলেও কোনো সমস্যা নেই।

- শুধুমাত্র ট্রান্সফার। একটি প্রোডাকশন সিস্টেমে ব্যাংকে সম্পদ জমা দেওয়া এবং তা তোলার একটি উপায় প্রয়োজন হবে। কিন্তু এখানকার উদ্দেশ্য হলো কেবল ধারণাটি তুলে ধরা, তাই এই ব্যাংকটি শুধুমাত্র ট্রান্সফারের মধ্যে সীমাবদ্ধ।

### Zero-knowledge proofs {#zero-knowledge-proofs}

মৌলিক স্তরে, একটি জিরো-নলেজ প্রমাণ দেখায় যে প্রমাণকারী কিছু ডেটা জানে, _Data<sub>private</sub>_ এমনভাবে যে কিছু পাবলিক ডেটা, _Data<sub>public</sub>_ এবং _Data<sub>private</sub>_-এর মধ্যে একটি সম্পর্ক _Relationship_ রয়েছে। যাচাইকারী _Relationship_ এবং _Data<sub>public</sub>_ জানে।

গোপনীয়তা বজায় রাখতে, আমাদের স্টেট এবং লেনদেন গোপন রাখা প্রয়োজন। কিন্তু ইন্টিগ্রিটি নিশ্চিত করতে, আমাদের স্টেট-এর [ক্রিপ্টোগ্রাফিক হ্যাস](https://en.wikipedia.org/wiki/Cryptographic_hash_function) পাবলিক হওয়া প্রয়োজন। যারা লেনদেন জমা দেয় তাদের কাছে প্রমাণ করার জন্য যে সেই লেনদেনগুলো সত্যিই ঘটেছে, আমাদের লেনদেন হ্যাস-ও পোস্ট করতে হবে।

বেশিরভাগ ক্ষেত্রে, _Data<sub>private</sub>_ হলো জিরো-নলেজ প্রমাণ প্রোগ্রামের ইনপুট এবং _Data<sub>public</sub>_ হলো আউটপুট।

_Data<sub>private</sub>_-এর এই ফিল্ডগুলো:

- _State<sub>n</sub>_, পুরোনো স্টেট
- _State<sub>n+1</sub>_, নতুন স্টেট
- _Transaction_, একটি লেনদেন যা পুরোনো স্টেট থেকে নতুনটিতে পরিবর্তন করে। এই লেনদেন-এ এই ফিল্ডগুলো অন্তর্ভুক্ত থাকতে হবে:
  - _Destination address_ যা ট্রান্সফার গ্রহণ করে
  - _Amount_ যা ট্রান্সফার করা হচ্ছে
  - _Nonce_ এটি নিশ্চিত করতে যে প্রতিটি লেনদেন কেবল একবারই প্রসেস করা যায়।
    সোর্স এডড্রেস লেনদেন-এ থাকার প্রয়োজন নেই, কারণ এটি সিগনেচার থেকে পুনরুদ্ধার করা যেতে পারে।
- _Signature_, একটি সিগনেচার যা লেনদেন করার জন্য অনুমোদিত। আমাদের ক্ষেত্রে, লেনদেন করার জন্য অনুমোদিত একমাত্র এডড্রেস হলো সোর্স এডড্রেস। যেহেতু আমাদের জিরো-নলেজ সিস্টেমটি যেভাবে কাজ করে, তাই ইথিরিয়াম সিগনেচারের পাশাপাশি আমাদের একাউন্ট-এর পাবলিক কি-ও প্রয়োজন।

_Data<sub>public</sub>_-এর ফিল্ডগুলো হলো:

- _Hash(State<sub>n</sub>)_ পুরোনো স্টেট-এর হ্যাস
- _Hash(State<sub>n+1</sub>)_ নতুন স্টেট-এর হ্যাস
- _Hash(Transaction)_ লেনদেন-এর হ্যাস যা স্টেট-কে _State<sub>n</sub>_ থেকে _State<sub>n+1</sub>_-এ পরিবর্তন করে।

সম্পর্কটি বেশ কয়েকটি শর্ত পরীক্ষা করে:

- পাবলিক হ্যাসগুলো সত্যিই প্রাইভেট ফিল্ডগুলোর জন্য সঠিক হ্যাস।
- লেনদেনটি পুরোনো স্টেট-এ প্রয়োগ করা হলে, নতুন স্টেট তৈরি হয়।
- সিগনেচারটি লেনদেন-এর সোর্স এডড্রেস থেকে আসে।

ক্রিপ্টোগ্রাফিক হ্যাস ফাংশনের বৈশিষ্ট্যগুলোর কারণে, এই শর্তগুলো প্রমাণ করাই ইন্টিগ্রিটি নিশ্চিত করার জন্য যথেষ্ট।

### Data structures {#data-structures}

প্রাথমিক ডেটা স্ট্রাকচার হলো সার্ভার দ্বারা ধারণ করা স্টেট। প্রতিটি একাউন্ট-এর জন্য, সার্ভার একাউন্ট ব্যালেন্স এবং একটি [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce)-এর ট্র্যাক রাখে, যা [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack) প্রতিরোধ করতে ব্যবহৃত হয়।

### Components {#components}

এই সিস্টেমের জন্য দুটি উপাদান প্রয়োজন:

- _সার্ভার_ যা লেনদেন গ্রহণ করে, সেগুলো প্রসেস করে এবং জিরো-নলেজ প্রমাণের সাথে চেইনে হ্যাস পোস্ট করে।
- একটি _স্মার্ট কন্ট্রাক্ট_ যা হ্যাসগুলো সংরক্ষণ করে এবং স্টেট ট্রানজিশনগুলো বৈধ কিনা তা নিশ্চিত করতে জিরো-নলেজ প্রমাণগুলো যাচাই করে।

### Data and control flow {#flows}

এগুলো হলো সেই উপায় যার মাধ্যমে বিভিন্ন উপাদান এক একাউন্ট থেকে অন্য একাউন্ট-এ ট্রান্সফার করার জন্য যোগাযোগ করে।

1. একটি ওয়েব ব্রাউজার স্বাক্ষরকারীর একাউন্ট থেকে অন্য একটি একাউন্ট-এ ট্রান্সফারের অনুরোধ করে একটি স্বাক্ষরিত লেনদেন জমা দেয়।

2. সার্ভার যাচাই করে যে লেনদেনটি বৈধ:

   - স্বাক্ষরকারীর ব্যাংকে পর্যাপ্ত ব্যালেন্সসহ একটি একাউন্ট রয়েছে।
   - প্রাপকের ব্যাংকে একটি একাউন্ট রয়েছে।

3. সার্ভার স্বাক্ষরকারীর ব্যালেন্স থেকে ট্রান্সফার করা পরিমাণ বিয়োগ করে এবং প্রাপকের ব্যালেন্সের সাথে যোগ করে নতুন স্টেট গণনা করে।

4. সার্ভার একটি জিরো-নলেজ প্রমাণ গণনা করে যে স্টেট পরিবর্তনটি বৈধ।

5. সার্ভার ইথিরিয়াম-এ একটি লেনদেন জমা দেয় যার মধ্যে অন্তর্ভুক্ত থাকে:

   - নতুন স্টেট হ্যাস
   - লেনদেন হ্যাস (যাতে লেনদেন প্রেরক জানতে পারে যে এটি প্রসেস করা হয়েছে)
   - জিরো-নলেজ প্রমাণ যা প্রমাণ করে যে নতুন স্টেট-এ ট্রানজিশনটি বৈধ

6. স্মার্ট কন্ট্রাক্ট জিরো-নলেজ প্রমাণ যাচাই করে।

7. যদি জিরো-নলেজ প্রমাণ সঠিক হয়, তবে স্মার্ট কন্ট্রাক্ট এই কাজগুলো করে:
   - বর্তমান স্টেট হ্যাস-কে নতুন স্টেট হ্যাস-এ আপডেট করে
   - নতুন স্টেট হ্যাস এবং লেনদেন হ্যাস-এর সাথে একটি লগ এন্ট্রি নির্গত করে

### Tools {#tools}

ক্লায়েন্ট-সাইড কোডের জন্য, আমরা [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), এবং [Wagmi](https://wagmi.sh/) ব্যবহার করতে যাচ্ছি। এগুলো ইন্ডাস্ট্রি-স্ট্যান্ডার্ড টুল; আপনি যদি এগুলোর সাথে পরিচিত না হন, তবে আপনি [এই টিউটোরিয়ালটি](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) ব্যবহার করতে পারেন।

সার্ভারের বেশিরভাগ অংশ [Node](https://nodejs.org/en) ব্যবহার করে JavaScript-এ লেখা হয়েছে। জিরো-নলেজ অংশটি [Noir](https://noir-lang.org/)-এ লেখা হয়েছে। আমাদের `1.0.0-beta.10` সংস্করণ প্রয়োজন, তাই আপনি [নির্দেশনা অনুযায়ী Noir ইনস্টল করার পর](https://noir-lang.org/docs/getting_started/quick_start), রান করুন:

```
noirup -v 1.0.0-beta.10
```

আমরা যে ব্লকচেইন ব্যবহার করি তা হলো `anvil`, একটি লোকাল টেস্টিং ব্লকচেইন যা [Foundry](https://getfoundry.sh/introduction/installation)-এর অংশ।

## Implementation {#implementation}

যেহেতু এটি একটি জটিল সিস্টেম, তাই আমরা এটি ধাপে ধাপে বাস্তবায়ন করব।

### Stage 1 - Manual zero knowledge {#stage-1}

প্রথম ধাপের জন্য, আমরা ব্রাউজারে একটি লেনদেন স্বাক্ষর করব এবং তারপর ম্যানুয়ালি জিরো-নলেজ প্রমাণে তথ্য প্রদান করব। জিরো-নলেজ কোডটি `server/noir/Prover.toml`-এ সেই তথ্য পাওয়ার আশা করে ([এখানে](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) ডকুমেন্টেড)।

এটি কার্যকর দেখতে:

1. নিশ্চিত করুন যে আপনার [Node](https://nodejs.org/en/download) এবং [Noir](https://noir-lang.org/install) ইনস্টল করা আছে। বিশেষত, এগুলো macOS, Linux, বা [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)-এর মতো UNIX সিস্টেমে ইনস্টল করুন।

2. স্টেজ 1 কোড ডাউনলোড করুন এবং ক্লায়েন্ট কোড পরিবেশন করতে ওয়েব সার্ভার চালু করুন।

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   এখানে আপনার একটি ওয়েব সার্ভার প্রয়োজন হওয়ার কারণ হলো, নির্দিষ্ট ধরণের জালিয়াতি রোধ করতে, অনেক ওয়ালেট (যেমন MetaMask) সরাসরি ডিস্ক থেকে পরিবেশিত ফাইল গ্রহণ করে না

3. একটি ওয়ালেট সহ একটি ব্রাউজার খুলুন।

4. ওয়ালেট-এ, একটি নতুন পাসফ্রেজ লিখুন। মনে রাখবেন যে এটি আপনার বিদ্যমান পাসফ্রেজ মুছে ফেলবে, তাই _নিশ্চিত করুন যে আপনার একটি ব্যাকআপ আছে_।

   পাসফ্রেজটি হলো `test test test test test test test test test test test junk`, যা anvil-এর ডিফল্ট টেস্টিং পাসফ্রেজ।

5. [ক্লায়েন্ট-সাইড কোড](http://localhost:5173/)-এ ব্রাউজ করুন।

6. ওয়ালেট-এর সাথে কানেক্ট করুন এবং আপনার গন্তব্য একাউন্ট এবং পরিমাণ নির্বাচন করুন।

7. **Sign**-এ ক্লিক করুন এবং লেনদেন স্বাক্ষর করুন।

8. **Prover.toml** শিরোনামের নিচে, আপনি টেক্সট পাবেন। `server/noir/Prover.toml`-কে সেই টেক্সট দিয়ে প্রতিস্থাপন করুন।

9. জিরো-নলেজ প্রমাণ এক্সিকিউট করুন।

   ```sh
   cd ../server/noir
   nargo execute
   ```

   আউটপুটটি এর মতো হওয়া উচিত

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. মেসেজটি সঠিকভাবে হ্যাস করা হয়েছে কিনা তা দেখতে ওয়েব ব্রাউজারে দেখা হ্যাস-এর সাথে শেষ দুটি মান তুলনা করুন।

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir দ্বারা প্রত্যাশিত তথ্যের বিন্যাস দেখায়।

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

মেসেজটি টেক্সট ফরম্যাটে রয়েছে, যা ব্যবহারকারীর জন্য বোঝা সহজ করে তোলে (যা স্বাক্ষর করার সময় প্রয়োজনীয়) এবং Noir কোডের জন্য পার্স করা সহজ করে। পরিমাণটি finneys-এ উল্লেখ করা হয়েছে যাতে একদিকে ভগ্নাংশ ট্রান্সফার সম্ভব হয় এবং অন্যদিকে সহজে পড়া যায়। শেষ সংখ্যাটি হলো [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce)।

স্ট্রিংটি 100 ক্যারেক্টার দীর্ঘ। জিরো-নলেজ প্রমাণ পরিবর্তনশীল আকারের ডেটা ভালোভাবে পরিচালনা করে না, তাই প্রায়শই ডেটা প্যাড করার প্রয়োজন হয়।

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

এই তিনটি প্যারামিটার হলো নির্দিষ্ট আকারের বাইট অ্যারে।

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

এটি স্ট্রাকচারের একটি অ্যারে নির্দিষ্ট করার উপায়। প্রতিটি এন্ট্রির জন্য, আমরা এডড্রেস, ব্যালেন্স (milliETH বা [finney](https://cryptovalleyjournal.com/glossary/finney/)-তে), এবং পরবর্তী নন্স মান নির্দিষ্ট করি।

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) ক্লায়েন্ট-সাইড প্রসেসিং বাস্তবায়ন করে এবং `server/noir/Prover.toml` ফাইল তৈরি করে (যেটিতে জিরো-নলেজ প্যারামিটার অন্তর্ভুক্ত থাকে)।

এখানে আরও আকর্ষণীয় অংশগুলোর ব্যাখ্যা দেওয়া হলো।

```tsx
export default attrs =>  {
```

এই ফাংশনটি `Transfer` React কম্পোনেন্ট তৈরি করে, যা অন্যান্য ফাইল ইমপোর্ট করতে পারে।

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

এগুলো হলো একাউন্ট এডড্রেস, `test ... test junk` পাসফ্রেজ দ্বারা তৈরি এডড্রেস। আপনি যদি নিজের এডড্রেস ব্যবহার করতে চান, তবে কেবল এই সংজ্ঞাটি পরিবর্তন করুন।

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

এই [Wagmi হুকগুলো](https://wagmi.sh/react/api/hooks) আমাদের [viem](https://viem.sh/) লাইব্রেরি এবং ওয়ালেট অ্যাক্সেস করতে দেয়।

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

এটি হলো মেসেজ, যা স্পেস দিয়ে প্যাড করা হয়েছে। প্রতিবার যখন [`useState`](https://react.dev/reference/react/useState) ভেরিয়েবলগুলোর একটি পরিবর্তিত হয়, কম্পোনেন্টটি পুনরায় আঁকা হয় এবং `message` আপডেট করা হয়।

```tsx
  const sign = async () => {
```

ব্যবহারকারী **Sign** বাটনে ক্লিক করলে এই ফাংশনটি কল করা হয়। মেসেজটি স্বয়ংক্রিয়ভাবে আপডেট হয়, কিন্তু সিগনেচারের জন্য ওয়ালেট-এ ব্যবহারকারীর অনুমোদন প্রয়োজন, এবং আমরা প্রয়োজন ছাড়া এটি চাইতে চাই না।

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

ওয়ালেট-কে [মেসেজ স্বাক্ষর করতে](https://viem.sh/docs/accounts/local/signMessage) বলুন। 

```tsx
    const hash = hashMessage(message)
```

মেসেজ হ্যাস পান। ডিবাগিংয়ের জন্য (Noir কোডের) এটি ব্যবহারকারীকে প্রদান করা সহায়ক। 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[পাবলিক কি পান](https://viem.sh/docs/utilities/recoverPublicKey)। এটি [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) ফাংশনের জন্য প্রয়োজনীয়।

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

স্টেট ভেরিয়েবলগুলো সেট করুন। এটি করলে কম্পোনেন্টটি পুনরায় আঁকা হয় (`sign` ফাংশন থেকে বের হওয়ার পর) এবং ব্যবহারকারীকে আপডেট করা মানগুলো দেখায়।

```tsx
    let proverToml = `
```

`Prover.toml`-এর জন্য টেক্সট।

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem আমাদের পাবলিক কি-কে একটি 65-বাইট হেক্সাডেসিমাল স্ট্রিং হিসেবে প্রদান করে। প্রথম বাইটটি হলো `0x04`, একটি সংস্করণ মার্কার। এর পরে পাবলিক কি-এর `x`-এর জন্য 32 বাইট এবং তারপর পাবলিক কি-এর `y`-এর জন্য 32 বাইট থাকে।

তবে, Noir এই তথ্যটি দুটি বাইট অ্যারে হিসেবে পাওয়ার আশা করে, একটি `x`-এর জন্য এবং একটি `y`-এর জন্য। জিরো-নলেজ প্রমাণের অংশ হিসেবে পার্স করার চেয়ে ক্লায়েন্টে এটি পার্স করা সহজ।

মনে রাখবেন যে এটি সাধারণভাবে জিরো-নলেজ-এ একটি ভালো অনুশীলন। জিরো-নলেজ প্রমাণের ভেতরের কোড ব্যয়বহুল, তাই জিরো-নলেজ প্রমাণের বাইরে যে কোনো প্রসেসিং করা সম্ভব তা জিরো-নলেজ প্রমাণের বাইরেই করা _উচিত_।

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

সিগনেচারটিও একটি 65-বাইট হেক্সাডেসিমাল স্ট্রিং হিসেবে প্রদান করা হয়। তবে, শেষ বাইটটি কেবল পাবলিক কি পুনরুদ্ধার করার জন্য প্রয়োজনীয়। যেহেতু পাবলিক কি ইতিমধ্যেই Noir কোডে প্রদান করা হবে, তাই সিগনেচার যাচাই করার জন্য আমাদের এটির প্রয়োজন নেই এবং Noir কোডেরও এটির প্রয়োজন নেই।

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

একাউন্টগুলো প্রদান করুন।

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

এটি কম্পোনেন্টের HTML (আরও সঠিকভাবে, [JSX](https://react.dev/learn/writing-markup-with-jsx)) ফরম্যাট।

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) হলো আসল জিরো-নলেজ কোড।

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir স্ট্যান্ডার্ড লাইব্রেরি](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)-এর সাথে প্রদান করা হয়। জিরো-নলেজ প্রমাণগুলো সাধারণত এই হ্যাস ফাংশন ব্যবহার করে। স্ট্যান্ডার্ড হ্যাস ফাংশনগুলোর তুলনায় [অ্যারিথমেটিক সার্কিট](https://rareskills.io/post/arithmetic-circuit)-এর ভেতরে এটি গণনা করা অনেক সহজ।

```
use keccak256::keccak256;
use dep::ecrecover;
```

এই দুটি ফাংশন হলো এক্সটার্নাল লাইব্রেরি, যা [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml)-এ সংজ্ঞায়িত। এগুলো ঠিক তাদের নামের মতোই কাজ করে, একটি ফাংশন যা [keccak256 হ্যাস](https://emn178.github.io/online-tools/keccak_256.html) গণনা করে এবং একটি ফাংশন যা ইথিরিয়াম সিগনেচার যাচাই করে এবং স্বাক্ষরকারীর ইথিরিয়াম এডড্রেস পুনরুদ্ধার করে।

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) দ্বারা অনুপ্রাণিত। ভেরিয়েবলগুলো ডিফল্টভাবে কনস্ট্যান্ট। এভাবেই আমরা গ্লোবাল কনফিগারেশন কনস্ট্যান্ট সংজ্ঞায়িত করি। নির্দিষ্টভাবে, `ACCOUNT_NUMBER` হলো আমরা যে সংখ্যক একাউন্ট সংরক্ষণ করি।

`u<number>` নামের ডেটা টাইপগুলো হলো সেই সংখ্যক বিট, আনসাইনড। শুধুমাত্র সমর্থিত টাইপগুলো হলো `u8`, `u16`, `u32`, `u64`, এবং `u128`।

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

এই ভেরিয়েবলটি একাউন্টগুলোর Pedersen হ্যাস-এর জন্য ব্যবহৃত হয়, যা নিচে ব্যাখ্যা করা হয়েছে।

```
global MESSAGE_LENGTH : u32 = 100;
```

উপরে ব্যাখ্যা করা অনুযায়ী, মেসেজের দৈর্ঘ্য নির্দিষ্ট। এটি এখানে নির্দিষ্ট করা হয়েছে।

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 সিগনেচার](https://eips.ethereum.org/EIPS/eip-191)-এর জন্য একটি 26-বাইট প্রিফিক্সসহ একটি বাফার প্রয়োজন, যার পরে ASCII-তে মেসেজের দৈর্ঘ্য এবং সবশেষে মেসেজটি থাকে।

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

একটি একাউন্ট সম্পর্কে আমরা যে তথ্য সংরক্ষণ করি। [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) হলো একটি সংখ্যা, সাধারণত 253 বিট পর্যন্ত, যা সরাসরি [অ্যারিথমেটিক সার্কিট](https://rareskills.io/post/arithmetic-circuit)-এ ব্যবহার করা যেতে পারে যা জিরো-নলেজ প্রমাণ বাস্তবায়ন করে। এখানে আমরা একটি 160-বিট ইথিরিয়াম এডড্রেস সংরক্ষণ করতে `Field` ব্যবহার করি।

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

একটি ট্রান্সফার লেনদেন-এর জন্য আমরা যে তথ্য সংরক্ষণ করি।

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

একটি ফাংশন সংজ্ঞা। প্যারামিটারটি হলো `Account` তথ্য। ফলাফলটি হলো `Field` ভেরিয়েবলের একটি অ্যারে, যার দৈর্ঘ্য হলো `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

অ্যারের প্রথম মানটি হলো একাউন্ট এডড্রেস। দ্বিতীয়টিতে ব্যালেন্স এবং নন্স উভয়ই অন্তর্ভুক্ত থাকে। `.into()` কলগুলো একটি সংখ্যাকে তার প্রয়োজনীয় ডেটা টাইপে পরিবর্তন করে। `account.nonce` হলো একটি `u32` মান, কিন্তু এটিকে `account.balance << 32`, একটি `u128` মানের সাথে যোগ করতে, এটিকে একটি `u128` হতে হবে। এটি হলো প্রথম `.into()`। দ্বিতীয়টি `u128` ফলাফলকে একটি `Field`-এ রূপান্তর করে যাতে এটি অ্যারেতে ফিট হয়।

```
    flat
}
```

Noir-এ, ফাংশনগুলো কেবল শেষেই একটি মান রিটার্ন করতে পারে (কোনো আর্লি রিটার্ন নেই)। রিটার্ন মান নির্দিষ্ট করতে, আপনি ফাংশনের ক্লোজিং ব্র্যাকেটের ঠিক আগে এটি মূল্যায়ন করেন।

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

এই ফাংশনটি একাউন্ট অ্যারেকে একটি `Field` অ্যারেতে পরিণত করে, যা Petersen হ্যাস-এর ইনপুট হিসেবে ব্যবহার করা যেতে পারে।

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

এভাবেই আপনি একটি মিউটেবল ভেরিয়েবল নির্দিষ্ট করেন, অর্থাৎ, একটি কনস্ট্যান্ট _নয়_। Noir-এ ভেরিয়েবলগুলোর সর্বদা একটি মান থাকতে হবে, তাই আমরা এই ভেরিয়েবলটিকে সব শূন্য দিয়ে ইনিশিয়ালাইজ করি।

```
    for i in 0..ACCOUNT_NUMBER {
```

এটি একটি `for` লুপ। মনে রাখবেন যে সীমানাগুলো কনস্ট্যান্ট। Noir লুপগুলোর সীমানা কম্পাইল টাইমে জানা থাকতে হবে। এর কারণ হলো অ্যারিথমেটিক সার্কিটগুলো ফ্লো কন্ট্রোল সমর্থন করে না। একটি `for` লুপ প্রসেস করার সময়, কম্পাইলার কেবল এর ভেতরের কোডটি একাধিকবার রাখে, প্রতিটি ইটারেশনের জন্য একবার।

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

অবশেষে, আমরা সেই ফাংশনে পৌঁছালাম যা একাউন্ট অ্যারে হ্যাস করে।

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

এই ফাংশনটি একটি নির্দিষ্ট এডড্রেসসহ একাউন্ট খুঁজে বের করে। স্ট্যান্ডার্ড কোডে এই ফাংশনটি অত্যন্ত অদক্ষ হবে কারণ এটি এডড্রেস খুঁজে পাওয়ার পরেও সমস্ত একাউন্ট-এর ওপর ইটারেট করে।

তবে, জিরো-নলেজ প্রমাণে, কোনো ফ্লো কন্ট্রোল নেই। যদি আমাদের কখনো কোনো শর্ত পরীক্ষা করার প্রয়োজন হয়, তবে আমাদের প্রতিবারই তা পরীক্ষা করতে হবে।

`if` স্টেটমেন্টের ক্ষেত্রেও একই রকম ঘটনা ঘটে। উপরের লুপের `if` স্টেটমেন্টটি এই গাণিতিক স্টেটমেন্টগুলোতে অনুবাদ করা হয়।

_condition<sub>result</sub> = accounts[i].address == address_ // সমান হলে এক, অন্যথায় শূন্য

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) ফাংশনটি জিরো-নলেজ প্রমাণকে ক্র্যাশ করায় যদি অ্যাসারশনটি মিথ্যা হয়। এই ক্ষেত্রে, যদি আমরা প্রাসঙ্গিক এডড্রেসসহ কোনো একাউন্ট খুঁজে না পাই। এডড্রেস রিপোর্ট করতে, আমরা একটি [ফরম্যাট স্ট্রিং](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) ব্যবহার করি।

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

এই ফাংশনটি একটি ট্রান্সফার লেনদেন প্রয়োগ করে এবং নতুন একাউন্ট অ্যারে রিটার্ন করে।

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

আমরা Noir-এ একটি ফরম্যাট স্ট্রিংয়ের ভেতরে স্ট্রাকচার এলিমেন্টগুলো অ্যাক্সেস করতে পারি না, তাই আমরা একটি ব্যবহারযোগ্য কপি তৈরি করি।

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

এই দুটি শর্ত একটি লেনদেন-কে অবৈধ করে তুলতে পারে।

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

নতুন একাউন্ট অ্যারে তৈরি করুন এবং তারপর এটি রিটার্ন করুন।

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

এই ফাংশনটি মেসেজ থেকে এডড্রেস পড়ে। 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

এডড্রেস সর্বদা 20 বাইট (বা 40 হেক্সাডেসিমাল ডিজিট) দীর্ঘ হয় এবং ক্যারেক্টার #7 থেকে শুরু হয়।

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 { // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 { // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 { // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

মেসেজ থেকে পরিমাণ এবং নন্স পড়ুন। 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

মেসেজে, এডড্রেস-এর পরের প্রথম সংখ্যাটি হলো ট্রান্সফার করার জন্য finney (বা ETH-এর এক সহস্রাংশ)-এর পরিমাণ। দ্বিতীয় সংখ্যাটি হলো নন্স। এগুলোর মাঝের যেকোনো টেক্সট উপেক্ষা করা হয়।

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 { // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce { // আমরা এইমাত্র এটি খুঁজে পেয়েছি
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

একটি [টাপল](https://noir-lang.org/docs/noir/concepts/data_types/tuples) রিটার্ন করা হলো একটি ফাংশন থেকে একাধিক মান রিটার্ন করার Noir উপায়।

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

এই ফাংশনটি মেসেজটিকে বাইটে রূপান্তর করে, তারপর পরিমাণগুলোকে একটি `TransferTxn`-এ রূপান্তর করে।

```rust
// Viem এর hashMessage এর সমতুল্য
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

আমরা একাউন্টগুলোর জন্য Pedersen হ্যাস ব্যবহার করতে পেরেছিলাম কারণ সেগুলো কেবল জিরো-নলেজ প্রমাণের ভেতরে হ্যাস করা হয়। তবে, এই কোডে আমাদের মেসেজের সিগনেচার পরীক্ষা করতে হবে, যা ব্রাউজার দ্বারা তৈরি হয়। এর জন্য, আমাদের [EIP 191](https://eips.ethereum.org/EIPS/eip-191)-এ ইথিরিয়াম সাইনিং ফরম্যাট অনুসরণ করতে হবে। এর মানে হলো আমাদের একটি স্ট্যান্ডার্ড প্রিফিক্স, ASCII-তে মেসেজের দৈর্ঘ্য এবং মেসেজটি দিয়ে একটি সম্মিলিত বাফার তৈরি করতে হবে এবং এটি হ্যাস করতে ইথিরিয়াম স্ট্যান্ডার্ড keccak256 ব্যবহার করতে হবে।

```rust
    // ASCII প্রিফিক্স
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A // '\n'
    ];
```

এমন পরিস্থিতি এড়াতে যেখানে কোনো অ্যাপ্লিকেশন ব্যবহারকারীকে এমন একটি মেসেজ স্বাক্ষর করতে বলে যা লেনদেন হিসেবে বা অন্য কোনো উদ্দেশ্যে ব্যবহার করা যেতে পারে, EIP 191 নির্দিষ্ট করে যে সমস্ত স্বাক্ষরিত মেসেজ ক্যারেক্টার 0x19 (একটি বৈধ ASCII ক্যারেক্টার নয়) দিয়ে শুরু হয় যার পরে `Ethereum Signed Message:` এবং একটি নতুন লাইন থাকে।

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

999 পর্যন্ত মেসেজের দৈর্ঘ্য পরিচালনা করুন এবং এটি বড় হলে ব্যর্থ হন। আমি এই কোডটি যোগ করেছি, যদিও মেসেজের দৈর্ঘ্য একটি কনস্ট্যান্ট, কারণ এটি পরিবর্তন করা সহজ করে তোলে। একটি প্রোডাকশন সিস্টেমে, আপনি সম্ভবত ভালো পারফরম্যান্সের খাতিরে ধরে নেবেন যে `MESSAGE_LENGTH` পরিবর্তন হয় না।

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

ইথিরিয়াম স্ট্যান্ডার্ড `keccak256` ফাংশন ব্যবহার করুন।

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field) // ঠিকানা, হ্যাস এর প্রথম ১৬ বাইট, হ্যাস এর শেষ ১৬ বাইট
{
```

এই ফাংশনটি সিগনেচার যাচাই করে, যার জন্য মেসেজ হ্যাস প্রয়োজন। এটি তারপর আমাদের সেই এডড্রেস প্রদান করে যা এটি স্বাক্ষর করেছে এবং মেসেজ হ্যাস প্রদান করে। মেসেজ হ্যাস দুটি `Field` মানে সরবরাহ করা হয় কারণ সেগুলো একটি বাইট অ্যারের চেয়ে প্রোগ্রামের বাকি অংশে ব্যবহার করা সহজ।

আমাদের দুটি `Field` মান ব্যবহার করতে হবে কারণ ফিল্ড গণনাগুলো একটি বড় সংখ্যার [মডুলো](https://en.wikipedia.org/wiki/Modulo) করা হয়, কিন্তু সেই সংখ্যাটি সাধারণত 256 বিটের কম হয় (অন্যথায় EVM-এ সেই গণনাগুলো করা কঠিন হবে)।

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` এবং `hash2`-কে মিউটেবল ভেরিয়েবল হিসেবে নির্দিষ্ট করুন এবং সেগুলোতে বাইট বাই বাইট হ্যাস লিখুন।

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
এটি [Solidity-এর `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)-এর মতো, তবে দুটি গুরুত্বপূর্ণ পার্থক্য রয়েছে:

- যদি সিগনেচার বৈধ না হয়, তবে কলটি একটি `assert` ব্যর্থ করে এবং প্রোগ্রামটি বাতিল করা হয়।
- যদিও সিগনেচার এবং হ্যাস থেকে পাবলিক কি পুনরুদ্ধার করা যেতে পারে, এটি এমন প্রসেসিং যা বাহ্যিকভাবে করা যেতে পারে এবং তাই, জিরো-নলেজ প্রমাণের ভেতরে করা মূল্যবান নয়। যদি কেউ এখানে আমাদের সাথে প্রতারণা করার চেষ্টা করে, তবে সিগনেচার যাচাইকরণ ব্যর্থ হবে।

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field, // পুরানো অ্যাকাউন্ট অ্যারের হ্যাস
        Field, // নতুন অ্যাকাউন্ট অ্যারের হ্যাস
        Field, // মেসেজ হ্যাস এর প্রথম ১৬ বাইট
        Field, // মেসেজ হ্যাস এর শেষ ১৬ বাইট
    )
```

অবশেষে, আমরা `main` ফাংশনে পৌঁছাই। আমাদের প্রমাণ করতে হবে যে আমাদের কাছে একটি লেনদেন রয়েছে যা বৈধভাবে একাউন্টগুলোর হ্যাস-কে পুরোনো মান থেকে নতুনটিতে পরিবর্তন করে। আমাদের এটিও প্রমাণ করতে হবে যে এটির এই নির্দিষ্ট লেনদেন হ্যাস রয়েছে যাতে যে ব্যক্তি এটি পাঠিয়েছে সে জানতে পারে যে তার লেনদেন প্রসেস করা হয়েছে।

```rust
{
    let mut txn = readTransferTxn(message);
```

আমাদের `txn`-কে মিউটেবল হতে হবে কারণ আমরা মেসেজ থেকে ফ্রম এডড্রেস পড়ি না, আমরা এটি সিগনেচার থেকে পড়ি। 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Stage 2 - Adding a server {#stage-2}

দ্বিতীয় ধাপে, আমরা একটি সার্ভার যোগ করি যা ব্রাউজার থেকে ট্রান্সফার লেনদেন গ্রহণ করে এবং বাস্তবায়ন করে।

এটি কার্যকর দেখতে:

1. Vite চালু থাকলে তা বন্ধ করুন।

2. সার্ভার অন্তর্ভুক্ত থাকা ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার কাছে সমস্ত প্রয়োজনীয় মডিউল রয়েছে।

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir কোড কম্পাইল করার কোনো প্রয়োজন নেই, এটি স্টেজ 1-এর জন্য আপনি যে কোড ব্যবহার করেছিলেন তার মতোই।

3. সার্ভার চালু করুন।

   ```sh
   npm run start
   ```

4. একটি আলাদা কমান্ড-লাইন উইন্ডোতে, ব্রাউজার কোড পরিবেশন করতে Vite রান করুন।

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173)-এ ক্লায়েন্ট কোডে ব্রাউজ করুন

6. আপনি একটি লেনদেন ইস্যু করার আগে, আপনাকে নন্স, সেইসাথে আপনি যে পরিমাণ পাঠাতে পারেন তা জানতে হবে। এই তথ্য পেতে, **Update account data**-এ ক্লিক করুন এবং মেসেজ স্বাক্ষর করুন।

   আমাদের এখানে একটি দ্বিধা রয়েছে। একদিকে, আমরা এমন একটি মেসেজ স্বাক্ষর করতে চাই না যা পুনরায় ব্যবহার করা যেতে পারে (একটি [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack)), যে কারণে আমরা প্রথমেই একটি নন্স চাই। তবে, আমাদের কাছে এখনো কোনো নন্স নেই। সমাধান হলো এমন একটি নন্স বেছে নেওয়া যা কেবল একবার ব্যবহার করা যেতে পারে এবং যা আমাদের উভয় দিকেই রয়েছে, যেমন বর্তমান সময়।

   এই সমাধানের সমস্যা হলো সময় পুরোপুরি সিঙ্ক্রোনাইজ নাও হতে পারে। তাই এর পরিবর্তে, আমরা এমন একটি মান স্বাক্ষর করি যা প্রতি মিনিটে পরিবর্তিত হয়। এর মানে হলো রিপ্লে অ্যাটাকের প্রতি আমাদের দুর্বলতার উইন্ডো সর্বাধিক এক মিনিট। প্রোডাকশনে স্বাক্ষরিত অনুরোধটি TLS দ্বারা সুরক্ষিত থাকবে এবং টানেলের অন্য দিক---সার্ভার---ইতিমধ্যেই ব্যালেন্স এবং নন্স প্রকাশ করতে পারে (কাজ করার জন্য এটিকে সেগুলো জানতে হবে), এটি বিবেচনা করে এটি একটি গ্রহণযোগ্য ঝুঁকি।

7. ব্রাউজার ব্যালেন্স এবং নন্স ফিরে পাওয়ার পর, এটি ট্রান্সফার ফর্ম দেখায়। গন্তব্য এডড্রেস এবং পরিমাণ নির্বাচন করুন এবং **Transfer**-এ ক্লিক করুন। এই অনুরোধটি স্বাক্ষর করুন।

8. ট্রান্সফার দেখতে, হয় **Update account data** করুন অথবা আপনি যেখানে সার্ভার রান করছেন সেই উইন্ডোতে দেখুন। সার্ভার প্রতিবার পরিবর্তিত হওয়ার সময় স্টেট লগ করে।

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[এই ফাইলটিতে](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) সার্ভার প্রসেস রয়েছে এবং এটি [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr)-এ Noir কোডের সাথে ইন্টারঅ্যাক্ট করে। এখানে আকর্ষণীয় অংশগুলোর একটি ব্যাখ্যা দেওয়া হলো।

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) লাইব্রেরি JavaScript কোড এবং Noir কোডের মধ্যে ইন্টারফেস করে।

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

অ্যারিথমেটিক সার্কিট লোড করুন---আগের ধাপে আমরা যে কম্পাইল করা Noir প্রোগ্রাম তৈরি করেছি---এবং এটি এক্সিকিউট করার জন্য প্রস্তুত করুন।

```js
// আমরা শুধুমাত্র একটি স্বাক্ষরিত অনুরোধের বিপরীতে অ্যাকাউন্টের তথ্য প্রদান করি
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

একাউন্ট তথ্য প্রদান করতে, আমাদের কেবল সিগনেচার প্রয়োজন। এর কারণ হলো আমরা ইতিমধ্যেই জানি মেসেজটি কী হতে চলেছে এবং তাই মেসেজ হ্যাস-ও জানি।

```js
const processMessage = async (message, signature) => {
```

একটি মেসেজ প্রসেস করুন এবং এটি যে লেনদেন এনকোড করে তা এক্সিকিউট করুন।

```js
    // পাবলিক কী পান
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

যেহেতু আমরা এখন সার্ভারে JavaScript রান করি, তাই আমরা ক্লায়েন্টের পরিবর্তে সেখানে পাবলিক কি পুনরুদ্ধার করতে পারি।

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` Noir প্রোগ্রাম রান করে। প্যারামিটারগুলো [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)-এ প্রদান করা প্যারামিটারগুলোর সমতুল্য। মনে রাখবেন যে দীর্ঘ মানগুলো হেক্সাডেসিমাল স্ট্রিংয়ের একটি অ্যারে হিসেবে প্রদান করা হয় (`["0x60", "0xA7"]`), Viem যেভাবে করে সেভাবে একটি একক হেক্সাডেসিমাল মান (`0x60A7`) হিসেবে নয়।

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

যদি কোনো ত্রুটি থাকে, তবে তা ধরুন এবং তারপর ক্লায়েন্টের কাছে একটি সরলীকৃত সংস্করণ রিলে করুন।

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

লেনদেন প্রয়োগ করুন। আমরা ইতিমধ্যেই Noir কোডে এটি করেছি, কিন্তু সেখান থেকে ফলাফল বের করার চেয়ে এখানে আবার করা সহজ।

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

প্রাথমিক `Accounts` স্ট্রাকচার।

### Stage 3 - Ethereum smart contracts {#stage-3}

1. সার্ভার এবং ক্লায়েন্ট প্রসেস বন্ধ করুন।

2. স্মার্ট কন্ট্রাক্টসহ ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার কাছে সমস্ত প্রয়োজনীয় মডিউল রয়েছে।

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. একটি আলাদা কমান্ড-লাইন উইন্ডোতে `anvil` রান করুন।

4. ভেরিফিকেশন কি এবং সলিডিটি ভেরিফায়ার তৈরি করুন, তারপর ভেরিফায়ার কোডটি সলিডিটি প্রজেক্টে কপি করুন।

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. স্মার্ট কন্ট্রাক্টগুলোতে যান এবং `anvil` ব্লকচেইন ব্যবহার করতে এনভায়রনমেন্ট ভেরিয়েবলগুলো সেট করুন।

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` ডিপ্লয় করুন এবং এডড্রেসটি একটি এনভায়রনমেন্ট ভেরিয়েবলে সংরক্ষণ করুন।

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` কন্ট্রাক্ট ডিপ্লয় করুন।

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` মানটি হলো `Accounts`-এর প্রাথমিক স্টেট-এর Pederson হ্যাস। আপনি যদি `server/index.mjs`-এ এই প্রাথমিক স্টেট পরিবর্তন করেন, তবে আপনি জিরো-নলেজ প্রমাণ দ্বারা রিপোর্ট করা প্রাথমিক হ্যাস দেখতে একটি লেনদেন রান করতে পারেন।

8. সার্ভার রান করুন।

   ```sh
   cd ../server
   npm run start
   ```

9. একটি ভিন্ন কমান্ড-লাইন উইন্ডোতে ক্লায়েন্ট রান করুন।

   ```sh
   cd client
   npm run dev
   ```

10. কিছু লেনদেন রান করুন।

11. স্টেট অনচেইন পরিবর্তিত হয়েছে কিনা তা যাচাই করতে, সার্ভার প্রসেস রিস্টার্ট করুন। দেখুন যে `ZkBank` আর লেনদেন গ্রহণ করে না, কারণ লেনদেনগুলোতে আসল হ্যাস মান অনচেইন সংরক্ষিত হ্যাস মান থেকে আলাদা।

    এটি প্রত্যাশিত ধরণের ত্রুটি।

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

এই ফাইলের পরিবর্তনগুলো মূলত আসল প্রমাণ তৈরি করা এবং এটি অনচেইন জমা দেওয়ার সাথে সম্পর্কিত।

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

অনচেইন পাঠানোর জন্য আসল প্রমাণ তৈরি করতে আমাদের [Barretenberg প্যাকেজ](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ব্যবহার করতে হবে। আমরা কমান্ড-লাইন ইন্টারফেস (`bb`) রান করে অথবা [JavaScript লাইব্রেরি, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) ব্যবহার করে এই প্যাকেজটি ব্যবহার করতে পারি। নেটিভভাবে কোড রান করার চেয়ে JavaScript লাইব্রেরি অনেক ধীর, তাই আমরা কমান্ড-লাইন ব্যবহার করতে এখানে [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ব্যবহার করি।

মনে রাখবেন যে আপনি যদি `bb.js` ব্যবহার করার সিদ্ধান্ত নেন, তবে আপনাকে এমন একটি সংস্করণ ব্যবহার করতে হবে যা আপনি যে Noir সংস্করণ ব্যবহার করছেন তার সাথে সামঞ্জস্যপূর্ণ। লেখার সময়, বর্তমান Noir সংস্করণ (1.0.0-beta.11) `bb.js` সংস্করণ 0.87 ব্যবহার করে।

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

এখানকার এডড্রেসটি হলো সেটি যা আপনি একটি ক্লিন `anvil` দিয়ে শুরু করলে এবং উপরের নির্দেশাবলী অনুসরণ করলে পান।

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

এই প্রাইভেট কি হলো `anvil`-এর ডিফল্ট প্রি-ফান্ডেড একাউন্টগুলোর মধ্যে একটি। 

```js
const generateProof = async (witness, fileID) => {
```

`bb` এক্সিকিউটেবল ব্যবহার করে একটি প্রমাণ তৈরি করুন।

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

উইটনেস একটি ফাইলে লিখুন।

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

আসলে প্রমাণ তৈরি করুন। এই ধাপটি পাবলিক ভেরিয়েবলসহ একটি ফাইলও তৈরি করে, কিন্তু আমাদের সেটির প্রয়োজন নেই। আমরা ইতিমধ্যেই `noir.execute` থেকে সেই ভেরিয়েবলগুলো পেয়েছি।

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

প্রমাণটি হলো `Field` মানের একটি JSON অ্যারে, যার প্রতিটি একটি হেক্সাডেসিমাল মান হিসেবে উপস্থাপিত হয়। তবে, আমাদের এটি লেনদেন-এ একটি একক `bytes` মান হিসেবে পাঠাতে হবে, যা Viem একটি বড় হেক্সাডেসিমাল স্ট্রিং দ্বারা উপস্থাপন করে। এখানে আমরা সমস্ত মান যুক্ত করে, সমস্ত `0x` সরিয়ে দিয়ে এবং তারপর শেষে একটি যোগ করে ফরম্যাট পরিবর্তন করি।

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

ক্লিনআপ করুন এবং প্রমাণ রিটার্ন করুন।

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

পাবলিক ফিল্ডগুলোকে 32-বাইট মানের একটি অ্যারে হতে হবে। তবে, যেহেতু আমাদের লেনদেন হ্যাস-কে দুটি `Field` মানের মধ্যে ভাগ করতে হয়েছিল, তাই এটি একটি 16-বাইট মান হিসেবে উপস্থিত হয়। এখানে আমরা শূন্য যোগ করি যাতে Viem বুঝতে পারে এটি আসলে 32 বাইট।

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

প্রতিটি এডড্রেস কেবল একবার প্রতিটি নন্স ব্যবহার করে যাতে আমরা উইটনেস ফাইল এবং আউটপুট ডিরেক্টরির জন্য একটি অনন্য আইডেন্টিফায়ার হিসেবে `fromAddress` এবং `nonce`-এর সংমিশ্রণ ব্যবহার করতে পারি।

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

চেইনে লেনদেন পাঠান।

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

এটি হলো অনচেইন কোড যা লেনদেন গ্রহণ করে।

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

অনচেইন কোডকে দুটি ভেরিয়েবলের ট্র্যাক রাখতে হবে: ভেরিফায়ার (একটি আলাদা কন্ট্রাক্ট যা `nargo` দ্বারা তৈরি করা হয়) এবং বর্তমান স্টেট হ্যাস।

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

প্রতিবার স্টেট পরিবর্তিত হওয়ার সময়, আমরা একটি `TransactionProcessed` ইভেন্ট নির্গত করি।

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

এই ফাংশনটি লেনদেন প্রসেস করে। এটি প্রমাণ ( `bytes` হিসেবে) এবং পাবলিক ইনপুটগুলো (একটি `bytes32` অ্যারে হিসেবে) পায়, সেই ফরম্যাটে যা ভেরিফায়ারের প্রয়োজন (অনচেইন প্রসেসিং এবং তাই গ্যাস খরচ কমানোর জন্য)।

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

জিরো-নলেজ প্রমাণটি এমন হতে হবে যে লেনদেনটি আমাদের বর্তমান হ্যাস থেকে একটি নতুনটিতে পরিবর্তিত হয়।

```solidity
        myVerifier.verify(_proof, _publicFields);
```

জিরো-নলেজ প্রমাণ যাচাই করতে ভেরিফায়ার কন্ট্রাক্ট কল করুন। জিরো-নলেজ প্রমাণ ভুল হলে এই ধাপটি লেনদেন রিভার্ট করে।

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

যদি সবকিছু সঠিক হয়, তবে স্টেট হ্যাস-কে নতুন মানে আপডেট করুন এবং একটি `TransactionProcessed` ইভেন্ট নির্গত করুন।

## Abuses by the centralized component {#abuses}

তথ্য নিরাপত্তায় তিনটি বৈশিষ্ট্য রয়েছে:

- _গোপনীয়তা_, ব্যবহারকারীরা এমন তথ্য পড়তে পারে না যা পড়ার জন্য তারা অনুমোদিত নয়।
- _ইন্টিগ্রিটি_, অনুমোদিত ব্যবহারকারী ছাড়া অনুমোদিত পদ্ধতিতে তথ্য পরিবর্তন করা যায় না।
- _এভেইলএবিলিটি_, অনুমোদিত ব্যবহারকারীরা সিস্টেমটি ব্যবহার করতে পারে।

এই সিস্টেমে, জিরো-নলেজ প্রমাণের মাধ্যমে ইন্টিগ্রিটি প্রদান করা হয়। এভেইলএবিলিটির নিশ্চয়তা দেওয়া অনেক কঠিন এবং গোপনীয়তা অসম্ভব, কারণ ব্যাংককে প্রতিটি একাউন্ট-এর ব্যালেন্স এবং সমস্ত লেনদেন জানতে হবে। যার কাছে তথ্য রয়েছে এমন কোনো সত্তাকে সেই তথ্য শেয়ার করা থেকে বিরত রাখার কোনো উপায় নেই।

[স্টিলথ এডড্রেস](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ব্যবহার করে একটি সত্যিকারের গোপনীয় ব্যাংক তৈরি করা সম্ভব হতে পারে, তবে তা এই আর্টিকেলের আওতার বাইরে।

### False information {#false-info}

সার্ভার ইন্টিগ্রিটি লঙ্ঘন করতে পারে এমন একটি উপায় হলো [ডেটা অনুরোধ করা হলে](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) মিথ্যা তথ্য প্রদান করা।

এটি সমাধান করতে, আমরা একটি দ্বিতীয় Noir প্রোগ্রাম লিখতে পারি যা একাউন্টগুলোকে একটি প্রাইভেট ইনপুট হিসেবে এবং যে এডড্রেস-এর জন্য তথ্যের অনুরোধ করা হয়েছে তা একটি পাবলিক ইনপুট হিসেবে গ্রহণ করে। আউটপুট হলো সেই এডড্রেস-এর ব্যালেন্স এবং নন্স এবং একাউন্টগুলোর হ্যাস।

অবশ্যই, এই প্রমাণটি অনচেইন যাচাই করা যায় না, কারণ আমরা অনচেইন নন্স এবং ব্যালেন্স পোস্ট করতে চাই না। তবে, এটি ব্রাউজারে রান হওয়া ক্লায়েন্ট কোড দ্বারা যাচাই করা যেতে পারে।

### Forced transactions {#forced-txns}

লেয়ার 2-এ এভেইলএবিলিটি নিশ্চিত করার এবং সেন্সরশিপ প্রতিরোধের স্বাভাবিক মেকানিজম হলো [ফোর্সড লেনদেন](https://docs.optimism.io/stack/transactions/forced-transaction)। কিন্তু ফোর্সড লেনদেন জিরো-নলেজ প্রমাণের সাথে একত্রিত হয় না। সার্ভার হলো একমাত্র সত্তা যা লেনদেন যাচাই করতে পারে।

আমরা ফোর্সড লেনদেন গ্রহণ করতে এবং সেগুলো প্রসেস না হওয়া পর্যন্ত সার্ভারকে স্টেট পরিবর্তন করা থেকে বিরত রাখতে `smart-contracts/src/ZkBank.sol` পরিবর্তন করতে পারি। তবে, এটি আমাদের একটি সাধারণ ডিনায়াল-অফ-সার্ভিস অ্যাটাকের জন্য উন্মুক্ত করে। যদি একটি ফোর্সড লেনদেন অবৈধ হয় এবং তাই প্রসেস করা অসম্ভব হয় তবে কী হবে?

সমাধান হলো একটি জিরো-নলেজ প্রমাণ থাকা যে একটি ফোর্সড লেনদেন অবৈধ। এটি সার্ভারকে তিনটি বিকল্প দেয়:

- ফোর্সড লেনদেন প্রসেস করুন, একটি জিরো-নলেজ প্রমাণ প্রদান করে যে এটি প্রসেস করা হয়েছে এবং নতুন স্টেট হ্যাস।
- ফোর্সড লেনদেন প্রত্যাখ্যান করুন এবং কন্ট্রাক্ট-এ একটি জিরো-নলেজ প্রমাণ প্রদান করুন যে লেনদেনটি অবৈধ (অজানা এডড্রেস, খারাপ নন্স, বা অপর্যাপ্ত ব্যালেন্স)।
- ফোর্সড লেনদেন উপেক্ষা করুন। সার্ভারকে আসলে লেনদেন প্রসেস করতে বাধ্য করার কোনো উপায় নেই, তবে এর মানে হলো পুরো সিস্টেমটি অনুপলব্ধ।

#### Availability bonds {#avail-bonds}

বাস্তব জীবনের বাস্তবায়নে, সার্ভার চালু রাখার জন্য সম্ভবত কোনো ধরণের লাভের উদ্দেশ্য থাকবে। আমরা সার্ভারকে একটি এভেইলএবিলিটি বন্ড পোস্ট করতে বলে এই প্রণোদনাকে শক্তিশালী করতে পারি যা যে কেউ পুড়িয়ে ফেলতে পারে যদি একটি নির্দিষ্ট সময়ের মধ্যে একটি ফোর্সড লেনদেন প্রসেস করা না হয়।

### Bad Noir code {#bad-noir-code}

সাধারণত, মানুষকে একটি স্মার্ট কন্ট্রাক্ট বিশ্বাস করতে আমরা সোর্স কোডটি একটি [ব্লক এক্সপ্লোরার](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)-এ আপলোড করি। তবে, জিরো-নলেজ প্রমাণের ক্ষেত্রে, তা অপর্যাপ্ত।

`Verifier.sol`-এ ভেরিফিকেশন কি রয়েছে, যা Noir প্রোগ্রামের একটি ফাংশন। তবে, সেই কি আমাদের বলে না যে Noir প্রোগ্রামটি কী ছিল। আসলে একটি বিশ্বস্ত সমাধান পেতে, আপনাকে Noir প্রোগ্রাম (এবং যে সংস্করণটি এটি তৈরি করেছে) আপলোড করতে হবে। অন্যথায়, জিরো-নলেজ প্রমাণগুলো একটি ভিন্ন প্রোগ্রামকে প্রতিফলিত করতে পারে, যেটিতে একটি ব্যাক ডোর রয়েছে।

যতক্ষণ না ব্লক এক্সপ্লোরারগুলো আমাদের Noir প্রোগ্রামগুলো আপলোড এবং যাচাই করার অনুমতি দেওয়া শুরু করে, আপনার এটি নিজেই করা উচিত (বিশেষত [IPFS](/developers/tutorials/ipfs-decentralized-ui/)-এ)। তারপর অত্যাধুনিক ব্যবহারকারীরা সোর্স কোড ডাউনলোড করতে, এটি নিজেরাই কম্পাইল করতে, `Verifier.sol` তৈরি করতে এবং এটি অনচেইন থাকাটির সাথে অভিন্ন কিনা তা যাচাই করতে সক্ষম হবে।

## Conclusion {#conclusion}

প্লাজমা-ধরণের অ্যাপ্লিকেশনগুলোর তথ্য স্টোরেজ হিসেবে একটি সেন্ট্রালাইজড উপাদান প্রয়োজন। এটি সম্ভাব্য দুর্বলতাগুলো উন্মুক্ত করে তবে, এর বিনিময়ে, আমাদের এমন উপায়ে গোপনীয়তা বজায় রাখার অনুমতি দেয় যা ব্লকচেইনে উপলব্ধ নয়। জিরো-নলেজ প্রমাণের মাধ্যমে আমরা ইন্টিগ্রিটি নিশ্চিত করতে পারি এবং সম্ভবত যে কেউ সেন্ট্রালাইজড উপাদানটি রান করছে তার জন্য এভেইলএবিলিটি বজায় রাখা অর্থনৈতিকভাবে সুবিধাজনক করে তুলতে পারি।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

## Acknowledgements {#acknowledgements}

- জশ ক্রাইটস এই আর্টিকেলের একটি খসড়া পড়েছেন এবং আমাকে একটি কঠিন Noir সমস্যা সমাধানে সাহায্য করেছেন।

বাকি থাকা যেকোনো ত্রুটির দায়িত্ব আমার।