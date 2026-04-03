---
title: "জাভাস্ক্রিপ্ট থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা"
description: "একটি Dai টোকেনের উদাহরণ ব্যবহার করে জাভাস্ক্রিপ্ট থেকে কীভাবে একটি স্মার্ট কন্ট্রাক্ট ফাংশন কল করতে হয়"
author: jdourlens
tags: ["লেনদেন", "ফ্রন্টএন্ড", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: "JS থেকে কন্ট্রাক্ট কল করুন"
lang: bn
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

এই টিউটোরিয়ালে আমরা দেখব কীভাবে জাভাস্ক্রিপ্ট থেকে একটি [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/) ফাংশন কল করতে হয়। প্রথমে একটি স্মার্ট কন্ট্রাক্টের স্টেট পড়া (যেমন, একজন ERC20 হোল্ডারের ব্যালেন্স), তারপর আমরা একটি টোকেন ট্রান্সফার করে ব্লকচেইনের স্টেট পরিবর্তন করব। আপনার ইতিমধ্যে [ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি JS এনভায়রনমেন্ট সেট আপ করার](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) সাথে পরিচিত হওয়া উচিত।

এই উদাহরণের জন্য আমরা DAI টোকেন নিয়ে কাজ করব, টেস্টিংয়ের উদ্দেশ্যে আমরা ganache-cli ব্যবহার করে ব্লকচেইন ফর্ক করব এবং এমন একটি এডড্রেস আনলক করব যেখানে ইতিমধ্যে প্রচুর DAI রয়েছে:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

একটি স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য আমাদের এর এডড্রেস এবং ABI প্রয়োজন হবে:

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

এই প্রজেক্টের জন্য আমরা সম্পূর্ণ ERC20 ABI থেকে শুধুমাত্র `balanceOf` এবং `transfer` ফাংশন রেখেছি, তবে আপনি [সম্পূর্ণ ERC20 ABI এখানে](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) পেতে পারেন।

এরপর আমাদের স্মার্ট কন্ট্রাক্টটি ইনস্ট্যানশিয়েট (instantiate) করতে হবে:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

আমরা দুটি এডড্রেসও সেট আপ করব:

- যে ট্রান্সফারটি গ্রহণ করবে এবং
- যেটি আমরা ইতিমধ্যে আনলক করেছি যা এটি পাঠাবে:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

পরবর্তী অংশে আমরা উভয় এডড্রেসের বর্তমান টোকেনের পরিমাণ পুনরুদ্ধার করতে `balanceOf` ফাংশনটি কল করব।

## কল: একটি স্মার্ট কন্ট্রাক্ট থেকে ভ্যালু পড়া {#call-reading-value-from-a-smart-contract}

প্রথম উদাহরণটি একটি "constant" মেথড কল করবে এবং কোনো লেনদেন না পাঠিয়ে EVM-এ এর স্মার্ট কন্ট্রাক্ট মেথডটি এক্সিকিউট করবে। এর জন্য আমরা একটি এডড্রেসের ERC20 ব্যালেন্স পড়ব। [ERC20 টোকেন সম্পর্কে আমাদের আর্টিকেলটি পড়ুন](/developers/tutorials/understand-the-erc-20-token-smart-contract/)।

আপনি যে স্মার্ট কন্ট্রাক্টের জন্য ABI প্রদান করেছেন তার ইনস্ট্যানশিয়েট করা মেথডগুলো এভাবে অ্যাক্সেস করতে পারেন: `yourContract.methods.methodname`। `call` ফাংশন ব্যবহার করে আপনি ফাংশনটি এক্সিকিউট করার ফলাফল পাবেন।

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

মনে রাখবেন যে DAI ERC20-এর 18 ডেসিমাল রয়েছে, যার মানে সঠিক পরিমাণ পেতে আপনাকে 18টি শূন্য সরাতে হবে। uint256 স্ট্রিং হিসেবে রিটার্ন করা হয় কারণ জাভাস্ক্রিপ্ট বড় সংখ্যার ভ্যালুগুলো হ্যান্ডেল করতে পারে না। আপনি যদি নিশ্চিত না হন [কীভাবে JS-এ বড় সংখ্যা নিয়ে কাজ করতে হয়, তাহলে bignumber.js সম্পর্কে আমাদের টিউটোরিয়ালটি দেখুন](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)।

## সেন্ড: একটি স্মার্ট কন্ট্রাক্ট ফাংশনে লেনদেন পাঠানো {#send-sending-a-transaction-to-a-smart-contract-function}

দ্বিতীয় উদাহরণের জন্য আমরা আমাদের দ্বিতীয় এডড্রেসে 10 DAI পাঠাতে DAI স্মার্ট কন্ট্রাক্টের ট্রান্সফার ফাংশনটি কল করব। ট্রান্সফার ফাংশনটি দুটি প্যারামিটার গ্রহণ করে: প্রাপকের এডড্রেস এবং ট্রান্সফার করার টোকেনের পরিমাণ:

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

কল ফাংশনটি সেই লেনদেনের হ্যাস রিটার্ন করে যা ব্লকচেইনে মাইন করা হবে। ইথিরিয়ামে, লেনদেনের হ্যাসগুলো অনুমানযোগ্য - এভাবেই আমরা লেনদেনটি এক্সিকিউট হওয়ার আগেই এর হ্যাস পেতে পারি ([এখানে জানুন কীভাবে হ্যাস গণনা করা হয়](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))।

যেহেতু ফাংশনটি শুধুমাত্র ব্লকচেইনে লেনদেন সাবমিট করে, তাই এটি কখন মাইন করা হয়েছে এবং ব্লকচেইনে অন্তর্ভুক্ত হয়েছে তা না জানা পর্যন্ত আমরা ফলাফল দেখতে পারি না। পরবর্তী টিউটোরিয়ালে আমরা শিখব [কীভাবে একটি লেনদেনের হ্যাস জেনে ব্লকচেইনে সেটি এক্সিকিউট হওয়ার জন্য অপেক্ষা করতে হয়](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)।