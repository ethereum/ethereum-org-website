---
title: "জাভাস্ক্রিপ্ট এপিআই লাইব্রেরি"
description: "আপনার অ্যাপ্লিকেশন থেকে ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করার জন্য জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরির একটি পরিচিতি।"
lang: bn
---

একটি ওয়েব অ্যাপকে ইথিরিয়াম ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে (অর্থাৎ, ব্লকচেইন ডেটা পড়তে এবং/অথবা নেটওয়ার্ক-এ লেনদেন পাঠাতে), এটিকে অবশ্যই একটি ইথিরিয়াম নোড-এর সাথে সংযুক্ত হতে হবে।

এই উদ্দেশ্যে, প্রতিটি ইথিরিয়াম ক্লায়েন্ট [JSON-RPC](/developers/docs/apis/json-rpc/) স্পেসিফিকেশন প্রয়োগ করে, তাই অ্যাপ্লিকেশনগুলি নির্ভর করতে পারে এমন একটি অভিন্ন [পদ্ধতির](/developers/docs/apis/json-rpc/#json-rpc-methods) সেট রয়েছে।

আপনি যদি একটি ইথিরিয়াম নোড-এর সাথে সংযোগ করতে জাভাস্ক্রিপ্ট ব্যবহার করতে চান, তবে ভ্যানিলা জাভাস্ক্রিপ্ট ব্যবহার করা সম্ভব কিন্তু ইকোসিস্টেমের মধ্যে বেশ কয়েকটি সুবিধাজনক লাইব্রেরি রয়েছে যা এটিকে আরও সহজ করে তোলে। এই লাইব্রেরিগুলির সাহায্যে, ডেভেলপাররা ইথিরিয়ামের সাথে ইন্টারঅ্যাক্ট করে এমন JSON-RPC রিকোয়েস্ট (আড়ালে) শুরু করার জন্য সহজ, এক-লাইনের পদ্ধতি লিখতে পারেন।

অনুগ্রহ করে মনে রাখবেন যে [The Merge](/roadmap/merge/)-এর পর থেকে, একটি নোড চালানোর জন্য ইথিরিয়াম সফ্টওয়্যারের দুটি সংযুক্ত অংশ - একটি এক্সিকিউশন ক্লায়েন্ট এবং একটি কনসেন্সাস ক্লায়েন্ট - প্রয়োজন। অনুগ্রহ করে নিশ্চিত করুন যে আপনার নোড-এ একটি এক্সিকিউশন এবং কনসেন্সাস ক্লায়েন্ট উভয়ই অন্তর্ভুক্ত রয়েছে। যদি আপনার নোড আপনার লোকাল মেশিনে না থাকে (যেমন, আপনার নোড একটি AWS ইনস্ট্যান্সে চলছে) তবে টিউটোরিয়ালে আইপি (IP) ঠিকানাগুলি সেই অনুযায়ী আপডেট করুন। আরও তথ্যের জন্য অনুগ্রহ করে [একটি নোড চালানো](/developers/docs/nodes-and-clients/run-a-node/) সম্পর্কিত আমাদের পৃষ্ঠাটি দেখুন।

## পূর্বশর্ত {#prerequisites}

জাভাস্ক্রিপ্ট বোঝার পাশাপাশি, [ইথিরিয়াম স্ট্যাক](/developers/docs/ethereum-stack/) এবং [ইথিরিয়াম ক্লায়েন্ট](/developers/docs/nodes-and-clients/) বোঝা সহায়ক হতে পারে।

## কেন একটি লাইব্রেরি ব্যবহার করবেন? {#why-use-a-library}

এই লাইব্রেরিগুলি সরাসরি একটি ইথিরিয়াম নোড-এর সাথে ইন্টারঅ্যাক্ট করার বেশিরভাগ জটিলতা দূর করে। এগুলি ইউটিলিটি ফাংশনও প্রদান করে (যেমন, ETH কে Gwei-তে রূপান্তর করা) যাতে একজন ডেভেলপার হিসেবে আপনি ইথিরিয়াম ক্লায়েন্ট-এর জটিলতাগুলি মোকাবেলা করতে কম সময় ব্যয় করতে পারেন এবং আপনার অ্যাপ্লিকেশনের অনন্য কার্যকারিতার উপর বেশি সময় ফোকাস করতে পারেন।

## লাইব্রেরির বৈশিষ্ট্য {#library-features}

### ইথিরিয়াম নোড-এর সাথে সংযোগ করুন {#connect-to-ethereum-nodes}

প্রোভাইডার ব্যবহার করে, এই লাইব্রেরিগুলি আপনাকে ইথিরিয়ামের সাথে সংযোগ করতে এবং এর ডেটা পড়তে দেয়, তা JSON-RPC, INFURA, Etherscan, Alchemy বা MetaMask-এর মাধ্যমেই হোক না কেন।

> **সতর্কতা:** Web3.js 4 মার্চ, 2025-এ আর্কাইভ করা হয়েছিল। [ঘোষণাটি পড়ুন](https://blog.chainsafe.io/web3-js-sunset/)। নতুন প্রজেক্টের জন্য [ethers.js](https://ethers.org) বা [viem](https://viem.sh)-এর মতো বিকল্প লাইব্রেরি ব্যবহার করার কথা বিবেচনা করুন।

**Ethers উদাহরণ**

```js
// একটি BrowserProvider একটি স্ট্যান্ডার্ড Web3 প্রোভাইডারকে র‍্যাপ করে, যা
// মেটামাস্ক প্রতিটি পেজে window.ethereum হিসেবে ইনজেক্ট করে
const provider = new ethers.BrowserProvider(window.ethereum)

// মেটামাস্ক প্লাগইন ট্রানজ্যাকশন সাইন করারও অনুমতি দেয় যাতে
// ইথার পাঠানো যায় এবং ব্লকচেইনের মধ্যে স্টেট পরিবর্তন করার জন্য পে করা যায়।
// এর জন্য, আমাদের অ্যাকাউন্ট সাইনার প্রয়োজন...
const signer = provider.getSigner()
```

**Web3js উদাহরণ**

```js
var web3 = new Web3("http://localhost:8545")
// অথবা
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// প্রোভাইডার পরিবর্তন করুন
web3.setProvider("ws://localhost:8546")
// অথবা
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js-এ IPC প্রোভাইডার ব্যবহার করা হচ্ছে
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os পাথ
// অথবা
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os পাথ
// উইন্ডোজে পাথটি হলো: "\\\\.\\pipe\\geth.ipc"
// লিনাক্সে পাথটি হলো: "/users/myuser/.ethereum/geth.ipc"
```

একবার সেট আপ হয়ে গেলে আপনি ব্লকচেইন-এ নিম্নলিখিত বিষয়গুলির জন্য কোয়েরি করতে পারবেন:

- ব্লক নম্বর
- গ্যাস অনুমান
- স্মার্ট কন্ট্রাক্ট ইভেন্ট
- নেটওয়ার্ক আইডি
- এবং আরও অনেক কিছু...

### ওয়ালেট কার্যকারিতা {#wallet-functionality}

এই লাইব্রেরিগুলি আপনাকে ওয়ালেট তৈরি করতে, কী (keys) পরিচালনা করতে এবং লেনদেন সাইন করতে কার্যকারিতা দেয়।

এখানে Ethers থেকে একটি উদাহরণ দেওয়া হলো

```js
// একটি নেমোনিক থেকে একটি ওয়ালেট ইনস্ট্যান্স তৈরি করুন...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...অথবা একটি প্রাইভেট কি থেকে
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API অনুযায়ী Promise হিসেবে অ্যাড্রেস
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// একটি ওয়ালেট অ্যাড্রেস সিঙ্ক্রোনাসভাবেও পাওয়া যায়
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// অভ্যন্তরীণ ক্রিপ্টোগ্রাফিক উপাদানসমূহ
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// ওয়ালেট নেমোনিক
walletMnemonic.mnemonic
// {
// locale: 'en',
// path: 'm/44\'/60\'/0\'/0/0',
// phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// দ্রষ্টব্য: প্রাইভেট কি দিয়ে তৈরি করা একটি ওয়ালেট-এ
// কোনো নেমোনিক থাকে না (ডেরিভেশন এটি প্রতিরোধ করে)
walletPrivateKey.mnemonic
// null

// একটি মেসেজ সাইন করা হচ্ছে
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// একটি ট্রানজ্যাকশন সাইন করা হচ্ছে
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect মেথডটি একটি নতুন ইনস্ট্যান্স রিটার্ন করে যা
// একটি প্রোভাইডারের সাথে সংযুক্ত ওয়ালেট
wallet = walletMnemonic.connect(provider)

// নেটওয়ার্কে কোয়েরি করা হচ্ছে
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ইথার পাঠানো হচ্ছে
wallet.sendTransaction(tx)
```

[সম্পূর্ণ ডক্স পড়ুন](https://docs.ethers.io/v5/api/signer/#Wallet)

একবার সেট আপ হয়ে গেলে আপনি সক্ষম হবেন:

- একাউন্ট তৈরি করতে
- লেনদেন পাঠাতে
- লেনদেন সাইন করতে
- এবং আরও অনেক কিছু...

### স্মার্ট কন্ট্রাক্ট ফাংশনগুলির সাথে ইন্টারঅ্যাক্ট করুন {#interact-with-smart-contract-functions}

জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরিগুলি আপনার অ্যাপ্লিকেশনকে একটি সংকলিত চুক্তির অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) পড়ে স্মার্ট কন্ট্রাক্ট ফাংশন কল করার অনুমতি দেয়।

ABI মূলত JSON ফর্ম্যাটে চুক্তির ফাংশনগুলি ব্যাখ্যা করে এবং আপনাকে এটিকে একটি সাধারণ জাভাস্ক্রিপ্ট অবজেক্টের মতো ব্যবহার করতে দেয়।

সুতরাং নিম্নলিখিত Solidity চুক্তিটি:

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

এর মানে আপনি পারেন:

- স্মার্ট কন্ট্রাক্ট-এ একটি লেনদেন পাঠাতে এবং এর পদ্ধতি কার্যকর করতে
- ইথিরিয়াম ভার্চুয়াল মেশিন-এ কার্যকর করার সময় একটি পদ্ধতি কার্যকর করতে কত গ্যাস লাগবে তা অনুমান করতে কল করতে
- একটি চুক্তি স্থাপন (Deploy) করতে
- এবং আরও অনেক কিছু...

### ইউটিলিটি ফাংশন {#utility-functions}

ইউটিলিটি ফাংশনগুলি আপনাকে সুবিধাজনক শর্টকাট দেয় যা ইথিরিয়ামের সাথে তৈরি করাকে কিছুটা সহজ করে তোলে।

ডিফল্টরূপে ETH মানগুলি Wei-তে থাকে। 1 ETH = 1,000,000,000,000,000,000 WEI – এর মানে আপনি অনেক সংখ্যার সাথে কাজ করছেন! `web3.utils.toWei` আপনার জন্য ইথারকে Wei-তে রূপান্তর করে।

এবং ethers-এ এটি দেখতে এইরকম:

```js
// একটি অ্যাকাউন্টের ব্যালেন্স পান (অ্যাড্রেস বা ENS নাম দ্বারা)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// প্রায়শই আপনাকে ব্যবহারকারীর জন্য আউটপুট ফরম্যাট করতে হবে
// যারা (wei-এর পরিবর্তে) ইথারে ভ্যালু দেখতে পছন্দ করে
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js ইউটিলিটি ফাংশন](https://docs.web3js.org/api/web3-utils)
- [Ethers ইউটিলিটি ফাংশন](https://docs.ethers.org/v6/api/utils/)

## উপলব্ধ লাইব্রেরি {#available-libraries}

**Web3.js -** **_ইথিরিয়াম জাভাস্ক্রিপ্ট এপিআই (API)।_**

- [ডকুমেন্টেশন](https://docs.web3js.org)
- [গিটহাব (GitHub)](https://github.com/ethereum/web3.js)

**Ethers.js -** **_জাভাস্ক্রিপ্ট এবং টাইপস্ক্রিপ্টে সম্পূর্ণ ইথিরিয়াম ওয়ালেট বাস্তবায়ন এবং ইউটিলিটি।_**

- [Ethers.js হোম](https://ethers.org/)
- [ডকুমেন্টেশন](https://docs.ethers.io)
- [গিটহাব (GitHub)](https://github.com/ethers-io/ethers.js)

**The Graph -** **_ইথিরিয়াম এবং IPFS ডেটা ইনডেক্স করার এবং GraphQL ব্যবহার করে এটি কোয়েরি করার জন্য একটি প্রটোকল।_**

- [The Graph](https://thegraph.com)
- [Graph এক্সপ্লোরার](https://thegraph.com/explorer)
- [ডকুমেন্টেশন](https://thegraph.com/docs)
- [গিটহাব (GitHub)](https://github.com/graphprotocol)
- [ডিসকর্ড (Discord)](https://thegraph.com/discord)

**Alchemy SDK -** **_উন্নত এপিআই (API) সহ Ethers.js-এর চারপাশে র‍্যাপার।_**

- [ডকুমেন্টেশন](https://www.alchemy.com/docs)
- [গিটহাব (GitHub)](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_ইথিরিয়ামের জন্য টাইপস্ক্রিপ্ট ইন্টারফেস।_**

- [ডকুমেন্টেশন](https://viem.sh)
- [গিটহাব (GitHub)](https://github.com/wagmi-dev/viem)

**Codex -** **_কয়েক ডজন চেইন জুড়ে রিয়েল-টাইম, সমৃদ্ধ ব্লকচেইন ডেটা এপিআই (API)।_**

- [ডকুমেন্টেশন](https://docs.codex.io)
- [এক্সপ্লোরার](https://docs.codex.io/explore)
- [গিটহাব (GitHub)](https://github.com/Codex-Data)
- [ডিসকর্ড (Discord)](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_বিল্ট-ইন ক্যাশিং, হুক এবং টেস্ট মক সহ টাইপস্ক্রিপ্ট মেটা-লাইব্রেরি।_**

- [ডকুমেন্টেশন](https://ryangoree.github.io/drift/)
- [গিটহাব (GitHub)](https://github.com/ryangoree/drift/)

## আরও পড়ুন {#further-reading}

_আপনাকে সাহায্য করেছে এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## সম্পর্কিত বিষয় {#related-topics}

- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [জাভাস্ক্রিপ্টে ইথিরিয়াম ব্লকচেইন ব্যবহার করতে Web3js সেট আপ করুন](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– আপনার প্রজেক্টে web3.js সেট আপ করার জন্য নির্দেশাবলী।_
- [জাভাস্ক্রিপ্ট থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI টোকেন ব্যবহার করে, জাভাস্ক্রিপ্ট ব্যবহার করে কীভাবে চুক্তির ফাংশন কল করতে হয় তা দেখুন।_
- [web3 এবং Alchemy ব্যবহার করে লেনদেন পাঠানো](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– ব্যাকএন্ড থেকে লেনদেন পাঠানোর জন্য ধাপে ধাপে ওয়াকথ্রু।_

## টিউটোরিয়াল: ইথিরিয়ামে জাভাস্ক্রিপ্ট এপিআই (API) এবং ওয়েবসকেট (WebSockets) {#tutorials}

- [ওয়েবসকেট (WebSockets) ব্যবহার করা](/developers/tutorials/using-websockets/) _– ইথিরিয়াম ইভেন্টগুলিতে সাবস্ক্রাইব করতে এবং রিয়েল-টাইম JSON-RPC রিকোয়েস্ট করতে Alchemy-এর সাথে ওয়েবসকেট কীভাবে ব্যবহার করবেন।_