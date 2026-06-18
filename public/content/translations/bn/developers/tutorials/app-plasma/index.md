---
title: গোপনীয়তা বজায় রাখে এমন একটি অ্যাপ-নির্দিষ্ট প্লাজমা লিখুন
description: এই টিউটোরিয়ালে, আমরা জমার জন্য একটি আধা-গোপন ব্যাংক তৈরি করব। ব্যাংকটি একটি কেন্দ্রীভূত উপাদান; এটি প্রতিটি ব্যবহারকারীর ব্যালেন্স জানে। তবে, এই তথ্য অনচেইন সংরক্ষণ করা হয় না। এর পরিবর্তে, ব্যাংকটি স্টেটের একটি হ্যাশ পোস্ট করে। প্রতিবার যখন কোনো ট্রানজ্যাকশন ঘটে, ব্যাংকটি নতুন হ্যাশ পোস্ট করে, সাথে একটি শূন্য-জ্ঞান প্রমাণ দেয় যে এর কাছে একটি স্বাক্ষরিত ট্রানজ্যাকশন রয়েছে যা হ্যাশ স্টেটটিকে নতুনটিতে পরিবর্তন করে। এই টিউটোরিয়ালটি পড়ার পর, আপনি কেবল শূন্য-জ্ঞান প্রমাণ কীভাবে ব্যবহার করতে হয় তা-ই বুঝবেন না, বরং কেন আপনি সেগুলো ব্যবহার করবেন এবং কীভাবে নিরাপদে তা করবেন তাও বুঝতে পারবেন।
author: ওরি পোমেরান্টজ
tags:
  - জিরো-নলেজ
  - সার্ভার
  - অফচেইন
  - গোপনীয়তা
skill: advanced
breadcrumb: অ্যাপ-নির্দিষ্ট প্লাজমা
lang: bn
published: 2025-10-15
---
## ভূমিকা {#introduction}

[রোলআপ](/developers/docs/scaling/zk-rollups/)-এর বিপরীতে, [প্লাজমা](/developers/docs/scaling/plasma) ইন্টিগ্রিটির জন্য ইথেরিয়াম মেইননেট ব্যবহার করে, কিন্তু অ্যাভেইলেবিলিটির জন্য নয়। এই নিবন্ধে, আমরা এমন একটি অ্যাপ্লিকেশন লিখব যা একটি প্লাজমার মতো আচরণ করে, যেখানে ইথেরিয়াম ইন্টিগ্রিটির (কোনো অননুমোদিত পরিবর্তন নয়) নিশ্চয়তা দেয় কিন্তু অ্যাভেইলেবিলিটির (একটি কেন্দ্রীভূত উপাদান ডাউন হয়ে পুরো সিস্টেমকে নিষ্ক্রিয় করতে পারে) নয়।

আমরা এখানে যে অ্যাপ্লিকেশনটি লিখছি তা হলো একটি গোপনীয়তা-সংরক্ষণকারী ব্যাংক। বিভিন্ন ঠিকানার ব্যালেন্সসহ অ্যাকাউন্ট রয়েছে এবং তারা অন্যান্য অ্যাকাউন্টে অর্থ (ETH) পাঠাতে পারে। ব্যাংকটি স্টেট (অ্যাকাউন্ট এবং তাদের ব্যালেন্স) এবং ট্রানজ্যাকশনের হ্যাশ পোস্ট করে, কিন্তু প্রকৃত ব্যালেন্সগুলো অফচেইন রাখে যেখানে সেগুলো গোপন থাকতে পারে।

## ডিজাইন {#design}

এটি কোনো প্রোডাকশন-রেডি সিস্টেম নয়, বরং একটি শেখার টুল। তাই, এটি বেশ কয়েকটি সহজ অনুমানের উপর ভিত্তি করে লেখা হয়েছে।

- নির্দিষ্ট অ্যাকাউন্ট পুল। এখানে একটি নির্দিষ্ট সংখ্যক অ্যাকাউন্ট রয়েছে এবং প্রতিটি অ্যাকাউন্ট একটি পূর্বনির্ধারিত ঠিকানার অন্তর্গত। এটি সিস্টেমটিকে অনেক সহজ করে তোলে কারণ শূন্য-জ্ঞান প্রমাণে পরিবর্তনশীল আকারের ডেটা স্ট্রাকচার পরিচালনা করা কঠিন। একটি প্রোডাকশন-রেডি সিস্টেমের জন্য, আমরা স্টেট হ্যাশ হিসেবে [মার্কেল রুট](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) ব্যবহার করতে পারি এবং প্রয়োজনীয় ব্যালেন্সের জন্য মার্কেল প্রমাণ প্রদান করতে পারি।

- মেমরি স্টোরেজ। একটি প্রোডাকশন সিস্টেমে, রিস্টার্ট করার ক্ষেত্রে সেগুলো সংরক্ষণ করার জন্য আমাদের সমস্ত অ্যাকাউন্ট ব্যালেন্স ডিস্কে লিখতে হবে। এখানে, তথ্য হারিয়ে গেলেও কোনো সমস্যা নেই।

- শুধুমাত্র হস্তান্তর। একটি প্রোডাকশন সিস্টেমে ব্যাংকে সম্পদ জমা করা এবং তা তোলার একটি উপায় প্রয়োজন হবে। তবে এখানকার উদ্দেশ্য হলো কেবল ধারণাটি ব্যাখ্যা করা, তাই এই ব্যাংকটি শুধুমাত্র হস্তান্তরের মধ্যে সীমাবদ্ধ।

### শূন্য-জ্ঞান প্রমাণ {#zero-knowledge-proofs}

মৌলিক স্তরে, একটি শূন্য-জ্ঞান প্রমাণ দেখায় যে প্রমাণকারী কিছু ডেটা, _Data<sub>private</sub>_ জানে, যাতে কিছু পাবলিক ডেটা, _Data<sub>public</sub>_ এবং _Data<sub>private</sub>_-এর মধ্যে একটি সম্পর্ক _Relationship_ থাকে। যাচাইকারী _Relationship_ এবং _Data<sub>public</sub>_ জানে।

গোপনীয়তা বজায় রাখার জন্য, আমাদের স্টেট এবং ট্রানজ্যাকশনগুলো ব্যক্তিগত রাখা প্রয়োজন। তবে অখণ্ডতা নিশ্চিত করতে, আমাদের স্টেটের [ক্রিপ্টোগ্রাফিক হ্যাশ](https://en.wikipedia.org/wiki/Cryptographic_hash_function) পাবলিক হওয়া প্রয়োজন। যারা ট্রানজ্যাকশন জমা দেয় তাদের কাছে প্রমাণ করার জন্য যে সেই ট্রানজ্যাকশনগুলো সত্যিই ঘটেছে, আমাদের ট্রানজ্যাকশন হ্যাশগুলোও পোস্ট করতে হবে।

বেশিরভাগ ক্ষেত্রে, _Data<sub>private</sub>_ হলো শূন্য-জ্ঞান প্রমাণ প্রোগ্রামের ইনপুট এবং _Data<sub>public</sub>_ হলো আউটপুট।

_Data<sub>private</sub>_-এর এই ফিল্ডগুলো:

- _State<sub>n</sub>_, পুরোনো স্টেট
- _State<sub>n+1</sub>_, নতুন স্টেট
- _Transaction_, একটি ট্রানজ্যাকশন যা পুরোনো স্টেট থেকে নতুন স্টেটে পরিবর্তিত হয়। এই ট্রানজ্যাকশনে এই ফিল্ডগুলো অন্তর্ভুক্ত থাকতে হবে:
  - _Destination address_ যা হস্তান্তর গ্রহণ করে
  - _Amount_ যা হস্তান্তর করা হচ্ছে
  - _Nonce_ যা নিশ্চিত করে যে প্রতিটি ট্রানজ্যাকশন কেবল একবারই প্রক্রিয়া করা যাবে।
    উৎস ঠিকানাটি ট্রানজ্যাকশনে থাকার প্রয়োজন নেই, কারণ এটি স্বাক্ষর থেকে পুনরুদ্ধার করা যেতে পারে।
- _Signature_, একটি স্বাক্ষর যা ট্রানজ্যাকশনটি সম্পাদন করার জন্য অনুমোদিত। আমাদের ক্ষেত্রে, ট্রানজ্যাকশন সম্পাদন করার জন্য অনুমোদিত একমাত্র ঠিকানা হলো উৎস ঠিকানা। যেহেতু আমাদের জিরো-নলেজ সিস্টেমটি তার নিজস্ব উপায়ে কাজ করে, তাই ইথেরিয়াম স্বাক্ষরের পাশাপাশি আমাদের অ্যাকাউন্টের পাবলিক কী-ও প্রয়োজন।

_Data<sub>public</sub>_-এর ফিল্ডগুলো হলো:

- _Hash(State<sub>n</sub>)_ পুরোনো স্টেটের হ্যাশ
- _Hash(State<sub>n+1</sub>)_ নতুন স্টেটের হ্যাশ
- _Hash(Transaction)_ সেই ট্রানজ্যাকশনের হ্যাশ যা স্টেটকে _State<sub>n</sub>_ থেকে _State<sub>n+1</sub>_-এ পরিবর্তন করে।

সম্পর্কটি বেশ কয়েকটি শর্ত পরীক্ষা করে:

- পাবলিক হ্যাশগুলো সত্যিই প্রাইভেট ফিল্ডগুলোর জন্য সঠিক হ্যাশ।
- ট্রানজ্যাকশনটি পুরোনো স্টেটে প্রয়োগ করা হলে, নতুন স্টেট তৈরি হয়।
- স্বাক্ষরটি ট্রানজ্যাকশনের উৎস ঠিকানা থেকে আসে।

ক্রিপ্টোগ্রাফিক হ্যাশ ফাংশনের বৈশিষ্ট্যগুলোর কারণে, এই শর্তগুলো প্রমাণ করাই অখণ্ডতা নিশ্চিত করার জন্য যথেষ্ট।

### ডেটা স্ট্রাকচার {#data-structures}

প্রাথমিক ডেটা স্ট্রাকচার হলো সার্ভারের কাছে থাকা স্টেট। প্রতিটি অ্যাকাউন্টের জন্য, সার্ভার অ্যাকাউন্ট ব্যালেন্স এবং একটি [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce)-এর হিসাব রাখে, যা [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack) প্রতিরোধ করতে ব্যবহৃত হয়।

### উপাদান {#components}

এই সিস্টেমের জন্য দুটি উপাদান প্রয়োজন:

- _সার্ভার_ যা ট্রানজ্যাকশন গ্রহণ করে, সেগুলো প্রক্রিয়া করে এবং শূন্য-জ্ঞান প্রমাণের সাথে চেইনে হ্যাশ পোস্ট করে।
- একটি _স্মার্ট কন্ট্রাক্ট_ যা হ্যাশগুলো সংরক্ষণ করে এবং স্টেট ট্রানজিশনগুলো বৈধ কিনা তা নিশ্চিত করতে শূন্য-জ্ঞান প্রমাণগুলো যাচাই করে।

### ডেটা এবং কন্ট্রোল ফ্লো {#flows}

এগুলো হলো সেই উপায় যার মাধ্যমে বিভিন্ন উপাদান এক অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে হস্তান্তরের জন্য যোগাযোগ করে।

1. একটি ওয়েব ব্রাউজার স্বাক্ষরকারীর অ্যাকাউন্ট থেকে অন্য একটি অ্যাকাউন্টে হস্তান্তরের অনুরোধ করে একটি স্বাক্ষরিত ট্রানজ্যাকশন জমা দেয়।

2. সার্ভার যাচাই করে যে ট্রানজ্যাকশনটি বৈধ:

   - ব্যাংকে স্বাক্ষরকারীর পর্যাপ্ত ব্যালেন্সসহ একটি অ্যাকাউন্ট রয়েছে।
   - ব্যাংকে প্রাপকের একটি অ্যাকাউন্ট রয়েছে।

3. সার্ভার স্বাক্ষরকারীর ব্যালেন্স থেকে হস্তান্তরিত পরিমাণ বিয়োগ করে এবং প্রাপকের ব্যালেন্সে যোগ করে নতুন স্টেট গণনা করে।

4. সার্ভার একটি শূন্য-জ্ঞান প্রমাণ গণনা করে যা প্রমাণ করে যে স্টেট পরিবর্তনটি বৈধ।

5. সার্ভার ইথেরিয়ামে একটি ট্রানজ্যাকশন জমা দেয় যার মধ্যে অন্তর্ভুক্ত থাকে:

   - নতুন স্টেট হ্যাশ
   - ট্রানজ্যাকশন হ্যাশ (যাতে ট্রানজ্যাকশন প্রেরক জানতে পারে যে এটি প্রক্রিয়া করা হয়েছে)
   - শূন্য-জ্ঞান প্রমাণ যা প্রমাণ করে যে নতুন স্টেটে ট্রানজিশনটি বৈধ

6. স্মার্ট কন্ট্রাক্ট শূন্য-জ্ঞান প্রমাণ যাচাই করে।

7. যদি শূন্য-জ্ঞান প্রমাণটি সঠিক হয়, তবে স্মার্ট কন্ট্রাক্ট এই কাজগুলো সম্পাদন করে:
   - বর্তমান স্টেট হ্যাশটিকে নতুন স্টেট হ্যাশে আপডেট করে
   - নতুন স্টেট হ্যাশ এবং ট্রানজ্যাকশন হ্যাশসহ একটি লগ এন্ট্রি নির্গত করে

### টুলস {#tools}

ক্লায়েন্ট-সাইড কোডের জন্য, আমরা [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) এবং [Wagmi](https://wagmi.sh/) ব্যবহার করতে যাচ্ছি। এগুলো ইন্ডাস্ট্রি-স্ট্যান্ডার্ড টুল; আপনি যদি এগুলোর সাথে পরিচিত না হন, তবে আপনি [এই টিউটোরিয়ালটি](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) ব্যবহার করতে পারেন।

সার্ভারের বেশিরভাগ অংশ [Node](https://nodejs.org/en) ব্যবহার করে JavaScript-এ লেখা হয়েছে। জিরো-নলেজ অংশটি [Noir](https://noir-lang.org/)-এ লেখা হয়েছে। আমাদের `1.0.0-beta.10` সংস্করণটি প্রয়োজন, তাই [নির্দেশনা অনুযায়ী Noir ইনস্টল করার](https://noir-lang.org/docs/getting_started/quick_start) পর, রান করুন:

```
noirup -v 1.0.0-beta.10
```

আমরা যে ব্লকচেইনটি ব্যবহার করি তা হলো `anvil`, একটি লোকাল টেস্টিং ব্লকচেইন যা [Foundry](https://getfoundry.sh/introduction/installation)-এর অংশ।

## বাস্তবায়ন {#implementation}

যেহেতু এটি একটি জটিল সিস্টেম, তাই আমরা এটি ধাপে ধাপে বাস্তবায়ন করব।

### পর্যায় 1 - ম্যানুয়াল জিরো-নলেজ {#stage-1}

প্রথম পর্যায়ের জন্য, আমরা ব্রাউজারে একটি ট্রানজ্যাকশন স্বাক্ষর করব এবং তারপর ম্যানুয়ালি শূন্য-জ্ঞান প্রমাণ-এ তথ্য প্রদান করব। জিরো-নলেজ কোড সেই তথ্যটি `server/noir/Prover.toml`-এ পাওয়ার আশা করে ([এখানে](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) নথিভুক্ত করা হয়েছে)।

এটি কার্যকরভাবে দেখতে:

1. নিশ্চিত করুন যে আপনার [Node](https://nodejs.org/en/download) এবং [Noir](https://noir-lang.org/install) ইনস্টল করা আছে। বিশেষত, এগুলোকে macOS, Linux, বা [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)-এর মতো কোনো UNIX সিস্টেমে ইনস্টল করুন।

2. পর্যায় 1-এর কোড ডাউনলোড করুন এবং ক্লায়েন্ট কোড পরিবেশন করতে ওয়েব সার্ভার চালু করুন।

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   এখানে আপনার একটি ওয়েব সার্ভার প্রয়োজন হওয়ার কারণ হলো, নির্দিষ্ট ধরনের জালিয়াতি রোধ করতে, অনেক ওয়ালেট (যেমন মেটামাস্ক) সরাসরি ডিস্ক থেকে পরিবেশিত ফাইল গ্রহণ করে না

3. একটি ওয়ালেট সহ একটি ব্রাউজার খুলুন।

4. ওয়ালেটে, একটি নতুন পাসফ্রেজ লিখুন। মনে রাখবেন যে এটি আপনার বিদ্যমান পাসফ্রেজ মুছে ফেলবে, তাই _নিশ্চিত করুন যে আপনার কাছে একটি ব্যাকআপ আছে_।

   পাসফ্রেজটি হলো `test test test test test test test test test test test junk`, যা anvil-এর জন্য ডিফল্ট টেস্টিং পাসফ্রেজ।

5. [ক্লায়েন্ট-সাইড কোড](http://localhost:5173/)-এ ব্রাউজ করুন।

6. ওয়ালেটের সাথে সংযুক্ত হোন এবং আপনার গন্তব্য অ্যাকাউন্ট ও পরিমাণ নির্বাচন করুন।

7. **Sign**-এ ক্লিক করুন এবং ট্রানজ্যাকশন স্বাক্ষর করুন।

8. **Prover.toml** শিরোনামের নিচে, আপনি টেক্সট পাবেন। `server/noir/Prover.toml`-কে সেই টেক্সট দিয়ে প্রতিস্থাপন করুন।

9. শূন্য-জ্ঞান প্রমাণ এক্সিকিউট করুন।

   ```sh
   cd ../server/noir
   nargo execute
   ```

   আউটপুটটি এর মতো হওয়া উচিত

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. বার্তা সঠিকভাবে হ্যাশ করা হয়েছে কিনা তা দেখতে ওয়েব ব্রাউজারে দেখা হ্যাশ-এর সাথে শেষ দুটি মান তুলনা করুন।

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir দ্বারা প্রত্যাশিত তথ্যের বিন্যাস দেখায়।

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

বার্তাটি টেক্সট ফরম্যাটে রয়েছে, যা ব্যবহারকারীর জন্য বোঝা সহজ করে তোলে (যা স্বাক্ষরকরণ-এর সময় প্রয়োজনীয়) এবং Noir কোডের জন্য পার্স করা সহজ করে। পরিমাণটি ফিনি-তে উল্লেখ করা হয়েছে যাতে একদিকে ভগ্নাংশ হস্তান্তর সম্ভব হয় এবং অন্যদিকে সহজে পড়া যায়। শেষ সংখ্যাটি হলো [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce)।

স্ট্রিংটি 100 ক্যারেক্টার দীর্ঘ। শূন্য-জ্ঞান প্রমাণ পরিবর্তনশীল-আকারের ডেটা ভালোভাবে পরিচালনা করতে পারে না, তাই প্রায়শই ডেটা প্যাড করার প্রয়োজন হয়।

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

এই তিনটি প্যারামিটার হলো নির্দিষ্ট-আকারের বাইট অ্যারে।

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

এটি স্ট্রাকচারের একটি অ্যারে নির্দিষ্ট করার উপায়। প্রতিটি এন্ট্রির জন্য, আমরা ঠিকানা, ব্যালেন্স (milliETH বা [ফিনি](https://cryptovalleyjournal.com/glossary/finney/)-তে), এবং পরবর্তী নন্স মান নির্দিষ্ট করি।

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) ক্লায়েন্ট-সাইড প্রসেসিং বাস্তবায়ন করে এবং `server/noir/Prover.toml` ফাইলটি তৈরি করে (যেটিতে জিরো-নলেজ প্যারামিটারগুলো অন্তর্ভুক্ত থাকে)।

এখানে আরও আকর্ষণীয় অংশগুলোর ব্যাখ্যা দেওয়া হলো।

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

এগুলো হলো অ্যাকাউন্ট ঠিকানা, যা `test ... test junk` পাসফ্রেজ দ্বারা তৈরি করা ঠিকানা। আপনি যদি নিজের ঠিকানা ব্যবহার করতে চান, তবে কেবল এই সংজ্ঞাটি পরিবর্তন করুন।

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

এই [Wagmi হুকগুলো](https://wagmi.sh/react/api/hooks) আমাদের [Viem](https://viem.sh/) লাইব্রেরি এবং ওয়ালেট অ্যাক্সেস করতে দেয়।

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

এটি হলো বার্তা, যা স্পেস দিয়ে প্যাড করা হয়েছে। প্রতিবার যখন [`useState`](https://react.dev/reference/react/useState) ভেরিয়েবলগুলোর কোনো একটি পরিবর্তিত হয়, কম্পোনেন্টটি পুনরায় আঁকা হয় এবং `message` আপডেট করা হয়।

```tsx
  const sign = async () => {
```

ব্যবহারকারী যখন **Sign** বোতামে ক্লিক করেন তখন এই ফাংশনটি কল করা হয়। বার্তাটি স্বয়ংক্রিয়ভাবে আপডেট হয়, তবে স্বাক্ষর-এর জন্য ওয়ালেটে ব্যবহারকারীর অনুমোদনের প্রয়োজন হয়, এবং আমরা প্রয়োজন না হলে এটি চাইতে চাই না।

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

ওয়ালেটকে [বার্তা স্বাক্ষর করতে বলুন](https://viem.sh/docs/accounts/local/signMessage)। 

```tsx
    const hash = hashMessage(message)
```

বার্তা হ্যাশ পান। ডিবাগিংয়ের জন্য (Noir কোডের) এটি ব্যবহারকারীকে প্রদান করা সহায়ক। 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[পাবলিক কী পান](https://viem.sh/docs/utilities/recoverPublicKey)। এটি [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) ফাংশনের জন্য প্রয়োজনীয়।

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

স্টেট ভেরিয়েবলগুলো সেট করুন। এটি করলে কম্পোনেন্টটি পুনরায় আঁকা হয় (`sign` ফাংশনটি প্রস্থান করার পরে) এবং ব্যবহারকারীকে আপডেট করা মানগুলো দেখায়।

```tsx
    let proverToml = `
```

`Prover.toml`-এর জন্য টেক্সট।

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem আমাদের পাবলিক কী-কে একটি 65-বাইট হেক্সাডেসিমাল স্ট্রিং হিসেবে প্রদান করে। প্রথম বাইটটি হলো `0x04`, যা একটি সংস্করণ মার্কার। এর পরে পাবলিক কী-এর `x`-এর জন্য 32 বাইট এবং তারপর পাবলিক কী-এর `y`-এর জন্য 32 বাইট থাকে।

যাইহোক, Noir এই তথ্যটি দুটি বাইট অ্যারে হিসেবে পাওয়ার আশা করে, একটি `x`-এর জন্য এবং একটি `y`-এর জন্য। শূন্য-জ্ঞান প্রমাণ-এর অংশ হিসেবে পার্স করার চেয়ে ক্লায়েন্টে এটি পার্স করা সহজ।

মনে রাখবেন যে এটি সাধারণভাবে জিরো-নলেজ-এ একটি ভালো অনুশীলন। শূন্য-জ্ঞান প্রমাণ-এর ভেতরের কোড ব্যয়বহুল, তাই শূন্য-জ্ঞান প্রমাণ-এর বাইরে যে কোনো প্রসেসিং করা সম্ভব হলে তা শূন্য-জ্ঞান প্রমাণ-এর বাইরেই করা _উচিত_।

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

স্বাক্ষর-ও একটি 65-বাইট হেক্সাডেসিমাল স্ট্রিং হিসেবে প্রদান করা হয়। যাইহোক, শেষ বাইটটি শুধুমাত্র পাবলিক কী পুনরুদ্ধার করার জন্য প্রয়োজনীয়। যেহেতু পাবলিক কী ইতিমধ্যেই Noir কোডে প্রদান করা হবে, তাই স্বাক্ষর যাচাই করার জন্য আমাদের এটির প্রয়োজন নেই এবং Noir কোডেরও এটির প্রয়োজন নেই।

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

এটি কম্পোনেন্টটির HTML (আরও সঠিকভাবে, [JSX](https://react.dev/learn/writing-markup-with-jsx)) বিন্যাস।

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) হলো আসল জিরো-নলেজ কোড।

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) [Noir স্ট্যান্ডার্ড লাইব্রেরি](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)-এর সাথে প্রদান করা হয়। শূন্য-জ্ঞান প্রমাণ সাধারণত এই হ্যাশ ফাংশন ব্যবহার করে। স্ট্যান্ডার্ড হ্যাশ ফাংশনগুলোর তুলনায় [অ্যারিথমেটিক সার্কিট](https://rareskills.io/post/arithmetic-circuit)-এর ভেতরে এটি গণনা করা অনেক সহজ।

```
use keccak256::keccak256;
use dep::ecrecover;
```

এই দুটি ফাংশন হলো এক্সটার্নাল লাইব্রেরি, যা [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml)-এ সংজ্ঞায়িত করা হয়েছে। এগুলো ঠিক তাদের নামের মতোই কাজ করে, একটি ফাংশন যা [keccak256 হ্যাশ](https://emn178.github.io/online-tools/keccak_256.html) গণনা করে এবং একটি ফাংশন যা ইথেরিয়াম স্বাক্ষর যাচাই করে এবং স্বাক্ষরকারীর ইথেরিয়াম ঠিকানা পুনরুদ্ধার করে।

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) দ্বারা অনুপ্রাণিত। ভেরিয়েবলগুলো ডিফল্টভাবে কনস্ট্যান্ট হয়। এভাবেই আমরা গ্লোবাল কনফিগারেশন কনস্ট্যান্টগুলো সংজ্ঞায়িত করি। নির্দিষ্টভাবে, `ACCOUNT_NUMBER` হলো আমাদের সংরক্ষিত অ্যাকাউন্ট-এর সংখ্যা।

`u<number>` নামের ডেটা টাইপগুলো হলো সেই সংখ্যক বিট, যা আনসাইনড। শুধুমাত্র সমর্থিত টাইপগুলো হলো `u8`, `u16`, `u32`, `u64`, এবং `u128`।

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

এই ভেরিয়েবলটি অ্যাকাউন্টগুলোর Pedersen হ্যাশ-এর জন্য ব্যবহৃত হয়, যা নিচে ব্যাখ্যা করা হয়েছে।

```
global MESSAGE_LENGTH : u32 = 100;
```

উপরে ব্যাখ্যা করা হয়েছে, বার্তার দৈর্ঘ্য নির্দিষ্ট। এটি এখানে উল্লেখ করা হয়েছে।

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 স্বাক্ষর](https://eips.ethereum.org/EIPS/eip-191)-এর জন্য একটি 26-বাইট প্রিফিক্স সহ একটি বাফার প্রয়োজন, যার পরে ASCII-তে বার্তার দৈর্ঘ্য এবং সবশেষে বার্তাটি থাকে।

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

একটি অ্যাকাউন্ট সম্পর্কে আমরা যে তথ্য সংরক্ষণ করি। [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) হলো একটি সংখ্যা, সাধারণত 253 বিট পর্যন্ত, যা সরাসরি [অ্যারিথমেটিক সার্কিট](https://rareskills.io/post/arithmetic-circuit)-এ ব্যবহার করা যেতে পারে যা শূন্য-জ্ঞান প্রমাণ বাস্তবায়ন করে। এখানে আমরা একটি 160-বিট ইথেরিয়াম ঠিকানা সংরক্ষণ করতে `Field` ব্যবহার করি।

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

একটি হস্তান্তর ট্রানজ্যাকশন-এর জন্য আমরা যে তথ্য সংরক্ষণ করি।

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

একটি ফাংশন সংজ্ঞা। প্যারামিটারটি হলো `Account` তথ্য। ফলাফলটি হলো `Field` ভেরিয়েবলের একটি অ্যারে, যার দৈর্ঘ্য হলো `FLAT_ACCOUNT_FIELDS`

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

অ্যারের প্রথম মানটি হলো অ্যাকাউন্ট ঠিকানা। দ্বিতীয়টিতে ব্যালেন্স এবং নন্স উভয়ই অন্তর্ভুক্ত থাকে। `.into()` কলগুলো একটি সংখ্যাকে তার প্রয়োজনীয় ডেটা টাইপে পরিবর্তন করে। `account.nonce` হলো একটি `u32` মান, তবে এটিকে `account.balance << 32` (একটি `u128` মান)-এর সাথে যোগ করতে, এটিকে একটি `u128` হতে হবে। এটি হলো প্রথম `.into()`। দ্বিতীয়টি `u128` ফলাফলটিকে একটি `Field`-এ রূপান্তর করে যাতে এটি অ্যারেতে ফিট হয়।

```
flat
}
```

Noir-এ, ফাংশনগুলো শুধুমাত্র শেষে একটি মান রিটার্ন করতে পারে (কোনো আর্লি রিটার্ন নেই)। রিটার্ন মান নির্দিষ্ট করতে, আপনি ফাংশনের ক্লোজিং ব্র্যাকেটের ঠিক আগে এটি মূল্যায়ন করেন।

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

এই ফাংশনটি অ্যাকাউন্ট অ্যারেটিকে একটি `Field` অ্যারেতে পরিণত করে, যা Petersen হ্যাশ-এর ইনপুট হিসেবে ব্যবহার করা যেতে পারে।

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

এভাবেই আপনি একটি মিউটেবল ভেরিয়েবল নির্দিষ্ট করেন, অর্থাৎ, যা কনস্ট্যান্ট _নয়_। Noir-এ ভেরিয়েবলগুলোর সর্বদা একটি মান থাকতে হবে, তাই আমরা এই ভেরিয়েবলটিকে সব শূন্য দিয়ে ইনিশিয়ালাইজ করি।

```
for i in 0..ACCOUNT_NUMBER {
```

এটি একটি `for` লুপ। মনে রাখবেন যে সীমানাগুলো কনস্ট্যান্ট। Noir লুপগুলোর সীমানা কম্পাইল করার সময় জানা থাকতে হবে। এর কারণ হলো অ্যারিথমেটিক সার্কিটগুলো ফ্লো কন্ট্রোল সমর্থন করে না। একটি `for` লুপ প্রসেস করার সময়, কম্পাইলার কেবল এর ভেতরের কোডটিকে একাধিকবার রাখে, প্রতিটি ইটারেশনের জন্য একবার।

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

অবশেষে, আমরা সেই ফাংশনে পৌঁছালাম যা অ্যাকাউন্ট অ্যারেটিকে হ্যাশ করে।

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

এই ফাংশনটি একটি নির্দিষ্ট ঠিকানা সহ অ্যাকাউন্ট খুঁজে বের করে। স্ট্যান্ডার্ড কোডে এই ফাংশনটি অত্যন্ত অদক্ষ হবে কারণ এটি ঠিকানা খুঁজে পাওয়ার পরেও সমস্ত অ্যাকাউন্ট-এর ওপর ইটারেট করে।

যাইহোক, শূন্য-জ্ঞান প্রমাণ-এ কোনো ফ্লো কন্ট্রোল নেই। যদি আমাদের কখনো কোনো শর্ত পরীক্ষা করার প্রয়োজন হয়, তবে আমাদের প্রতিবারই তা পরীক্ষা করতে হবে।

`if` স্টেটমেন্টের ক্ষেত্রেও একই রকম ঘটনা ঘটে। উপরের লুপের `if` স্টেটমেন্টটি এই গাণিতিক স্টেটমেন্টগুলোতে অনুবাদ করা হয়।

_condition<sub>result</sub> = accounts[i].address == address_ // সমান হলে এক, অন্যথায় শূন্য

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) ফাংশনটি শূন্য-জ্ঞান প্রমাণ-কে ক্র্যাশ করায় যদি অ্যাসাসশনটি মিথ্যা হয়। এই ক্ষেত্রে, যদি আমরা প্রাসঙ্গিক ঠিকানা সহ কোনো অ্যাকাউন্ট খুঁজে না পাই। ঠিকানা রিপোর্ট করতে, আমরা একটি [ফরম্যাট স্ট্রিং](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) ব্যবহার করি।

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

এই ফাংশনটি একটি হস্তান্তর ট্রানজ্যাকশন প্রয়োগ করে এবং নতুন অ্যাকাউন্ট অ্যারে রিটার্ন করে।

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

আমরা Noir-এ একটি ফরম্যাট স্ট্রিংয়ের ভেতরে স্ট্রাকচার এলিমেন্টগুলো অ্যাক্সেস করতে পারি না, তাই আমরা একটি ব্যবহারযোগ্য কপি তৈরি করি।

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

এই দুটি শর্ত একটি ট্রানজ্যাকশন-কে অবৈধ করে তুলতে পারে।

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

নতুন অ্যাকাউন্ট অ্যারে তৈরি করুন এবং তারপর এটি রিটার্ন করুন।

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

এই ফাংশনটি বার্তা থেকে ঠিকানা পড়ে। 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

ঠিকানা সর্বদা 20 বাইট (বা 40 হেক্সাডেসিমাল ডিজিট) দীর্ঘ হয় এবং 7 নম্বর ক্যারেক্টার থেকে শুরু হয়।

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

বার্তা থেকে পরিমাণ এবং নন্স পড়ুন। 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

বার্তায়, ঠিকানার পরের প্রথম সংখ্যাটি হলো হস্তান্তর করার জন্য ফিনি-এর পরিমাণ (বা ETH-এর এক সহস্রাংশ)। দ্বিতীয় সংখ্যাটি হলো নন্স। এগুলোর মাঝের যেকোনো টেক্সট উপেক্ষা করা হয়।

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // আমরা এইমাত্র এটি খুঁজে পেয়েছি
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

একটি [টাপল](https://noir-lang.org/docs/noir/concepts/data_types/tuples) রিটার্ন করা হলো একটি ফাংশন থেকে একাধিক মান রিটার্ন করার Noir-এর উপায়।

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

এই ফাংশনটি বার্তাকে বাইটে রূপান্তর করে, তারপর পরিমাণগুলোকে একটি `TransferTxn`-এ রূপান্তর করে।

```rust
// Viem এর hashMessage এর সমতুল্য
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

আমরা অ্যাকাউন্টগুলোর জন্য Pedersen হ্যাশ ব্যবহার করতে সক্ষম হয়েছিলাম কারণ সেগুলো শুধুমাত্র শূন্য-জ্ঞান প্রমাণ-এর ভেতরে হ্যাশ করা হয়। যাইহোক, এই কোডে আমাদের বার্তার স্বাক্ষর পরীক্ষা করতে হবে, যা ব্রাউজার দ্বারা তৈরি করা হয়। এর জন্য, আমাদের [EIP-191](https://eips.ethereum.org/EIPS/eip-191)-এ ইথেরিয়াম স্বাক্ষরকরণ বিন্যাস অনুসরণ করতে হবে। এর মানে হলো আমাদের একটি স্ট্যান্ডার্ড প্রিফিক্স, ASCII-তে বার্তার দৈর্ঘ্য এবং বার্তাটি সহ একটি সম্মিলিত বাফার তৈরি করতে হবে এবং এটিকে হ্যাশ করতে ইথেরিয়াম স্ট্যান্ডার্ড keccak256 ব্যবহার করতে হবে।

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
        0x0A  // '\n'
    ];
```

এমন পরিস্থিতি এড়াতে যেখানে কোনো অ্যাপ্লিকেশন ব্যবহারকারীকে এমন একটি বার্তা স্বাক্ষর করতে বলে যা ট্রানজ্যাকশন হিসেবে বা অন্য কোনো উদ্দেশ্যে ব্যবহার করা যেতে পারে, EIP-191 নির্দিষ্ট করে যে সমস্ত স্বাক্ষরিত বার্তা 0x19 ক্যারেক্টার (একটি বৈধ ASCII ক্যারেক্টার নয়) দিয়ে শুরু হয়, যার পরে `Ethereum Signed Message:` এবং একটি নতুন লাইন থাকে।

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

999 পর্যন্ত বার্তার দৈর্ঘ্য পরিচালনা করুন এবং এটি বড় হলে ব্যর্থ হোন। আমি এই কোডটি যোগ করেছি, যদিও বার্তার দৈর্ঘ্য একটি কনস্ট্যান্ট, কারণ এটি পরিবর্তন করা সহজ করে তোলে। একটি প্রোডাকশন সিস্টেমে, আপনি সম্ভবত ভালো পারফরম্যান্সের স্বার্থে ধরে নেবেন যে `MESSAGE_LENGTH` পরিবর্তন হয় না।

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

ইথেরিয়াম স্ট্যান্ডার্ড `keccak256` ফাংশন ব্যবহার করুন।

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // ঠিকানা, হ্যাশ এর প্রথম ১৬ বাইট, হ্যাশ এর শেষ ১৬ বাইট        
{
```

এই ফাংশনটি স্বাক্ষর যাচাই করে, যার জন্য বার্তা হ্যাশ প্রয়োজন। এটি তারপর আমাদের সেই ঠিকানা প্রদান করে যা এটি স্বাক্ষর করেছে এবং বার্তা হ্যাশ প্রদান করে। বার্তা হ্যাশ দুটি `Field` মানে সরবরাহ করা হয় কারণ বাইট অ্যারের চেয়ে প্রোগ্রামের বাকি অংশে সেগুলো ব্যবহার করা সহজ।

আমাদের দুটি `Field` মান ব্যবহার করতে হবে কারণ ফিল্ড গণনাগুলো একটি বড় সংখ্যার [মডুলো](https://en.wikipedia.org/wiki/Modulo) করা হয়, তবে সেই সংখ্যাটি সাধারণত 256 বিটের কম হয় (অন্যথায় EVM-এ সেই গণনাগুলো করা কঠিন হবে)।

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` এবং `hash2`-কে মিউটেবল ভেরিয়েবল হিসেবে নির্দিষ্ট করুন এবং সেগুলোতে বাইট বাই বাইট হ্যাশ লিখুন।

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
এটি [Solidity-এর `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)-এর মতো, তবে দুটি গুরুত্বপূর্ণ পার্থক্য রয়েছে:

- যদি স্বাক্ষর বৈধ না হয়, তবে কলটি একটি `assert` ব্যর্থ করে এবং প্রোগ্রামটি বাতিল করা হয়।
- যদিও স্বাক্ষর এবং হ্যাশ থেকে পাবলিক কী পুনরুদ্ধার করা যেতে পারে, এটি এমন একটি প্রসেসিং যা বাহ্যিকভাবে করা যেতে পারে এবং তাই, শূন্য-জ্ঞান প্রমাণ-এর ভেতরে এটি করার কোনো মানে হয় না। যদি কেউ এখানে আমাদের সাথে প্রতারণা করার চেষ্টা করে, তবে স্বাক্ষর যাচাইকরণ ব্যর্থ হবে।

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
        Field,  // পুরানো অ্যাকাউন্ট অ্যারের হ্যাশ
        Field,  // নতুন অ্যাকাউন্ট অ্যারের হ্যাশ
        Field,  // বার্তা হ্যাশ এর প্রথম ১৬ বাইট
        Field,  // বার্তা হ্যাশ এর শেষ ১৬ বাইট
    )
```

অবশেষে, আমরা `main` ফাংশনে পৌঁছাই। আমাদের প্রমাণ করতে হবে যে আমাদের কাছে একটি ট্রানজ্যাকশন আছে যা বৈধভাবে অ্যাকাউন্টগুলোর হ্যাশ-কে পুরানো মান থেকে নতুন মানে পরিবর্তন করে। আমাদের এটিও প্রমাণ করতে হবে যে এটির এই নির্দিষ্ট ট্রানজ্যাকশন হ্যাশ রয়েছে যাতে যে ব্যক্তি এটি পাঠিয়েছে সে জানতে পারে যে তার ট্রানজ্যাকশন প্রসেস করা হয়েছে।

```rust
{
    let mut txn = readTransferTxn(message);
```

আমাদের `txn`-কে মিউটেবল করতে হবে কারণ আমরা বার্তা থেকে প্রেরকের ঠিকানা পড়ি না, আমরা এটি স্বাক্ষর থেকে পড়ি। 

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

### পর্যায় 2 - একটি সার্ভার যোগ করা {#stage-2}

দ্বিতীয় পর্যায়ে, আমরা একটি সার্ভার যোগ করি যা ব্রাউজার থেকে হস্তান্তর ট্রানজ্যাকশন গ্রহণ করে এবং বাস্তবায়ন করে।

এটি কার্যকরভাবে দেখতে:

1. Vite চালু থাকলে তা বন্ধ করুন।

2. সার্ভার অন্তর্ভুক্ত থাকা ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার কাছে সমস্ত প্রয়োজনীয় মডিউল রয়েছে।

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir কোড কম্পাইল করার কোনো প্রয়োজন নেই, এটি পর্যায় 1-এর জন্য আপনার ব্যবহার করা কোডের মতোই।

3. সার্ভার চালু করুন।

   ```sh
   npm run start
   ```

4. একটি আলাদা কমান্ড-লাইন উইন্ডোতে, ব্রাউজার কোড পরিবেশন করতে Vite চালান।

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173)-এ ক্লায়েন্ট কোডে ব্রাউজ করুন

6. আপনি একটি ট্রানজ্যাকশন ইস্যু করার আগে, আপনাকে নন্স, সেইসাথে আপনি যে পরিমাণ পাঠাতে পারেন তা জানতে হবে। এই তথ্য পেতে, **Update account data**-এ ক্লিক করুন এবং বার্তা স্বাক্ষর করুন।

   আমাদের এখানে একটি দ্বিধা রয়েছে। একদিকে, আমরা এমন কোনো বার্তা স্বাক্ষর করতে চাই না যা পুনরায় ব্যবহার করা যেতে পারে (একটি [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack)), যে কারণে আমরা প্রথমেই একটি নন্স চাই। যাইহোক, আমাদের কাছে এখনো কোনো নন্স নেই। এর সমাধান হলো এমন একটি নন্স বেছে নেওয়া যা শুধুমাত্র একবার ব্যবহার করা যেতে পারে এবং যা আমাদের উভয় দিকেই ইতিমধ্যে রয়েছে, যেমন বর্তমান সময়।

   এই সমাধানের সমস্যা হলো সময় পুরোপুরি সিঙ্ক্রোনাইজ নাও হতে পারে। তাই এর পরিবর্তে, আমরা এমন একটি মান স্বাক্ষর করি যা প্রতি মিনিটে পরিবর্তিত হয়। এর মানে হলো রিপ্লে অ্যাটাকের প্রতি আমাদের দুর্বলতার উইন্ডো সর্বাধিক এক মিনিট। প্রোডাকশনে স্বাক্ষরিত রিকোয়েস্টটি TLS দ্বারা সুরক্ষিত থাকবে এবং টানেলের অন্য দিক---সার্ভার---ইতিমধ্যেই ব্যালেন্স এবং নন্স প্রকাশ করতে পারে (কাজ করার জন্য এটিকে এগুলো জানতে হবে), এটি বিবেচনা করে এটি একটি গ্রহণযোগ্য ঝুঁকি।

7. ব্রাউজার ব্যালেন্স এবং নন্স ফিরে পাওয়ার পর, এটি হস্তান্তর ফর্ম দেখায়। গন্তব্য ঠিকানা এবং পরিমাণ নির্বাচন করুন এবং **Transfer**-এ ক্লিক করুন। এই রিকোয়েস্টটি স্বাক্ষর করুন।

8. হস্তান্তর দেখতে, হয় **Update account data** করুন অথবা আপনি যেখানে সার্ভার চালাচ্ছেন সেই উইন্ডোতে দেখুন। সার্ভার প্রতিবার পরিবর্তিত হওয়ার সময় স্টেট লগ করে।

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

[এই ফাইলে](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) সার্ভার প্রসেস রয়েছে এবং এটি [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr)-এ Noir কোডের সাথে ইন্টারঅ্যাক্ট করে। এখানে আকর্ষণীয় অংশগুলোর একটি ব্যাখ্যা দেওয়া হলো।

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) লাইব্রেরি JavaScript কোড এবং Noir কোডের মধ্যে ইন্টারফেস হিসেবে কাজ করে।

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

অ্যারিথমেটিক সার্কিট লোড করুন---আগের পর্যায়ে আমাদের তৈরি করা কম্পাইল করা Noir প্রোগ্রাম---এবং এটি এক্সিকিউট করার জন্য প্রস্তুত করুন।

```js
// আমরা শুধুমাত্র একটি স্বাক্ষরিত অনুরোধের জবাবে অ্যাকাউন্ট তথ্য প্রদান করি
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

অ্যাকাউন্ট তথ্য প্রদান করতে, আমাদের শুধুমাত্র স্বাক্ষর প্রয়োজন। এর কারণ হলো আমরা ইতিমধ্যেই জানি বার্তাটি কী হতে চলেছে এবং তাই বার্তা হ্যাশ-ও জানি।

```js
const processMessage = async (message, signature) => {
```

একটি বার্তা প্রসেস করুন এবং এটি যে ট্রানজ্যাকশন এনকোড করে তা এক্সিকিউট করুন।

```js
    // পাবলিক কী পান
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

যেহেতু আমরা এখন সার্ভারে JavaScript চালাই, তাই আমরা ক্লায়েন্টের পরিবর্তে সেখানে পাবলিক কী পুনরুদ্ধার করতে পারি।

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

`noir.execute` Noir প্রোগ্রাম চালায়। প্যারামিটারগুলো [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)-এ প্রদত্ত প্যারামিটারগুলোর সমতুল্য। মনে রাখবেন যে দীর্ঘ মানগুলো হেক্সাডেসিমাল স্ট্রিংয়ের একটি অ্যারে (`["0x60", "0xA7"]`) হিসেবে প্রদান করা হয়, Viem যেভাবে করে সেভাবে একক হেক্সাডেসিমাল মান (`0x60A7`) হিসেবে নয়।

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

যদি কোনো ত্রুটি থাকে, তবে তা ধরুন এবং তারপর ক্লায়েন্টকে একটি সরলীকৃত সংস্করণ রিলে করুন।

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

ট্রানজ্যাকশন প্রয়োগ করুন। আমরা ইতিমধ্যেই Noir কোডে এটি করেছি, তবে সেখান থেকে ফলাফল বের করার চেয়ে এখানে আবার করা সহজ।

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

প্রাথমিক `Accounts` স্ট্রাকচার।

### পর্যায় 3 - ইথেরিয়াম স্মার্ট কন্ট্রাক্ট {#stage-3}

1. সার্ভার এবং ক্লায়েন্ট প্রসেসগুলো বন্ধ করুন।

2. স্মার্ট কন্ট্রাক্ট সহ ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার কাছে সমস্ত প্রয়োজনীয় মডিউল রয়েছে।

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. একটি আলাদা কমান্ড-লাইন উইন্ডোতে `anvil` চালান।

4. ভেরিফিকেশন কী এবং Solidity যাচাইকারী তৈরি করুন, তারপর যাচাইকারী কোডটি Solidity প্রজেক্টে কপি করুন।

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. স্মার্ট কন্ট্রাক্ট-এ যান এবং `anvil` ব্লকচেইন ব্যবহার করতে এনভায়রনমেন্ট ভেরিয়েবলগুলো সেট করুন।

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` ডিপ্লয় করুন এবং ঠিকানাটি একটি এনভায়রনমেন্ট ভেরিয়েবলে সংরক্ষণ করুন।

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` কন্ট্রাক্ট ডিপ্লয় করুন।

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` মানটি হলো `Accounts`-এর প্রাথমিক স্টেট-এর Pederson হ্যাশ। আপনি যদি `server/index.mjs`-এ এই প্রাথমিক স্টেট পরিবর্তন করেন, তবে আপনি শূন্য-জ্ঞান প্রমাণ দ্বারা রিপোর্ট করা প্রাথমিক হ্যাশ দেখতে একটি ট্রানজ্যাকশন চালাতে পারেন।

8. সার্ভার চালান।

   ```sh
   cd ../server
   npm run start
   ```

9. একটি ভিন্ন কমান্ড-লাইন উইন্ডোতে ক্লায়েন্ট চালান।

   ```sh
   cd client
   npm run dev
   ```

10. কিছু ট্রানজ্যাকশন চালান।

11. অনচেইন-এ স্টেট পরিবর্তিত হয়েছে কিনা তা যাচাই করতে, সার্ভার প্রসেসটি পুনরায় চালু করুন। দেখুন যে `ZkBank` আর ট্রানজ্যাকশন গ্রহণ করে না, কারণ ট্রানজ্যাকশনগুলোর আসল হ্যাশ মান অনচেইন-এ সংরক্ষিত হ্যাশ মান থেকে আলাদা।

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

এই ফাইলের পরিবর্তনগুলো মূলত আসল প্রমাণ তৈরি করা এবং এটি অনচেইন-এ জমা দেওয়ার সাথে সম্পর্কিত।

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

অনচেইন-এ পাঠানোর জন্য আসল প্রমাণ তৈরি করতে আমাদের [Barretenberg প্যাকেজ](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ব্যবহার করতে হবে। আমরা কমান্ড-লাইন ইন্টারফেস (`bb`) চালিয়ে অথবা [JavaScript লাইব্রেরি, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) ব্যবহার করে এই প্যাকেজটি ব্যবহার করতে পারি। নেটিভভাবে কোড চালানোর চেয়ে JavaScript লাইব্রেরি অনেক ধীর, তাই আমরা কমান্ড-লাইন ব্যবহার করতে এখানে [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ব্যবহার করি।

মনে রাখবেন যে আপনি যদি `bb.js` ব্যবহার করার সিদ্ধান্ত নেন, তবে আপনাকে এমন একটি সংস্করণ ব্যবহার করতে হবে যা আপনার ব্যবহৃত Noir সংস্করণের সাথে সামঞ্জস্যপূর্ণ। লেখার সময়, বর্তমান Noir সংস্করণ (1.0.0-beta.11) `bb.js` সংস্করণ 0.87 ব্যবহার করে।

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

এখানকার ঠিকানাটি হলো সেই ঠিকানা যা আপনি একটি ক্লিন `anvil` দিয়ে শুরু করলে এবং উপরের নির্দেশাবলী অনুসরণ করলে পান।

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

এই প্রাইভেট কী হলো `anvil`-এর ডিফল্ট প্রি-ফান্ডেড অ্যাকাউন্টগুলোর মধ্যে একটি। 

```js
const generateProof = async (witness, fileID) => {
```

`bb` এক্সিকিউটেবল ব্যবহার করে একটি প্রমাণ তৈরি করুন।

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

সাক্ষী-কে একটি ফাইলে লিখুন।

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

প্রকৃতপক্ষে প্রমাণ তৈরি করুন। এই ধাপটি পাবলিক ভেরিয়েবলগুলোর সাথে একটি ফাইলও তৈরি করে, তবে আমাদের সেটির প্রয়োজন নেই। আমরা ইতিমধ্যেই `noir.execute` থেকে সেই ভেরিয়েবলগুলো পেয়েছি।

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

প্রমাণটি হলো `Field` মানগুলোর একটি JSON অ্যারে, যার প্রতিটি একটি হেক্সাডেসিমাল মান হিসেবে উপস্থাপিত হয়। যাইহোক, আমাদের এটিকে ট্রানজ্যাকশন-এ একটি একক `bytes` মান হিসেবে পাঠাতে হবে, যা Viem একটি বড় হেক্সাডেসিমাল স্ট্রিং দ্বারা উপস্থাপন করে। এখানে আমরা সমস্ত মান যুক্ত করে, সমস্ত `0x` সরিয়ে এবং তারপর শেষে একটি যোগ করে বিন্যাসটি পরিবর্তন করি।

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

ক্লিনআপ করুন এবং প্রমাণটি রিটার্ন করুন।

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

পাবলিক ফিল্ডগুলোকে 32-বাইট মানগুলোর একটি অ্যারে হতে হবে। যাইহোক, যেহেতু আমাদের ট্রানজ্যাকশন হ্যাশ-কে দুটি `Field` মানের মধ্যে ভাগ করতে হয়েছিল, তাই এটি একটি 16-বাইট মান হিসেবে উপস্থিত হয়। এখানে আমরা শূন্য যোগ করি যাতে Viem বুঝতে পারে যে এটি আসলে 32 বাইট।

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

প্রতিটি ঠিকানা প্রতিটি নন্স শুধুমাত্র একবার ব্যবহার করে যাতে আমরা সাক্ষী ফাইল এবং আউটপুট ডিরেক্টরির জন্য একটি অনন্য আইডেন্টিফায়ার হিসেবে `fromAddress` এবং `nonce`-এর সংমিশ্রণ ব্যবহার করতে পারি।

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

চেইন-এ ট্রানজ্যাকশন পাঠান।

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

এটি হলো অনচেইন কোড যা ট্রানজ্যাকশন গ্রহণ করে।

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

অনচেইন কোডটিকে দুটি ভেরিয়েবলের ট্র্যাক রাখতে হবে: যাচাইকারী (একটি পৃথক কন্ট্রাক্ট যা `nargo` দ্বারা তৈরি করা হয়) এবং বর্তমান স্টেট হ্যাশ।

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

প্রতিবার স্টেট পরিবর্তিত হলে, আমরা একটি `TransactionProcessed` ইভেন্ট এমিট করি।

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

এই ফাংশনটি ট্রানজ্যাকশন প্রসেস করে। এটি প্রমাণ (একটি `bytes` হিসেবে) এবং পাবলিক ইনপুটগুলো (একটি `bytes32` অ্যারে হিসেবে) পায়, সেই বিন্যাসে যা যাচাইকারী-এর প্রয়োজন (অনচেইন প্রসেসিং এবং সেই কারণে গ্যাস খরচ কমানোর জন্য)।

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

শূন্য-জ্ঞান প্রমাণ-কে এমন হতে হবে যে ট্রানজ্যাকশনটি আমাদের বর্তমান হ্যাশ থেকে একটি নতুন হ্যাশে পরিবর্তিত হয়।

```solidity
        myVerifier.verify(_proof, _publicFields);
```

শূন্য-জ্ঞান প্রমাণ যাচাই করতে যাচাইকারী কন্ট্রাক্ট কল করুন। শূন্য-জ্ঞান প্রমাণ ভুল হলে এই ধাপটি ট্রানজ্যাকশন রিভার্ট করে।

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

যদি সবকিছু ঠিক থাকে, তবে স্টেট হ্যাশ-কে নতুন মানে আপডেট করুন এবং একটি `TransactionProcessed` ইভেন্ট এমিট করুন।

## কেন্দ্রীভূত উপাদানের অপব্যবহার {#abuses}

তথ্য নিরাপত্তার তিনটি বৈশিষ্ট্য রয়েছে:

- _গোপনীয়তা_, ব্যবহারকারীরা এমন তথ্য পড়তে পারবেন না যা পড়ার জন্য তারা অনুমোদিত নন।
- _অখণ্ডতা_, অনুমোদিত ব্যবহারকারী ছাড়া এবং অনুমোদিত পদ্ধতি ছাড়া তথ্য পরিবর্তন করা যাবে না।
- _প্রাপ্যতা_, অনুমোদিত ব্যবহারকারীরা সিস্টেমটি ব্যবহার করতে পারবেন।

এই সিস্টেমে, শূন্য-জ্ঞান প্রমাণ-এর মাধ্যমে অখণ্ডতা প্রদান করা হয়। প্রাপ্যতা নিশ্চিত করা অনেক বেশি কঠিন, এবং গোপনীয়তা অসম্ভব, কারণ ব্যাংককে প্রতিটি অ্যাকাউন্টের ব্যালেন্স এবং সমস্ত ট্রানজ্যাকশন জানতে হয়। কোনো সত্তার কাছে তথ্য থাকলে তাকে সেই তথ্য শেয়ার করা থেকে বিরত রাখার কোনো উপায় নেই।

[স্টিলথ ঠিকানা](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ব্যবহার করে একটি সত্যিকারের গোপনীয় ব্যাংক তৈরি করা সম্ভব হতে পারে, তবে এটি এই নিবন্ধের আওতার বাইরে।

### ভুল তথ্য {#false-info}

সার্ভার যেভাবে অখণ্ডতা লঙ্ঘন করতে পারে তার একটি উপায় হলো [ডেটা অনুরোধ করা হলে](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) ভুল তথ্য প্রদান করা।

এটি সমাধান করার জন্য, আমরা একটি দ্বিতীয় Noir প্রোগ্রাম লিখতে পারি যা অ্যাকাউন্টগুলোকে একটি প্রাইভেট ইনপুট হিসেবে গ্রহণ করে এবং যে ঠিকানার জন্য তথ্যের অনুরোধ করা হয়েছে তাকে একটি পাবলিক ইনপুট হিসেবে গ্রহণ করে। এর আউটপুট হলো সেই ঠিকানার ব্যালেন্স এবং নন্স, এবং অ্যাকাউন্টগুলোর হ্যাশ।

অবশ্যই, এই প্রমাণটি অনচেইন যাচাই করা যাবে না, কারণ আমরা নন্স এবং ব্যালেন্স অনচেইন পোস্ট করতে চাই না। তবে, এটি ব্রাউজারে চলা ক্লায়েন্ট কোড দ্বারা যাচাই করা যেতে পারে।

### জোরপূর্বক ট্রানজ্যাকশন {#forced-txns}

L2-তে প্রাপ্যতা নিশ্চিত করার এবং সেন্সরশিপ প্রতিরোধের সাধারণ প্রক্রিয়া হলো [জোরপূর্বক ট্রানজ্যাকশন](https://docs.optimism.io/stack/transactions/forced-transaction)। কিন্তু জোরপূর্বক ট্রানজ্যাকশন শূন্য-জ্ঞান প্রমাণ-এর সাথে যুক্ত হয় না। সার্ভার হলো একমাত্র সত্তা যা ট্রানজ্যাকশন যাচাই করতে পারে।

আমরা `smart-contracts/src/ZkBank.sol` পরিবর্তন করে জোরপূর্বক ট্রানজ্যাকশন গ্রহণ করতে পারি এবং সেগুলো প্রক্রিয়া না হওয়া পর্যন্ত সার্ভারকে স্টেট পরিবর্তন করা থেকে বিরত রাখতে পারি। তবে, এটি আমাদেরকে একটি সাধারণ ডিনায়াল-অফ-সার্ভিস (denial-of-service) আক্রমণের মুখে ফেলে দেয়। যদি একটি জোরপূর্বক ট্রানজ্যাকশন অবৈধ হয় এবং তাই প্রক্রিয়া করা অসম্ভব হয়, তাহলে কী হবে?

এর সমাধান হলো একটি শূন্য-জ্ঞান প্রমাণ থাকা যা প্রমাণ করে যে একটি জোরপূর্বক ট্রানজ্যাকশন অবৈধ। এটি সার্ভারকে তিনটি বিকল্প দেয়:

- জোরপূর্বক ট্রানজ্যাকশনটি প্রক্রিয়া করা, এবং এটি প্রক্রিয়া করা হয়েছে তার একটি শূন্য-জ্ঞান প্রমাণ এবং নতুন স্টেট হ্যাশ প্রদান করা।
- জোরপূর্বক ট্রানজ্যাকশনটি প্রত্যাখ্যান করা, এবং কন্ট্রাক্ট-এ একটি শূন্য-জ্ঞান প্রমাণ প্রদান করা যে ট্রানজ্যাকশনটি অবৈধ (অজানা ঠিকানা, ভুল নন্স, বা অপর্যাপ্ত ব্যালেন্স)।
- জোরপূর্বক ট্রানজ্যাকশনটি উপেক্ষা করা। সার্ভারকে ট্রানজ্যাকশনটি প্রক্রিয়া করতে বাধ্য করার কোনো উপায় নেই, তবে এর মানে হলো পুরো সিস্টেমটি অপ্রাপ্য হয়ে যাবে।

#### প্রাপ্যতা বন্ড {#avail-bonds}

বাস্তব জীবনের বাস্তবায়নে, সার্ভার চালু রাখার জন্য সম্ভবত কোনো ধরনের লাভের উদ্দেশ্য থাকবে। আমরা সার্ভারকে একটি প্রাপ্যতা বন্ড পোস্ট করতে বলে এই প্রণোদনাকে আরও শক্তিশালী করতে পারি, যা যে কেউ পোড়াতে পারে যদি একটি নির্দিষ্ট সময়ের মধ্যে কোনো জোরপূর্বক ট্রানজ্যাকশন প্রক্রিয়া করা না হয়।

### খারাপ Noir কোড {#bad-noir-code}

সাধারণত, একটি স্মার্ট কন্ট্রাক্ট-এর ওপর মানুষের আস্থা অর্জনের জন্য আমরা সোর্স কোডটি একটি [ব্লক এক্সপ্লোরার](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract)-এ আপলোড করি। তবে, শূন্য-জ্ঞান প্রমাণ-এর ক্ষেত্রে এটি যথেষ্ট নয়।

`Verifier.sol`-এ যাচাইকরণ কী (verification key) রয়েছে, যা Noir প্রোগ্রামের একটি ফাংশন। তবে, সেই কী আমাদের বলে না যে Noir প্রোগ্রামটি কী ছিল। প্রকৃতপক্ষে একটি বিশ্বস্ত সমাধান পেতে, আপনাকে Noir প্রোগ্রামটি (এবং যে সংস্করণটি এটি তৈরি করেছে) আপলোড করতে হবে। অন্যথায়, শূন্য-জ্ঞান প্রমাণ একটি ভিন্ন প্রোগ্রামকে প্রতিফলিত করতে পারে, যার মধ্যে একটি ব্যাক ডোর (back door) থাকতে পারে।

যতক্ষণ না ব্লক এক্সপ্লোরারগুলো আমাদের Noir প্রোগ্রাম আপলোড এবং যাচাই করার অনুমতি দেয়, ততক্ষণ আপনার এটি নিজেই করা উচিত (বিশেষত [IPFS](/developers/tutorials/ipfs-decentralized-ui/)-এ)। তাহলে অভিজ্ঞ ব্যবহারকারীরা সোর্স কোড ডাউনলোড করতে পারবেন, এটি নিজেরাই কম্পাইল করতে পারবেন, `Verifier.sol` তৈরি করতে পারবেন এবং যাচাই করতে পারবেন যে এটি অনচেইন থাকা কোডের হুবহু অনুরূপ।

## উপসংহার {#conclusion}

প্লাজমা-ধরনের অ্যাপ্লিকেশনগুলোতে তথ্য স্টোরেজ হিসেবে একটি কেন্দ্রীভূত উপাদানের প্রয়োজন হয়। এটি সম্ভাব্য দুর্বলতা তৈরি করে কিন্তু, এর বিনিময়ে, আমাদের এমনভাবে গোপনীয়তা রক্ষা করার সুযোগ দেয় যা ব্লকচেইনে নিজে থেকে সম্ভব নয়। শূন্য-জ্ঞান প্রমাণ ব্যবহার করে আমরা অখণ্ডতা নিশ্চিত করতে পারি এবং যে-ই কেন্দ্রীভূত উপাদানটি পরিচালনা করছে তার জন্য এর প্রাপ্যতা বজায় রাখা সম্ভবত অর্থনৈতিকভাবে লাভজনক করে তুলতে পারি।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

## কৃতজ্ঞতা স্বীকার {#acknowledgements}

- জশ ক্রাইটস এই নিবন্ধের একটি খসড়া পড়েছেন এবং একটি জটিল Noir সমস্যা সমাধানে আমাকে সাহায্য করেছেন।

অবশিষ্ট যেকোনো ভুলের দায়ভার আমার।