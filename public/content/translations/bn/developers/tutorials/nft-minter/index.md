---
title: "NFT মিন্টার টিউটোরিয়াল"
description: "এই টিউটোরিয়ালে, আপনি একটি NFT মিন্টার তৈরি করবেন এবং MetaMask ও Web3 টুল ব্যবহার করে আপনার স্মার্ট কন্ট্রাক্টকে একটি React ফ্রন্টএন্ডের সাথে সংযুক্ত করে কীভাবে একটি ফুল স্ট্যাক ডিএ্যাপ তৈরি করতে হয় তা শিখবেন।"
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "স্মার্ট কন্ট্রাক্ট", "ফ্রন্টএন্ড", "Pinata", "ERC-721"]
skill: intermediate
breadcrumb: "NFT মিন্টার ডিএ্যাপ"
lang: bn
published: 2021-10-06
---

Web2 ব্যাকগ্রাউন্ড থেকে আসা ডেভেলপারদের জন্য অন্যতম বড় চ্যালেঞ্জ হলো কীভাবে আপনার স্মার্ট কন্ট্রাক্টকে একটি ফ্রন্টএন্ড প্রজেক্টের সাথে সংযুক্ত করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয় তা বের করা।

একটি NFT মিন্টার তৈরি করার মাধ্যমে — একটি সাধারণ UI যেখানে আপনি আপনার ডিজিটাল অ্যাসেটের লিংক, একটি শিরোনাম এবং একটি বিবরণ ইনপুট করতে পারবেন — আপনি শিখবেন কীভাবে:

- আপনার ফ্রন্টএন্ড প্রজেক্টের মাধ্যমে MetaMask-এ সংযুক্ত হতে হয়
- আপনার ফ্রন্টএন্ড থেকে স্মার্ট কন্ট্রাক্ট মেথড কল করতে হয়
- MetaMask ব্যবহার করে লেনদেন সাইন করতে হয়

এই টিউটোরিয়ালে, আমরা আমাদের ফ্রন্টএন্ড ফ্রেমওয়ার্ক হিসেবে [React](https://react.dev/) ব্যবহার করব। যেহেতু এই টিউটোরিয়ালটি মূলত ওয়েব3 (Web3) ডেভেলপমেন্টের ওপর নিবদ্ধ, তাই আমরা React-এর মৌলিক বিষয়গুলো ব্যাখ্যা করতে খুব বেশি সময় ব্যয় করব না। এর পরিবর্তে, আমরা আমাদের প্রজেক্টে কার্যকারিতা আনার দিকে মনোযোগ দেব।

পূর্বশর্ত হিসেবে, আপনার React সম্পর্কে প্রাথমিক স্তরের ধারণা থাকা উচিত—কম্পোনেন্ট, প্রপস, useState/useEffect এবং বেসিক ফাংশন কলিং কীভাবে কাজ করে তা জানা উচিত। আপনি যদি আগে কখনো এই শব্দগুলো না শুনে থাকেন, তবে আপনি এই [Intro to React tutorial](https://react.dev/learn/tutorial-tic-tac-toe) দেখতে পারেন। যারা ভিজ্যুয়ালি শিখতে বেশি পছন্দ করেন, তাদের জন্য আমরা Net Ninja-এর এই চমৎকার [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) ভিডিও সিরিজটি দেখার জন্য জোরালোভাবে সুপারিশ করছি।

আর যদি আপনি ইতিমধ্যে তা না করে থাকেন, তবে এই টিউটোরিয়ালটি সম্পন্ন করতে এবং ব্লকচেইন-এ যেকোনো কিছু তৈরি করতে আপনার অবশ্যই একটি Alchemy একাউন্ট প্রয়োজন হবে। [এখানে](https://alchemy.com/) একটি ফ্রি একাউন্ট তৈরি করুন।

আর কথা না বাড়িয়ে, চলুন শুরু করা যাক!

## NFT তৈরি করা 101 {#making-nfts-101}

আমরা কোনো কোড দেখার আগে, একটি NFT তৈরি করা কীভাবে কাজ করে তা বোঝা গুরুত্বপূর্ণ। এর দুটি ধাপ রয়েছে:

### ইথিরিয়াম ব্লকচেইন-এ একটি NFT স্মার্ট কন্ট্রাক্ট পাবলিশ করা {#publish-nft}

দুটি NFT স্মার্ট কন্ট্রাক্ট স্ট্যান্ডার্ডের মধ্যে সবচেয়ে বড় পার্থক্য হলো ERC-1155 একটি মাল্টি-টোকেন স্ট্যান্ডার্ড এবং এতে ব্যাচ কার্যকারিতা অন্তর্ভুক্ত রয়েছে, যেখানে ERC-721 একটি সিঙ্গেল-টোকেন স্ট্যান্ডার্ড এবং তাই এটি একবারে কেবল একটি টোকেন ট্রান্সফার সমর্থন করে।

### মিন্টিং ফাংশন কল করা {#minting-function}

সাধারণত, এই মিন্টিং ফাংশনে প্যারামিটার হিসেবে দুটি ভেরিয়েবল পাস করতে হয়, প্রথমটি হলো `recipient`, যা সেই এডড্রেস নির্দিষ্ট করে যা আপনার নতুন মিন্ট করা NFT গ্রহণ করবে, এবং দ্বিতীয়টি হলো NFT-এর `tokenURI`, একটি স্ট্রিং যা NFT-এর মেটাডাটা বর্ণনা করে এমন একটি JSON ডকুমেন্টে রিজলভ হয়।

একটি NFT-এর মেটাডাটাই মূলত এটিকে জীবন্ত করে তোলে, যার ফলে এর নাম, বিবরণ, ছবি (বা ভিন্ন ডিজিটাল অ্যাসেট) এবং অন্যান্য বৈশিষ্ট্যের মতো প্রপার্টি থাকতে পারে। এখানে [একটি tokenURI-এর উদাহরণ](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2) দেওয়া হলো, যাতে একটি NFT-এর মেটাডাটা রয়েছে।

এই টিউটোরিয়ালে, আমরা ২য় অংশের ওপর ফোকাস করব, আমাদের React UI ব্যবহার করে একটি বিদ্যমান NFT-এর স্মার্ট কন্ট্রাক্ট মিন্টিং ফাংশন কল করা।

এই টিউটোরিয়ালে আমরা যে ERC-721 NFT স্মার্ট কন্ট্রাক্টটি কল করব তার [একটি লিংক এখানে দেওয়া হলো](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)। আপনি যদি জানতে চান আমরা এটি কীভাবে তৈরি করেছি, তবে আমরা জোরালোভাবে সুপারিশ করছি যে আপনি আমাদের অন্য টিউটোরিয়াল, ["How to Create an NFT"](https://www.alchemy.com/docs/how-to-create-an-nft) দেখে নিন।

চমৎকার, এখন যেহেতু আমরা বুঝতে পেরেছি কীভাবে একটি NFT তৈরি করা কাজ করে, চলুন আমাদের স্টার্টার ফাইলগুলো ক্লোন করি!

## স্টার্টার ফাইলগুলো ক্লোন করুন {#clone-the-starter-files}

প্রথমে, এই প্রজেক্টের স্টার্টার ফাইলগুলো পেতে [nft-minter-tutorial GitHub রিপোজিটরিতে](https://github.com/alchemyplatform/nft-minter-tutorial) যান। এই রিপোজিটরিটি আপনার লোকাল এনভায়রনমেন্টে ক্লোন করুন।

আপনি যখন এই ক্লোন করা `nft-minter-tutorial` রিপোজিটরিটি খুলবেন, তখন আপনি দেখতে পাবেন যে এতে দুটি ফোল্ডার রয়েছে: `minter-starter-files` এবং `nft-minter`।

- `minter-starter-files`-এ এই প্রজেক্টের স্টার্টার ফাইলগুলো (মূলত React UI) রয়েছে। এই টিউটোরিয়ালে, **আমরা এই ডিরেক্টরিতে কাজ করব**, কারণ আপনি শিখবেন কীভাবে এই UI-কে আপনার ইথিরিয়াম ওয়ালেট এবং একটি NFT স্মার্ট কন্ট্রাক্ট-এর সাথে সংযুক্ত করে জীবন্ত করে তুলতে হয়।
- `nft-minter`-এ সম্পূর্ণ টিউটোরিয়ালটি রয়েছে এবং এটি আপনার জন্য একটি **রেফারেন্স** হিসেবে দেওয়া হয়েছে **যদি আপনি কোথাও আটকে যান।**

এরপর, আপনার কোড এডিটরে `minter-starter-files`-এর কপিটি খুলুন এবং তারপর আপনার `src` ফোল্ডারে নেভিগেট করুন।

আমরা যে কোডগুলো লিখব তার সবই `src` ফোল্ডারের অধীনে থাকবে। আমরা `Minter.js` কম্পোনেন্টটি এডিট করব এবং আমাদের প্রজেক্টে ওয়েব3 (Web3) কার্যকারিতা দেওয়ার জন্য অতিরিক্ত জাভাস্ক্রিপ্ট ফাইল লিখব।

## ধাপ 2: আমাদের স্টার্টার ফাইলগুলো দেখে নিন {#step-2-check-out-our-starter-files}

কোডিং শুরু করার আগে, স্টার্টার ফাইলগুলোতে আমাদের জন্য ইতিমধ্যে কী দেওয়া আছে তা দেখে নেওয়া গুরুত্বপূর্ণ।

### আপনার react প্রজেক্টটি চালু করুন {#get-your-react-project-running}

চলুন আমাদের ব্রাউজারে React প্রজেক্টটি রান করার মাধ্যমে শুরু করি। React-এর সৌন্দর্য হলো একবার আমাদের প্রজেক্ট ব্রাউজারে রান করলে, আমরা যে পরিবর্তনগুলো সেভ করব তা ব্রাউজারে লাইভ আপডেট হবে।

প্রজেক্টটি রান করতে, `minter-starter-files` ফোল্ডারের রুট ডিরেক্টরিতে নেভিগেট করুন এবং প্রজেক্টের ডিপেন্ডেন্সিগুলো ইনস্টল করতে আপনার টার্মিনালে `npm install` রান করুন:

```bash
cd minter-starter-files
npm install
```

সেগুলো ইনস্টল হওয়া শেষ হলে, আপনার টার্মিনালে `npm start` রান করুন:

```bash
npm start
```

এটি করার ফলে আপনার ব্রাউজারে http://localhost:3000/ খুলবে, যেখানে আপনি আমাদের প্রজেক্টের ফ্রন্টএন্ড দেখতে পাবেন। এতে 3টি ফিল্ড থাকা উচিত: আপনার NFT-এর অ্যাসেটের লিংক ইনপুট করার জায়গা, আপনার NFT-এর নাম এন্টার করার জায়গা এবং একটি বিবরণ দেওয়ার জায়গা।

আপনি যদি "Connect Wallet" বা "Mint NFT" বোতামগুলোতে ক্লিক করার চেষ্টা করেন, তবে আপনি লক্ষ্য করবেন যে সেগুলো কাজ করছে না—এর কারণ হলো আমাদের এখনও সেগুলোর কার্যকারিতা প্রোগ্রাম করতে হবে! :\)

### Minter.js কম্পোনেন্ট {#minter-js}

**নোট:** নিশ্চিত করুন যে আপনি `minter-starter-files` ফোল্ডারে আছেন এবং `nft-minter` ফোল্ডারে নেই!

চলুন আমাদের এডিটরে `src` ফোল্ডারে ফিরে যাই এবং `Minter.js` ফাইলটি খুলি। এই ফাইলের সবকিছু বোঝা আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ, কারণ এটিই সেই প্রাথমিক React কম্পোনেন্ট যা নিয়ে আমরা কাজ করব।

এই ফাইলের একেবারে ওপরে, আমাদের স্টেট (state) ভেরিয়েবলগুলো রয়েছে যা আমরা নির্দিষ্ট ইভেন্টের পরে আপডেট করব।

```javascript
// স্টেট ভেরিয়েবল
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React স্টেট ভেরিয়েবল বা স্টেট হুক সম্পর্কে কখনো শোনেননি? [এই](https://legacy.reactjs.org/docs/hooks-state.html) ডক্সগুলো দেখে নিন।

প্রতিটি ভেরিয়েবল যা উপস্থাপন করে তা নিচে দেওয়া হলো:

- `walletAddress` - একটি স্ট্রিং যা ব্যবহারকারীর ওয়ালেট এডড্রেস স্টোর করে
- `status` - একটি স্ট্রিং যাতে UI-এর নিচে প্রদর্শন করার জন্য একটি মেসেজ থাকে
- `name` - একটি স্ট্রিং যা NFT-এর নাম স্টোর করে
- `description` - একটি স্ট্রিং যা NFT-এর বিবরণ স্টোর করে
- `url` - একটি স্ট্রিং যা NFT-এর ডিজিটাল অ্যাসেটের একটি লিংক

স্টেট ভেরিয়েবলগুলোর পরে, আপনি তিনটি ইমপ্লিমেন্ট না করা ফাংশন দেখতে পাবেন: `useEffect`, `connectWalletPressed`, এবং `onMintPressed`। আপনি লক্ষ্য করবেন যে এই সমস্ত ফাংশনগুলো `async`, এর কারণ হলো আমরা এগুলোতে অ্যাসিনক্রোনাস API কল করব! তাদের নামগুলো তাদের কার্যকারিতার সাথেই সামঞ্জস্যপূর্ণ:

```javascript
useEffect(async () => {
  // TODO: ইমপ্লিমেন্ট করুন
}, [])

const connectWalletPressed = async () => {
  // TODO: ইমপ্লিমেন্ট করুন
}

const onMintPressed = async () => {
  // TODO: ইমপ্লিমেন্ট করুন
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - এটি একটি React হুক যা আপনার কম্পোনেন্ট রেন্ডার হওয়ার পরে কল করা হয়। যেহেতু এতে একটি খালি অ্যারে `[]` প্রপ পাস করা হয়েছে (লাইন 3 দেখুন), এটি কেবল কম্পোনেন্টের _প্রথম_ রেন্ডারেই কল করা হবে। এখানে আমরা আমাদের ওয়ালেট লিসেনার এবং অন্য একটি ওয়ালেট ফাংশন কল করব যাতে আমাদের UI আপডেট করে দেখানো যায় যে কোনো ওয়ালেট ইতিমধ্যে সংযুক্ত আছে কি না।
- `connectWalletPressed` - ব্যবহারকারীর MetaMask ওয়ালেটকে আমাদের ডিএ্যাপ-এর সাথে সংযুক্ত করতে এই ফাংশনটি কল করা হবে।
- `onMintPressed` - ব্যবহারকারীর NFT মিন্ট করতে এই ফাংশনটি কল করা হবে।

এই ফাইলের শেষের দিকে, আমাদের কম্পোনেন্টের UI রয়েছে। আপনি যদি এই কোডটি মনোযোগ সহকারে স্ক্যান করেন, তবে আপনি লক্ষ্য করবেন যে আমরা আমাদের `url`, `name`, এবং `description` স্টেট ভেরিয়েবলগুলো আপডেট করি যখন তাদের সংশ্লিষ্ট টেক্সট ফিল্ডের ইনপুট পরিবর্তিত হয়।

আপনি আরও দেখতে পাবেন যে `connectWalletPressed` এবং `onMintPressed` কল করা হয় যখন যথাক্রমে `mintButton` এবং `walletButton` আইডিযুক্ত বোতামগুলোতে ক্লিক করা হয়।

```javascript
// আমাদের কম্পোনেন্টের UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

অবশেষে, চলুন দেখি এই Minter কম্পোনেন্টটি কোথায় যোগ করা হয়েছে।

আপনি যদি `App.js` ফাইলে যান, যা React-এর প্রধান কম্পোনেন্ট এবং অন্যান্য সমস্ত কম্পোনেন্টের জন্য একটি কন্টেইনার হিসেবে কাজ করে, তবে আপনি দেখতে পাবেন যে আমাদের Minter কম্পোনেন্টটি 7 নম্বর লাইনে ইনজেক্ট করা হয়েছে।

**এই টিউটোরিয়ালে, আমরা কেবল `Minter.js file` এডিট করব এবং আমাদের `src` ফোল্ডারে ফাইল যোগ করব।**

এখন যেহেতু আমরা বুঝতে পেরেছি আমরা কী নিয়ে কাজ করছি, চলুন আমাদের ইথিরিয়াম ওয়ালেট সেট আপ করি!

## আপনার ইথিরিয়াম ওয়ালেট সেট আপ করুন {#set-up-your-ethereum-wallet}

ব্যবহারকারীদের আপনার স্মার্ট কন্ট্রাক্ট-এর সাথে ইন্টারঅ্যাক্ট করতে সক্ষম হওয়ার জন্য তাদের ইথিরিয়াম ওয়ালেটকে আপনার ডিএ্যাপ-এর সাথে সংযুক্ত করতে হবে।

### MetaMask ডাউনলোড করুন {#download-metamask}

এই টিউটোরিয়ালের জন্য, আমরা MetaMask ব্যবহার করব, যা ব্রাউজারে একটি ভার্চুয়াল ওয়ালেট এবং আপনার ইথিরিয়াম একাউন্ট এডড্রেস পরিচালনা করতে ব্যবহৃত হয়। ইথিরিয়ামে লেনদেন কীভাবে কাজ করে সে সম্পর্কে আপনি যদি আরও বুঝতে চান, তবে [এই পেজটি](/developers/docs/transactions/) দেখে নিন।

আপনি [এখানে](https://metamask.io/download) বিনামূল্যে একটি MetaMask একাউন্ট ডাউনলোড এবং তৈরি করতে পারেন। আপনি যখন একটি একাউন্ট তৈরি করছেন, বা আপনার যদি ইতিমধ্যে একটি একাউন্ট থাকে, তবে নিশ্চিত করুন যে আপনি ওপরের ডানদিকে “Ropsten Test Network”-এ স্যুইচ করেছেন \(যাতে আমরা আসল টাকা নিয়ে কাজ না করি\)।

### একটি ফাসেট থেকে ইথার যোগ করুন {#add-ether-from-faucet}

আমাদের NFT মিন্ট করতে (বা ইথিরিয়াম ব্লকচেইন-এ কোনো লেনদেন সাইন করতে), আমাদের কিছু ফেক Eth প্রয়োজন হবে। Eth পেতে আপনি [Ropsten ফাসেট](https://faucet.ropsten.be/)-এ যেতে পারেন এবং আপনার Ropsten একাউন্ট এডড্রেস এন্টার করতে পারেন, তারপর “Send Ropsten Eth.”-এ ক্লিক করুন। এর কিছুক্ষণ পরেই আপনার MetaMask একাউন্টে Eth দেখতে পাওয়া উচিত!

### আপনার ব্যালেন্স চেক করুন {#check-your-balance}

আমাদের ব্যালেন্স সেখানে আছে কি না তা ডাবল চেক করতে, চলুন [Alchemy-এর কম্পোজার টুল](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) ব্যবহার করে একটি [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) রিকোয়েস্ট করি। এটি আমাদের ওয়ালেটে থাকা Eth-এর পরিমাণ রিটার্ন করবে। আপনার MetaMask একাউন্ট এডড্রেস ইনপুট করার পর এবং “Send Request”-এ ক্লিক করার পর, আপনার এরকম একটি রেসপন্স দেখা উচিত:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**নোট:** এই ফলাফলটি wei-তে, eth-এ নয়। Wei ইথারের ক্ষুদ্রতম একক হিসেবে ব্যবহৃত হয়। wei থেকে eth-এ রূপান্তর হলো: 1 eth = 10¹⁸ wei। সুতরাং আমরা যদি 0xde0b6b3a7640000-কে ডেসিমালে রূপান্তর করি তবে আমরা 1\*10¹⁸ পাই যা 1 eth-এর সমান।

যাক! আমাদের ফেক টাকা সব সেখানেই আছে! <Emoji text=":money_mouth_face:" size={1} />

## আপনার UI-এর সাথে MetaMask সংযুক্ত করুন {#connect-metamask-to-your-UI}

এখন যেহেতু আমাদের MetaMask ওয়ালেট সেট আপ করা হয়েছে, চলুন আমাদের ডিএ্যাপ-কে এর সাথে সংযুক্ত করি!

যেহেতু আমরা [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) প্যারাডাইম অনুসরণ করতে চাই, তাই আমরা একটি আলাদা ফাইল তৈরি করতে যাচ্ছি যাতে আমাদের ডিএ্যাপ-এর লজিক, ডাটা এবং নিয়মগুলো পরিচালনা করার জন্য আমাদের ফাংশনগুলো থাকবে এবং তারপর সেই ফাংশনগুলোকে আমাদের ফ্রন্টএন্ডে (আমাদের Minter.js কম্পোনেন্ট) পাস করব।

### connectWallet ফাংশন {#connect-wallet-function}

এটি করার জন্য, চলুন আপনার `src` ডিরেক্টরিতে `utils` নামে একটি নতুন ফোল্ডার তৈরি করি এবং এর ভেতরে `interact.js` নামে একটি ফাইল যোগ করি, যাতে আমাদের সমস্ত ওয়ালেট এবং স্মার্ট কন্ট্রাক্ট ইন্টারঅ্যাকশন ফাংশন থাকবে।

আমাদের `interact.js` ফাইলে, আমরা একটি `connectWallet` ফাংশন লিখব, যা আমরা পরে আমাদের `Minter.js` কম্পোনেন্টে ইমপোর্ট এবং কল করব।

আপনার `interact.js` ফাইলে, নিচের কোডটি যোগ করুন

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

চলুন বিশ্লেষণ করি এই কোডটি কী করে:

প্রথমে, আমাদের ফাংশনটি চেক করে যে আপনার ব্রাউজারে `window.ethereum` এনাবল করা আছে কি না।

`window.ethereum` হলো MetaMask এবং অন্যান্য ওয়ালেট প্রোভাইডারদের দ্বারা ইনজেক্ট করা একটি গ্লোবাল API যা ওয়েবসাইটগুলোকে ব্যবহারকারীদের ইথিরিয়াম একাউন্টের জন্য রিকোয়েস্ট করার অনুমতি দেয়। অনুমোদিত হলে, এটি ব্যবহারকারী যে ব্লকচেইন-এর সাথে সংযুক্ত আছে তা থেকে ডাটা পড়তে পারে এবং ব্যবহারকারীকে মেসেজ ও লেনদেন সাইন করার পরামর্শ দিতে পারে। আরও তথ্যের জন্য [MetaMask ডক্স](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) দেখে নিন!

যদি `window.ethereum` উপস্থিত _না থাকে_, তবে এর অর্থ হলো MetaMask ইনস্টল করা নেই। এর ফলে একটি JSON অবজেক্ট রিটার্ন হয়, যেখানে রিটার্ন করা `address` হলো একটি খালি স্ট্রিং, এবং `status` JSX অবজেক্টটি জানায় যে ব্যবহারকারীকে অবশ্যই MetaMask ইনস্টল করতে হবে।

**আমরা যে ফাংশনগুলো লিখব তার বেশিরভাগই JSON অবজেক্ট রিটার্ন করবে যা আমরা আমাদের স্টেট ভেরিয়েবল এবং UI আপডেট করতে ব্যবহার করতে পারি।**

এখন যদি `window.ethereum` উপস্থিত _থাকে_, তবে তখনই বিষয়টি আকর্ষণীয় হয়ে ওঠে।

একটি try/catch লুপ ব্যবহার করে, আমরা [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) কল করার মাধ্যমে MetaMask-এর সাথে সংযুক্ত হওয়ার চেষ্টা করব। এই ফাংশনটি কল করলে ব্রাউজারে MetaMask খুলবে, যার মাধ্যমে ব্যবহারকারীকে তাদের ওয়ালেটকে আপনার ডিএ্যাপ-এর সাথে সংযুক্ত করার জন্য প্রম্পট করা হবে।

- যদি ব্যবহারকারী সংযুক্ত হওয়া বেছে নেন, তবে `method: "eth_requestAccounts"` একটি অ্যারে রিটার্ন করবে যাতে ডিএ্যাপ-এর সাথে সংযুক্ত ব্যবহারকারীর সমস্ত একাউন্ট এডড্রেস থাকবে। সব মিলিয়ে, আমাদের `connectWallet` ফাংশনটি একটি JSON অবজেক্ট রিটার্ন করবে যাতে এই অ্যারের _প্রথম_ `address` (লাইন 9 দেখুন) এবং একটি `status` মেসেজ থাকবে যা ব্যবহারকারীকে স্মার্ট কন্ট্রাক্ট-এ একটি মেসেজ লেখার জন্য প্রম্পট করে।
- যদি ব্যবহারকারী কানেকশনটি প্রত্যাখ্যান করেন, তবে JSON অবজেক্টটিতে রিটার্ন করা `address`-এর জন্য একটি খালি স্ট্রিং এবং একটি `status` মেসেজ থাকবে যা প্রতিফলিত করে যে ব্যবহারকারী কানেকশনটি প্রত্যাখ্যান করেছেন।

### আপনার Minter.js UI কম্পোনেন্টে connectWallet ফাংশন যোগ করুন {#add-connect-wallet}

এখন যেহেতু আমরা এই `connectWallet` ফাংশনটি লিখেছি, চলুন এটিকে আমাদের `Minter.js.` কম্পোনেন্টের সাথে সংযুক্ত করি।

প্রথমে, আমাদের `Minter.js` ফাইলের একেবারে ওপরে `import { connectWallet } from "./utils/interact.js";` যোগ করে আমাদের ফাংশনটিকে আমাদের `Minter.js` ফাইলে ইমপোর্ট করতে হবে। আপনার `Minter.js`-এর প্রথম 11 লাইন এখন এরকম হওয়া উচিত:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  // স্টেট ভেরিয়েবল
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

তারপর, আমাদের `connectWalletPressed` ফাংশনের ভেতরে, আমরা আমাদের ইমপোর্ট করা `connectWallet` ফাংশনটি কল করব, ঠিক এভাবে:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

লক্ষ্য করেছেন কীভাবে আমাদের বেশিরভাগ কার্যকারিতা `interact.js` ফাইল থেকে আমাদের `Minter.js` কম্পোনেন্ট থেকে অ্যাবস্ট্রাক্ট করা হয়েছে? এটি করা হয়েছে যাতে আমরা M-V-C প্যারাডাইম মেনে চলি!

`connectWalletPressed`-এ, আমরা কেবল আমাদের ইমপোর্ট করা `connectWallet` ফাংশনে একটি await কল করি এবং এর রেসপন্স ব্যবহার করে, আমরা তাদের স্টেট হুকগুলোর মাধ্যমে আমাদের `status` এবং `walletAddress` ভেরিয়েবলগুলো আপডেট করি।

এখন, চলুন `Minter.js` এবং `interact.js` উভয় ফাইল সেভ করি এবং এ পর্যন্ত আমাদের UI টেস্ট করে দেখি।

localhost:3000-এ আপনার ব্রাউজার খুলুন এবং পেজের ওপরের ডানদিকে "Connect Wallet" বোতাম টিপুন।

আপনার যদি MetaMask ইনস্টল করা থাকে, তবে আপনাকে আপনার ওয়ালেটকে আপনার ডিএ্যাপ-এর সাথে সংযুক্ত করার জন্য প্রম্পট করা হবে। সংযুক্ত হওয়ার আমন্ত্রণটি গ্রহণ করুন।

আপনার দেখা উচিত যে ওয়ালেট বোতামটি এখন প্রতিফলিত করছে যে আপনার এডড্রেস সংযুক্ত আছে।

এরপর, পেজটি রিফ্রেশ করার চেষ্টা করুন... এটি অদ্ভুত। আমাদের ওয়ালেট বোতামটি আমাদের MetaMask সংযুক্ত করার জন্য প্রম্পট করছে, যদিও এটি ইতিমধ্যে সংযুক্ত আছে...

তবে চিন্তা করবেন না! আমরা `getCurrentWalletConnected` নামের একটি ফাংশন ইমপ্লিমেন্ট করার মাধ্যমে সহজেই এটি ঠিক করতে পারি, যা চেক করবে যে কোনো এডড্রেস ইতিমধ্যে আমাদের ডিএ্যাপ-এর সাথে সংযুক্ত আছে কি না এবং সেই অনুযায়ী আমাদের UI আপডেট করবে!

### getCurrentWalletConnected ফাংশন {#get-current-wallet}

আপনার `interact.js` ফাইলে, নিচের `getCurrentWalletConnected` ফাংশনটি যোগ করুন:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

এই কোডটি আমরা একটু আগে লেখা `connectWallet` ফাংশনের _খুবই_ কাছাকাছি।

প্রধান পার্থক্য হলো `eth_requestAccounts` মেথড কল করার পরিবর্তে, যা ব্যবহারকারীর ওয়ালেট সংযুক্ত করার জন্য MetaMask খোলে, এখানে আমরা `eth_accounts` মেথড কল করি, যা কেবল বর্তমানে আমাদের ডিএ্যাপ-এর সাথে সংযুক্ত MetaMask এডড্রেসগুলো ধারণকারী একটি অ্যারে রিটার্ন করে।

এই ফাংশনটি কীভাবে কাজ করে তা দেখতে, চলুন এটিকে আমাদের `Minter.js` কম্পোনেন্টের `useEffect` ফাংশনে কল করি।

আমরা `connectWallet`-এর জন্য যেমনটি করেছিলাম, আমাদের অবশ্যই এই ফাংশনটিকে আমাদের `interact.js` ফাইল থেকে আমাদের `Minter.js` ফাইলে ইমপোর্ট করতে হবে, ঠিক এভাবে:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, // এখানে ইমপোর্ট করুন
} from "./utils/interact.js"
```

এখন, আমরা কেবল এটিকে আমাদের `useEffect` ফাংশনে কল করব:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

লক্ষ্য করুন, আমরা আমাদের `walletAddress` এবং `status` স্টেট ভেরিয়েবলগুলো আপডেট করতে `getCurrentWalletConnected`-এ আমাদের কলের রেসপন্স ব্যবহার করি।

একবার আপনি এই কোডটি যোগ করার পর, আমাদের ব্রাউজার উইন্ডোটি রিফ্রেশ করার চেষ্টা করুন। বোতামটিতে বলা উচিত যে আপনি সংযুক্ত আছেন এবং আপনার সংযুক্ত ওয়ালেটের এডড্রেস-এর একটি প্রিভিউ দেখানো উচিত - এমনকি আপনি রিফ্রেশ করার পরেও!

### addWalletListener ইমপ্লিমেন্ট করুন {#implement-add-wallet-listener}

আমাদের ডিএ্যাপ ওয়ালেট সেটআপের চূড়ান্ত ধাপ হলো ওয়ালেট লিসেনার ইমপ্লিমেন্ট করা যাতে আমাদের ওয়ালেটের স্টেট পরিবর্তিত হলে আমাদের UI আপডেট হয়, যেমন যখন ব্যবহারকারী ডিসকানেক্ট করে বা একাউন্ট স্যুইচ করে।

আপনার `Minter.js` ফাইলে, `addWalletListener` নামের একটি ফাংশন যোগ করুন যা দেখতে নিচের মতো:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

চলুন দ্রুত বিশ্লেষণ করি এখানে কী ঘটছে:

- প্রথমে, আমাদের ফাংশনটি চেক করে যে `window.ethereum` এনাবল করা আছে কি না \(অর্থাৎ, MetaMask ইনস্টল করা আছে কি না\)।
  - যদি না থাকে, তবে আমরা কেবল আমাদের `status` স্টেট ভেরিয়েবলটিকে একটি JSX স্ট্রিংয়ে সেট করি যা ব্যবহারকারীকে MetaMask ইনস্টল করার জন্য প্রম্পট করে।
  - যদি এটি এনাবল করা থাকে, তবে আমরা 3 নম্বর লাইনে লিসেনার `window.ethereum.on("accountsChanged")` সেট আপ করি যা MetaMask ওয়ালেটে স্টেট পরিবর্তনের জন্য অপেক্ষা করে, যার মধ্যে রয়েছে যখন ব্যবহারকারী ডিএ্যাপ-এ একটি অতিরিক্ত একাউন্ট সংযুক্ত করে, একাউন্ট স্যুইচ করে বা কোনো একাউন্ট ডিসকানেক্ট করে। যদি অন্তত একটি একাউন্ট সংযুক্ত থাকে, তবে `walletAddress` স্টেট ভেরিয়েবলটি লিসেনার দ্বারা রিটার্ন করা `accounts` অ্যারের প্রথম একাউন্ট হিসেবে আপডেট করা হয়। অন্যথায়, `walletAddress` একটি খালি স্ট্রিং হিসেবে সেট করা হয়।

অবশেষে, আমাদের অবশ্যই এটিকে আমাদের `useEffect` ফাংশনে কল করতে হবে:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

এবং ব্যাস! আমরা আমাদের সমস্ত ওয়ালেট কার্যকারিতা প্রোগ্রামিং সম্পন্ন করেছি! এখন যেহেতু আমাদের ওয়ালেট সেট আপ করা হয়েছে, চলুন বের করি কীভাবে আমাদের NFT মিন্ট করতে হয়!

## NFT মেটাডাটা 101 {#nft-metadata-101}

সুতরাং এই টিউটোরিয়ালের 0 ধাপে আমরা যে NFT মেটাডাটা নিয়ে কথা বলেছিলাম তা মনে করুন—এটি একটি NFT-কে জীবন্ত করে তোলে, যার ফলে এর ডিজিটাল অ্যাসেট, নাম, বিবরণ এবং অন্যান্য বৈশিষ্ট্যের মতো প্রপার্টি থাকতে পারে।

আমাদের এই মেটাডাটাকে একটি JSON অবজেক্ট হিসেবে কনফিগার করতে হবে এবং এটি স্টোর করতে হবে, যাতে আমরা আমাদের স্মার্ট কন্ট্রাক্ট-এর `mintNFT` ফাংশন কল করার সময় এটিকে `tokenURI` প্যারামিটার হিসেবে পাস করতে পারি।

"Link to Asset", "Name", "Description" ফিল্ডের টেক্সটগুলো আমাদের NFT-এর মেটাডাটার বিভিন্ন প্রপার্টি গঠন করবে। আমরা এই মেটাডাটাকে একটি JSON অবজেক্ট হিসেবে ফরম্যাট করব, তবে আমরা এই JSON অবজেক্টটি কোথায় স্টোর করতে পারি তার জন্য কয়েকটি অপশন রয়েছে:

- আমরা এটি ইথিরিয়াম ব্লকচেইন-এ স্টোর করতে পারি; তবে, এটি করা খুব ব্যয়বহুল হবে।
- আমরা এটি AWS বা Firebase-এর মতো একটি সেন্ট্রালাইজড সার্ভারে স্টোর করতে পারি। কিন্তু এটি আমাদের ডিসেন্ট্রালাইজড নীতিকে ব্যাহত করবে।
- আমরা IPFS ব্যবহার করতে পারি, যা একটি ডিস্ট্রিবিউটেড ফাইল সিস্টেমে ডাটা স্টোর এবং শেয়ার করার জন্য একটি ডিসেন্ট্রালাইজড প্রটোকল এবং পিয়ার-টু-পিয়ার নেটওয়ার্ক। যেহেতু এই প্রটোকলটি ডিসেন্ট্রালাইজড এবং ফ্রি, তাই এটি আমাদের সেরা অপশন!

IPFS-এ আমাদের মেটাডাটা স্টোর করতে, আমরা [Pinata](https://pinata.cloud/) ব্যবহার করব, যা একটি সুবিধাজনক IPFS API এবং টুলকিট। পরবর্তী ধাপে, আমরা ঠিক কীভাবে এটি করতে হয় তা ব্যাখ্যা করব!

## IPFS-এ আপনার মেটাডাটা পিন করতে Pinata ব্যবহার করুন {#use-pinata-to-pin-your-metadata-to-IPFS}

আপনার যদি [Pinata](https://pinata.cloud/) একাউন্ট না থাকে, তবে [এখানে](https://app.pinata.cloud/auth/signup) একটি ফ্রি একাউন্টের জন্য সাইন আপ করুন এবং আপনার ইমেইল ও একাউন্ট ভেরিফাই করার ধাপগুলো সম্পন্ন করুন।

### আপনার Pinata API কি তৈরি করুন {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) পেজে নেভিগেট করুন, তারপর ওপরের "New Key" বোতামটি নির্বাচন করুন, Admin উইজেটটি এনাবল হিসেবে সেট করুন এবং আপনার কি-এর নাম দিন।

এরপর আপনাকে আপনার API তথ্যসহ একটি পপআপ দেখানো হবে। এটি কোনো নিরাপদ জায়গায় রাখতে ভুলবেন না।

এখন যেহেতু আমাদের কি সেট আপ করা হয়েছে, চলুন এটিকে আমাদের প্রজেক্টে যোগ করি যাতে আমরা এটি ব্যবহার করতে পারি।

### একটি .env ফাইল তৈরি করুন {#create-a-env}

আমরা একটি এনভায়রনমেন্ট ফাইলে আমাদের Pinata কি এবং সিক্রেট নিরাপদে স্টোর করতে পারি। চলুন আপনার প্রজেক্ট ডিরেক্টরিতে [dotenv প্যাকেজ](https://www.npmjs.com/package/dotenv) ইনস্টল করি।

আপনার টার্মিনালে একটি নতুন ট্যাব খুলুন \(লোকাল হোস্ট রান করা ট্যাবটি থেকে আলাদা\) এবং নিশ্চিত করুন যে আপনি `minter-starter-files` ফোল্ডারে আছেন, তারপর আপনার টার্মিনালে নিচের কমান্ডটি রান করুন:

```text
npm install dotenv --save
```

এরপর, আপনার কমান্ড লাইনে নিচের কোডটি এন্টার করে আপনার `minter-starter-files`-এর রুট ডিরেক্টরিতে একটি `.env` ফাইল তৈরি করুন:

```javascript
vim.env
```

এটি vim \(একটি টেক্সট এডিটর\)-এ আপনার `.env` ফাইলটি পপ ওপেন করবে। এটি সেভ করতে আপনার কীবোর্ডে ক্রমানুসারে "esc" + ":" + "q" চাপুন।

এরপর, VSCode-এ, আপনার `.env` ফাইলে নেভিগেট করুন এবং এতে আপনার Pinata API কি এবং API সিক্রেট যোগ করুন, ঠিক এভাবে:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

ফাইলটি সেভ করুন, এবং তারপর আপনি IPFS-এ আপনার JSON মেটাডাটা আপলোড করার জন্য ফাংশন লেখা শুরু করতে প্রস্তুত!

### pinJSONToIPFS ইমপ্লিমেন্ট করুন {#pin-json-to-ipfs}

আমাদের জন্য সৌভাগ্যের বিষয় হলো, Pinata-এর কাছে [IPFS-এ JSON ডাটা আপলোড করার জন্য বিশেষভাবে একটি API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) এবং axios-সহ একটি সুবিধাজনক জাভাস্ক্রিপ্ট উদাহরণ রয়েছে যা আমরা সামান্য কিছু পরিবর্তন করে ব্যবহার করতে পারি।

আপনার `utils` ফোল্ডারে, চলুন `pinata.js` নামে আরেকটি ফাইল তৈরি করি এবং তারপর .env ফাইল থেকে আমাদের Pinata সিক্রেট এবং কি ইমপোর্ট করি, ঠিক এভাবে:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

এরপর, নিচের অতিরিক্ত কোডটি আপনার `pinata.js` ফাইলে পেস্ট করুন। চিন্তা করবেন না, আমরা সবকিছুর অর্থ বিশ্লেষণ করব!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  // Pinata-তে axios POST রিকোয়েস্ট করা হচ্ছে ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

তাহলে এই কোডটি ঠিক কী করে?

প্রথমে, এটি [axios](https://www.npmjs.com/package/axios) ইমপোর্ট করে, যা ব্রাউজার এবং node.js-এর জন্য একটি প্রমিস-ভিত্তিক HTTP ক্লায়েন্ট, যা আমরা Pinata-তে একটি রিকোয়েস্ট করতে ব্যবহার করব।

তারপর আমাদের অ্যাসিনক্রোনাস ফাংশন `pinJSONToIPFS` রয়েছে, যা ইনপুট হিসেবে একটি `JSONBody` এবং এর হেডারে Pinata api কি এবং সিক্রেট নেয়, এই সবকিছু তাদের `pinJSONToIPFS` API-তে একটি POST রিকোয়েস্ট করার জন্য।

- যদি এই POST রিকোয়েস্টটি সফল হয়, তবে আমাদের ফাংশনটি `success` বুলিয়ান true হিসেবে এবং `pinataUrl` যেখানে আমাদের মেটাডাটা পিন করা হয়েছিল তা সহ একটি JSON অবজেক্ট রিটার্ন করে। আমরা রিটার্ন করা এই `pinataUrl`-কে আমাদের স্মার্ট কন্ট্রাক্ট-এর মিন্ট ফাংশনে `tokenURI` ইনপুট হিসেবে ব্যবহার করব।
- যদি এই পোস্ট রিকোয়েস্টটি ব্যর্থ হয়, তবে আমাদের ফাংশনটি `success` বুলিয়ান false হিসেবে এবং একটি `message` স্ট্রিং সহ একটি JSON অবজেক্ট রিটার্ন করে যা আমাদের এরর জানায়।

আমাদের `connectWallet` ফাংশনের রিটার্ন টাইপের মতো, আমরা JSON অবজেক্ট রিটার্ন করছি যাতে আমরা আমাদের স্টেট ভেরিয়েবল এবং UI আপডেট করতে তাদের প্যারামিটারগুলো ব্যবহার করতে পারি।

## আপনার স্মার্ট কন্ট্রাক্ট লোড করুন {#load-your-smart-contract}

এখন যেহেতু আমাদের `pinJSONToIPFS` ফাংশনের মাধ্যমে IPFS-এ আমাদের NFT মেটাডাটা আপলোড করার একটি উপায় আছে, তাই আমাদের স্মার্ট কন্ট্রাক্ট-এর একটি ইনস্ট্যান্স লোড করার একটি উপায় প্রয়োজন হবে যাতে আমরা এর `mintNFT` ফাংশন কল করতে পারি।

যেমনটি আমরা আগে উল্লেখ করেছি, এই টিউটোরিয়ালে আমরা [এই বিদ্যমান NFT স্মার্ট কন্ট্রাক্টটি](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ব্যবহার করব; তবে, আপনি যদি জানতে চান আমরা এটি কীভাবে তৈরি করেছি, বা নিজে একটি তৈরি করতে চান, তবে আমরা জোরালোভাবে সুপারিশ করছি যে আপনি আমাদের অন্য টিউটোরিয়াল, ["How to Create an NFT."](https://www.alchemy.com/docs/how-to-create-an-nft) দেখে নিন।

### কন্ট্রাক্ট ABI {#contract-abi}

আপনি যদি আমাদের ফাইলগুলো মনোযোগ সহকারে পরীক্ষা করে থাকেন, তবে আপনি লক্ষ্য করবেন যে আমাদের `src` ডিরেক্টরিতে একটি `contract-abi.json` ফাইল রয়েছে। একটি কন্ট্রাক্ট কোন ফাংশনটি ইনভোক করবে তা নির্দিষ্ট করার পাশাপাশি ফাংশনটি আপনার প্রত্যাশিত ফরম্যাটে ডাটা রিটার্ন করবে তা নিশ্চিত করার জন্য একটি ABI প্রয়োজনীয়।

ইথিরিয়াম ব্লকচেইন-এর সাথে সংযুক্ত হতে এবং আমাদের স্মার্ট কন্ট্রাক্ট লোড করতে আমাদের একটি Alchemy API কি এবং Alchemy Web3 API-এরও প্রয়োজন হবে।

### আপনার Alchemy API কি তৈরি করুন {#create-alchemy-api}

আপনার যদি ইতিমধ্যে একটি Alchemy একাউন্ট না থাকে, তবে [এখানে বিনামূল্যে সাইন আপ করুন।](https://alchemy.com/?a=eth-org-nft-minter)

একবার আপনি একটি Alchemy একাউন্ট তৈরি করার পর, আপনি একটি অ্যাপ তৈরি করে একটি API কি জেনারেট করতে পারেন। এটি আমাদের Ropsten টেস্টনেট-এ রিকোয়েস্ট করার অনুমতি দেবে।

ন্যাভ বারে “Apps”-এর ওপর হোভার করে এবং “Create App”-এ ক্লিক করে আপনার Alchemy ড্যাশবোর্ডে “Create App” পেজে নেভিগেট করুন।

আপনার অ্যাপের নাম দিন, আমরা "My First NFT!" বেছে নিয়েছি, একটি সংক্ষিপ্ত বিবরণ দিন, আপনার অ্যাপ বুককিপিংয়ের জন্য ব্যবহৃত এনভায়রনমেন্টের জন্য “Staging” নির্বাচন করুন এবং আপনার নেটওয়ার্ক-এর জন্য “Ropsten” বেছে নিন।

“Create app”-এ ক্লিক করুন এবং ব্যাস! আপনার অ্যাপটি নিচের টেবিলে উপস্থিত হওয়া উচিত।

চমৎকার, এখন যেহেতু আমরা আমাদের HTTP Alchemy API URL তৈরি করেছি, এটি আপনার ক্লিপবোর্ডে কপি করুন...

…এবং তারপর চলুন এটিকে আমাদের `.env` ফাইলে যোগ করি। সব মিলিয়ে, আপনার .env ফাইলটি এরকম হওয়া উচিত:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https: // eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

এখন যেহেতু আমাদের কাছে আমাদের কন্ট্রাক্ট ABI এবং আমাদের Alchemy API কি রয়েছে, আমরা [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ব্যবহার করে আমাদের স্মার্ট কন্ট্রাক্ট লোড করতে প্রস্তুত।

### আপনার Alchemy Web3 এন্ডপয়েন্ট এবং কন্ট্রাক্ট সেট আপ করুন {#setup-alchemy-endpoint}

প্রথমে, যদি আপনার কাছে এটি ইতিমধ্যে না থাকে, তবে আপনাকে টার্মিনালে হোম ডিরেক্টরি: `nft-minter-tutorial`-এ নেভিগেট করে [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) ইনস্টল করতে হবে:

```text
cd ..
npm install @alch/alchemy-web3
```

এরপর চলুন আমাদের `interact.js` ফাইলে ফিরে যাই। ফাইলের একেবারে ওপরে, আপনার .env ফাইল থেকে আপনার Alchemy কি ইমপোর্ট করতে এবং আপনার Alchemy Web3 এন্ডপয়েন্ট সেট আপ করতে নিচের কোডটি যোগ করুন:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) হলো [Web3.js](https://docs.web3js.org/)-এর চারপাশে একটি র‍্যাপার, যা একজন ওয়েব3 (web3) ডেভেলপার হিসেবে আপনার জীবনকে সহজ করতে উন্নত API মেথড এবং অন্যান্য গুরুত্বপূর্ণ সুবিধা প্রদান করে। এটি এমনভাবে ডিজাইন করা হয়েছে যাতে ন্যূনতম কনফিগারেশনের প্রয়োজন হয়, ফলে আপনি এখনই আপনার অ্যাপে এটি ব্যবহার করা শুরু করতে পারেন!

এরপর, চলুন আমাদের ফাইলে আমাদের কন্ট্রাক্ট ABI এবং কন্ট্রাক্ট এডড্রেস যোগ করি।

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

একবার আমাদের কাছে এই দুটি জিনিস চলে এলে, আমরা আমাদের মিন্ট ফাংশন কোডিং শুরু করতে প্রস্তুত!

## mintNFT ফাংশন ইমপ্লিমেন্ট করুন {#implement-the-mintnft-function}

আপনার `interact.js` ফাইলের ভেতরে, চলুন আমাদের ফাংশন, `mintNFT` ডিফাইন করি, যা নাম অনুযায়ী আমাদের NFT মিন্ট করবে।

যেহেতু আমরা অসংখ্য অ্যাসিনক্রোনাস কল করব \(IPFS-এ আমাদের মেটাডাটা পিন করতে Pinata-তে, আমাদের স্মার্ট কন্ট্রাক্ট লোড করতে Alchemy Web3-তে এবং আমাদের লেনদেন সাইন করতে MetaMask-এ\), তাই আমাদের ফাংশনটিও অ্যাসিনক্রোনাস হবে।

আমাদের ফাংশনের তিনটি ইনপুট হবে আমাদের ডিজিটাল অ্যাসেটের `url`, `name`, এবং `description`। `connectWallet` ফাংশনের নিচে নিচের ফাংশন সিগনেচারটি যোগ করুন:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### ইনপুট এরর হ্যান্ডলিং {#input-error-handling}

স্বাভাবিকভাবেই, ফাংশনের শুরুতে কোনো ধরনের ইনপুট এরর হ্যান্ডলিং থাকাটা যৌক্তিক, যাতে আমাদের ইনপুট প্যারামিটারগুলো সঠিক না হলে আমরা এই ফাংশন থেকে বেরিয়ে আসতে পারি। আমাদের ফাংশনের ভেতরে, চলুন নিচের কোডটি যোগ করি:

```javascript
export const mintNFT = async (url, name, description) => {
  // এরর হ্যান্ডলিং
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

মূলত, যদি ইনপুট প্যারামিটারগুলোর কোনোটি একটি খালি স্ট্রিং হয়, তবে আমরা একটি JSON অবজেক্ট রিটার্ন করি যেখানে `success` বুলিয়ান false হয় এবং `status` স্ট্রিংটি জানায় যে আমাদের UI-এর সমস্ত ফিল্ড অবশ্যই সম্পূর্ণ হতে হবে।

### IPFS-এ মেটাডাটা আপলোড করুন {#upload-metadata-to-ipfs}

একবার আমরা জেনে গেলে যে আমাদের মেটাডাটা সঠিকভাবে ফরম্যাট করা হয়েছে, পরবর্তী ধাপ হলো এটিকে একটি JSON অবজেক্টে র‍্যাপ করা এবং আমাদের লেখা `pinJSONToIPFS`-এর মাধ্যমে IPFS-এ আপলোড করা!

এটি করার জন্য, প্রথমে আমাদের `interact.js` ফাইলে `pinJSONToIPFS` ফাংশনটি ইমপোর্ট করতে হবে। `interact.js`-এর একেবারে ওপরে, চলুন যোগ করি:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

মনে রাখবেন যে `pinJSONToIPFS` একটি JSON বডি নেয়। তাই এটিতে কল করার আগে, আমাদের `url`, `name`, এবং `description` প্যারামিটারগুলোকে একটি JSON অবজেক্টে ফরম্যাট করতে হবে।

চলুন `metadata` নামের একটি JSON অবজেক্ট তৈরি করতে আমাদের কোড আপডেট করি এবং তারপর এই `metadata` প্যারামিটার দিয়ে `pinJSONToIPFS`-এ একটি কল করি:

```javascript
export const mintNFT = async (url, name, description) => {
  // এরর হ্যান্ডলিং
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // মেটাডেটা তৈরি করুন
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // pinata কল করুন
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

লক্ষ্য করুন, আমরা `pinJSONToIPFS(metadata)`-এ আমাদের কলের রেসপন্স `pinataResponse` অবজেক্টে স্টোর করি। তারপর, আমরা কোনো এররের জন্য এই অবজেক্টটি পার্স করি।

যদি কোনো এরর থাকে, তবে আমরা একটি JSON অবজেক্ট রিটার্ন করি যেখানে `success` বুলিয়ান false হয় এবং আমাদের `status` স্ট্রিংটি জানায় যে আমাদের কল ব্যর্থ হয়েছে। অন্যথায়, আমরা `pinataResponse` থেকে `pinataURL` এক্সট্র্যাক্ট করি এবং এটিকে আমাদের `tokenURI` ভেরিয়েবল হিসেবে স্টোর করি।

এখন আমাদের ফাইলের ওপরে ইনিশিয়ালাইজ করা Alchemy Web3 API ব্যবহার করে আমাদের স্মার্ট কন্ট্রাক্ট লোড করার সময় এসেছে। `window.contract` গ্লোবাল ভেরিয়েবলে কন্ট্রাক্ট সেট করতে `mintNFT` ফাংশনের নিচে কোডের নিচের লাইনটি যোগ করুন:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

আমাদের `mintNFT` ফাংশনে যোগ করার শেষ জিনিসটি হলো আমাদের ইথিরিয়াম লেনদেন:

```javascript
// আপনার ইথিরিয়াম ট্রানজ্যাকশন সেট আপ করুন
const transactionParameters = {
  to: contractAddress, // কন্ট্রাক্ট পাবলিকেশন ছাড়া অন্যান্য ক্ষেত্রে প্রয়োজনীয়।
  from: window.ethereum.selectedAddress, // অবশ্যই ব্যবহারকারীর সক্রিয় ঠিকানার সাথে মিলতে হবে।
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), // NFT স্মার্ট কন্ট্রাক্টে কল করুন
}

// MetaMask-এর মাধ্যমে ট্রানজ্যাকশন সাইন করুন
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

আপনি যদি ইতিমধ্যে ইথিরিয়াম লেনদেন-এর সাথে পরিচিত হন, তবে আপনি লক্ষ্য করবেন যে এর স্ট্রাকচারটি আপনি যা দেখেছেন তার মতোই।

- প্রথমে, আমরা আমাদের লেনদেন প্যারামিটারগুলো সেট আপ করি।
  - `to` প্রাপকের এডড্রেস নির্দিষ্ট করে \(আমাদের স্মার্ট কন্ট্রাক্ট\)
  - `from` লেনদেন-এর সাইনার নির্দিষ্ট করে \(MetaMask-এ ব্যবহারকারীর সংযুক্ত এডড্রেস: `window.ethereum.selectedAddress`\)
  - `data`-তে আমাদের স্মার্ট কন্ট্রাক্ট `mintNFT` মেথডের কল থাকে, যা ইনপুট হিসেবে আমাদের `tokenURI` এবং ব্যবহারকারীর ওয়ালেট এডড্রেস, `window.ethereum.selectedAddress` গ্রহণ করে
- তারপর, আমরা একটি await কল করি, `window.ethereum.request,` যেখানে আমরা MetaMask-কে লেনদেন সাইন করতে বলি। লক্ষ্য করুন, এই রিকোয়েস্টে, আমরা আমাদের eth মেথড \(eth_SentTransaction\) নির্দিষ্ট করছি এবং আমাদের `transactionParameters` পাস করছি। এই পর্যায়ে, ব্রাউজারে MetaMask খুলবে এবং ব্যবহারকারীকে লেনদেন সাইন বা প্রত্যাখ্যান করার জন্য প্রম্পট করবে।
  - যদি লেনদেন সফল হয়, তবে ফাংশনটি একটি JSON অবজেক্ট রিটার্ন করবে যেখানে বুলিয়ান `success` true হিসেবে সেট করা থাকে এবং `status` স্ট্রিংটি ব্যবহারকারীকে তাদের লেনদেন সম্পর্কে আরও তথ্যের জন্য Etherscan চেক করার জন্য প্রম্পট করে।
  - যদি লেনদেন ব্যর্থ হয়, তবে ফাংশনটি একটি JSON অবজেক্ট রিটার্ন করবে যেখানে `success` বুলিয়ান false হিসেবে সেট করা থাকে এবং `status` স্ট্রিংটি এরর মেসেজ জানায়।

সব মিলিয়ে, আমাদের `mintNFT` ফাংশনটি এরকম হওয়া উচিত:

```javascript
export const mintNFT = async (url, name, description) => {
  // এরর হ্যান্ডলিং
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // মেটাডেটা তৈরি করুন
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // pinata পিন রিকোয়েস্ট
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  // স্মার্ট কন্ট্রাক্ট লোড করুন
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) // loadContract();

  // আপনার ইথিরিয়াম ট্রানজ্যাকশন সেট আপ করুন
  const transactionParameters = {
    to: contractAddress, // কন্ট্রাক্ট পাবলিকেশন ছাড়া অন্যান্য ক্ষেত্রে প্রয়োজনীয়।
    from: window.ethereum.selectedAddress, // অবশ্যই ব্যবহারকারীর সক্রিয় ঠিকানার সাথে মিলতে হবে।
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), // NFT স্মার্ট কন্ট্রাক্টে কল করুন
  }

  // MetaMask-এর মাধ্যমে ট্রানজ্যাকশন সাইন করুন
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

এটি একটি বিশাল ফাংশন! এখন, আমাদের কেবল আমাদের `mintNFT` ফাংশনটিকে আমাদের `Minter.js` কম্পোনেন্টের সাথে সংযুক্ত করতে হবে...

## আমাদের Minter.js ফ্রন্টএন্ডের সাথে mintNFT সংযুক্ত করুন {#connect-our-frontend}

আপনার `Minter.js` ফাইলটি খুলুন এবং ওপরের `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` লাইনটি আপডেট করে নিচের মতো করুন:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

অবশেষে, আপনার ইমপোর্ট করা `mintNFT` ফাংশনে await কল করতে `onMintPressed` ফাংশনটি ইমপ্লিমেন্ট করুন এবং আমাদের লেনদেন সফল হয়েছে নাকি ব্যর্থ হয়েছে তা প্রতিফলিত করতে `status` স্টেট ভেরিয়েবলটি আপডেট করুন:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## একটি লাইভ ওয়েবসাইটে আপনার NFT ডিপ্লয় করুন {#deploy-your-NFT}

ব্যবহারকারীদের ইন্টারঅ্যাক্ট করার জন্য আপনার প্রজেক্ট লাইভ করতে প্রস্তুত? একটি লাইভ ওয়েবসাইটে আপনার মিন্টার ডিপ্লয় করার জন্য [এই টিউটোরিয়ালটি](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) দেখে নিন।

শেষ একটি ধাপ...

## ব্লকচেইন দুনিয়ায় ঝড় তুলুন {#take-the-blockchain-world-by-storm}

মজা করছিলাম, আপনি টিউটোরিয়ালের শেষ প্রান্তে পৌঁছে গেছেন!

সংক্ষেপে বলতে গেলে, একটি NFT মিন্টার তৈরি করার মাধ্যমে, আপনি সফলভাবে শিখেছেন কীভাবে:

- আপনার ফ্রন্টএন্ড প্রজেক্টের মাধ্যমে MetaMask-এ সংযুক্ত হতে হয়
- আপনার ফ্রন্টএন্ড থেকে স্মার্ট কন্ট্রাক্ট মেথড কল করতে হয়
- MetaMask ব্যবহার করে লেনদেন সাইন করতে হয়

সম্ভবত, আপনি আপনার ডিএ্যাপ-এর মাধ্যমে মিন্ট করা NFT-গুলো আপনার ওয়ালেটে দেখাতে চাইবেন — তাই আমাদের দ্রুত টিউটোরিয়াল [How to View Your NFT in Your Wallet](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) দেখতে ভুলবেন না!

এবং, বরাবরের মতো, আপনার যদি কোনো প্রশ্ন থাকে, তবে আমরা [Alchemy Discord](https://discord.gg/gWuC7zB)-এ সাহায্য করার জন্য আছি। এই টিউটোরিয়ালের কনসেপ্টগুলো আপনি আপনার ভবিষ্যতের প্রজেক্টগুলোতে কীভাবে প্রয়োগ করেন তা দেখার জন্য আমরা অধীর আগ্রহে অপেক্ষা করছি!