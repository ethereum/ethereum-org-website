---
title: "কল ডেটা অপ্টিমাইজেশনের জন্য সংক্ষিপ্ত ABI"
description: "অপটিমিস্টিক রোলআপের জন্য স্মার্ট কন্ট্রাক্ট অপ্টিমাইজ করা"
author: "ওরি পোমেরান্টজ"
lang: bn
tags: ["লেয়ার 2 (L2)"]
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

রোলআপ নিয়ে আলোচনা করার সময়, 'লেয়ার 1 (L1)' শব্দটি মেইননেট, অর্থাৎ প্রোডাকশন ইথেরিয়াম নেটওয়ার্কের জন্য ব্যবহৃত হয়।
'লেয়ার 2 (L2)' শব্দটি রোলআপ বা অন্য যেকোনো সিস্টেমের জন্য ব্যবহৃত হয় যা নিরাপত্তার জন্য লেয়ার 1 (L1)-এর ওপর নির্ভর করে কিন্তু এর বেশিরভাগ প্রসেসিং অফচেইন করে।

## আমরা কীভাবে L2 ট্রানজ্যাকশন-এর খরচ আরও কমাতে পারি? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[অপটিমিস্টিক রোলআপগুলোকে](/developers/docs/scaling/optimistic-rollups) প্রতিটি ঐতিহাসিক ট্রানজ্যাকশন-এর রেকর্ড সংরক্ষণ করতে হয় যাতে যে কেউ সেগুলো দেখতে পারে এবং বর্তমান স্টেট সঠিক কিনা তা যাচাই করতে পারে।
যখন এই নিবন্ধটি লেখা হয়েছিল, তখন ইথেরিয়াম মেইননেট-এ ডেটা পাঠানোর সবচেয়ে সস্তা উপায় ছিল এটিকে কল ডেটা হিসেবে লেখা।
এই সমাধানটি [Optimism](https://docs.optimism.io/op-stack/protocol/overview) এবং [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) উভয়ই বেছে নিয়েছিল।
Dencun আপগ্রেডের (মার্চ 2024) পর থেকে, রোলআপগুলো এর পরিবর্তে [ব্লব](/roadmap/danksharding/)-এ এই ডেটা পোস্ট করতে পারে, যা অনেক সস্তা।

### L2 ট্রানজ্যাকশন-এর খরচ {#cost-of-l2-transactions}

L2 ট্রানজ্যাকশন-এর খরচ দুটি উপাদানের সমন্বয়ে গঠিত:

1. L2 প্রসেসিং, যা সাধারণত অত্যন্ত সস্তা
2. L1 স্টোরেজ, যা মেইননেট গ্যাস খরচের সাথে যুক্ত

যখন আমি 2022 সালে এই নিবন্ধটি লিখেছিলাম, তখন Optimism-এ L2 গ্যাস-এর খরচ ছিল 0.001 [Gwei](/developers/docs/gas/#what-is-gas)।
অন্যদিকে, L1 গ্যাস-এর খরচ ছিল প্রায় 40 Gwei।

এক বাইট কল ডেটা-এর খরচ হয় 4 গ্যাস (যদি এটি শূন্য হয়) অথবা 16 গ্যাস (যদি এটি অন্য কোনো মান হয়)।
EVM-এ সবচেয়ে ব্যয়বহুল অপারেশনগুলোর মধ্যে একটি হলো স্টোরেজে লেখা।
L2-তে স্টোরেজে একটি 32-বাইট শব্দ লেখার সর্বোচ্চ খরচ হলো 22100 গ্যাস। সেই সময়ে, এটি ছিল 22.1 Gwei।
তাই যদি আমরা কল ডেটা-এর একটি একক শূন্য বাইট বাঁচাতে পারতাম, তবে আমরা স্টোরেজে প্রায় 200 বাইট লিখতে পারতাম এবং তারপরেও লাভবান হতাম।

#### 2024 সালে L2 খরচ কীভাবে পরিবর্তিত হয়েছে {#how-l2-costs-changed-in-2024}

এই নিবন্ধটি লেখার পর থেকে OP Stack [L1 ডেটা ফি](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) সূত্রটি দুবার পরিবর্তিত হয়েছে:

- [Ecotone আপগ্রেড](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (মার্চ 2024)-এর সাথে, OP Stack চেইনগুলো ব্লব-এ ট্রানজ্যাকশন ডেটা পোস্ট করা শুরু করে, যার মূল্য একটি পৃথক (এবং সাধারণত অনেক কম) ব্লব ভিত্তি ফি দ্বারা নির্ধারিত হয়।
- [Fjord আপগ্রেড](https://docs.optimism.io/op-stack/transactions/fees#fjord) (জুলাই 2024)-এর সাথে, L1 ডেটা ফি [FastLZ](https://github.com/ariya/FastLZ) কম্প্রেশনের পরে ট্রানজ্যাকশন-এর আকারের অনুমানের ওপর ভিত্তি করে, যেখানে প্রতি ট্রানজ্যাকশন-এ ন্যূনতম 100 বাইট থাকে ([স্পেসিফিকেশন দেখুন](https://specs.optimism.io/protocol/fjord/exec-engine.html))।

এটি এই নিবন্ধের বাকি অংশের বিশ্লেষণকে তিনটি উপায়ে পরিবর্তন করে:

1. শূন্য বাইটগুলো ভালোভাবে কম্প্রেস হয়, তাই সেগুলো প্রায় বিনামূল্যে।
   নিচের প্রতি বাইটে 4 এবং 16 গ্যাস-এর পরিসংখ্যানগুলো হলো L1 কল ডেটা-এর খরচ, বর্তমানে একটি OP Stack চেইন-এ ট্রানজ্যাকশন ডেটার জন্য আপনি যা প্রদান করেন তা নয়।
2. 100-বাইট ন্যূনতম সীমার নিচে, ছোট কল ডেটা কোনো কিছু বাঁচায় না।
   উদাহরণস্বরূপ, 2026 সালের অক্টোবরে OP Mainnet-এ একটি স্ট্যান্ডার্ড ERC-20 `transfer` (68 বাইট কল ডেটা) এবং এই নিবন্ধের 23-বাইট ছোট সংস্করণটি ঠিক একই L1 ডেটা ফি প্রদান করত, যা ন্যূনতম, প্রায় 1 Gwei (10<sup>-9</sup> ETH)।
3. যেহেতু ব্লব স্পেস সস্তা, তাই L2 এক্সিকিউশন ফি এখন প্রায়শই L1 ডেটা ফি-এর চেয়ে বড় হয়।
   0.001 Gwei-এর L2 গ্যাস প্রাইস-এ, 1000 গ্যাস-এর খরচ 1 Gwei, যা সম্পূর্ণ L1 ডেটা ফি-এর সমান, তাই একটি প্রক্সি চুক্তি-এর মাধ্যমে যাওয়ার অতিরিক্ত এক্সিকিউশন গ্যাস এটি যে বাইটগুলো বাঁচায় তার চেয়ে বেশি খরচ করতে পারে।

নীতিটি এখনও প্রযোজ্য: কম কম্প্রেস করা বাইট মানে কম L1 ডেটা ফি।
ছোট ABI-গুলো এমন ট্রানজ্যাকশন-এর জন্য সবচেয়ে বেশি অর্থবহ যেখানে প্রচুর ডেটা থাকে যা ভালোভাবে কম্প্রেস হয় না, এবং এমন চেইনগুলোতে বা এমন সময়ে যখন L1 ডেটা ব্যয়বহুল হয়।
একটি নির্দিষ্ট ট্রানজ্যাকশন-এর জন্য কত খরচ হবে তা দেখতে, স্বাক্ষরবিহীন ট্রানজ্যাকশন-এর সাথে [`GasPriceOracle` প্রিডিপ্লয়](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle)-এ `getL1Fee` কল করুন।
উদাহরণস্বরূপ, [Foundry](https://getfoundry.sh/introduction/installation/)-এর `cast` ব্যবহার করে:

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

ফলাফলটি Wei-তে।

### অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) {#the-abi}

বেশিরভাগ ট্রানজ্যাকশন একটি বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্ট থেকে একটি কন্ট্রাক্ট অ্যাক্সেস করে।
বেশিরভাগ কন্ট্রাক্ট Solidity-তে লেখা হয় এবং [অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) অনুযায়ী তাদের ডেটা ফিল্ড ব্যাখ্যা করে।

যাইহোক, ABI-টি L1-এর জন্য ডিজাইন করা হয়েছিল, যেখানে এক বাইট কল ডেটা-এর খরচ প্রায় চারটি গাণিতিক ক্রিয়াকলাপের সমান, L2-এর জন্য নয় যেখানে (2022 সালের দামে) এক বাইট কল ডেটা-এর খরচ এক হাজারেরও বেশি গাণিতিক ক্রিয়াকলাপের চেয়ে বেশি।
কল ডেটা এভাবে বিভক্ত করা হয়:

| বিভাগ | দৈর্ঘ্য | বাইট | অপচয় হওয়া বাইট | অপচয় হওয়া গ্যাস | প্রয়োজনীয় বাইট | প্রয়োজনীয় গ্যাস |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| ফাংশন সিলেক্টর | 4 | 0-3 | 3 | 48 | 1 | 16 |
| শূন্য | 12 | 4-15 | 12 | 48 | 0 | 0 |
| গন্তব্য ঠিকানা | 20 | 16-35 | 0 | 0 | 20 | 320 |
| পরিমাণ | 32 | 36-67 | 17 | 68 | 15 | 240 |
| মোট | 68 | | | 164 | | 576 |

ব্যাখ্যা:

- **ফাংশন সিলেক্টর**: কন্ট্রাক্ট-এ 256-এর কম ফাংশন রয়েছে, তাই আমরা সেগুলোকে একটি একক বাইট দিয়ে আলাদা করতে পারি।
  এই বাইটগুলো সাধারণত অ-শূন্য হয় এবং তাই [ষোল গ্যাস খরচ হয়](https://eips.ethereum.org/EIPS/eip-2028)।
- **শূন্য**: এই বাইটগুলো সর্বদা শূন্য হয় কারণ একটি বিশ-বাইট ঠিকানা ধারণ করার জন্য একটি বত্রিশ-বাইট শব্দের প্রয়োজন হয় না।
  যে বাইটগুলো শূন্য ধারণ করে সেগুলোর খরচ চার গ্যাস ([ইয়েলো পেপার দেখুন](https://ethereum.github.io/yellowpaper/paper.pdf), পরিশিষ্ট G,
  পৃষ্ঠা 27, `G`<sub>`txdatazero`</sub>-এর মান)।
- **পরিমাণ**: যদি আমরা ধরে নিই যে এই কন্ট্রাক্ট-এ `decimals` হলো আঠারো (স্বাভাবিক মান) এবং আমরা যে টোকেন হস্তান্তর করব তার সর্বোচ্চ পরিমাণ হবে 10<sup>18</sup>, তাহলে আমরা সর্বোচ্চ 10<sup>36</sup> পরিমাণ পাব।
  256<sup>15</sup> &gt; 10<sup>36</sup>, তাই পনেরো বাইটই যথেষ্ট।

L1-এ 164 গ্যাস-এর অপচয় সাধারণত নগণ্য। একটি ট্রানজ্যাকশন-এ কমপক্ষে [21,000 গ্যাস](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) খরচ হয়, তাই অতিরিক্ত 0.8% কোনো ব্যাপার না।
যাইহোক, 2022 সালে L2-তে পরিস্থিতি ভিন্ন ছিল। ট্রানজ্যাকশন-এর প্রায় সম্পূর্ণ খরচ ছিল এটিকে L1-এ লেখা।
ট্রানজ্যাকশন কল ডেটা ছাড়াও, 109 বাইট ট্রানজ্যাকশন হেডার (গন্তব্য ঠিকানা, স্বাক্ষর ইত্যাদি) রয়েছে।
তাই মোট খরচ হলো `109*16+576+164=2484`, এবং আমরা এর প্রায় 6.6% অপচয় করছি।

## গন্তব্য আপনার নিয়ন্ত্রণে না থাকলে খরচ কমানো {#reducing-costs-when-you-dont-control-the-destination}

ধরে নিচ্ছি যে গন্তব্য কন্ট্রাক্ট-এর ওপর আপনার কোনো নিয়ন্ত্রণ নেই, তবুও আপনি [এটির](https://github.com/qbzzt/ethereum.org-20220330-shortABI) মতো একটি সমাধান ব্যবহার করতে পারেন।

এটি চালানোর জন্য, আপনার [Node.js](https://nodejs.org/) এবং git প্রয়োজন:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

টেস্টটি Hardhat-এর বিল্ট-ইন লোকাল নেটওয়ার্ক-এ কন্ট্রাক্টগুলো ডিপ্লয় করে, তাই আপনার কোনো ETH-এর প্রয়োজন নেই।
রিপোজিটরিটি Hardhat 2.9 ব্যবহার করে, তাই Node.js-এর বর্তমান সংস্করণগুলোতে এটি সতর্ক করে যে আপনার Node.js সংস্করণটি সমর্থিত নয়, তবে টেস্টটি এখনও পাস করে।

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

[এটি হলো সেই কন্ট্রাক্ট যাকে ট্রানজ্যাকশনগুলোর ছোট কল ডেটা দিয়ে কল করার কথা](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)।
চলুন এটি লাইন বাই লাইন দেখে নিই।

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

কীভাবে কল করতে হবে তা জানার জন্য আমাদের টোকেন ফাংশনটি প্রয়োজন।

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

যে টোকেনটির জন্য আমরা একটি প্রক্সি তার ঠিকানা।

```solidity

    /**
     * @dev টোকেন ঠিকানা নির্দিষ্ট করুন
     * @param tokenAddr_ ERC-20 কন্ট্রাক্ট ঠিকানা
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // কনস্ট্রাক্টর
```

টোকেন ঠিকানাটি হলো একমাত্র প্যারামিটার যা আমাদের নির্দিষ্ট করতে হবে।

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

আমরা মেমরিতে একটি একক 32-বাইট (256-বিট) শব্দ লোড করতে যাচ্ছি এবং যে বাইটগুলো আমাদের কাঙ্ক্ষিত ফিল্ডের অংশ নয় সেগুলো সরিয়ে ফেলতে যাচ্ছি।
এই অ্যালগরিদমটি 32 বাইটের চেয়ে দীর্ঘ মানের জন্য কাজ করে না, এবং অবশ্যই আমরা কল ডেটা-এর শেষের পরে পড়তে পারিবিধা নেই।
L1-এ গ্যাস বাঁচাতে এই টেস্টগুলো এড়িয়ে যাওয়া প্রয়োজন হতে পারে, কিন্তু L2-তে গ্যাস অত্যন্ত সস্তা, যা আমাদের মনে আসা যেকোনো স্যানিটি চেক সক্ষম করে।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

আমরা `fallback()`-এ কল থেকে ডেটা কপি করতে পারতাম (নিচে দেখুন), কিন্তু EVM-এর অ্যাসেম্বলি ভাষা [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) ব্যবহার করা সহজ।

এখানে আমরা স্ট্যাকে `startByte` থেকে `startByte+31` বাইট পড়তে [CALLDATALOAD অপকোড](https://www.evm.codes/#35) ব্যবহার করি।
সাধারণত, Yul-এ একটি অপকোড-এর সিনট্যাক্স হলো `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`।

```solidity

        _retVal = _retVal >> (256-length*8);
```

শুধুমাত্র সবচেয়ে গুরুত্বপূর্ণ `length` বাইটগুলো ফিল্ডের অংশ, তাই আমরা অন্যান্য মানগুলো থেকে মুক্তি পেতে [রাইট-শিফট](https://en.wikipedia.org/wiki/Logical_shift) করি।
এর একটি অতিরিক্ত সুবিধা হলো মানটিকে ফিল্ডের ডানদিকে সরানো, তাই এটি মান গুণ 256<sup>কিছু</sup> হওয়ার পরিবর্তে মানটি নিজেই হয়।

```solidity

        return _retVal;
    }


    fallback() external {
```

যখন একটি Solidity কন্ট্রাক্ট-এ কল কোনো ফাংশন স্বাক্ষরের সাথে মেলে না, তখন এটি [`fallback()` ফাংশন](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) কল করে (ধরে নিচ্ছি যে একটি আছে)।
`CalldataInterpreter`-এর ক্ষেত্রে, _যেকোনো_ কল এখানে আসে কারণ অন্য কোনো `external` বা `public` ফাংশন নেই।

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

কল ডেটা-এর প্রথম বাইটটি পড়ুন, যা আমাদের ফাংশনটি বলে।
এখানে একটি ফাংশন উপলব্ধ না হওয়ার দুটি কারণ রয়েছে:

1. যে ফাংশনগুলো `pure` বা `view` সেগুলো স্টেট পরিবর্তন করে না এবং গ্যাস খরচ করে না (যখন অফচেইন কল করা হয়)।
   সেগুলোর গ্যাস খরচ কমানোর চেষ্টা করার কোনো মানে হয় না।
2. যে ফাংশনগুলো [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)-এর ওপর নির্ভর করে।
   `msg.sender`-এর মান হবে `CalldataInterpreter`-এর ঠিকানা, কলার নয়।

দুর্ভাগ্যবশত, [ERC-20 স্পেসিফিকেশনগুলো দেখলে](https://eips.ethereum.org/EIPS/eip-20), এটি শুধুমাত্র একটি স্ট্যান্ডার্ড ফাংশন, `transfer` ছেড়ে দেয় (কারণ আমরা `transferFrom` কল করতে পারি)।
আমাদের টেস্ট টোকেন-এ `faucet`-ও রয়েছে, যা আমরা সমর্থন করতে পারি কারণ যে আমাদের কল করেছে আমরা তাকে টোকেনগুলো ফেরত হস্তান্তর করতে পারি।

```solidity

        // টোকেনের স্টেট পরিবর্তনকারী মেথডগুলো কল করুন ব্যবহার করে
        // কল ডেটা থেকে প্রাপ্ত তথ্য

        // ফসেট
        if (_func == 1) {
```

`faucet()`-এ একটি কল, যার কোনো প্যারামিটার নেই।

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

আমরা `token.faucet()` কল করার পরে আমরা টোকেন পাই। যাইহোক, প্রক্সি চুক্তি হিসেবে, আমাদের টোকেন-এর **প্রয়োজন** নেই।
যে বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্ট (EOA) বা কন্ট্রাক্ট আমাদের কল করেছে তার প্রয়োজন।
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

আমরা শুধুমাত্র কলারদের তাদের মালিকানাধীন টোকেন হস্তান্তর করার অনুমতি দিই

```solidity
                address(uint160(calldataVal(1, 20))),
```

গন্তব্য ঠিকানা বাইট #1 থেকে শুরু হয় (বাইট #0 হলো ফাংশন)।
একটি ঠিকানা হিসেবে, এটি 20-বাইট দীর্ঘ।

```solidity
                calldataVal(21, 2)
```

এই নির্দিষ্ট কন্ট্রাক্ট-এর জন্য আমরা ধরে নিই যে কেউ হস্তান্তর করতে চাইবে এমন টোকেন-এর সর্বোচ্চ সংখ্যা দুই বাইটে (65536-এর কম) ফিট করে।

```solidity
            );
        }
```

সামগ্রিকভাবে, একটি হস্তান্তর-এ 23 বাইট কল ডেটা লাগে:

| বিভাগ | দৈর্ঘ্য | বাইট |
| ------------------- | -----: | ----: |
| ফাংশন সিলেক্টর | 1 | 0 |
| গন্তব্য ঠিকানা | 20 | 1-20 |
| পরিমাণ | 2 | 21-22 |

```solidity
    }   // ফলব্যাক

}       // কন্ট্রাক্ট CalldataInterpreter
```

### test.js {#test-js}

[এই JavaScript ইউনিট টেস্টটি](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) আমাদের দেখায় কীভাবে এই মেকানিজমটি ব্যবহার করতে হয় (এবং এটি সঠিকভাবে কাজ করে কিনা তা কীভাবে যাচাই করতে হয়)।
আমি ধরে নিচ্ছি যে আপনি [chai](https://www.chaijs.com/) এবং [ethers](https://docs.ethers.org/v5/) বোঝেন এবং শুধুমাত্র সেই অংশগুলো ব্যাখ্যা করব যা বিশেষভাবে কন্ট্রাক্ট-এর ক্ষেত্রে প্রযোজ্য।

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

আমরা [স্বাক্ষরকারীর `sendTransaction` মেথড](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) কল করি কারণ আমরা ইতিমধ্যেই গন্তব্য (`faucetTx.to`) নির্দিষ্ট করেছি এবং আমাদের ট্রানজ্যাকশন-এ স্বাক্ষর করা প্রয়োজন।

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
[আপনি এখানে `control-contract` ব্রাঞ্চে এটি কীভাবে কাজ করে তার একটি উদাহরণ দেখতে পারেন](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)।
এটি চালানোর জন্য, আপনার আগে ক্লোন করা রিপোজিটরিতে সেই ব্রাঞ্চে স্যুইচ করুন এবং টেস্টটি আবার চালান:

```sh
git checkout control-contract
npx hardhat test
```

যদি কন্ট্রাক্টটি শুধুমাত্র বাহ্যিক ট্রানজ্যাকশন-এর প্রতিক্রিয়া জানাত, তবে আমরা শুধুমাত্র একটি কন্ট্রাক্ট রেখেই কাজ চালাতে পারতাম।
যাইহোক, এটি [সংযোজনযোগ্যতা](/developers/docs/smart-contracts/composability/) ভেঙে দেবে।
এমন একটি কন্ট্রাক্ট থাকা অনেক ভালো যা সাধারণ ERC-20 কলগুলোর প্রতিক্রিয়া জানায়, এবং আরেকটি কন্ট্রাক্ট যা ছোট কল ডেটা সহ ট্রানজ্যাকশনগুলোর প্রতিক্রিয়া জানায়।

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

[Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) এবং [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) উভয়ই এখন L1-এ লেখা ডেটা কম্প্রেস করে, এবং ট্রানজ্যাকশন-এর খরচ কমানোর জন্য প্রতিটি ট্রানজ্যাকশন-এর কম্প্রেস করা আকারের ওপর ভিত্তি করে চার্জ করে।
যাইহোক, জেনেরিক সমাধান খুঁজছেন এমন পরিকাঠামো প্রদানকারী হিসেবে, আমাদের ক্ষমতা সীমিত।
dapp ডেভেলপার হিসেবে, আপনার অ্যাপ্লিকেশন-নির্দিষ্ট জ্ঞান রয়েছে, যা আপনাকে একটি জেনেরিক সমাধানে আমরা যতটা পারতাম তার চেয়ে অনেক ভালোভাবে আপনার কল ডেটা অপ্টিমাইজ করতে দেয়।
আশা করি, এই নিবন্ধটি আপনাকে আপনার প্রয়োজনের জন্য আদর্শ সমাধান খুঁজে পেতে সাহায্য করবে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

