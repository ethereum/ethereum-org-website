---
title: "ওয়েব৩ অ্যাপের জন্য সার্ভার কম্পোনেন্ট এবং এজেন্ট"
description: "এই টিউটোরিয়ালটি পড়ার পর, আপনি এমন TypeScript সার্ভার লিখতে পারবেন যা ব্লকচেইনের ইভেন্টগুলো শোনে এবং সেই অনুযায়ী নিজস্ব ট্রানজ্যাকশন দিয়ে সাড়া দেয়। এটি আপনাকে কেন্দ্রীভূত অ্যাপ্লিকেশন লিখতে সক্ষম করবে (কারণ সার্ভারটি একটি পয়েন্ট অফ ফেইলিওর), তবে এটি ওয়েব৩ এনটিটিগুলোর সাথে ইন্টারঅ্যাক্ট করতে পারে। একই কৌশল ব্যবহার করে এমন একটি এজেন্টও লেখা যেতে পারে যা মানুষের হস্তক্ষেপ ছাড়াই অনচেইন ইভেন্টগুলোতে সাড়া দেয়।"
author: "ওরি পোমেরান্টজ"
lang: bn
tags: ["এজেন্ট", "সার্ভার", "অফচেইন", "dapps"]
skill: beginner
breadcrumb: "সার্ভার কম্পোনেন্ট"
published: 2024-07-15
---

## ভূমিকা {#introduction}

বেশিরভাগ ক্ষেত্রে, একটি বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) সফটওয়্যার বিতরণের জন্য একটি সার্ভার ব্যবহার করে, তবে সমস্ত প্রকৃত ইন্টারঅ্যাকশন ক্লায়েন্ট (সাধারণত, ওয়েব ব্রাউজার) এবং ব্লকচেইনের মধ্যে ঘটে।

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

তবে, এমন কিছু ক্ষেত্র রয়েছে যেখানে একটি অ্যাপ্লিকেশনের স্বাধীনভাবে চলা সার্ভার কম্পোনেন্ট থাকলে সুবিধা হয়। এই ধরনের সার্ভার ইভেন্টগুলোতে এবং API-এর মতো অন্যান্য উৎস থেকে আসা অনুরোধগুলোতে ট্রানজ্যাকশন ইস্যু করার মাধ্যমে সাড়া দিতে সক্ষম হবে।

![The interaction with the addition of a server](./fig-2.svg)

এই ধরনের সার্ভার বেশ কয়েকটি সম্ভাব্য কাজ সম্পাদন করতে পারে।

- গোপন স্টেটের ধারক। গেমিংয়ের ক্ষেত্রে গেমের জানা সমস্ত তথ্য খেলোয়াড়দের কাছে উপলব্ধ না রাখা প্রায়শই কার্যকর। তবে, _ব্লকচেইনে কোনো গোপনীয়তা নেই_, ব্লকচেইনে থাকা যেকোনো তথ্য যে কারো পক্ষে বের করা সহজ। অতএব, গেম স্টেটের কোনো অংশ যদি গোপন রাখতে হয়, তবে তা অন্য কোথাও সংরক্ষণ করতে হবে (এবং সম্ভবত [জিরো-নলেজ প্রুফ](/zero-knowledge-proofs) ব্যবহার করে সেই স্টেটের প্রভাবগুলো যাচাই করতে হবে)।

- কেন্দ্রীভূত ওরাকল। যদি ঝুঁকি যথেষ্ট কম হয়, তবে একটি এক্সটার্নাল সার্ভার যা অনলাইনে কিছু তথ্য পড়ে এবং তারপর তা চেইনে পোস্ট করে, সেটি একটি [ওরাকল](/developers/docs/oracles/) হিসেবে ব্যবহার করার জন্য যথেষ্ট ভালো হতে পারে।

- এজেন্ট। ব্লকচেইনে কোনো ট্রানজ্যাকশন দিয়ে সক্রিয় করা ছাড়া কিছুই ঘটে না। সুযোগ এলে [আর্বিট্রেজ](/developers/docs/mev/#mev-examples-dex-arbitrage)-এর মতো কাজগুলো করার জন্য একটি সার্ভার ব্যবহারকারীর পক্ষে কাজ করতে পারে।

## নমুনা প্রোগ্রাম {#sample-program}

আপনি [GitHub-এ](https://github.com/qbzzt/20240715-server-component) একটি নমুনা সার্ভার দেখতে পারেন। এই সার্ভারটি [এই কন্ট্রাক্ট](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) থেকে আসা ইভেন্টগুলো শোনে, যা Hardhat-এর Greeter-এর একটি পরিবর্তিত সংস্করণ। যখন গ্রিটিং পরিবর্তন করা হয়, তখন এটি আবার আগের অবস্থায় ফিরিয়ে আনে।

এটি চালানোর জন্য:

1. রিপোজিটরিটি ক্লোন করুন।

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. প্রয়োজনীয় প্যাকেজগুলো ইনস্টল করুন। যদি আপনার কাছে এটি আগে থেকে না থাকে, তবে [প্রথমে Node ইনস্টল করুন](https://nodejs.org/en/download/package-manager)।

   ```sh copy
   npm install
   ```

3. Holesky টেস্টনেটে ETH আছে এমন একটি অ্যাকাউন্টের প্রাইভেট কী নির্দিষ্ট করতে `.env` এডিট করুন। যদি Holesky-তে আপনার কোনো ETH না থাকে, তবে আপনি [এই ফসেটটি ব্যবহার করতে পারেন](https://holesky-faucet.pk910.de/)।

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. সার্ভারটি চালু করুন।

   ```sh copy
   npm start
   ```

5. [একটি ব্লক এক্সপ্লোরারে](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) যান, এবং প্রাইভেট কী আছে এমন ঠিকানাটির পরিবর্তে অন্য একটি ঠিকানা ব্যবহার করে গ্রিটিং পরিবর্তন করুন। দেখুন যে গ্রিটিংটি স্বয়ংক্রিয়ভাবে আগের অবস্থায় ফিরে গেছে।

### এটি কীভাবে কাজ করে? {#how-it-works}

কীভাবে একটি সার্ভার কম্পোনেন্ট লিখতে হয় তা বোঝার সবচেয়ে সহজ উপায় হলো নমুনাটি লাইন বাই লাইন পর্যালোচনা করা।

#### `src/app.ts` {#src-app-ts}

প্রোগ্রামটির বিশাল অংশ [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts)-এ রয়েছে।

##### পূর্বশর্ত অবজেক্টগুলো তৈরি করা {#package-json}

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

এগুলো হলো আমাদের প্রয়োজনীয় [Viem](https://viem.sh/) এনটিটি, ফাংশন এবং [`Address` টাইপ](https://viem.sh/docs/glossary/types#address)। এই সার্ভারটি [TypeScript](https://www.typescriptlang.org/)-এ লেখা হয়েছে, যা JavaScript-এর একটি এক্সটেনশন এবং এটি একে [স্ট্রংলি টাইপড](https://en.wikipedia.org/wiki/Strong_and_weak_typing) করে তোলে।

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[এই ফাংশনটি](https://viem.sh/docs/accounts/privateKey) আমাদের একটি প্রাইভেট কী-এর সাথে সম্পর্কিত ঠিকানা সহ ওয়ালেটের তথ্য তৈরি করতে দেয়।

```typescript
import { holesky } from "viem/chains"
```

Viem-এ একটি ব্লকচেইন ব্যবহার করতে আপনাকে এর ডেফিনিশন ইমপোর্ট করতে হবে। এই ক্ষেত্রে, আমরা [Holesky](https://github.com/eth-clients/holesky) টেস্ট ব্লকচেইনের সাথে কানেক্ট করতে চাই।

```typescript
// এভাবেই আমরা .env-এর সংজ্ঞাগুলো process.env-এ যোগ করি।
import * as dotenv from "dotenv"
dotenv.config()
```

এভাবেই আমরা এনভায়রনমেন্টে `.env` রিড করি। প্রাইভেট কী-এর জন্য আমাদের এটি প্রয়োজন (পরে দেখুন)।

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

একটি কন্ট্রাক্ট ব্যবহার করার জন্য আমাদের এর ঠিকানা এবং এর [ABI](/glossary/#abi) প্রয়োজন। আমরা এখানে উভয়ই প্রদান করেছি।

JavaScript-এ (এবং সেই কারণে TypeScript-এ) আপনি কোনো কনস্ট্যান্টে নতুন মান অ্যাসাইন করতে পারবেন না, তবে আপনি এতে সংরক্ষিত অবজেক্টটি পরিবর্তন করতে _পারবেন_। `as const` সাফিক্স ব্যবহার করে আমরা TypeScript-কে বলছি যে তালিকাটি নিজেই কনস্ট্যান্ট এবং এটি পরিবর্তন করা যাবে না।

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

একটি Viem [পাবলিক ক্লায়েন্ট](https://viem.sh/docs/clients/public.html) তৈরি করুন। পাবলিক ক্লায়েন্টগুলোর সাথে কোনো প্রাইভেট কী যুক্ত থাকে না, এবং তাই তারা ট্রানজ্যাকশন পাঠাতে পারে না। তারা [`view` ফাংশনগুলো](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) কল করতে পারে, অ্যাকাউন্টের ব্যালেন্স পড়তে পারে ইত্যাদি।

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

এনভায়রনমেন্ট ভেরিয়েবলগুলো [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env)-এ উপলব্ধ। তবে, TypeScript হলো স্ট্রংলি টাইপড। একটি এনভায়রনমেন্ট ভেরিয়েবল যেকোনো স্ট্রিং বা খালি হতে পারে, তাই একটি এনভায়রনমেন্ট ভেরিয়েবলের টাইপ হলো `string | undefined`। তবে, Viem-এ একটি কী-কে `0x${string}` হিসেবে সংজ্ঞায়িত করা হয় (`0x` এর পরে একটি স্ট্রিং)। এখানে আমরা TypeScript-কে বলছি যে `PRIVATE_KEY` এনভায়রনমেন্ট ভেরিয়েবলটি সেই টাইপের হবে। যদি তা না হয়, তবে আমরা একটি রানটাইম এরর পাব।

এরপর [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) ফাংশনটি একটি সম্পূর্ণ অ্যাকাউন্ট অবজেক্ট তৈরি করতে এই প্রাইভেট কী ব্যবহার করে।

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

এরপর, আমরা একটি [ওয়ালেট ক্লায়েন্ট](https://viem.sh/docs/clients/wallet) তৈরি করতে অ্যাকাউন্ট অবজেক্টটি ব্যবহার করি। এই ক্লায়েন্টটির একটি প্রাইভেট কী এবং একটি ঠিকানা রয়েছে, তাই এটি ট্রানজ্যাকশন পাঠাতে ব্যবহার করা যেতে পারে।

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

যেহেতু এখন আমাদের কাছে সমস্ত পূর্বশর্ত রয়েছে, আমরা অবশেষে একটি [কন্ট্রাক্ট ইনস্ট্যান্স](https://viem.sh/docs/contract/getContract) তৈরি করতে পারি। আমরা অনচেইন কন্ট্রাক্টের সাথে যোগাযোগ করতে এই কন্ট্রাক্ট ইনস্ট্যান্সটি ব্যবহার করব।

##### ব্লকচেইন থেকে রিড করা {#conclusion}

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

যে কন্ট্রাক্ট ফাংশনগুলো শুধুমাত্র রিড-অনলি ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) এবং [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) সেগুলো `read`-এর অধীনে উপলব্ধ। এই ক্ষেত্রে, আমরা [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) ফাংশনটি অ্যাক্সেস করতে এটি ব্যবহার করি, যা গ্রিটিং রিটার্ন করে।

JavaScript হলো সিঙ্গেল-থ্রেডেড, তাই যখন আমরা একটি দীর্ঘস্থায়ী প্রসেস চালু করি তখন আমাদের [নির্দিষ্ট করতে হবে যে আমরা এটি অ্যাসিনক্রোনাসভাবে করছি](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)। ব্লকচেইনকে কল করার জন্য, এমনকি একটি রিড-অনলি অপারেশনের জন্যও, কম্পিউটার এবং একটি ব্লকচেইন নোডের মধ্যে একটি রাউন্ড-ট্রিপ প্রয়োজন। এই কারণেই আমরা এখানে নির্দিষ্ট করি যে ফলাফলের জন্য কোডটিকে `await` করতে হবে।

এটি কীভাবে কাজ করে সে সম্পর্কে আপনি আগ্রহী হলে [এখানে পড়তে পারেন](https://www.w3schools.com/js/js_promise.asp), তবে ব্যবহারিক ক্ষেত্রে আপনার শুধু এটুকুই জানা দরকার যে আপনি যদি দীর্ঘ সময় নেয় এমন কোনো অপারেশন শুরু করেন তবে আপনাকে ফলাফলের জন্য `await` করতে হবে, এবং যে কোনো ফাংশন যা এটি করে তাকে `async` হিসেবে ডিক্লেয়ার করতে হবে।

##### ট্রানজ্যাকশন ইস্যু করা

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

গ্রিটিং পরিবর্তন করে এমন একটি ট্রানজ্যাকশন ইস্যু করতে আপনি এই ফাংশনটি কল করবেন। যেহেতু এটি একটি দীর্ঘ অপারেশন, তাই ফাংশনটিকে `async` হিসেবে ডিক্লেয়ার করা হয়েছে। অভ্যন্তরীণ ইমপ্লিমেন্টেশনের কারণে, যেকোনো `async` ফাংশনকে একটি `Promise` অবজেক্ট রিটার্ন করতে হয়। এই ক্ষেত্রে, `Promise<any>` মানে হলো আমরা নির্দিষ্ট করছি না যে `Promise`-এ ঠিক কী রিটার্ন করা হবে।

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

কন্ট্রাক্ট ইনস্ট্যান্সের `write` ফিল্ডে এমন সমস্ত ফাংশন রয়েছে যা ব্লকচেইন স্টেটে রাইট করে (যেগুলোর জন্য একটি ট্রানজ্যাকশন পাঠানো প্রয়োজন), যেমন [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)। প্যারামিটারগুলো, যদি থাকে, একটি তালিকা হিসেবে প্রদান করা হয় এবং ফাংশনটি ট্রানজ্যাকশনের হ্যাশ রিটার্ন করে।

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

ট্রানজ্যাকশনের হ্যাশ রিপোর্ট করুন (এটি দেখার জন্য ব্লক এক্সপ্লোরারের একটি URL-এর অংশ হিসেবে) এবং এটি রিটার্ন করুন।

##### ইভেন্টগুলোতে সাড়া দেওয়া

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` ফাংশনটি](https://viem.sh/docs/actions/public/watchEvent) আপনাকে নির্দিষ্ট করতে দেয় যে কোনো ইভেন্ট এমিট হলে একটি ফাংশন রান করবে। আপনি যদি শুধুমাত্র এক ধরনের ইভেন্ট নিয়ে কাজ করতে চান (এই ক্ষেত্রে, `SetGreeting`), তবে আপনি নিজেকে সেই ইভেন্ট টাইপের মধ্যে সীমাবদ্ধ রাখতে এই সিনট্যাক্সটি ব্যবহার করতে পারেন।

```typescript
    onLogs: logs => {
```

লগ এন্ট্রি থাকলে `onLogs` ফাংশনটি কল করা হয়। ইথেরিয়ামে "লগ" এবং "ইভেন্ট" সাধারণত একে অপরের পরিপূরক হিসেবে ব্যবহৃত হয়।

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

একাধিক ইভেন্ট থাকতে পারে, তবে সরলতার জন্য আমরা কেবল প্রথমটি নিয়ে কাজ করব। `logs[0].args` হলো ইভেন্টের আর্গুমেন্ট, এই ক্ষেত্রে `sender` এবং `greeting`।

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

যদি প্রেরক এই সার্ভার _না_ হয়, তবে গ্রিটিং পরিবর্তন করতে `setGreeting` ব্যবহার করুন।

#### `package.json`

[এই ফাইলটি](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) কনফিগারেশন নিয়ন্ত্রণ করে। এই নিবন্ধটি শুধুমাত্র গুরুত্বপূর্ণ ডেফিনিশনগুলো ব্যাখ্যা করে।

```json
{
  "main": "dist/index.js",
```

এই ডেফিনিশনটি নির্দিষ্ট করে যে কোন JavaScript ফাইলটি রান করতে হবে।

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

স্ক্রিপ্টগুলো হলো বিভিন্ন অ্যাপ্লিকেশন অ্যাকশন। এই ক্ষেত্রে, আমাদের কাছে কেবল `start` রয়েছে, যা কম্পাইল করে এবং তারপর সার্ভারটি রান করে। `tsc` কমান্ডটি `typescript` প্যাকেজের অংশ এবং এটি TypeScript-কে JavaScript-এ কম্পাইল করে। আপনি যদি এটি ম্যানুয়ালি রান করতে চান, তবে এটি `node_modules/.bin`-এ অবস্থিত। দ্বিতীয় কমান্ডটি সার্ভার রান করে।

```json
  "type": "module",
```

একাধিক ধরনের JavaScript নোড অ্যাপ্লিকেশন রয়েছে। `module` টাইপটি আমাদের টপ লেভেল কোডে `await` ব্যবহার করতে দেয়, যা ধীরগতির (এবং সেই কারণে অ্যাসিনক্রোনাস) অপারেশন করার সময় গুরুত্বপূর্ণ।

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

এগুলো এমন প্যাকেজ যা শুধুমাত্র ডেভেলপমেন্টের জন্য প্রয়োজন। এখানে আমাদের `typescript` প্রয়োজন এবং যেহেতু আমরা এটি Node.js-এর সাথে ব্যবহার করছি, তাই আমরা নোড ভেরিয়েবল এবং অবজেক্টগুলোর টাইপও পাচ্ছি, যেমন `process`। [`^<version>` নোটেশনটির](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) অর্থ হলো সেই সংস্করণ বা তার চেয়ে উচ্চতর সংস্করণ যাতে কোনো ব্রেকিং চেঞ্জ নেই। সংস্করণ নম্বরগুলোর অর্থ সম্পর্কে আরও তথ্যের জন্য [এখানে](https://semver.org) দেখুন।

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

এগুলো এমন প্যাকেজ যা রানটাইমে প্রয়োজন হয়, যখন `dist/app.js` রান করা হয়।

## উপসংহার

আমরা এখানে যে কেন্দ্রীভূত সার্ভারটি তৈরি করেছি তা তার কাজ করে, যা হলো একজন ব্যবহারকারীর জন্য এজেন্ট হিসেবে কাজ করা। অন্য যে কেউ যদি চায় যে dapp-টি কাজ করতে থাকুক এবং গ্যাস খরচ করতে ইচ্ছুক হয়, তবে তারা তাদের নিজস্ব ঠিকানা দিয়ে সার্ভারের একটি নতুন ইনস্ট্যান্স রান করতে পারে।

তবে, এটি কেবল তখনই কাজ করে যখন কেন্দ্রীভূত সার্ভারের কাজগুলো সহজেই যাচাই করা যায়। যদি কেন্দ্রীভূত সার্ভারে কোনো গোপন স্টেট তথ্য থাকে, বা কঠিন হিসাব-নিকাশ চালায়, তবে এটি এমন একটি কেন্দ্রীভূত এনটিটি হয়ে দাঁড়ায় যাকে অ্যাপ্লিকেশনটি ব্যবহার করার জন্য আপনার বিশ্বাস করতে হবে, যা ব্লকচেইনগুলো ঠিক এড়ানোর চেষ্টা করে। ভবিষ্যতের একটি নিবন্ধে আমি দেখানোর পরিকল্পনা করছি কীভাবে এই সমস্যাটি কাটিয়ে উঠতে [জিরো-নলেজ প্রুফ](/zero-knowledge-proofs) ব্যবহার করতে হয়।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।