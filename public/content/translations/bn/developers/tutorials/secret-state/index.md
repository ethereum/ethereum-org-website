---
title: "গোপন স্টেটের জন্য জিরো-নলেজ ব্যবহার করা"
description: "অনচেইন গেমগুলি সীমিত কারণ তারা কোনও লুকানো তথ্য রাখতে পারে না। এই টিউটোরিয়ালটি পড়ার পরে, একজন পাঠক জিরো-নলেজ প্রুফ এবং সার্ভার কম্পোনেন্টগুলিকে একত্রিত করে একটি গোপন স্টেট, অফচেইন, কম্পোনেন্ট সহ যাচাইযোগ্য গেম তৈরি করতে সক্ষম হবেন। এই কৌশলটি একটি মাইনসুইপার গেম তৈরি করে দেখানো হবে।"
author: Ori Pomerantz
tags:
  [
    "সার্ভার",
    "অফচেইন",
    "কেন্দ্রীভূত",
    "জিরো-নলেজ",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: bn
published: 2025-03-15
---

_ব্লকচেইনে কোনো গোপনীয়তা নেই_। ব্লকচেইনে যা কিছু পোস্ট করা হয় তা সবার পড়ার জন্য উন্মুক্ত। এটি প্রয়োজনীয়, কারণ ব্লকচেইনটি যে কেউ এটি যাচাই করতে সক্ষম হওয়ার উপর ভিত্তি করে তৈরি। যাইহোক, গেমগুলি প্রায়শই গোপন স্টেটের উপর নির্ভর করে। উদাহরণস্বরূপ, [মাইনসুইপার](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) গেমটির কোনো মানেই হয় না যদি আপনি শুধু একটি ব্লকচেইন এক্সপ্লোরারে গিয়ে ম্যাপটি দেখতে পান।

সবচেয়ে সহজ সমাধান হলো গোপন স্টেট ধরে রাখার জন্য একটি [সার্ভার কম্পোনেন্ট](/developers/tutorials/server-components/) ব্যবহার করা। যাইহোক, আমরা ব্লকচেইন ব্যবহার করার কারণ হল গেম ডেভেলপারের দ্বারা প্রতারণা প্রতিরোধ করা। আমাদের সার্ভার কম্পোনেন্টের সততা নিশ্চিত করতে হবে। সার্ভার স্টেটের একটি হ্যাস প্রদান করতে পারে, এবং [জিরো-নলেজ প্রুফ](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) ব্যবহার করে প্রমাণ করতে পারে যে একটি পদক্ষেপের ফলাফল গণনা করার জন্য ব্যবহৃত স্টেটটি সঠিক।

এই নিবন্ধটি পড়ার পরে আপনি জানতে পারবেন কিভাবে এই ধরনের গোপন স্টেট হোল্ডিং সার্ভার, স্টেট দেখানোর জন্য একটি ক্লায়েন্ট এবং উভয়ের মধ্যে যোগাযোগের জন্য একটি অনচেইন কম্পোনেন্ট তৈরি করতে হয়। আমরা যে প্রধান টুলসগুলো ব্যবহার করব সেগুলো হলো:

| টুল                                           | উদ্দেশ্য                                            |               সংস্করণে যাচাই করা হয়েছে |
| --------------------------------------------- | --------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | জিরো-নলেজ প্রুফ এবং তাদের যাচাইকরণ                  |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | সার্ভার এবং ক্লায়েন্ট উভয়ের জন্য প্রোগ্রামিং ভাষা |   5.4.2 |
| [Node](https://nodejs.org/en)                 | সার্ভার চালানো                                      | 20.18.2 |
| [Viem](https://viem.sh/)                      | ব্লকচেইনের সাথে যোগাযোগ                             |  2.9.20 |
| [MUD](https://mud.dev/)                       | অনচেইন ডেটা ম্যানেজমেন্ট                            |  2.0.12 |
| [React](https://react.dev/)                   | ক্লায়েন্ট ব্যবহারকারী ইন্টারফেস                    |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | ক্লায়েন্ট কোড পরিবেশন করা                          |   4.2.1 |

## মাইনসুইপার উদাহরণ {#minesweeper}

[মাইনসুইপার](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) একটি গেম যেখানে একটি মাইনফিল্ড সহ একটি গোপন ম্যাপ অন্তর্ভুক্ত থাকে। খেলোয়াড় একটি নির্দিষ্ট স্থানে খনন করতে বেছে নেয়। যদি সেই স্থানে একটি মাইন থাকে, তাহলে খেলা শেষ। অন্যথায়, খেলোয়াড় সেই স্থানের আশেপাশের আটটি স্কোয়ারে মাইনের সংখ্যা পায়।

এই অ্যাপ্লিকেশনটি [MUD](https://mud.dev/) ব্যবহার করে লেখা হয়েছে, এটি এমন একটি ফ্রেমওয়ার্ক যা আমাদের একটি [কী-ভ্যালু ডেটাবেস](https://aws.amazon.com/nosql/key-value/) ব্যবহার করে অনচেইন ডেটা সংরক্ষণ করতে এবং সেই ডেটা স্বয়ংক্রিয়ভাবে অফচেইন কম্পোনেন্টগুলির সাথে সিঙ্ক্রোনাইজ করতে দেয়। সিঙ্ক্রোনাইজেশন ছাড়াও, MUD অ্যাক্সেস কন্ট্রোল প্রদান করা সহজ করে তোলে এবং অন্যান্য ব্যবহারকারীদের জন্য আমাদের অ্যাপ্লিকেশনটি অনুমতি ছাড়াই [প্রসারিত](https://mud.dev/guides/extending-a-world) করার সুযোগ করে দেয়।

### মাইনসুইপার উদাহরণ চালানো {#running-minesweeper-example}

মাইনসুইপার উদাহরণটি চালাতে:

1. নিশ্চিত করুন যে আপনি [প্রয়োজনীয় পূর্বশর্তগুলি ইনস্টল করেছেন](https://mud.dev/quickstart#prerequisites): [নোড](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), এবং [`mprocs`](https://github.com/pvolok/mprocs)।

2. রিপোজিটরি ক্লোন করুন।

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. প্যাকেজগুলি ইনস্টল করুন।

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   যদি `pnpm install`-এর অংশ হিসেবে Foundry ইনস্টল করা হয়ে থাকে, তাহলে আপনাকে কমান্ড-লাইন শেলটি পুনরায় চালু করতে হবে।

4. কন্ট্র্যাক্টগুলো কম্পাইল করুন

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. প্রোগ্রামটি শুরু করুন (একটি [anvil](https://book.getfoundry.sh/anvil/) ব্লকচেইন সহ) এবং অপেক্ষা করুন।

   ```sh copy
   mprocs
   ```

   মনে রাখবেন যে স্টার্টআপে দীর্ঘ সময় লাগে। অগ্রগতি দেখতে, প্রথমে MUD কন্ট্র্যাক্টগুলি ডেপ্লয় হতে দেখার জন্য ডাউন অ্যারো ব্যবহার করে _কন্ট্র্যাক্ট_ ট্যাবে স্ক্রোল করুন। যখন আপনি _Waiting for file changes…_ মেসেজটি পাবেন, তখন কন্ট্র্যাক্টগুলি ডেপ্লয় হয়ে যাবে এবং পরবর্তী অগ্রগতি _সার্ভার_ ট্যাবে ঘটবে। সেখানে, আপনি _Verifier address: 0x...._ মেসেজটি না পাওয়া পর্যন্ত অপেক্ষা করুন।

   যদি এই ধাপটি সফল হয়, আপনি `mprocs` স্ক্রিনটি দেখতে পাবেন, যেখানে বামদিকে বিভিন্ন প্রসেস এবং ডানদিকে বর্তমানে নির্বাচিত প্রসেসের জন্য কনসোল আউটপুট থাকবে।

   ![mprocs স্ক্রিন](./mprocs.png)

   যদি `mprocs`-এ কোনো সমস্যা হয়, আপনি চারটি প্রসেস ম্যানুয়ালি চালাতে পারেন, প্রত্যেকটি তার নিজস্ব কমান্ড লাইন উইন্ডোতে:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **কন্ট্র্যাক্ট**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **সার্ভার**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **ক্লায়েন্ট**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. এখন আপনি [ক্লায়েন্টে](http://localhost:3000) ব্রাউজ করতে পারেন, **নতুন গেম**-এ ক্লিক করুন এবং খেলা শুরু করুন।

### টেবিল {#tables}

আমাদের অনচেইনে [কয়েকটি টেবিল](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) প্রয়োজন।

- `Configuration`: এই টেবিলটি একটি সিঙ্গেলটন, এর কোনো কী এবং একটিমাত্র রেকর্ড নেই। এটি গেম কনফিগারেশন তথ্য ধরে রাখতে ব্যবহৃত হয়:
  - `height`: একটি মাইনফিল্ডের উচ্চতা
  - `width`: একটি মাইনফিল্ডের প্রস্থ
  - `numberOfBombs`: প্রতিটি মাইনফিল্ডে বোমার সংখ্যা

- `VerifierAddress`: এই টেবিলটিও একটি সিঙ্গেলটন। এটি কনফিগারেশনের একটি অংশ, ভেরিফায়ার কন্ট্র্যাক্টের (`verifier`) অ্যাড্রেস ধরে রাখতে ব্যবহৃত হয়। আমরা এই তথ্যটি `Configuration` টেবিলে রাখতে পারতাম, কিন্তু এটি একটি ভিন্ন কম্পোনেন্ট, সার্ভার দ্বারা সেট করা হয়, তাই এটি একটি পৃথক টেবিলে রাখা সহজ।

- `PlayerGame`: কী হল প্লেয়ারের অ্যাড্রেস। ডেটা হল:

  - `gameId`: ৩২-বাইট মান যা প্লেয়ার যে ম্যাপে খেলছে তার হ্যাস (গেম আইডেন্টিফায়ার)।
  - `win`: একটি বুলিয়ান যা নির্দেশ করে খেলোয়াড় গেমটি জিতেছে কিনা।
  - `lose`: একটি বুলিয়ান যা নির্দেশ করে খেলোয়াড় গেমটি হেরেছে কিনা।
  - `digNumber`: গেমে সফল খননের সংখ্যা।

- `GamePlayer`: এই টেবিলটি `gameId` থেকে প্লেয়ার অ্যাড্রেসে বিপরীত ম্যাপিং ধরে রাখে।

- `Map`: কী হল তিনটি মানের একটি টাপল:

  - `gameId`: ৩২-বাইট মান যা প্লেয়ার যে ম্যাপে খেলছে তার হ্যাস (গেম আইডেন্টিফায়ার)।
  - `x` স্থানাঙ্ক
  - `y` স্থানাঙ্ক

  মানটি একটি একক সংখ্যা। যদি একটি বোমা শনাক্ত করা হয় তবে এটি 255। অন্যথায়, এটি সেই অবস্থানের চারপাশে বোমার সংখ্যা এবং এক যোগ। আমরা শুধু বোমার সংখ্যা ব্যবহার করতে পারি না, কারণ ডিফল্টরূপে EVM-এর সমস্ত স্টোরেজ এবং MUD-এর সমস্ত সারি মান শূন্য। আমাদের "খেলোয়াড় এখনও এখানে খনন করেনি" এবং "খেলোয়াড় এখানে খনন করেছে, এবং দেখেছে চারপাশে শূন্য বোমা আছে" এর মধ্যে পার্থক্য করতে হবে।

এছাড়াও, ক্লায়েন্ট এবং সার্ভারের মধ্যে যোগাযোগ অনচেইন কম্পোনেন্টের মাধ্যমে ঘটে। এটিও টেবিল ব্যবহার করে প্রয়োগ করা হয়।

- `PendingGame`: নতুন গেম শুরু করার জন্য পরিষেবা না দেওয়া অনুরোধ।
- `PendingDig`: একটি নির্দিষ্ট গেমে একটি নির্দিষ্ট জায়গায় খনন করার জন্য পরিষেবা না দেওয়া অনুরোধ। এটি একটি [অফচেইন টেবিল](https://mud.dev/store/tables#types-of-tables), যার মানে এটি EVM স্টোরেজে লেখা হয় না, এটি শুধুমাত্র ইভেন্ট ব্যবহার করে অফচেইনে পড়া যায়।

### এক্সিকিউশন এবং ডেটা ফ্লো {#execution-data-flows}

এই ফ্লো গুলো ক্লায়েন্ট, অনচেইন কম্পোনেন্ট এবং সার্ভারের মধ্যে এক্সিকিউশন সমন্বয় করে।

#### ইনিশিয়ালাইজেশন {#initialization-flow}

যখন আপনি `mprocs` চালান, এই ধাপগুলি ঘটে:

1. [`mprocs`](https://github.com/pvolok/mprocs) চারটি কম্পোনেন্ট চালায়:

   - [Anvil](https://book.getfoundry.sh/anvil/), যা একটি স্থানীয় ব্লকচেইন চালায়
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), যা MUD-এর জন্য কন্ট্র্যাক্টগুলি কম্পাইল করে (যদি প্রয়োজন হয়) এবং ডেপ্লয় করে
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), যা ওয়েব ব্রাউজারে UI এবং ক্লায়েন্ট কোড পরিবেশন করতে [Vite](https://vitejs.dev/) চালায়।
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), যা সার্ভারের কাজগুলো সম্পাদন করে

2. `কন্ট্র্যাক্টস` প্যাকেজটি MUD কন্ট্র্যাক্টগুলি ডেপ্লয় করে এবং তারপর [`PostDeploy.s.sol` স্ক্রিপ্টটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) চালায়। এই স্ক্রিপ্টটি কনফিগারেশন সেট করে। github থেকে পাওয়া কোডটি [একটি 10x5 মাইনফিল্ড নির্দিষ্ট করে যার মধ্যে আটটি মাইন আছে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)।

3. [সার্ভারটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD সেট আপ করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) শুরু হয়। অন্যান্য জিনিসের মধ্যে, এটি ডেটা সিঙ্ক্রোনাইজেশন সক্রিয় করে, যাতে সার্ভারের মেমরিতে প্রাসঙ্গিক টেবিলগুলির একটি অনুলিপি বিদ্যমান থাকে।

4. [`Configuration` টেবিল পরিবর্তিত হলে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) সার্ভারটি একটি ফাংশন কার্যকর করার জন্য সাবস্ক্রাইব করে। `PostDeploy.s.sol` কার্যকর হওয়ার পরে এবং টেবিলটি পরিবর্তন করার পরে [এই ফাংশনটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) কল করা হয়।

5. যখন সার্ভার ইনিশিয়ালাইজেশন ফাংশনটিতে কনফিগারেশন থাকে, তখন এটি সার্ভারের [জিরো-নলেজ অংশটি](#using-zokrates-from-typescript) ইনিশিয়ালাইজ করতে [`zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) কল করে। এটি ঘটতে পারে না যতক্ষণ না আমরা কনফিগারেশনটি পাই কারণ জিরো-নলেজ ফাংশনগুলিতে মাইনফিল্ডের প্রস্থ এবং উচ্চতা ধ্রুবক হিসাবে থাকতে হয়।

6. সার্ভারের জিরো-নলেজ অংশ ইনিশিয়ালাইজ করার পরে, পরবর্তী ধাপ হল [জিরো-নলেজ ভেরিফিকেশন কন্ট্র্যাক্টটি ব্লকচেইনে ডেপ্লয় করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) এবং MUD-এ ভেরিফায়ির অ্যাড্রেস সেট করা।

7. অবশেষে, আমরা আপডেটের জন্য সাবস্ক্রাইব করি যাতে আমরা দেখতে পাই কখন একজন খেলোয়াড় [একটি নতুন গেম শুরু করতে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) বা [একটি বিদ্যমান গেমে খনন করতে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) অনুরোধ করে।

#### নতুন গেম {#new-game-flow}

খেলোয়াড় যখন নতুন গেমের জন্য অনুরোধ করে তখন এটি ঘটে।

1. যদি এই প্লেয়ারের জন্য কোনো গেম চালু না থাকে, অথবা যদি থাকে কিন্তু তার gameId শূন্য হয়, তাহলে ক্লায়েন্ট একটি [নতুন গেম বোতাম](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) দেখায়। যখন ব্যবহারকারী এই বোতামটি চাপেন, [React `newGame` ফাংশনটি চালায়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)।

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) একটি `সিস্টেম` কল। MUD-তে সমস্ত কল `World` কন্ট্র্যাক্টের মাধ্যমে রাউট করা হয় এবং বেশিরভাগ ক্ষেত্রে আপনি `<namespace>__<function name>` কল করেন। এই ক্ষেত্রে, কলটি `app__newGame`-এ করা হয়, যা MUD তারপর [`GameSystem`-এ `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)-এ রাউট করে।

3. অনচেইন ফাংশনটি পরীক্ষা করে যে প্লেয়ারের কোনো গেম চালু আছে কিনা, এবং যদি না থাকে তাহলে [`PendingGame` টেবিলে অনুরোধটি যোগ করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)।

4. সার্ভার `PendingGame`-এ পরিবর্তন সনাক্ত করে এবং [সাবস্ক্রাইব করা ফাংশনটি চালায়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)। এই ফাংশনটি [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) কল করে, যা ফলস্বরূপ [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) কল করে।

5. `createGame` যা প্রথম কাজ করে তা হলো [যথাযথ সংখ্যক মাইনসহ একটি র‍্যান্ডম ম্যাপ তৈরি করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)। তারপর, এটি খালি বর্ডার সহ একটি ম্যাপ তৈরি করতে [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) কল করে, যা Zokrates-এর জন্য প্রয়োজনীয়। অবশেষে, `createGame` ম্যাপের হ্যাস পেতে [`calculateMapHash`](#calculateMapHash) কল করে, যা গেম আইডি হিসাবে ব্যবহৃত হয়।

6. `newGame` ফাংশন `gamesInProgress`-এ নতুন গেম যোগ করে।

7. সার্ভার শেষ পর্যন্ত অনচেইনে থাকা [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)-কে কল করে। এই ফাংশনটি একটি ভিন্ন `সিস্টেম`-এ, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এ রয়েছে, যা অ্যাক্সেস কন্ট্রোল সক্ষম করে। অ্যাক্সেস কন্ট্রোল [MUD কনফিগারেশন ফাইল](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)-এ সংজ্ঞায়িত করা আছে।

   অ্যাক্সেস লিস্ট `সিস্টেম` কল করার জন্য শুধুমাত্র একটি একক অ্যাড্রেসকে অনুমতি দেয়। এটি সার্ভার ফাংশনে অ্যাক্সেস একটি একক অ্যাড্রেসে সীমাবদ্ধ করে, যাতে কেউ সার্ভারের ছদ্মবেশ ধারণ করতে না পারে।

8. অনচেইন কম্পোনেন্ট প্রাসঙ্গিক টেবিলগুলি আপডেট করে:

   - `PlayerGame`-এ গেমটি তৈরি করুন।
   - `GamePlayer`-এ বিপরীত ম্যাপিং সেট করুন।
   - `PendingGame` থেকে অনুরোধটি সরান।

9. সার্ভার `PendingGame`-এর পরিবর্তন চিহ্নিত করে, কিন্তু কিছু করে না কারণ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) মিথ্যা।

10. ক্লায়েন্টে [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) প্লেয়ারের অ্যাড্রেসের জন্য `PlayerGame` এন্ট্রিতে সেট করা হয়। যখন `PlayerGame` পরিবর্তিত হয়, তখন `gameRecord`-ও পরিবর্তিত হয়।

11. যদি `gameRecord`-এ একটি মান থাকে এবং গেমটি জেতা বা হারা না হয়ে থাকে, তাহলে ক্লায়েন্ট [ম্যাপটি প্রদর্শন করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)।

#### খনন করুন {#dig-flow}

1. প্লেয়ার [ম্যাপ সেলের বোতামে ক্লিক করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), যা [`dig` ফাংশনটিকে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) কল করে। এই ফাংশনটি [অনচেইনে `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) কল করে।

2. অনচেইন কম্পোনেন্ট [অনেকগুলো স্যানিটি চেক করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), এবং সফল হলে ডিগ অনুরোধটি [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)-এ যোগ করে।

3. সার্ভার [`PendingDig`-এ পরিবর্তন সনাক্ত করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)। [যদি এটি বৈধ হয়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), এটি ফলাফল এবং এটি বৈধ হওয়ার একটি প্রমাণ উভয়ই তৈরি করতে [জিরো-নলেজ কোডটিকে কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (নীচে ব্যাখ্যা করা হয়েছে)।

4. [সার্ভার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) অনচেইনে [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) কল করে।

5. `digResponse` দুটি কাজ করে। প্রথমত, এটি [জিরো-নলেজ প্রুফ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) পরীক্ষা করে। তারপর, যদি প্রমাণটি সঠিক হয়, তবে এটি আসলে ফলাফল প্রক্রিয়া করার জন্য [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) কল করে।

6. `processDigResult` পরীক্ষা করে যে গেমটি [হেরে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) গেছে নাকি [জিতে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) গেছে, এবং [অনচেইন ম্যাপ `Map` আপডেট করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)।

7. ক্লায়েন্ট স্বয়ংক্রিয়ভাবে আপডেটগুলি তুলে নেয় এবং [প্লেয়ারকে দেখানো ম্যাপ আপডেট করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), এবং প্রযোজ্য হলে প্লেয়ারকে জানায় যে এটি একটি জয় নাকি হার।

## Zokrates ব্যবহার {#using-zokrates}

উপরে ব্যাখ্যা করা ফ্লোগুলিতে আমরা জিরো-নলেজ অংশগুলি এড়িয়ে গেছি, সেগুলিকে একটি ব্ল্যাক বক্স হিসাবে বিবেচনা করেছি। এখন আসুন এটি খুলে দেখি এবং দেখি কিভাবে সেই কোডটি লেখা হয়েছে।

### ম্যাপ হ্যাশিং {#hashing-map}

আমরা [এই জাভাস্ক্রিপ্ট কোডটি](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) ব্যবহার করে [পসেইডন](https://www.poseidon-hash.info) ইমপ্লিমেন্ট করতে পারি, যা আমরা Zokrates হ্যাস ফাংশন হিসাবে ব্যবহার করি। তবে, যদিও এটি দ্রুততর হবে, এটি Zokrates হ্যাস ফাংশন ব্যবহার করার চেয়ে আরও জটিল হবে। এটি একটি টিউটোরিয়াল, তাই কোডটি পারফরম্যান্সের জন্য নয়, সরলতার জন্য অপ্টিমাইজ করা হয়েছে। অতএব, আমাদের দুটি ভিন্ন Zokrates প্রোগ্রামের প্রয়োজন, একটি ম্যাপের হ্যাস (`হ্যাস`) গণনা করার জন্য এবং অন্যটি ম্যাপের একটি অবস্থানে খননের ফলাফলের জিরো-নলেজ প্রুফ (`ডিগ`) তৈরি করার জন্য।

### হ্যাস ফাংশন {#hash-function}

এটি সেই ফাংশন যা একটি ম্যাপের হ্যাস গণনা করে। আমরা এই কোডটি লাইন বাই লাইন আলোচনা করব।

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

এই দুটি লাইন [Zokrates স্ট্যান্ডার্ড লাইব্রেরি](https://zokrates.github.io/toolbox/stdlib.html) থেকে দুটি ফাংশন ইম্পোর্ট করে। [প্রথম ফাংশনটি](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) একটি [পসেইডন হ্যাস](https://www.poseidon-hash.info/)। এটি একটি [`field` এলিমেন্ট](https://zokrates.github.io/language/types.html#field)-এর একটি অ্যারে নেয় এবং একটি `field` রিটার্ন করে।

Zokrates-এর ফিল্ড এলিমেন্ট সাধারণত 256 বিটের চেয়ে কম দীর্ঘ হয়, তবে খুব বেশি কম নয়। কোডটিকে সহজ করার জন্য, আমরা ম্যাপটিকে 512 বিট পর্যন্ত সীমাবদ্ধ রাখি এবং চারটি ফিল্ডের একটি অ্যারে হ্যাস করি, এবং প্রতিটি ফিল্ডে আমরা কেবল 128 বিট ব্যবহার করি। এই উদ্দেশ্যে [ `pack128` ফাংশনটি](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) 128 বিটের একটি অ্যারে একটি `field`-এ পরিবর্তন করে।

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

এই লাইনটি একটি ফাংশন সংজ্ঞা শুরু করে। `hashMap` `map` নামে একটি একক প্যারামিটার পায়, যা একটি দ্বি-মাত্রিক `bool`(ean) অ্যারে। ম্যাপের আকার `width+2` বাই `height+2`, যার কারণ [নীচে ব্যাখ্যা করা হয়েছে](#why-map-border)।

আমরা `${width+2}` এবং `${height+2}` ব্যবহার করতে পারি কারণ Zokrates প্রোগ্রামগুলি এই অ্যাপ্লিকেশনে [টেমপ্লেট স্ট্রিং](https://www.w3schools.com/js/js_string_templates.asp) হিসাবে সংরক্ষণ করা হয়। `${` এবং `}` এর মধ্যে কোড জাভাস্ক্রিপ্ট দ্বারা মূল্যায়ন করা হয়, এবং এইভাবে প্রোগ্রামটি বিভিন্ন ম্যাপ আকারের জন্য ব্যবহার করা যেতে পারে। ম্যাপ প্যারামিটারটির চারপাশে এক অবস্থান প্রশস্ত বর্ডার রয়েছে যেখানে কোনো বোমা নেই, যা আমাদের প্রস্থ এবং উচ্চতায় দুই যোগ করার কারণ।

রিটার্ন ভ্যালু হলো একটি `field` যা হ্যাস ধারণ করে।

```
   bool[512] mut map1d = [false; 512];
```

ম্যাপটি দ্বি-মাত্রিক। তবে, `pack128` ফাংশনটি দ্বি-মাত্রিক অ্যারের সাথে কাজ করে না। তাই আমরা প্রথমে ম্যাপটিকে একটি 512-বাইট অ্যারে, `map1d` ব্যবহার করে ফ্ল্যাটেন করি। ডিফল্টরূপে Zokrates ভেরিয়েবলগুলি ধ্রুবক, কিন্তু আমাদের একটি লুপে এই অ্যারেতে মান নির্ধারণ করতে হবে, তাই আমরা এটিকে [`mut`](https://zokrates.github.io/language/variables.html#mutability) হিসাবে সংজ্ঞায়িত করি।

আমাদের অ্যারেটি ইনিশিয়ালাইজ করতে হবে কারণ Zokrates-এ `undefined` নেই। `[false; 512]` এক্সপ্রেশনটির অর্থ [512 `false` মানের একটি অ্যারে](https://zokrates.github.io/language/types.html#declaration-and-initialization)।

```
   u32 mut counter = 0;
```

আমাদের একটি কাউন্টারও প্রয়োজন `map1d`-এ যে বিটগুলি আমরা ইতিমধ্যেই পূরণ করেছি এবং যেগুলি এখনও করিনি তার মধ্যে পার্থক্য করার জন্য।

```
   for u32 x in 0..${width+2} {
```

এটি Zokrates-এ একটি [`for` লুপ](https://zokrates.github.io/language/control_flow.html#for-loops) ঘোষণা করার উপায়। একটি Zokrates `for` লুপের অবশ্যই নির্দিষ্ট সীমা থাকতে হবে, কারণ যদিও এটি একটি লুপের মতো দেখায়, কম্পাইলার আসলে এটিকে "unrolls" করে। `${width+2}` এক্সপ্রেশনটি একটি কম্পাইল টাইম ধ্রুবক কারণ `width` টাইপস্ক্রিপ্ট কোড দ্বারা কম্পাইলার কল করার আগে সেট করা হয়।

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

ম্যাপের প্রতিটি অবস্থানের জন্য, সেই মানটি `map1d` অ্যারেতে রাখুন এবং কাউন্টার বাড়ান।

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` `map1d` থেকে চারটি `field` মানের একটি অ্যারে তৈরি করতে ব্যবহৃত হয়। Zokrates-এ `array[a..b]` মানে অ্যারের সেই স্লাইস যা `a` তে শুরু হয় এবং `b-1` এ শেষ হয়।

```
    return poseidon(hashMe);
}
```

এই অ্যারেটিকে একটি হ্যাসে রূপান্তর করতে `poseidon` ব্যবহার করুন।

### হ্যাস প্রোগ্রাম {#hash-program}

সার্ভারকে গেম আইডেন্টিফায়ার তৈরি করার জন্য সরাসরি `hashMap` কল করতে হবে। তবে, Zokrates শুরু করার জন্য একটি প্রোগ্রামে শুধুমাত্র `main` ফাংশন কল করতে পারে, তাই আমরা একটি প্রোগ্রাম তৈরি করি যার `main` হ্যাস ফাংশন কল করে।

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### খনন প্রোগ্রাম {#dig-program}

এটি অ্যাপ্লিকেশনের জিরো-নলেজ অংশের মূল, যেখানে আমরা খনন ফলাফলের যাচাইয়ের জন্য ব্যবহৃত প্রমাণগুলি তৈরি করি।

```
${hashFragment}

// অবস্থান (x,y) তে মাইনের সংখ্যা
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### ম্যাপ বর্ডার কেন {#why-map-border}

জিরো-নলেজ প্রুফ [অ্যারিথমেটিক সার্কিট](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) ব্যবহার করে, যার `if` স্টেটমেন্টের সহজ সমতুল্য নেই। পরিবর্তে, তারা [কন্ডিশনাল অপারেটরের](https://en.wikipedia.org/wiki/Ternary_conditional_operator) সমতুল্য ব্যবহার করে। যদি `a` শূন্য বা এক হতে পারে, তাহলে আপনি `if a { b } else { c }`-কে `ab+(1-a)c` হিসাবে গণনা করতে পারেন।

এই কারণে, একটি Zokrates `if` স্টেটমেন্ট সর্বদা উভয় শাখা মূল্যায়ন করে। উদাহরণস্বরূপ, যদি আপনার কাছে এই কোডটি থাকে:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

এটি ত্রুটি দেখাবে, কারণ এটিকে `arr[10]` গণনা করতে হবে, যদিও সেই মানটি পরে শূন্য দ্বারা গুণ করা হবে।

এই কারণেই আমাদের ম্যাপের চারপাশে এক অবস্থান প্রশস্ত বর্ডার প্রয়োজন। আমাদের একটি অবস্থানের চারপাশে মোট মাইনের সংখ্যা গণনা করতে হবে, এবং এর অর্থ হল আমাদের সেই অবস্থানের উপরের এবং নীচের সারি, বাম এবং ডান দিকের অবস্থানটি দেখতে হবে, যেখানে আমরা খনন করছি। যার অর্থ হল Zokrates কে দেওয়া ম্যাপ অ্যারেতে সেই অবস্থানগুলি থাকতে হবে।

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

ডিফল্টরূপে Zokrates প্রমাণগুলি তাদের ইনপুটগুলি অন্তর্ভুক্ত করে। একটি স্পটের চারপাশে পাঁচটি মাইন আছে তা জানার কোনো লাভ নেই যদি না আপনি আসলে জানেন যে এটি কোন স্পট (এবং আপনি এটিকে আপনার অনুরোধের সাথে মেলাতে পারবেন না, কারণ তাহলে প্রুভার বিভিন্ন মান ব্যবহার করতে পারে এবং আপনাকে সে সম্পর্কে না জানাতে পারে)। যাইহোক, আমাদের ম্যাপটি গোপন রাখতে হবে, যখন এটি Zokrates কে সরবরাহ করা হচ্ছে। সমাধান হল একটি `private` প্যারামিটার ব্যবহার করা, যা প্রমাণ দ্বারা প্রকাশ করা _হয় না_।

এটি অপব্যবহারের আরেকটি পথ খুলে দেয়। প্রুভার সঠিক স্থানাঙ্ক ব্যবহার করতে পারে, কিন্তু অবস্থানের চারপাশে যেকোনো সংখ্যক মাইন সহ একটি ম্যাপ তৈরি করতে পারে, এবং সম্ভবত সেই অবস্থানেই। এই অপব্যবহার রোধ করতে, আমরা জিরো-নলেজ প্রুফকে ম্যাপের হ্যাস অন্তর্ভুক্ত করতে বাধ্য করি, যা গেম আইডেন্টিফায়ার।

```
   return (hashMap(map),
```

এখানে রিটার্ন ভ্যালু হল একটি টাপল যা ম্যাপ হ্যাস অ্যারের পাশাপাশি খননের ফলাফল অন্তর্ভুক্ত করে।

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

যদি অবস্থানে বোমা থাকে তাহলে আমরা ২৫৫ একটি বিশেষ মান হিসাবে ব্যবহার করি।

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

যদি প্লেয়ার কোনো মাইনে আঘাত না করে, তাহলে অবস্থানের চারপাশের এলাকার মাইন সংখ্যা যোগ করুন এবং সেটি রিটার্ন করুন।

### টাইপস্ক্রিপ্ট থেকে Zokrates ব্যবহার {#using-zokrates-from-typescript}

Zokrates-এর একটি কমান্ড লাইন ইন্টারফেস রয়েছে, কিন্তু এই প্রোগ্রামে আমরা এটি [টাইপস্ক্রিপ্ট কোড](https://zokrates.github.io/toolbox/zokrates_js.html)-এ ব্যবহার করি।

Zokrates সংজ্ঞা ধারণকারী লাইব্রেরিটিকে [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) বলা হয়।

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates জাভাস্ক্রিপ্ট বাইন্ডিং](https://zokrates.github.io/toolbox/zokrates_js.html) ইম্পোর্ট করুন। আমাদের শুধুমাত্র [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) ফাংশনটি প্রয়োজন কারণ এটি একটি প্রমিজ রিটার্ন করে যা সমস্ত Zokrates সংজ্ঞাতে সমাধান হয়।

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates-এর মতোই, আমরাও শুধুমাত্র একটি ফাংশন এক্সপোর্ট করি, যা [অ্যাসিঙ্ক্রোনাস](https://www.w3schools.com/js/js_async.asp)-ও। যখন এটি অবশেষে রিটার্ন করে, তখন এটি বেশ কয়েকটি ফাংশন প্রদান করে যা আমরা নীচে দেখব।

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates ইনিশিয়ালাইজ করুন, লাইব্রেরি থেকে আমাদের প্রয়োজনীয় সবকিছু পান।

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

এরপর আমাদের কাছে হ্যাস ফাংশন এবং উপরে দেখা দুটি Zokrates প্রোগ্রাম রয়েছে।

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

এখানে আমরা সেই প্রোগ্রামগুলি কম্পাইল করি।

```typescript
// জিরো-নলেজ ভেরিফিকেশনের জন্য কী তৈরি করুন।
// একটি প্রোডাকশন সিস্টেমে আপনি একটি সেটআপ সেরিমনি ব্যবহার করতে চাইবেন।
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

একটি প্রোডাকশন সিস্টেমে আমরা আরও জটিল [সেটআপ অনুষ্ঠান](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ব্যবহার করতে পারি, কিন্তু একটি প্রদর্শনের জন্য এটি যথেষ্ট ভালো। ব্যবহারকারীরা প্রোভার কী জানতে পারলেও এটি কোনো সমস্যা নয় - তারা এখনও এটি ব্যবহার করে জিনিস প্রমাণ করতে পারবে না যদি না সেগুলি সত্য হয়। যেহেতু আমরা এন্ট্রপি (দ্বিতীয় প্যারামিটার, `""`) নির্দিষ্ট করি, তাই ফলাফল সর্বদা একই হবে।

**দ্রষ্টব্য:** Zokrates প্রোগ্রাম কম্পাইল করা এবং কী তৈরি করা ধীর প্রক্রিয়া। প্রতিবার এটি পুনরাবৃত্তি করার প্রয়োজন নেই, শুধুমাত্র যখন ম্যাপের আকার পরিবর্তন হয়। একটি প্রোডাকশন সিস্টেমে আপনি এগুলি একবার করবেন এবং তারপর আউটপুট সংরক্ষণ করবেন। এখানে আমি এটি না করার একমাত্র কারণ হল সরলতার খাতিরে।

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) ফাংশনটি আসলে Zokrates প্রোগ্রাম চালায়। এটি দুটি ফিল্ড সহ একটি কাঠামো রিটার্ন করে: `output`, যা JSON স্ট্রিং হিসাবে প্রোগ্রামের আউটপুট, এবং `witness`, যা ফলাফলের জিরো-নলেজ প্রুফ তৈরির জন্য প্রয়োজনীয় তথ্য। এখানে আমাদের শুধু আউটপুট দরকার।

আউটপুটটি `"31337"` ফর্মের একটি স্ট্রিং, উদ্ধৃতি চিহ্নের মধ্যে একটি দশমিক সংখ্যা। কিন্তু `viem`-এর জন্য আমাদের যে আউটপুট প্রয়োজন তা হল `0x60A7` ফর্মের একটি হেক্সাডেসিমাল সংখ্যা। সুতরাং আমরা উদ্ধৃতি চিহ্নগুলি সরাতে `.slice(1,-1)` ব্যবহার করি এবং তারপরে বাকি স্ট্রিংটি, যা একটি দশমিক সংখ্যা, একটি [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)-এ পরিণত করতে `BigInt` ব্যবহার করি। `.toString(16)` এই `BigInt` কে একটি হেক্সাডেসিমাল স্ট্রিং-এ রূপান্তরিত করে, এবং `"0x"+` হেক্সাডেসিমাল সংখ্যার জন্য মার্কার যোগ করে।

```typescript
// খনন করুন এবং ফলাফলের জিরো-নলেজ প্রুফ রিটার্ন করুন
// (সার্ভার-সাইড কোড)
```

জিরো-নলেজ প্রুফের মধ্যে পাবলিক ইনপুট (`x` এবং `y`) এবং ফলাফল (ম্যাপের হ্যাস এবং বোমার সংখ্যা) অন্তর্ভুক্ত থাকে।

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates-এ কোনো ইনডেক্স সীমার বাইরে আছে কিনা তা পরীক্ষা করা একটি সমস্যা, তাই আমরা এটি এখানে করি।

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

ডিগ প্রোগ্রামটি চালান।

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) ব্যবহার করুন এবং প্রমাণটি রিটার্ন করুন।

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

একটি সলিডিটি ভেরিফায়ার, একটি স্মার্ট কন্ট্র্যাক্ট যা আমরা ব্লকচেইনে ডেপ্লয় করতে পারি এবং `digCompiled.program` দ্বারা উৎপাদিত প্রমাণগুলি যাচাই করতে ব্যবহার করতে পারি।

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

অবশেষে, অন্য কোডের যা কিছু প্রয়োজন হতে পারে তা রিটার্ন করুন।

## নিরাপত্তা পরীক্ষা {#security-tests}

নিরাপত্তা পরীক্ষা গুরুত্বপূর্ণ কারণ একটি কার্যকারিতা বাগ অবশেষে নিজেকে প্রকাশ করবে। কিন্তু যদি অ্যাপ্লিকেশনটি অনিরাপদ হয়, তবে এটি সম্ভবত দীর্ঘ সময়ের জন্য লুকিয়ে থাকবে এবং তখনই প্রকাশ পাবে যখন কেউ প্রতারণা করে অন্যদের রিসোর্স নিয়ে পালিয়ে যাবে।

### অনুমতি {#permissions}

এই গেমে একটি সুবিধাপ্রাপ্ত সত্তা আছে, সেটি হলো সার্ভার। এটিই একমাত্র ব্যবহারকারী যে [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এর ফাংশনগুলি কল করতে পারে। আমরা [`cast`](https://book.getfoundry.sh/cast/) ব্যবহার করে যাচাই করতে পারি যে অনুমতিপ্রাপ্ত ফাংশনগুলিতে কলগুলি শুধুমাত্র সার্ভার অ্যাকাউন্ট হিসাবেই অনুমোদিত।

[সার্ভারের প্রাইভেট কী `setupNetwork.ts`-এ রয়েছে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)।

1. `anvil` (ব্লকচেইন) চালানো কম্পিউটারে, এই এনভায়রনমেন্ট ভেরিয়েবলগুলি সেট করুন।

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. একটি অননুমোদিত অ্যাড্রেস হিসাবে ভেরিফায়ার অ্যাড্রেস সেট করার চেষ্টা করতে `cast` ব্যবহার করুন।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` শুধুমাত্র একটি ব্যর্থতা রিপোর্ট করে না, বরং আপনি ব্রাউজারে গেমের **MUD Dev Tools** খুলতে পারেন, **Tables** ক্লিক করুন, এবং **app\_\_VerifierAddress** নির্বাচন করুন। দেখুন যে অ্যাড্রেসটি শূন্য নয়।

3. সার্ভারের অ্যাড্রেস হিসাবে ভেরিফায়ার অ্যাড্রেস সেট করুন।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress**-এর অ্যাড্রেস এখন শূন্য হওয়া উচিত।

একই `সিস্টেম`-এর সমস্ত MUD ফাংশন একই অ্যাক্সেস কন্ট্রোলের মধ্য দিয়ে যায়, তাই আমি এই পরীক্ষাটিকে যথেষ্ট মনে করি। যদি আপনি না করেন, আপনি [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এর অন্যান্য ফাংশনগুলি পরীক্ষা করতে পারেন।

### জিরো-নলেজ অপব্যবহার {#zero-knowledge-abuses}

Zokrates যাচাই করার জন্য গণিত এই টিউটোরিয়ালের আওতার বাইরে (এবং আমার ক্ষমতার বাইরে)। তবে, আমরা জিরো-নলেজ কোডের উপর বিভিন্ন পরীক্ষা চালাতে পারি যাতে এটি সঠিকভাবে না করা হলে এটি ব্যর্থ হয় তা যাচাই করা যায়। এই সমস্ত পরীক্ষার জন্য আমাদের [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) পরিবর্তন করতে হবে এবং পুরো অ্যাপ্লিকেশনটি পুনরায় চালু করতে হবে। সার্ভার প্রক্রিয়া পুনরায় চালু করা যথেষ্ট নয়, কারণ এটি অ্যাপ্লিকেশনটিকে একটি অসম্ভব স্টেটে ফেলে দেয় (খেলোয়াড়ের একটি গেম চলছে, কিন্তু গেমটি আর সার্ভারের কাছে উপলব্ধ নয়)।

#### ভুল উত্তর {#wrong-answer}

সবচেয়ে সহজ সম্ভাবনা হল জিরো-নলেজ প্রুফে ভুল উত্তর প্রদান করা। এটি করার জন্য, আমরা `zkDig`-এর ভিতরে যাই এবং [লাইন 91 পরিবর্তন করি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

এর মানে হল আমরা সবসময় দাবি করব যে একটি বোমা আছে, সঠিক উত্তর নির্বিশেষে। এই সংস্করণটি নিয়ে খেলার চেষ্টা করুন, এবং আপনি `pnpm dev` স্ক্রিনের **সার্ভার** ট্যাবে এই ত্রুটিটি দেখতে পাবেন:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

তাই এই ধরনের প্রতারণা ব্যর্থ হয়।

#### ভুল প্রমাণ {#wrong-proof}

যদি আমরা সঠিক তথ্য প্রদান করি, কিন্তু ভুল প্রমাণের ডেটা রাখি তাহলে কী হবে? এখন, লাইন 91 প্রতিস্থাপন করুন:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

এটি এখনও ব্যর্থ হয়, কিন্তু এখন এটি কারণ ছাড়াই ব্যর্থ হয় কারণ এটি ভেরিফায়ার কলের সময় ঘটে।

### একজন ব্যবহারকারী কিভাবে জিরো ট্রাস্ট কোড যাচাই করতে পারে? {#user-verify-zero-trust}

স্মার্ট কন্ট্র্যাক্ট যাচাই করা তুলনামূলকভাবে সহজ। সাধারণত, ডেভেলপার সোর্স কোডটি একটি ব্লক এক্সপ্লোরারে প্রকাশ করে, এবং ব্লক এক্সপ্লোরার যাচাই করে যে সোর্স কোডটি [কন্ট্র্যাক্ট ডেপ্লয়মেন্ট ট্রানজ্যাকশনে](/developers/docs/smart-contracts/deploying/) থাকা কোডে কম্পাইল হয় কিনা। MUD `সিস্টেম`-এর ক্ষেত্রে এটি [সামান্য জটিল](https://mud.dev/cli/verify), কিন্তু খুব বেশি নয়।

জিরো-নলেজের ক্ষেত্রে এটি আরও কঠিন। ভেরিফায়ার কিছু ধ্রুবক অন্তর্ভুক্ত করে এবং সেগুলির উপর কিছু গণনা চালায়। এটি আপনাকে বলে না যে কী প্রমাণ করা হচ্ছে।

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

সমাধান, অন্ততপক্ষে ব্লক এক্সপ্লোরাররা তাদের ব্যবহারকারী ইন্টারফেসে জোকরেটস যাচাইকরণ যোগ না করা পর্যন্ত, অ্যাপ্লিকেশন ডেভেলপারদের জন্য জোকরেটস প্রোগ্রামগুলি উপলব্ধ করা, এবং অন্তত কিছু ব্যবহারকারীর জন্য সেগুলিকে যথাযথ যাচাইকরণ কী দিয়ে নিজেদের কম্পাইল করা।

এটি করতে হলে:

1. [Zokrates ইনস্টল করুন](https://zokrates.github.io/gettingstarted.html)।

2. Zokrates প্রোগ্রাম দিয়ে একটি ফাইল তৈরি করুন, `dig.zok`। নীচের কোডটি ধরে নেয় যে আপনি আসল ম্যাপের আকার, 10x5, রেখেছেন।

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // The number of mines in location (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokrates কোড কম্পাইল করুন এবং যাচাইকরণ কী তৈরি করুন। যাচাইকরণ কীটি অবশ্যই আসল সার্ভারে ব্যবহৃত একই এন্ট্রপি দিয়ে তৈরি করতে হবে, [এক্ষেত্রে একটি খালি স্ট্রিং](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)।

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. আপনার নিজের সলিডিটি ভেরিফায়ার তৈরি করুন এবং যাচাই করুন যে এটি ব্লকচেইনের ভেরিফায়ারের সাথে কার্যকরীভাবে অভিন্ন (সার্ভার একটি মন্তব্য যোগ করে, তবে এটি গুরুত্বপূর্ণ নয়)।

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## ডিজাইন সিদ্ধান্ত {#design}

যেকোনো যথেষ্ট জটিল অ্যাপ্লিকেশনে প্রতিযোগী ডিজাইন লক্ষ্য থাকে যা ট্রেড-অফের প্রয়োজন হয়। আসুন কিছু ট্রেডঅফ এবং কেন বর্তমান সমাধানটি অন্যান্য বিকল্পের চেয়ে শ্রেয় তা দেখি।

### কেন জিরো-নলেজ {#why-zero-knowledge}

মাইনসুইপারের জন্য আপনার সত্যিই জিরো-নলেজ প্রয়োজন নেই। সার্ভার সবসময় ম্যাপ ধরে রাখতে পারে এবং গেম শেষ হলে সবকিছু প্রকাশ করতে পারে। তারপর, গেমের শেষে, স্মার্ট কন্ট্র্যাক্টটি ম্যাপ হ্যাস গণনা করতে পারে, যাচাই করতে পারে যে এটি মেলে কিনা এবং যদি না মেলে তবে সার্ভারকে শাস্তি দিতে পারে বা গেমটি পুরোপুরি উপেক্ষা করতে পারে।

আমি এই সহজ সমাধানটি ব্যবহার করিনি কারণ এটি শুধুমাত্র একটি নির্দিষ্ট শেষ স্টেট সহ ছোট গেমগুলির জন্য কাজ করে। যখন একটি গেম সম্ভাব্যভাবে অসীম হয় (যেমন [অটোনোমাস ওয়ার্ল্ডস](https://0xparc.org/blog/autonomous-worlds)-এর ক্ষেত্রে), তখন আপনার এমন একটি সমাধান প্রয়োজন যা স্টেটটি _প্রকাশ না করেই_ প্রমাণ করে।

একটি টিউটোরিয়াল হিসাবে এই নিবন্ধটির জন্য একটি ছোট এবং সহজে বোঝা যায় এমন একটি গেম প্রয়োজন ছিল, কিন্তু এই কৌশলটি দীর্ঘ গেমগুলির জন্য সবচেয়ে উপযোগী।

### কেন Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) একমাত্র জিরো-নলেজ লাইব্রেরি নয়, কিন্তু এটি একটি সাধারণ, [ইম্পারেটিভ](https://en.wikipedia.org/wiki/Imperative_programming) প্রোগ্রামিং ভাষার মতো এবং বুলিয়ান ভেরিয়েবল সমর্থন করে।

আপনার অ্যাপ্লিকেশনের জন্য, বিভিন্ন প্রয়োজনীয়তার সাথে, আপনি [Circum](https://docs.circom.io/getting-started/installation/) বা [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ব্যবহার করতে পছন্দ করতে পারেন।

### কখন Zokrates কম্পাইল করবেন {#when-compile-zokrates}

এই প্রোগ্রামে আমরা Zokrates প্রোগ্রামগুলি [প্রতিবার সার্ভার শুরু হওয়ার সময়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) কম্পাইল করি। এটি স্পষ্টতই রিসোর্সের অপচয়, কিন্তু এটি একটি টিউটোরিয়াল, যা সরলতার জন্য অপ্টিমাইজ করা হয়েছে।

যদি আমি একটি প্রোডাকশন-লেভেল অ্যাপ্লিকেশন লিখতাম, আমি পরীক্ষা করে দেখতাম যে আমার কাছে এই মাইনফিল্ড আকারে কম্পাইল করা জোকরেটস প্রোগ্রামগুলির একটি ফাইল আছে কিনা, এবং যদি থাকে তবে সেটি ব্যবহার করতাম। অনচেইনে একটি ভেরিফায়ার কন্ট্র্যাক্ট ডেপ্লয় করার ক্ষেত্রেও একই কথা প্রযোজ্য।

### ভেরিফায়ার এবং প্রোভার কী তৈরি করা {#key-creation}

[কী তৈরি করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) আরেকটি বিশুদ্ধ গণনা যা একটি নির্দিষ্ট মাইনফিল্ড আকারের জন্য একাধিকবার করার প্রয়োজন নেই। আবার, এটি শুধুমাত্র সরলতার খাতিরে একবার করা হয়।

এছাড়াও, আমরা [একটি সেটআপ অনুষ্ঠান](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ব্যবহার করতে পারতাম। একটি সেটআপ অনুষ্ঠানের সুবিধা হল যে জিরো-নলেজ প্রুফে প্রতারণা করার জন্য আপনার হয় এন্ট্রপি অথবা প্রতিটি অংশগ্রহণকারীর থেকে কিছু মধ্যবর্তী ফলাফলের প্রয়োজন। যদি অন্তত একজন অনুষ্ঠান অংশগ্রহণকারী সৎ হয় এবং সেই তথ্য মুছে ফেলে, তাহলে জিরো-নলেজ প্রমাণগুলি নির্দিষ্ট আক্রমণ থেকে নিরাপদ থাকে। তবে, তথ্য সর্বত্র থেকে মুছে ফেলা হয়েছে কিনা তা যাচাই করার জন্য _কোনো প্রক্রিয়া_ নেই। যদি জিরো-নলেজ প্রমাণগুলি অত্যন্ত গুরুত্বপূর্ণ হয়, তাহলে আপনি সেটআপ অনুষ্ঠানে অংশ নিতে চাইবেন।

এখানে আমরা [টাউ-এর পারপেচুয়াল পাওয়ার](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)-এর উপর নির্ভর করি, যেখানে কয়েক ডজন অংশগ্রহণকারী ছিল। এটি সম্ভবত যথেষ্ট নিরাপদ এবং অনেক সহজ। আমরা কী তৈরির সময় এন্ট্রপি যোগ করি না, যা ব্যবহারকারীদের জন্য [জিরো-নলেজ কনফিগারেশন যাচাই করা](#user-verify-zero-trust) সহজ করে তোলে।

### কোথায় যাচাই করবেন {#where-verification}

আমরা জিরো-নলেজ প্রমাণগুলি হয় অনচেইনে (যা গ্যাস খরচ করে) অথবা ক্লায়েন্টে ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) ব্যবহার করে) যাচাই করতে পারি। আমি প্রথমটি বেছে নিয়েছি, কারণ এটি আপনাকে একবার [ভেরিফায়ার যাচাই করতে](#user-verify-zero-trust) দেয় এবং তারপর বিশ্বাস করতে দেয় যে যতক্ষণ পর্যন্ত এর জন্য কন্ট্র্যাক্ট অ্যাড্রেস একই থাকে ততক্ষণ এটি পরিবর্তন হবে না। যদি ক্লায়েন্টে যাচাই করা হতো, তাহলে প্রতিবার ক্লায়েন্ট ডাউনলোড করার সময় আপনাকে পাওয়া কোডটি যাচাই করতে হতো।

এছাড়াও, যদিও এই গেমটি একক খেলোয়াড়ের, অনেক ব্লকচেইন গেম বহু-খেলোয়াড়ের হয়। অনচেইন যাচাইকরণ মানে আপনি শুধুমাত্র একবার জিরো-নলেজ প্রুফ যাচাই করবেন। এটি ক্লায়েন্টে করলে প্রতিটি ক্লায়েন্টকে স্বাধীনভাবে যাচাই করতে হবে।

### টাইপস্ক্রিপ্ট নাকি জোকরেটসে ম্যাপ ফ্ল্যাটেন করবেন? {#where-flatten}

সাধারণভাবে, যখন প্রসেসিং টাইপস্ক্রিপ্ট বা জোকরেটসে করা যেতে পারে, তখন টাইপস্ক্রিপ্টে করা ভালো, যা অনেক দ্রুত এবং জিরো-নলেজ প্রুফের প্রয়োজন হয় না। এই কারণেই, উদাহরণস্বরূপ, আমরা জোকরেটসকে হ্যাস সরবরাহ করি না এবং এটিকে এটি সঠিক কিনা তা যাচাই করতে বলি না। হ্যাশিং জোকরেটসের ভিতরে করতে হবে, কিন্তু রিটার্ন করা হ্যাস এবং অনচেইনের হ্যাসের মধ্যে মিল এর বাইরে হতে পারে।

তবে, আমরা এখনও [জোকরেটসে ম্যাপটিকে ফ্ল্যাটেন করি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), যেখানে আমরা এটি টাইপস্ক্রিপ্টে করতে পারতাম। কারণ হল যে অন্যান্য বিকল্পগুলি, আমার মতে, আরও খারাপ।

- জোকরেটস কোডে একটি বুলিয়ানের এক-মাত্রিক অ্যারে সরবরাহ করুন এবং দ্বি-মাত্রিক ম্যাপ পেতে `x*(height+2)
  +y`-এর মতো একটি এক্সপ্রেশন ব্যবহার করুন। এটি [কোডটিকে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) কিছুটা জটিল করে তুলবে, তাই আমি সিদ্ধান্ত নিয়েছি যে একটি টিউটোরিয়ালের জন্য পারফরম্যান্স লাভ মূল্যবান নয়।

- Zokrates-এ এক-মাত্রিক এবং দ্বি-মাত্রিক উভয় অ্যারে পাঠান। তবে, এই সমাধানে আমাদের কোনো লাভ নেই। জোকরেটস কোডটিকে যাচাই করতে হবে যে এটিকে দেওয়া এক-মাত্রিক অ্যারেটি সত্যিই দ্বি-মাত্রিক অ্যারের সঠিক উপস্থাপনা। তাই কোনো কর্মক্ষমতা লাভ হবে না।

- জোকরেটসে দ্বি-মাত্রিক অ্যারে ফ্ল্যাটেন করুন। এটি সবচেয়ে সহজ বিকল্প, তাই আমি এটি বেছে নিয়েছি।

### ম্যাপ কোথায় সংরক্ষণ করবেন {#where-store-maps}

এই অ্যাপ্লিকেশনে [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) কেবল মেমরিতে একটি ভেরিয়েবল। এর মানে হল যে যদি আপনার সার্ভার মারা যায় এবং পুনরায় চালু করার প্রয়োজন হয়, তবে এটিতে সংরক্ষিত সমস্ত তথ্য হারিয়ে যাবে। খেলোয়াড়রা কেবল তাদের গেম চালিয়ে যেতে অক্ষম হয় না, তারা এমনকি একটি নতুন গেম শুরু করতেও পারে না কারণ অনচেইন কম্পোনেন্ট মনে করে যে তাদের এখনও একটি গেম চলছে।

এটি একটি প্রোডাকশন সিস্টেমের জন্য স্পষ্টতই একটি খারাপ ডিজাইন, যেখানে আপনি এই তথ্য একটি ডেটাবেসে সংরক্ষণ করবেন। আমি এখানে একটি ভেরিয়েবল ব্যবহার করার একমাত্র কারণ হল এটি একটি টিউটোরিয়াল এবং সরলতাই প্রধান বিবেচনা।

## উপসংহার: কোন পরিস্থিতিতে এই কৌশলটি উপযুক্ত? {#conclusion}

সুতরাং, এখন আপনি জানেন কিভাবে এমন একটি সার্ভার দিয়ে একটি গেম লিখতে হয় যা গোপন স্টেট সংরক্ষণ করে যা অনচেইনে থাকার কথা নয়। কিন্তু কোন ক্ষেত্রে আপনার এটি করা উচিত? দুটি প্রধান বিবেচনা রয়েছে।

- _দীর্ঘ সময় ধরে চলা গেম_: [উপরে যেমন উল্লেখ করা হয়েছে](#why-zero-knowledge), একটি ছোট গেমে আপনি গেম শেষ হওয়ার পরে স্টেট প্রকাশ করতে পারেন এবং সবকিছু তখন যাচাই করতে পারেন। কিন্তু যখন গেমটি দীর্ঘ বা অনির্দিষ্ট সময় নেয় এবং স্টেটটি গোপন রাখতে হয় তখন এটি একটি বিকল্প নয়।

- _কিছু কেন্দ্রীকরণ গ্রহণযোগ্য_: জিরো-নলেজ প্রমাণগুলি সততা যাচাই করতে পারে, যে একটি সত্তা ফলাফল জাল করছে না। তারা যা করতে পারে না তা হল নিশ্চিত করা যে সত্তাটি এখনও উপলব্ধ থাকবে এবং মেসেজের উত্তর দেবে। যেসব পরিস্থিতিতে উপলব্ধতাও বিকেন্দ্রীভূত হতে হবে, সেখানে জিরো-নলেজ প্রমাণ একটি যথেষ্ট সমাধান নয় এবং আপনার [মাল্টি-পার্টি কম্পিউটেশন](https://en.wikipedia.org/wiki/Secure_multi-party_computation) প্রয়োজন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

### স্বীকৃতি {#acknowledgements}

- আলভারো আলোনসো এই নিবন্ধের একটি খসড়া পড়েছেন এবং জোকরেটস সম্পর্কে আমার কিছু ভুল বোঝাবুঝি দূর করেছেন।

যেকোনো অবশিষ্ট ত্রুটির জন্য আমি দায়ী।
