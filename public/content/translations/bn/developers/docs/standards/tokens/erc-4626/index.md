---
title: ⁦ERC-4626⁩ টোকেনাইজড ভল্ট স্ট্যান্ডার্ড
description: ইল্ড প্রদানকারী ভল্টের জন্য একটি স্ট্যান্ডার্ড।
lang: bn
---

## ভূমিকা {#introduction}

ERC-4626 হলো ইল্ড প্রদানকারী ভল্টগুলোর প্রযুক্তিগত প্যারামিটার অপ্টিমাইজ এবং একীভূত করার একটি স্ট্যান্ডার্ড। এটি টোকেনাইজড ইল্ড প্রদানকারী ভল্টগুলোর জন্য একটি স্ট্যান্ডার্ড API প্রদান করে যা একটি একক অন্তর্নিহিত ERC-20 টোকেনের শেয়ার উপস্থাপন করে। ERC-4626 এছাড়াও ERC-20 ব্যবহার করে টোকেনাইজড ভল্টগুলোর জন্য একটি ঐচ্ছিক এক্সটেনশনের রূপরেখা দেয়, যা টোকেন জমা দেওয়া, উত্তোলন এবং ব্যালেন্স পড়ার জন্য মৌলিক কার্যকারিতা প্রদান করে।

**ইল্ড প্রদানকারী ভল্টে ERC-4626 এর ভূমিকা**

ঋণ প্রদান মার্কেট, অ্যাগ্রিগেটর এবং অন্তর্নিহিতভাবে সুদ-বহনকারী টোকেনগুলো বিভিন্ন কৌশল কার্যকর করার মাধ্যমে ব্যবহারকারীদের তাদের ক্রিপ্টো টোকেনগুলোতে সেরা ইল্ড খুঁজে পেতে সহায়তা করে। এই কৌশলগুলো সামান্য ভিন্নতার সাথে সম্পন্ন করা হয়, যা ত্রুটিপূর্ণ হতে পারে বা ডেভেলপমেন্ট রিসোর্স নষ্ট করতে পারে।

ইল্ড প্রদানকারী ভল্টগুলোতে ERC-4626 আরও সামঞ্জস্যপূর্ণ এবং শক্তিশালী ইমপ্লিমেন্টেশন প্যাটার্ন তৈরি করার মাধ্যমে ইন্টিগ্রেশনের প্রচেষ্টা কমিয়ে আনবে এবং ডেভেলপারদের সামান্য বিশেষায়িত প্রচেষ্টায় বিভিন্ন অ্যাপ্লিকেশনে ইল্ড অ্যাক্সেস করার সুযোগ আনলক করবে।

ERC-4626 টোকেনটি [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)-এ সম্পূর্ণভাবে বর্ণনা করা হয়েছে।

**অ্যাসিঙ্ক্রোনাস ভল্ট এক্সটেনশন (ERC-7540)**

ERC-4626 একটি নির্দিষ্ট সীমা পর্যন্ত পারমাণবিক (atomic) জমা এবং রিডেম্পশনের জন্য অপ্টিমাইজ করা হয়েছে। যদি সীমা পৌঁছে যায়, তবে নতুন কোনো জমা বা রিডেম্পশন জমা দেওয়া যাবে না। এই সীমাবদ্ধতা এমন কোনো স্মার্ট কন্ট্রাক্ট সিস্টেমের জন্য ভালোভাবে কাজ করে না যেখানে ভল্টের সাথে ইন্টারফেস করার পূর্বশর্ত হিসেবে অ্যাসিঙ্ক্রোনাস কাজ বা বিলম্ব থাকে (যেমন, রিয়েল-ওয়ার্ল্ড অ্যাসেট প্রোটোকল, আন্ডারকোল্যাটারাইজড ঋণ প্রদান প্রোটোকল, ক্রস-চেইন ঋণ প্রদান প্রোটোকল, লিকুইড স্টেকিং টোকেন (LST), বা ইন্স্যুরেন্স সেফটি মডিউল)।

ERC-7540 অ্যাসিঙ্ক্রোনাস ব্যবহারের ক্ষেত্রে ERC-4626 ভল্টের উপযোগিতা প্রসারিত করে। বিদ্যমান ভল্ট ইন্টারফেস (`deposit`/`withdraw`/`mint`/`redeem`) অ্যাসিঙ্ক্রোনাস রিকোয়েস্টগুলো দাবি করার জন্য সম্পূর্ণভাবে ব্যবহৃত হয়।

ERC-7540 এক্সটেনশনটি [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)-এ সম্পূর্ণভাবে বর্ণনা করা হয়েছে।

**মাল্টি-অ্যাসেট ভল্ট এক্সটেনশন (ERC-7575)**

ERC-4626 দ্বারা সমর্থিত নয় এমন একটি অনুপস্থিত ব্যবহারের ক্ষেত্র হলো এমন ভল্ট যেখানে একাধিক অ্যাসেট বা এন্ট্রি পয়েন্ট থাকে, যেমন তারল্য প্রদানকারী (LP) টোকেন। ERC-4626 এর নিজেরই একটি ERC-20 হওয়ার প্রয়োজনীয়তার কারণে এগুলো সাধারণত পরিচালনা করা কঠিন বা অ-সম্মত (non-compliant) হয়।

ERC-7575 ERC-4626 ইমপ্লিমেন্টেশন থেকে ERC-20 টোকেন ইমপ্লিমেন্টেশনকে বাহ্যিক করার মাধ্যমে একাধিক অ্যাসেট সহ ভল্টগুলোর জন্য সমর্থন যোগ করে।

ERC-7575 এক্সটেনশনটি [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)-এ সম্পূর্ণভাবে বর্ণনা করা হয়েছে।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা সুপারিশ করছি যে আপনি প্রথমে [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/) এবং [ERC-20](/developers/docs/standards/tokens/erc-20/) সম্পর্কে পড়ুন।

## ERC-4626 এর ফাংশন এবং বৈশিষ্ট্য: {#body}

### মেথড {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

এই ফাংশনটি অ্যাকাউন্টিং, জমা দেওয়া এবং উত্তোলনের জন্য ভল্টে ব্যবহৃত অন্তর্নিহিত টোকেনের ঠিকানা প্রদান করে।

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

এই ফাংশনটি ভল্টে থাকা অন্তর্নিহিত অ্যাসেটের মোট পরিমাণ প্রদান করে।

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি প্রদান করা `assets` এর পরিমাণের জন্য ভল্ট দ্বারা বিনিময় করা `shares` এর পরিমাণ প্রদান করে।

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি প্রদান করা `shares` এর পরিমাণের জন্য ভল্ট দ্বারা বিনিময় করা `assets` এর পরিমাণ প্রদান করে।

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

এই ফাংশনটি অন্তর্নিহিত অ্যাসেটের সর্বোচ্চ পরিমাণ প্রদান করে যা একটি একক [`deposit`](#deposit) কলে জমা করা যেতে পারে, যেখানে শেয়ারগুলো `receiver` এর জন্য মিন্ট করা হয়।

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের জমার প্রভাব সিমুলেট করার অনুমতি দেয়।

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

এই ফাংশনটি ভল্টে `assets` পরিমাণ অন্তর্নিহিত টোকেন জমা করে এবং `receiver` কে `shares` এর মালিকানা প্রদান করে।

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

এই ফাংশনটি শেয়ারের সর্বোচ্চ পরিমাণ প্রদান করে যা একটি একক [`mint`](#mint) কলে মিন্ট করা যেতে পারে, যেখানে শেয়ারগুলো `receiver` এর জন্য মিন্ট করা হয়।

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের মিন্টের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

এই ফাংশনটি `assets` পরিমাণ অন্তর্নিহিত টোকেন জমা করার মাধ্যমে `receiver` এর জন্য ঠিক `shares` ভল্ট শেয়ার মিন্ট করে।

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

এই ফাংশনটি অন্তর্নিহিত অ্যাসেটের সর্বোচ্চ পরিমাণ প্রদান করে যা একটি একক [`withdraw`](#withdraw) কলের মাধ্যমে `owner` ব্যালেন্স থেকে উত্তোলন করা যেতে পারে।

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের উত্তোলনের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

এই ফাংশনটি `owner` থেকে `shares` বার্ন করে এবং ভল্ট থেকে `receiver` কে ঠিক `assets` টোকেন পাঠায়।

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

এই ফাংশনটি শেয়ারের সর্বোচ্চ পরিমাণ প্রদান করে যা একটি [`redeem`](#redeem) কলের মাধ্যমে `owner` ব্যালেন্স থেকে রিডিম করা যেতে পারে।

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের রিডেম্পশনের প্রভাব সিমুলেট করার অনুমতি দেয়।

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

এই ফাংশনটি `owner` থেকে একটি নির্দিষ্ট সংখ্যক `shares` রিডিম করে এবং ভল্ট থেকে `receiver` কে `assets` পরিমাণ অন্তর্নিহিত টোকেন পাঠায়।

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

সার্কুলেশনে থাকা রিডিম না করা ভল্ট শেয়ারের মোট সংখ্যা প্রদান করে।

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` এর কাছে বর্তমানে থাকা ভল্ট শেয়ারের মোট পরিমাণ প্রদান করে।

### ইন্টারফেসের ম্যাপ {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### ইভেন্ট {#events}

#### Deposit ইভেন্ট {#deposit-event}

[`mint`](#mint) এবং [`deposit`](#deposit) মেথডের মাধ্যমে ভল্টে টোকেন জমা করার সময় এটি **অবশ্যই** এমিট করতে হবে।

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

যেখানে `sender` হলো সেই ব্যবহারকারী যিনি `shares` এর বিনিময়ে `assets` বিনিময় করেছেন এবং সেই `shares` গুলো `owner` কে ট্রান্সফার করেছেন।

#### Withdraw ইভেন্ট {#withdraw-event}

[`redeem`](#redeem) বা [`withdraw`](#withdraw) মেথডে কোনো জমাকারীর দ্বারা ভল্ট থেকে শেয়ার উত্তোলন করার সময় এটি **অবশ্যই** এমিট করতে হবে।

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

যেখানে `sender` হলো সেই ব্যবহারকারী যিনি উত্তোলন ট্রিগার করেছেন এবং `owner` এর মালিকানাধীন `shares` কে `assets` এর বিনিময়ে বিনিময় করেছেন। `receiver` হলো সেই ব্যবহারকারী যিনি উত্তোলিত `assets` পেয়েছেন।

## আরও পড়ুন {#further-reading}

- [EIP-4626: টোকেনাইজড ভল্ট স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub রিপো](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)