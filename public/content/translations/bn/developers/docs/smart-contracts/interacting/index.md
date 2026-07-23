---
title: স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা
description: ইথেরিয়ামে আগে থেকেই ডিপ্লয় করা স্মার্ট কন্ট্রাক্ট থেকে কীভাবে ডেটা পড়তে এবং লিখতে হয় তা জানুন।
lang: bn
---

আপনাকে সবসময় নিজের স্মার্ট কন্ট্রাক্ট লিখতে এবং ডিপ্লয় করতে হবে না। একজন ডেভেলপার হিসেবে বেশিরভাগ সময়ই আপনি এমন স্মার্ট কন্ট্রাক্টগুলোর সাথে ইন্টারঅ্যাক্ট করতে চাইবেন যা অন্যরা আগে থেকেই ইথেরিয়াম নেটওয়ার্কে ডিপ্লয় করেছে।

এই পৃষ্ঠায় একটি স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার দুটি মৌলিক উপায়—ডেটা **পড়া (reading)** এবং ডেটা **লেখা (writing)**—এবং এই দুটি কাজ করার জন্য আপনার প্রয়োজনীয় টুলগুলো নিয়ে আলোচনা করা হয়েছে।

## পূর্বশর্ত {#prerequisites}

আপনার যা বোঝা উচিত:

- [স্মার্ট কন্ট্রাক্ট কীভাবে কাজ করে](/developers/docs/smart-contracts/)
- [ইথেরিয়াম অ্যাকাউন্ট এবং তারা কীভাবে ট্রানজ্যাকশন স্বাক্ষরকরণ করে](/developers/docs/accounts/)
- [ট্রানজ্যাকশন কী](/developers/docs/transactions/)

## স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার দুটি উপায় {#two-ways}

স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা দুটি বিভাগে পড়ে:

### কন্ট্রাক্ট থেকে পড়া {#reading-from-a-contract}

পড়া একটি **বিনামূল্যের** কাজ যা কোনো ট্রানজ্যাকশন তৈরি করে না এবং ব্লকচেইনের কোনো স্টেট পরিবর্তন করে না।

আপনি যখন কোনো কন্ট্রাক্ট থেকে পড়েন, তখন আপনি কেবল আগে থেকেই বিদ্যমান ডেটার খোঁজ করেন। উদাহরণস্বরূপ:

- একটি ERC-20 টোকেন ব্যালেন্স চেক করা
- একটি বিকেন্দ্রীকৃত এক্সচেঞ্জ থেকে বর্তমান মূল্য পড়া
- একটি NFT-এর মালিককে খুঁজে বের করা

যেহেতু পড়া স্টেট পরিবর্তন করে না, তাই এগুলোতে কোনো [গ্যাস](/developers/docs/gas/) খরচ হয় না এবং ETH-এর প্রয়োজন ছাড়াই যে কেউ এটি করতে পারে।

### কন্ট্রাক্টে লেখা {#writing-to-a-contract}

লেখা একটি **স্টেট-পরিবর্তনকারী** কাজ যার জন্য একটি ট্রানজ্যাকশন প্রয়োজন এবং গ্যাস খরচ হয়।

আপনি যখন কোনো কন্ট্রাক্টে লেখেন, তখন আপনি এমন একটি ফাংশন ট্রিগার করেন যা ব্লকচেইন স্টেট পরিবর্তন করে। উদাহরণস্বরূপ:

- টোকেন স্থানান্তর করা
- বিকেন্দ্রীকৃত এক্সচেঞ্জে টোকেন অদলবদল (swap) করা
- একটি NFT মিন্টিং করা

লেখার জন্য সর্বদা প্রয়োজন:

1. গ্যাসের জন্য পর্যাপ্ত ETH সহ একটি [এক্সটার্নালি ওনড অ্যাকাউন্ট (EOA)](/developers/docs/accounts/#types-of-account)
2. অ্যাকাউন্টের প্রাইভেট কী দ্বারা স্বাক্ষরিত একটি ট্রানজ্যাকশন
3. ট্রানজ্যাকশনটি মাইন করা এবং একটি ব্লকে অন্তর্ভুক্ত করা

[অ্যাকাউন্ট বিমূর্তকরণ](/roadmap/account-abstraction/)-এর মাধ্যমে, একটি স্মার্ট কন্ট্রাক্ট অ্যাকাউন্টও লেখা শুরু করতে পারে এবং একজন পেমাস্টার ব্যবহারকারীর পক্ষে গ্যাস কভার করতে পারে—তাই ETH ধারণকারী একটি EOA কঠোরভাবে প্রয়োজনীয় নয়।

## কন্ট্রাক্ট ABI বোঝা {#understanding-contract-abis}

একটি স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য, আপনার অ্যাপ্লিকেশনকে জানতে হবে কন্ট্রাক্টটি *কী* করতে পারে। এখানেই **অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)** কাজে আসে।

একটি ABI হলো একটি JSON ডকুমেন্ট যা বর্ণনা করে:

- কন্ট্রাক্টটি যে সমস্ত ফাংশন প্রকাশ করে (নাম, ইনপুট, আউটপুট)
- কন্ট্রাক্টটি যে সমস্ত ইভেন্ট নির্গত করতে পারে
- কন্ট্রাক্টের সাথে কথা বলার সময় কীভাবে ডেটা এনকোড এবং ডিকোড করতে হয়

ABI-কে কন্ট্রাক্টের নির্দেশিকা ম্যানুয়াল হিসেবে ভাবুন—এটি ছাড়া, আপনার অ্যাপ্লিকেশন জানে না কোন ফাংশনগুলো বিদ্যমান বা তারা কী প্যারামিটার আশা করে।

### একটি কন্ট্রাক্টের ABI কোথায় পাবেন {#where-to-find-abis}

- **Etherscan-এ যাচাইকৃত কন্ট্রাক্ট** - [Etherscan](https://etherscan.io) স্বয়ংক্রিয়ভাবে যাচাইকৃত সোর্স কোডের জন্য ABI প্রকাশ করে
- **ডেভেলপারের কাছ থেকে** - অনেক প্রজেক্ট তাদের ডকুমেন্টেশন বা npm প্যাকেজে তাদের ABI প্রকাশ করে
- **সোর্স থেকে তৈরি করুন** - আপনার কাছে যদি Solidity সোর্স কোড থাকে, তবে আপনি ABI তৈরি করতে এটিকে [কম্পাইল করতে](/developers/docs/smart-contracts/compiling/) পারেন

## কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য টুল এবং লাইব্রেরি {#tools-and-libraries}

ডেভেলপাররা সাধারণত একটি ওয়েব অ্যাপ, ব্যাকএন্ড বা স্ক্রিপ্ট থেকে কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করতে একটি JavaScript/TypeScript লাইব্রেরি ব্যবহার করেন।

### ক্লায়েন্ট লাইব্রেরি (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - ফার্স্ট-ক্লাস টাইপ সেফটি সহ ইথেরিয়ামের জন্য আধুনিক, হালকা ওজনের TypeScript ইন্টারফেস
- **[ethers.js](https://docs.ethers.org/)** - ইথেরিয়াম ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য পরীক্ষিত লাইব্রেরি
- **[Web3.js](https://web3js.org/)** - আসল ইথেরিয়াম JavaScript API

### ব্যাকএন্ড লাইব্রেরি {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - সার্ভার-সাইড স্ক্রিপ্ট এবং বটগুলোর জন্য Node.js-এও কাজ করে
- **[Web3.py](https://web3py.readthedocs.io/)** - ইথেরিয়াম ইন্টারঅ্যাকশনের জন্য Python লাইব্রেরি
- **[গো ইথেরিয়াম (geth)](https://geth.ethereum.org/docs/interact-with-geth)** - Geth টিমের অফিসিয়াল Go লাইব্রেরি

### উদাহরণ: Viem দিয়ে একটি টোকেন ব্যালেন্স পড়া {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC কন্ট্রাক্ট অ্যাড্রেস এবং ABI (আংশিক, balanceOf-এর জন্য)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC-এর ৬টি ডেসিমাল রয়েছে
```

### উদাহরণ: ethers.js দিয়ে একটি ট্রানজ্যাকশন পাঠানো {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 ট্রান্সফার ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // ট্রানজ্যাকশনটি মাইন হওয়ার জন্য অপেক্ষা করুন
console.log(`Transferred! TX: ${tx.hash}`)
```

## ইভেন্ট এবং লগ {#events-and-logs}

স্মার্ট কন্ট্রাক্টগুলো কোনো কিছু ঘটার সংকেত দিতে **ইভেন্ট** নির্গত করতে পারে। আপনার অ্যাপ্লিকেশন রিয়েল টাইমে প্রতিক্রিয়া জানাতে এই ইভেন্টগুলোর জন্য অপেক্ষা করতে (listen) পারে।

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC ট্রান্সফার ইভেন্টগুলোর ওপর নজর রাখুন
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## ট্রানজ্যাকশন সিমুলেট করা {#simulating}

একটি ট্রানজ্যাকশন পাঠানোর আগে, আপনি গ্যাস খরচ না করেই এটি সফল হবে কিনা তা পরীক্ষা করতে—এবং এর রিটার্ন ভ্যালু দেখতে—এটিকে **সিমুলেট** করতে পারেন। এটি আগেভাগে ত্রুটি ধরতে এবং ফলাফলের পূর্বরূপ দেখার জন্য দরকারী।

বেশিরভাগ ক্লায়েন্ট লাইব্রেরি `eth_call`-এর মাধ্যমে এটি সমর্থন করে:

```ts
// Viem-এর সাথে
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## ওয়ালেট এবং স্বাক্ষরকরণ {#wallets-and-signing}

একটি বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp)-এ, ব্যবহারকারীর ওয়ালেট (যেমন মেটামাস্ক, Rainbow, বা WalletConnect) স্বাক্ষরকরণ পরিচালনা করে। আপনি সরাসরি প্রাইভেট কী পরিচালনা করেন না।

[ওয়ালেট লাইব্রেরি এবং কানেকশন টুলগুলো](/developers/docs/apis/javascript/) এটিকে বিমূর্ত করে যাতে আপনি আপনার অ্যাপ্লিকেশন লজিক তৈরিতে ফোকাস করতে পারেন।

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [JavaScript থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Web3.js এবং Alchemy ব্যবহার করে ট্রানজ্যাকশন পাঠানো](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [কীভাবে আপনার ওয়ালেটে আপনার NFT দেখবেন](/developers/tutorials/how-to-view-nft-in-metamask/)

## আরও পড়ুন {#further-reading}

- [Viem ডকুমেন্টেশন: কন্ট্রাক্ট থেকে পড়া এবং লেখা](https://viem.sh/docs/contract/readContract)
- [ethers.js ডকুমেন্টেশন: কন্ট্রাক্ট](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI স্পেসিফিকেশন](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI কী? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## সম্পর্কিত টপিক {#related-topics}

- [স্মার্ট কন্ট্রাক্ট কম্পাইল করা](/developers/docs/smart-contracts/compiling/)
- [স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা](/developers/docs/smart-contracts/deploying/)
- [JavaScript API-সমূহ](/developers/docs/apis/javascript/)
- [ব্যাকএন্ড API-সমূহ](/developers/docs/apis/backend/)