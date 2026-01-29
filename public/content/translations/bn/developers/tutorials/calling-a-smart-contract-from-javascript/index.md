---
title: JavaScript থেকে একটি স্মার্ট কন্ট্র্যাক্ট কল করা
description: একটি Dai টোকেনের উদাহরণ ব্যবহার করে JavaScript থেকে কীভাবে একটি স্মার্ট কন্ট্র্যাক্ট ফাংশন কল করতে হয়
author: jdourlens
tags: [ "লেনদেনসমূহ", "ফ্রন্টএন্ড", "JavaScript", "web3.js" ]
skill: beginner
lang: bn
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

এই টিউটোরিয়ালে আমরা দেখব কিভাবে জাভাস্ক্রিপ্ট থেকে একটি [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/) ফাংশন কল করতে হয়। প্রথমটি হলো একটি স্মার্ট কন্ট্র্যাক্টের স্টেট পড়া (যেমন, একটি ERC20 হোল্ডারের ব্যালেন্স), তারপর আমরা একটি টোকেন ট্রান্সফার করে ব্লকচেইনের স্টেট পরিবর্তন করব। ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য আপনার ইতিমধ্যেই [একটি JS এনভায়রনমেন্ট সেট আপ করার](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) সাথে পরিচিত হওয়া উচিত।

এই উদাহরণের জন্য আমরা DAI টোকেন নিয়ে খেলব, পরীক্ষার উদ্দেশ্যে আমরা ganache-cli ব্যবহার করে ব্লকচেইন ফর্ক করব এবং এমন একটি অ্যাড্রেস আনলক করব যাতে ইতিমধ্যে প্রচুর DAI রয়েছে:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[আপনার INFURA কী] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

একটি স্মার্ট কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য আমাদের এটির অ্যাড্রেস এবং ABI প্রয়োজন হবে:

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

এই প্রজেক্টের জন্য আমরা শুধুমাত্র `balanceOf` এবং `transfer` ফাংশন রাখার জন্য সম্পূর্ণ ERC20 ABI ছেঁটে ফেলেছি কিন্তু আপনি [সম্পূর্ণ ERC20 ABI এখানে](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/) খুঁজে পেতে পারেন।

এরপর আমাদের স্মার্ট কন্ট্র্যাক্টটিকে ইনস্ট্যানশিয়েট করতে হবে:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

আমরা দুটি অ্যাড্রেসও সেট আপ করব:

- যে ট্রান্সফারটি পাবে এবং
- যেটি আমরা ইতিমধ্যে আনলক করেছি সেটি এটি পাঠাবে:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

পরবর্তী অংশে আমরা `balanceOf` ফাংশনটি কল করব উভয় অ্যাড্রেসে বর্তমানে কী পরিমাণ টোকেন রয়েছে তা জানতে।

## কল: একটি স্মার্ট কন্ট্র্যাক্ট থেকে ভ্যালু পড়া {#call-reading-value-from-a-smart-contract}

প্রথম উদাহরণটি একটি “কনস্ট্যান্ট” মেথড কল করবে এবং কোনো লেনদেন না পাঠিয়ে EVM-এ এর স্মার্ট কন্ট্র্যাক্ট মেথডটি কার্যকর করবে। এর জন্য আমরা একটি অ্যাড্রেসের ERC20 ব্যালেন্স পড়ব। [ERC20 টোকেন সম্পর্কে আমাদের আর্টিকেলটি পড়ুন](/developers/tutorials/understand-the-erc-20-token-smart-contract/)।

আপনি যেটির জন্য ABI প্রদান করেছেন সেই ইনস্ট্যানশিয়েটেড স্মার্ট কন্ট্র্যাক্ট মেথডগুলো নিম্নলিখিত উপায়ে অ্যাক্সেস করতে পারেন: `yourContract.methods.methodname`। `call` ফাংশন ব্যবহার করে আপনি ফাংশনটি কার্যকর করার ফলাফল পাবেন।

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("একটি ত্রুটি ঘটেছে", err)
    return
  }
  console.log("ব্যালেন্স হলো: ", res)
})
```

মনে রাখবেন যে DAI ERC20-এর 18টি ডেসিমেল আছে যার অর্থ সঠিক পরিমাণ পেতে আপনাকে 18টি শূন্য সরাতে হবে। uint256 স্ট্রিং হিসাবে ফেরত দেওয়া হয় কারণ জাভাস্ক্রিপ্ট বড় সংখ্যাসূচক মান হ্যান্ডেল করে না। আপনি যদি নিশ্চিত না হন [JS-এ বড় সংখ্যা নিয়ে কীভাবে কাজ করতে হয়, bignumber.js সম্পর্কে আমাদের টিউটোরিয়ালটি দেখুন](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)।

## পাঠানো: একটি স্মার্ট কন্ট্র্যাক্ট ফাংশনে একটি লেনদেন পাঠানো {#send-sending-a-transaction-to-a-smart-contract-function}

দ্বিতীয় উদাহরণের জন্য আমরা আমাদের দ্বিতীয় অ্যাড্রেসে 10 DAI পাঠাতে DAI স্মার্ট কন্ট্র্যাক্টের transfer ফাংশনটিকে কল করব। transfer ফাংশন দুটি প্যারামিটার গ্রহণ করে: প্রাপকের অ্যাড্রেস এবং ট্রান্সফারের জন্য টোকেনের পরিমাণ:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("একটি ত্রুটি ঘটেছে", err)
      return
    }
    console.log("লেনদেনের হ্যাস: " + res)
  })
```

কল ফাংশনটি লেনদেনের হ্যাস রিটার্ন করে যা ব্লকচেইনে মাইন করা হবে। ইথেরিয়ামে, লেনদেনের হ্যাসগুলো অনুমানযোগ্য - এভাবেই আমরা একটি লেনদেন কার্যকর হওয়ার আগে তার হ্যাস পেতে পারি ([হ্যাসগুলো কীভাবে গণনা করা হয় তা এখানে জানুন](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))।

যেহেতু ফাংশনটি শুধুমাত্র ব্লকচেইনে লেনদেন জমা দেয়, তাই এটি কখন মাইন করা হয়েছে এবং ব্লকচেইনে অন্তর্ভুক্ত হয়েছে তা না জানা পর্যন্ত আমরা ফলাফল দেখতে পারি না। পরবর্তী টিউটোরিয়ালে আমরা শিখব [কীভাবে একটি লেনদেনের হ্যাস জেনে ব্লকচেইনে সেটি কার্যকর হওয়ার জন্য অপেক্ষা করতে হয়](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)।
