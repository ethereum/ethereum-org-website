---
title: JavaScript API লাইব্রেরি
description: JavaScript ক্লায়েন্ট লাইব্রেরির একটি পরিচিতি যা আপনাকে আপনার অ্যাপ্লিকেশন থেকে ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে দেয়।
lang: bn
---

একটি ওয়েব অ্যাপকে ইথেরিয়াম ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে (অর্থাৎ, ব্লকচেইন ডেটা পড়তে এবং/অথবা নেটওয়ার্কে ট্রানজ্যাকশন পাঠাতে) হলে, এটিকে অবশ্যই একটি ইথেরিয়াম নোডের সাথে কানেক্ট করতে হবে।

এই উদ্দেশ্যে, প্রতিটি ইথেরিয়াম ক্লায়েন্ট [জেসন-আরপিসি](/developers/docs/apis/json-rpc/) স্পেসিফিকেশন প্রয়োগ করে, তাই অ্যাপ্লিকেশনগুলি নির্ভর করতে পারে এমন একটি অভিন্ন [মেথড](/developers/docs/apis/json-rpc/#json-rpc-methods) সেট রয়েছে।

আপনি যদি একটি ইথেরিয়াম নোডের সাথে কানেক্ট করতে JavaScript ব্যবহার করতে চান, তবে ভ্যানিলা JavaScript ব্যবহার করা সম্ভব, কিন্তু ইকোসিস্টেমের মধ্যে বেশ কয়েকটি সুবিধাজনক লাইব্রেরি রয়েছে যা এটিকে অনেক সহজ করে তোলে। এই লাইব্রেরিগুলির সাহায্যে, ডেভেলপাররা ইথেরিয়ামের সাথে ইন্টারঅ্যাক্ট করে এমন জেসন-আরপিসি রিকোয়েস্ট (অভ্যন্তরীণভাবে) ইনিশিয়ালাইজ করার জন্য সহজ, এক-লাইনের মেথড লিখতে পারেন।

অনুগ্রহ করে মনে রাখবেন যে [দ্য মার্জ](/roadmap/merge/)-এর পর থেকে, একটি নোড চালানোর জন্য ইথেরিয়াম সফ্টওয়্যারের দুটি সংযুক্ত অংশ - একটি এক্সিকিউশন ক্লায়েন্ট এবং একটি কনসেনসাস ক্লায়েন্ট - প্রয়োজন। অনুগ্রহ করে নিশ্চিত করুন যে আপনার নোডে একটি এক্সিকিউশন এবং কনসেনসাস ক্লায়েন্ট উভয়ই অন্তর্ভুক্ত রয়েছে। যদি আপনার নোডটি আপনার লোকাল মেশিনে না থাকে (যেমন, আপনার নোডটি একটি AWS ইনস্ট্যান্সে চলছে) তবে টিউটোরিয়ালে সেই অনুযায়ী IP ঠিকানাগুলি আপডেট করুন। আরও তথ্যের জন্য অনুগ্রহ করে [একটি নোড চালানো](/developers/docs/nodes-and-clients/run-a-node/) সম্পর্কিত আমাদের পেজটি দেখুন।

## পূর্বশর্ত {#prerequisites}

JavaScript বোঝার পাশাপাশি, [ইথেরিয়াম স্ট্যাক](/developers/docs/ethereum-stack/) এবং [ইথেরিয়াম ক্লায়েন্ট](/developers/docs/nodes-and-clients/) সম্পর্কে বোঝাও সহায়ক হতে পারে।

## কেন একটি লাইব্রেরি ব্যবহার করবেন? {#why-use-a-library}

এই লাইব্রেরিগুলি সরাসরি একটি ইথেরিয়াম নোডের সাথে ইন্টারঅ্যাক্ট করার বেশিরভাগ জটিলতা দূর করে। এগুলি ইউটিলিটি ফাংশনও প্রদান করে (যেমন, ETH-কে Gwei-তে রূপান্তর করা) যাতে একজন ডেভেলপার হিসেবে আপনি ইথেরিয়াম ক্লায়েন্টগুলির জটিলতাগুলি নিয়ে কম সময় ব্যয় করতে পারেন এবং আপনার অ্যাপ্লিকেশনের অনন্য কার্যকারিতার উপর বেশি সময় ফোকাস করতে পারেন।

## লাইব্রেরির বৈশিষ্ট্য {#library-features}

### ইথেরিয়াম নোডের সাথে কানেক্ট করা {#connect-to-ethereum-nodes}

প্রোভাইডার ব্যবহার করে, এই লাইব্রেরিগুলি আপনাকে ইথেরিয়ামের সাথে কানেক্ট করতে এবং এর ডেটা পড়তে দেয়, তা জেসন-আরপিসি, Infura, Etherscan, Alchemy বা মেটামাস্ক-এর মাধ্যমেই হোক না কেন।

> **সতর্কতা:** Web3.js 4 মার্চ, 2025-এ আর্কাইভ করা হয়েছিল। [ঘোষণাটি পড়ুন](https://blog.chainsafe.io/web3-js-sunset/)। নতুন প্রজেক্টের জন্য [ethers.js](https://ethers.অথবাg) বা [viem](https://viem.sh)-এর মতো বিকল্প লাইব্রেরিগুলি ব্যবহার করার কথা বিবেচনা করুন।

**Ethers-এর উদাহরণ**

```js
// একটি BrowserProvider একটি স্ট্যান্ডার্ড Web3 প্রোভাইডারকে র‍্যাপ করে, যা হলো
// মেটামাস্ক প্রতিটি পেজে window.ethereum হিসেবে যা ইনজেক্ট করে
const provider = new ethers.BrowserProvider(window.ethereum)

// মেটামাস্ক প্লাগইন ট্রানজ্যাকশন সাইন করারও অনুমতি দেয় যাতে
// ইথার পাঠানো যায় এবং ব্লকচেইন এর মধ্যে স্টেট পরিবর্তন করার জন্য পে করা যায়।
// এর জন্য, আমাদের অ্যাকাউন্ট সাইনার প্রয়োজন...
const signer = provider.getSigner()
```

**Web3js-এর উদাহরণ**

```js
var web3 = new Web3("http://localhost:8545")
// অথবা
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// প্রোভাইডার পরিবর্তন করুন
web3.setProvider("ws://localhost:8546")
// অথবা
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js এ IPC প্রোভাইডার ব্যবহার করা
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os পাথ
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os পাথ
// উইন্ডোজ এ পাথ হলো: "\\\\.\\pipe\\geth.ipc"
// লিনাক্স এ পাথ হলো: "/users/myuser/.ethereum/geth.ipc"
```

একবার সেট আপ হয়ে গেলে আপনি ব্লকচেইনে নিম্নলিখিত বিষয়গুলির জন্য কোয়েরি করতে পারবেন:

- ব্লক নম্বর
- গ্যাস এস্টিমেট
- স্মার্ট কন্ট্রাক্ট ইভেন্ট
- নেটওয়ার্ক আইডি
- এবং আরও অনেক কিছু...

### ওয়ালেট কার্যকারিতা {#wallet-functionality}

এই লাইব্রেরিগুলি আপনাকে ওয়ালেট তৈরি করতে, কী (key) পরিচালনা করতে এবং ট্রানজ্যাকশন সাইন করার কার্যকারিতা দেয়।

এখানে Ethers থেকে একটি উদাহরণ দেওয়া হলো

```js
// একটি নেমোনিক থেকে একটি ওয়ালেট ইনস্ট্যান্স তৈরি করুন...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...অথবা একটি প্রাইভেট কি থেকে
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// সাইনার API অনুযায়ী একটি Promise হিসেবে অ্যাড্রেস
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// একটি ওয়ালেট অ্যাড্রেস সিঙ্ক্রোনাসভাবেও পাওয়া যায়
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// অভ্যন্তরীণ ক্রিপ্টোগ্রাফিক উপাদানসমূহ
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// ওয়ালেট নেমোনিক
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// দ্রষ্টব্য: প্রাইভেট কি দিয়ে তৈরি করা একটি ওয়ালেট এর
//       কোনো নেমোনিক থাকে না (ডেরিভেশন এটি প্রতিরোধ করে)
walletPrivateKey.mnemonic
// null

// একটি মেসেজ সাইন করা
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// একটি ট্রানজ্যাকশন সাইন করা
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect মেথডটি এর একটি নতুন ইনস্ট্যান্স রিটার্ন করে
// একটি প্রোভাইডারের সাথে কানেক্ট করা ওয়ালেট
wallet = walletMnemonic.connect(provider)

// নেটওয়ার্ক কোয়েরি করা
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// ইথার পাঠানো
wallet.sendTransaction(tx)
```

[সম্পূর্ণ ডক্স পড়ুন](https://docs.ethers.io/v5/api/signer/#Wallet)

একবার সেট আপ হয়ে গেলে আপনি যা করতে পারবেন:

- অ্যাকাউন্ট তৈরি করা
- ট্রানজ্যাকশন পাঠানো
- ট্রানজ্যাকশন সাইন করা
- এবং আরও অনেক কিছু...

### স্মার্ট কন্ট্রাক্ট ফাংশনের সাথে ইন্টারঅ্যাক্ট করা {#interact-with-smart-contract-functions}

JavaScript ক্লায়েন্ট লাইব্রেরিগুলি আপনার অ্যাপ্লিকেশনকে একটি কম্পাইল করা কন্ট্রাক্টের অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) পড়ে স্মার্ট কন্ট্রাক্ট ফাংশন কল করার অনুমতি দেয়।

ABI মূলত একটি JSON ফর্ম্যাটে কন্ট্রাক্টের ফাংশনগুলি ব্যাখ্যা করে এবং আপনাকে এটিকে একটি সাধারণ JavaScript অবজেক্টের মতো ব্যবহার করতে দেয়।

সুতরাং নিম্নলিখিত Solidity কন্ট্রাক্ট:

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

এর ফলে নিম্নলিখিত JSON তৈরি হবে:

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

এর মানে হলো আপনি করতে পারেন:

- স্মার্ট কন্ট্রাক্টে একটি ট্রানজ্যাকশন পাঠাতে এবং এর মেথড এক্সিকিউট করতে
- EVM-এ এক্সিকিউট করার সময় একটি মেথড এক্সিকিউশনে কত গ্যাস লাগবে তা অনুমান করার জন্য কল করতে
- একটি কন্ট্রাক্ট ডিপ্লয় করতে
- এবং আরও অনেক কিছু...

### ইউটিলিটি ফাংশন {#utility-functions}

ইউটিলিটি ফাংশনগুলি আপনাকে সুবিধাজনক শর্টকাট দেয় যা ইথেরিয়ামের সাথে তৈরি করাকে কিছুটা সহজ করে তোলে।

ETH মানগুলি ডিফল্টরূপে Wei-তে থাকে। 1 ETH = 1,000,000,000,000,000,000 WEI – এর মানে হলো আপনি অনেক বড় সংখ্যার সাথে কাজ করছেন! `web3.utils.toWei` আপনার জন্য ইথারকে Wei-তে রূপান্তর করে।

এবং ethers-এ এটি দেখতে এইরকম:

```js
// একটি অ্যাকাউন্টের ব্যালেন্স পান (অ্যাড্রেস বা ENS নাম দ্বারা)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// প্রায়শই আপনাকে ব্যবহারকারীর জন্য আউটপুট ফরম্যাট করতে হবে
// যারা (Wei এর পরিবর্তে) ইথারে ভ্যালু দেখতে পছন্দ করে
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js ইউটিলিটি ফাংশন](https://docs.web3js.org/api/web3-utils)
- [Ethers ইউটিলিটি ফাংশন](https://docs.ethers.org/v6/api/utils/)

## উপলব্ধ লাইব্রেরি {#available-libraries}

**Web3.js -** **_ইথেরিয়াম JavaScript API._**

- [ডকুমেন্টেশন](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript এবং TypeScript-এ সম্পূর্ণ ইথেরিয়াম ওয়ালেট ইমপ্লিমেন্টেশন এবং ইউটিলিটি।_**

- [Ethers.js হোম](https://ethers.org/)
- [ডকুমেন্টেশন](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_ইথেরিয়াম এবং IPFS ডেটা ইনডেক্স করার এবং GraphQL ব্যবহার করে এটি কোয়েরি করার জন্য একটি প্রোটোকল।_**

- [The Graph](https://thegraph.com)
- [Graph এক্সপ্লোরার](https://thegraph.com/explorer)
- [ডকুমেন্টেশন](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [ডিসকর্ড](https://thegraph.com/discord)

**Alchemy SDK -** **_উন্নত API সহ Ethers.js-এর চারপাশে র‍্যাপার।_**

- [ডকুমেন্টেশন](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_ইথেরিয়ামের জন্য TypeScript ইন্টারফেস।_**

- [ডকুমেন্টেশন](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_কয়েক ডজন চেইন জুড়ে রিয়েল-টাইম, সমৃদ্ধ ব্লকচেইন ডেটা API।_**

- [ডকুমেন্টেশন](https://docs.codex.io)
- [এক্সপ্লোরার](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [ডিসকর্ড](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_বিল্ট-ইন ক্যাশিং, হুক এবং টেস্ট মক সহ TypeScript মেটা-লাইব্রেরি।_**

- [ডকুমেন্টেশন](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## আরও পড়ুন {#further-reading}

_আপনাকে সাহায্য করেছে এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন? এই পেজটি এডিট করুন এবং এটি যোগ করুন!_

## সম্পর্কিত টপিক {#related-topics}

- [নোড এবং ক্লায়েন্ট](/developers/docs/nodes-and-clients/)
- [ডেভেলপমেন্ট ফ্রেমওয়ার্ক](/developers/docs/frameworks/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [JavaScript-এ ইথেরিয়াম ব্লকচেইন ব্যবহার করতে Web3js সেট আপ করুন](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– আপনার প্রজেক্টে web3.js সেট আপ করার নির্দেশিকা।_
- [JavaScript থেকে একটি স্মার্ট কন্ট্রাক্ট কল করা](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI টোকেন ব্যবহার করে, দেখুন কীভাবে JavaScript ব্যবহার করে কন্ট্রাক্ট ফাংশন কল করতে হয়।_
- [web3 এবং Alchemy ব্যবহার করে ট্রানজ্যাকশন পাঠানো](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– ব্যাকএন্ড থেকে ট্রানজ্যাকশন পাঠানোর জন্য ধাপে ধাপে নির্দেশিকা।_

## টিউটোরিয়াল: ইথেরিয়ামে JavaScript API এবং WebSockets {#tutorials}

- [WebSockets ব্যবহার করা](/developers/tutorials/using-websockets/) _– ইথেরিয়াম ইভেন্টগুলিতে সাবস্ক্রাইব করতে এবং রিয়েল-টাইম জেসন-আরপিসি রিকোয়েস্ট করতে Alchemy-এর সাথে কীভাবে WebSockets ব্যবহার করবেন।_