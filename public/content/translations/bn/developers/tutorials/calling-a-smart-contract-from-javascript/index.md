---
title: "JavaScript থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা"
description: "একটি DAI টোকেনের উদাহরণ ব্যবহার করে কীভাবে JavaScript থেকে একটি স্মার্ট কন্ট্রাক্ট ফাংশন কল করতে হয়"
author: jdourlens
tags:
  - ট্রানজ্যাকশন
  - ফ্রন্টএন্ড
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: "JS থেকে কন্ট্রাক্ট কল করুন"
lang: bn
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

এই টিউটোরিয়ালে আমরা দেখব কীভাবে JavaScript থেকে একটি [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/) ফাংশন কল করতে হয়। প্রথমে একটি স্মার্ট কন্ট্রাক্টের স্টেট পড়া হবে (যেমন, একজন ERC-20 হোল্ডারের ব্যালেন্স), এরপর আমরা একটি টোকেন হস্তান্তর করার মাধ্যমে ব্লকচেইনের স্টেট পরিবর্তন করব। আপনার ইতিমধ্যে [ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি JS এনভায়রনমেন্ট সেট আপ করার](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) বিষয়ে পরিচিত থাকা উচিত।

এই উদাহরণের জন্য আমরা DAI টোকেন নিয়ে কাজ করব, টেস্টিংয়ের উদ্দেশ্যে আমরা ganache-cli ব্যবহার করে ব্লকচেইন ফর্ক করব এবং এমন একটি ঠিকানা আনলক করব যেখানে আগে থেকেই প্রচুর DAI রয়েছে:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

একটি স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য আমাদের এর ঠিকানা এবং ABI প্রয়োজন হবে:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

এই প্রজেক্টের জন্য আমরা সম্পূর্ণ ERC-20 ABI থেকে শুধুমাত্র `balanceOf` এবং `transfer` ফাংশন রেখে বাকিগুলো বাদ দিয়েছি, তবে আপনি [সম্পূর্ণ ERC-20 ABI এখানে](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) পেতে পারেন।

এরপর আমাদের স্মার্ট কন্ট্রাক্টটি ইনস্ট্যানশিয়েট (instantiate) করতে হবে:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

আমরা দুটি ঠিকানাও সেট আপ করব:

- যে হস্তান্তরটি গ্রহণ করবে এবং
- যে ঠিকানাটি আমরা ইতিমধ্যে আনলক করেছি যা এটি পাঠাবে:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

পরবর্তী অংশে আমরা উভয় ঠিকানায় থাকা বর্তমান টোকেনের পরিমাণ পুনরুদ্ধার করতে `balanceOf` ফাংশনটি কল করব।

## কল (Call): একটি স্মার্ট কন্ট্রাক্ট থেকে মান পড়া {#call-reading-value-from-a-smart-contract}

প্রথম উদাহরণটি একটি "কনস্ট্যান্ট" (constant) মেথড কল করবে এবং কোনো ট্রানজ্যাকশন না পাঠিয়েই EVM-এ এর স্মার্ট কন্ট্রাক্ট মেথডটি এক্সিকিউট করবে। এর জন্য আমরা একটি ঠিকানার ERC-20 ব্যালেন্স পড়ব। [ERC-20 টোকেন সম্পর্কে আমাদের আর্টিকেলটি পড়ুন](/developers/tutorials/understand-the-erc-20-token-smart-contract/)।

আপনি যে ইনস্ট্যানশিয়েট করা স্মার্ট কন্ট্রাক্টের জন্য ABI প্রদান করেছেন, তার মেথডগুলো এভাবে অ্যাক্সেস করতে পারেন: `yourContract.methods.methodname`। `call` ফাংশনটি ব্যবহার করে আপনি ফাংশনটি এক্সিকিউট করার ফলাফল পাবেন।

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

মনে রাখবেন যে DAI ERC-20 এর 18টি ডেসিমাল রয়েছে, যার মানে সঠিক পরিমাণ পেতে আপনাকে 18টি শূন্য সরাতে হবে। uint256 স্ট্রিং হিসেবে রিটার্ন করা হয় কারণ JavaScript বড় সংখ্যার মানগুলো হ্যান্ডেল করতে পারে না। আপনি যদি নিশ্চিত না হন যে [JS-এ বড় সংখ্যাগুলো কীভাবে পরিচালনা করতে হয়, তবে bignumber.js সম্পর্কে আমাদের টিউটোরিয়ালটি দেখুন](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)।

## সেন্ড (Send): একটি স্মার্ট কন্ট্রাক্ট ফাংশনে ট্রানজ্যাকশন পাঠানো {#send-sending-a-transaction-to-a-smart-contract-function}

দ্বিতীয় উদাহরণের জন্য আমরা আমাদের দ্বিতীয় ঠিকানায় 10 DAI পাঠাতে DAI স্মার্ট কন্ট্রাক্টের হস্তান্তর (transfer) ফাংশনটি কল করব। হস্তান্তর ফাংশনটি দুটি প্যারামিটার গ্রহণ করে: প্রাপকের ঠিকানা এবং হস্তান্তর করার জন্য টোকেনের পরিমাণ:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

কল ফাংশনটি সেই ট্রানজ্যাকশনের হ্যাশ রিটার্ন করে যা ব্লকচেইনে মাইন করা হবে। ইথেরিয়ামে, ট্রানজ্যাকশন হ্যাশগুলো অনুমানযোগ্য - এভাবেই আমরা ট্রানজ্যাকশনটি এক্সিকিউট হওয়ার আগেই এর হ্যাশ পেতে পারি ([কীভাবে হ্যাশ গণনা করা হয় তা এখানে জানুন](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))।

যেহেতু ফাংশনটি শুধুমাত্র ব্লকচেইনে ট্রানজ্যাকশন সাবমিট করে, তাই এটি কখন মাইন করা হয়েছে এবং ব্লকচেইনে অন্তর্ভুক্ত হয়েছে তা না জানা পর্যন্ত আমরা ফলাফল দেখতে পারি না। পরবর্তী টিউটোরিয়ালে আমরা শিখব [কীভাবে একটি ট্রানজ্যাকশনের হ্যাশ জেনে ব্লকচেইনে সেটি এক্সিকিউট হওয়ার জন্য অপেক্ষা করতে হয়](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)।