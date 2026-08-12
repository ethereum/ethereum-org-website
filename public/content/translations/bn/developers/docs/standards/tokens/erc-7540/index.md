---
title: "⁦ERC-7540⁩ অ্যাসিনক্রোনাস টোকেনাইজড ভল্ট স্ট্যান্ডার্ড"
description: টোকেনাইজড ভল্টের জন্য অ্যাসিনক্রোনাস ডিপোজিট এবং রিডেম্পশন ফ্লো যুক্ত করতে ⁦ERC-4626⁩-এর একটি এক্সটেনশন।
lang: bn
---

## ভূমিকা {#introduction}

ERC-7540 অ্যাসিনক্রোনাস ডিপোজিট এবং রিডেম্পশন ফ্লো-এর সমর্থন যুক্ত করে [ERC-4626 টোকেনাইজড ভল্ট স্ট্যান্ডার্ড](/developers/docs/standards/tokens/erc-4626/)-কে প্রসারিত করে। এটি একটি রিকোয়েস্ট-দেন-ক্লেইম (request-then-claim) প্যাটার্ন চালু করে: ব্যবহারকারীরা প্রথমে একটি রিকোয়েস্ট জমা দেয় (তাদের সম্পদ বা শেয়ার লক করে), তারপর ভল্ট এটি প্রক্রিয়া করার পরে ফলাফল দাবি করে।

এটি তখন প্রয়োজন হয় যখন একটি ভল্ট একটি ট্রানজ্যাকশনে তাৎক্ষণিকভাবে নিষ্পত্তি করতে পারে না, উদাহরণস্বরূপ:

- বাস্তব জগতের সম্পদ (RWA) প্রোটোকল যেমন টোকেনাইজড ট্রেজারি, প্রাইভেট ক্রেডিট এবং T+1 বা T+2 নিষ্পত্তি চক্র সহ অন্যান্য সম্পদ
- আন্ডারকোল্যাটারাইজড ঋণ প্রদান যেখানে ক্রেডিট মূল্যায়ন অফচেইন ঘটে
- ক্রস-চেইন ভল্ট কৌশল যেখানে ব্রিজিংয়ের কারণে বিলম্ব হয়
- আনবন্ডিং পিরিয়ড সহ লিকুইড স্টেকিং টোকেন (LST)

ভল্টগুলো শুধুমাত্র ডিপোজিট, শুধুমাত্র রিডেম্পশন, অথবা উভয় ক্ষেত্রেই অ্যাসিনক্রোনাস হওয়া বেছে নিতে পারে। এই নমনীয়তা ভল্ট ডেভেলপারদের শুধুমাত্র সেখানেই অ্যাসিনক্রোনাস ফ্লো যোগ করার সুযোগ দেয় যেখানে অন্তর্নিহিত কৌশলটির জন্য এটি প্রয়োজন, অন্যদিকে অন্য দিকটি সিনক্রোনাস রাখা যায়।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা সুপারিশ করছি যে আপনি প্রথমে [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) এবং [ERC-4626](/developers/docs/standards/tokens/erc-4626/) সম্পর্কে পড়ুন।

## ERC-4626 বনাম ERC-7540 {#comparison}

ERC-4626-এ, একটি ডিপোজিট পারমাণবিকভাবে (atomically) নিষ্পত্তি হয়: বিনিয়োগকারী সম্পদ পাঠায় এবং একটি একক ট্রানজ্যাকশনে শেয়ার ফেরত পায়।

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 এটিকে দুটি ধাপে বিভক্ত করে। বিনিয়োগকারী প্রথমে সম্পদ লক করার জন্য `requestDeposit()` কল করে, তারপর ভল্ট ম্যানেজারের রিকোয়েস্টটি প্রক্রিয়া করার জন্য অপেক্ষা করে। একবার পূর্ণ হলে, বিনিয়োগকারী তাদের শেয়ার দাবি করার জন্য `deposit()` কল করে। এক্সচেঞ্জ রেট রিকোয়েস্টের সময় নয়, বরং পূরণের সময় নির্ধারিত হয়।

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

রিডেম্পশন ফ্লো একইভাবে কাজ করে: `requestRedeem()` শেয়ার লক করে, এবং একবার পূর্ণ হলে বিনিয়োগকারী সম্পদ দাবি করার জন্য `redeem()` কল করে।

## ERC-7540 ফাংশন এবং বৈশিষ্ট্য {#body}

ERC-7540 সম্পূর্ণ ERC-4626 ইন্টারফেসের উত্তরাধিকারী হয় তবে `deposit`/`mint`/`withdraw`/`redeem`-কে দাবি ফাংশন হিসেবে পুনরায় ব্যবহার করে। নতুন `requestDeposit` এবং `requestRedeem` ফাংশনগুলো প্রাথমিক রিকোয়েস্ট ধাপ পরিচালনা করে।

প্রতিটি রিকোয়েস্ট তিনটি স্টেটের মধ্য দিয়ে যায়: পেন্ডিং (জমা দেওয়া হয়েছে, প্রক্রিয়াকরণের জন্য অপেক্ষারত), ক্লেইমেবল (পূর্ণ এবং মূল্য নির্ধারিত), এবং ক্লেইমড (বিনিয়োগকারী তাদের শেয়ার বা সম্পদ সংগ্রহ করেছে)।

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### ডিপোজিট রিকোয়েস্ট ফ্লো {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` থেকে ভল্টে `assets` হস্তান্তর করে এবং ডিপোজিট করার জন্য একটি রিকোয়েস্ট জমা দেয়। `controller` ঠিকানা রিকোয়েস্টের নিয়ন্ত্রণ গ্রহণ করে। রিকোয়েস্ট ব্যাচ শনাক্তকারী একটি `requestId` প্রদান করে।

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

প্রদত্ত `controller` এবং `requestId`-এর জন্য একটি পেন্ডিং (এখনও দাবি করার যোগ্য নয়) ডিপোজিট রিকোয়েস্টে `assets`-এর পরিমাণ প্রদান করে।

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

প্রদত্ত `controller` এবং `requestId`-এর জন্য একটি ক্লেইমেবল (পূর্ণ কিন্তু এখনও দাবি করা হয়নি) ডিপোজিট রিকোয়েস্টে `assets`-এর পরিমাণ প্রদান করে।

#### ডিপোজিট দাবি করা {#claiming-deposits}

একবার একটি ডিপোজিট রিকোয়েস্ট ক্লেইমেবল হয়ে গেলে, ব্যবহারকারী তাদের শেয়ার দাবি করার জন্য স্ট্যান্ডার্ড ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) বা [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) ফাংশন কল করে। ERC-7540-এ, এই ফাংশনগুলো আর সম্পদ হস্তান্তর করে না (যা রিকোয়েস্টের সময়ই হয়ে গেছে)। এগুলো শুধুমাত্র রিসিভারের জন্য শেয়ার মিন্ট করে।

### রিডেম্পশন রিকোয়েস্ট ফ্লো {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` থেকে `shares` লক করে এবং রিডিম করার জন্য একটি রিকোয়েস্ট জমা দেয়। `controller` ঠিকানা রিকোয়েস্টের নিয়ন্ত্রণ গ্রহণ করে।

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

প্রদত্ত `controller` এবং `requestId`-এর জন্য একটি পেন্ডিং রিডেম্পশন রিকোয়েস্টে `shares`-এর পরিমাণ প্রদান করে।

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

প্রদত্ত `controller` এবং `requestId`-এর জন্য একটি ক্লেইমেবল রিডেম্পশন রিকোয়েস্টে `shares`-এর পরিমাণ প্রদান করে।

#### রিডেম্পশন দাবি করা {#claiming-redemptions}

একবার একটি রিডেম্পশন রিকোয়েস্ট ক্লেইমেবল হয়ে গেলে, ব্যবহারকারী তাদের সম্পদ দাবি করার জন্য স্ট্যান্ডার্ড ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) বা [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) ফাংশন কল করে।

### অপারেটর ম্যানেজমেন্ট {#operator-management}

ERC-7540-এ একটি অপারেটর প্যাটার্ন অন্তর্ভুক্ত রয়েছে ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909) থেকে) যা তৃতীয় পক্ষকে ব্যবহারকারীর পক্ষে রিকোয়েস্ট পরিচালনা করার অনুমতি দেয়।

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

ডিপোজিট/রিডিম রিকোয়েস্ট এবং দাবির জন্য `msg.sender`-এর পক্ষে কাজ করতে `operator`-কে অনুমোদন বা বাতিল করে।

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`controller`-এর পক্ষে কাজ করার জন্য `operator` অনুমোদিত কিনা তা প্রদান করে।

### রিকোয়েস্ট আইডি {#request-ids}

রিকোয়েস্ট আইডিগুলো রিকোয়েস্টের বিভিন্ন ব্যাচের মধ্যে পার্থক্য করে। একই `requestId` শেয়ার করা সমস্ত রিকোয়েস্ট ফাঞ্জিবল (fungible): এগুলো একসাথে স্টেটগুলোর মধ্যে স্থানান্তরিত হয় এবং একই এক্সচেঞ্জ রেট পায়।

যখন একটি ভল্ট সমস্ত রিকোয়েস্টের জন্য `requestId = 0` প্রদান করে, তখন শুধুমাত্র `controller` ঠিকানা রিকোয়েস্ট স্টেটকে আলাদা করে। একই কন্ট্রোলারের একাধিক রিকোয়েস্ট একত্রিত করা হয়।

### ইভেন্ট {#events}

#### DepositRequest ইভেন্ট {#depositrequest-event}

যখন [`requestDeposit`](#requestdeposit)-এর মাধ্যমে একটি ডিপোজিট রিকোয়েস্ট জমা দেওয়া হয় তখন অবশ্যই এমিট (emit) করতে হবে।

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest ইভেন্ট {#redeemrequest-event}

যখন [`requestRedeem`](#requestredeem)-এর মাধ্যমে একটি রিডেম্পশন রিকোয়েস্ট জমা দেওয়া হয় তখন অবশ্যই এমিট করতে হবে।

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet ইভেন্ট {#operatorset-event}

যখন [`setOperator`](#setoperator)-এর মাধ্যমে একজন অপারেটরকে অনুমোদন বা বাতিল করা হয় তখন অবশ্যই এমিট করতে হবে।

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### প্রিভিউ ফাংশন {#preview-functions}

প্রিভিউ ফাংশনগুলোকে শুধুমাত্র সেই ফ্লো-গুলোর জন্য রিভার্ট করতে হবে যেগুলো অ্যাসিনক্রোনাস, কারণ রিকোয়েস্ট পূর্ণ না হওয়া পর্যন্ত এক্সচেঞ্জ রেট জানা যায় না। একটি অ্যাসিনক্রোনাস-ডিপোজিট ভল্টে, `previewDeposit` এবং `previewMint` অবশ্যই রিভার্ট করবে, যেখানে `previewRedeem` এবং `previewWithdraw` ERC-4626-এর মতোই কাজ করতে থাকবে (এবং একটি অ্যাসিনক্রোনাস-রিডিম ভল্টের ক্ষেত্রে এর বিপরীত)। এটি ERC-4626 থেকে একটি মূল আচরণগত পার্থক্য।

## আরও পড়ুন {#further-reading}

- [EIP-7540: অ্যাসিনক্রোনাস ERC-4626 টোকেনাইজড ভল্ট](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: টোকেনাইজড ভল্ট স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-4626)
- [ওপেনজেপেলিন ERC-7540 ইমপ্লিমেন্টেশন](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)