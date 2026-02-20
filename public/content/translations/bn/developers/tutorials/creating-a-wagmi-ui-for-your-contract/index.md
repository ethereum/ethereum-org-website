---
title: "আপনার কন্ট্র্যাক্টের জন্য একটি ইউজার ইন্টারফেস তৈরি করা"
description: "TypeScript, React, Vite এবং Wagmi-এর মতো আধুনিক উপাদান ব্যবহার করে, আমরা একটি আধুনিক, কিন্তু সংক্ষিপ্ত, ইউজার ইন্টারফেস দেখব এবং শিখব কীভাবে ইউজার ইন্টারফেসের সাথে একটি ওয়ালেট সংযোগ করতে হয়, তথ্য পড়ার জন্য একটি স্মার্ট কন্ট্র্যাক্ট কল করা, একটি স্মার্ট কন্ট্র্যাক্টে লেনদেন পাঠানো, এবং পরিবর্তন শনাক্ত করতে একটি স্মার্ট কন্ট্র্যাক্ট থেকে ইভেন্টগুলি নিরীক্ষণ করা।"
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "ফ্রন্টএন্ড" ]
skill: beginner
published: 2023-11-01
lang: bn
sidebarDepth: 3
---

আপনি একটি ফিচার খুঁজে পেয়েছেন যা ইথেরিয়াম ইকোসিস্টেমে আমাদের প্রয়োজন। আপনি এটি বাস্তবায়নের জন্য স্মার্ট কন্ট্র্যাক্ট লিখেছেন, এবং সম্ভবত কিছু সম্পর্কিত কোড যা অফচেইন চলে। এটা দারুণ! দুর্ভাগ্যবশত, একটি ইউজার ইন্টারফেস ছাড়া আপনার কোনো ব্যবহারকারী থাকবে না, এবং শেষবার যখন আপনি একটি ওয়েব সাইট লিখেছিলেন তখন মানুষ ডায়াল-আপ মডেম ব্যবহার করত এবং জাভাস্ক্রিপ্ট নতুন ছিল।

এই নিবন্ধটি আপনার জন্য। আমি ধরে নিচ্ছি আপনি প্রোগ্রামিং জানেন, এবং হয়তো কিছুটা জাভাস্ক্রিপ্ট এবং HTML জানেন, কিন্তু আপনার ইউজার ইন্টারফেসের দক্ষতা মরিচা ধরা এবং পুরানো। একসাথে আমরা একটি সহজ আধুনিক অ্যাপ্লিকেশন দেখব যাতে আপনি দেখতে পারেন আজকাল এটি কীভাবে করা হয়।

## এটি কেন গুরুত্বপূর্ণ {#why-important}

তত্ত্বগতভাবে, আপনি আপনার কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য লোকেদের [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) বা [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) ব্যবহার করতে দিতে পারেন। অভিজ্ঞ ইথেরিয়ানদের জন্য এটি দারুণ হবে। কিন্তু আমরা [আরও এক বিলিয়ন মানুষকে](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) পরিষেবা দেওয়ার চেষ্টা করছি। একটি দুর্দান্ত ব্যবহারকারী অভিজ্ঞতা ছাড়া এটি ঘটবে না, এবং একটি বন্ধুত্বপূর্ণ ইউজার ইন্টারফেস এর একটি বড় অংশ।

## গ্রিটার অ্যাপ্লিকেশন {#greeter-app}

একটি আধুনিক UI কীভাবে কাজ করে তার পিছনে অনেক তত্ত্ব রয়েছে, এবং [অনেক ভাল সাইট](https://react.dev/learn/thinking-in-react) [যা এটি ব্যাখ্যা করে](https://wagmi.sh/core/getting-started) তা রয়েছে। সেই সাইটগুলির দ্বারা করা চমৎকার কাজ পুনরাবৃত্তি করার পরিবর্তে, আমি ধরে নেব যে আপনি করে শেখা পছন্দ করেন এবং এমন একটি অ্যাপ্লিকেশন দিয়ে শুরু করতে চান যা নিয়ে আপনি খেলতে পারেন। কাজগুলি সম্পন্ন করার জন্য আপনার এখনও তত্ত্বের প্রয়োজন, এবং আমরা এটিতে আসব - আমরা কেবল সোর্স ফাইল ধরে ধরে যাব, এবং যখন আমরা সেগুলিতে আসব তখন বিষয়গুলি নিয়ে আলোচনা করব।

### ইনস্টলেশন {#installation}

1. প্রয়োজনে, আপনার ওয়ালেটে [Holesky ব্লকচেইন](https://chainlist.org/?search=holesky&testnets=true) যোগ করুন এবং [টেস্ট ETH পান](https://www.holeskyfaucet.io/)।

2. গিটহাব রিপোজিটরিটি ক্লোন করুন।

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. প্রয়োজনীয় প্যাকেজগুলি ইনস্টল করুন।

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. অ্যাপ্লিকেশনটি শুরু করুন।

   ```sh
   pnpm dev
   ```

5. অ্যাপ্লিকেশন দ্বারা দেখানো URL-এ ব্রাউজ করুন। বেশিরভাগ ক্ষেত্রে, এটি হল [http://localhost:5173/](http://localhost:5173/)।

6. আপনি কন্ট্র্যাক্টের সোর্স কোড দেখতে পারেন, যা হার্ডহ্যাটের গ্রিটারের একটি সামান্য পরিবর্তিত সংস্করণ, [একটি ব্লকচেইন এক্সপ্লোরারে](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract)।

### ফাইল ওয়াক থ্রু {#file-walk-through}

#### `index.html` {#index-html}

এই ফাইলটি স্ট্যান্ডার্ড HTML বয়লারপ্লেট, এই লাইনটি ছাড়া, যা স্ক্রিপ্ট ফাইলটি আমদানি করে।

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

ফাইলের এক্সটেনশনটি আমাদের বলে যে এই ফাইলটি একটি [রিয়্যাক্ট কম্পোনেন্ট](https://www.w3schools.com/react/react_components.asp) যা [টাইপস্ক্রিপ্টে](https://www.typescriptlang.org/) লেখা, জাভাস্ক্রিপ্টের একটি এক্সটেনশন যা [টাইপ চেকিং](https://en.wikipedia.org/wiki/Type_system#Type_checking) সমর্থন করে। টাইপস্ক্রিপ্ট জাভাস্ক্রিপ্টে কম্পাইল করা হয়, তাই আমরা এটি ক্লায়েন্ট-সাইড এক্সিকিউশনের জন্য ব্যবহার করতে পারি।

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

আমাদের প্রয়োজনীয় লাইব্রেরি কোডটি ইম্পোর্ট করুন।

```tsx
import { App } from './App'
```

অ্যাপ্লিকেশনটি বাস্তবায়নকারী রিয়্যাক্ট কম্পোনেন্টটি ইম্পোর্ট করুন (নিচে দেখুন)।

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

রুট রিয়্যাক্ট কম্পোনেন্টটি তৈরি করুন। `render`-এর প্যারামিটারটি হল [JSX](https://www.w3schools.com/react/react_jsx.asp), একটি এক্সটেনশন ভাষা যা HTML এবং জাভাস্ক্রিপ্ট/টাইপস্ক্রিপ্ট উভয়ই ব্যবহার করে। এখানকার বিস্ময়সূচক চিহ্নটি টাইপস্ক্রিপ্ট কম্পোনেন্টকে বলে: "আপনি জানেন না যে `document.getElementById('root')` `ReactDOM.createRoot`-এর জন্য একটি বৈধ প্যারামিটার হবে, কিন্তু চিন্তা করবেন না - আমি ডেভেলপার এবং আমি আপনাকে বলছি যে এটি থাকবে"।

```tsx
  <React.StrictMode>
```

অ্যাপ্লিকেশনটি [একটি `React.StrictMode` কম্পোনেন্টের](https://react.dev/reference/react/StrictMode) ভিতরে যাচ্ছে। এই কম্পোনেন্টটি রিয়্যাক্ট লাইব্রেরিকে অতিরিক্ত ডিবাগিং চেক যোগ করতে বলে, যা ডেভেলপমেন্টের সময় দরকারী।

```tsx
    <WagmiConfig config={config}>
```

অ্যাপ্লিকেশনটি [একটি `WagmiConfig` কম্পোনেন্টের](https://wagmi.sh/react/api/WagmiProvider) ভিতরেও রয়েছে। wagmi (উই আর গোয়িং টু মেক ইট) লাইব্রেরি একটি ইথেরিয়াম ডিসেন্ট্রালাইজড এপ্লিকেশন লেখার জন্য রিয়্যাক্ট UI সংজ্ঞাগুলিকে viem লাইব্রেরির সাথে সংযুক্ত করে।

```tsx
      <RainbowKitProvider chains={chains}>
```

এবং পরিশেষে, [একটি `RainbowKitProvider` কম্পোনেন্ট](https://www.rainbowkit.com/)। এই কম্পোনেন্টটি লগ ইন করা এবং ওয়ালেট এবং অ্যাপ্লিকেশনের মধ্যে যোগাযোগ পরিচালনা করে।

```tsx
        <App />
```

এখন আমরা অ্যাপ্লিকেশনের জন্য কম্পোনেন্টটি পেতে পারি, যা আসলে UI বাস্তবায়ন করে। কম্পোনেন্টের শেষে `/>` রিয়্যাক্টকে বলে যে XML স্ট্যান্ডার্ড অনুযায়ী এই কম্পোনেন্টের ভিতরে কোনো সংজ্ঞা নেই।

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

অবশ্যই, আমাদের অন্যান্য কম্পোনেন্টগুলি বন্ধ করতে হবে।

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

এটি একটি রিয়্যাক্ট কম্পোনেন্ট তৈরি করার স্ট্যান্ডার্ড উপায় - একটি ফাংশন সংজ্ঞায়িত করুন যা প্রতিবার রেন্ডার করার প্রয়োজন হলে কল করা হয়। এই ফাংশনটিতে সাধারণত উপরে কিছু টাইপস্ক্রিপ্ট বা জাভাস্ক্রিপ্ট কোড থাকে, তারপর একটি `return` স্টেটমেন্ট থাকে যা JSX কোড ফেরত দেয়।

```tsx
  const { isConnected } = useAccount()
```

এখানে আমরা [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) ব্যবহার করি এটি পরীক্ষা করতে যে আমরা একটি ওয়ালেটের মাধ্যমে একটি ব্লকচেইনের সাথে সংযুক্ত আছি কি না।

প্রচলিতভাবে, রিয়্যাক্টে `use...` নামক ফাংশনগুলি হল [হুক](https://www.w3schools.com/react/react_hooks.asp) যা কিছু ধরণের ডেটা ফেরত দেয়। আপনি যখন এই ধরনের হুক ব্যবহার করেন, তখন আপনার কম্পোনেন্ট শুধুমাত্র ডেটা পায় না, বরং যখন সেই ডেটা পরিবর্তন হয় তখন কম্পোনেন্টটি আপডেট করা তথ্য দিয়ে পুনরায় রেন্ডার করা হয়।

```tsx
  return (
    <>
```

একটি রিয়্যাক্ট কম্পোনেন্টের JSX _অবশ্যই_ একটি কম্পোনেন্ট ফেরত দেবে। যখন আমাদের একাধিক কম্পোনেন্ট থাকে এবং আমাদের এমন কিছু থাকে না যা "স্বাভাবিকভাবে" মোড়ানো হয় তখন আমরা একটি খালি কম্পোনেন্ট ব্যবহার করি (`<> ...` </>`) সেগুলিকে একটি একক কম্পোনেন্টে পরিণত করতে।

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

আমরা RainbowKit থেকে [`ConnectButton` কম্পোনেন্টটি](https://www.rainbowkit.com/docs/connect-button) পাই। যখন আমরা সংযুক্ত থাকি না, তখন এটি আমাদের একটি `Connect Wallet` বোতাম দেয় যা একটি মোডাল খোলে যা ওয়ালেটগুলি ব্যাখ্যা করে এবং আপনাকে বেছে নিতে দেয় যে আপনি কোনটি ব্যবহার করবেন। যখন আমরা সংযুক্ত থাকি, তখন এটি আমাদের ব্যবহৃত ব্লকচেইন, আমাদের অ্যাকাউন্টের ঠিকানা এবং আমাদের ETH ব্যালেন্স প্রদর্শন করে। আমরা এই ডিসপ্লেগুলি ব্যবহার করে নেটওয়ার্ক পরিবর্তন করতে বা সংযোগ বিচ্ছিন্ন করতে পারি।

```tsx
      {isConnected && (
```

যখন আমাদের একটি JSX-এ আসল জাভাস্ক্রিপ্ট (বা টাইপস্ক্রিপ্ট যা জাভাস্ক্রিপ্টে কম্পাইল করা হবে) প্রবেশ করাতে হয়, আমরা বন্ধনী (`{}`) ব্যবহার করি।

`a && b` সিনট্যাক্সটি [`a ?`-এর সংক্ষিপ্ত রূপ b : a`](https://www.w3schools.com/react/react_es6_ternary.asp)-এর জন্য। অর্থাৎ, যদি `a`সত্য হয় তবে এটি`b`তে মূল্যায়ন করে এবং অন্যথায় এটি`a`তে মূল্যায়ন করে (যা`false`, `0` ইত্যাদি হতে পারে)। রিয়্যাক্টকে বলার এটি একটি সহজ উপায় যে একটি কম্পোনেন্ট শুধুমাত্র একটি নির্দিষ্ট শর্ত পূরণ হলে প্রদর্শিত হবে।

এই ক্ষেত্রে, আমরা ব্যবহারকারীকে `Greeter` শুধুমাত্র তখনই দেখাতে চাই যদি ব্যবহারকারী একটি ব্লকচেইনের সাথে সংযুক্ত থাকে।

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

এই ফাইলটিতে বেশিরভাগ UI কার্যকারিতা রয়েছে। এটিতে এমন সংজ্ঞা রয়েছে যা সাধারণত একাধিক ফাইলে থাকত, কিন্তু যেহেতু এটি একটি টিউটোরিয়াল তাই প্রোগ্রামটি প্রথমবার বোঝার জন্য সহজ করার জন্য অপ্টিমাইজ করা হয়েছে, পারফরম্যান্স বা রক্ষণাবেক্ষণের সহজতার পরিবর্তে।

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

আমরা এই লাইব্রেরি ফাংশনগুলি ব্যবহার করি। আবারও, সেগুলি যেখানে ব্যবহার করা হয় সেখানে নিচে ব্যাখ্যা করা হয়েছে।

```tsx
import { AddressType } from 'abitype'
```

[`abitype` লাইব্রেরি](https://abitype.dev/) আমাদের বিভিন্ন ইথেরিয়াম ডেটা প্রকারের জন্য টাইপস্ক্রিপ্ট সংজ্ঞা প্রদান করে, যেমন [`AddressType`](https://abitype.dev/config#addresstype)।

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` কন্ট্র্যাক্টের জন্য ABI।
আপনি যদি একই সময়ে কন্ট্র্যাক্ট এবং UI ডেভেলপ করেন তবে আপনি সাধারণত সেগুলিকে একই রিপোজিটরিতে রাখবেন এবং আপনার অ্যাপ্লিকেশনে একটি ফাইল হিসাবে সলিডিটি কম্পাইলার দ্বারা উত্পন্ন ABI ব্যবহার করবেন। তবে, এখানে এটি প্রয়োজনীয় নয় কারণ কন্ট্র্যাক্টটি ইতিমধ্যে তৈরি করা হয়েছে এবং এটি পরিবর্তন হবে না।

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

টাইপস্ক্রিপ্ট দৃঢ়ভাবে টাইপ করা হয়। আমরা এই সংজ্ঞাটি ব্যবহার করি সেই ঠিকানাটি নির্দিষ্ট করতে যেখানে `Greeter` কন্ট্র্যাক্টটি বিভিন্ন চেইনে ডিপ্লয় করা হয়েছে। কী একটি সংখ্যা (chainId), এবং মানটি হল একটি `AddressType` (একটি ঠিকানা)।

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

দুটি সমর্থিত নেটওয়ার্কে কন্ট্র্যাক্টের ঠিকানা: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) এবং [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)।

দ্রষ্টব্য: আসলে একটি তৃতীয় সংজ্ঞা রয়েছে, রেডস্টোন হোলস্কির জন্য, এটি নীচে ব্যাখ্যা করা হবে।

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

এই প্রকারটি `ShowObject` কম্পোনেন্টের একটি প্যারামিটার হিসাবে ব্যবহৃত হয় (পরে ব্যাখ্যা করা হয়েছে)। এটিতে অবজেক্টের নাম এবং তার মান অন্তর্ভুক্ত রয়েছে, যা ডিবাগিংয়ের উদ্দেশ্যে প্রদর্শিত হয়।

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

যেকোন মুহূর্তে আমরা হয় জানতে পারি অভিবাদনটি কী (কারণ আমরা এটি ব্লকচেইন থেকে পড়েছি) অথবা নাও জানতে পারি (কারণ আমরা এখনও এটি পাইনি)। তাই এমন একটি প্রকার থাকা দরকারী যা একটি স্ট্রিং বা কিছুই হতে পারে।

##### `Greeter` কম্পোনেন্ট {#greeter-component}

```tsx
const Greeter = () => {
```

অবশেষে, আমরা কম্পোনেন্টটি সংজ্ঞায়িত করতে পারি।

```tsx
  const { chain } = useNetwork()
```

আমরা যে চেইনটি ব্যবহার করছি সে সম্পর্কে তথ্য, সৌজন্যে [wagmi](https://wagmi.sh/react/hooks/useNetwork)।
যেহেতু এটি একটি হুক (`use...`), তাই প্রতিবার এই তথ্য পরিবর্তন হলে কম্পোনেন্টটি পুনরায় আঁকা হয়।

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter কন্ট্র্যাক্টের ঠিকানা, যা চেইন অনুযায়ী পরিবর্তিত হয় (এবং যা `undefined` হয় যদি আমাদের কাছে চেইন তথ্য না থাকে বা আমরা এমন একটি চেইনে থাকি যেখানে সেই কন্ট্র্যাক্টটি নেই)।

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` হুক](https://wagmi.sh/react/api/hooks/useReadContract) একটি কন্ট্র্যাক্ট থেকে তথ্য পড়ে। UI-তে `readResults` প্রসারিত করে আপনি দেখতে পারেন এটি ঠিক কী তথ্য ফেরত দেয়। এই ক্ষেত্রে আমরা চাই এটি দেখতে থাকুক যাতে অভিবাদন পরিবর্তন হলে আমরা অবহিত হই।

**দ্রষ্টব্য:** আমরা [`setGreeting` ইভেন্টগুলি](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) শুনতে পারি জানতে যে কখন অভিবাদন পরিবর্তন হয় এবং সেইভাবে আপডেট করতে। তবে, যদিও এটি আরও কার্যকর হতে পারে, এটি সব ক্ষেত্রে প্রযোজ্য হবে না। যখন ব্যবহারকারী একটি ভিন্ন চেইনে পরিবর্তন করে তখন অভিবাদনও পরিবর্তন হয়, কিন্তু সেই পরিবর্তনের সাথে কোনো ইভেন্ট থাকে না। আমরা কোডের একটি অংশ ইভেন্টগুলির জন্য শুনতে পারতাম এবং অন্যটি চেইন পরিবর্তনগুলি সনাক্ত করতে পারতাম, কিন্তু এটি কেবল [`watch` প্যারামিটার](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) সেট করার চেয়ে আরও জটিল হবে।

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

রিয়্যাক্টের [`useState` হুক](https://www.w3schools.com/react/react_usestate.asp) আমাদের একটি স্টেট ভেরিয়েবল নির্দিষ্ট করতে দেয়, যার মান কম্পোনেন্টের এক রেন্ডারিং থেকে অন্যটিতে স্থায়ী হয়। প্রাথমিক মান হল প্যারামিটার, এই ক্ষেত্রে খালি স্ট্রিং।

`useState` হুক দুটি মান সহ একটি তালিকা ফেরত দেয়:

1. স্টেট ভেরিয়েবলের বর্তমান মান।
2. প্রয়োজন হলে স্টেট ভেরিয়েবল পরিবর্তন করার জন্য একটি ফাংশন। যেহেতু এটি একটি হুক, তাই প্রতিবার এটি কল করা হলে কম্পোনেন্টটি আবার রেন্ডার করা হয়।

এই ক্ষেত্রে, আমরা একটি স্টেট ভেরিয়েবল ব্যবহার করছি নতুন অভিবাদনের জন্য যা ব্যবহারকারী সেট করতে চায়।

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

এটি নতুন অভিবাদন ইনপুট ফিল্ড পরিবর্তন হলে তার জন্য ইভেন্ট হ্যান্ডলার। প্রকারটি, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), নির্দিষ্ট করে যে এটি একটি HTML ইনপুট উপাদানের মান পরিবর্তনের জন্য একটি হ্যান্ডলার। `<HTMLInputElement>` অংশটি ব্যবহৃত হয় কারণ এটি একটি [জেনেরিক টাইপ](https://www.w3schools.com/typescript/typescript_basic_generics.php)।

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

এটি ক্লায়েন্টের দৃষ্টিকোণ থেকে একটি ব্লকচেইন লেনদেন জমা দেওয়ার প্রক্রিয়া:

1. ব্লকচেইনের একটি নোডে [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) ব্যবহার করে লেনদেনটি পাঠান।
2. নোড থেকে একটি প্রতিক্রিয়ার জন্য অপেক্ষা করুন।
3. প্রতিক্রিয়াটি পাওয়ার পর, ব্যবহারকারীকে ওয়ালেটের মাধ্যমে লেনদেনটি সাইন করতে বলুন। এই ধাপটি _অবশ্যই_ নোডের প্রতিক্রিয়া পাওয়ার পরে ঘটতে হবে কারণ ব্যবহারকারীকে লেনদেন সাইন করার আগে লেনদেনের গ্যাস খরচ দেখানো হয়।
4. ব্যবহারকারীর অনুমোদনের জন্য অপেক্ষা করুন।
5. লেনদেনটি আবার পাঠান, এবার [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) ব্যবহার করে।

ধাপ ২ সম্ভবত একটি লক্ষণীয় পরিমাণ সময় নিতে পারে, যে সময়ে ব্যবহারকারীরা ভাববেন যে তাদের কমান্ডটি সত্যিই ইউজার ইন্টারফেস দ্বারা গৃহীত হয়েছে কিনা এবং কেন তাদের ইতিমধ্যে লেনদেন সাইন করতে বলা হচ্ছে না। এটি একটি খারাপ ব্যবহারকারী অভিজ্ঞতা (UX) তৈরি করে।

সমাধান হল [প্রিপেয়ার হুক](https://wagmi.sh/react/prepare-hooks) ব্যবহার করা। প্রতিবার যখন একটি প্যারামিটার পরিবর্তন হয়, অবিলম্বে নোডকে `eth_estimateGas` অনুরোধ পাঠান। তারপর, যখন ব্যবহারকারী আসলে লেনদেনটি পাঠাতে চায় (এই ক্ষেত্রে **আপডেট গ্রিটিং** টিপে), গ্যাসের খরচ জানা থাকে এবং ব্যবহারকারী অবিলম্বে ওয়ালেট পৃষ্ঠাটি দেখতে পারে।

```tsx
  return (
```

এখন আমরা অবশেষে ফেরত দেওয়ার জন্য আসল HTML তৈরি করতে পারি।

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

একটি `ShowGreeting` কম্পোনেন্ট তৈরি করুন (নিচে ব্যাখ্যা করা হয়েছে), কিন্তু শুধুমাত্র যদি ব্লকচেইন থেকে অভিবাদনটি সফলভাবে পড়া হয়।

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

এটি ইনপুট টেক্সট ফিল্ড যেখানে ব্যবহারকারী একটি নতুন অভিবাদন সেট করতে পারে। প্রতিবার ব্যবহারকারী একটি কী চাপলে, আমরা `greetingChange` কল করি যা `setNewGreeting` কল করে। `setNewGreeting` `useState` হুক থেকে আসার কারণে, এটি `Greeter` কম্পোনেন্টকে আবার রেন্ডার করায়। এর মানে হল:

- আমাদের নতুন অভিবাদনের মান রাখতে `value` নির্দিষ্ট করতে হবে, কারণ অন্যথায় এটি ডিফল্ট, খালি স্ট্রিং-এ ফিরে যাবে।
- `usePrepareContractWrite` প্রতিবার `newGreeting` পরিবর্তনের সময় কল করা হয়, যার মানে এটি সর্বদা প্রস্তুত লেনদেনে সর্বশেষ `newGreeting` থাকবে।

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        আপডেট গ্রিটিং
      </button>
```

যদি `workingTx.write` না থাকে তবে আমরা এখনও অভিবাদন আপডেট পাঠানোর জন্য প্রয়োজনীয় তথ্যের জন্য অপেক্ষা করছি, তাই বোতামটি নিষ্ক্রিয় থাকে। যদি একটি `workingTx.write` মান থাকে তবে সেটি হল লেনদেন পাঠানোর জন্য কল করার ফাংশন।

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

অবশেষে, আমরা কী করছি তা দেখতে আপনাকে সাহায্য করার জন্য, আমরা যে তিনটি বস্তু ব্যবহার করি তা দেখান:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` কম্পোনেন্ট {#showgreeting-component}

এই কম্পোনেন্টটি দেখায়

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

একটি কম্পোনেন্ট ফাংশন কম্পোনেন্টের সমস্ত অ্যাট্রিবিউট সহ একটি প্যারামিটার গ্রহণ করে।

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` কম্পোনেন্ট {#showobject-component}

তথ্যের উদ্দেশ্যে, আমরা `ShowObject` কম্পোনেন্ট ব্যবহার করি গুরুত্বপূর্ণ বস্তুগুলি দেখানোর জন্য (`readResults` অভিবাদন পড়ার জন্য এবং `preparedTx` এবং `workingTx` আমাদের তৈরি করা লেনদেনের জন্য)।

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

আমরা UI-কে সমস্ত তথ্য দিয়ে বিশৃঙ্খল করতে চাই না, তাই সেগুলি দেখতে বা বন্ধ করা সম্ভব করার জন্য, আমরা একটি [`details`](https://www.w3schools.com/tags/tag_details.asp) ট্যাগ ব্যবহার করি।

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

বেশিরভাগ ফিল্ড [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) ব্যবহার করে প্রদর্শিত হয়।

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          ফাংশন:
          <ul>
```

ব্যতিক্রম হল ফাংশন, যা [JSON স্ট্যান্ডার্ডের](https://www.json.org/json-en.html) অংশ নয়, তাই সেগুলিকে আলাদাভাবে প্রদর্শন করতে হবে।

```tsx
          {funs.map((f, i) =>
```

JSX-এর মধ্যে, `{` কার্লি ব্র্যাকেট `}` এর ভিতরের কোড জাভাস্ক্রিপ্ট হিসাবে ব্যাখ্যা করা হয়। তারপর, `(` রেগুলার ব্র্যাকেট `)` এর ভিতরের কোডটি আবার JSX হিসাবে ব্যাখ্যা করা হয়।

```tsx
           (<li key={i}>{f}</li>)
                )}
```

রিয়্যাক্টের [DOM ট্রি](https://www.w3schools.com/js/js_htmldom.asp)-তে ট্যাগগুলির জন্য স্বতন্ত্র শনাক্তকারী প্রয়োজন। এর মানে হল একই ট্যাগের শিশুদের (এই ক্ষেত্রে, [আনঅর্ডারড তালিকা](https://www.w3schools.com/tags/tag_ul.asp)) জন্য ভিন্ন `key` অ্যাট্রিবিউট প্রয়োজন।

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

বিভিন্ন HTML ট্যাগ শেষ করুন।

##### চূড়ান্ত `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` কম্পোনেন্টটি হল সেইটি যা আমাদের অ্যাপ্লিকেশনের জন্য এক্সপোর্ট করতে হবে।

#### `src/wagmi.ts` {#wagmi-ts}

অবশেষে, WAGMI সম্পর্কিত বিভিন্ন সংজ্ঞা `src/wagmi.ts`-এ রয়েছে। আমি এখানে সবকিছু ব্যাখ্যা করতে যাচ্ছি না, কারণ এর বেশিরভাগই বয়লারপ্লেট যা আপনার পরিবর্তন করার প্রয়োজন হওয়ার সম্ভাবনা কম।

এখানকার কোডটি [গিটহাবে](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) থাকা কোডের মতো ঠিক একই নয় কারণ পরে নিবন্ধে আমরা আরেকটি চেইন ([Redstone Holesky](https://redstone.xyz/docs/network-info)) যোগ করি।

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

অ্যাপ্লিকেশনটি সমর্থন করে এমন ব্লকচেইনগুলি ইম্পোর্ট করুন। আপনি সমর্থিত চেইনের তালিকা [viem গিটহাবে](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) দেখতে পারেন।

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/) ব্যবহার করতে সক্ষম হতে আপনার অ্যাপ্লিকেশনের জন্য একটি প্রজেক্ট আইডি প্রয়োজন। আপনি এটি [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in) থেকে পেতে পারেন।

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### আরেকটি ব্লকচেইন যোগ করা {#add-blockchain}

আজকাল অনেক [L2 স্কেলিং সমাধান](/layer-2/) রয়েছে, এবং আপনি হয়তো এমন কিছু সমর্থন করতে চাইতে পারেন যা viem এখনও সমর্থন করে না। এটি করার জন্য, আপনি `src/wagmi.ts` পরিবর্তন করুন। এই নির্দেশাবলী ব্যাখ্যা করে কিভাবে [Redstone Holesky](https://redstone.xyz/docs/network-info) যোগ করতে হয়।

1. viem থেকে `defineChain` টাইপ ইম্পোর্ট করুন।

   ```ts
   import { defineChain } from 'viem'
   ```

2. নেটওয়ার্ক সংজ্ঞা যোগ করুন।

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. `configureChains` কলে নতুন চেইন যোগ করুন।

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. নিশ্চিত করুন যে অ্যাপ্লিকেশনটি নতুন নেটওয়ার্কে আপনার কন্ট্র্যাক্টের জন্য ঠিকানাটি জানে। এই ক্ষেত্রে, আমরা `src/components/Greeter.tsx` পরিবর্তন করি:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## উপসংহার {#conclusion}

অবশ্যই, আপনি `Greeter`-এর জন্য একটি ইউজার ইন্টারফেস সরবরাহ করার বিষয়ে সত্যিই চিন্তা করেন না। আপনি আপনার নিজের কন্ট্র্যাক্টের জন্য একটি ইউজার ইন্টারফেস তৈরি করতে চান। আপনার নিজের অ্যাপ্লিকেশন তৈরি করতে, এই ধাপগুলি চালান:

1. একটি wagmi অ্যাপ্লিকেশন তৈরি করতে নির্দিষ্ট করুন।

   ```sh copy
   pnpm create wagmi
   ```

2. অ্যাপ্লিকেশনটির নাম দিন।

3. **React** ফ্রেমওয়ার্ক নির্বাচন করুন।

4. **Vite** ভেরিয়েন্ট নির্বাচন করুন।

5. আপনি [Rainbow kit যোগ করতে পারেন](https://www.rainbowkit.com/docs/installation#manual-setup)।

এখন যান এবং আপনার কন্ট্র্যাক্টগুলি বৃহত্তর বিশ্বের জন্য ব্যবহারযোগ্য করে তুলুন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

