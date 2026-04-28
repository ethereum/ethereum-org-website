---
title: "একটি গোপন স্টেটের জন্য জিরো-নলেজ ব্যবহার করা"
description: "অনচেইন গেমগুলো সীমাবদ্ধ কারণ তারা কোনো গোপন তথ্য রাখতে পারে না। এই টিউটোরিয়ালটি পড়ার পর, একজন পাঠক জিরো-নলেজ প্রুফ এবং সার্ভার কম্পোনেন্টগুলোকে একত্রিত করে একটি গোপন স্টেট, অফচেইন, কম্পোনেন্ট সহ যাচাইযোগ্য গেম তৈরি করতে সক্ষম হবেন। একটি মাইনসুইপার গেম তৈরি করে এই কৌশলটি প্রদর্শন করা হবে।"
author: "ওরি পোমেরান্টজ"
tags: ["সার্ভার", "অফচেইন", "কেন্দ্রীভূত", "জিরো-নলেজ", "Zokrates", "MUD", "গোপনীয়তা"]
skill: advanced
breadcrumb: "ZK গোপন স্টেট"
lang: bn
published: 2025-03-15
---

_ব্লকচেইনে কোনো গোপনীয়তা নেই_। ব্লকচেইনে পোস্ট করা সবকিছু সবার পড়ার জন্য উন্মুক্ত। এটি প্রয়োজনীয়, কারণ ব্লকচেইন এমন একটি ব্যবস্থার ওপর ভিত্তি করে তৈরি যেখানে যে কেউ এটি যাচাই করতে পারে। তবে, গেমগুলো প্রায়ই গোপন স্টেটের ওপর নির্ভর করে। উদাহরণস্বরূপ, [মাইনসুইপার](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) গেমটির কোনো অর্থই থাকে না যদি আপনি শুধু একটি ব্লক এক্সপ্লোরার-এ গিয়ে ম্যাপটি দেখতে পান।

সবচেয়ে সহজ সমাধান হলো গোপন স্টেট ধরে রাখার জন্য একটি [সার্ভার কম্পোনেন্ট](/developers/tutorials/server-components/) ব্যবহার করা। তবে, আমরা ব্লকচেইন ব্যবহার করি গেম ডেভেলপারের প্রতারণা রোধ করার জন্য। আমাদের সার্ভার কম্পোনেন্টের সততা নিশ্চিত করতে হবে। সার্ভার স্টেটের একটি হ্যাস প্রদান করতে পারে এবং [জিরো-নলেজ প্রুফ](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) ব্যবহার করে প্রমাণ করতে পারে যে একটি চালের ফলাফল গণনা করতে ব্যবহৃত স্টেটটি সঠিক।

এই নিবন্ধটি পড়ার পর আপনি জানতে পারবেন কীভাবে এই ধরনের গোপন স্টেট ধারণকারী সার্ভার, স্টেট দেখানোর জন্য একটি ক্লায়েন্ট এবং এই দুটির মধ্যে যোগাযোগের জন্য একটি অনচেইন কম্পোনেন্ট তৈরি করতে হয়। আমরা যে প্রধান টুলগুলো ব্যবহার করব তা হলো:

| টুল | উদ্দেশ্য | যে সংস্করণে যাচাই করা হয়েছে |
| --- | --- | ---: |
| [Zokrates](https://zokrates.github.io/) | জিরো-নলেজ প্রুফ এবং তাদের যাচাইকরণ | 1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | সার্ভার এবং ক্লায়েন্ট উভয়ের জন্য প্রোগ্রামিং ভাষা | 5.4.2 |
| [Node](https://nodejs.org/en) | সার্ভার চালানো | 20.18.2 |
| [Viem](https://viem.sh/) | ব্লকচেইনের সাথে যোগাযোগ | 2.9.20 |
| [MUD](https://mud.dev/) | অনচেইন ডাটা ব্যবস্থাপনা | 2.0.12 |
| [React](https://react.dev/) | ক্লায়েন্ট ইউজার ইন্টারফেস | 18.2.0 |
| [Vite](https://vitejs.dev/) | ক্লায়েন্ট কোড সার্ভ করা | 4.2.1 |

## মাইনসুইপার উদাহরণ {#minesweeper}

[মাইনসুইপার](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) হলো এমন একটি গেম যেখানে মাইনফিল্ড সহ একটি গোপন ম্যাপ থাকে। খেলোয়াড় একটি নির্দিষ্ট স্থানে খনন করার সিদ্ধান্ত নেয়। যদি সেই স্থানে একটি মাইন থাকে, তবে গেম ওভার। অন্যথায়, খেলোয়াড় সেই স্থানের চারপাশের আটটি স্কোয়ারে থাকা মাইনের সংখ্যা জানতে পারে।

এই অ্যাপ্লিকেশনটি [MUD](https://mud.dev/) ব্যবহার করে লেখা হয়েছে, এটি এমন একটি ফ্রেমওয়ার্ক যা আমাদের একটি [কি-ভ্যালু ডাটাবেস](https://aws.amazon.com/nosql/key-value/) ব্যবহার করে অনচেইন ডাটা সংরক্ষণ করতে এবং অফচেইন কম্পোনেন্টগুলোর সাথে সেই ডাটা স্বয়ংক্রিয়ভাবে সিঙ্ক্রোনাইজ করতে দেয়। সিঙ্ক্রোনাইজেশন ছাড়াও, MUD এক্সেস কন্ট্রোল প্রদান করা সহজ করে তোলে এবং অন্যান্য ব্যবহারকারীদের পারমিশনলেস ভাবে আমাদের অ্যাপ্লিকেশন [সম্প্রসারণ](https://mud.dev/guides/extending-a-world) করতে দেয়।

### মাইনসুইপার উদাহরণটি চালানো {#running-minesweeper-example}

মাইনসুইপার উদাহরণটি চালাতে:

1. নিশ্চিত করুন যে আপনার [পূর্বশর্তগুলো ইনস্টল করা আছে](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), এবং [`mprocs`](https://github.com/pvolok/mprocs)।

2. রিপোজিটরিটি ক্লোন করুন।

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. প্যাকেজগুলো ইনস্টল করুন।

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   যদি `pnpm install` এর অংশ হিসেবে Foundry ইনস্টল করা হয়ে থাকে, তবে আপনাকে কমান্ড-লাইন শেলটি রিস্টার্ট করতে হবে।

4. কন্ট্রাক্টগুলো কম্পাইল করুন

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. প্রোগ্রামটি শুরু করুন (একটি [anvil](https://book.getfoundry.sh/anvil/) ব্লকচেইন সহ) এবং অপেক্ষা করুন।

   ```sh copy
   mprocs
   ```

   মনে রাখবেন যে স্টার্টআপ হতে অনেক সময় লাগে। অগ্রগতি দেখতে, প্রথমে ডাউন অ্যারো ব্যবহার করে _contracts_ ট্যাবে স্ক্রোল করুন যাতে MUD কন্ট্রাক্টগুলো ডিপ্লয় হতে দেখতে পান। যখন আপনি _Waiting for file changes…_ মেসেজটি পাবেন, তখন কন্ট্রাক্টগুলো ডিপ্লয় হয়ে গেছে এবং পরবর্তী অগ্রগতি _server_ ট্যাবে ঘটবে। সেখানে, আপনি _Verifier address: 0x...._ মেসেজটি পাওয়া পর্যন্ত অপেক্ষা করুন।

   যদি এই ধাপটি সফল হয়, তবে আপনি `mprocs` স্ক্রিনটি দেখতে পাবেন, যার বাম দিকে বিভিন্ন প্রসেস এবং ডান দিকে বর্তমানে নির্বাচিত প্রসেসের কনসোল আউটপুট থাকবে।

   ![The mprocs screen](./mprocs.png)

   যদি `mprocs` নিয়ে কোনো সমস্যা হয়, তবে আপনি চারটি প্রসেস ম্যানুয়ালি চালাতে পারেন, প্রতিটির জন্য আলাদা কমান্ড লাইন উইন্ডো ব্যবহার করে:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. এখন আপনি [ক্লায়েন্ট](http://localhost:3000)-এ ব্রাউজ করতে পারেন, **New Game**-এ ক্লিক করুন এবং খেলা শুরু করুন।

### টেবিলগুলো {#tables}

আমাদের অনচেইন [বেশ কয়েকটি টেবিল](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) প্রয়োজন।

- `Configuration`: এই টেবিলটি একটি সিঙ্গলটন, এর কোনো কি নেই এবং একটি মাত্র রেকর্ড আছে। এটি গেম কনফিগারেশন তথ্য ধরে রাখতে ব্যবহৃত হয়:
  - `height`: একটি মাইনফিল্ডের উচ্চতা
  - `width`: একটি মাইনফিল্ডের প্রস্থ
  - `numberOfBombs`: প্রতিটি মাইনফিল্ডে বোমার সংখ্যা
- `VerifierAddress`: এই টেবিলটিও একটি সিঙ্গলটন। এটি কনফিগারেশনের একটি অংশ, ভ্যালিডেটর কন্ট্রাক্টের এডড্রেস (`verifier`) ধরে রাখতে ব্যবহৃত হয়। আমরা এই তথ্যটি `Configuration` টেবিলে রাখতে পারতাম, কিন্তু এটি একটি ভিন্ন কম্পোনেন্ট, সার্ভার দ্বারা সেট করা হয়, তাই এটি একটি আলাদা টেবিলে রাখা সহজ।

- `PlayerGame`: কি হলো খেলোয়াড়ের এডড্রেস। ডাটা হলো:

  - `gameId`: 32-বাইট ভ্যালু যা খেলোয়াড় যে ম্যাপে খেলছে তার হ্যাস (গেম আইডেন্টিফায়ার)।
  - `win`: একটি বুলিয়ান যা নির্দেশ করে খেলোয়াড় গেমটি জিতেছে কিনা।
  - `lose`: একটি বুলিয়ান যা নির্দেশ করে খেলোয়াড় গেমটি হেরেছে কিনা।
  - `digNumber`: গেমে সফল খননের সংখ্যা।

- `GamePlayer`: এই টেবিলটি রিভার্স ম্যাপিং ধরে রাখে, `gameId` থেকে খেলোয়াড়ের এডড্রেস পর্যন্ত।

- `Map`: কি হলো তিনটি ভ্যালুর একটি টুপল:

  - `gameId`: 32-বাইট ভ্যালু যা খেলোয়াড় যে ম্যাপে খেলছে তার হ্যাস (গেম আইডেন্টিফায়ার)।
  - `x` স্থানাঙ্ক
  - `y` স্থানাঙ্ক

  ভ্যালুটি একটি একক সংখ্যা। যদি একটি বোমা শনাক্ত করা হয় তবে এটি 255। অন্যথায়, এটি সেই স্থানের চারপাশের বোমার সংখ্যা যোগ এক। আমরা শুধু বোমার সংখ্যা ব্যবহার করতে পারি না, কারণ ডিফল্টভাবে ইথিরিয়াম ভার্চুয়াল মেশিন-এর সমস্ত স্টোরেজ এবং MUD-এর সমস্ত সারির ভ্যালু শূন্য থাকে। আমাদের "খেলোয়াড় এখনও এখানে খনন করেনি" এবং "খেলোয়াড় এখানে খনন করেছে, এবং দেখেছে চারপাশে শূন্যটি বোমা আছে" এর মধ্যে পার্থক্য করতে হবে।

এছাড়া, ক্লায়েন্ট এবং সার্ভারের মধ্যে যোগাযোগ অনচেইন কম্পোনেন্টের মাধ্যমে ঘটে। এটিও টেবিল ব্যবহার করে বাস্তবায়িত হয়।

- `PendingGame`: একটি নতুন গেম শুরু করার জন্য আনসার্ভিসড রিকোয়েস্ট।
- `PendingDig`: একটি নির্দিষ্ট গেমে একটি নির্দিষ্ট স্থানে খনন করার জন্য আনসার্ভিসড রিকোয়েস্ট। এটি একটি [অফচেইন টেবিল](https://mud.dev/store/tables#types-of-tables), যার মানে এটি ইথিরিয়াম ভার্চুয়াল মেশিন স্টোরেজে লেখা হয় না, এটি শুধুমাত্র ইভেন্ট ব্যবহার করে অফচেইন পড়া যায়।

### এক্সিকিউশন এবং ডাটা ফ্লো {#execution-data-flows}

এই ফ্লো-গুলো ক্লায়েন্ট, অনচেইন কম্পোনেন্ট এবং সার্ভারের মধ্যে এক্সিকিউশন সমন্বয় করে।

#### ইনিশিয়ালাইজেশন {#initialization-flow}

যখন আপনি `mprocs` চালান, তখন এই ধাপগুলো ঘটে:

1. [`mprocs`](https://github.com/pvolok/mprocs) চারটি কম্পোনেন্ট চালায়:

   - [Anvil](https://book.getfoundry.sh/anvil/), যা একটি লোকাল ব্লকচেইন চালায়
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), যা MUD-এর জন্য কন্ট্রাক্টগুলো কম্পাইল (যদি প্রয়োজন হয়) এবং ডিপ্লয় করে
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), যা ওয়েব ব্রাউজারগুলোতে UI এবং ক্লায়েন্ট কোড সার্ভ করার জন্য [Vite](https://vitejs.dev/) চালায়।
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), যা সার্ভারের কাজগুলো সম্পাদন করে

2. `contracts` প্যাকেজটি MUD কন্ট্রাক্টগুলো ডিপ্লয় করে এবং তারপর [`PostDeploy.s.sol` স্ক্রিপ্টটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) চালায়। এই স্ক্রিপ্টটি কনফিগারেশন সেট করে। গিটহাবের কোডটি [আটটি মাইন সহ একটি 10x5 মাইনফিল্ড](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) নির্দিষ্ট করে।

3. [সার্ভারটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD সেট আপ করার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) মাধ্যমে শুরু হয়। অন্যান্য বিষয়ের মধ্যে, এটি ডাটা সিঙ্ক্রোনাইজেশন সক্রিয় করে, যাতে প্রাসঙ্গিক টেবিলগুলোর একটি কপি সার্ভারের মেমোরিতে থাকে।

4. সার্ভার একটি ফাংশন সাবস্ক্রাইব করে যা [যখন `Configuration` টেবিল পরিবর্তিত হয়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) তখন এক্সিকিউট হবে। `PostDeploy.s.sol` এক্সিকিউট হওয়ার এবং টেবিলটি পরিবর্তন করার পর [এই ফাংশনটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) কল করা হয়।

5. যখন সার্ভার ইনিশিয়ালাইজেশন ফাংশনটি কনফিগারেশন পায়, তখন এটি [সার্ভারের জিরো-নলেজ অংশটি](#using-zokrates-from-typescript) ইনিশিয়ালাইজ করার জন্য [`zkFunctions` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)। কনফিগারেশন না পাওয়া পর্যন্ত এটি ঘটতে পারে না কারণ জিরো-নলেজ ফাংশনগুলোতে মাইনফিল্ডের প্রস্থ এবং উচ্চতা ধ্রুবক হিসেবে থাকতে হয়।

6. সার্ভারের জিরো-নলেজ অংশটি ইনিশিয়ালাইজ হওয়ার পর, পরবর্তী ধাপ হলো [ব্লকচেইনে জিরো-নলেজ ভেরিফিকেশন কন্ট্রাক্ট ডিপ্লয় করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) এবং MUD-এ ভেরিফাই এডড্রেস সেট করা।

7. সবশেষে, আমরা আপডেটের জন্য সাবস্ক্রাইব করি যাতে আমরা দেখতে পারি কখন একজন খেলোয়াড় [একটি নতুন গেম শুরু করার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) বা [একটি বিদ্যমান গেমে খনন করার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) রিকোয়েস্ট করে।

#### নতুন গেম {#new-game-flow}

যখন খেলোয়াড় একটি নতুন গেমের রিকোয়েস্ট করে তখন এটি ঘটে।

1. যদি এই খেলোয়াড়ের জন্য কোনো গেম চলমান না থাকে, বা একটি থাকে কিন্তু তার gameId শূন্য হয়, তবে ক্লায়েন্ট একটি [নতুন গেম বোতাম](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) প্রদর্শন করে। যখন ব্যবহারকারী এই বোতামটি চাপে, [React `newGame` ফাংশনটি চালায়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)।

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) হলো একটি `System` কল। MUD-এ সমস্ত কল `World` কন্ট্রাক্টের মাধ্যমে রাউট করা হয়, এবং বেশিরভাগ ক্ষেত্রে আপনি `<namespace>__<function name>` কল করেন। এই ক্ষেত্রে, কলটি হলো `app__newGame`-এ, যা MUD তারপর [`GameSystem`-এর `newGame`-এ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) রাউট করে।

3. অনচেইন ফাংশনটি চেক করে যে খেলোয়াড়ের কোনো গেম চলমান নেই, এবং যদি না থাকে তবে [রিকোয়েস্টটি `PendingGame` টেবিলে যোগ করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)।

4. সার্ভার `PendingGame`-এ পরিবর্তন শনাক্ত করে এবং [সাবস্ক্রাইব করা ফাংশনটি চালায়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)। এই ফাংশনটি [`newGame` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), যা আবার [`createGame` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)।

5. `createGame` প্রথম যে কাজটি করে তা হলো [উপযুক্ত সংখ্যক মাইন সহ একটি র‍্যান্ডম ম্যাপ তৈরি করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)। তারপর, এটি ফাঁকা বর্ডার সহ একটি ম্যাপ তৈরি করতে [`makeMapBorders` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166), যা Zokrates-এর জন্য প্রয়োজনীয়। সবশেষে, `createGame` ম্যাপের হ্যাস পেতে [`calculateMapHash`](#calculateMapHash) কল করে, যা গেম আইডি হিসেবে ব্যবহৃত হয়।

6. `newGame` ফাংশনটি নতুন গেমটিকে `gamesInProgress`-এ যোগ করে।

7. সার্ভার শেষ যে কাজটি করে তা হলো [`app__newGameResponse` কল করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), যা অনচেইন। এক্সেস কন্ট্রোল সক্ষম করতে এই ফাংশনটি একটি ভিন্ন `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এ রয়েছে। এক্সেস কন্ট্রোল [MUD কনফিগারেশন ফাইলে](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)-এ সংজ্ঞায়িত করা হয়েছে।

   এক্সেস লিস্ট শুধুমাত্র একটি একক এডড্রেসকে `System` কল করার অনুমতি দেয়। এটি সার্ভার ফাংশনগুলোতে এক্সেস একটি একক এডড্রেসে সীমাবদ্ধ করে, যাতে কেউ সার্ভারের ছদ্মবেশ ধারণ করতে না পারে।

8. অনচেইন কম্পোনেন্ট প্রাসঙ্গিক টেবিলগুলো আপডেট করে:

   - `PlayerGame`-এ গেমটি তৈরি করে।
   - `GamePlayer`-এ রিভার্স ম্যাপিং সেট করে।
   - `PendingGame` থেকে রিকোয়েস্টটি সরিয়ে দেয়।

9. সার্ভার `PendingGame`-এ পরিবর্তন শনাক্ত করে, কিন্তু কিছুই করে না কারণ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) ফলস।

10. ক্লায়েন্টে [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) খেলোয়াড়ের এডড্রেসের জন্য `PlayerGame` এন্ট্রিতে সেট করা হয়। যখন `PlayerGame` পরিবর্তিত হয়, তখন `gameRecord`-ও পরিবর্তিত হয়।

11. যদি `gameRecord`-এ কোনো ভ্যালু থাকে, এবং গেমটি জেতা বা হারা না হয়, তবে ক্লায়েন্ট [ম্যাপটি প্রদর্শন করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)।

#### খনন {#dig-flow}

1. খেলোয়াড় [ম্যাপ সেলের বোতামে ক্লিক করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), যা [`dig` ফাংশনটি কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)। এই ফাংশনটি [অনচেইন `dig` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)।

2. অনচেইন কম্পোনেন্ট [বেশ কয়েকটি স্যানিটি চেক সম্পাদন করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), এবং সফল হলে ডিগ রিকোয়েস্টটি [`PendingDig`-এ যোগ করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)।

3. সার্ভার [`PendingDig`-এ পরিবর্তন শনাক্ত করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)। [যদি এটি বৈধ হয়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), তবে এটি ফলাফল এবং এটি বৈধ হওয়ার একটি প্রুফ উভয়ই তৈরি করতে [জিরো-নলেজ কোড কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (নিচে ব্যাখ্যা করা হয়েছে)।

4. [সার্ভার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) অনচেইন [`digResponse` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)।

5. `digResponse` দুটি কাজ করে। প্রথমত, এটি [জিরো নলেজ প্রুফ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) চেক করে। তারপর, যদি প্রুফটি সঠিক হয়, তবে এটি আসলে ফলাফলটি প্রসেস করতে [`processDigResult` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86)।

6. `processDigResult` চেক করে যে গেমটি [হারা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) বা [জেতা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) হয়েছে কিনা, এবং [অনচেইন ম্যাপ, `Map` আপডেট করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)।

7. ক্লায়েন্ট স্বয়ংক্রিয়ভাবে আপডেটগুলো গ্রহণ করে এবং [খেলোয়াড়কে প্রদর্শিত ম্যাপটি আপডেট করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), এবং যদি প্রযোজ্য হয় তবে খেলোয়াড়কে জানায় যে এটি জয় নাকি পরাজয়।

## Zokrates ব্যবহার করা {#using-zokrates}

উপরে ব্যাখ্যা করা ফ্লো-গুলোতে আমরা জিরো-নলেজ অংশগুলো এড়িয়ে গেছি, সেগুলোকে একটি ব্ল্যাক বক্স হিসেবে বিবেচনা করে। এখন চলুন এটি খুলে দেখি এবং দেখি কীভাবে সেই কোডটি লেখা হয়েছে।

### ম্যাপ হ্যাসিং {#hashing-map}

আমরা [Poseidon](https://www.poseidon-hash.info), যে Zokrates হ্যাস ফাংশনটি আমরা ব্যবহার করি তা বাস্তবায়ন করতে [এই জাভাস্ক্রিপ্ট কোডটি](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) ব্যবহার করতে পারি। তবে, যদিও এটি দ্রুততর হবে, এটি শুধুমাত্র Zokrates হ্যাস ফাংশন ব্যবহার করার চেয়ে বেশি জটিলও হবে। এটি একটি টিউটোরিয়াল, এবং তাই কোডটি সরলতার জন্য অপ্টিমাইজ করা হয়েছে, পারফরম্যান্সের জন্য নয়। অতএব, আমাদের দুটি ভিন্ন Zokrates প্রোগ্রাম প্রয়োজন, একটি শুধুমাত্র একটি ম্যাপের হ্যাস গণনা করার জন্য (`hash`) এবং অন্যটি ম্যাপের একটি স্থানে খননের ফলাফলের একটি জিরো-নলেজ প্রুফ তৈরি করার জন্য (`dig`)।

### হ্যাস ফাংশন {#hash-function}

এটি সেই ফাংশন যা একটি ম্যাপের হ্যাস গণনা করে। আমরা এই কোডটি লাইন বাই লাইন দেখব।

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

এই দুটি লাইন [Zokrates স্ট্যান্ডার্ড লাইব্রেরি](https://zokrates.github.io/toolbox/stdlib.html) থেকে দুটি ফাংশন ইমপোর্ট করে। [প্রথম ফাংশনটি](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) হলো একটি [Poseidon হ্যাস](https://www.poseidon-hash.info/)। এটি [`field` এলিমেন্টগুলোর](https://zokrates.github.io/language/types.html#field) একটি অ্যারে নেয় এবং একটি `field` রিটার্ন করে।

Zokrates-এ ফিল্ড এলিমেন্ট সাধারণত 256 বিটের চেয়ে কম লম্বা হয়, তবে খুব বেশি নয়। কোডটি সহজ করার জন্য, আমরা ম্যাপটিকে 512 বিট পর্যন্ত সীমাবদ্ধ করি, এবং চারটি ফিল্ডের একটি অ্যারে হ্যাস করি, এবং প্রতিটি ফিল্ডে আমরা শুধুমাত্র 128 বিট ব্যবহার করি। [এই `pack128` ফাংশনটি](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) এই উদ্দেশ্যে 128 বিটের একটি অ্যারেকে একটি `field`-এ পরিবর্তন করে।

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

এই লাইনটি একটি ফাংশন ডেফিনিশন শুরু করে। `hashMap` `map` নামক একটি একক প্যারামিটার পায়, যা একটি দ্বিমাত্রিক `bool`(ean) অ্যারে। ম্যাপের আকার হলো `width+2` বাই `height+2` যে কারণগুলো [নিচে ব্যাখ্যা করা হয়েছে](#why-map-border)।

আমরা `${width+2}` এবং `${height+2}` ব্যবহার করতে পারি কারণ Zokrates প্রোগ্রামগুলো এই অ্যাপ্লিকেশনে [টেমপ্লেট স্ট্রিং](https://www.w3schools.com/js/js_string_templates.asp) হিসেবে সংরক্ষিত থাকে। `${` এবং `}` এর মধ্যবর্তী কোড জাভাস্ক্রিপ্ট দ্বারা মূল্যায়ন করা হয়, এবং এইভাবে প্রোগ্রামটি বিভিন্ন ম্যাপের আকারের জন্য ব্যবহার করা যেতে পারে। ম্যাপ প্যারামিটারের চারপাশে কোনো বোমা ছাড়াই একটি এক লোকেশন চওড়া বর্ডার রয়েছে, যে কারণে আমাদের প্রস্থ এবং উচ্চতায় দুই যোগ করতে হবে।

রিটার্ন ভ্যালু হলো একটি `field` যা হ্যাস ধারণ করে।

```
   bool[512] mut map1d = [false; 512];
```

ম্যাপটি দ্বিমাত্রিক। তবে, `pack128` ফাংশনটি দ্বিমাত্রিক অ্যারেগুলোর সাথে কাজ করে না। তাই আমরা প্রথমে `map1d` ব্যবহার করে ম্যাপটিকে একটি 512-বাইট অ্যারেতে ফ্ল্যাটেন করি। ডিফল্টভাবে Zokrates ভেরিয়েবলগুলো ধ্রুবক, কিন্তু আমাদের একটি লুপে এই অ্যারেতে ভ্যালু অ্যাসাইন করতে হবে, তাই আমরা এটিকে [`mut`](https://zokrates.github.io/language/variables.html#mutability) হিসেবে সংজ্ঞায়িত করি।

আমাদের অ্যারেটি ইনিশিয়ালাইজ করতে হবে কারণ Zokrates-এ `undefined` নেই। `[false; 512]` এক্সপ্রেশনটির অর্থ হলো [512টি `false` ভ্যালুর একটি অ্যারে](https://zokrates.github.io/language/types.html#declaration-and-initialization)।

```
   u32 mut counter = 0;
```

`map1d`-এ আমরা ইতিমধ্যে যে বিটগুলো পূরণ করেছি এবং যেগুলো করিনি তার মধ্যে পার্থক্য করার জন্য আমাদের একটি কাউন্টারও প্রয়োজন।

```
   for u32 x in 0..${width+2} {
```

এভাবেই আপনি Zokrates-এ একটি [`for` লুপ](https://zokrates.github.io/language/control_flow.html#for-loops) ডিক্লেয়ার করেন। একটি Zokrates `for` লুপের নির্দিষ্ট সীমা থাকতে হবে, কারণ যদিও এটি একটি লুপ বলে মনে হয়, কম্পাইলার আসলে এটিকে "আনরোল" করে। `${width+2}` এক্সপ্রেশনটি একটি কম্পাইল টাইম ধ্রুবক কারণ কম্পাইলারকে কল করার আগে টাইপস্ক্রিপ্ট কোড দ্বারা `width` সেট করা হয়।

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

ম্যাপের প্রতিটি লোকেশনের জন্য, সেই ভ্যালুটি `map1d` অ্যারেতে রাখুন এবং কাউন্টারটি বৃদ্ধি করুন।

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` থেকে চারটি `field` ভ্যালুর একটি অ্যারে তৈরি করতে `pack128`। Zokrates-এ `array[a..b]` মানে হলো অ্যারের সেই স্লাইস যা `a`-তে শুরু হয় এবং `b-1`-এ শেষ হয়।

```
    return poseidon(hashMe);
}
```

এই অ্যারেকে একটি হ্যাসে রূপান্তর করতে `poseidon` ব্যবহার করুন।

### হ্যাস প্রোগ্রাম {#hash-program}

গেম আইডেন্টিফায়ার তৈরি করতে সার্ভারকে সরাসরি `hashMap` কল করতে হবে। তবে, Zokrates শুধুমাত্র শুরু করার জন্য একটি প্রোগ্রামে `main` ফাংশন কল করতে পারে, তাই আমরা একটি `main` সহ একটি প্রোগ্রাম তৈরি করি যা হ্যাস ফাংশনটিকে কল করে।

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### ডিগ প্রোগ্রাম {#dig-program}

এটি অ্যাপ্লিকেশনের জিরো-নলেজ অংশের হৃদয়, যেখানে আমরা প্রুফগুলো তৈরি করি যা খননের ফলাফল যাচাই করতে ব্যবহৃত হয়।

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### ম্যাপ বর্ডার কেন {#why-map-border}

জিরো-নলেজ প্রুফগুলো [অ্যারিথমেটিক সার্কিট](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) ব্যবহার করে, যার একটি `if` স্টেটমেন্টের কোনো সহজ সমতুল্য নেই। এর পরিবর্তে, তারা [কন্ডিশনাল অপারেটরের](https://en.wikipedia.org/wiki/Ternary_conditional_operator) সমতুল্য ব্যবহার করে। যদি `a` শূন্য বা এক হতে পারে, তবে আপনি `if a { b } else { c }`-কে `ab+(1-a)c` হিসেবে গণনা করতে পারেন।

এই কারণে, একটি Zokrates `if` স্টেটমেন্ট সর্বদা উভয় শাখাকে মূল্যায়ন করে। উদাহরণস্বরূপ, যদি আপনার এই কোডটি থাকে:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

এটি এরর দেখাবে, কারণ এটিকে `arr[10]` গণনা করতে হবে, যদিও সেই ভ্যালুটি পরে শূন্য দ্বারা গুণ করা হবে।

এই কারণেই আমাদের ম্যাপের চারপাশে একটি এক লোকেশন চওড়া বর্ডার প্রয়োজন। আমাদের একটি লোকেশনের চারপাশের মোট মাইনের সংখ্যা গণনা করতে হবে, এবং এর মানে হলো আমরা যেখানে খনন করছি তার এক সারি উপরে এবং নিচে, বামে এবং ডানে লোকেশনটি দেখতে হবে। যার মানে হলো Zokrates-কে প্রদান করা ম্যাপ অ্যারেতে সেই লোকেশনগুলোর অস্তিত্ব থাকতে হবে।

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

ডিফল্টভাবে Zokrates প্রুফগুলো তাদের ইনপুটগুলো অন্তর্ভুক্ত করে। একটি স্পটের চারপাশে পাঁচটি মাইন আছে তা জেনে কোনো লাভ নেই যদি না আপনি আসলে জানেন যে স্পটটি কোনটি (এবং আপনি এটিকে শুধু আপনার রিকোয়েস্টের সাথে মেলাতে পারবেন না, কারণ তখন প্রুভার ভিন্ন ভ্যালু ব্যবহার করতে পারে এবং আপনাকে সে সম্পর্কে নাও বলতে পারে)। তবে, Zokrates-কে এটি প্রদান করার সময় আমাদের ম্যাপটিকে গোপন রাখতে হবে। সমাধান হলো একটি `private` প্যারামিটার ব্যবহার করা, যা প্রুফ দ্বারা প্রকাশ করা হয় _না_।

এটি অপব্যবহারের আরেকটি পথ খুলে দেয়। প্রুভার সঠিক স্থানাঙ্কগুলো ব্যবহার করতে পারে, কিন্তু লোকেশনের চারপাশে এবং সম্ভবত লোকেশনেই যেকোনো সংখ্যক মাইন সহ একটি ম্যাপ তৈরি করতে পারে। এই অপব্যবহার রোধ করতে, আমরা জিরো নলেজ প্রুফে ম্যাপের হ্যাস অন্তর্ভুক্ত করি, যা হলো গেম আইডেন্টিফায়ার।

```
   return (hashMap(map),
```

এখানকার রিটার্ন ভ্যালুটি হলো একটি টুপল যা ম্যাপ হ্যাস অ্যারের পাশাপাশি খননের ফলাফল অন্তর্ভুক্ত করে।

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

যদি লোকেশনেই একটি বোমা থাকে তবে আমরা 255-কে একটি বিশেষ ভ্যালু হিসেবে ব্যবহার করি।

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

যদি খেলোয়াড় কোনো মাইনে আঘাত না করে থাকে, তবে লোকেশনের চারপাশের এলাকার জন্য মাইন কাউন্ট যোগ করুন এবং তা রিটার্ন করুন।

### টাইপস্ক্রিপ্ট থেকে Zokrates ব্যবহার করা {#using-zokrates-from-typescript}

Zokrates-এর একটি কমান্ড লাইন ইন্টারফেস রয়েছে, কিন্তু এই প্রোগ্রামে আমরা এটি [টাইপস্ক্রিপ্ট কোডে](https://zokrates.github.io/toolbox/zokrates_js.html) ব্যবহার করি।

যে লাইব্রেরিতে Zokrates ডেফিনিশনগুলো রয়েছে তাকে [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) বলা হয়।

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates জাভাস্ক্রিপ্ট বাইন্ডিংগুলো](https://zokrates.github.io/toolbox/zokrates_js.html) ইমপোর্ট করুন। আমাদের শুধুমাত্র [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) ফাংশনটি প্রয়োজন কারণ এটি একটি প্রমিস রিটার্ন করে যা সমস্ত Zokrates ডেফিনিশনে রিজলভ হয়।

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates-এর মতোই, আমরাও শুধুমাত্র একটি ফাংশন এক্সপোর্ট করি, যা [অ্যাসিনক্রোনাসও](https://www.w3schools.com/js/js_async.asp) বটে। যখন এটি শেষ পর্যন্ত রিটার্ন করে, তখন এটি বেশ কয়েকটি ফাংশন প্রদান করে যা আমরা নিচে দেখব।

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates ইনিশিয়ালাইজ করুন, লাইব্রেরি থেকে আমাদের প্রয়োজনীয় সবকিছু পান।

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

এরপর আমাদের কাছে হ্যাস ফাংশন এবং উপরে দেখা দুটি Zokrates প্রোগ্রাম রয়েছে।

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

এখানে আমরা সেই প্রোগ্রামগুলো কম্পাইল করি।

```typescript
// জিরো-নলেজ যাচাইকরণের জন্য কি তৈরি করুন।
// একটি প্রোডাকশন সিস্টেমে আপনি একটি সেটআপ সেরিমনি ব্যবহার করতে চাইবেন।
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

একটি প্রোডাকশন সিস্টেমে আমরা আরও জটিল [সেটআপ সেরিমনি](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ব্যবহার করতে পারি, কিন্তু এটি একটি প্রদর্শনের জন্য যথেষ্ট ভালো। ব্যবহারকারীরা প্রুভার কি জানতে পারে তা কোনো সমস্যা নয় - তারা এখনও এটি ব্যবহার করে কিছু প্রমাণ করতে পারবে না যদি না সেগুলো সত্য হয়। যেহেতু আমরা এন্ট্রপি (দ্বিতীয় প্যারামিটার, `""`) নির্দিষ্ট করি, তাই ফলাফলগুলো সর্বদা একই হবে।

**দ্রষ্টব্য:** Zokrates প্রোগ্রামগুলোর কম্পাইলেশন এবং কি তৈরি করা ধীর প্রক্রিয়া। প্রতিবার এগুলো পুনরাবৃত্তি করার কোনো প্রয়োজন নেই, শুধুমাত্র যখন ম্যাপের আকার পরিবর্তিত হয় তখনই করতে হবে। একটি প্রোডাকশন সিস্টেমে আপনি এগুলো একবার করবেন, এবং তারপর আউটপুট সংরক্ষণ করবেন। আমি এখানে এটি না করার একমাত্র কারণ হলো সরলতা।

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) ফাংশনটি আসলে Zokrates প্রোগ্রামটি চালায়। এটি দুটি ফিল্ড সহ একটি স্ট্রাকচার রিটার্ন করে: `output`, যা একটি JSON স্ট্রিং হিসেবে প্রোগ্রামের আউটপুট, এবং `witness`, যা ফলাফলের একটি জিরো নলেজ প্রুফ তৈরি করার জন্য প্রয়োজনীয় তথ্য। এখানে আমাদের শুধু আউটপুট প্রয়োজন।

আউটপুটটি হলো `"31337"` ফর্মের একটি স্ট্রিং, যা কোটেশন মার্কের মধ্যে আবদ্ধ একটি ডেসিমাল সংখ্যা। কিন্তু `viem`-এর জন্য আমাদের যে আউটপুট প্রয়োজন তা হলো `0x60A7` ফর্মের একটি হেক্সাডেসিমাল সংখ্যা। তাই আমরা কোটেশন মার্কগুলো সরাতে `.slice(1,-1)` ব্যবহার করি এবং তারপর অবশিষ্ট স্ট্রিং, যা একটি ডেসিমাল সংখ্যা, সেটিকে একটি [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)-এ চালাতে `BigInt` ব্যবহার করি। `.toString(16)` এই `BigInt`-কে একটি হেক্সাডেসিমাল স্ট্রিংয়ে রূপান্তর করে, এবং `"0x"+` হেক্সাডেসিমাল সংখ্যার জন্য মার্কার যোগ করে।

```typescript
// খনন করুন এবং ফলাফলের একটি জিরো-নলেজ প্রুফ রিটার্ন করুন
// (সার্ভার-সাইড কোড)
```

জিরো নলেজ প্রুফে পাবলিক ইনপুটগুলো (`x` এবং `y`) এবং ফলাফলগুলো (ম্যাপের হ্যাস এবং বোমার সংখ্যা) অন্তর্ভুক্ত থাকে।

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates-এ কোনো ইনডেক্স সীমার বাইরে কিনা তা চেক করা একটি সমস্যা, তাই আমরা এটি এখানে করি।

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

ডিগ প্রোগ্রামটি এক্সিকিউট করুন।

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) ব্যবহার করুন এবং প্রুফটি রিটার্ন করুন।

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

একটি সলিডিটি ভ্যালিডেটর, একটি স্মার্ট কন্ট্রাক্ট যা আমরা ব্লকচেইনে ডিপ্লয় করতে পারি এবং `digCompiled.program` দ্বারা তৈরি প্রুফগুলো যাচাই করতে ব্যবহার করতে পারি।

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

সবশেষে, অন্যান্য কোডের প্রয়োজন হতে পারে এমন সবকিছু রিটার্ন করুন।

## সিকিউরিটি টেস্ট {#security-tests}

সিকিউরিটি টেস্টগুলো গুরুত্বপূর্ণ কারণ একটি ফাংশনালিটি বাগ শেষ পর্যন্ত নিজেকে প্রকাশ করবে। কিন্তু যদি অ্যাপ্লিকেশনটি অনিরাপদ হয়, তবে এটি সম্ভবত দীর্ঘ সময়ের জন্য লুকিয়ে থাকবে যতক্ষণ না কেউ প্রতারণা করে এবং অন্যদের সম্পদ নিয়ে পালিয়ে যায়।

### পারমিশন {#permissions}

এই গেমে একটি প্রিভিলেজড এনটিটি রয়েছে, সার্ভার। এটি একমাত্র ব্যবহারকারী যাকে [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এর ফাংশনগুলো কল করার অনুমতি দেওয়া হয়েছে। আমরা পারমিশনড ফাংশনগুলোতে কলগুলো শুধুমাত্র সার্ভার একাউন্ট হিসেবে অনুমোদিত কিনা তা যাচাই করতে [`cast`](https://book.getfoundry.sh/cast/) ব্যবহার করতে পারি।

[সার্ভারের প্রাইভেট কি `setupNetwork.ts`-এ রয়েছে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)।

1. যে কম্পিউটারে `anvil` (ব্লকচেইন) চলে, সেখানে এই এনভায়রনমেন্ট ভেরিয়েবলগুলো সেট করুন।

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. ভ্যালিডেটর এডড্রেসটিকে একটি অননুমোদিত এডড্রেস হিসেবে সেট করার চেষ্টা করতে `cast` ব্যবহার করুন।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   শুধুমাত্র `cast` একটি ব্যর্থতার রিপোর্টই করে না, বরং আপনি ব্রাউজারে গেমটিতে **MUD Dev Tools** খুলতে পারেন, **Tables**-এ ক্লিক করতে পারেন এবং **app\_\_VerifierAddress** নির্বাচন করতে পারেন। দেখুন যে এডড্রেসটি শূন্য নয়।

3. ভ্যালিডেটর এডড্রেসটিকে সার্ভারের এডড্রেস হিসেবে সেট করুন।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress**-এর এডড্রেসটি এখন শূন্য হওয়া উচিত।

একই `System`-এর সমস্ত MUD ফাংশন একই এক্সেস কন্ট্রোলের মধ্য দিয়ে যায়, তাই আমি এই টেস্টটিকে যথেষ্ট বলে মনে করি। যদি আপনি তা না মনে করেন, তবে আপনি [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এর অন্যান্য ফাংশনগুলো চেক করতে পারেন।

### জিরো-নলেজ অপব্যবহার {#zero-knowledge-abuses}

Zokrates যাচাই করার গণিত এই টিউটোরিয়ালের (এবং আমার ক্ষমতার) আওতার বাইরে। তবে, আমরা জিরো-নলেজ কোডে বিভিন্ন চেক চালাতে পারি যাতে যাচাই করা যায় যে এটি সঠিকভাবে না করা হলে এটি ব্যর্থ হয়। এই সমস্ত টেস্টের জন্য আমাদের [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) পরিবর্তন করতে হবে এবং সম্পূর্ণ অ্যাপ্লিকেশনটি রিস্টার্ট করতে হবে। সার্ভার প্রসেসটি রিস্টার্ট করা যথেষ্ট নয়, কারণ এটি অ্যাপ্লিকেশনটিকে একটি অসম্ভব স্টেটে ফেলে দেয় (খেলোয়াড়ের একটি গেম চলমান আছে, কিন্তু গেমটি আর সার্ভারের কাছে উপলব্ধ নেই)।

#### ভুল উত্তর {#wrong-answer}

সবচেয়ে সহজ সম্ভাবনা হলো জিরো-নলেজ প্রুফে ভুল উত্তর প্রদান করা। এটি করতে, আমরা `zkDig`-এর ভেতরে যাই এবং [লাইন 91 পরিবর্তন করি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

এর মানে হলো আমরা সর্বদা দাবি করব যে একটি বোমা আছে, সঠিক উত্তর যাই হোক না কেন। এই সংস্করণের সাথে খেলার চেষ্টা করুন, এবং আপনি `pnpm dev` স্ক্রিনের **server** ট্যাবে এই এররটি দেখতে পাবেন:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

তাই এই ধরনের প্রতারণা ব্যর্থ হয়।

#### ভুল প্রুফ {#wrong-proof}

যদি আমরা সঠিক তথ্য প্রদান করি, কিন্তু শুধু ভুল প্রুফ ডাটা থাকে তবে কী হবে? এখন, লাইন 91-কে এটি দিয়ে প্রতিস্থাপন করুন:

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

এটি এখনও ব্যর্থ হয়, কিন্তু এখন এটি কোনো কারণ ছাড়াই ব্যর্থ হয় কারণ এটি ভ্যালিডেটর কলের সময় ঘটে।

### একজন ব্যবহারকারী কীভাবে জিরো ট্রাস্ট কোড যাচাই করতে পারে? {#user-verify-zero-trust}

স্মার্ট কন্ট্রাক্টগুলো যাচাই করা তুলনামূলকভাবে সহজ। সাধারণত, ডেভেলপার সোর্স কোডটি একটি ব্লক এক্সপ্লোরার-এ প্রকাশ করে, এবং ব্লক এক্সপ্লোরার যাচাই করে যে সোর্স কোডটি [কন্ট্রাক্ট ডিপ্লয়মেন্ট লেনদেনের](/developers/docs/smart-contracts/deploying/) কোডে কম্পাইল হয় কিনা। MUD `System`-গুলোর ক্ষেত্রে এটি [একটু বেশি জটিল](https://mud.dev/cli/verify), তবে খুব বেশি নয়।

জিরো-নলেজের ক্ষেত্রে এটি কঠিন। ভ্যালিডেটর কিছু ধ্রুবক অন্তর্ভুক্ত করে এবং সেগুলোর ওপর কিছু গণনা চালায়। এটি আপনাকে বলে না যে কী প্রমাণ করা হচ্ছে।

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

সমাধানটি হলো, অন্তত যতক্ষণ না ব্লক এক্সপ্লোরারগুলো তাদের ইউজার ইন্টারফেসে Zokrates ভেরিফিকেশন যোগ করে, অ্যাপ্লিকেশন ডেভেলপারদের Zokrates প্রোগ্রামগুলো উপলব্ধ করা, এবং অন্তত কিছু ব্যবহারকারীর জন্য উপযুক্ত ভেরিফিকেশন কি দিয়ে সেগুলো নিজেরাই কম্পাইল করা।

এটি করতে:

1. [Zokrates ইনস্টল করুন](https://zokrates.github.io/gettingstarted.html)।
2. Zokrates প্রোগ্রাম সহ একটি ফাইল, `dig.zok` তৈরি করুন। নিচের কোডটি ধরে নেয় যে আপনি আসল ম্যাপের আকার, 10x5 রেখেছেন।

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


    // (x,y) অবস্থানে মাইনের সংখ্যা
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

3. Zokrates কোডটি কম্পাইল করুন এবং ভেরিফিকেশন কি তৈরি করুন। ভেরিফিকেশন কি-টি আসল সার্ভারে ব্যবহৃত একই এন্ট্রপি দিয়ে তৈরি করতে হবে, [এই ক্ষেত্রে একটি খালি স্ট্রিং](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)।

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. নিজে সলিডিটি ভ্যালিডেটর তৈরি করুন, এবং যাচাই করুন যে এটি ব্লকচেইনে থাকা ভ্যালিডেটরের সাথে কার্যকারিতার দিক থেকে অভিন্ন (সার্ভার একটি মন্তব্য যোগ করে, কিন্তু তা গুরুত্বপূর্ণ নয়)।

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## ডিজাইনের সিদ্ধান্ত {#design}

যেকোনো যথেষ্ট জটিল অ্যাপ্লিকেশনে প্রতিযোগী ডিজাইনের লক্ষ্য থাকে যার জন্য ট্রেড-অফ প্রয়োজন। চলুন কিছু ট্রেড-অফ দেখি এবং কেন বর্তমান সমাধানটি অন্যান্য বিকল্পের চেয়ে পছন্দনীয় তা দেখি।

### জিরো-নলেজ কেন {#why-zero-knowledge}

মাইনসুইপারের জন্য আপনার আসলে জিরো-নলেজের প্রয়োজন নেই। সার্ভার সর্বদা ম্যাপটি ধরে রাখতে পারে, এবং তারপর গেমটি শেষ হলে এর সবটুকু প্রকাশ করতে পারে। তারপর, গেমের শেষে, স্মার্ট কন্ট্রাক্ট ম্যাপের হ্যাস গণনা করতে পারে, এটি মেলে কিনা তা যাচাই করতে পারে, এবং যদি না মেলে তবে সার্ভারকে জরিমানা করতে পারে বা গেমটিকে সম্পূর্ণভাবে বাতিল করতে পারে।

আমি এই সহজ সমাধানটি ব্যবহার করিনি কারণ এটি শুধুমাত্র একটি সুনির্দিষ্ট শেষ স্টেট সহ ছোট গেমগুলোর জন্য কাজ করে। যখন একটি গেম সম্ভাব্যভাবে অসীম হয় (যেমন [অটোনোমাস ওয়ার্ল্ডের](https://0xparc.org/blog/autonomous-worlds) ক্ষেত্রে), তখন আপনার এমন একটি সমাধান প্রয়োজন যা স্টেটটিকে প্রকাশ _না করে_ প্রমাণ করে।

একটি টিউটোরিয়াল হিসেবে এই নিবন্ধটির জন্য একটি ছোট গেম প্রয়োজন ছিল যা বোঝা সহজ, কিন্তু এই কৌশলটি দীর্ঘ গেমগুলোর জন্য সবচেয়ে বেশি কার্যকর।

### Zokrates কেন? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) একমাত্র উপলব্ধ জিরো-নলেজ লাইব্রেরি নয়, তবে এটি একটি সাধারণ, [ইম্পারেটিভ](https://en.wikipedia.org/wiki/Imperative_programming) প্রোগ্রামিং ভাষার মতো এবং বুলিয়ান ভেরিয়েবল সমর্থন করে।

আপনার অ্যাপ্লিকেশনের জন্য, ভিন্ন প্রয়োজনীয়তার সাথে, আপনি [Circum](https://docs.circom.io/getting-started/installation/) বা [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ব্যবহার করতে পছন্দ করতে পারেন।

### কখন Zokrates কম্পাইল করতে হবে {#when-compile-zokrates}

এই প্রোগ্রামে আমরা [প্রতিবার সার্ভার শুরু হওয়ার সময়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates প্রোগ্রামগুলো কম্পাইল করি। এটি স্পষ্টতই সম্পদের অপচয়, কিন্তু এটি একটি টিউটোরিয়াল, যা সরলতার জন্য অপ্টিমাইজ করা হয়েছে।

যদি আমি একটি প্রোডাকশন-লেভেলের অ্যাপ্লিকেশন লিখতাম, তবে আমি চেক করতাম যে আমার কাছে এই মাইনফিল্ডের আকারে কম্পাইল করা Zokrates প্রোগ্রাম সহ কোনো ফাইল আছে কিনা, এবং যদি থাকে তবে সেটি ব্যবহার করতাম। অনচেইন একটি ভ্যালিডেটর কন্ট্রাক্ট ডিপ্লয় করার ক্ষেত্রেও একই কথা প্রযোজ্য।

### ভ্যালিডেটর এবং প্রুভার কি তৈরি করা {#key-creation}

[কি তৈরি করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) হলো আরেকটি বিশুদ্ধ গণনা যা একটি নির্দিষ্ট মাইনফিল্ডের আকারের জন্য একাধিকবার করার প্রয়োজন নেই। আবার, এটি শুধুমাত্র সরলতার খাতিরে একবার করা হয়।

এছাড়া, আমরা [একটি সেটআপ সেরিমনি](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ব্যবহার করতে পারতাম। একটি সেটআপ সেরিমনির সুবিধা হলো জিরো-নলেজ প্রুফে প্রতারণা করার জন্য আপনার প্রতিটি অংশগ্রহণকারীর কাছ থেকে এন্ট্রপি বা কিছু মধ্যবর্তী ফলাফল প্রয়োজন। যদি অন্তত একজন সেরিমনি অংশগ্রহণকারী সৎ হয় এবং সেই তথ্য মুছে ফেলে, তবে জিরো-নলেজ প্রুফগুলো নির্দিষ্ট আক্রমণ থেকে নিরাপদ থাকে। তবে, সব জায়গা থেকে তথ্য মুছে ফেলা হয়েছে কিনা তা যাচাই করার _কোনো মেকানিজম নেই_। যদি জিরো-নলেজ প্রুফগুলো অত্যন্ত গুরুত্বপূর্ণ হয়, তবে আপনি সেটআপ সেরিমনিতে অংশগ্রহণ করতে চাইবেন।

এখানে আমরা [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)-এর ওপর নির্ভর করি, যেখানে ডজন ডজন অংশগ্রহণকারী ছিল। এটি সম্ভবত যথেষ্ট নিরাপদ, এবং অনেক সহজ। আমরা কি তৈরি করার সময় এন্ট্রপিও যোগ করি না, যা ব্যবহারকারীদের জন্য [জিরো-নলেজ কনফিগারেশন যাচাই করা](#user-verify-zero-trust) সহজ করে তোলে।

### কোথায় যাচাই করতে হবে {#where-verification}

আমরা জিরো-নলেজ প্রুফগুলো অনচেইন (যার জন্য গ্যাস খরচ হয়) বা ক্লায়েন্টে ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) ব্যবহার করে) যাচাই করতে পারি। আমি প্রথমটি বেছে নিয়েছি, কারণ এটি আপনাকে একবার [ভ্যালিডেটর যাচাই করতে](#user-verify-zero-trust) দেয় এবং তারপর বিশ্বাস করতে দেয় যে যতক্ষণ এর জন্য কন্ট্রাক্ট এডড্রেস একই থাকে ততক্ষণ এটি পরিবর্তিত হয় না। যদি ক্লায়েন্টে ভেরিফিকেশন করা হতো, তবে প্রতিবার ক্লায়েন্ট ডাউনলোড করার সময় আপনাকে প্রাপ্ত কোডটি যাচাই করতে হতো।

এছাড়া, যদিও এই গেমটি সিঙ্গেল প্লেয়ার, অনেক ব্লকচেইন গেম মাল্টি-প্লেয়ার হয়। অনচেইন ভেরিফিকেশন মানে হলো আপনি শুধুমাত্র একবার জিরো-নলেজ প্রুফ যাচাই করেন। ক্লায়েন্টে এটি করার জন্য প্রতিটি ক্লায়েন্টকে স্বাধীনভাবে যাচাই করতে হবে।

### টাইপস্ক্রিপ্ট নাকি Zokrates-এ ম্যাপ ফ্ল্যাটেন করবেন? {#where-flatten}

সাধারণভাবে, যখন প্রসেসিং টাইপস্ক্রিপ্ট বা Zokrates-এ করা যায়, তখন এটি টাইপস্ক্রিপ্টে করা ভালো, যা অনেক দ্রুত, এবং জিরো-নলেজ প্রুফের প্রয়োজন হয় না। উদাহরণস্বরূপ, এই কারণেই আমরা Zokrates-কে হ্যাস প্রদান করি না এবং এটি সঠিক কিনা তা যাচাই করতে বাধ্য করি না। হ্যাসিং Zokrates-এর ভেতরে করতে হবে, কিন্তু রিটার্ন করা হ্যাস এবং অনচেইন হ্যাসের মধ্যে মিল এর বাইরে ঘটতে পারে।

তবে, আমরা এখনও [Zokrates-এ ম্যাপটিকে ফ্ল্যাটেন করি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), যেখানে আমরা এটি টাইপস্ক্রিপ্টে করতে পারতাম। কারণটি হলো অন্যান্য বিকল্পগুলো, আমার মতে, আরও খারাপ।

- Zokrates কোডে বুলিয়ানের একটি একমাত্রিক অ্যারে প্রদান করুন, এবং দ্বিমাত্রিক ম্যাপ পেতে `x*(height+2)+y`-এর মতো একটি এক্সপ্রেশন ব্যবহার করুন। এটি [কোডটিকে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) কিছুটা বেশি জটিল করে তুলবে, তাই আমি সিদ্ধান্ত নিয়েছি যে একটি টিউটোরিয়ালের জন্য পারফরম্যান্স গেইন এর যোগ্য নয়।

- Zokrates-কে একমাত্রিক অ্যারে এবং দ্বিমাত্রিক অ্যারে উভয়ই পাঠান। তবে, এই সমাধানটি আমাদের কোনো লাভ দেয় না। Zokrates কোডটিকে যাচাই করতে হবে যে এটিকে প্রদান করা একমাত্রিক অ্যারেটি সত্যিই দ্বিমাত্রিক অ্যারের সঠিক উপস্থাপনা। তাই কোনো পারফরম্যান্স গেইন হবে না।

- Zokrates-এ দ্বিমাত্রিক অ্যারেটিকে ফ্ল্যাটেন করুন। এটি সবচেয়ে সহজ বিকল্প, তাই আমি এটি বেছে নিয়েছি।

### ম্যাপ কোথায় সংরক্ষণ করবেন {#where-store-maps}

এই অ্যাপ্লিকেশনে [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) হলো মেমোরিতে থাকা একটি সাধারণ ভেরিয়েবল। এর মানে হলো যদি আপনার সার্ভার মারা যায় এবং রিস্টার্ট করার প্রয়োজন হয়, তবে এর সংরক্ষিত সমস্ত তথ্য হারিয়ে যায়। শুধুমাত্র খেলোয়াড়রাই তাদের গেম চালিয়ে যেতে অক্ষম হয় না, তারা এমনকি একটি নতুন গেমও শুরু করতে পারে না কারণ অনচেইন কম্পোনেন্ট মনে করে যে তাদের এখনও একটি গেম চলমান আছে।

এটি স্পষ্টতই একটি প্রোডাকশন সিস্টেমের জন্য খারাপ ডিজাইন, যেখানে আপনি এই তথ্যটি একটি ডাটাবেসে সংরক্ষণ করবেন। আমি এখানে একটি ভেরিয়েবল ব্যবহার করার একমাত্র কারণ হলো এটি একটি টিউটোরিয়াল এবং সরলতাই প্রধান বিবেচ্য বিষয়।

## উপসংহার: কোন পরিস্থিতিতে এটি উপযুক্ত কৌশল? {#conclusion}

সুতরাং, এখন আপনি জানেন কীভাবে এমন একটি সার্ভার সহ একটি গেম লিখতে হয় যা গোপন স্টেট সংরক্ষণ করে যা অনচেইনের অন্তর্গত নয়। কিন্তু কোন ক্ষেত্রে আপনার এটি করা উচিত? দুটি প্রধান বিবেচ্য বিষয় রয়েছে।

- _দীর্ঘ চলমান গেম_: [উপরে উল্লিখিত হিসেবে](#why-zero-knowledge), একটি ছোট গেমে আপনি গেমটি শেষ হওয়ার পর স্টেটটি প্রকাশ করতে পারেন এবং তারপর সবকিছু যাচাই করতে পারেন। কিন্তু যখন গেমটি দীর্ঘ বা অনির্দিষ্ট সময় নেয় এবং স্টেটটি গোপন রাখতে হয় তখন এটি কোনো বিকল্প নয়।

- _কিছু কেন্দ্রীকরণ গ্রহণযোগ্য_: জিরো-নলেজ প্রুফগুলো ইন্টিগ্রিটি যাচাই করতে পারে, যে একটি এনটিটি ফলাফলগুলো জাল করছে না। তারা যা করতে পারে না তা হলো এনটিটিটি এখনও উপলব্ধ থাকবে এবং মেসেজগুলোর উত্তর দেবে তা নিশ্চিত করা। যেসব পরিস্থিতিতে এভেইলএবিলিটিও ডিসেন্ট্রালাইজড হওয়া প্রয়োজন, সেখানে জিরো-নলেজ প্রুফগুলো পর্যাপ্ত সমাধান নয়, এবং আপনার [মাল্টি-পার্টি কম্পিউটেশন](https://en.wikipedia.org/wiki/Secure_multi-party_computation) প্রয়োজন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

### স্বীকৃতি {#acknowledgements}

- আলভারো আলোনসো এই নিবন্ধটির একটি খসড়া পড়েছেন এবং Zokrates সম্পর্কে আমার কিছু ভুল বোঝাবুঝি দূর করেছেন।

অবশিষ্ট যেকোনো ভুলের দায়িত্ব আমার।