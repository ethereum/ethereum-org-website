---
title: "আপনার কন্ট্রাক্টের জন্য একটি ইউজার ইন্টারফেস তৈরি করা"
description: "TypeScript, React, Vite এবং Wagmi-এর মতো আধুনিক উপাদানগুলো ব্যবহার করে, আমরা একটি আধুনিক কিন্তু সাধারণ ইউজার ইন্টারফেস নিয়ে আলোচনা করব এবং শিখব কীভাবে ইউজার ইন্টারফেসের সাথে একটি ওয়ালেট কানেক্ট করতে হয়, তথ্য পড়ার জন্য একটি স্মার্ট কন্ট্রাক্ট কল করতে হয়, স্মার্ট কন্ট্রাক্টে ট্রানজ্যাকশন পাঠাতে হয় এবং পরিবর্তনগুলো শনাক্ত করতে স্মার্ট কন্ট্রাক্ট থেকে ইভেন্টগুলো মনিটর করতে হয়।"
author: "ওরি পোমেরান্টজ"
tags: ["TypeScript", "React", "Vite", "Wagmi", "ফ্রন্টএন্ড"]
skill: beginner
breadcrumb: "WAGMI-এর সাথে UI"
published: 2023-11-01
lang: bn
sidebarDepth: 3
---

আপনি ইথেরিয়াম ইকোসিস্টেমে আমাদের প্রয়োজনীয় একটি ফিচার খুঁজে পেয়েছেন। এটি বাস্তবায়ন করার জন্য আপনি স্মার্ট কন্ট্রাক্ট লিখেছেন এবং হয়তো অফচেইন রান করে এমন কিছু সম্পর্কিত কোডও লিখেছেন। এটি দারুণ! দুর্ভাগ্যবশত, একটি ইউজার ইন্টারফেস ছাড়া আপনি কোনো ব্যবহারকারী পাবেন না, এবং আপনি শেষবার যখন কোনো ওয়েবসাইট লিখেছিলেন তখন মানুষ ডায়াল-আপ মডেম ব্যবহার করত এবং JavaScript নতুন ছিল।

এই নিবন্ধটি আপনার জন্য। আমি ধরে নিচ্ছি আপনি প্রোগ্রামিং জানেন, এবং হয়তো কিছুটা JavaScript ও HTML-ও জানেন, কিন্তু আপনার ইউজার ইন্টারফেসের দক্ষতাগুলো পুরোনো এবং সেকেলে হয়ে গেছে। একসাথে আমরা একটি সাধারণ আধুনিক অ্যাপ্লিকেশন নিয়ে আলোচনা করব যাতে আপনি দেখতে পারেন আজকাল কীভাবে এটি করা হয়।

## এটি কেন গুরুত্বপূর্ণ {#why-important}

তাত্ত্বিকভাবে, আপনি আপনার কন্ট্রাক্টগুলোর সাথে ইন্টারঅ্যাক্ট করার জন্য মানুষকে শুধু [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) বা [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) ব্যবহার করতে বলতে পারেন। অভিজ্ঞ ইথেরিয়াম ব্যবহারকারীদের জন্য এটি দারুণ। কিন্তু আমরা [আরও এক বিলিয়ন মানুষকে](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) সেবা দেওয়ার চেষ্টা করছি। একটি দারুণ ইউজার এক্সপেরিয়েন্স ছাড়া এটি সম্ভব হবে না, এবং একটি ব্যবহারকারীবান্ধব ইউজার ইন্টারফেস এর একটি বড় অংশ।

## Greeter অ্যাপ্লিকেশন {#greeter-app}

আধুনিক UI কীভাবে কাজ করে তার পেছনে অনেক তত্ত্ব রয়েছে, এবং [অনেক ভালো সাইট রয়েছে](https://react.dev/learn/thinking-in-react) [যেগুলো এটি ব্যাখ্যা করে](https://wagmi.sh/core/getting-started)। ওই সাইটগুলোর করা চমৎকার কাজের পুনরাবৃত্তি করার পরিবর্তে, আমি ধরে নিচ্ছি আপনি হাতে-কলমে শিখতে পছন্দ করেন এবং এমন একটি অ্যাপ্লিকেশন দিয়ে শুরু করতে চান যা নিয়ে আপনি কাজ করতে পারবেন। কাজগুলো সম্পন্ন করার জন্য আপনার এখনও তত্ত্বের প্রয়োজন হবে, এবং আমরা সেটিতে আসব - আমরা শুধু সোর্স ফাইল ধরে ধরে এগোব এবং যখন যে বিষয়টি আসবে তখন সেটি নিয়ে আলোচনা করব।

### ইনস্টলেশন {#installation}

1. অ্যাপ্লিকেশনটি [Sepolia](https://sepolia.dev/) টেস্ট নেটওয়ার্ক ব্যবহার করে। প্রয়োজন হলে, [Sepolia টেস্ট ETH সংগ্রহ করুন](/developers/docs/networks/#sepolia) এবং [আপনার ওয়ালেটে Sepolia যোগ করুন](https://chainlist.org/chain/11155111)।

2. GitHub রিপোজিটরিটি ক্লোন করুন এবং প্রয়োজনীয় প্যাকেজগুলো ইনস্টল করুন।

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. অ্যাপ্লিকেশনটি ফ্রি অ্যাক্সেস পয়েন্ট ব্যবহার করে, যেগুলোর পারফরম্যান্সের সীমাবদ্ধতা রয়েছে। আপনি যদি একটি [নোড অ্যাজ আ সার্ভিস (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) প্রোভাইডার ব্যবহার করতে চান, তবে [`src/wagmi.ts`](#wagmi-ts)-এ থাকা URL-গুলো পরিবর্তন করুন।

4. অ্যাপ্লিকেশনটি চালু করুন।

   ```sh
   npm run dev
   ```

5. অ্যাপ্লিকেশন দ্বারা দেখানো URL-এ ব্রাউজ করুন। বেশিরভাগ ক্ষেত্রে, এটি হলো [http://localhost:5173/](http://localhost:5173/)।

6. আপনি [একটি ব্লকচেইন এক্সপ্লোরারে](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) কন্ট্রাক্টের সোর্স কোড দেখতে পারেন, যা Hardhat-এর Greeter-এর একটি পরিবর্তিত সংস্করণ।

### ফাইল ওয়াক থ্রু {#file-walk-through}

#### `index.html` {#index-html}

এই ফাইলটি একটি স্ট্যান্ডার্ড HTML বয়লারপ্লেট, শুধু এই লাইনটি ছাড়া, যা স্ক্রিপ্ট ফাইলটি ইমপোর্ট করে।

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

ফাইলের এক্সটেনশনটি নির্দেশ করে যে এটি [TypeScript](https://www.typescriptlang.org/)-এ লেখা একটি [React কম্পোনেন্ট](https://www.w3schools.com/react/react_components.asp), যা JavaScript-এর একটি এক্সটেনশন এবং এটি [টাইপ চেকিং](https://en.wikipedia.org/wiki/Type_system#Type_checking) সমর্থন করে। TypeScript-কে JavaScript-এ কম্পাইল করা হয়, তাই আমরা এটি ক্লায়েন্ট সাইডে ব্যবহার করতে পারি।

আপনার আগ্রহ থাকতে পারে ভেবে এই ফাইলটি মূলত ব্যাখ্যা করা হয়েছে। সাধারণত আপনি এই ফাইলটি পরিবর্তন করবেন না, বরং [`src/App.tsx`](#app-tsx) এবং এটি যেসব ফাইল ইমপোর্ট করে সেগুলো পরিবর্তন করবেন।

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

আমাদের প্রয়োজনীয় লাইব্রেরি কোড ইমপোর্ট করুন।

```tsx
import App from './App.tsx'
```

অ্যাপ্লিকেশনটি বাস্তবায়নকারী React কম্পোনেন্টটি ইমপোর্ট করুন (নিচে দেখুন)।

```tsx
import { config } from './wagmi.ts'
```

[Wagmi](https://wagmi.sh/) কনফিগারেশন ইমপোর্ট করুন, যার মধ্যে ব্লকচেইন কনফিগারেশন অন্তর্ভুক্ত রয়েছে।

```tsx
const queryClient = new QueryClient()
```

[React Query-এর](https://tanstack.com/query/latest/docs/framework/react/overview) ক্যাশ ম্যানেজারের একটি নতুন ইনস্ট্যান্স তৈরি করে। এই অবজেক্টটি স্টোর করবে:

- ক্যাশ করা RPC কলগুলো
- কন্ট্রাক্ট রিডগুলো
- ব্যাকগ্রাউন্ড রিফেচিং স্টেট

আমাদের ক্যাশ ম্যানেজার প্রয়োজন কারণ Wagmi v3 অভ্যন্তরীণভাবে React Query ব্যবহার করে।

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

রুট React কম্পোনেন্ট তৈরি করুন। `render`-এর প্যারামিটার হলো [JSX](https://www.w3schools.com/react/react_jsx.asp), যা একটি এক্সটেনশন ল্যাঙ্গুয়েজ এবং এটি HTML ও JavaScript/TypeScript উভয়ই ব্যবহার করে। এখানকার বিস্ময়সূচক চিহ্নটি TypeScript কম্পোনেন্টকে বলে: "তুমি জানো না যে `document.getElementById('root')` `ReactDOM.createRoot`-এর জন্য একটি বৈধ প্যারামিটার হবে, কিন্তু চিন্তা কোরো না - আমি ডেভেলপার এবং আমি তোমাকে বলছি যে এটি হবে"।

```tsx
  <React.StrictMode>
```

অ্যাপ্লিকেশনটি [একটি `React.StrictMode` কম্পোনেন্টের](https://react.dev/reference/react/StrictMode) ভেতরে যাচ্ছে। এই কম্পোনেন্টটি React লাইব্রেরিকে অতিরিক্ত ডিবাগিং চেক ইনসার্ট করতে বলে, যা ডেভেলপমেন্টের সময় বেশ উপকারী।

```tsx
    <WagmiProvider config={config}>
```

অ্যাপ্লিকেশনটি [একটি `WagmiProvider` কম্পোনেন্টের](https://wagmi.sh/react/api/WagmiProvider) ভেতরেও রয়েছে। [Wagmi (আমরা এটি তৈরি করতে যাচ্ছি) লাইব্রেরি](https://wagmi.sh/) একটি ইথেরিয়াম বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) লেখার জন্য React UI ডেফিনিশনগুলোকে [Viem লাইব্রেরির](https://viem.sh/) সাথে কানেক্ট করে।

```tsx
      <QueryClientProvider client={queryClient}>
```

এবং সবশেষে, একটি React Query প্রোভাইডার যোগ করুন যাতে যেকোনো অ্যাপ্লিকেশন কম্পোনেন্ট ক্যাশ করা কোয়েরিগুলো ব্যবহার করতে পারে।

```tsx
        <App />
```

এখন আমরা অ্যাপ্লিকেশনের জন্য কম্পোনেন্টটি পেতে পারি, যা আসলে UI বাস্তবায়ন করে। কম্পোনেন্টের শেষে থাকা `/>` React-কে বলে যে XML স্ট্যান্ডার্ড অনুযায়ী এই কম্পোনেন্টের ভেতরে কোনো ডেফিনিশন নেই।

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

অবশ্যই, আমাদের অন্যান্য কম্পোনেন্টগুলো ক্লোজ করতে হবে।

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

আমাদের প্রয়োজনীয় লাইব্রেরিগুলো, সেইসাথে [`Greeter` কম্পোনেন্টটি](#greeter-tsx) ইমপোর্ট করুন।

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia চেইন আইডি।

```
function App() {
```

একটি React কম্পোনেন্ট তৈরি করার স্ট্যান্ডার্ড উপায় হলো এটি: একটি ফাংশন ডিফাইন করুন যা রেন্ডার করার প্রয়োজন হলেই কল করা হয়। এই ফাংশনে সাধারণত TypeScript বা JavaScript কোড থাকে, যার পরে একটি `return` স্টেটমেন্ট থাকে যা JSX কোড রিটার্ন করে।

```tsx
  const connection = useConnection()
```

বর্তমান কানেকশন সম্পর্কিত তথ্য, যেমন ঠিকানা এবং `chainId` পেতে [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) ব্যবহার করুন।

প্রথা অনুযায়ী, React-এ `use...` নামক ফাংশনগুলো হলো [হুক (hooks)](https://www.w3schools.com/react/react_hooks.asp)। এই ফাংশনগুলো শুধু কম্পোনেন্টে ডেটা রিটার্ন করে না; বরং ডেটা পরিবর্তিত হলে এটি যে পুনরায় রেন্ডার হয় (কম্পোনেন্ট ফাংশনটি আবার এক্সিকিউট হয় এবং এর আউটপুট HTML-এ আগেরটিকে প্রতিস্থাপন করে) তাও নিশ্চিত করে।

```tsx
  const { connectors, connect, status, error } = useConnect()
```

ওয়ালেট কানেকশন সম্পর্কে তথ্য পেতে [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) ব্যবহার করুন।

```tsx
  const { disconnect } = useDisconnect()
```

[এই হুকটি](https://wagmi.sh/react/api/hooks/useDisconnect) আমাদের ওয়ালেট থেকে ডিসকানেক্ট করার ফাংশন দেয়।

```tsx
  const { switchChain } = useSwitchChain()
```

[এই হুকটি](https://wagmi.sh/react/api/hooks/useSwitchChain) আমাদের চেইন পরিবর্তন করতে দেয়।

```tsx
  useEffect(() => {
```

React হুক [`useEffect`](https://react.dev/reference/react/useEffect) আপনাকে একটি এক্সটার্নাল সিস্টেম সিঙ্ক্রোনাইজ করার জন্য কোনো ভেরিয়েবলের মান পরিবর্তিত হলেই একটি ফাংশন রান করতে দেয়।

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

যদি আমরা কানেক্টেড থাকি, কিন্তু Sepolia ব্লকচেইনের সাথে না থাকি, তবে Sepolia-তে সুইচ করুন।

```tsx
  }, [connection.status, connection.chainId])
```

কানেকশন স্ট্যাটাস বা কানেকশন chainId পরিবর্তিত হলেই ফাংশনটি পুনরায় রান করুন।

```tsx
  return (
    <>
```

একটি React কম্পোনেন্টের JSX-কে _অবশ্যই_ একটি সিঙ্গেল HTML কম্পোনেন্ট রিটার্ন করতে হবে। যখন আমাদের একাধিক কম্পোনেন্ট থাকে এবং সেগুলোকে র‍্যাপ করার জন্য কোনো কন্টেইনারের প্রয়োজন হয় না, তখন আমরা সেগুলোকে একটি সিঙ্গেল কম্পোনেন্টে একত্রিত করতে একটি এম্পটি কম্পোনেন্ট (`<> ... </>`) ব্যবহার করি।

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

বর্তমান কানেকশন সম্পর্কে তথ্য প্রদান করুন। JSX-এর ভেতরে, `{<expression>}` মানে হলো এক্সপ্রেশনটিকে JavaScript হিসেবে ইভ্যালুয়েট করা।

```tsx
      {connection.status === 'connected' && (
```

সিনট্যাক্স `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`"।

JSX-এর ভেতরে if স্টেটমেন্ট রাখার এটিই স্ট্যান্ডার্ড উপায়।

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX XML স্ট্যান্ডার্ড অনুসরণ করে, যা HTML-এর চেয়ে বেশি কঠোর। যদি কোনো ট্যাগের সংশ্লিষ্ট এন্ড ট্যাগ না থাকে, তবে এটিকে টার্মিনেট করার জন্য এর শেষে _অবশ্যই_ একটি স্ল্যাশ (`/`) থাকতে হবে।

এখানে আমাদের এমন দুটি ট্যাগ রয়েছে, `<Greeter />` (যাতে আসলে কন্ট্রাক্টের সাথে কথা বলার HTML কোড থাকে) এবং [একটি অনুভূমিক রেখার জন্য `<hr />`](https://www.w3schools.com/tags/tag_hr.asp)।

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

ব্যবহারকারী যদি এই বাটনে ক্লিক করেন, তবে `disconnect` ফাংশনটি কল করুন।

```tsx
      {connection.status !== 'connected' && (
```

যদি আমরা কানেক্টেড _না_ থাকি, তবে ওয়ালেটে কানেক্ট করার প্রয়োজনীয় অপশনগুলো দেখান।

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors`-এ আমাদের কাছে কানেক্টরগুলোর একটি তালিকা রয়েছে। আমরা এটিকে ডিসপ্লে করার জন্য JSX বাটনের একটি তালিকায় পরিণত করতে [`map`](https://www.w3schools.com/jsref/jsref_map.asp) ব্যবহার করি।

```tsx
            <button
              key={connector.uid}
```

JSX-এ "সিবলিং" ট্যাগগুলোর (যে ট্যাগগুলো একই প্যারেন্ট থেকে আসে) জন্য আলাদা আইডেন্টিফায়ার থাকা প্রয়োজন।

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

কানেক্টর বাটনগুলো।

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

অতিরিক্ত তথ্য প্রদান করুন। এক্সপ্রেশন সিনট্যাক্স `<variable>?.<field>` JavaScript-কে বলে যে ভেরিয়েবলটি ডিফাইন করা থাকলে, সেই ফিল্ডে ইভ্যালুয়েট করো। যদি ভেরিয়েবলটি ডিফাইন করা না থাকে, তবে এই এক্সপ্রেশনটি `undefined`-এ ইভ্যালুয়েট হয়।

এক্সপ্রেশন `error.message`, যখন কোনো এরর থাকে না, তখন একটি এক্সেপশন রেইজ করবে। `error?.message` ব্যবহার করলে আমরা এই সমস্যাটি এড়াতে পারি।

#### `src/Greeter.tsx` {#greeter-tsx}

এই ফাইলে বেশিরভাগ UI ফাংশনালিটি রয়েছে। এতে এমন ডেফিনিশনগুলো অন্তর্ভুক্ত রয়েছে যা সাধারণত একাধিক ফাইলে থাকে, কিন্তু যেহেতু এটি একটি টিউটোরিয়াল, তাই প্রোগ্রামটিকে পারফরম্যান্স বা রক্ষণাবেক্ষণের সুবিধার চেয়ে প্রথমবার সহজে বোঝার জন্য অপ্টিমাইজ করা হয়েছে।

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

আমরা এই লাইব্রেরি ফাংশনগুলো ব্যবহার করি। আবারও বলছি, এগুলো যেখানে ব্যবহার করা হয়েছে তার নিচে ব্যাখ্যা করা হয়েছে।

```tsx
import { AddressType } from 'abitype'
```

[`abitype` লাইব্রেরি](https://abitype.dev/) আমাদের বিভিন্ন ইথেরিয়াম ডেটা টাইপের জন্য TypeScript ডেফিনিশন প্রদান করে, যেমন [`AddressType`](https://abitype.dev/config#addresstype)।

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` কন্ট্রাক্টের জন্য ABI।
আপনি যদি একই সময়ে কন্ট্রাক্ট এবং UI ডেভেলপ করেন, তবে আপনি সাধারণত সেগুলোকে একই রিপোজিটরিতে রাখবেন এবং Solidity কম্পাইলার দ্বারা জেনারেট করা ABI-কে আপনার অ্যাপ্লিকেশনে একটি ফাইল হিসেবে ব্যবহার করবেন। তবে, এখানে এটি প্রয়োজনীয় নয় কারণ কন্ট্রাক্টটি আগে থেকেই ডেভেলপ করা হয়েছে এবং এটি পরিবর্তিত হবে না।

আমরা TypeScript-কে এটি একটি _প্রকৃত_ কনস্ট্যান্ট তা বোঝাতে [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ব্যবহার করি। সাধারণত, আপনি যখন JavaScript-এ `const x = {"a": 1}` নির্দিষ্ট করেন, তখন আপনি `x`-এর মান পরিবর্তন করতে পারেন, আপনি শুধু এতে অ্যাসাইন করতে পারবেন না।

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript স্ট্রংলি টাইপড। আমরা এই ডেফিনিশনটি ব্যবহার করে সেই ঠিকানা নির্দিষ্ট করি যেখানে `Greeter` কন্ট্রাক্টটি বিভিন্ন চেইনে ডিপ্লয় করা হয়েছে। এর কি (key) হলো একটি সংখ্যা (chainId), এবং ভ্যালু হলো একটি `AddressType` (একটি ঠিকানা)।

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)-তে কন্ট্রাক্টের ঠিকানা।

##### `Timer` কম্পোনেন্ট {#timer-component}

`Timer` কম্পোনেন্টটি একটি নির্দিষ্ট সময়ের পর থেকে কত সেকেন্ড পার হয়েছে তা দেখায়। ব্যবহারযোগ্যতার উদ্দেশ্যে এটি গুরুত্বপূর্ণ। ব্যবহারকারীরা যখন কিছু করেন, তখন তারা তাৎক্ষণিক প্রতিক্রিয়ার আশা করেন। ব্লকচেইনে, এটি প্রায়শই অসম্ভব কারণ কোনো ট্রানজ্যাকশন ব্লকে না রাখা পর্যন্ত কিছুই ঘটে না। এর একটি সমাধান হলো ব্যবহারকারী কাজটি করার পর থেকে কতক্ষণ পার হয়েছে তা দেখানো, যাতে ব্যবহারকারী সিদ্ধান্ত নিতে পারেন যে প্রয়োজনীয় সময়টি যুক্তিসঙ্গত কি না।

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` কম্পোনেন্টটি একটি প্যারামিটার নেয়, `lastUpdate`, যা হলো শেষ কাজের সময়।

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

কম্পোনেন্টটি সঠিকভাবে কাজ করার জন্য আমাদের স্টেট (কম্পোনেন্টের সাথে যুক্ত একটি ভেরিয়েবল) থাকতে হবে এবং এটি আপডেট করতে হবে। কিন্তু আমাদের এটি পড়ার কোনো প্রয়োজন নেই, তাই ভেরিয়েবল তৈরি করার দরকার নেই।

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) ফাংশনটি আমাদের পর্যায়ক্রমিকভাবে রান করার জন্য একটি ফাংশন শিডিউল করতে দেয়। এই ক্ষেত্রে, প্রতি সেকেন্ডে। ফাংশনটি স্টেট আপডেট করার জন্য `setNow` কল করে, তাই `Timer` কম্পোনেন্টটি পুনরায় রেন্ডার হবে। আমরা এটিকে একটি এম্পটি ডিপেন্ডেন্সি লিস্টের সাথে [`useEffect`](https://react.dev/reference/react/useEffect)-এর ভেতরে র‍্যাপ করি যাতে এটি কম্পোনেন্ট রেন্ডার হওয়ার প্রতিবারের পরিবর্তে শুধু একবারই ঘটে।

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

শেষ আপডেটের পর থেকে কত সেকেন্ড পার হয়েছে তা হিসাব করুন এবং এটি রিটার্ন করুন।

##### `Greeter` কম্পোনেন্ট {#greeter-component}

```tsx
const Greeter = () => {
```

অবশেষে, আমরা কম্পোনেন্টটি ডিফাইন করতে পারি।

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

আমরা যে চেইন এবং অ্যাকাউন্ট ব্যবহার করছি সে সম্পর্কে তথ্য, [Wagmi](https://wagmi.sh/)-এর সৌজন্যে। যেহেতু এটি একটি হুক (`use...`), তাই এই তথ্য পরিবর্তিত হলেই কম্পোনেন্টটি পুনরায় রেন্ডার হয়।

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter কন্ট্রাক্টের ঠিকানা, যা `undefined` হবে যদি আমাদের কাছে চেইনের তথ্য না থাকে, অথবা আমরা এমন কোনো চেইনে থাকি যেখানে ওই কন্ট্রাক্টটি নেই।

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // কোনো আর্গুমেন্ট নেই
  })
```

[`useReadContract` হুকটি](https://wagmi.sh/react/api/hooks/useReadContract) [কন্ট্রাক্টের](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) `greet` ফাংশনটিকে কল করে।

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React-এর [`useState` হুক](https://www.w3schools.com/react/react_usestate.asp) আমাদের একটি স্টেট ভেরিয়েবল নির্দিষ্ট করতে দেয়, যার মান কম্পোনেন্টের এক রেন্ডারিং থেকে অন্য রেন্ডারিং পর্যন্ত বজায় থাকে। প্রাথমিক মানটি হলো প্যারামিটার, এই ক্ষেত্রে এম্পটি স্ট্রিং।

`useState` হুকটি দুটি মানসহ একটি তালিকা রিটার্ন করে:

1. স্টেট ভেরিয়েবলের বর্তমান মান।
2. প্রয়োজন হলে স্টেট ভেরিয়েবল পরিবর্তন করার জন্য একটি ফাংশন। যেহেতু এটি একটি হুক, তাই প্রতিবার কল করার সময় কম্পোনেন্টটি আবার রেন্ডার হয়।

এই ক্ষেত্রে, ব্যবহারকারী যে নতুন গ্রিটিং সেট করতে চান তার জন্য আমরা একটি স্টেট ভেরিয়েবল ব্যবহার করছি।

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

যদি একাধিক ব্যবহারকারী একই সময়ে একই কন্ট্রাক্ট ব্যবহার করেন, তবে তারা একে অপরের গ্রিটিং ওভাররাইট করতে পারেন। এটি ব্যবহারকারীদের কাছে মনে হতে পারে যেন অ্যাপ্লিকেশনটি ঠিকমতো কাজ করছে না। অ্যাপ্লিকেশনটি যদি দেখায় যে কে শেষবার গ্রিটিং সেট করেছে, তবে ব্যবহারকারী বুঝতে পারবেন যে এটি অন্য কেউ ছিল এবং অ্যাপ্লিকেশনটি সঠিকভাবে কাজ করছে।

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

ব্যবহারকারীরা দেখতে পছন্দ করেন যে তাদের কাজের তাৎক্ষণিক প্রভাব পড়ছে। তবে, ব্লকচেইনে এমনটি হয় না। এই স্টেট ভেরিয়েবলগুলো আমাদের অন্তত ব্যবহারকারীদের কিছু দেখাতে দেয় যাতে তারা জানতে পারেন যে তাদের কাজ চলছে।

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

যদি ওপরের `readResults` ডেটা পরিবর্তন করে এবং এটি কোনো ফলস ভ্যালুতে সেট করা না থাকে (উদাহরণস্বরূপ, `undefined`), তবে বর্তমান গ্রিটিংটিকে ব্লকচেইন থেকে পড়া গ্রিটিংয়ে আপডেট করুন। সেইসাথে, স্ট্যাটাস আপডেট করুন।

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` ইভেন্টগুলো শুনুন।

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` মানে হলো যদি মানটি `false` হয়, অথবা এমন কোনো মান হয় যা ফলস হিসেবে ইভ্যালুয়েট হয়, যেমন `undefined`, `0`, বা একটি এম্পটি স্ট্রিং, তবে সামগ্রিক এক্সপ্রেশনটি হলো `false`। অন্য যেকোনো মানের জন্য, এটি `true`। এটি মানগুলোকে বুলিয়ানে রূপান্তর করার একটি উপায়, কারণ যদি কোনো `greeterAddr` না থাকে, তবে আমরা ইভেন্টগুলো শুনতে চাই না।

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

যখন আমরা লগ দেখি (যা ঘটে যখন আমরা একটি নতুন ইভেন্ট দেখি), এর মানে হলো গ্রিটিংটি পরিবর্তন করা হয়েছে। সেই ক্ষেত্রে, আমরা `currentGreeting` এবং `lastSetterAddress`-কে নতুন মানগুলোতে আপডেট করতে পারি। সেইসাথে, আমরা স্ট্যাটাস ডিসপ্লে আপডেট করতে চাই।

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

যখন আমরা স্ট্যাটাস আপডেট করি তখন আমরা দুটি কাজ করতে চাই:

1. স্ট্যাটাস স্ট্রিং আপডেট করা (`status`)
2. শেষ স্ট্যাটাস আপডেটের সময় (`statusTime`) বর্তমান সময়ে আপডেট করা।

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

এটি নতুন গ্রিটিং ইনপুট ফিল্ডের পরিবর্তনের জন্য ইভেন্ট হ্যান্ডলার। আমরা `evt` প্যারামিটারের টাইপ নির্দিষ্ট করতে পারতাম, কিন্তু TypeScript একটি টাইপ অপশনাল ল্যাঙ্গুয়েজ। যেহেতু এই ফাংশনটি একটি HTML ইভেন্ট হ্যান্ডলারে শুধু একবারই কল করা হয়, তাই আমি মনে করি না এটি প্রয়োজনীয়।

```tsx
  const { writeContractAsync } = useWriteContract()
```

কন্ট্রাক্টে লেখার ফাংশন। এটি [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)-এর মতোই, তবে এটি আরও ভালো স্ট্যাটাস আপডেট করতে সক্ষম করে।

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

ক্লায়েন্টের দৃষ্টিকোণ থেকে একটি ব্লকচেইন ট্রানজ্যাকশন সাবমিট করার প্রক্রিয়াটি হলো:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) ব্যবহার করে ব্লকচেইনের একটি নোডে ট্রানজ্যাকশনটি পাঠান।
2. নোড থেকে রেসপন্সের জন্য অপেক্ষা করুন।
3. রেসপন্স পাওয়া গেলে, ব্যবহারকারীকে ওয়ালেটের মাধ্যমে ট্রানজ্যাকশনটি সাইন করতে বলুন। এই ধাপটি নোডের রেসপন্স পাওয়ার পরেই _অবশ্যই_ ঘটতে হবে কারণ সাইন করার আগে ব্যবহারকারীকে ট্রানজ্যাকশনের গ্যাস খরচ দেখানো হয়।
4. ব্যবহারকারীর অনুমোদনের জন্য অপেক্ষা করুন।
5. ট্রানজ্যাকশনটি আবার পাঠান, এবার [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) ব্যবহার করে।

ধাপ 2-এ লক্ষণীয় পরিমাণ সময় লাগতে পারে, যে সময়ে ব্যবহারকারীরা ভাবতে পারেন যে তাদের কমান্ডটি ইউজার ইন্টারফেস দ্বারা গৃহীত হয়েছে কি না এবং কেন তাদের এখনও ট্রানজ্যাকশনটি সাইন করতে বলা হচ্ছে না। এটি একটি খারাপ ইউজার এক্সপেরিয়েন্স (UX) তৈরি করে।

এর একটি সমাধান হলো প্রতিবার কোনো প্যারামিটার পরিবর্তিত হলে `eth_estimateGas` পাঠানো। তারপর, ব্যবহারকারী যখন সত্যিই ট্রানজ্যাকশনটি পাঠাতে চান (এই ক্ষেত্রে **Update greeting** প্রেস করে), তখন গ্যাস খরচ জানা থাকে এবং ব্যবহারকারী তাৎক্ষণিকভাবে ওয়ালেট পেজটি দেখতে পারেন।

```tsx
  return (
```

এখন আমরা অবশেষে রিটার্ন করার জন্য আসল HTML তৈরি করতে পারি।

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

বর্তমান গ্রিটিং দেখান।

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

যদি আমরা জানি যে কে শেষবার গ্রিটিং সেট করেছে, তবে সেই তথ্যটি প্রদর্শন করুন। `Greeter` এই তথ্যের ট্র্যাক রাখে না, এবং আমরা `SetGreeting` ইভেন্টগুলোর জন্য পেছনে ফিরে তাকাতে চাই না, তাই আমরা রান করার সময় গ্রিটিং পরিবর্তিত হলেই কেবল এটি পাই।

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

এটি হলো ইনপুট টেক্সট ফিল্ড যেখানে ব্যবহারকারী একটি নতুন গ্রিটিং সেট করতে পারেন। ব্যবহারকারী প্রতিবার কোনো কি (key) প্রেস করলে, আমরা `greetingChange` কল করি, যা `setNewGreeting`-কে কল করে। যেহেতু `setNewGreeting` `useState` থেকে আসে, তাই এটি `Greeter` কম্পোনেন্টটিকে পুনরায় রেন্ডার করে। এর মানে হলো:

- নতুন গ্রিটিংয়ের মান ধরে রাখতে আমাদের `value` নির্দিষ্ট করতে হবে, কারণ অন্যথায় এটি ডিফল্ট, অর্থাৎ এম্পটি স্ট্রিংয়ে ফিরে যাবে।
- `newGreeting` পরিবর্তিত হওয়ার প্রতিবার `simulation`-ও আপডেট হয়, যার মানে হলো আমরা সঠিক গ্রিটিংয়ের সাথে একটি সিমুলেশন পাব। এটি প্রাসঙ্গিক হতে পারে কারণ গ্যাস খরচ কল ডেটার সাইজের ওপর নির্ভর করে, যা স্ট্রিংয়ের দৈর্ঘ্যের ওপর নির্ভর করে।

```tsx
      <button disabled={!simulation.data}
```

ট্রানজ্যাকশন পাঠানোর জন্য প্রয়োজনীয় তথ্য পাওয়ার পরই কেবল বাটনটি এনাবল করুন।

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

স্ট্যাটাস আপডেট করুন। এই পর্যায়ে, ব্যবহারকারীকে ওয়ালেটে কনফার্ম করতে হবে।

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

ট্রানজ্যাকশনটি আসলে পাঠানোর পরেই কেবল `writeContractAsync` রিটার্ন করে। এটি আমাদের ব্যবহারকারীকে দেখাতে দেয় যে ট্রানজ্যাকশনটি ব্লকচেইনে অন্তর্ভুক্ত হওয়ার জন্য কতক্ষণ ধরে অপেক্ষা করছে।

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

স্ট্যাটাস দেখান এবং এটি আপডেট হওয়ার পর থেকে কতক্ষণ পার হয়েছে তা দেখান।

```
export {Greeter}
```

কম্পোনেন্টটি এক্সপোর্ট করুন।

#### `src/wagmi.ts` {#wagmi-ts}

অবশেষে, Wagmi সম্পর্কিত বিভিন্ন ডেফিনিশন `src/wagmi.ts`-এ রয়েছে। আমি এখানে সবকিছু ব্যাখ্যা করতে যাচ্ছি না, কারণ এর বেশিরভাগই বয়লারপ্লেট যা আপনার পরিবর্তন করার প্রয়োজন হওয়ার সম্ভাবনা কম।

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi কনফিগারেশনে এই অ্যাপ্লিকেশন দ্বারা সমর্থিত চেইনগুলো অন্তর্ভুক্ত রয়েছে। আপনি [অ্যাভেইলেবল চেইনগুলোর তালিকা](https://wagmi.sh/core/api/chains) দেখতে পারেন।

```ts
  connectors: [
    injected(),
  ],
```

[এই কানেক্টরটি](https://wagmi.sh/core/api/connectors/injected) আমাদের ব্রাউজারে ইনস্টল করা একটি ওয়ালেটের সাথে কথা বলতে দেয়।

```ts
  transports: {
    [sepolia.id]: http()
```

Viem-এর সাথে আসা ডিফল্ট HTTP এন্ডপয়েন্টটি যথেষ্ট ভালো। আমরা যদি একটি ভিন্ন URL চাই, তবে আমরা `http("https:// hostname ")` বা `webSocket("wss:// hostname ")` ব্যবহার করতে পারি।

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## আরেকটি ব্লকচেইন যোগ করা {#add-blockchain}

আজকাল অনেক [L2 স্কেলিং সলিউশন](https://ethereum.org/layer-2/) রয়েছে, এবং আপনি হয়তো এমন কিছু সমর্থন করতে চাইতে পারেন যা Viem এখনও সমর্থন করে না। এটি করতে, আপনি `src/wagmi.ts` পরিবর্তন করবেন। এই নির্দেশাবলী ব্যাখ্যা করে কীভাবে [Optimism Sepolia](https://chainlist.org/chain/11155420) যোগ করতে হয়।

1.  `src/wagmi.ts` এডিট করুন

    A. Viem থেকে `defineChain` টাইপ ইমপোর্ট করুন।

          ```ts
          import { defineChain } from 'viem'
          ```

    B. নেটওয়ার্ক ডেফিনিশন যোগ করুন। Optimism Sepolia-এর জন্য আপনার আসলে এটি করার দরকার নেই, [এটি আগে থেকেই `viem`-এ রয়েছে](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), তবে এভাবে আপনি শিখতে পারবেন কীভাবে এমন একটি ব্লকচেইন যোগ করতে হয় যা `viem`-এ নেই।

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. `createConfig` কলে নতুন চেইনটি যোগ করুন।

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Sepolia-তে স্বয়ংক্রিয় সুইচিং কমেন্ট আউট করতে `src/App.tsx` এডিট করুন। একটি প্রোডাকশন সিস্টেমে, আপনি সম্ভবত আপনার সমর্থিত প্রতিটি ব্লকচেইনের লিংকসহ বাটন দেখাবেন।

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  অ্যাপ্লিকেশনটি যাতে নতুন নেটওয়ার্কে আপনার কন্ট্রাক্টগুলোর ঠিকানা জানে তা নিশ্চিত করতে `src/Greeter.tsx` এডিট করুন।

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  আপনার ব্রাউজারে।

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true)-এ ব্রাউজ করুন এবং আপনার ওয়ালেটে চেইনটি যোগ করতে টেবিলের ডানদিকের যেকোনো একটি বাটনে ক্লিক করুন।

    B. অ্যাপ্লিকেশনে, ব্লকচেইন পরিবর্তন করতে **Disconnect** করুন এবং তারপর আবার কানেক্ট করুন। এটি হ্যান্ডেল করার আরও ভালো উপায় রয়েছে, তবে সেগুলোর জন্য অ্যাপ্লিকেশনে পরিবর্তন করতে হবে।

## উপসংহার {#conclusion}

অবশ্যই, আপনি `Greeter`-এর জন্য একটি ইউজার ইন্টারফেস প্রদান করার বিষয়ে খুব একটা মাথা ঘামান না। আপনি আপনার নিজের কন্ট্রাক্টগুলোর জন্য একটি ইউজার ইন্টারফেস তৈরি করতে চান। আপনার নিজের অ্যাপ্লিকেশন তৈরি করতে, এই ধাপগুলো রান করুন:

1. একটি Wagmi অ্যাপ্লিকেশন তৈরি করার জন্য নির্দিষ্ট করুন।

   ```sh copy
   npm create wagmi
   ```

2. এগিয়ে যেতে `y` টাইপ করুন।

3. অ্যাপ্লিকেশনটির নাম দিন।

4. **React** ফ্রেমওয়ার্ক নির্বাচন করুন।

5. **Vite** ভ্যারিয়েন্ট নির্বাচন করুন।

এখন যান এবং আপনার কন্ট্রাক্টগুলোকে পুরো বিশ্বের জন্য ব্যবহারযোগ্য করে তুলুন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।