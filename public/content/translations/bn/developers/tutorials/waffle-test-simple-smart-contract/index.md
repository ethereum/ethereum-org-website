---
title: Waffle লাইব্রেরি দিয়ে সহজ স্মার্ট কন্ট্র্যাক্ট পরীক্ষা করা
description: নতুনদের জন্য টিউটোরিয়াল
author: Ewa Kowalska
tags:
  [
    "স্মার্ট কন্ট্র্যাক্ট",
    "সলিডিটি",
    "Waffle",
    "পরীক্ষা"
  ]
skill: beginner
lang: bn
published: 2021-02-26
---

## এই টিউটোরিয়ালে আপনি শিখবেন কীভাবে {#in-this-tutorial-youll-learn-how-to}

- ওয়ালেট ব্যালেন্সের পরিবর্তন পরীক্ষা করুন
- নির্দিষ্ট আর্গুমেন্ট সহ ইভেন্টগুলোর নির্গমন পরীক্ষা করুন
- নিশ্চিত করুন যে একটি ট্রানজ্যাকশন রিভার্ট করা হয়েছে

## পূর্বানুমান {#assumptions}

- আপনি একটি নতুন JavaScript বা TypeScript প্রজেক্ট তৈরি করতে পারেন
- JavaScript-এ পরীক্ষার ব্যাপারে আপনার কিছু প্রাথমিক অভিজ্ঞতা আছে
- আপনি yarn বা npm-এর মতো কিছু প্যাকেজ ম্যানেজার ব্যবহার করেছেন
- স্মার্ট কন্ট্র্যাক্ট এবং Solidity সম্পর্কে আপনার খুব প্রাথমিক জ্ঞান আছে

## শুরু করা যাক {#getting-started}

এই টিউটোরিয়ালটি yarn ব্যবহার করে পরীক্ষার সেটআপ এবং রান প্রদর্শন করে, কিন্তু আপনি যদি npm পছন্দ করেন তাতে কোনো সমস্যা নেই - আমি অফিসিয়াল Waffle [নথিপত্র](https://ethereum-waffle.readthedocs.io/en/latest/index.html)-এর সঠিক রেফারেন্স প্রদান করব।

## ডিপেন্ডেন্সি ইনস্টল করুন {#install-dependencies}

আপনার প্রজেক্টের dev ডিপেন্ডেন্সিতে ethereum-waffle এবং typescript ডিপেন্ডেন্সি [যোগ](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) করুন।

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## উদাহরণস্বরূপ স্মার্ট কন্ট্র্যাক্ট {#example-smart-contract}

টিউটোরিয়াল চলাকালীন আমরা একটি সহজ স্মার্ট কন্ট্র্যাক্টের উদাহরণ - EtherSplitter নিয়ে কাজ করব। এটি যে কাউকে কিছু wei পাঠাতে এবং দুটি পূর্বনির্ধারিত রিসিভারের মধ্যে সমানভাবে ভাগ করার অনুমতি দেওয়া ছাড়া আর বেশি কিছু করে না।
split ফাংশনের জন্য wei-এর সংখ্যা জোড় হওয়া প্রয়োজন, অন্যথায় এটি রিভার্ট হয়ে যাবে। উভয় রিসিভারের জন্য এটি একটি wei ট্রান্সফার করে এবং তারপরে ট্রান্সফার ইভেন্টের নির্গমন করে।

EtherSplitter কোডের স্নিপেটটি `src/EtherSplitter.sol`-এ রাখুন।

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## কন্ট্র্যাক্ট কম্পাইল করুন {#compile-the-contract}

কন্ট্র্যাক্টটি [কম্পাইল](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) করতে, package.json ফাইলে নিম্নলিখিত এন্ট্রি যোগ করুন:

```json
"scripts": {
    "build": "waffle"
  }
```

এরপর, প্রজেক্ট রুট ডিরেক্টরিতে Waffle কনফিগারেশন ফাইল - `waffle.json` তৈরি করুন - এবং তারপর সেখানে নিম্নলিখিত কনফিগারেশনটি পেস্ট করুন:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` চালান। ফলস্বরূপ, JSON ফরম্যাটে EtherSplitter কম্পাইল করা কন্ট্র্যাক্টসহ `build` ডিরেক্টরিটি দেখা যাবে।

## পরীক্ষার সেটআপ {#test-setup}

Waffle দিয়ে পরীক্ষা করার জন্য Chai matchers এবং Mocha ব্যবহার করতে হয়, তাই আপনাকে আপনার প্রজেক্টে সেগুলি [যোগ](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) করতে হবে। আপনার package.json ফাইলটি আপডেট করুন এবং স্ক্রিপ্ট অংশে `test` এন্ট্রি যোগ করুন:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

আপনি যদি আপনার পরীক্ষাগুলি [চালাতে](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) চান, শুধু `yarn test` চালান।

## টেস্টিং {#testing}

এখন `test` ডিরেক্টরি তৈরি করুন এবং নতুন ফাইল `test\EtherSplitter.test.ts` তৈরি করুন।
নীচের স্নিপেটটি কপি করে আমাদের পরীক্ষার ফাইলে পেস্ট করুন।

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // এখানে পরীক্ষাগুলো যোগ করুন
})
```

শুরু করার আগে কিছু কথা।
`MockProvider` ব্লকচেইনের একটি মক সংস্করণ নিয়ে আসে। এটি মক ওয়ালেটও সরবরাহ করে যা আমাদের EtherSplitter কন্ট্র্যাক্ট পরীক্ষা করার জন্য কাজ করবে। আমরা প্রোভাইডারের উপর `getWallets()` মেথড কল করে দশটি পর্যন্ত ওয়ালেট পেতে পারি। উদাহরণস্বরূপ, আমরা তিনটি ওয়ালেট পাই - প্রেরকের জন্য এবং দুটি রিসিভারের জন্য।

এরপর, আমরা 'splitter' নামের একটি ভ্যারিয়েবল ঘোষণা করি - এটি আমাদের মক EtherSplitter কন্ট্র্যাক্ট। `deployContract` মেথড দ্বারা প্রতিটি একক পরীক্ষার এক্সিকিউশনের আগে এটি তৈরি করা হয়। এই মেথডটি প্রথম প্যারামিটার হিসাবে পাস করা ওয়ালেট (আমাদের ক্ষেত্রে প্রেরকের ওয়ালেট) থেকে একটি কন্ট্র্যাক্টের ডেপ্লয়মেন্টকে সিমুলেট করে। দ্বিতীয় প্যারামিটারটি হল পরীক্ষিত কন্ট্র্যাক্টের ABI এবং বাইটকোড - আমরা সেখানে `build` ডিরেক্টরি থেকে কম্পাইল করা EtherSplitter কন্ট্র্যাক্টের json ফাইলটি পাস করি। তৃতীয় প্যারামিটারটি হল কন্ট্র্যাক্টের কনস্ট্রাক্টর আর্গুমেন্টসহ একটি অ্যারে, যা আমাদের ক্ষেত্রে, রিসিভারদের দুটি অ্যাড্রেস।

## changeBalances {#changebalances}

প্রথমে, আমরা পরীক্ষা করব যে split মেথডটি আসলে রিসিভারদের ওয়ালেটের ব্যালেন্স পরিবর্তন করে কিনা। যদি আমরা প্রেরকের অ্যাকাউন্ট থেকে 50 wei বিভক্ত করি, আমরা আশা করব যে উভয় রিসিভারের ব্যালেন্স 25 wei করে বাড়বে। আমরা Waffle-এর `changeBalances` ম্যাচার ব্যবহার করব:

```ts
it("অ্যাকাউন্টের ব্যালেন্স পরিবর্তন করে", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

ম্যাচারের প্রথম প্যারামিটার হিসেবে, আমরা রিসিভারদের ওয়ালেটের একটি অ্যারে পাস করি, এবং দ্বিতীয়টি হিসেবে - সংশ্লিষ্ট অ্যাকাউন্টগুলিতে প্রত্যাশিত বৃদ্ধির একটি অ্যারে।
যদি আমরা একটি নির্দিষ্ট ওয়ালেটের ব্যালেন্স পরীক্ষা করতে চাই, আমরা `changeBalance` ম্যাচারও ব্যবহার করতে পারি, যার জন্য নীচের উদাহরণের মতো অ্যারে পাস করার প্রয়োজন হয় না:

```ts
it("অ্যাকাউন্টের ব্যালেন্স পরিবর্তন করে", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

মনে রাখবেন যে `changeBalance` এবং `changeBalances` উভয় ক্ষেত্রেই আমরা split ফাংশনটিকে একটি কলব্যাক হিসাবে পাস করি কারণ ম্যাচারকে কলের আগে এবং পরে ব্যালেন্সের স্টেট অ্যাক্সেস করতে হয়।

এরপরে, আমরা পরীক্ষা করব যে প্রতিটি wei ট্রান্সফারের পরে Transfer ইভেন্টটি নির্গত হয়েছিল কিনা। আমরা Waffle থেকে আরেকটি ম্যাচারের দিকে যাব:

## নির্গমন {#emit}

```ts
it("প্রথম রিসিভারের কাছে স্থানান্তরে ইভেন্ট নির্গত করে", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("দ্বিতীয় রিসিভারের কাছে স্থানান্তরে ইভেন্ট নির্গত করে", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` ম্যাচার আমাদের একটি মেথড কল করার সময় একটি কন্ট্র্যাক্ট একটি ইভেন্ট নির্গত করেছে কিনা তা পরীক্ষা করার অনুমতি দেয়। `emit` ম্যাচারের প্যারামিটার হিসাবে, আমরা সেই মক কন্ট্র্যাক্ট সরবরাহ করি যা আমরা ইভেন্ট নির্গত করার পূর্বাভাস দিই, সেই ইভেন্টের নামসহ। আমাদের ক্ষেত্রে, মক কন্ট্র্যাক্ট হল `splitter` এবং ইভেন্টের নাম - `Transfer`। আমরা সেই আর্গুমেন্টের সুনির্দিষ্ট মানও যাচাই করতে পারি যার সাথে ইভেন্টটি নির্গত হয়েছিল - আমরা `withArgs` ম্যাচারে ততগুলো আর্গুমেন্ট পাস করি, যতগুলো আমাদের ইভেন্ট ডিক্লারেশন আশা করে। EtherSplitter কন্ট্র্যাক্টের ক্ষেত্রে, আমরা স্থানান্তরিত wei পরিমাণের সাথে প্রেরক এবং রিসিভারের অ্যাড্রেসগুলি পাস করি।

## revertedWith {#revertedwith}

শেষ উদাহরণ হিসাবে, আমরা পরীক্ষা করব যে wei-এর বিজোড় সংখ্যার ক্ষেত্রে ট্রানজ্যাকশনটি রিভার্ট হয়েছিল কিনা। আমরা `revertedWith` ম্যাচার ব্যবহার করব:

```ts
it("Wei-এর পরিমাণ বিজোড় হলে রিভার্ট হয়ে যায়", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

পরীক্ষাটি পাস হলে, এটি আমাদের নিশ্চিত করবে যে ট্রানজ্যাকশনটি সত্যিই রিভার্ট করা হয়েছিল। যাইহোক, আমরা `require` স্টেটমেন্টে যে বার্তাগুলো পাস করেছি এবং `revertedWith`-এ আমরা যে বার্তাটি আশা করি তার মধ্যে একটি সঠিক মিল থাকতে হবে। যদি আমরা EtherSplitter কন্ট্র্যাক্টের কোডে ফিরে যাই, wei পরিমাণের জন্য `require` স্টেটমেন্টে, আমরা বার্তাটি দিই: 'Uneven wei amount not allowed'। এটি আমাদের পরীক্ষায় প্রত্যাশিত বার্তার সাথে মিলে যায়। যদি তারা সমান না হয়, পরীক্ষা ব্যর্থ হবে।

## অভিনন্দন! {#congratulations}

আপনি Waffle দিয়ে স্মার্ট কন্ট্র্যাক্ট পরীক্ষার দিকে আপনার প্রথম বড় পদক্ষেপ নিয়েছেন!
