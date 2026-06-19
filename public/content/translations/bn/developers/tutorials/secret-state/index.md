---
title: একটি গোপন স্টেটের জন্য জিরো-নলেজ ব্যবহার করা
description: অনচেইন গেমগুলো সীমাবদ্ধ কারণ তারা কোনো লুকানো তথ্য রাখতে পারে না। এই টিউটোরিয়ালটি পড়ার পর, একজন পাঠক শূন্য-জ্ঞান প্রমাণ এবং সার্ভার কম্পোনেন্টগুলোকে একত্রিত করে একটি গোপন স্টেট, অফচেইন, কম্পোনেন্ট সহ যাচাইযোগ্য গেম তৈরি করতে সক্ষম হবেন। একটি মাইনসুইপার গেম তৈরি করে এটি করার কৌশলটি প্রদর্শন করা হবে।
author: ওরি পোমেরান্টজ
tags:
  - সার্ভার
  - অফচেইন
  - কেন্দ্রীভূত
  - জিরো-নলেজ
  - zokrates
  - mud
  - গোপনীয়তা
skill: advanced
breadcrumb: ZK গোপন স্টেট
lang: bn
published: 2025-03-15
---

_ব্লকচেইনে কোনো গোপনীয়তা নেই_। ব্লকচেইনে পোস্ট করা সবকিছু সবার পড়ার জন্য উন্মুক্ত। এটি প্রয়োজনীয়, কারণ ব্লকচেইন এমন একটি ব্যবস্থার ওপর ভিত্তি করে তৈরি যেখানে যে কেউ এটি যাচাই করতে পারে। তবে, গেমগুলো প্রায়শই গোপন স্টেটের ওপর নির্ভর করে। উদাহরণস্বরূপ, [মাইনসুইপার](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) গেমটির কোনো অর্থই থাকে না যদি আপনি কেবল একটি ব্লক এক্সপ্লোরারে গিয়ে ম্যাপটি দেখতে পান।

সবচেয়ে সহজ সমাধান হলো গোপন স্টেটটি ধরে রাখার জন্য একটি [সার্ভার কম্পোনেন্ট](/developers/tutorials/server-components/) ব্যবহার করা। তবে, আমরা ব্লকচেইন ব্যবহার করার কারণ হলো গেম ডেভেলপারের প্রতারণা রোধ করা। আমাদের সার্ভার কম্পোনেন্টের সততা নিশ্চিত করতে হবে। সার্ভার স্টেটের একটি হ্যাশ প্রদান করতে পারে এবং একটি চালের ফলাফল গণনা করতে ব্যবহৃত স্টেটটি যে সঠিক, তা প্রমাণ করতে [শূন্য-জ্ঞান প্রমাণ](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) ব্যবহার করতে পারে।

এই নিবন্ধটি পড়ার পর আপনি জানতে পারবেন কীভাবে এই ধরনের গোপন স্টেট ধারণকারী সার্ভার, স্টেট দেখানোর জন্য একটি ক্লায়েন্ট এবং এই দুটির মধ্যে যোগাযোগের জন্য একটি অনচেইন কম্পোনেন্ট তৈরি করতে হয়। আমরা যে প্রধান টুলগুলো ব্যবহার করব সেগুলো হলো:

| টুল | উদ্দেশ্য | যাচাইকৃত সংস্করণ |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/) | শূন্য-জ্ঞান প্রমাণ এবং তাদের যাচাইকরণ | 1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | সার্ভার এবং ক্লায়েন্ট উভয়ের জন্য প্রোগ্রামিং ভাষা | 5.4.2 |
| [Node](https://nodejs.org/en) | সার্ভার চালানো | 20.18.2 |
| [Viem](https://viem.sh/) | ব্লকচেইনের সাথে যোগাযোগ | 2.9.20 |
| [MUD](https://mud.dev/) | অনচেইন ডেটা ব্যবস্থাপনা | 2.0.12 |
| [React](https://react.dev/) | ক্লায়েন্ট ইউজার ইন্টারফেস | 18.2.0 |
| [Vite](https://vitejs.dev/) | ক্লায়েন্ট কোড পরিবেশন করা | 4.2.1 |

## মাইনসুইপার (Minesweeper) উদাহরণ {#minesweeper}

[মাইনসুইপার](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) এমন একটি গেম যেখানে মাইনফিল্ড সহ একটি গোপন ম্যাপ থাকে। খেলোয়াড় একটি নির্দিষ্ট স্থানে খনন করার সিদ্ধান্ত নেয়। যদি সেই স্থানে কোনো মাইন থাকে, তবে গেম ওভার হয়ে যায়। অন্যথায়, খেলোয়াড় সেই স্থানের চারপাশের আটটি স্কোয়ারে থাকা মাইনের সংখ্যা জানতে পারে।

এই অ্যাপ্লিকেশনটি [MUD](https://mud.dev/) ব্যবহার করে লেখা হয়েছে, যা এমন একটি ফ্রেমওয়ার্ক যার মাধ্যমে আমরা একটি [কী-ভ্যালু ডেটাবেস](https://aws.amazon.com/nosql/key-value/) ব্যবহার করে অনচেইন ডেটা সংরক্ষণ করতে পারি এবং সেই ডেটা স্বয়ংক্রিয়ভাবে অফচেইন উপাদানগুলোর সাথে সিঙ্ক্রোনাইজ করতে পারি। সিঙ্ক্রোনাইজেশনের পাশাপাশি, MUD অ্যাক্সেস কন্ট্রোল প্রদান করা সহজ করে তোলে এবং অন্যান্য ব্যবহারকারীদের অনুমতি ছাড়াই আমাদের অ্যাপ্লিকেশন [সম্প্রসারিত](https://mud.dev/guides/extending-a-world) করার সুযোগ দেয়।

### মাইনসুইপার উদাহরণটি চালানো {#running-minesweeper-example}

মাইনসুইপার উদাহরণটি চালাতে:

1. নিশ্চিত করুন যে আপনার [প্রয়োজনীয় জিনিসগুলো ইনস্টল করা আছে](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), এবং [`mprocs`](https://github.com/pvolok/mprocs)।

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

   যদি Foundry `pnpm install` এর অংশ হিসেবে ইনস্টল করা হয়ে থাকে, তবে আপনাকে কমান্ড-লাইন শেলটি রিস্টার্ট করতে হবে।

4. কন্ট্রাক্টগুলো কম্পাইল করুন

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. প্রোগ্রামটি চালু করুন (একটি [anvil](https://book.getfoundry.sh/anvil/) ব্লকচেইন সহ) এবং অপেক্ষা করুন।

   ```sh copy
   mprocs
   ```

   মনে রাখবেন যে স্টার্টআপ হতে দীর্ঘ সময় লাগে। অগ্রগতি দেখতে, প্রথমে ডাউন অ্যারো ব্যবহার করে _contracts_ ট্যাবে স্ক্রোল করুন যাতে MUD কন্ট্রাক্টগুলো ডিপ্লয় হতে দেখা যায়। যখন আপনি _Waiting for file changes…_ বার্তাটি পাবেন, তখন কন্ট্রাক্টগুলো ডিপ্লয় হয়ে গেছে এবং পরবর্তী অগ্রগতি _server_ ট্যাবে ঘটবে। সেখানে, আপনি _Verifier address: 0x...._ বার্তাটি না পাওয়া পর্যন্ত অপেক্ষা করুন।

   যদি এই ধাপটি সফল হয়, তবে আপনি `mprocs` স্ক্রিনটি দেখতে পাবেন, যার বাম দিকে বিভিন্ন প্রসেস এবং ডান দিকে বর্তমানে নির্বাচিত প্রসেসের কনসোল আউটপুট থাকবে।

   ![The mprocs screen](./mprocs.png)

   যদি `mprocs` এর সাথে কোনো সমস্যা হয়, তবে আপনি চারটি প্রসেস ম্যানুয়ালি চালাতে পারেন, প্রতিটির জন্য আলাদা কমান্ড লাইন উইন্ডো ব্যবহার করে:

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

6. এখন আপনি [ক্লায়েন্ট](http://localhost:3000)-এ ব্রাউজ করতে পারেন, **New Game**-এ ক্লিক করুন এবং খেলা শুরু করুন।

### টেবিল {#tables}

আমাদের অনচেইনে [বেশ কয়েকটি টেবিল](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) প্রয়োজন।

- `Configuration`: এই টেবিলটি একটি সিঙ্গেলটন, এর কোনো কী নেই এবং একটি মাত্র রেকর্ড রয়েছে। এটি গেম কনফিগারেশনের তথ্য ধারণ করতে ব্যবহৃত হয়:
  - `height`: একটি মাইনফিল্ডের উচ্চতা
  - `width`: একটি মাইনফিল্ডের প্রস্থ
  - `numberOfBombs`: প্রতিটি মাইনফিল্ডে বোমার সংখ্যা
- `VerifierAddress`: এই টেবিলটিও একটি সিঙ্গেলটন। এটি কনফিগারেশনের একটি অংশ, যাচাইকারী কন্ট্রাক্টের ঠিকানা (`verifier`) ধারণ করতে ব্যবহৃত হয়। আমরা এই তথ্যটি `Configuration` টেবিলে রাখতে পারতাম, কিন্তু এটি একটি ভিন্ন উপাদান, সার্ভার দ্বারা সেট করা হয়, তাই এটিকে একটি আলাদা টেবিলে রাখা সহজ।

- `PlayerGame`: কী হলো খেলোয়াড়ের ঠিকানা। ডেটা হলো:

  - `gameId`: 32-বাইট মান যা খেলোয়াড় যে ম্যাপে খেলছে তার হ্যাশ (গেম আইডেন্টিফায়ার)।
  - `win`: একটি বুলিয়ান যা নির্দেশ করে খেলোয়াড় গেমটি জিতেছে কিনা।
  - `lose`: একটি বুলিয়ান যা নির্দেশ করে খেলোয়াড় গেমটি হেরেছে কিনা।
  - `digNumber`: গেমে সফল খননের সংখ্যা।

- `GamePlayer`: এই টেবিলটি `gameId` থেকে খেলোয়াড়ের ঠিকানায় রিভার্স ম্যাপিং ধারণ করে।

- `Map`: কী হলো তিনটি মানের একটি টুপল:

  - `gameId`: 32-বাইট মান যা খেলোয়াড় যে ম্যাপে খেলছে তার হ্যাশ (গেম আইডেন্টিফায়ার)।
  - `x` স্থানাঙ্ক
  - `y` স্থানাঙ্ক

  মানটি একটি একক সংখ্যা। যদি কোনো বোমা শনাক্ত হয় তবে এটি 255 হয়। অন্যথায়, এটি সেই স্থানের চারপাশের বোমার সংখ্যা যোগ এক। আমরা শুধু বোমার সংখ্যা ব্যবহার করতে পারি না, কারণ ডিফল্টরূপে EVM-এর সমস্ত স্টোরেজ এবং MUD-এর সমস্ত সারির মান শূন্য থাকে। আমাদের "খেলোয়াড় এখনও এখানে খনন করেনি" এবং "খেলোয়াড় এখানে খনন করেছে, এবং দেখেছে চারপাশে শূন্যটি বোমা আছে" এর মধ্যে পার্থক্য করতে হবে।

এছাড়া, ক্লায়েন্ট এবং সার্ভারের মধ্যে যোগাযোগ অনচেইন উপাদানের মাধ্যমে ঘটে। এটিও টেবিল ব্যবহার করে বাস্তবায়িত হয়।

- `PendingGame`: নতুন গেম শুরু করার জন্য আনসার্ভিসড রিকোয়েস্ট।
- `PendingDig`: একটি নির্দিষ্ট গেমে নির্দিষ্ট স্থানে খনন করার জন্য আনসার্ভিসড রিকোয়েস্ট। এটি একটি [অফচেইন টেবিল](https://mud.dev/store/tables#types-of-tables), যার মানে এটি EVM স্টোরেজে লেখা হয় না, এটি শুধুমাত্র ইভেন্ট ব্যবহার করে অফচেইনে পড়া যায়।

### এক্সিকিউশন এবং ডেটা ফ্লো {#execution-data-flows}

এই ফ্লো-গুলো ক্লায়েন্ট, অনচেইন উপাদান এবং সার্ভারের মধ্যে এক্সিকিউশন সমন্বয় করে।

#### ইনিশিয়ালাইজেশন {#initialization-flow}

যখন আপনি `mprocs` চালান, তখন এই ধাপগুলো ঘটে:

1. [`mprocs`](https://github.com/pvolok/mprocs) চারটি উপাদান চালায়:

   - [Anvil](https://book.getfoundry.sh/anvil/), যা একটি লোকাল ব্লকচেইন চালায়
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), যা MUD-এর জন্য কন্ট্রাক্টগুলো কম্পাইল (প্রয়োজন হলে) এবং ডিপ্লয় করে
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), যা ওয়েব ব্রাউজারে UI এবং ক্লায়েন্ট কোড পরিবেশন করতে [Vite](https://vitejs.dev/) চালায়।
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), যা সার্ভারের কাজগুলো সম্পাদন করে

2. `contracts` প্যাকেজটি MUD কন্ট্রাক্টগুলো ডিপ্লয় করে এবং তারপর [`PostDeploy.s.sol` স্ক্রিপ্টটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) চালায়। এই স্ক্রিপ্টটি কনফিগারেশন সেট করে। GitHub-এর কোডটি [আটটি মাইন সহ একটি 10x5 মাইনফিল্ড](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) নির্দিষ্ট করে।

3. [সার্ভারটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD সেট আপ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) করার মাধ্যমে শুরু হয়। অন্যান্য জিনিসের মধ্যে, এটি ডেটা সিঙ্ক্রোনাইজেশন সক্রিয় করে, যাতে প্রাসঙ্গিক টেবিলগুলোর একটি কপি সার্ভারের মেমরিতে থাকে।

4. সার্ভার একটি ফাংশন সাবস্ক্রাইব করে যা [`Configuration` টেবিল পরিবর্তিত হলে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) এক্সিকিউট হবে। `PostDeploy.s.sol` এক্সিকিউট হওয়ার এবং টেবিলটি পরিবর্তন করার পর [এই ফাংশনটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) কল করা হয়।

5. যখন সার্ভার ইনিশিয়ালাইজেশন ফাংশনটি কনফিগারেশন পেয়ে যায়, তখন এটি [সার্ভারের জিরো-নলেজ অংশটি](#using-zokrates-from-typescript) ইনিশিয়ালাইজ করতে [`zkFunctions` কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)। কনফিগারেশন না পাওয়া পর্যন্ত এটি হতে পারে না কারণ জিরো-নলেজ ফাংশনগুলোতে মাইনফিল্ডের প্রস্থ এবং উচ্চতা ধ্রুবক হিসেবে থাকতে হয়।

6. সার্ভারের জিরো-নলেজ অংশটি ইনিশিয়ালাইজ হওয়ার পর, পরবর্তী ধাপ হলো [ব্লকচেইনে জিরো-নলেজ ভেরিফিকেশন কন্ট্রাক্ট ডিপ্লয় করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) এবং MUD-এ যাচাইকারীর ঠিকানা সেট করা।

7. সবশেষে, আমরা আপডেটের জন্য সাবস্ক্রাইব করি যাতে আমরা দেখতে পারি কখন একজন খেলোয়াড় [নতুন গেম শুরু করার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) অথবা [বিদ্যমান গেমে খনন করার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) অনুরোধ করে।

#### নতুন গেম {#new-game-flow}

খেলোয়াড় যখন নতুন গেমের অনুরোধ করে তখন এটি ঘটে।

1. যদি এই খেলোয়াড়ের জন্য কোনো গেম চলমান না থাকে, অথবা একটি থাকে কিন্তু তার gameId শূন্য হয়, তবে ক্লায়েন্ট একটি [নতুন গেম বোতাম](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) প্রদর্শন করে। ব্যবহারকারী যখন এই বোতামটি চাপে, তখন [React `newGame` ফাংশনটি চালায়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)।

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) হলো একটি `System` কল। MUD-এ সমস্ত কল `World` কন্ট্রাক্টের মাধ্যমে রাউট করা হয়, এবং বেশিরভাগ ক্ষেত্রে আপনি `<namespace>__<function name>` কল করেন। এই ক্ষেত্রে, কলটি `app__newGame`-এ করা হয়, যা MUD তারপর [`GameSystem`-এর `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)-এ রাউট করে।

3. অনচেইন ফাংশনটি চেক করে যে খেলোয়াড়ের কোনো গেম চলমান নেই, এবং যদি না থাকে তবে [অনুরোধটি `PendingGame` টেবিলে যোগ করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)।

4. সার্ভার `PendingGame`-এ পরিবর্তন শনাক্ত করে এবং [সাবস্ক্রাইব করা ফাংশনটি চালায়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)। এই ফাংশনটি [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) কল করে, যা আবার [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) কল করে।

5. `createGame` প্রথম যে কাজটি করে তা হলো [সঠিক সংখ্যক মাইন সহ একটি র্যান্ডম ম্যাপ তৈরি করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)। তারপর, এটি ফাঁকা সীমানা সহ একটি ম্যাপ তৈরি করতে [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) কল করে, যা Zokrates-এর জন্য প্রয়োজনীয়। সবশেষে, `createGame` ম্যাপের হ্যাশ পেতে [`calculateMapHash`](#calculatemaphash) কল করে, যা গেম আইডি হিসেবে ব্যবহৃত হয়।

6. `newGame` ফাংশনটি `gamesInProgress`-এ নতুন গেম যোগ করে।

7. সার্ভার সর্বশেষ যে কাজটি করে তা হলো [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) কল করা, যা অনচেইনে থাকে। অ্যাক্সেস কন্ট্রোল সক্ষম করতে এই ফাংশনটি একটি ভিন্ন `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এ রয়েছে। অ্যাক্সেস কন্ট্রোল [MUD কনফিগারেশন ফাইলে](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)-এ সংজ্ঞায়িত করা হয়েছে।

   অ্যাক্সেস লিস্ট শুধুমাত্র একটি ঠিকানাকে `System` কল করার অনুমতি দেয়। এটি সার্ভার ফাংশনগুলোতে অ্যাক্সেস একটি একক ঠিকানায় সীমাবদ্ধ করে, যাতে কেউ সার্ভারের ছদ্মবেশ ধারণ করতে না পারে।

8. অনচেইন উপাদানটি প্রাসঙ্গিক টেবিলগুলো আপডেট করে:

   - `PlayerGame`-এ গেম তৈরি করে।
   - `GamePlayer`-এ রিভার্স ম্যাপিং সেট করে।
   - `PendingGame` থেকে অনুরোধটি সরিয়ে দেয়।

9. সার্ভার `PendingGame`-এ পরিবর্তন শনাক্ত করে, কিন্তু কিছুই করে না কারণ [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) ফলস (false)।

10. ক্লায়েন্টে [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) খেলোয়াড়ের ঠিকানার জন্য `PlayerGame` এন্ট্রিতে সেট করা হয়। যখন `PlayerGame` পরিবর্তিত হয়, তখন `gameRecord`-ও পরিবর্তিত হয়।

11. যদি `gameRecord`-এ কোনো মান থাকে, এবং গেমটি জেতা বা হারা না হয়ে থাকে, তবে ক্লায়েন্ট [ম্যাপটি প্রদর্শন করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)।

#### খনন (Dig) {#dig-flow}

1. খেলোয়াড় [ম্যাপ সেলের বোতামে ক্লিক করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), যা [`dig` ফাংশনটি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) কল করে। এই ফাংশনটি [অনচেইনে `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) কল করে।

2. অনচেইন উপাদানটি [বেশ কয়েকটি স্যানিটি চেক সম্পাদন করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), এবং সফল হলে খননের অনুরোধটি [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)-এ যোগ করে।

3. সার্ভার [`PendingDig`-এ পরিবর্তন শনাক্ত করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)। [যদি এটি বৈধ হয়](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), তবে এটি ফলাফল এবং এটি যে বৈধ তার একটি প্রমাণ উভয়ই তৈরি করতে [জিরো-নলেজ কোড কল করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (নিচে ব্যাখ্যা করা হয়েছে)।

4. [সার্ভার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) অনচেইনে [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) কল করে।

5. `digResponse` দুটি কাজ করে। প্রথমত, এটি [শূন্য-জ্ঞান প্রমাণ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) চেক করে। তারপর, যদি প্রমাণটি সঠিক হয়, তবে এটি ফলাফলটি প্রক্রিয়া করতে [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) কল করে।

6. `processDigResult` চেক করে যে গেমটি [হেরেছে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) নাকি [জিতেছে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), এবং [অনচেইন ম্যাপ `Map` আপডেট করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)।

7. ক্লায়েন্ট স্বয়ংক্রিয়ভাবে আপডেটগুলো গ্রহণ করে এবং [খেলোয়াড়কে প্রদর্শিত ম্যাপটি আপডেট করে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), এবং প্রযোজ্য হলে খেলোয়াড়কে জানায় যে এটি জয় নাকি পরাজয়।

## Zokrates ব্যবহার করা {#using-zokrates}

উপরে ব্যাখ্যা করা ফ্লো-তে আমরা জিরো-নলেজ অংশগুলো এড়িয়ে গিয়েছি এবং সেগুলোকে একটি ব্ল্যাক বক্স হিসেবে বিবেচনা করেছি। এখন চলুন এটি খুলে দেখি এবং কীভাবে সেই কোড লেখা হয়েছে তা বোঝার চেষ্টা করি।

### ম্যাপ হ্যাশিং করা {#hashing-map}

আমরা আমাদের ব্যবহৃত Zokrates হ্যাশ ফাংশন [Poseidon](https://www.poseidon-hash.info) প্রয়োগ করতে [এই JavaScript কোডটি](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) ব্যবহার করতে পারি। তবে, এটি দ্রুততর হলেও, শুধুমাত্র Zokrates হ্যাশ ফাংশন ব্যবহার করার চেয়ে এটি আরও জটিল হবে। এটি একটি টিউটোরিয়াল, তাই কোডটি পারফরম্যান্সের জন্য নয়, বরং সহজবোধ্যতার জন্য অপ্টিমাইজ করা হয়েছে। অতএব, আমাদের দুটি ভিন্ন Zokrates প্রোগ্রাম প্রয়োজন, একটি শুধুমাত্র ম্যাপের হ্যাশ গণনা করার জন্য (`hash`) এবং অন্যটি ম্যাপের কোনো একটি স্থানে খননের ফলাফলের একটি শূন্য-জ্ঞান প্রমাণ তৈরি করার জন্য (`dig`)।

### হ্যাশ ফাংশন {#hash-function}

এটি সেই ফাংশন যা একটি ম্যাপের হ্যাশ গণনা করে। আমরা এই কোডটি লাইন ধরে ধরে আলোচনা করব।

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

এই দুটি লাইন [Zokrates স্ট্যান্ডার্ড লাইব্রেরি](https://zokrates.github.io/toolbox/stdlib.html) থেকে দুটি ফাংশন ইমপোর্ট করে। [প্রথম ফাংশনটি](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) হলো একটি [Poseidon হ্যাশ](https://www.poseidon-hash.info/)। এটি [`field` উপাদানের](https://zokrates.github.io/language/types.html#field) একটি অ্যারে নেয় এবং একটি `field` রিটার্ন করে।

Zokrates-এ ফিল্ড উপাদান সাধারণত 256 বিটের চেয়ে কম দীর্ঘ হয়, তবে খুব বেশি কম নয়। কোডটি সহজ করার জন্য, আমরা ম্যাপটিকে 512 বিট পর্যন্ত সীমাবদ্ধ করি এবং চারটি ফিল্ডের একটি অ্যারেকে হ্যাশ করি, যেখানে প্রতিটি ফিল্ডে আমরা শুধুমাত্র 128 বিট ব্যবহার করি। এই উদ্দেশ্যে [`pack128` ফাংশনটি](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) 128 বিটের একটি অ্যারেকে একটি `field`-এ পরিবর্তন করে।

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

এই লাইনটি একটি ফাংশন ডেফিনিশন শুরু করে। `hashMap` একটি মাত্র প্যারামিটার পায় যার নাম `map`, যা একটি দ্বিমাত্রিক `bool`(ean) অ্যারে। ম্যাপের আকার হলো `width+2` বাই `height+2`, যার কারণ [নিচে ব্যাখ্যা করা হয়েছে](#why-map-border)।

আমরা `${width+2}` এবং `${height+2}` ব্যবহার করতে পারি কারণ এই অ্যাপ্লিকেশনে Zokrates প্রোগ্রামগুলো [টেমপ্লেট স্ট্রিং](https://www.w3schools.com/js/js_string_templates.asp) হিসেবে সংরক্ষিত থাকে। `${` এবং `}` এর মাঝের কোড JavaScript দ্বারা মূল্যায়ন করা হয়, এবং এভাবে প্রোগ্রামটি বিভিন্ন ম্যাপের আকারের জন্য ব্যবহার করা যেতে পারে। ম্যাপ প্যারামিটারের চারপাশে কোনো বোমা ছাড়াই এক লোকেশন চওড়া একটি বর্ডার থাকে, যে কারণে আমাদের প্রস্থ এবং উচ্চতার সাথে দুই যোগ করতে হয়।

রিটার্ন ভ্যালু হলো একটি `field` যা হ্যাশ ধারণ করে।

```
bool[512] mut map1d = [false; 512];
```

ম্যাপটি দ্বিমাত্রিক। তবে, `pack128` ফাংশনটি দ্বিমাত্রিক অ্যারের সাথে কাজ করে না। তাই আমরা প্রথমে `map1d` ব্যবহার করে ম্যাপটিকে একটি 512-বাইট অ্যারেতে ফ্ল্যাটেন বা সমতল করি। ডিফল্টভাবে Zokrates ভেরিয়েবলগুলো ধ্রুবক (constant) হয়, কিন্তু আমাদের একটি লুপের মধ্যে এই অ্যারেতে মান নির্ধারণ করতে হবে, তাই আমরা এটিকে [`mut`](https://zokrates.github.io/language/variables.html#mutability) হিসেবে সংজ্ঞায়িত করি।

আমাদের অ্যারেটি ইনিশিয়ালাইজ করতে হবে কারণ Zokrates-এ `undefined` নেই। `[false; 512]` এক্সপ্রেশনটির অর্থ হলো [512টি `false` মানের একটি অ্যারে](https://zokrates.github.io/language/types.html#declaration-and-initialization)।

```
u32 mut counter = 0;
```

আমরা `map1d`-এ ইতিমধ্যে যে বিটগুলো পূরণ করেছি এবং যেগুলো করিনি, সেগুলোর মধ্যে পার্থক্য করার জন্য আমাদের একটি কাউন্টারও প্রয়োজন।

```
for u32 x in 0..${width+2} {
```

এভাবেই আপনি Zokrates-এ একটি [`for` লুপ](https://zokrates.github.io/language/control_flow.html#for-loops) ডিক্লেয়ার বা ঘোষণা করতে পারেন। একটি Zokrates `for` লুপের নির্দিষ্ট সীমা থাকতে হয়, কারণ এটি দেখতে লুপের মতো হলেও, কম্পাইলার আসলে এটিকে "আনরোল" করে। `${width+2}` এক্সপ্রেশনটি একটি কম্পাইল টাইম ধ্রুবক কারণ কম্পাইলারকে কল করার আগে TypeScript কোড দ্বারা `width` সেট করা হয়।

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

ম্যাপের প্রতিটি লোকেশনের জন্য, সেই মানটি `map1d` অ্যারেতে রাখুন এবং কাউন্টারটি বৃদ্ধি করুন।

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` থেকে চারটি `field` মানের একটি অ্যারে তৈরি করতে `pack128` ব্যবহার করা হয়। Zokrates-এ `array[a..b]` মানে হলো অ্যারের সেই স্লাইস বা অংশ যা `a` থেকে শুরু হয় এবং `b-1`-এ শেষ হয়।

```
return poseidon(hashMe);
}
```

এই অ্যারেকে একটি হ্যাশে রূপান্তর করতে `poseidon` ব্যবহার করুন।

### হ্যাশ প্রোগ্রাম {#hash-program}

গেম আইডেন্টিফায়ার তৈরি করতে সার্ভারকে সরাসরি `hashMap` কল করতে হবে। তবে, Zokrates শুধুমাত্র একটি প্রোগ্রাম শুরু করার জন্য `main` ফাংশনটিকে কল করতে পারে, তাই আমরা একটি `main` সহ একটি প্রোগ্রাম তৈরি করি যা হ্যাশ ফাংশনটিকে কল করে।

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### ডিগ (খনন) প্রোগ্রাম {#dig-program}

এটি অ্যাপ্লিকেশনের জিরো-নলেজ অংশের মূল কেন্দ্র, যেখানে আমরা প্রমাণগুলো তৈরি করি যা খননের ফলাফল যাচাই করতে ব্যবহৃত হয়।

```
${hashFragment}

// (x,y) অবস্থানে মাইনের সংখ্যা
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### ম্যাপের বর্ডার কেন প্রয়োজন {#why-map-border}

শূন্য-জ্ঞান প্রমাণগুলো [অ্যারিথমেটিক সার্কিট](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) ব্যবহার করে, যেগুলোর `if` স্টেটমেন্টের মতো কোনো সহজ সমতুল্য নেই। এর পরিবর্তে, তারা [কন্ডিশনাল অপারেটরের](https://en.wikipedia.org/wiki/Ternary_conditional_operator) সমতুল্য কিছু ব্যবহার করে। যদি `a` শূন্য বা এক হতে পারে, তবে আপনি `if a { b } else { c }`-কে `ab+(1-a)c` হিসেবে গণনা করতে পারেন।

এই কারণে, একটি Zokrates `if` স্টেটমেন্ট সর্বদা উভয় শাখাকেই মূল্যায়ন করে। উদাহরণস্বরূপ, যদি আপনার কাছে এই কোডটি থাকে:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

এটি এরর বা ত্রুটি দেখাবে, কারণ এটিকে `arr[10]` গণনা করতে হবে, যদিও সেই মানটি পরে শূন্য দ্বারা গুণ করা হবে।

এটাই কারণ যে আমাদের ম্যাপের চারপাশে এক লোকেশন চওড়া একটি বর্ডার প্রয়োজন। আমাদের একটি লোকেশনের চারপাশে থাকা মাইনগুলোর মোট সংখ্যা গণনা করতে হবে, এবং এর মানে হলো আমরা যেখানে খনন করছি তার এক সারি উপরে এবং নিচে, বামে এবং ডানে লোকেশনটি দেখতে হবে। যার মানে হলো Zokrates-কে প্রদান করা ম্যাপ অ্যারেতে সেই লোকেশনগুলোর অস্তিত্ব থাকতে হবে।

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

ডিফল্টভাবে Zokrates প্রমাণগুলো তাদের ইনপুটগুলোকে অন্তর্ভুক্ত করে। কোনো একটি স্পটের চারপাশে পাঁচটি মাইন আছে তা জেনে কোনো লাভ নেই যদি না আপনি আসলে জানেন যে স্পটটি কোনটি (এবং আপনি এটিকে আপনার রিকোয়েস্টের সাথে মেলাতে পারবেন না, কারণ তখন প্রমাণকারী ভিন্ন মান ব্যবহার করতে পারে এবং আপনাকে সে সম্পর্কে নাও জানাতে পারে)। তবে, Zokrates-কে ম্যাপটি প্রদান করার সময় আমাদের এটিকে গোপন রাখতে হবে। এর সমাধান হলো একটি `private` প্যারামিটার ব্যবহার করা, যা প্রমাণের মাধ্যমে প্রকাশ করা হয় _না_।

এটি অপব্যবহারের আরেকটি পথ খুলে দেয়। প্রমাণকারী সঠিক স্থানাঙ্কগুলো ব্যবহার করতে পারে, কিন্তু লোকেশনের চারপাশে এবং সম্ভবত লোকেশনটিতেই যেকোনো সংখ্যক মাইন দিয়ে একটি ম্যাপ তৈরি করতে পারে। এই অপব্যবহার রোধ করতে, আমরা শূন্য-জ্ঞান প্রমাণে ম্যাপের হ্যাশ অন্তর্ভুক্ত করি, যা হলো গেম আইডেন্টিফায়ার।

```
return (hashMap(map),
```

এখানে রিটার্ন ভ্যালু হলো একটি টাপল (tuple) যা ম্যাপ হ্যাশ অ্যারের পাশাপাশি খননের ফলাফল অন্তর্ভুক্ত করে।

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

লোকেশনটিতে যদি বোমা থাকে তবে আমরা একটি বিশেষ মান হিসেবে 255 ব্যবহার করি।

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

যদি খেলোয়াড় কোনো মাইনে আঘাত না করে থাকে, তবে লোকেশনের চারপাশের এলাকার জন্য মাইনের সংখ্যা যোগ করুন এবং সেটি রিটার্ন করুন।

### TypeScript থেকে Zokrates ব্যবহার করা {#using-zokrates-from-typescript}

Zokrates-এর একটি কমান্ড লাইন ইন্টারফেস রয়েছে, তবে এই প্রোগ্রামে আমরা এটিকে [TypeScript কোডে](https://zokrates.github.io/toolbox/zokrates_js.html) ব্যবহার করি।

যে লাইব্রেরিটি Zokrates ডেফিনিশনগুলো ধারণ করে তাকে [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) বলা হয়।

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript বাইন্ডিংগুলো](https://zokrates.github.io/toolbox/zokrates_js.html) ইমপোর্ট করুন। আমাদের শুধুমাত্র [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) ফাংশনটি প্রয়োজন কারণ এটি একটি প্রমিস রিটার্ন করে যা সমস্ত Zokrates ডেফিনিশনে রিজলভ হয়।

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates-এর মতোই, আমরাও শুধুমাত্র একটি ফাংশন এক্সপোর্ট করি, যা [অ্যাসিনক্রোনাস](https://www.w3schools.com/js/js_async.asp)। যখন এটি শেষ পর্যন্ত রিটার্ন করে, তখন এটি বেশ কয়েকটি ফাংশন প্রদান করে যা আমরা নিচে দেখব।

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates ইনিশিয়ালাইজ করুন, লাইব্রেরি থেকে আমাদের প্রয়োজনীয় সবকিছু সংগ্রহ করুন।

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

এরপর আমাদের কাছে হ্যাশ ফাংশন এবং উপরে দেখা দুটি Zokrates প্রোগ্রাম রয়েছে।

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

এখানে আমরা সেই প্রোগ্রামগুলো কম্পাইল করি।

```typescript
// জিরো-নলেজ যাচাইকরণের জন্য কীগুলো তৈরি করুন।
// একটি প্রোডাকশন সিস্টেমে আপনি একটি সেটআপ সেরিমনি ব্যবহার করতে চাইবেন।
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)।
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

একটি প্রোডাকশন সিস্টেমে আমরা আরও জটিল একটি [সেটআপ সেরিমানি](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ব্যবহার করতে পারি, তবে এটি প্রদর্শনের জন্য যথেষ্ট ভালো। ব্যবহারকারীরা প্রমাণকারীর কী (prover key) জানতে পারলে কোনো সমস্যা নেই - তারা এখনও এটি ব্যবহার করে কোনো কিছু প্রমাণ করতে পারবে না যদি না সেগুলো সত্য হয়। যেহেতু আমরা এনট্রপি (দ্বিতীয় প্যারামিটার, `""`) নির্দিষ্ট করে দিই, তাই ফলাফলগুলো সর্বদা একই হবে।

**দ্রষ্টব্য:** Zokrates প্রোগ্রামগুলোর কম্পাইলেশন এবং কী তৈরি করা ধীরগতির প্রক্রিয়া। প্রতিবার এগুলো পুনরাবৃত্তি করার কোনো প্রয়োজন নেই, শুধুমাত্র ম্যাপের আকার পরিবর্তন হলেই করতে হবে। একটি প্রোডাকশন সিস্টেমে আপনি এগুলো একবার করবেন এবং তারপর আউটপুট সংরক্ষণ করবেন। আমি এখানে এটি না করার একমাত্র কারণ হলো সহজবোধ্যতা।

#### `calculateMapHash` {#calculatemaphash}

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) ফাংশনটি আসলে Zokrates প্রোগ্রামটি চালায়। এটি দুটি ফিল্ডসহ একটি স্ট্রাকচার রিটার্ন করে: `output`, যা একটি JSON স্ট্রিং হিসেবে প্রোগ্রামের আউটপুট, এবং `witness`, যা ফলাফলের একটি শূন্য-জ্ঞান প্রমাণ তৈরি করার জন্য প্রয়োজনীয় তথ্য। এখানে আমাদের শুধুমাত্র আউটপুট প্রয়োজন।

আউটপুটটি হলো `"31337"` ফর্মের একটি স্ট্রিং, যা কোটেশন মার্কের মধ্যে আবদ্ধ একটি ডেসিমাল সংখ্যা। কিন্তু `viem`-এর জন্য আমাদের যে আউটপুট প্রয়োজন তা হলো `0x60A7` ফর্মের একটি হেক্সাডেসিমাল সংখ্যা। তাই আমরা কোটেশন মার্কগুলো সরাতে `.slice(1,-1)` ব্যবহার করি এবং তারপর অবশিষ্ট স্ট্রিংটিকে, যা একটি ডেসিমাল সংখ্যা, একটি [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)-এ রূপান্তর করতে `BigInt` ব্যবহার করি। `.toString(16)` এই `BigInt`-কে একটি হেক্সাডেসিমাল স্ট্রিংয়ে রূপান্তর করে, এবং `"0x"+` হেক্সাডেসিমাল সংখ্যার জন্য মার্কার যোগ করে।

```typescript
// খনন করুন এবং ফলাফলের একটি শূন্য-জ্ঞান প্রমাণ ফেরত দিন
// (সার্ভার-সাইড কোড)
```

শূন্য-জ্ঞান প্রমাণে পাবলিক ইনপুটগুলো (`x` এবং `y`) এবং ফলাফলগুলো (ম্যাপের হ্যাশ এবং বোমার সংখ্যা) অন্তর্ভুক্ত থাকে।

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates-এ কোনো সূচক সীমার বাইরে আছে কিনা তা চেক করা একটি সমস্যা, তাই আমরা এটি এখানেই করি।

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

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) ব্যবহার করুন এবং প্রমাণটি রিটার্ন করুন।

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

একটি Solidity যাচাইকারী, একটি স্মার্ট কন্ট্রাক্ট যা আমরা ব্লকচেইনে ডিপ্লয় করতে পারি এবং `digCompiled.program` দ্বারা তৈরি প্রমাণগুলো যাচাই করতে ব্যবহার করতে পারি।

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

অবশেষে, অন্যান্য কোডের যা কিছু প্রয়োজন হতে পারে তা রিটার্ন করুন।

## নিরাপত্তা পরীক্ষা {#security-tests}

নিরাপত্তা পরীক্ষা গুরুত্বপূর্ণ কারণ একটি কার্যকারিতা বাগ শেষ পর্যন্ত নিজেই প্রকাশ পাবে। কিন্তু অ্যাপ্লিকেশনটি যদি অনিরাপদ হয়, তবে কেউ প্রতারণা করে অন্যের সম্পদ হাতিয়ে নেওয়ার মাধ্যমে তা প্রকাশ করার আগে পর্যন্ত এটি দীর্ঘ সময়ের জন্য লুকিয়ে থাকার সম্ভাবনা থাকে।

### অনুমতি {#permissions}

এই গেমে একটি বিশেষ সুবিধাপ্রাপ্ত সত্তা রয়েছে, সার্ভার। এটি একমাত্র ব্যবহারকারী যাকে [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এর ফাংশনগুলো কল করার অনুমতি দেওয়া হয়েছে। আমরা [`cast`](https://book.getfoundry.sh/cast/) ব্যবহার করে যাচাই করতে পারি যে অনুমতিসাপেক্ষ ফাংশনগুলোতে কল করার অনুমতি শুধুমাত্র সার্ভার অ্যাকাউন্ট হিসেবেই দেওয়া হয়েছে।

[সার্ভারের প্রাইভেট কী `setupNetwork.ts`-এ রয়েছে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)।

1. যে কম্পিউটারে `anvil` (ব্লকচেইন) চলছে, সেখানে এই এনভায়রনমেন্ট ভেরিয়েবলগুলো সেট করুন।

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. যাচাইকারীর ঠিকানা একটি অননুমোদিত ঠিকানা হিসেবে সেট করার চেষ্টা করতে `cast` ব্যবহার করুন।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` শুধু একটি ব্যর্থতার রিপোর্টই করে না, বরং আপনি ব্রাউজারে গেমের মধ্যে **MUD Dev Tools** খুলতে পারেন, **Tables**-এ ক্লিক করতে পারেন এবং **app\_\_VerifierAddress** নির্বাচন করতে পারেন। দেখুন যে ঠিকানাটি শূন্য নয়।

3. যাচাইকারীর ঠিকানা সার্ভারের ঠিকানা হিসেবে সেট করুন।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress**-এর ঠিকানা এখন শূন্য হওয়া উচিত।

একই `System`-এর সমস্ত MUD ফাংশন একই অ্যাক্সেস কন্ট্রোলের মধ্য দিয়ে যায়, তাই আমি এই পরীক্ষাকে যথেষ্ট বলে মনে করি। আপনি যদি তা মনে না করেন, তবে আপনি [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)-এর অন্যান্য ফাংশনগুলো পরীক্ষা করে দেখতে পারেন।

### জিরো-নলেজ অপব্যবহার {#zero-knowledge-abuses}

Zokrates যাচাই করার গণিত এই টিউটোরিয়ালের (এবং আমার ক্ষমতার) আওতার বাইরে। তবে, আমরা জিরো-নলেজ কোডের উপর বিভিন্ন পরীক্ষা চালাতে পারি যাতে যাচাই করা যায় যে এটি সঠিকভাবে করা না হলে তা ব্যর্থ হয়। এই সমস্ত পরীক্ষার জন্য আমাদের [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) পরিবর্তন করতে হবে এবং সম্পূর্ণ অ্যাপ্লিকেশনটি পুনরায় চালু করতে হবে। শুধুমাত্র সার্ভার প্রসেস পুনরায় চালু করা যথেষ্ট নয়, কারণ এটি অ্যাপ্লিকেশনটিকে একটি অসম্ভব স্টেটে ফেলে দেয় (খেলোয়াড়ের একটি গেম চলছে, কিন্তু গেমটি আর সার্ভারের কাছে উপলব্ধ নেই)।

#### ভুল উত্তর {#wrong-answer}

সবচেয়ে সহজ সম্ভাবনা হলো শূন্য-জ্ঞান প্রমাণে ভুল উত্তর প্রদান করা। এটি করার জন্য, আমরা `zkDig`-এর ভিতরে যাই এবং [91 নম্বর লাইন পরিবর্তন করি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

এর মানে হলো সঠিক উত্তর যাই হোক না কেন, আমরা সবসময় দাবি করব যে একটি বোমা আছে। এই সংস্করণটি দিয়ে খেলার চেষ্টা করুন, এবং আপনি `pnpm dev` স্ক্রিনের **server** ট্যাবে এই ত্রুটিটি দেখতে পাবেন:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

সুতরাং এই ধরনের প্রতারণা ব্যর্থ হয়।

#### ভুল প্রমাণ {#wrong-proof}

কী হবে যদি আমরা সঠিক তথ্য প্রদান করি, কিন্তু প্রমাণের ডেটা ভুল থাকে? এখন, 91 নম্বর লাইনটি এটি দিয়ে প্রতিস্থাপন করুন:

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

এটি এখনও ব্যর্থ হয়, তবে এখন এটি কোনো কারণ ছাড়াই ব্যর্থ হয় কারণ এটি যাচাইকারীর কলের সময় ঘটে।

### একজন ব্যবহারকারী কীভাবে জিরো ট্রাস্ট কোড যাচাই করতে পারেন? {#user-verify-zero-trust}

স্মার্ট কন্ট্রাক্টগুলো যাচাই করা তুলনামূলকভাবে সহজ। সাধারণত, ডেভেলপার সোর্স কোডটি একটি ব্লক এক্সপ্লোরারে প্রকাশ করেন, এবং ব্লক এক্সপ্লোরার যাচাই করে যে সোর্স কোডটি [কন্ট্রাক্ট ডিপ্লয়মেন্ট ট্রানজ্যাকশন](/developers/docs/smart-contracts/deploying/)-এর কোডে কম্পাইল হয় কিনা। MUD `System`-এর ক্ষেত্রে এটি [একটু বেশি জটিল](https://mud.dev/cli/verify), তবে খুব বেশি নয়।

জিরো-নলেজের ক্ষেত্রে এটি আরও কঠিন। যাচাইকারী কিছু ধ্রুবক অন্তর্ভুক্ত করে এবং সেগুলোর উপর কিছু গণনা চালায়। এটি আপনাকে বলে না যে কী প্রমাণ করা হচ্ছে।

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

এর সমাধান হলো, অন্তত ব্লক এক্সপ্লোরারগুলো তাদের ইউজার ইন্টারফেসে Zokrates যাচাইকরণ যোগ করার আগ পর্যন্ত, অ্যাপ্লিকেশন ডেভেলপারদের Zokrates প্রোগ্রামগুলো উপলব্ধ করা, এবং অন্তত কিছু ব্যবহারকারীর জন্য উপযুক্ত যাচাইকরণ কী দিয়ে সেগুলো নিজেরাই কম্পাইল করা।

এটি করার জন্য:

1. [Zokrates ইনস্টল করুন](https://zokrates.github.io/gettingstarted.html)।
2. Zokrates প্রোগ্রাম দিয়ে একটি ফাইল, `dig.zok` তৈরি করুন। নিচের কোডটি ধরে নেয় যে আপনি মূল ম্যাপের আকার, 10x5 রেখেছেন।

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

3. Zokrates কোড কম্পাইল করুন এবং যাচাইকরণ কী তৈরি করুন। যাচাইকরণ কীটি মূল সার্ভারে ব্যবহৃত একই এনট্রপি দিয়ে তৈরি করতে হবে, [এই ক্ষেত্রে একটি খালি স্ট্রিং](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)।

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. নিজে নিজেই Solidity যাচাইকারী তৈরি করুন, এবং যাচাই করুন যে এটি ব্লকচেইনে থাকা যাচাইকারীর সাথে কার্যকারিতার দিক থেকে অভিন্ন (সার্ভার একটি মন্তব্য যোগ করে, তবে সেটি গুরুত্বপূর্ণ নয়)।

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## ডিজাইনের সিদ্ধান্ত {#design}

যেকোনো যথেষ্ট জটিল অ্যাপ্লিকেশনে প্রতিযোগিতামূলক ডিজাইনের লক্ষ্য থাকে যার জন্য ট্রেড-অফ বা আপস করার প্রয়োজন হয়। আসুন কিছু ট্রেড-অফ এবং কেন বর্তমান সমাধানটি অন্যান্য বিকল্পের চেয়ে বেশি পছন্দনীয় তা দেখে নেওয়া যাক।

### কেন জিরো-নলেজ {#why-zero-knowledge}

মাইনসুইপারের জন্য আপনার আসলে জিরো-নলেজ এর প্রয়োজন নেই। সার্ভার সর্বদা ম্যাপটি ধরে রাখতে পারে এবং গেমটি শেষ হলে এটি সম্পূর্ণ প্রকাশ করতে পারে। তারপর, গেমের শেষে, স্মার্ট কন্ট্রাক্ট ম্যাপের হ্যাশ গণনা করতে পারে, এটি মেলে কিনা তা যাচাই করতে পারে এবং যদি তা না হয় তবে সার্ভারকে জরিমানা করতে পারে বা গেমটিকে সম্পূর্ণ বাতিল করতে পারে।

আমি এই সহজ সমাধানটি ব্যবহার করিনি কারণ এটি শুধুমাত্র একটি সুনির্দিষ্ট শেষ স্টেট সহ ছোট গেমগুলির জন্য কাজ করে। যখন একটি গেম সম্ভাব্যভাবে অসীম হয় (যেমন [স্বায়ত্তশাসিত জগতের](https://0xparc.org/blog/autonomous-worlds) ক্ষেত্রে), তখন আপনার এমন একটি সমাধানের প্রয়োজন যা স্টেট প্রকাশ _না করেই_ প্রমাণ করে।

একটি টিউটোরিয়াল হিসাবে এই নিবন্ধটির জন্য একটি ছোট গেমের প্রয়োজন ছিল যা বোঝা সহজ, তবে এই কৌশলটি দীর্ঘ গেমগুলির জন্য সবচেয়ে বেশি কার্যকর।

### কেন Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) একমাত্র উপলব্ধ জিরো-নলেজ লাইব্রেরি নয়, তবে এটি একটি সাধারণ, [ইম্পারেটিভ](https://en.wikipedia.org/wiki/Imperative_programming) প্রোগ্রামিং ভাষার মতো এবং বুলিয়ান ভেরিয়েবল সমর্থন করে।

আপনার অ্যাপ্লিকেশনের জন্য, বিভিন্ন প্রয়োজনীয়তার সাথে, আপনি [Circum](https://docs.circom.io/getting-started/installation/) বা [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ব্যবহার করতে পছন্দ করতে পারেন।

### কখন Zokrates কম্পাইল করবেন {#when-compile-zokrates}

এই প্রোগ্রামে আমরা [সার্ভার চালু হওয়ার প্রতিবার](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates প্রোগ্রামগুলি কম্পাইল করি। এটি স্পষ্টতই সম্পদের অপচয়, তবে এটি একটি টিউটোরিয়াল, যা সরলতার জন্য অপ্টিমাইজ করা হয়েছে।

আমি যদি একটি প্রোডাকশন-লেভেলের অ্যাপ্লিকেশন লিখতাম, তবে আমি পরীক্ষা করে দেখতাম যে এই মাইনফিল্ড আকারের কম্পাইল করা Zokrates প্রোগ্রামগুলির সাথে আমার কাছে কোনো ফাইল আছে কিনা এবং যদি থাকে তবে সেটি ব্যবহার করতাম। অনচেইন একটি যাচাইকারী কন্ট্রাক্ট ডিপ্লয় করার ক্ষেত্রেও একই কথা প্রযোজ্য।

### যাচাইকারী এবং প্রমাণকারী কী তৈরি করা {#key-creation}

[কী তৈরি করা](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) হলো আরেকটি বিশুদ্ধ গণনা যা একটি নির্দিষ্ট মাইনফিল্ড আকারের জন্য একাধিকবার করার প্রয়োজন নেই। আবার, সরলতার খাতিরে এটি শুধুমাত্র একবার করা হয়।

অতিরিক্তভাবে, আমরা [একটি সেটআপ অনুষ্ঠান](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ব্যবহার করতে পারি। একটি সেটআপ অনুষ্ঠানের সুবিধা হলো শূন্য-জ্ঞান প্রমাণে প্রতারণা করার জন্য আপনার প্রতিটি অংশগ্রহণকারীর কাছ থেকে এনট্রপি বা কিছু মধ্যবর্তী ফলাফলের প্রয়োজন হবে। যদি অন্তত একজন অংশগ্রহণকারী সৎ হন এবং সেই তথ্য মুছে ফেলেন, তবে শূন্য-জ্ঞান প্রমাণগুলি নির্দিষ্ট আক্রমণ থেকে নিরাপদ থাকে। তবে, সব জায়গা থেকে তথ্য মুছে ফেলা হয়েছে কিনা তা যাচাই করার _কোনো প্রক্রিয়া নেই_। যদি শূন্য-জ্ঞান প্রমাণগুলি অত্যন্ত গুরুত্বপূর্ণ হয়, তবে আপনি সেটআপ অনুষ্ঠানে অংশগ্রহণ করতে চাইবেন।

এখানে আমরা [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)-এর উপর নির্ভর করি, যেখানে কয়েক ডজন অংশগ্রহণকারী ছিল। এটি সম্ভবত যথেষ্ট নিরাপদ এবং অনেক সহজ। আমরা কী তৈরির সময় এনট্রপি যোগ করি না, যা ব্যবহারকারীদের জন্য [জিরো-নলেজ কনফিগারেশন যাচাই করা](#user-verify-zero-trust) সহজ করে তোলে।

### কোথায় যাচাই করবেন {#where-verification}

আমরা শূন্য-জ্ঞান প্রমাণগুলি অনচেইন (যার জন্য গ্যাস খরচ হয়) বা ক্লায়েন্টে ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) ব্যবহার করে) যাচাই করতে পারি। আমি প্রথমটি বেছে নিয়েছি, কারণ এটি আপনাকে একবার [যাচাইকারীকে যাচাই করতে](#user-verify-zero-trust) দেয় এবং তারপর বিশ্বাস করতে দেয় যে যতক্ষণ পর্যন্ত এর কন্ট্রাক্ট ঠিকানা একই থাকে ততক্ষণ এটি পরিবর্তন হবে না। যদি ক্লায়েন্টে যাচাইকরণ করা হতো, তবে প্রতিবার ক্লায়েন্ট ডাউনলোড করার সময় আপনাকে প্রাপ্ত কোডটি যাচাই করতে হতো।

এছাড়াও, যদিও এই গেমটি সিঙ্গেল প্লেয়ার, অনেক ব্লকচেইন গেম মাল্টি-প্লেয়ার হয়। অনচেইন যাচাইকরণের অর্থ হলো আপনি শুধুমাত্র একবার শূন্য-জ্ঞান প্রমাণ যাচাই করবেন। ক্লায়েন্টে এটি করার জন্য প্রতিটি ক্লায়েন্টকে স্বাধীনভাবে যাচাই করতে হবে।

### ম্যাপটি TypeScript নাকি Zokrates-এ ফ্ল্যাটেন করবেন? {#where-flatten}

সাধারণত, যখন প্রসেসিং TypeScript বা Zokrates উভয়তেই করা যায়, তখন এটি TypeScript-এ করা ভালো, যা অনেক দ্রুত এবং এর জন্য শূন্য-জ্ঞান প্রমাণের প্রয়োজন হয় না। উদাহরণস্বরূপ, এই কারণেই আমরা Zokrates-কে হ্যাশ প্রদান করি না এবং এটি সঠিক কিনা তা যাচাই করতে বাধ্য করি না। হ্যাশিং Zokrates-এর ভিতরে করতে হবে, তবে ফিরে আসা হ্যাশ এবং অনচেইন হ্যাশের মধ্যে মিল এর বাইরে হতে পারে।

তবে, আমরা এখনও [Zokrates-এ ম্যাপটি ফ্ল্যাটেন করি](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), যেখানে আমরা এটি TypeScript-এ করতে পারতাম। এর কারণ হলো অন্যান্য বিকল্পগুলি, আমার মতে, আরও খারাপ।

- Zokrates কোডে বুলিয়ানের একটি এক-মাত্রিক অ্যারে প্রদান করুন এবং দ্বি-মাত্রিক ম্যাপ পেতে `x*(height+2)
+y`-এর মতো একটি এক্সপ্রেশন ব্যবহার করুন। এটি [কোডটিকে](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) কিছুটা বেশি জটিল করে তুলবে, তাই আমি সিদ্ধান্ত নিয়েছি যে একটি টিউটোরিয়ালের জন্য পারফরম্যান্স বৃদ্ধির কোনো মূল্য নেই।

- Zokrates-এ এক-মাত্রিক অ্যারে এবং দ্বি-মাত্রিক অ্যারে উভয়ই পাঠান। তবে, এই সমাধানটি আমাদের কোনো সুবিধা দেয় না। Zokrates কোডটিকে যাচাই করতে হবে যে এটিকে প্রদান করা এক-মাত্রিক অ্যারেটি সত্যিই দ্বি-মাত্রিক অ্যারের সঠিক উপস্থাপনা। তাই পারফরম্যান্সে কোনো উন্নতি হবে না।

- Zokrates-এ দ্বি-মাত্রিক অ্যারেটি ফ্ল্যাটেন করুন। এটি সবচেয়ে সহজ বিকল্প, তাই আমি এটি বেছে নিয়েছি।

### ম্যাপ কোথায় সংরক্ষণ করবেন {#where-store-maps}

এই অ্যাপ্লিকেশনে [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) হলো মেমোরিতে থাকা একটি সাধারণ ভেরিয়েবল। এর মানে হলো যদি আপনার সার্ভার বন্ধ হয়ে যায় এবং পুনরায় চালু করার প্রয়োজন হয়, তবে এর সংরক্ষিত সমস্ত তথ্য হারিয়ে যাবে। খেলোয়াড়রা কেবল তাদের গেম চালিয়ে যেতেই অক্ষম হবে না, তারা একটি নতুন গেমও শুরু করতে পারবে না কারণ অনচেইন উপাদানটি মনে করে যে তাদের এখনও একটি গেম চলছে।

এটি স্পষ্টতই একটি প্রোডাকশন সিস্টেমের জন্য খারাপ ডিজাইন, যেখানে আপনি এই তথ্যগুলি একটি ডাটাবেসে সংরক্ষণ করবেন। আমি এখানে একটি ভেরিয়েবল ব্যবহার করার একমাত্র কারণ হলো এটি একটি টিউটোরিয়াল এবং সরলতাই হলো প্রধান বিবেচ্য বিষয়।

## উপসংহার: কোন পরিস্থিতিতে এই কৌশলটি উপযুক্ত? {#conclusion}

সুতরাং, এখন আপনি জানেন কীভাবে এমন একটি সার্ভার দিয়ে গেম তৈরি করতে হয় যা গোপন স্টেট সংরক্ষণ করে যা অনচেইন থাকার কথা নয়। কিন্তু কোন ক্ষেত্রে আপনার এটি করা উচিত? এর দুটি প্রধান বিবেচ্য বিষয় রয়েছে।

- _দীর্ঘস্থায়ী গেম_: [উপরে যেমন উল্লেখ করা হয়েছে](#why-zero-knowledge), একটি ছোট গেমে গেমটি শেষ হওয়ার পরে আপনি কেবল স্টেট প্রকাশ করতে পারেন এবং তারপরে সবকিছু যাচাই করতে পারেন। কিন্তু গেমটি দীর্ঘ বা অনির্দিষ্ট সময় নিলে এবং স্টেট গোপন রাখার প্রয়োজন হলে এটি কোনো বিকল্প নয়।

- _কিছুটা কেন্দ্রীকরণ গ্রহণযোগ্য_: শূন্য-জ্ঞান প্রমাণ অখণ্ডতা যাচাই করতে পারে, অর্থাৎ কোনো সত্তা ফলাফল জাল করছে না। তারা যা করতে পারে না তা হলো সত্তাটি এখনও উপলব্ধ থাকবে এবং বার্তাগুলোর উত্তর দেবে তা নিশ্চিত করা। যেসব পরিস্থিতিতে উপলব্ধতাও বিকেন্দ্রীকৃত হওয়া প্রয়োজন, সেখানে শূন্য-জ্ঞান প্রমাণ পর্যাপ্ত সমাধান নয় এবং আপনার [মাল্টি-পার্টি কম্পিউটেশন](https://en.wikipedia.org/wiki/Secure_multi-party_computation) প্রয়োজন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

### স্বীকৃতি {#acknowledgements}

- আলভারো আলোনসো (Alvaro Alonso) এই নিবন্ধের একটি খসড়া পড়েছেন এবং Zokrates সম্পর্কে আমার কিছু ভুল ধারণা দূর করেছেন।

অবশিষ্ট যেকোনো ভুলের জন্য আমি দায়ী।