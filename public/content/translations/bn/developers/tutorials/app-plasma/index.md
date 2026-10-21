---
title: "এমন একটি অ্যাপ-নির্দিষ্ট প্লাজমা লিখুন যা গোপনীয়তা বজায় রাখে"
description: "এই টিউটোরিয়ালে, আমরা জমা দেওয়ার জন্য একটি আধা-গোপন ব্যাংক তৈরি করি। ব্যাংকটি একটি কেন্দ্রীভূত উপাদান; এটি প্রতিটি ব্যবহারকারীর অ্যাকাউন্টের ব্যালেন্স জানে। তবে এই তথ্যটি অনচেইন সংরক্ষণ করা হয় না। এর পরিবর্তে, ব্যাংক স্টেটের একটি হ্যাশ প্রকাশ করে। প্রতিবার কোনো ট্রানজ্যাকশন হওয়ার সময়, ব্যাংক নতুন হ্যাশ প্রকাশ করে, সাথে একটি শূন্য-জ্ঞান প্রমাণ দেয় যা প্রমাণ করে যে তার কাছে একটি স্বাক্ষরিত ট্রানজ্যাকশন রয়েছে যা হ্যাশ স্টেটটিকে নতুনে পরিবর্তন করে। এই টিউটোরিয়ালটি পড়ার পরে, আপনি কেবল শূন্য-জ্ঞান প্রমাণ কীভাবে ব্যবহার করতে হয় তা নয়, বরং কেন আপনি সেগুলি ব্যবহার করবেন এবং কীভাবে নিরাপদে তা করবেন তা বুঝতে পারবেন।"
author: "ওরি পোমেরান্টজ"
tags: ["জিরো-নলেজ", "সার্ভার", "অফচেইন", "গোপনীয়তা"]
skill: advanced
breadcrumb: "অ্যাপ-নির্দিষ্ট প্লাজমা"
lang: bn
published: 2025-10-15
---

## ভূমিকা {#introduction}

[রোলআপ](/developers/docs/scaling/zk-rollups/) এর বিপরীতে, [প্লাজমা](/developers/docs/scaling/plasma) ইন্টিগ্রিটির (অখণ্ডতা) জন্য ইথেরিয়াম মেইননেট ব্যবহার করে, তবে প্রাপ্যতার (অ্যাভেইলেবিলিটি) জন্য নয়। এই নিবন্ধে, আমরা এমন একটি অ্যাপ্লিকেশন লিখব যা প্লাজমার মতো আচরণ করে, যেখানে ইথেরিয়াম ইন্টিগ্রিটির গ্যারান্টি দেয় (কোনো অননুমোদিত পরিবর্তন নয়) তবে প্রাপ্যতার নয় (একটি কেন্দ্রীভূত উপাদান নষ্ট হয়ে পুরো সিস্টেমটিকে নিষ্ক্রিয় করতে পারে)।

আমরা এখানে যে অ্যাপ্লিকেশনটি লিখছি তা হলো একটি গোপনীয়তা-সংরক্ষক ব্যাংক। বিভিন্ন ঠিকানার ব্যালেন্স সহ অ্যাকাউন্ট থাকে এবং তারা অন্যান্য অ্যাকাউন্টে অর্থ (ETH) পাঠাতে পারে। ব্যাংকটি স্টেট (অ্যাকাউন্ট এবং তাদের ব্যালেন্স) ও ট্রানজ্যাকশনগুলোর হ্যাশ পোস্ট করে, তবে প্রকৃত ব্যালেন্সগুলি অফচেইন রাখে যাতে সেগুলো গোপন থাকতে পারে।

## ডিজাইন {#design}

এটি কোনো প্রডাকশন-রেডি সিস্টেম নয়, বরং একটি শেখার সরঞ্জাম। সেই হিসাবে, এটি বেশ কয়েকটি সহজীকৃত অনুমানের ভিত্তিতে লেখা হয়েছে।

- নির্দিষ্ট অ্যাকাউন্ট পুল। এখানে নির্দিষ্ট সংখ্যক অ্যাকাউন্ট রয়েছে এবং প্রতিটি অ্যাকাউন্ট একটি পূর্বনির্ধারিত ঠিকানার অন্তর্গত। এটি সিস্টেমটিকে অনেক সহজ করে তোলে কারণ শূন্য-জ্ঞান প্রমাণে পরিবর্তনশীল আকারের ডেটা স্ট্রাকচার পরিচালনা করা কঠিন। একটি প্রডাকশন-রেডি সিস্টেমের জন্য, আমরা স্টেট হ্যাশ হিসেবে [মার্কেল রুট](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) ব্যবহার করতে পারি এবং প্রয়োজনীয় ব্যালেন্সের জন্য মার্কেল প্রমাণ প্রদান করতে পারি।

- মেমরি স্টোরেজ। একটি প্রডাকশন সিস্টেমে, রিস্টার্টের ক্ষেত্রে সেগুলি সংরক্ষণ করার জন্য আমাদের সমস্ত অ্যাকাউন্টের ব্যালেন্স ডিস্কে লিখতে হবে। এখানে, তথ্য যদি কেবল হারিয়ে যায় তবে কোনো সমস্যা নেই।

- কেবল হস্তান্তর (Transfers)। একটি প্রডাকশন সিস্টেমে ব্যাংকে সম্পদ জমা করার এবং তা উত্তোলন করার একটি উপায় প্রয়োজন হবে। কিন্তু এখানকার উদ্দেশ্য হলো শুধুমাত্র ধারণাটি তুলে ধরা, তাই এই ব্যাংকটি শুধুমাত্র হস্তান্তরের মধ্যে সীমাবদ্ধ।

### শূন্য-জ্ঞান প্রমাণ (Zero-knowledge proofs) {#zero-knowledge-proofs}

মৌলিক স্তরে, একটি শূন্য-জ্ঞান প্রমাণ দেখায় যে প্রমাণকারী কিছু ডেটা _Data<sub>private</sub>_ জানে যার ফলে কিছু পাবলিক ডেটা _Data<sub>public</sub>_ এবং _Data<sub>private</sub>_ এর মধ্যে একটি সম্পর্ক (_Relationship_) থাকে। যাচাইকারী _Relationship_ এবং _Data<sub>public</sub>_ জানে।

গোপনীয়তা বজায় রাখতে, আমাদের স্টেট এবং ট্রানজ্যাকশনগুলো ব্যক্তিগত রাখতে হবে। কিন্তু ইন্টিগ্রিটি নিশ্চিত করতে, আমাদের স্টেটের [ক্রিপ্টোগ্রাফিক হ্যাশ](https://en.wikipedia.org/wiki/Cryptographic_hash_function) সর্বজনীন (পাবলিক) করতে হবে। যারা ট্রানজ্যাকশন জমা দেয় তাদের প্রমাণ করতে যে ট্রানজ্যাকশনগুলি সত্যিই ঘটেছে, আমাদের ট্রানজ্যাকশন হ্যাশও পোস্ট করতে হবে।

বেশিরভাগ ক্ষেত্রে, _Data<sub>private</sub>_ হলো শূন্য-জ্ঞান প্রমাণ প্রোগ্রামের ইনপুট এবং _Data<sub>public</sub>_ হলো আউটপুট।

_Data<sub>private</sub>_ এর ক্ষেত্রগুলি (fields) হলো:

- _State<sub>n</sub>_, পুরানো স্টেট
- _State<sub>n+1</sub>_, নতুন স্টেট
- _Transaction_, এমন একটি ট্রানজ্যাকশন যা পুরানো স্টেট থেকে নতুন স্টেটে পরিবর্তন করে। এই ট্রানজ্যাকশনে নিচের ক্ষেত্রগুলো অন্তর্ভুক্ত থাকতে হবে:
  - _গন্তব্য ঠিকানা (Destination address)_ যা হস্তান্তর গ্রহণ করে
  - হস্তান্তরিত _পরিমাণ (Amount)_
  - _নন্স (Nonce)_ যা নিশ্চিত করে প্রতিটি ট্রানজ্যাকশন কেবল একবার প্রসেস করা যাবে।
    উৎস ঠিকানাটি ট্রানজ্যাকশনে থাকার দরকার নেই, কারণ এটি স্বাক্ষর থেকে উদ্ধার করা যায়।
- _স্বাক্ষর (Signature)_, একটি স্বাক্ষর যা ট্রানজ্যাকশনটি সম্পাদন করার জন্য অনুমোদিত। আমাদের ক্ষেত্রে, ট্রানজ্যাকশনটি সম্পাদন করার একমাত্র অনুমোদিত ঠিকানা হলো উৎস ঠিকানা। যেহেতু আমাদের জিরো-নলেজ সিস্টেমটি এভাবে কাজ করে, তাই আমাদের ইথেরিয়াম স্বাক্ষরের পাশাপাশি অ্যাকাউন্টের পাবলিক কী-ও প্রয়োজন।

_Data<sub>public</sub>_ এর ক্ষেত্রগুলি হলো:

- _Hash(State<sub>n</sub>)_ পুরানো স্টেটের হ্যাশ
- _Hash(State<sub>n+1</sub>)_ নতুন স্টেটের হ্যাশ
- _Hash(Transaction)_ সেই ট্রানজ্যাকশনের হ্যাশ যা স্টেটকে _State<sub>n</sub>_ থেকে _State<sub>n+1</sub>_ এ পরিবর্তন করে।

সম্পর্কটি (Relationship) বেশ কয়েকটি শর্ত পরীক্ষা করে:

- পাবলিক হ্যাশগুলো সত্যিই প্রাইভেট ক্ষেত্রগুলোর সঠিক হ্যাশ।
- ট্রানজ্যাকশনটি পুরানো স্টেটে প্রয়োগ করা হলে, নতুন স্টেট পাওয়া যায়।
- স্বাক্ষরটি ট্রানজ্যাকশনের উৎস ঠিকানা থেকে আসে।

ক্রিপ্টোগ্রাফিক হ্যাশ ফাংশনের বৈশিষ্ট্যগুলির কারণে, এই শর্তগুলো প্রমাণ করাই ইন্টিগ্রিটি নিশ্চিত করার জন্য যথেষ্ট।

### ডেটা স্ট্রাকচার {#data-structures}

প্রাথমিক ডেটা স্ট্রাকচার হলো সার্ভারের কাছে থাকা স্টেট। প্রতিটি অ্যাকাউন্টের জন্য, সার্ভার অ্যাকাউন্টের ব্যালেন্স এবং একটি [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce) ট্র্যাক রাখে, যা [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack) প্রতিরোধ করতে ব্যবহৃত হয়।

### উপাদানসমূহ (Components) {#components}

এই সিস্টেমের দুটি উপাদান প্রয়োজন:

- _সার্ভার (server)_, যা ট্রানজ্যাকশন গ্রহণ করে, সেগুলোকে প্রসেস করে এবং শূন্য-জ্ঞান প্রমাণের সাথে চেইনে হ্যাশ পোস্ট করে।
- একটি _স্মার্ট কন্ট্রাক্ট (smart contract)_, যা হ্যাশগুলি সংরক্ষণ করে এবং স্টেট ট্রানজিশনগুলি বৈধ তা নিশ্চিত করতে শূন্য-জ্ঞান প্রমাণগুলি যাচাই করে।

### ডেটা এবং কন্ট্রোল ফ্লো {#flows}

এক অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে হস্তান্তরের জন্য বিভিন্ন উপাদান যেভাবে যোগাযোগ করে তা নিচে দেওয়া হলো।

1. একটি ওয়েব ব্রাউজার একটি স্বাক্ষরিত ট্রানজ্যাকশন জমা দেয়, যেখানে স্বাক্ষরকারীর অ্যাকাউন্ট থেকে অন্য একটি অ্যাকাউন্টে হস্তান্তরের জন্য অনুরোধ করা হয়।

2. সার্ভার যাচাই করে যে ট্রানজ্যাকশনটি বৈধ:

   - ব্যাংকে স্বাক্ষরকারীর পর্যাপ্ত ব্যালেন্স সহ একটি অ্যাকাউন্ট আছে।
   - ব্যাংকে প্রাপকের একটি অ্যাকাউন্ট আছে।

3. সার্ভার স্বাক্ষরকারীর ব্যালেন্স থেকে হস্তান্তরিত পরিমাণটি বিয়োগ করে এবং এটি প্রাপকের ব্যালেন্সের সাথে যোগ করে নতুন স্টেট গণনা করে।

4. সার্ভার একটি শূন্য-জ্ঞান প্রমাণ গণনা করে যা প্রমাণ করে যে স্টেটের পরিবর্তনটি বৈধ।

5. সার্ভার ইথেরিয়ামে একটি ট্রানজ্যাকশন জমা দেয় যার মধ্যে থাকে:

   - নতুন স্টেট হ্যাশ
   - ট্রানজ্যাকশন হ্যাশ (যাতে ট্রানজ্যাকশন প্রেরক জানতে পারে এটি প্রসেস করা হয়েছে)
   - শূন্য-জ্ঞান প্রমাণ, যা প্রমাণ করে নতুন স্টেটে রূপান্তরটি বৈধ

6. স্মার্ট কন্ট্রাক্ট শূন্য-জ্ঞান প্রমাণটি যাচাই করে।

7. যদি শূন্য-জ্ঞান প্রমাণটি যাচাইয়ে সঠিক প্রমাণিত হয়, তবে স্মার্ট কন্ট্রাক্ট এই কাজগুলো করে:
   - বর্তমান স্টেট হ্যাশটিকে নতুন স্টেট হ্যাশে আপডেট করে
   - নতুন স্টেট হ্যাশ এবং ট্রানজ্যাকশন হ্যাশ সহ একটি লগ এন্ট্রি নির্গত (emit) করে

### টুলস {#tools}

ক্লায়েন্ট-সাইড কোডের জন্য, আমরা [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) এবং [Wagmi](https://wagmi.sh/) ব্যবহার করতে যাচ্ছি। এগুলো ইন্ডাস্ট্রি-স্ট্যান্ডার্ড টুলস; আপনি যদি এগুলোর সাথে পরিচিত না হন, তবে আপনি [এই টিউটোরিয়ালটি](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) ব্যবহার করতে পারেন।

সার্ভারের বেশিরভাগ অংশ [Node](https://nodejs.org/en) ব্যবহার করে JavaScript-এ লেখা হয়েছে। জিরো-নলেজ অংশটি [Noir](https://noir-lang.org/)-এ লেখা। আমাদের `1.0.0-beta.10` ভার্সনটি প্রয়োজন, তাই [নির্দেশনা অনুযায়ী Noir ইনস্টল করার পর](https://noir-lang.org/docs/getting_started/quick_start), এটি রান করুন:

```
noirup -v 1.0.0-beta.10
```

আমরা যে ব্লকচেইনটি ব্যবহার করি তা হলো `anvil`, একটি লোকাল টেস্টিং ব্লকচেইন যা [Foundry](https://getfoundry.sh/introduction/installation) এর অংশ।

## বাস্তবায়ন {#implementation}

যেহেতু এটি একটি জটিল সিস্টেম, আমরা এটি ধাপে ধাপে বাস্তবায়ন করব।

### পর্যায় 1 - ম্যানুয়াল জিরো-নলেজ {#stage-1}

প্রথম পর্যায়ের জন্য, আমরা ব্রাউজারে একটি ট্রানজ্যাকশনে স্বাক্ষর করব এবং তারপরে শূন্য-জ্ঞান প্রমাণে ম্যানুয়ালি তথ্য সরবরাহ করব। জিরো-নলেজ কোডটি সেই তথ্যগুলো `server/noir/Prover.toml` ফাইলে পাওয়ার আশা করে (এখানে [নথিভুক্ত](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1))।

এটি কার্যকর অবস্থায় দেখতে:

1. নিশ্চিত করুন যে আপনার [Node](https://nodejs.org/en/download) এবং [Noir](https://noir-lang.org/docs/installation) ইনস্টল করা আছে। বিশেষত, এগুলোকে একটি UNIX সিস্টেমে ইনস্টল করুন যেমন macOS, Linux বা [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)।

2. স্টেজ 1 (পর্যায় 1) কোডটি ডাউনলোড করুন এবং ক্লায়েন্ট কোডটি পরিবেশন করতে ওয়েব সার্ভার চালু করুন।

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   এখানে আপনার ওয়েব সার্ভারের প্রয়োজন হওয়ার কারণ হলো, নির্দিষ্ট ধরণের জালিয়াতি রোধ করতে মেটামাস্ক এর মতো অনেক ওয়ালেট সরাসরি ডিস্ক থেকে সার্ভ করা ফাইল গ্রহণ করে না।

3. একটি ওয়ালেট সহ ব্রাউজার খুলুন।

4. ওয়ালেটে, একটি নতুন পাসফ্রেজ (passphrase) লিখুন। মনে রাখবেন যে এটি আপনার বিদ্যমান পাসফ্রেজটি মুছে ফেলবে, তাই _নিশ্চিত করুন আপনার কাছে একটি ব্যাকআপ রয়েছে_।

   পাসফ্রেজটি হলো `test test test test test test test test test test test junk`, যা anvil এর ডিফল্ট টেস্টিং পাসফ্রেজ।

5. [ক্লায়েন্ট-সাইড কোড](http://localhost:5173/)-এ ব্রাউজ করুন।

6. ওয়ালেটে কানেক্ট করুন এবং আপনার গন্তব্য অ্যাকাউন্ট ও পরিমাণ নির্বাচন করুন।

7. **Sign**-এ ক্লিক করুন এবং ট্রানজ্যাকশনে স্বাক্ষর করুন।

8. **Prover.toml** শিরোনামের নিচে, আপনি কিছু টেক্সট পাবেন। `server/noir/Prover.toml` ফাইলটিকে সেই টেক্সট দিয়ে প্রতিস্থাপন করুন।

9. শূন্য-জ্ঞান প্রমাণটি এক্সিকিউট (চালু) করুন।

   ```sh
   cd ../server/noir
   nargo execute
   ```

   আউটপুটটি অনেকটা এর মতো হওয়া উচিত

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. বার্তাটি সঠিকভাবে হ্যাশ করা হয়েছে কিনা তা দেখতে ওয়েব ব্রাউজারে থাকা হ্যাশের সাথে শেষ দুটি মান তুলনা করুন।

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) Noir দ্বারা প্রত্যাশিত তথ্য ফর্ম্যাটটি দেখায়।

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

বার্তাটি টেক্সট ফর্ম্যাটে রয়েছে, যা ব্যবহারকারীর পক্ষে বোঝা সহজ করে তোলে (স্বাক্ষর করার সময় যা প্রয়োজনীয়) এবং Noir কোডের পক্ষে পার্স (parse) করা সহজ হয়। পরিমাণটি ফিনি-তে উল্লেখ করা হয়েছে যাতে একদিকে ভগ্নাংশের হস্তান্তর সক্ষম হয় এবং অন্যদিকে তা সহজেই পঠনযোগ্য হয়। শেষ সংখ্যাটি হলো [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce)।

স্ট্রিংটি 100 ক্যারেক্টার দীর্ঘ। শূন্য-জ্ঞান প্রমাণগুলি পরিবর্তনশীল-আকারের (variable-sized) ডেটা ভালোভাবে পরিচালনা করতে পারে না, তাই প্রায়ই ডেটাকে প্যাড (pad) করার প্রয়োজন হয়।

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

এটি স্ট্রাকচারের একটি অ্যারে নির্দিষ্ট করার উপায়। প্রতিটি এন্ট্রির জন্য, আমরা ঠিকানা, ব্যালেন্স (মিলি-ইটিএইচ বা [ফিনি](https://cryptovalleyjournal.com/glossary/finney/)-তে) এবং পরবর্তী নন্সের মান নির্দিষ্ট করি।

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) ক্লায়েন্ট-সাইড প্রসেসিং বাস্তবায়ন করে এবং `server/noir/Prover.toml` ফাইলটি তৈরি করে (যাতে জিরো-নলেজ প্যারামিটারগুলি অন্তর্ভুক্ত থাকে)।

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

এগুলো হলো অ্যাকাউন্টের ঠিকানা, যা `test ... test junk` পাসফ্রেজ দ্বারা তৈরি করা ঠিকানা। আপনি যদি নিজের ঠিকানাগুলি ব্যবহার করতে চান, তবে কেবল এই সংজ্ঞাটি (definition) পরিবর্তন করুন।

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

এই [Wagmi হুকগুলো (hooks)](https://wagmi.sh/react/api/hooks) আমাদের [viem](https://viem.sh/) লাইব্রেরি এবং ওয়ালেটটি অ্যাক্সেস করার সুবিধা দেয়।

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

এটি হলো বার্তা, যা স্পেস দিয়ে প্যাড করা হয়েছে। প্রতিবার যখন [`useState`](https://react.dev/reference/react/useState) ভ্যারিয়েবলগুলোর কোনো একটি পরিবর্তিত হয়, তখন কম্পোনেন্টটি আবার আঁকা (redrawn) হয় এবং `message` আপডেট হয়।

```tsx
  const sign = async () => {
```

যখন ব্যবহারকারী **Sign** বাটনে ক্লিক করেন তখন এই ফাংশনটি কল করা হয়। বার্তাটি স্বয়ংক্রিয়ভাবে আপডেট হয়, কিন্তু স্বাক্ষরের জন্য ওয়ালেটে ব্যবহারকারীর অনুমোদনের প্রয়োজন হয়, এবং প্রয়োজন না হওয়া পর্যন্ত আমরা এটি চাইতে চাই না।

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

ওয়ালেটকে [বার্তায় স্বাক্ষর করতে](https://viem.sh/docs/accounts/local/signMessage) বলুন। 

```tsx
    const hash = hashMessage(message)
```

বার্তার হ্যাশ পান। ডিবাগিং এর জন্য (Noir কোডের) এটি ব্যবহারকারীকে প্রদান করা সহায়ক। 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[পাবলিক কী পান](https://viem.sh/docs/utilities/recoverPublicKey)। এটি [Noir এর `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) ফাংশনের জন্য প্রয়োজনীয়।

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

স্টেট ভ্যারিয়েবলগুলো সেট করুন। এটি করলে কম্পোনেন্টটি রিড্র হয় (`sign` ফাংশন থেকে বের হওয়ার পরে) এবং ব্যবহারকারীকে আপডেট করা মানগুলো দেখায়।

```tsx
    let proverToml = `
```

`Prover.toml` এর টেক্সট।

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem আমাদেরকে 65-বাইট হেক্সাডেসিমাল স্ট্রিং হিসেবে পাবলিক কী প্রদান করে। প্রথম বাইটটি হলো `0x04`, একটি ভার্সন মার্কার। এরপর পাবলিক কী-এর `x` এর জন্য 32 বাইট এবং তারপর পাবলিক কী-এর `y` এর জন্য 32 বাইট থাকে।

তবে, Noir এই তথ্যটি দুটি বাইট অ্যারে হিসেবে পাওয়ার আশা করে, একটি `x` এর জন্য এবং একটি `y` এর জন্য। এটি জিরো-নলেজ প্রমাণের অংশ হিসেবে পার্স করার চেয়ে ক্লায়েন্টের উপর এখানে পার্স করা সহজ।

লক্ষ্য রাখবেন যে, সাধারণত জিরো-নলেজ সিস্টেমে এটি ভালো প্র্যাকটিস হিসেবে বিবেচিত। জিরো-নলেজ প্রমাণের ভেতরের কোড অনেক ব্যয়বহুল, তাই যে কোনো প্রসেসিং যা জিরো-নলেজ প্রমাণের বাইরে করা যায়, তা জিরো-নলেজ প্রমাণের বাইরেই করা _উচিত_।

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

স্বাক্ষরটিও 65-বাইট হেক্সাডেসিমাল স্ট্রিং হিসেবে প্রদান করা হয়। তবে, শেষ বাইটটি কেবল পাবলিক কী রিকভার করার জন্যই প্রয়োজনীয়। যেহেতু পাবলিক কী আগে থেকেই Noir কোডে দেওয়া থাকবে, তাই স্বাক্ষর যাচাই করার জন্য আমাদের এর প্রয়োজন নেই, এবং Noir কোডেও এটি দরকার হয় না।

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

এটি কম্পোনেন্টের HTML (আরও নিখুঁতভাবে বললে, [JSX](https://react.dev/learn/writing-markup-with-jsx)) ফর্ম্যাট।

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[এই ফাইলটি](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) হলো আসল জিরো-নলেজ কোড।

```
use std::hash::pedersen_hash;
```

[Noir স্ট্যান্ডার্ড লাইব্রেরি](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash)-র সাথে [পেডারসন (Pedersen) হ্যাশ](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) সরবরাহ করা হয়। শূন্য-জ্ঞান প্রমাণগুলি সাধারণত এই হ্যাশ ফাংশনটি ব্যবহার করে। স্ট্যান্ডার্ড হ্যাশ ফাংশনগুলোর তুলনায় এটি [অ্যারিথমেটিক সার্কিট (arithmetic circuits)](https://rareskills.io/post/arithmetic-circuit)-এর ভেতরে গণনা করা অনেক সহজ।

```
use keccak256::keccak256;
use dep::ecrecover;
```

এই দুটি ফাংশন হলো এক্সটার্নাল লাইব্রেরি, যা [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) এ সংজ্ঞায়িত করা হয়েছে। এগুলো ঠিক সেগুলোর নামের মতোই কাজ করে, একটি ফাংশন যা [keccak256 হ্যাশ](https://emn178.github.io/online-tools/keccak_256.html) গণনা করে এবং একটি ফাংশন যা ইথেরিয়াম স্বাক্ষর যাচাই করে এবং স্বাক্ষরকারীর ইথেরিয়াম ঠিকানাটি রিকভার করে।

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir [Rust](https://www.rust-lang.org/) দ্বারা অনুপ্রাণিত। ডিফল্টরূপে ভ্যারিয়েবলগুলো হলো ধ্রুবক (constants)। এভাবেই আমরা গ্লোবাল কনফিগারেশন ধ্রুবক সংজ্ঞায়িত করি। নির্দিষ্টভাবে, `ACCOUNT_NUMBER` হলো আমাদের সংরক্ষণ করা অ্যাকাউন্টের সংখ্যা।

`u<number>` নামের ডেটা টাইপগুলো হলো সেই নির্দিষ্ট সংখ্যক বিটের আনসাইনড (unsigned) মান। একমাত্র সমর্থিত টাইপগুলো হলো `u8`, `u16`, `u32`, `u64` এবং `u128`।

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

অ্যাকাউন্টের পেডারসন হ্যাশের জন্য এই ভ্যারিয়েবলটি ব্যবহৃত হয়, যা নিচে ব্যাখ্যা করা হয়েছে।

```
global MESSAGE_LENGTH : u32 = 100;
```

উপরে ব্যাখ্যা করা অনুসারে, বার্তার দৈর্ঘ্য নির্দিষ্ট থাকে। এটি এখানে নির্দিষ্ট করা হয়েছে।

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 স্বাক্ষরের](https://eips.ethereum.org/EIPS/eip-191) জন্য একটি বাফারের প্রয়োজন হয় যেখানে প্রথমে 26-বাইটের প্রিফিক্স থাকে, এরপর ASCII তে বার্তার দৈর্ঘ্য থাকে এবং সবশেষে আসল বার্তাটি থাকে।

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

একটি অ্যাকাউন্ট সম্পর্কে আমরা যে তথ্য সংরক্ষণ করি। [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) হলো একটি সংখ্যা, সাধারণত 253 বিট পর্যন্ত, যা শূন্য-জ্ঞান প্রমাণ প্রয়োগকারী [অ্যারিথমেটিক সার্কিটে](https://rareskills.io/post/arithmetic-circuit) সরাসরি ব্যবহার করা যেতে পারে। এখানে আমরা 160-বিট ইথেরিয়াম ঠিকানা সংরক্ষণ করতে `Field` ব্যবহার করি।

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

হস্তান্তরের ট্রানজ্যাকশনের জন্য আমরা যে তথ্য সংরক্ষণ করি।

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

একটি ফাংশনের সংজ্ঞা। প্যারামিটার হলো `Account` তথ্য। ফলাফল হলো `Field` ভ্যারিয়েবলগুলোর একটি অ্যারে, যার দৈর্ঘ্য হলো `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

অ্যারের প্রথম মানটি হলো অ্যাকাউন্টের ঠিকানা। দ্বিতীয়টিতে ব্যালেন্স এবং নন্স উভয়ই অন্তর্ভুক্ত থাকে। `.into()` কলগুলো একটি সংখ্যাকে তার প্রয়োজনীয় ডেটা টাইপে পরিবর্তন করে। `account.nonce` হলো একটি `u32` মান, কিন্তু এটিকে `account.balance << 32` নামক একটি `u128` মানের সাথে যোগ করতে, এটিকে একটি `u128` হতে হবে। এটিই হলো প্রথম `.into()`। দ্বিতীয়টি `u128` ফলাফলটিকে একটি `Field` এ রূপান্তর করে যাতে এটি অ্যারেতে ফিট হয়।

```
    flat
}
```

Noir-এ, ফাংশনগুলো শুধুমাত্র শেষে মান রিটার্ন করতে পারে (কোনো আর্লি রিটার্ন নেই)। রিটার্ন ভ্যালুটি নির্দিষ্ট করতে, আপনি ফাংশনের ক্লোজিং ব্র্যাকেটের ঠিক আগে এটির মূল্যায়ন (evaluate) করবেন।

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

এই ফাংশনটি অ্যাকাউন্ট অ্যারেটিকে একটি `Field` অ্যারেতে পরিণত করে, যা পেডারসন হ্যাশের ইনপুট হিসেবে ব্যবহার করা যেতে পারে।

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

এভাবেই আপনি একটি মিউটেবল (পরিবর্তনযোগ্য) ভ্যারিয়েবল নির্দিষ্ট করতে পারেন, অর্থাৎ এটি কোনো ধ্রুবক (constant) _নয়_। Noir-এ ভ্যারিয়েবলের সবসময় একটি মান থাকতে হবে, তাই আমরা এই ভ্যারিয়েবলটিকে শূন্য (0) দিয়ে ইনিশিয়ালাইজ করি।

```
    for i in 0..ACCOUNT_NUMBER {
```

এটি একটি `for` লুপ। লক্ষ্য করুন যে সীমানাগুলো ধ্রুবক (constants)। Noir লুপগুলির কম্পাইল করার সময় সীমানা জানা থাকতে হয়। এর কারণ হলো অ্যারিথমেটিক সার্কিট ফ্লো কন্ট্রোল সমর্থন করে না। একটি `for` লুপ প্রসেস করার সময়, কম্পাইলার কেবল এর ভেতরের কোডটিকে প্রতিটি ইটারেশনের জন্য একবার করে, মোট একাধিকবার রাখে।

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

অবশেষে, আমরা সেই ফাংশনে পৌঁছালাম যা অ্যাকাউন্ট অ্যারে হ্যাশ করে।

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

এই ফাংশনটি নির্দিষ্ট ঠিকানার একটি অ্যাকাউন্ট খুঁজে বের করে। স্ট্যান্ডার্ড কোডে এই ফাংশনটি অত্যন্ত অদক্ষ (inefficient) হবে কারণ এটি ঠিকানাটি খুঁজে পাওয়ার পরেও সমস্ত অ্যাকাউন্টের ওপর ইটারেট করতে থাকে।

তবে, শূন্য-জ্ঞান প্রমাণগুলিতে কোনো ফ্লো কন্ট্রোল থাকে না। যদি আমাদের কখনও কোনো শর্ত পরীক্ষা করার প্রয়োজন হয়, তবে আমাদের প্রতিবারই তা পরীক্ষা করতে হবে।

`if` স্টেটমেন্টের ক্ষেত্রেও একই ব্যাপার ঘটে। উপরের লুপের `if` স্টেটমেন্টটি এই গাণিতিক বিবৃতিগুলোতে অনুবাদ করা হয়।

_condition<sub>result</sub> = accounts[i].address == address_ // সমান হলে এক (1), অন্যথায় শূন্য (0)

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/language/assert) ফাংশনটির ফলে যদি শর্তটি মিথ্যা হয় তবে শূন্য-জ্ঞান প্রমাণ ক্র্যাশ করে। এই ক্ষেত্রে, যদি আমরা প্রাসঙ্গিক ঠিকানার কোনো অ্যাকাউন্ট খুঁজে না পাই। ঠিকানা রিপোর্ট করতে, আমরা একটি [ফর্ম্যাট স্ট্রিং](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) ব্যবহার করি।

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

Noir-এ আমরা ফর্ম্যাট স্ট্রিংয়ের ভেতরে স্ট্রাকচারের উপাদানগুলো অ্যাক্সেস করতে পারি না, তাই আমরা একটি ব্যবহারযোগ্য কপি তৈরি করি।

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

এই দুটি শর্ত একটি ট্রানজ্যাকশনকে অবৈধ করে দিতে পারে।

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

ঠিকানাটি সবসময় 20 বাইট (অর্থাৎ 40 হেক্সাডেসিমাল ডিজিট) লম্বা হয়, এবং ক্যারেক্টার #7 থেকে শুরু হয়।

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

বার্তা থেকে পরিমাণ এবং নন্সটি পড়ুন। 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

বার্তায়, ঠিকানার পরের প্রথম নম্বরটি হলো ফিনির (অর্থাৎ ইটিএইচ এর এক হাজার ভাগের এক ভাগ) পরিমাণ যা হস্তান্তর করতে হবে। দ্বিতীয় নম্বরটি হলো নন্স। এদের মাঝখানের যেকোনো টেক্সট উপেক্ষা করা হয়।

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

একটি ফাংশন থেকে একাধিক মান রিটার্ন করার জন্য একটি [টাপল (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) রিটার্ন করা হলো Noir-এর পদ্ধতি।

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

আমরা অ্যাকাউন্টগুলোর জন্য পেডারসন হ্যাশ ব্যবহার করতে পেরেছিলাম কারণ সেগুলো কেবল শূন্য-জ্ঞান প্রমাণের ভেতরে হ্যাশ করা হয়। তবে, এই কোডে আমাদের বার্তার স্বাক্ষর পরীক্ষা করতে হবে, যা ব্রাউজার দ্বারা তৈরি হয়। এর জন্য, আমাদের [EIP-191](https://eips.ethereum.org/EIPS/eip-191)-এ ইথেরিয়াম স্বাক্ষর ফর্ম্যাট অনুসরণ করতে হবে। এর মানে হলো আমাদের একটি স্ট্যান্ডার্ড প্রিফিক্স, ASCII-তে বার্তার দৈর্ঘ্য এবং আসল বার্তাটি দিয়ে একটি সম্মিলিত বাফার তৈরি করতে হবে এবং এটিকে হ্যাশ করার জন্য ইথেরিয়াম স্ট্যান্ডার্ড keccak256 ব্যবহার করতে হবে।

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

অ্যাপ্লিকেশনগুলো যাতে ব্যবহারকারীকে এমন কোনো বার্তায় স্বাক্ষর করতে না বলে যা ট্রানজ্যাকশন হিসেবে বা অন্য কোনো উদ্দেশ্যে ব্যবহার করা যেতে পারে, তা এড়াতে EIP-191 নির্দিষ্ট করে দেয় যে সমস্ত স্বাক্ষরিত বার্তা 0x19 ক্যারেক্টার (একটি বৈধ ASCII ক্যারেক্টার নয়) দিয়ে শুরু হবে, এরপর `Ethereum Signed Message:` এবং একটি নতুন লাইন থাকবে।

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

999 পর্যন্ত বার্তার দৈর্ঘ্যগুলি পরিচালনা করুন এবং যদি এটি বেশি হয় তবে ব্যর্থ (fail) হোন। আমি এই কোডটি যোগ করেছি, যদিও বার্তার দৈর্ঘ্য একটি ধ্রুবক, কারণ এটি পরিবর্তন করা সহজ করে তোলে। একটি প্রডাকশন সিস্টেমে, ভালো পারফরম্যান্সের স্বার্থে আপনি সম্ভবত ধরে নেবেন যে `MESSAGE_LENGTH` পরিবর্তন হয় না।

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

এই ফাংশনটি স্বাক্ষর যাচাই করে, যার জন্য বার্তার হ্যাশ প্রয়োজন হয়। এরপর এটি আমাদেরকে সেই ঠিকানা প্রদান করে যে এটিতে স্বাক্ষর করেছে এবং বার্তার হ্যাশ দেয়। বার্তার হ্যাশটি দুটি `Field` মান দিয়ে সরবরাহ করা হয় কারণ বাইট অ্যারের চেয়ে বাকি প্রোগ্রামে সেগুলো ব্যবহার করা সহজ।

আমাদের দুটি `Field` মান ব্যবহার করতে হবে কারণ ফিল্ডের গণনাগুলি একটি বড় সংখ্যার [মডুলো (modulo)](https://en.wikipedia.org/wiki/Modulo) করে করা হয়, কিন্তু সেই সংখ্যাটি সাধারণত 256 বিটের চেয়ে কম হয় (অন্যথায় EVM-এ সেই গণনাগুলি করা কঠিন হবে)।

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` এবং `hash2` কে পরিবর্তনযোগ্য (mutable) ভ্যারিয়েবল হিসেবে নির্দিষ্ট করুন এবং সেগুলোতে বাইট বাইট করে হ্যাশ লিখুন।

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
এটি [Solidity-এর `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) এর মতো, তবে দুটি গুরুত্বপূর্ণ পার্থক্য রয়েছে:

- যদি স্বাক্ষরটি বৈধ না হয়, তবে কলটি একটি `assert`-এ ব্যর্থ হয় এবং প্রোগ্রামটি বন্ধ (aborted) হয়ে যায়।
- যদিও স্বাক্ষর এবং হ্যাশ থেকে পাবলিক কী রিকভার করা যায়, তবে এই প্রসেসিংটি বাহ্যিকভাবে (externally) করা যেতে পারে এবং তাই জিরো-নলেজ প্রমাণের ভেতরে এটি করার কোনো মানে হয় না। যদি কেউ আমাদের সাথে এখানে প্রতারণা করার চেষ্টা করে, তবে স্বাক্ষর যাচাই ব্যর্থ হবে।

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

অবশেষে, আমরা `main` ফাংশনে পৌঁছাই। আমাদের প্রমাণ করতে হবে যে আমাদের কাছে এমন একটি ট্রানজ্যাকশন আছে যা বৈধভাবে অ্যাকাউন্টগুলোর হ্যাশকে পুরানো মান থেকে নতুনটিতে পরিবর্তন করে। আমাদের এও প্রমাণ করতে হবে যে এর এই নির্দিষ্ট ট্রানজ্যাকশন হ্যাশটি রয়েছে যাতে যে ব্যক্তিটি এটি পাঠিয়েছে সে জানতে পারে যে তার ট্রানজ্যাকশন প্রসেস করা হয়েছে।

```rust
{
    let mut txn = readTransferTxn(message);
```

আমাদের `txn` মিউটেবল (পরিবর্তনযোগ্য) রাখা প্রয়োজন কারণ আমরা বার্তা থেকে প্রেরকের (from) ঠিকানা পড়ি না, আমরা এটি স্বাক্ষর থেকে পড়ি। 

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

দ্বিতীয় পর্যায়ে, আমরা এমন একটি সার্ভার যোগ করব যা ব্রাউজার থেকে হস্তান্তরের ট্রানজ্যাকশনগুলো গ্রহণ ও বাস্তবায়ন করবে।

এটি কার্যকর অবস্থায় দেখতে:

1. Vite চালু থাকলে তা বন্ধ করুন।

2. যে ব্রাঞ্চটিতে সার্ভার রয়েছে সেটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার কাছে সমস্ত প্রয়োজনীয় মডিউল আছে।

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir কোড কম্পাইল করার কোনো প্রয়োজন নেই, এটি পর্যায় 1 এর জন্য আপনি যে কোড ব্যবহার করেছিলেন ঠিক তারই মতো।

3. সার্ভারটি শুরু করুন।

   ```sh
   npm run start
   ```

4. একটি পৃথক কমান্ড-লাইন উইন্ডোতে, ব্রাউজার কোড পরিবেশন করতে Vite চালু করুন।

   ```sh
   cd client
   npm run dev
   ```

5. ক্লায়েন্ট কোডটিতে ব্রাউজ করুন এখানে: [http://localhost:5173](http://localhost:5173)

6. একটি ট্রানজ্যাকশন ইস্যু করার আগে, আপনাকে নন্স এবং সেই সাথে আপনি যে পরিমাণ পাঠাতে পারবেন তা জানতে হবে। এই তথ্য পেতে, **Update account data** এ ক্লিক করুন এবং বার্তায় স্বাক্ষর করুন।

   আমাদের এখানে একটি দ্বিধা আছে। একদিকে, আমরা এমন কোনো বার্তায় স্বাক্ষর করতে চাই না যা পুনরায় ব্যবহার করা যেতে পারে (একটি [রিপ্লে অ্যাটাক](https://en.wikipedia.org/wiki/Replay_attack)), যে কারণে আমরা প্রথমেই একটি নন্স চাই। তবে, আমাদের কাছে এখনও কোনো নন্স নেই। সমাধান হলো এমন একটি নন্স নির্বাচন করা যা কেবল একবারই ব্যবহার করা যেতে পারে এবং যা আমাদের উভয় পক্ষের কাছে ইতিমধ্যেই আছে, যেমন বর্তমান সময়।

   এই সমাধানের সমস্যা হলো সময়টি নিখুঁতভাবে সিঙ্ক্রোনাইজড নাও হতে পারে। তাই এর বদলে, আমরা এমন একটি মানে স্বাক্ষর করি যা প্রতি মিনিটে পরিবর্তিত হয়। এর অর্থ হলো রিপ্লে অ্যাটাকের প্রতি আমাদের দুর্বলতার সময়সীমা সর্বাধিক এক মিনিট। যেহেতু প্রডাকশনে স্বাক্ষরিত অনুরোধটি TLS দ্বারা সুরক্ষিত থাকবে, এবং টানেলের অন্য প্রান্তটি---সার্ভার---ইতিমধ্যেই ব্যালেন্স এবং নন্স প্রকাশ করতে পারে (কাজ করার জন্য তাকে এগুলো জানতেই হবে), এটি বিবেচনা করলে এটি একটি গ্রহণযোগ্য ঝুঁকি।

7. ব্রাউজারটি একবার ব্যালেন্স এবং নন্স ফিরে পেলে, এটি হস্তান্তর করার ফর্মটি দেখায়। গন্তব্য ঠিকানা এবং পরিমাণ নির্বাচন করুন এবং **Transfer**-এ ক্লিক করুন। এই অনুরোধে স্বাক্ষর করুন।

8. হস্তান্তর দেখতে, হয় **Update account data** করুন অথবা যে উইন্ডোতে আপনি সার্ভারটি চালাচ্ছেন সেখানে তাকান। স্টেট পরিবর্তন হওয়ার প্রতিবার সার্ভারটি লগ রাখে।

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

[এই ফাইলটিতে](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) সার্ভার প্রক্রিয়াটি রয়েছে এবং এটি [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) এ থাকা Noir কোডের সাথে মিথস্ক্রিয়া (interact) করে। এখানে আকর্ষণীয় অংশগুলোর একটি ব্যাখ্যা দেওয়া হলো।

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) লাইব্রেরিটি JavaScript কোড এবং Noir কোডের মধ্যে ইন্টারফেস হিসেবে কাজ করে।

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

অ্যারিথমেটিক সার্কিটটি লোড করুন---আগের ধাপে আমাদের তৈরি করা কম্পাইল করা Noir প্রোগ্রামটি---এবং এটিকে এক্সিকিউট (execute) করার প্রস্তুতি নিন।

```js
// আমরা শুধুমাত্র একটি স্বাক্ষরিত অনুরোধের জবাবে অ্যাকাউন্ট তথ্য প্রদান করি
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

অ্যাকাউন্টের তথ্য সরবরাহ করতে, আমাদের কেবল স্বাক্ষরটি প্রয়োজন। এর কারণ হলো আমরা আগে থেকেই জানি বার্তাটি কী হতে চলেছে এবং তাই বার্তার হ্যাশটিও আমরা জানি।

```js
const processMessage = async (message, signature) => {
```

একটি বার্তা প্রসেস করুন এবং এটি যে ট্রানজ্যাকশনটিকে এনকোড করে তা এক্সিকিউট করুন।

```js
    // পাবলিক কী পান
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

যেহেতু এখন আমরা সার্ভারে JavaScript চালাচ্ছি, তাই আমরা ক্লায়েন্টের পরিবর্তে সেখানেই পাবলিক কী পুনরুদ্ধার (retrieve) করতে পারি।

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

`noir.execute` Noir প্রোগ্রামটিকে রান করে। প্যারামিটারগুলি [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml)-এ প্রদান করা প্যারামিটারগুলির সমতুল্য। লক্ষ্য করুন যে লম্বা মানগুলি হেক্সাডেসিমাল স্ট্রিংয়ের অ্যারে হিসেবে প্রদান করা হয় (`["0x60", "0xA7"]`), Viem-এর মতো একক হেক্সাডেসিমাল মান হিসেবে নয় (`0x60A7`)।

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

যদি কোনো ত্রুটি থাকে, তবে এটি ক্যাচ (catch) করুন এবং এরপর ক্লায়েন্টকে এর একটি সরলীকৃত সংস্করণ রিলে করুন।

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

ট্রানজ্যাকশনটি প্রয়োগ করুন। আমরা এটি ইতোমধ্যেই Noir কোডে করেছি, তবে সেখান থেকে ফলাফল বের করার চেয়ে এখানে আবার করা সহজ।

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

প্রারম্ভিক `Accounts` স্ট্রাকচার।

### পর্যায় 3 - ইথেরিয়াম স্মার্ট কন্ট্রাক্ট {#stage-3}

1. সার্ভার এবং ক্লায়েন্ট প্রসেস বন্ধ করুন।

2. স্মার্ট কন্ট্রাক্ট যুক্ত ব্রাঞ্চটি ডাউনলোড করুন এবং নিশ্চিত করুন যে আপনার কাছে সমস্ত প্রয়োজনীয় মডিউল আছে।

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. একটি পৃথক কমান্ড-লাইন উইন্ডোতে `anvil` রান করুন।

4. ভেরিফিকেশন কী এবং সলিডিটি যাচাইকারী (solidity verifier) তৈরি করুন, এরপর যাচাইকারীর কোডটি Solidity প্রোজেক্টে কপি করুন।

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. স্মার্ট কন্ট্রাক্টে যান এবং `anvil` ব্লকচেইন ব্যবহার করতে পরিবেশের ভ্যারিয়েবলগুলো (environment variables) সেট করুন।

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol` ডিপ্লয় করুন এবং পরিবেশের ভ্যারিয়েবলে ঠিকানাটি সংরক্ষণ করুন।

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` কন্ট্রাক্টটি ডিপ্লয় করুন।

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` মানটি হলো `Accounts` এর প্রারম্ভিক স্টেটের পেডারসন হ্যাশ। আপনি যদি `server/index.mjs` এ এই প্রারম্ভিক স্টেটটি পরিবর্তন করেন, তবে আপনি একটি ট্রানজ্যাকশন রান করে শূন্য-জ্ঞান প্রমাণ দ্বারা রিপোর্ট করা প্রাথমিক হ্যাশটি দেখতে পাবেন।

8. সার্ভারটি রান করুন।

   ```sh
   cd ../server
   npm run start
   ```

9. অন্য একটি কমান্ড-লাইন উইন্ডোতে ক্লায়েন্টটি রান করুন।

   ```sh
   cd client
   npm run dev
   ```

10. কিছু ট্রানজ্যাকশন রান করুন।

11. স্টেটটি অনচেইনে পরিবর্তিত হয়েছে কিনা তা যাচাই করতে, সার্ভার প্রসেসটি রিস্টার্ট করুন। দেখুন যে `ZkBank` আর ট্রানজ্যাকশন গ্রহণ করছে না, কারণ ট্রানজ্যাকশনগুলোর আসল হ্যাশ মানটি অনচেইনে সংরক্ষিত হ্যাশ মানের চেয়ে আলাদা।

    এটি প্রত্যাশিত ধরণের একটি ত্রুটি।

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

এই ফাইলে পরিবর্তনগুলি মূলত আসল প্রমাণ তৈরি করা এবং এটি অনচেইনে জমা দেওয়ার সাথে সম্পর্কিত।

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

অনচেইনে পাঠানোর জন্য আসল প্রমাণ তৈরি করতে আমাদের [ব্যারেনবার্গ (Barretenberg) প্যাকেজটি](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ব্যবহার করতে হবে। আমরা এই প্যাকেজটি হয় কমান্ড-লাইন ইন্টারফেস (`bb`) রান করে অথবা [JavaScript লাইব্রেরি, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) ব্যবহার করে ব্যবহার করতে পারি। কোড স্থানীয়ভাবে (natively) রান করার চেয়ে JavaScript লাইব্রেরিটি অনেক বেশি ধীরগতির, তাই কমান্ড-লাইন ব্যবহার করার জন্য আমরা এখানে [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ব্যবহার করি।

লক্ষ্য রাখবেন যে আপনি যদি `bb.js` ব্যবহার করার সিদ্ধান্ত নেন, তবে আপনাকে এমন একটি ভার্সন ব্যবহার করতে হবে যা আপনার ব্যবহৃত Noir এর ভার্সনের সাথে সামঞ্জস্যপূর্ণ। লেখাটির এই সময়ে, বর্তমান Noir ভার্সন (1.0.0-beta.11) `bb.js` 0.87 ভার্সনটি ব্যবহার করে।

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

এখানের ঠিকানাটি হলো সেটি যা আপনি একটি ক্লিন `anvil` দিয়ে শুরু করলে এবং উপরের নির্দেশাবলী অনুসরণ করলে পাবেন।

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

এই প্রাইভেট কী হলো `anvil` এ ডিফল্টরূপে প্রি-ফান্ডেড (pre-funded) থাকা অ্যাকাউন্টগুলোর মধ্যে একটি। 

```js
const generateProof = async (witness, fileID) => {
```

`bb` এক্সিকিউটেবল ব্যবহার করে একটি প্রমাণ তৈরি করুন।

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

সাক্ষী (witness) কে একটি ফাইলে লিখুন।

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

প্রকৃতপক্ষে প্রমাণটি তৈরি করুন। এই পদক্ষেপটি পাবলিক ভ্যারিয়েবল সহ একটি ফাইলও তৈরি করে, তবে আমাদের সেটি দরকার নেই। আমরা ইতিমধ্যেই `noir.execute` থেকে সেই ভ্যারিয়েবলগুলো পেয়েছি।

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

প্রমাণটি হলো `Field` মানগুলোর একটি JSON অ্যারে, যার প্রতিটি হেক্সাডেসিমাল মান হিসেবে উপস্থাপিত হয়। তবে, আমাদের এটি ট্রানজ্যাকশনে একটি একক `bytes` মান হিসেবে পাঠাতে হবে, যা Viem একটি বড় হেক্সাডেসিমাল স্ট্রিং দ্বারা উপস্থাপন করে। এখানে আমরা সমস্ত মান একত্রিত করে, সমস্ত `0x` অপসারণ করে এবং তারপর শেষে একটি যোগ করে ফর্ম্যাটটি পরিবর্তন করি।

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

পাবলিক ফিল্ডগুলোকে 32-বাইট মানের একটি অ্যারে হতে হবে। তবে, যেহেতু আমাদের ট্রানজ্যাকশন হ্যাশটিকে দুটি `Field` মানের মধ্যে ভাগ করতে হয়েছিল, তাই এটি 16-বাইট মান হিসেবে প্রদর্শিত হয়। এখানে আমরা শূন্য (0) যোগ করি যাতে Viem বুঝতে পারে এটি আসলে 32 বাইটের।

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

প্রতিটি ঠিকানা প্রতিটি নন্স কেবল একবার ব্যবহার করে যাতে আমরা সাক্ষী ফাইল এবং আউটপুট ডিরেক্টরির একটি অনন্য শনাক্তকারী (unique identifier) হিসেবে `fromAddress` এবং `nonce` এর সংমিশ্রণ ব্যবহার করতে পারি।

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

ট্রানজ্যাকশনটি চেইনে পাঠান।

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

অনচেইন কোডকে দুটি ভ্যারিয়েবলের ট্র্যাক রাখতে হবে: যাচাইকারী (একটি পৃথক কন্ট্রাক্ট যা `nargo` দ্বারা তৈরি হয়) এবং বর্তমান স্টেট হ্যাশ।

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

প্রতিবার স্টেট পরিবর্তিত হওয়ার সময়, আমরা একটি `TransactionProcessed` ইভেন্ট নির্গত (emit) করি।

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

এই ফাংশনটি ট্রানজ্যাকশন প্রসেস করে। এটি প্রমাণ (bytes হিসেবে) এবং পাবলিক ইনপুটগুলো (একটি `bytes32` অ্যারে হিসেবে) যাচাইকারীর জন্য প্রয়োজনীয় ফর্ম্যাটে গ্রহণ করে (অনচেইন প্রসেসিং এবং সেই কারণে গ্যাসের খরচ কমানোর জন্য)।

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

শূন্য-জ্ঞান প্রমাণটি হতে হবে এমন যে ট্রানজ্যাকশনটি আমাদের বর্তমান হ্যাশ থেকে নতুনটিতে পরিবর্তিত হয়।

```solidity
        myVerifier.verify(_proof, _publicFields);
```

শূন্য-জ্ঞান প্রমাণটি যাচাই করতে যাচাইকারীর কন্ট্রাক্টকে কল করুন। শূন্য-জ্ঞান প্রমাণ ভুল হলে এই পদক্ষেপটি ট্রানজ্যাকশনটিকে রিভার্ট (বাতিল) করে দেয়।

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

যদি সবকিছু সঠিক প্রমাণিত হয়, তবে স্টেট হ্যাশটিকে নতুন মানে আপডেট করুন এবং একটি `TransactionProcessed` ইভেন্ট নির্গত করুন।

## কেন্দ্রীভূত উপাদানের অপব্যবহার {#abuses}

তথ্য নিরাপত্তার তিনটি বৈশিষ্ট্য রয়েছে:

- _গোপনীয়তা (Confidentiality)_, ব্যবহারকারীরা এমন কোনো তথ্য পড়তে পারবে না যা পড়ার অনুমতি তাদের নেই।
- _অখণ্ডতা (Integrity)_, তথ্য পরিবর্তন করা যাবে না শুধুমাত্র অনুমোদিত পদ্ধতিতে অনুমোদিত ব্যবহারকারীদের ছাড়া।
- _প্রাপ্যতা (Availability)_, অনুমোদিত ব্যবহারকারীরা সিস্টেমটি ব্যবহার করতে পারবে।

এই সিস্টেমে, শূন্য-জ্ঞান প্রমাণের মাধ্যমে ইন্টিগ্রিটি প্রদান করা হয়। অ্যাভেইলেবিলিটি (প্রাপ্যতা) নিশ্চিত করা অনেক বেশি কঠিন, এবং গোপনীয়তা (confidentiality) অসম্ভব, কারণ ব্যাংককে প্রতিটি অ্যাকাউন্টের ব্যালেন্স এবং সমস্ত ট্রানজ্যাকশন জানতে হবে। যে এন্টিটির কাছে তথ্য আছে তাকে সেই তথ্য শেয়ার করা থেকে বিরত রাখার কোনো উপায় নেই।

[স্টিলথ ঠিকানা (stealth addresses)](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ব্যবহার করে একটি সত্যিকারের গোপনীয় ব্যাংক তৈরি করা সম্ভব হতে পারে, তবে তা এই নিবন্ধের আওতার বাইরে।

### ভুল তথ্য {#false-info}

ডেটার জন্য অনুরোধ করা হলে ভুল তথ্য প্রদান করা হলো এমন একটি উপায় যার মাধ্যমে সার্ভার ইন্টিগ্রিটি লঙ্ঘন করতে পারে।

এর সমাধানের জন্য, আমরা একটি দ্বিতীয় Noir প্রোগ্রাম লিখতে পারি যা প্রাইভেট ইনপুট হিসেবে অ্যাকাউন্টগুলো এবং পাবলিক ইনপুট হিসেবে সেই ঠিকানাটি গ্রহণ করে যার জন্য তথ্যের অনুরোধ করা হয়েছে। এর আউটপুট হলো সেই ঠিকানার ব্যালেন্স এবং নন্স, এবং অ্যাকাউন্টগুলোর হ্যাশ।

অবশ্যই, এই প্রমাণটি অনচেইনে যাচাই করা যাবে না, কারণ আমরা অনচেইনে নন্স এবং ব্যালেন্স পোস্ট করতে চাই না। তবে, এটি ব্রাউজারে চলমান ক্লায়েন্ট কোড দ্বারা যাচাই করা যেতে পারে।

### জোরপূর্বক ট্রানজ্যাকশন (Forced transactions) {#forced-txns}

L2-তে অ্যাভেইলেবিলিটি নিশ্চিত করতে এবং সেন্সরশিপ রোধ করার সাধারণ প্রক্রিয়া হলো [জোরপূর্বক ট্রানজ্যাকশন](https://docs.optimism.io/stack/transactions/forced-transaction)। তবে জোরপূর্বক ট্রানজ্যাকশন শূন্য-জ্ঞান প্রমাণের সাথে একত্রিত হয় না। সার্ভারই একমাত্র এন্টিটি যা ট্রানজ্যাকশন যাচাই করতে পারে।

জোরপূর্বক ট্রানজ্যাকশন গ্রহণ করতে এবং সেগুলি প্রসেস না হওয়া পর্যন্ত সার্ভারকে স্টেট পরিবর্তন করা থেকে বিরত রাখতে আমরা `smart-contracts/src/ZkBank.sol` সংশোধন করতে পারি। তবে, এটি আমাদের একটি সাধারণ ডিনায়াল-অফ-সার্ভিস অ্যাটাকের জন্য উন্মুক্ত করে দেয়। যদি কোনো জোরপূর্বক ট্রানজ্যাকশন অবৈধ হয় এবং সেই কারণে প্রসেস করা অসম্ভব হয় তবে কী হবে?

এর সমাধান হলো একটি শূন্য-জ্ঞান প্রমাণ রাখা যা প্রমাণ করে যে একটি জোরপূর্বক ট্রানজ্যাকশন অবৈধ। এটি সার্ভারকে তিনটি বিকল্প দেয়:

- এটি প্রসেস করা হয়েছে এমন একটি শূন্য-জ্ঞান প্রমাণ এবং নতুন স্টেট হ্যাশ প্রদান করে জোরপূর্বক ট্রানজ্যাকশনটি প্রসেস করুন।
- জোরপূর্বক ট্রানজ্যাকশনটি প্রত্যাখ্যান করুন এবং কন্ট্রাক্টটিতে একটি শূন্য-জ্ঞান প্রমাণ প্রদান করুন যে ট্রানজ্যাকশনটি অবৈধ (অজানা ঠিকানা, ভুল নন্স, বা অপর্যাপ্ত ব্যালেন্স)।
- জোরপূর্বক ট্রানজ্যাকশনটি উপেক্ষা করুন। সার্ভারকে প্রকৃতপক্ষে ট্রানজ্যাকশনটি প্রসেস করতে বাধ্য করার কোনো উপায় নেই, তবে এর অর্থ হলো সম্পূর্ণ সিস্টেমটি অনুপস্থিত (unavailable) হয়ে পড়বে।

#### প্রাপ্যতার বন্ড (Availability bonds) {#avail-bonds}

বাস্তব-জীবনের প্রয়োগে, সার্ভারটি চালু রাখার জন্য সম্ভবত কোনো ধরণের লাভের উদ্দেশ্য থাকবে। আমরা সার্ভারকে একটি অ্যাভেইলেবিলিটি বন্ড পোস্ট করতে বলে এই প্রণোদনাটি আরও শক্তিশালী করতে পারি, যা কোনো নির্দিষ্ট সময়ের মধ্যে জোরপূর্বক ট্রানজ্যাকশন প্রসেস না হলে যে কেউ পুড়িয়ে (burn) ফেলতে পারে।

### ত্রুটিযুক্ত Noir কোড {#bad-noir-code}

সাধারণত, স্মার্ট কন্ট্রাক্টে মানুষের আস্থা অর্জনের জন্য আমরা সোর্স কোডটি একটি [ব্লক এক্সপ্লোরারে](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) আপলোড করি। তবে, শূন্য-জ্ঞান প্রমাণের ক্ষেত্রে এটি অপর্যাপ্ত।

`Verifier.sol` এ ভেরিফিকেশন কী থাকে, যা Noir প্রোগ্রামের একটি ফাংশন। তবে, সেই কীটি আমাদের বলে না যে Noir প্রোগ্রামটি কী ছিল। আসলে একটি বিশ্বস্ত সমাধান পেতে হলে, আপনাকে Noir প্রোগ্রামটি (এবং এটি যে ভার্সন দ্বারা তৈরি হয়েছিল তা) আপলোড করতে হবে। অন্যথায়, শূন্য-জ্ঞান প্রমাণগুলো একটি ভিন্ন প্রোগ্রামকে প্রতিফলিত করতে পারে, যার কোনো গুপ্ত প্রবেশদ্বার (back door) থাকতে পারে।

যতক্ষণ না ব্লক এক্সপ্লোরারগুলো আমাদের Noir প্রোগ্রাম আপলোড এবং যাচাই করার অনুমতি দিচ্ছে, আপনার উচিত এটি নিজে করা (বিশেষত [IPFS](/developers/tutorials/ipfs-decentralized-ui/) এ)। এরপর দক্ষ ব্যবহারকারীরা সোর্স কোডটি ডাউনলোড করতে পারবেন, এটি নিজে কম্পাইল করে `Verifier.sol` তৈরি করতে পারবেন এবং যাচাই করতে পারবেন যে এটি অনচেইনে থাকা কন্ট্রাক্টের সাথে হুবহু এক।

## উপসংহার {#conclusion}

প্লাজমা-ধরণের অ্যাপ্লিকেশনগুলোর তথ্য সংরক্ষণের জন্য একটি কেন্দ্রীভূত উপাদান প্রয়োজন হয়। এটি সম্ভাব্য দুর্বলতাগুলো উন্মুক্ত করে দেয় তবে, এর বিনিময়ে, এটি আমাদেরকে ব্লকচেইনে উপলব্ধ নয় এমন উপায়ে গোপনীয়তা রক্ষা করার সুযোগ দেয়। শূন্য-জ্ঞান প্রমাণের মাধ্যমে আমরা ইন্টিগ্রিটি নিশ্চিত করতে পারি এবং সম্ভবত যে কেউ কেন্দ্রীভূত উপাদানটি পরিচালনা করছে তার জন্য অ্যাভেইলেবিলিটি (প্রাপ্যতা) বজায় রাখা অর্থনৈতিকভাবে লাভজনক করে তুলতে পারি।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

## স্বীকৃতি {#acknowledgements}

- জশ ক্রাইটস এই নিবন্ধের একটি খসড়া পড়েছিলেন এবং আমাকে Noir এর একটি জটিল সমস্যায় সাহায্য করেছিলেন।

বাকি কোনো ত্রুটি থাকলে তার দায়ভার আমার।
