---
title: "Waffle: ডাইনামিক মকিং এবং কন্ট্র্যাক্ট কল টেস্টিং"
description: ডাইনামিক মকিং এবং কন্ট্র্যাক্ট কল টেস্টিং ব্যবহারের জন্য উন্নত Waffle টিউটোরিয়াল
author: "ড্যানিয়েল ইজদেবস্কি"
tags:
  [
    "waffle",
    "স্মার্ট কন্ট্র্যাক্ট",
    "সলিডিটি",
    "পরীক্ষা",
    "মকিং"
  ]
skill: intermediate
lang: bn
published: 2020-11-14
---

## এই টিউটোরিয়ালটি কী সম্পর্কে? {#what-is-this-tutorial-about}

এই টিউটোরিয়ালে আপনি শিখবেন কীভাবে:

- ডাইনামিক মকিং ব্যবহার করা
- স্মার্ট কন্ট্র্যাক্টগুলির মধ্যে ইন্টারঅ্যাকশন পরীক্ষা করা

অনুমান:

- আপনি ইতিমধ্যেই জানেন কীভাবে `Solidity`-তে একটি সহজ স্মার্ট কন্ট্র্যাক্ট লিখতে হয়
- আপনি `JavaScript` এবং `TypeScript` সম্পর্কে জানেন
- আপনি অন্যান্য `Waffle` টিউটোরিয়াল করেছেন বা এটি সম্পর্কে এক-দুটি জিনিস জানেন

## ডাইনামিক মকিং {#dynamic-mocking}

ডাইনামিক মকিং কেন উপযোগী? আচ্ছা, এটি আমাদের ইন্টিগ্রেশন টেস্টের পরিবর্তে ইউনিট টেস্ট লিখতে দেয়। এর মানে কী? এর মানে হল যে আমাদের স্মার্ট কন্ট্র্যাক্টগুলির নির্ভরতা নিয়ে চিন্তা করতে হবে না, সুতরাং আমরা সেগুলির সবগুলিকে সম্পূর্ণ বিচ্ছিন্নভাবে পরীক্ষা করতে পারি। আমি আপনাকে দেখাই আপনি ঠিক কীভাবে এটি করতে পারেন।

### **১. প্রজেক্ট** {#1-project}

আমরা শুরু করার আগে আমাদের একটি সহজ node.js প্রজেক্ট প্রস্তুত করতে হবে:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# বা যদি আপনি npm ব্যবহার করেন
npm init
```

typescript এবং টেস্ট নির্ভরতা - mocha & chai যোগ করে শুরু করা যাক:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# বা যদি আপনি npm ব্যবহার করেন
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

এখন `Waffle` এবং `ethers` যোগ করা যাক:

```bash
yarn add --dev ethereum-waffle ethers
# বা যদি আপনি npm ব্যবহার করেন
npm install ethereum-waffle ethers --save-dev
```

আপনার প্রজেক্টের গঠন এখন এইরকম দেখতে হবে:

```
.
├── contracts
├── package.json
└── test
```

### **২. স্মার্ট কন্ট্র্যাক্ট** {#2-smart-contract}

ডাইনামিক মকিং শুরু করতে, আমাদের নির্ভরতা সহ একটি স্মার্ট কন্ট্র্যাক্ট প্রয়োজন। চিন্তা করবেন না, আমি আছি আপনার জন্য!

`Solidity`-তে লেখা একটি সহজ স্মার্ট কন্ট্র্যাক্ট এখানে দেওয়া হল যার একমাত্র উদ্দেশ্য হল আমরা ধনী কিনা তা পরীক্ষা করা। আমাদের কাছে পর্যাপ্ত টোকেন আছে কিনা তা পরীক্ষা করার জন্য এটি ERC20 টোকেন ব্যবহার করে। এটিকে `./contracts/AmIRichAlready.sol`-এ রাখুন।

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

যেহেতু আমরা ডাইনামিক মকিং ব্যবহার করতে চাই, তাই আমাদের পুরো ERC20-এর প্রয়োজন নেই, এই কারণে আমরা শুধুমাত্র একটি ফাংশন সহ IERC20 ইন্টারফেস ব্যবহার করছি।

এই কন্ট্র্যাক্টটি তৈরি করার সময় হয়েছে! এর জন্য আমরা `Waffle` ব্যবহার করব। প্রথমে, আমরা একটি সহজ `waffle.json` কনফিগারেশন ফাইল তৈরি করতে যাচ্ছি যা কম্পাইলেশন বিকল্পগুলি নির্দিষ্ট করে।

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

এখন আমরা Waffle দিয়ে কন্ট্র্যাক্টটি তৈরি করতে প্রস্তুত:

```bash
npx waffle
```

সহজ, তাই না? `build/` ফোল্ডারে কন্ট্র্যাক্ট এবং ইন্টারফেসের সাথে সম্পর্কিত দুটি ফাইল তৈরি হয়েছে। আমরা পরে টেস্টিংয়ের জন্য সেগুলি ব্যবহার করব।

### **৩. টেস্টিং** {#3-testing}

আসল টেস্টিংয়ের জন্য `AmIRichAlready.test.ts` নামে একটি ফাইল তৈরি করা যাক। প্রথমত, আমাদের ইম্পোর্টগুলি সামলাতে হবে। পরে আমাদের এগুলির প্রয়োজন হবে:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

JS নির্ভরতা ছাড়া, আমাদের তৈরি কন্ট্র্যাক্ট এবং ইন্টারফেসটি ইম্পোর্ট করতে হবে:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle টেস্টিংয়ের জন্য `chai` ব্যবহার করে। তবে, আমরা এটি ব্যবহার করার আগে, আমাদের Waffle-এর ম্যাচারগুলিকে chai-এর মধ্যে ইনজেক্ট করতে হবে:

```typescript
use(solidity)
```

আমাদের `beforeEach()` ফাংশন প্রয়োগ করতে হবে যা প্রতিটি পরীক্ষার আগে কন্ট্র্যাক্টের স্টেট রিসেট করবে। প্রথমে ভাবা যাক সেখানে আমাদের কী প্রয়োজন। একটি কন্ট্র্যাক্ট ডিপ্লয় করতে আমাদের দুটি জিনিস প্রয়োজন: একটি ওয়ালেট এবং `AmIRichAlready` কন্ট্র্যাক্টের জন্য আর্গুমেন্ট হিসাবে পাস করার জন্য একটি ডিপ্লয় করা ERC20 কন্ট্র্যাক্ট।

প্রথমত আমরা একটি ওয়ালেট তৈরি করি:

```typescript
const [wallet] = new MockProvider().getWallets()
```

তারপর আমাদের একটি ERC20 কন্ট্র্যাক্ট ডিপ্লয় করতে হবে। এখানে একটি কৌশলী অংশ আছে - আমাদের কাছে শুধু একটি ইন্টারফেস আছে। এটাই সেই অংশ যেখানে Waffle আমাদের বাঁচাতে আসে। Waffle-এর একটি জাদুকরী `deployMockContract()` ফাংশন আছে যা শুধুমাত্র ইন্টারফেসের _abi_ ব্যবহার করে একটি কন্ট্র্যাক্ট তৈরি করে:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

এখন ওয়ালেট এবং ডিপ্লয় করা ERC20 উভয়ই সহ, আমরা এগিয়ে গিয়ে `AmIRichAlready` কন্ট্র্যাক্টটি ডিপ্লয় করতে পারি:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

এই সবের সাথে, আমাদের `beforeEach()` ফাংশনটি শেষ হয়েছে। এখনও পর্যন্ত আপনার `AmIRichAlready.test.ts` ফাইলটি এইরকম দেখতে হবে:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

`AmIRichAlready` কন্ট্র্যাক্টের জন্য প্রথম পরীক্ষাটি লেখা যাক। আপনি কী মনে করেন আমাদের পরীক্ষাটি কী নিয়ে হওয়া উচিত? হ্যাঁ, আপনি ঠিক বলেছেন! আমাদের পরীক্ষা করা উচিত আমরা ইতিমধ্যে ধনী কিনা :)

কিন্তু এক সেকেন্ড অপেক্ষা করুন। আমাদের মক করা কন্ট্র্যাক্টটি কীভাবে জানবে কী মান ফেরাতে হবে? আমরা `balanceOf()` ফাংশনের জন্য কোনো লজিক প্রয়োগ করিনি। আবার, Waffle এখানে সাহায্য করতে পারে। আমাদের মক করা কন্ট্র্যাক্টে এখন কিছু নতুন অভিনব জিনিস রয়েছে:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

এই জ্ঞান দিয়ে আমরা অবশেষে আমাদের প্রথম পরীক্ষাটি লিখতে পারি:

```typescript
it("ওয়ালেটে 1000000 টোকেনের কম থাকলে false ফেরায়", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

এই পরীক্ষাটিকে অংশে ভাগ করা যাক:

1. আমরা আমাদের মক ERC20 কন্ট্র্যাক্ট সেট করেছি সবসময় 999999 টোকেনের ব্যালেন্স ফেরানোর জন্য।
2. `contract.check()` পদ্ধতি `false` ফেরায় কিনা তা পরীক্ষা করুন।

আমরা এটি চালানোর জন্য প্রস্তুত:

![একটি পরীক্ষা পাস হচ্ছে](./test-one.png)

সুতরাং পরীক্ষাটি কাজ করছে, কিন্তু... এখনও উন্নতির কিছু সুযোগ আছে। `balanceOf()` ফাংশনটি সবসময় 99999 ফেরাবে। আমরা একটি ওয়ালেট নির্দিষ্ট করে এটিকে উন্নত করতে পারি যার জন্য ফাংশনটি কিছু ফেরাবে - ঠিক একটি আসল কন্ট্র্যাক্টের মতো:

```typescript
it("ওয়ালেটে 1000001 টোকেনের কম থাকলে false ফেরায়", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

এখনও পর্যন্ত, আমরা কেবল সেই কেসটি পরীক্ষা করেছি যেখানে আমরা যথেষ্ট ধনী নই। এর পরিবর্তে বিপরীতটি পরীক্ষা করা যাক:

```typescript
it("ওয়ালেটে অন্তত 1000001 টোকেন থাকলে true ফেরায়", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

আপনি পরীক্ষাগুলি চালান...

![দুটি পরীক্ষা পাস হচ্ছে](test-two.png)

...এবং এই যে! আমাদের কন্ট্র্যাক্টটি যেমনটা উদ্দেশ্য ছিল সেভাবেই কাজ করছে বলে মনে হচ্ছে :)

## কন্ট্র্যাক্ট কল টেস্টিং {#testing-contract-calls}

আমরা এখন পর্যন্ত যা করেছি তার সারসংক্ষেপ করা যাক। আমরা আমাদের `AmIRichAlready` কন্ট্র্যাক্টের কার্যকারিতা পরীক্ষা করেছি এবং এটি সঠিকভাবে কাজ করছে বলে মনে হচ্ছে। তার মানে আমাদের কাজ শেষ, তাই না? ঠিক তা নয়! Waffle আমাদের কন্ট্র্যাক্ট আরও গভীরে পরীক্ষা করতে দেয়। কিন্তু ঠিক কীভাবে? আচ্ছা, Waffle-এর অস্ত্রাগারে `calledOnContract()` এবং `calledOnContractWith()` ম্যাচার রয়েছে। তারা আমাদের পরীক্ষা করতে দেবে আমাদের কন্ট্র্যাক্ট ERC20 মক কন্ট্র্যাক্টকে কল করেছে কিনা। এই ম্যাচারগুলির মধ্যে একটি দিয়ে এখানে একটি মৌলিক পরীক্ষা দেওয়া হল:

```typescript
it("কন্ট্র্যাক্ট ERC20 টোকেনে balanceOf কল করেছে কিনা তা পরীক্ষা করে", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

আমরা আরও গভীরে যেতে পারি এবং আমি আপনাকে যে অন্য ম্যাচারটির কথা বলেছি তা দিয়ে এই পরীক্ষাটিকে উন্নত করতে পারি:

```typescript
it("কন্ট্র্যাক্ট ERC20 টোকেনে নির্দিষ্ট ওয়ালেট দিয়ে balanceOf কল করেছে কিনা তা পরীক্ষা করে", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

পরীক্ষাগুলি সঠিক কিনা তা পরীক্ষা করা যাক:

![তিনটি পরীক্ষা পাস হচ্ছে](test-three.png)

দারুণ, সব পরীক্ষা সবুজ।

Waffle দিয়ে কন্ট্র্যাক্ট কল টেস্টিং করা খুব সহজ। এবং সবচেয়ে ভাল অংশটি হল। এই ম্যাচারগুলি সাধারণ এবং মক করা উভয় কন্ট্র্যাক্টের সাথেই কাজ করে! এর কারণ হল Waffle কোড ইনজেক্ট করার পরিবর্তে EVM কল রেকর্ড করে এবং ফিল্টার করে, যেমনটি অন্যান্য প্রযুক্তির জন্য জনপ্রিয় টেস্টিং লাইব্রেরির ক্ষেত্রে হয়।

## শেষ সীমা {#the-finish-line}

অভিনন্দন! এখন আপনি জানেন কীভাবে Waffle ব্যবহার করে কন্ট্র্যাক্ট কল টেস্টিং করতে হয় এবং ডাইনামিকভাবে কন্ট্র্যাক্ট মক করতে হয়। আবিষ্কার করার জন্য আরও অনেক আকর্ষণীয় বৈশিষ্ট্য রয়েছে। আমি Waffle-এর নথিপত্রে গভীরভাবে অনুসন্ধান করার সুপারিশ করি।

Waffle-এর নথিপত্র [এখানে](https://ethereum-waffle.readthedocs.io/) উপলব্ধ আছে।

এই টিউটোরিয়ালের জন্য সোর্স কোড [এখানে](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) পাওয়া যাবে।

টিউটোরিয়াল যেগুলিতে আপনার আগ্রহ থাকতে পারে:

- [Waffle দিয়ে স্মার্ট কন্ট্র্যাক্ট টেস্টিং](/developers/tutorials/waffle-test-simple-smart-contract/)
