---
title: একটি অ্যাপ-নির্দিষ্ট প্লাসমা লিখুন যা গোপনীয়তা রক্ষা করে
description: এই টিউটোরিয়ালে, আমরা ডিপোজিটের জন্য একটি আধা-গোপন ব্যাংক তৈরি করি। ব্যাংকটি একটি কেন্দ্রীভূত উপাদান; এটি প্রতিটি ব্যবহারকারীর ব্যালেন্স জানে। তবে, এই তথ্য অনচেইনে সংরক্ষণ করা হয় না। পরিবর্তে, ব্যাংক স্টেটের একটি হ্যাস পোস্ট করে। যখনই কোনো লেনদেন ঘটে, ব্যাংকটি নতুন হ্যাস পোস্ট করে, সঙ্গে একটি জিরো-নলেজ প্রুফ দিয়ে থাকে যে এটিতে একটি স্বাক্ষরিত লেনদেন রয়েছে যা হ্যাস স্টেটকে নতুনটিতে পরিবর্তন করে। এই টিউটোরিয়ালটি পড়ার পরে, আপনি কেবল কীভাবে জিরো-নলেজ প্রুফ ব্যবহার করবেন তা-ই বুঝবেন না, বরং কেন আপনি সেগুলি ব্যবহার করবেন এবং কীভাবে নিরাপদে তা করবেন তাও বুঝবেন।
author: Ori Pomerantz
tags: [ "জিরো-নলেজ", "সার্ভার", "অফচেইন", "গোপনীয়তা" ]
skill: advanced
lang: bn
published: 2025-10-15
---

## ভূমিকা {#introduction}

[রোলআপ](/developers/docs/scaling/zk-rollups/) এর বিপরীতে, [প্লাসমা](/developers/docs/scaling/plasma) ইন্টিগ্রিটির জন্য ইথেরিয়াম মেইননেট ব্যবহার করে, কিন্তু অ্যাভেইলেবিলিটির জন্য নয়। এই নিবন্ধে, আমরা এমন একটি অ্যাপ্লিকেশন লিখি যা প্লাজমার মতো আচরণ করে, যেখানে ইথেরিয়াম ইন্টিগ্রিটির (কোনো অননুমোদিত পরিবর্তন নয়) নিশ্চয়তা দেয় কিন্তু অ্যাভেইলেবিলিটির নয় (একটি কেন্দ্রীভূত উপাদান ডাউন হয়ে পুরো সিস্টেমটিকে নিষ্ক্রিয় করতে পারে)।

এখানে আমরা যে অ্যাপ্লিকেশনটি লিখি তা হল একটি গোপনীয়তা-সংরক্ষণকারী ব্যাংক। বিভিন্ন অ্যাড্রেসের ব্যালেন্সসহ অ্যাকাউন্ট থাকে এবং তারা অন্য অ্যাকাউন্টে টাকা (ETH) পাঠাতে পারে। ব্যাংক স্টেটের (অ্যাকাউন্ট এবং তাদের ব্যালেন্স) এবং লেনদেনের হ্যাস পোস্ট করে, কিন্তু প্রকৃত ব্যালেন্স অফচেইনে রাখে যেখানে সেগুলি ব্যক্তিগত থাকতে পারে।

## ডিজাইন {#design}

এটি কোনো প্রোডাকশন-রেডি সিস্টেম নয়, বরং একটি শিক্ষামূলক টুল। যেমন, এটি বেশ কয়েকটি সরলীকরণমূলক ধারণার উপর ভিত্তি করে লেখা হয়েছে।

- নির্দিষ্ট অ্যাকাউন্ট পুল। এখানে একটি নির্দিষ্ট সংখ্যক অ্যাকাউন্ট রয়েছে এবং প্রতিটি অ্যাকাউন্ট একটি পূর্বনির্ধারিত অ্যাড্রেসের অন্তর্গত। এটি একটি অনেক সহজ সিস্টেম তৈরি করে কারণ জিরো-নলেজ প্রুফে পরিবর্তনশীল-আকারের ডেটা স্ট্রাকচার পরিচালনা করা কঠিন। একটি প্রোডাকশন-রেডি সিস্টেমের জন্য, আমরা স্টেট হ্যাস হিসাবে [মার্কল রুট](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) ব্যবহার করতে পারি এবং প্রয়োজনীয় ব্যালেন্সের জন্য মার্কল প্রুফ প্রদান করতে পারি।

- মেমরি স্টোরেজ। একটি প্রোডাকশন সিস্টেমে, রিস্টার্টের ক্ষেত্রে সেগুলি সংরক্ষণের জন্য আমাদের সমস্ত অ্যাকাউন্ট ব্যালেন্স ডিস্কে লিখতে হবে। এখানে, তথ্য যদি সহজভাবে হারিয়ে যায় তবে ঠিক আছে।

- শুধুমাত্র ট্রান্সফার। একটি প্রোডাকশন সিস্টেমে ব্যাংকে সম্পদ জমা করার এবং সেগুলি উত্তোলন করার একটি উপায় প্রয়োজন হবে। কিন্তু এখানে উদ্দেশ্য শুধু ধারণাটি চিত্রিত করা, তাই এই ব্যাংক শুধুমাত্র ট্রান্সফারে সীমাবদ্ধ।

### জিরো-নলেজ প্রুফ {#zero-knowledge-proofs}

একটি মৌলিক স্তরে, একটি জিরো-নলেজ প্রুফ দেখায় যে প্রোভার কিছু ডেটা, _Data<sub>private</sub>_ জানে, যেমন কিছু পাবলিক ডেটা, _Data<sub>public</sub>_, এবং _Data<sub>private</sub>_ এর মধ্যে একটি সম্পর্ক _Relationship_ রয়েছে। ভেরিফায়ার _Relationship_ এবং _Data<sub>public</sub>_ জানে।

গোপনীয়তা রক্ষা করতে, আমাদের স্টেট এবং লেনদেনগুলি ব্যক্তিগত হতে হবে। কিন্তু ইন্টিগ্রিটি নিশ্চিত করতে, আমাদের স্টেটের [ক্রিপ্টোগ্রাফিক হ্যাস](https://en.wikipedia.org/wiki/Cryptographic_hash_function) পাবলিক হতে হবে। যারা লেনদেন জমা দেয় তাদের কাছে প্রমাণ করার জন্য যে সেই লেনদেনগুলি সত্যিই ঘটেছে, আমাদের লেনদেন হ্যাস পোস্ট করতে হবে।

বেশিরভাগ ক্ষেত্রে, _Data<sub>private</sub>_ হল জিরো-নলেজ প্রুফ প্রোগ্রামের ইনপুট এবং _Data<sub>public</sub>_ হল আউটপুট।

_Data<sub>private</sub>_-এর এই ফিল্ডগুলি:

- _State<sub>n</sub>_, পুরনো স্টেট
- _State<sub>n+1</sub>_, নতুন স্টেট
- _Transaction_, একটি লেনদেন যা পুরনো স্টেট থেকে নতুনটিতে পরিবর্তিত হয়। এই লেনদেনে এই ফিল্ডগুলি অন্তর্ভুক্ত করা প্রয়োজন:
  - _Destination address_ যা ট্রান্সফার গ্রহণ করে
  - _Amount_ যা ট্রান্সফার করা হচ্ছে
  - _Nonce_ প্রতিটি লেনদেন শুধুমাত্র একবার প্রক্রিয়াজাত করা যাবে তা নিশ্চিত করার জন্য।
    উৎস অ্যাড্রেস লেনদেনে থাকার প্রয়োজন নেই, কারণ এটি সিগনেচার থেকে পুনরুদ্ধার করা যায়।
- _Signature_, একটি সিগনেচার যা লেনদেন সম্পাদনের জন্য অনুমোদিত। আমাদের ক্ষেত্রে, একটি লেনদেন সম্পাদনের জন্য অনুমোদিত একমাত্র অ্যাড্রেস হল উৎস অ্যাড্রেস। যেহেতু আমাদের জিরো-নলেজ সিস্টেম যেভাবে কাজ করে, সেহেতু ইথেরিয়াম সিগনেচার ছাড়াও আমাদের অ্যাকাউন্টের পাবলিক কী প্রয়োজন।

_Data<sub>public</sub>_-এর ফিল্ডগুলি হল:

- _Hash(State<sub>n</sub>)_ পুরনো স্টেটের হ্যাস
- _Hash(State<sub>n+1</sub>)_ নতুন স্টেটের হ্যাস
- _Hash(Transaction)_ হল সেই লেনদেনের হ্যাস যা স্টেটকে _State<sub>n</sub>_ থেকে _State<sub>n+1</sub>_-এ পরিবর্তন করে।

সম্পর্কটি বেশ কয়েকটি শর্ত পরীক্ষা করে:

- পাবলিক হ্যাসগুলো প্রকৃতপক্ষে ব্যক্তিগত ফিল্ডগুলোর জন্য সঠিক হ্যাস।
- লেনদেনটি, যখন পুরনো স্টেটের উপর প্রয়োগ করা হয়, তখন নতুন স্টেট তৈরি হয়।
- সিগনেচারটি লেনদেনের উৎস অ্যাড্রেস থেকে আসে।

ক্রিপ্টোগ্রাফিক হ্যাস ফাংশনের বৈশিষ্ট্যের কারণে, এই শর্তগুলি প্রমাণ করাই ইন্টিগ্রিটি নিশ্চিত করার জন্য যথেষ্ট।

### ডেটা স্ট্রাকচার {#data-structures}

প্রাথমিক ডেটা স্ট্রাকচার হল সার্ভার দ্বারা ধারণকৃত স্টেট। প্রতিটি অ্যাকাউন্টের জন্য, সার্ভার অ্যাকাউন্ট ব্যালেন্স এবং একটি [ননস](https://en.wikipedia.org/wiki/Cryptographic_nonce) ট্র্যাক করে, যা [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack) প্রতিরোধ করতে ব্যবহৃত হয়।

### উপাদান {#components}

এই সিস্টেমের জন্য দুটি উপাদান প্রয়োজন:

- _সার্ভার_ যা লেনদেন গ্রহণ করে, সেগুলি প্রক্রিয়া করে, এবং জিরো-নলেজ প্রুফের সাথে চেইনে হ্যাস পোস্ট করে।
- একটি _স্মার্ট কন্ট্র্যাক্ট_ যা হ্যাস সংরক্ষণ করে এবং স্টেট ট্রানজিশনগুলি বৈধ তা নিশ্চিত করার জন্য জিরো-নলেজ প্রুফ যাচাই করে।

### ডেটা এবং কন্ট্রোল ফ্লো {#flows}

এগুলি হল সেই উপায়গুলি যার মাধ্যমে বিভিন্ন উপাদান একটি অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে ট্রান্সফারের জন্য যোগাযোগ করে।

1. একটি ওয়েব ব্রাউজার স্বাক্ষরকারীর অ্যাকাউন্ট থেকে একটি ভিন্ন অ্যাকাউন্টে ট্রান্সফারের জন্য একটি স্বাক্ষরিত লেনদেন জমা দেয়।

2. সার্ভার যাচাই করে যে লেনদেনটি বৈধ:

   - স্বাক্ষরকারীর ব্যাংকে একটি অ্যাকাউন্ট আছে যার পর্যাপ্ত ব্যালেন্স রয়েছে।
   - প্রাপকের ব্যাংকে একটি অ্যাকাউন্ট আছে।

3. সার্ভার স্বাক্ষরকারীর ব্যালেন্স থেকে ট্রান্সফার করা পরিমাণ বিয়োগ করে এবং প্রাপকের ব্যালেন্সে যোগ করে নতুন স্টেট গণনা করে।

4. সার্ভার একটি জিরো-নলেজ প্রুফ গণনা করে যে স্টেট পরিবর্তনটি একটি বৈধ পরিবর্তন।

5. সার্ভার ইথেরিয়ামে একটি লেনদেন জমা দেয় যার মধ্যে রয়েছে:

   - নতুন স্টেট হ্যাস
   - লেনদেন হ্যাস (যাতে লেনদেন প্রেরক জানতে পারে যে এটি প্রক্রিয়াজাত হয়েছে)
   - জিরো-নলেজ প্রুফ যা প্রমাণ করে যে নতুন স্টেটে ট্রানজিশনটি বৈধ

6. স্মার্ট কন্ট্র্যাক্ট জিরো-নলেজ প্রুফ যাচাই করে।

7. যদি জিরো-নলেজ প্রুফ ঠিক থাকে, স্মার্ট কন্ট্র্যাক্ট এই কাজগুলি সম্পাদন করে:
   - বর্তমান স্টেট হ্যাসকে নতুন স্টেট হ্যাসে আপডেট করুন
   - নতুন স্টেট হ্যাস এবং লেনদেন হ্যাস সহ একটি লগ এন্ট্রি নির্গত করুন

### টুলস {#tools}

ক্লায়েন্ট-সাইড কোডের জন্য, আমরা [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), এবং [Wagmi](https://wagmi.sh/) ব্যবহার করতে যাচ্ছি। এগুলি ইন্ডাস্ট্রি-স্ট্যান্ডার্ড টুলস; আপনি যদি এগুলির সাথে পরিচিত না হন, তবে আপনি [এই টিউটোরিয়ালটি](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) ব্যবহার করতে পারেন।

সার্ভারের বেশিরভাগ অংশ JavaScript ব্যবহার করে [Node](https://nodejs.org/en)-এ লেখা হয়েছে। জিরো-নলেজ অংশটি [Noir](https://noir-lang.org/)-এ লেখা হয়েছে। আমাদের সংস্করণ `1.0.0-beta.10` প্রয়োজন, তাই আপনি [নির্দেশনা অনুযায়ী Noir ইনস্টল](https://noir-lang.org/docs/getting_started/quick_start) করার পরে, চালান:

```
noirup -v 1.0.0-beta.10
```

আমরা যে ব্লকচেইনটি ব্যবহার করি তা হল `anvil`, একটি স্থানীয় টেস্টিং ব্লকচেইন যা [Foundry](https://getfoundry.sh/introduction/installation)-এর একটি অংশ।

## বাস্তবায়ন {#implementation}

যেহেতু এটি একটি জটিল সিস্টেম, আমরা এটি ধাপে ধাপে বাস্তবায়ন করব।

### স্টেজ ১ - ম্যানুয়াল জিরো নলেজ {#stage-1}

প্রথম স্টেজের জন্য, আমরা ব্রাউজারে একটি লেনদেনে স্বাক্ষর করব এবং তারপর ম্যানুয়ালি জিরো-নলেজ প্রুফে তথ্য প্রদান করব। জিরো-নলেজ কোড `server/noir/Prover.toml`-এ সেই তথ্য পাওয়ার আশা করে (যা [এখানে](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) নথিভুক্ত আছে)।

এটি বাস্তবে কাজ করতে দেখতে:

1. নিশ্চিত করুন যে আপনার [Node](https://nodejs.org/en/download) এবং [Noir](https://noir-lang.org/install) ইনস্টল করা আছে। বিশেষত, এগুলি একটি UNIX সিস্টেমে যেমন macOS, Linux, বা [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)-এ ইনস্টল করুন।

2. স্টেজ ১-এর কোড ডাউনলোড করুন এবং ক্লায়েন্ট কোড পরিবেশন করতে ওয়েব সার্ভার শুরু করুন।

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   এখানে আপনার একটি ওয়েব সার্ভার প্রয়োজন হওয়ার কারণ হল, কিছু ধরণের জালিয়াতি প্রতিরোধ করতে, অনেক ওয়ালেট (যেমন MetaMask) ডিস্ক থেকে সরাসরি পরিবেশন করা ফাইল গ্রহণ করে না

3. ওয়ালেট সহ একটি ব্রাউজার খুলুন।

4. ওয়ালেটে, একটি নতুন পাসফ্রেজ লিখুন। মনে রাখবেন যে এটি আপনার বিদ্যমান পাসফ্রেজ মুছে ফেলবে, তাই _নিশ্চিত করুন যে আপনার একটি ব্যাকআপ আছে_।

   পাসফ্রেজটি হল `test test test test test test test test test test test junk`, যা anvil-এর জন্য ডিফল্ট টেস্টিং পাসফ্রেজ।

5. [ক্লায়েন্ট-সাইড কোডে](http://localhost:5173/) ব্রাউজ করুন।

6. ওয়ালেটের সাথে সংযোগ করুন এবং আপনার গন্তব্য অ্যাকাউন্ট ও পরিমাণ নির্বাচন করুন।

7. **Sign**-এ ক্লিক করুন এবং লেনদেনটিতে স্বাক্ষর করুন।

8. **Prover.toml** শিরোনামের অধীনে, আপনি একটি টেক্সট পাবেন। `server/noir/Prover.toml` কে সেই টেক্সট দিয়ে প্রতিস্থাপন করুন।

9. জিরো-নলেজ প্রুফ এক্সিকিউট করুন।

   ```sh
   cd ../server/noir
   nargo execute
   ```

   আউটপুটটি এর অনুরূপ হওয়া উচিত

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. মেসেজটি সঠিকভাবে হ্যাস করা হয়েছে কিনা তা দেখতে ওয়েব ব্রাউজারে দেখা হ্যাসের সাথে শেষ দুটি মান তুলনা করুন।

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir দ্বারা প্রত্যাশিত তথ্য ফরম্যাট দেখায়।

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

মেসেজটি টেক্সট ফরম্যাটে থাকে, যা ব্যবহারকারীর জন্য বোঝা সহজ করে তোলে (যা স্বাক্ষর করার সময় প্রয়োজন) এবং Noir কোডের জন্য পার্স করা সহজ করে। একদিকে ভগ্নাংশমূলক ট্রান্সফার সক্ষম করতে এবং অন্যদিকে সহজে পঠনযোগ্য করতে পরিমাণটি ফিনিতে উদ্ধৃত করা হয়েছে। শেষ সংখ্যাটি হল [ননস](https://en.wikipedia.org/wiki/Cryptographic_nonce)।

স্ট্রিংটি 100 অক্ষর দীর্ঘ। জিরো-নলেজ প্রুফ পরিবর্তনশীল-আকারের ডেটা ভালোভাবে হ্যান্ডেল করতে পারে না, তাই প্রায়ই ডেটা প্যাড করার প্রয়োজন হয়।

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

এই তিনটি প্যারামিটার হল নির্দিষ্ট-আকারের বাইট অ্যারে।

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

এটি স্ট্রাকচারের একটি অ্যারে নির্দিষ্ট করার উপায়। প্রতিটি এন্ট্রির জন্য, আমরা অ্যাড্রেস, ব্যালেন্স (মিলিইথ এ.কে.এ. তে) নির্দিষ্ট করি। [ফিনি](https://cryptovalleyjournal.com/glossary/finney/)), এবং পরবর্তী ননস মান।

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) ক্লায়েন্ট-সাইড প্রসেসিং বাস্তবায়ন করে এবং `server/noir/Prover.toml` ফাইল (যা জিরো-নলেজ প্যারামিটার অন্তর্ভুক্ত করে) তৈরি করে।

এখানে আরও আকর্ষণীয় অংশগুলির ব্যাখ্যা দেওয়া হল।

```tsx
export default attrs =>  {
```

এই ফাংশনটি `Transfer` React কম্পোনেন্ট তৈরি করে, যা অন্য ফাইলগুলো ইম্পোর্ট করতে পারে।

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

এগুলো হল অ্যাকাউন্ট অ্যাড্রেস, `test ...` দ্বারা তৈরি অ্যাড্রেস। test junk\` পাসফ্রেজ। আপনি যদি নিজের অ্যাড্রেস ব্যবহার করতে চান, তাহলে শুধু এই সংজ্ঞাটি পরিবর্তন করুন।

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

এই [Wagmi হুকগুলি](https://wagmi.sh/react/api/hooks) আমাদের [viem](https://viem.sh/) লাইব্রেরি এবং ওয়ালেটে অ্যাক্সেস করতে দেয়।

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

এটি স্পেস দিয়ে প্যাড করা মেসেজ। যখনই [`useState`](https://react.dev/reference/react/useState) ভেরিয়েবলগুলোর মধ্যে একটি পরিবর্তন হয়, তখন কম্পোনেন্টটি আবার আঁকা হয় এবং `message` আপডেট করা হয়।

```tsx
  const sign = async () => {
```

এই ফাংশনটি ব্যবহারকারী যখন **Sign** বোতামে ক্লিক করে তখন কল করা হয়। মেসেজটি স্বয়ংক্রিয়ভাবে আপডেট করা হয়, কিন্তু সিগনেচারের জন্য ওয়ালেটে ব্যবহারকারীর অনুমোদন প্রয়োজন, এবং প্রয়োজন না হলে আমরা এর জন্য জিজ্ঞাসা করতে চাই না।

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

ওয়ালেটকে [মেসেজে স্বাক্ষর করতে](https://viem.sh/docs/accounts/local/signMessage) বলুন।

```tsx
    const hash = hashMessage(message)
```

মেসেজ হ্যাস পান। এটি ব্যবহারকারীকে ডিবাগিং (Noir কোডের) করার জন্য প্রদান করা সহায়ক।

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[পাবলিক কী পান](https://viem.sh/docs/utilities/recoverPublicKey)। এটি [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) ফাংশনের জন্য প্রয়োজন।

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

স্টেট ভেরিয়েবল সেট করুন। এটি করার মাধ্যমে কম্পোনেন্টটি আবার আঁকা হয় (`sign` ফাংশন থেকে বের হওয়ার পরে) এবং ব্যবহারকারীকে আপডেট করা মানগুলি দেখায়।

```tsx
    let proverToml = `
```

`Prover.toml`-এর জন্য টেক্সট।

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem আমাদের একটি 65-বাইট হেক্সাডেসিমেল স্ট্রিং হিসাবে পাবলিক কী প্রদান করে। প্রথম বাইটটি হল `0x04`, একটি সংস্করণ মার্কার। এর পরে পাবলিক কী-র `x` এর জন্য 32 বাইট এবং তারপর পাবলিক কী-র `y` এর জন্য 32 বাইট থাকে।

তবে, Noir এই তথ্য দুটি বাইট অ্যারে হিসাবে পেতে চায়, একটি `x`-এর জন্য এবং একটি `y`-এর জন্য। জিরো-নলেজ প্রুফের অংশ হিসাবে পার্স করার পরিবর্তে এখানে ক্লায়েন্টে পার্স করা সহজ।

মনে রাখবেন যে এটি সাধারণত জিরো-নলেজে একটি ভালো অভ্যাস। জিরো-নলেজ প্রুফের ভিতরের কোড ব্যয়বহুল, তাই যে কোনো প্রসেসিং যা জিরো-নলেজ প্রুফের বাইরে করা যায়, তা জিরো-নলেজ প্রুফের বাইরেই _করা উচিত_।

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

সিগনেচারটিও একটি 65-বাইট হেক্সাডেসিমেল স্ট্রিং হিসাবে প্রদান করা হয়। তবে, শেষ বাইটটি শুধুমাত্র পাবলিক কী পুনরুদ্ধার করার জন্য প্রয়োজন। যেহেতু পাবলিক কী ইতিমধ্যেই Noir কোডে প্রদান করা হবে, তাই সিগনেচার যাচাই করার জন্য আমাদের এটির প্রয়োজন নেই, এবং Noir কোডেরও এটির প্রয়োজন নেই।

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

অ্যাকাউন্টগুলো প্রদান করুন।

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

এটি কম্পোনেন্টের HTML (আরও সঠিকভাবে, [JSX](https://react.dev/learn/writing-markup-with-jsx)) ফরম্যাট।

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) হল আসল জিরো-নলেজ কোড।

```
use std::hash::pedersen_hash;
```

[পেডারসেন হ্যাস](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir স্ট্যান্ডার্ড লাইব্রেরি](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)-র সাথে প্রদান করা হয়। জিরো-নলেজ প্রুফ সাধারণত এই হ্যাস ফাংশনটি ব্যবহার করে। স্ট্যান্ডার্ড হ্যাস ফাংশনগুলির তুলনায় এটি [অ্যারিথমেটিক সার্কিট](https://rareskills.io/post/arithmetic-circuit)-এর ভিতরে গণনা করা অনেক সহজ।

```
use keccak256::keccak256;
use dep::ecrecover;
```

এই দুটি ফাংশন হল এক্সটার্নাল লাইব্রেরি, যা [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml)-এ সংজ্ঞায়িত। এগুলি ঠিক তাদের নামের মতোই, একটি ফাংশন যা [keccak256 হ্যাস](https://emn178.github.io/online-tools/keccak_256.html) গণনা করে এবং একটি ফাংশন যা ইথেরিয়াম সিগনেচার যাচাই করে এবং স্বাক্ষরকারীর ইথেরিয়াম অ্যাড্রেস পুনরুদ্ধার করে।

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) দ্বারা অনুপ্রাণিত। ভেরিয়েবলগুলো, ডিফল্টরূপে, ধ্রুবক। আমরা এইভাবে গ্লোবাল কনফিগারেশন ধ্রুবক সংজ্ঞায়িত করি। বিশেষত, `ACCOUNT_NUMBER` হল আমাদের সংরক্ষিত অ্যাকাউন্টের সংখ্যা।

`u<number>` নামের ডেটা টাইপগুলি হল সেই সংখ্যক বিট, আনসাইন্ড। একমাত্র সমর্থিত টাইপগুলি হল `u8`, `u16`, `u32`, `u64`, এবং `u128`।

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

এই ভেরিয়েবলটি অ্যাকাউন্টের পেডারসেন হ্যাসের জন্য ব্যবহৃত হয়, যা নীচে ব্যাখ্যা করা হয়েছে।

```
global MESSAGE_LENGTH : u32 = 100;
```

উপরে যেমন ব্যাখ্যা করা হয়েছে, মেসেজের দৈর্ঘ্য নির্দিষ্ট। এটি এখানে নির্দিষ্ট করা হয়েছে।

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 সিগনেচার](https://eips.ethereum.org/EIPS/eip-191)-এর জন্য একটি 26-বাইট প্রিফিক্স সহ একটি বাফার প্রয়োজন, তারপরে ASCII-তে মেসেজের দৈর্ঘ্য, এবং অবশেষে মেসেজটি নিজেই।

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

একটি অ্যাকাউন্ট সম্পর্কে আমরা যে তথ্য সংরক্ষণ করি। [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) হল একটি সংখ্যা, সাধারণত 253 বিট পর্যন্ত, যা জিরো-নলেজ প্রুফ বাস্তবায়নকারী [অ্যারিথমেটিক সার্কিট](https://rareskills.io/post/arithmetic-circuit)-এ সরাসরি ব্যবহার করা যেতে পারে। এখানে আমরা একটি 160-বিট ইথেরিয়াম অ্যাড্রেস সংরক্ষণ করতে `Field` ব্যবহার করি।

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

একটি ট্রান্সফার লেনদেনের জন্য আমরা যে তথ্য সংরক্ষণ করি।

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

একটি ফাংশন সংজ্ঞা। প্যারামিটারটি হল `Account` তথ্য। ফলাফল হল `Field` ভেরিয়েবলের একটি অ্যারে, যার দৈর্ঘ্য `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

অ্যারের প্রথম মান হল অ্যাকাউন্ট অ্যাড্রেস। দ্বিতীয়টিতে ব্যালেন্স এবং ননস উভয়ই অন্তর্ভুক্ত। `.into()` কলগুলো একটি সংখ্যাকে তার প্রয়োজনীয় ডেটা টাইপে পরিবর্তন করে। `account.nonce` একটি `u32` মান, কিন্তু এটিকে `account.balance << 32`, একটি `u128` মানের সাথে যোগ করতে হলে, এটিকে একটি `u128` হতে হবে। সেটি হল প্রথম `.into()`। দ্বিতীয়টি `u128` ফলাফলকে একটি `Field`-এ রূপান্তরিত করে যাতে এটি অ্যারেতে ফিট হয়।

```
    flat
}
```

Noir-এ, ফাংশনগুলি শুধুমাত্র শেষে একটি মান ফেরত দিতে পারে (কোনো আর্লি রিটার্ন নেই)। রিটার্ন মান নির্দিষ্ট করার জন্য, আপনি ফাংশনের শেষ বন্ধনীর ঠিক আগে এটি মূল্যায়ন করেন।

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

এই ফাংশনটি অ্যাকাউন্ট অ্যারেটিকে একটি `Field` অ্যারেতে পরিণত করে, যা একটি পেটারসেন হ্যাসের ইনপুট হিসাবে ব্যবহার করা যেতে পারে।

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

এটি একটি পরিবর্তনযোগ্য ভেরিয়েবল নির্দিষ্ট করার উপায়, অর্থাৎ, ধ্রুবক _নয়_। Noir-এর ভেরিয়েবলগুলোর সবসময় একটি মান থাকতে হবে, তাই আমরা এই ভেরিয়েবলটিকে সব শূন্য দিয়ে শুরু করি।

```
    for i in 0..ACCOUNT_NUMBER {
```

এটি একটি `for` লুপ। মনে রাখবেন যে সীমানাগুলো ধ্রুবক। Noir লুপগুলোর সীমানা কম্পাইল করার সময় জানা থাকতে হবে। এর কারণ হল অ্যারিথমেটিক সার্কিট ফ্লো কন্ট্রোল সমর্থন করে না। একটি `for` লুপ প্রসেস করার সময়, কম্পাইলার সহজভাবে এর ভিতরের কোডটি একাধিকবার রাখে, প্রতিটি পুনরাবৃত্তির জন্য একবার।

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

অবশেষে, আমরা সেই ফাংশনে পৌঁছলাম যা অ্যাকাউন্ট অ্যারে হ্যাস করে।

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

এই ফাংশনটি একটি নির্দিষ্ট অ্যাড্রেস সহ অ্যাকাউন্ট খুঁজে বের করে। এই ফাংশনটি স্ট্যান্ডার্ড কোডে ভয়ানকভাবে অদক্ষ হবে কারণ এটি অ্যাড্রেস খুঁজে পাওয়ার পরেও সমস্ত অ্যাকাউন্টের উপর পুনরাবৃত্তি করে।

তবে, জিরো-নলেজ প্রুফে কোনো ফ্লো কন্ট্রোল নেই। যদি আমাদের কখনো কোনো শর্ত পরীক্ষা করার প্রয়োজন হয়, তবে আমাদের প্রতিবারই তা পরীক্ষা করতে হবে।

`if` স্টেটমেন্টের ক্ষেত্রেও একই রকম ঘটনা ঘটে। উপরের লুপের `if` স্টেটমেন্টটি এই গাণিতিক স্টেটমেন্টগুলিতে অনুবাদ করা হয়েছে।

_condition<sub>result</sub> = accounts[i].address == address_ // সমান হলে এক, অন্যথায় শূন্য

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) ফাংশনটি যদি অ্যাসারশনটি মিথ্যা হয় তবে জিরো-নলেজ প্রুফ ক্র্যাশ করে দেয়। এই ক্ষেত্রে, যদি আমরা প্রাসঙ্গিক অ্যাড্রেস সহ কোনো অ্যাকাউন্ট খুঁজে না পাই। অ্যাড্রেস রিপোর্ট করার জন্য, আমরা একটি [ফরম্যাট স্ট্রিং](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) ব্যবহার করি।

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

এই ফাংশনটি একটি ট্রান্সফার লেনদেন প্রয়োগ করে এবং নতুন অ্যাকাউন্ট অ্যারে ফেরত দেয়।

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

আমরা Noir-এর ফরম্যাট স্ট্রিং-এর ভিতরে স্ট্রাকচার উপাদান অ্যাক্সেস করতে পারি না, তাই আমরা একটি ব্যবহারযোগ্য কপি তৈরি করি।

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

এগুলো দুটি শর্ত যা একটি লেনদেনকে অবৈধ করে তুলতে পারে।

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

নতুন অ্যাকাউন্ট অ্যারে তৈরি করুন এবং তারপর এটি ফেরত দিন।

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

এই ফাংশনটি মেসেজ থেকে অ্যাড্রেস পড়ে।

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

অ্যাড্রেস সবসময় 20 বাইট (এ.কে.এ. 40 হেক্সাডেসিমেল অঙ্ক) লম্বা হয় এবং ৭ নম্বর অক্ষর থেকে শুরু হয়। 40 হেক্সাডেসিমেল অঙ্ক) দীর্ঘ, এবং অক্ষর #7 থেকে শুরু হয়।

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

মেসেজ থেকে পরিমাণ এবং ননস পড়ুন।

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

মেসেজে, অ্যাড্রেসের পরের প্রথম সংখ্যাটি হল ট্রান্সফারের জন্য ফিনির পরিমাণ (এ.কে.এ. হাজার ভাগের এক ETH)। হাজার ভাগের এক ETH) ট্রান্সফার করার জন্য। দ্বিতীয় সংখ্যাটি হল ননস। তাদের মধ্যে যেকোনো টেক্সট উপেক্ষা করা হয়।

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

একটি [টাপল](https://noir-lang.org/docs/noir/concepts/data_types/tuples) ফেরত দেওয়া হল Noir-এ একটি ফাংশন থেকে একাধিক মান ফেরত দেওয়ার উপায়।

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

এই ফাংশনটি মেসেজকে বাইটে রূপান্তর করে, তারপর পরিমাণগুলোকে একটি `TransferTxn`-এ রূপান্তর করে।

```rust
// Viem-এর hashMessage-এর সমতুল্য
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

আমরা অ্যাকাউন্টগুলির জন্য পেডারসেন হ্যাস ব্যবহার করতে পেরেছি কারণ সেগুলি শুধুমাত্র জিরো-নলেজ প্রুফের ভিতরে হ্যাস করা হয়। তবে, এই কোডে আমাদের মেসেজের সিগনেচার পরীক্ষা করতে হবে, যা ব্রাউজার দ্বারা তৈরি হয়। এর জন্য, আমাদের [EIP 191](https://eips.ethereum.org/EIPS/eip-191)-এ ইথেরিয়াম সাইনিং ফরম্যাট অনুসরণ করতে হবে। এর মানে হল আমাদের একটি স্ট্যান্ডার্ড প্রিফিক্স, ASCII-তে মেসেজের দৈর্ঘ্য এবং মেসেজটি নিজেই সহ একটি সম্মিলিত বাফার তৈরি করতে হবে, এবং এটিকে হ্যাস করার জন্য ইথেরিয়ামের স্ট্যান্ডার্ড keccak256 ব্যবহার করতে হবে।

```rust
    // ASCII prefix
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
        0x0A  // '\n'
    ];
```

এমন পরিস্থিতি এড়াতে যেখানে একটি অ্যাপ্লিকেশন ব্যবহারকারীকে এমন একটি মেসেজে স্বাক্ষর করতে বলে যা একটি লেনদেন হিসাবে বা অন্য কোনো উদ্দেশ্যে ব্যবহার করা যেতে পারে, EIP 191 নির্দিষ্ট করে যে সমস্ত স্বাক্ষরিত মেসেজ 0x19 অক্ষর (একটি বৈধ ASCII অক্ষর নয়) দিয়ে শুরু হবে, তারপরে `Ethereum Signed Message:` এবং একটি নিউলাইন থাকবে।

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

999 পর্যন্ত মেসেজের দৈর্ঘ্য হ্যান্ডেল করুন এবং এর চেয়ে বেশি হলে ব্যর্থ হন। আমি এই কোডটি যুক্ত করেছি, যদিও মেসেজের দৈর্ঘ্য একটি ধ্রুবক, কারণ এটি পরিবর্তন করা সহজ করে তোলে। একটি প্রোডাকশন সিস্টেমে, আপনি সম্ভবত ধরে নেবেন যে ভাল পারফরম্যান্সের জন্য `MESSAGE_LENGTH` পরিবর্তন হয় না।

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

ইথেরিয়াম স্ট্যান্ডার্ড `keccak256` ফাংশন ব্যবহার করুন।

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

এই ফাংশনটি সিগনেচার যাচাই করে, যার জন্য মেসেজ হ্যাস প্রয়োজন। এটি তখন আমাদের স্বাক্ষরকারী অ্যাড্রেস এবং মেসেজ হ্যাস প্রদান করে। মেসেজ হ্যাস দুটি `Field` মান হিসাবে সরবরাহ করা হয় কারণ সেগুলি একটি বাইট অ্যারের চেয়ে প্রোগ্রামের বাকি অংশে ব্যবহার করা সহজ।

আমাদের দুটি `Field` মান ব্যবহার করতে হবে কারণ ফিল্ড গণনাগুলি একটি বড় সংখ্যার [মডিউলো](https://en.wikipedia.org/wiki/Modulo) করা হয়, কিন্তু সেই সংখ্যাটি সাধারণত 256 বিটের কম (অন্যথায় EVM-এ সেই গণনাগুলি করা কঠিন হবে)।

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` এবং `hash2` কে পরিবর্তনযোগ্য ভেরিয়েবল হিসাবে নির্দিষ্ট করুন, এবং হ্যাসটি বাইট বাই বাইট তাতে লিখুন।

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

এটি [Solidity-র `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) এর মতো, তবে দুটি গুরুত্বপূর্ণ পার্থক্য রয়েছে:

- যদি সিগনেচারটি বৈধ না হয়, তাহলে কলটি একটি `assert` ব্যর্থ করে এবং প্রোগ্রামটি বন্ধ হয়ে যায়।
- যদিও পাবলিক কী সিগনেচার এবং হ্যাস থেকে পুনরুদ্ধার করা যায়, এটি এমন একটি প্রসেসিং যা বাইরে করা যেতে পারে এবং তাই, জিরো-নলেজ প্রুফের ভিতরে করা মূল্যবান নয়। যদি কেউ এখানে আমাদের সাথে প্রতারণা করার চেষ্টা করে, তাহলে সিগনেচার যাচাইকরণ ব্যর্থ হবে।

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

অবশেষে, আমরা `main` ফাংশনে পৌঁছেছি। আমাদের প্রমাণ করতে হবে যে আমাদের কাছে একটি লেনদেন রয়েছে যা অ্যাকাউন্টগুলির হ্যাসকে পুরনো মান থেকে নতুনটিতে বৈধভাবে পরিবর্তন করে। আমাদের এটাও প্রমাণ করতে হবে যে এর এই নির্দিষ্ট লেনদেন হ্যাস রয়েছে যাতে যে ব্যক্তি এটি পাঠিয়েছে সে জানতে পারে যে তার লেনদেন প্রক্রিয়া করা হয়েছে।

```rust
{
    let mut txn = readTransferTxn(message);
```

আমাদের `txn` কে পরিবর্তনযোগ্য হতে হবে কারণ আমরা মেসেজ থেকে থেকে অ্যাড্রেস পড়ি না, আমরা এটি সিগনেচার থেকে পড়ি।

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

### স্টেজ ২ - একটি সার্ভার যুক্ত করা {#stage-2}

দ্বিতীয় পর্যায়ে, আমরা একটি সার্ভার যুক্ত করি যা ব্রাউজার থেকে ট্রান্সফার লেনদেন গ্রহণ করে এবং বাস্তবায়ন করে।

এটি বাস্তবে কাজ করতে দেখতে:

1. যদি Vite চলমান থাকে তবে এটি বন্ধ করুন।

2. সার্ভার সহ ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার সমস্ত প্রয়োজনীয় মডিউল রয়েছে।

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir কোড কম্পাইল করার প্রয়োজন নেই, এটি স্টেজ ১-এর জন্য ব্যবহৃত কোডের মতোই।

3. সার্ভার শুরু করুন।

   ```sh
   npm run start
   ```

4. একটি পৃথক কমান্ড-লাইন উইন্ডোতে, ব্রাউজার কোড পরিবেশন করতে Vite চালান।

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) এ ক্লায়েন্ট কোডে ব্রাউজ করুন

6. একটি লেনদেন জারি করার আগে, আপনাকে ননস এবং আপনি যে পরিমাণ পাঠাতে পারেন তা জানতে হবে। এই তথ্য পেতে, **Update account data** এ ক্লিক করুন এবং মেসেজে স্বাক্ষর করুন।

   এখানে আমাদের একটি দ্বিধা রয়েছে। একদিকে, আমরা এমন একটি মেসেজে স্বাক্ষর করতে চাই না যা পুনরায় ব্যবহার করা যেতে পারে (একটি [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack)), যার কারণেই আমরা প্রথম স্থানে একটি ননস চাই। তবে, আমাদের এখনো কোনো ননস নেই। সমাধান হল এমন একটি ননস বেছে নেওয়া যা শুধুমাত্র একবার ব্যবহার করা যাবে এবং যা আমাদের উভয় দিকেই ইতিমধ্যে রয়েছে, যেমন বর্তমান সময়।

   এই সমাধানের সমস্যা হল যে সময় পুরোপুরি সিঙ্ক্রোনাইজড নাও হতে পারে। তাই এর পরিবর্তে, আমরা এমন একটি মানের উপর স্বাক্ষর করি যা প্রতি মিনিটে পরিবর্তন হয়। এর মানে হল যে রিপ্লে অ্যাটাকের জন্য আমাদের দুর্বলতার সময়সীমা সর্বোচ্চ এক মিনিট। বিবেচনা করে যে প্রোডাকশনে স্বাক্ষরিত অনুরোধটি TLS দ্বারা সুরক্ষিত থাকবে, এবং টানেলের অন্য প্রান্ত—সার্ভার—ইতিমধ্যেই ব্যালেন্স এবং ননস প্রকাশ করতে পারে (কাজ করার জন্য তাদের এটি জানতে হবে), এটি একটি গ্রহণযোগ্য ঝুঁকি।

7. ব্রাউজার ব্যালেন্স এবং ননস ফেরত পাওয়ার পরে, এটি ট্রান্সফার ফর্ম দেখায়। গন্তব্য অ্যাড্রেস এবং পরিমাণ নির্বাচন করুন এবং **Transfer** এ ক্লিক করুন। এই অনুরোধে স্বাক্ষর করুন।

8. ট্রান্সফার দেখতে, হয় **Update account data** করুন অথবা যে উইন্ডোতে আপনি সার্ভার চালাচ্ছেন সেখানে দেখুন। সার্ভার প্রতিবার পরিবর্তনের সময় স্টেট লগ করে।

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

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) সার্ভার প্রসেস ধারণ করে এবং [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) এ থাকা Noir কোডের সাথে মিথস্ক্রিয়া করে। এখানে আকর্ষণীয় অংশগুলির একটি ব্যাখ্যা দেওয়া হল।

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) লাইব্রেরি JavaScript কোড এবং Noir কোডের মধ্যে ইন্টারফেস করে।

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

অ্যারিথমেটিক সার্কিট—পূর্ববর্তী পর্যায়ে তৈরি করা কম্পাইল করা Noir প্রোগ্রাম—লোড করুন এবং এটি কার্যকর করার জন্য প্রস্তুত করুন।

```js
// আমরা শুধুমাত্র একটি স্বাক্ষরিত অনুরোধের জবাবে অ্যাকাউন্ট তথ্য প্রদান করি
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

অ্যাকাউন্ট তথ্য প্রদান করতে, আমাদের শুধুমাত্র সিগনেচার প্রয়োজন। কারণ হল আমরা ইতিমধ্যেই জানি মেসেজটি কী হবে, এবং তাই মেসেজ হ্যাস।

```js
const processMessage = async (message, signature) => {
```

একটি মেসেজ প্রসেস করুন এবং এটি যে লেনদেন এনকোড করে তা কার্যকর করুন।

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

এখন যেহেতু আমরা সার্ভারে জাভাস্ক্রিপ্ট চালাচ্ছি, আমরা ক্লায়েন্টের পরিবর্তে সেখানে পাবলিক কী পুনরুদ্ধার করতে পারি।

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

`noir.execute` Noir প্রোগ্রামটি চালায়। প্যারামিটারগুলি [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) এ প্রদত্ত প্যারামিটারগুলির সমতুল্য। মনে রাখবেন যে দীর্ঘ মানগুলি হেক্সাডেসিমেল স্ট্রিংগুলির একটি অ্যারে হিসাবে প্রদান করা হয় (`["0x60", "0xA7"]`), একক হেক্সাডেসিমেল মান হিসাবে নয় (`0x60A7`), যেভাবে Viem এটি করে।

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

যদি কোনো ত্রুটি থাকে, তবে এটি ধরুন এবং তারপর একটি সরলীকৃত সংস্করণ ক্লায়েন্টে রিলে করুন।

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

লেনদেনটি প্রয়োগ করুন। আমরা এটি ইতিমধ্যেই Noir কোডে করেছি, কিন্তু সেখান থেকে ফলাফল বের করার চেয়ে এখানে এটি আবার করা সহজ।

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

প্রাথমিক `Accounts` স্ট্রাকচার।

### স্টেজ ৩ - ইথেরিয়াম স্মার্ট কন্ট্র্যাক্ট {#stage-3}

1. সার্ভার এবং ক্লায়েন্ট প্রসেস বন্ধ করুন।

2. স্মার্ট কন্ট্র্যাক্ট সহ ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার সমস্ত প্রয়োজনীয় মডিউল রয়েছে।

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. একটি পৃথক কমান্ড-লাইন উইন্ডোতে `anvil` চালান।

4. ভেরিফিকেশন কী এবং সলিডিটি ভেরিফায়ার জেনারেট করুন, তারপর ভেরিফায়ার কোডটি সলিডিটি প্রজেক্টে কপি করুন।

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. স্মার্ট কন্ট্র্যাক্টে যান এবং `anvil` ব্লকচেইন ব্যবহার করার জন্য পরিবেশ ভেরিয়েবল সেট করুন।

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` ডিপ্লয় করুন এবং অ্যাড্রেসটি একটি এনভায়রনমেন্ট ভেরিয়েবলে সংরক্ষণ করুন।

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` কন্ট্রাক্ট ডিপ্লয় করুন।

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` মানটি হল `Accounts`-এর প্রাথমিক স্টেটের পেডারসেন হ্যাস। যদি আপনি `server/index.mjs`-এ এই প্রাথমিক স্টেট পরিবর্তন করেন, তবে আপনি জিরো-নলেজ প্রুফ দ্বারা রিপোর্ট করা প্রাথমিক হ্যাস দেখতে একটি লেনদেন চালাতে পারেন।

8. সার্ভারটি চালান।

   ```sh
   cd ../server
   npm run start
   ```

9. একটি ভিন্ন কমান্ড-লাইন উইন্ডোতে ক্লায়েন্ট চালান।

   ```sh
   cd client
   npm run dev
   ```

10. কিছু লেনদেন চালান।

11. স্টেটটি অনচেইনে পরিবর্তিত হয়েছে কিনা তা যাচাই করতে, সার্ভার প্রসেসটি রিস্টার্ট করুন। দেখুন `ZkBank` আর লেনদেন গ্রহণ করছে না, কারণ লেনদেনগুলিতে আসল হ্যাস মান অনচেইনে সংরক্ষিত হ্যাস মান থেকে ভিন্ন।

    এটি প্রত্যাশিত ধরনের ত্রুটি।

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

এই ফাইলের পরিবর্তনগুলি বেশিরভাগই আসল প্রুফ তৈরি করা এবং এটি অনচেইনে জমা দেওয়ার সাথে সম্পর্কিত।

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

আমাদের অনচেইনে পাঠানোর জন্য আসল প্রুফ তৈরি করতে [Barretenberg প্যাকেজ](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ব্যবহার করতে হবে। আমরা এই প্যাকেজটি হয় কমান্ড-লাইন ইন্টারফেস (`bb`) চালিয়ে অথবা [JavaScript লাইব্রেরি, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) ব্যবহার করে ব্যবহার করতে পারি। JavaScript লাইব্রেরিটি নেটিভভাবে কোড চালানোর চেয়ে অনেক ধীর, তাই আমরা কমান্ড-লাইন ব্যবহার করার জন্য এখানে [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ব্যবহার করি।

মনে রাখবেন যে আপনি যদি `bb.js` ব্যবহার করার সিদ্ধান্ত নেন, তবে আপনাকে এমন একটি সংস্করণ ব্যবহার করতে হবে যা আপনার ব্যবহৃত Noir-এর সংস্করণের সাথে সামঞ্জস্যপূর্ণ। লেখার সময়, বর্তমান Noir সংস্করণ (1.0.0-beta.11) `bb.js` সংস্করণ 0.87 ব্যবহার করে।

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

এখানে অ্যাড্রেসটি হল সেইটি যা আপনি একটি পরিষ্কার `anvil` দিয়ে শুরু করে এবং উপরের নির্দেশাবলী অনুসরণ করে পান।

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

এই প্রাইভেট কীটি `anvil`-এর ডিফল্ট প্রি-ফান্ডেড অ্যাকাউন্টগুলির মধ্যে একটি।

```js
const generateProof = async (witness, fileID) => {
```

`bb` এক্সিকিউটেবল ব্যবহার করে একটি প্রুফ জেনারেট করুন।

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

উইটনেস একটি ফাইলে লিখুন।

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

প্রকৃতপক্ষে প্রুফটি তৈরি করুন। এই ধাপটি পাবলিক ভেরিয়েবল সহ একটি ফাইলও তৈরি করে, কিন্তু আমাদের সেটির প্রয়োজন নেই। আমরা `noir.execute` থেকে সেই ভেরিয়েবলগুলো ইতিমধ্যেই পেয়েছি।

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

প্রুফটি হল `Field` মানগুলির একটি JSON অ্যারে, যার প্রতিটি একটি হেক্সাডেসিমেল মান হিসাবে উপস্থাপিত। তবে, আমাদের এটি লেনদেনে একটি একক `bytes` মান হিসাবে পাঠাতে হবে, যা Viem একটি বড় হেক্সাডেসিমেল স্ট্রিং দ্বারা উপস্থাপন করে। এখানে আমরা সমস্ত মানগুলিকে একত্রিত করে, সমস্ত `0x` সরিয়ে এবং শেষে একটি যোগ করে বিন্যাস পরিবর্তন করি।

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

পরিষ্কার করুন এবং প্রুফটি ফেরত দিন।

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

পাবলিক ফিল্ডগুলিকে 32-বাইট মানের একটি অ্যারে হতে হবে। তবে, যেহেতু আমাদের লেনদেন হ্যাস দুটি `Field` মানের মধ্যে ভাগ করতে হয়েছিল, তাই এটি একটি 16-বাইট মান হিসাবে প্রদর্শিত হয়। এখানে আমরা শূন্য যোগ করি যাতে Viem বুঝতে পারে এটি আসলে 32 বাইট।

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

প্রতিটি অ্যাড্রেস প্রতিটি ননস শুধুমাত্র একবার ব্যবহার করে যাতে আমরা উইটনেস ফাইল এবং আউটপুট ডিরেক্টরির জন্য একটি অনন্য শনাক্তকারী হিসাবে `fromAddress` এবং `nonce`-এর একটি সমন্বয় ব্যবহার করতে পারি।

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

লেনদেনটি চেইনে পাঠান।

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

এটি অনচেইন কোড যা লেনদেন গ্রহণ করে।

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

অনচেইন কোডকে দুটি ভেরিয়েবলের ট্র্যাক রাখতে হবে: ভেরিফায়ার (একটি পৃথক কন্ট্রাক্ট যা `nargo` দ্বারা তৈরি) এবং বর্তমান স্টেট হ্যাস।

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

যখনই স্টেট পরিবর্তন হয়, আমরা একটি `TransactionProcessed` ইভেন্ট নির্গত করি।

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

এই ফাংশনটি লেনদেন প্রক্রিয়া করে। এটি প্রুফ (`bytes` হিসাবে) এবং পাবলিক ইনপুট (`bytes32` অ্যারে হিসাবে) গ্রহণ করে, যে ফরম্যাটে ভেরিফায়ারের প্রয়োজন (অনচেইন প্রসেসিং এবং তাই গ্যাস খরচ কমাতে)।

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

জিরো-নলেজ প্রুফটি হতে হবে যে লেনদেনটি আমাদের বর্তমান হ্যাস থেকে একটি নতুনটিতে পরিবর্তিত হয়।

```solidity
        myVerifier.verify(_proof, _publicFields);
```

জিরো-নলেজ প্রুফ যাচাই করার জন্য ভেরিফায়ার কন্ট্রাক্টে কল করুন। জিরো-নলেজ প্রুফ ভুল হলে এই ধাপটি লেনদেনটিকে বাতিল করে দেয়।

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

যদি সবকিছু ঠিক থাকে, তাহলে স্টেট হ্যাসটি নতুন মানে আপডেট করুন এবং একটি `TransactionProcessed` ইভেন্ট নির্গত করুন।

## কেন্দ্রীভূত উপাদান দ্বারা অপব্যবহার {#abuses}

তথ্য নিরাপত্তা তিনটি বৈশিষ্ট্য নিয়ে গঠিত:

- _গোপনীয়তা_, ব্যবহারকারীরা যে তথ্য পড়ার জন্য অনুমোদিত নন তা পড়তে পারে না।
- _অখণ্ডতা_, অনুমোদিত ব্যবহারকারী ছাড়া এবং অনুমোদিত পদ্ধতিতে তথ্য পরিবর্তন করা যায় না।
- _প্রাপ্যতা_, অনুমোদিত ব্যবহারকারীরা সিস্টেমটি ব্যবহার করতে পারেন।

এই সিস্টেমে, জিরো-নলেজ প্রুফের মাধ্যমে অখণ্ডতা প্রদান করা হয়। প্রাপ্যতা নিশ্চিত করা অনেক কঠিন, এবং গোপনীয়তা অসম্ভব, কারণ ব্যাংককে প্রতিটি অ্যাকাউন্টের ব্যালেন্স এবং সমস্ত লেনদেন জানতে হয়। একটি সত্তার কাছে থাকা তথ্য শেয়ার করা থেকে বিরত রাখার কোনো উপায় নেই।

[স্টেলথ অ্যাড্রেস](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ব্যবহার করে একটি সত্যিকারের গোপনীয় ব্যাংক তৈরি করা সম্ভব হতে পারে, কিন্তু তা এই নিবন্ধের সুযোগের বাইরে।

### মিথ্যা তথ্য {#false-info}

সার্ভার যেভাবে অখণ্ডতা লঙ্ঘন করতে পারে তার একটি উপায় হল [ডেটা অনুরোধ করা হলে](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) মিথ্যা তথ্য প্রদান করা।

এটি সমাধান করতে, আমরা একটি দ্বিতীয় Noir প্রোগ্রাম লিখতে পারি যা অ্যাকাউন্টগুলিকে ব্যক্তিগত ইনপুট হিসাবে এবং যে অ্যাড্রেসের জন্য তথ্য অনুরোধ করা হয়েছে তা পাবলিক ইনপুট হিসাবে গ্রহণ করে। আউটপুট হল সেই অ্যাড্রেসের ব্যালেন্স এবং ননস, এবং অ্যাকাউন্টগুলির হ্যাস।

অবশ্যই, এই প্রুফটি অনচেইনে যাচাই করা যাবে না, কারণ আমরা অনচেইনে ননস এবং ব্যালেন্স পোস্ট করতে চাই না। তবে, এটি ব্রাউজারে চলমান ক্লায়েন্ট কোড দ্বারা যাচাই করা যেতে পারে।

### বাধ্যতামূলক লেনদেন {#forced-txns}

L2s-এ অ্যাভেইলেবিলিটি নিশ্চিত করা এবং সেন্সরশিপ প্রতিরোধের জন্য সাধারণ মেকানিজম হল [ফোর্সড ট্রানজাকশন](https://docs.optimism.io/stack/transactions/forced-transaction)। কিন্তু বাধ্যতামূলক লেনদেন জিরো-নলেজ প্রুফের সাথে একত্রিত হয় না। সার্ভার হল একমাত্র সত্তা যা লেনদেন যাচাই করতে পারে।

আমরা `smart-contracts/src/ZkBank.sol` পরিবর্তন করে বাধ্যতামূলক লেনদেন গ্রহণ করতে পারি এবং সার্ভারকে সেগুলি প্রক্রিয়া না করা পর্যন্ত স্টেট পরিবর্তন করা থেকে বিরত রাখতে পারি। তবে, এটি আমাদের একটি সহজ ডিনাইয়াল-অব-সার্ভিস অ্যাটাকের জন্য উন্মুক্ত করে। যদি একটি বাধ্যতামূলক লেনদেন অবৈধ হয় এবং তাই প্রক্রিয়া করা অসম্ভব হয়?

সমাধান হল একটি জিরো-নলেজ প্রুফ থাকা যে একটি বাধ্যতামূলক লেনদেন অবৈধ। এটি সার্ভারকে তিনটি বিকল্প দেয়:

- বাধ্যতামূলক লেনদেনটি প্রক্রিয়া করুন, এটি প্রক্রিয়া করা হয়েছে এবং নতুন স্টেট হ্যাস রয়েছে তার একটি জিরো-নলেজ প্রুফ প্রদান করুন।
- বাধ্যতামূলক লেনদেনটি প্রত্যাখ্যান করুন, এবং কন্ট্রাক্টকে একটি জিরো-নলেজ প্রুফ প্রদান করুন যে লেনদেনটি অবৈধ (অজানা অ্যাড্রেস, খারাপ ননস, বা অপর্যাপ্ত ব্যালেন্স)।
- বাধ্যতামূলক লেনদেন উপেক্ষা করুন। সার্ভারকে প্রকৃতপক্ষে লেনদেনটি প্রক্রিয়া করতে বাধ্য করার কোনো উপায় নেই, তবে এর মানে হল পুরো সিস্টেমটি अनुपলব্ধ।

#### উপস্থিতি বন্ড {#avail-bonds}

বাস্তব-জীবনের বাস্তবায়নে, সার্ভারটি চালু রাখার জন্য সম্ভবত কোনো ধরনের লাভের উদ্দেশ্য থাকবে। আমরা এই প্রণোদনাটিকে আরও শক্তিশালী করতে পারি সার্ভারকে একটি অ্যাভেইলেবিলিটি বন্ড পোস্ট করতে বলে যা যে কেউ বার্ন করতে পারবে যদি একটি ফোর্সড ট্রানজাকশন একটি নির্দিষ্ট সময়ের মধ্যে প্রক্রিয়াজাত না হয়।

### খারাপ Noir কোড {#bad-noir-code}

সাধারণত, একটি স্মার্ট কন্ট্র্যাক্টের উপর মানুষের বিশ্বাস অর্জনের জন্য আমরা সোর্স কোডটি একটি [ব্লক এক্সপ্লোরারে](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) আপলোড করি। তবে, জিরো-নলেজ প্রুফের ক্ষেত্রে, এটি অপর্যাপ্ত।

`Verifier.sol` ভেরিফিকেশন কী ধারণ করে, যা Noir প্রোগ্রামের একটি ফাংশন। তবে, সেই কী আমাদের বলে না যে Noir প্রোগ্রামটি কী ছিল। প্রকৃতপক্ষে একটি বিশ্বস্ত সমাধান পেতে, আপনাকে Noir প্রোগ্রাম (এবং এটি তৈরি করা সংস্করণ) আপলোড করতে হবে। অন্যথায়, জিরো-নলেজ প্রুফগুলি একটি ভিন্ন প্রোগ্রামকে প্রতিফলিত করতে পারে, যার একটি ব্যাক ডোর রয়েছে।

ব্লক এক্সপ্লোরাররা আমাদের Noir প্রোগ্রাম আপলোড এবং যাচাই করার অনুমতি না দেওয়া পর্যন্ত, আপনার এটি নিজেই করা উচিত (বিশেষত [IPFS](/developers/tutorials/ipfs-decentralized-ui/)-এ)। তাহলে অভিজ্ঞ ব্যবহারকারীরা সোর্স কোড ডাউনলোড করতে, নিজেরা কম্পাইল করতে, `Verifier.sol` তৈরি করতে এবং এটি অনচেইনে থাকা কোডের সাথে অভিন্ন কিনা তা যাচাই করতে সক্ষম হবেন।

## উপসংহার {#conclusion}

প্লাজমা-টাইপ অ্যাপ্লিকেশনগুলির জন্য তথ্য সংরক্ষণের জন্য একটি কেন্দ্রীভূত উপাদান প্রয়োজন। এটি সম্ভাব্য দুর্বলতা উন্মুক্ত করে কিন্তু, বিনিময়ে, আমাদের ব্লকচেইনে উপলব্ধ নয় এমন উপায়ে গোপনীয়তা রক্ষা করতে দেয়। জিরো-নলেজ প্রুফের মাধ্যমে আমরা অখণ্ডতা নিশ্চিত করতে পারি এবং সম্ভবত কেন্দ্রীভূত উপাদানটি চালানো যার জন্য অর্থনৈতিকভাবে সুবিধাজনক হবে তার জন্য প্রাপ্যতা বজায় রাখতে পারি।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

## স্বীকৃতি {#acknowledgements}

- Josh Crites এই নিবন্ধের একটি খসড়া পড়েছিলেন এবং একটি কাঁটাযুক্ত Noir সমস্যায় আমাকে সাহায্য করেছিলেন।

যেকোনো অবশিষ্ট ত্রুটির জন্য আমি দায়ী।
