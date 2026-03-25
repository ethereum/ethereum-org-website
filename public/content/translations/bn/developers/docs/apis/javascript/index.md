---
title: "জাভাস্ক্রিপ্ট API লাইব্রেরি"
description: "জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরিগুলির একটি পরিচিতি যা আপনাকে আপনার অ্যাপ্লিকেশন থেকে ব্লকচেইনের সাথে যোগাযোগ করতে দেয়।"
lang: bn
---

একটি ওয়েব অ্যাপকে ইথেরিয়াম ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য (যেমন, ব্লকচেইন ডেটা পড়া এবং/অথবা নেটওয়ার্কে লেনদেন পাঠানো), এটিকে অবশ্যই একটি ইথেরিয়াম নোডের সাথে সংযোগ স্থাপন করতে হবে।

এই উদ্দেশ্যে, প্রতিটি ইথেরিয়াম ক্লায়েন্ট [JSON-RPC](/developers/docs/apis/json-rpc/) স্পেসিফিকেশন প্রয়োগ করে, তাই এখানে [পদ্ধতিগুলির](/developers/docs/apis/json-rpc/#json-rpc-methods) একটি অভিন্ন সেট রয়েছে যার উপর অ্যাপ্লিকেশনগুলি নির্ভর করতে পারে।

আপনি যদি একটি ইথেরিয়াম নোডের সাথে সংযোগ করতে JavaScript ব্যবহার করতে চান, তাহলে ভ্যানিলা JavaScript ব্যবহার করা সম্ভব কিন্তু ইকোসিস্টেমের মধ্যে বেশ কিছু সুবিধাজনক লাইব্রেরি বিদ্যমান যা এটিকে অনেক সহজ করে তোলে। এই লাইব্রেরিগুলির সাহায্যে, ডেভেলপাররা Ethereum-এর সাথে ইন্টারঅ্যাক্ট করে এমন JSON-RPC অনুরোধগুলি (হুডের নীচে) শুরু করার জন্য স্বজ্ঞাত, এক-লাইনের পদ্ধতি লিখতে পারে।

অনুগ্রহ করে মনে রাখবেন যে [The Merge](/roadmap/merge/) থেকে, একটি নোড চালানোর জন্য ইথেরিয়াম সফ্টওয়্যারের দুটি সংযুক্ত অংশ - একটি এক্সিকিউশন ক্লায়েন্ট এবং একটি কনসেন্সাস ক্লায়েন্ট - প্রয়োজন। অনুগ্রহ করে নিশ্চিত করুন যে আপনার নোডে একটি এক্সিকিউশন এবং কনসেন্সাস ক্লায়েন্ট উভয়ই অন্তর্ভুক্ত আছে। যদি আপনার নোডটি আপনার স্থানীয় মেশিনে না থাকে (যেমন, আপনার নোডটি একটি AWS ইনস্ট্যান্সে চলছে) তাহলে টিউটোরিয়ালে সেই অনুযায়ী IP ঠিকানাগুলি আপডেট করুন। আরও তথ্যের জন্য অনুগ্রহ করে আমাদের [একটি নোড চালানো](/developers/docs/nodes-and-clients/run-a-node/) বিষয়ক পৃষ্ঠা দেখুন।

## পূর্বশর্ত {#prerequisites}

জাভাস্ক্রিপ্ট বোঝার পাশাপাশি, [ইথেরিয়াম স্ট্যাক](/developers/docs/ethereum-stack/) এবং [ইথেরিয়াম ক্লায়েন্ট](/developers/docs/nodes-and-clients/) বোঝা সহায়ক হতে পারে।

## একটি লাইব্রেরি কেন ব্যবহার করবেন? {#why-use-a-library}

এই লাইব্রেরিগুলি সরাসরি একটি Ethereum নোডের সাথে ইন্টারঅ্যাক্ট করার জটিলতাকে অনেকটাই সহজ করে দেয়। তারা ইউটিলিটি ফাংশনও (যেমন, ETH-কে Gwei-তে রূপান্তর করা) সরবরাহ করে যাতে একজন ডেভেলপার হিসেবে আপনি Ethereum ক্লায়েন্টের জটিলতা নিয়ে কাজ করার জন্য কম সময় ব্যয় করতে পারেন এবং আপনার অ্যাপ্লিকেশনের অনন্য কার্যকারিতার উপর বেশি সময় মনোনিবেশ করতে পারেন।

## লাইব্রেরির বৈশিষ্ট্য {#library-features}

### ইথেরিয়াম নোডগুলির সাথে সংযোগ করুন {#connect-to-ethereum-nodes}

প্রদানকারীদের ব্যবহার করে, এই লাইব্রেরিগুলি আপনাকে ইথেরিয়াম-এর সাথে সংযোগ স্থাপন করতে এবং এর ডেটা পড়তে দেয়, তা JSON-RPC, INFURA, Etherscan, Alchemy বা MetaMask-এর মাধ্যমেই হোক না কেন।

> **সতর্কবার্তা:** Web3.js মার্চ ৪, ২০২৫-এ আর্কাইভ করা হয়েছে। [ঘোষণাটি পড়ুন](https://blog.chainsafe.io/web3-js-sunset/)। নতুন প্রকল্পের জন্য [ethers.js](https://ethers.org) বা [viem](https://viem.sh) এর মতো বিকল্প লাইব্রেরি ব্যবহার করার কথা বিবেচনা করুন।

**Ethers উদাহরণ**

```js
// একটি ব্রাউজারপ্রোভাইডার একটি স্ট্যান্ডার্ড Web3 প্রদানকারীকে মোড়ানো হয়, যা হলো
// মেটামাস্ক প্রতিটি পৃষ্ঠায় window.ethereum হিসেবে যা ইনজেক্ট করে
const provider = new ethers.BrowserProvider(window.ethereum)

// মেটামাস্ক প্লাগইনটি লেনদেনে স্বাক্ষর করার অনুমতিও দেয়
// ইথার পাঠাতে এবং ব্লকচেইনের মধ্যে অবস্থা পরিবর্তন করতে অর্থ প্রদান করতে।
// এর জন্য, আমাদের অ্যাকাউন্ট সাইনার প্রয়োজন...
const signer = provider.getSigner()
```

**Web3js উদাহরণ**

```js
var web3 = new Web3("http://localhost:8545")
// অথবা
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// প্রদানকারী পরিবর্তন করুন
web3.setProvider("ws://localhost:8546")
// অথবা
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js-এ IPC প্রদানকারী ব্যবহার করে
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os পাথ
// অথবা
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os পাথ
// উইন্ডোজে পাথটি হলো: "\\\\.\\pipe\\geth.ipc"
// লিনাক্সে পাথটি হলো: "/users/myuser/.ethereum/geth.ipc"
```

একবার সেট আপ হয়ে গেলে আপনি এর জন্য ব্লকচেইন জিজ্ঞাসা করতে সক্ষম হবেন:

- ব্লক নম্বর
- গ্যাস অনুমান
- স্মার্ট কন্ট্র্যাক্ট ইভেন্ট
- নেটওয়ার্ক আইডি
- এবং আরও...

### ওয়ালেট কার্যকারিতা {#wallet-functionality}

এই লাইব্রেরিগুলি আপনাকে ওয়ালেট তৈরি করতে, কী পরিচালনা করতে এবং লেনদেনে স্বাক্ষর করার কার্যকারিতা দেয়।

এখানে Ethers থেকে একটি উদাহরণ দেওয়া হল

```js
// একটি স্মৃতিচিহ্ন থেকে একটি ওয়ালেট ইনস্ট্যান্স তৈরি করুন...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...অথবা একটি ব্যক্তিগত কী থেকে
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// সত্য

// সাইনার API অনুযায়ী একটি প্রতিশ্রুতি হিসাবে ঠিকানা
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// একটি ওয়ালেট ঠিকানাও সিঙ্ক্রোনাসভাবে উপলব্ধ
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// অভ্যন্তরীণ ক্রিপ্টোগ্রাফিক উপাদান
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// ওয়ালেট স্মৃতিচিহ্ন
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// দ্রষ্টব্য: একটি ব্যক্তিগত কী দিয়ে তৈরি একটি ওয়ালেটে থাকে না
//       একটি স্মৃতিচিহ্ন (ডেরিভেশন এটি প্রতিরোধ করে)
walletPrivateKey.mnemonic
// শূন্য

// একটি বার্তায় স্বাক্ষর করা
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// একটি লেনদেনে স্বাক্ষর করা
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// সংযোগ পদ্ধতি এর একটি নতুন উদাহরণ প্রদান করে
// একজন প্রদানকারীর সাথে সংযুক্ত ওয়ালেট
wallet = walletMnemonic.connect(provider)

// নেটওয়ার্ক জিজ্ঞাসা করা হচ্ছে
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ইথার পাঠানো হচ্ছে
wallet.sendTransaction(tx)
```

[সম্পূর্ণ ডক্স পড়ুন](https://docs.ethers.io/v5/api/signer/#Wallet)

একবার সেট আপ হয়ে গেলে আপনি সক্ষম হবেন:

- অ্যাকাউন্ট তৈরি করুন
- লেনদেন পাঠান
- লেনদেনে স্বাক্ষর করুন
- এবং আরও...

### স্মার্ট কন্ট্র্যাক্ট ফাংশনের সাথে ইন্টারঅ্যাক্ট করুন {#interact-with-smart-contract-functions}

জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরিগুলি আপনার অ্যাপ্লিকেশনকে একটি সংকলিত চুক্তির অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) পড়ার মাধ্যমে স্মার্ট কন্ট্র্যাক্ট ফাংশন কল করার অনুমতি দেয়।

ABI মূলত চুক্তির ফাংশনগুলিকে একটি JSON ফর্ম্যাটে ব্যাখ্যা করে এবং আপনাকে এটিকে একটি সাধারণ জাভাস্ক্রিপ্ট অবজেক্টের মতো ব্যবহার করতে দেয়।

সুতরাং নিম্নলিখিত সলিডিটি চুক্তি:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

নিম্নলিখিত JSON-এর ফলাফল হবে:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

এর মানে আপনি করতে পারেন:

- স্মার্ট কন্ট্র্যাক্টে একটি লেনদেন পাঠান এবং এর পদ্ধতি কার্যকর করুন
- EVM-এ কার্যকর করার সময় একটি পদ্ধতি কার্যকর করতে যে গ্যাস লাগবে তা অনুমান করার জন্য কল করুন
- একটি চুক্তি স্থাপন করুন
- এবং আরও...

### ইউটিলিটি ফাংশন {#utility-functions}

ইউটিলিটি ফাংশন আপনাকে সুবিধাজনক শর্টকাট দেয় যা ইথেরিয়াম দিয়ে নির্মাণকে একটু সহজ করে তোলে।

ETH মান ডিফল্টভাবে Wei-তে থাকে। ১ ETH = ১,০০০,০০০,০০০,০০০,০০০,০০০ WEI – এর মানে হল আপনি অনেক সংখ্যার সাথে কাজ করছেন! `web3.utils.toWei` আপনার জন্য ইথারকে Wei-তে রূপান্তর করে।

এবং ethers-এ এটি এইরকম দেখায়:

```js
// একটি অ্যাকাউন্টের ব্যালেন্স পান (ঠিকানা বা ENS নাম দ্বারা)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// প্রায়শই আপনাকে ব্যবহারকারীর জন্য আউটপুট ফরম্যাট করতে হবে
// যারা wei (wei-এর পরিবর্তে) ইথারে মান দেখতে পছন্দ করে
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js ইউটিলিটি ফাংশন](https://docs.web3js.org/api/web3-utils)
- [Ethers ইউটিলিটি ফাংশন](https://docs.ethers.org/v6/api/utils/)

## উপলব্ধ লাইব্রেরি {#available-libraries}

**Web3.js -** **_ইথেরিয়াম জাভাস্ক্রিপ্ট API।_**

- [ডকুমেন্টেশন](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_জাভাস্ক্রিপ্ট এবং টাইপস্ক্রিপ্টে সম্পূর্ণ ইথেরিয়াম ওয়ালেট প্রয়োগ এবং ইউটিলিটি।_**

- [Ethers.js হোম](https://ethers.org/)
- [ডকুমেন্টেশন](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_ইথেরিয়াম এবং IPFS ডেটা ইন্ডেক্স করার এবং GraphQL ব্যবহার করে এটি জিজ্ঞাসা করার জন্য একটি প্রোটোকল।_**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [ডকুমেন্টেশন](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_উন্নত এপিআই সহ Ethers.js এর চারপাশে র‍্যাপার।_**

- [ডকুমেন্টেশন](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_ইথেরিয়াম-এর জন্য টাইপস্ক্রিপ্ট ইন্টারফেস।_**

- [ডকুমেন্টেশন](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_অন্তর্নির্মিত ক্যাশিং, হুক এবং পরীক্ষা মক সহ টাইপস্ক্রিপ্ট মেটা-লাইব্রেরি।_**

- [ডকুমেন্টেশন](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## আরও পড়ুন {#further-reading}

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয় {#related-topics}

- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [জাভাস্ক্রিপ্টে Ethereum ব্লকচেইন ব্যবহার করতে Web3js সেট আপ করুন](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– আপনার প্রোজেক্টে web3.js সেট আপ করার জন্য নির্দেশাবলী।_
- [জাভাস্ক্রিপ্ট থেকে একটি স্মার্ট কন্ট্র্যাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI টোকেন ব্যবহার করে দেখুন, জাভাস্ক্রিপ্ট ব্যবহার করে কীভাবে কন্ট্র্যাক্ট ফাংশন কল করতে হয়।_
- [web3 এবং Alchemy ব্যবহার করে লেনদেন পাঠানো](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– ব্যাকএন্ড থেকে লেনদেন পাঠানোর জন্য ধাপে ধাপে ওয়াকথ্রু।_
