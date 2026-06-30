---
title: "অপটিমিজম স্ট্যান্ডার্ড সেতু কন্ট্রাক্ট ওয়াকথ্রু"
description: "অপটিমিজমের জন্য স্ট্যান্ডার্ড সেতু কীভাবে কাজ করে? এটি কেন এভাবে কাজ করে?"
author: "ওরি পোমেরান্টজ"
tags: ["Solidity", "সেতু", "লেয়ার ২"]
skill: intermediate
breadcrumb: "অপটিমিজম সেতু"
published: 2022-03-30
lang: bn
---

[অপটিমিজম](https://www.optimism.io/) হলো একটি [অপটিমিস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups/)।
অপটিমিস্টিক রোলআপ ইথেরিয়াম মেইননেট (যা লেয়ার ১ (l1) নামেও পরিচিত)-এর তুলনায় অনেক কম খরচে ট্রানজ্যাকশন প্রক্রিয়া করতে পারে কারণ নেটওয়ার্কের প্রতিটি নোডের পরিবর্তে শুধুমাত্র কয়েকটি নোড দ্বারা ট্রানজ্যাকশন প্রক্রিয়া করা হয়।
একই সময়ে, সমস্ত ডেটা l1-এ লেখা হয় যাতে মেইননেটের সমস্ত অখণ্ডতা এবং প্রাপ্যতার গ্যারান্টি সহ সবকিছু প্রমাণ এবং পুনর্গঠন করা যায়।

অপটিমিজম (বা অন্য কোনো লেয়ার ২ (l2))-এ l1 সম্পদ ব্যবহার করার জন্য, সম্পদগুলোকে [সেতু](/bridges/#prerequisites) করতে হবে।
এটি অর্জনের একটি উপায় হলো ব্যবহারকারীদের l1-এ সম্পদ (ETH এবং [ERC-20 টোকেন](/developers/docs/standards/tokens/erc-20/) সবচেয়ে সাধারণ) লক করা এবং l2-এ ব্যবহার করার জন্য সমতুল্য সম্পদ গ্রহণ করা।
পরিশেষে, যার কাছেই এগুলো থাকুক না কেন, সে হয়তো এগুলোকে আবার l1-এ সেতু করতে চাইতে পারে।
এটি করার সময়, সম্পদগুলো l2-এ পোড়ানো হয় এবং তারপর l1-এ ব্যবহারকারীর কাছে ফেরত দেওয়া হয়।

এভাবেই [অপটিমিজম স্ট্যান্ডার্ড সেতু](https://docs.optimism.io/app-developers/bridging/standard-bridge) কাজ করে।
এই নিবন্ধে আমরা সেই সেতুর সোর্স কোডটি পর্যালোচনা করব যাতে এটি কীভাবে কাজ করে তা দেখা যায় এবং এটিকে ভালোভাবে লেখা Solidity কোডের একটি উদাহরণ হিসেবে অধ্যয়ন করা যায়।

## কন্ট্রোল ফ্লো {#control-flows}

সেতুর দুটি প্রধান ফ্লো রয়েছে:

- জমা (l1 থেকে l2-এ)
- উত্তোলন (l2 থেকে l1-এ)

### জমা ফ্লো {#deposit-flow}

#### লেয়ার ১ {#deposit-flow-layer-1}

1. যদি একটি ERC-20 জমা করা হয়, তবে জমাকারী সেতুটিকে জমা করা পরিমাণ খরচ করার জন্য একটি অ্যালাউন্স দেয়
2. জমাকারী l1 সেতুকে কল করে (`depositERC20`, `depositERC20To`, `depositETH`, অথবা `depositETHTo`)
3. l1 সেতু সেতু করা সম্পদের দখল নেয়
   - ETH: কলটির অংশ হিসেবে জমাকারী দ্বারা সম্পদটি হস্তান্তর করা হয়
   - ERC-20: জমাকারীর দেওয়া অ্যালাউন্স ব্যবহার করে সেতুটি সম্পদটিকে নিজের কাছে হস্তান্তর করে
4. l1 সেতু l2 সেতুতে `finalizeDeposit` কল করার জন্য ক্রস-ডোমেইন বার্তা মেকানিজম ব্যবহার করে

#### লেয়ার ২ {#deposit-flow-layer-2}

5. l2 সেতু যাচাই করে যে `finalizeDeposit`-এ কলটি বৈধ:
   - ক্রস ডোমেইন বার্তা কন্ট্রাক্ট থেকে এসেছে
   - মূলত l1-এর সেতু থেকে এসেছে
6. l2 সেতু পরীক্ষা করে যে l2-এ ERC-20 টোকেন কন্ট্রাক্টটি সঠিক কিনা:
   - l2 কন্ট্রাক্ট রিপোর্ট করে যে এর l1 প্রতিপক্ষটি l1-এ যেখান থেকে টোকেনগুলো এসেছে তার মতোই
   - l2 কন্ট্রাক্ট রিপোর্ট করে যে এটি সঠিক ইন্টারফেস সমর্থন করে ([ERC-165 ব্যবহার করে](https://eips.ethereum.org/EIPS/eip-165))।
7. যদি l2 কন্ট্রাক্টটি সঠিক হয়, তবে উপযুক্ত ঠিকানায় উপযুক্ত সংখ্যক টোকেন মিন্ট করার জন্য এটিকে কল করুন। যদি তা না হয়, তবে ব্যবহারকারীকে l1-এ টোকেনগুলো দাবি করার অনুমতি দেওয়ার জন্য একটি উত্তোলন প্রক্রিয়া শুরু করুন।

### উত্তোলন ফ্লো {#withdrawal-flow}

#### লেয়ার ২ {#withdrawal-flow-layer-2}

1. উত্তোলনকারী l2 সেতুকে কল করে (`withdraw` অথবা `withdrawTo`)
2. l2 সেতু `msg.sender`-এর অন্তর্গত উপযুক্ত সংখ্যক টোকেন পোড়ানো সম্পন্ন করে
3. l2 সেতু l1 সেতুতে `finalizeETHWithdrawal` অথবা `finalizeERC20Withdrawal` কল করার জন্য ক্রস-ডোমেইন বার্তা মেকানিজম ব্যবহার করে

#### লেয়ার ১ {#withdrawal-flow-layer-1}

4. l1 সেতু যাচাই করে যে `finalizeETHWithdrawal` অথবা `finalizeERC20Withdrawal`-এ কলটি বৈধ:
   - ক্রস ডোমেইন বার্তা মেকানিজম থেকে এসেছে
   - মূলত l2-এর সেতু থেকে এসেছে
5. l1 সেতু উপযুক্ত সম্পদ (ETH বা ERC-20) উপযুক্ত ঠিকানায় হস্তান্তর করে

## লেয়ার ১ কোড {#layer-1-code}

এটি সেই কোড যা l1, ইথেরিয়াম মেইননেট-এ চলে।

### IL1ERC20Bridge {#il1erc20bridge}

[এই ইন্টারফেসটি এখানে সংজ্ঞায়িত করা হয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)।
এতে ERC-20 টোকেন সেতু করার জন্য প্রয়োজনীয় ফাংশন এবং সংজ্ঞা অন্তর্ভুক্ত রয়েছে।

```solidity
// SPDX-License-Identifier: MIT
```

[অপটিমিজমের বেশিরভাগ কোড MIT লাইসেন্সের অধীনে প্রকাশিত হয়](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)।

```solidity
pragma solidity >0.5.0 <0.9.0;
```

লেখার সময় Solidity-এর সর্বশেষ সংস্করণ হলো 0.8.12।
0.9.0 সংস্করণ প্রকাশিত না হওয়া পর্যন্ত, আমরা জানি না যে এই কোডটি এর সাথে সামঞ্জস্যপূর্ণ কিনা।

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * ইভেন্ট *
     **********/

    event ERC20DepositInitiated(
```

অপটিমিজম সেতু পরিভাষায় _জমা_ মানে l1 থেকে l2-এ হস্তান্তর, এবং _উত্তোলন_ মানে l2 থেকে l1-এ হস্তান্তর।

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

বেশিরভাগ ক্ষেত্রে l1-এ একটি ERC-20-এর ঠিকানা l2-এ সমতুল্য ERC-20-এর ঠিকানার সমান নয়।
[আপনি এখানে টোকেন ঠিকানাগুলোর তালিকা দেখতে পারেন](https://static.optimism.io/optimism.tokenlist.json)।
`chainId` 1 সহ ঠিকানাটি l1 (মেইননেট)-এ রয়েছে এবং `chainId` 10 সহ ঠিকানাটি l2 (অপটিমিজম)-এ রয়েছে।
অন্য দুটি `chainId` মান হলো Kovan টেস্ট নেটওয়ার্ক (42) এবং Optimistic Kovan টেস্ট নেটওয়ার্ক (69)-এর জন্য।

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

হস্তান্তরে নোট যোগ করা সম্ভব, সেক্ষেত্রে সেগুলো সেই ইভেন্টগুলোতে যোগ করা হয় যা তাদের রিপোর্ট করে।

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

একই সেতু কন্ট্রাক্ট উভয় দিকে হস্তান্তর পরিচালনা করে।
l1 সেতুর ক্ষেত্রে, এর অর্থ হলো জমার সূচনা এবং উত্তোলনের চূড়ান্তকরণ।

```solidity

    /********************
     * পাবলিক ফাংশন *
     ********************/

    /**
     * @dev সংশ্লিষ্ট লেয়ার ২ (l2) সেতু কন্ট্রাক্ট এর ঠিকানা পান।
     * @return সংশ্লিষ্ট লেয়ার ২ (l2) সেতু কন্ট্রাক্ট এর ঠিকানা।
     */
    function l2TokenBridge() external returns (address);
```

এই ফাংশনটির আসলে প্রয়োজন নেই, কারণ l2-এ এটি একটি প্রিডিপ্লয় করা কন্ট্রাক্ট, তাই এটি সর্বদা `0x4200000000000000000000000000000000000010` ঠিকানায় থাকে।
এটি এখানে l2 সেতুর সাথে সামঞ্জস্যের জন্য রয়েছে, কারণ l1 সেতুর ঠিকানা জানা _সহজ_ নয়।

```solidity
    /**
     * @dev লেয়ার ২ (l2) তে কলারের ব্যালেন্সে নির্দিষ্ট পরিমাণ ERC-20 জমা করুন।
     * @param _l1Token আমরা যে লেয়ার ১ (l1) ERC-20 জমা করছি তার ঠিকানা
     * @param _l2Token লেয়ার ১ (l1) এর নিজ নিজ লেয়ার ২ (l2) ERC-20 এর ঠিকানা
     * @param _amount জমা করার জন্য ERC-20 এর পরিমাণ
     * @param _l2Gas লেয়ার ২ (l2) তে জমা সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data লেয়ার ২ (l2) তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র
     *        বাহ্যিক কন্ট্রাক্ট এর সুবিধার জন্য প্রদান করা হয়। সর্বোচ্চ দৈর্ঘ্য
     *        প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি প্রদান করে না।
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` প্যারামিটারটি হলো l2 গ্যাস-এর পরিমাণ যা ট্রানজ্যাকশনটি খরচ করার অনুমতি পায়।
[একটি নির্দিষ্ট (উচ্চ) সীমা পর্যন্ত, এটি বিনামূল্যে](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), তাই মিন্টিং করার সময় ERC-20 কন্ট্রাক্টটি সত্যিই অদ্ভুত কিছু না করলে, এটি কোনো সমস্যা হওয়া উচিত নয়।
এই ফাংশনটি সাধারণ পরিস্থিতির যত্ন নেয়, যেখানে একজন ব্যবহারকারী একটি ভিন্ন ব্লকচেইন-এ একই ঠিকানায় সম্পদ সেতু করে।

```solidity
    /**
     * @dev লেয়ার ২ (l2) তে প্রাপকের ব্যালেন্সে নির্দিষ্ট পরিমাণ ERC-20 জমা করুন।
     * @param _l1Token আমরা যে লেয়ার ১ (l1) ERC-20 জমা করছি তার ঠিকানা
     * @param _l2Token লেয়ার ১ (l1) এর নিজ নিজ লেয়ার ২ (l2) ERC-20 এর ঠিকানা
     * @param _to লেয়ার ২ (l2) ঠিকানা যেখানে উত্তোলন ক্রেডিট করা হবে।
     * @param _amount জমা করার জন্য ERC-20 এর পরিমাণ।
     * @param _l2Gas লেয়ার ২ (l2) তে জমা সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data লেয়ার ২ (l2) তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র
     *        বাহ্যিক কন্ট্রাক্ট এর সুবিধার জন্য প্রদান করা হয়। সর্বোচ্চ দৈর্ঘ্য
     *        প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি প্রদান করে না।
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

এই ফাংশনটি প্রায় `depositERC20`-এর মতোই, তবে এটি আপনাকে একটি ভিন্ন ঠিকানায় ERC-20 পাঠাতে দেয়।

```solidity
    /*************************
     * ক্রস-চেইন ফাংশন *
     *************************/

    /**
     * @dev লেয়ার ২ (l2) থেকে লেয়ার ১ (l1) এ একটি উত্তোলন সম্পন্ন করুন এবং প্রাপকের লেয়ার ১ (l1) ERC-20 টোকেন
     * ব্যালেন্সে ফান্ড ক্রেডিট করুন।
     * লেয়ার ২ (l2) থেকে শুরু হওয়া উত্তোলন চূড়ান্ত না হলে এই কলটি ব্যর্থ হবে।
     *
     * @param _l1Token লেয়ার ১ (l1) টোকেনের ঠিকানা যার জন্য finalizeWithdrawal করা হবে।
     * @param _l2Token লেয়ার ২ (l2) টোকেনের ঠিকানা যেখানে উত্তোলন শুরু হয়েছিল।
     * @param _from লেয়ার ২ (l2) ঠিকানা যা হস্তান্তর শুরু করছে।
     * @param _to লেয়ার ১ (l1) ঠিকানা যেখানে উত্তোলন ক্রেডিট করা হবে।
     * @param _amount জমা করার জন্য ERC-20 এর পরিমাণ।
     * @param _data লেয়ার ২ (l2) তে প্রেরকের দ্বারা প্রদত্ত ডেটা। এই ডেটা শুধুমাত্র
     *   বাহ্যিক কন্ট্রাক্ট এর সুবিধার জন্য প্রদান করা হয়। সর্বোচ্চ দৈর্ঘ্য
     *   প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি প্রদান করে না。
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

অপটিমিজমে উত্তোলন (এবং l2 থেকে l1-এ অন্যান্য বার্তা) একটি দুই ধাপের প্রক্রিয়া:

1. l2-এ একটি সূচনাকারী ট্রানজ্যাকশন।
2. l1-এ একটি চূড়ান্তকরণ বা দাবি করার ট্রানজ্যাকশন।
   এই ট্রানজ্যাকশনটি l2 ট্রানজ্যাকশনের জন্য [ফল্ট চ্যালেঞ্জ পিরিয়ড](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) শেষ হওয়ার পরে ঘটতে হবে।

### IL1StandardBridge {#il1standardbridge}

[এই ইন্টারফেসটি এখানে সংজ্ঞায়িত করা হয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)।
এই ফাইলে ETH-এর জন্য ইভেন্ট এবং ফাংশনের সংজ্ঞা রয়েছে।
এই সংজ্ঞাগুলো ERC-20-এর জন্য উপরে `IL1ERC20Bridge`-এ সংজ্ঞায়িত করা সংজ্ঞাগুলোর মতোই।

সেতু ইন্টারফেসটি দুটি ফাইলের মধ্যে বিভক্ত কারণ কিছু ERC-20 টোকেনের কাস্টম প্রক্রিয়াকরণের প্রয়োজন হয় এবং স্ট্যান্ডার্ড সেতু দ্বারা পরিচালনা করা যায় না।
এভাবে কাস্টম সেতু যা এই ধরনের টোকেন পরিচালনা করে তা `IL1ERC20Bridge` বাস্তবায়ন করতে পারে এবং ETH সেতু করার প্রয়োজন হয় না।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * ইভেন্ট *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

এই ইভেন্টটি প্রায় ERC-20 সংস্করণের (`ERC20DepositInitiated`) মতোই, শুধুমাত্র l1 এবং l2 টোকেন ঠিকানাগুলো ছাড়া।
অন্যান্য ইভেন্ট এবং ফাংশনগুলোর ক্ষেত্রেও একই কথা প্রযোজ্য।

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * পাবলিক ফাংশন *
     ********************/

    /**
     * @dev লেয়ার ২ (l2) তে কলারের ব্যালেন্সে নির্দিষ্ট পরিমাণ ETH জমা করুন।
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev লেয়ার ২ (l2) তে প্রাপকের ব্যালেন্সে নির্দিষ্ট পরিমাণ ETH জমা করুন।
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * ক্রস-চেইন ফাংশন *
     *************************/

    /**
     * @dev লেয়ার ২ (l2) থেকে লেয়ার ১ (l1) এ একটি উত্তোলন সম্পন্ন করুন এবং প্রাপকের লেয়ার ১ (l1) ETH টোকেন
     * ব্যালেন্সে ফান্ড ক্রেডিট করুন। যেহেতু শুধুমাত্র xDomainMessenger এই ফাংশনটি কল করতে পারে, তাই উত্তোলন চূড়ান্ত হওয়ার আগে
     * এটি কখনই কল করা হবে না।
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

অন্য লেয়ারে বার্তা পাঠানোর জন্য [এই কন্ট্রাক্টটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) উভয় সেতু ([l1](#the-l1-bridge-contract) এবং [l2](#l2-bridge-code)) দ্বারা ইনহেরিট করা হয়।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* ইন্টারফেস ইমপোর্ট */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) ক্রস ডোমেইন মেসেঞ্জার ব্যবহার করে অন্য লেয়ারে কীভাবে বার্তা পাঠাতে হয় তা কন্ট্রাক্টকে বলে।
এই ক্রস ডোমেইন মেসেঞ্জারটি সম্পূর্ণ অন্য একটি সিস্টেম, এবং এর নিজস্ব একটি নিবন্ধ প্রাপ্য, যা আমি ভবিষ্যতে লেখার আশা করি।

```solidity
/**
 * @title CrossDomainEnabled
 * @dev ক্রস-ডোমেইন যোগাযোগ সম্পাদনকারী কন্ট্রাক্ট এর জন্য হেল্পার কন্ট্রাক্ট
 *
 * ব্যবহৃত কম্পাইলার: ইনহেরিটিং কন্ট্রাক্ট দ্বারা সংজ্ঞায়িত
 */
contract CrossDomainEnabled {
    /*************
     * ভেরিয়েবল *
     *************/

    // অন্য ডোমেইন থেকে বার্তা পাঠাতে এবং গ্রহণ করতে ব্যবহৃত মেসেঞ্জার কন্ট্রাক্ট।
    address public messenger;

    /***************
     * কনস্ট্রাক্টর *
     ***************/

    /**
     * @param _messenger বর্তমান লেয়ারে CrossDomainMessenger এর ঠিকানা।
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

কন্ট্রাক্টটির যে একটি প্যারামিটার জানা দরকার, তা হলো এই লেয়ারে ক্রস ডোমেইন মেসেঞ্জারের ঠিকানা।
এই প্যারামিটারটি কনস্ট্রাক্টর-এ একবার সেট করা হয় এবং কখনও পরিবর্তন হয় না।

```solidity

    /**********************
     * ফাংশন মডিফায়ার *
     **********************/

    /**
     * এটি নিশ্চিত করে যে মডিফাইড ফাংশনটি শুধুমাত্র একটি নির্দিষ্ট ক্রস-ডোমেইন অ্যাকাউন্ট দ্বারা কল করা যেতে পারে।
     * @param _sourceDomainAccount মূল ডোমেইনের একমাত্র অ্যাকাউন্ট যা
     *  এই ফাংশনটি কল করার জন্য প্রমাণীকৃত।
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

ক্রস ডোমেইন মেসেজিং ব্লকচেইন-এ চলমান যেকোনো কন্ট্রাক্ট দ্বারা অ্যাক্সেসযোগ্য (ইথেরিয়াম মেইননেট বা অপটিমিজম)।
তবে আমাদের প্রতিটি দিকের সেতুর জন্য _শুধুমাত্র_ নির্দিষ্ট বার্তাগুলোকে বিশ্বাস করা প্রয়োজন যদি সেগুলো অন্য দিকের সেতু থেকে আসে।

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

শুধুমাত্র উপযুক্ত ক্রস ডোমেইন মেসেঞ্জার (`messenger`, যেমন আপনি নিচে দেখতে পাচ্ছেন) থেকে আসা বার্তাগুলোকে বিশ্বাস করা যেতে পারে।

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

ক্রস ডোমেইন মেসেঞ্জার অন্য লেয়ারের সাথে বার্তা পাঠানো ঠিকানাটি যেভাবে প্রদান করে তা হলো [`.xDomainMessageSender()` ফাংশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)।
যতক্ষণ এটি বার্তা দ্বারা সূচিত ট্রানজ্যাকশনে কল করা হয়, এটি এই তথ্য প্রদান করতে পারে।

আমাদের নিশ্চিত করতে হবে যে আমরা যে বার্তাটি পেয়েছি তা অন্য সেতু থেকে এসেছে।

```solidity

        _;
    }

    /**********************
     * ইন্টারনাল ফাংশন *
     **********************/

    /**
     * মেসেঞ্জার পায়, সাধারণত স্টোরেজ থেকে। যদি কোনো চাইল্ড কন্ট্রাক্ট এর
     * ওভাররাইড করার প্রয়োজন হয় তবে এই ফাংশনটি এক্সপোজ করা হয়।
     * @return ক্রস-ডোমেইন মেসেঞ্জার কন্ট্রাক্ট এর ঠিকানা যা ব্যবহার করা উচিত।
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

এই ফাংশনটি ক্রস ডোমেইন মেসেঞ্জার রিটার্ন করে।
আমরা `messenger` ভেরিয়েবলের পরিবর্তে একটি ফাংশন ব্যবহার করি যাতে এই কন্ট্রাক্ট থেকে ইনহেরিট করা কন্ট্রাক্টগুলো কোন ক্রস ডোমেইন মেসেঞ্জার ব্যবহার করতে হবে তা নির্দিষ্ট করার জন্য একটি অ্যালগরিদম ব্যবহার করতে পারে।

```solidity

    /**
     * অন্য ডোমেইনের একটি অ্যাকাউন্টে একটি বার্তা পাঠায়
     * @param _crossDomainTarget গন্তব্য ডোমেইনে উদ্দিষ্ট প্রাপক
     * @param _message টার্গেটে পাঠানোর জন্য ডেটা (সাধারণত `onlyFromCrossDomainAccount()` সহ
     *  একটি ফাংশনে কল ডেটা)
     * @param _gasLimit টার্গেট ডোমেইনে বার্তা প্রাপ্তির জন্য গ্যাস লিমিট।
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

অবশেষে, সেই ফাংশন যা অন্য লেয়ারে একটি বার্তা পাঠায়।

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[স্লিদার](https://github.com/crytic/slither) হলো একটি স্ট্যাটিক অ্যানালাইজার যা অপটিমিজম প্রতিটি কন্ট্রাক্টে দুর্বলতা এবং অন্যান্য সম্ভাব্য সমস্যা খোঁজার জন্য চালায়।
এক্ষেত্রে, নিচের লাইনটি দুটি দুর্বলতা ট্রিগার করে:

1. [রিএন্ট্রান্সি ইভেন্ট](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [বিনাইন রিএন্ট্রান্সি](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

এক্ষেত্রে আমরা রিএন্ট্রান্সি নিয়ে চিন্তিত নই, আমরা জানি `getCrossDomainMessenger()` একটি বিশ্বস্ত ঠিকানা রিটার্ন করে, যদিও স্লিদার-এর তা জানার কোনো উপায় নেই।

### l1 সেতু কন্ট্রাক্ট {#the-l1-bridge-contract}

[এই কন্ট্রাক্টের সোর্স কোড এখানে রয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

ইন্টারফেসগুলো অন্যান্য কন্ট্রাক্টের অংশ হতে পারে, তাই তাদের বিভিন্ন ধরনের Solidity সংস্করণ সমর্থন করতে হবে।
তবে সেতুটি নিজেই আমাদের কন্ট্রাক্ট, এবং এটি কোন Solidity সংস্করণ ব্যবহার করে সে সম্পর্কে আমরা কঠোর হতে পারি।

```solidity
/* ইন্টারফেস ইমপোর্ট */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) এবং [IL1StandardBridge](#il1standardbridge) উপরে ব্যাখ্যা করা হয়েছে।

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) আমাদের l2-এ স্ট্যান্ডার্ড সেতু নিয়ন্ত্রণ করার জন্য বার্তা তৈরি করতে দেয়।

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[এই ইন্টারফেসটি](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) আমাদের ERC-20 কন্ট্রাক্ট নিয়ন্ত্রণ করতে দেয়।
[আপনি এখানে এটি সম্পর্কে আরও পড়তে পারেন](/developers/tutorials/erc20-annotated-code/#the-interface)।

```solidity
/* লাইব্রেরি ইমপোর্ট */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[উপরে ব্যাখ্যা করা হয়েছে](#crossdomainenabled), এই কন্ট্রাক্টটি ইন্টারলেয়ার মেসেজিংয়ের জন্য ব্যবহৃত হয়।

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)-এ l2 কন্ট্রাক্টগুলোর ঠিকানা রয়েছে যার সর্বদা একই ঠিকানা থাকে। এর মধ্যে l2-এর স্ট্যান্ডার্ড সেতু অন্তর্ভুক্ত রয়েছে।

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[ওপেনজেপেলিন-এর ঠিকানা ইউটিলিটি](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)। এটি কন্ট্রাক্ট ঠিকানা এবং এক্সটার্নালি ওনড অ্যাকাউন্ট (EOA)-এর অন্তর্গত ঠিকানাগুলোর মধ্যে পার্থক্য করতে ব্যবহৃত হয়।

মনে রাখবেন যে এটি একটি নিখুঁত সমাধান নয়, কারণ সরাসরি কল এবং কন্ট্রাক্টের কনস্ট্রাক্টর থেকে করা কলগুলোর মধ্যে পার্থক্য করার কোনো উপায় নেই, তবে অন্তত এটি আমাদের কিছু সাধারণ ব্যবহারকারীর ত্রুটি শনাক্ত করতে এবং প্রতিরোধ করতে দেয়।

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20) একটি কন্ট্রাক্টের ব্যর্থতা রিপোর্ট করার দুটি উপায় সমর্থন করে:

1. রিভার্ট
2. `false` রিটার্ন করা

উভয় ক্ষেত্র পরিচালনা করা আমাদের কোডকে আরও জটিল করে তুলবে, তাই এর পরিবর্তে আমরা [ওপেনজেপেলিন-এর `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) ব্যবহার করি, যা নিশ্চিত করে যে [সমস্ত ব্যর্থতার ফলে একটি রিভার্ট হয়](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)।

```solidity
/**
 * @title L1StandardBridge
 * @dev লেয়ার ১ (l1) ETH এবং ERC-20 সেতু হলো এমন একটি কন্ট্রাক্ট যা জমা করা লেয়ার ১ (l1) ফান্ড এবং স্ট্যান্ডার্ড
 * টোকেনগুলো সংরক্ষণ করে যা লেয়ার ২ (l2) তে ব্যবহৃত হচ্ছে। এটি একটি সংশ্লিষ্ট লেয়ার ২ (l2) সেতু সিঙ্ক্রোনাইজ করে, এটিকে জমা সম্পর্কে অবহিত করে
 * এবং নতুন চূড়ান্ত হওয়া উত্তোলনগুলোর জন্য এটি শোনে।
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

এই লাইনটি হলো আমরা কীভাবে প্রতিবার `IERC20` ইন্টারফেস ব্যবহার করার সময় `SafeERC20` র‍্যাপার ব্যবহার করার নির্দেশ দিই।

```solidity

    /********************************
     * এক্সটার্নাল কন্ট্রাক্ট রেফারেন্স *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code)-এর ঠিকানা।

```solidity

    // জমা করা লেয়ার ১ (l1) টোকেনের ব্যালেন্সে লেয়ার ১ (l1) টোকেন থেকে লেয়ার ২ (l2) টোকেন ম্যাপ করে
    mapping(address => mapping(address => uint256)) public deposits;
```

এরকম একটি ডাবল [ম্যাপিং](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) হলো একটি [দ্বিমাত্রিক স্পার্স অ্যারে](https://en.wikipedia.org/wiki/Sparse_matrix) সংজ্ঞায়িত করার উপায়।
এই ডেটা স্ট্রাকচারের মানগুলো `deposit[L1 token addr][L2 token addr]` হিসেবে চিহ্নিত করা হয়।
ডিফল্ট মান হলো শূন্য।
শুধুমাত্র যে সেলগুলো একটি ভিন্ন মানে সেট করা আছে সেগুলো স্টোরেজে লেখা হয়।

```solidity

    /***************
     * কনস্ট্রাক্টর *
     ***************/

    // এই কন্ট্রাক্ট একটি প্রক্সির পিছনে থাকে, তাই কনস্ট্রাক্টর প্যারামিটারগুলো অব্যবহৃত থাকবে।
    constructor() CrossDomainEnabled(address(0)) {}
```

স্টোরেজের সমস্ত ভেরিয়েবল কপি না করেই এই কন্ট্রাক্টটি আপগ্রেড করতে সক্ষম হতে চাই।
এটি করার জন্য আমরা একটি [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) ব্যবহার করি, একটি কন্ট্রাক্ট যা [`delegatecall`](https://solidity-by-example.org/delegatecall/) ব্যবহার করে কলগুলোকে একটি পৃথক কন্ট্রাক্টে হস্তান্তর করে যার ঠিকানা প্রক্সি চুক্তি দ্বারা সংরক্ষিত থাকে (যখন আপনি আপগ্রেড করেন তখন আপনি প্রক্সিকে সেই ঠিকানা পরিবর্তন করতে বলেন)।
যখন আপনি `delegatecall` ব্যবহার করেন তখন স্টোরেজটি _কলিং_ কন্ট্রাক্টের স্টোরেজ হিসেবেই থাকে, তাই সমস্ত কন্ট্রাক্ট স্টেট ভেরিয়েবলের মানগুলো প্রভাবিত হয় না।

এই প্যাটার্নের একটি প্রভাব হলো যে কন্ট্রাক্টটি `delegatecall`-এর _কলড_ তার স্টোরেজ ব্যবহৃত হয় না এবং তাই এতে পাস করা কনস্ট্রাক্টর মানগুলো কোনো ব্যাপার না।
এ কারণেই আমরা `CrossDomainEnabled` কনস্ট্রাক্টর-এ একটি অর্থহীন মান প্রদান করতে পারি।
এটিও একটি কারণ যে নিচের ইনিশিয়ালাইজেশনটি কনস্ট্রাক্টর থেকে আলাদা।

```solidity
    /******************
     * ইনিশিয়ালাইজেশন *
     ******************/

    /**
     * @param _l1messenger লেয়ার ১ (l1) মেসেঞ্জার ঠিকানা যা ক্রস-চেইন যোগাযোগের জন্য ব্যবহৃত হচ্ছে।
     * @param _l2TokenBridge লেয়ার ২ (l2) স্ট্যান্ডার্ড সেতু ঠিকানা।
     */
    // slither-disable-next-line external-function
```

এই [স্লিদার পরীক্ষা](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) এমন ফাংশনগুলো শনাক্ত করে যা কন্ট্রাক্ট কোড থেকে কল করা হয় না এবং তাই `public`-এর পরিবর্তে `external` ঘোষণা করা যেতে পারে।
`external` ফাংশনগুলোর গ্যাস খরচ কম হতে পারে, কারণ সেগুলোকে কল ডেটা-তে প্যারামিটার প্রদান করা যেতে পারে।
`public` ঘোষিত ফাংশনগুলোকে কন্ট্রাক্টের ভেতর থেকে অ্যাক্সেসযোগ্য হতে হবে।
কন্ট্রাক্টগুলো তাদের নিজস্ব কল ডেটা পরিবর্তন করতে পারে না, তাই প্যারামিটারগুলোকে মেমরিতে থাকতে হবে।
যখন এই ধরনের একটি ফাংশন বাহ্যিকভাবে কল করা হয়, তখন কল ডেটা মেমরিতে কপি করা প্রয়োজন, যার জন্য গ্যাস খরচ হয়।
এক্ষেত্রে ফাংশনটি শুধুমাত্র একবার কল করা হয়, তাই অদক্ষতা আমাদের কাছে কোনো ব্যাপার না।

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` ফাংশনটি শুধুমাত্র একবার কল করা উচিত।
যদি l1 ক্রস ডোমেইন মেসেঞ্জার বা l2 টোকেন সেতুর ঠিকানা পরিবর্তন হয়, তবে আমরা একটি নতুন প্রক্সি এবং একটি নতুন সেতু তৈরি করি যা এটিকে কল করে।
সম্পূর্ণ সিস্টেম আপগ্রেড করা ছাড়া এটি ঘটার সম্ভাবনা কম, যা একটি খুব বিরল ঘটনা।

মনে রাখবেন যে এই ফাংশনে এমন কোনো মেকানিজম নেই যা সীমাবদ্ধ করে যে _কে_ এটিকে কল করতে পারে।
এর মানে হলো তাত্ত্বিকভাবে একজন আক্রমণকারী অপেক্ষা করতে পারে যতক্ষণ না আমরা প্রক্সি এবং সেতুর প্রথম সংস্করণ ডিপ্লয় করা সম্পন্ন করি এবং তারপর বৈধ ব্যবহারকারীর আগে `initialize` ফাংশনে পৌঁছানোর জন্য [ফ্রন্ট-রানিং](https://solidity-by-example.org/hacks/front-running/) করতে পারে। তবে এটি প্রতিরোধ করার দুটি পদ্ধতি রয়েছে:

1. যদি কন্ট্রাক্টগুলো সরাসরি কোনো EOA দ্বারা ডিপ্লয় করা না হয় বরং [এমন একটি ট্রানজ্যাকশনে হয় যেখানে অন্য একটি কন্ট্রাক্ট সেগুলো তৈরি করে](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) তবে সম্পূর্ণ প্রক্রিয়াটি অ্যাটমিক হতে পারে এবং অন্য কোনো ট্রানজ্যাকশন কার্যকর হওয়ার আগেই শেষ হতে পারে।
2. যদি `initialize`-এ বৈধ কলটি ব্যর্থ হয় তবে নতুন তৈরি করা প্রক্সি এবং সেতুকে উপেক্ষা করা এবং নতুনগুলো তৈরি করা সর্বদা সম্ভব।

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

এই দুটি প্যারামিটার সেতুর জানা প্রয়োজন।

```solidity

    /**************
     * জমা করা *
     **************/

    /** @dev মডিফায়ার যার জন্য প্রেরককে EOA হতে রিকোয়ার করে। এই চেকটি একটি ক্ষতিকারক
     *  কন্ট্রাক্ট দ্বারা initcode এর মাধ্যমে বাইপাস করা যেতে পারে, তবে এটি ব্যবহারকারীর ত্রুটির যত্ন নেয় যা আমরা এড়াতে চাই।
     */
    modifier onlyEOA() {
        // কন্ট্রাক্ট থেকে জমা বন্ধ করতে ব্যবহৃত হয় (দুর্ঘটনাবশত হারিয়ে যাওয়া টোকেন এড়াতে)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

এ কারণেই আমাদের ওপেনজেপেলিন-এর `Address` ইউটিলিটিগুলোর প্রয়োজন ছিল।

```solidity
    /**
     * @dev লেয়ার ২ (l2) তে কলারের ব্যালেন্সে নির্দিষ্ট পরিমাণ ETH জমা করতে
     * এই ফাংশনটি কোনো ডেটা ছাড়াই কল করা যেতে পারে।
     * যেহেতু রিসিভ ফাংশন ডেটা নেয় না, তাই একটি রক্ষণশীল
     * ডিফল্ট পরিমাণ লেয়ার ২ (l2) তে ফরোয়ার্ড করা হয়।
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

এই ফাংশনটি পরীক্ষার উদ্দেশ্যে বিদ্যমান।
লক্ষ্য করুন যে এটি ইন্টারফেস সংজ্ঞায় উপস্থিত নেই - এটি সাধারণ ব্যবহারের জন্য নয়।

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

এই দুটি ফাংশন হলো `_initiateETHDeposit`-এর চারপাশের র‍্যাপার, যে ফাংশনটি প্রকৃত ETH জমা পরিচালনা করে।

```solidity
    /**
     * @dev ETH সংরক্ষণ করে এবং লেয়ার ২ (l2) ETH গেটওয়েকে জমা সম্পর্কে অবহিত করে
     * জমার জন্য লজিক সম্পাদন করে।
     * @param _from লেয়ার ১ (l1) এ যে অ্যাকাউন্ট থেকে জমা নেওয়া হবে।
     * @param _to লেয়ার ২ (l2) তে যে অ্যাকাউন্টে জমা দেওয়া হবে।
     * @param _l2Gas লেয়ার ২ (l2) তে জমা সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data লেয়ার ২ (l2) তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র
     *        বাহ্যিক কন্ট্রাক্ট এর সুবিধার জন্য প্রদান করা হয়। সর্বোচ্চ দৈর্ঘ্য
     *        প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি প্রদান করে না।
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit কলের জন্য কল ডেটা তৈরি করুন
        bytes memory message = abi.encodeWithSelector(
```

ক্রস ডোমেইন বার্তাগুলো যেভাবে কাজ করে তা হলো গন্তব্য কন্ট্রাক্টটিকে বার্তাটিকে এর কল ডেটা হিসেবে দিয়ে কল করা হয়।
Solidity কন্ট্রাক্টগুলো সর্বদা তাদের কল ডেটা ব্যাখ্যা করে
[ABI স্পেসিফিকেশন](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) অনুসারে।
Solidity ফাংশন [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) সেই কল ডেটা তৈরি করে।

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

এখানে বার্তাটি হলো এই প্যারামিটারগুলোর সাথে [`finalizeDeposit` ফাংশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) কল করা:

| প্যারামিটার | মান | অর্থ |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | l1-এ ETH (যা কোনো ERC-20 টোকেন নয়)-এর জন্য বিশেষ মান |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | l2 কন্ট্রাক্ট যা অপটিমিজমে ETH পরিচালনা করে, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (এই কন্ট্রাক্টটি শুধুমাত্র অভ্যন্তরীণ অপটিমিজম ব্যবহারের জন্য) |
| \_from | \_from | l1-এর ঠিকানা যা ETH পাঠায় |
| \_to | \_to | l2-এর ঠিকানা যা ETH গ্রহণ করে |
| amount | msg.value | পাঠানো Wei-এর পরিমাণ (যা ইতিমধ্যে সেতুতে পাঠানো হয়েছে) |
| \_data | \_data | জমার সাথে সংযুক্ত করার জন্য অতিরিক্ত ডেটা |

```solidity
        // লেয়ার ২ (l2) তে কল ডেটা পাঠান
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

ক্রস ডোমেইন মেসেঞ্জারের মাধ্যমে বার্তাটি পাঠান।

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

এই হস্তান্তরের কথা শোনে এমন যেকোনো বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp)-কে জানানোর জন্য একটি ইভেন্ট এমিট করুন।

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

এই দুটি ফাংশন হলো `_initiateERC20Deposit`-এর চারপাশের র‍্যাপার, যে ফাংশনটি প্রকৃত ERC-20 জমা পরিচালনা করে।

```solidity
    /**
     * @dev লেয়ার ২ (l2) জমাকৃত টোকেন কন্ট্রাক্টকে জমা সম্পর্কে অবহিত করে এবং লেয়ার ১ (l1) ফান্ড লক করার জন্য একটি হ্যান্ডলার কল করে জমার জন্য লজিক সম্পাদন করে। (যেমন, transferFrom)
     *
     * @param _l1Token আমরা যে লেয়ার ১ (l1) ERC-20 জমা করছি তার ঠিকানা
     * @param _l2Token লেয়ার ১ (l1) এর নিজ নিজ লেয়ার ২ (l2) ERC-20 এর ঠিকানা
     * @param _from লেয়ার ১ (l1) এ যে অ্যাকাউন্ট থেকে জমা নেওয়া হবে
     * @param _to লেয়ার ২ (l2) তে যে অ্যাকাউন্টে জমা দেওয়া হবে
     * @param _amount জমা করার জন্য ERC-20 এর পরিমাণ।
     * @param _l2Gas লেয়ার ২ (l2) তে জমা সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data লেয়ার ২ (l2) তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র
     *        বাহ্যিক কন্ট্রাক্ট এর সুবিধার জন্য প্রদান করা হয়। সর্বোচ্চ দৈর্ঘ্য
     *        প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি প্রদান করে না।
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

এই ফাংশনটি উপরের `_initiateETHDeposit`-এর মতোই, তবে কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে।
প্রথম পার্থক্য হলো এই ফাংশনটি টোকেন ঠিকানা এবং হস্তান্তরের পরিমাণ প্যারামিটার হিসেবে গ্রহণ করে।
ETH-এর ক্ষেত্রে সেতুতে কল করার সময় ইতিমধ্যে সেতু অ্যাকাউন্টে সম্পদ হস্তান্তর অন্তর্ভুক্ত থাকে (`msg.value`)।

```solidity
        // যখন লেয়ার ১ (l1) এ একটি জমা শুরু হয়, তখন লেয়ার ১ (l1) সেতু ভবিষ্যতের জন্য ফান্ডগুলো নিজের কাছে হস্তান্তর করে
        // উত্তোলন। safeTransferFrom কন্ট্রাক্ট এর কোড আছে কিনা তাও চেক করে, তাই এটি ব্যর্থ হবে যদি
        // _from একটি EOA বা ঠিকানা(0) হয়।
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 টোকেন হস্তান্তর ETH থেকে একটি ভিন্ন প্রক্রিয়া অনুসরণ করে:

1. ব্যবহারকারী (`_from`) উপযুক্ত টোকেন হস্তান্তর করার জন্য সেতুটিকে একটি অ্যালাউন্স দেয়।
2. ব্যবহারকারী টোকেন কন্ট্রাক্টের ঠিকানা, পরিমাণ ইত্যাদি দিয়ে সেতুটিকে কল করে।
3. সেতুটি জমা প্রক্রিয়ার অংশ হিসেবে টোকেনগুলো (নিজের কাছে) হস্তান্তর করে।

প্রথম ধাপটি শেষ দুটির থেকে একটি পৃথক ট্রানজ্যাকশনে ঘটতে পারে।
যাইহোক, ফ্রন্ট-রানিং কোনো সমস্যা নয় কারণ যে দুটি ফাংশন `_initiateERC20Deposit` (`depositERC20` এবং `depositERC20To`) কল করে তারা শুধুমাত্র `msg.sender`-কে `_from` প্যারামিটার হিসেবে দিয়ে এই ফাংশনটিকে কল করে।

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) এর জন্য কল ডেটা তৈরি করুন
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // লেয়ার ২ (l2) তে কল ডেটা পাঠান
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

জমা করা টোকেনের পরিমাণ `deposits` ডেটা স্ট্রাকচারে যোগ করুন।
l2-এ একাধিক ঠিকানা থাকতে পারে যা একই l1 ERC-20 টোকেনের সাথে মিলে যায়, তাই জমার ট্র্যাক রাখার জন্য l1 ERC-20 টোকেনের সেতুর ব্যালেন্স ব্যবহার করা যথেষ্ট নয়।

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * ক্রস-চেইন ফাংশন *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

l2 সেতু l2 ক্রস ডোমেইন মেসেঞ্জারে একটি বার্তা পাঠায় যার ফলে l1 ক্রস ডোমেইন মেসেঞ্জার এই ফাংশনটিকে কল করে (অবশ্যই একবার [যে ট্রানজ্যাকশনটি বার্তাটিকে চূড়ান্ত করে](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) তা l1-এ জমা দেওয়ার পরে)।

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

নিশ্চিত করুন যে এটি একটি _বৈধ_ বার্তা, যা ক্রস ডোমেইন মেসেঞ্জার থেকে আসছে এবং l2 টোকেন সেতু থেকে উদ্ভূত হয়েছে।
এই ফাংশনটি সেতু থেকে ETH উত্তোলন করতে ব্যবহৃত হয়, তাই আমাদের নিশ্চিত করতে হবে যে এটি শুধুমাত্র অনুমোদিত কলার দ্বারা কল করা হয়েছে।

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH হস্তান্তর করার উপায় হলো `msg.value`-এ Wei-এর পরিমাণ সহ প্রাপককে কল করা।

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

উত্তোলন সম্পর্কে একটি ইভেন্ট এমিট করুন।

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

এই ফাংশনটি উপরের `finalizeETHWithdrawal`-এর মতোই, তবে ERC-20 টোকেনের জন্য প্রয়োজনীয় পরিবর্তনগুলো রয়েছে।

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` ডেটা স্ট্রাকচার আপডেট করুন।

```solidity

        // যখন লেয়ার ১ (l1) এ একটি উত্তোলন চূড়ান্ত হয়, তখন লেয়ার ১ (l1) সেতু উত্তোলনকারীর কাছে ফান্ড হস্তান্তর করে
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * অস্থায়ী - ETH মাইগ্রেট করা হচ্ছে *
     *****************************/

    /**
     * @dev অ্যাকাউন্টে ETH ব্যালেন্স যোগ করে। এটি একটি পুরানো গেটওয়ে থেকে একটি নতুন গেটওয়েতে ETH
     * মাইগ্রেট করার অনুমতি দেওয়ার জন্য বোঝানো হয়েছে।
     * দ্রষ্টব্য: এটি শুধুমাত্র একটি আপগ্রেডের জন্য রাখা হয়েছে যাতে আমরা পুরানো কন্ট্রাক্ট থেকে
     * মাইগ্রেট করা ETH গ্রহণ করতে পারি
     */
    function donateETH() external payable {}
}
```

সেতুর একটি পূর্ববর্তী বাস্তবায়ন ছিল।
যখন আমরা সেই বাস্তবায়ন থেকে এটিতে চলে আসি, তখন আমাদের সমস্ত সম্পদ সরাতে হয়েছিল।
ERC-20 টোকেনগুলো সহজেই সরানো যেতে পারে।
যাইহোক, একটি কন্ট্রাক্টে ETH হস্তান্তর করার জন্য আপনার সেই কন্ট্রাক্টের অনুমোদন প্রয়োজন, যা `donateETH` আমাদের প্রদান করে।

## l2-এ ERC-20 টোকেন {#erc-20-tokens-on-l2}

একটি ERC-20 টোকেনকে স্ট্যান্ডার্ড সেতুতে ফিট করার জন্য, এটিকে স্ট্যান্ডার্ড সেতুকে এবং _শুধুমাত্র_ স্ট্যান্ডার্ড সেতুকে টোকেন মিন্ট করার অনুমতি দিতে হবে।
এটি প্রয়োজনীয় কারণ সেতুগুলোকে নিশ্চিত করতে হবে যে অপটিমিজমে সঞ্চালিত টোকেনের সংখ্যা l1 সেতু কন্ট্রাক্টের ভেতরে লক করা টোকেনের সংখ্যার সমান।
যদি l2-এ খুব বেশি টোকেন থাকে তবে কিছু ব্যবহারকারী তাদের সম্পদগুলো আবার l1-এ সেতু করতে অক্ষম হবে।
একটি বিশ্বস্ত সেতুর পরিবর্তে, আমরা মূলত [ফ্র্যাকশনাল রিজার্ভ ব্যাংকিং](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) পুনরায় তৈরি করব।
যদি l1-এ খুব বেশি টোকেন থাকে, তবে সেই টোকেনগুলোর কিছু চিরকালের জন্য সেতু কন্ট্রাক্টের ভেতরে লক করা থাকবে কারণ l2 টোকেন পোড়ানো ছাড়া সেগুলোকে মুক্ত করার কোনো উপায় নেই।

### IL2StandardERC20 {#il2standarderc20}

l2-এ প্রতিটি ERC-20 টোকেন যা স্ট্যান্ডার্ড সেতু ব্যবহার করে তাকে [এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) প্রদান করতে হবে, যার মধ্যে স্ট্যান্ডার্ড সেতুর প্রয়োজনীয় ফাংশন এবং ইভেন্টগুলো রয়েছে।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[স্ট্যান্ডার্ড ERC-20 ইন্টারফেস](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)-এ `mint` এবং `burn` ফাংশনগুলো অন্তর্ভুক্ত নেই।
এই পদ্ধতিগুলো [ERC-20 স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20) দ্বারা প্রয়োজনীয় নয়, যা টোকেন তৈরি এবং ধ্বংস করার মেকানিজমগুলোকে অনির্দিষ্ট রাখে।

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

একটি কন্ট্রাক্ট কী কী ফাংশন প্রদান করে তা নির্দিষ্ট করতে [ERC-165 ইন্টারফেস](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) ব্যবহৃত হয়।
[আপনি এখানে স্ট্যান্ডার্ডটি পড়তে পারেন](https://eips.ethereum.org/EIPS/eip-165)।

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

এই ফাংশনটি l1 টোকেনের ঠিকানা প্রদান করে যা এই কন্ট্রাক্টে সেতু করা হয়েছে।
মনে রাখবেন যে বিপরীত দিকে আমাদের অনুরূপ কোনো ফাংশন নেই।
আমাদের যেকোনো l1 টোকেন সেতু করতে সক্ষম হতে হবে, এটি বাস্তবায়নের সময় l2 সমর্থন করার পরিকল্পনা করা হয়েছিল কি না তা নির্বিশেষে।

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

টোকেন মিন্ট (তৈরি) এবং পোড়ানো (ধ্বংস) করার জন্য ফাংশন এবং ইভেন্ট।
টোকেনের সংখ্যা সঠিক (l1-এ লক করা টোকেনের সংখ্যার সমান) তা নিশ্চিত করার জন্য সেতুটিই একমাত্র সত্তা হওয়া উচিত যা এই ফাংশনগুলো চালাতে পারে।

### L2StandardERC20 {#l2standarderc20}

[এটি হলো `IL2StandardERC20` ইন্টারফেসের আমাদের বাস্তবায়ন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)।
আপনার যদি কোনো ধরনের কাস্টম লজিকের প্রয়োজন না হয়, তবে আপনার এটি ব্যবহার করা উচিত।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[ওপেনজেপেলিন ERC-20 কন্ট্রাক্ট](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)।
অপটিমিজম চাকা পুনরায় আবিষ্কার করায় বিশ্বাস করে না, বিশেষ করে যখন চাকাটি ভালোভাবে অডিট করা হয় এবং সম্পদ ধরে রাখার জন্য যথেষ্ট বিশ্বস্ত হওয়া প্রয়োজন।

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

এই দুটি অতিরিক্ত কনফিগারেশন প্যারামিটার আমাদের প্রয়োজন যা ERC-20-এর সাধারণত প্রয়োজন হয় না।

```solidity

    /**
     * @param _l2Bridge লেয়ার ২ (l2) স্ট্যান্ডার্ড সেতু এর ঠিকানা।
     * @param _l1Token সংশ্লিষ্ট লেয়ার ১ (l1) টোকেনের ঠিকানা।
     * @param _name ERC-20 নাম।
     * @param _symbol ERC-20 প্রতীক。
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

প্রথমে আমরা যে কন্ট্রাক্ট থেকে ইনহেরিট করি তার জন্য কনস্ট্রাক্টর কল করুন (`ERC20(_name, _symbol)`) এবং তারপর আমাদের নিজস্ব ভেরিয়েবলগুলো সেট করুন।

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

এভাবেই [ERC-165](https://eips.ethereum.org/EIPS/eip-165) কাজ করে।
প্রতিটি ইন্টারফেস হলো বেশ কয়েকটি সমর্থিত ফাংশন, এবং সেই ফাংশনগুলোর [ABI ফাংশন সিলেক্টর](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)-এর [এক্সক্লুসিভ অর](https://en.wikipedia.org/wiki/Exclusive_or) হিসেবে চিহ্নিত করা হয়।

l2 সেতু ERC-165-কে একটি স্যানিটি চেক হিসেবে ব্যবহার করে যাতে নিশ্চিত করা যায় যে এটি যে ERC-20 কন্ট্রাক্টে সম্পদ পাঠায় তা একটি `IL2StandardERC20`।

**দ্রষ্টব্য:** দুর্বৃত্ত কন্ট্রাক্টকে `supportsInterface`-এর মিথ্যা উত্তর প্রদান করা থেকে বিরত রাখার কিছু নেই, তাই এটি একটি স্যানিটি চেক মেকানিজম, কোনো নিরাপত্তা মেকানিজম _নয়_।

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

শুধুমাত্র l2 সেতুকে সম্পদ মিন্ট এবং পোড়ানো করার অনুমতি দেওয়া হয়েছে।

`_mint` এবং `_burn` আসলে [ওপেনজেপেলিন ERC-20 কন্ট্রাক্ট](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)-এ সংজ্ঞায়িত করা হয়েছে।
সেই কন্ট্রাক্টটি কেবল সেগুলোকে বাহ্যিকভাবে প্রকাশ করে না, কারণ টোকেন মিন্ট এবং পোড়ানো করার শর্তগুলো ERC-20 ব্যবহার করার উপায়গুলোর মতোই বৈচিত্র্যময়।

## l2 সেতু কোড {#l2-bridge-code}

এটি সেই কোড যা অপটিমিজমে সেতু চালায়।
[এই কন্ট্রাক্টের সোর্স এখানে রয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* ইন্টারফেস ইমপোর্ট */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ইন্টারফেসটি আমরা উপরে দেখা [l1 সমতুল্য](#il1erc20bridge)-এর মতোই।
দুটি উল্লেখযোগ্য পার্থক্য রয়েছে:

1. l1-এ আপনি জমা শুরু করেন এবং উত্তোলন চূড়ান্ত করেন।
   এখানে আপনি উত্তোলন শুরু করেন এবং জমা চূড়ান্ত করেন।
2. l1-এ ETH এবং ERC-20 টোকেনের মধ্যে পার্থক্য করা প্রয়োজন।
   l2-এ আমরা উভয়ের জন্য একই ফাংশন ব্যবহার করতে পারি কারণ অভ্যন্তরীণভাবে অপটিমিজমে ETH ব্যালেন্সগুলো [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) ঠিকানা সহ একটি ERC-20 টোকেন হিসেবে পরিচালিত হয়।

```solidity
/* লাইব্রেরি ইমপোর্ট */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* কন্ট্রাক্ট ইমপোর্ট */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev লেয়ার ২ (l2) স্ট্যান্ডার্ড সেতু হলো এমন একটি কন্ট্রাক্ট যা লেয়ার ১ (l1) এবং লেয়ার ২ (l2) এর মধ্যে ETH এবং ERC-20 ট্রানজিশন সক্ষম করতে
 * লেয়ার ১ (l1) স্ট্যান্ডার্ড সেতুর সাথে একসাথে কাজ করে।
 * এই কন্ট্রাক্টটি নতুন টোকেনগুলোর জন্য একটি মিন্টার হিসাবে কাজ করে যখন এটি লেয়ার ১ (l1) স্ট্যান্ডার্ড
 * সেতুতে জমা সম্পর্কে শোনে।
 * এই কন্ট্রাক্টটি উত্তোলনের উদ্দেশ্যে টোকেনগুলোর বার্নার হিসাবেও কাজ করে, লেয়ার ১ (l1) ফান্ড রিলিজ করার জন্য লেয়ার ১ (l1)
 * সেতুকে অবহিত করে。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * এক্সটার্নাল কন্ট্রাক্ট রেফারেন্স *
     ********************************/

    address public l1TokenBridge;
```

l1 সেতুর ঠিকানার ট্র্যাক রাখুন।
মনে রাখবেন যে l1 সমতুল্যের বিপরীতে, এখানে আমাদের এই ভেরিয়েবলটি _প্রয়োজন_।
l1 সেতুর ঠিকানা আগে থেকে জানা যায় না।

```solidity

    /***************
     * কনস্ট্রাক্টর *
     ***************/

    /**
     * @param _l2CrossDomainMessenger এই কন্ট্রাক্ট দ্বারা ব্যবহৃত ক্রস-ডোমেইন মেসেঞ্জার।
     * @param _l1TokenBridge মেইন চেইনে ডিপ্লয় করা লেয়ার ১ (l1) সেতুর ঠিকানা。
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * উত্তোলন *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

এই দুটি ফাংশন উত্তোলন শুরু করে।
মনে রাখবেন যে l1 টোকেন ঠিকানা নির্দিষ্ট করার কোনো প্রয়োজন নেই।
l2 টোকেনগুলো আমাদের l1 সমতুল্যের ঠিকানা বলবে বলে আশা করা হচ্ছে।

```solidity

    /**
     * @dev টোকেন পোড়ানো এবং লেয়ার ১ (l1) টোকেন গেটওয়েকে উত্তোলন সম্পর্কে অবহিত করার মাধ্যমে
     *      উত্তোলনের জন্য লজিক সম্পাদন করে।
     * @param _l2Token লেয়ার ২ (l2) টোকেনের ঠিকানা যেখানে উত্তোলন শুরু হয়।
     * @param _from লেয়ার ২ (l2) তে যে অ্যাকাউন্ট থেকে উত্তোলন নেওয়া হবে।
     * @param _to লেয়ার ১ (l1) এ যে অ্যাকাউন্টে উত্তোলন দেওয়া হবে।
     * @param _amount উত্তোলন করার জন্য টোকেনের পরিমাণ।
     * @param _l1Gas অব্যবহৃত, তবে সম্ভাব্য ফরোয়ার্ড সামঞ্জস্য বিবেচনার জন্য অন্তর্ভুক্ত।
     * @param _data লেয়ার ১ (l1) এ ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র
     *        বাহ্যিক কন্ট্রাক্ট এর সুবিধার জন্য প্রদান করা হয়। সর্বোচ্চ দৈর্ঘ্য
     *        প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি প্রদান করে না。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // যখন একটি উত্তোলন শুরু হয়, তখন আমরা পরবর্তী লেয়ার ২ (l2) ব্যবহার রোধ করতে উত্তোলনকারীর ফান্ড পোড়াই
        // ব্যবহার
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

লক্ষ্য করুন যে আমরা `_from` প্যারামিটারের ওপর নির্ভর করছি _না_ বরং `msg.sender`-এর ওপর নির্ভর করছি যা নকল করা অনেক কঠিন (আমার জানামতে অসম্ভব)।

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) এর জন্য কল ডেটা তৈরি করুন
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

l1-এ ETH এবং ERC-20-এর মধ্যে পার্থক্য করা প্রয়োজন।

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // লেয়ার ১ (l1) সেতুতে বার্তা পাঠান
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * ক্রস-চেইন ফাংশন: জমা করা *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

এই ফাংশনটি `L1StandardBridge` দ্বারা কল করা হয়।

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

নিশ্চিত করুন যে বার্তার উৎসটি বৈধ।
এটি গুরুত্বপূর্ণ কারণ এই ফাংশনটি `_mint` কল করে এবং এমন টোকেন দিতে ব্যবহার করা যেতে পারে যা l1-এ সেতুর মালিকানাধীন টোকেন দ্বারা আচ্ছাদিত নয়।

```solidity
        // টার্গেট টোকেনটি কমপ্লায়েন্ট কিনা তা চেক করুন এবং
        // যাচাই করুন যে লেয়ার ১ (l1) এ জমা করা টোকেনটি এখানে লেয়ার ২ (l2) জমা করা টোকেন উপস্থাপনার সাথে মেলে
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

স্যানিটি চেক:

1. সঠিক ইন্টারফেস সমর্থিত
2. l2 ERC-20 কন্ট্রাক্টের l1 ঠিকানা টোকেনগুলোর l1 উৎসের সাথে মেলে

```solidity
        ) {
            // যখন একটি জমা চূড়ান্ত হয়, তখন আমরা লেয়ার ২ (l2) তে অ্যাকাউন্টে সমপরিমাণ
            // টোকেন ক্রেডিট করি।
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

যদি স্যানিটি চেক পাস হয়, তবে জমা চূড়ান্ত করুন:

1. টোকেনগুলো মিন্ট করুন
2. উপযুক্ত ইভেন্ট এমিট করুন

```solidity
        } else {
            // যে লেয়ার ২ (l2) টোকেনে জমা করা হচ্ছে তা হয় সঠিক ঠিকানা সম্পর্কে দ্বিমত পোষণ করে
            // এর লেয়ার ১ (l1) টোকেনের, অথবা সঠিক ইন্টারফেস সমর্থন করে না।
            // এটি শুধুমাত্র তখনই ঘটা উচিত যদি একটি ক্ষতিকারক লেয়ার ২ (l2) টোকেন থাকে, অথবা যদি কোনো ব্যবহারকারী কোনোভাবে
            // জমা করার জন্য ভুল লেয়ার ২ (l2) টোকেন ঠিকানা নির্দিষ্ট করে।
            // উভয় ক্ষেত্রেই, আমরা এখানে প্রক্রিয়াটি বন্ধ করি এবং একটি উত্তোলন তৈরি করি
            // বার্তা যাতে ব্যবহারকারীরা কিছু ক্ষেত্রে তাদের ফান্ড বের করতে পারে।
            // ক্ষতিকারক টোকেন কন্ট্রাক্টগুলো পুরোপুরি প্রতিরোধ করার কোনো উপায় নেই, তবে এটি
            // ব্যবহারকারীর ত্রুটি সীমাবদ্ধ করে এবং কিছু ধরণের ক্ষতিকারক কন্ট্রাক্ট আচরণ প্রশমিত করে।
```

যদি কোনো ব্যবহারকারী ভুল l2 টোকেন ঠিকানা ব্যবহার করে শনাক্তযোগ্য ত্রুটি করে, তবে আমরা জমা বাতিল করতে এবং l1-এ টোকেনগুলো ফেরত দিতে চাই।
l2 থেকে আমরা এটি করার একমাত্র উপায় হলো একটি বার্তা পাঠানো যাকে ফল্ট চ্যালেঞ্জ পিরিয়ডের জন্য অপেক্ষা করতে হবে, তবে এটি ব্যবহারকারীর জন্য স্থায়ীভাবে টোকেন হারানোর চেয়ে অনেক ভালো।

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // প্রেরকের কাছে জমা বাউন্স ব্যাক করতে এখানে _to এবং _from পরিবর্তন করা হয়েছে
                _from,
                _amount,
                _data
            );

            // লেয়ার ১ (l1) সেতুতে বার্তা পাঠান
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## উপসংহার {#conclusion}

স্ট্যান্ডার্ড সেতু হলো সম্পদ হস্তান্তরের জন্য সবচেয়ে নমনীয় মেকানিজম।
যাইহোক, এটি এত সাধারণ হওয়ার কারণে এটি ব্যবহার করা সবসময় সবচেয়ে সহজ মেকানিজম নয়।
বিশেষ করে উত্তোলনের জন্য, বেশিরভাগ ব্যবহারকারী [থার্ড পার্টি সেতু](https://optimism.io/apps#bridge) ব্যবহার করতে পছন্দ করেন যা চ্যালেঞ্জ পিরিয়ডের জন্য অপেক্ষা করে না এবং উত্তোলন চূড়ান্ত করার জন্য মার্কেল প্রমাণ-এর প্রয়োজন হয় না।

এই সেতুগুলো সাধারণত l1-এ সম্পদ রাখার মাধ্যমে কাজ করে, যা তারা একটি ছোট ফি-এর বিনিময়ে অবিলম্বে প্রদান করে (প্রায়শই একটি স্ট্যান্ডার্ড সেতু উত্তোলনের জন্য গ্যাসের খরচের চেয়ে কম)।
যখন সেতু (বা এটি পরিচালনাকারী লোকেরা) l1 সম্পদে ঘাটতি হওয়ার আশঙ্কা করে তখন এটি l2 থেকে পর্যাপ্ত সম্পদ হস্তান্তর করে। যেহেতু এগুলো অনেক বড় উত্তোলন, তাই উত্তোলনের খরচ একটি বড় পরিমাণের ওপর অ্যামর্টাইজ করা হয় এবং এটি অনেক ছোট শতাংশ।

আশা করি এই নিবন্ধটি আপনাকে লেয়ার ২ কীভাবে কাজ করে এবং কীভাবে পরিষ্কার ও সুরক্ষিত Solidity কোড লিখতে হয় সে সম্পর্কে আরও বুঝতে সাহায্য করেছে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
