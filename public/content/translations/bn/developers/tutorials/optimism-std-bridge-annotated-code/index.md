---
title: "অপটিমিজম স্ট্যান্ডার্ড ব্রিজ কন্ট্রাক্ট ওয়াকথ্রু"
description: "Optimism-এর জন্য স্ট্যান্ডার্ড ব্রিজ কীভাবে কাজ করে? এটি কেন এইভাবে কাজ করে?"
author: Ori Pomerantz
tags: [ "সলিডিটি", "ব্রিজ", "লেয়ার 2" ]
skill: intermediate
published: 2022-03-30
lang: bn
---

[Optimism](https://www.optimism.io/) একটি [অপ্টিমিস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups/)।
Ethereum মেইননেট (যা লেয়ার 1 বা L1 নামেও পরিচিত)-এর তুলনায় অপ্টিমিস্টিক রোলআপগুলি অনেক কম দামে লেনদেন প্রক্রিয়া করতে পারে কারণ লেনদেনগুলি নেটওয়ার্কের প্রতিটি নোডের পরিবর্তে শুধুমাত্র কয়েকটি নোড দ্বারা প্রক্রিয়া করা হয়।
একই সময়ে, সমস্ত ডেটা L1-এ লেখা হয় যাতে মেইননেটের সমস্ত অখণ্ডতা এবং প্রাপ্যতা গ্যারান্টি সহ সবকিছু প্রমাণ এবং পুনর্গঠন করা যায়।

Optimism (বা অন্য কোনো L2)-এ L1 সম্পদ ব্যবহার করার জন্য, সম্পদগুলিকে [ব্রিজ](/bridges/#prerequisites) করা প্রয়োজন।
এটি অর্জনের একটি উপায় হলো ব্যবহারকারীদের L1-এ সম্পদ (ETH এবং [ERC-20 টোকেন](/developers/docs/standards/tokens/erc-20/) সবচেয়ে সাধারণ) লক করা, এবং L2-এ ব্যবহারের জন্য সমতুল্য সম্পদ গ্রহণ করা।
অবশেষে, যে কেউ সেগুলি পেয়ে যাক না কেন, তারা সেগুলিকে L1-এ ব্রিজ করে ফিরিয়ে আনতে চাইতে পারে।
এটি করার সময়, সম্পদগুলি L2-তে বার্ন করা হয় এবং তারপর L1-এ ব্যবহারকারীকে ফিরিয়ে দেওয়া হয়।

[Optimism স্ট্যান্ডার্ড ব্রিজ](https://docs.optimism.io/app-developers/bridging/standard-bridge) এভাবেই কাজ করে।
এই নিবন্ধে আমরা সেই ব্রিজের সোর্স কোডটি দেখব যে এটি কীভাবে কাজ করে এবং এটি একটি ভালভাবে লেখা Solidity কোডের উদাহরণ হিসাবে অধ্যয়ন করব।

## কন্ট্রোল ফ্লো {#control-flows}

ব্রিজটির দুটি প্রধান ফ্লো আছে:

- ডিপোজিট (L1 থেকে L2)
- উইথড্রয়াল (L2 থেকে L1)

### ডিপোজিট ফ্লো {#deposit-flow}

#### লেয়ার 1 {#deposit-flow-layer-1}

1. যদি একটি ERC-20 ডিপোজিট করা হয়, তাহলে ডিপোজিটর ব্রিজটিকে ডিপোজিট করা পরিমাণ ব্যয় করার জন্য একটি অ্যালাওয়েন্স দেয়
2. ডিপোজিটর L1 ব্রিজকে কল করে (`depositERC20`, `depositERC20To`, `depositETH`, বা `depositETHTo`)
3. L1 ব্রিজটি ব্রিজ করা সম্পদের দখল নেয়
   - ETH: সম্পদটি ডিপোজিটর কলের অংশ হিসাবে স্থানান্তর করে
   - ERC-20: সম্পদটি ডিপোজিটর দ্বারা প্রদত্ত অ্যালাওয়েন্স ব্যবহার করে ব্রিজ দ্বারা নিজের কাছে স্থানান্তরিত হয়
4. L1 ব্রিজটি L2 ব্রিজে `finalizeDeposit` কল করতে ক্রস-ডোমেন মেসেজ মেকানিজম ব্যবহার করে

#### লেয়ার 2 {#deposit-flow-layer-2}

5. L2 ব্রিজটি `finalizeDeposit`-এ কলটি বৈধ কিনা তা যাচাই করে:
   - ক্রস ডোমেন মেসেজ কন্ট্রাক্ট থেকে এসেছে
   - মূলত L1-এর ব্রিজ থেকে এসেছিল
6. L2 ব্রিজ পরীক্ষা করে দেখে যে L2-তে ERC-20 টোকেন কন্ট্রাক্ট সঠিক কিনা:
   - L2 কন্ট্রাক্ট রিপোর্ট করে যে এর L1 কাউন্টারপার্টটি L1-এ টোকেনগুলি যেখান থেকে এসেছিল তার মতোই
   - L2 কন্ট্রাক্ট রিপোর্ট করে যে এটি সঠিক ইন্টারফেস সমর্থন করে ([ERC-165 ব্যবহার করে](https://eips.ethereum.org/EIPS/eip-165))।
7. যদি L2 কন্ট্রাক্টটি সঠিক হয়, তবে উপযুক্ত ঠিকানায় উপযুক্ত সংখ্যক টোকেন মিন্ট করতে এটিকে কল করুন। যদি না হয়, ব্যবহারকারীকে L1-এ টোকেন দাবি করার অনুমতি দেওয়ার জন্য একটি উইথড্রয়াল প্রক্রিয়া শুরু করুন।

### উইথড্রয়াল ফ্লো {#withdrawal-flow}

#### লেয়ার 2 {#withdrawal-flow-layer-2}

1. উইথড্রয়ার L2 ব্রিজকে কল করে (`withdraw` বা `withdrawTo`)
2. L2 ব্রিজটি `msg.sender`-এর অন্তর্গত উপযুক্ত সংখ্যক টোকেন বার্ন করে
3. L2 ব্রিজটি L1 ব্রিজে `finalizeETHWithdrawal` বা `finalizeERC20Withdrawal` কল করার জন্য ক্রস-ডোমেন মেসেজ মেকানিজম ব্যবহার করে

#### লেয়ার 1 {#withdrawal-flow-layer-1}

4. L1 ব্রিজটি `finalizeETHWithdrawal` বা `finalizeERC20Withdrawal`-এর কলটি বৈধ কিনা তা যাচাই করে:
   - ক্রস ডোমেন মেসেজ মেকানিজম থেকে এসেছে
   - মূলত L2-এর ব্রিজ থেকে এসেছিল
5. L1 ব্রিজটি উপযুক্ত সম্পদ (ETH বা ERC-20) উপযুক্ত ঠিকানায় স্থানান্তর করে

## লেয়ার 1 কোড {#layer-1-code}

এটি সেই কোড যা L1, Ethereum মেইননেটে চলে।

### IL1ERC20Bridge {#IL1ERC20Bridge}

[এই ইন্টারফেসটি এখানে সংজ্ঞায়িত করা হয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)।
এতে ERC-20 টোকেন ব্রিজ করার জন্য প্রয়োজনীয় ফাংশন এবং সংজ্ঞা অন্তর্ভুক্ত রয়েছে।

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism-এর বেশিরভাগ কোড MIT লাইসেন্সের অধীনে প্রকাশিত হয়েছে](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)।

```solidity
pragma solidity >0.5.0 <0.9.0;
```

লেখার সময় Solidity-র সর্বশেষ সংস্করণ হলো 0.8.12।
যতক্ষণ না 0.9.0 সংস্করণ প্রকাশিত হয়, আমরা জানি না এই কোডটি এর সাথে সামঞ্জস্যপূর্ণ কিনা।

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * ইভেন্টস *
     **********/

    event ERC20DepositInitiated(
```

Optimism ব্রিজ পরিভাষায় _deposit_-এর অর্থ L1 থেকে L2-তে স্থানান্তর, এবং _withdrawal_-এর অর্থ L2 থেকে L1-তে স্থানান্তর।

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

বেশিরভাগ ক্ষেত্রে L1-এ একটি ERC-20-এর ঠিকানা L2-তে সমতুল্য ERC-20-এর ঠিকানার সমান নয়।
[আপনি এখানে টোকেনের ঠিকানার তালিকা দেখতে পারেন](https://static.optimism.io/optimism.tokenlist.json)।
`chainId` 1 সহ ঠিকানাটি L1-এ (মেইননেট) এবং `chainId` 10 সহ ঠিকানাটি L2-এ (Optimism) রয়েছে।
অন্য দুটি `chainId` মান হলো কোভান টেস্ট নেটওয়ার্ক (42) এবং অপ্টিমিস্টিক কোভান টেস্ট নেটওয়ার্ক (69)-এর জন্য।

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

স্থানান্তরের সাথে নোট যোগ করা সম্ভব, সেক্ষেত্রে সেগুলি রিপোর্ট করা ইভেন্টগুলিতে যোগ করা হয়।

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

একই ব্রিজ কন্ট্রাক্ট উভয় দিকে স্থানান্তর পরিচালনা করে।
L1 ব্রিজের ক্ষেত্রে, এর অর্থ হলো ডিপোজিটের সূচনা এবং উইথড্রয়ালের চূড়ান্তকরণ।

```solidity

    /********************
     * পাবলিক ফাংশন *
     ********************/

    /**
     * @dev সংশ্লিষ্ট L2 ব্রিজ কন্ট্রাক্টের ঠিকানা পান।
     * @return সংশ্লিষ্ট L2 ব্রিজ কন্ট্রাক্টের ঠিকানা।
     */
    function l2TokenBridge() external returns (address);
```

এই ফাংশনটি সত্যিই প্রয়োজন নেই, কারণ L2-তে এটি একটি প্রি-ডিপ্লয়েড কন্ট্রাক্ট, তাই এটি সর্বদা `0x4200000000000000000000000000000000000010` ঠিকানায় থাকে।
এটি L2 ব্রিজের সাথে প্রতিসাম্যের জন্য এখানে রয়েছে, কারণ L1 ব্রিজের ঠিকানা জানা তুচ্ছ _নয়_।

```solidity
    /**
     * @dev L2-তে কলারের ব্যালেন্সে ERC20-এর একটি পরিমাণ ডিপোজিট করুন।
     * @param _l1Token আমরা যে L1 ERC20 ডিপোজিট করছি তার ঠিকানা
     * @param _l2Token L1 সংশ্লিষ্ট L2 ERC20-এর ঠিকানা
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ
     * @param _l2Gas L2-তে ডিপোজিট সম্পূর্ণ করার জন্য প্রয়োজনীয় গ্যাস সীমা।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র বাহ্যিক কন্ট্রাক্টগুলির সুবিধার জন্য সরবরাহ করা হয়। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই চুক্তিগুলি এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না।
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` প্যারামিটার হলো L2 গ্যাসের পরিমাণ যা লেনদেন ব্যয় করার অনুমতিপ্রাপ্ত।
[একটি নির্দিষ্ট (উচ্চ) সীমা পর্যন্ত, এটি বিনামূল্যে](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), তাই যদি না ERC-20 চুক্তি মিন্টিংয়ের সময় সত্যিই অদ্ভুত কিছু করে, তবে এটি একটি সমস্যা হওয়া উচিত নয়।
এই ফাংশনটি সাধারণ পরিস্থিতির যত্ন নেয়, যেখানে একজন ব্যবহারকারী একটি ভিন্ন ব্লকচেইনে একই ঠিকানায় সম্পদ ব্রিজ করে।

```solidity
    /**
     * @dev L2-তে একজন প্রাপকের ব্যালেন্সে ERC20-এর একটি পরিমাণ ডিপোজিট করুন।
     * @param _l1Token আমরা যে L1 ERC20 ডিপোজিট করছি তার ঠিকানা
     * @param _l2Token L1 সংশ্লিষ্ট L2 ERC20-এর ঠিকানা
     * @param _to L2 ঠিকানা যেখানে উইথড্রয়াল ক্রেডিট করা হবে।
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ।
     * @param _l2Gas L2-তে ডিপোজিট সম্পূর্ণ করার জন্য প্রয়োজনীয় গ্যাস সীমা।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র বাহ্যিক কন্ট্রাক্টগুলির সুবিধার জন্য সরবরাহ করা হয়। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই চুক্তিগুলি এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না।
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

এই ফাংশনটি `depositERC20`-এর প্রায় অনুরূপ, কিন্তু এটি আপনাকে ERC-20 একটি ভিন্ন ঠিকানায় পাঠাতে দেয়।

```solidity
    /*************************
     * ক্রস-চেইন ফাংশন *
     *************************/

    /**
     * @dev L2 থেকে L1-এ একটি উইথড্রয়াল সম্পূর্ণ করুন, এবং L1 ERC20 টোকেনের প্রাপকের ব্যালেন্সে তহবিল ক্রেডিট করুন।
     * L2 থেকে শুরু করা উইথড্রয়াল চূড়ান্ত না হলে এই কলটি ব্যর্থ হবে।
     *
     * @param _l1Token L1 টোকেনের ঠিকানা যার জন্য finalizeWithdrawal করতে হবে।
     * @param _l2Token L2 টোকেনের ঠিকানা যেখানে উইথড্রয়াল শুরু হয়েছিল।
     * @param _from L2 ঠিকানা যা স্থানান্তর শুরু করছে।
     * @param _to L1 ঠিকানা যেখানে উইথড্রয়াল ক্রেডিট করা হবে।
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ।
     * @param _data L2-তে প্রেরকের দ্বারা প্রদত্ত ডেটা। এই ডেটা শুধুমাত্র বাহ্যিক কন্ট্রাক্টগুলির সুবিধার জন্য সরবরাহ করা হয়। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই চুক্তিগুলি এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না।
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

Optimism-এ উইথড্রয়াল (এবং L2 থেকে L1-এ অন্যান্য মেসেজ) একটি দ্বি-ধাপ প্রক্রিয়া:

1. L2-তে একটি সূচনাকারী লেনদেন।
2. L1-এ একটি চূড়ান্ত বা দাবি করার লেনদেন।
   L2 লেনদেনের জন্য [ফল্ট চ্যালেঞ্জ পিরিয়ড](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) শেষ হওয়ার পরে এই লেনদেনটি হওয়া প্রয়োজন।

### IL1StandardBridge {#il1standardbridge}

[এই ইন্টারফেসটি এখানে সংজ্ঞায়িত করা হয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)।
এই ফাইলে ETH-এর জন্য ইভেন্ট এবং ফাংশনের সংজ্ঞা রয়েছে।
এই সংজ্ঞাগুলি ERC-20-এর জন্য উপরে `IL1ERC20Bridge`-এ সংজ্ঞায়িতগুলির সাথে খুব মিল।

ব্রিজ ইন্টারফেসটি দুটি ফাইলের মধ্যে বিভক্ত কারণ কিছু ERC-20 টোকেনের জন্য কাস্টম প্রক্রিয়াকরণ প্রয়োজন এবং স্ট্যান্ডার্ড ব্রিজ দ্বারা পরিচালিত করা যায় না।
এইভাবে এই ধরনের টোকেন হ্যান্ডেল করে এমন কাস্টম ব্রিজ `IL1ERC20Bridge` প্রয়োগ করতে পারে এবং ETH ব্রিজ করার প্রয়োজন হয় না।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * ইভেন্টস *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

এই ইভেন্টটি ERC-20 সংস্করণ (`ERC20DepositInitiated`)-এর প্রায় অনুরূপ, শুধুমাত্র L1 এবং L2 টোকেন ঠিকানা ছাড়া।
অন্যান্য ইভেন্ট এবং ফাংশনগুলির জন্যও একই কথা সত্য।

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
     * @dev L2-তে কলারের ব্যালেন্সে ETH-এর একটি পরিমাণ ডিপোজিট করুন।
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev L2-তে একজন প্রাপকের ব্যালেন্সে ETH-এর একটি পরিমাণ ডিপোজিট করুন।
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
     * @dev L2 থেকে L1-এ একটি উইথড্রয়াল সম্পূর্ণ করুন এবং L1 ETH টোকেনের প্রাপকের ব্যালেন্সে তহবিল ক্রেডিট করুন। যেহেতু শুধুমাত্র xDomainMessenger এই ফাংশনটি কল করতে পারে, তাই উইথড্রয়াল চূড়ান্ত হওয়ার আগে এটি কখনই কল করা হবে না।
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

[এই কন্ট্রাক্টটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) উভয় ব্রিজ ([L1](#the-l1-bridge-contract) এবং [L2](#the-l2-bridge-contract)) দ্বারা অন্য লেয়ারে মেসেজ পাঠানোর জন্য ইনহেরিট করা হয়েছে।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* ইন্টারফেস ইমপোর্টস */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) কন্ট্রাক্টকে বলে যে কীভাবে ক্রস ডোমেন মেসেঞ্জার ব্যবহার করে অন্য লেয়ারে মেসেজ পাঠাতে হয়।
এই ক্রস ডোমেন মেসেঞ্জার একটি সম্পূর্ণ ভিন্ন সিস্টেম, এবং এর জন্য একটি নিজস্ব নিবন্ধ প্রয়োজন, যা আমি ভবিষ্যতে লেখার আশা করি।

```solidity
/**
 * @title CrossDomainEnabled
 * @dev ক্রস-ডোমেন কমিউনিকেশন করা কন্ট্রাক্টগুলোর জন্য সহায়ক কন্ট্রাক্ট
 *
 * ব্যবহৃত কম্পাইলার: ইনহেরিট করা কন্ট্রাক্ট দ্বারা সংজ্ঞায়িত
 */
contract CrossDomainEnabled {
    /*************
     * ভেরিয়েবল *
     *************/

    // অন্য ডোমেন থেকে মেসেজ পাঠাতে এবং গ্রহণ করতে ব্যবহৃত মেসেঞ্জার কন্ট্রাক্ট।
    address public messenger;

    /***************
     * কনস্ট্রাক্টর *
     ***************/

    /**
     * @param _messenger বর্তমান লেয়ারে CrossDomainMessenger-এর ঠিকানা।
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

একটি প্যারামিটার যা কন্ট্রাক্টকে জানতে হবে, তা হলো এই লেয়ারে ক্রস ডোমেন মেসেঞ্জারের ঠিকানা।
এই প্যারামিটারটি কনস্ট্রাক্টরে একবার সেট করা হয় এবং আর কখনও পরিবর্তন হয় না।

```solidity

    /**********************
     * ফাংশন মডিফায়ার *
     **********************/

    /**
     * বাধ্য করে যে পরিবর্তিত ফাংশনটি শুধুমাত্র একটি নির্দিষ্ট ক্রস-ডোমেন অ্যাকাউন্ট দ্বারা কলযোগ্য।
     * @param _sourceDomainAccount উৎস ডোমেনের একমাত্র অ্যাকাউন্ট যা এই ফাংশনটি কল করার জন্য প্রমাণীকৃত।
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

ক্রস ডোমেন মেসেজিং যে ব্লকচেইনে চলছে (Ethereum মেইননেট বা Optimism) তার যেকোনো কন্ট্রাক্ট দ্বারা অ্যাক্সেসযোগ্য।
কিন্তু আমাদের প্রতিটি দিকে ব্রিজটিকে _শুধুমাত্র_ নির্দিষ্ট মেসেজ বিশ্বাস করতে হবে যদি সেগুলি অন্য দিকের ব্রিজ থেকে আসে।

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

শুধুমাত্র উপযুক্ত ক্রস ডোমেন মেসেঞ্জার (`messenger`, যেমন আপনি নীচে দেখছেন) থেকে আসা মেসেজ বিশ্বাস করা যেতে পারে।

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

অন্য লেয়ারের সাথে মেসেজ পাঠানো ঠিকানাটি ক্রস ডোমেন মেসেঞ্জার যেভাবে সরবরাহ করে তা হলো [`.xDomainMessageSender()` ফাংশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)।
যতক্ষণ এটি মেসেজ দ্বারা শুরু করা লেনদেনে কল করা হয়, ততক্ষণ এটি এই তথ্য সরবরাহ করতে পারে।

আমাদের নিশ্চিত করতে হবে যে আমরা যে মেসেজটি পেয়েছি তা অন্য ব্রিজ থেকে এসেছে।

```solidity

        _;
    }

    /**********************
     * ইন্টারনাল ফাংশন *
     **********************/

    /**
     * মেসেঞ্জার পায়, সাধারণত স্টোরেজ থেকে। চাইল্ড কন্ট্রাক্টকে ওভাররাইড করার প্রয়োজন হলে এই ফাংশনটি এক্সপোজ করা হয়।
     * @return ক্রস-ডোমেন মেসেঞ্জার কন্ট্রাক্টের ঠিকানা যা ব্যবহার করা উচিত।
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

এই ফাংশনটি ক্রস ডোমেন মেসেঞ্জার রিটার্ন করে।
আমরা `messenger` ভেরিয়েবলের পরিবর্তে একটি ফাংশন ব্যবহার করি যাতে এই কন্ট্রাক্ট থেকে ইনহেরিট করা কন্ট্রাক্টগুলো কোন ক্রস ডোমেন মেসেঞ্জার ব্যবহার করতে হবে তা নির্দিষ্ট করার জন্য একটি অ্যালগরিদম ব্যবহার করতে পারে।

```solidity

    /**
     * অন্য ডোমেনের একটি অ্যাকাউন্টে একটি মেসেজ পাঠায়
     * @param _crossDomainTarget গন্তব্য ডোমেনের উদ্দিষ্ট প্রাপক
     * @param _message টার্গেটে পাঠানোর জন্য ডেটা (সাধারণত onlyFromCrossDomainAccount() সহ একটি ফাংশনের জন্য ক্যালডাটা)
     * @param _gasLimit টার্গেট ডোমেনে মেসেজ প্রাপ্তির জন্য গ্যাসলিমিট।
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

অবশেষে, যে ফাংশনটি অন্য লেয়ারে একটি মেসেজ পাঠায়।

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) একটি স্ট্যাটিক অ্যানালাইজার যা Optimism প্রতিটি কন্ট্রাক্টে দুর্বলতা এবং অন্যান্য সম্ভাব্য সমস্যা খোঁজার জন্য চালায়।
এই ক্ষেত্রে, নিম্নলিখিত লাইনটি দুটি দুর্বলতা ট্রিগার করে:

1. [রিএন্ট্রেন্সি ইভেন্ট](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [বেনাইন রিএন্ট্রেন্সি](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

এই ক্ষেত্রে আমরা রিএন্ট্রেন্সি নিয়ে চিন্তিত নই, আমরা জানি `getCrossDomainMessenger()` একটি বিশ্বাসযোগ্য ঠিকানা রিটার্ন করে, যদিও Slither-এর এটি জানার কোনো উপায় নেই।

### L1 ব্রিজ কন্ট্রাক্ট {#the-l1-bridge-contract}

[এই কন্ট্রাক্টের জন্য সোর্স কোড এখানে আছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

ইন্টারফেসগুলি অন্যান্য কন্ট্রাক্টের অংশ হতে পারে, তাই তাদের বিভিন্ন Solidity সংস্করণ সমর্থন করতে হয়।
কিন্তু ব্রিজটি নিজেই আমাদের কন্ট্রাক্ট, এবং আমরা এটি কোন Solidity সংস্করণ ব্যবহার করবে সে বিষয়ে কঠোর হতে পারি।

```solidity
/* ইন্টারফেস ইমপোর্টস */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) এবং [IL1StandardBridge](#IL1StandardBridge) উপরে ব্যাখ্যা করা হয়েছে।

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) আমাদের L2-তে স্ট্যান্ডার্ড ব্রিজ নিয়ন্ত্রণ করার জন্য মেসেজ তৈরি করতে দেয়।

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[এই ইন্টারফেসটি](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) আমাদের ERC-20 কন্ট্রাক্ট নিয়ন্ত্রণ করতে দেয়।
[আপনি এখানে এর সম্পর্কে আরও পড়তে পারেন](/developers/tutorials/erc20-annotated-code/#the-interface)।

```solidity
/* লাইব্রেরি ইমপোর্ট */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[উপরে যেমন ব্যাখ্যা করা হয়েছে](#crossdomainenabled), এই কন্ট্রাক্টটি ইন্টারলেয়ার মেসেজিংয়ের জন্য ব্যবহৃত হয়।

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)-এ L2 কন্ট্রাক্টগুলির ঠিকানা রয়েছে যেগুলোর সর্বদা একই ঠিকানা থাকে। এর মধ্যে L2-তে স্ট্যান্ডার্ড ব্রিজও অন্তর্ভুক্ত।

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin-এর Address ইউটিলিটি](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)। এটি কন্ট্রাক্টের ঠিকানা এবং এক্সটার্নালি ওন্ড অ্যাকাউন্ট (EOA)-এর অন্তর্গত ঠিকানাগুলির মধ্যে পার্থক্য করতে ব্যবহৃত হয়।

উল্লেখ্য যে এটি একটি নিখুঁত সমাধান নয়, কারণ সরাসরি কল এবং একটি কন্ট্রাক্টের কনস্ট্রাক্টর থেকে করা কলের মধ্যে পার্থক্য করার কোনো উপায় নেই, তবে অন্তত এটি আমাদের কিছু সাধারণ ব্যবহারকারী ত্রুটি সনাক্ত এবং প্রতিরোধ করতে দেয়।

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20) ব্যর্থতা রিপোর্ট করার জন্য একটি কন্ট্রাক্টের জন্য দুটি উপায় সমর্থন করে:

1. রিভার্ট করুন
2. `false` রিটার্ন করুন

উভয় ক্ষেত্রেই হ্যান্ডেল করা আমাদের কোডকে আরও জটিল করে তুলবে, তাই এর পরিবর্তে আমরা [OpenZeppelin-এর `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) ব্যবহার করি, যা নিশ্চিত করে [সব ব্যর্থতা রিভার্টে পরিণত হয়](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)।

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH এবং ERC20 ব্রিজ হল এমন একটি কন্ট্রাক্ট যা ডিপোজিট করা L1 ফান্ড এবং স্ট্যান্ডার্ড টোকেন সংরক্ষণ করে যা L2-তে ব্যবহৃত হচ্ছে। এটি একটি সংশ্লিষ্ট L2 ব্রিজকে সিঙ্ক্রোনাইজ করে, এটিকে ডিপোজিট সম্পর্কে জানায় এবং নতুন চূড়ান্ত হওয়া উইথড্রয়ালের জন্য এটি শোনে।
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

এই লাইনটি হল যেভাবে আমরা `IERC20` ইন্টারফেস ব্যবহার করার সময় `SafeERC20` র‍্যাপার ব্যবহার করতে নির্দিষ্ট করি।

```solidity

    /********************************
     * এক্সটার্নাল কন্ট্রাক্ট রেফারেন্স *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract)-এর ঠিকানা।

```solidity

    // ডিপোজিট করা L1 টোকেনের ব্যালেন্সে L1 টোকেন থেকে L2 টোকেন ম্যাপ করে
    mapping(address => mapping(address => uint256)) public deposits;
```

এই ধরনের একটি ডাবল [ম্যাপিং](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) হল একটি [দ্বি-মাত্রিক স্পার্স অ্যারে](https://en.wikipedia.org/wiki/Sparse_matrix) সংজ্ঞায়িত করার উপায়।
এই ডেটা স্ট্রাকচারের মানগুলিকে `deposit[L1 token addr][L2 token addr]` হিসাবে চিহ্নিত করা হয়।
ডিফল্ট মান শূন্য।
শুধুমাত্র যে সেলগুলি একটি ভিন্ন মানে সেট করা হয়েছে সেগুলি স্টোরেজে লেখা হয়।

```solidity

    /***************
     * কনস্ট্রাক্টর *
     ***************/

    // এই কন্ট্রাক্টটি একটি প্রক্সির পিছনে থাকে, তাই কনস্ট্রাক্টর প্যারামিটারগুলি অব্যবহৃত থাকবে।
    constructor() CrossDomainEnabled(address(0)) {}
```

স্টোরেজের সমস্ত ভেরিয়েবল কপি না করেই এই কন্ট্রাক্ট আপগ্রেড করতে চাই।
এটি করার জন্য আমরা একটি [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) ব্যবহার করি, একটি কন্ট্রাক্ট যা একটি পৃথক কন্ট্রাক্টে কল স্থানান্তর করার জন্য [`delegatecall`](https://solidity-by-example.org/delegatecall/) ব্যবহার করে যার ঠিকানা প্রক্সি কন্ট্রাক্ট দ্বারা সংরক্ষণ করা হয় (আপনি আপগ্রেড করার সময় প্রক্সিটিকে সেই ঠিকানা পরিবর্তন করতে বলেন)।
আপনি যখন `delegatecall` ব্যবহার করেন তখন স্টোরেজ _কলিং_ কন্ট্রাক্টের স্টোরেজ হিসাবে থাকে, তাই সমস্ত কন্ট্রাক্ট স্টেট ভেরিয়েবলের মান প্রভাবিত হয় না।

এই প্যাটার্নের একটি প্রভাব হলো যে `delegatecall`-এর _কল করা_ কন্ট্রাক্টের স্টোরেজ ব্যবহার করা হয় না এবং তাই এটিতে পাস করা কনস্ট্রাক্টর মানগুলি কোনো গুরুত্ব রাখে না।
এই কারণেই আমরা `CrossDomainEnabled` কনস্ট্রাক্টরে একটি অর্থহীন মান সরবরাহ করতে পারি।
এটিই কারণ যে নীচের ইনিশিয়ালাইজেশন কনস্ট্রাক্টর থেকে আলাদা।

```solidity
    /******************
     * ইনিশিয়ালাইজেশন *
     ******************/

    /**
     * @param _l1messenger ক্রস-চেইন যোগাযোগের জন্য ব্যবহৃত L1 মেসেঞ্জারের ঠিকানা।
     * @param _l2TokenBridge L2 স্ট্যান্ডার্ড ব্রিজের ঠিকানা।
     */
    // slither-disable-next-line external-function
```

এই [Slither পরীক্ষাটি](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) এমন ফাংশনগুলি সনাক্ত করে যা কন্ট্রাক্টের কোড থেকে কল করা হয় না এবং তাই `public`-এর পরিবর্তে `external` ঘোষণা করা যেতে পারে।
`external` ফাংশনের গ্যাস খরচ কম হতে পারে, কারণ সেগুলিকে ক্যালডাটাতে প্যারামিটার সরবরাহ করা যেতে পারে।
`public` হিসাবে ঘোষিত ফাংশনগুলিকে কন্ট্রাক্টের মধ্যে থেকে অ্যাক্সেসযোগ্য হতে হবে।
কন্ট্রাক্টগুলি তাদের নিজস্ব ক্যালডাটা পরিবর্তন করতে পারে না, তাই প্যারামিটারগুলিকে মেমরিতে থাকতে হবে।
যখন এই ধরনের একটি ফাংশন বাইরে থেকে কল করা হয়, তখন ক্যালডাটা মেমরিতে কপি করা প্রয়োজন, যা গ্যাস খরচ করে।
এই ক্ষেত্রে ফাংশনটি শুধুমাত্র একবার কল করা হয়, তাই অদক্ষতা আমাদের কাছে গুরুত্বপূর্ণ নয়।

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` ফাংশনটি কেবল একবারই কল করা উচিত।
যদি L1 ক্রস ডোমেন মেসেঞ্জার বা L2 টোকেন ব্রিজের ঠিকানা পরিবর্তন হয়, তাহলে আমরা একটি নতুন প্রক্সি এবং একটি নতুন ব্রিজ তৈরি করি যা এটিকে কল করে।
পুরো সিস্টেম আপগ্রেড করার সময় ছাড়া এটি ঘটার সম্ভাবনা কম, যা একটি খুব বিরল ঘটনা।

উল্লেখ্য যে এই ফাংশনে এমন কোনো মেকানিজম নেই যা সীমাবদ্ধ করে যে _কে_ এটি কল করতে পারে।
এর মানে হল, তাত্ত্বিকভাবে একজন আক্রমণকারী আমাদের প্রক্সি এবং ব্রিজের প্রথম সংস্করণ ডিপ্লয় না করা পর্যন্ত অপেক্ষা করতে পারে এবং তারপর বৈধ ব্যবহারকারীর আগে `initialize` ফাংশনে পৌঁছানোর জন্য [ফ্রন্ট-রান](https://solidity-by-example.org/hacks/front-running/) করতে পারে। কিন্তু এটি প্রতিরোধের দুটি পদ্ধতি আছে:

1. যদি কন্ট্রাক্টগুলি সরাসরি একটি EOA দ্বারা ডিপ্লয় না করে [একটি লেনদেনে ডিপ্লয় করা হয় যেখানে অন্য একটি কন্ট্রাক্ট সেগুলি তৈরি করে](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) তাহলে পুরো প্রক্রিয়াটি অ্যাটমিক হতে পারে এবং অন্য কোনো লেনদেন কার্যকর হওয়ার আগে শেষ হতে পারে।
2. যদি `initialize`-এর বৈধ কল ব্যর্থ হয়, তাহলে নতুন তৈরি করা প্রক্সি এবং ব্রিজকে উপেক্ষা করে নতুন করে তৈরি করা সবসময়ই সম্ভব।

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

এই দুটি প্যারামিটারই ব্রিজের জানা প্রয়োজন।

```solidity

    /**************
     * ডিপোজিট করা *
     **************/

    /** @dev প্রেরককে EOA হতে হবে এমন মডিফায়ার। এই পরীক্ষাটি একটি ক্ষতিকারক
     *  কন্ট্রাক্ট ইনিটকোডের মাধ্যমে বাইপাস করতে পারে, তবে এটি ব্যবহারকারীর যে ত্রুটি আমরা এড়াতে চাই তার যত্ন নেয়।
     */
    modifier onlyEOA() {
        // কন্ট্রাক্ট থেকে ডিপোজিট বন্ধ করতে ব্যবহৃত (দুর্ঘটনাক্রমে হারিয়ে যাওয়া টোকেন এড়াতে)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

এই কারণেই আমাদের OpenZeppelin-এর `Address` ইউটিলিটির প্রয়োজন ছিল।

```solidity
    /**
     * @dev এই ফাংশনটি কোনো ডেটা ছাড়াই কল করা যেতে পারে
     * L2-তে কলারের ব্যালেন্সে ETH-এর একটি পরিমাণ ডিপোজিট করতে।
     * যেহেতু রিসিভ ফাংশন ডেটা নেয় না, একটি রক্ষণশীল
     * ডিফল্ট পরিমাণ L2-তে ফরোয়ার্ড করা হয়।
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

এই ফাংশনটি পরীক্ষার উদ্দেশ্যে বিদ্যমান।
লক্ষ্য করুন যে এটি ইন্টারফেস সংজ্ঞায় উপস্থিত হয় না - এটি সাধারণ ব্যবহারের জন্য নয়।

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

এই দুটি ফাংশন `_initiateETHDeposit`-এর চারপাশে র‍্যাপার, যা প্রকৃত ETH ডিপোজিট পরিচালনা করে।

```solidity
    /**
     * @dev ETH সংরক্ষণ করে এবং L2 ETH গেটওয়েকে ডিপোজিট সম্পর্কে জানিয়ে ডিপোজিটের জন্য যুক্তি সম্পাদন করে।
     * @param _from L1-এ যে অ্যাকাউন্ট থেকে ডিপোজিট টানা হবে।
     * @param _to L2-তে যে অ্যাকাউন্টে ডিপোজিট দেওয়া হবে।
     * @param _l2Gas L2-তে ডিপোজিট সম্পূর্ণ করার জন্য প্রয়োজনীয় গ্যাস সীমা।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র বাহ্যিক কন্ট্রাক্টগুলির সুবিধার জন্য সরবরাহ করা হয়। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই চুক্তিগুলি এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না।
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit কলের জন্য ক্যালডাটা তৈরি করুন
        bytes memory message = abi.encodeWithSelector(
```

ক্রস ডোমেন মেসেজ যেভাবে কাজ করে তা হলো, গন্তব্য কন্ট্রাক্টটিকে মেসেজটি তার ক্যালডাটা হিসেবে দিয়ে কল করা হয়।
Solidity কন্ট্রাক্টগুলো সবসময় তাদের ক্যালডাটা [ABI স্পেসিফিকেশন](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) অনুযায়ী ব্যাখ্যা করে।
Solidity ফাংশন [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) সেই ক্যালডাটা তৈরি করে।

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

এখানে মেসেজটি হলো এই প্যারামিটারগুলির সাথে [`finalizeDeposit` ফাংশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) কল করা:

| প্যারামিটার                     | মান                                                                                      | অর্থ                                                                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | L1-এ ETH-এর (যা একটি ERC-20 টোকেন নয়) জন্য বিশেষ মান                                                                                                  |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism-এ ETH পরিচালনাকারী L2 কন্ট্রাক্ট, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (এই কন্ট্রাক্টটি শুধুমাত্র অভ্যন্তরীণ Optimism ব্যবহারের জন্য) |
| \_from    | \_from                                                             | L1-এর ঠিকানা যা ETH পাঠায়                                                                                                                                                |
| \_to      | \_to                                                               | L2-এর ঠিকানা যা ETH গ্রহণ করে                                                                                                                                             |
| পরিমাণ                          | msg.value                                                                | প্রেরিত wei-এর পরিমাণ (যা ইতিমধ্যে ব্রিজে পাঠানো হয়েছে)                                                                                               |
| \_data    | \_data                                                             | ডিপোজিটের সাথে সংযুক্ত করার জন্য অতিরিক্ত ডেটা                                                                                                                            |

```solidity
        // ক্যালডাটা L2-তে পাঠান
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

ক্রস ডোমেন মেসেঞ্জারের মাধ্যমে মেসেজটি পাঠান।

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

এই স্থানান্তরের বিষয়ে যেকোনো বিকেন্দ্রীভূত অ্যাপ্লিকেশনকে জানানোর জন্য একটি ইভেন্ট প্রকাশ করুন।

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

এই দুটি ফাংশন `_initiateERC20Deposit`-এর চারপাশে র‍্যাপার, যা প্রকৃত ERC-20 ডিপোজিট পরিচালনা করে।

```solidity
    /**
     * @dev L2 ডিপোজিটেড টোকেন কন্ট্রাক্টকে ডিপোজিট সম্পর্কে জানিয়ে এবং L1 ফান্ড লক করার জন্য একটি হ্যান্ডলার কল করে ডিপোজিটের জন্য যুক্তি সম্পাদন করে। (যেমন, transferFrom)
     *
     * @param _l1Token আমরা ডিপোজিট করছি এমন L1 ERC20-এর ঠিকানা
     * @param _l2Token L1 সংশ্লিষ্ট L2 ERC20-এর ঠিকানা
     * @param _from L1-এ যে অ্যাকাউন্ট থেকে ডিপোজিট টানা হবে
     * @param _to L2-তে যে অ্যাকাউন্টে ডিপোজিট দেওয়া হবে
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ।
     * @param _l2Gas L2-তে ডিপোজিট সম্পূর্ণ করার জন্য প্রয়োজনীয় গ্যাস সীমা।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র বাহ্যিক কন্ট্রাক্টগুলির সুবিধার জন্য সরবরাহ করা হয়। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই চুক্তিগুলি এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না।
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

এই ফাংশনটি উপরের `_initiateETHDeposit`-এর মতোই, তবে কয়েকটি গুরুত্বপূর্ণ পার্থক্য রয়েছে।
প্রথম পার্থক্য হল এই ফাংশনটি টোকেনের ঠিকানা এবং স্থানান্তরের পরিমাণ প্যারামিটার হিসাবে গ্রহণ করে।
ETH-এর ক্ষেত্রে ব্রিজের কলে ইতিমধ্যেই ব্রিজ অ্যাকাউন্টে সম্পদ স্থানান্তর অন্তর্ভুক্ত থাকে (`msg.value`)।

```solidity
        // যখন L1-এ একটি ডিপোজিট শুরু হয়, তখন L1 ব্রিজ ভবিষ্যতের উইথড্রয়ালের জন্য ফান্ডগুলি নিজের কাছে স্থানান্তর করে। safeTransferFrom এটিও পরীক্ষা করে যে কন্ট্রাক্টে কোড আছে কিনা, তাই যদি _from একটি EOA বা address(0) হয় তবে এটি ব্যর্থ হবে।
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 টোকেন স্থানান্তর ETH থেকে একটি ভিন্ন প্রক্রিয়া অনুসরণ করে:

1. ব্যবহারকারী (`_from`) উপযুক্ত টোকেন স্থানান্তর করার জন্য ব্রিজকে একটি অ্যালাওয়েন্স দেয়।
2. ব্যবহারকারী টোকেন কন্ট্রাক্টের ঠিকানা, পরিমাণ ইত্যাদি সহ ব্রিজকে কল করে।
3. ব্রিজটি ডিপোজিট প্রক্রিয়ার অংশ হিসাবে টোকেনগুলি (নিজের কাছে) স্থানান্তর করে।

প্রথম ধাপটি শেষ দুটি থেকে একটি পৃথক লেনদেনে হতে পারে।
তবে, ফ্রন্ট-রানিং একটি সমস্যা নয় কারণ যে দুটি ফাংশন `_initiateERC20Deposit` কল করে (`depositERC20` এবং `depositERC20To`) শুধুমাত্র `msg.sender`-কে `_from` প্যারামিটার হিসাবে দিয়ে এই ফাংশনটি কল করে।

```solidity
        // _l2Token.finalizeDeposit(_to, _amount)-এর জন্য ক্যালডাটা তৈরি করুন
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // ক্যালডাটা L2-তে পাঠান
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

`deposits` ডেটা স্ট্রাকচারে ডিপোজিট করা টোকেনের পরিমাণ যোগ করুন।
L2-তে একাধিক ঠিকানা থাকতে পারে যা একই L1 ERC-20 টোকেনের সাথে সঙ্গতিপূর্ণ, তাই ডিপোজিট ট্র্যাক করার জন্য ব্রিজের L1 ERC-20 টোকেনের ব্যালেন্স ব্যবহার করা যথেষ্ট নয়।

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

L2 ব্রিজটি L2 ক্রস ডোমেন মেসেঞ্জারে একটি মেসেজ পাঠায় যা L1 ক্রস ডোমেন মেসেঞ্জারকে এই ফাংশনটি কল করতে বাধ্য করে (অবশ্যই L1-এ মেসেজটি চূড়ান্ত করার [লেনদেন](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) জমা দেওয়ার পরে)।

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

নিশ্চিত করুন যে এটি একটি _বৈধ_ মেসেজ, যা ক্রস ডোমেন মেসেঞ্জার থেকে আসছে এবং L2 টোকেন ব্রিজ থেকে উদ্ভূত।
এই ফাংশনটি ব্রিজ থেকে ETH উইথড্র করার জন্য ব্যবহৃত হয়, তাই আমাদের নিশ্চিত করতে হবে যে এটি শুধুমাত্র অনুমোদিত কলার দ্বারা কল করা হয়।

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH স্থানান্তর করার উপায় হল `msg.value`-এ wei-এর পরিমাণ সহ প্রাপককে কল করা।

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

উইথড্রয়াল সম্পর্কে একটি ইভেন্ট প্রকাশ করুন।

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

এই ফাংশনটি উপরের `finalizeETHWithdrawal`-এর মতোই, ERC-20 টোকেনের জন্য প্রয়োজনীয় পরিবর্তনসহ।

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` ডেটা স্ট্রাকচার আপডেট করুন।

```solidity

        // যখন L1-এ একটি উইথড্রয়াল চূড়ান্ত হয়, তখন L1 ব্রিজটি ফান্ডগুলি উইথড্রয়ারকে স্থানান্তর করে
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * অস্থায়ী - ETH মাইগ্রেট করা *
     *****************************/

    /**
     * @dev অ্যাকাউন্টে ETH ব্যালেন্স যোগ করে। এটি একটি পুরানো গেটওয়ে থেকে একটি নতুন গেটওয়েতে ETH মাইগ্রেট করার অনুমতি দেওয়ার জন্য তৈরি।
     * দ্রষ্টব্য: এটি শুধুমাত্র একটি আপগ্রেডের জন্য রাখা হয়েছে যাতে আমরা পুরানো কন্ট্রাক্ট থেকে মাইগ্রেট করা ETH পেতে পারি।
     */
    function donateETH() external payable {}
}
```

ব্রিজের একটি পূর্ববর্তী বাস্তবায়ন ছিল।
যখন আমরা সেই বাস্তবায়ন থেকে এটিতে স্থানান্তরিত হয়েছিলাম, তখন আমাদের সমস্ত সম্পদ সরাতে হয়েছিল।
ERC-20 টোকেনগুলি শুধু সরানো যেতে পারে।
তবে, একটি কন্ট্রাক্টে ETH স্থানান্তর করতে হলে সেই কন্ট্রাক্টের অনুমোদন প্রয়োজন, যা `donateETH` আমাদের সরবরাহ করে।

## L2-তে ERC-20 টোকেন {#erc-20-tokens-on-l2}

একটি ERC-20 টোকেনকে স্ট্যান্ডার্ড ব্রিজে ফিট করার জন্য, এটিকে স্ট্যান্ডার্ড ব্রিজকে, এবং _শুধুমাত্র_ স্ট্যান্ডার্ড ব্রিজকে, টোকেন মিন্ট করার অনুমতি দিতে হবে।
এটি প্রয়োজন কারণ ব্রিজগুলিকে নিশ্চিত করতে হবে যে Optimism-এ প্রচলিত টোকেনের সংখ্যা L1 ব্রিজ কন্ট্রাক্টের ভিতরে লক করা টোকেনের সংখ্যার সমান।
যদি L2-তে খুব বেশি টোকেন থাকে তবে কিছু ব্যবহারকারী তাদের সম্পদ L1-এ ফিরিয়ে আনতে পারবে না।
একটি বিশ্বস্ত ব্রিজের পরিবর্তে, আমরা মূলত [ফ্র্যাকশনাল রিজার্ভ ব্যাংকিং](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) পুনরায় তৈরি করব।
যদি L1-এ খুব বেশি টোকেন থাকে, তবে সেই টোকেনগুলির কিছু ব্রিজ কন্ট্রাক্টের ভিতরে চিরতরে লক হয়ে থাকবে কারণ L2 টোকেন বার্ন না করে সেগুলি প্রকাশ করার কোনো উপায় নেই।

### IL2StandardERC20 {#il2standarderc20}

L2-তে প্রতিটি ERC-20 টোকেন যা স্ট্যান্ডার্ড ব্রিজ ব্যবহার করে, তাদের [এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) সরবরাহ করতে হবে, যেখানে স্ট্যান্ডার্ড ব্রিজের জন্য প্রয়োজনীয় ফাংশন এবং ইভেন্ট রয়েছে।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[স্ট্যান্ডার্ড ERC-20 ইন্টারফেসে](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) `mint` এবং `burn` ফাংশন অন্তর্ভুক্ত নেই।
সেই পদ্ধতিগুলি [ERC-20 স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20) দ্বারা প্রয়োজন হয় না, যা টোকেন তৈরি এবং ধ্বংস করার পদ্ধতিগুলি অনির্দিষ্ট রাখে।

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 ইন্টারফেসটি](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) একটি কন্ট্রাক্ট কোন ফাংশন সরবরাহ করে তা নির্দিষ্ট করতে ব্যবহৃত হয়।
[আপনি এখানে স্ট্যান্ডার্ডটি পড়তে পারেন](https://eips.ethereum.org/EIPS/eip-165)।

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

এই ফাংশনটি L1 টোকেনের ঠিকানা সরবরাহ করে যা এই কন্ট্রাক্টে ব্রিজ করা হয়েছে।
উল্লেখ্য যে আমাদের বিপরীত দিকে অনুরূপ কোনো ফাংশন নেই।
আমাদের যেকোনো L1 টোকেন ব্রিজ করতে সক্ষম হতে হবে, তা বাস্তবায়নের সময় L2 সমর্থন পরিকল্পিত ছিল কি না তা নির্বিশেষে।

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

টোকেন মিন্ট (তৈরি) এবং বার্ন (ধ্বংস) করার জন্য ফাংশন এবং ইভেন্ট।
ব্রিজটি একমাত্র সত্তা হওয়া উচিত যা এই ফাংশনগুলি চালাতে পারে যাতে টোকেনের সংখ্যা সঠিক হয় (L1-এ লক করা টোকেনের সংখ্যার সমান)।

### L2StandardERC20 {#L2StandardERC20}

[এটি `IL2StandardERC20` ইন্টারফেসের আমাদের বাস্তবায়ন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)।
যদি না আপনার কোনো ধরনের কাস্টম লজিকের প্রয়োজন হয়, আপনার এটিই ব্যবহার করা উচিত।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[The OpenZeppelin ERC-20 contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)।
Optimism চাকা নতুন করে আবিষ্কারে বিশ্বাস করে না, বিশেষ করে যখন চাকাটি ভালভাবে নিরীক্ষিত এবং সম্পদ রাখার জন্য যথেষ্ট বিশ্বাসযোগ্য হওয়া প্রয়োজন।

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

এই দুটি অতিরিক্ত কনফিগারেশন প্যারামিটার যা আমাদের প্রয়োজন এবং যা সাধারণত ERC-20-এ থাকে না।

```solidity

    /**
     * @param _l2Bridge L2 স্ট্যান্ডার্ড ব্রিজের ঠিকানা।
     * @param _l1Token সংশ্লিষ্ট L1 টোকেনের ঠিকানা।
     * @param _name ERC20 নাম।
     * @param _symbol ERC20 প্রতীক।
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

প্রথমে যে কন্ট্রাক্ট থেকে আমরা ইনহেরিট করছি তার কনস্ট্রাক্টর কল করুন (`ERC20(_name, _symbol)`) এবং তারপর আমাদের নিজস্ব ভেরিয়েবল সেট করুন।

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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) এভাবেই কাজ করে।
প্রতিটি ইন্টারফেস হল সমর্থিত ফাংশনের একটি সংখ্যা, এবং এটি সেই ফাংশনগুলির [ABI ফাংশন সিলেক্টরগুলির](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [এক্সক্লুসিভ অর](https://en.wikipedia.org/wiki/Exclusive_or) হিসাবে চিহ্নিত করা হয়।

L2 ব্রিজ ERC-165 কে একটি স্যানিটি চেক হিসাবে ব্যবহার করে যাতে নিশ্চিত করা যায় যে যে ERC-20 কন্ট্রাক্টে সম্পদ পাঠাচ্ছে তা একটি `IL2StandardERC20`।

**দ্রষ্টব্য:** দুর্বৃত্ত কন্ট্রাক্টদের `supportsInterface`-এর মিথ্যা উত্তর দেওয়া থেকে বিরত রাখার জন্য কিছুই নেই, তাই এটি একটি স্যানিটি চেক মেকানিজম, একটি নিরাপত্তা মেকানিজম _নয়_।

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

শুধুমাত্র L2 ব্রিজ সম্পদ মিন্ট এবং বার্ন করার অনুমতিপ্রাপ্ত।

`_mint` এবং `_burn` আসলে [OpenZeppelin ERC-20 কন্ট্রাক্টে](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) সংজ্ঞায়িত।
সেই কন্ট্রাক্ট শুধু সেগুলিকে বাইরে প্রকাশ করে না, কারণ টোকেন মিন্ট এবং বার্ন করার শর্তগুলি ERC-20 ব্যবহারের পদ্ধতির মতোই বৈচিত্র্যময়।

## L2 ব্রিজ কোড {#l2-bridge-code}

এটি সেই কোড যা Optimism-এ ব্রিজ চালায়।
[এই কন্ট্রাক্টের সোর্স এখানে রয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* ইন্টারফেস ইমপোর্টস */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ইন্টারফেসটি আমরা উপরে দেখা [L1 সমতুল্য](#IL1ERC20Bridge)-এর মতোই।
দুটি উল্লেখযোগ্য পার্থক্য আছে:

1. L1-এ আপনি ডিপোজিট শুরু করেন এবং উইথড্রয়াল চূড়ান্ত করেন।
   এখানে আপনি উইথড্রয়াল শুরু করেন এবং ডিপোজিট চূড়ান্ত করেন।
2. L1-এ ETH এবং ERC-20 টোকেনের মধ্যে পার্থক্য করা প্রয়োজন।
   L2-তে আমরা উভয়ের জন্য একই ফাংশন ব্যবহার করতে পারি কারণ অভ্যন্তরীণভাবে Optimism-এ ETH ব্যালেন্সগুলি [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) ঠিকানা সহ একটি ERC-20 টোকেন হিসাবে পরিচালিত হয়।

```solidity
/* লাইব্রেরি ইমপোর্টস */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* কন্ট্রাক্ট ইমপোর্টস */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 স্ট্যান্ডার্ড ব্রিজ এমন একটি কন্ট্রাক্ট যা L1 এবং L2-এর মধ্যে ETH এবং ERC20 স্থানান্তর সক্ষম করতে L1 স্ট্যান্ডার্ড ব্রিজের সাথে একসাথে কাজ করে।
 * এই কন্ট্রাক্টটি L1 স্ট্যান্ডার্ড ব্রিজে ডিপোজিট সম্পর্কে শোনার সময় নতুন টোকেনের জন্য একটি মিন্টার হিসাবে কাজ করে।
 * এই কন্ট্রাক্টটি উইথড্রয়ালের উদ্দেশ্যে থাকা টোকেনগুলির জন্য একটি বার্নার হিসাবেও কাজ করে, যা L1 ব্রিজকে L1 ফান্ড প্রকাশ করার জন্য জানায়।
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * এক্সটার্নাল কন্ট্রাক্ট রেফারেন্স *
     ********************************/

    address public l1TokenBridge;
```

L1 ব্রিজের ঠিকানা ট্র্যাক রাখুন।
উল্লেখ্য যে L1 সমতুল্যের বিপরীতে, এখানে আমাদের _প্রয়োজন_ এই ভেরিয়েবলটি।
L1 ব্রিজের ঠিকানা আগে থেকে জানা যায় না।

```solidity

    /***************
     * কনস্ট্রাক্টর *
     ***************/

    /**
     * @param _l2CrossDomainMessenger এই কন্ট্রাক্ট দ্বারা ব্যবহৃত ক্রস-ডোমেন মেসেঞ্জার।
     * @param _l1TokenBridge মূল চেইনে ডিপ্লয় করা L1 ব্রিজের ঠিকানা।
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * উইথড্র করা *
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

এই দুটি ফাংশন উইথড্রয়াল শুরু করে।
উল্লেখ্য যে L1 টোকেন ঠিকানা নির্দিষ্ট করার প্রয়োজন নেই।
L2 টোকেনগুলি আমাদের L1 সমতুল্যের ঠিকানা জানাবে বলে আশা করা হয়।

```solidity

    /**
     * @dev টোকেন বার্ন করে এবং উইথড্রয়ালের বিষয়ে L1 টোকেন গেটওয়েকে জানিয়ে উইথড্রয়ালের জন্য যুক্তি সম্পাদন করে।
     * @param _l2Token L2 টোকেনের ঠিকানা যেখানে উইথড্রয়াল শুরু হয়েছে।
     * @param _from L2-তে যে অ্যাকাউন্ট থেকে উইথড্রয়াল টানা হবে।
     * @param _to L1-তে যে অ্যাকাউন্টে উইথড্রয়াল দেওয়া হবে।
     * @param _amount উইথড্র করার জন্য টোকেনের পরিমাণ।
     * @param _l1Gas অব্যবহৃত, তবে ভবিষ্যতের সামঞ্জস্যতার বিবেচনার জন্য অন্তর্ভুক্ত।
     * @param _data L1-এ ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র বাহ্যিক কন্ট্রাক্টগুলির সুবিধার জন্য সরবরাহ করা হয়। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই চুক্তিগুলি এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না।
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // যখন একটি উইথড্রয়াল শুরু হয়, তখন আমরা পরবর্তী L2 ব্যবহার রোধ করতে উইথড্রয়ারের ফান্ড বার্ন করি।
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

লক্ষ্য করুন যে আমরা `_from` প্যারামিটারের উপর নির্ভর করছি না, বরং `msg.sender`-এর উপর নির্ভর করছি যা জাল করা অনেক কঠিন (যতদূর আমি জানি, অসম্ভব)।

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)-এর জন্য ক্যালডাটা তৈরি করুন
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1-এ ETH এবং ERC-20-এর মধ্যে পার্থক্য করা প্রয়োজন।

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

        // L1 ব্রিজে মেসেজ পাঠান
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * ক্রস-চেইন ফাংশন: ডিপোজিট করা *
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

মেসেজের উৎসটি বৈধ কিনা তা নিশ্চিত করুন।
এটি গুরুত্বপূর্ণ কারণ এই ফাংশনটি `_mint` কল করে এবং ব্রিজের L1-এ থাকা টোকেন দ্বারা আবৃত নয় এমন টোকেন দেওয়ার জন্য ব্যবহার করা যেতে পারে।

```solidity
        // লক্ষ্য টোকেনটি অনুবর্তী কিনা তা পরীক্ষা করুন এবং
        // এখানে L1-এ ডিপোজিট করা টোকেন L2 ডিপোজিটেড টোকেন প্রতিনিধিত্বের সাথে মিলে কিনা তা যাচাই করুন
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

স্যানিটি চেক:

1. সঠিক ইন্টারফেস সমর্থিত
2. L2 ERC-20 কন্ট্রাক্টের L1 ঠিকানা টোকেনগুলির L1 উৎসের সাথে মিলে যায়

```solidity
        ) {
            // যখন একটি ডিপোজিট চূড়ান্ত হয়, তখন আমরা L2-তে অ্যাকাউন্টটিকে একই পরিমাণ টোকেন দিয়ে ক্রেডিট করি।
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

যদি স্যানিটি চেক পাস হয়, তাহলে ডিপোজিট চূড়ান্ত করুন:

1. টোকেন মিন্ট করুন
2. উপযুক্ত ইভেন্ট প্রকাশ করুন

```solidity
        } else {
            // হয় যে L2 টোকেনটি ডিপোজিট করা হচ্ছে তা তার L1 টোকেনের সঠিক ঠিকানা সম্পর্কে দ্বিমত পোষণ করে, অথবা সঠিক ইন্টারফেস সমর্থন করে না।
            // এটি শুধুমাত্র তখনই ঘটা উচিত যদি একটি ক্ষতিকারক L2 টোকেন থাকে, বা যদি কোনো ব্যবহারকারী কোনোভাবে ডিপোজিট করার জন্য ভুল L2 টোকেন ঠিকানা নির্দিষ্ট করে।
            // উভয় ক্ষেত্রেই, আমরা এখানে প্রক্রিয়াটি বন্ধ করি এবং একটি উইথড্রয়াল মেসেজ তৈরি করি যাতে ব্যবহারকারীরা কিছু ক্ষেত্রে তাদের ফান্ড বের করতে পারে।
            // ক্ষতিকারক টোকেন কন্ট্রাক্টগুলি পুরোপুরি প্রতিরোধ করার কোনো উপায় নেই, তবে এটি ব্যবহারকারীর ত্রুটি সীমাবদ্ধ করে এবং কিছু ধরনের ক্ষতিকারক কন্ট্রাক্ট আচরণ প্রশমিত করে।
```

যদি কোনো ব্যবহারকারী ভুল L2 টোকেন ঠিকানা ব্যবহার করে একটি সনাক্তযোগ্য ত্রুটি করে, তাহলে আমরা ডিপোজিট বাতিল করতে এবং L1-এ টোকেনগুলি ফিরিয়ে দিতে চাই।
L2 থেকে এটি করার একমাত্র উপায় হল একটি মেসেজ পাঠানো যা ফল্ট চ্যালেঞ্জ পিরিয়ডের জন্য অপেক্ষা করতে হবে, তবে এটি ব্যবহারকারীর জন্য টোকেন স্থায়ীভাবে হারানোর চেয়ে অনেক ভালো।

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // এখানে ডিপোজিটটি প্রেরকের কাছে ফেরত পাঠানোর জন্য _to এবং _from পরিবর্তন করা হয়েছে
                _from,
                _amount,
                _data
            );

            // L1 ব্রিজে মেসেজ পাঠান
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## উপসংহার {#conclusion}

স্ট্যান্ডার্ড ব্রিজ সম্পদ স্থানান্তরের জন্য সবচেয়ে নমনীয় প্রক্রিয়া।
তবে, এটি এত জেনেরিক হওয়ায় এটি সবসময় ব্যবহারের জন্য সবচেয়ে সহজ প্রক্রিয়া নয়।
বিশেষ করে উইথড্রয়ালের জন্য, বেশিরভাগ ব্যবহারকারী [তৃতীয় পক্ষের ব্রিজ](https://optimism.io/apps#bridge) ব্যবহার করতে পছন্দ করেন যা চ্যালেঞ্জ পিরিয়ডের জন্য অপেক্ষা করে না এবং উইথড্রয়াল চূড়ান্ত করার জন্য একটি মার্কল প্রুফের প্রয়োজন হয় না।

এই ব্রিজগুলি সাধারণত L1-এ সম্পদ রাখার মাধ্যমে কাজ করে, যা তারা একটি ছোট ফি-এর বিনিময়ে অবিলম্বে সরবরাহ করে (প্রায়শই একটি স্ট্যান্ডার্ড ব্রিজ উইথড্রয়ালের জন্য গ্যাস খরচের চেয়ে কম)।
যখন ব্রিজ (বা এটি পরিচালনাকারী ব্যক্তিরা) L1 সম্পদে ঘাটতির আশঙ্কা করে তখন তারা L2 থেকে পর্যাপ্ত সম্পদ স্থানান্তর করে। যেহেতু এগুলি খুব বড় উইথড্রয়াল, তাই উইথড্রয়াল খরচ একটি বড় পরিমাণের উপর ভাগ হয়ে যায় এবং এটি একটি অনেক ছোট শতাংশ।

আশা করি এই নিবন্ধটি আপনাকে লেয়ার 2 কীভাবে কাজ করে এবং কীভাবে পরিষ্কার এবং সুরক্ষিত Solidity কোড লিখতে হয় সে সম্পর্কে আরও বুঝতে সাহায্য করেছে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
