---
title: "web3 অ্যাপের জন্য সার্ভার উপাদান এবং এজেন্ট"
description: এই টিউটোরিয়ালটি পড়ার পরে, আপনি TypeScript সার্ভার লিখতে পারবেন যা একটি ব্লকচেইনে ইভেন্ট শোনে এবং সেই অনুযায়ী তাদের নিজস্ব লেনদেন দিয়ে প্রতিক্রিয়া জানায়। এটি আপনাকে কেন্দ্রীভূত অ্যাপ্লিকেশন লিখতে সক্ষম করবে (কারণ সার্ভারটি ব্যর্থতার একটি বিন্দু), কিন্তু web3 সত্তার সাথে ইন্টারঅ্যাক্ট করতে পারে। একই কৌশল একটি এজেন্ট লিখতেও ব্যবহার করা যেতে পারে যা মানুষের হস্তক্ষেপ ছাড়াই অনচেইন ইভেন্টে সাড়া দেয়।

author: Ori Pomerantz
lang: bn
tags: [ "এজেন্ট", "সার্ভার", "অফচেইন" ]
skill: beginner
published: 2024-07-15
---

## ভূমিকা {#introduction}

বেশিরভাগ ক্ষেত্রে, একটি বিকেন্দ্রীভূত অ্যাপ সফ্টওয়্যার বিতরণের জন্য একটি সার্ভার ব্যবহার করে, কিন্তু সমস্ত প্রকৃত মিথস্ক্রিয়া ক্লায়েন্ট (সাধারণত, ওয়েব ব্রাউজার) এবং ব্লকচেইনের মধ্যে ঘটে।

![ওয়েব সার্ভার, ক্লায়েন্ট এবং ব্লকচেইনের মধ্যে স্বাভাবিক মিথস্ক্রিয়া](./fig-1.svg)

তবে, কিছু ক্ষেত্রে আছে যেখানে একটি অ্যাপ্লিকেশন স্বাধীনভাবে চালিত একটি সার্ভার উপাদান থাকা থেকে উপকৃত হবে। এই ধরনের একটি সার্ভার ইভেন্টে এবং অন্যান্য উৎস, যেমন একটি API থেকে আসা অনুরোধে লেনদেন ইস্যু করার মাধ্যমে সাড়া দিতে সক্ষম হবে।

![একটি সার্ভার যোগ করার সাথে মিথস্ক্রিয়া](./fig-2.svg)

এমন বেশ কিছু সম্ভাব্য কাজ রয়েছে যা এই ধরনের একটি সার্ভার পূরণ করতে পারে।

- গোপন অবস্থার ধারক। গেমিংয়ে খেলোয়াড়দের কাছে গেমের জানা সমস্ত তথ্য উপলব্ধ না করা প্রায়শই দরকারী। তবে, _ব্লকচেইনে কোনো গোপনীয়তা নেই_, ব্লকচেইনে থাকা যেকোনো তথ্য যে কারো পক্ষে বের করা সহজ। অতএব, যদি খেলার অবস্থার একটি অংশ গোপন রাখতে হয়, তবে এটি অন্য কোথাও সংরক্ষণ করতে হবে (এবং সম্ভবত সেই অবস্থার প্রভাব [জিরো-নলেজ প্রুফ](/zero-knowledge-proofs) ব্যবহার করে যাচাই করা হবে)।

- কেন্দ্রীভূত ওরাকল। যদি স্টেক যথেষ্ট কম হয়, একটি বহিরাগত সার্ভার যা অনলাইনে কিছু তথ্য পড়ে এবং তারপরে এটি চেইনে পোস্ট করে তা একটি [ওরাকল](/developers/docs/oracles/) হিসাবে ব্যবহার করার জন্য যথেষ্ট ভাল হতে পারে।

- এজেন্ট। এটি সক্রিয় করার জন্য একটি লেনদেন ছাড়া ব্লকচেইনে কিছুই ঘটে না। সুযোগ পেলে একটি সার্ভার ব্যবহারকারীর পক্ষ থেকে কাজ করতে পারে যেমন [আর্বিট্রেজ](/developers/docs/mev/#mev-examples-dex-arbitrage) সম্পাদন করা।

## নমুনা প্রোগ্রাম {#sample-program}

আপনি [github-এ](https://github.com/qbzzt/20240715-server-component) একটি নমুনা সার্ভার দেখতে পারেন। এই সার্ভারটি [এই চুক্তি](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) থেকে আসা ইভেন্টগুলি শোনে, যা Hardhat-এর গ্রিটারের একটি পরিবর্তিত সংস্করণ। যখন অভিবাদন পরিবর্তন করা হয়, এটি এটিকে আবার পরিবর্তন করে।

এটি চালানোর জন্য:

1. রিপোজিটরি ক্লোন করুন।

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. প্রয়োজনীয় প্যাকেজগুলি ইনস্টল করুন। আপনার কাছে যদি এটি আগে থেকেই না থাকে, [প্রথমে নোড ইনস্টল করুন](https://nodejs.org/en/download/package-manager)।

   ```sh copy
   npm install
   ```

3. Holesky টেস্টনেটে ETH আছে এমন একটি অ্যাকাউন্টের প্রাইভেট কী নির্দিষ্ট করতে `.env` সম্পাদনা করুন। আপনার যদি Holesky-তে ETH না থাকে, আপনি [এই ফসেটটি ব্যবহার করতে পারেন](https://holesky-faucet.pk910.de/)।

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <প্রাইভেট কী এখানে দিন>
   ```

4. সার্ভার শুরু করুন।

   ```sh copy
   npm start
   ```

5. [একটি ব্লক এক্সপ্লোরারে](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) যান, এবং প্রাইভেট কী আছে এমন ঠিকানার চেয়ে ভিন্ন একটি ঠিকানা ব্যবহার করে অভিবাদন পরিবর্তন করুন। দেখুন যে অভিবাদনটি স্বয়ংক্রিয়ভাবে আবার পরিবর্তন করা হয়েছে।

### এটি কিভাবে কাজ করে? {#how-it-works}

একটি সার্ভার উপাদান কিভাবে লিখতে হয় তা বোঝার সবচেয়ে সহজ উপায় হল নমুনাটি লাইন বাই লাইন পর্যালোচনা করা।

#### `src/app.ts` {#src-app-ts}

প্রোগ্রামের সিংহভাগই [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts)-এ রয়েছে।

##### পূর্বশর্ত বস্তু তৈরি করা

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

এগুলি হল [Viem](https://viem.sh/) সত্তা যা আমাদের প্রয়োজন, ফাংশন এবং [`ঠিকানা` টাইপ](https://viem.sh/docs/glossary/types#address)। এই সার্ভারটি [TypeScript](https://www.typescriptlang.org/)-এ লেখা, যা JavaScript-এর একটি এক্সটেনশন যা এটিকে [strongly typed](https://en.wikipedia.org/wiki/Strong_and_weak_typing) করে তোলে।

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[এই ফাংশনটি](https://viem.sh/docs/accounts/privateKey) আমাদের একটি প্রাইভেট কী-এর সাথে সঙ্গতিপূর্ণ ওয়ালেট তথ্য, যার মধ্যে ঠিকানা অন্তর্ভুক্ত, তৈরি করতে দেয়।

```typescript
import { holesky } from "viem/chains"
```

Viem-এ একটি ব্লকচেইন ব্যবহার করতে আপনাকে এর সংজ্ঞা আমদানি করতে হবে। এই ক্ষেত্রে, আমরা [Holesky](https://github.com/eth-clients/holesky) টেস্ট ব্লকচেইনের সাথে সংযোগ করতে চাই।

```typescript
// এইভাবেই আমরা .env-এর সংজ্ঞাগুলিকে process.env-এ যোগ করি।
import * as dotenv from "dotenv"
dotenv.config()
```

এইভাবে আমরা `.env` কে এনভায়রনমেন্টে পড়ি। প্রাইভেট কী-এর জন্য আমাদের এটি প্রয়োজন (পরে দেখুন)।

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

একটি চুক্তি ব্যবহার করার জন্য আমাদের এর ঠিকানা এবং এর জন্য [ABI](/glossary/#abi) প্রয়োজন। আমরা এখানে উভয়ই সরবরাহ করি।

JavaScript-এ (এবং তাই TypeScript-এ) আপনি একটি ধ্রুবককে একটি নতুন মান নির্ধারণ করতে পারবেন না, কিন্তু আপনি এতে সংরক্ষিত বস্তুটি পরিবর্তন _করতে পারেন_। `as const` প্রত্যয় ব্যবহার করে আমরা TypeScript-কে বলছি যে তালিকাটি নিজেই ধ্রুবক এবং পরিবর্তন করা যাবে না।

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

একটি Viem [পাবলিক ক্লায়েন্ট](https://viem.sh/docs/clients/public.html) তৈরি করুন। পাবলিক ক্লায়েন্টদের কোনো সংযুক্ত প্রাইভেট কী থাকে না, এবং তাই লেনদেন পাঠাতে পারে না। তারা [`view` ফাংশন](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) কল করতে পারে, অ্যাকাউন্ট ব্যালেন্স পড়তে পারে, ইত্যাদি।

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

এনভায়রনমেন্ট ভেরিয়েবলগুলি [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env)-এ উপলব্ধ। তবে, TypeScript হল strongly typed। একটি এনভায়রনমেন্ট ভেরিয়েবল যেকোনো স্ট্রিং হতে পারে, বা খালি হতে পারে, তাই একটি এনভায়রনমেন্ট ভেরিয়েবলের জন্য টাইপ হল `string | undefined`। তবে, Viem-এ একটি কী `0x${string}` (`0x` এর পরে একটি স্ট্রিং) হিসাবে সংজ্ঞায়িত করা হয়েছে। এখানে আমরা TypeScript-কে বলি যে `PRIVATE_KEY` এনভায়রনমেন্ট ভেরিয়েবলটি সেই টাইপের হবে। যদি তা না হয়, আমরা একটি রানটাইম ত্রুটি পাব।

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) ফাংশনটি তারপর এই প্রাইভেট কী ব্যবহার করে একটি সম্পূর্ণ অ্যাকাউন্ট অবজেক্ট তৈরি করে।

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

এরপরে, আমরা একটি [ওয়ালেট ক্লায়েন্ট](https://viem.sh/docs/clients/wallet) তৈরি করতে অ্যাকাউন্ট অবজেক্টটি ব্যবহার করি। এই ক্লায়েন্টের একটি প্রাইভেট কী এবং একটি ঠিকানা আছে, তাই এটি লেনদেন পাঠাতে ব্যবহার করা যেতে পারে।

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

এখন যেহেতু আমাদের সমস্ত পূর্বশর্ত রয়েছে, আমরা অবশেষে একটি [কন্ট্রাক্ট ইনস্ট্যান্স](https://viem.sh/docs/contract/getContract) তৈরি করতে পারি। আমরা অনচেইন কন্ট্রাক্টের সাথে যোগাযোগ করতে এই কন্ট্রাক্ট ইনস্ট্যান্সটি ব্যবহার করব।

##### ব্লকচেইন থেকে পড়া

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

যে কন্ট্রাক্ট ফাংশনগুলি শুধুমাত্র পঠনযোগ্য ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) এবং [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) সেগুলি `read`-এর অধীনে উপলব্ধ। এই ক্ষেত্রে, আমরা এটি [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) ফাংশনটি অ্যাক্সেস করতে ব্যবহার করি, যা অভিবাদন ফেরত দেয়।

JavaScript হল সিঙ্গেল-থ্রেডেড, তাই যখন আমরা একটি দীর্ঘ চলমান প্রক্রিয়া শুরু করি তখন আমাদের [নির্দিষ্ট করতে হবে যে আমরা এটি অ্যাসিঙ্ক্রোনাসভাবে করছি](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)। ব্লকচেইনে কল করা, এমনকি একটি শুধুমাত্র পঠনযোগ্য অপারেশনের জন্যও, কম্পিউটার এবং একটি ব্লকচেইন নোডের মধ্যে একটি রাউন্ড-ট্রিপ প্রয়োজন। এই কারণেই আমরা এখানে নির্দিষ্ট করি যে কোডটিকে ফলাফলের জন্য `await` করতে হবে।

আপনি যদি আগ্রহী হন যে এটি কীভাবে কাজ করে তবে আপনি [এখানে এটি সম্পর্কে পড়তে পারেন](https://www.w3schools.com/js/js_promise.asp), কিন্তু ব্যবহারিক দিক থেকে আপনাকে কেবল জানতে হবে যে আপনি যদি দীর্ঘ সময় নেয় এমন একটি অপারেশন শুরু করেন তবে আপনি ফলাফলের জন্য `await` করবেন, এবং যে কোনো ফাংশন যা এটি করে তাকে `async` হিসাবে ঘোষণা করতে হবে।

##### লেনদেন ইস্যু করা

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

এটি সেই ফাংশন যা আপনি অভিবাদন পরিবর্তন করে এমন একটি লেনদেন ইস্যু করতে কল করেন। যেহেতু এটি একটি দীর্ঘ অপারেশন, ফাংশনটি `async` হিসাবে ঘোষণা করা হয়েছে। অভ্যন্তরীণ বাস্তবায়নের কারণে, যেকোনো `async` ফাংশনকে একটি `Promise` অবজেক্ট ফেরত দিতে হবে। এই ক্ষেত্রে, `Promise<any>` মানে হল আমরা নির্দিষ্ট করি না যে `Promise`-এ ঠিক কী ফেরত দেওয়া হবে।

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

কন্ট্রাক্ট ইনস্ট্যান্সের `write` ফিল্ডে ব্লকচেইন স্টেটে লেখে এমন সমস্ত ফাংশন রয়েছে (যেগুলির জন্য একটি লেনদেন পাঠানোর প্রয়োজন), যেমন [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)। প্যারামিটারগুলি, যদি থাকে, একটি তালিকা হিসাবে সরবরাহ করা হয়, এবং ফাংশনটি লেনদেনের হ্যাস ফেরত দেয়।

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

লেনদেনের হ্যাস রিপোর্ট করুন (এটি দেখার জন্য ব্লক এক্সপ্লোরারের একটি URL-এর অংশ হিসাবে) এবং এটি ফেরত দিন।

##### ইভেন্টে সাড়া দেওয়া

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` ফাংশনটি](https://viem.sh/docs/actions/public/watchEvent) আপনাকে নির্দিষ্ট করতে দেয় যে একটি ইভেন্ট নির্গত হলে একটি ফাংশন চালানো হবে। আপনি যদি শুধুমাত্র এক ধরনের ইভেন্ট নিয়ে চিন্তা করেন (এই ক্ষেত্রে, `SetGreeting`), তাহলে আপনি এই সিনট্যাক্সটি ব্যবহার করে নিজেকে সেই ইভেন্টের ধরনে সীমাবদ্ধ করতে পারেন।

```typescript
    onLogs: logs => {
```

লগ এন্ট্রি থাকলে `onLogs` ফাংশনটি কল করা হয়। ইথেরিয়ামে "লগ" এবং "ইভেন্ট" সাধারণত বিনিময়যোগ্য।

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

একাধিক ইভেন্ট থাকতে পারে, কিন্তু সরলতার জন্য আমরা কেবল প্রথমটি নিয়েই চিন্তা করি। `logs[0].args` হল ইভেন্টের আর্গুমেন্ট, এই ক্ষেত্রে `sender` এবং `greeting`।

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

যদি প্রেরক এই সার্ভার _না_ হয়, তাহলে অভিবাদন পরিবর্তন করতে `setGreeting` ব্যবহার করুন।

#### `package.json` {#package-json}

[এই ফাইলটি](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) কনফিগারেশন নিয়ন্ত্রণ করে। এই নিবন্ধটি শুধুমাত্র গুরুত্বপূর্ণ সংজ্ঞাগুলি ব্যাখ্যা করে।

```json
{
  "main": "dist/index.js",
```

এই সংজ্ঞাটি নির্দিষ্ট করে যে কোন JavaScript ফাইলটি চালাতে হবে।

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

স্ক্রিপ্টগুলি বিভিন্ন অ্যাপ্লিকেশন অ্যাকশন। এই ক্ষেত্রে, আমাদের কাছে একমাত্রটি হল `start`, যা কম্পাইল করে এবং তারপর সার্ভার চালায়। `tsc` কমান্ডটি `typescript` প্যাকেজের অংশ এবং TypeScript-কে JavaScript-এ কম্পাইল করে। আপনি যদি এটি ম্যানুয়ালি চালাতে চান, এটি `node_modules/.bin`-এ অবস্থিত। দ্বিতীয় কমান্ডটি সার্ভার চালায়।

```json
  "type": "module",
```

একাধিক ধরনের JavaScript নোড অ্যাপ্লিকেশন আছে। `module` টাইপ আমাদের টপ-লেভেল কোডে `await` ব্যবহার করতে দেয়, যা ধীর (এবং তাই অ্যাসিঙ্ক্রোনাস) অপারেশন করার সময় গুরুত্বপূর্ণ।

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

এগুলো এমন প্যাকেজ যা শুধুমাত্র ডেভেলপমেন্টের জন্য প্রয়োজন। এখানে আমাদের `typescript` প্রয়োজন এবং যেহেতু আমরা এটি Node.js-এর সাথে ব্যবহার করছি, আমরা নোড ভেরিয়েবল এবং অবজেক্ট, যেমন `process`-এর জন্য টাইপগুলিও পাচ্ছি। [`^<version>` নোটেশন](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004)-এর অর্থ হল সেই সংস্করণ বা একটি উচ্চতর সংস্করণ যাতে ব্রেকিং পরিবর্তন নেই। সংস্করণ সংখ্যার অর্থ সম্পর্কে আরও তথ্যের জন্য [এখানে](https://semver.org) দেখুন।

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

এগুলি এমন প্যাকেজ যা `dist/app.js` চালানোর সময় রানটাইমে প্রয়োজন।

## উপসংহার {#conclusion}

আমরা এখানে যে কেন্দ্রীভূত সার্ভার তৈরি করেছি তা তার কাজ করে, যা একজন ব্যবহারকারীর জন্য এজেন্ট হিসাবে কাজ করা। অন্য যে কেউ ডিএ্যাপটি চালু রাখতে চায় এবং গ্যাস খরচ করতে ইচ্ছুক, তারা তাদের নিজস্ব ঠিকানা দিয়ে সার্ভারের একটি নতুন ইনস্ট্যান্স চালাতে পারে।

তবে, এটি কেবল তখনই কাজ করে যখন কেন্দ্রীভূত সার্ভারের ক্রিয়াগুলি সহজে যাচাই করা যায়। যদি কেন্দ্রীভূত সার্ভারের কোনো গোপন অবস্থার তথ্য থাকে, বা কঠিন গণনা চালায়, তবে এটি একটি কেন্দ্রীভূত সত্তা যা অ্যাপ্লিকেশনটি ব্যবহার করার জন্য আপনার বিশ্বাস প্রয়োজন, যা ব্লকচেইনগুলি এড়াতে চেষ্টা করে। ভবিষ্যতের একটি নিবন্ধে আমি দেখানোর পরিকল্পনা করছি যে এই সমস্যাটি কাটিয়ে উঠতে কীভাবে [জিরো-নলেজ প্রুফ](/zero-knowledge-proofs) ব্যবহার করতে হয়।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
