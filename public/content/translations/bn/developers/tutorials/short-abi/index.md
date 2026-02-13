---
title: "ক্যালডাটা অপটিমাইজেশনের জন্য সংক্ষিপ্ত ABI"
description: "অপ্টিমিস্টিক রোলআপগুলির জন্য স্মার্ট কন্ট্র্যাক্ট অপ্টিমাইজ করা"
author: Ori Pomerantz
lang: bn
tags: [ "লেয়ার 2" ]
skill: intermediate
published: 2022-04-01
---

## ভূমিকা {#introduction}

এই নিবন্ধে, আপনি [অপ্টিমিস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups), সেগুলিতে লেনদেনের খরচ, এবং কীভাবে সেই বিভিন্ন খরচ কাঠামো আমাদের Ethereum Mainnet-এর থেকে ভিন্ন জিনিসগুলির জন্য অপ্টিমাইজ করতে বাধ্য করে, সে সম্পর্কে জানবেন।
আপনি এই অপটিমাইজেশনটি কীভাবে প্রয়োগ করবেন তাও শিখবেন।

### সম্পূর্ণ প্রকাশ {#full-disclosure}

আমি একজন পূর্ণ-সময়ের [Optimism](https://www.optimism.io/) কর্মচারী, তাই এই নিবন্ধের উদাহরণগুলি Optimism-এ চলবে।
তবে, এখানে ব্যাখ্যা করা কৌশলটি অন্যান্য রোলআপগুলির জন্যও একইভাবে কাজ করবে।

### পরিভাষা {#terminology}

রোলআপগুলি নিয়ে আলোচনা করার সময়, 'লেয়ার 1' (L1) শব্দটি Mainnet, অর্থাৎ প্রোডাকশন Ethereum নেটওয়ার্কের জন্য ব্যবহৃত হয়।
'লেয়ার 2' (L2) শব্দটি রোলআপ বা অন্য কোনো সিস্টেমের জন্য ব্যবহৃত হয় যা নিরাপত্তার জন্য L1-এর উপর নির্ভর করে কিন্তু এর বেশিরভাগ প্রক্রিয়াকরণ অফচেইন করে।

## আমরা কীভাবে L2 লেনদেনের খরচ আরও কমাতে পারি? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[অপ্টিমিস্টিক রোলআপগুলি](/developers/docs/scaling/optimistic-rollups)-কে প্রতিটি ঐতিহাসিক লেনদেনের একটি রেকর্ড সংরক্ষণ করতে হয় যাতে যে কেউ সেগুলি পরীক্ষা করতে এবং বর্তমান অবস্থা সঠিক কিনা তা যাচাই করতে পারে।
Ethereum Mainnet-এ ডেটা প্রবেশ করানোর সবচেয়ে সস্তা উপায় হল এটিকে ক্যালডাটা হিসাবে লেখা।
এই সমাধানটি [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) এবং [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) উভয়ই বেছে নিয়েছে।

### L2 লেনদেনের খরচ {#cost-of-l2-transactions}

L2 লেনদেনের খরচ দুটি উপাদান নিয়ে গঠিত:

1. L2 প্রক্রিয়াকরণ, যা সাধারণত অত্যন্ত সস্তা
2. L1 স্টোরেজ, যা Mainnet গ্যাস খরচের সাথে যুক্ত

আমি যখন এটি লিখছি, Optimism-এ L2 গ্যাসের খরচ 0.001 [Gwei](/developers/docs/gas/#pre-london)।
অন্যদিকে, L1 গ্যাসের খরচ প্রায় 40 gwei।
[আপনি এখানে বর্তমান দাম দেখতে পারেন](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)।

ক্যালডাটার এক বাইটের খরচ হয় 4 গ্যাস (যদি এটি শূন্য হয়) অথবা 16 গ্যাস (যদি এটি অন্য কোনো মান হয়)।
EVM-এর সবচেয়ে ব্যয়বহুল অপারেশনগুলির মধ্যে একটি হল স্টোরেজে লেখা।
L2-তে স্টোরেজে একটি 32-বাইট শব্দ লেখার সর্বোচ্চ খরচ হল 22100 গ্যাস। বর্তমানে, এটি 22.1 gwei।
সুতরাং যদি আমরা ক্যালডাটার একটি মাত্র শূন্য বাইট সংরক্ষণ করতে পারি, তাহলে আমরা প্রায় 200 বাইট স্টোরেজে লিখতে পারব এবং তারপরেও এগিয়ে থাকব।

### ABI {#the-abi}

বেশিরভাগ লেনদেন একটি বাহ্যিকভাবে-মালিকানাধীন অ্যাকাউন্ট থেকে একটি চুক্তিতে অ্যাক্সেস করে।
বেশিরভাগ কন্ট্র্যাক্ট Solidity-তে লেখা হয় এবং [অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) অনুযায়ী তাদের ডেটা ফিল্ড ব্যাখ্যা করে।

যাইহোক, ABI L1-এর জন্য ডিজাইন করা হয়েছিল, যেখানে ক্যালডাটার এক বাইটের খরচ প্রায় চারটি গাণিতিক অপারেশনের সমান, L2-এর মতো নয় যেখানে ক্যালডাটার এক বাইটের খরচ এক হাজারেরও বেশি গাণিতিক অপারেশনের সমান।
ক্যালডাটা এইভাবে বিভক্ত:

| বিভাগ          | দৈর্ঘ্য |  বাইট | নষ্ট বাইট | নষ্ট গ্যাস | প্রয়োজনীয় বাইট | প্রয়োজনীয় গ্যাস |
| -------------- | ------: | ----: | --------: | ---------: | ---------------: | ----------------: |
| ফাংশন সিলেক্টর |       4 |   0-3 |         3 |         48 |                1 |                16 |
| শূন্য          |      12 |  4-15 |        12 |         48 |                0 |                 0 |
| গন্তব্য ঠিকানা |      20 | 16-35 |         0 |          0 |               20 |               320 |
| পরিমাণ         |      32 | 36-67 |        17 |         64 |               15 |               240 |
| মোট            |      68 |       |           |        160 |                  |               576 |

ব্যাখ্যা:

- **ফাংশন সিলেক্টর**: কন্ট্র্যাক্টটিতে 256টিরও কম ফাংশন আছে, তাই আমরা সেগুলিকে একটি একক বাইট দিয়ে আলাদা করতে পারি।
  এই বাইটগুলি সাধারণত নন-জিরো হয় এবং তাই [ষোল গ্যাস খরচ হয়](https://eips.ethereum.org/EIPS/eip-2028)।
- **শূন্য**: এই বাইটগুলি সর্বদা শূন্য থাকে কারণ একটি বিশ-বাইট ঠিকানার জন্য এটি ধরে রাখার জন্য একটি বত্রিশ-বাইট শব্দের প্রয়োজন হয় না।
  শূন্য ধারণকারী বাইটের জন্য চার গ্যাস খরচ হয় ([ইয়েলো পেপার দেখুন](https://ethereum.github.io/yellowpaper/paper.pdf), পরিশিষ্ট G,
  পৃ. 27, `G`<sub>`txdatazero`</sub>-এর মান)।
- **পরিমাণ**: যদি আমরা ধরে নিই যে এই কন্ট্র্যাক্টে `decimals` আঠারো (সাধারণ মান) এবং আমরা যে সর্বোচ্চ পরিমাণ টোকেন স্থানান্তর করব তা হল 10<sup>18</sup>, তাহলে আমরা সর্বোচ্চ পরিমাণ 10<sup>36</sup> পাই।
  256<sup>15</sup> &gt; 10<sup>36</sup>, তাই পনেরো বাইটই যথেষ্ট।

L1-এ 160 গ্যাস নষ্ট হওয়া সাধারণত নগণ্য। একটি লেনদেনের খরচ কমপক্ষে [21,000 গ্যাস](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), তাই অতিরিক্ত 0.8% কোনো ব্যাপার না।
তবে, L2-তে, পরিস্থিতি ভিন্ন। লেনদেনের প্রায় সম্পূর্ণ খরচই হল এটিকে L1-এ লেখা।
লেনদেনের ক্যালডাটা ছাড়াও, 109 বাইটের লেনদেন হেডার (গন্তব্য ঠিকানা, স্বাক্ষর ইত্যাদি) রয়েছে।
সুতরাং মোট খরচ হল `109*16+576+160=2480`, এবং আমরা এর প্রায় 6.5% নষ্ট করছি।

## যখন আপনি গন্তব্য নিয়ন্ত্রণ করেন না তখন খরচ কমানো {#reducing-costs-when-you-dont-control-the-destination}

ধরে নিচ্ছি যে আপনার গন্তব্য কন্ট্র্যাক্টের উপর কোনো নিয়ন্ত্রণ নেই, আপনি এখনও [এটির](https://github.com/qbzzt/ethereum.org-20220330-shortABI) মতো একটি সমাধান ব্যবহার করতে পারেন।
চলুন প্রাসঙ্গিক ফাইলগুলি দেখে নেওয়া যাক।

### Token.sol {#token-sol}

[এটি হল গন্তব্য কন্ট্র্যাক্ট](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)।
এটি একটি স্ট্যান্ডার্ড ERC-20 কন্ট্র্যাক্ট, একটি অতিরিক্ত বৈশিষ্ট্য সহ।
এই `faucet` ফাংশনটি যেকোনো ব্যবহারকারীকে ব্যবহার করার জন্য কিছু টোকেন পেতে দেয়।
এটি একটি প্রোডাকশন ERC-20 কন্ট্র্যাক্টকে অকেজো করে দেবে, কিন্তু যখন একটি ERC-20 শুধুমাত্র পরীক্ষার সুবিধার্থে বিদ্যমান থাকে তখন এটি জীবনকে সহজ করে তোলে।

```solidity
    /**
     * @dev কলারকে খেলার জন্য 1000 টোকেন দেয়
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[এইটি সেই কন্ট্র্যাক্ট যাকে লেনদেনগুলি সংক্ষিপ্ত ক্যালডাটা দিয়ে কল করার কথা](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)।
আসুন এটি লাইন বাই লাইন পর্যালোচনা করা যাক।

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

টোকেন ফাংশনটিকে কীভাবে কল করতে হয় তা জানতে আমাদের এটি প্রয়োজন।

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

টোকেনের ঠিকানা যার জন্য আমরা একটি প্রক্সি।

```solidity

    /**
     * @dev টোকেনের ঠিকানা উল্লেখ করুন
     * @param tokenAddr_ ERC-20 চুক্তির ঠিকানা
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

টোকেনের ঠিকানা হল একমাত্র প্যারামিটার যা আমাদের উল্লেখ করতে হবে।

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

ক্যালডাটা থেকে একটি মান পড়ুন।

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

আমরা মেমরিতে একটি একক 32-বাইট (256-বিট) শব্দ লোড করতে যাচ্ছি এবং যে বাইটগুলি আমরা চাই সেই ফিল্ডের অংশ নয় তা সরিয়ে ফেলতে যাচ্ছি।
এই অ্যালগরিদম 32 বাইটের চেয়ে দীর্ঘ মানের জন্য কাজ করে না এবং অবশ্যই আমরা ক্যালডাটার শেষ পর্যন্ত পড়তে পারি না।
L1-এ গ্যাস বাঁচানোর জন্য এই পরীক্ষাগুলি এড়িয়ে যাওয়ার প্রয়োজন হতে পারে, কিন্তু L2-এ গ্যাস অত্যন্ত সস্তা, যা আমরা ভাবতে পারি এমন যেকোনো স্যানিটি চেক করতে সক্ষম করে।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

আমরা `fallback()`-এ করা কল থেকে ডেটা কপি করতে পারতাম (নিচে দেখুন), কিন্তু [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) ব্যবহার করা সহজ, যা EVM-এর অ্যাসেম্বলি ল্যাঙ্গুয়েজ।

এখানে আমরা স্ট্যাকের মধ্যে `startByte` থেকে `startByte+31` বাইটগুলি পড়ার জন্য [CALLDATALOAD অপকোড](https://www.evm.codes/#35) ব্যবহার করি।
সাধারণভাবে, Yul-এ একটি অপকোডের সিনট্যাক্স হল `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`।

```solidity

        _retVal = _retVal >> (256-length*8);
```

কেবলমাত্র সবচেয়ে গুরুত্বপূর্ণ `length` বাইটগুলি ফিল্ডের অংশ, তাই আমরা অন্যান্য মানগুলি থেকে মুক্তি পেতে [রাইট-শিফ্ট](https://en.wikipedia.org/wiki/Logical_shift) করি।
এর একটি অতিরিক্ত সুবিধা হল এটি মানটিকে ফিল্ডের ডানদিকে নিয়ে যায়, তাই এটি মানটি নিজেই হয়, মানটিকে 256<sup>কিছু</sup> দিয়ে গুণ করার পরিবর্তে।

```solidity

        return _retVal;
    }


    fallback() external {
```

যখন একটি Solidity কন্ট্র্যাক্টে করা কল কোনো ফাংশন সিগনেচারের সাথে মেলে না, তখন এটি [the `fallback()` function](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)-কে কল করে (ধরে নেওয়া হয় যে একটি আছে)।
`CalldataInterpreter`-এর ক্ষেত্রে, _যেকোনো_ কল এখানে আসে কারণ অন্য কোনো `external` বা `public` ফাংশন নেই।

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

ক্যালডাটার প্রথম বাইটটি পড়ুন, যা আমাদের ফাংশনটি জানায়।
দুটি কারণে একটি ফাংশন এখানে উপলব্ধ নাও হতে পারে:

1. `pure` বা `view` ফাংশনগুলি স্টেট পরিবর্তন করে না এবং গ্যাস খরচ করে না (যখন অফচেইন কল করা হয়)।
   তাদের গ্যাস খরচ কমানোর চেষ্টা করার কোন মানে হয় না।
2. যে ফাংশনগুলি [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)-এর উপর নির্ভর করে।
   `msg.sender`-এর মান কলার নয়, `CalldataInterpreter`-এর ঠিকানা হতে চলেছে।

দুর্ভাগ্যবশত, [ERC-20 স্পেসিফিকেশন দেখলে](https://eips.ethereum.org/EIPS/eip-20), এটি শুধুমাত্র একটি ফাংশন ছেড়ে দেয়, `transfer`।
এটি আমাদের জন্য মাত্র দুটি ফাংশন রেখে যায়: `transfer` (কারণ আমরা `transferFrom` কল করতে পারি) এবং `faucet` (কারণ আমরা যে কেউ আমাদের কল করেছে তাকে টোকেনগুলি ফেরত পাঠাতে পারি)।

```solidity

        // ক্যালডাটা থেকে তথ্য ব্যবহার করে
        // টোকেনের অবস্থা পরিবর্তনকারী পদ্ধতিগুলিকে কল করুন

        // faucet
        if (_func == 1) {
```

`faucet()`-এ একটি কল, যার কোনো প্যারামিটার নেই।

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

আমরা `token.faucet()` কল করার পরে আমরা টোকেন পাই। তবে, প্রক্সি চুক্তি হিসাবে, আমাদের টোকেনের **প্রয়োজন নেই**।
যে EOA (externally owned account) বা কন্ট্র্যাক্ট আমাদের কল করেছে, তার প্রয়োজন।
তাই আমরা আমাদের সমস্ত টোকেন যে কেউ আমাদের ডেকেছে তাকে স্থানান্তর করি।

```solidity
        // স্থানান্তর (ধরে নিন আমাদের এর জন্য একটি ভাতা আছে)
        if (_func == 2) {
```

টোকেন স্থানান্তরের জন্য দুটি প্যারামিটার প্রয়োজন: গন্তব্য ঠিকানা এবং পরিমাণ।

```solidity
            token.transferFrom(
                msg.sender,
```

আমরা কেবল কলারদের তাদের মালিকানাধীন টোকেনগুলি স্থানান্তর করার অনুমতি দিই

```solidity
                address(uint160(calldataVal(1, 20))),
```

গন্তব্যের ঠিকানাটি বাইট #1 থেকে শুরু হয় (বাইট #0 হল ফাংশন)।
একটি ঠিকানা হিসাবে, এটি 20-বাইট দীর্ঘ।

```solidity
                calldataVal(21, 2)
```

এই নির্দিষ্ট চুক্তির জন্য আমরা ধরে নিই যে সর্বোচ্চ সংখ্যক টোকেন যা কেউ স্থানান্তর করতে চায় তা দুটি বাইটে (65536-এর কম) ফিট করে।

```solidity
            );
        }
```

সামগ্রিকভাবে, একটি স্থানান্তরে 35 বাইট ক্যালডাটা লাগে:

| বিভাগ          | দৈর্ঘ্য |  বাইট |
| -------------- | ------: | ----: |
| ফাংশন সিলেক্টর |       1 |     0 |
| গন্তব্য ঠিকানা |      32 |  1-32 |
| পরিমাণ         |       2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[এই জাভাস্ক্রিপ্ট ইউনিট পরীক্ষাটি](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) আমাদের দেখায় কিভাবে এই প্রক্রিয়াটি ব্যবহার করতে হয় (এবং কিভাবে এটি সঠিকভাবে কাজ করে তা যাচাই করতে হয়)।
আমি ধরে নিচ্ছি আপনি [chai](https://www.chaijs.com/) এবং [ethers](https://docs.ethers.io/v5/) বোঝেন এবং শুধুমাত্র সেই অংশগুলি ব্যাখ্যা করব যা নির্দিষ্টভাবে কন্ট্র্যাক্টে প্রযোজ্য।

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

আমরা উভয় কন্ট্র্যাক্ট ডিপ্লয় করে শুরু করি।

```javascript
    // খেলার জন্য টোকেন নিন
    const faucetTx = {
```

আমরা লেনদেন তৈরি করতে সাধারণত যে উচ্চ-স্তরের ফাংশনগুলি ব্যবহার করি (যেমন `token.faucet()`) সেগুলি ব্যবহার করতে পারি না, কারণ আমরা ABI অনুসরণ করি না।
পরিবর্তে, আমাদের নিজেদের লেনদেন তৈরি করতে হবে এবং তারপর তা পাঠাতে হবে।

```javascript
      to: cdi.address,
      data: "0x01"
```

লেনদেনের জন্য আমাদের দুটি প্যারামিটার সরবরাহ করতে হবে:

1. `to`, গন্তব্য ঠিকানা।
   এটি ক্যালডাটা ইন্টারপ্রেটার কন্ট্র্যাক্ট।
2. `data`, পাঠানোর জন্য ক্যালডাটা।
   একটি ফসেট কলের ক্ষেত্রে, ডেটা একটি একক বাইট, `0x01`।

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

আমরা [সাইনারের `sendTransaction` পদ্ধতি](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) কল করি কারণ আমরা ইতিমধ্যে গন্তব্য (`faucetTx.to`) নির্দিষ্ট করেছি এবং আমাদের লেনদেনটি স্বাক্ষর করা প্রয়োজন।

```javascript
// ফসেট সঠিকভাবে টোকেন সরবরাহ করে কিনা তা পরীক্ষা করুন
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

এখানে আমরা ব্যালেন্স যাচাই করি।
`view` ফাংশনগুলিতে গ্যাস বাঁচানোর কোনো প্রয়োজন নেই, তাই আমরা কেবল সেগুলিকে স্বাভাবিকভাবে চালাই।

```javascript
// CDI-কে একটি ভাতা দিন (অনুমোদনগুলি প্রক্সি করা যায় না)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

স্থানান্তর করতে সক্ষম হওয়ার জন্য ক্যালডাটা ইন্টারপ্রেটারকে একটি ভাতা দিন।

```javascript
// টোকেন স্থানান্তর করুন
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

একটি স্থানান্তর লেনদেন তৈরি করুন। প্রথম বাইট হল "0x02", তারপরে গন্তব্য ঠিকানা এবং সবশেষে পরিমাণ (0x0100, যা দশমিকে 256)।

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // পরীক্ষা করুন যে আমাদের কাছে 256টি টোকেন কম আছে
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // এবং যে আমাদের গন্তব্য সেগুলি পেয়েছে
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## যখন আপনি গন্তব্য কন্ট্র্যাক্ট নিয়ন্ত্রণ করেন তখন খরচ কমানো {#reducing-the-cost-when-you-do-control-the-destination-contract}

যদি আপনার গন্তব্য কন্ট্র্যাক্টের উপর নিয়ন্ত্রণ থাকে তবে আপনি এমন ফাংশন তৈরি করতে পারেন যা `msg.sender` চেকগুলিকে বাইপাস করে কারণ তারা ক্যালডাটা ইন্টারপ্রেটারের উপর বিশ্বাস করে।
[আপনি `কন্ট্রোল-কন্ট্র্যাক্ট` শাখায়, এখানে এটি কীভাবে কাজ করে তার একটি উদাহরণ দেখতে পারেন](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)।

যদি চুক্তিটি শুধুমাত্র বাহ্যিক লেনদেনের প্রতিক্রিয়া জানায়, আমরা কেবল একটি চুক্তি থাকার মাধ্যমে পেতে পারি।
যাইহোক, এটি [কম্পোজিবিলিটি](/developers/docs/smart-contracts/composability/) ভঙ্গ করবে।
একটি কন্ট্র্যাক্ট থাকা অনেক ভালো যা সাধারণ ERC-20 কলের প্রতিক্রিয়া জানায়, এবং অন্য একটি কন্ট্র্যাক্ট যা সংক্ষিপ্ত কল ডেটা সহ লেনদেনের প্রতিক্রিয়া জানায়।

### Token.sol {#token-sol-2}

এই উদাহরণে আমরা `Token.sol` পরিবর্তন করতে পারি।
এটি আমাদের বেশ কয়েকটি ফাংশন রাখতে দেয় যা কেবল প্রক্সি কল করতে পারে।
এখানে নতুন অংশগুলি হল:

```solidity
    // CalldataInterpreter ঠিকানা নির্দিষ্ট করার জন্য একমাত্র অনুমোদিত ঠিকানা
    address owner;

    // CalldataInterpreter ঠিকানা
    address proxy = address(0);
```

ERC-20 কন্ট্র্যাক্টকে অনুমোদিত প্রক্সির পরিচয় জানতে হবে।
তবে, আমরা কনস্ট্রাক্টরে এই ভেরিয়েবলটি সেট করতে পারি না, কারণ আমরা এখনও মানটি জানি না।
এই কন্ট্র্যাক্টটি প্রথমে ইনস্ট্যানশিয়েট করা হয় কারণ প্রক্সি তার কনস্ট্রাক্টরে টোকেনের ঠিকানা আশা করে।

```solidity
    /**
     * @dev ERC20 কনস্ট্রাক্টরকে কল করে।
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

নির্মাতার ঠিকানা (যাকে `owner` বলা হয়) এখানে সংরক্ষণ করা হয় কারণ এটিই একমাত্র ঠিকানা যা প্রক্সি সেট করার অনুমতিপ্রাপ্ত।

```solidity
    /**
     * @dev প্রক্সির জন্য ঠিকানা সেট করুন (the CalldataInterpreter)।
     * মালিক দ্বারা কেবল একবার কল করা যেতে পারে
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

প্রক্সির বিশেষাধিকারপ্রাপ্ত অ্যাক্সেস রয়েছে, কারণ এটি সুরক্ষা পরীক্ষাগুলি বাইপাস করতে পারে।
আমরা প্রক্সিকে বিশ্বাস করতে পারি তা নিশ্চিত করার জন্য, আমরা কেবল `owner`-কে এই ফাংশনটি কল করার অনুমতি দিই, এবং কেবল একবার।
একবার `proxy`-র একটি আসল মান (শূন্য নয়) হয়ে গেলে, সেই মানটি পরিবর্তন করা যায় না, তাই এমনকি যদি মালিক দুর্বৃত্ত হয়ে যাওয়ার সিদ্ধান্ত নেয়, বা এর জন্য স্মারকটি প্রকাশ করা হয়, আমরা এখনও নিরাপদ।

```solidity
    /**
     * @dev কিছু ফাংশন শুধুমাত্র প্রক্সি দ্বারা কল করা যেতে পারে।
     */
    modifier onlyProxy {
```

এটি একটি [`modifier` ফাংশন](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), এটি অন্যান্য ফাংশনগুলির কাজ করার পদ্ধতি পরিবর্তন করে।

```solidity
      require(msg.sender == proxy);
```

প্রথমে, যাচাই করুন যে আমরা প্রক্সি দ্বারা কল হয়েছি এবং অন্য কেউ নয়।
যদি না হয়, `revert`।

```solidity
      _;
    }
```

যদি তাই হয়, তাহলে আমরা যে ফাংশনটি পরিবর্তন করি সেটি চালান।

```solidity
   /* যে ফাংশনগুলি প্রক্সিকে প্রকৃতপক্ষে অ্যাকাউন্টগুলির জন্য প্রক্সি করার অনুমতি দেয় */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

এই তিনটি অপারেশন যার জন্য সাধারণত বার্তাটি টোকেন স্থানান্তরকারী বা একটি ভাতা অনুমোদনকারী সত্তা থেকে সরাসরি আসতে হয়।
এখানে আমাদের কাছে এই অপারেশনগুলির একটি প্রক্সি সংস্করণ রয়েছে যা:

1. `onlyProxy()` দ্বারা পরিবর্তিত হয় যাতে অন্য কেউ তাদের নিয়ন্ত্রণ করতে না পারে।
2. যে ঠিকানাটি সাধারণত `msg.sender` হবে তা একটি অতিরিক্ত প্যারামিটার হিসাবে পায়।

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

ক্যালডাটা ইন্টারপ্রেটারটি উপরেরটির মতোই, তবে প্রক্সিড ফাংশনগুলি একটি `msg.sender` প্যারামিটার গ্রহণ করে এবং `transfer`-এর জন্য কোনও ভাতার প্রয়োজন হয় না।

```solidity
        // স্থানান্তর (ভাতার কোন প্রয়োজন নেই)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // অনুমোদন
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

আগের টেস্টিং কোড এবং এটির মধ্যে কিছু পরিবর্তন রয়েছে।

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

কোন প্রক্সিকে বিশ্বাস করতে হবে তা আমাদের ERC-20 চুক্তিকে জানাতে হবে

```js
console.log("CalldataInterpreter addr:", cdi.address)

// ভাতার যাচাইয়ের জন্য দুটি সাইনার প্রয়োজন
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` এবং `transferFrom()` পরীক্ষা করার জন্য আমাদের একটি দ্বিতীয় সাইনার প্রয়োজন।
আমরা এটিকে `poorSigner` বলি কারণ এটি আমাদের কোনো টোকেন পায় না (অবশ্যই এর কাছে ETH থাকতে হবে)।

```js
// টোকেন স্থানান্তর করুন
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

যেহেতু ERC-20 কন্ট্র্যাক্ট প্রক্সি (`cdi`)-কে বিশ্বাস করে, তাই আমাদের স্থানান্তর রিলে করার জন্য কোনো ভাতার প্রয়োজন নেই।

```js
// অনুমোদন এবং transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// approve / transferFrom কম্বো সঠিকভাবে করা হয়েছে কিনা তা পরীক্ষা করুন
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

দুটি নতুন ফাংশন পরীক্ষা করুন।
লক্ষ্য করুন যে `transferFromTx`-এর জন্য দুটি ঠিকানা প্যারামিটার প্রয়োজন: ভাতার দাতা এবং প্রাপক।

## উপসংহার {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) এবং [Arbitrum](https://developer.offchainlabs.com/docs/special_features) উভয়ই L1-এ লেখা ক্যালডাটার আকার এবং তার ফলে লেনদেনের খরচ কমানোর উপায় খুঁজছে।
যাইহোক, জেনেরিক সমাধান খোঁজার জন্য অবকাঠামো প্রদানকারী হিসাবে, আমাদের ক্ষমতা সীমিত।
ড্যাপ ডেভেলপার হিসাবে, আপনার কাছে অ্যাপ্লিকেশন-নির্দিষ্ট জ্ঞান রয়েছে, যা আপনাকে একটি জেনেরিক সমাধানে আমাদের চেয়ে অনেক ভালোভাবে আপনার ক্যালডাটা অপটিমাইজ করতে দেয়।
আশা করি, এই নিবন্ধটি আপনাকে আপনার প্রয়োজনের জন্য আদর্শ সমাধান খুঁজে পেতে সহায়তা করবে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

