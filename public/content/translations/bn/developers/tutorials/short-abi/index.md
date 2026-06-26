---
title: "কল ডেটা অপ্টিমাইজেশনের জন্য সংক্ষিপ্ত ABI"
description: "অপটিমিস্টিক রোলআপের জন্য স্মার্ট কন্ট্রাক্ট অপ্টিমাইজ করা"
author: "ওরি পোমেরান্টজ"
lang: bn
tags: ["লেয়ার ২ (l2)"]
skill: intermediate
breadcrumb: "সংক্ষিপ্ত ABI"
published: 2022-04-01
---

## ভূমিকা {#introduction}

এই নিবন্ধে, আপনি [অপটিমিস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups), সেগুলোতে ট্রানজ্যাকশনের খরচ এবং কীভাবে সেই ভিন্ন খরচের কাঠামোর কারণে ইথেরিয়াম মেইননেটের তুলনায় আমাদের ভিন্ন ভিন্ন জিনিসের জন্য অপ্টিমাইজ করতে হয় সে সম্পর্কে জানবেন।
আপনি কীভাবে এই অপ্টিমাইজেশন বাস্তবায়ন করতে হয় তাও শিখবেন।

### পূর্ণাঙ্গ প্রকাশ {#full-disclosure}

আমি একজন পূর্ণকালীন [অপটিমিজম](https://www.optimism.io/) কর্মী, তাই এই নিবন্ধের উদাহরণগুলো অপটিমিজমে চলবে।
তবে, এখানে ব্যাখ্যা করা কৌশলটি অন্যান্য রোলআপের জন্যও একইভাবে কাজ করা উচিত।

### পরিভাষা {#terminology}

রোলআপ নিয়ে আলোচনা করার সময়, 'লেয়ার ১ (l1)' শব্দটি মেইননেট, অর্থাৎ প্রোডাকশন ইথেরিয়াম নেটওয়ার্কের জন্য ব্যবহৃত হয়।
'লেয়ার ২ (l2)' শব্দটি রোলআপ বা অন্য যেকোনো সিস্টেমের জন্য ব্যবহৃত হয় যা নিরাপত্তার জন্য লেয়ার ১ (l1)-এর ওপর নির্ভর করে কিন্তু এর বেশিরভাগ প্রসেসিং অফচেইন করে।

## আমরা কীভাবে লেয়ার ২ (l2) ট্রানজ্যাকশনের খরচ আরও কমাতে পারি? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[অপটিমিস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups)-কে প্রতিটি ঐতিহাসিক ট্রানজ্যাকশনের রেকর্ড সংরক্ষণ করতে হয় যাতে যে কেউ সেগুলো পরীক্ষা করে দেখতে পারে এবং বর্তমান স্টেট সঠিক কিনা তা যাচাই করতে পারে।
ইথেরিয়াম মেইননেটে ডেটা পাঠানোর সবচেয়ে সস্তা উপায় হলো এটিকে কল ডেটা হিসেবে লেখা।
এই সমাধানটি [অপটিমিজম](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) এবং [আরবিট্রাম](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) উভয়ই বেছে নিয়েছে।

### লেয়ার ২ (l2) ট্রানজ্যাকশনের খরচ {#cost-of-l2-transactions}

লেয়ার ২ (l2) ট্রানজ্যাকশনের খরচ দুটি উপাদানের সমন্বয়ে গঠিত:

1. লেয়ার ২ (l2) প্রসেসিং, যা সাধারণত অত্যন্ত সস্তা
2. লেয়ার ১ (l1) স্টোরেজ, যা মেইননেট গ্যাস খরচের সাথে যুক্ত

আমি যখন এটি লিখছি, তখন অপটিমিজমে লেয়ার ২ (l2) গ্যাস খরচ হলো 0.001 [Gwei](/developers/docs/gas/#pre-london)।
অন্যদিকে, লেয়ার ১ (l1) গ্যাস খরচ প্রায় 40 Gwei।
[আপনি এখানে বর্তমান দাম দেখতে পারেন](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)।

এক বাইট কল ডেটা খরচ হয় 4 গ্যাস (যদি এটি শূন্য হয়) অথবা 16 গ্যাস (যদি এটি অন্য কোনো মান হয়)।
EVM-এ সবচেয়ে ব্যয়বহুল অপারেশনগুলোর মধ্যে একটি হলো স্টোরেজে লেখা।
লেয়ার ২ (l2)-তে স্টোরেজে একটি 32-বাইট শব্দ লেখার সর্বোচ্চ খরচ হলো 22100 গ্যাস। বর্তমানে, এটি 22.1 Gwei।
সুতরাং আমরা যদি কল ডেটা-এর একটি শূন্য বাইটও বাঁচাতে পারি, তবে আমরা স্টোরেজে প্রায় 200 বাইট লিখতে পারব এবং তবুও লাভবান হব।

### ABI {#the-abi}

বেশিরভাগ ট্রানজ্যাকশন একটি এক্সটার্নালি-ওনড অ্যাকাউন্ট থেকে একটি কন্ট্রাক্ট অ্যাক্সেস করে।
বেশিরভাগ কন্ট্রাক্ট Solidity-তে লেখা হয় এবং [অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) অনুযায়ী তাদের ডেটা ফিল্ড ব্যাখ্যা করে।

তবে, ABI লেয়ার ১ (l1)-এর জন্য ডিজাইন করা হয়েছিল, যেখানে এক বাইট কল ডেটা-এর খরচ প্রায় চারটি গাণিতিক অপারেশনের সমান, লেয়ার ২ (l2)-এর জন্য নয় যেখানে এক বাইট কল ডেটা-এর খরচ এক হাজারেরও বেশি গাণিতিক অপারেশনের সমান।
কল ডেটা এভাবে বিভক্ত করা হয়:

| বিভাগ | দৈর্ঘ্য | বাইট | অপচয়কৃত বাইট | অপচয়কৃত গ্যাস | প্রয়োজনীয় বাইট | প্রয়োজনীয় গ্যাস |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| ফাংশন সিলেক্টর |      4 |   0-3 |            3 |         48 |               1 |            16 |
| শূন্য |     12 |  4-15 |           12 |         48 |               0 |             0 |
| গন্তব্য ঠিকানা |     20 | 16-35 |            0 |          0 |              20 |           320 |
| পরিমাণ |     32 | 36-67 |           17 |         64 |              15 |           240 |
| মোট |     68 |       |              |        160 |                 |           576 |

ব্যাখ্যা:

- **ফাংশন সিলেক্টর**: কন্ট্রাক্ট-এ 256-এর কম ফাংশন রয়েছে, তাই আমরা একটি একক বাইট দিয়ে তাদের আলাদা করতে পারি।
  এই বাইটগুলো সাধারণত নন-জিরো হয় এবং তাই [16 গ্যাস খরচ হয়](https://eips.ethereum.org/EIPS/eip-2028)।
- **শূন্য**: এই বাইটগুলো সর্বদা শূন্য হয় কারণ একটি 20-বাইট ঠিকানা ধারণ করার জন্য 32-বাইট শব্দের প্রয়োজন হয় না।
  শূন্য ধারণকারী বাইটগুলোর জন্য 4 গ্যাস খরচ হয় ([ইয়েলো পেপার দেখুন](https://ethereum.github.io/yellowpaper/paper.pdf), পরিশিষ্ট G,
  পৃষ্ঠা 27, `G`<sub>`txdatazero`</sub>-এর মান)।
- **পরিমাণ**: যদি আমরা ধরে নিই যে এই কন্ট্রাক্ট-এ `decimals` হলো 18 (স্বাভাবিক মান) এবং আমরা যে সর্বোচ্চ পরিমাণ টোকেন হস্তান্তর করব তা হবে 10<sup>18</sup>, তাহলে আমরা সর্বোচ্চ 10<sup>36</sup> পরিমাণ পাই।
  256<sup>15</sup> &gt; 10<sup>36</sup>, তাই 15 বাইটই যথেষ্ট।

লেয়ার ১ (l1)-এ 160 গ্যাস অপচয় সাধারণত নগণ্য। একটি ট্রানজ্যাকশন-এ কমপক্ষে [21,000 গ্যাস](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) খরচ হয়, তাই অতিরিক্ত 0.8% কোনো ব্যাপার না।
তবে, লেয়ার ২ (l2)-তে পরিস্থিতি ভিন্ন। ট্রানজ্যাকশন-এর প্রায় পুরো খরচই হলো এটিকে লেয়ার ১ (l1)-এ লেখা।
ট্রানজ্যাকশন কল ডেটা ছাড়াও, 109 বাইটের ট্রানজ্যাকশন হেডার (গন্তব্য ঠিকানা, স্বাক্ষর ইত্যাদি) রয়েছে।
তাই মোট খরচ হলো `109*16+576+160=2480`, এবং আমরা এর প্রায় 6.5% অপচয় করছি।

## গন্তব্য আপনার নিয়ন্ত্রণে না থাকলে খরচ কমানো {#reducing-costs-when-you-dont-control-the-destination}

ধরে নিচ্ছি যে গন্তব্য কন্ট্রাক্ট-এর ওপর আপনার কোনো নিয়ন্ত্রণ নেই, তবুও আপনি [এরকম](https://github.com/qbzzt/ethereum.org-20220330-shortABI) একটি সমাধান ব্যবহার করতে পারেন।
চলুন প্রাসঙ্গিক ফাইলগুলো দেখে নিই।

### Token.sol {#token-sol}

[এটি হলো গন্তব্য কন্ট্রাক্ট](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)।
এটি একটি স্ট্যান্ডার্ড ERC-20 কন্ট্রাক্ট, যাতে একটি অতিরিক্ত বৈশিষ্ট্য রয়েছে।
এই `faucet` ফাংশনটি যেকোনো ব্যবহারকারীকে ব্যবহারের জন্য কিছু টোকেন পেতে দেয়।
এটি একটি প্রোডাকশন ERC-20 কন্ট্রাক্ট-কে অকেজো করে তুলবে, কিন্তু যখন একটি ERC-20 শুধুমাত্র টেস্টিং সহজ করার জন্য থাকে তখন এটি কাজকে সহজ করে তোলে।

```solidity
    /**
     * @dev কলারকে খেলার জন্য 1000 টোকেন দেয়
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[এটি সেই কন্ট্রাক্ট যাকে ট্রানজ্যাকশনগুলোর ছোট কল ডেটা দিয়ে কল করার কথা](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)।
চলুন এটি লাইন বাই লাইন দেখে নিই।

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

টোকেন ফাংশনটিকে কীভাবে কল করতে হবে তা জানার জন্য আমাদের এটি প্রয়োজন।

```solidity
কন্ট্রাক্ট CalldataInterpreter {

    OrisUselessToken public immutable token;
```

আমরা যে টোকেনের প্রক্সি, তার ঠিকানা।

```solidity

    /**
     * @dev টোকেন ঠিকানা নির্দিষ্ট করুন
     * @param tokenAddr_ ERC-20 কন্ট্রাক্ট ঠিকানা
     */
    কনস্ট্রাক্টর(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

টোকেন ঠিকানাটিই একমাত্র প্যারামিটার যা আমাদের নির্দিষ্ট করতে হবে।

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

কল ডেটা থেকে একটি মান পড়ুন।

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

আমরা মেমরিতে একটি একক 32-বাইট (256-বিট) শব্দ লোড করতে যাচ্ছি এবং যে বাইটগুলো আমাদের কাঙ্ক্ষিত ফিল্ডের অংশ নয় সেগুলো সরিয়ে ফেলব।
এই অ্যালগরিদমটি 32 বাইটের চেয়ে বড় মানের জন্য কাজ করে না, এবং অবশ্যই আমরা কল ডেটা-এর শেষের বাইরে পড়তে পারি না।
লেয়ার ১ (l1)-এ গ্যাস বাঁচাতে এই পরীক্ষাগুলো এড়িয়ে যাওয়া প্রয়োজন হতে পারে, কিন্তু লেয়ার ২ (l2)-তে গ্যাস অত্যন্ত সস্তা, যা আমাদের চিন্তায় আসা যেকোনো স্যানিটি চেক করতে সক্ষম করে।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

আমরা `fallback()`-এ কল থেকে ডেটা কপি করতে পারতাম (নিচে দেখুন), কিন্তু EVM-এর অ্যাসেম্বলি ভাষা [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) ব্যবহার করা সহজ।

এখানে আমরা স্ট্যাকে `startByte` থেকে `startByte+31` বাইটগুলো পড়ার জন্য [CALLDATALOAD অপকোড](https://www.evm.codes/#35) ব্যবহার করি।
সাধারণত, Yul-এ একটি অপকোড-এর সিনট্যাক্স হলো `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`।

```solidity

        _retVal = _retVal >> (256-length*8);
```

শুধুমাত্র সবচেয়ে গুরুত্বপূর্ণ `length` বাইটগুলো ফিল্ডের অংশ, তাই আমরা অন্যান্য মানগুলো থেকে মুক্তি পেতে [রাইট-শিফট](https://en.wikipedia.org/wiki/Logical_shift) করি।
এর একটি অতিরিক্ত সুবিধা হলো এটি মানটিকে ফিল্ডের ডানদিকে সরিয়ে দেয়, তাই এটি মান গুণ 256<sup>কিছু</sup> হওয়ার পরিবর্তে মানটি নিজেই থাকে।

```solidity

        return _retVal;
    }


    fallback() external {
```

যখন কোনো Solidity কন্ট্রাক্ট-এ কল কোনো ফাংশন স্বাক্ষর-এর সাথে মেলে না, তখন এটি [`fallback()` ফাংশন](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)-কে কল করে (ধরে নিচ্ছি যে একটি আছে)।
`CalldataInterpreter`-এর ক্ষেত্রে, _যেকোনো_ কল এখানে আসে কারণ অন্য কোনো `external` বা `public` ফাংশন নেই।

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

কল ডেটা-এর প্রথম বাইটটি পড়ুন, যা আমাদের ফাংশনটি বলে দেয়।
এখানে একটি ফাংশন উপলব্ধ না হওয়ার দুটি কারণ রয়েছে:

1. যে ফাংশনগুলো `pure` বা `view` সেগুলো স্টেট পরিবর্তন করে না এবং গ্যাস খরচ করে না (যখন অফচেইন কল করা হয়)।
   তাদের গ্যাস খরচ কমানোর চেষ্টা করার কোনো মানে হয় না।
2. যে ফাংশনগুলো [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)-এর ওপর নির্ভর করে।
   `msg.sender`-এর মান কলারের পরিবর্তে `CalldataInterpreter`-এর ঠিকানা হতে যাচ্ছে।

দুর্ভাগ্যবশত, [ERC-20 স্পেসিফিকেশনগুলো দেখলে](https://eips.ethereum.org/EIPS/eip-20), এটি শুধুমাত্র একটি ফাংশন, `transfer`-কে অবশিষ্ট রাখে।
এটি আমাদের কাছে শুধুমাত্র দুটি ফাংশন অবশিষ্ট রাখে: `transfer` (কারণ আমরা `transferFrom` কল করতে পারি) এবং `faucet` (কারণ আমরা যে আমাদের কল করেছে তাকে টোকেনগুলো ফেরত হস্তান্তর করতে পারি)।

```solidity

        // ব্যবহার করে টোকেনের স্টেট পরিবর্তনকারী মেথডগুলো কল করুন
        // কল ডেটা থেকে প্রাপ্ত তথ্য

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

আমরা `token.faucet()` কল করার পর আমরা টোকেন পাই। তবে, প্রক্সি চুক্তি হিসেবে, আমাদের টোকেনের **প্রয়োজন** নেই।
যে EOA (এক্সটার্নালি ওনড অ্যাকাউন্ট) বা কন্ট্রাক্ট আমাদের কল করেছে তার প্রয়োজন।
তাই আমরা আমাদের সমস্ত টোকেন যে আমাদের কল করেছে তাকে হস্তান্তর করি।

```solidity
        // হস্তান্তর (ধরে নিন এর জন্য আমাদের একটি অ্যালাউন্স আছে)
        if (_func == 2) {
```

টোকেন হস্তান্তর করার জন্য দুটি প্যারামিটার প্রয়োজন: গন্তব্য ঠিকানা এবং পরিমাণ।

```solidity
            token.transferFrom(
                msg.sender,
```

আমরা শুধুমাত্র কলারদের তাদের নিজস্ব টোকেন হস্তান্তর করার অনুমতি দিই

```solidity
                address(uint160(calldataVal(1, 20))),
```

গন্তব্য ঠিকানা বাইট #1 থেকে শুরু হয় (বাইট #0 হলো ফাংশন)। একটি ঠিকানা হিসেবে, এটি 20-বাইট দীর্ঘ।

```solidity
                calldataVal(21, 2)
```

এই নির্দিষ্ট কন্ট্রাক্ট-এর জন্য আমরা ধরে নিই যে কেউ যে সর্বোচ্চ সংখ্যক টোকেন হস্তান্তর করতে চাইবে তা দুই বাইটে (65536-এর কম) ফিট হবে।

```solidity
            );
        }
```

সামগ্রিকভাবে, একটি হস্তান্তর-এ 35 বাইট কল ডেটা লাগে:

| বিভাগ | দৈর্ঘ্য | বাইট |
| ------------------- | -----: | ----: |
| ফাংশন সিলেক্টর |      1 |     0 |
| গন্তব্য ঠিকানা |     32 |  1-32 |
| পরিমাণ |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[এই JavaScript ইউনিট টেস্টটি](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) আমাদের দেখায় কীভাবে এই মেকানিজমটি ব্যবহার করতে হয় (এবং এটি সঠিকভাবে কাজ করে কিনা তা কীভাবে যাচাই করতে হয়)।
আমি ধরে নিচ্ছি যে আপনি [chai](https://www.chaijs.com/) এবং [ethers](https://docs.ethers.io/v5/) বোঝেন এবং শুধুমাত্র সেই অংশগুলো ব্যাখ্যা করব যা বিশেষভাবে কন্ট্রাক্ট-এর ক্ষেত্রে প্রযোজ্য।

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

আমরা উভয় কন্ট্রাক্ট ডিপ্লয় করার মাধ্যমে শুরু করি।

```javascript
    // খেলার জন্য টোকেন পান
    const faucetTx = {
```

ট্রানজ্যাকশন তৈরি করতে আমরা সাধারণত যে হাই-লেভেল ফাংশনগুলো ব্যবহার করি (যেমন `token.faucet()`) তা ব্যবহার করতে পারি না, কারণ আমরা ABI অনুসরণ করি না।
পরিবর্তে, আমাদের নিজেদেরই ট্রানজ্যাকশন তৈরি করতে হবে এবং তারপর এটি পাঠাতে হবে।

```javascript
      to: cdi.address,
      data: "0x01"
```

ট্রানজ্যাকশন-এর জন্য আমাদের দুটি প্যারামিটার প্রদান করতে হবে:

1. `to`, গন্তব্য ঠিকানা।
   এটি হলো কল ডেটা ইন্টারপ্রেটার কন্ট্রাক্ট।
2. `data`, পাঠানোর জন্য কল ডেটা।
   একটি ফসেট কলের ক্ষেত্রে, ডেটা হলো একটি একক বাইট, `0x01`।

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

আমরা [স্বাক্ষরকারীর `sendTransaction` মেথড](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) কল করি কারণ আমরা ইতিমধ্যেই গন্তব্য (`faucetTx.to`) নির্দিষ্ট করেছি এবং আমাদের ট্রানজ্যাকশন-এ স্বাক্ষর করা প্রয়োজন।

```javascript
// faucet সঠিকভাবে টোকেন প্রদান করে কিনা তা পরীক্ষা করুন
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

এখানে আমরা ব্যালেন্স যাচাই করি।
`view` ফাংশনগুলোতে গ্যাস বাঁচানোর কোনো প্রয়োজন নেই, তাই আমরা সেগুলোকে স্বাভাবিকভাবেই চালাই।

```javascript
// CDI-কে একটি অ্যালাউন্স দিন (অ্যাপ্রুভাল প্রক্সি করা যায় না)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

হস্তান্তর করতে সক্ষম হওয়ার জন্য কল ডেটা ইন্টারপ্রেটারকে একটি অ্যালাউন্স দিন।

```javascript
// টোকেন হস্তান্তর করুন
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

একটি হস্তান্তর ট্রানজ্যাকশন তৈরি করুন। প্রথম বাইটটি হলো "0x02", এরপর গন্তব্য ঠিকানা এবং সবশেষে পরিমাণ (0x0100, যা ডেসিমালে 256)।

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // আমাদের কাছে 256টি টোকেন কম আছে কিনা তা পরীক্ষা করুন
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // এবং আমাদের গন্তব্য সেগুলো পেয়েছে কিনা
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## গন্তব্য কন্ট্রাক্ট আপনার নিয়ন্ত্রণে থাকলে খরচ কমানো {#reducing-the-cost-when-you-do-control-the-destination-contract}

যদি গন্তব্য কন্ট্রাক্ট-এর ওপর আপনার নিয়ন্ত্রণ থাকে তবে আপনি এমন ফাংশন তৈরি করতে পারেন যা `msg.sender` চেকগুলো বাইপাস করে কারণ তারা কল ডেটা ইন্টারপ্রেটারকে বিশ্বাস করে।
[এটি কীভাবে কাজ করে তার একটি উদাহরণ আপনি এখানে, `control-contract` ব্রাঞ্চে দেখতে পারেন](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)।

যদি কন্ট্রাক্টটি শুধুমাত্র বাহ্যিক ট্রানজ্যাকশন-এর প্রতিক্রিয়া জানাত, তবে আমরা শুধুমাত্র একটি কন্ট্রাক্ট দিয়েই কাজ চালাতে পারতাম।
তবে, এটি [সংযোজনযোগ্যতা](/developers/docs/smart-contracts/composability/) ভেঙে দেবে।
এমন একটি কন্ট্রাক্ট থাকা অনেক ভালো যা সাধারণ ERC-20 কলের প্রতিক্রিয়া জানায় এবং আরেকটি কন্ট্রাক্ট যা সংক্ষিপ্ত কল ডেটা সহ ট্রানজ্যাকশন-এর প্রতিক্রিয়া জানায়।

### Token.sol {#token-sol-2}

এই উদাহরণে আমরা `Token.sol` পরিবর্তন করতে পারি।
এটি আমাদের এমন বেশ কয়েকটি ফাংশন রাখতে দেয় যা শুধুমাত্র প্রক্সি কল করতে পারে।
এখানে নতুন অংশগুলো দেওয়া হলো:

```solidity
    // CalldataInterpreter ঠিকানা নির্দিষ্ট করার জন্য অনুমোদিত একমাত্র ঠিকানা
    address owner;

    // CalldataInterpreter ঠিকানা
    address proxy = address(0);
```

ERC-20 কন্ট্রাক্ট-কে অনুমোদিত প্রক্সির পরিচয় জানতে হবে।
তবে, আমরা কনস্ট্রাক্টর-এ এই ভেরিয়েবলটি সেট করতে পারি না, কারণ আমরা এখনও মানটি জানি না।
এই কন্ট্রাক্টটি প্রথমে ইনস্ট্যানশিয়েট করা হয় কারণ প্রক্সি তার কনস্ট্রাক্টর-এ টোকেনের ঠিকানা আশা করে।

```solidity
    /**
     * @dev ERC-20 কনস্ট্রাক্টর কল করে।
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

নির্মাতার ঠিকানা (`owner` নামে পরিচিত) এখানে সংরক্ষণ করা হয় কারণ এটিই একমাত্র ঠিকানা যা প্রক্সি সেট করার অনুমতিপ্রাপ্ত।

```solidity
    /**
     * @dev প্রক্সির (CalldataInterpreter) জন্য ঠিকানা সেট করুন।
     * মালিক দ্বারা শুধুমাত্র একবার কল করা যেতে পারে
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

প্রক্সির বিশেষ অ্যাক্সেস রয়েছে, কারণ এটি নিরাপত্তা চেকগুলো বাইপাস করতে পারে।
আমরা প্রক্সিকে বিশ্বাস করতে পারি তা নিশ্চিত করতে আমরা শুধুমাত্র `owner`-কে এই ফাংশনটি কল করতে দিই, এবং তাও শুধুমাত্র একবার।
একবার `proxy`-এর একটি বাস্তব মান (শূন্য নয়) হয়ে গেলে, সেই মানটি পরিবর্তন করা যায় না, তাই মালিক যদি প্রতারক হওয়ার সিদ্ধান্ত নেয়, বা এর নেমোনিক প্রকাশ হয়ে যায়, তবুও আমরা নিরাপদ।

```solidity
    /**
     * @dev কিছু ফাংশন শুধুমাত্র প্রক্সি দ্বারা কল করা যেতে পারে।
     */
    modifier onlyProxy {
```

এটি একটি [`modifier` ফাংশন](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), এটি অন্যান্য ফাংশনগুলোর কাজ করার পদ্ধতি পরিবর্তন করে।

```solidity
      require(msg.sender == proxy);
```

প্রথমে, যাচাই করুন যে আমাদের প্রক্সি কল করেছে এবং অন্য কেউ নয়।
যদি তা না হয়, তবে `revert`।

```solidity
      _;
    }
```

যদি তাই হয়, তবে আমরা যে ফাংশনটি পরিবর্তন করি তা চালান।

```solidity
   /* যে ফাংশনগুলো প্রক্সিকে প্রকৃতপক্ষে অ্যাকাউন্টগুলোর জন্য প্রক্সি করার অনুমতি দেয় */

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

এগুলো হলো তিনটি অপারেশন যার জন্য সাধারণত টোকেন হস্তান্তরকারী বা অ্যালাউন্স অনুমোদনকারী সত্তার কাছ থেকে সরাসরি বার্তা আসার প্রয়োজন হয়।
এখানে আমাদের কাছে এই অপারেশনগুলোর একটি প্রক্সি সংস্করণ রয়েছে যা:

1. `onlyProxy()` দ্বারা পরিবর্তিত হয় যাতে অন্য কাউকে এগুলো নিয়ন্ত্রণ করার অনুমতি দেওয়া না হয়।
2. একটি অতিরিক্ত প্যারামিটার হিসেবে সেই ঠিকানাটি পায় যা সাধারণত `msg.sender` হতো।

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

কল ডেটা ইন্টারপ্রেটারটি প্রায় ওপরেরটির মতোই, শুধু প্রক্সি করা ফাংশনগুলো একটি `msg.sender` প্যারামিটার গ্রহণ করে এবং `transfer`-এর জন্য কোনো অ্যালাউন্স-এর প্রয়োজন নেই।

```solidity
        // হস্তান্তর (অ্যালাউন্স এর প্রয়োজন নেই)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
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

আগের টেস্টিং কোড এবং এটির মধ্যে কয়েকটি পরিবর্তন রয়েছে।

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

আমাদের ERC-20 কন্ট্রাক্ট-কে বলতে হবে কোন প্রক্সিকে বিশ্বাস করতে হবে

```js
console.log("CalldataInterpreter addr:", cdi.address)

// অ্যালাউন্স যাচাই করার জন্য দুজন স্বাক্ষরকারীর প্রয়োজন
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` এবং `transferFrom()` চেক করতে আমাদের একজন দ্বিতীয় স্বাক্ষরকারীর প্রয়োজন।
আমরা একে `poorSigner` বলি কারণ এটি আমাদের কোনো টোকেন পায় না (অবশ্যই এর ETH থাকা প্রয়োজন)।

```js
// টোকেন হস্তান্তর করুন
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

যেহেতু ERC-20 কন্ট্রাক্ট প্রক্সিকে বিশ্বাস করে (`cdi`), তাই হস্তান্তর রিলে করার জন্য আমাদের কোনো অ্যালাউন্স-এর প্রয়োজন নেই।

```js
// অ্যাপ্রুভাল এবং transferFrom
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
লক্ষ্য করুন যে `transferFromTx`-এর দুটি ঠিকানা প্যারামিটার প্রয়োজন: অ্যালাউন্স প্রদানকারী এবং গ্রহণকারী।

## উপসংহার {#conclusion}

[অপটিমিজম](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) এবং [আরবিট্রাম](https://developer.offchainlabs.com/docs/special_features) উভয়ই লেয়ার ১ (l1)-এ লেখা কল ডেটা-এর আকার এবং সেই কারণে ট্রানজ্যাকশন-এর খরচ কমানোর উপায় খুঁজছে।
তবে, জেনেরিক সমাধান খুঁজছেন এমন ইনফ্রাস্ট্রাকচার প্রোভাইডার হিসেবে, আমাদের ক্ষমতা সীমিত।
বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) ডেভেলপার হিসেবে, আপনার কাছে অ্যাপ্লিকেশন-নির্দিষ্ট জ্ঞান রয়েছে, যা আপনাকে একটি জেনেরিক সমাধানের চেয়ে আপনার কল ডেটা অনেক ভালোভাবে অপ্টিমাইজ করতে দেয়।
আশা করি, এই নিবন্ধটি আপনাকে আপনার প্রয়োজনের জন্য আদর্শ সমাধান খুঁজে পেতে সাহায্য করবে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।