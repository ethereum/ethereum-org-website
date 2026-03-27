---
title: "ERC-4626 টোকেনাইজড ভল্ট স্ট্যান্ডার্ড"
description: "ইল্ড বিয়ারিং ভল্টের জন্য একটি স্ট্যান্ডার্ড।"
lang: bn
---

## ভূমিকা {#introduction}

ERC-4626 হলো ইল্ড-বিয়ারিং ভল্টগুলোর টেকনিক্যাল প্যারামিটার অপ্টিমাইজ এবং একীভূত করার একটি স্ট্যান্ডার্ড। এটি টোকেনাইজড ইল্ড-বিয়ারিং ভল্টগুলোর জন্য একটি স্ট্যান্ডার্ড API প্রদান করে যা একটি একক আন্ডারলাইং ERC-20 টোকেনের শেয়ার উপস্থাপন করে। ERC-4626 টোকেনাইজড ভল্টগুলোর জন্য একটি ঐচ্ছিক এক্সটেনশনের রূপরেখাও দেয় যা ERC-20 ব্যবহার করে, টোকেন জমা দেওয়া, তোলা এবং ব্যালেন্স পড়ার জন্য মৌলিক কার্যকারিতা প্রদান করে।

**ইল্ড-বিয়ারিং ভল্টে ERC-4626 এর ভূমিকা**

লেন্ডিং মার্কেট, এগ্রিগেটর এবং অন্তর্নিহিতভাবে সুদ-বহনকারী টোকেনগুলো বিভিন্ন কৌশল প্রয়োগ করে ব্যবহারকারীদের তাদের ক্রিপ্টো টোকেনগুলোতে সেরা ইল্ড খুঁজে পেতে সহায়তা করে। এই কৌশলগুলো সামান্য ভিন্নতার সাথে করা হয়, যা ত্রুটিপূর্ণ হতে পারে বা ডেভেলপমেন্ট রিসোর্স নষ্ট করতে পারে।

ইল্ড-বিয়ারিং ভল্টগুলোতে ERC-4626 আরও সামঞ্জস্যপূর্ণ এবং শক্তিশালী ইমপ্লিমেন্টেশন প্যাটার্ন তৈরি করে ইন্টিগ্রেশন প্রচেষ্টা কমিয়ে আনবে এবং ডেভেলপারদের সামান্য বিশেষ প্রচেষ্টার মাধ্যমে বিভিন্ন অ্যাপ্লিকেশনে ইল্ড অ্যাক্সেস আনলক করবে।

ERC-4626 টোকেনটি [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)-এ সম্পূর্ণভাবে বর্ণনা করা হয়েছে।

**অ্যাসিনক্রোনাস ভল্ট এক্সটেনশন (ERC-7540)**

ERC-4626 একটি নির্দিষ্ট সীমা পর্যন্ত অ্যাটমিক ডিপোজিট এবং রিডেম্পশনের জন্য অপ্টিমাইজ করা হয়েছে। যদি সীমা পৌঁছে যায়, তবে নতুন কোনো ডিপোজিট বা রিডেম্পশন জমা দেওয়া যাবে না। এই সীমাবদ্ধতা এমন কোনো স্মার্ট কন্ট্রাক্ট সিস্টেমের জন্য ভালোভাবে কাজ করে না যেখানে ভল্টের সাথে ইন্টারফেস করার পূর্বশর্ত হিসেবে অ্যাসিনক্রোনাস অ্যাকশন বা বিলম্ব থাকে (যেমন, রিয়েল-ওয়ার্ল্ড অ্যাসেট প্রটোকল, আন্ডারকোল্যাটারাইজড লেন্ডিং প্রটোকল, ক্রস-চেইন লেন্ডিং প্রটোকল, লিকুইড স্টেকিং টোকেন, বা ইন্স্যুরেন্স সেফটি মডিউল)।

ERC-7540 অ্যাসিনক্রোনাস ব্যবহারের ক্ষেত্রে ERC-4626 ভল্টগুলোর উপযোগিতা প্রসারিত করে। বিদ্যমান ভল্ট ইন্টারফেস (`deposit`/`withdraw`/`mint`/`redeem`) অ্যাসিনক্রোনাস রিকোয়েস্ট ক্লেইম করার জন্য পুরোপুরি ব্যবহার করা হয়।

ERC-7540 এক্সটেনশনটি [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)-এ সম্পূর্ণভাবে বর্ণনা করা হয়েছে।

**মাল্টি-অ্যাসেট ভল্ট এক্সটেনশন (ERC-7575)**

ERC-4626 দ্বারা সমর্থিত নয় এমন একটি অনুপস্থিত ব্যবহারের ক্ষেত্র হলো এমন ভল্ট যেখানে একাধিক অ্যাসেট বা এন্ট্রি পয়েন্ট থাকে, যেমন লিকুইডিটি প্রোভাইডার (LP) টোকেন। ERC-4626 এর নিজেরই একটি ERC-20 হওয়ার প্রয়োজনীয়তার কারণে এগুলো সাধারণত পরিচালনা করা কঠিন বা নন-কমপ্লায়েন্ট হয়।

ERC-7575 ERC-4626 ইমপ্লিমেন্টেশন থেকে ERC-20 টোকেন ইমপ্লিমেন্টেশনকে এক্সটার্নালাইজ করে একাধিক অ্যাসেট সহ ভল্টগুলোর জন্য সমর্থন যোগ করে।

ERC-7575 এক্সটেনশনটি [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)-এ সম্পূর্ণভাবে বর্ণনা করা হয়েছে।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা সুপারিশ করছি যে আপনি প্রথমে [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/) এবং [ERC-20](/developers/docs/standards/tokens/erc-20/) সম্পর্কে পড়ুন।

## ERC-4626 ফাংশন এবং বৈশিষ্ট্য: {#body}

### মেথড {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

এই ফাংশনটি অ্যাকাউন্টিং, ডিপোজিট এবং উত্তোলনের জন্য ভল্টে ব্যবহৃত আন্ডারলাইং টোকেনের এডড্রেস রিটার্ন করে।

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

এই ফাংশনটি ভল্টে থাকা আন্ডারলাইং অ্যাসেটের মোট পরিমাণ রিটার্ন করে।

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি প্রদান করা `assets`-এর পরিমাণের জন্য ভল্ট দ্বারা বিনিময় করা `shares`-এর পরিমাণ রিটার্ন করে।

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি প্রদান করা `shares`-এর পরিমাণের জন্য ভল্ট দ্বারা বিনিময় করা `assets`-এর পরিমাণ রিটার্ন করে।

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

এই ফাংশনটি আন্ডারলাইং অ্যাসেটের সর্বোচ্চ পরিমাণ রিটার্ন করে যা একটি একক [`deposit`](#deposit) কলে জমা করা যেতে পারে, যেখানে `receiver`-এর জন্য শেয়ার মিন্ট করা হয়।

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের ডিপোজিটের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

এই ফাংশনটি ভল্টে আন্ডারলাইং টোকেনের `assets` জমা করে এবং `receiver`-কে `shares`-এর মালিকানা প্রদান করে।

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

এই ফাংশনটি শেয়ারের সর্বোচ্চ পরিমাণ রিটার্ন করে যা একটি একক [`mint`](#mint) কলে মিন্ট করা যেতে পারে, যেখানে `receiver`-এর জন্য শেয়ার মিন্ট করা হয়।

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের মিন্টের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

এই ফাংশনটি আন্ডারলাইং টোকেনের `assets` জমা করে `receiver`-কে ঠিক `shares` পরিমাণ ভল্ট শেয়ার মিন্ট করে।

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

এই ফাংশনটি আন্ডারলাইং অ্যাসেটের সর্বোচ্চ পরিমাণ রিটার্ন করে যা একটি একক [`withdraw`](#withdraw) কলের মাধ্যমে `owner` ব্যালেন্স থেকে তোলা যেতে পারে।

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের উত্তোলনের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

এই ফাংশনটি `owner` থেকে `shares` বার্ন করে এবং ভল্ট থেকে `receiver`-কে ঠিক `assets` টোকেন পাঠায়।

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

এই ফাংশনটি শেয়ারের সর্বোচ্চ পরিমাণ রিটার্ন করে যা একটি [`redeem`](#redeem) কলের মাধ্যমে `owner` ব্যালেন্স থেকে রিডিম করা যেতে পারে।

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের রিডেম্পশনের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

এই ফাংশনটি `owner` থেকে একটি নির্দিষ্ট সংখ্যক `shares` রিডিম করে এবং ভল্ট থেকে `receiver`-কে আন্ডারলাইং টোকেনের `assets` পাঠায়।

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

সার্কুলেশনে থাকা আনরিডিমড ভল্ট শেয়ারের মোট সংখ্যা রিটার্ন করে।

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

বর্তমানে `owner`-এর কাছে থাকা ভল্ট শেয়ারের মোট পরিমাণ রিটার্ন করে।

### ইন্টারফেসের ম্যাপ {#mapOfTheInterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### ইভেন্ট {#events}

#### ডিপোজিট ইভেন্ট

[`mint`](#mint) এবং [`deposit`](#deposit) মেথডের মাধ্যমে ভল্টে টোকেন জমা করার সময় **অবশ্যই** এমিট করতে হবে।

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

যেখানে `sender` হলো সেই ব্যবহারকারী যিনি `shares`-এর বিনিময়ে `assets` এক্সচেঞ্জ করেছেন এবং সেই `shares` গুলো `owner`-এর কাছে ট্রান্সফার করেছেন।

#### উইথড্র ইভেন্ট

[`redeem`](#redeem) বা [`withdraw`](#withdraw) মেথডে কোনো আমানতকারী ভল্ট থেকে শেয়ার তোলার সময় **অবশ্যই** এমিট করতে হবে।

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

যেখানে `sender` হলো সেই ব্যবহারকারী যিনি উত্তোলন ট্রিগার করেছেন এবং `owner`-এর মালিকানাধীন `shares`-এর বিনিময়ে `assets` এক্সচেঞ্জ করেছেন। `receiver` হলো সেই ব্যবহারকারী যিনি উত্তোলিত `assets` পেয়েছেন।

## আরও পড়ুন {#further-reading}

- [EIP-4626: টোকেনাইজড ভল্ট স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: গিটহাব রিপো (GitHub Repo)](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)