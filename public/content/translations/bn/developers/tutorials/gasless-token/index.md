---
title: "আপনার গ্যাসবিহীন ব্যবহারকারীদের টোকেন ধরে রাখতে এবং কন্ট্রাক্ট কল করতে দেওয়া"
description: "অ্যাকাউন্ট বিমূর্তকরণ ব্যবহার করে, আমরা এমন স্মার্ট কন্ট্রাক্ট ওয়ালেট তৈরি করতে পারি যা একটি নির্দিষ্ট EOA দ্বারা প্রেরিত বা সেই EOA দ্বারা স্বাক্ষরিত ট্রানজ্যাকশন গ্রহণ করে। এই স্মার্ট কন্ট্রাক্টগুলো তখন টোকেনের মালিক হতে পারে, যা EOA-এর নিয়ন্ত্রণে থাকে।"
author: "ওরি পোমেরান্টজ"
tags: ["গ্যাসবিহীন", "ERC-20", "অ্যাকাউন্ট বিমূর্তকরণ"]
skill: intermediate
breadcrumb: "গ্যাসবিহীন টোকেন"
lang: bn
published: 2026-04-01
---

## ভূমিকা {#introduction}

একটি [পূর্ববর্তী নিবন্ধে](/developers/tutorials/gasless/) EIP-712 স্বাক্ষর ব্যবহার করে আপনার নিজস্ব অ্যাপ্লিকেশনে গ্যাসবিহীন অ্যাক্সেস ব্যবহার করার বিষয়ে আলোচনা করা হয়েছে, তবে এটি শুধুমাত্র আপনার নিজস্ব স্মার্ট কন্ট্রাক্টের মধ্যে সীমাবদ্ধ। [অ্যাকাউন্ট বিমূর্তকরণ](/roadmap/account-abstraction/) ব্যবহার করে, আমরা এমন স্মার্ট কন্ট্রাক্ট ওয়ালেট তৈরি করতে পারি যা দুই ধরনের ট্রানজ্যাকশন গ্রহণ করে এবং সেগুলোকে একটি অনুরোধকৃত গন্তব্যে রিলে করে:

- একটি নির্দিষ্ট EOA দ্বারা প্রেরিত ট্রানজ্যাকশন (যার জন্য সেই EOA-তে ETH থাকা প্রয়োজন)
- যেকোনো স্থান থেকে প্রেরিত, কিন্তু একই EOA দ্বারা স্বাক্ষরিত ট্রানজ্যাকশন।

এভাবে, আমরা একটি অ্যাকাউন্টের জন্য সম্পদ (টোকেন ইত্যাদি) ধরে রাখার এবং গ্যাসযুক্ত একটি EOA যে সমস্ত কাজ করতে পারে তা করার একটি গ্যাসবিহীন উপায় প্রদান করতে পারি।

### আমরা কেন শুধু অনুরোধটি রিলে করতে পারি না? {#why-no-tx-origin}

ERC-20 এবং সম্পর্কিত স্ট্যান্ডার্ডগুলোতে, অ্যাকাউন্টের মালিক হলো [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), অর্থাৎ সেই ঠিকানা যা টোকেন কন্ট্রাক্টকে কল করেছে, যা অগত্যা ট্রানজ্যাকশনের সূচনাকারী [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) নয়। এটি [নিরাপত্তাজনিত কারণে](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) প্রয়োজনীয়। এর মানে হলো, যদি আমরা টোকেন হস্তান্তরের অনুরোধগুলো রিলে করি, তবে সেগুলো ব্যবহারকারীর নিয়ন্ত্রিত ঠিকানার পরিবর্তে রিলেয়ারের ঠিকানা থেকে টোকেন হস্তান্তর করার চেষ্টা করবে।

এমন একটি সমাধান রয়েছে যা আপনাকে [EIP-7702](https://eip7702.io/)-এর মাধ্যমে EOA ঠিকানা ব্যবহার করতে দেয়, তবে এর জন্য একটি সম্ভাব্য বিপজ্জনক অর্পণে স্বাক্ষর করার প্রয়োজন হয়, তাই আপনি এটি শুধুমাত্র এমন একটি স্মার্ট কন্ট্রাক্টে অর্পণ করতে ব্যবহার করতে পারেন যা ওয়ালেট প্রদানকারী অনুমোদন করে। এই টিউটোরিয়ালের জন্য আমি ব্যবহারকারীর প্রক্সি হিসেবে একটি স্মার্ট কন্ট্রাক্ট তৈরি করার অনেক সহজ পদ্ধতিটি পছন্দ করি।

## এটি বাস্তবে দেখা {#in-action}

1. নিশ্চিত করুন যে আপনার কাছে [Node](https://nodejs.org/en/download) এবং [Foundry](https://www.getfoundry.sh/introduction/installation) উভয়ই আছে।

2. অ্যাপ্লিকেশনটি ক্লোন করুন এবং প্রয়োজনীয় সফটওয়্যার ইনস্টল করুন।

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Sepolia-তে ETH আছে এমন একটি ওয়ালেটে `SEPOLIA_PRIVATE_KEY` সেট করতে `.env` সম্পাদনা করুন। আপনার যদি Sepolia ETH-এর প্রয়োজন হয়, তবে এটি পেতে [একটি ফসেট ব্যবহার করুন](/developers/docs/networks/#sepolia)। আদর্শভাবে, এই প্রাইভেট কী-টি আপনার ব্রাউজার ওয়ালেটে থাকা প্রাইভেট কী থেকে আলাদা হওয়া উচিত।

4. সার্ভার চালু করুন।

   ```sh
   npm run dev
   ```

5. [`http://localhost:5173`](http://localhost:5173) URL-এ অ্যাপ্লিকেশনটি ব্রাউজ করুন।

6. একটি ওয়ালেটের সাথে সংযোগ করতে **Connect with Injected**-এ ক্লিক করুন। ওয়ালেটে অনুমোদন করুন এবং প্রয়োজন হলে Sepolia-তে পরিবর্তনটি অনুমোদন করুন।

7. নিচে স্ক্রোল করুন এবং **Deploy UserProxy (slow process)**-এ ক্লিক করুন।

8. আপনি দেখতে পাবেন কখন ব্যবহারকারীর প্রক্সি ডিপ্লয় করা হয়েছে কারণ **UserProxy access**-এর পাশে একটি ঠিকানা থাকবে। আপনি যদি 24 সেকেন্ড (2 ব্লক) অপেক্ষা করেন এবং এটি এখনও না ঘটে থাকে, তবে পরিবর্তনগুলো শনাক্ত করতে কোনো সমস্যা হতে পারে।

   যদি এমন হয়, তবে [Sepolia Explorer](https://eth-sepolia.blockscout.com/)-এ যান এবং `npm run dev`-এ সার্ভার আউটপুটে আপনি যে ডিপ্লয়মেন্ট ট্রানজ্যাকশন হ্যাশ দেখতে পাচ্ছেন তা লিখুন। তৈরি করা কন্ট্রাক্টটির ঠিকানা দেখতে সেটিতে ক্লিক করুন, তারপর এটি কপি করুন। _Or enter existing proxy address_ ফিল্ডে ঠিকানাটি পেস্ট করুন, তারপর **Set proxy address**-এ ক্লিক করুন।

9. টোকেন পেতে ERC-20 কন্ট্রাক্টের [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) ফাংশনে একটি কল জমা দিতে **Request more tokens for proxy**-তে ক্লিক করুন। ওয়ালেটে স্বাক্ষরটি **Confirm** করুন। অবশ্যই, টোকেনগুলো প্রক্সির ঠিকানায় পৌঁছায়, ব্যবহারকারীর ঠিকানায় নয়।

10. নিচে স্ক্রোল করুন এবং _Last transaction:_-এর নিচের লিঙ্কে ক্লিক করুন। এটি আপনাকে `faucet` ট্রানজ্যাকশনটি দেখানোর জন্য ব্রাউজার খুলবে।

11. _amount to transfer_-এ, এক থেকে এক হাজারের মধ্যে একটি সংখ্যা লিখুন। আপনার নিজের ঠিকানায় টোকেনগুলো হস্তান্তর করতে **Transfer**-এ ক্লিক করুন। অনুরোধটির জন্য **Confirm**-এ ক্লিক করার আগে, দেখুন যে যে ডেটা স্বাক্ষর করা হচ্ছে তা অস্পষ্ট। ব্যবহারকারীদের বুঝতে কষ্ট হবে যে তারা কিসে স্বাক্ষর করছেন। মনে রাখবেন যে আমরা [নিচে](#vulnerabilities) এটি নিয়ে আলোচনা করব।

12. ট্রানজ্যাকশনটি নিশ্চিত হওয়ার পরে, _your balance_ এবং _proxy balance_ উভয় ক্ষেত্রেই পরিবর্তন দেখার জন্য অপেক্ষা করুন। মনে রাখবেন যে এটিও কিছুটা সময় নেবে, কারণ Sepolia-এর ব্লক টাইম 12 সেকেন্ড।

## এটি কীভাবে কাজ করে {#how-work}

একটি গ্যাসবিহীন অভিজ্ঞতার জন্য, আমাদের ব্যবহারকারীর জন্য একটি ইউজার ইন্টারফেস, ইউজার ইন্টারফেস থেকে চেইনে বার্তাগুলো রাউট করার জন্য একটি সার্ভার এবং সেগুলোকে গ্রহণ ও যাচাই করার জন্য একটি স্মার্ট কন্ট্রাক্ট প্রয়োজন।

### ওয়ালেট স্মার্ট কন্ট্রাক্ট {#wallet-smart-contract}

এটি হলো [স্মার্ট কন্ট্রাক্ট](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol)। এর উদ্দেশ্য হলো আসল মালিক যা অনুরোধ করেন তা করা, অনুরোধ করার জন্য যে চ্যানেলই ব্যবহার করা হোক না কেন, এবং অন্য সবকিছু উপেক্ষা করা। এটি করার জন্য, এর ফাংশনগুলো কল করার জন্য একটি টার্গেট ঠিকানা এবং এটি কল করার জন্য ব্যবহার করার ডেটা গ্রহণ করে।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

মালিকের পরিচয় এবং বার্তাগুলোর পুনরাবৃত্তি রোধ করতে একটি [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce)। যেহেতু নন্স একটি `public` ভেরিয়েবল, তাই Solidity কম্পাইলার একটি ভিউ ফাংশন, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0) তৈরি করে, যা অফচেইন কোডকে এর মান পড়তে দেয়।

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 স্বাক্ষর](https://eips.ethereum.org/EIPS/eip-712) যাচাই করার জন্য প্রয়োজনীয় তথ্য।

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

একটি `UserProxy` একটি একক মালিকের ঠিকানার সাথে যুক্ত থাকে। এটি প্রয়োজনীয় কারণ এটি সম্পদের (ERC-20 টোকেন, NFT ইত্যাদি) মালিক হতে পারে। আমরা বিভিন্ন মালিকের সম্পদ একসাথে মেলাতে চাই না।

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[ডোমেইন সেপারেটর](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)। এটি কম্পাইল করার সময় গণনা করা যায় না, কারণ এটি চেইন আইডি এবং কন্ট্রাক্ট ঠিকানার উপর নির্ভর করে। এটি একটি UserProxy-কে অন্যটির জন্য প্রস্তুত করা বার্তার দ্বারা প্রতারিত হওয়া অসম্ভব করে তোলে।

```solidity
    event CallResult(address target, bytes returnData);
```

একটি কলের ফলাফল লগ করুন।

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

এই ফাংশনটি সরাসরি মালিক দ্বারা কল করা যেতে পারে। যদি কোনো রিলে উপলব্ধ না থাকে, তবে মালিক এখনও সরাসরি ব্লকচেইনে সম্পদগুলো অ্যাক্সেস করতে পারেন (যদি ব্যবহারকারীর কাছে ETH থাকে)।

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

যদি মালিক আমাদের _সরাসরি_ কল করেন, তবে প্রদত্ত কল ডেটা দিয়ে টার্গেটকে কল করুন।

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

এটি `UserProxy`-এর প্রধান ফাংশন। এটি `target` এবং `data`-এর পাশাপাশি একটি স্বাক্ষর পায়।

```solidity
    external returns (bytes memory) {
        // EIP-712 ডাইজেস্ট গণনা করুন
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

ডাইজেস্টটিতে নন্সও অন্তর্ভুক্ত থাকে, তবে আমাদের এটি ট্রানজ্যাকশন থেকে গ্রহণ করার প্রয়োজন নেই; আমরা ইতিমধ্যেই সঠিক মানটি জানি। ভুল নন্সযুক্ত একটি স্বাক্ষর প্রত্যাখ্যান করা হবে।

```solidity

    // স্বাক্ষরকারী পুনরুদ্ধার করুন
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

যদি স্বাক্ষরটি অবৈধ হয়, তবে `ecrecover` সাধারণত একটি ভিন্ন ঠিকানা প্রদান করবে এবং এটি গ্রহণ করা হবে না।

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

ব্যবহারকারী আমাদের যে কন্ট্রাক্টটি কল করতে বলেছেন সেটি কল করুন এবং সফল না হলে রিভার্ট করুন।

```solidity
    emit CallResult(target, returnData);

    nonce++; // রিপ্লে প্রতিরোধ করতে নন্স বৃদ্ধি করুন

    return returnData;
}
```

সফল হলে, একটি লগ ইভেন্ট এমিট করুন এবং নন্স বৃদ্ধি করুন।

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

এগুলো প্রায় অভিন্ন ভেরিয়েন্ট যা আপনাকে কন্ট্রাক্ট থেকে ETH হস্তান্তর করতেও দেয়।

### রিলেয়ার {#relayer}

রিলেয়ার হলো একটি [সার্ভার কম্পোনেন্ট](/developers/tutorials/server-components/)। এটি JavaScript-এ লেখা হয়েছে; আপনি সোর্স কোডটি [এখানে](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) দেখতে পারেন।

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

আমাদের প্রয়োজনীয় লাইব্রেরিগুলো। এটি একটি [Express](https://expressjs.com/) সার্ভার, যা ইউজার ইন্টারফেস কোড পরিবেশন করতে [Vite](https://vite.dev/) ব্যবহার করে। আমরা ব্লকচেইনের সাথে যোগাযোগ করতে [Viem](https://viem.sh/) ব্যবহার করি এবং যে ঠিকানাটি ট্রানজ্যাকশন পাঠায় তার প্রাইভেট কী পড়তে [dotenv](https://www.dotenv.org/) ব্যবহার করি।

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

এটি কম্পাইল করা `UserProxy` পড়ার একটি সহজ উপায়। `UserProxy` কল করতে সক্ষম হওয়ার জন্য আমাদের ABI প্রয়োজন এবং একজন ব্যবহারকারীর জন্য এটি ডিপ্লয় করতে সক্ষম হওয়ার জন্য কম্পাইল করা কোড প্রয়োজন।

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` ফাইলটি পড়ুন, ঠিকানাটি বের করুন এবং এটি কনসোলে প্রিন্ট করুন।

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Viem ক্লায়েন্টগুলো যা ব্লকচেইনের সাথে কথা বলে।

```js
const start = async () => {
  const app = express()
```

একটি Express সার্ভার চালান।

```js
  app.use(express.json())
```

Express-কে রিকোয়েস্ট বডি পড়তে বলুন এবং যদি এটি JSON হয় তবে এটি পার্স করতে বলুন।

```js
  app.post("/server/deploy", async (req, res) => {
```

এটি সেই কোড যা প্রক্সি ডিপ্লয় করার অনুরোধগুলো পরিচালনা করে। মনে রাখবেন যে আমরা এখানে [ডিনায়াল-অফ-সার্ভিস](https://en.wikipedia.org/wiki/Denial-of-service_attack) আক্রমণের জন্য ঝুঁকিপূর্ণ কারণ একজন আক্রমণকারী আমাদের ETH শেষ না হওয়া পর্যন্ত প্রক্সি ডিপ্লয় করার অনুরোধ দিয়ে আমাদের স্প্যাম করতে পারে। একটি প্রোডাকশন সিস্টেমে, আমরা সম্ভবত চাইব যে প্রক্সি ডিপ্লয় করার অনুরোধটি স্বাক্ষরিত হোক এবং স্বাক্ষরকারী একজন বিদ্যমান গ্রাহক হোন।

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

অনুরোধ থেকে মালিকের ঠিকানা পান।

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[কন্ট্রাক্টটি ডিপ্লয় করুন](https://viem.sh/docs/contract/deployContract#deploycontract) এবং [এটি ডিপ্লয় হওয়া পর্যন্ত অপেক্ষা করুন](https://viem.sh/docs/actions/public/waitForTransactionReceipt)।

```js
      res.json({ contractAddress: receipt.contractAddress })
```

যদি সবকিছু ঠিক থাকে, তবে ইউজার ইন্টারফেসে প্রক্সির ঠিকানাটি ফেরত দিন।

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

যদি কোনো সমস্যা হয়, তবে তা রিপোর্ট করুন।

```js
  app.post("/server/message", async (req, res) => {
```

এটি সেই কোড যা `UserProxy` কন্ট্রাক্টের জন্য ব্যবহারকারীর বার্তাগুলো প্রক্রিয়া করে। এটি ডিনায়াল-অফ-সার্ভিস আক্রমণের জন্য ঝুঁকিপূর্ণ আরেকটি পয়েন্ট।

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

অনুরোধের ডেটা পান এবং প্রক্সিতে `signedAccess` কল করতে এটি ব্যবহার করুন।

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

ট্রানজ্যাকশন হ্যাশটি রিপোর্ট করুন। এটি UI-কে ব্যবহারকারীর ট্রানজ্যাকশন চেক করার জন্য একটি URL প্রদর্শন করতে দেয়।

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

আবার, যদি কোনো সমস্যা হয়, তবে তা রিপোর্ট করুন।

```js
  // বাকি সবকিছু Vite-কে সামলাতে দিন
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

অন্য সবকিছুর জন্য, Vite ব্যবহার করুন, যা আমাদের জন্য ইউজার ইন্টারফেস পরিবেশন পরিচালনা করে।

### ইউজার ইন্টারফেস {#user-interface}

[এটি ইউজার ইন্টারফেস কোড](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src)। [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) ব্যতীত বেশিরভাগ কোড [এই নিবন্ধে](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) নথিভুক্ত কোডের প্রায় অভিন্ন।

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)-এর কিছু অংশ [এই নিবন্ধের](/developers/tutorials/gasless/#ui-changes) [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)-এর মতো। এখানে নতুন অংশগুলো দেওয়া হলো।

```js
import {
   encodeFunctionData
       } from 'viem'
```

[এই ফাংশনটি](https://viem.sh/docs/contract/encodeFunctionData) একটি EVM ফাংশন কলের জন্য কল ডেটা তৈরি করে। এটি প্রয়োজনীয় যাতে ব্যবহারকারী কল ডেটাতে স্বাক্ষর করতে পারেন।

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, যা উপরে ব্যাখ্যা করা হয়েছে।

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[এই কন্ট্রাক্টটি](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) মূলত একটি সাধারণ ERC-20 কন্ট্রাক্ট, যার সাথে একটি গুরুত্বপূর্ণ ফাংশন, `faucet()` যুক্ত করা হয়েছে। এই ফাংশনটি পরীক্ষার উদ্দেশ্যে যে কেউ টোকেন চাইলে তাকে তা প্রদান করে।

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken`-এর ঠিকানা।

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

এই কম্পোনেন্টটি একটি ব্লক এক্সপ্লোরারে কন্ট্রাক্টের লিঙ্কসহ একটি ঠিকানা আউটপুট করে।

```js
const Token = () => {
    ...
```

এটি প্রধান কম্পোনেন্ট যা বেশিরভাগ কাজ করে।

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

ব্যবহারকারীর ঠিকানার টোকেন ব্যালেন্স।

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

ব্যবহারকারীর মালিকানাধীন একটি প্রক্সির ঠিকানা।

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

প্রক্সির টোকেন ব্যালেন্স।

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

ব্যবহারকারী যখন ম্যানুয়ালি প্রক্সির ঠিকানা সেট করেন তখন এই ফিল্ডটি ব্যবহার করা হয়। ম্যানুয়ালি প্রক্সির ঠিকানা সেট করার ক্ষমতা থাকার ফলে ব্যবহারকারী প্রতিবার নতুন প্রক্সি ডিপ্লয় করার (এবং পুরানো প্রক্সির মালিকানাধীন সমস্ত টোকেন হারানোর) পরিবর্তে একটি বিদ্যমান প্রক্সি ব্যবহার করতে পারেন।

```js
  const [ txHash, setTxHash ] = useState(null)
```

শেষ ট্রানজ্যাকশনের হ্যাশ, যা এক্সপ্লোরারের একটি লিঙ্ক দেখাতে ব্যবহৃত হয় যাতে ব্যবহারকারী সেই ট্রানজ্যাকশনটি চেক করতে পারেন।

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

এই ফিল্ডগুলো সবই একটি ERC-20 কন্ট্রাক্টে টোকেন হস্তান্তরের কমান্ড পাঠাতে ব্যবহৃত হয়। এটি `FaucetToken` হতে পারে, তবে তা হওয়া বাধ্যতামূলক নয়। [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) ফাংশনটি ERC-20 স্ট্যান্ডার্ডের অংশ।

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

আমরা যে দুটি টোকেন ব্যালেন্সে আগ্রহী তা পড়ুন, ব্যবহারকারীর মালিকানায় কত আছে এবং প্রক্সির মালিকানায় কত আছে।

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

রিপ্লে আক্রমণ (উদাহরণস্বরূপ, একজন বিক্রেতা এমন একটি ট্রানজ্যাকশন রিপ্লে করছে যা তাকে অর্থ দেয়) রোধ করতে, আমরা একটি [নন্স](https://en.wikipedia.org/wiki/Cryptographic_nonce) ব্যবহার করি। আমরা যে ডেটাতে স্বাক্ষর করি তাতে এটি যোগ করার জন্য আমাদের বর্তমান মানটি জানতে হবে।

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

ব্লকচেইন থেকে পড়া তথ্য পরিবর্তিত হলে ব্যবহারকারীকে প্রদর্শিত ব্যালেন্স আপডেট করতে [`useEffect`](https://react.dev/reference/react/useEffect) ব্যবহার করুন।

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

ডিফল্ট হলো ব্যবহারকারীর নিজস্ব অ্যাকাউন্টে `FaucetToken` টোকেন হস্তান্তর করা। এখানে আমরা Viem থেকে এই মানগুলো পাওয়ার সময় সেগুলো সেট করি।

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

টেক্সট ফিল্ডগুলো পরিবর্তিত হলে তার জন্য ইভেন্ট হ্যান্ডলার।

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

এই ব্যবহারকারীর জন্য একটি প্রক্সি ডিপ্লয় করতে সার্ভারকে বলুন।

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

অনচেইনে `UserProxy`-এ পাঠানোর জন্য সার্ভারে পাঠানোর আগে একটি বার্তায় স্বাক্ষর করুন। এটি [এখানে](/developers/tutorials/gasless/#ui-changes) ব্যাখ্যা করা হয়েছে। আমাদের টার্গেট ঠিকানা (আমরা যে টোকেনটি কল করছি তার ঠিকানা) এবং পাঠানোর জন্য কল ডেটা উভয়সহ একটি বার্তায় স্বাক্ষর করতে হবে।

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

`UserProxy`-এ একটি স্বাক্ষরিত বার্তা পাঠান, যা স্বাক্ষরটি যাচাই করবে এবং তারপর এটি `target`-এ পাঠাবে।

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // উভয় ঠিকানা
          data,           // টার্গেটে পাঠানোর জন্য কল ডেটা
          v, r, s         // স্বাক্ষর
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

সার্ভারে একটি অনুরোধ পাঠান এবং আপনি যখন প্রতিক্রিয়া পাবেন, তখন ট্রানজ্যাকশন হ্যাশটি পান।

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` ফাংশন কল করার অনুকরণ করুন। এটি সফল হলেই আমরা ফসেট বোতামটি সক্ষম করি।

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

সার্ভার এবং `UserProxy`-এর মাধ্যমে একটি ফাংশন কল করতে, আমরা তিনটি ধাপ অনুসরণ করি:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) ব্যবহার করে স্বাক্ষর করতে এবং পাঠাতে কল ডেটা তৈরি করুন।

2. বার্তায় স্বাক্ষর করুন (টার্গেট ঠিকানা, কল ডেটা এবং নন্স)।

3. সার্ভারে বার্তাটি পাঠান।

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

কম্পোনেন্টের এই অংশটি আপনাকে ব্রাউজার থেকে সরাসরি `FaucetToken` ব্যবহার করতে দেয়। এর প্রধান উদ্দেশ্য হলো ডিবাগিং সহজতর করা।

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

ব্যবহারকারীকে একটি নতুন `UserProxy` ডিপ্লয় করতে দিন।

```js
         <br /><br />
         <input type="text" placeholder="অথবা বিদ্যমান প্রক্সি ঠিকানা লিখুন" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

ব্যবহারকারীরা যখন একটি বৈধ ঠিকানা প্রবেশ করান তখনই কেবল তাদের **Set proxy address**-এ ক্লিক করতে দিন। মনে রাখবেন যে এটি নিশ্চিত করে না যে প্রশ্নবিদ্ধ ঠিকানাটি সত্যিই একটি `UserProxy` কন্ট্রাক্ট। এই ধরনের একটি চেক যোগ করা সম্ভব, তবে এটি অনেক ধীর হবে (খারাপ ব্যবহারকারীর অভিজ্ঞতা) এবং নিরাপত্তার উন্নতি করবে না (আক্রমণকারীরা সর্বদা ইউজার ইন্টারফেসের জন্য তাদের নিজস্ব কোড ব্যবহার করতে পারে)।

```js
         <br /><br />
         { proxyAddr && (
```

বাকি অংশ _শুধুমাত্র_ তখনই দেখান যদি একটি বৈধ প্রক্সি ঠিকানা থাকে।

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

ব্যবহারকারীর নন্স জানার প্রয়োজন নেই; এটি শুধুমাত্র ডিবাগিংয়ের উদ্দেশ্যে।

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

আমরা প্রক্সির মাধ্যমে `faucet()`-এ একটি কলের অনুকরণ করতে পারি না। তবে, আমরা অন্তত নিশ্চিত করতে পারি যে আমাদের একটি প্রক্সি আছে এবং প্রক্সিটি আমাদের কাছে একটি নন্স রিপোর্ট করেছে।

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

ব্যবহারকারীকে ERC-20 হস্তান্তর ট্রানজ্যাকশন ইস্যু করতে দিন।

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

যদি কোনো শেষ ট্রানজ্যাকশন হ্যাশ থাকে, তবে একটি লিঙ্ক দেখান যাতে ব্যবহারকারী এটি একটি ব্লক এক্সপ্লোরারে দেখতে পারেন।

```js
 
</div>
    </>
  )
}

export {Token}
```

এটি শুধুমাত্র React বয়লারপ্লেট।

## দুর্বলতা {#vulnerabilities}

আমাদের সার্ভার ডিনায়াল-অফ-সার্ভিস আক্রমণের জন্য ঝুঁকিপূর্ণ। এই আক্রমণটি [সিরিজের পূর্ববর্তী নিবন্ধে](/developers/tutorials/gasless/#dos-on-server) ব্যাখ্যা করা হয়েছে।

অতিরিক্তভাবে, আমরা খারাপ ব্যবহারকারীর আচরণকে উৎসাহিত করছি। আমরা ব্যবহারকারীকে এটিতে স্বাক্ষর করতে বলি:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_আমরা_ জানি যে এটি টোকেন, পরিমাণ এবং গন্তব্য ঠিকানার জন্য একটি বৈধ ERC-20 হস্তান্তর যা ব্যবহারকারী হস্তান্তর করতে চান। কিন্তু বেশিরভাগ ব্যবহারকারী জানেন না কীভাবে কল ডেটা ব্যাখ্যা করতে হয় এবং তারা কিসে স্বাক্ষর করছেন সে সম্পর্কে তাদের কোনো ধারণা নেই। এটি খারাপ ডিজাইন, দুটি কারণে:

- কিছু ব্যবহারকারী আমাদের ব্যবহার করবেন না কারণ আমরা তাদের যে ডেটাতে স্বাক্ষর করতে বলি তারা তা বিশ্বাস করেন না।
- অন্যান্য ব্যবহারকারীরা আমাদের বিশ্বাস _করবেন_ এবং শিখবেন যে তাদের কেবল কল ডেটা কী তা না বুঝেই স্বাক্ষর করা উচিত। এর মানে হলো যে যদি অ্যাডাম অ্যাটাকার তাদের তার ওয়েবসাইটে রিডাইরেক্ট করতে সক্ষম হয়, তবে সে তাদের এমন একটি ট্রানজ্যাকশনে স্বাক্ষর করাতে পারে যা তাকে ব্যবহারকারীর মালিকানাধীন সমস্ত USDC (বা DAI, বা অন্য কোনো ERC-20) প্রদান করে।

এর সমাধান হলো সাধারণত ব্যবহৃত ফাংশনগুলোর জন্য `UserProxy`-এ আলাদা ফাংশন রাখা, যেমন হস্তান্তর। তাহলে ব্যবহারকারীরা এমন কিছুতে স্বাক্ষর করতে পারবেন যা তারা বোঝেন।

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**দ্রষ্টব্য:** যদিও ব্যবহারকারীরা তাদের ইচ্ছামতো যেকোনো ওয়ালেট ব্যবহার করতে পারেন, তবে এটি অত্যন্ত সুপারিশ করা হয় যে EIP-712 ব্যবহার করা অ্যাপ্লিকেশনগুলো তাদের এমন একটি ওয়ালেট ব্যবহার করতে উৎসাহিত করে যা [সম্পূর্ণ স্বাক্ষর ডেটা দেখায়](https://rabby.io/)। কিছু ওয়ালেট ঠিকানাটি কেটে ছোট করে দেয়, যা অনিরাপদ। একজন আক্রমণকারী এমন একটি ঠিকানা তৈরি করতে পারে যার শুরু এবং শেষের অক্ষরগুলো একই, কিন্তু মাঝখানে ভিন্ন।

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## উপসংহার {#conclusion}

উপরের দুর্বলতাগুলো ছাড়াও, এই টিউটোরিয়ালের সমাধানটিতে বেশ কয়েকটি ত্রুটি রয়েছে যা ইথেরিয়াম আমাদের সমাধান করতে সাহায্য করতে পারে।

- _সেন্সরশিপ প্রতিরোধ_। বর্তমানে, ব্যবহারকারীরা আপনার সার্ভার, অন্য কারও দ্বারা সেট আপ করা একটি প্রতিযোগী সার্ভার ব্যবহার করতে পারেন, অথবা সরাসরি ইথেরিয়ামের সাথে সংযোগ করতে পারেন, যার ফলে গ্যাস খরচ হয়। [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) ব্যবহার করে ব্যবহারকারীরা তাদের ট্রানজ্যাকশন সার্ভারগুলোর একটি বড় পুলে অফার করতে পারেন, যা তাদের ট্রানজ্যাকশনগুলো সেন্সর হওয়ার সম্ভাবনা হ্রাস করে।
- _EOA মালিকানাধীন সম্পদ_। উপরে যেমন উল্লেখ করা হয়েছে, একটি EOA ঠিকানার মালিকানাধীন সম্পদগুলো পরিচালনা করতে [EIP-7702](https://eip7702.io/) ব্যবহার করা যেতে পারে। এর কিছু অসুবিধা রয়েছে, তবে কখনও কখনও এটি প্রয়োজনীয়।

আমি অদূর ভবিষ্যতে এই বৈশিষ্ট্যগুলো যোগ করার বিষয়ে টিউটোরিয়াল প্রকাশ করার আশা করছি।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
