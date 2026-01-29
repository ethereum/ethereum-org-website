---
title: "ERC-4626 টোকেনাইজড ভল্ট স্ট্যান্ডার্ড"
description: "ইল্ড বেয়ারিং ভল্টের জন্য একটি স্ট্যান্ডার্ড।"
lang: bn
---

## ভূমিকা {#introduction}

ERC-4626 হলো ইল্ড-বেয়ারিং ভল্টের প্রযুক্তিগত প্যারামিটারগুলিকে অপ্টিমাইজ এবং একত্রিত করার জন্য একটি স্ট্যান্ডার্ড। এটি টোকেনাইজড ইল্ড-বেয়ারিং ভল্টের জন্য একটি স্ট্যান্ডার্ড API প্রদান করে যা একটি একক অন্তর্নিহিত ERC-20 টোকেনের শেয়ারের প্রতিনিধিত্ব করে। ERC-4626, ERC-20 ব্যবহারকারী টোকেনাইজড ভল্টের জন্য একটি ঐচ্ছিক এক্সটেনশনের রূপরেখাও দেয়, যা টোকেন জমা, উত্তোলন এবং ব্যালেন্স পড়ার জন্য প্রাথমিক কার্যকারিতা প্রদান করে।

**ইল্ড-বেয়ারিং ভল্টে ERC-4626-এর ভূমিকা**

লেন্ডিং বাজার, অ্যাগ্রিগেটর এবং সহজাতভাবে সুদ-বাহী টোকেন বিভিন্ন কৌশল কার্যকর করার মাধ্যমে ব্যবহারকারীদের তাদের ক্রিপ্টো টোকেনে সেরা ইল্ড খুঁজে পেতে সাহায্য করে। এই কৌশলগুলি সামান্য ভিন্নতার সাথে করা হয়, যা ত্রুটি-প্রবণ হতে পারে বা ডেভেলপমেন্ট রিসোর্স নষ্ট করতে পারে।

ইল্ড-বেয়ারিং ভল্টে ERC-4626 আরও সামঞ্জস্যপূর্ণ এবং শক্তিশালী বাস্তবায়ন প্যাটার্ন তৈরি করার মাধ্যমে ইন্টিগ্রেশন প্রচেষ্টা কমাবে এবং ডেভেলপারদের থেকে সামান্য বিশেষায়িত প্রচেষ্টার সাথে বিভিন্ন অ্যাপ্লিকেশনে ইল্ডে অ্যাক্সেস আনলক করবে।

ERC-4626 টোকেনটি [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)-তে সম্পূর্ণরূপে বর্ণনা করা হয়েছে।

**অ্যাসিঙ্ক্রোনাস ভল্ট এক্সটেনশন (ERC-7540)**

ERC-4626 একটি সীমা পর্যন্ত অ্যাটমিক ডিপোজিট এবং রিডেম্পশনের জন্য অপ্টিমাইজ করা হয়েছে। সীমা পৌঁছে গেলে, কোনো নতুন ডিপোজিট বা রিডেম্পশন জমা দেওয়া যাবে না। এই সীমাবদ্ধতাটি ভল্টের সাথে ইন্টারফেস করার পূর্বশর্ত হিসেবে অ্যাসিঙ্ক্রোনাস অ্যাকশন বা বিলম্ব সহ কোনো স্মার্ট কন্ট্র্যাক্ট সিস্টেমের জন্য ভালোভাবে কাজ করে না (যেমন, রিয়েল-ওয়ার্ল্ড অ্যাসেট প্রোটোকল, আন্ডারকোল্যাটারাইজড লেন্ডিং প্রোটোকল, ক্রস-চেইন লেন্ডিং প্রোটোকল, লিকুইড স্টেকিং টোকেন বা বিমা সুরক্ষা মডিউল)।

ERC-7540 অ্যাসিঙ্ক্রোনাস ব্যবহারের ক্ষেত্রে ERC-4626 ভল্টের উপযোগিতা প্রসারিত করে। বিদ্যমান ভল্ট ইন্টারফেস (`deposit`/`withdraw`/`mint`/`redeem`) অ্যাসিঙ্ক্রোনাস অনুরোধ দাবি করতে সম্পূর্ণরূপে ব্যবহৃত হয়।

ERC-7540 এক্সটেনশনটি [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)-তে সম্পূর্ণরূপে বর্ণনা করা হয়েছে।

**মাল্টি-অ্যাসেট ভল্ট এক্সটেনশন (ERC-7575)**

ERC-4626 দ্বারা সমর্থিত নয় এমন একটি অনুপস্থিত ব্যবহারের ক্ষেত্র হলো এমন ভল্ট যার একাধিক সম্পদ বা এন্ট্রি পয়েন্ট রয়েছে যেমন লিকুইডিটি প্রোভাইডার (LP) টোকেন। ERC-4626-কে নিজেই একটি ERC-20 হতে হয় বলে, এইগুলি সাধারণত অসুবিধাজনক বা অ-সম্মত হয়।

ERC-7575 একাধিক সম্পদ সহ ভল্টের জন্য সমর্থন যোগ করে এবং ERC-4626 বাস্তবায়ন থেকে ERC-20 টোকেন বাস্তবায়নকে বাহ্যিক করে।

ERC-7575 এক্সটেনশনটি [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)-তে সম্পূর্ণরূপে বর্ণনা করা হয়েছে।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালভাবে বুঝতে, আমরা আপনাকে প্রথমে [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/) এবং [ERC-20](/developers/docs/standards/tokens/erc-20/) সম্পর্কে পড়ার পরামর্শ দিই।

## ERC-4626 ফাংশন এবং বৈশিষ্ট্য: {#body}

### মেথড {#methods}

#### সম্পদ {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

এই ফাংশনটি অ্যাকাউন্টিং, জমা দেওয়া, এবং উত্তোলনের জন্য ভল্টে ব্যবহৃত অন্তর্নিহিত টোকেনের ঠিকানাটি ফেরত দেয়।

#### মোট সম্পদ {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

এই ফাংশনটি ভল্টে রাখা অন্তর্নিহিত সম্পদের মোট পরিমাণ প্রদান করে।

#### শেয়ারে রূপান্তর {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি প্রদত্ত `assets`-এর পরিমাণের জন্য ভল্ট দ্বারা বিনিময় করা হবে এমন `shares`-এর পরিমাণ প্রদান করে।

#### সম্পদে রূপান্তর {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি প্রদত্ত `shares`-এর পরিমাণের জন্য ভল্ট দ্বারা বিনিময় করা হবে এমন `assets`-এর পরিমাণ প্রদান করে।

#### সর্বোচ্চ জমা {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

এই ফাংশনটি অন্তর্নিহিত সম্পদের সর্বোচ্চ পরিমাণ প্রদান করে যা একটি একক [`deposit`](#deposit) কলে জমা করা যেতে পারে, এবং `receiver`-এর জন্য শেয়ারগুলি মিন্ট করা হয়।

#### ডিপোজিটের প্রিভিউ {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের জমার প্রভাব সিমুলেট করতে দেয়।

#### জমা {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

এই ফাংশনটি ভল্টে অন্তর্নিহিত টোকেনের `assets` জমা করে এবং `receiver`-কে `shares`-এর মালিকানা প্রদান করে।

#### সর্বোচ্চ মিন্ট {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

এই ফাংশনটি একটি একক [`mint`](#mint) কলে মিন্ট করা যেতে পারে এমন শেয়ারের সর্বোচ্চ পরিমাণ প্রদান করে, যেখানে শেয়ারগুলো `receiver`-এর জন্য মিন্ট করা হয়।

#### মিন্টের প্রিভিউ {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের মিন্টের প্রভাব সিমুলেট করতে দেয়।

#### মিন্ট {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

এই ফাংশনটি অন্তর্নিহিত টোকেনের `assets` জমা করার মাধ্যমে `receiver`-কে ঠিক `shares` পরিমাণ ভল্ট শেয়ার মিন্ট করে।

#### সর্বোচ্চ উত্তোলন {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

এই ফাংশনটি অন্তর্নিহিত সম্পদের সর্বোচ্চ পরিমাণ প্রদান করে যা একটি একক [`withdraw`](#withdraw) কলের মাধ্যমে `owner`-এর ব্যালেন্স থেকে উত্তোলন করা যেতে পারে।

#### উত্তোলনের প্রিভিউ {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের উত্তোলনের প্রভাব সিমুলেট করতে দেয়।

#### উত্তোলন {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

এই ফাংশনটি `owner`-এর থেকে `shares` বার্ন করে এবং ভল্ট থেকে `receiver`-কে ঠিক `assets` টোকেন পাঠায়।

#### সর্বোচ্চ রিডিম {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

এই ফাংশনটি একটি [`redeem`](#redeem) কলের মাধ্যমে `owner`-এর ব্যালেন্স থেকে রিডিম করা যেতে পারে এমন শেয়ারের সর্বোচ্চ পরিমাণ প্রদান করে।

#### রিডিমের প্রিভিউ {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

এই ফাংশনটি ব্যবহারকারীদের বর্তমান ব্লকে তাদের রিডেম্পশনের প্রভাব সিমুলেট করতে দেয়।

#### রিডিম {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

এই ফাংশনটি `owner`-এর থেকে নির্দিষ্ট সংখ্যক `shares` রিডিম করে এবং ভল্ট থেকে `receiver`-কে অন্তর্নিহিত টোকেনের `assets` পাঠায়।

#### মোট সরবরাহ {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

প্রচলিত আনরিডিমড ভল্ট শেয়ারের মোট সংখ্যা প্রদান করে।

#### ব্যালেন্স {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner`-এর কাছে বর্তমানে থাকা ভল্ট শেয়ারের মোট পরিমাণ প্রদান করে।

### ইন্টারফেসের ম্যাপ {#mapOfTheInterface}

![ERC-4626 ইন্টারফেসের ম্যাপ](./map-of-erc-4626.png)

### ইভেন্ট {#events}

#### ডিপোজিট ইভেন্ট

[`mint`](#mint) এবং [`deposit`](#deposit) মেথডের মাধ্যমে যখন টোকেন ভল্টে জমা করা হয় তখন **অবশ্যই** এমিট করতে হবে।

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

যেখানে `sender` হলো সেই ব্যবহারকারী যিনি `shares`-এর জন্য `assets` বিনিময় করেছেন, এবং সেই `shares` `owner`-এর কাছে স্থানান্তর করেছেন।

#### উত্তোলন ইভেন্ট

[`redeem`](#redeem) বা [`withdraw`](#withdraw) মেথডে যখন একজন আমানতকারী ভল্ট থেকে শেয়ার উত্তোলন করেন তখন **অবশ্যই** এমিট করতে হবে।

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

যেখানে `sender` হলো সেই ব্যবহারকারী যিনি উত্তোলনটি ট্রিগার করেছেন এবং `owner`-এর মালিকানাধীন `shares`-কে `assets`-এর জন্য বিনিময় করেছেন। `receiver` হলো সেই ব্যবহারকারী যিনি উত্তোলিত `assets` পেয়েছেন।

## আরও পড়ুন {#further-reading}

- [EIP-4626: টোকেনাইজড ভল্ট স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub রিপো](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
